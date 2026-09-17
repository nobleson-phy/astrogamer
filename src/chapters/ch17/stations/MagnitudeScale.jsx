/* ============================================================
   STATION 2 — THE MAGNITUDE SCALE
   The magnitude scale is backwards: brighter objects have SMALLER (or
   negative) magnitudes. It is also logarithmic — a difference of 5
   magnitudes corresponds to exactly a factor of 100 in brightness (so
   each magnitude is 100^(1/5) ≈ 2.512×). Grounded in Ch.17 §17.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const MARKS = [
  { m: -26.7, en: "Sun", ja: "太陽" },
  { m: -12.7, en: "Full Moon", ja: "満月" },
  { m: -1.5, en: "Sirius", ja: "シリウス" },
  { m: 0, en: "Vega", ja: "ベガ" },
  { m: 6, en: "naked-eye limit", ja: "肉眼の限界" },
];

const STR = {
  en: {
    title: "The magnitude scale",
    kind: "Backwards and logarithmic",
    lede: "Drag a star's magnitude and compare it to Vega. Notice the scale runs the wrong way — and that every 5 steps means 100× in brightness.",
    thread: "THE STORY CONTINUES",
    threadText: "The scale astronomers still use is over 2,000 years old, and it has two quirks that trip up newcomers: it runs backwards, and it's logarithmic.",
    key: "SMALLER = BRIGHTER; 5 MAGNITUDES = 100×",
    keyText: "On the magnitude scale, brighter objects have SMALLER numbers — and the very brightest have negative magnitudes (the Sun is −26.7, Sirius is −1.5). The scale is also logarithmic: a difference of exactly 5 magnitudes corresponds to a factor of 100 in apparent brightness, so a single magnitude step is 100^(1/5) ≈ 2.512 times. Two stars five magnitudes apart differ in brightness by exactly one hundred times.",
    mag: "Star magnitude", vs: "vs Vega (mag 0)", ratio: "Brightness ratio",
    brighter: "brighter", fainter: "fainter",
    note: "The magnitude scale is inverted (smaller/negative = brighter) and logarithmic: a 5-magnitude gap is exactly a 100× brightness ratio.",
  },
  ja: {
    title: "等級スケール",
    kind: "逆向きで対数的",
    lede: "星の等級をドラッグしてベガと比べよう。スケールが逆向きに進むこと——そして5段階ごとに明るさが100倍になることに注目。",
    thread: "物語はつづく",
    threadText: "天文学者が今も使うスケールは2,000年以上前のもので、初心者を戸惑わせる2つの癖があります：逆向きに進み、そして対数的です。",
    key: "小さいほど明るい。5等級で100倍",
    keyText: "等級スケールでは、明るい天体ほど数が小さく——最も明るいものは負の等級です（太陽は−26.7、シリウスは−1.5）。スケールは対数的でもあります：ちょうど5等級の差が、見かけの明るさで100倍にあたるので、1等級の差は100^(1/5) ≈ 2.512倍です。5等級離れた2つの星は、明るさがちょうど100倍違います。",
    mag: "星の等級", vs: "ベガ（0等）との比", ratio: "明るさの比",
    brighter: "明るい", fainter: "暗い",
    note: "等級スケールは逆向き（小さい／負ほど明るい）で対数的：5等級の差はちょうど100倍の明るさの比です。",
  },
};

function draw(ctx, cw, H, mag, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // number line from -27 to +8, brighter (negative) on the LEFT
  const x0 = 20, x1 = cw - 20, y = H * 0.4;
  const mMin = -27, mMax = 8;
  const mx = (m) => x0 + (m - mMin) / (mMax - mMin) * (x1 - x0);
  ctx.strokeStyle = "rgba(150,175,230,0.4)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
  // ticks
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center";
  for (let m = -25; m <= 5; m += 5) { const X = mx(m); ctx.beginPath(); ctx.moveTo(X, y - 4); ctx.lineTo(X, y + 4); ctx.strokeStyle = "rgba(150,175,230,0.4)"; ctx.stroke(); ctx.fillStyle = C.faint; ctx.fillText(m, X, y + 16); }
  ctx.fillStyle = C.good; ctx.textAlign = "left"; ctx.fillText("← " + t.brighter, x0, y - 20);
  ctx.fillStyle = C.muted; ctx.textAlign = "right"; ctx.fillText(t.fainter + " →", x1, y - 20);
  // reference marks
  MARKS.forEach((mk) => {
    const X = mx(mk.m);
    ctx.fillStyle = "#ffd86b"; ctx.beginPath(); ctx.arc(X, y, 3, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.translate(X, y - 8); ctx.rotate(-Math.PI / 4); ctx.fillStyle = C.muted; ctx.font = `8px ${mono}`; ctx.textAlign = "left"; ctx.fillText(`${lang === "ja" ? mk.ja : mk.en} (${mk.m})`, 0, 0); ctx.restore();
  });
  // the chosen star marker
  const X = mx(mag);
  ctx.strokeStyle = C.sun; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X, y - 30); ctx.lineTo(X, y + 24); ctx.stroke();
  ctx.fillStyle = C.sun; ctx.beginPath(); ctx.moveTo(X, y - 30); ctx.lineTo(X - 5, y - 38); ctx.lineTo(X + 5, y - 38); ctx.closePath(); ctx.fill();
  // brightness ratio vs Vega (mag 0)
  const ratio = Math.pow(100, (0 - mag) / 5); // >1 means brighter than Vega
  ctx.fillStyle = C.text; ctx.font = `700 14px ${mono}`; ctx.textAlign = "center";
  const rstr = ratio >= 1 ? `${ratio.toFixed(ratio > 20 ? 0 : 1)}× ${t.brighter}` : `${(1 / ratio).toFixed(1)}× ${t.fainter}`;
  ctx.fillText(`${t.ratio} ${t.vs}:  ${rstr}`, cw / 2, H - 30);
  // 5-mag = 100x reminder bar
  ctx.fillStyle = C.cool; ctx.font = `10px ${mono}`; ctx.fillText("Δ5 mag  =  ×100 brightness", cw / 2, H - 10);
}

export function MagnitudeScale() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 230;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mag, setMag] = useState(-1.5);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, mag, lang);
  }, [cw, mag, lang]);

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

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.mag}</span>
          <input type="range" min="-5" max="8" step="0.5" value={mag}
            onChange={(e) => setMag(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
          <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, width: 42, textAlign: "right" }}>{mag.toFixed(1)}</span>
        </div>

        <div style={{ marginTop: 4 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default MagnitudeScale;
