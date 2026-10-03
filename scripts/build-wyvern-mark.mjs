/**
 * Reads assets/brand/wyvern-mark-original.png (orange wyvern on a dark square) and writes
 * transparent-background versions used by the site:
 * - public/wyvern-mark.png (512) — nav brand mark in the original orange-to-red colors
 * - assets/brand/wyvern-mark-matrix.png — full-size Matrix-green master
 * - public/favicon-32.png, public/favicon-192.png, public/apple-touch-icon.png (180) — the orange
 *   wyvern on a round dark badge with a thin green ring
 * - public/favicon.ico — the same badge, 16 + 32 px PNG-compressed entries for /favicon.ico requests
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

/* Original colors: the source's own orange-to-red gradient, with the dark background cut away. */
const orange = Buffer.from(data);
for (let p = 0; p < n; p++) {
  orange[p * 4 + 3] = alpha[p];
}

const green = Buffer.from(data);
for (let p = 0; p < n; p++) {
  const i = p * 4;
  const y = (p / w) | 0;
  const t = Math.min(1, Math.max(0, (y - top) / (bottom - top)));
  const c = rampAt(t);
  green[i] = Math.round(c.r);
  green[i + 1] = Math.round(c.g);
  green[i + 2] = Math.round(c.b);
  green[i + 3] = alpha[p];
}

function rawPng(rgba) {
  return sharp(rgba, { raw: { width: w, height: h, channels: 4 } }).png({ compressionLevel: 9 });
}

await rawPng(green).toFile(outMaster);

/* Trim the dark margin, then pad to a square with ~6% breathing room so small icons stay legible. */
async function toSquare(rgba) {
  const trimmed = await sharp(await rawPng(rgba).toBuffer()).trim({ threshold: 10 }).toBuffer();
  const meta = await sharp(trimmed).metadata();
  const side = Math.ceil(Math.max(meta.width, meta.height) * 1.12);
  return sharp({
    create: { width: side, height: side, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: trimmed, gravity: "centre" }])
    .png()
    .toBuffer();
}

const orangeSquare = await toSquare(orange);

/* Round badge mirroring .section-nav__brand: dark disc, ring 1/32 of the diameter
 * (1px at 32px, like the nav's 1px border on a 2rem circle), wyvern at 74% like .section-nav__mark. */
const BADGE = 512;
const RING = BADGE / 32;
const badgeDisc = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${BADGE}" height="${BADGE}">
  <circle cx="${BADGE / 2}" cy="${BADGE / 2}" r="${BADGE / 2 - RING / 2}"
          fill="#000602" stroke="#00ff41" stroke-opacity="0.35" stroke-width="${RING}"/>
</svg>`,
);
const badgeMark = await sharp(orangeSquare)
  .resize(Math.round(BADGE * 0.74), Math.round(BADGE * 0.74), { kernel: sharp.kernel.lanczos3 })
  .png()
  .toBuffer();
const badge = await sharp(badgeDisc)
  .composite([{ input: badgeMark, gravity: "centre" }])
  .png()
  .toBuffer();

async function squarePng(square, size) {
  return sharp(square)
    .resize(size, size, { kernel: sharp.kernel.lanczos3 })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

const outputs = [
  ["wyvern-mark.png", orangeSquare, 512],
  ["favicon-192.png", badge, 192],
  ["apple-touch-icon.png", badge, 180],
  ["favicon-32.png", badge, 32],
];
for (const [name, square, size] of outputs) {
  writeFileSync(join(pub, name), await squarePng(square, size));
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
  icoPngs.push({ size, png: await squarePng(badge, size) });
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
