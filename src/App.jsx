const FOCUS_AREAS = [
  "Artificial intelligence",
  "Software systems",
  "Hardware & integration",
  "Engineering",
  "Aviation",
  "Flight test",
];

const LINKEDIN = "https://www.linkedin.com/in/ron-picard-8b7b3059";
const RON_SITE = "https://ronpicard.com";
const MAIL = "mailto:hello@wyvernsystems.com";

function WyvernMark() {
  return (
    <div className="wyvern-mark" aria-hidden="true">
      <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M60 8 L18 132h22l20-52 20 52h22L60 8z"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M60 52v48M38 88h44"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M28 72 Q8 60 4 40M92 72 Q112 60 116 40"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}

export default function App() {
  const year = new Date().getFullYear();

  return (
    <>
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
        </div>
        <div className="hero-content">
          <WyvernMark />
          <p className="hero-llc">Limited liability company</p>
          <h1 className="hero-title">Wyvern Systems</h1>
          <p className="hero-tagline">
            Consulting services specializing in{" "}
            <span className="hero-focus">AI</span>,{" "}
            <span className="hero-focus">software</span>,{" "}
            <span className="hero-focus">hardware</span>,{" "}
            <span className="hero-focus">engineering</span>,{" "}
            <span className="hero-focus">aviation</span>, and{" "}
            <span className="hero-focus">flight test</span>.
          </p>
          <ul className="pill-row" aria-label="Focus areas">
            {FOCUS_AREAS.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
          <div className="hero-cta">
            <a className="btn btn-gold" href={MAIL}>
              Get in touch
            </a>
            <a
              className="btn btn-outline"
              href={LINKEDIN}
              rel="noopener noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
            <a
              className="btn btn-outline"
              href={RON_SITE}
              rel="noopener noreferrer"
              target="_blank"
            >
              ronpicard.com
            </a>
          </div>
        </div>
        <div className="scroll-hint" aria-hidden="true">
          Scroll
        </div>
      </header>

      <main>
        <section className="panel panel-split">
          <div className="panel-visual">
            <img
              src="/images/tech-circuits.jpg"
              alt=""
              width={1600}
              height={1067}
              loading="lazy"
            />
            <div className="panel-visual-frame" />
          </div>
          <div className="panel-copy">
            <h2>From algorithms to airspace</h2>
            <p>
              Wyvern Systems delivers senior technical consulting at the intersection of
              autonomy, software, and flight operations—whether you are maturing AI for
              real vehicles, hardening product architecture, or planning a credible
              flight-test campaign.
            </p>
          </div>
        </section>

        <section className="panel panel-dark">
          <div className="panel-inner">
            <h2>Principal</h2>
            <div className="principal-card">
              <div className="principal-text">
                <p className="principal-name">Ron Picard</p>
                <p className="principal-role">
                  Autonomy · software · flight test · engineering leadership
                </p>
                <p>
                  Ron is a <strong>Product Architect at Applied Intuition</strong> and the
                  founder behind Wyvern Systems. Previously he held director-level roles at
                  EpiSci (now part of Applied Intuition) across{" "}
                  <strong>aircraft autonomy</strong>, <strong>product</strong>, and{" "}
                  <strong>autonomy engineering</strong>—including hiring, capture, and
                  delivery of tactical autonomy software demonstrated on UAS swarms and
                  crewed platforms.
                </p>
                <p>
                  Earlier, as <strong>Experimentation Lead</strong> with the U.S. Air Force,
                  he commissioned and led joint DoD efforts integrating{" "}
                  <strong>AI agents on the X-62A VISTA</strong>, group 4/5 UAS experimentation,
                  and large-force flight test—briefing results to senior DoD leadership and
                  helping shape how the flight-test enterprise evaluates autonomy.
                </p>
                <p>
                  His background also includes hands-on{" "}
                  <strong>software engineering</strong> (ML, radar tooling, agile delivery),{" "}
                  <strong>materials / mechanical engineering</strong>, and extensive writing
                  and teaching on AI, software, and aviation—see{" "}
                  <a href={RON_SITE}>ronpicard.com</a> for projects and articles.
                </p>
              </div>
              <div className="principal-aside">
                <img
                  src="/images/flight-line.jpg"
                  alt=""
                  width={1600}
                  height={1067}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="panel panel-cta">
          <div className="panel-inner cta-inner">
            <h2>Engage Wyvern Systems</h2>
            <p>
              Strategy sessions, architecture reviews, autonomy &amp; flight-test planning,
              and hands-on engineering support—scoped to what your program actually needs.
            </p>
            <div className="hero-cta">
              <a className="btn btn-gold" href={MAIL}>
                hello@wyvernsystems.com
              </a>
              <a
                className="btn btn-outline btn-on-dark"
                href={LINKEDIN}
                rel="noopener noreferrer"
                target="_blank"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p className="footer-brand">&copy; {year} Wyvern Systems, LLC</p>
        <p className="footer-credits">
          Photography: stock images from{" "}
          <a href="https://unsplash.com/license" rel="noopener noreferrer" target="_blank">
            Unsplash
          </a>{" "}
          — <a href="/images/ATTRIBUTION.txt">credits</a>
        </p>
      </footer>
    </>
  );
}
