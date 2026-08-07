/* ============================================================
   STATION 4 — PRECESSION
   Earth's axis slowly sweeps out a cone, one turn every ~26,000
   years, so the "pole star" changes: Thuban → Polaris → Vega.
   The cause is the gravitational tug of the Sun and Moon on
   Earth's equatorial bulge — a slow wobble.
   Grounded in Ch.2 §2.1 (Precession).
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { clamp, useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const PERIOD = 26000;
/* Pole stars and the (approximate) year their era falls near. */
const STARS = [
  { name: { en: "Thuban", ja: "トゥバン" }, year: -2800, tint: "#8ad0ff" },
  { name: { en: "Polaris", ja: "ポラリス" }, year: 2000, tint: "#ffcf6b" },
  { name: { en: "Alderamin", ja: "ケフェウス座α" }, year: 7500, tint: "#b58cf0" },
  { name: { en: "Vega", ja: "ベガ" }, year: 16000, tint: "#63d3f0" },
];

const STR = {
  en: {
    title: "Precession",
    kind: "The slow wobble of Earth's axis",
    lede: "Like a spinning top slowing down, Earth's axis traces a slow cone in the sky. Drag through the millennia and watch which star the axis points to.",
    thread: "THE WANDERING POLE",
    threadText: "Because the axis sweeps a full circle every 26,000 years, the star it happens to point at — our 'pole star' — keeps changing over the ages.",
    yearLabel: "Year",
    poleStar: "Pole star now",
    period: "One full wobble",
    periodVal: "≈ 26,000 years",
    cause: "WHAT CAUSES IT",
    causeText: "The gravitational pull of the Sun and Moon on Earth's equatorial bulge tugs the axis around — a slow wobble, not a change in the tilt itself.",
    now: "Polaris now",
    later: "Vega in ~14,000 years",
    play: "▶ Sweep the ages", pause: "❚❚ Pause", reset: "↺ Today",
  },
  ja: {
    title: "歳差",
    kind: "地球の自転軸のゆっくりしたふらつき",
    lede: "回転が落ちていくコマのように、地球の自転軸は空にゆっくりと円錐を描きます。千年紀をたどって、軸がどの星を指すか見よう。",
    thread: "さまよう極",
    threadText: "軸は2万6千年で一周するため、その先にたまたま来る星——私たちの「北極星」——は、時代とともに移り変わります。",
    yearLabel: "年",
    poleStar: "現在の極の星",
    period: "一周の周期",
    periodVal: "約 2万6千年",
    cause: "原因",
    causeText: "太陽と月が地球の赤道のふくらみ(赤道バルジ)を引く重力が、軸をゆっくり回します——傾きそのものが変わるのではなく、軸のふらつきです。",
    now: "今はポラリス",
    later: "約1万4千年後にはベガ",
    play: "▶ 時代を送る", pause: "❚❚ 一時停止", reset: "↺ 現在",
  },
};

function angOf(year) { return ((year - 2000) / PERIOD) * Math.PI * 2 - Math.PI / 2; }

function currentStar(year) {
  // wrap the year into the star era nearest in the precession cycle
  let best = STARS[0], bd = Infinity;
  for (const s of STARS) {
    let d = Math.abs(((year - s.year) % PERIOD + PERIOD + PERIOD / 2) % PERIOD - PERIOD / 2);
    if (d < bd) { bd = d; best = s; }
  }
  return best;
}

function draw(ctx, cw, H, year) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2;
  const epY = H * 0.34;         // ecliptic pole (fixed centre of the circle)
  const earthY = H * 0.80;
  const pr = Math.min(cw, H) * 0.24; // precession-circle radius

  // precession circle (path the celestial pole traces)
  ctx.strokeStyle = "rgba(140,170,220,0.35)"; ctx.lineWidth = 1.2; ctx.setLineDash([4, 6]);
  ctx.beginPath(); ctx.ellipse(cx, epY, pr, pr * 0.55, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.setLineDash([]);

  // named pole stars around the circle
  for (const s of STARS) {
    const a = angOf(s.year);
    const x = cx + Math.cos(a) * pr;
    const y = epY + Math.sin(a) * pr * 0.55;
    ctx.fillStyle = s.tint; ctx.beginPath(); ctx.arc(x, y, 3.4, 0, 7); ctx.fill();
    ctx.font = `11.5px ${mono}`; ctx.fillStyle = s.tint;
    ctx.textAlign = x < cx ? "right" : "left";
    ctx.fillText(tr(s.name, "en"), x + (x < cx ? -7 : 7), y + 4);
  }
  ctx.textAlign = "start";

  // current celestial pole on the circle
  const a = angOf(year);
  const cpX = cx + Math.cos(a) * pr;
  const cpY = epY + Math.sin(a) * pr * 0.55;

  // cone edges (axis sweeps this cone)
  ctx.strokeStyle = "rgba(255,207,107,0.18)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(cx, earthY); ctx.lineTo(cx - pr, epY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx, earthY); ctx.lineTo(cx + pr, epY); ctx.stroke();

  // fixed ecliptic-pole reference axis (faint)
  ctx.strokeStyle = "rgba(140,170,220,0.25)"; ctx.setLineDash([2, 5]);
  ctx.beginPath(); ctx.moveTo(cx, earthY); ctx.lineTo(cx, epY); ctx.stroke(); ctx.setLineDash([]);

  // the spin axis, pointing at the current pole
  ctx.strokeStyle = "#ffcf6b"; ctx.lineWidth = 2.6;
  ctx.beginPath(); ctx.moveTo(cx, earthY); ctx.lineTo(cpX, cpY); ctx.stroke();
  // arrow head
  ctx.fillStyle = "#ffcf6b"; ctx.beginPath(); ctx.arc(cpX, cpY, 5, 0, 7); ctx.fill();
  ctx.strokeStyle = "#fff"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cpX, cpY, 9, 0, 7); ctx.stroke();

  // Earth with equatorial bulge, tilted to match the axis
  const tilt = Math.atan2(cpX - cx, earthY - cpY); // lean toward the pole direction
  ctx.save();
  ctx.translate(cx, earthY);
  ctx.rotate(tilt);
  const g = ctx.createRadialGradient(-6, -6, 4, 0, 0, 30);
  g.addColorStop(0, "#7fb4ea"); g.addColorStop(1, "#2b4a74");
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.ellipse(0, 0, 30, 26, 0, 0, Math.PI * 2); ctx.fill(); // bulge = wider equator
  ctx.strokeStyle = "rgba(255,255,255,0.4)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.ellipse(0, 0, 30, 9, 0, 0, Math.PI * 2); ctx.stroke(); // equator band
  ctx.restore();
}

export function Precession() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 380;
  const canvasRef = useRef(null);
  const [year, setYear] = useState(2000);
  const [playing, setPlaying] = useState(false);
  const cw = Math.min(w, 760);
  const star = currentStar(year);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, cw, H);
    draw(ctx, cw, H, year);
  }, [cw, year]);

  useEffect(() => {
    if (!playing || reduceMotion) return;
    let raf, last = performance.now();
    const loop = (now) => {
      if (now - last > 30) { last = now; setYear((y) => (y >= 23000 ? -3000 : y + 120)); }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const yrTxt = year < 0 ? `${Math.abs(year)} ${lang === "ja" ? "年 (紀元前ごろ)" : "BCE (approx.)"}` : `${year} ${lang === "ja" ? "年ごろ" : "CE (approx.)"}`;

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
        <div style={{ ...styles.pathBox, marginTop: 14 }}>
          <div style={{ ...styles.fateLabel, color: star.tint }}>{t.poleStar}</div>
          <p style={styles.pathText}>{tr(star.name, lang)} — {yrTxt}</p>
        </div>
        <dl style={styles.dl}>
          <div style={styles.row}><dt style={styles.dt}>{t.period}</dt><dd style={styles.dd}>{t.periodVal}</dd></div>
          <div style={styles.row}><dt style={styles.dt}>{t.now}</dt><dd style={{ ...styles.dd, color: C.sun }}>{t.later}</dd></div>
        </dl>
        <div style={styles.fateBox}>
          <div style={{ ...styles.fateLabel, color: C.danger }}>{t.cause}</div>
          <p style={styles.factText}>{t.causeText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>
        <canvas ref={canvasRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />

        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 13, color: C.cool, marginTop: 14 }}>
          <span>{t.yearLabel}: {yrTxt}</span>
          <span style={{ color: star.tint }}>{tr(star.name, lang)}</span>
        </div>
        <input type="range" min={-3000} max={23000} step={100} value={year} onChange={(e) => setYear(+e.target.value)} style={styles.range} />

        <div style={styles.controlBar}>
          {!reduceMotion && (
            <button style={styles.iconBtn} onClick={() => setPlaying((p) => !p)}>{playing ? t.pause : t.play}</button>
          )}
          <button style={styles.chip} onClick={() => { setPlaying(false); setYear(2000); }}>{t.reset}</button>
        </div>
      </div>
    </div>
  );
}

export default Precession;
