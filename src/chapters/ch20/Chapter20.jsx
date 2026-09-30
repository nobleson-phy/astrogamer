/* ============================================================
   CHAPTER 20 — Between the Stars: Gas and Dust in Space
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

import { InterstellarMedium } from "./stations/InterstellarMedium.jsx";
import { GlowingNebulae } from "./stations/GlowingNebulae.jsx";
import { TwentyOneCm } from "./stations/TwentyOneCm.jsx";
import { DarkCloudsDust } from "./stations/DarkCloudsDust.jsx";
import { MolecularClouds } from "./stations/MolecularClouds.jsx";
import { HotGasShocks } from "./stations/HotGasShocks.jsx";
import { CosmicRays } from "./stations/CosmicRays.jsx";
import { NeighborhoodCycle } from "./stations/NeighborhoodCycle.jsx";

const STR = {
  en: {
    eyebrow: "CHAPTER 20",
    title: "Between the Stars: Gas and Dust",
    tagline: "Eight short stations on the near-empty space between the stars — the gas-and-dust interstellar medium, glowing emission and reflection nebulae, the 21-cm line that maps cold hydrogen, dark clouds and the reddening dust, cold molecular clouds and their chemistry, million-degree gas from supernova shocks, cosmic rays and spallation, and the Local Bubble our Sun drifts through. Then prove it in the Knowledge Check.",
    ctaText: "Ready to test yourself?",
    ctaBtn: "Knowledge Check →",
    footer: "Chapter 20 · every fact is real; the visuals are scaled for clarity, not accuracy.",
  },
  ja: {
    eyebrow: "第20章",
    title: "星の間：ガスと塵",
    tagline: "星と星の間のほぼ空っぽの空間をめぐる8つの短いステーション——ガスと塵の星間物質、輝く輝線星雲と反射星雲、冷たい水素を地図化する21 cm線、暗黒星雲と赤化させる塵、冷たい分子雲とその化学、超新星の衝撃波による100万度のガス、宇宙線と核破砕、そして太陽が漂うローカルバブル。そして「知識チェック」で力を試そう。",
    ctaText: "力試しの準備はいい？",
    ctaBtn: "知識チェック →",
    footer: "第20章 · 事実はすべて本物です。見た目は正確さより分かりやすさを優先しています。",
  },
};

const STATIONS = [
  { id: "ism", label: { en: "The Interstellar Medium", ja: "星間物質" }, sub: { en: "Gas and dust", ja: "ガスと塵" }, C: InterstellarMedium },
  { id: "nebulae", label: { en: "Glowing Nebulae", ja: "輝く星雲" }, sub: { en: "Emission & reflection", ja: "輝線と反射" }, C: GlowingNebulae },
  { id: "hi", label: { en: "The 21-cm Line", ja: "21 cm線" }, sub: { en: "Mapping cold hydrogen", ja: "冷たい水素の地図" }, C: TwentyOneCm },
  { id: "dust", label: { en: "Dark Clouds & Dust", ja: "暗黒星雲と塵" }, sub: { en: "Extinction & reddening", ja: "減光と赤化" }, C: DarkCloudsDust },
  { id: "molecular", label: { en: "Molecular Clouds", ja: "分子雲" }, sub: { en: "Cold chemistry", ja: "冷たい化学" }, C: MolecularClouds },
  { id: "hotgas", label: { en: "Hot Gas & Shocks", ja: "高温ガスと衝撃波" }, sub: { en: "Supernova bubbles", ja: "超新星の泡" }, C: HotGasShocks },
  { id: "cosmicrays", label: { en: "Cosmic Rays", ja: "宇宙線" }, sub: { en: "Hess & spallation", ja: "ヘスと核破砕" }, C: CosmicRays },
  { id: "neighborhood", label: { en: "Our Neighborhood", ja: "私たちの近所" }, sub: { en: "Local Bubble & cycle", ja: "ローカルバブルと循環" }, C: NeighborhoodCycle },
];

const QUIZ_TAB = { id: "quiz", label: { en: "Knowledge Check", ja: "知識チェック" }, sub: { en: "Prove it", ja: "力試し" } };

function Chapter20Body({ lang, setLang }) {
  const shared = useT();
  const t = STR[lang];
  const [active, setActive] = useState("ism");
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
            <Quiz bank={questions} onExit={() => setActive("ism")} />
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

export default function Chapter20() {
  const [lang, setLang] = useState("en");
  return (
    <LangProvider lang={lang}>
      <Chapter20Body lang={lang} setLang={setLang} />
    </LangProvider>
  );
}
