import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { buildProductJsonLd } from "@/lib/productJsonLd";

const jsonLd = buildProductJsonLd({
  path: "/produtos/luminaria-solar",
  name: "Luminária Solar All-in-One",
  description:
    "Luminária solar all-in-one autônoma para iluminação pública, com painel, bateria e LED integrados em um único corpo de alta durabilidade.",
  specs: [
    { name: "Alimentação", value: "Solar, autônoma" },
    { name: "Construção", value: "Painel, bateria e LED integrados em um único corpo" },
  ],
});

export const metadata: Metadata = {
  title: "Luminária Solar All-in-One",
  description:
    "Luminária solar all-in-one autônoma para iluminação pública, com painel, bateria e LED integrados em um único corpo de alta durabilidade.",
  alternates: { canonical: "/produtos/luminaria-solar" },
};

export default function LuminariaSolarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
