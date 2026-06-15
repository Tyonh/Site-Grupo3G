"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ProductModel } from "./ProductModel";
import { ModelController } from "./ModelController";
import { Html, Environment } from "@react-three/drei";

interface LocalProduct3DSceneProps {
  modelUrl: string;
  selectedPower: "100w" | "200w" | "300w";
  theme?: "light" | "dark";
}

const CanvasLoader = () => {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center bg-black/85 backdrop-blur-md p-6 rounded-2xl border border-white/10 w-[240px] text-center shadow-2xl">
        <div className="w-12 h-12 border-4 border-brand-red border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-white font-bold tracking-widest uppercase text-xs mb-1">Carregando Modelo 3D</span>
        <span className="text-gray-400 font-medium text-[10px] uppercase tracking-wider">Aguarde um instante</span>
      </div>
    </Html>
  );
};

export const LocalProduct3DScene = ({
  modelUrl,
  selectedPower,
  theme = "light"
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
        <Suspense fallback={<CanvasLoader />}>
          <Environment preset="studio" environmentIntensity={theme === "dark" ? 2.5 : 3.5} />
          <ProductModel 
            modelUrl={modelUrl} 
            isInteractive={true} 
            selectedPower={selectedPower}
            isScrollControlled={false}
          />
          <ModelController
            isInteractive={true}
            setIsInteractive={() => {}}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
