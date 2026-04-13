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

    function layout() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = Math.max(1, Math.ceil(w / fontSize));
      drops = new Array(cols).fill(0).map(() => Math.floor(Math.random() * -60));
    }

    layout();
    window.addEventListener("resize", layout);

    function tick() {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(0, 0, 0, 0.09)";
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

        if (y > h && Math.random() > 0.975) {
          drops[i] = 0;
        } else {
          drops[i] += 1;
        }
      }

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", layout);
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
