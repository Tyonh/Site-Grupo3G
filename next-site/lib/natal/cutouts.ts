/**
 * Mídia SEM FUNDO (recortes) usada nas páginas de Natal sobre o fundo grafite.
 * Os recortes ficam ao lado dos originais, que não são alterados:
 *   vídeos: /natal/videos/<nome>.mp4  ->  /natal/videos-sem-fundo/<nome>.webm
 *   fotos:  /natal/<nome>.png         ->  /natal/sem-fundo/<nome>.png
 * Gerados por tools/recorte-produtos/recortar_video.py e recortar.py.
 *
 * Só entram aqui os arquivos que têm recorte; o resto (cenas, fotos que já
 * são transparentes) continua apontando para o original.
 */

/** Vídeos de produto sobre fundo liso, que ganharam versão sem fundo (pelo prefixo do nome). */
const VIDEOS_RECORTADOS = /^(cordao-(100m|50l|drive|strobo)|fio-cobre|mangueira-neon-360)/;

/** Vídeos que NÃO têm versão sem fundo (ex.: mão segurando os fios, sem fundo limpo). */
const VIDEOS_SEM_RECORTE = new Set(["cordoes-entrada-branco"]);

/** Fotos de produto que ganharam versão sem fundo (as demais já tinham transparência ou são cenas). */
const FOTOS_RECORTADAS = new Set([
  "cordao-100m",
  "cordao-tubo-led",
  "fio-cobre-app",
  "lanterna",
  "fogos-500l",
  "arvore-86m",
  "arvore-gigante-rosa",
  "arvore-moinho",
  "bola-led-30",
  "bola-led-50",
  "festao-led-300l",
  "fita-smd-50",
  "meteoro",
]);

const VIDEO_RE = /^\/natal\/videos\/([^/?]+)\.mp4$/;
const FOTO_RE = /^\/natal\/([^/?]+)\.png$/;

/** Caminho do vídeo sem fundo, ou o próprio caminho se não houver recorte. */
export function cutoutVideoSrc(src: string): string {
  const m = VIDEO_RE.exec(src);
  if (!m || VIDEOS_SEM_RECORTE.has(m[1]) || !VIDEOS_RECORTADOS.test(m[1])) return src;
  return `/natal/videos-sem-fundo/${m[1]}.webm`;
}

/** Caminho da foto sem fundo, ou o próprio caminho se não houver recorte. */
export function cutoutImageSrc(src: string): string {
  const m = FOTO_RE.exec(src);
  if (!m || !FOTOS_RECORTADAS.has(m[1])) return src;
  return `/natal/sem-fundo/${m[1]}.png`;
}
