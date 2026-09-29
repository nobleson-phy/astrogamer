/* ============================================================
   STATION 7 — THE COSMIC DISTANCE LADDER
   No single method spans all cosmic distances. Instead astronomers use a
   LADDER of methods, each reaching farther and each CALIBRATED by the
   nearer method below it. The trustworthy first rung is trigonometric
   PARALLAX — a direct geometric measurement (d = 1/P) that needs no
   assumptions about a star's structure or luminosity. Every rung above it
   ultimately rests on that geometry. Grounded in Ch.19 §19.2-19.4.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const RUNGS = [
  { id: "radar", en: "Radar ranging", ja: "レーダー測距", range: "solar system (AU)", rangeJa: "太陽系（AU）", col: "#8fc0e8",
    en_d: "Times a light-speed echo off planets — sets the AU that anchors everything.", ja_d: "惑星からの光速の反射を計る——すべてを支えるAUを定める。" },
  { id: "parallax", en: "Trigonometric parallax", ja: "三角視差", range: "nearby stars (to ~thousands ly)", rangeJa: "近い星（〜数千光年）", col: "#8fe0a0",
    en_d: "Direct geometry (d = 1/P) — the model-free base rung the ladder is built on.", ja_d: "直接の幾何学（d = 1/P）——モデル不要で、はしごが乗る基礎の段。" },
  { id: "spectro", en: "Spectroscopic parallax", ja: "分光視差", range: "farther stars", rangeJa: "より遠い星", col: "#ffcf6b",
    en_d: "Reads luminosity from spectra — calibrated using parallax distances.", ja_d: "スペクトルから光度を読む——視差の距離で校正される。" },
  { id: "candles", en: "Cepheids & RR Lyrae", ja: "ケフェイドとRRライリ", range: "star clusters & nearby galaxies", rangeJa: "星団と近傍銀河", col: "#ff9a52",
    en_d: "Standard candles reaching other galaxies — calibrated by nearer methods.", ja_d: "他の銀河に届く標準光源——より近い方法で校正される。" },
];

const STR = {
  en: {
    title: "The cosmic distance ladder",
    kind: "Each rung built on the last",
    lede: "No one ruler reaches everywhere. Climb the ladder rung by rung — and notice that every step stands on the geometric bedrock of parallax.",
    thread: "THE STORY CONTINUES",
    threadText: "Measuring the universe is a relay race. Each technique hands the baton to the next, and the whole chain traces back to one direct, honest measurement.",
    key: "A CHAIN OF METHODS, ANCHORED BY DIRECT PARALLAX",
    keyText: "No single technique can measure every distance in the universe, so astronomers use a cosmic distance LADDER. Each method reaches farther than the last, but each must be CALIBRATED using distances established by the nearer method below it. The bedrock is trigonometric PARALLAX: unlike the others, it is a purely geometric measurement (d = 1/P) that depends only on the baseline of Earth's orbit — it needs no assumptions about a star's physical structure or luminosity. That direct, model-independent first rung is what makes every rung above it trustworthy.",
    range: "Reaches", note: "The distance ladder chains methods, each calibrated by the nearer one. Trigonometric parallax is the direct, geometry-only base rung (d = 1/P) that anchors the whole chain.",
    base: "★ direct geometric base — no assumptions needed",
  },
  ja: {
    title: "宇宙の距離はしご",
    kind: "各段は前の段の上に",
    lede: "どんなものさしも、すべてには届きません。一段ずつはしごを登ろう——そして、どの段も視差という幾何学の岩盤の上に立っていることに注目。",
    thread: "物語はつづく",
    threadText: "宇宙を測るのはリレー競走です。各技術が次にバトンを渡し、その鎖全体が一つの直接で正直な測定にさかのぼります。",
    key: "方法の鎖、直接の視差に支えられる",
    keyText: "どんな一つの技術も宇宙のすべての距離を測れないので、天文学者は宇宙の距離はしごを使います。各方法は前より遠くに届きますが、その下の近い方法で確立した距離で校正されねばなりません。岩盤は三角視差です：他と違い、純粋に幾何学的な測定（d = 1/P）で、地球の軌道の基線だけに依ります——星の物理構造や光度についての仮定が要りません。その直接でモデルに依らない最初の段が、その上のすべての段を信頼できるものにします。",
    range: "届く範囲", note: "距離はしごは方法を連ね、各段は近い段で校正されます。三角視差は、鎖全体を支える直接で幾何学だけの基礎の段（d = 1/P）です。",
    base: "★ 直接の幾何学的な基礎——仮定は不要",
  },
};

function draw(ctx, cw, H, sel, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // horizontal rungs stacked vertically; width = reach
  const x0 = 30, x1 = cw - 20;
  RUNGS.forEach((r, i) => {
    const y = 30 + i * ((H - 60) / RUNGS.length);
    const on = r.id === sel;
    const wFrac = (i + 1.4) / (RUNGS.length + 1.2);
    ctx.fillStyle = r.col; ctx.globalAlpha = on ? 0.9 : 0.4;
    ctx.fillRect(x0, y, (x1 - x0) * wFrac, 20);
    ctx.globalAlpha = 1;
    if (on) { ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.5; ctx.strokeRect(x0, y, (x1 - x0) * wFrac, 20); }
    ctx.fillStyle = "#0a0c14"; ctx.font = `${on ? "700 " : ""}10px ${mono}`; ctx.textAlign = "left";
    ctx.fillText(lang === "ja" ? r.ja : r.en, x0 + 8, y + 14);
    // calibration arrow from rung below
    if (i > 0) { ctx.strokeStyle = "rgba(255,255,255,0.25)"; ctx.setLineDash([2, 2]); ctx.beginPath(); ctx.moveTo(x0 + 10, y + 22); ctx.lineTo(x0 + 10, y + ((H - 60) / RUNGS.length) - 2); ctx.stroke(); ctx.setLineDash([]); }
    if (r.id === "parallax") { ctx.fillStyle = "#8fe0a0"; ctx.font = `8px ${mono}`; ctx.textAlign = "right"; ctx.fillText("★ base", (x1 - x0) * wFrac + x0 - 4, y + 14); }
  });
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "left"; ctx.fillText(lang === "ja" ? "近い" : "near", x0, H - 14);
  ctx.textAlign = "right"; ctx.fillText(lang === "ja" ? "遠い →" : "far →", x1, H - 14);
}

export function DistanceLadder() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [sel, setSel] = useState("parallax");
  const r = RUNGS.find((x) => x.id === sel);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, sel, lang);
  }, [cw, sel, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 07</div>
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
          {RUNGS.map((x) => (
            <button key={x.id} onClick={() => setSel(x.id)}
              style={{ ...styles.chip, ...(sel === x.id ? styles.chipOn : {}), borderColor: sel === x.id ? x.col : undefined }}>{lang === "ja" ? x.ja : x.en}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.5, marginTop: 8 }}>
          <b style={{ color: C.text }}>{lang === "ja" ? r.ja : r.en}</b> · {t.range}: {lang === "ja" ? r.rangeJa : r.range} — {lang === "ja" ? r.ja_d : r.en_d}
          {r.id === "parallax" ? ` ${t.base}` : ""}
        </p>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default DistanceLadder;
