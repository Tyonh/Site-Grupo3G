"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/siteConfig";

const MENSAGEM_GERAL = "Olá! Vim pelo site do Grupo 3G e gostaria de mais informações.";
const MENSAGEM_NATAL = "Olá! Vim da página de Natal e quero um orçamento da linha natalina 3G.";

/**
 * Botão de WhatsApp fixo no canto da tela, em todas as páginas do site. Na
 * coleção /natal a mensagem pede orçamento da linha natalina e o anel fica
 * dourado; no resto, mensagem geral e anel branco. Usa o ícone oficial
 * (arquivo, não SVG desenhado à mão).
 */
export default function FloatingWhatsApp() {
  const pathname = usePathname() ?? "/";
  const natal = pathname === "/natal" || pathname.startsWith("/natal/");
  const mensagem = natal ? MENSAGEM_NATAL : MENSAGEM_GERAL;
  const anel = natal ? "ring-natal-gold/70" : "ring-white/60";
  const pulso = natal ? "ring-natal-gold/40" : "ring-white/30";

  return (
    <a
      href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(mensagem)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com o Grupo 3G no WhatsApp"
      className={`group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg shadow-black/25 ring-2 ${anel} transition-transform duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))] sm:right-[max(1.5rem,env(safe-area-inset-right))]`}
    >
      <span aria-hidden className={`absolute inset-0 rounded-full ring-2 ${pulso} motion-safe:animate-ping`} />
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
