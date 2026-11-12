import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { buildProductJsonLd } from "@/lib/productJsonLd";

const jsonLd = buildProductJsonLd({
  path: "/produtos/ebron-pro",
  name: "Luminária EBRON PRO",
  description:
    "Luminária EBRON PRO 2026 para iluminação pública, com base para relé embutida.",
  brand: { name: "EBRON", path: "/ebron" },
  specs: [
    { name: "Eficácia luminosa", value: "130 lm/W" },
    { name: "Ângulo de projeção", value: "até 150°" },
    { name: "Grau de proteção", value: "IP66" },
    { name: "IRC", value: "≥80" },
    { name: "Corpo", value: "Alumínio + policarbonato" },
    { name: "Base para relé", value: "Embutida" },
  ],
});

export const metadata: Metadata = {
  title: "Luminária EBRON PRO",
  description:
    "Luminária EBRON PRO 2026: eficácia luminosa de 130 lm/W, IRC ≥80, corpo em alumínio + policarbonato, base para relé embutida, IP66 e ângulo de projeção de até 150°.",
  alternates: { canonical: "/produtos/ebron-pro" },
  openGraph: {
    type: "website",
    title: "Luminária EBRON PRO",
    description:
      "Luminária EBRON PRO 2026: eficácia luminosa de 130 lm/W, IRC ≥80, corpo em alumínio + policarbonato, base para relé embutida, IP66 e ângulo de projeção de até 150°.",
    url: "/produtos/ebron-pro",
    images: [{ url: "/og/og-ebron.jpg", width: 1200, height: 630, alt: "Luminária EBRON PRO" }],
  },
  twitter: { card: "summary_large_image", images: ["/og/og-ebron.jpg"] },
};

export default function EbronProLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
