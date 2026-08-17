import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import WyvernBackdrop from "./WyvernBackdrop.jsx";
import { mockPrefersReducedMotion } from "../test/helpers.js";

describe("WyvernBackdrop", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    window.matchMedia.mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  it("renders decorative svg hidden from assistive tech when mounted", () => {
    const { container } = render(<WyvernBackdrop />);

    const root = container.querySelector(".wyvern-backdrop");
    expect(root).toHaveAttribute("aria-hidden", "true");

    const svg = container.querySelector("svg.wyvern-backdrop-svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("viewBox", "0 0 400 440");
  });

  it("uses unique gradient ids per instance when two mounted", () => {
    const { container: a } = render(<WyvernBackdrop />);
    const { container: b } = render(<WyvernBackdrop />);

    const idA = a.querySelector("radialGradient")?.id;
    const idB = b.querySelector("radialGradient")?.id;
    expect(idA).toBeTruthy();
    expect(idB).toBeTruthy();
    expect(idA).not.toBe(idB);
  });

  it("does not listen for scroll when reduced motion preferred", () => {
    mockPrefersReducedMotion(true);
    const add = vi.spyOn(window, "addEventListener");

    render(<WyvernBackdrop />);

    expect(add.mock.calls.filter(([type]) => type === "scroll")).toHaveLength(0);
  });

  it("applies parallax transform when scrolled and motion allowed", () => {
    mockPrefersReducedMotion(false);
    const frames = [];
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      frames.push(cb);
      return frames.length;
    });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});

    const { container } = render(<WyvernBackdrop />);
    Object.defineProperty(window, "scrollY", { configurable: true, value: 200 });
    window.dispatchEvent(new Event("scroll"));
    frames.at(-1)?.();

    expect(container.querySelector(".wyvern-backdrop").style.transform).toBe(
      `translate3d(0, ${200 * 0.14}px, 0)`,
    );
  });
});

