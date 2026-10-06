/* ============================================================
   STATION 7 — PLANETARY NEBULA (A LOW-MASS STAR'S GENTLE DEATH)
   A low-mass red giant does not explode. It gently puffs off its outer
   envelope, exposing the hot, dense core that will become a white dwarf. The
   core floods the expanding shell with ultraviolet light, making the gas glow
   as a PLANETARY NEBULA. The name is a historical misnomer: through early
   telescopes the round, greenish shells looked like the disks of gas-giant
   planets — but they are not planets at all. Grounded in Ch.22 §22.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Planetary nebula",
    kind: "A low-mass star's gentle death",
    lede: "Watch an aging red giant breathe off its outer layers. The exposed hot core lights the expanding shell — a planetary nebula, misnamed by old telescopes.",
    thread: "THE STORY CONTINUES — ONE OF TWO DEATHS",
    threadText: "A star like the Sun does not go out with a bang. It sheds its outer self quietly, and for a few thousand years the cast-off gas glows around the ember that remains.",
    key: "PLANETARY NEBULA — A GENTLE DEATH (MISNAMED)",
    keyText: "A low-mass red giant ends gently. It puffs off its outer ENVELOPE into space, exposing the hot, dense core that will cool into a WHITE DWARF. The exposed core floods the expanding shell with ultraviolet light, ionizing the gas so it glows as a PLANETARY NEBULA. The name is a historical misnomer: in early telescopes these round, often greenish shells resembled the small disks of gas-giant planets like Uranus or Neptune — but they have nothing to do with planets. They are expanding shells of ejected red-giant atmosphere lit from within.",
    misnomer: "a historical misnomer — not a planet!",
    core: "hot core → white dwarf", shell: "ionized shell (UV-lit)",
    note: "A low-mass red giant gently sheds its envelope, baring a hot core that becomes a white dwarf. The core's UV lights the expanding gas as a planetary nebula — named for its planet-like telescope image, though it is no planet.",
  },
  ja: {
    title: "惑星状星雲",
    kind: "低質量星の穏やかな死",
    lede: "年老いた赤色巨星が外層を吐き出す様子を見よう。むき出しの高温の核が膨張する殻を照らします——古い望遠鏡が名を誤った、惑星状星雲です。",
    thread: "物語はつづく——2つの死のひとつ",
    threadText: "太陽のような星は、どかんと消えはしません。静かに外側の自分を脱ぎ捨て、数千年のあいだ、残った燃えさしの周りで脱ぎ捨てたガスが輝きます。",
    key: "惑星状星雲——穏やかな死（名は誤り）",
    keyText: "低質量の赤色巨星は穏やかに終わります。外層を宇宙へ吐き出し、やがて白色矮星へと冷えていく高温で密な核をむき出しにします。むき出しの核は膨張する殻を紫外線で満たし、ガスを電離させて惑星状星雲として輝かせます。その名は歴史的な誤称です：初期の望遠鏡では、この丸く、しばしば緑がかった殻が、天王星や海王星のような巨大ガス惑星の小さな円盤に似て見えました——しかし惑星とは何の関係もありません。放出された赤色巨星の大気が、内側から照らされて膨張する殻なのです。",
    misnomer: "歴史的な誤称——惑星ではない！",
    core: "高温の核 → 白色矮星", shell: "電離した殻（紫外線で発光）",
    note: "低質量の赤色巨星は外層を穏やかに脱ぎ捨て、白色矮星になる高温の核をあらわにします。核の紫外線が膨張するガスを惑星状星雲として輝かせます——望遠鏡での惑星に似た姿から名づけられましたが、惑星ではありません。",
  },
};

function draw(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.5, cy = H * 0.46;
  // several expanding shells, each a ring moving outward and fading
  const period = 240;
  const maxR = Math.min(cw, H) * 0.42;
  for (let k = 0; k < 3; k++) {
    const phase = ((tt + k * (period / 3)) % period) / period;
    const r = 18 + phase * maxR;
    const alpha = (1 - phase) * 0.6;
    ctx.strokeStyle = `rgba(120,230,200,${alpha})`;
    ctx.lineWidth = 6;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    // greenish inner glow ring
    ctx.strokeStyle = `rgba(170,200,255,${alpha * 0.7})`;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, cy, r * 0.96, 0, Math.PI * 2); ctx.stroke();
  }
  // central hot core (white dwarf progenitor)
  const g = ctx.createRadialGradient(cx, cy, 1, cx, cy, 16);
  g.addColorStop(0, "#ffffff"); g.addColorStop(0.5, "#bcd4ff"); g.addColorStop(1, "rgba(120,160,255,0)");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 16, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#eaf2ff"; ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill();
  // labels
  ctx.fillStyle = "#bcd4ff"; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.core, cx, cy - 24);
  ctx.fillStyle = "#78e6c8"; ctx.font = `11px ${mono}`;
  ctx.fillText(t.shell, cx, H - 26);
  ctx.fillStyle = C.sun; ctx.font = `11px ${mono}`;
  ctx.fillText(t.misnomer, cx, H - 8);
}

export function PlanetaryNebula() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 280;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, 120, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

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

        <div style={{ marginTop: 4 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default PlanetaryNebula;
