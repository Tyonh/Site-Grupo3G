"use client";

import { useRef, useState } from "react";
import { Product3DScene } from "@/components/3d/Product3DScene";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ModuloProductPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isInteractive, setIsInteractive] = useState(false);

  // Load light model (100W) for scroll background and heavy high-end model (300W) for final showcase
  const backgroundModelUrl = "/models/Modulo 100w - PRIME.glb";
  const interactiveModelUrl = "/models/modular-reflector-300w.glb";

  return (
    <>
      <Navbar />

      {/* 3D Background Canvas with Dual-Model dynamic transition */}
      <Product3DScene
        modelUrl={backgroundModelUrl}
        interactiveModelUrl={interactiveModelUrl}
        isInteractive={isInteractive}
        setIsInteractive={setIsInteractive}
        scrollContainerRef={scrollContainerRef}
      />

      {/* Main scrollable layout wrapper */}
      <div
        ref={scrollContainerRef}
        className="relative z-10 w-full flex flex-col bg-transparent">
        {/* SECTION 1: HERO */}
        <section className="scroll-section min-h-screen flex items-center px-4 sm:px-10 lg:px-20 py-20 pointer-events-none select-none">
          <div className="w-full max-w-[500px] bg-black/60 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/10 text-white flex flex-col gap-4 pointer-events-auto">
            <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase">
              EFICIÊNCIA ABSOLUTA
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight uppercase">
              REFLETOR MODULAR
            </h1>
            <p className="text-gray-300 font-light text-sm sm:text-base leading-relaxed">
              Desenvolvido com tecnologia LED de alta performance e alumínio
              injetado, garantindo o melhor gerenciamento térmico e durabilidade
              do mercado.
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

        {/* SECTION 2: ARCHITECTURE & STRUCTURE */}
        <section className="scroll-section min-h-screen flex items-center justify-end px-4 sm:px-10 lg:px-20 py-20 pointer-events-none select-none">
          <div className="w-full max-w-[500px] bg-black/60 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/10 text-white flex flex-col gap-4 pointer-events-auto">
            <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase">
              ENGENHARIA AVANÇADA
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase">
              CONSTRUÇÃO MODULAR
            </h2>
            <p className="text-gray-300 font-light text-sm sm:text-base leading-relaxed">
              Design modular e flexível que permite manutenção rápida e ajuste
              de potência sob medida para cada necessidade de iluminação pública
              ou industrial.
            </p>
            <ul className="flex flex-col gap-2.5 font-medium text-gray-200 mt-2 text-sm">
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
        <section className="scroll-section min-h-screen flex items-center px-4 sm:px-10 lg:px-20 py-20 pointer-events-none select-none">
          <div className="w-full max-w-[500px] bg-black/60 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/10 text-white flex flex-col gap-4 pointer-events-auto">
            <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase">
              ESPECIFICAÇÕES TÉCNICAS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase">
              DESEMPENHO MÁXIMO
            </h2>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                <h3 className="text-brand-red text-2xl font-black">IP66</h3>
                <p className="text-gray-400 text-xs mt-1 uppercase font-light tracking-wider">
                  Grau de Proteção
                </p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center">
                <h3 className="text-brand-red text-2xl font-black">50.000h</h3>
                <p className="text-gray-400 text-xs mt-1 uppercase font-light tracking-wider">
                  Vida útil L70
                </p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center col-span-2">
                <h3 className="text-brand-red text-xl font-black">150 lm/W</h3>
                <p className="text-gray-400 text-xs mt-1 uppercase font-light tracking-wider">
                  Eficiência Luminosa
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: SHOWCASE AREA */}
        <section className="scroll-section min-h-screen flex flex-col justify-end items-center px-4 sm:px-10 py-20 pointer-events-none select-none text-center">
          <div className="w-full max-w-[650px] bg-black/75 backdrop-blur-lg p-8 sm:p-10 rounded-3xl border border-brand-red/30 text-white flex flex-col items-center gap-4 pointer-events-auto shadow-2xl shadow-brand-red/10 mb-8 transform translate-y-0 animate-bounce-slow">
            <span className="text-brand-red font-extrabold tracking-widest text-xs uppercase animate-pulse">
              MODO INTERATIVO ATIVADO
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase">
              EXPLORE EM 3D
            </h2>
            <p className="text-gray-300 font-light text-sm sm:text-base leading-relaxed">
              Use o mouse ou a tela de toque para **girar, arrastar e
              aproximar** o modelo 3D. Veja de perto todos os detalhes e o
              acabamento premium de iluminação.
            </p>

            {/* Scroll back indicator */}
            <div className="flex flex-col items-center justify-center gap-1.5 mt-2">
              <span className="text-gray-400 text-[11px] uppercase tracking-widest font-medium">
                Role para cima para ler novamente
              </span>
              <svg
                className="w-4 h-4 text-gray-500 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
