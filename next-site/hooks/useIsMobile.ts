"use client";

import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT_PX = 768;

/** Detecta se a viewport atual está abaixo do breakpoint mobile (768px).
 *  Usado pelas cenas 3D para reduzir custo de GPU em celular (dpr, shadow
 *  map) sem mexer na geometria/textura dos modelos. */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT_PX);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}
