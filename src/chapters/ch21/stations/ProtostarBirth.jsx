/* ============================================================
   STATION 2 — BIRTH OF A PROTOSTAR
   A protostar shines not from fusion but from GRAVITATIONAL CONTRACTION.
   Its early collapse is near free-fall, but as it grows dense and opaque it
   traps the heat of contraction; rising internal gas pressure resists
   gravity and slows the collapse. On the H-R diagram it follows an
   EVOLUTIONARY TRACK down toward the main sequence — and massive protostars
   contract and ignite fusion far faster than low-mass ones.
   Grounded in Ch.21 §21.1-21.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Birth of a protostar",
    kind: "Collapse, heat, and a track",
    lede: "A protostar glows on gravity alone. Switch between its H-R evolutionary track — set by mass — and the collapse that slows itself as heat gets trapped.",
    thread: "THE STORY CONTINUES",
    threadText: "Before a star ever fuses hydrogen, it is a contracting ball of gas, converting the energy of its own collapse into light, feeling its way toward the main sequence.",
    trackKey: "AN EVOLUTIONARY TRACK SET BY MASS",
    trackText: "A protostar is not yet fusing hydrogen; it derives its energy from GRAVITATIONAL CONTRACTION. As it contracts, its temperature and luminosity change, tracing an EVOLUTIONARY TRACK across the H-R diagram down toward the main sequence. How long the journey takes depends sharply on mass: a massive protostar contracts and ignites core fusion in as little as thousands to a million years, while a low-mass star can take tens of millions of years to arrive.",
    collapseKey: "WHY THE FREE-FALL COLLAPSE SLOWS",
    collapseText: "At first the cloud collapses in near free-fall, racing inward under gravity. But as the forming protostar grows dense and OPAQUE, it can no longer let the heat of contraction radiate freely away — the heat is trapped, and the internal gas pressure climbs. That mounting pressure pushes back against gravity, slowing the rapid collapse into a far more gradual, hydrostatic contraction.",
    track: "Evolutionary track", collapse: "Collapse slows",
    mass: "Protostar mass", tms: "time to main sequence",
    fast: "massive → fast (thousands–10⁶ yr)", slow: "low-mass → slow (10⁷–10⁸ yr)",
    freefall: "free-fall", slowed: "opaque → heat trapped → pressure resists → slows",
    noteT: "A protostar lives on gravitational-contraction heat, tracing an H-R evolutionary track to the main sequence; massive stars get there far faster than low-mass ones.",
    noteC: "Early collapse is near free-fall, but once the protostar is dense and opaque it traps contraction heat, and rising gas pressure slows the collapse.",
  },
  ja: {
    title: "原始星の誕生",
    kind: "収縮・熱・そして経路",
    lede: "原始星は重力だけで輝きます。質量で決まるH–Rの進化の経路と、熱が閉じ込められて自ら遅くなる収縮を切り替えよう。",
    thread: "物語はつづく",
    threadText: "星が水素を融合する前、それは収縮するガスの球で、自らの収縮のエネルギーを光に変え、主系列へ手探りで進みます。",
    trackKey: "質量が決める進化の経路",
    trackText: "原始星はまだ水素を融合しておらず、重力収縮からエネルギーを得ます。収縮するにつれ温度と光度が変化し、H–R図を横切って主系列へ下る進化の経路を描きます。その旅の長さは質量に急激に依存します：大質量の原始星はわずか数千〜100万年で収縮し核融合に点火しますが、低質量の星は到達に数千万年かかることもあります。",
    collapseKey: "なぜ自由落下の収縮が遅くなるか",
    collapseText: "最初、雲はほぼ自由落下で収縮し、重力で内へ突進します。しかし、形成中の原始星が密で不透明になると、収縮の熱を自由に放射できなくなります——熱が閉じ込められ、内部のガス圧が上がります。その高まる圧力が重力に押し返し、急速な収縮をはるかに緩やかな静水圧的な収縮へと遅くします。",
    track: "進化の経路", collapse: "収縮が遅くなる",
    mass: "原始星の質量", tms: "主系列までの時間",
    fast: "大質量 → 速い（数千〜10⁶年）", slow: "低質量 → 遅い（10⁷〜10⁸年）",
    freefall: "自由落下", slowed: "不透明 → 熱が閉じ込められ → 圧力が抵抗 → 遅くなる",
    noteT: "原始星は重力収縮の熱で生き、H–Rの進化の経路を主系列へたどります。大質量星は低質量星よりはるかに速く到達します。",
    noteC: "初期の収縮はほぼ自由落下ですが、密で不透明になると収縮の熱を閉じ込め、上がるガス圧が収縮を遅くします。",
  },
};

function drawTrack(ctx, cw, H, M, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const x0 = 44, x1 = cw - 16, y0 = 20, y1 = H - 40;
  ctx.strokeStyle = "rgba(150,175,230,0.35)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0, y1); ctx.lineTo(x1, y1); ctx.stroke();
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`;
  ctx.textAlign = "left"; ctx.fillText(lang === "ja" ? "高温" : "hot", x0 + 2, y1 + 14); ctx.textAlign = "right"; ctx.fillText(lang === "ja" ? "低温" : "cool", x1, y1 + 14);
  ctx.save(); ctx.translate(x0 - 32, (y0 + y1) / 2); ctx.rotate(-Math.PI / 2); ctx.textAlign = "center"; ctx.fillText(lang === "ja" ? "光度 →" : "luminosity →", 0, 0); ctx.restore();
  const px = (tf) => x1 - tf * (x1 - x0), py = (lf) => y1 - lf * (y1 - y0);
  // main sequence
  ctx.strokeStyle = "rgba(255,207,107,0.3)"; ctx.lineWidth = 8; ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(px(0.92), py(0.92)); ctx.lineTo(px(0.12), py(0.12)); ctx.stroke(); ctx.lineCap = "butt";
  // protostar track: starts cool & luminous (upper right), curves down-left to the MS point set by mass
  const f = Math.min(Math.max((Math.log10(M) - Math.log10(0.3)) / (Math.log10(15) - Math.log10(0.3)), 0), 1);
  const msT = 0.14 + f * 0.78, msL = 0.14 + f * 0.78;
  ctx.strokeStyle = "#8fc0e8"; ctx.lineWidth = 2; ctx.setLineDash([4, 3]); ctx.beginPath();
  // bezier-ish: start upper-right, dip to MS
  const startT = 0.2, startL = 0.85;
  for (let s = 0; s <= 1; s += 0.05) { const tf = startT + (msT - startT) * s; const lf = startL + (msL - startL) * Math.pow(s, 1.6); const x = px(tf), y = py(lf); if (s === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
  ctx.stroke(); ctx.setLineDash([]);
  // MS arrival point
  const col = f > 0.7 ? "#9bb4ff" : f > 0.45 ? "#fff4e8" : "#ff9a52";
  ctx.fillStyle = col; ctx.beginPath(); ctx.arc(px(msT), py(msL), 6, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(px(msT), py(msL), 9, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(lang === "ja" ? "原始星" : "protostar", px(startT), py(startL) - 10);
  // time readout
  const yr = M >= 5 ? "~10⁵ yr" : M >= 1.5 ? "~10⁶–10⁷ yr" : "~10⁷–10⁸ yr";
  ctx.fillStyle = C.sun; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(`${M} M☉ · ${t.tms}: ${yr}`, cw / 2, H - 6);
}

function drawCollapse(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H * 0.4;
  const cyc = tt % 300, p = cyc / 300;
  // radius shrinks fast then slows (ease-out): free-fall then slowed
  const r = 90 - 70 * (1 - Math.pow(1 - p, 3));
  const opaque = p > 0.55;
  // infalling gas
  ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.lineWidth = 1;
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) { const ro = r + 30; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * ro, cy + Math.sin(a) * ro); ctx.lineTo(cx + Math.cos(a) * (r + 6), cy + Math.sin(a) * (r + 6)); ctx.stroke(); }
  // protostar core
  const g = ctx.createRadialGradient(cx, cy, 2, cx, cy, r);
  g.addColorStop(0, opaque ? "#ffd86b" : "rgba(180,160,200,0.7)"); g.addColorStop(1, "rgba(100,80,120,0.2)");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
  if (opaque) {
    // trapped heat glow
    ctx.fillStyle = "rgba(255,180,120,0.3)"; ctx.beginPath(); ctx.arc(cx, cy, r * 0.6, 0, Math.PI * 2); ctx.fill();
    // outward pressure arrows
    ctx.strokeStyle = "rgba(255,180,120,0.8)"; ctx.lineWidth = 1.5;
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) { ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * r * 0.5, cy + Math.sin(a) * r * 0.5); ctx.lineTo(cx + Math.cos(a) * (r - 4), cy + Math.sin(a) * (r - 4)); ctx.stroke(); }
  }
  ctx.fillStyle = opaque ? "#ff9a52" : "#a99ae0"; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(opaque ? t.slowed : t.freefall, cx, H - 12);
}

export function ProtostarBirth() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("track");
  const [M, setM] = useState(1);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (mode === "track") { drawTrack(ctx, cw, H, M, lang); return; }
    if (reduceMotion) { drawCollapse(ctx, cw, H, 150, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; drawCollapse(ctx, cw, H, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, mode, M, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 02</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{t.threadText}</p>
        </div>
        <div style={styles.fateBox}>
          <div style={{ ...styles.fateLabel, color: C.sun }}>{mode === "track" ? t.trackKey : t.collapseKey}</div>
          <p style={styles.keyTermText}>{mode === "track" ? t.trackText : t.collapseText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          {[["track", t.track], ["collapse", t.collapse]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        {mode === "track" && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "10px 0 4px" }}>
            <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.mass}</span>
            <input type="range" min="0.3" max="15" step="0.1" value={M}
              onChange={(e) => setM(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
            <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, width: 52, textAlign: "right" }}>{M} M☉</span>
          </div>
        )}

        <div style={{ marginTop: 8 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{mode === "track" ? t.noteT : t.noteC}</p>
      </div>
    </div>
  );
}

export default ProtostarBirth;
