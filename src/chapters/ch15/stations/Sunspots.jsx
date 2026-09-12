/* ============================================================
   STATION 5 — SUNSPOTS
   Sunspots look dark because they are cooler: intense magnetic fields
   choke off convection, so the spot cools to ~3,800 K against the
   ~5,800 K photosphere. We measure their magnetic fields with the
   Zeeman effect (magnetic splitting of spectral lines). The Maunder
   Minimum (1645-1715) was a long stretch with almost no sunspots.
   Grounded in Ch.15 §15.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Sunspots",
    kind: "Cool, magnetic, and dark",
    lede: "Zoom in on a sunspot. It isn't a hole or a rock — it's a patch of surface held cool by a knot of magnetism, which we can read in its split spectral lines.",
    thread: "THE STORY CONTINUES",
    threadText: "For centuries sunspots were a mystery — blemishes on a 'perfect' Sun. They turned out to be windows into the Sun's powerful, ever-shifting magnetic field.",
    key: "MAGNETISM COOLS THE SPOT; ZEEMAN READS IT",
    keyText: "A sunspot looks dark only by contrast: intense magnetic fields there inhibit the convection that carries heat to the surface, so the spot cools to about 3,800 K while the surrounding photosphere stays near 5,800 K — cooler gas glows less brightly. Astronomers measure the strength and direction of a sunspot's magnetic field using the ZEEMAN EFFECT, the splitting of spectral lines by a magnetic field. Sunspot numbers rise and fall over the cycle, and from 1645 to 1715 they nearly vanished — a long lull called the MAUNDER MINIMUM.",
    hot: "photosphere ~5,800 K", cool: "umbra ~3,800 K (cooler → darker)", zeeman: "Zeeman effect: field splits the spectral line",
    maunder: "Maunder Minimum (1645–1715): almost no sunspots",
    note: "Sunspots are dark because magnetism suppresses convection, cooling them to ~3,800 K vs the 5,800 K photosphere. The Zeeman effect measures their fields; the Maunder Minimum was a 70-year sunspot drought.",
  },
  ja: {
    title: "黒点",
    kind: "冷たく、磁気があり、暗い",
    lede: "黒点を拡大しよう。穴でも岩でもなく——磁気の結び目によって冷たく保たれた表面の一画で、分裂したスペクトル線からそれを読み取れます。",
    thread: "物語はつづく",
    threadText: "何世紀もの間、黒点は謎でした——「完璧な」太陽の染み。それらは、太陽の強力で絶えず変化する磁場への窓だと判明しました。",
    key: "磁気が黒点を冷やし、ゼーマンが読み取る",
    keyText: "黒点が暗く見えるのは対比によるだけです：そこでは強い磁場が、熱を表面へ運ぶ対流を抑えるため、黒点は約3,800 Kまで冷え、周囲の光球は約5,800 Kのままです——冷たいガスは明るく光りません。天文学者は、磁場によるスペクトル線の分裂であるゼーマン効果を使って、黒点の磁場の強さと向きを測ります。黒点の数は周期で増減し、1645年から1715年にはほぼ消えました——マウンダー極小期と呼ばれる長い休止期です。",
    hot: "光球 約5,800 K", cool: "暗部 約3,800 K（冷たく→暗い）", zeeman: "ゼーマン効果：磁場がスペクトル線を分裂",
    maunder: "マウンダー極小期（1645〜1715）：黒点がほぼ皆無",
    note: "黒点が暗いのは磁気が対流を抑えて約3,800 K（光球は5,800 K）に冷やすから。ゼーマン効果が磁場を測り、マウンダー極小期は70年の黒点の空白でした。",
  },
};

function draw(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // photosphere background (granular)
  for (let y = 0; y < H; y += 20) for (let x = 0; x < cw; x += 20) {
    const b = 0.6 + 0.4 * Math.sin(x * 0.3 + y * 0.2 + tt * 0.02);
    ctx.fillStyle = `rgba(255,${170 + b * 50 | 0},${70 + b * 40 | 0},1)`;
    ctx.beginPath(); ctx.arc(x + 10, y + 10, 11, 0, Math.PI * 2); ctx.fill();
  }
  // sunspot: penumbra + dark umbra, left-center
  const sx = cw * 0.32, sy = H * 0.5, R = Math.min(cw * 0.16, H * 0.34);
  ctx.fillStyle = "rgba(120,70,25,0.85)"; ctx.beginPath(); ctx.arc(sx, sy, R, 0, Math.PI * 2); ctx.fill(); // penumbra
  // penumbra filaments
  ctx.strokeStyle = "rgba(180,110,45,0.6)"; ctx.lineWidth = 1;
  for (let a = 0; a < Math.PI * 2; a += 0.18) { ctx.beginPath(); ctx.moveTo(sx + Math.cos(a) * R * 0.5, sy + Math.sin(a) * R * 0.5); ctx.lineTo(sx + Math.cos(a) * R, sy + Math.sin(a) * R); ctx.stroke(); }
  ctx.fillStyle = "#2a1c0e"; ctx.beginPath(); ctx.arc(sx, sy, R * 0.5, 0, Math.PI * 2); ctx.fill(); // umbra
  // magnetic field lines emerging from the spot
  ctx.strokeStyle = "rgba(150,200,255,0.6)"; ctx.lineWidth = 1.2;
  for (let i = -2; i <= 2; i++) {
    ctx.beginPath();
    ctx.moveTo(sx + i * R * 0.18, sy);
    ctx.quadraticCurveTo(sx + i * R * 0.6, sy - R * 1.6, sx + i * R * 1.1, sy - R * 0.2);
    ctx.stroke();
  }
  // labels with dark backing pills so they read against the bright surface
  const chip = (text, x, y, col) => {
    ctx.font = `10px ${mono}`; ctx.textAlign = "center";
    const wd = ctx.measureText(text).width + 14;
    ctx.fillStyle = "rgba(8,10,16,0.8)"; ctx.fillRect(x - wd / 2, y - 11, wd, 16);
    ctx.fillStyle = col; ctx.fillText(text, x, y);
  };
  chip(t.cool, sx, Math.min(sy + R + 18, H - 6), "#ffcf9a");
  chip(t.hot, cw * 0.8, 18, "#ffdf9a");
  // Zeeman inset: a spectral line splitting into three, right side
  const zx = cw * 0.72, zy = H * 0.5, zw = cw * 0.22;
  ctx.fillStyle = "rgba(10,12,20,0.7)"; ctx.fillRect(zx - 6, zy - 40, zw + 12, 80);
  ctx.strokeStyle = "rgba(150,175,230,0.4)"; ctx.strokeRect(zx - 6, zy - 40, zw + 12, 80);
  // single line -> split
  ctx.strokeStyle = "#8fbfff"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(zx + zw * 0.3, zy - 30); ctx.lineTo(zx + zw * 0.3, zy - 6); ctx.stroke();
  const split = 6 + 4 * Math.sin(tt * 0.05);
  [-split, 0, split].forEach((d) => { ctx.beginPath(); ctx.moveTo(zx + zw * 0.7 + d, zy + 6); ctx.lineTo(zx + zw * 0.7 + d, zy + 30); ctx.stroke(); });
  ctx.fillStyle = C.cool; ctx.font = `8px ${mono}`; ctx.textAlign = "center"; ctx.fillText("Zeeman", zx + zw * 0.5, zy + 38);
}

export function Sunspots() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, 30, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, tt, lang); raf = requestAnimationFrame(loop); };
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

        <div style={{ fontFamily: mono, fontSize: 11.5, color: C.cool, marginTop: 8 }}>{t.zeeman}</div>
        <div style={{ fontFamily: mono, fontSize: 11.5, color: C.faint, marginTop: 4 }}>{t.maunder}</div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default Sunspots;
