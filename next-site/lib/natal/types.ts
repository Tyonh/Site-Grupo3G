/**
 * Tipos e paleta compartilhados do catálogo natalino do Grupo 3G.
 *
 * A hierarquia espelha o "Catálogo Natalino 2026":
 * seção (capítulo do catálogo) → categoria (subcategoria do índice) → produto.
 */

export interface NatalVariant {
  code: string;
  ledColor: string;
  wireColor?: string;
  /** Cor aproximada para o swatch visual (hex) */
  swatch: string;
}

export interface NatalSpec {
  label: string;
  value: string;
  /** Explicação em linguagem simples da sigla/dado técnico */
  plain?: string;
}

export interface NatalProductVideo {
  code: string;
  color: string;
  swatch: string;
  /** Vídeo do produto na cor (em /public/natal/videos) */
  src: string;
}

export interface NatalProductImage {
  code: string;
  color: string;
  swatch: string;
  /** Foto do produto na cor (em /public/natal) */
  src: string;
}

export interface NatalProduct {
  name: string;
  /** Imagem do produto extraída do catálogo (em /public/natal) */
  image?: string;
  /** Vídeos por cor — habilita o showcase com troca de cor */
  videos?: NatalProductVideo[];
  /** Fotos por cor — showcase com troca de cor sem vídeo */
  images?: NatalProductImage[];
  description: string;
  specs: NatalSpec[];
  variants: NatalVariant[];
}

export interface NatalCategory {
  slug: string;
  name: string;
  /** Emoji decorativo de apoio */
  icon: string;
  /** Foto de ambiente/aplicação da categoria (em /public/natal) — usada quando não há vídeo */
  photo?: string;
  /**
   * Vídeo do produto da categoria (em /public/natal/videos), com o fundo
   * exportado sólido na cor indicada por `mediaBg` — mesmo padrão dos
   * vídeos de produto, pra se fundir com o painel. Tem prioridade sobre `photo`.
   */
  video?: string;
  /**
   * Cor de fundo do painel quando `video` está definido (o vídeo já nasce
   * nessa cor). Preto é o padrão da seção; branco é usado quando o vídeo
   * enviado veio com fundo branco. Ignorado se não houver `video`.
   */
  mediaBg?: "black" | "white";
  /**
   * "left"/"right" travam o vídeo naquele lado do painel (contido, sem cobrir
   * o painel inteiro) e o texto no lado oposto. "right" usa uma mídia menor
   * que "left". "center" (padrão) mantém o vídeo full-bleed.
   */
  mediaAlign?: "center" | "left" | "right";
  /** Camada 1 — o que é, uma frase sem jargão */
  whatIs: string;
  /** Camada 2 — por que escolher esse e não o vizinho */
  whyThis: string;
  /** Camada 3 — onde aplicar (4-6 cenários reais) */
  applications: string[];
  /** Camada 4 — como instalar, passo a passo curto */
  installSteps: string[];
  /** Produtos com ficha técnica e variações */
  products: NatalProduct[];
  /** Camada final — condições comerciais */
  commercial: string;
}

/**
 * Grupo de categorias exibido na home como um ScrollScrubPanel — é o nível
 * que aparece no menu principal do Natal. Cada grupo tem sua própria página
 * (`/natal/[grupo]`) que lista as subcategorias (`categories`) com os
 * produtos de cada uma, no mesmo padrão de bloco usado antes por categoria.
 */
export interface NatalSection {
  slug: string;
  name: string;
  /** Emoji decorativo de apoio */
  icon: string;
  /** Foto de ambiente do grupo (em /public/natal) — usada quando não há vídeo */
  photo?: string;
  /** Vídeo do grupo (em /public/natal/videos), mesmo padrão do vídeo de categoria */
  video?: string;
  /** Cor de fundo do painel quando `video` está definido */
  mediaBg?: "black" | "white";
  /**
   * "left"/"right" travam o vídeo naquele lado do painel (contido, sem cobrir
   * o painel inteiro) e o texto no lado oposto. "right" usa uma mídia menor
   * que "left". "center" (padrão) mantém o vídeo full-bleed.
   */
  mediaAlign?: "center" | "left" | "right";
  /** Chamada curta do grupo, usada no painel da home e no hero da página do grupo */
  blurb: string;
  /** Subcategorias do grupo, cada uma com sua ficha completa de produtos */
  categories: NatalCategory[];
}

export const SWATCH: Record<string, string> = {
  Branco: "#f8fafc",
  "Branco Quente": "#ffd9a0",
  "Branco Neutro": "#f1f0e8",
  Multicolorido: "#d33f55",
  Azul: "#2563eb",
  Vermelho: "#a62024",
  Verde: "#386d24",
  "Âmbar": "#ffbf00",
  Dourado: "#e3b84e",
  Amarelo: "#e3b84e",
  Roxo: "#7c3aed",
  Rosa: "#ec4899",
  "Aquamarine Azul": "#22d3ee",
  "Branco e verde": "#9ccc9c",
};

export function swatchFor(color: string): string {
  return SWATCH[color] ?? "#e3b84e";
}
