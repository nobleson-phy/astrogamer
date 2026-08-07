/* ============================================================
   STATION 8 — THE SUN AT THE HORIZON
   Earth's atmosphere refracts (bends) sunlight, lifting the Sun's
   apparent position near the horizon — so the Sun appears to rise a
   little earlier and set a little later than geometry alone would
   give, and it looks squashed / flattened at the horizon. A slider
   from the horizon to higher altitude shows the refraction shrinking.
   Grounded in Ch.4 §4.2 (atmospheric refraction).
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono, display } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The Sun at the horizon",
    kind: "Atmospheric refraction lifts the Sun",
    lede: "Air bends light. Near the horizon that bending lifts the Sun's image above where it truly is — so we see it rise a little early and set a little late, squashed into an oval. Raise the Sun higher and the effect fades away.",
    thread: "THE STORY ENDS HERE",
    threadText: "We began by giving the sky an address and end by admitting the sky can deceive us. The very air we breathe bends the light, nudging the Sun from its true place — a last reminder that what we see is always filtered through our world.",
    key: "EARLIER SUNRISE, LATER SUNSET",
    keyText: "Light bends as it passes through the atmosphere, and the effect is strongest near the horizon. It lifts the Sun's apparent position by roughly its own diameter at the horizon, so the Sun seems to rise a little earlier and set a little later than pure geometry predicts — and looks flattened, because its lower edge is lifted more than its upper edge.",
    altLabel: "Sun's true altitude", altSet: "Raise the Sun (horizon → higher):",
    trueSun: "true position", appSun: "apparent position", horizon: "horizon", ray: "bent light ray",
    liftReadout: "Apparent lift",
    flatNote: "At the horizon the lower limb is lifted more than the upper limb, squashing the disk into an oval. Climb a few degrees and the refraction — and the flattening — shrink quickly toward zero.",
  },
  ja: {
    title: "地平線の太陽",
    kind: "大気の屈折が太陽を持ち上げる",
    lede: "空気は光を曲げます。地平線近くでは、その曲がりが太陽の像を実際の位置より上へ持ち上げます——だから太陽は少し早く昇り、少し遅く沈み、楕円につぶれて見えます。太陽を高く上げると、その効果は消えていきます。",
    thread: "物語はここで終わる",
    threadText: "私たちは空に「住所」を与えることから始め、空が私たちを欺きうると認めて終わります。私たちが吸うまさにその空気が光を曲げ、太陽を本当の位置からずらすのです——見えるものは常に、私たちの世界を通して濾されているという最後の戒めです。",
    key: "日の出は早く、日の入りは遅く",
    keyText: "光は大気を通るとき曲がり、その効果は地平線近くで最も強くなります。地平線では太陽の見かけの位置をおよそ視直径ぶん持ち上げるので、太陽は純粋な幾何が予測するより少し早く昇り、少し遅く沈むように見えます——そして、下の縁が上の縁より大きく持ち上げられるため、平たくつぶれて見えます。",
    altLabel: "太陽の真の高度", altSet: "太陽を上げよう（地平線 → 高く）：",
    trueSun: "真の位置", appSun: "見かけの位置", horizon: "地平線", ray: "曲がった光線",
    liftReadout: "見かけの持ち上がり",
    flatNote: "地平線では下の縁が上の縁より大きく持ち上げられ、円盤が楕円につぶれます。数度上がると、屈折——そして扁平——は急速にゼロへ近づきます。",
  },
};

/* refraction lift (in "degrees", exaggerated) as a function of true altitude */
function liftAt(altDeg) {
  // strongest at 0°, falls off quickly with altitude
  return 0.6 / (Math.tan(((altDeg + 4.5) * Math.PI) / 180)) * 0.5;
}

function draw(ctx, cw, H, alt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // sky gradient
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, "#0b1836"); sky.addColorStop(0.6, "#2a3b63"); sky.addColorStop(1, "#c98b5a");
  ctx.fillStyle = sky; ctx.fillRect(0, 0, cw, H);

  const horizonY = H * 0.72;
  const cx = cw * 0.5;
  const pxPerDeg = (horizonY - 30) / 24; // map ~24° of altitude to the sky height

  // ground
  ctx.fillStyle = "#0a1020"; ctx.fillRect(0, horizonY, cw, H - horizonY);
  ctx.strokeStyle = "rgba(255,207,107,0.5)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(0, horizonY); ctx.lineTo(cw, horizonY); ctx.stroke();
  ctx.fillStyle = C.sun; ctx.font = `12px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(t.horizon, 8, horizonY - 6);

  const R = 22;
  const trueY = horizonY - alt * pxPerDeg;
  const lift = liftAt(alt);
  const appY = trueY - lift * pxPerDeg;

  // true Sun (outline, dim)
  ctx.strokeStyle = "rgba(255,207,107,0.55)"; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]);
  ctx.beginPath(); ctx.arc(cx, trueY, R, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = "rgba(255,207,107,0.7)"; ctx.textAlign = "center";
  ctx.font = `11px ${mono}`; ctx.fillText(t.trueSun, cx, trueY + R + 14);

  // bent light ray from true position, curving to apparent
  ctx.strokeStyle = "rgba(99,211,240,0.7)"; ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cw - 10, trueY - 4);
  ctx.quadraticCurveTo(cx + 60, appY - 30, cx, appY);
  ctx.stroke();
  ctx.fillStyle = C.cool; ctx.fillText(t.ray, cw - 60, trueY - 12);

  // apparent Sun — flattened near horizon (oval), rounder up high
  const flat = clamp(1 - lift * 0.9, 0.55, 1); // vertical squash factor
  const g = ctx.createRadialGradient(cx, appY, 3, cx, appY, R);
  g.addColorStop(0, "#fff"); g.addColorStop(0.5, "#ffd23d"); g.addColorStop(1, "#ff9e2c");
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.ellipse(cx, appY, R, R * flat, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#fff"; ctx.font = `11px ${mono}`;
  ctx.fillText(t.appSun, cx, appY - R - 8);
}

export function Horizon() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 320;
  const canvasRef = useRef(null);
  const [alt, setAlt] = useState(0);
  const cw = Math.min(w, 760);
  const lift = liftAt(alt);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, alt, lang);
  }, [cw, alt, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 08</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 12 }}>
          <span style={{ fontFamily: mono, fontSize: 31, color: C.sun }}>{alt.toFixed(1)}°</span>
          <span style={{ color: C.muted, fontSize: 15 }}>{t.altLabel}</span>
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
        <canvas ref={canvasRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />

        <div style={styles.readout}>
          <span>{t.liftReadout}: {(lift).toFixed(2)}°</span>
        </div>

        <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginTop: 14 }}>{t.altSet}</div>
        <input type="range" min={0} max={12} step={0.5} value={alt} onChange={(e) => setAlt(parseFloat(e.target.value))} style={styles.range} />
        <div style={styles.rangeEnds}><span>0° {t.horizon}</span><span>12°</span></div>

        <div style={{ ...styles.fateBox, marginTop: 16 }}>
          <div style={styles.fateLabel}>{t.flatNote ? (lang === "ja" ? "扁平と屈折" : "Flattening & fade") : ""}</div>
          <p style={styles.keyTermText}>{t.flatNote}</p>
        </div>
      </div>
    </div>
  );
}

export default Horizon;
