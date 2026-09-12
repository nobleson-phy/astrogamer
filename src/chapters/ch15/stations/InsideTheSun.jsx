/* ============================================================
   STATION 1 — INSIDE THE SUN
   A cutaway of the Sun: energy is made in the core by fusion, carried
   out slowly through the radiative zone, then churned up through the
   convective zone, and finally radiated from the visible photosphere
   at about 5,800 K. By mass the Sun is ~98% hydrogen and helium. It is
   an ordinary "garden-variety" star — an up-close laboratory for all
   the distant stars we cannot resolve. Grounded in Ch.15 §15.1–15.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const LAYERS = [
  { id: "core", r: 0.25, col: "#fff2c0", en: "Core", ja: "核", temp: "~15,000,000 K",
    en_d: "Nuclear fusion turns hydrogen into helium here, releasing the Sun's energy.", ja_d: "ここで核融合が水素をヘリウムに変え、太陽のエネルギーを放出する。" },
  { id: "radiative", r: 0.5, col: "#ffcf6b", en: "Radiative zone", ja: "放射層", temp: "~7,000,000 K",
    en_d: "Energy creeps outward as photons are absorbed and re-emitted, taking many thousands of years.", ja_d: "光子が吸収と再放出を繰り返して外へ這い進み、何千年もかかる。" },
  { id: "convective", r: 0.82, col: "#ff9a52", en: "Convective zone", ja: "対流層", temp: "~2,000,000 K",
    en_d: "Hot gas rises and cool gas sinks in giant churning cells, carrying heat to the surface.", ja_d: "熱いガスが上がり冷たいガスが沈む巨大な対流セルが、熱を表面へ運ぶ。" },
  { id: "photosphere", r: 1.0, col: "#ffe08a", en: "Photosphere", ja: "光球", temp: "~5,800 K",
    en_d: "The visible 'surface' at about 5,800 K, from which sunlight escapes into space.", ja_d: "約5,800 Kの目に見える「表面」で、ここから太陽光が宇宙へ逃げ出す。" },
];

const STR = {
  en: {
    title: "Inside the Sun",
    kind: "A cutaway of our star",
    lede: "Slice the Sun open. Tap each layer to travel from the fusion furnace at the core out to the glowing surface — and see how the temperature falls along the way.",
    thread: "THE STORY BEGINS",
    threadText: "The Sun is the one star we can examine up close — an ordinary, 'garden-variety' star that serves as a laboratory for understanding all the distant suns we can only see as points of light.",
    key: "A FUSION CORE, WRAPPED IN HYDROGEN AND HELIUM",
    keyText: "Energy is generated in the Sun's core by nuclear fusion, then carried outward slowly through the radiative zone, churned up through the convective zone, and finally released from the visible photosphere at about 5,800 K. By mass, the Sun is roughly 98% hydrogen and helium. It is an ordinary star of typical mass, size and temperature — which is exactly why it is so valuable: it is an up-close laboratory for interpreting the light of the countless distant stars we cannot resolve.",
    tempL: "Temperature", compL: "Composition by mass: ~98% hydrogen + helium",
    note: "Fusion in the core, energy carried out through radiative and convective zones, then released at the ~5,800 K photosphere. By mass the Sun is ~98% hydrogen and helium — a garden-variety star.",
  },
  ja: {
    title: "太陽の内部",
    kind: "私たちの星の断面",
    lede: "太陽を切り開こう。各層をタップして、核の核融合炉から輝く表面まで旅し——道中で温度がどう下がるかを見よう。",
    thread: "物語のはじまり",
    threadText: "太陽は、私たちが間近で調べられる唯一の星です——ありふれた普通の星で、点にしか見えない遠くの太陽たちを理解するための実験室になります。",
    key: "核融合の核を、水素とヘリウムが包む",
    keyText: "エネルギーは太陽の核で核融合により生成され、放射層をゆっくり外へ運ばれ、対流層でかき混ぜられ、最後に約5,800 Kの目に見える光球から放出されます。質量では、太陽はおよそ98%が水素とヘリウムです。典型的な質量・大きさ・温度の普通の星で——だからこそ貴重です：分解できない無数の遠くの星の光を読み解くための、間近な実験室なのです。",
    tempL: "温度", compL: "質量での組成：約98%が水素＋ヘリウム",
    note: "核で核融合、放射層と対流層でエネルギーを外へ運び、約5,800 Kの光球で放出。質量で太陽は約98%が水素とヘリウム——ありふれた星です。",
  },
};

function draw(ctx, cw, H, sel, lang) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.36, cy = H / 2, R = Math.min(cw * 0.3, H * 0.46);
  // draw layers outer to inner
  for (let i = LAYERS.length - 1; i >= 0; i--) {
    const L = LAYERS[i];
    const g = ctx.createRadialGradient(cx, cy, L.r * R * 0.3, cx, cy, L.r * R);
    g.addColorStop(0, L.col); g.addColorStop(1, i === 0 ? L.col : "rgba(0,0,0,0.12)");
    ctx.fillStyle = L.col; ctx.beginPath(); ctx.arc(cx, cy, L.r * R, 0, Math.PI * 2); ctx.fill();
    if (L.id === sel) { ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, L.r * R, 0, Math.PI * 2); ctx.stroke(); }
  }
  // labels with leader lines to the right
  ctx.font = `10px ${mono}`; ctx.textAlign = "left";
  LAYERS.forEach((L, i) => {
    const on = L.id === sel;
    const ly = cy - R + (i + 0.5) * (2 * R / LAYERS.length);
    const edgeR = (i === 0 ? 0.12 : (LAYERS[i - 1].r + L.r) / 2) * R;
    ctx.strokeStyle = on ? "rgba(255,255,255,0.6)" : "rgba(150,175,230,0.3)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cx + edgeR, cy - (i - 1.5) * 6); ctx.lineTo(cx + R + 14, ly); ctx.stroke();
    ctx.fillStyle = on ? C.text : C.muted;
    ctx.fillText(`${lang === "ja" ? L.ja : L.en} · ${L.temp}`, cx + R + 18, ly);
  });
}

export function InsideTheSun() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [sel, setSel] = useState("core");
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

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {LAYERS.map((x) => (
            <button key={x.id} onClick={() => setSel(x.id)}
              style={{ ...styles.chip, ...(sel === x.id ? styles.chipOn : {}) }}>{lang === "ja" ? x.ja : x.en}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.5, marginTop: 8 }}>
          <b style={{ color: C.text }}>{lang === "ja" ? L.ja : L.en}</b> · {L.temp} — {lang === "ja" ? L.ja_d : L.en_d}
        </p>
        <div style={{ fontFamily: mono, fontSize: 11.5, color: C.cool, marginTop: 4 }}>{t.compL}</div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default InsideTheSun;
