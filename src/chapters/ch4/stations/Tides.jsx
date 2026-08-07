/* ============================================================
   STATION 6 — OCEAN TIDES
   The Moon's differential (tidal) force — stronger on the near side,
   weaker on the far side than at Earth's center — stretches Earth and
   its oceans into TWO bulges (near and far). Spring tides (largest)
   occur at new & full moon when Sun and Moon align and reinforce; neap
   tides (smallest) at the quarters. Over long times, tidal friction
   slows Earth's rotation and lets the Moon spiral slowly away.
   Grounded in Ch.4 §4.6.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Ocean tides",
    kind: "Two bulges, spring & neap tides",
    lede: "The Moon pulls the near ocean harder than Earth's center, and the center harder than the far ocean. That difference stretches the seas into two bulges — one toward the Moon, one away. Switch between alignments to see spring and neap tides.",
    thread: "THE STORY CONTINUES",
    threadText: "The Moon does more than change shape overhead — it tugs on the sea. Because gravity weakens with distance, its pull is uneven across the width of Earth, and that unevenness lifts the twice-daily tides that have shaped every coastline.",
    key: "TWO BULGES, NOT ONE",
    keyText: "The Moon's gravity is strongest on the near side, weaker at Earth's center, and weakest on the far side. Relative to the center, the near water is pulled toward the Moon and the far water is 'left behind' — so Earth's oceans bulge on BOTH sides, giving two high tides each day.",
    spring: "Spring tide", neap: "Neap tide",
    springSub: "new / full moon — aligned", neapSub: "quarter moon — at right angles",
    springNote: "At new and full moon the Sun and Moon line up, so their tidal pulls reinforce: the bulges grow and tides are largest.",
    neapNote: "At the quarters the Sun pulls at right angles to the Moon, partly cancelling it: the bulges shrink and tides are smallest.",
    frictionTitle: "Tidal friction · the long goodbye",
    frictionNote: "Dragging these bulges across a spinning Earth costs energy. Tidal friction slowly lengthens our day (about 0.002 seconds per century) and hands angular momentum to the Moon, which spirals gradually away from us.",
    moon: "Moon", sun: "Sun", earth: "Earth",
  },
  ja: {
    title: "潮の満ち引き（潮汐）",
    kind: "二つの膨らみ、大潮と小潮",
    lede: "月は地球の中心よりも近い側の海を強く引き、中心を遠い側の海より強く引きます。その差が海を二つの膨らみ——月へ向かう側と反対側——に引き伸ばします。配置を切り替えて、大潮と小潮を見よう。",
    thread: "物語はつづく",
    threadText: "月は頭上で形を変えるだけではありません——海を引っぱります。重力は距離とともに弱まるため、その引きは地球の幅にわたって不均一で、その不均一さが、あらゆる海岸線を形づくってきた1日2回の潮を持ち上げるのです。",
    key: "膨らみは一つでなく二つ",
    keyText: "月の重力は近い側で最も強く、地球の中心では弱く、遠い側で最も弱くなります。中心を基準にすると、近い側の水は月へ引かれ、遠い側の水は「取り残され」ます——だから地球の海は両側で膨らみ、1日に2回の満潮が生じます。",
    spring: "大潮", neap: "小潮",
    springSub: "新月／満月——一直線", neapSub: "上弦・下弦——直角",
    springNote: "新月と満月では太陽と月が一直線に並ぶため、両者の潮汐力が強め合います：膨らみが大きくなり、潮の差が最大になります。",
    neapNote: "上弦・下弦では太陽が月と直角の向きに引くため、部分的に打ち消し合います：膨らみが小さくなり、潮の差が最小になります。",
    frictionTitle: "潮汐摩擦・長い別れ",
    frictionNote: "自転する地球の上でこの膨らみを引きずるには、エネルギーがかかります。潮汐摩擦は1日を少しずつ長くし（1世紀あたり約0.002秒）、角運動量を月に渡すため、月は少しずつ私たちから遠ざかっていきます。",
    moon: "月", sun: "太陽", earth: "地球",
  },
};

function draw(ctx, cw, H, spring, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2;
  const Re = Math.min(cw * 0.14, 56);

  // water bulge ellipse pointing at Moon (Moon to the right)
  const bulge = spring ? Re * 0.5 : Re * 0.28;
  ctx.fillStyle = "rgba(99,211,240,0.18)";
  ctx.beginPath(); ctx.ellipse(cx, cy, Re + bulge, Re + (spring ? Re * 0.06 : Re * 0.14) - (spring ? 0 : 0), 0, 0, Math.PI * 2);
  // simpler: horizontal stretch, vertical squash
  ctx.closePath();
  ctx.beginPath();
  ctx.ellipse(cx, cy, Re + bulge, Re - bulge * 0.35, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(99,211,240,0.5)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.ellipse(cx, cy, Re + bulge, Re - bulge * 0.35, 0, 0, Math.PI * 2); ctx.stroke();

  // Earth
  const eg = ctx.createRadialGradient(cx - Re * 0.3, cy - Re * 0.3, Re * 0.2, cx, cy, Re);
  eg.addColorStop(0, "#5a92cf"); eg.addColorStop(1, "#183a63");
  ctx.fillStyle = eg; ctx.beginPath(); ctx.arc(cx, cy, Re, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.faint; ctx.font = `12px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.earth, cx, cy + 4);

  // Moon to the right
  const moonX = cw - 44, moonY = cy;
  ctx.fillStyle = "#cdd3e8"; ctx.beginPath(); ctx.arc(moonX, moonY, 13, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.faint; ctx.fillText(t.moon, moonX, moonY + 28);
  // differential-force arrows near/center/far
  ctx.strokeStyle = C.sun; ctx.lineWidth = 2;
  const arrow = (x, len) => { ctx.beginPath(); ctx.moveTo(x, cy - Re - 16); ctx.lineTo(x + len, cy - Re - 16); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + len, cy - Re - 16); ctx.lineTo(x + len - 4 * Math.sign(len), cy - Re - 19); ctx.lineTo(x + len - 4 * Math.sign(len), cy - Re - 13); ctx.fill(); };
  arrow(cx + Re + bulge - 20, 20);  // near: strong
  arrow(cx - 8, 14);                // center: medium
  arrow(cx - Re - bulge, 8);        // far: weak
  ctx.font = `10px ${mono}`; ctx.fillStyle = C.faint; ctx.textAlign = "center";
  ctx.fillText(lang === "ja" ? "強" : "strong", cx + Re + bulge - 6, cy - Re - 24);
  ctx.fillText(lang === "ja" ? "弱" : "weak", cx - Re - bulge + 4, cy - Re - 24);

  // Sun
  const sunTop = spring; // spring: sun aligned (right, behind moon or opposite); neap: sun above
  ctx.textAlign = "center";
  if (spring) {
    const sx = 40, sy = cy;
    const g = ctx.createRadialGradient(sx, sy, 2, sx, sy, 20);
    g.addColorStop(0, "#fff"); g.addColorStop(0.4, "#ffcf6b"); g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sx, sy, 20, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#ffcf6b"; ctx.beginPath(); ctx.arc(sx, sy, 9, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.sun; ctx.font = `12px ${mono}`; ctx.fillText(t.sun, sx, sy + 34);
  } else {
    const sx = cx, sy = 34;
    const g = ctx.createRadialGradient(sx, sy, 2, sx, sy, 18);
    g.addColorStop(0, "#fff"); g.addColorStop(0.4, "#ffcf6b"); g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sx, sy, 18, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#ffcf6b"; ctx.beginPath(); ctx.arc(sx, sy, 8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.sun; ctx.font = `12px ${mono}`; ctx.fillText(t.sun, sx + 24, sy);
  }
}

export function Tides() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 300;
  const canvasRef = useRef(null);
  const [spring, setSpring] = useState(true);
  const cw = Math.min(w, 760);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, spring, lang);
  }, [cw, spring, lang]);

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

        <div style={styles.pickerRow}>
          <button onClick={() => setSpring(true)} style={{ ...styles.chip, ...(spring ? styles.chipOn : {}) }}>{t.spring}</button>
          <button onClick={() => setSpring(false)} style={{ ...styles.chip, ...(!spring ? styles.chipOn : {}) }}>{t.neap}</button>
        </div>

        <canvas ref={canvasRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)", marginTop: 12 }} />

        <div style={{ marginTop: 12, padding: "12px 14px", borderRadius: 12, border: `1px solid ${spring ? C.borderBright : C.border}`, background: "rgba(8,12,26,0.6)" }}>
          <div style={{ fontFamily: display, fontSize: 19, color: spring ? C.sun : C.cool }}>
            {spring ? t.spring : t.neap} <span style={{ fontFamily: mono, fontSize: 13, color: C.faint }}>· {spring ? t.springSub : t.neapSub}</span>
          </div>
          <p style={{ ...styles.factText, fontStyle: "italic", margin: "6px 0 0" }}>{spring ? t.springNote : t.neapNote}</p>
        </div>

        <div style={{ ...styles.fateBox, marginTop: 16 }}>
          <div style={styles.fateLabel}>{t.frictionTitle}</div>
          <p style={styles.keyTermText}>{t.frictionNote}</p>
        </div>
      </div>
    </div>
  );
}

export default Tides;
