/* ============================================================
   CHAPTER 5 — Radiation and Spectra
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

import { WaveAnatomy } from "./stations/WaveAnatomy.jsx";
import { EMSpectrum } from "./stations/EMSpectrum.jsx";
import { Photons } from "./stations/Photons.jsx";
import { InverseSquare } from "./stations/InverseSquare.jsx";
import { Blackbody } from "./stations/Blackbody.jsx";
import { PrismSpectra } from "./stations/PrismSpectra.jsx";
import { AtomLines } from "./stations/AtomLines.jsx";
import { Doppler } from "./stations/Doppler.jsx";

const STR = {
  en: {
    eyebrow: "CHAPTER 5",
    title: "Radiation and Spectra",
    tagline: "Eight short stations on light itself — waves and photons, the electromagnetic spectrum, how distance dims a star, the colours of heat, the prism, the atom's fingerprints, and the Doppler shift — then prove it in the Knowledge Check.",
    ctaText: "Ready to test yourself?",
    ctaBtn: "Knowledge Check →",
    footer: "Chapter 5 · every fact is real; the visuals are scaled for clarity, not accuracy.",
  },
  ja: {
    eyebrow: "第5章",
    title: "放射とスペクトル",
    tagline: "光そのものをめぐる8つの短いステーション——波と光子、電磁スペクトル、距離が星を暗くするしくみ、熱の色、プリズム、原子の指紋、そしてドップラー効果——そして「知識チェック」で力を試そう。",
    ctaText: "力試しの準備はいい？",
    ctaBtn: "知識チェック →",
    footer: "第5章 · 事実はすべて本物です。見た目は正確さより分かりやすさを優先しています。",
  },
};

const STATIONS = [
  { id: "waves", label: { en: "Wave Anatomy", ja: "波の解剖" }, sub: { en: "Wavelength & frequency", ja: "波長と振動数" }, C: WaveAnatomy },
  { id: "spectrum", label: { en: "The EM Spectrum", ja: "電磁スペクトル" }, sub: { en: "Radio → gamma", ja: "電波→ガンマ線" }, C: EMSpectrum },
  { id: "photons", label: { en: "Photons & Energy", ja: "光子とエネルギー" }, sub: { en: "E ∝ frequency", ja: "E ∝ 振動数" }, C: Photons },
  { id: "inverse", label: { en: "Inverse-Square Law", ja: "逆二乗の法則" }, sub: { en: "Brightness & distance", ja: "明るさと距離" }, C: InverseSquare },
  { id: "blackbody", label: { en: "Blackbody & Temperature", ja: "黒体と温度" }, sub: { en: "Wien & Stefan–Boltzmann", ja: "ウィーンとシュテファン=ボルツマン" }, C: Blackbody },
  { id: "prism", label: { en: "Prism & Spectra", ja: "プリズムとスペクトル" }, sub: { en: "Refraction & lines", ja: "屈折と輝線・吸収線" }, C: PrismSpectra },
  { id: "atom", label: { en: "Atom & Spectral Lines", ja: "原子とスペクトル線" }, sub: { en: "Bohr model", ja: "ボーア模型" }, C: AtomLines },
  { id: "doppler", label: { en: "The Doppler Effect", ja: "ドップラー効果" }, sub: { en: "Radial velocity", ja: "視線速度" }, C: Doppler },
];

const QUIZ_TAB = { id: "quiz", label: { en: "Knowledge Check", ja: "知識チェック" }, sub: { en: "Prove it", ja: "力試し" } };

function Chapter5Body({ lang, setLang }) {
  const shared = useT();
  const t = STR[lang];
  const [active, setActive] = useState("waves");
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
            <Quiz bank={questions} onExit={() => setActive("waves")} />
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

export default function Chapter5() {
  const [lang, setLang] = useState("en");
  return (
    <LangProvider lang={lang}>
      <Chapter5Body lang={lang} setLang={setLang} />
    </LangProvider>
  );
}
