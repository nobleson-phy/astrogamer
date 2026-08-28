/* ============================================================
   STATION 2 — VENUS'S CRUSHING AIR
   Venus's atmosphere is 96% CO2 (with ~3.5% nitrogen). At the
   surface it presses down at 90 bars — like being 900 m deep in
   Earth's ocean. High up (30–60 km) float thick clouds of sulfuric
   acid droplets. The surface simmers at 730 K (over 850 °F).
   Grounded in Ch.10 §10.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Venus's crushing air",
    kind: "90 bars of carbon dioxide",
    lede: "Stand on Venus and the air itself would crush and cook you. Ride the column down from the acid clouds to the searing rock, and read off the numbers at each level.",
    thread: "THE STORY CONTINUES",
    threadText: "The clouds that hide Venus are not water — and the air beneath them is nothing like ours. Venus took the same ingredients as Earth and built an atmosphere that is lethal in every way.",
    key: "96% CO₂, 90 BARS, 730 K",
    keyText: "Venus's atmosphere is about 96% carbon dioxide and 3.5% nitrogen. It is staggeringly heavy: the surface pressure is 90 bars, ninety times Earth's — the same crushing squeeze you'd feel about 900 metres deep in the ocean. The thick, reflective cloud deck at 30–60 km is made of droplets of sulfuric acid, not water. And the whole surface bakes at 730 K (over 850 °F), hotter than a self-cleaning oven — hot enough to melt lead.",
    depthL: "Altitude", show: "Drag down through the atmosphere:",
    clouds: "sulfuric-acid clouds", haze: "clear, dense CO₂", surface: "surface",
    pressL: "Pressure", tempL: "Temperature", compL: "96% CO₂ · 3.5% N₂",
    note: "Venus's air is mostly CO₂, tops out in sulfuric-acid clouds, and reaches 90 bars and 730 K at the ground — a pressure like the deep ocean and a heat that melts lead.",
  },
  ja: {
    title: "金星の押しつぶす大気",
    kind: "90気圧の二酸化炭素",
    lede: "金星に立てば、空気そのものがあなたを押しつぶし、焼き尽くします。酸の雲から灼熱の岩まで、大気の柱を降りて、各高度の数値を読み取ろう。",
    thread: "物語はつづく",
    threadText: "金星を隠す雲は水ではなく——その下の空気は私たちのものとはまるで違います。金星は地球と同じ材料から、あらゆる意味で致命的な大気をつくりました。",
    key: "96% CO₂、90気圧、730 K",
    keyText: "金星の大気は約96%が二酸化炭素、3.5%が窒素です。とてつもなく重く、地表の気圧は90気圧——地球の90倍で、海の深さ約900メートルで感じる締めつけと同じです。高度30〜60 kmの厚く反射する雲は、水ではなく硫酸の粒でできています。そして地表全体が730 K（華氏850度超）で焼け——自動洗浄オーブンより熱く、鉛を溶かすほどです。",
    depthL: "高度", show: "大気を下へドラッグ：",
    clouds: "硫酸の雲", haze: "澄んだ高密度CO₂", surface: "地表",
    pressL: "気圧", tempL: "温度", compL: "96% CO₂ · 3.5% N₂",
    note: "金星の空気は大半がCO₂、上部は硫酸の雲、地表では90気圧・730 Kに達します——深海のような圧力と、鉛を溶かす熱です。",
  },
};

// altitude 0 (surface) .. 1 (top ~70km). Returns pressure (bar) and temp (K).
function press(alt) { return 90 * Math.exp(-alt * 4.6); } // 90 bar at surface -> ~0.9 at top
function temp(alt) { return 730 - alt * 500; }            // 730 K surface -> ~230 K top

function draw(ctx, cw, H, probe, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const colX = cw * 0.3, colW = cw * 0.4, top = 16, bot = H - 20;
  // atmosphere column gradient
  const g = ctx.createLinearGradient(0, top, 0, bot);
  g.addColorStop(0, "#c9b47a"); g.addColorStop(0.45, "#e8d9a8"); g.addColorStop(0.7, "#d8a860"); g.addColorStop(1, "#8a4a2a");
  ctx.fillStyle = g; ctx.fillRect(colX, top, colW, bot - top);
  // cloud band 30-60 km ~ alt 0.43..0.86 (from top): map alt->y (alt 1=top)
  const yOf = (alt) => bot - alt * (bot - top);
  ctx.fillStyle = "rgba(230,225,180,0.6)"; ctx.fillRect(colX, yOf(0.86), colW, yOf(0.43) - yOf(0.86));
  ctx.fillStyle = "#8a7a3a"; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.clouds, colX + colW / 2, yOf(0.65));
  // surface
  ctx.fillStyle = "#6b3a1c"; ctx.fillRect(colX, yOf(0.02), colW, bot - yOf(0.02));
  ctx.fillStyle = "#ffcf6b"; ctx.fillText(t.surface, colX + colW / 2, bot - 4);
  ctx.strokeStyle = "rgba(150,175,230,0.35)"; ctx.strokeRect(colX, top, colW, bot - top);
  // probe marker
  const py = yOf(probe);
  ctx.strokeStyle = C.good; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(colX - 8, py); ctx.lineTo(colX + colW + 8, py); ctx.stroke();
  ctx.fillStyle = C.good; ctx.beginPath(); ctx.arc(colX - 8, py, 4, 0, Math.PI * 2); ctx.fill();
  // readouts on the right
  const p = press(probe), tk = temp(probe);
  ctx.textAlign = "left"; ctx.font = `12px ${mono}`;
  const rx = colX + colW + 22;
  ctx.fillStyle = C.faint; ctx.fillText(t.pressL, rx, py - 6);
  ctx.fillStyle = C.sun; ctx.font = `700 16px ${mono}`; ctx.fillText(p >= 10 ? Math.round(p) + " bar" : p.toFixed(1) + " bar", rx, py + 12);
  ctx.fillStyle = C.faint; ctx.font = `12px ${mono}`; ctx.fillText(t.tempL, rx, py + 30);
  ctx.fillStyle = C.danger; ctx.font = `700 16px ${mono}`; ctx.fillText(Math.round(tk) + " K", rx, py + 48);
  // altitude label on the left
  ctx.textAlign = "right"; ctx.fillStyle = C.cool; ctx.font = `11px ${mono}`;
  ctx.fillText(Math.round(probe * 70) + " km", colX - 14, py + 4);
  // composition tag
  ctx.textAlign = "center"; ctx.fillStyle = C.muted; ctx.font = `11px ${mono}`; ctx.fillText(t.compL, colX + colW / 2, top - 4);
}

export function VenusAir() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 300;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [probe, setProbe] = useState(0.02); // altitude fraction; start at surface

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, probe, lang);
  }, [cw, probe, lang]);

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

        <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginBottom: 2 }}>{t.show}</div>
        <input type="range" min={0.02} max={1} step={0.01} value={probe} onChange={(e) => setProbe(parseFloat(e.target.value))} style={styles.range} />
        <div style={styles.rangeEnds}><span>{t.surface} · 0 km</span><span>70 km</span></div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default VenusAir;
