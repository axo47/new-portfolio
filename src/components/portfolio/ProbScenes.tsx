import { useEffect, useRef } from "react";
import { useLang } from "@/hooks/useLang";
import { useVisible } from "@/hooks/useVisible";
import { ink } from "@/lib/palette";
import { StageFrame } from "./HeroStage";

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
/** progress of a beat that runs from a to b seconds */
const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
const smooth = (x: number) => x * x * (3 - 2 * x);

/** Seeded generator, so every loop replays the same bounces. */
const rng = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let z = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  z = (z + Math.imul(z ^ (z >>> 7), 61 | z)) ^ z;
  return ((z ^ (z >>> 14)) >>> 0) / 4294967296;
};

const ROWS = 7, BALLS = 72, DURATION = 14;
const HOP = 0.13, DROP = 0.32, FIRST = 1.5, GAP = 0.1;
const FALL = HOP * (ROWS + 1) + DROP;

type Ball = { moves: number[]; bin: number; slot: number };
const balls: Ball[] = (() => {
  const u = rng(21);
  const inBin = new Array(ROWS + 1).fill(0);
  return Array.from({ length: BALLS }, () => {
    const moves = Array.from({ length: ROWS }, () => (u() < 0.5 ? 0 : 1));
    const bin = moves.reduce((a, b) => a + b, 0);
    return { moves, bin, slot: inBin[bin]++ };
  });
})();

/** Galton board: balls bounce through the pegs and pile up into the bell of the central limit theorem. */
const GaltonScene = () => {
  const [box, visible] = useVisible<HTMLDivElement>({ amount: 0.1, top: 40, bottom: 40 });
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = box.current, cv = canvas.current;
    const ctx = cv?.getContext("2d");
    if (!visible || !el || !cv || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, raf = 0;
    const start = performance.now();
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = el.clientWidth; H = el.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      cv.style.width = `${W}px`; cv.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const frame = (now: number) => {
      const t = reduce ? DURATION * 0.8 : (Math.max(0, now - start) / 1000) % DURATION;
      const C = ink.rgb;
      ctx.clearRect(0, 0, W, H);
      ctx.globalAlpha = smooth(seg(t, 0, 0.6)) * (1 - smooth(seg(t, 13, 14)));

      const cx = W / 2, dx = W * 0.08, dy = dx * 0.85, y0 = H * 0.11, base = H * 0.93, r = dx * 0.21;
      const pegX = (row: number, s: number) => cx + (s - row / 2) * dx;
      const rowY = (row: number) => y0 + row * dy;
      const rest = (b: Ball): [number, number] => [
        cx + (b.bin - ROWS / 2) * dx + (b.slot % 2 ? r : -r) * 0.98,
        base - r - Math.floor(b.slot / 2) * r * 1.72,
      ];

      // Create: the pegs appear row by row
      for (let row = 0; row < ROWS; row++) {
        const a = smooth(seg(t, 0.2 + row * 0.12, 0.7 + row * 0.12));
        ctx.fillStyle = `rgba(${C},${0.55 * a})`;
        for (let s = 0; s <= row; s++) { ctx.beginPath(); ctx.arc(pegX(row, s), rowY(row), dx * 0.07 * a, 0, 7); ctx.fill(); }
      }
      // the floor
      const fl = smooth(seg(t, 0.6, 1.6));
      ctx.strokeStyle = `rgba(${C},0.4)`; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(cx - (ROWS + 1) * dx * 0.5 * fl - dx * 0.2, base); ctx.lineTo(cx + (ROWS + 1) * dx * 0.5 * fl + dx * 0.2, base); ctx.stroke();

      // the balls
      balls.forEach((b, k) => {
        const tau = t - (FIRST + k * GAP);
        if (tau < 0) return;
        const live = tau < FALL;
        let [x, y] = rest(b);
        if (live) {
          // funnel → peg row 0 → … → last peg → the pile
          const pts: [number, number][] = [[cx, y0 - dy]];
          let sum = 0;
          for (let row = 0; row < ROWS; row++) { pts.push([pegX(row, sum), rowY(row)]); sum += b.moves[row]; }
          pts.push([pegX(ROWS, sum), rowY(ROWS)]);
          const hops = tau / HOP, h = Math.floor(hops), f = hops - h;
          if (h <= ROWS) {
            const [ax, ay] = pts[h], [bx, by] = pts[h + 1];
            const ex = h === 0 ? f : smooth(f);
            x = ax + (bx - ax) * ex;
            y = ay + (by - ay) * (f * f * 0.7 + f * 0.3) - Math.sin(f * Math.PI) * dy * 0.22 * (h === 0 ? 0 : 1);
          } else {
            const [ax, ay] = pts[ROWS + 1], [rx, ry] = rest(b), g = clamp01((tau - HOP * (ROWS + 1)) / DROP);
            x = ax + (rx - ax) * smooth(g);
            y = ay + (ry - ay) * g * g;
          }
        }
        ctx.fillStyle = `rgba(${C},${live ? 0.95 : 0.5})`;
        ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
        if (!live) { ctx.strokeStyle = `rgba(${C},0.8)`; ctx.lineWidth = 0.8; ctx.stroke(); }
      });

      // the bell curve of the central limit theorem, drawn over the pile
      const g = smooth(seg(t, 9.8, 11.8));
      if (g > 0) {
        const sd = Math.sqrt(ROWS) / 2, N = 120, m = Math.floor(g * N);
        ctx.strokeStyle = `rgba(${C},1)`; ctx.lineWidth = 2; ctx.lineJoin = "round"; ctx.lineCap = "round"; ctx.beginPath();
        for (let i = 0; i <= m; i++) {
          const v = -(ROWS + 1) / 2 - 0.3 + (i / N) * (ROWS + 1.6);
          const pdf = Math.exp(-(v * v) / (2 * sd * sd)) / (sd * Math.sqrt(2 * Math.PI));
          const px = cx + v * dx, py = base - (BALLS * pdf * 0.5) * r * 1.72 - r * 0.2;
          if (i) ctx.lineTo(px, py);
          else ctx.moveTo(px, py);
        }
        ctx.stroke();
      }
      const la = smooth(seg(t, 10.8, 11.8)) * 0.85;
      if (la > 0.01) {
        ctx.font = `${Math.max(12, W * 0.034)}px "JetBrains Mono", ui-monospace, monospace`;
        ctx.textAlign = "right"; ctx.fillStyle = `rgba(${C},${la})`;
        ctx.fillText("≈ N(μ, σ²)", W * 0.94, H * 0.12);
      }
      ctx.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [visible, box]);

  return (
    <div ref={box} className="relative aspect-square w-full">
      <canvas ref={canvas} className="absolute inset-0" />
    </div>
  );
};

/** Probability: the Galton board, framed as a numbered figure. */
export const GaltonStage = ({ n }: { n: number }) => {
  const { t } = useLang();
  return (
    <StageFrame
      n={n}
      caption={t({
        fr: "Théorème central limite.",
        en: "Central limit theorem.",
      })}
    >
      <GaltonScene />
    </StageFrame>
  );
};
