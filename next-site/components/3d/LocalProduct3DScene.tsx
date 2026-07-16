"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ProductModel } from "./ProductModel";
import { ModelController } from "./ModelController";
import { Environment } from "@react-three/drei";
import { CanvasLoader } from "./CanvasLoader";

interface LocalProduct3DSceneProps {
  modelUrl: string;
  selectedPower: "100w" | "200w" | "300w";
  theme?: "light" | "dark";
  environmentIntensity?: number;
  lightIntensityMultiplier?: number;
}

export const LocalProduct3DScene = ({
  modelUrl,
  selectedPower,
  theme = "light",
  environmentIntensity = theme === "dark" ? 2.5 : 3.5,
  lightIntensityMultiplier = 1.0,
}: LocalProduct3DSceneProps) => {
  return (
    <div className={`w-full h-full min-h-[400px] transition-colors duration-700 cursor-grab active:cursor-grabbing ${
      theme === "dark"
        ? "bg-radial from-gray-900 via-neutral-900 to-black"
        : "bg-radial from-slate-50 via-slate-100 to-slate-200"
    }`}>
      <Canvas
        shadows="percentage"
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader label="Carregando Modelo 3D" opacity="85" />}>
            <Environment preset="studio" environmentIntensity={environmentIntensity} />
            <ProductModel 
              modelUrl={modelUrl} 
              isInteractive={true} 
              selectedPower={selectedPower}
              isScrollControlled={false}
            />
            <ModelController
              isInteractive={true}
              setIsInteractive={() => {}}
              lightIntensityMultiplier={lightIntensityMultiplier}
            />
        </Suspense>
      </Canvas>
    </div>
  );
};
