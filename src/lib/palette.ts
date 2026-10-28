/** The accent colour (oxblood). Everything else is paper and ink. */
const ACCENT = { h: 350, s: 62, l: 38 };

/** Accent as "r,g,b", read by the canvases on every frame. */
export const ink = { rgb: "157,37,57" };

/** Sets the accent CSS variables; called once before the first render. */
export const applyAccent = () => {
  const root = document.documentElement.style;
  const accent = `${ACCENT.h} ${ACCENT.s}% ${ACCENT.l}%`;
  const tint = `${ACCENT.h} 60% 96%`;
  root.setProperty("--primary", accent);
  root.setProperty("--ring", accent);
  root.setProperty("--sidebar-primary", accent);
  root.setProperty("--sidebar-ring", accent);
  for (const v of ["--secondary", "--muted", "--accent", "--sidebar-accent"]) root.setProperty(v, tint);
};
