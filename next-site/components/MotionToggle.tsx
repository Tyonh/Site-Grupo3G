"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Botão global "Pausar animações e vídeos" (WCAG 2.2.2): movimento que começa
 * sozinho e dura mais de 5 segundos precisa de um jeito de pausar.
 *
 * - Pausa todos os <video> da página, inclusive os que o código tentar iniciar
 *   depois (o evento `play` é interceptado na captura).
 * - Marca `<html data-motion="paused">`, que os sliders consultam para parar de
 *   trocar de slide sozinhos.
 * - Quem usa `prefers-reduced-motion` já começa com tudo pausado.
 */
export default function MotionToggle() {
  const pathname = usePathname();
  const prefersReduced = usePrefersReducedMotion();
  // null = o visitante ainda não clicou: vale a preferência do sistema.
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const paused = userPaused ?? prefersReduced;
  // Vídeos que ESTE botão pausou: só esses voltam a tocar ao retomar.
  const pausedByUs = useRef<Set<HTMLVideoElement>>(new Set());

  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "paused" : "running";

    if (!paused) {
      pausedByUs.current.forEach((video) => {
        if (video.isConnected) video.play().catch(() => {});
      });
      pausedByUs.current.clear();
      return;
    }

    const stop = (video: HTMLVideoElement) => {
      pausedByUs.current.add(video);
      video.pause();
    };
    document.querySelectorAll("video").forEach((video) => {
      if (!video.paused) stop(video);
    });
    const onPlay = (event: Event) => {
      if (event.target instanceof HTMLVideoElement) stop(event.target);
    };
    document.addEventListener("play", onPlay, true);
    return () => document.removeEventListener("play", onPlay, true);
    // pathname: ao trocar de rota, os vídeos novos também precisam ser pausados
  }, [paused, pathname]);

  return (
    <button
      type="button"
      onClick={() => setUserPaused(!paused)}
      aria-pressed={paused}
      aria-label={paused ? "Retomar animações e vídeos" : "Pausar animações e vídeos"}
      className="fixed bottom-4 left-4 z-[9000] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-black/70 text-white ring-1 ring-white/40 backdrop-blur transition-colors hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:bottom-6 sm:left-6">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        {paused ? (
          <path d="M8 5v14l11-7z" />
        ) : (
          <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
        )}
      </svg>
    </button>
  );
}
