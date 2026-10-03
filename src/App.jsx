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

const LINKEDIN_ICON_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

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
          <nav className="section-nav" aria-label="Site and social">
            <a className="section-nav__brand" href="#top" aria-label="Wyvern Systems home">
              <img
                className="section-nav__mark"
                src="/wyvern-mark.png"
                alt="Wyvern Systems"
                width="512"
                height="512"
                decoding="async"
              />
            </a>
            <div className="section-nav__social">
              <a
                className="section-nav__icon"
                href={LINKEDIN_URL}
                rel="noopener noreferrer"
                target="_blank"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path fill="currentColor" d={LINKEDIN_ICON_PATH} />
                </svg>
              </a>
              <a
                className="section-nav__icon"
                href={RON_SITE}
                rel="noopener noreferrer"
                target="_blank"
                aria-label="Ron Picard"
              >
                <img
                  className="section-nav__icon-img"
                  src="/ronpicard-mark.svg"
                  alt=""
                  width="22"
                  height="22"
                  decoding="async"
                />
              </a>
            </div>
          </nav>

          <header className="hero">
            <p className="hero-llc">Wyvern Systems LLC</p>
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

            <p className="home-copy">
              Wyvern Systems LLC is a United States limited liability company. This site
              and the wyvernsystems.com domain are owned and operated by Wyvern Systems LLC.
            </p>

            <p className="home-copy">&copy; {year} Wyvern Systems LLC</p>
          </footer>
        </div>
      </section>
    </>
  );
}
