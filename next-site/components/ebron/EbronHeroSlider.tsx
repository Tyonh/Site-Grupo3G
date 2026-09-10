"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Sun, Thermometer, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAutoplayVideo } from "@/hooks/useAutoplayVideo";

interface Specification {
  icon: LucideIcon;
  label: string;
}

interface Slide {
  title: string;
  description: string;
  specs: Specification[];
  href: string;
  image: string;
  imageAlt: string;
}

const slides: Slide[] = [
  {
    title: "LUMINÁRIA EBRON",
    description:
      "Corpo slim em alumínio, feito para uma iluminação urbana eficiente e com excelente custo-benefício.",
    specs: [
      { icon: ShieldCheck, label: "IP66" },
      { icon: Sun, label: "100 lm/W" },
      { icon: Thermometer, label: "5000 K" },
    ],
    href: "/produtos/ebron",
    image: "/ebron-helios.png",
    imageAlt: "Luminária EBRON",
  },
  {
    title: "LUMINÁRIA EBRON PRO",
    description:
      "Linha profissional com 130 lm/W, corpo em alumínio e policarbonato e base para relé fotoelétrico embutida.",
    specs: [
      { icon: ShieldCheck, label: "IP66" },
      { icon: Sun, label: "130 lm/W" },
      { icon: Thermometer, label: "5000 K" },
    ],
    href: "/produtos/ebron-pro",
    image: "/ebron-pro.png",
    imageAlt: "Luminária EBRON PRO",
  },
];

const whatsappUrl =
  "https://wa.me/5585986559388?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20a%20linha%20EBRON.";

export default function EbronHeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimer = useRef<number | null>(null);
  const videoRef = useAutoplayVideo<HTMLVideoElement>();

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 8000);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    };
  }, []);

  function selectSlide(index: number) {
    setActiveSlide(index);
    setIsPaused(true);

    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setIsPaused(false), 3000);
  }

  return (
    <section
      className="relative flex min-h-[560px] h-dvh w-full items-center overflow-hidden bg-ebron-navy"
      aria-label="Produtos EBRON em destaque"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-55"
      >
        <source src="/ebron-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-ebron-navy/95 via-ebron-navy/75 to-ebron-navy/35" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-12">
        {slides.map((slide, index) => {
          const visible = index === activeSlide;

          return (
            <article
              key={slide.href}
              aria-hidden={!visible}
              className={`absolute inset-0 mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-8 px-4 py-16 transition-all duration-700 sm:px-6 md:flex-row md:justify-between md:gap-10 lg:px-12 ${
                visible ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
              }`}
            >
              <div className="order-2 flex w-full flex-col items-center gap-4 text-center text-white md:order-1 md:w-[55%] md:items-start md:text-left">
                <span className="text-xs font-extrabold uppercase tracking-[0.3em] text-ebron-blue-light">
                  Iluminação pública EBRON
                </span>
                <h1 className="text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                  {slide.title}
                </h1>
                <p className="max-w-xl text-sm font-light leading-relaxed text-ebron-light/85 sm:text-base lg:text-lg">
                  {slide.description}
                </p>

                <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 py-2 md:justify-start sm:gap-x-7">
                  {slide.specs.map((spec) => {
                    const Icon = spec.icon;
                    return (
                      <span key={spec.label} className="flex items-center gap-2 text-base font-bold sm:text-lg lg:text-xl">
                        <Icon className="h-6 w-6 text-ebron-blue-light sm:h-7 sm:w-7" strokeWidth={2} />
                        {spec.label}
                      </span>
                    );
                  })}
                </div>

                <div className="flex w-full flex-col items-center gap-3 pt-1 sm:flex-row md:justify-start">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={visible ? 0 : -1}
                    className="flex h-12 w-full items-center justify-center rounded-lg bg-ebron-blue-light px-6 text-xs font-bold uppercase tracking-wider text-ebron-navy shadow-lg transition-all hover:-translate-y-0.5 hover:bg-white sm:w-64"
                  >
                    Fale com um especialista
                  </a>
                  <Link
                    href={slide.href}
                    tabIndex={visible ? 0 : -1}
                    className="flex h-12 w-full items-center justify-center rounded-lg border border-white/25 bg-white/10 px-6 text-xs font-bold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:bg-white hover:text-ebron-navy sm:w-52"
                  >
                    Ver detalhes
                  </Link>
                </div>
              </div>

              <div className="relative order-1 h-52 w-full sm:h-64 md:order-2 md:h-[400px] md:w-[45%] lg:h-[460px]">
                <div className={`relative mx-auto h-full w-[260px] transition-all duration-700 sm:w-[320px] md:w-[390px] lg:w-[450px] ${visible ? "translate-x-0 scale-100 opacity-100" : "translate-x-12 scale-95 opacity-0"}`}>
                  <Image
                    src={slide.image}
                    alt={slide.imageAlt}
                    fill
                    sizes="(max-width: 640px) 260px, (max-width: 768px) 320px, (max-width: 1024px) 390px, 450px"
                    className="animate-float object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
                    priority={index === 0}
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.href}
            type="button"
            onClick={() => selectSlide(index)}
            aria-label={`Mostrar ${slide.title}`}
            aria-current={index === activeSlide ? "true" : undefined}
            className={`h-3.5 w-3.5 rounded-full border border-white/40 transition-all ${
              index === activeSlide ? "scale-125 border-ebron-blue-light bg-ebron-blue-light" : "bg-white/40 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
