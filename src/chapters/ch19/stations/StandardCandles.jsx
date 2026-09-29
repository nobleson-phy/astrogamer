/* ============================================================
   STATION 5 — STANDARD CANDLES & THE SMC
   A STANDARD CANDLE is an object whose intrinsic luminosity is known, so
   comparing it to the apparent brightness gives the distance. Leavitt
   found the period-luminosity law by studying Cepheids in the Small
   Magellanic Cloud — a crucial choice, because all the SMC's stars are at
   nearly the same distance, so their apparent-brightness differences
   directly reflect real luminosity differences. Grounded in Ch.19 §19.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Standard candles & the SMC",
    kind: "Known light, measured distance",
    lede: "If you know a bulb's true wattage, its faintness tells you how far away it is. Switch views to see the trick — and why Leavitt's galaxy was the perfect lab.",
    thread: "THE STORY CONTINUES",
    threadText: "A candle across a field looks dimmer than one in your hand. Turn that around: if every candle burns equally bright, faintness becomes a yardstick.",
    candleKey: "STANDARD CANDLE — KNOWN LUMINOSITY GIVES DISTANCE",
    candleText: "A STANDARD CANDLE is any object whose intrinsic luminosity is well known. Since apparent brightness falls off with the square of distance, comparing an object's known luminosity to how bright it actually looks tells you exactly how far away it is. Cepheids and RR Lyrae stars make superb standard candles because their period (or type) reveals their luminosity.",
    smcKey: "WHY THE SMC WAS THE PERFECT LABORATORY",
    smcText: "Leavitt discovered the period-luminosity relation using Cepheids in the Small Magellanic Cloud (SMC), a small satellite galaxy. This was the crucial insight: because the SMC is far away compared with its own size, all of its stars are at essentially the same distance from us. So differences in their apparent brightness could only be caused by differences in their true luminosity — letting Leavitt link period directly to luminosity without knowing the distance first.",
    candle: "Standard candle", smc: "The SMC trick",
    known: "known luminosity", appar: "apparent brightness → distance",
    same: "all SMC stars ≈ same distance → brightness differences = luminosity differences",
    noteC: "A standard candle has known luminosity, so its apparent faintness reveals its distance (brightness falls as 1/d²).",
    noteS: "In the SMC every star is at nearly the same distance, so apparent-brightness differences are true luminosity differences — how Leavitt found the period-luminosity law.",
  },
  ja: {
    title: "標準光源とSMC",
    kind: "既知の光、測る距離",
    lede: "電球の本当のワット数が分かれば、その暗さが距離を教えます。表示を切り替えて手品を見よう——そしてなぜリービットの銀河が完璧な実験室だったかを。",
    thread: "物語はつづく",
    threadText: "野原の向こうのろうそくは、手の中のものより暗く見えます。それを逆にすると：どのろうそくも同じ明るさで燃えるなら、暗さがものさしになります。",
    candleKey: "標準光源——既知の光度が距離を与える",
    candleText: "標準光源とは、固有光度がよく分かっている天体のことです。見かけの明るさは距離の2乗で減るので、天体の既知の光度を実際の見え方と比べると、どれだけ遠いかが正確にわかります。ケフェイドやRRライリ型星は、周期（や型）が光度を明かすので、優れた標準光源になります。",
    smcKey: "なぜSMCが完璧な実験室だったか",
    smcText: "リービットは、小さな伴銀河である小マゼラン雲（SMC）のケフェイドを使って周期光度関係を発見しました。これが決定的な洞察でした：SMCは自身の大きさに比べて遠いので、その星はみな私たちからほぼ同じ距離にあります。だから見かけの明るさの違いは、真の光度の違いによってしか生じえません——距離を先に知らなくても、リービットは周期を光度に直接結びつけられたのです。",
    candle: "標準光源", smc: "SMCの手品",
    known: "既知の光度", appar: "見かけの明るさ → 距離",
    same: "SMCの星はみな≈同じ距離 → 明るさの違い＝光度の違い",
    noteC: "標準光源は光度が既知なので、見かけの暗さが距離を明かします（明るさは1/d²で減る）。",
    noteS: "SMCではどの星もほぼ同じ距離なので、見かけの明るさの違いが真の光度の違いです——リービットが周期光度法則を見つけた方法です。",
  },
};

function drawCandle(ctx, cw, H, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cy = H * 0.42;
  // three identical-luminosity candles at increasing distance, looking fainter
  [[cw * 0.2, 1, "20 pc"], [cw * 0.5, 2, "40 pc"], [cw * 0.8, 4, "80 pc"]].forEach(([x, d, label]) => {
    const bright = 1 / (d * d);
    const R = 10 + bright * 20;
    const g = ctx.createRadialGradient(x, cy, 1, x, cy, R); g.addColorStop(0, `rgba(255,240,190,${Math.min(1, 0.3 + bright)})`); g.addColorStop(1, "rgba(255,200,120,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, cy, R, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#ffe08a"; ctx.beginPath(); ctx.arc(x, cy, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(label, x, cy + 40);
    ctx.fillStyle = C.muted; ctx.fillText(`${(bright * 100).toFixed(0)}%`, x, cy + 54);
  });
  ctx.fillStyle = C.text; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.known + " → " + t.appar, cw / 2, 22);
}

function drawSMC(ctx, cw, H, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // Earth at left, the SMC as a compact blob far right; a bracket showing "same distance"
  const ex = 30, ey = H * 0.5;
  ctx.fillStyle = "#5b8fd8"; ctx.beginPath(); ctx.arc(ex, ey, 7, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText("Earth", ex, ey + 20);
  // SMC blob
  const gxc = cw * 0.78, gyc = ey, gR = Math.min(cw * 0.16, H * 0.36);
  ctx.fillStyle = "rgba(150,170,220,0.12)"; ctx.beginPath(); ctx.ellipse(gxc, gyc, gR, gR * 0.8, 0.3, 0, Math.PI * 2); ctx.fill();
  // stars in the SMC, varied brightness
  for (let i = 0; i < 40; i++) { const a = i * 2.4, r = Math.sqrt((i % 20) / 20) * gR; const x = gxc + Math.cos(a) * r, y = gyc + Math.sin(a) * r * 0.8; const b = 0.3 + (i % 5) / 5 * 0.7; ctx.fillStyle = `rgba(255,240,190,${b})`; ctx.beginPath(); ctx.arc(x, y, 1.5 + (i % 3), 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = C.text; ctx.font = `11px ${mono}`; ctx.fillText("SMC", gxc, gyc + gR + 14);
  // "same distance" bracket: lines from Earth to near and far edge nearly equal
  ctx.strokeStyle = "rgba(143,224,160,0.5)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(gxc - gR, gyc - gR * 0.5); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(gxc + gR, gyc + gR * 0.5); ctx.stroke();
  ctx.fillStyle = "#8fe0a0"; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.same, cw / 2, H - 8);
}

export function StandardCandles() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 240;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("candle");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    (mode === "candle" ? drawCandle : drawSMC)(ctx, cw, H, lang);
  }, [cw, mode, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 05</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{t.threadText}</p>
        </div>
        <div style={styles.fateBox}>
          <div style={{ ...styles.fateLabel, color: C.sun }}>{mode === "candle" ? t.candleKey : t.smcKey}</div>
          <p style={styles.keyTermText}>{mode === "candle" ? t.candleText : t.smcText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          {[["candle", t.candle], ["smc", t.smc]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{mode === "candle" ? t.noteC : t.noteS}</p>
      </div>
    </div>
  );
}

export default StandardCandles;
