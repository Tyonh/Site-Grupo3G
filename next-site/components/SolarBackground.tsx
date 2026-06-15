"use client";

import { useEffect, useState } from "react";

interface SolarBackgroundProps {
  theme: "light" | "dark";
}

const SolarBackground = ({ theme }: SolarBackgroundProps) => {
  const [scrollPercent, setScrollPercent] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const pct = (window.scrollY / docHeight) * 100;
        setScrollPercent(pct);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // O vídeo de dia (solar.mp4) é exibido apenas ao abrir a página (se em Light Mode).
  // Qualquer rolagem inicial transiciona rapidamente para 100% noite.
  const splitPercent = theme === "dark" ? -20 : Math.max(-20, 110 - scrollPercent * 10);

  // Soft blending linear-gradient mask (30% width transition band)
  const maskStyle: React.CSSProperties = {
    WebkitMaskImage: `linear-gradient(to right, transparent ${splitPercent - 15}%, black ${splitPercent + 15}%)`,
    maskImage: `linear-gradient(to right, transparent ${splitPercent - 15}%, black ${splitPercent + 15}%)`,
    transition: "mask-image 0.8s cubic-bezier(0.16, 1, 0.3, 1), -webkit-mask-image 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none overflow-hidden">
      {/* Base video: Solar Day */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/models/solar.mp4" type="video/mp4" />
      </video>

      {/* Overlaid video with mask: Solar Night */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={maskStyle}
      >
        <source src="/models/solar%20noite.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default SolarBackground;
