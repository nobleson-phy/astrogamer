/* ============================================================
   STATION 2 — TWO KINDS OF PLANETS
   Terrestrial worlds (Mercury, Venus, Earth, Mars): small, rocky,
   dense, iron-nickel cores, basalt surfaces. Giant worlds
   (Jupiter–Neptune): large, low density, lighter ices/liquids/gases.
   Earth is the densest planet; Saturn (0.7 g/cm³) would float.
   Grounded in Ch.7 §7.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

/* density in g/cm³, size relative to Earth, colour, type */
const PLANETS = [
  { id: "mercury", en: "Mercury", ja: "水星", type: "terr", dens: 5.43, size: 0.38, col: "#b0855f" },
  { id: "venus", en: "Venus", ja: "金星", type: "terr", dens: 5.24, size: 0.95, col: "#e6b877" },
  { id: "earth", en: "Earth", ja: "地球", type: "terr", dens: 5.51, size: 1.0, col: "#5b8dee" },
  { id: "mars", en: "Mars", ja: "火星", type: "terr", dens: 3.93, size: 0.53, col: "#d06b4a" },
  { id: "jupiter", en: "Jupiter", ja: "木星", type: "giant", dens: 1.33, size: 11.2, col: "#e0a86a" },
  { id: "saturn", en: "Saturn", ja: "土星", type: "giant", dens: 0.69, size: 9.4, col: "#e8cf9a" },
  { id: "uranus", en: "Uranus", ja: "天王星", type: "giant", dens: 1.27, size: 4.0, col: "#8fd0e0" },
  { id: "neptune", en: "Neptune", ja: "海王星", type: "giant", dens: 1.64, size: 3.9, col: "#5b7de0" },
];

const INFO = {
  mercury: { en: "A small, iron-rich terrestrial world with an enormous metal core.", ja: "鉄に富む小さな地球型惑星で、巨大な金属の核をもつ。" },
  venus: { en: "Rocky and Earth-sized — and it spins backward (retrograde rotation).", ja: "岩石質で地球ほどの大きさ——しかも逆向きに自転する（逆行自転）。" },
  earth: { en: "The densest planet of all (5.5 g/cm³): rock over an iron-nickel core.", ja: "全惑星で最も密度が高い（5.5 g/cm³）——鉄ニッケルの核を岩石が覆う。" },
  mars: { en: "A small basalt-covered terrestrial world, half Earth's size.", ja: "玄武岩に覆われた小さな地球型惑星で、地球の半分ほどの大きさ。" },
  jupiter: { en: "A giant of hydrogen and helium; its deep interior is liquid metallic hydrogen.", ja: "水素とヘリウムの巨人。深部は液体金属水素になっている。" },
  saturn: { en: "So low in density (0.7 g/cm³) it would float in a big enough ocean.", ja: "密度がとても低く（0.7 g/cm³）、十分大きな海があれば水に浮くほど。" },
  uranus: { en: "An ice giant tipped almost completely on its side (~98°).", ja: "ほぼ真横に倒れて自転する（約98°）氷の巨人。" },
  neptune: { en: "The outermost giant, rich in ices of water, methane and ammonia.", ja: "最も外側の巨人。水・メタン・アンモニアの氷に富む。" },
};

const STR = {
  en: {
    title: "Two kinds of planets",
    kind: "Terrestrial rock vs giant gas & ice",
    lede: "Tap through the eight planets. Two families emerge: small dense rock close in, and huge puffy worlds far out. Watch where each lands on the density chart — and note the line that means 'floats in water'.",
    thread: "THE STORY CONTINUES",
    threadText: "The Sun's leftover 0.2% is not a random pile. It sorts cleanly into two kinds of planet — a division that, as we'll see, was written in at birth by the temperature of the newborn Sun.",
    key: "ROCK IN, GAS & ICE OUT",
    keyText: "The inner four — Mercury, Venus, Earth, Mars — are terrestrial: small, rocky, dense, with iron-nickel cores and basalt surfaces. The outer four — Jupiter, Saturn, Uranus, Neptune — are giants of lighter ices, liquids and gases. Earth is the densest planet at 5.5 g/cm³; Saturn, at just 0.7, is less dense than water.",
    densTitle: "Average density (g/cm³)", waterLine: "water · 1.0 — Saturn floats below this",
    typeL: "Type", terrestrial: "Terrestrial", giant: "Giant", densL: "Density", sizeL: "Size (Earth = 1)",
    note: "Bars show each planet's average density; the dashed line is water (1.0 g/cm³). Everything above it would sink; Saturn, below it, would float. Earth is the tallest bar — the densest world.",
  },
  ja: {
    title: "2種類の惑星",
    kind: "地球型の岩石 対 巨大なガスと氷",
    lede: "8つの惑星を順にタップしてみよう。2つの一族が浮かび上がります——内側の小さく密度の高い岩石と、外側の巨大でふくらんだ世界。密度チャートでそれぞれがどこに来るかを見て、「水に浮く」境界線に注目しよう。",
    thread: "物語はつづく",
    threadText: "太陽の残り0.2%は、でたらめな寄せ集めではありません。それはきれいに2種類の惑星に分かれます——のちに見るように、この区分は生まれたての太陽の温度によって、誕生時に書き込まれたものです。",
    key: "内は岩石、外はガスと氷",
    keyText: "内側の4つ——水星・金星・地球・火星——は地球型：小さく、岩石質で、密度が高く、鉄ニッケルの核と玄武岩の表面をもちます。外側の4つ——木星・土星・天王星・海王星——は、より軽い氷・液体・ガスの巨人です。地球は最も密度が高く5.5 g/cm³、土星はわずか0.7で水より軽いのです。",
    densTitle: "平均密度（g/cm³）", waterLine: "水・1.0 — これより下の土星は浮く",
    typeL: "分類", terrestrial: "地球型", giant: "巨大惑星", densL: "密度", sizeL: "大きさ（地球=1）",
    note: "棒は各惑星の平均密度、破線は水（1.0 g/cm³）です。これより上はすべて沈み、下にある土星は浮きます。地球が最も高い棒——最も密度の高い世界です。",
  },
};

function drawDensity(ctx, cw, H, selId, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const padL = 20, padR = 12, padT = 24, padB = 40;
  const plotW = cw - padL - padR, plotH = H - padT - padB;
  const y0 = H - padB;
  const maxD = 6; // g/cm³ axis top
  const yOf = (d) => y0 - (d / maxD) * plotH;
  const n = PLANETS.length, gap = 10;
  const bw = (plotW - gap * (n - 1)) / n;
  // water line
  const wy = yOf(1.0);
  ctx.strokeStyle = "rgba(63,221,255,0.7)"; ctx.setLineDash([6, 5]); ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(padL, wy); ctx.lineTo(cw - padR, wy); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = C.cool; ctx.font = `10.5px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(t.waterLine, padL + 4, wy - 5);
  // bars
  PLANETS.forEach((p, i) => {
    const x = padL + i * (bw + gap);
    const h = (p.dens / maxD) * plotH;
    const on = p.id === selId;
    ctx.fillStyle = on ? p.col : "rgba(150,175,230,0.45)";
    ctx.globalAlpha = on ? 1 : 0.8;
    ctx.fillRect(x, y0 - h, bw, h);
    ctx.globalAlpha = 1;
    if (on) { ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.5; ctx.strokeRect(x, y0 - h, bw, h); }
    ctx.fillStyle = on ? C.text : C.faint; ctx.font = `${on ? "700 " : ""}9.5px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(lang === "ja" ? p.ja : p.en.slice(0, 4), x + bw / 2, y0 + 13);
    ctx.fillStyle = on ? C.sun : C.faint; ctx.font = `9px ${mono}`;
    ctx.fillText(p.dens.toFixed(1), x + bw / 2, y0 - h - 5);
  });
  // axis
  ctx.strokeStyle = "rgba(150,175,230,0.35)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(padL, y0); ctx.lineTo(cw - padR, y0); ctx.stroke();
  ctx.fillStyle = C.faint; ctx.font = `10px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(t.densTitle, padL, padT - 8);
}

export function PlanetTypes() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const [sel, setSel] = useState("earth");
  const cw = Math.min(w, 760);
  const p = PLANETS.find((x) => x.id === sel);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    drawDensity(ctx, cw, H, sel, lang);
  }, [cw, sel, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 02</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{t.threadText}</p>
        </div>
        <div style={styles.fateBox}>
          <div style={{ ...styles.fateLabel, color: C.sun }}>{t.key}</div>
          <p style={styles.keyTermText}>{t.keyText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {PLANETS.map((pl) => (
            <button key={pl.id} onClick={() => setSel(pl.id)}
              style={{ ...styles.chip, ...(sel === pl.id ? styles.chipOn : {}),
                borderColor: sel === pl.id ? pl.col : undefined }}>
              {lang === "ja" ? pl.ja : pl.en}
            </button>
          ))}
        </div>

        {/* selected planet readout */}
        <div style={{ display: "flex", gap: 14, alignItems: "center", marginTop: 12, flexWrap: "wrap" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: p.col, boxShadow: `0 0 16px ${p.col}` }} />
          <div style={{ flex: "1 1 220px" }}>
            <div style={{ fontFamily: display, fontSize: 19, color: C.text }}>
              {lang === "ja" ? p.ja : p.en}
              <span style={{ fontFamily: mono, fontSize: 12, color: p.type === "terr" ? C.good : C.violet, marginLeft: 10 }}>
                {p.type === "terr" ? t.terrestrial : t.giant}
              </span>
            </div>
            <div style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.45, marginTop: 2 }}>{INFO[p.id][lang]}</div>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, marginTop: 4 }}>
              {t.densL}: <span style={{ color: C.sun }}>{p.dens.toFixed(2)}</span> g/cm³ · {t.sizeL}: <span style={{ color: C.cool }}>{p.size}</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default PlanetTypes;
