"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Component, useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { homologadaMotion as motion, phase } from "@/lib/homologada-motion";
import styles from "./HomologadaScrollExperience.module.css";
import HomologadaPhotometry from "./HomologadaPhotometry";

const Scene = dynamic(() => import("./3d/HomologadaScrollScene"), { ssr: false });
type WebGLStatus = "pending" | "available" | "unavailable";
let webGLStatus: WebGLStatus = "pending";
const noSubscription = () => () => {};
const serverWebGLStatus = (): WebGLStatus => "pending";
function getWebGLStatus(): WebGLStatus {
  if (webGLStatus !== "pending") return webGLStatus;
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2", { powerPreference: "low-power" });
    webGLStatus = context ? "available" : "unavailable";
    context?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch { webGLStatus = "unavailable"; }
  return webGLStatus;
}
const chapters = [
  { label: "O produto", title: "Luz para ir mais longe.", text: "Luminária Homologada. Engenharia, eficiência e uma nova perspectiva para a iluminação pública." },
  { label: "A construção", title: "Cada detalhe tem uma função.", text: "Corpo de alumínio, aletas de dissipação e conjunto óptico. Gire sua perspectiva e conheça a construção da luminária." },
  { label: "A instalação", title: "Do detalhe à escala da cidade.", text: "O produto encontra seu lugar: instalado em um braço de poste, orientado para a via pública." },
  { label: "A aplicação", title: "A cidade ganha outra luz.", text: "A Homologada acende. A luz se abre ao longo da via, acompanhando a distribuição do ensaio fotométrico." },
];

function useMedia(query: string) {
  const subscribe = useCallback((notify: () => void) => {
    const media = window.matchMedia(query);
    media.addEventListener("change", notify);
    return () => media.removeEventListener("change", notify);
  }, [query]);
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
}

class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function HomologadaScrollExperience() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const wake = useRef<(() => void) | null>(null);
  const [chapter, setChapter] = useState(0);
  const [active, setActive] = useState(true);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const mobile = useMedia("(max-width: 767px)");
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const readWebGL = useCallback(() => reduced ? "unavailable" as const : getWebGLStatus(), [reduced]);
  const webGL = useSyncExternalStore(noSubscription, readWebGL, serverWebGLStatus);
  const staticView = reduced || failed || webGL === "unavailable";
  const handleReady = useCallback(() => setReady(true), []);
  const handleError = useCallback(() => setFailed(true), []);
  const handleWake = useCallback((callback: (() => void) | null) => { wake.current = callback; }, []);
  const handleLighting = useCallback((night: number) => {
    stage.current?.style.setProperty("--night", String(night));
    stage.current?.style.setProperty("--night-ink", night >= 0.65 ? "1" : "0");
    stage.current?.style.setProperty("--dusk-ink", String(phase(night, 0.04, 0.3)));
  }, []);

  useEffect(() => {
    if (!section.current || staticView) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const element = section.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const next = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - window.innerHeight)));
      const changed = next !== progress.current;
      progress.current = next;
      setChapter(next < 0.17 ? 0 : next < 0.48 ? 1 : next < motion.applicationStart ? 2 : 3);
      stage.current?.style.setProperty("--word-opacity", String(1 - phase(next, 0.12, 0.22)));
      stage.current?.style.setProperty("--progress", String(next));
      if (changed && rect.top < window.innerHeight && rect.bottom > 0 && document.visibilityState === "visible") wake.current?.();
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, [staticView]);

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    let visible = true;
    const update = () => setActive(visible && document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);

  const goTo = (index: number) => {
    if (!section.current) return;
    const top = section.current.getBoundingClientRect().top + window.scrollY;
    const span = section.current.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * [0, 0.3, 0.73, 0.99][index], behavior: reduced ? "instant" : "smooth" });
  };

  return <section ref={section} className={styles.story} data-static={staticView} aria-label="Conheça a Luminária Homologada">
    <div ref={stage} className={styles.stage} data-chapter={staticView ? 0 : chapter} data-ready={ready && !staticView}>
      <h1 className={styles.visuallyHidden}>Luminária Homologada</h1>
      <div className={styles.nightBackground} aria-hidden="true" />
      <div className={styles.topline}><span>3G · ILUMINAÇÃO PÚBLICA</span><a href="#ficha-tecnica">Ver ficha técnica <ArrowUpRight size={14} /></a></div>
      <div className={styles.word} aria-hidden="true">HOMOLOGADA</div>
      <div className={styles.visual} role="img" aria-label={staticView ? "Luminária Homologada 50 W: vista frontal do produto" : "Modelo 3D final da Luminária Homologada 50 W; ao rolar, gira, se instala em um poste e ilumina uma via simulada ao anoitecer."}>
        <Image className={styles.poster} src="/homologada-final-poster.png" alt="" width={900} height={1100} priority />
        {!staticView && webGL === "available" && <SceneBoundary onError={handleError}><Scene progress={progress} mobile={mobile} active={active} onReady={handleReady} onWake={handleWake} onUnavailable={handleError} onLighting={handleLighting} /></SceneBoundary>}
      </div>
      <div className={styles.nightScrim} aria-hidden="true" />
      <div className={styles.copy}>
        {chapters.map((item, index) => <article key={item.label} className={styles.chapter} data-visible={(staticView ? 0 : chapter) === index} aria-hidden={(staticView ? 0 : chapter) !== index}>
          <p className={styles.eyebrow}>0{index + 1} / {item.label}</p>
          <h2>{item.title}</h2>
          <p className={styles.description}>{item.text}</p>
          {index === 0 && <div className={styles.heroSpecs}><span><strong>160</strong> lm/W</span><span><strong>IP66</strong> proteção</span></div>}
          {index === 1 && <div className={styles.detailTags}><span>Alumínio injetado</span><span>Óptica em PMMA</span><span>Base de 7 pinos</span></div>}
          {index === 3 && <><HomologadaPhotometry /><p className={styles.simulation}>Curva de referência: 200 W. Modelo 3D: 50 W. Cena ilustrativa; não substitui um projeto luminotécnico.</p><a className={styles.cta} href="https://wa.me/5585986559388" target="_blank" rel="noopener noreferrer" tabIndex={chapter === 3 && !staticView ? 0 : -1}>Vamos iluminar seu projeto <ArrowUpRight size={17} /></a></>}
        </article>)}
      </div>
      <div className={styles.bottomline}>
        <span className={styles.scrollHint}>{staticView ? "LUMINÁRIA HOMOLOGADA · 50 W" : <><ArrowDown size={16} /> Role para explorar</>}</span>
        {!staticView && <nav className={styles.chapterNav} aria-label="Etapas da apresentação">{chapters.map((item, index) => <button key={item.label} onClick={() => goTo(index)} aria-label={`Ir para ${item.label}`} aria-current={chapter === index ? "step" : undefined}><span>0{index+1}</span><span className={styles.navLabel}>{item.label}</span></button>)}</nav>}
      </div>
    </div>
  </section>;
}
