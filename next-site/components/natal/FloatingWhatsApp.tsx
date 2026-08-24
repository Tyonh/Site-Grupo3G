import Image from "next/image";
import { siteConfig } from "@/lib/siteConfig";

const MESSAGE =
  "Olá! Vim da página de Natal e quero um orçamento da linha natalina 3G.";

/**
 * Botão de WhatsApp fixo no canto da tela — acompanha o scroll do visitante
 * em toda a seção /natal. Usa o ícone oficial (arquivo, não SVG desenhado à
 * mão) para evitar o traço quebrado; o anel em dourado natalino
 * (--color-natal-gold) é o único toque de tema da coleção.
 */
export default function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a 3G no WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg shadow-black/25 ring-2 ring-natal-gold/70 transition-transform duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-natal-gold sm:bottom-6 sm:right-6"
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full ring-2 ring-natal-gold/40 motion-safe:animate-ping"
      />
      <Image
        src="/natal/natal-whatsapp-icon.png"
        alt=""
        fill
        sizes="56px"
        className="rounded-full object-cover"
      />
    </a>
  );
}
