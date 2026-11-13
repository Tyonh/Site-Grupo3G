import type { MosaicTile } from "@/components/MosaicGallery";

/**
 * Mosaico de aplicações da home. `ratio` = largura/altura e define a largura
 * relativa do tile dentro da linha (todos da linha ficam com a mesma altura).
 * A mídia é cortada (object-cover) para caber na proporção escolhida.
 *
 * Só entra o material escolhido pela empresa: a pasta Desktop\mosaico e os
 * vídeos IMG_1502 / IMG_1503 (Downloads), convertidos para a web em
 * public/mosaico/. Onde há vídeo, o tile reproduz o próprio vídeo em loop; a
 * imagem (`image`) é só a capa até ele carregar.
 *
 * Ordem: o Natal abre o mosaico (primeira linha) por conta da época.
 */
const WIDE = 16 / 9;
const LANDSCAPE = 3 / 2;
const SQUARE = 1;
const PORTRAIT = 3 / 4;
const TALL = 9 / 16;

const CAMPOS = "Campos de futebol";
const PUBLICA = "Iluminação pública";
const NATAL = "Natal";

export const mosaicRows: MosaicTile[][] = [
  // Natal — primeira linha
  [
    {
      id: "story-igreja",
      ratio: TALL,
      image: "/mosaico/story-igreja.jpg",
      alt: "Fachada de igreja iluminada e árvore de Natal verde, com o texto: Iluminação que transforma grandes espaços em experiências",
      category: NATAL,
      title: "Fachada e árvore iluminadas",
      href: "/natal",
    },
    {
      id: "natal-mangueira",
      ratio: PORTRAIT,
      image: "/mosaico/natal-mangueira.jpg",
      alt: "",
      video: "/mosaico/natal-mangueira.mp4",
      category: NATAL,
      title: "Mangueira de LED",
      href: "/natal",
    },
    {
      id: "natal-cortina",
      ratio: PORTRAIT,
      image: "/mosaico/natal-cortina.jpg",
      alt: "",
      video: "/mosaico/natal-cortina.mp4",
      category: NATAL,
      title: "Cortina de LED",
      href: "/natal",
    },
    {
      id: "story-arvore-dourada",
      ratio: TALL,
      image: "/mosaico/story-arvore-dourada.jpg",
      alt: "Árvore de Natal dourada iluminada, com o texto: Quando a luz ganha forma, o Natal ganha vida",
      category: NATAL,
      title: "Árvore dourada",
      href: "/natal",
    },
  ],
  [
    {
      id: "clip-arco",
      ratio: WIDE,
      image: "/mosaico/clip-arco.jpg",
      alt: "",
      video: "/mosaico/clip-arco.mp4",
      category: PUBLICA,
      title: "Arco Nossa Senhora",
      href: "/3g",
    },
    {
      id: "campo-bairro",
      ratio: SQUARE,
      image: "/mosaico/campo-bairro.jpg",
      alt: "Vista aérea noturna de um campo de bairro iluminado entre as casas",
      category: CAMPOS,
      title: "Campo de bairro à noite",
      href: "/3g",
    },
    {
      id: "clip-campo-a",
      ratio: LANDSCAPE,
      image: "/mosaico/clip-campo-a.jpg",
      alt: "",
      video: "/mosaico/clip-campo-a.mp4",
      category: CAMPOS,
      title: "Campo em movimento",
      href: "/3g",
    },
  ],
  [
    {
      id: "clip-campo-b",
      ratio: WIDE,
      image: "/mosaico/clip-campo-b.jpg",
      alt: "",
      video: "/mosaico/clip-campo-b.mp4",
      category: CAMPOS,
      title: "Campo visto do alto",
      href: "/3g",
    },
    {
      id: "campo-grande",
      ratio: LANDSCAPE,
      image: "/mosaico/campo-grande.jpg",
      alt: "Vista aérea noturna de um campo de futebol iluminado",
      category: CAMPOS,
      title: "Campo iluminado",
      href: "/3g",
    },
    {
      id: "clip-campo-c",
      ratio: SQUARE,
      image: "/mosaico/clip-campo-c.jpg",
      alt: "",
      video: "/mosaico/clip-campo-c.mp4",
      category: CAMPOS,
      title: "Campo na cidade",
      href: "/3g",
    },
  ],
];
