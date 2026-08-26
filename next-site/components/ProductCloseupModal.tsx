"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ProductCloseupModalProps {
  /** Foto de close-up (ou a foto principal) exibida em tela cheia */
  image: string;
  /** Rótulo do setor — título da aba */
  label: string;
  /** Texto descritivo do setor */
  detail: string;
  onClose: () => void;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 5;
const ZOOM_STEP = 0.5;

/**
 * Aba em tela cheia para inspecionar um setor do produto: a foto abre grande
 * e o usuário pode ampliar (roda do mouse, botões ou duplo clique) e arrastar
 * para navegar pela região. Enquanto está aberta, o restante da página fica
 * inerte — o scroll do body é travado e o fundo captura os cliques, fechando
 * a aba. Fecha também com Esc.
 */
export default function ProductCloseupModal({
  image,
  label,
  detail,
  onClose,
}: ProductCloseupModalProps) {
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{
    x: number;
    y: number;
    panX: number;
    panY: number;
  } | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const resetView = useCallback(() => {
    setZoom(MIN_ZOOM);
    setPan({ x: 0, y: 0 });
  }, []);

  const changeZoom = useCallback((delta: number) => {
    setZoom((z) => {
      const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z + delta));
      // Voltar ao tamanho original recentraliza — senão a foto ficaria
      // "presa" fora do quadro depois de arrastar com zoom.
      if (next === MIN_ZOOM) setPan({ x: 0, y: 0 });
      return next;
    });
  }, []);

  // Trava o scroll da página enquanto a aba está aberta e devolve no fim.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") changeZoom(ZOOM_STEP);
      if (e.key === "-" || e.key === "_") changeZoom(-ZOOM_STEP);
      if (e.key === "0") resetView();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, changeZoom, resetView]);

  const handleWheel = (e: React.WheelEvent) => {
    changeZoom(e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (zoom === MIN_ZOOM) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const start = dragRef.current;
    if (!start) return;
    setPan({
      x: start.panX + (e.clientX - start.x),
      y: start.panY + (e.clientY - start.y),
    });
  };

  const handlePointerUp = () => {
    dragRef.current = null;
    setIsDragging(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Detalhe: ${label}`}
      className="fixed inset-0 z-50 flex flex-col bg-brand-charcoal/95 backdrop-blur-sm"
      onClick={onClose}>
      {/* Barra superior — título do setor e controles de zoom */}
      <div
        className="flex shrink-0 items-center justify-between gap-4 border-b border-white/15 px-4 py-3 sm:px-6"
        onClick={(e) => e.stopPropagation()}>
        <div className="min-w-0">
          <span className="block truncate text-xs font-extrabold uppercase tracking-widest text-brand-red sm:text-sm">
            {label}
          </span>
          <p className="mt-0.5 max-w-3xl text-xs font-light leading-snug text-white/70">
            {detail}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label="Diminuir zoom"
            onClick={() => changeZoom(-ZOOM_STEP)}
            disabled={zoom <= MIN_ZOOM}
            className="flex h-9 w-9 cursor-pointer items-center justify-center border border-white/25 text-lg leading-none text-white transition-colors hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-35">
            −
          </button>
          <span className="w-12 text-center text-xs font-bold tabular-nums text-white/80">
            {zoom.toFixed(1)}×
          </span>
          <button
            type="button"
            aria-label="Aumentar zoom"
            onClick={() => changeZoom(ZOOM_STEP)}
            disabled={zoom >= MAX_ZOOM}
            className="flex h-9 w-9 cursor-pointer items-center justify-center border border-white/25 text-lg leading-none text-white transition-colors hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-35">
            +
          </button>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Fechar detalhe"
            onClick={onClose}
            className="ml-1 flex h-9 w-9 cursor-pointer items-center justify-center bg-brand-red text-lg leading-none text-white transition-colors hover:bg-white hover:text-brand-red">
            ×
          </button>
        </div>
      </div>

      {/* Palco da foto — roda do mouse dá zoom, arrastar navega pela região */}
      <div
        className="relative flex-1 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
        onDoubleClick={() =>
          zoom === MIN_ZOOM ? changeZoom(ZOOM_STEP * 2) : resetView()
        }
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          cursor:
            zoom === MIN_ZOOM ? "zoom-in" : isDragging ? "grabbing" : "grab",
        }}>
        <div
          className="relative h-full w-full transition-transform duration-200 ease-out"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          }}>
          <Image
            src={image}
            alt={label}
            fill
            sizes="100vw"
            priority
            draggable={false}
            className="select-none object-contain p-4 sm:p-8"
          />
        </div>
      </div>
    </div>
  );
}
