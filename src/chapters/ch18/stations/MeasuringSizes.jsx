/* ============================================================
   STATION 6 — MEASURING STELLAR SIZES
   One way to measure a star's diameter is LUNAR OCCULTATION: timing how
   long the Moon's sharp edge takes to cover the star gives its angular
   (and linear) size. Such methods reveal extreme objects like WHITE
   DWARFS — about half the Sun's mass packed into an Earth-sized ball, at
   densities over 300,000 g/cm³ (a teaspoon weighs over 1.5 tons).
   Grounded in Ch.18 §18.3-18.4.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Measuring stellar sizes",
    kind: "From occultations to white dwarfs",
    lede: "Watch the Moon's edge sweep across a star and clock the blink. Then meet the strangest result: a whole star crushed to the size of the Earth.",
    thread: "THE STORY CONTINUES",
    threadText: "Stars are so distant they are essentially points of light. Clever timing tricks let us measure their true sizes — and some of the answers are astonishing.",
    occKey: "LUNAR OCCULTATION — TIMING A STAR'S BLINK",
    occText: "Because the Moon has no atmosphere, its edge is razor-sharp. As the Moon drifts across a star, the star's light doesn't fade gradually — it winks out over a tiny, measurable time. That LUNAR OCCULTATION timing, combined with the Moon's known motion, yields the star's angular diameter, and with its distance, its true linear diameter.",
    wdKey: "WHITE DWARFS — A STAR THE SIZE OF EARTH",
    wdText: "Size measurements reveal WHITE DWARFS: the collapsed cores left when a star like the Sun ends fusion. A white dwarf packs roughly half the Sun's mass into a ball about the size of the Earth. That gives it an astonishing density — over 300,000 g/cm³, so a single teaspoon of white-dwarf matter would weigh more than 1.5 tons. Gravity is halted not by fusion but by electron degeneracy pressure.",
    occ: "Lunar occultation", wd: "White dwarf size",
    brightness: "brightness", blink: "star winks out over a tiny time → diameter",
    sun: "Sun", wdL: "white dwarf ≈ Earth", earth: "Earth", dens: "density > 300,000 g/cm³ · 1 teaspoon > 1.5 tons",
    noteO: "The Moon's sharp edge makes a star blink out in a measurable instant; that timing gives the star's diameter.",
    noteW: "A white dwarf crushes ~half the Sun's mass into an Earth-sized ball — over 300,000 g/cm³, held up by electron degeneracy, not fusion.",
  },
  ja: {
    title: "星の大きさを測る",
    kind: "掩蔽から白色矮星へ",
    lede: "月の縁が星を横切るのを見て、そのまばたきを計ろう。そして最も奇妙な結果に出会おう：まるごと一つの星が地球サイズに潰されているのです。",
    thread: "物語はつづく",
    threadText: "星はあまりに遠く、本質的に光の点です。巧みな計時の工夫が真の大きさを測らせてくれ——その答えのいくつかは驚くべきものです。",
    occKey: "月による掩蔽——星のまばたきを計る",
    occText: "月には大気がないので、その縁は剃刀のように鋭い。月が星を横切るとき、星の光は徐々にではなく——ごく短く測れる時間で消えます。この月による掩蔽の計時を、月の既知の運動と組み合わせると星の角直径が得られ、距離があれば真の実直径がわかります。",
    wdKey: "白色矮星——地球サイズの星",
    wdText: "大きさの測定は白色矮星を明かします：太陽のような星が融合を終えたときに残る、潰れた核です。白色矮星は太陽のおよそ半分の質量を、地球ほどの大きさの球に詰め込みます。それは驚異的な密度——300,000 g/cm³超になり、白色矮星の物質を小さじ一杯すくうと1.5トン超の重さになります。重力は核融合ではなく電子縮退圧で食い止められています。",
    occ: "月による掩蔽", wd: "白色矮星の大きさ",
    brightness: "明るさ", blink: "星がごく短時間で消える → 直径",
    sun: "太陽", wdL: "白色矮星 ≈ 地球", earth: "地球", dens: "密度 > 300,000 g/cm³ · 小さじ1杯 > 1.5トン",
    noteO: "月の鋭い縁が星を測れる一瞬で消します。その計時が星の直径を与えます。",
    noteW: "白色矮星は太陽の約半分の質量を地球サイズの球に潰します——300,000 g/cm³超、核融合ではなく電子縮退が支えます。",
  },
};

function drawOcc(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const p = (tt * 0.006) % 1;
  // star fixed, Moon edge sweeping across it
  const sx = cw * 0.42, sy = H * 0.3, sr = 8;
  // moon (big dark disk) moving left->right; its right edge covers star near p~0.5
  const moonX = -cw * 0.5 + p * cw * 1.4, moonR = cw * 0.45;
  // star glow
  const covered = moonX + moonR > sx; // moon edge passed the star
  if (!covered) { const g = ctx.createRadialGradient(sx, sy, 1, sx, sy, sr + 6); g.addColorStop(0, "#fff"); g.addColorStop(1, "rgba(255,220,150,0)"); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sx, sy, sr + 6, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = "#ffe08a"; ctx.beginPath(); ctx.arc(sx, sy, 3, 0, Math.PI * 2); ctx.fill(); }
  // moon
  ctx.fillStyle = "#2a2f38"; ctx.beginPath(); ctx.arc(moonX, sy, moonR, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "rgba(180,190,205,0.5)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(moonX, sy, moonR, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(lang === "ja" ? "月の縁 →" : "Moon's edge →", moonX + moonR - 30, sy - moonR + 14 < 12 ? 12 : sy - moonR + 14);
  // light curve
  const gx0 = 40, gx1 = cw - 20, gy0 = H * 0.56, gy1 = H - 26;
  ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx0, gy0); ctx.lineTo(gx0, gy1); ctx.lineTo(gx1, gy1); ctx.stroke();
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "left"; ctx.fillText(t.brightness, gx0 - 34, gy0 + 4);
  // curve: full until edge reaches star (~p 0.5 region), then drops to 0 sharply
  ctx.strokeStyle = "#ffcf6b"; ctx.lineWidth = 2; ctx.beginPath();
  for (let i = 0; i <= 120; i++) { const ph = i / 120; const mX = -cw * 0.5 + ph * cw * 1.4; const cov = mX + moonR > sx; const y = cov ? gy1 : gy0 + 4; const x = gx0 + ph * (gx1 - gx0); if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
  ctx.stroke();
  ctx.fillStyle = C.sun; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.blink, cw / 2, H - 8);
}

function drawWD(ctx, cw, H, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cy = H * 0.4;
  // Sun (big)
  const sunX = cw * 0.22, sunR = 60;
  const g = ctx.createRadialGradient(sunX - 20, cy - 20, 10, sunX, cy, sunR); g.addColorStop(0, "#fff2c0"); g.addColorStop(1, "#e8952a");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sunX, cy, sunR, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.faint; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.sun, sunX, cy + sunR + 16);
  // white dwarf (tiny) and Earth (tiny, similar size) on the right
  const wdX = cw * 0.62, earthX = cw * 0.82, r = 7;
  const wg = ctx.createRadialGradient(wdX - 2, cy - 2, 1, wdX, cy, r); wg.addColorStop(0, "#fff"); wg.addColorStop(1, "#bcd0e8");
  ctx.fillStyle = wg; ctx.beginPath(); ctx.arc(wdX, cy, r, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#8fc0e8"; ctx.font = `9px ${mono}`; ctx.fillText(t.wdL, wdX, cy + 22);
  ctx.fillStyle = "#5b8fd8"; ctx.beginPath(); ctx.arc(earthX, cy, r, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.faint; ctx.fillText(t.earth, earthX, cy + 22);
  // bracket showing they're similar tiny size vs Sun
  ctx.strokeStyle = "rgba(150,175,230,0.4)"; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.arc(sunX, cy, sunR, -0.5, 0.5); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = C.sun; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.dens, cw / 2, H - 14);
}

export function MeasuringSizes() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("occ");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (mode === "wd") { drawWD(ctx, cw, H, lang); return; }
    if (reduceMotion) { drawOcc(ctx, cw, H, 40, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; drawOcc(ctx, cw, H, tt, lang); raf = requestAnimationFrame(loop); };
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
          <div style={{ ...styles.fateLabel, color: C.sun }}>{mode === "occ" ? t.occKey : t.wdKey}</div>
          <p style={styles.keyTermText}>{mode === "occ" ? t.occText : t.wdText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          {[["occ", t.occ], ["wd", t.wd]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{mode === "occ" ? t.noteO : t.noteW}</p>
      </div>
    </div>
  );
}

export default MeasuringSizes;
