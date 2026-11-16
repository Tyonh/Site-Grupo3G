"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useSyncExternalStore } from "react";

/**
 * Header único do site, com dois modos:
 * - "overlay": fixo e transparente por cima de um hero escuro (vídeo ou foto,
 *   como na Citadel); ao rolar ganha fundo sólido para o texto não sumir.
 * - "solid": fundo sólido desde o início, para páginas que abrem com fundo
 *   claro ou conteúdo logo abaixo da barra.
 * Links pequenos no centro e o contato como único botão, para a navegação não
 * competir com a mídia.
 */
export type NavbarVariant = "overlay" | "solid";

/** Rolagem (px) a partir da qual o modo overlay ganha fundo. */
const SCROLL_THRESHOLD = 24;

const subscribeToScroll = (callback: () => void): (() => void) => {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
};
const getScrolled = (): boolean => window.scrollY > SCROLL_THRESHOLD;
const getServerScrolled = (): boolean => false;

const TEXT_SHADOW = "[text-shadow:0_1px_14px_rgba(0,0,0,0.65)]";

interface NavLink {
  href: string;
  label: string;
}

const links: NavLink[] = [
  { href: "/", label: "INÍCIO" },
  { href: "/natal", label: "NATAL" },
  { href: "/3g", label: "3G" },
  { href: "/ebron", label: "EBRON" },
  { href: "/sobre", label: "SOBRE" },
];

const contact: NavLink = {
  href: "https://wa.me/5585986559388?text=Olá!%20Gostaria%20de%20mais%20informações.",
  label: "CONTATO",
};

const isExternal = (href: string): boolean => href.startsWith("http");

/** Cor da barra quando ela tem fundo: vermelho do Grupo 3G ou azul da EBRON. */
export type NavbarTone = "red" | "navy";

const TONE_BACKGROUND: Record<NavbarTone, string> = {
  red: "bg-brand-red shadow-lg",
  navy: "bg-ebron-navy shadow-lg",
};
const TONE_CONTACT: Record<NavbarTone, string> = {
  red: "bg-white text-brand-red hover:bg-brand-charcoal hover:text-white",
  navy: "bg-white text-ebron-navy hover:bg-brand-charcoal hover:text-white",
};

interface GroupNavbarProps {
  variant?: NavbarVariant;
  tone?: NavbarTone;
}

const GroupNavbar = ({ variant = "overlay", tone = "red" }: GroupNavbarProps) => {
  const [open, setOpen] = useState(false);
  const scrolled = useSyncExternalStore(subscribeToScroll, getScrolled, getServerScrolled);

  const toggleMenu = () => setOpen(!open);

  const isOverlay = variant === "overlay";
  const hasBackground = !isOverlay || scrolled || open;
  const position = isOverlay ? "fixed inset-x-0 top-0" : "sticky top-0";
  const background = hasBackground
    ? TONE_BACKGROUND[tone]
    : "bg-transparent";

  return (
    <header
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
      className={`${position} z-50 flex h-16 w-full items-center px-4 text-white transition-[background-color,box-shadow] duration-300 sm:px-6 md:h-20 md:px-10 ${background}`}
    >
      <nav
        className="grid w-full grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr]"
        aria-label="Navegação principal"
      >
        {/* Logo — PNG transparente */}
        <Link href="/" className="flex w-fit items-center transition-transform duration-300 hover:scale-105">
          <span className="relative flex h-[44px] w-[44px] items-center sm:h-[52px] sm:w-[52px]">
            <Image
              src="/grupo-3g-logo.png"
              alt="Grupo 3G"
              fill
              sizes="52px"
              className="object-contain drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)]"
              priority
            />
          </span>
        </Link>

        {/* Desktop Menu — links pequenos e leves, centralizados */}
        <ul className={`hidden items-center gap-7 text-sm font-medium tracking-[0.16em] md:flex lg:gap-12 lg:text-base ${TEXT_SHADOW}`}>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover-underline-animation py-2 uppercase text-white/90 transition-colors duration-300 hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Contato — único botão do header */}
        <div className="hidden justify-end md:flex">
          <a
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:text-base ${
              hasBackground
                ? TONE_CONTACT[tone]
                : "bg-brand-red text-white hover:bg-white hover:text-brand-charcoal"
            }`}
          >
            {contact.label}
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="z-50 min-h-11 min-w-11 cursor-pointer rounded-lg p-2 transition-colors duration-300 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:hidden"
          onClick={toggleMenu}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="group-mobile-menu"
        >
          <div className="relative flex h-4 w-6 flex-col items-center justify-between">
            <span
              className={`h-[2px] w-full origin-left rounded bg-white transition-[transform,opacity] duration-300 ${
                open ? "translate-x-[3px] translate-y-[-2px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] w-full rounded bg-white transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-[2px] w-full origin-left rounded bg-white transition-[transform,opacity] duration-300 ${
                open ? "translate-x-[3px] translate-y-[2px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        id="group-mobile-menu"
        inert={!open}
        className={`absolute left-0 top-full z-40 w-full overflow-y-auto overscroll-contain bg-brand-charcoal/95 shadow-2xl backdrop-blur-md transition-[max-height,opacity] duration-400 ease-in-out md:hidden ${
          open ? "max-h-[calc(100dvh-4rem)] border-t border-white/10 opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-4 py-4 text-center text-lg font-medium tracking-[0.18em]">
          {[...links, contact].map((link) => (
            <li key={link.href} className="transform transition-transform duration-300 active:scale-95">
              {isExternal(link.href) ? (
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={MOBILE_LINK_CLASS}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ) : (
                <Link href={link.href} onClick={() => setOpen(false)} className={MOBILE_LINK_CLASS}>
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default GroupNavbar;
