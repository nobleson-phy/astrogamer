/* ============================================================
   STATION 1 — THE ENERGY CRISIS
   How can the Sun shine for so long? Chemical burning (like coal) could
   last only a few thousand years — far short of Earth's 4.5-billion-year
   age. Kelvin and Helmholtz proposed gravitational contraction, good for
   millions of years — better, but still far too short. Only nuclear
   fusion can power the Sun for billions of years. Grounded in Ch.16 §16.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const SOURCES = [
  { id: "chem", en: "Chemical burning", ja: "化学燃焼", years: 5e3, logY: Math.log10(5e3), col: "#e0774f",
    en_d: "Burning coal or wood could keep the Sun shining for only a few thousand years — hopelessly short.", ja_d: "石炭や木を燃やしても、太陽を数千年しか輝かせられない——絶望的に短い。" },
  { id: "grav", en: "Gravitational contraction", ja: "重力収縮", years: 2e7, logY: Math.log10(2e7), col: "#ffcf6b",
    en_d: "Kelvin & Helmholtz's idea: slow shrinking releases heat for tens of millions of years — better, but still far too short.", ja_d: "ケルビンとヘルムホルツの案：ゆっくりの収縮が数千万年の熱を出す——ましだが、まだはるかに短い。" },
  { id: "fusion", en: "Nuclear fusion", ja: "核融合", years: 1e10, logY: Math.log10(1e10), col: "#8fd0a0",
    en_d: "Fusing hydrogen into helium can power the Sun for over 10 billion years — comfortably longer than Earth's age.", ja_d: "水素をヘリウムに融合すれば、太陽を100億年以上支えられる——地球の年齢より余裕で長い。" },
];
const EARTH_AGE = 4.5e9;

const STR = {
  en: {
    title: "The energy crisis",
    kind: "What could last 4.5 billion years?",
    lede: "Earth's rocks are 4.5 billion years old, so the Sun must be at least that old too. Compare the candidate fuels — only one can go the distance.",
    thread: "THE STORY BEGINS",
    threadText: "For a century the Sun posed a crisis: nothing anyone knew of could keep it shining as long as the Earth had clearly existed. The answer would rewrite physics.",
    key: "ONLY FUSION OUTLASTS THE EARTH",
    keyText: "Geology shows Earth is about 4.5 billion years old, so the Sun must be at least as old. Chemical burning — the most familiar energy source — could power the Sun for only a few thousand years. Kelvin and Helmholtz proposed that the Sun stays hot by slowly contracting, converting gravitational energy into heat; this could last tens of millions of years — better, but still far too short. Only nuclear fusion, converting hydrogen into helium, can supply the Sun's energy for the billions of years the geological record demands.",
    lifespan: "Lifespan it could provide (log scale)", earthLine: "Earth's age: 4.5 billion yr",
    note: "Chemical burning lasts thousands of years, gravitational contraction millions — both far short of Earth's 4.5-billion-year age. Only nuclear fusion can power the Sun for billions of years.",
  },
  ja: {
    title: "エネルギーの危機",
    kind: "45億年もつのは何か",
    lede: "地球の岩は45億年前のものなので、太陽も少なくとも同じくらい古いはず。候補となる燃料を比べよう——距離を走りきれるのは一つだけ。",
    thread: "物語のはじまり",
    threadText: "1世紀の間、太陽は危機でした：知られるどんなものも、地球が明らかに存在してきた期間ほど太陽を輝かせられなかったのです。その答えは物理学を書き換えました。",
    key: "地球より長持ちするのは核融合だけ",
    keyText: "地質学は地球が約45億歳であることを示すので、太陽も少なくとも同じくらい古いはずです。最も身近なエネルギー源である化学燃焼は、太陽を数千年しか支えられません。ケルビンとヘルムホルツは、太陽がゆっくり収縮して重力エネルギーを熱に変えて熱を保つと提案しました。これは数千万年もちます——ましですが、まだはるかに短い。地質記録が要求する数十億年もの間、太陽のエネルギーを供給できるのは、水素をヘリウムに変える核融合だけです。",
    lifespan: "供給できる寿命（対数目盛）", earthLine: "地球の年齢：45億年",
    note: "化学燃焼は数千年、重力収縮は数百万年——どちらも地球の45億年にはるかに及びません。太陽を数十億年支えられるのは核融合だけです。",
  },
};

function draw(ctx, cw, H, sel, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const x0 = 20, x1 = cw - 20, y0 = 30, y1 = H - 46;
  const logMin = 3, logMax = 10.3;
  const ly = (logv) => y1 - (logv - logMin) / (logMax - logMin) * (y1 - y0);
  const bw = (x1 - x0) / SOURCES.length;
  // Earth age reference line
  const eY = ly(Math.log10(EARTH_AGE));
  ctx.strokeStyle = "rgba(120,200,255,0.6)"; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(x0, eY); ctx.lineTo(x1, eY); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = "#8fc0e8"; ctx.font = `10px ${mono}`; ctx.textAlign = "left"; ctx.fillText(t.earthLine, x0 + 4, eY - 5);
  // bars
  SOURCES.forEach((s, i) => {
    const bx = x0 + i * bw + bw * 0.2, w = bw * 0.6;
    const by = ly(s.logY);
    const on = s.id === sel;
    ctx.fillStyle = s.col; ctx.globalAlpha = on ? 1 : 0.55; ctx.fillRect(bx, by, w, y1 - by); ctx.globalAlpha = 1;
    if (on) { ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.strokeRect(bx, by, w, y1 - by); }
    ctx.fillStyle = on ? C.text : C.muted; ctx.font = `10px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(lang === "ja" ? s.ja : s.en, bx + w / 2, y1 + 14);
    // years label
    const yr = s.years >= 1e9 ? `${s.years / 1e9}B yr` : s.years >= 1e6 ? `${s.years / 1e6}M yr` : `${s.years / 1e3}k yr`;
    ctx.fillStyle = s.col; ctx.font = `9px ${mono}`; ctx.fillText(yr, bx + w / 2, by - 5);
    // pass/fail vs Earth age
    ctx.fillStyle = s.years >= EARTH_AGE ? C.good : C.bad; ctx.font = `12px ${mono}`;
    ctx.fillText(s.years >= EARTH_AGE ? "✓" : "✗", bx + w / 2, y1 + 28);
  });
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "left"; ctx.fillText(t.lifespan, x0, 16);
}

export function EnergyCrisis() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [sel, setSel] = useState("fusion");
  const s = SOURCES.find((x) => x.id === sel);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, sel, lang);
  }, [cw, sel, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 01</div>
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
          {SOURCES.map((x) => (
            <button key={x.id} onClick={() => setSel(x.id)}
              style={{ ...styles.chip, ...(sel === x.id ? styles.chipOn : {}) }}>{lang === "ja" ? x.ja : x.en}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.5, marginTop: 8 }}>{lang === "ja" ? s.ja_d : s.en_d}</p>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default EnergyCrisis;
