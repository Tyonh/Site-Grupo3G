export type FamilyBrand = "3g" | "ebron";

/**
 * Paleta de cada marca do Grupo 3G para o `ProductFamilyHero`. A 3G usa a
 * paleta vermelho/branco/cinza de sempre (fundo claro); a EBRON usa o
 * azul-marinho da identidade própria da marca (fundo escuro) — mesma
 * estrutura visual, cores diferentes. Centralizado aqui para não precisar
 * espalhar ternários de classe por todo o componente.
 */
export function getFamilyTheme(brand: FamilyBrand) {
  const isEbron = brand === "ebron";

  return {
    sectionBg: isEbron ? "bg-ebron-navy" : "bg-brand-light",
    sectionBorder: isEbron ? "border-white/10" : "border-black/5",
    kicker: isEbron ? "text-ebron-blue-light" : "text-brand-red",
    title: isEbron ? "text-white" : "text-brand-charcoal",
    description: isEbron ? "text-ebron-light/80" : "text-brand-dark",
    divider: isEbron ? "border-white/15" : "border-brand-dark/15",

    vectorBackdropBg: isEbron ? "bg-ebron-navy" : "bg-brand-light",

    hotspotBorder: isEbron ? "border-ebron-blue-light" : "border-brand-red",
    hotspotIdle: isEbron
      ? "bg-ebron-navy/80 text-ebron-blue-light hover:bg-ebron-blue-light hover:text-ebron-navy"
      : "bg-white/85 text-brand-red hover:bg-brand-red hover:text-white",
    hotspotActive: isEbron
      ? "bg-ebron-blue-light text-ebron-navy"
      : "bg-brand-red text-white",
    hotspotFocusOutline: isEbron
      ? "focus-visible:outline-ebron-blue-light"
      : "focus-visible:outline-brand-red",

    listIdle: isEbron
      ? "text-white hover:text-ebron-blue-light"
      : "text-brand-charcoal hover:text-brand-red",
    listActive: isEbron ? "text-ebron-blue-light" : "text-brand-red",

    ctaBg: isEbron ? "bg-ebron-blue-light" : "bg-brand-red",
    ctaText: isEbron ? "text-ebron-navy" : "text-white",
    ctaHover: isEbron ? "hover:bg-white" : "hover:bg-brand-charcoal",

    captionBg: isEbron ? "bg-ebron-blue/90" : "bg-brand-charcoal/90",
    captionLabel: "text-white",
    captionText: "text-white/80",

    miniCardBorder: isEbron ? "border-ebron-blue-light" : "border-brand-red",
    miniCardBg: isEbron ? "bg-ebron-blue" : "bg-white",
    miniCardPhotoBg: isEbron ? "bg-ebron-navy" : "bg-brand-light",
    miniCardOverlay: isEbron
      ? "bg-ebron-navy/0 group-hover:bg-ebron-navy/25"
      : "bg-brand-charcoal/0 group-hover:bg-brand-charcoal/25",
    miniCardCloseBg: isEbron
      ? "bg-ebron-navy/80 hover:bg-ebron-blue-light hover:text-ebron-navy"
      : "bg-brand-charcoal/80 hover:bg-brand-red",
    miniCardLabel: isEbron ? "text-white" : "text-brand-charcoal",
    miniCardAmpliarBg: isEbron ? "bg-ebron-navy/75" : "bg-brand-charcoal/75",
  };
}
