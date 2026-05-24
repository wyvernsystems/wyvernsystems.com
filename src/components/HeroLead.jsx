import { useEffect, useState } from "react";

const FULL_TEXT = "Solving your hardest technical problems and delivering real results.";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function HeroLead() {
  const [display, setDisplay] = useState(() =>
    prefersReducedMotion() ? FULL_TEXT : "",
  );

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let index = 0;
    setDisplay("");
    const stepMs = 32;
    const id = window.setInterval(() => {
      index += 1;
      setDisplay(FULL_TEXT.slice(0, index));
      if (index >= FULL_TEXT.length) {
        window.clearInterval(id);
      }
    }, stepMs);

    return () => window.clearInterval(id);
  }, []);

  return (
    <p className="hero-lead">
      <span aria-live="polite">{display}</span>
      <span className="hero-lead__cursor" aria-hidden="true">
        ▌
      </span>
    </p>
  );
}
