/* ============================================================
   STATION 3 — OCEAN WORLDS
   Beneath Europa's cracked ice shell lies a global ocean of liquid
   water, kept from freezing by tidal heat. Enceladus jets water into
   space from its south pole. Liquid water + biogenic elements + an
   energy source = the recipe for life — and it exists far outside
   the Sun's traditional habitable zone. Grounded in Ch.12 §12.1–12.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Ocean worlds",
    kind: "Seas beneath the ice",
    lede: "Europa looks like a cracked cue ball — but under that ice hides a global ocean holding more water than all of Earth's. Cut through the shell and meet the three ingredients life needs.",
    thread: "THE STORY CONTINUES",
    threadText: "The most exciting discovery of the outer moons is not ice but water. Where there is liquid water, warmth, and chemistry, there may be a place for life — and these moons have all three, far from the Sun.",
    key: "LIQUID WATER + ELEMENTS + ENERGY, FAR FROM THE SUN",
    keyText: "Europa's smooth, cracked, highly reflective ice shell and its weak induced magnetic field point to a global subsurface OCEAN of liquid water, kept from freezing by tidal heat. Enceladus, a small moon of Saturn, even sprays that water into space through south-polar geysers. This matters enormously for astrobiology: the essential ingredients for life — liquid water, biogenic elements (carbon, etc.), and a source of energy (tidal heat, hydrothermal vents) — can all exist far outside a star's traditional 'habitable zone'. The search for life has moved to the icy moons.",
    layers: ["icy crust", "global liquid ocean", "rocky sea floor + vents"],
    ingredients: ["liquid water", "biogenic elements", "energy source"],
    note: "Under Europa's ice is a global ocean warmed by tides, with a rocky floor that could host hydrothermal vents. Liquid water, the right elements, and energy — the recipe for life, out where the Sun is faint.",
  },
  ja: {
    title: "海の世界",
    kind: "氷の下の海",
    lede: "エウロパはひび割れたビリヤードの球のよう——でもその氷の下に、地球のすべての水より多くを湛える全球の海が隠れています。殻を切り開き、生命に必要な3つの材料に出会おう。",
    thread: "物語はつづく",
    threadText: "外側の衛星の最も心躍る発見は、氷ではなく水です。液体の水と暖かさと化学があるところには、生命の場があるかもしれない——これらの衛星は、太陽から遠く離れて、その3つすべてをもっています。",
    key: "液体の水＋元素＋エネルギー、太陽から遠く",
    keyText: "エウロパの滑らかでひび割れ、よく反射する氷の殻と、その弱い誘導磁場は、潮汐熱で凍結を免れた全球の地下の海（液体の水）を示します。土星の小さな衛星エンケラドスは、その水を南極の間欠泉から宇宙へ噴き出しさえします。これは宇宙生物学にとって非常に重要です：生命に不可欠な材料——液体の水、生元素（炭素など）、エネルギー源（潮汐熱・熱水噴出孔）——はすべて、恒星の伝統的な「ハビタブルゾーン」の外でも存在しうるのです。生命探査は氷の衛星へ移りました。",
    layers: ["氷の地殻", "全球の液体の海", "岩石の海底＋噴出孔"],
    ingredients: ["液体の水", "生元素", "エネルギー源"],
    note: "エウロパの氷の下には潮汐で温められた全球の海があり、熱水噴出孔をもちうる岩石の海底があります。液体の水・適切な元素・エネルギー——太陽が弱い場所での、生命の材料です。",
  },
};

function draw(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // cutaway of Europa: quarter cross-section on the left
  const cx = cw * 0.32, cy = H / 2, R = Math.min(cw * 0.28, H * 0.46);
  // rocky core
  ctx.fillStyle = "#6b5a45"; ctx.beginPath(); ctx.arc(cx, cy, R * 0.5, 0, Math.PI * 2); ctx.fill();
  // ocean
  ctx.fillStyle = "#2f6a9a"; ctx.beginPath(); ctx.arc(cx, cy, R * 0.82, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#6b5a45"; ctx.beginPath(); ctx.arc(cx, cy, R * 0.5, 0, Math.PI * 2); ctx.fill();
  // icy crust
  ctx.lineWidth = R * 0.18; ctx.strokeStyle = "#d8e4ee"; ctx.beginPath(); ctx.arc(cx, cy, R * 0.91, 0, Math.PI * 2); ctx.stroke();
  ctx.lineWidth = 1;
  // surface cracks
  ctx.strokeStyle = "rgba(160,90,70,0.6)"; ctx.lineWidth = 1.5;
  for (let i = 0; i < 6; i++) { const a = i * 1.05; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * R * 0.83, cy + Math.sin(a) * R * 0.83); ctx.lineTo(cx + Math.cos(a + 0.4) * R, cy + Math.sin(a + 0.4) * R); ctx.stroke(); }
  // hydrothermal vent plumes rising in the ocean
  for (let i = 0; i < 3; i++) { const vx = cx - R * 0.2 + i * R * 0.2, vy = cy + R * 0.45; ctx.fillStyle = "rgba(120,200,255,0.4)"; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.arc(vx + Math.sin(tt * 0.05 + k + i) * 3, vy - k * R * 0.12, 2, 0, Math.PI * 2); ctx.fill(); } }
  // layer labels
  ctx.fillStyle = C.text; ctx.font = `10px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(t.layers[0], cx + R + 10, cy - R * 0.6);
  ctx.fillStyle = "#8fc0e8"; ctx.fillText(t.layers[1], cx + R + 10, cy);
  ctx.fillStyle = "#c9a882"; ctx.fillText(t.layers[2], cx + R + 10, cy + R * 0.6);
  // leader lines
  ctx.strokeStyle = "rgba(150,175,230,0.4)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(cx + R * 0.9, cy - R * 0.4); ctx.lineTo(cx + R + 6, cy - R * 0.6); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx + R * 0.7, cy - R * 0.1); ctx.lineTo(cx + R + 6, cy - 4); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx + R * 0.4, cy + R * 0.3); ctx.lineTo(cx + R + 6, cy + R * 0.6 - 4); ctx.stroke();
}

export function OceanWorlds() {
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
    if (reduceMotion) { draw(ctx, cw, H, 10, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 03</div>
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

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
          {t.ingredients.map((g, i) => (
            <span key={i} style={{ fontFamily: mono, fontSize: 12.5, color: C.good, border: `1px solid ${C.border}`, borderRadius: 8, padding: "4px 10px" }}>✓ {g}</span>
          ))}
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default OceanWorlds;
