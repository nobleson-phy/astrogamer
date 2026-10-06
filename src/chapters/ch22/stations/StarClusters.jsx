/* ============================================================
   STATION 5 — STAR CLUSTERS
   Stars are born in groups, and clusters are the astronomer's dream: all the
   members formed at nearly the same time, from the same cloud, with the same
   composition — so their differences come almost entirely from mass. GLOBULAR
   clusters are dense spherical balls of 10⁴–10⁶ ancient, metal-poor Population
   II stars, orbiting in the Galactic halo. OPEN clusters are looser, younger,
   metal-richer groups in the gas-rich disk and spiral arms. Globulars are
   metal-poor because they formed early, before dying stars had enriched the
   gas. Grounded in Ch.22 §22.4.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Star clusters",
    kind: "The astronomer's laboratory",
    lede: "Toggle between the two kinds of cluster and see where each lives in the Galaxy — an ancient halo ball, or a young group in the disk.",
    thread: "THE STORY CONTINUES",
    threadText: "To watch stars of every mass age side by side, we need a group born together. Clusters give us exactly that — a single snapshot of many fates at once.",
    key: "GLOBULAR (HALO, OLD, METAL-POOR) vs OPEN (DISK, YOUNG)",
    keyText: "Because all the stars in a cluster formed at nearly the same time, from one cloud, with the same composition, their differences depend almost entirely on mass — making clusters ideal laboratories for stellar evolution. GLOBULAR clusters are dense, spherical balls of 10⁴–10⁶ ancient stars orbiting in the Galactic HALO; they are metal-poor Population II stars. OPEN clusters are looser, younger, metal-richer groups that sit in the gas-rich DISK and spiral arms. Globulars are metal-poor because they formed very early — before multiple generations of dying stars had enriched the gas with heavy elements.",
    glob: "Globular", open: "Open",
    halo: "halo", disk: "disk",
    globFacts: ["10⁴–10⁶ stars", "dense sphere", "ancient (Pop II)", "metal-poor", "Galactic halo"],
    openFacts: ["hundreds–thousands", "loose group", "young", "metal-richer", "disk & arms"],
    note: "Clusters are born together from one cloud, so mass alone sets the differences. Globulars: huge, old, metal-poor spheres in the halo. Open: small, young, metal-richer groups in the disk — richer because they formed after supernovae enriched the gas.",
  },
  ja: {
    title: "星団",
    kind: "天文学者の実験室",
    lede: "2種類の星団を切り替え、それぞれが銀河のどこに住むかを見よう——古代のハローの球か、円盤の若い集団か。",
    thread: "物語はつづく",
    threadText: "あらゆる質量の星が並んで年を取るのを見るには、一緒に生まれた集団が要ります。星団はまさにそれを——多くの運命を一度にとらえた一枚の写真を——与えてくれます。",
    key: "球状（ハロー・古い・金属に乏しい）対 散開（円盤・若い）",
    keyText: "星団の星はすべて、同じ組成の一つの雲からほぼ同時に形成されたので、その違いはほぼ完全に質量で決まります——だから星団は恒星進化の理想的な実験室です。球状星団は、銀河のハローを回る10⁴〜10⁶個の古い星からなる、密な球です；金属に乏しい種族IIの星です。散開星団は、ガスに富む円盤と渦状腕にある、よりゆるく、より若く、より金属に富む集団です。球状星団が金属に乏しいのは、死にゆく星の何世代もがガスを重元素で富ませる前の、非常に早い時期に形成されたからです。",
    glob: "球状星団", open: "散開星団",
    halo: "ハロー", disk: "円盤",
    globFacts: ["10⁴–10⁶個の星", "密な球", "古代（種族II）", "金属に乏しい", "銀河ハロー"],
    openFacts: ["数百〜数千個", "ゆるい集団", "若い", "より金属に富む", "円盤と腕"],
    note: "星団は一つの雲から一緒に生まれるので、違いは質量だけで決まります。球状：ハローにある巨大で古い金属に乏しい球。散開：円盤にある小さく若い、より金属に富む集団——超新星がガスを富ませた後に形成されたため金属に富みます。",
  },
};

function drawGalaxy(ctx, cw, H, kind, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.5, cy = H * 0.5;
  // halo circle
  ctx.strokeStyle = "rgba(201,139,255,0.4)"; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.ellipse(cx, cy, Math.min(cw * 0.42, 150), Math.min(cw * 0.42, 150), 0, 0, Math.PI * 2); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "rgba(201,139,255,0.7)"; ctx.font = `11px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(t.halo, cx - Math.min(cw * 0.42, 150) + 4, cy - Math.min(cw * 0.42, 150) + 14);
  // disk (ellipse, edge-on)
  const dw = Math.min(cw * 0.40, 150);
  const g = ctx.createLinearGradient(cx - dw, cy, cx + dw, cy);
  g.addColorStop(0, "rgba(63,221,255,0)"); g.addColorStop(0.5, "rgba(120,170,255,0.55)"); g.addColorStop(1, "rgba(63,221,255,0)");
  ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(cx, cy, dw, 16, 0, 0, Math.PI * 2); ctx.fill();
  // central bulge
  ctx.fillStyle = "rgba(255,230,150,0.6)"; ctx.beginPath(); ctx.arc(cx, cy, 12, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.cool; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.disk, cx, cy + 30);

  if (kind === "glob") {
    // a dense spherical ball out in the halo
    const gx = cx + dw * 0.5, gy = cy - 70;
    for (let i = 0; i < 150; i++) {
      const ang = Math.random() * Math.PI * 2;
      const rr = Math.pow(Math.random(), 0.5) * 20;
      ctx.fillStyle = `rgba(255,220,180,${0.5 + Math.random() * 0.4})`;
      ctx.beginPath(); ctx.arc(gx + Math.cos(ang) * rr, gy + Math.sin(ang) * rr, 1.1, 0, Math.PI * 2); ctx.fill();
    }
    ctx.strokeStyle = "rgba(255,220,180,0.5)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(gx, gy, 24, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = C.sun; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.glob, gx, gy - 30);
  } else {
    // a loose scatter in the disk plane
    const ox = cx - dw * 0.35, oy = cy;
    for (let i = 0; i < 26; i++) {
      const dx = (Math.random() - 0.5) * 70, dy = (Math.random() - 0.5) * 22;
      ctx.fillStyle = `rgba(160,200,255,${0.6 + Math.random() * 0.4})`;
      ctx.beginPath(); ctx.arc(ox + dx, oy + dy, 1.6, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = C.cool; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.open, ox, oy - 26);
  }
}

export function StarClusters() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [kind, setKind] = useState("glob");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    drawGalaxy(ctx, cw, H, kind, lang);
  }, [cw, kind, lang]);

  const facts = kind === "glob" ? t.globFacts : t.openFacts;

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

        <div style={styles.pickerRow}>
          {[["glob", t.glob], ["open", t.open]].map(([id, label]) => (
            <button key={id} onClick={() => setKind(id)} style={{ ...styles.chip, ...(kind === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 10 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
          {facts.map((f, i) => (
            <span key={i} style={{ fontFamily: mono, fontSize: 11.5, color: C.muted, border: `1px solid ${C.border}`, borderRadius: 20, padding: "4px 10px" }}>{f}</span>
          ))}
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default StarClusters;
