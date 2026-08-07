/* ============================================================
   STATION 7 — GALILEO'S TELESCOPE
   Look through the eyepiece: the four moons of Jupiter (proof that
   not everything orbits Earth) and the full cycle of Venus's phases
   (impossible in Ptolemy's model, where Venus could only ever show
   crescents) — the observation fatal to geocentrism.
   Grounded in Ch.2 §2.4 (The Birth of Modern Astronomy).
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { clamp, useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const MODES = [
  { id: "jupiter", label: { en: "Jupiter's moons", ja: "木星の衛星" } },
  { id: "venus", label: { en: "Phases of Venus", ja: "金星の満ち欠け" } },
];
const VENUS_MODELS = [
  { id: "actual", label: { en: "What Galileo saw", ja: "ガリレオが見たもの" } },
  { id: "ptolemaic", label: { en: "Ptolemy predicted", ja: "プトレマイオスの予測" } },
];

const MOONS = [
  { a: 0.30, w: 1.9, tint: "#cfe3ff" }, // Io
  { a: 0.46, w: 1.3, tint: "#e6d6b0" }, // Europa
  { a: 0.64, w: 0.9, tint: "#cabf9e" }, // Ganymede
  { a: 0.86, w: 0.6, tint: "#b0a080" }, // Callisto
];

const STR = {
  en: {
    title: "Galileo's telescope",
    kind: "The observations that broke the old cosmos",
    lede: "In 1609 Galileo turned a telescope on the sky. Look through the eyepiece at what he found — and why it doomed the Earth-centred universe.",
    thread: "TESTING THE HEAVENS",
    threadTexts: {
      jupiter: "Galileo saw four moons orbiting Jupiter — plain proof that not everything in the heavens circles the Earth.",
      venus: "He watched Venus run through a full cycle of phases, right up to gibbous and full. In Ptolemy's model Venus could only ever show crescents — so this was fatal to geocentrism.",
    },
    jupiterFact: "FOUR MOONS OF JUPITER",
    jupiterText: "Galileo saw four moons orbiting Jupiter, proving that not everything orbits Earth.",
    venusFact: "THE PHASES OF VENUS",
    venusText: "Venus goes through a full cycle of phases — including gibbous and full. This is impossible in Ptolemy's model, where Venus would only ever show crescent phases.",
    method: "THE BIRTH OF MODERN SCIENCE",
    methodText: "Galileo pioneered testing hypotheses by observation and experiment — the beginning of modern science.",
    lineup: "Watch the moons swing from side to side of Jupiter, sometimes lining up.",
    cyclePos: "Position in orbit",
    play: "▶ Play", pause: "❚❚ Pause",
    onlyCrescent: "In Ptolemy's model Venus stays between Earth and the Sun, so it can only ever appear as a thin crescent — never gibbous or full.",
    fullCycle: "Seen from Earth, Venus swings from a large thin crescent to a small full disk — the whole cycle.",
    illum: "Illuminated",
  },
  ja: {
    title: "ガリレオの望遠鏡",
    kind: "古い宇宙観を打ち砕いた観測",
    lede: "1609年、ガリレオは望遠鏡を空へ向けました。接眼レンズをのぞいて、彼が見たもの——そしてそれがなぜ地球中心の宇宙を終わらせたのかを見よう。",
    thread: "天を検証する",
    threadTexts: {
      jupiter: "ガリレオは木星のまわりを回る四つの衛星を見ました——天のすべてが地球を回るわけではない、という明白な証拠です。",
      venus: "彼は金星が満ち欠けの全周期——半月から凸月、満月まで——をたどるのを観測しました。プトレマイオスの説では金星は三日月しか示せないため、これは地球中心説にとって致命的でした。",
    },
    jupiterFact: "木星の四つの衛星",
    jupiterText: "ガリレオは木星のまわりを回る四つの衛星を発見し、すべてが地球を回るわけではないと示しました。",
    venusFact: "金星の満ち欠け",
    venusText: "金星は満ち欠けの全周期——凸月や満月を含む——をたどります。これはプトレマイオスの説では不可能で、その説では金星は三日月しか示せません。",
    method: "近代科学の誕生",
    methodText: "ガリレオは観測と実験によって仮説を検証する方法を切り開きました——近代科学の始まりです。",
    lineup: "木星の左右へ振れる衛星を見よう。ときどき一直線に並びます。",
    cyclePos: "軌道上の位置",
    play: "▶ 再生", pause: "❚❚ 一時停止",
    onlyCrescent: "プトレマイオスの説では金星は地球と太陽のあいだにとどまるため、細い三日月にしか見えません——凸月や満月にはなりません。",
    fullCycle: "地球から見ると、金星は大きく細い三日月から小さな満月へと移ります——満ち欠けの全周期です。",
    illum: "照らされた割合",
  },
};

function eyepiece(ctx, cw, H) {
  const cx = cw / 2, cy = H / 2, r = Math.min(cw, H) / 2 - 6;
  ctx.save();
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.clip();
  ctx.fillStyle = "#02030a"; ctx.fillRect(0, 0, cw, H);
  return { cx, cy, r };
}
function eyepieceRing(ctx, cw, H) {
  const cx = cw / 2, cy = H / 2, r = Math.min(cw, H) / 2 - 6;
  ctx.restore();
  const g = ctx.createRadialGradient(cx, cy, r * 0.7, cx, cy, r);
  g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(1, "rgba(0,0,0,0.55)");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fill();
  ctx.strokeStyle = "rgba(180,140,80,0.5)"; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(cx, cy, r + 1, 0, 7); ctx.stroke();
  ctx.strokeStyle = "rgba(120,150,210,0.25)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, r - 4, 0, 7); ctx.stroke();
}

function drawJupiter(ctx, cw, H, t) {
  const { cx, cy, r } = eyepiece(ctx, cw, H);
  // faint stars
  for (let i = 0; i < 30; i++) { const x = (i * 89) % cw, y = (i * 47) % H; ctx.fillStyle = "rgba(233,237,247,0.25)"; ctx.beginPath(); ctx.arc(x, y, 0.7, 0, 7); ctx.fill(); }
  // Jupiter
  const g = ctx.createRadialGradient(cx - 4, cy - 4, 3, cx, cy, 20);
  g.addColorStop(0, "#f2e2c0"); g.addColorStop(1, "#c9a06a");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 18, 0, 7); ctx.fill();
  ctx.strokeStyle = "rgba(150,110,70,0.6)"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(cx - 15, cy - 5); ctx.lineTo(cx + 15, cy - 5); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx - 16, cy + 4); ctx.lineTo(cx + 16, cy + 4); ctx.stroke();
  // moons on an edge-on line
  for (const m of MOONS) {
    const x = cx + Math.sin(t * m.w) * m.a * (r - 20);
    ctx.fillStyle = m.tint; ctx.beginPath(); ctx.arc(x, cy, 3.2, 0, 7); ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.15)"; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, cy); ctx.stroke();
  }
  eyepieceRing(ctx, cw, H);
}

/* illuminated fraction f (0=new .. 1=full), lit on the right */
function drawPhaseDisk(ctx, cx, cy, r, f) {
  const HALF = Math.PI / 2;
  ctx.fillStyle = "#3a3320"; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fill();
  const term = r * (1 - 2 * f);
  ctx.fillStyle = "#ffe9a8";
  ctx.beginPath();
  ctx.arc(cx, cy, r, -HALF, HALF, false);
  ctx.ellipse(cx, cy, Math.abs(term), r, 0, HALF, -HALF, term > 0);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,207,107,0.5)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke();
}

function drawVenus(ctx, cw, H, vmodel, pos) {
  const { cx, cy, r } = eyepiece(ctx, cw, H);
  for (let i = 0; i < 24; i++) { const x = (i * 89) % cw, y = (i * 47) % H; ctx.fillStyle = "rgba(233,237,247,0.2)"; ctx.beginPath(); ctx.arc(x, y, 0.7, 0, 7); ctx.fill(); }
  let f, size;
  if (vmodel === "ptolemaic") {
    // Venus never past the Sun → only thin crescents; large (always relatively near)
    f = 0.05 + 0.18 * (0.5 + 0.5 * Math.sin(pos * Math.PI * 2)); // 0.05..0.23
    size = r * 0.62;
  } else {
    f = 0.5 - 0.5 * Math.cos(pos * Math.PI * 2); // 0..1 full cycle
    size = r * (0.32 + (1 - f) * 0.42); // crescent large (near), full small (far)
  }
  drawPhaseDisk(ctx, cx, cy, size, f);
  eyepieceRing(ctx, cw, H);
  return f;
}

export function Galileo() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const cw = Math.min(w, 520);
  const H = Math.min(cw, 360);
  const canvasRef = useRef(null);
  const [mode, setMode] = useState("jupiter");
  const [vmodel, setVmodel] = useState("actual");
  const [pos, setPos] = useState(0.25);
  const [playing, setPlaying] = useState(!reduceMotion);
  const tRef = useRef(0);
  const [illum, setIllum] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, cw, H);
    let raf;
    const render = () => {
      if (mode === "jupiter") drawJupiter(ctx, cw, H, tRef.current);
      else setIllum(drawVenus(ctx, cw, H, vmodel, pos));
    };
    if (reduceMotion) { render(); return; }
    const loop = () => {
      if (mode === "jupiter" && playing) tRef.current += 0.02;
      render();
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, H, mode, vmodel, pos, playing]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 07</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{t.threadTexts[mode]}</p>
        </div>
        <div style={styles.fateBox}>
          <div style={{ ...styles.fateLabel, color: C.sun }}>{mode === "jupiter" ? t.jupiterFact : t.venusFact}</div>
          <p style={styles.factText}>{mode === "jupiter" ? t.jupiterText : t.venusText}</p>
        </div>
        <div style={{ ...styles.pathBox, marginTop: 14 }}>
          <div style={{ ...styles.fateLabel, color: C.cool }}>{t.method}</div>
          <p style={{ ...styles.keyTermText, margin: 0 }}>{t.methodText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>
        <div style={styles.pickerRow}>
          {MODES.map((m) => (
            <button key={m.id} onClick={() => setMode(m.id)}
              style={{ ...styles.chip, ...(mode === m.id ? styles.chipOn : {}) }}>{tr(m.label, lang)}</button>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
          <canvas ref={canvasRef} style={{ display: "block", maxWidth: "100%", borderRadius: "50%" }} />
        </div>

        {mode === "jupiter" ? (
          <>
            <p style={styles.note}>{t.lineup}</p>
            {!reduceMotion && (
              <div style={styles.controlBar}>
                <button style={styles.iconBtn} onClick={() => setPlaying((p) => !p)}>{playing ? t.pause : t.play}</button>
              </div>
            )}
          </>
        ) : (
          <>
            <div style={{ ...styles.pickerRow, marginTop: 14 }}>
              {VENUS_MODELS.map((m) => (
                <button key={m.id} onClick={() => setVmodel(m.id)}
                  style={{ ...styles.chip, ...(vmodel === m.id ? styles.chipOn : {}) }}>{tr(m.label, lang)}</button>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 13, color: C.cool, marginTop: 14 }}>
              <span>{t.cyclePos}</span>
              <span>{t.illum}: {Math.round(illum * 100)}%</span>
            </div>
            <input type="range" min={0} max={1} step={0.01} value={pos} onChange={(e) => setPos(+e.target.value)} style={styles.range} />
            <p style={{ ...styles.note, color: vmodel === "ptolemaic" ? C.danger : C.good }}>
              {vmodel === "ptolemaic" ? t.onlyCrescent : t.fullCycle}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Galileo;
