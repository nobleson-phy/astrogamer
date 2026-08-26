/* ============================================================
   STATION 3 — DATING BY CRATERS (THE HEAVY BOMBARDMENT)
   Older surfaces collect more craters. The highlands (4.2 Gyr) have
   ~10× the craters of the maria (3.8 Gyr) — yet are only slightly
   older. The only way to fit both facts: the impact rate was NOT
   constant. It was enormous early on and dropped sharply after the
   heavy bombardment ~3.8 Gyr ago. Grounded in Ch.9 §9.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

function rng(seed) { let s = seed; return () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff; }

const STR = {
  en: {
    title: "Dating by craters",
    kind: "A clock — and a surprise about the past",
    lede: "Count the craters and you rank the ages: more craters, older ground. But the numbers hide a shock about the early solar system. Compare the two terrains, then look at the bombardment rate.",
    thread: "THE STORY CONTINUES",
    threadText: "Crater counting lets us order surfaces without a single rock sample. But when the Apollo samples finally gave real ages, the counts didn't add up — unless the sky itself had once been far more violent.",
    key: "IMPACTS RAINED DOWN FASTER LONG AGO",
    keyText: "The heavily cratered highlands are about 4.2 billion years old; the smoother maria are about 3.8 billion — only slightly younger. Yet the highlands carry roughly ten times more craters. If impacts arrived at a steady rate, that would be impossible. The resolution: the impact rate was NOT constant. The early solar system swarmed with debris, so cratering was ferocious before ~3.8 billion years ago (the 'heavy bombardment') and then dropped off sharply.",
    vTerr: "Two terrains", vRate: "Bombardment rate",
    highlands: "Highlands", maria: "Maria", ageL: "age", cratersL: "craters",
    rateL: "Impact rate", timeL: "billions of years ago", bombard: "heavy bombardment",
    note1: "Same-sized patches: the older highlands are saturated with craters, the younger maria nearly clean — a 10× difference for only 0.4 Gyr of age.",
    note2: "The impact rate was huge in the first billion years and then collapsed. That early 'heavy bombardment' is why a small age gap makes a huge crater-count gap.",
  },
  ja: {
    title: "クレーターで年代測定",
    kind: "時計——そして過去についての驚き",
    lede: "クレーターを数えれば年代の順位がつきます：多いほど古い地面。でもその数字は、初期太陽系についての衝撃を隠しています。2つの地形を比べ、それから衝突の頻度を見よう。",
    thread: "物語はつづく",
    threadText: "クレーター計数は、岩石試料なしで表面の順序を決められます。でもアポロの試料がついに本当の年代を与えたとき、計数は合いませんでした——かつて空そのものがはるかに激しかったのでなければ。",
    key: "はるか昔、衝突はもっと激しく降った",
    keyText: "クレーターだらけの高地は約42億年前、より滑らかな海は約38億年前——わずかに若いだけです。それでも高地はおよそ10倍のクレーターをもちます。衝突が一定の頻度で来たなら、これは不可能です。答え：衝突の頻度は一定ではなかった。初期太陽系は破片であふれ、約38億年前より前は激しく（「後期重爆撃」）、その後は急に減ったのです。",
    vTerr: "2つの地形", vRate: "衝突の頻度",
    highlands: "高地", maria: "海", ageL: "年代", cratersL: "クレーター",
    rateL: "衝突頻度", timeL: "億年前", bombard: "後期重爆撃",
    note1: "同じ大きさの区画：古い高地はクレーターで飽和し、若い海はほぼきれい——年代差わずか4億年で10倍の差。",
    note2: "衝突頻度は最初の10億年で巨大で、その後急落しました。この初期の「重爆撃」が、小さな年代差が大きなクレーター数の差を生む理由です。",
  },
};

function drawTerr(ctx, cw, H, t, lang) {
  ctx.clearRect(0, 0, cw, H);
  const gap = 16, pw = (cw - gap * 3) / 2, ph = H - 56, py = 34;
  const panels = [
    { x: gap, label: t.highlands, age: "4.2 Gyr", n: 90, seed: 5, col: "#c9c1b0" },
    { x: gap * 2 + pw, label: t.maria, age: "3.8 Gyr", n: 9, seed: 42, col: "#5a606e" },
  ];
  panels.forEach((p) => {
    ctx.fillStyle = p.col; ctx.globalAlpha = 0.5; ctx.fillRect(p.x, py, pw, ph); ctx.globalAlpha = 1;
    ctx.strokeStyle = "rgba(150,175,230,0.35)"; ctx.strokeRect(p.x, py, pw, ph);
    const r = rng(p.seed);
    for (let i = 0; i < p.n; i++) {
      const cx = p.x + 8 + r() * (pw - 16), cy = py + 8 + r() * (ph - 16), rad = 2 + r() * 6;
      ctx.fillStyle = "rgba(40,36,30,0.55)"; ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "rgba(240,236,228,0.4)"; ctx.lineWidth = 0.8; ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.fillStyle = C.text; ctx.font = `700 13px ${mono}`; ctx.textAlign = "center"; ctx.fillText(p.label, p.x + pw / 2, 20);
    ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.fillText(`${p.age} · ${p.n} ${t.cratersL}`, p.x + pw / 2, H - 8);
  });
}

function drawRate(ctx, cw, H, t, lang) {
  ctx.clearRect(0, 0, cw, H);
  const padL = 42, padR = 16, padT = 20, padB = 40;
  const plotW = cw - padL - padR, plotH = H - padT - padB, y0 = H - padB;
  // x: 4.5 (left) -> 0 (right) Gyr ago; y: rate (log-ish, high early)
  const xOf = (g) => padL + (1 - g / 4.5) * plotW;
  const rate = (g) => Math.pow(10, (g - 3.8) * 1.6); // ~1 at 3.8, huge before
  const maxR = rate(4.5);
  const yOf = (r) => y0 - (Math.log10(r + 0.02) - Math.log10(0.02)) / (Math.log10(maxR) - Math.log10(0.02)) * plotH;
  // axes
  ctx.strokeStyle = "rgba(150,175,230,0.35)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(padL, padT); ctx.lineTo(padL, y0); ctx.lineTo(cw - padR, y0); ctx.stroke();
  // bombardment shaded region (before 3.8)
  ctx.fillStyle = "rgba(255,122,107,0.10)"; ctx.fillRect(padL, padT, xOf(3.8) - padL, plotH);
  ctx.fillStyle = C.danger; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.bombard, (padL + xOf(3.8)) / 2, padT + 12);
  // curve
  ctx.strokeStyle = C.sun; ctx.lineWidth = 2.4; ctx.shadowColor = C.sun; ctx.shadowBlur = 8;
  ctx.beginPath();
  for (let g = 4.5; g >= 0; g -= 0.05) { const x = xOf(g), y = yOf(rate(g)); g === 4.5 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
  ctx.stroke(); ctx.shadowBlur = 0;
  // markers for highlands (4.2) and maria (3.8)
  [["4.2", 4.2, "#c9c1b0", t.highlands], ["3.8", 3.8, "#8fd0ff", t.maria]].forEach(([lbl, g, col, name]) => {
    const x = xOf(g); ctx.strokeStyle = col; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(x, padT); ctx.lineTo(x, y0); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = col; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(name, x, y0 + 14);
  });
  ctx.fillStyle = C.faint; ctx.font = `10px ${mono}`; ctx.textAlign = "left"; ctx.fillText(t.rateL + " ↑", padL - 34, padT + 4);
  ctx.textAlign = "right"; ctx.fillText(t.timeL + " →", cw - padR, y0 + 28);
}

export function CraterDating() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [view, setView] = useState("terr");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (view === "terr") drawTerr(ctx, cw, H, t, lang);
    else drawRate(ctx, cw, H, t, lang);
  }, [cw, view, lang]);

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
          {[["terr", t.vTerr], ["rate", t.vRate]].map(([id, label]) => (
            <button key={id} onClick={() => setView(id)}
              style={{ ...styles.chip, ...(view === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{view === "terr" ? t.note1 : t.note2}</p>
      </div>
    </div>
  );
}

export default CraterDating;
