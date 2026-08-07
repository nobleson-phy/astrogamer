/* ============================================================
   STATION 2 — CONSTELLATIONS & THE ZODIAC
   Earth orbits the Sun; from Earth the Sun is projected against a
   different zodiac constellation through the year, tracing the
   ecliptic. A day-stepper shows the ~1°/day eastward drift.
   Grounded in Ch.2 §2.1 (Constellations, the ecliptic, planets).
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { clamp, useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

/* Twelve zodiac constellations, in the order the Sun passes through
   them starting near January. */
const SIGNS = [
  { en: "Capricornus", ja: "やぎ座" },
  { en: "Aquarius", ja: "みずがめ座" },
  { en: "Pisces", ja: "うお座" },
  { en: "Aries", ja: "おひつじ座" },
  { en: "Taurus", ja: "おうし座" },
  { en: "Gemini", ja: "ふたご座" },
  { en: "Cancer", ja: "かに座" },
  { en: "Leo", ja: "しし座" },
  { en: "Virgo", ja: "おとめ座" },
  { en: "Libra", ja: "てんびん座" },
  { en: "Scorpius", ja: "さそり座" },
  { en: "Sagittarius", ja: "いて座" },
];

const STR = {
  en: {
    title: "Constellations & the zodiac",
    kind: "The Sun's yearly path through the stars",
    lede: "Drag the day forward and watch Earth swing around the Sun. From Earth, the Sun appears projected onto a different constellation each month — its path is the ecliptic.",
    thread: "THE WANDERING SUN",
    threadText: "As Earth orbits, the Sun slides eastward against the fixed stars — about one degree per day — passing through the twelve zodiac constellations in a year.",
    dayLabel: "Day of year",
    sunIn: "The Sun lies in",
    lonLabel: "Sun's ecliptic longitude",
    plusDay: "+1 day",
    minusDay: "−1 day",
    play: "▶ Play year", pause: "❚❚ Pause",
    reset: "↺ Jan 1",
    shift: "≈ +1°/day eastward",
    facts: [
      { k: "88", v: { en: "official constellations divide the whole sky.", ja: "個の公式の星座が、空全体を分けています。" } },
      { k: '"planet"', v: { en: "is Greek for wanderer — objects that move against the fixed stars.", ja: "はギリシャ語で「さまよう者」——恒星に対して動く天体のこと。" } },
      { k: "ecliptic", v: { en: "is the Sun's apparent yearly path around the sphere, through the zodiac.", ja: "は、天球上を1年かけてめぐる太陽の見かけの通り道で、黄道帯を通ります。" } },
      { k: "≈1°/day", v: { en: "the Sun drifts eastward — because Earth is moving in its orbit.", ja: "太陽は東へずれていく——地球が公転軌道を動いているためです。" } },
    ],
  },
  ja: {
    title: "星座と黄道帯",
    kind: "星々をめぐる太陽の1年の道",
    lede: "日付を進めて、太陽のまわりを回る地球を見よう。地球から見ると、太陽は月ごとに別の星座に重なって見えます——その通り道が黄道です。",
    thread: "さまよう太陽",
    threadText: "地球が公転すると、太陽は恒星に対して東へ——1日あたり約1度——ずれていき、1年で黄道十二星座を通り抜けます。",
    dayLabel: "1年のうちの日",
    sunIn: "太陽がある星座",
    lonLabel: "太陽の黄経",
    plusDay: "＋1日",
    minusDay: "−1日",
    play: "▶ 1年を再生", pause: "❚❚ 一時停止",
    reset: "↺ 1月1日",
    shift: "約 +1°/日 東へ",
    facts: [
      { k: "88", v: { en: "個の公式の星座が、空全体を分けています。", ja: "個の公式の星座が、空全体を分けています。" } },
      { k: "「惑星」", v: { en: "はギリシャ語で「さまよう者」——恒星に対して動く天体のこと。", ja: "はギリシャ語で「さまよう者」——恒星に対して動く天体のこと。" } },
      { k: "黄道", v: { en: "は、天球上を1年かけてめぐる太陽の見かけの通り道で、黄道帯を通ります。", ja: "は、天球上を1年かけてめぐる太陽の見かけの通り道で、黄道帯を通ります。" } },
      { k: "約1°/日", v: { en: "太陽は東へずれていく——地球が公転軌道を動いているためです。", ja: "太陽は東へずれていく——地球が公転軌道を動いているためです。" } },
    ],
  },
};

const YEAR = 365;

function draw(ctx, cw, H, day, lang) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2;
  const ringR = Math.min(cw, H) * 0.42;
  const orbitR = ringR * 0.42;
  const frac = (day - 1) / YEAR;
  const earthAng = frac * Math.PI * 2 - Math.PI / 2; // start at top

  // zodiac ring
  ctx.strokeStyle = "rgba(181,140,240,0.35)"; ctx.lineWidth = 1.2;
  ctx.setLineDash([3, 6]);
  ctx.beginPath(); ctx.arc(cx, cy, ringR, 0, Math.PI * 2); ctx.stroke();
  ctx.setLineDash([]);

  const signIdx = Math.floor(frac * 12) % 12;
  // twelve sign markers
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 - Math.PI / 2 + Math.PI; // Sun-in-sign sits opposite Earth
    const x = cx + Math.cos(a) * ringR;
    const y = cy + Math.sin(a) * ringR;
    const on = i === signIdx;
    ctx.fillStyle = on ? "#ffe08a" : "rgba(174,183,210,0.5)";
    ctx.beginPath(); ctx.arc(x, y, on ? 4 : 2, 0, 7); ctx.fill();
    ctx.font = `${on ? 12.5 : 10.5}px ${mono}`;
    ctx.fillStyle = on ? "#ffe08a" : "rgba(174,183,210,0.55)";
    ctx.textAlign = x < cx - 4 ? "right" : x > cx + 4 ? "left" : "center";
    ctx.fillText(tr(SIGNS[i], lang), x + (x < cx - 4 ? -8 : x > cx + 4 ? 8 : 0), y + 3);
  }
  ctx.textAlign = "start";

  // Earth orbit
  ctx.strokeStyle = "rgba(99,211,240,0.3)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(cx, cy, orbitR, 0, Math.PI * 2); ctx.stroke();

  // Sun at centre
  const sg = ctx.createRadialGradient(cx, cy, 2, cx, cy, 22);
  sg.addColorStop(0, "#fff6d8"); sg.addColorStop(0.5, "#ffcf6b"); sg.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(cx, cy, 22, 0, 7); ctx.fill();
  ctx.fillStyle = "#ffcf6b"; ctx.beginPath(); ctx.arc(cx, cy, 10, 0, 7); ctx.fill();

  // Earth
  const ex = cx + Math.cos(earthAng) * orbitR;
  const ey = cy + Math.sin(earthAng) * orbitR;

  // sight-line Earth → Sun → far zodiac (the projected sign)
  const fx = cx - Math.cos(earthAng) * ringR;
  const fy = cy - Math.sin(earthAng) * ringR;
  ctx.strokeStyle = "rgba(255,207,107,0.55)"; ctx.lineWidth = 1.5; ctx.setLineDash([5, 5]);
  ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(fx, fy); ctx.stroke(); ctx.setLineDash([]);

  ctx.fillStyle = "#4a8fd4"; ctx.beginPath(); ctx.arc(ex, ey, 6, 0, 7); ctx.fill();
  ctx.strokeStyle = "#7fb4ea"; ctx.lineWidth = 1; ctx.stroke();
}

export function Zodiac() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 360;
  const canvasRef = useRef(null);
  const [day, setDay] = useState(1);
  const [playing, setPlaying] = useState(false);
  const cw = Math.min(w, 760);

  const frac = (day - 1) / YEAR;
  const signIdx = Math.floor(frac * 12) % 12;
  const lon = ((day - 1) * (360 / YEAR)) % 360;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, cw, H);
    draw(ctx, cw, H, day, lang);
  }, [cw, day, lang]);

  useEffect(() => {
    if (!playing || reduceMotion) return;
    let raf; let last = performance.now();
    const loop = (now) => {
      if (now - last > 40) { last = now; setDay((d) => (d >= YEAR ? 1 : d + 2)); }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const step = (n) => setDay((d) => clamp(d + n, 1, YEAR));

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
        <div style={{ ...styles.pathBox, marginTop: 14 }}>
          <div style={{ ...styles.fateLabel, color: C.sun }}>{t.sunIn}</div>
          <p style={styles.pathText}>{tr(SIGNS[signIdx], lang)}</p>
          <p style={{ ...styles.pathText, color: C.faint, marginTop: 4 }}>{t.lonLabel}: {lon.toFixed(1)}°</p>
        </div>
        <dl style={styles.dl}>
          {t.facts.map((f, i) => (
            <div key={i} style={styles.row}>
              <dt style={{ ...styles.dd, textAlign: "left", color: C.sun, flexShrink: 0, minWidth: 62 }}>{f.k}</dt>
              <dd style={{ ...styles.dt, textAlign: "left", margin: 0 }}>{tr(f.v, lang)}</dd>
            </div>
          ))}
        </dl>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>
        <canvas ref={canvasRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />

        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 13, color: C.cool, marginTop: 14 }}>
          <span>{t.dayLabel}: {day}</span>
          <span style={{ color: C.sun }}>{t.shift}</span>
        </div>
        <input type="range" min={1} max={YEAR} value={day} onChange={(e) => setDay(+e.target.value)} style={styles.range} />

        <div style={{ ...styles.controlBar }}>
          <button style={styles.iconBtn} onClick={() => step(-1)}>{t.minusDay}</button>
          <button style={styles.iconBtn} onClick={() => step(1)}>{t.plusDay}</button>
          {!reduceMotion && (
            <button style={styles.iconBtn} onClick={() => setPlaying((p) => !p)}>{playing ? t.pause : t.play}</button>
          )}
          <button style={styles.chip} onClick={() => { setPlaying(false); setDay(1); }}>{t.reset}</button>
        </div>
      </div>
    </div>
  );
}

export default Zodiac;
