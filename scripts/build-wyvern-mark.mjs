/**
 * Reads assets/brand/wyvern-mark-original.png (orange wyvern on a dark square) and writes
 * Matrix-green, transparent-background versions used by the site:
 * - assets/brand/wyvern-mark-matrix.png — full-size master
 * - public/wyvern-mark.png (512) — nav brand mark
 * - public/favicon-32.png, public/favicon-192.png, public/apple-touch-icon.png (180)
 * - public/favicon.ico — 16 + 32 px PNG-compressed entries for legacy /favicon.ico requests
 */
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const brand = join(root, "assets", "brand");
const pub = join(root, "public");
const original = join(brand, "wyvern-mark-original.png");
const outMaster = join(brand, "wyvern-mark-matrix.png");

/* Source background is near-black and unsaturated; the wyvern is strongly saturated.
 * Saturation therefore doubles as coverage, which keeps anti-aliased edges soft. */
const SAT_OPAQUE = 110;
/* Bright Matrix green at the head, deeper green toward the tail. */
const TOP = { r: 0x3d, g: 0xff, b: 0x6e };
const MID = { r: 0x00, g: 0xff, b: 0x41 };
const BOTTOM = { r: 0x00, g: 0x9e, b: 0x34 };

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function mixColor(a, b, t) {
  return { r: lerp(a.r, b.r, t), g: lerp(a.g, b.g, t), b: lerp(a.b, b.b, t) };
}

function rampAt(t) {
  return t < 0.45 ? mixColor(TOP, MID, t / 0.45) : mixColor(MID, BOTTOM, (t - 0.45) / 0.55);
}

const buf = readFileSync(original);
const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const w = info.width;
const h = info.height;
const n = w * h;

const alpha = new Uint8Array(n);
let top = h;
let bottom = 0;
for (let p = 0; p < n; p++) {
  const i = p * 4;
  const sat = Math.max(data[i], data[i + 1], data[i + 2]) - Math.min(data[i], data[i + 1], data[i + 2]);
  const a = Math.round(Math.min(1, sat / SAT_OPAQUE) * 255);
  alpha[p] = a;
  if (a > 200) {
    const y = (p / w) | 0;
    if (y < top) top = y;
    if (y > bottom) bottom = y;
  }
}
if (bottom <= top) {
  throw new Error(`build-wyvern-mark: no saturated foreground found in ${original}`);
}

for (let p = 0; p < n; p++) {
  const i = p * 4;
  const y = (p / w) | 0;
  const t = Math.min(1, Math.max(0, (y - top) / (bottom - top)));
  const c = rampAt(t);
  data[i] = Math.round(c.r);
  data[i + 1] = Math.round(c.g);
  data[i + 2] = Math.round(c.b);
  data[i + 3] = alpha[p];
}

const master = sharp(data, { raw: { width: w, height: h, channels: 4 } }).png({ compressionLevel: 9 });
await master.clone().toFile(outMaster);

/* Trim the dark margin, then pad to a square with ~6% breathing room so small icons stay legible. */
const trimmed = await sharp(await master.clone().toBuffer()).trim({ threshold: 10 }).toBuffer();
const meta = await sharp(trimmed).metadata();
const side = Math.ceil(Math.max(meta.width, meta.height) * 1.12);
const square = await sharp({
  create: { width: side, height: side, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
})
  .composite([{ input: trimmed, gravity: "centre" }])
  .png()
  .toBuffer();

async function squarePng(size) {
  return sharp(square)
    .resize(size, size, { kernel: sharp.kernel.lanczos3 })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

const outputs = [
  ["wyvern-mark.png", 512],
  ["favicon-192.png", 192],
  ["apple-touch-icon.png", 180],
  ["favicon-32.png", 32],
];
for (const [name, size] of outputs) {
  writeFileSync(join(pub, name), await squarePng(size));
}

/** ICO container holding PNG-compressed images (supported since Windows Vista and all browsers). */
function buildIco(pngs) {
  const headerSize = 6 + 16 * pngs.length;
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  let offset = headerSize;
  pngs.forEach(({ size, png }, idx) => {
    const d = 6 + idx * 16;
    header.writeUInt8(size >= 256 ? 0 : size, d);
    header.writeUInt8(size >= 256 ? 0 : size, d + 1);
    header.writeUInt8(0, d + 2);
    header.writeUInt8(0, d + 3);
    header.writeUInt16LE(1, d + 4);
    header.writeUInt16LE(32, d + 6);
    header.writeUInt32LE(png.length, d + 8);
    header.writeUInt32LE(offset, d + 12);
    offset += png.length;
  });
  return Buffer.concat([header, ...pngs.map(({ png }) => png)]);
}

const icoSizes = [16, 32];
const icoPngs = [];
for (const size of icoSizes) {
  icoPngs.push({ size, png: await squarePng(size) });
}
writeFileSync(join(pub, "favicon.ico"), buildIco(icoPngs));

console.log(
  "build-wyvern-mark: wrote",
  outMaster,
  "+",
  outputs.map(([name]) => name).join(", "),
  "+ favicon.ico",
  `(${w}x${h} source, foreground rows ${top}-${bottom})`,
);
