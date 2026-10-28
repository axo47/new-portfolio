import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { ink } from "@/lib/palette";

/**
 * Animated figures of mathematical concepts, one per field:
 *   databases → Bellman DP in the query optimizer, AI → 3D gradient descent, applied math → SVD.
 * Loops only run while the figure is on screen.
 */

const useLoopWhileVisible = () => {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  return { ref, inView };
};

/** Paper-style figure frame: the drawing, then "Fig. n — caption". */
export const Figure = ({ n, caption, children }: { n: number; caption: string; children: ReactNode }) => (
  <figure className="m-0">
    {children}
    <figcaption className="font-mono-math mt-3 text-[11px] leading-relaxed text-muted-foreground">
      <span className="citation-number mr-1.5">Fig. {n}</span>
      {caption}
    </figcaption>
  </figure>
);

/* ---------- Databases: dynamic programming over join orders, with real numbers ---------- */

// Three tables A, B, C. "Rows" = rows produced by a join; the final result has 100 rows whatever the order.
const REL = [
  { id: "A", n: "1k" },
  { id: "B", n: "200" },
  { id: "C", n: "50" },
];
const PAIRS = [
  { id: "AB", rows: 500 },
  { id: "AC", rows: 50 },
  { id: "BC", rows: 2000 },
];
const OPTIONS = [
  { id: "AB→C", from: "AB", sum: "500+100", total: 600 },
  { id: "AC→B", from: "AC", sum: "50+100", total: 150 },
  { id: "BC→A", from: "BC", sum: "2000+100", total: 2100 },
];
const rowY = (k: number) => 30 + k * 21;
const barW = (v: number) => 4 + (30 * Math.log10(v)) / Math.log10(2000);

export const QueryOptimizerFigure = () => {
  const { ref, inView } = useLoopWhileVisible();
  const [n, setN] = useState(0);

  // 0 tables · 1 best cost of every pair · 2 every way to build ABC · 3 keep the minimum · 4 the winning plan · 5-6 hold
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setN((v) => (v >= 6 ? 0 : v + 1)), 1500);
    return () => clearInterval(id);
  }, [inView]);

  const title = (x: number, txt: string, on: boolean) => (
    <motion.text x={x} y="14" fontSize="6.3" fill="currentColor" className="font-mono-math" initial={false} animate={{ opacity: on ? 0.8 : 0 }}>{txt}</motion.text>
  );
  const winner = n >= 3;

  return (
    <svg ref={ref} viewBox="0 0 220 150" className="w-full text-primary" role="img" aria-label="Dynamic programming over join orders">
      {title(4, "① tables", true)}
      {title(56, "② pairs: rows out", n >= 1)}
      {title(140, "③ ABC = pick min", n >= 2)}

      {/* ① tables */}
      {REL.map((r, k) => (
        <g key={r.id}>
          <rect x="4" y={rowY(k) - 7} width="40" height="14" rx="1.5" fill="transparent" stroke="currentColor" strokeWidth="1" />
          <text x="9" y={rowY(k) + 2.4} fontSize="7" fontWeight="600" fill="currentColor" className="font-mono-math">{r.id}</text>
          <text x="40" y={rowY(k) + 2.4} textAnchor="end" fontSize="6.2" fill="currentColor" className="font-mono-math" opacity="0.75">{r.n}</text>
        </g>
      ))}

      {/* ② best plan for every pair: cost = rows produced */}
      {PAIRS.map((p, k) => {
        const best = winner && p.id === "AC";
        return (
          <motion.g key={p.id} initial={false} animate={{ opacity: n >= 1 ? (winner && !best ? 0.35 : 1) : 0 }} transition={{ duration: 0.4 }}>
            <rect x="56" y={rowY(k) - 7} width="22" height="14" rx="1.5" fill="transparent" stroke="currentColor" strokeWidth={best ? 1.6 : 1} />
            <text x="67" y={rowY(k) + 2.4} textAnchor="middle" fontSize="7" fontWeight="600" fill="currentColor" className="font-mono-math">{p.id}</text>
            <motion.rect x="82" y={rowY(k) - 3} height="6" fill="currentColor" fillOpacity={best ? 0.9 : 0.5} initial={false}
              animate={{ width: n >= 1 ? barW(p.rows) : 0 }} transition={{ duration: 0.9, delay: k * 0.15 }} />
            <text x={82 + barW(p.rows) + 3} y={rowY(k) + 2.4} fontSize="6.2" fill="currentColor" className="font-mono-math">{p.rows}</text>
          </motion.g>
        );
      })}

      {/* links from each pair to the way of building ABC with it */}
      {OPTIONS.map((o, k) => {
        const from = PAIRS.findIndex((p) => p.id === o.from);
        const best = winner && o.id === "AC→B";
        return (
          <motion.line key={o.id} x1="128" y1={rowY(from)} x2="138" y2={rowY(k)} stroke="currentColor" initial={false}
            animate={{ strokeOpacity: n >= 2 ? (best ? 1 : winner ? 0.12 : 0.4) : 0, strokeWidth: best ? 1.6 : 0.8 }} />
        );
      })}

      {/* ③ every way to build ABC: cost(sub-plan) + 100 */}
      {OPTIONS.map((o, k) => {
        const best = winner && o.id === "AC→B";
        return (
          <motion.g key={o.id} initial={false} animate={{ opacity: n >= 2 ? (winner && !best ? 0.3 : 1) : 0 }} transition={{ duration: 0.4 }}>
            <motion.rect x="139" y={rowY(k) - 8} width="79" height="16" rx="1.5" stroke="currentColor" initial={false}
              animate={{ fill: best ? "hsl(var(--primary) / 0.18)" : "hsl(var(--background) / 0)", strokeWidth: best ? 1.6 : 0.9 }} />
            <text x="143" y={rowY(k) + 2.4} fontSize="6.2" fontWeight="600" fill="currentColor" className="font-mono-math">{o.id}</text>
            <text x="215" y={rowY(k) + 2.4} textAnchor="end" fontSize="6.2" fill="currentColor" className="font-mono-math">
              {o.sum}={o.total}
            </text>
          </motion.g>
        );
      })}
      <motion.text x="178" y="98" textAnchor="middle" fontSize="6.3" fill="currentColor" className="font-mono-math" fontWeight="700" initial={false}
        animate={{ opacity: winner ? 1 : 0 }}>
        min = 150 ✓
      </motion.text>

      {/* the winning plan, drawn at the end: (A ⋈ C) ⋈ B */}
      <motion.g initial={false} animate={{ opacity: n >= 4 ? 1 : 0 }} transition={{ duration: 0.5 }}>
        <text x="4" y="112" fontSize="6.3" fill="currentColor" className="font-mono-math" opacity="0.8">④ plan</text>
        {[
          [110, 108, 82, 124], [110, 108, 140, 124], [82, 124, 62, 140], [82, 124, 102, 140],
        ].map(([x1, y1, x2, y2], i) => (
          <motion.line key={i} x1={x1} y1={y1 + 5} x2={x2} y2={y2 - 5} stroke="currentColor" strokeWidth="1.1"
            initial={false} animate={{ pathLength: n >= 4 ? 1 : 0 }} transition={{ duration: 0.6, delay: i * 0.12 }} />
        ))}
        {[
          { x: 110, y: 108, t: "⋈" }, { x: 82, y: 124, t: "⋈" }, { x: 140, y: 124, t: "B" }, { x: 62, y: 140, t: "A" }, { x: 102, y: 140, t: "C" },
        ].map((nd) => (
          <g key={`${nd.x}-${nd.y}`}>
            <rect x={nd.x - 9} y={nd.y - 5.5} width="18" height="11" rx="1.5" fill="transparent" stroke="currentColor" strokeWidth="1" />
            <text x={nd.x} y={nd.y + 2.5} textAnchor="middle" fontSize="7" fill="currentColor" className="font-mono-math">{nd.t}</text>
          </g>
        ))}
        <text x="160" y="112" fontSize="6.3" fill="currentColor" className="font-mono-math" fontWeight="600">cost 150</text>
        <text x="160" y="121" fontSize="5.8" fill="currentColor" className="font-mono-math" opacity="0.7">vs 600, 2100</text>
      </motion.g>
    </svg>
  );
};

/* ---------- AI: gradient descent on a 3D loss surface ---------- */

const GD_K = 9; // iterations
const GD_STEP = 0.85; // seconds per iteration
const GD_HOLD = 1.8;
const GD_ZS = 0.6;
const gdLoss = (x: number, y: number) => 0.35 * x * x + 1.3 * y * y;
const GD_PTS = (() => {
  // θ ← θ − η·g(θ), g = gradient of L: fast zig-zag across the steep y direction, slow slide along x
  const p: { x: number; y: number }[] = [];
  let x = -0.9, y = 0.78;
  for (let k = 0; k <= GD_K; k++) {
    p.push({ x, y });
    x -= 0.55 * 0.7 * x;
    y -= 0.55 * 2.6 * y;
  }
  return p;
})();

export const GradientDescentFigure = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const inView = useInView(ref, { margin: "-80px" });

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!inView || !canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = canvas.clientWidth, H = canvas.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const E = 0.78, cosE = Math.cos(E), sinE = Math.sin(E);
    const S = Math.min(W * 0.3, H * 0.29);
    const cx = W / 2, cy = H * 0.5;
    const N = 16;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let raf = 0;
    const ease = (u: number) => (u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2);

    const frame = (now: number) => {
      const C = ink.rgb;
      const t = reduce ? GD_K * GD_STEP : Math.max(0, now - start) / 1000;
      const cycle = GD_K * GD_STEP + GD_HOLD;
      const tc = t % cycle;
      const u = Math.min(GD_K, tc / GD_STEP);
      const k = Math.min(GD_K - 1, Math.floor(u));
      const f = u >= GD_K ? 1 : ease(u - k);
      const done = u >= GD_K;

      const yaw = Math.PI / 2 - 0.5 + 0.22 * Math.sin(t * 0.35);
      const cY = Math.cos(yaw), sY = Math.sin(yaw);
      const P = (x: number, y: number, z: number): [number, number, number] => {
        const x1 = x * cY - y * sY, y1 = x * sY + y * cY;
        return [cx + x1 * S, cy + S * 0.5 - (z * cosE + y1 * sinE) * S, y1];
      };
      const onSurf = (x: number, y: number) => P(x, y, gdLoss(x, y) * GD_ZS);
      const floor = (x: number, y: number) => P(x, y, 0);

      ctx.clearRect(0, 0, W, H);

      // the surface: shaded cells, painted from back to front
      const cells: { d: number; q: [number, number][]; h: number }[] = [];
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          const xs = [-1 + (2 * i) / N, -1 + (2 * (i + 1)) / N], ys = [-1 + (2 * j) / N, -1 + (2 * (j + 1)) / N];
          const c = [onSurf(xs[0], ys[0]), onSurf(xs[1], ys[0]), onSurf(xs[1], ys[1]), onSurf(xs[0], ys[1])];
          const h = gdLoss((xs[0] + xs[1]) / 2, (ys[0] + ys[1]) / 2) / 1.65;
          cells.push({ d: c.reduce((a, q) => a + q[2], 0), q: c.map((q) => [q[0], q[1]] as [number, number]), h });
        }
      }
      cells.sort((a, b) => b.d - a.d);
      ctx.lineWidth = 0.6;
      for (const c of cells) {
        ctx.beginPath();
        c.q.forEach(([X, Y], n) => (n ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y)));
        ctx.closePath();
        ctx.fillStyle = `rgba(${C},${0.03 + 0.2 * c.h})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(${C},${0.14 + 0.2 * c.h})`;
        ctx.stroke();
      }

      // level curves of L on the surface
      ctx.lineWidth = 1;
      for (const lv of [0.05, 0.12, 0.22, 0.33]) {
        ctx.beginPath();
        for (let n = 0; n <= 64; n++) {
          const a = (n / 64) * Math.PI * 2;
          const [X, Y] = onSurf(Math.sqrt(lv / 0.35) * Math.cos(a), Math.sqrt(lv / 1.3) * Math.sin(a));
          if (n) ctx.lineTo(X, Y); else ctx.moveTo(X, Y);
        }
        ctx.strokeStyle = `rgba(${C},0.45)`;
        ctx.stroke();
      }

      // the minimum
      const [mx, my] = onSurf(0, 0);
      ctx.beginPath(); ctx.arc(mx, my, 3.4, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${C},0.95)`; ctx.lineWidth = 1.3; ctx.stroke();

      // position of the point right now
      const a = GD_PTS[k], b = GD_PTS[k + 1];
      const cur = { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };

      // its shadow path on the parameter plane (the floor): what the algorithm really sees
      ctx.setLineDash([3, 3]);
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${C},0.5)`;
      ctx.beginPath();
      for (let n = 0; n <= k; n++) { const [X, Y] = floor(GD_PTS[n].x, GD_PTS[n].y); if (n) ctx.lineTo(X, Y); else ctx.moveTo(X, Y); }
      { const [X, Y] = floor(cur.x, cur.y); ctx.lineTo(X, Y); }
      ctx.stroke();
      ctx.setLineDash([]);

      // the trajectory on the surface, one segment per iteration
      const seg = (p0: { x: number; y: number }, p1: { x: number; y: number }, frac: number) => {
        for (let n = 0; n <= 10; n++) {
          const q = (n / 10) * frac;
          const [X, Y] = onSurf(p0.x + (p1.x - p0.x) * q, p0.y + (p1.y - p0.y) * q);
          if (n) ctx.lineTo(X, Y); else ctx.moveTo(X, Y);
        }
      };
      ctx.lineWidth = 2.2; ctx.lineCap = "round"; ctx.lineJoin = "round";
      ctx.strokeStyle = `rgba(${C},0.95)`;
      for (let n = 0; n < k; n++) { ctx.beginPath(); seg(GD_PTS[n], GD_PTS[n + 1], 1); ctx.stroke(); }
      ctx.beginPath(); seg(a, b, f); ctx.stroke();

      // iterates θ0, θ1, …
      ctx.font = `italic 500 ${Math.max(10, Math.round(W * 0.034))}px 'EB Garamond', Georgia, serif`;
      ctx.textAlign = "left";
      for (let n = 0; n <= (done ? GD_K : k); n++) {
        const [X, Y] = onSurf(GD_PTS[n].x, GD_PTS[n].y);
        ctx.beginPath(); ctx.arc(X, Y, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${C},1)`; ctx.fill();
        if (n <= 3 || n === GD_K) { ctx.fillStyle = `rgba(${C},0.9)`; ctx.fillText(`θ${n}`, X + 5, Y - 5); }
      }

      // vertical drop from the point to the plane
      const [bx, by] = onSurf(cur.x, cur.y);
      const [fx, fy] = floor(cur.x, cur.y);
      ctx.setLineDash([2, 3]);
      ctx.strokeStyle = `rgba(${C},0.7)`; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(fx, fy); ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath(); ctx.arc(fx, fy, 2.2, 0, Math.PI * 2); ctx.fillStyle = `rgba(${C},0.7)`; ctx.fill();

      // the step to come, as an arrow along −g (minus the gradient)
      if (!done && f < 0.2) {
        const fa = Math.min(1, (0.2 - f) / 0.12);
        const [ex, ey] = onSurf(a.x + (b.x - a.x) * 0.6, a.y + (b.y - a.y) * 0.6);
        const [sx, sy] = onSurf(a.x, a.y);
        ctx.strokeStyle = `rgba(${C},${0.9 * fa})`; ctx.fillStyle = `rgba(${C},${0.9 * fa})`; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();
        const ang = Math.atan2(ey - sy, ex - sx);
        ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex - 7 * Math.cos(ang - 0.4), ey - 7 * Math.sin(ang - 0.4)); ctx.lineTo(ex - 7 * Math.cos(ang + 0.4), ey - 7 * Math.sin(ang + 0.4)); ctx.closePath(); ctx.fill();
      }

      // the ball
      const g = ctx.createRadialGradient(bx, by, 0, bx, by, 13);
      g.addColorStop(0, `rgba(${C},0.85)`); g.addColorStop(1, `rgba(${C},0)`);
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(bx, by, 13, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = `rgba(${C},1)`; ctx.beginPath(); ctx.arc(bx, by, 3.8, 0, Math.PI * 2); ctx.fill();

      // readout
      ctx.textAlign = "left";
      ctx.font = `${Math.max(9, Math.round(W * 0.03))}px 'JetBrains Mono', monospace`;
      ctx.fillStyle = `rgba(${C},0.9)`;
      ctx.fillText(`k = ${done ? GD_K : k}`, 8, 16);
      ctx.fillStyle = `rgba(${C},0.7)`;
      ctx.fillText(`L(θ) = ${gdLoss(cur.x, cur.y).toFixed(3)}`, 8, 16 + Math.max(12, W * 0.04));
      ctx.textAlign = "center";
      ctx.fillStyle = `rgba(${C},0.85)`;
      ctx.fillText(done ? "converged ✓  θ ≈ argmin L" : "θₖ₊₁ = θₖ − η · g(θₖ)", W / 2, H - 5);

      if (!reduce) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    if (reduce) frame(performance.now());
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return <canvas ref={ref} className="block aspect-[220/160] w-full" role="img" aria-label="Gradient descent on a loss surface" />;
};

/* ---------- Applied math: SVD, a linear map sends the circle to an ellipse ---------- */

const A = { a: 1.45, b: 0.35, c: 0.55, d: 0.8 }; // matrix [[a, c], [b, d]]

const svd2 = () => {
  // eigen-decomposition of AᵀA gives the right singular vectors
  const p = A.a * A.a + A.b * A.b, q = A.a * A.c + A.b * A.d, r = A.c * A.c + A.d * A.d;
  const th = 0.5 * Math.atan2(2 * q, p - r);
  const v1: [number, number] = [Math.cos(th), Math.sin(th)];
  const v2: [number, number] = [-Math.sin(th), Math.cos(th)];
  const img = (v: [number, number]): [number, number] => [A.a * v[0] + A.c * v[1], A.b * v[0] + A.d * v[1]];
  return { v1, v2, u1: img(v1), u2: img(v2) };
};

export const SvdFigure = () => {
  const { ref, inView } = useLoopWhileVisible();
  const p = useMotionValue(0);
  const R = 34;
  const { v1, v2, u1, u2 } = useMemo(svd2, []);
  const transform = useTransform(p, (t) => `matrix(${1 + (A.a - 1) * t}, ${A.b * t}, ${A.c * t}, ${1 + (A.d - 1) * t}, 0, 0)`);
  const sigma = useTransform(p, (t) => (t > 0.5 ? 1 : 0));

  useEffect(() => {
    if (!inView) return;
    const c = animate(p, [0, 1, 1, 0, 0], { duration: 8, times: [0, 0.35, 0.62, 0.92, 1], ease: "easeInOut", repeat: Infinity });
    return () => c.stop();
  }, [inView, p]);

  const axis = (v: [number, number], color: string) => (
    <line x1={-v[0] * R} y1={-v[1] * R} x2={v[0] * R} y2={v[1] * R} stroke={color} strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
  );

  return (
    <svg ref={ref} viewBox="0 0 220 124" className="w-full text-primary" role="img" aria-label="Singular value decomposition">
      <g transform="translate(110 56)">
        <line x1="-100" y1="0" x2="100" y2="0" stroke="currentColor" strokeOpacity="0.25" strokeWidth="0.8" />
        <line x1="0" y1="-52" x2="0" y2="52" stroke="currentColor" strokeOpacity="0.25" strokeWidth="0.8" />
        <motion.g style={{ transform, transformOrigin: "0 0" }}>
          <circle r={R} fill="currentColor" fillOpacity="0.07" stroke="currentColor" strokeWidth="1.3" vectorEffect="non-scaling-stroke" />
          {axis(v1, "currentColor")}
          {axis(v2, "hsl(0 0% 5% / 0.55)")}
        </motion.g>
        <motion.text x={u1[0] * R + 5} y={u1[1] * R - 3} fontSize="9" fill="currentColor" className="font-mono-math" style={{ opacity: sigma }}>
          σ₁
        </motion.text>
        <motion.text x={u2[0] * R + 4} y={u2[1] * R + 9} fontSize="9" fill="currentColor" className="font-mono-math" style={{ opacity: sigma }}>
          σ₂
        </motion.text>
      </g>
      <text x="110" y="118" fontSize="8.5" textAnchor="middle" fill="currentColor" className="font-mono-math" opacity="0.85">
        A = UΣVᵀ
      </text>
    </svg>
  );
};

/* ---------- Databases: a relational schema, and a join walking the foreign keys ---------- */

const TABLES = [
  { id: "student", x: 4, title: "Student", rows: ["id  PK", "program_id  FK", "gpa"] },
  { id: "program", x: 79, title: "Program", rows: ["id  PK", "school_id  FK", "degree"] },
  { id: "school", x: 154, title: "School", rows: ["id  PK", "name", "city"] },
];

export const SchemaFigure = () => {
  const { ref, inView } = useLoopWhileVisible();
  const [s, setS] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setS((v) => (v + 1) % 6), 1000);
    return () => clearInterval(id);
  }, [inView]);

  const hot = (i: number) => s >= i + 1;
  return (
    <svg ref={ref} viewBox="0 0 220 142" className="w-full text-primary" role="img" aria-label="Relational schema">
      {[0, 1].map((i) => (
        <motion.path
          key={i}
          d={`M ${TABLES[i].x + 62} ${22 + 13 + 11 * 1 + 5.5} C ${TABLES[i].x + 70} ${51}, ${TABLES[i + 1].x - 8} ${40}, ${TABLES[i + 1].x} ${40.5}`}
          fill="none" stroke="currentColor" initial={false}
          animate={{ strokeOpacity: hot(i + 1) ? 1 : 0.35, strokeWidth: hot(i + 1) ? 1.6 : 0.9 }}
        />
      ))}
      {TABLES.map((t, i) => (
        <motion.g key={t.id} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.3 }} transition={{ delay: i * 0.15 }}>
          <motion.rect x={t.x} y="22" width="62" height="46" fill="transparent" stroke="currentColor" initial={false}
            animate={{ strokeWidth: hot(i) ? 1.6 : 0.9 }} />
          <motion.rect x={t.x} y="22" width="62" height="13" initial={false} fill="currentColor"
            animate={{ fillOpacity: hot(i) ? 0.35 : 0.14 }} />
          <text x={t.x + 31} y="31" textAnchor="middle" fontSize="7.5" fontWeight="600" fill="currentColor" className="font-mono-math">{t.title}</text>
          {t.rows.map((r, k) => (
            <text key={r} x={t.x + 4} y={35 + 11 * k + 8} fontSize="6.2" fill="currentColor" className="font-mono-math" opacity={r.includes("K") ? 1 : 0.7}>{r}</text>
          ))}
        </motion.g>
      ))}
      <text x="4" y="88" fontSize="7" fill="currentColor" className="font-mono-math" opacity="0.9">SELECT name, gpa</text>
      <text x="4" y="98" fontSize="7" fill="currentColor" className="font-mono-math" opacity="0.9">FROM Student ⋈ Program ⋈ School</text>
      <motion.text x="4" y="114" fontSize="7.2" fill="currentColor" className="font-mono-math" fontWeight="600" initial={false}
        animate={{ opacity: s >= 4 ? 1 : 0, x: s >= 4 ? 4 : -6 }}>
        → (Polytechnique Montréal, 3.89)
      </motion.text>
      <text x="110" y="136" fontSize="7.5" textAnchor="middle" fill="currentColor" className="font-mono-math" opacity="0.85">π_{"{name, gpa}"}(S ⋈ P ⋈ E)</text>
    </svg>
  );
};

/* ---------- Applied math: central limit theorem on a Galton board ---------- */

const BINS = 12;
const PMF = (() => {
  const c: number[] = [];
  let b = 1;
  for (let k = 0; k <= BINS; k++) {
    c.push(b);
    b = (b * (BINS - k)) / (k + 1);
  }
  return c.map((v) => v / 2 ** BINS);
})();

export const GaltonFigure = () => {
  const { ref, inView } = useLoopWhileVisible();
  const [counts, setCounts] = useState<number[]>(() => Array(BINS + 1).fill(0));

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setCounts((c) => {
        const total = c.reduce((a, b) => a + b, 0);
        if (total >= 240) return Array(BINS + 1).fill(0);
        let k = 0;
        for (let i = 0; i < BINS; i++) k += Math.random() < 0.5 ? 1 : 0;
        const n = [...c];
        n[k]++;
        return n;
      });
    }, 45);
    return () => clearInterval(id);
  }, [inView]);

  const total = counts.reduce((a, b) => a + b, 0);
  const x = (k: number) => 24 + k * 14;
  const H = 1.5;
  const curve = PMF.map((p, k) => `${k ? "L" : "M"} ${x(k) + 5} ${(108 - Math.max(total, 40) * p * H).toFixed(1)}`).join(" ");

  return (
    <svg ref={ref} viewBox="0 0 220 142" className="w-full text-primary" role="img" aria-label="Central limit theorem">
      <line x1="16" y1="108" x2="206" y2="108" stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.8" />
      {counts.map((c, k) => (
        <rect key={k} x={x(k)} y={108 - c * H} width="10" height={c * H} fill="currentColor" fillOpacity="0.55" />
      ))}
      <path d={curve} fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" opacity="0.8" />
      <text x="204" y="22" textAnchor="end" fontSize="7.5" fill="currentColor" className="font-mono-math" opacity="0.85">n = {total}</text>
      <text x="110" y="124" textAnchor="middle" fontSize="7" fill="currentColor" className="font-mono-math" opacity="0.65">X = ΣBernoulli(½)</text>
      <text x="110" y="136" textAnchor="middle" fontSize="7.5" fill="currentColor" className="font-mono-math" opacity="0.85">(X − μ)/σ → 𝒩(0, 1)</text>
    </svg>
  );
};

/* ---------- AI: self-attention weights ---------- */

const TOK = ["we", "query", "data", "to", "learn"];
const ATT = TOK.map((_, i) => {
  const e = TOK.map((__, j) => Math.exp(2.2 * Math.sin(i * 1.9 + j * 2.7 + 0.5) + (i === j ? 1.4 : 0) + (Math.abs(i - j) === 1 ? 0.6 : 0)));
  const sum = e.reduce((a, b) => a + b, 0);
  return e.map((v) => v / sum);
});

export const AttentionFigure = () => {
  const { ref, inView } = useLoopWhileVisible();
  const [row, setRow] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setRow((v) => (v + 1) % TOK.length), 1200);
    return () => clearInterval(id);
  }, [inView]);

  const cell = 20, ox = 78, oy = 24;
  return (
    <svg ref={ref} viewBox="0 0 220 142" className="w-full text-primary" role="img" aria-label="Self-attention weights">
      {TOK.map((t, j) => (
        <text key={`c${t}`} x={ox + j * cell + cell / 2} y={oy - 5} textAnchor="middle" fontSize="6" fill="currentColor" className="font-mono-math" opacity="0.75">{t}</text>
      ))}
      {TOK.map((t, i) => (
        <text key={`r${t}`} x={ox - 5} y={oy + i * cell + cell / 2 + 2} textAnchor="end" fontSize="6.5" fill="currentColor" className="font-mono-math" opacity={i === row ? 1 : 0.6} fontWeight={i === row ? 700 : 400}>{t}</text>
      ))}
      {ATT.map((r, i) =>
        r.map((w, j) => (
          <motion.rect
            key={`${i}-${j}`} x={ox + j * cell + 1} y={oy + i * cell + 1} width={cell - 2} height={cell - 2} fill="currentColor"
            initial={{ fillOpacity: 0 }} whileInView={{ fillOpacity: 0.06 + w * 1.3 }} viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.15 + i * 0.1 + j * 0.05, duration: 0.6 }}
          />
        )),
      )}
      <motion.rect x={ox - 1} width={cell * TOK.length + 2} height={cell} fill="none" stroke="currentColor" strokeWidth="1.4" initial={false}
        animate={{ y: oy + row * cell }} transition={{ type: "spring", stiffness: 220, damping: 22 }} />
      {ATT[row].map((w, j) => (
        <text key={j} x={ox + j * cell + cell / 2} y={oy + row * cell + cell / 2 + 2.4} textAnchor="middle" fontSize="6.2" fill="hsl(var(--foreground))" className="font-mono-math">
          {Math.round(w * 100)}
        </text>
      ))}
      <text x="110" y="136" textAnchor="middle" fontSize="7.5" fill="currentColor" className="font-mono-math" opacity="0.85">softmax(QKᵀ/√dₖ)V</text>
    </svg>
  );
};
