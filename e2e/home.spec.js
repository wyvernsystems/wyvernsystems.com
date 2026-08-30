import { expect, test } from "@playwright/test";

test.describe("homepage", () => {
  test("shows hero consulting products and contact when loaded", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Wyvern Systems/);
    await expect(page.getByRole("heading", { level: 1, name: "Wyvern Systems" })).toBeVisible();
    await expect(page.getByText("Wyvern Systems, LLC").first()).toBeVisible();
    await expect(page.getByRole("heading", { name: /technical consulting/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /educational consulting/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Free products" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Auto Color" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "AI Rulebook" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Contact" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Explore products" })).toHaveAttribute(
      "href",
      "#products",
    );
    await expect(page.getByText(`© ${new Date().getFullYear()} Wyvern Systems, LLC`)).toBeVisible();
  });

  test("opens external ctas in a new tab when rendered", async ({ page }) => {
    await page.goto("/");

    const linkedin = page.getByRole("link", { name: /linkedin/i });
    await expect(linkedin).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/ron-picard-8b7b3059",
    );
    await expect(linkedin).toHaveAttribute("target", "_blank");
    await expect(linkedin).toHaveAttribute("rel", "noopener noreferrer");

    const portfolio = page.getByRole("link", { name: /ronpicard/i });
    await expect(portfolio).toHaveAttribute("href", "https://ronpicard.com");
    await expect(portfolio).toHaveAttribute("target", "_blank");
    await expect(portfolio).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("links free products to marketplace open vsx and source when rendered", async ({ page }) => {
    await page.goto("/");

    const marketplace = page.getByRole("link", { name: "VS Marketplace" });
    await expect(marketplace).toHaveCount(2);
    await expect(marketplace.nth(0)).toHaveAttribute(
      "href",
      "https://marketplace.visualstudio.com/items?itemName=WyvernSystemsLLC.auto-color",
    );
    await expect(marketplace.nth(1)).toHaveAttribute(
      "href",
      "https://marketplace.visualstudio.com/items?itemName=WyvernSystemsLLC.ai-rulebook",
    );

    const openVsx = page.getByRole("link", { name: "Open VSX" });
    await expect(openVsx).toHaveCount(2);
    await expect(openVsx.nth(0)).toHaveAttribute(
      "href",
      "https://open-vsx.org/extension/WyvernSystemsLLC/auto-color",
    );
    await expect(openVsx.nth(1)).toHaveAttribute(
      "href",
      "https://open-vsx.org/extension/WyvernSystemsLLC/ai-rulebook",
    );

    const source = page.getByRole("link", { name: "Source" });
    await expect(source).toHaveCount(2);
    await expect(source.nth(0)).toHaveAttribute(
      "href",
      "https://github.com/wyvernsystems/auto-color-vscode-extension",
    );
    await expect(source.nth(1)).toHaveAttribute(
      "href",
      "https://github.com/wyvernsystems/ai-rulebook-vscode-extension",
    );
  });

  test("keeps hero and products visible on a narrow viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1, name: "Wyvern Systems" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Auto Color" })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Page sections" })).toBeVisible();
  });

  test("shows the full hero lead immediately when reduced motion preferred", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    await expect(
      page.getByText("Solving your hardest technical problems and delivering real results."),
    ).toBeVisible();
  });
});
