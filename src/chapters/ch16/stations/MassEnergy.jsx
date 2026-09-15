/* ============================================================
   STATION 2 — E = mc²
   Einstein showed mass and energy are interchangeable: E = mc². Because
   c² is enormous (9×10¹⁶ m²/s²), converting even a tiny mass yields a
   colossal amount of energy. When four hydrogen nuclei fuse into one
   helium-4 nucleus, 0.71% of the mass vanishes — reappearing as the
   energy that makes the Sun shine. Grounded in Ch.16 §16.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const c2 = 9e16; // (m/s)^2

const STR = {
  en: {
    title: "E = mc²",
    kind: "A little mass, a lot of energy",
    lede: "Convert a mass to energy with Einstein's formula. Even a gram unleashes a staggering amount — that's why losing a whisker of mass keeps the Sun lit for eons.",
    thread: "THE STORY CONTINUES",
    threadText: "Einstein's simplest-looking equation hides the Sun's secret: matter itself is a fuel, and the exchange rate — c² — is almost unimaginably generous.",
    key: "c² IS HUGE, SO A TINY MASS LOSS SHINES FOR EONS",
    keyText: "Einstein's E = mc² says mass (m) and energy (E) are two forms of the same thing, related by c², the square of the speed of light — about 9×10¹⁶ m²/s². Because that factor is so enormous, converting even a small mass releases an immense quantity of energy. In the Sun, when four hydrogen nuclei fuse into one helium-4 nucleus, the helium is 0.71% lighter than the four hydrogens; that missing 0.71% is converted to energy. Losing only that tiny fraction of its mass keeps the Sun shining for over ten billion years.",
    massL: "Mass converted", energyL: "Energy released (E = mc²)",
    compare: "≈ enough to power a city for", massDiff: "4 hydrogen → 1 helium: 0.71% of the mass becomes energy",
    note: "E = mc²: because c² is about 9×10¹⁶, converting a tiny mass releases enormous energy. Fusing 4 H into He loses just 0.71% of the mass — enough to power the Sun for over 10 billion years.",
  },
  ja: {
    title: "E = mc²",
    kind: "わずかな質量、膨大なエネルギー",
    lede: "アインシュタインの式で質量をエネルギーに変換しよう。1グラムでも途方もない量を放ちます——だからごくわずかな質量を失うだけで、太陽は永劫に灯り続けます。",
    thread: "物語はつづく",
    threadText: "アインシュタインの最も単純に見える式が、太陽の秘密を隠しています：物質そのものが燃料であり、その交換レート——c²——はほとんど想像を絶するほど気前がいいのです。",
    key: "c²は巨大、だからわずかな質量損失で永劫に輝く",
    keyText: "アインシュタインの E = mc² は、質量（m）とエネルギー（E）が同じものの2つの形で、光速の2乗 c²——約9×10¹⁶ m²/s²——で結ばれると述べます。この係数が非常に大きいため、わずかな質量を変換するだけで膨大なエネルギーが放たれます。太陽では、4個の水素核が1個のヘリウム4核に融合すると、ヘリウムは4個の水素より0.71%軽くなり、その失われた0.71%がエネルギーに変わります。そのわずかな割合の質量を失うだけで、太陽は100億年以上輝き続けます。",
    massL: "変換する質量", energyL: "放出エネルギー（E = mc²）",
    compare: "≈ 都市を動かせる期間", massDiff: "4個の水素 → 1個のヘリウム：質量の0.71%がエネルギーに",
    note: "E = mc²：c²が約9×10¹⁶なので、わずかな質量の変換で膨大なエネルギーが出ます。4個のHをHeに融合すると質量のわずか0.71%が失われ——太陽を100億年以上支えます。",
  },
};

function draw(ctx, cw, H, grams, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // 4 H -> He diagram (top), enlarged for clarity
  const cy = H * 0.3;
  ctx.textAlign = "center";
  const hx = cw * 0.14;
  for (let i = 0; i < 4; i++) {
    const x = hx + (i % 2) * 34, y = cy - 17 + Math.floor(i / 2) * 34;
    ctx.fillStyle = "#e0774f"; ctx.beginPath(); ctx.arc(x, y, 13, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.35)"; ctx.beginPath(); ctx.arc(x - 4, y - 4, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#fff"; ctx.font = `700 12px ${mono}`; ctx.fillText("H", x, y + 4);
  }
  // arrow
  ctx.strokeStyle = C.muted; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(hx + 34 + 20, cy); ctx.lineTo(cw * 0.40, cy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cw * 0.40, cy); ctx.lineTo(cw * 0.40 - 7, cy - 5); ctx.lineTo(cw * 0.40 - 7, cy + 5); ctx.closePath(); ctx.fillStyle = C.muted; ctx.fill();
  // He
  const ex = cw * 0.52;
  ctx.fillStyle = "#8fc0e8"; ctx.beginPath(); ctx.arc(ex, cy, 21, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.3)"; ctx.beginPath(); ctx.arc(ex - 6, cy - 6, 5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#fff"; ctx.font = `700 13px ${mono}`; ctx.fillText("He", ex, cy + 4);
  // energy burst
  const gx = cw * 0.74;
  ctx.strokeStyle = "#ffd86b"; ctx.lineWidth = 2.5;
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) { ctx.beginPath(); ctx.moveTo(gx + Math.cos(a) * 12, cy + Math.sin(a) * 12); ctx.lineTo(gx + Math.cos(a) * 26, cy + Math.sin(a) * 26); ctx.stroke(); }
  ctx.fillStyle = C.sun; ctx.font = `10px ${mono}`; ctx.fillText("+ energy", gx, cy + 42);
  ctx.fillStyle = "#ff9a52"; ctx.font = `11px ${mono}`; ctx.fillText("−0.71% mass", (ex + gx) / 2, cy - 34);
  // energy bar (bottom): log scale of E = m c^2
  const kg = grams / 1000, E = kg * c2; // joules
  const y1 = H - 34, x0 = 20, x1 = cw - 20, barY = H * 0.62;
  ctx.fillStyle = C.text; ctx.font = `12px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(`${t.energyL}:`, x0, barY - 8);
  ctx.fillStyle = C.sun; ctx.font = `700 15px ${mono}`;
  ctx.fillText(`${E.toExponential(2)} J`, x0, barY + 14);
  // relatable comparison: 1 g ~ 9e13 J ~ Hiroshima-ish scale; city power
  // avg city ~ 1 GW; time = E / 1e9 seconds
  const secs = E / 1e9; const days = secs / 86400;
  ctx.fillStyle = C.muted; ctx.font = `11px ${mono}`;
  const dstr = days > 365 ? `${(days / 365).toFixed(1)} ${lang === "ja" ? "年" : "yr"}` : `${days.toFixed(0)} ${lang === "ja" ? "日" : "days"}`;
  ctx.fillText(`${t.compare} ${dstr} (@1 GW)`, x0, barY + 36);
}

export function MassEnergy() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [grams, setGrams] = useState(1);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, grams, lang);
  }, [cw, grams, lang]);

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
          <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.massL}</span>
          <input type="range" min="0.1" max="1000" step="0.1" value={grams}
            onChange={(e) => setGrams(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
          <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, width: 62, textAlign: "right" }}>{grams < 1000 ? grams.toFixed(1) + " g" : "1 kg"}</span>
        </div>

        <div style={{ marginTop: 4 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <div style={{ fontFamily: mono, fontSize: 11.5, color: C.cool, marginTop: 8 }}>{t.massDiff}</div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default MassEnergy;
