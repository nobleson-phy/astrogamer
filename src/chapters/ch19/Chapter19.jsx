/* ============================================================
   CHAPTER 19 — Celestial Distances
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

import { RadarRanging } from "./stations/RadarRanging.jsx";
import { StellarParallax } from "./stations/StellarParallax.jsx";
import { NearestNeighbors } from "./stations/NearestNeighbors.jsx";
import { PulsatingStars } from "./stations/PulsatingStars.jsx";
import { StandardCandles } from "./stations/StandardCandles.jsx";
import { SpectroscopicParallax } from "./stations/SpectroscopicParallax.jsx";
import { DistanceLadder } from "./stations/DistanceLadder.jsx";
import { MappingBeyond } from "./stations/MappingBeyond.jsx";

const STR = {
  en: {
    eyebrow: "CHAPTER 19",
    title: "Celestial Distances",
    tagline: "Eight short stations on how we measure the cosmos — radar ranging inside the solar system, the geometry of stellar parallax and the parsec, our nearest neighbors and the Gaia mission, pulsating Cepheid and RR Lyrae stars, standard candles and Leavitt's Small Magellanic Cloud, spectroscopic parallax, the cosmic distance ladder, and how Shapley and Hubble mapped the Galaxy and the universe beyond. Then prove it in the Knowledge Check.",
    ctaText: "Ready to test yourself?",
    ctaBtn: "Knowledge Check →",
    footer: "Chapter 19 · every fact is real; the visuals are scaled for clarity, not accuracy.",
  },
  ja: {
    eyebrow: "第19章",
    title: "天体までの距離",
    tagline: "宇宙をどう測るかをめぐる8つの短いステーション——太陽系内のレーダー測距、恒星視差の幾何学とパーセク、最も近い隣人たちとガイア・ミッション、脈動するケフェイドとRRライリ型星、標準光源とリービットの小マゼラン雲、分光視差、宇宙の距離はしご、そしてシャプレーとハッブルがどう銀河とその先の宇宙を地図化したか。そして「知識チェック」で力を試そう。",
    ctaText: "力試しの準備はいい？",
    ctaBtn: "知識チェック →",
    footer: "第19章 · 事実はすべて本物です。見た目は正確さより分かりやすさを優先しています。",
  },
};

const STATIONS = [
  { id: "radar", label: { en: "Radar Ranging", ja: "レーダー測距" }, sub: { en: "Distances by echo", ja: "反射で距離" }, C: RadarRanging },
  { id: "parallax", label: { en: "Stellar Parallax", ja: "恒星視差" }, sub: { en: "The parsec", ja: "パーセク" }, C: StellarParallax },
  { id: "neighbors", label: { en: "Nearest Neighbors & Gaia", ja: "最も近い隣人とガイア" }, sub: { en: "Alpha Centauri", ja: "アルファ・ケンタウリ" }, C: NearestNeighbors },
  { id: "pulsating", label: { en: "Pulsating Stars", ja: "脈動する星" }, sub: { en: "Cepheids & RR Lyrae", ja: "ケフェイドとRRライリ" }, C: PulsatingStars },
  { id: "candles", label: { en: "Standard Candles & the SMC", ja: "標準光源とSMC" }, sub: { en: "Leavitt's insight", ja: "リービットの洞察" }, C: StandardCandles },
  { id: "spectro", label: { en: "Spectroscopic Parallax", ja: "分光視差" }, sub: { en: "Spectrum → distance", ja: "スペクトル→距離" }, C: SpectroscopicParallax },
  { id: "ladder", label: { en: "The Distance Ladder", ja: "距離はしご" }, sub: { en: "Rung by rung", ja: "一段ずつ" }, C: DistanceLadder },
  { id: "beyond", label: { en: "Mapping the Universe", ja: "宇宙を地図化する" }, sub: { en: "Shapley & Hubble", ja: "シャプレーとハッブル" }, C: MappingBeyond },
];

const QUIZ_TAB = { id: "quiz", label: { en: "Knowledge Check", ja: "知識チェック" }, sub: { en: "Prove it", ja: "力試し" } };

function Chapter19Body({ lang, setLang }) {
  const shared = useT();
  const t = STR[lang];
  const [active, setActive] = useState("radar");
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
            <Quiz bank={questions} onExit={() => setActive("radar")} />
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

export default function Chapter19() {
  const [lang, setLang] = useState("en");
  return (
    <LangProvider lang={lang}>
      <Chapter19Body lang={lang} setLang={setLang} />
    </LangProvider>
  );
}
