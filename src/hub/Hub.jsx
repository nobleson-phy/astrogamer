/* ============================================================
   HUB — landing page listing the chapters of the course
   ============================================================ */
import React, { useState } from "react";
import { LangProvider, useLang, useT, tr } from "../shared/i18n.jsx";
import { C, display, ui, mono } from "../shared/theme.js";
import { styles } from "../shared/styles.js";
import { Starfield } from "../shared/Starfield.jsx";
import { LangBar, GlobalStyle } from "../shared/ui.jsx";

/* Add ch2, ch3 … by appending one entry here. */
const CHAPTERS = [
  {
    n: 1,
    title: { en: "Science and the Universe: A Brief Tour", ja: "科学と宇宙：ブリーフ・ツアー" },
    blurb: {
      en: "Meet the scale of the cosmos, the scientific method, and our place among the stars — the foundation for everything that follows.",
      ja: "宇宙のスケール、科学的手法、そして星々の中での私たちの位置を知ろう——この先すべての土台となる章です。",
    },
    href: "chapters/ch1/index.html",
  },
  {
    n: 2,
    title: { en: "Observing the Sky: The Birth of Astronomy", ja: "空を観る：天文学のはじまり" },
    blurb: {
      en: "Map the celestial sphere, trace the Sun and the wandering planets, and follow the long road from an Earth-centred cosmos to Galileo's telescope.",
      ja: "天球を描き、太陽とさまよう惑星の動きを追い、地球中心の宇宙観からガリレオの望遠鏡へと至る長い道のりをたどろう。",
    },
    href: "chapters/ch2/index.html",
  },
  {
    n: 3,
    title: { en: "Orbits and Gravity", ja: "軌道と重力" },
    blurb: {
      en: "From Kepler's ellipses to Newton's universal gravity — see why planets sweep, why we're weightless in orbit, and how a planet was found with pure math.",
      ja: "ケプラーの楕円からニュートンの万有引力へ——惑星がなぜ速度を変えるのか、軌道上でなぜ無重力になるのか、そして計算だけで惑星が見つかった理由を探ろう。",
    },
    href: "chapters/ch3/index.html",
  },
  {
    n: 4,
    title: { en: "Earth, Moon, and Sky", ja: "地球・月・空" },
    blurb: {
      en: "Map the sky, chase the seasons and the changing Moon, keep time and the calendar, ride the tides, and catch an eclipse.",
      ja: "空を地図化し、季節と満ち欠けを追い、時と暦を刻み、潮の満ち引きに乗り、そして食をとらえよう。",
    },
    href: "chapters/ch4/index.html",
  },
  {
    n: 5,
    title: { en: "Radiation and Spectra", ja: "放射とスペクトル" },
    blurb: {
      en: "Decode starlight itself — waves and photons, the electromagnetic spectrum, the colours of heat, the prism, the atom's fingerprints, and the Doppler shift that reveals a star's motion.",
      ja: "星の光そのものを読み解こう——波と光子、電磁スペクトル、熱の色、プリズム、原子の指紋、そして星の運動を明かすドップラー効果。",
    },
    href: "chapters/ch5/index.html",
  },
  {
    n: 6,
    title: { en: "Astronomical Instruments", ja: "天文観測機器" },
    blurb: {
      en: "How we actually see the cosmos — the telescope as a light bucket, lenses versus mirrors, beating the blurring atmosphere, the detectors that record starlight, and the great observatories from Hubble to JWST to Rubin.",
      ja: "宇宙を実際にどう見るのか——光のバケツとしての望遠鏡、レンズと鏡、ぼやけを生む大気に打ち勝つ工夫、星の光を記録する検出器、そしてハッブルからJWST、ルービンまでの偉大な観測所。",
    },
    href: "chapters/ch6/index.html",
  },
  {
    n: 7,
    title: { en: "An Introduction to the Solar System", ja: "太陽系への招待" },
    blurb: {
      en: "Tour our cosmic neighbourhood — the Sun that holds 99.8% of the mass, the two families of planets, asteroids and comets as chemical fossils, radioactive clocks, and the spinning nebula that gave birth to it all.",
      ja: "私たちの宇宙のご近所を巡ろう——質量の99.8%を握る太陽、2つの惑星の一族、化学的化石としての小惑星と彗星、放射性時計、そしてすべてを生んだ回転する星雲。",
    },
    href: "chapters/ch7/index.html",
  },
];

const MORE = { en: "More chapters coming", ja: "続く章は準備中" };
const CHAPTER_WORD = { en: "Chapter", ja: "第" };
const CHAPTER_SUFFIX = { en: "", ja: "章" };
const OPEN = { en: "Open chapter →", ja: "章をひらく →" };
const COURSE = { en: "The course", ja: "コース" };
const PICK = { en: "Choose a chapter to begin.", ja: "始めたい章を選ぼう。" };

const hubStyles = {
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18, marginTop: 12 },
  card: {
    display: "flex", flexDirection: "column", gap: 10, textDecoration: "none",
    background: "rgba(8,12,26,0.6)", border: `1px solid ${C.border}`, borderRadius: 16,
    padding: 24, color: C.text, transition: "all 0.15s", minHeight: 190,
  },
  cardNum: { fontFamily: mono, fontSize: 13, letterSpacing: 2, color: C.cool, textTransform: "uppercase" },
  cardTitle: { fontFamily: display, fontWeight: 400, fontSize: 24, lineHeight: 1.2, margin: 0 },
  cardBlurb: { color: C.muted, fontSize: 15.5, lineHeight: 1.55, flex: 1 },
  cardGo: { fontFamily: mono, fontSize: 14, color: C.sun, marginTop: 4 },
  soon: {
    display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 6,
    background: "rgba(8,12,26,0.35)", border: `1px dashed ${C.border}`, borderRadius: 16,
    padding: 24, color: C.faint, minHeight: 190, textAlign: "center",
  },
};

function HubBody({ lang, setLang }) {
  const s = useT();
  return (
    <div style={styles.root}>
      <GlobalStyle />
      <Starfield />
      <div style={styles.content}>
        <LangBar lang={lang} setLang={setLang} />
        <header style={styles.header}>
          <div style={styles.eyebrow}>{s.eyebrow}</div>
          <h1 style={styles.title}>Cosmic Explorer</h1>
          <p style={styles.tagline}>{s.tagline}</p>
        </header>

        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginTop: 8 }}>
          <div style={{ fontFamily: mono, fontSize: 13, letterSpacing: 2, color: C.cool, textTransform: "uppercase" }}>{tr(COURSE, lang)}</div>
          <div style={{ color: C.faint, fontSize: 14 }}>{tr(PICK, lang)}</div>
        </div>

        <div style={hubStyles.grid}>
          {CHAPTERS.map((ch) => (
            <a key={ch.n} href={ch.href} style={hubStyles.card}>
              <div style={hubStyles.cardNum}>
                {tr(CHAPTER_WORD, lang)} {ch.n}{tr(CHAPTER_SUFFIX, lang)}
              </div>
              <h2 style={hubStyles.cardTitle}>{tr(ch.title, lang)}</h2>
              <p style={hubStyles.cardBlurb}>{tr(ch.blurb, lang)}</p>
              <span style={hubStyles.cardGo}>{tr(OPEN, lang)}</span>
            </a>
          ))}
          <div style={hubStyles.soon}>
            <span style={{ fontFamily: display, fontSize: 20, color: C.muted }}>✦</span>
            <span>{tr(MORE, lang)}</span>
          </div>
        </div>

        <footer style={styles.footer}>{s.footer}</footer>
      </div>
    </div>
  );
}

export default function Hub() {
  const [lang, setLang] = useState("en");
  return (
    <LangProvider lang={lang}>
      <HubBody lang={lang} setLang={setLang} />
    </LangProvider>
  );
}
