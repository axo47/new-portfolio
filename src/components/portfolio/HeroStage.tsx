import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useVisible } from "@/hooks/useVisible";
import { useLang } from "@/hooks/useLang";
import { ink } from "@/lib/palette";
import { cn } from "@/lib/utils";
import { ui, type L } from "@/data/content";

/**
 * Foreground scenes, each in its own section:
 *   - introduction: a manifold (torus → sphere → saddle → Möbius) with a chart, a tangent plane and moving letters
 *   - databases: a SQL query going through the compiler: tokens → AST → logical plan → optimizer → physical plan
 *   - AI: a neural network, forward pass then backpropagation
 */

/** A framed figure that mounts its scene only while it is on screen, so each scene starts fresh when you arrive. */
export const StageFrame = ({ n, caption, children }: { n: number; caption: string; children: ReactNode }) => {
  const [ref, inView] = useVisible<HTMLElement>({ amount: 0.15, top: 40, bottom: 40 });

  return (
    <figure ref={ref} className="m-0 w-full">
      <div className="relative aspect-square w-full border border-border">
        {/* corner ticks, like a figure on graph paper */}
        {["left-0 top-0", "right-0 top-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos) => (
          <span key={pos} className={cn("absolute h-2.5 w-2.5 border-primary/60", pos, pos.includes("top") ? "border-t" : "border-b", pos.includes("left") ? "border-l" : "border-r")} />
        ))}
        <AnimatePresence>
          {inView && (
            <motion.div
              key="scene"
              className="absolute inset-0"
              initial={{ opacity: 0, filter: "blur(10px)", scale: 0.985 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <figcaption className="font-mono-math mt-3 text-center text-sm leading-relaxed text-muted-foreground">
        <span className="citation-number mr-1.5">Fig. {n}</span>
        {caption}
      </figcaption>
    </figure>
  );
};

const CAPTIONS: Record<"ai" | "sql" | "manifold", L<string>> = {
  manifold: {
    fr: "Variété différentiable.",
    en: "Smooth manifold.",
  },
  ai: {
    fr: "Un réseau de neurones : propagation avant, puis rétropropagation du gradient.",
    en: "A neural network: forward pass, then backpropagation of the gradient.",
  },
  sql: {
    fr: "Compilation d'une requête SQL : lexer, AST, plan logique, optimiseur, plan physique.",
    en: "Compiling a SQL query: lexer, AST, logical plan, optimizer, physical plan.",
  },
};


/** Introduction: one manifold, calm and on its own. */
export const ManifoldStage = ({ n }: { n: number }) => {
  const { t } = useLang();
  return (
    <StageFrame n={n} caption={t(CAPTIONS.manifold)}>
      <ManifoldScene />
    </StageFrame>
  );
};

/** AI section: a neural network, forward and backward. */
export const NeuralStage = ({ n }: { n: number }) => {
  const { t } = useLang();
  return (
    <StageFrame n={n} caption={t(CAPTIONS.ai)}>
      <NeuralScene />
    </StageFrame>
  );
};

/** Databases section: a SQL query going through the compiler. */
export const QueryStage = ({ n }: { n: number }) => {
  const { t } = useLang();
  return (
    <StageFrame n={n} caption={t(CAPTIONS.sql)}>
      <QueryScene />
    </StageFrame>
  );
};

/* ===================== Scene 1: manifold ===================== */

const TAU = Math.PI * 2;
const NU = 40;
const NV = 24;
const ELEV = 0.95;
const TRAIL = 80;
const HOLD = 2700; // ms per shape

type V3 = [number, number, number];
type Surf = (u: number, v: number) => V3;

const SHAPES: { name: string; f: Surf }[] = [
  {
    name: "M ≅ T²",
    f: (u, v) => {
      const R = 0.7, r = 0.3;
      return [(R + r * Math.cos(v)) * Math.cos(u), (R + r * Math.cos(v)) * Math.sin(u), r * Math.sin(v)];
    },
  },
  {
    name: "M ≅ S²",
    f: (u, v) => {
      const w = v / 2 - Math.PI / 2;
      return [0.95 * Math.cos(w) * Math.cos(u), 0.95 * Math.cos(w) * Math.sin(u), 0.95 * Math.sin(w)];
    },
  },
  {
    name: "M : z = ρ² cos 2θ",
    f: (u, v) => {
      const rho = (v / TAU) * 1.05;
      return [rho * Math.cos(u), rho * Math.sin(u), 0.7 * rho * rho * Math.cos(2 * u)];
    },
  },
  {
    name: "M = Möbius",
    f: (u, v) => {
      const t = (v / TAU - 0.5) * 0.9;
      const a = 0.78 + t * Math.cos(u / 2);
      return [a * Math.cos(u), a * Math.sin(u), t * Math.sin(u / 2)];
    },
  },
];

const smooth = (x: number) => x * x * (3 - 2 * x);

const ManifoldScene = () => {
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = box.current, cv = canvas.current;
    const ctx = cv?.getContext("2d");
    if (!el || !cv || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, raf = 0;
    const start = performance.now();
    const cosE = Math.cos(ELEV), sinE = Math.sin(ELEV);
    const B = 4;
    const buf = Array.from({ length: B }, () => new Float32Array(4 * (NU + 2) * (NV + 2) * 2));
    const cnt = new Array(B).fill(0);

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
      const t = reduce ? 4 : Math.max(0, now - start) / 1000;
      const C = ink.rgb;
      const U = Math.min(W, H);
      const S = U * 0.4;
      const cx = W / 2, cy = H * 0.5;
      const k = (t * 1000) / HOLD;
      const i0 = Math.floor(k) % SHAPES.length;
      const frac = k - Math.floor(k);
      const f = smooth(Math.min(1, Math.max(0, (frac - 0.4) / 0.6)));
      const sa = SHAPES[i0].f, sb = SHAPES[(i0 + 1) % SHAPES.length].f;
      const surf: Surf = (u, v) => {
        const a = sa(u, v), b = sb(u, v);
        return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
      };
      const yaw = t * 0.22;
      const cY = Math.cos(yaw), sY = Math.sin(yaw);
      const proj = (p: V3): [number, number, number] => {
        const x1 = p[0] * cY - p[1] * sY, y1 = p[0] * sY + p[1] * cY;
        return [cx + x1 * S, cy - (p[2] * cosE + y1 * sinE) * S, -(y1 * cosE - p[2] * sinE)];
      };

      ctx.clearRect(0, 0, W, H);

      // mesh
      const grid: [number, number, number][][] = [];
      for (let i = 0; i <= NU; i++) {
        const col: [number, number, number][] = [];
        for (let j = 0; j <= NV; j++) col.push(proj(surf((i / NU) * TAU, (j / NV) * TAU)));
        grid.push(col);
      }
      cnt.fill(0);
      const push = (a: [number, number, number], b: [number, number, number]) => {
        const kk = Math.min(B - 1, Math.max(0, Math.floor((((a[2] + b[2]) / 2 + 1.3) / 2.6) * B)));
        const o = cnt[kk], arr = buf[kk];
        arr[o] = a[0]; arr[o + 1] = a[1]; arr[o + 2] = b[0]; arr[o + 3] = b[1];
        cnt[kk] += 4;
      };
      for (let j = 0; j <= NV; j++) for (let i = 0; i < NU; i++) push(grid[i][j], grid[i + 1][j]);
      for (let i = 0; i <= NU; i += 2) for (let j = 0; j < NV; j++) push(grid[i][j], grid[i][j + 1]);
      ctx.lineWidth = 0.8;
      for (let kk = 0; kk < B; kk++) {
        ctx.strokeStyle = `rgba(${C},${0.1 + 0.4 * (kk / (B - 1)) ** 1.2})`;
        ctx.beginPath();
        const arr = buf[kk];
        for (let o = 0; o < cnt[kk]; o += 4) { ctx.moveTo(arr[o], arr[o + 1]); ctx.lineTo(arr[o + 2], arr[o + 3]); }
        ctx.stroke();
      }

      // curve, head and tangent plane
      // u grows without wrapping and v swings smoothly inside the interior of every shape, so the point never jumps
      const uv = (tt: number): [number, number] => [tt * 0.45, TAU * (0.5 + 0.38 * Math.sin(tt * 0.7))];
      ctx.lineWidth = 1.7; ctx.lineCap = "round";
      let prev: [number, number, number] | null = null;
      for (let kk = TRAIL; kk >= 0; kk--) {
        const [u, v] = uv(t - kk * 0.05 + 4);
        const p = proj(surf(u, v));
        if (prev) {
          ctx.strokeStyle = `rgba(${C},${0.15 + 0.85 * (1 - kk / TRAIL)})`;
          ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(p[0], p[1]); ctx.stroke();
        }
        prev = p;
      }
      const [hu, hv] = uv(t + 4);
      const P = surf(hu, hv), eps = 0.01;
      const Pu = surf(hu + eps, hv), Pv = surf(hu, hv + eps);
      const du = [Pu[0] - P[0], Pu[1] - P[1], Pu[2] - P[2]], dv = [Pv[0] - P[0], Pv[1] - P[1], Pv[2] - P[2]];
      const nu = Math.hypot(du[0], du[1], du[2]) || 1, nv = Math.hypot(dv[0], dv[1], dv[2]) || 1;
      const a = 0.22;
      const corner = (su: number, sv: number): V3 => [
        P[0] + (su * a * du[0]) / nu + (sv * a * dv[0]) / nv,
        P[1] + (su * a * du[1]) / nu + (sv * a * dv[1]) / nv,
        P[2] + (su * a * du[2]) / nu + (sv * a * dv[2]) / nv,
      ];
      const quad = [corner(-1, -1), corner(1, -1), corner(1, 1), corner(-1, 1)].map(proj);
      ctx.beginPath();
      quad.forEach((q, ii) => (ii ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])));
      ctx.closePath();
      ctx.fillStyle = `rgba(${C},0.16)`; ctx.fill();
      ctx.lineWidth = 1; ctx.strokeStyle = `rgba(${C},0.6)`; ctx.stroke();
      const hp = proj(P);
      const g = ctx.createRadialGradient(hp[0], hp[1], 0, hp[0], hp[1], 16);
      g.addColorStop(0, `rgba(${C},0.9)`); g.addColorStop(1, `rgba(${C},0)`);
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(hp[0], hp[1], 16, 0, TAU); ctx.fill();
      ctx.fillStyle = `rgba(${C},1)`; ctx.beginPath(); ctx.arc(hp[0], hp[1], 3, 0, TAU); ctx.fill();

      // title
      ctx.textAlign = "center";
      ctx.font = `italic 500 ${Math.round(U * 0.055)}px 'EB Garamond', Georgia, serif`;
      ctx.fillStyle = `rgba(${C},0.9)`;
      ctx.fillText(SHAPES[f < 0.5 ? i0 : (i0 + 1) % SHAPES.length].name, cx, H * 0.08);

      if (!reduce) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <div ref={box} className="absolute inset-0">
      <canvas ref={canvas} aria-label="A manifold" role="img" />
    </div>
  );
};

/* ===================== Scene 2: neural network ===================== */

const LAYERS = [3, 5, 5, 2];
const LX = [64, 156, 248, 340];
const ly = (l: number, i: number) => 176 + (i - (LAYERS[l] - 1) / 2) * 50;

const NeuralScene = () => {
  const [ph, setPh] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPh((v) => (v + 1) % 9), 800);
    return () => clearInterval(id);
  }, []);

  // phases: 0 idle · 1-3 forward through layers 1-3 · 4 output · 5-7 backward · 8 update
  const fwd = ph >= 1 && ph <= 3 ? ph : 0;
  const bwd = ph >= 5 && ph <= 7 ? 8 - ph : 0; // edge-layer index being back-propagated: 3,2,1
  const litLayer = ph === 0 ? 0 : ph <= 4 ? Math.min(ph, 3) : 3 - (ph - 5);
  const text =
    ph === 0 ? "x ∈ ℝ³" :
    ph <= 3 ? `h${["¹", "²", "ŷ"][ph - 1]} = σ(W${["¹", "²", "³"][ph - 1]}h + b)` :
    ph === 4 ? "ŷ = softmax(z),  L = −Σ y log ŷ" :
    ph <= 7 ? `∂L/∂W${["³", "²", "¹"][ph - 5]} = δ hᵀ` : "θ ← θ − η∇L(θ)";

  const edges: { l: number; a: number; b: number }[] = [];
  for (let l = 0; l < 3; l++) for (let a = 0; a < LAYERS[l]; a++) for (let b = 0; b < LAYERS[l + 1]; b++) edges.push({ l, a, b });

  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full text-primary">
      <text x="200" y="32" textAnchor="middle" fontSize="17" fontStyle="italic" fill="currentColor" className="font-academic">
        {ph >= 5 && ph <= 7 ? "backpropagation" : "forward pass"}
      </text>
      {edges.map(({ l, a, b }) => {
        const f = fwd === l + 1, bk = bwd === l + 1;
        const x1 = LX[l], y1 = ly(l, a), x2 = LX[l + 1], y2 = ly(l + 1, b);
        return (
          <g key={`${l}-${a}-${b}`}>
            <motion.line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" initial={false}
              animate={{ strokeOpacity: f || bk ? 0.85 : 0.16, strokeWidth: f || bk ? 1.4 : 0.8 }} transition={{ duration: 0.3 }} />
            {(f || bk) && (
              <motion.circle key={ph} r="2.6" fill="currentColor"
                initial={{ cx: bk ? x2 : x1, cy: bk ? y2 : y1, opacity: 1 }}
                animate={{ cx: bk ? x1 : x2, cy: bk ? y1 : y2, opacity: [1, 1, 0] }}
                transition={{ duration: 0.7, delay: (a + b) * 0.012, ease: "easeInOut" }} />
            )}
          </g>
        );
      })}
      {LAYERS.map((n, l) =>
        Array.from({ length: n }, (_, i) => {
          const on = l <= litLayer && ph > 0 && (ph <= 4 || l >= litLayer);
          return (
            <motion.circle key={`${l}-${i}`} cx={LX[l]} cy={ly(l, i)} r="11" stroke="currentColor" strokeWidth="1.3"
              initial={false}
              animate={{ fill: on ? "hsl(var(--primary) / 0.85)" : "hsl(var(--background) / 0)" }} transition={{ duration: 0.3 }} />
          );
        }),
      )}
      {["x₁", "x₂", "x₃"].map((s, i) => (
        <text key={s} x={LX[0] - 22} y={ly(0, i) + 4} textAnchor="end" fontSize="13" fontStyle="italic" fill="currentColor" className="font-academic">{s}</text>
      ))}
      {["ŷ₁", "ŷ₂"].map((s, i) => (
        <text key={s} x={LX[3] + 20} y={ly(3, i) + 4} fontSize="13" fontStyle="italic" fill="currentColor" className="font-academic">{s}</text>
      ))}
      {[0.7, 0.3].map((v, i) => (
        <motion.rect key={i} x={LX[3] + 38} y={ly(3, i) - 4} height="8" fill="currentColor" fillOpacity="0.7" initial={false}
          animate={{ width: ph >= 4 ? v * 30 : 0 }} transition={{ duration: 0.5 }} />
      ))}
      {["W¹", "W²", "W³"].map((s, l) => (
        <text key={s} x={(LX[l] + LX[l + 1]) / 2} y="300" textAnchor="middle" fontSize="13" fontStyle="italic" fill="currentColor" opacity="0.7" className="font-academic">{s}</text>
      ))}
      {/* loss curve */}
      <g transform="translate(40 318)">
        <line x1="0" y1="56" x2="120" y2="56" stroke="currentColor" strokeOpacity="0.3" />
        <line x1="0" y1="0" x2="0" y2="56" stroke="currentColor" strokeOpacity="0.3" />
        <motion.path d="M 0 6 C 20 8, 30 40, 60 46 S 100 52, 120 53" fill="none" stroke="currentColor" strokeWidth="1.6"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 6, ease: "easeOut" }} />
        <text x="124" y="52" fontSize="10" fill="currentColor" className="font-mono-math" opacity="0.7">L</text>
      </g>
      <text x="250" y="392" textAnchor="middle" fontSize="11.5" fill="currentColor" className="font-mono-math">{text}</text>
    </svg>
  );
};

/* ===================== Scene 3: SQL compilation ===================== */

const SQL_LINES: [string, boolean][][] = [
  [["SELECT", true], [" c.name, ", false], ["SUM", true], ["(o.total)", false]],
  [["FROM", true], [" customers c ", false], ["JOIN", true], [" orders o", false]],
  [["  ON", true], [" o.cid = c.id", false]],
  [["WHERE", true], [" o.year = 2026", false]],
  [["GROUP BY", true], [" c.name;", false]],
];
const TOKENS: [string, "kw" | "id" | "num" | "op"][] = [
  ["SELECT", "kw"], ["c.name", "id"], [",", "op"], ["SUM", "kw"], ["(", "op"], ["o.total", "id"], [")", "op"],
  ["FROM", "kw"], ["customers", "id"], ["c", "id"], ["JOIN", "kw"], ["orders", "id"], ["o", "id"], ["ON", "kw"],
  ["o.cid", "id"], ["=", "op"], ["c.id", "id"], ["WHERE", "kw"], ["o.year", "id"], ["=", "op"], ["2026", "num"],
  ["GROUP BY", "kw"], ["c.name", "id"],
];
const STAGES = ["Lexer", "Parser", "Logical", "Optimizer", "Physical"];

type PN = { id: string; x: number; y: number; logical: string; physical: string };
const planNodes = (opt: boolean): PN[] => [
  { id: "p", x: 200, y: 22, logical: "π name, sum", physical: "Project" },
  { id: "g", x: 200, y: 66, logical: "γ name; SUM(total)", physical: "HashAggregate" },
  opt ? { id: "j", x: 200, y: 112, logical: "⋈ cid = id", physical: "HashJoin" } : { id: "s", x: 200, y: 112, logical: "σ year = 2026", physical: "Filter" },
  opt ? { id: "s", x: 288, y: 160, logical: "σ year = 2026", physical: "Filter" } : { id: "j", x: 200, y: 158, logical: "⋈ cid = id", physical: "HashJoin" },
  { id: "c", x: 112, y: 208, logical: "customers", physical: "SeqScan customers" },
  { id: "o", x: 288, y: 208, logical: "orders", physical: "SeqScan orders" },
];
const planEdges = (opt: boolean): [string, string][] =>
  opt ? [["p", "g"], ["g", "j"], ["j", "c"], ["j", "s"], ["s", "o"]] : [["p", "g"], ["g", "s"], ["s", "j"], ["j", "c"], ["j", "o"]];

const QueryScene = () => {
  const [st, setSt] = useState(0);
  // each stage is shown long enough to read; once the physical plan has been seen, the cycle starts over quickly
  const STAGE_MS = [2000, 2200, 2200, 2600, 1500];
  useEffect(() => {
    const id = setTimeout(() => setSt((v) => (v >= 4 ? 0 : v + 1)), STAGE_MS[Math.min(4, st)]);
    return () => clearTimeout(id);
  }, [st]);
  const stage = Math.min(4, st);
  const opt = stage >= 3;
  const nodes = planNodes(opt);
  const pos = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const note = ["tokens", "abstract syntax tree", "π( γ( σ( customers ⋈ orders ) ) )", "σ pushed below ⋈: fewer rows to join", "HashJoin(build = customers, probe = σ(orders))"][stage];

  return (
    <div className="absolute inset-0 flex flex-col gap-3 p-4 text-primary">
      <div className="font-mono-math flex flex-wrap items-center gap-1 text-[9px]">
        {STAGES.map((s, i) => (
          <span key={s} className="flex items-center gap-1">
            <span className={cn("rounded-sm border px-1.5 py-0.5 transition-colors duration-300", i === stage ? "border-primary bg-primary text-primary-foreground" : i < stage ? "border-primary/40 bg-primary/10" : "border-border text-muted-foreground")}>{s}</span>
            {i < STAGES.length - 1 && <span className="text-muted-foreground">→</span>}
          </span>
        ))}
      </div>

      <div className="font-mono-math border border-border p-2 text-[10.5px] leading-[1.5] text-foreground">
        {SQL_LINES.map((line, r) => (
          <motion.div key={r} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + r * 0.22 }} className="whitespace-pre">
            {line.map(([txt, kw], k) => (
              <span key={k} className={kw ? "font-medium text-primary" : ""}>{txt}</span>
            ))}
          </motion.div>
        ))}
      </div>

      <div className="relative min-h-0 flex-1">
        <AnimatePresence mode="wait">
          {stage === 0 && (
            <motion.div key="tok" className="font-mono-math flex flex-wrap content-start gap-1 text-[10px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {TOKENS.map(([tk, ty], i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 6, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: i * 0.045 }}
                  className={cn("rounded-sm border px-1.5 py-0.5", ty === "kw" ? "border-primary/50 bg-primary/10 text-primary" : ty === "num" ? "border-foreground/30 bg-foreground/5" : ty === "op" ? "border-border text-muted-foreground" : "border-border bg-background")}>
                  {tk}
                </motion.span>
              ))}
            </motion.div>
          )}
          {stage === 1 && <motion.div key="ast" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Ast /></motion.div>}
          {stage >= 2 && (
            <motion.svg key="plan" viewBox="0 0 400 236" className="absolute inset-0 h-full w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {planEdges(opt).map(([a, b]) => (
                <motion.line key={`${a}${b}`} stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.3" initial={false}
                  animate={{ x1: pos[a].x, y1: pos[a].y + 13, x2: pos[b].x, y2: pos[b].y - 13 }} transition={{ duration: 0.8, ease: "easeInOut" }} />
              ))}
              {nodes.map((n) => (
                <motion.g key={n.id} initial={false} animate={{ x: n.x, y: n.y }} transition={{ duration: 0.8, ease: "easeInOut" }}>
                  <motion.rect x="-66" y="-13" width="132" height="26" rx="2" strokeWidth="1.3" stroke="currentColor" initial={false}
                    animate={{ fill: n.id === "s" && opt ? "hsl(var(--primary) / 0.2)" : "hsl(var(--background) / 0)" }} />
                  <AnimatePresence mode="wait">
                    <motion.text key={stage >= 4 ? "ph" : "lg"} textAnchor="middle" y="4" fontSize="10.5" fill="currentColor" className="font-mono-math"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                      {stage >= 4 ? n.physical : n.logical}
                    </motion.text>
                  </AnimatePresence>
                </motion.g>
              ))}
            </motion.svg>
          )}
        </AnimatePresence>
      </div>
      <div className="font-mono-math text-[10.5px] text-foreground/80">{note}</div>
    </div>
  );
};

type AstTree = { label: string; children: { label: string; children: string[] }[] };
const AST: AstTree = {
  label: "SelectStmt",
  children: [
    { label: "Projection", children: ["c.name", "SUM(total)"] },
    { label: "Join", children: ["customers", "orders"] },
    { label: "Where", children: ["year = 2026"] },
    { label: "GroupBy", children: ["c.name"] },
  ],
};

const boxW = (label: string) => label.length * 5.7 + 12;

/** The syntax tree, laid out from its leaves so that nothing overlaps, using the full height of the scene. */
const Ast = () => {
  const GAP = 8;
  const leaves = AST.children.flatMap((c) => c.children);
  const total = leaves.reduce((acc, l) => acc + boxW(l), 0) + GAP * (leaves.length - 1);
  const W = Math.max(420, total + 16);
  let x = (W - total) / 2;
  const centers = new Map<string, number>();
  let idx = 0;
  const mids = AST.children.map((c) => {
    const xs = c.children.map((l) => {
      const w = boxW(l);
      const cx = x + w / 2;
      x += w + GAP;
      centers.set(`${idx++}`, cx);
      return cx;
    });
    return { label: c.label, cx: (xs[0] + xs[xs.length - 1]) / 2, kids: c.children.map((l, k) => ({ label: l, cx: xs[k] })) };
  });
  const rootX = (mids[0].cx + mids[mids.length - 1].cx) / 2;
  const Y = [34, 118, 202];

  const node = (label: string, cx: number, y: number, delay: number, strong = false) => (
    <motion.g key={`${label}-${cx}`} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} style={{ transformOrigin: `${cx}px ${y}px` }}
      transition={{ delay, type: "spring", stiffness: 260, damping: 18 }}>
      <rect x={cx - boxW(label) / 2} y={y - 12} width={boxW(label)} height="24" rx="2" fill={strong ? "hsl(var(--primary) / 0.12)" : "hsl(var(--background) / 0)"} stroke="currentColor" strokeWidth={strong ? 1.4 : 1} />
      <text x={cx} y={y + 3.6} textAnchor="middle" fontSize="9.5" fill="currentColor" className="font-mono-math">{label}</text>
    </motion.g>
  );
  const edge = (x1: number, y1: number, x2: number, y2: number, delay: number) => (
    <motion.line key={`${x1}-${y1}-${x2}-${y2}`} x1={x1} y1={y1 + 12} x2={x2} y2={y2 - 12} stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay }} />
  );

  return (
    <svg viewBox={`0 0 ${W} 236`} className="h-full w-full">
      {mids.map((m, i) => edge(rootX, Y[0], m.cx, Y[1], 0.1 + i * 0.1))}
      {mids.flatMap((m, i) => m.kids.map((k, j) => edge(m.cx, Y[1], k.cx, Y[2], 0.4 + i * 0.1 + j * 0.05)))}
      {node(AST.label, rootX, Y[0], 0, true)}
      {mids.map((m, i) => node(m.label, m.cx, Y[1], 0.2 + i * 0.1))}
      {mids.flatMap((m, i) => m.kids.map((k, j) => node(k.label, k.cx, Y[2], 0.5 + i * 0.1 + j * 0.06)))}
    </svg>
  );
};

/* ===================== Intro scene: a cache on a 3D hash table ===================== */
