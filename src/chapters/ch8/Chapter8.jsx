/* ============================================================
   CHAPTER 8 — Earth as a Planet
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

import { InsideEarth } from "./stations/InsideEarth.jsx";
import { SeismicSounding } from "./stations/SeismicSounding.jsx";
import { CrustRocks } from "./stations/CrustRocks.jsx";
import { PlateTectonics } from "./stations/PlateTectonics.jsx";
import { Atmosphere } from "./stations/Atmosphere.jsx";
import { Greenhouse } from "./stations/Greenhouse.jsx";
import { CarbonVault } from "./stations/CarbonVault.jsx";
import { LifeOxygen } from "./stations/LifeOxygen.jsx";

const STR = {
  en: {
    eyebrow: "CHAPTER 8",
    title: "Earth as a Planet",
    tagline: "Eight short stations on our own world — its layered interior, the seismic waves that reveal it, the crust and its rocks, the drifting plates, the air we breathe, the greenhouse that warms us, the vaults that hold our carbon and water, and the long story of life and catastrophe — then prove it in the Knowledge Check.",
    ctaText: "Ready to test yourself?",
    ctaBtn: "Knowledge Check →",
    footer: "Chapter 8 · every fact is real; the visuals are scaled for clarity, not accuracy.",
  },
  ja: {
    eyebrow: "第8章",
    title: "惑星としての地球",
    tagline: "私たち自身の世界をめぐる8つの短いステーション——層をなす内部、それを明かす地震波、地殻とその岩石、移動するプレート、呼吸する大気、私たちを暖める温室効果、炭素と水を蓄える金庫、そして生命と大変動の長い物語——そして「知識チェック」で力を試そう。",
    ctaText: "力試しの準備はいい？",
    ctaBtn: "知識チェック →",
    footer: "第8章 · 事実はすべて本物です。見た目は正確さより分かりやすさを優先しています。",
  },
};

const STATIONS = [
  { id: "interior", label: { en: "Inside the Earth", ja: "地球の内部" }, sub: { en: "Core, mantle, crust", ja: "核・マントル・地殻" }, C: InsideEarth },
  { id: "seismic", label: { en: "Seismic Sounding", ja: "地震波で探る" }, sub: { en: "Waves & shadow zones", ja: "波と影の帯" }, C: SeismicSounding },
  { id: "crust", label: { en: "The Crust & Rocks", ja: "地殻と岩石" }, sub: { en: "Granite, basalt, rock cycle", ja: "花崗岩・玄武岩・岩石循環" }, C: CrustRocks },
  { id: "tectonics", label: { en: "Plate Tectonics", ja: "プレートテクトニクス" }, sub: { en: "Drift, rifts & subduction", ja: "移動・海嶺・沈み込み" }, C: PlateTectonics },
  { id: "atmosphere", label: { en: "The Atmosphere", ja: "大気" }, sub: { en: "Composition & layers", ja: "組成と層" }, C: Atmosphere },
  { id: "greenhouse", label: { en: "The Greenhouse Effect", ja: "温室効果" }, sub: { en: "Trapping infrared", ja: "赤外線を閉じ込める" }, C: Greenhouse },
  { id: "carbon", label: { en: "Air & the Carbon Vault", ja: "大気と炭素の金庫" }, sub: { en: "Where the volatiles hide", ja: "揮発性物質のありか" }, C: CarbonVault },
  { id: "life", label: { en: "Life, Oxygen & Catastrophes", ja: "生命・酸素・大変動" }, sub: { en: "Stromatolites to the dinosaurs", ja: "ストロマトライトから恐竜まで" }, C: LifeOxygen },
];

const QUIZ_TAB = { id: "quiz", label: { en: "Knowledge Check", ja: "知識チェック" }, sub: { en: "Prove it", ja: "力試し" } };

function Chapter8Body({ lang, setLang }) {
  const shared = useT();
  const t = STR[lang];
  const [active, setActive] = useState("interior");
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
            <Quiz bank={questions} onExit={() => setActive("interior")} />
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

export default function Chapter8() {
  const [lang, setLang] = useState("en");
  return (
    <LangProvider lang={lang}>
      <Chapter8Body lang={lang} setLang={setLang} />
    </LangProvider>
  );
}
