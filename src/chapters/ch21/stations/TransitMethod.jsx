/* ============================================================
   STATION 5 — THE TRANSIT METHOD
   When a planet crosses in front of its star, it blocks a little light. The
   TRANSIT depth equals (R_planet / R_star)², so it gives the planet's SIZE.
   NASA's Kepler telescope watched 150,000+ stars this way to find thousands
   of planets. Combine a transit (size) with a Doppler measurement (mass) and
   you get the planet's average DENSITY — revealing whether it's rocky or
   gassy. Grounded in Ch.21 §21.4.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The transit method",
    kind: "A dip reveals a world",
    lede: "Watch a planet slide across its star and the brightness dip. The depth of that dip gives the planet's size — and with a mass, its density.",
    thread: "THE STORY CONTINUES",
    threadText: "If a planet's orbit lines up just right, it eclipses a sliver of its star each lap. That tiny, repeating dimming is the richest harvest in exoplanet science.",
    key: "TRANSIT DEPTH = (Rₚ / R★)² → SIZE; + MASS → DENSITY",
    keyText: "When a planet passes directly in front of its star (a TRANSIT), it blocks a small fraction of the light. That fraction — the transit depth — equals the square of the radius ratio, (R_planet / R_star)², so measuring it gives the planet's size relative to the star. NASA's Kepler Space Telescope (launched 2009) monitored over 150,000 stars this way and found thousands of transiting planets. Even better, if the same planet is also measured by the Doppler method (which gives its mass), combining size and mass yields the planet's average DENSITY — telling us whether it is a dense rocky world or a puffy gas giant.",
    size: "Planet size", depth: "transit depth", radius: "Rₚ / R★",
    kepler: "Kepler watched 150,000+ stars → thousands of planets",
    density: "transit (size) + Doppler (mass) → density",
    note: "A transit's depth = (Rₚ/R★)² gives the planet's size; Kepler found thousands this way. Adding a Doppler mass gives the density — rocky versus gassy.",
  },
  ja: {
    title: "トランジット法",
    kind: "減光が世界を明かす",
    lede: "惑星が星を横切り、明るさが落ち込む様子を見よう。その落ち込みの深さが惑星の大きさを——質量があれば密度を——与えます。",
    thread: "物語はつづく",
    threadText: "惑星の軌道がちょうど合うと、周回ごとに星のひとかけらを食します。その小さく繰り返す減光が、系外惑星科学で最も豊かな収穫です。",
    key: "トランジットの深さ ＝ (Rₚ / R★)² → 大きさ；＋質量 → 密度",
    keyText: "惑星が星の真正面を通る（トランジットする）とき、光のわずかな割合を遮ります。その割合——トランジットの深さ——は半径比の2乗、(惑星半径／星半径)²に等しいので、それを測ると星に対する惑星の大きさがわかります。NASAのケプラー宇宙望遠鏡（2009年打ち上げ）は、この方法で15万を超える星を監視し、数千のトランジット惑星を見つけました。さらに良いことに、同じ惑星がドップラー法（質量を与える）でも測られれば、大きさと質量を合わせて惑星の平均密度が得られます——密な岩石の世界か、膨らんだ巨大ガス惑星かを教えてくれます。",
    size: "惑星の大きさ", depth: "トランジットの深さ", radius: "Rₚ / R★",
    kepler: "ケプラーは15万超の星を監視 → 数千の惑星",
    density: "トランジット（大きさ）＋ドップラー（質量）→ 密度",
    note: "トランジットの深さ ＝ (Rₚ/R★)² が惑星の大きさを与え、ケプラーはこの方法で数千を発見。ドップラーの質量を加えると密度——岩石か気体か——がわかります。",
  },
};

function draw(ctx, cw, H, rp, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.28, cy = H * 0.34, Rstar = 40;
  const Rp = Rstar * rp; // rp = Rp/R*
  // star
  const g = ctx.createRadialGradient(cx - 10, cy - 10, 5, cx, cy, Rstar); g.addColorStop(0, "#fff6d8"); g.addColorStop(1, "#ffcf6b");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, Rstar, 0, Math.PI * 2); ctx.fill();
  // planet crossing
  const cyc = tt % 240, p = cyc / 240;
  const transiting = p > 0.25 && p < 0.75;
  const px = cx - Rstar - 20 + p * (2 * Rstar + 40);
  ctx.fillStyle = "#2a2f38"; ctx.beginPath(); ctx.arc(px, cy, Rp, 0, Math.PI * 2); ctx.fill();
  // light curve
  const gx0 = cw * 0.52, gx1 = cw - 16, gy = H * 0.72, gh = 40;
  ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.beginPath(); ctx.moveTo(gx0, gy - gh); ctx.lineTo(gx0, gy); ctx.lineTo(gx1, gy); ctx.stroke();
  const depth = rp * rp; // fraction blocked
  ctx.strokeStyle = "#ffcf6b"; ctx.lineWidth = 2; ctx.beginPath();
  for (let x = 0; x <= 100; x++) { const ph = x / 100; const inT = ph > 0.25 && ph < 0.75; const y = gy - gh + (inT ? depth * gh : 0); const xx = gx0 + ph * (gx1 - gx0); if (x === 0) ctx.moveTo(xx, y); else ctx.lineTo(xx, y); }
  ctx.stroke();
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "left"; ctx.fillText(lang === "ja" ? "明るさ" : "brightness", gx0, gy - gh - 6);
  // readouts
  ctx.fillStyle = C.text; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(`${t.depth} = (${rp.toFixed(2)})² = ${(depth * 100).toFixed(1)}%`, cw / 2, H - 26);
  ctx.fillStyle = C.cool; ctx.font = `9px ${mono}`; ctx.fillText(t.density, cw / 2, H - 10);
}

export function TransitMethod() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [rp, setRp] = useState(0.1);
  const rpRef = useRef(0.1); rpRef.current = rp;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, rpRef.current, 120, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, rpRef.current, tt, lang); raf = requestAnimationFrame(loop); };
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

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.size} ({t.radius})</span>
          <input type="range" min="0.03" max="0.3" step="0.01" value={rp}
            onChange={(e) => setRp(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
          <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, width: 40, textAlign: "right" }}>{rp.toFixed(2)}</span>
        </div>

        <div style={{ marginTop: 4 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <div style={{ fontFamily: mono, fontSize: 11.5, color: C.cool, marginTop: 8 }}>{t.kepler}</div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default TransitMethod;
