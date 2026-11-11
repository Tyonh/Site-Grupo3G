"use client";

import { useEffect, useRef } from "react";

interface ProductSingleVideoProps {
  src: string;
  /** Capa mostrada até o vídeo carregar */
  poster?: string;
  productName: string;
}

/**
 * Vídeo geral do produto, sem seletor de cor ou tamanho. Toca em loop e mudo
 * (o navegador só deixa vídeo tocar sozinho sem som), e apenas enquanto está
 * visível na tela — pausa ao sair dela para poupar CPU e bateria no celular.
 * Com prefers-reduced-motion ele não toca sozinho: mostra a capa e os controles.
 * Formato vertical (9:16), como o vídeo é gravado para celular.
 */
export default function ProductSingleVideo({
  src,
  poster,
  productName,
}: ProductSingleVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.controls = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            /* autoplay pode ser bloqueado — silencioso */
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    // isolate: sem ele o Safari não recorta o <video> nos cantos arredondados
    <div className="relative isolate mx-auto aspect-[9/16] w-full max-w-[340px] overflow-hidden rounded-3xl bg-black">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`Vídeo de ${productName}`}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
