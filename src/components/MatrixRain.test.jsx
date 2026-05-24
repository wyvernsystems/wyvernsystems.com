import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import MatrixRain from "./MatrixRain.jsx";
import { mockCanvas2dContext, mockPrefersReducedMotion } from "../test/helpers.js";

describe("MatrixRain", () => {
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

  it("renders hidden canvas when mounted", () => {
    mockPrefersReducedMotion(true);
    const { container } = render(<MatrixRain />);

    const canvas = container.querySelector("canvas.matrix-canvas");
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute("aria-hidden", "true");
  });

  it("does not start animation when reduced motion preferred", () => {
    mockPrefersReducedMotion(true);
    const raf = vi.spyOn(window, "requestAnimationFrame");

    render(<MatrixRain />);

    expect(raf).not.toHaveBeenCalled();
  });

  it("starts animation when motion allowed and canvas context available", () => {
    mockPrefersReducedMotion(false);
    mockCanvas2dContext();
    const raf = vi.spyOn(window, "requestAnimationFrame").mockImplementation(() => 0);

    render(<MatrixRain />);

    expect(raf).toHaveBeenCalled();
  });
});
