/* ============================================================
   STATION 5 — THE MASS THRESHOLD
   To become a true star, a protostar needs at least ~1/12 the Sun's
   mass (~0.075 M☉) — below that, the core never gets hot enough for
   sustained hydrogen fusion. Objects between ~1/100 and ~1/12 M☉ (13-80
   Jupiter masses) are BROWN DWARFS: they can't sustain proton fusion,
   are very cool, and radiate 10,000-1,000,000× less than the Sun, mostly
   in the infrared — so they are hard to find. Grounded in Ch.18 §18.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The mass threshold",
    kind: "Star, or failed star?",
    lede: "Dial the mass of a newborn object. Cross the 1/12-solar-mass line and its core ignites into a true star; below it, you get a dim, cooling brown dwarf.",
    thread: "THE STORY CONTINUES",
    threadText: "There is a sharp dividing line in the sky between the things that shine by fusion and the things that merely glow with leftover warmth. It is drawn by mass.",
    key: "1/12 M☉ SEPARATES STARS FROM BROWN DWARFS",
    keyText: "A protostar must have at least about 1/12 of the Sun's mass (~0.075 M☉) for its core to reach the millions of kelvin needed for sustained hydrogen fusion — the mark of a true star. Objects between roughly 1/100 and 1/12 M☉ (about 13-80 Jupiter masses) fall short: these are BROWN DWARFS, which cannot sustain proton fusion. Being so low in mass, they are extremely cool and radiate 10,000 to 1,000,000 times less light than the Sun, mostly in the infrared — which makes them very hard to find in surveys.",
    mass: "Object mass (M☉)",
    star: "TRUE STAR — sustained hydrogen fusion", bd: "BROWN DWARF — no sustained fusion", planet: "planetary-mass object",
    fusionLine: "fusion threshold ≈ 1/12 M☉", faint: "brown dwarfs: 10⁴–10⁶× fainter, mostly infrared",
    note: "Above ~1/12 M☉ a core fuses hydrogen — a true star. From ~1/100 to 1/12 M☉ are brown dwarfs: no sustained fusion, cool, and 10,000–1,000,000× fainter (mostly infrared), so hard to find.",
  },
  ja: {
    title: "質量のしきい値",
    kind: "星か、失敗した星か",
    lede: "生まれたての天体の質量を回そう。太陽質量の1/12の線を越えると核が点火して本物の星になり、下回ると暗く冷えていく褐色矮星になります。",
    thread: "物語はつづく",
    threadText: "空には、核融合で輝くものと、残り熱でただ光るものとを分ける鋭い境界線があります。それは質量で引かれています。",
    key: "1/12 M☉ が星と褐色矮星を分ける",
    keyText: "原始星は、核が持続的な水素融合に必要な数百万Kに達するには、少なくとも太陽質量の約1/12（約0.075 M☉）が必要です——それが本物の星の証です。およそ1/100から1/12 M☉（木星質量の約13〜80倍）の天体は届きません：これらが褐色矮星で、陽子融合を維持できません。質量が非常に低いため極めて低温で、太陽の1万〜100万分の1しか光を放たず、大半が赤外線です——だから探査で見つけるのが非常に難しいのです。",
    mass: "天体の質量（M☉）",
    star: "本物の星——持続的な水素融合", bd: "褐色矮星——持続的な融合なし", planet: "惑星質量の天体",
    fusionLine: "融合のしきい値 ≈ 1/12 M☉", faint: "褐色矮星：1万〜100万倍暗く、大半が赤外線",
    note: "約1/12 M☉を超えると核が水素を融合——本物の星。約1/100〜1/12 M☉は褐色矮星：持続的な融合なし、低温で1万〜100万倍暗く（大半が赤外線）、見つけにくい。",
  },
};

function draw(ctx, cw, H, M, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const isStar = M >= 0.075;
  const isBD = M >= 0.013 && M < 0.075;
  // the object
  const cx = cw * 0.28, cy = H * 0.42, R = 14 + clamp(M, 0, 1) * 30;
  const col = isStar ? "#ffe08a" : isBD ? "#c9503a" : "#7a5a4a";
  const glow = ctx.createRadialGradient(cx, cy, R * 0.4, cx, cy, R * (isStar ? 2 : 1.3));
  glow.addColorStop(0, col); glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(cx, cy, R * (isStar ? 2 : 1.3), 0, Math.PI * 2); ctx.fill();
  const g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.2, cx, cy, R); g.addColorStop(0, isStar ? "#fff" : col); g.addColorStop(1, "rgba(0,0,0,0.4)");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
  // core fusion spark if star
  if (isStar) { ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(cx, cy, R * 0.3, 0, Math.PI * 2); ctx.fill(); }
  // status label
  ctx.font = `700 12px ${mono}`; ctx.textAlign = "center";
  ctx.fillStyle = isStar ? C.good : isBD ? "#e0774f" : C.faint;
  ctx.fillText(isStar ? t.star : isBD ? t.bd : t.planet, cw / 2, H - 40);
  // mass scale bar with threshold markers
  const bx = 30, bw = cw - 60, by = H - 24;
  // log scale from 0.005 to 1 M☉
  const lx = (m) => bx + (Math.log10(m) - Math.log10(0.005)) / (Math.log10(1) - Math.log10(0.005)) * bw;
  ctx.fillStyle = "rgba(120,150,210,0.15)"; ctx.fillRect(bx, by, bw, 8);
  // brown dwarf band
  ctx.fillStyle = "rgba(201,80,58,0.3)"; ctx.fillRect(lx(0.013), by, lx(0.075) - lx(0.013), 8);
  // star band
  ctx.fillStyle = "rgba(255,207,107,0.3)"; ctx.fillRect(lx(0.075), by, bx + bw - lx(0.075), 8);
  // fusion threshold line
  ctx.strokeStyle = C.sun; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(lx(0.075), by - 6); ctx.lineTo(lx(0.075), by + 12); ctx.stroke();
  ctx.fillStyle = C.sun; ctx.font = `8px ${mono}`; ctx.textAlign = "center"; ctx.fillText("1/12 M☉", lx(0.075), by - 9);
  // current marker
  ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(lx(clamp(M, 0.005, 1)), by + 4, 4, 0, Math.PI * 2); ctx.fill();
  if (isBD) { ctx.fillStyle = "#e0774f"; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.faint, cw / 2, H - 56); }
}

export function MassThreshold() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [M, setM] = useState(0.05);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, M, lang);
  }, [cw, M, lang]);

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

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.mass}</span>
          <input type="range" min="0.005" max="1" step="0.005" value={M}
            onChange={(e) => setM(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
          <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, width: 58, textAlign: "right" }}>{M.toFixed(3)}</span>
        </div>

        <div style={{ marginTop: 4 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default MassThreshold;
