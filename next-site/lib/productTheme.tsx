export type ProductTheme = "light" | "dark" | "ebron";

/**
 * Shared light/dark class-name set used by every /produtos/* detail page
 * (modulo, ebron, luminaria-homologada, luminaria-solar). Centralized so the
 * card widths and colors can't drift between pages the way they had before
 * (e.g. cardTableClass was 700px on three pages and 600px on the fourth).
 */
export function getProductTheme(theme: ProductTheme) {
  const isDark = theme === "dark";
  const isEbron = theme === "ebron";

  const cardClass = isEbron
    ? "w-full max-w-[500px] bg-ebron-navy/90 p-6 sm:p-8 md:p-10 rounded-3xl border border-ebron-blue-light/30 text-white flex flex-col gap-4 pointer-events-auto shadow-2xl shadow-black/60 transition-all duration-500"
    : isDark
    ? "w-full max-w-[500px] bg-black/85 p-6 sm:p-8 md:p-10 rounded-3xl border border-white/10 text-white flex flex-col gap-4 pointer-events-auto shadow-2xl shadow-black/60 transition-all duration-500"
    : "w-full max-w-[500px] bg-white p-6 sm:p-8 md:p-10 rounded-3xl border border-slate-200 text-slate-900 flex flex-col gap-4 pointer-events-auto shadow-xl shadow-slate-300/40 transition-all duration-500";

  const cardWideClass = isEbron
    ? "w-full max-w-[550px] bg-ebron-navy/90 p-6 sm:p-8 md:p-10 rounded-3xl border border-ebron-blue-light/30 text-white flex flex-col gap-4 pointer-events-auto shadow-2xl shadow-black/60 transition-all duration-500"
    : isDark
    ? "w-full max-w-[550px] bg-black/85 p-6 sm:p-8 md:p-10 rounded-3xl border border-white/10 text-white flex flex-col gap-4 pointer-events-auto shadow-2xl shadow-black/60 transition-all duration-500"
    : "w-full max-w-[550px] bg-white p-6 sm:p-8 md:p-10 rounded-3xl border border-slate-200 text-slate-900 flex flex-col gap-4 pointer-events-auto shadow-xl shadow-slate-300/40 transition-all duration-500";

  // Normalized to a single value across all product pages (was 700px on
  // ebron/homologada/solar and 600px on modulo).
  const cardTableClass = isEbron
    ? "w-full max-w-[650px] bg-ebron-navy/90 p-6 sm:p-8 md:p-10 rounded-3xl border border-ebron-blue-light/30 text-white flex flex-col gap-4 pointer-events-auto shadow-2xl shadow-black/60 transition-all duration-500"
    : isDark
    ? "w-full max-w-[650px] bg-black/85 p-6 sm:p-8 md:p-10 rounded-3xl border border-white/10 text-white flex flex-col gap-4 pointer-events-auto shadow-2xl shadow-black/60 transition-all duration-500"
    : "w-full max-w-[650px] bg-white p-6 sm:p-8 md:p-10 rounded-3xl border border-slate-200 text-slate-900 flex flex-col gap-4 pointer-events-auto shadow-xl shadow-slate-300/40 transition-all duration-500";

  const titleClass = isEbron || isDark
    ? "text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black leading-tight uppercase text-white transition-colors duration-500"
    : "text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black leading-tight uppercase text-slate-900 transition-colors duration-500";

  const title2Class = isEbron || isDark
    ? "text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white transition-colors duration-500"
    : "text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-slate-900 transition-colors duration-500";

  const textMutedClass = isEbron
    ? "text-ebron-light/80 font-normal text-sm sm:text-base leading-relaxed transition-colors duration-500"
    : isDark
    ? "text-gray-300 font-normal text-sm sm:text-base leading-relaxed transition-colors duration-500"
    : "text-slate-600 font-normal text-sm sm:text-base leading-relaxed transition-colors duration-500";

  const textMutedTableClass = isEbron
    ? "text-ebron-light/80 font-normal text-xs sm:text-sm leading-relaxed mb-1 transition-colors duration-500"
    : isDark
    ? "text-gray-300 font-normal text-xs sm:text-sm leading-relaxed mb-1 transition-colors duration-500"
    : "text-slate-600 font-normal text-xs sm:text-sm leading-relaxed mb-1 transition-colors duration-500";

  const subCardClass = isEbron
    ? "bg-ebron-blue/35 p-4 rounded-2xl border border-ebron-blue-light/25 shadow-sm text-center transition-all duration-500"
    : isDark
    ? "bg-white/5 p-4 rounded-2xl border border-white/10 shadow-sm text-center transition-all duration-500"
    : "bg-slate-50 p-4 rounded-2xl border border-slate-200/60 shadow-sm text-center transition-all duration-500";

  const subTextMutedClass = isEbron
    ? "text-ebron-light/70 text-xs mt-1 uppercase font-semibold tracking-wider transition-all duration-500"
    : isDark
    ? "text-gray-400 text-xs mt-1 uppercase font-semibold tracking-wider transition-colors duration-500"
    : "text-slate-500 text-xs mt-1 uppercase font-semibold tracking-wider transition-colors duration-500";

  const listTextClass = isEbron
    ? "flex flex-col gap-2.5 font-medium text-ebron-light/85 mt-2 text-sm transition-all duration-500"
    : isDark
    ? "flex flex-col gap-2.5 font-medium text-gray-300 mt-2 text-sm transition-colors duration-500"
    : "flex flex-col gap-2.5 font-medium text-slate-700 mt-2 text-sm transition-colors duration-500";

  const detailItemClass = isEbron
    ? "flex justify-between border-b border-white/15 py-1.5 transition-all duration-500"
    : isDark
    ? "flex justify-between border-b border-white/10 py-1.5 transition-all duration-500"
    : "flex justify-between border-b border-slate-200 py-1.5 transition-all duration-500";

  const detailLabelClass = isEbron ? "text-ebron-light/65" : isDark ? "text-gray-400" : "text-slate-500";
  const detailValClass = isEbron
    ? "font-bold text-ebron-light"
    : isDark
    ? "font-bold text-slate-200"
    : "font-bold text-slate-800";

  const tableWrapperClass = isEbron
    ? "overflow-x-auto w-full border border-ebron-blue-light/25 rounded-2xl bg-ebron-blue/25 shadow-sm transition-all duration-500"
    : isDark
    ? "overflow-x-auto w-full border border-white/10 rounded-2xl bg-white/5 shadow-sm transition-all duration-500"
    : "overflow-x-auto w-full border border-slate-200/80 rounded-2xl bg-slate-50 shadow-sm transition-all duration-500";

  const theadClass = isEbron
    ? "bg-ebron-blue/60 text-white font-bold border-b border-ebron-blue-light/25"
    : isDark
    ? "bg-white/10 text-white font-bold border-b border-white/10"
    : "bg-slate-100 text-slate-600 font-bold border-b border-slate-200";

  const tbodyClass = isEbron
    ? "divide-y divide-white/10 text-ebron-light/85"
    : isDark
    ? "divide-y divide-white/5 text-gray-300"
    : "divide-y divide-slate-100 text-slate-700";

  const trClass = isEbron
    ? "hover:bg-white/10 transition-colors"
    : isDark
    ? "hover:bg-white/10 transition-colors"
    : "hover:bg-slate-50/80 transition-colors";

  // 3D showcase panel (last section of each product page). Full-bleed and
  // full-height on mobile — no rounded card, no border — so the 3D model
  // gets the whole screen instead of splitting it with the text panel below
  // (that split made the model too small to see well on phones). From `lg`
  // up it goes back to the card look, unchanged from before.
  const showcasePanelClass = `relative w-full max-w-6xl min-h-screen lg:min-h-[480px] lg:h-[650px] lg:max-h-[700px] overflow-hidden transition-all duration-500 flex flex-col lg:flex-row pointer-events-auto rounded-none border-0 shadow-none lg:rounded-3xl lg:border lg:shadow-2xl ${
    isEbron ? "bg-ebron-navy lg:border-ebron-blue-light/25" : isDark ? "bg-zinc-950 lg:border-white/10" : "bg-slate-50 lg:border-slate-200"
  }`;

  // Mobile: canvas takes most of the screen (info panel below sizes itself
  // to its content). Desktop: unchanged side-by-side split.
  const showcaseCanvasClass =
    "w-full lg:w-7/12 h-[70vh] min-h-[320px] lg:h-full relative overflow-hidden";

  const showcaseInfoPanelClass = `w-full lg:w-5/12 h-auto lg:h-full flex flex-col justify-center p-6 sm:p-8 md:p-12 gap-5 border-t lg:border-t-0 lg:border-l transition-all duration-500 ${
    isEbron
      ? "bg-ebron-navy/95 border-ebron-blue-light/25 text-white"
      : isDark
      ? "bg-black/95 border-white/10 text-white"
      : "bg-white/95 border-slate-200 text-slate-900"
  }`;

  return {
    cardClass,
    cardWideClass,
    cardTableClass,
    titleClass,
    title2Class,
    textMutedClass,
    textMutedTableClass,
    subCardClass,
    subTextMutedClass,
    listTextClass,
    detailItemClass,
    detailLabelClass,
    detailValClass,
    tableWrapperClass,
    theadClass,
    tbodyClass,
    trClass,
    showcasePanelClass,
    showcaseCanvasClass,
    showcaseInfoPanelClass,
  };
}

export const getProductCheckMark = (brand: "3g" | "ebron" = "3g") => (
  <span className={`flex items-center justify-center w-4 h-4 shrink-0 rounded-full text-[9px] font-bold ${
    brand === "ebron" ? "bg-ebron-blue-light/20 text-ebron-blue-light" : "bg-brand-red/20 text-brand-red"
  }`}>
    ✔
  </span>
);

export const productCheckMark = getProductCheckMark();
