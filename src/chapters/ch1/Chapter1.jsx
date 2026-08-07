/* ============================================================
   CHAPTER 1 — Science and the Universe
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

import { HowWeKnow } from "./stations/HowWeKnow.jsx";
import { ScaleNotation } from "./stations/ScaleNotation.jsx";
import { LightTravel } from "./stations/LightTravel.jsx";
import { CosmicCalendar } from "./stations/CosmicCalendar.jsx";
import { LargeScale } from "./stations/LargeScale.jsx";
import { TheVerySmall } from "./stations/TheVerySmall.jsx";
import { Stardust } from "./stations/Stardust.jsx";
import { InverseSquare } from "./stations/InverseSquare.jsx";

const STR = {
  en: {
    eyebrow: "CHAPTER 1",
    title: "Science and the Universe",
    tagline: "Eight short stations on how we know the cosmos — then prove it in the Knowledge Check.",
    ctaText: "Ready to test yourself?",
    ctaBtn: "Knowledge Check →",
    footer: "Chapter 1 · every fact is real; the visuals are scaled for clarity, not accuracy.",
  },
  ja: {
    eyebrow: "第1章",
    title: "科学と宇宙",
    tagline: "宇宙をどう知るかをめぐる8つの短いステーション——そして「知識チェック」で力を試そう。",
    ctaText: "力試しの準備はいい？",
    ctaBtn: "知識チェック →",
    footer: "第1章 · 事実はすべて本物です。見た目は正確さより分かりやすさを優先しています。",
  },
};

const STATIONS = [
  { id: "know", label: { en: "How We Know", ja: "どう分かるか" }, sub: { en: "Nature of science", ja: "科学の本質" }, C: HowWeKnow },
  { id: "scale", label: { en: "Scale & Notation", ja: "スケールと記数法" }, sub: { en: "Powers of ten", ja: "10のべき乗" }, C: ScaleNotation },
  { id: "light", label: { en: "Light Travel", ja: "光の旅" }, sub: { en: "Look back in time", ja: "過去を見る" }, C: LightTravel },
  { id: "calendar", label: { en: "Cosmic Calendar", ja: "宇宙カレンダー" }, sub: { en: "13.8 Gyr in a year", ja: "138億年を1年に" }, C: CosmicCalendar },
  { id: "large", label: { en: "Large-Scale Universe", ja: "大規模な宇宙" }, sub: { en: "Galaxies to CMB", ja: "銀河から背景放射へ" }, C: LargeScale },
  { id: "small", label: { en: "The Very Small", ja: "極小の世界" }, sub: { en: "Atoms & forces", ja: "原子と力" }, C: TheVerySmall },
  { id: "stardust", label: { en: "Made of Stardust", ja: "星の塵" }, sub: { en: "Cosmic recycling", ja: "宇宙のリサイクル" }, C: Stardust },
  { id: "inverse", label: { en: "Inverse-Square Law", ja: "逆二乗の法則" }, sub: { en: "1 / distance²", ja: "1 / 距離²" }, C: InverseSquare },
];

const QUIZ_TAB = { id: "quiz", label: { en: "Knowledge Check", ja: "知識チェック" }, sub: { en: "Prove it", ja: "力試し" } };

function Chapter1Body({ lang, setLang }) {
  const shared = useT();
  const t = STR[lang];
  const [active, setActive] = useState("know");
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
          <h1 style={{ ...styles.title, fontSize: "clamp(32px, 6vw, 56px)" }}>{t.title}</h1>
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
            <Quiz bank={questions} onExit={() => setActive("know")} />
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

export default function Chapter1() {
  const [lang, setLang] = useState("en");
  return (
    <LangProvider lang={lang}>
      <Chapter1Body lang={lang} setLang={setLang} />
    </LangProvider>
  );
}
