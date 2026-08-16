/* ============================================================
   STATION 8 — LANDMARK OBSERVATORIES
   Three great observatories close the chapter. HUBBLE: launched 1990
   into low Earth orbit; a manufacturing flaw in its mirror was repaired
   by astronauts; its Ultra-Deep Field caught ~10,000 galaxies from when
   the universe was young. Observes visible / UV / near-IR. JWST: observes
   primarily in the INFRARED (gold-coated mirrors); sits ~1.5 million km
   from Earth at the L2 point, where a giant sunshield blocks the Sun,
   Earth and Moon at once — the cold, stable dark its instruments need.
   VERA RUBIN: a ground-based survey telescope with a huge field of view
   that will photograph the ENTIRE southern sky every few nights, making
   a time-lapse "movie" of the universe to catch anything that changes.
   Grounded in Ch.6 §6.6.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const OBS = [
  { id: "hubble", col: C.cool,   en: "Hubble",      ja: "ハッブル" },
  { id: "jwst",   col: C.sun,    en: "JWST",        ja: "ウェッブ" },
  { id: "rubin",  col: C.good,   en: "Vera Rubin",  ja: "ベラ・ルービン" },
];

const STR = {
  en: {
    title: "Landmark observatories",
    kind: "Hubble · JWST · Vera Rubin",
    lede: "The journey ends with three great eyes on the cosmos. Each sits in a different place, watches a different band of light, and answers a different question. Tap between them.",
    thread: "THE STORY ENDS",
    threadText: "We began by asking how to catch faint starlight, and followed it through mirrors, foci, detectors and linked arrays. Now we meet the machines that put it all together — the observatories whose images have redrawn our picture of the universe.",
    key: "THREE EYES, THREE VANTAGE POINTS",
    keyText: "Hubble looks in visible and ultraviolet light from low Earth orbit; its Ultra-Deep Field revealed about 10,000 galaxies from the young universe. JWST works in the infrared from the L2 point 1.5 million km away, where a giant sunshield blocks the Sun, Earth and Moon at once for the cold, stable dark its sensitive instruments need. Vera Rubin, on the ground, sweeps the entire southern sky every few nights to make a time-lapse movie of everything that moves or changes.",
    pick: "Choose an observatory:",
    fullName: {
      hubble: "Hubble Space Telescope",
      jwst: "James Webb Space Telescope",
      rubin: "Vera C. Rubin Observatory",
    },
    band: {
      hubble: "Visible · ultraviolet · near-infrared",
      jwst: "Infrared",
      rubin: "Optical survey (visible)",
    },
    bandL: "Wavelength band",
    locL: "Where it sits",
    locTag: {
      hubble: "Low Earth orbit (~540 km up)",
      jwst: "L2 point — 1.5 million km from Earth",
      rubin: "On the ground — Cerro Pachón, Chile",
    },
    facts: {
      hubble: [
        "Launched in 1990 into low Earth orbit.",
        "A flaw in its mirror was repaired by astronauts on a 1993 servicing mission.",
        "Its Ultra-Deep Field captured about 10,000 galaxies from when the universe was very young.",
      ],
      jwst: [
        "Observes primarily in the infrared, with gold-coated mirrors.",
        "Sits ~1.5 million km from Earth at the L2 point.",
        "A giant sunshield blocks the Sun, Earth and Moon at once — the cold, stable environment its infrared instruments need.",
      ],
      rubin: [
        "Ground-based survey telescope with an enormous field of view.",
        "Photographs the entire southern sky every few nights.",
        "Builds a time-lapse 'movie' of the sky to catch anything that moves or changes.",
      ],
    },
    factL: "Key facts",
    sun: "Sun", earth: "Earth", moon: "Moon", shield: "sunshield", l2: "L2",
    orbit: "orbit", sky: "southern sky", scan: "wide-field scan",
  },
  ja: {
    title: "象徴的な天文台",
    kind: "ハッブル · ウェッブ · ベラ・ルービン",
    lede: "旅の終わりに、宇宙を見つめる三つの大きな目に出会います。それぞれ違う場所に置かれ、違う波長の光を見て、違う問いに答えます。切り替えてみよう。",
    thread: "物語の結び",
    threadText: "かすかな星の光をどう捕まえるかという問いから始め、鏡・焦点・検出器・つないだ配列を通してそれを追ってきました。いよいよ、それらすべてを束ねる機械——私たちの宇宙像を描き直してきた天文台——に出会います。",
    key: "三つの目、三つの視点",
    keyText: "ハッブルは地球低軌道から可視光と紫外線で見つめ、その超深宇宙探査（ウルトラ・ディープ・フィールド）は若い宇宙のおよそ1万個の銀河を映し出しました。ウェッブは150万km彼方のL2点から赤外線で観測し、そこでは巨大な日よけが太陽・地球・月を一度に遮り、感度の高い装置に必要な冷たく安定した暗闇を保ちます。地上のベラ・ルービンは南天の全体を数夜ごとに掃き、動くもの・変わるものすべてのコマ送りの「映画」を作ります。",
    pick: "天文台を選ぶ：",
    fullName: {
      hubble: "ハッブル宇宙望遠鏡",
      jwst: "ジェイムズ・ウェッブ宇宙望遠鏡",
      rubin: "ベラ・C・ルービン天文台",
    },
    band: {
      hubble: "可視光 · 紫外線 · 近赤外線",
      jwst: "赤外線",
      rubin: "可視光サーベイ",
    },
    bandL: "観測する波長",
    locL: "どこに置かれるか",
    locTag: {
      hubble: "地球低軌道（上空 約540 km）",
      jwst: "L2点 — 地球から150万km",
      rubin: "地上 — チリ、セロ・パチョン",
    },
    facts: {
      hubble: [
        "1990年に地球低軌道へ打ち上げられた。",
        "鏡の製造上の欠陥は、1993年の補修ミッションで宇宙飛行士が修理した。",
        "その超深宇宙探査は、宇宙がごく若かった頃のおよそ1万個の銀河をとらえた。",
      ],
      jwst: [
        "主に赤外線で観測し、金でコーティングされた鏡を持つ。",
        "地球から約150万km離れたL2点に位置する。",
        "巨大な日よけが太陽・地球・月を一度に遮り、赤外線装置に必要な冷たく安定した環境を作る。",
      ],
      rubin: [
        "きわめて広い視野を持つ地上のサーベイ望遠鏡。",
        "南天の全体を数夜ごとに撮影する。",
        "動くもの・変わるものをとらえるため、空のコマ送りの「映画」を作る。",
      ],
    },
    factL: "重要な事実",
    sun: "太陽", earth: "地球", moon: "月", shield: "日よけ", l2: "L2",
    orbit: "軌道", sky: "南天", scan: "広視野スキャン",
  },
};

/* small helpers */
function disc(ctx, x, y, r, inner, outer) {
  const g = ctx.createRadialGradient(x, y, 1, x, y, r);
  g.addColorStop(0, inner); g.addColorStop(1, outer);
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
}
function label(ctx, txt, x, y, col, align = "center") {
  ctx.fillStyle = col; ctx.font = `11px ${mono}`; ctx.textAlign = align;
  ctx.fillText(txt, x, y);
}

/* --- Hubble: satellite in low Earth orbit --- */
function drawHubble(ctx, cw, H, t, phase) {
  const cx = cw / 2, cy = H / 2 + 6, R = 52;
  // Earth
  disc(ctx, cx, cy, R, "#3f7bff", "#0a1f52");
  ctx.strokeStyle = "rgba(63,232,155,0.4)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.ellipse(cx - 12, cy - 6, 20, 12, -0.4, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = "rgba(63,221,255,0.35)";
  ctx.beginPath(); ctx.ellipse(cx + 16, cy + 14, 16, 9, 0.5, 0, Math.PI * 2); ctx.stroke();
  // orbit ellipse (low, close to surface)
  const orx = R + 22, ory = R + 8;
  ctx.strokeStyle = "rgba(63,221,255,0.55)"; ctx.lineWidth = 1.4;
  ctx.setLineDash([4, 4]);
  ctx.beginPath(); ctx.ellipse(cx, cy, orx, ory, -0.35, 0, Math.PI * 2); ctx.stroke();
  ctx.setLineDash([]);
  // satellite on the orbit
  const a = phase * Math.PI * 2;
  const ca = Math.cos(-0.35), sa = Math.sin(-0.35);
  const ex = orx * Math.cos(a), ey = ory * Math.sin(a);
  const sx = cx + ex * ca - ey * sa, sy = cy + ex * sa + ey * ca;
  ctx.save(); ctx.translate(sx, sy); ctx.rotate(a);
  ctx.fillStyle = "#dfe8ff"; ctx.strokeStyle = C.cool; ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.rect(-6, -3.5, 12, 7); ctx.fill(); ctx.stroke();     // tube
  ctx.strokeStyle = "rgba(63,221,255,0.8)";
  ctx.beginPath(); ctx.moveTo(-6, 0); ctx.lineTo(-12, 0); ctx.moveTo(6, 0); ctx.lineTo(12, 0); ctx.stroke(); // solar panels
  ctx.fillStyle = "rgba(63,221,255,0.35)";
  ctx.fillRect(-13, -3, 4, 6); ctx.fillRect(9, -3, 4, 6);
  ctx.restore();
  disc(ctx, sx, sy, 4, "rgba(255,255,255,0.9)", "rgba(255,255,255,0)");
  label(ctx, t.orbit, sx, sy - 12, C.cool);
  label(ctx, t.earth, cx, cy + R + 18, C.faint);
}

/* --- JWST: out at L2 behind a sunshield --- */
function drawJWST(ctx, cw, H, t) {
  const midY = H / 2 - 6;
  const sunX = 26, earthX = cw * 0.36, l2X = cw * 0.82;
  // Sun–Earth–L2 line
  ctx.strokeStyle = "rgba(120,150,210,0.3)"; ctx.lineWidth = 1;
  ctx.setLineDash([3, 4]);
  ctx.beginPath(); ctx.moveTo(sunX, midY); ctx.lineTo(l2X, midY); ctx.stroke();
  ctx.setLineDash([]);
  // Sun (bright, at far left)
  disc(ctx, sunX, midY, 30, "#fff6c8", "rgba(255,158,44,0)");
  disc(ctx, sunX, midY, 13, "#fff2a0", "#ff9e2c");
  label(ctx, t.sun, sunX + 4, midY + 34, C.sun, "left");
  // Earth + Moon
  disc(ctx, earthX, midY, 11, "#3f7bff", "#0a1f52");
  label(ctx, t.earth, earthX, midY + 24, C.faint);
  const moonX = earthX + 20, moonY = midY - 10;
  disc(ctx, moonX, moonY, 3.5, "#dfe4f0", "#7a819a");
  label(ctx, t.moon, moonX + 8, moonY - 4, C.faint, "left");
  // shadow cone cast beyond the shield
  ctx.fillStyle = "rgba(10,15,35,0.6)";
  ctx.beginPath();
  ctx.moveTo(l2X - 14, midY - 26); ctx.lineTo(cw - 6, midY - 40);
  ctx.lineTo(cw - 6, midY + 40); ctx.lineTo(l2X - 14, midY + 26); ctx.closePath(); ctx.fill();
  // sunshield: five stacked diamond layers, facing the Sun
  ctx.strokeStyle = "rgba(201,139,255,0.9)"; ctx.lineWidth = 1.4;
  for (let i = 0; i < 5; i++) {
    const lx = l2X - 22 + i * 3.4;
    ctx.beginPath();
    ctx.moveTo(lx, midY - 26 - i); ctx.lineTo(lx + 3, midY);
    ctx.lineTo(lx, midY + 26 + i);
    ctx.stroke();
  }
  label(ctx, t.shield, l2X - 6, midY + 44, C.violet);
  // telescope on the cold side: gold hexagon mirror
  const tx = l2X + 8;
  ctx.fillStyle = C.sun; ctx.strokeStyle = "#fff2a0"; ctx.lineWidth = 1;
  ctx.beginPath();
  for (let k = 0; k < 6; k++) {
    const ang = Math.PI / 6 + k * Math.PI / 3;
    const px = tx + 9 * Math.cos(ang), py = midY + 9 * Math.sin(ang);
    if (k === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  ctx.closePath(); ctx.fill(); ctx.stroke();
  label(ctx, t.l2, l2X + 4, midY - 30, C.sun, "left");
  // distance bracket Earth -> L2
  const by = H - 18;
  ctx.strokeStyle = C.faint; ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(earthX, by - 4); ctx.lineTo(earthX, by + 4);
  ctx.moveTo(l2X, by - 4); ctx.lineTo(l2X, by + 4);
  ctx.moveTo(earthX, by); ctx.lineTo(l2X, by); ctx.stroke();
  label(ctx, "1,500,000 km", (earthX + l2X) / 2, by - 6, C.faint);
}

/* --- Rubin: ground telescope sweeping a wide field of the sky --- */
function drawRubin(ctx, cw, H, t, phase) {
  const gy = H - 40, cx = cw / 2;
  // starfield
  for (let i = 0; i < 46; i++) {
    const sx = (i * 97.3) % (cw - 20) + 10;
    const sy = ((i * 53.7) % (gy - 30)) + 10;
    const tw = 0.5 + 0.5 * Math.abs(Math.sin(phase * Math.PI * 2 + i));
    ctx.fillStyle = `rgba(220,228,255,${0.25 + 0.5 * tw})`;
    ctx.beginPath(); ctx.arc(sx, sy, 1 + tw, 0, Math.PI * 2); ctx.fill();
  }
  // sweeping wide field-of-view cone from the dome
  const sweep = Math.sin(phase * Math.PI * 2) * 0.5;
  const half = 0.55;                       // huge field of view
  ctx.save();
  ctx.translate(cx, gy - 14);
  const g = ctx.createLinearGradient(0, 0, 0, -(gy - 20));
  g.addColorStop(0, "rgba(63,232,155,0.28)");
  g.addColorStop(1, "rgba(63,232,155,0)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo((gy - 20) * Math.tan(sweep - half), -(gy - 20));
  ctx.lineTo((gy - 20) * Math.tan(sweep + half), -(gy - 20));
  ctx.closePath(); ctx.fill();
  ctx.restore();
  label(ctx, t.scan, cx, 16, C.good);
  // ground
  ctx.fillStyle = "rgba(20,30,55,0.9)";
  ctx.fillRect(0, gy, cw, H - gy);
  ctx.strokeStyle = "rgba(120,150,210,0.4)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(cw, gy); ctx.stroke();
  // mountain
  ctx.fillStyle = "rgba(30,42,72,0.95)";
  ctx.beginPath();
  ctx.moveTo(cx - 70, gy); ctx.lineTo(cx, gy - 26); ctx.lineTo(cx + 70, gy); ctx.closePath(); ctx.fill();
  // dome
  ctx.fillStyle = "#c9d3f0"; ctx.strokeStyle = C.good; ctx.lineWidth = 1.4;
  ctx.beginPath(); ctx.arc(cx, gy - 22, 12, Math.PI, 2 * Math.PI); ctx.fill(); ctx.stroke();
  ctx.fillRect(cx - 12, gy - 22, 24, 8);
  ctx.strokeRect(cx - 12, gy - 22, 24, 8);
  // dome slit
  ctx.strokeStyle = "rgba(10,15,35,0.8)"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(cx, gy - 34); ctx.lineTo(cx, gy - 22); ctx.stroke();
  label(ctx, t.sky, cx, gy + 20, C.faint);
}

function drawLocation(ctx, cw, H, sel, lang, phase) {
  ctx.clearRect(0, 0, cw, H);
  const t = STR[lang];
  if (sel === "hubble") drawHubble(ctx, cw, H, t, phase);
  else if (sel === "jwst") drawJWST(ctx, cw, H, t);
  else drawRubin(ctx, cw, H, t, phase);
}

export function Observatories() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const [sel, setSel] = useState("hubble");
  const cw = Math.min(w, 760);
  const obs = OBS.find((o) => o.id === sel);
  const animated = sel !== "jwst";

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (!animated || reduceMotion) { drawLocation(ctx, cw, H, sel, lang, 0.15); return; }
    let raf, tt = 0;
    const loop = () => {
      tt += 0.004;
      drawLocation(ctx, cw, H, sel, lang, tt % 1);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, sel, lang, animated]);

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

        <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginBottom: 4 }}>{t.pick}</div>
        <div style={{ ...styles.pickerRow, justifyContent: "flex-start" }}>
          {OBS.map((o) => {
            const on = o.id === sel;
            return (
              <button key={o.id} onClick={() => setSel(o.id)}
                style={{ ...styles.chip, ...(on ? styles.chipOn : {}), ...(on ? { borderColor: o.col, background: o.col + "22", color: "#fff" } : {}) }}>
                {lang === "ja" ? o.ja : o.en}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>
        <div style={{ fontFamily: mono, fontSize: 12, color: obs.col, marginTop: 6, textAlign: "center" }}>{t.locL}: {t.locTag[sel]}</div>

        {/* details card */}
        <div style={{ marginTop: 14, border: `1px solid ${C.border}`, borderRadius: 12, background: "rgba(8,12,26,0.6)", padding: "14px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
            <span style={{ width: 14, height: 14, borderRadius: 4, background: obs.col, display: "inline-block" }} />
            <span style={{ fontFamily: display, fontSize: 21, color: "#fff" }}>{t.fullName[sel]}</span>
          </div>

          <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1.2, color: C.faint, marginBottom: 4 }}>{t.bandL}</div>
          <div style={{ display: "inline-block", fontFamily: mono, fontSize: 13.5, color: obs.col, border: `1px solid ${obs.col}55`, background: obs.col + "18", borderRadius: 20, padding: "4px 12px", marginBottom: 12 }}>
            {t.band[sel]}
          </div>

          <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1.2, color: C.faint, marginBottom: 6 }}>{t.factL}</div>
          <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
            {t.facts[sel].map((f, i) => (
              <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "5px 0", borderBottom: i < t.facts[sel].length - 1 ? "1px solid rgba(120,150,210,0.1)" : "none" }}>
                <span style={{ color: obs.col, flexShrink: 0, marginTop: 2 }}>▸</span>
                <span style={{ fontSize: 15.5, lineHeight: 1.5, color: "#dbe4ff" }}>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Observatories;
