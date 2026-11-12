"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface LazyVideoProps {
  src: string;
  /** Imagem mostrada até o vídeo carregar (e o tempo todo com movimento reduzido) */
  poster: string;
  className?: string;
  /** Velocidade de reprodução (1 = normal, 2 = o dobro). Opcional. */
  playbackRate?: number;
}

/**
 * Vídeo de fundo decorativo que só começa a baixar quando chega perto da tela.
 *
 * Por que existe: vídeo com `autoplay` + `preload="auto"` baixa o arquivo
 * inteiro já na carga da página, mesmo lá embaixo, e disputa banda com o que o
 * visitante precisa ver primeiro (principalmente em celular e conexão lenta).
 * Aqui o `<video>` nasce sem `src`: a capa (`poster`) aparece na hora, e o
 * arquivo só é pedido quando o vídeo está a ~400px de entrar na tela. Sai da
 * tela, pausa.
 */
export default function LazyVideo({ src, poster, className, playbackRate }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const video = ref.current;
    // Movimento reduzido: fica só a capa, sem baixar o vídeo.
    if (!video || reduceMotion) return;

    video.muted = true;
    video.defaultMuted = true;
    // `defaultPlaybackRate` vale para cada carga do arquivo (o src só é
    // definido depois, quando o vídeo chega perto da tela).
    if (playbackRate) {
      video.defaultPlaybackRate = playbackRate;
      video.playbackRate = playbackRate;
    }

    let observer: IntersectionObserver | undefined;
    const start = () => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (!video.getAttribute("src")) {
              video.src = src;
              video.preload = "auto";
            }
            video.play().catch(() => {
              /* autoplay pode ser bloqueado — a capa continua na tela */
            });
          } else {
            video.pause();
          }
        },
        { rootMargin: "400px 0px" },
      );
      observer.observe(video);
    };

    // Só começa depois que a página terminou de carregar: o vídeo é enfeite e
    // já tem a capa; baixá-lo junto com o JavaScript e as imagens atrasava o
    // que o visitante precisa ver primeiro (principalmente em 4G lento).
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      window.removeEventListener("load", start);
      observer?.disconnect();
    };
  }, [src, reduceMotion, playbackRate]);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      className={className}
    />
  );
}
