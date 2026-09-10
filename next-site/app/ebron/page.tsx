import type { Metadata } from "next";
import Link from "next/link";
import EbronNavbar from "@/components/ebron/EbronNavbar";
import EbronHeroSlider from "@/components/ebron/EbronHeroSlider";
import ProductsSection from "@/components/ProductsSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: { absolute: "EBRON — Iluminação Pública | Grupo 3G" },
  description:
    "EBRON, marca do Grupo 3G para iluminação pública: luminárias EBRON e EBRON PRO com alta eficácia luminosa, corpo em alumínio e proteção IP66.",
  alternates: { canonical: "/ebron" },
};

export default function EbronHome() {
  return (
    <>
      <EbronNavbar />
      <main className="flex-1 w-full flex flex-col bg-ebron-navy">
        <EbronHeroSlider />

        <ProductsSection brand="ebron" />

        {/* Ponte de volta pro Grupo 3G */}
        <section className="flex flex-col items-center gap-4 border-t border-white/10 px-6 py-16 text-center">
          <p className="text-sm font-light text-ebron-light/70">
            A EBRON é uma das marcas do Grupo 3G.
          </p>
          <Link
            href="/"
            className="text-xs font-bold uppercase tracking-widest text-ebron-blue-light hover:text-white"
          >
            ← Conhecer o Grupo 3G
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
