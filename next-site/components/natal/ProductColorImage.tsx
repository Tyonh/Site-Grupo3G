"use client";

import Image from "next/image";
import { useState, type KeyboardEvent } from "react";
import type { NatalProductImage } from "@/lib/natalCatalog";

interface ProductColorImageProps {
  images: NatalProductImage[];
  productName: string;
}

/**
 * Showcase interativo de produto por foto: mesmo padrão de interação do
 * ProductColorVideo (crossfade, tablist ARIA, aria-live, dica animada), mas
 * para produtos que ainda só têm foto por cor, sem vídeo.
 */
export default function ProductColorImage({
  images,
  productName,
}: ProductColorImageProps) {
  const [active, setActive] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  const selectColor = (index: number) => {
    if (index === active) return;
    setActive(index);
    setHasInteracted(true);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (e.key === "ArrowRight") nextIndex = (index + 1) % images.length;
    if (e.key === "ArrowLeft") nextIndex = (index - 1 + images.length) % images.length;
    if (nextIndex === null) return;
    e.preventDefault();
    selectColor(nextIndex);
  };

  return (
    <div className="relative flex flex-col gap-3">
      <div className="relative w-full aspect-video overflow-hidden">
        {images.map((img, i) => (
          <Image
            key={img.code}
            src={img.src}
            alt={`${productName} — cor ${img.color}`}
            fill
            sizes="(max-width: 1024px) 90vw, 560px"
            className={`object-contain p-8 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              i === active ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />
        ))}

        {/* Etiqueta da cor ativa */}
        <span className="absolute bottom-3 left-3 bg-black/70 text-white text-[10px] font-bold uppercase tracking-[0.25em] px-3 py-1.5 transition-colors duration-500">
          {images[active].color}
        </span>
      </div>

      {/* Dica animada convidando à interação — fora do container recortado */}
      {!hasInteracted && (
        <div
          aria-hidden
          className="absolute -top-11 right-3 flex items-center gap-2 bg-white/95 text-black text-[10px] font-bold uppercase tracking-wider px-3 py-2 shadow-lg motion-safe:animate-pulse"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-natal-red" />
          Toque para trocar a cor
        </div>
      )}

      <span className="sr-only" role="status" aria-live="polite">
        {`Exibindo ${productName} na cor ${images[active].color}`}
      </span>

      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500">
        Toque em uma cor para ver a foto
      </span>

      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label={`Cores disponíveis de ${productName}`}
      >
        {images.map((img, i) => (
          <button
            key={img.code}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Ver ${productName} na cor ${img.color}`}
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
              style={{ backgroundColor: img.swatch }}
            />
            {img.color}
          </button>
        ))}
      </div>
    </div>
  );
}
