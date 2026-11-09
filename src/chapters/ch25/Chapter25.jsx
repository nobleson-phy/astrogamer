/* ============================================================
   CHAPTER 25 — The Milky Way Galaxy
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

import { GalaxyAnatomy } from "./stations/GalaxyAnatomy.jsx";
import { FindingOurPlace } from "./stations/FindingOurPlace.jsx";
import { SpiralArms } from "./stations/SpiralArms.jsx";
import { SeeingThroughDust } from "./stations/SeeingThroughDust.jsx";
import { RotationDarkMatter } from "./stations/RotationDarkMatter.jsx";
import { GalacticCenter } from "./stations/GalacticCenter.jsx";
import { StellarPopulations } from "./stations/StellarPopulations.jsx";
import { GalacticCannibalism } from "./stations/GalacticCannibalism.jsx";

const STR = {
  en: {
    eyebrow: "CHAPTER 25",
    title: "The Milky Way Galaxy",
    tagline: "Eight short stations on the galaxy we live inside — the 100,000-light-year disk, bulge and halo that make up its anatomy, how dust fooled Herschel while globular clusters revealed our off-center home, the spiral arms and the Orion Spur, seeing through the dust with 21-cm radio and infrared, a flat rotation curve that betrays a dark-matter halo, the 4.6-million-solar-mass black hole at the center, two stellar populations, and a galaxy built by cannibalizing its neighbors — and bound to merge with Andromeda. Then prove it in the Knowledge Check.",
    ctaText: "Ready to test yourself?",
    ctaBtn: "Knowledge Check →",
    footer: "Chapter 25 · every fact is real; the visuals are scaled for clarity, not accuracy.",
  },
  ja: {
    eyebrow: "第25章",
    title: "天の川銀河",
    tagline: "私たちが内側に暮らす銀河をめぐる8つの短いステーション——その解剖学をなす10万光年の円盤・バルジ・ハロー、塵がハーシェルをだます一方で球状星団が中心から外れた私たちの故郷を明かしたこと、渦巻腕とオリオン腕、21cm電波と赤外線で塵を透かし見ること、ダークマターハローを暴く平らな回転曲線、中心にある460万太陽質量のブラックホール、2つの星の種族、そして隣人を食べて築かれ——アンドロメダと合体する定めの銀河。そして「知識チェック」で力を試そう。",
    ctaText: "力試しの準備はいい？",
    ctaBtn: "知識チェック →",
    footer: "第25章 · 事実はすべて本物です。見た目は正確さより分かりやすさを優先しています。",
  },
};

const STATIONS = [
  { id: "anatomy", label: { en: "Galaxy Anatomy", ja: "銀河の解剖学" }, sub: { en: "Disk, bulge, halo", ja: "円盤・バルジ・ハロー" }, C: GalaxyAnatomy },
  { id: "place", label: { en: "Finding Our Place", ja: "私たちの位置" }, sub: { en: "Herschel vs Shapley", ja: "ハーシェル対シャプレー" }, C: FindingOurPlace },
  { id: "arms", label: { en: "The Spiral Arms", ja: "渦巻腕" }, sub: { en: "The Orion Spur", ja: "オリオン腕" }, C: SpiralArms },
  { id: "dust", label: { en: "Seeing Through Dust", ja: "塵を透かし見る" }, sub: { en: "21 cm & infrared", ja: "21cmと赤外線" }, C: SeeingThroughDust },
  { id: "rotation", label: { en: "Rotation & Dark Matter", ja: "回転とダークマター" }, sub: { en: "A flat curve", ja: "平らな曲線" }, C: RotationDarkMatter },
  { id: "center", label: { en: "The Galactic Center", ja: "銀河中心" }, sub: { en: "Sagittarius A*", ja: "いて座A*" }, C: GalacticCenter },
  { id: "populations", label: { en: "Stellar Populations", ja: "星の種族" }, sub: { en: "Pop I vs Pop II", ja: "種族I対種族II" }, C: StellarPopulations },
  { id: "cannibalism", label: { en: "Cannibalism & Collision", ja: "共食いと衝突" }, sub: { en: "Built by mergers", ja: "合体で築かれた" }, C: GalacticCannibalism },
];

const QUIZ_TAB = { id: "quiz", label: { en: "Knowledge Check", ja: "知識チェック" }, sub: { en: "Prove it", ja: "力試し" } };

function Chapter25Body({ lang, setLang }) {
  const shared = useT();
  const t = STR[lang];
  const [active, setActive] = useState("anatomy");
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
            <Quiz bank={questions} onExit={() => setActive("anatomy")} />
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

export default function Chapter25() {
  const [lang, setLang] = useState("en");
  return (
    <LangProvider lang={lang}>
      <Chapter25Body lang={lang} setLang={setLang} />
    </LangProvider>
  );
}
