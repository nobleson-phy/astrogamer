/* ============================================================
   CHAPTER 4 — Earth, Moon, and Sky
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

import { MappingSky } from "./stations/MappingSky.jsx";
import { Seasons } from "./stations/Seasons.jsx";
import { KeepingTime } from "./stations/KeepingTime.jsx";
import { Calendar } from "./stations/Calendar.jsx";
import { MoonPhases } from "./stations/MoonPhases.jsx";
import { Tides } from "./stations/Tides.jsx";
import { Eclipses } from "./stations/Eclipses.jsx";
import { Horizon } from "./stations/Horizon.jsx";

const STR = {
  en: {
    eyebrow: "CHAPTER 4",
    title: "Earth, Moon, and Sky",
    tagline: "Eight short stations on the everyday sky — coordinates and seasons, the day, the calendar, the Moon's phases, the tides, eclipses, and the Sun at the horizon — then prove it in the Knowledge Check.",
    ctaText: "Ready to test yourself?",
    ctaBtn: "Knowledge Check →",
    footer: "Chapter 4 · every fact is real; the visuals are scaled for clarity, not accuracy.",
  },
  ja: {
    eyebrow: "第4章",
    title: "地球・月・空",
    tagline: "身近な空をめぐる8つの短いステーション——座標と四季、1日、暦、月の満ち欠け、潮汐、食、そして地平線の太陽——そして「知識チェック」で力を試そう。",
    ctaText: "力試しの準備はいい？",
    ctaBtn: "知識チェック →",
    footer: "第4章 · 事実はすべて本物です。見た目は正確さより分かりやすさを優先しています。",
  },
};

const STATIONS = [
  { id: "mapping", label: { en: "Mapping the Sky", ja: "空をマッピング" }, sub: { en: "Dec & RA", ja: "赤緯と赤経" }, C: MappingSky },
  { id: "seasons", label: { en: "The Seasons", ja: "四季" }, sub: { en: "The 23.5° tilt", ja: "23.5°の傾き" }, C: Seasons },
  { id: "time", label: { en: "Keeping Time", ja: "時を計る" }, sub: { en: "Solar & sidereal", ja: "太陽日と恒星日" }, C: KeepingTime },
  { id: "calendar", label: { en: "The Calendar", ja: "暦" }, sub: { en: "Leap-year rule", ja: "閏年の規則" }, C: Calendar },
  { id: "phases", label: { en: "Phases of the Moon", ja: "月の満ち欠け" }, sub: { en: "Synchronous spin", ja: "同期自転" }, C: MoonPhases },
  { id: "tides", label: { en: "Ocean Tides", ja: "潮汐" }, sub: { en: "Spring & neap", ja: "大潮と小潮" }, C: Tides },
  { id: "eclipses", label: { en: "Eclipses", ja: "食" }, sub: { en: "Umbra & penumbra", ja: "本影と半影" }, C: Eclipses },
  { id: "horizon", label: { en: "Sun at the Horizon", ja: "地平線の太陽" }, sub: { en: "Refraction", ja: "屈折" }, C: Horizon },
];

const QUIZ_TAB = { id: "quiz", label: { en: "Knowledge Check", ja: "知識チェック" }, sub: { en: "Prove it", ja: "力試し" } };

function Chapter4Body({ lang, setLang }) {
  const shared = useT();
  const t = STR[lang];
  const [active, setActive] = useState("mapping");
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
            <Quiz bank={questions} onExit={() => setActive("mapping")} />
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

export default function Chapter4() {
  const [lang, setLang] = useState("en");
  return (
    <LangProvider lang={lang}>
      <Chapter4Body lang={lang} setLang={setLang} />
    </LangProvider>
  );
}
