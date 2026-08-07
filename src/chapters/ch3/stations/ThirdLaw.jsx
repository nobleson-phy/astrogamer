/* ============================================================
   STATION 4 — KEPLER'S THIRD LAW (P² = a³)
   The square of the orbital period equals the cube of the semimajor
   axis — when P is in years and a is in AU. Slide the semimajor axis
   and watch the period follow P = √(a³). Worked example: a = 4 AU →
   a³ = 64 → P = 8 years.
   Grounded in Ch.3 §3.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel, Row } from "../../../shared/ui.jsx";

/* A few real solar-system anchors, a in AU, P in years. */
const ANCHORS = [
  { a: 1, name: { en: "Earth", ja: "地球" } },
  { a: 1.52, name: { en: "Mars", ja: "火星" } },
  { a: 5.2, name: { en: "Jupiter", ja: "木星" } },
  { a: 9.54, name: { en: "Saturn", ja: "土星" } },
];

const STR = {
  en: {
    title: "Kepler's third law",
    kind: "P² = a³ (years and AU)",
    lede: "Bigger orbits take longer — but not in proportion. Slide the semimajor axis a and watch the period P follow P = √(a³). Try landing on a = 4 AU.",
    thread: "THE HARMONY",
    threadText: "Kepler's third law says the square of a planet's orbital period equals the cube of its semimajor axis — a single rule that ties an orbit's size to how long it takes to go around, for every object orbiting the Sun.",
    worked: "WORKED EXAMPLE",
    workedText: "At a = 4 AU: a³ = 4 × 4 × 4 = 64, and P = √64 = 8 years. Double the size to a = 4 and the period grows eightfold, not fourfold.",
    a: "Semimajor axis (a)", cube: "a³", period: "Period (P = √a³)",
    slide: "Slide the semimajor axis:", years: "yr", au: "AU",
    nearest: "Closest real orbit",
  },
  ja: {
    title: "ケプラーの第三法則",
    kind: "P² = a³（年と天文単位）",
    lede: "軌道が大きいほど一周に時間がかかります——ただし比例はしません。半長軸 a を動かして、周期 P が P = √(a³) に従う様子を見よう。a = 4 天文単位に合わせてみて。",
    thread: "調和",
    threadText: "ケプラーの第三法則は、惑星の公転周期の2乗が半長軸の3乗に等しいと言います——軌道の大きさと一周にかかる時間を結ぶ一つの規則で、太陽を回るすべての天体に成り立ちます。",
    worked: "計算例",
    workedText: "a = 4 天文単位のとき：a³ = 4 × 4 × 4 = 64、そして P = √64 = 8 年。大きさを4倍にすると、周期は4倍ではなく8倍に伸びます。",
    a: "半長軸（a）", cube: "a³", period: "周期（P = √a³）",
    slide: "半長軸を動かそう：", years: "年", au: "天文単位",
    nearest: "最も近い実際の軌道",
  },
};

export function ThirdLaw() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 300;
  const canvasRef = useRef(null);
  const [a10, setA10] = useState(40); // a ×10, 5..100 → 0.5..10 AU
  const cw = Math.min(w, 760);
  const a = a10 / 10;
  const cube = a * a * a;
  const P = Math.sqrt(cube);
  const near = ANCHORS.reduce((best, x) => (Math.abs(x.a - a) < Math.abs(best.a - a) ? x : best), ANCHORS[0]);
  const isExample = Math.abs(a - 4) < 0.05;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, cw, H);
    ctx.clearRect(0, 0, cw, H);
    const cx = cw / 2, cy = H / 2;
    const maxR = Math.min(cw * 0.42, H * 0.42);
    // reference Earth orbit (a = 1) and current orbit, scaled by sqrt for visual room
    const scale = maxR / Math.sqrt(10);
    const rEarth = scale * Math.sqrt(1);
    const r = scale * Math.sqrt(a);
    // Sun
    const g = ctx.createRadialGradient(cx, cy, 2, cx, cy, 20);
    g.addColorStop(0, "#fff"); g.addColorStop(0.35, "#ffcf6b"); g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 20, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#ffcf6b"; ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2); ctx.fill();
    // Earth reference orbit
    ctx.strokeStyle = "rgba(120,150,210,0.35)"; ctx.lineWidth = 1; ctx.setLineDash([3, 4]);
    ctx.beginPath(); ctx.arc(cx, cy, rEarth, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
    // current orbit
    ctx.strokeStyle = C.cool; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    // planet
    ctx.fillStyle = "#4a8fd4"; ctx.beginPath(); ctx.arc(cx + r, cy, 7, 0, Math.PI * 2); ctx.fill();
    // a label
    ctx.strokeStyle = "rgba(99,211,240,0.5)"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + r, cy); ctx.stroke();
    ctx.fillStyle = C.cool; ctx.font = `12px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(`a = ${a.toFixed(1)} AU`, cx + r / 2, cy - 8);
  }, [cw, a, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 04</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 12 }}>
          <span style={{ fontFamily: mono, fontSize: 31, color: C.sun }}>{P.toFixed(2)}</span>
          <span style={{ color: C.muted, fontSize: 15 }}>{t.years}</span>
        </div>
        <dl style={styles.dl}>
          <Row k={t.a} v={`${a.toFixed(1)} ${t.au}`} />
          <Row k={t.cube} v={cube.toFixed(2)} />
          <Row k={t.period} v={<span style={{ color: C.cool }}>{P.toFixed(2)} {t.years}</span>} />
          <Row k={t.nearest} v={tr(near.name, lang)} />
        </dl>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{t.threadText}</p>
        </div>
        <div style={{ ...styles.fateBox, ...(isExample ? { borderColor: C.borderBright, background: "rgba(99,211,240,0.08)" } : {}) }}>
          <div style={{ ...styles.fateLabel, color: C.sun }}>{t.worked}</div>
          <p style={styles.keyTermText}>{t.workedText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>
        <canvas ref={canvasRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        <div style={{ display: "flex", justifyContent: "center", gap: 10, fontFamily: mono, fontSize: 22, color: C.text, marginTop: 12 }}>
          <span style={{ color: C.cool }}>P² </span>
          <span style={{ color: C.muted }}>= </span>
          <span style={{ color: C.sun }}>a³</span>
          <span style={{ color: C.muted, fontSize: 16, alignSelf: "center" }}>
            → {P.toFixed(2)}² = {cube.toFixed(2)}
          </span>
        </div>
        <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginTop: 12 }}>{t.slide}</div>
        <input type="range" min={5} max={100} step={1} value={a10} onChange={(e) => setA10(parseInt(e.target.value, 10))} style={styles.range} />
        <div style={styles.rangeEnds}><span>0.5 AU</span><span>10 AU</span></div>
      </div>
    </div>
  );
}

export default ThirdLaw;
