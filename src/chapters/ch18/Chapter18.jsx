/* ============================================================
   CHAPTER 18 — The Stars: A Celestial Census
   Eight interactive stations + a Knowledge Check (shared Quiz).
   ============================================================ */
import React, { useState } from "react";
import { LangProvider, useLang, useT, tr } from "../../shared/i18n.jsx";
import { C, display, mono } from "../../shared/theme.js";
import { styles } from "../../shared/styles.js";
import { Starfield } from "../../shared/Starfield.jsx";
import { LangBar, GlobalStyle } from "../../shared/ui.jsx";
import { Quiz } from "../../shared/Quiz.jsx";
import questions from "./questions.js";

import { LocalCensus } from "./stations/LocalCensus.jsx";
import { BinaryTypes } from "./stations/BinaryTypes.jsx";
import { WeighingStars } from "./stations/WeighingStars.jsx";
import { EclipsingBinaries } from "./stations/EclipsingBinaries.jsx";
import { MassThreshold } from "./stations/MassThreshold.jsx";
import { MeasuringSizes } from "./stations/MeasuringSizes.jsx";
import { HRDiagram } from "./stations/HRDiagram.jsx";
import { MainSequenceLives } from "./stations/MainSequenceLives.jsx";

const STR = {
  en: {
    eyebrow: "CHAPTER 18",
    title: "The Stars: A Celestial Census",
    tagline: "Eight short stations on taking stock of the stars — the light-year and our red-dwarf-dominated neighborhood, the binary systems that let us weigh stars, eclipsing pairs that reveal their sizes, the mass threshold that separates stars from brown dwarfs, how we measure stellar diameters and meet white dwarfs, the great map that is the H–R diagram, and why mass rules a star's whole life. Then prove it in the Knowledge Check.",
    ctaText: "Ready to test yourself?",
    ctaBtn: "Knowledge Check →",
    footer: "Chapter 18 · every fact is real; the visuals are scaled for clarity, not accuracy.",
  },
  ja: {
    eyebrow: "第18章",
    title: "星々：天の国勢調査",
    tagline: "星を数え上げることをめぐる8つの短いステーション——光年と赤色矮星が支配する近傍、星の質量を測らせる連星系、大きさを明かす食連星、星と褐色矮星を分ける質量のしきい値、星の直径の測り方と白色矮星、偉大な地図であるH–R図、そしてなぜ質量が星の一生を支配するのか。そして「知識チェック」で力を試そう。",
    ctaText: "力試しの準備はいい？",
    ctaBtn: "知識チェック →",
    footer: "第18章 · 事実はすべて本物です。見た目は正確さより分かりやすさを優先しています。",
  },
};

const STATIONS = [
  { id: "census", label: { en: "The Local Census", ja: "近傍の国勢調査" }, sub: { en: "Red dwarfs rule", ja: "赤色矮星が主役" }, C: LocalCensus },
  { id: "binaries", label: { en: "Binary Star Types", ja: "連星の種類" }, sub: { en: "Visual & spectroscopic", ja: "実視と分光" }, C: BinaryTypes },
  { id: "weighing", label: { en: "Weighing Stars", ja: "星の重さを測る" }, sub: { en: "Kepler & mass-luminosity", ja: "ケプラーと質量光度" }, C: WeighingStars },
  { id: "eclipsing", label: { en: "Eclipsing Binaries", ja: "食連星" }, sub: { en: "Sizes from light curves", ja: "光度曲線から大きさ" }, C: EclipsingBinaries },
  { id: "threshold", label: { en: "The Mass Threshold", ja: "質量のしきい値" }, sub: { en: "Stars vs brown dwarfs", ja: "星と褐色矮星" }, C: MassThreshold },
  { id: "sizes", label: { en: "Measuring Stellar Sizes", ja: "星の大きさを測る" }, sub: { en: "Occultation & white dwarfs", ja: "掩蔽と白色矮星" }, C: MeasuringSizes },
  { id: "hr", label: { en: "The H–R Diagram", ja: "H–R図" }, sub: { en: "The great map", ja: "偉大な地図" }, C: HRDiagram },
  { id: "lives", label: { en: "Mass Rules Their Lives", ja: "質量が一生を支配" }, sub: { en: "Main sequence & lifespans", ja: "主系列と寿命" }, C: MainSequenceLives },
];

const QUIZ_TAB = { id: "quiz", label: { en: "Knowledge Check", ja: "知識チェック" }, sub: { en: "Prove it", ja: "力試し" } };

function Chapter18Body({ lang, setLang }) {
  const shared = useT();
  const t = STR[lang];
  const [active, setActive] = useState("census");
  const isQuiz = active === "quiz";
  const Station = STATIONS.find((s) => s.id === active)?.C;

  return (
    <div style={styles.root}>
      <GlobalStyle />
      <Starfield />
      <div style={styles.content}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, gap: 12 }}>
          <a href="../../index.html" style={{ color: C.muted, textDecoration: "none", fontSize: 15 }}>
            {shared.allChapters}
          </a>
          <LangBar lang={lang} setLang={setLang} />
        </div>

        <header style={styles.header}>
          <div style={styles.eyebrow}>{t.eyebrow}</div>
          <h1 style={{ ...styles.title, fontSize: "clamp(30px, 6vw, 54px)" }}>{t.title}</h1>
          <p style={styles.tagline}>{t.tagline}</p>
        </header>

        <nav style={styles.nav}>
          {STATIONS.map((s, i) => {
            const on = active === s.id;
            return (
              <button key={s.id} onClick={() => setActive(s.id)} style={{ ...styles.tab, ...(on ? styles.tabOn : {}) }}>
                <span style={styles.tabLabel}>{String(i + 1).padStart(2, "0")} · {tr(s.label, lang)}</span>
                <span style={styles.tabSub}>{tr(s.sub, lang)}</span>
              </button>
            );
          })}
          <button
            onClick={() => setActive("quiz")}
            style={{ ...styles.tab, ...(isQuiz ? styles.tabOn : {}), borderColor: isQuiz ? C.borderBright : "rgba(255,207,107,0.35)" }}
          >
            <span style={{ ...styles.tabLabel, color: C.sun }}>★ {tr(QUIZ_TAB.label, lang)}</span>
            <span style={styles.tabSub}>{tr(QUIZ_TAB.sub, lang)}</span>
          </button>
        </nav>

        <main style={styles.stage}>
          {isQuiz ? (
            <Quiz bank={questions} onExit={() => setActive("census")} />
          ) : (
            Station && <Station />
          )}
        </main>

        {!isQuiz && (
          <div style={styles.verifyCta}>
            <span style={styles.verifyText}>{t.ctaText}</span>
            <button style={styles.verifyBtn} onClick={() => setActive("quiz")}>{t.ctaBtn}</button>
          </div>
        )}

        <footer style={styles.footer}>{t.footer}</footer>
      </div>
    </div>
  );
}

export default function Chapter18() {
  const [lang, setLang] = useState("en");
  return (
    <LangProvider lang={lang}>
      <Chapter18Body lang={lang} setLang={setLang} />
    </LangProvider>
  );
}
