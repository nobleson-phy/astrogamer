/* ============================================================
   CHAPTER 16 — The Sun: A Nuclear Powerhouse
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

import { EnergyCrisis } from "./stations/EnergyCrisis.jsx";
import { MassEnergy } from "./stations/MassEnergy.jsx";
import { FuelBudget } from "./stations/FuelBudget.jsx";
import { FusionChain } from "./stations/FusionChain.jsx";
import { ForcesTemperature } from "./stations/ForcesTemperature.jsx";
import { EnergyJourney } from "./stations/EnergyJourney.jsx";
import { Neutrinos } from "./stations/Neutrinos.jsx";
import { ModelingSun } from "./stations/ModelingSun.jsx";

const STR = {
  en: {
    eyebrow: "CHAPTER 16",
    title: "The Sun: A Nuclear Powerhouse",
    tagline: "Eight short stations on what makes the Sun shine — why gravity and chemistry weren't enough, Einstein's E = mc², the Sun's staggering fuel budget, the proton-proton chain and fusion versus fission, the forces and temperatures fusion demands, energy's hundred-thousand-year journey out, the ghostly neutrinos that escape in minutes, and how we model a place we can never see. Then prove it in the Knowledge Check.",
    ctaText: "Ready to test yourself?",
    ctaBtn: "Knowledge Check →",
    footer: "Chapter 16 · every fact is real; the visuals are scaled for clarity, not accuracy.",
  },
  ja: {
    eyebrow: "第16章",
    title: "太陽：核の発電所",
    tagline: "太陽が輝く理由をめぐる8つの短いステーション——なぜ重力と化学では足りなかったか、アインシュタインの E = mc²、太陽の途方もない燃料収支、陽子-陽子連鎖と核融合対核分裂、核融合が要求する力と温度、エネルギーの10万年の脱出の旅、数分で逃げるかそけきニュートリノ、そして決して見られない場所をどうモデル化するか。そして「知識チェック」で力を試そう。",
    ctaText: "力試しの準備はいい？",
    ctaBtn: "知識チェック →",
    footer: "第16章 · 事実はすべて本物です。見た目は正確さより分かりやすさを優先しています。",
  },
};

const STATIONS = [
  { id: "crisis", label: { en: "The Energy Crisis", ja: "エネルギーの危機" }, sub: { en: "Why not gravity or coal?", ja: "重力や石炭ではなぜ不可" }, C: EnergyCrisis },
  { id: "emc2", label: { en: "E = mc²", ja: "E = mc²" }, sub: { en: "Mass into energy", ja: "質量をエネルギーへ" }, C: MassEnergy },
  { id: "fuel", label: { en: "The Sun's Fuel Budget", ja: "太陽の燃料収支" }, sub: { en: "600 million tons/s", ja: "毎秒6億トン" }, C: FuelBudget },
  { id: "chain", label: { en: "The Proton-Proton Chain", ja: "陽子-陽子連鎖" }, sub: { en: "Fusion, not fission", ja: "分裂ではなく融合" }, C: FusionChain },
  { id: "forces", label: { en: "Forces & Temperature", ja: "力と温度" }, sub: { en: "Beating repulsion", ja: "反発に打ち勝つ" }, C: ForcesTemperature },
  { id: "journey", label: { en: "Energy's Long Journey", ja: "エネルギーの長い旅" }, sub: { en: "The random walk", ja: "ランダムウォーク" }, C: EnergyJourney },
  { id: "neutrinos", label: { en: "Ghost Particles", ja: "幽霊粒子" }, sub: { en: "Neutrinos & Davis", ja: "ニュートリノとデイビス" }, C: Neutrinos },
  { id: "modeling", label: { en: "Modeling the Hidden Sun", ja: "隠れた太陽のモデル化" }, sub: { en: "Helioseismology", ja: "日震学" }, C: ModelingSun },
];

const QUIZ_TAB = { id: "quiz", label: { en: "Knowledge Check", ja: "知識チェック" }, sub: { en: "Prove it", ja: "力試し" } };

function Chapter16Body({ lang, setLang }) {
  const shared = useT();
  const t = STR[lang];
  const [active, setActive] = useState("crisis");
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
            <Quiz bank={questions} onExit={() => setActive("crisis")} />
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

export default function Chapter16() {
  const [lang, setLang] = useState("en");
  return (
    <LangProvider lang={lang}>
      <Chapter16Body lang={lang} setLang={setLang} />
    </LangProvider>
  );
}
