"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAutoplayVideo } from "@/hooks/useAutoplayVideo";

interface ScrollScrubPanelProps {
  href: string;
  photo?: string;
  video?: string;
  /** Cor de fundo do painel quando `video` está definido (o vídeo já nasce nessa cor) */
  mediaBg?: "black" | "white";
  /**
   * "left" trava o vídeo na metade esquerda do painel (contido, sem cobrir
   * o painel inteiro) e o texto na metade direita, ignorando a alternância
   * padrão por índice. "center" (padrão) mantém o comportamento full-bleed.
   */
  mediaAlign?: "center" | "left";
  alt: string;
  index: number;
  children: ReactNode;
}

/**
 * Painel do lineup de categorias com movimento ligado à posição de scroll:
 * a mídia entra em zoom-out até assentar, e o bloco de texto desliza a
 * partir do lado oposto ao painel anterior — em vez de só aparecer com
 * fade ao entrar em vista.
 *
 * Quando `video` é passado, ele tem prioridade sobre `photo`: o vídeo do
 * produto é exibido inteiro (object-contain) sobre o preto do próprio
 * painel — mesmo fundo já exportado no vídeo — em vez do full-bleed
 * object-cover usado para fotos de ambiente, que cortaria o produto.
 */
export default function ScrollScrubPanel({
  href,
  photo,
  video,
  mediaBg = "black",
  mediaAlign = "center",
  alt,
  index,
  children,
}: ScrollScrubPanelProps) {
  const isLight = Boolean(video) && mediaBg === "white";
  const isSplitLeft = mediaAlign === "left";
  const ref = useRef<HTMLAnchorElement>(null);
  const videoRef = useAutoplayVideo<HTMLVideoElement>();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.6], [1.18, 1]);
  const isEven = index % 2 === 0;
  // A primeira categoria (índice 0, split-left) já força o texto pra
  // direita — então a alternância das demais continua a partir daí
  // (índice ímpar = esquerda, par = direita), em vez de reiniciar do zero.
  const textOnLeft = isSplitLeft ? false : !isEven;
  const textX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    textOnLeft ? [-48, 0, 24] : [48, 0, -24],
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
      className={`group relative block h-[70vh] min-h-[440px] w-full overflow-hidden border-b ${
        isLight ? "border-black/10 bg-[#f1f1f1]" : "border-white/10 bg-black"
      }`}
    >
      {isSplitLeft && video ? (
        // Mobile: vídeo full-bleed cobrindo o painel inteiro, texto
        // sobreposto por cima com gradiente escuro pra legibilidade — sem
        // área branca separada. Desktop: volta a ser a coluna esquerda
        // (vídeo, do tamanho real dele) + coluna direita (texto), lado a lado.
        <div className="absolute inset-0 lg:flex lg:flex-row">
          <motion.div
            style={{ scale: imageScale }}
            className="absolute inset-0 lg:relative lg:inset-auto lg:z-10 lg:mr-[-1px] lg:aspect-video lg:h-full lg:w-auto lg:max-w-none lg:shrink-0"
          >
            <video
              ref={videoRef}
              src={video}
              muted
              loop
              playsInline
              autoPlay
              aria-hidden
              className="h-full w-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent lg:hidden" />
          <motion.div
            style={{ x: textX, opacity: textOpacity }}
            className="absolute inset-0 flex min-w-0 flex-col justify-end px-4 pb-10 text-white sm:px-12 lg:static lg:flex-1 lg:justify-center lg:px-16 lg:pb-0 lg:text-black"
          >
            {children}
          </motion.div>
        </div>
      ) : (
        <>
          {video ? (
            <motion.div style={{ scale: imageScale }} className="absolute inset-0">
              <video
                ref={videoRef}
                src={video}
                muted
                loop
                playsInline
                autoPlay
                aria-hidden
                className="h-full w-full object-contain"
              />
            </motion.div>
          ) : (
            photo && (
              <motion.div style={{ scale: imageScale }} className="absolute inset-0">
                <Image
                  src={photo}
                  alt={alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.div>
            )
          )}
          {/* Gradiente de legibilidade — só necessário sobre foto de ambiente;
              o vídeo já nasce na cor do painel, então dispensa escurecer por cima */}
          {!video && (
            <div
              className={`absolute inset-0 ${
                textOnLeft
                  ? "bg-gradient-to-r from-black/85 via-black/30 to-transparent"
                  : "bg-gradient-to-l from-black/85 via-black/30 to-transparent"
              }`}
            />
          )}

          <motion.div
            style={{ x: textX, opacity: textOpacity }}
            className={`absolute inset-0 flex flex-col justify-end sm:justify-center px-4 sm:px-12 lg:px-24 pb-10 sm:pb-0 ${
              textOnLeft ? "items-start text-left" : "items-start sm:items-end sm:text-right"
            }`}
          >
            {children}
          </motion.div>
        </>
      )}
    </Link>
  );
}
