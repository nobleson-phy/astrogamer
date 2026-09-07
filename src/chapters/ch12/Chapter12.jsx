/* ============================================================
   CHAPTER 12 — Rings, Moons, and Pluto
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

import { GalileanMoons } from "./stations/GalileanMoons.jsx";
import { IoVolcanic } from "./stations/IoVolcanic.jsx";
import { OceanWorlds } from "./stations/OceanWorlds.jsx";
import { Titan } from "./stations/Titan.jsx";
import { SaturnRings } from "./stations/SaturnRings.jsx";
import { RingsEnceladus } from "./stations/RingsEnceladus.jsx";
import { Triton } from "./stations/Triton.jsx";
import { PlutoCharon } from "./stations/PlutoCharon.jsx";

const STR = {
  en: {
    eyebrow: "CHAPTER 12",
    title: "Rings, Moons, and Pluto",
    tagline: "Eight short stations on the icy outer worlds — Jupiter's Galilean moons, volcanic Io and ocean-bearing Europa, hazy Titan, Saturn's rings and geysering Enceladus, backward-orbiting Triton, and distant Pluto with its frozen heart. Then prove it in the Knowledge Check.",
    ctaText: "Ready to test yourself?",
    ctaBtn: "Knowledge Check →",
    footer: "Chapter 12 · every fact is real; the visuals are scaled for clarity, not accuracy.",
  },
  ja: {
    eyebrow: "第12章",
    title: "環・衛星・冥王星",
    tagline: "氷の外の世界をめぐる8つの短いステーション——木星のガリレオ衛星、火山のイオと海をもつエウロパ、もやのタイタン、土星の環と間欠泉のエンケラドス、逆行するトリトン、そして凍った心臓をもつ遠い冥王星。そして「知識チェック」で力を試そう。",
    ctaText: "力試しの準備はいい？",
    ctaBtn: "知識チェック →",
    footer: "第12章 · 事実はすべて本物です。見た目は正確さより分かりやすさを優先しています。",
  },
};

const STATIONS = [
  { id: "galilean", label: { en: "The Galilean Moons", ja: "ガリレオ衛星" }, sub: { en: "Io · Europa · Ganymede · Callisto", ja: "イオ・エウロパ・ガニメデ・カリスト" }, C: GalileanMoons },
  { id: "io", label: { en: "Io: Volcanic Moon", ja: "イオ：火山の衛星" }, sub: { en: "Tidal heating", ja: "潮汐加熱" }, C: IoVolcanic },
  { id: "ocean", label: { en: "Ocean Worlds", ja: "海の世界" }, sub: { en: "Europa & habitability", ja: "エウロパと居住可能性" }, C: OceanWorlds },
  { id: "titan", label: { en: "Titan", ja: "タイタン" }, sub: { en: "Nitrogen air & Huygens", ja: "窒素の大気とホイヘンス" }, C: Titan },
  { id: "rings", label: { en: "Saturn's Rings", ja: "土星の環" }, sub: { en: "Ice, gaps & shepherds", ja: "氷・隙間・羊飼い衛星" }, C: SaturnRings },
  { id: "enceladus", label: { en: "Rings & Enceladus", ja: "環とエンケラドス" }, sub: { en: "Geysers & ring families", ja: "間欠泉と環の一族" }, C: RingsEnceladus },
  { id: "triton", label: { en: "Triton", ja: "トリトン" }, sub: { en: "Retrograde & doomed", ja: "逆行と終焉" }, C: Triton },
  { id: "pluto", label: { en: "Pluto & Charon", ja: "冥王星とカロン" }, sub: { en: "Sputnik Planitia & dwarf status", ja: "スプートニク平原と準惑星" }, C: PlutoCharon },
];

const QUIZ_TAB = { id: "quiz", label: { en: "Knowledge Check", ja: "知識チェック" }, sub: { en: "Prove it", ja: "力試し" } };

function Chapter12Body({ lang, setLang }) {
  const shared = useT();
  const t = STR[lang];
  const [active, setActive] = useState("galilean");
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
            <Quiz bank={questions} onExit={() => setActive("galilean")} />
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

export default function Chapter12() {
  const [lang, setLang] = useState("en");
  return (
    <LangProvider lang={lang}>
      <Chapter12Body lang={lang} setLang={setLang} />
    </LangProvider>
  );
}
