import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App.jsx";

describe("App", () => {
  it("renders hero and offer copy when mounted", () => {
    render(<App />);

    expect(screen.getByRole("heading", { level: 1, name: "Wyvern Systems" })).toBeInTheDocument();
    expect(screen.getByText("Wyvern Systems, LLC")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /technical/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /educational/i })).toBeInTheDocument();
    expect(screen.getByText("AI")).toBeInTheDocument();
    expect(screen.getByText("& more")).toBeInTheDocument();
  });

  it("uses noopener noreferrer on external links when rendered", () => {
    const { container } = render(<App />);
    const cta = container.querySelector(".home-cta");
    expect(cta).toBeTruthy();

    const links = within(cta).getAllByRole("link");
    expect(links).toHaveLength(2);
    for (const link of links) {
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link).toHaveAttribute("target", "_blank");
    }
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/ron-picard-8b7b3059",
    );
    expect(screen.getByRole("link", { name: /ronpicard/i })).toHaveAttribute(
      "href",
      "https://ronpicard.com",
    );
  });

  it("shows current year in copyright when rendered", () => {
    const { container } = render(<App />);
    const copy = container.querySelector(".home-copy");
    expect(copy).toHaveTextContent(`© ${new Date().getFullYear()} Wyvern Systems, LLC`);
  });
});
