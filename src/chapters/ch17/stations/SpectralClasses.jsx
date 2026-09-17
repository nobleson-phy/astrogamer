/* ============================================================
   STATION 4 — SPECTRAL CLASSES (O B A F G K M)
   Stars are sorted by temperature into the sequence O, B, A, F, G, K, M
   (hottest to coolest). Hydrogen Balmer lines peak in A stars (~10,000 K);
   in the hottest O stars hydrogen is nearly all ionized, so its lines are
   weak. The Sun is a G2 star. The coolest M stars show molecular
   titanium-oxide (TiO) bands. Grounded in Ch.17 §17.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const CLASSES = [
  { id: "O", col: "#9bb4ff", temp: "> 30,000 K", balmer: 0.15,
    en: "Ionized helium; hydrogen weak (H mostly ionized).", ja: "電離ヘリウム；水素は弱い（ほぼ電離）。" },
  { id: "B", col: "#aac4ff", temp: "10,000–30,000 K", balmer: 0.5,
    en: "Neutral helium; hydrogen lines strengthening.", ja: "中性ヘリウム；水素線が強まる。" },
  { id: "A", col: "#dfe6ff", temp: "~7,500–10,000 K", balmer: 1.0,
    en: "Hydrogen Balmer lines at their STRONGEST.", ja: "水素バルマー線が最強。" },
  { id: "F", col: "#f8f7ff", temp: "~6,000–7,500 K", balmer: 0.7,
    en: "Hydrogen weakening; ionized metals appear.", ja: "水素は弱まり、電離金属が現れる。" },
  { id: "G", col: "#fff4e8", temp: "~5,200–6,000 K", balmer: 0.4,
    en: "Ionized calcium; many neutral metals. The Sun is G2.", ja: "電離カルシウム；多くの中性金属。太陽はG2。" },
  { id: "K", col: "#ffcf82", temp: "~3,700–5,200 K", balmer: 0.2,
    en: "Strong neutral metals; some molecules.", ja: "強い中性金属；一部の分子。" },
  { id: "M", col: "#ff9a52", temp: "< 3,700 K", balmer: 0.1,
    en: "Molecular titanium-oxide (TiO) bands dominate.", ja: "酸化チタン（TiO）の分子帯が支配的。" },
];

const STR = {
  en: {
    title: "Spectral classes",
    kind: "O B A F G K M",
    lede: "Tap along the sequence from hot to cool. Watch the star's color and its spectral lines change — and see where hydrogen shouts loudest and where molecules appear.",
    thread: "THE STORY CONTINUES",
    threadText: "Astronomers tame the variety of stars with seven letters. Learn them once and a star's spectrum tells you its temperature at a glance.",
    key: "A TEMPERATURE SEQUENCE, HOTTEST (O) TO COOLEST (M)",
    keyText: "The spectral classes O, B, A, F, G, K, M run from the hottest stars to the coolest. The strength of hydrogen's Balmer absorption lines peaks in A stars (~10,000 K); in the much hotter O stars (>28,000 K) hydrogen is almost fully ionized, so — despite being the most abundant element — its lines are weak. The Sun is a G2 star. In the coolest M stars, temperatures are low enough for molecules to form, and bands of titanium oxide (TiO) dominate the spectrum.",
    tempL: "Temperature", featL: "Dominant features", balmerL: "Hydrogen Balmer strength",
    note: "O B A F G K M runs hot to cool. Balmer hydrogen lines peak at A; O-star hydrogen is ionized (weak lines); the Sun is G2; and cool M stars show TiO molecular bands.",
  },
  ja: {
    title: "分光型",
    kind: "O B A F G K M",
    lede: "高温から低温へ、系列に沿ってタップしよう。星の色とスペクトル線が変わる様子——水素が最も強く叫ぶ場所と分子が現れる場所を見よう。",
    thread: "物語はつづく",
    threadText: "天文学者は7つの文字で星の多様さを飼いならします。一度覚えれば、星のスペクトルが一目で温度を教えてくれます。",
    key: "温度の系列、最も高温（O）から最も低温（M）へ",
    keyText: "分光型 O, B, A, F, G, K, M は、最も高温の星から最も低温の星まで並びます。水素のバルマー吸収線の強さはA型星（約10,000 K）でピークになります。はるかに高温のO型星（>28,000 K）では水素はほぼ完全に電離しているので——最も豊富な元素なのに——その線は弱くなります。太陽はG2型星です。最も低温のM型星では、温度が分子を作るほど低く、酸化チタン（TiO）の帯がスペクトルを支配します。",
    tempL: "温度", featL: "支配的な特徴", balmerL: "水素バルマー線の強さ",
    note: "O B A F G K M は高温から低温へ。バルマー水素線はAで最強、O型星の水素は電離（弱い線）、太陽はG2、冷たいM型星はTiO分子帯を示します。",
  },
};

function draw(ctx, cw, H, sel, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cls = CLASSES.find((x) => x.id === sel);
  // big star disk (left)
  const sx = cw * 0.2, sy = H * 0.4, R = 38;
  const glow = ctx.createRadialGradient(sx, sy, R * 0.5, sx, sy, R * 1.6); glow.addColorStop(0, cls.col); glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(sx, sy, R * 1.6, 0, Math.PI * 2); ctx.fill();
  const g = ctx.createRadialGradient(sx - R * 0.3, sy - R * 0.3, R * 0.2, sx, sy, R); g.addColorStop(0, "#fff"); g.addColorStop(0.5, cls.col); g.addColorStop(1, "rgba(0,0,0,0.3)");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sx, sy, R, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.text; ctx.font = `700 20px ${mono}`; ctx.textAlign = "center"; ctx.fillText(cls.id, sx, sy - R - 8);
  // sample spectrum band (right) with absorption lines whose density hints at features
  const bx = cw * 0.42, bw = cw - 20 - bx, by = H * 0.28, bh = 30;
  const grad = ctx.createLinearGradient(bx, 0, bx + bw, 0);
  grad.addColorStop(0, "#6a3fff"); grad.addColorStop(0.3, "#4f9bff"); grad.addColorStop(0.55, "#8fe08f"); grad.addColorStop(0.75, "#ffe066"); grad.addColorStop(1, "#ff5a5a");
  ctx.fillStyle = grad; ctx.fillRect(bx, by, bw, bh);
  // absorption lines: Balmer set (blue-green region) with strength = balmer
  ctx.strokeStyle = `rgba(10,10,20,${0.3 + cls.balmer * 0.6})`;
  [0.30, 0.36, 0.42, 0.48].forEach((f) => { ctx.lineWidth = 1 + cls.balmer * 3; ctx.beginPath(); ctx.moveTo(bx + f * bw, by); ctx.lineTo(bx + f * bw, by + bh); ctx.stroke(); });
  // metal / molecular lines for cooler classes
  if (sel === "G" || sel === "K" || sel === "M") { ctx.strokeStyle = "rgba(10,10,20,0.7)"; ctx.lineWidth = 1.5; [0.2, 0.24, 0.6, 0.66, 0.72].forEach((f) => { ctx.beginPath(); ctx.moveTo(bx + f * bw, by); ctx.lineTo(bx + f * bw, by + bh); ctx.stroke(); }); }
  if (sel === "M") { ctx.fillStyle = "rgba(10,10,20,0.55)"; [0.78, 0.86, 0.94].forEach((f) => ctx.fillRect(bx + f * bw, by, bw * 0.03, bh)); } // TiO bands
  if (sel === "O" || sel === "B") { ctx.strokeStyle = "rgba(10,10,20,0.6)"; ctx.lineWidth = 1.5; [0.12, 0.18].forEach((f) => { ctx.beginPath(); ctx.moveTo(bx + f * bw, by); ctx.lineTo(bx + f * bw, by + bh); ctx.stroke(); }); } // He lines
  ctx.fillStyle = C.faint; ctx.font = `8px ${mono}`; ctx.textAlign = "left"; ctx.fillText(lang === "ja" ? "スペクトル（吸収線）" : "spectrum (absorption lines)", bx, by - 5);
  // Balmer strength meter
  const my = by + bh + 22, mw = bw;
  ctx.fillStyle = "rgba(120,150,210,0.2)"; ctx.fillRect(bx, my, mw, 10);
  ctx.fillStyle = "#8fbfff"; ctx.fillRect(bx, my, mw * cls.balmer, 10);
  ctx.fillStyle = C.cool; ctx.font = `9px ${mono}`; ctx.fillText(t.balmerL, bx, my - 4);
  // temp + features
  ctx.fillStyle = C.text; ctx.font = `11px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(`${t.tempL}: ${cls.temp}`, bx, H - 26);
  ctx.fillStyle = C.muted; ctx.font = `10px ${mono}`;
  const feat = lang === "ja" ? cls.ja : cls.en;
  ctx.fillText(feat.length > 52 ? feat.slice(0, 52) : feat, bx, H - 10);
}

export function SpectralClasses() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [sel, setSel] = useState("A");
  const cls = CLASSES.find((x) => x.id === sel);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, sel, lang);
  }, [cw, sel, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 04</div>
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

        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {CLASSES.map((x) => (
            <button key={x.id} onClick={() => setSel(x.id)}
              style={{ ...styles.chip, ...(sel === x.id ? styles.chipOn : {}), borderColor: sel === x.id ? x.col : undefined, fontWeight: 700 }}>{x.id}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.5, marginTop: 8 }}>
          <b style={{ color: C.text }}>{cls.id}</b> · {cls.temp} — {lang === "ja" ? cls.ja : cls.en}{sel === "G" ? "" : ""}
        </p>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default SpectralClasses;
