/* ============================================================
   STATION 2 — ANATOMY OF AN ELLIPSE
   An ellipse has two foci (the Sun sits at one, the other is empty);
   the semimajor axis sets its size; eccentricity sets how flattened
   it is. Perihelion = closest to the Sun (fastest); aphelion = farthest.
   Drag the eccentricity slider and watch every part update live.
   Grounded in Ch.3 §3.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel, Row } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Anatomy of an ellipse",
    kind: "Foci, axes, perihelion & aphelion",
    lede: "An ellipse is a slightly flattened circle. Slide the eccentricity from 0 (a perfect circle) toward 1 (very flattened) and watch the two foci pull apart — the Sun always stays at one of them.",
    thread: "THE ANATOMY",
    threadText: "Every planetary orbit is built from the same parts: two foci with the Sun at one and nothing at the other, a semimajor axis that fixes the orbit's size, and an eccentricity that fixes its shape.",
    ecc: "Eccentricity (e)",
    slide: "Slide the eccentricity:",
    semi: "Semimajor axis (a)", peri: "Perihelion", aph: "Aphelion",
    shapeCircle: "e = 0 → a perfect circle. Both foci sit together at the centre.",
    shapeFlat: "The larger e is, the more flattened — and the more the Sun sits off to one side.",
    defs: "KEY TERMS",
    defsText: "Semimajor axis: half the longest diameter — it sets the orbit's size. Perihelion: the point closest to the Sun, where the planet moves fastest. Aphelion: the farthest point, where it moves slowest.",
    sun: "Sun", empty: "empty focus", au: "AU",
  },
  ja: {
    title: "楕円の解剖",
    kind: "焦点・軸・近日点と遠日点",
    lede: "楕円は、わずかにつぶれた円です。離心率を0（完全な円）から1（大きくつぶれた形）へ動かして、二つの焦点が離れていく様子を見よう——太陽はつねにその一方にとどまります。",
    thread: "その構造",
    threadText: "どの惑星軌道も同じ部品からできています：太陽のある焦点と何もない焦点の二つ、軌道の大きさを決める半長軸、そして形を決める離心率です。",
    ecc: "離心率（e）",
    slide: "離心率を動かそう：",
    semi: "半長軸（a）", peri: "近日点", aph: "遠日点",
    shapeCircle: "e = 0 → 完全な円。二つの焦点は中心で重なります。",
    shapeFlat: "e が大きいほどつぶれ——太陽はより端に寄っていきます。",
    defs: "重要用語",
    defsText: "半長軸：最も長い直径の半分——軌道の大きさを決めます。近日点：太陽に最も近い点で、惑星が最も速く動く場所。遠日点：最も遠い点で、最も遅く動く場所。",
    sun: "太陽", empty: "空の焦点", au: "天文単位",
  },
};

export function Ellipse() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 320;
  const canvasRef = useRef(null);
  const [e, setE] = useState(30); // eccentricity ×100, 0..85
  const cw = Math.min(w, 760);
  const ecc = e / 100;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, cw, H);
    ctx.clearRect(0, 0, cw, H);
    const cx = cw / 2, cy = H / 2;
    const a = Math.min(cw * 0.36, 210);
    const b = a * Math.sqrt(1 - ecc * ecc);
    const c = a * ecc; // focus distance from centre
    const fx = cx + c; // Sun focus (right → perihelion on right)
    const gx = cx - c; // empty focus

    // ellipse
    ctx.strokeStyle = C.sun; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(cx, cy, a, b, 0, 0, Math.PI * 2); ctx.stroke();

    // semimajor axis (centre → perihelion end)
    ctx.strokeStyle = "rgba(99,211,240,0.7)"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + a, cy); ctx.stroke();
    ctx.fillStyle = C.cool; ctx.font = `13px ${mono}`; ctx.textAlign = "center";
    ctx.fillText("a", cx + a / 2, cy - 8);

    // full major axis (dashed)
    ctx.strokeStyle = "rgba(140,170,220,0.3)"; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(cx - a, cy); ctx.lineTo(cx - a * 0.02, cy); ctx.stroke(); ctx.setLineDash([]);

    // empty focus
    ctx.strokeStyle = C.faint; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(gx, cy, 4, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = C.faint; ctx.font = `12px ${mono}`;
    ctx.fillText(t.empty, gx, cy - 14);

    // Sun at focus
    const g = ctx.createRadialGradient(fx, cy, 2, fx, cy, 22);
    g.addColorStop(0, "#fff"); g.addColorStop(0.35, "#ffcf6b"); g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(fx, cy, 22, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#ffcf6b"; ctx.beginPath(); ctx.arc(fx, cy, 9, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#ffcf6b"; ctx.font = `12px ${mono}`;
    ctx.fillText(t.sun, fx, cy + 26);

    // perihelion (nearest Sun, on the Sun side)
    ctx.fillStyle = "#4a8fd4"; ctx.beginPath(); ctx.arc(cx + a, cy, 7, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.text; ctx.font = `12px ${mono}`; ctx.textAlign = "right";
    ctx.fillText(t.peri, cx + a - 6, cy - 12);
    // aphelion
    ctx.fillStyle = "#9fb4e0"; ctx.beginPath(); ctx.arc(cx - a, cy, 6, 0, Math.PI * 2); ctx.fill();
    ctx.textAlign = "left";
    ctx.fillText(t.aph, cx - a + 6, cy - 12);
  }, [cw, ecc, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 02</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 12 }}>
          <span style={{ fontFamily: mono, fontSize: 31, color: C.sun }}>{ecc.toFixed(2)}</span>
          <span style={{ color: C.muted, fontSize: 15 }}>{t.ecc}</span>
        </div>
        <dl style={styles.dl}>
          <Row k={t.ecc} v={ecc.toFixed(2)} />
          <Row k={t.semi} v={`1.00 ${t.au}`} />
          <Row k={t.peri} v={<span style={{ color: C.cool }}>{(1 - ecc).toFixed(2)} {t.au}</span>} />
          <Row k={t.aph} v={<span style={{ color: C.faint }}>{(1 + ecc).toFixed(2)} {t.au}</span>} />
        </dl>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{t.threadText}</p>
        </div>
        <div style={styles.fateBox}>
          <div style={{ ...styles.fateLabel, color: C.sun }}>{t.defs}</div>
          <p style={styles.keyTermText}>{t.defsText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>
        <canvas ref={canvasRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginTop: 10 }}>{t.slide}</div>
        <input type="range" min={0} max={85} step={1} value={e} onChange={(ev) => setE(parseInt(ev.target.value, 10))} style={styles.range} />
        <div style={styles.rangeEnds}><span>0.00</span><span>0.85</span></div>
        <p style={styles.note}>{ecc < 0.02 ? t.shapeCircle : t.shapeFlat}</p>
      </div>
    </div>
  );
}

export default Ellipse;
