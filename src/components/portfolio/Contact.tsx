import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { links, ui } from "@/data/content";
import { useLang } from "@/hooks/useLang";
import { useVisible } from "@/hooks/useVisible";
import { SectionLabel } from "./shared";

// small helpers so the source below reads like the LaTeX it imitates
const LINE_COUNT = 16;

const Cmd = ({ children }: { children: string }) => <span className="text-primary">{children}</span>;
const Br = ({ children }: { children: string }) => <span className="text-muted-foreground">{children}</span>;
const Note = ({ children }: { children: ReactNode }) => <span className="italic text-muted-foreground">{children}</span>;
const A = ({ href, children, external, download }: { href: string; children: ReactNode; external?: boolean; download?: boolean }) => (
  <a
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    download={download ? true : undefined}
    className="text-foreground underline decoration-primary/40 decoration-1 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
  >
    {children}
  </a>
);

export const Contact = () => {
  const { t, lang } = useLang();
  const [copied, setCopied] = useState(false);
  // one scene: the source is typed line by line, then compiled, and only then does the PDF appear
  const [gridRef, shown] = useVisible<HTMLDivElement>({ amount: 0.35, bottom: 40 });
  const [stage, setStage] = useState<"idle" | "typing" | "compiling" | "done">("idle");
  const [cur, setCur] = useState(-1);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable: the mailto link still works */
    }
  };

  const LINE_MS = 260;
  useEffect(() => {
    if (!shown) {
      setStage("idle");
      setCur(-1);
      return;
    }
    let i = 0, tm = 0;
    setStage("typing");
    setCur(0);
    const iv = window.setInterval(() => {
      i += 1;
      if (i >= LINE_COUNT) {
        window.clearInterval(iv);
        setCur(-1);
        setStage("compiling");
        tm = window.setTimeout(() => setStage("done"), 1600);
      } else setCur(i);
    }, LINE_MS);
    return () => {
      window.clearInterval(iv);
      window.clearTimeout(tm);
    };
  }, [shown]);

  const cvFile = links.cv[lang].split("/").pop() ?? "CV.pdf";

  // one entry per source line; null is an empty line
  const lines: (ReactNode | null)[] = [
    <Note key="c">% {t({ fr: "Correspondance", en: "Correspondence" })}</Note>,
    <>
      <Cmd>\author</Cmd>
      <Br>{"{"}</Br>Kevin Ezzedine<Br>{"}"}</Br>
    </>,
    <>
      <Cmd>\affil</Cmd>
      <Br>{"{"}</Br>Polytechnique Montréal <Cmd>\and</Cmd> Université de Montréal<Br>{"}"}</Br>
    </>,
    <>
      <Cmd>\email</Cmd>
      <Br>{"{"}</Br>
      <A href={`mailto:${links.email}`}>{links.email}</A>
      <Br>{"}"}</Br>{" "}
      <button onClick={copy} className="cursor-pointer border-none bg-transparent p-0 italic text-muted-foreground transition-colors hover:text-primary">
        % {copied ? t(ui.contact.copied) : t({ fr: "copier", en: "copy" })}
      </button>
    </>,
    null,
    <>
      <Cmd>\begin</Cmd>
      <Br>{"{"}</Br>thebibliography<Br>{"}{"}</Br>9<Br>{"}"}</Br>
    </>,
    <>
      {"  "}
      <Cmd>\bibitem</Cmd>
      <Br>{"{"}</Br>linkedin<Br>{"}"}</Br> LinkedIn. <Cmd>\url</Cmd>
      <Br>{"{"}</Br>
      <A href={links.linkedin} external>linkedin.com/in/kevin-ezzedine</A>
      <Br>{"}"}</Br>
    </>,
    <>
      {"  "}
      <Cmd>\bibitem</Cmd>
      <Br>{"{"}</Br>github<Br>{"}"}</Br> GitHub. <Cmd>\url</Cmd>
      <Br>{"{"}</Br>
      <A href={links.github} external>github.com/Axo47</A>
      <Br>{"}"}</Br>
    </>,
    <>
      {"  "}
      <Cmd>\bibitem</Cmd>
      <Br>{"{"}</Br>cv<Br>{"}"}</Br> {t({ fr: "Curriculum vitae (français)", en: "Curriculum vitae (English)" })}. <Cmd>\href</Cmd>
      <Br>{"{"}</Br>
      <A href={links.cv[lang]} download>{cvFile}</A>
      <Br>{"}{"}</Br>PDF<Br>{"}"}</Br>
    </>,
    <>
      <Cmd>\end</Cmd>
      <Br>{"{"}</Br>thebibliography<Br>{"}"}</Br>
    </>,
    null,
    <>
      <Cmd>\begin</Cmd>
      <Br>{"{"}</Br>quote<Br>{"}"}</Br>
    </>,
    <>
      {"  "}
      <span className="italic text-muted-foreground">{t(ui.contact.quote).replace(/[«»"]/g, "").trim()}</span>
    </>,
    <>
      {"  "}
      <Note>{ui.contact.author}</Note>
    </>,
    <>
      <Cmd>\end</Cmd>
      <Br>{"{"}</Br>quote<Br>{"}"}</Br>
    </>,
    <>
      <Cmd>\qed</Cmd> <Note>% ∎</Note>
    </>,
  ];

  return (
    <footer id="contact" className="relative py-10 md:py-14">
      <div className="container mx-auto px-6 md:px-12">
        <SectionLabel label={t(ui.contact.label)} />

        <div ref={gridRef} className="mx-auto grid max-w-3xl">
        {/* the source, until pdflatex is done: then the PDF takes its place */}
        <motion.div
          initial={false}
          animate={stage === "done" ? { opacity: 0, scale: 0.96, filter: "blur(6px)", visibility: "hidden" } : { opacity: 1, scale: 1, filter: "blur(0px)", visibility: "visible" }}
          transition={{ duration: stage === "done" ? 0.5 : 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="col-start-1 row-start-1 min-w-0 border border-border"
        >
          <div className="font-mono-math relative flex items-center justify-between border-b border-border px-4 py-2 text-sm text-muted-foreground">
            <span>contact.tex</span>
            <span className={stage === "compiling" ? "text-primary" : undefined}>
              {stage === "compiling" ? "pdflatex contact.tex …" : stage === "done" ? "✓ 0 errors" : "LaTeX"}
            </span>
            {/* the compile bar fills while pdflatex runs */}
            <motion.span
              aria-hidden="true"
              className="absolute -bottom-px left-0 h-px w-full origin-left bg-primary"
              initial={false}
              animate={{ scaleX: stage === "compiling" || stage === "done" ? 1 : 0, opacity: stage === "done" ? 0 : 1 }}
              transition={{ scaleX: { duration: stage === "compiling" ? 1.5 : 0, ease: "easeInOut" }, opacity: { duration: 0.6 } }}
            />
          </div>
          <ol className="font-mono-math py-3 text-sm leading-[1.9] sm:text-base">
            {lines.map((ln, i) => (
              // each line is typed out left to right, one after another
              <motion.li
                key={i}
                className="flex gap-4 px-4"
                initial={false}
                animate={stage === "idle" ? { clipPath: "inset(0 100% 0 0)", opacity: 0 } : { clipPath: "inset(0 0% 0 0)", opacity: 1 }}
                transition={{ duration: stage === "idle" ? 0.2 : 0.4, delay: stage === "idle" ? 0 : i * (LINE_MS / 1000), ease: "easeOut" }}
              >
                <span className="w-5 shrink-0 select-none text-right text-muted-foreground/60">{i + 1}</span>
                <span className="min-w-0 flex-1 whitespace-pre-wrap break-words pl-[2ch] [text-indent:-2ch]">
                  {ln ?? " "}
                  {cur === i && <span className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-pulse bg-primary" aria-hidden="true" />}
                </span>
              </motion.li>
            ))}
          </ol>
        </motion.div>


        {/* what the source compiles to */}
        <motion.div
          initial={false}
          animate={stage === "done" ? { opacity: 1, scale: 1, filter: "blur(0px)", visibility: "visible" } : { opacity: 0, scale: 1.03, filter: "blur(6px)", visibility: "hidden" }}
          transition={{ duration: stage === "done" ? 0.7 : 0.2, delay: stage === "done" ? 0.25 : 0, ease: [0.16, 1, 0.3, 1] }}
          className="col-start-1 row-start-1 flex min-w-0 flex-col border border-border"
        >
          <div className="font-mono-math flex items-center justify-between border-b border-border px-4 py-2 text-sm text-muted-foreground">
            <span>contact.pdf</span>
            <span className="text-primary">✓ compiled</span>
          </div>
          <div className="font-academic flex flex-1 flex-col px-7 pb-5 pt-9 text-base leading-[1.55] sm:px-10 sm:text-xl">
            <div className="text-center">
              <p className="text-3xl sm:text-4xl">Kevin Ezzedine</p>
              <p className="mt-2 italic text-muted-foreground">
                Polytechnique Montréal {t({ fr: "et", en: "and" })} Université de Montréal
              </p>
              <a
                href={`mailto:${links.email}`}
                className="font-mono-math mt-2 inline-block break-all text-base text-foreground underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
              >
                {links.email}
              </a>
            </div>

            <p className="mt-9 text-2xl font-semibold">{t(ui.contact.refs)}</p>
            <ol className="mt-2 space-y-1.5">
              {[
                { n: 1, text: "LinkedIn.", href: links.linkedin, label: "linkedin.com/in/kevin-ezzedine", external: true },
                { n: 2, text: "GitHub.", href: links.github, label: "github.com/Axo47", external: true },
                { n: 3, text: `${t({ fr: "Curriculum vitae (français)", en: "Curriculum vitae (English)" })}.`, href: links.cv[lang], label: cvFile, download: true },
              ].map((r) => (
                <li key={r.n} className="flex gap-2 pl-1">
                  <span className="w-7 shrink-0">[{r.n}]</span>
                  <span className="min-w-0">
                    {r.text}{" "}
                    <a
                      href={r.href}
                      target={r.external ? "_blank" : undefined}
                      rel={r.external ? "noopener noreferrer" : undefined}
                      download={r.download ? true : undefined}
                      className="font-mono-math block break-all text-base text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary sm:inline"
                    >
                      {r.label}
                    </a>
                  </span>
                </li>
              ))}
            </ol>

            <blockquote className="mx-6 mt-8 italic text-muted-foreground sm:mx-10">
              {t(ui.contact.quote).replace(/[«»"]/g, "").trim()}
              <span className="mt-1 block not-italic">— Paul Halmos</span>
            </blockquote>

            <div className="mt-auto pt-8">
              <p className="text-right text-2xl leading-none text-primary" aria-label="QED">∎</p>
              <p className="mt-4 text-center text-base text-muted-foreground">1</p>
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    </footer>
  );
};
