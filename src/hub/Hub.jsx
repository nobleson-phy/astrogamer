/* ============================================================
   HUB — landing page listing the chapters of the course
   ============================================================ */
import React, { useState } from "react";
import { LangProvider, useLang, useT, tr } from "../shared/i18n.jsx";
import { C, display, ui, mono } from "../shared/theme.js";
import { styles } from "../shared/styles.js";
import { Starfield } from "../shared/Starfield.jsx";
import { LangBar, GlobalStyle } from "../shared/ui.jsx";

/* Add ch2, ch3 … by appending one entry here. */
const CHAPTERS = [
  {
    n: 1,
    title: { en: "Science and the Universe: A Brief Tour", ja: "科学と宇宙：ブリーフ・ツアー" },
    blurb: {
      en: "Meet the scale of the cosmos, the scientific method, and our place among the stars — the foundation for everything that follows.",
      ja: "宇宙のスケール、科学的手法、そして星々の中での私たちの位置を知ろう——この先すべての土台となる章です。",
    },
    href: "chapters/ch1/index.html",
  },
];

const MORE = { en: "More chapters coming", ja: "続く章は準備中" };
const CHAPTER_WORD = { en: "Chapter", ja: "第" };
const CHAPTER_SUFFIX = { en: "", ja: "章" };
const OPEN = { en: "Open chapter →", ja: "章をひらく →" };
const COURSE = { en: "The course", ja: "コース" };
const PICK = { en: "Choose a chapter to begin.", ja: "始めたい章を選ぼう。" };

const hubStyles = {
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18, marginTop: 12 },
  card: {
    display: "flex", flexDirection: "column", gap: 10, textDecoration: "none",
    background: "rgba(8,12,26,0.6)", border: `1px solid ${C.border}`, borderRadius: 16,
    padding: 24, color: C.text, transition: "all 0.15s", minHeight: 190,
  },
  cardNum: { fontFamily: mono, fontSize: 13, letterSpacing: 2, color: C.cool, textTransform: "uppercase" },
  cardTitle: { fontFamily: display, fontWeight: 400, fontSize: 24, lineHeight: 1.2, margin: 0 },
  cardBlurb: { color: C.muted, fontSize: 15.5, lineHeight: 1.55, flex: 1 },
  cardGo: { fontFamily: mono, fontSize: 14, color: C.sun, marginTop: 4 },
  soon: {
    display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 6,
    background: "rgba(8,12,26,0.35)", border: `1px dashed ${C.border}`, borderRadius: 16,
    padding: 24, color: C.faint, minHeight: 190, textAlign: "center",
  },
};

function HubBody({ lang, setLang }) {
  const s = useT();
  return (
    <div style={styles.root}>
      <GlobalStyle />
      <Starfield />
      <div style={styles.content}>
        <LangBar lang={lang} setLang={setLang} />
        <header style={styles.header}>
          <div style={styles.eyebrow}>{s.eyebrow}</div>
          <h1 style={styles.title}>Cosmic Explorer</h1>
          <p style={styles.tagline}>{s.tagline}</p>
        </header>

        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginTop: 8 }}>
          <div style={{ fontFamily: mono, fontSize: 13, letterSpacing: 2, color: C.cool, textTransform: "uppercase" }}>{tr(COURSE, lang)}</div>
          <div style={{ color: C.faint, fontSize: 14 }}>{tr(PICK, lang)}</div>
        </div>

        <div style={hubStyles.grid}>
          {CHAPTERS.map((ch) => (
            <a key={ch.n} href={ch.href} style={hubStyles.card}>
              <div style={hubStyles.cardNum}>
                {tr(CHAPTER_WORD, lang)} {ch.n}{tr(CHAPTER_SUFFIX, lang)}
              </div>
              <h2 style={hubStyles.cardTitle}>{tr(ch.title, lang)}</h2>
              <p style={hubStyles.cardBlurb}>{tr(ch.blurb, lang)}</p>
              <span style={hubStyles.cardGo}>{tr(OPEN, lang)}</span>
            </a>
          ))}
          <div style={hubStyles.soon}>
            <span style={{ fontFamily: display, fontSize: 20, color: C.muted }}>✦</span>
            <span>{tr(MORE, lang)}</span>
          </div>
        </div>

        <footer style={styles.footer}>{s.footer}</footer>
      </div>
    </div>
  );
}

export default function Hub() {
  const [lang, setLang] = useState("en");
  return (
    <LangProvider lang={lang}>
      <HubBody lang={lang} setLang={setLang} />
    </LangProvider>
  );
}
