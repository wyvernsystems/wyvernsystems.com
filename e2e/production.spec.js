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

  test("serves the page copy in raw HTML when JavaScript is not executed", async ({ request }) => {
    const home = await request.get("/");
    expect(home.ok()).toBe(true);
    const html = await home.text();
    expect(html).toContain("Solving your hardest technical problems and delivering real results.");
    expect(html).toContain("Wyvern Systems LLC");

    const notFound = await request.get("/404.html");
    expect(notFound.ok()).toBe(true);
    expect(await notFound.text()).toContain("Wyvern Systems LLC");
  });

  test("describes the company rather than the site styling in the meta description", async ({ request }) => {
    const html = await (await request.get("/")).text();
    const description = html.match(/<meta\s+name="description"\s+content="([^"]*)"/)?.[1] ?? "";

    expect(description).toContain("Wyvern Systems LLC");
    expect(description).not.toMatch(/theme|matrix/i);
    expect(html).not.toContain("Wyvern Systems, LLC");
  });

  test("serves robots.txt when requested", async ({ request }) => {
    const robots = await request.get("/robots.txt");
    expect(robots.ok()).toBe(true);
    expect(await robots.text()).toContain("User-agent: *");
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
