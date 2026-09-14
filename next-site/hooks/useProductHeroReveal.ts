"use client";

import { useEffect, useRef, useState, useCallback, type RefObject } from "react";

interface UseProductHeroRevealOptions {
  hasVector: boolean;
  desktopDelayMs?: number;
  mobileDelayMs?: number;
  threshold?: number;
}

interface UseProductHeroRevealReturn {
  sectionRef: RefObject<HTMLElement | null>;
  revealed: boolean;
  isMobile: boolean;
  handlePhotoEnter: () => void;
  handlePhotoLeave: () => void;
  handlePhotoClick: () => void;
}

/**
 * Hook modular para controlar a revelação de imagens e estruturas dos produtos.
 * - Desktop: Revela a foto real e a estrutura ao passar o mouse (hover) por REVEAL_DELAY_MS.
 * - Mobile / Telas Menores: Revela automaticamente com temporizador quando o usuário
 *   rola até o setor de cada produto (Intersection Observer) ou ao tocar na imagem.
 */
export const useProductHeroReveal = ({
  hasVector,
  desktopDelayMs = 300,
  mobileDelayMs = 650,
  threshold = 0.25,
}: UseProductHeroRevealOptions): UseProductHeroRevealReturn => {
  const [revealed, setRevealed] = useState<boolean>(!hasVector);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detecta se a viewport é mobile/tablet ou dispositivo com toque sem hover
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width: 1023px), (hover: none)");
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);

    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);
    return () => mediaQuery.removeEventListener("change", updateIsMobile);
  }, []);

  // Limpeza de qualquer timer ao desmontar o componente
  useEffect(() => {
    return () => {
      if (revealTimerRef.current) {
        clearTimeout(revealTimerRef.current);
        revealTimerRef.current = null;
      }
    };
  }, []);

  // Revelação por hover em telas desktop
  const handlePhotoEnter = useCallback(() => {
    if (!hasVector || revealed || isMobile) return;
    revealTimerRef.current = setTimeout(() => {
      setRevealed(true);
    }, desktopDelayMs);
  }, [hasVector, revealed, isMobile, desktopDelayMs]);

  const handlePhotoLeave = useCallback(() => {
    if (isMobile) return;
    if (revealTimerRef.current) {
      clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }
  }, [isMobile]);

  // Revelação manual imediata ao clicar/tocar na foto
  const handlePhotoClick = useCallback(() => {
    if (!hasVector || revealed) return;
    if (revealTimerRef.current) {
      clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }
    setRevealed(true);
  }, [hasVector, revealed]);

  // Automação por scroll em dispositivos móveis e telas menores
  useEffect(() => {
    if (!hasVector || revealed || !isMobile || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Inicia transição com temporizador ao entrar na tela
          if (!revealTimerRef.current) {
            revealTimerRef.current = setTimeout(() => {
              setRevealed(true);
            }, mobileDelayMs);
          }
        } else {
          // Cancela se o usuário passar direto e rolar para fora antes do timer terminar
          if (revealTimerRef.current) {
            clearTimeout(revealTimerRef.current);
            revealTimerRef.current = null;
          }
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      if (revealTimerRef.current) {
        clearTimeout(revealTimerRef.current);
        revealTimerRef.current = null;
      }
    };
  }, [hasVector, revealed, isMobile, mobileDelayMs, threshold]);

  return {
    sectionRef,
    revealed,
    isMobile,
    handlePhotoEnter,
    handlePhotoLeave,
    handlePhotoClick,
  };
};
