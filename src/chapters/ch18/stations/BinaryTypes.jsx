/* ============================================================
   STATION 2 — BINARY STAR TYPES
   About half of all stars are in binary or multiple systems. A VISUAL
   binary is one whose two stars can be resolved separately in a
   telescope — they must be widely separated, so their orbits are large
   and slow (years to centuries). A SPECTROSCOPIC binary is too close to
   resolve; we detect it from the alternating Doppler blue/red shifts of
   its lines, and such close orbits are fast (days to weeks).
   Grounded in Ch.18 §18.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Binary star types",
    kind: "Two ways to catch a pair",
    lede: "About half of all stars come in pairs. Switch between a wide, slow visual binary you can see split apart and a tight, fast spectroscopic one you can only hear in its shifting light.",
    thread: "THE STORY CONTINUES",
    threadText: "Single stars like our Sun are almost the exception. Most stars have companions — and those companions are how we finally learn a star's mass.",
    visualKey: "VISUAL BINARY — SEEN APART, WIDE AND SLOW",
    visualText: "Roughly half of all stars belong to binary or multiple systems. In a VISUAL binary, the two stars are far enough apart that a telescope resolves them separately. Because they must be widely separated to be seen apart, their orbits are large — and by Kepler's laws, large orbits mean long periods, typically years to centuries.",
    spectroKey: "SPECTROSCOPIC BINARY — HEARD IN THE DOPPLER SHIFT",
    spectroText: "A SPECTROSCOPIC binary is too close together to resolve into two points. Instead, as the stars revolve, their line-of-sight motion produces alternating blue- and red-shifts in their spectral lines — first one star approaches while the other recedes, then they swap. Such close orbits move fast, so spectroscopic binaries have short periods, typically days to weeks.",
    visual: "Visual binary", spectro: "Spectroscopic binary",
    vNote: "resolved · wide orbit · long period (years–centuries)",
    sNote: "unresolved · close orbit · short period (days–weeks)",
    frac: "~50% of stars are in binary or multiple systems",
    noteV: "A visual binary is resolved into two stars; wide separation means large, slow orbits (years to centuries).",
    noteS: "A spectroscopic binary is unresolved; we detect it from alternating Doppler shifts, and its close, fast orbit gives short periods (days to weeks).",
  },
  ja: {
    title: "連星の種類",
    kind: "対を捉える2つの方法",
    lede: "すべての星のおよそ半分は対で生まれます。分かれて見える広く遅い実視連星と、ずれる光でしか聞こえない狭く速い分光連星を切り替えよう。",
    thread: "物語はつづく",
    threadText: "太陽のような単独星はほぼ例外です。ほとんどの星に伴星があり——その伴星こそ、星の質量をついに知る手がかりです。",
    visualKey: "実視連星——分かれて見え、広く遅い",
    visualText: "すべての星のおよそ半分が連星や多重星系に属します。実視連星では、2つの星が十分に離れていて望遠鏡が別々に分解します。分かれて見えるには大きく離れねばならないので軌道は大きく——ケプラーの法則により、大きな軌道は長い周期、通常は数年〜数世紀を意味します。",
    spectroKey: "分光連星——ドップラー偏移で聞く",
    spectroText: "分光連星は近すぎて2点に分解できません。代わりに、星が公転すると視線方向の運動がスペクトル線に交互の青方偏移と赤方偏移を生みます——まず一方が近づき他方が遠ざかり、次に入れ替わります。こうした近い軌道は速く動くので、分光連星の周期は短く、通常は数日〜数週間です。",
    visual: "実視連星", spectro: "分光連星",
    vNote: "分解できる · 広い軌道 · 長周期（数年〜数世紀）",
    sNote: "分解できない · 近い軌道 · 短周期（数日〜数週間）",
    frac: "星の約50%が連星や多重星系にある",
    noteV: "実視連星は2つの星に分解されます。大きく離れているので軌道は大きく遅い（数年〜数世紀）です。",
    noteS: "分光連星は分解できません。交互のドップラー偏移で検出し、近く速い軌道で短周期（数日〜数週間）です。",
  },
};

function draw(ctx, cw, H, mode, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H * 0.38;
  if (mode === "visual") {
    const a = tt * 0.01, rx = cw * 0.26, ry = H * 0.2;
    const x1 = cx + Math.cos(a) * rx, y1 = cy + Math.sin(a) * ry;
    const x2 = cx - Math.cos(a) * rx, y2 = cy - Math.sin(a) * ry;
    // orbit paths
    ctx.strokeStyle = "rgba(150,175,230,0.2)"; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = "rgba(255,207,107,0.6)"; ctx.beginPath(); ctx.arc(cx, cy, 2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#ffe08a"; ctx.beginPath(); ctx.arc(x1, y1, 9, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#8fc0e8"; ctx.beginPath(); ctx.arc(x2, y2, 7, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.cool; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.vNote, cx, H - 14);
  } else {
    // two close stars orbiting fast (small separation)
    const a = tt * 0.06, r = 16;
    const x1 = cx + Math.cos(a) * r, x2 = cx - Math.cos(a) * r;
    const vy = Math.sin(a); // radial velocity phase
    ctx.strokeStyle = "rgba(150,175,230,0.2)"; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = "#ffe08a"; ctx.beginPath(); ctx.arc(x1, cy, 8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#8fc0e8"; ctx.beginPath(); ctx.arc(x2, cy, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(lang === "ja" ? "分解できない" : "unresolved", cx, cy - 26);
    // spectrum with a line splitting by radial velocity
    const bx = 30, bw = cw - 60, by = H * 0.62, bh = 30;
    const grad = ctx.createLinearGradient(bx, 0, bx + bw, 0); grad.addColorStop(0, "#6a3fff"); grad.addColorStop(0.5, "#8fe08f"); grad.addColorStop(1, "#ff5a5a");
    ctx.fillStyle = grad; ctx.fillRect(bx, by, bw, bh);
    const c0 = 0.5, sp = 0.06 * vy;
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#8fb8ff"; ctx.beginPath(); ctx.moveTo(bx + (c0 - sp) * bw, by); ctx.lineTo(bx + (c0 - sp) * bw, by + bh); ctx.stroke();
    ctx.strokeStyle = "#ff8f8f"; ctx.beginPath(); ctx.moveTo(bx + (c0 + sp) * bw, by); ctx.lineTo(bx + (c0 + sp) * bw, by + bh); ctx.stroke();
    ctx.fillStyle = C.cool; ctx.font = `9px ${mono}`; ctx.textAlign = "left"; ctx.fillText(lang === "ja" ? "線が交互に青／赤へずれる" : "lines shift blue / red alternately", bx, by - 5);
    ctx.fillStyle = C.cool; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.sNote, cx, H - 10);
  }
}

export function BinaryTypes() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("visual");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, mode, 30, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, mode, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, mode, lang]);

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
          <div style={{ ...styles.fateLabel, color: C.sun }}>{mode === "visual" ? t.visualKey : t.spectroKey}</div>
          <p style={styles.keyTermText}>{mode === "visual" ? t.visualText : t.spectroText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          {[["visual", t.visual], ["spectro", t.spectro]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <div style={{ fontFamily: mono, fontSize: 11.5, color: C.cool, marginTop: 8 }}>{t.frac}</div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{mode === "visual" ? t.noteV : t.noteS}</p>
      </div>
    </div>
  );
}

export default BinaryTypes;
