import { siteConfig } from "@/lib/siteConfig";
import { natalSections } from "@/lib/natalCatalog";
import type { NatalProduct, NatalVariant } from "@/lib/natalCatalog";

/**
 * `/llms-natal.txt` — catálogo completo da linha de Natal em texto puro: cada
 * grupo, categoria e produto, com descrição, especificações e os códigos de
 * catálogo de cada cor ou tamanho (versão sem plugue e com plugue).
 *
 * Existe porque o catálogo do Natal tem dezenas de produtos e vive em
 * componentes React: um leitor de IA que não executa JavaScript não chega nele.
 * Fica separado de `/llms-full.txt` para o arquivo geral continuar curto — a IA
 * baixa este só quando a pergunta é sobre decoração natalina.
 *
 * Gerado do mesmo `natalSections` que desenha as páginas: produto novo, código
 * corrigido ou categoria removida entram aqui sozinhos no próximo build.
 */

export const dynamic = "force-static";

const url = (path: string) => `${siteConfig.url}${path}`;

// Data do build: como o arquivo é estático, é a data em que o catálogo foi
// publicado. Mostra à IA se o que ela leu está atualizado.
const BUILD_DATE = new Date().toISOString().slice(0, 10);

/** "Branco Quente (fio Amarelo) — código 51004; com plugue 51050" */
function describeVariant(variant: NatalVariant): string {
  const name = variant.label ?? variant.ledColor;
  const wire = variant.wireColor && !variant.label ? ` (fio ${variant.wireColor})` : "";
  const codes: string[] = [];
  if (variant.code) codes.push(`código ${variant.code}`);
  if (variant.plugCode) codes.push(`com plugue ${variant.plugCode}`);
  return codes.length > 0 ? `${name}${wire} — ${codes.join("; ")}` : `${name}${wire}`;
}

function pushProduct(lines: string[], product: NatalProduct): void {
  lines.push(`#### ${product.name}`, "", product.description, "");

  if (product.specs.length > 0) {
    lines.push("Especificações:", "");
    for (const spec of product.specs) {
      lines.push(`- ${spec.label}: ${spec.value}${spec.plain ? ` (${spec.plain})` : ""}`);
    }
    lines.push("");
  }

  if (product.variants.length > 0) {
    const title = product.optionsTitle ?? "Cores disponíveis";
    lines.push(`${title}:`, "");
    for (const variant of product.variants) {
      lines.push(`- ${describeVariant(variant)}`);
    }
    lines.push("");
  }
}

function buildLlmsNatalTxt(): string {
  const lines: string[] = [
    "# Natal 3G — catálogo completo de decoração natalina",
    "",
    `> Linha de decoração natalina da marca 3G, do Grupo 3G (Fortaleza/CE): cordões, mangueiras, fitas, enfeites, árvores e decoração urbana de LED. Atualizado em ${BUILD_DATE}.`,
    "",
    `Visão geral: ${url("/natal")}. Índice geral do site para IAs: ${url("/llms.txt")}.`,
    "",
    "Como ler: os códigos são os códigos oficiais de catálogo. Quando uma cor tem duas versões, o primeiro código é o da versão sem plugue e o segundo, \"com plugue\", é o da mesma cor com plugue. Produtos sem código listado ainda não têm código definido. Não há preços no site: o orçamento é feito pelo WhatsApp (+55 85 98655-9388).",
    "",
  ];

  for (const section of natalSections) {
    lines.push(`## ${section.name}`, "", `URL: ${url(`/natal/${section.slug}`)}`, "", section.blurb, "");

    for (const category of section.categories) {
      lines.push(`### ${category.name}`, "", category.whatIs, "");
      if (category.applications.length > 0) {
        lines.push(`Aplicações: ${category.applications.join("; ")}.`, "");
      }

      for (const product of category.products) {
        pushProduct(lines, product);
      }

      if (category.commercial) {
        lines.push(`Condições comerciais: ${category.commercial}`, "");
      }
    }
  }

  return lines.join("\n");
}

export function GET(): Response {
  return new Response(buildLlmsNatalTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
