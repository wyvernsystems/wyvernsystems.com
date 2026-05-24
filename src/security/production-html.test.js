import { describe, expect, it } from "vitest";
import {
  buildContentSecurityPolicy,
  injectProductionSecurityIntoHtml,
} from "./production-html.js";

describe("buildContentSecurityPolicy", () => {
  it("returns same-origin defaults when called", () => {
    const csp = buildContentSecurityPolicy();

    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("script-src 'self'");
    expect(csp).toContain("style-src 'self'");
    expect(csp).toContain("font-src 'self' data:");
    expect(csp).toContain("https://WyvernSystemsLLC.gallerycdn.vsassets.io");
    expect(csp).not.toContain("fonts.googleapis.com");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("upgrade-insecure-requests");
  });
});

describe("injectProductionSecurityIntoHtml", () => {
  it("replaces csp placeholder with policy and frame options when placeholder present", () => {
    const html = "<head><!-- vite:csp --></head>";
    const out = injectProductionSecurityIntoHtml(html);

    expect(out).not.toContain("<!-- vite:csp -->");
    expect(out).toContain('http-equiv="Content-Security-Policy"');
    expect(out).toContain('http-equiv="X-Frame-Options" content="DENY"');
    expect(out).toContain(buildContentSecurityPolicy());
  });

  it("leaves html unchanged when placeholder missing", () => {
    const html = "<head></head>";
    expect(injectProductionSecurityIntoHtml(html)).toBe(html);
  });
});
