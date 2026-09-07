/* ============================================================
   STATION 5 — SATURN'S RINGS
   Saturn's spectacular rings are countless chunks of water ICE, each
   a tiny moon on its own orbit. Inner ring particles orbit faster
   than outer ones (Kepler's third law). The Cassini Division is a gap
   swept clear by an orbital resonance with the moon Mimas (a particle
   there would orbit twice for each Mimas orbit — a 2:1 resonance).
   Grounded in Ch.12 §12.4.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Saturn's rings",
    kind: "A billion tiny ice moons",
    lede: "The rings look solid, but they are not. Speed up time and watch: the inner ring races around while the outer ring dawdles — the signature of separate orbiting particles.",
    thread: "THE STORY CONTINUES",
    threadText: "No sight in the solar system rivals Saturn's rings. But they are not a solid disc — they are a swarm of countless chunks of ice, each obeying Kepler's laws, each a moon in miniature.",
    key: "ICE PARTICLES, INNER ONES ORBIT FASTER",
    keyText: "Saturn's rings are made of countless separate particles of water ICE, from dust grains to house-sized boulders, each on its own orbit around Saturn. Because they obey Kepler's third law, particles closer in orbit FASTER than those farther out — so the rings are not solid and cannot rotate as one piece. The dark Cassini Division is a gap kept swept clear by an orbital RESONANCE with the moon Mimas: a particle there would circle Saturn exactly twice for every one Mimas orbit (a 2:1 resonance), and Mimas's repeated tug at the same point flings it out.",
    fast: "inner: fast", slow: "outer: slow", cassini: "Cassini Division (2:1 with Mimas)",
    note: "The rings are trillions of ice chunks, not a solid sheet: inner particles outrun outer ones exactly as Kepler predicts. The Cassini Division is cleared by a 2:1 resonance with Mimas.",
  },
  ja: {
    title: "土星の環",
    kind: "10億の小さな氷の衛星",
    lede: "環は固く見えますが、そうではありません。時間を速めて見よう：内側の環は駆けめぐり、外側の環はのんびり——別々に公転する粒子の証です。",
    thread: "物語はつづく",
    threadText: "太陽系で土星の環に並ぶ眺めはありません。しかしそれは固い円盤ではなく——無数の氷のかけらの群れで、それぞれがケプラーの法則に従う、ミニチュアの衛星です。",
    key: "氷の粒子、内側ほど速く回る",
    keyText: "土星の環は、塵の粒から家ほどの岩まで、無数の別々の水の氷の粒子でできていて、それぞれが土星のまわりを公転します。ケプラーの第三法則に従うため、内側の粒子は外側より速く回ります——だから環は固くなく、一枚岩として回転できません。暗いカッシーニの間隙は、衛星ミマスとの軌道共鳴で掃き清められた隙間です：そこの粒子はミマスが1周する間にちょうど2周し（2:1共鳴）、同じ位置で繰り返し引かれて弾き出されます。",
    fast: "内側：速い", slow: "外側：遅い", cassini: "カッシーニの間隙（ミマスと2:1）",
    note: "環は固い板ではなく数兆の氷のかけら：内側の粒子はケプラー通り外側を追い抜きます。カッシーニの間隙はミマスとの2:1共鳴で掃き清められています。",
  },
};

function draw(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2;
  const sR = H * 0.16; // Saturn radius
  // rings as concentric bands of particles, drawn in perspective (flattened y)
  const yScale = 0.32;
  const rings = [
    { r0: sR * 1.25, r1: sR * 1.9, col: "rgba(200,190,170,0.5)" },   // C/B
    { r0: sR * 1.9, r1: sR * 2.05, col: "rgba(10,12,20,0.9)" },       // Cassini Division
    { r0: sR * 2.05, r1: sR * 2.55, col: "rgba(220,210,190,0.65)" },  // A ring
  ];
  // draw back halves of rings first
  function ringArc(r0, r1, col, back) {
    const steps = 90;
    ctx.fillStyle = col;
    for (let i = 0; i < steps; i++) {
      const a = (i / steps) * Math.PI * 2;
      if (back ? (Math.sin(a) > 0) : (Math.sin(a) <= 0)) continue;
      const rm = (r0 + r1) / 2;
      const x = cx + Math.cos(a) * rm, y = cy + Math.sin(a) * rm * yScale;
      ctx.fillRect(x - 1, y - (r1 - r0) / 2 * 0.5, 2, (r1 - r0) * 0.5);
    }
  }
  // orbiting particles to show differential rotation
  function particles(r0, r1, back) {
    for (let k = 0; k < 60; k++) {
      const rr = r0 + ((k * 37) % 100) / 100 * (r1 - r0);
      const speed = 1 / Math.pow(rr, 1.5) * 900; // Kepler: inner faster
      const a = (k * 0.63 + tt * 0.01 * speed) % (Math.PI * 2);
      if (back ? (Math.sin(a) > 0) : (Math.sin(a) <= 0)) continue;
      const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr * yScale;
      ctx.fillStyle = "rgba(240,235,220,0.8)";
      ctx.fillRect(x, y, 1.6, 1.6);
    }
  }
  // BACK
  rings.forEach(r => ringArc(r.r0, r.r1, r.col, true));
  particles(sR * 1.25, sR * 1.9, true);
  particles(sR * 2.05, sR * 2.55, true);
  // Saturn body
  const g = ctx.createRadialGradient(cx - sR * 0.3, cy - sR * 0.3, sR * 0.2, cx, cy, sR);
  g.addColorStop(0, "#e8d5a8"); g.addColorStop(1, "#b89a5e");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, sR, 0, Math.PI * 2); ctx.fill();
  // FRONT
  rings.forEach(r => ringArc(r.r0, r.r1, r.col, false));
  particles(sR * 1.25, sR * 1.9, false);
  particles(sR * 2.05, sR * 2.55, false);
  // labels
  ctx.fillStyle = C.cool; ctx.font = `10px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.fast, cx - sR * 1.55, cy + sR * 0.55 * yScale + 22);
  ctx.fillText(t.slow, cx + sR * 2.3, cy + sR * 2.3 * yScale + 14);
  ctx.fillStyle = C.sun; ctx.fillText(t.cassini, cx, cy - sR * 2.05 * yScale - 8);
}

export function SaturnRings() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, 40, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

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

        <div style={{ marginTop: 4 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default SaturnRings;
