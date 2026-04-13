/**
 * Builds public/dragon-icon.png from scripts/dragon-source.png:
 * - Flood outer near-white to transparent
 * - Clear between-legs white (interior bright zone)
 * - Map luminance to matrix-style greens (dark body / light highlights)
 */
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const source = join(__dirname, "dragon-source.png");
const out = join(__dirname, "..", "public", "dragon-icon.png");

const buf = readFileSync(source);
let { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const w = info.width;
const h = info.height;
const ch = 4;

function lumAt(p) {
  const i = p * ch;
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function isNearWhite(p) {
  const i = p * ch;
  return data[i] > 232 && data[i + 1] > 232 && data[i + 2] > 232;
}

const outside = new Uint8Array(w * h);
const q = [];
function push(y, x) {
  if (y < 0 || y >= h || x < 0 || x >= w) return;
  const p = y * w + x;
  if (outside[p]) return;
  if (!isNearWhite(p)) return;
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

for (let qi = 0; qi < q.length; qi++) {
  const p = q[qi];
  const y = Math.floor(p / w);
  const x = p % w;
  push(y - 1, x);
  push(y + 1, x);
  push(y, x - 1);
  push(y, x + 1);
}

for (let p = 0; p < w * h; p++) {
  if (!outside[p]) continue;
  const i = p * ch;
  data[i] = 0;
  data[i + 1] = 0;
  data[i + 2] = 0;
  data[i + 3] = 0;
}

// Between legs / underbelly gap: interior bright pixels border flood missed
const legY0 = Math.floor(h * 0.7);
const legY1 = Math.floor(h * 0.88);
const legX0 = Math.floor(w * 0.36);
const legX1 = Math.floor(w * 0.64);

for (let y = legY0; y <= legY1; y++) {
  for (let x = legX0; x <= legX1; x++) {
    const p = y * w + x;
    const i = p * ch;
    if (data[i + 3] === 0) continue;
    const L = lumAt(p);
    if (L > 0.66) {
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
      data[i + 3] = 0;
    }
  }
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Green ramp: dark ink → matrix → highlight
const cDark = { r: 0, g: 0x38, b: 0x14 };
const cMid = { r: 0, g: 0x99, b: 0x2a };
const cHi = { r: 0x7a, g: 0xff, b: 0xa8 };
const cPeak = { r: 0xc4, g: 0xff, b: 0xdd };

for (let p = 0; p < w * h; p++) {
  const i = p * ch;
  if (data[i + 3] === 0) continue;
  const L = lumAt(p);
  let r;
  let g;
  let b;
  if (L < 0.22) {
    const t = L / 0.22;
    r = lerp(cDark.r, cMid.r, t);
    g = lerp(cDark.g, cMid.g, t);
    b = lerp(cDark.b, cMid.b, t);
  } else if (L < 0.55) {
    const t = (L - 0.22) / 0.33;
    r = lerp(cMid.r, cHi.r, t);
    g = lerp(cMid.g, cHi.g, t);
    b = lerp(cMid.b, cHi.b, t);
  } else {
    const t = Math.min(1, (L - 0.55) / 0.45);
    r = lerp(cHi.r, cPeak.r, t);
    g = lerp(cHi.g, cPeak.g, t);
    b = lerp(cHi.b, cPeak.b, t);
  }
  data[i] = Math.round(r);
  data[i + 1] = Math.round(g);
  data[i + 2] = Math.round(b);
  data[i + 3] = 255;
}

await sharp(data, { raw: { width: w, height: h, channels: 4 } })
  .png()
  .toFile(out);

console.log("wrote", out, w, "x", h);
