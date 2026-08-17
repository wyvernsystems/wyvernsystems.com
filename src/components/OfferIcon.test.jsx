import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import OfferIcon from "./OfferIcon.jsx";

describe("OfferIcon", () => {
  it("renders a decorative educational glyph when type is educational", () => {
    const { container } = render(<OfferIcon type="educational" />);
    const svg = container.querySelector("svg.offer-card__icon");

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector("path")?.getAttribute("d")).toContain("M5 5.5");
  });

  it("renders a decorative technical glyph when type is technical", () => {
    const { container } = render(<OfferIcon type="technical" />);
    const svg = container.querySelector("svg.offer-card__icon");

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector("path")?.getAttribute("d")).toContain("M9 4");
  });
});
