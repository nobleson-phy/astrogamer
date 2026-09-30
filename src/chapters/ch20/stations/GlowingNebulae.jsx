/* ============================================================
   STATION 2 — GLOWING NEBULAE
   A dusty, gassy cloud near a star glows in one of two ways. If the star
   is hotter than ~25,000 K, its ultraviolet light (< 91.2 nm) IONIZES the
   surrounding hydrogen; as electrons recombine they emit the red H-alpha
   line, making a red EMISSION nebula (H II region). Cooler stars lack that
   UV, so instead their light simply reflects off dust — and since dust
   scatters blue best, we see a blue REFLECTION nebula. Grounded in Ch.20 §20.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Glowing nebulae",
    kind: "Red emission or blue reflection?",
    lede: "Heat up the star and watch its nebula change color. Cross ~25,000 K and blue reflection flips to red emission — the difference is whether hydrogen gets ionized.",
    thread: "THE STORY CONTINUES",
    threadText: "The same cloud of gas and dust can shine red or blue, depending entirely on the star lighting it. The color is a thermometer for the star.",
    key: "HOT STARS IONIZE HYDROGEN → RED; COOL STARS → BLUE",
    keyText: "A star hotter than about 25,000 K pours out ultraviolet light energetic enough (wavelengths below 91.2 nm) to IONIZE nearby hydrogen. When the freed electrons recombine and cascade down, they emit the red H-alpha line, producing a glowing red EMISSION nebula, or H II region. A cooler star lacks that ionizing UV, so its surrounding cloud can't emit — instead, starlight simply scatters off the dust. Because tiny dust grains scatter blue light far more efficiently than red, we see a blue REFLECTION nebula, like the haze around the Pleiades.",
    temp: "Star temperature",
    emission: "EMISSION nebula (H II) — hydrogen ionized, red H-alpha", reflection: "REFLECTION nebula — dust scatters blue starlight",
    note: "Above ~25,000 K a star's UV ionizes hydrogen, giving a red H-alpha emission nebula; cooler stars only light dust, which scatters blue — a reflection nebula.",
  },
  ja: {
    title: "輝く星雲",
    kind: "赤い輝線か、青い反射か",
    lede: "星を熱くして、星雲の色が変わるのを見よう。約25,000 Kを越えると青い反射が赤い輝線に切り替わる——違いは水素が電離するかどうかです。",
    thread: "物語はつづく",
    threadText: "同じガスと塵の雲が、照らす星次第で赤にも青にも輝きます。その色は星の温度計です。",
    key: "高温の星は水素を電離→赤、低温の星→青",
    keyText: "約25,000 Kより高温の星は、近くの水素を電離できるほどエネルギーの高い紫外線（91.2 nm未満）を放ちます。解放された電子が再結合して落ちると、赤いHα線を放ち、輝く赤い輝線星雲、すなわちH II領域を作ります。低温の星はその電離紫外線に乏しいので、周囲の雲は発光できません——代わりに星の光がただ塵で散乱します。微小な塵の粒は赤より青の光をはるかに効率よく散乱するので、プレアデスの周りのもやのような青い反射星雲が見えます。",
    temp: "星の温度",
    emission: "輝線星雲（H II）——水素が電離、赤いHα", reflection: "反射星雲——塵が青い星の光を散乱",
    note: "約25,000 Kを超えると星の紫外線が水素を電離し、赤いHα輝線星雲になります。低温の星は塵を照らすだけで、青を散乱する反射星雲です。",
  },
};

function draw(ctx, cw, H, T, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H * 0.44, isEmission = T >= 25000;
  // nebula cloud
  const nebCol = isEmission ? "255,90,90" : "120,160,255";
  const R = Math.min(cw * 0.32, H * 0.44);
  for (let i = 0; i < 60; i++) {
    const a = i * 2.4, r = Math.sqrt((i % 30) / 30) * R;
    const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r * 0.8;
    ctx.fillStyle = `rgba(${nebCol},${0.06 + Math.random() * 0.05})`;
    ctx.beginPath(); ctx.arc(x, y, 10 + Math.random() * 14, 0, Math.PI * 2); ctx.fill();
  }
  // central star colored by temperature
  const starCol = T >= 25000 ? "#9bb4ff" : T >= 10000 ? "#dfe6ff" : T >= 6000 ? "#fff4e8" : "#ffd08a";
  const glow = ctx.createRadialGradient(cx, cy, 2, cx, cy, 24); glow.addColorStop(0, "#fff"); glow.addColorStop(0.4, starCol); glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(cx, cy, 24, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = starCol; ctx.beginPath(); ctx.arc(cx, cy, 9, 0, Math.PI * 2); ctx.fill();
  // UV rays ionizing (emission) vs scattered starlight (reflection)
  if (isEmission) {
    ctx.strokeStyle = "rgba(200,150,255,0.5)"; ctx.lineWidth = 1;
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) { ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * 12, cy + Math.sin(a) * 12); ctx.lineTo(cx + Math.cos(a) * 34, cy + Math.sin(a) * 34); ctx.stroke(); }
  }
  ctx.fillStyle = isEmission ? "#ff8f8f" : "#8fb8ff"; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(isEmission ? t.emission : t.reflection, cx, H - 12);
}

export function GlowingNebulae() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [T, setT] = useState(30000);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, T, lang);
  }, [cw, T, lang]);

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
          <div style={{ ...styles.fateLabel, color: C.sun }}>{t.key}</div>
          <p style={styles.keyTermText}>{t.keyText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.temp}</span>
          <input type="range" min="5000" max="40000" step="1000" value={T}
            onChange={(e) => setT(parseInt(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
          <span style={{ fontFamily: mono, fontSize: 12, color: T >= 25000 ? "#ff8f8f" : "#8fb8ff", width: 66, textAlign: "right" }}>{(T / 1000).toFixed(0)}k K</span>
        </div>

        <div style={{ marginTop: 4 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default GlowingNebulae;
