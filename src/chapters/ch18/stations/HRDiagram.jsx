/* ============================================================
   STATION 7 — THE H-R DIAGRAM
   The Hertzsprung-Russell diagram plots luminosity against temperature.
   By convention TEMPERATURE increases to the LEFT and LUMINOSITY increases
   UPWARD. Most stars fall on the diagonal MAIN SEQUENCE, where a star's
   position is set almost entirely by its MASS (massive = hot and luminous,
   upper-left). WHITE DWARFS sit in the lower-left: very hot but tiny, so
   their total luminosity is low. Grounded in Ch.18 §18.4.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The H-R diagram",
    kind: "The great map of the stars",
    lede: "Meet astronomy's most important chart. Slide a main-sequence star's mass and watch it glide along the diagonal — mass alone sets where it sits.",
    thread: "THE STORY CONTINUES",
    threadText: "Plot stars by temperature and luminosity and they don't scatter randomly — they cluster into a pattern that reveals how stars work and how they end.",
    key: "TEMPERATURE LEFT, LUMINOSITY UP — MASS SETS THE SPOT",
    keyText: "On the Hertzsprung-Russell diagram, temperature increases to the LEFT (hot stars on the left) and luminosity increases UPWARD. Most stars lie along the diagonal MAIN SEQUENCE running from hot, luminous upper-left to cool, dim lower-right — and a main-sequence star's exact position is set almost entirely by its MASS. Giants and supergiants sit above the main sequence (luminous but cool), while WHITE DWARFS occupy the lower-left: very hot, yet so tiny that their total luminosity is low.",
    mass: "Main-sequence star mass",
    ms: "main sequence", giants: "giants", wd: "white dwarfs",
    hot: "hot", cool: "cool", lum: "luminous", dim: "dim",
    note: "H-R: temperature increases left, luminosity upward. Most stars lie on the mass-ordered main sequence; white dwarfs (hot but tiny) sit lower-left.",
  },
  ja: {
    title: "H–R図",
    kind: "星々の偉大な地図",
    lede: "天文学で最も重要な図に出会おう。主系列星の質量をスライドさせ、対角線に沿って滑る様子を見よう——質量だけがその位置を決めます。",
    thread: "物語はつづく",
    threadText: "星を温度と光度でプロットすると無作為には散らばりません——星の仕組みと終わり方を明かすパターンに集まります。",
    key: "温度は左、光度は上——質量が位置を決める",
    keyText: "ヘルツシュプルング・ラッセル図では、温度は左へ増え（高温の星が左）、光度は上へ増えます。ほとんどの星は、高温で明るい左上から低温で暗い右下へ走る対角線の主系列に沿って並びます——そして主系列星の正確な位置は、ほぼ完全に質量で決まります。巨星と超巨星は主系列の上（明るいが低温）に、白色矮星は左下に位置します：非常に高温ですが極めて小さいので総光度は低いのです。",
    mass: "主系列星の質量",
    ms: "主系列", giants: "巨星", wd: "白色矮星",
    hot: "高温", cool: "低温", lum: "明るい", dim: "暗い",
    note: "H–R：温度は左へ、光度は上へ増えます。ほとんどの星は質量順の主系列にあり、白色矮星（高温だが極小）は左下です。",
  },
};

function draw(ctx, cw, H, M, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const x0 = 46, x1 = cw - 16, y0 = 20, y1 = H - 40;
  // axes
  ctx.strokeStyle = "rgba(150,175,230,0.35)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0, y1); ctx.lineTo(x1, y1); ctx.stroke();
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`;
  ctx.textAlign = "left"; ctx.fillText(t.hot, x0 + 2, y1 + 14); ctx.textAlign = "right"; ctx.fillText(t.cool, x1, y1 + 14);
  ctx.save(); ctx.translate(x0 - 34, (y0 + y1) / 2); ctx.rotate(-Math.PI / 2); ctx.textAlign = "center"; ctx.fillText(`${t.dim} ← → ${t.lum}`, 0, 0); ctx.restore();
  // helper: pos from temperature fraction (0 cool..1 hot) and lum fraction (0 dim..1 lum)
  const px = (tf) => x1 - tf * (x1 - x0);   // hot (tf=1) on left
  const py = (lf) => y1 - lf * (y1 - y0);
  // main-sequence band (diagonal): hot+lum upper-left to cool+dim lower-right
  ctx.strokeStyle = "rgba(255,207,107,0.25)"; ctx.lineWidth = 14; ctx.lineCap = "round";
  ctx.beginPath(); ctx.moveTo(px(0.95), py(0.95)); ctx.lineTo(px(0.1), py(0.1)); ctx.stroke(); ctx.lineCap = "butt";
  // background scatter along main sequence
  for (let i = 0; i < 60; i++) { const f = Math.random(); const jt = (Math.random() - 0.5) * 0.06; const tf = 0.1 + f * 0.85 + jt, lf = 0.1 + f * 0.85 + jt; ctx.fillStyle = "rgba(220,230,255,0.5)"; ctx.beginPath(); ctx.arc(px(tf), py(lf), 1.6, 0, Math.PI * 2); ctx.fill(); }
  // giants clump (upper-right: cool but luminous)
  for (let i = 0; i < 16; i++) { const tf = 0.15 + Math.random() * 0.2, lf = 0.7 + Math.random() * 0.2; ctx.fillStyle = "rgba(255,150,90,0.7)"; ctx.beginPath(); ctx.arc(px(tf), py(lf), 2.5, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = "#ff9a52"; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.giants, px(0.25), py(0.7) - 8);
  // white dwarfs (lower-left: hot but dim)
  for (let i = 0; i < 12; i++) { const tf = 0.7 + Math.random() * 0.2, lf = 0.08 + Math.random() * 0.12; ctx.fillStyle = "rgba(180,210,255,0.8)"; ctx.beginPath(); ctx.arc(px(tf), py(lf), 2.2, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = "#bcd0ff"; ctx.textAlign = "center"; ctx.fillText(t.wd, px(0.8), py(0.2) + 4);
  ctx.fillStyle = "rgba(255,207,107,0.9)"; ctx.save(); ctx.translate(px(0.5), py(0.5)); ctx.rotate(-0.6); ctx.fillText(t.ms, 0, -10); ctx.restore();
  // the mass-controlled star on the main sequence
  const f = Math.min(Math.max((Math.log10(M) - Math.log10(0.2)) / (Math.log10(20) - Math.log10(0.2)), 0), 1);
  const tf = 0.12 + f * 0.82, lf = 0.12 + f * 0.82;
  const col = f > 0.7 ? "#9bb4ff" : f > 0.45 ? "#fff4e8" : "#ff9a52";
  ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px(tf), py(lf), 6, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(px(tf), py(lf), 9, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = C.text; ctx.font = `10px ${mono}`; ctx.textAlign = "left"; ctx.fillText(`${M} M☉`, px(tf) + 12, py(lf));
}

export function HRDiagram() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 280;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [M, setM] = useState(1);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, M, lang);
  }, [cw, M, lang]);

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

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.mass}</span>
          <input type="range" min="0.2" max="20" step="0.2" value={M}
            onChange={(e) => setM(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
          <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, width: 54, textAlign: "right" }}>{M} M☉</span>
        </div>

        <div style={{ marginTop: 4 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default HRDiagram;
