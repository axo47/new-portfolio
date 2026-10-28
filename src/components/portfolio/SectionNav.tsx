import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { List, X } from "lucide-react";
import { ui } from "@/data/content";
import { useLang } from "@/hooks/useLang";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "top", label: "0.1" },
  { id: "intersection", label: "0.2" },
  { id: "education", label: "0.3" },
  { id: "research", label: "1" },
  { id: "experience", label: "2" },
  { id: "skills", label: "3" },
  { id: "awards", label: "4" },
  { id: "contact", label: "5" },
];

/** Which section is under the top third of the screen (the last one once the page bottom is reached). */
const useCurrentSection = () => {
  const [current, setCurrent] = useState(SECTIONS[0].id);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.3;
      let id = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= y) id = s.id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) id = SECTIONS[SECTIONS.length - 1].id;
      setCurrent(id);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return current;
};

/**
 * Section shortcuts, always on screen:
 *  - computers: a rail of section numbers on the right edge, names appear on hover
 *  - phones: a floating button at the bottom right that opens the list upward
 */
export const SectionNav = () => {
  const { t } = useLang();
  const current = useCurrentSection();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  const name = (id: string) => t(ui.nav[id]);
  const label = SECTIONS.find((s) => s.id === current)?.label ?? "0.1";

  return (
    <>
      {/* computers */}
      <nav aria-label="Sections" className="font-mono-math fixed right-1.5 top-1/2 z-40 hidden -translate-y-1/2 md:block xl:right-3">
        <ul className="flex flex-col items-end gap-1">
          {SECTIONS.map((s) => {
            const on = current === s.id;
            return (
              <li key={s.id} className="relative">
                <a
                  href={`#${s.id}`}
                  aria-label={name(s.id)}
                  aria-current={on ? "true" : undefined}
                  className={cn(
                    "group flex items-center gap-1.5 rounded-sm px-1.5 py-1 text-[10px] tabular-nums transition-colors",
                    on ? "text-primary" : "text-muted-foreground hover:text-primary",
                  )}
                >
                  <span className={cn(on && "font-semibold")}>{s.label}</span>
                  <span className={cn("block h-px bg-current transition-all duration-300", on ? "w-3.5" : "w-1.5 group-hover:w-3")} />
                  <span className="pointer-events-none absolute right-full top-1/2 mr-1 hidden -translate-y-1/2 whitespace-nowrap rounded-sm border border-border bg-background/95 px-2 py-1 text-[11px] text-foreground shadow-sm backdrop-blur-sm group-hover:block group-focus-visible:block">
                    {name(s.id)}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* phones and small tablets */}
      <div ref={box} className="font-mono-math fixed bottom-4 right-4 z-50 md:hidden" style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}>
        <AnimatePresence>
          {open && (
            <motion.ul
              role="menu"
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="absolute bottom-full right-0 mb-2 w-60 origin-bottom-right border border-border bg-background/95 py-1 text-sm shadow-md backdrop-blur-md"
            >
              {SECTIONS.map((s) => (
                <li key={s.id} role="none">
                  <a
                    role="menuitem"
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-baseline gap-3 px-4 py-3 transition-colors active:bg-secondary",
                      current === s.id ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    <span className="w-14 shrink-0 whitespace-nowrap text-primary">§ {s.label}</span>
                    <span className={cn(current === s.id && "font-semibold")}>{name(s.id)}</span>
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-haspopup="menu"
          aria-label="Sections"
          className="flex h-12 items-center gap-2.5 rounded-full border border-primary bg-primary px-4 text-xs font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-transform active:scale-95"
        >
          {open ? <X className="h-4 w-4" /> : <List className="h-4 w-4" />}
          <span>§ {label}</span>
        </button>
      </div>
    </>
  );
};
