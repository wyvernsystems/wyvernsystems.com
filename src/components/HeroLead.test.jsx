import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import HeroLead from "./HeroLead.jsx";

describe("HeroLead", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows full text immediately when reduced motion preferred", () => {
    vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(<HeroLead />);
    expect(screen.getByText(/Solving your hard technical problems/i)).toBeInTheDocument();
  });
});
