import { useId } from "react";
import { useReveal } from "./hooks/useReveal.js";

const LINKEDIN = "https://www.linkedin.com/in/ron-picard-8b7b3059";
const RON_SITE = "https://ronpicard.com";
const MAIL = "mailto:hello@wyvernsystems.com";

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

const EMBERS = [
  { l: 6, t: 72, d: 0 },
  { l: 14, t: 38, d: 1.2 },
  { l: 22, t: 55, d: 2.4 },
  { l: 78, t: 42, d: 0.6 },
  { l: 88, t: 68, d: 1.8 },
  { l: 52, t: 18, d: 3 },
  { l: 65, t: 82, d: 2 },
  { l: 38, t: 28, d: 4 },
];

function WyvernEmblem() {
  const gid = useId().replace(/:/g, "");
  return (
    <div className="wyvern-emblem" aria-hidden="true">
      <svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="wyvern-svg">
        <defs>
          <linearGradient id={`${gid}-fire`} x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#4a0a12" />
            <stop offset="35%" stopColor="#9b1c1c" />
            <stop offset="70%" stopColor="#e85a28" />
            <stop offset="100%" stopColor="#ffd88a" />
          </linearGradient>
          <filter id={`${gid}-glow`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g filter={`url(#${gid}-glow)`} className="wyvern-wings">
          <path
            d="M100 28 L32 188h36l32-88 32 88h36L100 28z"
            stroke={`url(#${gid}-fire)`}
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="wyvern-body-stroke"
          />
          <path
            d="M100 78v72M62 128h76"
            stroke="#ffd88a"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.95"
          />
          <path
            d="M48 96 Q12 72 4 36M152 96 Q188 72 196 36"
            stroke="#e85a28"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.65"
          />
        </g>
      </svg>
    </div>
  );
}

function RevealSection({ children, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} className={`reveal-section ${visible ? "is-visible" : ""} ${className}`.trim()}>
      {children}
    </section>
  );
}

export default function App() {
  const year = new Date().getFullYear();

  return (
    <>
      <div className="page-dragon-skin" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <header className="hero" id="top">
        <div className="hero-bg">
          <img
            className="hero-bg-img"
            src="/images/hero-lair.jpg"
            alt=""
            width={2000}
            height={1333}
            fetchPriority="high"
          />
          <div className="hero-bg-scrim" />
          <div className="hero-dragon-glow" aria-hidden="true" />
        </div>
        <div className="embers" aria-hidden="true">
          {EMBERS.map((e, i) => (
            <span
              key={i}
              className="dragon-ember"
              style={{ left: `${e.l}%`, top: `${e.t}%`, animationDelay: `${e.d}s` }}
            />
          ))}
        </div>

        <div className="hero-content">
          <WyvernEmblem />
          <p className="hero-llc">Wyvern Systems, LLC</p>
          <h1 className="hero-title">Wyvern Systems</h1>
          <p className="hero-myth">
            A <strong>wyvern</strong> is a winged dragon—direct, decisive, built to strike from above.
          </p>
          <p className="hero-byline">
            <span className="hero-name">Ron Picard</span>
            <span className="hero-tags">
              Autonomy · Software · Flight test · Engineering
            </span>
          </p>
          <p className="hero-lead">
            Consulting to <strong>raise the value of your business</strong>, plus{" "}
            <strong>education</strong> so your team levels up. I take the <strong>hard problems</strong>{" "}
            and deliver <strong>real results</strong>.
          </p>
          <p className="spectrum-label">What I cover</p>
          <ul className="pill-row" aria-label="Technical spectrum">
            {SPECTRUM.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
          <div className="hero-cta">
            <a className="btn btn-ember" href={MAIL}>
              Start a conversation
            </a>
            <a className="btn btn-ghost" href={LINKEDIN} rel="noopener noreferrer" target="_blank">
              LinkedIn
            </a>
            <a className="btn btn-ghost" href={RON_SITE} rel="noopener noreferrer" target="_blank">
              ronpicard.com
            </a>
          </div>
        </div>
      </header>

      <main>
        <RevealSection className="panel panel-offers">
          <div className="panel-inner">
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
                  Workshops and deep dives in AI, software, systems, and aviation domains—skills
                  that stick.
                </p>
              </article>
            </div>
            <div className="contact-compact">
              <a className="contact-email" href={MAIL}>
                hello@wyvernsystems.com
              </a>
              <span className="contact-div" aria-hidden="true">
                |
              </span>
              <a href={LINKEDIN} rel="noopener noreferrer" target="_blank">
                LinkedIn profile
              </a>
              <span className="contact-div" aria-hidden="true">
                |
              </span>
              <a href={RON_SITE} rel="noopener noreferrer" target="_blank">
                Projects &amp; writing
              </a>
            </div>
          </div>
        </RevealSection>
      </main>

      <footer className="site-footer">
        <p className="footer-brand">
          &copy; {year} Wyvern Systems, LLC · Ron Picard ·{" "}
          <a href={LINKEDIN} rel="noopener noreferrer" target="_blank">
            LinkedIn
          </a>
          {" · "}
          <a href={RON_SITE} rel="noopener noreferrer" target="_blank">
            ronpicard.com
          </a>
        </p>
        <p className="footer-credits">
          Image:{" "}
          <a href="https://unsplash.com/license" rel="noopener noreferrer" target="_blank">
            Unsplash
          </a>{" "}
          — <a href="/images/ATTRIBUTION.txt">credits</a>
        </p>
      </footer>
    </>
  );
}
