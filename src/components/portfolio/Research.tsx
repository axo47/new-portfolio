import { motion } from "framer-motion";
import { researchCards, ui } from "@/data/content";
import { useLang } from "@/hooks/useLang";
import { QueryStage } from "./HeroStage";
import { CountUp, Reveal, SectionLabel, pop, slideIn, stagger } from "./shared";

const view = { once: false, margin: "-60px" } as const;

export const Research = () => {
  const { t } = useLang();

  return (
    <section id="research" className="py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-12">
        <SectionLabel label={t(ui.research.label)} />

        <div className="space-y-14">
          {researchCards.map((c, i) => (
            <Reveal key={c.id}>
              <motion.div
                className="grid items-center gap-12 xl:grid-cols-[minmax(0,1fr)_28rem]"
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={view}
              >
                <div className="flex items-start gap-3">
                  <span className="citation-number mt-0.5 text-sm">[R{i + 1}]</span>
                  <div className="flex-1">
                    <motion.p variants={slideIn} className="font-academic text-xl font-medium">{t(c.title)}</motion.p>
                    <motion.p variants={slideIn} className="font-mono-math mt-0.5 text-xs text-muted-foreground">{t(c.kicker)}</motion.p>
                    <motion.p variants={slideIn} className="font-mono-math mt-3 max-w-3xl text-xs leading-relaxed text-muted-foreground">{t(c.text)}</motion.p>
                    {c.metric && (
                      <motion.p variants={slideIn} className="font-mono-math mt-3 text-xs">
                        <span className="font-academic mr-2 text-2xl text-primary">
                          <CountUp value={parseInt(c.metric.value, 10)} suffix="×" />
                        </span>
                        <span className="text-muted-foreground">{t(c.metric.label)}</span>
                      </motion.p>
                    )}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {c.tags.map((tag) => (
                        <motion.span key={tag} variants={pop} className="tag-pill">[{tag}]</motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* A SQL query through the compiler: the ground of this work */}
                <div className="mx-auto w-full max-w-[28rem]">
                  <QueryStage n={8} />
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};
