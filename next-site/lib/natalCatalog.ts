/**
 * Catálogo natalino do Grupo 3G — organizado em 5 grupos de navegação.
 * Cada grupo vira um painel na home (`/natal`) e tem sua própria página
 * (`/natal/[categoria]`) com as subcategorias e produtos dele.
 *
 * Este arquivo é só a montagem: os dados de cada grupo ficam em
 * `lib/natal/section*.ts`.
 */

export type {
  NatalCategory,
  NatalProduct,
  NatalProductVideo,
  NatalSection,
  NatalSpec,
  NatalVariant,
} from "./natal/types";
export { swatchFor } from "./natal/types";

import type { NatalCategory, NatalSection } from "./natal/types";
import { cordoesLedCategories } from "./natal/sectionCordoesLed";
import { mangueirasFitasCategories } from "./natal/sectionMangueirasFitas";
import { enfeites3gCategories } from "./natal/sectionEnfeites3g";
import { decoracaoUrbanaCategories } from "./natal/sectionDecoracaoUrbana";
import { arvoresIluminadasCategories } from "./natal/sectionArvoresIluminadas";

/** Os 5 grupos exibidos na home — cada um com seu ScrollScrubPanel. */
export const natalSections: NatalSection[] = [
  {
    slug: "cordoes-de-led",
    name: "Cordões de LED",
    icon: "✨",
    video: "/natal/videos/cordoes-entrada-branco.mp4",
    mediaBg: "white",
    mediaAlign: "left",
    blurb:
      "A base de qualquer projeto: cordão com drive, strobo, cordão LED, rede, cobre e decorativo.",
    categories: cordoesLedCategories,
  },
  {
    slug: "mangueiras-e-fitas",
    name: "Mangueiras & Fitas",
    icon: "📏",
    photo: "/natal/app-mangueira-led.jpg",
    blurb: "Luz contínua para contornos: mangueira LED e fita LED (Neon e SMD).",
    categories: mangueirasFitasCategories,
  },
  {
    slug: "enfeites-3g",
    name: "Enfeites 3G",
    icon: "🎀",
    photo: "/natal/app-sputink-meteoro-strobe.jpg",
    blurb: "Meteoro, strobe, bola, sprint e festões — o acabamento da decoração.",
    categories: enfeites3gCategories,
  },
  {
    slug: "decoracao-urbana",
    name: "Decoração Urbana",
    icon: "🎅",
    photo: "/natal/app-inflaveis.jpg",
    blurb: "Infláveis e figuras luminosas para rua, praça e fachada pública.",
    categories: decoracaoUrbanaCategories,
  },
  {
    slug: "arvores-iluminadas",
    name: "Árvores Iluminadas",
    icon: "🌟",
    video: "/natal/videos/arvore.mp4",
    mediaBg: "white",
    blurb: "Das mini árvores de mesa às estruturas monumentais de até 8,6m.",
    categories: arvoresIluminadasCategories,
  },
];

/** Lista plana de todas as subcategorias — usada pelo sitemap. */
export const natalCategories: NatalCategory[] = natalSections.flatMap(
  (section) => section.categories,
);

export function getCategoryBySlug(slug: string): NatalCategory | undefined {
  return natalCategories.find((category) => category.slug === slug);
}

/** Grupo pelo slug — usado pela página `/natal/[categoria]`. */
export function getSectionBySlug(slug: string): NatalSection | undefined {
  return natalSections.find((section) => section.slug === slug);
}
