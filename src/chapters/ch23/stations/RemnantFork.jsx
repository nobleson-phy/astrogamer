/* ============================================================
   STATION 7 — THE REMNANT FORK
   One number decides a star's corpse: the mass of what is left at the end.
   A remnant below the 1.4 M☉ Chandrasekhar limit is a WHITE DWARF, which cools
   over eons toward a cold, dark BLACK DWARF. A remnant of about 1.4–3 M☉,
   held by neutron degeneracy, is a NEUTRON STAR. Above the ~3 M☉ neutron limit,
   nothing can resist gravity and the remnant becomes a BLACK HOLE. This recaps
   and threads together the whole chapter. Grounded in Ch.23.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The remnant fork",
    kind: "Mass decides the corpse",
    lede: "Slide the mass of the leftover core. Below 1.4 M☉ you get a white dwarf; 1.4–3 M☉ a neutron star; above ~3 M☉, gravity wins and a black hole forms.",
    thread: "THE STORY CONVERGES",
    threadText: "Every path in this chapter ends here, at a single fork. What a star leaves behind is decided by one thing alone — the mass of its final core.",
    key: "MASS DECIDES THE CORPSE — DWARF, NEUTRON STAR, OR BLACK HOLE",
    keyText: "The fate of a stellar corpse is set by the mass that remains at the end. Below the 1.4 M☉ Chandrasekhar limit, electron degeneracy wins and the remnant is a WHITE DWARF — which slowly cools over billions of years toward a cold, dark BLACK DWARF (none exist yet; the Universe is too young). Between about 1.4 and 3 M☉, electron degeneracy fails but neutron degeneracy holds, giving a NEUTRON STAR. Above roughly 3 M☉ — the neutron limit — no known pressure can resist gravity, and the remnant collapses without limit into a BLACK HOLE. One number, three very different ends.",
    massLabel: "Remnant core mass",
    wd: "WHITE DWARF", wdSub: "→ cools to a BLACK DWARF",
    ns: "NEUTRON STAR", nsSub: "neutron degeneracy holds",
    bh: "BLACK HOLE", bhSub: "gravity wins — no remnant pressure",
    note: "The remnant's mass decides its corpse: under 1.4 M☉ → white dwarf (cooling toward a black dwarf); 1.4–3 M☉ → neutron star; above ~3 M☉ → black hole. This fork ties the whole chapter together.",
  },
  ja: {
    title: "残骸の分岐",
    kind: "質量が亡骸を決める",
    lede: "残った核の質量を動かそう。1.4 M☉未満なら白色矮星、1.4〜3 M☉なら中性子星、約3 M☉を超えると重力が勝ってブラックホールができます。",
    thread: "物語が収束する",
    threadText: "この章のすべての道は、ひとつの分岐点でここに至ります。星が残すものは、ただひとつのこと——最後の核の質量——だけで決まります。",
    key: "質量が亡骸を決める——矮星・中性子星・ブラックホール",
    keyText: "星の亡骸の運命は、最後に残る質量で決まります。1.4 M☉のチャンドラセカール限界未満では電子縮退が勝ち、残骸は白色矮星になります——それは何十億年もかけてゆっくり冷え、冷たく暗い黒色矮星へ向かいます（宇宙は若すぎて、まだひとつも存在しません）。約1.4〜3 M☉では電子縮退は破れますが中性子縮退が支え、中性子星になります。およそ3 M☉——中性子の限界——を超えると、既知のどんな圧力も重力に抗えず、残骸は際限なくブラックホールへと崩壊します。ひとつの数、3つのまったく異なる終わり。",
    massLabel: "残骸の核の質量",
    wd: "白色矮星", wdSub: "→ 冷えて黒色矮星へ",
    ns: "中性子星", nsSub: "中性子縮退が支える",
    bh: "ブラックホール", bhSub: "重力が勝つ——残骸を支える圧力なし",
    note: "残骸の質量が亡骸を決めます：1.4 M☉未満 → 白色矮星（黒色矮星へ冷えていく）；1.4〜3 M☉ → 中性子星；約3 M☉超 → ブラックホール。この分岐が章全体を結びつけます。",
  },
};

function kindOf(M) { return M < 1.4 ? "wd" : M <= 3 ? "ns" : "bh"; }

function draw(ctx, cw, H, M, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const k = kindOf(M);
  const cx = cw * 0.5, cy = H * 0.34;

  if (k === "wd") {
    const glow = ctx.createRadialGradient(cx, cy, 2, cx, cy, 44);
    glow.addColorStop(0, "rgba(200,225,255,0.5)"); glow.addColorStop(1, "rgba(200,225,255,0)");
    ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(cx, cy, 44, 0, Math.PI * 2); ctx.fill();
    const g = ctx.createRadialGradient(cx - 6, cy - 6, 2, cx, cy, 26);
    g.addColorStop(0, "#f2f8ff"); g.addColorStop(0.7, "#cfe2ff"); g.addColorStop(1, "#8fb6ea");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 26, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#cfe3ff"; ctx.font = `14px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(t.wd, cx, cy + 50);
    ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.fillText(t.wdSub, cx, cy + 68);
  } else if (k === "ns") {
    const glow = ctx.createRadialGradient(cx, cy, 2, cx, cy, 40);
    glow.addColorStop(0, "rgba(180,210,255,0.6)"); glow.addColorStop(1, "rgba(180,210,255,0)");
    ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(cx, cy, 40, 0, Math.PI * 2); ctx.fill();
    const g = ctx.createRadialGradient(cx - 4, cy - 4, 1, cx, cy, 16);
    g.addColorStop(0, "#ffffff"); g.addColorStop(0.6, "#cfe0ff"); g.addColorStop(1, "#6f8fd8");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 16, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#e6efff"; ctx.font = `14px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(t.ns, cx, cy + 44);
    ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.fillText(t.nsSub, cx, cy + 62);
  } else {
    // black hole: dark disc with bright ring
    const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, 40);
    g.addColorStop(0, "#000000"); g.addColorStop(0.62, "#05060d"); g.addColorStop(0.72, "#ffcf6b"); g.addColorStop(0.85, "#ff9e2c"); g.addColorStop(1, "rgba(255,110,67,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 40, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#000"; ctx.beginPath(); ctx.arc(cx, cy, 22, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#ffd27a"; ctx.font = `14px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(t.bh, cx, cy + 56);
    ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.fillText(t.bhSub, cx, cy + 74);
  }

  // mass axis with zones at bottom
  const x0 = 24, x1 = cw - 24, by = H - 26, bh = 14;
  const mMax = 6;
  const toX = (m) => x0 + clamp(m / mMax, 0, 1) * (x1 - x0);
  // zone fills
  ctx.fillStyle = "rgba(143,182,234,0.35)"; ctx.fillRect(x0, by, toX(1.4) - x0, bh);
  ctx.fillStyle = "rgba(111,143,216,0.5)"; ctx.fillRect(toX(1.4), by, toX(3) - toX(1.4), bh);
  ctx.fillStyle = "rgba(255,158,44,0.35)"; ctx.fillRect(toX(3), by, x1 - toX(3), bh);
  // boundary ticks + labels
  ctx.strokeStyle = C.sun; ctx.lineWidth = 1;
  [1.4, 3].forEach((m) => {
    ctx.beginPath(); ctx.moveTo(toX(m), by - 5); ctx.lineTo(toX(m), by + bh + 5); ctx.stroke();
    ctx.fillStyle = C.sun; ctx.font = `10px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(`${m} M☉`, toX(m), by - 8);
  });
  // marker
  const mx = toX(M);
  ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.moveTo(mx, by - 2); ctx.lineTo(mx - 5, by - 12); ctx.lineTo(mx + 5, by - 12); ctx.closePath(); ctx.fill();
  ctx.fillStyle = C.text; ctx.font = `11px ${mono}`; ctx.textAlign = mx > cw - 70 ? "right" : "left";
  ctx.fillText(`${M.toFixed(2)} M☉`, mx + (mx > cw - 70 ? -8 : 8), by + bh + 2);
}

export function RemnantFork() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 270;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [M, setM] = useState(1.0);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, M, lang);
  }, [cw, M, lang]);

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

        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "4px 0 10px" }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.massLabel}</span>
          <input type="range" min="0.3" max="6" step="0.05" value={M}
            onChange={(e) => setM(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
          <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, width: 64, textAlign: "right" }}>{M.toFixed(2)} M☉</span>
        </div>

        <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default RemnantFork;
