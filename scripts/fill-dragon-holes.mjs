/**
 * Flood-fill from image border on transparent pixels; any transparent pixel
 * not reached is an interior hole (e.g. wing membranes) → made opaque so the
 * CSS gradient mask fills them with green.
 */
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const input = join(__dirname, "..", "public", "images", "wyvern-systems-logo-matrix.png");

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const w = info.width;
const h = info.height;
const ch = info.channels;

function opaqueAt(px) {
  return data[px * ch + 3] > 128;
}

const outside = new Uint8Array(w * h);
const q = [];

function push(y, x) {
  if (y < 0 || y >= h || x < 0 || x >= w) return;
  const p = y * w + x;
  if (outside[p]) return;
  if (opaqueAt(p)) return;
  outside[p] = 1;
  q.push(p);
}

for (let x = 0; x < w; x++) {
  push(0, x);
  push(h - 1, x);
}
for (let y = 0; y < h; y++) {
  push(y, 0);
  push(y, w - 1);
}

while (q.length) {
  const p = q.pop();
  const y = Math.floor(p / w);
  const x = p % w;
  const nbs = [
    [y - 1, x],
    [y + 1, x],
    [y, x - 1],
    [y, x + 1],
  ];
  for (const [ny, nx] of nbs) push(ny, nx);
}

let filled = 0;
for (let p = 0; p < w * h; p++) {
  if (opaqueAt(p)) continue;
  if (outside[p]) continue;
  const i = p * ch;
  data[i] = 0;
  data[i + 1] = 0;
  data[i + 2] = 0;
  data[i + 3] = 255;
  filled++;
}

await sharp(data, { raw: { width: w, height: h, channels: 4 } })
  .png()
  .toFile(input);

console.log("filled interior transparent pixels:", filled);
