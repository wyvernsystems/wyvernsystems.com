/**
 * Remove only the wide rock shelf: narrow foot rows define center + span,
 * then trim a short vertical band just above them where rows are still very wide.
 */
import sharp from "sharp";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const input = join(__dirname, "..", "public", "dragon-icon.png");

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const w = info.width;
const h = info.height;
const ch = info.channels;

function opaque(i) {
  return data[i * ch + 3] > 128;
}
function clear(i) {
  const b = i * ch;
  data[b] = 0;
  data[b + 1] = 0;
  data[b + 2] = 0;
  data[b + 3] = 0;
}

function rowStats(y) {
  let minX = w;
  let maxX = -1;
  let n = 0;
  let sumX = 0;
  for (let x = 0; x < w; x++) {
    const i = y * w + x;
    if (!opaque(i)) continue;
    n++;
    sumX += x;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
  }
  if (n === 0) return null;
  return { minX, maxX, width: maxX - minX + 1, n, cx: sumX / n };
}

const narrowMaxW = Math.max(36, Math.floor(w * 0.31));
const footRows = [];
for (let y = h - 1; y >= Math.floor(h * 0.8); y--) {
  const s = rowStats(y);
  if (!s) continue;
  if (s.width <= narrowMaxW) {
    footRows.push({ y, s });
  } else if (footRows.length >= 6) {
    break;
  }
}

if (footRows.length < 5) {
  console.error("Could not find foot rows (narrowMaxW=%d)", narrowMaxW);
  process.exit(1);
}

let fMinX = w;
let fMaxX = -1;
let fSumX = 0;
let fCnt = 0;
for (const { s } of footRows) {
  fMinX = Math.min(fMinX, s.minX);
  fMaxX = Math.max(fMaxX, s.maxX);
  fSumX += s.cx * s.n;
  fCnt += s.n;
}
const fcx = fSumX / fCnt;
const footSpan = fMaxX - fMinX + 1;
const keepHalf = Math.max(footSpan * 0.62, w * 0.076);

const topToeY = Math.min(...footRows.map((r) => r.y));
const shelfY0 = Math.max(Math.floor(h * 0.928), topToeY - 9);
const shelfY1 = topToeY - 1;
const minShelfWidth = footSpan * 1.35;

let cleared = 0;
for (let y = shelfY0; y <= shelfY1 && y >= 0; y++) {
  const s = rowStats(y);
  if (!s || s.width < minShelfWidth) continue;
  for (let x = 0; x < w; x++) {
    const i = y * w + x;
    if (!opaque(i)) continue;
    if (Math.abs(x - fcx) > keepHalf) {
      clear(i);
      cleared++;
    }
  }
}

await sharp(data, { raw: { width: w, height: h, channels: 4 } })
  .png()
  .toFile(input);

console.log("cleared:", cleared, "fcx:", fcx.toFixed(1), "footSpan:", footSpan, "band:", shelfY0, "-", shelfY1);
