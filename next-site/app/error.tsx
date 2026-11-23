"use client";

import Link from "next/link";
import { useEffect } from "react";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Tela de erro inesperado de qualquer página (o layout raiz, com navbar e
 * botões fixos, continua de pé). `retry` tenta renderizar a página de novo.
 */
export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    // Fica no console do navegador; o `digest` casa com o log do servidor (PM2).
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 items-center bg-brand-charcoal text-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-28 sm:px-8 sm:py-36">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-red">Algo deu errado</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl">
          A página não carregou
        </h1>
        <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/70 sm:text-lg">
          Tivemos um problema ao abrir esta página. Tente de novo; se continuar, fale com a gente pelo
          WhatsApp.
        </p>
        {error.digest && (
          <p className="mt-3 font-mono text-xs text-white/35">Código: {error.digest}</p>
        )}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => retry()}
            className="inline-flex min-h-12 cursor-pointer items-center justify-center bg-brand-red px-8 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Tentar de novo
          </button>
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center border border-white/30 px-8 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Voltar ao início
          </Link>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center px-4 text-xs font-bold uppercase tracking-[0.2em] text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
