/* ============================================================
   STATION 8 — INVERSE-SQUARE LAW
   Slide a detector away from a glowing source. Brightness scales
   as 1/d² — shown numerically and by visibly dimming. Calls out
   the 10× farther → 100× fainter example.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel, Row } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The inverse-square law",
    kind: "Why distant things look faint",
    lede: "Light spreads out as it travels — so the farther away a source is, the fainter it looks. This simple rule quietly shapes all of astronomy.",
    thread: "WHY IT MATTERS",
    why: "It's why a nearby candle can outshine a distant star that is truly millions of times brighter — and why astronomers build ever-larger telescopes to gather the faint light of the most distant, and therefore oldest, objects in the universe.",
    slide: "Slide the detector away from the source:",
    distance: "Distance", brightness: "Apparent brightness",
    law: "Brightness falls off as 1 ÷ distance². Double the distance and it's 4× fainter; triple it and it's 9× fainter.",
    callout: "Stand 10× farther away and the source looks 100× fainter — because 10² = 100.",
    times: "× the source's distance",
    atTen: "At 10× distance",
  },
  ja: {
    title: "逆二乗の法則",
    kind: "遠くのものが暗く見える理由",
    lede: "光は進むほど広がります——だから光源は、遠いほど暗く見えます。この単純な法則が、天文学のすべてを静かに形づくっています。",
    thread: "なぜ重要か",
    why: "近くのろうそくが、本当は何百万倍も明るい遠くの星よりまぶしく見えるのは、このためです。そして天文学者が、最も遠く——つまり最も古い——天体のかすかな光を集めるために、より大きな望遠鏡を造り続ける理由でもあります。",
    slide: "検出器を光源から遠ざけてみよう：",
    distance: "距離", brightness: "見かけの明るさ",
    law: "明るさは 1 ÷ 距離² で減ります。距離が2倍なら4分の1、3倍なら9分の1の明るさです。",
    callout: "10倍遠くに立つと、光源は100分の1の明るさに見えます——10² = 100 だからです。",
    times: "× 光源からの距離",
    atTen: "10倍の距離では",
  },
};

export function InverseSquare() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canvasRef = useRef(null);
  const [d, setD] = useState(2); // distance in units, 1..10
  const cw = Math.min(w, 760);
  const brightness = 1 / (d * d); // relative to unit distance

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, cw, H);
    const y = H / 2;
    const x0 = 44, x1 = cw - 44;
    ctx.clearRect(0, 0, cw, H);
    // ruler
    ctx.strokeStyle = "rgba(120,150,210,0.25)"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
    // source glow (constant emission)
    const R = 46;
    const g = ctx.createRadialGradient(x0, y, 2, x0, y, R);
    g.addColorStop(0, "#fff"); g.addColorStop(0.3, "#ffcf6b"); g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x0, y, R, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(x0, y, 10, 0, Math.PI * 2); ctx.fill();
    // detector position along the track (d 1..10 mapped)
    const dx = x0 + ((d - 1) / 9) * (x1 - x0 - 20) + 20;
    // detector receives brightness -> its glow scales
    const dg = Math.max(0.06, brightness);
    ctx.globalAlpha = Math.min(1, dg + 0.12);
    const g2 = ctx.createRadialGradient(dx, y, 1, dx, y, 26);
    g2.addColorStop(0, `rgba(99,211,240,${dg})`); g2.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g2; ctx.beginPath(); ctx.arc(dx, y, 26, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;
    // detector body
    ctx.strokeStyle = C.cool; ctx.lineWidth = 2;
    ctx.strokeRect(dx - 9, y - 14, 18, 28);
    ctx.fillStyle = C.faint; ctx.font = `12px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(`${d}×`, dx, y + 32);
  }, [cw, d, brightness]);

  const pct = (brightness * 100);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 08</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 12 }}>
          <span style={{ fontFamily: mono, fontSize: 31, color: C.sun }}>{d}</span>
          <span style={{ color: C.muted, fontSize: 15 }}>{t.times}</span>
        </div>
        <dl style={styles.dl}>
          <Row k={t.distance} v={`${d}×`} />
          <Row k={`1 / ${d}²`} v={`1 / ${d * d}`} />
          <Row k={t.brightness} v={<span style={{ color: C.cool }}>{pct >= 1 ? pct.toFixed(0) : pct.toFixed(2)}%</span>} />
        </dl>
        {d === 10 && (
          <div style={styles.pathBox}>
            <div style={styles.fateLabel}>{t.atTen}</div>
            <p style={styles.pathText}>10² = 100 → 1 / 100 = 1%</p>
          </div>
        )}
        <div style={styles.fateBox}>
          <p style={styles.factText}>{t.callout}</p>
        </div>
        <p style={{ ...styles.keyTermText, marginTop: 14 }}>{t.law}</p>
        <div style={{ ...styles.pathBox, marginTop: 14 }}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{t.why}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>
        <canvas ref={canvasRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginTop: 10 }}>{t.slide}</div>
        <input type="range" min={1} max={10} step={1} value={d} onChange={(e) => setD(parseInt(e.target.value, 10))} style={styles.range} />
        <div style={styles.rangeEnds}><span>1×</span><span>10×</span></div>
      </div>
    </div>
  );
}

export default InverseSquare;
