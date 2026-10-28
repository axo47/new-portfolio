import { motion } from "framer-motion";
import { education, ui } from "@/data/content";
import { useLang } from "@/hooks/useLang";
import { useVisible } from "@/hooks/useVisible";
import { AttentionFigure, Figure, GaltonFigure, SchemaFigure } from "./ConceptFigures";
import { CountUp, Reveal, SectionLabel } from "./shared";

const FIGS = [SchemaFigure, GaltonFigure, AttentionFigure];

const GpaBar = ({ share, delay }: { share: number; delay: number }) => {
  const [ref, shown] = useVisible<HTMLDivElement>({ amount: 0.5, bottom: 40 });
  return (
    <div ref={ref} className="mx-auto mt-2 h-[3px] w-48 bg-secondary">
      <motion.div
        className="h-full bg-primary"
        initial={false}
        animate={{ width: shown ? `${share * 100}%` : "0%" }}
        transition={{ duration: shown ? 1.8 : 0.2, delay: shown ? delay : 0, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
};

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
                    GPA: <span className="font-academic text-2xl text-primary"><CountUp value={e.gpa} decimals={e.gpa === e.scale ? 1 : 2} /></span> / {e.scale.toFixed(1)}
                  </p>
                  {/* GPA as a share of the scale, filling on view */}
                  <GpaBar share={e.gpa / e.scale} delay={0.3 + i * 0.2} />
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
