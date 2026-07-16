"use client";

import { useState, useEffect } from "react";

interface LogoVideoRevealProps {
  videoSrc: string;
  logoSrc: string;
}

// Lista ordenada de vídeos HD locais para transição
const HD_VIDEOS = [
  "/natal/videos/vermelho hd.MP4",
  "/natal/videos/branco quente hd.MP4",
  "/natal/videos/Branco hd.MP4",
  "/natal/videos/azul hd.MP4",
  "/natal/videos/verde hd.MP4",
  "/natal/videos/Multicolor hd.MP4",
];

// Frases laterais apresentando o que a 3G faz — mesmo padrão de blocos
// curtos empilhados usado na coluna esquerda da avax.network
const LEFT_LINES = [
  { text: "O Grupo 3G existe para", highlight: false },
  { text: "iluminar o que importa.", highlight: true },
  { text: "Cordões, mangueiras e fitas de LED", highlight: false },
  { text: "para toda forma de decorar.", highlight: false },
  { text: "Da fachada residencial", highlight: false },
  { text: "à praça pública inteira.", highlight: false },
  { text: "Tudo o que fazemos prioriza", highlight: false },
  { text: "durabilidade e brilho real.", highlight: true },
];

/**
 * Abertura da página natalina, no padrão de grid da avax.network: coluna
 * esquerda com frases institucionais empilhadas, logo em destaque no
 * centro (com vídeo do produto passando por dentro via CSS mask, sem
 * vazar o formato), coluna direita com marca + indicador de scroll.
 * Alterna entre tema claro e escuro só nesta seção.
 */
export default function LogoVideoReveal({
  videoSrc,
  logoSrc,
}: LogoVideoRevealProps) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const isDark = theme === "dark";

  // Estados para gerenciar a transição de cross-fade entre os vídeos HD
  const [videoIndex, setVideoIndex] = useState(0);
  const [activePlayer, setActivePlayer] = useState<1 | 2>(1);
  const [video1Src, setVideo1Src] = useState(HD_VIDEOS[0]);
  const [video2Src, setVideo2Src] = useState("");

  useEffect(() => {
    let prefetchTimeoutId: NodeJS.Timeout;
    let transitionTimeoutId: NodeJS.Timeout;

    const interval = setInterval(() => {
      const nextIndex = (videoIndex + 1) % HD_VIDEOS.length;
      const nextVideo = HD_VIDEOS[nextIndex];

      if (activePlayer === 1) {
        // Carrega o próximo vídeo no player inativo (player 2)
        setVideo2Src(nextVideo);

        // Efetua a transição de opacidade após 1s para dar tempo de carregar o buffer inicial
        transitionTimeoutId = setTimeout(() => {
          setActivePlayer(2);
          setVideoIndex(nextIndex);
        }, 1000);
      } else {
        // Carrega o próximo vídeo no player inativo (player 1)
        setVideo1Src(nextVideo);

        // Efetua a transição de opacidade após 1s
        transitionTimeoutId = setTimeout(() => {
          setActivePlayer(1);
          setVideoIndex(nextIndex);
        }, 1000);
      }
    }, 6000); // Transição a cada 6 segundos

    return () => {
      clearInterval(interval);
      if (prefetchTimeoutId) clearTimeout(prefetchTimeoutId);
      if (transitionTimeoutId) clearTimeout(transitionTimeoutId);
    };
  }, [videoIndex, activePlayer]);

  // Codifica espaços/caracteres especiais no caminho do arquivo — url() em
  // CSS não aceita espaço cru de forma confiável em todos os navegadores.
  const encodedLogoSrc = encodeURI(logoSrc);

  const maskStyle: React.CSSProperties = {
    WebkitMaskImage: `url(${encodedLogoSrc})`,
    maskImage: `url(${encodedLogoSrc})`,
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  };

  const borderClass = isDark ? "border-white/12" : "border-black/10";
  const mutedClass = isDark ? "text-white/55" : "text-black/55";
  const accentClass = isDark ? "text-natal-gold" : "text-natal-red";

  return (
    <section
      className={`relative w-full overflow-hidden transition-colors duration-500 h-[calc(100svh-80px)] min-h-[560px] ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}>
      {/* Toggle claro/escuro, escopado a esta seção */}
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label="Alternar tema da abertura"
        title={isDark ? "Modo claro" : "Modo escuro"}
        className={`absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center justify-center w-10 h-10 rounded-full border transition-colors cursor-pointer ${
          isDark
            ? "border-white/20 text-natal-gold hover:border-natal-gold/60"
            : "border-black/15 text-natal-red hover:border-natal-red/60"
        }`}>
        {isDark ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5">
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
            className="w-5 h-5">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
        )}
      </button>

      {/* Fundo com profundidade: brilho radial sutil + pontos de luz,
          em vez de cor chapada */}
      <div
        aria-hidden
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(227, 184, 78, 0.07), transparent 70%), radial-gradient(ellipse 90% 70% at 50% 100%, rgba(166, 32, 36, 0.08), transparent 60%)"
            : "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(166, 32, 36, 0.05), transparent 70%), radial-gradient(ellipse 90% 70% at 50% 100%, rgba(227, 184, 78, 0.08), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className={`absolute inset-0 select-none pointer-events-none text-sm transition-opacity duration-500 ${
          isDark
            ? "opacity-30 text-natal-gold/40"
            : "opacity-40 text-natal-red/30"
        }`}>
        <span className="absolute top-[15%] left-[12%]">✦</span>
        <span className="absolute top-[28%] right-[18%] text-[10px]">✦</span>
        <span className="absolute top-[60%] left-[8%] text-[10px]">✦</span>
        <span className="absolute bottom-[22%] right-[10%]">✦</span>
        <span className="absolute top-[12%] right-[38%] text-[8px]">✦</span>
        <span className="absolute bottom-[15%] left-[30%] text-[8px]">✦</span>
      </div>

      {/* Grid de três colunas (padrão avax.network): texto institucional à
          esquerda, logo em destaque no centro, marca + scroll à direita.
          Em telas pequenas empilha em coluna única. */}
      <div className="relative z-10 h-full w-full grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr]">
        {/* Coluna esquerda — frases institucionais */}
        <div
          className={`hidden lg:flex flex-col justify-center gap-1 px-8 xl:px-12 border-r ${borderClass}`}>
          {LEFT_LINES.map((line) => (
            <p
              key={line.text}
              className={`text-sm xl:text-base font-medium leading-snug transition-colors duration-500 ${
                line.highlight
                  ? accentClass
                  : isDark
                    ? "text-white/85"
                    : "text-black/85"
              }`}>
              {line.text}
            </p>
          ))}
        </div>

        {/* Coluna central — logo em destaque com vídeo passando por dentro */}
        <div className="flex flex-col items-center justify-center px-6 py-10 gap-5">
          <div className="relative w-full h-[min(68vh,640px)] flex items-center justify-center">
            <div
              style={maskStyle}
              className="absolute inset-0 scale-[1.25] sm:scale-[1.3] md:scale-[1.35] transition-transform duration-500">
              {/* Player de Vídeo 1 */}
              {video1Src && (
                <video
                  src={video1Src}
                  muted
                  loop
                  playsInline
                  autoPlay
                  aria-hidden
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    activePlayer === 1 ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                />
              )}
              {/* Player de Vídeo 2 */}
              {video2Src && (
                <video
                  src={video2Src}
                  muted
                  loop
                  playsInline
                  autoPlay
                  aria-hidden
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    activePlayer === 2 ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                />
              )}
            </div>
          </div>

          <span className="sr-only">Grupo 3G Iluminação</span>

          <p
            className={`font-bold tracking-[0.3em] sm:tracking-[0.35em] text-[10px] xs:text-xs sm:text-sm uppercase text-center px-4 ${accentClass}`}>
            Coleção Natal — Grupo 3G
          </p>
        </div>

        {/* Coluna direita — marca e indicador de scroll */}
        <div
          className={`hidden lg:flex flex-col justify-between px-8 xl:px-12 py-10 border-l ${borderClass}`}>
          <div className="flex flex-col gap-2">
            <span
              className={`text-2xl font-black uppercase tracking-tight ${accentClass}`}>
              3G
            </span>
            <span className={`text-xs font-medium ${mutedClass}`}>
              Catálogo Natal 2026
            </span>
          </div>

          <div className="flex flex-col items-end text-right gap-1">
            <span className="text-xs font-bold uppercase tracking-[0.25em]">
              Rolar
            </span>
            <span className={`text-[11px] ${mutedClass}`}>
              para explorar a página
            </span>
          </div>
        </div>
      </div>

      {/* Versão compacta das frases institucionais para telas menores */}
      <div className="lg:hidden absolute bottom-4 left-0 right-0 z-10 px-6">
        <p className="text-center text-[11px] leading-relaxed transition-colors duration-500">
          {LEFT_LINES.slice(0, 4).map((line, idx) => (
            <span
              key={line.text}
              className={
                line.highlight
                  ? accentClass
                  : isDark
                    ? "text-white/85"
                    : "text-black/85"
              }>
              {line.text}
              {idx < 3 ? " " : ""}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
