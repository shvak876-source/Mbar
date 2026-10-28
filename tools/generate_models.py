"""Turn garment photos into on-model photos with the OpenAI Images API.

Reads every image in the repo root and in photos/, writes the result to
models/<same name>.jpg and skips photos that already have a result.
"""
import base64
import io
import os
import sys
from pathlib import Path

from openai import OpenAI
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SOURCES = [ROOT, ROOT / "photos"]
OUT = ROOT / "models"
EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp"}

PROMPT = """Create a professional e-commerce fashion photo for a men's clothing store.
Show the exact garment from the input photo worn by a male model.

Strict rules:
- The garment must stay 100% identical to the input photo: color, fabric, texture, cut, fit,
  logos, prints, buttons, zippers, pockets and stitching. Do not change or improve anything.
- No face: crop the frame from the chin down, so no face is visible.
- Slim athletic male model, light-tan skin, natural relaxed pose.
- Neutral styling that doesn't distract (plain black or white basics, white sneakers),
  unless the input photo already shows a full outfit.
- Clean light-beige studio background (#f3efe8), soft even lighting, realistic photo, not illustration.
- If the item is shoes or an accessory, show it worn and cropped to focus on the item.
- No text, no watermark, no added logos."""


def main():
    model = os.environ.get("IMAGE_MODEL", "gpt-image-1")
    limit = int(os.environ.get("LIMIT", "0") or 0)
    client = OpenAI()
    OUT.mkdir(exist_ok=True)

    photos = sorted(
        p for src in SOURCES if src.is_dir()
        for p in src.iterdir()
        if p.suffix.lower() in EXTENSIONS
    )
    todo = [p for p in photos if not (OUT / f"{p.stem}.jpg").exists()]
    if limit:
        todo = todo[:limit]
    print(f"{len(photos)} photos found, generating {len(todo)}")

    failed = 0
    for i, photo in enumerate(todo, 1):
        print(f"[{i}/{len(todo)}] {photo.relative_to(ROOT)}", flush=True)
        try:
            with open(photo, "rb") as f:
                result = client.images.edit(
                    model=model, image=f, prompt=PROMPT,
                    size="1024x1536", quality="high",
                )
            image = Image.open(io.BytesIO(base64.b64decode(result.data[0].b64_json)))
            image.convert("RGB").save(OUT / f"{photo.stem}.jpg", quality=88, optimize=True)
        except Exception as e:  # keep going so one bad photo doesn't stop the batch
            failed += 1
            print(f"  failed: {e}", file=sys.stderr)

    print(f"done, {len(todo) - failed} created, {failed} failed")
    if failed and failed == len(todo):
        sys.exit(1)


if __name__ == "__main__":
    main()
