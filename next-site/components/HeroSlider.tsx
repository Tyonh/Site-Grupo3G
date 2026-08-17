"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ShieldCheck, Sun, Thermometer, Zap, type LucideIcon } from "lucide-react";
import { useAutoplayVideo } from "@/hooks/useAutoplayVideo";

interface Spec {
  icon: LucideIcon;
  label: string;
}

interface Slide {
  title: string;
  subtitle?: string;
  category?: string;
  specs: Spec[];
  btnPrimaryText: string;
  btnPrimaryHref: string;
  btnSecondaryText: string;
  btnSecondaryHref: string;
  productImg: string;
  productAlt: string;
}

const slidesData: Slide[] = [
  {
    title: "EFICIÊNCIA QUE TRANSFORMA",
    subtitle: "Pioneiros em tecnologia LED no Ceará há mais de 30 anos",
    category: "LUMINÁRIA SOLAR",
    specs: [
      { icon: ShieldCheck, label: "IP 66" },
      { icon: Sun, label: "1500lm/W" },
      { icon: Thermometer, label: "6500K" },
    ],
    btnPrimaryText: "Fale com nossos especialistas",
    btnPrimaryHref: "https://wa.me/5585986559388?text=Olá!%20Gostaria%20de%20mais%20informações.",
    btnSecondaryText: "Informações Técnicas",
    btnSecondaryHref: "https://grupo3giluminacao.com.br/pages/Solar/Solar.html",
    productImg: "/Solar-famili.png",
    productAlt: "Luminária Solar Família",
  },
  {
    title: "REFLETOR MODULAR",
    specs: [
      { icon: ShieldCheck, label: "IP 66" },
      { icon: Sun, label: "130lm/W" },
      { icon: Thermometer, label: "6500K" },
    ],
    btnPrimaryText: "Orçamento Rápido",
    btnPrimaryHref: "https://wa.me/5585986559388?text=Olá!%20Gostaria%20de%20mais%20informações.",
    btnSecondaryText: "Ver Detalhes",
    btnSecondaryHref: "https://grupo3giluminacao.com.br/pages/Refletor%20Modular/Modular.Html",
    productImg: "/Refletor Modular.png",
    productAlt: "Refletor Modular",
  },
  {
    title: "LUMINÁRIA HOMOLOGADA",
    specs: [
      { icon: ShieldCheck, label: "IP 66" },
      { icon: Sun, label: "160lm/W" },
      { icon: Thermometer, label: "5000K" },
    ],
    btnPrimaryText: "Fale com nossos especialistas",
    btnPrimaryHref: "https://wa.me/5585986559388?text=Olá!%20Gostaria%20de%20mais%20informações.",
    btnSecondaryText: "Ficha Técnica",
    btnSecondaryHref: "https://grupo3giluminacao.com.br/pages/Homologada/Homologada.html",
    productImg: "/familia homologada.png",
    productAlt: "Luminária Homologada",
  },
  {
    title: "LUMINÁRIA EBRON 50W",
    specs: [
      { icon: ShieldCheck, label: "IP 66" },
      { icon: Zap, label: "Bivolt" },
      { icon: Thermometer, label: "5000K" },
    ],
    btnPrimaryText: "Comprar Agora",
    btnPrimaryHref: "https://wa.me/5585986559388?text=Olá!%20Gostaria%20de%20mais%20informações.",
    btnSecondaryText: "Ficha Técnica",
    btnSecondaryHref: "https://grupo3giluminacao.com.br/pages/Ebron/Ebron.html",
    productImg: "/FAMILIA EBRON.png",
    productAlt: "Luminária Ebron 50W",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useAutoplayVideo<HTMLVideoElement>();

  const startSlider = () => {
    stopSlider();
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesData.length);
    }, 8000);
  };

  const stopSlider = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (isPlaying) {
      startSlider();
    } else {
      stopSlider();
    }
    return () => stopSlider();
  }, [isPlaying, currentSlide]);

  const handleDotClick = (index: number) => {
    setIsPlaying(false);
    setCurrentSlide(index);
    // Resume autoplay after action
    setTimeout(() => setIsPlaying(true), 2000);
  };

  return (
    <section
      className="relative w-full h-[780px] xs:h-[720px] sm:h-[650px] md:h-[600px] lg:h-[650px] xl:h-[700px] overflow-hidden bg-black flex items-center"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-40 pointer-events-none"
      >
        <source src="/landipagevi.mp4" type="video/mp4" />
      </video>

      {/* Slide Container */}
      <div className="relative w-full h-full max-w-7xl mx-auto z-10 px-4 sm:px-6 flex items-center">
        {slidesData.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={index}
              className={`absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-between transition-all duration-1000 ease-in-out px-4 sm:px-6 py-8 md:py-0 ${
                isActive
                  ? "opacity-100 pointer-events-auto visible"
                  : "opacity-0 pointer-events-none invisible"
              }`}
            >
              {/* Text content */}
              <div className="flex flex-col gap-3 w-full md:w-[56%] lg:w-[58%] justify-center text-white text-center md:text-left mt-6 md:mt-0 order-2 md:order-1 z-20">
                <div>
                  <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight leading-tight uppercase text-shadow-md">
                    {slide.title}
                  </h1>
                  {slide.subtitle && (
                    <h2 className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg text-brand-light font-light mt-2 opacity-90">
                      {slide.subtitle}
                    </h2>
                  )}
                  {slide.category && (
                    <h3 className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl font-semibold text-brand-light tracking-wide mt-1">
                      {slide.category}
                    </h3>
                  )}
                </div>

                {/* Characteristics */}
                <div className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-2 sm:gap-x-7 min-h-[50px] items-center my-1 sm:my-2">
                  {slide.specs.map((spec, specIndex) => {
                    const SpecIcon = spec.icon;
                    return (
                      <span
                        key={specIndex}
                        className="flex items-center gap-2 text-white font-bold text-lg sm:text-xl md:text-2xl drop-shadow-lg"
                      >
                        <SpecIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" strokeWidth={2} />
                        {spec.label}
                      </span>
                    );
                  })}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-center md:justify-start w-full">
                  <a
                    href={slide.btnPrimaryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-12 w-full sm:w-[250px] md:w-[220px] lg:w-[260px] xl:w-[280px] bg-brand-red text-white font-bold rounded-lg hover:-translate-y-0.5 hover:bg-red-800 transition-all duration-300 shadow-lg text-center text-xs sm:text-sm uppercase tracking-wider"
                  >
                    {slide.btnPrimaryText}
                  </a>
                  <a
                    href={slide.btnSecondaryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-12 w-full sm:w-[200px] md:w-[160px] lg:w-[200px] xl:w-[220px] bg-brand-dark text-white font-bold rounded-lg hover:-translate-y-0.5 hover:bg-gray-800 transition-all duration-300 shadow-lg text-center text-xs sm:text-sm uppercase tracking-wider"
                  >
                    {slide.btnSecondaryText}
                  </a>
                </div>
              </div>

              {/* Product Image */}
              <div className="w-full md:w-[44%] lg:w-[42%] flex justify-center md:justify-end order-1 md:order-2 h-[180px] sm:h-[220px] md:h-[400px] lg:h-[450px] relative mt-12 sm:mt-16 md:mt-0">
                <div
                  className={`relative w-[260px] sm:w-[320px] md:w-[380px] lg:w-[420px] xl:w-[450px] h-full transition-all duration-1000 ease-out transform ${
                    isActive
                      ? "opacity-100 translate-x-0 scale-100"
                      : "opacity-0 translate-x-16 scale-95"
                  }`}
                >
                  <Image
                    src={slide.productImg}
                    alt={slide.productAlt}
                    fill
                    sizes="(max-width: 640px) 260px, (max-width: 768px) 320px, (max-width: 1024px) 380px, 450px"
                    className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] animate-float"
                    priority={index === 0}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slider Indicators (Dots) */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-30">
        {slidesData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3.5 h-3.5 rounded-full border border-white/40 cursor-pointer transition-all duration-300 ${
              index === currentSlide
                ? "bg-brand-red scale-125 border-brand-red"
                : "bg-white/40 hover:bg-white/80"
            }`}
            aria-label={`Ir para o slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
