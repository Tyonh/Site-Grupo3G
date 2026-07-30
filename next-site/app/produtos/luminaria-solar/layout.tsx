import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luminária Solar All-in-One",
  description:
    "Luminária solar all-in-one autônoma para iluminação pública, com painel, bateria e LED integrados em um único corpo de alta durabilidade.",
  alternates: { canonical: "/produtos/luminaria-solar" },
};

export default function LuminariaSolarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
