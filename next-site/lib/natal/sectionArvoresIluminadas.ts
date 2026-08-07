import { SWATCH, type NatalCategory } from "./types";

/**
 * Grupo "Árvores Iluminadas".
 * Subcategorias: Árvores (estruturas monumentais + Rena 3D) e Mini Árvores.
 */
export const arvoresIluminadasCategories: NatalCategory[] = [
  {
    slug: "arvores",
    name: "Árvores",
    icon: "🌟",
    photo: "/natal/app-arvores-gigantes-figuras.jpg",
    video: "/natal/videos/arvore.mp4",
    mediaBg: "white",
    whatIs:
      "Estruturas monumentais de LED: árvores de 2,5m a 8,6m, moinho giratório e rena 3D em tamanho real.",
    whyThis:
      "É a peça central do projeto — o ponto que as pessoas fotografam. Chega em estrutura própria, sem precisar de árvore natural nem de fachada para apoiar.",
    applications: [
      "Praça central e calçadão",
      "Entrada de shopping e hipermercado",
      "Condomínio e resort",
      "Evento corporativo e feira",
    ],
    installSteps: [
      "Confirme o diâmetro da base e o vão livre disponível",
      "Monte a estrutura no solo e fixe a base com contrapeso ou chumbador",
      "Suba os módulos e conecte a fiação por seção",
      "Ligue no ponto de energia 220V dimensionado para a carga",
    ],
    products: [
      {
        name: "Árvore de LED — 2,5m",
        image: "/natal/arvore-25m.png",
        description:
          "Árvore de 2,5m de altura e 1,4m de diâmetro, com 3.120 LEDs.",
        specs: [
          { label: "Altura", value: "2,5m" },
          { label: "Diâmetro", value: "1,4m" },
          { label: "LEDs", value: "3.120 LEDs" },
        ],
        variants: [
          { code: "51027", ledColor: "Multicolorido", swatch: SWATCH["Multicolorido"] },
        ],
      },
      {
        name: "Árvore de LED — 5m",
        image: "/natal/arvore-gigante-rosa.png",
        description:
          "Árvore de 5m de altura e 2,3m de diâmetro, com 8.880 LEDs.",
        specs: [
          { label: "Altura", value: "5m" },
          { label: "Diâmetro", value: "2,3m" },
          { label: "LEDs", value: "8.880 LEDs" },
        ],
        variants: [
          { code: "51028", ledColor: "Multicolorido", swatch: SWATCH["Multicolorido"] },
        ],
      },
      {
        name: "Árvore de LED — 5,6m",
        image: "/natal/arvore-56m.png",
        description:
          "Árvore de 5,6m de altura e 4,2m de diâmetro, com 7.560 LEDs.",
        specs: [
          { label: "Altura", value: "5,6m" },
          { label: "Diâmetro", value: "4,2m" },
          { label: "LEDs", value: "7.560 LEDs" },
        ],
        variants: [
          { code: "51029", ledColor: "Multicolorido", swatch: SWATCH["Multicolorido"] },
        ],
      },
      {
        name: "Árvore de LED — 8,6m",
        image: "/natal/arvore-86m.png",
        description:
          "A maior da linha: 8,6m de altura, 4,2m de diâmetro e 8.040 LEDs.",
        specs: [
          { label: "Altura", value: "8,6m" },
          { label: "Diâmetro", value: "4,2m" },
          { label: "LEDs", value: "8.040 LEDs" },
        ],
        variants: [
          { code: "51030", ledColor: "Multicolorido", swatch: SWATCH["Multicolorido"] },
        ],
      },
      {
        name: "Moinho LED com Controle — 5m",
        image: "/natal/arvore-moinho.png",
        description:
          "Estrutura de 5m em formato de moinho, com 3.120 LEDs e controle de efeitos.",
        specs: [
          { label: "Altura", value: "5m" },
          { label: "Diâmetro", value: "210cm" },
          { label: "LEDs", value: "3.120 LEDs" },
          { label: "Controle", value: "Com controle de efeitos" },
        ],
        variants: [
          { code: "51031", ledColor: "Multicolorido", swatch: SWATCH["Multicolorido"] },
        ],
      },
      {
        name: "Rena 3D",
        image: "/natal/rena-3d.png",
        description:
          "Rena com trenó em armação 3D iluminada, de 4,2m de largura por 1,6m de altura.",
        specs: [
          { label: "Largura", value: "4,2m" },
          { label: "Altura", value: "1,6m" },
        ],
        variants: [
          { code: "51072", ledColor: "Branco Quente", swatch: SWATCH["Branco Quente"] },
        ],
      },
    ],
    commercial:
      "Produto sob projeto: informe altura desejada, local de instalação e ponto de energia disponível para receber o orçamento com frete e montagem.",
  },
  {
    slug: "mini-arvores",
    name: "Mini Árvores",
    icon: "🎄",
    photo: "/natal/app-mini-arvores.jpg",
    whatIs:
      "Árvore pronta, já montada e iluminada, com decoração de bolinhas — só tirar da caixa e ligar.",
    whyThis:
      "Não precisa de árvore, nem de cordão, nem de enfeite: o produto inteiro chega montado. Resolve mesa, recepção e vitrine em um passo.",
    applications: [
      "Mesa de recepção e balcão",
      "Vitrine e provador de loja",
      "Hall de escritório e consultório",
      "Canto de sala em apartamento pequeno",
    ],
    installSteps: [
      "Escolha a altura conforme o espaço: 50cm ou 1,8m",
      "Abra os galhos e ajuste o formato",
      "Posicione perto de uma tomada",
      "Ligue na tomada 220V",
    ],
    products: [
      {
        name: "Árvore LED com Decoração de Bolinhas — 50cm",
        image: "/natal/mini-arvore-50.png",
        description:
          "Mini árvore de mesa com 20 LEDs, pronta para usar.",
        specs: [
          { label: "Altura", value: "50cm" },
          { label: "LEDs", value: "20 LEDs" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
          { label: "Extras", value: "Plugue e drive" },
        ],
        variants: [
          { code: "50698", ledColor: "Branco Quente", swatch: SWATCH["Branco Quente"] },
        ],
      },
      {
        name: "Árvore LED com Decoração de Bolinhas — 1,8m",
        image: "/natal/mini-arvore-18.png",
        description:
          "Árvore de chão com 144 LEDs, para hall, recepção e sala.",
        specs: [
          { label: "Altura", value: "1,8m" },
          { label: "LEDs", value: "144 LEDs" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
          { label: "Extras", value: "Plugue e drive" },
        ],
        variants: [
          { code: "50690", ledColor: "Branco Quente", swatch: SWATCH["Branco Quente"] },
        ],
      },
    ],
    commercial:
      "Venda por unidade. Solicite orçamento por quantidade para lojas e redes.",
  },
];
