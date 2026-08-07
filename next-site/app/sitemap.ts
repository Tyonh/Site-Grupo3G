import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { natalSections } from "@/lib/natalCatalog";

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

  const natalRoutes = natalSections.map((section) => ({
    url: `${siteConfig.url}/natal/${section.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...natalRoutes];
}
