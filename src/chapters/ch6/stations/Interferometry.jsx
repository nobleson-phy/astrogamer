/* ============================================================
   STATION 7 — INTERFEROMETRY
   No single dish can be built arbitrarily large, yet resolution — the
   finest detail an instrument can separate — improves as the aperture
   grows. Interferometry links two or more separate telescopes/dishes
   together electronically so they act as ONE instrument. The key idea is
   the BASELINE: the separation distance between the dishes. The array
   resolves detail as if it were a single dish as large as that baseline,
   so a wider baseline gives far sharper images than any one small dish.
   Resolution angle θ ≈ 1.22 λ / B — it shrinks (gets finer) as B grows.
   Grounded in Ch.6 §6.5.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp, lerp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const LIGHT = "#a8c4ff";
const LAMBDA_M = 0.06;               // 6 cm representative radio wavelength
const B_MIN_KM = 0.1, B_MAX_KM = 10; // baseline range

const STR = {
  en: {
    title: "Interferometry",
    kind: "Linking dishes → the baseline sets the resolution",
    lede: "One small dish can only see so sharply. But wire two dishes together and the sky cannot tell them apart from a single giant instrument. Slide the two apart and watch the detail snap into focus.",
    thread: "THE STORY DEEPENS",
    threadText: "We have built the telescope, chosen its focus, and pinned a detector at the end. Now we chase the last thing every observer wants — sharpness. Instead of casting one impossibly huge mirror, astronomers reach for a trick: link separate dishes and let them work as one.",
    key: "THE BASELINE SETS THE RESOLUTION",
    keyText: "Interferometry connects two or more separate telescopes electronically so they behave as a single instrument. The distance between them — the baseline — is what matters: the array resolves detail as if it were one dish as large as that separation. Widen the baseline and the resolution grows finer, mimicking a giant dish no factory could ever build.",
    pick: "Baseline (dish separation):",
    baselineL: "baseline",
    virtualL: "virtual dish = baseline",
    combineL: "signals combined electronically",
    inLight: "parallel wavefronts arrive in step",
    seeL: "What the array sees",
    blurred: "one blurred blob — detail lost",
    resolved: "two sources cleanly resolved",
    rBaseline: "Baseline",
    rAperture: "Effective aperture",
    rRes: "Resolution (finest detail)",
    rSharp: "Sharpness",
    sharpNote: "vs a single 100 m dish",
    finer: "smaller angle = finer detail",
    km: "km", arcsec: "arcsec",
  },
  ja: {
    title: "干渉計",
    kind: "皿をつなぐ → 基線が分解能を決める",
    lede: "小さな皿一つでは、これ以上鮮明には見えません。けれど二つの皿を電気的につなぐと、空はそれを一つの巨大な装置と区別できなくなります。二つを引き離して、細部がぐっと像を結ぶ様子を見てみよう。",
    thread: "物語は深まる",
    threadText: "望遠鏡を組み立て、焦点を選び、その先に検出器を据えました。いよいよ観測者が最後に求めるもの——鮮明さ——を追います。とてつもなく大きな鏡を一枚磨く代わりに、天文学者はある工夫にたどり着きました。離れた皿をつなぎ、一つとして働かせるのです。",
    key: "基線が分解能を決める",
    keyText: "干渉計は、二つ以上の離れた望遠鏡を電気的につないで一つの装置のように振る舞わせます。大切なのはその間隔——基線——です。配列は、その間隔と同じ大きさの一枚の皿であるかのように細部を分解します。基線を広げれば分解能はより細かくなり、どんな工場にも作れない巨大な皿を真似るのです。",
    pick: "基線（皿の間隔）：",
    baselineL: "基線",
    virtualL: "仮想の皿 ＝ 基線",
    combineL: "信号を電気的に合成",
    inLight: "平行な波面がそろって届く",
    seeL: "配列が見る像",
    blurred: "ぼやけた一つの塊——細部が失われる",
    resolved: "二つの光源がくっきり分かれる",
    rBaseline: "基線",
    rAperture: "実効口径",
    rRes: "分解能（見分けられる最小の細部）",
    rSharp: "鮮明さ",
    sharpNote: "100 m の皿一枚に対して",
    finer: "角度が小さいほど細部が細かい",
    km: "km", arcsec: "秒角",
  },
};

/* --- a single radio dish (bowl opening up) on the ground line --- */
function drawDish(ctx, x, gy, col) {
  const cy = gy - 16, r = 15;
  // mount post
  ctx.strokeStyle = "rgba(120,150,210,0.5)"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(x, cy + 2); ctx.lineTo(x, gy); ctx.stroke();
  // bowl (lower semicircle -> opens upward)
  ctx.strokeStyle = col; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(x, cy, r, 0, Math.PI); ctx.stroke();
  ctx.strokeStyle = col + "44"; ctx.lineWidth = 6;
  ctx.beginPath(); ctx.arc(x, cy, r, 0, Math.PI); ctx.stroke();
  // receiver at focus
  ctx.fillStyle = C.sun;
  ctx.beginPath(); ctx.arc(x, cy - 3, 2.4, 0, Math.PI * 2); ctx.fill();
}

/* --- main diagram: wavefronts, two dishes, virtual dish, correlator --- */
function drawArray(ctx, cw, H, frac, lang, phase) {
  ctx.clearRect(0, 0, cw, H);
  const t = STR[lang];
  const cx = cw / 2;
  const gy = H - 72;                       // ground line
  const maxSep = Math.min(cw * 0.62, 470);
  const bpx = lerp(48, maxSep, frac);      // pixel separation
  const xL = cx - bpx / 2, xR = cx + bpx / 2;
  const dishTop = gy - 31;                 // top of the bowls

  // incoming parallel wavefronts (flat plane waves, descending)
  const wfTop = 8, wfBot = gy - 44, wl = xL - 16, wr = xR + 16;
  ctx.lineWidth = 1.6;
  for (let k = 0; k < 4; k++) {
    const fr = (phase + k / 4) % 1;
    const y = wfTop + fr * (wfBot - wfTop);
    ctx.strokeStyle = `rgba(168,196,255,${0.22 + 0.5 * (1 - fr)})`;
    ctx.beginPath(); ctx.moveTo(wl, y); ctx.lineTo(wr, y); ctx.stroke();
  }
  ctx.fillStyle = LIGHT; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.inLight, cx, wfTop + 2);
  // short arrows into each dish
  [xL, xR].forEach((x) => {
    ctx.strokeStyle = LIGHT; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(x, wfBot); ctx.lineTo(x, dishTop - 2); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, dishTop - 2); ctx.lineTo(x - 3, dishTop - 9); ctx.lineTo(x + 3, dishTop - 9);
    ctx.closePath(); ctx.fillStyle = LIGHT; ctx.fill();
  });

  // the "virtual dish": a dashed bowl spanning the whole baseline
  ctx.strokeStyle = "rgba(201,139,255,0.75)"; ctx.lineWidth = 1.8;
  ctx.setLineDash([5, 4]);
  ctx.beginPath();
  ctx.moveTo(xL, dishTop); ctx.quadraticCurveTo(cx, dishTop + 40, xR, dishTop);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = C.violet; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.virtualL, cx, dishTop + 34);

  // the two real dishes
  drawDish(ctx, xL, gy, C.cool);
  drawDish(ctx, xR, gy, C.cool);

  // ground line
  ctx.strokeStyle = "rgba(120,150,210,0.4)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(16, gy); ctx.lineTo(cw - 16, gy); ctx.stroke();

  // baseline measure between the dishes
  ctx.strokeStyle = C.sun; ctx.lineWidth = 1.3;
  const by = gy + 16;
  ctx.beginPath(); ctx.moveTo(xL, gy); ctx.lineTo(xL, by + 4);
  ctx.moveTo(xR, gy); ctx.lineTo(xR, by + 4);
  ctx.moveTo(xL, by); ctx.lineTo(xR, by); ctx.stroke();
  ctx.fillStyle = C.sun; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  const baseKm = lerp(B_MIN_KM, B_MAX_KM, frac);
  ctx.fillText(`${t.baselineL} = ${baseKm.toFixed(baseKm < 1 ? 2 : 1)} ${t.km}`, cx, by + 16);

  // cables from each dish to a central correlator + combine symbol
  const corrY = H - 20;
  ctx.strokeStyle = "rgba(95,232,155,0.55)"; ctx.lineWidth = 1.6;
  [xL, xR].forEach((x) => {
    ctx.beginPath();
    ctx.moveTo(x, gy + 1);
    ctx.quadraticCurveTo(x, corrY, cx, corrY);
    ctx.stroke();
  });
  ctx.fillStyle = "rgba(8,12,26,0.9)"; ctx.strokeStyle = C.good; ctx.lineWidth = 1.6;
  ctx.beginPath(); ctx.arc(cx, corrY, 9, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = C.good; ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(cx - 5, corrY); ctx.lineTo(cx + 5, corrY);
  ctx.moveTo(cx, corrY - 5); ctx.lineTo(cx, corrY + 5);
  ctx.stroke();
  ctx.fillStyle = C.good; ctx.font = `11px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(t.combineL, cx + 16, corrY + 4);
}

/* --- second canvas: the resulting image, sharpening as baseline grows --- */
function drawResolved(ctx, w, h, frac, lang) {
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2, cy = h / 2 + 4;
  const baseM = lerp(B_MIN_KM, B_MAX_KM, frac) * 1000;
  const res = (1.22 * LAMBDA_M / baseM) * 206265;       // arcsec
  const resMax = (1.22 * LAMBDA_M / (B_MIN_KM * 1000)) * 206265;
  const resMin = (1.22 * LAMBDA_M / (B_MAX_KM * 1000)) * 206265;
  const blurR = clamp(4 + (res - resMin) / (resMax - resMin) * 34, 4, 38);

  const sepPx = 30;                                     // fixed source separation
  const sources = [cx - sepPx / 2, cx + sepPx / 2];
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  sources.forEach((sx) => {
    const g = ctx.createRadialGradient(sx, cy, 0.5, sx, cy, blurR);
    g.addColorStop(0, "rgba(255,255,255,0.95)");
    g.addColorStop(0.4, "rgba(200,220,255,0.5)");
    g.addColorStop(1, "rgba(200,220,255,0)");
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(sx, cy, blurR, 0, Math.PI * 2); ctx.fill();
  });
  ctx.restore();

  // crisp cores once resolution beats the source separation
  const resolved = blurR < sepPx * 0.5;
  if (resolved) {
    ctx.fillStyle = "#fff";
    sources.forEach((sx) => {
      ctx.beginPath(); ctx.arc(sx, cy, 2, 0, Math.PI * 2); ctx.fill();
    });
  }

  // tiny truth markers (where the two sources really are)
  ctx.strokeStyle = "rgba(255,210,61,0.5)"; ctx.lineWidth = 1;
  sources.forEach((sx) => {
    ctx.beginPath(); ctx.moveTo(sx, cy + blurR + 8); ctx.lineTo(sx, cy + blurR + 14); ctx.stroke();
  });
}

export function Interferometry() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 300;
  const arrRef = useRef(null);
  const imgRef = useRef(null);
  const [frac, setFrac] = useState(0.28);
  const cw = Math.min(w, 760);

  // main animated diagram
  useEffect(() => {
    const c = arrRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { drawArray(ctx, cw, H, frac, lang, 0.5); return; }
    let raf, tt = 0;
    const loop = () => {
      tt += 0.006;
      drawArray(ctx, cw, H, frac, lang, tt % 1);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, frac, lang]);

  // resulting-image canvas
  useEffect(() => {
    const c = imgRef.current;
    if (!c) return;
    const iw = Math.min(cw, 220), ih = 150;
    const ctx = setupCanvas(c, iw, ih);
    drawResolved(ctx, iw, ih, frac, lang);
  }, [cw, frac, lang]);

  // readouts
  const baseKm = lerp(B_MIN_KM, B_MAX_KM, frac);
  const baseM = baseKm * 1000;
  const res = (1.22 * LAMBDA_M / baseM) * 206265;
  const mult = Math.round(baseM / 100);
  const resolved = res < 8;

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

        <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginBottom: 2 }}>{t.pick}</div>
        <input type="range" min={0} max={1} step={0.01} value={frac}
          onChange={(e) => setFrac(parseFloat(e.target.value))} style={styles.range} />
        <div style={styles.rangeEnds}>
          <span>{B_MIN_KM} {t.km}</span>
          <span>{B_MAX_KM} {t.km}</span>
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={arrRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        {/* resulting image + readouts */}
        <div style={{ marginTop: 14, display: "flex", gap: 14, flexWrap: "wrap", alignItems: "stretch" }}>
          <div style={{ flex: "0 0 auto", border: `1px solid ${C.border}`, borderRadius: 12, background: "rgba(3,5,12,0.6)", padding: 8 }}>
            <div style={{ fontFamily: mono, fontSize: 11.5, letterSpacing: 1, color: C.faint, marginBottom: 4, textAlign: "center" }}>{t.seeL}</div>
            <canvas ref={imgRef} style={{ display: "block", borderRadius: 8, background: "rgba(3,5,12,0.6)" }} />
            <div style={{ fontFamily: mono, fontSize: 11.5, color: resolved ? C.good : C.danger, marginTop: 4, textAlign: "center", maxWidth: 220 }}>
              {resolved ? t.resolved : t.blurred}
            </div>
          </div>

          <div style={{ flex: "1 1 220px", minWidth: 200, border: `1px solid ${C.border}`, borderRadius: 12, background: "rgba(8,12,26,0.6)", padding: "12px 16px" }}>
            <Read k={t.rBaseline} v={`${baseKm.toFixed(baseKm < 1 ? 2 : 1)} ${t.km}`} col={C.sun} />
            <Read k={t.rAperture} v={`≈ ${baseKm.toFixed(baseKm < 1 ? 2 : 1)} ${t.km}`} col={C.violet} />
            <Read k={t.rRes} v={`${res.toFixed(res < 10 ? 2 : 0)} ${t.arcsec}`} col={C.cool} />
            <Read k={t.rSharp} v={`×${mult}`} col={C.good} sub={t.sharpNote} last />
            {/* sharpness bar */}
            <div style={{ height: 8, borderRadius: 5, background: "rgba(120,150,210,0.18)", overflow: "hidden", marginTop: 10 }}>
              <div style={{ height: "100%", width: `${frac * 100}%`, background: `linear-gradient(90deg, ${C.cool}, ${C.good})`, borderRadius: 5, transition: "width 0.1s" }} />
            </div>
            <div style={{ fontFamily: mono, fontSize: 11.5, color: C.faint, marginTop: 6 }}>{t.finer}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* small labelled readout row */
function Read({ k, v, col, sub, last }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10, padding: "5px 0", borderBottom: last ? "none" : "1px solid rgba(120,150,210,0.1)" }}>
      <span style={{ fontFamily: mono, fontSize: 12.5, color: C.faint }}>{k}{sub ? <span style={{ color: C.faint, opacity: 0.7 }}> · {sub}</span> : null}</span>
      <span style={{ fontFamily: mono, fontSize: 14.5, color: col, whiteSpace: "nowrap" }}>{v}</span>
    </div>
  );
}

export default Interferometry;
