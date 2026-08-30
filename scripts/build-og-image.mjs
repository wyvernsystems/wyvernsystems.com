/**
 * Writes assets/brand/og-image.png (1200×630) for Open Graph / Twitter cards.
 * Screenshots the real homepage hero (Vite dev server + Playwright chromium)
 * at a 1200:630 aspect viewport, then downscales for sharpness.
 */
import { createServer } from "vite";
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outPath = join(root, "assets", "brand", "og-image.png");

const W = 1200;
const H = 630;
// Capture the hero at the OG aspect ratio on a 2x display, then downscale.
const CAPTURE_W = 1000;
const CAPTURE_H = 525;
const CAPTURE_SCALE = 2;

async function main() {
  const server = await createServer({
    root,
    server: { port: 0 },
    logLevel: "error",
  });
  await server.listen();
  const url = server.resolvedUrls.local[0];

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({
      viewport: { width: CAPTURE_W, height: CAPTURE_H },
      deviceScaleFactor: CAPTURE_SCALE,
    });
    await page.goto(url, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    // Let entrance animations finish and the matrix rain draw a few frames.
    await page.waitForTimeout(2500);
    const shot = await page.screenshot({ type: "png" });

    await sharp(shot)
      .resize(W, H, { fit: "fill", kernel: sharp.kernel.lanczos3 })
      .png({ compressionLevel: 9 })
      .toFile(outPath);
    console.log(`Wrote ${outPath}`);
  } finally {
    await browser.close();
    await server.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
