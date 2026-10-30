import { motion } from "framer-motion";
import { skills, ui } from "@/data/content";
import { useLang } from "@/hooks/useLang";
import { useVisible } from "@/hooks/useVisible";
import { NeuralStage } from "./HeroStage";
import { Reveal, SectionLabel } from "./shared";

const SYMBOL: Record<string, string> = { lang: "Σ", fw: "F", ml: "M", data: "D", cloud: "C", db: "B", sec: "S", math: "ℳ" };

export const Skills = () => {
  const { t } = useLang();
  const [boxRef, shown] = useVisible<HTMLDivElement>({ amount: 0.2, bottom: 40 });

  return (
    <section id="skills" className="relative py-10 md:py-14">
      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <SectionLabel label={t(ui.skills.label)} />
        <div className="grid items-start gap-12 xl:grid-cols-[minmax(0,1fr)_28rem]">
          <Reveal delay={0.1}>
            <div ref={boxRef} className="font-mono-math max-w-3xl border border-border p-5 text-base leading-loose md:p-6">
              {skills.map((s, i) => (
                // Each line is typed out left to right, one after another
                <motion.div
                  key={s.id}
                  className="flex flex-wrap gap-x-2"
                  initial={false}
                  animate={shown ? { clipPath: "inset(0 0% 0 0)", opacity: 1 } : { clipPath: "inset(0 100% 0 0)", opacity: 0.4 }}
                  transition={{ duration: 0.9, delay: shown ? 0.25 + i * 0.28 : 0, ease: "easeOut" }}
                >
                  <span className="text-muted-foreground">{t(ui.skills.let)}</span>
                  <span className="font-medium text-primary">{SYMBOL[s.id]}</span>
                  <span className="text-muted-foreground">= {"{"}</span>
                  <span>{t(s.items).join(", ")}</span>
                  <span className="text-muted-foreground">{"}"}</span>
                  <span className="ml-4 text-muted-foreground">← {t(s.title)}</span>
                </motion.div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2} className="mx-auto hidden w-full max-w-[28rem] md:block">
            <NeuralStage n={4} />
          </Reveal>
        </div>
      </div>
    </section>
  );
};
