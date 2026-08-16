/* ============================================================
   STATION 2 — THE LIGHT BUCKET
   A telescope is a "light bucket." Its light-collecting area grows
   as the SQUARE of the aperture diameter (area = π(D/2)²), so
   doubling D quadruples the light, and going from 1 m to 4 m
   gathers 16× the light. Parallel rays from a distant source are
   bent (or reflected) to meet at the FOCUS; the distance from the
   optic to that focus is the focal length.
   Grounded in Ch.6 §6.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The light bucket",
    kind: "Aperture, area & the focus",
    lede: "The single most important number for a telescope is the width of its opening. Drag the aperture wider and watch the collecting disc — and the flood of light it catches — grow by the square of the diameter.",
    thread: "THE STORY CONTINUES",
    threadText: "We saw that a telescope's first job is to collect light. Now we ask how much — and the answer is startling. A modest step up in size is an enormous leap in light-gathering power, which is why observatories keep building bigger mirrors.",
    key: "AREA GROWS AS THE SQUARE OF DIAMETER",
    keyText: "A telescope is a light bucket, and the size of the bucket is its collecting area = π(D/2)². Because area depends on the square of the diameter, doubling D catches four times the light, and going from a 1-metre to a 4-metre telescope gathers 4² = 16 times as much. Parallel rays from a distant source are bent to a single point — the focus — and the distance from the optic to that point is the focal length.",
    apLabel: "Aperture diameter",
    apSet: "Drag the aperture (0.5 m → 8 m):",
    small: "small", big: "big",
    areaL: "Collecting area  π(D/2)²",
    gatherL: "Light gathered vs a 1 m scope",
    focusMark: "focus",
    flMark: "focal length",
    rel1: "= D² × a 1-metre telescope",
    note: "The blue disc is the aperture, drawn to scale. Parallel starlight (the horizontal rays) is bent to meet at the focus; everything the disc catches is funnelled to that one point. Widen the aperture and more rays pour in — that extra light is what a bigger telescope buys you.",
  },
  ja: {
    title: "光のバケツ",
    kind: "口径・面積・焦点",
    lede: "望遠鏡にとって最も大切な一つの数字は、その開口の広さです。口径を広げて、集光する円盤——そしてそれが捉える光の洪水——が直径の2乗で大きくなる様子を見よう。",
    thread: "物語はつづく",
    threadText: "望遠鏡の第一の仕事は光を集めることだと見ました。では、どれくらい集まるのか——その答えは驚くべきものです。わずかな大きさの増加が、集光力の巨大な飛躍になります。だから観測所はより大きな鏡を作り続けるのです。",
    key: "面積は直径の2乗で増える",
    keyText: "望遠鏡は光のバケツであり、バケツの大きさはその集光面積 = π(D/2)² です。面積は直径の2乗に依存するため、Dを2倍にすると4倍の光を捉え、1mから4mの望遠鏡にすると 4の2乗＝16倍もの光を集めます。遠くの天体からの平行な光線は一点——焦点——に曲げられ、その点までの距離が焦点距離です。",
    apLabel: "口径（開口の直径）",
    apSet: "口径を動かそう（0.5 m → 8 m）：",
    small: "小さい", big: "大きい",
    areaL: "集光面積  π(D/2)²",
    gatherL: "1m望遠鏡と比べた集光量",
    focusMark: "焦点",
    flMark: "焦点距離",
    rel1: "= D² × 1メートル望遠鏡",
    note: "青い円盤が口径で、縮尺どおりに描いています。平行な星の光（水平な光線）は焦点で交わるように曲げられ、円盤が捉えたすべてがその一点に集められます。口径を広げるほど多くの光線が入ってきます——その余分な光こそ、大きな望遠鏡が手に入れるものです。",
  },
};

function drawBucket(ctx, cw, H, D, lang) {
  ctx.clearRect(0, 0, cw, H);
  const t = STR[lang];
  const midY = H / 2;

  // aperture x position (the optic plane)
  const apX = cw * 0.34;
  // scale aperture radius: 0.5 m .. 8 m -> pixels
  const maxR = Math.min(H * 0.42, 110);
  const R = (D / 8) * maxR + 6;

  // focal length: draw focus to the right; make it look like a light cone
  const focusX = cw - 40;

  // incoming parallel rays from the left (a distant source) — the wider the
  // aperture, the more rays it intercepts, so bigger buckets visibly catch more light
  const nRays = Math.max(3, Math.round(2 + D * 1.9));
  ctx.lineWidth = 1.4;
  for (let i = 0; i < nRays; i++) {
    const fr = nRays === 1 ? 0.5 : i / (nRays - 1);
    const ry = midY - R + fr * (2 * R);
    // parallel segment then converge to focus
    const grad = ctx.createLinearGradient(0, 0, focusX, 0);
    grad.addColorStop(0, "rgba(63,221,255,0.15)");
    grad.addColorStop(1, "rgba(63,221,255,0.7)");
    ctx.strokeStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, ry);
    ctx.lineTo(apX, ry);
    ctx.lineTo(focusX, midY);
    ctx.stroke();
  }

  // aperture disc (edge-on: an ellipse) at the optic plane
  const ell = R * 0.28;
  ctx.fillStyle = "rgba(63,221,255,0.16)";
  ctx.strokeStyle = C.cool; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.ellipse(apX, midY, ell, R, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  // diameter marker
  ctx.strokeStyle = "rgba(63,221,255,0.55)"; ctx.setLineDash([3, 3]); ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(apX - ell - 6, midY - R); ctx.lineTo(apX - ell - 6, midY + R); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = C.cool; ctx.font = `12px ${mono}`; ctx.textAlign = "right";
  ctx.fillText("D", apX - ell - 10, midY + 4);

  // focus point + glow
  const g = ctx.createRadialGradient(focusX, midY, 1, focusX, midY, 12);
  g.addColorStop(0, "#fff"); g.addColorStop(1, "rgba(255,210,61,0)");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(focusX, midY, 12, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.sun; ctx.beginPath(); ctx.arc(focusX, midY, 4, 0, Math.PI * 2); ctx.fill();
  ctx.font = `12px ${mono}`; ctx.textAlign = "center"; ctx.fillStyle = C.sun;
  ctx.fillText(t.focusMark, focusX, midY - 16);

  // focal length bracket between optic and focus
  const flY = H - 20;
  ctx.strokeStyle = "rgba(150,175,230,0.5)"; ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(apX, flY - 5); ctx.lineTo(apX, flY + 5);
  ctx.moveTo(apX, flY); ctx.lineTo(focusX, flY);
  ctx.moveTo(focusX, flY - 5); ctx.lineTo(focusX, flY + 5);
  ctx.stroke();
  ctx.fillStyle = C.faint; ctx.textAlign = "center";
  ctx.fillText(t.flMark, (apX + focusX) / 2, flY - 6);
}

export function LightBucket() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 280;
  const canRef = useRef(null);
  const [D, setD] = useState(1);
  const cw = Math.min(w, 760);

  const area = Math.PI * (D / 2) * (D / 2);       // m²
  const gather = D * D;                             // relative to a 1 m scope
  const gatherStr = gather >= 10 ? gather.toFixed(0) : gather.toFixed(2);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    drawBucket(ctx, cw, H, D, lang);
  }, [cw, D, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 02</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 12 }}>
          <span style={{ fontFamily: mono, fontSize: 30, color: C.sun }}>{D.toFixed(1)}</span>
          <span style={{ color: C.muted, fontSize: 15 }}>m · {t.apLabel}</span>
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

        <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginBottom: 2 }}>{t.apSet}</div>
        <input type="range" min={0.5} max={8} step={0.1} value={D}
          onChange={(e) => setD(parseFloat(e.target.value))} style={styles.range} />
        <div style={styles.rangeEnds}><span>{t.small} · 0.5 m</span><span>{t.big} · 8 m</span></div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        {/* readouts */}
        <div style={{ display: "flex", gap: 22, flexWrap: "wrap", marginTop: 14, alignItems: "flex-end" }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, letterSpacing: 1 }}>{t.areaL}</div>
            <div style={{ fontFamily: mono, fontSize: 22, color: C.cool }}>{area.toFixed(2)}<span style={{ fontSize: 13, color: C.muted }}> m²</span></div>
          </div>
          <div>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, letterSpacing: 1 }}>{t.gatherL}</div>
            <div style={{ fontFamily: mono, fontSize: 26, color: C.sun }}>{gatherStr}×</div>
            <div style={{ fontFamily: mono, fontSize: 11.5, color: C.faint, marginTop: 2 }}>{t.rel1}</div>
          </div>
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default LightBucket;
