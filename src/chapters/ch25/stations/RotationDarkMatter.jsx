/* ============================================================
   STATION 5 — ROTATION & DARK MATTER
   Differential rotation (inner stars orbit faster, Kepler) and the Sun's
   ~225-Myr galactic year (~200 km/s). The ROTATION CURVE: the expected
   Keplerian decline (from visible light) vs the observed FLAT curve staying
   high at large radius — the signature of a massive DARK-MATTER HALO (up to
   ~95% of the mass). A FLAT ROTATION CURVE → A 95% DARK-MATTER HALO.
   Grounded in Ch.25.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Rotation & dark matter",
    kind: "A flat curve betrays the invisible",
    lede: "Watch inner stars outrun the outer ones — differential rotation. The Sun takes about 225 million years for one lap at ~200 km/s. Then plot the rotation curve: visible matter alone predicts a falling curve, but the real one stays flat — the fingerprint of a dark-matter halo.",
    thread: "WEIGHING THE UNSEEN",
    threadText: "The way the Galaxy spins is a scale. Measure how fast gas and stars orbit at every radius, and the Galaxy tells you how much mass it holds — including mass that gives off no light at all.",
    key: "A FLAT ROTATION CURVE → A 95% DARK-MATTER HALO",
    keyText: "The disk does not spin as a rigid wheel. Inner stars orbit faster than outer ones, obeying a Kepler-like law — this is DIFFERENTIAL ROTATION. The Sun, about 26,000 ly out, cruises at roughly 200 km/s and completes one orbit — a GALACTIC YEAR — in about 225 million years. Now measure the orbital speed at every radius to build the ROTATION CURVE. If the Galaxy's mass followed its visible light, speeds should DECLINE beyond the bright disk, just as planets slow with distance from the Sun (a Keplerian fall). Instead the measured curve stays FLAT — orbital speeds remain high far past the visible edge. The only explanation is a huge, invisible halo of DARK MATTER whose gravity keeps the outskirts whipping around. Rotation curves imply dark matter makes up as much as 95% of the Milky Way's total mass.",
    predicted: "Visible-mass prediction",
    observed: "Observed",
    spin: "Differential spin",
    curve: "Rotation curve",
    radiusAx: "radius →",
    speedAx: "orbital speed",
    sunDot: "Sun",
    keplerLabel: "Keplerian decline (visible only)",
    flatLabel: "observed: stays flat → dark matter",
    innerFast: "inner stars orbit faster",
    galYear: "Sun: ~200 km/s · galactic year ~225 Myr",
    note: "Inner stars orbit faster (differential rotation); the Sun laps the Galaxy in ~225 Myr. Visible mass predicts a Keplerian decline, but the observed rotation curve stays flat — revealing a dark-matter halo that is up to ~95% of the Galaxy's mass.",
  },
  ja: {
    title: "回転とダークマター",
    kind: "平らな曲線が見えないものを暴く",
    lede: "内側の星が外側を追い抜くのを見よう——差動回転です。太陽は約200km/sで一周に約2億2,500万年かかります。次に回転曲線を描こう：見える物質だけなら曲線は下がるはずなのに、本物は平らなまま——ダークマターハローの指紋です。",
    thread: "見えないものを量る",
    threadText: "銀河の回り方は、ひとつの天秤です。ガスと星があらゆる半径でどれほど速くめぐるかを測れば、銀河はどれだけの質量をもつかを教えてくれます——光をまったく出さない質量も含めて。",
    key: "平らな回転曲線 → 95%のダークマターハロー",
    keyText: "円盤は固い車輪のようには回りません。内側の星は外側より速くめぐり、ケプラーのような法則に従います——これが差動回転です。約2万6千光年外側の太陽は、およそ200km/sで進み、一周——銀河年——に約2億2,500万年かかります。さて、あらゆる半径で軌道速度を測って回転曲線を作りましょう。もし銀河の質量が見える光に従うなら、明るい円盤の外側では、太陽から遠い惑星が遅くなるのと同じように速度は下がるはずです（ケプラー的な低下）。ところが測定された曲線は平らなまま——軌道速度は見える縁をはるかに越えても高いままです。唯一の説明は、その重力で外縁を回し続ける巨大で見えないダークマターのハローです。回転曲線は、ダークマターが天の川の全質量の最大95%を占めることを示唆します。",
    predicted: "見える質量の予想",
    observed: "観測",
    spin: "差動回転",
    curve: "回転曲線",
    radiusAx: "半径 →",
    speedAx: "軌道速度",
    sunDot: "太陽",
    keplerLabel: "ケプラー的低下（見える質量のみ）",
    flatLabel: "観測：平らなまま → ダークマター",
    innerFast: "内側の星ほど速くめぐる",
    galYear: "太陽：約200km/s・銀河年 約2億2,500万年",
    note: "内側の星ほど速くめぐり（差動回転）、太陽は約2億2,500万年で銀河を一周します。見える質量はケプラー的低下を予想しますが、観測された回転曲線は平らなまま——銀河の質量の最大約95%を占めるダークマターハローを明かします。",
  },
};

function drawSpin(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.5, cy = H * 0.5;
  const maxR = Math.min(cw * 0.42, H * 0.42);

  // faint disk
  const dg = ctx.createRadialGradient(cx, cy, 6, cx, cy, maxR);
  dg.addColorStop(0, "rgba(255,230,160,0.14)"); dg.addColorStop(1, "rgba(120,160,255,0)");
  ctx.fillStyle = dg; ctx.beginPath(); ctx.arc(cx, cy, maxR, 0, Math.PI * 2); ctx.fill();
  // bulge
  ctx.fillStyle = "#ffd23f"; ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();

  // orbiting stars at several radii — inner ones move faster (differential)
  const radii = [0.22, 0.4, 0.58, 0.76, 0.94];
  radii.forEach((rf, ri) => {
    const r = maxR * rf;
    // orbit ring
    ctx.strokeStyle = "rgba(150,180,240,0.18)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    // angular speed ~ 1/r (Kepler-ish differential); 3 stars per ring
    const omega = 0.9 / (rf + 0.25);
    for (let k = 0; k < 3; k++) {
      const ang = tt * 0.01 * omega + k * (Math.PI * 2 / 3) + ri;
      const x = cx + Math.cos(ang) * r, y = cy + Math.sin(ang) * r;
      const isSun = ri === 3 && k === 0;
      ctx.fillStyle = isSun ? C.sun : "#aecdff";
      ctx.beginPath(); ctx.arc(x, y, isSun ? 4 : 2.6, 0, Math.PI * 2); ctx.fill();
      if (isSun) {
        ctx.fillStyle = C.sun; ctx.font = `11px ${mono}`; ctx.textAlign = "left";
        ctx.fillText(t.sunDot, Math.min(x + 8, cw - 44), y + 4);
      }
    }
  });

  ctx.fillStyle = C.cool; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.innerFast, cw / 2, 18);
  ctx.fillStyle = C.faint;
  ctx.fillText(t.galYear, cw / 2, H - 12);
}

function drawCurve(ctx, cw, H, mode, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const padL = 46, padR = 20, padT = 24, padB = 40;
  const x0 = padL, x1 = cw - padR, y0 = H - padB, y1 = padT;
  const plotW = x1 - x0, plotH = y0 - y1;

  // axes
  ctx.strokeStyle = "rgba(150,180,240,0.5)"; ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.moveTo(x0, y1); ctx.lineTo(x0, y0); ctx.lineTo(x1, y0); ctx.stroke();
  // axis labels
  ctx.fillStyle = C.muted; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.radiusAx, (x0 + x1) / 2, H - 12);
  ctx.save(); ctx.translate(14, (y0 + y1) / 2); ctx.rotate(-Math.PI / 2);
  ctx.textAlign = "center"; ctx.fillText(t.speedAx, 0, 0); ctx.restore();

  const X = (f) => x0 + plotW * f;
  const Y = (v) => y0 - plotH * clamp(v, 0, 1);

  // rise region (inner, both curves share): v rises ~ r until r≈0.2
  const riseTo = 0.2;
  const vRise = (f) => (f / riseTo) * 0.85;
  // Keplerian decline for visible-only
  const vKepler = (f) => 0.85 * Math.sqrt(riseTo / f);
  // observed flat
  const vFlat = (f) => 0.85;

  const plotLine = (fn, col, dash) => {
    ctx.strokeStyle = col; ctx.lineWidth = 2.4; ctx.setLineDash(dash || []);
    ctx.beginPath(); let first = true;
    for (let f = 0.02; f <= 1.0001; f += 0.01) {
      const v = f < riseTo ? vRise(f) : fn(f);
      const px = X(f), py = Y(v);
      if (first) { ctx.moveTo(px, py); first = false; } else ctx.lineTo(px, py);
    }
    ctx.stroke(); ctx.setLineDash([]);
  };

  if (mode === "predicted") {
    plotLine(vKepler, C.sun, [6, 5]);
    ctx.fillStyle = C.sun; ctx.font = `11px ${mono}`; ctx.textAlign = "right";
    ctx.fillText(t.keplerLabel, x1 - 4, Y(vKepler(1)) - 8 < y1 + 12 ? Y(vKepler(1)) + 16 : Y(vKepler(1)) - 8);
  } else {
    // show faint predicted for contrast, then bold observed
    plotLine(vKepler, "rgba(255,210,61,0.35)", [5, 5]);
    plotLine(vFlat, C.cool, []);
    ctx.fillStyle = C.cool; ctx.font = `11px ${mono}`; ctx.textAlign = "right";
    ctx.fillText(t.flatLabel, x1 - 4, Y(0.85) - 8);
  }

  // Sun marker at r≈0.5 on whichever curve is active
  const fSun = 0.5;
  const vSun = mode === "predicted" ? vKepler(fSun) : vFlat(fSun);
  const sx = X(fSun), sy = Y(vSun);
  const pulse = 0.5 + 0.5 * Math.sin(tt * 0.08);
  ctx.fillStyle = C.sun; ctx.beginPath(); ctx.arc(sx, sy, 4 + pulse, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.sun; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.sunDot, sx, sy - 10 < y1 + 10 ? sy + 18 : sy - 10);
}

export function RotationDarkMatter() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 300;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [tab, setTab] = useState("spin");
  const [mode, setMode] = useState("observed");
  const tabRef = useRef("spin"); tabRef.current = tab;
  const modeRef = useRef("observed"); modeRef.current = mode;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    const render = (tt) => {
      if (tabRef.current === "spin") drawSpin(ctx, cw, H, tt, lang);
      else drawCurve(ctx, cw, H, modeRef.current, tt, lang);
    };
    if (reduceMotion) { render(30); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; render(tt); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, tab, mode, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 05</div>
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

        <div style={styles.pickerRow}>
          <button onClick={() => setTab("spin")} style={{ ...styles.chip, ...(tab === "spin" ? styles.chipOn : {}) }}>{t.spin}</button>
          <button onClick={() => setTab("curve")} style={{ ...styles.chip, ...(tab === "curve" ? styles.chipOn : {}) }}>{t.curve}</button>
        </div>

        {tab === "curve" && (
          <div style={{ ...styles.pickerRow, marginTop: 8 }}>
            <button onClick={() => setMode("predicted")} style={{ ...styles.chip, ...(mode === "predicted" ? styles.chipOn : {}) }}>{t.predicted}</button>
            <button onClick={() => setMode("observed")} style={{ ...styles.chip, ...(mode === "observed" ? styles.chipOn : {}) }}>{t.observed}</button>
          </div>
        )}

        <div style={{ marginTop: 10 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default RotationDarkMatter;
