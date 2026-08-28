/* ============================================================
   STATION 4 — VENUS'S NAKED SURFACE
   Radar (Magellan) revealed a young, well-preserved surface. The
   Maxwell Mountains rise 11 km. There are NO craters smaller than
   10 km, because the thick air burns up any projectile under ~1 km.
   With no water, ice, or strong winds, erosion is almost nil, so
   the surface is "naked" — and the whole planet appears to have
   been resurfaced by volcanism 300–600 Myr ago, all at once.
   Grounded in Ch.10 §10.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const TOPICS = {
  maxwell: { en: "Maxwell Mountains", ja: "マクスウェル山脈",
    en_t: "The highest region on Venus, rising 11 km above the lowlands — named for the physicist James Clerk Maxwell.", ja_t: "金星で最も高い地域で、低地から11 km そびえる——物理学者ジェームズ・クラーク・マクスウェルにちなむ。" },
  craters: { en: "No small craters", ja: "小クレーターがない",
    en_t: "There are no impact craters under 10 km across: Venus's thick atmosphere stops and burns up any projectile smaller than about 1 km before it can reach the ground.", ja_t: "直径10 km未満の衝突クレーターがない：金星の厚い大気が、約1 km未満の発射体を地表に届く前に止めて燃やし尽くす。" },
  naked: { en: "A naked surface", ja: "むき出しの地表",
    en_t: "With no liquid water, no ice, and only gentle surface winds, erosion is almost zero. Venus's landforms stand 'naked' and pristine — far better preserved than Earth's or Mars's.", ja_t: "液体の水も氷もなく、地表の風も穏やかなため、侵食はほぼゼロ。金星の地形は「むき出し」で手つかず——地球や火星よりはるかによく保存されている。" },
  resurface: { en: "Global resurfacing", ja: "全球の再舗装",
    en_t: "Venus's plains are only 300–600 million years old and evenly cratered — a sign the entire planet was repaved by a planet-wide volcanic convulsion all at once, unlike Earth's gradual plate tectonics.", ja_t: "金星の平原はわずか3〜6億年前で、クレーターが均一——地球の緩やかなプレートテクトニクスと違い、全球的な火山の大変動で惑星全体が一度に再舗装された印。" },
};
const ORDER = ["maxwell", "craters", "naked", "resurface"];

const STR = {
  en: {
    title: "Venus's naked surface",
    kind: "Preserved, and mysteriously young",
    lede: "Radar pierced the clouds and found something strange: a surface almost untouched by erosion, yet everywhere the same young age. Explore four clues to Venus's odd geology.",
    thread: "THE STORY CONTINUES",
    threadText: "Below the killing air lies a landscape unlike any other — mountains taller than Everest, craters only above a certain size, and a face that seems to have been made all at once.",
    key: "PRESERVED — AND REPAVED ALL AT ONCE",
    keyText: "Venus's radar-mapped surface has the highest region — the Maxwell Mountains, 11 km tall — and a curious gap: no craters smaller than 10 km, because the dense air incinerates projectiles under ~1 km. With no water, ice, or strong winds, erosion is almost nil, so the surface stands 'naked' and pristine. Yet the plains are all a uniform 300–600 million years old, suggesting Venus was resurfaced in a single planet-wide volcanic convulsion — a very different history from Earth's steady plate tectonics.",
    note: "Radar shows a preserved, weather-free surface with a missing-small-crater signature and one uniform young age — pointing to a whole-planet volcanic repaving, not gradual plate tectonics.",
  },
  ja: {
    title: "金星のむき出しの地表",
    kind: "保存され、そして謎めいて若い",
    lede: "レーダーが雲を貫き、奇妙なものを見つけました：侵食にほとんど触れられていない地表、それでいてどこも同じ若い年代。金星の奇妙な地質への4つの手がかりを調べよう。",
    thread: "物語はつづく",
    threadText: "殺人的な大気の下に、他のどことも違う風景が広がります——エベレストより高い山、ある大きさ以上にしかないクレーター、そして一度にできたように見える顔。",
    key: "保存され——そして一度に再舗装された",
    keyText: "金星のレーダー地図には最高地域——高さ11 kmのマクスウェル山脈——があり、奇妙な空白があります：直径10 km未満のクレーターがない。厚い大気が約1 km未満の発射体を焼き尽くすからです。水も氷も強風もないため侵食はほぼゼロで、地表は「むき出し」で手つかず。それでいて平原はすべて一様に3〜6億年前で、金星が一度の全球的な火山の大変動で再舗装されたことを示唆します——地球の着実なプレートテクトニクスとはまるで違う歴史です。",
    note: "レーダーは、保存され風化のない地表、小クレーター欠如の特徴、そして一様に若い年代を示します——緩やかなプレートテクトニクスではなく、惑星全体の火山再舗装を指し示します。",
  },
};

function rng(seed) { let s = seed; return () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff; }

function draw(ctx, cw, H, topic) {
  ctx.clearRect(0, 0, cw, H);
  // base volcanic plain
  ctx.fillStyle = "#8a5a34"; ctx.fillRect(0, 0, cw, H);
  const r = rng(19);
  if (topic === "maxwell") {
    // mountain rising
    ctx.fillStyle = "#6b4022";
    ctx.beginPath(); ctx.moveTo(cw * 0.2, H - 20); ctx.lineTo(cw * 0.5, 30); ctx.lineTo(cw * 0.8, H - 20); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "rgba(255,240,220,0.6)"; ctx.beginPath(); ctx.moveTo(cw * 0.5, 30); ctx.lineTo(cw * 0.44, 60); ctx.lineTo(cw * 0.56, 60); ctx.closePath(); ctx.fill();
    // height arrow
    ctx.strokeStyle = C.sun; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(cw * 0.85, H - 20); ctx.lineTo(cw * 0.85, 30); ctx.stroke();
    ctx.fillStyle = C.sun; ctx.font = `12px ${mono}`; ctx.textAlign = "left"; ctx.fillText("11 km", cw * 0.85 + 6, H / 2);
    ctx.textAlign = "center"; ctx.fillText("Maxwell Mts", cw * 0.5, H - 6);
  } else if (topic === "craters") {
    // only large craters, none small; a burning-up small meteor
    for (let i = 0; i < 6; i++) { const x = 60 + r() * (cw - 120), y = 40 + r() * (H - 80), rad = 22 + r() * 26; ctx.strokeStyle = "rgba(40,24,12,0.8)"; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2); ctx.stroke(); ctx.fillStyle = "rgba(255,240,220,0.3)"; ctx.beginPath(); ctx.arc(x, y, rad - 3, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(">10 km", x, y + 3); }
    // small meteor burning up in the air (top)
    ctx.strokeStyle = "rgba(255,150,90,0.8)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cw * 0.7, 8); ctx.lineTo(cw * 0.62, 44); ctx.stroke();
    ctx.fillStyle = "#ff8f5a"; ctx.beginPath(); ctx.arc(cw * 0.62, 44, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.danger; ctx.font = `10px ${mono}`; ctx.textAlign = "left"; ctx.fillText("small meteor burns up ✗", cw * 0.5, 30);
  } else if (topic === "naked") {
    // sharp, un-eroded ridges and a fresh crater
    ctx.strokeStyle = "#5a3418"; ctx.lineWidth = 2;
    for (let i = 0; i < 7; i++) { const y = 30 + i * (H - 60) / 6; ctx.beginPath(); ctx.moveTo(10, y + Math.sin(i) * 6); for (let x = 10; x < cw; x += 20) ctx.lineTo(x, y + Math.sin(i + x * 0.02) * 8); ctx.stroke(); }
    ctx.strokeStyle = "rgba(30,18,8,0.9)"; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cw * 0.5, H * 0.5, 30, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = C.good; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText("crisp, un-eroded features ✓", cw / 2, H - 10);
  } else {
    // uniform craters everywhere (same age)
    for (let i = 0; i < 26; i++) { const x = r() * cw, y = r() * H, rad = 6 + r() * 12; ctx.strokeStyle = "rgba(40,24,12,0.7)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2); ctx.stroke(); }
    ctx.fillStyle = C.sun; ctx.font = `700 13px ${mono}`; ctx.textAlign = "center"; ctx.fillText("all 300–600 Myr old — resurfaced at once", cw / 2, H / 2);
  }
}

export function VenusSurface() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [topic, setTopic] = useState("maxwell");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, topic);
  }, [cw, topic, lang]);

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

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {ORDER.map((id) => (
            <button key={id} onClick={() => setTopic(id)}
              style={{ ...styles.chip, ...(topic === id ? styles.chipOn : {}) }}>{lang === "ja" ? TOPICS[id].ja : TOPICS[id].en}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.5, marginTop: 8 }}>{lang === "ja" ? TOPICS[topic].ja_t : TOPICS[topic].en_t}</p>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default VenusSurface;
