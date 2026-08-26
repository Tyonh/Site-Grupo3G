"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProductTheme, productCheckMark } from "@/lib/productTheme";

const useCases = [
  "Vias Públicas e Rodovias",
  "Túneis",
  "Parques e Praças",
  "Condomínios",
  "Portos",
  "Ciclovias",
  "Estacionamentos",
];

export default function EbronProPage() {
  const theme: "light" | "dark" = "light";

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

      {/* Fundo fixo com a foto do produto — a linha PRO ainda não tem modelo
          3D próprio (só EBRON, Homologada e Módulo têm .glb), então a foto
          real (recorte com fundo transparente) assume o lugar da cena 3D
          interativa das demais páginas, ancorada à direita. */}
      <div className="fixed inset-0 -z-10 bg-brand-light">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 sm:block">
          <Image
            src="/ebron-pro.png"
            alt=""
            aria-hidden
            fill
            sizes="50vw"
            priority
            className="object-contain object-right opacity-90"
          />
        </div>
      </div>

      {/* Main scrollable content */}
      <div className="relative z-10 w-full flex flex-col">
        {/* ═══════════════════════════════════════════════════════════════
            SECTION 1: HERO
        ═══════════════════════════════════════════════════════════════ */}
        <section className="min-h-screen flex items-center justify-center lg:justify-start px-4 sm:px-10 lg:px-20 py-20">
          <div className={cardClass}>
            <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase">
              Linha Profissional 2026
            </span>
            <h1 className={titleClass}>LUMINÁRIA EBRON PRO</h1>
            <p className={textMutedClass}>
              Versão reforçada da linha EBRON, com 130 lm/W de eficiência
              luminosa, corpo em alumínio + policarbonato e base para relé
              embutida — pronta para vias públicas, túneis e grandes áreas.
            </p>
            <a
              href="https://wa.me/5585986559388"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 bg-brand-red text-white font-bold rounded-xl mt-4 hover:bg-red-800 transition-colors uppercase tracking-wider text-sm shadow-lg text-center">
              Fale com um Especialista
            </a>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2: DIFERENCIAIS
        ═══════════════════════════════════════════════════════════════ */}
        <section className="min-h-screen flex items-center justify-center lg:justify-end px-4 sm:px-10 lg:px-20 py-20">
          <div className={cardClass}>
            <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase">
              Construção Reforçada
            </span>
            <h2 className={title2Class}>DIFERENCIAIS EBRON PRO</h2>
            <p className={textMutedClass}>
              Corpo em alumínio com tampa de policarbonato, base preparada
              para relé fotoelétrico embutido e ângulo de projeção ajustável
              — construída para instalações de alta exigência.
            </p>
            <ul className={listTextClass}>
              <li className="flex items-center gap-3">
                {checkMark}
                Corpo em alumínio + policarbonato de alta resistência
              </li>
              <li className="flex items-center gap-3">
                {checkMark}
                Base para relé fotoelétrico embutida
              </li>
              <li className="flex items-center gap-3">
                {checkMark}
                Ângulo de projeção ajustável de 80° a 150°
              </li>
              <li className="flex items-center gap-3">
                {checkMark}
                Proteção IP66 contra poeira e jatos d&apos;água
              </li>
            </ul>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 3: SPECIFICATIONS — KEY HIGHLIGHTS
        ═══════════════════════════════════════════════════════════════ */}
        <section className="min-h-screen flex items-center justify-center lg:justify-start px-4 sm:px-10 lg:px-20 py-20">
          <div className={cardClass}>
            <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase">
              Performance Pro
            </span>
            <h2 className={title2Class}>EFICIÊNCIA E PROTEÇÃO</h2>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className={subCardClass}>
                <h3 className="text-brand-red text-2xl font-black">130 lm/W</h3>
                <p className={subTextMutedClass}>Eficácia Luminosa</p>
              </div>
              <div className={subCardClass}>
                <h3 className="text-brand-red text-2xl font-black">IP66</h3>
                <p className={subTextMutedClass}>Grau de Proteção</p>
              </div>
              <div className={subCardClass}>
                <h3 className="text-brand-red text-2xl font-black">80–150°</h3>
                <p className={subTextMutedClass}>Ângulo de Projeção</p>
              </div>
              <div className={subCardClass}>
                <h3 className="text-brand-red text-2xl font-black">25.000h</h3>
                <p className={subTextMutedClass}>Vida Útil Nominal</p>
              </div>
              <div className={`${subCardClass} col-span-2`}>
                <h3 className="text-brand-red text-xl font-black">IRC &ge; 80</h3>
                <p className={subTextMutedClass}>Fidelidade de Cores Superior</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 4: DETAILED CHARACTERISTICS GRID
        ═══════════════════════════════════════════════════════════════ */}
        <section className="min-h-screen flex items-center justify-center lg:justify-end px-4 sm:px-10 lg:px-20 py-20">
          <div className={cardWideClass}>
            <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase">
              Ficha Completa
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
                <span className="font-bold text-brand-red">130 lm/W</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Vida Útil</span>
                <span className={detailValClass}>25.000h</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Ângulo Projeção</span>
                <span className={detailValClass}>80° – 150°</span>
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
                <span className={detailValClass}>Alumínio + PC</span>
              </div>
              <div className={`${detailItemClass} col-span-1 sm:col-span-2`}>
                <span className={detailLabelClass}>Base p/ Relé</span>
                <span className={detailValClass}>Embutido</span>
              </div>
              <div className={`${detailItemClass} col-span-1 sm:col-span-2`}>
                <span className={detailLabelClass}>Modelo Versão</span>
                <span className={detailValClass}>EBRON PRO 2026</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 5: MODELS & DIMENSIONS TABLE
        ═══════════════════════════════════════════════════════════════ */}
        <section className="min-h-screen flex items-center justify-center lg:justify-start px-4 sm:px-10 lg:px-20 py-20">
          <div className={cardTableClass}>
            <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase">
              Potência & Fluxo
            </span>
            <h2 className={title2Class}>MODELOS EBRON PRO</h2>
            <p className={textMutedTableClass}>
              Consulte a tabela técnica de códigos, potências e fluxo luminoso
              da linha EBRON PRO.
            </p>
            <div className={tableWrapperClass}>
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className={theadClass}>
                  <tr>
                    <th className="p-3 sm:p-4 text-brand-red">Código</th>
                    <th className="p-3 sm:p-4">Potência</th>
                    <th className="p-3 sm:p-4">Fluxo Luminoso</th>
                    <th className="p-3 sm:p-4">Temp. de Cor</th>
                  </tr>
                </thead>
                <tbody className={tbodyClass}>
                  <tr className={trClass}>
                    <td className="p-3 sm:p-4 font-mono opacity-80">50899</td>
                    <td className="p-3 sm:p-4 font-bold">50W</td>
                    <td className="p-3 sm:p-4 font-bold text-brand-red">
                      6.500 lm
                    </td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">5000K</td>
                  </tr>
                  <tr className={trClass}>
                    <td className="p-3 sm:p-4 font-mono opacity-80">50900</td>
                    <td className="p-3 sm:p-4 font-bold">100W</td>
                    <td className="p-3 sm:p-4 font-bold text-brand-red">
                      13.000 lm
                    </td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">5000K</td>
                  </tr>
                  <tr className={trClass}>
                    <td className="p-3 sm:p-4 font-mono opacity-80">50901</td>
                    <td className="p-3 sm:p-4 font-bold">150W</td>
                    <td className="p-3 sm:p-4 font-bold text-brand-red">
                      19.500 lm
                    </td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">5000K</td>
                  </tr>
                  <tr className={trClass}>
                    <td className="p-3 sm:p-4 font-mono opacity-80">50902</td>
                    <td className="p-3 sm:p-4 font-bold">200W</td>
                    <td className="p-3 sm:p-4 font-bold text-brand-red">
                      26.000 lm
                    </td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">5000K</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 6: APLICAÇÕES
        ═══════════════════════════════════════════════════════════════ */}
        <section className="min-h-screen flex items-center justify-center lg:justify-end px-4 sm:px-10 lg:px-20 py-20">
          <div className={cardWideClass}>
            <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase">
              Onde Usar
            </span>
            <h2 className={title2Class}>APLICAÇÕES</h2>
            <p className={textMutedClass}>
              Versatilidade para os mais diversos ambientes de iluminação
              pública e privada.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
              {useCases.map((useCase) => (
                <div
                  key={useCase}
                  className={`${subCardClass} flex items-center justify-center text-center px-3 py-4`}>
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wide text-slate-700">
                    {useCase}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 7: SHOWCASE (foto — sem modelo 3D ainda para este produto)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-10 lg:px-20 py-20">
          <div className={showcasePanelClass}>
            <div className={`${showcaseCanvasClass} bg-slate-100`}>
              <Image
                src="/ebron-pro.png"
                alt="Luminária EBRON PRO"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-contain p-6"
              />
            </div>

            <div className={showcaseInfoPanelClass}>
              <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase">
                Linha Profissional
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase leading-tight">
                Luminária EBRON PRO
              </h2>
              <p className="text-sm sm:text-base font-normal leading-relaxed text-slate-600">
                Corpo em alumínio e policarbonato, módulo de LEDs de alta
                eficiência e base para relé fotoelétrico embutida — pronta
                para instalação imediata em postes de vias públicas.
              </p>
              <div className="flex flex-col gap-3 mt-2">
                <div className="flex items-center gap-3 p-3 rounded-xl border transition-all duration-500 bg-slate-50 border-slate-200">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-red/15 text-brand-red text-xs font-black">
                    IP
                  </span>
                  <div>
                    <span className="font-bold text-sm">IP66</span>
                    <p className="text-xs text-slate-500">
                      Proteção contra poeira e jatos d&apos;água
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl border transition-all duration-500 bg-slate-50 border-slate-200">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-red/15 text-brand-red text-xs font-black">
                    lm
                  </span>
                  <div>
                    <span className="font-bold text-sm">130 lm/W</span>
                    <p className="text-xs text-slate-500">
                      Eficácia luminosa de alta performance
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl border transition-all duration-500 bg-slate-50 border-slate-200">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-red/15 text-brand-red text-xs font-black">
                    PC
                  </span>
                  <div>
                    <span className="font-bold text-sm">Alumínio + Policarbonato</span>
                    <p className="text-xs text-slate-500">
                      Corpo reforçado com base para relé embutida
                    </p>
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
