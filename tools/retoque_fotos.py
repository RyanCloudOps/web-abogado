"""Retoque suave de las fotos del abogado (no cambia rasgos).

- Suaviza la piel (difuminado solo en zonas sin bordes: arrugas finas, textura)
- Aclara sombras y da un tono cálido, más luminoso y amigable
Lee de assets/img/originales/ y escribe en assets/img/.
Uso: python tools/retoque_fotos.py
"""
from pathlib import Path
from PIL import Image, ImageChops, ImageEnhance, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "img" / "originales"
DST = ROOT / "assets" / "img"
# amilcar-despacho y amilcar-colegio-abogados ya vienen retocadas por el cliente: no se procesan
FOTOS = ["amilcar-despacho-2.webp"]


def suavizar_piel(img: Image.Image, fuerza: float = 0.55) -> Image.Image:
    w, h = img.size
    radio = max(2, round(min(w, h) / 260))
    suave = img.filter(ImageFilter.GaussianBlur(radio))
    # Mascara: 255 donde NO hay bordes marcados (ojos, labios, contorno se preservan)
    bordes = img.convert("L").filter(ImageFilter.FIND_EDGES).filter(ImageFilter.GaussianBlur(radio))
    bordes = bordes.point(lambda v: 255 if v > 18 else v * 14)
    mascara = ImageChops.invert(bordes).point(lambda v: int(v * fuerza))
    return Image.composite(suave, img, mascara)


def calidez(img: Image.Image, r: float = 1.04, b: float = 0.96) -> Image.Image:
    R, G, B = img.split()
    R = R.point(lambda v: min(255, int(v * r)))
    B = B.point(lambda v: int(v * b))
    return Image.merge("RGB", (R, G, B))


def levantar_sombras(img: Image.Image, cantidad: float = 0.18) -> Image.Image:
    # Curva suave: aclara tonos oscuros sin quemar las luces
    lut = [min(255, int(v + cantidad * (255 - v) * (1 - v / 255) ** 1.5)) for v in range(256)]
    return img.point(lut * 3)


for nombre in FOTOS:
    img = Image.open(SRC / nombre).convert("RGB")
    img = suavizar_piel(img)
    img = levantar_sombras(img)
    img = calidez(img)
    img = ImageEnhance.Brightness(img).enhance(1.05)
    img = ImageEnhance.Contrast(img).enhance(0.96)
    img = ImageEnhance.Color(img).enhance(1.06)
    img = img.filter(ImageFilter.UnsharpMask(radius=1.2, percent=40, threshold=3))
    img.save(DST / nombre, "WEBP", quality=88)
    print("ok", nombre)
