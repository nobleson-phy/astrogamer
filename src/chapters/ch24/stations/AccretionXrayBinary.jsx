/* ============================================================
   STATION 6 — X-RAY BINARIES & ACCRETION
   A black hole emits no light of its own — so how do we see one? In a binary,
   the hole's gravity strips gas from a companion star. The gas cannot fall
   straight in; it spirals into an ACCRETION DISK, and friction heats the inner
   disk to millions of kelvin, blazing in flickering X-RAYS just before it
   crosses the horizon. CYGNUS X-1 — an unseen ~21 M☉ object orbiting an O
   supergiant — was the first strong case. (And note: swap the Sun for a 1 M☉
   black hole and Earth's orbit is unchanged — same mass, same far-field
   gravity.) Grounded in Ch.24.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "X-ray binaries & accretion",
    kind: "An accretion disk blazes — how we see the unseen",
    lede: "Gas torn from the companion spirals into a searing accretion disk. Watch the X-ray flicker as friction heats the inner disk to millions of kelvin — then toggle the thought experiment about Earth's orbit.",
    thread: "SEEING A DARKNESS",
    threadText: "A black hole gives off no light. Yet we have found dozens of them — because the matter falling in screams in X-rays before it disappears.",
    key: "AN ACCRETION DISK GLOWS IN X-RAYS — HOW WE SEE THE UNSEEN",
    keyText: "A black hole emits no light of its own, so we detect stellar-mass holes by their effect on a companion. In a close binary, the hole's gravity pulls gas off the neighboring star. Conserving angular momentum, the gas cannot plunge straight in — it spirals into a flattened ACCRETION DISK. Friction between the orbiting layers heats the inner disk to MILLIONS of kelvin, so hot it blazes in X-RAYS, which flicker as clumps spiral inward and cross the horizon. CYGNUS X-1 was the first strong case: an invisible object of about 21 M☉ orbiting a hot O supergiant, far too massive to be a neutron star. One subtlety: if you replaced the Sun with a 1 M☉ black hole, Earth's orbit would not change at all — the mass, and therefore the distant gravity, is exactly the same.",
    disk: "Accretion disk + X-ray flicker", orbit: "Sun → 1 M☉ black hole?",
    companion: "O supergiant companion", bh: "black hole", stream: "gas stream",
    xray: "X-ray flux", inner: "inner disk: millions of K",
    cygnus: "Cygnus X-1: unseen ~21 M☉ orbiting an O supergiant",
    orbitSame: "Same mass → same far-field gravity → Earth's 1-year orbit is UNCHANGED.",
    note: "Gas pulled from a companion forms an accretion disk; friction heats its inner edge to millions of K, radiating flickering X-rays — how we detect an invisible black hole (e.g. Cygnus X-1). Replacing the Sun with a 1 M☉ hole would leave Earth's orbit unchanged.",
  },
  ja: {
    title: "X線連星と降着",
    kind: "降着円盤が輝く——見えないものを見る方法",
    lede: "伴星から引きちぎられたガスが灼熱の降着円盤へ渦を巻く。摩擦が内側の円盤を数百万ケルビンに加熱し、X線がちらつくのを見よう——それから地球の軌道についての思考実験を切り替えよう。",
    thread: "暗闇を見る",
    threadText: "ブラックホールは光を出しません。それでも私たちは何十個も見つけてきました——落ち込む物質が、消える前にX線で叫ぶからです。",
    key: "降着円盤がX線で輝く——見えないものを見る方法",
    keyText: "ブラックホールは自ら光を出さないので、恒星質量の穴は伴星への影響で検出します。近接連星では、穴の重力が隣の星からガスを引き剥がします。角運動量を保存するため、ガスはまっすぐには落ち込めず——平たい降着円盤へ渦を巻きます。めぐる層どうしの摩擦が内側の円盤を数百万ケルビンに加熱し、あまりに熱いのでX線で輝きます。塊が内側へ渦を巻いて地平面を越えるにつれ、X線はちらつきます。はくちょう座X-1が最初の有力な例でした：熱いO型超巨星を回る約21 M☉の見えない天体で、中性子星であるにはあまりに重いものです。ひとつの機微：もし太陽を1 M☉のブラックホールに置き換えても、地球の軌道はまったく変わりません——質量が、したがって遠くの重力が、まったく同じだからです。",
    disk: "降着円盤＋X線のちらつき", orbit: "太陽 → 1 M☉ブラックホール？",
    companion: "O型超巨星の伴星", bh: "ブラックホール", stream: "ガスの流れ",
    xray: "X線フラックス", inner: "内側の円盤：数百万K",
    cygnus: "はくちょう座X-1：O型超巨星を回る見えない約21 M☉",
    orbitSame: "同じ質量 → 同じ遠方の重力 → 地球の1年の軌道は変わらない。",
    note: "伴星から引かれたガスが降着円盤を作り、摩擦が内縁を数百万Kに加熱してちらつくX線を放射します——見えないブラックホール（例：はくちょう座X-1）を検出する方法です。太陽を1 M☉の穴に置き換えても地球の軌道は変わりません。",
  },
};

function drawDisk(ctx, cw, H, tt, lang, flickRef) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cxC = cw * 0.80, cy = H * 0.44;
  const cxBH = cw * 0.40;

  // companion star
  const compR = 30;
  const gc = ctx.createRadialGradient(cxC, cy, 4, cxC, cy, compR);
  gc.addColorStop(0, "#dceaff"); gc.addColorStop(1, "#6f9fe0");
  ctx.fillStyle = gc; ctx.beginPath(); ctx.arc(cxC, cy, compR, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#bcd6ff"; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.companion, cxC, cy + compR + 16);

  // gas stream
  ctx.strokeStyle = "rgba(255,190,120,0.65)"; ctx.lineWidth = 2; ctx.setLineDash([4, 5]);
  ctx.beginPath(); ctx.moveTo(cxC - compR, cy); ctx.quadraticCurveTo((cxBH + cxC) / 2, cy - 30, cxBH + 44, cy - 6); ctx.stroke();
  ctx.setLineDash([]);

  // accretion disk (ellipse of hot particles)
  const diskRx = 60, diskRy = 22;
  ctx.save(); ctx.translate(cxBH, cy);
  for (let k = 0; k < 90; k++) {
    const a = (k / 90) * Math.PI * 2 + tt * 0.06;
    const rfac = 0.4 + (k % 9) / 9 * 0.6;
    const x = Math.cos(a) * diskRx * rfac;
    const y = Math.sin(a) * diskRy * rfac;
    // inner = hotter (white/blue), outer = cooler (orange)
    const heat = 1 - rfac;
    const col = heat > 0.6 ? "rgba(220,235,255,0.9)" : heat > 0.3 ? "rgba(255,200,120,0.8)" : "rgba(255,130,70,0.7)";
    ctx.fillStyle = col;
    ctx.beginPath(); ctx.arc(x, y, 1.8, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();

  // black hole at center
  ctx.fillStyle = "#05060d"; ctx.beginPath(); ctx.arc(cxBH, cy, 13, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "rgba(255,180,80,0.5)"; ctx.lineWidth = 1.4;
  ctx.beginPath(); ctx.arc(cxBH, cy, 15, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.bh, cxBH, cy + 34);

  // X-ray flicker bar (bottom)
  const flick = 0.5 + 0.5 * Math.sin(tt * 0.3) * Math.sin(tt * 0.11 + 1);
  flickRef.current = flick;
  const bx = 20, bw = cw - 40, by = H - 20;
  ctx.fillStyle = "rgba(150,175,230,0.2)"; ctx.fillRect(bx, by, bw, 7);
  ctx.fillStyle = C.cool; ctx.fillRect(bx, by, bw * flick, 7);
  ctx.fillStyle = C.cool; ctx.font = `11px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(`${t.xray}`, bx, by - 6);
  ctx.fillStyle = "#dceaff"; ctx.textAlign = "right"; ctx.font = `10.5px ${mono}`;
  ctx.fillText(t.inner, cw - 20, 20);
}

function drawOrbit(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.5, cy = H * 0.5;
  const aRx = Math.min(cw * 0.32, 150), aRy = aRx * 0.62;

  // orbit ellipse
  ctx.strokeStyle = "rgba(150,180,240,0.4)"; ctx.lineWidth = 1.2; ctx.setLineDash([5, 5]);
  ctx.beginPath(); ctx.ellipse(cx, cy, aRx, aRy, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.setLineDash([]);

  // central: 1 M☉ black hole (where the Sun was)
  ctx.fillStyle = "#05060d"; ctx.beginPath(); ctx.arc(cx, cy, 12, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "rgba(255,180,80,0.6)"; ctx.lineWidth = 1.4;
  ctx.beginPath(); ctx.arc(cx, cy, 14, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText("1 M☉ ·", cx, cy - 22);

  // Earth on the orbit
  const a = tt * 0.03;
  const ex = cx + Math.cos(a) * aRx, ey = cy + Math.sin(a) * aRy;
  const g = ctx.createRadialGradient(ex - 2, ey - 2, 1, ex, ey, 7);
  g.addColorStop(0, "#8fd0ff"); g.addColorStop(1, "#2a63a8");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(ex, ey, 7, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = C.good; ctx.font = `12px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.orbitSame, cw / 2, H - 14);
}

export function AccretionXrayBinary() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 290;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("disk");
  const modeRef = useRef("disk"); modeRef.current = mode;
  const flickRef = useRef(0);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) {
      if (mode === "disk") drawDisk(ctx, cw, H, 20, lang, flickRef); else drawOrbit(ctx, cw, H, 40, lang);
      return;
    }
    let raf, tt = 0;
    const loop = () => {
      tt += 1;
      if (modeRef.current === "disk") drawDisk(ctx, cw, H, tt, lang, flickRef); else drawOrbit(ctx, cw, H, tt, lang);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, mode, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 06</div>
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

        <div style={styles.pickerRow}>
          <button onClick={() => setMode("disk")} style={{ ...styles.chip, ...(mode === "disk" ? styles.chipOn : {}) }}>{t.disk}</button>
          <button onClick={() => setMode("orbit")} style={{ ...styles.chip, ...(mode === "orbit" ? styles.chipOn : {}) }}>{t.orbit}</button>
        </div>

        <div style={{ marginTop: 10 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <div style={{ fontFamily: mono, fontSize: 11.5, color: C.cool, marginTop: 8 }}>{t.cygnus}</div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default AccretionXrayBinary;
