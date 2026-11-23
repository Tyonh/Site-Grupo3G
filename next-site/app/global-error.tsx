"use client";

import { useEffect } from "react";
import "./globals.css";

/**
 * Último recurso: erro no próprio layout raiz. Substitui o documento inteiro,
 * por isso declara <html>/<body> e não usa componentes do site.
 */
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen items-center bg-brand-charcoal text-white">
        <main className="mx-auto w-full max-w-3xl px-6 py-24">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-red">Grupo 3G</p>
          <h1 className="mt-4 text-4xl font-black uppercase leading-[0.95] sm:text-5xl">
            O site não carregou
          </h1>
          <p className="mt-6 text-base font-light leading-relaxed text-white/70">
            Tivemos um problema inesperado. Tente de novo em instantes.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => retry()}
              className="inline-flex min-h-12 cursor-pointer items-center justify-center bg-brand-red px-8 text-xs font-bold uppercase tracking-[0.2em] text-white"
            >
              Tentar de novo
            </button>
            {/* <a> e não <Link>: o roteador pode ser justamente o que quebrou */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              className="inline-flex min-h-12 items-center justify-center border border-white/30 px-8 text-xs font-bold uppercase tracking-[0.2em] text-white"
            >
              Voltar ao início
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
