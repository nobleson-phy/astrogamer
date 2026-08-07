/* ============================================================
   STATION 6 — GEOCENTRIC → HELIOCENTRIC
   Toggle the two great world-models: Earth at the centre
   (Ptolemy) versus the Sun at the centre (Copernicus). A small
   parallax demo shows why the ancient Greeks kept Earth still:
   they could not detect the tiny shift of nearby stars.
   Grounded in Ch.2 §2.2 & §2.4.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { clamp, useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const MODES = [
  { id: "geo", label: { en: "Geocentric (Ptolemy)", ja: "地球中心説（プトレマイオス）" } },
  { id: "helio", label: { en: "Heliocentric (Copernicus)", ja: "太陽中心説（コペルニクス）" } },
];

const STR = {
  en: {
    title: "Two models of the cosmos",
    kind: "From Earth-centred to Sun-centred",
    lede: "For over a thousand years, Earth sat at the centre of everything. Toggle the models — then see the parallax test that seemed, at the time, to settle the question.",
    thread: "THE GREAT DEBATE",
    threadTexts: {
      geo: "The geocentric model placed Earth motionless at the centre, with the Sun, Moon and planets circling it. It dominated Western thought until the Renaissance.",
      helio: "Copernicus proposed that the Sun sits at the centre and Earth is just another planet circling it — displacing humanity from the middle of the cosmos.",
    },
    ptolemy: "PTOLEMY'S ALMAGEST",
    ptolemyText: "Ptolemy's Almagest was the authoritative geocentric text for over a thousand years.",
    copernicus: "COPERNICUS",
    copernicusText: "Copernicus proposed the heliocentric model — Earth is a planet, and all planets circle the Sun.",
    shift: "THE DEEPER SHIFT",
    shiftText: "The real revolution was philosophical: abandoning the idea that humans and Earth are the central focus of the cosmos.",
    parallaxTitle: "Why the Greeks kept Earth still",
    parallaxText: "Aristotle argued Earth must be stationary because stellar parallax could not be detected with the unaided eye — if Earth moved, nearby stars should appear to shift against the far ones.",
    moveEarth: "Move Earth to the other side",
    jan: "Earth in January", jul: "Earth in July",
    nearStar: "nearby star", far: "distant stars",
    modelLabel: "The model", parallaxLabel: "The parallax test",
  },
  ja: {
    title: "宇宙の二つのモデル",
    kind: "地球中心から太陽中心へ",
    lede: "千年以上ものあいだ、地球はすべての中心にありました。モデルを切り替え——そして当時この問いに決着をつけたと思われた「視差」の検証を見よう。",
    thread: "大論争",
    threadTexts: {
      geo: "地球中心説は、地球を動かない中心に置き、太陽・月・惑星がそのまわりを回るとしました。ルネサンスまで西洋の思想を支配しました。",
      helio: "コペルニクスは、太陽が中心にあり、地球もそのまわりを回るただの惑星の一つだと提唱しました——人類を宇宙の中心から追いやったのです。",
    },
    ptolemy: "プトレマイオスの『アルマゲスト』",
    ptolemyText: "プトレマイオスの『アルマゲスト』は、千年以上にわたり地球中心説を支える権威ある書でした。",
    copernicus: "コペルニクス",
    copernicusText: "コペルニクスは太陽中心説を提唱しました——地球は惑星の一つであり、すべての惑星が太陽のまわりを回る、と。",
    shift: "より深い転換",
    shiftText: "本当の革命は哲学的なものでした——人類と地球が宇宙の中心だという考えを手放したのです。",
    parallaxTitle: "ギリシャ人が地球を動かさなかった理由",
    parallaxText: "アリストテレスは、肉眼では恒星の年周視差が検出できないことから、地球は動いていないはずだと論じました——もし地球が動くなら、近い星は遠い星に対してずれて見えるはずだからです。",
    moveEarth: "地球を反対側へ動かす",
    jan: "1月の地球", jul: "7月の地球",
    nearStar: "近い星", far: "遠い星々",
    modelLabel: "モデル", parallaxLabel: "視差の検証",
  },
};

const PLANETS = {
  geo: [
    { r: 0.16, w: 1.6, tint: "#cfcfcf", size: 3 },   // Moon
    { r: 0.30, w: 1.0, tint: "#ffcf6b", size: 6 },   // Sun
    { r: 0.44, w: 0.7, tint: "#ff9a6b", size: 4 },   // Mars
    { r: 0.58, w: 0.5, tint: "#e0c090", size: 5 },   // Jupiter
  ],
  helio: [
    { r: 0.16, w: 1.6, tint: "#c98b6b", size: 3 },   // Mercury
    { r: 0.26, w: 1.2, tint: "#e6c67a", size: 4 },   // Venus
    { r: 0.38, w: 1.0, tint: "#4a8fd4", size: 4.5 }, // Earth
    { r: 0.52, w: 0.7, tint: "#ff9a6b", size: 4 },   // Mars
  ],
};

function drawModel(ctx, cw, H, mode, t) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2;
  const R = Math.min(cw, H) * 0.46;
  // centre body
  if (mode === "geo") {
    ctx.fillStyle = "#4a8fd4"; ctx.beginPath(); ctx.arc(cx, cy, 10, 0, 7); ctx.fill();
    ctx.strokeStyle = "#7fb4ea"; ctx.lineWidth = 1; ctx.stroke();
  } else {
    const g = ctx.createRadialGradient(cx, cy, 2, cx, cy, 16);
    g.addColorStop(0, "#fff6d8"); g.addColorStop(0.5, "#ffcf6b"); g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 16, 0, 7); ctx.fill();
    ctx.fillStyle = "#ffcf6b"; ctx.beginPath(); ctx.arc(cx, cy, 9, 0, 7); ctx.fill();
  }
  for (const p of PLANETS[mode]) {
    const rr = p.r * R;
    ctx.strokeStyle = "rgba(140,170,220,0.28)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 7); ctx.stroke();
    const a = t * p.w;
    ctx.fillStyle = p.tint;
    ctx.beginPath(); ctx.arc(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, p.size, 0, 7); ctx.fill();
  }
}

function drawParallax(ctx, cw, H, side, lang) {
  ctx.clearRect(0, 0, cw, H);
  const t = STR[lang];
  const cx = cw / 2;
  const earthY = H - 26;
  const nearY = H * 0.46;
  const bgY = 24;
  const earthX = side === 0 ? cx - cw * 0.22 : cx + cw * 0.22;

  // far background stars
  const bgStars = [];
  for (let i = 0; i < 9; i++) { const x = 30 + (i / 8) * (cw - 60); bgStars.push(x); ctx.fillStyle = "rgba(233,237,247,0.6)"; ctx.beginPath(); ctx.arc(x, bgY, 2, 0, 7); ctx.fill(); }
  ctx.font = `11px ${mono}`; ctx.fillStyle = "rgba(174,183,210,0.7)"; ctx.fillText(t.far, 30, bgY - 8);

  // near star
  ctx.fillStyle = "#ffcf6b"; ctx.beginPath(); ctx.arc(cx, nearY, 4.5, 0, 7); ctx.fill();
  ctx.fillStyle = "#ffcf6b"; ctx.fillText(t.nearStar, cx + 10, nearY + 4);

  // Earth
  ctx.fillStyle = "#4a8fd4"; ctx.beginPath(); ctx.arc(earthX, earthY, 6, 0, 7); ctx.fill();
  ctx.fillStyle = "rgba(174,183,210,0.85)"; ctx.fillText(side === 0 ? t.jan : t.jul, earthX - 20, earthY + 18);

  // sight line Earth → near star → background
  const dx = cx - earthX, dy = nearY - earthY;
  const scale = (bgY - earthY) / dy;
  const hitX = earthX + dx * scale;
  ctx.strokeStyle = "rgba(255,207,107,0.6)"; ctx.lineWidth = 1.4; ctx.setLineDash([5, 5]);
  ctx.beginPath(); ctx.moveTo(earthX, earthY); ctx.lineTo(hitX, bgY); ctx.stroke(); ctx.setLineDash([]);
  // where the near star appears projected
  ctx.strokeStyle = "#ff7a6b"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(hitX, bgY, 6, 0, 7); ctx.stroke();
}

export function Models() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const cw = Math.min(w, 760);
  const H1 = 320, H2 = 200;
  const modelRef = useRef(null);
  const parRef = useRef(null);
  const [mode, setMode] = useState("geo");
  const [side, setSide] = useState(0);

  useEffect(() => {
    const canvas = modelRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, cw, H1);
    if (reduceMotion) { drawModel(ctx, cw, H1, mode, 1.2); return; }
    let raf, tt = 0;
    const loop = () => { tt += 0.02; drawModel(ctx, cw, H1, mode, tt); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, mode]);

  useEffect(() => {
    const canvas = parRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, cw, H2);
    drawParallax(ctx, cw, H2, side, lang);
  }, [cw, side, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 06</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{t.threadTexts[mode]}</p>
        </div>
        <div style={styles.fateBox}>
          <div style={{ ...styles.fateLabel, color: C.sun }}>{t.ptolemy}</div>
          <p style={styles.factText}>{t.ptolemyText}</p>
        </div>
        <div style={{ ...styles.fateBox, background: "rgba(99,211,240,0.06)", borderColor: C.borderBright }}>
          <div style={{ ...styles.fateLabel, color: C.cool }}>{t.copernicus}</div>
          <p style={styles.factText}>{t.copernicusText}</p>
        </div>
        <div style={{ ...styles.pathBox, marginTop: 14 }}>
          <div style={{ ...styles.fateLabel, color: C.violet }}>{t.shift}</div>
          <p style={{ ...styles.keyTermText, margin: 0 }}>{t.shiftText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>
        <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginBottom: 6 }}>{t.modelLabel}</div>
        <div style={styles.pickerRow}>
          {MODES.map((m) => (
            <button key={m.id} onClick={() => setMode(m.id)}
              style={{ ...styles.chip, ...(mode === m.id ? styles.chipOn : {}) }}>{tr(m.label, lang)}</button>
          ))}
        </div>
        <canvas ref={modelRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)", marginTop: 12 }} />

        <div style={{ ...styles.pathBox, marginTop: 18 }}>
          <div style={styles.fateLabel}>{t.parallaxTitle}</div>
          <p style={{ ...styles.keyTermText, margin: 0 }}>{t.parallaxText}</p>
        </div>
        <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, margin: "12px 0 6px" }}>{t.parallaxLabel}</div>
        <canvas ref={parRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        <div style={styles.controlBar}>
          <button style={styles.iconBtn} onClick={() => setSide((s) => (s === 0 ? 1 : 0))}>{t.moveEarth}</button>
        </div>
      </div>
    </div>
  );
}

export default Models;
