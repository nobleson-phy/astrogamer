/* ============================================================
   SHARED THEME — colors, fonts, motion
   ============================================================ */

export const C = {
  void: "#05060d", deep: "#0a0e1c", panel: "rgba(18,25,48,0.74)",
  border: "rgba(130,160,220,0.22)", borderBright: "rgba(150,188,248,0.45)",
  text: "#f4f7ff", muted: "#c6cff4", faint: "#a2aee0",
  sun: "#ffd23d", sunDeep: "#ff9e2c", cool: "#3fddff", violet: "#c98bff",
  danger: "#ff6b6b", good: "#3fe89b",
};

export const FONT_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,300;0,400;0,600;1,300&family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&family=Noto+Sans+JP:wght@400;500;600&display=swap');";

export const display = "'Spectral', 'Noto Sans JP', Georgia, serif";
export const ui = "'Inter', 'Noto Sans JP', system-ui, sans-serif";
export const mono = "'Space Mono', 'Noto Sans JP', ui-monospace, monospace";

export const reduceMotion =
  typeof window !== "undefined" && window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
