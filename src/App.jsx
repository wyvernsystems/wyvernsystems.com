import DecorativeBoundary from "./components/DecorativeBoundary.jsx";
import FreeProductCard from "./components/FreeProductCard.jsx";
import { GitHubIcon, LinkedInIcon } from "./components/BrandIcons.jsx";
import MatrixRain from "./components/MatrixRain.jsx";
import WyvernBackdrop from "./components/WyvernBackdrop.jsx";
import { FREE_PRODUCTS } from "./data/freeProducts.js";

const RON_SITE = "https://ronpicard.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/ron-picard-8b7b3059";
const GITHUB_URL = "https://github.com/wyvernsystems";

const CONSULTING_OFFERS = [
  {
    id: "technical",
    title: ["Technical", "Consulting"],
    description:
      "AI, software, hardware, full system design, aviation, aircraft design, flight test, and more.",
  },
  {
    id: "educational",
    title: ["Educational", "Consulting"],
    description: "Lessons, workshops, and mentoring for teams and individuals.",
  },
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
                <LinkedInIcon />
              </a>
              <a
                className="section-nav__icon"
                href={GITHUB_URL}
                rel="noopener noreferrer"
                target="_blank"
                aria-label="GitHub"
              >
                <GitHubIcon />
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
                  height="21"
                  decoding="async"
                />
              </a>
            </div>
          </nav>

          <header className="hero">
            <h1 className="hero-title">Wyvern Systems</h1>
            <p className="hero-byline">
              Independent technical consulting by <span className="hero-name">Ron Picard</span>
            </p>
            <div className="hero-cta">
              <a
                className="btn btn-ghost"
                href={LINKEDIN_URL}
                rel="noopener noreferrer"
                target="_blank"
              >
                Contact Me
              </a>
              <a className="btn btn-ghost" href="#consulting">
                Services
              </a>
              <a className="btn btn-ghost" href="#products">
                Products
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
                <h2 className="section-heading" id="consulting-heading">
                  Consulting
                </h2>
              </div>
            </div>
            <div className="offers-grid">
              {CONSULTING_OFFERS.map((offer) => (
                <article key={offer.id} className={`offer-card offer-card--${offer.id}`}>
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
                <LinkedInIcon className="btn__logo" size={18} />
                Message me on LinkedIn
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
