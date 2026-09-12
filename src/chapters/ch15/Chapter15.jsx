/* ============================================================
   CHAPTER 15 — The Sun: A Garden-Variety Star
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

import { InsideTheSun } from "./stations/InsideTheSun.jsx";
import { SolarAtmosphere } from "./stations/SolarAtmosphere.jsx";
import { Composition } from "./stations/Composition.jsx";
import { BubblingSurface } from "./stations/BubblingSurface.jsx";
import { Sunspots } from "./stations/Sunspots.jsx";
import { SolarCycle } from "./stations/SolarCycle.jsx";
import { ActiveSun } from "./stations/ActiveSun.jsx";
import { SpaceWeather } from "./stations/SpaceWeather.jsx";

const STR = {
  en: {
    eyebrow: "CHAPTER 15",
    title: "The Sun: A Garden-Variety Star",
    tagline: "Eight short stations on our nearest star — its layered interior, the atmosphere that gets hotter as you go out, how we learned it is made of hydrogen and helium, the bubbling surface and its differential spin, dark magnetic sunspots, the 11- and 22-year cycles, the active Sun of plages, prominences and CMEs, and the space weather that reaches Earth. Then prove it in the Knowledge Check.",
    ctaText: "Ready to test yourself?",
    ctaBtn: "Knowledge Check →",
    footer: "Chapter 15 · every fact is real; the visuals are scaled for clarity, not accuracy.",
  },
  ja: {
    eyebrow: "第15章",
    title: "太陽：ありふれた星",
    tagline: "私たちに最も近い星をめぐる8つの短いステーション——層状の内部、外へ行くほど熱くなる大気、水素とヘリウムでできていると分かった経緯、泡立つ表面と差動回転、暗い磁気の黒点、11年と22年の周期、白斑・プロミネンス・CMEの活動的な太陽、そして地球に届く宇宙天気。そして「知識チェック」で力を試そう。",
    ctaText: "力試しの準備はいい？",
    ctaBtn: "知識チェック →",
    footer: "第15章 · 事実はすべて本物です。見た目は正確さより分かりやすさを優先しています。",
  },
};

const STATIONS = [
  { id: "inside", label: { en: "Inside the Sun", ja: "太陽の内部" }, sub: { en: "Core to photosphere", ja: "核から光球へ" }, C: InsideTheSun },
  { id: "atmosphere", label: { en: "The Sun's Atmosphere", ja: "太陽の大気" }, sub: { en: "The heating paradox", ja: "加熱の逆説" }, C: SolarAtmosphere },
  { id: "composition", label: { en: "What the Sun Is Made Of", ja: "太陽の成分" }, sub: { en: "Payne & hydrogen", ja: "ペインと水素" }, C: Composition },
  { id: "surface", label: { en: "The Bubbling Surface", ja: "泡立つ表面" }, sub: { en: "Granules & spin", ja: "粒状斑と自転" }, C: BubblingSurface },
  { id: "sunspots", label: { en: "Sunspots", ja: "黒点" }, sub: { en: "Cool, magnetic, dark", ja: "冷たく磁気で暗い" }, C: Sunspots },
  { id: "cycle", label: { en: "The Solar Cycle", ja: "太陽周期" }, sub: { en: "11 & 22 years", ja: "11年と22年" }, C: SolarCycle },
  { id: "active", label: { en: "The Active Sun", ja: "活動的な太陽" }, sub: { en: "Plages to CMEs", ja: "白斑からCME" }, C: ActiveSun },
  { id: "weather", label: { en: "Space Weather", ja: "宇宙天気" }, sub: { en: "The Sun reaches Earth", ja: "太陽が地球に届く" }, C: SpaceWeather },
];

const QUIZ_TAB = { id: "quiz", label: { en: "Knowledge Check", ja: "知識チェック" }, sub: { en: "Prove it", ja: "力試し" } };

function Chapter15Body({ lang, setLang }) {
  const shared = useT();
  const t = STR[lang];
  const [active, setActive] = useState("inside");
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
            <Quiz bank={questions} onExit={() => setActive("inside")} />
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

export default function Chapter15() {
  const [lang, setLang] = useState("en");
  return (
    <LangProvider lang={lang}>
      <Chapter15Body lang={lang} setLang={setLang} />
    </LangProvider>
  );
}
