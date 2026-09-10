import { siteConfig } from "@/lib/siteConfig";
import { productLines } from "@/lib/productLines";
import { natalSections } from "@/lib/natalCatalog";

/**
 * `/llms.txt` — índice curto do site no formato llmstxt.org, pensado para
 * modelos de linguagem e crawlers de IA que precisam entender rapidamente o
 * que a 3G Iluminação faz e onde está cada conteúdo, sem executar o JS das
 * páginas.
 *
 * Gerado a partir das mesmas fontes de dados da navegação (productLines e
 * natalCatalog), então novas linhas ou categorias entram aqui sozinhas.
 * A versão com especificações completas fica em `/llms-full.txt`.
 */

// Prerenderizado no build, como sitemap.xml e robots.txt — o conteúdo só
// muda quando os dados do catálogo mudam.
export const dynamic = "force-static";

const url = (path: string) => `${siteConfig.url}${path}`;

function buildLlmsTxt(): string {
  const lines: string[] = [
    "# Grupo 3G",
    "",
    `> ${siteConfig.description}`,
    "",
    "Indústria e importadora cearense de iluminação LED, pioneira no estado na importação de tecnologia LED há mais de 30 anos. O Grupo 3G reúne duas marcas de iluminação — 3G e EBRON — além da linha completa de decoração natalina.",
    "",
    "- Sede: Rua Senador Almino, 180 — Praia de Iracema, Fortaleza/CE, Brasil",
    "- Telefone / WhatsApp: +55 85 98655-9388",
    "- Idioma do site: português do Brasil (pt-BR)",
    "",
    "## Marcas do grupo",
    "",
    "O grupo tem duas marcas de iluminação: 3G e EBRON. A linha de decoração natalina pertence à marca 3G, mas fica em área própria do site, separada dos produtos de iluminação técnica, para não confundir os dois públicos.",
    "",
    `- [Grupo 3G](${url("/")}): página institucional do grupo, com as três portas de entrada (Natal, 3G e EBRON).`,
    `- [3G Iluminação](${url("/3g")}): marca de iluminação pública, industrial e comercial — refletores modulares, luminárias solares autônomas e luminárias homologadas.`,
    `- [EBRON](${url("/ebron")}): marca de iluminação pública urbana com foco em custo-benefício — linhas EBRON e EBRON PRO.`,
    `- [Natal 3G](${url("/natal")}): linha de decoração natalina da marca 3G, apresentada em área separada da linha técnica.`,
    "",
    "## Linhas da marca 3G",
    "",
  ];

  for (const line of productLines.filter((l) => l.brand === "3g")) {
    lines.push(`- [${line.name}](${url(line.path)}): ${line.summary}`);
  }

  lines.push("", "## Linhas da marca EBRON", "");

  for (const line of productLines.filter((l) => l.brand === "ebron")) {
    lines.push(`- [${line.name}](${url(line.path)}): ${line.summary}`);
  }

  lines.push(
    "",
    "## Coleção de Natal (linha da marca 3G)",
    "",
    "Produtos da marca 3G, mantidos em seção própria por serem de decoração sazonal, não de iluminação técnica.",
    "",
  );
  lines.push(
    `- [Catálogo de Natal](${url("/natal")}): visão geral dos cinco grupos da linha natalina.`,
  );

  for (const section of natalSections) {
    lines.push(
      `- [${section.name}](${url(`/natal/${section.slug}`)}): ${section.blurb}`,
    );
  }

  lines.push(
    "",
    "## Institucional",
    "",
    `- [Sobre a 3G Iluminação](${url("/sobre")}): história da empresa, pioneirismo em LED no Ceará e posicionamento em eficiência energética.`,
    "",
    "## Opcional",
    "",
    `- [llms-full.txt](${url("/llms-full.txt")}): especificações técnicas completas, códigos de catálogo, potências e fluxo luminoso de cada modelo.`,
    `- [sitemap.xml](${url("/sitemap.xml")}): lista completa de URLs indexáveis.`,
    "",
  );

  return lines.join("\n");
}

export function GET(): Response {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
