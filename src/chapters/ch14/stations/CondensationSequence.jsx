/* ============================================================
   STATION 7 — THE CONDENSATION SEQUENCE
   The solar nebula had a temperature gradient: blazing hot near the
   young Sun, frigid far out. So only high-melting-point materials
   (metals, then silicate rock) could condense close in, while cooler
   regions farther out let volatiles freeze — water ice past the frost
   line, and methane & ammonia ices beyond Saturn. Primitive meteorites
   preserve this first condensation, so dating them gives the age of the
   solar system (~4.5 billion years). Grounded in Ch.14 §14.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

// zones across the disk (fraction 0..1 of the drawn distance)
const ZONES = [
  { x0: 0.0, x1: 0.16, col: "#c8c4bc", en: "metals (Ni-Fe)", ja: "金属（Ni-Fe）" },
  { x0: 0.16, x1: 0.42, col: "#c9a86a", en: "silicate rock", ja: "ケイ酸塩の岩石" },
  { x0: 0.42, x1: 0.68, col: "#8fc0e8", en: "water ice", ja: "水の氷" },
  { x0: 0.68, x1: 1.0, col: "#a99ae0", en: "methane & ammonia ices", ja: "メタン・アンモニアの氷" },
];

const STR = {
  en: {
    title: "The condensation sequence",
    kind: "Temperature builds the planets",
    lede: "Slide out from the Sun. The nebula cools with distance, so different materials freeze out at different places — rock near the Sun, exotic ices far away.",
    thread: "THE STORY CONTINUES",
    threadText: "Why is the inner solar system rocky and the outer solar system icy? The answer is a single sweeping temperature gradient in the disk that gave birth to everything.",
    key: "HOT ROCK IN, COLD ICE OUT",
    keyText: "The solar nebula was extremely hot near the forming Sun and very cold far away. Because of this temperature gradient, only materials with high melting points — metals, then silicate rock — could condense from gas to solid close to the Sun. Farther out, cooler temperatures let volatile compounds freeze: water ice beyond the 'frost line', and, beyond the orbit of Saturn, carbon and nitrogen combined with hydrogen to condense as methane and ammonia ices. This sequence explains the rocky inner and icy outer solar system.",
    distance: "Distance from Sun", condenses: "Here, the nebula condenses:", temp: "Temperature",
    hot: "hot", cold: "cold",
    dating: "Primitive meteorites froze this first condensation in place — dating them gives the age of the solar system: ≈ 4.5 billion years.",
    note: "A temperature gradient set the condensation sequence: metals and rock near the hot Sun, water ice past the frost line, methane and ammonia ices beyond Saturn. Dating primitive meteorites gives ~4.5 Gyr.",
  },
  ja: {
    title: "凝縮系列",
    kind: "温度が惑星を作る",
    lede: "太陽から外へスライドしよう。星雲は距離とともに冷え、材料ごとに違う場所で凍りつきます——太陽の近くは岩、遠くは風変わりな氷。",
    thread: "物語はつづく",
    threadText: "なぜ内太陽系は岩石質で、外太陽系は氷なのか？答えは、すべてを生んだ円盤の中の、一つの大きな温度勾配です。",
    key: "熱い岩は内、冷たい氷は外",
    keyText: "太陽系星雲は、形成中の太陽の近くでは極めて熱く、遠くでは非常に冷たかった。この温度勾配のため、太陽の近くでは融点の高い材料——金属、次にケイ酸塩の岩石——だけが気体から固体へ凝縮できました。遠くでは、より低い温度が揮発性の化合物を凍らせました：「フロストライン」の外では水の氷、そして土星の軌道の外では、炭素と窒素が水素と結びついてメタンとアンモニアの氷として凝縮しました。この系列が、岩石質の内側と氷の外側の太陽系を説明します。",
    distance: "太陽からの距離", condenses: "ここで星雲が凝縮するもの：", temp: "温度",
    hot: "熱い", cold: "冷たい",
    dating: "始原的な隕石はこの最初の凝縮をそのまま凍結しました——年代測定で太陽系の年齢がわかります：約45億年。",
    note: "温度勾配が凝縮系列を決めました：熱い太陽の近くは金属と岩、フロストラインの外は水の氷、土星の外はメタンとアンモニアの氷。始原的な隕石の年代測定で約45億年が得られます。",
  },
};

function draw(ctx, cw, H, dist, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const x0 = 40, x1 = cw - 20, y0 = H * 0.28, y1 = H * 0.62;
  // Sun at left
  const sg = ctx.createRadialGradient(x0, (y0 + y1) / 2, 2, x0, (y0 + y1) / 2, 26);
  sg.addColorStop(0, "#fff2c0"); sg.addColorStop(1, "rgba(255,180,60,0)");
  ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(x0, (y0 + y1) / 2, 26, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffd86b"; ctx.beginPath(); ctx.arc(x0, (y0 + y1) / 2, 9, 0, Math.PI * 2); ctx.fill();
  // zone bands
  ZONES.forEach((z) => {
    const zx0 = x0 + z.x0 * (x1 - x0), zx1 = x0 + z.x1 * (x1 - x0);
    ctx.fillStyle = z.col; ctx.globalAlpha = 0.25; ctx.fillRect(zx0, y0, zx1 - zx0, y1 - y0); ctx.globalAlpha = 1;
    ctx.strokeStyle = "rgba(255,255,255,0.08)"; ctx.beginPath(); ctx.moveTo(zx0, y0); ctx.lineTo(zx0, y1); ctx.stroke();
    ctx.fillStyle = z.col; ctx.font = `9px ${mono}`; ctx.textAlign = "center";
    const words = (lang === "ja" ? z.ja : z.en);
    ctx.fillText(words, (zx0 + zx1) / 2, y1 + 14);
  });
  // temperature curve (falls with distance)
  ctx.strokeStyle = "#ff8f5a"; ctx.lineWidth = 2; ctx.beginPath();
  for (let i = 0; i <= 100; i++) { const fx = i / 100; const px = x0 + fx * (x1 - x0); const py = y0 - 14 - (1 - Math.pow(fx, 0.5)) * 0 + (y0 - 18) * 0; const ty = (y0 - 8) - (1 / (1 + fx * 6)) * (y0 - 20); if (i === 0) ctx.moveTo(px, ty); else ctx.lineTo(px, ty); }
  ctx.stroke();
  ctx.fillStyle = "#ff8f5a"; ctx.font = `9px ${mono}`; ctx.textAlign = "left"; ctx.fillText(t.temp, x0, 14);
  ctx.fillStyle = C.faint; ctx.textAlign = "left"; ctx.fillText(t.hot, x0, y1 + 30); ctx.textAlign = "right"; ctx.fillText(t.cold, x1, y1 + 30);
  // frost line marker
  const frostX = x0 + 0.42 * (x1 - x0);
  ctx.strokeStyle = "rgba(150,200,255,0.5)"; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(frostX, y0 - 6); ctx.lineTo(frostX, y1 + 4); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = "rgba(150,200,255,0.8)"; ctx.font = `8px ${mono}`; ctx.textAlign = "center"; ctx.fillText("frost line", frostX, y0 - 10);
  // Saturn marker
  const satX = x0 + 0.68 * (x1 - x0);
  ctx.fillStyle = "rgba(224,184,120,0.8)"; ctx.fillText("Saturn", satX, y0 - 10);
  // slider marker
  const mx = x0 + dist * (x1 - x0);
  ctx.strokeStyle = C.sun; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(mx, y0 - 20); ctx.lineTo(mx, y1 + 6); ctx.stroke();
  ctx.fillStyle = C.sun; ctx.beginPath(); ctx.moveTo(mx, y0 - 20); ctx.lineTo(mx - 4, y0 - 26); ctx.lineTo(mx + 4, y0 - 26); ctx.closePath(); ctx.fill();
}

export function CondensationSequence() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [dist, setDist] = useState(0.1);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, dist, lang);
  }, [cw, dist, lang]);

  const zone = ZONES.find((z) => dist >= z.x0 && dist < z.x1) || ZONES[ZONES.length - 1];

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
          <div style={{ ...styles.fateLabel, color: C.sun }}>{t.key}</div>
          <p style={styles.keyTermText}>{t.keyText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.distance}</span>
          <input type="range" min="0" max="1" step="0.01" value={dist}
            onChange={(e) => setDist(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
        </div>

        <div style={{ marginTop: 4 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <div style={{ fontFamily: mono, fontSize: 13, color: C.text, marginTop: 8 }}>
          {t.condenses} <span style={{ color: zone.col, fontWeight: 700 }}>{lang === "ja" ? zone.ja : zone.en}</span>
        </div>
        <div style={{ fontFamily: mono, fontSize: 11.5, color: C.cool, marginTop: 6 }}>{t.dating}</div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default CondensationSequence;
