/* ============================================================
   STATION 7 — ECLIPSES
   A shadow has a dark inner umbra (total eclipse seen here) and a
   lighter outer penumbra (partial). A solar eclipse is brief and seen
   only along a narrow path because the Moon's small shadow tip races
   across Earth at ~1500 km/h. A lunar eclipse is seen from Earth's
   entire night hemisphere at once, so any place sees far more lunar
   than solar eclipses.
   Grounded in Ch.4 §4.7.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Eclipses",
    kind: "Umbra & penumbra · solar vs lunar",
    lede: "Every shadow has a dark core, the umbra, and a softer fringe, the penumbra. In a solar eclipse the Moon's shadow falls on Earth; in a lunar eclipse Earth's shadow falls on the Moon. Toggle between them and watch who gets to see it.",
    thread: "THE STORY CONTINUES",
    threadText: "New moon and full moon are usually just phases — but when the Sun, Earth and Moon fall exactly in line, one casts its shadow on another. The same geometry of light and shadow now produces the sky's most dramatic events.",
    key: "WHY LUNAR ECLIPSES ARE COMMON",
    keyText: "A solar eclipse is seen only where the Moon's tiny shadow tip touches down — a narrow path the shadow races along at about 1500 km/h, so totality lasts minutes. A lunar eclipse darkens the Moon for everyone on Earth's entire night side at once — so any one place sees far more lunar than solar eclipses.",
    solar: "Solar eclipse", lunar: "Lunar eclipse",
    solarSub: "Moon's shadow on Earth", lunarSub: "Earth's shadow on the Moon",
    umbra: "umbra (total)", penumbra: "penumbra (partial)",
    solarNote: "Only the small spot under the umbra sees a total eclipse; it sweeps across Earth at ~1500 km/h, so any place sees it for only minutes.",
    lunarNote: "Earth's shadow covers the whole Moon, so the eclipse is visible at once to everyone on the night side of Earth.",
    play: "▶ Play", pause: "❚❚ Pause",
    sun: "Sun", earth: "Earth", moon: "Moon", night: "night side sees it",
  },
  ja: {
    title: "食（日食・月食）",
    kind: "本影と半影・日食と月食",
    lede: "どの影にも、暗い中心の「本影」と、やわらかい縁の「半影」があります。日食では月の影が地球に落ち、月食では地球の影が月に落ちます。切り替えて、誰がそれを見られるのかを見よう。",
    thread: "物語はつづく",
    threadText: "新月や満月はふだんは単なる月相です——が、太陽・地球・月がぴったり一直線に並ぶと、一方が他方に影を落とします。光と影の同じ幾何が、今度は空で最も劇的な出来事を生み出すのです。",
    key: "月食のほうが多い理由",
    keyText: "日食は、月の小さな影の先端が触れる場所でしか見られません——影は時速約1500キロメートルで狭い帯を駆け抜けるので、皆既は数分だけです。月食は、地球の夜側全体にいるすべての人に同時に月が暗く見えます——だからどの場所でも、日食よりずっと多くの月食を見られます。",
    solar: "日食", lunar: "月食",
    solarSub: "月の影が地球に", lunarSub: "地球の影が月に",
    umbra: "本影（皆既）", penumbra: "半影（部分）",
    solarNote: "本影の下の小さな点だけが皆既を見られます。それは時速約1500キロメートルで地表を移動するため、どの場所でも見えるのは数分だけです。",
    lunarNote: "地球の影が月全体を覆うので、この食は地球の夜側にいるすべての人に同時に見えます。",
    play: "▶ 再生", pause: "❚❚ 一時停止",
    sun: "太陽", earth: "地球", moon: "月", night: "夜側が見られる",
  },
};

function drawSolar(ctx, cw, H, sweep, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cy = H / 2;
  // Sun left
  const sunX = 34, sunR = 26;
  const g = ctx.createRadialGradient(sunX, cy, 3, sunX, cy, sunR);
  g.addColorStop(0, "#fff"); g.addColorStop(0.4, "#ffcf6b"); g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sunX, cy, sunR, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffcf6b"; ctx.beginPath(); ctx.arc(sunX, cy, 12, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.sun; ctx.font = `12px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.sun, sunX, cy + 34);

  // Earth right
  const eX = cw - 70, Re = Math.min(H * 0.34, 58);
  const eg = ctx.createRadialGradient(eX - 10, cy - 10, 4, eX, cy, Re);
  eg.addColorStop(0, "#5a92cf"); eg.addColorStop(1, "#183a63");
  ctx.fillStyle = eg; ctx.beginPath(); ctx.arc(eX, cy, Re, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.faint; ctx.fillText(t.earth, eX, cy + Re + 16);

  // Moon between, near Earth. It moves vertically to sweep shadow.
  const moonX = eX - Re - 70;
  const moonY = cy + sweep;
  const Rm = 10;
  ctx.fillStyle = "#cdd3e8"; ctx.beginPath(); ctx.arc(moonX, moonY, Rm, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.faint; ctx.fillText(t.moon, moonX, moonY - 16);

  // penumbra (diverging cone) and umbra (converging cone tip on Earth)
  const tipX = eX - Re + 6;
  const tipY = cy + sweep * 1.7;
  // penumbra
  ctx.fillStyle = "rgba(255,207,107,0.10)";
  ctx.beginPath();
  ctx.moveTo(moonX, moonY - Rm);
  ctx.lineTo(tipX + 26, tipY + 34);
  ctx.lineTo(tipX + 26, tipY - 34);
  ctx.lineTo(moonX, moonY + Rm);
  ctx.closePath(); ctx.fill();
  // umbra
  ctx.fillStyle = "rgba(10,14,28,0.85)";
  ctx.beginPath();
  ctx.moveTo(moonX, moonY - Rm);
  ctx.lineTo(tipX, tipY);
  ctx.lineTo(moonX, moonY + Rm);
  ctx.closePath(); ctx.fill();

  // umbra spot on Earth
  ctx.fillStyle = C.danger; ctx.beginPath(); ctx.arc(tipX, tipY, 4, 0, Math.PI * 2); ctx.fill();

  // labels
  ctx.textAlign = "left"; ctx.font = `11px ${mono}`;
  ctx.fillStyle = "#0a0e1c"; ctx.fillText("", 0, 0);
  ctx.fillStyle = C.text; ctx.fillText(t.umbra, moonX + 14, cy - 2);
  ctx.fillStyle = C.faint; ctx.fillText(t.penumbra, moonX + 14, cy + 14);
}

function drawLunar(ctx, cw, H, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cy = H / 2;
  // Sun left
  const sunX = 34;
  const g = ctx.createRadialGradient(sunX, cy, 3, sunX, cy, 26);
  g.addColorStop(0, "#fff"); g.addColorStop(0.4, "#ffcf6b"); g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sunX, cy, 26, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffcf6b"; ctx.beginPath(); ctx.arc(sunX, cy, 12, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.sun; ctx.font = `12px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.sun, sunX, cy + 34);

  // Earth center
  const eX = cw * 0.42, Re = Math.min(H * 0.32, 52);
  const eg = ctx.createRadialGradient(eX - 10, cy - 10, 4, eX, cy, Re);
  eg.addColorStop(0, "#5a92cf"); eg.addColorStop(1, "#183a63");
  ctx.fillStyle = eg; ctx.beginPath(); ctx.arc(eX, cy, Re, 0, Math.PI * 2); ctx.fill();
  // night side of earth (right half)
  ctx.fillStyle = "rgba(10,14,28,0.45)";
  ctx.beginPath(); ctx.arc(eX, cy, Re, -Math.PI / 2, Math.PI / 2); ctx.fill();
  ctx.fillStyle = C.faint; ctx.fillText(t.earth, eX, cy + Re + 16);

  // Earth's shadow cone to the right (penumbra + umbra)
  const tipX = cw - 10;
  ctx.fillStyle = "rgba(255,207,107,0.08)";
  ctx.beginPath();
  ctx.moveTo(eX, cy - Re); ctx.lineTo(tipX, cy - 20); ctx.lineTo(tipX, cy + 20); ctx.lineTo(eX, cy + Re);
  ctx.closePath(); ctx.fill();
  ctx.fillStyle = "rgba(10,14,28,0.82)";
  ctx.beginPath();
  ctx.moveTo(eX, cy - Re * 0.6); ctx.lineTo(tipX, cy - 8); ctx.lineTo(tipX, cy + 8); ctx.lineTo(eX, cy + Re * 0.6);
  ctx.closePath(); ctx.fill();

  // Moon inside the umbra (reddened)
  const moonX = cw - 76, moonY = cy, Rm = 12;
  ctx.fillStyle = "#7a3b30"; ctx.beginPath(); ctx.arc(moonX, moonY, Rm, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "rgba(255,110,67,0.5)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(moonX, moonY, Rm, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = C.faint; ctx.textAlign = "center"; ctx.fillText(t.moon, moonX, moonY - 18);

  // labels
  ctx.textAlign = "left"; ctx.font = `11px ${mono}`;
  ctx.fillStyle = C.text; ctx.fillText(t.umbra, eX + Re + 10, cy - 2);
  ctx.fillStyle = C.faint; ctx.fillText(t.penumbra, eX + Re + 10, cy - 24);
  ctx.fillStyle = C.good; ctx.textAlign = "center"; ctx.fillText("◗ " + t.night, eX + 4, cy - Re - 6);
}

export function Eclipses() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 300;
  const canvasRef = useRef(null);
  const [solar, setSolar] = useState(true);
  const [playing, setPlaying] = useState(!reduceMotion);
  const sweepRef = useRef(-40);
  const dirRef = useRef(1);
  const cw = Math.min(w, 760);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (!solar) { drawLunar(ctx, cw, H, lang); return; }
    if (reduceMotion) { drawSolar(ctx, cw, H, 0, lang); return; }
    let raf;
    const loop = () => {
      if (playing) {
        sweepRef.current += dirRef.current * 0.6;
        if (sweepRef.current > 42) dirRef.current = -1;
        if (sweepRef.current < -42) dirRef.current = 1;
      }
      drawSolar(ctx, cw, H, sweepRef.current, lang);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, solar, playing, lang]);

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

        <div style={styles.pickerRow}>
          <button onClick={() => setSolar(true)} style={{ ...styles.chip, ...(solar ? styles.chipOn : {}) }}>{t.solar}</button>
          <button onClick={() => setSolar(false)} style={{ ...styles.chip, ...(!solar ? styles.chipOn : {}) }}>{t.lunar}</button>
        </div>

        <canvas ref={canvasRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)", marginTop: 12 }} />

        <div style={{ display: "flex", gap: 16, fontFamily: mono, fontSize: 12.5, marginTop: 8, flexWrap: "wrap" }}>
          <span style={{ color: C.text }}>■ {t.umbra}</span>
          <span style={{ color: C.faint }}>▨ {t.penumbra}</span>
        </div>

        {solar && !reduceMotion && (
          <div style={styles.controlBar}>
            <button style={styles.iconBtn} onClick={() => setPlaying((p) => !p)}>{playing ? t.pause : t.play}</button>
          </div>
        )}

        <div style={{ marginTop: 12, padding: "12px 14px", borderRadius: 12, border: `1px solid ${C.border}`, background: "rgba(8,12,26,0.6)" }}>
          <div style={{ fontFamily: display, fontSize: 19, color: solar ? C.sun : C.cool }}>
            {solar ? t.solar : t.lunar} <span style={{ fontFamily: mono, fontSize: 13, color: C.faint }}>· {solar ? t.solarSub : t.lunarSub}</span>
          </div>
          <p style={{ ...styles.factText, fontStyle: "italic", margin: "6px 0 0" }}>{solar ? t.solarNote : t.lunarNote}</p>
        </div>
      </div>
    </div>
  );
}

export default Eclipses;
