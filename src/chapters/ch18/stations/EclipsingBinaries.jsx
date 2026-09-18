/* ============================================================
   STATION 4 — ECLIPSING BINARIES
   When a binary's orbit is edge-on, the stars periodically eclipse each
   other, and the system's brightness dips. From the DURATION of each
   eclipse and the stars' orbital velocities (from Doppler shifts), we get
   the stars' diameters (diameter = velocity × time). The PRIMARY (deeper)
   dip occurs when the hotter star is hidden, because it has the higher
   surface brightness. Grounded in Ch.18 §18.3.
   ============================================================ */
import React, { useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Eclipsing binaries",
    kind: "Reading sizes from a light curve",
    lede: "Watch an edge-on pair eclipse. The brightness dips twice per orbit — deeply when the hot star hides, shallowly when the cool one does. The timing gives their sizes.",
    thread: "THE STORY CONTINUES",
    threadText: "If a binary happens to lie edge-on to us, each star crosses in front of the other. The dimming that results is one of astronomy's richest sources of stellar data.",
    key: "DEEP DIP WHEN THE HOT STAR IS HIDDEN",
    keyText: "In an eclipsing binary the orbit is nearly edge-on, so each star periodically passes in front of the other and the combined light dips. The DURATION of an eclipse, times the orbital velocity found from Doppler shifts, gives each star's diameter (diameter = velocity × time). The two dips are unequal: the PRIMARY (deeper) minimum happens when the hotter star is eclipsed, because the hot star has far higher surface brightness (flux), so hiding it removes more light than hiding an equal area of the cool star.",
    hot: "small hot star", cool: "large cool star",
    primary: "primary (deep): hot star hidden", secondary: "secondary (shallow): cool star hidden",
    dia: "diameter = orbital velocity × eclipse duration",
    note: "Eclipse timing × Doppler velocity gives stellar diameters. The deeper (primary) dip is when the hotter, higher-surface-brightness star is hidden.",
  },
  ja: {
    title: "食連星",
    kind: "光度曲線から大きさを読む",
    lede: "真横から見た対が食を起こすのを見よう。明るさは1公転に2回落ち込みます——高温の星が隠れると深く、低温の星だと浅く。そのタイミングが大きさを与えます。",
    thread: "物語はつづく",
    threadText: "連星がたまたま私たちに真横を向いていると、各星が互いの前を横切ります。生じる減光は、天文学で最も豊かな恒星データの源の一つです。",
    key: "高温の星が隠れると深い落ち込み",
    keyText: "食連星では軌道がほぼ真横なので、各星が周期的に相手の前を通り、合わさった光が落ち込みます。食の継続時間に、ドップラー偏移から求めた公転速度を掛けると、各星の直径が得られます（直径＝速度×時間）。2つの落ち込みは不均等です：主極小（より深い）は高温の星が食されるときに起こります。高温の星ははるかに表面輝度（フラックス）が高いので、それを隠すと、低温の星の同じ面積を隠すより多くの光が減るのです。",
    hot: "小さく高温の星", cool: "大きく低温の星",
    primary: "主極小（深）：高温の星が隠れる", secondary: "副極小（浅）：低温の星が隠れる",
    dia: "直径 = 公転速度 × 食の継続時間",
    note: "食のタイミング×ドップラー速度で星の直径がわかります。より深い（主）極小は、高温で表面輝度の高い星が隠れるときです。",
  },
};

// combined flux as a function of phase (0..1)
function flux(p) {
  const base = 1.0;
  const g = (c, w, d) => d * Math.exp(-Math.pow(((p - c + 1.5) % 1 - 0.5) / w, 2));
  // primary at 0.5 (hot hidden, deep), secondary at 0.0 (cool front, shallow)
  return base - g(0.5, 0.05, 0.5) - g(0.0, 0.05, 0.12);
}

function draw(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const p = (tt * 0.004) % 1;
  // orbit animation (top): stars cross along a horizontal line
  const oy = H * 0.26, cx = cw / 2;
  const sep = Math.cos(p * Math.PI * 2) * cw * 0.22;
  const hotX = cx + sep, coolX = cx - sep;
  const hotBehind = sep < 0; // hot behind cool near p=0.5
  const Rc = 20, Rh = 9;
  // draw far star first
  const drawCool = () => { ctx.fillStyle = "#c9503a"; ctx.beginPath(); ctx.arc(coolX, oy, Rc, 0, Math.PI * 2); ctx.fill(); };
  const drawHot = () => { const g = ctx.createRadialGradient(hotX, oy, 1, hotX, oy, Rh); g.addColorStop(0, "#fff"); g.addColorStop(1, "#8fb8ff"); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(hotX, oy, Rh, 0, Math.PI * 2); ctx.fill(); };
  if (hotBehind) { drawHot(); drawCool(); } else { drawCool(); drawHot(); }
  ctx.fillStyle = "#c9503a"; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.cool, coolX, oy + Rc + 12 > oy + 30 ? oy + 30 : oy + Rc + 12);
  ctx.fillStyle = "#8fb8ff"; ctx.fillText(t.hot, hotX, oy - Rh - 6);
  // light curve (bottom)
  const gx0 = 40, gx1 = cw - 20, gy0 = H * 0.52, gy1 = H - 30;
  ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx0, gy0); ctx.lineTo(gx0, gy1); ctx.lineTo(gx1, gy1); ctx.stroke();
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "left"; ctx.fillText(lang === "ja" ? "明るさ" : "brightness", gx0 - 34, gy0 + 4);
  ctx.strokeStyle = "#ffcf6b"; ctx.lineWidth = 2; ctx.beginPath();
  for (let i = 0; i <= 120; i++) { const ph = i / 120; const f = flux(ph); const x = gx0 + ph * (gx1 - gx0); const y = gy1 - (f - 0.3) / 0.75 * (gy1 - gy0); if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
  ctx.stroke();
  // marker at current phase
  const mx = gx0 + p * (gx1 - gx0), mf = flux(p); const my = gy1 - (mf - 0.3) / 0.75 * (gy1 - gy0);
  ctx.fillStyle = C.sun; ctx.beginPath(); ctx.arc(mx, my, 4, 0, Math.PI * 2); ctx.fill();
  // dip labels
  ctx.fillStyle = "#8fb8ff"; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.primary, gx0 + 0.5 * (gx1 - gx0), gy1 + 12);
  ctx.fillStyle = "#c9503a"; ctx.fillText(t.secondary, gx0 + 0.02 * (gx1 - gx0) + 60, gy0 - 4);
}

export function EclipsingBinaries() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 270;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, 130, lang); return; }
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

        <div style={{ fontFamily: mono, fontSize: 11.5, color: C.cool, marginTop: 8 }}>{t.dia}</div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default EclipsingBinaries;
