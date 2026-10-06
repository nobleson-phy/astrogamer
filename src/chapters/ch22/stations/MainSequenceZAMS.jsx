/* ============================================================
   STATION 1 — THE MAIN SEQUENCE (ZERO-AGE MAIN SEQUENCE)
   The ZERO-AGE MAIN SEQUENCE (ZAMS) is the line on the H-R diagram where
   contracting protostars of every mass first settle into stable core
   hydrogen fusion. Massive stars land hot and luminous at the upper-left;
   low-mass stars sit cool and faint at the lower-right. Fusion is ferociously
   temperature-sensitive: in the proton-proton chain the energy-generation
   rate scales roughly as T⁴, so a modest rise in core temperature multiplies
   the rate steeply. Grounded in Ch.22 §22.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The main sequence",
    kind: "Where stable fusion begins",
    lede: "Slide a star's mass and watch where it lands on the zero-age main sequence — and how fiercely its fusion rate climbs with core temperature.",
    thread: "THE STORY BEGINS",
    threadText: "Every star's adult life starts the moment it settles onto the main sequence and begins steadily fusing hydrogen in its core. Where it lands — and how hard it burns — is set almost entirely by its mass.",
    key: "THE ZERO-AGE MAIN SEQUENCE & THE T⁴ RULE",
    keyText: "The ZERO-AGE MAIN SEQUENCE (ZAMS) is the line on the H-R diagram where stars of different masses first begin stable core hydrogen fusion. Massive stars arrive hot and luminous at the upper-left; low-mass stars sit cool and faint at the lower-right. Fusion is intensely temperature-sensitive: in the proton-proton chain the energy-generation rate scales roughly as T⁴, so even a modest rise in core temperature multiplies the fusion rate steeply.",
    mass: "Stellar mass",
    rate: "Relative fusion rate (∝ T⁴)",
    coreT: "core temperature (relative)",
    hot: "hot / blue", cool: "cool / red",
    lum: "luminosity →",
    zams: "ZAMS",
    note: "A star joins the main sequence on the ZAMS at a spot fixed by its mass — hot and bright if massive, cool and dim if not. Fusion scales as about T⁴, so a little more heat means a lot more light.",
  },
  ja: {
    title: "主系列",
    kind: "安定した融合が始まる場所",
    lede: "星の質量を動かし、それが零年主系列のどこに落ち着くか——そして核の温度とともに融合率がいかに激しく上がるかを見よう。",
    thread: "物語のはじまり",
    threadText: "どの星の成年期も、主系列に落ち着き核で安定して水素を融合し始めた瞬間に始まります。どこに落ち着くか——そしてどれほど激しく燃えるか——は、ほぼ完全に質量で決まります。",
    key: "零年主系列とT⁴則",
    keyText: "零年主系列（ZAMS）は、異なる質量の星が安定した核の水素融合を初めて始める、H–R図上の線です。大質量星は高温で明るく左上に到達し、低質量星は低温で暗く右下に位置します。融合は温度に非常に敏感です：陽子-陽子連鎖では、エネルギー生成率はおよそT⁴に比例するので、核の温度がわずかに上がるだけで融合率は急激に増えます。",
    mass: "星の質量",
    rate: "相対融合率（∝ T⁴）",
    coreT: "核の温度（相対）",
    hot: "高温 / 青", cool: "低温 / 赤",
    lum: "光度 →",
    zams: "ZAMS",
    note: "星は、質量で決まる位置でZAMS上の主系列に加わります——大質量なら高温で明るく、そうでなければ低温で暗い。融合はおよそT⁴に比例するので、少し熱いだけでずっと明るくなります。",
  },
};

// map mass (0.1-30) -> fraction along ZAMS (0 = low-mass lower-right, 1 = high-mass upper-left)
function massFrac(M) {
  return clamp((Math.log10(M) - Math.log10(0.1)) / (Math.log10(30) - Math.log10(0.1)), 0, 1);
}

function drawHR(ctx, cw, H, M, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const x0 = 54, x1 = cw - 18, y0 = 22, y1 = H - 42;
  // axes
  ctx.strokeStyle = "rgba(150,175,230,0.35)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0, y1); ctx.lineTo(x1, y1); ctx.stroke();
  // temperature axis is reversed: hot on the left
  ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`;
  ctx.textAlign = "left"; ctx.fillText(t.hot, x0 + 2, y1 + 16);
  ctx.textAlign = "right"; ctx.fillText(t.cool, x1, y1 + 16);
  ctx.save(); ctx.translate(x0 - 40, (y0 + y1) / 2); ctx.rotate(-Math.PI / 2); ctx.textAlign = "center"; ctx.fillText(t.lum, 0, 0); ctx.restore();
  // px: f=1 (massive) -> left; f=0 (low) -> right ; py: f=1 -> top ; f=0 -> bottom
  const px = (f) => x1 - f * (x1 - x0);
  const py = (f) => y1 - f * (y1 - y0);
  // ZAMS line (upper-left to lower-right), colored gradient
  const grad = ctx.createLinearGradient(px(1), py(1), px(0), py(0));
  grad.addColorStop(0, "#9bb4ff"); grad.addColorStop(0.5, "#fff2c8"); grad.addColorStop(1, "#ff8a52");
  ctx.strokeStyle = grad; ctx.lineWidth = 9; ctx.lineCap = "round";
  ctx.beginPath(); ctx.moveTo(px(0.97), py(0.97)); ctx.lineTo(px(0.05), py(0.05)); ctx.stroke(); ctx.lineCap = "butt";
  ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.zams, (px(0.5) + 44), py(0.5) - 16);
  // the star's dot
  const f = massFrac(M);
  const dx = px(f), dy = py(f);
  const col = f > 0.66 ? "#9bb4ff" : f > 0.4 ? "#fff2c8" : "#ff8a52";
  const g = ctx.createRadialGradient(dx, dy, 1, dx, dy, 11);
  g.addColorStop(0, "#ffffff"); g.addColorStop(0.5, col); g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(dx, dy, 11, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(dx, dy, 8, 0, Math.PI * 2); ctx.stroke();
  // label
  ctx.fillStyle = C.text; ctx.font = `11px ${mono}`;
  ctx.textAlign = f > 0.5 ? "left" : "right";
  ctx.fillText(`${M} M☉`, dx + (f > 0.5 ? 14 : -14), dy + 4);
}

function drawRate(ctx, cw, H, M, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const x0 = 20, x1 = cw - 18, y0 = 20, yBase = H - 34;
  // relative core temperature grows with mass (normalized 0.5 .. 2 across range)
  const f = massFrac(M);
  const Trel = 0.6 + f * 1.4; // relative core temperature
  // draw a T^4 curve
  ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0, yBase); ctx.lineTo(x1, yBase); ctx.stroke();
  const Tmax = 2.1, maxRate = Math.pow(Tmax, 4);
  const sx = (T) => x0 + (T / Tmax) * (x1 - x0);
  const sy = (r) => yBase - (r / maxRate) * (yBase - y0);
  ctx.strokeStyle = "#3fddff"; ctx.lineWidth = 2; ctx.beginPath();
  for (let i = 0; i <= 100; i++) { const T = (i / 100) * Tmax; const r = Math.pow(T, 4); const x = sx(T), y = sy(r); if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
  ctx.stroke();
  // marker at this star's T
  const rate = Math.pow(Trel, 4);
  const mx = sx(Trel), my = sy(rate);
  ctx.strokeStyle = "rgba(255,210,61,0.5)"; ctx.setLineDash([3, 3]);
  ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx, yBase); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = C.sun; ctx.beginPath(); ctx.arc(mx, my, 5, 0, Math.PI * 2); ctx.fill();
  // labels
  ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.coreT, (x0 + x1) / 2, H - 14);
  ctx.fillStyle = C.cool; ctx.font = `12px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(`T = ${Trel.toFixed(2)}  →  ${t.rate.split("(")[0].trim()} = ${rate.toFixed(1)}×`, x0 + 4, y0 + 14);
}

export function MainSequenceZAMS() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const hrRef = useRef(null);
  const rateRef = useRef(null);
  const cw = Math.min(w, 760);
  const [M, setM] = useState(1);

  useEffect(() => {
    const c1 = hrRef.current, c2 = rateRef.current;
    if (!c1 || !c2) return;
    const ctx1 = setupCanvas(c1, cw, H);
    const ctx2 = setupCanvas(c2, cw, 150);
    drawHR(ctx1, cw, H, M, lang);
    drawRate(ctx2, cw, 150, M, lang);
  }, [cw, M, lang]);

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

        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "4px 0 10px" }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.mass}</span>
          <input type="range" min="0.1" max="30" step="0.1" value={M}
            onChange={(e) => setM(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
          <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, width: 62, textAlign: "right" }}>{M} M{"☉"}</span>
        </div>

        <canvas ref={hrRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        <div style={{ fontFamily: mono, fontSize: 11.5, color: C.cool, margin: "10px 0 4px" }}>{t.rate}</div>
        <canvas ref={rateRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default MainSequenceZAMS;
