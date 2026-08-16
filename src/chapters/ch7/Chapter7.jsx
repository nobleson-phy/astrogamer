/* ============================================================
   CHAPTER 7 — An Introduction to the Solar System
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

import { SunFamily } from "./stations/SunFamily.jsx";
import { PlanetTypes } from "./stations/PlanetTypes.jsx";
import { SmallBodies } from "./stations/SmallBodies.jsx";
import { Differentiation } from "./stations/Differentiation.jsx";
import { RadioactiveClocks } from "./stations/RadioactiveClocks.jsx";
import { Surfaces } from "./stations/Surfaces.jsx";
import { SolarNebula } from "./stations/SolarNebula.jsx";
import { Exceptions } from "./stations/Exceptions.jsx";

const STR = {
  en: {
    eyebrow: "CHAPTER 7",
    title: "An Introduction to the Solar System",
    tagline: "Eight short stations on our cosmic neighbourhood — the Sun's overwhelming mass, the two families of planets, the asteroids and comets, how worlds sort themselves into layers, radioactive clocks, reading a surface's age, the nebula we were all born from, and the exceptions that break the rules — then prove it in the Knowledge Check.",
    ctaText: "Ready to test yourself?",
    ctaBtn: "Knowledge Check →",
    footer: "Chapter 7 · every fact is real; the visuals are scaled for clarity, not accuracy.",
  },
  ja: {
    eyebrow: "第7章",
    title: "太陽系への招待",
    tagline: "私たちの宇宙のご近所をめぐる8つの短いステーション——太陽の圧倒的な質量、2つの惑星の一族、小惑星と彗星、天体が層に分かれるしくみ、放射性時計、表面の年齢の読み方、私たちみなが生まれた星雲、そして規則を破る例外たち——そして「知識チェック」で力を試そう。",
    ctaText: "力試しの準備はいい？",
    ctaBtn: "知識チェック →",
    footer: "第7章 · 事実はすべて本物です。見た目は正確さより分かりやすさを優先しています。",
  },
};

const STATIONS = [
  { id: "family", label: { en: "The Sun's Family", ja: "太陽の一家" }, sub: { en: "99.8% of the mass", ja: "質量の99.8%" }, C: SunFamily },
  { id: "planets", label: { en: "Two Kinds of Planets", ja: "2種類の惑星" }, sub: { en: "Terrestrial & giant", ja: "地球型と巨大惑星" }, C: PlanetTypes },
  { id: "smallbodies", label: { en: "Asteroids & Comets", ja: "小惑星と彗星" }, sub: { en: "Chemical fossils", ja: "化学的化石" }, C: SmallBodies },
  { id: "differentiation", label: { en: "Differentiation", ja: "分化" }, sub: { en: "Cores, mantles, crusts", ja: "核・マントル・地殻" }, C: Differentiation },
  { id: "dating", label: { en: "Radioactive Clocks", ja: "放射性時計" }, sub: { en: "Half-life & the age", ja: "半減期と年齢" }, C: RadioactiveClocks },
  { id: "surfaces", label: { en: "Reading Surfaces", ja: "表面を読む" }, sub: { en: "Craters & cooling", ja: "クレーターと冷却" }, C: Surfaces },
  { id: "nebula", label: { en: "Birth of the System", ja: "太陽系の誕生" }, sub: { en: "The solar nebula", ja: "太陽系星雲" }, C: SolarNebula },
  { id: "exceptions", label: { en: "Exceptions & Other Worlds", ja: "例外と他の世界" }, sub: { en: "Collisions · Voyager · exoplanets", ja: "衝突・ボイジャー・系外惑星" }, C: Exceptions },
];

const QUIZ_TAB = { id: "quiz", label: { en: "Knowledge Check", ja: "知識チェック" }, sub: { en: "Prove it", ja: "力試し" } };

function Chapter7Body({ lang, setLang }) {
  const shared = useT();
  const t = STR[lang];
  const [active, setActive] = useState("family");
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
            <Quiz bank={questions} onExit={() => setActive("family")} />
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

export default function Chapter7() {
  const [lang, setLang] = useState("en");
  return (
    <LangProvider lang={lang}>
      <Chapter7Body lang={lang} setLang={setLang} />
    </LangProvider>
  );
}
