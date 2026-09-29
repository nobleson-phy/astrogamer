/* ============================================================
   STATION 1 — RADAR RANGING
   Inside the solar system, distances are measured by RADAR RANGING: send
   a radio pulse to a planet or asteroid and time how long the echo takes
   to return at the speed of light; distance = c × time / 2. This nails
   down the astronomical unit (AU), the average Earth-Sun distance. But
   you can't radar the Sun itself — its hot, ionized gas absorbs and
   scatters the signal with no clean echo. Grounded in Ch.19 §19.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Radar ranging",
    kind: "Distance by echo",
    lede: "Fire a radar pulse at a planet and clock its round trip. Then try it on the Sun — and watch it fail, for a very physical reason.",
    thread: "THE STORY BEGINS",
    threadText: "Before we can measure the stars, we must nail down our own backyard. Bouncing radio waves off planets gives the solar system a precise ruler.",
    key: "TIME THE ECHO — BUT NOT OFF THE SUN",
    keyText: "Within the solar system, we measure distances by RADAR RANGING: transmit a radio pulse toward a planet or asteroid and time how long its echo takes to come back. Because radio waves travel at the speed of light, distance = (speed of light × round-trip time) ÷ 2. Radar ranging pins down the astronomical unit (AU) — the average Earth-Sun distance, about 150 million km. It cannot be used on the Sun itself, though: the Sun has no solid surface, and its hot, ionized gas absorbs and scatters the signal instead of reflecting a clean echo.",
    planet: "planet (clean echo)", sun: "Sun (no clean echo)",
    formula: "distance = c × (round-trip time) ÷ 2",
    note: "Radar ranging times a light-speed echo off a planet to get its distance and fix the AU. The Sun gives no clean echo — its ionized gas absorbs and scatters the pulse.",
  },
  ja: {
    title: "レーダー測距",
    kind: "反射で距離を測る",
    lede: "惑星にレーダーパルスを撃ち、その往復時間を計ろう。次に太陽で試して——とても物理的な理由で失敗する様子を見よう。",
    thread: "物語のはじまり",
    threadText: "星を測る前に、まず自分の裏庭を確定させねばなりません。惑星に電波を反射させることで、太陽系に精密なものさしが与えられます。",
    key: "反射を計る——ただし太陽ではだめ",
    keyText: "太陽系内では、レーダー測距で距離を測ります：惑星や小惑星へ電波パルスを送り、その反射が戻るまでの時間を計ります。電波は光速で進むので、距離＝（光速×往復時間）÷2 です。レーダー測距は天文単位（AU）——地球と太陽の平均距離、約1億5,000万km——を確定させます。ただし太陽そのものには使えません：太陽に固体表面はなく、高温で電離したガスが信号を吸収・散乱し、明瞭な反射を返さないからです。",
    planet: "惑星（明瞭な反射）", sun: "太陽（明瞭な反射なし）",
    formula: "距離 = c × 往復時間 ÷ 2",
    note: "レーダー測距は惑星からの光速の反射を計って距離を求め、AUを確定します。太陽は明瞭な反射を返しません——電離ガスがパルスを吸収・散乱します。",
  },
};

function draw(ctx, cw, H, mode, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const ex = 40, ey = H * 0.4; // Earth (transmitter) at left
  ctx.fillStyle = "#5b8fd8"; ctx.beginPath(); ctx.arc(ex, ey, 8, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText("Earth", ex, ey + 20);
  const tx = cw - 60, ty = ey;
  const cyc = tt % 200, p = cyc / 200;
  if (mode === "planet") {
    // target planet
    ctx.fillStyle = "#c98a5a"; ctx.beginPath(); ctx.arc(tx, ty, 16, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.text; ctx.fillText(t.planet, tx, ty + 30);
    // pulse: out then back
    let px;
    if (p < 0.5) { px = ex + (p / 0.5) * (tx - 16 - ex); ctx.fillStyle = "#8fe0a0"; }
    else { px = tx - 16 - ((p - 0.5) / 0.5) * (tx - 16 - ex); ctx.fillStyle = "#ffcf6b"; }
    ctx.beginPath(); ctx.arc(px, ey, 4, 0, Math.PI * 2); ctx.fill();
    // trail line
    ctx.strokeStyle = "rgba(150,175,230,0.15)"; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(tx - 16, ey); ctx.stroke();
    ctx.fillStyle = p < 0.5 ? "#8fe0a0" : "#ffcf6b"; ctx.font = `10px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(p < 0.5 ? (lang === "ja" ? "送信 →" : "outgoing →") : (lang === "ja" ? "← 反射" : "← echo"), cw / 2, ey - 20);
  } else {
    // the Sun: pulse goes in and is absorbed/scattered (no return)
    const sg = ctx.createRadialGradient(tx, ty, 4, tx, ty, 26); sg.addColorStop(0, "#fff2c0"); sg.addColorStop(1, "rgba(255,180,60,0)");
    ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(tx, ty, 26, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#ffd86b"; ctx.beginPath(); ctx.arc(tx, ty, 14, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.text; ctx.fillText(t.sun, tx, ty + 34);
    // pulse goes out and scatters near the Sun
    const px = ex + Math.min(p / 0.5, 1) * (tx - 20 - ex);
    if (p < 0.5) { ctx.fillStyle = "#8fe0a0"; ctx.beginPath(); ctx.arc(px, ey, 4, 0, Math.PI * 2); ctx.fill(); }
    else { // scatter burst
      for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; const r = ((cyc) % 40); ctx.fillStyle = `rgba(255,120,80,${0.5 - r / 80})`; ctx.beginPath(); ctx.arc(tx - 20 + Math.cos(a) * r, ey + Math.sin(a) * r, 2, 0, Math.PI * 2); ctx.fill(); }
    }
    ctx.strokeStyle = "rgba(150,175,230,0.15)"; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(tx - 20, ey); ctx.stroke();
    ctx.fillStyle = C.bad; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(lang === "ja" ? "吸収・散乱される（反射なし）" : "absorbed / scattered (no echo)", cw / 2, ey - 20);
  }
  ctx.fillStyle = C.cool; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.formula, cw / 2, H - 10);
}

export function RadarRanging() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 230;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("planet");
  const modeRef = useRef("planet"); modeRef.current = mode;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, modeRef.current, 40, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, modeRef.current, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 01</div>
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
          {[["planet", lang === "ja" ? "惑星に向けて" : "At a planet"], ["sun", lang === "ja" ? "太陽に向けて" : "At the Sun"]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default RadarRanging;
