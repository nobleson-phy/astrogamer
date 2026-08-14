/* ============================================================
   STATION 5 — BLACKBODY & TEMPERATURE
   A blackbody is an idealized object that absorbs ALL radiation
   falling on it and re-emits a characteristic thermal spectrum set
   only by its temperature. Wien's law: the hotter the body, the
   SHORTER its peak wavelength (the peak shifts toward blue). Stefan–
   Boltzmann law: the total energy radiated per unit area rises as T⁴,
   so a small rise in temperature means a huge jump in energy. A blue
   star is hotter than a red star.
   Grounded in Ch.5 §5.4.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp, lerp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Blackbody & temperature",
    kind: "The colour of heat — Wien's law & Stefan–Boltzmann",
    lede: "Heat any dense object and it glows: cool iron a dull red, hotter a brilliant white-blue. A star does the same. Drag the temperature and watch the glow curve reshape — its peak climbs and slides toward the blue as the star heats up.",
    thread: "THE STORY CONTINUES",
    threadText: "We have learned that light is a wave, a spectrum, a stream of photons that dims with distance. Now we ask what light itself can tell us. The first message a star sends is written in its colour — and colour, it turns out, is simply the temperature of heat made visible.",
    key: "HOTTER MEANS BLUER — AND FAR BRIGHTER",
    keyText: "A blackbody is an ideal absorber that re-emits a thermal spectrum fixed by its temperature alone. Wien's law says the peak wavelength shrinks as temperature rises, so a hot star peaks in the blue and a cool star in the red — a blue star is hotter than a red one. And by Stefan–Boltzmann the energy pouring out grows as T⁴: double the temperature and a patch of surface radiates sixteen times as much.",
    tempLabel: "Temperature",
    tempSet: "Drag the temperature (3,000 K → 30,000 K):",
    cool: "cool · red", hot: "hot · blue",
    peakL: "Peak wavelength (Wien)",
    fluxL: "Energy radiated (∝ T⁴)",
    colourL: "Star colour",
    visible: "visible light",
    intensity: "intensity", wavelength: "wavelength (nm)",
    peakMark: "peak",
    fluxNote: "Energy per unit area, relative to the Sun (≈5,800 K). Because flux grows as the fourth power of temperature, the numbers climb astonishingly fast.",
    classL: "Rough class",
  },
  ja: {
    title: "黒体と温度",
    kind: "熱の色——ウィーンの法則とシュテファン=ボルツマンの法則",
    lede: "密な物体を熱すると光ります。冷えた鉄は鈍い赤、もっと熱いと鮮やかな青白。星も同じです。温度を動かして輝きの曲線が変わる様子を見よう——星が熱くなるほど、そのピークは高くなり、青の方へずれていきます。",
    thread: "物語はつづく",
    threadText: "光が波であり、スペクトルであり、距離とともに暗くなる光子の流れであることを学びました。では次に、光そのものが何を語るのかを問おう。星が送る最初のメッセージは、その色に書かれています——そして色とは、じつは熱の温度が目に見えるようになったものなのです。",
    key: "熱いほど青く——そしてはるかに明るい",
    keyText: "黒体とは、あらゆる放射を吸収し、その温度だけで決まる熱的スペクトルを再放射する理想的な物体です。ウィーンの法則によれば、温度が上がるほどピーク波長は短くなります。だから熱い星は青でピークを迎え、冷たい星は赤でピークを迎えます——青い星は赤い星より熱いのです。そしてシュテファン=ボルツマンの法則により、放出されるエネルギーは T⁴ に比例して増えます。温度が2倍になれば、表面の一区画は16倍のエネルギーを放射します。",
    tempLabel: "温度",
    tempSet: "温度を動かそう（3,000 K → 30,000 K）：",
    cool: "冷たい・赤", hot: "熱い・青",
    peakL: "ピーク波長（ウィーン）",
    fluxL: "放射エネルギー（∝ T⁴）",
    colourL: "星の色",
    visible: "可視光",
    intensity: "強度", wavelength: "波長（nm）",
    peakMark: "ピーク",
    fluxNote: "単位面積あたりのエネルギーを、太陽（約5,800 K）を基準に示しています。フラックスは温度の4乗で増えるため、数値は驚くほど速く跳ね上がります。",
    classL: "おおよその分類",
  },
};

/* Planck's law shape (arbitrary units) — trend is exact, scale illustrative.
   B(λ,T) ∝ 1/λ^5 · 1/(exp(c2/(λT)) − 1),  c2 = hc/k ≈ 1.4388e7 nm·K       */
const C2 = 1.4388e7; // nm·K
function planck(lambdaNm, T) {
  const x = C2 / (lambdaNm * T);
  return 1 / (Math.pow(lambdaNm, 5) * (Math.exp(x) - 1));
}

/* wavelength (nm) → an approximate visible colour for the rainbow band */
function wlColour(nm) {
  let r = 0, g = 0, b = 0;
  if (nm < 440) { r = -(nm - 440) / (440 - 380); b = 1; }
  else if (nm < 490) { g = (nm - 440) / (490 - 440); b = 1; }
  else if (nm < 510) { g = 1; b = -(nm - 510) / (510 - 490); }
  else if (nm < 580) { r = (nm - 510) / (580 - 510); g = 1; }
  else if (nm < 645) { r = 1; g = -(nm - 645) / (645 - 580); }
  else { r = 1; }
  return `rgb(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)})`;
}

/* star tint from temperature: red → orange → yellow → white → blue-white */
function starColour(T) {
  const stops = [
    [3000, [255, 106, 61]],
    [4200, [255, 158, 78]],
    [5800, [255, 240, 205]],
    [7500, [255, 255, 255]],
    [11000, [205, 224, 255]],
    [30000, [157, 184, 255]],
  ];
  let a = stops[0], b = stops[stops.length - 1];
  for (let i = 0; i < stops.length - 1; i++) {
    if (T >= stops[i][0] && T <= stops[i + 1][0]) { a = stops[i]; b = stops[i + 1]; break; }
  }
  const f = clamp((T - a[0]) / (b[0] - a[0] || 1), 0, 1);
  const c = a[1].map((v, i) => Math.round(lerp(v, b[1][i], f)));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

/* rough spectral class letter for the current temperature */
function starClass(T) {
  if (T >= 25000) return "O";
  if (T >= 10000) return "B";
  if (T >= 7500) return "A";
  if (T >= 6000) return "F";
  if (T >= 5200) return "G";
  if (T >= 3700) return "K";
  return "M";
}

const LAM_MIN = 50, LAM_MAX = 1500; // nm shown on the axis

function drawCurve(ctx, cw, H, T, t) {
  ctx.clearRect(0, 0, cw, H);
  const padL = 44, padR = 12, padT = 14, padB = 30;
  const plotW = cw - padL - padR, plotH = H - padT - padB;
  const x0 = padL, y0 = H - padB;

  const xOf = (nm) => x0 + ((nm - LAM_MIN) / (LAM_MAX - LAM_MIN)) * plotW;

  // find the max intensity over the whole slider range so the axis is stable-ish,
  // but normalise to the current curve's own peak so it always fills the plot.
  let peakVal = 0, peakNm = LAM_MIN;
  for (let nm = LAM_MIN; nm <= LAM_MAX; nm += 2) {
    const v = planck(nm, T);
    if (v > peakVal) { peakVal = v; peakNm = nm; }
  }
  const yOf = (v) => y0 - (v / peakVal) * plotH * 0.92;

  // visible-light rainbow band (380–750 nm) shaded under the plot area
  for (let nm = 380; nm <= 750; nm += 3) {
    ctx.fillStyle = wlColour(nm);
    ctx.globalAlpha = 0.16;
    const xa = xOf(nm), xb = xOf(nm + 3);
    ctx.fillRect(xa, padT, xb - xa + 1, plotH);
  }
  ctx.globalAlpha = 1;

  // axes
  ctx.strokeStyle = "rgba(150,175,230,0.35)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(x0, padT); ctx.lineTo(x0, y0); ctx.lineTo(cw - padR, y0); ctx.stroke();

  // wavelength ticks
  ctx.fillStyle = C.faint; ctx.font = `10px ${mono}`; ctx.textAlign = "center";
  for (let nm = 250; nm <= 1500; nm += 250) {
    const x = xOf(nm);
    ctx.strokeStyle = "rgba(150,175,230,0.18)";
    ctx.beginPath(); ctx.moveTo(x, padT); ctx.lineTo(x, y0); ctx.stroke();
    ctx.fillStyle = C.faint; ctx.fillText(String(nm), x, y0 + 14);
  }

  // the blackbody curve, filled under
  const tint = starColour(T);
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  for (let nm = LAM_MIN; nm <= LAM_MAX; nm += 2) {
    ctx.lineTo(xOf(nm), yOf(planck(nm, T)));
  }
  ctx.lineTo(xOf(LAM_MAX), y0);
  ctx.closePath();
  const grad = ctx.createLinearGradient(0, padT, 0, y0);
  grad.addColorStop(0, tint.replace("rgb", "rgba").replace(")", ",0.34)"));
  grad.addColorStop(1, "rgba(3,5,12,0)");
  ctx.fillStyle = grad; ctx.fill();

  ctx.strokeStyle = tint; ctx.lineWidth = 2.4; ctx.shadowColor = tint; ctx.shadowBlur = 10;
  ctx.beginPath();
  for (let nm = LAM_MIN; nm <= LAM_MAX; nm += 2) {
    const x = xOf(nm), y = yOf(planck(nm, T));
    if (nm === LAM_MIN) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke(); ctx.shadowBlur = 0;

  // peak marker (Wien) — vertical dashed line at the true Planck peak
  const wienNm = 2.898e6 / T; // ~ peak wavelength (nm)
  const px = xOf(clamp(wienNm, LAM_MIN, LAM_MAX));
  ctx.strokeStyle = C.sun; ctx.lineWidth = 1.4; ctx.setLineDash([4, 4]);
  ctx.beginPath(); ctx.moveTo(px, padT); ctx.lineTo(px, y0); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = C.sun; ctx.beginPath(); ctx.arc(px, yOf(peakVal), 4, 0, Math.PI * 2); ctx.fill();
  ctx.textAlign = wienNm < 300 ? "left" : "center";
  ctx.fillText(t.peakMark, clamp(px, x0 + 4, cw - padR - 30), padT + 10);

  // y label
  ctx.save();
  ctx.translate(12, padT + plotH / 2); ctx.rotate(-Math.PI / 2);
  ctx.textAlign = "center"; ctx.fillStyle = C.faint; ctx.font = `10px ${mono}`;
  ctx.fillText(t.intensity, 0, 0);
  ctx.restore();
}

export function Blackbody() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 300;
  const canRef = useRef(null);
  const [T, setT] = useState(5800);
  const cw = Math.min(w, 760);

  const wienNm = Math.round(2.898e6 / T);          // Wien peak wavelength (nm)
  const flux = Math.pow(T / 5800, 4);               // relative to the Sun
  const fluxStr = flux >= 100 ? Math.round(flux).toLocaleString()
    : flux >= 10 ? flux.toFixed(0) : flux.toFixed(2);
  const tint = starColour(T);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    drawCurve(ctx, cw, H, T, t);
  }, [cw, T, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 05</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 12 }}>
          <span style={{ fontFamily: mono, fontSize: 30, color: C.sun }}>{T.toLocaleString()}</span>
          <span style={{ color: C.muted, fontSize: 15 }}>K · {t.tempLabel}</span>
        </div>
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

        <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginBottom: 2 }}>{t.tempSet}</div>
        <input type="range" min={3000} max={30000} step={100} value={T}
          onChange={(e) => setT(parseInt(e.target.value))} style={styles.range} />
        <div style={styles.rangeEnds}><span>{t.cool}</span><span>{t.hot}</span></div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>
        <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, marginTop: 6, textAlign: "center" }}>
          {t.wavelength} · <span style={{ color: C.muted }}>{t.visible}</span>
        </div>

        {/* readouts + colour swatch */}
        <div style={{ display: "flex", gap: 22, flexWrap: "wrap", marginTop: 14, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ ...styles.swatch, width: 44, height: 44, background: tint, boxShadow: `0 0 22px ${tint}, inset -4px -4px 8px rgba(0,0,0,0.35)` }} />
            <div>
              <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, letterSpacing: 1 }}>{t.colourL}</div>
              <div style={{ fontFamily: mono, fontSize: 15, color: C.text }}>{t.classL}: {starClass(T)}</div>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, letterSpacing: 1 }}>{t.peakL}</div>
            <div style={{ fontFamily: mono, fontSize: 22, color: C.sun }}>{wienNm.toLocaleString()}<span style={{ fontSize: 13, color: C.muted }}> nm</span></div>
          </div>
          <div>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, letterSpacing: 1 }}>{t.fluxL}</div>
            <div style={{ fontFamily: mono, fontSize: 22, color: C.cool }}>{fluxStr}<span style={{ fontSize: 13, color: C.muted }}> × ☉</span></div>
          </div>
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.fluxNote}</p>
      </div>
    </div>
  );
}

export default Blackbody;
