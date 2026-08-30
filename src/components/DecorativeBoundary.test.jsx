import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DecorativeBoundary from "./DecorativeBoundary.jsx";

function Bomb() {
  throw new Error("boom");
}

describe("DecorativeBoundary", () => {
  it("renders its children when nothing throws", () => {
    render(
      <DecorativeBoundary>
        <span>decoration</span>
      </DecorativeBoundary>
    );

    expect(screen.getByText("decoration")).toBeInTheDocument();
  });

  it("swallows a child render error instead of propagating it", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    const { container } = render(
      <div>
        <DecorativeBoundary>
          <Bomb />
        </DecorativeBoundary>
        <main>real content</main>
      </div>
    );

    expect(container.querySelector("main")).toHaveTextContent("real content");
    consoleError.mockRestore();
  });
});
