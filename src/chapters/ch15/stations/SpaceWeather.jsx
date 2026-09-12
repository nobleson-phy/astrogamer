/* ============================================================
   STATION 8 — SPACE WEATHER
   A CME launched at ~500 km/s crosses the 150-million-km gap to Earth
   (1 AU) in about 3-4 days. Earth's magnetic field funnels the charged
   particles toward the poles — which is why high-latitude regions (like
   North America) face the strongest geomagnetically induced currents,
   and why auroras glow near the poles. Space weather can disrupt
   satellites, GPS, astronauts, aviation and power grids. Grounded in
   Ch.15 §15.4.
   ============================================================ */
import React, { useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Space weather",
    kind: "When the Sun reaches Earth",
    lede: "Watch a CME cross the solar system. It takes days, not minutes — and when it arrives, Earth's magnetic field steers it toward the poles.",
    thread: "THE STORY ENDS HERE",
    threadText: "The Sun doesn't just light and warm us; it can storm against us. A single eruption, days later, can light up polar skies — and knock out power grids far below.",
    key: "3-4 DAYS TO EARTH, THEN STEERED TO THE POLES",
    keyText: "A coronal mass ejection travels at a few hundred km/s. At ~500 km/s it crosses the 150-million-km distance to Earth (1 AU) in about 3 to 4 days (150,000,000 ÷ 500 ≈ 300,000 s ≈ 3.5 days) — unlike light, which takes 8 minutes. When it arrives, Earth's magnetic field channels the charged particles toward the magnetic poles, so high-latitude regions such as North America suffer the strongest geomagnetically induced currents (and the brightest auroras). This is why forecasting space weather matters: geomagnetic storms and CMEs can disrupt satellite electronics, distort GPS navigation, endanger astronauts, and cause widespread power-grid blackouts.",
    travel: "CME at ~500 km/s → ~3-4 days to Earth (light: 8 min)",
    poles: "field steers particles to the poles → aurora + strongest currents at high latitude",
    impacts: "Disrupts: satellites · GPS · astronauts · aviation · power grids",
    day: "Day", arrived: "CME arrives — geomagnetic storm!",
    note: "A ~500 km/s CME reaches Earth in 3-4 days; Earth's field funnels it to the poles, so high-latitude grids are most at risk. Space weather threatens satellites, GPS, astronauts and power grids.",
  },
  ja: {
    title: "宇宙天気",
    kind: "太陽が地球に届くとき",
    lede: "CMEが太陽系を横切る様子を見よう。数分ではなく数日かかり——到着すると、地球の磁場がそれを極へ導きます。",
    thread: "物語はここで終わる",
    threadText: "太陽は私たちを照らし温めるだけではありません；私たちに嵐を向けることもあります。一つの爆発が数日後、極の空を輝かせ——はるか下の送電網を停止させることがあります。",
    key: "地球まで3〜4日、そして極へ導かれる",
    keyText: "コロナ質量放出は毎秒数百kmで進みます。約500 km/sなら、地球までの1億5,000万km（1 AU）を約3〜4日で横切ります（150,000,000 ÷ 500 ≈ 30万秒 ≈ 3.5日）——8分で届く光とは違います。到着すると、地球の磁場が荷電粒子を磁極へ導くため、北米のような高緯度地域が最も強い地磁気誘導電流（そして最も明るいオーロラ）を受けます。だから宇宙天気の予報が重要です：地磁気嵐とCMEは、衛星の電子機器を乱し、GPS航法を狂わせ、宇宙飛行士を危険にさらし、広範囲の送電網停電を起こしうるのです。",
    travel: "CME 約500 km/s → 地球まで約3〜4日（光：8分）",
    poles: "磁場が粒子を極へ導く → 高緯度でオーロラと最強の電流",
    impacts: "影響：衛星・GPS・宇宙飛行士・航空・送電網",
    day: "日", arrived: "CME到着——地磁気嵐！",
    note: "約500 km/sのCMEは3〜4日で地球へ。地球の磁場が極へ導くので、高緯度の送電網が最も危険。宇宙天気は衛星・GPS・宇宙飛行士・送電網を脅かします。",
  },
};

function draw(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const sunX = 34, sunY = H / 2, earthX = cw - 54, earthY = H / 2;
  // Sun
  const sg = ctx.createRadialGradient(sunX, sunY, 2, sunX, sunY, 28); sg.addColorStop(0, "#fff2c0"); sg.addColorStop(1, "rgba(255,180,60,0)");
  ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(sunX, sunY, 28, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffd86b"; ctx.beginPath(); ctx.arc(sunX, sunY, 12, 0, Math.PI * 2); ctx.fill();
  // path
  ctx.strokeStyle = "rgba(150,175,230,0.15)"; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(sunX + 14, sunY); ctx.lineTo(earthX - 20, earthY); ctx.stroke(); ctx.setLineDash([]);
  // cycle: CME travels; total cycle 200 frames represents ~3.5 days
  const cyc = tt % 240, p = Math.min(cyc / 180, 1);
  const cmeX = sunX + 14 + p * (earthX - 20 - sunX - 14);
  const arrived = p >= 1;
  // day counter
  const days = (p * 3.5).toFixed(1);
  ctx.fillStyle = C.cool; ctx.font = `11px ${mono}`; ctx.textAlign = "left"; ctx.fillText(`${t.day}: ${days} / 3.5`, 10, 16);
  // CME bubble
  if (!arrived) {
    const eg = ctx.createRadialGradient(cmeX, sunY, 2, cmeX, sunY, 18); eg.addColorStop(0, "rgba(255,180,120,0.8)"); eg.addColorStop(1, "rgba(255,120,80,0)");
    ctx.fillStyle = eg; ctx.beginPath(); ctx.arc(cmeX, sunY, 18, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "rgba(255,210,150,0.9)"; ctx.beginPath(); ctx.arc(cmeX, sunY, 5, 0, Math.PI * 2); ctx.fill();
  }
  // Earth with magnetosphere
  const eR = 12;
  // magnetosphere (bow shape facing Sun)
  ctx.strokeStyle = arrived ? "rgba(150,220,255,0.9)" : "rgba(120,170,230,0.4)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.ellipse(earthX, earthY, eR * 2.4, eR * 2.0, 0, Math.PI * 0.5, Math.PI * 1.5); ctx.stroke();
  const eg2 = ctx.createRadialGradient(earthX - 3, earthY - 3, 1, earthX, earthY, eR); eg2.addColorStop(0, "#7fb0e0"); eg2.addColorStop(1, "#244a72");
  ctx.fillStyle = eg2; ctx.beginPath(); ctx.arc(earthX, earthY, eR, 0, Math.PI * 2); ctx.fill();
  // aurora at poles on arrival
  if (arrived) {
    ctx.fillStyle = "rgba(120,255,180,0.7)";
    ctx.beginPath(); ctx.arc(earthX, earthY - eR, 5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(earthX, earthY + eR, 5, 0, Math.PI * 2); ctx.fill();
    // particles steered to poles
    ctx.strokeStyle = "rgba(150,220,255,0.7)"; ctx.lineWidth = 1;
    for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(earthX - eR * 2.2, earthY); ctx.quadraticCurveTo(earthX - eR, earthY + s * eR * 1.6, earthX, earthY + s * eR); ctx.stroke(); }
    ctx.fillStyle = C.bad; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.arrived, cw / 2, H - 26);
  }
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText("Earth (1 AU)", earthX, earthY + eR * 2.6 + 6);
}

export function SpaceWeather() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, 200, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 08</div>
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

        <div style={{ marginTop: 4 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <div style={{ fontFamily: mono, fontSize: 11.5, color: C.cool, marginTop: 8 }}>{t.travel}</div>
        <div style={{ fontFamily: mono, fontSize: 11.5, color: C.cool, marginTop: 4 }}>{t.poles}</div>
        <div style={{ fontFamily: mono, fontSize: 11.5, color: C.bad, marginTop: 4 }}>{t.impacts}</div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default SpaceWeather;
