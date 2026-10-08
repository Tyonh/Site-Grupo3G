import { homologadaPhotometry as report, polarCurvePath } from "@/lib/homologada-photometry";
import styles from "./HomologadaScrollExperience.module.css";

export default function HomologadaPhotometry() {
  return <div className={styles.photometry}>
    <p className={styles.photometryLabel}>Curva fotométrica · ensaio 200 W</p>
    <div className={styles.photometryPlot}>
      <svg viewBox="0 0 120 112" role="img" aria-label="Curva polar de intensidade: abertura de 137,1 graus no plano C0–C180 e de 75,7 graus no plano C90–C270.">
        {[16,32,49].map(r => <circle key={r} cx="60" cy="55" r={r} fill="none" stroke="currentColor" strokeOpacity=".18" strokeWidth=".6" />)}
        <path d="M5 55H115 M60 4V107 M25 20L95 90 M25 90L95 20" stroke="currentColor" strokeOpacity=".18" strokeWidth=".6" />
        <path d={polarCurvePath(0)} fill="#ff9b89" fillOpacity=".09" stroke="#ff9b89" strokeWidth="1.5" />
        <path d={polarCurvePath(90)} fill="#92d5ff" fillOpacity=".07" stroke="#92d5ff" strokeWidth="1.5" />
      </svg>
      <dl>
        <div><dt><i className={styles.c0} />C0–C180</dt><dd>{report.beamC0.toLocaleString("pt-BR")}°</dd></div>
        <div><dt><i className={styles.c90} />C90–C270</dt><dd>{report.beamC90.toLocaleString("pt-BR")}°</dd></div>
        <div><dt>Fluxo para baixo</dt><dd>{report.downwardPercent.toLocaleString("pt-BR")}%</dd></div>
      </dl>
    </div>
    <a href="/photometry/homologada-200w-relatorio.pdf" target="_blank" rel="noopener noreferrer">Ver relatório fotométrico ↗</a>
  </div>;
}
