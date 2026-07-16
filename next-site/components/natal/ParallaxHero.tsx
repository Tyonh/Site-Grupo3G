"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxHeroProps {
  imageSrc: string;
  imageAlt: string;
  children: ReactNode;
}

/**
 * Hero full-bleed com parallax vinculado ao scroll: a foto de fundo se move
 * mais devagar que o conteúdo, e o texto desliza/esmaece conforme a seção
 * sai de vista — em vez de ficar estática esperando o usuário rolar.
 */
export default function ParallaxHero({
  imageSrc,
  imageAlt,
  children,
}: ParallaxHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[92vh] min-h-[560px] w-full overflow-hidden"
    >
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-x-0 -top-[15%] h-[130%]"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="absolute inset-0 flex flex-col justify-end"
      >
        {children}
      </motion.div>
    </section>
  );
}
