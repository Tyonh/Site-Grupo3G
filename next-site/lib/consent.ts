/**
 * Escolha do visitante sobre cookies de análise (LGPD). Guardada só no
 * navegador dele (localStorage, chave `cookie-consent`): "granted" carrega o
 * Google Analytics, "denied" não carrega nada, ausente mostra o banner.
 */

export type CookieChoice = "granted" | "denied";

const STORAGE_KEY = "cookie-consent";
const CHANGE_EVENT = "cookie-consent-change";

/**
 * ID da propriedade GA4, definido no build por NEXT_PUBLIC_GA_ID. Validado
 * porque vai para dentro de um <script>: só aceita o formato G-XXXXXXX.
 * Sem ID válido, o site não mostra banner nem carrega Analytics.
 */
const rawId = process.env.NEXT_PUBLIC_GA_ID ?? "";
export const GA_ID = /^G-[A-Z0-9]{4,20}$/.test(rawId) ? rawId : "";

export function readChoice(): CookieChoice | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    // navegação privada / armazenamento bloqueado: trata como "não escolheu"
    return null;
  }
}

export function saveChoice(choice: CookieChoice): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // sem armazenamento a escolha vale só para esta página aberta
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeChoice(onChange: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Apaga os cookies `_ga*` deste domínio (e do domínio-pai, onde o GA grava). */
function clearAnalyticsCookies(): void {
  const host = window.location.hostname;
  const domains = ["", host, `.${host.replace(/^www\./, "")}`];
  document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((name) => name.startsWith("_ga"))
    .forEach((name) => {
      domains.forEach((d) => {
        document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
      });
    });
}

/**
 * Volta ao estado "não escolheu" (o banner reaparece). Se o Analytics já
 * estava carregado, apaga os cookies dele e recarrega a página para tirá-lo.
 */
export function resetChoice(): void {
  const wasGranted = readChoice() === "granted";
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // nada a remover
  }
  clearAnalyticsCookies();
  if (wasGranted) {
    window.location.reload();
    return;
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}
