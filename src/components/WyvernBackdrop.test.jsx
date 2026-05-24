import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import WyvernBackdrop from "./WyvernBackdrop.jsx";

describe("WyvernBackdrop", () => {
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
});
