"use client";

import { Html } from "@react-three/drei";

interface CanvasLoaderProps {
  label?: string;
  opacity?: "80" | "85";
}

/**
 * Shared premium loading fallback for both 3D canvases (background scroll
 * scene and the local interactive showcase). Avoids useProgress to prevent
 * React render-phase state warnings.
 */
export const CanvasLoader = ({
  label = "Carregando Modelo 3D",
  opacity = "80",
}: CanvasLoaderProps) => {
  // Tailwind needs fully static class names to pick them up at build time,
  // so the opacity variant is resolved to a literal string here rather than
  // interpolated directly into the className.
  const bgClass = opacity === "85" ? "bg-black/85" : "bg-black/80";

  return (
    <Html center>
      <div
        className={`flex flex-col items-center justify-center ${bgClass} backdrop-blur-md p-6 rounded-2xl border border-white/10 w-[85vw] max-w-[240px] text-center shadow-2xl`}
      >
        <div className="w-12 h-12 border-4 border-brand-red border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-white font-bold tracking-widest uppercase text-xs mb-1">
          {label}
        </span>
        <span className="text-gray-400 font-medium text-[10px] uppercase tracking-wider">
          Aguarde um instante
        </span>
      </div>
    </Html>
  );
};
