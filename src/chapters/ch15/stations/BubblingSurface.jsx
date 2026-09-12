/* ============================================================
   STATION 4 — THE BUBBLING SURFACE
   Two views of the photosphere. GRANULATION: the mottled, bubbling
   pattern of convection cells — hot gas rising in bright centers, cool
   gas sinking in dark lanes. DIFFERENTIAL ROTATION: the Sun spins
   faster at the equator (~25 days) than near the poles (~36 days), so a
   sunspot group spanning several latitudes gets sheared and tilted over
   weeks. Grounded in Ch.15 §15.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The bubbling surface",
    kind: "Convection and a twisting spin",
    lede: "Look closely at the photosphere. Switch between its boiling texture of granules and the strange spin that shears sunspot groups apart over weeks.",
    thread: "THE STORY CONTINUES",
    threadText: "The Sun's surface is neither solid nor still. It boils like a pot of porridge, and it doesn't even turn as one piece — the equator laps the poles.",
    granKey: "GRANULATION — CONVECTION MADE VISIBLE",
    granText: "The mottled, 'bubbling' appearance of the photosphere is GRANULATION: the tops of convection cells. Hot gas wells up in the bright centers of each granule, spreads out, cools, and sinks back down along the darker lanes between them. Each granule is roughly the size of a large country and lasts only minutes.",
    rotKey: "DIFFERENTIAL ROTATION — THE EQUATOR RUNS AHEAD",
    rotText: "The Sun does not rotate as a rigid body. Its equator turns once in about 25 days, while regions near the poles take about 36 days — this is differential rotation. So a sunspot group stretching across several latitudes is gradually sheared: the low-latitude end pulls ahead of the high-latitude end, tilting and stretching the group over weeks.",
    gran: "Granulation", rot: "Differential rotation",
    eq: "equator ~25 days (faster)", pole: "poles ~36 days (slower)", spots: "sunspot group (shearing)",
    noteG: "Granulation is the visible top of convection: bright rising gas in cell centers, dark sinking gas in the lanes between.",
    noteR: "The Sun spins faster at its equator (~25 d) than its poles (~36 d), so a sunspot group spanning latitudes is sheared and tilted over weeks.",
  },
  ja: {
    title: "泡立つ表面",
    kind: "対流とねじれる自転",
    lede: "光球をよく見よう。粒状斑の沸き立つ質感と、数週間で黒点群を引き裂く不思議な自転を切り替えよう。",
    thread: "物語はつづく",
    threadText: "太陽の表面は固くも静かでもありません。粥の鍋のように沸き立ち、しかも一枚岩として回りさえしません——赤道が極を追い抜くのです。",
    granKey: "粒状斑——目に見える対流",
    granText: "光球の斑点状で「泡立つ」外観が粒状斑です：対流セルの頂です。熱いガスが各粒の明るい中心で湧き上がり、広がって冷え、その間の暗いレーンに沿って沈み戻ります。各粒はおよそ大きな国ほどの大きさで、数分しか続きません。",
    rotKey: "差動回転——赤道が先を行く",
    rotText: "太陽は剛体として回転しません。赤道は約25日で1周し、極付近は約36日かかります——これが差動回転です。だから複数の緯度にまたがる黒点群は徐々にずらされます：低緯度側が高緯度側より先へ進み、数週間かけて群れが傾き伸びます。",
    gran: "粒状斑", rot: "差動回転",
    eq: "赤道 約25日（速い）", pole: "極 約36日（遅い）", spots: "黒点群（ずれる）",
    noteG: "粒状斑は目に見える対流の頂です：セル中心で明るく上昇するガス、間のレーンで暗く沈むガス。",
    noteR: "太陽は極（約36日）より赤道（約25日）で速く回るので、緯度にまたがる黒点群は数週間で傾き伸びます。",
  },
};

function draw(ctx, cw, H, mode, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  if (mode === "gran") {
    // granulation: a grid of jittering convection cells
    const cell = 34, cols = Math.ceil(cw / cell), rows = Math.ceil(H / cell);
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const seed = r * 100 + c;
      const cx = c * cell + cell / 2 + Math.sin(tt * 0.03 + seed) * 2;
      const cy = r * cell + cell / 2 + Math.cos(tt * 0.025 + seed) * 2;
      const bright = 0.55 + 0.45 * Math.sin(tt * 0.05 + seed * 1.7);
      const rad = cell * 0.5;
      const g = ctx.createRadialGradient(cx, cy, 1, cx, cy, rad);
      g.addColorStop(0, `rgba(255,${190 + bright * 50 | 0},${90 + bright * 40 | 0},1)`);
      g.addColorStop(1, "rgba(120,50,10,0.9)"); // dark lanes
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = "rgba(0,0,0,0)"; // keep lanes as background
  } else {
    // differential rotation: sun disk, latitude bands, a shearing spot group
    const cx = cw / 2, cy = H / 2, R = Math.min(cw * 0.28, H * 0.36);
    const g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.2, cx, cy, R);
    g.addColorStop(0, "#ffe08a"); g.addColorStop(1, "#e8952a");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip();
    // latitude lines
    ctx.strokeStyle = "rgba(120,60,10,0.25)"; ctx.lineWidth = 1;
    for (let latDeg = -60; latDeg <= 60; latDeg += 30) { const y = cy - Math.sin(latDeg * Math.PI / 180) * R; ctx.beginPath(); ctx.moveTo(cx - R, y); ctx.lineTo(cx + R, y); ctx.stroke(); }
    // spots at several latitudes; longitude advances faster near equator
    const lats = [10, 20, 35];
    // reference meridian offset per latitude accumulates differently
    lats.forEach((lat) => {
      const rate = 0.9 - 0.5 * Math.pow(lat / 90, 1); // faster at low latitude
      const lon = (tt * 0.01 * rate) % (Math.PI * 2);
      // project longitude to x within disk at that latitude
      const latR = Math.cos(lat * Math.PI / 180) * R;
      const y = cy - Math.sin(lat * Math.PI / 180) * R;
      const x = cx + Math.sin(lon) * latR;
      // only draw front side
      if (Math.cos(lon) < 0) return;
      ctx.fillStyle = "#3a2410"; ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "rgba(90,55,20,0.5)"; ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.fill();
    });
    ctx.restore();
    ctx.fillStyle = C.cool; ctx.font = `9px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(t.pole, cx, Math.max(cy - R - 8, 12));
    ctx.fillText(t.eq, cx, Math.min(cy + R + 16, H - 6));
    ctx.fillStyle = C.sun; ctx.textAlign = "left"; ctx.fillText(t.spots, 10, 16);
  }
}

export function BubblingSurface() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("gran");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, mode, 30, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, mode, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, mode, lang]);

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
          <div style={{ ...styles.fateLabel, color: C.sun }}>{mode === "gran" ? t.granKey : t.rotKey}</div>
          <p style={styles.keyTermText}>{mode === "gran" ? t.granText : t.rotText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          {[["gran", t.gran], ["rot", t.rot]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{mode === "gran" ? t.noteG : t.noteR}</p>
      </div>
    </div>
  );
}

export default BubblingSurface;
