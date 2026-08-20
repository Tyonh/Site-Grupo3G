import { statSync } from "fs";
import { join } from "path";

/**
 * Cache-buster para assets de produto.
 *
 * Trocar a foto de um produto sobrescrevendo o arquivo em `public/` com o
 * mesmo nome não muda a URL — então o cache do navegador e da CDN continuam
 * servindo a versão antiga muito tempo depois do arquivo já ter mudado no
 * servidor. Anexar `?v=<mtime>` faz a URL mudar junto com o conteúdo,
 * invalidando todas as camadas de cache sem precisar renomear arquivo.
 *
 * Roda em build time (as páginas do Natal são estáticas), então o custo é
 * zero em produção e o `public/` está sempre disponível no disco.
 *
 * Requer `images.localPatterns` no next.config.ts — sem isso o <Image> do
 * Next 16 recusa URLs locais com query string e derruba a página.
 */
const versionCache = new Map<string, number>();

function fileVersion(publicPath: string): number {
  const cached = versionCache.get(publicPath);
  if (cached !== undefined) return cached;

  let version = 0;
  try {
    const filePath = join(process.cwd(), "public", publicPath.split("?")[0]);
    version = Math.round(statSync(filePath).mtimeMs);
  } catch {
    // Asset ausente ou filesystem indisponível: devolve a URL original.
    version = 0;
  }

  versionCache.set(publicPath, version);
  return version;
}

export function versioned(src: string): string {
  if (!src.startsWith("/")) return src;
  const version = fileVersion(src);
  if (!version) return src;
  return `${src}?v=${version}`;
}
