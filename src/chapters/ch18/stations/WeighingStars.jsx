/* ============================================================
   STATION 3 — WEIGHING STARS
   Binaries let us weigh stars. Newton's form of Kepler's third law,
   D³ = (M₁ + M₂)·P², gives the SUM of the masses from the orbital
   separation D (AU) and period P (years). Once masses are known, the
   MASS-LUMINOSITY relation for main-sequence stars, L ∝ M⁴, shows how
   steeply brightness climbs with mass. Grounded in Ch.18 §18.2-18.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Weighing stars",
    kind: "From orbits to masses",
    lede: "Only binary stars can be weighed directly. Set an orbit and read off the combined mass — then see how sharply a star's light grows with that mass.",
    thread: "THE STORY CONTINUES",
    threadText: "You cannot put a star on a scale. But if two stars orbit each other, their dance obeys Kepler and Newton — and betrays exactly how much they weigh.",
    keplerKey: "KEPLER'S THIRD LAW GIVES THE TOTAL MASS",
    keplerText: "For a binary, Newton's form of Kepler's third law is D³ = (M₁ + M₂)·P², where D is the average separation in astronomical units, P is the orbital period in years, and (M₁ + M₂) is the total mass in solar masses. Measure the size and period of the orbit, and you can solve for the combined mass of the two stars — the only direct way to weigh stars.",
    lumKey: "MASS-LUMINOSITY: L ∝ M⁴",
    lumText: "Once masses are known from binaries, a clear pattern emerges for main-sequence stars: the MASS-LUMINOSITY relation, L ∝ M⁴. Luminosity rises as roughly the fourth power of mass, so small mass differences make huge brightness differences: a star 3 times the Sun's mass is about 3⁴ = 81 times as luminous.",
    kepler: "Kepler's law (mass)", lum: "Mass-luminosity",
    sep: "Separation D", per: "Period P", totMass: "Total mass (M₁ + M₂)",
    mass: "Star mass", lumL: "Luminosity (L ∝ M⁴)",
    noteK: "Newton's Kepler law D³ = (M₁ + M₂)P² gives a binary's total mass from its orbit size and period — the only direct way to weigh stars.",
    noteL: "For main-sequence stars, L ∝ M⁴: triple the mass and the star is 81× brighter, so mass differences dominate luminosity.",
  },
  ja: {
    title: "星の重さを測る",
    kind: "軌道から質量へ",
    lede: "連星だけが直接重さを測れます。軌道を設定して合計質量を読み取り——その質量とともに星の光がどれほど急に増えるかを見よう。",
    thread: "物語はつづく",
    threadText: "星を秤には載せられません。でも2つの星が互いを公転すれば、その踊りはケプラーとニュートンに従い——重さを正確に暴きます。",
    keplerKey: "ケプラーの第三法則が総質量を与える",
    keplerText: "連星では、ニュートンの形のケプラーの第三法則は D³ = (M₁ + M₂)·P² です。Dは天文単位での平均間隔、Pは年での公転周期、(M₁ + M₂)は太陽質量での総質量です。軌道の大きさと周期を測れば、2つの星の合計質量を解けます——星を直接測る唯一の方法です。",
    lumKey: "質量光度関係：L ∝ M⁴",
    lumText: "連星から質量が分かると、主系列星に明確なパターンが現れます：質量光度関係 L ∝ M⁴ です。光度はおよそ質量の4乗で増えるので、わずかな質量差が巨大な明るさの差を生みます：太陽の3倍の質量の星は、約3⁴ = 81倍明るいのです。",
    kepler: "ケプラーの法則（質量）", lum: "質量光度",
    sep: "間隔 D", per: "周期 P", totMass: "総質量 (M₁ + M₂)",
    mass: "星の質量", lumL: "光度（L ∝ M⁴）",
    noteK: "ニュートンのケプラー法則 D³ = (M₁ + M₂)P² は、軌道の大きさと周期から連星の総質量を与えます——星を直接測る唯一の方法です。",
    noteL: "主系列星では L ∝ M⁴：質量が3倍で星は81倍明るく、質量差が光度を支配します。",
  },
};

function drawKepler(ctx, cw, H, D, P, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H * 0.36;
  const rx = 30 + D * 26, ry = rx * 0.5;
  ctx.strokeStyle = "rgba(150,175,230,0.25)"; ctx.beginPath(); ctx.ellipse(cx, cy, Math.min(rx, cw * 0.4), Math.min(ry, H * 0.24), 0, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = "rgba(255,207,107,0.6)"; ctx.beginPath(); ctx.arc(cx, cy, 2, 0, Math.PI * 2); ctx.fill();
  const ex = Math.min(rx, cw * 0.4), ey = Math.min(ry, H * 0.24);
  ctx.fillStyle = "#ffe08a"; ctx.beginPath(); ctx.arc(cx + ex, cy, 8, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#8fc0e8"; ctx.beginPath(); ctx.arc(cx - ex, cy, 6, 0, Math.PI * 2); ctx.fill();
  // computed mass
  const M = (D * D * D) / (P * P);
  ctx.fillStyle = C.text; ctx.font = `12px ${mono}`; ctx.textAlign = "center";
  ctx.fillText("D³ = (M₁ + M₂) · P²", cx, H - 44);
  ctx.fillStyle = C.sun; ctx.font = `700 15px ${mono}`;
  ctx.fillText(`${t.totMass} = ${M.toFixed(1)} M☉`, cx, H - 20);
}

function drawLum(ctx, cw, H, M, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const L = Math.pow(M, 4);
  // star sized by mass
  const cx = cw * 0.24, cy = H * 0.4, R = 8 + M * 8;
  const glow = ctx.createRadialGradient(cx, cy, R * 0.4, cx, cy, R * 1.8); glow.addColorStop(0, "#fff2c0"); glow.addColorStop(1, "rgba(255,180,60,0)");
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(cx, cy, R * 1.8, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffe08a"; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.faint; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(`${M.toFixed(1)} M☉`, cx, cy + R * 1.8 + 14);
  // luminosity bar (log)
  const bx = cw * 0.46, bw = cw * 0.46, by = H * 0.5;
  ctx.fillStyle = "rgba(120,150,210,0.2)"; ctx.fillRect(bx, by, bw, 16);
  const frac = Math.min(Math.log10(L) / Math.log10(625), 1); // scale to M=5 -> 625
  const bg = ctx.createLinearGradient(bx, 0, bx + bw, 0); bg.addColorStop(0, "#ffcf6b"); bg.addColorStop(1, "#ff8f5a");
  ctx.fillStyle = bg; ctx.fillRect(bx, by, Math.max(bw * frac, 4), 16);
  ctx.fillStyle = C.text; ctx.font = `12px ${mono}`; ctx.textAlign = "left"; ctx.fillText(`${t.lumL}`, bx, by - 8);
  ctx.fillStyle = C.sun; ctx.font = `700 15px ${mono}`; ctx.fillText(`${L.toFixed(0)} L☉`, bx, by + 36);
  ctx.fillStyle = C.muted; ctx.font = `10px ${mono}`; ctx.fillText(`= ${M.toFixed(1)}⁴`, bx, by + 52);
}

export function WeighingStars() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 240;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("kepler");
  const [D, setD] = useState(3);
  const [P, setP] = useState(3);
  const [M, setM] = useState(3);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (mode === "kepler") drawKepler(ctx, cw, H, D, P, lang);
    else drawLum(ctx, cw, H, M, lang);
  }, [cw, mode, D, P, M, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 03</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{t.threadText}</p>
        </div>
        <div style={styles.fateBox}>
          <div style={{ ...styles.fateLabel, color: C.sun }}>{mode === "kepler" ? t.keplerKey : t.lumKey}</div>
          <p style={styles.keyTermText}>{mode === "kepler" ? t.keplerText : t.lumText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          {[["kepler", t.kepler], ["lum", t.lum]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        {mode === "kepler" ? (
          <div style={{ margin: "10px 0 4px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, width: 78 }}>{t.sep}</span>
              <input type="range" min="1" max="6" step="0.5" value={D} onChange={(e) => setD(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
              <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, width: 48, textAlign: "right" }}>{D} AU</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, width: 78 }}>{t.per}</span>
              <input type="range" min="1" max="6" step="0.5" value={P} onChange={(e) => setP(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
              <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, width: 48, textAlign: "right" }}>{P} yr</span>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "10px 0 4px" }}>
            <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.mass}</span>
            <input type="range" min="0.5" max="5" step="0.5" value={M} onChange={(e) => setM(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
            <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, width: 48, textAlign: "right" }}>{M} M☉</span>
          </div>
        )}

        <div style={{ marginTop: 8 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{mode === "kepler" ? t.noteK : t.noteL}</p>
      </div>
    </div>
  );
}

export default WeighingStars;
