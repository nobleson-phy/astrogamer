/* ============================================================
   STATION 7 — THE ACTIVE SUN
   The magnetic Sun is restless. PLAGES are bright hot patches in the
   chromosphere around sunspots. PROMINENCES are huge loops of glowing
   gas arching into the corona. CORONAL HOLES are dark, open-field
   regions from which the high-speed solar wind escapes. CORONAL MASS
   EJECTIONS (CMEs) are giant bubbles of magnetized plasma hurled into
   space at hundreds of km/s. Grounded in Ch.15 §15.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const FEATURES = [
  { id: "plages", en: "Plages", ja: "白斑",
    en_d: "Bright, hot cloud-like regions in the chromosphere directly around sunspots.", ja_d: "黒点を直接取り囲む、彩層の明るく熱い雲状の領域。" },
  { id: "prominences", en: "Prominences", ja: "プロミネンス",
    en_d: "Huge, graceful loops of glowing gas extending from active regions into the corona.", ja_d: "活動領域からコロナへ伸びる、輝くガスの巨大で優美なループ。" },
  { id: "holes", en: "Coronal holes", ja: "コロナホール",
    en_d: "Dark, open-field regions from which high-speed solar wind escapes most easily into space.", ja_d: "高速の太陽風が最も容易に宇宙へ逃げ出す、暗く磁場が開いた領域。" },
  { id: "cme", en: "Coronal mass ejection", ja: "コロナ質量放出",
    en_d: "A massive bubble of magnetized gas thrown into space at several hundred km/s.", ja_d: "磁化したガスの巨大な泡が、毎秒数百kmで宇宙へ放り出される。" },
];

const STR = {
  en: {
    title: "The active Sun",
    kind: "Plages, prominences, holes & CMEs",
    lede: "The Sun's magnetism throws off spectacular features. Tap each one to light it up on the disk — from bright plages to a plasma bubble blasting into space.",
    thread: "THE STORY CONTINUES",
    threadText: "Where the Sun's magnetic field pierces the surface, the atmosphere comes alive — glowing, looping, and sometimes exploding outward toward the planets.",
    key: "FOUR FACES OF SOLAR ACTIVITY",
    keyText: "The magnetically active Sun shows several distinctive features. PLAGES are bright, hot cloud-like regions in the chromosphere directly surrounding sunspots. PROMINENCES are huge, graceful loops or plumes of glowing gas extending from active regions up into the corona. CORONAL HOLES are dark regions of open magnetic field from which the high-speed solar wind escapes most easily into interplanetary space. And a CORONAL MASS EJECTION (CME) is a violent eruption that hurls a massive bubble of magnetized gas off the Sun at several hundred kilometers per second.",
    note: "Plages are bright chromospheric patches by sunspots; prominences are gas loops into the corona; coronal holes let the fast solar wind escape; and CMEs blast bubbles of magnetized plasma into space.",
  },
  ja: {
    title: "活動的な太陽",
    kind: "白斑・プロミネンス・ホール・CME",
    lede: "太陽の磁気は壮観な現象を放ちます。それぞれをタップして円盤上で光らせよう——明るい白斑から、宇宙へ吹き出すプラズマの泡まで。",
    thread: "物語はつづく",
    threadText: "太陽の磁場が表面を貫くところで、大気は生き生きとします——輝き、ループを描き、時に惑星へ向かって外へ爆発します。",
    key: "太陽活動の4つの顔",
    keyText: "磁気的に活動的な太陽は、いくつかの特徴的な現象を見せます。白斑は、黒点を直接取り囲む彩層の明るく熱い雲状の領域です。プロミネンスは、活動領域からコロナへ伸びる、輝くガスの巨大で優美なループやプルームです。コロナホールは、高速の太陽風が惑星間空間へ最も容易に逃げ出す、磁場が開いた暗い領域です。そしてコロナ質量放出（CME）は、磁化したガスの巨大な泡を毎秒数百kmで太陽から放り出す激しい爆発です。",
    note: "白斑は黒点そばの明るい彩層の斑、プロミネンスはコロナへのガスのループ、コロナホールは高速太陽風の出口、CMEは磁化プラズマの泡を宇宙へ放ちます。",
  },
};

function draw(ctx, cw, H, feat, tt, lang) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.42, cy = H / 2, R = Math.min(cw * 0.24, H * 0.4);
  // corona glow
  const cg = ctx.createRadialGradient(cx, cy, R, cx, cy, R * 1.5);
  cg.addColorStop(0, "rgba(255,210,140,0.25)"); cg.addColorStop(1, "rgba(255,180,80,0)");
  ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(cx, cy, R * 1.5, 0, Math.PI * 2); ctx.fill();
  // sun disk
  const g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.2, cx, cy, R);
  g.addColorStop(0, "#ffe08a"); g.addColorStop(1, "#e8952a");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip();
  // a sunspot always present (reference)
  ctx.fillStyle = "rgba(120,70,25,0.85)"; ctx.beginPath(); ctx.arc(cx - R * 0.2, cy + R * 0.1, R * 0.14, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#2a1c0e"; ctx.beginPath(); ctx.arc(cx - R * 0.2, cy + R * 0.1, R * 0.07, 0, Math.PI * 2); ctx.fill();
  if (feat === "plages") {
    // bright patches around the sunspot
    for (const [dx, dy] of [[-0.1, 0.02], [-0.32, 0.12], [-0.2, 0.28], [-0.08, 0.2]]) {
      ctx.fillStyle = "rgba(255,250,210,0.8)"; ctx.beginPath(); ctx.arc(cx + dx * R, cy + dy * R, R * 0.08, 0, Math.PI * 2); ctx.fill();
    }
  }
  if (feat === "holes") {
    // dark coronal hole region (top)
    ctx.fillStyle = "rgba(20,18,30,0.7)"; ctx.beginPath(); ctx.ellipse(cx + R * 0.2, cy - R * 0.5, R * 0.5, R * 0.35, 0.3, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
  // prominences: loops off the limb
  if (feat === "prominences") {
    ctx.strokeStyle = "rgba(255,120,90,0.85)"; ctx.lineWidth = 3;
    for (const a of [-0.5, 0.2, 1.0]) {
      const bx = cx + Math.cos(a) * R, by = cy + Math.sin(a) * R;
      const nx = cx + Math.cos(a + 0.32) * R, ny = cy + Math.sin(a + 0.32) * R;
      const mx = (bx + nx) / 2 + Math.cos(a + 0.16) * R * 0.5, my = (by + ny) / 2 + Math.sin(a + 0.16) * R * 0.5;
      ctx.beginPath(); ctx.moveTo(bx, by); ctx.quadraticCurveTo(mx, my, nx, ny); ctx.stroke();
    }
  }
  // coronal-hole wind streams
  if (feat === "holes") {
    ctx.strokeStyle = "rgba(150,200,255,0.6)"; ctx.lineWidth = 1;
    for (let i = 0; i < 6; i++) { const a = -1.1 + i * 0.12; const off = (tt * 2 + i * 20) % 60; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * (R + off), cy + Math.sin(a) * (R + off)); ctx.lineTo(cx + Math.cos(a) * (R + off + 14), cy + Math.sin(a) * (R + off + 14)); ctx.stroke(); }
  }
  // CME bubble erupting to the right
  if (feat === "cme") {
    const p = (tt % 160) / 160;
    const ex = cx + R + p * cw * 0.4, ey = cy - R * 0.2;
    const eg = ctx.createRadialGradient(ex, ey, 2, ex, ey, 30 + p * 20);
    eg.addColorStop(0, `rgba(255,180,120,${0.6 * (1 - p)})`); eg.addColorStop(1, "rgba(255,120,80,0)");
    ctx.fillStyle = eg; ctx.beginPath(); ctx.arc(ex, ey, 30 + p * 20, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = `rgba(255,200,150,${0.7 * (1 - p)})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(ex, ey, 30 + p * 20, -1, 1); ctx.stroke();
  }
  ctx.fillStyle = C.text; ctx.font = `700 12px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(lang === "ja" ? FEATURES.find(f => f.id === feat).ja : FEATURES.find(f => f.id === feat).en, cx, cy + R + 26 > H - 6 ? H - 6 : cy + R + 26);
}

export function ActiveSun() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [feat, setFeat] = useState("plages");
  const featRef = useRef("plages"); featRef.current = feat;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, featRef.current, 40, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, featRef.current, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

  const f = FEATURES.find((x) => x.id === feat);

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

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {FEATURES.map((x) => (
            <button key={x.id} onClick={() => setFeat(x.id)}
              style={{ ...styles.chip, ...(feat === x.id ? styles.chipOn : {}) }}>{lang === "ja" ? x.ja : x.en}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.5, marginTop: 8 }}>{lang === "ja" ? f.ja_d : f.en_d}</p>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default ActiveSun;
