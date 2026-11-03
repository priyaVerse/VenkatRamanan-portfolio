#!/usr/bin/env python3
"""Render pages of the source PDF into web-ready images + a manifest.

Usage:  python3 scripts/prepare_assets.py [path/to/source.pdf]
Needs:  poppler-utils (pdftoppm) and Pillow.
Edit PAGES below to add / rename / re-map pages. Re-run after changing the PDF.
Loose screenshots: put them in source-images/<folder>/<id>.png (folder e.g. mep, coordination)
and re-run; then describe each new id in src/data/assets.ts.
"""
import json, subprocess, sys, tempfile, os
from pathlib import Path
from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parent.parent
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "public/pdf/bim-drawings.pdf"
OUT = ROOT / "public/assets"

# id: (folder, pdf_page, dpi, trim_whitespace)
PAGES = {
    # --- Visualization renders (Lumion)
    "render-01": ("visualization", 12, 150, True),
    "render-02": ("visualization", 13, 150, True),
    "render-03": ("visualization", 14, 150, True),
    "render-04": ("visualization", 15, 150, True),
    "render-05": ("visualization", 16, 150, True),
    # --- Architecture: Revit views
    "arch-3d-01": ("architecture", 27, 170, True),
    "arch-3d-02": ("architecture", 28, 170, True),
    "arch-roof-plan": ("architecture", 29, 170, True),
    "arch-elevation": ("architecture", 30, 170, True),
    # --- Architecture: documentation sheets (never trimmed)
    "plan-gf-rooms": ("sheets", 1, 200, False),
    "plan-ff-rooms": ("sheets", 2, 200, False),
    "plan-sf-rooms": ("sheets", 3, 200, False),
    "plan-gf-dims": ("sheets", 4, 200, False),
    "plan-ff-dims": ("sheets", 5, 200, False),
    "plan-sf-dims": ("sheets", 6, 200, False),
    "plan-gf-grid": ("sheets", 38, 200, False),
    "plan-sf-grid": ("sheets", 48, 200, False),
    "plan-ff-grid": ("sheets", 49, 200, False),
    "plan-gf-cad": ("sheets", 37, 200, False),
    "plan-ff-cad": ("sheets", 36, 200, False),
    "plan-sf-cad": ("sheets", 39, 200, False),
    # --- Structure
    "str-analytical": ("structure", 40, 200, False),
    "str-rebar-views": ("structure", 41, 200, False),
    "str-footing": ("structure", 42, 200, False),
    "str-columns": ("structure", 43, 200, False),
    "str-beams": ("structure", 44, 200, False),
    "str-slab-1": ("structure", 45, 200, False),
    "str-slab-2": ("structure", 46, 200, False),
    "str-schedule": ("structure", 47, 200, False),
    # --- MEP
    "mep-hvac-elev-front": ("mep", 17, 170, True),
    "mep-hvac-elev-side": ("mep", 18, 170, True),
    "mep-hvac-iso": ("mep", 19, 170, True),
    "mep-duct-l1": ("mep", 20, 200, True),
    "mep-duct-l2": ("mep", 21, 200, True),
    "mep-duct-l3": ("mep", 22, 200, True),
    "mep-plumb-section": ("mep", 23, 170, True),
    "mep-plumb-iso": ("mep", 24, 170, True),
    # --- Coordination (Navisworks)
    "coord-clash-01": ("coordination", 7, 170, True),
    "coord-clash-02": ("coordination", 8, 170, True),
    "coord-clash-03": ("coordination", 9, 170, True),
    "coord-clash-04": ("coordination", 10, 170, True),
    "coord-clash-05": ("coordination", 11, 170, True),
    "coord-section-01": ("coordination", 31, 170, True),
    "coord-section-02": ("coordination", 32, 170, True),
    "coord-4d-01": ("coordination", 33, 170, True),
    "coord-4d-02": ("coordination", 34, 170, True),
    "coord-4d-03": ("coordination", 35, 170, True),
    # --- Planning (Primavera P6)
    "plan-p6-gantt": ("planning", 25, 220, True),
    "plan-p6-wbs": ("planning", 26, 200, True),
}

THUMB_W = 1000
PAD = 28

def trim(im: Image.Image) -> Image.Image:
    bg = Image.new("RGB", im.size, (255, 255, 255))
    diff = ImageChops.difference(im, bg).convert("L").point(lambda p: 255 if p > 12 else 0)
    box = diff.getbbox()
    if not box:
        return im
    l, t, r, b = box
    return im.crop((max(0, l - PAD), max(0, t - PAD), min(im.width, r + PAD), min(im.height, b + PAD)))

def main():
    manifest = {}
    with tempfile.TemporaryDirectory() as tmp:
        for aid, (folder, page, dpi, do_trim) in PAGES.items():
            base = Path(tmp) / aid
            subprocess.run(["pdftoppm", "-jpeg", "-jpegopt", "quality=88", "-r", str(dpi),
                            "-f", str(page), "-l", str(page), "-singlefile", str(SRC), str(base)], check=True)
            im = Image.open(str(base) + ".jpg").convert("RGB")
            if do_trim:
                im = trim(im)
            d = OUT / folder
            (d / "thumbs").mkdir(parents=True, exist_ok=True)
            im.save(d / f"{aid}.jpg", quality=86, optimize=True, progressive=True)
            th = im.copy()
            if th.width > THUMB_W:
                th = th.resize((THUMB_W, round(th.height * THUMB_W / th.width)), Image.LANCZOS)
            th.save(d / "thumbs" / f"{aid}.jpg", quality=80, optimize=True, progressive=True)
            manifest[aid] = {"src": f"assets/{folder}/{aid}.jpg", "thumb": f"assets/{folder}/thumbs/{aid}.jpg",
                             "w": im.width, "h": im.height, "page": page}
            print(f"{aid:22s} p{page:<3d} {im.width}x{im.height}")
    # Loose screenshots: source-images/<folder>/<id>.(png|jpg|jpeg)  ->  page 0 (no PDF page)
    extra = ROOT / "source-images"
    if extra.is_dir():
        for f in sorted(extra.glob("*/*")):
            if f.suffix.lower() not in (".png", ".jpg", ".jpeg"):
                continue
            aid, folder = f.stem, f.parent.name
            im = Image.open(f).convert("RGB")
            if im.width > 2600:
                im = im.resize((2600, round(im.height * 2600 / im.width)), Image.LANCZOS)
            d = OUT / folder
            (d / "thumbs").mkdir(parents=True, exist_ok=True)
            im.save(d / f"{aid}.jpg", quality=86, optimize=True, progressive=True)
            th = im.copy()
            if th.width > THUMB_W:
                th = th.resize((THUMB_W, round(th.height * THUMB_W / th.width)), Image.LANCZOS)
            th.save(d / "thumbs" / f"{aid}.jpg", quality=80, optimize=True, progressive=True)
            manifest[aid] = {"src": f"assets/{folder}/{aid}.jpg", "thumb": f"assets/{folder}/thumbs/{aid}.jpg",
                             "w": im.width, "h": im.height, "page": 0}
            print(f"{aid:22s} (loose image) {im.width}x{im.height}")
    (ROOT / "src/data/manifest.json").write_text(json.dumps(manifest, indent=1))

if __name__ == "__main__":
    main()
