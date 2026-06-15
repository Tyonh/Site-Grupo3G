"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SobrePage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // ─── Theme styling helpers ───
  const cardClass =
    theme === "dark"
      ? "w-full max-w-4xl bg-black/85 p-8 sm:p-12 rounded-3xl border border-white/10 text-white flex flex-col gap-6 pointer-events-auto shadow-2xl shadow-black/60 transition-all duration-500"
      : "w-full max-w-4xl bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 text-slate-900 flex flex-col gap-6 pointer-events-auto shadow-xl shadow-slate-300/40 transition-all duration-500";

  const titleClass =
    theme === "dark"
      ? "text-3xl sm:text-4xl lg:text-5xl font-black leading-tight uppercase text-white transition-colors duration-500 text-center"
      : "text-3xl sm:text-4xl lg:text-5xl font-black leading-tight uppercase text-slate-900 transition-colors duration-500 text-center";

  const title2Class =
    theme === "dark"
      ? "text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white transition-colors duration-500 text-center"
      : "text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-slate-900 transition-colors duration-500 text-center";

  const textClass =
    theme === "dark"
      ? "text-gray-300 font-normal text-base sm:text-lg leading-relaxed transition-colors duration-500"
      : "text-slate-700 font-normal text-base sm:text-lg leading-relaxed transition-colors duration-500";

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

      {/* Background radial gradient */}
      <div
        className={`fixed top-0 left-0 w-full h-screen z-0 pointer-events-none transition-colors duration-700 ${
          theme === "dark"
            ? "bg-radial from-gray-900 to-black"
            : "bg-radial from-slate-50 via-slate-100 to-slate-200"
        }`}
      />

      {/* Main Container */}
      <div className="relative z-10 w-full flex flex-col bg-transparent items-center px-4 sm:px-10 lg:px-20 py-28 gap-16">
        {/* Section 1: Hero & Philosophy */}
        <section className="w-full flex justify-center">
          <div className={cardClass}>
            <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase text-center block">
              NOSSA HISTÓRIA E FILOSOFIA
            </span>
            <h1 className={titleClass}>SOBRE O GRUPO 3G</h1>

            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-brand-red to-transparent my-2" />

            <p className={textClass}>
              Em 1995 iniciamos nossas atividades no Brasil, e desde então trazemos para o mercado os mais variados tipos de iluminação, todas com a mais avançada tecnologia e assim nos tornamos <strong className="text-brand-red font-bold">pioneiros no Ceará com importação de tecnologia LED</strong>.
            </p>

            <p className={textClass}>
              Somos uma empresa moderna e que domina tecnologias de ponta, inovando sempre com o objetivo de fabricarmos produtos competitivos de alta qualidade, ao mesmo tempo em que asseguramos um mínimo impacto no meio ambiente.
            </p>

            <p className={textClass}>
              Somos fiéis à nossa filosofia de desenvolvimento constante e investimos em pesquisa, tecnologia e recursos humanos, o que nos faz atualmente contar com mais de 200 tipos diferentes de produtos, nos tornando referência em todo o estado.
            </p>

            <p className={textClass}>
              Sempre buscando e aperfeiçoando cada vez mais nossa tecnologia de iluminação, hoje com estudos luminotécnicos especializados no segmento industrial, comercial e público estamos conseguindo com nossos produtos oferecer um maior rendimento e <strong className="text-brand-red font-bold">reduzindo em até 50% o consumo de energia</strong>.
            </p>
          </div>
        </section>

        {/* Section 2: Timeline */}
        <section className="w-full flex flex-col items-center">
          <div className={`${cardClass} items-center`}>
            <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase text-center block">
              TRAJETÓRIA
            </span>
            <h2 className={title2Class}>LINHA DO TEMPO</h2>

            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-brand-red to-transparent my-2 mb-8" />

            {/* Vertical/Horizontal Responsive Timeline */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-4 w-full relative">
              {/* Connector line for desktop */}
              <div className="hidden md:block absolute top-[52px] left-[5%] right-[5%] h-1 bg-brand-red/30 z-0" />

              {/* Timeline Item 1 */}
              <div className="flex flex-col items-center text-center flex-1 z-10">
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">
                  Origem
                </div>
                <div className="w-24 h-12 flex items-center justify-center font-black text-white bg-brand-red rounded-lg shadow-md mb-3 text-lg">
                  1995
                </div>
                <p className="text-xs leading-relaxed max-w-[200px] text-gray-600 dark:text-gray-400">
                  <strong className="text-brand-red">Ramon Gomez</strong> veio da Espanha ao Brasil empreender no mercado, porém iniciou vendendo curativos adesivos.
                </p>
              </div>

              {/* Timeline Item 2 */}
              <div className="flex flex-col items-center text-center flex-1 z-10">
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">
                  Pioneirismo
                </div>
                <div className="w-24 h-12 flex items-center justify-center font-black text-white bg-brand-red rounded-lg shadow-md mb-3 text-lg">
                  2000
                </div>
                <p className="text-xs leading-relaxed max-w-[200px] text-gray-600 dark:text-gray-400">
                  Foi criada a <strong className="text-brand-red">Crown</strong>, a pioneira em importação de lâmpadas fluorescentes no Brasil, atuando no Ceará.
                </p>
              </div>

              {/* Timeline Item 3 */}
              <div className="flex flex-col items-center text-center flex-1 z-10">
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">
                  Evolução LED
                </div>
                <div className="w-24 h-12 flex items-center justify-center font-black text-white bg-brand-red rounded-lg shadow-md mb-3 text-lg">
                  2015
                </div>
                <p className="text-xs leading-relaxed max-w-[200px] text-gray-600 dark:text-gray-400">
                  A Crown se reinventou, passando a se chamar <strong className="text-brand-red">3G Iluminação</strong>, uma distribuidora com tecnologia LED.
                </p>
              </div>

              {/* Timeline Item 4 */}
              <div className="flex flex-col items-center text-center flex-1 z-10">
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">
                  Expansão
                </div>
                <div className="w-24 h-12 flex items-center justify-center font-black text-white bg-brand-red rounded-lg shadow-md mb-3 text-lg">
                  2020
                </div>
                <p className="text-xs leading-relaxed max-w-[200px] text-gray-600 dark:text-gray-400">
                  Em expansão, nasce a <strong className="text-brand-red">EBRON</strong>, uma empresa 100% cearense, que complementa nossa atuação no mercado.
                </p>
              </div>

              {/* Timeline Item 5 */}
              <div className="flex flex-col items-center text-center flex-1 z-10">
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">
                  Hoje
                </div>
                <div className="w-24 h-12 flex items-center justify-center font-black text-white bg-brand-red rounded-lg shadow-md mb-3 text-lg animate-pulse">
                  ATUAL
                </div>
                <p className="text-xs leading-relaxed max-w-[200px] text-gray-600 dark:text-gray-400">
                  Composto pela 3G Iluminação e EBRON, somos o <strong className="text-brand-red">Grupo 3G</strong>. Tradição e Inovação trabalhando juntos!
                </p>
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
