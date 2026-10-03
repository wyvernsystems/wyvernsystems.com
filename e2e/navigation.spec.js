import { expect, test } from "@playwright/test";

test.describe("top nav", () => {
  test("shows linkedin, github, and ronpicard.com icons that open in a new tab when loaded", async ({
    page,
  }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Site and social" });

    const linkedin = nav.getByRole("link", { name: "LinkedIn" });
    await expect(linkedin).toBeVisible();
    await expect(linkedin).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/ron-picard-8b7b3059",
    );
    await expect(linkedin).toHaveAttribute("target", "_blank");
    await expect(linkedin).toHaveAttribute("rel", "noopener noreferrer");

    const github = nav.getByRole("link", { name: "GitHub" });
    await expect(github).toBeVisible();
    await expect(github).toHaveAttribute("href", "https://github.com/wyvernsystems");
    await expect(github).toHaveAttribute("target", "_blank");
    await expect(github).toHaveAttribute("rel", "noopener noreferrer");

    const ron = nav.getByRole("link", { name: "Ron Picard" });
    await expect(ron).toBeVisible();
    await expect(ron).toHaveAttribute("href", "https://ronpicard.com");
    await expect(ron).toHaveAttribute("target", "_blank");
    await expect(ron).toHaveAttribute("rel", "noopener noreferrer");
    await expect(ron.locator("img")).toHaveJSProperty("complete", true);
    expect(await ron.locator("img").evaluate((img) => img.naturalWidth)).toBeGreaterThan(0);

    for (const name of ["Consulting", "Products", "Contact"]) {
      await expect(nav.getByRole("link", { name })).toHaveCount(0);
    }
  });

  test("shows the social icons as bare logos without a site border or fill when loaded", async ({
    page,
  }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Site and social" });

    for (const name of ["LinkedIn", "GitHub", "Ron Picard"]) {
      const link = nav.getByRole("link", { name });
      const style = await link.evaluate((el) => {
        const cs = getComputedStyle(el);
        return {
          border: cs.borderTopWidth,
          background: cs.backgroundColor,
          shadow: cs.boxShadow,
        };
      });
      expect(style, name).toEqual({ border: "0px", background: "rgba(0, 0, 0, 0)", shadow: "none" });

      const box = await link.boundingBox();
      expect(box.width, name).toBeGreaterThanOrEqual(32);
      expect(box.height, name).toBeGreaterThanOrEqual(32);
    }
  });

  test("shows the wyvern brand mark bare and sized like the social icons when loaded", async ({
    page,
  }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Site and social" });
    const brand = nav.getByRole("link", { name: "Wyvern Systems home" });

    const border = await brand.evaluate((el) => getComputedStyle(el).borderTopWidth);
    expect(border).toBe("0px");

    const brandBox = await brand.boundingBox();
    const iconBox = await nav.getByRole("link", { name: "LinkedIn" }).boundingBox();
    expect(brandBox.width).toBeCloseTo(iconBox.width, 0);
    expect(brandBox.height).toBeCloseTo(iconBox.height, 0);

    const mark = await brand.getByRole("img", { name: "Wyvern Systems" }).boundingBox();
    const linkedInLogo = await nav.getByRole("link", { name: "LinkedIn" }).locator("svg").boundingBox();
    expect(mark.height).toBeGreaterThanOrEqual(linkedInLogo.height);
  });

  test("renders the LinkedIn, GitHub, and Ron Picard logos at the same size when loaded", async ({
    page,
  }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Site and social" });
    const linkedIn = await nav.getByRole("link", { name: "LinkedIn" }).locator("svg").boundingBox();

    const others = {
      GitHub: nav.getByRole("link", { name: "GitHub" }).locator("svg"),
      "Ron Picard": nav.getByRole("link", { name: "Ron Picard" }).locator("img"),
    };
    for (const [name, logo] of Object.entries(others)) {
      const box = await logo.boundingBox();
      expect(box.height, name).toBeCloseTo(linkedIn.height, 0);
    }
  });
});
