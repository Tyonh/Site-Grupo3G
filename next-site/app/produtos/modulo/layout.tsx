import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { buildProductJsonLd } from "@/lib/productJsonLd";

const jsonLd = buildProductJsonLd({
  path: "/produtos/modulo",
  name: "Refletor Modular LED",
  description:
    "Refletor modular LED de alta performance para iluminação pública e industrial, com potências escaláveis.",
  specs: [
    { name: "Eficácia luminosa", value: "150 lm/W" },
    { name: "Potência", value: "100W a 1200W (escalável)" },
    { name: "Grau de proteção", value: "IP66" },
    { name: "Corpo", value: "Alumínio injetado" },
  ],
});

export const metadata: Metadata = {
  title: "Refletor Modular LED",
  description:
    "Refletor modular LED de alta performance com alumínio injetado, IP66, 150 lm/W e potências escaláveis de 100W a 1200W para iluminação pública e industrial.",
  alternates: { canonical: "/produtos/modulo" },
};

export default function ModuloLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
