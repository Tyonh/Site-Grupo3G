"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProductTheme, productCheckMark } from "@/lib/productTheme";

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

// Cache bust estável por carregamento de sessão para otimização de rede do arquivo GLB de 162MB
const CACHE_BUST = typeof window !== "undefined" ? Date.now() : 1;
const ebronModelUrl = `/models/Ebron 100.glb?v=${CACHE_BUST}`;

export default function LuminariaEbronPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

      {/* Floating Theme Switcher */}
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className={`fixed top-24 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full border shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 pointer-events-auto ${
          theme === "dark"
            ? "bg-black/80 text-yellow-400 border-white/10 hover:border-yellow-400/50"
            : "bg-white/80 text-indigo-950 border-slate-200 hover:border-indigo-500/50"
        } backdrop-blur-md`}
        title={
          theme === "dark" ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"
        }
        aria-label="Alternar Tema">
        {theme === "dark" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-yellow-400">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m0 13.5V21M4.95 4.95l1.59 1.59m10.92 10.92l1.59 1.59M3 12h2.25m13.5 0H21M4.95 19.05l1.59-1.59m10.92-10.92l1.59-1.59M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-indigo-950">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
        )}
      </button>

      {/* 3D Background Canvas with Ebron 3D model */}
      <Product3DScene
        modelUrl={ebronModelUrl}
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
              EFICIÊNCIA URBANA
            </span>
            <h1 className={titleClass}>LUMINÁRIA EBRON</h1>
            <p className={textMutedClass}>
              Lançamento 2024. A união de excelente custo-benefício,
              durabilidade e eficiência de 100 lm/W. Fabricada em corpo de
              alumínio robusto para alto rendimento térmico.
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
            SECTION 2: ARCHITECTURE & BENEFITS
        ═══════════════════════════════════════════════════════════════ */}
        <section className="scroll-section min-h-screen flex items-center justify-center lg:justify-end px-4 sm:px-10 lg:px-20 py-20 pointer-events-none select-none">
          <div className={cardClass}>
            <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase">
              PROJETO MODERNO
            </span>
            <h2 className={title2Class}>DIFERENCIAIS EBRON</h2>
            <p className={textMutedClass}>
              Desenvolvida com corpo slim aerodinâmico e conjunto de lentes com
              amplo ângulo de projeção lateral, otimizando a distribuição de luz
              nas vias.
            </p>
            <ul className={listTextClass}>
              <li className="flex items-center gap-3">
                {checkMark}
                Corpo leve e resistente em liga de alumínio
              </li>
              <li className="flex items-center gap-3">
                {checkMark}
                Projeção uniforme com ângulo de 120°
              </li>
              <li className="flex items-center gap-3">
                {checkMark}
                Excelente dissipação térmica integrada à carcaça
              </li>
              <li className="flex items-center gap-3">
                {checkMark}
                Protetor contra surtos elétricos (Opcional)
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
              ESPECIFICAÇÕES CHAVE
            </span>
            <h2 className={title2Class}>DURABILIDADE E FOCO</h2>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className={subCardClass}>
                <h3 className="text-brand-red text-2xl font-black">100 lm/W</h3>
                <p className={subTextMutedClass}>Eficácia Luminosa</p>
              </div>
              <div className={subCardClass}>
                <h3 className="text-brand-red text-2xl font-black">IP66</h3>
                <p className={subTextMutedClass}>Grau de Proteção</p>
              </div>
              <div className={subCardClass}>
                <h3 className="text-brand-red text-2xl font-black">120°</h3>
                <p className={subTextMutedClass}>Projeção Óptica</p>
              </div>
              <div className={subCardClass}>
                <h3 className="text-brand-red text-2xl font-black">25.000h</h3>
                <p className={subTextMutedClass}>Vida Útil Nominal</p>
              </div>
              <div className={`${subCardClass} col-span-2`}>
                <h3 className="text-brand-red text-xl font-black">
                  IRC &ge; 80
                </h3>
                <p className={subTextMutedClass}>
                  Fidelidade de Cores Superior
                </p>
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
              FICHA COMPLETA
            </span>
            <h2 className={title2Class}>CARACTERÍSTICAS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-2 text-sm font-medium">
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Temp. Cor</span>
                <span className={detailValClass}>5000K</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Fator Potência</span>
                <span className={detailValClass}>&ge;0.92</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Eficácia</span>
                <span className="font-bold text-brand-red">100 lm/W</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Vida Útil</span>
                <span className={detailValClass}>25.000h</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Ângulo Projeção</span>
                <span className={detailValClass}>120°</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Grau Proteção</span>
                <span className="font-bold text-brand-red">IP66</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>IRC</span>
                <span className={detailValClass}>&ge;80</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Material</span>
                <span className={detailValClass}>Alumínio</span>
              </div>
              <div className={`${detailItemClass} col-span-1 sm:col-span-2`}>
                <span className={detailLabelClass}>Protetor de Surto</span>
                <span className={detailValClass}>Opcional</span>
              </div>
              <div className={`${detailItemClass} col-span-1 sm:col-span-2`}>
                <span className={detailLabelClass}>Modelo Versão</span>
                <span className={detailValClass}>EBRON 2024</span>
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
              POTÊNCIA & DIMENSÕES
            </span>
            <h2 className={title2Class}>MODELOS EBRON</h2>
            <p className={textMutedTableClass}>
              Consulte a tabela técnica de códigos e dimensões slim da linha
              EBRON.
            </p>
            <div className={tableWrapperClass}>
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className={theadClass}>
                  <tr>
                    <th className="p-3 sm:p-4 text-brand-red">Código</th>
                    <th className="p-3 sm:p-4">Potência</th>
                    <th className="p-3 sm:p-4">Fluxo Luminoso</th>
                    <th className="p-3 sm:p-4">Dimensões (AxL)</th>
                  </tr>
                </thead>
                <tbody className={tbodyClass}>
                  <tr className={trClass}>
                    <td className="p-3 sm:p-4 font-mono opacity-80">50612</td>
                    <td className="p-3 sm:p-4 font-bold">50W</td>
                    <td className="p-3 sm:p-4 font-bold text-brand-red">
                      5.000 lm
                    </td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">
                      38.7 x 12.7 cm
                    </td>
                  </tr>
                  <tr className={trClass}>
                    <td className="p-3 sm:p-4 font-mono opacity-80">50613</td>
                    <td className="p-3 sm:p-4 font-bold">100W</td>
                    <td className="p-3 sm:p-4 font-bold text-brand-red">
                      10.000 lm
                    </td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">
                      45.6 x 14.5 cm
                    </td>
                  </tr>
                  <tr className={trClass}>
                    <td className="p-3 sm:p-4 font-mono opacity-80">50614</td>
                    <td className="p-3 sm:p-4 font-bold">150W</td>
                    <td className="p-3 sm:p-4 font-bold text-brand-red">
                      15.000 lm
                    </td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">
                      53.0 x 17.8 cm
                    </td>
                  </tr>
                  <tr className={trClass}>
                    <td className="p-3 sm:p-4 font-mono opacity-80">50615</td>
                    <td className="p-3 sm:p-4 font-bold">200W</td>
                    <td className="p-3 sm:p-4 font-bold text-brand-red">
                      20.000 lm
                    </td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">
                      60.2 x 19.6 cm
                    </td>
                  </tr>
                  <tr className={trClass}>
                    <td className="p-3 sm:p-4 font-mono opacity-80">50616</td>
                    <td className="p-3 sm:p-4 font-bold">300W</td>
                    <td className="p-3 sm:p-4 font-bold text-brand-red">
                      30.000 lm
                    </td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">
                      69.7 x 22.4 cm
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 6: 3D PRODUCT SHOWCASE (Static presentation)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-10 lg:px-20 py-20 pointer-events-none select-none">
          <div className={showcasePanelClass}>
            {/* Left Column: 3D Canvas with Ebron model */}
            <div className={showcaseCanvasClass}>
              <LocalProduct3DScene
                modelUrl={ebronModelUrl}
                selectedPower="100w"
                theme={theme}
              />
            </div>

            {/* Right Column: Product Info Panel */}
            <div className={showcaseInfoPanelClass}>
              <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase">
                APRESENTAÇÃO 3D
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase leading-tight">
                Luminária Ebron
              </h2>
              <p
                className={`text-sm sm:text-base font-normal leading-relaxed ${
                  theme === "dark" ? "text-gray-300" : "text-slate-600"
                }`}>
                Explore o modelo tridimensional de engenharia da luminária
                EBRON. Visualize em detalhes o design slim aerodinâmico,
                as aletas de dissipação térmica e o conjunto óptico de
                projeção de 120°.
              </p>
              <div className="flex flex-col gap-3 mt-2">
                <div
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-500 ${
                    theme === "dark"
                      ? "bg-white/5 border-white/10"
                      : "bg-slate-50 border-slate-200"
                  }`}>
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-red/15 text-brand-red text-xs font-black">IP</span>
                  <div>
                    <span className="font-bold text-sm">IP66</span>
                    <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>Proteção contra poeira e jatos d'água</p>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-500 ${
                    theme === "dark"
                      ? "bg-white/5 border-white/10"
                      : "bg-slate-50 border-slate-200"
                  }`}>
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-red/15 text-brand-red text-xs font-black">lm</span>
                  <div>
                    <span className="font-bold text-sm">100 lm/W</span>
                    <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>Eficácia luminosa de alta performance</p>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-500 ${
                    theme === "dark"
                      ? "bg-white/5 border-white/10"
                      : "bg-slate-50 border-slate-200"
                  }`}>
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-red/15 text-brand-red text-xs font-black">Al</span>
                  <div>
                    <span className="font-bold text-sm">Alumínio Premium</span>
                    <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>Corpo slim com dissipação integrada</p>
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
