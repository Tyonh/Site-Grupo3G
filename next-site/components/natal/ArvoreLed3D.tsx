"use client";

import dynamic from "next/dynamic";

// A cena 3D (three.js) só carrega no navegador e depois do resto da página.
const Scene = dynamic(() => import("@/components/3d/ArvoreLedScene"), { ssr: false });

/** Árvore de LED em 3D como elemento decorativo de fundo. O tamanho e a posição vêm do `className`. */
export default function ArvoreLed3D({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={className}>
      <Scene />
    </div>
  );
}
