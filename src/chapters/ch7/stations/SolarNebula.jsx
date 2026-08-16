/* ============================================================
   STATION 7 — BIRTH OF THE SYSTEM (THE SOLAR NEBULA)
   The Sun and planets condensed from a spinning cloud of gas and
   dust — the solar nebula — that flattened into a hot-centred disk.
   Close in, only rock and metal could condense (terrestrial worlds);
   far out, ices and gases survived (giants). The outer disk is
   chemically "reduced" (H makes water, not CO2). Temperature falls
   about as 1/√distance. Grounded in Ch.7 §7.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const AU_MIN = 0.39, AU_MAX = 39; // Mercury .. Pluto
const FROST_AU = 2.7;

const STR = {
  en: {
    title: "Birth of the system",
    kind: "The solar nebula & its temperature gradient",
    lede: "Everything you've met condensed from one spinning cloud. Drag a probe out from the newborn Sun and watch the temperature fall — crossing the frost line where ice can finally survive.",
    thread: "THE STORY DEEPENS",
    threadText: "Now the two families make sense. Both planet types, the asteroid belt, the icy comets — all were cast at once, from a single disk whose only real variable was temperature: scorching at the centre, frigid at the rim.",
    key: "ONE DISK, SORTED BY HEAT",
    keyText: "The Sun and planets formed from a spinning cloud of gas and dust — the solar nebula — that collapsed into a disk with a hot forming Sun at its centre. Temperature falls with distance (roughly as 1/√d, so Pluto is about 10× colder than Mercury). Inside the frost line only rock and metal could condense, building the small dense terrestrial worlds; beyond it, ices and gases survived to build the giants. The cold outer disk is chemically 'reduced' — abundant hydrogen bonds with oxygen to make water rather than carbon dioxide.",
    distL: "Probe distance", tempL: "Temperature (vs Mercury)", colderL: "colder than Mercury",
    condL: "What condenses here", rockOnly: "rock & metal only", rockIce: "rock, metal & ices",
    frost: "frost line", sun: "forming Sun",
    slider: "Drag the probe outward (Mercury → Pluto):",
    note: "The bright centre is the forming Sun; particles orbit in the flattened disk. Inside the frost line (~2.7 AU) it is too warm for ice, so only rock and metal condense — the terrestrial zone. Beyond it, ices survive and the giants grow. Temperature drops as 1/√distance.",
  },
  ja: {
    title: "太陽系の誕生",
    kind: "太陽系星雲とその温度勾配",
    lede: "あなたが出会ったすべては、一つの回転する雲から凝結しました。生まれたての太陽から探査機を外へ引き出し、温度が下がる様子を——氷がついに生き残れる「凍結線」を越えながら——見よう。",
    thread: "物語は深まる",
    threadText: "これで2つの一族の意味がわかります。両方の惑星型も、小惑星帯も、氷の彗星も——すべては一度に、たった一つの円盤から生まれました。その唯一の本当の変数は温度でした：中心は灼熱、縁は極寒。",
    key: "一つの円盤、熱で仕分け",
    keyText: "太陽と惑星は、回転するガスと塵の雲——太陽系星雲——から生まれ、中心に形成中の太陽をもつ円盤へと崩れ落ちました。温度は距離とともに下がり（およそ 1/√d なので、冥王星は水星の約10倍冷たい）、凍結線の内側では岩石と金属だけが凝結して小さく密度の高い地球型の世界をつくり、外側では氷とガスが生き残って巨大惑星を育てました。冷たい外側の円盤は化学的に「還元的」で、豊富な水素が酸素と結びつき、二酸化炭素ではなく水をつくります。",
    distL: "探査機の距離", tempL: "温度（水星比）", colderL: "水星より冷たい",
    condL: "ここで凝結するもの", rockOnly: "岩石と金属だけ", rockIce: "岩石・金属・氷",
    frost: "凍結線", sun: "形成中の太陽",
    slider: "探査機を外へ動かそう（水星→冥王星）：",
    note: "明るい中心は形成中の太陽、粒子は平たい円盤の中を回ります。凍結線（約2.7 AU）の内側は氷には暖かすぎ、岩石と金属だけが凝結——地球型の領域です。その外側では氷が生き残り、巨大惑星が育ちます。温度は 1/√距離 で下がります。",
  },
};

function drawDisk(ctx, cw, H, probeFr, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = 44, cy = H / 2, maxX = cw - 20;
  const xOf = (fr) => cx + fr * (maxX - cx); // fr 0..1 across the disk
  // background temperature band (hot near Sun -> cold outer)
  for (let i = 0; i <= 60; i++) {
    const fr = i / 60, x = xOf(fr);
    const heat = 1 - fr;
    ctx.fillStyle = `rgba(${Math.round(120 + heat * 135)},${Math.round(70 + heat * 60)},${Math.round(90 - heat * 40 + (1 - heat) * 120)},0.10)`;
    ctx.fillRect(x, 20, (maxX - cx) / 60 + 1, H - 40);
  }
  // orbiting disk particles
  const n = 90;
  for (let i = 0; i < n; i++) {
    const fr = 0.02 + (i / n) * 0.96;
    const rad = fr * (maxX - cx);
    const sp = 0.5 / Math.sqrt(fr + 0.05);
    const ang = tt * sp + i * 2.4;
    const ex = cx + Math.cos(ang) * rad;
    const ey = cy + Math.sin(ang) * rad * 0.26; // flattened disk
    const heat = 1 - fr;
    ctx.fillStyle = fr < FROST_AU / AU_MAX ? `rgba(255,${Math.round(150 + heat * 80)},90,0.8)` : "rgba(150,200,255,0.7)";
    ctx.beginPath(); ctx.arc(ex, ey, 1.6, 0, Math.PI * 2); ctx.fill();
  }
  // frost line
  const fx = xOf(FROST_AU / AU_MAX);
  ctx.strokeStyle = "rgba(150,200,255,0.8)"; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(fx, 22); ctx.lineTo(fx, H - 22); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = "#9fd0ff"; ctx.font = `10px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.frost, fx, 16);
  // Sun
  const sg = ctx.createRadialGradient(cx, cy, 2, cx, cy, 24);
  sg.addColorStop(0, "#fff6d8"); sg.addColorStop(0.5, "#ffd23d"); sg.addColorStop(1, "rgba(255,158,44,0)");
  ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(cx, cy, 24, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffd23d"; ctx.beginPath(); ctx.arc(cx, cy, 10, 0, Math.PI * 2); ctx.fill();
  // probe marker
  const px = xOf(probeFr);
  ctx.strokeStyle = C.good; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(px, cy - 34); ctx.lineTo(px, cy + 34); ctx.stroke();
  ctx.fillStyle = C.good; ctx.beginPath(); ctx.arc(px, cy, 5, 0, Math.PI * 2); ctx.fill();
}

export function SolarNebula() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [sv, setSv] = useState(0.0); // 0..1 log position
  const svRef = useRef(sv);
  svRef.current = sv;

  // distance in AU from the log slider
  const au = AU_MIN * Math.pow(AU_MAX / AU_MIN, sv);
  const probeFr = clamp(au / AU_MAX, 0.02, 1);
  const tRel = Math.sqrt(AU_MIN / au);      // temperature vs Mercury
  const colder = 1 / tRel;
  const ice = au >= FROST_AU;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { drawDisk(ctx, cw, H, probeFr, 0, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 0.02; drawDisk(ctx, cw, H, clamp(AU_MIN * Math.pow(AU_MAX / AU_MIN, svRef.current) / AU_MAX, 0.02, 1), tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 07</div>
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

        <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginBottom: 2 }}>{t.slider}</div>
        <input type="range" min={0} max={1} step={0.005} value={sv} onChange={(e) => setSv(parseFloat(e.target.value))} style={styles.range} />

        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 10, marginBottom: 6, alignItems: "flex-end" }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, letterSpacing: 1 }}>{t.distL}</div>
            <div style={{ fontFamily: mono, fontSize: 22, color: C.sun }}>{au.toFixed(au < 1 ? 2 : au < 10 ? 1 : 0)}<span style={{ fontSize: 12, color: C.muted }}> AU</span></div>
          </div>
          <div>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, letterSpacing: 1 }}>{t.tempL}</div>
            <div style={{ fontFamily: mono, fontSize: 22, color: C.cool }}>{(tRel * 100).toFixed(0)}%</div>
            <div style={{ fontFamily: mono, fontSize: 11, color: C.faint }}>≈ {colder.toFixed(1)}× {t.colderL}</div>
          </div>
          <div>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, letterSpacing: 1 }}>{t.condL}</div>
            <div style={{ fontFamily: mono, fontSize: 15, color: ice ? "#9fd0ff" : C.sun }}>{ice ? t.rockIce : t.rockOnly}</div>
          </div>
        </div>

        <div style={{ marginTop: 8 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default SolarNebula;
