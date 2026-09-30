/* ============================================================
   STATION 5 — MOLECULAR CLOUDS
   The densest, coldest parts of the ISM are giant molecular clouds (~10 K).
   Their dense gas and dust shield the interior from ambient UV starlight,
   so the inside stays frigid. Cold molecular hydrogen (H₂) barely radiates,
   so astronomers trace these clouds using carbon monoxide (CO), which emits
   readily. On the surfaces of dust grains, cold atoms cling, meet and bond
   into complex molecules — grains act as chemistry "catalysts."
   Grounded in Ch.20 §20.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Molecular clouds",
    kind: "Cold, shielded, and chemical",
    lede: "Step into the coldest place in the Galaxy. See why molecular clouds stay near 10 K, how we find them with CO, and how their dust grains build molecules.",
    thread: "THE STORY CONTINUES",
    threadText: "The birthplaces of stars are dark, frigid and dense — and, surprisingly, chemically rich. In these clouds, simple atoms are assembled into the molecules of life's chemistry.",
    coldKey: "SHIELDED FROM STARLIGHT, SO ~10 K",
    coldText: "Giant molecular clouds are the coldest parts of the interstellar medium, around 10 K. Their high density of gas and dust blocks the ambient ultraviolet starlight that would otherwise heat them, so the shielded interior stays extremely cold. Because cold molecular hydrogen (H₂) emits almost no detectable radiation, astronomers instead trace molecular clouds using carbon monoxide (CO), which radiates readily even at these low temperatures.",
    grainKey: "DUST GRAINS AS CHEMISTRY CATALYSTS",
    grainText: "The clouds are chemically active thanks to dust. On the cold solid surface of a dust grain, drifting gas atoms can stick, wander, meet other atoms, and bond into more complex molecules — while the grain shields those fragile new molecules from destructive UV. In this way dust grains act as catalysts, building up water, ammonia, formaldehyde and other organic molecules.",
    cold: "Cold & shielded", grain: "Grain chemistry",
    shield: "dense dust blocks UV → interior ~10 K", co: "trace with CO (H₂ won't radiate)",
    surface: "atoms stick, meet & bond on grain surfaces → complex molecules",
    noteC: "Dense gas and dust shield a molecular cloud's interior from UV, keeping it near 10 K; since cold H₂ barely radiates, CO is used to trace the clouds.",
    noteG: "Dust grains are chemistry catalysts: cold atoms stick to their surfaces, meet and bond into complex molecules, shielded from destructive UV.",
  },
  ja: {
    title: "分子雲",
    kind: "冷たく、守られ、化学的",
    lede: "銀河で最も冷たい場所へ入ろう。分子雲が約10 Kに保たれる理由、COでどう見つけるか、そして塵の粒がどう分子を作るかを見よう。",
    thread: "物語はつづく",
    threadText: "星の生まれる場所は暗く、極寒で、密です——そして驚くことに化学的に豊かです。これらの雲では、単純な原子が生命の化学の分子へ組み立てられます。",
    coldKey: "星の光から守られ、約10 K",
    coldText: "巨大分子雲は星間物質で最も冷たい部分で、約10 Kです。その高密度のガスと塵が、さもなければ熱するはずの周囲の紫外の星の光を遮るので、守られた内部は極めて冷たいままです。冷たい分子状水素（H₂）はほとんど検出できる放射を出さないので、天文学者は代わりに、これほど低温でもよく放射する一酸化炭素（CO）で分子雲を追います。",
    grainKey: "化学触媒としての塵の粒",
    grainText: "雲が化学的に活発なのは塵のおかげです。塵の粒の冷たい固体表面で、漂うガス原子が付着し、さまよい、他の原子と出会い、より複雑な分子に結合します——その間、粒はもろい新しい分子を破壊的な紫外線から守ります。こうして塵の粒は触媒として働き、水・アンモニア・ホルムアルデヒドなどの有機分子を作り上げます。",
    cold: "冷たく守られる", grain: "粒の化学",
    shield: "密な塵が紫外線を遮る → 内部 約10 K", co: "COで追う（H₂は放射しない）",
    surface: "原子が粒の表面で付着・出会い・結合 → 複雑な分子",
    noteC: "密なガスと塵が分子雲の内部を紫外線から守り、約10 Kに保ちます。冷たいH₂はほとんど放射しないので、COで雲を追います。",
    noteG: "塵の粒は化学触媒です：冷たい原子が表面に付着し、出会って複雑な分子に結合し、破壊的な紫外線から守られます。",
  },
};

function drawCold(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H * 0.42, R = Math.min(cw * 0.3, H * 0.42);
  // cloud
  ctx.fillStyle = "rgba(60,50,70,0.5)"; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
  for (let i = 0; i < 40; i++) { ctx.fillStyle = "rgba(40,34,50,0.6)"; ctx.beginPath(); ctx.arc(cx + (Math.random() - 0.5) * 2 * R * 0.9, cy + (Math.random() - 0.5) * 2 * R * 0.9, 2, 0, Math.PI * 2); ctx.fill(); }
  // UV arrows from outside hitting the edge and stopping
  ctx.strokeStyle = "rgba(200,150,255,0.6)"; ctx.lineWidth = 1.5;
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) { const ox = cx + Math.cos(a) * (R + 30), oy = cy + Math.sin(a) * (R + 30); const ix = cx + Math.cos(a) * (R + 4), iy = cy + Math.sin(a) * (R + 4); ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ix, iy); ctx.stroke(); ctx.fillStyle = "rgba(200,150,255,0.7)"; ctx.fillText("✕", ix, iy); }
  ctx.fillStyle = "#a9d0ff"; ctx.font = `700 14px ${mono}`; ctx.textAlign = "center"; ctx.fillText("~10 K", cx, cy - 4);
  // CO tracer label
  ctx.fillStyle = "#8fe0a0"; ctx.font = `9px ${mono}`; ctx.fillText("CO", cx + R * 0.5, cy + R * 0.3);
  ctx.fillStyle = "rgba(200,150,255,0.9)"; ctx.font = `9px ${mono}`; ctx.fillText(t.shield, cx, H - 26);
  ctx.fillStyle = "#8fe0a0"; ctx.fillText(t.co, cx, H - 10);
}

function drawGrain(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H * 0.44, R = Math.min(cw * 0.2, H * 0.34);
  // grain surface
  ctx.fillStyle = "#5a5048"; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "rgba(200,225,245,0.3)"; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
  // atoms drifting to the surface and bonding
  const atoms = [["H", "#8fc0e8"], ["O", "#e0774f"], ["H", "#8fc0e8"], ["C", "#a0c090"], ["N", "#c0a0e0"]];
  atoms.forEach(([el, col], i) => {
    const a = i * 1.3 + tt * 0.01;
    const settle = (Math.sin(tt * 0.02 + i) + 1) / 2; // 0 far .. 1 on surface
    const r = R + 30 - settle * 30;
    const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
    ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#0a0c14"; ctx.font = `8px ${mono}`; ctx.textAlign = "center"; ctx.fillText(el, x, y + 3);
  });
  // a formed molecule (H2O) sitting on the surface
  ctx.fillStyle = "#e0774f"; ctx.beginPath(); ctx.arc(cx, cy - R + 6, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#8fc0e8"; ctx.beginPath(); ctx.arc(cx - 8, cy - R + 12, 4, 0, Math.PI * 2); ctx.arc(cx + 8, cy - R + 12, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#8fe0a0"; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText("H₂O", cx, cy - R - 6);
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.fillText(t.surface, cx, H - 10);
}

export function MolecularClouds() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("cold");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { (mode === "cold" ? drawCold : drawGrain)(ctx, cw, H, 30, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; (mode === "cold" ? drawCold : drawGrain)(ctx, cw, H, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, mode, lang]);

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
          <div style={{ ...styles.fateLabel, color: C.sun }}>{mode === "cold" ? t.coldKey : t.grainKey}</div>
          <p style={styles.keyTermText}>{mode === "cold" ? t.coldText : t.grainText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          {[["cold", t.cold], ["grain", t.grain]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{mode === "cold" ? t.noteC : t.noteG}</p>
      </div>
    </div>
  );
}

export default MolecularClouds;
