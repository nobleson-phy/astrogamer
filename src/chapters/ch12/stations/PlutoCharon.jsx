/* ============================================================
   STATION 8 — PLUTO & CHARON
   Discovered by Clyde Tombaugh in 1930, Pluto is now classed a DWARF
   PLANET — it orbits the Sun and is round, but has NOT cleared its
   orbital neighborhood of other Kuiper Belt objects. New Horizons
   (2015) revealed Sputnik Planitia, a vast young nitrogen-ice glacier
   whose crater-free surface and slow convection show it is
   geologically active. Pluto and its big moon Charon are mutually tidally
   locked: each keeps one face permanently toward the other, so Charon
   hangs fixed in Pluto's sky. Grounded in Ch.12 §12.5.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Pluto & Charon",
    kind: "A dwarf planet and its twin",
    lede: "New Horizons flew past Pluto in 2015 and found a living world with a heart-shaped glacier. Switch views to meet Sputnik Planitia and the locked dance of Pluto and Charon.",
    thread: "THE STORY ENDS HERE",
    threadText: "At the far edge of the planets waits Pluto — found in 1930, reclassified as a dwarf planet in 2006, and revealed in 2015 to be no dead rock but an active, icy world with a moon so large the two orbit like a pair.",
    key: "A DWARF PLANET WITH A YOUNG, ACTIVE HEART",
    keyText: "Clyde Tombaugh discovered Pluto in 1930. It is now classed a DWARF PLANET: it orbits the Sun and is round, but unlike a full planet it has NOT cleared its orbital neighborhood of the other icy Kuiper Belt objects that share its region. New Horizons (2015) revealed SPUTNIK PLANITIA, a vast heart-shaped glacier of nitrogen ice. Its complete lack of craters and its slow churning convection show the surface is young and geologically ACTIVE — astonishing for so cold and distant a world. Pluto and its large moon CHARON are mutually tidally locked, each keeping one face permanently toward the other, so Charon hangs fixed in one spot of Pluto's sky.",
    tab1: "Sputnik Planitia", tab2: "Pluto–Charon lock",
    sputnik: "Sputnik Planitia — no craters, convecting", disc: "Tombaugh, 1930 · dwarf planet",
    fixed: "Charon fixed in the sky", locked: "mutually tidally locked",
    note: "Pluto (Tombaugh, 1930) is a dwarf planet — round and Sun-orbiting, but it never cleared its neighborhood. New Horizons found young, convecting Sputnik Planitia, and Pluto and Charon are locked face-to-face.",
  },
  ja: {
    title: "冥王星とカロン",
    kind: "準惑星とその双子",
    lede: "ニューホライズンズは2015年に冥王星を通り過ぎ、ハート形の氷河をもつ生きた世界を見つけました。表示を切り替えて、スプートニク平原と、冥王星とカロンの固定された踊りに出会おう。",
    thread: "物語はここで終わる",
    threadText: "惑星の遠い果てに冥王星が待っています——1930年に発見され、2006年に準惑星に再分類され、2015年に、死んだ岩ではなく、二つが対のように回るほど大きな衛星をもつ、活動的な氷の世界であることが明かされました。",
    key: "若く活動的な心臓をもつ準惑星",
    keyText: "クライド・トンボーが1930年に冥王星を発見しました。今では準惑星に分類されます：太陽を公転し丸いのですが、本物の惑星と違って、その領域を共有する他の氷のカイパーベルト天体を軌道の近傍から一掃していません。ニューホライズンズ（2015年）は、窒素の氷の広大なハート形の氷河スプートニク平原を明かしました。クレーターが完全にないことと、ゆっくりかき混ぜる対流が、地表が若く地質的に活動的であることを示します——これほど冷たく遠い世界には驚くべきことです。冥王星と大きな衛星カロンは相互に潮汐固定されていて、それぞれが一方の面をつねに相手に向け、カロンは冥王星の空の一点に固定されて見えます。",
    tab1: "スプートニク平原", tab2: "冥王星–カロンの固定",
    sputnik: "スプートニク平原——クレーターなし・対流", disc: "トンボー, 1930 · 準惑星",
    fixed: "カロンは空に固定", locked: "相互に潮汐固定",
    note: "冥王星（トンボー, 1930）は準惑星——丸く太陽を回りますが、近傍を一掃していません。ニューホライズンズは若く対流するスプートニク平原を見つけ、冥王星とカロンは向き合って固定されています。",
  },
};

// deterministic PRNG so the surface is fixed (no per-frame flicker)
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function drawPluto(ctx, cx, cy, pR) {
  // base globe: pale tan, shaded to a limb
  const g = ctx.createRadialGradient(cx - pR * 0.35, cy - pR * 0.35, pR * 0.15, cx, cy, pR);
  g.addColorStop(0, "#e6d4b4"); g.addColorStop(0.7, "#c9ad84"); g.addColorStop(1, "#8f7454");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, pR, 0, Math.PI * 2); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, pR, 0, Math.PI * 2); ctx.clip();
  const rnd = mulberry32(20150714); // New Horizons flyby date as a fixed seed
  // dark reddish equatorial band along the bottom-left (the "Cthulhu"-like macula)
  ctx.fillStyle = "rgba(74,50,38,0.55)";
  ctx.beginPath();
  ctx.ellipse(cx - pR * 0.4, cy + pR * 0.42, pR * 0.78, pR * 0.34, -0.25, 0, Math.PI * 2);
  ctx.fill();
  // scattered fixed mottling / craters (deterministic)
  for (let i = 0; i < 46; i++) {
    const a = rnd() * Math.PI * 2, rr = Math.sqrt(rnd()) * pR;
    const px = cx + Math.cos(a) * rr, py = cy + Math.sin(a) * rr;
    ctx.fillStyle = `rgba(90,66,48,${0.08 + rnd() * 0.16})`;
    ctx.beginPath(); ctx.arc(px, py, 2 + rnd() * 7, 0, Math.PI * 2); ctx.fill();
  }
  // heart-shaped Sputnik Planitia (bright, smooth nitrogen ice), lower-centre-right
  const hx = cx + pR * 0.26, hy = cy + pR * 0.14, hs = pR * 0.52;
  const hg = ctx.createRadialGradient(hx, hy - hs * 0.1, hs * 0.1, hx, hy, hs);
  hg.addColorStop(0, "#faf5e6"); hg.addColorStop(1, "#eadfc6");
  ctx.fillStyle = hg;
  ctx.beginPath();
  ctx.moveTo(hx, hy + hs * 0.8);
  ctx.bezierCurveTo(hx - hs * 1.05, hy - hs * 0.08, hx - hs * 0.52, hy - hs * 0.72, hx, hy - hs * 0.26);
  ctx.bezierCurveTo(hx + hs * 0.52, hy - hs * 0.72, hx + hs * 1.05, hy - hs * 0.08, hx, hy + hs * 0.8);
  ctx.closePath(); ctx.fill();
  // faint static convection-cell polygons inside the glacier
  ctx.strokeStyle = "rgba(150,145,128,0.35)"; ctx.lineWidth = 0.7;
  for (let i = 0; i < 6; i++) {
    const px = hx - hs * 0.45 + (i % 3) * hs * 0.42, py = hy - hs * 0.12 + Math.floor(i / 3) * hs * 0.34;
    ctx.beginPath(); ctx.arc(px, py, hs * 0.17, 0, Math.PI * 2); ctx.stroke();
  }
  // soft limb shading for roundness
  const lg = ctx.createRadialGradient(cx, cy, pR * 0.6, cx, cy, pR);
  lg.addColorStop(0, "rgba(0,0,0,0)"); lg.addColorStop(1, "rgba(0,0,0,0.35)");
  ctx.fillStyle = lg; ctx.beginPath(); ctx.arc(cx, cy, pR, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

function draw(ctx, cw, H, mode, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2;
  if (mode === "sputnik") {
    const pR = Math.min(cw * 0.26, H * 0.42);
    drawPluto(ctx, cx, cy, pR);
    ctx.fillStyle = C.sun; ctx.font = `10px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(t.sputnik, cx, cy + pR + 20);
    ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`;
    ctx.fillText(t.disc, cx, cy - pR - 8);
  } else {
    // Pluto & Charon orbiting a common barycenter (which lies outside Pluto)
    const bx = cx, by = cy;
    const pR = H * 0.14, chR = H * 0.075;
    // barycenter offset: Pluto closer, Charon farther (mass ratio ~8:1 -> distances inverse)
    const a = tt * 0.015;
    const pOrb = H * 0.11, cOrb = H * 0.11 * 8 / 8 * 1.9; // Charon farther from barycenter
    const px = bx + Math.cos(a + Math.PI) * pOrb, py = by + Math.sin(a + Math.PI) * pOrb * 0.5;
    const chx = bx + Math.cos(a) * cOrb, chy = by + Math.sin(a) * cOrb * 0.5;
    // orbit guides
    ctx.strokeStyle = "rgba(150,175,230,0.15)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.ellipse(bx, by, pOrb, pOrb * 0.5, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(bx, by, cOrb, cOrb * 0.5, 0, 0, Math.PI * 2); ctx.stroke();
    // barycenter marker
    ctx.fillStyle = "rgba(255,207,107,0.6)"; ctx.beginPath(); ctx.arc(bx, by, 2, 0, Math.PI * 2); ctx.fill();
    // Pluto
    const pg = ctx.createRadialGradient(px - pR * 0.3, py - pR * 0.3, pR * 0.2, px, py, pR);
    pg.addColorStop(0, "#d9c3a0"); pg.addColorStop(1, "#9a7f5e");
    ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(px, py, pR, 0, Math.PI * 2); ctx.fill();
    // tidal-lock marker on Pluto: a spot that always faces Charon
    const faceA = Math.atan2(chy - py, chx - px);
    ctx.fillStyle = "#6b4f38"; ctx.beginPath(); ctx.arc(px + Math.cos(faceA) * pR * 0.6, py + Math.sin(faceA) * pR * 0.6, 3, 0, Math.PI * 2); ctx.fill();
    // Charon
    const cg = ctx.createRadialGradient(chx - chR * 0.3, chy - chR * 0.3, chR * 0.2, chx, chy, chR);
    cg.addColorStop(0, "#cfd6dd"); cg.addColorStop(1, "#7d8890");
    ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(chx, chy, chR, 0, Math.PI * 2); ctx.fill();
    // Charon's locked face marker (always toward Pluto)
    const cfaceA = Math.atan2(py - chy, px - chx);
    ctx.fillStyle = "#4a5359"; ctx.beginPath(); ctx.arc(chx + Math.cos(cfaceA) * chR * 0.6, chy + Math.sin(cfaceA) * chR * 0.6, 2, 0, Math.PI * 2); ctx.fill();
    // connecting line: the fixed face-to-face axis
    ctx.strokeStyle = "rgba(255,207,107,0.35)"; ctx.setLineDash([3, 3]); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(chx, chy); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = C.text; ctx.font = `10px ${mono}`; ctx.textAlign = "center";
    ctx.fillText("Pluto", px, py + pR + 12);
    ctx.fillText("Charon", chx, chy + chR + 12);
    ctx.fillStyle = C.sun; ctx.fillText(t.locked, cx, H - 12);
  }
}

export function PlutoCharon() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("sputnik");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, mode, 20, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, mode, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, mode, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 08</div>
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
          {[["sputnik", t.tab1], ["lock", t.tab2]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default PlutoCharon;
