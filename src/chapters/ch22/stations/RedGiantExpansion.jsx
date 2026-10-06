/* ============================================================
   STATION 3 — BECOMING A RED GIANT
   When core hydrogen runs out, there is nothing to balance gravity, so the
   helium core contracts and heats up. That heat ignites hydrogen fusion in a
   SHELL around the core, whose fierce output puffs the envelope up enormously.
   By L = 4πR²σT⁴, the ballooning radius wins: the surface cools and reddens,
   yet the total luminosity rises. Core contracts, shell ignites, envelope
   expands and cools. Grounded in Ch.22 §22.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp, lerp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Becoming a red giant",
    kind: "The swell after the main sequence",
    lede: "Drag the timeline from a steady main-sequence star to a bloated red giant. The core shrinks, a shell ignites, and the envelope balloons and cools.",
    thread: "THE STORY CONTINUES",
    threadText: "A star cannot fuse hydrogen forever. When the core's fuel is spent, the balance of a lifetime breaks — and the star transforms, swelling into something vast and red.",
    key: "CORE CONTRACTS, SHELL IGNITES, ENVELOPE EXPANDS & COOLS",
    keyText: "When core hydrogen is exhausted, nothing balances gravity, so the inert helium CORE CONTRACTS and heats up. That heat ignites hydrogen fusion in a SHELL just outside the core. The shell's intense output drives the outer ENVELOPE to expand enormously. By the law L = 4πR²σT⁴, the swelling radius dominates: the surface spreads thin, cools, and reddens — yet the total luminosity actually rises. The star becomes a cool, huge, luminous red giant.",
    ms: "main sequence", rg: "red giant",
    stage: "Evolution",
    radius: "radius", surfT: "surface T", lum: "luminosity",
    rising: "L rises", cooling: "T falls", swelling: "R balloons",
    note: "Core hydrogen runs out → the helium core contracts and heats → a hydrogen shell ignites → the envelope balloons and cools. L = 4πR²σT⁴: the surface reddens, but the giant grows far more luminous overall.",
  },
  ja: {
    title: "赤色巨星になる",
    kind: "主系列のあとの膨張",
    lede: "安定した主系列星から膨れ上がった赤色巨星まで、時間軸をドラッグしよう。核が縮み、殻が点火し、外層が膨らんで冷えます。",
    thread: "物語はつづく",
    threadText: "星は永遠に水素を融合できません。核の燃料が尽きると、一生のあいだ保たれた均衡が崩れ——星は、巨大で赤いものへと膨れ上がり変貌します。",
    key: "核が縮み、殻が点火し、外層が膨張して冷える",
    keyText: "核の水素が尽きると、重力を支えるものがなくなり、不活性なヘリウムの核は収縮して熱くなります。その熱が、核のすぐ外側の殻で水素融合に点火します。殻の強烈な出力が外層を巨大に膨張させます。法則 L = 4πR²σT⁴ により、膨らむ半径が支配的になります：表面は薄く広がって冷え、赤くなります——それでも総光度はむしろ上がります。星は、低温で巨大で明るい赤色巨星になります。",
    ms: "主系列", rg: "赤色巨星",
    stage: "進化",
    radius: "半径", surfT: "表面温度", lum: "光度",
    rising: "光度↑", cooling: "温度↓", swelling: "半径↑↑",
    note: "核の水素が尽きる → ヘリウムの核が収縮して熱くなる → 水素の殻が点火 → 外層が膨らんで冷える。L = 4πR²σT⁴：表面は赤くなるが、巨星は全体としてはるかに明るくなります。",
  },
};

function draw(ctx, cw, H, p, lang) {
  // p: 0 = main sequence, 1 = red giant
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.40, cy = H * 0.5;
  // envelope radius balloons; surface color goes yellow->orange->red
  const R = lerp(26, Math.min(cw, H) * 0.42, Math.pow(p, 0.8));
  // surface color
  const col = p < 0.5
    ? `rgb(${Math.round(lerp(255, 255, p / 0.5))},${Math.round(lerp(244, 196, p / 0.5))},${Math.round(lerp(190, 110, p / 0.5))})`
    : `rgb(255,${Math.round(lerp(196, 120, (p - 0.5) / 0.5))},${Math.round(lerp(110, 70, (p - 0.5) / 0.5))})`;
  // envelope
  const g = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R);
  g.addColorStop(0, col); g.addColorStop(0.7, col); g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
  // contracting core (shrinks as p rises)
  const coreR = lerp(10, 4, p);
  ctx.fillStyle = "#cfe3ff"; ctx.beginPath(); ctx.arc(cx, cy, coreR, 0, Math.PI * 2); ctx.fill();
  // shell ring around core (appears for p>0.15)
  if (p > 0.12) {
    ctx.strokeStyle = "rgba(255,210,61,0.85)"; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(cx, cy, coreR + 6, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = C.sun; ctx.font = `10px ${mono}`; ctx.textAlign = "left";
    ctx.fillText(lang === "ja" ? "水素の殻" : "H shell", cx + coreR + 10, cy - coreR - 4);
  }
  ctx.fillStyle = "#cfe3ff"; ctx.font = `10px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(lang === "ja" ? "Heの核" : "He core", cx, cy + R + 16 > H - 8 ? cy - 4 : cy + 4);
  // size reference: the Sun at current scale (tiny)
  // stage label
  ctx.fillStyle = C.text; ctx.font = `12px ${mono}`; ctx.textAlign = "center";
  const label = p < 0.25 ? t.ms : p < 0.75 ? (lang === "ja" ? "殻燃焼へ" : "shell burning") : t.rg;
  ctx.fillText(label, cx, H - 10);
  // right-side readout bars: radius, luminosity up; surface T down
  const rx = cw - 128; if (rx > cx + R + 12) {
    const barW = 100, bx = rx, rows = [
      { lab: t.radius, v: Math.pow(p, 0.8), c: "#9bb4ff", d: t.swelling },
      { lab: t.lum, v: clamp(0.3 + p * 0.7, 0, 1), c: C.sun, d: t.rising },
      { lab: t.surfT, v: 1 - p * 0.72, c: "#ff8a52", d: t.cooling },
    ];
    rows.forEach((r, i) => {
      const yy = 30 + i * 46;
      ctx.fillStyle = C.faint; ctx.font = `10px ${mono}`; ctx.textAlign = "left";
      ctx.fillText(r.lab, bx, yy - 6);
      ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.strokeRect(bx, yy, barW, 10);
      ctx.fillStyle = r.c; ctx.fillRect(bx + 1, yy + 1, (barW - 2) * clamp(r.v, 0, 1), 8);
      ctx.fillStyle = r.c; ctx.font = `9px ${mono}`; ctx.fillText(r.d, bx, yy + 24);
    });
  }
}

export function RedGiantExpansion() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 300;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [auto, setAuto] = useState(true);
  const [p, setP] = useState(0);
  const pRef = useRef(0); pRef.current = p;
  const autoRef = useRef(true); autoRef.current = auto;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, pRef.current, lang); return; }
    let raf, dir = 1;
    const loop = () => {
      if (autoRef.current) {
        let np = pRef.current + dir * 0.004;
        if (np >= 1) { np = 1; dir = -1; }
        else if (np <= 0) { np = 0; dir = 1; }
        pRef.current = np; setP(np);
      }
      draw(ctx, cw, H, pRef.current, lang);
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
          <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.ms}</span>
          <input type="range" min="0" max="1" step="0.01" value={p}
            onChange={(e) => { setAuto(false); setP(parseFloat(e.target.value)); pRef.current = parseFloat(e.target.value); }}
            style={{ flex: 1, accentColor: C.sun }} />
          <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, whiteSpace: "nowrap" }}>{t.rg}</span>
        </div>
        <div style={styles.pickerRow}>
          <button onClick={() => setAuto((a) => !a)} style={{ ...styles.chip, ...(auto ? styles.chipOn : {}) }}>
            {auto ? (lang === "ja" ? "自動再生 ■" : "auto ■") : (lang === "ja" ? "自動再生 ▶" : "auto ▶")}
          </button>
        </div>

        <div style={{ marginTop: 8 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default RedGiantExpansion;
