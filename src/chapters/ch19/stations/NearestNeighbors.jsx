/* ============================================================
   STATION 3 — NEAREST NEIGHBORS & GAIA
   The nearest star system is Alpha Centauri (~4.2-4.4 ly); its faint red
   dwarf Proxima Centauri is the single closest star at 4.25 ly. Parallax
   is tiny even for these, so precision matters. ESA's Gaia (launched 2013,
   after Hipparcos) measures parallaxes for over a billion stars — far more
   precisely than ground telescopes, because orbiting above the atmosphere
   eliminates the blurring of "seeing." Grounded in Ch.19 §19.2-19.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const NEAR = [
  { en: "Proxima Centauri", ja: "プロキシマ・ケンタウリ", ly: 4.25, col: "#e0603a", note_en: "closest star · red dwarf", note_ja: "最も近い星・赤色矮星" },
  { en: "Alpha Centauri A & B", ja: "ケンタウルス座アルファ星 A・B", ly: 4.37, col: "#ffe08a", note_en: "nearest star system", note_ja: "最も近い恒星系" },
  { en: "Barnard's Star", ja: "バーナード星", ly: 5.96, col: "#c9503a", note_en: "fast-moving red dwarf", note_ja: "速く動く赤色矮星" },
  { en: "Sirius", ja: "シリウス", ly: 8.6, col: "#dfe6ff", note_en: "brightest night-sky star", note_ja: "夜空で最も明るい星" },
];

const STR = {
  en: {
    title: "Nearest neighbors & Gaia",
    kind: "Close stars, tiny angles",
    lede: "Meet the Sun's closest neighbors — then see why measuring their parallax needs a telescope in space.",
    thread: "THE STORY CONTINUES",
    threadText: "Even the very nearest stars are trillions of kilometers away, so their parallaxes are minuscule. Catching those tiny shifts drove astronomers off the planet entirely.",
    neighKey: "ALPHA CENTAURI IS NEAREST; PROXIMA IS CLOSEST",
    neighText: "The nearest star system to the Sun is Alpha Centauri, about 4.2-4.4 light-years away. Within it, a faint red dwarf, Proxima Centauri, is the single closest known star to Earth at 4.25 light-years — slightly nearer than its bright companions Alpha Centauri A and B.",
    gaiaKey: "GAIA — PARALLAXES FROM ABOVE THE ATMOSPHERE",
    gaiaText: "Parallax angles are tiny even for the nearest stars, so precision is everything. ESA's Gaia mission (launched 2013, the successor to Hipparcos) measured high-precision positions and parallaxes for over a billion stars. Space telescopes like Gaia are hundreds to thousands of times more precise than ground telescopes because, orbiting above Earth's atmosphere, they escape the image-blurring turbulence known as 'seeing.'",
    neigh: "Nearest stars", gaia: "Gaia vs ground",
    ground: "ground: atmosphere blurs → large error", space: "Gaia (above atmosphere): sharp → tiny error",
    noteN: "Alpha Centauri is the nearest system (~4.4 ly); its red dwarf Proxima Centauri is the closest single star at 4.25 ly.",
    noteG: "Gaia (2013) measured parallaxes for over a billion stars far more precisely than ground telescopes — because above the atmosphere there is no blurring 'seeing.'",
  },
  ja: {
    title: "最も近い隣人とガイア",
    kind: "近い星、小さな角度",
    lede: "太陽の最も近い隣人たちに出会おう——そして、その視差を測るのになぜ宇宙の望遠鏡が必要かを見よう。",
    thread: "物語はつづく",
    threadText: "最も近い星でさえ数兆kmの彼方なので、視差は極めて小さい。その微小なずれを捉えるために、天文学者はついに地球を離れました。",
    neighKey: "アルファ・ケンタウリが最も近い系、プロキシマが最も近い星",
    neighText: "太陽に最も近い恒星系はケンタウルス座アルファ星で、約4.2〜4.4光年の距離です。その中の暗い赤色矮星プロキシマ・ケンタウリが、4.25光年で地球に最も近い1つの星です——明るい伴星のアルファ星A・Bよりわずかに近いのです。",
    gaiaKey: "ガイア——大気の上からの視差",
    gaiaText: "視差の角度は最も近い星でさえ微小なので、精度がすべてです。ESAのガイア・ミッション（2013年打ち上げ、ヒッパルコスの後継）は、10億を超える星の高精度な位置と視差を測りました。ガイアのような宇宙望遠鏡は地上望遠鏡より数百〜数千倍精密です。大気の上を周回することで、「シーイング」と呼ばれる像をぼかす乱れを逃れるからです。",
    neigh: "最も近い星", gaia: "ガイア対地上",
    ground: "地上：大気がぼかす → 大きな誤差", space: "ガイア（大気の上）：鮮明 → 小さな誤差",
    noteN: "アルファ・ケンタウリが最も近い系（約4.4光年）。その赤色矮星プロキシマ・ケンタウリが4.25光年で最も近い1つの星です。",
    noteG: "ガイア（2013年）は10億を超える星の視差を地上望遠鏡よりはるかに精密に測りました——大気の上ではぼかす「シーイング」がないからです。",
  },
};

function drawNeigh(ctx, cw, H, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // Sun at left, stars placed by distance
  const sx = 30, sy = H / 2;
  ctx.fillStyle = "#ffd86b"; ctx.beginPath(); ctx.arc(sx, sy, 9, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText("Sun", sx, sy + 20);
  const x0 = 60, x1 = cw - 20, maxLy = 9.5;
  NEAR.forEach((s, i) => {
    const x = x0 + (s.ly / maxLy) * (x1 - x0);
    const y = sy - 40 + i * 26;
    ctx.strokeStyle = "rgba(150,175,230,0.15)"; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(x, y); ctx.stroke();
    ctx.fillStyle = s.col; ctx.beginPath(); ctx.arc(x, y, i === 0 ? 6 : 5, 0, Math.PI * 2); ctx.fill();
    if (i === 0) { ctx.strokeStyle = s.col; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.stroke(); }
    ctx.fillStyle = C.text; ctx.font = `10px ${mono}`; ctx.textAlign = "left";
    ctx.fillText(`${lang === "ja" ? s.ja : s.en}  ·  ${s.ly} ly`, x + 12, y + 3);
  });
}

function drawGaia(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const wob = Math.sin(tt * 0.08) * 3;
  // ground (left): atmosphere layer, blurry star, big error bar
  const gx = cw * 0.28, gy = H * 0.42;
  ctx.fillStyle = "rgba(80,120,180,0.15)"; ctx.fillRect(gx - 60, gy - 30, 120, 60); // atmosphere
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(lang === "ja" ? "大気" : "atmosphere", gx, gy - 34);
  const bg = ctx.createRadialGradient(gx + wob, gy, 1, gx + wob, gy, 14); bg.addColorStop(0, "rgba(255,240,200,0.8)"); bg.addColorStop(1, "rgba(255,220,150,0)");
  ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(gx + wob, gy, 14, 0, Math.PI * 2); ctx.fill();
  // big error bar
  ctx.strokeStyle = C.bad; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx - 22, gy + 30); ctx.lineTo(gx + 22, gy + 30); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(gx - 22, gy + 26); ctx.lineTo(gx - 22, gy + 34); ctx.moveTo(gx + 22, gy + 26); ctx.lineTo(gx + 22, gy + 34); ctx.stroke();
  ctx.fillStyle = C.bad; ctx.font = `10px ${mono}`; ctx.fillText(t.ground, gx, gy + 50);
  // space (right): sharp star, tiny error bar
  const px = cw * 0.72, py = gy;
  ctx.fillStyle = "#ffe8b0"; ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = C.good; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px - 4, py + 30); ctx.lineTo(px + 4, py + 30); ctx.stroke();
  ctx.fillStyle = C.good; ctx.fillText(t.space, px, py + 50);
  // Gaia satellite icon
  ctx.fillStyle = "#c9c2b4"; ctx.fillRect(px - 6, py - 40, 12, 8); ctx.fillStyle = "#8fb8d8"; ctx.fillRect(px - 14, py - 39, 6, 6); ctx.fillRect(px + 8, py - 39, 6, 6);
  ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(px, py - 32); ctx.lineTo(px, py - 4); ctx.stroke(); ctx.setLineDash([]);
}

export function NearestNeighbors() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 240;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("neigh");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (mode === "neigh") { drawNeigh(ctx, cw, H, lang); return; }
    if (reduceMotion) { drawGaia(ctx, cw, H, 20, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; drawGaia(ctx, cw, H, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, mode, lang]);

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
          <div style={{ ...styles.fateLabel, color: C.sun }}>{mode === "neigh" ? t.neighKey : t.gaiaKey}</div>
          <p style={styles.keyTermText}>{mode === "neigh" ? t.neighText : t.gaiaText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          {[["neigh", t.neigh], ["gaia", t.gaia]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{mode === "neigh" ? t.noteN : t.noteG}</p>
      </div>
    </div>
  );
}

export default NearestNeighbors;
