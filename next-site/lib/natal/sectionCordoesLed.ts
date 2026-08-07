import { SWATCH, type NatalCategory } from "./types";

/**
 * Grupo "Cordões de LED" — a base do catálogo.
 * Subcategorias do Índice:
 * - Cordão com Drive
 * - Cordão com Strobo
 * - Cordão LED
 * - Cortina
 * - Rede
 * - Cascata
 * - Fio de Cobre c/ PVC
 * - Fio de Cobre c/ PVC (Painel Solar)
 * - Cordão LED Decorativo
 */
export const cordoesLedCategories: NatalCategory[] = [
  {
    slug: "cordao-com-drive",
    name: "Cordão com Drive",
    icon: "✨",
    photo: "/natal/app-cordoes-led.jpg",
    video: "/natal/videos/cordoes-entrada-branco.mp4",
    mediaBg: "white",
    mediaAlign: "left",
    whatIs:
      "Cordão curto que já vem com plugue e controlador — liga direto na tomada e acende.",
    whyThis:
      "É o único da linha com drive de 8 funções embutido: pisca, onda, fade e luz constante sem comprar controlador à parte. Escolha esse quando o trecho é curto e você quer efeito pronto.",
    applications: [
      "Árvore de natal de casa ou de escritório",
      "Moldura de janela, porta e balcão",
      "Vitrine pequena de loja",
      "Guarda-corpo de varanda",
      "Decoração de mesa e recepção",
    ],
    installSteps: [
      "Meça o trajeto e escolha entre 2,5m e 5m",
      "Fixe o cordão com abraçadeira ou fita, começando pelo lado da tomada",
      "Ligue na tomada 220V",
      "Pressione o botão do drive até chegar no efeito desejado",
    ],
    products: [
      {
        name: "Cordão de LED com Drive — 50L (2,5m)",
        image: "/natal/cordao-drive.png",
        description:
          "Cordão curto com plugue e controlador de 8 funções. Ideal para árvores e molduras pequenas.",
        specs: [
          { label: "Comprimento", value: "2,5m + 0,5m de cabo de plugue" },
          { label: "LEDs", value: "5 LEDs/m (50 no total)" },
          { label: "Distância entre LED", value: "5cm" },
          { label: "Voltagem", value: "220V" },
          {
            label: "Proteção",
            value: "IP 20",
            plain: "uso interno — não é à prova de chuva",
          },
          { label: "Funções", value: "8 funções + luz constante" },
        ],
        variants: [
          { code: "50701", ledColor: "Branco", wireColor: "Verde", swatch: SWATCH["Branco"] },
          { code: "50702", ledColor: "Branco Quente", wireColor: "Verde", swatch: SWATCH["Branco Quente"] },
          { code: "50703", ledColor: "Multicolorido", wireColor: "Verde", swatch: SWATCH["Multicolorido"] },
          { code: "50704", ledColor: "Azul", wireColor: "Verde", swatch: SWATCH["Azul"] },
          { code: "50705", ledColor: "Vermelho", wireColor: "Verde", swatch: SWATCH["Vermelho"] },
          { code: "50706", ledColor: "Verde", wireColor: "Verde", swatch: SWATCH["Verde"] },
        ],
      },
      {
        name: "Cordão de LED com Drive — 100L (5m)",
        image: "/natal/cordao-drive.png",
        videos: [
          { code: "50707", color: "Branco", swatch: SWATCH["Branco"], src: "/natal/videos/cordao-50l-branco.mp4" },
          { code: "50708", color: "Branco Quente", swatch: SWATCH["Branco Quente"], src: "/natal/videos/cordao-50l-branco-quente.mp4" },
          { code: "50709", color: "Multicolorido", swatch: SWATCH["Multicolorido"], src: "/natal/videos/cordao-50l-multicolorido.mp4" },
          { code: "50710", color: "Azul", swatch: SWATCH["Azul"], src: "/natal/videos/cordao-50l-azul.mp4" },
          { code: "50711", color: "Vermelho", swatch: SWATCH["Vermelho"], src: "/natal/videos/cordao-50l-vermelho.mp4" },
          { code: "50712", color: "Verde", swatch: SWATCH["Verde"], src: "/natal/videos/cordao-50l-verde.mp4" },
        ],
        description:
          "O dobro do comprimento e densidade de 10 LEDs por metro, com as mesmas 8 funções.",
        specs: [
          { label: "Comprimento", value: "5m + 0,5m de cabo de plugue" },
          { label: "LEDs", value: "10 LEDs/m (100 no total)" },
          { label: "Distância entre LED", value: "5cm" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 20", plain: "uso interno" },
          { label: "Funções", value: "8 funções + luz constante" },
        ],
        variants: [
          { code: "50707", ledColor: "Branco", wireColor: "Verde", swatch: SWATCH["Branco"] },
          { code: "50708", ledColor: "Branco Quente", wireColor: "Verde", swatch: SWATCH["Branco Quente"] },
          { code: "50709", ledColor: "Multicolorido", wireColor: "Verde", swatch: SWATCH["Multicolorido"] },
          { code: "50710", ledColor: "Azul", wireColor: "Verde", swatch: SWATCH["Azul"] },
          { code: "50711", ledColor: "Vermelho", wireColor: "Verde", swatch: SWATCH["Vermelho"] },
          { code: "50712", ledColor: "Verde", wireColor: "Verde", swatch: SWATCH["Verde"] },
        ],
      },
    ],
    commercial:
      "Venda por unidade. Para volume (lojas, condomínios, projetos), solicite orçamento por quantidade.",
  },
  {
    slug: "cordao-com-strobo",
    name: "Cordão com Strobo",
    icon: "⚡",
    photo: "/natal/app-cordoes-led.jpg",
    whatIs:
      "Cordão de 10m em que 20 dos 100 LEDs piscam sozinhos, criando um brilho cintilante.",
    whyThis:
      "O efeito strobo é fixo, não depende de controlador. É emendável por conector macho/fêmea, então dá para cobrir fachadas inteiras sem uma tomada por trecho.",
    applications: [
      "Fachada de prédio e telhado",
      "Árvores do jardim e da praça",
      "Túnel de luz e passarela",
      "Decoração urbana de rua",
    ],
    installSteps: [
      "Escolha a cor do fio conforme o fundo: escuro, transparente ou colorido",
      "Emende os cordões pelo conector macho/fêmea antes de subir",
      "Fixe com abraçadeira a cada 40cm",
      "Ligue o plugue apenas na ponta inicial da sequência",
    ],
    products: [
      {
        name: "Cordão de LED Escuro — 100L Strobo (20 LEDs piscando)",
        image: "/natal/cordao-strobo.png",
        description:
          "Fio escuro que some no galho e no telhado. Não possui plugue e drive — a cada 5 unidades acompanha plugue grátis.",
        specs: [
          { label: "Comprimento", value: "10m" },
          { label: "LEDs", value: "10 LEDs/m (100 no total, 20 em strobo)" },
          { label: "Distância entre LED", value: "5cm" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
          { label: "Conexão", value: "Conector macho/fêmea (emendável)" },
        ],
        variants: [
          { code: "50997", ledColor: "Branco", wireColor: "Escuro", swatch: SWATCH["Branco"] },
          { code: "50998", ledColor: "Branco Quente", wireColor: "Escuro", swatch: SWATCH["Branco Quente"] },
          { code: "51002", ledColor: "Âmbar", wireColor: "Escuro", swatch: SWATCH["Âmbar"] },
          { code: "51000", ledColor: "Verde", wireColor: "Escuro", swatch: SWATCH["Verde"] },
          { code: "50999", ledColor: "Azul", wireColor: "Escuro", swatch: SWATCH["Azul"] },
          { code: "51001", ledColor: "Vermelho", wireColor: "Escuro", swatch: SWATCH["Vermelho"] },
        ],
      },
      {
        name: "Cordão de LED Transparente — 100L Strobo (20 LEDs piscando)",
        image: "/natal/cordao-10m-transparente.png",
        description:
          "Mesmo efeito strobo com fio transparente, que desaparece em superfícies claras e vidro.",
        specs: [
          { label: "Comprimento", value: "10m + 0,5m de cabo de plugue" },
          { label: "Diâmetro", value: "22mm" },
          { label: "LEDs", value: "10 LEDs/m (100 no total, 20 em strobo)" },
          { label: "Distância entre LED", value: "5cm" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
          { label: "Conexão", value: "Conector macho/fêmea (emendável)" },
        ],
        variants: [
          { code: "51008", ledColor: "Branco", wireColor: "Transparente", swatch: SWATCH["Branco"] },
          { code: "51009", ledColor: "Branco Quente", wireColor: "Transparente", swatch: SWATCH["Branco Quente"] },
          { code: "51013", ledColor: "Âmbar", wireColor: "Transparente", swatch: SWATCH["Âmbar"] },
          { code: "51011", ledColor: "Verde", wireColor: "Transparente", swatch: SWATCH["Verde"] },
          { code: "51010", ledColor: "Azul", wireColor: "Transparente", swatch: SWATCH["Azul"] },
          { code: "51012", ledColor: "Vermelho", wireColor: "Transparente", swatch: SWATCH["Vermelho"] },
        ],
      },
      {
        name: "Cordão de LED Colorido — 100L Strobo (20 LEDs piscando)",
        image: "/natal/cordao-strobo.png",
        description:
          "Fio na mesma cor do LED — o cabo vira parte da decoração em vez de tentar sumir.",
        specs: [
          { label: "Comprimento", value: "10m + 0,5m de cabo de plugue" },
          { label: "Diâmetro", value: "22mm" },
          { label: "LEDs", value: "10 LEDs/m (100 no total, 20 em strobo)" },
          { label: "Distância entre LED", value: "10cm" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
          { label: "Conexão", value: "Conector macho/fêmea (emendável)" },
        ],
        variants: [
          { code: "51003", ledColor: "Branco", wireColor: "Branco", swatch: SWATCH["Branco"] },
          { code: "51004", ledColor: "Branco Quente", wireColor: "Amarelo", swatch: SWATCH["Branco Quente"] },
          { code: "51006", ledColor: "Verde", wireColor: "Verde", swatch: SWATCH["Verde"] },
          { code: "51005", ledColor: "Azul", wireColor: "Azul", swatch: SWATCH["Azul"] },
          { code: "51033", ledColor: "Vermelho", wireColor: "Vermelho", swatch: SWATCH["Vermelho"] },
        ],
      },
    ],
    commercial:
      "Não possui plugue e drive. A cada 5 unidades acompanha plugue grátis. Solicite orçamento por quantidade para projetos.",
  },
  {
    slug: "cordao-led",
    name: "Cordão LED",
    icon: "🔗",
    photo: "/natal/app-cordoes-led.jpg",
    whatIs:
      "Cordão profissional emendável, de luz constante, vendido em 10m, 100m ou em versão tubo.",
    whyThis:
      "É a linha para metragem grande: sem drive, sem efeito piscando, só luz constante e conectores macho/fêmea para ligar vários em sequência a partir de um único plugue.",
    applications: [
      "Fachada de prédio e sacadas",
      "Praça, coreto e arborização urbana",
      "Galpão, salão de festas e shopping",
      "Contorno de telhado em metragem longa",
    ],
    installSteps: [
      "Some a metragem do trajeto e escolha entre 10m, 100m ou tubo",
      "Encaixe os conectores macho/fêmea entre os trechos",
      "Fixe com abraçadeira a cada 40cm",
      "Ligue o plugue apenas no início da sequência",
    ],
    products: [
      {
        name: "Cordão de LED — 100L (10m)",
        image: "/natal/cordao-10m-escuro.png",
        description:
          "Cordão emendável de luz constante em fio transparente. A cada 5 unidades acompanha plugue grátis.",
        specs: [
          { label: "Comprimento", value: "10m + 0,5m de cabo de plugue" },
          { label: "Diâmetro", value: "22mm" },
          { label: "LEDs", value: "10 LEDs/m (100 no total)" },
          { label: "Distância entre LED", value: "10cm" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
          { label: "Conexão", value: "Conector macho/fêmea (emendável)" },
        ],
        variants: [
          { code: "50991", ledColor: "Branco", wireColor: "Transparente", swatch: SWATCH["Branco"] },
          { code: "50992", ledColor: "Branco Quente", wireColor: "Transparente", swatch: SWATCH["Branco Quente"] },
          { code: "50996", ledColor: "Âmbar", wireColor: "Transparente", swatch: SWATCH["Âmbar"] },
          { code: "50994", ledColor: "Verde", wireColor: "Transparente", swatch: SWATCH["Verde"] },
          { code: "50993", ledColor: "Azul", wireColor: "Transparente", swatch: SWATCH["Azul"] },
          { code: "50995", ledColor: "Vermelho", wireColor: "Transparente", swatch: SWATCH["Vermelho"] },
        ],
      },
      {
        name: "Cordão de LED — 1000L (100m)",
        image: "/natal/cordao-100m.png",
        description:
          "Rolo fechado para grandes projetos: praças, fachadas de prédio e decoração urbana. Fio na cor do LED.",
        specs: [
          { label: "Comprimento", value: "100m + 0,5m de cabo de plugue" },
          { label: "Diâmetro", value: "22mm" },
          { label: "LEDs", value: "10 LEDs/m (1.000 no total)" },
          { label: "Distância entre LED", value: "10cm" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
          { label: "Conexão", value: "Conector macho/fêmea (emendável)" },
        ],
        variants: [
          { code: "51014", ledColor: "Branco", wireColor: "Branco", swatch: SWATCH["Branco"] },
          { code: "51015", ledColor: "Branco Quente", wireColor: "Amarelo", swatch: SWATCH["Branco Quente"] },
          { code: "51016", ledColor: "Verde", wireColor: "Verde", swatch: SWATCH["Verde"] },
          { code: "51017", ledColor: "Azul", wireColor: "Azul", swatch: SWATCH["Azul"] },
          { code: "51019", ledColor: "Vermelho", wireColor: "Vermelho", swatch: SWATCH["Vermelho"] },
        ],
      },
      {
        name: "Cordão tubo de LED — 100L (10m)",
        image: "/natal/cordao-tubo-led.png",
        description:
          "Versão em tubo fino com fio de cobre interno: dobra e mantém a forma, ótimo para desenhar letras e contornos.",
        specs: [
          { label: "Comprimento", value: "10m" },
          { label: "Diâmetro", value: "0,5cm" },
          { label: "LEDs", value: "10 LEDs/m (100 no total)" },
          { label: "Distância entre LED", value: "10cm" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
          { label: "Extras", value: "Plugue e drive + fio de cobre interno" },
        ],
        variants: [
          { code: "50699", ledColor: "Branco Quente", wireColor: "Transparente", swatch: SWATCH["Branco Quente"] },
        ],
      },
    ],
    commercial:
      "Venda por unidade ou rolo fechado (100m). Nas versões 10m, a cada 5 unidades acompanha plugue grátis. Solicite orçamento por quantidade.",
  },
  {
    slug: "cortina",
    name: "Cortina",
    icon: "🪟",
    photo: "/natal/app-cortina-cascata-rede.jpg",
    whatIs:
      "Parede vertical de luz com 400 LEDs emendável lado a lado.",
    whyThis:
      "Cobre superfícies verticais inteiras (vãos, janelas e paredes) com caimento perfeito e densidade homogênea de luz.",
    applications: [
      "Vão de porta e janelas de fachada",
      "Parede de fundo para fotos e cenários",
      "Fachada de prédio e entradas de evento",
      "Sacadas e marquises",
    ],
    installSteps: [
      "Fixe o cabo principal horizontal na parte superior",
      "Solte os fios verticais para caimento natural",
      "Emende novas unidades pelo conector macho/fêmea se necessário",
      "Ligue na tomada 220V e ajuste a função no drive",
    ],
    products: [
      {
        name: "Luz de Cortina LED — 400L",
        image: "/natal/cortina.png",
        description:
          "Cortina de 3m de largura por 2m de altura, com plugue e drive. Emendável lado a lado.",
        specs: [
          { label: "Tamanho", value: "3m de largura x 2m de altura" },
          { label: "Espaço entre cordas", value: "16cm" },
          { label: "Distância entre LED", value: "10cm" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
          { label: "Conexão", value: "Conector macho/fêmea + plugue e drive" },
        ],
        variants: [
          { code: "50713", ledColor: "Branco Quente", wireColor: "Transparente", swatch: SWATCH["Branco Quente"] },
        ],
      },
    ],
    commercial:
      "Venda por unidade. Emendável lado a lado para vãos mais largos. Solicite orçamento.",
  },
  {
    slug: "rede",
    name: "Rede",
    icon: "🕸️",
    photo: "/natal/app-cortina-cascata-rede.jpg",
    whatIs:
      "Malha retangular pronta coberta de LEDs para abraçar superfícies volumosas.",
    whyThis:
      "Ideal para arbustos, muros e topiarias. Envolve o volume em poucos segundos sem precisar passar cordão volta por volta.",
    applications: [
      "Arbusto, topiaria e cerca viva",
      "Muro verde e fachada de plantas",
      "Decoração de colunas",
    ],
    installSteps: [
      "Jogue a malha sobre o arbusto ou fixe no muro",
      "Ajuste a distribuição dos pontos de luz",
      "Ligue o plugue na rede 220V",
    ],
    products: [
      {
        name: "Luz de Rede LED — 176L",
        image: "/natal/rede.png",
        description:
          "Malha pronta com plugue e drive, para cobrir volume sem enrolar cordão fio a fio.",
        specs: [
          { label: "Comprimento", value: "70 x 220cm" },
          { label: "LEDs", value: "176 LEDs" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
          { label: "Conexão", value: "Conector macho/fêmea + plugue e drive" },
        ],
        variants: [
          { code: "50685", ledColor: "Branco Quente", wireColor: "Transparente", swatch: SWATCH["Branco Quente"] },
        ],
      },
    ],
    commercial:
      "Venda por unidade. Emendável em sequência.",
  },
  {
    slug: "cascata",
    name: "Cascata",
    icon: "💧",
    photo: "/natal/app-cortina-cascata-rede.jpg",
    whatIs:
      "Cordão horizontal com caimentos pontuais irregulares imitando estalactites de gelo.",
    whyThis:
      "Desenhado especificamente para beiral de telhado, marquise e guarda-corpo.",
    applications: [
      "Beiral de telhado e varanda",
      "Marquise de prédio e shopping",
      "Sacadas e parapeitos",
    ],
    installSteps: [
      "Fixe a guia principal ao longo do beiral",
      "Deixe as pontas caírem livremente",
      "Conecte os módulos e ligue na tomada 220V",
    ],
    products: [
      {
        name: "Luz de Cascata LED — 200L",
        image: "/natal/cascata.png",
        description:
          "Cascata de 4,7m de largura por 0,5m de altura, com plugue e drive. Emendável em sequência.",
        specs: [
          { label: "Tamanho", value: "4,7m de largura x 0,5m de altura" },
          { label: "Espaço entre cordas", value: "12cm" },
          { label: "Distância entre LED", value: "7cm" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
          { label: "Conexão", value: "Conector macho/fêmea + plugue e drive" },
        ],
        variants: [
          { code: "50539", ledColor: "Branco", wireColor: "Transparente", swatch: SWATCH["Branco"] },
          { code: "50540", ledColor: "Branco Quente", wireColor: "Transparente", swatch: SWATCH["Branco Quente"] },
        ],
      },
    ],
    commercial:
      "Venda por unidade. Emendável em sequência para beirais longos.",
  },
  {
    slug: "fio-de-cobre-pvc",
    name: "Fio de Cobre c/ PVC",
    icon: "🪢",
    photo: "/natal/app-cordoes-led.jpg",
    whatIs:
      "Fio ultra maleável de cobre revestido com PVC, que mantém a forma que você modelar.",
    whyThis:
      "Perfeito para contornar objetos delicados, vasos, guirlandas e arranjos.",
    applications: [
      "Vaso de vidro e garrafas decorativas",
      "Guirlandas e arranjos de mesa",
      "Esculturas e palavras na parede",
    ],
    installSteps: [
      "Molde o fio manualmente sobre a superfície desejada",
      "Ligue a fonte na tomada 220V",
      "Selecione uma das 8 funções",
    ],
    products: [
      {
        name: "Luz LED — Fio de cobre 200L (20m)",
        image: "/natal/fio-cobre.png",
        videos: [
          { code: "50714", color: "Branco", swatch: SWATCH["Branco"], src: "/natal/videos/fio-cobre-200l-branco.mp4" },
          { code: "50715", color: "Branco Quente", swatch: SWATCH["Branco Quente"], src: "/natal/videos/fio-cobre-200l-branco-quente.mp4" },
          { code: "50716", color: "Multicolorido", swatch: SWATCH["Multicolorido"], src: "/natal/videos/fio-cobre-200l-multicolorido.mp4" },
        ],
        description:
          "Fio de cobre revestido com PVC, maleável e com 8 funções de efeito.",
        specs: [
          { label: "Comprimento", value: "20m" },
          { label: "LEDs", value: "200 LEDs" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
          { label: "Funções", value: "8 funções" },
        ],
        variants: [
          { code: "50714", ledColor: "Branco", wireColor: "Branco", swatch: SWATCH["Branco"] },
          { code: "50715", ledColor: "Branco Quente", wireColor: "Branco", swatch: SWATCH["Branco Quente"] },
          { code: "50716", ledColor: "Multicolorido", wireColor: "Branco", swatch: SWATCH["Multicolorido"] },
        ],
      },
      {
        name: "Luz LED — Fio de cobre 500L (50m)",
        image: "/natal/fio-cobre.png",
        videos: [
          { code: "50717", color: "Branco", swatch: SWATCH["Branco"], src: "/natal/videos/fio-cobre-500l-branco.mp4" },
          { code: "50718", color: "Branco Quente", swatch: SWATCH["Branco Quente"], src: "/natal/videos/fio-cobre-500l-branco-quente.mp4" },
          { code: "50719", color: "Multicolorido", swatch: SWATCH["Multicolorido"], src: "/natal/videos/fio-cobre-500l-multicolorido.mp4" },
        ],
        description:
          "Versão longa do fio de cobre, para árvores grandes e ambientes inteiros.",
        specs: [
          { label: "Comprimento", value: "50m" },
          { label: "LEDs", value: "500 LEDs" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
          { label: "Funções", value: "8 funções" },
        ],
        variants: [
          { code: "50717", ledColor: "Branco", wireColor: "Branco", swatch: SWATCH["Branco"] },
          { code: "50718", ledColor: "Branco Quente", wireColor: "Branco", swatch: SWATCH["Branco Quente"] },
          { code: "50719", ledColor: "Multicolorido", wireColor: "Branco", swatch: SWATCH["Multicolorido"] },
        ],
      },
    ],
    commercial:
      "Venda por unidade. Ideal para artesanato, eventos e decoração detalhada.",
  },
  {
    slug: "fio-de-cobre-solar",
    name: "Fio de Cobre c/ PVC (Painel Solar)",
    icon: "☀️",
    photo: "/natal/app-cordoes-led.jpg",
    whatIs:
      "Fio de cobre com alimentação 100% solar, controle remoto e app via Bluetooth.",
    whyThis:
      "Resolve locais onde não existe ponto elétrico. Carrega de dia e acende automaticamente ao anoitecer.",
    applications: [
      "Jardins externos e árvores distantes",
      "Sacadas e pergolados sem tomada",
      "Fachadas e portões de acesso",
    ],
    installSteps: [
      "Fixe a espeto do painel solar em local ensolarado",
      "Desenrole o fio no ambiente desejado",
      "Controle cor e funções pelo controle remoto ou aplicativo móvel",
    ],
    products: [
      {
        name: "Luz LED — Fio de cobre Revestido c/ PVC (Painel solar) — 100L (10m)",
        image: "/natal/fio-cobre-app.png",
        description:
          "Fio de cobre alimentado por painel solar, com 8 funções, controle remoto e controle por aplicativo.",
        specs: [
          { label: "Comprimento", value: "10m" },
          { label: "LEDs", value: "100 LEDs" },
          { label: "Alimentação", value: "Painel solar" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
          { label: "Funções", value: "8 funções" },
          { label: "Controle", value: "Controle remoto + aplicativo" },
        ],
        variants: [
          { code: "50723", ledColor: "Multicolorido", wireColor: "Transparente", swatch: SWATCH["Multicolorido"] },
        ],
      },
    ],
    commercial:
      "Venda por unidade com painel solar, controle remoto e suporte inclusos.",
  },
  {
    slug: "cordao-led-decorativo",
    name: "Cordão LED Decorativo",
    icon: "🎐",
    photo: "/natal/app-cordoes-decorativos.jpg",
    whatIs:
      "Cordões em que cada ponto de luz possui formato temático próprio.",
    whyThis:
      "Decoram por si sós: lanternas metálicas, dentes de leão, bolas brancas e explosões de fogos.",
    applications: [
      "Quarto, varanda e área gourmet",
      "Vitrine e provador de loja",
      "Mesa posta e recepção de evento",
      "Cabeceira de cama e estante",
    ],
    installSteps: [
      "Escolha o formato conforme o clima do ambiente",
      "Pendure com gancho adesivo ou prendedor",
      "Deixe sobras soltas para o cordão cair natural",
      "Ligue na tomada 220V",
    ],
    products: [
      {
        name: "Cordão Fogos de Artifício LED — 500L",
        image: "/natal/fogos-500l.png",
        description:
          "Painel de mini-explosões de luz (55cm de altura x 2m de largura) para paredes e beirais.",
        specs: [
          { label: "Tamanho", value: "A 55cm x L 200cm" },
          { label: "LEDs", value: "24 LEDs/m (500 no total)" },
          { label: "Distância entre LED", value: "10cm" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
          { label: "Extras", value: "Plugue e drive" },
        ],
        variants: [
          { code: "50689", ledColor: "Branco Quente", wireColor: "Transparente", swatch: SWATCH["Branco Quente"] },
        ],
      },
      {
        name: "Cordão Dente de Leão LED",
        image: "/natal/dente-leao.png",
        description:
          "Pompons brancos difusos que espalham a luz, como flores de dente-de-leão.",
        specs: [
          { label: "Comprimento", value: "2,85m + 30cm de cabo de plugue" },
          { label: "LEDs", value: "20 LEDs/m" },
          { label: "Distância entre LED", value: "10cm" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
          { label: "Extras", value: "Plugue e drive" },
        ],
        variants: [
          { code: "50687", ledColor: "Branco", wireColor: "Transparente", swatch: SWATCH["Branco"] },
        ],
      },
      {
        name: "Cordão Lanterna Metálica LED",
        image: "/natal/lanterna.png",
        description: "Lanternas metálicas vazadas de 2,5cm em cordão de 1,35m — luz aconchegante.",
        specs: [
          { label: "Comprimento", value: "1,35m + 30cm de extensão" },
          { label: "Diâmetro da lanterna", value: "2,5cm" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 20", plain: "uso interno" },
        ],
        variants: [
          { code: "50688", ledColor: "Branco Quente", wireColor: "Transparente", swatch: SWATCH["Branco Quente"] },
        ],
      },
      {
        name: "Cordão Decoração de Bola Branca — 100L",
        image: "/natal/bola-branca.png",
        description:
          "Cordão de 10m com bolas brancas difusas, que suavizam a luz em vez de apontar o LED.",
        specs: [
          { label: "Comprimento", value: "10m" },
          { label: "LEDs", value: "100 LEDs" },
          { label: "Distância entre LED", value: "10cm" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 20", plain: "uso interno" },
          { label: "Extras", value: "Plugue e drive" },
        ],
        variants: [
          { code: "50686", ledColor: "Branco Quente", wireColor: "Transparente", swatch: SWATCH["Branco Quente"] },
        ],
      },
    ],
    commercial:
      "Venda por unidade. Solicite orçamento por quantidade para lojas e eventos.",
  },
];
