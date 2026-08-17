import { expect, test } from "@playwright/test";

test.describe("production build", () => {
  test("injects security meta when the preview build is served", async ({ page }) => {
    await page.goto("/");

    const csp = page.locator('meta[http-equiv="Content-Security-Policy"]');
    await expect(csp).toHaveCount(1);
    await expect(csp).toHaveAttribute("content", /default-src 'self'/);
    await expect(csp).toHaveAttribute("content", /script-src 'self'/);
    await expect(csp).toHaveAttribute("content", /frame-ancestors 'none'/);

    const policy = await csp.getAttribute("content");
    expect(policy).not.toContain("fonts.googleapis.com");

    await expect(page.locator('meta[http-equiv="X-Frame-Options"]')).toHaveAttribute(
      "content",
      "DENY",
    );
  });

  test("does not request Google Fonts when the homepage loads", async ({ page }) => {
    const urls = [];
    page.on("request", (request) => urls.push(request.url()));

    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    expect(urls.some((url) => url.includes("fonts.googleapis.com"))).toBe(false);
    expect(urls.some((url) => url.includes("fonts.gstatic.com"))).toBe(false);
  });

  test("serves security.txt and CNAME when requested", async ({ request }) => {
    const security = await request.get("/.well-known/security.txt");
    expect(security.ok()).toBe(true);
    expect(await security.text()).toContain("Contact: https://www.linkedin.com/in/ron-picard-8b7b3059");

    const cname = await request.get("/CNAME");
    expect(cname.ok()).toBe(true);
    expect((await cname.text()).trim()).toBe("wyvernsystems.com");
  });

  test("exposes open graph title and image when loaded", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      "Wyvern Systems - Ron Picard",
    );
    await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute(
      "content",
      /og-image\.png/,
    );
  });
});
