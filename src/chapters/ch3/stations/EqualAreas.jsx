/* ============================================================
   STATION 3 — KEPLER'S SECOND LAW (EQUAL AREAS)
   A line from the Sun to a planet sweeps out equal areas in equal
   times, so a body moves fastest at perihelion and slowest at
   aphelion. Two shaded wedges cover the SAME sweep-time — the fat,
   stubby one near the Sun and the long, thin one far away have equal
   area. This is why comets whip through the inner solar system.
   Grounded in Ch.3 §3.1 & §3.4.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const ECC = 0.6; // exaggerated for clarity — comet-like
const DM = 0.7;  // mean-anomaly width of each equal-time wedge

/* Solve Kepler's equation M = E - e sinE for E (Newton's method). */
function solveE(M, e) {
  let E = M;
  for (let i = 0; i < 8; i++) E = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  return E;
}

const STR = {
  en: {
    title: "Kepler's second law",
    kind: "Equal areas in equal time",
    lede: "Watch the planet race past the Sun and crawl at the far end. The two shaded wedges take the SAME amount of time to sweep — yet cover the same area. That is Kepler's second law in one picture.",
    thread: "THE LAW",
    threadText: "A straight line joining a planet and the Sun sweeps out equal areas in equal intervals of time. Near the Sun the line is short, so the planet must race to cover the area; far away the line is long, so it can crawl.",
    speed: "SPEEDING UP",
    speedText: "This is why a planet moves fastest at perihelion and slowest at aphelion — and why comets, on very stretched orbits, whip through the inner solar system in a rush and then spend most of their time drifting slowly far away.",
    equalArea: "equal area · equal time",
    fast: "fast (perihelion)", slow: "slow (aphelion)",
    play: "▶ Play", pause: "❚❚ Pause",
    speedNow: "Orbital speed now",
  },
  ja: {
    title: "ケプラーの第二法則",
    kind: "等しい時間に等しい面積",
    lede: "惑星が太陽のそばを駆け抜け、遠い端ではゆっくり進む様子を見よう。二つの塗られた扇形は、掃くのに「同じ時間」がかかり——しかも同じ面積です。これがケプラーの第二法則を一枚に収めた図です。",
    thread: "法則",
    threadText: "惑星と太陽を結ぶ直線は、等しい時間に等しい面積を掃きます。太陽の近くでは線が短いので、その面積を掃くには惑星が速く動かねばならず、遠くでは線が長いのでゆっくりで済みます。",
    speed: "速くなる",
    speedText: "だから惑星は近日点で最も速く、遠日点で最も遅く動きます——そして大きく引き伸ばされた軌道を持つ彗星は、内部太陽系を一気に駆け抜け、あとの大半の時間を遠くでゆっくり漂って過ごすのです。",
    equalArea: "等しい面積・等しい時間",
    fast: "速い（近日点）", slow: "遅い（遠日点）",
    play: "▶ 再生", pause: "❚❚ 一時停止",
    speedNow: "今の公転速度",
  },
};

function ellipsePt(E, a, b, cx, cy) {
  return [cx + a * Math.cos(E), cy - b * Math.sin(E)];
}

function drawWedge(ctx, M0, sun, a, b, cx, cy, fill) {
  ctx.beginPath();
  ctx.moveTo(sun[0], sun[1]);
  const N = 24;
  for (let i = 0; i <= N; i++) {
    const M = M0 + (DM * i) / N;
    const E = solveE(M, ECC);
    const p = ellipsePt(E, a, b, cx, cy);
    ctx.lineTo(p[0], p[1]);
  }
  ctx.closePath();
  ctx.fillStyle = fill; ctx.fill();
}

function draw(ctx, cw, H, M) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2;
  const a = Math.min(cw * 0.34, 200);
  const b = a * Math.sqrt(1 - ECC * ECC);
  const c = a * ECC;
  const sun = [cx + c, cy]; // focus

  // orbit
  ctx.strokeStyle = "rgba(255,207,107,0.55)"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.ellipse(cx, cy, a, b, 0, 0, Math.PI * 2); ctx.stroke();

  // two equal-time wedges: perihelion (M≈0) and aphelion (M≈π)
  drawWedge(ctx, -DM / 2, sun, a, b, cx, cy, "rgba(99,211,240,0.30)");
  drawWedge(ctx, Math.PI - DM / 2, sun, a, b, cx, cy, "rgba(201,139,255,0.30)");

  // Sun
  const g = ctx.createRadialGradient(sun[0], sun[1], 2, sun[0], sun[1], 22);
  g.addColorStop(0, "#fff"); g.addColorStop(0.35, "#ffcf6b"); g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sun[0], sun[1], 22, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffcf6b"; ctx.beginPath(); ctx.arc(sun[0], sun[1], 9, 0, Math.PI * 2); ctx.fill();

  // planet at current M
  const E = solveE(M, ECC);
  const p = ellipsePt(E, a, b, cx, cy);
  ctx.strokeStyle = "rgba(99,211,240,0.6)"; ctx.lineWidth = 1.2; ctx.setLineDash([4, 4]);
  ctx.beginPath(); ctx.moveTo(sun[0], sun[1]); ctx.lineTo(p[0], p[1]); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = "#4a8fd4"; ctx.beginPath(); ctx.arc(p[0], p[1], 7, 0, Math.PI * 2); ctx.fill();

  // labels
  ctx.font = `12px ${mono}`; ctx.textAlign = "center";
  ctx.fillStyle = C.cool; ctx.fillText("A", sun[0] + (a - c) * 0.5, cy + 4);
  ctx.fillStyle = C.violet; ctx.fillText("A", sun[0] - (a + c) * 0.5, cy + 4);
}

export function EqualAreas() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 340;
  const canvasRef = useRef(null);
  const [playing, setPlaying] = useState(!reduceMotion);
  const mRef = useRef(0);
  const [rel, setRel] = useState(1);
  const cw = Math.min(w, 760);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, 0.4); return; }
    let raf;
    const loop = () => {
      if (playing) mRef.current += 0.018;
      const M = mRef.current;
      const E = solveE(M, ECC);
      // instantaneous speed ∝ 1/r ; r = a(1 - e cosE); normalise so peri ≈ high
      const r = 1 - ECC * Math.cos(E);
      setRel(+(1 / r).toFixed(2));
      draw(ctx, cw, H, M);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, playing]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 03</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 12 }}>
          <span style={{ fontFamily: mono, fontSize: 31, color: C.sun }}>{rel.toFixed(2)}×</span>
          <span style={{ color: C.muted, fontSize: 15 }}>{t.speedNow}</span>
        </div>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{t.threadText}</p>
        </div>
        <div style={styles.fateBox}>
          <div style={{ ...styles.fateLabel, color: C.sun }}>{t.speed}</div>
          <p style={styles.keyTermText}>{t.speedText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>
        <canvas ref={canvasRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        <div style={{ display: "flex", gap: 16, fontFamily: mono, fontSize: 12.5, marginTop: 8, flexWrap: "wrap" }}>
          <span style={{ color: C.cool }}>■ {t.fast}</span>
          <span style={{ color: C.violet }}>■ {t.slow}</span>
          <span style={{ color: C.muted }}>▨ {t.equalArea}</span>
        </div>
        {!reduceMotion && (
          <div style={styles.controlBar}>
            <button style={styles.iconBtn} onClick={() => setPlaying((p) => !p)}>{playing ? t.pause : t.play}</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EqualAreas;
