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
      <figcaption className="font-mono-math mt-3 text-[11px] leading-relaxed text-muted-foreground">
        <span className="citation-number mr-1.5">Fig. {n}</span>
        {caption}
      </figcaption>
    </figure>
  );
};

const CAPTIONS: Record<"ai" | "sql", L<string>> = {
  ai: {
    fr: "Un réseau de neurones : propagation avant, puis rétropropagation du gradient.",
    en: "A neural network: forward pass, then backpropagation of the gradient.",
  },
  sql: {
    fr: "Compilation d'une requête SQL : lexer, AST, plan logique, optimiseur, plan physique.",
    en: "Compiling a SQL query: lexer, AST, logical plan, optimizer, physical plan.",
  },
};

/** Introduction: the space split in three, databases | mathematics | AI, each running its own scene. */
export const TriStage = ({ n }: { n: number }) => {
  const { t } = useLang();
  const [ref, inView] = useVisible<HTMLElement>({ amount: 0.15, top: 40, bottom: 40 });
  const cells = [HashScene, LlmScene, ManifoldScene, ScheduleScene];

  return (
    <figure ref={ref} className="m-0 mx-auto w-full max-w-3xl xl:max-w-none">
      <div className="relative border border-border xl:h-[clamp(440px,calc(100svh-11rem),800px)]">
        {["left-0 top-0", "right-0 top-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos) => (
          <span key={pos} className={cn("absolute z-10 h-2.5 w-2.5 border-primary/60", pos, pos.includes("top") ? "border-t" : "border-b", pos.includes("left") ? "border-l" : "border-r")} />
        ))}
        {/* a light that keeps sweeping across the fields */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px overflow-hidden">
          <motion.span
            className="block h-px w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="grid sm:grid-cols-2 xl:h-full xl:grid-rows-[minmax(0,1.35fr)_minmax(0,1fr)]">
          {cells.map((Scene, i) => (
            <div key={i} className={cn("relative flex min-h-0 flex-col", i > 0 && "border-t border-dashed border-border",
                i === 1 && "sm:border-l sm:border-t-0",
                i === 3 && "sm:border-l")}>
              <div className="font-mono-math flex items-center justify-between px-4 pb-1 pt-2.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                <span>
                  <span className="mr-2 text-primary">0{i + 1}</span>
                  <span className="text-foreground">{t(ui.hero.tri[i].name)}</span>
                  
                </span>
                {i === 0 && (
                  <motion.span className="text-primary" animate={{ x: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.5 }}>
                    →
                  </motion.span>
                )}
              </div>
              <div className={cn("relative w-full sm:aspect-square", ["aspect-[4/5]", "aspect-[5/6]", "aspect-square", "aspect-[6/5]"][i], "xl:aspect-auto xl:min-h-0 xl:flex-1")}>
                <AnimatePresence>
                  {inView && (
                    <motion.div
                      key="scene"
                      className="absolute inset-0"
                      initial={{ opacity: 0, filter: "blur(10px)", scale: 0.985 }}
                      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, delay: i * 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Scene />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="font-mono-math mt-3 text-[11px] leading-relaxed text-muted-foreground">
        <span className="citation-number mr-1.5">Fig. {n}</span>
        {t(ui.hero.triCaption)}{" "}
        <a
          href="https://www.cidrdb.org/cidr2022/papers/p18-flachs.pdf"
          target="_blank"
          rel="noreferrer"
          className="underline decoration-primary/40 underline-offset-2 transition-colors hover:text-primary"
        >
          {t({ fr: "Table de hachage d'après", en: "Hash table after" })} Flachs, Müller &amp; Moerkotte, « The 3D Hash Join », CIDR 2022
        </a>
        .
      </figcaption>
    </figure>
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

/** AI section: a neural network, forward and backward. */
export const NeuralStage = ({ n }: { n: number }) => {
  const { t } = useLang();
  return (
    <StageFrame n={n} caption={t(CAPTIONS.ai)}>
      <NeuralScene />
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

// After Flachs, Müller & Moerkotte, "The 3D Hash Join", CIDR 2022: the hash directory points to a main chain of
// *distinct* keys; each main node owns a sub chain with every tuple that has that key.
const HT_MAIN = [
  { k: "k₂", cx: 90, subs: ["v₂₁", "v₂₂"] },
  { k: "k₃", cx: 162, subs: ["v₃₁", "v₃₂", "v₃₃"] },
];
type HtEvent =
  | { t: "probe" }
  | { t: "hash" }
  | { t: "visit"; i: number; match: boolean }
  | { t: "emit"; i: number; j: number }
  | { t: "done" };

const htEvents = (target: number): HtEvent[] => [
  { t: "probe" },
  { t: "hash" },
  ...HT_MAIN.slice(0, target + 1).map((_, i): HtEvent => ({ t: "visit", i, match: i === target })),
  ...HT_MAIN[target].subs.map((_, j): HtEvent => ({ t: "emit", i: target, j })),
  { t: "done" },
];

const HashScene = () => {
  const [target, setTarget] = useState(1);
  const [tick, setTick] = useState(0);
  const events = htEvents(target);

  useEffect(() => {
    const id = setInterval(() => setTick((v) => v + 1), 750);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (tick >= events.length + 2) {
      setTick(0);
      setTarget((v) => 1 - v);
    }
  }, [tick, events.length]);

  const upto = events.slice(0, Math.min(tick + 1, events.length));
  const last = upto[upto.length - 1];
  const key = HT_MAIN[target].k;
  const hashed = upto.some((e) => e.t === "hash");
  const done = upto.some((e) => e.t === "done");
  const visit = (i: number) => upto.find((e) => e.t === "visit" && e.i === i) as Extract<HtEvent, { t: "visit" }> | undefined;
  const emitted = (i: number, j: number) => upto.some((e) => e.t === "emit" && e.i === i && e.j === j);
  const nEmit = upto.filter((e) => e.t === "emit").length;

  const msg =
    last.t === "probe" ? `probe(${key})` :
    last.t === "hash" ? `h(${key}) = 1  →  directory[1]` :
    last.t === "visit" ? (last.match ? `${HT_MAIN[last.i].k} = ${key}  ✓ match` : `${HT_MAIN[last.i].k} ≠ ${key}  → skip its sub chain`) :
    last.t === "emit" ? `emit ${HT_MAIN[last.i].subs[last.j]}` :
    "hit ✓ cached tuples reused";

  const box = (x: number, y: number, w: number, h: number, on: boolean, tone: "hit" | "miss" | "idle") => (
    <motion.rect x={x} y={y} width={w} height={h} rx="1.5" stroke="currentColor" initial={false}
      animate={{
        fill: tone === "hit" ? "hsl(var(--primary) / 0.28)" : tone === "miss" ? "hsl(var(--foreground) / 0.07)" : "hsl(var(--background) / 0)",
        strokeWidth: on ? 1.6 : 1,
        strokeOpacity: tone === "miss" ? 0.45 : 1,
      }}
      transition={{ duration: 0.25 }} />
  );

  return (
    <svg viewBox="0 0 260 322" className="absolute inset-0 h-full w-full text-primary">
      <text x="12" y="28" fontSize="8" fill="currentColor" className="font-mono-math" opacity="0.75">directory</text>
      <text x="70" y="28" fontSize="8" fill="currentColor" className="font-mono-math" opacity="0.75">main chain (distinct keys)</text>

      {/* hash directory */}
      {[0, 1, 2].map((r) => (
        <g key={r}>
          {box(12, 38 + r * 22, 40, 22, hashed && r === 1, hashed && r === 1 ? "hit" : "idle")}
          <text x="19" y={53 + r * 22} fontSize="9" fill="currentColor" className="font-mono-math">{r}</text>
          {r !== 1 && <text x="42" y={53 + r * 22} fontSize="9" fill="currentColor" className="font-mono-math" opacity="0.6">✕</text>}
        </g>
      ))}
      <text x="32" y="124" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.6">⋮</text>
      {box(12, 130, 40, 22, false, "idle")}
      <text x="19" y="145" fontSize="9" fill="currentColor" className="font-mono-math">m−1</text>
      <text x="42" y="145" fontSize="9" fill="currentColor" className="font-mono-math" opacity="0.6">✕</text>

      {/* pointer from the directory to the chain, then between main nodes */}
      <line x1="52" y1="71" x2="64" y2="71" stroke="currentColor" strokeWidth="1.2" />
      <line x1="116" y1="71" x2="136" y2="71" stroke="currentColor" strokeWidth="1.2" />
      <path d="M133 68 L137 71 L133 74" fill="none" stroke="currentColor" strokeWidth="1.1" />

      {/* main nodes and their sub chains */}
      {HT_MAIN.map((m, i) => {
        const v = visit(i);
        const tone = v ? (v.match ? "hit" : "miss") : "idle";
        const skipped = tone === "miss";
        return (
          <g key={m.k}>
            {box(m.cx - 26, 60, 52, 22, !!v, tone)}
            <text x={m.cx - 18} y="75" fontSize="10" fontWeight="600" fill="currentColor" className="font-mono-math">{m.k}</text>
            <circle cx={m.cx + 17} cy="71" r="2.6" fill="currentColor" />
            <line x1={m.cx + 17} y1="74" x2={m.cx + 17} y2="100" stroke="currentColor" strokeWidth="1.1" strokeOpacity={skipped ? 0.25 : 0.8} />
            {m.subs.map((sv, j) => {
              const y = 100 + j * 30;
              const on = emitted(i, j);
              return (
                <g key={sv}>
                  {j > 0 && <line x1={m.cx + 17} y1={y - 12} x2={m.cx + 17} y2={y} stroke="currentColor" strokeWidth="1.1" strokeOpacity={skipped ? 0.25 : 0.8} />}
                  <motion.rect x={m.cx - 10} y={y} width="54" height="18" rx="1.5" stroke="currentColor" initial={false}
                    animate={{ fill: on ? "hsl(var(--primary) / 0.5)" : "hsl(var(--background) / 0)", strokeOpacity: skipped ? 0.3 : 1, strokeWidth: on ? 1.6 : 1 }}
                    transition={{ duration: 0.25 }} />
                  <text x={m.cx - 2} y={y + 12.5} fontSize="9.5" fill="currentColor" className="font-mono-math" opacity={skipped ? 0.4 : 1}>{sv}</text>
                </g>
              );
            })}
          </g>
        );
      })}

      {/* the probing key: a light tag, so the structure stays the focus */}
      <motion.g initial={false} animate={{ opacity: done ? 0.4 : 1 }}>
        <rect x="190" y="34" width="58" height="18" rx="2" fill="transparent" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
        <text x="219" y="46.5" textAnchor="middle" fontSize="9" fill="currentColor" className="font-mono-math">probe {key}</text>
      </motion.g>
      <motion.path d="M190 43 C 160 43, 100 40, 54 49" fill="none" stroke="currentColor" strokeWidth="1.1" strokeDasharray="3 3" initial={false}
        animate={{ opacity: hashed ? 0.9 : 0 }} />

      {/* results leave the table: they are collected outside it */}
      <line x1="12" y1="192" x2="248" y2="192" stroke="currentColor" strokeOpacity="0.25" strokeDasharray="2 3" />
      <text x="12" y="212" fontSize="9" fill="currentColor" className="font-mono-math" opacity="0.8">out →</text>
      {HT_MAIN[target].subs.map((sv, j) =>
        emitted(target, j) ? (
          <motion.g key={`${target}-${sv}`} initial={{ opacity: 0, y: -22 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 240, damping: 18 }}>
            <rect x={52 + j * 50} y="198" width="44" height="18" rx="1.5" fill="hsl(var(--primary) / 0.28)" stroke="currentColor" strokeWidth="1.4" />
            <text x={74 + j * 50} y="210.5" textAnchor="middle" fontSize="9.5" fill="currentColor" className="font-mono-math">{sv}</text>
          </motion.g>
        ) : (
          <rect key={`${target}-${sv}`} x={52 + j * 50} y="198" width="44" height="18" rx="1.5" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeDasharray="2 3" />
        ),
      )}

      <text x="12" y="244" fontSize="10" fill="currentColor" className="font-mono-math" fontWeight="600">{msg}</text>
      <text x="12" y="260" fontSize="9" fill="currentColor" className="font-mono-math" opacity="0.7">matches: {nEmit}</text>
      <text x="12" y="282" fontSize="8.5" fill="currentColor" className="font-mono-math" opacity="0.8">chaining visits every duplicate;</text>
      <text x="12" y="295" fontSize="8.5" fill="currentColor" className="font-mono-math" opacity="0.8">3D: each key once, then its sub chain</text>
      <text x="12" y="314" fontSize="8" fill="currentColor" className="font-mono-math" opacity="0.6">Flachs, Müller, Moerkotte · CIDR 2022</text>
    </svg>
  );
};

/* ===================== Intro scene: how an LLM generates text ===================== */

const LLM_PROMPT = "The query optimizer picks the";
const LLM_STEPS: { token: string; options: [string, number][] }[] = [
  { token: "cheapest", options: [["cheapest", 0.46], ["best", 0.22], ["first", 0.13], ["final", 0.1], ["one", 0.09]] },
  { token: "plan", options: [["plan", 0.58], ["join", 0.17], ["path", 0.12], ["option", 0.08], ["way", 0.05]] },
  { token: "and", options: [["and", 0.44], ["then", 0.24], ["for", 0.14], ["that", 0.1], ["with", 0.08]] },
  { token: "executes", options: [["executes", 0.49], ["runs", 0.22], ["returns", 0.14], ["caches", 0.09], ["joins", 0.06]] },
  { token: "it", options: [["it", 0.57], ["the", 0.2], ["each", 0.11], ["all", 0.07], ["a", 0.05]] },
];
const LLM_STAGES = ["Tokens", "Transformer", "Softmax", "Argmax"];

const LlmScene = () => {
  const [tick, setTick] = useState(0);
  // each token takes 4 beats (0 context, 1 distribution, 2 pick the max, 3 append); then two beats of rest
  const PERIOD = LLM_STEPS.length * 4 + 3;
  useEffect(() => {
    const id = setInterval(() => setTick((v) => (v + 1) % PERIOD), 750);
    return () => clearInterval(id);
  }, [PERIOD]);

  const done = tick >= LLM_STEPS.length * 4;
  const step = done ? LLM_STEPS.length - 1 : Math.floor(tick / 4);
  const beat = done ? 4 : tick % 4;
  const appended = LLM_STEPS.slice(0, step + (beat >= 3 || done ? 1 : 0)).map((s) => s.token);
  const cur = LLM_STEPS[step];
  const best = cur.options.reduce((a, b) => (b[1] > a[1] ? b : a));
  const stage = done ? -1 : beat;

  return (
    <div className="absolute inset-0 flex flex-col gap-2 overflow-hidden p-3 text-primary">
      <div className="font-mono-math flex flex-wrap items-center gap-1 text-[9px]">
        {LLM_STAGES.map((s, i) => (
          <span key={s} className="flex items-center gap-1">
            <span className={cn("rounded-sm border px-1.5 py-0.5 transition-colors duration-300", i === stage ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground")}>{s}</span>
            {i < LLM_STAGES.length - 1 && <span className="text-muted-foreground">→</span>}
          </span>
        ))}
      </div>

      <div className="font-mono-math min-h-[3.4rem] border border-border p-2 text-[11px] leading-[1.5] text-foreground">
        {LLM_PROMPT}
        {appended.map((w, i) => (
          <motion.span key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="font-medium text-primary"> {w}</motion.span>
        ))}
        {done ? <span className="text-primary">.</span> : <span className="ml-0.5 inline-block h-3 w-[2px] translate-y-0.5 bg-primary" style={{ animation: "blink 1.06s step-end infinite" }} />}
      </div>

      <div className="font-mono-math text-[9.5px] uppercase tracking-[0.12em] text-muted-foreground">P(next token | context)</div>
      <div className="space-y-1">
        {cur.options.map(([w, p]) => {
          const isBest = w === best[0];
          const lit = beat >= 2 && !done;
          return (
            <div key={`${step}-${w}`} className="font-mono-math flex items-center gap-2 text-[10.5px]">
              <span className={cn("w-[4.4rem] shrink-0 truncate", lit && isBest ? "font-semibold text-primary" : "text-foreground/80")}>{w}</span>
              <span className="relative h-2.5 flex-1 bg-secondary">
                <motion.span
                  className="absolute inset-y-0 left-0 bg-primary"
                  initial={false}
                  animate={{ width: beat >= 1 && !done ? `${p * 100}%` : "0%", opacity: lit ? (isBest ? 1 : 0.28) : 0.6 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
              <span className={cn("w-8 text-right tabular-nums", lit && isBest ? "font-semibold text-primary" : "text-muted-foreground")}>{beat >= 1 && !done ? `${Math.round(p * 100)}%` : "–"}</span>
            </div>
          );
        })}
      </div>

      <div className="font-mono-math mt-auto text-[10.5px] text-foreground/80">
        {done ? "generation = repeat: score, softmax, take the max" : beat >= 2 ? `argmax → “${best[0]}” (${Math.round(best[1] * 100)}%)` : "softmax(z)ᵢ = e^zᵢ / Σⱼ e^zⱼ"}
      </div>
    </div>
  );
};

/* ===================== Intro scene: open-shop scheduling by matrix decomposition ===================== */

// n = 4 pieces, m = 3 machines. T* = 42 comes from a linear program; M' = Σ λ_r P_r is a decomposition of the
// (n+m)×(n+m) T*-uniform matrix into permutation matrices, and each P_r gives who runs where for λ_r time units.
const SCHED_T = [[20, 10, 30], [20, 40, 45], [40, 70, 60], [50, 40, 40]];
const SCHED_M = [[0, 10, 0], [6, 28, 0], [36, 0, 6], [0, 4, 36]];
const SCHED = [
  { lam: 28, on: [3, 2, 4] }, // piece running on machine 1, 2, 3
  { lam: 8, on: [3, 1, 4] },
  { lam: 2, on: [2, 1, 3] },
  { lam: 4, on: [2, 4, 3] },
];
const T_STAR = 42;

const ScheduleScene = () => {
  const [s, setS] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setS((v) => (v + 1) % 9), 1050);
    return () => clearInterval(id);
  }, []);

  // 0 the times t_ij · 1 M = x*·t · 2-5 one permutation matrix at a time · 6-8 done
  const shown = s < 2 ? 0 : Math.min(4, s - 1);
  const cur = shown > 0 ? SCHED[shown - 1] : null;
  const mat = s === 0 ? SCHED_T : SCHED_M;

  const colX = [46, 74, 102];
  const rowY = (i: number) => 46 + i * 15;
  const gx0 = 30, gw = 262, gy = (j: number) => 134 + j * 19;
  const sx = (t: number) => gx0 + (t / T_STAR) * gw;

  // gantt segments, merging consecutive steps where the same piece stays on a machine
  const segs: { j: number; piece: number; from: number; to: number }[] = [];
  let t0 = 0;
  SCHED.slice(0, shown).forEach((st) => {
    st.on.forEach((piece, j) => {
      const last = [...segs].reverse().find((g) => g.j === j);
      if (last && last.piece === piece && last.to === t0) last.to = t0 + st.lam;
      else segs.push({ j, piece, from: t0, to: t0 + st.lam });
    });
    t0 += st.lam;
  });
  const ticks = [0, ...SCHED.slice(0, shown).reduce<number[]>((acc, st) => [...acc, (acc[acc.length - 1] ?? 0) + st.lam], [])];

  const msg =
    s === 0 ? "min T   s.t.  Σⱼ xᵢⱼ = 1, …   →   T* = 42" :
    s === 1 ? "M = (mᵢⱼ),  mᵢⱼ = x*ᵢⱼ · tᵢⱼ" :
    s < 6 ? `P${shown} · λ${shown}   with   λ${shown} = ${cur!.lam}` :
    "Σ λᵣ = 28 + 8 + 2 + 4 = 42 = T*";

  return (
    <svg viewBox="0 0 300 250" className="absolute inset-0 h-full w-full text-primary">
      <text x="12" y="14" fontSize="8.5" fill="currentColor" className="font-mono-math" fontWeight="600">{msg}</text>

      {/* the matrix: t_ij first, then M */}
      <text x="12" y="30" fontSize="7" fill="currentColor" className="font-mono-math" opacity="0.7">{s === 0 ? "tᵢⱼ" : "M"}</text>
      {["m₁", "m₂", "m₃"].map((h, j) => (
        <text key={h} x={colX[j]} y="30" textAnchor="middle" fontSize="6.5" fill="currentColor" className="font-mono-math" opacity="0.6">{h}</text>
      ))}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <text x="20" y={rowY(i) + 3} textAnchor="middle" fontSize="6.5" fill="currentColor" className="font-mono-math" opacity="0.6">p{i + 1}</text>
          {[0, 1, 2].map((j) => {
            const on = cur ? cur.on[j] === i + 1 : false;
            return (
              <g key={j}>
                <motion.rect x={colX[j] - 12} y={rowY(i) - 6.5} width="24" height="12" rx="1.5" fill="currentColor" initial={false}
                  animate={{ fillOpacity: on ? 0.28 : 0 }} transition={{ duration: 0.25 }} />
                <text x={colX[j]} y={rowY(i) + 3} textAnchor="middle" fontSize="8" fill="currentColor" className="font-mono-math" fontWeight={on ? 700 : 400}>{mat[i][j]}</text>
              </g>
            );
          })}
        </g>
      ))}
      <path d="M32 38 L28 38 L28 105 L32 105" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <path d="M116 38 L120 38 L120 105 L116 105" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />

      {/* the current permutation matrix P_r (rows = pieces, columns = machines) */}
      <text x="150" y="30" fontSize="7" fill="currentColor" className="font-mono-math" opacity="0.7">{cur ? `P${shown}` : "P_r"}</text>
      {[0, 1, 2, 3].map((i) =>
        [0, 1, 2].map((j) => {
          const one = cur ? cur.on[j] === i + 1 : false;
          return (
            <motion.text key={`${i}-${j}`} x={172 + j * 22} y={rowY(i) + 3} textAnchor="middle" fontSize="8" fill="currentColor" className="font-mono-math" initial={false}
              animate={{ opacity: cur ? (one ? 1 : 0.35) : 0.18 }} fontWeight={one ? 700 : 400}>
              {cur ? (one ? 1 : 0) : "·"}
            </motion.text>
          );
        }),
      )}
      <path d="M154 38 L150 38 L150 105 L154 105" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <path d="M232 38 L236 38 L236 105 L232 105" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <motion.text x="244" y="72" fontSize="10" fill="currentColor" className="font-mono-math" fontWeight="700" initial={false}
        animate={{ opacity: cur ? 1 : 0 }}>×{cur ? cur.lam : ""}</motion.text>

      {/* the schedule, built one permutation after another */}
      <text x="12" y="122" fontSize="7" fill="currentColor" className="font-mono-math" opacity="0.7">plan</text>
      {[0, 1, 2].map((j) => (
        <g key={j}>
          <text x="12" y={gy(j) + 10} fontSize="7" fill="currentColor" className="font-mono-math" opacity="0.7">m{["₁", "₂", "₃"][j]}</text>
          <rect x={gx0} y={gy(j)} width={gw} height="15" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeDasharray="2 3" />
        </g>
      ))}
      {segs.map((g) => (
        <g key={`${g.j}-${g.piece}-${g.from}`}>
          <motion.rect x={sx(g.from)} y={gy(g.j)} height="15" stroke="currentColor" strokeWidth="1" fill="currentColor"
            initial={{ width: 0, fillOpacity: 0.08 + g.piece * 0.11 }} animate={{ width: sx(g.to) - sx(g.from), fillOpacity: 0.08 + g.piece * 0.11 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} />
          {sx(g.to) - sx(g.from) > 14 && (
            <motion.text initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
              x={(sx(g.from) + sx(g.to)) / 2} y={gy(g.j) + 10.4} textAnchor="middle" fontSize="7.5" fill="hsl(var(--foreground))" className="font-mono-math">p{g.piece}</motion.text>
          )}
        </g>
      ))}
      <line x1={gx0} y1="193" x2={gx0 + gw} y2="193" stroke="currentColor" strokeOpacity="0.5" />
      <path d={`M${gx0 + gw - 4} 190 L${gx0 + gw + 2} 193 L${gx0 + gw - 4} 196`} fill="none" stroke="currentColor" strokeOpacity="0.6" />
      {ticks.map((tk) => (
        <g key={tk}>
          <line x1={sx(tk)} y1="190" x2={sx(tk)} y2="196" stroke="currentColor" />
          <text x={sx(tk)} y="206" textAnchor="middle" fontSize="7" fill="currentColor" className="font-mono-math">{tk}</text>
        </g>
      ))}
      {shown > 0 && shown < 4 && (
        <line x1={sx(ticks[ticks.length - 1])} y1="130" x2={sx(ticks[ticks.length - 1])} y2="193" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      )}
      <motion.text x="150" y="232" textAnchor="middle" fontSize="8.5" fill="currentColor" className="font-mono-math" fontWeight="600" initial={false}
        animate={{ opacity: s >= 6 ? 1 : 0.55 }}>
        {s >= 6 ? "makespan = T* = 42  ✓ optimal" : "M′ = Σ λᵣ Pᵣ   (Birkhoff–von Neumann)"}
      </motion.text>
    </svg>
  );
};
