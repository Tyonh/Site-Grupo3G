import { siteConfig } from "@/lib/siteConfig";
import type { NatalProduct, NatalSection, NatalVariant } from "./types";

/**
 * Dados estruturados (schema.org) de uma página de grupo do Natal.
 * Gerado do mesmo catálogo que desenha a página, então nunca diverge dela.
 *
 * Sem `offers`/preço de propósito: o site não publica preço (orçamento pelo
 * WhatsApp) e inventar um valor violaria as diretrizes do Google. O produto
 * continua válido para buscadores e IAs como entidade com nome, imagem,
 * marca e códigos (`sku`) por cor ou tamanho.
 */

const abs = (path: string): string =>
  path.startsWith("http") ? path : `${siteConfig.url}${path}`;

const variantName = (v: NatalVariant): string => v.label ?? v.ledColor;

function variantNodes(product: NatalProduct, v: NatalVariant): Record<string, unknown>[] {
  const name = `${product.name} — ${variantName(v)}`;
  const nodes: Record<string, unknown>[] = [];
  if (v.code) nodes.push({ "@type": "Product", name, sku: v.code, color: v.ledColor });
  if (v.plugCode) {
    nodes.push({
      "@type": "Product",
      name: `${name} (com plugue)`,
      sku: v.plugCode,
      color: v.ledColor,
    });
  }
  return nodes;
}

function productNode(
  product: NatalProduct,
  categoryName: string,
  fallbackImage: string | undefined,
): Record<string, unknown> {
  const image = product.image ?? fallbackImage;
  const variants = product.variants.flatMap((v) => variantNodes(product, v));
  return {
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: categoryName,
    ...(image ? { image: abs(image) } : {}),
    brand: { "@type": "Brand", name: "3G Iluminação" },
    manufacturer: { "@id": `${siteConfig.url}/#organization` },
    ...(variants.length > 0 ? { hasVariant: variants } : {}),
  };
}

export function buildNatalSectionJsonLd(section: NatalSection): Record<string, unknown> {
  const pageUrl = `${siteConfig.url}/natal/${section.slug}`;
  const products = section.categories.flatMap((cat) =>
    cat.products.map((p) => productNode(p, cat.name, cat.photo)),
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: siteConfig.name, item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Natal 3G", item: `${siteConfig.url}/natal` },
          { "@type": "ListItem", position: 3, name: section.name, item: pageUrl },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#page`,
        url: pageUrl,
        name: `${section.name} — Natal 3G`,
        description: section.blurb,
        inLanguage: "pt-BR",
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: products.length,
          itemListElement: products.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item,
          })),
        },
      },
    ],
  };
}
