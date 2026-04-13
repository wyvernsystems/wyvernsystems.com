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
  { l: 91, t: 22, d: 1 },
  { l: 10, t: 88, d: 2.5 },
];

function WyvernEmblem() {
  const gid = useId().replace(/:/g, "");
  return (
    <div className="wyvern-emblem" aria-hidden="true">
      <svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="wyvern-svg">
        <defs>
          <linearGradient id={`${gid}-fire`} x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#5c2a0a" />
            <stop offset="45%" stopColor="#c45c1a" />
            <stop offset="100%" stopColor="#ffd07a" />
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
            stroke={`url(#${gid}-fire)`}
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="wyvern-body-stroke"
          />
          <path
            d="M100 78v72M62 128h76"
            stroke="#ffd07a"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M48 96 Q12 72 4 36M152 96 Q188 72 196 36"
            stroke="#e8a54b"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.55"
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
  const marqueeItems = [...SPECTRUM, ...SPECTRUM];

  return (
    <>
      <div className="page-scales" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <header className="hero" id="top">
        <div className="hero-bg">
          <img
            className="hero-bg-img"
            src="/images/hero-aviation.jpg"
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
          <p className="hero-byline">
            <span className="hero-name">Ron Picard</span>
            <span className="hero-tags">
              Autonomy · Software · Flight test · Engineering
            </span>
          </p>
          <p className="hero-lead">
            I help teams and leaders <strong>grow the value of their business</strong> through
            hands-on consulting—and I offer <strong>educational</strong> sessions and materials
            so your people can level up. I take on <strong>hard problems</strong> and stay until
            we ship <strong>real results</strong>.
          </p>
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
        <div className="scroll-hint" aria-hidden="true">
          <span className="scroll-line" />
          Scroll
        </div>
      </header>

      <div className="marquee-wrap" role="presentation">
        <div className="marquee">
          <div className="marquee-track">
            {marqueeItems.map((item, i) => (
              <span key={`${item}-${i}`} className="marquee-item">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <main>
        <RevealSection className="panel panel-offers">
          <div className="panel-inner offers-grid">
            <article className="offer-card">
              <span className="offer-icon" aria-hidden="true">
                ◆
              </span>
              <h2>Consulting</h2>
              <p>
                Embedded support for strategy, architecture, autonomy, and test—aligned to
                outcomes that move your business forward, not slide decks that gather dust.
              </p>
            </article>
            <article className="offer-card">
              <span className="offer-icon" aria-hidden="true">
                ✦
              </span>
              <h2>Education</h2>
              <p>
                Workshops, mentoring, and curriculum-style deep dives so your team builds
                lasting skill in AI, software, systems, and flight-related domains.
              </p>
            </article>
          </div>
        </RevealSection>

        <RevealSection className="panel panel-proof">
          <div className="panel-inner">
            <h2 className="section-heading">Examples of the work</h2>
            <p className="section-sub">
              Explore public projects, apps, and lessons—or the full career arc and writing on
              LinkedIn.
            </p>
            <div className="proof-cards">
              <a className="proof-card" href={RON_SITE} rel="noopener noreferrer" target="_blank">
                <span className="proof-label">Portfolio &amp; builds</span>
                <span className="proof-title">ronpicard.com</span>
                <span className="proof-desc">
                  Interactive apps, visualizers, articles, and software lesson series—AI,
                  aviation, algorithms, and more.
                </span>
                <span className="proof-arrow" aria-hidden="true">
                  →
                </span>
              </a>
              <a
                className="proof-card"
                href={LINKEDIN}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="proof-label">Career &amp; perspective</span>
                <span className="proof-title">LinkedIn</span>
                <span className="proof-desc">
                  Roles in autonomy and product, flight-test milestones, and posts on the
                  industries I operate in.
                </span>
                <span className="proof-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="panel panel-cta">
          <div className="panel-inner cta-inner">
            <h2 className="cta-dragon" aria-hidden="true">
              ※
            </h2>
            <h2>Let&apos;s solve something hard</h2>
            <p>
              Tell me what you&apos;re building or teaching. I&apos;ll reply within a few business
              days.
            </p>
            <div className="hero-cta">
              <a className="btn btn-ember" href={MAIL}>
                hello@wyvernsystems.com
              </a>
              <a className="btn btn-ghost btn-ghost--dark" href={LINKEDIN} rel="noopener noreferrer" target="_blank">
                Message via LinkedIn
              </a>
            </div>
          </div>
        </RevealSection>
      </main>

      <footer className="site-footer">
        <p className="footer-brand">&copy; {year} Wyvern Systems, LLC · Ron Picard</p>
        <p className="footer-credits">
          Photography:{" "}
          <a href="https://unsplash.com/license" rel="noopener noreferrer" target="_blank">
            Unsplash
          </a>{" "}
          — <a href="/images/ATTRIBUTION.txt">credits</a>
        </p>
      </footer>
    </>
  );
}
