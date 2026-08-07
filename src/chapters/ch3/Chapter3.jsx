/* ============================================================
   CHAPTER 3 — Orbits and Gravity
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

import { TychoKepler } from "./stations/TychoKepler.jsx";
import { Ellipse } from "./stations/Ellipse.jsx";
import { EqualAreas } from "./stations/EqualAreas.jsx";
import { ThirdLaw } from "./stations/ThirdLaw.jsx";
import { NewtonsLaws } from "./stations/NewtonsLaws.jsx";
import { Gravitation } from "./stations/Gravitation.jsx";
import { AngularMomentum } from "./stations/AngularMomentum.jsx";
import { Spaceflight } from "./stations/Spaceflight.jsx";

const STR = {
  en: {
    eyebrow: "CHAPTER 3",
    title: "Orbits and Gravity",
    tagline: "Eight short stations on how planets move and why they stay bound to the Sun — from Kepler's ellipses to escape speed — then prove it in the Knowledge Check.",
    ctaText: "Ready to test yourself?",
    ctaBtn: "Knowledge Check →",
    footer: "Chapter 3 · every fact is real; the visuals are scaled for clarity, not accuracy.",
  },
  ja: {
    eyebrow: "第3章",
    title: "軌道と重力",
    tagline: "惑星がどう動き、なぜ太陽につなぎとめられているのか——ケプラーの楕円から脱出速度まで——をめぐる8つの短いステーション。そして「知識チェック」で力を試そう。",
    ctaText: "力試しの準備はいい？",
    ctaBtn: "知識チェック →",
    footer: "第3章 · 事実はすべて本物です。見た目は正確さより分かりやすさを優先しています。",
  },
};

const STATIONS = [
  { id: "tychokepler", label: { en: "Tycho & Kepler", ja: "ティコとケプラー" }, sub: { en: "Circles to ellipses", ja: "円から楕円へ" }, C: TychoKepler },
  { id: "ellipse", label: { en: "Anatomy of an Ellipse", ja: "楕円の解剖" }, sub: { en: "Foci & eccentricity", ja: "焦点と離心率" }, C: Ellipse },
  { id: "equalareas", label: { en: "Kepler's 2nd Law", ja: "ケプラーの第二法則" }, sub: { en: "Equal areas", ja: "等しい面積" }, C: EqualAreas },
  { id: "thirdlaw", label: { en: "Kepler's 3rd Law", ja: "ケプラーの第三法則" }, sub: { en: "P² = a³", ja: "P² = a³" }, C: ThirdLaw },
  { id: "newton", label: { en: "Newton's Laws", ja: "ニュートンの法則" }, sub: { en: "Inertia & momentum", ja: "慣性と運動量" }, C: NewtonsLaws },
  { id: "gravitation", label: { en: "Universal Gravitation", ja: "万有引力" }, sub: { en: "The 1/d² law", ja: "1/d² の法則" }, C: Gravitation },
  { id: "angular", label: { en: "Angular Momentum", ja: "角運動量" }, sub: { en: "The skater effect", ja: "スケーター効果" }, C: AngularMomentum },
  { id: "spaceflight", label: { en: "Escape & Spaceflight", ja: "脱出と宇宙飛行" }, sub: { en: "Orbits & Neptune", ja: "軌道と海王星" }, C: Spaceflight },
];

const QUIZ_TAB = { id: "quiz", label: { en: "Knowledge Check", ja: "知識チェック" }, sub: { en: "Prove it", ja: "力試し" } };

function Chapter3Body({ lang, setLang }) {
  const shared = useT();
  const t = STR[lang];
  const [active, setActive] = useState("tychokepler");
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
            <Quiz bank={questions} onExit={() => setActive("tychokepler")} />
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

export default function Chapter3() {
  const [lang, setLang] = useState("en");
  return (
    <LangProvider lang={lang}>
      <Chapter3Body lang={lang} setLang={setLang} />
    </LangProvider>
  );
}
