/* ============================================================
   STATION 5 — THE RED PLANET
   Mars is red because its soil is full of iron oxides — rust.
   Its day is almost Earthlike: 24 h 37 m 23 s. In 1976 the twin
   Viking 1 and Viking 2 landers touched down to photograph the
   surface and run the first experiments searching for life.
   Grounded in Ch.10 §10.3–10.4.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

function rng(seed) { let s = seed; return () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff; }

const STR = {
  en: {
    title: "The red planet",
    kind: "A rusty world with an Earthlike day",
    lede: "Mars glows red for a homely reason: its dust is rusting. Spin the globe — it turns once every 24 hours and 37 minutes, almost like ours — and meet the landers that first stood on it.",
    thread: "THE STORY CONTINUES",
    threadText: "We leave Venus's inferno for the opposite extreme: a small, cold, dry world that has always fascinated us. Yet in its spin and seasons, Mars feels oddly familiar.",
    key: "RUST, AND A 24-HOUR-37-MINUTE DAY",
    keyText: "Mars is famously red because its soil is rich in IRON OXIDES — literally rust. In many ways it is the most Earthlike planet: its sidereal day is 24 hours 37 minutes 23 seconds, only a little longer than Earth's, and it has similar seasons from a comparable axial tilt. The modern era of Mars exploration began in 1976, when NASA's twin VIKING 1 and VIKING 2 landers touched down, photographed the surface, and ran the first experiments to search for life in the soil.",
    dayL: "Sidereal day", spin: "▶ Spin Mars", viking: "1976 · Viking 1 & Viking 2 — first successful landers",
    rust: "iron oxides (rust)",
    note: "Rust gives Mars its colour; a 24 h 37 m spin gives it an almost-Earthly day. The Viking landers of 1976 opened the age of exploring its surface directly.",
  },
  ja: {
    title: "赤い惑星",
    kind: "地球に似た一日をもつ、錆びた世界",
    lede: "火星が赤く輝くのは身近な理由です：その塵が錆びているのです。球を回そう——24時間37分でほぼ地球のように1回転する——そして初めてその上に立った着陸機に会おう。",
    thread: "物語はつづく",
    threadText: "金星の灼熱を離れ、正反対の極へ：小さく、冷たく、乾いた、私たちをずっと魅了してきた世界。それでも自転と季節において、火星は奇妙に親しみやすいのです。",
    key: "錆、そして24時間37分の一日",
    keyText: "火星が赤いのは有名で、土壌が酸化鉄——文字通りの錆——に富むからです。多くの点で最も地球に似た惑星です：恒星日は24時間37分23秒で、地球よりわずかに長いだけ。同程度の地軸の傾きから似た季節ももちます。現代の火星探査は1976年に始まり、NASAの双子のバイキング1号と2号が着陸し、地表を撮影し、土壌に生命を探す最初の実験を行いました。",
    dayL: "恒星日", spin: "▶ 火星を回す", viking: "1976年 · バイキング1号・2号——初の成功した着陸機",
    rust: "酸化鉄（錆）",
    note: "錆が火星に色を与え、24時間37分の自転がほぼ地球のような一日を与えます。1976年のバイキング着陸機が、その地表を直接探る時代を開きました。",
  },
};

function drawMars(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.42, cy = H / 2, R = Math.min(cw * 0.3, H * 0.42);
  const g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.2, cx, cy, R);
  g.addColorStop(0, "#e8895a"); g.addColorStop(1, "#a34424");
  ctx.save();
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip();
  ctx.fillStyle = g; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
  // rotating surface markings — spot properties fixed per spot (so they don't
  // flicker), then culled to the visible near hemisphere by the z-axis.
  const r = rng(7);
  const spin = tt * 0.01;
  for (let i = 0; i < 56; i++) {
    const lon0 = r() * Math.PI * 2;      // fixed longitude
    const lat = Math.asin(r() * 2 - 1);  // uniform latitude over the sphere
    const size = 3 + r() * 7;
    const shade = 0.35 + r() * 0.25;
    const lon = lon0 + spin;             // rotate with time
    const cl = Math.cos(lat);
    const pz = cl * Math.cos(lon);       // toward the viewer
    if (pz <= 0) continue;               // on the far side — hidden
    const px = cl * Math.sin(lon);
    const x = cx + px * R, y = cy + Math.sin(lat) * R;
    ctx.fillStyle = `rgba(120,55,30,${shade})`;
    ctx.beginPath(); ctx.arc(x, y, size * (0.45 + 0.55 * pz), 0, Math.PI * 2); ctx.fill();
  }
  // polar caps
  ctx.fillStyle = "rgba(240,245,255,0.85)"; ctx.beginPath(); ctx.ellipse(cx, cy - R * 0.9, R * 0.5, R * 0.14, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx, cy + R * 0.92, R * 0.4, R * 0.12, 0, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
  ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
  // rust label
  ctx.fillStyle = "#e8895a"; ctx.font = `11px ${mono}`; ctx.textAlign = "left"; ctx.fillText("● " + t.rust, cx + R + 16, cy);
  // day readout
  ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.textAlign = "left"; ctx.fillText(t.dayL, cx + R + 16, cy + 24);
  ctx.fillStyle = C.cool; ctx.font = `700 14px ${mono}`; ctx.fillText("24h 37m 23s", cx + R + 16, cy + 42);
}

export function RedPlanet() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { drawMars(ctx, cw, H, 30, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; drawMars(ctx, cw, H, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 05</div>
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

        <div style={{ fontFamily: mono, fontSize: 12, color: C.cool, marginTop: 8 }}>{t.viking}</div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default RedPlanet;
