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
  {
    n: 8,
    title: { en: "Earth as a Planet", ja: "惑星としての地球" },
    blurb: {
      en: "Meet our own world as an astronomer sees it — a layered, magnetic interior read by seismic waves, drifting continents, a living atmosphere and greenhouse, and a four-billion-year story of oxygen, ice ages and impacts.",
      ja: "天文学者の目で私たち自身の世界を見よう——地震波で読み解く層状で磁気をもつ内部、移動する大陸、生きた大気と温室効果、そして酸素・氷河期・衝突をめぐる40億年の物語。",
    },
    href: "chapters/ch8/index.html",
  },
  {
    n: 9,
    title: { en: "Cratered Worlds", ja: "クレーターの世界" },
    blurb: {
      en: "Explore the Moon and Mercury — airless, cratered worlds that preserve the solar system's violent youth. Meet the lunar highlands and maria, the physics of impacts, polar ice, the Giant Impact, and Mercury's giant iron core.",
      ja: "月と水星を探ろう——太陽系の激しい若さを保つ、空気のないクレーターの世界。月の高地と海、衝突の物理、極の氷、ジャイアント・インパクト、そして水星の巨大な鉄の核に出会おう。",
    },
    href: "chapters/ch9/index.html",
  },
  {
    n: 10,
    title: { en: "Earthlike Planets: Venus and Mars", ja: "地球型惑星：金星と火星" },
    blurb: {
      en: "Visit our sister worlds — Venus, a veiled inferno crushed under 90 bars of CO₂ and a runaway greenhouse, and Mars, a frozen desert of rust, giant volcanoes, and vanished water — and see why three similar planets took such different paths.",
      ja: "姉妹の世界を訪ねよう——90気圧のCO₂と暴走温室効果に押しつぶされた、ベールの灼熱・金星と、錆と巨大火山と失われた水の凍った砂漠・火星——そして似た3つの惑星がなぜこれほど異なる道を歩んだのかを見よう。",
    },
    href: "chapters/ch10/index.html",
  },
  {
    n: 11,
    title: { en: "The Giant Planets", ja: "巨大惑星" },
    blurb: {
      en: "Journey to Jupiter, Saturn, Uranus and Neptune — worlds of hydrogen and ice with metallic-hydrogen hearts, ammonia clouds and centuries-old storms, a hexagon and 1800 km/h winds, and the tilted blue ice giants at the cold edge of sunlight.",
      ja: "木星・土星・天王星・海王星への旅——金属水素の心臓、アンモニアの雲と何世紀も続く嵐、六角形と時速1800 kmの風をもつ水素と氷の世界、そして日光の冷たい果てにある傾いた青い氷の巨人。",
    },
    href: "chapters/ch11/index.html",
  },
  {
    n: 12,
    title: { en: "Rings, Moons, and Pluto", ja: "環・衛星・冥王星" },
    blurb: {
      en: "Explore the icy outer moons and rings — volcanic Io, Europa's hidden ocean, hazy Titan, Saturn's ice rings and Enceladus's geysers, backward Triton, and Pluto's nitrogen heart — worlds that show life's ingredients far from the Sun.",
      ja: "氷の外側の衛星と環を探ろう——火山のイオ、エウロパの隠れた海、もやのタイタン、土星の氷の環とエンケラドスの間欠泉、逆行するトリトン、そして冥王星の窒素の心臓——太陽から遠く離れて生命の材料を示す世界たち。",
    },
    href: "chapters/ch12/index.html",
  },
  {
    n: 13,
    title: { en: "Comets and Asteroids", ja: "彗星と小惑星" },
    blurb: {
      en: "Meet the solar system's small bodies — the S, C and M asteroid types, dwarf-planet Ceres and volcanic Vesta, comets with their ion and dust tails, the Kuiper belt and Oort cloud, Tunguska and planetary defense, and the red centaurs and Jupiter's trapped Trojans.",
      ja: "太陽系の小天体に出会おう——S型・C型・M型の小惑星、準惑星ケレスと火山のベスタ、イオンと塵の尾をもつ彗星、カイパーベルトとオールトの雲、ツングースカと惑星防衛、そして赤いケンタウルス族と木星に捕らわれたトロヤ群。",
    },
    href: "chapters/ch13/index.html",
  },
  {
    n: 14,
    title: { en: "Cosmic Samples and the Origin of the Solar System", ja: "宇宙のサンプルと太陽系の起源" },
    blurb: {
      en: "Read the debris that rains down on Earth — meteor showers and their radiants, meteor storms, the plunge from meteor to meteorite, the Antarctic meteorite harvest, stones, irons and stony-irons, amino acids in carbonaceous meteorites, the condensation sequence that built the planets, and the exoplanets that rewrote planet formation.",
      ja: "地球に降り注ぐ破片を読み解こう——流星群と放射点、流星嵐、流星から隕石への落下、南極の隕石採集、石質・鉄質・石鉄隕石、炭素質隕石のアミノ酸、惑星を作った凝縮系列、そして惑星形成を書き換えた系外惑星。",
    },
    href: "chapters/ch14/index.html",
  },
  {
    n: 15,
    title: { en: "The Sun: A Garden-Variety Star", ja: "太陽：ありふれた星" },
    blurb: {
      en: "Meet our nearest star — its layered interior, the atmosphere that grows hotter outward to a million-degree corona, Cecilia Payne's discovery that it's mostly hydrogen and helium, granulation and differential rotation, magnetic sunspots and the 11/22-year cycle, plages, prominences and coronal holes, and the CMEs and space weather that reach Earth.",
      ja: "私たちに最も近い星に出会おう——層状の内部、外へ100万度のコロナまで熱くなる大気、主に水素とヘリウムだというセシリア・ペインの発見、粒状斑と差動回転、磁気の黒点と11年／22年周期、白斑・プロミネンス・コロナホール、そして地球に届くCMEと宇宙天気。",
    },
    href: "chapters/ch15/index.html",
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
