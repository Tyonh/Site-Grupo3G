/**
 * Catálogo natalino do Grupo 3G — dados extraídos do "Catálogo Natal 2026".
 * Cada categoria segue o template de página em camadas:
 * o que é → por que esse → onde aplicar → como instalar → ficha técnica →
 * variações → condições comerciais.
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

export interface NatalProduct {
  name: string;
  /** Imagem do produto extraída do catálogo (em /public/natal) */
  image?: string;
  /** Vídeos por cor — habilita o showcase com troca de cor */
  videos?: NatalProductVideo[];
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
  /** "left" trava o vídeo na metade esquerda do painel e o texto na direita */
  mediaAlign?: "center" | "left";
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

const SWATCH: Record<string, string> = {
  Branco: "#f8fafc",
  "Branco Quente": "#ffd9a0",
  "Branco Neutro": "#f1f0e8",
  Multicolorido: "#d33f55",
  Azul: "#2563eb",
  Vermelho: "#a62024",
  Verde: "#386d24",
  "Âmbar": "#ffbf00",
  Dourado: "#e3b84e",
  Roxo: "#7c3aed",
  Rosa: "#ec4899",
  "Aquamarine Azul": "#22d3ee",
  "Branco e verde": "#9ccc9c",
};

export function swatchFor(color: string): string {
  return SWATCH[color] ?? "#e3b84e";
}

export const natalCategories: NatalCategory[] = [
  {
    slug: "cordoes-led",
    photo: "/natal/app-cordoes-led.jpg",
    video: "/natal/videos/cordoes-entrada-branco.mp4",
    mediaBg: "white",
    mediaAlign: "left",
    name: "Cordões de LED",
    icon: "✨",
    whatIs:
      "Fio flexível com LEDs distribuídos ao longo do comprimento — o item mais versátil da decoração natalina.",
    whyThis:
      "Comparado à mangueira, o cordão é mais leve, mais fácil de moldar e ideal para contornos delicados (janelas, árvores, corrimãos). Se a ideia é contornar uma fachada inteira com luz contínua e uniforme, a mangueira é a melhor escolha; para pontos de luz individuais e brilho 'estrelado', o cordão vence.",
    applications: [
      "Contorno de telhado",
      "Moldura de janelas e portas",
      "Árvore de Natal",
      "Corrimão de escada",
      "Varanda e pergolado",
      "Vitrine de loja",
    ],
    installSteps: [
      "Meça o trajeto e escolha o comprimento (2,5m, 5m, 10m ou 100m)",
      "Fixe com abraçadeiras plásticas ou ganchos adesivos, sem apertar o fio",
      "Conecte os cordões entre si pelo conector macho/fêmea (nas versões 10m)",
      "Ligue o plugue à tomada 220V — nas versões com drive, escolha uma das 8 funções",
    ],
    products: [
      {
        name: "Cordão de LED com Drive — 50L (2,5m)",
        image: "/natal/cordao-drive.png",
        description:
          "Cordão curto com plugue e controlador de 8 funções. Ideal para árvores e molduras pequenas.",
        specs: [
          { label: "Comprimento", value: "2,5m + 0,5m de cabo" },
          { label: "LEDs", value: "5 LEDs/m (50 no total)" },
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
          { label: "Comprimento", value: "5m + 0,5m de cabo" },
          { label: "LEDs", value: "10 LEDs/m (100 no total)" },
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
      {
        name: "Cordão de LED — 100L (10m) fio escuro ou transparente",
        image: "/natal/cordao-10m-escuro.png",
        description:
          "Cordão profissional emendável: conector macho/fêmea permite ligar vários em sequência. A cada 5 unidades acompanha plugue grátis.",
        specs: [
          { label: "Comprimento", value: "10m" },
          { label: "LEDs", value: "10 LEDs/m (100 no total)" },
          { label: "Voltagem", value: "220V" },
          {
            label: "Proteção",
            value: "IP 44",
            plain: "protegido contra respingos — pode usar em área externa coberta",
          },
          { label: "Conexão", value: "Conector macho/fêmea (emendável)" },
        ],
        variants: [
          { code: "50997", ledColor: "Branco", wireColor: "Escuro", swatch: SWATCH["Branco"] },
          { code: "50998", ledColor: "Branco Quente", wireColor: "Escuro", swatch: SWATCH["Branco Quente"] },
          { code: "51002", ledColor: "Âmbar", wireColor: "Escuro", swatch: SWATCH["Âmbar"] },
          { code: "51000", ledColor: "Verde", wireColor: "Escuro", swatch: SWATCH["Verde"] },
          { code: "50999", ledColor: "Azul", wireColor: "Escuro", swatch: SWATCH["Azul"] },
          { code: "51001", ledColor: "Vermelho", wireColor: "Escuro", swatch: SWATCH["Vermelho"] },
          { code: "50991", ledColor: "Branco", wireColor: "Transparente", swatch: SWATCH["Branco"] },
          { code: "50992", ledColor: "Branco Quente", wireColor: "Transparente", swatch: SWATCH["Branco Quente"] },
          { code: "50996", ledColor: "Âmbar", wireColor: "Transparente", swatch: SWATCH["Âmbar"] },
          { code: "50994", ledColor: "Verde", wireColor: "Transparente", swatch: SWATCH["Verde"] },
          { code: "50993", ledColor: "Azul", wireColor: "Transparente", swatch: SWATCH["Azul"] },
          { code: "50995", ledColor: "Vermelho", wireColor: "Transparente", swatch: SWATCH["Vermelho"] },
        ],
      },
      {
        name: "Cordão de LED — 100L Strobo (20 LEDs piscando)",
        image: "/natal/cordao-strobo.png",
        description:
          "Mesmo formato do cordão 10m, mas com 20 LEDs em efeito estroboscópico intercalado — brilho 'cintilante' sem controlador.",
        specs: [
          { label: "Comprimento", value: "10m + 0,5m de cabo" },
          { label: "LEDs", value: "10 LEDs/m — 20 piscando (strobo)" },
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
        name: "Cordão de LED — 100m (rolo)",
        image: "/natal/cordao-100m.png",
        description:
          "Rolo fechado para grandes projetos: praças, fachadas de prédio e decoração urbana. Fio na cor do LED.",
        specs: [
          { label: "Comprimento", value: "100m + 0,5m de cabo" },
          { label: "LEDs", value: "10 LEDs/m (1.000 no total)" },
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
        name: "Cordão de LED — Fio de cobre revestido c/ PVC",
        image: "/natal/fio-cobre-app.png",
        description:
          "Fio de cobre maleável revestido, com 8 funções — modela em qualquer forma. Disponível também em versão com painel solar (sem tomada).",
        specs: [
          { label: "Comprimentos", value: "20m (200L) ou 50m (500L)" },
          { label: "Voltagem", value: "220V (ou painel solar)" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
          { label: "Funções", value: "8 funções" },
        ],
        variants: [
          { code: "50714", ledColor: "Branco", wireColor: "Branco", swatch: SWATCH["Branco"] },
          { code: "50715", ledColor: "Branco Quente", wireColor: "Branco", swatch: SWATCH["Branco Quente"] },
          { code: "50716", ledColor: "Multicolorido", wireColor: "Branco", swatch: SWATCH["Multicolorido"] },
          { code: "50717", ledColor: "Branco (500L)", wireColor: "Branco", swatch: SWATCH["Branco"] },
          { code: "50718", ledColor: "Branco Quente (500L)", wireColor: "Branco", swatch: SWATCH["Branco Quente"] },
          { code: "50719", ledColor: "Multicolorido (500L)", wireColor: "Branco", swatch: SWATCH["Multicolorido"] },
          { code: "50723", ledColor: "Multicolorido (app + controle)", wireColor: "Transparente", swatch: SWATCH["Multicolorido"] },
        ],
      },
    ],
    commercial:
      "Venda por unidade ou rolo fechado (100m). Nas versões 10m, a cada 5 unidades acompanha plugue grátis. Para volume (lojas, condomínios, projetos), solicite orçamento por quantidade.",
  },
  {
    slug: "cortina-cascata-rede",
    photo: "/natal/app-cortina-cascata-rede.jpg",
    name: "Cortina, Cascata & Rede",
    icon: "🌊",
    whatIs:
      "Cordões pré-montados em formato de painel: fios verticais que caem como cortina, cascata de luz ou malha em rede.",
    whyThis:
      "Enquanto o cordão comum exige moldar fio por fio, esses formatos já vêm prontos para cobrir áreas inteiras: a cortina fecha um vão (porta, janela, sacada), a cascata cria efeito de 'água escorrendo' em beirais e a rede cobre arbustos e cercas de uma vez.",
    applications: [
      "Sacadas e varandas de apartamento",
      "Vitrine de loja (fundo de luz)",
      "Beiral de telhado (cascata)",
      "Arbustos e cercas-vivas (rede)",
      "Palcos e cenários de eventos",
    ],
    installSteps: [
      "Estique a fiação principal na horizontal (trilho, beiral ou varão)",
      "Deixe os fios verticais caírem naturalmente, sem emaranhar",
      "Conecte à tomada 220V pelo plugue com drive",
      "Emende painéis em sequência pelos conectores macho/fêmea",
    ],
    products: [
      {
        name: "Luz de Cortina LED — 400L",
        image: "/natal/cortina.png",
        description: "Painel de 3m de largura por 2m de altura, brilho branco quente.",
        specs: [
          { label: "Tamanho", value: "3m largura × 2m altura" },
          { label: "LEDs", value: "400" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
          { label: "Conexão", value: "Plugue com drive + emenda macho/fêmea" },
        ],
        variants: [
          { code: "50713", ledColor: "Branco Quente", wireColor: "Transparente", swatch: SWATCH["Branco Quente"] },
        ],
      },
      {
        name: "Luz de Cascata LED — 200L",
        image: "/natal/cascata.png",
        description: "Efeito de luz escorrendo, para beirais e marquises (70 × 220cm).",
        specs: [
          { label: "Tamanho", value: "70 × 220cm" },
          { label: "Espaço entre cordas", value: "12cm" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
        ],
        variants: [
          { code: "50539", ledColor: "Branco", wireColor: "Transparente", swatch: SWATCH["Branco"] },
          { code: "50540", ledColor: "Branco Quente", wireColor: "Transparente", swatch: SWATCH["Branco Quente"] },
        ],
      },
      {
        name: "Luz de Rede LED — 176L",
        image: "/natal/rede.png",
        description: "Malha de 4,7m × 0,5m que veste arbustos e grades de uma só vez.",
        specs: [
          { label: "Tamanho", value: "4,7m largura × 0,5m altura" },
          { label: "LEDs", value: "176" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
        ],
        variants: [
          { code: "50691", ledColor: "Branco Quente", wireColor: "Transparente", swatch: SWATCH["Branco Quente"] },
        ],
      },
    ],
    commercial:
      "Venda por unidade. Painéis emendáveis — para fachadas grandes, calcule 1 painel por vão e peça orçamento por quantidade.",
  },
  {
    slug: "mangueira-led",
    photo: "/natal/app-mangueira-led.jpg",
    name: "Mangueira de LED",
    icon: "💡",
    whatIs:
      "Tubo flexível e resistente com LEDs internos — luz contínua e uniforme, feita para ficar exposta ao tempo.",
    whyThis:
      "É a opção mais robusta para contorno de fachadas inteiras: aguenta chuva (IP 65), pode ser cortada de metro em metro e mantém linha de luz contínua — onde o cordão mostra 'pontinhos', a mangueira desenha um traço. Para efeitos delicados em árvores, prefira o cordão.",
    applications: [
      "Contorno de fachada inteira",
      "Portais e arcos de entrada",
      "Degraus e rampas externas",
      "Letreiros de grande formato",
      "Contorno de muros e grades",
    ],
    installSteps: [
      "Meça o trajeto e corte a mangueira nos pontos de corte marcados (metro em metro)",
      "Fixe com clips de mangueira LED parafusados a cada 50cm",
      "Instale o conector/plugue na ponta cortada",
      "Ligue à tomada 220V",
    ],
    products: [
      {
        name: "Mangueira LED — rolo 100m",
        image: "/natal/mangueira-led.png",
        description: "Rolo fechado com 24 LEDs por metro, para projetos de fachada.",
        specs: [
          { label: "Comprimento", value: "100m (cortável de metro em metro)" },
          { label: "LEDs", value: "24 LEDs/m" },
          { label: "Voltagem", value: "220V" },
          {
            label: "Proteção",
            value: "IP 65",
            plain: "à prova de jato d'água — uso externo direto",
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
        description:
          "Luz neon contínua em 360 graus, 240 LEDs/m — acabamento premium para letreiros e contornos vistos de qualquer ângulo.",
        specs: [
          { label: "Comprimento", value: "50m (cortável de metro em metro)" },
          { label: "LEDs", value: "240 LEDs/m" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 65 (corpo IP 68)", plain: "uso externo direto" },
        ],
        variants: [
          { code: "50839", ledColor: "Branco", swatch: SWATCH["Branco"] },
          { code: "50840", ledColor: "Branco Quente", swatch: SWATCH["Branco Quente"] },
          { code: "50841", ledColor: "Azul", swatch: SWATCH["Azul"] },
          { code: "50842", ledColor: "Vermelho", swatch: SWATCH["Vermelho"] },
          { code: "50843", ledColor: "Verde", swatch: SWATCH["Verde"] },
          { code: "50844", ledColor: "Aquamarine Azul", swatch: SWATCH["Aquamarine Azul"] },
          { code: "50845", ledColor: "Roxo", swatch: SWATCH["Roxo"] },
          { code: "50846", ledColor: "Rosa", swatch: SWATCH["Rosa"] },
          { code: "50847", ledColor: "Dourado", swatch: SWATCH["Dourado"] },
        ],
      },
    ],
    commercial:
      "Venda por rolo fechado (50m ou 100m). Acessórios de conexão vendidos separadamente. Orçamento por metragem para projetos de fachada.",
  },
  {
    slug: "fitas-led",
    photo: "/natal/app-fitas-led.jpg",
    name: "Fitas de LED",
    icon: "🎗️",
    whatIs:
      "Fita adesiva plana com LEDs de alta densidade — luz forte e uniforme para embutir e contornar superfícies retas.",
    whyThis:
      "A fita tem o dobro (ou mais) de LEDs por metro que a mangueira: 200 a 250 LEDs/m. É a escolha para letreiros, sancas e móveis, onde a luz precisa ser intensa e 'sem pontinhos'. Para curvas acentuadas e uso externo pesado, a mangueira leva vantagem.",
    applications: [
      "Letreiros e comunicação visual",
      "Contorno de balcão e prateleiras de loja",
      "Sanca de gesso embutida",
      "Espelhos e nichos decorativos",
      "Bancadas de eventos",
    ],
    installSteps: [
      "Limpe e seque a superfície de fixação",
      "Corte a fita no ponto de corte marcado (metro em metro)",
      "Cole pela face adesiva pressionando firme",
      "Conecte o plugue/driver e ligue em 220V",
    ],
    products: [
      {
        name: "Fita de LED Neon — 50m / 100m",
        image: "/natal/fita-neon.png",
        description: "Efeito neon difuso contínuo, 200 LEDs por metro.",
        specs: [
          { label: "Comprimento", value: "rolos de 50m ou 100m" },
          { label: "LEDs", value: "200 LEDs/m" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 65", plain: "uso externo direto" },
          { label: "Corte", value: "de metro em metro" },
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
        name: "Fita de LED SMD — 50m / 100m",
        image: "/natal/fita-smd.png",
        description: "Fita de alta densidade com 250 LEDs por metro, luz pontual intensa.",
        specs: [
          { label: "Comprimento", value: "rolos de 50m ou 100m" },
          { label: "LEDs", value: "250 LEDs/m" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 65", plain: "uso externo direto" },
          { label: "Corte", value: "de metro em metro" },
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
    ],
    commercial:
      "Venda por rolo fechado (50m ou 100m). Ideal para revenda em lojas de material elétrico e decoração — consulte condições por lote.",
  },
  {
    slug: "sputink-meteoro-strobe",
    photo: "/natal/app-sputink-meteoro-strobe.jpg",
    name: "Sputink, Meteoro & Strobe",
    icon: "🎆",
    whatIs:
      "Efeitos especiais de luz: explosão de fogos (Sputink), chuva de luz caindo (Meteoro) e flash pulsante (Strobe).",
    whyThis:
      "São os itens de destaque pontual — enquanto cordões e mangueiras 'desenham' o ambiente, esses criam o ponto focal que chama atenção de longe: um Sputink no jardim ou um meteoro no beiral transforma a decoração comum em espetáculo.",
    applications: [
      "Destaque em jardim e canteiro",
      "Vitrine com efeito 'explosão de luz'",
      "Beirais com chuva de meteoro",
      "Toldo de loja",
      "Praças e eventos ao ar livre",
    ],
    installSteps: [
      "Escolha o ponto focal (poste, árvore, beiral)",
      "Fixe a haste ou os tubos na estrutura",
      "Conecte o plugue com drive à tomada 220V",
      "Nas versões multifunção, selecione o efeito no controlador",
    ],
    products: [
      {
        name: "Sputink — Fogos de Artifício LED",
        image: "/natal/sputink.png",
        description:
          "Esfera de hastes luminosas que imita explosão de fogos. Três tamanhos: 60cm (320L), 100cm (640L) e 160cm (960L).",
        specs: [
          { label: "Diâmetros", value: "60cm / 100cm / 160cm" },
          { label: "LEDs", value: "320 / 640 / 960" },
          { label: "Altura da haste", value: "1,7m a 2,5m" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
          { label: "Funções", value: "Multifunções com drive" },
        ],
        variants: [
          { code: "50722", ledColor: "Multicolorido (320L)", swatch: SWATCH["Multicolorido"] },
          { code: "50726", ledColor: "Branco (640L)", swatch: SWATCH["Branco"] },
          { code: "50727", ledColor: "Branco Quente (640L)", swatch: SWATCH["Branco Quente"] },
          { code: "50728", ledColor: "Multicolorido (640L)", swatch: SWATCH["Multicolorido"] },
          { code: "50729", ledColor: "Branco (960L)", swatch: SWATCH["Branco"] },
          { code: "50731", ledColor: "Multicolorido (960L)", swatch: SWATCH["Multicolorido"] },
        ],
      },
      {
        name: "Meteoro LED",
        image: "/natal/meteoro.png",
        description:
          "Tubos que acendem em sequência simulando chuva de meteoros. Tamanhos 45cm (288L) e 80cm.",
        specs: [
          { label: "Tamanhos", value: "45cm (288 LEDs) / 80cm" },
          { label: "Distância entre LEDs", value: "10cm" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
        ],
        variants: [
          { code: "51022", ledColor: "Branco", swatch: SWATCH["Branco"] },
          { code: "51023", ledColor: "Branco Quente", swatch: SWATCH["Branco Quente"] },
        ],
      },
      {
        name: "Strobo LED",
        image: "/natal/strobo.png",
        description: "Módulo de flash pulsante para pontos de brilho intermitente.",
        specs: [
          { label: "Dimensões", value: "11,2 × 5,9 × 5cm" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
        ],
        variants: [{ code: "50533", ledColor: "Branco", swatch: SWATCH["Branco"] }],
      },
    ],
    commercial:
      "Venda por unidade. Em projetos de praças e shoppings, os efeitos são combinados em kits — solicite orçamento com a metragem do espaço.",
  },
  {
    slug: "cordoes-decorativos",
    photo: "/natal/app-cordoes-decorativos.jpg",
    name: "Cordões Decorativos",
    icon: "🏮",
    whatIs:
      "Cordões com enfeites acoplados aos LEDs: festão verde, bolas, dente-de-leão, lanternas metálicas e fogos.",
    whyThis:
      "Aqui o enfeite já vem integrado à luz — sem precisar montar guirlanda + cordão separados. É a solução rápida para quem quer volume decorativo (festão) ou peças de destaque (lanternas, bolas) em um único produto.",
    applications: [
      "Guirlandas em portas e escadas (festão)",
      "Marquises e pergolados (bolas e lanternas)",
      "Árvores externas (dente-de-leão)",
      "Mesas e balcões de eventos",
      "Corredores de shopping",
    ],
    installSteps: [
      "Posicione o cordão distribuindo os enfeites de forma uniforme",
      "Fixe pelos pontos entre os enfeites, nunca pelo enfeite",
      "Conecte o plugue com drive à tomada 220V",
    ],
    products: [
      {
        name: "Cordão de Festão LED — 300L",
        image: "/natal/festao-led.png",
        description: "Festão verde denso de 2m com 300 LEDs integrados — guirlanda pronta.",
        specs: [
          { label: "Comprimento", value: "2m" },
          { label: "LEDs", value: "300" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
          { label: "Conexão", value: "Plugue com drive + emenda macho/fêmea" },
        ],
        variants: [
          { code: "50684", ledColor: "Branco Quente", wireColor: "Verde", swatch: SWATCH["Branco Quente"] },
        ],
      },
      {
        name: "Cordão Bola LED — 280L",
        image: "/natal/cordao-bola.png",
        description: "Bolas luminosas de 30cm ou 50cm em cordão, brilho difuso e volumoso.",
        specs: [
          { label: "Tamanhos", value: "bolas de 30cm ou 50cm" },
          { label: "LEDs", value: "280" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
        ],
        variants: [
          { code: "51022", ledColor: "Branco", swatch: SWATCH["Branco"] },
          { code: "51023", ledColor: "Branco Quente", swatch: SWATCH["Branco Quente"] },
          { code: "51024", ledColor: "Azul", swatch: SWATCH["Azul"] },
          { code: "51025", ledColor: "Verde", swatch: SWATCH["Verde"] },
          { code: "51026", ledColor: "Vermelho", swatch: SWATCH["Vermelho"] },
        ],
      },
      {
        name: "Cordão Dente de Leão LED",
        image: "/natal/dente-leao.png",
        description: "Esferas de filamentos delicados (2,85m), efeito de flor de dente-de-leão.",
        specs: [
          { label: "Comprimento", value: "2,85m + 30cm de cabo" },
          { label: "LEDs", value: "20 LEDs/m" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
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
        name: "Cordão Fogos de Artifício LED — 500L",
        image: "/natal/fogos-500l.png",
        description: "Painel de mini-explosões de luz (55cm × 2m) para paredes e beirais.",
        specs: [
          { label: "Tamanho", value: "55cm altura × 2m largura" },
          { label: "LEDs", value: "500 (24 LEDs/m)" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
        ],
        variants: [
          { code: "50689", ledColor: "Branco Quente", wireColor: "Transparente", swatch: SWATCH["Branco Quente"] },
        ],
      },
    ],
    commercial:
      "Venda por unidade. Combine festão + bolas + lanternas para composições completas — orçamento por kit disponível.",
  },
  {
    slug: "mini-arvores",
    photo: "/natal/app-mini-arvores.jpg",
    name: "Mini Árvores Decorativas",
    icon: "🎄",
    whatIs:
      "Árvores de LED prontas, de 50cm a 1,8m, com decoração de bolinhas integrada — é só tirar da caixa e ligar.",
    whyThis:
      "Para quem quer o símbolo do Natal sem montagem: diferente da árvore tradicional (que exige enfeitar), estas já vêm com luz e decoração embutidas. A de 50cm vale para mesas e balcões; a de 1,8m substitui a árvore principal de salas e recepções.",
    applications: [
      "Mesa de recepção de empresa",
      "Vitrine de loja",
      "Escritório e consultório",
      "Hall de prédio",
      "Sala de estar",
    ],
    installSteps: [
      "Retire da caixa e abra a base",
      "Ajuste os galhos e a decoração de bolinhas",
      "Ligue o plugue com drive na tomada 220V",
    ],
    products: [
      {
        name: "Árvore LED com Decoração de Bolinhas — 50cm",
        image: "/natal/mini-arvore-50.png",
        description: "Mini árvore de mesa com 20 LEDs.",
        specs: [
          { label: "Altura", value: "50cm" },
          { label: "LEDs", value: "20" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "pode ficar em varanda coberta" },
        ],
        variants: [{ code: "50698", ledColor: "Branco Quente", swatch: SWATCH["Branco Quente"] }],
      },
      {
        name: "Árvore LED com Decoração de Bolinhas — 1,8m",
        image: "/natal/mini-arvore-18.png",
        description: "Árvore de piso com 144 LEDs, pronta para ser a peça central.",
        specs: [
          { label: "Altura", value: "1,8m" },
          { label: "LEDs", value: "144" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 44", plain: "pode ficar em área coberta" },
        ],
        variants: [{ code: "50690", ledColor: "Branco Quente", swatch: SWATCH["Branco Quente"] }],
      },
      {
        name: "Cordão Decoração de Bola Branca — 100L",
        image: "/natal/bola-branca.png",
        description: "Cordão de 10m com bolas brancas difusas para complementar a árvore.",
        specs: [
          { label: "Comprimento", value: "10m" },
          { label: "LEDs", value: "100" },
          { label: "Voltagem", value: "220V" },
          { label: "Proteção", value: "IP 20", plain: "uso interno" },
        ],
        variants: [
          { code: "50686", ledColor: "Branco Quente", wireColor: "Transparente", swatch: SWATCH["Branco Quente"] },
        ],
      },
    ],
    commercial:
      "Venda por unidade. Para redes de lojas e escritórios, disponível em lote com desconto progressivo.",
  },
  {
    slug: "inflaveis",
    photo: "/natal/app-inflaveis.jpg",
    name: "Infláveis de Natal",
    icon: "⛄",
    whatIs:
      "Personagens gigantes (1,8m a 2m) com motor de ar embutido — Papai Noel, boneco de neve e duende que inflam sozinhos.",
    whyThis:
      "É o item de maior impacto imediato por metro quadrado: nenhum outro produto monta uma decoração de 2 metros em 5 minutos. Perfeito quando o objetivo é atrair olhares de rua — entrada de loja, jardim frontal, eventos.",
    applications: [
      "Entrada de loja",
      "Jardim frontal de casa",
      "Playground de shopping",
      "Eventos e festas ao ar livre",
      "Praça de condomínio",
    ],
    installSteps: [
      "Estenda o inflável no chão e fixe as estacas/cordas",
      "Conecte o motor à tomada",
      "O personagem infla sozinho em poucos minutos",
      "Para guardar, desligue, deixe esvaziar e dobre",
    ],
    products: [
      {
        name: "Boneco de Neve Inflável — 2m",
        image: "/natal/inflavel-boneco-neve.png",
        description: "Boneco de neve gigante com motor embutido.",
        specs: [
          { label: "Altura", value: "2m" },
          { label: "Material", value: "Plástico com motor para encher" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
        ],
        variants: [{ code: "51127", ledColor: "Multicolorido", swatch: SWATCH["Multicolorido"] }],
      },
      {
        name: "Duende Inflável — 1,8m",
        image: "/natal/inflavel-duende.png",
        description: "Duende natalino com motor embutido.",
        specs: [
          { label: "Altura", value: "1,8m" },
          { label: "Material", value: "Plástico com motor para encher" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
        ],
        variants: [{ code: "51132", ledColor: "Multicolorido", swatch: SWATCH["Multicolorido"] }],
      },
      {
        name: "Papai Noel Inflável — 1,8m",
        image: "/natal/inflavel-papai-noel.png",
        description: "O clássico Papai Noel em versão gigante com motor embutido.",
        specs: [
          { label: "Altura", value: "1,8m" },
          { label: "Material", value: "Plástico com motor para encher" },
          { label: "Proteção", value: "IP 44", plain: "área externa coberta" },
        ],
        variants: [{ code: "51131", ledColor: "Multicolorido", swatch: SWATCH["Multicolorido"] }],
      },
      {
        name: "Festão Decorativo",
        image: "/natal/festao-dourado.png",
        description: "Festão verde tradicional em 3 comprimentos, nas cores dourado, verde e vermelho.",
        specs: [
          { label: "Comprimentos", value: "1,5m / 2,4m / 5m" },
          { label: "Material", value: "Plástico decorativo" },
        ],
        variants: [
          { code: "51144", ledColor: "Dourado", swatch: SWATCH["Dourado"] },
          { code: "51145", ledColor: "Verde", swatch: SWATCH["Verde"] },
          { code: "51146", ledColor: "Vermelho", swatch: SWATCH["Vermelho"] },
        ],
      },
    ],
    commercial:
      "Venda por unidade. Para eventos e shoppings, consulte kits com múltiplos personagens.",
  },
  {
    slug: "arvores-gigantes-figuras",
    photo: "/natal/app-arvores-gigantes-figuras.jpg",
    name: "Árvores Gigantes & Figuras 3D",
    icon: "🌟",
    whatIs:
      "Estruturas monumentais de LED: árvores de 2,5m a 8,6m com milhares de LEDs e figuras 3D (rena, estrela, ave, moinho).",
    whyThis:
      "É a linha profissional para espaços públicos — nenhum produto de varejo chega perto das 8.040 lâmpadas da árvore de 8,6m. Estruturas metálicas dimensionadas para ficarem semanas ao ar livre, com presença visual de praça central.",
    applications: [
      "Praça central de cidade",
      "Átrio de shopping center",
      "Área comum de condomínio",
      "Eventos corporativos",
      "Fachada de empresa",
    ],
    installSteps: [
      "Defina o ponto com acesso à energia e piso nivelado",
      "Monte a estrutura metálica por seções (equipe técnica recomendada)",
      "Conecte os circuitos de LED ao quadro de energia",
      "Faça o teste de funções antes da inauguração",
    ],
    products: [
      {
        name: "Árvore de LED — 2,5m / 5m",
        image: "/natal/arvores-gigantes.png",
        description: "Árvores estruturadas com 3.120 LEDs multicoloridos.",
        specs: [
          { label: "Alturas", value: "2,5m (Ø 1,4m) / 5m (Ø 2,1m)" },
          { label: "LEDs", value: "3.120" },
          { label: "Voltagem", value: "220V" },
        ],
        variants: [
          { code: "51027", ledColor: "Multicolorido (2,5m)", swatch: SWATCH["Multicolorido"] },
          { code: "51028", ledColor: "Multicolorido (5m)", swatch: SWATCH["Multicolorido"] },
        ],
      },
      {
        name: "Árvore de LED — 5,6m / 8,6m",
        image: "/natal/arvore-gigante-rosa.png",
        description:
          "As gigantes do catálogo: 7.560 a 8.040 LEDs, diâmetro de base de 4,2m.",
        specs: [
          { label: "Alturas", value: "5,6m / 8,6m" },
          { label: "LEDs", value: "7.560 / 8.040" },
          { label: "Diâmetro da base", value: "4,2m" },
          { label: "Voltagem", value: "220V" },
        ],
        variants: [
          { code: "51029", ledColor: "Multicolorido (5,6m)", swatch: SWATCH["Multicolorido"] },
          { code: "51030", ledColor: "Multicolorido (8,6m)", swatch: SWATCH["Multicolorido"] },
        ],
      },
      {
        name: "Árvore de LED 5m com Moinho",
        image: "/natal/arvore-moinho.png",
        description: "Árvore de 5m com moinho de LED giratório controlado por controle remoto.",
        specs: [
          { label: "Altura", value: "5m (árvore 2,3m + moinho)" },
          { label: "LEDs", value: "8.880" },
          { label: "Extras", value: "Moinho LED com controle" },
        ],
        variants: [{ code: "51031", ledColor: "Multicolorido", swatch: SWATCH["Multicolorido"] }],
      },
      {
        name: "Figuras Luminosas 3D",
        image: "/natal/foto-gigantes.png",
        description:
          "Bolas natalinas, árvore, estrelas, rena 3D e ave natalina em estrutura de LED — cenário fotográfico pronto.",
        specs: [
          { label: "Alturas", value: "1,6m (todas as figuras)" },
          { label: "Larguras", value: "60cm a 4,2m conforme figura" },
          { label: "Voltagem", value: "220V" },
        ],
        variants: [
          { code: "51068", ledColor: "Bolas Natalinas — Multicolorido", swatch: SWATCH["Multicolorido"] },
          { code: "51070", ledColor: "Árvore Natalina — Multicolorido", swatch: SWATCH["Multicolorido"] },
          { code: "51069", ledColor: "Estrelas — Multicolorido", swatch: SWATCH["Multicolorido"] },
          { code: "51072", ledColor: "Rena 3D — Branco Quente", swatch: SWATCH["Branco Quente"] },
          { code: "51071", ledColor: "Ave Natalina — Branco e verde", swatch: SWATCH["Branco e verde"] },
        ],
      },
    ],
    commercial:
      "Venda sob projeto: orçamento inclui estrutura, frete e orientação de montagem. Ideal para prefeituras, shoppings e condomínios — fale com nossa equipe comercial.",
  },
];

export function getCategoryBySlug(slug: string): NatalCategory | undefined {
  return natalCategories.find((c) => c.slug === slug);
}

/** Ambientes usados na home natalina — chamada por ambiente, não por público */
export const natalAmbientes = [
  {
    title: "Decore Fachadas",
    description: "Mangueiras, cordões e cascatas para contornar telhados, muros e varandas.",
    icon: "🏠",
    categories: ["mangueira-led", "cordoes-led", "cortina-cascata-rede"],
  },
  {
    title: "Decore Vitrines",
    description: "Fitas neon, strobo e mini árvores que fazem sua loja brilhar na rua.",
    icon: "🛍️",
    categories: ["fitas-led", "sputink-meteoro-strobe", "mini-arvores"],
  },
  {
    title: "Decore Áreas Comuns",
    description: "Árvores gigantes, figuras 3D e infláveis para praças, halls e condomínios.",
    icon: "🎡",
    categories: ["arvores-gigantes-figuras", "inflaveis", "cordoes-decorativos"],
  },
] as const;
