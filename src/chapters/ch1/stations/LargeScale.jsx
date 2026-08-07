/* ============================================================
   STATION 5 — TOUR OF THE LARGE-SCALE UNIVERSE
   A narrated journey outward: one galaxy → its blazing heart →
   its unseen mass → the web of galaxies → the afterglow of the
   beginning. Each stop draws a canvas visual + reveals its fact.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono, reduceMotion } from "../../../shared/theme.js";
import { clamp, useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

/* Ordered as a story, each `story` line bridging to the next stop. */
const STOPS = [
  {
    id: "galaxy", kind: "spiral", tint: "#cbb6ff",
    name: { en: '"Island universes"', ja: "「島宇宙」" },
    sub: { en: "Galaxies", ja: "銀河" },
    story: { en: "Our journey begins with a single galaxy — one island of billions of stars, adrift in the dark.", ja: "旅は、ひとつの銀河から始まります——闇に漂う、数十億の星からなる島。" },
    fact: { en: '"Island universes" was the early name for galaxies — from far away, each looked like a separate island of stars floating in the dark.', ja: "「島宇宙」は銀河の古い呼び名です——遠くから見ると、それぞれが闇に浮かぶ星々の島のように見えたからです。" },
  },
  {
    id: "quasar", kind: "quasar", tint: "#ffe08a",
    name: { en: "Quasars", ja: "クエーサー" },
    sub: { en: "A galaxy's blazing heart", ja: "銀河の燃える心臓" },
    story: { en: "Peer into the heart of some galaxies and you find a blaze brighter than all their stars combined.", ja: "いくつかの銀河の中心をのぞくと、すべての星を合わせたよりも明るい輝きが見つかります。" },
    fact: { en: "Quasars are the brilliant centres of distant galaxies, glowing with energy released by gas falling toward supermassive black holes.", ja: "クエーサーは遠方の銀河の中心が、超大質量ブラックホールへ落ち込むガスのエネルギーで明るく輝くものです。" },
  },
  {
    id: "darkmatter", kind: "dark", tint: "#8ad0ff",
    name: { en: "Dark matter", ja: "暗黒物質" },
    sub: { en: "The unseen mass", ja: "見えない質量" },
    story: { en: "Yet stars alone can't hold a galaxy together. Most of its mass is something we cannot see at all.", ja: "しかし星だけでは、銀河をまとめておけません。その質量の大半は、まったく目に見えない何かなのです。" },
    fact: { en: "Dark matter is invisible material that makes up much of a galaxy's mass. We cannot see it directly — only feel its gravity.", ja: "暗黒物質は、銀河の質量の多くを占める目に見えない物質です。直接見ることはできず、その重力によってのみ存在が分かります。" },
  },
  {
    id: "web", kind: "web", tint: "#b58cf0",
    name: { en: "The cosmic web", ja: "宇宙の大規模構造" },
    sub: { en: "How galaxies are arranged", ja: "銀河の並び方" },
    story: { en: "Zoom out, and galaxies are not scattered at random — that unseen gravity strings them into one vast web.", ja: "視点を引くと、銀河は無秩序に散らばってはいません——あの見えない重力が、銀河を巨大な網の目へと編み上げます。" },
    fact: { en: "On the largest scales, galaxies string along vast filaments and sheets, wrapped around emptier voids — the cosmic web.", ja: "最も大きなスケールでは、銀河は巨大なフィラメント状に連なり、より空っぽなボイドを取り囲みます——宇宙の大規模構造です。" },
  },
  {
    id: "cmb", kind: "cmb", tint: "#ff9a6b",
    name: { en: "The afterglow of creation", ja: "創造の残光" },
    sub: { en: "Where the story began", ja: "物語の始まり" },
    story: { en: "Pull back to the very beginning, and the whole web is bathed in the faint afterglow of the Big Bang itself.", ja: "さらに始まりまで引いて見れば、その網全体が、ビッグバンそのもののかすかな残光に包まれています。" },
    fact: { en: "The cosmic microwave background is the afterglow of creation — the feeble glow of the Big Bang itself, still filling the whole universe.", ja: "宇宙マイクロ波背景放射は「創造の残光」——ビッグバンそのもののかすかな輝きで、今も宇宙全体を満たしています。" },
  },
];

const STR = {
  en: {
    title: "The large-scale universe",
    kind: "A tour of the biggest things",
    lede: "A journey outward — from one island of stars to the glow of the beginning.",
    pick: "Jump to a stop:",
    prev: "‹ Prev", next: "Next ›",
    counter: (i, n) => `Stop ${i} / ${n}`,
    thread: "THE JOURNEY",
  },
  ja: {
    title: "大規模な宇宙",
    kind: "最も大きなものたちの旅",
    lede: "外へと向かう旅——ひとつの星の島から、始まりの残光まで。",
    pick: "行き先へジャンプ：",
    prev: "‹ 前へ", next: "次へ ›",
    counter: (i, n) => `${n}中 ${i} 番目`,
    thread: "旅のみちすじ",
  },
};

/* deterministic hash → [0,1), scatters points randomly (no aliasing streaks) */
function rnd(i, salt) {
  const s = Math.sin((i + 1) * 127.1 + salt * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function draw(ctx, cw, H, kind, tint, tphase) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2;
  if (kind === "spiral") {
    const g = ctx.createRadialGradient(cx, cy, 2, cx, cy, 30);
    g.addColorStop(0, "#fff"); g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 30, 0, Math.PI * 2); ctx.fill();
    for (let a = 0; a < 2; a++) {
      for (let i = 0; i < 220; i++) {
        const tt = i / 220 * 5;
        const rad = 8 + tt * 22;
        const ang = tt + a * Math.PI + tphase * 0.2;
        ctx.globalAlpha = 0.7 - tt / 8;
        ctx.fillStyle = i % 6 === 0 ? tint : "#dfe6ff";
        ctx.beginPath(); ctx.arc(cx + Math.cos(ang) * rad, cy + Math.sin(ang) * rad * 0.6, 1.2, 0, Math.PI * 2); ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  } else if (kind === "quasar") {
    const g = ctx.createRadialGradient(cx, cy, 2, cx, cy, 90);
    g.addColorStop(0, "#fff"); g.addColorStop(0.2, tint); g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 90, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.6)"; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(cx, cy - 20); ctx.lineTo(cx, cy - 120); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, cy + 20); ctx.lineTo(cx, cy + 120); ctx.stroke();
    ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(cx, cy, 9, 0, Math.PI * 2); ctx.fill();
  } else if (kind === "dark") {
    ctx.strokeStyle = "rgba(138,208,255,0.35)"; ctx.setLineDash([4, 6]); ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(cx, cy, 120, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy, 85, 0, Math.PI * 2); ctx.stroke();
    ctx.setLineDash([]);
    const g = ctx.createRadialGradient(cx, cy, 2, cx, cy, 40);
    g.addColorStop(0, "#fff"); g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 40, 0, Math.PI * 2); ctx.fill();
  } else if (kind === "web") {
    const nodes = [];
    for (let i = 0; i < 26; i++) {
      nodes.push([40 + rnd(i, 1) * (cw - 80), 30 + rnd(i, 2) * (H - 60)]);
    }
    ctx.strokeStyle = "rgba(181,140,240,0.35)"; ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i][0] - nodes[j][0], dy = nodes[i][1] - nodes[j][1];
        if (Math.hypot(dx, dy) < 95) {
          ctx.beginPath(); ctx.moveTo(...nodes[i]); ctx.lineTo(...nodes[j]); ctx.stroke();
        }
      }
    }
    for (const n of nodes) {
      ctx.fillStyle = tint; ctx.beginPath(); ctx.arc(n[0], n[1], 2.4, 0, Math.PI * 2); ctx.fill();
    }
  } else if (kind === "cmb") {
    // Randomly distributed warm/cool patches filling the whole sky, gently shimmering.
    const n = Math.floor((cw * H) / 70);
    for (let i = 0; i < n; i++) {
      const x = rnd(i, 3) * cw;
      const y = rnd(i, 4) * H;
      const temp = rnd(i, 5);
      const tw = 0.35 + 0.28 * Math.sin(tphase * 1.4 + i * 0.9);
      ctx.globalAlpha = clamp(tw, 0.08, 0.75);
      ctx.fillStyle = temp > 0.66 ? "#ff9a6b" : temp > 0.33 ? "#63d3f0" : "#3a4468";
      const s = 3 + temp * 3;
      ctx.fillRect(x, y, s, s);
    }
    ctx.globalAlpha = 1;
  }
}

export function LargeScale() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 300;
  const canvasRef = useRef(null);
  const [sel, setSel] = useState(0);
  const cw = Math.min(w, 760);
  const stop = STOPS[sel];
  const go = (n) => setSel(clamp(n, 0, STOPS.length - 1));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, stop.kind, stop.tint, 0); return; }
    let raf, tph = 0;
    const loop = () => {
      tph += 0.03;
      draw(ctx, cw, H, stop.kind, stop.tint, tph);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, sel]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 05 · {String(sel + 1).padStart(2, "0")}/{String(STOPS.length).padStart(2, "0")}</div>
        <h3 style={styles.panelTitle}>{tr(stop.name, lang)}</h3>
        <div style={{ ...styles.panelKind, color: stop.tint, fontFamily: mono }}>{tr(stop.sub, lang)}</div>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{tr(stop.story, lang)}</p>
        </div>
        <div style={styles.fateBox}>
          <p style={styles.factText}>{tr(stop.fact, lang)}</p>
        </div>
        <p style={{ ...styles.hint, marginTop: 12 }}>{t.kind}</p>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>
        <canvas ref={canvasRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />

        {/* prev / next journey navigation */}
        <div style={{ ...styles.controlBar, justifyContent: "space-between" }}>
          <button style={{ ...styles.iconBtn, opacity: sel === 0 ? 0.4 : 1, cursor: sel === 0 ? "default" : "pointer" }}
            onClick={() => go(sel - 1)} disabled={sel === 0}>{t.prev}</button>
          <span style={{ fontFamily: mono, fontSize: 13, color: C.faint }}>{t.counter(sel + 1, STOPS.length)}</span>
          <button style={{ ...styles.iconBtn, opacity: sel === STOPS.length - 1 ? 0.4 : 1, cursor: sel === STOPS.length - 1 ? "default" : "pointer" }}
            onClick={() => go(sel + 1)} disabled={sel === STOPS.length - 1}>{t.next}</button>
        </div>

        <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginTop: 14 }}>{t.pick}</div>
        <div style={styles.pickerRow}>
          {STOPS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setSel(i)}
              style={{ ...styles.chip, ...(i === sel ? styles.chipOn : {}) }}
            >
              {tr(s.sub, lang)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LargeScale;
