/* ============================================================
   STATION 6 — HOT GAS & SUPERNOVA SHOCKS
   Massive stars end as supernovae, blasting gas outward at thousands of
   km/s. The resulting SHOCK WAVES heat interstellar gas to over a million
   kelvin and carve low-density hot BUBBLES in the ISM. Supernovae are both
   destructive and creative: they disrupt and sweep up gas, but their shocks
   also COMPRESS nearby molecular clouds — triggering new star formation —
   and disperse newly forged heavy elements. Grounded in Ch.20 §20.3.
   ============================================================ */
import React, { useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Hot gas & supernova shocks",
    kind: "Destroyer and creator",
    lede: "Watch a supernova go off. Its shock wave heats gas to a million degrees, blows a hot bubble — and squeezes a neighboring cloud until a new star ignites.",
    thread: "THE STORY CONTINUES",
    threadText: "The death of a massive star is not just an ending. Its blast wave reshapes the surrounding medium, sterilizing some regions while seeding others with new stars.",
    key: "SHOCKS HEAT GAS TO 10⁶ K — AND TRIGGER NEW STARS",
    keyText: "When a massive star explodes as a supernova, it hurls gas outward at thousands of kilometers per second. The SHOCK WAVE this launches heats the surrounding interstellar gas to over a million kelvin and sweeps out a low-density, hot BUBBLE. Supernovae are therefore both destructive and creative: the same shock that disrupts and clears gas also COMPRESSES nearby molecular clouds, squeezing them until gravity takes over and new stars form — and it scatters the heavy elements the star forged into the interstellar medium.",
    sn: "supernova", shock: "shock wave → 10⁶ K bubble", cloud: "cloud compressed → new star",
    note: "A supernova's shock wave heats interstellar gas to over a million K and blows a hot bubble, while also compressing nearby clouds to trigger new star formation and spreading heavy elements.",
  },
  ja: {
    title: "高温ガスと超新星の衝撃波",
    kind: "破壊者にして創造者",
    lede: "超新星が爆発する様子を見よう。その衝撃波はガスを100万度に熱し、熱い泡を吹き——隣の雲を圧縮して新しい星に火をつけます。",
    thread: "物語はつづく",
    threadText: "大質量星の死は、ただの終わりではありません。その爆風は周囲の物質を作り変え、ある領域を不毛にしつつ、他を新しい星の種にします。",
    key: "衝撃波がガスを10⁶ Kに熱し——新しい星を引き起こす",
    keyText: "大質量星が超新星として爆発すると、毎秒数千kmでガスを外へ放ちます。これが放つ衝撃波は、周囲の星間ガスを100万K超に熱し、低密度で熱い泡を掃き出します。だから超新星は破壊的でも創造的でもあります：ガスを乱し一掃するのと同じ衝撃波が、近くの分子雲を圧縮し、重力が主導権を握って新しい星ができるまで押し縮め——そして星が鍛えた重元素を星間物質にまき散らします。",
    sn: "超新星", shock: "衝撃波 → 10⁶ Kの泡", cloud: "雲が圧縮 → 新しい星",
    note: "超新星の衝撃波は星間ガスを100万K超に熱し熱い泡を吹く一方、近くの雲を圧縮して新しい星形成を引き起こし、重元素を広めます。",
  },
};

function draw(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.4, cy = H * 0.44;
  const cyc = tt % 260, p = cyc / 260;
  // hot bubble carved by expanding shock
  const shockR = 20 + p * Math.min(cw * 0.3, 150);
  const bg = ctx.createRadialGradient(cx, cy, 2, cx, cy, shockR);
  bg.addColorStop(0, "rgba(180,120,255,0.10)"); bg.addColorStop(0.8, "rgba(255,120,80,0.08)"); bg.addColorStop(1, "rgba(255,120,80,0)");
  ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(cx, cy, shockR, 0, Math.PI * 2); ctx.fill();
  // shock ring
  ctx.strokeStyle = `rgba(255,180,120,${0.8 - p * 0.5})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy, shockR, 0, Math.PI * 2); ctx.stroke();
  // supernova core flash early
  if (p < 0.2) { const f = 1 - p / 0.2; const g = ctx.createRadialGradient(cx, cy, 1, cx, cy, 30 * f + 6); g.addColorStop(0, `rgba(255,255,240,${f})`); g.addColorStop(1, "rgba(255,180,80,0)"); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 30 * f + 6, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = "#fff2c0"; ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.sun; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.sn, cx, cy + 16);
  // temperature label inside bubble
  ctx.fillStyle = "rgba(255,160,120,0.9)"; ctx.font = `10px ${mono}`; ctx.fillText("10⁶ K", cx, cy - shockR * 0.4);
  // nearby molecular cloud on the right, compressed when shock reaches it
  const mcx = cw * 0.8, mcy = cy;
  const reached = shockR > (mcx - cx - 30);
  const squeeze = reached ? Math.min((shockR - (mcx - cx - 30)) / 40, 1) : 0;
  ctx.fillStyle = "rgba(70,58,74,0.7)"; ctx.beginPath(); ctx.ellipse(mcx, mcy, 34 - squeeze * 12, 26, 0, 0, Math.PI * 2); ctx.fill();
  if (squeeze > 0.6) { // new star ignites
    const g = ctx.createRadialGradient(mcx, mcy, 1, mcx, mcy, 12); g.addColorStop(0, "#fff"); g.addColorStop(1, "rgba(255,220,150,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(mcx, mcy, 12, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#ffe08a"; ctx.beginPath(); ctx.arc(mcx, mcy, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.good; ctx.font = `9px ${mono}`; ctx.fillText(t.cloud, mcx, mcy + 40);
  } else {
    ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.fillText(lang === "ja" ? "分子雲" : "molecular cloud", mcx, mcy + 40);
  }
  ctx.fillStyle = "rgba(255,180,120,0.9)"; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.shock, cw / 2, H - 10);
}

export function HotGasShocks() {
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
    if (reduceMotion) { draw(ctx, cw, H, 180, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

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

        <div style={{ marginTop: 4 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default HotGasShocks;
