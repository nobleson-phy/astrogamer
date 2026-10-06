/* ============================================================
   CHAPTER 21 — The Birth of Stars and the Discovery of Exoplanets
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

import { StellarNurseries } from "./stations/StellarNurseries.jsx";
import { ProtostarBirth } from "./stations/ProtostarBirth.jsx";
import { JetsTTauri } from "./stations/JetsTTauri.jsx";
import { DopplerMethod } from "./stations/DopplerMethod.jsx";
import { TransitMethod } from "./stations/TransitMethod.jsx";
import { HotJupiters } from "./stations/HotJupiters.jsx";
import { ZooOfWorlds } from "./stations/ZooOfWorlds.jsx";
import { HabitableZone } from "./stations/HabitableZone.jsx";

const STR = {
  en: {
    eyebrow: "CHAPTER 21",
    title: "The Birth of Stars & Exoplanets",
    tagline: "Eight short stations on where stars come from and the worlds that orbit them — the giant molecular clouds that are stellar nurseries, the contracting protostar, its jets and T Tauri youth, and then the hunt for exoplanets by Doppler wobble and by transit, the surprising hot Jupiters, the zoo of super-Earths and ancient systems, and the habitable zone. Then prove it in the Knowledge Check.",
    ctaText: "Ready to test yourself?",
    ctaBtn: "Knowledge Check →",
    footer: "Chapter 21 · every fact is real; the visuals are scaled for clarity, not accuracy.",
  },
  ja: {
    eyebrow: "第21章",
    title: "星の誕生と系外惑星",
    tagline: "星がどこから来て、どんな世界がそれを回るかをめぐる8つの短いステーション——星のゆりかごである巨大分子雲、収縮する原始星、そのジェットとTタウリの若さ、そしてドップラーの揺れとトランジットによる系外惑星探し、驚きのホットジュピター、スーパーアースや古代の系の動物園、そしてハビタブルゾーン。そして「知識チェック」で力を試そう。",
    ctaText: "力試しの準備はいい？",
    ctaBtn: "知識チェック →",
    footer: "第21章 · 事実はすべて本物です。見た目は正確さより分かりやすさを優先しています。",
  },
};

const STATIONS = [
  { id: "nurseries", label: { en: "Stellar Nurseries", ja: "星のゆりかご" }, sub: { en: "Giant molecular clouds", ja: "巨大分子雲" }, C: StellarNurseries },
  { id: "protostar", label: { en: "Birth of a Protostar", ja: "原始星の誕生" }, sub: { en: "Contraction & tracks", ja: "収縮と進化の経路" }, C: ProtostarBirth },
  { id: "jets", label: { en: "Jets & T Tauri Stars", ja: "ジェットとTタウリ星" }, sub: { en: "HH objects & disks", ja: "HH天体と円盤" }, C: JetsTTauri },
  { id: "doppler", label: { en: "The Doppler Method", ja: "ドップラー法" }, sub: { en: "Stellar wobble", ja: "星の揺れ" }, C: DopplerMethod },
  { id: "transit", label: { en: "The Transit Method", ja: "トランジット法" }, sub: { en: "Dips & densities", ja: "減光と密度" }, C: TransitMethod },
  { id: "hotjup", label: { en: "Hot Jupiters", ja: "ホットジュピター" }, sub: { en: "A migrating surprise", ja: "移動する驚き" }, C: HotJupiters },
  { id: "zoo", label: { en: "A Zoo of Worlds", ja: "世界の動物園" }, sub: { en: "Super-Earths & more", ja: "スーパーアースほか" }, C: ZooOfWorlds },
  { id: "habitable", label: { en: "The Habitable Zone", ja: "ハビタブルゾーン" }, sub: { en: "Room for water?", ja: "水の余地は？" }, C: HabitableZone },
];

const QUIZ_TAB = { id: "quiz", label: { en: "Knowledge Check", ja: "知識チェック" }, sub: { en: "Prove it", ja: "力試し" } };

function Chapter21Body({ lang, setLang }) {
  const shared = useT();
  const t = STR[lang];
  const [active, setActive] = useState("nurseries");
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
            <Quiz bank={questions} onExit={() => setActive("nurseries")} />
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

export default function Chapter21() {
  const [lang, setLang] = useState("en");
  return (
    <LangProvider lang={lang}>
      <Chapter21Body lang={lang} setLang={setLang} />
    </LangProvider>
  );
}
