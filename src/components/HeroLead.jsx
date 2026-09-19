import { useEffect, useState } from "react";

const FULL_TEXT = "Solving your hardest technical problems and delivering real results.";

/** True when nothing will animate: reduced motion, or a server render with no browser. */
function showsFullTextImmediately() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function HeroLead() {
  const [display, setDisplay] = useState(() =>
    showsFullTextImmediately() ? FULL_TEXT : "",
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let id = 0;

    const stopTyping = () => {
      if (id) window.clearInterval(id);
      id = 0;
    };

    const startTyping = () => {
      stopTyping();
      let index = 0;
      setDisplay("");
      const stepMs = 32;
      id = window.setInterval(() => {
        index += 1;
        setDisplay(FULL_TEXT.slice(0, index));
        if (index >= FULL_TEXT.length) {
          stopTyping();
        }
      }, stepMs);
    };

    const onMotionChange = () => {
      if (mq.matches) {
        stopTyping();
        setDisplay(FULL_TEXT);
      } else {
        startTyping();
      }
    };

    onMotionChange();
    mq.addEventListener("change", onMotionChange);
    return () => {
      stopTyping();
      mq.removeEventListener("change", onMotionChange);
    };
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
