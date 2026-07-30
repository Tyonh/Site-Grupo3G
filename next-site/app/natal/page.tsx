import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NatalOrcamentoForm from "@/components/natal/NatalOrcamentoForm";
import ProductVideoHero from "@/components/natal/ProductVideoHero";
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
        {/* ═══════════ ABERTURA — PRODUTO EM VÍDEO SOBRE FUNDO BRANCO ═══════════ */}
        <ProductVideoHero
          videoSrc="/natal/videos/hero-cordao-branco.mp4"
          posterSrc="/natal/hero-cordao-poster.jpg"
          kicker="Catálogo Natal 2026 — Grupo 3G"
          title={
            <>
              Milhares de
              <br />
              pontos de luz
            </>
          }
          description="Cordões, mangueiras e fitas de LED prontos para vestir qualquer fachada — do jardim de casa à praça da cidade."
          tagline={
            <>
              A luz que
              <br />
              transforma
            </>
          }
          primaryCta={{ label: "Explorar Coleção", href: "#colecao" }}
          secondaryCta={{ label: "Orçamento", href: "#orcamento" }}
        />

        {/* ═══════════ LINEUP — CADA CATEGORIA COMO UM "MODELO" (scroll-scrub) ═══════════ */}
        <section id="colecao" className="scroll-mt-16">
          {natalCategories.map((cat, i) => {
            const isLight = Boolean(cat.video) && cat.mediaBg === "white";
            // Mesma regra de alternância do ScrollScrubPanel: a categoria 0
            // (split-left) já força texto à direita, então as demais
            // continuam a alternância a partir daí (par = direita).
            const isSplit = cat.mediaAlign === "left";
            const textOnRight = !isSplit && i % 2 === 0;
            return (
              <ScrollScrubPanel
                key={cat.slug}
                href={`/natal/${cat.slug}`}
                photo={cat.photo}
                video={cat.video}
                mediaBg={cat.mediaBg}
                mediaAlign={cat.mediaAlign}
                alt={cat.name}
                index={i}>
                <span
                  className={`font-bold tracking-[0.3em] text-[10px] sm:text-xs uppercase mb-3 ${
                    isLight ? "text-natal-red" : "text-natal-gold"
                  }`}>
                  {String(i + 1).padStart(2, "0")} — Coleção Natal
                </span>
                <h2
                  className={`text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none max-w-xl ${
                    isLight ? "text-black" : "text-white"
                  }`}>
                  {cat.name}
                </h2>
                <p
                  className={`mt-4 max-w-md text-xs sm:text-sm font-light leading-relaxed ${
                    isLight ? "text-black/65" : "text-white/65"
                  } ${textOnRight ? "sm:ml-auto" : ""}`}>
                  {cat.whatIs}
                </p>
                <Magnetic strength={0.4} className="mt-6 inline-block">
                  <span
                    className={`inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] transition-colors ${
                      isLight
                        ? "text-black group-hover:text-natal-red"
                        : "text-white group-hover:text-natal-gold"
                    }`}>
                    Explorar
                    <span className="inline-block w-10 h-[1px] bg-current transition-all group-hover:w-16" />
                  </span>
                </Magnetic>
              </ScrollScrubPanel>
            );
          })}
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
