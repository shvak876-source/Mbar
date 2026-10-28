"""Turn garment photos into on-model photos with the Gemini image API.

Reads every image in the repo root and in photos/, writes the result to
models/<same name>.jpg and skips photos that already have a result.
"""
import base64
import io
import os
import sys
import time
from pathlib import Path

import requests
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SOURCES = [ROOT, ROOT / "photos"]
OUT = ROOT / "models"
EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp"}
API = "https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"

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
- Vertical 3:4 framing.
- If the item is shoes or an accessory, show it worn and cropped to focus on the item.
- No text, no watermark, no added logos."""


def generate(photo, model, key):
    """Send one photo to Gemini and return the generated image, retrying on rate limits."""
    image = Image.open(photo).convert("RGB")
    image.thumbnail((1536, 1536))
    buf = io.BytesIO()
    image.save(buf, "JPEG", quality=90)
    body = {
        "contents": [{"parts": [
            {"text": PROMPT},
            {"inline_data": {"mime_type": "image/jpeg", "data": base64.b64encode(buf.getvalue()).decode()}},
        ]}],
        "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": "3:4"}},
    }
    for attempt in range(5):
        r = requests.post(API.format(model=model), json=body, headers={"x-goog-api-key": key}, timeout=180)
        if r.status_code in (429, 500, 503):
            time.sleep(20 * (attempt + 1))
            continue
        r.raise_for_status()
        for part in r.json()["candidates"][0]["content"]["parts"]:
            data = part.get("inlineData") or part.get("inline_data")
            if data:
                return Image.open(io.BytesIO(base64.b64decode(data["data"])))
        raise RuntimeError(f"no image in response: {r.text[:300]}")
    raise RuntimeError(f"gave up after rate limits: {r.text[:300]}")


def main():
    model = os.environ.get("IMAGE_MODEL") or "gemini-2.5-flash-image"
    limit = int(os.environ.get("LIMIT", "0") or 0)
    key = os.environ["GEMINI_API_KEY"]
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
            generate(photo, model, key).convert("RGB").save(OUT / f"{photo.stem}.jpg", quality=88, optimize=True)
        except Exception as e:  # keep going so one bad photo doesn't stop the batch
            failed += 1
            print(f"  failed: {e}", file=sys.stderr)

    print(f"done, {len(todo) - failed} created, {failed} failed")
    if failed and failed == len(todo):
        sys.exit(1)


if __name__ == "__main__":
    main()
