/* ============================================================
   STATION 7 — ANGULAR MOMENTUM
   Angular momentum = mass × velocity × distance from the spin centre,
   and it is conserved. Pull the mass inward (smaller distance) and the
   body must spin faster — the figure-skater effect, and the same reason
   planets speed up as they near the Sun.
   Grounded in Ch.3 §3.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel, Row } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Angular momentum",
    kind: "Pull in, spin faster",
    lede: "Slide the skater's arms inward. Nothing pushes them faster — yet the spin speeds up on its own, because angular momentum has to stay the same.",
    thread: "CONSERVED",
    threadText: "Angular momentum is an object's mass times its velocity times its distance from the spin centre. With no outside twist, that product stays constant. So if the distance shrinks, the speed must grow to compensate.",
    skater: "THE SKATER — AND THE PLANET",
    skaterText: "A figure skater pulls in their arms to spin faster and flings them out to slow down. A planet does the same: as it swings in toward the Sun, its distance drops and it speeds up — exactly Kepler's second law.",
    arms: "Arm distance (r)", spin: "Spin rate (ω)",
    slide: "Pull the arms in:", wide: "arms out", tight: "arms in",
    conserved: "L = m·v·r",
  },
  ja: {
    title: "角運動量",
    kind: "引き寄せれば、速く回る",
    lede: "スケーターの腕を内側へ動かそう。誰も速く押していないのに、回転はひとりでに速くなります——角運動量が変わらないままでいなければならないからです。",
    thread: "保存される",
    threadText: "角運動量とは、物体の質量 × 速度 × 回転中心からの距離です。外からのひねりがなければ、この積は一定に保たれます。だから距離が縮めば、それを補うように速度が増します。",
    skater: "スケーター——そして惑星",
    skaterText: "フィギュアスケーターは腕を引き寄せて速く回り、腕を広げて減速します。惑星も同じです：太陽に向かって内へ振れると距離が縮み、速くなります——まさにケプラーの第二法則です。",
    arms: "腕の距離（r）", spin: "回転の速さ（ω）",
    slide: "腕を引き寄せよう：", wide: "腕を広げる", tight: "腕を縮める",
    conserved: "L = m·v·r",
  },
};

/* L = m v r constant; v = ω r ⇒ ω ∝ 1/r².
   TOP-DOWN view: we look straight down the spin axis, so the skater is a
   body disk with arms reaching out radially and a nose marker showing the
   rotation. Arms are straight when out and fold at the elbow when pulled in. */
function draw(ctx, cw, H, r, angle) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2 + 10;
  // ice, seen from above
  ctx.strokeStyle = "rgba(120,150,210,0.2)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(cx, cy, 96, 0, Math.PI * 2); ctx.stroke();

  const armLen = 20 + r * 74; // r 0..1 → arm reach (hand distance from the axis)

  // spin-rate blur ring (trail of the hands), drawn under the skater
  ctx.strokeStyle = `rgba(99,211,240,${Math.min(0.55, 0.08 / (r * r + 0.05))})`;
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(cx, cy, armLen, 0, Math.PI * 2); ctx.stroke();

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);

  // arms: two-segment (shoulder → elbow → hand) reaching out along the plane.
  // Straight when out; as the hand is pulled in the elbow bends (angle closes)
  // instead of the arm shortening. The hand stays at reach = armLen, so the
  // mass's distance from the spin axis (and thus ω ∝ 1/r²) is unchanged.
  ctx.strokeStyle = "#c98bff"; ctx.lineWidth = 6; ctx.lineCap = "round"; ctx.lineJoin = "round";
  const shoulderX = 10, L1 = 42, L2 = 42; // upper arm + forearm; sum = max reach
  const drawArm = (sign) => {
    const sx = sign * shoulderX, sy = 0;   // shoulder (in the horizontal plane)
    const hx = sign * armLen, hy = 0;       // hand (mass) at the reach distance
    const D = Math.abs(hx - sx);
    let ex, ey;
    if (D >= L1 + L2) {                      // fully extended → straight
      ex = sx + sign * L1; ey = 0;
    } else {                                 // fold at the elbow (bends aside)
      const xe = (D * D + L1 * L1 - L2 * L2) / (2 * D);
      const ye = Math.sqrt(Math.max(0, L1 * L1 - xe * xe));
      ex = sx + sign * xe; ey = ye;          // elbow swings to one side
    }
    ctx.strokeStyle = "#c98bff";
    ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.lineTo(hx, hy); ctx.stroke();
    ctx.fillStyle = "#c98bff"; ctx.beginPath(); ctx.arc(ex, ey, 3.4, 0, Math.PI * 2); ctx.fill(); // elbow
    ctx.fillStyle = "#63d3f0"; ctx.beginPath(); ctx.arc(hx, hy, 7, 0, Math.PI * 2); ctx.fill();   // hand mass
  };
  drawArm(1); drawArm(-1);

  // body seen from above: shoulders/torso disk + head, drawn over the shoulders
  ctx.fillStyle = "#c98bff"; ctx.beginPath(); ctx.arc(0, 0, 17, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#e7d3ff"; ctx.beginPath(); ctx.arc(0, 0, 10, 0, Math.PI * 2); ctx.fill();
  // nose / facing marker so the spin is visible
  ctx.fillStyle = "#ffd23d"; ctx.beginPath(); ctx.arc(0, -13, 3.4, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

export function AngularMomentum() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canvasRef = useRef(null);
  const [r100, setR100] = useState(90); // arm distance ×100, 20..100
  const angleRef = useRef(0);
  const cw = Math.min(w, 760);
  const r = r100 / 100;
  const omega = 1 / (r * r); // relative spin rate (arms out r=1 → ω=1)

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, r, 0.6); return; }
    let raf;
    const loop = () => {
      angleRef.current += 0.02 * omega;
      draw(ctx, cw, H, r, angleRef.current);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, r, omega]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 07</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 12 }}>
          <span style={{ fontFamily: mono, fontSize: 31, color: C.sun }}>{omega.toFixed(1)}×</span>
          <span style={{ color: C.muted, fontSize: 15 }}>{t.spin}</span>
        </div>
        <dl style={styles.dl}>
          <Row k={t.arms} v={`${r.toFixed(2)}`} />
          <Row k={t.spin} v={<span style={{ color: C.cool }}>{omega.toFixed(2)}×</span>} />
          <Row k={t.conserved} v={<span style={{ color: C.faint }}>{lang === "ja" ? "一定" : "constant"}</span>} />
        </dl>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{t.threadText}</p>
        </div>
        <div style={styles.fateBox}>
          <div style={{ ...styles.fateLabel, color: C.sun }}>{t.skater}</div>
          <p style={styles.keyTermText}>{t.skaterText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>
        <canvas ref={canvasRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginTop: 10 }}>{t.slide}</div>
        {/* reversed feel: left = arms in (fast). We map slider value directly to r. */}
        <input type="range" min={20} max={100} step={1} value={r100} onChange={(e) => setR100(parseInt(e.target.value, 10))} style={styles.range} />
        <div style={styles.rangeEnds}><span>{t.tight}</span><span>{t.wide}</span></div>
      </div>
    </div>
  );
}

export default AngularMomentum;
