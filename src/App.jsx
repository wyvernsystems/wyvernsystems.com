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
  const stroke = `url(#${gid}-mx)`;
  return (
    <div className="wyvern-emblem" aria-hidden="true">
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="wyvern-svg">
        <defs>
          <linearGradient id={`${gid}-mx`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#003311" />
            <stop offset="45%" stopColor="#008822" />
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
          {/* Wing (bat wing, heraldic wyvern) */}
          <path
            d="M 124 88 C 124 38 72 28 44 52 C 26 66 32 94 56 104 C 78 88 100 82 124 88"
            stroke={stroke}
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="wyvern-body-stroke"
          />
          {/* Body into tail */}
          <path
            d="M 124 88 C 150 94 172 112 182 138 M 176 134 L 192 144 L 180 150"
            stroke={stroke}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="wyvern-body-stroke"
          />
          {/* Neck, head, snout, jaw */}
          <path
            d="M 124 88 C 114 72 94 56 68 52 C 50 49 36 62 32 82 C 30 92 36 102 48 106 C 56 108 52 114 42 112 L 26 106"
            stroke={stroke}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="wyvern-body-stroke"
          />
          {/* Horn */}
          <path
            d="M 58 54 L 52 38"
            stroke="#88ffaa"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.95"
          />
          {/* Eye */}
          <circle cx="54" cy="72" r="2.8" fill="#66ff99" opacity="0.92" />
          {/* Clawed forelimb */}
          <path
            d="M 108 98 L 102 122 M 112 108 L 118 120 M 98 112 L 92 124"
            stroke="#88ffaa"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.9"
          />
          {/* Wing vein */}
          <path
            d="M 58 96 Q 84 68 110 86"
            stroke="#00ff55"
            strokeWidth="1.6"
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
          <p className="hero-lead">Solving your hard problems and delivering real results.</p>

          <div className="offers-grid">
            <article className="offer-card">
              <span className="offer-icon" aria-hidden="true">
                ▲
              </span>
              <h2>Consulting</h2>
              <p>
                Strategy, architecture, autonomy, and flight-related programs—tied to outcomes,
                not theater.
              </p>
            </article>
            <article className="offer-card">
              <span className="offer-icon" aria-hidden="true">
                ◆
              </span>
              <h2>Education</h2>
              <p>
                Workshops and deep dives in AI, software, systems, and aviation domains—skills that
                stick.
              </p>
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
