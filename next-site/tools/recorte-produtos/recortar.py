"""Recorte de fundo em lote para fotos de produto do catálogo natalino.

Reproduz o recorte de FOTO do "Estúdio de Recorte" (projeto "Remover fundo do vídeo"),
sem precisar abrir a interface foto por foto:

  1. máscara por IA — BiRefNet lite (mesmo modelo e pré-processamento do servidor
     do Estúdio: foto esticada para 1024x1024, normalização ImageNet, sigmoide);
  2. encolhe a borda 1px e suaviza 1px      (shrink=1, feather=1);
  3. contraste da máscara                    (contrast=190 -> 1,9);
  4. despill: tira da borda a cor do fundo   (despill=70 -> 0,7), com o fundo
     estimado em volta do produto (parede em cima, mesa embaixo).

Saída: PNG RGBA recortado no limite do produto. Com --canvas (padrão 1600x900) o
produto é centralizado numa moldura transparente 16:9, igual ao showcase do site;
use --canvas none para manter o formato do produto (ex.: figuras verticais).

Uso:
  python tools/recorte-produtos/recortar.py "<pasta de fotos>" "<pasta de saída>"
  python tools/recorte-produtos/recortar.py "<pasta>" "<saída>" --canvas none

Dependências: pip install onnxruntime numpy scipy pillow
Modelo: .models/birefnet-lite.onnx do projeto Estúdio de Recorte (ou --model <arquivo>).
"""

import argparse
import glob
import os
import time

import numpy as np
import onnxruntime as ort
from PIL import Image
from scipy import ndimage as ndi

DEFAULT_MODEL = r"C:/Users/3G/Downloads/Remover fundo do vídeo/.models/birefnet-lite.onnx"
AI_SIZE = 1024
MEAN = np.array([0.485, 0.456, 0.406], np.float32)
STD = np.array([0.229, 0.224, 0.225], np.float32)
# Padrões do Estúdio de Recorte (App.tsx -> DEFAULT_SETTINGS)
CONTRAST = 1.9
DESPILL = 0.7


def load_session(model_path: str) -> ort.InferenceSession:
    so = ort.SessionOptions()
    so.enable_cpu_mem_arena = False  # a pré-reserva de memória estourava a RAM com esse modelo
    so.enable_mem_pattern = False
    so.graph_optimization_level = ort.GraphOptimizationLevel.ORT_ENABLE_ALL
    so.intra_op_num_threads = max(1, (os.cpu_count() or 2) // 2)  # núcleos físicos
    return ort.InferenceSession(model_path, sess_options=so, providers=["CPUExecutionProvider"])


def ai_matte(sess: ort.InferenceSession, rgb: Image.Image) -> np.ndarray:
    x = np.asarray(rgb.resize((AI_SIZE, AI_SIZE), Image.BICUBIC), np.float32) / 255
    x = ((x - MEAN) / STD).transpose(2, 0, 1)[None]
    out_name = sess.get_outputs()[-1].name
    logits = sess.run([out_name], {sess.get_inputs()[0].name: x})[0].reshape(AI_SIZE, AI_SIZE)
    return 1 / (1 + np.exp(-logits))


def local_background(img: np.ndarray, alpha: np.ndarray) -> np.ndarray:
    """Cor do fundo em volta do produto, espalhada para dentro dele."""
    weight = (alpha < 0.05).astype(np.float32)
    out = np.empty_like(img)
    for k in range(3):
        near_num = ndi.gaussian_filter(img[..., k] * weight, 25)
        near_den = ndi.gaussian_filter(weight, 25)
        far = ndi.gaussian_filter(img[..., k] * weight, 120) / np.maximum(ndi.gaussian_filter(weight, 120), 1e-4)
        mix = np.clip(near_den / 0.05, 0, 1)
        out[..., k] = near_num / np.maximum(near_den, 1e-4) * mix + far * (1 - mix)
    return out


def cutout(sess: ort.InferenceSession, path: str) -> Image.Image:
    rgb = Image.open(path).convert("RGB")
    w, h = rgb.size
    matte = Image.fromarray((ai_matte(sess, rgb) * 255).astype(np.uint8)).resize((w, h), Image.BILINEAR)
    a = np.asarray(matte, np.float32) / 255
    a = ndi.minimum_filter(a, size=3)              # shrink 1
    a = ndi.uniform_filter(a, size=3)              # feather 1
    a = np.clip((a - 0.5) * CONTRAST + 0.5, 0, 1)  # contraste do recorte
    img = np.asarray(rgb, np.float32) / 255
    bg = local_background(img, a)
    edge = (a > 0.004) & (a < 0.996)
    clean = np.clip((img - bg * (1 - a[..., None])) / np.maximum(a[..., None], 1e-3), 0, 1)
    col = np.where(edge[..., None], img * (1 - DESPILL) + clean * DESPILL, img)
    return Image.fromarray((np.dstack([col, a]) * 255).round().astype(np.uint8), "RGBA")


def frame(im: Image.Image, canvas: tuple[int, int] | None) -> Image.Image:
    box = im.getchannel("A").point(lambda v: 255 if v > 20 else 0).getbbox()
    if box:
        im = im.crop(box)
    if canvas is None:
        pad = int(max(im.size) * 0.03)
        framed = Image.new("RGBA", (im.width + 2 * pad, im.height + 2 * pad), (0, 0, 0, 0))
        framed.alpha_composite(im, (pad, pad))
        scale = min(1.0, 1600 / max(framed.size))
        if scale < 1:
            framed = framed.resize((round(framed.width * scale), round(framed.height * scale)), Image.LANCZOS)
        return framed
    cw, ch = canvas
    scale = min(1.0, (cw - 100) / im.width, (ch - 100) / im.height)
    if scale < 1:
        im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
    framed = Image.new("RGBA", (cw, ch), (0, 0, 0, 0))
    framed.alpha_composite(im, ((cw - im.width) // 2, (ch - im.height) // 2))
    return framed


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("entrada", help="pasta com as fotos (.jpg/.jpeg/.png), lida recursivamente")
    ap.add_argument("saida", help="pasta onde os PNGs recortados serão gravados")
    ap.add_argument("--canvas", default="1600x900", help="moldura LxA ou 'none' (padrão 1600x900)")
    ap.add_argument("--model", default=DEFAULT_MODEL, help="caminho do birefnet-lite.onnx")
    args = ap.parse_args()

    canvas = None if args.canvas.lower() == "none" else tuple(int(v) for v in args.canvas.lower().split("x"))
    if not os.path.isfile(args.model):
        raise SystemExit(f"Modelo não encontrado: {args.model}")
    files = sorted(
        p for ext in ("jpg", "jpeg", "png")
        for p in glob.glob(os.path.join(args.entrada, "**", f"*.{ext}"), recursive=True)
    )
    if not files:
        raise SystemExit(f"Nenhuma foto encontrada em {args.entrada}")

    sess = load_session(args.model)
    for path in files:
        t0 = time.time()
        rel = os.path.splitext(os.path.relpath(path, args.entrada))[0] + ".png"
        dst = os.path.join(args.saida, rel)
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        frame(cutout(sess, path), canvas).save(dst, optimize=True)
        print(f"{rel}  {time.time() - t0:.1f}s", flush=True)


if __name__ == "__main__":
    main()
