/* ============================================================
   REALM 3 — NIGHT SKY  (standalone interactive)
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang, tr } from "../i18n.jsx";
import { C, ui } from "../theme.js";
import { useMeasure, setupCanvas } from "../helpers.js";
import { styles } from "../styles.js";
import { InfoPanel } from "../ui.jsx";
import { CONSTELLATIONS } from "./data.js";

const STR = {
  en: {
    revealShapes: "Reveal the shapes", hideLines: "Hide the lines",
    skyHint: "Tap a constellation on the sky to read its story.",
    skyNote: "Star positions here are simplified to make each shape easy to learn — a real star chart is the natural next step.",
  },
  ja: {
    revealShapes: "形を表示", hideLines: "線を隠す",
    skyHint: "空の星座をタップすると、その物語が読めます。",
    skyNote: "形を覚えやすいよう星の位置は簡略化しています——本物の星図が次のステップです。",
  },
};

export function NightSky() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 470;
  const canvasRef = useRef(null);
  const [showLines, setShowLines] = useState(true);
  const [selected, setSelected] = useState(0);
  const bgStars = useRef([]);
  const hit = useRef([]);
  const cw = Math.min(w, 760);

  useEffect(() => {
    if (bgStars.current.length) return;
    bgStars.current = Array.from({ length: 320 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.1 + 0.2 }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, cw, H);
    ctx.clearRect(0, 0, cw, H);
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "rgba(20,26,52,0.5)"); bg.addColorStop(1, "rgba(8,10,22,0.5)");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, cw, H);
    for (const s of bgStars.current) {
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.beginPath(); ctx.arc(s.x * cw, s.y * H, s.r, 0, Math.PI * 2); ctx.fill();
    }
    const hits = [];
    CONSTELLATIONS.forEach((con, ci) => {
      const [ax, ay] = con.anchor;
      const pts = con.stars.map(([x, y]) => [(ax + (x - 0.5) * con.scale) * cw, (ay + (y - 0.5) * con.scale) * H]);
      const sel = selected === ci;
      if (showLines) {
        ctx.strokeStyle = sel ? "rgba(99,211,240,0.9)" : "rgba(120,150,210,0.35)";
        ctx.lineWidth = sel ? 1.6 : 1;
        con.lines.forEach(([a, b]) => { ctx.beginPath(); ctx.moveTo(pts[a][0], pts[a][1]); ctx.lineTo(pts[b][0], pts[b][1]); ctx.stroke(); });
      }
      pts.forEach(([x, y]) => {
        const rr = sel ? 3.4 : 2.6;
        const g = ctx.createRadialGradient(x, y, 0, x, y, rr * 3);
        g.addColorStop(0, sel ? "#ffffff" : "#dfe9ff"); g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, rr * 3, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#ffffff"; ctx.beginPath(); ctx.arc(x, y, rr, 0, Math.PI * 2); ctx.fill();
      });
      const cxL = pts.reduce((a, p) => a + p[0], 0) / pts.length;
      const cyL = pts.reduce((a, p) => a + p[1], 0) / pts.length;
      if (showLines || sel) {
        ctx.fillStyle = sel ? C.cool : "rgba(200,210,235,0.55)";
        ctx.font = `${sel ? 600 : 400} 15px ${ui}`; ctx.textAlign = "center";
        ctx.fillText(tr(con.name, lang), cxL, cyL + con.scale * H * 0.62);
      }
      hits.push({ ci, x: cxL, y: cyL, r: con.scale * Math.max(cw, H) * 0.5 });
    });
    hit.current = hits;
  }, [cw, showLines, selected, lang]);

  const onClick = (ev) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = ev.clientX - rect.left, my = ev.clientY - rect.top;
    let best = null, bd = 1e9;
    for (const h of hit.current) {
      const d = Math.hypot(mx - h.x, my - h.y);
      if (d < h.r && d < bd) { bd = d; best = h.ci; }
    }
    if (best !== null) setSelected(best);
  };

  const con = CONSTELLATIONS[selected];
  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <canvas ref={canvasRef} onClick={onClick} style={{ display: "block", cursor: "pointer", maxWidth: "100%", borderRadius: 10 }} />
        <div style={styles.controlBar}>
          <button style={{ ...styles.chip, ...(showLines ? styles.chipOn : {}) }} onClick={() => setShowLines((s) => !s)}>
            {showLines ? t.hideLines : t.revealShapes}
          </button>
          <div style={styles.speedRow}>
            {CONSTELLATIONS.map((c, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{ ...styles.chip, ...(selected === i ? styles.chipOn : {}) }}>
                {tr(c.name, lang)}
              </button>
            ))}
          </div>
        </div>
        <p style={styles.hint}>{t.skyHint}</p>
      </div>

      <InfoPanel>
        <h3 style={styles.panelTitle}>{tr(con.name, lang)}</h3>
        <div style={styles.panelKind}>{tr(con.notable, lang)}</div>
        <p style={{ ...styles.factText, marginTop: 14 }}>{tr(con.info, lang)}</p>
        <p style={styles.note}>{t.skyNote}</p>
      </InfoPanel>
    </div>
  );
}

export default NightSky;
