/* ============================================================
   STATION 1 — THE SUN'S FAMILY
   The Sun holds 99.8% of all the mass in the solar system; every
   planet, moon, asteroid and comet together is the leftover 0.2%.
   Grounded in Ch.7 §7.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The Sun's family",
    kind: "One star, and a scattering of crumbs",
    lede: "Picture the whole solar system on one set of scales. Almost every gram of it is the Sun. Switch the view between the great mass balance and the cast of characters that share the leftover sliver.",
    thread: "THE STORY BEGINS",
    threadText: "Before we meet the planets one by one, it helps to see the family portrait — and to feel just how lopsided it is. One member outweighs all the others combined, thousands of times over.",
    key: "THE SUN IS 99.8% OF EVERYTHING",
    keyText: "The Sun contains about 99.8% of the total mass of the solar system. All eight planets, every moon, dwarf planet, asteroid and comet together make up barely 0.2% — and of that thin slice, Jupiter alone is most of it. The Sun's gravity, born of that mass, rules every orbit.",
    viewMass: "Mass balance", viewFamily: "The family",
    sun: "Sun", rest: "everything else", restZoom: "the 0.2%, magnified",
    jupiter: "Jupiter", otherP: "the other 7 planets + all small bodies",
    terr: "terrestrial", giants: "giants", belts: "small bodies",
    note: "The Sun holds 99.8% of the mass; the other 0.2% — magnified here about 500× — is mostly Jupiter. The lower schematic lays out the members from the Sun outward.",
  },
  ja: {
    title: "太陽の一家",
    kind: "一つの恒星と、こぼれた欠片たち",
    lede: "太陽系全体を一つの天秤にのせてみよう。そのほとんど全ての重さは太陽です。大きな質量のつり合いと、残りわずかな部分を分け合う面々とで、表示を切り替えてみよう。",
    thread: "物語のはじまり",
    threadText: "惑星を一つずつ見ていく前に、家族の集合写真を眺めておくと役立ちます——そしてそのいびつさを実感しておきましょう。一人のメンバーが、他の全員を合わせたよりも何千倍も重いのです。",
    key: "太陽が全体の99.8%",
    keyText: "太陽は太陽系の総質量の約99.8%を占めます。8つの惑星、すべての衛星・準惑星・小惑星・彗星を合わせても、わずか0.2%ほど——そしてその薄い一切れの大半は木星一つです。その質量から生まれる太陽の重力が、あらゆる軌道を支配します。",
    viewMass: "質量のつり合い", viewFamily: "一家の面々",
    sun: "太陽", rest: "その他すべて", restZoom: "0.2%を拡大",
    jupiter: "木星", otherP: "残り7惑星＋すべての小天体",
    terr: "地球型", giants: "巨大惑星", belts: "小天体",
    note: "太陽が質量の99.8%を占め、残り0.2%（ここでは約500倍に拡大）の大半は木星です。下の図は太陽から外へと並ぶ面々を示しています。",
  },
};

function drawMass(ctx, cw, H, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const padX = 30, barW = cw - padX * 2, barY = 54, barH = 46;
  // main bar: Sun 99.8% vs rest 0.2%
  const sunW = barW * 0.998;
  const sg = ctx.createLinearGradient(padX, 0, padX + sunW, 0);
  sg.addColorStop(0, "#ffd23d"); sg.addColorStop(1, "#ff9e2c");
  ctx.fillStyle = sg; ctx.fillRect(padX, barY, sunW, barH);
  ctx.fillStyle = C.cool; ctx.fillRect(padX + sunW, barY, Math.max(2, barW - sunW), barH);
  ctx.strokeStyle = "rgba(150,175,230,0.4)"; ctx.lineWidth = 1; ctx.strokeRect(padX, barY, barW, barH);
  ctx.font = `700 15px ${mono}`; ctx.textAlign = "left"; ctx.fillStyle = "#3a2500";
  ctx.fillText(`${t.sun} · 99.8%`, padX + 12, barY + 28);
  ctx.textAlign = "center"; ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`;
  ctx.fillText(`${t.rest} · 0.2%`, padX + sunW, barY - 8);
  // pointer down to the zoom bar
  ctx.strokeStyle = "rgba(63,221,255,0.5)"; ctx.setLineDash([4, 3]);
  ctx.beginPath(); ctx.moveTo(padX + sunW, barY + barH); ctx.lineTo(padX + sunW, barY + barH + 20);
  ctx.lineTo(padX, barY + barH + 30); ctx.moveTo(padX + sunW, barY + barH + 20); ctx.lineTo(padX + barW, barY + barH + 30); ctx.stroke();
  ctx.setLineDash([]);
  // zoom bar: within the 0.2%, Jupiter dominates (~71% of planet mass)
  const zY = barY + barH + 30, zH = 40;
  const jW = barW * 0.71;
  ctx.fillStyle = "#e0a05a"; ctx.fillRect(padX, zY, jW, zH);
  ctx.fillStyle = "rgba(99,211,240,0.6)"; ctx.fillRect(padX + jW, zY, barW - jW, zH);
  ctx.strokeStyle = "rgba(150,175,230,0.4)"; ctx.strokeRect(padX, zY, barW, zH);
  ctx.fillStyle = "#2a1800"; ctx.font = `700 13px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(t.jupiter, padX + 10, zY + 25);
  ctx.fillStyle = C.faint; ctx.font = `10.5px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.restZoom, padX + barW / 2, zY + zH + 16);
  ctx.textAlign = "right"; ctx.fillStyle = C.muted; ctx.font = `10px ${mono}`;
  ctx.fillText(t.otherP, padX + barW - 6, zY + 25);
}

function drawFamily(ctx, cw, H, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const midY = H / 2;
  // Sun
  const sunX = 40;
  const sg = ctx.createRadialGradient(sunX, midY, 4, sunX, midY, 30);
  sg.addColorStop(0, "#fff6d8"); sg.addColorStop(0.5, "#ffd23d"); sg.addColorStop(1, "rgba(255,158,44,0)");
  ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(sunX, midY, 30, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffd23d"; ctx.beginPath(); ctx.arc(sunX, midY, 16, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.sun; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.sun, sunX, midY + 40);
  // members laid out from the Sun outward
  const startX = 92, endX = cw - 20;
  const span = endX - startX;
  const terr = [["#b0855f", 4], ["#e6b877", 5], ["#5b8dee", 5.5], ["#d06b4a", 4.5]];
  const giants = [["#e0a86a", 15], ["#e8cf9a", 13], ["#8fd0e0", 10], ["#5b7de0", 10]];
  // terrestrial cluster (inner ~ 22% of span)
  terr.forEach((p, i) => {
    const x = startX + span * (0.04 + i * 0.045);
    ctx.fillStyle = p[0]; ctx.beginPath(); ctx.arc(x, midY, p[1], 0, Math.PI * 2); ctx.fill();
  });
  ctx.fillStyle = C.faint; ctx.font = `10px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.terr, startX + span * 0.115, midY - 26);
  // asteroid belt
  const beltX = startX + span * 0.30;
  ctx.fillStyle = "rgba(150,160,180,0.7)";
  for (let i = 0; i < 22; i++) { const a = Math.random(); ctx.beginPath(); ctx.arc(beltX - 14 + Math.random() * 28, midY - 20 + Math.random() * 40, 1.2, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = C.faint; ctx.fillText(t.belts, beltX, midY + 40);
  // giants
  giants.forEach((p, i) => {
    const x = startX + span * (0.46 + i * 0.135);
    const gg = ctx.createRadialGradient(x - p[1] * 0.3, midY - p[1] * 0.3, 1, x, midY, p[1]);
    gg.addColorStop(0, p[0]); gg.addColorStop(1, "rgba(0,0,0,0.25)");
    ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(x, midY, p[1], 0, Math.PI * 2); ctx.fill();
    if (i === 1) { ctx.strokeStyle = "rgba(230,207,154,0.8)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(x, midY, p[1] + 8, (p[1] + 8) * 0.32, -0.3, 0, Math.PI * 2); ctx.stroke(); }
  });
  ctx.fillStyle = C.faint; ctx.fillText(t.giants, startX + span * 0.66, midY - 32);
  // baseline
  ctx.strokeStyle = "rgba(120,150,210,0.25)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(startX - 6, midY); ctx.lineTo(endX, midY); ctx.stroke();
}

export function SunFamily() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const [view, setView] = useState("mass");
  const cw = Math.min(w, 760);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (view === "mass") drawMass(ctx, cw, H, lang);
    else drawFamily(ctx, cw, H, lang);
  }, [cw, view, lang]);

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

        <div style={styles.pickerRow}>
          {[["mass", t.viewMass], ["family", t.viewFamily]].map(([id, label]) => (
            <button key={id} onClick={() => setView(id)}
              style={{ ...styles.chip, ...(view === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default SunFamily;
