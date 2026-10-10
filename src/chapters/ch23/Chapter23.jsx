/* ============================================================
   CHAPTER 23 — The Death of Stars
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

import { ElectronDegeneracy } from "./stations/ElectronDegeneracy.jsx";
import { ChandrasekharLimit } from "./stations/ChandrasekharLimit.jsx";
import { NovaAndTypeSpectra } from "./stations/NovaAndTypeSpectra.jsx";
import { IronCoreCollapse } from "./stations/IronCoreCollapse.jsx";
import { NeutronStar } from "./stations/NeutronStar.jsx";
import { PulsarLighthouse } from "./stations/PulsarLighthouse.jsx";
import { RemnantFork } from "./stations/RemnantFork.jsx";
import { CosmicAlchemyGRB } from "./stations/CosmicAlchemyGRB.jsx";

const STR = {
  en: {
    eyebrow: "CHAPTER 23",
    title: "The Death of Stars",
    tagline: "Eight short stations on how stars end — the white dwarf held aloft by electron degeneracy and shrinking as it gains mass, the 1.4 M☉ Chandrasekhar limit that detonates a Type Ia, the recurring nova and the Ia/II spectral fingerprints, the iron-core collapse and its neutrino flood, the city-sized neutron star, the spinning pulsar lighthouse, the mass fork between dwarf, neutron star and black hole, and the mergers and gamma-ray bursts that forge the gold in your blood. Then prove it in the Knowledge Check.",
    ctaText: "Ready to test yourself?",
    ctaBtn: "Knowledge Check →",
    footer: "Chapter 23 · every fact is real; the visuals are scaled for clarity, not accuracy.",
  },
  ja: {
    eyebrow: "第23章",
    title: "星の死",
    tagline: "星がどう終わるかをめぐる8つの短いステーション——電子縮退で支えられ、質量が増すほど縮む白色矮星、Ia型を爆発させる1.4 M☉のチャンドラセカール限界、繰り返す新星とIa型／II型のスペクトルの指紋、鉄の核の崩壊とニュートリノの洪水、都市ほどの大きさの中性子星、回転するパルサーの灯台、白色矮星・中性子星・ブラックホールを分ける質量の分岐、そして血の中の金を作る合体とガンマ線バースト。そして「知識チェック」で力を試そう。",
    ctaText: "力試しの準備はいい？",
    ctaBtn: "知識チェック →",
    footer: "第23章 · 事実はすべて本物です。見た目は正確さより分かりやすさを優先しています。",
  },
};

const STATIONS = [
  { id: "degeneracy", label: { en: "Electron Degeneracy", ja: "電子縮退" }, sub: { en: "The white dwarf", ja: "白色矮星" }, C: ElectronDegeneracy },
  { id: "chandrasekhar", label: { en: "The Chandrasekhar Limit", ja: "チャンドラセカール限界" }, sub: { en: "1.4 M☉ → Type Ia", ja: "1.4 M☉ → Ia型" }, C: ChandrasekharLimit },
  { id: "nova", label: { en: "Nova & Spectra", ja: "新星とスペクトル" }, sub: { en: "The Ia/II fingerprint", ja: "Ia／IIの指紋" }, C: NovaAndTypeSpectra },
  { id: "ironcore", label: { en: "Iron-Core Collapse", ja: "鉄の核の崩壊" }, sub: { en: "A neutrino flood", ja: "ニュートリノの洪水" }, C: IronCoreCollapse },
  { id: "neutronstar", label: { en: "The Neutron Star", ja: "中性子星" }, sub: { en: "A city of neutrons", ja: "中性子の都市" }, C: NeutronStar },
  { id: "pulsar", label: { en: "Pulsar Lighthouse", ja: "パルサーの灯台" }, sub: { en: "Spun up & recycled", ja: "加速され再生される" }, C: PulsarLighthouse },
  { id: "remnant", label: { en: "The Remnant Fork", ja: "残骸の分岐" }, sub: { en: "Dwarf, star, or hole", ja: "矮星・星・穴" }, C: RemnantFork },
  { id: "alchemy", label: { en: "Cosmic Alchemy & GRBs", ja: "宇宙の錬金術とGRB" }, sub: { en: "The gold in you", ja: "あなたの中の金" }, C: CosmicAlchemyGRB },
];

const QUIZ_TAB = { id: "quiz", label: { en: "Knowledge Check", ja: "知識チェック" }, sub: { en: "Prove it", ja: "力試し" } };

function Chapter23Body({ lang, setLang }) {
  const shared = useT();
  const t = STR[lang];
  const [active, setActive] = useState("degeneracy");
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
            <Quiz bank={questions} onExit={() => setActive("degeneracy")} />
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

export default function Chapter23() {
  const [lang, setLang] = useState("en");
  return (
    <LangProvider lang={lang}>
      <Chapter23Body lang={lang} setLang={setLang} />
    </LangProvider>
  );
}
