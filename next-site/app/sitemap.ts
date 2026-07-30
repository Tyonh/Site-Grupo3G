import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { natalCategories } from "@/lib/natalCatalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/sobre",
    "/produtos/modulo",
    "/produtos/ebron",
    "/produtos/luminaria-homologada",
    "/produtos/luminaria-solar",
    "/natal",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));

  const natalRoutes = natalCategories.map((category) => ({
    url: `${siteConfig.url}/natal/${category.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...natalRoutes];
}
