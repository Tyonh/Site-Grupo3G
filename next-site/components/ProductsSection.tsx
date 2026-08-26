import ProductFamilyHero, {
  type ProductHotspot,
} from "@/components/ProductFamilyHero";

interface ProductFamily {
  kicker: string;
  name: string;
  description: string;
  image: string;
  href: string;
  aspectRatio: string;
  hotspots: ProductHotspot[];
  /** Teste do efeito de revelação: quando presente, o card abre com essa
   *  ilustração vetorial e só troca para a foto real após 3 interações. */
  vectorImage?: string;
}

const families: ProductFamily[] = [
  {
    kicker: "Eficiência Absoluta",
    name: "Refletor Modular",
    description:
      "Desenvolvido com tecnologia LED de alta performance e alumínio injetado, garantindo o melhor gerenciamento térmico e durabilidade do mercado.",
    image: "/modulo-real.png",
    vectorImage: "/modulo-vector.png",
    href: "/produtos/modulo",
    aspectRatio: "4/3",
    hotspots: [
      {
        id: "modulo-lentes",
        label: "Lentes de LED",
        detail:
          "LEDs de alta performance sob lentes ópticas individuais, dispostos em módulos independentes que permitem ajuste de potência e manutenção rápida.",
        top: 38,
        left: 50,
        closeupImage: "/modulo-lentes-closeup.png",
      },
      {
        id: "modulo-eixo",
        label: "Eixo de Rotação",
        detail:
          "Eixo graduado de 30° a 90° nas laterais, permitindo travar o ângulo exato de projeção do refletor na instalação.",
        top: 37,
        left: 11,
        closeupImage: "/modulo-eixo-closeup.png",
      },
      {
        id: "modulo-drive",
        label: "Drive LED",
        detail:
          "Driver LED-100W com proteção contra surtos de 6kV, eficiência acima de 90% e grau IP66, montado sobre as aletas de dissipação.",
        top: 66,
        left: 93,
        closeupImage: "/modulo-drive-closeup.png",
      },
    ],
  },
  {
    kicker: "Energia Solar Autônoma",
    name: "Luminária Solar",
    description:
      "Sistema All-in-One com LED de alta eficiência, painel monocristalino e bateria de Lítio Ferro Fosfato integrados.",
    image: "/solar-helios.png",
    vectorImage: "/solar-vector.png",
    href: "/produtos/luminaria-solar",
    aspectRatio: "1/1",
    hotspots: [
      {
        id: "solar-modulo",
        label: "Módulo de LEDs",
        detail:
          "Módulo de LEDs de alta eficiência acoplado ao conjunto All-in-One, dispensando fiação até a rede elétrica.",
        top: 19,
        left: 50,
        closeupImage: "/solar-modulo-closeup.jpg",
      },
      {
        id: "solar-eixo",
        label: "Eixo de Rotação",
        detail:
          "Eixo graduado de 30° a 30° em cada módulo de LED, permitindo ajustar e travar o ângulo de projeção de forma independente.",
        top: 32,
        left: 61,
        closeupImage: "/solar-eixo-closeup.png",
      },
      {
        id: "solar-suporte",
        label: "Suporte de Fixação",
        detail:
          "Braçadeira em alumínio com parafusos de aperto, encaixando direto no tubo do poste para uma instalação rápida e firme.",
        top: 58,
        left: 50,
        closeupImage: "/solar-suporte-closeup.png",
      },
      {
        id: "solar-bateria",
        label: "Bateria de Lítio",
        detail:
          "Bateria de Lítio Ferro Fosfato (LiFePO4) integrada sob a tampa traseira, com controlador MPPT — sem cabeamento externo, tudo em uma única estrutura.",
        top: 76,
        left: 50,
        closeupImage: "/solar-bateria-closeup.png",
      },
    ],
  },
  {
    kicker: "Iluminação Pública Premium",
    name: "Luminária Homologada",
    description:
      "Desenvolvida sob rigorosos padrões de engenharia para atender aos requisitos das principais concessionárias de energia. Construída em alumínio injetado sob alta pressão com alta eficácia luminosa de 160 lm/W.",
    image: "/familia-homologada.png",
    vectorImage: "/homologada-vector.png",
    href: "/produtos/luminaria-homologada",
    aspectRatio: "3/4",
    hotspots: [
      {
        id: "homologada-leds",
        label: "Módulo de LEDs",
        detail:
          "Lentes de PMMA de alto rendimento com 160 lm/W de eficácia luminosa e IRC ≥70, entregando distribuição de luz uniforme na via.",
        top: 27,
        left: 49,
        closeupImage: "/homologada-leds-closeup.png",
      },
      {
        id: "homologada-dissipador",
        label: "Dissipador de Calor",
        detail:
          "Aletas de dissipação térmica em alumínio, garantindo baixa temperatura de operação e maior vida útil dos LEDs.",
        top: 45,
        left: 48,
        closeupImage: "/homologada-dissipador-closeup.png",
      },
      {
        id: "homologada-base7pinos",
        label: "Base 7 Pinos",
        detail:
          "Base de sete pinos conforme NBR IEC 61610, pronta para telegestão e protetor de surto de 10kV/5kA já integrado.",
        top: 58,
        left: 48,
        closeupImage: "/homologada-base7pinos-closeup.png",
      },
      {
        id: "homologada-eixo",
        label: "Eixo de Rotação",
        detail:
          "Eixo de rotação na base da luminária, permitindo ajustar a inclinação do braço de fixação diretamente no poste.",
        top: 72,
        left: 50,
        closeupImage: "/homologada-eixo-closeup.png",
      },
    ],
  },
  {
    kicker: "Eficiência Urbana",
    name: "Luminária EBRON",
    description:
      "Lançamento 2024. A união de excelente custo-benefício, durabilidade e eficiência de 100 lm/W. Fabricada em corpo de alumínio robusto para alto rendimento térmico.",
    image: "/ebron-helios.png",
    href: "/produtos/ebron",
    aspectRatio: "1/1",
    hotspots: [
      {
        id: "ebron-leds",
        label: "Módulo de LEDs",
        detail:
          "Conjunto de lentes com amplo ângulo de projeção lateral de 120°, otimizando a distribuição de luz com 100 lm/W de eficácia.",
        top: 33,
        left: 50,
      },
      {
        id: "ebron-corpo",
        label: "Corpo em Alumínio",
        detail:
          "Corpo leve e resistente em liga de alumínio, com design slim aerodinâmico e excelente dissipação térmica integrada à carcaça.",
        top: 78,
        left: 50,
      },
    ],
  },
  {
    kicker: "Linha Profissional 2026",
    name: "Luminária EBRON PRO",
    description:
      "Versão reforçada da linha EBRON, com 130 lm/W de eficiência luminosa, IRC ≥80 e corpo em alumínio + policarbonato. Base para relé embutida e ângulo de projeção de até 150°.",
    image: "/ebron-pro.png",
    vectorImage: "/ebron-pro-vector.png",
    href: "/produtos/ebron-pro",
    aspectRatio: "3/4",
    hotspots: [
      {
        id: "ebronpro-leds",
        label: "Módulo de LEDs",
        detail:
          "Módulo de LEDs com 130 lm/W de eficácia luminosa e IRC ≥80, ângulo de projeção ajustável de 80° a 150° para maior alcance na via.",
        top: 25,
        left: 50,
        closeupImage: "/ebronpro-leds-closeup.png",
      },
      {
        id: "ebronpro-base",
        label: "Base de Fixação",
        detail:
          "Base para relé fotoelétrico embutida, pronta para instalação imediata em postes sem adaptações adicionais.",
        top: 87,
        left: 50,
        closeupImage: "/ebronpro-base-closeup.png",
      },
    ],
  },
];

export default function ProductsSection() {
  return (
    <>
      {families.map((family, i) => (
        <ProductFamilyHero
          key={family.href}
          index={i}
          kicker={family.kicker}
          name={family.name}
          description={family.description}
          image={family.image}
          href={family.href}
          aspectRatio={family.aspectRatio}
          hotspots={family.hotspots}
          vectorImage={family.vectorImage}
        />
      ))}
    </>
  );
}
