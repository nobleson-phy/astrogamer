/* ============================================================
   STATION 5 — STORMS & WINDS
   Jupiter's Great Red Spot has raged for 300+ years — with no solid
   surface to drain its energy by friction, a giant storm can last
   almost forever. Saturn's winds reach 1800 km/h near the equator,
   and a bizarre hexagonal wave rings its north pole, each side longer
   than Earth's diameter. Grounded in Ch.11 §11.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const TOPICS = {
  redspot: { en: "Great Red Spot", ja: "大赤斑",
    en_t: "A storm bigger than Earth that has churned for over 300 years. On Earth, hurricanes die when they cross land — but a giant planet has NO solid surface to sap a storm's energy by friction, so it can persist almost indefinitely.", ja_t: "地球より大きな嵐で、300年以上渦巻き続ける。地球のハリケーンは陸地を越えると消えるが、巨大惑星には摩擦で嵐のエネルギーを奪う固い地表がないため、ほぼ永遠に続きうる。" },
  hexagon: { en: "Saturn's hexagon", ja: "土星の六角形",
    en_t: "A six-sided standing wave of clouds around Saturn's north pole. Each straight side is longer than the diameter of Earth — a shape found nowhere else in the solar system.", ja_t: "土星の北極を囲む六辺形の定在波の雲。まっすぐな一辺は地球の直径より長く、太陽系の他のどこにも見られない形。" },
  winds: { en: "1800 km/h winds", ja: "時速1800 kmの風",
    en_t: "Saturn's equatorial winds blow up to 1800 km/h — many times faster than any hurricane on Earth, and among the fastest winds known on any planet.", ja_t: "土星の赤道の風は時速1800 kmまで吹く——地球のどのハリケーンより何倍も速く、あらゆる惑星で知られる最速級の風。" },
};
const ORDER = ["redspot", "hexagon", "winds"];

const STR = {
  en: {
    title: "Storms & winds",
    kind: "Weather that never quits",
    lede: "On worlds with no ground, storms have nowhere to die. Meet a 300-year hurricane, a hexagon larger than planets, and winds that would flatten anything on Earth.",
    thread: "THE STORY CONTINUES",
    threadText: "Take away the land and weather changes its rules. A storm that would fade in days on Earth can spin for centuries here, and the winds reach speeds we can barely imagine.",
    key: "NO SURFACE MEANS STORMS LAST FOREVER",
    keyText: "Jupiter's Great Red Spot is a storm wider than Earth that has persisted for more than 300 years. The reason such systems endure: a giant planet has no solid surface, so there is no friction to drain a storm's energy — it can survive almost indefinitely. Saturn's weather is just as extreme: equatorial winds reach 1800 km/h, and a strange hexagonal wave pattern rings its north pole, each of its six straight sides longer than the diameter of Earth.",
    note: "With no land to create friction, giant-planet storms like the Great Red Spot can last for centuries; Saturn adds 1800 km/h winds and a planet-sized hexagon at its pole.",
  },
  ja: {
    title: "嵐と風",
    kind: "決して止まない気象",
    lede: "地面のない世界では、嵐は消える場所がありません。300年続くハリケーン、惑星より大きな六角形、そして地球のあらゆるものを吹き飛ばす風に出会おう。",
    thread: "物語はつづく",
    threadText: "陸地を取り去ると、気象は規則を変えます。地球なら数日で消える嵐が、ここでは何世紀も回り続け、風はほとんど想像もできない速さに達します。",
    key: "地表がないから嵐は永遠に続く",
    keyText: "木星の大赤斑は、地球より広い嵐で、300年以上続いています。こうした系が続く理由：巨大惑星には固い地表がないため、嵐のエネルギーを奪う摩擦がなく——ほぼ永遠に生き延びられるのです。土星の気象も同じく極端で、赤道の風は時速1800 kmに達し、北極を奇妙な六角形の波が囲みます。その6本のまっすぐな辺は、それぞれ地球の直径より長いのです。",
    note: "摩擦を生む陸地がないため、大赤斑のような巨大惑星の嵐は何世紀も続きます。土星はさらに時速1800 kmの風と、極の惑星サイズの六角形を加えます。",
  },
};

function hrng(s) { return () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff; }
function hexPath(ctx, cx, cy, r, rot) {
  ctx.beginPath();
  for (let i = 0; i <= 6; i++) { const a = (i / 6) * Math.PI * 2 - Math.PI / 2 + rot; const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
  ctx.closePath();
}

function draw(ctx, cw, H, topic, tt) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2;
  if (topic === "redspot") {
    // banded Jupiter with a swirling red spot
    const R = Math.min(cw * 0.32, H * 0.44);
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip();
    for (let i = 0; i < 14; i++) { const yy = cy - R + (i / 14) * 2 * R; ctx.fillStyle = i % 2 ? "#c98a4a" : "#e8cf9a"; ctx.fillRect(cx - R, yy, 2 * R, 2 * R / 14 + 1); }
    // red spot swirl
    for (let k = 3; k >= 0; k--) { ctx.fillStyle = `rgba(${190 - k * 10},${70 + k * 8},${50},0.85)`; ctx.save(); ctx.translate(cx + R * 0.25, cy + R * 0.18); ctx.rotate(tt * 0.02 + k); ctx.beginPath(); ctx.ellipse(0, 0, R * (0.26 - k * 0.04), R * (0.17 - k * 0.03), 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
    ctx.restore();
    ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText("300+ years · wider than Earth", cx, H - 10);
  } else if (topic === "hexagon") {
    // Saturn's north pole from above: a butterscotch banded disc with a blue
    // hexagonal jet stream and a central polar vortex, à la Cassini.
    const px = cx, py = cy - H * 0.04;                 // pole
    const Rp = Math.min(cw * 0.55, H * 0.95);          // Saturn disc radius
    const discY = py + Rp * 0.42;                      // disc centre below the pole
    const rot = tt * 0.004;
    ctx.save();
    ctx.beginPath(); ctx.arc(cx, discY, Rp, 0, Math.PI * 2); ctx.clip();
    const bg = ctx.createRadialGradient(px, py, 4, px, py, Rp * 1.1);
    bg.addColorStop(0, "#dcc78e"); bg.addColorStop(0.5, "#e0c078"); bg.addColorStop(1, "#c49a52");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, cw, H);
    // concentric zonal bands around the pole
    for (let k = 1; k < 10; k++) { ctx.strokeStyle = k % 2 ? "rgba(196,160,96,0.45)" : "rgba(234,210,152,0.5)"; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(px, py, k * Rp * 0.085, 0, Math.PI * 2); ctx.stroke(); }
    // sunlit limb brightening at the top-left
    const lg = ctx.createLinearGradient(0, 0, cw * 0.6, H); lg.addColorStop(0, "rgba(255,250,230,0.25)"); lg.addColorStop(1, "rgba(255,250,230,0)");
    ctx.fillStyle = lg; ctx.fillRect(0, 0, cw, H);
    ctx.restore();
    // hexagon jet stream
    const rh = Math.min(cw * 0.2, H * 0.34);
    ctx.save();
    hexPath(ctx, px, py, rh, rot); ctx.clip();
    const hb = ctx.createRadialGradient(px, py, 2, px, py, rh);
    hb.addColorStop(0, "#8fc0dc"); hb.addColorStop(0.55, "#4f88b8"); hb.addColorStop(1, "#37648f");
    ctx.fillStyle = hb; ctx.fillRect(px - rh, py - rh, 2 * rh, 2 * rh);
    // stable turbulence speckle (seeded, so it doesn't flicker)
    const r = hrng(71);
    for (let i = 0; i < 90; i++) { const a = r() * 6.283, rr = Math.sqrt(r()) * rh; ctx.fillStyle = `rgba(210,232,244,${0.12 + r() * 0.22})`; ctx.beginPath(); ctx.arc(px + Math.cos(a) * rr, py + Math.sin(a) * rr, 1 + r() * 2.2, 0, 6.283); ctx.fill(); }
    // central spiral vortex
    ctx.strokeStyle = "rgba(232,246,255,0.55)"; ctx.lineWidth = 1.6; ctx.beginPath();
    let started = false;
    for (let s = 0; s < 220; s++) { const a = s * 0.13 + rot * 4; const rr = 1 + s * 0.055 * (rh / 60); if (rr > rh * 0.72) break; const x = px + Math.cos(a) * rr, y = py + Math.sin(a) * rr; started ? ctx.lineTo(x, y) : (ctx.moveTo(x, y), started = true); }
    ctx.stroke();
    ctx.restore();
    // hexagon rim
    ctx.strokeStyle = "rgba(232,246,255,0.5)"; ctx.lineWidth = 2; hexPath(ctx, px, py, rh, rot); ctx.stroke();
    // rings grazing the right edge
    ctx.strokeStyle = "rgba(222,202,152,0.55)"; ctx.lineWidth = 7;
    ctx.beginPath(); ctx.ellipse(cw + 30, discY - Rp * 0.15, Rp * 0.95, Rp * 0.5, -0.5, Math.PI * 0.72, Math.PI * 1.18); ctx.stroke();
    ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText("each side longer than Earth's diameter", cx, H - 8);
  } else {
    // wind speed vs latitude bar chart, peaking at the equator ~1800
    const padL = 40, padR = 16, padT = 20, padB = 30, plotW = cw - padL - padR, plotH = H - padT - padB, y0 = H - padB;
    ctx.strokeStyle = "rgba(150,175,230,0.35)"; ctx.beginPath(); ctx.moveTo(padL, padT); ctx.lineTo(padL, y0); ctx.lineTo(cw - padR, y0); ctx.stroke();
    const n = 24;
    for (let i = 0; i < n; i++) {
      const lat = (i / (n - 1)) * 2 - 1; // -1..1
      const spd = 1800 * Math.exp(-lat * lat * 6) + 200 * Math.abs(Math.sin(lat * 6));
      const x = padL + (i / n) * plotW, h = (spd / 1900) * plotH;
      ctx.fillStyle = spd > 1200 ? "#3fddff" : "rgba(99,150,240,0.6)"; ctx.fillRect(x, y0 - h, plotW / n - 2, h);
    }
    ctx.fillStyle = C.sun; ctx.font = `700 13px ${mono}`; ctx.textAlign = "center"; ctx.fillText("up to 1800 km/h at the equator", cw / 2, padT + 6);
    ctx.fillStyle = C.faint; ctx.font = `10px ${mono}`; ctx.fillText("← pole    equator    pole →", cw / 2, y0 + 18);
  }
}

export function StormsWinds() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [topic, setTopic] = useState("redspot");
  const topicRef = useRef(topic); topicRef.current = topic;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    const animated = topic === "redspot" || topic === "hexagon";
    if (reduceMotion || !animated) { draw(ctx, cw, H, topic, 0); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, topicRef.current, tt); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, topic, lang]);

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

export default StormsWinds;
