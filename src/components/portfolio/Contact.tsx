import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { links, ui } from "@/data/content";
import { useLang } from "@/hooks/useLang";
import { useVisible } from "@/hooks/useVisible";
import { SectionLabel, Show, slideIn } from "./shared";

// small helpers so the source below reads like the LaTeX it imitates
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
  const [pdfRef, pdfShown] = useVisible<HTMLDivElement>({ amount: 0.2, bottom: 40 });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable: the mailto link still works */
    }
  };

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
    <footer id="contact" className="relative py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-12">
        <SectionLabel label={t(ui.contact.label)} />

        <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="min-w-0 border border-border">
          <div className="font-mono-math flex items-center justify-between border-b border-border px-4 py-2 text-[11px] text-muted-foreground">
            <span>contact.tex</span>
            <span>LaTeX</span>
          </div>
          <Show as="ol" once={false} className="font-mono-math py-3 text-[11.5px] leading-[1.9] sm:text-[13px]">
            {lines.map((ln, i) => (
              <motion.li key={i} variants={slideIn} className="flex gap-4 px-4">
                <span className="w-5 shrink-0 select-none text-right text-muted-foreground/60">{i + 1}</span>
                <span className="min-w-0 flex-1 whitespace-pre-wrap break-words pl-[2ch] [text-indent:-2ch]">{ln ?? " "}</span>
              </motion.li>
            ))}
          </Show>
        </div>

        {/* what the source compiles to */}
        <motion.div
          ref={pdfRef}
          initial={false}
          animate={pdfShown ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.8, delay: pdfShown ? 0.9 : 0, ease: [0.16, 1, 0.3, 1] }}
          className="flex min-w-0 flex-col border border-border"
        >
          <div className="font-mono-math flex items-center justify-between border-b border-border px-4 py-2 text-[11px] text-muted-foreground">
            <span>contact.pdf</span>
            <span className="text-primary">✓ compiled</span>
          </div>
          <div className="font-academic flex flex-1 flex-col px-7 pb-5 pt-9 text-[15px] leading-[1.55] sm:px-10 sm:text-base">
            <div className="text-center">
              <p className="text-3xl sm:text-4xl">Kevin Ezzedine</p>
              <p className="mt-2 italic text-muted-foreground">
                Polytechnique Montréal {t({ fr: "et", en: "and" })} Université de Montréal
              </p>
              <a
                href={`mailto:${links.email}`}
                className="font-mono-math mt-2 inline-block break-all text-[12.5px] text-foreground underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
              >
                {links.email}
              </a>
            </div>

            <p className="mt-9 text-lg font-semibold">{t(ui.contact.refs)}</p>
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
                      className="font-mono-math block break-all text-[12.5px] text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary sm:inline"
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
              <p className="text-right text-xl leading-none text-primary" aria-label="QED">∎</p>
              <p className="mt-4 text-center text-xs text-muted-foreground">1</p>
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    </footer>
  );
};
