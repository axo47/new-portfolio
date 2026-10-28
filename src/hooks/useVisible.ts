import { useEffect, useRef, useState } from "react";

interface Opts {
  /** share of the element (or of the screen, for tall elements) that must be on screen, 0 to 1 */
  amount?: number;
  /** px cut from the top / bottom of the screen before an element counts as visible */
  top?: number;
  bottom?: number;
  /** stay visible once seen */
  once?: boolean;
}

/**
 * True while the element is on screen. It reads the element's position on scroll, resize and a slow timer,
 * instead of using IntersectionObserver: Safari on iPhone never reports SVG elements and is late with others,
 * which left parts of the page stuck invisible.
 */
export const useVisible = <T extends Element>({ amount = 0.15, top = 0, bottom = 0, once = false }: Opts = {}) => {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const lo = top, hi = vh - bottom;
      const shown = Math.min(r.bottom, hi) - Math.max(r.top, lo);
      const need = amount <= 0 ? 0.5 : Math.min(r.height, hi - lo) * amount;
      const on = r.width > 0 && shown >= need && shown > 0;
      setVisible((prev) => (once && prev ? true : on));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    schedule();
    const timer = window.setInterval(schedule, 500);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("orientationchange", schedule);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(timer);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("orientationchange", schedule);
    };
  }, [amount, top, bottom, once]);

  return [ref, visible] as const;
};
