/* ============================================================
   STATION 5 — RETROGRADE MOTION & EPICYCLES
   Planets normally drift eastward against the stars, but at times
   loop westward — retrograde motion. Toggle between the modern
   heliocentric explanation (Earth overtakes an outer planet) and
   Ptolemy's geocentric epicycle, which traced the same loop while
   keeping Earth at the centre.
   Grounded in Ch.2 §2.2–2.4.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { clamp, useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const MODES = [
  { id: "helio", label: { en: "Heliocentric (real)", ja: "太陽中心説（実際）" } },
  { id: "geo", label: { en: "Geocentric epicycle", ja: "地球中心の周転円" } },
];

const STR = {
  en: {
    title: "Retrograde motion",
    kind: "The planets' puzzling backward loops",
    lede: "Watch a planet's apparent track across the sky at the bottom. Most of the time it drifts one way — but every so often it loops backward. Switch models to see two explanations of the same loop.",
    thread: "THE BACKWARD LOOP",
    threadTexts: {
      helio: "In reality the planets simply orbit the Sun. As the faster Earth overtakes an outer planet on the inside track, that planet seems to slip backward for a while — an illusion of our own motion.",
      geo: "Ptolemy kept Earth fixed at the centre and made each planet ride a small circle (an epicycle) carried around on a larger one (the deferent). The combined motion traces a real loop — reproducing retrograde while keeping Earth central.",
    },
    def: "RETROGRADE MOTION",
    defText: "Retrograde motion is the temporary apparent westward (backward) motion of a planet against the fixed stars.",
    epi: "EPICYCLES",
    epiText: "Ptolemy's geocentric model used epicycles — small circles riding on larger ones — to account for retrograde motion while keeping Earth at the centre.",
    skyLabel: "Apparent path on the sky",
    prograde: "eastward (prograde)",
    retro: "westward (retrograde)",
    play: "▶ Play", pause: "❚❚ Pause", reset: "↺ Reset",
    earth: "Earth", mars: "Planet", sun: "Sun",
  },
  ja: {
    title: "逆行",
    kind: "惑星の不思議な後戻り",
    lede: "下の帯で、空を横切る惑星の見かけの軌跡を見よう。ふだんは一方向にずれていきますが、ときおり後戻りの輪を描きます。モデルを切り替えて、同じ輪の二つの説明を見比べよう。",
    thread: "後戻りの輪",
    threadTexts: {
      helio: "実際には惑星はただ太陽のまわりを回っています。内側を速く回る地球が外側の惑星を追い抜くとき、その惑星はしばらく後戻りして見えます——私たち自身の動きが生む錯覚です。",
      geo: "プトレマイオスは地球を中心に固定したまま、各惑星を小さな円(周転円)に乗せ、それを大きな円(従円)で運びました。合わさった動きが実際に輪を描き——地球を中心に保ったまま逆行を再現しました。",
    },
    def: "逆行",
    defText: "逆行とは、恒星に対して惑星が一時的に見かけ上西向き(後戻り)に動くことです。",
    epi: "周転円",
    epiText: "プトレマイオスの地球中心説は、周転円——大きな円の上を回る小さな円——を用いて、地球を中心に保ったまま逆行を説明しました。",
    skyLabel: "空での見かけの通り道",
    prograde: "東向き(順行)",
    retro: "西向き(逆行)",
    play: "▶ 再生", pause: "❚❚ 一時停止", reset: "↺ リセット",
    earth: "地球", mars: "惑星", sun: "太陽",
  },
};

const W_EARTH = 1.0, W_MARS = 0.53; // angular speeds

function positions(mode, t, R) {
  if (mode === "helio") {
    const r1 = R * 0.26, r2 = R * 0.46;
    const E = [Math.cos(t * W_EARTH) * r1, Math.sin(t * W_EARTH) * r1];
    const M = [Math.cos(t * W_MARS) * r2, Math.sin(t * W_MARS) * r2];
    return { E, M, sun: [0, 0] };
  } else {
    const Rd = R * 0.30, Re = R * 0.16;
    const phi = t * W_MARS;
    const dc = [Math.cos(phi) * Rd, Math.sin(phi) * Rd];
    const M = [dc[0] + Math.cos(t * W_EARTH) * Re, dc[1] + Math.sin(t * W_EARTH) * Re];
    return { E: [0, 0], M, dc, Rd, Re, sun: [Math.cos(phi) * Rd, Math.sin(phi) * Rd] };
  }
}

/* apparent ecliptic longitude of the planet as seen from Earth */
function appLon(mode, t, R) {
  const p = positions(mode, t, R);
  return Math.atan2(p.M[1] - p.E[1], p.M[0] - p.E[0]);
}

function draw(ctx, cw, H, mode, t) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H * 0.36;
  const R = Math.min(cw, H * 0.9) * 0.42;
  const p = positions(mode, t, R);
  const px = (v) => cx + v[0], py = (v) => cy + v[1];

  // background stars
  for (let i = 0; i < 40; i++) {
    const x = ((i * 97) % cw), y = ((i * 53) % (H * 0.62));
    ctx.fillStyle = "rgba(233,237,247,0.25)"; ctx.beginPath(); ctx.arc(x, y, 0.8, 0, 7); ctx.fill();
  }

  if (mode === "helio") {
    // orbits
    ctx.strokeStyle = "rgba(99,211,240,0.3)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(cx, cy, R * 0.26, 0, 7); ctx.stroke();
    ctx.strokeStyle = "rgba(255,154,107,0.35)";
    ctx.beginPath(); ctx.arc(cx, cy, R * 0.46, 0, 7); ctx.stroke();
    // Sun
    ctx.fillStyle = "#ffcf6b"; ctx.beginPath(); ctx.arc(cx, cy, 9, 0, 7); ctx.fill();
  } else {
    // deferent
    ctx.strokeStyle = "rgba(140,170,220,0.3)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(cx, cy, p.Rd, 0, 7); ctx.stroke();
    // Earth at centre
    ctx.fillStyle = "#4a8fd4"; ctx.beginPath(); ctx.arc(cx, cy, 7, 0, 7); ctx.fill();
    // epicycle
    ctx.strokeStyle = "rgba(255,154,107,0.5)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(px(p.dc), py(p.dc), p.Re, 0, 7); ctx.stroke();
    // spoke to deferent centre
    ctx.strokeStyle = "rgba(140,170,220,0.4)"; ctx.setLineDash([3, 4]);
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px(p.dc), py(p.dc)); ctx.stroke(); ctx.setLineDash([]);
    // traced looping path
    ctx.strokeStyle = "rgba(255,224,138,0.5)"; ctx.lineWidth = 1.4;
    ctx.beginPath();
    for (let s = 0; s <= 260; s++) {
      const tt = (s / 260) * Math.PI * 2 / W_MARS; // one deferent revolution
      const q = positions("geo", tt, R);
      const x = cx + q.M[0], y = cy + q.M[1];
      s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // sight-line Earth → planet
  ctx.strokeStyle = "rgba(255,207,107,0.55)"; ctx.lineWidth = 1.4; ctx.setLineDash([5, 5]);
  const dir = Math.atan2(p.M[1] - p.E[1], p.M[0] - p.E[0]);
  ctx.beginPath(); ctx.moveTo(px(p.E), py(p.E)); ctx.lineTo(px(p.E) + Math.cos(dir) * R * 1.4, py(p.E) + Math.sin(dir) * R * 1.4); ctx.stroke();
  ctx.setLineDash([]);

  // Earth & planet dots
  ctx.fillStyle = "#4a8fd4"; ctx.beginPath(); ctx.arc(px(p.E), py(p.E), 6, 0, 7); ctx.fill();
  ctx.fillStyle = "#ff9a6b"; ctx.beginPath(); ctx.arc(px(p.M), py(p.M), 6, 0, 7); ctx.fill();

  // --- apparent-path sky band at the bottom ---
  const bandY = H - 34;
  ctx.strokeStyle = "rgba(140,170,220,0.4)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(20, bandY); ctx.lineTo(cw - 20, bandY); ctx.stroke();
  // sample a trailing window of apparent longitude, unwrapped
  const N = 90, dt = 0.09;
  let prev = appLon(mode, t - N * dt, R);
  let unwrapped = prev, samples = [];
  for (let i = 0; i <= N; i++) {
    const tt = t - (N - i) * dt;
    let a = appLon(mode, tt, R);
    let d = a - prev;
    while (d > Math.PI) d -= Math.PI * 2;
    while (d < -Math.PI) d += Math.PI * 2;
    unwrapped += d; prev = a;
    samples.push({ tt, lon: unwrapped, retro: d < 0 });
  }
  const lo = Math.min(...samples.map((s) => s.lon)), hi = Math.max(...samples.map((s) => s.lon));
  const span = Math.max(hi - lo, 0.001);
  const mapx = (lon) => 24 + ((lon - lo) / span) * (cw - 48);
  for (let i = 1; i < samples.length; i++) {
    ctx.strokeStyle = samples[i].retro ? "#ff7a6b" : "#5fd39a"; ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(mapx(samples[i - 1].lon), bandY - (i - 1) * 0); // flat band; colour encodes direction
    ctx.lineTo(mapx(samples[i].lon), bandY);
    ctx.stroke();
  }
  // current position marker
  ctx.fillStyle = "#ff9a6b";
  ctx.beginPath(); ctx.arc(mapx(samples[samples.length - 1].lon), bandY, 5, 0, 7); ctx.fill();
}

export function Retrograde() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 400;
  const canvasRef = useRef(null);
  const [mode, setMode] = useState("helio");
  const [playing, setPlaying] = useState(!reduceMotion);
  const tRef = useRef(6);
  const cw = Math.min(w, 760);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, mode, tRef.current); return; }
    let raf;
    const loop = () => {
      if (playing) tRef.current += 0.03;
      draw(ctx, cw, H, mode, tRef.current);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, mode, playing]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 05</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{t.threadTexts[mode]}</p>
        </div>
        <div style={styles.fateBox}>
          <div style={{ ...styles.fateLabel, color: C.danger }}>{t.def}</div>
          <p style={styles.factText}>{t.defText}</p>
        </div>
        <div style={{ ...styles.pathBox, marginTop: 14 }}>
          <div style={{ ...styles.fateLabel, color: C.sun }}>{t.epi}</div>
          <p style={{ ...styles.keyTermText, margin: 0 }}>{t.epiText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>
        <div style={styles.pickerRow}>
          {MODES.map((m) => (
            <button key={m.id} onClick={() => setMode(m.id)}
              style={{ ...styles.chip, ...(mode === m.id ? styles.chipOn : {}) }}>{tr(m.label, lang)}</button>
          ))}
        </div>
        <canvas ref={canvasRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)", marginTop: 12 }} />

        <div style={{ display: "flex", gap: 16, fontFamily: mono, fontSize: 12.5, marginTop: 8 }}>
          <span style={{ color: C.good }}>■ {t.prograde}</span>
          <span style={{ color: C.danger }}>■ {t.retro}</span>
        </div>

        {!reduceMotion && (
          <div style={styles.controlBar}>
            <button style={styles.iconBtn} onClick={() => setPlaying((p) => !p)}>{playing ? t.pause : t.play}</button>
            <button style={styles.chip} onClick={() => { tRef.current = 6; }}>{t.reset}</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Retrograde;
