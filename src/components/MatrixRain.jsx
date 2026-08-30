import { useEffect, useRef } from "react";

const CHARS =
  "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ0123456789ABCDEFｦｧｨｩｪｫｬｭｮｯ";
const FONT = '"Share Tech Mono", "Courier New", Courier, monospace';
/* Fixed cadence: draw at ~30fps, advance drops every 50ms, on any refresh rate */
const FRAME_MS = 1000 / 30;
const ADVANCE_MS = 50;

export default function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 0;
    const fontSize = 16;
    /* Sprite cell padding leaves room for the baked-in glow */
    const pad = 12;
    const cell = fontSize + pad * 2;
    let drops = [];
    let raf = 0;
    let running = false;
    let last = 0;
    let advanceAcc = 0;
    let greenSheet = null;
    let flashSheet = null;

    /* Canvas shadows are too slow to draw per glyph per frame, so each
       character is rasterized once (glow included) and blitted from a sheet. */
    function buildSheet(fill, glow, blur) {
      const sheet = document.createElement("canvas");
      sheet.width = Math.ceil(cell * CHARS.length * dpr);
      sheet.height = Math.ceil(cell * dpr);
      const sctx = sheet.getContext("2d");
      if (!sctx) return null;
      sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sctx.font = `${fontSize}px ${FONT}`;
      sctx.fillStyle = fill;
      sctx.shadowColor = glow;
      sctx.shadowBlur = blur;
      for (let i = 0; i < CHARS.length; i++) {
        sctx.fillText(CHARS[i], i * cell + pad, pad + fontSize);
      }
      return sheet;
    }

    function buildSheets() {
      greenSheet = buildSheet("#00ff41", "#00aa33", 3);
      flashSheet = buildSheet("#ffffff", "#00ff66", 10);
    }

    function layout() {
      const nextDpr = Math.min(window.devicePixelRatio || 1, 2);
      const vv = window.visualViewport;
      const cw = canvas.clientWidth || vv?.width || window.innerWidth;
      const ch = canvas.clientHeight || vv?.height || window.innerHeight;
      const nextW = Math.max(cw, window.innerWidth);
      const nextH = Math.max(ch, window.innerHeight, document.documentElement.clientHeight || 0);
      /* visualViewport fires scroll/resize constantly while the page scrolls or
         the iOS URL bar animates; resetting the canvas wipes the trails and
         reseeds the rain, so bail unless the geometry actually changed. */
      if (nextW === w && nextH === h && nextDpr === dpr) return;
      const dprChanged = nextDpr !== dpr;
      w = nextW;
      h = nextH;
      dpr = nextDpr;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (dprChanged) buildSheets();
      const cols = Math.max(1, Math.ceil(w / fontSize));
      const rows = Math.max(12, Math.ceil(h / fontSize) + 4);
      /* Start mid-stream so the screen reads as already raining, not empty-then-fall */
      drops = new Array(cols).fill(0).map(() => Math.random() * rows);
    }

    function tick(now) {
      raf = requestAnimationFrame(tick);
      const elapsed = now - last;
      if (elapsed < FRAME_MS - 1) return;
      last = now;

      /* 0.13 ≈ the old 0.065-per-frame fade compounded for 30fps vs 60fps */
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(0, 0, 0, 0.13)";
      ctx.fillRect(0, 0, w, h);

      advanceAcc += Math.min(elapsed, 250);
      const advance = advanceAcc >= ADVANCE_MS;
      if (advance) advanceAcc %= ADVANCE_MS;

      const cellPx = cell * dpr;
      for (let i = 0; i < drops.length; i++) {
        const idx = Math.floor(Math.random() * CHARS.length);
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const flash = Math.random() > 0.988;
        const sheet = flash ? flashSheet : greenSheet;
        if (sheet) {
          ctx.drawImage(sheet, idx * cellPx, 0, cellPx, cellPx, x - pad, y - pad - fontSize, cell, cell);
        }

        if (advance) {
          if (y > h && Math.random() > 0.975) {
            drops[i] = -Math.random() * Math.ceil(h / fontSize) * 0.35;
          } else {
            drops[i] += 1;
          }
        }
      }
    }

    function start() {
      if (running) return;
      running = true;
      layout();
      last = 0;
      advanceAcc = 0;
      raf = requestAnimationFrame(tick);
    }

    function stop() {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, w, h);
    }

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => {
      if (mq.matches) {
        stop();
      } else {
        start();
      }
    };

    const visualViewport = window.visualViewport;
    window.addEventListener("resize", layout);
    visualViewport?.addEventListener("resize", layout);
    /* iOS Safari: URL bar show/hide changes layout without a window resize */
    visualViewport?.addEventListener("scroll", layout, { passive: true });
    mq.addEventListener("change", onMotionChange);
    /* Sheets rendered before the webfont loads use the fallback font; redo them */
    document.fonts?.ready?.then(() => {
      if (running) buildSheets();
    });

    onMotionChange();

    return () => {
      stop();
      window.removeEventListener("resize", layout);
      visualViewport?.removeEventListener("resize", layout);
      visualViewport?.removeEventListener("scroll", layout);
      mq.removeEventListener("change", onMotionChange);
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
