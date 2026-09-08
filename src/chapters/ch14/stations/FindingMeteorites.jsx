/* ============================================================
   STATION 4 — FINDING METEORITES
   Outside Antarctica only ~25 genuine meteorites are recovered per year.
   The Antarctic ice cap is by far the most productive source, because
   it acts as a natural conveyor: meteorites fall, are buried in
   accumulating snow/ice, carried slowly by the flowing ice toward
   mountain barriers, and finally concentrated at the surface in "blue
   ice" fields where dry winds wear the ice away. Grounded in Ch.14 §14.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Finding meteorites",
    kind: "The Antarctic conveyor belt",
    lede: "Watch the ice do the collecting. Meteorites fall over a huge area, sink into the ice, ride its slow flow to the mountains, then surface where the wind strips the ice bare.",
    thread: "THE STORY CONTINUES",
    threadText: "Meteorites fall everywhere, but they're hard to spot and quick to weather. Antarctica changed everything — a whole continent that gathers, stores, and then displays them for us.",
    key: "ICE BURIES, CARRIES, AND CONCENTRATES THEM",
    keyText: "Outside Antarctica, genuine meteorites are recovered at a rate of only about 25 per year. The Antarctic ice cap is by far the most productive source on Earth — not because more fall there, but because the ice concentrates them. Meteorites that land are buried in accumulating ice, carried slowly along as the ice flows toward mountain barriers, and finally brought to the surface and concentrated in 'blue ice' zones where persistent dry winds wear the ice away, leaving the dark stones behind on top. Against a white background, they are easy to find.",
    fall: "meteorites fall + buried", flow: "ice flows →", blue: "blue-ice zone: wind strips ice, stones pile up",
    rate1: "Rest of the world: ≈ 25 meteorites / year",
    rate2: "Antarctica (ANSMET & others): thousands recovered",
    note: "Antarctica is the top meteorite source: ice buries fallen stones, flows them to mountains, and wind-scoured blue-ice fields expose and concentrate them. Elsewhere, only ~25 are found per year.",
  },
  ja: {
    title: "隕石を見つける",
    kind: "南極のベルトコンベア",
    lede: "氷が集めてくれる様子を見よう。隕石は広い範囲に落ち、氷に沈み、そのゆっくりした流れに乗って山へ運ばれ、風が氷を剥ぎ取る場所で地表に現れます。",
    thread: "物語はつづく",
    threadText: "隕石はどこにでも落ちますが、見つけにくく、すぐに風化します。南極がすべてを変えました——集め、蓄え、そして私たちに見せてくれる大陸です。",
    key: "氷が埋め、運び、そして濃縮する",
    keyText: "南極以外では、本物の隕石が回収されるのは年に約25個だけです。南極の氷床は地球上で圧倒的に生産的な源です——そこに多く落ちるからではなく、氷が隕石を濃縮するからです。落ちた隕石は積もる氷に埋もれ、氷が山の障壁へ流れるにつれてゆっくり運ばれ、最後に、絶え間ない乾いた風が氷を削る「青氷」帯で地表に現れて濃縮され、暗い石が上に残されます。白い背景の上では、見つけるのが簡単です。",
    fall: "隕石が落ちて埋もれる", flow: "氷が流れる →", blue: "青氷帯：風が氷を剥ぎ、石が集まる",
    rate1: "世界の他の地域：年に約25個",
    rate2: "南極（ANSMETほか）：数千個を回収",
    note: "南極は隕石の最大の源です：氷が落ちた石を埋め、山へ運び、風に削られた青氷帯が露出・濃縮します。他の地域では年に約25個しか見つかりません。",
  },
};

function draw(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const skyH = H * 0.3;
  // sky
  ctx.fillStyle = "rgba(30,45,80,0.4)"; ctx.fillRect(0, 0, cw, skyH);
  // ice body: thick at left (accumulation), thinning at right against mountains
  ctx.fillStyle = "#dfeaf2";
  ctx.beginPath();
  ctx.moveTo(0, skyH + 10);
  ctx.lineTo(cw * 0.78, skyH + 40);
  ctx.lineTo(cw * 0.78, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fill();
  // blue ice zone (right, near mountains)
  ctx.fillStyle = "#a9cfe0";
  ctx.beginPath(); ctx.moveTo(cw * 0.62, skyH + 32); ctx.lineTo(cw * 0.78, skyH + 40); ctx.lineTo(cw * 0.78, H); ctx.lineTo(cw * 0.62, H); ctx.closePath(); ctx.fill();
  // mountains barrier at right
  ctx.fillStyle = "#5a5148";
  ctx.beginPath(); ctx.moveTo(cw * 0.78, H); ctx.lineTo(cw * 0.86, skyH + 20); ctx.lineTo(cw * 0.93, H); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(cw * 0.88, H); ctx.lineTo(cw * 0.96, skyH + 40); ctx.lineTo(cw, H); ctx.closePath(); ctx.fill();
  // wind arrows over blue ice
  ctx.strokeStyle = "rgba(150,200,235,0.7)"; ctx.lineWidth = 1;
  for (let i = 0; i < 3; i++) { const wy = skyH + 20 + i * 8; const wx = cw * 0.6 + ((tt * 2 + i * 30) % 60); ctx.beginPath(); ctx.moveTo(wx, wy); ctx.lineTo(wx + 14, wy); ctx.stroke(); ctx.beginPath(); ctx.moveTo(wx + 14, wy); ctx.lineTo(wx + 10, wy - 2); ctx.stroke(); }
  // meteorites: buried at left, flowing right, surfacing at blue-ice zone
  const N = 7;
  for (let i = 0; i < N; i++) {
    const p = ((tt * 0.0016 + i / N) % 1);
    const x = p * cw * 0.72;
    let y;
    if (p < 0.7) y = skyH + 55 + Math.sin(i) * 30 + (1 - p) * 20; // buried within ice
    else y = skyH + 44 - (p - 0.7) / 0.3 * 8; // rise to surface near blue ice
    ctx.fillStyle = "#2e2a24"; ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
  }
  // piled stones on the blue-ice surface
  for (let i = 0; i < 5; i++) { ctx.fillStyle = "#2e2a24"; ctx.beginPath(); ctx.arc(cw * 0.66 + i * 8, skyH + 40 - (i % 2) * 3, 3, 0, Math.PI * 2); ctx.fill(); }
  // labels
  ctx.font = `9px ${mono}`; ctx.textAlign = "left";
  ctx.fillStyle = C.muted; ctx.fillText(t.fall, 8, skyH + 20);
  ctx.fillStyle = C.cool; ctx.fillText(t.flow, cw * 0.32, skyH + 20);
  ctx.fillStyle = "#5aa0c8"; ctx.textAlign = "center"; ctx.fillText(t.blue, cw * 0.64, H - 8);
}

export function FindingMeteorites() {
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
        <div style={styles.stepCounter}>STATION 04</div>
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

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
          <span style={{ fontFamily: mono, fontSize: 11.5, color: C.muted, border: `1px solid ${C.border}`, borderRadius: 8, padding: "4px 10px" }}>{t.rate1}</span>
          <span style={{ fontFamily: mono, fontSize: 11.5, color: C.cool, border: `1px solid ${C.border}`, borderRadius: 8, padding: "4px 10px" }}>{t.rate2}</span>
        </div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default FindingMeteorites;
