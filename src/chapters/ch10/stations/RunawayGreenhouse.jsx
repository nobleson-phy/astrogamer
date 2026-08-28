/* ============================================================
   STATION 3 — THE RUNAWAY GREENHOUSE
   Venus may once have had oceans. But being closer to the Sun,
   extra heat evaporated the water; water vapour is itself a
   greenhouse gas, trapping more heat, evaporating more water — an
   unstoppable loop. With no oceans left to dissolve CO2 into rock,
   carbon dioxide built up in the air, driving the surface to 730 K.
   Grounded in Ch.10 §10.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STEPS = [
  { en: "A warm young Venus with oceans", ja: "海をもつ暖かい若い金星" },
  { en: "Closer to the Sun → extra heat evaporates the oceans", ja: "太陽に近い → 余分な熱が海を蒸発させる" },
  { en: "Water vapour is a greenhouse gas → traps more heat", ja: "水蒸気は温室効果ガス → さらに熱を閉じ込める" },
  { en: "More heat evaporates more water → the loop runs away", ja: "熱が増えるほど蒸発が進む → ループが暴走" },
  { en: "No oceans left to lock CO₂ into rock → CO₂ floods the air", ja: "CO₂を岩に固定する海が消える → CO₂が大気にあふれる" },
  { en: "Runaway greenhouse → surface reaches 730 K, forever", ja: "暴走温室効果 → 地表は730 Kに、永遠に" },
];

const STR = {
  en: {
    title: "The runaway greenhouse",
    kind: "How a twin of Earth became an oven",
    lede: "Venus may have started with oceans, like Earth. Step through the feedback loop that boiled them away and turned the safety valves into a trap — an irreversible slide to 730 K.",
    thread: "THE STORY CONTINUES",
    threadText: "Why is Venus so much hotter than its 96% CO₂ alone would suggest? The answer is a feedback loop — the same physics that keeps Earth livable, pushed past the point of no return.",
    key: "A FEEDBACK LOOP WITH NO OFF-SWITCH",
    keyText: "On Earth, oceans dissolve CO₂ and lock it into carbonate rock — a thermostat. Venus, closer to the Sun, got a little too warm; its oceans began to evaporate. But water vapour is itself a powerful greenhouse gas, so it trapped still more heat, which evaporated still more water — a runaway loop. Once the oceans were gone, nothing remained to pull CO₂ out of the air, so carbon dioxide accumulated unchecked. The result is an irreversible RUNAWAY GREENHOUSE that drives Venus's surface to 730 K.",
    step: "Step", of: "of", next: "Next ›", prev: "‹ Back", temp: "surface temp",
    note: "Each step feeds the next: heat → evaporation → more greenhouse gas → more heat. Losing the oceans removed the only way to store CO₂, so the warming could never reverse.",
  },
  ja: {
    title: "暴走温室効果",
    kind: "地球の双子がオーブンになった経緯",
    lede: "金星は地球のように海から始まったかもしれません。海を煮沸させ、安全弁を罠に変えたフィードバックループを順に見よう——730 Kへの不可逆な滑落です。",
    thread: "物語はつづく",
    threadText: "金星はなぜ96%のCO₂だけから予想されるよりずっと熱いのか？答えはフィードバックループ——地球を住める場所に保つのと同じ物理が、後戻りできない点を越えたのです。",
    key: "オフスイッチのないフィードバックループ",
    keyText: "地球では海がCO₂を溶かし、炭酸塩岩に固定します——サーモスタットです。太陽に近い金星は少し暖かくなりすぎ、海が蒸発し始めました。しかし水蒸気自体が強力な温室効果ガスなので、さらに熱を閉じ込め、さらに水を蒸発させました——暴走ループです。海が消えると、CO₂を大気から引き抜くものが何も残らず、二酸化炭素が歯止めなくたまりました。結果が、金星の地表を730 Kへ追い込む不可逆な暴走温室効果です。",
    step: "ステップ", of: "／", next: "次へ ›", prev: "‹ 戻る", temp: "地表温度",
    note: "各ステップが次を促します：熱 → 蒸発 → 温室効果ガス増 → さらに熱。海を失うとCO₂を蓄える唯一の方法が消え、温暖化は決して逆転できなくなりました。",
  },
};

function draw(ctx, cw, H, step, tt, lang) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.42, cy = H / 2, R = 64;
  const heat = step / (STEPS.length - 1); // 0..1
  // planet colour shifts blue-green (ocean) -> orange (oven)
  const lerpC = (a, b, f) => a.map((v, i) => Math.round(v + (b[i] - v) * f));
  const col = lerpC([90, 150, 200], [230, 150, 60], heat);
  const g = ctx.createRadialGradient(cx - 16, cy - 16, 4, cx, cy, R);
  g.addColorStop(0, `rgb(${col.map((v) => Math.min(255, v + 40)).join(",")})`);
  g.addColorStop(1, `rgb(${col.join(",")})`);
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
  // oceans (shrink as heat rises)
  if (heat < 0.8) { ctx.fillStyle = `rgba(60,120,200,${0.6 * (1 - heat / 0.8)})`; ctx.beginPath(); ctx.ellipse(cx, cy + 10, R * 0.7, R * 0.35, 0, 0, Math.PI * 2); ctx.fill(); }
  // rising vapour / CO2 as heat rises
  const puffs = Math.floor(heat * 10);
  for (let i = 0; i < puffs; i++) { const a = (i / 10) * Math.PI * 2 + tt * 0.02; const rr = R + 14 + (i % 3) * 8 + Math.sin(tt * 0.05 + i) * 3; ctx.fillStyle = "rgba(230,200,150,0.5)"; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, 3, 0, Math.PI * 2); ctx.fill(); }
  // greenhouse blanket ring (thicker with heat)
  ctx.strokeStyle = `rgba(255,120,60,${0.2 + heat * 0.6})`; ctx.lineWidth = 4 + heat * 12;
  ctx.beginPath(); ctx.arc(cx, cy, R + 22, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
  // temperature readout
  const T = STR[lang].temp; const tk = Math.round(300 + heat * 430);
  ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.textAlign = "right"; ctx.fillText(T, cw - 16, 22);
  ctx.fillStyle = heat > 0.6 ? C.danger : C.sun; ctx.font = `700 20px ${mono}`; ctx.fillText(tk + " K", cw - 16, 44);
}

export function RunawayGreenhouse() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [step, setStep] = useState(0);
  const stepRef = useRef(step); stepRef.current = step;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, step, 0, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, stepRef.current, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

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

        <div style={{ marginTop: 4 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
          <button style={{ ...styles.iconBtn, ...(step === 0 ? { opacity: 0.4 } : {}) }} onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>{t.prev}</button>
          <button style={{ ...styles.iconBtn, ...(step === STEPS.length - 1 ? { opacity: 0.4 } : {}) }} onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))} disabled={step === STEPS.length - 1}>{t.next}</button>
          <span style={{ fontFamily: mono, fontSize: 12, color: C.faint }}>{t.step} {step + 1} {t.of} {STEPS.length}</span>
        </div>

        <div style={{ marginTop: 10, minHeight: 44, fontFamily: mono, fontSize: 14.5, color: step === STEPS.length - 1 ? C.danger : C.text, lineHeight: 1.5 }}>
          {step + 1}. {lang === "ja" ? STEPS[step].ja : STEPS[step].en}
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default RunawayGreenhouse;
