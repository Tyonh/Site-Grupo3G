"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Vector = [number, number, number];
type Block = { position: Vector; size: Vector; color?: string; rotation?: Vector };
type Lighting = RefObject<{ night: number; light: number }>;

// Shared geometry/material per batch keeps facade details inexpensive on mobile.
function Blocks({ items, color, lighting, emissive }: { items: Block[]; color: string; lighting: Lighting; emissive?: string }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const material = useRef<THREE.MeshStandardMaterial>(null);
  useEffect(() => {
    if (!mesh.current) return;
    const transform = new THREE.Object3D();
    const tint = new THREE.Color();
    items.forEach((item, index) => {
      transform.position.set(...item.position);
      transform.scale.set(...item.size);
      transform.rotation.set(...(item.rotation ?? [0, 0, 0]));
      transform.updateMatrix();
      mesh.current!.setMatrixAt(index, transform.matrix);
      mesh.current!.setColorAt(index, tint.set(item.color ?? "white"));
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
    mesh.current.computeBoundingSphere();
  }, [items]);
  useFrame(() => {
    if (emissive && material.current) material.current.emissiveIntensity = lighting.current.night * 1.4;
  });
  return <instancedMesh ref={mesh} args={[undefined, undefined, items.length]}>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial ref={material} color={color} roughness={0.85} emissive={emissive ?? "black"} emissiveIntensity={0} />
  </instancedMesh>;
}

function createDistrict() {
  const bodies: Block[] = [], trim: Block[] = [], darkWindows: Block[] = [], litWindows: Block[] = [];
  const buildings = [
    { x: -5.1, z: -4.2, width: 2.6, height: 3.3, depth: 2, color: "#b5c0c9" },
    { x: -1.3, z: -4.9, width: 2.8, height: 2.2, depth: 2.2, color: "#d1c7b7" },
    { x: 3.4, z: -4.6, width: 3, height: 2.8, depth: 2, color: "#a5b4bf" },
    { x: 7.2, z: -5.6, width: 2.2, height: 4.3, depth: 2.4, color: "#91a1af" },
  ];
  buildings.forEach((building, index) => {
    const { x, z, width, height, depth, color } = building;
    const front = z + depth / 2;
    bodies.push({ position: [x, height / 2, z], size: [width, height, depth], color });
    bodies.push({ position: [x, height + 0.16, z - 0.15], size: [width * 0.65, 0.3, depth * 0.66], color });
    trim.push({ position: [x, height + 0.025, z], size: [width + 0.1, 0.09, depth + 0.1] });
    trim.push({ position: [x, 0.18, front + 0.025], size: [width + 0.08, 0.28, 0.1] });
    const floors = Math.floor((height - 0.4) / 0.72);
    for (let floor = 0; floor < floors; floor++) {
      const y = 0.68 + floor * 0.72;
      trim.push({ position: [x, y - 0.27, front + 0.06], size: [width * 0.93, 0.055, 0.14] });
      for (let column = 0; column < 4; column++) {
        const window: Block = { position: [x + (column - 1.5) * width / 5, y, front + 0.012], size: [width / 7, 0.38, 0.03] };
        ((column + floor * 3 + index) % 4 === 0 ? litWindows : darkWindows).push(window);
        trim.push({ position: [window.position[0], y, front + 0.037], size: [0.018,0.4,0.025] });
      }
      for (let column = 0; column < 2; column++) {
        const window: Block = { position: [x + width / 2 + 0.012, y, z + (column - 0.5) * depth / 3], size: [0.03, 0.38, depth / 5] };
        ((column + floor + index) % 3 === 0 ? litWindows : darkWindows).push(window);
      }
    }
    darkWindows.push({ position: [x, 0.4, front + 0.02], size: [width * 0.68, 0.5, 0.045] });
    trim.push({ position: [x, 0.7, front + 0.2], size: [width * 0.78, 0.065, 0.42] });
  });
  // A second, quieter skyline gives the street depth without an image download.
  [-7, -3.2, 0.4, 4.5, 8].forEach((x, index) => {
    const height = [3.5, 3.9, 2.8, 4.1, 3.2][index];
    bodies.push({ position: [x, height / 2, -9.5], size: [2.3, height, 1.7], color: "#728799" });
  });
  return { bodies, trim, darkWindows, litWindows };
}

function Trees() {
  const crowns = useRef<THREE.InstancedMesh>(null);
  const positions = useMemo<Vector[]>(() => [[-5.7,0,-1.5], [-2.8,0,-1.7], [5.6,0,-1.5]], []);
  useEffect(() => {
    if (!crowns.current) return;
    const transform = new THREE.Object3D(), color = new THREE.Color();
    positions.forEach(([x,,z], index) => {
      [[-0.28,1.5,0,0.6], [0.28,1.65,0.03,0.64], [0,1.95,-0.04,0.57]].forEach(([dx,y,dz,size], cluster) => {
        transform.position.set(x+dx, y, z+dz);
        transform.scale.set(size, size * 1.05, size);
        transform.updateMatrix();
        crowns.current!.setMatrixAt(index*3+cluster, transform.matrix);
        crowns.current!.setColorAt(index*3+cluster, color.set(["#536f5d", "#617d68", "#749078"][cluster]));
      });
    });
    crowns.current.instanceMatrix.needsUpdate = true;
    if (crowns.current.instanceColor) crowns.current.instanceColor.needsUpdate = true;
    crowns.current.computeBoundingSphere();
  }, [positions]);
  return <>
    {positions.map(([x,,z]) => <group key={x} position={[x,0,z]}>
      <mesh position={[0,0.74,0]}><cylinderGeometry args={[0.04,0.075,1.48,8]} /><meshStandardMaterial color="#716252" /></mesh>
      <mesh position={[0,0.02,0]}><boxGeometry args={[1.05,0.06,0.92]} /><meshStandardMaterial color="#727f70" /></mesh>
    </group>)}
    <instancedMesh ref={crowns} args={[undefined,undefined,9]}><sphereGeometry args={[1,12,8]} /><meshStandardMaterial roughness={1} /></instancedMesh>
  </>;
}

export default function HomologadaStreet({ lighting }: { lighting: Lighting }) {
  const district = useMemo(() => createDistrict(), []);
  const markings = useMemo<Block[]>(() => [
    ...[-7,-4,-1,2,5,8].map(x => ({ position: [x,0.008,1.6] as Vector, size: [1.15,0.012,0.055] as Vector })),
    ...[0,1,2,3,4,5,6].map(i => ({ position: [4.5,0.009,-0.12+i*0.56] as Vector, size: [0.8,0.012,0.3] as Vector })),
  ], []);
  const arm = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(1.2,3.45,-1.5), new THREE.Vector3(1.2,3.75,-1.48),
    new THREE.Vector3(1.2,3.94,-1.25), new THREE.Vector3(1.2,4,-0.55),
  ]), []);
  return <>
    <mesh position={[0,-0.1,0]}><boxGeometry args={[16,0.16,13]} /><meshStandardMaterial color="#b7bec2" roughness={1} /></mesh>
    <mesh position={[0,0,1.6]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[16,4.2]} /><meshStandardMaterial color="#394651" roughness={0.92} /></mesh>
    {[-0.7,3.9].map(z => <mesh key={z} position={[0,0.03,z]}><boxGeometry args={[16,0.09,0.25]} /><meshStandardMaterial color="#c3c7c6" /></mesh>)}
    <Blocks items={markings} color="#e6e5dc" lighting={lighting} />
    <mesh position={[1.2,1.725,-1.5]}><cylinderGeometry args={[0.047,0.075,3.45,12]} /><meshStandardMaterial color="#7d8b94" metalness={0.65} roughness={0.36} /></mesh>
    <mesh><tubeGeometry args={[arm,24,0.047,10,false]} /><meshStandardMaterial color="#7d8b94" metalness={0.65} roughness={0.36} /></mesh>
    <mesh position={[1.2,0.1,-1.5]}><cylinderGeometry args={[0.17,0.22,0.2,12]} /><meshStandardMaterial color="#8c99a2" /></mesh>
    <Blocks items={district.bodies} color="white" lighting={lighting} />
    <Blocks items={district.trim} color="#7e8b95" lighting={lighting} />
    <Blocks items={district.darkWindows} color="#293a49" lighting={lighting} />
    <Blocks items={district.litWindows} color="#6a7782" lighting={lighting} emissive="#ffd8a1" />
    <Trees />
  </>;
}
