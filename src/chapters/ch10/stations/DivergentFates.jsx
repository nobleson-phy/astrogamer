/* ============================================================
   STATION 8 — TWO DIVERGENT FATES
   Three sister worlds, three destinies. Venus ran away hot (runaway
   greenhouse → 730 K). Earth stayed in balance. Mars ran away cold:
   being small with low gravity, it could not hold its atmosphere;
   as gas escaped, the greenhouse weakened, temperatures fell, water
   froze out — a "runaway refrigerator". Grounded in Ch.10 §10.5.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const WORLDS = {
  venus: { en: "Venus", ja: "金星", temp: "730 K", col: "#e8a24a",
    en_t: "Too close to the Sun. A runaway greenhouse boiled away its water and flooded the air with CO₂, driving the surface to a lead-melting 730 K.", ja_t: "太陽に近すぎた。暴走温室効果が水を煮沸させCO₂を大気にあふれさせ、地表を鉛を溶かす730 Kへ追い込んだ。" },
  earth: { en: "Earth", ja: "地球", temp: "288 K", col: "#5b8dee",
    en_t: "The balance point. Oceans dissolve CO₂ into rock and recycle it — a working thermostat — keeping a mild ~288 K where liquid water, and life, endure.", ja_t: "均衡点。海がCO₂を岩に溶かし込み循環させる——働くサーモスタット——が穏やかな約288 Kを保ち、液体の水と生命が続く。" },
  mars: { en: "Mars", ja: "火星", temp: "210 K", col: "#c86a3a",
    en_t: "Too small. Low gravity let its atmosphere leak into space; as gas escaped, the greenhouse weakened, the surface cooled, and water froze out — a 'runaway refrigerator' down to ~210 K.", ja_t: "小さすぎた。低重力で大気が宇宙へ漏れ、ガスが逃げるほど温室効果が弱まり地表が冷え、水は凍りついた——約210 Kへの「暴走冷蔵庫」。" },
};

const STR = {
  en: {
    title: "Two divergent fates",
    kind: "Why three sisters ended so differently",
    lede: "Venus, Earth, and Mars began as siblings — rocky, similar, close together. Compare their fates, and see how a planet's distance and its size decided everything.",
    thread: "THE STORY ENDS — FOR NOW",
    threadText: "Set the three side by side and a lesson emerges. A world's climate is not fixed by its rocks alone but balanced on a knife-edge of distance and size — tip too far either way, and it runs away.",
    key: "ONE RAN HOT, ONE RAN COLD, ONE STAYED",
    keyText: "Venus, Earth and Mars formed as rocky siblings, yet took opposite paths. Venus, closest to the Sun, suffered a RUNAWAY GREENHOUSE — evaporating oceans and unchecked CO₂ pushed it to 730 K. Earth, at the right distance and size, kept a working thermostat: oceans lock CO₂ into rock, holding a mild ~288 K. Mars, being small with weak gravity, could not hold onto its air. As its atmosphere escaped to space, the greenhouse weakened, temperatures fell, and its water froze out — a RUNAWAY REFRIGERATOR that chilled it within about a billion years. Distance set Venus's fate; size sealed Mars's.",
    tempL: "surface temperature",
    note: "Distance from the Sun tipped Venus into a runaway greenhouse; small size and weak gravity let Mars leak its air and freeze. Earth, in between, kept the balance that liquid water needs.",
  },
  ja: {
    title: "分かれた2つの運命",
    kind: "3姉妹がなぜこれほど違って終わったか",
    lede: "金星・地球・火星は兄弟として始まりました——岩石質で、似ていて、近くにあった。運命を比べ、惑星の距離と大きさがすべてを決めた様子を見よう。",
    thread: "物語は（ひとまず）おわる",
    threadText: "3つを並べると教訓が見えます。世界の気候は岩石だけで決まるのではなく、距離と大きさの刃の上で釣り合っている——どちらかに傾きすぎれば、暴走するのです。",
    key: "一つは熱く、一つは冷たく、一つは留まった",
    keyText: "金星・地球・火星は岩石の兄弟として生まれ、正反対の道を歩みました。太陽に最も近い金星は暴走温室効果に見舞われ——海の蒸発と歯止めなきCO₂が730 Kへ押し上げました。ちょうどよい距離と大きさの地球は、働くサーモスタットを保ちました：海がCO₂を岩に固定し、穏やかな約288 Kを維持します。小さく重力の弱い火星は、大気を保てませんでした。大気が宇宙へ逃げるほど温室効果が弱まり、気温が下がり、水は凍りつきました——約10億年で冷やした「暴走冷蔵庫」です。距離が金星の、大きさが火星の運命を決めたのです。",
    tempL: "地表温度",
    note: "太陽からの距離が金星を暴走温室効果に傾け、小さな大きさと弱い重力が火星に大気を漏らして凍らせました。あいだの地球は、液体の水に必要な均衡を保ちました。",
  },
};

function draw(ctx, cw, H, sel, lang) {
  ctx.clearRect(0, 0, cw, H);
  const ids = ["venus", "earth", "mars"];
  const n = 3, gap = 20, bw = (cw - gap * (n + 1)) / n;
  const cy = H * 0.42, R = Math.min(bw * 0.34, 40);
  // Sun on the left edge for distance sense
  ids.forEach((id, i) => {
    const wct = WORLDS[id];
    const x = gap + i * (bw + gap) + bw / 2;
    const on = id === sel;
    // heat halo ~ temperature
    const heat = id === "venus" ? 1 : id === "earth" ? 0.4 : 0.12;
    const hg = ctx.createRadialGradient(x, cy, 2, x, cy, R * 2);
    hg.addColorStop(0, `rgba(255,140,60,${0.15 + heat * 0.4})`); hg.addColorStop(1, "rgba(255,120,60,0)");
    ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(x, cy, R * 2, 0, Math.PI * 2); ctx.fill();
    const g = ctx.createRadialGradient(x - R * 0.3, cy - R * 0.3, 2, x, cy, R);
    g.addColorStop(0, `rgb(${lighten(wct.col)})`); g.addColorStop(1, wct.col);
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, cy, R, 0, Math.PI * 2); ctx.fill();
    if (on) { ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, cy, R + 3, 0, Math.PI * 2); ctx.stroke(); }
    ctx.fillStyle = C.text; ctx.font = `700 14px ${mono}`; ctx.textAlign = "center"; ctx.fillText(lang === "ja" ? wct.ja : wct.en, x, cy + R + 24);
    ctx.fillStyle = id === "venus" ? C.danger : id === "mars" ? C.cool : C.good; ctx.font = `700 16px ${mono}`; ctx.fillText(wct.temp, x, cy + R + 44);
  });
  ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText("← closer to the Sun    ·    farther →", cw / 2, 18);
}
function lighten(hex) { const n = parseInt(hex.slice(1), 16); const r = Math.min(255, ((n >> 16) & 255) + 50), g = Math.min(255, ((n >> 8) & 255) + 50), b = Math.min(255, (n & 255) + 50); return `${r},${g},${b}`; }

export function DivergentFates() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [sel, setSel] = useState("venus");
  const W = WORLDS[sel];

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, sel, lang);
  }, [cw, sel, lang]);

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
          <div style={{ ...styles.fateLabel, color: C.sun }}>{t.key}</div>
          <p style={styles.keyTermText}>{t.keyText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          {Object.keys(WORLDS).map((id) => (
            <button key={id} onClick={() => setSel(id)}
              style={{ ...styles.chip, ...(sel === id ? styles.chipOn : {}), borderColor: sel === id ? WORLDS[id].col : undefined }}>
              {lang === "ja" ? WORLDS[id].ja : WORLDS[id].en}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.5, marginTop: 8 }}>
          <b style={{ color: C.text }}>{lang === "ja" ? W.ja : W.en} · {W.temp}</b> — {lang === "ja" ? W.ja_t : W.en_t}
        </p>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default DivergentFates;
