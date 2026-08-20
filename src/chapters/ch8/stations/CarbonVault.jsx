/* ============================================================
   STATION 7 — AIR & THE CARBON VAULT
   Earth's atmosphere is thin (1 bar) only because most of its
   volatiles are locked away: water in the oceans and CO2 in
   carbonate rocks. Boil the oceans and water vapour alone would
   press down at ~300 bars; bake all the carbonate rock and it
   would release ~70 bars of CO2 — a Venus-like inferno.
   Grounded in Ch.8 §8.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const BASE = 1, OCEAN = 300, CARB = 70;

const STR = {
  en: {
    title: "Air & the carbon vault",
    kind: "Why our sky isn't a Venusian inferno",
    lede: "Earth's air feels light — one bar of mostly nitrogen. But that's only because our water and carbon are locked away. Release them and watch the pressure gauge explode.",
    thread: "THE STORY CONTINUES",
    threadText: "Earth and Venus were born with similar ingredients, yet Venus bakes under 90 bars of CO2. The difference is where the volatiles ended up: on Earth, most are hidden in the oceans and in solid rock, leaving the air thin and mild.",
    key: "MOST OF THE AIR IS LOCKED IN ROCK AND SEA",
    keyText: "Our atmosphere is a thin ~1 bar because Earth's volatiles are stored, not airborne. If the oceans boiled away, water vapour — which weighs the same as liquid water — would load the sky with roughly 300 bars of pressure. And if all the sedimentary carbonate rock were heated and decomposed, it would release about 70 bars of carbon dioxide, a runaway greenhouse like Venus. Earth stays temperate only because these vaults keep the volatiles out of the air.",
    releaseO: "Boil the oceans (+300 bar H₂O)", releaseC: "Bake the carbonates (+70 bar CO₂)",
    totalL: "Total surface pressure", bars: "bars", now: "now", venus: "Venus ≈ 90 bar",
    note: "The gauge is logarithmic. Today Earth sits near 1 bar. Boiling the oceans would add ~300 bars of water vapour; decomposing all carbonate rock would add ~70 bars of CO₂ — showing how much of our atmosphere is safely locked in the sea and the crust.",
  },
  ja: {
    title: "大気と炭素の金庫",
    kind: "私たちの空が金星の灼熱でない理由",
    lede: "地球の空気は軽く感じます——大半が窒素の1気圧。でもそれは水と炭素が閉じ込められているからにすぎません。それらを放てば、圧力計が振り切れる様子を見よう。",
    thread: "物語はつづく",
    threadText: "地球と金星は似た材料で生まれましたが、金星は90気圧のCO2の下で焼けています。違いは揮発性物質の行き先です：地球では大半が海と固い岩石に隠れ、空気を薄く穏やかに保っています。",
    key: "大気の大半は岩石と海に閉じ込められている",
    keyText: "私たちの大気が薄い約1気圧なのは、地球の揮発性物質が大気中ではなく蓄えられているからです。もし海が蒸発すれば、水蒸気は——液体の水と同じ重さなので——空を約300気圧の圧力で満たします。そしてすべての堆積炭酸塩岩を加熱して分解すれば、約70気圧の二酸化炭素を放ち、金星のような暴走温室になります。地球が温暖でいられるのは、これらの金庫が揮発性物質を空気の外に保つからです。",
    releaseO: "海を沸騰させる（＋300気圧 H₂O）", releaseC: "炭酸塩を焼く（＋70気圧 CO₂）",
    totalL: "地表の総圧力", bars: "気圧", now: "現在", venus: "金星 ≈ 90気圧",
    note: "圧力計は対数目盛です。現在の地球は約1気圧。海を沸騰させると約300気圧の水蒸気、すべての炭酸塩岩を分解すると約70気圧のCO₂が加わります——大気のどれだけが海と地殻に安全に閉じ込められているかがわかります。",
  },
};

function draw(ctx, cw, H, total, oceans, carb, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const padL = 30, padR = 20, y = H / 2 + 10, barH = 44;
  const bw = cw - padL - padR;
  // log scale 1 .. 500
  const lx = (p) => padL + (Math.log10(Math.max(1, p)) / Math.log10(500)) * bw;
  // track
  ctx.fillStyle = "rgba(120,150,210,0.15)"; ctx.fillRect(padL, y, bw, barH);
  // stacked segments: base (nitrogen etc), oceans, carbonates
  let cur = BASE;
  const seg = (from, to, col, label) => {
    const x0 = lx(from), x1 = lx(to);
    ctx.fillStyle = col; ctx.fillRect(x0, y, x1 - x0, barH);
    if (x1 - x0 > 34) { ctx.fillStyle = "#0a0e1c"; ctx.font = `700 11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(label, (x0 + x1) / 2, y + barH / 2 + 4); }
  };
  seg(0.001, BASE, "#5b8dee", "N₂ 1");
  if (carb) { seg(cur, cur + CARB, "#c98bff", "+CO₂ 70"); cur += CARB; }
  if (oceans) { seg(cur, cur + OCEAN, "#3fddff", "+H₂O 300"); cur += OCEAN; }
  ctx.strokeStyle = "rgba(150,175,230,0.35)"; ctx.strokeRect(padL, y, bw, barH);
  // ticks
  ctx.fillStyle = C.faint; ctx.font = `10px ${mono}`; ctx.textAlign = "center";
  [1, 10, 90, 100, 500].forEach((p) => { const x = lx(p); ctx.strokeStyle = "rgba(150,175,230,0.2)"; ctx.beginPath(); ctx.moveTo(x, y - 4); ctx.lineTo(x, y + barH + 4); ctx.stroke(); ctx.fillStyle = C.faint; ctx.fillText(String(p), x, y + barH + 16); });
  // Venus marker
  const vx = lx(90); ctx.strokeStyle = "#ffcf6b"; ctx.setLineDash([4, 3]); ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(vx, y - 18); ctx.lineTo(vx, y); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = "#ffcf6b"; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.venus, vx, y - 22);
  // now marker
  const nx = lx(1); ctx.fillStyle = C.good; ctx.font = `10px ${mono}`; ctx.textAlign = "left"; ctx.fillText("← " + t.now, nx + 3, y - 6);
  // total readout
  ctx.fillStyle = C.text; ctx.font = `700 16px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.totalL + ": " + Math.round(total).toLocaleString() + " " + t.bars, cw / 2, 30);
}

export function CarbonVault() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 220;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [oceans, setOceans] = useState(false);
  const [carb, setCarb] = useState(false);
  const total = BASE + (oceans ? OCEAN : 0) + (carb ? CARB : 0);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, total, oceans, carb, lang);
  }, [cw, total, oceans, carb, lang]);

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

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          <button onClick={() => setCarb((v) => !v)} style={{ ...styles.chip, ...(carb ? styles.chipOn : {}), borderColor: carb ? C.violet : undefined }}>{t.releaseC}</button>
          <button onClick={() => setOceans((v) => !v)} style={{ ...styles.chip, ...(oceans ? styles.chipOn : {}), borderColor: oceans ? C.cool : undefined }}>{t.releaseO}</button>
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default CarbonVault;
