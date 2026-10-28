import { useState } from "react";
import { motion } from "framer-motion";
import { ui } from "@/data/content";
import { useLang } from "@/hooks/useLang";
import { cn } from "@/lib/utils";
import { Reveal, SectionLabel } from "./shared";
import { QueryOptimizerFigure, Figure, GradientDescentFigure, SvdFigure } from "./ConceptFigures";

/** Venn diagram: databases, AI, applied math — and the projects that sit in each overlap. */
const R = 110;
const CIRCLES = [
  { id: "db", cx: 185, cy: 170, dur: 7 },
  { id: "ai", cx: 295, cy: 170, dur: 8.5 },
  { id: "math", cx: 240, cy: 265, dur: 7.8 },
];
const SET_LABELS: Record<string, [number, number]> = { db: [122, 150], ai: [358, 150], math: [240, 332] };

export const Intersection = () => {
  const { t } = useLang();
  const x = ui.intersection;
  const [active, setActive] = useState<string[]>([]);
  const lit = (id: string) => active.includes(id);

  return (
    <section id="intersection" className="py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-12">
        <SectionLabel label={t(x.label)} />

        <Reveal>
          <h2 className="font-academic max-w-3xl text-3xl leading-tight md:text-4xl">{t(x.title)}</h2>
          <p className="font-mono-math mt-4 max-w-2xl text-xs leading-relaxed text-muted-foreground">{t(x.intro)}</p>
        </Reveal>

        <div className="mt-12 grid items-center gap-12 md:grid-cols-[minmax(0,26rem)_1fr]">
          <Reveal>
            <svg viewBox="60 50 360 340" className="mx-auto w-full max-w-md text-primary" role="img" aria-label={t(x.title)}>
              {CIRCLES.map((c, i) => (
                // Each circle breathes slightly, out of phase with the others
                <motion.g
                  key={c.id}
                  style={{ transformOrigin: `${c.cx}px ${c.cy}px` }}
                  animate={{ scale: [1, 1.018, 1], rotate: [0, 1.5, 0] }}
                  transition={{ duration: c.dur, repeat: Infinity, ease: "easeInOut", delay: 2.5 + i }}
                >
                  <motion.circle
                    cx={c.cx} cy={c.cy} r={R} fill="currentColor"
                    initial={{ fillOpacity: 0 }}
                    whileInView={{ fillOpacity: 0.06 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 1, delay: 0.6 + i * 0.25 }}
                  />
                  <motion.circle
                    cx={c.cx} cy={c.cy} r={R} fill="currentColor"
                    animate={{ opacity: lit(c.id) ? 0.14 : 0 }}
                    transition={{ duration: 0.35 }}
                  />
                  <motion.circle
                    cx={c.cx} cy={c.cy} r={R} fill="none" stroke="currentColor"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    animate={{ strokeWidth: lit(c.id) ? 2 : 1.2 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ pathLength: { duration: 1.6, delay: i * 0.25, ease: "easeInOut" }, strokeWidth: { duration: 0.3 } }}
                  />
                </motion.g>
              ))}

              {Object.entries(SET_LABELS).map(([id, [lx, ly]]) => (
                <motion.text
                  key={id} x={lx} y={ly} textAnchor="middle"
                  className="font-mono-math" fontSize="10.5" letterSpacing="0.06em" fill="currentColor"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                >
                  {t(x.sets[id])
                    .toUpperCase()
                    .split(/ (?=[^ ]+$)/)
                    .map((word, k) => (
                      <tspan key={k} x={lx} dy={k === 0 ? 0 : 13}>
                        {word}
                      </tspan>
                    ))}
                </motion.text>
              ))}

              <g>
                <motion.circle
                  cx="240" cy="192" r="16" fill="none" stroke="currentColor" strokeWidth="1"
                  style={{ transformOrigin: "240px 192px" }}
                  animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 3 }}
                />
                <motion.g
                  initial={{ opacity: 0, scale: 0.4 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: 2.2, type: "spring", stiffness: 260, damping: 14 }}
                  style={{ transformOrigin: "240px 192px" }}
                >
                  <circle cx="240" cy="192" r="16" fill="currentColor" />
                  <text x="240" y="196" textAnchor="middle" className="font-mono-math" fontSize="10.5" fontWeight="600" fill="white">
                    {t({ fr: "Moi", en: "Me" })}
                  </text>
                </motion.g>
              </g>
            </svg>
          </Reveal>

          <div className="space-y-6">
            {x.remarks.map((r, i) => (
              <Reveal key={r.id} delay={i * 0.08}>
                <div
                  className="group flex cursor-default items-start gap-3"
                  onMouseEnter={() => setActive([r.id])}
                  onMouseLeave={() => setActive([])}
                >
                  <span className="citation-number whitespace-nowrap text-xs">
                    {t({ fr: "Remarque", en: "Remark" })} {i + 1}.
                  </span>
                  <div className="transition-transform duration-300 group-hover:translate-x-1">
                    <p className={cn("font-academic text-lg transition-colors", lit(r.id) && "text-primary")}>{t(r.title)}</p>
                    <p className="font-mono-math mt-0.5 text-xs leading-relaxed text-muted-foreground">{t(r.text)}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Concept figures, one per field; hovering one lights its circle */}
        <div className="mt-20 grid gap-10 md:grid-cols-3">
          {x.figures.map((f, i) => {
            const Fig = [QueryOptimizerFigure, GradientDescentFigure, SvdFigure][i];
            return (
              <Reveal key={f.set} delay={i * 0.1}>
                <div onMouseEnter={() => setActive([f.set])} onMouseLeave={() => setActive([])}>
                  <Figure n={i + 2} caption={t(f.caption)}>
                    <Fig />
                  </Figure>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
