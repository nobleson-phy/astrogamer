/* ============================================================
   REALM 4 — COSMIC SCALE  (standalone interactive)
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang, tr } from "../i18n.jsx";
import { C, mono, reduceMotion } from "../theme.js";
import { clamp, useMeasure, setupCanvas } from "../helpers.js";
import { styles } from "../styles.js";
import { InfoPanel } from "../ui.jsx";
import { SCALE_STEPS } from "./data.js";

const STR = {
  en: {
    zoomIn: "‹ Zoom in", zoomOut: "Zoom out ›",
    prevDotA: "The dot at the center is ", prevDotB: " — the entire previous view, now a speck.",
    keyTerm: "KEY TERM", lyA: "A ", lyWord: "light-year",
    lyB: " is a distance, not a time — how far light travels in one year, about 9.5 trillion km.",
  },
  ja: {
    zoomIn: "‹ ズームイン", zoomOut: "ズームアウト ›",
    prevDotA: "中心の点は", prevDotB: "——ひとつ前の視野全体が、今や小さな点です。",
    keyTerm: "重要語", lyA: "", lyWord: "光年",
    lyB: "は時間ではなく距離の単位です——光が1年間に進む距離で、約9兆5000億kmです。",
  },
};

export function CosmicScale() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 440;
  const canvasRef = useRef(null);
  const [idx, setIdx] = useState(0);
  const anim = useRef({ from: 0, t: 1 });
  const cw = Math.min(w, 760);

  const go = (n) => {
    const clamped = clamp(n, 0, SCALE_STEPS.length - 1);
    if (clamped === idx) return;
    anim.current = { from: idx, t: reduceMotion ? 1 : 0, dir: clamped > idx ? 1 : -1 };
    setIdx(clamped);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, cw, H);
    const cx = cw / 2, cy = H / 2;
    let raf;
    const step = SCALE_STEPS[idx];
    const draw = () => {
      const a = anim.current;
      if (a.t < 1) a.t = Math.min(1, a.t + 0.04);
      ctx.clearRect(0, 0, cw, H);
      const maxR = Math.min(cw, H) * 0.34;
      const grow = a.dir === -1 ? 1 : a.t;
      const R = maxR * (0.25 + 0.75 * grow);
      const g = ctx.createRadialGradient(cx, cy, 2, cx, cy, R);
      g.addColorStop(0, step.tint); g.addColorStop(0.7, step.tint); g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalAlpha = 0.35; ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1; ctx.strokeStyle = step.tint; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
      if (idx >= 4) {
        for (let i = 0; i < 220; i++) {
          const ang = Math.random() * Math.PI * 2;
          const rad = Math.pow(Math.random(), 0.6) * R;
          ctx.globalAlpha = 0.5 * grow;
          ctx.fillStyle = i % 5 === 0 ? C.cool : "#ffffff";
          ctx.beginPath(); ctx.arc(cx + Math.cos(ang) * rad, cy + Math.sin(ang) * rad, Math.random() * 1.2 + 0.2, 0, Math.PI * 2); ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      if (idx > 0) {
        ctx.fillStyle = SCALE_STEPS[idx - 1].tint;
        ctx.beginPath(); ctx.arc(cx, cy, 2.4, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.25)";
        ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2); ctx.stroke();
      }
      if (a.t < 1) raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [cw, idx]);

  const step = SCALE_STEPS[idx];
  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <canvas ref={canvasRef} style={{ display: "block", maxWidth: "100%" }} />
        <div style={styles.controlBar}>
          <button style={styles.iconBtn} onClick={() => go(idx - 1)} disabled={idx === 0}>{t.zoomIn}</button>
          <div style={styles.ladder}>
            {SCALE_STEPS.map((s, i) => (
              <span key={i} onClick={() => go(i)} title={tr(s.name, lang)}
                style={{ ...styles.rung, background: i === idx ? s.tint : "rgba(120,150,210,0.25)", height: i === idx ? 22 : 12 }} />
            ))}
          </div>
          <button style={styles.iconBtn} onClick={() => go(idx + 1)} disabled={idx === SCALE_STEPS.length - 1}>{t.zoomOut}</button>
        </div>
        {idx > 0 && (
          <p style={styles.hint}>{t.prevDotA}<strong style={{ color: C.text }}>{tr(SCALE_STEPS[idx - 1].name, lang)}</strong>{t.prevDotB}</p>
        )}
      </div>

      <InfoPanel>
        <div style={styles.stepCounter}>{String(idx + 1).padStart(2, "0")} / {String(SCALE_STEPS.length).padStart(2, "0")}</div>
        <h3 style={styles.panelTitle}>{tr(step.name, lang)}</h3>
        <div style={{ ...styles.panelKind, fontFamily: mono, color: step.tint }}>{tr(step.size, lang)}</div>
        <p style={{ ...styles.factText, marginTop: 14 }}>{tr(step.blurb, lang)}</p>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.keyTerm}</div>
          <p style={styles.keyTermText}>{t.lyA}<strong style={{ color: C.text }}>{t.lyWord}</strong>{t.lyB}</p>
        </div>
      </InfoPanel>
    </div>
  );
}

export default CosmicScale;
