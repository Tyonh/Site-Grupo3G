"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

// Cache bust estável por carregamento de sessão para otimização de rede do arquivo GLB de 178MB
const CACHE_BUST = typeof window !== "undefined" ? Date.now() : 1;
const homologadaModelUrl = `/models/Homologada.glb?v=${CACHE_BUST}`;

export default function LuminariaHomologadaPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // ─── Theme styling helpers (same premium pattern as previous pages) ───
  const cardClass =
    theme === "dark"
      ? "w-full max-w-[500px] bg-black/85 p-8 sm:p-10 rounded-3xl border border-white/10 text-white flex flex-col gap-4 pointer-events-auto shadow-2xl shadow-black/60 transition-all duration-500"
      : "w-full max-w-[500px] bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 text-slate-900 flex flex-col gap-4 pointer-events-auto shadow-xl shadow-slate-300/40 transition-all duration-500";

  const cardWideClass =
    theme === "dark"
      ? "w-full max-w-[550px] bg-black/85 p-8 sm:p-10 rounded-3xl border border-white/10 text-white flex flex-col gap-4 pointer-events-auto shadow-2xl shadow-black/60 transition-all duration-500"
      : "w-full max-w-[550px] bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 text-slate-900 flex flex-col gap-4 pointer-events-auto shadow-xl shadow-slate-300/40 transition-all duration-500";

  const cardTableClass =
    theme === "dark"
      ? "w-full max-w-[700px] bg-black/85 p-8 sm:p-10 rounded-3xl border border-white/10 text-white flex flex-col gap-4 pointer-events-auto shadow-2xl shadow-black/60 transition-all duration-500"
      : "w-full max-w-[700px] bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 text-slate-900 flex flex-col gap-4 pointer-events-auto shadow-xl shadow-slate-300/40 transition-all duration-500";

  const titleClass =
    theme === "dark"
      ? "text-3xl sm:text-4xl lg:text-5xl font-black leading-tight uppercase text-white transition-colors duration-500"
      : "text-3xl sm:text-4xl lg:text-5xl font-black leading-tight uppercase text-slate-900 transition-colors duration-500";

  const title2Class =
    theme === "dark"
      ? "text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white transition-colors duration-500"
      : "text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-slate-900 transition-colors duration-500";

  const textMutedClass =
    theme === "dark"
      ? "text-gray-300 font-normal text-sm sm:text-base leading-relaxed transition-colors duration-500"
      : "text-slate-600 font-normal text-sm sm:text-base leading-relaxed transition-colors duration-500";

  const textMutedTableClass =
    theme === "dark"
      ? "text-gray-300 font-normal text-xs sm:text-sm leading-relaxed mb-1 transition-colors duration-500"
      : "text-slate-600 font-normal text-xs sm:text-sm leading-relaxed mb-1 transition-colors duration-500";

  const subCardClass =
    theme === "dark"
      ? "bg-white/5 p-4 rounded-2xl border border-white/10 shadow-sm text-center transition-all duration-500"
      : "bg-slate-50 p-4 rounded-2xl border border-slate-200/60 shadow-sm text-center transition-all duration-500";

  const subTextMutedClass =
    theme === "dark"
      ? "text-gray-400 text-xs mt-1 uppercase font-semibold tracking-wider transition-colors duration-500"
      : "text-slate-500 text-xs mt-1 uppercase font-semibold tracking-wider transition-colors duration-500";

  const listTextClass =
    theme === "dark"
      ? "flex flex-col gap-2.5 font-medium text-gray-300 mt-2 text-sm transition-colors duration-500"
      : "flex flex-col gap-2.5 font-medium text-slate-700 mt-2 text-sm transition-colors duration-500";

  const detailItemClass =
    theme === "dark"
      ? "flex justify-between border-b border-white/10 py-1.5 transition-all duration-500"
      : "flex justify-between border-b border-slate-200 py-1.5 transition-all duration-500";

  const detailLabelClass =
    theme === "dark" ? "text-gray-400" : "text-slate-500";
  const detailValClass =
    theme === "dark" ? "font-bold text-slate-200" : "font-bold text-slate-800";

  const tableWrapperClass =
    theme === "dark"
      ? "overflow-x-auto w-full border border-white/10 rounded-2xl bg-white/5 shadow-sm transition-all duration-500"
      : "overflow-x-auto w-full border border-slate-200/80 rounded-2xl bg-slate-50 shadow-sm transition-all duration-500";

  const theadClass =
    theme === "dark"
      ? "bg-white/10 text-white font-bold border-b border-white/10"
      : "bg-slate-100 text-slate-600 font-bold border-b border-slate-200";

  const tbodyClass =
    theme === "dark"
      ? "divide-y divide-white/5 text-gray-300"
      : "divide-y divide-slate-100 text-slate-700";

  const trClass =
    theme === "dark"
      ? "hover:bg-white/10 transition-colors"
      : "hover:bg-slate-50/80 transition-colors";

  // Checkmark reusable element
  const checkMark = (
    <span className="flex items-center justify-center w-4 h-4 rounded-full bg-brand-red/20 text-brand-red text-[9px] font-bold">
      ✔
    </span>
  );

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
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-10 lg:px-20 py-20 pointer-events-none select-none">
          <div
            className={`relative w-full max-w-6xl h-[700px] lg:h-[650px] rounded-3xl overflow-hidden border shadow-2xl transition-all duration-500 flex flex-col lg:flex-row pointer-events-auto ${
              theme === "dark"
                ? "bg-zinc-950 border-white/10"
                : "bg-slate-50 border-slate-200"
            }`}>
            {/* Left Column: 3D Canvas with Homologada model */}
            <div className="w-full lg:w-7/12 h-[350px] lg:h-full relative overflow-hidden">
              <LocalProduct3DScene
                modelUrl={homologadaModelUrl}
                selectedPower="100w"
                theme={theme}
              />
            </div>

            {/* Right Column: Product Info Panel */}
            <div
              className={`w-full lg:w-5/12 h-auto lg:h-full flex flex-col justify-center p-8 sm:p-12 gap-5 border-t lg:border-t-0 lg:border-l transition-all duration-500 ${
                theme === "dark"
                  ? "bg-black/95 border-white/10 text-white"
                  : "bg-white/95 border-slate-200 text-slate-900"
              }`}>
              <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase">
                APRESENTAÇÃO 3D
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase leading-tight">
                Luminária Homologada
              </h2>
              <p
                className={`text-sm sm:text-base font-normal leading-relaxed ${
                  theme === "dark" ? "text-gray-300" : "text-slate-600"
                }`}>
                Explore o modelo tridimensional de engenharia da luminária
                HOMOLOGADA. Rotacione o modelo com o mouse para inspecionar em detalhes
                o corpo robusto de alumínio injetado, as lentes de PMMA de alto rendimento
                e a base de sete pinos.
              </p>
              <div className="flex flex-col gap-3 mt-2">
                <div
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-500 ${
                    theme === "dark"
                      ? "bg-white/5 border-white/10"
                      : "bg-slate-50 border-slate-200"
                  }`}>
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-red/15 text-brand-red text-xs font-black">7P</span>
                  <div>
                    <span className="font-bold text-sm">Base NBR IEC 61610</span>
                    <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>Equipada com base de 7 pinos para telegestão</p>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-500 ${
                    theme === "dark"
                      ? "bg-white/5 border-white/10"
                      : "bg-slate-50 border-slate-200"
                  }`}>
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-red/15 text-brand-red text-xs font-black">160</span>
                  <div>
                    <span className="font-bold text-sm">160 lm/W</span>
                    <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-slate-500"}`}>Máxima eficiência em iluminação pública</p>
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
