"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ProductModel } from "./ProductModel";
import { ModelController } from "./ModelController";
import { Environment } from "@react-three/drei";
import { CanvasLoader } from "./CanvasLoader";
import { useIsMobile } from "@/hooks/useIsMobile";

interface Product3DSceneProps {
  modelUrl: string;
  interactiveModelUrl?: string; // High-quality model for interactive showcase
  isInteractive: boolean;
  setIsInteractive: (val: boolean) => void;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  selectedPower: "100w" | "200w" | "300w";
  theme?: "light" | "dark" | "ebron";
  environmentIntensity?: number;
  lightIntensityMultiplier?: number;
  // Quando true, para o loop de render deste Canvas (frameloop="never") sem
  // recarregar o modelo — usado pra não rodar dois contextos WebGL ao mesmo
  // tempo quando o simulador interativo do final da página assume a tela.
  paused?: boolean;
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
  paused = false,
}: Product3DSceneProps) => {
  // Dynamically switch models based on interaction state
  const activeModelUrl = isInteractive && interactiveModelUrl ? interactiveModelUrl : modelUrl;
  const isMobile = useIsMobile();

  return (
    <div className={`fixed top-0 left-0 w-full h-screen z-0 pointer-events-none transition-colors duration-700 ${
      theme === "ebron"
        ? "bg-radial from-ebron-blue via-ebron-navy to-[#060f20]"
        : theme === "dark"
          ? "bg-radial from-gray-900 to-black"
        : "bg-radial from-slate-50 via-slate-100 to-slate-200"
    }`}>
      {/* Enable pointer-events only for OrbitControls when interactive */}
      <div className={`h-full transition-all duration-700 ${
        isInteractive ? "w-full lg:w-[60vw] pointer-events-auto" : "w-full pointer-events-none"
      }`}>
        <Canvas
          shadows="percentage"
          dpr={isMobile ? 1 : [1, 1.75]}
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true }}
          frameloop={paused ? "never" : "always"}
        >
          {/* Mapa de ambiente de estúdio — hospedado localmente em vez do
              preset do drei, que baixava o HDR de um CDN externo e derrubava
              a página quando ele saía do ar. */}
          <Suspense fallback={<CanvasLoader label="Carregando Refletor" opacity="80" />}>
            <Environment
              files="/hdri/studio_small_03_1k.hdr"
              environmentIntensity={environmentIntensity}
            />
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
