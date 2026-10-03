import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App.jsx";

describe("App", () => {
  it("renders hero and offer copy when mounted", () => {
    const { container } = render(<App />);

    expect(screen.getByRole("heading", { level: 1, name: "Wyvern Systems" })).toBeInTheDocument();
    expect(screen.getByRole("banner")).not.toHaveTextContent("Wyvern Systems LLC");
    expect(screen.getByRole("banner").querySelector(".hero-lead")).toBeNull();
    expect(screen.getByRole("heading", { name: /technical/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /educational/i })).toBeInTheDocument();
    expect(
      screen.getByText(
        "AI, software, hardware, full system design, aviation, aircraft design, flight test, and more.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(/Lessons, workshops/i)).toBeInTheDocument();
    expect(container.querySelectorAll(".offer-card svg")).toHaveLength(0);
    expect(screen.getByRole("heading", { name: "Contact" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Auto Color" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "AI Rulebook" })).toBeInTheDocument();
  });

  it("links free products to the Visual Studio Marketplace when rendered", () => {
    render(<App />);

    const marketplaceLinks = screen.getAllByRole("link", { name: "VS Marketplace" });
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

  it("links free products to Open VSX when rendered", () => {
    render(<App />);

    const openVsxLinks = screen.getAllByRole("link", { name: "Open VSX" });
    const hrefs = openVsxLinks.map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("https://open-vsx.org/extension/WyvernSystemsLLC/auto-color");
    expect(hrefs).toContain("https://open-vsx.org/extension/WyvernSystemsLLC/ai-rulebook");
    for (const link of openVsxLinks) {
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("offers only the linkedin button with its logo in contact when rendered", () => {
    const { container } = render(<App />);
    const cta = container.querySelector(".home-cta");
    expect(cta).toBeTruthy();

    const links = within(cta).getAllByRole("link");
    expect(links).toHaveLength(1);
    const [linkedin] = links;
    expect(linkedin).toHaveAccessibleName("Message me on LinkedIn");
    expect(linkedin).toHaveAttribute("href", "https://www.linkedin.com/in/ron-picard-8b7b3059");
    expect(linkedin).toHaveAttribute("rel", "noopener noreferrer");
    expect(linkedin).toHaveAttribute("target", "_blank");
    expect(linkedin).toHaveClass("btn-ghost");

    const logo = linkedin.querySelector("svg");
    expect(logo).toHaveAttribute("aria-hidden", "true");
    expect(logo).toHaveClass("btn__logo");
    expect(logo.querySelector('[fill="#0A66C2"]')).toBeInTheDocument();

    expect(within(cta).queryByRole("link", { name: /ronpicard/i })).not.toBeInTheDocument();
  });

  it("shows the wyvern mark as the nav brand when rendered", () => {
    render(<App />);

    const brand = screen.getByRole("link", { name: "Wyvern Systems home" });
    expect(brand).toHaveAttribute("href", "#top");
    expect(brand).not.toHaveTextContent("WS");

    const mark = within(brand).getByRole("img", { name: "Wyvern Systems" });
    expect(mark).toHaveAttribute("src", "/wyvern-mark.png");
    expect(mark).toHaveClass("section-nav__mark");
  });

  it("shows linkedin, github, and ronpicard.com icons in the top nav instead of section links when rendered", () => {
    render(<App />);

    const nav = screen.getByRole("navigation", { name: "Site and social" });
    const linkedin = within(nav).getByRole("link", { name: "LinkedIn" });
    expect(linkedin).toHaveAttribute("href", "https://www.linkedin.com/in/ron-picard-8b7b3059");
    expect(linkedin.querySelector('[fill="#0A66C2"]')).toBeInTheDocument();
    const github = within(nav).getByRole("link", { name: "GitHub" });
    expect(github).toHaveAttribute("href", "https://github.com/wyvernsystems");
    expect(github.querySelector('path[fill="#FFFFFF"]')).toBeInTheDocument();
    expect(github.querySelector('[fill="currentColor"]')).not.toBeInTheDocument();
    const ron = within(nav).getByRole("link", { name: "Ron Picard" });
    expect(ron).toHaveAttribute("href", "https://ronpicard.com");
    for (const link of [linkedin, github, ron]) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
    expect(ron.querySelector("img")).toHaveAttribute("src", "/ronpicard-mark.svg");

    for (const name of ["Consulting", "Products", "Contact"]) {
      expect(within(nav).queryByRole("link", { name })).not.toBeInTheDocument();
    }
  });

  it("shows the consulting and free products headings without eyebrow labels when rendered", () => {
    const { container } = render(<App />);

    expect(screen.getByRole("heading", { level: 2, name: "Consulting" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Free products" })).toBeInTheDocument();
    expect(screen.queryByText("Capabilities")).not.toBeInTheDocument();
    expect(screen.queryByText("Open tools")).not.toBeInTheDocument();
    expect(container.querySelector(".section-eyebrow")).not.toBeInTheDocument();
  });

  it("shows current year in copyright when rendered", () => {
    const { container } = render(<App />);
    const copyBlocks = container.querySelectorAll(".site-footer .home-copy");
    const copy = copyBlocks[copyBlocks.length - 1];
    expect(copy).toHaveTextContent(`© ${new Date().getFullYear()} Wyvern Systems LLC`);
  });

  it("states the legal entity that owns the site when rendered", () => {
    render(<App />);
    expect(
      screen.getByText(/Wyvern Systems LLC is a United States limited liability company/),
    ).toBeInTheDocument();
  });

  it("ties the domain to the owning entity in the footer when rendered", () => {
    const { container } = render(<App />);
    const footer = container.querySelector(".site-footer");
    const ownership = within(footer).getByText(/wyvernsystems\.com/);
    expect(ownership).toHaveTextContent("wyvernsystems.com");
    expect(ownership).toHaveTextContent("Wyvern Systems LLC");
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

  it("renders matching outlined hero calls to action", () => {
    const { container } = render(<App />);
    const heroCta = container.querySelector(".hero-cta");
    const links = within(heroCta).getAllByRole("link");

    expect(links).toHaveLength(3);
    expect(within(heroCta).queryByRole("link", { name: /start a conversation/i })).toBeNull();
    const contact = within(heroCta).getByRole("link", { name: "Contact Me" });
    expect(contact).toHaveAttribute("href", "https://www.linkedin.com/in/ron-picard-8b7b3059");
    expect(contact).toHaveAttribute("target", "_blank");
    expect(contact).toHaveAttribute("rel", "noopener noreferrer");
    expect(within(heroCta).getByRole("link", { name: "Services" })).toHaveAttribute(
      "href",
      "#consulting",
    );
    expect(within(heroCta).getByRole("link", { name: "Products" })).toHaveAttribute(
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

  it("links each product's latest release when rendered", () => {
    render(<App />);
    const hrefs = screen.getAllByRole("link", { name: "Releases" }).map((a) => a.getAttribute("href"));
    expect(hrefs).toContain(
      "https://github.com/wyvernsystems/auto-color-vscode-extension/releases/latest",
    );
    expect(hrefs).toContain(
      "https://github.com/wyvernsystems/ai-rulebook-vscode-extension/releases/latest",
    );
  });
});

