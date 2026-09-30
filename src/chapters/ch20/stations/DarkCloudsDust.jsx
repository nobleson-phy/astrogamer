/* ============================================================
   STATION 4 — DARK CLOUDS & DUST
   Dust does three things to starlight. EXTINCTION: it dims light by
   absorbing and scattering it (thick clouds become dark nebulae, which
   E. E. Barnard proved are dust, not holes). REDDENING: dust scatters blue
   more than red, so stars seen through it look redder. And because a dust
   grain (a silicate or graphite core in an icy mantle) is about the size
   of a light wave, longer INFRARED and RADIO waves slip through — letting
   us see protostars hidden inside. Grounded in Ch.20 §20.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Dark clouds & dust",
    kind: "Dimming, reddening, seeing through",
    lede: "Push starlight through more and more dust and watch it dim and redden. Then meet a dust grain up close, and see how infrared slips through where visible light can't.",
    thread: "THE STORY CONTINUES",
    threadText: "That 1% of dust punches far above its weight: it blocks, reddens and hides starlight, and its grains are where the chemistry of space happens.",
    extKey: "EXTINCTION & REDDENING",
    extText: "Dust causes interstellar EXTINCTION — the total dimming of starlight from absorption and scattering. Thick enough, a dust cloud becomes a dark nebula; E. E. Barnard's photographs proved these are obscuring dust, not empty 'holes in heaven.' Dust also REDDENS starlight: because tiny grains scatter blue light more than red, a star seen through dust looks redder than it really is (interstellar reddening).",
    grainKey: "A DUST GRAIN, UP CLOSE",
    grainText: "A typical interstellar dust grain has a solid core of silicate (sandlike rock) or graphite (sootlike carbon), wrapped in an icy mantle of frozen water, methane and ammonia. Each grain is only about 10⁻⁷ m across — comparable to the wavelength of visible light, which is why it scatters visible light so effectively.",
    penKey: "SEEING THROUGH THE DUST",
    penText: "Dust scatters light whose wavelength is near the grain size, so it blocks visible light but is nearly transparent to longer waves. That is why astronomers use INFRARED and RADIO telescopes to peer inside dark, dusty stellar nurseries: those long wavelengths pass straight through the dust that hides newborn protostars from visible-light telescopes.",
    ext: "Extinction & reddening", grain: "A dust grain", pen: "Seeing through",
    dust: "Dust amount", core: "silicate / graphite core", mantle: "icy mantle",
    visible: "visible: blocked", ir: "infrared / radio: passes through", proto: "hidden protostar",
    noteE: "Dust dims starlight (extinction) and scatters blue more than red (reddening). Barnard showed dark nebulae are dust clouds, not holes.",
    noteG: "A dust grain is a silicate or graphite core in an icy mantle, ~10⁻⁷ m — about a wavelength of visible light, which it scatters strongly.",
    noteP: "Visible light is blocked by dust, but longer infrared and radio waves pass through — revealing protostars inside dark clouds.",
  },
  ja: {
    title: "暗黒星雲と塵",
    kind: "減光・赤化・透視",
    lede: "星の光をどんどん厚い塵に通して、暗く赤くなる様子を見よう。次に塵の粒を間近で見て、可視光が通れない所を赤外線がすり抜ける様子を見よう。",
    thread: "物語はつづく",
    threadText: "その1%の塵は実力以上の働きをします：星の光を遮り、赤くし、隠し——その粒は宇宙の化学が起こる場です。",
    extKey: "減光と赤化",
    extText: "塵は星間減光——吸収と散乱による星の光の全体的な減光——を引き起こします。十分厚ければ塵の雲は暗黒星雲になります。E・E・バーナードの写真は、これらが視界を遮る塵であり、空の「穴」ではないと証明しました。塵は星の光を赤化もさせます：微小な粒が赤より青を多く散乱するので、塵越しに見る星は実際より赤く見えます（星間赤化）。",
    grainKey: "塵の粒を間近で",
    grainText: "典型的な星間塵の粒は、ケイ酸塩（砂のような岩）または黒鉛（すすのような炭素）の固体の核を持ち、凍った水・メタン・アンモニアの氷のマントルに包まれています。各粒はわずか約10⁻⁷ m——可視光の波長に匹敵し、だからこそ可視光を効果的に散乱します。",
    penKey: "塵を透かして見る",
    penText: "塵は粒のサイズに近い波長の光を散乱するので、可視光は遮りますが、より長い波にはほぼ透明です。だから天文学者は、暗く塵の多い星のゆりかごの内側を覗くのに赤外線と電波の望遠鏡を使います：その長い波長は、可視光望遠鏡から生まれたての原始星を隠す塵をまっすぐ通り抜けます。",
    ext: "減光と赤化", grain: "塵の粒", pen: "透かして見る",
    dust: "塵の量", core: "ケイ酸塩／黒鉛の核", mantle: "氷のマントル",
    visible: "可視光：遮られる", ir: "赤外線／電波：通り抜ける", proto: "隠れた原始星",
    noteE: "塵は星の光を暗くし（減光）、赤より青を多く散乱します（赤化）。バーナードは暗黒星雲が穴ではなく塵の雲だと示しました。",
    noteG: "塵の粒はケイ酸塩や黒鉛の核を氷のマントルが包み、約10⁻⁷ m——可視光の波長ほどで、それを強く散乱します。",
    noteP: "可視光は塵に遮られますが、より長い赤外線と電波は通り抜け——暗黒雲の中の原始星を明かします。",
  },
};

function drawExt(ctx, cw, H, dust, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const sx = 36, sy = H * 0.42, ex = cw - 44;
  // true blue-white star at left
  ctx.fillStyle = "#cfe0ff"; ctx.beginPath(); ctx.arc(sx, sy, 10, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#cfe0ff"; ctx.font = `11px ${mono}`; ctx.textAlign = "left"; ctx.fillText(lang === "ja" ? "本来：青白い" : "true: blue-white", 8, sy + 28);
  // dust cloud band in the middle
  const cx0 = cw * 0.34, cx1 = cw * 0.66;
  ctx.fillStyle = `rgba(120,90,70,${0.1 + dust * 0.5})`; ctx.fillRect(cx0, sy - 40, cx1 - cx0, 80);
  for (let i = 0; i < dust * 60; i++) { ctx.fillStyle = "rgba(90,70,55,0.5)"; ctx.beginPath(); ctx.arc(cx0 + Math.random() * (cx1 - cx0), sy - 40 + Math.random() * 80, 1.5, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = C.faint; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(lang === "ja" ? "塵の雲" : "dust cloud", (cx0 + cx1) / 2, sy - 46);
  // observed star at right: dimmer and redder with more dust
  const dim = 1 - dust * 0.7;
  const redness = dust; // 0 blue-white .. 1 red
  const r = Math.round(207 + redness * 48), g = Math.round(224 - redness * 120), b = Math.round(255 - redness * 200);
  const R = 10 * dim + 3;
  const glow = ctx.createRadialGradient(ex, sy, 1, ex, sy, R + 8); glow.addColorStop(0, `rgba(${r},${g},${b},${0.4 + dim * 0.5})`); glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(ex, sy, R + 8, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = `rgb(${r},${g},${b})`; ctx.beginPath(); ctx.arc(ex, sy, R, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = `rgb(${r},${g},${b})`; ctx.font = `11px ${mono}`; ctx.textAlign = "right"; ctx.fillText(lang === "ja" ? "観測：暗く赤い" : "observed: dim & red", cw - 8, sy + 28);
  ctx.fillStyle = C.sun; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(lang === "ja" ? "減光＋赤化" : "extinction + reddening", cw / 2, H - 10);
}

function drawGrain(ctx, cw, H, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H * 0.42, R = Math.min(cw * 0.24, H * 0.4);
  // icy mantle
  const mg = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.3, cx, cy, R);
  mg.addColorStop(0, "rgba(200,225,245,0.7)"); mg.addColorStop(1, "rgba(150,190,220,0.4)");
  ctx.fillStyle = mg; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
  // core
  ctx.fillStyle = "#5a5048"; ctx.beginPath(); ctx.arc(cx, cy, R * 0.5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#7a6f60"; for (let i = 0; i < 12; i++) { const a = i * 2, r = Math.random() * R * 0.4; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 2, 0, Math.PI * 2); ctx.fill(); }
  // labels
  ctx.strokeStyle = "rgba(255,255,255,0.4)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + R + 20, cy - 10); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx + R * 0.75, cy + R * 0.4); ctx.lineTo(cx + R + 20, cy + 20); ctx.stroke();
  ctx.fillStyle = C.text; ctx.font = `10px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(t.core, cx + R + 24, cy - 8); ctx.fillStyle = "#a9d0ee"; ctx.fillText(t.mantle, cx + R + 24, cy + 22);
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText("≈ 10⁻⁷ m", cx, cy + R + 18);
}

function drawPen(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // dark cloud with a protostar inside
  const cx = cw / 2, cy = H * 0.42, R = Math.min(cw * 0.3, H * 0.42);
  ctx.fillStyle = "rgba(60,45,38,0.85)"; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
  for (let i = 0; i < 40; i++) { ctx.fillStyle = "rgba(40,30,24,0.6)"; ctx.beginPath(); ctx.arc(cx + (Math.random() - 0.5) * 2 * R, cy + (Math.random() - 0.5) * 2 * R, 2, 0, Math.PI * 2); ctx.fill(); }
  // protostar (glows in IR)
  ctx.fillStyle = "rgba(255,140,90,0.9)"; ctx.beginPath(); ctx.arc(cx, cy, 7, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ff9a52"; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.proto, cx, cy + R * 0.55);
  // visible ray from left: stops at the cloud
  const vx = 20 + ((tt * 2) % (cx - R - 20));
  ctx.strokeStyle = "#8fb8ff"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(vx, cy - 30); ctx.lineTo(Math.min(vx + 14, cx - R), cy - 30); ctx.stroke();
  ctx.fillStyle = "#8fb8ff"; ctx.textAlign = "left"; ctx.fillText(t.visible, 16, cy - 40);
  // IR ray: passes through to the protostar and out to the right
  const ir = 20 + ((tt * 3) % (cw - 40));
  ctx.strokeStyle = "#ff8f6a"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ir, cy + 30); ctx.lineTo(ir + 16, cy + 30); ctx.stroke();
  ctx.fillStyle = "#ff8f6a"; ctx.fillText(t.ir, 16, cy + 48);
}

export function DarkCloudsDust() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("ext");
  const [dust, setDust] = useState(0.6);
  const dRef = useRef(0.6); dRef.current = dust;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (mode === "ext") { drawExt(ctx, cw, H, dRef.current, lang); return; }
    if (mode === "grain") { drawGrain(ctx, cw, H, lang); return; }
    if (reduceMotion) { drawPen(ctx, cw, H, 40, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; drawPen(ctx, cw, H, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, mode, lang]);

  // redraw ext when dust changes
  useEffect(() => {
    if (mode !== "ext") return; const c = canRef.current; if (!c) return;
    drawExt(setupCanvas(c, cw, H), cw, H, dust, lang);
  }, [dust, mode, cw, lang]);

  const key = mode === "ext" ? t.extKey : mode === "grain" ? t.grainKey : t.penKey;
  const text = mode === "ext" ? t.extText : mode === "grain" ? t.grainText : t.penText;
  const note = mode === "ext" ? t.noteE : mode === "grain" ? t.noteG : t.noteP;

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
          <div style={{ ...styles.fateLabel, color: C.sun }}>{key}</div>
          <p style={styles.keyTermText}>{text}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          {[["ext", t.ext], ["grain", t.grain], ["pen", t.pen]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        {mode === "ext" && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "10px 0 4px" }}>
            <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.dust}</span>
            <input type="range" min="0" max="1" step="0.05" value={dust}
              onChange={(e) => setDust(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
          </div>
        )}

        <div style={{ marginTop: 10 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{note}</p>
      </div>
    </div>
  );
}

export default DarkCloudsDust;
