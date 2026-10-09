import Image from "next/image";
import { ArrowUpRight, Focus, ShieldCheck, Sun, Timer } from "lucide-react";
import EbronNavbar from "@/components/ebron/EbronNavbar";
import Footer from "@/components/Footer";
import EbronScrollExperience from "@/components/EbronScrollExperience";
import styles from "./ebron.module.css";

const highlights = [
  { icon: Sun, value: "100", unit: "lm/W", label: "Eficácia luminosa", text: "5.000 lm na versão de 50 W." },
  { icon: ShieldCheck, value: "IP66", unit: "", label: "Proteção externa", text: "Projetada para exposição ao tempo." },
  { icon: Focus, value: "120°", unit: "", label: "Ângulo de projeção", text: "Conjunto óptico para iluminação de vias." },
  { icon: Timer, value: "25 mil", unit: "horas", label: "Vida útil nominal", text: "Especificação da linha Ebron." },
];

const features = [
  ["Temperatura de cor", "5000 K"], ["Fator de potência", "≥ 0,92"],
  ["Índice de reprodução de cor", "≥ 80"], ["Ângulo de projeção", "120°"],
  ["Eficácia luminosa", "100 lm/W"], ["Grau de proteção", "IP66"],
  ["Vida útil nominal", "25.000 horas"], ["Corpo", "Alumínio"],
  ["Proteção contra surtos", "Opcional"],
];

const models = [
  ["50612", "50 W", "5.000 lm", "38,7 × 12,7 cm"],
  ["50613", "100 W", "10.000 lm", "45,6 × 14,5 cm"],
  ["50614", "150 W", "15.000 lm", "53,0 × 17,8 cm"],
  ["50615", "200 W", "20.000 lm", "60,2 × 19,6 cm"],
  ["50616", "300 W", "30.000 lm", "69,7 × 22,4 cm"],
];

export default function LuminariaEbronPage() {
  return <div className={styles.page}>
    <EbronNavbar />
    <main>
      <EbronScrollExperience />
      <section className={styles.performance} aria-labelledby="ebron-performance-title">
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>DESEMPENHO EM CADA VIA</p>
          <h2 id="ebron-performance-title">O essencial, bem resolvido.</h2>
          <p>Uma família de luminárias urbanas com corpo slim, conjunto óptico frontal e proteção para uso externo.</p>
        </div>
        <div className={styles.highlights}>{highlights.map(({ icon: Icon, value, unit, label, text }) =>
          <article key={label} className={styles.highlight}>
            <Icon size={22} strokeWidth={1.2} aria-hidden="true" />
            <p className={styles.metric}>{value} {unit && <span>{unit}</span>}</p>
            <h3>{label}</h3><p>{text}</p>
          </article>
        )}</div>
      </section>
      <section className={styles.construction} aria-labelledby="ebron-construction-title">
        <div className={styles.productImage}>
          <span>EBRON · 50 W</span>
          <Image src="/ebron50w-poster.png" alt="Luminária Ebron 50 W vista de frente, com conjunto de LEDs e encaixe tubular" width={900} height={1200} sizes="(max-width: 767px) 85vw, 40vw" />
        </div>
        <div className={styles.constructionCopy}>
          <p className={styles.eyebrow}>CONSTRUÇÃO DA EBRON</p>
          <h2 id="ebron-construction-title">Uma forma que trabalha pela luz.</h2>
          <p>O conjunto frontal, a dissipação traseira e o encaixe tubular compõem uma luminária compacta para a cidade.</p>
          <ol className={styles.parts}>
            <li><span>01</span><div><h3>Óptica frontal</h3><p>Conjunto de LEDs sob cobertura transparente.</p></div></li>
            <li><span>02</span><div><h3>Dissipação integrada</h3><p>Barras centrais e laterais incorporadas à carcaça de alumínio.</p></div></li>
            <li><span>03</span><div><h3>Encaixe tubular</h3><p>Base fixa para montagem em braço de poste.</p></div></li>
            <li><span>04</span><div><h3>Vedação transparente</h3><p>Junta perimetral integrada ao fechamento frontal.</p></div></li>
          </ol>
        </div>
      </section>
      <section id="ficha-tecnica" className={styles.technical} aria-labelledby="ebron-technical-title">
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>INFORMAÇÕES PARA ESPECIFICAR</p>
          <h2 id="ebron-technical-title">Ficha técnica.</h2>
          <p>Dados da linha Ebron e dimensões das versões disponíveis.</p>
        </div>
        <dl className={styles.specs}>{features.map(([label, value]) =>
          <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
        )}</dl>
        <div className={styles.familyHead}>
          <h3>Encontre a potência para o seu projeto.</h3>
          <p>O modelo apresentado em 3D é o Ebron de 50 W. As demais versões estão listadas abaixo.</p>
        </div>
        <div className={styles.tableScroll} tabIndex={0} role="region" aria-label="Tabela de modelos Ebron; deslize horizontalmente em telas pequenas">
          <table>
            <caption>Modelos Ebron, fluxo luminoso e dimensões</caption>
            <thead><tr>{["Código", "Potência", "Fluxo luminoso", "Dimensões (A × L)"].map(label => <th key={label} scope="col">{label}</th>)}</tr></thead>
            <tbody>{models.map(row => <tr key={row[0]}>{row.map((value, index) => index === 1 ? <th key={index} scope="row">{value}</th> : <td key={index}>{value}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </section>
      <section className={styles.contact} aria-labelledby="ebron-contact-title">
        <p className={styles.eyebrow}>DO PRODUTO AO SEU PROJETO</p>
        <h2 id="ebron-contact-title">Vamos iluminar a sua cidade?</h2>
        <a href="https://wa.me/5585986559388" target="_blank" rel="noopener noreferrer">Fale com um especialista <ArrowUpRight size={18} /></a>
      </section>
    </main>
    <Footer />
  </div>;
}
