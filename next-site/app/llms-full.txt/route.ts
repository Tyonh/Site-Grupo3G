import { siteConfig } from "@/lib/siteConfig";
import { productLines, type ProductLine } from "@/lib/productLines";
import { natalSections } from "@/lib/natalCatalog";

/**
 * `/llms-full.txt` — versão estendida do índice `/llms.txt`, com as
 * especificações técnicas, os códigos de catálogo e as aplicações de cada
 * linha em texto puro.
 *
 * Existe porque as especificações moram no JSX das páginas de produto: um
 * crawler que não executa JavaScript não as alcança. Aqui elas ficam
 * disponíveis de forma direta e estável.
 */

export const dynamic = "force-static";

const url = (path: string) => `${siteConfig.url}${path}`;

/** Render de uma linha de produto — compartilhado pelos blocos das duas marcas. */
function pushProductLine(lines: string[], line: ProductLine): void {
  lines.push(
    `### ${line.name}`,
    "",
    `URL: ${url(line.path)}`,
    "",
    line.summary,
    "",
    "Especificações:",
    "",
  );

  for (const spec of line.specs) {
    lines.push(`- ${spec}`);
  }
  lines.push("");

  if (line.models?.length) {
    lines.push("Modelos disponíveis:", "");
    lines.push("| Código | Potência | Fluxo luminoso |");
    lines.push("| --- | --- | --- |");
    for (const model of line.models) {
      lines.push(`| ${model.code} | ${model.power} | ${model.flux} |`);
    }
    lines.push("");
  }

  if (line.applications?.length) {
    lines.push(`Aplicações: ${line.applications.join(", ")}.`, "");
  }
}

function buildLlmsFullTxt(): string {
  const lines: string[] = [
    "# Grupo 3G — catálogo completo",
    "",
    `> ${siteConfig.description}`,
    "",
    "## Sobre a empresa",
    "",
    "O Grupo 3G é uma indústria e importadora cearense de iluminação LED, pioneira no Ceará na importação de tecnologia LED, com mais de 30 anos de atuação. Seus produtos são aplicados em iluminação pública, industrial e decorativa, com foco em eficiência energética — as soluções LED do grupo reduzem em até 50% o consumo de energia em relação às tecnologias que substituem.",
    "",
    "- Sede: Rua Senador Almino, 180 — Praia de Iracema, Fortaleza/CE, Brasil",
    "- Telefone / WhatsApp: +55 85 98655-9388",
    `- Site: ${siteConfig.url}`,
    "",
    "## Estrutura de marcas",
    "",
    "O grupo tem duas marcas de iluminação: 3G e EBRON. A linha de decoração natalina pertence à marca 3G, mas é apresentada em área própria do site, separada da linha de iluminação técnica, porque atende a um público e a um ciclo de compra diferentes.",
    "",
    `- 3G Iluminação — iluminação pública, industrial e comercial: ${url("/3g")}`,
    `- EBRON — iluminação pública urbana, foco em custo-benefício: ${url("/ebron")}`,
    `- Natal 3G — decoração natalina da marca 3G, em seção separada: ${url("/natal")}`,
    "",
    "## Marca 3G — iluminação pública, industrial e comercial",
    "",
    `URL: ${url("/3g")}`,
    "",
    "Marca principal do grupo, com refletores modulares, luminárias solares autônomas e luminárias homologadas para concessionárias.",
    "",
  ];

  for (const line of productLines.filter((l) => l.brand === "3g")) {
    pushProductLine(lines, line);
  }

  lines.push(
    "## Marca EBRON — iluminação pública urbana",
    "",
    `URL: ${url("/ebron")}`,
    "",
    "Marca do Grupo 3G voltada à iluminação pública urbana com o melhor custo-benefício da linha: corpo em alumínio, alta eficácia luminosa e proteção IP66.",
    "",
  );

  for (const line of productLines.filter((l) => l.brand === "ebron")) {
    pushProductLine(lines, line);
  }

  lines.push(
    "## Coleção de Natal — linha da marca 3G",
    "",
    `URL: ${url("/natal")}`,
    "",
    "Linha completa de decoração natalina, organizada em cinco grupos. Cada grupo tem página própria com suas subcategorias e produtos. São produtos da marca 3G, mantidos em seção separada da linha de iluminação técnica por serem decoração sazonal.",
    "",
  );

  for (const section of natalSections) {
    lines.push(
      `### ${section.name}`,
      "",
      `URL: ${url(`/natal/${section.slug}`)}`,
      "",
      section.blurb,
      "",
    );

    const categoryNames = section.categories.map((category) => category.name);
    if (categoryNames.length > 0) {
      lines.push(`Subcategorias: ${categoryNames.join(", ")}.`, "");
    }
  }

  lines.push(
    "## Institucional",
    "",
    `- Sobre a empresa: ${url("/sobre")}`,
    `- Página institucional do Grupo 3G: ${url("/")}`,
    "",
  );

  return lines.join("\n");
}

export function GET(): Response {
  return new Response(buildLlmsFullTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
