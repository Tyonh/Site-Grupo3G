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
    video.play().catch(() => {
      // Pode ser bloqueado mesmo assim (ex.: modo de economia de bateria
      // no iOS) — sem interface de fallback, o vídeo só fica parado no
      // poster/primeiro frame.
    });
  }, []);

  return ref;
}
