/* ============================================================
   STATION 1 — THE THREE ASTEROID TYPES
   Asteroids come in three main compositional classes: S-type
   (silicate/stony, bright, inner belt), C-type (carbonaceous, very
   dark, outer belt), and M-type (metallic, iron-nickel). Because the
   types are sorted by distance from the Sun — stony closer, carbon-
   rich farther — they map the temperature and chemical gradient of
   the original solar nebula. Grounded in Ch.13 §13.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const TYPES = [
  { id: "S", col: "#c9a86a", band: [0.30, 0.55],
    en: "S-type · Silicate", ja: "S型 · ケイ酸塩",
    en_d: "Stony, silicate-rich and fairly bright. These dominate the INNER asteroid belt, closer to the Sun where it was warmer.",
    ja_d: "石質でケイ酸塩に富み、かなり明るい。太陽に近く暖かかった、小惑星帯の内側で優勢です。",
    albedo: "moderate (bright)", albedoJa: "中程度（明るい）" },
  { id: "C", col: "#4a4640", band: [0.62, 0.9],
    en: "C-type · Carbonaceous", ja: "C型 · 炭素質",
    en_d: "Carbon-rich and extremely dark — sootier than coal. These dominate the OUTER belt, farther from the Sun, and are the most common type.",
    ja_d: "炭素に富み、きわめて暗い——石炭よりすすけている。太陽から遠い外側の帯で優勢で、最も一般的なタイプです。",
    albedo: "very low (dark)", albedoJa: "非常に低い（暗い）" },
  { id: "M", col: "#b8b3ad", band: [0.45, 0.7],
    en: "M-type · Metallic", ja: "M型 · 金属",
    en_d: "Made largely of iron and nickel — likely the exposed metal cores of shattered, once-differentiated bodies.",
    ja_d: "主に鉄とニッケルでできている——分化していた天体が砕けて露出した金属核と考えられます。",
    albedo: "moderate (metallic)", albedoJa: "中程度（金属的）" },
];

const STR = {
  en: {
    title: "The three asteroid types",
    kind: "Composition sorted by distance",
    lede: "Not all asteroids are alike. Pick a type and see where it lives in the belt — and notice the pattern: stony worlds huddle near the Sun, carbon-rich ones sit farther out.",
    thread: "THE STORY BEGINS",
    threadText: "Between Mars and Jupiter orbits a belt of rubble left over from the solar system's birth — never gathered into a planet. Sorted by composition, these rocks are a fossil record of how the young solar nebula cooled.",
    key: "S, C, AND M — A FROZEN CHEMICAL GRADIENT",
    keyText: "Asteroids fall into three main compositional classes: silicate (S-type, stony), carbonaceous (C-type, very dark and carbon-rich), and metallic (M-type, iron-nickel). Crucially, the types are not mixed at random — they are sorted by distance from the Sun, with stony S-types dominating the warmer inner belt and dark C-types the colder outer belt. Tracing that arrangement lets astronomers reconstruct the original temperature and chemical gradient of the solar nebula during planet formation.",
    albedoL: "Reflectivity",
    sun: "Sun", inner: "inner (warm)", outer: "outer (cold)",
    note: "S (stony), C (carbon-rich), and M (metallic) asteroids are sorted by distance — a preserved map of the young solar nebula's temperature and chemistry.",
  },
  ja: {
    title: "3つの小惑星タイプ",
    kind: "距離で並んだ組成",
    lede: "小惑星はどれも同じではありません。タイプを選んで、帯のどこにあるかを見よう——石質の世界は太陽の近くに、炭素に富むものは遠くに、というパターンに注目。",
    thread: "物語のはじまり",
    threadText: "火星と木星の間には、太陽系の誕生時に残された——惑星に集まらなかった——瓦礫の帯が回っています。組成で並べると、これらの岩は若い太陽系星雲がどう冷えたかの化石記録です。",
    key: "S・C・M——凍りついた化学組成の勾配",
    keyText: "小惑星は3つの主要な組成クラスに分かれます：ケイ酸塩（S型・石質）、炭素質（C型・非常に暗く炭素に富む）、金属（M型・鉄ニッケル）。重要なのは、タイプが無作為に混ざっていないことです——太陽からの距離で並び、暖かい内側の帯では石質のS型が、冷たい外側の帯では暗いC型が優勢です。その配列をたどることで、惑星形成期の太陽系星雲の元々の温度と化学組成の勾配を復元できます。",
    albedoL: "反射率",
    sun: "太陽", inner: "内側（暖）", outer: "外側（冷）",
    note: "S（石質）・C（炭素質）・M（金属）の小惑星は距離で並びます——若い太陽系星雲の温度と化学組成の、保存された地図です。",
  },
};

function draw(ctx, cw, H, sel, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const sunX = 30, midY = H * 0.42;
  // Sun at left
  const sg = ctx.createRadialGradient(sunX, midY, 2, sunX, midY, 26);
  sg.addColorStop(0, "#fff2c0"); sg.addColorStop(1, "rgba(255,180,60,0)");
  ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(sunX, midY, 26, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffd86b"; ctx.beginPath(); ctx.arc(sunX, midY, 9, 0, Math.PI * 2); ctx.fill();
  // belt track
  const x0 = sunX + 40, x1 = cw - 20;
  ctx.strokeStyle = "rgba(150,175,230,0.15)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(x0, midY); ctx.lineTo(x1, midY); ctx.stroke();
  // distance labels
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(t.inner, x0, midY + 44); ctx.textAlign = "right"; ctx.fillText(t.outer, x1, midY + 44);
  ctx.textAlign = "center"; ctx.fillStyle = C.sun; ctx.fillText(t.sun, sunX, midY - 34);
  // draw each type's band as a scatter of asteroids; highlight the selected
  TYPES.forEach((tp) => {
    const on = tp.id === sel;
    const bx0 = x0 + tp.band[0] * (x1 - x0), bx1 = x0 + tp.band[1] * (x1 - x0);
    for (let i = 0; i < (on ? 60 : 26); i++) {
      const fx = bx0 + Math.random() * (bx1 - bx0);
      const fy = midY + (Math.random() - 0.5) * (on ? 40 : 26);
      const r = 1 + Math.random() * (on ? 2.4 : 1.4);
      ctx.globalAlpha = on ? 0.95 : 0.28;
      ctx.fillStyle = tp.col; ctx.beginPath(); ctx.arc(fx, fy, r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (on) {
      ctx.strokeStyle = "rgba(255,255,255,0.25)"; ctx.setLineDash([3, 3]); ctx.lineWidth = 1;
      ctx.strokeRect(bx0, midY - 24, bx1 - bx0, 48); ctx.setLineDash([]);
    }
  });
  // big sample of the selected type
  const tp = TYPES.find((x) => x.id === sel);
  const px = cw * 0.5, py = H - 34, pr = 20;
  const g = ctx.createRadialGradient(px - pr * 0.3, py - pr * 0.3, 2, px, py, pr);
  g.addColorStop(0, tp.col); g.addColorStop(1, "rgba(0,0,0,0.5)");
  ctx.fillStyle = g; ctx.beginPath();
  // irregular blob
  ctx.moveTo(px + pr, py);
  for (let a = 0; a <= Math.PI * 2 + 0.01; a += Math.PI / 8) {
    const rr = pr * (0.82 + 0.18 * Math.sin(a * 3 + sel.charCodeAt(0)));
    ctx.lineTo(px + Math.cos(a) * rr, py + Math.sin(a) * rr);
  }
  ctx.closePath(); ctx.fill();
  ctx.fillStyle = C.text; ctx.font = `700 13px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(lang === "ja" ? tp.ja : tp.en, px, py - pr - 8);
}

export function AsteroidTypes() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [sel, setSel] = useState("S");
  const tp = TYPES.find((x) => x.id === sel);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, sel, lang);
  }, [cw, sel, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 01</div>
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
          {TYPES.map((x) => (
            <button key={x.id} onClick={() => setSel(x.id)}
              style={{ ...styles.chip, ...(sel === x.id ? styles.chipOn : {}), borderColor: sel === x.id ? x.col : undefined }}>
              {lang === "ja" ? x.ja : x.en}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.5, marginTop: 8 }}>
          {lang === "ja" ? tp.ja_d : tp.en_d}
        </p>
        <div style={{ fontFamily: mono, fontSize: 12, color: C.cool, marginTop: 4 }}>
          {t.albedoL}: {lang === "ja" ? tp.albedoJa : tp.albedo}
        </div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default AsteroidTypes;
