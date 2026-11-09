/* ============================================================
   STATION 1 — GALAXY ANATOMY
   The size and structure of the Milky Way. Toggle between a FACE-ON view of
   the spiral disk (~100,000 ly across) and an EDGE-ON view showing the thin
   disk (~2,000 ly thick), the central bulge, and the spherical halo studded
   with globular clusters. A 100,000-LY DISK, A BULGE, AND A VAST HALO.
   Grounded in Ch.25.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Galaxy anatomy",
    kind: "The size and structure of our Galaxy",
    lede: "Switch between a face-on view of the spiral disk and an edge-on cross-section. The disk spans about 100,000 light-years but is only about 2,000 thick — a thin pancake wrapped in a vast spherical halo of globular clusters.",
    thread: "THE JOURNEY BEGINS — MAPPING HOME",
    threadText: "Before we can find ourselves inside the Galaxy, we have to see its shape: a flat spinning disk, a bulge at its heart, and a halo that dwarfs them both.",
    key: "A 100,000-LY DISK, A BULGE, AND A VAST HALO",
    keyText: "The Milky Way is a barred spiral galaxy with three main parts. The thin rotating stellar DISK is about 100,000 light-years across but only about 2,000 light-years thick — proportionally thinner than a sheet of paper. At its center is a rounded BULGE of older stars around a bar. Surrounding everything is a nearly spherical HALO, sparsely filled with old stars and about 150 GLOBULAR CLUSTERS, and far beyond the visible stars an even larger halo of invisible DARK MATTER. Seen face-on the disk shows graceful spiral arms; seen edge-on it is a thin luminous line with the bulge swelling at the middle.",
    faceOn: "Face-on (spiral disk)",
    edgeOn: "Edge-on (cross-section)",
    diskLabel: "disk ~100,000 ly across",
    thickLabel: "~2,000 ly thick",
    bulgeLabel: "bulge",
    haloLabel: "halo + globular clusters",
    sunLabel: "Sun",
    note: "The Milky Way is a barred spiral: a thin ~100,000-ly disk only ~2,000 ly thick, a central bulge, and a vast spherical halo of old stars, globular clusters and dark matter. We live far out in the disk.",
  },
  ja: {
    title: "銀河の解剖学",
    kind: "私たちの銀河の大きさと構造",
    lede: "渦巻円盤を正面から見た図と、横から見た断面を切り替えよう。円盤は差し渡し約10万光年もあるのに厚さはわずか約2,000光年——球状星団の広大な球状ハローに包まれた薄いパンケーキです。",
    thread: "旅のはじまり——故郷を描く",
    threadText: "銀河の中で自分を見つける前に、その形を見ておく必要があります：平らに回る円盤、その中心のバルジ、そしてそれらをはるかに上回るハロー。",
    key: "10万光年の円盤・バルジ・そして広大なハロー",
    keyText: "天の川は棒渦巻銀河で、主に3つの部分からなります。薄く回転する星の円盤は差し渡し約10万光年ですが、厚さはわずか約2,000光年——比率でいえば紙より薄いほどです。その中心には、棒構造のまわりに古い星の丸いバルジがあります。すべてを取り囲むのが、古い星と約150個の球状星団がまばらに散らばるほぼ球状のハローで、見える星のはるか外側には、見えないダークマターのさらに大きなハローが広がります。正面から見ると円盤は優雅な渦巻腕を見せ、横から見ると、中央にバルジがふくらむ細く輝く線になります。",
    faceOn: "正面から（渦巻円盤）",
    edgeOn: "横から（断面）",
    diskLabel: "円盤 差し渡し約10万光年",
    thickLabel: "厚さ約2,000光年",
    bulgeLabel: "バルジ",
    haloLabel: "ハロー＋球状星団",
    sunLabel: "太陽",
    note: "天の川は棒渦巻銀河です：厚さわずか約2,000光年の薄い約10万光年の円盤、中心のバルジ、そして古い星・球状星団・ダークマターの広大な球状ハロー。私たちは円盤のずっと外側に暮らしています。",
  },
};

function draw(ctx, cw, H, view, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.5, cy = H * 0.5;

  if (view === "face") {
    // halo of globular clusters (sparse dots in a circle)
    const haloR = Math.min(cw * 0.46, H * 0.46);
    for (let i = 0; i < 46; i++) {
      const a = i * 2.3994, r = haloR * (0.5 + 0.5 * ((i * 37) % 100) / 100);
      const gx = cx + Math.cos(a) * r, gy = cy + Math.sin(a) * r * 0.96;
      ctx.fillStyle = "rgba(201,170,255,0.5)";
      ctx.beginPath(); ctx.arc(gx, gy, 2.1, 0, Math.PI * 2); ctx.fill();
    }
    // spiral disk
    const diskR = Math.min(cw * 0.40, H * 0.40);
    const arms = 2;
    for (let s = 0; s < arms; s++) {
      ctx.strokeStyle = s === 0 ? "rgba(120,170,255,0.55)" : "rgba(150,190,255,0.4)";
      ctx.lineWidth = 7;
      ctx.beginPath();
      for (let th = 0; th < Math.PI * 2.4; th += 0.05) {
        const r = 10 + (diskR - 10) * (th / (Math.PI * 2.4));
        const ang = th + s * Math.PI + tt * 0.002;
        const x = cx + Math.cos(ang) * r, y = cy + Math.sin(ang) * r;
        if (th === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    // faint disk glow
    const dg = ctx.createRadialGradient(cx, cy, 6, cx, cy, diskR);
    dg.addColorStop(0, "rgba(255,230,160,0.18)"); dg.addColorStop(1, "rgba(120,160,255,0)");
    ctx.fillStyle = dg; ctx.beginPath(); ctx.arc(cx, cy, diskR, 0, Math.PI * 2); ctx.fill();
    // central bulge
    const bg = ctx.createRadialGradient(cx, cy, 2, cx, cy, 24);
    bg.addColorStop(0, "#fff2c0"); bg.addColorStop(1, "rgba(255,180,80,0)");
    ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(cx, cy, 24, 0, Math.PI * 2); ctx.fill();
    // Sun marker in the disk
    const sunR = diskR * 0.66, sunAng = -0.5 + tt * 0.002;
    const sx = cx + Math.cos(sunAng) * sunR, sy = cy + Math.sin(sunAng) * sunR;
    ctx.fillStyle = C.sun; ctx.beginPath(); ctx.arc(sx, sy, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = C.sun; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(sx, sy, 7, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = C.sun; ctx.font = `11px ${mono}`; ctx.textAlign = "left";
    ctx.fillText(t.sunLabel, Math.min(sx + 11, cw - 60), sy + 4);
    // labels
    ctx.fillStyle = "#cfe0ff"; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(t.diskLabel, cx, H - 12);
    ctx.fillStyle = "rgba(201,170,255,0.9)"; ctx.textAlign = "left";
    ctx.fillText(t.haloLabel, 12, 18);
  } else {
    // EDGE-ON cross-section
    // spherical halo outline + globular clusters
    const haloR = Math.min(cw * 0.42, H * 0.42);
    ctx.strokeStyle = "rgba(201,170,255,0.3)"; ctx.lineWidth = 1; ctx.setLineDash([4, 5]);
    ctx.beginPath(); ctx.arc(cx, cy, haloR, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
    for (let i = 0; i < 40; i++) {
      const a = i * 2.3994, r = haloR * (0.35 + 0.6 * ((i * 53) % 100) / 100);
      const gx = cx + Math.cos(a) * r, gy = cy + Math.sin(a) * r;
      ctx.fillStyle = "rgba(201,170,255,0.5)";
      ctx.beginPath(); ctx.arc(gx, gy, 2.1, 0, Math.PI * 2); ctx.fill();
    }
    // thin disk (a wide, very thin ellipse seen edge-on)
    const diskW = Math.min(cw * 0.40, haloR * 0.95);
    const thick = 10;
    const dg = ctx.createLinearGradient(cx - diskW, cy, cx + diskW, cy);
    dg.addColorStop(0, "rgba(120,160,255,0)"); dg.addColorStop(0.5, "rgba(170,200,255,0.9)"); dg.addColorStop(1, "rgba(120,160,255,0)");
    ctx.fillStyle = dg;
    ctx.beginPath(); ctx.ellipse(cx, cy, diskW, thick, 0, 0, Math.PI * 2); ctx.fill();
    // central bulge swelling
    const bg = ctx.createRadialGradient(cx, cy, 2, cx, cy, 30);
    bg.addColorStop(0, "#fff2c0"); bg.addColorStop(0.5, "rgba(255,200,100,0.7)"); bg.addColorStop(1, "rgba(255,180,80,0)");
    ctx.fillStyle = bg; ctx.beginPath(); ctx.ellipse(cx, cy, 34, 22, 0, 0, Math.PI * 2); ctx.fill();
    // Sun marker out in the disk plane
    const sx = cx + diskW * 0.62, sy = cy;
    ctx.fillStyle = C.sun; ctx.beginPath(); ctx.arc(sx, sy, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = C.sun; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(sx, sy, 7, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = C.sun; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(t.sunLabel, Math.min(sx, cw - 30), sy - 14);
    // thickness bracket on the left of the disk
    const bxL = cx - diskW - 8;
    ctx.strokeStyle = C.cool; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(bxL, cy - thick); ctx.lineTo(bxL, cy + thick); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(bxL - 4, cy - thick); ctx.lineTo(bxL + 4, cy - thick); ctx.moveTo(bxL - 4, cy + thick); ctx.lineTo(bxL + 4, cy + thick); ctx.stroke();
    // labels
    ctx.fillStyle = C.cool; ctx.font = `11px ${mono}`; ctx.textAlign = "left";
    ctx.fillText(t.thickLabel, 12, cy + 4 > H - 30 ? cy - 20 : cy + 4);
    ctx.fillStyle = "#ffe08a"; ctx.textAlign = "center";
    ctx.fillText(t.bulgeLabel, cx, cy + 40);
    ctx.fillStyle = "rgba(201,170,255,0.9)"; ctx.textAlign = "center";
    ctx.fillText(t.haloLabel, cx, H - 12);
    ctx.fillStyle = "#cfe0ff"; ctx.textAlign = "center";
    ctx.fillText(t.diskLabel, cx, 18);
  }
}

export function GalaxyAnatomy() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 300;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [view, setView] = useState("face");
  const viewRef = useRef("face"); viewRef.current = view;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, view, 0, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, viewRef.current, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, view, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 01</div>
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
          <button onClick={() => setView("face")} style={{ ...styles.chip, ...(view === "face" ? styles.chipOn : {}) }}>{t.faceOn}</button>
          <button onClick={() => setView("edge")} style={{ ...styles.chip, ...(view === "edge" ? styles.chipOn : {}) }}>{t.edgeOn}</button>
        </div>

        <div style={{ marginTop: 10 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default GalaxyAnatomy;
