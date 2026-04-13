import { useId } from "react";
import MatrixRain from "./components/MatrixRain.jsx";
import WyvernBackdrop from "./components/WyvernBackdrop.jsx";

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

function WyvernEmblem() {
  const gid = useId().replace(/:/g, "");
  return (
    <div className="wyvern-emblem" aria-hidden="true">
      <svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="wyvern-svg">
        <defs>
          <linearGradient id={`${gid}-mx`} x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#003311" />
            <stop offset="40%" stopColor="#008822" />
            <stop offset="100%" stopColor="#66ff99" />
          </linearGradient>
          <filter id={`${gid}-glow`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g filter={`url(#${gid}-glow)`} className="wyvern-wings">
          <path
            d="M100 28 L32 188h36l32-88 32 88h36L100 28z"
            stroke={`url(#${gid}-mx)`}
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="wyvern-body-stroke"
          />
          <path
            d="M100 78v72M62 128h76"
            stroke="#88ffaa"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.95"
          />
          <path
            d="M48 96 Q12 72 4 36M152 96 Q188 72 196 36"
            stroke="#00ff55"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.55"
          />
        </g>
      </svg>
    </div>
  );
}

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
          <WyvernEmblem />
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
              <span className="offer-icon" aria-hidden="true">
                ▲
              </span>
              <h2>
                Technical
                <br />
                Consulting
              </h2>
            </article>
            <article className="offer-card">
              <span className="offer-icon" aria-hidden="true">
                ◆
              </span>
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
            <a className="btn btn-ghost" href={RON_SITE} rel="noopener noreferrer" target="_blank">
              ronpicard.com
            </a>
          </div>

          <p className="home-copy">&copy; {year} Wyvern Systems, LLC</p>
        </div>
      </section>
    </>
  );
}
