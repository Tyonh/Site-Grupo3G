"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProductTheme } from "@/lib/productTheme";
import { useInView } from "@/hooks/useInView";

// Lazy loading das cenas 3D com Next.js Dynamic Imports (Evita carregar o Three.js no bundle principal e melhora o LCP)
const Product3DScene = dynamic(
  () => import("@/components/3d/Product3DScene").then((mod) => mod.Product3DScene),
  { ssr: false }
);

const LocalProduct3DScene = dynamic(
  () => import("@/components/3d/LocalProduct3DScene").then((mod) => mod.LocalProduct3DScene),
  { ssr: false }
);

// Cache-bust once per page load to prevent infinite React suspension loops while ensuring the latest export is loaded
const CACHE_BUST = typeof window !== "undefined" ? Date.now() : 1;

export default function ModuloProductPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const theme: "light" | "dark" = "light";
  const [selectedPower, setSelectedPower] = useState<"100w" | "200w" | "300w">(
    "100w",
  );
  const { ref: showcaseRef, isInView: isShowcaseInView } =
    useInView<HTMLElement>("300px");

  // Load light model (100W) for scroll background and heavy high-end model (300W) for final showcase
  const backgroundModelUrl = `/models/moduloBackground.glb?v=${CACHE_BUST}`;

  // Theme styling helpers (shared across all /produtos/* pages)
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

  return (
    <>
      <Navbar />

      {/* 3D Background Canvas with Dual-Model transition */}
      <Product3DScene
        modelUrl={backgroundModelUrl}
        isInteractive={false}
        setIsInteractive={() => {}}
        scrollContainerRef={scrollContainerRef}
        selectedPower="100w"
        theme={theme}
        environmentIntensity={0.4}
        lightIntensityMultiplier={0.3}
      />

      {/* Main scrollable layout wrapper */}
      <div
        ref={scrollContainerRef}
        className="relative z-10 w-full flex flex-col bg-transparent">
        {/* SECTION 1: HERO */}
        <section className="scroll-section min-h-screen flex items-center justify-center lg:justify-start px-4 sm:px-10 lg:px-20 py-20 pointer-events-none select-none">
          <div className={cardClass}>
            <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase">
              EFICIÊNCIA ABSOLUTA
            </span>
            <h1 className={titleClass}>REFLETOR MODULAR</h1>
            <p className={textMutedClass}>
              Desenvolvido com tecnologia LED de alta performance e alumínio
              injetado, garantindo o melhor gerenciamento térmico e durabilidade
              do mercado.
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

        {/* SECTION 2: ARCHITECTURE & STRUCTURE */}
        <section className="scroll-section min-h-screen flex items-center justify-center lg:justify-end px-4 sm:px-10 lg:px-20 py-20 pointer-events-none select-none">
          <div className={cardClass}>
            <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase">
              ENGENHARIA AVANÇADA
            </span>
            <h2 className={title2Class}>CONSTRUÇÃO MODULAR</h2>
            <p className={textMutedClass}>
              Design modular e flexível que permite manutenção rápida e ajuste
              de potência sob medida para cada necessidade de iluminação pública
              ou industrial.
            </p>
            <ul className={listTextClass}>
              <li className="flex items-center gap-3">
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-brand-red/20 text-brand-red text-[9px] font-bold">
                  ✔
                </span>
                Fácil acoplamento de novos módulos
              </li>
              <li className="flex items-center gap-3">
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-brand-red/20 text-brand-red text-[9px] font-bold">
                  ✔
                </span>
                Alumínio com pintura eletrostática
              </li>
            </ul>
          </div>
        </section>

        {/* SECTION 3: SPECIFICATIONS */}
        <section className="scroll-section min-h-screen flex items-center justify-center lg:justify-start px-4 sm:px-10 lg:px-20 py-20 pointer-events-none select-none">
          <div className={cardClass}>
            <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase">
              ESPECIFICAÇÕES TÉCNICAS
            </span>
            <h2 className={title2Class}>DESEMPENHO MÁXIMO</h2>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className={subCardClass}>
                <h3 className="text-brand-red text-2xl font-black">IP66</h3>
                <p className={subTextMutedClass}>Grau de Proteção</p>
              </div>
              <div className={subCardClass}>
                <h3 className="text-brand-red text-2xl font-black">50.000h</h3>
                <p className={subTextMutedClass}>Vida útil L70</p>
              </div>
              <div className={`${subCardClass} col-span-2`}>
                <h3 className="text-brand-red text-xl font-black">150 lm/W</h3>
                <p className={subTextMutedClass}>Eficiência Luminosa</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: DETAILED CHARACTERISTICS GRID (Aligned to the Right) */}
        <section className="scroll-section min-h-screen flex items-center justify-center lg:justify-end px-4 sm:px-10 lg:px-20 py-20 pointer-events-none select-none">
          <div className={cardWideClass}>
            <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase">
              FICHA TÉCNICA
            </span>
            <h2 className={title2Class}>CARACTERÍSTICAS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-2 text-sm font-medium">
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Código</span>
                <span className={detailValClass}>50611</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Temp. Cor</span>
                <span className={detailValClass}>6500K</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Fator Potência</span>
                <span className={detailValClass}>&gt;0.97</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Fluxo Luminoso</span>
                <span className="font-bold text-brand-red">10.000 lm</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Consumo</span>
                <span className={detailValClass}>100~105W</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Cor da Luz</span>
                <span className={detailValClass}>Branco Frio</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Ângulo Projeção</span>
                <span className={detailValClass}>30°/60°/90°</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Eficiência</span>
                <span className={detailValClass}>100 lm/W</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Frequência</span>
                <span className={detailValClass}>50/60 Hz</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Peso</span>
                <span className={detailValClass}>1.25 Kg</span>
              </div>
              <div className={`${detailItemClass} col-span-1 sm:col-span-2`}>
                <span className={detailLabelClass}>Dimensão</span>
                <span className={detailValClass}>305 x 100 x 40 mm</span>
              </div>
              <div className={`${detailItemClass} col-span-1 sm:col-span-2`}>
                <span className={detailLabelClass}>Material</span>
                <span className={detailValClass}>
                  Alumínio pintado em cinza
                </span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Proteção</span>
                <span className="font-bold text-brand-red">IP66</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Temp. Operação</span>
                <span className={detailValClass}>-5°C a 50°C</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: MODULAR POWER & DIMENSIONS TABLE (Aligned to the Left) */}
        <section className="scroll-section min-h-screen flex items-center justify-center lg:justify-start px-4 sm:px-10 lg:px-20 py-20 pointer-events-none select-none">
          <div className={cardTableClass}>
            <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase">
              ESCALABILIDADE
            </span>
            <h2 className={title2Class}>POTÊNCIAS E DIMENSÕES</h2>
            <p className={textMutedTableClass}>
              Conheça as configurações modulares disponíveis. O sistema permite
              combinar blocos para atingir potências extremas sob medida.
            </p>
            <div className={tableWrapperClass}>
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className={theadClass}>
                  <tr>
                    <th className="p-3 sm:p-4 text-brand-red">Potência</th>
                    <th className="p-3 sm:p-4">Fluxo Luminoso</th>
                    <th className="p-3 sm:p-4">Tamanho (mm)</th>
                  </tr>
                </thead>
                <tbody className={tbodyClass}>
                  {/* 100W */}
                  <tr className={trClass}>
                    <td className="p-3 sm:p-4 font-bold flex items-center gap-2">
                      100W
                    </td>
                    <td className="p-3 sm:p-4">10.000 lm</td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">
                      305 x 100 x 40
                    </td>
                  </tr>

                  {/* 200W */}
                  <tr className={trClass}>
                    <td className="p-3 sm:p-4 font-bold flex items-center gap-2">
                      200W
                    </td>
                    <td className="p-3 sm:p-4">20.000 lm</td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">
                      355 x 210 x 60
                    </td>
                  </tr>

                  {/* 300W */}
                  <tr className={trClass}>
                    <td className="p-3 sm:p-4 font-bold flex items-center gap-2">
                      300W
                    </td>
                    <td className="p-3 sm:p-4">30.000 lm</td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">
                      350 x 310 x 60
                    </td>
                  </tr>

                  <tr className={trClass}>
                    <td className="p-3 sm:p-4 font-bold">400W</td>
                    <td className="p-3 sm:p-4">40.000 lm</td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">
                      350 x 310 x 60
                    </td>
                  </tr>
                  <tr className={trClass}>
                    <td className="p-3 sm:p-4 font-bold">500W</td>
                    <td className="p-3 sm:p-4">50.000 lm</td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">
                      350 x 520 x 60
                    </td>
                  </tr>
                  <tr className={trClass}>
                    <td className="p-3 sm:p-4 font-bold">600W</td>
                    <td className="p-3 sm:p-4">60.000 lm</td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">
                      350 x 620 x 60
                    </td>
                  </tr>
                  <tr className={trClass}>
                    <td className="p-3 sm:p-4 font-bold">800W</td>
                    <td className="p-3 sm:p-4">80.000 lm</td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">
                      780 x 420 x 60
                    </td>
                  </tr>
                  <tr className={trClass}>
                    <td className="p-3 sm:p-4 font-bold">1000W</td>
                    <td className="p-3 sm:p-4">100.000 lm</td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">
                      780 x 520 x 60
                    </td>
                  </tr>
                  <tr className={trClass}>
                    <td className="p-3 sm:p-4 font-bold">1200W</td>
                    <td className="p-3 sm:p-4">120.000 lm</td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">
                      780 x 620 x 60
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 6: DEDICATED INTERACTIVE SIMULATOR (Only at the end of the page) */}
        <section
          ref={showcaseRef}
          className="min-h-screen flex items-center justify-center px-4 sm:px-10 lg:px-20 py-20 pointer-events-none select-none">
          <div className={showcasePanelClass}>
            {/* Left Column: Local 3D Canvas rendering the heavyweight Modulo Prime.glb — deferred until the section nears the viewport to avoid running a second WebGL context for the whole scroll */}
            <div className={showcaseCanvasClass}>
              {isShowcaseInView && (
                <LocalProduct3DScene
                  modelUrl="/models/moduloInterativo.glb"
                  selectedPower={selectedPower}
                  theme={theme}
                  environmentIntensity={0.4}
                  lightIntensityMultiplier={0.3}
                />
              )}
            </div>

            {/* Right Column: Premium Control Overlay Panel */}
            <div className={showcaseInfoPanelClass}>
              <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase animate-pulse">
                SIMULAÇÃO DE ENGENHARIA 3D
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase leading-tight">
                Simulador Modular
              </h2>
              <p className="text-sm sm:text-base font-normal leading-relaxed text-slate-600">
                Experimente a montagem dos módulos diretamente no modelo de
                engenharia. Selecione a potência desejada para acoplar os blocos
                de LED e observar as trajetórias dinâmicas de câmera desenhadas
                originalmente no Blender.
              </p>

              {/* Styled Power Selection Buttons */}
              <div className="flex flex-col gap-2.5 mt-4">
                <span className="text-[10px] font-extrabold tracking-widest uppercase text-slate-500">
                  Selecionar Potência do Refletor
                </span>
                <div className="flex gap-3">
                  {(["100w", "200w", "300w"] as const).map((power) => (
                    <button
                      key={power}
                      onClick={() => setSelectedPower(power)}
                      className={`flex-1 h-12 rounded-xl flex items-center justify-center font-black text-sm transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 border ${
                        selectedPower === power
                          ? "bg-brand-red text-white border-brand-red shadow-lg shadow-brand-red/25"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                      }`}>
                      {power.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer renders naturally at the bottom of the scroll container */}
        <Footer />
      </div>
    </>
  );
}
