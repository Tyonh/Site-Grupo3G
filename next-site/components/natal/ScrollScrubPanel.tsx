"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollScrubPanelProps {
  href: string;
  photo?: string;
  alt: string;
  index: number;
  children: ReactNode;
}

/**
 * Painel do lineup de categorias com movimento ligado à posição de scroll:
 * a foto entra em zoom-out até assentar, e o bloco de texto desliza a
 * partir do lado oposto ao painel anterior — em vez de só aparecer com
 * fade ao entrar em vista.
 */
export default function ScrollScrubPanel({
  href,
  photo,
  alt,
  index,
  children,
}: ScrollScrubPanelProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.6], [1.18, 1]);
  const isEven = index % 2 === 0;
  const textX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isEven ? [-48, 0, 24] : [48, 0, -24],
  );
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0.4],
  );

  return (
    <Link
      ref={ref}
      href={href}
      className="group relative block h-[70vh] min-h-[440px] w-full overflow-hidden border-b border-white/10"
    >
      {photo && (
        <motion.div style={{ scale: imageScale }} className="absolute inset-0">
          <Image
            src={photo}
            alt={alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      )}
      <div
        className={`absolute inset-0 ${
          isEven
            ? "bg-gradient-to-r from-black/85 via-black/30 to-transparent"
            : "bg-gradient-to-l from-black/85 via-black/30 to-transparent"
        }`}
      />

      <motion.div
        style={{ x: textX, opacity: textOpacity }}
        className={`absolute inset-0 flex flex-col justify-end sm:justify-center px-4 sm:px-12 lg:px-24 pb-10 sm:pb-0 ${
          isEven ? "items-start text-left" : "items-start sm:items-end sm:text-right"
        }`}
      >
        {children}
      </motion.div>
    </Link>
  );
}
