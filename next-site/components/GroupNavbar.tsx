"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

/**
 * Header da página institucional do Grupo 3G ("/"). Fica transparente por
 * cima do vídeo do hero (como na Citadel), com links pequenos no centro e o
 * contato como único botão, para a navegação não competir com o vídeo.
 * Concentra os links que não são de uma marca só (Contato, Sobre), além das
 * portas de entrada 3G/EBRON/Natal.
 */
const TEXT_SHADOW = "[text-shadow:0_1px_14px_rgba(0,0,0,0.65)]";

interface NavLink {
  href: string;
  label: string;
}

const links: NavLink[] = [
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

const GroupNavbar = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  return (
    <header
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
      className="absolute inset-x-0 top-0 z-50 flex h-16 w-full items-center px-4 text-white sm:px-6 md:h-20 md:px-10"
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
              <a
                href={link.href}
                className="hover-underline-animation py-2 uppercase text-white/90 transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Contato — único botão do header */}
        <div className="hidden justify-end md:flex">
          <a
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-red px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-white hover:text-brand-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:text-base"
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
            <li key={link.href} onClick={() => setOpen(false)} className="transform transition-transform duration-300 active:scale-95">
              <a
                href={link.href}
                className="hover-underline-animation flex min-h-12 items-center justify-center px-4 py-3 uppercase text-white transition-colors duration-300 hover:text-natal-gold"
                target={isExternal(link.href) ? "_blank" : undefined}
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default GroupNavbar;
