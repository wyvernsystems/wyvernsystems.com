/**
 * Renders the app to static HTML and injects it into dist/index.html so the page copy
 * is readable without JavaScript (crawlers, verification bots). Also writes dist/404.html
 * so GitHub Pages serves the site instead of its stock page on unknown paths.
 * Run after `vite build`.
 */
import { copyFileSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "vite";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const distIndex = join(root, "dist", "index.html");
const dist404 = join(root, "dist", "404.html");
const ssrOutDir = join(root, "dist-ssr");
const ROOT_PLACEHOLDER = '<div id="root"></div>';

try {
  await build({
    root,
    logLevel: "warn",
    build: {
      ssr: "src/entry-server.jsx",
      outDir: ssrOutDir,
      emptyOutDir: true,
      copyPublicDir: false,
    },
  });

  const { render } = await import(pathToFileURL(join(ssrOutDir, "entry-server.js")).href);
  const markup = render();
  if (!markup.trim()) {
    throw new Error("prerender: app rendered to empty markup; refusing to ship a blank page");
  }

  const html = readFileSync(distIndex, "utf8");
  if (!html.includes(ROOT_PLACEHOLDER)) {
    throw new Error(`prerender: ${ROOT_PLACEHOLDER} not found in ${distIndex}; page would ship without content`);
  }

  writeFileSync(distIndex, html.replace(ROOT_PLACEHOLDER, () => `<div id="root">${markup}</div>`));
  copyFileSync(distIndex, dist404);
  console.log(`prerender: ${distIndex} (${markup.length} chars of markup), ${dist404}`);
} finally {
  rmSync(ssrOutDir, { recursive: true, force: true });
}
