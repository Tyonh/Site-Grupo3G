import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NatalOrcamentoForm from "@/components/natal/NatalOrcamentoForm";
import ParallaxHero from "@/components/natal/ParallaxHero";
import LogoVideoReveal from "@/components/natal/LogoVideoReveal";
import ScrollScrubPanel from "@/components/natal/ScrollScrubPanel";
import Magnetic from "@/components/natal/Magnetic";
import { natalCategories } from "@/lib/natalCatalog";

export const metadata: Metadata = {
  title: "Natal 3G — Iluminação e Decoração Natalina",
  description:
    "Cordões, mangueiras, fitas de LED, árvores gigantes, figuras 3D e infláveis. A linha natalina completa do Grupo 3G.",
};

export default function NatalHomePage() {
  return (
    <>
      <Navbar />

      <main className="w-full bg-black text-white">
        {/* ═══════════ ABERTURA — LOGO COMO MÁSCARA DE VÍDEO ═══════════ */}
        <LogoVideoReveal
          videoSrc="/natal/videos/vermelho hd.mp4"
          logoSrc="/3G VETOR branco.png"
        />

        {/* ═══════════ HERO CINEMATOGRÁFICO (parallax de scroll) ═══════════ */}
        <ParallaxHero
          imageSrc="/natal/hero-natal.jpg"
          imageAlt="Rua decorada com cortinas de luz natalinas à noite">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-16 pb-16 sm:pb-24 flex flex-col gap-5">
            <span className="text-natal-gold font-bold tracking-[0.35em] text-xs sm:text-sm uppercase">
              Coleção Natal — Grupo 3G
            </span>
            <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-8xl font-black uppercase leading-[0.95] tracking-tight max-w-4xl">
              A luz que
              <br />
              transforma
            </h1>
            <p className="max-w-xl text-sm sm:text-base text-white/70 font-light leading-relaxed">
              Da fachada de uma casa à praça de uma cidade inteira. Sem limites,
              sem regras — a decoração é sua, a tecnologia é nossa.
            </p>
            <div className="flex flex-col xs:flex-row gap-3 mt-2">
              <Magnetic strength={0.3} className="inline-block">
                <a
                  href="#colecao"
                  className="inline-flex items-center justify-center h-13 min-h-12 px-10 bg-white text-black font-bold hover:bg-natal-gold transition-colors uppercase tracking-[0.2em] text-xs">
                  Explorar Coleção
                </a>
              </Magnetic>
              <Magnetic strength={0.3} className="inline-block">
                <a
                  href="#orcamento"
                  className="inline-flex items-center justify-center min-h-12 px-10 border border-white/40 text-white font-bold hover:border-natal-gold hover:text-natal-gold transition-colors uppercase tracking-[0.2em] text-xs">
                  Orçamento
                </a>
              </Magnetic>
            </div>
          </div>
        </ParallaxHero>

        {/* ═══════════ LINEUP — CADA CATEGORIA COMO UM "MODELO" (scroll-scrub) ═══════════ */}
        <section id="colecao" className="scroll-mt-16">
          {natalCategories.map((cat, i) => (
            <ScrollScrubPanel
              key={cat.slug}
              href={`/natal/${cat.slug}`}
              photo={cat.photo}
              alt={cat.name}
              index={i}>
              <span className="text-natal-gold font-bold tracking-[0.3em] text-[10px] sm:text-xs uppercase mb-3">
                {String(i + 1).padStart(2, "0")} — Coleção Natal
              </span>
              <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none max-w-xl">
                {cat.name}
              </h2>
              <p
                className={`mt-4 max-w-md text-xs sm:text-sm text-white/65 font-light leading-relaxed ${
                  i % 2 !== 0 ? "sm:ml-auto" : ""
                }`}>
                {cat.whatIs}
              </p>
              <Magnetic strength={0.4} className="mt-6 inline-block">
                <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-white group-hover:text-natal-gold transition-colors">
                  Explorar
                  <span className="inline-block w-10 h-[1px] bg-current transition-all group-hover:w-16" />
                </span>
              </Magnetic>
            </ScrollScrubPanel>
          ))}
        </section>

        {/* ═══════════ CTA ORÇAMENTO ═══════════ */}
        <section
          id="orcamento"
          className="relative py-20 sm:py-28 scroll-mt-16 overflow-hidden">
          <div className="absolute inset-0 opacity-25">
            <Image
              src="/natal/app-arvores-gigantes-figuras.jpg"
              alt=""
              aria-hidden
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />

          <div className="relative max-w-3xl mx-auto px-4 sm:px-8 flex flex-col items-center text-center gap-6">
            <span className="text-natal-gold font-bold tracking-[0.35em] text-xs uppercase">
              Fale com a gente
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight">
              Seu projeto, nossa luz
            </h2>
            <p className="text-white/60 text-sm sm:text-base max-w-xl font-light">
              Uma peça ou um projeto completo — conte o que você imagina e
              retornamos com o orçamento.
            </p>
            <NatalOrcamentoForm />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
