/* ============================================================
   STATION 3 — INSIDE JUPITER
   Descend through Jupiter: molecular hydrogen gas gives way, under
   crushing pressure, to LIQUID METALLIC HYDROGEN — a conductor whose
   currents generate Jupiter's colossal magnetic field — above a small
   rock/ice core. Jupiter radiates more heat than it receives (from
   slow gravitational contraction), yet is far too small to fuse
   hydrogen, so it is a planet, not a star. Grounded in Ch.11 §11.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const LAYERS = [
  { id: "atm", en: "Cloud tops & molecular H₂", ja: "雲頂と分子状水素 H₂", r0: 0.86, r1: 1.0, col: "#e0a86a",
    en_i: "The visible weather layer: hydrogen and helium gas with ammonia clouds.", ja_i: "見える気象層：水素とヘリウムのガスにアンモニアの雲。" },
  { id: "metal", en: "Liquid metallic hydrogen", ja: "液体金属水素", r0: 0.25, r1: 0.86, col: "#8a6bd0",
    en_i: "Under immense pressure hydrogen becomes a liquid metal — an electrical conductor whose swirling currents generate Jupiter's enormous magnetic field.", ja_i: "巨大な圧力で水素は液体金属になる——電気を通す導体で、その渦巻く流れが木星の巨大な磁場を生む。" },
  { id: "core", en: "Rock & ice core", ja: "岩石と氷の核", r0: 0.0, r1: 0.25, col: "#c96b4a",
    en_i: "A dense core of rock and ice — only a few percent of Jupiter's mass, unlike the ice giants where the core is most of the mass.", ja_i: "岩石と氷の密度の高い核——木星の質量のわずか数%。核が質量の大半を占める氷の巨人とは違う。" },
];

const STR = {
  en: {
    title: "Inside Jupiter",
    kind: "Metallic hydrogen and a warm heart",
    lede: "There is no surface to stand on — just gas thickening into liquid, then metal. Descend through the layers to find the conductor that powers Jupiter's magnetism, and ask why this giant never became a star.",
    thread: "THE STORY CONTINUES",
    threadText: "Sink into Jupiter and pressure does strange things to simple hydrogen. Deep down it stops behaving like a gas at all — and in doing so, wraps the planet in the strongest magnetic field of any world.",
    key: "LIQUID METALLIC HYDROGEN MAKES THE MAGNETISM",
    keyText: "Below Jupiter's clouds, hydrogen gas is squeezed into a liquid, and deeper still into LIQUID METALLIC HYDROGEN — a state so compressed it conducts electricity like a metal. Its churning currents generate Jupiter's colossal magnetic field. At the centre sits a rock-and-ice core of only a few percent of the mass. Jupiter also glows with its own heat, radiating more energy than it receives from the Sun — leftover warmth from its slow gravitational contraction. But it is far too small (a true star needs at least ~1/12 the Sun's mass) to fuse hydrogen, so Jupiter is a planet, not a star.",
    fieldOn: "Magnetic field", star: "Fusion?", starNo: "no — mass far too low",
    note: "Jupiter's magnetism comes from currents in its liquid metallic hydrogen; its warmth comes from gravitational contraction. Neither makes it a star — it lacks the mass to ignite fusion.",
  },
  ja: {
    title: "木星の内部",
    kind: "金属水素と、暖かい心臓",
    lede: "立てる地面はありません——ガスが液体に、そして金属に厚くなるだけ。層を降りて、木星の磁気を動かす導体を見つけ、なぜこの巨人が星にならなかったかを問おう。",
    thread: "物語はつづく",
    threadText: "木星に沈むと、圧力が単純な水素に奇妙なことをします。深部では水素はガスとして振る舞うのをやめ——そうすることで、あらゆる世界で最強の磁場を惑星にまといます。",
    key: "液体金属水素が磁気をつくる",
    keyText: "木星の雲の下で、水素ガスは液体に、さらに深くでは液体金属水素——電気を金属のように通すほど圧縮された状態——に押し込まれます。そのかき混ざる流れが木星の巨大な磁場を生みます。中心には、質量のわずか数%の岩石と氷の核があります。木星は自らの熱でも輝き、太陽から受けるより多くのエネルギーを放射します——ゆっくりした重力収縮の名残の暖かさです。しかし水素を核融合するにはあまりに小さく（真の星は太陽の少なくとも約1/12の質量が必要）、だから木星は星ではなく惑星なのです。",
    fieldOn: "磁場", star: "核融合は？", starNo: "いいえ——質量が低すぎる",
    note: "木星の磁気は液体金属水素の中の流れから、暖かさは重力収縮から生まれます。どちらも木星を星にはしません——核融合を起こす質量がないのです。",
  },
};

function draw(ctx, cw, H, sel, tt, lang) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.4, cy = H / 2, R = Math.min(cw * 0.32, H * 0.44);
  // magnetic field lines (from the metallic layer)
  if (sel === "metal") {
    ctx.strokeStyle = "rgba(138,107,208,0.5)"; ctx.lineWidth = 1.4;
    for (const s of [1, -1]) for (const k of [1.2, 1.5]) {
      ctx.beginPath(); ctx.ellipse(cx, cy, R * k, R * k * 1.35, 0, s > 0 ? -0.5 : Math.PI - 0.5, s > 0 ? 0.5 : Math.PI + 0.5); ctx.stroke();
    }
  }
  for (const L of LAYERS) {
    const on = L.id === sel;
    const g = ctx.createRadialGradient(cx - R * 0.25, cy - R * 0.25, R * L.r0, cx, cy, R * L.r1);
    g.addColorStop(0, L.col); g.addColorStop(1, shade(L.col, -0.28));
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * L.r1, 0, Math.PI * 2); ctx.fill();
    if (on) { ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, R * L.r1, 0, Math.PI * 2); ctx.stroke(); }
  }
  // heat glow (radiates more than it receives)
  ctx.fillStyle = `rgba(255,140,60,${0.12 + 0.05 * Math.sin(tt * 0.05)})`;
  ctx.beginPath(); ctx.arc(cx, cy, R + 6, 0, Math.PI * 2); ctx.fill();
  // callouts
  const lx = cx + R + 22; ctx.textAlign = "left";
  LAYERS.forEach((L, i) => {
    const y = 46 + i * ((H - 80) / LAYERS.length);
    const on = L.id === sel;
    ctx.fillStyle = L.col; ctx.fillRect(lx, y - 9, 12, 12);
    ctx.fillStyle = on ? C.text : C.muted; ctx.font = `${on ? "700 " : ""}12px ${mono}`;
    ctx.fillText(lang === "ja" ? L.ja : L.en, lx + 18, y + 1);
  });
}
function shade(hex, amt) { const n = parseInt(hex.slice(1), 16); let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255; r = Math.max(0, Math.min(255, r + amt * 255)); g = Math.max(0, Math.min(255, g + amt * 255)); b = Math.max(0, Math.min(255, b + amt * 255)); return `rgb(${r | 0},${g | 0},${b | 0})`; }

export function InsideJupiter() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 280;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [sel, setSel] = useState("metal");
  const selRef = useRef(sel); selRef.current = sel;
  const L = LAYERS.find((x) => x.id === sel);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, sel, 0, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, selRef.current, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

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

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {LAYERS.map((x) => (
            <button key={x.id} onClick={() => setSel(x.id)}
              style={{ ...styles.chip, ...(sel === x.id ? styles.chipOn : {}), borderColor: sel === x.id ? x.col : undefined }}>{lang === "ja" ? x.ja : x.en}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.5, marginTop: 8 }}>{lang === "ja" ? L.ja_i : L.en_i}</p>
        <div style={{ fontFamily: mono, fontSize: 12.5, color: C.faint, marginTop: 4 }}>{t.star} <span style={{ color: C.danger }}>{t.starNo}</span></div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default InsideJupiter;
