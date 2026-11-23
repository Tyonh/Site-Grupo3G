"use client";

import Link from "next/link";
import Script from "next/script";
import { useSyncExternalStore } from "react";
import { GA_ID, readChoice, saveChoice, subscribeChoice, type CookieChoice } from "@/lib/consent";

/** No servidor não há escolha para ler: não renderiza banner nem script. */
const SERVER = "server" as const;
const getServerSnapshot = (): typeof SERVER => SERVER;

/**
 * Banner de cookies (LGPD) + Google Analytics 4. O GA só é carregado depois
 * que o visitante clica em "Aceitar"; "Recusar" vale tanto quanto aceitar e
 * não carrega nada. Sem NEXT_PUBLIC_GA_ID este componente não renderiza.
 */
export default function CookieConsent() {
  const choice = useSyncExternalStore<CookieChoice | null | typeof SERVER>(
    subscribeChoice,
    readChoice,
    getServerSnapshot,
  );

  if (!GA_ID || choice === SERVER) return null;
  if (choice === "granted") return <GoogleAnalytics id={GA_ID} />;
  if (choice === "denied") return null;
  return <CookieBanner />;
}

function GoogleAnalytics({ id }: { id: string }) {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  );
}

const BOTAO =
  "inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center px-6 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:flex-none";

function CookieBanner() {
  return (
    <section
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[9500] border-t border-white/10 bg-black/90 text-white backdrop-blur-md pb-[env(safe-area-inset-bottom)]"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-8">
        <p className="text-sm font-light leading-relaxed text-white/80">
          Usamos cookies de análise (Google Analytics) para entender como o site é usado e melhorá-lo.
          Nada é coletado se você recusar.{" "}
          <Link href="/politica-de-privacidade" className="font-medium text-white underline underline-offset-4">
            Política de privacidade
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => saveChoice("denied")}
            className={`${BOTAO} border border-white/30 text-white hover:border-white hover:bg-white/10`}
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={() => saveChoice("granted")}
            className={`${BOTAO} bg-white text-black hover:bg-brand-red hover:text-white`}
          >
            Aceitar
          </button>
        </div>
      </div>
    </section>
  );
}
