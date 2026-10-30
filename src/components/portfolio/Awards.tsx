import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { awards, ui } from "@/data/content";
import { useLang } from "@/hooks/useLang";
import { SectionLabel, Show, slideIn } from "./shared";

export const Awards = () => {
  const { t, lang } = useLang();

  return (
    <section id="awards" className="py-10 md:py-14">
      <div className="container mx-auto px-6 md:px-12">
        <SectionLabel label={t(ui.awardsSection.label)} />
        <Show as="ul" className="space-y-5">
          {awards[lang].map((a, i) => (
            <motion.li key={i} variants={slideIn} className="flex items-start gap-3">
              <Award className="mt-1 h-4 w-4 shrink-0 text-primary" />
              <span className="font-mono-math w-20 shrink-0 pt-0.5 text-base text-muted-foreground">
                {t(ui.awardsSection.award)} {i + 1}.
              </span>
              <p className="font-academic text-xl italic md:text-2xl">{a}</p>
            </motion.li>
          ))}
        </Show>
      </div>
    </section>
  );
};
