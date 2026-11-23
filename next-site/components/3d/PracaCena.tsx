"use client";

import { useMemo } from "react";
import * as THREE from "three";

/**
 * Praça ao redor da árvore de LED: piso de pedra circular, anel de grama,
 * calçada externa que some no escuro e bancos de madeira virados para a
 * árvore. Tudo em código (texturas desenhadas em canvas), sem arquivos extras.
 */

const PISO_R = 3.0; // raio do piso de pedra em volta da árvore
const GRAMA_R = 4.6; // raio externo do anel de grama
const CALCADA_R = 11; // raio externo da calçada (some em degradê)
const BANCO_R = 2.55; // distância dos bancos até o centro
// 4 bancos nas diagonais (graus, no plano do chão), como na referência
const BANCO_ANGULOS = [45, 135, 225, 315];

function canvasTexture(size: number, draw: (g: CanvasRenderingContext2D) => void, repeat: number): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d");
  if (g) draw(g);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat, repeat);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** Ladrilhos de pedra com leve variação de tom e juntas escuras. */
function pedraTexture(repeat: number): THREE.CanvasTexture {
  return canvasTexture(
    256,
    (g) => {
      g.fillStyle = "#1a1b1e";
      g.fillRect(0, 0, 256, 256);
      const n = 4;
      const s = 256 / n;
      for (let y = 0; y < n; y++) {
        const shift = (y % 2) * (s / 2);
        for (let x = -1; x < n; x++) {
          const v = 52 + (Math.abs(x * 31 + y * 17) % 7) * 4;
          g.fillStyle = `rgb(${v},${v + 1},${v + 4})`;
          g.fillRect(x * s + shift + 2, y * s + 2, s - 4, s - 4);
        }
      }
    },
    repeat,
  );
}

/** Grama: base verde-escura com muitos traços curtos de tons diferentes. */
function gramaTexture(repeat: number): THREE.CanvasTexture {
  return canvasTexture(
    256,
    (g) => {
      g.fillStyle = "#1c3a1a";
      g.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 2600; i++) {
        const px = Math.abs((Math.sin(i * 12.9898) * 43758.5453) % 1) * 256;
        const py = Math.abs((Math.sin(i * 78.233) * 12543.123) % 1) * 256;
        g.strokeStyle = `hsl(${100 + ((i * 13) % 30)}, 45%, ${18 + ((i * 7) % 16)}%)`;
        g.beginPath();
        g.moveTo(px, py);
        g.lineTo(px + ((i % 3) - 1), py - 3);
        g.stroke();
      }
    },
    repeat,
  );
}

/** Máscara radial: a calçada externa vai sumindo até o fundo da página. */
function fadeTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d");
  if (g) {
    const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, "#fff");
    grad.addColorStop(0.5, "#fff");
    grad.addColorStop(1, "#000");
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 256);
  }
  return new THREE.CanvasTexture(c);
}

/** Banco de praça: assento e encosto de ripas de madeira sobre pés de ferro. */
function Banco({ angulo }: { angulo: number }) {
  const a = (angulo * Math.PI) / 180;
  const x = Math.cos(a) * BANCO_R;
  const z = Math.sin(a) * BANCO_R;
  // frente do banco (+z local) virada para a árvore
  const rotY = Math.atan2(-Math.cos(a), -Math.sin(a));
  const madeira = <meshStandardMaterial color="#8a5a32" roughness={0.75} />;
  const ferro = <meshStandardMaterial color="#1b1c1e" roughness={0.5} metalness={0.6} />;

  return (
    <group position={[x, 0, z]} rotation={[0, rotY, 0]}>
      {/* ripas do assento */}
      {[-0.07, 0, 0.07].map((dz) => (
        <mesh key={`s${dz}`} position={[0, 0.2, dz]}>
          <boxGeometry args={[0.85, 0.025, 0.055]} />
          {madeira}
        </mesh>
      ))}
      {/* ripas do encosto, levemente inclinadas */}
      {[0.3, 0.38].map((y) => (
        <mesh key={`e${y}`} position={[0, y, -0.115 - (y - 0.3) * 0.25]} rotation={[-0.25, 0, 0]}>
          <boxGeometry args={[0.85, 0.055, 0.022]} />
          {madeira}
        </mesh>
      ))}
      {/* laterais de ferro: pé dianteiro, pé/encosto traseiro e braço */}
      {[-0.37, 0.37].map((sx) => (
        <group key={`f${sx}`} position={[sx, 0, 0]}>
          <mesh position={[0, 0.1, 0.09]}>
            <boxGeometry args={[0.03, 0.2, 0.03]} />
            {ferro}
          </mesh>
          <mesh position={[0, 0.21, -0.11]} rotation={[-0.12, 0, 0]}>
            <boxGeometry args={[0.03, 0.42, 0.03]} />
            {ferro}
          </mesh>
          <mesh position={[0, 0.27, -0.01]}>
            <boxGeometry args={[0.03, 0.02, 0.22]} />
            {ferro}
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function PracaCena({ y }: { y: number }) {
  const pedra = useMemo(() => pedraTexture(9), []);
  const calcada = useMemo(() => pedraTexture(26), []);
  const grama = useMemo(() => gramaTexture(10), []);
  const fade = useMemo(() => fadeTexture(), []);

  return (
    <group position={[0, y, 0]}>
      {/* luz da árvore sobre o chão e os bancos */}
      <ambientLight intensity={0.35} />
      <pointLight position={[0, 2.2, 0]} color="#7fe6b8" intensity={28} distance={16} decay={2} />
      <pointLight position={[0, 0.3, 0]} color="#ffd49a" intensity={10} distance={8} decay={2} />

      {/* piso de pedra em volta da árvore */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <circleGeometry args={[PISO_R, 96]} />
        <meshStandardMaterial map={pedra} roughness={0.85} />
      </mesh>
      {/* meio-fio entre o piso e a grama */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]}>
        <ringGeometry args={[PISO_R, PISO_R + 0.08, 96]} />
        <meshStandardMaterial color="#5d5d60" roughness={0.8} />
      </mesh>
      {/* anel de grama */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.012, 0]}>
        <ringGeometry args={[PISO_R + 0.08, GRAMA_R, 128]} />
        <meshStandardMaterial map={grama} roughness={1} />
      </mesh>
      {/* calçada externa, sumindo no escuro */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.014, 0]}>
        <ringGeometry args={[GRAMA_R, CALCADA_R, 128]} />
        <meshStandardMaterial map={calcada} alphaMap={fade} transparent roughness={0.9} depthWrite={false} />
      </mesh>

      {BANCO_ANGULOS.map((ang) => (
        <Banco key={ang} angulo={ang} />
      ))}
    </group>
  );
}
