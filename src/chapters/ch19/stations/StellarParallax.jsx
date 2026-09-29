/* ============================================================
   STATION 2 — STELLAR PARALLAX
   As Earth orbits the Sun, a nearby star appears to shift back and forth
   against distant background stars. PARALLAX is half that total angular
   shift. A star whose parallax is 1 arcsecond is 1 PARSEC away (≈ 3.26
   light-years). Distance and parallax are simple reciprocals:
   d (parsecs) = 1 / P (arcseconds). Closer stars show bigger shifts.
   Grounded in Ch.19 §19.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Stellar parallax",
    kind: "Geometry across Earth's orbit",
    lede: "Watch Earth swing around the Sun and the nearby star wobble against the background. Move the star nearer and the wobble grows — that's parallax.",
    thread: "THE STORY CONTINUES",
    threadText: "Hold a finger up and blink between eyes: it jumps against the far wall. Earth's orbit gives astronomers a pair of 'eyes' 2 AU apart to do the same trick on stars.",
    key: "d (parsecs) = 1 / P (arcseconds)",
    keyText: "As Earth moves from one side of its orbit to the other, a nearby star appears to shift against the far background. PARALLAX (P) is defined as half of that total apparent angular shift. A star with a parallax of exactly one arcsecond lies at a distance of one PARSEC — about 3.26 light-years or 206,265 AU. The relationship is beautifully simple: distance in parsecs equals one divided by the parallax in arcseconds, d = 1/P. Nearer stars have larger parallaxes; more distant stars have vanishingly small ones.",
    dist: "Star distance", parallaxL: "Parallax P", distL: "Distance",
    jan: "January", jul: "July", star: "nearby star", bg: "distant background",
    note: "Parallax is half a nearby star's apparent shift over Earth's orbit. A 1-arcsecond parallax = 1 parsec (≈ 3.26 ly), and d (pc) = 1 / P (″).",
  },
  ja: {
    title: "恒星視差",
    kind: "地球の軌道をまたぐ幾何学",
    lede: "地球が太陽をまわり、近い星が背景に対して揺れる様子を見よう。星を近づけると揺れが大きくなる——それが視差です。",
    thread: "物語はつづく",
    threadText: "指を立てて左右の目で交互に見ると、遠い壁に対して跳ねます。地球の軌道は、2 AU離れた一対の「目」を天文学者に与え、星で同じ手品をします。",
    key: "d（パーセク）= 1 / P（秒角）",
    keyText: "地球が軌道の片側から反対側へ動くと、近い星は遠い背景に対してずれて見えます。視差（P）は、その見かけの角度の全変化の半分と定義されます。視差がちょうど1秒角の星は、1パーセクの距離——約3.26光年、206,265 AU——にあります。関係は見事に単純です：パーセクでの距離は、秒角での視差の逆数、d = 1/P です。近い星は視差が大きく、遠い星は消え入るほど小さくなります。",
    dist: "星の距離", parallaxL: "視差 P", distL: "距離",
    jan: "1月", jul: "7月", star: "近い星", bg: "遠い背景",
    note: "視差は、地球の軌道にわたる近い星の見かけのずれの半分です。1秒角の視差 = 1パーセク（≈ 3.26光年）、d（pc）= 1 / P（″）。",
  },
};

function draw(ctx, cw, H, dPc, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // left: top-down orbit; Sun center, Earth orbiting; star to the right
  const sunX = cw * 0.22, sunY = H * 0.42, orbR = 26;
  ctx.fillStyle = "#ffd86b"; ctx.beginPath(); ctx.arc(sunX, sunY, 8, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "rgba(150,175,230,0.25)"; ctx.beginPath(); ctx.arc(sunX, sunY, orbR, 0, Math.PI * 2); ctx.stroke();
  const a = tt * 0.02;
  const eX = sunX + Math.cos(a) * orbR, eY = sunY + Math.sin(a) * orbR * 0.5;
  ctx.fillStyle = "#5b8fd8"; ctx.beginPath(); ctx.arc(eX, eY, 5, 0, Math.PI * 2); ctx.fill();
  // the nearby star (position on the far-right axis depends on distance for label only)
  const starX = cw * 0.7, starY = sunY;
  ctx.fillStyle = "#ffe08a"; ctx.beginPath(); ctx.arc(starX, starY, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.star, starX, starY - 12);
  // sightlines from Earth to star
  ctx.strokeStyle = "rgba(255,207,107,0.4)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(eX, eY); ctx.lineTo(starX, starY); ctx.stroke();
  // background strip (far right) where the star appears to shift
  const bx = cw * 0.8, bTop = 20, bBot = H - 40;
  ctx.strokeStyle = "rgba(120,140,190,0.3)"; ctx.beginPath(); ctx.moveTo(bx, bTop); ctx.lineTo(bx, bBot); ctx.stroke();
  for (let i = 0; i < 6; i++) { ctx.fillStyle = "rgba(200,210,235,0.4)"; ctx.beginPath(); ctx.arc(bx + 10, bTop + 10 + i * (bBot - bTop) / 6, 1.5, 0, Math.PI * 2); ctx.fill(); }
  // apparent position of the star on background: shift amplitude ~ 1/d
  const amp = (bBot - bTop) * 0.32 / dPc; // bigger for nearer
  const appY = sunY - Math.cos(a) * Math.min(amp, (bBot - bTop) * 0.4);
  ctx.fillStyle = "#ffe08a"; ctx.beginPath(); ctx.arc(bx + 10, appY, 4, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "rgba(255,207,107,0.3)"; ctx.setLineDash([2, 2]); ctx.beginPath(); ctx.moveTo(eX, eY); ctx.lineTo(bx + 10, appY); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = C.faint; ctx.textAlign = "center"; ctx.fillText(t.bg, bx + 10, bTop - 6);
  // readouts
  const P = 1 / dPc;
  ctx.fillStyle = C.text; ctx.font = `12px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(`${t.parallaxL} = ${P.toFixed(3)}″`, 12, H - 26);
  ctx.fillStyle = C.sun; ctx.fillText(`${t.distL} = 1/P = ${dPc} pc = ${(dPc * 3.26).toFixed(1)} ly`, 12, H - 10);
}

export function StellarParallax() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [dPc, setDPc] = useState(2);
  const dRef = useRef(2); dRef.current = dPc;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, dRef.current, 40, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, dRef.current, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

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
          <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.dist}</span>
          <input type="range" min="1" max="20" step="1" value={dPc}
            onChange={(e) => setDPc(parseInt(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
          <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, width: 46, textAlign: "right" }}>{dPc} pc</span>
        </div>

        <div style={{ marginTop: 4 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default StellarParallax;
