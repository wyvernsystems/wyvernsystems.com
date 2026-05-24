import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FREE_PRODUCTS } from "../data/freeProducts.js";
import FreeProductCard from "./FreeProductCard.jsx";

describe("FreeProductCard", () => {
  it("renders marketplace and source links with noopener when product provided", () => {
    const product = FREE_PRODUCTS[0];
    const { container } = render(<FreeProductCard product={product} />);

    expect(screen.getByRole("heading", { name: product.title })).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(within(container).getByRole("presentation")).toHaveAttribute("src", product.iconUrl);

    const marketplace = screen.getByRole("link", { name: "Marketplace" });
    expect(marketplace).toHaveAttribute("href", product.marketplaceUrl);
    expect(marketplace).toHaveAttribute("rel", "noopener noreferrer");

    const source = screen.getByRole("link", { name: "Source" });
    expect(source).toHaveAttribute("href", product.repoUrl);
    expect(source).toHaveAttribute("rel", "noopener noreferrer");

    expect(screen.getByText(`ext install ${product.installId}`)).toBeInTheDocument();
  });
});
