"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Proporção da foto da via — o "palco" mantém essa proporção em qualquer tela
// (equivalente a object-cover) pra que as posições em % continuem batendo com a
// luminária real da foto.
const PHOTO_ASPECT = 2000 / 1125;

// Onde a cabeça da luminária aparece na foto (em % do palco).
const LAMP_X = 47.5;
const LAMP_Y = 52.5;
// Largura da imagem do produto ao pousar, em % da largura do palco
// (a luminária ocupa ~83% da altura da imagem; na foto ela tem ~13% do palco).
const LAND_WIDTH_PCT = 15.5;

interface HomologadaInstallSceneProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

// Fundo fixo da página da Luminária Homologada: o produto desce sobre a foto de
// uma via pública, encaixa no braço do poste e a cena anoitece com a luminária
// acesa. Tudo dirigido pelo scroll da página, só até ~50% dela, pra terminar
// antes do fim mesmo em telas pequenas onde a página fica mais alta.
export function HomologadaInstallScene({ scrollContainerRef }: HomologadaInstallSceneProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const nightRef = useRef<HTMLDivElement>(null);
  const coneRef = useRef<HTMLDivElement>(null);
  const poolRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const stage = stageRef.current;
    if (!container || !stage) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const stageWidth = () => stage.offsetWidth;
      // Imagem inicial: ~85% da altura da tela (largura em % do palco).
      const startWidthPct = () => ((window.innerHeight * 0.85) / stageWidth()) * 100;
      const startLeftPct = () => (window.innerWidth >= 1024 ? 70 : 50);

      gsap.set(productRef.current, {
        left: () => `${startLeftPct()}%`,
        top: "50%",
        width: () => `${startWidthPct()}%`,
        xPercent: -50,
        yPercent: -50,
      });
      gsap.set(photoRef.current, { filter: "brightness(0.5) saturate(0.9)", scale: 1.04 });
      gsap.set([nightRef.current, coneRef.current, poolRef.current], { opacity: 0 });
      gsap.set(tiltRef.current, { transformPerspective: 900 });

      if (reduceMotion) {
        // Estado final estático: luminária instalada e acesa.
        gsap.set(productRef.current, { opacity: 0 });
        gsap.set(photoRef.current, { filter: "brightness(0.7)", scale: 1 });
        gsap.set(nightRef.current, { opacity: 0.5 });
        gsap.set([coneRef.current, poolRef.current], { opacity: 1 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: container,
          start: "top top",
          // Animação completa em 50% do scroll da página.
          end: () => `+=${Math.round((container.scrollHeight - window.innerHeight) * 0.5)}`,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // 1) Produto desce e encaixa no braço do poste.
      tl.to(
        productRef.current,
        {
          left: `${LAMP_X}%`,
          top: `${LAMP_Y}%`,
          width: `${LAND_WIDTH_PCT}%`,
          ease: "power2.inOut",
          duration: 0.5,
        },
        0.05,
      )
        .to(spinRef.current, { rotation: 90, ease: "power2.inOut", duration: 0.5 }, 0.05)
        .to(tiltRef.current, { rotationX: 60, ease: "power2.inOut", duration: 0.5 }, 0.05)
        .to(
          photoRef.current,
          { filter: "brightness(1) saturate(1)", scale: 1, duration: 0.5 },
          0.05,
        )
        // 2) Encaixou: o produto se funde com a luminária da foto.
        .to(productRef.current, { opacity: 0, duration: 0.1 }, 0.5)
        // 3) Anoitece e a luminária acende.
        .to(nightRef.current, { opacity: 0.6, duration: 0.35 }, 0.55)
        .to(photoRef.current, { filter: "brightness(0.75) saturate(0.85)", duration: 0.35 }, 0.55)
        .to([coneRef.current, poolRef.current], { opacity: 1, duration: 0.25 }, 0.7);
    }, stage);

    return () => ctx.revert();
  }, [scrollContainerRef]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black" aria-hidden="true">
      <div
        ref={stageRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: `max(100vw, calc(100vh * ${PHOTO_ASPECT}))`,
          aspectRatio: `${PHOTO_ASPECT}`,
        }}>
        <div ref={photoRef} className="absolute inset-0 will-change-transform">
          <Image
            src="/homologada-via.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 100vw, 1444px"
            className="object-cover select-none"
            draggable={false}
          />
        </div>

        <div ref={nightRef} className="absolute inset-0 bg-[#02050d]" />

        {/* Cone de luz saindo da luminária + poça de luz no asfalto */}
        <div
          ref={coneRef}
          className="absolute mix-blend-screen"
          style={{
            left: `${LAMP_X - 9}%`,
            top: `${LAMP_Y + 1}%`,
            width: "18%",
            height: "42%",
            // Blur na camada de fora: o clip-path é aplicado depois do filter
            // na mesma camada e cortaria o desfoque, deixando a borda dura.
            filter: "blur(14px)",
          }}>
          <div
            className="h-full w-full"
            style={{
              clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0 100%)",
              background:
                "linear-gradient(to bottom, rgba(255,246,222,0.55), rgba(255,240,205,0.1) 80%, transparent)",
            }}
          />
        </div>
        <div
          ref={poolRef}
          className="absolute mix-blend-screen"
          style={{
            left: `${LAMP_X - 14}%`,
            top: `${LAMP_Y + 30}%`,
            width: "28%",
            height: "16%",
            background:
              "radial-gradient(ellipse at center, rgba(255,243,214,0.55), rgba(255,243,214,0) 70%)",
          }}
        />

        {/* Produto: tilt (achata no eixo vertical da tela) por fora, giro por dentro */}
        <div ref={productRef} className="absolute">
          <div ref={tiltRef}>
            <div ref={spinRef}>
              <Image
                src="/homo-sem-fundo.png"
                alt=""
                width={1080}
                height={1080}
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="h-auto w-full select-none drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
