/* ============================================================
   STATION 8 — MODELING THE HIDDEN SUN
   We can't see inside the Sun, so we model it. HELIOSEISMOLOGY reads
   surface pulsations (Doppler shifts) driven by sound waves bouncing
   through the interior, letting computers reconstruct 3D maps of the
   inside — even beneath sunspots and on the far side. THEORETICAL MODELS
   apply physical laws (hydrostatic equilibrium, energy transport, gas
   laws, fusion rates) and are tuned until they match surface data,
   helioseismology, and neutrino counts. Grounded in Ch.16 §16.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Modeling the hidden Sun",
    kind: "Seeing what can't be seen",
    lede: "No telescope can look inside the Sun. Switch between the two tools that let us map it anyway — sound waves that ring through it, and physics turned into computer models.",
    thread: "THE STORY ENDS HERE",
    threadText: "Everything in this chapter describes a place no eye will ever see. How do we know? By listening to the Sun ring like a bell, and by building it from the laws of physics.",
    seismoKey: "HELIOSEISMOLOGY — LISTENING TO THE SUN RING",
    seismoText: "The Sun rings with sound waves that travel through its interior and bounce off structures within it. As those waves reach the surface, they make it pulse up and down — motions we measure as tiny Doppler shifts. Computers combine millions of these measurements to reconstruct 3D maps of temperature, density and flows deep inside — even revealing structures beneath sunspots and features on the far side of the Sun.",
    modelKey: "THEORETICAL MODELS — BUILDING THE SUN FROM PHYSICS",
    modelText: "Because we cannot inspect the interior directly, astronomers build computer models from fundamental physics: hydrostatic equilibrium, the equations of energy transport, the gas laws, and nuclear fusion reaction rates. They run the model and adjust it until its predictions match everything we can observe — surface conditions, helioseismology data, and the measured neutrino counts. A model that fits all three is our best picture of the Sun's interior.",
    seismo: "Helioseismology", model: "Theoretical models",
    doppler: "surface pulsations (Doppler shifts)", waves: "sound waves bounce through the interior",
    inputs: ["hydrostatic equilibrium", "energy transport", "gas laws", "fusion rates"],
    outputs: ["surface data", "helioseismology", "neutrino counts"], modelBox: "computer model",
    noteS: "Sound waves bouncing inside the Sun make its surface pulse; measuring those Doppler shifts lets computers map the interior in 3D — even the far side.",
    noteM: "Models apply physics — hydrostatic equilibrium, energy transport, gas laws, fusion rates — tuned until they match surface data, helioseismology, and neutrino counts.",
  },
  ja: {
    title: "隠れた太陽のモデル化",
    kind: "見えないものを見る",
    lede: "どんな望遠鏡も太陽の内部を覗けません。それでも地図化できる2つの道具を切り替えよう——太陽の中で鳴り響く音波と、物理を計算機モデルにしたもの。",
    thread: "物語はここで終わる",
    threadText: "この章のすべては、どんな目も決して見ない場所を描いています。ではなぜ分かるのか？太陽が鐘のように鳴るのを聴き、物理法則からそれを組み立てるからです。",
    seismoKey: "日震学——太陽の響きを聴く",
    seismoText: "太陽は、内部を伝わり中の構造で反射する音波で鳴り響いています。その波が表面に達すると、表面を上下に脈動させます——私たちが小さなドップラー偏移として測る動きです。計算機は何百万ものこの測定を組み合わせ、内部深くの温度・密度・流れの3次元地図を再構成します——黒点の下の構造や、太陽の裏側の様子さえ明らかにします。",
    modelKey: "理論モデル——物理から太陽を組み立てる",
    modelText: "内部を直接調べられないので、天文学者は基礎物理から計算機モデルを構築します：静水圧平衡、エネルギー輸送の方程式、気体の法則、核融合反応率です。モデルを走らせ、その予測が観測できるすべて——表面の状態、日震学のデータ、測定されたニュートリノ数——と一致するまで調整します。この3つすべてに合うモデルが、太陽内部の最良の描像です。",
    seismo: "日震学", model: "理論モデル",
    doppler: "表面の脈動（ドップラー偏移）", waves: "音波が内部を反射しながら伝わる",
    inputs: ["静水圧平衡", "エネルギー輸送", "気体の法則", "核融合率"],
    outputs: ["表面データ", "日震学", "ニュートリノ数"], modelBox: "計算機モデル",
    noteS: "太陽内部で反射する音波が表面を脈動させ、そのドップラー偏移を測ることで、計算機が内部を——裏側さえ——3次元で地図化します。",
    noteM: "モデルは物理——静水圧平衡・エネルギー輸送・気体の法則・核融合率——を適用し、表面データ・日震学・ニュートリノ数と合うまで調整します。",
  },
};

function drawSeismo(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2, R = Math.min(cw * 0.32, H * 0.46);
  const g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.2, cx, cy, R);
  g.addColorStop(0, "#ffe08a"); g.addColorStop(1, "#c9781e");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip();
  // sound-wave ray paths: chords that refract (curve) inside
  ctx.strokeStyle = "rgba(90,50,15,0.5)"; ctx.lineWidth = 1.2;
  for (let k = 0; k < 6; k++) {
    const a0 = k * 1.05 + tt * 0.003;
    ctx.beginPath();
    for (let i = 0; i <= 40; i++) {
      const f = i / 40; const ang = a0 + f * 2.2;
      const rr = R * (0.5 + 0.5 * Math.cos(f * Math.PI)); // dip inward then back out
      const x = cx + Math.cos(ang) * rr, y = cy + Math.sin(ang) * rr;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.restore();
  // surface pulsation dots (Doppler): blue approaching / red receding
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 12) {
    const puls = Math.sin(a * 4 + tt * 0.06);
    const rr = R + puls * 4;
    const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr;
    ctx.fillStyle = puls > 0 ? "rgba(120,170,255,0.9)" : "rgba(255,120,120,0.9)";
    ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2); ctx.fill();
  }
  ctx.fillStyle = C.cool; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.doppler, cx, cy + R + 18 > H - 4 ? H - 4 : cy + R + 18);
  ctx.fillStyle = "rgba(90,50,15,0.9)"; ctx.textAlign = "left"; ctx.fillText(t.waves, 8, 16);
}

function drawModel(ctx, cw, H, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  ctx.font = `9px ${mono}`; ctx.textAlign = "center";
  // inputs (left column)
  const inX = cw * 0.18, midX = cw * 0.5, outX = cw * 0.82;
  t.inputs.forEach((s, i) => {
    const y = H * 0.2 + i * (H * 0.18);
    ctx.fillStyle = "rgba(224,119,79,0.2)"; ctx.strokeStyle = "#e0774f"; ctx.lineWidth = 1;
    ctx.fillRect(inX - 62, y - 11, 124, 22); ctx.strokeRect(inX - 62, y - 11, 124, 22);
    ctx.fillStyle = C.text; ctx.fillText(s, inX, y + 3);
    // arrow to model
    ctx.strokeStyle = "rgba(150,175,230,0.4)"; ctx.beginPath(); ctx.moveTo(inX + 62, y); ctx.lineTo(midX - 44, H / 2); ctx.stroke();
  });
  // model box (center)
  ctx.fillStyle = "rgba(255,207,107,0.15)"; ctx.strokeStyle = C.sun; ctx.lineWidth = 1.5;
  ctx.fillRect(midX - 44, H / 2 - 22, 88, 44); ctx.strokeRect(midX - 44, H / 2 - 22, 88, 44);
  ctx.fillStyle = C.sun; ctx.font = `10px ${mono}`; ctx.fillText(t.modelBox, midX, H / 2 + 3);
  // outputs (right column) with match check
  t.outputs.forEach((s, i) => {
    const y = H * 0.26 + i * (H * 0.24);
    ctx.fillStyle = "rgba(143,192,232,0.2)"; ctx.strokeStyle = "#8fc0e8"; ctx.lineWidth = 1;
    ctx.fillRect(outX - 58, y - 11, 116, 22); ctx.strokeRect(outX - 58, y - 11, 116, 22);
    ctx.fillStyle = C.text; ctx.font = `9px ${mono}`; ctx.fillText(s, outX - 6, y + 3);
    ctx.fillStyle = C.good; ctx.font = `11px ${mono}`; ctx.fillText("✓", outX + 46, y + 3);
    ctx.strokeStyle = "rgba(150,175,230,0.4)"; ctx.beginPath(); ctx.moveTo(midX + 44, H / 2); ctx.lineTo(outX - 58, y); ctx.stroke();
  });
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(lang === "ja" ? "物理法則" : "physics laws", inX, H * 0.1);
  ctx.fillText(lang === "ja" ? "観測と照合" : "match observations", outX, H * 0.1);
}

export function ModelingSun() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("seismo");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (mode === "model") { drawModel(ctx, cw, H, lang); return; }
    if (reduceMotion) { drawSeismo(ctx, cw, H, 30, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; drawSeismo(ctx, cw, H, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, mode, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 08</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{t.threadText}</p>
        </div>
        <div style={styles.fateBox}>
          <div style={{ ...styles.fateLabel, color: C.sun }}>{mode === "seismo" ? t.seismoKey : t.modelKey}</div>
          <p style={styles.keyTermText}>{mode === "seismo" ? t.seismoText : t.modelText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          {[["seismo", t.seismo], ["model", t.model]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{mode === "seismo" ? t.noteS : t.noteM}</p>
      </div>
    </div>
  );
}

export default ModelingSun;
