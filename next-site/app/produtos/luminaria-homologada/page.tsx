"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProductTheme, productCheckMark } from "@/lib/productTheme";
import { useInView } from "@/hooks/useInView";

// Lazy loading das cenas 3D para otimização extrema do LCP e TBT
const Product3DScene = dynamic(
  () =>
    import("@/components/3d/Product3DScene").then((mod) => mod.Product3DScene),
  { ssr: false },
);

const LocalProduct3DScene = dynamic(
  () =>
    import("@/components/3d/LocalProduct3DScene").then(
      (mod) => mod.LocalProduct3DScene,
    ),
  { ssr: false },
);

// Cache bust estável por carregamento de sessão
const CACHE_BUST = typeof window !== "undefined" ? Date.now() : 1;
const homologadaModelUrl = `/models/Homologada.final.glb?v=${CACHE_BUST}`;

export default function LuminariaHomologadaPage() {
  const theme: "light" | "dark" = "light";
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { ref: showcaseRef, isInView: isShowcaseInView } =
    useInView<HTMLElement>("300px");

  // ─── Theme styling helpers (shared across all /produtos/* pages) ───
  const {
    cardClass,
    cardWideClass,
    cardTableClass,
    titleClass,
    title2Class,
    textMutedClass,
    textMutedTableClass,
    subCardClass,
    subTextMutedClass,
    listTextClass,
    detailItemClass,
    detailLabelClass,
    detailValClass,
    tableWrapperClass,
    theadClass,
    tbodyClass,
    trClass,
    showcasePanelClass,
    showcaseCanvasClass,
    showcaseInfoPanelClass,
  } = getProductTheme(theme);

  const checkMark = productCheckMark;

  return (
    <>
      <Navbar />

      {/* 3D Background Canvas with Homologada 3D model */}
      <Product3DScene
        modelUrl={homologadaModelUrl}
        isInteractive={false}
        setIsInteractive={() => {}}
        scrollContainerRef={scrollContainerRef}
        selectedPower="100w"
        theme={theme}
      />

      {/* Main scrollable content */}
      <div
        ref={scrollContainerRef}
        className="relative z-10 w-full flex flex-col bg-transparent">
        {/* ═══════════════════════════════════════════════════════════════
            SECTION 1: HERO
        ═══════════════════════════════════════════════════════════════ */}
        <section className="scroll-section min-h-screen flex items-center justify-center lg:justify-start px-4 sm:px-10 lg:px-20 py-20 pointer-events-none select-none">
          <div className={cardClass}>
            <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase">
              ILUMINAÇÃO PÚBLICA PREMIUM
            </span>
            <h1 className={titleClass}>LUMINÁRIA HOMOLOGADA</h1>
            <p className={textMutedClass}>
              Desenvolvida sob rigorosos padrões de engenharia para atender aos
              requisitos das principais concessionárias de energia. Construída em
              alumínio injetado sob alta pressão com alta eficácia luminosa de 160 lm/W.
            </p>
            <a
              href="https://wa.me/5585986559388"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 bg-brand-red text-white font-bold rounded-xl mt-4 hover:bg-red-800 transition-colors uppercase tracking-wider text-sm shadow-lg text-center pointer-events-auto">
              Fale com um Especialista
            </a>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2: ARCHITECTURE & STRUCTURE (Specs from Diagram)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="scroll-section min-h-screen flex items-center justify-center lg:justify-end px-4 sm:px-10 lg:px-20 py-20 pointer-events-none select-none">
          <div className={cardClass}>
            <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase">
              CONSTRUÇÃO ROBUSTA
            </span>
            <h2 className={title2Class}>DIFERENCIAIS TÉCNICOS</h2>
            <p className={textMutedClass}>
              Cada componente foi otimizado para longos ciclos operacionais, com
              foco na dissipação de calor eficiente e conformidade com as normas NBR IEC.
            </p>
            <ul className={listTextClass}>
              <li className="flex items-center gap-3">
                {checkMark}
                <strong>Base de Sete Pinos:</strong> NBR IEC 61610 para telegestão
              </li>
              <li className="flex items-center gap-3">
                {checkMark}
                <strong>Dissipador de Calor:</strong> Evita superaquecimento
              </li>
              <li className="flex items-center gap-3">
                {checkMark}
                <strong>Válvula de Escape:</strong> Alivia a pressão interna excessiva
              </li>
              <li className="flex items-center gap-3">
                {checkMark}
                <strong>Braço Angular Ajustável:</strong> Amplitude de 120° a 260°
              </li>
            </ul>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 3: SPECIFICATIONS — KEY HIGHLIGHTS
        ═══════════════════════════════════════════════════════════════ */}
        <section className="scroll-section min-h-screen flex items-center justify-center lg:justify-start px-4 sm:px-10 lg:px-20 py-20 pointer-events-none select-none">
          <div className={cardClass}>
            <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase">
              PERFORMANCE EXTREMA
            </span>
            <h2 className={title2Class}>EFICIÊNCIA E PROTEÇÃO</h2>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className={subCardClass}>
                <h3 className="text-brand-red text-2xl font-black">160 lm/W</h3>
                <p className={subTextMutedClass}>Eficácia Luminosa</p>
              </div>
              <div className={subCardClass}>
                <h3 className="text-brand-red text-2xl font-black">IP66 / IK08</h3>
                <p className={subTextMutedClass}>Grau & Impacto</p>
              </div>
              <div className={subCardClass}>
                <h3 className="text-brand-red text-2xl font-black">10Kv/5Ka</h3>
                <p className={subTextMutedClass}>Protetor de Surto</p>
              </div>
              <div className={subCardClass}>
                <h3 className="text-brand-red text-2xl font-black">60.000h</h3>
                <p className={subTextMutedClass}>Vida Útil Nominal</p>
              </div>
              <div className={`${subCardClass} col-span-2`}>
                <h3 className="text-brand-red text-xl font-black">
                  Alumínio Injetado
                </h3>
                <p className={subTextMutedClass}>Corpo de alta resistência</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 4: DETAILED CHARACTERISTICS GRID
        ═══════════════════════════════════════════════════════════════ */}
        <section className="scroll-section min-h-screen flex items-center justify-center lg:justify-end px-4 sm:px-10 lg:px-20 py-20 pointer-events-none select-none">
          <div className={cardWideClass}>
            <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase">
              ESPECIFICAÇÕES COMPLETA
            </span>
            <h2 className={title2Class}>CARACTERÍSTICAS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-2 text-sm font-medium">
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Temp. Cor</span>
                <span className={detailValClass}>5000K</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Fator Potência</span>
                <span className={detailValClass}>&gt;0.98</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>IRC</span>
                <span className={detailValClass}>&gt;70</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Frequência</span>
                <span className={detailValClass}>50/60 Hz</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Eficácia</span>
                <span className="font-bold text-brand-red">160 lm/W</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Impacto</span>
                <span className={detailValClass}>IK08</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Proteção</span>
                <span className="font-bold text-brand-red">IP66</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Regulável</span>
                <span className={detailValClass}>-5 a 50 °C</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Drive Incluído</span>
                <span className={detailValClass}>Sim</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Protetor Surto</span>
                <span className={detailValClass}>10Kv / 5Ka</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Vida Útil</span>
                <span className={detailValClass}>60.000 hrs</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Temp. Ambiente</span>
                <span className={detailValClass}>-5 a 50 °C</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Tipo de Lente</span>
                <span className={detailValClass}>Lentes de PMMA</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Lente Ângulo</span>
                <span className={detailValClass}>150° / 160°</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Dist. Transversal</span>
                <span className={detailValClass}>Tipo II</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Dist. Longitudinal</span>
                <span className={detailValClass}>Média</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 5: MODELS & DIMENSIONS TABLE
        ═══════════════════════════════════════════════════════════════ */}
        <section className="scroll-section min-h-screen flex items-center justify-center lg:justify-start px-4 sm:px-10 lg:px-20 py-20 pointer-events-none select-none">
          <div className={cardTableClass}>
            <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase">
              POTÊNCIA SOB MEDIDA
            </span>
            <h2 className={title2Class}>MODELOS E DIMENSÕES</h2>
            <p className={textMutedTableClass}>
              Diferentes variações para se adequar perfeitamente a postes públicos de diversas alturas e larguras de via.
            </p>
            <div className={tableWrapperClass}>
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className={theadClass}>
                  <tr>
                    <th className="p-3 sm:p-4 text-brand-red">Código</th>
                    <th className="p-3 sm:p-4">Potência</th>
                    <th className="p-3 sm:p-4">Fluxo Luminoso</th>
                    <th className="p-3 sm:p-4">Peso</th>
                    <th className="p-3 sm:p-4">Dimensões (mm)</th>
                  </tr>
                </thead>
                <tbody className={tbodyClass}>
                  <tr className={trClass}>
                    <td className="p-3 sm:p-4 font-mono opacity-80">50501</td>
                    <td className="p-3 sm:p-4 font-bold">50W</td>
                    <td className="p-3 sm:p-4 font-bold text-brand-red">8.000 lm</td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">1.38kg</td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">530 x 140 x 93</td>
                  </tr>
                  <tr className={trClass}>
                    <td className="p-3 sm:p-4 font-mono opacity-80">50502</td>
                    <td className="p-3 sm:p-4 font-bold">100W</td>
                    <td className="p-3 sm:p-4 font-bold text-brand-red">16.000 lm</td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">1.78kg</td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">580 x 170,5 x 130</td>
                  </tr>
                  <tr className={trClass}>
                    <td className="p-3 sm:p-4 font-mono opacity-80">50503</td>
                    <td className="p-3 sm:p-4 font-bold">150W</td>
                    <td className="p-3 sm:p-4 font-bold text-brand-red">24.000 lm</td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">2.08kg</td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">630 x 180 x 140</td>
                  </tr>
                  <tr className={trClass}>
                    <td className="p-3 sm:p-4 font-mono opacity-80">50504</td>
                    <td className="p-3 sm:p-4 font-bold">200W</td>
                    <td className="p-3 sm:p-4 font-bold text-brand-red">32.000 lm</td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">2.69kg</td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">755 x 210 x 140</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 6: 3D PRODUCT SHOWCASE (Static presentation)
        ═══════════════════════════════════════════════════════════════ */}
        <section
          ref={showcaseRef}
          className="min-h-screen flex items-center justify-center px-4 sm:px-10 lg:px-20 py-20 pointer-events-none select-none">
          <div className={showcasePanelClass}>
            {/* Left Column: 3D Canvas with Homologada model — deferred until the section nears the viewport to avoid a second live WebGL context for the whole scroll */}
            <div className={showcaseCanvasClass}>
              {isShowcaseInView && (
                <LocalProduct3DScene
                  modelUrl={homologadaModelUrl}
                  selectedPower="100w"
                  theme={theme}
                />
              )}
            </div>

            {/* Right Column: Product Info Panel */}
            <div className={showcaseInfoPanelClass}>
              <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase">
                APRESENTAÇÃO 3D
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase leading-tight">
                Luminária Homologada
              </h2>
              <p className="text-sm sm:text-base font-normal leading-relaxed text-slate-600">
                Explore o modelo tridimensional de engenharia da luminária
                HOMOLOGADA. Rotacione o modelo com o mouse para inspecionar em detalhes
                o corpo robusto de alumínio injetado, as lentes de PMMA de alto rendimento
                e a base de sete pinos.
              </p>
              <div className="flex flex-col gap-3 mt-2">
                <div className="flex items-center gap-3 p-3 rounded-xl border transition-all duration-500 bg-slate-50 border-slate-200">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-red/15 text-brand-red text-xs font-black">7P</span>
                  <div>
                    <span className="font-bold text-sm">Base NBR IEC 61610</span>
                    <p className="text-xs text-slate-500">Equipada com base de 7 pinos para telegestão</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl border transition-all duration-500 bg-slate-50 border-slate-200">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-red/15 text-brand-red text-xs font-black">160</span>
                  <div>
                    <span className="font-bold text-sm">160 lm/W</span>
                    <p className="text-xs text-slate-500">Máxima eficiência em iluminação pública</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
