import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luminária Ebron",
  description:
    "Luminária EBRON 2024: eficácia luminosa de 100 lm/W, corpo slim em alumínio, ângulo de projeção de 120°, IP66 e IRC ≥80 para iluminação urbana.",
  alternates: { canonical: "/produtos/ebron" },
};

export default function EbronLayout({ children }: { children: React.ReactNode }) {
  return children;
}
