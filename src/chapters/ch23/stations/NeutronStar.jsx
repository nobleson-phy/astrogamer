/* ============================================================
   STATION 5 — THE NEUTRON STAR
   When the collapse is halted not by electrons but by NEUTRON DEGENERACY, the
   result is a neutron star: electrons and protons crushed into neutrons, 1.4–3
   M☉ packed into a sphere only about 20 km across — the size of a city. Why
   can neutron degeneracy hold more mass than electron degeneracy? Because a
   neutron is about 1,800× more massive than an electron, its quantum
   wavelength is far smaller, so neutrons can be squeezed into a vastly smaller
   volume (density ~10^14 g/cm³) before degeneracy pressure stops the collapse.
   Grounded in Ch.23.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp, lerp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The neutron star",
    kind: "A city of neutrons",
    lede: "A collapse halted by neutron degeneracy packs more than a Sun's worth of mass into a ball about 20 km wide — a star you could lay across a city.",
    thread: "THE STORY CONTINUES",
    threadText: "When the core finally stops falling, what remains is almost unimaginable: a Sun crushed to the width of a city, a single colossal atomic nucleus.",
    key: "A CITY-SIZED NEUTRON STAR; WHY NEUTRONS HOLD MORE MASS",
    keyText: "If the collapse is stopped not by electrons but by NEUTRON DEGENERACY PRESSURE, the remnant is a NEUTRON STAR. Electrons and protons are crushed together into neutrons, and 1.4–3 M☉ is packed into a sphere only about 20 km across — the width of a city — at a density of roughly 10^14 g/cm³. Why can neutron degeneracy support more mass than electron degeneracy? A neutron is about 1,800× more massive than an electron. More massive particles have a much smaller quantum wavelength, so they can be squeezed into a far smaller volume before degeneracy pressure halts the collapse — which is why a neutron star reaches far higher densities and a higher mass limit (~3 M☉) than a white dwarf (1.4 M☉).",
    ns: "neutron star ≈ 20 km", city: "a city (≈20 km)", nsPrefix: "neutron star",
    diaLabel: "diameter", warn: "near the ~3 M☉ limit → collapses to a black hole",
    massLabel: "Neutron-star mass",
    whyTitle: "WHY NEUTRONS HOLD MORE MASS",
    eRow: "electron", nRow: "neutron (≈1,800× heavier)",
    smaller: "heavier particle → smaller wavelength → packs tighter",
    density: "density ≈ 10¹⁴ g/cm³",
    note: "A neutron star packs 1.4–3 M☉ into about 20 km (city-sized) at ~10^14 g/cm³, held by neutron degeneracy. Neutrons are ~1,800× heavier than electrons, so they pack into a far smaller volume — giving a higher density and mass limit than a white dwarf.",
  },
  ja: {
    title: "中性子星",
    kind: "中性子の都市",
    lede: "中性子縮退で止まった崩壊は、太陽以上の質量を幅約20 kmの球に詰め込みます——都市にまたがって置けるほどの星です。",
    thread: "物語はつづく",
    threadText: "核がついに落下を止めたとき、残るものはほとんど想像を絶します：太陽が都市の幅に押しつぶされ、ひとつの巨大な原子核になっているのです。",
    key: "都市サイズの中性子星；なぜ中性子はより多くの質量を保てるのか",
    keyText: "崩壊が電子ではなく中性子縮退圧によって止められると、残骸は中性子星になります。電子と陽子は押しつぶされて中性子になり、1.4〜3 M☉が直径わずか約20 km——都市の幅——の球に、およそ10^14 g/cm³の密度で詰め込まれます。なぜ中性子縮退は電子縮退より多くの質量を支えられるのでしょう。中性子は電子より約1,800倍重いのです。重い粒子ほど量子波長がずっと小さいので、縮退圧が崩壊を止めるまでにはるかに小さな体積に押し込められます——だから中性子星は、白色矮星（1.4 M☉）よりはるかに高い密度とより高い質量限界（約3 M☉）に達するのです。",
    ns: "中性子星 ≈ 20 km", city: "都市（約20 km）", nsPrefix: "中性子星",
    diaLabel: "直径", warn: "約3 M☉の限界に接近 → ブラックホールへ崩壊",
    massLabel: "中性子星の質量",
    whyTitle: "なぜ中性子はより多くの質量を保てるのか",
    eRow: "電子", nRow: "中性子（約1,800倍重い）",
    smaller: "重い粒子 → 小さな波長 → より密に詰まる",
    density: "密度 ≈ 10¹⁴ g/cm³",
    note: "中性子星は、中性子縮退に支えられ、1.4〜3 M☉を約20 km（都市サイズ）に約10^14 g/cm³で詰め込みます。中性子は電子より約1,800倍重いので、はるかに小さな体積に詰まり、白色矮星より高い密度と質量限界を与えます。",
  },
};

function draw(ctx, cw, H, M, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // Fixed spatial scale: a city skyline fixed at ~20 km; the neutron star is drawn
  // to the SAME scale so its shrinking with mass is directly comparable.
  const pxPerKm = 5.2;
  const frac = clamp((M - 1.4) / (3.0 - 1.4), 0, 1);
  const diaKm = lerp(24, 17, frac);             // more mass → smaller star
  const nsR = (diaKm * pxPerKm) / 2;
  const near = M > 2.8;                          // approaching the ~3 M☉ limit
  const cx = cw * 0.3, cy = H * 0.42;
  const rim = near ? "#d87a6a" : "#6f8fd8";
  // neutron star glow
  const glow = ctx.createRadialGradient(cx, cy, 2, cx, cy, nsR + 26);
  glow.addColorStop(0, near ? "rgba(255,170,150,0.6)" : "rgba(180,210,255,0.6)"); glow.addColorStop(1, "rgba(180,210,255,0)");
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(cx, cy, nsR + 26, 0, Math.PI * 2); ctx.fill();
  const g = ctx.createRadialGradient(cx - nsR * 0.3, cy - nsR * 0.3, nsR * 0.1, cx, cy, nsR);
  g.addColorStop(0, "#ffffff"); g.addColorStop(0.5, near ? "#ffd3c8" : "#cfe0ff"); g.addColorStop(1, rim);
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, nsR, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#e6efff"; ctx.font = `12px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(`${t.nsPrefix} · ${t.diaLabel} ≈ ${diaKm.toFixed(0)} km`, cx, cy + nsR + 26);

  // scale bar matching the current diameter
  ctx.strokeStyle = C.faint; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(cx - nsR, cy - nsR - 14); ctx.lineTo(cx + nsR, cy - nsR - 14); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx - nsR, cy - nsR - 18); ctx.lineTo(cx - nsR, cy - nsR - 10); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx + nsR, cy - nsR - 18); ctx.lineTo(cx + nsR, cy - nsR - 10); ctx.stroke();

  // city skyline — FIXED width (≈20 km reference) so the star visibly shrinks against it
  const cityW = 20 * pxPerKm;
  const cityX = cw - cityW - 24, cityBase = cy + nsR * 0 + 30;
  ctx.fillStyle = "rgba(160,185,235,0.5)";
  const bw = cityW / 7;
  const heights = [22, 38, 30, 52, 34, 44, 26];
  for (let i = 0; i < 7; i++) {
    const bx = cityX + i * bw;
    ctx.fillRect(bx, cityBase - heights[i], bw - 3, heights[i]);
  }
  ctx.strokeStyle = "rgba(160,185,235,0.5)"; ctx.beginPath();
  ctx.moveTo(cityX, cityBase); ctx.lineTo(cityX + cityW, cityBase); ctx.stroke();
  ctx.fillStyle = "#9fb6e6"; ctx.font = `12px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.city, cityX + cityW / 2, cityBase + 22);

  // readouts — density climbs steeply as mass rises and radius shrinks (ρ ∝ M/R³)
  const densRel = (M / 1.4) / Math.pow(diaKm / 20, 3);   // relative, in units of ~10^14
  ctx.fillStyle = C.text; ctx.font = `13px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(`${M.toFixed(2)} M☉`, 16, 22);
  ctx.fillStyle = C.cool; ctx.font = `11px ${mono}`;
  ctx.fillText(`≈ ${(densRel * 4).toFixed(1)} ×10¹⁴ g/cm³`, 16, 42);
  if (near) {
    ctx.fillStyle = "#e0774f"; ctx.font = `11px ${mono}`; ctx.textAlign = "left";
    ctx.fillText(`⚠ ${t.warn}`, 16, H - 12);
  }
}

export function NeutronStar() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [M, setM] = useState(1.8);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, M, lang);
  }, [cw, M, lang]);

  // bars for the "why" comparison
  const rows = [
    { lab: t.eRow, v: 1.0, c: "#9bb4ff" },
    { lab: t.nRow, v: 0.055, c: C.sun }, // smaller wavelength -> drawn as a tiny bar
  ];

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

        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "4px 0 10px" }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.massLabel}</span>
          <input type="range" min="1.4" max="3.0" step="0.01" value={M}
            onChange={(e) => setM(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
          <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, width: 64, textAlign: "right" }}>{M.toFixed(2)} M☉</span>
        </div>

        <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />

        <div style={{ marginTop: 12, padding: 12, background: "rgba(8,12,26,0.6)", border: `1px solid ${C.border}`, borderRadius: 10 }}>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: 1.5, color: C.muted, marginBottom: 10 }}>{t.whyTitle}</div>
          {rows.map((r) => (
            <div key={r.lab} style={{ display: "flex", alignItems: "center", gap: 10, margin: "6px 0" }}>
              <span style={{ fontFamily: mono, fontSize: 11.5, color: C.faint, width: 150, flexShrink: 0 }}>{r.lab}</span>
              <div style={{ flex: 1, height: 12, background: "rgba(150,175,230,0.15)", borderRadius: 6, overflow: "hidden" }}>
                <div style={{ width: `${r.v * 100}%`, height: "100%", background: r.c, borderRadius: 6 }} />
              </div>
            </div>
          ))}
          <div style={{ fontFamily: mono, fontSize: 11, color: C.sun, marginTop: 8 }}>{t.smaller}</div>
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default NeutronStar;
