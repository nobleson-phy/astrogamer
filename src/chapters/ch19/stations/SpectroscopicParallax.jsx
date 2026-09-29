/* ============================================================
   STATION 6 — SPECTROSCOPIC PARALLAX
   For stars too far for trigonometric parallax, we use SPECTROSCOPIC
   PARALLAX: a star's spectrum gives its spectral type (temperature) AND
   its luminosity class (from line widths), which place it on the H-R
   diagram and reveal its true luminosity — then apparent brightness gives
   distance. Two G2 stars can look equally bright yet differ hugely: narrow
   lines mark a luminous supergiant, so it must be much farther away.
   Grounded in Ch.19 §19.4.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Spectroscopic parallax",
    kind: "Spectrum in, distance out",
    lede: "Two stars, same temperature, same apparent brightness. Their spectral line widths give them away — and reveal that one is vastly farther than the other.",
    thread: "THE STORY CONTINUES",
    threadText: "Parallax runs out beyond a few thousand light-years. But a star's spectrum is a fingerprint that betrays its true luminosity — and so, its distance.",
    key: "LINE WIDTHS → LUMINOSITY CLASS → DISTANCE",
    keyText: "Beyond the reach of trigonometric parallax, astronomers use SPECTROSCOPIC PARALLAX. A star's spectrum yields both its spectral type (temperature) and, from the width of its lines, its luminosity class. Together these place the star on the H-R diagram, giving its intrinsic luminosity; comparing that to apparent brightness gives the distance. Consider two G2 stars (same ~5,800 K) that look equally bright. The one with narrow lines has a low-density, extended atmosphere — a luminous supergiant (L ∝ R²T⁴). Since it is intrinsically far more luminous yet appears no brighter, it must lie much farther away.",
    dwarf: "Main-sequence G2", supergiant: "Supergiant G2",
    lines: "spectral lines", lum: "luminosity (from H-R)", dist: "distance (to look this bright)",
    dwarfLines: "broad lines → dense, main sequence", sgLines: "narrow lines → low-density supergiant",
    noteD: "Broad lines reveal a dense main-sequence star of modest luminosity — so at a given apparent brightness it is relatively nearby.",
    noteS: "Narrow lines reveal a low-density, highly luminous supergiant — so to look equally bright it must be far more distant.",
  },
  ja: {
    title: "分光視差",
    kind: "スペクトルを入れ、距離を出す",
    lede: "2つの星、同じ温度、同じ見かけの明るさ。スペクトル線の幅が正体を暴き——一方が他方よりはるかに遠いことを明かします。",
    thread: "物語はつづく",
    threadText: "視差は数千光年の先で尽きます。でも星のスペクトルは、その真の光度を——ゆえに距離を——暴く指紋です。",
    key: "線の幅 → 光度階級 → 距離",
    keyText: "三角視差の届く範囲を越えると、天文学者は分光視差を使います。星のスペクトルは、分光型（温度）と、線の幅から光度階級の両方を与えます。これらを合わせると星をH–R図に置け、固有光度が得られます。それを見かけの明るさと比べると距離がわかります。同じ約5,800 Kで同じくらい明るく見える2つのG2星を考えましょう。線が狭い方は低密度で広がった大気を持つ——明るい超巨星（L ∝ R²T⁴）です。本質的にはるかに明るいのに同じくらいにしか見えないので、はるかに遠くにあるはずです。",
    dwarf: "主系列 G2", supergiant: "超巨星 G2",
    lines: "スペクトル線", lum: "光度（H–Rから）", dist: "距離（この明るさに見えるため）",
    dwarfLines: "太い線 → 高密度・主系列", sgLines: "細い線 → 低密度の超巨星",
    noteD: "太い線は高密度でほどほどの光度の主系列星を明かします——同じ見かけの明るさなら比較的近くにあります。",
    noteS: "細い線は低密度で非常に明るい超巨星を明かします——同じくらい明るく見えるには、はるかに遠いはずです。",
  },
};

function draw(ctx, cw, H, isSG, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // spectrum band (top) with line widths
  const bx = 30, bw = cw - 60, by = 24, bh = 26;
  const grad = ctx.createLinearGradient(bx, 0, bx + bw, 0); grad.addColorStop(0, "#6a3fff"); grad.addColorStop(0.5, "#8fe08f"); grad.addColorStop(1, "#ff5a5a");
  ctx.fillStyle = grad; ctx.fillRect(bx, by, bw, bh);
  const lw = isSG ? 1.5 : 7;
  ctx.strokeStyle = "rgba(10,10,20,0.85)"; ctx.lineWidth = lw;
  [0.3, 0.45, 0.6].forEach((f) => { ctx.beginPath(); ctx.moveTo(bx + f * bw, by); ctx.lineTo(bx + f * bw, by + bh); ctx.stroke(); });
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "left"; ctx.fillText(isSG ? t.sgLines : t.dwarfLines, bx, by - 6);
  // mini H-R with the star's spot
  const gx0 = cw * 0.1, gx1 = cw * 0.6, gy0 = by + bh + 20, gy1 = H - 30;
  ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx0, gy0); ctx.lineTo(gx0, gy1); ctx.lineTo(gx1, gy1); ctx.stroke();
  ctx.fillStyle = C.faint; ctx.font = `8px ${mono}`; ctx.textAlign = "center"; ctx.fillText("H-R", (gx0 + gx1) / 2, gy0 - 4);
  // main sequence diagonal
  ctx.strokeStyle = "rgba(255,207,107,0.25)"; ctx.lineWidth = 8; ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(gx1 - 8, gy0 + 8); ctx.lineTo(gx0 + 8, gy1 - 8); ctx.stroke(); ctx.lineCap = "butt";
  // both stars are G2 -> same x (temperature). dwarf on MS (low), SG high.
  const starX = gx0 + 0.55 * (gx1 - gx0);
  const dwarfY = gy1 - 0.35 * (gy1 - gy0), sgY = gy0 + 0.12 * (gy1 - gy0);
  ctx.fillStyle = "#fff4e8"; ctx.globalAlpha = isSG ? 0.3 : 1; ctx.beginPath(); ctx.arc(starX, dwarfY, 5, 0, Math.PI * 2); ctx.fill();
  ctx.globalAlpha = isSG ? 1 : 0.3; ctx.fillStyle = "#ffd88a"; ctx.beginPath(); ctx.arc(starX, sgY, 6, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1;
  ctx.fillStyle = C.muted; ctx.font = `8px ${mono}`; ctx.textAlign = "left"; ctx.fillText(t.dwarf, starX + 8, dwarfY + 3); ctx.fillText(t.supergiant, starX + 8, sgY + 3);
  // readouts (right)
  const rx = cw * 0.66;
  ctx.textAlign = "left"; ctx.font = `11px ${mono}`;
  ctx.fillStyle = C.text; ctx.fillText(`${t.lum}:`, rx, gy0 + 24);
  ctx.fillStyle = C.sun; ctx.font = `700 14px ${mono}`; ctx.fillText(isSG ? "~10,000 L☉" : "~1 L☉", rx, gy0 + 44);
  ctx.fillStyle = C.text; ctx.font = `11px ${mono}`; ctx.fillText(`${t.dist}:`, rx, gy0 + 70);
  ctx.fillStyle = "#8fe0a0"; ctx.font = `700 14px ${mono}`; ctx.fillText(isSG ? "very far" : "nearby", rx, gy0 + 90);
}

export function SpectroscopicParallax() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("dwarf");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, mode === "sg", lang);
  }, [cw, mode, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 06</div>
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
          {[["dwarf", t.dwarf], ["sg", t.supergiant]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{mode === "sg" ? t.noteS : t.noteD}</p>
      </div>
    </div>
  );
}

export default SpectroscopicParallax;
