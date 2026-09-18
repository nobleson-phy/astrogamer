/* ============================================================
   STATION 1 — THE LOCAL CENSUS
   Distances to stars are measured in light-years (~9.5 trillion km). A
   true census of the Sun's neighborhood (within 21 ly) shows that cool,
   low-mass M-type RED DWARFS vastly outnumber every other kind of star.
   Yet of the 20 brightest-APPEARING stars in the sky, only 6 lie within
   26 ly — the rest are rare, very luminous distant giants. This gap is a
   classic SELECTION EFFECT. Grounded in Ch.18 §18.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The local census",
    kind: "Who our neighbors really are",
    lede: "Switch between the stars that look brightest and the stars that are actually near. The two pictures could hardly disagree more — that's a selection effect.",
    thread: "THE STORY BEGINS",
    threadText: "Look up and the sky seems full of brilliant stars. But the dazzling ones are a biased sample — the true population of the Galaxy is humbler, and mostly invisible to the eye.",
    key: "RED DWARFS RULE — BUT THE BRIGHTEST STARS FOOL US",
    keyText: "Astronomers measure stellar distances in light-years (about 9.5 trillion km each). A census of the Sun's neighborhood — every star within 21 light-years — shows that cool, low-mass M-type RED DWARFS are by far the most common stars. Yet if you instead list the 20 brightest-APPEARING stars in the night sky, only 6 of them lie within 26 light-years; the rest are rare, extremely luminous giants and supergiants visible across enormous distances. Judging the Galaxy by its brightest-looking stars is a SELECTION EFFECT that hides the true, red-dwarf-dominated population.",
    tab1: "Nearest stars (21 ly)", tab2: "Brightest-appearing (20)",
    near: "typical neighbors: dim red dwarfs", far: "only 6 of the 20 are actually nearby",
    ly: "1 light-year ≈ 9.5 trillion km",
    note: "Distances use light-years. A true local census is dominated by faint red dwarfs, but the 20 brightest-looking stars are mostly rare distant giants — a selection effect.",
  },
  ja: {
    title: "近傍の国勢調査",
    kind: "隣人の正体",
    lede: "最も明るく見える星と、実際に近い星を切り替えよう。2つの姿はこれ以上ないほど食い違います——それが選択効果です。",
    thread: "物語のはじまり",
    threadText: "見上げると空はまばゆい星でいっぱいに見えます。でもきらめく星は偏った標本です——銀河の真の集団はもっと控えめで、大半が肉眼に見えません。",
    key: "赤色矮星が主役——でも最も明るい星に騙される",
    keyText: "天文学者は恒星の距離を光年（各約9.5兆km）で測ります。太陽の近傍——21光年以内のすべての星——の census は、低温で低質量のM型赤色矮星が圧倒的に多いことを示します。しかし代わりに夜空で最も明るく見える20の星を挙げると、そのうち26光年以内にあるのは6個だけ。残りは、遠大な距離を越えて見えるまれで極めて明るい巨星・超巨星です。銀河を最も明るく見える星で判断するのは、赤色矮星が支配する真の集団を隠す選択効果です。",
    tab1: "最も近い星（21光年）", tab2: "最も明るく見える（20）",
    near: "典型的な隣人：暗い赤色矮星", far: "20のうち実際に近いのは6個だけ",
    ly: "1光年 ≈ 9.5兆km",
    note: "距離は光年で測ります。真の近傍 census は暗い赤色矮星が支配しますが、最も明るく見える20の星は大半がまれな遠方の巨星——選択効果です。",
  },
};

function draw(ctx, cw, H, mode, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2;
  if (mode === "near") {
    // Sun at center, many red dwarfs around, a few brighter
    ctx.fillStyle = "#ffd86b"; ctx.beginPath(); ctx.arc(cx, cy, 7, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText("Sun", cx, cy + 18);
    // 40 stars: ~75% red dwarfs (small red), few white/yellow
    for (let i = 0; i < 44; i++) {
      const a = i * 2.399, r = 24 + (i * 7 % 100) / 100 * (Math.min(cw, H) * 0.42);
      const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r * 0.8;
      const isDwarf = i % 8 !== 0;
      ctx.fillStyle = isDwarf ? "#c9503a" : (i % 16 === 0 ? "#fff4e8" : "#ffd86b");
      ctx.beginPath(); ctx.arc(x, y, isDwarf ? 2 : 3.5, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = "#e0774f"; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.near, cx, H - 12);
  } else {
    // 20 brightest: a row of dots, 6 highlighted as "nearby"
    ctx.fillStyle = C.faint; ctx.font = `10px ${mono}`; ctx.textAlign = "center";
    const cols = 5, rows = 4, gx = cw * 0.18, gy = H * 0.22, dx = (cw * 0.64) / (cols - 1), dy = (H * 0.4) / (rows - 1);
    let idx = 0;
    const nearSet = new Set([0, 4, 7, 11, 15, 18]); // 6 marked nearby
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const x = gx + c * dx, y = gy + r * dy; const near = nearSet.has(idx);
      const gl = ctx.createRadialGradient(x, y, 1, x, y, 12); gl.addColorStop(0, "#fff"); gl.addColorStop(1, "rgba(255,220,150,0)");
      ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(x, y, 12, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = near ? "#8fe0a0" : "#cfe0ff"; ctx.beginPath(); ctx.arc(x, y, near ? 5 : 4, 0, Math.PI * 2); ctx.fill();
      if (near) { ctx.strokeStyle = "#8fe0a0"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2); ctx.stroke(); }
      idx++;
    }
    ctx.fillStyle = "#8fe0a0"; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.far, cx, H - 12);
  }
}

export function LocalCensus() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("near");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, mode, lang);
  }, [cw, mode, lang]);

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

        <div style={styles.pickerRow}>
          {[["near", t.tab1], ["bright", t.tab2]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <div style={{ fontFamily: mono, fontSize: 11.5, color: C.cool, marginTop: 8 }}>{t.ly}</div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default LocalCensus;
