"""Recorte de fundo em lote para fotos de produto do catálogo natalino.

Reproduz o recorte de FOTO do "Estúdio de Recorte" (projeto "Remover fundo do vídeo"),
sem precisar abrir a interface foto por foto.

MODOS (--modo)

  padrao   (cordões compactos, figuras de poste)
    1. máscara por IA — BiRefNet lite (mesmo modelo e pré-processamento do servidor
       do Estúdio: foto esticada para 1024x1024, normalização ImageNet, sigmoide);
    2. encolhe a borda 1px e suaviza 1px      (shrink=1, feather=1);
    3. contraste da máscara                    (contrast=190 -> 1,9);
    4. despill: tira da borda a cor do fundo   (despill=70 -> 0,7), com o fundo
       estimado em volta do produto (parede em cima, mesa embaixo).

  luminoso (produto aceso, cheio de vãos e fios finos: bolas, malhas, cortinas)
    A IA só decide ONDE está o produto (silhueta, rodando sobre um recorte justo
    em volta dele para ganhar resolução). A transparência de cada fio vem da COR:
    distância do pixel ao fundo estimado em volta do objeto, com limiar exigente e
    curva suave — assim os vãos ficam realmente vazados e a malha fica densa como
    na foto. Cor "limpa" (sem fundo) em tudo que é parcialmente transparente.

Saída: PNG RGBA recortado no limite do produto. Com --canvas (padrão 1600x900) o
produto é centralizado numa moldura transparente 16:9, igual ao showcase do site;
use --canvas none para manter o formato do produto (ex.: figuras verticais).

Uso:
  python tools/recorte-produtos/recortar.py "<pasta de fotos>" "<pasta de saída>"
  python tools/recorte-produtos/recortar.py "<pasta>" "<saída>" --canvas none
  python tools/recorte-produtos/recortar.py "<pasta>" "<saída>" --modo luminoso --sem-cabo --largura 700

Opções do modo luminoso:
  --sem-cabo     remove cabo/fios soltos (só fica o corpo redondo, ex.: bola)
  --largura N    escala o produto para N px de largura (mesmo tamanho entre as cores)

Dependências: pip install onnxruntime numpy scipy scikit-image pillow
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
from skimage.morphology import disk

DEFAULT_MODEL = r"C:/Users/3G/Downloads/Remover fundo do vídeo/.models/birefnet-lite.onnx"
AI_SIZE = 1024
MEAN = np.array([0.485, 0.456, 0.406], np.float32)
STD = np.array([0.229, 0.224, 0.225], np.float32)
# Padrões do Estúdio de Recorte (App.tsx -> DEFAULT_SETTINGS)
CONTRAST = 1.9
DESPILL = 0.7
# Modo luminoso (calibrado nas bolas de LED fotografadas em fundo escuro)
GLOW_T0 = 0.10   # distância ao fundo abaixo da qual o pixel é fundo
GLOW_T1 = 0.30   # distância acima da qual o pixel é totalmente produto


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


def ai_alpha(sess: ort.InferenceSession, rgb: Image.Image) -> np.ndarray:
    """Máscara da IA na resolução da imagem, em 0..1."""
    w, h = rgb.size
    m = Image.fromarray((ai_matte(sess, rgb) * 255).astype(np.uint8)).resize((w, h), Image.BILINEAR)
    return np.asarray(m, np.float32) / 255


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


def refine_alpha(a: np.ndarray) -> np.ndarray:
    a = ndi.minimum_filter(a, size=3)              # shrink 1
    a = ndi.uniform_filter(a, size=3)              # feather 1
    return np.clip((a - 0.5) * CONTRAST + 0.5, 0, 1)


def cutout(sess: ort.InferenceSession, path: str) -> Image.Image:
    """Modo padrão."""
    rgb = Image.open(path).convert("RGB")
    a = refine_alpha(ai_alpha(sess, rgb))
    img = np.asarray(rgb, np.float32) / 255
    bg = local_background(img, a)
    edge = (a > 0.004) & (a < 0.996)
    clean = np.clip((img - bg * (1 - a[..., None])) / np.maximum(a[..., None], 1e-3), 0, 1)
    col = np.where(edge[..., None], img * (1 - DESPILL) + clean * DESPILL, img)
    return Image.fromarray((np.dstack([col, a]) * 255).round().astype(np.uint8), "RGBA")


def _largest(mask: np.ndarray) -> np.ndarray:
    lab, n = ndi.label(mask)
    if n == 0:
        raise ValueError("nenhum objeto encontrado na foto")
    sizes = ndi.sum(mask, lab, range(1, n + 1))
    return lab == (1 + int(np.argmax(sizes)))


def _tight_crop_box(alpha: np.ndarray) -> tuple[int, int, int, int]:
    """Quadrado em volta do corpo do objeto (margem de 35%) para rodar a IA com mais resolução."""
    solid = ndi.binary_fill_holes(ndi.binary_closing(alpha > 0.25, structure=disk(14)))
    body = _largest(ndi.binary_opening(solid, structure=disk(18)))
    ys, xs = np.where(body)
    cx, cy = (xs.min() + xs.max()) / 2, (ys.min() + ys.max()) / 2
    side = int(max(xs.max() - xs.min(), ys.max() - ys.min()) * 1.35)
    left, top = int(cx - side / 2), int(cy - side / 2)
    return left, top, left + side, top + side


def _smooth(x: np.ndarray) -> np.ndarray:
    x = np.clip(x, 0, 1)
    return x * x * (3 - 2 * x)


def luminous_cutout(sess: ort.InferenceSession, path: str, drop_cable: bool = False) -> Image.Image:
    """Modo luminoso: IA = silhueta; cor = transparência de cada fio."""
    rgb = Image.open(path).convert("RGB")
    w, h = rgb.size
    img = np.asarray(rgb, np.float32) / 255

    # 1) passada grossa só para achar o objeto; 2) IA de novo, só em volta dele
    coarse = refine_alpha(ai_alpha(sess, rgb))
    box = _tight_crop_box(coarse)
    crop_alpha = ai_alpha(sess, rgb.crop(box))
    fine = np.zeros((h, w), np.float32)
    left, top = max(box[0], 0), max(box[1], 0)
    right, bottom = min(box[2], w), min(box[3], h)
    fine[top:bottom, left:right] = crop_alpha[top - box[1]:bottom - box[1], left - box[0]:right - box[0]]
    fine = refine_alpha(fine)

    # silhueta sólida (sem os vãos) — sem margem, para não gerar contorno escuro
    sil = ndi.binary_fill_holes(ndi.binary_closing(fine > 0.3, structure=disk(10)))
    if drop_cable:
        body = _largest(ndi.binary_opening(sil, structure=disk(18)))
        sil = ndi.binary_dilation(body, structure=disk(14)) & sil
    sil = ndi.binary_erosion(sil, structure=disk(2))
    soft_sil = ndi.gaussian_filter(sil.astype(np.float32), 1.0)

    # fundo estimado só com o que está fora do objeto
    bg = local_background(img, ndi.binary_dilation(sil, structure=disk(22)).astype(np.float32))

    # transparência pela cor: luminância + croma contra o fundo local
    luma = lambda x: 0.299 * x[..., 0] + 0.587 * x[..., 1] + 0.114 * x[..., 2]
    ya, yb = luma(img), luma(bg)
    chroma = (img - ya[..., None]) - (bg - yb[..., None])
    dist = np.sqrt((ya - yb) ** 2 + (chroma ** 2).sum(-1) * 4)
    a = _smooth((dist - GLOW_T0) / (GLOW_T1 - GLOW_T0)) * soft_sil

    clean = np.clip((img - bg * (1 - a[..., None])) / np.maximum(a[..., None], 1e-3), 0, 1)
    col = np.where((a < 0.98)[..., None], clean, img)
    return Image.fromarray((np.dstack([col, a]) * 255).round().astype(np.uint8), "RGBA")


def frame(
    im: Image.Image,
    canvas: tuple[int, int] | None,
    width: int | None = None,
) -> Image.Image:
    box = im.getchannel("A").point(lambda v: 255 if v > 20 else 0).getbbox()
    if box:
        im = im.crop(box)
    if width:  # mesmo tamanho de objeto entre as cores
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
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
    ap.add_argument("--modo", choices=("padrao", "luminoso"), default="padrao")
    ap.add_argument("--sem-cabo", action="store_true", help="(luminoso) remove cabo/fios soltos")
    ap.add_argument("--largura", type=int, default=None, help="escala o produto para N px de largura")
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
        cut = luminous_cutout(sess, path, args.sem_cabo) if args.modo == "luminoso" else cutout(sess, path)
        frame(cut, canvas, args.largura).save(dst, optimize=True)
        print(f"{rel}  {time.time() - t0:.1f}s", flush=True)


if __name__ == "__main__":
    main()
