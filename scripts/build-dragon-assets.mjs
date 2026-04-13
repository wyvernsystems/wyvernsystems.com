/**
 * Reads public/dragon-original.png and writes:
 * - dragon-icon.png — Matrix-style green (dark forest → #00FF41), transparent outer white
 * - dragon-original.svg, dragon-matrix.svg — raster-in-SVG wrappers (full resolution)
 * - dragon-original-600.png, dragon-matrix-600.png — 600×600, centered, transparent pad
 */
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const pub = join(root, "public");
const original = join(pub, "dragon-original.png");
const outMatrix = join(pub, "dragon-icon.png");
const SIZE = 600;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function writeRasterSvg(outPath, href, title, w, h) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img">
  <title>${title}</title>
  <image href="${href}" xlink:href="${href}"
         width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet"/>
</svg>
`;
  writeFileSync(outPath, svg, "utf8");
}

async function pngToSquare600(srcPath, outPath) {
  const resized = await sharp(srcPath).resize(SIZE, SIZE, { fit: "inside" }).png().toBuffer();
  const { width: rw, height: rh } = await sharp(resized).metadata();
  const left = Math.floor((SIZE - rw) / 2);
  const top = Math.floor((SIZE - rh) / 2);
  await sharp({
    create: {
      width: SIZE,
      height: SIZE,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: resized, left, top }])
    .png()
    .toFile(outPath);
}

const buf = readFileSync(original);
const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const w = info.width;
const h = info.height;
const ch = 4;
const n = w * h;

const lum = new Float32Array(n);
for (let p = 0; p < n; p++) {
  const i = p * ch;
  lum[p] = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
}

const lightCut = 0.88;
const isBg = new Uint8Array(n);
const q = [];
function enqueueIfLight(p) {
  if (isBg[p] || lum[p] < lightCut) return;
  isBg[p] = 1;
  q.push(p);
}
for (let x = 0; x < w; x++) {
  enqueueIfLight(x);
  enqueueIfLight((h - 1) * w + x);
}
for (let y = 0; y < h; y++) {
  enqueueIfLight(y * w);
  enqueueIfLight(y * w + (w - 1));
}

const dirs = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
];
for (let qi = 0; qi < q.length; qi++) {
  const p = q[qi];
  const x = p % w;
  const y = (p / w) | 0;
  for (const [dx, dy] of dirs) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
    const np = ny * w + nx;
    enqueueIfLight(np);
  }
}

/* All green (no black): dark forest → mid → Matrix #00FF41 highlights */
const stops = [
  { r: 0x08, g: 0x52, b: 0x2a },
  { r: 0x06, g: 0x72, b: 0x36 },
  { r: 0x02, g: 0xa8, b: 0x40 },
  { r: 0x00, g: 0xe4, b: 0x48 },
  { r: 0x00, g: 0xff, b: 0x41 },
];
/* <1 lifts shadow tones so blacks map into the green ramp, not ink */
const uGamma = 0.88;

function sampleRamp(u01) {
  const ns = stops.length - 1;
  const x = Math.min(0.999999, Math.max(0, u01)) * ns;
  const j = Math.min(Math.floor(x), ns - 1);
  const t = x - j;
  const a = stops[j];
  const b = stops[j + 1];
  return {
    r: lerp(a.r, b.r, t),
    g: lerp(a.g, b.g, t),
    b: lerp(a.b, b.b, t),
  };
}

for (let p = 0; p < n; p++) {
  const i = p * ch;
  const L = lum[p];

  if (isBg[p]) {
    data[i] = 0;
    data[i + 1] = 0;
    data[i + 2] = 0;
    data[i + 3] = 0;
    continue;
  }

  const uMapped = Math.pow(L, uGamma);
  const { r: rr, g: gg, b: bb } = sampleRamp(uMapped);

  data[i] = Math.round(rr);
  data[i + 1] = Math.round(gg);
  data[i + 2] = Math.round(bb);
  data[i + 3] = 255;
}

await sharp(data, { raw: { width: w, height: h, channels: 4 } }).png().toFile(outMatrix);

writeRasterSvg(join(pub, "dragon.svg"), "dragon-original.png", "Dragon (original raster)", w, h);
writeRasterSvg(join(pub, "dragon-original.svg"), "dragon-original.png", "Dragon (original raster)", w, h);
writeRasterSvg(join(pub, "dragon-matrix.svg"), "dragon-icon.png", "Dragon (Matrix green raster)", w, h);

const outOrig600 = join(pub, "dragon-original-600.png");
const outMatrix600 = join(pub, "dragon-matrix-600.png");
await pngToSquare600(original, outOrig600);
await pngToSquare600(outMatrix, outMatrix600);

writeRasterSvg(
  join(pub, "dragon-original-600.svg"),
  "dragon-original-600.png",
  "Dragon original (600×600)",
  SIZE,
  SIZE,
);
writeRasterSvg(
  join(pub, "dragon-matrix-600.svg"),
  "dragon-matrix-600.png",
  "Dragon Matrix green (600×600)",
  SIZE,
  SIZE,
);

console.log(
  "wrote dragon-icon.png, dragon.svg, dragon-original.svg, dragon-matrix.svg,",
  "dragon-original-600.png, dragon-matrix-600.png, dragon-original-600.svg, dragon-matrix-600.svg;",
  w,
  "x",
  h,
);
