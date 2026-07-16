"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SolarBackground from "@/components/SolarBackground";
import { getProductTheme, productCheckMark } from "@/lib/productTheme";

export default function LuminariaSolarPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

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

      {/* Dynamic Dual-Video Background */}
      <SolarBackground theme={theme} />

      {/* Main scrollable content */}
      <div className="relative z-10 w-full flex flex-col bg-transparent">
        {/* ═══════════════════════════════════════════════════════════════
            SECTION 1: HERO
        ═══════════════════════════════════════════════════════════════ */}
        <section className="scroll-section min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 sm:px-10 lg:px-20 py-20 gap-10 pointer-events-none select-none">
          {/* Left Side: Card */}
          <div className={cardClass}>
            <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase">
              ENERGIA SOLAR AUTÔNOMA
            </span>
            <h1 className={titleClass}>LUMINÁRIA SOLAR</h1>
            <p className={textMutedClass}>
              Sistema All-in-One com LED de alta eficiência, painel
              monocristalino e bateria de Lítio Ferro Fosfato integrados.
              Funciona 100% fora do grid, com autonomia garantida em até 3 dias
              de chuva consecutivos.
            </p>
            <a
              href="https://wa.me/5585986559388"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 bg-brand-red text-white font-bold rounded-xl mt-4 hover:bg-red-800 transition-colors uppercase tracking-wider text-sm shadow-lg text-center pointer-events-auto">
              Fale com um Especialista
            </a>
          </div>

          {/* Right Side: Family Image */}
          <div className="relative w-full lg:w-1/2 max-w-[650px] aspect-[4/3] flex items-center justify-center pointer-events-auto">
            <Image
              src="/Solar-famili.png"
              alt="Luminárias Solar Família"
              fill
              sizes="(max-width: 1024px) 90vw, 650px"
              className="object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-105"
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2: ARCHITECTURE — ALL-IN-ONE SOLAR
        ═══════════════════════════════════════════════════════════════ */}
        <section className="scroll-section min-h-screen flex items-center justify-center lg:justify-end px-4 sm:px-10 lg:px-20 py-20 pointer-events-none select-none">
          <div className={cardClass}>
            <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase">
              TECNOLOGIA INTEGRADA
            </span>
            <h2 className={title2Class}>ALL-IN-ONE SOLAR</h2>
            <p className={textMutedClass}>
              Painel solar, controlador MPPT, bateria LiFePO4 e módulo LED
              reunidos em uma única estrutura compacta. Instalação rápida, sem
              cabeamento externo — ideal para iluminação pública, parques e vias
              rurais.
            </p>
            <ul className={listTextClass}>
              <li className="flex items-center gap-3">
                {checkMark}
                Painel monocristalino de alta eficiência
              </li>
              <li className="flex items-center gap-3">
                {checkMark}
                Controlador MPPT inteligente
              </li>
              <li className="flex items-center gap-3">
                {checkMark}
                Dimerização automática e configurável
              </li>
              <li className="flex items-center gap-3">
                {checkMark}
                Sem conexão à rede elétrica
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
              ESPECIFICAÇÕES TÉCNICAS
            </span>
            <h2 className={title2Class}>DESEMPENHO AUTÔNOMO</h2>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className={subCardClass}>
                <h3 className="text-brand-red text-2xl font-black">IP66</h3>
                <p className={subTextMutedClass}>Grau de Proteção</p>
              </div>
              <div className={subCardClass}>
                <h3 className="text-brand-red text-2xl font-black">LiFePO4</h3>
                <p className={subTextMutedClass}>Bateria Lítio</p>
              </div>
              <div className={subCardClass}>
                <h3 className="text-brand-red text-2xl font-black">MPPT</h3>
                <p className={subTextMutedClass}>Controlador</p>
              </div>
              <div className={subCardClass}>
                <h3 className="text-brand-red text-2xl font-black">2.000</h3>
                <p className={subTextMutedClass}>Ciclos Bateria</p>
              </div>
              <div className={`${subCardClass} col-span-2`}>
                <h3 className="text-brand-red text-xl font-black">
                  3 Dias de Chuva
                </h3>
                <p className={subTextMutedClass}>Autonomia Contínua</p>
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
              FICHA TÉCNICA
            </span>
            <h2 className={title2Class}>CARACTERÍSTICAS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-2 text-sm font-medium">
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Temp. Cor</span>
                <span className={detailValClass}>6500K / 7000K</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>IRC</span>
                <span className={detailValClass}>&gt;70</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Ciclos Bateria</span>
                <span className={detailValClass}>2.000</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Tempo de Carga</span>
                <span className={detailValClass}>4 a 6 Horas</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Tipo Bateria</span>
                <span className="font-bold text-brand-red">LiFePO4</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Controlador</span>
                <span className={detailValClass}>MPPT</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Conexão</span>
                <span className={detailValClass}>Fora do Grid</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Tipo Painel</span>
                <span className={detailValClass}>Monocristalino</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Dimerização</span>
                <span className={detailValClass}>Automática</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Perfil Dimer.</span>
                <span className={detailValClass}>Configurável</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Cor</span>
                <span className={detailValClass}>Cinza</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Proteção</span>
                <span className="font-bold text-brand-red">IP66</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Temp. Ambiente</span>
                <span className={detailValClass}>-20°C a 55°C</span>
              </div>
              <div className={detailItemClass}>
                <span className={detailLabelClass}>Temp. Carga</span>
                <span className={detailValClass}>0°C a 55°C</span>
              </div>
              <div className={`${detailItemClass} col-span-1 sm:col-span-2`}>
                <span className={detailLabelClass}>Temp. Descarga</span>
                <span className={detailValClass}>-20°C a 55°C</span>
              </div>
              <div className={`${detailItemClass} col-span-1 sm:col-span-2`}>
                <span className={detailLabelClass}>Situações Climáticas</span>
                <span className={detailValClass}>
                  3 dias de chuva consecutivos
                </span>
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
              LINHA COMPLETA
            </span>
            <h2 className={title2Class}>MODELOS DISPONÍVEIS</h2>
            <p className={textMutedTableClass}>
              Quatro modelos projetados para diferentes demandas de iluminação
              pública solar, do residencial ao industrial.
            </p>
            <div className={tableWrapperClass}>
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className={theadClass}>
                  <tr>
                    <th className="p-3 sm:p-4 text-brand-red">Modelo</th>
                    <th className="p-3 sm:p-4">Fluxo</th>
                    <th className="p-3 sm:p-4">Bateria</th>
                    <th className="p-3 sm:p-4">Tensão Bat.</th>
                    <th className="p-3 sm:p-4">Pot. Painel</th>
                    <th className="p-3 sm:p-4">Tensão Painel</th>
                  </tr>
                </thead>
                <tbody className={tbodyClass}>
                  <tr className={trClass}>
                    <td className="p-3 sm:p-4 font-bold">Helios</td>
                    <td className="p-3 sm:p-4">7.000 lm</td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">
                      24 a 70Ah
                    </td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">12.8V</td>
                    <td className="p-3 sm:p-4 font-bold text-brand-red">90W</td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">18V</td>
                  </tr>
                  <tr className={trClass}>
                    <td className="p-3 sm:p-4 font-bold">Stratos</td>
                    <td className="p-3 sm:p-4">8.900 lm</td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">
                      24 a 70Ah
                    </td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">12.8V</td>
                    <td className="p-3 sm:p-4 font-bold text-brand-red">
                      120W
                    </td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">18V</td>
                  </tr>
                  <tr className={trClass}>
                    <td className="p-3 sm:p-4 font-bold">Tyron</td>
                    <td className="p-3 sm:p-4">11.000 lm</td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">
                      24 a 70Ah
                    </td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">12.8V</td>
                    <td className="p-3 sm:p-4 font-bold text-brand-red">
                      160W
                    </td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">18V</td>
                  </tr>
                  <tr className={trClass}>
                    <td className="p-3 sm:p-4 font-bold">Apollo</td>
                    <td className="p-3 sm:p-4">15.000 lm</td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">
                      24 a 70Ah
                    </td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">12.8V</td>
                    <td className="p-3 sm:p-4 font-bold text-brand-red">
                      180W
                    </td>
                    <td className="p-3 sm:p-4 font-mono opacity-80">18V</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 6: VISUAL PLACEHOLDER (3D will be added later)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="min-h-[70vh] flex items-center justify-center px-4 sm:px-10 lg:px-20 py-20 pointer-events-none select-none">
          <div
            className={`relative w-full max-w-5xl min-h-[380px] h-[70vh] max-h-[650px] rounded-3xl overflow-hidden border shadow-2xl transition-all duration-500 flex flex-col items-center justify-center pointer-events-auto ${
              theme === "dark"
                ? "bg-zinc-950 border-white/10"
                : "bg-slate-50 border-slate-200"
            }`}>
            <video
              autoPlay
              loop
              muted
              controls
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/models/apresentacao%20do%20produto.mkv" type="video/x-matroska" />
              <source src="/models/apresentacao%20do%20produto.mkv" type="video/mp4" />
            </video>

            {/* Label Overlay */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-xl border border-white/10 text-xs font-black uppercase tracking-wider select-none pointer-events-none">
              Apresentação do Produto
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
