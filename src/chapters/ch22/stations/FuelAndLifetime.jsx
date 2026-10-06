/* ============================================================
   STATION 2 — FUEL & LIFETIME
   A star's luminosity climbs steeply with mass (L ∝ M⁴), so even though a
   massive star carries more fuel, it burns through it so much faster that its
   main-sequence lifetime collapses: t ≈ 10 Gyr × M / L ≈ 10 Gyr / M³. The Sun
   (1 M☉) lasts ~10 billion years; a 15–20 M☉ star like Betelgeuse races
   through its life in only ~10 million. Massive stars live fast and die young.
   Grounded in Ch.22 §22.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Fuel & lifetime",
    kind: "Live fast, die young",
    lede: "More mass means more fuel — but luminosity rises as M⁴, so massive stars burn out in a geological blink. Try the Sun, then Betelgeuse.",
    thread: "THE STORY CONTINUES",
    threadText: "Once a star is fusing hydrogen, the clock starts. How long it has left is decided before it is even born, by one number: its mass.",
    key: "L ∝ M⁴, SO LIFETIME ∝ 1 / M³",
    keyText: "A star's luminosity climbs steeply with mass — roughly L ∝ M⁴. So although a massive star starts with more fuel, it burns through it enormously faster, and its main-sequence lifetime collapses: t ≈ 10 billion years × (M / L) ≈ 10 billion years / M³. The Sun (1 M☉) shines for about 10 billion years; a 15–20 M☉ supergiant like Betelgeuse exhausts its core fuel in only about 10 million. Massive stars live fast and die young.",
    mass: "Stellar mass",
    lumR: "luminosity", lifeR: "main-seq. lifetime",
    tank: "FUEL BURNED OVER A LIFETIME",
    sun: "Sun · 1 M☉", betel: "Betelgeuse · ~18 M☉",
    yr: "yr", gyr: "Gyr", myr: "Myr",
    note: "Luminosity rises as about M⁴, so lifetime falls as about 1/M³. The Sun gets ~10 Gyr; a massive star like Betelgeuse burns out in ~10 Myr — thousands of times faster.",
  },
  ja: {
    title: "燃料と寿命",
    kind: "速く生き、若く死ぬ",
    lede: "質量が大きいほど燃料は多い——でも光度はM⁴で上がるので、大質量星は地質学的にまばたきの間に燃え尽きます。太陽、そしてベテルギウスを試そう。",
    thread: "物語はつづく",
    threadText: "星が水素を融合し始めると、時計が動き出します。あとどれだけ残されているかは、生まれる前に、たったひとつの数——質量——で決まっています。",
    key: "L ∝ M⁴、ゆえに寿命 ∝ 1 / M³",
    keyText: "星の光度は質量とともに急激に上がります——おおよそ L ∝ M⁴ です。だから大質量星はより多くの燃料で始まっても、それをはるかに速く燃やし、主系列の寿命は縮みます：t ≈ 100億年 ×（M / L）≈ 100億年 / M³。太陽（1 M☉）は約100億年輝きますが、ベテルギウスのような15〜20 M☉の超巨星は核の燃料をわずか約1,000万年で使い果たします。大質量星は速く生き、若く死ぬのです。",
    mass: "星の質量",
    lumR: "光度", lifeR: "主系列寿命",
    tank: "一生で燃やす燃料",
    sun: "太陽 · 1 M☉", betel: "ベテルギウス · 約18 M☉",
    yr: "年", gyr: "億年", myr: "万年",
    note: "光度はおよそM⁴で上がるので、寿命はおよそ1/M³で下がります。太陽は約100億年、ベテルギウスのような大質量星は約1,000万年——数千倍速く——で燃え尽きます。",
  },
};

function drawTank(ctx, cw, H, M, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const Lrel = Math.pow(M, 4);
  const lifeGyr = 10 / Math.pow(M, 3); // relative to Sun's 10 Gyr
  // horizontal fuel bar: its FILLED length ~ log lifetime (longer = lives longer)
  const bx = 24, by = H * 0.4, bw = cw - 48, bh = 34;
  ctx.strokeStyle = "rgba(150,175,230,0.4)"; ctx.lineWidth = 1.5;
  ctx.strokeRect(bx, by, bw, bh);
  // fraction of a 100 Gyr reference scale, on a log feel
  const frac = clamp((Math.log10(lifeGyr) + 3) / (Math.log10(100) + 3), 0.02, 1);
  const grad = ctx.createLinearGradient(bx, 0, bx + bw, 0);
  grad.addColorStop(0, "#ff8a52"); grad.addColorStop(1, "#ffd23d");
  ctx.fillStyle = grad; ctx.fillRect(bx + 2, by + 2, (bw - 4) * frac, bh - 4);
  ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(t.tank, bx, by - 12);
  // readouts
  ctx.fillStyle = C.text; ctx.font = `12px ${mono}`; ctx.textAlign = "center";
  const lifeStr = lifeGyr >= 1
    ? (lang === "ja" ? `${lifeGyr.toFixed(1)}0億年` : `${lifeGyr.toFixed(1)} Gyr`)
    : (lang === "ja" ? `${(lifeGyr * 1000).toFixed(0)}00万年` : `${(lifeGyr * 1000).toFixed(0)} Myr`);
  ctx.fillText(`${M.toFixed(1)} M☉   ${t.lifeR} ≈ ${lifeStr}`, cw / 2, by + bh + 28);
  ctx.fillStyle = C.cool; ctx.font = `12px ${mono}`;
  ctx.fillText(`${t.lumR} ≈ ${Lrel >= 1000 ? Lrel.toExponential(1) : Lrel.toFixed(Lrel < 10 ? 1 : 0)} L☉`, cw / 2, by + bh + 50);
}

export function FuelAndLifetime() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 200;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [M, setM] = useState(1);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    drawTank(ctx, cw, H, M, lang);
  }, [cw, M, lang]);

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

        <div style={styles.pickerRow}>
          <button onClick={() => setM(1)} style={{ ...styles.chip, ...(Math.abs(M - 1) < 0.05 ? styles.chipOn : {}) }}>{t.sun}</button>
          <button onClick={() => setM(18)} style={{ ...styles.chip, ...(Math.abs(M - 18) < 0.05 ? styles.chipOn : {}) }}>{t.betel}</button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "12px 0 8px" }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.mass}</span>
          <input type="range" min="0.1" max="30" step="0.1" value={M}
            onChange={(e) => setM(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
          <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, width: 62, textAlign: "right" }}>{M.toFixed(1)} M{"☉"}</span>
        </div>

        <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default FuelAndLifetime;
