import { useEffect, useRef } from "react";

const CHARS =
  "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ0123456789ABCDEFｦｧｨｩｪｫｬｭｮｯ";

export default function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    const fontSize = 16;
    let drops = [];
    let raf = 0;
    let frame = 0;

    function layout() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const vv = window.visualViewport;
      const cw = canvas.clientWidth || vv?.width || window.innerWidth;
      const ch = canvas.clientHeight || vv?.height || window.innerHeight;
      w = Math.max(cw, window.innerWidth);
      h = Math.max(ch, window.innerHeight, document.documentElement.clientHeight || 0);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = Math.max(1, Math.ceil(w / fontSize));
      const rows = Math.max(12, Math.ceil(h / fontSize) + 4);
      /* Start mid-stream so the screen reads as already raining, not empty-then-fall */
      drops = new Array(cols).fill(0).map(() => Math.random() * rows);
    }

    const visualViewport = window.visualViewport;
    layout();
    window.addEventListener("resize", layout);
    visualViewport?.addEventListener("resize", layout);
    /* iOS Safari: URL bar show/hide changes layout without a window resize */
    visualViewport?.addEventListener("scroll", layout, { passive: true });

    function tick() {
      frame += 1;
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(0, 0, 0, 0.065)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px "Share Tech Mono", "Courier New", Courier, monospace`;

      for (let i = 0; i < drops.length; i++) {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const flash = Math.random() > 0.988;
        ctx.fillStyle = flash ? "#ffffff" : "#00ff41";
        ctx.shadowColor = flash ? "#00ff66" : "#00aa33";
        ctx.shadowBlur = flash ? 10 : 3;
        ctx.fillText(ch, x, y);
        ctx.shadowBlur = 0;

        /* Advance columns every 3rd frame for slower fall */
        if (frame % 3 === 0) {
          if (y > h && Math.random() > 0.975) {
            drops[i] = -Math.random() * Math.ceil(h / fontSize) * 0.35;
          } else {
            drops[i] += 1;
          }
        }
      }

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", layout);
      visualViewport?.removeEventListener("resize", layout);
      visualViewport?.removeEventListener("scroll", layout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="matrix-canvas"
      aria-hidden="true"
    />
  );
}
