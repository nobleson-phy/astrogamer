/* ============================================================
   STATION 2 — GAS, ICE, OR ROCK?
   Astronomers sort a giant planet's ingredients into three classes:
   "gases" = hydrogen & helium; "ices" = compounds of oxygen, carbon
   and nitrogen (water, methane, ammonia); "rock" = silicon- and
   iron-bearing minerals. Jupiter alone outweighs every other planet
   combined. Grounded in Ch.11 §11.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

/* materials to sort. class: gas | ice | rock */
const ITEMS = [
  { en: "Hydrogen", ja: "水素", cls: "gas" },
  { en: "Helium", ja: "ヘリウム", cls: "gas" },
  { en: "Water", ja: "水", cls: "ice" },
  { en: "Methane", ja: "メタン", cls: "ice" },
  { en: "Ammonia", ja: "アンモニア", cls: "ice" },
  { en: "Silicon minerals", ja: "ケイ素鉱物", cls: "rock" },
  { en: "Iron", ja: "鉄", cls: "rock" },
];
const CLASSES = {
  gas: { en: "Gas", ja: "ガス", col: "#63d3f0", en_d: "hydrogen & helium", ja_d: "水素とヘリウム" },
  ice: { en: "Ice", ja: "氷", col: "#8fd0ff", en_d: "compounds of O, C, N (water, methane, ammonia)", ja_d: "O・C・Nの化合物（水・メタン・アンモニア）" },
  rock: { en: "Rock", ja: "岩石", col: "#c9a06a", en_d: "silicon- and iron-bearing minerals", ja_d: "ケイ素や鉄を含む鉱物" },
};

const STR = {
  en: {
    title: "Gas, ice, or rock?",
    kind: "The three-word chemistry of giants",
    lede: "'Gas', 'ice' and 'rock' mean something precise to a planetary scientist. Tap each material to sort it — and see why Jupiter is in a mass class of its own.",
    thread: "THE STORY CONTINUES",
    threadText: "To describe worlds so unlike Earth, astronomers borrow three simple words — but give them special meanings. Getting the vocabulary right is the key to reading the giants.",
    key: "GAS = H & He · ICE = O/C/N · ROCK = Si & Fe",
    keyText: "In giant-planet science, 'gases' means hydrogen and helium — the two most abundant elements in the universe. 'Ices' means compounds built from oxygen, carbon and nitrogen: water, methane and ammonia (so-called even when not frozen). 'Rock' means silicon- and iron-bearing minerals. Jupiter and Saturn are mostly gas; Uranus and Neptune are mostly ice. And Jupiter is the heavyweight: its mass exceeds that of all the other planets in the solar system combined.",
    sortIt: "Tap a material to classify it:", correct: "sorted!",
    massTitle: "Jupiter vs everything else",
    jup: "Jupiter", rest: "all other planets combined",
    note: "Gas = hydrogen & helium; ice = compounds of oxygen, carbon and nitrogen; rock = silicon and iron. Jupiter alone outweighs every other planet in the solar system put together.",
  },
  ja: {
    title: "ガス・氷・岩石",
    kind: "巨人の3語の化学",
    lede: "「ガス」「氷」「岩石」は、惑星科学者には正確な意味をもちます。各材料をタップして仕分けし——なぜ木星が別格の質量なのかを見よう。",
    thread: "物語はつづく",
    threadText: "地球とはまるで違う世界を表すため、天文学者は3つの単純な言葉を借り——特別な意味を与えます。この語彙を正しく理解することが、巨人を読む鍵です。",
    key: "ガス＝H・He／氷＝O/C/N／岩石＝Si・Fe",
    keyText: "巨大惑星の科学では、「ガス」は水素とヘリウム——宇宙で最も豊富な2元素——を指します。「氷」は酸素・炭素・窒素からできる化合物：水・メタン・アンモニア（凍っていなくてもそう呼ぶ）。「岩石」はケイ素や鉄を含む鉱物です。木星と土星は大半がガス、天王星と海王星は大半が氷。そして木星は横綱格：その質量は、太陽系の他のすべての惑星を合わせたよりも大きいのです。",
    sortIt: "材料をタップして分類しよう：", correct: "分類完了！",
    massTitle: "木星 対 それ以外すべて",
    jup: "木星", rest: "他のすべての惑星の合計",
    note: "ガス＝水素とヘリウム、氷＝酸素・炭素・窒素の化合物、岩石＝ケイ素と鉄。木星だけで、太陽系の他のすべての惑星を合わせたよりも重いのです。",
  },
};

function drawMass(ctx, cw, H, t, lang) {
  ctx.clearRect(0, 0, cw, H);
  const padX = 30, barY = 40, barH = 40, barW = cw - padX * 2;
  // Jupiter ~ 2.5x all others combined -> Jupiter fraction ~0.71
  const jf = 0.71;
  const jg = ctx.createLinearGradient(padX, 0, padX + barW * jf, 0); jg.addColorStop(0, "#e8cf9a"); jg.addColorStop(1, "#c98a3a");
  ctx.fillStyle = jg; ctx.fillRect(padX, barY, barW * jf, barH);
  ctx.fillStyle = "rgba(99,211,240,0.55)"; ctx.fillRect(padX + barW * jf, barY, barW * (1 - jf), barH);
  ctx.strokeStyle = "rgba(150,175,230,0.4)"; ctx.strokeRect(padX, barY, barW, barH);
  ctx.fillStyle = "#2a1c08"; ctx.font = `700 14px ${mono}`; ctx.textAlign = "left"; ctx.fillText(t.jup, padX + 12, barY + 26);
  ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.textAlign = "right"; ctx.fillText(t.rest, padX + barW - 8, barY + barH + 16);
  ctx.textAlign = "left"; ctx.fillText(t.massTitle, padX, barY - 10);
}

export function GasIceRock() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 130;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [placed, setPlaced] = useState({}); // index -> class chosen
  const [sel, setSel] = useState(null);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    drawMass(ctx, cw, H, t, lang);
  }, [cw, lang]);

  const classify = (i, cls) => setPlaced((p) => ({ ...p, [i]: cls }));
  const allDone = ITEMS.every((_, i) => placed[i]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 02</div>
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

        {/* class buckets */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {Object.keys(CLASSES).map((k) => (
            <div key={k} style={{ flex: "1 1 120px", border: `1px solid ${CLASSES[k].col}55`, borderRadius: 10, padding: "8px 10px", background: "rgba(8,12,26,0.5)" }}>
              <div style={{ fontFamily: mono, fontSize: 13, color: CLASSES[k].col, fontWeight: 700 }}>{lang === "ja" ? CLASSES[k].ja : CLASSES[k].en}</div>
              <div style={{ fontSize: 11, color: C.faint, lineHeight: 1.3 }}>{lang === "ja" ? CLASSES[k].ja_d : CLASSES[k].en_d}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 6, minHeight: 18 }}>
                {ITEMS.map((it, i) => placed[i] === k && (
                  <span key={i} style={{ fontFamily: mono, fontSize: 11, color: C.text, background: CLASSES[k].col + "33", borderRadius: 6, padding: "2px 6px" }}>{lang === "ja" ? it.ja : it.en}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* items to sort */}
        <div style={{ fontFamily: mono, fontSize: 12.5, color: C.faint, marginTop: 12, marginBottom: 4 }}>{t.sortIt}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {ITEMS.map((it, i) => {
            const done = placed[i];
            const right = done === it.cls;
            return (
              <div key={i} style={{ position: "relative" }}>
                <button onClick={() => setSel(sel === i ? null : i)}
                  style={{ ...styles.chip, ...(sel === i ? styles.chipOn : {}), opacity: done ? 0.55 : 1, borderColor: done ? (right ? C.good : C.danger) : undefined }}>
                  {lang === "ja" ? it.ja : it.en}{done ? (right ? " ✓" : " ✗") : ""}
                </button>
                {sel === i && (
                  <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                    {Object.keys(CLASSES).map((k) => (
                      <button key={k} onClick={() => { classify(i, k); setSel(null); }}
                        style={{ ...styles.chip, fontSize: 11, padding: "3px 8px", borderColor: CLASSES[k].col }}>{lang === "ja" ? CLASSES[k].ja : CLASSES[k].en}</button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {allDone && <div style={{ fontFamily: mono, fontSize: 13, color: C.good, marginTop: 8 }}>✓ {t.correct}</div>}

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default GasIceRock;
