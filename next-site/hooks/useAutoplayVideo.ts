"use client";

import { useEffect, useRef } from "react";

/**
 * Força o autoplay silencioso de um <video>. O React nem sempre reflete o
 * atributo JSX `muted` na propriedade real do elemento antes do navegador
 * avaliar a política de autoplay — quando isso falha, o navegador bloqueia
 * o autoplay e cai no fallback nativo de "toque para reproduzir" (mais
 * comum em mobile). Setar `.muted`/`.defaultMuted` via ref antes de chamar
 * `.play()` evita essa corrida.
 */
export function useAutoplayVideo<T extends HTMLVideoElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const tryPlay = () => video.play().catch(() => undefined);
    tryPlay();

    // iOS bloqueia autoplay em várias situações (Modo de Baixo Consumo,
    // Economia de Dados, primeira carga sem gesto do usuário na página
    // inteira). Em vez de deixar o vídeo parado esperando um clique nele
    // mesmo, qualquer primeiro toque/scroll na página tenta iniciar de
    // novo — silencioso, sem exibir nenhum botão de play.
    const retryOnce = () => {
      if (video.paused) tryPlay();
      window.removeEventListener("touchstart", retryOnce);
      window.removeEventListener("pointerdown", retryOnce);
      window.removeEventListener("scroll", retryOnce);
    };
    window.addEventListener("touchstart", retryOnce, { passive: true });
    window.addEventListener("pointerdown", retryOnce, { passive: true });
    window.addEventListener("scroll", retryOnce, { passive: true });

    return () => {
      window.removeEventListener("touchstart", retryOnce);
      window.removeEventListener("pointerdown", retryOnce);
      window.removeEventListener("scroll", retryOnce);
    };
  }, []);

  return ref;
}
