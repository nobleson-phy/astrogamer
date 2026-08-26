/* ============================================================
   STATION 1 — THE MOON'S TWO FACES
   The Moon (1/80 of Earth's mass) shows two terrains: the bright,
   ancient, heavily cratered HIGHLANDS (83% of the surface, low-
   density anorthosite rock) and the dark, smooth basaltic MARIA
   (17%, younger lava plains). Mare Orientale is the youngest large
   basin, a 1000-km "bull's-eye". Grounded in Ch.9 §9.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

function rng(seed) { let s = seed; return () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff; }

const TERR = {
  highlands: { en: "Highlands", ja: "高地", pct: 83,
    en_t: "Bright, ancient, and battered by craters. Made of low-density anorthosite — the Moon's original crust, 4.4 billion years old.", ja_t: "明るく、古く、クレーターだらけ。低密度の斜長岩でできた月のもとの地殻で、44億年前のもの。" },
  maria: { en: "Maria (seas)", ja: "海（マリア）", pct: 17,
    en_t: "Dark, smooth plains of basalt lava that flooded the largest basins about 3.8 billion years ago — younger, so far fewer craters.", ja_t: "玄武岩の溶岩が最大級の盆地を約38億年前に満たした、暗く滑らかな平原——若いのでクレーターははるかに少ない。" },
};

const STR = {
  en: {
    title: "The Moon's two faces",
    kind: "Bright highlands, dark seas",
    lede: "Look up at the full Moon and you already see it: pale rugged patches and dark smooth ones. Toggle the two terrains to learn which is old, which is young — and why the difference matters.",
    thread: "THE STORY BEGINS",
    threadText: "Our nearest neighbour is a small, dead world — just 1/80 of Earth's mass — and that is exactly what makes it precious. With no air and no geology to erase the past, its face is a four-billion-year logbook.",
    key: "83% HIGHLANDS, 17% MARIA",
    keyText: "The Moon has 1/80 of Earth's mass and two very different terrains. The bright HIGHLANDS — 83% of the surface — are ancient, heavily cratered anorthosite (a low-density silicate rock). The dark MARIA ('seas') — just 17% — are smoother, younger plains of basalt lava that filled the great impact basins. The youngest large basin, Mare Orientale (1000 km across), still shows a striking 'bull's-eye' because lava never fully filled it.",
    orientale: "Show Mare Orientale (the bull's-eye)", coverL: "Share of surface",
    note: "The bright, crater-saturated highlands cover most of the Moon; the dark maria are younger lava plains in the big basins. Mare Orientale kept its concentric 'bull's-eye' rings because lava never buried them.",
  },
  ja: {
    title: "月の2つの顔",
    kind: "明るい高地、暗い海",
    lede: "満月を見上げれば、もう見えています：淡くごつごつした部分と、暗く滑らかな部分。2つの地形を切り替えて、どちらが古くどちらが若いか——そしてその違いがなぜ重要かを学ぼう。",
    thread: "物語のはじまり",
    threadText: "私たちの最も近い隣人は小さく死んだ世界——地球のわずか1/80の質量——で、それこそが貴重な理由です。空気も、過去を消す地質活動もないため、その顔は40億年の航海日誌なのです。",
    key: "83%が高地、17%が海",
    keyText: "月は地球の1/80の質量をもち、まったく異なる2つの地形があります。明るい高地——表面の83%——は古く、クレーターだらけの斜長岩（低密度の珪酸塩岩）です。暗い海（マリア）——わずか17%——は、大きな衝突盆地を満たした、より滑らかで若い玄武岩の溶岩平原です。最も若い大盆地、オリエンターレ海（直径1000 km）は、溶岩が完全に埋めなかったため、今も見事な「的（ブルズアイ）」を見せています。",
    orientale: "オリエンターレ海（的）を表示", coverL: "表面に占める割合",
    note: "明るくクレーターで飽和した高地が月の大半を覆い、暗い海は大盆地の若い溶岩平原です。オリエンターレ海は、溶岩が埋めなかったため同心円の「的」を保っています。",
  },
};

function draw(ctx, cw, H, sel, orientale, lang) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.42, cy = H / 2, R = Math.min(cw * 0.34, H * 0.44);
  // Moon disc (highlands base)
  const g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.2, cx, cy, R);
  g.addColorStop(0, "#d8d3c8"); g.addColorStop(1, "#a8a296");
  ctx.save();
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip();
  ctx.fillStyle = g; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
  // maria: dark blotches
  const maria = [[-0.25, -0.35, 0.42], [0.2, -0.15, 0.34], [-0.05, 0.35, 0.3], [0.35, 0.3, 0.24]];
  const mariaOn = sel === "maria";
  maria.forEach(([dx, dy, rr]) => {
    ctx.fillStyle = mariaOn ? "rgba(70,78,96,0.95)" : "rgba(90,96,110,0.8)";
    ctx.beginPath(); ctx.ellipse(cx + dx * R, cy + dy * R, rr * R, rr * R * 0.85, 0.3, 0, Math.PI * 2); ctx.fill();
  });
  // craters (denser on highlands)
  const r = rng(31);
  for (let i = 0; i < 120; i++) {
    const a = r() * Math.PI * 2, rad = Math.sqrt(r()) * R * 0.96;
    const x = cx + Math.cos(a) * rad, y = cy + Math.sin(a) * rad;
    // skip most craters over maria (younger, fewer)
    let onMaria = false;
    for (const [dx, dy, rr] of maria) { if (Math.hypot(x - (cx + dx * R), y - (cy + dy * R)) < rr * R) { onMaria = true; break; } }
    if (onMaria && r() < 0.85) continue;
    const cr = 1 + r() * 4;
    ctx.fillStyle = "rgba(60,56,50,0.5)"; ctx.beginPath(); ctx.arc(x, y, cr, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "rgba(240,236,228,0.4)"; ctx.lineWidth = 0.7; ctx.beginPath(); ctx.arc(x, y, cr, 0, Math.PI * 2); ctx.stroke();
  }
  // highlight selected terrain
  if (sel === "highlands") { ctx.strokeStyle = "rgba(255,236,180,0.5)"; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(cx, cy, R - 3, 0, Math.PI * 2); ctx.stroke(); }
  // Mare Orientale bull's-eye
  if (orientale) {
    const ox = cx - R * 0.62, oy = cy + R * 0.5;
    for (let k = 3; k >= 1; k--) { ctx.strokeStyle = `rgba(63,221,255,${0.3 + k * 0.15})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(ox, oy, k * 9, 0, Math.PI * 2); ctx.stroke(); }
    ctx.fillStyle = "rgba(70,78,96,0.9)"; ctx.beginPath(); ctx.arc(ox, oy, 7, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
  // limb
  ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
  if (orientale) { ctx.fillStyle = C.cool; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText("Mare Orientale", cx - R * 0.62, cy + R * 0.5 + 42); }
}

export function MoonFaces() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 300;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [sel, setSel] = useState("highlands");
  const [orientale, setOrientale] = useState(false);
  const T = TERR[sel];

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, sel, orientale, lang);
  }, [cw, sel, orientale, lang]);

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
          {Object.keys(TERR).map((id) => (
            <button key={id} onClick={() => setSel(id)}
              style={{ ...styles.chip, ...(sel === id ? styles.chipOn : {}) }}>
              {lang === "ja" ? TERR[id].ja : TERR[id].en} · {TERR[id].pct}%
            </button>
          ))}
        </div>

        <div style={{ marginTop: 10 }}>
          <button onClick={() => setOrientale((v) => !v)} style={{ ...styles.chip, ...(orientale ? styles.chipOn : {}), borderColor: orientale ? C.cool : undefined }}>{t.orientale}</button>
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.5, marginTop: 8 }}>
          <b style={{ color: C.text }}>{lang === "ja" ? T.ja : T.en} · {T.pct}%</b> — {lang === "ja" ? T.ja_t : T.en_t}
        </p>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default MoonFaces;
