/* ============================================================
   STATION 4 — IRON-CORE COLLAPSE & THE NEUTRINO FLOOD
   Iron is the most tightly bound nucleus, so fusing it ABSORBS energy — iron
   fusion is endothermic. The inert iron core loses pressure support and
   collapses in under a second. Electron capture (p + e⁻ → n + ν) floods the
   star with NEUTRINOS that carry away over 99% of the released energy; in
   1987, SN 1987A in the Large Magellanic Cloud gave the first detection of
   such neutrinos. For months afterward the debris glows, powered by the
   radioactive decay chain Ni-56 → Co-56 → Fe-56. Grounded in Ch.23.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Iron-core collapse",
    kind: "A collapse, a neutrino flood, a radioactive glow",
    lede: "Press play. The iron core collapses in under a second, a flood of neutrinos escapes, and the shattered debris glows for months on radioactive decay.",
    thread: "THE OTHER DEATH BEGINS",
    threadText: "A massive star cannot escape its own weight. Once its core is iron, there is no fire left to hold it up — and gravity takes everything in a single second.",
    key: "IRON CORE COLLAPSE, A NEUTRINO FLOOD, A RADIOACTIVE GLOW",
    keyText: "Iron is the most tightly bound nucleus, so fusing iron ABSORBS energy instead of releasing it — it is endothermic. With no fusion to support its weight, the inert IRON CORE collapses catastrophically in under a second. Electrons and protons merge into neutrons (p + e⁻ → n + ν), releasing a torrent of NEUTRINOS that carry away more than 99% of the energy. In 1987, SN 1987A in the Large Magellanic Cloud gave the first-ever detection of these neutrinos. For months the shattered debris glows, powered not by fusion but by the radioactive decay chain NICKEL-56 → COBALT-56 → stable IRON-56.",
    play: "play ▶", pause: "pause ■", replay: "replay ↻",
    pCollapse: "IRON CORE COLLAPSING", pBurst: "NEUTRINO FLOOD (>99% of energy)", pGlow: "DEBRIS GLOWS — radioactive decay",
    sn: "SN 1987A (1987): first neutrinos detected",
    lc: "light curve", time: "time →", lum: "brightness",
    decay: "Ni-56 → Co-56 → Fe-56",
    note: "Iron fusion is endothermic, so the iron core collapses in under a second. Neutrinos carry off over 99% of the energy (first detected from SN 1987A, 1987). The debris then glows for months on the decay chain Ni-56 → Co-56 → Fe-56.",
  },
  ja: {
    title: "鉄の核の崩壊",
    kind: "崩壊、ニュートリノの洪水、放射性の輝き",
    lede: "再生を押そう。鉄の核が1秒足らずで崩壊し、ニュートリノの洪水が逃げ出し、砕けた破片が放射性崩壊で何か月も輝きます。",
    thread: "もうひとつの死のはじまり",
    threadText: "大質量星は自らの重みから逃れられません。核が鉄になれば、それを支える火はもう残っていません——そして重力が、たった1秒ですべてを奪います。",
    key: "鉄の核の崩壊、ニュートリノの洪水、放射性の輝き",
    keyText: "鉄は最も強く結合した原子核なので、鉄の融合はエネルギーを放出せず吸収します——吸熱的です。重みを支える融合がなくなると、不活性な鉄の核は1秒足らずで破滅的に崩壊します。電子と陽子が中性子に合体し（p + e⁻ → n + ν）、エネルギーの99%以上を運び去るニュートリノの奔流を放ちます。1987年、大マゼラン雲のSN 1987Aが、このニュートリノを史上初めて検出させました。その後数か月、砕けた破片は融合ではなく、放射性崩壊の連鎖ニッケル56 → コバルト56 → 安定な鉄56に支えられて輝きます。",
    play: "再生 ▶", pause: "停止 ■", replay: "もう一度 ↻",
    pCollapse: "鉄の核が崩壊中", pBurst: "ニュートリノの洪水（エネルギーの99%超）", pGlow: "破片が輝く——放射性崩壊",
    sn: "SN 1987A（1987）：ニュートリノ初検出",
    lc: "光度曲線", time: "時間 →", lum: "明るさ",
    decay: "Ni-56 → Co-56 → Fe-56",
    note: "鉄の融合は吸熱的なので、鉄の核は1秒足らずで崩壊します。ニュートリノがエネルギーの99%超を運び去ります（SN 1987A、1987年で初検出）。その後、破片は崩壊連鎖Ni-56 → Co-56 → Fe-56に支えられ何か月も輝きます。",
  },
};

// Single source of truth for brightness vs. timeline p (0..1), shared by the
// glowing-debris graphic AND the light curve so the two always stay in sync.
// Dark only during the pre-explosion collapse (p<0.3); the moment the explosion /
// neutrino flood begins (p=0.3) the light rises, peaks as the debris lights up
// (~p=0.46), then fades for months on radioactive decay.
function brightness(p) {
  if (p < 0.3) return 0;                        // collapse: not yet luminous
  const g = (p - 0.3) / 0.7;                    // 0..1 from the explosion onward
  const rise = clamp(g / 0.22, 0, 1);           // climbs through the flood to peak
  const decay = Math.exp(-Math.max(g - 0.22, 0) * 3.0);
  return rise * decay;                          // peaks ~p=0.45, then slow decline
}

function draw(ctx, cw, H, p, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.5, cy = H * 0.34;
  const collapse = clamp(p / 0.3, 0, 1);
  const burst = p >= 0.3 && p < 0.46;
  const glow = p >= 0.46;

  // core shrinking during collapse
  const coreR = p < 0.3 ? 42 - collapse * 32 : 8;
  if (p < 0.46) {
    const g = ctx.createRadialGradient(cx, cy, 2, cx, cy, Math.max(coreR, 6));
    g.addColorStop(0, "#ffffff"); g.addColorStop(0.6, "#cfd6e0"); g.addColorStop(1, "#8b94a8");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, Math.max(coreR, 6), 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#e6ebf5"; ctx.font = `10px ${mono}`; ctx.textAlign = "center";
    if (coreR > 10) ctx.fillText("Fe", cx, cy + 3);
  }

  // neutrino burst: dashed rays outward
  if (burst) {
    const f = (p - 0.3) / 0.16;
    ctx.strokeStyle = `rgba(99,211,240,${0.9 * (1 - f)})`; ctx.lineWidth = 1.4;
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      const r0 = 10 + f * 40, r1 = 10 + f * 140;
      ctx.setLineDash([3, 6]);
      ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0);
      ctx.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); ctx.stroke();
    }
    ctx.setLineDash([]);
  }

  // glowing fading debris — alpha driven by the shared brightness(p)
  if (glow) {
    const f = (p - 0.46) / 0.54;    // 0..1, debris keeps expanding
    const b = brightness(p);        // 0..1, same curve the light plot uses
    const R = 50 + f * 34;
    const g = ctx.createRadialGradient(cx, cy, 4, cx, cy, R);
    const a = clamp(0.12 + b * 0.75, 0.1, 0.9);
    g.addColorStop(0, `rgba(255,220,120,${a})`); g.addColorStop(0.6, `rgba(255,150,90,${a * 0.6})`); g.addColorStop(1, "rgba(255,110,67,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
  }

  // phase label
  ctx.font = `12px ${mono}`; ctx.textAlign = "center";
  ctx.fillStyle = burst ? C.cool : glow ? C.sun : C.faint;
  const lab = p < 0.3 ? t.pCollapse : burst ? t.pBurst : t.pGlow;
  ctx.fillText(lab, cx, H * 0.30 + 76 > H - 90 ? H * 0.30 + 60 : H * 0.30 + 76);

  // light curve across the bottom
  const x0 = 54, x1 = cw - 16, y0 = H - 92, y1 = H - 22;
  ctx.strokeStyle = "rgba(150,175,230,0.35)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0, y1); ctx.lineTo(x1, y1); ctx.stroke();
  ctx.fillStyle = C.faint; ctx.font = `10px ${mono}`; ctx.textAlign = "right";
  ctx.fillText(t.time, x1, y1 + 14);
  ctx.save(); ctx.translate(x0 - 36, (y0 + y1) / 2); ctx.rotate(-Math.PI / 2);
  ctx.textAlign = "center"; ctx.fillText(t.lum, 0, 0); ctx.restore();
  // curve plots brightness() across the SAME timeline p the animation runs on:
  // dark during collapse/burst, a sharp rise when the debris lights up, slow decay.
  ctx.strokeStyle = C.sun; ctx.lineWidth = 2; ctx.beginPath();
  const N = 120;
  for (let i = 0; i <= N; i++) {
    const s = i / N;                 // s == timeline p
    const L = brightness(s);
    const x = x0 + s * (x1 - x0), y = y1 - L * (y1 - y0);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  // faint "explosion" guide line at the moment the flood/explosion begins (p=0.3)
  const ex = x0 + 0.3 * (x1 - x0);
  ctx.strokeStyle = "rgba(255,207,107,0.25)"; ctx.setLineDash([2, 4]);
  ctx.beginPath(); ctx.moveTo(ex, y0); ctx.lineTo(ex, y1); ctx.stroke(); ctx.setLineDash([]);
  // moving marker tracking p — sits exactly on the curve (same brightness())
  const ms = clamp(p, 0, 1);
  const mx = x0 + ms * (x1 - x0), my = y1 - brightness(ms) * (y1 - y0);
  ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(mx, my, 3.5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.sun; ctx.font = `10px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(t.decay, x0 + 8, y0 + 12);
}

export function IronCoreCollapse() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 300;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [playing, setPlaying] = useState(true);
  const pRef = useRef(0);
  const playRef = useRef(true); playRef.current = playing;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { pRef.current = 0.6; draw(ctx, cw, H, 0.6, lang); return; }
    let raf;
    const loop = () => {
      if (playRef.current) {
        pRef.current += 0.0045;
        if (pRef.current > 1) pRef.current = 1;
      }
      draw(ctx, cw, H, pRef.current, lang);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 04</div>
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
          <button onClick={() => setPlaying((v) => !v)} style={{ ...styles.chip, ...(playing ? styles.chipOn : {}) }}>
            {playing ? t.pause : t.play}
          </button>
          <button onClick={() => { pRef.current = 0; setPlaying(true); }} style={styles.chip}>{t.replay}</button>
        </div>

        <div style={{ marginTop: 10 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <div style={{ fontFamily: mono, fontSize: 11.5, color: C.cool, marginTop: 8 }}>{t.sn}</div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default IronCoreCollapse;
