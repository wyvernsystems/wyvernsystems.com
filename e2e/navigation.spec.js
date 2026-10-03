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
});
