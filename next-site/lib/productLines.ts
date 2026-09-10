/**
 * Catálogo das linhas de iluminação técnica em formato legível por máquina.
 *
 * Fonte única dos arquivos `/llms.txt` e `/llms-full.txt`. As páginas em
 * `app/produtos/*` continuam sendo a apresentação visual; aqui ficam apenas
 * os fatos que interessam a um crawler ou a um modelo de linguagem
 * respondendo perguntas sobre os produtos (especificações, códigos,
 * aplicações). O catálogo natalino tem sua própria fonte em
 * `lib/natalCatalog.ts`.
 */

import type { FamilyBrand } from "@/lib/familyTheme";

export interface ProductModel {
  /** Código de catálogo do fabricante ("—" quando a linha não usa código) */
  code: string;
  power: string;
  flux: string;
}

export interface ProductLine {
  /** Caminho da página, relativo à raiz do site */
  path: string;
  /** Marca do Grupo 3G a que a linha pertence — agrupa as linhas por marca
   *  no llms.txt, espelhando a separação das páginas `/3g` e `/ebron` */
  brand: FamilyBrand;
  name: string;
  /** Uma frase de posicionamento — usada no índice curto do llms.txt */
  summary: string;
  /** Pares "Rótulo: valor" com as especificações principais */
  specs: readonly string[];
  models?: readonly ProductModel[];
  applications?: readonly string[];
}

export const productLines: readonly ProductLine[] = [
  {
    path: "/produtos/modulo",
    brand: "3g",
    name: "Refletor Modular",
    summary:
      "Refletor LED modular em alumínio injetado, com módulos independentes que permitem ajustar a potência e trocar peças sem substituir o conjunto.",
    specs: [
      "Eficiência luminosa: 150 lm/W",
      "Grau de proteção: IP66",
      "Vida útil: 50.000 h (L70)",
      "Corpo: alumínio injetado com aletas de dissipação e pintura eletrostática",
      "Driver: LED-100W, proteção contra surtos de 6 kV, eficiência ≥90%, IP66",
      "Eixo de rotação graduado de 30° a 90° para travar o ângulo de projeção",
      "Construção modular: módulos acopláveis para compor a potência do projeto",
    ],
    applications: [
      "Iluminação industrial",
      "Fachadas e áreas externas",
      "Quadras e campos esportivos",
      "Pátios e estacionamentos",
    ],
  },
  {
    path: "/produtos/luminaria-solar",
    brand: "3g",
    name: "Luminária Solar",
    summary:
      "Luminária pública solar All-in-One: painel monocristalino, bateria de lítio e módulos de LED integrados em uma única estrutura, sem ligação à rede elétrica.",
    specs: [
      "Sistema: All-in-One (painel, bateria, controlador e LED integrados)",
      "Bateria: Lítio Ferro Fosfato (LiFePO4), 2.000 ciclos",
      "Controlador de carga: MPPT",
      "Autonomia: até 3 dias de chuva contínua",
      "Grau de proteção: IP66",
      "Painel: monocristalino, carrega mesmo em dias nublados",
      "Instalação sem cabeamento externo até a rede elétrica",
      "Suporte com braçadeira em alumínio para encaixe direto no tubo do poste",
      "Eixo de rotação graduado por módulo de LED, com ajuste independente",
    ],
    models: [
      { code: "—", power: "60W", flux: "7.000 lm" },
      { code: "—", power: "90W", flux: "8.900 lm" },
      { code: "—", power: "120W", flux: "11.000 lm" },
      { code: "—", power: "150W", flux: "15.000 lm" },
    ],
    applications: [
      "Vias públicas sem rede elétrica",
      "Áreas rurais",
      "Praças e parques",
      "Condomínios",
    ],
  },
  {
    path: "/produtos/luminaria-homologada",
    brand: "3g",
    name: "Luminária Homologada",
    summary:
      "Luminária de iluminação pública construída sob os requisitos das concessionárias de energia, com base de sete pinos para telegestão e a maior eficácia luminosa da linha.",
    specs: [
      "Eficácia luminosa: 160 lm/W",
      "Grau de proteção: IP66 · Resistência a impacto: IK08",
      "Protetor de surto: 10 kV / 5 kA integrado",
      "Vida útil: 60.000 h",
      "Temperatura de cor: 5000K · IRC >70 · Fator de potência >0,98",
      "Corpo: alumínio injetado sob alta pressão",
      "Base de sete pinos conforme NBR IEC 61610, pronta para telegestão",
      "Braço angular ajustável de 120° a 260°",
      "Lentes de PMMA, ângulo 150°/160°, distribuição transversal Tipo II",
      "Temperatura ambiente de operação: -5 °C a 50 °C",
      "Válvula de escape para alívio de pressão interna",
    ],
    models: [
      { code: "50501", power: "50W", flux: "8.000 lm" },
      { code: "50502", power: "100W", flux: "16.000 lm" },
      { code: "50503", power: "150W", flux: "24.000 lm" },
      { code: "50504", power: "200W", flux: "32.000 lm" },
    ],
    applications: [
      "Iluminação pública de concessionárias",
      "Vias urbanas e rodovias",
      "Projetos com telegestão",
    ],
  },
  {
    path: "/produtos/ebron",
    brand: "ebron",
    name: "Luminária EBRON",
    summary:
      "Luminária pública de corpo slim em alumínio, focada em custo-benefício para iluminação urbana, com projeção lateral ampla de 120°.",
    specs: [
      "Eficácia luminosa: 100 lm/W",
      "Grau de proteção: IP66",
      "Ângulo de projeção: 120°",
      "Vida útil: 25.000 h",
      "Temperatura de cor: 5000K · IRC ≥80 · Fator de potência ≥0,92",
      "Corpo: liga de alumínio, design slim aerodinâmico",
      "Dissipação térmica integrada à carcaça",
      "Protetor contra surtos elétricos (opcional)",
      "Versão: EBRON 2024",
    ],
    models: [
      { code: "50612", power: "50W", flux: "5.000 lm" },
      { code: "50613", power: "100W", flux: "10.000 lm" },
      { code: "50614", power: "150W", flux: "15.000 lm" },
      { code: "50615", power: "200W", flux: "20.000 lm" },
      { code: "50616", power: "300W", flux: "30.000 lm" },
    ],
    applications: ["Vias urbanas", "Condomínios", "Áreas comuns e pátios"],
  },
  {
    path: "/produtos/ebron-pro",
    brand: "ebron",
    name: "Luminária EBRON PRO",
    summary:
      "Versão reforçada da linha EBRON, com 130 lm/W, corpo em alumínio e policarbonato e base para relé fotoelétrico embutida.",
    specs: [
      "Eficácia luminosa: 130 lm/W",
      "Grau de proteção: IP66",
      "Ângulo de projeção: 80° a 150°",
      "Vida útil: 25.000 h",
      "Temperatura de cor: 5000K · IRC ≥80 · Fator de potência ≥0,92",
      "Material: alumínio + policarbonato",
      "Base para relé fotoelétrico embutida",
      "Versão: EBRON PRO 2026",
    ],
    models: [
      { code: "50899", power: "50W", flux: "6.500 lm" },
      { code: "50900", power: "100W", flux: "13.000 lm" },
      { code: "50901", power: "150W", flux: "19.500 lm" },
      { code: "50902", power: "200W", flux: "26.000 lm" },
    ],
    applications: [
      "Vias públicas, rodovias e túneis",
      "Parques e praças",
      "Condomínios",
      "Portos",
      "Ciclovias",
      "Estacionamentos",
    ],
  },
];
