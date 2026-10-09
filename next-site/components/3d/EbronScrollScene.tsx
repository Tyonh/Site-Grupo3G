"use client";

import { Suspense, useEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { homologadaMotion as motion, phase } from "@/lib/homologada-motion";
import HomologadaStreet from "./HomologadaStreet";

type Props = {
  progress: RefObject<number>;
  mobile: boolean;
  active: boolean;
  onReady: () => void;
  onWake: (wake: (() => void) | null) => void;
  onUnavailable: () => void;
  onLighting: (night: number) => void;
};

const modelUrl = "/models/Ebron50W.web.glb";
// Match the end and tangent of the street arm; the tip enters the mounting sleeve.
const armDirection = new THREE.Vector3(0, 0.06, 0.7).normalize();
const mountingPosition = new THREE.Vector3(1.2, 4, -0.55).addScaledVector(armDirection, -0.1);
const mountingAngle = Math.atan2(armDirection.z, armDirection.y);

type Lighting = { night: number; light: number };

function FinalModel({ lighting, lightSourceRef }: { lighting: RefObject<Lighting>; lightSourceRef: RefObject<THREE.Object3D | null> }) {
  const { scene } = useGLTF(modelUrl);
  const emitters = useRef<THREE.MeshStandardMaterial[]>([]);
  const model = useMemo(() => {
    const root = new THREE.Group();
    const copy = scene.clone(true);
    const materials = new Set<THREE.MeshStandardMaterial>();
    const emitters: THREE.MeshStandardMaterial[] = [];
    copy.traverse(object => {
      if (!(object instanceof THREE.Mesh)) return;
      const cloneMaterial = (source: THREE.MeshStandardMaterial) => {
        const material = source.clone();
        materials.add(material);
        if (material.name === "PMMA cobertura prismatica" && material instanceof THREE.MeshPhysicalMaterial) {
          // Screen-space transmission washes out the LEDs behind this close-fitting cover.
          // A faint transparent surface keeps the molded cover visible without hiding them.
          material.transmission = 0;
          material.transparent = true;
          material.opacity = 0.08;
          material.depthWrite = false;
          material.side = THREE.FrontSide;
        }
        if (material.name === "Placa dos LEDs") material.color.set("#cbd1d1");
        if (material.name === "Fosforo LED" || material.name === "Ceramica dos LEDs") {
          if (material.name === "Fosforo LED") material.color.set("#e5b941");
          material.emissive.set("#fff4df");
          material.emissiveIntensity = 0;
          emitters.push(material);
        }
        return material;
      };
      object.material = Array.isArray(object.material) ? object.material.map(cloneMaterial) : cloneMaterial(object.material);
    });
    const bounds = new THREE.Box3().setFromObject(copy);
    const size = bounds.getSize(new THREE.Vector3());
    const opticalBounds = new THREE.Box3();
    copy.traverse(object => {
      if (!(object instanceof THREE.Mesh)) return;
      const surface = Array.isArray(object.material) ? object.material : [object.material];
      if (surface.some(material => material.name === "Fosforo LED")) opticalBounds.expandByObject(object);
    });
    const anchor = new THREE.Object3D();
    if (!opticalBounds.isEmpty()) {
      opticalBounds.getCenter(anchor.position);
      anchor.position.z = opticalBounds.max.z + 0.002;
    } else anchor.position.copy(bounds.getCenter(new THREE.Vector3()));
    copy.add(anchor);
    // The GLB origin is centered on the tubular mounting sleeve.
    const factor = 3 / size.y;
    copy.scale.multiplyScalar(factor);
    // Preserve the GLB's mounting pivot. A local Z offset becomes a vertical gap
    // when the fixture rotates into its installed position.
    root.add(copy);
    return { root, materials, emitters, anchor };
  }, [scene]);
  useFrame(() => {
    for (const material of emitters.current) material.emissiveIntensity = lighting.current.light * 7;
  });
  useEffect(() => {
    emitters.current = model.emitters;
    lightSourceRef.current = model.anchor;
    return () => { emitters.current = []; lightSourceRef.current = null; for (const material of model.materials) material.dispose(); };
  }, [model, lightSourceRef]);
  return <primitive object={model.root} dispose={null} />;
}

function Choreography({ progress, mobile, active, onReady, onWake, onUnavailable, onLighting }: Props) {
  const product = useRef<THREE.Group>(null);
  const street = useRef<THREE.Group>(null);
  const pool = useRef<THREE.Mesh>(null);
  const beam = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.Sprite>(null);
  const halo = useRef<THREE.Sprite>(null);
  const ambient = useRef<THREE.AmbientLight>(null);
  const keyLight = useRef<THREE.DirectionalLight>(null);
  const fillLight = useRef<THREE.DirectionalLight>(null);
  const lamp = useRef<THREE.PointLight>(null);
  const fog = useRef<THREE.Fog>(null);
  const lighting = useRef<Lighting>({ night: 0, light: 0 });
  const lightSource = useRef<THREE.Object3D | null>(null);
  const current = useRef(0);
  const { camera, invalidate, gl } = useThree();
  const lookAt = useMemo(() => new THREE.Vector3(), []);
  const sourcePosition = useMemo(() => new THREE.Vector3(), []);
  const colors = useMemo(() => ({ day: new THREE.Color("#ffffff"), night: new THREE.Color("#08121f"), moon: new THREE.Color("#9bb9e5") }), []);
  const lightTexture = useMemo(() => {
    const width = 64;
    const data = new Uint8Array(width * width * 4);
    for (let y = 0; y < width; y++) for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      const radius = Math.hypot((x+0.5)/width*2-1, (y+0.5)/width*2-1);
      data[index] = 255; data[index+1] = 248; data[index+2] = 219;
      data[index+3] = Math.round(Math.max(0, 1-radius) ** 1.5 * 255);
    }
    const texture = new THREE.DataTexture(data, width, width);
    texture.needsUpdate = true;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
  useEffect(() => () => lightTexture.dispose(), [lightTexture]);
  const footprintTexture = useMemo(() => {
    const width = 128;
    const samples = new Float32Array(width * width);
    let maximum = 0;
    for (let y = 0; y < width; y++) for (let x = 0; x < width; x++) {
      // Plane local +y becomes world -z. C0 runs along the street (world x).
      const worldX = (x + 0.5) / width * 16 - 8;
      const worldZ = 6.5 - (y + 0.5) / width * 13;
      // Visual pool only: no photometric curve for the Ebron was supplied.
      const longitudinal = (worldX - 1.2) / 3.3;
      const transverse = (worldZ - 0.1) / 2.1;
      const value = Math.exp(-0.5 * (longitudinal ** 2 + transverse ** 2));
      samples[y * width + x] = value;
      maximum = Math.max(maximum, value);
    }
    const data = new Uint8Array(width * width * 4);
    for (let i = 0; i < samples.length; i++) {
      data[i*4] = 255; data[i*4+1] = 248; data[i*4+2] = 219;
      // Relative brightness only; this is not a lux map.
      data[i*4+3] = Math.round(samples[i] / maximum * 255);
    }
    const texture = new THREE.DataTexture(data, width, width);
    texture.needsUpdate = true;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
  useEffect(() => () => footprintTexture.dispose(), [footprintTexture]);
  useEffect(() => {
    onWake(invalidate);
    onReady();
    return () => onWake(null);
  }, [invalidate, onReady, onWake]);
  useEffect(() => { if (active) invalidate(); }, [active, mobile, invalidate]);
  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("webglcontextlost", onUnavailable);
    return () => canvas.removeEventListener("webglcontextlost", onUnavailable);
  }, [gl, onUnavailable]);

  useFrame(({ scene }, delta) => {
    if (!active || !product.current || !street.current || !pool.current) return;
    const target = progress.current;
    // Clamp delta after idle frames; demand rendering sleeps when scroll settles.
    current.current = THREE.MathUtils.damp(current.current, target, motion.damping, Math.min(delta, 1 / 30));
    const p = current.current;
    const turn = phase(p, 0.04, motion.turnEnd);
    // Complete the insertion within chapter 03, before the night transition begins.
    const install = phase(p, motion.installStart, 0.71);
    const reveal = phase(p, 0.53, 0.71);
    const night = phase(p, motion.nightStart, motion.nightEnd);
    const light = phase(p, motion.lightStart, motion.lightEnd);
    lighting.current = { night, light };
    onLighting(night);
    scene.environmentIntensity = THREE.MathUtils.lerp(0.4, 0.025, night);
    if (ambient.current) {
      ambient.current.intensity = THREE.MathUtils.lerp(0.35, 0.075, night);
      ambient.current.color.lerpColors(colors.day, colors.moon, night);
    }
    if (keyLight.current) {
      keyLight.current.intensity = THREE.MathUtils.lerp(1.15, 0.09, night);
      keyLight.current.color.lerpColors(colors.day, colors.moon, night);
    }
    if (fillLight.current) {
      fillLight.current.intensity = THREE.MathUtils.lerp(0.4, 0.13, night);
      fillLight.current.color.lerpColors(colors.day, colors.moon, night);
    }
    if (fog.current) fog.current.color.lerpColors(colors.day, colors.night, night);
    // Subtle local bounce on the fixture; the ground pattern is illustrative.
    if (lamp.current) lamp.current.intensity = light * 8;
    if (beam.current) {
      beam.current.visible = light > 0.001;
      (beam.current.material as THREE.ShaderMaterial).uniforms.opacity.value = light * 0.055;
    }
    if (glow.current) {
      glow.current.visible = light > 0.001;
      (glow.current.material as THREE.SpriteMaterial).opacity = light;
    }
    if (halo.current) {
      halo.current.visible = light > 0.001;
      (halo.current.material as THREE.SpriteMaterial).opacity = light * 0.35;
    }
    product.current.rotation.set(
      THREE.MathUtils.lerp(-0.08, mountingAngle, install),
      THREE.MathUtils.lerp(0.28 + turn * Math.PI, Math.PI*2, install),
      THREE.MathUtils.lerp(-0.12, 0, install),
    );
    product.current.position.set(
      THREE.MathUtils.lerp(mobile ? 0 : 1.12, mountingPosition.x, install),
      THREE.MathUtils.lerp(mobile ? -0.55 : 0, mountingPosition.y, install),
      THREE.MathUtils.lerp(0, mountingPosition.z, install),
    );
    product.current.scale.setScalar(THREE.MathUtils.lerp(mobile ? 0.72 : 1, 0.25, install));
    if (lightSource.current) {
      product.current.updateMatrixWorld(true);
      lightSource.current.getWorldPosition(sourcePosition);
      glow.current?.position.copy(sourcePosition);
      halo.current?.position.copy(sourcePosition);
      lamp.current?.position.copy(sourcePosition);
      if (beam.current) {
        beam.current.position.set(sourcePosition.x, sourcePosition.y / 2, sourcePosition.z);
        beam.current.scale.y = sourcePosition.y / 4;
      }
    }
    camera.position.set(
      THREE.MathUtils.lerp(0, mobile ? 7 : 7.5, install),
      THREE.MathUtils.lerp(mobile ? 1.1 : 1.5, mobile ? 7.7 : 5.7, install),
      THREE.MathUtils.lerp(7.5, mobile ? 12 : 9, install),
    );
    lookAt.set(0, THREE.MathUtils.lerp(mobile ? 1.1 : 1.5, mobile ? 2.8 : 1.8, install), 0);
    camera.lookAt(lookAt);
    street.current.visible = reveal > 0.001;
    street.current.scale.setScalar(reveal);
    pool.current.visible = light > 0.001;
    (pool.current.material as THREE.MeshBasicMaterial).opacity = light * 0.82;
    if (Math.abs(target - p) > motion.rest) invalidate();
  });

  return <>
    <fog ref={fog} attach="fog" args={["#ffffff",12,28]} />
    <ambientLight ref={ambient} intensity={0.35} />
    <directionalLight ref={keyLight} position={[3,5,5]} intensity={1.15} />
    <directionalLight ref={fillLight} position={[-4,3,-3]} intensity={0.4} />
    <Environment files="/hdri/studio_small_03_1k.hdr" environmentIntensity={0.4} />
    <group ref={product}><FinalModel lighting={lighting} lightSourceRef={lightSource} /></group>
    <group ref={street} visible={false}><HomologadaStreet lighting={lighting} /></group>
    <pointLight ref={lamp} position={[1.2,3.85,0.1]} color="#fff4df" intensity={0} distance={3} decay={2} />
    <sprite ref={halo} position={[1.2,3.87,0.1]} scale={[1.1,0.75,1]} visible={false} renderOrder={4}>
      <spriteMaterial map={lightTexture} transparent opacity={0} toneMapped={false} depthTest={false} depthWrite={false} blending={THREE.AdditiveBlending} />
    </sprite>
    <sprite ref={glow} position={[1.2,3.87,0.1]} scale={[0.5,0.24,1]} visible={false} renderOrder={5}>
      <spriteMaterial map={lightTexture} transparent opacity={0} toneMapped={false} depthTest={false} depthWrite={false} blending={THREE.AdditiveBlending} />
    </sprite>
    <mesh ref={beam} position={[1.2,2,0.1]} scale={[2,1,0.7]} visible={false}>
      <coneGeometry args={[2.25,4,32,1,true]} />
      <shaderMaterial
        uniforms={{ opacity: { value: 0 } }} transparent depthWrite={false}
        side={THREE.DoubleSide} blending={THREE.AdditiveBlending}
        vertexShader={`varying vec2 beamUv; varying vec3 beamNormal; varying vec3 beamView;
          void main() { beamUv = uv; vec4 view = modelViewMatrix * vec4(position, 1.0);
            beamNormal = normalize(normalMatrix * normal); beamView = -view.xyz;
            gl_Position = projectionMatrix * view; }`}
        fragmentShader={`uniform float opacity; varying vec2 beamUv; varying vec3 beamNormal; varying vec3 beamView;
          void main() { float facing = abs(dot(normalize(beamNormal), normalize(beamView)));
            float edge = smoothstep(0.0, 0.6, facing);
            float height = smoothstep(0.0, 0.18, beamUv.y) * (1.0 - smoothstep(0.75, 1.0, beamUv.y));
            gl_FragColor = vec4(1.0, 0.96, 0.87, opacity * edge * height); }`}
      />
    </mesh>
    <mesh ref={pool} position={[0,0.02,0]} rotation={[-Math.PI/2,0,0]} visible={false}>
      <planeGeometry args={[16,13]} /><meshBasicMaterial map={footprintTexture} transparent opacity={0} toneMapped={false} depthWrite={false} blending={THREE.AdditiveBlending} />
    </mesh>
  </>;
}

export default function EbronScrollScene(props: Props) {
  return <Canvas
    frameloop="demand"
    dpr={props.mobile ? 1 : [1, 1.5]}
    camera={{ position: [0,1.5,7.5], fov: 32, near: 0.1, far: 70 }}
    gl={{ antialias: !props.mobile, alpha: true, powerPreference: "low-power" }}
    fallback={<span>Visualização do produto disponível na imagem.</span>}
    style={{ pointerEvents: "none" }}
  >
    <Suspense fallback={null}><Choreography {...props} /></Suspense>
  </Canvas>;
}
