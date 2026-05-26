"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ProductModel } from "./ProductModel";
import { ModelController } from "./ModelController";
import { Html, useProgress } from "@react-three/drei";

interface Product3DSceneProps {
  modelUrl: string;
  interactiveModelUrl?: string; // High-quality model for interactive showcase
  isInteractive: boolean;
  setIsInteractive: (val: boolean) => void;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

// Custom Premium Loading Fallback
const CanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center bg-black/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 w-[240px] text-center shadow-2xl">
        <div className="w-12 h-12 border-4 border-brand-red border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-white font-bold tracking-widest uppercase text-xs mb-1">Carregando Modelo</span>
        <span className="text-brand-red font-extrabold text-sm">{progress.toFixed(0)}%</span>
      </div>
    </Html>
  );
};

export const Product3DScene = ({
  modelUrl,
  interactiveModelUrl,
  isInteractive,
  setIsInteractive,
  scrollContainerRef
}: Product3DSceneProps) => {
  // Dynamically switch models based on interaction state
  const activeModelUrl = isInteractive && interactiveModelUrl ? interactiveModelUrl : modelUrl;

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none bg-radial from-gray-900 to-black">
      {/* Enable pointer-events only for OrbitControls when interactive */}
      <div className={`w-full h-full ${isInteractive ? "pointer-events-auto" : "pointer-events-none"}`}>
        <Canvas
          shadows="percentage"
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, preserveDrawingBuffer: true }}
        >
          {/* Environment maps and lights setup inside Suspense */}
          <Suspense fallback={<CanvasLoader />}>
            <ProductModel 
              modelUrl={activeModelUrl} 
              isInteractive={isInteractive} 
              scrollContainerRef={scrollContainerRef}
            />
            <ModelController
              isInteractive={isInteractive}
              setIsInteractive={setIsInteractive}
              scrollContainerRef={scrollContainerRef}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};
