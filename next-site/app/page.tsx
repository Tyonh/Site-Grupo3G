import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import ProductsSection from "@/components/ProductsSection";
import GallerySection from "@/components/GallerySection";
import VideoFeatureSection from "@/components/VideoFeatureSection";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Iluminação Pública, Industrial e Decorativa",
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full flex flex-col">
        <HeroSlider />
        <ProductsSection />
        <GallerySection />
        <VideoFeatureSection />
      </main>
      <Footer />
    </>
  );
}

