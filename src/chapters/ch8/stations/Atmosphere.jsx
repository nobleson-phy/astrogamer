/* ============================================================
   STATION 5 — THE ATMOSPHERE
   Earth's air is 78% nitrogen, 21% oxygen, with argon, CO2 and
   traces. It is layered: the troposphere (bottom ~10 km) holds
   almost all weather and clouds; the stratosphere above holds the
   ozone (O3) layer that absorbs solar ultraviolet.
   Grounded in Ch.8 §8.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const GASES = [
  { en: "Nitrogen (N₂)", ja: "窒素 (N₂)", pct: 78, col: "#5b8dee" },
  { en: "Oxygen (O₂)", ja: "酸素 (O₂)", pct: 21, col: "#3fe89b" },
  { en: "Argon + CO₂ + trace", ja: "アルゴン＋CO₂＋微量", pct: 1, col: "#c98bff" },
];

const LAYERS = [
  { id: "tropo", en: "Troposphere", ja: "対流圏", y0: 0.62, y1: 1.0, col: "rgba(91,141,238,0.4)",
    en_t: "The bottom ~10 km. Almost all weather, clouds and rain happen here — it holds most of the air's mass.", ja_t: "下から約10 km。ほとんどの天気・雲・雨がここで起こる——大気の質量の大半を含む。" },
  { id: "strato", en: "Stratosphere", ja: "成層圏", y0: 0.34, y1: 0.62, col: "rgba(63,221,255,0.35)",
    en_t: "Above the weather. Home to the OZONE (O₃) layer, which absorbs the Sun's dangerous ultraviolet light.", ja_t: "天気の上。オゾン（O₃）層があり、太陽の危険な紫外線を吸収する。" },
  { id: "meso", en: "Mesosphere+", ja: "中間圏より上", y0: 0.0, y1: 0.34, col: "rgba(201,139,255,0.25)",
    en_t: "Thin upper air fading into space, where meteors burn up and the ionosphere reflects radio waves.", ja_t: "宇宙へ薄れていく上層。流星が燃え尽き、電離層が電波を反射する。" },
];

const STR = {
  en: {
    title: "The atmosphere",
    kind: "What we breathe, and how it's stacked",
    lede: "The air is mostly nitrogen — oxygen is the junior partner. And it isn't one blanket but a stack of layers: weather at the bottom, the ozone shield above. Tap a layer to explore.",
    thread: "THE STORY CONTINUES",
    threadText: "Leaving the solid Earth, we reach its gaseous envelope. Thin as it is, this air makes the planet livable — it carries the weather, and high above it a fragile layer of ozone stands guard against the Sun's ultraviolet.",
    key: "MOSTLY NITROGEN, LAYERED BY ALTITUDE",
    keyText: "Today's atmosphere is about 78% nitrogen (N₂) and 21% oxygen (O₂), with argon, carbon dioxide and traces making up the rest. It is layered: the troposphere (the bottom ~10 km) contains almost all weather and cloud formation and most of the air's mass; above it the stratosphere holds the ozone (O₃) layer, which absorbs solar ultraviolet light and shields life below.",
    compTitle: "Composition (by volume)",
    note: "Left: the mix of gases — nitrogen dominates. Right: the layers by altitude. Weather lives in the troposphere; the ozone (O₃) layer that blocks UV sits in the stratosphere above it.",
    ozone: "ozone (O₃) layer",
  },
  ja: {
    title: "大気",
    kind: "私たちが呼吸するもの、そしてその積み重なり方",
    lede: "空気の大半は窒素——酸素は脇役です。そして一枚の毛布ではなく、層の積み重ね：下に天気、その上にオゾンの盾。層をタップして調べよう。",
    thread: "物語はつづく",
    threadText: "固い地球を離れ、その気体の外殻に至ります。薄いながらこの空気が惑星を住める場所にします——天気を運び、そのはるか上では、はかないオゾンの層が太陽の紫外線から見張っています。",
    key: "大半は窒素、高度で層をなす",
    keyText: "現在の大気は約78%が窒素（N₂）、21%が酸素（O₂）で、残りをアルゴン・二酸化炭素・微量成分が占めます。層構造をもち、対流圏（下から約10 km）にはほとんどの天気と雲、そして大気の質量の大半が含まれます。その上の成層圏にはオゾン（O₃）層があり、太陽の紫外線を吸収して下の生命を守ります。",
    compTitle: "組成（体積比）",
    note: "左：気体の割合——窒素が支配的。右：高度による層。天気は対流圏に、UVを遮るオゾン（O₃）層はその上の成層圏にあります。",
    ozone: "オゾン（O₃）層",
  },
};

function draw(ctx, cw, H, sel, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // LEFT: composition stacked bar
  const bx = 24, bw = 46, by = 26, bh = H - 60;
  let y = by;
  GASES.forEach((g) => {
    const h = bh * (g.pct / 100);
    ctx.fillStyle = g.col; ctx.fillRect(bx, y, bw, h);
    ctx.fillStyle = "#0a0e1c"; ctx.font = `700 12px ${mono}`; ctx.textAlign = "center";
    if (h > 18) ctx.fillText(g.pct + "%", bx + bw / 2, y + h / 2 + 4);
    y += h;
  });
  ctx.strokeStyle = "rgba(150,175,230,0.35)"; ctx.strokeRect(bx, by, bw, bh);
  ctx.fillStyle = C.faint; ctx.font = `10px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(t.compTitle, bx, by - 8);
  // legend
  let ly = by + 6;
  GASES.forEach((g) => { ctx.fillStyle = g.col; ctx.fillRect(bx + bw + 14, ly, 10, 10); ctx.fillStyle = C.muted; ctx.font = `10.5px ${mono}`; ctx.textAlign = "left"; ctx.fillText(lang === "ja" ? g.ja : g.en, bx + bw + 28, ly + 9); ly += 20; });

  // RIGHT: layered atmosphere
  const rx = cw * 0.52, rw = cw - rx - 20, ry0 = 20, ry1 = H - 16;
  // ground
  ctx.fillStyle = "#6b5a45"; ctx.fillRect(rx, ry1, rw, 6);
  LAYERS.forEach((L) => {
    const y0 = ry0 + L.y0 * (ry1 - ry0), y1 = ry0 + L.y1 * (ry1 - ry0);
    ctx.fillStyle = L.col; ctx.fillRect(rx, y0, rw, y1 - y0);
    if (L.id === sel) { ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.strokeRect(rx, y0, rw, y1 - y0); }
    ctx.fillStyle = C.text; ctx.font = `${L.id === sel ? "700 " : ""}12px ${mono}`; ctx.textAlign = "left";
    ctx.fillText(lang === "ja" ? L.ja : L.en, rx + 8, (y0 + y1) / 2 + 4);
  });
  // ozone band marker in stratosphere
  const sL = LAYERS[1];
  const oy = ry0 + ((sL.y0 + sL.y1) / 2) * (ry1 - ry0);
  ctx.strokeStyle = "#3fe89b"; ctx.lineWidth = 2; ctx.setLineDash([4, 3]);
  ctx.beginPath(); ctx.moveTo(rx, oy); ctx.lineTo(rx + rw, oy); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = "#3fe89b"; ctx.font = `10px ${mono}`; ctx.textAlign = "right"; ctx.fillText(t.ozone, rx + rw - 4, oy - 4);
  // weather cloud in troposphere
  const tL = LAYERS[0];
  const wy = ry0 + ((tL.y0 + tL.y1) / 2) * (ry1 - ry0) + 10;
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.beginPath(); ctx.arc(rx + rw * 0.4, wy, 8, 0, Math.PI * 2); ctx.arc(rx + rw * 0.5, wy - 3, 10, 0, Math.PI * 2); ctx.arc(rx + rw * 0.6, wy, 8, 0, Math.PI * 2); ctx.fill();
}

export function Atmosphere() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 280;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [sel, setSel] = useState("strato");
  const L = LAYERS.find((x) => x.id === sel);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, sel, lang);
  }, [cw, sel, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 05</div>
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
          {LAYERS.map((x) => (
            <button key={x.id} onClick={() => setSel(x.id)}
              style={{ ...styles.chip, ...(sel === x.id ? styles.chipOn : {}) }}>{lang === "ja" ? x.ja : x.en}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.5, marginTop: 8 }}>{lang === "ja" ? L.ja_t : L.en_t}</p>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default Atmosphere;
