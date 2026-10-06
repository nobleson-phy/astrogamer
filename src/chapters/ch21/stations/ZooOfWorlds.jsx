/* ============================================================
   STATION 7 — A ZOO OF WORLDS
   Exoplanets come in kinds our solar system lacks. SUPER-EARTHS have radii
   1.4-2.8 times Earth's — bigger than Earth, smaller than Neptune — and are
   extremely common elsewhere. Kepler also found COMPACT multi-planet systems
   like Kepler-62 and Kepler-444, with several planets packed well inside the
   equivalent of Mercury's orbit. Kepler-444 is ~11 billion years old, showing
   planet formation began very early in Galactic history. Grounded in Ch.21 §21.4.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "A zoo of worlds",
    kind: "Sizes and systems unlike ours",
    lede: "Line up the planet sizes and meet the super-Earth, a class we don't have. Then visit a compact system that packs worlds tighter than Mercury's orbit.",
    thread: "THE STORY CONTINUES",
    threadText: "Our solar system turned out to be just one arrangement among many. Other systems come in sizes and layouts that simply have no counterpart at home.",
    typeKey: "SUPER-EARTHS — A MISSING CLASS AT HOME",
    typeText: "Kepler revealed that planets fill a continuous range of sizes. A very common class absent from our own solar system is the SUPER-EARTH, with a radius between about 1.4 and 2.8 times Earth's — larger than Earth but smaller than Neptune. Their abundance around other stars was one of the big surprises of the exoplanet era.",
    compactKey: "COMPACT & ANCIENT SYSTEMS",
    compactText: "Many systems are far more tightly packed than ours. Compact multi-planet systems like Kepler-62 and Kepler-444 squeeze several planets into orbits well inside the equivalent of Mercury's orbit around the Sun. Kepler-444 is also remarkably old — about 11 billion years — which means its planets formed when the Milky Way was only about 2 billion years old and heavy elements were far scarcer, showing that planet formation turned on very early in cosmic history.",
    types: "Planet sizes", compact: "Compact systems",
    earth: "Earth", superearth: "super-Earth (1.4–2.8 R⊕)", neptune: "Neptune", jupiter: "Jupiter",
    mercury: "Mercury's orbit (for scale)", k444: "Kepler-444 · ~11 billion yr old",
    noteT: "Super-Earths (1.4–2.8 Earth radii) are common around other stars but absent from our solar system — a whole class we lack.",
    noteC: "Compact systems like Kepler-62 and Kepler-444 pack several planets inside Mercury's orbit; 11-billion-year-old Kepler-444 shows planets formed very early in Galactic history.",
  },
  ja: {
    title: "世界の動物園",
    kind: "私たちと違う大きさと系",
    lede: "惑星の大きさを並べて、私たちにはないスーパーアースに出会おう。それから、水星の軌道より密に世界を詰めた密集系を訪ねよう。",
    thread: "物語はつづく",
    threadText: "私たちの太陽系は、多くの配置の一つにすぎないと分かりました。他の系には、故郷に対応物のない大きさや配置があります。",
    typeKey: "スーパーアース——我が家にない分類",
    typeText: "ケプラーは、惑星が連続した大きさの範囲を埋めることを明らかにしました。私たち自身の太陽系にない非常に一般的な分類がスーパーアースで、半径は地球の約1.4〜2.8倍——地球より大きくネプチューンより小さい。他の星でのその豊富さは、系外惑星時代の大きな驚きの一つでした。",
    compactKey: "密集した、そして古代の系",
    compactText: "多くの系は私たちよりはるかに密集しています。ケプラー62やケプラー444のような密集多重惑星系は、太陽のまわりの水星の軌道に相当するはるか内側に、複数の惑星を押し込みます。ケプラー444は著しく古くもあり——約110億年——その惑星は天の川がわずか約20億歳で重元素がはるかに乏しかった頃に形成されたことを意味します。惑星形成が宇宙史の非常に早い時期に始まったことを示しています。",
    types: "惑星の大きさ", compact: "密集系",
    earth: "地球", superearth: "スーパーアース（1.4〜2.8 R⊕）", neptune: "ネプチューン", jupiter: "木星",
    mercury: "水星の軌道（比較用）", k444: "ケプラー444 · 約110億歳",
    noteT: "スーパーアース（地球半径の1.4〜2.8倍）は他の星では一般的ですが太陽系にはありません——私たちに欠けた丸ごと一つの分類です。",
    noteC: "ケプラー62や444のような密集系は水星の軌道の内側に複数の惑星を詰め込みます。110億歳のケプラー444は、惑星が銀河史の非常に早い時期に形成されたことを示します。",
  },
};

function drawTypes(ctx, cw, H, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cy = H * 0.44;
  const planets = [
    { r: 10, col: "#5b8fd8", label: t.earth, hl: false },
    { r: 18, col: "#8fc0a0", label: t.superearth, hl: true },
    { r: 26, col: "#6fb0d8", label: t.neptune, hl: false },
    { r: 40, col: "#e0b878", label: t.jupiter, hl: false },
  ];
  let x = 50;
  planets.forEach((p) => {
    x += p.r + 14;
    const g = ctx.createRadialGradient(x - p.r * 0.3, cy - p.r * 0.3, p.r * 0.2, x, cy, p.r); g.addColorStop(0, p.col); g.addColorStop(1, "rgba(0,0,0,0.4)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, cy, p.r, 0, Math.PI * 2); ctx.fill();
    if (p.hl) { ctx.strokeStyle = "#8fe0a0"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, cy, p.r + 3, 0, Math.PI * 2); ctx.stroke(); }
    ctx.fillStyle = p.hl ? "#8fe0a0" : C.muted; ctx.font = `${p.hl ? "700 " : ""}9px ${mono}`; ctx.textAlign = "center";
    ctx.save(); ctx.translate(x, cy + p.r + 12); ctx.rotate(0.25); ctx.fillText(p.label, 0, 0); ctx.restore();
    x += p.r + 14;
  });
}

function drawCompact(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.3, cy = H * 0.44;
  ctx.fillStyle = "#ffd86b"; ctx.beginPath(); ctx.arc(cx, cy, 10, 0, Math.PI * 2); ctx.fill();
  // Mercury's-orbit reference ring (for scale)
  const mercR = Math.min(cw * 0.5, 230);
  ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.ellipse(cx, cy, mercR, mercR * 0.5, 0, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.mercury, cx + mercR * 0.7, cy - mercR * 0.5 - 6);
  // 5 compact planets all inside the Mercury ring
  const cols = ["#8fc0a0", "#6fb0d8", "#e0b878", "#c88a5a", "#9aa0ac"];
  for (let i = 0; i < 5; i++) {
    const rr = 26 + i * (mercR * 0.75 - 26) / 5;
    const a = tt * (0.02 - i * 0.002) + i * 1.2;
    ctx.strokeStyle = "rgba(255,207,107,0.15)"; ctx.beginPath(); ctx.ellipse(cx, cy, rr, rr * 0.5, 0, 0, Math.PI * 2); ctx.stroke();
    const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr * 0.5;
    ctx.fillStyle = cols[i]; ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
  }
  ctx.fillStyle = C.sun; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.k444, cw / 2, H - 10);
}

export function ZooOfWorlds() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("types");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (mode === "types") { drawTypes(ctx, cw, H, lang); return; }
    if (reduceMotion) { drawCompact(ctx, cw, H, 40, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; drawCompact(ctx, cw, H, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, mode, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 07</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{t.threadText}</p>
        </div>
        <div style={styles.fateBox}>
          <div style={{ ...styles.fateLabel, color: C.sun }}>{mode === "types" ? t.typeKey : t.compactKey}</div>
          <p style={styles.keyTermText}>{mode === "types" ? t.typeText : t.compactText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          {[["types", t.types], ["compact", t.compact]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{mode === "types" ? t.noteT : t.noteC}</p>
      </div>
    </div>
  );
}

export default ZooOfWorlds;
