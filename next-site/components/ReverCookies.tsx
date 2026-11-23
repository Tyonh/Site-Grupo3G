"use client";

import { resetChoice } from "@/lib/consent";

/** Botão da política de privacidade que desfaz a escolha de cookies (o banner volta). */
export default function ReverCookies() {
  return (
    <button
      type="button"
      onClick={resetChoice}
      className="inline-flex min-h-11 cursor-pointer items-center justify-center border border-white/30 px-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      Rever minha escolha de cookies
    </button>
  );
}
