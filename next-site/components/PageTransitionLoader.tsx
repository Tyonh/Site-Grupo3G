"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThreeGLoaderMark from "@/components/ThreeGLoaderMark";

export default function PageTransitionLoader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [phase, setPhase] = useState<"loading" | "ready" | "leaving">("loading");
  const pendingPath = useRef<string | null>(null);

  useEffect(() => {
    if (!isLoading) return;

    // Only release after the destination commits, not a fixed time after clicking.
    if (pendingPath.current && pendingPath.current !== pathname) {
      const safety = window.setTimeout(() => setIsLoading(false), 15000);
      return () => window.clearTimeout(safety);
    }
    pendingPath.current = null;
    const timers: number[] = [];
    let frame = 0;
    const ready = () => {
      frame = requestAnimationFrame(() => {
        setPhase("ready");
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        timers.push(window.setTimeout(() => {
          setPhase("leaving");
          document.body.dataset.pageEntrance = "active";
        }, reduced ? 0 : 300));
        timers.push(window.setTimeout(() => {
          setIsLoading(false);
          delete document.body.dataset.pageEntrance;
        }, reduced ? 150 : 1150));
      });
    };
    if (document.readyState === "complete") ready();
    else window.addEventListener("load", ready, { once: true });
    return () => {
      cancelAnimationFrame(frame);
      timers.forEach(window.clearTimeout);
      window.removeEventListener("load", ready);
      delete document.body.dataset.pageEntrance;
    };
  }, [isLoading, pathname]);

  useEffect(() => {
    function handleNavigationClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;

      const destination = new URL(link.href, window.location.href);
      const isInternalNavigation =
        destination.origin === window.location.origin &&
        destination.pathname !== window.location.pathname;

      if (isInternalNavigation) {
        pendingPath.current = destination.pathname;
        setPhase("loading");
        setIsLoading(true);
      }
    }

    document.addEventListener("click", handleNavigationClick, true);
    return () => document.removeEventListener("click", handleNavigationClick, true);
  }, []);

  return isLoading ? <ThreeGLoaderMark label={phase === "loading" ? "Carregando página" : "Página pronta"} phase={phase} /> : null;
}
