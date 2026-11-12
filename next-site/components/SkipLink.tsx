"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Link "Pular para o conteúdo" (WCAG 2.4.1): invisível até receber foco pelo
 * teclado, e leva direto ao <main> da página, sem passar pelo menu inteiro.
 *
 * Cada página declara o seu próprio <main>, em arquivos diferentes; em vez de
 * repetir um `id` em todos, este componente marca o <main> da rota atual (e o
 * torna focável) toda vez que a rota muda.
 */
const MAIN_ID = "conteudo-principal";

export default function SkipLink() {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;
    main.id = MAIN_ID;
    main.setAttribute("tabindex", "-1");
  }, [pathname]);

  return (
    <a
      href={`#${MAIN_ID}`}
      className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100000] focus:rounded focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-black focus:shadow-lg focus:outline-2 focus:outline-offset-2 focus:outline-black">
      Pular para o conteúdo
    </a>
  );
}
