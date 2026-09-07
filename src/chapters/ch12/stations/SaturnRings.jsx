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
    lede: "The rings look solid, but they are not. Drag the speed slider and watch the marker particles: the inner ones race around while the outer ones dawdle — the signature of separate orbiting bodies.",
    speed: "Time speed",
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
    lede: "環は固く見えますが、そうではありません。速度スライダーを動かして目印の粒子を見よう：内側は駆けめぐり、外側はのんびり——別々に公転する天体の証です。",
    speed: "時間の速さ",
    thread: "物語はつづく",
    threadText: "太陽系で土星の環に並ぶ眺めはありません。しかしそれは固い円盤ではなく——無数の氷のかけらの群れで、それぞれがケプラーの法則に従う、ミニチュアの衛星です。",
    key: "氷の粒子、内側ほど速く回る",
    keyText: "土星の環は、塵の粒から家ほどの岩まで、無数の別々の水の氷の粒子でできていて、それぞれが土星のまわりを公転します。ケプラーの第三法則に従うため、内側の粒子は外側より速く回ります——だから環は固くなく、一枚岩として回転できません。暗いカッシーニの間隙は、衛星ミマスとの軌道共鳴で掃き清められた隙間です：そこの粒子はミマスが1周する間にちょうど2周し（2:1共鳴）、同じ位置で繰り返し引かれて弾き出されます。",
    fast: "内側：速い", slow: "外側：遅い", cassini: "カッシーニの間隙（ミマスと2:1）",
    note: "環は固い板ではなく数兆の氷のかけら：内側の粒子はケプラー通り外側を追い抜きます。カッシーニの間隙はミマスとの2:1共鳴で掃き清められています。",
  },
};

function draw(ctx, cw, H, phase, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2;
  const sR = H * 0.17;            // Saturn radius
  const yScale = 0.34;           // ring tilt (foreshortening)
  const rings = [
    { r0: sR * 1.22, r1: sR * 1.9, col: "rgba(206,192,166,0.85)" },   // C + B rings
    { r0: sR * 1.9, r1: sR * 2.02, col: "rgba(8,10,18,0)" },          // Cassini Division (gap)
    { r0: sR * 2.02, r1: sR * 2.55, col: "rgba(224,212,188,0.9)" },   // A ring
  ];
  // smooth elliptical annulus band, optionally clipped to front/back half
  function band(r0, r1, col, half) {
    if (!col || col.endsWith(",0)")) return;
    ctx.save();
    if (half) {
      ctx.beginPath();
      if (half === "front") ctx.rect(0, cy, cw, H - cy);
      else ctx.rect(0, 0, cw, cy);
      ctx.clip();
    }
    ctx.beginPath();
    ctx.ellipse(cx, cy, r1, r1 * yScale, 0, 0, Math.PI * 2);
    ctx.ellipse(cx, cy, r0, r0 * yScale, 0, 0, Math.PI * 2);
    ctx.fillStyle = col; ctx.fill("evenodd");
    ctx.restore();
  }
  // subtle concentric shading lines so the band reads as many ringlets
  function ringlets(r0, r1, half) {
    ctx.save();
    ctx.beginPath();
    if (half === "front") ctx.rect(0, cy, cw, H - cy); else ctx.rect(0, 0, cw, cy);
    ctx.clip();
    ctx.strokeStyle = "rgba(120,100,70,0.18)"; ctx.lineWidth = 1;
    for (let rr = r0; rr <= r1; rr += (r1 - r0) / 10) {
      ctx.beginPath(); ctx.ellipse(cx, cy, rr, rr * yScale, 0, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.restore();
  }
  // a few bright marker particles that reveal differential (Keplerian) rotation
  const markers = [
    { r: sR * 1.45, col: "#fff2c8" }, { r: sR * 1.7, col: "#ffd98a" },
    { r: sR * 2.2, col: "#bfe0ff" }, { r: sR * 2.45, col: "#9fc4ff" },
  ];
  function drawMarkers(half) {
    markers.forEach((m, i) => {
      const speed = Math.pow(sR * 1.45 / m.r, 1.5);   // Kepler: inner faster
      const a = (phase * speed + i * 1.7) % (Math.PI * 2);
      const front = Math.sin(a) > 0;
      if ((half === "front") !== front) return;
      const x = cx + Math.cos(a) * m.r, y = cy + Math.sin(a) * m.r * yScale;
      ctx.fillStyle = m.col; ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.5)"; ctx.lineWidth = 1; ctx.stroke();
    });
  }
  // BACK half of rings
  rings.forEach(r => band(r.r0, r.r1, r.col, "back"));
  ringlets(sR * 1.22, sR * 1.9, "back"); ringlets(sR * 2.02, sR * 2.55, "back");
  drawMarkers("back");
  // Saturn body
  const g = ctx.createRadialGradient(cx - sR * 0.3, cy - sR * 0.3, sR * 0.2, cx, cy, sR);
  g.addColorStop(0, "#e8d5a8"); g.addColorStop(1, "#b89a5e");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, sR, 0, Math.PI * 2); ctx.fill();
  // ring shadow line across the planet
  ctx.strokeStyle = "rgba(60,45,25,0.35)"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.ellipse(cx, cy, sR * 0.96, sR * 0.96 * yScale, 0, 0.15, Math.PI - 0.15); ctx.stroke();
  // FRONT half of rings
  rings.forEach(r => band(r.r0, r.r1, r.col, "front"));
  ringlets(sR * 1.22, sR * 1.9, "front"); ringlets(sR * 2.02, sR * 2.55, "front");
  drawMarkers("front");
  // labels
  ctx.fillStyle = C.cool; ctx.font = `10px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.fast, cx, cy + sR * 1.45 * yScale + 18);
  ctx.fillText(t.slow, cx, cy + sR * 2.5 * yScale + 16);
  ctx.fillStyle = C.sun; ctx.fillText(t.cassini, cx, cy - sR * 2.02 * yScale - 8);
}

export function SaturnRings() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [speed, setSpeed] = useState(1);
  const speedRef = useRef(1);
  speedRef.current = speed;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, 1.2, lang); return; }
    let raf, phase = 0;
    const loop = () => { phase += 0.012 * speedRef.current; draw(ctx, cw, H, phase, lang); raf = requestAnimationFrame(loop); };
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

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.speed}</span>
          <input type="range" min="0" max="3" step="0.05" value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            style={{ flex: 1, accentColor: C.sun }} />
          <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, width: 42, textAlign: "right" }}>{speed.toFixed(1)}×</span>
        </div>

        <div style={{ marginTop: 4 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default SaturnRings;
