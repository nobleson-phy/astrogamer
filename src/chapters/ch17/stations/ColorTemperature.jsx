/* ============================================================
   STATION 3 — COLOR & TEMPERATURE
   A star's color is a thermometer. By Wien's law, hotter stars peak at
   shorter wavelengths, so they look blue; cooler stars peak at longer
   wavelengths and look red. And because nearly all stars share almost
   the same composition, the big differences between their spectra come
   mainly from surface TEMPERATURE, not from different elements.
   Grounded in Ch.17 §17.2-17.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

// approximate blackbody color from temperature (K)
function bbColor(T) {
  // crude but recognizable mapping
  if (T >= 20000) return "#9bb4ff";
  if (T >= 12000) return "#aac4ff";
  if (T >= 9000) return "#dfe6ff";
  if (T >= 7000) return "#f8f7ff";
  if (T >= 5800) return "#fff4e8";
  if (T >= 5000) return "#ffe8b0";
  if (T >= 4000) return "#ffcf82";
  return "#ff9a52";
}

const STR = {
  en: {
    title: "Color & temperature",
    kind: "The star as a thermometer",
    lede: "Turn the temperature dial. Watch the star's color slide from red to blue and the peak of its glow shift to shorter wavelengths — exactly as Wien's law predicts.",
    thread: "THE STORY CONTINUES",
    threadText: "You already read temperature by color every day: a stove coil glows dull red, then orange, then white as it heats. Stars do the same, on a cosmic scale.",
    key: "HOTTER = BLUER (WIEN'S LAW)",
    keyText: "By Wien's law, the hotter an object, the shorter the wavelength at which it radiates most strongly. So the hottest stars peak in the blue (and look blue-white), while cool stars peak in the red. A star's color is therefore a direct readout of its surface temperature. This also explains why stellar spectra look so different from one another: nearly all stars have almost the same chemical composition, so the striking differences in their absorption spectra come mainly from differences in temperature, not composition.",
    temp: "Surface temperature", peak: "Peak wavelength",
    blue: "blue (hot)", red: "red (cool)",
    note: "By Wien's law, hotter stars peak at shorter (bluer) wavelengths. Since stars share nearly the same composition, their spectra differ mainly because of temperature.",
  },
  ja: {
    title: "色と温度",
    kind: "温度計としての星",
    lede: "温度ダイヤルを回そう。星の色が赤から青へ移り、輝きのピークが短い波長へずれる様子を見よう——まさにウィーンの法則の通りに。",
    thread: "物語はつづく",
    threadText: "あなたは毎日、色で温度を読んでいます：コンロのコイルは熱くなるにつれ、鈍い赤、オレンジ、白と光ります。星も同じことを宇宙規模で行います。",
    key: "高温＝より青い（ウィーンの法則）",
    keyText: "ウィーンの法則により、天体が高温であるほど、最も強く放射する波長は短くなります。だから最も高温の星は青でピークを迎え（青白く見え）、低温の星は赤でピークを迎えます。したがって星の色は、その表面温度の直接の表示です。これは恒星スペクトルが互いに大きく異なる理由も説明します：ほとんどの星の化学組成はほぼ同じなので、吸収スペクトルの著しい違いは主に温度の違いから来るのであり、組成の違いではありません。",
    temp: "表面温度", peak: "ピーク波長",
    blue: "青（高温）", red: "赤（低温）",
    note: "ウィーンの法則により、高温の星ほど短い（青い）波長でピークを迎えます。星の組成はほぼ同じなので、スペクトルの違いは主に温度によります。",
  },
};

function draw(ctx, cw, H, T, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const col = bbColor(T);
  // star disk (left)
  const sx = cw * 0.2, sy = H * 0.42, R = 40;
  const g = ctx.createRadialGradient(sx - R * 0.3, sy - R * 0.3, R * 0.2, sx, sy, R);
  g.addColorStop(0, "#ffffff"); g.addColorStop(0.4, col); g.addColorStop(1, "rgba(0,0,0,0.3)");
  const glow = ctx.createRadialGradient(sx, sy, R * 0.5, sx, sy, R * 1.6);
  glow.addColorStop(0, col); glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(sx, sy, R * 1.6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sx, sy, R, 0, Math.PI * 2); ctx.fill();
  // blackbody-ish curve (right): peak shifts left (shorter wavelength) as T rises
  const gx0 = cw * 0.42, gx1 = cw - 20, gy0 = 20, gy1 = H * 0.7;
  ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(gx0, gy0); ctx.lineTo(gx0, gy1); ctx.lineTo(gx1, gy1); ctx.stroke();
  // wavelength axis: left = short/blue, right = long/red
  const lamMax = 2.9e6 / T; // nm
  // draw curve peaking at position from lamMax mapped over 0..2000 nm
  const lamToX = (lam) => gx0 + Math.min(lam / 1600, 1) * (gx1 - gx0);
  // draw a single-peak bump centered at the Wien peak wavelength
  const peakX = lamToX(lamMax);
  ctx.beginPath();
  for (let px = gx0; px <= gx1; px += 2) {
    const d = (px - peakX) / ((gx1 - gx0) * 0.16);
    const y = gy1 - Math.exp(-d * d) * (gy1 - gy0) * 0.92;
    if (px === gx0) ctx.moveTo(px, y); else ctx.lineTo(px, y);
  }
  ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.stroke();
  // peak marker
  ctx.strokeStyle = "rgba(255,255,255,0.4)"; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(peakX, gy0); ctx.lineTo(peakX, gy1); ctx.stroke(); ctx.setLineDash([]);
  // spectrum band under axis (blue->red)
  const bandY = gy1 + 6;
  const grad = ctx.createLinearGradient(gx0, 0, gx1, 0);
  grad.addColorStop(0, "#8f6fff"); grad.addColorStop(0.25, "#6fb0ff"); grad.addColorStop(0.5, "#8fe08f"); grad.addColorStop(0.7, "#ffe066"); grad.addColorStop(1, "#ff5a5a");
  ctx.fillStyle = grad; ctx.fillRect(gx0, bandY, gx1 - gx0, 8);
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "left"; ctx.fillText(t.blue, gx0, bandY + 20); ctx.textAlign = "right"; ctx.fillText(t.red, gx1, bandY + 20);
  // peak readout
  ctx.fillStyle = C.text; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(`${t.peak}: ${lamMax.toFixed(0)} nm`, cw / 2, H - 8);
}

export function ColorTemperature() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [T, setT] = useState(5800);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, T, lang);
  }, [cw, T, lang]);

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

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.temp}</span>
          <input type="range" min="3000" max="30000" step="200" value={T}
            onChange={(e) => setT(parseInt(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
          <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, width: 66, textAlign: "right" }}>{T.toLocaleString()} K</span>
        </div>

        <div style={{ marginTop: 4 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default ColorTemperature;
