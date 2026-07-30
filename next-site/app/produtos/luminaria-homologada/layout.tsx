import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luminária Homologada",
  description:
    "Luminária pública homologada com 160 lm/W, IP66/IK08, proteção contra surtos de 10Kv/5Ka e base de sete pinos NBR IEC 61610 para telegestão.",
  alternates: { canonical: "/produtos/luminaria-homologada" },
};

export default function LuminariaHomologadaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
