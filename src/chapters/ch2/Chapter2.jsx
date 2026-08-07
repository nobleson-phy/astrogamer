/* ============================================================
   CHAPTER 2 — Observing the Sky
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

import { CelestialSphere } from "./stations/CelestialSphere.jsx";
import { Zodiac } from "./stations/Zodiac.jsx";
import { TurningSky } from "./stations/TurningSky.jsx";
import { Precession } from "./stations/Precession.jsx";
import { Retrograde } from "./stations/Retrograde.jsx";
import { Models } from "./stations/Models.jsx";
import { Galileo } from "./stations/Galileo.jsx";
import { AstronomyAstrology } from "./stations/AstronomyAstrology.jsx";

const STR = {
  en: {
    eyebrow: "CHAPTER 2",
    title: "Observing the Sky",
    tagline: "Eight short stations on how we watch and map the heavens — then prove it in the Knowledge Check.",
    ctaText: "Ready to test yourself?",
    ctaBtn: "Knowledge Check →",
    footer: "Chapter 2 · every fact is real; the visuals are scaled for clarity, not accuracy.",
  },
  ja: {
    eyebrow: "第2章",
    title: "天を観る",
    tagline: "天をどう観測し、地図に描くかをめぐる8つの短いステーション——そして「知識チェック」で力を試そう。",
    ctaText: "力試しの準備はいい？",
    ctaBtn: "知識チェック →",
    footer: "第2章 · 事実はすべて本物です。見た目は正確さより分かりやすさを優先しています。",
  },
};

const STATIONS = [
  { id: "sphere", label: { en: "Celestial Sphere", ja: "天球" }, sub: { en: "Zenith to equator", ja: "天頂から赤道へ" }, C: CelestialSphere },
  { id: "zodiac", label: { en: "Constellations & Zodiac", ja: "星座と黄道帯" }, sub: { en: "The ecliptic", ja: "黄道" }, C: Zodiac },
  { id: "turning", label: { en: "The Turning Sky", ja: "回る空" }, sub: { en: "Latitude & star trails", ja: "緯度と星の軌跡" }, C: TurningSky },
  { id: "precession", label: { en: "Precession", ja: "歳差" }, sub: { en: "The wandering pole", ja: "さまよう極" }, C: Precession },
  { id: "retrograde", label: { en: "Retrograde Motion", ja: "逆行" }, sub: { en: "Loops & epicycles", ja: "輪と周転円" }, C: Retrograde },
  { id: "models", label: { en: "Geo → Heliocentric", ja: "天動説から地動説へ" }, sub: { en: "The great debate", ja: "大論争" }, C: Models },
  { id: "galileo", label: { en: "Galileo's Telescope", ja: "ガリレオの望遠鏡" }, sub: { en: "Moons & phases", ja: "衛星と満ち欠け" }, C: Galileo },
  { id: "astrology", label: { en: "Astronomy vs Astrology", ja: "天文学と占星術" }, sub: { en: "Science & magnitude", ja: "科学と等級" }, C: AstronomyAstrology },
];

const QUIZ_TAB = { id: "quiz", label: { en: "Knowledge Check", ja: "知識チェック" }, sub: { en: "Prove it", ja: "力試し" } };

function Chapter2Body({ lang, setLang }) {
  const shared = useT();
  const t = STR[lang];
  const [active, setActive] = useState("sphere");
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
            <Quiz bank={questions} onExit={() => setActive("sphere")} />
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

export default function Chapter2() {
  const [lang, setLang] = useState("en");
  return (
    <LangProvider lang={lang}>
      <Chapter2Body lang={lang} setLang={setLang} />
    </LangProvider>
  );
}
