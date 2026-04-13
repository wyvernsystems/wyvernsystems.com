/**
 * Writes public/images/og-image.png (1200×630) for Open Graph / Twitter cards.
 * Matrix rain + logo + hero copy + consulting boxes; reproducible (seeded RNG).
 */
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const pub = join(root, "public");
const img = join(pub, "images");
const logoPath = join(img, "wyvern-systems-logo-matrix.png");
const outPath = join(img, "og-image.png");

const W = 1200;
const H = 630;

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const MATRIX_CHARS =
  "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿ0123456789ABCDEFﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛｦｧｨｩｪｫ";

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildRainSvg() {
  const rand = mulberry32(90210);
  const parts = [];
  const colStep = 19;
  const rowStep = 14;
  for (let x = 6; x < W; x += colStep) {
    for (let y = 10; y < H; y += rowStep) {
      const c = MATRIX_CHARS[(MATRIX_CHARS.length * rand()) | 0];
      const op = 0.07 + rand() * 0.32;
      parts.push(
        `<text x="${x}" y="${y}" font-family="ui-monospace, monospace" font-size="11" fill="#00ff41" opacity="${op.toFixed(3)}">${escapeXml(c)}</text>`,
      );
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="100%" height="100%" fill="#000000"/>
  ${parts.join("\n  ")}
</svg>`;
}

async function main() {
  const year = new Date().getFullYear();
  const logoBuf = readFileSync(logoPath);
  const logoW = 400;
  const logoMeta = await sharp(logoBuf).metadata();
  const ratio = (logoMeta.height ?? 558) / (logoMeta.width ?? 1024);
  const logoH = Math.round(logoW * ratio);
  const logoResized = await sharp(logoBuf)
    .resize(logoW, logoH, { fit: "inside", kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();
  const logoB64 = logoResized.toString("base64");

  const logoX = Math.round((W - logoW) / 2);
  const logoY = 36;

  const llcY = logoY + logoH + 18;
  const titleY = llcY + 36;
  const nameY = titleY + 44;
  const leadY = nameY + 28;
  const boxY = H - 108;
  const boxW = 248;
  const boxH = 52;
  const boxGap = 28;
  const boxesTotal = boxW * 2 + boxGap;
  const boxLeftX = Math.round((W - boxesTotal) / 2);

  const uiSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#e8ffe8"/>
      <stop offset="35%" style="stop-color:#66ff88"/>
      <stop offset="55%" style="stop-color:#00ff41"/>
      <stop offset="100%" style="stop-color:#e8ffe8"/>
    </linearGradient>
    <filter id="titleGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/>
      <feFlood flood-color="#00ff41" flood-opacity="0.45" result="glowColor"/>
      <feComposite in="glowColor" in2="blur" operator="in" result="softGlow"/>
      <feMerge>
        <feMergeNode in="softGlow"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect x="22" y="22" width="${W - 44}" height="${H - 44}" rx="3" fill="none" stroke="#00ff41" stroke-opacity="0.55" stroke-width="2"/>
  <image href="data:image/png;base64,${logoB64}"
         x="${logoX}" y="${logoY}" width="${logoW}" height="${logoH}" preserveAspectRatio="xMidYMid meet"/>
  <text x="${W / 2}" y="${llcY}" text-anchor="middle"
        font-family="ui-monospace, monospace" font-size="11" font-weight="400"
        fill="#5cbf6e" letter-spacing="0.28em">WYVERN SYSTEMS, LLC</text>
  <text x="${W / 2}" y="${titleY}" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', Times, serif" font-size="52" font-weight="700"
        fill="url(#titleGrad)" filter="url(#titleGlow)" letter-spacing="0.04em">Wyvern Systems</text>
  <text x="${W / 2}" y="${nameY}" text-anchor="middle"
        font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="19" font-weight="600"
        fill="#a8d4b0">Ron Picard</text>
  <text x="${W / 2}" y="${leadY}" text-anchor="middle"
        font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="17" font-weight="400"
        fill="rgba(216,245,223,0.96)">Solving your hard technical problems and delivering real results.</text>
  <rect x="${boxLeftX}" y="${boxY}" width="${boxW}" height="${boxH}" rx="2" fill="none" stroke="#00ff41" stroke-opacity="0.75" stroke-width="1.5"/>
  <rect x="${boxLeftX + boxW + boxGap}" y="${boxY}" width="${boxW}" height="${boxH}" rx="2" fill="none" stroke="#00ff41" stroke-opacity="0.75" stroke-width="1.5"/>
  <text x="${boxLeftX + boxW / 2}" y="${boxY + 22}" text-anchor="middle"
        font-family="ui-monospace, monospace" font-size="11" font-weight="600" fill="#7dffa0" letter-spacing="0.12em">TECHNICAL</text>
  <text x="${boxLeftX + boxW / 2}" y="${boxY + 38}" text-anchor="middle"
        font-family="ui-monospace, monospace" font-size="11" font-weight="600" fill="#7dffa0" letter-spacing="0.12em">CONSULTING</text>
  <text x="${boxLeftX + boxW + boxGap + boxW / 2}" y="${boxY + 22}" text-anchor="middle"
        font-family="ui-monospace, monospace" font-size="11" font-weight="600" fill="#7dffa0" letter-spacing="0.12em">EDUCATIONAL</text>
  <text x="${boxLeftX + boxW + boxGap + boxW / 2}" y="${boxY + 38}" text-anchor="middle"
        font-family="ui-monospace, monospace" font-size="11" font-weight="600" fill="#7dffa0" letter-spacing="0.12em">CONSULTING</text>
  <text x="${W / 2}" y="${H - 28}" text-anchor="middle"
        font-family="ui-monospace, monospace" font-size="10" fill="#3d8f52" letter-spacing="0.18em">© ${year} WYVERN SYSTEMS, LLC</text>
</svg>`;

  const rainPng = await sharp(Buffer.from(buildRainSvg(), "utf8"))
    .png({ compressionLevel: 9 })
    .toBuffer();

  const uiPng = await sharp(Buffer.from(uiSvg, "utf8"))
    .png({ compressionLevel: 9 })
    .toBuffer();

  await sharp(rainPng)
    .composite([{ input: uiPng, top: 0, left: 0 }])
    .png({ compressionLevel: 9 })
    .toFile(outPath);

  console.log(`Wrote ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
