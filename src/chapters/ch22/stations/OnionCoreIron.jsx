/* ============================================================
   STATION 8 — ONION SHELLS, AN IRON CORE, AND THE END
   A massive star (>8 M☉) fuses heavier and heavier elements in nested shells
   — hydrogen, helium, carbon, neon, oxygen, silicon — each burning hotter and
   closer to the center, building an "onion skin" structure around an inert
   IRON core. This building of elements by fusion is NUCLEOSYNTHESIS, and it
   stops at iron: fusing iron is ENDOTHERMIC, draining energy instead of
   releasing it. With no energy to hold up its weight, the iron core collapses
   catastrophically — the prelude to a supernova. These deaths forge and
   scatter the carbon and iron in planets and in us: we are stardust.
   Grounded in Ch.22 §22.5.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Onion shells & iron",
    kind: "The end of a massive star",
    lede: "Peel through a dying supergiant's layers. Each inner shell fuses a heavier element — until an iron core forms, and fusion turns against the star.",
    thread: "THE STORY ENDS — THE OTHER DEATH",
    threadText: "A massive star dies hard. Layer within layer it fuses ever-heavier elements, racing inward and upward in temperature, until it builds the one ash that cannot burn — and the end comes in seconds.",
    key: "ONION SHELLS, AN IRON CORE, AND THE END",
    keyText: "A massive star (>8 M☉) fuses progressively heavier elements in nested SHELLS — hydrogen, helium, carbon, neon, oxygen, silicon — each burning hotter and nearer the center, forming an ONION-SKIN structure around an inert IRON core. This building of heavier nuclei from lighter ones is NUCLEOSYNTHESIS, and it ends at iron (⁵⁶Fe): fusing iron is ENDOTHERMIC — it absorbs energy instead of releasing it. With no fusion energy to support its enormous weight, the iron core collapses catastrophically, the prelude to a supernova. In that death the carbon forged by triple-alpha and the iron fused in the core are blasted into space, recycled into new stars, planets, and living things. We are stardust.",
    layers: [
      { el: "H → He", c: "#9bb4ff" },
      { el: "He → C", c: "#7fe0d0" },
      { el: "C → Ne", c: "#9be07f" },
      { el: "Ne → O", c: "#e0d27f" },
      { el: "O → Si", c: "#ffab5e" },
      { el: "Si → Fe", c: "#ff7a5a" },
      { el: "Fe (inert)", c: "#c7ccd6" },
    ],
    hotter: "hotter, heavier → inward",
    ironKey: "IRON: fusion turns endothermic → no support → core collapses",
    stardust: "We are stardust.",
    note: "A massive star builds onion-skin shells (H, He, C, Ne, O, Si) by nucleosynthesis around an iron core. Iron fusion is endothermic, so it drains support and the core collapses toward a supernova — scattering the carbon and iron that make planets and life.",
  },
  ja: {
    title: "玉ねぎの殻と鉄",
    kind: "大質量星の最期",
    lede: "死にゆく超巨星の層をむいていこう。内側の殻ほど重い元素を融合する——やがて鉄の核ができ、融合が星に牙をむきます。",
    thread: "物語の終わり——もうひとつの死",
    threadText: "大質量星は激しく死にます。層の中の層で、ますます重い元素を融合し、温度を内へ上へと駆け上がり、ついに燃やせない唯一の灰を作る——そして最期は数秒で訪れます。",
    key: "玉ねぎの殻、鉄の核、そして終わり",
    keyText: "大質量星（>8 M☉）は、入れ子の殻の中で順に重い元素を融合します——水素、ヘリウム、炭素、ネオン、酸素、ケイ素——それぞれ中心に近いほど高温で燃え、不活性な鉄の核の周りに玉ねぎの皮の構造を作ります。軽い原子核から重い原子核を作るこのはたらきが元素合成で、それは鉄（⁵⁶Fe）で終わります：鉄の融合は吸熱的——エネルギーを放出せず吸収します。その巨大な重みを支える融合エネルギーがなくなると、鉄の核は破滅的に崩壊します——超新星の前触れです。その死で、トリプルアルファが作った炭素と核で融合された鉄が宇宙へ吹き飛ばされ、新しい星・惑星・生き物へと再循環されます。私たちは星の塵なのです。",
    layers: [
      { el: "H → He", c: "#9bb4ff" },
      { el: "He → C", c: "#7fe0d0" },
      { el: "C → Ne", c: "#9be07f" },
      { el: "Ne → O", c: "#e0d27f" },
      { el: "O → Si", c: "#ffab5e" },
      { el: "Si → Fe", c: "#ff7a5a" },
      { el: "Fe（不活性）", c: "#c7ccd6" },
    ],
    hotter: "内へ → 高温・重い",
    ironKey: "鉄：融合が吸熱的に → 支えなし → 核が崩壊",
    stardust: "私たちは星の塵。",
    note: "大質量星は元素合成で、鉄の核の周りに玉ねぎの皮の殻（H, He, C, Ne, O, Si）を作ります。鉄の融合は吸熱的なので支えを奪い、核は超新星へと崩壊します——惑星と生命を作る炭素と鉄をまき散らしながら。",
  },
};

function draw(ctx, cw, H, layers, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.42, cy = H * 0.5;
  const maxR = Math.min(cw * 0.42, H * 0.46);
  const n = layers.length;
  // draw concentric rings from outer (H) to inner (Fe)
  for (let i = 0; i < n; i++) {
    const r = maxR * (1 - i / n);
    ctx.fillStyle = layers[i].c;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
    // thin dark divider
    ctx.strokeStyle = "rgba(0,0,0,0.35)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
  }
  // label each layer along a radius to the right
  ctx.textAlign = "left"; ctx.font = `11px ${mono}`;
  for (let i = 0; i < n; i++) {
    const rOuter = maxR * (1 - i / n);
    const rInner = maxR * (1 - (i + 1) / n);
    const rMid = (rOuter + rInner) / 2;
    const lx = cx + maxR + 12;
    const ly = cy - (rMid) + 4;
    // connector
    ctx.strokeStyle = "rgba(180,200,240,0.3)"; ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.moveTo(cx, cy - rMid); ctx.lineTo(lx - 4, ly - 4); ctx.stroke();
    ctx.fillStyle = i === n - 1 ? "#ffffff" : C.muted;
    if (lx + 70 < cw) ctx.fillText(layers[i].el, lx, ly);
  }
  // iron core highlight ring
  const feR = maxR / n;
  ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(cx, cy, feR, 0, Math.PI * 2); ctx.stroke();
  // arrow note: hotter inward
  ctx.fillStyle = C.faint; ctx.font = `10px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.hotter, cx, H - 8);
}

export function OnionCoreIron() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 300;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, t.layers, lang);
  }, [cw, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 08</div>
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

        <div style={{ marginTop: 4 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <div style={{ fontFamily: mono, fontSize: 11.5, color: C.danger, marginTop: 8 }}>{t.ironKey}</div>
        <div style={{ fontFamily: display, fontStyle: "italic", fontSize: 16, color: C.sun, marginTop: 8 }}>{t.stardust}</div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default OnionCoreIron;
