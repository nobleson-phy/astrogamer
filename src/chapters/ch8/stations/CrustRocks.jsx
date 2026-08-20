/* ============================================================
   STATION 3 — THE CRUST & ROCKS
   Two crusts: thick low-density continental crust (granite, 20–70 km)
   and thin dense oceanic crust (basalt, ~6 km). Three rock classes:
   igneous (cooled melt), sedimentary (deposited layers), metamorphic
   (buried, cooked, returned). No primitive rock survives on Earth —
   the whole planet was once heated and differentiated.
   Grounded in Ch.8 §8.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const ROCKS = {
  igneous: { en: "Igneous", ja: "火成岩", col: "#d0663f",
    en_t: "Cooled and solidified from molten rock (magma or lava). Basalt and granite are both igneous.", ja_t: "溶けた岩石（マグマや溶岩）が冷えて固まったもの。玄武岩も花崗岩も火成岩。" },
  sedimentary: { en: "Sedimentary", ja: "堆積岩", col: "#c9b079",
    en_t: "Built from layers of deposited grains, dust or shells — like sandstone and carbonate limestone.", ja_t: "堆積した粒・塵・殻の層からできる——砂岩や炭酸塩の石灰岩など。" },
  metamorphic: { en: "Metamorphic", ja: "変成岩", col: "#8f7bb0",
    en_t: "Existing rock carried deep, then cooked and squeezed by heat and pressure, and later lifted back up.", ja_t: "既存の岩石が深部へ運ばれ、熱と圧力で変質し、のちに再び持ち上げられたもの。" },
};

const STR = {
  en: {
    title: "The crust & rocks",
    kind: "Two crusts and a recycling machine",
    lede: "Earth wears two very different skins. Compare the thick granite continents with the thin basalt sea floor — then meet the three ways a rock can be made and remade.",
    thread: "THE STORY CONTINUES",
    threadText: "The crust is the only layer we can touch, and even it is restless. Its rocks are not the planet's original material — that was all melted long ago — but the products of an endless cycle of building, burial and uplift.",
    key: "GRANITE LAND, BASALT SEA — AND NO PRIMITIVE ROCK",
    keyText: "Continental crust is thick (20–70 km) and made of low-density granite; oceanic crust is thin (~6 km) and made of denser basalt. Surface rocks come in three classes: igneous (cooled from melt), sedimentary (deposited layers), and metamorphic (rock buried to depth, transformed by heat and pressure, then returned to the surface). No 'primitive' unaltered rock survives on Earth — unlike in meteorites — because the entire planet was heated and chemically differentiated early in its history.",
    view: "Two crusts", rockView: "Rock classes",
    cont: "Continental crust", ocean: "Oceanic crust", granite: "granite · 20–70 km", basalt: "basalt · ~6 km",
    mantleL: "mantle", seaL: "ocean",
    note1: "Continental crust is thick and light (granite); oceanic crust is thin and dense (basalt), and rides lower — which is why oceans fill the low basins.",
    note2: "Every surface rock is remade by the rock cycle. Metamorphic rock is the proof that the crust is dragged down and lifted back — and why no untouched primordial rock is left on Earth.",
  },
  ja: {
    title: "地殻と岩石",
    kind: "2つの地殻と、リサイクル装置",
    lede: "地球はまったく異なる2つの皮膚をまとっています。厚い花崗岩の大陸と、薄い玄武岩の海底を比べよう——そして岩石が作られ、作り直される3つの道を知ろう。",
    thread: "物語はつづく",
    threadText: "地殻は私たちが触れられる唯一の層ですが、それさえ休みません。その岩石は惑星のもとの材料ではなく——それはとうの昔にすべて溶けました——建設・埋没・隆起の終わりなき循環の産物です。",
    key: "花崗岩の陸、玄武岩の海——そして原始的な岩はない",
    keyText: "大陸地殻は厚く（20〜70 km）、密度の低い花崗岩でできています。海洋地殻は薄く（約6 km）、より密度の高い玄武岩でできています。表面の岩石は3種類：火成岩（溶融から冷えた）、堆積岩（堆積した層）、変成岩（深部へ埋没し、熱と圧力で変質して、再び地表へ戻ったもの）。地球には隕石と違って「原始的な」未変質の岩石は残っていません——惑星全体が歴史の初期に加熱され、化学的に分化したからです。",
    view: "2つの地殻", rockView: "岩石の種類",
    cont: "大陸地殻", ocean: "海洋地殻", granite: "花崗岩・20〜70 km", basalt: "玄武岩・約6 km",
    mantleL: "マントル", seaL: "海",
    note1: "大陸地殻は厚く軽い（花崗岩）、海洋地殻は薄く密度が高い（玄武岩）。海洋地殻は低く沈むため、海は低い盆地を満たします。",
    note2: "あらゆる表面の岩石は岩石循環で作り直されます。変成岩は、地殻が引きずり下ろされ持ち上げられる証拠——そして手つかずの原始の岩が地球に残らない理由です。",
  },
};

function drawCrusts(ctx, cw, H, t, lang) {
  ctx.clearRect(0, 0, cw, H);
  const mid = cw / 2;
  const seaY = 70;
  // sky
  ctx.fillStyle = "rgba(20,30,60,0.5)"; ctx.fillRect(0, 0, cw, seaY);
  // ocean over the right half
  ctx.fillStyle = "rgba(50,110,180,0.55)"; ctx.fillRect(mid, seaY, cw - mid, 46);
  ctx.fillStyle = C.cool; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.seaL, mid + (cw - mid) / 2, seaY + 26);
  // continental crust (left) thick granite block
  ctx.fillStyle = "#b98a55"; ctx.fillRect(0, seaY, mid, 150);
  ctx.fillStyle = "#2a1c10"; ctx.font = `700 12px ${mono}`; ctx.fillText(t.cont, mid / 2, seaY + 40);
  ctx.fillStyle = "#3a2a18"; ctx.font = `11px ${mono}`; ctx.fillText(t.granite, mid / 2, seaY + 58);
  // oceanic crust (right) thin basalt — single-line label so nothing is clipped
  ctx.fillStyle = "#4a4a55"; ctx.fillRect(mid, seaY + 46, cw - mid, 30);
  ctx.fillStyle = "#eef1f8"; ctx.font = `700 11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.ocean + " · " + t.basalt, mid + (cw - mid) / 2, seaY + 46 + 19);
  // mantle beneath
  const manY = seaY + 150;
  const mg = ctx.createLinearGradient(0, manY, 0, H); mg.addColorStop(0, "#b5652f"); mg.addColorStop(1, "#7a3f1c");
  ctx.fillStyle = mg;
  ctx.beginPath(); ctx.moveTo(0, manY); ctx.lineTo(mid, manY); ctx.lineTo(mid, seaY + 76); ctx.lineTo(cw, seaY + 76); ctx.lineTo(cw, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fill();
  ctx.fillStyle = "#3a2414"; ctx.textAlign = "center"; ctx.font = `700 12px ${mono}`; ctx.fillText(t.mantleL, cw / 2, H - 16);
}

function drawCycle(ctx, cw, H, sel, t, lang) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2;
  const R = Math.min(cw, H) * 0.34;
  const nodes = [["igneous", -Math.PI / 2], ["sedimentary", Math.PI / 6], ["metamorphic", Math.PI - Math.PI / 6]];
  // cycle ring
  ctx.strokeStyle = "rgba(150,175,230,0.25)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
  // arrows around
  for (let i = 0; i < 3; i++) {
    const a = nodes[i][1] + 0.5;
    const x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R;
    ctx.fillStyle = "rgba(150,175,230,0.5)"; ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
  }
  nodes.forEach(([id, ang]) => {
    const x = cx + Math.cos(ang) * R, y = cy + Math.sin(ang) * R;
    const on = id === sel; const col = ROCKS[id].col;
    const g = ctx.createRadialGradient(x, y, 2, x, y, 30);
    g.addColorStop(0, col); g.addColorStop(1, "rgba(0,0,0,0.25)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, on ? 30 : 24, 0, Math.PI * 2); ctx.fill();
    if (on) { ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, 30, 0, Math.PI * 2); ctx.stroke(); }
    ctx.fillStyle = "#12100a"; ctx.font = `700 11px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(lang === "ja" ? ROCKS[id].ja : ROCKS[id].en, x, y + 4);
  });
  ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(lang === "ja" ? "岩石循環" : "the rock cycle", cx, cy + 4);
}

export function CrustRocks() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 280;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [view, setView] = useState("crusts");
  const [rock, setRock] = useState("metamorphic");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (view === "crusts") drawCrusts(ctx, cw, H, t, lang);
    else drawCycle(ctx, cw, H, rock, t, lang);
  }, [cw, view, rock, lang]);

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

        <div style={styles.pickerRow}>
          {[["crusts", t.view], ["cycle", t.rockView]].map(([id, label]) => (
            <button key={id} onClick={() => setView(id)}
              style={{ ...styles.chip, ...(view === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        {view === "cycle" && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
            {Object.keys(ROCKS).map((id) => (
              <button key={id} onClick={() => setRock(id)}
                style={{ ...styles.chip, ...(rock === id ? styles.chipOn : {}), borderColor: rock === id ? ROCKS[id].col : undefined }}>
                {lang === "ja" ? ROCKS[id].ja : ROCKS[id].en}
              </button>
            ))}
          </div>
        )}

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        {view === "cycle" && (
          <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.5, marginTop: 8 }}>
            {lang === "ja" ? ROCKS[rock].ja_t : ROCKS[rock].en_t}
          </p>
        )}

        <p style={{ ...styles.note, maxWidth: "none" }}>{view === "crusts" ? t.note1 : t.note2}</p>
      </div>
    </div>
  );
}

export default CrustRocks;
