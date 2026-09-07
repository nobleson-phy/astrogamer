/* ============================================================
   STATION 2 — CERES & VESTA
   The two giants of the asteroid belt, both visited by NASA's Dawn.
   Ceres: the largest asteroid (a dwarf planet), with the 92-km Occator
   crater full of bright salt deposits and the 4-km ice-volcanic dome
   Ahuna Mons. Vesta: a rare basaltic, differentiated body whose
   volcanic surface shows it once melted and layered. Grounded in
   Ch.13 §13.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Ceres & Vesta",
    kind: "The two giants of the belt",
    lede: "The belt's two biggest worlds could hardly be more different. Toggle between them: Ceres, an icy dwarf planet with salt-bright craters, and Vesta, a rocky world that once ran with lava.",
    thread: "THE STORY CONTINUES",
    threadText: "Most asteroids are small and irregular, but two are large enough to be round worlds in their own right. NASA's Dawn spacecraft orbited both — and found two utterly different histories.",
    ceres: "Ceres", vesta: "Vesta",
    ceresKey: "CERES — THE LARGEST ASTEROID, AN ICY DWARF PLANET",
    ceresText: "Ceres is the largest object in the asteroid belt — big and round enough to be classed a dwarf planet. Its surface holds the 92-kilometer-wide Occator crater, whose floor glows with bright deposits of salt left behind by briny water, and Ahuna Mons, a 4-kilometer-high dome built by ice volcanism (cryovolcanism). Ceres is an ice-rich world, not a dry rock.",
    vestaKey: "VESTA — A RARE DIFFERENTIATED, VOLCANIC ASTEROID",
    vestaText: "Vesta is the great exception among asteroids: its surface is covered in basaltic, volcanic minerals, which means Vesta once melted and separated into layers (it differentiated) early in its history, like a tiny planet. A giant impact near its south pole blasted off fragments that fall to Earth today as a whole family of meteorites.",
    f_occator: "Occator crater — bright salt", f_ahuna: "Ahuna Mons — ice volcano",
    f_basalt: "basaltic (volcanic) surface", f_south: "south-pole impact basin",
    noteC: "Ceres is the largest asteroid — a round, ice-rich dwarf planet with salt-bright Occator crater and the ice volcano Ahuna Mons.",
    noteV: "Vesta's basaltic surface shows it melted and differentiated early, like a miniature planet; a south-pole impact still sends us its meteorites.",
  },
  ja: {
    title: "ケレスとベスタ",
    kind: "帯の2つの巨人",
    lede: "帯の最大の2つの世界は、これ以上ないほど異なります。切り替えてみよう：塩で明るいクレーターをもつ氷の準惑星ケレスと、かつて溶岩が流れた岩の世界ベスタ。",
    thread: "物語はつづく",
    threadText: "ほとんどの小惑星は小さく不規則ですが、2つはそれ自体が丸い世界になるほど大きい。NASAのドーン探査機は両方を周回し——まったく異なる2つの歴史を見つけました。",
    ceres: "ケレス", vesta: "ベスタ",
    ceresKey: "ケレス——最大の小惑星、氷の準惑星",
    ceresText: "ケレスは小惑星帯で最大の天体——丸くなるほど大きく、準惑星に分類されます。表面には幅92 kmのオッカトルクレーターがあり、その底は塩水が残した明るい塩の堆積で輝いています。また、氷火山活動（氷火山）で作られた高さ4 kmのドーム、アフナ山があります。ケレスは乾いた岩ではなく、氷に富む世界です。",
    vestaKey: "ベスタ——まれな分化した火山の小惑星",
    vestaText: "ベスタは小惑星の中の大きな例外です：表面は玄武岩質で火山性の鉱物に覆われており、ベスタが初期に溶けて層に分かれた（分化した）——小さな惑星のように——ことを意味します。南極付近への巨大衝突が破片を吹き飛ばし、それらは今日、ひとまとまりの隕石群として地球に落ちてきます。",
    f_occator: "オッカトルクレーター——明るい塩", f_ahuna: "アフナ山——氷火山",
    f_basalt: "玄武岩質（火山性）の表面", f_south: "南極の衝突盆地",
    noteC: "ケレスは最大の小惑星——塩で明るいオッカトルクレーターと氷火山アフナ山をもつ、丸く氷に富む準惑星です。",
    noteV: "ベスタの玄武岩質の表面は、初期に溶けて分化したことを示します——小さな惑星のように。南極の衝突は今も隕石を送ってきます。",
  },
};

function draw(ctx, cw, H, body, lang) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2, R = Math.min(cw * 0.24, H * 0.4);
  if (body === "ceres") {
    // grey, cratered icy world
    const g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.2, cx, cy, R);
    g.addColorStop(0, "#9a978f"); g.addColorStop(1, "#5c5952");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip();
    // craters (deterministic-ish)
    const cr = [[-0.4, -0.3, 0.14], [0.3, 0.35, 0.11], [-0.15, 0.45, 0.09], [0.45, -0.25, 0.08], [-0.55, 0.1, 0.07]];
    cr.forEach(([dx, dy, rr]) => {
      ctx.fillStyle = "rgba(50,48,44,0.5)"; ctx.beginPath(); ctx.arc(cx + dx * R, cy + dy * R, rr * R, 0, Math.PI * 2); ctx.fill();
    });
    // Occator: bright salt spots
    const ox = cx + R * 0.15, oy = cy - R * 0.15;
    ctx.fillStyle = "rgba(40,38,35,0.6)"; ctx.beginPath(); ctx.arc(ox, oy, R * 0.2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#f5f0e0"; ctx.beginPath(); ctx.arc(ox, oy, R * 0.07, 0, Math.PI * 2); ctx.fill();
    for (const [dx, dy] of [[-0.09, 0.05], [0.08, 0.07], [0.02, -0.1]]) { ctx.beginPath(); ctx.arc(ox + dx * R, oy + dy * R, R * 0.03, 0, Math.PI * 2); ctx.fill(); }
    // Ahuna Mons: a small bright dome
    ctx.fillStyle = "#c7bfa8"; ctx.beginPath(); ctx.moveTo(cx - R * 0.35, cy + R * 0.55); ctx.lineTo(cx - R * 0.25, cy + R * 0.3); ctx.lineTo(cx - R * 0.15, cy + R * 0.55); ctx.closePath(); ctx.fill();
    ctx.restore();
    // labels
    ctx.strokeStyle = "rgba(245,240,224,0.7)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(ox + R * 0.1, oy - R * 0.1); ctx.lineTo(cx + R + 12, cy - R * 0.5); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx - R * 0.25, cy + R * 0.32); ctx.lineTo(cx + R + 12, cy + R * 0.5); ctx.stroke();
    ctx.fillStyle = C.sun; ctx.font = `10px ${mono}`; ctx.textAlign = "left";
    ctx.fillText(STR[lang].f_occator, cx + R + 14, cy - R * 0.5);
    ctx.fillText(STR[lang].f_ahuna, cx + R + 14, cy + R * 0.5 + 4);
  } else {
    // Vesta: irregular, brighter, basaltic, with a big south-pole basin
    const g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.2, cx, cy, R);
    g.addColorStop(0, "#cdbfa0"); g.addColorStop(1, "#8a7a5c");
    ctx.fillStyle = g; ctx.beginPath();
    ctx.moveTo(cx + R, cy);
    for (let a = 0; a <= Math.PI * 2 + 0.01; a += Math.PI / 10) {
      const rr = R * (0.86 + 0.14 * Math.sin(a * 2.3 + 1));
      ctx.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.92);
    }
    ctx.closePath(); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R * 1.05, 0, Math.PI * 2); ctx.clip();
    // basaltic mottling
    for (const [dx, dy, rr] of [[-0.3, -0.35, 0.1], [0.35, -0.2, 0.08], [0.1, 0.05, 0.07]]) {
      ctx.fillStyle = "rgba(70,60,44,0.4)"; ctx.beginPath(); ctx.arc(cx + dx * R, cy + dy * R, rr * R, 0, Math.PI * 2); ctx.fill();
    }
    // dark basaltic highlight streaks
    ctx.strokeStyle = "rgba(60,50,36,0.4)"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, cy, R * 0.55, 0.4, 1.5); ctx.stroke();
    // south-pole impact basin (bottom)
    ctx.fillStyle = "rgba(60,52,40,0.55)"; ctx.beginPath(); ctx.ellipse(cx, cy + R * 0.72, R * 0.5, R * 0.28, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "rgba(200,188,160,0.5)"; ctx.beginPath(); ctx.arc(cx, cy + R * 0.72, R * 0.1, 0, Math.PI * 2); ctx.fill(); // central peak
    ctx.restore();
    ctx.strokeStyle = "rgba(255,207,107,0.6)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cx, cy + R * 0.9); ctx.lineTo(cx + R + 12, cy + R * 0.7); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx + R * 0.5, cy - R * 0.2); ctx.lineTo(cx + R + 12, cy - R * 0.5); ctx.stroke();
    ctx.fillStyle = C.sun; ctx.font = `10px ${mono}`; ctx.textAlign = "left";
    ctx.fillText(STR[lang].f_basalt, cx + R + 14, cy - R * 0.5);
    ctx.fillText(STR[lang].f_south, cx + R + 14, cy + R * 0.7 + 4);
  }
  // diameter caption
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(body === "ceres" ? "≈940 km diameter" : "≈525 km diameter", cx, cy + R + 22);
}

export function CeresVesta() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [body, setBody] = useState("ceres");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, body, lang);
  }, [cw, body, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 02</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{t.threadText}</p>
        </div>
        <div style={styles.fateBox}>
          <div style={{ ...styles.fateLabel, color: C.sun }}>{body === "ceres" ? t.ceresKey : t.vestaKey}</div>
          <p style={styles.keyTermText}>{body === "ceres" ? t.ceresText : t.vestaText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          {[["ceres", t.ceres], ["vesta", t.vesta]].map(([id, label]) => (
            <button key={id} onClick={() => setBody(id)}
              style={{ ...styles.chip, ...(body === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{body === "ceres" ? t.noteC : t.noteV}</p>
      </div>
    </div>
  );
}

export default CeresVesta;
