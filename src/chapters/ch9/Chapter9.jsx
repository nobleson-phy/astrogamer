/* ============================================================
   CHAPTER 9 — Cratered Worlds (the Moon & Mercury)
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

import { MoonFaces } from "./stations/MoonFaces.jsx";
import { ImpactAnatomy } from "./stations/ImpactAnatomy.jsx";
import { CraterDating } from "./stations/CraterDating.jsx";
import { RegolithIce } from "./stations/RegolithIce.jsx";
import { MoonOrigin } from "./stations/MoonOrigin.jsx";
import { MercuryIron } from "./stations/MercuryIron.jsx";
import { MercuryDay } from "./stations/MercuryDay.jsx";
import { MercuryCrust } from "./stations/MercuryCrust.jsx";

const STR = {
  en: {
    eyebrow: "CHAPTER 9",
    title: "Cratered Worlds",
    tagline: "Eight short stations on the Moon and Mercury — the two lunar terrains, how craters form and date a surface, the soil and the polar ice, where the Moon came from, and Mercury's iron heart, strange day, and wrinkled crust — then prove it in the Knowledge Check.",
    ctaText: "Ready to test yourself?",
    ctaBtn: "Knowledge Check →",
    footer: "Chapter 9 · every fact is real; the visuals are scaled for clarity, not accuracy.",
  },
  ja: {
    eyebrow: "第9章",
    title: "クレーターの世界",
    tagline: "月と水星をめぐる8つの短いステーション——月の2つの地形、クレーターのでき方と年代測定、土と極の氷、月の起源、そして水星の鉄の心臓・奇妙な一日・しわの寄った地殻——そして「知識チェック」で力を試そう。",
    ctaText: "力試しの準備はいい？",
    ctaBtn: "知識チェック →",
    footer: "第9章 · 事実はすべて本物です。見た目は正確さより分かりやすさを優先しています。",
  },
};

const STATIONS = [
  { id: "moonface", label: { en: "The Moon's Two Faces", ja: "月の2つの顔" }, sub: { en: "Highlands & maria", ja: "高地と海" }, C: MoonFaces },
  { id: "impact", label: { en: "Anatomy of an Impact", ja: "衝突の解剖" }, sub: { en: "How craters form", ja: "クレーターのでき方" }, C: ImpactAnatomy },
  { id: "dating", label: { en: "Dating by Craters", ja: "クレーターで年代測定" }, sub: { en: "The heavy bombardment", ja: "後期重爆撃" }, C: CraterDating },
  { id: "regolith", label: { en: "Regolith & Polar Ice", ja: "レゴリスと極の氷" }, sub: { en: "Soil, water & fuel", ja: "土・水・燃料" }, C: RegolithIce },
  { id: "origin", label: { en: "Where the Moon Came From", ja: "月の起源" }, sub: { en: "The Giant Impact", ja: "ジャイアント・インパクト" }, C: MoonOrigin },
  { id: "mercury", label: { en: "Mercury: Iron World", ja: "水星：鉄の世界" }, sub: { en: "A giant core", ja: "巨大な核" }, C: MercuryIron },
  { id: "mercuryday", label: { en: "Mercury's Strange Day", ja: "水星の奇妙な一日" }, sub: { en: "3:2 spin–orbit", ja: "3:2の自転公転" }, C: MercuryDay },
  { id: "mercurycrust", label: { en: "Mercury's Scarred Crust", ja: "水星の傷ついた地殻" }, sub: { en: "Caloris & scarps", ja: "カロリス盆地と崖" }, C: MercuryCrust },
];

const QUIZ_TAB = { id: "quiz", label: { en: "Knowledge Check", ja: "知識チェック" }, sub: { en: "Prove it", ja: "力試し" } };

function Chapter9Body({ lang, setLang }) {
  const shared = useT();
  const t = STR[lang];
  const [active, setActive] = useState("moonface");
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
            <Quiz bank={questions} onExit={() => setActive("moonface")} />
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

export default function Chapter9() {
  const [lang, setLang] = useState("en");
  return (
    <LangProvider lang={lang}>
      <Chapter9Body lang={lang} setLang={setLang} />
    </LangProvider>
  );
}
