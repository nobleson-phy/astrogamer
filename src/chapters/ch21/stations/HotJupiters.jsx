/* ============================================================
   STATION 6 — HOT JUPITERS
   Hot Jupiters are giant planets orbiting their stars in just a few days.
   They were a shock in 1995: gas giants need an icy core to grow, which can
   only form far out, beyond the "ice line" — so a Jupiter right next to its
   star shouldn't exist there. The answer is MIGRATION: they form far out,
   then spiral inward through gravitational and frictional interaction with
   the disk. Young gas giants still glow with formation heat, bright in the
   infrared for direct imaging. Grounded in Ch.21 §21.4.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Hot Jupiters",
    kind: "A giant where it shouldn't be",
    lede: "Watch a giant planet form in the cold outer disk, then migrate right up next to its star. Then see why young giants are the ones we can photograph.",
    thread: "THE STORY CONTINUES",
    threadText: "The very first exoplanets broke the rules. Giant planets were supposed to stay far from their stars — yet there they were, roasting on orbits of a few days.",
    migKey: "FORMED FAR OUT, THEN MIGRATED IN",
    migText: "A HOT JUPITER is a giant planet orbiting its star in only a few days. These were a surprise when first found in 1995, because gas giants need to build a massive icy core to capture their gas — and that can only happen far from the star, beyond the 'ice line' where water ice condenses. So a Jupiter should not form right next to its star. The resolution is MIGRATION: the giant forms far out, then spirals inward through gravitational interactions and friction with the protoplanetary disk, ending up in a tight, short-period orbit.",
    imgKey: "YOUNG GIANTS GLOW — EASIER TO IMAGE",
    imgText: "Gas giants can also be seen directly, and here age matters. A young gas giant still retains the heat left over from its gravitational formation and ongoing contraction, so it glows brightly at infrared wavelengths. An older giant of the same mass has cooled and faded. That is why direct imaging favors young, still-warm giant planets.",
    mig: "Migration", img: "Direct imaging",
    iceline: "ice line", forms: "forms here (cold)", migrates: "migrates inward", hot: "hot Jupiter",
    young: "young giant: hot → bright IR", old: "old giant: cooled → faint",
    noteM: "Hot Jupiters orbit in days. Giants must form far out beyond the ice line, then migrate inward via disk interactions to end up close to their star.",
    noteI: "Young gas giants still glow with formation heat in the infrared, so they are far easier to image directly than older, cooled giants.",
  },
  ja: {
    title: "ホットジュピター",
    kind: "あるはずのない場所の巨星",
    lede: "巨大惑星が冷たい外側の円盤で形成され、星のすぐ隣まで移動する様子を見よう。それから、なぜ若い巨星こそ撮影できるのかを見よう。",
    thread: "物語はつづく",
    threadText: "最初の系外惑星は規則を破りました。巨大惑星は星から遠くにとどまるはずでした——なのにそこに、数日の軌道で焼かれていたのです。",
    migKey: "遠方で形成され、内側へ移動した",
    migText: "ホットジュピターは、わずか数日で星を回る巨大惑星です。1995年に初めて見つかったとき驚きでした。巨大ガス惑星はガスを捕まえるために大きな氷の核を作る必要があり——それは星から遠く、水の氷が凝縮する「アイスライン」の外でしか起こりえないからです。だから木星は星のすぐ隣では形成されないはず。その解決が移動です：巨星は遠方で形成され、原始惑星系円盤との重力的相互作用と摩擦で内側へ渦を巻いて進み、狭く短周期の軌道に落ち着きます。",
    imgKey: "若い巨星は輝く——撮影しやすい",
    imgText: "巨大ガス惑星は直接見ることもでき、ここでは年齢が重要です。若い巨大ガス惑星は、重力的な形成と続く収縮の残り熱をまだ保つので、赤外線で明るく輝きます。同じ質量の古い巨星は冷えて暗くなっています。だから直接撮像は、若くまだ暖かい巨大惑星に有利です。",
    mig: "移動", img: "直接撮像",
    iceline: "アイスライン", forms: "ここで形成（冷たい）", migrates: "内側へ移動", hot: "ホットジュピター",
    young: "若い巨星：高温 → 明るいIR", old: "古い巨星：冷えた → 暗い",
    noteM: "ホットジュピターは数日で公転。巨星はアイスラインの外の遠方で形成され、円盤との相互作用で内側へ移動して星の近くに落ち着くはずです。",
    noteI: "若い巨大ガス惑星は形成の熱で赤外線にまだ輝くので、冷えた古い巨星よりはるかに直接撮像しやすいのです。",
  },
};

function drawMig(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const sx = 46, sy = H / 2;
  // star
  const g = ctx.createRadialGradient(sx, sy, 2, sx, sy, 24); g.addColorStop(0, "#fff2c0"); g.addColorStop(1, "rgba(255,180,60,0)");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sx, sy, 24, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffd86b"; ctx.beginPath(); ctx.arc(sx, sy, 10, 0, Math.PI * 2); ctx.fill();
  // ice line
  const iceX = cw * 0.6;
  ctx.strokeStyle = "rgba(150,200,255,0.5)"; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(iceX, 20); ctx.lineTo(iceX, H - 30); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = "#8fbfff"; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.iceline, iceX, 14);
  // giant forms far out then migrates in
  const cyc = tt % 320, p = cyc / 320;
  const startX = cw * 0.82, endX = sx + 46;
  const gx = startX - Math.min(p / 0.8, 1) * (startX - endX);
  const jg = ctx.createRadialGradient(gx - 3, sy - 3, 1, gx, sy, 12); jg.addColorStop(0, "#f0c98a"); jg.addColorStop(1, "#b06a2a");
  ctx.fillStyle = jg; ctx.beginPath(); ctx.arc(gx, sy, 11, 0, Math.PI * 2); ctx.fill();
  // migration arrow
  ctx.strokeStyle = "rgba(255,207,107,0.6)"; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(startX, sy + 24); ctx.lineTo(endX + 10, sy + 24); ctx.stroke(); ctx.setLineDash([]);
  ctx.beginPath(); ctx.moveTo(endX + 10, sy + 24); ctx.lineTo(endX + 18, sy + 20); ctx.lineTo(endX + 18, sy + 28); ctx.closePath(); ctx.fillStyle = "rgba(255,207,107,0.9)"; ctx.fill();
  ctx.fillStyle = C.cool; ctx.font = `9px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.forms, startX, sy - 18); ctx.fillText(t.migrates, (startX + endX) / 2, sy - 8);
  ctx.fillStyle = "#e0774f"; ctx.fillText(t.hot, endX, sy + 42);
}

function drawImg(ctx, cw, H, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cy = H * 0.44;
  // young giant (left): bright IR glow
  const yx = cw * 0.3;
  const yg = ctx.createRadialGradient(yx, cy, 2, yx, cy, 28); yg.addColorStop(0, "#ffb070"); yg.addColorStop(1, "rgba(255,120,60,0)");
  ctx.fillStyle = yg; ctx.beginPath(); ctx.arc(yx, cy, 28, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ff9a52"; ctx.beginPath(); ctx.arc(yx, cy, 10, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ff9a52"; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.young, yx, cy + 44);
  // old giant (right): faint
  const ox = cw * 0.72;
  ctx.fillStyle = "rgba(120,80,60,0.6)"; ctx.beginPath(); ctx.arc(ox, cy, 9, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.faint; ctx.fillText(t.old, ox, cy + 44);
  ctx.fillStyle = C.cool; ctx.font = `9px ${mono}`; ctx.fillText(lang === "ja" ? "同じ質量、違う年齢" : "same mass, different age", cw / 2, H - 10);
}

export function HotJupiters() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("mig");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (mode === "img") { drawImg(ctx, cw, H, lang); return; }
    if (reduceMotion) { drawMig(ctx, cw, H, 150, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; drawMig(ctx, cw, H, tt, lang); raf = requestAnimationFrame(loop); };
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
          <div style={{ ...styles.fateLabel, color: C.sun }}>{mode === "mig" ? t.migKey : t.imgKey}</div>
          <p style={styles.keyTermText}>{mode === "mig" ? t.migText : t.imgText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          {[["mig", t.mig], ["img", t.img]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{mode === "mig" ? t.noteM : t.noteI}</p>
      </div>
    </div>
  );
}

export default HotJupiters;
