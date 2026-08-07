/* ============================================================
   STATION 7 — MADE OF STARDUST
   The cosmic recycling cycle: Big Bang (H & He) → stars fuse
   heavier elements → supernova scatters them → new stars,
   planets & life → repeat. Highlights H, C, N, O.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STAGES = [
  {
    id: "bigbang", tint: "#ffffff",
    name: { en: "The Big Bang", ja: "ビッグバン" },
    story: { en: "The newborn universe could make only the two lightest elements — hydrogen and helium. Nothing yet to build a planet, or a person.", ja: "生まれたての宇宙がつくれたのは、最も軽い2つの元素——水素とヘリウムだけ。惑星も人も、まだつくれません。" },
    desc: { en: "The infant universe makes only the lightest elements: hydrogen and helium.", ja: "生まれたての宇宙がつくるのは、最も軽い元素だけ——水素とヘリウムです。" },
  },
  {
    id: "stars", tint: "#ffcf6b",
    name: { en: "Stars forge elements", ja: "星が元素をつくる" },
    story: { en: "Stars are element factories: in their cores, hydrogen fuses step by step into carbon, nitrogen, oxygen and heavier atoms.", ja: "星は元素の工場です。その中心で、水素が段階を追って炭素・窒素・酸素、さらに重い原子へと融合していきます。" },
    desc: { en: "Deep inside stars, hydrogen fuses into heavier elements — carbon, nitrogen, oxygen and more.", ja: "星の奥深くで、水素がより重い元素へと融合します——炭素、窒素、酸素など。" },
  },
  {
    id: "supernova", tint: "#ff7a6b",
    name: { en: "Supernova scatters them", ja: "超新星がまき散らす" },
    story: { en: "No star lasts forever. When a massive one dies it explodes, flinging its newly-made elements back out into the Galaxy.", ja: "星は永遠には輝けません。大質量の星は最期に爆発し、つくったばかりの元素を銀河へまき散らします。" },
    desc: { en: "When a massive star dies, it explodes — hurling its manufactured elements out into space.", ja: "大質量の星が死ぬとき、それは爆発し——つくり出した元素を宇宙へまき散らします。" },
  },
  {
    id: "rebirth", tint: "#5fd39a",
    name: { en: "New stars, planets & life", ja: "新しい星・惑星・生命" },
    story: { en: "Those enriched clouds collapse into new stars, planets, and living things. The carbon in you was cooked inside a star — we are recycled star dust.", ja: "その豊かになった雲が収縮し、新しい星・惑星・生命が生まれます。あなたの中の炭素も、星の中でつくられたもの——私たちは再利用された星の塵です。" },
    desc: { en: "Those enriched clouds collapse into new stars, planets, and living things. We are literally made of recycled star dust.", ja: "その豊かになった雲が収縮し、新しい星・惑星・生命へと生まれ変わります。私たちは文字どおり、再利用された星の塵からできています。" },
  },
];

const ELEMENTS = [
  { sym: "H", name: { en: "Hydrogen", ja: "水素" }, color: "#63d3f0" },
  { sym: "C", name: { en: "Carbon", ja: "炭素" }, color: "#aeb7d2" },
  { sym: "N", name: { en: "Nitrogen", ja: "窒素" }, color: "#b58cf0" },
  { sym: "O", name: { en: "Oxygen", ja: "酸素" }, color: "#ff9a6b" },
];

const STR = {
  en: {
    title: "Made of stardust",
    kind: "The cosmic recycling cycle",
    lede: "Every atom in your body heavier than hydrogen was forged inside a star. Here is how the universe cooked up the ingredients of life — and of you.",
    thread: "THE RECYCLING",
    play: "▶ Run the cycle", pause: "❚❚ Pause",
    stage: "Stage",
    elemTitle: "Common in life — and in the cosmos",
    elemNote: "The four elements most common in living things — hydrogen, carbon, nitrogen and oxygen — are also among the most abundant in the universe.",
  },
  ja: {
    title: "星の塵からできている",
    kind: "宇宙のリサイクルの輪",
    lede: "あなたの体の中の、水素より重い原子はすべて、星の中でつくられました。宇宙がどうやって生命の——そしてあなたの——材料を用意したのか、見てみよう。",
    thread: "リサイクルの輪",
    play: "▶ サイクルを再生", pause: "❚❚ 一時停止",
    stage: "段階",
    elemTitle: "生命に多く——そして宇宙にも豊富",
    elemNote: "生き物に最も多く含まれる4つの元素——水素、炭素、窒素、酸素——は、宇宙で最も豊富な元素の一部でもあります。",
  },
};

function draw(ctx, cw, H, sid, tint, tph) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2;
  if (sid === "bigbang") {
    const R = 30 + (Math.sin(tph) * 0.5 + 0.5) * 60;
    const g = ctx.createRadialGradient(cx, cy, 2, cx, cy, R);
    g.addColorStop(0, "#fff"); g.addColorStop(0.6, "#8ad0ff"); g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
  } else if (sid === "stars") {
    for (let i = 0; i < 30; i++) {
      const a = (i / 30) * Math.PI * 2 + tph * 0.2;
      const rad = 60 + (i % 3) * 24;
      const x = cx + Math.cos(a) * rad, y = cy + Math.sin(a) * rad * 0.7;
      ctx.fillStyle = i % 4 === 0 ? "#ffcf6b" : "#dfe6ff";
      ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill();
    }
    const g = ctx.createRadialGradient(cx, cy, 2, cx, cy, 40);
    g.addColorStop(0, "#fff"); g.addColorStop(0.4, tint); g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 40, 0, Math.PI * 2); ctx.fill();
  } else if (sid === "supernova") {
    const p = (Math.sin(tph) * 0.5 + 0.5);
    const R = 20 + p * 130;
    ctx.strokeStyle = `rgba(255,122,107,${1 - p})`; ctx.lineWidth = 6 * (1 - p) + 1;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
    for (let i = 0; i < 40; i++) {
      const a = i / 40 * Math.PI * 2;
      const d = R * (0.6 + (i % 3) * 0.15);
      ctx.fillStyle = ["#63d3f0", "#aeb7d2", "#b58cf0", "#ff9a6b"][i % 4];
      ctx.beginPath(); ctx.arc(cx + Math.cos(a) * d, cy + Math.sin(a) * d, 2.2, 0, Math.PI * 2); ctx.fill();
    }
    const g = ctx.createRadialGradient(cx, cy, 2, cx, cy, 30);
    g.addColorStop(0, `rgba(255,255,255,${1 - p})`); g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 30, 0, Math.PI * 2); ctx.fill();
  } else if (sid === "rebirth") {
    // a young star with orbiting planets
    const g = ctx.createRadialGradient(cx, cy, 2, cx, cy, 34);
    g.addColorStop(0, "#fff"); g.addColorStop(0.4, "#ffe08a"); g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 34, 0, Math.PI * 2); ctx.fill();
    [[70, "#4a8fd4"], [104, "#5fd39a"], [134, "#ff9a6b"]].forEach((o, k) => {
      ctx.strokeStyle = "rgba(120,150,210,0.25)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.ellipse(cx, cy, o[0], o[0] * 0.6, 0, 0, Math.PI * 2); ctx.stroke();
      const a = tph * (0.6 - k * 0.15) + k * 2;
      ctx.fillStyle = o[1];
      ctx.beginPath(); ctx.arc(cx + Math.cos(a) * o[0], cy + Math.sin(a) * o[0] * 0.6, 5, 0, Math.PI * 2); ctx.fill();
    });
  }
}

export function Stardust() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 300;
  const canvasRef = useRef(null);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(!reduceMotion);
  const cw = Math.min(w, 760);
  const stage = STAGES[idx];
  const idxRef = useRef(idx);
  idxRef.current = idx;

  // stage auto-advance
  useEffect(() => {
    if (!playing) return;
    const iv = setInterval(() => setIdx((i) => (i + 1) % STAGES.length), 3200);
    return () => clearInterval(iv);
  }, [playing]);

  // canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, stage.id, stage.tint, 0); return; }
    let raf, tph = 0;
    const loop = () => { tph += 0.04; draw(ctx, cw, H, STAGES[idxRef.current].id, STAGES[idxRef.current].tint, tph); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, idx]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 07</div>
        <h3 style={styles.panelTitle}>{tr(stage.name, lang)}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={{ ...styles.pathBox, marginTop: 14 }}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{tr(stage.story, lang)}</p>
        </div>
        <div style={{ ...styles.pathBox, marginTop: 14 }}>
          <div style={styles.fateLabel}>{t.elemTitle}</div>
          <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
            {ELEMENTS.map((e) => (
              <div
                key={e.sym}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                  width: 62, padding: "10px 4px", borderRadius: 10,
                  background: "rgba(8,12,26,0.7)", border: `1px solid ${e.color}66`,
                }}
              >
                <span style={{ fontFamily: "'Spectral', serif", fontSize: 26, color: e.color }}>{e.sym}</span>
                <span style={{ fontSize: 12, color: C.muted }}>{tr(e.name, lang)}</span>
              </div>
            ))}
          </div>
          <p style={{ ...styles.keyTermText, marginTop: 14 }}>{t.elemNote}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>
        <canvas ref={canvasRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        <div style={styles.controlBar}>
          <button style={styles.iconBtn} onClick={() => setPlaying((p) => !p)}>{playing ? t.pause : t.play}</button>
          <div style={styles.ladder}>
            {STAGES.map((s, i) => (
              <span
                key={s.id} onClick={() => { setIdx(i); setPlaying(false); }} title={tr(s.name, lang)}
                style={{ ...styles.rung, background: i === idx ? s.tint : "rgba(120,150,210,0.25)", height: i === idx ? 22 : 12 }}
              />
            ))}
          </div>
          <div style={styles.stagePill}>{t.stage} {idx + 1}/{STAGES.length}</div>
        </div>
        <p style={styles.stageDesc}>{tr(stage.desc, lang)}</p>
      </div>
    </div>
  );
}

export default Stardust;
