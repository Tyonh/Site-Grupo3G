"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

/**
 * Header da página institucional do Grupo 3G ("/"). Usa o vermelho da capa
 * do Catálogo 2026 (cor-base do Grupo) e concentra os links que não são de
 * uma marca só (Contato, Sobre), além das portas de entrada 3G/EBRON/Natal.
 */
const GroupNavbar = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  const links = [
    { href: "/3g", label: "3G" },
    { href: "/ebron", label: "EBRON" },
    { href: "/natal", label: "NATAL" },
    { href: "https://wa.me/5585986559388?text=Olá!%20Gostaria%20de%20mais%20informações.", label: "CONTATO" },
    { href: "/sobre", label: "SOBRE" },
  ];

  return (
    <header onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }} className="bg-brand-red text-white h-[80px] flex items-center relative z-50 w-full px-4 sm:px-6 md:px-8 shadow-md">
      <nav className="w-full max-w-7xl mx-auto flex items-center justify-between" aria-label="Navegação principal">
        {/* Logo — PNG transparente, o vermelho do header aparece ao redor */}
        <Link href="/" className="flex items-center transition-transform duration-300 hover:scale-102">
          <span className="relative flex h-[56px] w-[56px] items-center sm:h-[64px] sm:w-[64px]">
            <Image
              src="/grupo-3g-logo.png"
              alt="Grupo 3G"
              fill
              sizes="64px"
              className="object-contain"
              priority
            />
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center md:space-x-6 lg:space-x-12 xl:space-x-16 font-bold text-sm lg:text-base tracking-widest">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hover:text-natal-gold transition-colors duration-300 hover-underline-animation uppercase py-2"
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden min-h-11 min-w-11 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-300 cursor-pointer z-50"
          onClick={toggleMenu}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="group-mobile-menu"
        >
          <div className="w-7 h-5 flex flex-col justify-between items-center relative">
            <span
              className={`w-full h-[3px] bg-white rounded transition-all duration-300 origin-left ${
                open ? "rotate-45 translate-x-[3px] translate-y-[-2px]" : ""
              }`}
            />
            <span
              className={`w-full h-[3px] bg-white rounded transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-full h-[3px] bg-white rounded transition-all duration-300 origin-left ${
                open ? "-rotate-45 translate-x-[3px] translate-y-[2px]" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        id="group-mobile-menu"
        inert={!open}
        className={`absolute top-full left-0 w-full md:hidden bg-brand-red/97 backdrop-blur-md shadow-2xl transition-all duration-400 ease-in-out z-40 overflow-y-auto overscroll-contain ${
          open ? "max-h-[calc(100dvh-5rem)] opacity-100 border-t border-white/10" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="text-center px-4 py-4 flex flex-col gap-1 font-semibold text-[17px] tracking-widest">
          {links.map((link) => (
            <li key={link.href} onClick={() => setOpen(false)} className="transform transition-transform duration-300 active:scale-95">
              <a
                href={link.href}
                className="flex min-h-12 items-center justify-center px-4 py-3 text-white hover:text-natal-gold transition-colors duration-300 hover-underline-animation uppercase"
                target={link.href.startsWith("http") ? "_blank" : undefined}
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
