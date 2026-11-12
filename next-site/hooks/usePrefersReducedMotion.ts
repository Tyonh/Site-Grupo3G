"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/**
 * `true` quando o sistema pede movimento reduzido. Usa useSyncExternalStore em
 * vez de `useState` + `useEffect`: no servidor devolve `false` (o mesmo
 * primeiro render do cliente, sem divergência de hidratação) e acompanha a
 * mudança da preferência ao vivo.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
