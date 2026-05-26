"use client";

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import * as THREE from "three";

// Register ScrollTrigger plugin with GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ModelControllerProps {
  isInteractive: boolean;
  setIsInteractive: (val: boolean) => void;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

export const ModelController = ({
  isInteractive,
  setIsInteractive,
  scrollContainerRef
}: ModelControllerProps) => {
  const { camera, scene } = useThree();
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    // Select all scroll sections from the page
    const sections = scrollContainerRef.current.querySelectorAll(".scroll-section");
    if (sections.length === 0) return;

    // Reset camera to standard starting position
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);

    // Get the product group inside the scene
    const productGroup = scene.getObjectByName("product-group");
    if (!productGroup) return;

    // Create a GSAP context to ensure clean scoping and garbage collection
    const ctx = gsap.context(() => {
      // 1. Initial State
      gsap.set(productGroup.rotation, { x: 0.2, y: -0.5, z: 0 });
      gsap.set(camera.position, { x: 0, y: 0, z: 5 });

      // 2. Scroll-driven timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2, // Smooth scrubbing
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // If user scrolls back up from the final section, revoke interactive orbit controls
            if (self.progress < 0.9 && isInteractive) {
              setIsInteractive(false);
            }
          },
          onLeave: () => {
            // Once the user reaches the bottom, switch to interactive orbit controls
            setIsInteractive(true);
          }
        }
      });

      // Section 1 -> Section 2 (Assembly effect / rotation transition)
      tl.to(productGroup.rotation, {
        x: -0.5,
        y: 1.5,
        z: 0.2,
        ease: "power2.inOut"
      }, 0)
      .to(camera.position, {
        x: -2,
        y: 1,
        z: 4,
        ease: "power2.inOut"
      }, 0);

      // Section 2 -> Section 3 (Close-up detail presentation)
      tl.to(productGroup.rotation, {
        x: 0,
        y: 3.14, // 180 degrees turn
        z: -0.1,
        ease: "power2.inOut"
      }, 1)
      .to(camera.position, {
        x: 1.5,
        y: -0.5,
        z: 3,
        ease: "power2.inOut"
      }, 1);

      // Section 3 -> Section 4 (Transition into the showcase final location)
      tl.to(productGroup.rotation, {
        x: 0.1,
        y: 0,
        z: 0,
        ease: "power3.inOut"
      }, 2)
      .to(camera.position, {
        x: 0,
        y: 0,
        z: 4.5,
        ease: "power3.inOut"
      }, 2);
    });

    return () => {
      ctx.revert(); // Revert GSAP animations and kill ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [scrollContainerRef, camera, scene, isInteractive, setIsInteractive]);

  return (
    <>
      {/* Lights tailored to highlight metallic structures and led glow */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-10, 5, -5]} intensity={0.6} />
      <pointLight position={[0, 2, 2]} intensity={2.0} color="#b12b30" />

      {/* Enable OrbitControls only when isInteractive is active */}
      {isInteractive && (
        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={8}
          maxPolarAngle={Math.PI / 1.8} // Restrict looking under the floor
          makeDefault
        />
      )}
    </>
  );
};
