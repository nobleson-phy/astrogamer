/* ============================================================
   STATION 4 — THE INVERSE-SQUARE LAW
   Light spreads out as it travels. A star's apparent brightness falls
   off as 1 / distance²: the same light pours through an area that
   grows as the square of the distance. Double the distance and the
   light is spread over four times the area, so it looks 1/4 as bright.
   Ten times the distance ⇒ 1/100 the brightness.
   Grounded in Ch.5 §5.4.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The inverse-square law",
    kind: "Apparent brightness ∝ 1 / distance²",
    lede: "Move the detector away from the light. The same beam has to cover an ever-larger patch, so each piece of it grows fainter — and it fades as the square of the distance, not just the distance.",
    thread: "THE STORY CONTINUES",
    threadText: "We can read a star's light — its wavelength, its colours, its photons. But a distant star also looks faint, and we must know why before we can judge its true power. The answer is pure geometry: light spreads.",
    key: "WHY DISTANT STARS LOOK FAINT",
    keyText: "Light streaming from a source spreads over a sphere whose area grows as the square of the radius. So apparent brightness drops as 1/distance². Move twice as far and a star looks four times fainter; move ten times as far and it looks a hundred times fainter — even though the star itself has not dimmed at all.",
    dist: "Distance", bright: "Apparent brightness",
    slide: "Drag the distance (1× → 10×):",
    near: "1× (near)", far: "10× (far)",
    ofRef: "of the reference brightness",
    area: "Same light · area grows as d²",
    cell: "each patch of light",
  },
  ja: {
    title: "逆二乗の法則",
    kind: "見かけの明るさ ∝ 1 / 距離²",
    lede: "検出器を光から遠ざけてみよう。同じ光線がますます広い範囲を覆わねばならず、その一片一片は暗くなっていきます——しかも距離そのものではなく、距離の二乗で暗くなるのです。",
    thread: "物語はつづく",
    threadText: "私たちは星の光を読めます——波長も、色も、光子も。けれど遠い星は暗く見え、その本当の明るさを測る前に、なぜ暗いのかを知らねばなりません。答えは純粋な幾何学です——光は広がる。",
    key: "遠い星が暗く見える理由",
    keyText: "光源から流れ出る光は、半径の二乗に比例して面積が増える球面へと広がります。だから見かけの明るさは 1/距離² で減ります。二倍遠ざかれば星は四倍暗く見え、十倍遠ざかれば百倍暗く見えます——星そのものは少しも暗くなっていないのに。",
    dist: "距離", bright: "見かけの明るさ",
    slide: "距離を動かそう（1× → 10×）：",
    near: "1×（近い）", far: "10×（遠い）",
    ofRef: "基準の明るさに対して",
    area: "同じ光・面積は d² で増える",
    cell: "光の一片",
  },
};

function drawScene(ctx, cw, H, d) {
  ctx.clearRect(0, 0, cw, H);
  const sx = 42, cy = H / 2;

  // the light source
  const g = ctx.createRadialGradient(sx, cy, 2, sx, cy, 24);
  g.addColorStop(0, "#fff"); g.addColorStop(0.4, C.sun); g.addColorStop(1, "rgba(255,207,107,0)");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sx, cy, 24, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(sx, cy, 6, 0, Math.PI * 2); ctx.fill();

  // detector square: side ∝ d, slides right with d
  const baseSide = (H - 34) / 10;
  const side = clamp(baseSide * d, baseSide, H - 34);
  const track = Math.max(0, cw - sx - 60 - side);
  const leftEdge = sx + 40 + track * ((d - 1) / 9);
  const top = cy - side / 2;

  // cone from source to the illuminated face
  ctx.strokeStyle = "rgba(255,207,107,0.35)"; ctx.lineWidth = 1.4;
  ctx.beginPath(); ctx.moveTo(sx, cy); ctx.lineTo(leftEdge, top); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(sx, cy); ctx.lineTo(leftEdge, top + side); ctx.stroke();
  // faint fill of the cone
  ctx.fillStyle = "rgba(255,207,107,0.05)";
  ctx.beginPath(); ctx.moveTo(sx, cy); ctx.lineTo(leftEdge, top); ctx.lineTo(leftEdge, top + side); ctx.closePath(); ctx.fill();

  // grid of d×d cells, each dimmed to 1/d²
  const n = d;
  const cellW = side / n;
  const alpha = 1 / (d * d);
  for (let r = 0; r < n; r++) {
    for (let cc = 0; cc < n; cc++) {
      const cx = leftEdge + cc * cellW;
      const cyy = top + r * cellW;
      ctx.fillStyle = `rgba(255,210,61,${Math.max(alpha, 0.045)})`;
      ctx.fillRect(cx + 0.5, cyy + 0.5, cellW - 1, cellW - 1);
    }
  }
  // frame outline
  ctx.strokeStyle = C.borderBright; ctx.lineWidth = 1.4;
  ctx.strokeRect(leftEdge, top, side, side);

  // labels
  ctx.font = `12px ${mono}`; ctx.textAlign = "center";
  ctx.fillStyle = C.faint;
  ctx.fillText(`${d}×`, leftEdge + side / 2, top - 8);
  ctx.fillStyle = C.sun;
  ctx.fillText(`1/${d * d}`, leftEdge + side / 2, top + side + 16);
}

export function InverseSquare() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 300;
  const canRef = useRef(null);
  const [d, setD] = useState(2);
  const cw = Math.min(w, 760);

  const brightPct = 100 / (d * d);
  const pctStr = brightPct >= 10 ? brightPct.toFixed(1) : brightPct.toFixed(brightPct >= 1 ? 2 : 2);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    drawScene(ctx, cw, H, d);
  }, [cw, d, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 04</div>
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

        {/* big readouts */}
        <div style={{ display: "flex", gap: 26, flexWrap: "wrap", marginBottom: 10 }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, letterSpacing: 1 }}>{t.dist}</div>
            <div style={{ fontFamily: mono, fontSize: 26, color: C.cool }}>{d}×</div>
          </div>
          <div>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, letterSpacing: 1 }}>{t.bright}</div>
            <div style={{ fontFamily: mono, fontSize: 26, color: C.sun }}>
              1/{d * d}<span style={{ fontSize: 14, color: C.muted }}> = {pctStr}%</span>
            </div>
          </div>
        </div>

        <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, marginTop: 6, textAlign: "center" }}>{t.area}</div>

        <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginTop: 14 }}>{t.slide}</div>
        <input type="range" min={1} max={10} step={1} value={d}
          onChange={(e) => setD(parseInt(e.target.value, 10))} style={styles.range} />
        <div style={styles.rangeEnds}><span>{t.near}</span><span>{t.far}</span></div>

        {/* brightness meter */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14 }}>
          <span style={{ fontFamily: mono, fontSize: 13, color: C.muted, minWidth: 110 }}>{t.bright}</span>
          <div style={{ flex: 1, height: 14, background: "rgba(120,150,210,0.15)", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${clamp(brightPct, 1, 100)}%`, background: `linear-gradient(90deg, ${C.sunDeep}, ${C.sun})`, transition: "width 0.2s" }} />
          </div>
          <span style={{ fontFamily: mono, fontSize: 13, color: C.sun, minWidth: 52, textAlign: "right" }}>{pctStr}%</span>
        </div>
        <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, marginTop: 4, textAlign: "right" }}>{t.ofRef}</div>
      </div>
    </div>
  );
}

export default InverseSquare;
