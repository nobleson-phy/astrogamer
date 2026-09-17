/* ============================================================
   STATION 5 — BROWN DWARFS (L, T, Y)
   Below the coolest M stars lie objects too small to sustain ordinary
   hydrogen fusion: brown dwarfs. The spectral classes L, T, and Y were
   created for them. As they cool, molecules survive that hot stars would
   destroy — and in the coolest T and Y dwarfs (< ~1,300 K), methane
   (CH₄) and ammonia (NH₃) bands appear. Grounded in Ch.17 §17.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const TYPES = [
  { id: "M", col: "#ff9a52", temp: "~2,400–3,700 K", en: "Coolest true stars; titanium-oxide bands.", ja: "最も低温の本物の星；酸化チタンの帯。", star: true },
  { id: "L", col: "#e0603a", temp: "~1,300–2,400 K", en: "Metal hydrides and alkali metals; dusty clouds.", ja: "金属水素化物とアルカリ金属；塵の雲。", star: false },
  { id: "T", col: "#a83a5a", temp: "~500–1,300 K", en: "Methane (CH₄) bands appear — a cool-atmosphere marker.", ja: "メタン（CH₄）の帯が現れる——低温大気の目印。", star: false },
  { id: "Y", col: "#5a3a7a", temp: "< ~500 K", en: "Coolest of all; ammonia (NH₃) and water; near room temperature.", ja: "最も低温；アンモニア（NH₃）と水；ほぼ室温。", star: false },
];

const STR = {
  en: {
    title: "Brown dwarfs",
    kind: "Below the coolest stars",
    lede: "Step down past the M stars into the realm of the failed stars. As they cool, they turn from dull red to nearly infrared-only — and fragile molecules start to survive.",
    thread: "THE STORY CONTINUES",
    threadText: "Not every ball of gas becomes a star. Some are too light to fuse hydrogen and simply glow with leftover heat, fading over billions of years. We needed new letters for them.",
    key: "L, T, Y — AND MOLECULES THAT SURVIVE THE COLD",
    keyText: "Below spectral type M lie brown dwarfs: objects too low in mass to sustain ordinary hydrogen fusion. The classes L, T, and Y were created to classify them. Because they are so cool, molecules that intense stellar heat would tear apart can survive intact. In the coolest T and Y dwarfs (below about 1,300 K), bands of methane (CH₄) and ammonia (NH₃) appear in the spectrum — the same molecules seen in giant-planet atmospheres. Such molecular features never appear in hot O or B stars, whose heat dissociates any molecule.",
    tempL: "Temperature", note: "Brown dwarfs — classes L, T, Y — are too small to fuse hydrogen. Cool enough for molecules to survive, T and Y dwarfs show methane and ammonia bands never seen in hot stars.",
  },
  ja: {
    title: "褐色矮星",
    kind: "最も低温の星の下",
    lede: "M型星を越えて、失敗した星の領域へ降りよう。冷えるにつれ、鈍い赤からほぼ赤外線だけへと変わり——もろい分子が生き残り始めます。",
    thread: "物語はつづく",
    threadText: "すべてのガスの塊が星になるわけではありません。軽すぎて水素を融合できず、残り熱でただ光り、数十億年かけて暗くなるものもあります。それらには新しい文字が必要でした。",
    key: "L・T・Y——そして寒さを生き延びる分子",
    keyText: "分光型Mの下には褐色矮星があります：質量が低すぎて通常の水素融合を維持できない天体です。それらを分類するためにL・T・Yのクラスが作られました。非常に冷たいため、激しい恒星の熱なら引き裂く分子が無傷で生き残れます。最も低温のT型・Y型矮星（約1,300 K未満）では、メタン（CH₄）とアンモニア（NH₃）の帯がスペクトルに現れます——巨大惑星の大気で見られるのと同じ分子です。こうした分子の特徴は、あらゆる分子を解離させる高温のO型・B型星には決して現れません。",
    tempL: "温度", note: "褐色矮星——L・T・Y——は小さすぎて水素を融合できません。分子が生き残るほど冷たく、T型・Y型はメタンやアンモニアの帯を示します——高温の星には見られません。",
  },
};

function draw(ctx, cw, H, sel, lang) {
  const t = STR[lang];
  const idx = TYPES.findIndex((x) => x.id === sel);
  ctx.clearRect(0, 0, cw, H);
  // cooling sequence row of orbs at top
  const y = H * 0.3, n = TYPES.length;
  TYPES.forEach((tp, i) => {
    const x = cw * 0.18 + i * (cw * 0.64 / (n - 1));
    const r = 26 - i * 3;
    const on = i === idx;
    const glow = ctx.createRadialGradient(x, y, r * 0.4, x, y, r * 1.5); glow.addColorStop(0, tp.col); glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(x, y, r * 1.5, 0, Math.PI * 2); ctx.fill();
    const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.2, x, y, r); g.addColorStop(0, tp.star ? "#fff" : tp.col); g.addColorStop(1, "rgba(0,0,0,0.4)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    if (on) { ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, r + 3, 0, Math.PI * 2); ctx.stroke(); }
    ctx.fillStyle = on ? C.text : C.muted; ctx.font = `${on ? "700 " : ""}13px ${mono}`; ctx.textAlign = "center"; ctx.fillText(tp.id, x, y + r + 18);
  });
  // arrow "cooler ->"
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "left"; ctx.fillText(lang === "ja" ? "← 高温" : "← hotter", cw * 0.12, y - 34);
  ctx.textAlign = "right"; ctx.fillText(lang === "ja" ? "低温 →" : "cooler →", cw * 0.88, y - 34);
  // selected spectrum band with molecular features for T/Y
  const cls = TYPES[idx];
  const bx = 30, bw = cw - 60, by = H * 0.62, bh = 26;
  const grad = ctx.createLinearGradient(bx, 0, bx + bw, 0);
  grad.addColorStop(0, "#7a2a2a"); grad.addColorStop(0.6, "#c0603a"); grad.addColorStop(1, "#3a2a5a");
  ctx.fillStyle = grad; ctx.fillRect(bx, by, bw, bh);
  ctx.fillStyle = "rgba(10,8,14,0.6)";
  if (sel === "M") { [0.7, 0.78, 0.86].forEach((f) => ctx.fillRect(bx + f * bw, by, bw * 0.025, bh)); ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText("TiO", bx + 0.78 * bw, by - 4); }
  if (sel === "L") { [0.2, 0.5, 0.62].forEach((f) => ctx.fillRect(bx + f * bw, by, bw * 0.02, bh)); ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(lang === "ja" ? "金属水素化物" : "metal hydrides", bx + 0.4 * bw, by - 4); }
  if (sel === "T") { [0.3, 0.44, 0.66, 0.8].forEach((f) => ctx.fillRect(bx + f * bw, by, bw * 0.03, bh)); ctx.fillStyle = "#8fe0c0"; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText("CH₄ (methane)", bx + 0.55 * bw, by - 4); }
  if (sel === "Y") { [0.25, 0.4, 0.55, 0.7, 0.85].forEach((f) => ctx.fillRect(bx + f * bw, by, bw * 0.035, bh)); ctx.fillStyle = "#a9d0ff"; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText("NH₃ + H₂O", bx + 0.55 * bw, by - 4); }
  ctx.fillStyle = C.text; ctx.font = `11px ${mono}`; ctx.textAlign = "left"; ctx.fillText(`${cls.id} · ${cls.temp}`, bx, H - 10);
}

export function BrownDwarfs() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [sel, setSel] = useState("T");
  const cls = TYPES.find((x) => x.id === sel);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, sel, lang);
  }, [cw, sel, lang]);

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

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {TYPES.map((x) => (
            <button key={x.id} onClick={() => setSel(x.id)}
              style={{ ...styles.chip, ...(sel === x.id ? styles.chipOn : {}), borderColor: sel === x.id ? x.col : undefined, fontWeight: 700 }}>{x.id}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.5, marginTop: 8 }}>{lang === "ja" ? cls.ja : cls.en}</p>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default BrownDwarfs;
