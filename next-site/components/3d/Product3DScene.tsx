"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ProductModel } from "./ProductModel";
import { ModelController } from "./ModelController";
import { Html, Environment } from "@react-three/drei";

interface Product3DSceneProps {
  modelUrl: string;
  interactiveModelUrl?: string; // High-quality model for interactive showcase
  isInteractive: boolean;
  setIsInteractive: (val: boolean) => void;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  selectedPower: "100w" | "200w" | "300w";
  theme?: "light" | "dark";
}

// Custom Premium Loading Fallback (without useProgress to prevent React render-phase state warnings)
const CanvasLoader = () => {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center bg-black/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 w-[240px] text-center shadow-2xl">
        <div className="w-12 h-12 border-4 border-brand-red border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-white font-bold tracking-widest uppercase text-xs mb-1">Carregando Refletor</span>
        <span className="text-gray-400 font-medium text-[10px] uppercase tracking-wider">Aguarde um instante</span>
      </div>
    </Html>
  );
};

export const Product3DScene = ({
  modelUrl,
  interactiveModelUrl,
  isInteractive,
  setIsInteractive,
  scrollContainerRef,
  selectedPower,
  theme = "light"
}: Product3DSceneProps) => {
  // Dynamically switch models based on interaction state
  const activeModelUrl = isInteractive && interactiveModelUrl ? interactiveModelUrl : modelUrl;

  return (
    <div className={`fixed top-0 left-0 w-full h-screen z-0 pointer-events-none transition-colors duration-700 ${
      theme === "dark"
        ? "bg-radial from-gray-900 to-black"
        : "bg-radial from-slate-50 via-slate-100 to-slate-200"
    }`}>
      {/* Enable pointer-events only for OrbitControls when interactive */}
      <div className={`h-full transition-all duration-700 ${
        isInteractive ? "w-full lg:w-[60vw] pointer-events-auto" : "w-full pointer-events-none"
      }`}>
        <Canvas
          shadows="percentage"
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, preserveDrawingBuffer: true }}
        >
          {/* Environment maps and lights setup inside Suspense */}
          <Suspense fallback={<CanvasLoader />}>
            <Environment preset="studio" environmentIntensity={3.5} />
            <ProductModel 
              modelUrl={activeModelUrl} 
              isInteractive={isInteractive} 
              scrollContainerRef={scrollContainerRef}
              selectedPower={selectedPower}
              isScrollControlled={true}
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
