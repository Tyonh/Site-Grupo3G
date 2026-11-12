"use client";

import { useSyncExternalStore } from "react";

const subscribe = (): (() => void) => () => {};

/**
 * `false` no servidor e no primeiro render da hidratação, `true` logo depois.
 * Serve para liberar animações de entrada só depois que a página hidratou, sem
 * o `useState(false)` + `useEffect(() => setX(true))` que gera render em cascata.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
