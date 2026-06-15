"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import * as THREE from "three";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProductModelProps {
  modelUrl: string;
  isInteractive: boolean;
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
  selectedPower?: "100w" | "200w" | "300w";
  isScrollControlled?: boolean;
}

// Preload models with Draco decoder via Google CDN
useGLTF.preload(
  "/models/moduloBackground.glb",
  "https://www.gstatic.com/draco/versioned/decoders/1.5.5/",
);
useGLTF.preload(
  "/models/moduloInterativo.glb",
  "https://www.gstatic.com/draco/versioned/decoders/1.5.5/",
);
useGLTF.preload(
  "/models/Ebron 100.glb",
  "https://www.gstatic.com/draco/versioned/decoders/1.5.5/",
);
useGLTF.preload(
  "/models/Homologada.glb",
  "https://www.gstatic.com/draco/versioned/decoders/1.5.5/",
);

// ─── Helper: detect if the model is the modular reflector (only product that uses Blender camera + timeline) ───
const isModuloModel = (url: string): boolean =>
  url.toLowerCase().includes("modulo");

export const ProductModel = ({
  modelUrl,
  isInteractive,
  scrollContainerRef,
  selectedPower = "100w",
  isScrollControlled = true,
}: ProductModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [isMobile, setIsMobile] = useState(false);
  const isModulo = isModuloModel(modelUrl);
  const [cameraInitialized, setCameraInitialized] = useState(false);

  const isDragging = useRef(false);
  const previousPointerX = useRef(0);
  const previousPointerY = useRef(0);

  // Reset camera initialization and rotation when model changes
  useEffect(() => {
    setCameraInitialized(false);
    if (groupRef.current) {
      groupRef.current.rotation.set(0, 0, 0);
    }
  }, [modelUrl]);

  // Handle drag rotation
  useEffect(() => {
    if (isScrollControlled || isModulo) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - previousPointerX.current;
      const deltaY = e.clientY - previousPointerY.current;
      previousPointerX.current = e.clientX;
      previousPointerY.current = e.clientY;

      if (groupRef.current) {
        groupRef.current.rotation.y += deltaX * 0.008;
        // Limit X rotation to avoid flipping the model upside down
        groupRef.current.rotation.x = Math.max(
          -Math.PI / 4,
          Math.min(Math.PI / 4, groupRef.current.rotation.x + deltaY * 0.008)
        );
      }
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isScrollControlled]);

  // Detect screen size for responsive scaling
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load GLTF with Draco decoder
  const { scene, animations } = useGLTF(
    modelUrl,
    "https://www.gstatic.com/draco/versioned/decoders/1.5.5/",
  );

  // Clone the scene graph to prevent multi-canvas conflicts (disappearing models)
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  const { actions, mixer } = useAnimations(animations, groupRef);

  // Cache Blender camera (only relevant for modulo)
  // Detect Blender camera for ALL products (modulo uses it animated, others use it static)
  const blenderCam = useMemo<THREE.PerspectiveCamera | null>(() => {
    let cam: THREE.PerspectiveCamera | null = null;
    clonedScene.traverse((child) => {
      if (!cam && child instanceof THREE.PerspectiveCamera) {
        cam = child as THREE.PerspectiveCamera;
      }
    });
    return cam;
  }, [clonedScene]);

  // Apply shadows and normalize materials
  useEffect(() => {
    clonedScene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      child.castShadow = true;
      child.receiveShadow = true;

      const normalizeMat = (mat: THREE.Material | null) => {
        if (!mat) return;
        const anyMat = mat as any;

        if (
          anyMat.name &&
          anyMat.name.toLowerCase().includes("polycarbonate")
        ) {
          anyMat.emissive = new THREE.Color(0xfff5e6);
          anyMat.emissiveIntensity = 0.1;
        } else if (anyMat.color instanceof THREE.Color) {
          const c = anyMat.color;
          if (c.r > 0.1 && c.g > 0.1 && c.b > 0.1) {
            c.setHex(0x6a6a6a);
          }
        }

        if (anyMat.roughness !== undefined) {
          anyMat.roughness = Math.max(anyMat.roughness, 0.1);
        }
      };

      if (Array.isArray(child.material)) {
        child.material.forEach((mat) => normalizeMat(mat));
      } else {
        normalizeMat(child.material);
      }
    });
  }, [clonedScene]);

  const animTimeRef = useRef(0);

  // ═══════════════════════════════════════════════════════════════════════════
  // MODULO ONLY: Scroll-controlled background animation (Scenario A)
  // Follows Blender timeline faithfully via ScrollTrigger
  // ═══════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    if (
      !isModulo ||
      !isScrollControlled ||
      !scrollContainerRef?.current ||
      animations.length === 0 ||
      !actions
    )
      return;

    const duration = Math.max(...animations.map((clip) => clip.duration), 0);
    const actionNames = Object.keys(actions);

    // Sync initial time with current scroll position
    const scrollTop =
      typeof window !== "undefined"
        ? window.scrollY || document.documentElement.scrollTop
        : 0;
    const scrollHeight =
      typeof window !== "undefined"
        ? document.documentElement.scrollHeight - window.innerHeight
        : 0;
    const initialTargetTime =
      scrollHeight > 0 ? (scrollTop / scrollHeight) * duration : 0;

    actionNames.forEach((name) => {
      const act = actions[name];
      if (act) {
        act.play();
        act.paused = true;
        act.time = initialTargetTime;
      }
    });
    mixer.update(0);

    const trigger = ScrollTrigger.create({
      trigger: scrollContainerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const targetTime = self.progress * duration;
        actionNames.forEach((name) => {
          const act = actions[name];
          if (act) {
            act.time = targetTime;
          }
        });
        mixer.update(0);
      },
    });

    ScrollTrigger.refresh();
    trigger.update();

    return () => {
      trigger.kill();
    };
  }, [
    isModulo,
    isScrollControlled,
    actions,
    animations,
    mixer,
    scrollContainerRef,
  ]);

  // ═══════════════════════════════════════════════════════════════════════════
  // MODULO ONLY: Click-controlled local showcase (Scenario B)
  // Programmatic frame control for interactive simulator
  // ═══════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    if (!isModulo || isScrollControlled || !actions || animations.length === 0)
      return;

    const duration = Math.max(...animations.map((clip) => clip.duration), 0);

    let initialTargetFrame = 500;
    if (selectedPower === "100w") initialTargetFrame = 500;
    else if (selectedPower === "200w") initialTargetFrame = 800;
    else if (selectedPower === "300w") initialTargetFrame = 1180;

    const initialTargetTime = (initialTargetFrame / 1180) * duration;

    Object.keys(actions).forEach((name) => {
      const act = actions[name];
      if (act) {
        act.play();
        act.paused = true;
        act.time = initialTargetTime;
      }
    });

    mixer.update(0);
    animTimeRef.current = initialTargetTime;
  }, [isModulo, isScrollControlled, actions, animations, mixer]); // Omit selectedPower to avoid hard cuts

  // MODULO ONLY: Smooth transition between power states
  useEffect(() => {
    if (!isModulo || isScrollControlled || !actions || animations.length === 0)
      return;

    const duration = Math.max(...animations.map((clip) => clip.duration), 0);
    const maxFrame = 1180;
    let targetFrame = 500;

    if (selectedPower === "100w") targetFrame = 500;
    else if (selectedPower === "200w") targetFrame = 800;
    else if (selectedPower === "300w") targetFrame = 1180;

    const frameRatio = targetFrame / maxFrame;
    const targetTime = frameRatio * duration;

    const actionNames = Object.keys(actions);

    if (actionNames.length > 0) {
      const firstAct = actions[actionNames[0]];
      if (firstAct && animTimeRef.current === 0) {
        animTimeRef.current = firstAct.time;
      }
    }

    // Proportional duration based on frame distance
    const currentFrame = (animTimeRef.current / duration) * maxFrame;
    const frameDelta = Math.abs(targetFrame - currentFrame);
    const proportionalDuration = Math.max(
      4.0,
      Math.min(9.0, (frameDelta / maxFrame) * 12.0),
    );

    const tween = gsap.to(animTimeRef, {
      current: targetTime,
      duration: proportionalDuration,
      ease: "power2.inOut",
      onUpdate: () => {
        actionNames.forEach((name) => {
          const act = actions[name];
          if (act) {
            act.time = animTimeRef.current;
          }
        });
        mixer.update(0);
      },
    });

    return () => {
      tween.kill();
    };
  }, [isModulo, isScrollControlled, selectedPower, actions, animations, mixer]);

  // ═══════════════════════════════════════════════════════════════════════════
  // CAMERA: All products use Blender camera perspective
  // Modulo → animated trajectory | Others → static position from Blender
  // ═══════════════════════════════════════════════════════════════════════════
  useFrame((state, delta) => {
    mixer.update(delta);

    if (blenderCam) {
      if (isScrollControlled || isModulo) {
        blenderCam.updateMatrixWorld(true);
        const worldPos = new THREE.Vector3();
        const worldQuat = new THREE.Quaternion();
        blenderCam.getWorldPosition(worldPos);
        blenderCam.getWorldQuaternion(worldQuat);

        state.camera.position.copy(worldPos);
        state.camera.quaternion.copy(worldQuat);

        const canvasCam = state.camera as THREE.PerspectiveCamera;
        if (canvasCam.isPerspectiveCamera) {
          const aspect = state.size.width / state.size.height;
          let targetFov = blenderCam.fov;
          if (aspect < 1) {
            // Responsive FOV for portrait screens
            targetFov = blenderCam.fov * (1 + (1 - aspect) * 0.45);
          }
          if (canvasCam.fov !== targetFov) {
            canvasCam.fov = targetFov;
            canvasCam.updateProjectionMatrix();
          }
        }
      } else if (!cameraInitialized) {
        blenderCam.updateMatrixWorld(true);
        const worldPos = new THREE.Vector3();
        const worldQuat = new THREE.Quaternion();
        blenderCam.getWorldPosition(worldPos);
        blenderCam.getWorldQuaternion(worldQuat);

        state.camera.position.copy(worldPos);
        state.camera.quaternion.copy(worldQuat);

        const canvasCam = state.camera as THREE.PerspectiveCamera;
        if (canvasCam.isPerspectiveCamera) {
          const aspect = state.size.width / state.size.height;
          let targetFov = blenderCam.fov;
          if (aspect < 1) {
            // Responsive FOV for portrait screens
            targetFov = blenderCam.fov * (1 + (1 - aspect) * 0.45);
          }
          canvasCam.fov = targetFov;
          canvasCam.updateProjectionMatrix();
        }
        setCameraInitialized(true);
      }
    }
  });

  // Scale: modulo uses existing logic, static products use a simple uniform scale
  const scaleMultiplier = isMobile ? 0.45 : 1.0;
  const currentScale = isModulo
    ? (isInteractive ? 0.75 : 1.1) * scaleMultiplier
    : 1.0 * scaleMultiplier;

  return (
    <group name="product-root-group">
      {/* Invisible background backing plane to capture drag starts anywhere in empty space */}
      {!isScrollControlled && !isModulo && (
        <mesh
          position={[0, 0, -10]}
          onPointerDown={(e) => {
            e.stopPropagation();
            isDragging.current = true;
            previousPointerX.current = e.clientX;
            previousPointerY.current = e.clientY;
          }}
        >
          <planeGeometry args={[100, 100]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      )}
      <group
        ref={groupRef}
        name="product-group"
        dispose={null}
        onPointerDown={(e) => {
          if (isScrollControlled || isModulo) return;
          e.stopPropagation();
          isDragging.current = true;
          previousPointerX.current = e.clientX;
          previousPointerY.current = e.clientY;
        }}
      >
        <primitive
          object={clonedScene}
          scale={[currentScale, currentScale, currentScale]}
          position={[0, 0, 0]}
        />
      </group>
    </group>
  );
};
