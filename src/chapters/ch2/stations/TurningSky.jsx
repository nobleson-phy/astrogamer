/* ============================================================
   STATION 3 — THE TURNING SKY
   The sky appears to rotate once a day (really Earth turning).
   What you see depends on your latitude: change it and watch the
   star-trail circles tilt. At the North Pole the celestial pole
   sits at the zenith and stars never rise or set.
   Grounded in Ch.2 §2.1 (The sky's daily motion).
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { clamp, useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const PRESETS = [
  { lat: 90, label: { en: "North Pole", ja: "北極" } },
  { lat: 45, label: { en: "Mid-latitude", ja: "中緯度" } },
  { lat: 0, label: { en: "Equator", ja: "赤道" } },
];

const STR = {
  en: {
    title: "The turning sky",
    kind: "Why the sky looks different from different places",
    lede: "The whole sky seems to wheel around once a day — really it is Earth turning beneath it. Slide your latitude and watch the star trails tilt.",
    thread: "STANDING ON A SPINNING EARTH",
    threadText: "Every star traces a circle around the celestial pole. How much of each circle stays above your horizon — and so which stars ever set — depends entirely on your latitude.",
    latLabel: "Your latitude",
    poleAlt: "Celestial pole altitude",
    poleNote: (a) => `The celestial pole sits ${a}° above the horizon — equal to your latitude.`,
    northPole: "AT THE NORTH POLE",
    northPoleText: "The celestial pole sits at your zenith, straight overhead. Every star circles the zenith and none ever rises or sets — the whole sky simply turns.",
    equator: "AT THE EQUATOR",
    equatorText: "The pole sits on the horizon, so stars rise straight up in the east and set straight down in the west. Every star rises and sets.",
  },
  ja: {
    title: "回る空",
    kind: "場所によって空の見え方が変わるわけ",
    lede: "空全体が1日に一度めぐって見えます——実際には、その下で地球が回っているのです。緯度を動かして、星の軌跡が傾くようすを見よう。",
    thread: "回る地球の上に立って",
    threadText: "どの星も天の極のまわりに円を描きます。その円のどれだけが地平線より上にとどまるか——つまりどの星が沈むか——は、あなたの緯度で決まります。",
    latLabel: "あなたの緯度",
    poleAlt: "天の極の高度",
    poleNote: (a) => `天の極は地平線から ${a}° の高さにあります——あなたの緯度に等しい高さです。`,
    northPole: "北極では",
    northPoleText: "天の極があなたの天頂——真上——に来ます。どの星も天頂のまわりを回り、昇りも沈みもしません。空全体がただ回るだけです。",
    equator: "赤道では",
    equatorText: "天の極が地平線上に来るため、星は東でまっすぐ昇り、西でまっすぐ沈みます。すべての星が昇り、そして沈みます。",
  },
};

const TRAIL_RADII = [0.14, 0.26, 0.38, 0.5, 0.62, 0.74];

function draw(ctx, cw, H, lat, phase) {
  ctx.clearRect(0, 0, cw, H);
  const marginTop = 26;
  const horizonY = H * 0.82;
  const cx = cw / 2;
  const latFrac = lat / 90;
  const poleY = horizonY - latFrac * (horizonY - marginTop);
  const scale = (horizonY - marginTop) * 1.15;

  // ground
  ctx.fillStyle = "rgba(30,40,70,0.5)";
  ctx.fillRect(0, horizonY, cw, H - horizonY);

  ctx.save();
  ctx.beginPath(); ctx.rect(0, 0, cw, horizonY); ctx.clip();

  // trails
  for (const rf of TRAIL_RADII) {
    const r = rf * scale;
    ctx.strokeStyle = "rgba(140,170,220,0.28)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(cx, poleY, r, 0, Math.PI * 2); ctx.stroke();
    // moving stars along this circle
    const count = 5;
    for (let k = 0; k < count; k++) {
      const a = (k / count) * Math.PI * 2 + phase + rf * 3;
      const x = cx + Math.cos(a) * r;
      const y = poleY + Math.sin(a) * r;
      if (y < horizonY) {
        ctx.fillStyle = "#e9edf7";
        ctx.beginPath(); ctx.arc(x, y, 1.8, 0, 7); ctx.fill();
      }
    }
  }
  ctx.restore();

  // horizon line
  ctx.strokeStyle = "rgba(95,211,154,0.7)"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, horizonY); ctx.lineTo(cw, horizonY); ctx.stroke();

  // pole marker (draw if at/above horizon)
  if (poleY <= horizonY + 1) {
    ctx.fillStyle = "#ffcf6b";
    ctx.beginPath(); ctx.arc(cx, poleY, 4.5, 0, 7); ctx.fill();
    ctx.strokeStyle = "rgba(255,207,107,0.5)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(cx, poleY, 8, 0, 7); ctx.stroke();
    ctx.font = `12px ${mono}`; ctx.fillStyle = "#ffcf6b";
    ctx.fillText(lat >= 88 ? "Zenith · pole" : "Celestial pole", cx + 12, poleY - 8);
  }

  // labels
  ctx.font = `12px ${mono}`; ctx.fillStyle = "rgba(174,183,210,0.8)";
  ctx.fillText("N", cx - 6, horizonY + 18);
  ctx.fillText("horizon", 8, horizonY - 6);
}

export function TurningSky() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 360;
  const canvasRef = useRef(null);
  const [lat, setLat] = useState(45);
  const cw = Math.min(w, 760);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, lat, 0.6); return; }
    let raf, ph = 0;
    const loop = () => { ph += 0.012; draw(ctx, cw, H, lat, ph); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lat]);

  const atPole = lat >= 85;
  const atEq = lat <= 5;

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
        <div style={{ ...styles.pathBox, marginTop: 14 }}>
          <div style={{ ...styles.fateLabel, color: C.sun }}>{t.poleAlt}</div>
          <p style={styles.pathText}>{lat}°</p>
          <p style={{ ...styles.keyTermText, marginTop: 4 }}>{t.poleNote(lat)}</p>
        </div>
        {atPole && (
          <div style={{ ...styles.fateBox, background: "rgba(99,211,240,0.06)", borderColor: C.borderBright }}>
            <div style={{ ...styles.fateLabel, color: C.cool }}>{t.northPole}</div>
            <p style={styles.factText}>{t.northPoleText}</p>
          </div>
        )}
        {atEq && (
          <div style={{ ...styles.fateBox, background: "rgba(95,211,154,0.06)", borderColor: "rgba(95,211,154,0.3)" }}>
            <div style={{ ...styles.fateLabel, color: C.good }}>{t.equator}</div>
            <p style={styles.factText}>{t.equatorText}</p>
          </div>
        )}
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>
        <canvas ref={canvasRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />

        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 13, color: C.cool, marginTop: 14 }}>
          <span>{t.latLabel}: {lat}° N</span>
        </div>
        <input type="range" min={0} max={90} value={lat} onChange={(e) => setLat(+e.target.value)} style={styles.range} />

        <div style={styles.pickerRow}>
          {PRESETS.map((p) => (
            <button key={p.lat} onClick={() => setLat(p.lat)}
              style={{ ...styles.chip, ...(lat === p.lat ? styles.chipOn : {}) }}>
              {tr(p.label, lang)} · {p.lat}°
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TurningSky;
