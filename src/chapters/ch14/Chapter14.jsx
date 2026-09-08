/* ============================================================
   CHAPTER 14 — Cosmic Samples and the Origin of the Solar System
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

import { MeteorShowers } from "./stations/MeteorShowers.jsx";
import { MeteorStorms } from "./stations/MeteorStorms.jsx";
import { MeteorToMeteorite } from "./stations/MeteorToMeteorite.jsx";
import { FindingMeteorites } from "./stations/FindingMeteorites.jsx";
import { MeteoriteClasses } from "./stations/MeteoriteClasses.jsx";
import { CarbonMessages } from "./stations/CarbonMessages.jsx";
import { CondensationSequence } from "./stations/CondensationSequence.jsx";
import { Exoplanets } from "./stations/Exoplanets.jsx";

const STR = {
  en: {
    eyebrow: "CHAPTER 14",
    title: "Cosmic Samples & the Origin of the Solar System",
    tagline: "Eight short stations on the debris that rains down on us and what it tells us — meteor showers and their radiants, meteor storms, the journey from meteor to meteorite, the Antarctic meteorite harvest, the three kinds of meteorite, the organic messages in carbonaceous stones, the condensation sequence that built the planets, and the exoplanets that rewrote how we think planets form. Then prove it in the Knowledge Check.",
    ctaText: "Ready to test yourself?",
    ctaBtn: "Knowledge Check →",
    footer: "Chapter 14 · every fact is real; the visuals are scaled for clarity, not accuracy.",
  },
  ja: {
    eyebrow: "第14章",
    title: "宇宙のサンプルと太陽系の起源",
    tagline: "降り注ぐ破片と、それが語ることをめぐる8つの短いステーション——流星群と放射点、流星嵐、流星から隕石への旅、南極の隕石採集、3種類の隕石、炭素質の石に刻まれた有機物のメッセージ、惑星を作った凝縮系列、そして惑星形成の考え方を書き換えた系外惑星。そして「知識チェック」で力を試そう。",
    ctaText: "力試しの準備はいい？",
    ctaBtn: "知識チェック →",
    footer: "第14章 · 事実はすべて本物です。見た目は正確さより分かりやすさを優先しています。",
  },
};

const STATIONS = [
  { id: "showers", label: { en: "Meteor Showers", ja: "流星群" }, sub: { en: "Radiants & parents", ja: "放射点と母天体" }, C: MeteorShowers },
  { id: "storms", label: { en: "Meteor Storms", ja: "流星嵐" }, sub: { en: "Clumpy streams", ja: "塊状の流れ" }, C: MeteorStorms },
  { id: "meteorite", label: { en: "Meteor to Meteorite", ja: "流星から隕石へ" }, sub: { en: "The fiery plunge", ja: "燃える落下" }, C: MeteorToMeteorite },
  { id: "finding", label: { en: "Finding Meteorites", ja: "隕石を見つける" }, sub: { en: "The Antarctic harvest", ja: "南極の採集" }, C: FindingMeteorites },
  { id: "classes", label: { en: "Three Kinds of Meteorite", ja: "3種類の隕石" }, sub: { en: "Stone · iron · stony-iron", ja: "石質・鉄質・石鉄" }, C: MeteoriteClasses },
  { id: "carbon", label: { en: "Messages in Carbon", ja: "炭素のメッセージ" }, sub: { en: "Amino acids & Allende", ja: "アミノ酸とアエンデ" }, C: CarbonMessages },
  { id: "condensation", label: { en: "The Condensation Sequence", ja: "凝縮系列" }, sub: { en: "Rock in, ice out", ja: "岩は内・氷は外" }, C: CondensationSequence },
  { id: "exoplanets", label: { en: "Other Worlds", ja: "ほかの世界" }, sub: { en: "Exoplanets & disks", ja: "系外惑星と円盤" }, C: Exoplanets },
];

const QUIZ_TAB = { id: "quiz", label: { en: "Knowledge Check", ja: "知識チェック" }, sub: { en: "Prove it", ja: "力試し" } };

function Chapter14Body({ lang, setLang }) {
  const shared = useT();
  const t = STR[lang];
  const [active, setActive] = useState("showers");
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
          <h1 style={{ ...styles.title, fontSize: "clamp(28px, 5vw, 50px)" }}>{t.title}</h1>
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
            <Quiz bank={questions} onExit={() => setActive("showers")} />
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

export default function Chapter14() {
  const [lang, setLang] = useState("en");
  return (
    <LangProvider lang={lang}>
      <Chapter14Body lang={lang} setLang={setLang} />
    </LangProvider>
  );
}
