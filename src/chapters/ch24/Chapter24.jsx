/* ============================================================
   CHAPTER 24 — Black Holes and Curved Spacetime
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

import { EquivalencePrinciple } from "./stations/EquivalencePrinciple.jsx";
import { CurvedSpacetime } from "./stations/CurvedSpacetime.jsx";
import { TimeDilationRedshift } from "./stations/TimeDilationRedshift.jsx";
import { EventHorizon } from "./stations/EventHorizon.jsx";
import { SingularityNoHair } from "./stations/SingularityNoHair.jsx";
import { AccretionXrayBinary } from "./stations/AccretionXrayBinary.jsx";
import { TidalSpaghetti } from "./stations/TidalSpaghetti.jsx";
import { DetectingTheInvisible } from "./stations/DetectingTheInvisible.jsx";

const STR = {
  en: {
    eyebrow: "CHAPTER 24",
    title: "Black Holes and Curved Spacetime",
    tagline: "Eight short stations on Einstein's strangest prediction — the equivalence principle that ties gravity to acceleration, the mass that warps spacetime and bends starlight, clocks that slow and light that reddens in deep gravity, the event horizon and the Schwarzschild radius, the singularity and the no-hair rule, the X-ray glow of an accretion disk, the tides that spaghettify you, and the gravitational waves, shadows and orbiting stars that reveal the invisible. Then prove it in the Knowledge Check.",
    ctaText: "Ready to test yourself?",
    ctaBtn: "Knowledge Check →",
    footer: "Chapter 24 · every fact is real; the visuals are scaled for clarity, not accuracy.",
  },
  ja: {
    eyebrow: "第24章",
    title: "ブラックホールと曲がった時空",
    tagline: "アインシュタインの最も奇妙な予言をめぐる8つの短いステーション——重力と加速度を結ぶ等価原理、時空をゆがめて星の光を曲げる質量、深い重力の中で遅れる時計と赤くなる光、事象の地平面とシュヴァルツシルト半径、特異点と無毛のきまり、降着円盤のX線の輝き、あなたをスパゲッティ化する潮汐力、そして見えないものを明かす重力波・影・めぐる星々。そして「知識チェック」で力を試そう。",
    ctaText: "力試しの準備はいい？",
    ctaBtn: "知識チェック →",
    footer: "第24章 · 事実はすべて本物です。見た目は正確さより分かりやすさを優先しています。",
  },
};

const STATIONS = [
  { id: "equivalence", label: { en: "The Equivalence Principle", ja: "等価原理" }, sub: { en: "Gravity or acceleration?", ja: "重力か加速度か" }, C: EquivalencePrinciple },
  { id: "curved", label: { en: "Curved Spacetime", ja: "曲がった時空" }, sub: { en: "Mass bends light", ja: "質量が光を曲げる" }, C: CurvedSpacetime },
  { id: "timedilation", label: { en: "Time Dilation & Redshift", ja: "時間の遅れと赤方偏移" }, sub: { en: "Slow clocks, red light", ja: "遅い時計、赤い光" }, C: TimeDilationRedshift },
  { id: "horizon", label: { en: "The Event Horizon", ja: "事象の地平面" }, sub: { en: "Escape velocity = c", ja: "脱出速度 = c" }, C: EventHorizon },
  { id: "singularity", label: { en: "Singularity & No Hair", ja: "特異点と無毛" }, sub: { en: "Mass, spin, charge", ja: "質量・スピン・電荷" }, C: SingularityNoHair },
  { id: "accretion", label: { en: "X-ray Binaries", ja: "X線連星" }, sub: { en: "Seeing the unseen", ja: "見えないものを見る" }, C: AccretionXrayBinary },
  { id: "tides", label: { en: "Tides & Spaghetti", ja: "潮汐とスパゲッティ" }, sub: { en: "The deadly gradient", ja: "致命的な勾配" }, C: TidalSpaghetti },
  { id: "detecting", label: { en: "Detecting the Invisible", ja: "見えないものの検出" }, sub: { en: "Waves, shadows, orbits", ja: "波・影・軌道" }, C: DetectingTheInvisible },
];

const QUIZ_TAB = { id: "quiz", label: { en: "Knowledge Check", ja: "知識チェック" }, sub: { en: "Prove it", ja: "力試し" } };

function Chapter24Body({ lang, setLang }) {
  const shared = useT();
  const t = STR[lang];
  const [active, setActive] = useState("equivalence");
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
            <Quiz bank={questions} onExit={() => setActive("equivalence")} />
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

export default function Chapter24() {
  const [lang, setLang] = useState("en");
  return (
    <LangProvider lang={lang}>
      <Chapter24Body lang={lang} setLang={setLang} />
    </LangProvider>
  );
}
