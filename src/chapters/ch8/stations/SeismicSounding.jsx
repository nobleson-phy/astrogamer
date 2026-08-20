/* ============================================================
   STATION 2 — SEISMIC SOUNDING
   We cannot dig to the core, but earthquakes send seismic waves
   through the whole planet. They bend (refract) at each density
   boundary and leave "shadow zones" where certain waves never
   arrive — the liquid outer core blocks S-waves. From these
   patterns we map the interior. Grounded in Ch.8 §8.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Seismic sounding",
    kind: "X-raying Earth with earthquakes",
    lede: "An earthquake is a free scan of the whole planet. Fire a quake and watch its waves race through — bending at each layer and leaving a shadow where the liquid core swallows them.",
    thread: "THE STORY CONTINUES",
    threadText: "The density argument told us a dense core must exist, but not its size or state. For that we need to listen: every large earthquake rings the Earth like a bell, and the echoes carry a map of the inside.",
    key: "WAVES THAT BEND AND VANISH",
    keyText: "Earthquakes launch seismic waves that travel through Earth's interior. Because wave speed depends on the material, the waves refract (bend) at each density boundary, and stations worldwide record when and where they arrive. Crucially, shear (S) waves cannot pass through liquid — so the liquid outer core casts a 'shadow zone' where S-waves never arrive. Mapping these bends and shadows is how we know the core's size and that its outer part is molten.",
    fire: "▶ Trigger earthquake", pWave: "P-wave (through everything)", sWave: "S-wave (stopped by liquid core)", shadow: "S-wave shadow zone",
    quake: "quake", note: "Waves leave the quake and refract at the mantle–core boundary. P-waves pass through the whole planet; S-waves cannot cross the liquid outer core, leaving a shadow zone on the far side. That shadow is the fingerprint of a molten core.",
  },
  ja: {
    title: "地震波で探る",
    kind: "地震で地球をX線撮影する",
    lede: "地震は惑星全体を無料でスキャンしてくれます。地震を起こして、波が駆け抜ける様子を見よう——各層で曲がり、液体の核が呑み込む場所に影を残します。",
    thread: "物語はつづく",
    threadText: "密度の議論は密度の高い核の存在を教えてくれましたが、その大きさや状態は分かりません。それには「聴く」必要があります：大きな地震はみな地球を鐘のように鳴らし、その反響が内部の地図を運んできます。",
    key: "曲がり、消える波",
    keyText: "地震は地球内部を伝わる地震波を放ちます。波の速さは物質によって変わるため、密度の境界ごとに屈折（湾曲）し、世界中の観測点がいつどこに到達したかを記録します。重要なのは、S波（横波）が液体を通れないこと——だから液体の外核は、S波が決して届かない「影の帯（シャドーゾーン）」をつくります。この曲がりと影を地図化することで、核の大きさと、その外側が溶けていることが分かるのです。",
    fire: "▶ 地震を起こす", pWave: "P波（すべてを通る）", sWave: "S波（液体の核で止まる）", shadow: "S波の影の帯",
    quake: "震源", note: "波は震源を出て、マントルと核の境界で屈折します。P波は惑星全体を通りますが、S波は液体の外核を越えられず、反対側に影の帯を残します。その影こそ、溶けた核の指紋です。",
  },
};

function draw(ctx, cw, H, prog, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2 + 6, R = Math.min(cw * 0.32, H * 0.42);
  const coreR = R * 0.55;
  // Earth
  ctx.fillStyle = "#3a2f24"; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#b5652f"; ctx.beginPath(); ctx.arc(cx, cy, R * 0.98, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#e89a3c"; ctx.beginPath(); ctx.arc(cx, cy, coreR, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffd27a"; ctx.beginPath(); ctx.arc(cx, cy, coreR * 0.35, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.15)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, coreR, 0, Math.PI * 2); ctx.stroke();
  // quake epicentre at top
  const qx = cx, qy = cy - R;
  // S-wave shadow zone: a band on the far hemisphere (bottom), draw as faint wedge
  ctx.save();
  ctx.fillStyle = "rgba(255,90,90,0.10)";
  for (const s of [1, -1]) {
    ctx.beginPath(); ctx.moveTo(cx, cy);
    const a0 = Math.PI / 2 + s * 0.55, a1 = Math.PI / 2 + s * 1.15;
    ctx.arc(cx, cy, R + 30, a0, a1, s < 0); ctx.closePath(); ctx.fill();
  }
  ctx.restore();
  // rays: P (blue, cross whole planet, refract at core) and S (gold, stop at core)
  const n = 9;
  for (let i = 0; i < n; i++) {
    const spread = (i / (n - 1) - 0.5) * 1.7; // launch angle around straight-down
    const ang = Math.PI / 2 + spread; // downward-ish
    const dir = { x: Math.cos(ang), y: Math.sin(ang) };
    // P-wave path (curved: simple two-segment refraction through core)
    drawRay(ctx, qx, qy, dir, R, coreR, prog, "#4aa3ff", true);
    // S-wave path: stops at core boundary
    drawRay(ctx, qx, qy, dir, R, coreR, prog, "#ffcf6b", false);
  }
  // quake marker
  ctx.fillStyle = C.danger; ctx.beginPath(); ctx.arc(qx, qy, 5, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "rgba(255,107,107,0.6)"; ctx.lineWidth = 1.5;
  const pr = 8 + (prog % 1) * 12; ctx.beginPath(); ctx.arc(qx, qy, pr, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = C.danger; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.quake, qx, qy - 12);
}

function drawRay(ctx, x0, y0, dir, R, coreR, prog, col, isP) {
  // travel a fraction "prog" of a fixed path length; approximate ray as it
  // moves inward, refracts at core (for P) or stops at core (for S).
  const cx = x0, cyC = y0 + R; // planet centre is R below the top epicentre
  let x = x0, y = y0, dx = dir.x, dy = dir.y;
  const step = 3, maxLen = R * 2.4;
  const drawn = clamp(prog, 0, 1) * maxLen;
  ctx.strokeStyle = col; ctx.lineWidth = 1.6; ctx.globalAlpha = 0.9;
  ctx.beginPath(); ctx.moveTo(x, y);
  let len = 0, refr = false;
  while (len < drawn) {
    x += dx * step; y += dy * step; len += step;
    const dToC = Math.hypot(x - cx, y - cyC);
    if (dToC > R) break; // exited planet
    if (dToC < coreR) {
      if (!isP) break; // S-wave stops at the liquid core
      if (!refr) { // P-wave refracts: bend toward centre
        const nx = (x - cx) / dToC, ny = (y - cyC) / dToC;
        dx = dx * 0.6 - nx * 0.3; dy = dy * 0.6 - ny * 0.3;
        const m = Math.hypot(dx, dy); dx /= m; dy /= m; refr = true;
      }
    }
    ctx.lineTo(x, y);
  }
  ctx.stroke(); ctx.globalAlpha = 1;
}

export function SeismicSounding() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 300;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const progRef = useRef(1);
  const runRef = useRef(false);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, 1, lang); return; }
    let raf;
    const loop = () => {
      if (runRef.current) { progRef.current = clamp(progRef.current + 0.012, 0, 1); if (progRef.current >= 1) runRef.current = false; }
      draw(ctx, cw, H, progRef.current, lang);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

  const fire = () => { progRef.current = 0; runRef.current = true; if (reduceMotion) { const c = canRef.current; if (c) draw(setupCanvas(c, cw, H), cw, H, 1, lang); } };

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 02</div>
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

        <div style={styles.controlBar}>
          <button style={styles.iconBtn} onClick={fire}>{t.fire}</button>
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <div style={{ fontFamily: mono, fontSize: 12.5, marginTop: 8, lineHeight: 1.8, color: C.muted }}>
          <div><span style={{ color: "#4aa3ff" }}>●</span> {t.pWave}</div>
          <div><span style={{ color: "#ffcf6b" }}>●</span> {t.sWave}</div>
          <div><span style={{ color: "rgba(255,90,90,0.9)" }}>▧</span> {t.shadow}</div>
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default SeismicSounding;
