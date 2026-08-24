import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NatalOrcamentoForm from "@/components/natal/NatalOrcamentoForm";
import ProductVideoHero from "@/components/natal/ProductVideoHero";
import ScrollScrubPanel from "@/components/natal/ScrollScrubPanel";
import Magnetic from "@/components/natal/Magnetic";
import { natalSections } from "@/lib/natalCatalog";
import { versioned } from "@/lib/natal/assetVersion";

export const metadata: Metadata = {
  // `absolute` ignora o template `%s — 3G Iluminação` do layout, senão o
  // nome da marca apareceria duas vezes no título da aba.
  title: { absolute: "Natal 3G - Luz que Transforma" },
  description:
    "Cordões, mangueiras, fitas de LED, árvores gigantes, figuras 3D e infláveis. A linha natalina completa do Grupo 3G.",
  alternates: { canonical: "/natal" },
};

export default function NatalHomePage() {
  return (
    <>
      <Navbar />

      <main className="w-full bg-black text-white">
        {/* ═══════════ ABERTURA — PRODUTO EM VÍDEO SOBRE FUNDO BRANCO ═══════════ */}
        <ProductVideoHero
          videoSrc={versioned("/natal/videos/arvore.mp4")}
          posterSrc={versioned("/natal/hero-cordao-poster.jpg")}
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

        {/* ═══════════ LINEUP — CADA GRUPO COMO UM "MODELO" (scroll-scrub) ═══════════ */}
        <section id="colecao" className="scroll-mt-16">
          {natalSections.map((sec, i) => {
            const isLight = Boolean(sec.video) && sec.mediaBg === "white";
            // Mesma regra de alternância do ScrollScrubPanel: o grupo 0
            // (split-left) já força texto à direita, então os demais
            // continuam a alternância a partir daí (par = direita).
            const isSplit =
              sec.mediaAlign === "left" || sec.mediaAlign === "right";
            const textOnRight = !isSplit && i % 2 === 0;
            // Painéis split-left claros (isLight) sobrepõem o texto no
            // vídeo com gradiente escuro no mobile, mas ficam ao lado do
            // vídeo num fundo claro no desktop — a cor do texto precisa
            // seguir essa troca de contexto por breakpoint.
            const overlayOnDark = isSplit && isLight;
            const kickerClass = overlayOnDark
              ? "text-natal-gold lg:text-natal-red"
              : isLight
                ? "text-natal-red"
                : "text-natal-gold";
            const titleClass = overlayOnDark
              ? "text-white lg:text-black"
              : isLight
                ? "text-black"
                : "text-white";
            const descClass = overlayOnDark
              ? "text-white/70 lg:text-black/65"
              : isLight
                ? "text-black/65"
                : "text-white/65";
            const exploreClass = overlayOnDark
              ? "text-white group-hover:text-natal-gold lg:text-black lg:group-hover:text-natal-red"
              : isLight
                ? "text-black group-hover:text-natal-red"
                : "text-white group-hover:text-natal-gold";
            return (
              <ScrollScrubPanel
                key={sec.slug}
                href={`/natal/${sec.slug}`}
                photo={sec.photo ? versioned(sec.photo) : sec.photo}
                video={sec.video ? versioned(sec.video) : sec.video}
                mediaBg={sec.mediaBg}
                mediaAlign={sec.mediaAlign}
                alt={sec.name}
                index={i}>
                <span
                  className={`font-bold tracking-[0.3em] text-[10px] sm:text-xs uppercase mb-3 ${kickerClass}`}>
                  {String(i + 1).padStart(2, "0")} — Coleção Natal
                </span>
                <h2
                  className={`text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none max-w-xl ${titleClass}`}>
                  {sec.name}
                </h2>
                <p
                  className={`mt-4 max-w-md text-xs sm:text-sm font-light leading-relaxed ${descClass} ${textOnRight ? "sm:ml-auto" : ""}`}>
                  {sec.blurb}
                </p>
                <Magnetic strength={0.4} className="mt-6 inline-block">
                  <span
                    className={`inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] transition-colors ${exploreClass}`}>
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
