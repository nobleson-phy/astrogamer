/* ============================================================
   CHAPTER 10 — Earthlike Planets: Venus and Mars
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

import { VenusVeiled } from "./stations/VenusVeiled.jsx";
import { VenusAir } from "./stations/VenusAir.jsx";
import { RunawayGreenhouse } from "./stations/RunawayGreenhouse.jsx";
import { VenusSurface } from "./stations/VenusSurface.jsx";
import { RedPlanet } from "./stations/RedPlanet.jsx";
import { MarsVolcanoes } from "./stations/MarsVolcanoes.jsx";
import { WaterOnMars } from "./stations/WaterOnMars.jsx";
import { DivergentFates } from "./stations/DivergentFates.jsx";

const STR = {
  en: {
    eyebrow: "CHAPTER 10",
    title: "Earthlike Planets: Venus and Mars",
    tagline: "Eight short stations on our two neighbours — the veiled, crushing, oven-hot world of Venus and the cold, rusty, water-carved world of Mars — and the divergent fates that split three sister planets. Then prove it in the Knowledge Check.",
    ctaText: "Ready to test yourself?",
    ctaBtn: "Knowledge Check →",
    footer: "Chapter 10 · every fact is real; the visuals are scaled for clarity, not accuracy.",
  },
  ja: {
    eyebrow: "第10章",
    title: "地球型惑星：金星と火星",
    tagline: "私たちの2つの隣人をめぐる8つの短いステーション——ベールに包まれ、押しつぶすように熱いオーブンの金星と、冷たく錆びて水に刻まれた火星——そして3つの姉妹惑星を分けた運命。そして「知識チェック」で力を試そう。",
    ctaText: "力試しの準備はいい？",
    ctaBtn: "知識チェック →",
    footer: "第10章 · 事実はすべて本物です。見た目は正確さより分かりやすさを優先しています。",
  },
};

const STATIONS = [
  { id: "veiled", label: { en: "Venus: The Veiled Twin", ja: "金星：ベールの双子" }, sub: { en: "Phases, spin & probes", ja: "満ち欠け・自転・探査機" }, C: VenusVeiled },
  { id: "air", label: { en: "Venus's Crushing Air", ja: "金星の押しつぶす大気" }, sub: { en: "90 bars of CO₂", ja: "90気圧のCO₂" }, C: VenusAir },
  { id: "greenhouse", label: { en: "The Runaway Greenhouse", ja: "暴走温室効果" }, sub: { en: "How Venus cooked", ja: "金星が煮えた理由" }, C: RunawayGreenhouse },
  { id: "surface", label: { en: "Venus's Naked Surface", ja: "金星のむき出しの地表" }, sub: { en: "Maxwell & resurfacing", ja: "マクスウェルと再舗装" }, C: VenusSurface },
  { id: "red", label: { en: "The Red Planet", ja: "赤い惑星" }, sub: { en: "Rust, Viking & the day", ja: "錆・バイキング・一日" }, C: RedPlanet },
  { id: "volcanoes", label: { en: "Mars: Volcanoes & Canyons", ja: "火星：火山と峡谷" }, sub: { en: "Olympus & Valles Marineris", ja: "オリンポスとマリネリス峡谷" }, C: MarsVolcanoes },
  { id: "water", label: { en: "Water on Mars", ja: "火星の水" }, sub: { en: "Caps, blueberries, streaks", ja: "極冠・ブルーベリー・筋" }, C: WaterOnMars },
  { id: "fates", label: { en: "Two Divergent Fates", ja: "分かれた2つの運命" }, sub: { en: "Greenhouse vs refrigerator", ja: "温室 対 冷蔵庫" }, C: DivergentFates },
];

const QUIZ_TAB = { id: "quiz", label: { en: "Knowledge Check", ja: "知識チェック" }, sub: { en: "Prove it", ja: "力試し" } };

function Chapter10Body({ lang, setLang }) {
  const shared = useT();
  const t = STR[lang];
  const [active, setActive] = useState("veiled");
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
          <h1 style={{ ...styles.title, fontSize: "clamp(30px, 5.5vw, 52px)" }}>{t.title}</h1>
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
            <Quiz bank={questions} onExit={() => setActive("veiled")} />
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

export default function Chapter10() {
  const [lang, setLang] = useState("en");
  return (
    <LangProvider lang={lang}>
      <Chapter10Body lang={lang} setLang={setLang} />
    </LangProvider>
  );
}
