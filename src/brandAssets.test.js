// @vitest-environment node
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const publicDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

async function readRgba(file) {
  return sharp(join(publicDir, file)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
}

/** Mean RGB of the opaque, strongly colored pixels, plus whether the top-left corner is clear. */
async function opaqueStats(file) {
  const { data, info } = await readRgba(file);
  let r = 0;
  let g = 0;
  let b = 0;
  let count = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 200) continue;
    const sat = Math.max(data[i], data[i + 1], data[i + 2]) - Math.min(data[i], data[i + 1], data[i + 2]);
    if (sat < 80) continue;
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    count += 1;
  }
  const cornerAlpha = data[3];
  return { r: r / count, g: g / count, b: b / count, count, cornerAlpha, size: info.width };
}

/** RGBA at a point given as fractions of the image's width and height. */
async function pixelAt(file, fx, fy) {
  const { data, info } = await readRgba(file);
  const i = (Math.round(fy * (info.height - 1)) * info.width + Math.round(fx * (info.width - 1))) * 4;
  return { r: data[i], g: data[i + 1], b: data[i + 2], a: data[i + 3] };
}

describe("brand assets", () => {
  it("renders the nav logo as the orange wyvern on a transparent background", async () => {
    const s = await opaqueStats("wyvern-mark.png");

    expect(s.size).toBe(512);
    expect(s.count).toBeGreaterThan(0);
    expect(s.cornerAlpha).toBe(0);
    expect(s.r).toBeGreaterThan(200);
    expect(s.r).toBeGreaterThan(s.g + 60);
    expect(s.g).toBeGreaterThan(s.b);
  });

  it.each(["favicon-32.png", "favicon-192.png", "apple-touch-icon.png"])(
    "renders %s as the orange wyvern on a round dark badge",
    async (file) => {
      const s = await opaqueStats(file);
      expect(s.count).toBeGreaterThan(0);
      expect(s.r).toBeGreaterThan(s.g + 60);
      expect(s.g).toBeGreaterThan(s.b);

      // Outside the circle: transparent corners.
      expect(s.cornerAlpha).toBe(0);
      expect((await pixelAt(file, 0.06, 0.06)).a).toBe(0);

      // Inside the circle near its edge, away from the wyvern: opaque and dark.
      // Downscaling to 32px leaves anti-aliasing a few alpha steps short of 255.
      const disc = await pixelAt(file, 0.5, 0.92);
      expect(disc.a).toBeGreaterThanOrEqual(250);
      expect(Math.max(disc.r, disc.g, disc.b)).toBeLessThan(40);
    },
  );

  it("packs the round orange badge into favicon.ico", async () => {
    const ico = readFileSync(join(publicDir, "favicon.ico"));
    expect(ico.readUInt16LE(2)).toBe(1);
    const count = ico.readUInt16LE(4);
    expect(count).toBeGreaterThan(0);
    for (let k = 0; k < count; k++) {
      const len = ico.readUInt32LE(6 + k * 16 + 8);
      const off = ico.readUInt32LE(6 + k * 16 + 12);
      const png = ico.subarray(off, off + len);
      const { data } = await sharp(png).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      expect(data[3]).toBe(0);
      let r = 0;
      let g = 0;
      let n = 0;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] < 200 || data[i] - data[i + 2] < 80) continue;
        r += data[i];
        g += data[i + 1];
        n += 1;
      }
      expect(n).toBeGreaterThan(0);
      expect(r / n).toBeGreaterThan(g / n + 40);
    }
  });
});

describe("ronpicard.com nav mark", () => {
  it("is cropped to the R glyph with no background tile so it sizes like the other logos", async () => {
    const { data, info } = await sharp(join(publicDir, "ronpicard-mark.svg"), { density: 288 })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    let minX = info.width;
    let minY = info.height;
    let maxX = -1;
    let maxY = -1;
    let darkOpaque = 0;
    for (let y = 0; y < info.height; y += 1) {
      for (let x = 0; x < info.width; x += 1) {
        const i = (y * info.width + x) * 4;
        if (data[i + 3] < 128) continue;
        if (Math.max(data[i], data[i + 1], data[i + 2]) < 40) darkOpaque += 1;
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }

    expect(darkOpaque, "no dark background tile").toBe(0);
    expect((maxY - minY + 1) / info.height).toBeGreaterThan(0.95);
    expect((maxX - minX + 1) / info.width).toBeGreaterThan(0.95);
  });
});
