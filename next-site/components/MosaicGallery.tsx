import Image from "next/image";
import Link from "next/link";
import LazyVideo from "@/components/LazyVideo";

export interface MosaicTile {
  id: string;
  /** Proporção largura/altura. É ela que define a largura relativa do tile na
   *  linha: todos os tiles de uma linha ficam com a mesma altura (estilo Anduril). */
  ratio: number;
  /** Imagem do tile — também serve de capa enquanto o vídeo não carrega. */
  image: string;
  alt: string;
  /** Vídeo em loop opcional (só baixa quando chega perto da tela). */
  video?: string;
  category: string;
  title: string;
  href?: string;
}

interface MosaicGalleryProps {
  rows: MosaicTile[][];
}

/** A partir dessa proporção o tile é "largo" e ocupa a linha inteira no celular. */
const WIDE_MIN_RATIO = 1.3;

function sumRatios(row: MosaicTile[]): number {
  return row.reduce((total, tile) => total + tile.ratio, 0);
}

function TileBody({ tile, sizes }: { tile: MosaicTile; sizes: string }) {
  return (
    <>
      <Image
        src={tile.image}
        alt={tile.video ? "" : tile.alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      {tile.video ? (
        <LazyVideo
          src={tile.video}
          poster={tile.image}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : null}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-3 text-white sm:p-5">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/70 sm:text-[0.7rem] sm:tracking-[0.2em]">
          {tile.category}
        </span>
        <span className="text-sm font-medium leading-tight tracking-[-0.01em] sm:text-lg">
          {tile.title}
        </span>
      </div>
    </>
  );
}

/**
 * Mosaico de fotos e vídeos em tamanhos e formatos variados, no estilo da
 * página inicial da Anduril: cada linha tem tiles de proporções diferentes
 * (largo, vertical) com a mesma altura, e o espaço entre eles é pequeno.
 * No celular os tiles empilham, cada um com a sua proporção.
 */
export default function MosaicGallery({ rows }: MosaicGalleryProps) {
  return (
    <div className="mx-auto grid w-full max-w-[1800px] grid-flow-dense grid-cols-2 gap-2 md:flex md:flex-col md:gap-3">
      {rows.map((row) => {
        const total = sumRatios(row);
        return (
          <div
            key={row.map((tile) => tile.id).join("-")}
            className="contents md:flex md:flex-row md:items-start md:gap-3"
          >
            {row.map((tile) => {
              const sizes = `(min-width: 768px) ${Math.round((tile.ratio / total) * 100)}vw, 100vw`;
              // No celular a grade tem 2 colunas: fotos largas ocupam as duas,
              // as demais (quadradas e verticais) ficam lado a lado.
              const span = tile.ratio >= WIDE_MIN_RATIO ? "col-span-2 md:col-span-1" : "col-span-1";
              const className = `mosaic-reveal group relative block ${span} aspect-[var(--r)] w-full overflow-hidden bg-brand-charcoal md:w-auto md:flex-[var(--r)_1_0%] focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-white`;
              const style = { "--r": tile.ratio } as React.CSSProperties;
              return tile.href ? (
                <Link key={tile.id} href={tile.href} className={className} style={style}>
                  <TileBody tile={tile} sizes={sizes} />
                </Link>
              ) : (
                <div key={tile.id} className={className} style={style}>
                  <TileBody tile={tile} sizes={sizes} />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
