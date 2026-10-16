/* ============================================================
   STATION 5 — THE SINGULARITY & "NO HAIR"
   Inside the horizon, general relativity predicts all the mass collapses to a
   SINGULARITY — a point of zero volume and infinite density at the center.
   And from outside, a black hole is astonishingly simple: the NO-HAIR THEOREM
   says whatever fell in, the hole reveals only THREE properties — MASS, SPIN
   (angular momentum), and electrical CHARGE. Everything else is erased.
   Grounded in Ch.24.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp, lerp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Singularity & no hair",
    kind: "A point of infinite density; only three numbers remain",
    lede: "Adjust the three properties a black hole is allowed to have — mass, spin and charge. Everything else that ever fell in is erased; the cutaway shows the horizon and the singularity hidden within.",
    thread: "WHAT LIES WITHIN",
    threadText: "Cross the horizon and relativity points to a single, impossible destination at the center — and a strange simplicity seen from outside.",
    key: "A SINGULARITY WITHIN; ONLY MASS, SPIN & CHARGE REMAIN",
    keyText: "General relativity predicts that inside the event horizon, the collapsing matter cannot stop — it is crushed all the way down to a SINGULARITY, a central point of zero volume and infinite density where the known laws of physics break down. Yet seen from outside, a black hole is almost absurdly simple. The NO-HAIR THEOREM states that no matter what collapsed to form it — a star, a cloud, encyclopedias, antimatter — the finished black hole reveals only THREE measurable properties: its MASS, its SPIN (angular momentum), and its electrical CHARGE. Every other detail about what fell in is hidden forever behind the horizon. Two black holes with the same mass, spin and charge are utterly identical.",
    mass: "Mass", spin: "Spin", charge: "Charge",
    singularity: "singularity", horizon: "event horizon",
    erased: "composition, color, history — erased",
    note: "Inside the horizon, matter collapses to a singularity of infinite density. From outside, the no-hair theorem says a black hole reveals only three properties: mass, spin (angular momentum), and charge.",
  },
  ja: {
    title: "特異点と無毛",
    kind: "無限密度の一点；残るのは3つの数だけ",
    lede: "ブラックホールが持つことを許された3つの性質——質量・スピン・電荷——を調整しよう。かつて落ち込んだ他のすべては消され、断面図は地平面とその中に隠れた特異点を示します。",
    thread: "内側にあるもの",
    threadText: "地平面を越えると、相対論は中心のただひとつの、ありえない行き先を指し示します——そして外から見ると奇妙な単純さを。",
    key: "内に特異点；残るのは質量・スピン・電荷だけ",
    keyText: "一般相対論は、事象の地平面の内側では崩壊する物質が止まれないと予言します——それは中心の特異点まで押しつぶされます。体積ゼロ・密度無限の一点で、そこでは知られた物理法則が破綻します。それでも外から見ると、ブラックホールはあきれるほど単純です。無毛定理は、それを作るために何が崩壊したか——星でも、雲でも、百科事典でも、反物質でも——に関わらず、完成したブラックホールが明かす測定可能な性質はたった3つだけだと述べます：質量、スピン（角運動量）、そして電荷です。落ち込んだものの他のあらゆる詳細は、地平面の向こうに永遠に隠されます。質量・スピン・電荷が同じ2つのブラックホールは、まったく同一です。",
    mass: "質量", spin: "スピン", charge: "電荷",
    singularity: "特異点", horizon: "事象の地平面",
    erased: "組成・色・履歴——消去",
    note: "地平面の内側で、物質は密度無限の特異点へ崩壊します。外から見ると、無毛定理により、ブラックホールは質量・スピン（角運動量）・電荷の3つの性質しか明かしません。",
  },
};

function draw(ctx, cw, H, mass, spin, charge, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.5, cy = H * 0.5;
  const r = lerp(46, 96, mass);

  // outer accretion/charge field hints
  if (charge > 0.02) {
    ctx.strokeStyle = `rgba(99,211,240,${0.1 + charge * 0.3})`; ctx.lineWidth = 1;
    for (let k = 0; k < 6; k++) {
      const rr = r + 12 + k * 7;
      ctx.beginPath(); ctx.arc(cx, cy, rr, 0, Math.PI * 2); ctx.stroke();
    }
  }

  // spin arc arrows around horizon
  if (spin > 0.02) {
    ctx.strokeStyle = `rgba(201,139,255,${0.3 + spin * 0.5})`; ctx.lineWidth = 2;
    const sweep = lerp(0.3, 1.8, spin);
    const a0 = tt * 0.04 * (0.5 + spin);
    ctx.beginPath(); ctx.arc(cx, cy, r + 18, a0, a0 + sweep); ctx.stroke();
    // arrowhead
    const ae = a0 + sweep;
    const ex = cx + Math.cos(ae) * (r + 18), ey = cy + Math.sin(ae) * (r + 18);
    ctx.fillStyle = C.violet;
    ctx.beginPath();
    ctx.moveTo(ex, ey);
    ctx.lineTo(ex - 7 * Math.cos(ae - 1.1), ey - 7 * Math.sin(ae - 1.1));
    ctx.lineTo(ex - 7 * Math.cos(ae - 2.1), ey - 7 * Math.sin(ae - 2.1));
    ctx.closePath(); ctx.fill();
  }

  // horizon disc (cutaway: right half shows interior)
  ctx.fillStyle = "#05060d"; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = C.sun; ctx.lineWidth = 1.6; ctx.setLineDash([3, 4]);
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
  ctx.setLineDash([]);

  // faint funnel lines pointing to the singularity
  ctx.strokeStyle = "rgba(150,180,240,0.22)"; ctx.lineWidth = 1;
  for (let k = 0; k < 10; k++) {
    const a = (k / 10) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    ctx.lineTo(cx, cy);
    ctx.stroke();
  }

  // the singularity (bright dot, pulsing)
  const pr = 3 + Math.sin(tt * 0.12) * 1.2;
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 12);
  g.addColorStop(0, "#ffffff"); g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 12, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffffff"; ctx.beginPath(); ctx.arc(cx, cy, pr, 0, Math.PI * 2); ctx.fill();

  // labels (horizontal)
  ctx.fillStyle = "#ffffff"; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.singularity, cx, cy - 18);
  ctx.fillStyle = C.sun;
  ctx.fillText(t.horizon, cx, cy + r + 20 > H - 8 ? cy - r - 10 : cy + r + 20);
  ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`;
  ctx.fillText(t.erased, cw / 2, H - 10);
}

export function SingularityNoHair() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 300;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mass, setMass] = useState(0.5);
  const [spin, setSpin] = useState(0.4);
  const [charge, setCharge] = useState(0.2);
  const mRef = useRef(0.5); mRef.current = mass;
  const sRef = useRef(0.4); sRef.current = spin;
  const cRef = useRef(0.2); cRef.current = charge;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, mRef.current, sRef.current, cRef.current, 0, lang); return; }
    let raf, tt = 0;
    const loop = () => {
      tt += 1;
      draw(ctx, cw, H, mRef.current, sRef.current, cRef.current, tt, lang);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

  const slider = (label, color, val, set) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "4px 0" }}>
      <span style={{ fontFamily: mono, fontSize: 12, color, whiteSpace: "nowrap", width: 54 }}>{label}</span>
      <input type="range" min="0" max="1" step="0.01" value={val}
        onChange={(e) => set(parseFloat(e.target.value))} style={{ flex: 1, accentColor: color }} />
      <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, width: 44, textAlign: "right" }}>{Math.round(val * 100)}%</span>
    </div>
  );

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

        {slider(t.mass, C.sun, mass, setMass)}
        {slider(t.spin, C.violet, spin, setSpin)}
        {slider(t.charge, C.cool, charge, setCharge)}

        <div style={{ marginTop: 10 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default SingularityNoHair;
