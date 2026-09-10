import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";

// Crawlers de backlink/SEO comercial: consomem banda e não geram tráfego
// qualificado para o site. Bloqueio explícito, não por wildcard.
const BLOCKED_CRAWLERS = [
  "AhrefsBot",
  "SemrushBot",
  "MJ12bot",
  "DotBot",
  "DataForSeoBot",
  "BLEXBot",
  "PetalBot",
] as const;

// Assistentes de IA e buscadores generativos. O grupo `*` já os liberaria,
// mas a permissão explícita tem dois efeitos reais:
//  1. `Google-Extended` e `Applebot-Extended` não são crawlers — são tokens
//     de controle. Citá-los é a única forma de declarar, de modo legível por
//     máquina, que o conteúdo pode ser usado por Gemini e Apple Intelligence.
//  2. Um `Disallow` futuro no grupo `*` não os atingiria por engano, já que
//     cada agente com grupo próprio ignora o `*` por completo.
const AI_CRAWLERS = [
  // OpenAI — treino, índice do ChatGPT Search e navegação disparada pelo usuário
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  // Google (Gemini / Vertex AI) e Apple Intelligence — tokens de opt-in
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  // Google Vertex AI — grounding de respostas com conteúdo do site
  "Google-CloudVertexBot",
  // Demais buscadores generativos
  "PerplexityBot",
  "Perplexity-User",
  "DuckAssistBot",
  "MistralAI-User",
  "Amazonbot",
  "meta-externalagent",
  "cohere-ai",
  "YouBot",
  // Common Crawl: não é um assistente, é o corpus público do qual boa parte
  // dos modelos e das ferramentas de busca deriva. Ficar de fora dele é o
  // jeito mais silencioso de sumir das respostas de IA.
  "CCBot",
  // Rastreadores de dataset/índice usados por assistentes e buscas verticais
  "AI2Bot",
  "Bytespider",
  "Diffbot",
  "Timpibot",
  "Webzio-Extended",
] as const;

// Rotas sem valor de busca. `/_next/` fica liberado de propósito: o Googlebot
// precisa dos chunks de JS/CSS e das imagens otimizadas para renderizar a página.
const DISALLOWED_PATHS = ["/api/", "/*.json$"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
      {
        // Um agente com grupo próprio não herda nada do grupo `*`, então as
        // exclusões precisam ser repetidas aqui.
        userAgent: [...AI_CRAWLERS],
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
      ...BLOCKED_CRAWLERS.map((userAgent) => ({
        userAgent,
        disallow: "/",
      })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
