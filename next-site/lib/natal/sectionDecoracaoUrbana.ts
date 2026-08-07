import { SWATCH, type NatalCategory } from "./types";

/**
 * Grupo "Decoração Urbana".
 * Subcategorias: Infláveis e Figuras.
 */
export const decoracaoUrbanaCategories: NatalCategory[] = [
  {
    slug: "inflaveis",
    name: "Infláveis",
    icon: "🎅",
    photo: "/natal/app-inflaveis.jpg",
    whatIs:
      "Bonecos infláveis de 1,5m a 5m que sobem sozinhos com o motor incluso.",
    whyThis:
      "É o produto de impacto imediato: ocupa o jardim ou a calçada e é visto de longe. Desmonta e guarda em uma caixa pequena no fim da temporada.",
    applications: [
      "Jardim e calçada de casa",
      "Entrada de loja e estacionamento",
      "Praça e evento de rua",
      "Hall de condomínio",
    ],
    installSteps: [
      "Escolha um piso plano e livre de pontas",
      "Fixe as estacas ou o contrapeso da base",
      "Ligue o motor na tomada 220V e aguarde inflar",
      "Recolha e guarde seco no fim da temporada",
    ],
    products: [
      {
        name: "Boneco de Neve Inflável — 2m",
        image: "/natal/inflavel-boneco-neve.png",
        description:
          "Boneco de neve de 2m com motor para encher incluso.",
        specs: [
          { label: "Altura", value: "2m" },
          { label: "Tipo", value: "Inflável" },
          { label: "Material", value: "Plástico" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
          { label: "Extras", value: "Motor para encher" },
        ],
        variants: [
          { code: "51127", ledColor: "Branco Quente", swatch: SWATCH["Branco Quente"] },
        ],
      },
      {
        name: "Duende Inflável — 1,8m",
        image: "/natal/inflavel-duende.png",
        description:
          "Duende de natal de 1,8m, para compor a cena com o Papai Noel.",
        specs: [
          { label: "Altura", value: "1,8m" },
          { label: "Tipo", value: "Inflável" },
          { label: "Material", value: "Plástico" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
        ],
        variants: [
          { code: "51132", ledColor: "Multicolorido", swatch: SWATCH["Multicolorido"] },
        ],
      },
      {
        name: "Papai Noel Inflável — 1,5m / 2,4m / 5m",
        image: "/natal/inflavel-papai-noel.png",
        description:
          "Papai Noel inflável em três alturas — da calçada de casa à praça da cidade.",
        specs: [
          { label: "Alturas", value: "1,5m / 2,4m / 5m" },
          { label: "Tipo", value: "Inflável" },
          { label: "Material", value: "Plástico" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
        ],
        variants: [
          { code: "51131", ledColor: "Papai Noel 1,5m", swatch: SWATCH["Vermelho"] },
          { code: "51129", ledColor: "Papai Noel 2,4m", swatch: SWATCH["Vermelho"] },
          { code: "51130", ledColor: "Papai Noel 5m", swatch: SWATCH["Vermelho"] },
        ],
      },
    ],
    commercial:
      "Venda por unidade. Solicite orçamento por quantidade para praças e projetos urbanos.",
  },
  {
    slug: "figuras",
    name: "Figuras",
    icon: "⭐",
    photo: "/natal/app-arvores-gigantes-figuras.jpg",
    whatIs:
      "Figuras luminosas em armação metálica de 1,6m de altura, para poste e fachada.",
    whyThis:
      "São peças de decoração urbana: montam em poste e transformam uma rua inteira em corredor natalino, sem depender de árvore ou fachada.",
    applications: [
      "Poste de rua e avenida",
      "Praça e calçadão",
      "Entrada de shopping e condomínio",
      "Fachada de prédio público",
    ],
    installSteps: [
      "Defina a altura de montagem no poste",
      "Fixe a armação com abraçadeira metálica",
      "Ligue no ponto de energia do poste",
      "Alinhe as figuras na mesma altura ao longo da via",
    ],
    products: [
      {
        name: "Figura de Estrelas",
        image: "/natal/arvores-gigantes.png",
        description:
          "Composição de estrelas de 60cm de largura por 1,6m de altura.",
        specs: [
          { label: "Largura", value: "60cm" },
          { label: "Altura", value: "1,6m" },
        ],
        variants: [
          { code: "51069", ledColor: "Multicolorido", swatch: SWATCH["Multicolorido"] },
        ],
      },
      {
        name: "Figura de Ave",
        image: "/natal/arvores-gigantes.png",
        description:
          "Ave com ramo de oliveira, de 4,2m de largura — peça de destaque para vão largo.",
        specs: [
          { label: "Largura", value: "4,2m" },
          { label: "Altura", value: "1,6m" },
        ],
        variants: [
          { code: "51071", ledColor: "Branco e verde", swatch: SWATCH["Branco e verde"] },
        ],
      },
      {
        name: "Figura de Árvore",
        image: "/natal/arvores-gigantes.png",
        description:
          "Árvore de natal desenhada com presentes na base, de 60cm x 1,6m.",
        specs: [
          { label: "Largura", value: "60cm" },
          { label: "Altura", value: "1,6m" },
        ],
        variants: [
          { code: "51070", ledColor: "Multicolorido", swatch: SWATCH["Multicolorido"] },
        ],
      },
      {
        name: "Figura de Bolas",
        image: "/natal/arvores-gigantes.png",
        description:
          "Composição de bolas e volutas, de 80cm de largura por 1,6m de altura.",
        specs: [
          { label: "Largura", value: "80cm" },
          { label: "Altura", value: "1,6m" },
        ],
        variants: [
          { code: "51068", ledColor: "Multicolorido", swatch: SWATCH["Multicolorido"] },
        ],
      },
    ],
    commercial:
      "Venda por unidade. Projetos de decoração urbana: solicite orçamento com a quantidade de postes e o trecho da via.",
  },
];
