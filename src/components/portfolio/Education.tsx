import { motion } from "framer-motion";
import { GPA_SCALE, education, ui } from "@/data/content";
import { useLang } from "@/hooks/useLang";
import { AttentionFigure, Figure, GaltonFigure, SchemaFigure } from "./ConceptFigures";
import { CountUp, Reveal, SectionLabel } from "./shared";

const FIGS = [SchemaFigure, GaltonFigure, AttentionFigure];

export const Education = () => {
  const { t } = useLang();

  return (
    <section id="education" className="py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mx-auto max-w-5xl">
          <SectionLabel label={t(ui.education.label)} center />

          <div className="mx-auto grid max-w-3xl gap-10 text-center md:grid-cols-2">
            {education.map((e, i) => (
              <Reveal key={e.school} delay={i * 0.12}>
                <div className="group">
                  <p className="font-academic text-2xl transition-colors duration-300 group-hover:text-primary">{e.school}</p>
                  <p className="font-mono-math mt-1.5 text-xs text-muted-foreground">{t(e.degree)}</p>
                  <p className="font-mono-math mt-1 text-xs text-muted-foreground">{t(e.period)}</p>
                  <p className="font-mono-math mt-3 text-xs">
                    GPA: <span className="font-academic text-2xl text-primary"><CountUp value={e.gpa} decimals={e.gpa === GPA_SCALE ? 1 : 2} /></span> / {GPA_SCALE}
                  </p>
                  {/* GPA as a share of the scale, filling on view */}
                  <div className="mx-auto mt-2 h-[3px] w-48 bg-secondary">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(e.gpa / GPA_SCALE) * 100}%` }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 1.8, delay: 0.3 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* One concept per field */}
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {ui.education.figures.map((f, i) => {
              const Fig = FIGS[i];
              return (
                <Reveal key={f.set} delay={i * 0.1}>
                  <Figure n={i + 5} caption={t(f.caption)}>
                    <Fig />
                  </Figure>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
