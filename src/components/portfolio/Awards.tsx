import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { awards, ui } from "@/data/content";
import { useLang } from "@/hooks/useLang";
import { SectionLabel, slideIn, stagger } from "./shared";

export const Awards = () => {
  const { t, lang } = useLang();

  return (
    <section id="awards" className="py-16 md:py-20">
      <div className="container mx-auto px-6 md:px-12">
        <SectionLabel label={t(ui.awardsSection.label)} />
        <motion.ul variants={stagger} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }} className="space-y-5">
          {awards[lang].map((a, i) => (
            <motion.li key={i} variants={slideIn} className="flex items-start gap-3">
              <Award className="mt-1 h-4 w-4 shrink-0 text-primary" />
              <span className="font-mono-math w-20 shrink-0 pt-0.5 text-xs text-muted-foreground">
                {t(ui.awardsSection.award)} {i + 1}.
              </span>
              <p className="font-academic text-base italic md:text-lg">{a}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};
