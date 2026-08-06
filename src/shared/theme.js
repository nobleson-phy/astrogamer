/* ============================================================
   SHARED THEME — colors, fonts, motion
   ============================================================ */

export const C = {
  void: "#05060d", deep: "#0a0e1c", panel: "rgba(15,21,40,0.72)",
  border: "rgba(120,150,210,0.16)", borderBright: "rgba(140,175,235,0.35)",
  text: "#e9edf7", muted: "#aeb7d2", faint: "#8b96b8",
  sun: "#ffcf6b", sunDeep: "#f5a742", cool: "#63d3f0", violet: "#b58cf0",
  danger: "#ff7a6b", good: "#5fd39a",
};

export const FONT_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,300;0,400;0,600;1,300&family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&family=Noto+Sans+JP:wght@400;500;600&display=swap');";

export const display = "'Spectral', 'Noto Sans JP', Georgia, serif";
export const ui = "'Inter', 'Noto Sans JP', system-ui, sans-serif";
export const mono = "'Space Mono', 'Noto Sans JP', ui-monospace, monospace";

export const reduceMotion =
  typeof window !== "undefined" && window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
