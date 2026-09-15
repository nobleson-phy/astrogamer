/* ============================================================
   STATION 5 — FORCES & TEMPERATURE
   Two protons both carry positive charge, so they repel each other
   electrically. To fuse, they must be flung together hard enough to
   reach the tiny range (~10⁻¹⁵ m) where the STRONG NUCLEAR FORCE takes
   over and binds them. That requires enormous speeds — i.e., a
   temperature of 12-15 million K, as found at the Sun's core center.
   Grounded in Ch.16 §16.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Forces & temperature",
    kind: "Beating the repulsion barrier",
    lede: "Turn up the core temperature and fire two protons at each other. Too cold, and they bounce apart; hot enough, and the strong force snaps them together.",
    thread: "THE STORY CONTINUES",
    threadText: "Fusion is hard to start. Two protons hate each other electrically, and only a furnace of a very particular ferocity can force them close enough to bond.",
    key: "ONLY 12-15 MILLION K CAN OVERCOME REPULSION",
    keyText: "Protons are positively charged, so they repel one another electrically — the closer they get, the harder they push apart. To fuse, they must collide fast enough to get within about 10⁻¹⁵ m of each other, where the powerful but very short-range STRONG NUCLEAR FORCE can grab and bind them. Reaching those speeds requires a temperature of roughly 12 to 15 million K. That is exactly the condition at the center of the Sun's core, where models put the temperature near 15 million K — hot enough to run the proton-proton chain.",
    temp: "Core temperature", tempUnit: "million K",
    tooCold: "too cold — protons repel and bounce apart", fuse: "hot enough — strong force binds → fusion!",
    barrier: "electrical repulsion barrier", strong: "strong force range (~10⁻¹⁵ m)",
    note: "Positively charged protons repel; only at 12-15 million K do they move fast enough to reach the short-range strong nuclear force and fuse. The Sun's core center sits near 15 million K.",
  },
  ja: {
    title: "力と温度",
    kind: "反発の壁を越える",
    lede: "核の温度を上げて、2個の陽子をぶつけよう。冷たすぎると跳ね返り、十分熱いと強い核力が一気に結びつけます。",
    thread: "物語はつづく",
    threadText: "核融合を始めるのは難しい。2個の陽子は電気的に反発し合い、非常に特別な激しさの炉だけが、結合するほど近づけられます。",
    key: "反発を越えられるのは1,200万〜1,500万Kだけ",
    keyText: "陽子は正の電荷を持つので、電気的に反発し合います——近づくほど強く押し返します。融合するには、互いに約10⁻¹⁵ mまで近づけるほど速く衝突しなければならず、そこで強力だが非常に近距離の強い核力がつかまえて結びつけます。その速度に達するには、およそ1,200万〜1,500万Kの温度が必要です。それはまさに太陽の核の中心の状態で、モデルは温度を約1,500万Kと置きます——陽子-陽子連鎖を動かすのに十分な熱さです。",
    temp: "核の温度", tempUnit: "百万K",
    tooCold: "冷たすぎる——陽子は反発して跳ね返る", fuse: "十分熱い——強い核力が結合 → 融合！",
    barrier: "電気的反発の壁", strong: "強い核力の範囲（約10⁻¹⁵ m）",
    note: "正電荷の陽子は反発します。1,200万〜1,500万Kで初めて十分速くなり、近距離の強い核力に達して融合します。太陽の核中心は約1,500万Kです。",
  },
};

function draw(ctx, cw, H, tempM, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cy = H * 0.42;
  const canFuse = tempM >= 12;
  // background warmth
  const warm = clamp((tempM - 2) / 16, 0, 1);
  ctx.fillStyle = `rgba(${120 + warm * 120 | 0},${40 + warm * 60 | 0},20,0.10)`; ctx.fillRect(0, 0, cw, H);
  // repulsion barrier hill in the middle (potential curve)
  const midX = cw / 2;
  ctx.strokeStyle = "rgba(150,175,230,0.4)"; ctx.lineWidth = 1.5; ctx.beginPath();
  for (let x = 40; x < cw - 40; x++) { const d = Math.abs(x - midX); const y = cy + 40 - 60 * Math.exp(-Math.pow(d / 40, 2)); if (x === 40) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
  ctx.stroke();
  ctx.fillStyle = "rgba(150,175,230,0.6)"; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.barrier, midX, cy - 30);
  // proton approach animation; amplitude depends on temperature (speed)
  const reach = 40 + warm * (midX - 40 - 14); // how close they get
  const osc = (Math.sin(tt * 0.05) + 1) / 2; // 0..1
  let pxL, pxR;
  if (canFuse && osc > 0.9) {
    // fused: helium-ish at center
    ctx.fillStyle = "#8fc0e8"; ctx.beginPath(); ctx.arc(midX, cy, 11, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#fff"; ctx.fillText("He", midX, cy + 3);
    ctx.strokeStyle = "#ffd86b"; ctx.lineWidth = 2; for (let a = 0; a < Math.PI * 2; a += Math.PI / 5) { ctx.beginPath(); ctx.moveTo(midX + Math.cos(a) * 13, cy + Math.sin(a) * 13); ctx.lineTo(midX + Math.cos(a) * 20, cy + Math.sin(a) * 20); ctx.stroke(); }
  } else {
    pxL = 40 + osc * (reach - 40); pxR = cw - 40 - osc * (reach - 40);
    ctx.fillStyle = "#e0774f"; ctx.beginPath(); ctx.arc(pxL, cy, 9, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(pxR, cy, 9, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#fff"; ctx.font = `8px ${mono}`; ctx.fillText("p", pxL, cy + 3); ctx.fillText("p", pxR, cy + 3);
  }
  // status
  ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillStyle = canFuse ? C.good : C.bad;
  ctx.fillText(canFuse ? t.fuse : t.tooCold, cw / 2, H - 14);
}

export function ForcesTemperature() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 240;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [tempM, setTempM] = useState(15);
  const tempRef = useRef(15); tempRef.current = tempM;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, tempRef.current, 30, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, tempRef.current, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 05</div>
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
          <input type="range" min="2" max="18" step="0.5" value={tempM}
            onChange={(e) => setTempM(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
          <span style={{ fontFamily: mono, fontSize: 12, color: tempM >= 12 ? C.good : C.bad, width: 84, textAlign: "right" }}>{tempM} {t.tempUnit}</span>
        </div>

        <div style={{ marginTop: 4 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default ForcesTemperature;
