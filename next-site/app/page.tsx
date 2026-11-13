import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { preload } from "react-dom";
import GroupNavbar from "@/components/GroupNavbar";
import Footer from "@/components/Footer";
import LazyVideo from "@/components/LazyVideo";
import HeroReel, { type HeroClip } from "@/components/HeroReel";
import MosaicGallery from "@/components/MosaicGallery";
import { mosaicRows } from "@/lib/homeMosaic";
import { siteConfig } from "@/lib/siteConfig";

// Grotesca da home (mesma família de estilo dos sites de referência). Declarada
// aqui, e não no layout, para só ser baixada na página inicial.
const grotesk = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { absolute: "Grupo 3G - Luz que Transforma" },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

interface Door {
  href: string;
  name: string;
  tagline: string;
  /** Foto do produto principal, em primeiro plano sobre o vídeo */
  image: string;
  imageAlt: string;
  /** Classes extras da foto do produto (ex.: centralizar uma arte em que o
   *  objeto não está no meio do arquivo). */
  imageClass?: string;
  /** Vídeo de fundo em loop — mesmo arquivo já usado na área da marca
   *  (3G: hero da home /3g; EBRON: vídeo próprio; Natal: entrada da árvore) */
  video: string;
  /** Quadro inicial do vídeo: aparece na hora, antes de o vídeo ser baixado */
  poster: string;
  /** Classes do vídeo na faixa. Vídeo horizontal cobre a faixa inteira; o da
   *  árvore é vertical (9:16): fica inteiro e centralizado, e as laterais
   *  esmaecem para a cor da faixa (que tem o mesmo cinza do fundo do vídeo). */
  videoClass: string;
  /** Velocidade do vídeo (1 = normal). Omitir mantém a original. */
  videoSpeed?: number;
  /** Cor sólida atrás do vídeo (evita flash em branco/preto no carregamento) */
  bg: string;
  accent: string;
  hoverAccent: string;
  /** Cor sólida da marca usada como véu sobre o vídeo — some ao passar o mouse */
  tint: string;
  /** Inverte o lado: true = texto à direita, produto à esquerda */
  reverse?: boolean;
}

const doors: Door[] = [
  {
    href: "/natal",
    name: "Natal",
    tagline: "Cordões, mangueiras, fitas de LED, árvores gigantes e a decoração natalina completa.",
    image: "/natal/foto-arvore.png",
    imageAlt: "Árvore de Natal decorada — produto Grupo 3G",
    // No PNG a árvore (com os presentes) está à esquerda: ocupa de 11% a 61% da
    // largura, centro em 36%. Deslocar 13,9% da largura a leva para o meio.
    imageClass: "translate-x-[13.9%]",
    video: "/natal/videos/arvore.mp4",
    poster: "/posters/door-natal.jpg",
    // 1.5 = uma vez e meia a velocidade (o vídeo original dura 12,5 s). Ajuste aqui.
    videoSpeed: 1.5,
    videoClass:
      "absolute inset-y-0 left-1/2 aspect-[9/16] h-full w-auto -translate-x-1/2 object-cover [mask-image:linear-gradient(to_right,transparent,#000_22%,#000_78%,transparent)]",
    // Mesma cor do fundo do vídeo da árvore (#f3f3f3): o vídeo, agora menor e
    // centralizado, se funde à faixa e ela mantém o degradê cinza de antes.
    bg: "bg-[#f3f3f3]",
    accent: "text-natal-gold",
    hoverAccent: "group-hover:text-natal-gold",
    tint: "bg-natal-green/42",
  },
  {
    href: "/3g",
    name: "3G",
    tagline: "Refletores, luminárias solares e homologadas para iluminação pública e industrial.",
    image: "/solar-helios.png",
    imageAlt: "Luminária Solar 3G",
    video: "/landipagevi-web.mp4",
    poster: "/posters/door-3g.jpg",
    videoClass: "absolute inset-0 h-full w-full object-cover",
    bg: "bg-brand-charcoal",
    accent: "text-brand-red",
    hoverAccent: "group-hover:text-brand-red",
    tint: "bg-brand-red/42",
    reverse: true,
  },
  {
    href: "/ebron",
    name: "EBRON",
    tagline: "Iluminação urbana com o melhor custo-benefício: EBRON e EBRON PRO.",
    image: "/ebron-pro.png",
    imageAlt: "Luminária EBRON PRO",
    video: "/ebron-bg-web.mp4",
    poster: "/posters/door-ebron.jpg",
    videoClass: "absolute inset-0 h-full w-full object-cover",
    bg: "bg-ebron-navy",
    accent: "text-ebron-blue-light",
    hoverAccent: "group-hover:text-ebron-blue-light",
    tint: "bg-ebron-blue/45",
  },
];

/**
 * Vídeos do hero, na ordem em que passam: os 3 escolhidos pela empresa na
 * pasta "video pra entrada da pagina". Horizontais (16:9), em Full HD
 * (1920×1080) a partir dos originais em 4K, para preencher a tela toda sem
 * perder nitidez.
 */
const heroClips: HeroClip[] = [
  { src: "/mosaico/hero-arco.mp4", poster: "/mosaico/hero-arco.jpg", label: "Arco Nossa Senhora" },
  { src: "/mosaico/hero-estadio.mp4", poster: "/mosaico/hero-estadio.jpg", label: "Estádio do Junco" },
  { src: "/mosaico/hero-estrada.mp4", poster: "/mosaico/hero-estrada.jpg", label: "Seguindo o ciclista" },
];

export default function GroupHome() {
  // A capa do vídeo do hero é o maior elemento da primeira tela (LCP). Com
  // preload de alta prioridade ela sai já no começo da carga, em vez de ficar
  // na fila atrás dos scripts (o servidor ainda fala HTTP/1.1: 6 por vez).
  preload(heroClips[0].poster, { as: "image", fetchPriority: "high" });

  return (
    <div className={`${grotesk.className} relative flex flex-1 flex-col`}>
      <GroupNavbar />
      <main className="flex-1 w-full flex flex-col">
        {/* Hero — vários vídeos em sequência (método da Citadel), com uma
            miniatura de cada um embaixo e a frase centralizada. O Natal abre
            a sequência por conta da época. Sem filtro por cima dos vídeos: a
            leitura do texto fica por conta da sombra leve nas letras. */}
        <section className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-brand-charcoal px-6 pb-28 pt-24 text-center sm:px-10 [@media(max-height:520px)]:pb-20 [@media(max-height:520px)]:pt-16">
          <HeroReel clips={heroClips} />

          <div className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-6 [text-shadow:0_2px_28px_rgba(0,0,0,0.6)] [@media(max-height:520px)]:gap-3">
            <span className="text-xs font-semibold uppercase leading-relaxed tracking-[0.2em] text-white/80 sm:text-sm">
              Iluminando cidades e indústrias há mais de{" "}
              <strong className="font-extrabold text-white">30 anos</strong>
            </span>
            <h1 className="text-[clamp(2.5rem,min(1.2rem+7vw,16svh),7.5rem)] font-medium leading-[0.95] tracking-[-0.035em] text-white">
              <span className="sr-only">Grupo 3G — </span>
              Luz que
              <br />
              transforma.
            </h1>
            <p className="max-w-xl text-base font-medium leading-relaxed text-white [text-shadow:0_0_3px_rgba(0,0,0,0.9),0_1px_10px_rgba(0,0,0,0.85),0_2px_28px_rgba(0,0,0,0.75)] sm:text-lg [@media(max-height:520px)]:hidden">
              <strong className="font-bold text-white">Pioneiros em tecnologia LED no Ceará</strong>. Reunimos duas marcas de iluminação — 3G e
              EBRON — e a linha completa de decoração natalina, cada uma com sua própria
              identidade.
            </p>
            <Link
              href="#aplicacoes"
              className="group mt-2 inline-flex items-center gap-5 bg-white pl-5 text-sm font-semibold uppercase tracking-[0.12em] text-brand-charcoal [text-shadow:none] transition-colors hover:bg-brand-light focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Ver aplicações
              <span className="flex h-12 w-12 items-center justify-center bg-brand-red text-white transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight aria-hidden="true" size={20} strokeWidth={2} />
              </span>
            </Link>
          </div>
        </section>
        {/* Aplicações — mosaico de fotos e vídeos em formatos variados (estilo
            Anduril): campos de futebol, estradas e decoração natalina. */}
        <section id="aplicacoes" className="scroll-mt-4 bg-brand-charcoal px-2 pb-2 pt-20 sm:px-3 sm:pb-3 sm:pt-28">
          <div className="mx-auto mb-10 flex w-full max-w-[1800px] flex-col gap-6 px-4 sm:mb-14 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-11">
            <div>
              <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                <span aria-hidden="true" className="h-3 w-3 bg-brand-red" />
                Aplicações
              </span>
              <h2 className="mt-5 text-[clamp(2.25rem,1.2rem+4.2vw,5rem)] font-medium leading-[1] tracking-[-0.03em] text-white">
                Onde a nossa luz trabalha.
              </h2>
            </div>
            <p className="max-w-sm text-base leading-relaxed text-white/70">
              Campos esportivos, estradas e decoração natalina: a mesma tecnologia LED em escalas
              e usos diferentes.
            </p>
          </div>
          <MosaicGallery rows={mosaicRows} />
        </section>

        {/* Portas de entrada — 3G, EBRON, Natal. Cada marca ganha sua própria
            faixa horizontal (full-bleed), empilhadas na página: vídeo em loop
            no fundo (o mesmo já usado na área de cada marca), produto
            principal de um lado, texto do outro — alternando lado a cada porta. */}
        <section className="mt-2 flex w-full flex-col sm:mt-3">
          {doors.map((door) => {
            const imageFirst = Boolean(door.reverse);
            return (
              <Link
                key={door.href}
                href={door.href}
                className={`group relative flex min-h-[min(70svh,48rem)] w-full items-center overflow-hidden px-4 py-12 text-white transition-colors duration-500 focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-white sm:px-8 sm:py-16 lg:px-12 ${door.bg}`}
              >
                {/* Vídeo de fundo — só baixa quando chega perto da tela (as portas
                    ficam abaixo do hero); a capa aparece na hora. Antes todos
                    baixavam inteiros já na carga e travavam o resto da página. */}
                <LazyVideo
                  src={door.video}
                  poster={door.poster}
                  className={door.videoClass}
                  playbackRate={door.videoSpeed}
                />
                {/* Véu com a cor da marca — cobre o vídeo por padrão e some ao
                    passar o mouse, revelando o vídeo "sem efeito". Alpha em
                    vez de multiply pra tingir de forma consistente mesmo em
                    vídeos claros (ex: EBRON, close de produto bem iluminado) */}
                <div
                  className={`absolute inset-0 transition-opacity duration-700 ease-out group-hover:opacity-0 ${door.tint}`}
                />
                {/* Degradê pra legibilidade do texto */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/5" />

                <div
                  className={`relative z-10 mx-auto flex w-full max-w-7xl min-w-0 flex-col items-center gap-8 md:flex-row md:justify-between md:gap-10 xl:mx-0 xl:max-w-none xl:gap-16 ${
                    imageFirst ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`flex w-full min-w-0 max-w-md flex-col items-center gap-4 text-center md:flex-1 ${
                      imageFirst ? "md:items-end md:text-right" : "md:items-start md:text-left"
                    }`}
                  >
                    <span className={`text-xs font-semibold uppercase tracking-[0.25em] ${door.accent}`}>
                      Grupo 3G
                    </span>
                    <h2 className="text-5xl font-medium tracking-[-0.03em] sm:text-6xl lg:text-7xl">
                      {door.name}
                    </h2>
                    <p className="max-w-sm text-base leading-relaxed opacity-90">{door.tagline}</p>
                    <span
                      className={`mt-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest transition-colors ${door.hoverAccent}`}
                    >
                      Explorar
                      <span className="inline-block h-[1px] w-8 bg-current transition-[width] group-hover:w-12" />
                    </span>
                  </div>

                  <div className="relative aspect-square w-full max-w-64 sm:max-w-80 md:w-[42%] md:max-w-lg md:shrink-0">
                    <Image
                      src={door.image}
                      alt={door.imageAlt}
                      fill
                      sizes="(min-width: 1280px) 512px, (min-width: 768px) 42vw, (min-width: 640px) 320px, (max-width: 288px) calc(100vw - 32px), 256px"
                      className={`object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:scale-105 ${door.imageClass ?? ""}`}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </section>

        {/* Chamada final */}
        <section className="bg-brand-red px-6 py-20 text-white sm:px-10 sm:py-28 lg:px-14">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-3xl text-[clamp(2.5rem,1.4rem+4.6vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.03em]">
              Vamos iluminar o seu projeto?
            </h2>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-5 bg-white pl-5 text-sm font-semibold uppercase tracking-[0.12em] text-brand-charcoal transition-colors hover:bg-brand-light focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Falar no WhatsApp
              <span className="flex h-12 w-12 items-center justify-center bg-brand-charcoal text-white transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight aria-hidden="true" size={20} strokeWidth={2} />
              </span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
