import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { natalSections } from "@/lib/natalCatalog";

// Sem `lastModified`: o projeto não rastreia data de alteração por página, e
// carimbar `new Date()` faria toda URL se declarar "modificada agora" a cada
// build. Um lastmod que é sempre hoje é pior que nenhum — buscadores aprendem
// a ignorar o sinal. Omitir é válido no protocolo de sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/3g",
    "/ebron",
    "/sobre",
    "/produtos/modulo",
    "/produtos/ebron",
    "/produtos/ebron-pro",
    "/produtos/luminaria-homologada",
    "/produtos/luminaria-solar",
    "/natal",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
  }));

  const natalRoutes = natalSections.map((section) => ({
    url: `${siteConfig.url}/natal/${section.slug}`,
  }));

  return [...staticRoutes, ...natalRoutes];
}
