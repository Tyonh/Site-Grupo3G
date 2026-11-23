import type { Metadata } from "next";
import Link from "next/link";
import GroupNavbar from "@/components/GroupNavbar";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Página não encontrada",
  description: "O endereço que você acessou não existe ou mudou de lugar.",
};

const ATALHOS = [
  { href: "/natal", label: "Coleção Natal" },
  { href: "/3g", label: "3G Iluminação" },
  { href: "/ebron", label: "EBRON" },
  { href: "/sobre", label: "Sobre o Grupo 3G" },
];

const WHATSAPP_MSG = "Olá! Não encontrei uma página no site e preciso de ajuda.";

/** 404 do site inteiro: vale para qualquer URL que não existe. */
export default function NotFound() {
  return (
    <>
      <GroupNavbar variant="solid" />
      <main className="relative flex flex-1 items-center overflow-hidden bg-brand-charcoal text-white">
        {/* número gigante de fundo, só decoração */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 bottom-[-0.15em] select-none text-[clamp(10rem,38vw,30rem)] font-black leading-none tracking-tighter text-white/[0.04]"
        >
          404
        </span>

        <div className="relative mx-auto w-full max-w-5xl px-4 py-24 sm:px-8 sm:py-32">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-red">Erro 404</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl">
            Essa luz não está acesa
          </h1>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/70 sm:text-lg">
            A página que você procurou não existe ou mudou de endereço. Volte para o início ou fale
            direto com a nossa equipe.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center bg-brand-red px-8 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Voltar ao início
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(WHATSAPP_MSG)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center border border-white/30 px-8 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Falar no WhatsApp
            </a>
          </div>

          <nav aria-label="Páginas principais" className="mt-14 border-t border-white/10 pt-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40">
              Talvez você procure
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {ATALHOS.map((a) => (
                <li key={a.href}>
                  <Link
                    href={a.href}
                    className="hover-underline-animation text-sm font-medium text-white/80 transition-colors hover:text-white"
                  >
                    {a.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </main>
    </>
  );
}
