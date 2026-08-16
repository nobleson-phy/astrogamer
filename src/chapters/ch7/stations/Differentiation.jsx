/* ============================================================
   STATION 4 — DIFFERENTIATION
   In a molten young planet, gravity pulls the densest material
   (iron, nickel) down to a core while lighter rock floats up to
   form the mantle and thin crust — the interior sorts into layers
   by density. Terrestrial cores are iron-nickel; surfaces basalt.
   Grounded in Ch.7 §7.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp, lerp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Differentiation",
    kind: "How a planet sorts itself into layers",
    lede: "A newborn planet starts as a uniform jumble of metal and rock. Melt it, and gravity does the sorting. Press play and watch the dense iron sink while lighter rock floats up.",
    thread: "THE STORY CONTINUES",
    threadText: "We said terrestrial worlds have iron-nickel cores and rocky surfaces. But they didn't form in layers — they sorted themselves once heat made their insides run like liquid. That sorting is called differentiation.",
    key: "DENSE SINKS, LIGHT FLOATS",
    keyText: "When a young planet is hot enough to melt, gravity pulls the densest materials — iron and nickel — down to form a metal CORE, while lighter silicate rock floats up into the MANTLE and a thin CRUST. This sorting by density is called differentiation. It is why every terrestrial planet has a dense iron-nickel core beneath a rocky, basalt-covered surface.",
    mixed: "Uniform mix", melt: "▶ Melt & differentiate", reset: "↺ Reset", differentiated: "Differentiated",
    core: "core · iron & nickel", mantle: "mantle · rock", crust: "crust · basalt",
    metal: "metal (dense)", rock: "rock (light)",
    note: "Before: metal and rock are mixed evenly. After: the dense metal has sunk to a core and light rock has risen to the mantle and crust — the same layering found inside Earth, Venus, Mars and Mercury.",
  },
  ja: {
    title: "分化",
    kind: "惑星が層に分かれるしくみ",
    lede: "生まれたての惑星は、金属と岩石が均一に混ざった塊です。溶かせば、重力が仕分けをします。再生を押して、重い鉄が沈み、軽い岩石が浮き上がる様子を見よう。",
    thread: "物語はつづく",
    threadText: "地球型の世界は鉄ニッケルの核と岩石の表面をもつと述べました。でも最初から層だったわけではありません——熱で内部が液体のように流れると、自ら仕分けをしたのです。この仕分けを分化と呼びます。",
    key: "重いものは沈み、軽いものは浮く",
    keyText: "若い惑星が溶けるほど熱くなると、重力が最も密度の高い物質——鉄とニッケル——を下へ引き、金属の核をつくります。一方、より軽い珪酸塩の岩石は浮き上がってマントルと薄い地殻になります。この密度による仕分けが分化です。だからどの地球型惑星も、岩石と玄武岩の表面の下に、密度の高い鉄ニッケルの核をもつのです。",
    mixed: "均一な混合", melt: "▶ 溶かして分化", reset: "↺ リセット", differentiated: "分化後",
    core: "核・鉄とニッケル", mantle: "マントル・岩石", crust: "地殻・玄武岩",
    metal: "金属（重い）", rock: "岩石（軽い）",
    note: "分化前：金属と岩石が均等に混ざる。分化後：重い金属が沈んで核になり、軽い岩石が浮いてマントルと地殻になる——地球・金星・火星・水星の内部に見られるのと同じ層構造です。",
  },
};

function seedParticles(cx, cy, R) {
  const ps = [];
  const n = 150;
  for (let i = 0; i < n; i++) {
    // uniform disc sampling
    const a = Math.random() * Math.PI * 2, rr = Math.sqrt(Math.random()) * (R - 4);
    ps.push({ a, r0: rr, metal: Math.random() < 0.42 });
  }
  return ps;
}

function drawPlanet(ctx, cw, H, ps, p, t, lang) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2, R = Math.min(cw, H) * 0.4;
  // outline
  ctx.strokeStyle = "rgba(150,175,230,0.35)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
  if (p > 0.02) {
    // differentiated layer discs fading in
    const coreR = R * 0.42, mantleR = R * 0.86;
    ctx.globalAlpha = p;
    ctx.fillStyle = "#6b4a2a"; ctx.beginPath(); ctx.arc(cx, cy, mantleR, 0, Math.PI * 2); ctx.fill(); // mantle
    ctx.fillStyle = "#4a3320"; ctx.lineWidth = 6; ctx.strokeStyle = "#3a2718";
    ctx.beginPath(); ctx.arc(cx, cy, R - 2, 0, Math.PI * 2); ctx.stroke(); // crust ring
    const cg = ctx.createRadialGradient(cx, cy, 2, cx, cy, coreR);
    cg.addColorStop(0, "#ffb56b"); cg.addColorStop(1, "#c9702f");
    ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(cx, cy, coreR, 0, Math.PI * 2); ctx.fill(); // core
    ctx.globalAlpha = 1;
  }
  // particles: metal migrates inward, rock outward as p rises
  for (const pt of ps) {
    const targetMetal = pt.metal ? R * 0.30 * (0.4 + Math.random() * 0.0) : R * 0.72;
    const target = pt.metal ? R * 0.30 : R * 0.74;
    const r = lerp(pt.r0, target, p);
    const x = cx + Math.cos(pt.a) * r, y = cy + Math.sin(pt.a) * r;
    ctx.globalAlpha = p > 0.02 ? 1 - p : 1; // fade particles as layers appear
    ctx.fillStyle = pt.metal ? "#ffcf6b" : "#8a6b4a";
    ctx.beginPath(); ctx.arc(x, y, pt.metal ? 2.4 : 2.0, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;
  // labels when differentiated
  if (p > 0.6) {
    ctx.font = `11px ${mono}`; ctx.textAlign = "center";
    ctx.fillStyle = "#ffcf6b"; ctx.fillText(t.core, cx, cy - R * 0.42 - 6);
    ctx.fillStyle = "#d0a878"; ctx.fillText(t.mantle, cx, cy + R * 0.64);
    ctx.fillStyle = "#c9b79a"; ctx.fillText(t.crust, cx, cy - R - 8);
  }
}

export function Differentiation() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 300;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const psRef = useRef(null);
  const pRef = useRef(0);
  const runRef = useRef(false);
  const [phase, setPhase] = useState(0); // for label state only

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    const cx = cw / 2, cy = H / 2, R = Math.min(cw, H) * 0.4;
    if (!psRef.current) psRef.current = seedParticles(cx, cy, R);
    if (reduceMotion) { drawPlanet(ctx, cw, H, psRef.current, pRef.current, t, lang); return; }
    let raf;
    const loop = () => {
      if (runRef.current && pRef.current < 1) { pRef.current = clamp(pRef.current + 0.012, 0, 1); }
      drawPlanet(ctx, cw, H, psRef.current, pRef.current, t, lang);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

  const melt = () => { runRef.current = true; setPhase(1); if (reduceMotion) { pRef.current = 1; const c = canRef.current; if (c) drawPlanet(setupCanvas(c, cw, H), cw, H, psRef.current, 1, t, lang); } };
  const reset = () => {
    runRef.current = false; pRef.current = 0; setPhase(0);
    const cx = cw / 2, cy = H / 2, R = Math.min(cw, H) * 0.4;
    psRef.current = seedParticles(cx, cy, R);
    if (reduceMotion) { const c = canRef.current; if (c) drawPlanet(setupCanvas(c, cw, H), cw, H, psRef.current, 0, t, lang); }
  };

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

        <div style={styles.controlBar}>
          <button style={styles.iconBtn} onClick={melt}>{t.melt}</button>
          <button style={{ ...styles.iconBtn, opacity: 0.85 }} onClick={reset}>{t.reset}</button>
          <span style={{ fontFamily: mono, fontSize: 13, color: phase ? C.good : C.faint }}>
            {phase ? t.differentiated : t.mixed}
          </span>
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <div style={{ fontFamily: mono, fontSize: 12.5, marginTop: 10, lineHeight: 1.8, color: C.muted }}>
          <div><span style={{ color: "#ffcf6b" }}>●</span> {t.metal}</div>
          <div><span style={{ color: "#8a6b4a" }}>●</span> {t.rock}</div>
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default Differentiation;
