"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { NatalProductVideo } from "@/lib/natalCatalog";

interface ProductColorVideoProps {
  videos: NatalProductVideo[];
  productName: string;
}

/**
 * Showcase interativo de produto: os vídeos de cada cor ficam empilhados e a
 * troca de cor faz uma transição em crossfade + leve zoom entre eles, sem
 * recarregar o player — o fluxo de "configurador" usado em sites automotivos.
 *
 * Acessibilidade: a interação não é óbvia por padrão (nada no player indica
 * que dá para trocar de cor), então o componente reforça isso com um rótulo
 * visível permanente, um indicador animado no primeiro carregamento, alvos
 * de toque de 44px+, navegação por setas no grupo de cores (padrão ARIA
 * tablist) e uma região aria-live que anuncia a troca para leitor de tela.
 * O zoom/flash da transição é desativado sob prefers-reduced-motion; só o
 * crossfade de opacidade permanece.
 */
export default function ProductColorVideo({
  videos,
  productName,
}: ProductColorVideoProps) {
  const [active, setActive] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  // Incrementa a cada troca para remontar o "flash" da transição (a key
  // força o CSS a reiniciar a animação do zero a cada clique).
  const [flashKey, setFlashKey] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Reproduz apenas o vídeo ativo; pausa os demais para poupar CPU/banda
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === active) {
        video.play().catch(() => {
          /* autoplay pode ser bloqueado até interação — silencioso */
        });
      } else {
        video.pause();
      }
    });
  }, [active]);

  const selectColor = (index: number) => {
    if (index === active) return;
    setActive(index);
    setHasInteracted(true);
    setFlashKey((k) => k + 1);
  };

  // Navegação por setas entre as cores, com foco acompanhando a seleção
  // (padrão ARIA "tablist" — roving tabindex)
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (e.key === "ArrowRight") nextIndex = (index + 1) % videos.length;
    if (e.key === "ArrowLeft") nextIndex = (index - 1 + videos.length) % videos.length;
    if (nextIndex === null) return;
    e.preventDefault();
    selectColor(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-full aspect-video overflow-visible">
        <div className="absolute inset-0 scale-125 overflow-hidden">
          {videos.map((v, i) => (
            <video
              key={v.code}
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              src={v.src}
              muted
              loop
              playsInline
              autoPlay={i === 0}
              preload={i === 0 ? "auto" : "metadata"}
              aria-label={`${productName} — cor ${v.color}`}
              className={`absolute inset-0 w-full h-full object-cover transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                i === active
                  ? "opacity-100 scale-100 motion-safe:blur-none"
                  : "opacity-0 pointer-events-none motion-safe:scale-105 motion-safe:blur-[2px]"
              }`}
            />
          ))}
        </div>

        {/* Flash sutil de luz cruzando a tela a cada troca — reforça a
            sensação de "religar" o cordão na nova cor. Ignorado com
            prefers-reduced-motion (a classe só existe em motion-safe). */}
        <div
          key={flashKey}
          aria-hidden
          className="absolute inset-0 pointer-events-none bg-white motion-safe:animate-[color-flash_0.6s_ease-out] opacity-0"
        />

        {/* Etiqueta da cor ativa */}
        <span className="absolute bottom-3 left-3 bg-black/70 text-white text-[10px] font-bold uppercase tracking-[0.25em] px-3 py-1.5 transition-colors duration-500">
          {videos[active].color}
        </span>

        {/* Dica animada convidando à interação — some após o primeiro clique/toque,
            e respeita prefers-reduced-motion via a classe motion-safe do Tailwind */}
        {!hasInteracted && (
          <div
            aria-hidden
            className="absolute top-3 right-3 flex items-center gap-2 bg-white/95 text-black text-[10px] font-bold uppercase tracking-wider px-3 py-2 shadow-lg motion-safe:animate-pulse"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-natal-red" />
            Toque para trocar a cor
          </div>
        )}
      </div>

      {/* Região viva para leitores de tela anunciarem a troca de cor */}
      <span className="sr-only" role="status" aria-live="polite">
        {`Exibindo ${productName} na cor ${videos[active].color}`}
      </span>

      {/* Rótulo visível explicando a interação, sempre presente */}
      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500">
        Toque em uma cor para ver o cordão aceso
      </span>

      {/* Seletor de cores */}
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label={`Cores disponíveis de ${productName}`}
      >
        {videos.map((v, i) => (
          <button
            key={v.code}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Ver ${productName} na cor ${v.color}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => selectColor(i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={`inline-flex items-center gap-2 min-h-11 pl-2.5 pr-4 py-2.5 text-[11px] font-bold uppercase tracking-wider border-2 transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-natal-red ${
              i === active
                ? "bg-black text-white border-black"
                : "bg-white text-neutral-700 border-neutral-300 hover:border-black"
            }`}
          >
            <span
              aria-hidden
              className="w-4 h-4 rounded-full border border-black/15 shrink-0"
              style={{ backgroundColor: v.swatch }}
            />
            {v.color}
          </button>
        ))}
      </div>
    </div>
  );
}
