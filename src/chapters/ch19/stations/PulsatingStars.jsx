/* ============================================================
   STATION 4 — PULSATING STARS
   Some stars pulse in brightness on a clockwork period. Henrietta Leavitt
   found the PERIOD-LUMINOSITY relation: a Cepheid's pulsation period
   reveals its true luminosity — longer period, brighter star (up to
   ~10,000 L☉ for periods of 1-100 days). RR Lyrae stars pulse in under a
   day and all share ~50 L☉. Reading the period gives the luminosity — the
   key to their use as standard candles. Grounded in Ch.19 §19.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Pulsating stars",
    kind: "Period reveals luminosity",
    lede: "Set a Cepheid's pulsation period and watch it beat. The longer the period, the more luminous the star — a cosmic ruler discovered by Henrietta Leavitt.",
    thread: "THE STORY CONTINUES",
    threadText: "A few stars breathe in and out with astonishing regularity. Henrietta Leavitt realized that the rhythm of that breathing tells you exactly how bright the star truly is.",
    key: "LONGER PERIOD → HIGHER LUMINOSITY",
    keyText: "Certain stars pulsate, rising and falling in brightness with a steady period. Studying them, Henrietta Leavitt discovered the PERIOD-LUMINOSITY relation: a Cepheid variable's pulsation period is tied directly to its intrinsic luminosity — the longer the period, the more luminous the star. Cepheids have periods of 1-100 days and can reach up to about 10,000 times the Sun's luminosity. RR Lyrae variables pulse faster, in under a day, and all share roughly the same luminosity, about 50 L☉. Because reading the period gives the luminosity, these stars are powerful distance indicators.",
    period: "Cepheid period", lumL: "Luminosity from period",
    plLabel: "period-luminosity relation", rrL: "RR Lyrae (~50 L☉, <1 day)", cephL: "Cepheids (up to 10,000 L☉)",
    note: "Leavitt's period-luminosity relation: a Cepheid's period reveals its luminosity (longer = brighter, up to ~10,000 L☉). RR Lyrae all shine at ~50 L☉ with periods under a day.",
  },
  ja: {
    title: "脈動する星",
    kind: "周期が光度を明かす",
    lede: "ケフェイドの脈動周期を設定して、その鼓動を見よう。周期が長いほど星は明るい——ヘンリエッタ・リービットが発見した宇宙のものさしです。",
    thread: "物語はつづく",
    threadText: "いくつかの星は、驚くほど規則的に膨らんだり縮んだりします。ヘンリエッタ・リービットは、その呼吸のリズムが星の本当の明るさを正確に教えてくれると気づきました。",
    key: "周期が長い → 光度が高い",
    keyText: "ある種の星は脈動し、一定の周期で明るさが上下します。それらを研究して、ヘンリエッタ・リービットは周期光度関係を発見しました：ケフェイド変光星の脈動周期は、その固有光度に直接結びついています——周期が長いほど星は明るいのです。ケフェイドは1〜100日の周期を持ち、太陽の約1万倍の光度まで達します。RRライリ型変光星はより速く1日未満で脈動し、みなほぼ同じ約50 L☉の光度を共有します。周期を読めば光度がわかるので、これらの星は強力な距離指標です。",
    period: "ケフェイドの周期", lumL: "周期からの光度",
    plLabel: "周期光度関係", rrL: "RRライリ（約50 L☉・1日未満）", cephL: "ケフェイド（最大1万 L☉）",
    note: "リービットの周期光度関係：ケフェイドの周期がその光度を明かします（長いほど明るく、最大約1万 L☉）。RRライリはみな約50 L☉で周期は1日未満です。",
  },
};

function draw(ctx, cw, H, periodDays, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // luminosity from period (schematic Leavitt law): L ~ 300 * period^1.3 up to ~10000
  const L = Math.min(300 * Math.pow(periodDays, 1.15), 12000);
  // pulsating star (left): brightness oscillates at a rate ~ 1/period
  const sx = cw * 0.2, sy = H * 0.4;
  const phase = (Math.sin(tt * (0.12 / Math.sqrt(periodDays))) + 1) / 2;
  const R = 18 + phase * 10 + Math.log10(L) * 3;
  const bright = 0.5 + phase * 0.5;
  const glow = ctx.createRadialGradient(sx, sy, R * 0.4, sx, sy, R * 1.8); glow.addColorStop(0, `rgba(255,230,150,${bright})`); glow.addColorStop(1, "rgba(255,180,60,0)");
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(sx, sy, R * 1.8, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = `rgba(255,${220 + phase * 30 | 0},150,1)`; ctx.beginPath(); ctx.arc(sx, sy, R, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(`P = ${periodDays} d`, sx, sy + R * 1.8 + 12);
  // period-luminosity plot (right)
  const gx0 = cw * 0.44, gx1 = cw - 16, gy0 = 20, gy1 = H - 44;
  ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx0, gy0); ctx.lineTo(gx0, gy1); ctx.lineTo(gx1, gy1); ctx.stroke();
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "left"; ctx.fillText("L", gx0 - 10, gy0 + 4); ctx.textAlign = "center"; ctx.fillText(lang === "ja" ? "周期 →" : "period →", (gx0 + gx1) / 2, H - 30);
  // relation line (log period vs log L)
  const lx = (p) => gx0 + (Math.log10(p) - Math.log10(0.3)) / (Math.log10(100) - Math.log10(0.3)) * (gx1 - gx0);
  const ly = (l) => gy1 - (Math.log10(l) - Math.log10(30)) / (Math.log10(12000) - Math.log10(30)) * (gy1 - gy0);
  ctx.strokeStyle = "#ffcf6b"; ctx.lineWidth = 2; ctx.beginPath();
  for (let p = 1; p <= 100; p += 2) { const l = Math.min(300 * Math.pow(p, 1.15), 12000); const x = lx(p), y = ly(l); if (p === 1) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
  ctx.stroke();
  // RR Lyrae region (short period ~50 L)
  ctx.fillStyle = "rgba(143,192,232,0.7)"; ctx.beginPath(); ctx.arc(lx(0.5), ly(50), 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#8fc0e8"; ctx.font = `8px ${mono}`; ctx.textAlign = "left"; ctx.fillText(t.rrL, lx(0.5) + 6, ly(50) + 3);
  // current Cepheid point
  ctx.fillStyle = C.sun; ctx.beginPath(); ctx.arc(lx(periodDays), ly(L), 5, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(lx(periodDays), ly(L), 8, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = C.text; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(`${t.lumL}: ${L >= 1000 ? (L / 1000).toFixed(1) + "k" : L.toFixed(0)} L☉`, (gx0 + gx1) / 2, H - 12);
}

export function PulsatingStars() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [period, setPeriod] = useState(10);
  const pRef = useRef(10); pRef.current = period;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, pRef.current, 20, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, pRef.current, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 04</div>
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
          <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.period}</span>
          <input type="range" min="1" max="100" step="1" value={period}
            onChange={(e) => setPeriod(parseInt(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
          <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, width: 46, textAlign: "right" }}>{period} d</span>
        </div>

        <div style={{ marginTop: 4 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default PulsatingStars;
