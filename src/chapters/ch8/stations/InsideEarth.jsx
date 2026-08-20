/* ============================================================
   STATION 1 — INSIDE THE EARTH
   Earth's bulk density (5.5 g/cm³) far exceeds its crustal rocks
   (~3 g/cm³): the heavy stuff sank inward. The interior is layered —
   thin crust (0.3% of the mass), rocky mantle, liquid metallic outer
   core (which generates the magnetic field), solid inner core.
   Grounded in Ch.8 §8.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

/* fraction of Earth's radius (outer edge) for each layer boundary */
const LAYERS = [
  { id: "crust", en: "Crust", ja: "地殻", r0: 0.98, r1: 1.0, col: "#7a6a55",
    en_d: "0–70 km · solid rock", ja_d: "0〜70 km・固い岩石",
    en_i: "A thin rocky skin — only about 0.3% of Earth's mass, the least of any layer.", ja_i: "薄い岩石の皮膜——地球の質量のわずか約0.3%で、どの層より少ない。", mass: "≈ 0.3%" },
  { id: "mantle", en: "Mantle", ja: "マントル", r0: 0.55, r1: 0.98, col: "#b5652f",
    en_d: "to ~2900 km · hot silicate rock", ja_d: "深さ約2900 km まで・高温の珪酸塩岩",
    en_i: "The thick rocky middle. Slow convection here drives the moving plates above.", ja_i: "厚い岩石の中間層。ここでのゆっくりした対流が、上のプレートを動かす。", mass: "≈ 67%" },
  { id: "outer", en: "Outer core", ja: "外核", r0: 0.19, r1: 0.55, col: "#e89a3c",
    en_d: "liquid iron & nickel", ja_d: "液体の鉄とニッケル",
    en_i: "Molten metal in motion — its swirling currents generate Earth's magnetic field.", ja_i: "運動する溶けた金属——その渦巻く流れが地球の磁場を生み出す。", mass: "≈ 30%" },
  { id: "inner", en: "Inner core", ja: "内核", r0: 0.0, r1: 0.19, col: "#ffd27a",
    en_d: "solid iron & nickel", ja_d: "固体の鉄とニッケル",
    en_i: "A solid metal ball, kept solid by immense pressure despite being hotter than the outer core.", ja_i: "固体の金属の球。外核より高温でも、巨大な圧力によって固体を保つ。", mass: "≈ 1.7%" },
];

const STR = {
  en: {
    title: "Inside the Earth",
    kind: "A world sorted by density",
    lede: "Weigh the whole Earth and it comes out far denser than any rock you can pick up. The heavy metal must be hidden deep. Tap each shell to descend from the crust to the core.",
    thread: "THE STORY BEGINS",
    threadText: "We treated other worlds from afar; now we turn the same astronomer's eye on our own. The first clue is a number: Earth weighs too much for a ball of surface rock. Something dense hides within.",
    key: "DENSE CORE, LIGHT SKIN",
    keyText: "Earth's average (bulk) density is about 5.5 g/cm³, but its surface crustal rocks average only ~3 g/cm³ — proof that denser material sank to the centre when the young Earth melted. The result is a layered interior: a thin crust (just 0.3% of the mass), a rocky mantle, a liquid iron-nickel outer core whose motion makes the magnetic field, and a solid iron-nickel inner core.",
    bulk: "Bulk density", crustD: "Crustal rock", depthL: "Depth / state", massL: "Share of mass",
    note: "Cross-section of Earth's interior. The dense metallic core sits beneath the rocky mantle and thin crust — exactly what the bulk-vs-crust density gap predicts. The liquid outer core is the source of Earth's magnetic field.",
  },
  ja: {
    title: "地球の内部",
    kind: "密度で仕分けられた世界",
    lede: "地球全体を量ると、手に取れるどんな岩石よりもずっと密度が高くなります。重い金属は深くに隠れているはず。各層をタップして、地殻から核へと降りていこう。",
    thread: "物語のはじまり",
    threadText: "これまで他の世界を遠くから扱ってきました。今度は同じ天文学者の目を、私たち自身に向けます。最初の手がかりは一つの数字です：地球は表面の岩石の球にしては重すぎる。何か密度の高いものが内部に隠れている。",
    key: "密度の高い核、軽い皮膜",
    keyText: "地球の平均（バルク）密度は約5.5 g/cm³ですが、表面の地殻岩石は平均でわずか約3 g/cm³——若い地球が溶けたとき、密度の高い物質が中心へ沈んだ証拠です。その結果が層状の内部：薄い地殻（質量のわずか0.3%）、岩石のマントル、磁場を生む運動する液体の鉄ニッケル外核、そして固体の鉄ニッケル内核です。",
    bulk: "バルク密度", crustD: "地殻の岩石", depthL: "深さ／状態", massL: "質量の割合",
    note: "地球内部の断面。密度の高い金属の核が、岩石のマントルと薄い地殻の下にあります——バルク密度と地殻密度の差がまさにこれを予言します。液体の外核が地球磁場の源です。",
  },
};

function draw(ctx, cw, H, sel, lang) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.42, cy = H / 2, R = Math.min(cw * 0.34, H * 0.44);
  // shells from outside in
  for (const L of LAYERS) {
    const on = L.id === sel;
    const g = ctx.createRadialGradient(cx - R * 0.25, cy - R * 0.25, R * L.r0, cx, cy, R * L.r1);
    g.addColorStop(0, L.col); g.addColorStop(1, shade(L.col, -0.25));
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(cx, cy, R * L.r1, 0, Math.PI * 2); ctx.fill();
    if (on) { ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, R * L.r1, 0, Math.PI * 2); ctx.stroke(); }
  }
  // magnetic field lines when outer core selected
  if (sel === "outer") {
    ctx.strokeStyle = "rgba(63,221,255,0.55)"; ctx.lineWidth = 1.5;
    for (const s of [1, -1]) for (const k of [1.25, 1.55]) {
      ctx.beginPath();
      ctx.ellipse(cx, cy, R * k, R * k * 1.3, 0, s > 0 ? -0.5 : Math.PI - 0.5, s > 0 ? 0.5 : Math.PI + 0.5);
      ctx.stroke();
    }
  }
  // callout labels on the right
  const lx = cx + R + 24;
  ctx.textAlign = "left";
  LAYERS.forEach((L, i) => {
    const y = 40 + i * ((H - 70) / LAYERS.length);
    const on = L.id === sel;
    ctx.fillStyle = L.col; ctx.fillRect(lx, y - 9, 12, 12);
    ctx.fillStyle = on ? C.text : C.muted; ctx.font = `${on ? "700 " : ""}13px ${mono}`;
    ctx.fillText((lang === "ja" ? L.ja : L.en) + "  " + L.mass, lx + 18, y + 1);
    // leader line to shell mid-radius
    const mr = R * (L.r0 + L.r1) / 2;
    ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cx + Math.cos(-0.5 + i * 0.1) * mr, cy + Math.sin(-0.5 + i * 0.1) * mr); ctx.lineTo(lx - 4, y - 3); ctx.stroke();
  });
}
function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  r = Math.max(0, Math.min(255, r + amt * 255)); g = Math.max(0, Math.min(255, g + amt * 255)); b = Math.max(0, Math.min(255, b + amt * 255));
  return `rgb(${r | 0},${g | 0},${b | 0})`;
}

export function InsideEarth() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 300;
  const canRef = useRef(null);
  const [sel, setSel] = useState("outer");
  const cw = Math.min(w, 760);
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
        <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
          <div><div style={{ fontFamily: mono, fontSize: 11, color: C.faint }}>{t.bulk}</div><div style={{ fontFamily: mono, fontSize: 20, color: C.sun }}>5.5</div></div>
          <div><div style={{ fontFamily: mono, fontSize: 11, color: C.faint }}>{t.crustD}</div><div style={{ fontFamily: mono, fontSize: 20, color: C.cool }}>3.0</div></div>
          <div style={{ alignSelf: "flex-end", fontFamily: mono, fontSize: 11, color: C.faint, paddingBottom: 4 }}>g/cm³</div>
        </div>
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
              style={{ ...styles.chip, ...(sel === x.id ? styles.chipOn : {}), borderColor: sel === x.id ? x.col : undefined }}>
              {lang === "ja" ? x.ja : x.en}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <div style={{ marginTop: 10 }}>
          <div style={{ fontFamily: display, fontSize: 18, color: C.text }}>
            {lang === "ja" ? L.ja : L.en}
            <span style={{ fontFamily: mono, fontSize: 12, color: C.faint, marginLeft: 10 }}>{lang === "ja" ? L.ja_d : L.en_d}</span>
          </div>
          <div style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.5, marginTop: 3 }}>{lang === "ja" ? L.ja_i : L.en_i}</div>
          <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, marginTop: 3 }}>{t.massL}: <span style={{ color: C.sun }}>{L.mass}</span></div>
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default InsideEarth;
