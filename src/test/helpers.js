import { vi } from "vitest";

/** @param {boolean} matches */
export function mockPrefersReducedMotion(matches) {
  window.matchMedia.mockImplementation((query) => ({
    matches: query === "(prefers-reduced-motion: reduce)" ? matches : false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

export function mockCanvas2dContext() {
  const ctx = {
    setTransform: vi.fn(),
    fillStyle: "",
    shadowColor: "",
    shadowBlur: 0,
    font: "",
    fillRect: vi.fn(),
    fillText: vi.fn(),
    globalCompositeOperation: "",
  };
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(ctx);
  return ctx;
}
