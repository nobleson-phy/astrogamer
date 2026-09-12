/* ============================================================
   STATION 3 — WHAT THE SUN IS MADE OF
   Before 1925, astronomers assumed stars had roughly Earth-like
   compositions (heavy in iron, silicon, oxygen). Cecilia
   Payne-Gaposchkin's 1925 doctoral thesis showed from stellar spectra
   that hydrogen and helium are overwhelmingly the most abundant
   elements — overturning that assumption and revealing that H and He
   dominate the cosmos. Grounded in Ch.15 §15.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

// abundance by number of atoms (schematic)
const OLD = [ // pre-1925 assumption: Sun ~ Earth-like
  { el: "O", v: 30, col: "#8fc0e8" }, { el: "Fe", v: 25, col: "#c88a5a" },
  { el: "Si", v: 20, col: "#b0b0a0" }, { el: "Mg", v: 12, col: "#a0c090" },
  { el: "H", v: 8, col: "#ffd86b" }, { el: "other", v: 5, col: "#8a8f9f" },
];
const REAL = [ // Payne's finding: H and He dominate
  { el: "H", v: 91, col: "#ffd86b" }, { el: "He", v: 8.5, col: "#ffa94a" },
  { el: "O", v: 0.08, col: "#8fc0e8" }, { el: "C", v: 0.03, col: "#a0c090" },
  { el: "Fe", v: 0.003, col: "#c88a5a" }, { el: "other", v: 0.05, col: "#8a8f9f" },
];

const STR = {
  en: {
    title: "What the Sun is made of",
    kind: "A 1925 revolution",
    lede: "Compare what astronomers assumed with what the spectra actually showed. One thesis flipped the chart — and our picture of the whole universe.",
    thread: "THE STORY CONTINUES",
    threadText: "It seems obvious now, but for a long time astronomers assumed the Sun was built like the Earth. The truth, hidden in starlight, was radically different — and a young researcher read it first.",
    key: "PAYNE-GAPOSCHKIN: THE COSMOS IS HYDROGEN AND HELIUM",
    keyText: "Before 1925, astronomers assumed that stars had roughly the same composition as the Earth — rich in oxygen, iron, and silicon. In her 1925 doctoral thesis, Cecilia Payne-Gaposchkin analysed stellar spectra and showed that hydrogen and helium are by far the most abundant elements in the Sun and stars. This overturned the Earth-composition assumption and established that hydrogen and helium overwhelmingly dominate the chemistry of the cosmos — one of the most important discoveries in astronomy.",
    old: "Old assumption (Earth-like)", real: "Payne's discovery (1925)",
    numL: "Abundance by number of atoms",
    note: "Cecilia Payne-Gaposchkin's 1925 thesis proved from stellar spectra that hydrogen and helium — not Earth-like elements — overwhelmingly dominate the Sun and the cosmos.",
  },
  ja: {
    title: "太陽の成分",
    kind: "1925年の革命",
    lede: "天文学者が想定していたものと、スペクトルが実際に示したものを比べよう。一つの論文がグラフを——そして宇宙全体の見方をひっくり返しました。",
    thread: "物語はつづく",
    threadText: "今では当然に思えますが、長い間、天文学者は太陽が地球のように作られていると想定していました。星の光に隠された真実は根本的に異なり——若い研究者が最初にそれを読み取りました。",
    key: "ペイン＝ガポーシュキン：宇宙は水素とヘリウム",
    keyText: "1925年以前、天文学者は恒星が地球とほぼ同じ組成——酸素・鉄・ケイ素に富む——だと想定していました。1925年の博士論文で、セシリア・ペイン＝ガポーシュキンは恒星のスペクトルを分析し、水素とヘリウムが太陽や恒星で圧倒的に豊富な元素であることを示しました。これは地球組成の想定を覆し、水素とヘリウムが宇宙の化学を圧倒的に支配することを確立しました——天文学で最も重要な発見の一つです。",
    old: "古い想定（地球型）", real: "ペインの発見（1925）",
    numL: "原子数での存在度",
    note: "セシリア・ペイン＝ガポーシュキンの1925年の論文は、地球型の元素ではなく水素とヘリウムが太陽と宇宙を圧倒的に支配することを、恒星スペクトルから証明しました。",
  },
};

function draw(ctx, cw, H, mode, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const data = mode === "old" ? OLD : REAL;
  const x0 = 20, x1 = cw - 20, y0 = 30, y1 = H - 30;
  const bw = (x1 - x0) / data.length;
  const maxV = Math.max(...data.map((d) => d.v));
  ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "left"; ctx.fillText(t.numL, x0, 16);
  data.forEach((d, i) => {
    const bx = x0 + i * bw + bw * 0.18, w = bw * 0.64;
    // log-ish height so tiny bars still show
    const frac = Math.pow(d.v / maxV, 0.42);
    const bh = frac * (y1 - y0 - 10);
    ctx.fillStyle = d.col; ctx.fillRect(bx, y1 - bh, w, bh);
    ctx.fillStyle = C.text; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(d.el, bx + w / 2, y1 + 14);
    ctx.fillStyle = C.muted; ctx.font = `9px ${mono}`;
    const lbl = d.v >= 1 ? `${d.v}%` : `${d.v}%`;
    ctx.fillText(lbl, bx + w / 2, y1 - bh - 5);
  });
}

export function Composition() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 240;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("real");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, mode, lang);
  }, [cw, mode, lang]);

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

        <div style={styles.pickerRow}>
          {[["old", t.old], ["real", t.real]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default Composition;
