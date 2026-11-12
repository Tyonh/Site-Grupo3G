import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { buildProductJsonLd } from "@/lib/productJsonLd";

const jsonLd = buildProductJsonLd({
  path: "/produtos/ebron",
  name: "Luminária EBRON",
  description:
    "Luminária EBRON 2024 para iluminação urbana, com corpo slim em alumínio.",
  brand: { name: "EBRON", path: "/ebron" },
  specs: [
    { name: "Eficácia luminosa", value: "100 lm/W" },
    { name: "Ângulo de projeção", value: "120°" },
    { name: "Grau de proteção", value: "IP66" },
    { name: "IRC", value: "≥80" },
    { name: "Corpo", value: "Alumínio" },
  ],
});

export const metadata: Metadata = {
  title: "Luminária Ebron",
  description:
    "Luminária EBRON 2024: eficácia luminosa de 100 lm/W, corpo slim em alumínio, ângulo de projeção de 120°, IP66 e IRC ≥80 para iluminação urbana.",
  alternates: { canonical: "/produtos/ebron" },
  openGraph: {
    type: "website",
    title: "Luminária Ebron",
    description:
      "Luminária EBRON 2024: eficácia luminosa de 100 lm/W, corpo slim em alumínio, ângulo de projeção de 120°, IP66 e IRC ≥80 para iluminação urbana.",
    url: "/produtos/ebron",
    images: [{ url: "/og/og-ebron.jpg", width: 1200, height: 630, alt: "Luminária EBRON" }],
  },
  twitter: { card: "summary_large_image", images: ["/og/og-ebron.jpg"] },
};

export default function EbronLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
