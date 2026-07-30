"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Magnetic from "@/components/natal/Magnetic";

interface ProductVideoHeroProps {
  videoSrc: string;
  posterSrc: string;
  kicker: string;
  title: ReactNode;
  description: string;
  /** Frase de marca — canto superior direito, ao lado oposto do kicker */
  tagline?: ReactNode;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

const SPARKLES = [
  { top: "14%", left: "9%", size: "text-xs", delay: 0 },
  { top: "22%", left: "88%", size: "text-[10px]", delay: 0.4 },
  { top: "68%", left: "6%", size: "text-[10px]", delay: 0.8 },
  { top: "78%", left: "92%", size: "text-sm", delay: 0.2 },
  { top: "10%", left: "48%", size: "text-[8px]", delay: 0.6 },
  { top: "88%", left: "40%", size: "text-[8px]", delay: 1 },
];

/**
 * Abertura em fundo claro pensada para o vídeo de produto com fundo removido
 * no Canva: como o vídeo já chega "estourado em branco", a seção replica
 * esse branco (natal-cream) para o produto parecer flutuar direto na
 * página, sem moldura — o padrão de hero de e-commerce (produto centralizado,
 * texto e CTA nos cantos) em vez do mask de logo usado antes.
 */
export default function ProductVideoHero({
  videoSrc,
  posterSrc,
  kicker,
  title,
  description,
  tagline,
  primaryCta,
  secondaryCta,
}: ProductVideoHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#f1f1f1] text-black lg:h-[94vh] lg:min-h-[680px]">
      <div
        aria-hidden
        className="absolute inset-0 select-none pointer-events-none text-natal-gold-deep/50"
      >
        {SPARKLES.map((s, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.6, 1] }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 3.5, delay: s.delay, repeat: Infinity, repeatType: "reverse" }
            }
            className={`absolute ${s.size}`}
            style={{ top: s.top, left: s.left }}
          >
            ✦
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col items-center gap-10 px-6 py-16 sm:px-10 sm:py-20 lg:block lg:px-16 lg:py-0">
        {/* Kicker — canto superior esquerdo */}
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-natal-red font-bold tracking-[0.35em] text-xs sm:text-sm uppercase text-center lg:absolute lg:top-12 lg:left-16 lg:text-left"
        >
          {kicker}
        </motion.span>

        {/* Tagline de marca — canto superior direito */}
        {tagline && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-black uppercase leading-[0.95] tracking-tight text-black text-center lg:absolute lg:top-10 lg:right-16 lg:max-w-sm lg:text-right"
          >
            {tagline}
          </motion.p>
        )}

        {/* Produto — vídeo centralizado, flutuando sobre o fundo branco */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[460px] sm:max-w-[560px] lg:absolute lg:top-1/2 lg:left-1/2 lg:max-w-[760px] lg:-translate-x-1/2 lg:-translate-y-1/2 xl:max-w-[920px]"
        >
          <div className="relative aspect-square w-full">
            <video
              src={videoSrc}
              poster={posterSrc}
              muted
              loop
              playsInline
              autoPlay
              aria-hidden
              className="h-full w-full object-contain"
            />
          </div>
          {/* Sombra de chão — ancora o produto no branco, em vez de deixá-lo boiando sem peso */}
          <div
            aria-hidden
            className="absolute -bottom-2 left-1/2 h-6 w-3/5 -translate-x-1/2 rounded-[100%] bg-black/10 blur-xl"
          />
        </motion.div>

        {/* Título + descrição — canto inferior esquerdo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex max-w-md flex-col gap-4 text-center lg:absolute lg:bottom-14 lg:left-16 lg:text-left"
        >
          <h1 className="text-4xl xs:text-5xl sm:text-6xl font-black uppercase leading-[0.95] tracking-tight text-black">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-black/60 font-light leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* CTAs — canto inferior direito */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col gap-3 xs:flex-row lg:absolute lg:bottom-14 lg:right-16"
        >
          <Magnetic strength={0.3} className="inline-block">
            <a
              href={primaryCta.href}
              className="inline-flex h-13 min-h-12 items-center justify-center whitespace-nowrap bg-natal-red px-10 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-black"
            >
              {primaryCta.label}
            </a>
          </Magnetic>
          <Magnetic strength={0.3} className="inline-block">
            <a
              href={secondaryCta.href}
              className="inline-flex min-h-12 items-center justify-center whitespace-nowrap border border-black/25 px-10 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors hover:border-natal-red hover:text-natal-red"
            >
              {secondaryCta.label}
            </a>
          </Magnetic>
        </motion.div>

        {/* Indicador de rolagem — só no desktop, onde sobra espaço no rodapé */}
        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:absolute lg:bottom-14 lg:left-1/2 lg:flex lg:-translate-x-1/2 lg:flex-col lg:items-center lg:gap-1 lg:text-black/40"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Rolar</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
