import { useEffect, useRef, type ReactNode } from "react";
import { animate, motion, useInView } from "framer-motion";

/** The portfolio's one entrance animation: each block fades in from a blur as it enters view. */
export const Reveal = ({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: false, margin: "-60px" }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
  >
    {children}
  </motion.div>
);

export const SectionLabel = ({ label, center = false }: { label: string; center?: boolean }) => (
  <Reveal className={center ? "mb-10 text-center" : "mb-8"}>
    <p className="section-number">{label}</p>
  </Reveal>
);

/** Renders **bold**, *italic* and `code` segments from the content data. */
export const RichText = ({ text }: { text: string }) => (
  <>
    {text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g).map((part, i) => {
      if (part.startsWith("**")) return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
      if (part.startsWith("*")) return <em key={i} className="text-foreground">{part.slice(1, -1)}</em>;
      if (part.startsWith("`"))
        return (
          <code key={i} className="rounded-sm bg-secondary px-1 py-0.5 text-primary">
            {part.slice(1, -1)}
          </code>
        );
      return <span key={i}>{part}</span>;
    })}
  </>
);

export const CountUp = ({ value, suffix = "", decimals = 0 }: { value: number; suffix?: string; decimals?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  const zero = `${(0).toFixed(decimals)}${suffix}`;

  // counts up each time it comes into view, and goes back to zero when it leaves
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!inView) {
      el.textContent = zero;
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = `${decimals ? v.toFixed(decimals) : Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix, decimals, zero]);

  return <span ref={ref}>{zero}</span>;
};

/** Stagger container/children shared by lists that animate their parts in sequence. */
export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
export const slideIn = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};
export const pop = {
  hidden: { opacity: 0, scale: 0.7, y: 6 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 320, damping: 18 } },
};
