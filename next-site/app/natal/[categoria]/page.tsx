import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductColorVideo from "@/components/natal/ProductColorVideo";
import {
  getCategoryBySlug,
  natalCategories,
} from "@/lib/natalCatalog";

const WHATSAPP_NUMBER = "5585986559388";

interface PageProps {
  params: Promise<{ categoria: string }>;
}

export function generateStaticParams() {
  return natalCategories.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoria } = await params;
  const cat = getCategoryBySlug(categoria);
  if (!cat) return { title: "Natal 3G" };
  return {
    title: `${cat.name} — Natal 3G`,
    description: cat.whatIs,
  };
}

export default async function NatalCategoryPage({ params }: PageProps) {
  const { categoria } = await params;
  const cat = getCategoryBySlug(categoria);
  if (!cat) notFound();

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Olá! Quero um orçamento de ${cat.name} da linha natalina 3G.`,
  )}`;

  const idx = natalCategories.findIndex((c) => c.slug === cat.slug);
  const nextCat = natalCategories[(idx + 1) % natalCategories.length];

  return (
    <>
      <Navbar />

      <main className="w-full bg-black text-white">
        {/* ═══════════ HERO FULL-BLEED — PRODUTO NO AMBIENTE ═══════════ */}
        <section className="relative h-[85vh] min-h-[520px] w-full overflow-hidden">
          {cat.photo && (
            <Image
              src={cat.photo}
              alt={`${cat.name} em aplicação real`}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/25" />

          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-16 pb-14 sm:pb-20 flex flex-col gap-4">
              <nav
                aria-label="Breadcrumb"
                className="text-[10px] sm:text-xs text-white/50 uppercase tracking-[0.3em] font-bold"
              >
                <Link href="/natal" className="hover:text-natal-gold transition-colors">
                  Coleção Natal
                </Link>
                <span className="mx-2">/</span>
                <span className="text-natal-gold">{cat.name}</span>
              </nav>
              <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95]">
                {cat.name}
              </h1>
              <p className="max-w-2xl text-sm sm:text-base text-white/70 font-light leading-relaxed">
                {cat.whatIs}
              </p>
              <div className="flex gap-3 mt-2">
                <a
                  href="#produtos"
                  className="inline-flex items-center justify-center min-h-12 px-8 bg-white text-black font-bold hover:bg-natal-gold transition-colors uppercase tracking-[0.2em] text-xs"
                >
                  Ver Linha
                </a>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center min-h-12 px-8 border border-white/40 font-bold hover:border-natal-gold hover:text-natal-gold transition-colors uppercase tracking-[0.2em] text-xs"
                >
                  Orçamento
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ POR QUE ESSE — EDITORIAL ═══════════ */}
        <section className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <span className="text-natal-gold font-bold tracking-[0.3em] text-xs uppercase">
                Por que escolher
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mt-3">
                O produto certo para a sua ideia
              </h2>
            </div>
            <div className="lg:col-span-8 flex flex-col gap-6">
              <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
                {cat.whyThis}
              </p>
              {/* Possibilidades — inspiração livre, não limite */}
              <div className="flex flex-wrap gap-2">
                {cat.applications.map((app) => (
                  <span
                    key={app}
                    className="px-4 py-2 border border-white/15 text-xs uppercase tracking-wider text-white/60 hover:border-natal-gold hover:text-natal-gold transition-colors cursor-default"
                  >
                    {app}
                  </span>
                ))}
                <span className="px-4 py-2 border border-natal-gold/40 text-xs uppercase tracking-wider text-natal-gold">
                  + onde a sua imaginação mandar
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ LINHA DE PRODUTOS — ESTILO "VERSÕES" ═══════════ */}
        <section id="produtos" className="scroll-mt-16 bg-brand-light text-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16 sm:py-24 flex flex-col gap-16 sm:gap-24">
            <div>
              <span className="text-natal-red font-bold tracking-[0.3em] text-xs uppercase">
                A linha
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight mt-3">
                Versões e especificações
              </h2>
            </div>

            {cat.products.map((product, i) => (
              <article
                key={product.name}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  i % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Vídeo interativo por cor, ou imagem estática do produto */}
                {product.videos ? (
                  <ProductColorVideo
                    videos={product.videos}
                    productName={product.name}
                  />
                ) : (
                  <div className="relative w-full aspect-[4/3]">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 1024px) 90vw, 560px"
                        className="object-contain p-8"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30">
                        {cat.icon}
                      </div>
                    )}
                  </div>
                )}

                {/* Ficha estilo automotivo */}
                <div className="flex flex-col gap-5">
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                    {product.name}
                  </h3>
                  <p className="text-sm text-neutral-600 font-light leading-relaxed">
                    {product.description}
                  </p>

                  <dl className="border-t border-neutral-200">
                    {product.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex justify-between gap-6 border-b border-neutral-200 py-3 text-sm"
                      >
                        <dt className="text-neutral-500 uppercase tracking-wider text-xs pt-0.5">
                          {spec.label}
                        </dt>
                        <dd className="font-bold text-right">
                          {spec.value}
                          {spec.plain && (
                            <span className="block font-normal text-[11px] text-natal-green mt-0.5">
                              {spec.plain}
                            </span>
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500 mb-3">
                      Cores disponíveis
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((v) => (
                        <span
                          key={`${v.code}-${v.ledColor}`}
                          className="inline-flex items-center gap-2 bg-white border border-neutral-200 pl-2 pr-3 py-1.5 text-[11px] font-medium text-neutral-700"
                          title={v.wireColor ? `Fio: ${v.wireColor}` : undefined}
                        >
                          <span
                            aria-hidden
                            className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0"
                            style={{ backgroundColor: v.swatch }}
                          />
                          {v.ledColor}
                          <span className="text-neutral-400 font-mono">{v.code}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ═══════════ INSTALAÇÃO ═══════════ */}
        <section className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16 sm:py-20">
            <span className="text-natal-gold font-bold tracking-[0.3em] text-xs uppercase">
              Instalação
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mt-3 mb-10">
              Do unboxing ao brilho
            </h2>
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
              {cat.installSteps.map((step, i) => (
                <li key={step} className="bg-black p-6 flex flex-col gap-3">
                  <span className="text-natal-gold font-black text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-white/65 font-light leading-relaxed">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ═══════════ COMERCIAL + CTA ═══════════ */}
        <section className="relative overflow-hidden border-t border-white/10">
          <div className="absolute inset-0 opacity-20">
            {cat.photo && (
              <Image
                src={cat.photo}
                alt=""
                aria-hidden
                fill
                sizes="100vw"
                className="object-cover"
              />
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-black" />

          <div className="relative max-w-3xl mx-auto px-4 sm:px-8 py-16 sm:py-24 flex flex-col items-center text-center gap-6">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
              Como comprar
            </h2>
            <p className="text-white/65 text-sm sm:text-base font-light leading-relaxed">
              {cat.commercial}
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-12 px-10 bg-natal-gold text-black font-bold hover:bg-white transition-colors uppercase tracking-[0.2em] text-xs"
            >
              Pedir Orçamento no WhatsApp
            </a>
          </div>
        </section>

        {/* ═══════════ PRÓXIMA CATEGORIA ═══════════ */}
        <Link
          href={`/natal/${nextCat.slug}`}
          className="group relative block h-[40vh] min-h-[280px] w-full overflow-hidden border-t border-white/10"
        >
          {nextCat.photo && (
            <Image
              src={nextCat.photo}
              alt={nextCat.name}
              fill
              sizes="100vw"
              className="object-cover opacity-50 transition-all duration-700 group-hover:opacity-70 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/50">
              Próximo da coleção
            </span>
            <span className="text-2xl sm:text-4xl font-black uppercase tracking-tight group-hover:text-natal-gold transition-colors">
              {nextCat.name} →
            </span>
          </div>
        </Link>
      </main>

      <Footer />
    </>
  );
}
