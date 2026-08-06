/* ============================================================
   STATION 6 — THE VERY SMALL
   Zoom inward: matter → molecule → atom → nucleus. The atom
   view makes "mostly empty space" visible (tiny nucleus, far
   electrons). Cards for the molecule definition & four forces.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const LEVELS = [
  {
    id: "matter", tint: "#63d3f0",
    name: { en: "Matter", ja: "物質" },
    scale: { en: "everyday scale", ja: "身のまわりのスケール" },
    story: { en: "Start with something solid you could hold. It feels continuous — but take it apart, piece by piece…", ja: "手に持てる固いものから始めよう。ぎっしり詰まって見えるけれど、少しずつ分解していくと……" },
    fact: { en: "Everything you can touch is matter. Zoom in far enough and it is built from molecules.", ja: "手で触れられるものはすべて物質です。十分に拡大すると、それは分子からできています。" },
  },
  {
    id: "molecule", tint: "#5fd39a",
    name: { en: "Molecule", ja: "分子" },
    scale: { en: "~0.0000001 mm", ja: "約 0.0000001 mm" },
    story: { en: "…and you reach molecules — the smallest piece that still keeps a substance's chemical identity. Water, for instance, is two hydrogens and an oxygen.", ja: "……分子にたどり着きます——化学的な性質を保ったまま分けられる最小の粒。たとえば水は、水素2つと酸素1つ。" },
    fact: { en: "A molecule is the smallest particle into which matter can be divided while still retaining its chemical properties.", ja: "分子とは、化学的性質を保ったまま物質を分割できる最小の粒子です。" },
  },
  {
    id: "atom", tint: "#b58cf0",
    name: { en: "Atom", ja: "原子" },
    scale: { en: "mostly empty space", ja: "ほとんどが空間" },
    story: { en: "Split a molecule into its atoms and here is the shock: an atom is almost entirely empty space.", ja: "分子を原子に分けると、驚きが待っています——原子は、ほとんどが空っぽの空間なのです。" },
    fact: { en: "An atom is mostly empty space: the nucleus is tiny compared with the huge distance out to the orbiting electrons.", ja: "原子はほとんどが空っぽの空間です。原子核は、その周りを回る電子までの広大な距離に比べて非常に小さいのです。" },
  },
  {
    id: "nucleus", tint: "#ffcf6b",
    name: { en: "Nucleus", ja: "原子核" },
    scale: { en: "protons + neutrons", ja: "陽子＋中性子" },
    story: { en: "Nearly all its mass hides in a nucleus about 100,000× smaller than the atom. From this speck to the largest superclusters, just four forces run everything.", ja: "その質量のほぼすべては、原子の約10万分の1しかない原子核に潜んでいます。この小さな点から最大の超銀河団まで、すべてを動かすのはたった4つの力です。" },
    fact: { en: "At the heart of the atom sits the nucleus — protons and neutrons packed together, holding almost all the atom's mass in a tiny volume.", ja: "原子の中心にあるのが原子核——陽子と中性子が寄り集まり、原子の質量のほとんどをごく小さな体積に収めています。" },
  },
];

const STR = {
  en: {
    title: "The very small",
    kind: "Zooming inward",
    lede: "The cosmos is not just vast — it is almost entirely empty. Zoom all the way inward and you meet that same emptiness at the heart of every atom.",
    thread: "ZOOMING IN",
    zoomIn: "Zoom in ›", zoomOut: "‹ Zoom out",
    emptyNote: "Notice the scale: the nucleus is a speck at the centre while the electrons orbit far out. An atom is almost entirely empty space.",
    forcesTitle: "The four fundamental forces",
    forcesBody: "Everything in the universe is governed by just four fundamental forces: gravity, electromagnetism, and the strong and weak nuclear forces.",
    moleculeTitle: "What is a molecule?",
  },
  ja: {
    title: "極めて小さな世界",
    kind: "内側へズーム",
    lede: "宇宙はただ広いだけではなく、ほとんどが空っぽです。どこまでも内側へズームすると、あらゆる原子の中心にも、同じ空虚が待っています。",
    thread: "内側へズーム",
    zoomIn: "ズームイン ›", zoomOut: "‹ ズームアウト",
    emptyNote: "スケールに注目：原子核は中心の小さな点で、電子ははるか外側を回ります。原子はほとんどが空っぽの空間です。",
    forcesTitle: "4つの基本的な力",
    forcesBody: "宇宙のあらゆるものは、たった4つの基本的な力に支配されています：重力、電磁気力、そして強い核力と弱い核力です。",
    moleculeTitle: "分子とは？",
  },
};

function draw(ctx, cw, H, id, tint, tph) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2;
  if (id === "matter") {
    for (let x = 0; x < 6; x++) for (let y = 0; y < 4; y++) {
      ctx.fillStyle = `rgba(99,211,240,${0.25 + ((x + y) % 2) * 0.2})`;
      ctx.fillRect(cx - 120 + x * 40, cy - 80 + y * 40, 34, 34);
    }
  } else if (id === "molecule") {
    // a small cluster of bonded atoms (water-like)
    const pts = [[cx, cy], [cx - 46, cy + 30], [cx + 46, cy + 30]];
    ctx.strokeStyle = "rgba(95,211,154,0.6)"; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(...pts[1]); ctx.lineTo(...pts[0]); ctx.lineTo(...pts[2]); ctx.stroke();
    const cols = ["#ff9a6b", "#dfe6ff", "#dfe6ff"], rad = [26, 16, 16];
    pts.forEach((p, i) => {
      const g = ctx.createRadialGradient(p[0], p[1], 2, p[0], p[1], rad[i]);
      g.addColorStop(0, "#fff"); g.addColorStop(0.5, cols[i]); g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p[0], p[1], rad[i], 0, Math.PI * 2); ctx.fill();
    });
  } else if (id === "atom") {
    // tiny nucleus, far electrons -> mostly empty
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 6);
    g.addColorStop(0, "#fff"); g.addColorStop(1, tint);
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill();
    const orbits = [[120, 42], [95, 60]];
    orbits.forEach((o, k) => {
      ctx.strokeStyle = "rgba(181,140,240,0.3)"; ctx.lineWidth = 1;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(k * 1.0);
      ctx.beginPath(); ctx.ellipse(0, 0, o[0], o[1], 0, 0, Math.PI * 2); ctx.stroke();
      const a = tph * (k ? -1 : 1) + k;
      const ex = Math.cos(a) * o[0], ey = Math.sin(a) * o[1];
      ctx.fillStyle = C.cool; ctx.beginPath(); ctx.arc(ex, ey, 4, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    });
  } else if (id === "nucleus") {
    const nucs = [[-10, -6, "#ff9a6b"], [10, -4, "#dfe6ff"], [-4, 10, "#ff9a6b"], [8, 12, "#dfe6ff"], [0, 0, "#ff9a6b"]];
    nucs.forEach((n) => {
      const g = ctx.createRadialGradient(cx + n[0] * 3, cy + n[1] * 3, 2, cx + n[0] * 3, cy + n[1] * 3, 26);
      g.addColorStop(0, "#fff"); g.addColorStop(0.4, n[2]); g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx + n[0] * 3, cy + n[1] * 3, 24, 0, Math.PI * 2); ctx.fill();
    });
  }
}

export function TheVerySmall() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 300;
  const canvasRef = useRef(null);
  const [idx, setIdx] = useState(0);
  const [openCard, setOpenCard] = useState(null);
  const cw = Math.min(w, 760);
  const lvl = LEVELS[idx];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, cw, H);
    if (reduceMotion || lvl.id !== "atom") { draw(ctx, cw, H, lvl.id, lvl.tint, 0); return; }
    let raf, tph = 0;
    const loop = () => { tph += 0.02; draw(ctx, cw, H, lvl.id, lvl.tint, tph); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, idx]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 06 · {String(idx + 1).padStart(2, "0")}/0{LEVELS.length}</div>
        <h3 style={styles.panelTitle}>{tr(lvl.name, lang)}</h3>
        <div style={{ ...styles.panelKind, color: lvl.tint, fontFamily: mono }}>{tr(lvl.scale, lang)}</div>
        <div style={{ ...styles.pathBox, marginTop: 14 }}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{tr(lvl.story, lang)}</p>
        </div>
        <p style={{ ...styles.factText, marginTop: 14 }}>{tr(lvl.fact, lang)}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
          {[
            { id: "mol", title: t.moleculeTitle, body: LEVELS[1].fact },
            { id: "forces", title: t.forcesTitle, body: { en: t.forcesBody, ja: STR.ja.forcesBody } },
          ].map((c) => {
            const on = openCard === c.id;
            return (
              <button
                key={c.id} onClick={() => setOpenCard(on ? null : c.id)}
                style={{
                  textAlign: "left", cursor: "pointer",
                  background: on ? "rgba(30,40,70,0.7)" : "rgba(8,12,26,0.6)",
                  border: `1px solid ${on ? C.borderBright : C.border}`, borderRadius: 12, padding: "12px 14px", color: C.text,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                  <span style={{ fontFamily: "'Spectral', serif", fontSize: 17 }}>{c.title}</span>
                  <span style={{ color: C.cool, fontFamily: mono }}>{on ? "−" : "+"}</span>
                </div>
                {on && <p style={{ fontSize: 15, lineHeight: 1.6, color: "#c8d0e4", margin: "10px 0 0" }}>{tr(c.body, lang)}</p>}
              </button>
            );
          })}
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>
        <canvas ref={canvasRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        <div style={styles.controlBar}>
          <button style={styles.iconBtn} onClick={() => setIdx((i) => Math.max(0, i - 1))} disabled={idx === 0}>{t.zoomOut}</button>
          <div style={styles.ladder}>
            {LEVELS.map((l, i) => (
              <span
                key={l.id} onClick={() => setIdx(i)} title={tr(l.name, lang)}
                style={{ ...styles.rung, background: i === idx ? l.tint : "rgba(120,150,210,0.25)", height: i === idx ? 22 : 12 }}
              />
            ))}
          </div>
          <button style={styles.iconBtn} onClick={() => setIdx((i) => Math.min(LEVELS.length - 1, i + 1))} disabled={idx === LEVELS.length - 1}>{t.zoomIn}</button>
        </div>
        {lvl.id === "atom" && <p style={styles.note}>{t.emptyNote}</p>}
      </div>
    </div>
  );
}

export default TheVerySmall;
