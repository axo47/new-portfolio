import { motion } from "framer-motion";
import { Download, GraduationCap, Github, Linkedin, Mail } from "lucide-react";
import { links, ui } from "@/data/content";
import { useLang } from "@/hooks/useLang";
import photo from "@/assets/profile-photo.jpeg";
import { TriStage } from "./HeroStage";
import { Reveal, slideIn, stagger } from "./shared";

const EASE = [0.16, 1, 0.3, 1] as const;

const btn =
  "font-mono-math inline-flex items-center justify-center gap-2 rounded-sm border border-primary/40 px-3 py-2 text-xs text-foreground transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground";

export const Hero = () => {
  const { t } = useLang();

  return (
    <section id="top" className="relative py-8 md:py-10">
      <div className="container mx-auto px-6 md:px-12">
        <Reveal>
          <p className="section-number mb-4">{t(ui.hero.label)}</p>
        </Reveal>

        <div className="grid items-start gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] xl:gap-12">
          {/* Left: who, the abstract, what I am doing now */}
          <div>
            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-end gap-x-4 gap-y-5 sm:gap-x-6 xl:gap-x-6">
              <div className="relative shrink-0 p-1.5 sm:row-span-2">
                <svg className="absolute inset-0 h-full w-full overflow-visible text-primary" aria-hidden="true">
                  <motion.rect
                    x="0.5" y="0.5"
                    style={{ width: "calc(100% - 1px)", height: "calc(100% - 1px)" }}
                    fill="none" stroke="currentColor" strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.6, delay: 0.3, ease: "easeInOut" }}
                  />
                </svg>
                <motion.img
                  src={photo}
                  alt={t(ui.hero.photoAlt)}
                  className="h-40 w-[7.5rem] object-cover object-[50%_38%] min-[400px]:h-48 min-[400px]:w-36 sm:h-72 sm:w-[13.5rem] xl:aspect-[3/4] xl:h-[clamp(16rem,43svh,26rem)] xl:w-auto"
                  initial={{ clipPath: "inset(0 0 100% 0)", scale: 1.08 }}
                  animate={{ clipPath: "inset(0 0 0% 0)", scale: 1 }}
                  transition={{ duration: 1.3, delay: 0.9, ease: EASE }}
                />
              </div>

              <div className="min-w-0 sm:self-end">
                <h1 className="font-academic text-[2rem] leading-[1.02] tracking-tight min-[400px]:text-4xl sm:text-6xl xl:text-6xl 2xl:text-7xl">
                  {["Kevin", "Ezzedine"].map((word, i) => (
                    <span key={word} className="block overflow-hidden pb-[0.08em]">
                      <motion.span
                        className="block"
                        initial={{ y: "108%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1.1, delay: 0.15 + i * 0.16, ease: EASE }}
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </h1>
                <motion.div
                  className="font-mono-math mt-3 flex items-center gap-2.5 text-[11px] uppercase tracking-[0.16em] text-primary sm:text-xs sm:tracking-[0.18em]"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.7, ease: EASE }}
                >
                  <GraduationCap className="h-4 w-4 shrink-0" />
                  <span>{t(ui.hero.road)}</span>
                </motion.div>
              </div>

              {/* the four links, as a 2 × 2 matrix */}
              <div className="relative col-span-2 px-4 sm:col-span-1 sm:col-start-2 sm:max-w-sm sm:self-start">
                {[
                  "left-0 border-l border-y",
                  "right-0 border-r border-y",
                ].map((cls) => (
                  <motion.span
                    key={cls}
                    aria-hidden="true"
                    className={`absolute inset-y-0 w-2.5 border-primary/80 ${cls}`}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.8, delay: 1, ease: EASE }}
                  />
                ))}
              <motion.div
                  className="grid grid-cols-2 gap-2"
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                  transition={{ delayChildren: 0.9 }}
                >
                  <motion.a variants={slideIn} href={t(links.cv)} download className={btn}>
                    <Download className="h-3.5 w-3.5" /> CV
                  </motion.a>
                  <motion.a variants={slideIn} href={`mailto:${links.email}`} className={btn}>
                    <Mail className="h-3.5 w-3.5" /> email
                  </motion.a>
                  <motion.a variants={slideIn} href={links.linkedin} target="_blank" rel="noreferrer" className={btn}>
                    <Linkedin className="h-3.5 w-3.5" /> linkedin
                  </motion.a>
                  <motion.a variants={slideIn} href={links.github} target="_blank" rel="noreferrer" className={btn}>
                    <Github className="h-3.5 w-3.5" /> github
                  </motion.a>
                </motion.div>
              </div>
            </div>

            <Reveal delay={0.4}>
              <div className="mt-5 border border-border p-4 backdrop-blur-[2px]">
                <p className="font-mono-math text-xs leading-relaxed text-muted-foreground xl:text-[12.5px] xl:leading-[1.7] 2xl:text-sm">
                  <span className="font-academic text-sm italic text-foreground">{t(ui.hero.abstract)}</span> {t(ui.hero.text)}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.6}>
              <div className="mt-4">
                <p className="font-mono-math mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-primary">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>
                  {t(ui.hero.nowLabel)}
                </p>
                <ul className="font-mono-math space-y-1.5 text-xs xl:text-[13px]">
                  {ui.hero.now.map((n) => (
                    <li key={n.org} className="flex flex-wrap gap-x-3">
                      <span className="font-semibold text-foreground">{n.org}</span>
                      <span className="text-muted-foreground">{t(n.role)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
          {/* Right: the three fields, each running its own animation */}
          <Reveal delay={0.3} >
            <TriStage n={1} />
          </Reveal>
        </div>
      </div>
    </section>
  );
};
