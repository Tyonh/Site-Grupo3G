"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ProductModel } from "./ProductModel";
import { ModelController } from "./ModelController";
import { CanvasLoader } from "./CanvasLoader";
import { StudioLights } from "./StudioLights";

interface Product3DSceneProps {
  modelUrl: string;
  interactiveModelUrl?: string; // High-quality model for interactive showcase
  isInteractive: boolean;
  setIsInteractive: (val: boolean) => void;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  selectedPower: "100w" | "200w" | "300w";
  theme?: "light" | "dark";
  environmentIntensity?: number;
  lightIntensityMultiplier?: number;
}

export const Product3DScene = ({
  modelUrl,
  interactiveModelUrl,
  isInteractive,
  setIsInteractive,
  scrollContainerRef,
  selectedPower,
  theme = "light",
  environmentIntensity = 3.5,
  lightIntensityMultiplier = 1.0,
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
          dpr={[1, 1.75]}
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true }}
        >
          {/* Setup de luzes de estúdio inside Suspense */}
          <Suspense fallback={<CanvasLoader label="Carregando Refletor" opacity="80" />}>
            <StudioLights environmentIntensity={environmentIntensity} />
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
              lightIntensityMultiplier={lightIntensityMultiplier}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};
