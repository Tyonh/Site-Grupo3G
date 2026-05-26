"use client";

import { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import * as THREE from "three";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProductModelProps {
  modelUrl: string; // Dynamic path to GLB file
  isInteractive: boolean;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

// Enable Draco decoder globally to optimize load times of highly compressed .glb files
useGLTF.preload("/models/Modulo 100w - PRIME.glb");

export const ProductModel = ({ modelUrl, isInteractive, scrollContainerRef }: ProductModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Dynamically load the GLTF file with Draco decoder enabled
  const { scene, animations } = useGLTF(modelUrl, "/draco/");
  const { actions, mixer } = useAnimations(animations, groupRef);

  // Apply premium material overrides suited for lighting products
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          child.material.roughness = THREE.MathUtils.clamp(child.material.roughness, 0.1, 0.8);
          child.material.metalness = THREE.MathUtils.clamp(child.material.metalness, 0.2, 0.95);
          
          if (child.name.toLowerCase().includes("led") || child.name.toLowerCase().includes("emissive")) {
            child.material.emissive = new THREE.Color("#b12b30"); // Brand Red glowing led
            child.material.emissiveIntensity = 4.0;
          }
        }
      }
    });
  }, [scene]);

  // Scrub the Blender animation timeline based on ScrollTrigger progress
  useEffect(() => {
    if (isInteractive || !scrollContainerRef.current || !actions) return;

    // Get the first animated clip (e.g. the product assembly animation from Blender)
    const actionNames = Object.keys(actions);
    if (actionNames.length === 0) return;

    // Play all actions in sync so meshes and camera move together
    const activeActions = actionNames.map((name) => {
      const act = actions[name];
      if (act) {
        act.play();
        act.paused = true;
      }
      return act;
    }).filter(Boolean) as THREE.AnimationAction[];

    const mainClip = animations[0];
    if (!mainClip) return;
    const duration = mainClip.duration;

    // Connect GSAP ScrollTrigger to the animation timeline progress
    const trigger = ScrollTrigger.create({
      trigger: scrollContainerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.0, // Smooth interpolation
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const targetTime = self.progress * duration;
        activeActions.forEach((act) => {
          gsap.to(act, {
            time: targetTime,
            duration: 0.1,
            overwrite: "auto",
            onUpdate: () => {
              mixer.setTime(act.time);
            }
          });
        });
      }
    });

    return () => {
      trigger.kill();
      activeActions.forEach((act) => act.stop());
    };
  }, [actions, mixer, animations, isInteractive, scrollContainerRef]);

  // Pre-allocated vectors for high-performance world coordinate extraction in render loop
  const worldPos = useRef(new THREE.Vector3());
  const worldQuat = useRef(new THREE.Quaternion());

  // Sync the active Canvas camera coordinates and FOV with the animated Blender camera
  useFrame((state) => {
    if (isInteractive) return;

    // Find camera object exported from Blender in the loaded scene
    const blenderCam = state.scene.getObjectByProperty("isCamera", true) as THREE.PerspectiveCamera;
    
    if (blenderCam) {
      // Extract absolute world coordinates from the animated Blender camera
      blenderCam.getWorldPosition(worldPos.current);
      blenderCam.getWorldQuaternion(worldQuat.current);

      // Align R3F Canvas camera with Blender's world position & world rotation
      state.camera.position.copy(worldPos.current);
      state.camera.quaternion.copy(worldQuat.current);
      
      // Align FOV (Field of view / focal perspective) for identical focal length
      if (blenderCam.fov && state.camera instanceof THREE.PerspectiveCamera) {
        if (state.camera.fov !== blenderCam.fov) {
          state.camera.fov = blenderCam.fov;
          state.camera.updateProjectionMatrix();
        }
      }
    }
  });

  // Subtle interactive float animation in final showcase mode
  useEffect(() => {
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      if (isInteractive && groupRef.current) {
        const elapsedTime = clock.getElapsedTime();
        groupRef.current.position.y = Math.sin(elapsedTime * 0.8) * 0.1;
        groupRef.current.rotation.y = elapsedTime * 0.05;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInteractive]);

  return (
    <group ref={groupRef} name="product-group" dispose={null}>
      <primitive object={scene} scale={[1.5, 1.5, 1.5]} position={[0, 0, 0]} />
    </group>
  );
};
