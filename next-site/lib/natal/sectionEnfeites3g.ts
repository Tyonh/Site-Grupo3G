import { SWATCH, type NatalCategory } from "./types";

/**
 * Grupo "Enfeites 3G".
 * Subcategorias: Meteoro, Strobe, Bola, Sprint e Festões.
 */
export const enfeites3gCategories: NatalCategory[] = [
  {
    slug: "meteoro",
    name: "Meteoro",
    icon: "☄️",
    photo: "/natal/app-sputink-meteoro-strobe.jpg",
    whatIs:
      "Tubos verticais em que a luz corre de cima para baixo, imitando chuva de meteoro.",
    whyThis:
      "É movimento pronto, sem controlador: o efeito de queda já vem programado no tubo. Um único conjunto anima uma árvore inteira.",
    applications: [
      "Árvore do jardim e da praça",
      "Poste e coluna de fachada",
      "Marquise e entrada de loja",
      "Túnel de luz",
    ],
    installSteps: [
      "Pendure os tubos na vertical, com a ponta de conexão para cima",
      "Distribua os tubos em volta do tronco ou da coluna",
      "Ligue o conjunto na tomada 220V",
      "Ajuste o espaçamento até o efeito ficar contínuo",
    ],
    products: [
      {
        name: "Meteoro LED — 8 tubos (45cm)",
        image: "/natal/meteoro.png",
        description:
          "Conjunto com 8 tubos de 45cm e 288 LEDs no total. Efeito de chuva de meteoro pronto.",
        specs: [
          { label: "Tamanho", value: "45cm por tubo" },
          { label: "Tubos", value: "8 tubos" },
          { label: "LEDs", value: "288 LEDs" },
          { label: "Distância entre LED", value: "10cm" },
        ],
        variants: [
          { code: "51023", ledColor: "Branco Quente", swatch: SWATCH["Branco Quente"] },
          { code: "51022", ledColor: "Branco", swatch: SWATCH["Branco"] },
        ],
      },
      {
        name: "Meteoro LED — 1 tubo (80cm)",
        image: "/natal/meteoro.png",
        description:
          "Tubo avulso de 80cm, para compor a quantidade exata do projeto.",
        specs: [
          { label: "Tamanho", value: "80cm" },
          { label: "Tubos", value: "1 tubo" },
          { label: "Distância entre LED", value: "10cm" },
        ],
        variants: [
          { code: "51023", ledColor: "Branco Quente", swatch: SWATCH["Branco Quente"] },
          { code: "51022", ledColor: "Branco", swatch: SWATCH["Branco"] },
        ],
      },
    ],
    commercial:
      "Venda por conjunto (8 tubos) ou por tubo avulso. Solicite orçamento por quantidade.",
  },
  {
    slug: "strobe",
    name: "Strobe",
    icon: "⚡",
    photo: "/natal/app-sputink-meteoro-strobe.jpg",
    whatIs:
      "Ponto de luz individual que dispara flashes rápidos, como uma câmera fotográfica.",
    whyThis:
      "É pontual, não linear: você espalha unidades pela fachada para criar cintilância aleatória — algo que cordão nenhum reproduz.",
    applications: [
      "Fachada de prédio e shopping",
      "Telhado e platibanda",
      "Painel e totem de sinalização",
      "Palco e evento",
    ],
    installSteps: [
      "Escolha os pontos e espace as unidades de forma irregular",
      "Fixe cada strobo com parafuso pelos furos da base",
      "Ligue na rede 220V",
      "Teste à noite e ajuste a distribuição",
    ],
    products: [
      {
        name: "Strobo LED",
        image: "/natal/strobo.png",
        description:
          "Módulo compacto de flash branco, para cintilância pontual em fachada.",
        specs: [
          { label: "Dimensões", value: "11,2 x 5,9 x 5 cm" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
        ],
        variants: [
          { code: "50533", ledColor: "Branco", swatch: SWATCH["Branco"] },
        ],
      },
    ],
    commercial:
      "Venda por unidade. Para fachadas, solicite orçamento por quantidade.",
  },
  {
    slug: "bolas",
    name: "Bola",
    icon: "🔮",
    photo: "/natal/app-arvores-gigantes-figuras.jpg",
    whatIs:
      "Esfera de armação metálica coberta de LEDs, para pendurar em árvore ou apoiar no chão.",
    whyThis:
      "É volume, não linha: a bola vira um objeto luminoso com forma própria. Rende muito em árvore de porte, praça e jardim.",
    applications: [
      "Copa de árvore em praça e jardim",
      "Entrada de condomínio e hotel",
      "Vitrine e hall de shopping",
      "Composição de chão em evento",
    ],
    installSteps: [
      "Escolha o diâmetro conforme o porte da árvore",
      "Pendure pela alça superior ou apoie no chão",
      "Distribua bolas em alturas diferentes para dar profundidade",
      "Ligue na tomada 220V",
    ],
    products: [
      {
        name: "Bola LED — 50cm",
        image: "/natal/bola-led-50.png",
        description:
          "Esfera de 50cm com 280 LEDs, disponível em cinco cores. Para árvore de porte e composição de praça.",
        specs: [
          { label: "Tamanho", value: "50cm" },
          { label: "LEDs", value: "280 LEDs" },
          { label: "Distância entre LED", value: "10cm" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
        ],
        variants: [
          { code: "51023", ledColor: "Branco Quente", swatch: SWATCH["Branco Quente"] },
          { code: "51022", ledColor: "Branco", swatch: SWATCH["Branco"] },
          { code: "51026", ledColor: "Vermelho", swatch: SWATCH["Vermelho"] },
          { code: "51024", ledColor: "Azul", swatch: SWATCH["Azul"] },
          { code: "51025", ledColor: "Verde", swatch: SWATCH["Verde"] },
        ],
      },
      {
        name: "Bola LED — 30cm",
        image: "/natal/bola-led-30.png",
        description:
          "Versão menor da esfera, em branco quente, para composições com várias bolas.",
        specs: [
          { label: "Tamanho", value: "30cm" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
        ],
        variants: [
          { code: "51023", ledColor: "Branco Quente", swatch: SWATCH["Branco Quente"] },
        ],
      },
    ],
    commercial:
      "Venda por unidade. Solicite orçamento por quantidade para praças e projetos urbanos.",
  },
  {
    slug: "sprint",
    name: "Sprint",
    icon: "🎆",
    photo: "/natal/app-sputink-meteoro-strobe.jpg",
    whatIs:
      "Leque de fitas RGB que abre como uma explosão de fogos de artifício parada no ar.",
    whyThis:
      "É o único da linha com controle por aplicativo e RGB completo: você muda a cor inteira do efeito pelo celular, sem trocar produto.",
    applications: [
      "Parede de quarto e setup gamer",
      "Fundo de palco e DJ",
      "Vitrine e painel de loja",
      "Festa e evento temático",
    ],
    installSteps: [
      "Cole a base no centro do ponto escolhido",
      "Abra as fitas em leque, distribuindo o ângulo",
      "Conecte o cabo USB à fonte",
      "Escolha cor e efeito pelo controle remoto ou aplicativo",
    ],
    products: [
      {
        name: "Sprint — Luzes de Fogos de Artifício LED RGB (Strip Light)",
        image: "/natal/sputink.png",
        description:
          "Leque RGB com controle remoto e aplicativo. Fita de 50cm e fita base de 1m.",
        specs: [
          { label: "Fita", value: "50cm" },
          { label: "Fita base", value: "1m" },
          { label: "LEDs", value: "10 LEDs/m" },
          { label: "Distância entre LED", value: "10cm" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 20", plain: "uso interno" },
          { label: "Controle", value: "USB + controle remoto + aplicativo" },
        ],
        variants: [
          { code: "50697", ledColor: "Multicolorido", wireColor: "Transparente", swatch: SWATCH["Multicolorido"] },
        ],
      },
    ],
    commercial:
      "Venda por unidade. Solicite orçamento por quantidade para lojas.",
  },
  {
    slug: "festoes",
    name: "Festões",
    icon: "🎍",
    photo: "/natal/app-cordoes-decorativos.jpg",
    whatIs:
      "Festão decorativo de 2m — na versão em fio metalizado colorido ou na versão com 300 LEDs.",
    whyThis:
      "Cobre a fiação e dá volume verde ao mesmo tempo. É o acabamento que transforma um cordão solto em decoração acabada.",
    applications: [
      "Corrimão de escada e batente de porta",
      "Balcão, vitrine e prateleira",
      "Moldura de espelho e quadro",
      "Árvore de natal e guirlanda",
    ],
    installSteps: [
      "Meça o trajeto e escolha a quantidade de festões",
      "Enrole o festão no corrimão ou batente",
      "Na versão com LED, ligue o plugue na ponta inicial",
      "Emende festões pelo conector macho/fêmea quando necessário",
    ],
    products: [
      {
        name: "Cordão de Festão Decorativo — 2m",
        image: "/natal/festao-dourado.png",
        description:
          "Festão em fio metalizado, sem LED, nas cores dourado, verde e vermelho. Acabamento decorativo.",
        specs: [
          { label: "Tamanho", value: "2m" },
          { label: "Tipo", value: "Decorativo" },
          { label: "Material", value: "Plástico" },
        ],
        variants: [
          { code: "51144", ledColor: "Dourado", swatch: SWATCH["Dourado"] },
          { code: "51145", ledColor: "Verde", swatch: SWATCH["Verde"] },
          { code: "51146", ledColor: "Vermelho", swatch: SWATCH["Vermelho"] },
        ],
      },
      {
        name: "Cordão de Festão LED — 300L (2m)",
        image: "/natal/festao-led-300l.png",
        description:
          "Festão verde com 300 LEDs embutidos, emendável por conector macho/fêmea.",
        specs: [
          { label: "Comprimento", value: "2m" },
          { label: "LEDs", value: "300 LEDs" },
          { label: "Distância entre LED", value: "10cm" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
          { label: "Conexão", value: "Conector macho/fêmea + plugue e drive" },
        ],
        variants: [
          { code: "50684", ledColor: "Branco Quente", wireColor: "Verde", swatch: SWATCH["Branco Quente"] },
        ],
      },
    ],
    commercial:
      "Venda por unidade. Solicite orçamento por quantidade para lojas e projetos.",
  },
];
