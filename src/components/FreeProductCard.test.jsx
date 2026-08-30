import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FREE_PRODUCTS } from "../data/freeProducts.js";
import FreeProductCard from "./FreeProductCard.jsx";

describe("FreeProductCard", () => {
  it("renders marketplace and source links with noopener when product provided", () => {
    const product = FREE_PRODUCTS[0];
    const { container } = render(<FreeProductCard product={product} />);

    expect(screen.getByRole("heading", { name: product.title })).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(within(container).getByRole("presentation")).toHaveAttribute("src", product.iconUrl);

    const marketplace = screen.getByRole("link", { name: "VS Marketplace" });
    expect(marketplace).toHaveAttribute("href", product.marketplaceUrl);
    expect(marketplace).toHaveAttribute("rel", "noopener noreferrer");
    expect(marketplace).toHaveClass("free-product-card__btn--ghost");

    const openVsx = screen.getByRole("link", { name: "Open VSX" });
    expect(openVsx).toHaveAttribute("href", product.openVsxUrl);
    expect(openVsx).toHaveAttribute("rel", "noopener noreferrer");
    expect(openVsx).toHaveClass("free-product-card__btn--ghost");

    const source = screen.getByRole("link", { name: "Source" });
    expect(source).toHaveAttribute("href", product.repoUrl);
    expect(source).toHaveAttribute("rel", "noopener noreferrer");
    expect(source).toHaveClass("free-product-card__btn--ghost");

    expect(screen.getByText(`ext install ${product.installId}`)).toBeInTheDocument();
  });

  it("applies accent class badge and blank targets when product provided", () => {
    const product = FREE_PRODUCTS[1];
    const { container } = render(<FreeProductCard product={product} />);

    expect(container.querySelector("article")).toHaveClass(`free-product-card--${product.accent}`);
    expect(screen.getByText(product.badge)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "VS Marketplace" })).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: "Open VSX" })).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: "Source" })).toHaveAttribute("target", "_blank");
  });

  it("copies the install command when requested", async () => {
    const product = FREE_PRODUCTS[0];
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(<FreeProductCard product={product} />);
    fireEvent.click(
      screen.getByRole("button", { name: `Copy install command for ${product.title}` }),
    );

    expect(writeText).toHaveBeenCalledWith(`ext install ${product.installId}`);
    expect(await screen.findByText("Copied")).toBeInTheDocument();
  });
});

