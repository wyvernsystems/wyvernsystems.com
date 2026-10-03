import { describe, expect, it } from "vitest";
import { FREE_PRODUCTS } from "./freeProducts.js";

describe("FREE_PRODUCTS", () => {
  it("lists unique products with marketplace and releases urls when imported", () => {
    const ids = FREE_PRODUCTS.map((product) => product.id);

    expect(FREE_PRODUCTS.length).toBeGreaterThanOrEqual(2);
    expect(new Set(ids).size).toBe(ids.length);

    for (const product of FREE_PRODUCTS) {
      expect(product.title).toBeTruthy();
      expect(product.badge).toMatch(/Free/i);
      expect(product.marketplaceUrl).toMatch(
        /^https:\/\/marketplace\.visualstudio\.com\/items\?itemName=/,
      );
      expect(product.releasesUrl).toMatch(
        /^https:\/\/github\.com\/wyvernsystems\/[\w-]+\/releases\/latest$/,
      );
      expect(product.installId).toMatch(/^WyvernSystemsLLC\./);
      expect(product.iconUrl).toMatch(/^https:\/\/WyvernSystemsLLC\.gallerycdn\.vsassets\.io\//);
    }
  });

  it("lists AI Rulebook first and Auto Color second when imported", () => {
    expect(FREE_PRODUCTS.map((product) => product.id)).toEqual(["ai-rulebook", "auto-color"]);
  });
});
