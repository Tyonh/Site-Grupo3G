import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import GroupNavbar from "@/components/GroupNavbar";
import Footer from "@/components/Footer";
import ProductColorVideo from "@/components/natal/ProductColorVideo";
import ProductColorImage from "@/components/natal/ProductColorImage";
import ProductSingleVideo from "@/components/natal/ProductSingleVideo";
import {
  getSectionBySlug,
  natalSections,
} from "@/lib/natalCatalog";
import { versioned } from "@/lib/natal/assetVersion";
import { buildNatalSectionJsonLd } from "@/lib/natal/jsonLd";
import { cutoutImageSrc, cutoutVideoSrc } from "@/lib/natal/cutouts";
import ArvoreLed3D from "@/components/natal/ArvoreLed3D";

/** Fundo grafite das páginas de Natal (atrás da árvore 3D). */
const FUNDO_GRAFITE = "#16171b";

interface PageProps {
  params: Promise<{ categoria: string }>;
}

export function generateStaticParams() {
  return natalSections.map((s) => ({ categoria: s.slug }));
}

/**
 * Descrição para busca: a chamada curta do grupo, completada com as categorias
 * e o gancho do catálogo enquanto cabe em 160 caracteres (acima disso o Google
 * corta o texto no resultado). Só entra o que existe no catálogo.
 */
function buildMetaDescription(section: NonNullable<ReturnType<typeof getSectionBySlug>>): string {
  const parts = [
    `Categorias: ${section.categories.map((c) => c.name).join(", ")}.`,
    "Catálogo Natal 3G com código de cada cor.",
  ];
  let description: string = section.blurb;
  for (const part of parts) {
    if (`${description} ${part}`.length <= 160) description = `${description} ${part}`;
  }
  return description;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoria } = await params;
  const section = getSectionBySlug(categoria);
  if (!section) return { title: "Natal 3G" };
  const shareImage = section.photo ?? section.categories[0]?.photo;
  const description = buildMetaDescription(section);
  return {
    title: `${section.name} — Natal 3G`,
    description,
    alternates: { canonical: `/natal/${section.slug}` },
    openGraph: {
      type: "website",
      title: `${section.name} — Natal 3G`,
      description,
      url: `/natal/${section.slug}`,
      ...(shareImage ? { images: [{ url: shareImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${section.name} — Natal 3G`,
      description,
      ...(shareImage ? { images: [shareImage] } : {}),
    },
  };
}

export default async function NatalCategoryPage({ params }: PageProps) {
  const { categoria } = await params;
  const section = getSectionBySlug(categoria);
  if (!section) notFound();

  const heroPhoto = section.photo ?? section.categories[0]?.photo;

  // Mídias sem fundo (lib/natal/cutouts.ts) onde existirem; o resto é o original.
  const mediaVideo = (src: string) => versioned(cutoutVideoSrc(src));
  const mediaImage = (src: string) => versioned(cutoutImageSrc(src));
  // Todas as páginas de Natal usam o fundo grafite com a árvore 3D na praça,
  // fixo atrás da página: a seção de produtos é transparente para ele aparecer
  // e as demais seções ficam em preto sólido.
  const fundoSolido = "bg-black";
  const tema = {
    secao: "text-white",
    kicker: "text-natal-gold",
    sub: "text-white/60",
    linha: "border-white/10",
    rotulo: "text-white/45",
    nota: "text-emerald-300",
    chip: "bg-white/5 border-white/15 text-white/80",
    codigo: "text-white/35",
  };

  const idx = natalSections.findIndex((s) => s.slug === section.slug);
  const nextSection = natalSections[(idx + 1) % natalSections.length];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildNatalSectionJsonLd(section)).replace(/</g, "\\u003c"),
        }}
      />
      {/* Navbar transparente sobre o fundo escuro das páginas de Natal. */}
      <GroupNavbar variant="clear" />

      <main className="w-full text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
          style={{ background: FUNDO_GRAFITE }}
        >
          {/* Árvore de LED em 3D (modelada em código) numa praça, ocupando a
              tela toda, centralizada. */}
          <ArvoreLed3D className="absolute inset-0" />
          {/* vidro fosco leve por cima da cena, para o conteúdo ler bem */}
          <div className="absolute inset-0 bg-black/35 backdrop-blur-[3px]" />
        </div>
        {/* ═══════════ HERO FULL-BLEED — GRUPO ═══════════ */}
        <section className={`relative h-[85vh] min-h-[520px] w-full overflow-hidden ${fundoSolido}`}>
          {heroPhoto && (
            <Image
              src={versioned(heroPhoto)}
              alt={`${section.name} em aplicação real`}
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
                <span className="text-natal-gold">{section.name}</span>
              </nav>
              <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95]">
                {section.name}
              </h1>
              <p className="max-w-2xl text-sm sm:text-base text-white/70 font-light leading-relaxed">
                {section.blurb}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {section.categories.map((cat) => (
                  <a
                    key={cat.slug}
                    href={`#${cat.slug}`}
                    className="inline-flex items-center justify-center min-h-11 px-5 border border-white/30 hover:border-natal-gold hover:text-natal-gold transition-colors uppercase tracking-[0.15em] text-[11px] font-bold"
                  >
                    {cat.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SUBCATEGORIAS — UMA POR VEZ, MESMO PADRÃO DE SEMPRE ═══════════ */}
        {section.categories.map((cat, catIndex) => {
          return (
            <div key={cat.slug} id={cat.slug} className="scroll-mt-16 border-t border-white/10">
              {/* Por que essa subcategoria */}
              <section className={`${fundoSolido} border-b border-white/10`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-4">
                    <span className="text-natal-gold font-bold tracking-[0.3em] text-xs uppercase">
                      {String(catIndex + 1).padStart(2, "0")} — {section.name}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight mt-3">
                      {cat.name}
                    </h2>
                    <p className="mt-4 text-sm text-white/60 font-light leading-relaxed">
                      {cat.whatIs}
                    </p>
                  </div>
                  <div className="lg:col-span-8 flex flex-col gap-6">
                    <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
                      {cat.whyThis}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {cat.applications.map((app) => (
                        <span
                          key={app}
                          className="px-4 py-2 border border-white/15 text-xs uppercase tracking-wider text-white/60 hover:border-natal-gold hover:text-natal-gold transition-colors cursor-default"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Linha de produtos — estilo "versões" */}
              <section className={tema.secao}>
                <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16 sm:py-24 flex flex-col gap-16 sm:gap-24">
                  <div>
                    <span className={`${tema.kicker} font-bold tracking-[0.3em] text-xs uppercase`}>
                      A linha
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight mt-3">
                      Versões e especificações
                    </h3>
                  </div>

                  {cat.products.map((product, i) => (
                    <article
                      key={product.name}
                      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                        i % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
                      }`}
                    >
                      {product.videos ? (
                        <ProductColorVideo
                          videos={product.videos.map((v) => ({ ...v, src: mediaVideo(v.src) }))}
                          productName={product.name}
                          escuro
                        />
                      ) : product.images ? (
                        <ProductColorImage
                          images={product.images.map((img) => ({ ...img, src: mediaImage(img.src) }))}
                          productName={product.name}
                          escuro
                        />
                      ) : product.video ? (
                        <ProductSingleVideo
                          src={mediaVideo(product.video)}
                          poster={product.videoPoster ? versioned(product.videoPoster) : undefined}
                          productName={product.name}
                        />
                      ) : (
                        <div className="relative w-full aspect-[4/3]">
                          {product.image ? (
                            product.imageRounded ? (
                              // Foto cheia (não recortada): a moldura é que recebe os cantos
                              // arredondados — arredondar o <Image> não aparece, pois a foto
                              // fica contida dentro dele
                              <div className="absolute inset-0 p-8">
                                <div className="relative isolate h-full w-full overflow-hidden rounded-3xl">
                                  <Image
                                    src={mediaImage(product.image)}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 1024px) 90vw, 560px"
                                    className="object-cover"
                                  />
                                </div>
                              </div>
                            ) : (
                              <Image
                                src={mediaImage(product.image)}
                                alt={product.name}
                                fill
                                sizes="(max-width: 1024px) 90vw, 560px"
                                className="object-contain p-8"
                              />
                            )
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30">
                              {cat.icon}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex flex-col gap-5">
                        <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                          {product.name}
                        </h4>
                        <p className={`text-sm ${tema.sub} font-light leading-relaxed`}>
                          {product.description}
                        </p>

                        <dl className={`border-t ${tema.linha}`}>
                          {product.specs.map((spec) => (
                            <div
                              key={spec.label}
                              className={`flex justify-between gap-6 border-b ${tema.linha} py-3 text-sm`}
                            >
                              <dt className={`${tema.rotulo} uppercase tracking-wider text-xs pt-0.5`}>
                                {spec.label}
                              </dt>
                              <dd className="font-bold text-right">
                                {spec.value}
                                {spec.plain && (
                                  <span className={`block font-normal text-[11px] ${tema.nota} mt-0.5`}>
                                    {spec.plain}
                                  </span>
                                )}
                              </dd>
                            </div>
                          ))}
                        </dl>

                        <div>
                          <h5 className={`text-[10px] font-bold uppercase tracking-[0.3em] ${tema.rotulo} mb-3`}>
                            {product.optionsTitle ?? "Cores disponíveis"}
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {product.variants.map((v) => (
                              <span
                                key={`${v.code}-${v.label ?? v.ledColor}`}
                                className={`inline-flex items-center gap-2 border ${tema.chip} pl-2 pr-3 py-1.5 text-[11px] font-medium`}
                                title={v.wireColor ? `Fio: ${v.wireColor}` : undefined}
                              >
                                <span
                                  aria-hidden
                                  className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0"
                                  style={{ backgroundColor: v.swatch }}
                                />
                                {v.label ?? v.ledColor}
                                {v.code && (
                                  <span className={`${tema.codigo} font-mono`}>{v.code}</span>
                                )}
                                {v.plugCode && (
                                  <span className={`${tema.codigo} font-mono`}>
                                    <span aria-hidden> · </span>
                                    <span className="sr-only">com plugue </span>
                                    {v.plugCode}
                                  </span>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          );
        })}

        {/* ═══════════ PRÓXIMO GRUPO ═══════════ */}
        <Link
          href={`/natal/${nextSection.slug}`}
          className={`group relative block h-[40vh] min-h-[280px] w-full overflow-hidden border-t border-white/10 ${fundoSolido}`}
        >
          {(nextSection.photo ?? nextSection.categories[0]?.photo) && (
            <Image
              src={versioned((nextSection.photo ?? nextSection.categories[0]?.photo)!)}
              alt={nextSection.name}
              fill
              sizes="100vw"
              className="object-cover opacity-50 transition-[opacity,transform] duration-700 group-hover:opacity-70 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/50">
              Próximo da coleção
            </span>
            <span className="text-2xl sm:text-4xl font-black uppercase tracking-tight group-hover:text-natal-gold transition-colors">
              {nextSection.name} →
            </span>
          </div>
        </Link>
      </main>

      <Footer />
    </>
  );
}
