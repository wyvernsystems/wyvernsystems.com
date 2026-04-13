/**
 * Copies public/images/og-image.png → public/og-image.png so crawlers can use a short URL.
 */
import { copyFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "public", "images", "og-image.png");
const dest = join(root, "public", "og-image.png");

if (!existsSync(src)) {
  console.warn("sync-og-to-root: missing", src);
  process.exit(0);
}
copyFileSync(src, dest);
console.log("sync-og-to-root:", dest);
