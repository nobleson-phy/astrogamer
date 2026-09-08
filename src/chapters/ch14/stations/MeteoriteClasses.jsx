/* ============================================================
   STATION 5 — THREE KINDS OF METEORITE
   Meteorites fall into three broad classes: STONES (silicate rock),
   IRONS (nearly pure metallic nickel-iron, the cores of shattered
   differentiated bodies), and STONY-IRONS (a mix). Among witnessed
   falls, primitive STONES are by far the most common — about 88%.
   Grounded in Ch.14 §14.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const CLASSES = [
  { id: "stone", en: "Stones", ja: "石質", pct: 94, falls: 88,
    en_d: "Silicate rock. Primitive stones are unmelted samples of the early solar nebula and are by far the most common witnessed falls (~88%).",
    ja_d: "ケイ酸塩の岩石。始原的な石質は初期太陽系星雲の溶けていないサンプルで、目撃された落下では圧倒的に多い（約88%）。" },
  { id: "iron", en: "Irons", ja: "鉄質", pct: 5, falls: 6,
    en_d: "Nearly pure metallic nickel-iron — the exposed cores of larger bodies that once melted and differentiated, then shattered.",
    ja_d: "ほぼ純粋な金属のニッケル鉄——かつて溶けて分化し、その後砕けた大きな天体の露出した核。" },
  { id: "stonyiron", en: "Stony-irons", ja: "石鉄", pct: 1, falls: 6,
    en_d: "A blend of silicate rock and metal — samples from the boundary between a differentiated body's rocky mantle and its metal core.",
    ja_d: "ケイ酸塩の岩石と金属の混合——分化した天体の岩石のマントルと金属の核の境界からのサンプル。" },
];

const STR = {
  en: {
    title: "Three kinds of meteorite",
    kind: "Stone, iron, and in-between",
    lede: "Cut one open. Meteorites come in three broad kinds — pick each to see what's inside, and how often it actually falls.",
    thread: "THE STORY CONTINUES",
    threadText: "Every meteorite is a hand-delivered sample of another world. Their three types tell us whether their parent body ever melted and separated into layers — or stayed pristine.",
    key: "STONES DOMINATE — IRONS ARE PURE NICKEL-IRON",
    keyText: "Meteorites are grouped into three broad classes. STONES are silicate rock; the primitive ones are unmelted leftovers of the solar nebula. IRONS are composed of nearly pure metallic nickel-iron — the cores of larger bodies that once melted, differentiated into layers, and were later shattered. STONY-IRONS are a mixture of the two. Among witnessed falls, primitive stones are by far the most common, accounting for about 88% of occurrences (irons look distinctive and survive well, so they are over-represented among finds).",
    fallsL: "Share of witnessed falls",
    note: "Stones (silicate rock) make up ~88% of witnessed falls; irons are nearly pure nickel-iron from shattered cores; stony-irons blend both. The type reveals whether the parent body ever melted.",
  },
  ja: {
    title: "3種類の隕石",
    kind: "石質・鉄質・その中間",
    lede: "切り開いてみよう。隕石には大きく3種類あります——それぞれを選んで中身と、実際の落下頻度を見よう。",
    thread: "物語はつづく",
    threadText: "どの隕石も、別の世界から手渡されたサンプルです。3つのタイプは、母天体がかつて溶けて層に分かれたのか——それとも手つかずのままだったのかを教えてくれます。",
    key: "石質が圧倒的——鉄質は純粋なニッケル鉄",
    keyText: "隕石は大きく3つのクラスに分けられます。石質はケイ酸塩の岩石で、始原的なものは太陽系星雲の溶けていない残りものです。鉄質はほぼ純粋な金属のニッケル鉄でできています——かつて溶けて層に分化し、後に砕けた大きな天体の核です。石鉄はこの2つの混合です。目撃された落下では、始原的な石質が圧倒的に多く、約88%を占めます（鉄質は見分けやすく残りやすいので、発見物では過大に表れます）。",
    fallsL: "目撃された落下に占める割合",
    note: "石質（ケイ酸塩の岩石）が目撃された落下の約88%。鉄質は砕けた核由来のほぼ純粋なニッケル鉄、石鉄は両者の混合。タイプは母天体が溶けたかどうかを明かします。",
  },
};

function draw(ctx, cw, H, cls, lang) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.32, cy = H / 2, R = Math.min(cw * 0.2, H * 0.36);
  // cross-section sphere by class
  if (cls.id === "stone") {
    const g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.2, cx, cy, R);
    g.addColorStop(0, "#9a8f7c"); g.addColorStop(1, "#5f5749");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
    // chondrule speckles
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip();
    for (let i = 0; i < 40; i++) { const a = (i * 2.4), rr = ((i * 37) % 100) / 100 * R; ctx.fillStyle = i % 3 ? "rgba(200,190,170,0.5)" : "rgba(120,105,85,0.6)"; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, 2 + (i % 3), 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();
  } else if (cls.id === "iron") {
    const g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.2, cx, cy, R);
    g.addColorStop(0, "#d8d5cf"); g.addColorStop(1, "#8a8680");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
    // Widmanstätten crosshatch pattern
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip();
    ctx.strokeStyle = "rgba(90,86,80,0.5)"; ctx.lineWidth = 1;
    for (let i = -R; i < R; i += 7) { ctx.beginPath(); ctx.moveTo(cx - R, cy + i); ctx.lineTo(cx + R, cy + i - R); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx - R, cy + i); ctx.lineTo(cx + R, cy + i + R); ctx.stroke(); }
    ctx.restore();
    ctx.fillStyle = "rgba(220,218,212,0.9)"; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText("Ni-Fe metal", cx, cy + R + 16);
  } else {
    // stony-iron: half metal, half rock
    const g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.2, cx, cy, R);
    g.addColorStop(0, "#cfc9be"); g.addColorStop(1, "#7a7266");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip();
    // olivine crystals embedded in metal
    for (let i = 0; i < 26; i++) { const a = i * 1.7, rr = ((i * 29) % 100) / 100 * R; ctx.fillStyle = "rgba(140,180,110,0.7)"; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, 3, 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();
  }
  // fusion crust rim
  ctx.strokeStyle = "rgba(20,16,12,0.6)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = C.text; ctx.font = `700 13px ${mono}`; ctx.textAlign = "center"; ctx.fillText(lang === "ja" ? cls.ja : cls.en, cx, cy - R - 10);

  // "share of falls" bar chart on the right
  const bx = cw * 0.6, bw = cw * 0.34, by = H * 0.24, bh = 18, gap = 26;
  ctx.textAlign = "left"; ctx.font = `10px ${mono}`;
  CLASSES.forEach((c, i) => {
    const y = by + i * gap;
    const on = c.id === cls.id;
    ctx.fillStyle = "rgba(120,150,210,0.15)"; ctx.fillRect(bx, y, bw, bh);
    ctx.fillStyle = c.id === "stone" ? "#b0a488" : c.id === "iron" ? "#c8c4bc" : "#a8b48a";
    ctx.globalAlpha = on ? 1 : 0.55; ctx.fillRect(bx, y, bw * c.falls / 100, bh); ctx.globalAlpha = 1;
    ctx.fillStyle = on ? C.text : C.muted; ctx.fillText(`${lang === "ja" ? c.ja : c.en}  ${c.falls}%`, bx, y - 3);
  });
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.fillText(STR[lang].fallsL, bx, by - 18);
}

export function MeteoriteClasses() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [sel, setSel] = useState("stone");
  const cls = CLASSES.find((x) => x.id === sel);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, cls, lang);
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
          {CLASSES.map((x) => (
            <button key={x.id} onClick={() => setSel(x.id)}
              style={{ ...styles.chip, ...(sel === x.id ? styles.chipOn : {}) }}>{lang === "ja" ? x.ja : x.en}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.5, marginTop: 8 }}>{lang === "ja" ? cls.ja_d : cls.en_d}</p>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default MeteoriteClasses;
