"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCloseupModal from "@/components/ProductCloseupModal";

export interface ProductHotspot {
  id: string;
  /** Rótulo curto do detalhe — aparece tanto no marcador da foto quanto na
   *  lista de características à direita */
  label: string;
  /** Texto curto explicando o que se destaca nessa parte específica do
   *  produto — aparece no mini-card e expandido na lista lateral quando o
   *  setor está selecionado */
  detail: string;
  /** Posição do marcador na foto, em % a partir do topo/esquerda — também
   *  usada como origem do zoom (para onde o mini-card "aproxima") quando não
   *  há closeupImage */
  top: number;
  left: number;
  /** Foto real de close-up dessa região específica do produto, mostrada no
   *  mini-card. Opcional: sem ela, o mini-card mostra um recorte ampliado
   *  (zoom CSS) da própria foto principal. */
  closeupImage?: string;
}

interface ProductFamilyHeroProps {
  index: number;
  kicker: string;
  name: string;
  description: string;
  image: string;
  href: string;
  hotspots: ProductHotspot[];
  /** Proporção do quadro da foto (largura/altura). Ex.: "3/4" para retrato */
  aspectRatio?: string;
  /** Quando fornecida, ativa o modo de revelação: a categoria abre com essa
   *  ilustração vetorial cobrindo a foto. Ao passar o mouse por cima e
   *  manter por REVEAL_DELAY_MS, a ilustração some com um fade simples e os
   *  hotspots de características passam a existir. Sem essa prop o card se
   *  comporta exatamente como antes — recurso opt-in. */
  vectorImage?: string;
}

/** Tempo de hover contínuo (ms) até a foto real ser revelada. */
const REVEAL_DELAY_MS = 300;

/**
 * Apresentação estilo "hero" em tela cheia de uma família de produtos: nome
 * da categoria fixo no canto superior esquerdo, foto grande à esquerda com
 * quadrados clicáveis sobre detalhes do produto, e as características em
 * texto só na coluna da direita. Clicar um ou mais quadrados (ou os itens
 * correspondentes na lista) abre mini-cards flutuantes ao lado da foto,
 * aproveitando o espaço vazio ao redor dela — a foto principal nunca é
 * substituída, então vários setores podem ficar abertos ao mesmo tempo.
 */
export default function ProductFamilyHero({
  index,
  kicker,
  name,
  description,
  image,
  href,
  hotspots,
  aspectRatio = "3/4",
  vectorImage,
}: ProductFamilyHeroProps) {
  const [openIds, setOpenIds] = useState<string[]>([]);
  const isOpen = (id: string) => openIds.includes(id);

  const toggle = (id: string) =>
    setOpenIds((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
    );

  // Distribui os cards abertos em duas colunas (esquerda/direita), na ordem
  // em que foram abertos, mantendo cada coluna empilhada e sem sobreposição.
  const openHotspots = openIds
    .map((id) => hotspots.find((h) => h.id === id))
    .filter((h): h is ProductHotspot => Boolean(h));
  const leftCards = openHotspots.filter((_, i) => i % 2 === 0);
  const rightCards = openHotspots.filter((_, i) => i % 2 === 1);

  // Setor aberto em tela cheia para inspeção com zoom. Enquanto houver um,
  // o restante da página fica em standby (o modal trava o scroll e captura
  // os cliques).
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const expanded = hotspots.find((h) => h.id === expandedId) ?? null;

  // ─── Modo de revelação (opcional, só quando vectorImage é passada) ───
  const hasVector = Boolean(vectorImage);
  const [revealed, setRevealed] = useState(!hasVector);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
    };
  }, []);

  const handlePhotoEnter = () => {
    if (!hasVector || revealed) return;
    revealTimerRef.current = setTimeout(
      () => setRevealed(true),
      REVEAL_DELAY_MS,
    );
  };

  const handlePhotoLeave = () => {
    if (revealTimerRef.current) {
      clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden border-b border-black/5 bg-brand-light px-6 py-24 sm:px-10 lg:px-16">
      {/* Nome da categoria fixo no canto superior esquerdo */}
      <div className="absolute top-8 left-6 z-10 sm:top-10 sm:left-10 lg:top-12 lg:left-16">
        <span className="text-xs font-extrabold uppercase tracking-widest text-brand-red">
          {String(index + 1).padStart(2, "0")} — {kicker}
        </span>
        <h3 className="mt-2 text-3xl font-black uppercase tracking-tight text-brand-charcoal sm:text-4xl lg:text-5xl">
          {name}
        </h3>
      </div>

      <div className="mx-auto mt-28 grid w-full max-w-[1600px] grid-cols-1 items-center gap-10 sm:mt-32 lg:mt-16 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        {/* PALCO DA FOTO — mais largo que a foto em si, para sobrar espaço
            nas laterais onde os mini-cards vão flutuar (sem overflow-hidden
            aqui: só a caixa interna da foto recorta a própria imagem) */}
        <div className="relative mx-auto" style={{ width: "clamp(240px, 29vw, 460px)" }}>
          <div
            className="relative overflow-hidden"
            style={{ aspectRatio }}
            onMouseEnter={handlePhotoEnter}
            onMouseLeave={handlePhotoLeave}>
            {/* Foto real — sempre no DOM, por baixo da ilustração vetorial
                enquanto não revelada. Nunca é substituída pelos mini-cards. */}
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 1024px) 80vw, 32vw"
              className="object-contain"
            />

            {/* Ilustração vetorial — cobre a foto até a revelação, depois
                some com um fade simples. Algumas ilustrações são só contorno
                (sem preenchimento), então um fundo sólido atrás delas evita
                que a foto real vaze pelos "vãos" entre as linhas — some
                junto no mesmo fade. */}
            {hasVector && (
              <div
                className={`absolute inset-0 bg-brand-light transition-opacity duration-700 ease-out ${
                  revealed ? "opacity-0" : "opacity-100"
                }`}>
                <Image
                  src={vectorImage!}
                  alt=""
                  aria-hidden
                  fill
                  sizes="(max-width: 1024px) 80vw, 32vw"
                  className="object-contain pointer-events-none"
                />
              </div>
            )}

            {revealed &&
              hotspots.map((h) => (
                <button
                  key={h.id}
                  type="button"
                  aria-label={`Ver detalhe: ${h.label}`}
                  onClick={() => toggle(h.id)}
                  style={{ top: `${h.top}%`, left: `${h.left}%` }}
                  className={`absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center border-2 backdrop-blur-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red ${
                    isOpen(h.id)
                      ? "border-brand-red bg-brand-red text-white"
                      : "border-brand-red bg-white/85 text-brand-red hover:bg-brand-red hover:text-white"
                  }`}>
                  <span aria-hidden className="text-lg leading-none">
                    {isOpen(h.id) ? "×" : "+"}
                  </span>
                </button>
              ))}
          </div>

          {/* MINI-CARDS — um por setor aberto, empilhados em duas colunas
              (esquerda/direita) centralizadas no espaço vazio ao redor da
              foto. Empilhar em vez de posicionar pela altura exata do
              hotspot evita que cards grandes se sobreponham; todos podem
              ficar abertos ao mesmo tempo. */}
          {revealed && leftCards.length > 0 && (
            <div
              className="absolute top-1/2 right-[100%] z-20 flex -translate-y-1/2 flex-col gap-4"
              style={{ width: "clamp(120px, min(14vw, 22vh), 230px)" }}
            >
              {leftCards.map((h) => (
                <MiniCard
                  key={h.id}
                  hotspot={h}
                  image={image}
                  onClose={toggle}
                  onExpand={setExpandedId}
                />
              ))}
            </div>
          )}
          {revealed && rightCards.length > 0 && (
            <div
              className="absolute top-1/2 left-[100%] z-20 flex -translate-y-1/2 flex-col gap-4"
              style={{ width: "clamp(120px, min(14vw, 22vh), 230px)" }}
            >
              {rightCards.map((h) => (
                <MiniCard
                  key={h.id}
                  hotspot={h}
                  image={image}
                  onClose={toggle}
                  onExpand={setExpandedId}
                />
              ))}
            </div>
          )}
        </div>

        {/* DETALHES — único lugar com texto/características extras, sempre à direita */}
        <div className="flex flex-col gap-6 lg:border-l lg:border-brand-dark/15 lg:pl-10">
          <p className="font-light leading-relaxed text-brand-dark">
            {description}
          </p>

          {revealed ? (
            <dl className="border-t border-brand-dark/15">
              {hotspots.map((h) => (
                <div key={h.id} className="border-b border-brand-dark/15">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => toggle(h.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggle(h.id);
                      }
                    }}
                    className={`flex cursor-pointer items-center justify-between gap-4 py-3 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red ${
                      isOpen(h.id)
                        ? "text-brand-red"
                        : "text-brand-charcoal hover:text-brand-red"
                    }`}>
                    <dt className="font-bold uppercase tracking-wider">
                      {h.label}
                    </dt>
                    <dd aria-hidden className="text-lg leading-none">
                      {isOpen(h.id) ? "×" : "+"}
                    </dd>
                  </div>
                  {isOpen(h.id) && (
                    <dd className="pb-4 pr-6 text-xs font-light leading-relaxed text-brand-dark sm:text-sm">
                      {h.detail}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          ) : (
            <div className="border-t border-brand-dark/15" />
          )}

          <Link
            href={href}
            className="inline-flex h-12 w-fit items-center justify-center bg-brand-red px-6 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-brand-charcoal">
            Ver produto
          </Link>
        </div>
      </div>
      {expanded && (
        <ProductCloseupModal
          image={expanded.closeupImage ?? image}
          label={expanded.label}
          detail={expanded.detail}
          onClose={() => setExpandedId(null)}
        />
      )}
    </section>
  );
}

interface MiniCardProps {
  hotspot: ProductHotspot;
  /** Foto principal da categoria, usada como fallback quando o hotspot não
   *  tem uma closeupImage própria (aplica o zoom CSS de sempre). */
  image: string;
  onClose: (id: string) => void;
  /** Abre o setor em tela cheia para inspeção com zoom. */
  onExpand: (id: string) => void;
}

/** Card flutuante grande com a foto de close-up (real ou zoom CSS) de um setor. */
function MiniCard({ hotspot: h, image, onClose, onExpand }: MiniCardProps) {
  return (
    <div className="overflow-hidden border-2 border-brand-red bg-white shadow-xl">
      <div className="relative aspect-square w-full overflow-hidden bg-brand-light">
        {/* A própria foto é o gatilho da aba em tela cheia */}
        <button
          type="button"
          aria-label={`Ampliar ${h.label}`}
          onClick={() => onExpand(h.id)}
          className="group absolute inset-0 z-10 cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-red">
          <span className="absolute inset-0 bg-brand-charcoal/0 transition-colors group-hover:bg-brand-charcoal/25" />
          <span className="absolute bottom-1 left-1 flex h-6 items-center bg-brand-charcoal/75 px-2 text-[9px] font-bold uppercase tracking-wide text-white opacity-0 transition-opacity group-hover:opacity-100">
            Ampliar
          </span>
        </button>

        <Image
          src={h.closeupImage ?? image}
          alt={h.label}
          fill
          sizes="230px"
          className="object-contain"
          style={
            h.closeupImage
              ? undefined
              : {
                  transform: "scale(2.3)",
                  transformOrigin: `${h.left}% ${h.top}%`,
                }
          }
        />
        <button
          type="button"
          aria-label={`Fechar ${h.label}`}
          onClick={() => onClose(h.id)}
          className="absolute top-1 right-1 z-20 flex h-6 w-6 cursor-pointer items-center justify-center bg-brand-charcoal/80 text-sm leading-none text-white hover:bg-brand-red">
          ×
        </button>
      </div>
      <p className="px-2 py-2 text-center text-[10px] font-bold uppercase leading-tight tracking-wide text-brand-charcoal sm:text-xs">
        {h.label}
      </p>
    </div>
  );
}
