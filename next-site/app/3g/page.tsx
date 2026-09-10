import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import ProductsSection from "@/components/ProductsSection";
import GallerySection from "@/components/GallerySection";
import VideoFeatureSection from "@/components/VideoFeatureSection";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  // `absolute` ignora o template `%s — 3G Iluminação` do layout, senão o
  // nome da marca apareceria duas vezes no título da aba.
  title: { absolute: "3G Iluminação - Luz que Transforma" },
  description: siteConfig.description,
  alternates: { canonical: "/3g" },
};

export default function ThreeGHome() {
  return (
    <>
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
