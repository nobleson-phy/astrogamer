/* ============================================================
   STATION 5 — KUIPER BELT & OORT CLOUD
   The two great reservoirs of comets. The KUIPER BELT is a flat,
   disk-shaped region of icy-rocky planetesimals just beyond Neptune
   (~30-50 AU) — a leftover from formation whose discovery, plus
   evidence of giant-planet migration, reshaped our picture of the
   solar system. The OORT CLOUD is a vast SPHERICAL shell of billions
   of comets extending tens of thousands of AU. Grounded in Ch.13 §13.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Kuiper belt & Oort cloud",
    kind: "Where the comets come from",
    lede: "Comets have two homes. Switch between them and mind the scale: the Kuiper belt is a flat disk just past Neptune; the Oort cloud is a giant sphere thousands of times farther out.",
    thread: "THE STORY CONTINUES",
    threadText: "Comets don't come from nowhere. They fall in from two enormous reservoirs at the cold edge of the Sun's realm — one a flat disk, the other a great surrounding shell.",
    kuiperKey: "THE KUIPER BELT — A DISK BEYOND NEPTUNE",
    kuiperText: "The Kuiper belt is a disk-shaped region of icy-and-rocky planetesimals lying just beyond the orbit of Neptune (roughly 30–50 AU). It is a leftover reservoir from the solar system's formation, and Pluto is one of its members. Discovering it — a vast ring of icy relics — reshaped our understanding of the solar system, revealing that the orbits of these planetesimals were dynamically sculpted by the gravitational migrations of the giant planets.",
    oortKey: "THE OORT CLOUD — A SPHERE OF BILLIONS",
    oortText: "The Oort cloud is a roughly SPHERICAL shell of billions of cometary bodies surrounding the entire solar system and extending tens of thousands of AU into space — nearly a quarter of the way to the nearest star. Long-period comets fall in from here. If each of its ~10¹² comets has a mass around 10¹⁵ kg, the whole cloud totals ~10²⁷ kg — roughly half the mass of Jupiter.",
    kuiper: "Kuiper belt", oort: "Oort cloud",
    lblNeptune: "Neptune's orbit", lblDisk: "flat disk · 30–50 AU",
    lblInner: "entire planetary system (a dot at this scale)", lblShell: "spherical shell · tens of thousands of AU",
    mass: "Oort mass ≈ 10¹² × 10¹⁵ kg ≈ 10²⁷ kg ≈ ½ Jupiter",
    noteK: "The Kuiper belt is a flat disk of icy planetesimals just beyond Neptune; finding it — and signs of giant-planet migration — rewrote the solar system's history.",
    noteO: "The Oort cloud is a spherical shell of ~10¹² comets, tens of thousands of AU out, totalling about half Jupiter's mass.",
  },
  ja: {
    title: "カイパーベルトとオールトの雲",
    kind: "彗星の故郷",
    lede: "彗星には2つの故郷があります。切り替えて、スケールに注意しよう：カイパーベルトは海王星のすぐ外の平らな円盤、オールトの雲は数千倍も遠い巨大な球です。",
    thread: "物語はつづく",
    threadText: "彗星はどこからともなく来るのではありません。太陽の領域の冷たい果てにある2つの巨大な貯蔵庫——一つは平らな円盤、もう一つは取り囲む大きな殻——から落ちてきます。",
    kuiperKey: "カイパーベルト——海王星の外の円盤",
    kuiperText: "カイパーベルトは、海王星の軌道のすぐ外（およそ30〜50 AU）にある、氷と岩の微惑星の円盤状の領域です。太陽系の形成時に残された貯蔵庫で、冥王星もその一員です。これ——氷の遺物の広大な環——の発見は太陽系の理解を塗り替え、これらの微惑星の軌道が巨大惑星の重力的な移動によって力学的に形作られたことを明らかにしました。",
    oortKey: "オールトの雲——数十億の球",
    oortText: "オールトの雲は、太陽系全体を取り囲み、数万AU——最も近い恒星までのほぼ4分の1——まで広がる、数十億の彗星状天体のほぼ球状の殻です。長周期彗星はここから落ちてきます。約10¹²個の彗星がそれぞれ約10¹⁵ kgの質量を持つなら、雲全体で約10²⁷ kg——木星のおよそ半分の質量になります。",
    kuiper: "カイパーベルト", oort: "オールトの雲",
    lblNeptune: "海王星の軌道", lblDisk: "平らな円盤 · 30〜50 AU",
    lblInner: "惑星系全体（このスケールでは点）", lblShell: "球状の殻 · 数万AU",
    mass: "オールト質量 ≈ 10¹² × 10¹⁵ kg ≈ 10²⁷ kg ≈ 木星の½",
    noteK: "カイパーベルトは海王星のすぐ外にある氷の微惑星の平らな円盤。その発見と巨大惑星移動の兆候が、太陽系の歴史を書き換えました。",
    noteO: "オールトの雲は約10¹²個の彗星の球状の殻で、数万AUの彼方にあり、合計で木星の約半分の質量です。",
  },
};

function draw(ctx, cw, H, mode, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2;
  // Sun
  ctx.fillStyle = "#ffd86b"; ctx.beginPath(); ctx.arc(cx, cy, mode === "kuiper" ? 8 : 3, 0, Math.PI * 2); ctx.fill();
  if (mode === "kuiper") {
    // planet orbits (inner), then Neptune, then flat Kuiper disk beyond
    ctx.strokeStyle = "rgba(150,175,230,0.18)"; ctx.lineWidth = 1;
    const yS = 0.34;
    [0.14, 0.22, 0.3].forEach((r) => { ctx.beginPath(); ctx.ellipse(cx, cy, r * cw * 0.5, r * cw * 0.5 * yS, 0, 0, Math.PI * 2); ctx.stroke(); });
    // Neptune orbit
    const nR = 0.4 * cw * 0.5;
    ctx.strokeStyle = "rgba(120,160,255,0.5)"; ctx.beginPath(); ctx.ellipse(cx, cy, nR, nR * yS, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = "#5b8fd8"; ctx.beginPath(); ctx.arc(cx + nR, cy, 4, 0, Math.PI * 2); ctx.fill();
    // Kuiper belt disk of dots beyond Neptune
    for (let i = 0; i < 400; i++) {
      const ang = Math.random() * Math.PI * 2;
      const rr = (0.46 + Math.random() * 0.5) * cw * 0.5;
      if (rr > cw * 0.5 - 8) continue;
      const x = cx + Math.cos(ang) * rr, y = cy + Math.sin(ang) * rr * yS + (Math.random() - 0.5) * 6;
      ctx.fillStyle = `rgba(180,210,240,${0.3 + Math.random() * 0.4})`; ctx.fillRect(x, y, 1.4, 1.4);
    }
    ctx.fillStyle = "rgba(120,160,255,0.9)"; ctx.font = `10px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(t.lblNeptune, cx, cy - nR * yS - 8);
    ctx.fillStyle = C.sun; ctx.fillText(t.lblDisk, cx, cy + cw * 0.5 * 0.48 * yS + 30 > H - 6 ? H - 6 : cy + cw * 0.5 * 0.48 * yS + 30);
  } else {
    // Oort: spherical shell of dots surrounding a tiny inner system
    const rMax = Math.min(cw * 0.46, H * 0.46);
    // faint tiny disk at centre = whole planetary system
    ctx.strokeStyle = "rgba(255,207,107,0.5)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(cx, cy, 14, 0, Math.PI * 2); ctx.stroke();
    // spherical shell (draw dots on a sphere projected to 2D annulus, denser at limb)
    for (let i = 0; i < 900; i++) {
      // random point on sphere
      const u = Math.random() * 2 - 1, th = Math.random() * Math.PI * 2;
      const rr = Math.sqrt(1 - u * u);
      const sx = rr * Math.cos(th), sy = rr * Math.sin(th), sz = u;
      const rad = rMax * (0.82 + Math.random() * 0.18);
      const x = cx + sx * rad, y = cy + sy * rad * 0.9;
      const depth = 0.4 + (sz + 1) / 2 * 0.6;
      ctx.fillStyle = `rgba(200,220,255,${0.18 * depth})`; ctx.fillRect(x, y, 1.3, 1.3);
    }
    // ring outline to suggest the shell
    ctx.strokeStyle = "rgba(160,190,240,0.2)"; ctx.beginPath(); ctx.ellipse(cx, cy, rMax, rMax * 0.9, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = C.sun; ctx.font = `10px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(t.lblShell, cx, 16);
    ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`;
    ctx.fillText(t.lblInner, cx, cy + 30);
  }
}

export function Reservoirs() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("kuiper");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, mode, 0, lang);
  }, [cw, mode, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 05</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{t.threadText}</p>
        </div>
        <div style={styles.fateBox}>
          <div style={{ ...styles.fateLabel, color: C.sun }}>{mode === "kuiper" ? t.kuiperKey : t.oortKey}</div>
          <p style={styles.keyTermText}>{mode === "kuiper" ? t.kuiperText : t.oortText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          {[["kuiper", t.kuiper], ["oort", t.oort]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        {mode === "oort" && (
          <div style={{ fontFamily: mono, fontSize: 11.5, color: C.cool, marginTop: 8 }}>{t.mass}</div>
        )}
        <p style={{ ...styles.note, maxWidth: "none" }}>{mode === "kuiper" ? t.noteK : t.noteO}</p>
      </div>
    </div>
  );
}

export default Reservoirs;
