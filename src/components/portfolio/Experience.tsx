import { motion } from "framer-motion";
import { experiences, ui } from "@/data/content";
import { useLang } from "@/hooks/useLang";
import { RichText, Reveal, SectionLabel, pop, slideIn , Show } from "./shared";

export const Experience = () => {
  const { t } = useLang();

  return (
    <section id="experience" className="py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-12">
        <SectionLabel label={t(ui.experience.label)} />

        <div className="space-y-12">
          {experiences.map((e, i) => (
            <Reveal key={e.id}>
              <Show className="group flex items-start gap-3">
                <motion.span
                  variants={pop}
                  className="citation-number mt-0.5 text-sm transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:scale-110"
                >
                  [{i + 1}]
                </motion.span>
                <div className="flex-1">
                  <motion.p variants={slideIn} className="font-academic text-lg font-medium transition-colors duration-300 group-hover:text-primary">
                    {e.org}
                  </motion.p>
                  <motion.p variants={slideIn} className="font-mono-math mt-0.5 text-xs text-muted-foreground">
                    {t(e.role)} · {t(e.period)}
                  </motion.p>
                  {e.sub && (
                    <motion.p variants={slideIn} className="font-mono-math mt-1.5 text-xs">
                      <span className="text-muted-foreground">{t({ fr: "Sujet :", en: "Topic:" })}</span> {t(e.sub)}
                    </motion.p>
                  )}
                  <ul className="mt-2 space-y-1.5">
                    {t(e.bullets).map((b, j) => (
                      <motion.li key={j} variants={slideIn} className="font-mono-math text-xs leading-relaxed text-muted-foreground">
                        · <RichText text={b} />
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {e.tags.map((tag) => (
                      <motion.span key={tag} variants={pop} className="tag-pill">[{tag}]</motion.span>
                    ))}
                  </div>
                </div>
              </Show>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
