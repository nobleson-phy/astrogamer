/* ============================================================
   STATION 4 — TRIPLE-ALPHA & THE HELIUM FLASH
   To fuse helium, three He-4 nuclei (alpha particles) must slam together to
   make carbon-12 — the TRIPLE-ALPHA process. Because each alpha carries a +2
   charge, their electrostatic repulsion is about 4× stronger than hydrogen's,
   so it takes ~100 million K (versus ~12 million K for hydrogen). In a low-mass
   star (0.8–2.0 M☉) the core is electron-degenerate when it ignites, so fusion
   runs away in a sudden HELIUM FLASH. A further alpha turns carbon into oxygen.
   Grounded in Ch.22 §22.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const IGNITE = 100; // million K

const STR = {
  en: {
    title: "Triple-alpha & the helium flash",
    kind: "Lighting a hotter fire",
    lede: "Crank up the core temperature. Below 100 million K the alpha particles just bounce; cross it and three of them fuse into carbon — and a degenerate core flashes.",
    thread: "THE STORY CONTINUES",
    threadText: "The contracting helium core keeps heating. If it can reach a hundred million degrees, a brand-new kind of fire can start — one that forges the carbon in every living thing.",
    key: "TRIPLE-ALPHA (100 MILLION K) & THE HELIUM FLASH",
    keyText: "To fuse helium, three helium-4 nuclei (alpha particles) must collide and bind into carbon-12 — the TRIPLE-ALPHA process. Each alpha carries a +2 charge, so their mutual repulsion is about 4× stronger than between hydrogen nuclei; the core must reach about 100 million K to overcome it (versus ~12 million K for hydrogen). In a low-mass star (0.8–2.0 M☉) the core is electron-DEGENERATE when helium ignites, so the reaction runs away almost explosively in a HELIUM FLASH before the core can expand and steady itself. One more alpha added to carbon makes oxygen (¹²C + ⁴He → ¹⁶O).",
    temp: "Core temperature",
    cold: "too cold — alphas repel and bounce",
    ignited: "IGNITED — triple-alpha fusion",
    flashLbl: "HELIUM FLASH (degenerate core)",
    carbon: "3 ⁴He → ¹²C", oxygen: "¹²C + ⁴He → ¹⁶O",
    threshold: "100 million K threshold",
    note: "Triple-alpha fuses three heliums into carbon, but the +2 alpha charge needs ~100 million K (4× hydrogen's barrier). In a degenerate low-mass core, ignition runs away as the helium flash. Another alpha makes oxygen.",
  },
  ja: {
    title: "トリプルアルファとヘリウムフラッシュ",
    kind: "より熱い火をともす",
    lede: "核の温度を上げよう。1億K未満ではアルファ粒子はただ跳ね返るだけ。それを超えると3個が融合して炭素になり——縮退した核はフラッシュを起こします。",
    thread: "物語はつづく",
    threadText: "収縮するヘリウムの核は熱くなり続けます。もし1億度に達すれば、まったく新しい種類の火がともる——あらゆる生き物の中の炭素を作り出す火が。",
    key: "トリプルアルファ（1億K）とヘリウムフラッシュ",
    keyText: "ヘリウムを融合するには、3個のヘリウム4原子核（アルファ粒子）が衝突して炭素12に結びつく必要があります——トリプルアルファ反応です。各アルファは+2の電荷を持つので、その相互反発は水素原子核どうしより約4倍強く、核はそれに打ち勝つため約1億Kに達しなければなりません（水素は約1,200万K）。低質量星（0.8〜2.0 M☉）では、ヘリウムが点火するとき核は電子縮退しているので、核が膨張して落ち着く前に反応がほぼ爆発的に暴走します——ヘリウムフラッシュです。炭素にもう1個アルファが加わると酸素になります（¹²C + ⁴He → ¹⁶O）。",
    temp: "核の温度",
    cold: "冷たすぎ——アルファは反発して跳ね返る",
    ignited: "点火——トリプルアルファ融合",
    flashLbl: "ヘリウムフラッシュ（縮退核）",
    carbon: "3 ⁴He → ¹²C", oxygen: "¹²C + ⁴He → ¹⁶O",
    threshold: "1億Kのしきい値",
    note: "トリプルアルファは3個のヘリウムを炭素に融合しますが、+2のアルファ電荷のため約1億K（水素の障壁の4倍）が要ります。縮退した低質量の核では、点火がヘリウムフラッシュとして暴走します。もう1個のアルファで酸素ができます。",
  },
};

function draw(ctx, cw, H, T, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const ignited = T >= IGNITE;
  const cx = cw * 0.5, cy = H * 0.42;
  const speed = clamp(T / IGNITE, 0.1, 1.4);
  // flash glow if degenerate (low-mass) flash: strongest right at/above threshold
  if (ignited) {
    const flash = 0.4 + 0.3 * Math.sin(tt * 0.15);
    const g = ctx.createRadialGradient(cx, cy, 4, cx, cy, 120);
    g.addColorStop(0, `rgba(255,210,61,${0.5 * flash})`); g.addColorStop(1, "rgba(255,210,61,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 120, 0, Math.PI * 2); ctx.fill();
  }
  // three alpha particles orbiting / colliding
  const n = 3;
  const R = ignited ? 14 + 5 * Math.sin(tt * 0.1) : 44 - (speed * 10);
  for (let i = 0; i < n; i++) {
    const a = tt * 0.03 * speed + (i * 2 * Math.PI / n);
    const ax = cx + Math.cos(a) * R, ay = cy + Math.sin(a) * R;
    ctx.fillStyle = ignited ? "#ffd23d" : "#8fb8ff";
    ctx.beginPath(); ctx.arc(ax, ay, 9, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#06121a"; ctx.font = `9px ${mono}`; ctx.textAlign = "center";
    ctx.fillText("α", ax, ay + 3);
  }
  // product
  if (ignited) {
    ctx.fillStyle = "#3fe89b"; ctx.beginPath(); ctx.arc(cx, cy, 11, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#06121a"; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText("C", cx, cy + 3);
  }
  // status text
  ctx.textAlign = "center"; ctx.font = `12px ${mono}`;
  if (ignited) {
    ctx.fillStyle = C.good; ctx.fillText(t.ignited, cx, H - 44);
    ctx.fillStyle = C.sun; ctx.font = `11px ${mono}`;
    ctx.fillText(t.carbon + "    " + t.oxygen, cx, H - 26);
    ctx.fillStyle = C.danger; ctx.fillText(t.flashLbl, cx, H - 10);
  } else {
    ctx.fillStyle = C.faint; ctx.fillText(t.cold, cx, H - 20);
  }
}

export function TripleAlphaFlash() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [T, setT] = useState(40);
  const tempRef = useRef(40); tempRef.current = T;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, tempRef.current, 40, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, tempRef.current, tt, lang); raf = requestAnimationFrame(loop); };
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

        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "4px 0 2px" }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.temp}</span>
          <input type="range" min="10" max="160" step="1" value={T}
            onChange={(e) => setT(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
          <span style={{ fontFamily: mono, fontSize: 12, color: T >= IGNITE ? C.good : C.muted, width: 74, textAlign: "right" }}>{T}M K</span>
        </div>
        <div style={{ fontFamily: mono, fontSize: 11, color: C.faint, textAlign: "right", marginBottom: 6 }}>{t.threshold}</div>

        <div style={{ marginTop: 4 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default TripleAlphaFlash;
