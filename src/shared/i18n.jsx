/* ============================================================
   SHARED i18n
   Translatable text is stored as { en, ja } and resolved with tr().
   LangCtx holds the active language code ("en" | "ja").
   SHARED holds the current-language chrome strings (useT()).
   Realm- and chapter-specific strings live next to their component.
   ============================================================ */
import React, { useState, useContext } from "react";

export const LangCtx = React.createContext("en");
export const useLang = () => useContext(LangCtx);

export const tr = (v, lang) =>
  v && typeof v === "object" && v.en !== undefined ? (v[lang] ?? v.en) : v;

/* Shared / chrome strings — NOT specific to any realm or chapter. */
export const SHARED = {
  en: {
    eyebrow: "AN INTERACTIVE JOURNEY THROUGH ASTRONOMY",
    tagline: "A chapter-by-chapter astronomy course. Set worlds in motion, forge a star, trace the constellations, and test what you learn along the way.",
    footer: "A prototype teaching tool · every fact is real, the visuals are scaled for clarity, not accuracy.",
    allChapters: "← All chapters",
  },
  ja: {
    eyebrow: "天文学をめぐるインタラクティブな旅",
    tagline: "章を追って進む天文学コース。惑星をめぐらせ、星を生み出し、星座をたどり、進みながら学びを試そう。",
    footer: "学習用のプロトタイプです · 事実はすべて本物ですが、見た目は正確さより分かりやすさを優先しています。",
    allChapters: "← 章の一覧",
  },
};

/* Provider wrapper — pass a [lang, setLang] state or just lang. */
export function LangProvider({ lang, children }) {
  return <LangCtx.Provider value={lang}>{children}</LangCtx.Provider>;
}

/* Hook returning the current-language shared strings. */
export function useT() {
  const lang = useLang();
  return SHARED[lang] ?? SHARED.en;
}
