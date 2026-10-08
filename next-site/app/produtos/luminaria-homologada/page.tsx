import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Cpu, ShieldCheck, Sun, Timer } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomologadaScrollExperience from "@/components/HomologadaScrollExperience";
import styles from "./homologada.module.css";

export const metadata: Metadata = {
  title: "Luminária Homologada | 3G Iluminação",
  description: "Conheça a construção e a aplicação da Luminária Homologada. Iluminação pública de 50 a 200 W, eficácia de 160 lm/W e proteção IP66.",
};
const highlights = [
  { icon: Sun, value: "160", unit: "lm/W", label: "Eficácia luminosa", text: "Mais luz para a potência instalada." },
  { icon: ShieldCheck, value: "IP66", unit: "IK08", label: "Proteção e resistência", text: "Construída para o ambiente externo." },
  { icon: Cpu, value: "10 kV", unit: "/ 5 kA", label: "Proteção contra surtos", text: "Proteção integrada ao conjunto." },
  { icon: Timer, value: "60 mil", unit: "horas", label: "Vida útil nominal", text: "Projetada para longos ciclos de operação." },
];
const features = [
  ["Temperatura de cor", "5000 K"], ["Fator de potência", "> 0,98"],
  ["Índice de reprodução de cor", "> 70"], ["Frequência", "50 / 60 Hz"],
  ["Eficácia luminosa", "160 lm/W"], ["Resistência a impacto", "IK08"],
  ["Grau de proteção", "IP66"], ["Driver incluído", "Sim"],
  ["Proteção contra surtos", "10 kV / 5 kA"], ["Vida útil nominal", "60.000 horas"],
  ["Temperatura ambiente", "−5 a 50 °C"], ["Lentes", "PMMA"],
  ["Ângulo das lentes", "150° / 160°"], ["Distribuição transversal", "Tipo II"],
  ["Distribuição longitudinal", "Média"], ["Corpo", "Alumínio injetado"],
];
const models = [
  ["50501", "50 W", "8.000 lm", "1,38 kg", "530 × 140 × 93"],
  ["50502", "100 W", "16.000 lm", "1,78 kg", "580 × 170,5 × 130"],
  ["50503", "150 W", "24.000 lm", "2,08 kg", "630 × 180 × 140"],
  ["50504", "200 W", "32.000 lm", "2,69 kg", "755 × 210 × 140"],
];

export default function LuminariaHomologadaPage() {
  return <div className={styles.page}>
    <Navbar />
    <main>
      <HomologadaScrollExperience />
      <section className={styles.performance} aria-labelledby="performance-title">
        <div className={styles.sectionHead}><p className={styles.eyebrow}>DESEMPENHO QUE FAZ DIFERENÇA</p><h2 id="performance-title">Eficiência em cada ponto de luz.</h2><p>Uma família desenvolvida para a iluminação pública, com corpo em alumínio injetado sob alta pressão.</p></div>
        <div className={styles.highlights}>{highlights.map(({icon: Icon, value, unit, label, text}) => <article key={label} className={styles.highlight}><Icon size={22} strokeWidth={1.2} /><p className={styles.metric}>{value} <span>{unit}</span></p><h3>{label}</h3><p>{text}</p></article>)}</div>
      </section>
      <section className={styles.construction} aria-labelledby="construction-title">
        <div className={styles.productImage}><span>HOMOLOGADA · 50 W</span><Image src="/homologada-final-poster.png" alt="Luminária Homologada 50 W: conjunto óptico frontal, carcaça e suporte articulado" width={900} height={1100} sizes="(max-width: 767px) 85vw, 40vw" /></div>
        <div className={styles.constructionCopy}><p className={styles.eyebrow}>CONSTRUÇÃO ROBUSTA</p><h2 id="construction-title">Projetada de dentro para fora.</h2><p>Óptica, dissipação e fixação trabalhando em conjunto para o dia a dia da cidade.</p>
          <ol className={styles.parts}>
            <li><span>01</span><div><h3>Dissipação de calor</h3><p>Aletas integradas à carcaça de alumínio para dissipar o calor do conjunto.</p></div></li>
            <li><span>02</span><div><h3>Óptica em PMMA</h3><p>Lentes de alto rendimento com distribuição transversal Tipo II.</p></div></li>
            <li><span>03</span><div><h3>Base de sete pinos</h3><p>Preparada para integração com sistemas de telegestão.</p></div></li>
            <li><span>04</span><div><h3>Instalação ajustável</h3><p>Braço angular com amplitude de 120° a 260° e válvula para alívio de pressão interna.</p></div></li>
          </ol>
        </div>
      </section>
      <section id="ficha-tecnica" className={styles.technical} aria-labelledby="technical-title">
        <div className={styles.sectionHead}><p className={styles.eyebrow}>CADA DETALHE, À SUA DISPOSIÇÃO</p><h2 id="technical-title">Ficha técnica.</h2><p>As informações para especificar seu próximo projeto.</p></div>
        <dl className={styles.specs}>{features.map(([label,value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        <div className={styles.familyHead}><h3>A potência que seu projeto precisa.</h3><p>Quatro opções na mesma família. O modelo apresentado em 3D é a versão de 50 W.</p></div>
        <div className={styles.tableScroll} tabIndex={0} role="region" aria-label="Tabela de modelos; deslize horizontalmente em telas pequenas">
          <table><caption>Modelos, fluxo luminoso e dimensões da Luminária Homologada</caption><thead><tr>{["Código", "Potência", "Fluxo luminoso", "Peso", "Dimensões (mm)"].map(label => <th key={label} scope="col">{label}</th>)}</tr></thead><tbody>{models.map(row => <tr key={row[0]}>{row.map((value,i) => i === 1 ? <th key={i} scope="row">{value}</th> : <td key={i}>{value}</td>)}</tr>)}</tbody></table>
        </div>
      </section>
      <section className={styles.contact}><p className={styles.eyebrow}>DO PRODUTO AO SEU PROJETO</p><h2>Vamos pensar a luz da sua cidade?</h2><a href="https://wa.me/5585986559388" target="_blank" rel="noopener noreferrer">Fale com um especialista <ArrowUpRight size={18} /></a></section>
    </main>
    <Footer />
  </div>;
}
