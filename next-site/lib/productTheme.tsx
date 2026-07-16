export type ProductTheme = "light" | "dark";

/**
 * Shared light/dark class-name set used by every /produtos/* detail page
 * (modulo, ebron, luminaria-homologada, luminaria-solar). Centralized so the
 * card widths and colors can't drift between pages the way they had before
 * (e.g. cardTableClass was 700px on three pages and 600px on the fourth).
 */
export function getProductTheme(theme: ProductTheme) {
  const isDark = theme === "dark";

  const cardClass = isDark
    ? "w-full max-w-[500px] bg-black/85 p-6 sm:p-8 md:p-10 rounded-3xl border border-white/10 text-white flex flex-col gap-4 pointer-events-auto shadow-2xl shadow-black/60 transition-all duration-500"
    : "w-full max-w-[500px] bg-white p-6 sm:p-8 md:p-10 rounded-3xl border border-slate-200 text-slate-900 flex flex-col gap-4 pointer-events-auto shadow-xl shadow-slate-300/40 transition-all duration-500";

  const cardWideClass = isDark
    ? "w-full max-w-[550px] bg-black/85 p-6 sm:p-8 md:p-10 rounded-3xl border border-white/10 text-white flex flex-col gap-4 pointer-events-auto shadow-2xl shadow-black/60 transition-all duration-500"
    : "w-full max-w-[550px] bg-white p-6 sm:p-8 md:p-10 rounded-3xl border border-slate-200 text-slate-900 flex flex-col gap-4 pointer-events-auto shadow-xl shadow-slate-300/40 transition-all duration-500";

  // Normalized to a single value across all product pages (was 700px on
  // ebron/homologada/solar and 600px on modulo).
  const cardTableClass = isDark
    ? "w-full max-w-[650px] bg-black/85 p-6 sm:p-8 md:p-10 rounded-3xl border border-white/10 text-white flex flex-col gap-4 pointer-events-auto shadow-2xl shadow-black/60 transition-all duration-500"
    : "w-full max-w-[650px] bg-white p-6 sm:p-8 md:p-10 rounded-3xl border border-slate-200 text-slate-900 flex flex-col gap-4 pointer-events-auto shadow-xl shadow-slate-300/40 transition-all duration-500";

  const titleClass = isDark
    ? "text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black leading-tight uppercase text-white transition-colors duration-500"
    : "text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black leading-tight uppercase text-slate-900 transition-colors duration-500";

  const title2Class = isDark
    ? "text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white transition-colors duration-500"
    : "text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-slate-900 transition-colors duration-500";

  const textMutedClass = isDark
    ? "text-gray-300 font-normal text-sm sm:text-base leading-relaxed transition-colors duration-500"
    : "text-slate-600 font-normal text-sm sm:text-base leading-relaxed transition-colors duration-500";

  const textMutedTableClass = isDark
    ? "text-gray-300 font-normal text-xs sm:text-sm leading-relaxed mb-1 transition-colors duration-500"
    : "text-slate-600 font-normal text-xs sm:text-sm leading-relaxed mb-1 transition-colors duration-500";

  const subCardClass = isDark
    ? "bg-white/5 p-4 rounded-2xl border border-white/10 shadow-sm text-center transition-all duration-500"
    : "bg-slate-50 p-4 rounded-2xl border border-slate-200/60 shadow-sm text-center transition-all duration-500";

  const subTextMutedClass = isDark
    ? "text-gray-400 text-xs mt-1 uppercase font-semibold tracking-wider transition-colors duration-500"
    : "text-slate-500 text-xs mt-1 uppercase font-semibold tracking-wider transition-colors duration-500";

  const listTextClass = isDark
    ? "flex flex-col gap-2.5 font-medium text-gray-300 mt-2 text-sm transition-colors duration-500"
    : "flex flex-col gap-2.5 font-medium text-slate-700 mt-2 text-sm transition-colors duration-500";

  const detailItemClass = isDark
    ? "flex justify-between border-b border-white/10 py-1.5 transition-all duration-500"
    : "flex justify-between border-b border-slate-200 py-1.5 transition-all duration-500";

  const detailLabelClass = isDark ? "text-gray-400" : "text-slate-500";
  const detailValClass = isDark
    ? "font-bold text-slate-200"
    : "font-bold text-slate-800";

  const tableWrapperClass = isDark
    ? "overflow-x-auto w-full border border-white/10 rounded-2xl bg-white/5 shadow-sm transition-all duration-500"
    : "overflow-x-auto w-full border border-slate-200/80 rounded-2xl bg-slate-50 shadow-sm transition-all duration-500";

  const theadClass = isDark
    ? "bg-white/10 text-white font-bold border-b border-white/10"
    : "bg-slate-100 text-slate-600 font-bold border-b border-slate-200";

  const tbodyClass = isDark
    ? "divide-y divide-white/5 text-gray-300"
    : "divide-y divide-slate-100 text-slate-700";

  const trClass = isDark
    ? "hover:bg-white/10 transition-colors"
    : "hover:bg-slate-50/80 transition-colors";

  // Fixed-height 3D showcase panel (last section of each product page).
  // Uses viewport-relative height with min/max clamps instead of a bare
  // pixel value so it can't overflow on short mobile/landscape viewports,
  // and is now identical across every product page (was 700/650px on three
  // pages and 500/550px on the fourth).
  const showcasePanelClass = `relative w-full max-w-6xl min-h-[480px] h-[80vh] max-h-[700px] lg:h-[650px] rounded-3xl overflow-hidden border shadow-2xl transition-all duration-500 flex flex-col lg:flex-row pointer-events-auto ${
    isDark ? "bg-zinc-950 border-white/10" : "bg-slate-50 border-slate-200"
  }`;

  const showcaseCanvasClass =
    "w-full lg:w-7/12 h-[45vh] min-h-[280px] lg:h-full relative overflow-hidden";

  const showcaseInfoPanelClass = `w-full lg:w-5/12 h-auto lg:h-full flex flex-col justify-center p-6 sm:p-8 md:p-12 gap-5 border-t lg:border-t-0 lg:border-l transition-all duration-500 ${
    isDark
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

export const productCheckMark = (
  <span className="flex items-center justify-center w-4 h-4 shrink-0 rounded-full bg-brand-red/20 text-brand-red text-[9px] font-bold">
    ✔
  </span>
);
