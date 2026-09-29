/* ============================================================
   STATION 8 — MAPPING THE UNIVERSE
   Standard candles remade our cosmic maps. Harlow Shapley used RR Lyrae
   stars in globular clusters as standard candles, mapped the clusters'
   3-D distribution, and found the Galaxy's center lies far off in
   Sagittarius — the Sun is nowhere near the middle. Then Edwin Hubble
   found a Cepheid in the Andromeda "Nebula" (1923); its period-luminosity
   distance of ~1 million light-years proved M31 is a separate galaxy — an
   "island universe" — settling the Great Debate. Grounded in Ch.19 §19.3-19.4.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Mapping the universe",
    kind: "Shapley's galaxy, Hubble's island",
    lede: "Two astronomers turned pulsating stars into cosmic yardsticks. Switch views: Shapley finding the Sun off-center, and Hubble proving Andromeda is a galaxy of its own.",
    thread: "THE STORY ENDS HERE",
    threadText: "With standard candles in hand, astronomers stepped from mapping the neighborhood to weighing the whole Galaxy — and then discovering that ours is just one of countless galaxies.",
    shapleyKey: "SHAPLEY — THE SUN IS NOT AT THE CENTER",
    shapleyText: "Harlow Shapley treated RR Lyrae stars as standard candles to measure the distances of globular clusters, then mapped their 3-D distribution. The clusters are not centered on the Sun — they swarm around a point far off in the direction of Sagittarius. Shapley concluded that the center of the Milky Way lies tens of thousands of light-years away and that the Sun sits far out toward the edge, not at the center.",
    hubbleKey: "HUBBLE — ANDROMEDA IS AN ISLAND UNIVERSE",
    hubbleText: "In 1923 Edwin Hubble found a Cepheid variable in the Andromeda 'Nebula' (M31). Applying Leavitt's period-luminosity relation, he calculated its distance at nearly a million light-years — far beyond the Milky Way. This proved that the spiral 'nebulae' are separate galaxies, 'island universes' in their own right, resolving the Great Debate about their nature.",
    shapley: "Shapley (Milky Way)", hubble: "Hubble (Andromeda)",
    sun: "Sun (off-center)", gc: "Galactic center (Sagittarius)", clusters: "globular clusters (RR Lyrae)",
    mw: "Milky Way", m31: "Andromeda (M31)", ceph: "Cepheid → ~1 million ly", island: "separate galaxy = island universe",
    noteSh: "Shapley used RR Lyrae standard candles to map globular clusters, revealing the Galaxy's center is far off in Sagittarius and the Sun sits off-center.",
    noteHu: "Hubble's Cepheid put Andromeda ~1 million ly away — far outside the Milky Way — proving spiral nebulae are separate galaxies and settling the Great Debate.",
  },
  ja: {
    title: "宇宙を地図化する",
    kind: "シャプレーの銀河、ハッブルの島",
    lede: "2人の天文学者が脈動する星を宇宙のものさしに変えました。表示を切り替えよう：太陽が中心から外れているとするシャプレーと、アンドロメダが独立した銀河だと証明するハッブル。",
    thread: "物語はここで終わる",
    threadText: "標準光源を手に、天文学者は近所の地図化から銀河全体を測ることへ進み——そして私たちの銀河が無数の銀河の一つにすぎないことを発見しました。",
    shapleyKey: "シャプレー——太陽は中心にない",
    shapleyText: "ハーロー・シャプレーはRRライリ型星を標準光源として球状星団の距離を測り、その3次元分布を地図化しました。星団は太陽を中心にしていません——いて座の方向のはるか彼方の一点のまわりに群がっています。シャプレーは、天の川の中心が数万光年の彼方にあり、太陽は中心ではなく縁の方に遠く位置すると結論しました。",
    hubbleKey: "ハッブル——アンドロメダは島宇宙",
    hubbleText: "1923年、エドウィン・ハッブルはアンドロメダ「星雲」（M31）にケフェイド変光星を見つけました。リービットの周期光度関係を当てはめ、その距離を約100万光年——天の川のはるか外——と算出しました。これは渦巻「星雲」が別々の銀河、それ自体が「島宇宙」であることを証明し、その正体をめぐる大論争に決着をつけました。",
    shapley: "シャプレー（天の川）", hubble: "ハッブル（アンドロメダ）",
    sun: "太陽（中心外）", gc: "銀河中心（いて座）", clusters: "球状星団（RRライリ）",
    mw: "天の川", m31: "アンドロメダ（M31）", ceph: "ケフェイド → 約100万光年", island: "別の銀河＝島宇宙",
    noteSh: "シャプレーはRRライリの標準光源で球状星団を地図化し、銀河中心がいて座のはるか彼方にあり太陽が中心から外れていることを明らかにしました。",
    noteHu: "ハッブルのケフェイドはアンドロメダを約100万光年——天の川のはるか外——に置き、渦巻星雲が別の銀河であると証明して大論争に決着をつけました。",
  },
};

function drawShapley(ctx, cw, H, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // Galactic center offset from Sun
  const gcx = cw * 0.42, gcy = H * 0.44;
  // disk
  ctx.fillStyle = "rgba(150,170,220,0.1)"; ctx.beginPath(); ctx.ellipse(gcx, gcy, Math.min(cw * 0.34, 180), Math.min(H * 0.3, 70), 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffd86b"; ctx.beginPath(); ctx.arc(gcx, gcy, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffd86b"; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.gc, gcx, gcy - 12);
  // globular clusters swarming around GC
  for (let i = 0; i < 30; i++) { const a = i * 2.4, r = 30 + (i * 13 % 100) / 100 * Math.min(cw * 0.32, 150); const x = gcx + Math.cos(a) * r, y = gcy + Math.sin(a) * r * 0.6; ctx.fillStyle = "rgba(255,200,150,0.7)"; ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill(); }
  // Sun off to the side
  const sx = cw * 0.72, sy = gcy + 10;
  ctx.fillStyle = "#8fc0e8"; ctx.beginPath(); ctx.arc(sx, sy, 5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#8fc0e8"; ctx.fillText(t.sun, sx, sy + 18);
  ctx.strokeStyle = "rgba(143,192,232,0.4)"; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(gcx, gcy); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = C.cool; ctx.font = `9px ${mono}`; ctx.fillText(t.clusters, cw / 2, H - 10);
}

function drawHubble(ctx, cw, H, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // Milky Way (left) and Andromeda (right), far apart
  const mwx = cw * 0.22, my = H * 0.44;
  ctx.fillStyle = "rgba(150,170,220,0.15)"; ctx.beginPath(); ctx.ellipse(mwx, my, 42, 16, -0.3, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#8fc0e8"; ctx.beginPath(); ctx.arc(mwx, my, 3, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.mw, mwx, my + 28);
  const m31x = cw * 0.78;
  ctx.fillStyle = "rgba(200,180,160,0.2)"; ctx.beginPath(); ctx.ellipse(m31x, my, 50, 20, 0.3, 0, Math.PI * 2); ctx.fill();
  for (let i = 0; i < 30; i++) { const a = i * 2.4, r = (i % 12) / 12 * 48; ctx.fillStyle = "rgba(255,235,200,0.5)"; ctx.beginPath(); ctx.arc(m31x + Math.cos(a) * r, my + Math.sin(a) * r * 0.4, 1.4, 0, Math.PI * 2); ctx.fill(); }
  // the Cepheid in M31
  ctx.fillStyle = "#ffd86b"; ctx.beginPath(); ctx.arc(m31x + 14, my - 8, 4, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "#ffd86b"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(m31x + 14, my - 8, 7, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = "#ffd86b"; ctx.fillText(t.ceph, m31x, my - 30);
  ctx.fillStyle = C.text; ctx.fillText(t.m31, m31x, my + 34);
  // distance arrow
  ctx.strokeStyle = "rgba(255,207,107,0.6)"; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(mwx + 44, my); ctx.lineTo(m31x - 52, my); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = C.sun; ctx.font = `10px ${mono}`; ctx.fillText(t.island, cw / 2, H - 10);
}

export function MappingBeyond() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 240;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("shapley");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    (mode === "shapley" ? drawShapley : drawHubble)(ctx, cw, H, lang);
  }, [cw, mode, lang]);

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
          <div style={{ ...styles.fateLabel, color: C.sun }}>{mode === "shapley" ? t.shapleyKey : t.hubbleKey}</div>
          <p style={styles.keyTermText}>{mode === "shapley" ? t.shapleyText : t.hubbleText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          {[["shapley", t.shapley], ["hubble", t.hubble]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{mode === "shapley" ? t.noteSh : t.noteHu}</p>
      </div>
    </div>
  );
}

export default MappingBeyond;
