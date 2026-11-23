"""Recorte de fundo em lote para os vídeos de produto do catálogo natalino.

Os vídeos do catálogo são foto de estúdio em movimento: produto parado, câmera
fixa, fundo cinza-claro quase uniforme; só as luzes acendem e piscam. Por isso a
silhueta quase não muda ao longo do vídeo e não precisa de IA quadro a quadro
(milhares de passadas de CPU). O método:

  1. a IA (BiRefNet lite, o mesmo de recortar.py) calcula a máscara em N quadros
     espalhados pelo vídeo;
  2. a mediana das máscaras vira a máscara fixa do vídeo (robusta a um quadro em
     que o brilho de uma luz confunde a IA); o relatório mostra o quanto as
     máscaras concordam entre si — concordância baixa = produto se mexe, e este
     método não serve para aquele vídeo;
  3. a cor do fundo é estimada uma vez em volta do produto;
  4. cada quadro recebe a máscara fixa e a limpeza de borda (despill) de
     recortar.py, e sai em WebM VP9 com canal alfa (yuva420p).

Saída: <saida>/<nome>.webm, mesmas dimensões e fps do original, fundo
transparente. Os originais nunca são alterados.

Uso:
  python tools/recorte-produtos/recortar_video.py "<video.mp4 ou pasta>" "<pasta de saída>"
  python tools/recorte-produtos/recortar_video.py "<pasta>" "<saída>" --amostras 9 --crf 28

Observação: WebM com alfa toca no Chrome, Edge e Firefox. O Safari não renderiza
o alfa do VP9 (precisa de HEVC com alfa em .mov).
"""

import argparse
import glob
import importlib.util
import os
import subprocess
import time

import numpy as np
from PIL import Image
from scipy import ndimage as ndi

HERE = os.path.dirname(os.path.abspath(__file__))


def _load_photo_tool():
    """Reaproveita o modelo e as funções de máscara do recortar.py (fotos)."""
    spec = importlib.util.spec_from_file_location("recortar", os.path.join(HERE, "recortar.py"))
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


photo = _load_photo_tool()


def probe(path: str) -> tuple[int, int, float, float]:
    """Largura, altura, fps e duração (s) do vídeo."""
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v:0",
         "-show_entries", "stream=width,height,r_frame_rate:format=duration",
         "-of", "default=nw=1:nk=1", path],
        capture_output=True, text=True, check=True,
    ).stdout.split()
    w, h = int(out[0]), int(out[1])
    num, den = (int(x) for x in out[2].split("/"))
    return w, h, num / den, float(out[3])


def fit_size(w: int, h: int, max_w: int) -> tuple[int, int]:
    """Reduz (sem ampliar) para no máximo max_w de largura, com medidas pares."""
    if w <= max_w:
        return w, h
    nw = max_w - (max_w % 2)
    nh = round(h * nw / w)
    return nw, nh - (nh % 2)


def read_frame_at(path: str, t: float, w: int, h: int) -> np.ndarray:
    """Um quadro RGB (float 0..1) no instante t, já na resolução de saída w x h."""
    raw = subprocess.run(
        ["ffmpeg", "-v", "error", "-ss", f"{t:.3f}", "-i", path, "-frames:v", "1",
         "-vf", f"scale={w}:{h}:flags=lanczos", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
        capture_output=True, check=True,
    ).stdout
    return np.frombuffer(raw, np.uint8).reshape(h, w, 3).astype(np.float32) / 255


def static_matte(sess, path: str, w: int, h: int, duration: float, samples: int):
    """Máscara fixa (mediana das máscaras da IA) + quadro de referência + concordância."""
    times = [duration * (i + 0.5) / samples for i in range(samples)]
    mattes, frames = [], []
    for t in times:
        img = read_frame_at(path, t, w, h)
        rgb = Image.fromarray((img * 255).round().astype(np.uint8))
        mattes.append(photo.refine_alpha(photo.ai_alpha(sess, rgb)))
        frames.append(img)
    stack = np.stack(mattes)
    median = np.median(stack, axis=0).astype(np.float32)
    core = median > 0.5
    ious = []
    for m in stack:
        mm = m > 0.5
        union = (mm | core).sum()
        ious.append((mm & core).sum() / union if union else 1.0)
    return median, frames[len(frames) // 2], float(np.mean(ious)), float(np.min(ious))


def cut_video(sess, src: str, dst: str, samples: int, crf: int, max_w: int) -> tuple[float, float]:
    src_w, src_h, fps, duration = probe(src)
    w, h = fit_size(src_w, src_h, max_w)
    alpha, ref, iou_mean, iou_min = static_matte(sess, src, w, h, duration, samples)
    bg = photo.local_background(ref, alpha)

    edge = (alpha > 0.004) & (alpha < 0.996)
    a3 = alpha[..., None]
    inv = bg * (1 - a3)
    safe_a = np.maximum(a3, 1e-3)
    rgba_a = (alpha * 255).round().astype(np.uint8)

    os.makedirs(os.path.dirname(dst), exist_ok=True)
    dec = subprocess.Popen(
        ["ffmpeg", "-v", "error", "-i", src, "-vf", f"scale={w}:{h}:flags=lanczos",
         "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
        stdout=subprocess.PIPE,
    )
    enc = subprocess.Popen(
        ["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgba", "-s", f"{w}x{h}",
         "-r", f"{fps}", "-i", "-", "-an", "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p",
         "-auto-alt-ref", "0", "-b:v", "0", "-crf", str(crf), "-row-mt", "1", "-threads", "8", dst],
        stdin=subprocess.PIPE,
    )
    size = w * h * 3
    while True:
        buf = dec.stdout.read(size)
        if len(buf) < size:
            break
        img = np.frombuffer(buf, np.uint8).reshape(h, w, 3).astype(np.float32) / 255
        clean = np.clip((img - inv) / safe_a, 0, 1)
        col = np.where(edge[..., None], img * (1 - photo.DESPILL) + clean * photo.DESPILL, img)
        rgba = np.empty((h, w, 4), np.uint8)
        rgba[..., :3] = (col * 255).round().astype(np.uint8)
        rgba[..., 3] = rgba_a
        enc.stdin.write(rgba.tobytes())
    enc.stdin.close()
    dec.stdout.close()
    if enc.wait() != 0 or dec.wait() != 0:
        raise RuntimeError(f"ffmpeg falhou em {src}")
    return iou_mean, iou_min


def decode_frames(src: str, w: int, h: int):
    """Gera os quadros RGB (float32 0..1) do vídeo, na resolução w x h."""
    dec = subprocess.Popen(
        ["ffmpeg", "-v", "error", "-i", src, "-vf", f"scale={w}:{h}:flags=lanczos",
         "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
        stdout=subprocess.PIPE,
    )
    size = w * h * 3
    try:
        while True:
            buf = dec.stdout.read(size)
            if len(buf) < size:
                break
            yield np.frombuffer(buf, np.uint8).reshape(h, w, 3).astype(np.float32) / 255
    finally:
        dec.stdout.close()
        dec.wait()


def object_silhouette(sess, img: np.ndarray, margin: int) -> np.ndarray:
    """Silhueta aproximada do objeto principal (maior componente da IA), engordada
    em `margin` px: ela só decide ONDE está o objeto; o recorte fino vem da luz."""
    rgb = Image.fromarray((img * 255).round().astype(np.uint8))
    mask = photo.refine_alpha(photo.ai_alpha(sess, rgb)) > 0.5
    lab, n = ndi.label(mask)
    if n == 0:
        return mask
    sizes = ndi.sum(mask, lab, range(1, n + 1))
    largest = lab == (1 + int(np.argmax(sizes)))
    return ndi.maximum_filter(largest.astype(np.uint8), size=2 * margin + 1).astype(bool)


def smoothstep(x: np.ndarray) -> np.ndarray:
    x = np.clip(x, 0, 1)
    return x * x * (3 - 2 * x)


def cut_video_movel(sess, src: str, dst: str, step: int, crf: int, max_w: int,
                    margin: int = 10, t0: float = 0.08, t1: float = 0.28) -> int:
    """Modo câmera em movimento (objeto luminoso sobre fundo escuro).

    A IA roda a cada `step` quadros (é o passo caro: ~13 s por passada no CPU);
    nos quadros do meio vale a união das silhuetas dos quadros-chave vizinhos. O
    recorte fino de cada quadro vem da LUZ: alfa = brilho do pixel (o que brilha é
    objeto; o escuro é fundo) dentro da silhueta, e a cor é "descolada" do fundo
    preto — o resultado se soma bem a qualquer fundo escuro. O vídeo sai cortado
    no retângulo que contém o objeto em todos os quadros.
    Devolve o número de quadros-chave processados pela IA."""
    src_w, src_h, fps, duration = probe(src)
    w, h = fit_size(src_w, src_h, max_w)
    total = max(1, round(duration * fps))
    wanted = set(range(0, total, step)) | {total - 1}

    # passada 1: silhuetas nos quadros-chave
    sils: dict[int, np.ndarray] = {}
    last_idx, last_img = -1, None
    for idx, img in enumerate(decode_frames(src, w, h)):
        last_idx, last_img = idx, img
        if idx in wanted:
            sils[idx] = object_silhouette(sess, img, margin)
    if last_img is not None and last_idx not in sils:
        sils[last_idx] = object_silhouette(sess, last_img, margin)
    keys = sorted(sils)

    # retângulo que contém o objeto em todos os quadros
    rows = np.zeros(h, bool)
    cols = np.zeros(w, bool)
    for s in sils.values():
        rows |= s.any(axis=1)
        cols |= s.any(axis=0)
    ys, xs = np.where(rows)[0], np.where(cols)[0]
    y0, y1 = max(int(ys[0]) - 8, 0), min(int(ys[-1]) + 9, h)
    x0, x1 = max(int(xs[0]) - 8, 0), min(int(xs[-1]) + 9, w)
    ch, cw = (y1 - y0) & ~1, (x1 - x0) & ~1
    y1, x1 = y0 + ch, x0 + cw

    os.makedirs(os.path.dirname(dst), exist_ok=True)
    enc = subprocess.Popen(
        ["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgba", "-s", f"{cw}x{ch}",
         "-r", f"{fps}", "-i", "-", "-an", "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p",
         "-auto-alt-ref", "0", "-b:v", "0", "-crf", str(crf), "-row-mt", "1", "-threads", "8", dst],
        stdin=subprocess.PIPE,
    )
    # passada 2: recorte fino pela luz, já no retângulo do objeto
    for idx, img in enumerate(decode_frames(src, w, h)):
        prev = max(k for k in keys if k <= idx) if idx >= keys[0] else keys[0]
        nxt = min((k for k in keys if k >= idx), default=keys[-1])
        sil = (sils[prev] | sils[nxt])[y0:y1, x0:x1]
        crop = img[y0:y1, x0:x1]
        soft = ndi.gaussian_filter(sil.astype(np.float32), 1.5)
        glow = smoothstep((crop.max(axis=2) - t0) / (t1 - t0))
        a = glow * soft
        a3 = a[..., None]
        col = np.where(a3 < 0.98, np.clip(crop / np.maximum(a3, 1e-3), 0, 1), crop)
        rgba = np.empty((ch, cw, 4), np.uint8)
        rgba[..., :3] = (col * 255).round().astype(np.uint8)
        rgba[..., 3] = (a * 255).round().astype(np.uint8)
        enc.stdin.write(rgba.tobytes())
    enc.stdin.close()
    if enc.wait() != 0:
        raise RuntimeError(f"ffmpeg falhou em {src}")
    print(f"  recorte {cw}x{ch} (a partir de {w}x{h}), {len(keys)} quadros pela IA", flush=True)
    return len(keys)


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("entrada", help="um .mp4 ou uma pasta com .mp4 (lida recursivamente)")
    ap.add_argument("saida", help="pasta onde os .webm sem fundo serão gravados")
    ap.add_argument("--amostras", type=int, default=7, help="quadros usados para a máscara (padrão 7)")
    ap.add_argument("--crf", type=int, default=30, help="qualidade VP9, menor = melhor (padrão 30)")
    ap.add_argument("--largura-max", type=int, default=1280, help="reduz vídeos maiores que isso (padrão 1280)")
    ap.add_argument("--excluir", nargs="*", default=[], help="pula arquivos cujo nome contenha algum destes textos")
    ap.add_argument("--refazer", action="store_true", help="regrava mesmo se o .webm já existir")
    ap.add_argument("--movel", action="store_true",
                    help="câmera em movimento (objeto luminoso sobre fundo escuro): silhueta pela IA a "
                         "cada --cada quadros e recorte fino pela luz; sai cortado no objeto")
    ap.add_argument("--cada", type=int, default=4, help="(--movel) IA a cada N quadros (padrão 4)")
    ap.add_argument("--model", default=photo.DEFAULT_MODEL, help="caminho do birefnet-lite.onnx")
    args = ap.parse_args()

    if not os.path.isfile(args.model):
        raise SystemExit(f"Modelo não encontrado: {args.model}")
    if os.path.isfile(args.entrada):
        files, root = [args.entrada], os.path.dirname(args.entrada)
    else:
        files = sorted(glob.glob(os.path.join(args.entrada, "**", "*.mp4"), recursive=True))
        root = args.entrada
    if not files:
        raise SystemExit(f"Nenhum .mp4 encontrado em {args.entrada}")

    files = [f for f in files if not any(x in os.path.basename(f) for x in args.excluir)]
    sess = photo.load_session(args.model)
    for src in files:
        t0 = time.time()
        rel = os.path.splitext(os.path.relpath(src, root))[0] + ".webm"
        dst = os.path.join(args.saida, rel)
        if os.path.isfile(dst) and not args.refazer:
            print(f"{rel}  ja existe, pulando", flush=True)
            continue
        if args.movel:
            cut_video_movel(sess, src, dst, args.cada, args.crf, args.largura_max)
            print(f"{rel}  {os.path.getsize(dst) // 1024}KB  {time.time() - t0:.0f}s", flush=True)
            continue
        iou_mean, iou_min = cut_video(sess, src, dst, args.amostras, args.crf, args.largura_max)
        kb = os.path.getsize(dst) // 1024
        print(f"{rel}  concordancia media {iou_mean:.3f} (min {iou_min:.3f})  {kb}KB  {time.time() - t0:.0f}s", flush=True)


if __name__ == "__main__":
    main()
