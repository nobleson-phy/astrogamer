/* ============================================================
   CHAPTER 11 — The Giant Planets
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

import { GrandTour } from "./stations/GrandTour.jsx";
import { GasIceRock } from "./stations/GasIceRock.jsx";
import { InsideJupiter } from "./stations/InsideJupiter.jsx";
import { CloudDecks } from "./stations/CloudDecks.jsx";
import { StormsWinds } from "./stations/StormsWinds.jsx";
import { IceGiants } from "./stations/IceGiants.jsx";
import { DistanceFaintSun } from "./stations/DistanceFaintSun.jsx";
import { InfraredEyes } from "./stations/InfraredEyes.jsx";

const STR = {
  en: {
    eyebrow: "CHAPTER 11",
    title: "The Giant Planets",
    tagline: "Eight short stations on the four giants — Jupiter, Saturn, Uranus and Neptune — how we explored them, what they're made of, their metallic hearts, cloud decks and colossal storms, the tilted blue ice giants, and the cold faint light so far from the Sun. Then prove it in the Knowledge Check.",
    ctaText: "Ready to test yourself?",
    ctaBtn: "Knowledge Check →",
    footer: "Chapter 11 · every fact is real; the visuals are scaled for clarity, not accuracy.",
  },
  ja: {
    eyebrow: "第11章",
    title: "巨大惑星",
    tagline: "4つの巨人——木星・土星・天王星・海王星——をめぐる8つの短いステーション。どう探査したか、何でできているか、その金属の心臓、雲の層と巨大な嵐、傾いた青い氷の巨人、そして太陽から遠い冷たく弱い光。そして「知識チェック」で力を試そう。",
    ctaText: "力試しの準備はいい？",
    ctaBtn: "知識チェック →",
    footer: "第11章 · 事実はすべて本物です。見た目は正確さより分かりやすさを優先しています。",
  },
};

const STATIONS = [
  { id: "tour", label: { en: "Grand Tour & Explorers", ja: "グランドツアーと探査機" }, sub: { en: "Voyager · Galileo · Cassini", ja: "ボイジャー・ガリレオ・カッシーニ" }, C: GrandTour },
  { id: "compose", label: { en: "Gas, Ice, or Rock?", ja: "ガス・氷・岩石" }, sub: { en: "What giants are made of", ja: "巨大惑星の材料" }, C: GasIceRock },
  { id: "interior", label: { en: "Inside Jupiter", ja: "木星の内部" }, sub: { en: "Metallic hydrogen & heat", ja: "金属水素と熱" }, C: InsideJupiter },
  { id: "clouds", label: { en: "Cloud Decks & Colours", ja: "雲の層と色" }, sub: { en: "Ammonia & photochemistry", ja: "アンモニアと光化学" }, C: CloudDecks },
  { id: "storms", label: { en: "Storms & Winds", ja: "嵐と風" }, sub: { en: "Red Spot · hexagon · 1800 km/h", ja: "大赤斑・六角形・1800 km/h" }, C: StormsWinds },
  { id: "icegiants", label: { en: "The Ice Giants", ja: "氷の巨人" }, sub: { en: "Uranus & Neptune", ja: "天王星と海王星" }, C: IceGiants },
  { id: "distance", label: { en: "Distance & Faint Sun", ja: "距離と弱い日光" }, sub: { en: "10 AU · inverse square", ja: "10 AU・逆二乗" }, C: DistanceFaintSun },
  { id: "infrared", label: { en: "Infrared Eyes", ja: "赤外線の目" }, sub: { en: "Cooling the detectors", ja: "検出器を冷やす" }, C: InfraredEyes },
];

const QUIZ_TAB = { id: "quiz", label: { en: "Knowledge Check", ja: "知識チェック" }, sub: { en: "Prove it", ja: "力試し" } };

function Chapter11Body({ lang, setLang }) {
  const shared = useT();
  const t = STR[lang];
  const [active, setActive] = useState("tour");
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
            <Quiz bank={questions} onExit={() => setActive("tour")} />
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

export default function Chapter11() {
  const [lang, setLang] = useState("en");
  return (
    <LangProvider lang={lang}>
      <Chapter11Body lang={lang} setLang={setLang} />
    </LangProvider>
  );
}
