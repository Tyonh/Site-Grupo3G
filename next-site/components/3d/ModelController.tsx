"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import * as THREE from "three";

// Register ScrollTrigger plugin with GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ModelControllerProps {
  isInteractive: boolean;
  setIsInteractive?: (val: boolean) => void;
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
  lightIntensityMultiplier?: number;
}

export const ModelController = ({
  isInteractive,
  setIsInteractive,
  scrollContainerRef,
  lightIntensityMultiplier = 1.0,
}: ModelControllerProps) => {
  useEffect(() => {
    if (!scrollContainerRef || !scrollContainerRef.current) return;

    // Trigger that handles entering the final interactive showcase section
    const trigger = ScrollTrigger.create({
      trigger: scrollContainerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        // Toggle interactivity state at 90% scroll progression
        if (self.progress < 0.9) {
          if (isInteractive) setIsInteractive?.(false);
        } else {
          if (!isInteractive) setIsInteractive?.(true);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [scrollContainerRef, isInteractive, setIsInteractive]);

  return (
    <>
      {/* Balanced Premium Studio Lighting System to highlight textures and shapes */}
      {/* 1. Ambient Light - Strong baseline to fill all shadows */}
      <ambientLight intensity={1.2 * lightIntensityMultiplier} />

      {/* 2. Main Key Light - Strong directional with shadows */}
      <directionalLight
        position={[8, 10, 8]}
        intensity={3.0 * lightIntensityMultiplier}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />

      {/* 3. Soft Fill Light - Illuminates opposing dark areas */}
      <directionalLight position={[-8, -5, 5]} intensity={1.5 * lightIntensityMultiplier} />

      {/* 4. Backlight / Rim - Crisp outer glow separating product from background */}
      <directionalLight position={[0, 8, -8]} intensity={1.2 * lightIntensityMultiplier} />

      {/* 5. Top Light - Clean light onto top surfaces */}
      <directionalLight position={[0, 15, 2]} intensity={2.0 * lightIntensityMultiplier} />

      {/* 6. Front Fill - Ensures no face of the product is in complete darkness */}
      <directionalLight position={[0, 0, 10]} intensity={1.0 * lightIntensityMultiplier} />
    </>
  );
};
