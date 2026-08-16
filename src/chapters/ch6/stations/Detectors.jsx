/* ============================================================
   STATION 6 — MODERN DETECTORS
   CCDs (charge-coupled devices) have largely replaced photographic
   film. A CCD catches most of the photons that fall on it (~70-90%),
   where film records only a few percent and the eye even less — and
   it stores a permanent, accurate digital record. INFRARED detectors
   face a further problem: any warm object glows in the infrared, so a
   warm detector would drown the faint cosmic IR signal in its own
   heat glow. They must be cooled to near ABSOLUTE ZERO with liquid
   helium or nitrogen. (Infrared astronomy is also done from high dry
   peaks or space, above the atmosphere's IR-absorbing water vapour.)
   Grounded in Ch.6 §6.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp, lerp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const DETS = [
  { id: "eye",  en: "Human eye",         ja: "人の目",   eff: 1,  col: C.faint },
  { id: "film", en: "Photographic film", ja: "写真フィルム", eff: 4,  col: C.violet },
  { id: "ccd",  en: "CCD",               ja: "CCD",     eff: 85, col: C.good },
];

const STR = {
  en: {
    title: "Modern detectors",
    kind: "CCDs vs film · cooling the infrared",
    lede: "The light is gathered and focused — now something must record it. Compare how many photons each detector actually catches, then cool an infrared detector down and watch its own heat-glow disappear.",
    thread: "THE STORY CONTINUES",
    threadText: "Every telescope in this chapter exists to deliver light to a detector. For most of history that detector was the human eye, then photographic film. Both waste almost all the light. The device that changed astronomy catches nearly all of it — and never forgets what it saw.",
    key: "COOL THE INFRARED DETECTOR TO NEAR ABSOLUTE ZERO",
    keyText: "A CCD records a permanent digital image and catches most of the photons that reach it — far more than film's few percent or the eye's even smaller share. Infrared detectors carry an extra burden: every warm object radiates its own infrared, so a warm detector would swamp the faint cosmic signal with its own glow. They are cooled with liquid helium or nitrogen to near absolute zero so the detector's self-glow vanishes and the faint infrared signal shows through.",
    effL: "Photon efficiency — fraction of incoming light recorded",
    effNote: "A CCD catches most of the light; film records a few percent; the eye even less. The digital record is also permanent and accurate.",
    tempL: "Infrared detector temperature",
    warm: "Warm detector — its own IR glow floods the frame",
    cold: "Cold detector — self-glow gone, faint signal clean",
    self: "Detector self-glow",
    sig: "Faint star signal",
    lost: "lost in the glow",
    clean: "clean",
    heO: "liquid helium ≈ 4 K",
    nO: "liquid nitrogen ≈ 77 K",
    roomO: "room temperature ≈ 300 K",
    coolNote: "Below about 77 K the detector's own glow fades; near 4 K it is essentially gone and the faint cosmic infrared shows through.",
    kelvin: "K",
  },
  ja: {
    title: "現代の検出器",
    kind: "CCDとフィルム · 赤外線を冷やす",
    lede: "光は集められ焦点を結んだ——今度はそれを記録するものが要ります。各検出器が実際に何個の光子を捉えるかを比べ、赤外線検出器を冷やして、自らの熱の輝きが消える様子を見てみよう。",
    thread: "物語はつづく",
    threadText: "この章のすべての望遠鏡は、光を検出器へ届けるために存在します。歴史の大半でその検出器は人の目、次いで写真フィルムでした。どちらも光のほとんどを無駄にします。天文学を変えた装置は、そのほぼすべてを捉え、見たものを決して忘れません。",
    key: "赤外線検出器を絶対零度近くまで冷やす",
    keyText: "CCDは恒久的なデジタル像を記録し、届いた光子のほとんどを捉えます——フィルムの数パーセントや、さらに少ない目の取り分をはるかに上回ります。赤外線検出器にはもう一つの重荷があります。あらゆる温かい物体は自ら赤外線を放つため、温かい検出器は自身の輝きでかすかな宇宙の信号を覆い隠してしまうのです。液体ヘリウムや窒素で絶対零度近くまで冷やし、検出器の自己発光を消して、かすかな赤外線の信号を見えるようにします。",
    effL: "光子効率——記録される入射光の割合",
    effNote: "CCDは光のほとんどを捉え、フィルムは数パーセント、目はさらに少ない。デジタル記録は恒久的で正確でもあります。",
    tempL: "赤外線検出器の温度",
    warm: "温かい検出器——自らの赤外線の輝きが画面を覆う",
    cold: "冷たい検出器——自己発光が消え、かすかな信号が澄む",
    self: "検出器の自己発光",
    sig: "かすかな星の信号",
    lost: "輝きに埋もれる",
    clean: "澄んでいる",
    heO: "液体ヘリウム ≈ 4 K",
    nO: "液体窒素 ≈ 77 K",
    roomO: "室温 ≈ 300 K",
    coolNote: "およそ77 K以下で検出器自身の輝きは薄れ、4 K近くではほぼ消えて、かすかな宇宙赤外線が見えてきます。",
    kelvin: "K",
  },
};

function drawEff(ctx, w, h, lang) {
  ctx.clearRect(0, 0, w, h);
  const pad = 14;
  const rowH = (h - pad * 2) / DETS.length;
  const labelW = Math.min(w * 0.3, 130);
  const barX = pad + labelW;
  const barMax = w - barX - 54;
  DETS.forEach((d, i) => {
    const cy = pad + rowH * i + rowH / 2;
    // label
    ctx.fillStyle = "#dbe4ff"; ctx.font = `13px ${mono}`; ctx.textAlign = "left";
    ctx.fillText(lang === "ja" ? d.ja : d.en, pad, cy + 4);
    // track
    ctx.fillStyle = "rgba(120,150,210,0.12)";
    ctx.beginPath(); ctx.rect(barX, cy - 9, barMax, 18); ctx.fill();
    // filled bar
    const bw = barMax * (d.eff / 100);
    ctx.fillStyle = d.col;
    ctx.beginPath(); ctx.rect(barX, cy - 9, Math.max(bw, 2), 18); ctx.fill();
    // value
    ctx.fillStyle = d.col; ctx.font = `13px ${mono}`; ctx.textAlign = "left";
    ctx.fillText(`~${d.eff}%`, barX + barMax + 8, cy + 4);
  });
}

function drawIR(ctx, w, h, temp, p, lang) {
  ctx.clearRect(0, 0, w, h);
  // glow rises steeply with temperature; negligible near 4 K, floods near 300 K
  const glow = clamp((temp - 30) / (300 - 30), 0, 1) ** 1.4;
  const cx = w / 2, cy = h / 2;

  // faint cosmic infrared source (a dim red-ish star) + a few background points
  const sig = 1 - glow;
  ctx.fillStyle = `rgba(255,150,90,${0.35 + 0.55 * sig})`;
  const bgs = [[0.3, 0.35], [0.7, 0.62], [0.52, 0.28], [0.22, 0.72]];
  bgs.forEach((s) => { ctx.beginPath(); ctx.arc(s[0] * w, s[1] * h, 1.6, 0, Math.PI * 2); ctx.fill(); });
  const sr = 9;
  const g0 = ctx.createRadialGradient(cx, cy, 0, cx, cy, sr);
  g0.addColorStop(0, `rgba(255,190,120,${0.5 + 0.5 * sig})`); g0.addColorStop(1, "rgba(255,190,120,0)");
  ctx.fillStyle = g0; ctx.beginPath(); ctx.arc(cx, cy, sr, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = `rgba(255,225,190,${0.4 + 0.6 * sig})`;
  ctx.beginPath(); ctx.arc(cx, cy, 2.6, 0, Math.PI * 2); ctx.fill();

  // the detector's own thermal-IR self-glow flooding the whole frame
  if (glow > 0.02) {
    const shimmer = reduceMotion ? 0 : 0.05 * Math.sin(p * 3);
    const a = clamp(glow + shimmer, 0, 1);
    ctx.fillStyle = `rgba(255,90,40,${0.62 * a})`;
    ctx.fillRect(0, 0, w, h);
    // hot speckle to suggest thermal noise
    ctx.fillStyle = `rgba(255,140,60,${0.5 * a})`;
    for (let k = 0; k < 40; k++) {
      const rx = (Math.sin(k * 12.9 + p) * 0.5 + 0.5) * w;
      const ry = (Math.cos(k * 7.7 + p * 0.7) * 0.5 + 0.5) * h;
      ctx.beginPath(); ctx.arc(rx, ry, 1.4, 0, Math.PI * 2); ctx.fill();
    }
  }

  // temperature readout on-canvas
  ctx.fillStyle = glow > 0.5 ? "#ffe0d0" : C.good;
  ctx.font = `bold 15px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(`${Math.round(temp)} K`, 12, 22);
}

export function Detectors() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const cw = Math.min(w, 760);
  const effRef = useRef(null);
  const irRef = useRef(null);
  const [temp, setTemp] = useState(4);
  const glow = clamp((temp - 30) / (300 - 30), 0, 1) ** 1.4;
  const warm = glow > 0.35;

  useEffect(() => {
    const c = effRef.current;
    if (!c) return;
    const eh = 120;
    const ctx = setupCanvas(c, cw, eh);
    drawEff(ctx, cw, eh, lang);
  }, [cw, lang]);

  useEffect(() => {
    const c = irRef.current;
    if (!c) return;
    const ih = 200;
    const ctx = setupCanvas(c, cw, ih);
    if (reduceMotion) { drawIR(ctx, cw, ih, temp, 0, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 0.05; drawIR(ctx, cw, ih, temp, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, temp, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 06</div>
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

        {/* (a) efficiency comparison */}
        <div style={{ fontFamily: mono, fontSize: 12.5, color: C.faint, marginBottom: 6 }}>{t.effL}</div>
        <canvas ref={effRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        <p style={{ ...styles.note, maxWidth: "none", marginTop: 8 }}>{t.effNote}</p>

        {/* (b) infrared detector temperature */}
        <div style={{ marginTop: 18, fontFamily: mono, fontSize: 12.5, color: C.faint, marginBottom: 6 }}>{t.tempL}</div>
        <canvas ref={irRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />

        <input type="range" min={4} max={300} step={1} value={temp}
          onChange={(e) => setTemp(Number(e.target.value))} style={styles.range} />
        <div style={styles.rangeEnds}>
          <span>{t.heO}</span><span>{t.nO}</span><span>{t.roomO}</span>
        </div>

        {/* self-glow vs signal readout */}
        <div style={{ marginTop: 14, border: `1px solid ${C.border}`, borderRadius: 12, background: "rgba(8,12,26,0.6)", padding: "14px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ fontFamily: mono, fontSize: 13, color: C.muted }}>{t.self}</span>
            <span style={{ fontFamily: mono, fontSize: 14, color: warm ? C.danger : C.good }}>
              {Math.round(glow * 100)}%
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ fontFamily: mono, fontSize: 13, color: C.muted }}>{t.sig}</span>
            <span style={{ fontFamily: mono, fontSize: 14, color: warm ? C.danger : C.good }}>
              {warm ? t.lost : t.clean}
            </span>
          </div>
          <p style={{ ...styles.stageDesc, marginTop: 4, maxWidth: "none", color: warm ? "#ffd8cc" : "#dbe4ff" }}>
            {warm ? t.warm : t.cold}
          </p>
          <p style={{ ...styles.note, maxWidth: "none", marginTop: 8 }}>{t.coolNote}</p>
        </div>
      </div>
    </div>
  );
}

export default Detectors;
