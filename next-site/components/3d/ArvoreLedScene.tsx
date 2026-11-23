"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import PracaCena from "./PracaCena";

/**
 * Árvore de Natal de LED em cone (a da filmagem da praça), modelada em código:
 * malha de LEDs verdes, anéis de luz branco-quente, estrelas de 8 pontas na
 * superfície e a estrela de 4 pontas em contorno duplo no topo. Sem arquivo de
 * modelo (.glb): pesa quase nada e as luzes podem piscar. O brilho é feito com
 * pontos aditivos e halos, sem pós-processamento.
 */

const H = 6; // altura do cone (sem a estrela)
const R = 1.55; // raio da base
const WARM = "#ffe6c4";

/** Raio do cone na altura y (0 = base, H = ponta). */
const radiusAt = (y: number): number => R * (1 - y / H);

/** Posição na superfície do cone, levemente para fora. */
function onCone(y: number, angle: number, out = 0.012): THREE.Vector3 {
  const r = radiusAt(y) + out;
  return new THREE.Vector3(r * Math.cos(angle), y, r * Math.sin(angle));
}

/** Textura redonda e macia para os pontos de luz. */
function makeGlowTexture(): THREE.Texture {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  if (g) {
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.25, "rgba(255,255,255,0.75)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
  }
  return new THREE.CanvasTexture(c);
}

interface LedLayers {
  a: { positions: Float32Array; colors: Float32Array };
  b: { positions: Float32Array; colors: Float32Array };
}

/** Malha de LEDs na superfície do cone, dividida em duas camadas que piscam em oposição. */
function buildLeds(): LedLayers {
  const pa: number[] = [];
  const ca: number[] = [];
  const pb: number[] = [];
  const cb: number[] = [];
  const rows = 70;
  const color = new THREE.Color();
  let n = 0;
  for (let i = 0; i < rows; i++) {
    const y = 0.04 + (i / (rows - 1)) * (H - 0.2);
    const count = Math.max(6, Math.round((2 * Math.PI * radiusAt(y)) / 0.075));
    const offset = (i % 2) * (Math.PI / count);
    for (let k = 0; k < count; k++) {
      const p = onCone(y, offset + (k / count) * Math.PI * 2, 0.02);
      // verde-esmeralda com variação para o ciano
      color.setHSL(0.42 + (Math.sin(n * 12.9898) * 0.5 + 0.5) * 0.08, 1, 0.58 + ((n * 7) % 5) * 0.04);
      const [pos, col] = n % 2 === 0 ? [pa, ca] : [pb, cb];
      pos.push(p.x, p.y, p.z);
      col.push(color.r, color.g, color.b);
      n++;
    }
  }
  return {
    a: { positions: new Float32Array(pa), colors: new Float32Array(ca) },
    b: { positions: new Float32Array(pb), colors: new Float32Array(cb) },
  };
}

/**
 * Contorno da estrela do topo, medido na filmagem da árvore real: 8 pontas — 4
 * longas (a de cima é a maior, depois a de baixo e as laterais) e 4 curtas nas
 * diagonais —, com vales estreitos perto do centro.
 */
function starOutline(): THREE.CurvePath<THREE.Vector3> {
  // [ângulo em graus, comprimento] de cada ponta, de cima, em sentido horário
  const tips: [number, number][] = [
    [90, 1.0], [52, 0.56], [0, 0.82], [-52, 0.56],
    [-90, 0.97], [-128, 0.55], [180, 0.8], [128, 0.55],
  ];
  const VALE = 0.3;
  const pts: THREE.Vector3[] = [];
  tips.forEach(([deg, len], i) => {
    const a = (deg * Math.PI) / 180;
    pts.push(new THREE.Vector3(Math.cos(a) * len, Math.sin(a) * len, 0));
    // vale no ângulo do meio entre esta ponta e a próxima (sentido horário)
    let d = tips[(i + 1) % tips.length][0] - deg;
    if (d > 0) d -= 360;
    const mid = ((deg + d / 2) * Math.PI) / 180;
    pts.push(new THREE.Vector3(Math.cos(mid) * VALE, Math.sin(mid) * VALE, 0));
  });
  const path = new THREE.CurvePath<THREE.Vector3>();
  for (let i = 0; i < pts.length; i++) {
    path.add(new THREE.LineCurve3(pts[i], pts[(i + 1) % pts.length]));
  }
  return path;
}

/** Estrela chata de 8 pontas, para os enfeites da superfície. */
function makeStar8(outer: number, inner: number): THREE.ShapeGeometry {
  const s = new THREE.Shape();
  for (let k = 0; k < 16; k++) {
    const r = k % 2 === 0 ? outer : inner;
    const a = (k * Math.PI) / 8;
    if (k === 0) s.moveTo(Math.cos(a) * r, Math.sin(a) * r);
    else s.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  s.closePath();
  return new THREE.ShapeGeometry(s);
}

const RING_Y = [0, 0.14, 0.28, 0.43, 0.58, 0.73, 0.86].map((f) => f * H);
const STAR_ROWS = [
  { f: 0.07, count: 9 },
  { f: 0.21, count: 8 },
  { f: 0.36, count: 7 },
  { f: 0.51, count: 6 },
  { f: 0.66, count: 5 },
  { f: 0.8, count: 4 },
];

function Tree() {
  const layerA = useRef<THREE.PointsMaterial>(null);
  const layerB = useRef<THREE.PointsMaterial>(null);
  const glow = useMemo(() => makeGlowTexture(), []);
  const leds = useMemo(() => buildLeds(), []);
  const star8 = useMemo(() => makeStar8(0.2, 0.08), []);
  const topStar = useMemo(() => new THREE.TubeGeometry(starOutline(), 256, 0.022, 8, true), []);
  const topHalo = useMemo(() => new THREE.TubeGeometry(starOutline(), 256, 0.055, 8, true), []);

  // a árvore fica parada; só o brilho das duas camadas de LED pisca em oposição
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (layerA.current) layerA.current.opacity = 0.7 + 0.3 * Math.sin(t * 2.6);
    if (layerB.current) layerB.current.opacity = 0.7 + 0.3 * Math.sin(t * 2.6 + Math.PI);
  });

  return (
    <group position={[0, -3.4, 0]}>
      {/* corpo: cone escuro e translúcido que dá volume aos LEDs */}
      <mesh position={[0, H / 2, 0]}>
        <coneGeometry args={[R, H, 64, 1, true]} />
        <meshBasicMaterial color="#0e6b4a" transparent opacity={0.55} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      {/* malha de LEDs */}
      {(["a", "b"] as const).map((k) => (
        <points key={k}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[leds[k].positions, 3]} />
            <bufferAttribute attach="attributes-color" args={[leds[k].colors, 3]} />
          </bufferGeometry>
          <pointsMaterial
            ref={k === "a" ? layerA : layerB}
            size={0.24}
            sizeAttenuation
            map={glow}
            vertexColors
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      ))}

      {/* anéis de luz (a base é mais grossa e brilhante) */}
      {RING_Y.map((y, i) => (
        <group key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <torusGeometry args={[radiusAt(y) + 0.03, i === 0 ? 0.055 : 0.032, 8, 96]} />
            <meshBasicMaterial color={WARM} />
          </mesh>
          <mesh>
            <torusGeometry args={[radiusAt(y) + 0.03, i === 0 ? 0.22 : 0.13, 8, 96]} />
            <meshBasicMaterial color="#ffd49a" transparent opacity={0.1} depthWrite={false} blending={THREE.AdditiveBlending} />
          </mesh>
        </group>
      ))}

      {/* estrelas de 8 pontas na superfície, viradas para fora */}
      {STAR_ROWS.map((row, ri) =>
        Array.from({ length: row.count }, (_, i) => {
          const y = row.f * H;
          const angle = (i / row.count) * Math.PI * 2 + ri * 0.4;
          const normal = new THREE.Vector3(Math.cos(angle) * H, R, Math.sin(angle) * H).normalize();
          const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
          const scale = 1.1 - row.f * 0.7;
          return (
            <mesh key={`${ri}-${i}`} geometry={star8} position={onCone(y, angle, 0.045)} quaternion={q} scale={scale}>
              <meshBasicMaterial color="#fff6e4" side={THREE.DoubleSide} />
            </mesh>
          );
        }),
      )}

      {/* estrela do topo, como a da árvore real: duas estrelas de 8 pontas em
          neon cruzadas em ângulo (por isso o contorno aparece duplo), presas numa
          haste vertical e numa travessa; a ponta de baixo encosta no cone. */}
      <group position={[0, H + 0.97 * 1.25, 0]} scale={1.25}>
        {/* uma estrela de frente e a outra girada ~50°: com a árvore parada, as
            duas aparecem como contornos separados (ângulos simétricos ±θ se
            sobreporiam na vista frontal) */}
        {[0, 0.9].map((ry) => (
          <group key={ry} rotation={[0, ry, 0]}>
            <mesh geometry={topStar}>
              <meshBasicMaterial color={WARM} />
            </mesh>
            <mesh geometry={topHalo}>
              <meshBasicMaterial color="#ffd49a" transparent opacity={0.08} depthWrite={false} blending={THREE.AdditiveBlending} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, 0.015, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 1.97, 8]} />
          <meshBasicMaterial color="#8c8678" />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.009, 0.009, 1.62, 8]} />
          <meshBasicMaterial color="#8c8678" />
        </mesh>
        {/* ponto de luz onde a estrela encontra o cone */}
        <mesh position={[0, -0.97, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color={WARM} />
        </mesh>
      </group>

      {/* brilho no chão */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <circleGeometry args={[R * 1.7, 64]} />
        <meshBasicMaterial map={glow} color="#ffcf8a" transparent opacity={0.35} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

export default function ArvoreLedScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 6.5, 20], fov: 30 }}
      onCreated={({ camera }) => camera.lookAt(0, 0.3, 0)}
    >
      <Tree />
      {/* a praça fica parada; só a árvore gira */}
      <PracaCena y={-3.4} />
    </Canvas>
  );
}
