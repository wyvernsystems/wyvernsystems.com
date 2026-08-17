import { expect, test } from "@playwright/test";

test.describe("section navigation", () => {
  test("jumps to consulting products and contact when section links clicked", async ({
    page,
  }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Page sections" });

    await nav.getByRole("link", { name: "Consulting" }).click();
    await expect(page).toHaveURL(/#consulting$/);
    await expect(page.locator("#consulting")).toBeInViewport();

    await nav.getByRole("link", { name: "Products" }).click();
    await expect(page).toHaveURL(/#products$/);
    await expect(page.locator("#products")).toBeInViewport();

    await nav.getByRole("link", { name: "Contact" }).click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(page.locator("#contact")).toBeInViewport();
  });
});
