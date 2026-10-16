/* ============================================================
   STATION 3 — GRAVITATIONAL TIME DILATION & REDSHIFT
   In curved spacetime, time itself slows in strong gravity. A clock deep in a
   gravity well ticks slower than one far out. And light climbing out of the
   well loses energy — its wavelength stretches toward the red (gravitational
   redshift). This is not science fiction: GPS satellite clocks run about
   45 microseconds/day FAST because they sit higher in Earth's field, and must
   be corrected or navigation drifts kilometers. Grounded in Ch.24.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp, lerp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Time dilation & redshift",
    kind: "Deeper gravity slows time and reddens light",
    lede: "Deepen the gravity well. Watch the deep clock's hand fall behind the far clock, and the light climbing out stretch and redden as it loses energy.",
    thread: "TIME IS NOT UNIVERSAL",
    threadText: "If gravity is the shape of spacetime, then time is part of what gets bent. Clocks do not agree — the deeper you sit, the slower they run.",
    key: "DEEPER GRAVITY → SLOWER TIME & REDSHIFTED LIGHT",
    keyText: "Because gravity curves spacetime, it also stretches TIME. A clock deep inside a gravity well ticks more slowly than an identical clock far away — gravitational TIME DILATION. Light emitted from deep in the well must climb out, and climbing costs energy; since it cannot slow down, it loses energy by stretching its WAVELENGTH toward the red. This is GRAVITATIONAL REDSHIFT. It is a measured, everyday effect: clocks on GPS satellites sit higher in Earth's weaker field and run about 45 microseconds per day FASTER than ground clocks. Engineers pre-correct for this — without the relativistic adjustment, GPS positions would drift by kilometers within a day.",
    depth: "Gravity-well depth",
    farClock: "far clock (weak gravity)",
    deepClock: "deep clock (strong gravity)",
    emitted: "emitted", observed: "observed (redshifted)",
    gps: "GPS clocks gain about 45 μs/day — corrected or navigation fails",
    lag: "deep clock lag",
    note: "Clocks run slower deep in a gravity well, and light climbing out is redshifted. GPS satellite clocks gain about 45 μs/day from this effect and must be corrected to keep navigation accurate.",
  },
  ja: {
    title: "時間の遅れと赤方偏移",
    kind: "深い重力は時間を遅らせ光を赤くする",
    lede: "重力の井戸を深くしよう。深い時計の針が遠い時計に遅れていくのを見て、這い上がる光がエネルギーを失って伸び、赤くなるのを見よう。",
    thread: "時間は普遍ではない",
    threadText: "重力が時空の形なら、時間も曲げられるものの一部です。時計は一致しません——深く座るほど、ゆっくり進みます。",
    key: "深い重力 → 遅い時間と赤方偏移した光",
    keyText: "重力は時空を曲げるので、時間も引き伸ばします。重力の井戸の深いところにある時計は、遠くにある同じ時計よりゆっくり刻みます——重力による時間の遅れです。井戸の深いところから出た光は這い上がらねばならず、上るにはエネルギーがかかります。光は遅くなれないので、波長を赤の方へ伸ばしてエネルギーを失います。これが重力赤方偏移です。これは測定された日常の効果です：GPS衛星の時計は地球の弱い場の高いところにあり、地上の時計より1日あたり約45マイクロ秒速く進みます。技術者はこれをあらかじめ補正します——相対論的な調整がなければ、GPSの位置は1日で数キロメートルずれてしまいます。",
    depth: "重力の井戸の深さ",
    farClock: "遠い時計（弱い重力）",
    deepClock: "深い時計（強い重力）",
    emitted: "放出時", observed: "観測時（赤方偏移）",
    gps: "GPSの時計は1日に約45 μs進む——補正しないと測位が破綻する",
    lag: "深い時計の遅れ",
    note: "重力の井戸の深いところでは時計がゆっくり進み、這い上がる光は赤方偏移します。GPS衛星の時計はこの効果で1日あたり約45 μs進み、測位を正確に保つため補正が必要です。",
  },
};

function clockFace(ctx, cx, cy, r, angle, color, label, lang) {
  ctx.strokeStyle = color; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
  // ticks
  ctx.strokeStyle = "rgba(200,215,255,0.5)"; ctx.lineWidth = 1;
  for (let k = 0; k < 12; k++) {
    const a = (k / 12) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * (r - 4), cy + Math.sin(a) * (r - 4));
    ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    ctx.stroke();
  }
  // hand
  ctx.strokeStyle = color; ctx.lineWidth = 2.6;
  ctx.beginPath(); ctx.moveTo(cx, cy);
  ctx.lineTo(cx + Math.cos(angle - Math.PI / 2) * (r - 8), cy + Math.sin(angle - Math.PI / 2) * (r - 8));
  ctx.stroke();
  ctx.fillStyle = color; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(label, cx, cy + r + 16);
}

function draw(ctx, cw, H, depth, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const slow = lerp(1, 0.25, depth);        // deep clock runs at this fraction of far clock

  // gravity well shading on the lower portion
  const wellY = H * 0.5;
  const grad = ctx.createLinearGradient(0, wellY, 0, H);
  grad.addColorStop(0, "rgba(99,160,240,0.04)"); grad.addColorStop(1, `rgba(255,110,67,${0.05 + depth * 0.18})`);
  ctx.fillStyle = grad; ctx.fillRect(0, wellY, cw, H - wellY);
  // well curve
  ctx.strokeStyle = "rgba(150,180,240,0.4)"; ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (let x = 0; x <= cw; x += 5) {
    const dxc = (x - cw * 0.5) / (cw * 0.28);
    const y = wellY + lerp(8, 70, depth) * Math.exp(-dxc * dxc);
    if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // two clocks: far (top-left), deep (bottom-center)
  const farA = (tt * 0.03) % (Math.PI * 2);
  const deepA = (tt * 0.03 * slow) % (Math.PI * 2);
  clockFace(ctx, cw * 0.22, H * 0.26, 30, farA, C.cool, t.farClock, lang);
  clockFace(ctx, cw * 0.5, H * 0.74, 30, deepA, C.sun, t.deepClock, lang);

  // lag readout
  const lagPct = Math.round((1 - slow) * 100);
  ctx.fillStyle = C.sun; ctx.font = `11px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(`${t.lag}: -${lagPct}%`, 12, H - 12);

  // light wave climbing out from deep clock to the right, reddening as it rises
  const waveX0 = cw * 0.62, waveX1 = cw - 20;
  const amp = 7, cyc = lerp(14, 5, depth);   // stretch wavelength with depth: longer λ = fewer cycles
  const n = Math.round(lerp(10, 4, depth));
  ctx.lineWidth = 2;
  const segX = (waveX1 - waveX0);
  ctx.beginPath();
  for (let i = 0; i <= 60; i++) {
    const f = i / 60;
    const x = waveX0 + segX * f;
    const y = lerp(H * 0.74, H * 0.2, f) + Math.sin(f * n * Math.PI * 2 - tt * 0.1) * amp;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  // color gradient blue (emitted) -> red (observed)
  const lg = ctx.createLinearGradient(waveX0, H * 0.74, waveX1, H * 0.2);
  lg.addColorStop(0, "#8fd0ff");
  lg.addColorStop(1, lerp(0.5, 1, depth) > 0.7 ? "#ff5b43" : "#ffb05e");
  ctx.strokeStyle = lg; ctx.stroke();

  ctx.fillStyle = "#8fd0ff"; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.emitted, waveX0 + 6, H * 0.74 + 20);
  ctx.fillStyle = "#ff7a55"; ctx.fillText(t.observed, waveX1 - 30, H * 0.2 - 8);
}

export function TimeDilationRedshift() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 300;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [depth, setDepth] = useState(0.5);
  const depthRef = useRef(0.5); depthRef.current = depth;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, depthRef.current, 120, lang); return; }
    let raf, tt = 0;
    const loop = () => {
      tt += 1;
      draw(ctx, cw, H, depthRef.current, tt, lang);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

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
        <div style={styles.fateBox}>
          <div style={{ ...styles.fateLabel, color: C.sun }}>{t.key}</div>
          <p style={styles.keyTermText}>{t.keyText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "4px 0 8px" }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.depth}</span>
          <input type="range" min="0" max="0.95" step="0.01" value={depth}
            onChange={(e) => setDepth(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
          <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, width: 44, textAlign: "right" }}>{Math.round(depth * 100)}%</span>
        </div>

        <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />

        <div style={{ fontFamily: mono, fontSize: 11.5, color: C.sun, marginTop: 8 }}>{t.gps}</div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default TimeDilationRedshift;
