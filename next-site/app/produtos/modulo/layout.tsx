import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refletor Modular LED",
  description:
    "Refletor modular LED de alta performance com alumínio injetado, IP66, 150 lm/W e potências escaláveis de 100W a 1200W para iluminação pública e industrial.",
  alternates: { canonical: "/produtos/modulo" },
};

export default function ModuloLayout({ children }: { children: React.ReactNode }) {
  return children;
}
