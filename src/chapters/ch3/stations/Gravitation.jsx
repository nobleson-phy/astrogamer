/* ============================================================
   STATION 6 — NEWTON'S UNIVERSAL LAW OF GRAVITATION
   F ∝ (m₁ · m₂) / d² : proportional to the product of the masses,
   inversely proportional to the square of the distance. Slide the
   distance and watch the force plunge as 1/d² — triple the distance,
   force ×1/9. Compress Earth to half its radius → surface gravity ×4.
   Grounded in Ch.3 §3.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel, Row } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Universal gravitation",
    kind: "F ∝ m₁·m₂ / d²",
    lede: "Every mass pulls on every other mass. Slide the two bodies apart and watch the force collapse as one over distance squared — the same rule that keeps the planets on their leashes.",
    thread: "THE LAW",
    threadText: "Newton's universal law of gravitation: the attraction between two bodies is proportional to the product of their masses and inversely proportional to the square of the distance between them. It reaches across the whole universe and never quite drops to zero.",
    callout: "Move the bodies 3× farther apart and the force drops to 1/9 of its old value — because 3² = 9.",
    radius: "MASS & RADIUS",
    radiusText: "Both masses matter — double a mass and you double the force. Distance is measured from the centres, so squeezing Earth to half its radius (same mass) would quadruple your surface weight: (1/½)² = 4.",
    refine: "REFINING KEPLER",
    refineText: "By showing that both masses enter the equation, Newton refined Kepler's third law — for two comparable bodies, like a pair of stars, the combined mass sets the orbit.",
    distance: "Distance (d)", force: "Force (∝ 1/d²)",
    slide: "Slide the bodies apart:", times: "× base distance",
    atThree: "At 3× distance",
  },
  ja: {
    title: "万有引力",
    kind: "F ∝ m₁·m₂ / d²",
    lede: "すべての質量は、ほかのすべての質量を引きます。二つの天体を引き離して、力が距離の2乗分の1で崩れ落ちる様子を見よう——惑星をつなぎとめているのと同じ規則です。",
    thread: "法則",
    threadText: "ニュートンの万有引力の法則：二つの天体の引力は、質量の積に比例し、両者の距離の2乗に反比例します。宇宙全体に届き、けっして完全にはゼロになりません。",
    callout: "天体どうしを3倍遠ざけると、力は元の9分の1に落ちます——3² = 9 だからです。",
    radius: "質量と半径",
    radiusText: "両方の質量が効きます——一方の質量を2倍にすれば力も2倍。距離は中心から測るので、地球を（質量そのままで）半径半分に押し縮めると、表面での体重は4倍になります：(1/½)² = 4。",
    refine: "ケプラーを精密化する",
    refineText: "両方の質量が式に入ることを示すことで、ニュートンはケプラーの第三法則を精密にしました——連星のように同程度の二天体では、合計質量が軌道を決めます。",
    distance: "距離（d）", force: "力（∝ 1/d²）",
    slide: "天体を引き離そう：", times: "× 基準距離",
    atThree: "3倍の距離では",
  },
};

export function Gravitation() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 220;
  const canvasRef = useRef(null);
  const [d, setD] = useState(2); // 1..6
  const cw = Math.min(w, 760);
  const force = 1 / (d * d);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, cw, H);
    ctx.clearRect(0, 0, cw, H);
    const y = H / 2;
    const x0 = 46, x1 = cw - 46;
    const bx = x0 + ((d - 1) / 5) * (x1 - x0); // second body position
    // connecting line
    ctx.strokeStyle = "rgba(120,150,210,0.25)"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(bx, y); ctx.stroke();
    // body 1 (fixed)
    const g1 = ctx.createRadialGradient(x0, y, 2, x0, y, 30);
    g1.addColorStop(0, "#fff"); g1.addColorStop(0.4, "#ffcf6b"); g1.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g1; ctx.beginPath(); ctx.arc(x0, y, 30, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#ffcf6b"; ctx.beginPath(); ctx.arc(x0, y, 13, 0, Math.PI * 2); ctx.fill();
    // body 2 (movable)
    ctx.fillStyle = "#4a8fd4"; ctx.beginPath(); ctx.arc(bx, y, 11, 0, Math.PI * 2); ctx.fill();
    // force arrows (length ∝ force)
    const alen = 14 + force * 90;
    ctx.strokeStyle = C.cool; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(bx - 16, y); ctx.lineTo(bx - 16 - alen, y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(bx - 16 - alen, y); ctx.lineTo(bx - 16 - alen + 8, y - 5); ctx.lineTo(bx - 16 - alen + 8, y + 5); ctx.closePath();
    ctx.fillStyle = C.cool; ctx.fill();
    // distance label
    ctx.fillStyle = C.faint; ctx.font = `12px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(`d = ${d}×`, (x0 + bx) / 2, y + 26);
  }, [cw, d, force]);

  const pct = force * 100;

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 06</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 12 }}>
          <span style={{ fontFamily: mono, fontSize: 31, color: C.sun }}>{d}</span>
          <span style={{ color: C.muted, fontSize: 15 }}>{t.times}</span>
        </div>
        <dl style={styles.dl}>
          <Row k={t.distance} v={`${d}×`} />
          <Row k={`1 / ${d}²`} v={`1 / ${d * d}`} />
          <Row k={t.force} v={<span style={{ color: C.cool }}>{pct >= 1 ? pct.toFixed(0) : pct.toFixed(1)}%</span>} />
        </dl>
        {d === 3 && (
          <div style={styles.pathBox}>
            <div style={styles.fateLabel}>{t.atThree}</div>
            <p style={styles.pathText}>3² = 9 → 1 / 9 ≈ 11%</p>
          </div>
        )}
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{t.threadText}</p>
        </div>
        <div style={styles.fateBox}>
          <div style={{ ...styles.fateLabel, color: C.sun }}>{t.radius}</div>
          <p style={styles.keyTermText}>{t.radiusText}</p>
        </div>
        <div style={{ ...styles.pathBox, marginTop: 14 }}>
          <div style={{ ...styles.fateLabel, color: C.cool }}>{t.refine}</div>
          <p style={{ ...styles.keyTermText, margin: 0 }}>{t.refineText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>
        <canvas ref={canvasRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginTop: 10 }}>{t.slide}</div>
        <input type="range" min={1} max={6} step={1} value={d} onChange={(e) => setD(parseInt(e.target.value, 10))} style={styles.range} />
        <div style={styles.rangeEnds}><span>1×</span><span>6×</span></div>
        <div style={{ ...styles.fateBox, marginTop: 16 }}>
          <p style={styles.factText}>{t.callout}</p>
        </div>
      </div>
    </div>
  );
}

export default Gravitation;
