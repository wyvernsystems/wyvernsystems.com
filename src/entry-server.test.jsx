// @vitest-environment node
import { describe, expect, it } from "vitest";
import { render } from "./entry-server.jsx";

describe("entry-server", () => {
  it("renders the full page copy to static markup when no browser is present", () => {
    expect(typeof window).toBe("undefined");

    const html = render();

    expect(html).toContain("Solving your hardest technical problems and delivering real results.");
    expect(html).toContain("Wyvern Systems LLC");
    expect(html).toContain("Technical");
    expect(html).toContain("Educational");
    expect(html).toContain("Contact");
  });

  it("emits no inline scripts or event handlers so the production CSP allows it", () => {
    const html = render();

    expect(html).not.toMatch(/<script/i);
    expect(html).not.toMatch(/\son[a-z]+=/i);
  });
});
