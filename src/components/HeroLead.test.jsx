import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import HeroLead from "./HeroLead.jsx";
import { mockPrefersReducedMotion } from "../test/helpers.js";

const FULL_TEXT = "Solving your hardest technical problems and delivering real results.";

describe("HeroLead", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("shows full text immediately when reduced motion preferred", () => {
    mockPrefersReducedMotion(true);

    render(<HeroLead />);
    expect(screen.getByText(FULL_TEXT)).toBeInTheDocument();
  });

  it("types lead text over time when motion allowed", () => {
    vi.useFakeTimers();
    mockPrefersReducedMotion(false);

    const { container } = render(<HeroLead />);
    const live = container.querySelector("[aria-live='polite']");
    expect(live).toHaveTextContent("");

    act(() => {
      vi.advanceTimersByTime(32 * 10);
    });
    expect(live).toHaveTextContent(FULL_TEXT.slice(0, 10));

    act(() => {
      vi.advanceTimersByTime(32 * FULL_TEXT.length);
    });
    expect(live).toHaveTextContent(FULL_TEXT);
  });

  it("clears the typewriter interval when unmounted", () => {
    vi.useFakeTimers();
    mockPrefersReducedMotion(false);
    const clearInterval = vi.spyOn(window, "clearInterval");

    const { unmount } = render(<HeroLead />);
    unmount();

    expect(clearInterval).toHaveBeenCalled();
  });
});

