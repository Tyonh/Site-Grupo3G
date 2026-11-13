"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export interface HeroClip {
  src: string;
  /** Quadro de capa: aparece na hora e serve de miniatura. */
  poster: string;
  /** Nome curto do vídeo (leitores de tela). */
  label: string;
}

interface HeroReelProps {
  clips: HeroClip[];
}

/** Quanto tempo cada vídeo fica na tela antes de passar para o próximo. */
const CLIP_SECONDS = 5;

interface SlideVideoProps {
  clip: HeroClip;
  isActive: boolean;
  shouldLoad: boolean;
}

function SlideVideo({ clip, isActive, shouldLoad }: SlideVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (!shouldLoad) return;
    video.muted = true;
    if (!video.getAttribute("src")) video.src = clip.src;
    if (isActive) {
      video.currentTime = 0;
      video.play().catch(() => {
        /* autoplay pode ser bloqueado — a capa continua na tela */
      });
    } else {
      video.pause();
    }
  }, [clip.src, isActive, shouldLoad]);

  return (
    <video
      ref={ref}
      poster={clip.poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

/**
 * Fundo do hero com vários vídeos em sequência (método da Citadel): cada um
 * fica poucos segundos e dá lugar ao seguinte com uma transição suave. Abaixo,
 * uma miniatura de cada vídeo mostra o que vem e permite pular para ele.
 * Só o vídeo atual e o próximo são baixados; com movimento reduzido fica a
 * capa do primeiro, sem troca automática.
 */
export default function HeroReel({ clips }: HeroReelProps) {
  const [active, setActive] = useState(0);
  const reduceMotion = usePrefersReducedMotion();
  const count = clips.length;

  useEffect(() => {
    if (reduceMotion || count < 2) return;
    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % count);
    }, CLIP_SECONDS * 1000);
    return () => window.clearTimeout(timer);
  }, [active, reduceMotion, count]);

  const next = (active + 1) % count;

  return (
    <>
      <div className="absolute inset-0 overflow-hidden bg-brand-charcoal" aria-hidden="true">
        {clips.map((clip, index) => (
          <div
            key={clip.src}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              index === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <SlideVideo
              clip={clip}
              isActive={index === active}
              shouldLoad={!reduceMotion && (index === active || index === next)}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-5 z-20 flex justify-center gap-1.5 px-4 sm:bottom-8 sm:gap-3">
        {clips.map((clip, index) => {
          const isActive = index === active;
          return (
            <button
              key={clip.src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Mostrar vídeo ${index + 1} de ${count}: ${clip.label}`}
              aria-current={isActive}
              className={`group relative h-7 w-10 shrink-0 cursor-pointer overflow-hidden border transition-[border-color,opacity] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-11 sm:w-[4.5rem] ${
                isActive ? "border-white opacity-100" : "border-white/30 opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={clip.poster} alt="" fill sizes="72px" className="object-cover" />
              {isActive && !reduceMotion ? (
                <span
                  key={`progress-${active}`}
                  aria-hidden="true"
                  className="reel-progress absolute inset-x-0 bottom-0 h-[3px] origin-left bg-brand-red"
                  style={{ animationDuration: `${CLIP_SECONDS}s` }}
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </>
  );
}
