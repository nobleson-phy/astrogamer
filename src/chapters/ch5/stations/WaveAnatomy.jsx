/* ============================================================
   STATION 1 — WAVE ANATOMY
   Light is an electromagnetic wave. Its wavelength (λ) is the length
   of one full cycle, crest to crest; its frequency (f) is how many
   cycles pass each second; its amplitude is the height of the swing.
   They are tied together by the speed of light: c = λf, a constant
   (~3×10⁸ m/s). So a shorter wavelength MUST mean a higher frequency.
   James Clerk Maxwell unified electricity and magnetism and showed
   that light itself is an electromagnetic wave.
   Grounded in Ch.5 §5.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp, lerpColor } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Wave anatomy",
    kind: "Light as an electromagnetic wave — λ, f, and c = λf",
    lede: "Slide from long, lazy waves to short, rapid ones. As the wavelength shrinks, more cycles crowd the same space and the frequency climbs — because the speed of light never changes.",
    thread: "THE STORY BEGINS",
    threadText: "Nearly everything we know about the stars arrives as light. To decode that starlight we first have to know what light IS. Our journey starts here: light travelling as a wave — a shape with a length, a rhythm, and a height.",
    key: "MAXWELL'S GREAT UNIFICATION",
    keyText: "In the 1860s James Clerk Maxwell wove electricity and magnetism into a single theory and found that its waves travel at exactly the measured speed of light. His conclusion was breathtaking: light itself IS an electromagnetic wave. The wavelength is simply the length of one full cycle, crest to crest.",
    wl: "Wavelength", freq: "Frequency",
    slide: "Drag the wavelength (long → short):",
    longEnd: "long λ", shortEnd: "short λ",
    lambdaLabel: "λ · one full cycle",
    ampLabel: "amplitude",
    cNote: "c = λ × f ≈ 3×10⁸ m/s — the speed of light, always constant",
    relNote: "Shorten λ and f must rise to keep c = λf fixed. (Values here are illustrative but keep the correct proportion.)",
  },
  ja: {
    title: "波の解剖",
    kind: "電磁波としての光 — λ・f と c = λf",
    lede: "長くゆったりした波から、短く速い波へとスライドさせよう。波長が縮むほど、同じ空間により多くの波が詰め込まれ、振動数が上がります——光の速さは決して変わらないからです。",
    thread: "物語のはじまり",
    threadText: "星について知ることのほとんどは、光となって届きます。その星の光を読み解くには、まず光とは何かを知らねばなりません。旅はここから始まります——波として進む光、すなわち「長さ」「リズム」「高さ」をもつ形として。",
    key: "マクスウェルの大統一",
    keyText: "1860年代、ジェームズ・クラーク・マクスウェルは電気と磁気を一つの理論に織り上げ、その波が測定された光速とぴたり同じ速さで進むことを見いだしました。その結論は驚くべきものでした——光そのものが電磁波なのです。波長とは、山から山までの一波、すなわち一周期の長さにほかなりません。",
    wl: "波長", freq: "振動数",
    slide: "波長を動かそう（長い → 短い）：",
    longEnd: "長い λ", shortEnd: "短い λ",
    lambdaLabel: "λ・一波（一周期）",
    ampLabel: "振幅",
    cNote: "c = λ × f ≈ 3×10⁸ m/s — 光の速さ、つねに一定",
    relNote: "λ を短くすると、c = λf を保つため f は必ず上がります。（数値は分かりやすさ優先で、比例関係は正しく保っています。）",
  },
};

/* draw a travelling sine wave with a marked wavelength span + amplitude arrow */
function drawWave(ctx, cw, H, lambda, phase, t) {
  ctx.clearRect(0, 0, cw, H);
  const baseline = H / 2;
  const A = H * 0.27;

  // physical width of the canvas in "nm" — sets how many cycles fit
  const W_PHYS = 2500; // nm across the canvas
  const cycles = W_PHYS / lambda; // shorter λ ⇒ more cycles
  const k = (2 * Math.PI * cycles) / cw;

  // colour drifts violet (short λ) → red (long λ) purely for illustration
  const cf = clamp((lambda - 250) / (1200 - 250), 0, 1);
  const col = lerpColor("#c98bff", "#ff6b6b", cf);

  // baseline axis
  ctx.strokeStyle = "rgba(150,175,230,0.25)";
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath(); ctx.moveTo(0, baseline); ctx.lineTo(cw, baseline); ctx.stroke();
  ctx.setLineDash([]);

  // the wave
  ctx.strokeStyle = col;
  ctx.lineWidth = 2.5;
  ctx.shadowColor = col; ctx.shadowBlur = 10;
  ctx.beginPath();
  for (let x = 0; x <= cw; x++) {
    const y = baseline - A * Math.sin(k * x + phase);
    if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.shadowBlur = 0;

  // find a crest to anchor the labels (argument = π/2)
  const pxLambda = cw / cycles;
  let x1 = (Math.PI / 2 - phase) / k;
  while (x1 < cw * 0.14) x1 += pxLambda;
  while (x1 > cw * 0.5) x1 -= pxLambda;
  const x2 = x1 + pxLambda;

  // wavelength span (crest-to-crest) near the top
  const yTop = 22;
  ctx.strokeStyle = C.sun; ctx.lineWidth = 1.4;
  ctx.setLineDash([3, 3]);
  ctx.beginPath(); ctx.moveTo(x1, yTop); ctx.lineTo(x1, baseline - A); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x2, yTop); ctx.lineTo(x2, baseline - A); ctx.stroke();
  ctx.setLineDash([]);
  // horizontal double arrow
  ctx.strokeStyle = C.sun; ctx.fillStyle = C.sun; ctx.lineWidth = 1.6;
  ctx.beginPath(); ctx.moveTo(x1, yTop); ctx.lineTo(x2, yTop); ctx.stroke();
  const ah = 5;
  ctx.beginPath(); ctx.moveTo(x1, yTop); ctx.lineTo(x1 + ah, yTop - ah); ctx.lineTo(x1 + ah, yTop + ah); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(x2, yTop); ctx.lineTo(x2 - ah, yTop - ah); ctx.lineTo(x2 - ah, yTop + ah); ctx.closePath(); ctx.fill();

  // amplitude arrow (baseline → crest) at x1
  const ax = x1;
  ctx.strokeStyle = C.cool; ctx.fillStyle = C.cool; ctx.lineWidth = 1.6;
  ctx.beginPath(); ctx.moveTo(ax, baseline); ctx.lineTo(ax, baseline - A); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ax, baseline - A); ctx.lineTo(ax - ah, baseline - A + ah); ctx.lineTo(ax + ah, baseline - A + ah); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(ax, baseline); ctx.lineTo(ax - ah, baseline - ah); ctx.lineTo(ax + ah, baseline - ah); ctx.closePath(); ctx.fill();

  return { x1, x2, yTop, ax, baseline, A };
}

export function WaveAnatomy() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 280;
  const canRef = useRef(null);
  const [lambda, setLambda] = useState(700); // nm, illustrative
  const cw = Math.min(w, 760);

  // frequency from c = λf, in THz. f = 3e17 / λ(nm) Hz = 3e5 / λ THz
  const freqTHz = Math.round(3e5 / lambda);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    const paint = (phase) => {
      const m = drawWave(ctx, cw, H, lambda, phase, 0);
      // text labels drawn on top
      ctx.font = `12px ${mono}`; ctx.textAlign = "center";
      ctx.fillStyle = C.sun;
      ctx.fillText(t.lambdaLabel, (m.x1 + m.x2) / 2, m.yTop - 8);
      ctx.textAlign = "left"; ctx.fillStyle = C.cool;
      ctx.fillText(t.ampLabel, m.ax + 8, m.baseline - m.A / 2);
    };
    if (reduceMotion) { paint(0); return; }
    let raf, ph = 0;
    const loop = () => { ph -= 0.06; paint(ph); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lambda, lang]);

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

        {/* live readouts */}
        <div style={{ display: "flex", gap: 22, flexWrap: "wrap", marginBottom: 10 }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, letterSpacing: 1 }}>{t.wl}</div>
            <div style={{ fontFamily: mono, fontSize: 26, color: C.violet }}>{lambda}<span style={{ fontSize: 14, color: C.muted }}> nm</span></div>
          </div>
          <div>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, letterSpacing: 1 }}>{t.freq}</div>
            <div style={{ fontFamily: mono, fontSize: 26, color: C.cool }}>{freqTHz}<span style={{ fontSize: 14, color: C.muted }}> THz</span></div>
          </div>
        </div>

        <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />

        <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginTop: 14 }}>{t.slide}</div>
        {/* slider is inverted so dragging right shortens λ (long → short) */}
        <input type="range" min={250} max={1200} step={10} value={1450 - lambda}
          onChange={(e) => setLambda(1450 - parseInt(e.target.value, 10))} style={styles.range} />
        <div style={styles.rangeEnds}><span>{t.longEnd}</span><span>{t.shortEnd}</span></div>

        <div style={{ ...styles.pathBox, marginTop: 16 }}>
          <p style={{ ...styles.pathText, margin: 0, color: C.sun }}>{t.cNote}</p>
        </div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.relNote}</p>
      </div>
    </div>
  );
}

export default WaveAnatomy;
