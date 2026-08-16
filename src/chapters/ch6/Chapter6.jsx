/* ============================================================
   CHAPTER 6 — Astronomical Instruments
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

import { TelescopeSystem } from "./stations/TelescopeSystem.jsx";
import { LightBucket } from "./stations/LightBucket.jsx";
import { LensVsMirror } from "./stations/LensVsMirror.jsx";
import { FocusArrangements } from "./stations/FocusArrangements.jsx";
import { SeeingOptics } from "./stations/SeeingOptics.jsx";
import { Detectors } from "./stations/Detectors.jsx";
import { Interferometry } from "./stations/Interferometry.jsx";
import { Observatories } from "./stations/Observatories.jsx";

const STR = {
  en: {
    eyebrow: "CHAPTER 6",
    title: "Astronomical Instruments",
    tagline: "Eight short stations on how we actually see the cosmos — the telescope as a light bucket, lenses versus mirrors, where the light focuses, beating the atmosphere, the detectors that record it, linking dishes for sharper vision, and the great observatories — then prove it in the Knowledge Check.",
    ctaText: "Ready to test yourself?",
    ctaBtn: "Knowledge Check →",
    footer: "Chapter 6 · every fact is real; the visuals are scaled for clarity, not accuracy.",
  },
  ja: {
    eyebrow: "第6章",
    title: "天文観測機器",
    tagline: "宇宙を実際にどう見るのかをめぐる8つの短いステーション——光のバケツとしての望遠鏡、レンズと鏡、光が集まる場所、大気に打ち勝つ工夫、光を記録する検出器、皿を連ねて視力を上げる技、そして偉大な観測所——そして「知識チェック」で力を試そう。",
    ctaText: "力試しの準備はいい？",
    ctaBtn: "知識チェック →",
    footer: "第6章 · 事実はすべて本物です。見た目は正確さより分かりやすさを優先しています。",
  },
};

const STATIONS = [
  { id: "system", label: { en: "Telescope System", ja: "望遠鏡システム" }, sub: { en: "Collector · sorter · detector", ja: "集光・分光・検出" }, C: TelescopeSystem },
  { id: "bucket", label: { en: "The Light Bucket", ja: "光のバケツ" }, sub: { en: "Aperture & focus", ja: "口径と焦点" }, C: LightBucket },
  { id: "optics", label: { en: "Lens vs Mirror", ja: "レンズと鏡" }, sub: { en: "Refractor & reflector", ja: "屈折と反射" }, C: LensVsMirror },
  { id: "focus", label: { en: "Where the Light Focuses", ja: "光が集まる場所" }, sub: { en: "Prime · Newtonian · Cassegrain", ja: "主焦点・ニュートン・カセグレン" }, C: FocusArrangements },
  { id: "seeing", label: { en: "Seeing & Adaptive Optics", ja: "シーイングと補償光学" }, sub: { en: "Beating the atmosphere", ja: "大気に打ち勝つ" }, C: SeeingOptics },
  { id: "detectors", label: { en: "Detectors & Cooling", ja: "検出器と冷却" }, sub: { en: "CCDs & the cold", ja: "CCDと冷却" }, C: Detectors },
  { id: "interfer", label: { en: "Interferometry", ja: "干渉計" }, sub: { en: "Baseline & resolution", ja: "基線と分解能" }, C: Interferometry },
  { id: "observatories", label: { en: "Great Observatories", ja: "偉大な観測所" }, sub: { en: "Hubble · JWST · Rubin", ja: "ハッブル・JWST・ルービン" }, C: Observatories },
];

const QUIZ_TAB = { id: "quiz", label: { en: "Knowledge Check", ja: "知識チェック" }, sub: { en: "Prove it", ja: "力試し" } };

function Chapter6Body({ lang, setLang }) {
  const shared = useT();
  const t = STR[lang];
  const [active, setActive] = useState("system");
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
            <Quiz bank={questions} onExit={() => setActive("system")} />
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

export default function Chapter6() {
  const [lang, setLang] = useState("en");
  return (
    <LangProvider lang={lang}>
      <Chapter6Body lang={lang} setLang={setLang} />
    </LangProvider>
  );
}
