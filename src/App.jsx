import FreeProductCard from "./components/FreeProductCard.jsx";
import MatrixRain from "./components/MatrixRain.jsx";
import WyvernBackdrop from "./components/WyvernBackdrop.jsx";
import { FREE_PRODUCTS } from "./data/freeProducts.js";

const RON_SITE = "https://ronpicard.com";

const SPECTRUM = [
  "AI",
  "Autonomy",
  "Software",
  "Hardware",
  "Robotics",
  "Aviation",
  "Flight test",
  "& more",
];

export default function App() {
  const year = new Date().getFullYear();

  return (
    <>
      <WyvernBackdrop />
      <div className="matrix-vignette" aria-hidden="true" />
      <div className="grain matrix-grain" aria-hidden="true" />
      <MatrixRain />

      <section className="home" id="top" aria-label="Wyvern Systems">
        <div className="home-bg">
          <div className="home-bg-scrim" />
          <div className="home-matrix-scan" aria-hidden="true" />
        </div>

        <div className="home-inner">
          <p className="hero-llc">Wyvern Systems, LLC</p>
          <h1 className="hero-title">Wyvern Systems</h1>
          <p className="hero-byline">
            <span className="hero-name">Ron Picard</span>
          </p>
          <p className="hero-lead">
            Solving your hard technical problems and delivering real results.
          </p>

          <div className="offers-grid">
            <article className="offer-card">
              <h2>
                Technical
                <br />
                Consulting
              </h2>
            </article>
            <article className="offer-card">
              <h2>
                Educational
                <br />
                Consulting
              </h2>
            </article>
          </div>

          <p className="spectrum-label">What I cover</p>
          <ul className="pill-row" aria-label="Technical spectrum">
            {SPECTRUM.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>

          <div className="home-cta">
            <a
              className="btn btn-ember"
              href="https://www.linkedin.com/in/ron-picard-8b7b3059"
              rel="noopener noreferrer"
              target="_blank"
            >
              Message me on LinkedIn
            </a>
            <a className="btn btn-ember" href={RON_SITE} rel="noopener noreferrer" target="_blank">
              ronpicard.com
            </a>
          </div>

          <p className="home-copy">&copy; {year} Wyvern Systems, LLC</p>

          <section className="free-products" aria-labelledby="free-products-heading">
            <p className="spectrum-label" id="free-products-heading">
              Free products
            </p>
            <ul className="free-products-list" role="list">
              {FREE_PRODUCTS.map((product) => (
                <li key={product.id} className="free-products-list__item">
                  <FreeProductCard product={product} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </>
  );
}
