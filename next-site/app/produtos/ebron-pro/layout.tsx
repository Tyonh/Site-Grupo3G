import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luminária EBRON PRO",
  description:
    "Luminária EBRON PRO 2026: eficácia luminosa de 130 lm/W, IRC ≥80, corpo em alumínio + policarbonato, base para relé embutida, IP66 e ângulo de projeção de até 150°.",
  alternates: { canonical: "/produtos/ebron-pro" },
};

export default function EbronProLayout({ children }: { children: React.ReactNode }) {
  return children;
}
