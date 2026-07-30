import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre o Grupo 3G",
  description:
    "Conheça a história, os valores e a linha do tempo do Grupo 3G, fabricante de soluções de iluminação pública, industrial e decorativa.",
  alternates: { canonical: "/sobre" },
};

export default function SobreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
