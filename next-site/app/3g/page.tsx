import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import ProductsSection from "@/components/ProductsSection";
import GallerySection from "@/components/GallerySection";
import VideoFeatureSection from "@/components/VideoFeatureSection";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/siteConfig";
import JsonLd from "@/components/JsonLd";

const brandJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteConfig.url}/3g#page`,
  url: `${siteConfig.url}/3g`,
  name: "3G Iluminação",
  description: siteConfig.description,
  inLanguage: "pt-BR",
  isPartOf: { "@id": `${siteConfig.url}/#website` },
  about: {
    "@type": "Brand",
    name: "3G Iluminação",
    url: `${siteConfig.url}/3g`,
    logo: `${siteConfig.url}/grupo-3g-logo.png`,
  },
};

export const metadata: Metadata = {
  // `absolute` ignora o template `%s — 3G Iluminação` do layout, senão o
  // nome da marca apareceria duas vezes no título da aba.
  title: { absolute: "3G Iluminação - Luz que Transforma" },
  // Própria desta marca: a home "/" usa a descrição geral do grupo, e as duas
  // não podem ser idênticas.
  description:
    "3G Iluminação, marca do Grupo 3G: refletor modular LED, luminária pública homologada e luminária solar all-in-one para iluminação pública e industrial.",
  alternates: { canonical: "/3g" },
};

export default function ThreeGHome() {
  return (
    <>
      <JsonLd data={brandJsonLd} />
      <Navbar />
      <main className="flex-1 w-full flex flex-col">
        <HeroSlider />
        <ProductsSection brand="3g" />
        <GallerySection />
        <VideoFeatureSection />
      </main>
      <Footer />
    </>
  );
}
