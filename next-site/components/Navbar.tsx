"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  const links = [
    { href: "/", label: "INÍCIO" },
    { href: "https://grupo3giluminacao.com.br/pages/catalogo/catalogo.html", label: "PRODUTOS" },
    { href: "https://wa.me/5585986559388?text=Olá!%20Gostaria%20de%20mais%20informações.", label: "CONTATO" },
    { href: "/sobre", label: "SOBRE" },
  ];

  return (
    <header className="bg-brand-red text-white h-[80px] flex items-center relative z-50 w-full px-4 sm:px-6 md:px-8 shadow-md">
      <nav className="w-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 transition-transform duration-300 hover:scale-102">
          <Image
            src="/3G VETOR branco.png"
            alt="3G Iluminação"
            width={120}
            height={60}
            className="h-[50px] sm:h-[60px] w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center md:space-x-6 lg:space-x-12 xl:space-x-20 font-bold text-sm lg:text-base xl:text-lg tracking-widest">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hover:text-black transition-colors duration-300 hover-underline-animation uppercase py-2"
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
          className="md:hidden focus:outline-none p-2 rounded-lg hover:bg-red-800/60 transition-colors duration-300 cursor-pointer z-50"
          onClick={toggleMenu}
          aria-label="Menu"
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

      {/* Mobile Menu Glassmorphism Drawer with Smooth Transition */}
      <div
        className={`absolute top-[80px] left-0 w-full md:hidden glassmorphism shadow-2xl transition-all duration-400 ease-in-out z-40 overflow-hidden ${
          open ? "max-h-[320px] opacity-100 border-t border-white/10" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="text-center py-8 flex flex-col gap-6 font-semibold text-[17px] tracking-widest">
          {links.map((link) => (
            <li key={link.href} onClick={() => setOpen(false)} className="transform transition-transform duration-300 active:scale-95">
              <a
                href={link.href}
                className="inline-block py-2 text-white hover:text-black transition-colors duration-300 hover-underline-animation uppercase"
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

export default Navbar;
