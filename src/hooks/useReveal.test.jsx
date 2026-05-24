import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useReveal } from "./useReveal.js";
import { mockPrefersReducedMotion } from "../test/helpers.js";

function RevealTarget() {
  const [ref, visible] = useReveal();
  return (
    <>
      <div ref={ref} data-testid="target" />
      <span data-testid="visible">{String(visible)}</span>
    </>
  );
}

describe("useReveal", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
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

  it("returns visible true immediately when reduced motion preferred", () => {
    mockPrefersReducedMotion(true);
    render(<RevealTarget />);
    expect(screen.getByTestId("visible")).toHaveTextContent("true");
  });

  it("returns visible true when IntersectionObserver is unavailable", () => {
    mockPrefersReducedMotion(false);
    const original = global.IntersectionObserver;
    // @ts-expect-error test stub
    delete global.IntersectionObserver;

    render(<RevealTarget />);
    expect(screen.getByTestId("visible")).toHaveTextContent("true");

    global.IntersectionObserver = original;
  });

  it("sets visible true when observed element intersects", async () => {
    mockPrefersReducedMotion(false);

    let observerCallback;
    class MockIntersectionObserver {
      constructor(callback) {
        observerCallback = callback;
      }
      observe() {}
      disconnect() {}
    }
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

    render(<RevealTarget />);
    expect(screen.getByTestId("visible")).toHaveTextContent("false");

    observerCallback([{ isIntersecting: true }]);
    await waitFor(() => expect(screen.getByTestId("visible")).toHaveTextContent("true"));
  });
});
