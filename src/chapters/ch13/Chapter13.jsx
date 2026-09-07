/* ============================================================
   CHAPTER 13 — Comets and Asteroids
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

import { AsteroidTypes } from "./stations/AsteroidTypes.jsx";
import { CeresVesta } from "./stations/CeresVesta.jsx";
import { VisitedAsteroids } from "./stations/VisitedAsteroids.jsx";
import { CometAnatomy } from "./stations/CometAnatomy.jsx";
import { Reservoirs } from "./stations/Reservoirs.jsx";
import { CometLife } from "./stations/CometLife.jsx";
import { ImpactsDefense } from "./stations/ImpactsDefense.jsx";
import { CentaursTrojans } from "./stations/CentaursTrojans.jsx";

const STR = {
  en: {
    eyebrow: "CHAPTER 13",
    title: "Comets and Asteroids",
    tagline: "Eight short stations on the small bodies of the solar system — the three asteroid types, dwarf-planet Ceres and volcanic Vesta, the worlds we've visited, the anatomy of a comet, the Kuiper belt and Oort cloud, a comet's fiery life and death, impacts and planetary defense, and the red centaurs and trapped Trojans. Then prove it in the Knowledge Check.",
    ctaText: "Ready to test yourself?",
    ctaBtn: "Knowledge Check →",
    footer: "Chapter 13 · every fact is real; the visuals are scaled for clarity, not accuracy.",
  },
  ja: {
    eyebrow: "第13章",
    title: "彗星と小惑星",
    tagline: "太陽系の小天体をめぐる8つの短いステーション——3つの小惑星タイプ、準惑星ケレスと火山のベスタ、訪れた世界たち、彗星の構造、カイパーベルトとオールトの雲、彗星の燃える生と死、衝突と惑星防衛、そして赤いケンタウルス族と捕らわれたトロヤ群。そして「知識チェック」で力を試そう。",
    ctaText: "力試しの準備はいい？",
    ctaBtn: "知識チェック →",
    footer: "第13章 · 事実はすべて本物です。見た目は正確さより分かりやすさを優先しています。",
  },
};

const STATIONS = [
  { id: "types", label: { en: "The Three Asteroid Types", ja: "3つの小惑星タイプ" }, sub: { en: "S · C · M", ja: "S型・C型・M型" }, C: AsteroidTypes },
  { id: "ceresvesta", label: { en: "Ceres & Vesta", ja: "ケレスとベスタ" }, sub: { en: "The two giants", ja: "2つの巨人" }, C: CeresVesta },
  { id: "visited", label: { en: "Worlds We've Visited", ja: "訪れた世界" }, sub: { en: "Gaspra to Toutatis", ja: "ガスプラからトータティス" }, C: VisitedAsteroids },
  { id: "comet", label: { en: "Anatomy of a Comet", ja: "彗星の構造" }, sub: { en: "Nucleus, coma, tails", ja: "核・コマ・尾" }, C: CometAnatomy },
  { id: "reservoirs", label: { en: "Kuiper Belt & Oort Cloud", ja: "カイパーベルトとオールトの雲" }, sub: { en: "Where comets live", ja: "彗星のすみか" }, C: Reservoirs },
  { id: "cometlife", label: { en: "A Comet's Life & Fate", ja: "彗星の生と死" }, sub: { en: "Halley, Rosetta, death", ja: "ハレー・ロゼッタ・終焉" }, C: CometLife },
  { id: "impacts", label: { en: "Impacts & Defense", ja: "衝突と防衛" }, sub: { en: "Tunguska to Spaceguard", ja: "ツングースカからスペースガード" }, C: ImpactsDefense },
  { id: "centaurs", label: { en: "Centaurs & Trojans", ja: "ケンタウルス族とトロヤ群" }, sub: { en: "Red worlds & Lagrange", ja: "赤い世界とラグランジュ" }, C: CentaursTrojans },
];

const QUIZ_TAB = { id: "quiz", label: { en: "Knowledge Check", ja: "知識チェック" }, sub: { en: "Prove it", ja: "力試し" } };

function Chapter13Body({ lang, setLang }) {
  const shared = useT();
  const t = STR[lang];
  const [active, setActive] = useState("types");
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
            <Quiz bank={questions} onExit={() => setActive("types")} />
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

export default function Chapter13() {
  const [lang, setLang] = useState("en");
  return (
    <LangProvider lang={lang}>
      <Chapter13Body lang={lang} setLang={setLang} />
    </LangProvider>
  );
}
