/**
 * Builds public/dragon-icon.png from scripts/dragon-source.png:
 * near-white → transparent, dark silhouette → matrix green (with soft edges).
 */
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const source = join(__dirname, "dragon-source.png");
const out = join(__dirname, "..", "public", "dragon-icon.png");

const buf = readFileSync(source);
const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const w = info.width;
const h = info.height;
const ch = 4;

const GR = 0;
const GG = 0xff;
const GB = 0x41;
const whiteCutoff = 0.92;

for (let p = 0; p < w * h; p++) {
  const i = p * ch;
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const L = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  if (L >= whiteCutoff) {
    data[i] = 0;
    data[i + 1] = 0;
    data[i + 2] = 0;
    data[i + 3] = 0;
    continue;
  }

  const strength = 1 - L / whiteCutoff;
  const alpha = Math.round(Math.max(0, Math.min(255, strength * 255)));
  data[i] = GR;
  data[i + 1] = GG;
  data[i + 2] = GB;
  data[i + 3] = alpha;
}

await sharp(data, { raw: { width: w, height: h, channels: 4 } })
  .png()
  .toFile(out);

console.log("wrote", out, w, "x", h);
