/* ============================================================
   STATION 8 — COSMIC ALCHEMY & GAMMA-RAY BURSTS
   The heaviest elements are forged in catastrophe. SHORT gamma-ray bursts
   (<2 s) come from the MERGER of two compact corpses — two neutron stars, or a
   neutron star and a black hole. LONG bursts (>2 s) come from massive
   COLLAPSARS/hypernovae in active star-forming regions, because very massive
   stars die fast, near where they were born. In 2017 GW170817 caught both
   gravitational waves and a short GRB from a neutron-star merger, confirming
   that such collisions forge gold and platinum in a KILONOVA. Rapid neutron
   capture (the r-process) builds elements heavier than iron and scatters them
   to seed future planets and life. Grounded in Ch.23.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Cosmic alchemy & gamma-ray bursts",
    kind: "The gold in you was forged in catastrophe",
    lede: "Switch between a short and a long gamma-ray burst. One is two dead stars colliding; the other a giant collapsing. Both scatter elements heavier than iron.",
    thread: "THE STORY ENDS — AND SEEDS THE NEXT",
    threadText: "The deaths of stars are not only endings. In the hottest, most violent instants the Universe forges gold, platinum and uranium — and flings them outward to become the next worlds, and us.",
    key: "COSMIC ALCHEMY — MERGERS, KILONOVAE, AND THE GOLD IN YOU",
    keyText: "The heaviest elements are born in catastrophe. SHORT gamma-ray bursts (under 2 seconds) come from the MERGER of two compact corpses — two neutron stars, or a neutron star and a black hole. LONG bursts (over 2 seconds) come from massive COLLAPSARS/hypernovae in active star-forming regions, because very massive stars live fast and die near where they were born. In 2017, GW170817 was detected as both GRAVITATIONAL WAVES and a short GRB from a neutron-star merger — multi-messenger proof that such collisions forge gold and platinum in a KILONOVA. Rapid neutron capture (the r-process) builds elements heavier than iron and scatters them into space to seed future planets and life. The gold in your blood was made this way.",
    modeShort: "Short GRB (<2 s)", modeLong: "Long GRB (>2 s)",
    shortTitle: "NEUTRON-STAR MERGER", longTitle: "COLLAPSAR / HYPERNOVA",
    shortDesc: "two compact corpses spiral in and collide → kilonova",
    longDesc: "a massive star collapses in a star-forming region → jets",
    gw: "GW170817 (2017): gravitational waves + short GRB = NS merger",
    rprocess: "r-process: builds gold, platinum, uranium → seeds planets & life",
    note: "Short GRBs (<2 s) are compact-object mergers; long GRBs (>2 s) are massive collapsars in star-forming regions. GW170817 confirmed NS mergers make short GRBs and forge gold/platinum in a kilonova. The r-process scatters elements heavier than iron into space.",
  },
  ja: {
    title: "宇宙の錬金術とガンマ線バースト",
    kind: "あなたの中の金は大惨事で作られた",
    lede: "短いガンマ線バーストと長いものを切り替えよう。ひとつは2つの死んだ星の衝突、もうひとつは巨星の崩壊。どちらも鉄より重い元素をまき散らします。",
    thread: "物語の終わり——そして次を育てる",
    threadText: "星の死は、ただの終わりではありません。最も熱く、最も激しい一瞬に、宇宙は金・プラチナ・ウランを作り——それを外へ放って、次の世界と、私たちになるのです。",
    key: "宇宙の錬金術——合体、キロノヴァ、そしてあなたの中の金",
    keyText: "最も重い元素は大惨事で生まれます。短いガンマ線バースト（2秒未満）は、2つのコンパクトな亡骸——2つの中性子星、または中性子星とブラックホール——の合体から生じます。長いバースト（2秒以上）は、活発な星形成領域の大質量コラプサー／ハイパーノヴァから生じます。非常に重い星は速く生き、生まれた場所の近くで死ぬからです。2017年、GW170817は中性子星の合体からの重力波と短いGRBの両方として検出されました——そうした衝突がキロノヴァで金やプラチナを作るという、マルチメッセンジャーの証拠です。急速な中性子捕獲（r過程）が鉄より重い元素を作り、宇宙へまき散らして未来の惑星と生命を育てます。あなたの血の中の金は、こうして作られたのです。",
    modeShort: "短いGRB（2秒未満）", modeLong: "長いGRB（2秒以上）",
    shortTitle: "中性子星の合体", longTitle: "コラプサー／ハイパーノヴァ",
    shortDesc: "2つのコンパクトな亡骸が渦を巻いて衝突 → キロノヴァ",
    longDesc: "大質量星が星形成領域で崩壊 → ジェット",
    gw: "GW170817（2017）：重力波＋短いGRB＝中性子星の合体",
    rprocess: "r過程：金・プラチナ・ウランを作る → 惑星と生命を育てる",
    note: "短いGRB（2秒未満）はコンパクト天体の合体、長いGRB（2秒以上）は星形成領域の大質量コラプサー。GW170817は中性子星合体が短いGRBを作り、キロノヴァで金／プラチナを作ることを裏づけました。r過程は鉄より重い元素を宇宙にまき散らします。",
  },
};

function drawShort(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.5, cy = H * 0.44;
  const phase = (tt % 300) / 300;
  const inspiral = clamp(phase / 0.7, 0, 1);
  const merged = phase > 0.7;
  const sep = merged ? 0 : (1 - inspiral) * 54 + 6;
  const ang = tt * 0.12;

  if (merged) {
    const f = (phase - 0.7) / 0.3;
    // kilonova glow
    const R = 20 + f * 90;
    const g = ctx.createRadialGradient(cx, cy, 2, cx, cy, R);
    g.addColorStop(0, `rgba(255,255,255,${clamp(0.9 - f, 0.1, 0.9)})`);
    g.addColorStop(0.4, `rgba(201,139,255,${clamp(0.7 - f * 0.5, 0, 0.7)})`);
    g.addColorStop(1, "rgba(255,160,80,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.violet; ctx.font = `12px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(lang === "ja" ? "キロノヴァ" : "kilonova", cx, cy + 4);
  } else {
    // two neutron stars spiraling
    for (let s = -1; s <= 1; s += 2) {
      const x = cx + Math.cos(ang) * sep * s, y = cy + Math.sin(ang) * sep * s;
      const g = ctx.createRadialGradient(x, y, 1, x, y, 11);
      g.addColorStop(0, "#ffffff"); g.addColorStop(0.6, "#cfe0ff"); g.addColorStop(1, "#6f8fd8");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 11, 0, Math.PI * 2); ctx.fill();
    }
    // gravitational-wave ripples
    ctx.strokeStyle = "rgba(201,139,255,0.35)"; ctx.lineWidth = 1;
    for (let r = 20; r < 110; r += 22) {
      ctx.beginPath(); ctx.arc(cx, cy, r + (tt % 22), 0, Math.PI * 2); ctx.stroke();
    }
  }
  ctx.fillStyle = C.text; ctx.font = `13px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.shortTitle, cx, 24);
  ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`;
  ctx.fillText(t.shortDesc, cx, H - 12);
}

function drawLong(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.5, cy = H * 0.46;
  // star-forming cloud background (soft blobs)
  for (let i = 0; i < 5; i++) {
    const bx = (cw / 6) * (i + 0.6) + 20 * Math.sin(tt * 0.01 + i);
    const g = ctx.createRadialGradient(bx, cy, 4, bx, cy, 40);
    g.addColorStop(0, "rgba(99,160,240,0.10)"); g.addColorStop(1, "rgba(99,160,240,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(bx, cy, 40, 0, Math.PI * 2); ctx.fill();
  }
  // collapsing massive star
  const g2 = ctx.createRadialGradient(cx, cy, 2, cx, cy, 20);
  g2.addColorStop(0, "#ffffff"); g2.addColorStop(0.6, "#ffd9a0"); g2.addColorStop(1, "#d86a3a");
  ctx.fillStyle = g2; ctx.beginPath(); ctx.arc(cx, cy, 16, 0, Math.PI * 2); ctx.fill();
  // bipolar jets
  const jet = 60 + 20 * Math.sin(tt * 0.1);
  for (let s = -1; s <= 1; s += 2) {
    const grad = ctx.createLinearGradient(cx, cy, cx, cy + s * jet);
    grad.addColorStop(0, "rgba(99,211,240,0.8)"); grad.addColorStop(1, "rgba(99,211,240,0)");
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.moveTo(cx - 6, cy); ctx.lineTo(cx + 6, cy);
    ctx.lineTo(cx + 16, cy + s * jet); ctx.lineTo(cx - 16, cy + s * jet); ctx.closePath(); ctx.fill();
  }
  ctx.fillStyle = C.text; ctx.font = `13px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.longTitle, cx, 24);
  ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`;
  ctx.fillText(t.longDesc, cx, H - 12);
}

export function CosmicAlchemyGRB() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 270;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("short");
  const modeRef = useRef("short"); modeRef.current = mode;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) {
      if (mode === "short") drawShort(ctx, cw, H, 120, lang); else drawLong(ctx, cw, H, 60, lang);
      return;
    }
    let raf, tt = 0;
    const loop = () => {
      tt += 1;
      if (modeRef.current === "short") drawShort(ctx, cw, H, tt, lang); else drawLong(ctx, cw, H, tt, lang);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, mode, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 08</div>
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
          <button onClick={() => setMode("short")} style={{ ...styles.chip, ...(mode === "short" ? styles.chipOn : {}) }}>{t.modeShort}</button>
          <button onClick={() => setMode("long")} style={{ ...styles.chip, ...(mode === "long" ? styles.chipOn : {}) }}>{t.modeLong}</button>
        </div>

        <div style={{ marginTop: 10 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <div style={{ fontFamily: mono, fontSize: 11.5, color: C.cool, marginTop: 8 }}>{t.gw}</div>
        <div style={{ fontFamily: mono, fontSize: 11.5, color: C.sun, marginTop: 4 }}>{t.rprocess}</div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default CosmicAlchemyGRB;
