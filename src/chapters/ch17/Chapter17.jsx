/* ============================================================
   CHAPTER 17 — Analyzing Starlight
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

import { BrightnessLuminosity } from "./stations/BrightnessLuminosity.jsx";
import { MagnitudeScale } from "./stations/MagnitudeScale.jsx";
import { ColorTemperature } from "./stations/ColorTemperature.jsx";
import { SpectralClasses } from "./stations/SpectralClasses.jsx";
import { BrownDwarfs } from "./stations/BrownDwarfs.jsx";
import { CataloguingStars } from "./stations/CataloguingStars.jsx";
import { LineShapes } from "./stations/LineShapes.jsx";
import { StellarMotions } from "./stations/StellarMotions.jsx";

const STR = {
  en: {
    eyebrow: "CHAPTER 17",
    title: "Analyzing Starlight",
    tagline: "Eight short stations on how a point of light becomes a known star — brightness versus true luminosity, the backwards magnitude scale, color as a thermometer, the OBAFGKM spectral sequence, the cool brown dwarfs beyond it, the women who catalogued the sky, what line shapes reveal about pressure and spin, and the motions we read from a Doppler shift. Then prove it in the Knowledge Check.",
    ctaText: "Ready to test yourself?",
    ctaBtn: "Knowledge Check →",
    footer: "Chapter 17 · every fact is real; the visuals are scaled for clarity, not accuracy.",
  },
  ja: {
    eyebrow: "第17章",
    title: "星の光を読み解く",
    tagline: "一つの光の点が既知の星になるまでをめぐる8つの短いステーション——見かけの明るさと真の光度、逆向きの等級スケール、温度計としての色、OBAFGKMの分光系列、その先の冷たい褐色矮星、空を目録化した女性たち、線の形が明かす圧力と自転、そしてドップラー偏移から読む運動。そして「知識チェック」で力を試そう。",
    ctaText: "力試しの準備はいい？",
    ctaBtn: "知識チェック →",
    footer: "第17章 · 事実はすべて本物です。見た目は正確さより分かりやすさを優先しています。",
  },
};

const STATIONS = [
  { id: "brightness", label: { en: "Brightness vs Luminosity", ja: "明るさと光度" }, sub: { en: "The inverse-square law", ja: "逆二乗の法則" }, C: BrightnessLuminosity },
  { id: "magnitude", label: { en: "The Magnitude Scale", ja: "等級スケール" }, sub: { en: "Backwards & logarithmic", ja: "逆向きで対数的" }, C: MagnitudeScale },
  { id: "color", label: { en: "Color & Temperature", ja: "色と温度" }, sub: { en: "Wien's law", ja: "ウィーンの法則" }, C: ColorTemperature },
  { id: "spectral", label: { en: "Spectral Classes", ja: "分光型" }, sub: { en: "O B A F G K M", ja: "O B A F G K M" }, C: SpectralClasses },
  { id: "browndwarfs", label: { en: "Brown Dwarfs", ja: "褐色矮星" }, sub: { en: "L, T, and Y", ja: "L・T・Y" }, C: BrownDwarfs },
  { id: "catalogue", label: { en: "Cataloguing the Stars", ja: "星の目録化" }, sub: { en: "Cannon, Huggins, metals", ja: "キャノン・ハギンズ・金属" }, C: CataloguingStars },
  { id: "lines", label: { en: "What Line Shapes Reveal", ja: "線の形が明かすもの" }, sub: { en: "Pressure & rotation", ja: "圧力と自転" }, C: LineShapes },
  { id: "motions", label: { en: "Stellar Motions", ja: "星の運動" }, sub: { en: "Doppler & proper motion", ja: "ドップラーと固有運動" }, C: StellarMotions },
];

const QUIZ_TAB = { id: "quiz", label: { en: "Knowledge Check", ja: "知識チェック" }, sub: { en: "Prove it", ja: "力試し" } };

function Chapter17Body({ lang, setLang }) {
  const shared = useT();
  const t = STR[lang];
  const [active, setActive] = useState("brightness");
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
            <Quiz bank={questions} onExit={() => setActive("brightness")} />
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

export default function Chapter17() {
  const [lang, setLang] = useState("en");
  return (
    <LangProvider lang={lang}>
      <Chapter17Body lang={lang} setLang={setLang} />
    </LangProvider>
  );
}
