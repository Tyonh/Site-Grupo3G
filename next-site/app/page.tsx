import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import GroupNavbar from "@/components/GroupNavbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/siteConfig";

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
  /** Vídeo de fundo em loop — mesmo arquivo já usado na área da marca
   *  (3G: hero da home /3g; EBRON: vídeo próprio; Natal: entrada da árvore) */
  video: string;
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
    video: "/natal/videos/arvore.mp4",
    bg: "bg-natal-green",
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
    video: "/landipagevi.mp4",
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
    video: "/ebron-bg.mp4",
    bg: "bg-ebron-navy",
    accent: "text-ebron-blue-light",
    hoverAccent: "group-hover:text-ebron-blue-light",
    tint: "bg-ebron-blue/45",
  },
];

export default function GroupHome() {
  return (
    <>
      {/* Sinal de prioridade máxima pro vídeo da primeira porta (Natal): sem
          isso o navegador só começa a baixá-lo quando o parser alcança o
          <video> no DOM, atrasando o autoplay em relação ao resto da página. */}
      <link rel="preload" href="/natal/videos/arvore.mp4" as="video" type="video/mp4" />
      <GroupNavbar />
      <main className="flex-1 w-full flex flex-col">
        {/* Hero institucional — horizontal, full-bleed, com vídeo de fundo
            (imagens aéreas) e um véu vermelho/preto por cima pra manter a
            identidade de cor do Grupo 3G e a legibilidade do texto */}
        <section className="relative flex min-h-[calc(100svh-5rem)] w-full items-center overflow-hidden bg-brand-charcoal px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/grupo3g-hero-bg.mp4" type="video/mp4" />
          </video>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg, rgba(122,21,24,0.72) 0%, rgba(122,21,24,0.58) 28%, rgba(20,8,8,0.42) 60%, rgba(20,8,8,0.22) 100%)",
            }}
          />

          <div className="relative z-10 mx-auto flex w-full max-w-7xl min-w-0 flex-col gap-5 text-left">
            <span className="max-w-xl text-xs font-extrabold uppercase leading-relaxed tracking-[0.18em] text-natal-gold sm:text-sm sm:tracking-[0.3em]">
              Iluminando cidades e indústrias há mais de 30 anos
            </span>
            <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-black uppercase leading-[1.05] tracking-tight text-white">
              Grupo 3G
            </h1>
            <p className="max-w-xl text-base font-light leading-relaxed text-white/85 sm:text-lg">
              Pioneiros em tecnologia LED no Ceará. Reunimos duas marcas de
              iluminação — 3G e EBRON — e a linha completa de decoração
              natalina, cada uma com sua própria identidade.
            </p>
          </div>
        </section>

        {/* Portas de entrada — 3G, EBRON, Natal. Cada marca ganha sua própria
            faixa horizontal (full-bleed), empilhadas na página: vídeo em loop
            no fundo (o mesmo já usado na área de cada marca), produto
            principal de um lado, texto do outro — alternando lado a cada porta. */}
        <section className="flex w-full flex-col">
          {doors.map((door) => {
            const imageFirst = Boolean(door.reverse);
            return (
              <Link
                key={door.href}
                href={door.href}
                className={`group relative flex min-h-[min(70svh,48rem)] w-full items-center overflow-hidden px-4 py-12 text-white transition-colors duration-500 focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-white sm:px-8 sm:py-16 lg:px-12 ${door.bg}`}
              >
                {/* Vídeo de fundo — preload="auto" pra começar a rodar já na
                    carga da página, sem esperar o navegador priorizar
                    (default seria "metadata", que atrasa o autoplay) */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="absolute inset-0 h-full w-full object-cover"
                >
                  <source src={door.video} type="video/mp4" />
                </video>
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
                    <span className={`text-xs font-extrabold uppercase tracking-[0.3em] ${door.accent}`}>
                      Grupo 3G
                    </span>
                    <h2 className="text-3xl font-black uppercase tracking-tight sm:text-4xl lg:text-5xl">
                      {door.name}
                    </h2>
                    <p className="max-w-sm text-base font-light leading-relaxed opacity-90">
                      {door.tagline}
                    </p>
                    <span
                      className={`mt-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors ${door.hoverAccent}`}
                    >
                      Explorar
                      <span className="inline-block h-[1px] w-8 bg-current transition-all group-hover:w-12" />
                    </span>
                  </div>

                  <div className="relative aspect-square w-full max-w-64 sm:max-w-80 md:w-[42%] md:max-w-lg md:shrink-0">
                    <Image
                      src={door.image}
                      alt={door.imageAlt}
                      fill
                      sizes="(min-width: 1280px) 512px, (min-width: 768px) 42vw, (min-width: 640px) 320px, (max-width: 288px) calc(100vw - 32px), 256px"
                      className="object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      </main>
      <Footer />
    </>
  );
}
