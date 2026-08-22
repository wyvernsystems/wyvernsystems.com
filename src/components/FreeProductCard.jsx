import { useState } from "react";

/**
 * @param {{
 *   product: import("../data/freeProducts.js").FREE_PRODUCTS[number];
 * }} props
 */
export default function FreeProductCard({ product }) {
  const [copyStatus, setCopyStatus] = useState("idle");
  const installCommand = `ext install ${product.installId}`;

  async function copyInstallCommand() {
    if (!navigator.clipboard?.writeText) {
      setCopyStatus("unavailable");
      return;
    }

    try {
      await navigator.clipboard.writeText(installCommand);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("unavailable");
    }
  }

  const copyLabel =
    copyStatus === "copied" ? "Copied" : copyStatus === "unavailable" ? "Unavailable" : "Copy";

  return (
    <article
      className={`free-product-card free-product-card--${product.accent}`}
      aria-labelledby={`free-product-${product.id}-title`}
    >
      <div className="free-product-card__body">
        <div className="free-product-card__head">
          <img
            className="free-product-card__icon"
            src={product.iconUrl}
            alt=""
            width={48}
            height={48}
            loading="lazy"
            decoding="async"
          />
          <div className="free-product-card__head-text">
            <div className="free-product-card__meta">
              <span className="free-product-card__badge">{product.badge}</span>
            </div>
            <h3 className="free-product-card__title" id={`free-product-${product.id}-title`}>
              {product.title}
            </h3>
          </div>
        </div>
        <p className="free-product-card__desc">{product.description}</p>
        <div className="free-product-card__actions">
          <a
            className="free-product-card__btn free-product-card__btn--primary"
            href={product.marketplaceUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Marketplace
          </a>
          <a
            className="free-product-card__btn free-product-card__btn--ghost"
            href={product.repoUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Source
          </a>
        </div>
        <div className="free-product-card__install">
          <span className="free-product-card__install-label">Quick open</span>
          <div className="free-product-card__command">
            <code className="free-product-card__install-cmd">{installCommand}</code>
            <button
              className="free-product-card__copy"
              type="button"
              onClick={copyInstallCommand}
              disabled={copyStatus === "unavailable"}
              aria-label={`Copy install command for ${product.title}`}
            >
              {copyLabel}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
