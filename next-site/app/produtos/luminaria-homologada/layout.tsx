import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { buildProductJsonLd } from "@/lib/productJsonLd";

const jsonLd = buildProductJsonLd({
  path: "/produtos/luminaria-homologada",
  name: "Luminária Homologada",
  description:
    "Luminária pública homologada, com base de sete pinos para telegestão.",
  specs: [
    { name: "Eficácia luminosa", value: "160 lm/W" },
    { name: "Grau de proteção", value: "IP66 / IK08" },
    { name: "Proteção contra surtos", value: "10Kv / 5Ka" },
    { name: "Base para telegestão", value: "Sete pinos NBR IEC 61610" },
  ],
});

export const metadata: Metadata = {
  title: "Luminária Homologada",
  description:
    "Luminária pública homologada com 160 lm/W, IP66/IK08, proteção contra surtos de 10Kv/5Ka e base de sete pinos NBR IEC 61610 para telegestão.",
  alternates: { canonical: "/produtos/luminaria-homologada" },
};

export default function LuminariaHomologadaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
