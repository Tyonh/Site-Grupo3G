import { SWATCH, type NatalCategory } from "./types";

/**
 * Grupo "Mangueiras & Fitas".
 * Subcategorias do Índice:
 * - Mangueiras
 * - Fitas de LED Neon
 * - Fitas de LED (SMD)
 */
export const mangueirasFitasCategories: NatalCategory[] = [
  {
    slug: "mangueiras",
    name: "Mangueiras",
    icon: "🧵",
    photo: "/natal/app-mangueira-led.jpg",
    whatIs:
      "Tubo de PVC flexível com LEDs por dentro, que acende como uma linha contínua de luz.",
    whyThis:
      "Diferente do cordão, a luz não tem pontos separados: vira um traço sólido. É o produto para desenhar contorno, letra e forma com acabamento limpo.",
    applications: [
      "Contorno de fachada, telhado e platibanda",
      "Letreiro e logotipo desenhado",
      "Corrimão, escada e guarda-corpo",
      "Contorno de piscina e deck",
    ],
    installSteps: [
      "Meça o contorno e corte a mangueira apenas nas marcas indicadas",
      "Encaixe o conector e vede as pontas com o tampão",
      "Fixe com presilha própria a cada 50cm",
      "Ligue na tomada 220V",
    ],
    products: [
      {
        name: "Mangueira LED — rolo 100m",
        image: "/natal/mangueira-led.png",
        images: [
          { code: "50537", color: "Verde", swatch: SWATCH["Verde"], src: "/natal/mangueira-led-100m-verde.png" },
          { code: "50535", color: "Azul", swatch: SWATCH["Azul"], src: "/natal/mangueira-led-100m-azul.png" },
          { code: "50536", color: "Vermelho", swatch: SWATCH["Vermelho"], src: "/natal/mangueira-led-100m-vermelho.png" },
        ],
        description:
          "Rolo fechado de 100m com 24 LEDs por metro. Luz contínua para contornos longos.",
        specs: [
          { label: "Comprimento", value: "100m (rolo)" },
          { label: "LEDs", value: "24 LEDs/m" },
          { label: "Distância entre LED", value: "10cm" },
          { label: "Voltagem", value: "220V" },
          {
            label: "Proteção",
            value: "IP 65",
            plain: "resiste a chuva — pode ficar exposta",
          },
        ],
        variants: [
          { code: "50534", ledColor: "Branco", wireColor: "Transparente", swatch: SWATCH["Branco"] },
          { code: "50535", ledColor: "Azul", wireColor: "Transparente", swatch: SWATCH["Azul"] },
          { code: "50536", ledColor: "Vermelho", wireColor: "Transparente", swatch: SWATCH["Vermelho"] },
          { code: "50537", ledColor: "Verde", wireColor: "Transparente", swatch: SWATCH["Verde"] },
          { code: "50538", ledColor: "Branco Quente", wireColor: "Transparente", swatch: SWATCH["Branco Quente"] },
        ],
      },
      {
        name: "Mangueira Neon 360° — rolo 50m",
        image: "/natal/mangueira-neon.png",
        videos: [
          { code: "50842", color: "Vermelho", swatch: SWATCH["Vermelho"], src: "/natal/videos/mangueira-neon-360-vermelho.mp4" },
          { code: "50845", color: "Roxo", swatch: SWATCH["Roxo"], src: "/natal/videos/mangueira-neon-360-roxo.mp4" },
          { code: "50844", color: "Aquamarine Azul", swatch: SWATCH["Aquamarine Azul"], src: "/natal/videos/mangueira-neon-360-aquamarine.mp4" },
          { code: "50846", color: "Rosa", swatch: SWATCH["Rosa"], src: "/natal/videos/mangueira-neon-360-rosa.mp4" },
          { code: "50843", color: "Verde", swatch: SWATCH["Verde"], src: "/natal/videos/mangueira-neon-360-verde.mp4" },
          { code: "50847", color: "Amarelo", swatch: SWATCH["Amarelo"], src: "/natal/videos/mangueira-neon-360-amarelo.mp4" },
          { code: "50839", color: "Branco", swatch: SWATCH["Branco"], src: "/natal/videos/mangueira-neon-360-branco.mp4" },
          { code: "50841", color: "Azul", swatch: SWATCH["Azul"], src: "/natal/videos/mangueira-neon-360-azul.mp4" },
          { code: "50840", color: "Branco Quente", swatch: SWATCH["Branco Quente"], src: "/natal/videos/mangueira-neon-360-branco-quente.mp4" },
        ],
        description:
          "Neon flexível que acende nos 360°, com 240 LEDs por metro e 9 cores — incluindo roxo, rosa e dourado.",
        specs: [
          { label: "Comprimento", value: "50m (rolo)" },
          { label: "LEDs", value: "240 LEDs/m" },
          { label: "Distância entre LED", value: "10cm" },
          { label: "Voltagem", value: "220V" },
          {
            label: "Proteção",
            value: "Corpo IP 68 / conectores IP 20",
            plain: "o tubo é à prova d'água; as conexões, não",
          },
        ],
        variants: [
          { code: "50839", ledColor: "Branco", wireColor: "Transparente", swatch: SWATCH["Branco"] },
          { code: "50840", ledColor: "Branco Quente", wireColor: "Transparente", swatch: SWATCH["Branco Quente"] },
          { code: "50841", ledColor: "Azul", wireColor: "Transparente", swatch: SWATCH["Azul"] },
          { code: "50842", ledColor: "Vermelho", wireColor: "Transparente", swatch: SWATCH["Vermelho"] },
          { code: "50843", ledColor: "Verde", wireColor: "Transparente", swatch: SWATCH["Verde"] },
          { code: "50844", ledColor: "Aquamarine Azul", wireColor: "Transparente", swatch: SWATCH["Aquamarine Azul"] },
          { code: "50845", ledColor: "Roxo", wireColor: "Transparente", swatch: SWATCH["Roxo"] },
          { code: "50846", ledColor: "Rosa", wireColor: "Transparente", swatch: SWATCH["Rosa"] },
          { code: "50847", ledColor: "Amarelo", wireColor: "Transparente", swatch: SWATCH["Amarelo"] },
        ],
      },
    ],
    commercial:
      "Venda em rolo fechado. Conectores, tampões e presilhas vendidos à parte — informe a metragem para orçamento completo.",
  },
  {
    slug: "fitas-de-led-neon",
    name: "Fitas de LED Neon",
    icon: "💡",
    photo: "/natal/app-fitas-led.jpg",
    whatIs:
      "Fitas LED com difusor de borracha silicone neon que oculta totalmente os pontos de luz, criando um traço visual contínuo e homogêneo.",
    whyThis:
      "Ideal quando a fita de iluminação fica visível diretamente aos olhos, entregando acabamento estético sem sombra nem pontos expostos.",
    applications: [
      "Letreiros e fachadas comerciais",
      "Iluminação de contornos e espelhos",
      "Decoração de vitrines e mobiliário",
      "Arquitetura interna e externa",
    ],
    installSteps: [
      "Meça o vão e corte a fita neon de metro em metro no local indicado",
      "Limpe a superfície de aplicação",
      "Fixe a fita com braçadeiras de alumínio ou presilhas",
      "Conecte à fonte de alimentação 220V",
    ],
    products: [
      {
        name: "Fita de LED Neon — 50m",
        image: "/natal/fita-neon.png",
        description:
          "Rolo de 50m com 200 LEDs por metro e difusor neon. Cortável de metro em metro.",
        specs: [
          { label: "Comprimento", value: "50m (rolo)" },
          { label: "LEDs", value: "200 LEDs/m" },
          { label: "Distância entre LED", value: "10cm" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 65", plain: "resiste a chuva" },
          { label: "Corte", value: "De metro em metro" },
        ],
        variants: [
          { code: "50732", ledColor: "Branco Quente", swatch: SWATCH["Branco Quente"] },
          { code: "50733", ledColor: "Branco", swatch: SWATCH["Branco"] },
          { code: "50734", ledColor: "Vermelho", swatch: SWATCH["Vermelho"] },
          { code: "50735", ledColor: "Azul", swatch: SWATCH["Azul"] },
          { code: "50736", ledColor: "Verde", swatch: SWATCH["Verde"] },
          { code: "50737", ledColor: "Multicolorido", swatch: SWATCH["Multicolorido"] },
        ],
      },
      {
        name: "Fita de LED Neon — 100m",
        image: "/natal/fita-neon.png",
        description:
          "Rolo dobrado de 100m em branco quente, para obras e projetos de metragem longa.",
        specs: [
          { label: "Comprimento", value: "100m (rolo)" },
          { label: "LEDs", value: "200 LEDs/m" },
          { label: "Distância entre LED", value: "10cm" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 65", plain: "resiste a chuva" },
          { label: "Corte", value: "De metro em metro" },
        ],
        variants: [
          { code: "50732", ledColor: "Branco Quente", swatch: SWATCH["Branco Quente"] },
        ],
      },
    ],
    commercial:
      "Venda em rolo fechado (50m ou 100m). Informe a metragem e a cor para orçamento.",
  },
  {
    slug: "fitas-de-led",
    name: "Fitas de LED",
    icon: "⚡",
    photo: "/natal/app-fitas-led.jpg",
    whatIs:
      "Fitas com chips LED SMD expostos de alta intensidade e eficiência luminosa por metro.",
    whyThis:
      "Proporciona maior rendimento de lumens por metro com custo acessível. Perfeita para sancas, rasgos de gesso e iluminação indireta.",
    applications: [
      "Sanca de gesso e iluminação indireta",
      "Iluminação sob armários e nichos",
      "Painéis de iluminação de destaque",
      "Interiores residenciais e comerciais",
    ],
    installSteps: [
      "Corte a fita no comprimento desejado nas marcações de metro em metro",
      "Limpe a superfície de poeira e gordura",
      "Fixe a fita utilizando os suportes ou fita dupla face",
      "Ligue o conector à tomada 220V",
    ],
    products: [
      {
        name: "Fita de LED SMD — 50m",
        image: "/natal/fita-smd-50.png",
        images: [
          { code: "50741", color: "Branco Quente", swatch: SWATCH["Branco Quente"], src: "/natal/fita-smd-50m-branco-quente.png" },
          { code: "50744", color: "Verde", swatch: SWATCH["Verde"], src: "/natal/fita-smd-50m-verde.png" },
          { code: "50745", color: "Rosa", swatch: SWATCH["Rosa"], src: "/natal/fita-smd-50m-rosa.png" },
          { code: "50743", color: "Vermelho", swatch: SWATCH["Vermelho"], src: "/natal/fita-smd-50m-vermelho.png" },
        ],
        description:
          "Rolo de 50m com 250 LEDs por metro, em 7 cores. Cortável de metro em metro.",
        specs: [
          { label: "Comprimento", value: "50m (rolo)" },
          { label: "LEDs", value: "250 LEDs/m" },
          { label: "Distância entre LED", value: "10cm" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 65", plain: "resiste a chuva" },
          { label: "Corte", value: "De metro em metro" },
        ],
        variants: [
          { code: "50739", ledColor: "Branco", swatch: SWATCH["Branco"] },
          { code: "50740", ledColor: "Branco Neutro", swatch: SWATCH["Branco Neutro"] },
          { code: "50741", ledColor: "Branco Quente", swatch: SWATCH["Branco Quente"] },
          { code: "50742", ledColor: "Azul", swatch: SWATCH["Azul"] },
          { code: "50743", ledColor: "Vermelho", swatch: SWATCH["Vermelho"] },
          { code: "50744", ledColor: "Verde", swatch: SWATCH["Verde"] },
          { code: "50745", ledColor: "Rosa", swatch: SWATCH["Rosa"] },
        ],
      },
      {
        name: "Fita de LED SMD — 100m",
        image: "/natal/fita-smd-100.png",
        description:
          "Rolo dobrado de 100m em branco quente, para obras e projetos de metragem longa.",
        specs: [
          { label: "Comprimento", value: "100m (rolo)" },
          { label: "LEDs", value: "250 LEDs/m" },
          { label: "Distância entre LED", value: "10cm" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 65", plain: "resiste a chuva" },
          { label: "Corte", value: "De metro em metro" },
        ],
        variants: [
          { code: "50741", ledColor: "Branco Quente", swatch: SWATCH["Branco Quente"] },
        ],
      },
    ],
    commercial:
      "Venda em rolo fechado (50m ou 100m). Escolha a cor e metragem desejada para solicitar orçamento.",
  },
];
