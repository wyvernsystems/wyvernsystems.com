import DecorativeBoundary from "./components/DecorativeBoundary.jsx";
import FreeProductCard from "./components/FreeProductCard.jsx";
import HeroLead from "./components/HeroLead.jsx";
import MatrixRain from "./components/MatrixRain.jsx";
import OfferIcon from "./components/OfferIcon.jsx";
import WyvernBackdrop from "./components/WyvernBackdrop.jsx";
import { FREE_PRODUCTS } from "./data/freeProducts.js";

const RON_SITE = "https://ronpicard.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/ron-picard-8b7b3059";

const CONSULTING_OFFERS = [
  {
    id: "technical",
    title: ["Technical", "Consulting"],
    description:
      "Systems, AI, autonomy, software, hardware, robotics, aviation, aircraft design, flight test, and more.",
  },
  {
    id: "educational",
    title: ["Educational", "Consulting"],
    description: "Lessons, workshops, and mentoring for teams and individuals.",
  },
];

const SECTION_LINKS = [
  { href: "#consulting", label: "Consulting" },
  { href: "#products", label: "Products" },
  { href: "#contact", label: "Contact" },
];

export default function App() {
  const year = new Date().getFullYear();

  return (
    <>
      <DecorativeBoundary>
        <WyvernBackdrop />
        <div className="matrix-vignette" aria-hidden="true" />
        <div className="grain matrix-grain" aria-hidden="true" />
        <MatrixRain />
      </DecorativeBoundary>

      <section className="home" id="top" aria-label="Wyvern Systems">
        <div className="home-bg">
          <div className="home-bg-scrim" />
          <div className="home-matrix-scan" aria-hidden="true" />
        </div>

        <div className="home-inner">
          <nav className="section-nav" aria-label="Page sections">
            <a className="section-nav__brand" href="#top" aria-label="Wyvern Systems home">
              WS
            </a>
            <div className="section-nav__links">
              {SECTION_LINKS.map((link) => (
                <a key={link.href} className="section-nav__link" href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          <header className="hero">
            <p className="hero-llc">Wyvern Systems, LLC</p>
            <h1 className="hero-title">Wyvern Systems</h1>
            <p className="hero-byline">
              Independent technical consulting by <span className="hero-name">Ron Picard</span>
            </p>
            <HeroLead />
            <div className="hero-cta">
              <a
                className="btn btn-ghost"
                href={LINKEDIN_URL}
                rel="noopener noreferrer"
                target="_blank"
              >
                Start a conversation
              </a>
              <a className="btn btn-ghost" href="#consulting">
                Explore services
              </a>
              <a className="btn btn-ghost" href="#products">
                Explore products
              </a>
            </div>
          </header>

          <section
            id="consulting"
            className="consulting scroll-target"
            aria-labelledby="consulting-heading"
          >
            <div className="section-title-row">
              <div>
                <p className="section-eyebrow">Capabilities</p>
                <h2 className="section-heading" id="consulting-heading">
                  Consulting
                </h2>
              </div>
            </div>
            <div className="offers-grid">
              {CONSULTING_OFFERS.map((offer) => (
                <article key={offer.id} className={`offer-card offer-card--${offer.id}`}>
                  <OfferIcon type={offer.id} />
                  <h3>
                    {offer.title[0]}
                    <br />
                    {offer.title[1]}
                  </h3>
                  <p className="offer-card__desc">{offer.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section
            id="products"
            className="free-products scroll-target"
            aria-labelledby="free-products-heading"
          >
            <div className="section-title-row">
              <div>
                <p className="section-eyebrow">Open tools</p>
                <h2 className="section-heading" id="free-products-heading">
                  Free products
                </h2>
              </div>
            </div>
            <ul className="free-products-list" role="list">
              {FREE_PRODUCTS.map((product) => (
                <li key={product.id} className="free-products-list__item">
                  <FreeProductCard product={product} />
                </li>
              ))}
            </ul>
          </section>

          <footer id="contact" className="site-footer site-footer--terminal scroll-target">
            <h2 className="section-heading section-heading--sub">Contact</h2>

            <div className="home-cta">
              <a
                className="btn btn-ghost"
                href={LINKEDIN_URL}
                rel="noopener noreferrer"
                target="_blank"
              >
                Message me on LinkedIn
              </a>
              <a
                className="btn btn-ghost"
                href={RON_SITE}
                rel="noopener noreferrer"
                target="_blank"
              >
                ronpicard.com
              </a>
            </div>

            <p className="home-copy">&copy; {year} Wyvern Systems, LLC</p>
          </footer>
        </div>
      </section>
    </>
  );
}
