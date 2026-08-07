/* ============================================================
   SHARED SMALL UI COMPONENTS
   ============================================================ */
import React from "react";
import { styles } from "./styles.js";
import { C, ui, FONT_IMPORT } from "./theme.js";

export function InfoPanel({ children }) {
  return <aside style={styles.panel}>{children}</aside>;
}

export function Row({ k, v }) {
  return (
    <div style={styles.row}>
      <dt style={styles.dt}>{k}</dt>
      <dd style={styles.dd}>{v}</dd>
    </div>
  );
}

/* A language toggle bar (EN / 日本語). Pass current lang + setter. */
export function LangBar({ lang, setLang }) {
  return (
    <div style={styles.langBar}>
      {[["en", "EN"], ["ja", "日本語"]].map(([code, label]) => (
        <button key={code} onClick={() => setLang(code)}
          style={{ ...styles.chip, ...(lang === code ? styles.chipOn : {}) }}>{label}</button>
      ))}
    </div>
  );
}

/* Global one-time <style> block: font import + focus + range styling. */
export function GlobalStyle() {
  return (
    <style>{`
      ${FONT_IMPORT}
      * { box-sizing: border-box; }
      button { font-family: ${ui}; }
      button:focus-visible, [tabindex]:focus-visible { outline: 2px solid ${C.cool}; outline-offset: 2px; }
      input[type=range] { -webkit-appearance: none; appearance: none; background: transparent; }
      input[type=range]::-webkit-slider-runnable-track { height: 4px; background: rgba(120,150,210,0.3); border-radius: 4px; }
      input[type=range]::-moz-range-track { height: 4px; background: rgba(120,150,210,0.3); border-radius: 4px; }
      input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 18px; height: 18px; border-radius: 50%; background: ${C.sun}; margin-top: -7px; cursor: pointer; box-shadow: 0 0 12px rgba(255,207,107,0.6); }
      input[type=range]::-moz-range-thumb { width: 18px; height: 18px; border: none; border-radius: 50%; background: ${C.sun}; cursor: pointer; }
    `}</style>
  );
}
