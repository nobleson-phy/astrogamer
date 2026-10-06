/* ============================================================
   CHAPTER 22 — Stars from Adolescence to Old Age
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

import { MainSequenceZAMS } from "./stations/MainSequenceZAMS.jsx";
import { FuelAndLifetime } from "./stations/FuelAndLifetime.jsx";
import { RedGiantExpansion } from "./stations/RedGiantExpansion.jsx";
import { TripleAlphaFlash } from "./stations/TripleAlphaFlash.jsx";
import { StarClusters } from "./stations/StarClusters.jsx";
import { TurnoffClock } from "./stations/TurnoffClock.jsx";
import { PlanetaryNebula } from "./stations/PlanetaryNebula.jsx";
import { OnionCoreIron } from "./stations/OnionCoreIron.jsx";

const STR = {
  en: {
    eyebrow: "CHAPTER 22",
    title: "Stars from Adolescence to Old Age",
    tagline: "Eight short stations following a star from the day it settles onto the main sequence to the day it dies — the zero-age main sequence and the fierce T⁴ grip of temperature on fusion, the mass that sets a star's whole lifespan, the swell to a red giant, the triple-alpha fire and the helium flash, the clusters that let us watch every mass at once, the turnoff that clocks their age, and then two very different deaths: a gentle planetary nebula and an iron-cored collapse. Then prove it in the Knowledge Check.",
    ctaText: "Ready to test yourself?",
    ctaBtn: "Knowledge Check →",
    footer: "Chapter 22 · every fact is real; the visuals are scaled for clarity, not accuracy.",
  },
  ja: {
    eyebrow: "第22章",
    title: "星の成年期から老年期へ",
    tagline: "主系列に落ち着いた日から死ぬ日まで、ひとつの星を追う8つの短いステーション——零年主系列と、融合を激しく握る温度のT⁴則、星の一生を決める質量、赤色巨星への膨張、トリプルアルファの炎とヘリウムフラッシュ、あらゆる質量を一度に見せてくれる星団、その年齢を刻む転回点、そして2つのまったく異なる死：穏やかな惑星状星雲と、鉄の核の崩壊。そして「知識チェック」で力を試そう。",
    ctaText: "力試しの準備はいい？",
    ctaBtn: "知識チェック →",
    footer: "第22章 · 事実はすべて本物です。見た目は正確さより分かりやすさを優先しています。",
  },
};

const STATIONS = [
  { id: "zams", label: { en: "The Main Sequence", ja: "主系列" }, sub: { en: "ZAMS & the T⁴ rule", ja: "ZAMSとT⁴則" }, C: MainSequenceZAMS },
  { id: "lifetime", label: { en: "Fuel & Lifetime", ja: "燃料と寿命" }, sub: { en: "Live fast, die young", ja: "速く生き、若く死ぬ" }, C: FuelAndLifetime },
  { id: "redgiant", label: { en: "Becoming a Red Giant", ja: "赤色巨星になる" }, sub: { en: "Core contracts, shell burns", ja: "核が縮み殻が燃える" }, C: RedGiantExpansion },
  { id: "triplealpha", label: { en: "Triple-Alpha & Flash", ja: "トリプルアルファとフラッシュ" }, sub: { en: "Helium to carbon at 100M K", ja: "1億Kでヘリウムから炭素へ" }, C: TripleAlphaFlash },
  { id: "clusters", label: { en: "Star Clusters", ja: "星団" }, sub: { en: "Globular vs open", ja: "球状と散開" }, C: StarClusters },
  { id: "turnoff", label: { en: "The Turnoff Clock", ja: "転回点の時計" }, sub: { en: "Reading a cluster's age", ja: "星団の年齢を読む" }, C: TurnoffClock },
  { id: "nebula", label: { en: "Planetary Nebula", ja: "惑星状星雲" }, sub: { en: "A gentle death", ja: "穏やかな死" }, C: PlanetaryNebula },
  { id: "onion", label: { en: "Onion Shells & Iron", ja: "玉ねぎの殻と鉄" }, sub: { en: "The end of a giant", ja: "巨星の最期" }, C: OnionCoreIron },
];

const QUIZ_TAB = { id: "quiz", label: { en: "Knowledge Check", ja: "知識チェック" }, sub: { en: "Prove it", ja: "力試し" } };

function Chapter22Body({ lang, setLang }) {
  const shared = useT();
  const t = STR[lang];
  const [active, setActive] = useState("zams");
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
            <Quiz bank={questions} onExit={() => setActive("zams")} />
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

export default function Chapter22() {
  const [lang, setLang] = useState("en");
  return (
    <LangProvider lang={lang}>
      <Chapter22Body lang={lang} setLang={setLang} />
    </LangProvider>
  );
}
