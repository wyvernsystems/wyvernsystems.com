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
  return (
    <div className="wyvern-emblem" aria-hidden="true">
      <img
        className="dragon-emblem-img"
        src={`${import.meta.env.BASE_URL}images/wyvern-systems-logo-matrix.png`}
        width={1024}
        height={558}
        decoding="async"
        alt=""
      />
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

          <section className="rtm-section" aria-labelledby="rtm-heading">
            <h2 id="rtm-heading" className="rtm-heading">
              Real-time monitoring
            </h2>
            <p className="rtm-engine">
              Engine: primary use of the{" "}
              <span className="rtm-term">ClamAV</span> daemon (
              <code className="rtm-code">clamd</code>) for signature-based detection.
            </p>
            <p className="rtm-lead">
              Enable on-access protection on Linux, macOS, and Windows with platform-native
              integrations.
            </p>
            <div className="rtm-grid">
              <article className="offer-card rtm-card">
                <h3 className="rtm-card-title">Linux</h3>
                <p className="rtm-card-body">
                  <span className="rtm-term">clamonacc</span> with the Linux{" "}
                  <code className="rtm-code">fanotify</code> kernel API for on-access scanning
                  and prevention before malicious content is executed or read.
                </p>
              </article>
              <article className="offer-card rtm-card">
                <h3 className="rtm-card-title">macOS</h3>
                <p className="rtm-card-body">
                  Integration with Apple&apos;s{" "}
                  <span className="rtm-term">Endpoint Security Framework</span> (ESF) to
                  intercept file events such as{" "}
                  <code className="rtm-code">AUTH_OPEN</code> before they complete.
                </p>
              </article>
              <article className="offer-card rtm-card">
                <h3 className="rtm-card-title">Windows</h3>
                <p className="rtm-card-body">
                  A <span className="rtm-term">Windows Service</span> wrapper or integration
                  with <span className="rtm-term">Wazuh</span> /{" "}
                  <span className="rtm-term">OSSEC</span> agents for real-time{" "}
                  <span className="rtm-term">File Integrity Monitoring</span> (FIM).
                </p>
              </article>
            </div>
          </section>

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
        </div>
      </section>
    </>
  );
}
