/* ============================================================
   STATION 3 — THE SPIRAL ARMS
   A face-on map of the Milky Way's spiral arms (Sagittarius, Perseus,
   Scutum-Centaurus, Norma) with the SUN marked in the ORION SPUR between the
   Sagittarius and Perseus arms, ~26,000 ly from center. A button to
   highlight/zoom the Sun's location. THE SUN SITS IN THE ORION SPUR.
   Grounded in Ch.25.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, lerp, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The spiral arms",
    kind: "Where the Sun rides in the disk",
    lede: "A face-on map of the Milky Way's great spiral arms. Our Sun is not on a major arm at all — it sits in a minor spur, the Orion Spur, wedged between the Sagittarius and Perseus arms, about 26,000 light-years out. Highlight our address.",
    thread: "OUR ADDRESS IN THE DISK",
    threadText: "We know we are far from the center. But exactly where in the disk? Among the grand spiral arms, our Sun occupies a modest bridge of stars most people have never heard of.",
    key: "THE SUN SITS IN THE ORION SPUR",
    keyText: "The Milky Way's disk is wound into several major SPIRAL ARMS, where gas is compressed and new, bright stars light up: the SAGITTARIUS arm, the PERSEUS arm, the SCUTUM-CENTAURUS arm and the NORMA arm, spiraling out from the central bar. The Sun does not live on any of these grand arms. Instead it lies in a smaller partial arm — the ORION SPUR (also called the Orion-Cygnus Arm) — a bridge of stars wedged between the Sagittarius arm (inward) and the Perseus arm (outward), about 26,000 light-years from the Galactic center. From this unremarkable spot, two-thirds of the way out, we look along our own spiral arm and see the glowing band of the Milky Way across our sky.",
    highlight: "Highlight the Sun",
    overview: "Full map",
    sunLabel: "Sun — Orion Spur",
    orion: "Orion Spur",
    sgr: "Sagittarius Arm",
    per: "Perseus Arm",
    sct: "Scutum-Centaurus Arm",
    norma: "Norma Arm",
    center: "Galactic center",
    dist: "~26,000 ly from center",
    note: "The Sun rides a minor spur — the Orion Spur — between the Sagittarius and Perseus arms, about 26,000 ly from the center: a modest spot two-thirds of the way out in the disk.",
  },
  ja: {
    title: "渦巻腕",
    kind: "太陽が円盤のどこにいるか",
    lede: "天の川の大きな渦巻腕を正面から見た地図です。私たちの太陽は主要な腕の上にはまったくおらず——いて座腕とペルセウス腕の間にはさまれた小さなスパー、オリオン腕に、中心から約2万6千光年外側に座っています。私たちの住所を強調してみよう。",
    thread: "円盤の中の私たちの住所",
    threadText: "私たちが中心から遠いことは分かっています。でも円盤の正確にどこに？壮大な渦巻腕の中で、私たちの太陽は、ほとんどの人が聞いたこともない星のささやかな橋を占めています。",
    key: "太陽はオリオン腕に座っている",
    keyText: "天の川の円盤はいくつかの主要な渦巻腕に巻かれていて、そこではガスが圧縮され、新しく明るい星が灯ります：いて座腕、ペルセウス腕、たて座・ケンタウルス腕、そしてりゅうこつ座（ノルマ）腕が、中心の棒から渦を巻いて外へ伸びています。太陽はこれらの壮大な腕のどれにも暮らしていません。代わりに、より小さな部分的な腕——オリオン腕（オリオン・はくちょう腕とも呼ばれる）——の中にあり、これはいて座腕（内側）とペルセウス腕（外側）の間にはさまれた星の橋で、銀河中心から約2万6千光年のところにあります。外側へ3分の2進んだこの目立たない場所から、私たちは自分の渦巻腕に沿って見通し、空を横切る天の川の輝く帯を見るのです。",
    highlight: "太陽を強調",
    overview: "全体地図",
    sunLabel: "太陽——オリオン腕",
    orion: "オリオン腕",
    sgr: "いて座腕",
    per: "ペルセウス腕",
    sct: "たて座・ケンタウルス腕",
    norma: "りゅうこつ座腕",
    center: "銀河中心",
    dist: "中心から約2万6千光年",
    note: "太陽は、いて座腕とペルセウス腕の間の小さなスパー——オリオン腕——に、中心から約2万6千光年の位置で乗っています：円盤を外へ3分の2進んだささやかな場所です。",
  },
};

// four major arms as log-spiral parameters: start angle, base radius
const ARMS = [
  { key: "sgr", a0: 0.3, col: "rgba(120,170,255,0.75)" },
  { key: "per", a0: Math.PI, col: "rgba(150,190,255,0.6)" },
  { key: "sct", a0: 1.9, col: "rgba(130,180,255,0.68)" },
  { key: "norma", a0: Math.PI + 1.9, col: "rgba(140,185,255,0.55)" },
];

function draw(ctx, cw, H, hi, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.5, cy = H * 0.5;
  const R = Math.min(cw * 0.42, H * 0.42);

  // faint disk glow
  const dg = ctx.createRadialGradient(cx, cy, 6, cx, cy, R);
  dg.addColorStop(0, "rgba(255,230,160,0.12)"); dg.addColorStop(1, "rgba(120,160,255,0)");
  ctx.fillStyle = dg; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();

  const dim = hi ? 0.28 : 1;
  // the major spiral arms
  ARMS.forEach((arm) => {
    ctx.globalAlpha = dim;
    ctx.strokeStyle = arm.col;
    ctx.lineWidth = 8;
    ctx.beginPath();
    let first = true;
    for (let th = 0; th < Math.PI * 1.9; th += 0.04) {
      const r = 18 + (R - 18) * (th / (Math.PI * 1.9));
      const ang = arm.a0 + th;
      const x = cx + Math.cos(ang) * r, y = cy + Math.sin(ang) * r;
      if (first) { ctx.moveTo(x, y); first = false; } else ctx.lineTo(x, y);
    }
    ctx.stroke();
  });
  ctx.globalAlpha = 1;

  // central bar + bulge
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(-0.5);
  const bg = ctx.createLinearGradient(-30, 0, 30, 0);
  bg.addColorStop(0, "rgba(255,180,80,0)"); bg.addColorStop(0.5, "#ffd23f"); bg.addColorStop(1, "rgba(255,180,80,0)");
  ctx.fillStyle = bg; ctx.beginPath(); ctx.ellipse(0, 0, 30, 11, 0, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
  ctx.fillStyle = `rgba(255,210,61,${(0.9 * dim).toFixed(2)})`; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.center, cx, cy + 26);

  // the ORION SPUR — a short partial arm sitting in the GAP between the major arms.
  // The Sun rides ON this spur, clearly OFF the grand arms.
  const spurA0 = 1.10;                            // chosen so the spur stays in an inter-arm gap
  const spurPt = (f) => {
    const th = Math.PI * 1.9 * f;
    const r = 18 + (R - 18) * f;
    const ang = spurA0 + th;
    return [cx + Math.cos(ang) * r, cy + Math.sin(ang) * r];
  };
  // draw the spur itself (short; distinct colour; brightened when highlighting)
  ctx.strokeStyle = hi ? C.good : "rgba(150,235,190,0.6)";
  ctx.lineWidth = hi ? 5 : 3.2;
  ctx.beginPath();
  let sfirst = true;
  for (let f = 0.52; f <= 0.74; f += 0.01) {
    const [x, y] = spurPt(f);
    if (sfirst) { ctx.moveTo(x, y); sfirst = false; } else ctx.lineTo(x, y);
  }
  ctx.stroke();

  const [sx, sy] = spurPt(0.63);                  // the Sun, on the spur
  if (hi) {
    const ring = 26 + 4 * Math.sin(tt * 0.1);
    ctx.strokeStyle = C.sun; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.arc(sx, sy, ring, 0, Math.PI * 2); ctx.stroke();
  }
  // Orion Spur label, placed at the spur's outer end (both modes)
  { const [lx, ly] = spurPt(0.74);
    ctx.fillStyle = hi ? C.good : "rgba(150,235,190,0.95)"; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(t.orion, clamp(lx, 60, cw - 60), ly - 10 < 14 ? ly + 16 : ly - 10); }

  // the Sun marker ON the spur
  const sg = ctx.createRadialGradient(sx, sy, 1, sx, sy, 7);
  sg.addColorStop(0, "#fff3b0"); sg.addColorStop(1, C.sun);
  ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(sx, sy, 5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.sun; ctx.font = `11px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(t.sunLabel, clamp(sx + 9, 10, cw - 110), sy + 4);

  // arm labels around the edge (overview only, so they never clutter the zoom)
  if (!hi) {
    const labelAt = (arm, frac, text, col) => {
      const th = Math.PI * 1.9 * frac;
      const r = 18 + (R - 18) * frac;
      const ang = arm.a0 + th;
      let x = cx + Math.cos(ang) * r, y = cy + Math.sin(ang) * r;
      x = Math.max(70, Math.min(cw - 70, x)); y = Math.max(16, Math.min(H - 10, y));
      ctx.fillStyle = col; ctx.font = `10.5px ${mono}`; ctx.textAlign = "center";
      ctx.fillText(text, x, y);
    };
    labelAt(ARMS[0], 0.92, t.sgr, "#aecdff");
    labelAt(ARMS[1], 0.92, t.per, "#aecdff");
    labelAt(ARMS[2], 0.88, t.sct, "#9ec3ff");
    labelAt(ARMS[3], 0.88, t.norma, "#9ec3ff");
  }

  // distance note bottom
  ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.dist, cw / 2, H - 10);
}

export function SpiralArms() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 320;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [hi, setHi] = useState(false);
  const hiRef = useRef(false); hiRef.current = hi;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, hi, 0, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, hiRef.current, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, hi, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 03</div>
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

        <div style={styles.pickerRow}>
          <button onClick={() => setHi(false)} style={{ ...styles.chip, ...(!hi ? styles.chipOn : {}) }}>{t.overview}</button>
          <button onClick={() => setHi(true)} style={{ ...styles.chip, ...(hi ? styles.chipOn : {}) }}>{t.highlight}</button>
        </div>

        <div style={{ marginTop: 10 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default SpiralArms;
