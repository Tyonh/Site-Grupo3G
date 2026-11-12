import { siteConfig } from "@/lib/siteConfig";

/**
 * JSON-LD `Product` das páginas /produtos/*. Só entram fatos que já estão
 * publicados na própria página (título, descrição, especificações): nada de
 * preço, avaliação ou estoque, que o site não publica.
 */

export interface ProductSpec {
  name: string;
  value: string;
}

export interface ProductJsonLdInput {
  /** Caminho da página, ex.: "/produtos/ebron" */
  path: string;
  name: string;
  description: string;
  /** Marca do produto; omitida quando ainda não está definida pelo grupo. */
  brand?: { name: string; path: string };
  specs: ProductSpec[];
}

export function buildProductJsonLd(input: ProductJsonLdInput): Record<string, unknown> {
  const url = `${siteConfig.url}${input.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: siteConfig.name, item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: input.name, item: url },
        ],
      },
      {
        "@type": "Product",
        "@id": `${url}#product`,
        url,
        name: input.name,
        description: input.description,
        category: "Iluminação pública e industrial",
        ...(input.brand
          ? {
              brand: {
                "@type": "Brand",
                name: input.brand.name,
                url: `${siteConfig.url}${input.brand.path}`,
              },
            }
          : {}),
        manufacturer: { "@id": `${siteConfig.url}/#organization` },
        additionalProperty: input.specs.map((s) => ({
          "@type": "PropertyValue",
          name: s.name,
          value: s.value,
        })),
      },
    ],
  };
}
