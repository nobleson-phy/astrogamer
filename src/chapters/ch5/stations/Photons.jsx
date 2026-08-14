/* ============================================================
   STATION 3 — PHOTONS & ENERGY
   Light is not only a wave — it also arrives as a stream of photons,
   discrete packets of electromagnetic energy. A photon's energy is
   set by its frequency: E = h·f (equivalently E = hc/λ). So higher
   frequency — shorter wavelength — means MORE energy per photon.
   Ordered low → high energy: radio < infrared < red < violet <
   ultraviolet < X-ray < gamma. An X-ray photon carries far more
   energy than a radio photon.
   Grounded in Ch.5 §5.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

/* illustrative but correctly ordered photons. E(eV) = 1240 / λ(nm). */
const PHOTONS = [
  { id: "radio",  col: "#6b7cff", en: "Radio",        ja: "電波",     lambda: "1 m",    freq: "300 MHz",  eV: 1.24e-6, cycles: 3 },
  { id: "red",    col: "#ff4d4d", en: "Red light",    ja: "赤い光",   lambda: "700 nm", freq: "430 THz",  eV: 1.77,    cycles: 8 },
  { id: "violet", col: "#c98bff", en: "Violet light", ja: "紫の光",   lambda: "400 nm", freq: "750 THz",  eV: 3.10,    cycles: 13 },
  { id: "xray",   col: "#5fe8ff", en: "X-ray",        ja: "X線",      lambda: "1 nm",   freq: "300 PHz",  eV: 1240,    cycles: 22 },
];

const STR = {
  en: {
    title: "Photons & energy",
    kind: "Light as packets — E = h·f, energy rises with frequency",
    lede: "The same light behaves as a stream of tiny packets called photons. Pick one and watch its energy: the higher the frequency (the shorter the wave), the more punch each single photon delivers.",
    thread: "THE STORY CONTINUES",
    threadText: "We have followed light as a wave stretched across the spectrum. But that wave has a second face. When light meets matter it arrives in indivisible grains — photons — and each grain's energy is fixed entirely by its frequency.",
    key: "WHY X-RAYS ARE DANGEROUS",
    keyText: "A photon is a discrete packet of electromagnetic energy, and E = h·f. Radio photons are so feeble you feel nothing; a single X-ray photon, with a frequency millions of times higher, carries enough energy to knock electrons out of atoms. Same light, but shorter wavelength means far more energy per photon.",
    pick: "Pick a photon:",
    energyL: "Energy per photon",
    freqL: "Frequency", wlL: "Wavelength",
    logNote: "Energy bar shown on a logarithmic scale — the real range is enormous (an X-ray photon carries about a billion times the energy of a radio photon).",
    least: "least energy", most: "most energy",
    packet: "one photon · a packet of EM energy",
  },
  ja: {
    title: "光子とエネルギー",
    kind: "粒としての光 — E = h·f、エネルギーは振動数とともに増す",
    lede: "同じ光が、光子と呼ばれる小さな粒の流れとしてふるまいます。一つ選んで、そのエネルギーを見よう——振動数が高い（波が短い）ほど、一個の光子が与える衝撃は大きくなります。",
    thread: "物語はつづく",
    threadText: "私たちは、スペクトルに広がる波として光を追ってきました。しかしその波には、もう一つの顔があります。光が物質と出会うとき、それは分けられない粒——光子——として届き、各粒のエネルギーは振動数だけで決まるのです。",
    key: "X線が危険な理由",
    keyText: "光子は電磁エネルギーの離散的な包みであり、E = h·f です。電波の光子はあまりに弱く何も感じませんが、その何百万倍もの振動数をもつX線の光子一個は、原子から電子を叩き出すほどのエネルギーを運びます。同じ光でも、波長が短いほど光子一個あたりのエネルギーははるかに大きいのです。",
    pick: "光子を選ぶ：",
    energyL: "光子あたりのエネルギー",
    freqL: "振動数", wlL: "波長",
    logNote: "エネルギーの棒は対数目盛りで表示しています——実際の幅は途方もなく大きい（X線の光子は電波の光子の約10億倍のエネルギーを運びます）。",
    least: "最小エネルギー", most: "最大エネルギー",
    packet: "一個の光子・電磁エネルギーの包み",
  },
};

/* draw a gaussian wave-packet whose oscillation is denser for higher f */
function drawPacket(ctx, cw, H, p, phase) {
  ctx.clearRect(0, 0, cw, H);
  const baseline = H / 2;
  const A = H * 0.28;
  const cx = cw / 2;
  const sigma = cw * 0.16;

  ctx.strokeStyle = "rgba(150,175,230,0.2)"; ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath(); ctx.moveTo(0, baseline); ctx.lineTo(cw, baseline); ctx.stroke();
  ctx.setLineDash([]);

  const k = (2 * Math.PI * p.cycles) / cw;
  ctx.strokeStyle = p.col; ctx.lineWidth = 2.4;
  ctx.shadowColor = p.col; ctx.shadowBlur = 12;
  ctx.beginPath();
  for (let x = 0; x <= cw; x++) {
    const env = Math.exp(-((x - cx) ** 2) / (2 * sigma * sigma));
    const y = baseline - A * env * Math.sin(k * (x - cx) + phase);
    if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.shadowBlur = 0;

  // envelope outline (faint)
  ctx.strokeStyle = p.col + "44"; ctx.lineWidth = 1; ctx.setLineDash([2, 3]);
  ctx.beginPath();
  for (let x = 0; x <= cw; x++) {
    const env = Math.exp(-((x - cx) ** 2) / (2 * sigma * sigma));
    const y = baseline - A * env;
    if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.setLineDash([]);
}

export function Photons() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 200;
  const canRef = useRef(null);
  const [sel, setSel] = useState("violet");
  const cw = Math.min(w, 760);
  const p = PHOTONS.find((x) => x.id === sel);

  // log-scaled bar: map eV across the full range to 0..1
  const logMin = Math.log10(PHOTONS[0].eV);      // radio
  const logMax = Math.log10(PHOTONS[PHOTONS.length - 1].eV); // X-ray
  const frac = (Math.log10(p.eV) - logMin) / (logMax - logMin);
  const pct = Math.round(frac * 100);
  const eVStr = p.eV < 0.001 ? p.eV.toExponential(1) : (p.eV >= 100 ? Math.round(p.eV).toLocaleString() : p.eV.toFixed(2));

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { drawPacket(ctx, cw, H, p, 0); return; }
    let raf, ph = 0;
    const loop = () => { ph -= 0.08; drawPacket(ctx, cw, H, p, ph); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, sel, lang]);

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

        <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginBottom: 4 }}>{t.pick}</div>
        <div style={{ ...styles.pickerRow, justifyContent: "flex-start" }}>
          {PHOTONS.map((x) => {
            const on = x.id === sel;
            return (
              <button key={x.id} onClick={() => setSel(x.id)}
                style={{ ...styles.chip, ...(on ? styles.chipOn : {}), ...(on ? { borderColor: x.col, background: x.col + "22" } : {}) }}>
                {lang === "ja" ? x.ja : x.en}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>
        <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, marginTop: 6, textAlign: "center" }}>{t.packet}</div>

        {/* readouts */}
        <div style={{ display: "flex", gap: 22, flexWrap: "wrap", marginTop: 12 }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, letterSpacing: 1 }}>{t.wlL}</div>
            <div style={{ fontFamily: mono, fontSize: 22, color: C.violet }}>{p.lambda}</div>
          </div>
          <div>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, letterSpacing: 1 }}>{t.freqL}</div>
            <div style={{ fontFamily: mono, fontSize: 22, color: C.cool }}>{p.freq}</div>
          </div>
          <div>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, letterSpacing: 1 }}>{t.energyL}</div>
            <div style={{ fontFamily: mono, fontSize: 22, color: C.sun }}>{eVStr}<span style={{ fontSize: 13, color: C.muted }}> eV</span></div>
          </div>
        </div>

        {/* energy bar (log scale) */}
        <div style={{ marginTop: 12 }}>
          <div style={{ height: 18, background: "rgba(120,150,210,0.15)", borderRadius: 9, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${Math.max(2, pct)}%`, background: `linear-gradient(90deg, ${p.col}, #fff)`, transition: "width 0.25s" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 12, color: C.faint, marginTop: 4 }}>
            <span>{t.least}</span><span>{t.most}</span>
          </div>
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.logNote}</p>
      </div>
    </div>
  );
}

export default Photons;
