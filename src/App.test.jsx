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
    expect(
      screen.getByText(
        "Systems, AI, autonomy, software, hardware, robotics, aviation, aircraft design, flight test, and more.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(/Lessons, workshops/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Contact" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Auto Color" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "AI Rulebook" })).toBeInTheDocument();
  });

  it("links free products to the Visual Studio Marketplace when rendered", () => {
    render(<App />);

    const marketplaceLinks = screen.getAllByRole("link", { name: "Marketplace" });
    const hrefs = marketplaceLinks.map((a) => a.getAttribute("href"));
    expect(hrefs).toContain(
      "https://marketplace.visualstudio.com/items?itemName=WyvernSystemsLLC.auto-color",
    );
    expect(hrefs).toContain(
      "https://marketplace.visualstudio.com/items?itemName=WyvernSystemsLLC.ai-rulebook",
    );
    for (const link of marketplaceLinks) {
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
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
    const copy = container.querySelector(".site-footer .home-copy");
    expect(copy).toHaveTextContent(`© ${new Date().getFullYear()} Wyvern Systems, LLC`);
  });

  it("places free products before the footer block when rendered", () => {
    const { container } = render(<App />);
    const inner = container.querySelector(".home-inner");
    const children = [...inner.children].map((el) => el.className);
    const productsIdx = children.findIndex((c) => typeof c === "string" && c.includes("free-products"));
    const footerIdx = children.findIndex((c) => typeof c === "string" && c.includes("site-footer"));
    expect(productsIdx).toBeGreaterThan(-1);
    expect(footerIdx).toBeGreaterThan(productsIdx);
  });

  it("styles ronpicard link as secondary ghost button when rendered", () => {
    render(<App />);
    expect(screen.getByRole("link", { name: /ronpicard/i })).toHaveClass("btn-ghost");
  });

  it("renders section jump links when mounted", () => {
    render(<App />);
    const nav = screen.getByRole("navigation", { name: "Page sections" });
    expect(within(nav).getByRole("link", { name: "Consulting" })).toHaveAttribute(
      "href",
      "#consulting",
    );
    expect(within(nav).getByRole("link", { name: "Products" })).toHaveAttribute("href", "#products");
    expect(within(nav).getByRole("link", { name: "Contact" })).toHaveAttribute("href", "#contact");
  });

  it("renders matching outlined hero calls to action", () => {
    const { container } = render(<App />);
    const heroCta = container.querySelector(".hero-cta");
    const links = within(heroCta).getAllByRole("link");

    expect(links).toHaveLength(3);
    expect(within(heroCta).getByRole("link", { name: "Explore services" })).toHaveAttribute(
      "href",
      "#consulting",
    );
    expect(within(heroCta).getByRole("link", { name: "Explore products" })).toHaveAttribute(
      "href",
      "#products",
    );
    for (const link of links) {
      expect(link).toHaveClass("btn-ghost");
    }
  });

  it("exposes consulting products and contact targets when mounted", () => {
    const { container } = render(<App />);
    expect(container.querySelector("#consulting")).toBeInTheDocument();
    expect(container.querySelector("#products")).toBeInTheDocument();
    expect(container.querySelector("#contact")).toBeInTheDocument();
  });

  it("links product source repos when rendered", () => {
    render(<App />);
    const hrefs = screen.getAllByRole("link", { name: "Source" }).map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("https://github.com/wyvernsystems/auto-color-vscode-extension");
    expect(hrefs).toContain("https://github.com/wyvernsystems/ai-rulebook-vscode-extension");
  });
});

