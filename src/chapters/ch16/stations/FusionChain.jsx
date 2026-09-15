/* ============================================================
   STATION 4 — THE PROTON-PROTON CHAIN
   The Sun fuses hydrogen to helium via the proton-proton chain.
   Step 1: two protons fuse into deuterium, emitting a positron (the
   electron's antiparticle) and a neutrino. Step 2: deuterium + a proton
   → helium-3 + a gamma ray. Step 3: two helium-3 nuclei → helium-4 + two
   protons. This is FUSION (light nuclei combining), the opposite of
   FISSION (heavy nuclei splitting). Grounded in Ch.16 §16.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The proton-proton chain",
    kind: "How hydrogen becomes helium",
    lede: "Step through the reaction that lights the Sun — then compare it with fission, its mirror image. Fusion builds up; fission breaks down.",
    thread: "THE STORY CONTINUES",
    threadText: "Deep in the core, protons collide billions of times before one pair finally sticks. Follow the three steps that turn four hydrogens into a single helium.",
    chainKey: "STEP 1 MAKES DEUTERIUM, A POSITRON, AND A NEUTRINO",
    chainText: "The proton-proton chain has three main steps. Step 1: two protons fuse; one instantly turns into a neutron, forming a deuterium nucleus (one proton + one neutron) and emitting a POSITRON (the positively charged antiparticle of the electron) and a NEUTRINO. Step 2: the deuterium captures another proton to form helium-3, releasing a gamma ray. Step 3: two helium-3 nuclei collide to form helium-4, releasing two protons back into the plasma. The net result: four hydrogen nuclei become one helium-4, plus energy.",
    fissionKey: "FUSION BUILDS UP; FISSION BREAKS DOWN",
    fissionText: "Fusion and fission are opposites. FUSION combines light atomic nuclei into heavier ones — and for light elements like hydrogen, this releases energy; it is what powers the Sun and stars. FISSION does the reverse: it splits heavy, complex nuclei (like uranium) into lighter ones, which is how nuclear reactors and atomic bombs on Earth release energy. The Sun runs entirely on fusion.",
    chain: "Proton-proton chain", fission: "Fusion vs fission",
    step: "Step", proton: "proton", neutron: "neutron",
    noteC: "Step 1 of the proton-proton chain fuses two protons into deuterium, emitting a positron and a neutrino; later steps build helium-4. Net: 4 H → 1 He + energy.",
    noteF: "Fusion combines light nuclei into heavier ones (the Sun's power source); fission splits heavy nuclei into lighter ones (Earthly reactors and bombs).",
  },
  ja: {
    title: "陽子-陽子連鎖",
    kind: "水素がヘリウムになる仕組み",
    lede: "太陽を灯す反応を順に見て——鏡像である核分裂と比べよう。融合は積み上げ、分裂は分解します。",
    thread: "物語はつづく",
    threadText: "核の奥深くで、陽子は何十億回も衝突してから、ようやく一組がくっつきます。4個の水素を1個のヘリウムに変える3つのステップを追おう。",
    chainKey: "ステップ1は重水素・陽電子・ニュートリノを作る",
    chainText: "陽子-陽子連鎖には主に3つのステップがあります。ステップ1：2個の陽子が融合し、片方が瞬時に中性子に変わって重水素核（陽子1＋中性子1）を作り、陽電子（電子の正の反粒子）とニュートリノを放出します。ステップ2：重水素がもう1個の陽子を捕まえてヘリウム3になり、ガンマ線を放出します。ステップ3：2個のヘリウム3核が衝突してヘリウム4になり、2個の陽子をプラズマへ戻します。正味の結果：4個の水素核が1個のヘリウム4＋エネルギーになります。",
    fissionKey: "融合は積み上げ、分裂は分解",
    fissionText: "融合と分裂は正反対です。融合は軽い原子核を重い核に結合します——水素のような軽元素ではこれがエネルギーを放出し、太陽や恒星を動かします。分裂はその逆で、重く複雑な核（ウランなど）を軽い核に分けます。これが地球の原子炉や原子爆弾がエネルギーを放つ方法です。太陽は完全に融合で動いています。",
    chain: "陽子-陽子連鎖", fission: "融合 対 分裂",
    step: "ステップ", proton: "陽子", neutron: "中性子",
    noteC: "陽子-陽子連鎖のステップ1は2個の陽子を重水素に融合し、陽電子とニュートリノを放出。以降のステップでヘリウム4を作ります。正味：4個のH → 1個のHe＋エネルギー。",
    noteF: "融合は軽い核を重い核に結合（太陽の動力源）、分裂は重い核を軽い核に分けます（地球の原子炉や爆弾）。",
  },
};

function P(ctx, x, y, kind) { // proton red, neutron grey
  ctx.fillStyle = kind === "n" ? "#9aa0ac" : "#e0774f";
  ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#fff"; ctx.font = `8px ${mono}`; ctx.textAlign = "center"; ctx.fillText(kind === "n" ? "n" : "p", x, y + 3);
}

function drawChain(ctx, cw, H, step, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const y = H * 0.36;
  ctx.font = `10px ${mono}`; ctx.textAlign = "center";
  if (step === 0) {
    // two protons -> deuterium + positron + neutrino
    P(ctx, cw * 0.2, y, "p"); P(ctx, cw * 0.2, y + 22, "p");
    ctx.strokeStyle = C.muted; ctx.beginPath(); ctx.moveTo(cw * 0.28, y + 11); ctx.lineTo(cw * 0.44, y + 11); ctx.stroke();
    // deuterium
    P(ctx, cw * 0.52, y + 4, "p"); P(ctx, cw * 0.52, y + 18, "n");
    ctx.fillStyle = "#8fc0e8"; ctx.fillText(lang === "ja" ? "重水素" : "deuterium", cw * 0.52, y + 40);
    // positron + neutrino
    ctx.fillStyle = "#ffd86b"; ctx.beginPath(); ctx.arc(cw * 0.72, y - 6, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#ffd86b"; ctx.fillText("e⁺", cw * 0.72, y - 14);
    ctx.fillStyle = "#a9d0ff"; ctx.beginPath(); ctx.arc(cw * 0.82, y + 22, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#a9d0ff"; ctx.fillText("ν", cw * 0.82, y + 36);
    ctx.fillStyle = C.text; ctx.fillText(lang === "ja" ? "陽子＋陽子 → 重水素 ＋ 陽電子(e⁺) ＋ ニュートリノ(ν)" : "p + p → deuterium + positron (e⁺) + neutrino (ν)", cw / 2, H - 16);
  } else if (step === 1) {
    // deuterium + proton -> He-3 + gamma
    P(ctx, cw * 0.18, y + 4, "p"); P(ctx, cw * 0.18, y + 18, "n");
    P(ctx, cw * 0.3, y + 11, "p");
    ctx.strokeStyle = C.muted; ctx.beginPath(); ctx.moveTo(cw * 0.38, y + 11); ctx.lineTo(cw * 0.52, y + 11); ctx.stroke();
    P(ctx, cw * 0.6, y + 2, "p"); P(ctx, cw * 0.6, y + 16, "p"); P(ctx, cw * 0.66, y + 9, "n");
    ctx.fillStyle = "#8fc0e8"; ctx.fillText("He-3", cw * 0.63, y + 38);
    ctx.strokeStyle = "#ffd86b"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cw * 0.78, y); ctx.lineTo(cw * 0.9, y + 20); ctx.stroke();
    ctx.fillStyle = "#ffd86b"; ctx.fillText("γ", cw * 0.86, y - 4);
    ctx.fillStyle = C.text; ctx.fillText(lang === "ja" ? "重水素 ＋ 陽子 → ヘリウム3 ＋ ガンマ線(γ)" : "deuterium + proton → helium-3 + gamma ray (γ)", cw / 2, H - 16);
  } else {
    // two He-3 -> He-4 + 2 protons
    [cw * 0.16, cw * 0.30].forEach((cxg) => { P(ctx, cxg, y + 2, "p"); P(ctx, cxg, y + 16, "p"); P(ctx, cxg + 6, y + 9, "n"); });
    ctx.strokeStyle = C.muted; ctx.beginPath(); ctx.moveTo(cw * 0.42, y + 9); ctx.lineTo(cw * 0.56, y + 9); ctx.stroke();
    // He-4
    P(ctx, cw * 0.64, y + 2, "p"); P(ctx, cw * 0.64, y + 16, "p"); P(ctx, cw * 0.72, y + 2, "n"); P(ctx, cw * 0.72, y + 16, "n");
    ctx.fillStyle = "#8fc0e8"; ctx.fillText("He-4", cw * 0.68, y + 38);
    P(ctx, cw * 0.88, y, "p"); P(ctx, cw * 0.88, y + 18, "p");
    ctx.fillStyle = C.text; ctx.fillText(lang === "ja" ? "ヘリウム3 ×2 → ヘリウム4 ＋ 陽子 ×2" : "helium-3 + helium-3 → helium-4 + 2 protons", cw / 2, H - 16);
  }
}

function drawFission(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const midY = H * 0.44;
  // FUSION (left): two small -> one bigger + energy
  const fx = cw * 0.26;
  ctx.fillStyle = C.good; ctx.font = `700 12px ${mono}`; ctx.textAlign = "center"; ctx.fillText(lang === "ja" ? "融合" : "FUSION", fx, 26);
  P(ctx, fx - 20, midY, "p"); P(ctx, fx - 6, midY, "p");
  ctx.strokeStyle = C.muted; ctx.beginPath(); ctx.moveTo(fx + 6, midY); ctx.lineTo(fx + 20, midY); ctx.stroke();
  ctx.fillStyle = "#8fc0e8"; ctx.beginPath(); ctx.arc(fx + 40, midY, 13, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "#ffd86b"; ctx.lineWidth = 2; for (let a = 0; a < Math.PI * 2; a += Math.PI / 5) { ctx.beginPath(); ctx.moveTo(fx + 40 + Math.cos(a) * 15, midY + Math.sin(a) * 15); ctx.lineTo(fx + 40 + Math.cos(a) * 22, midY + Math.sin(a) * 22); ctx.stroke(); }
  ctx.fillStyle = C.muted; ctx.font = `9px ${mono}`; ctx.fillText(lang === "ja" ? "軽い核 → 重い核（太陽）" : "light → heavier (the Sun)", fx, midY + 50);
  // divider
  ctx.strokeStyle = "rgba(150,175,230,0.25)"; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(cw * 0.5, 20); ctx.lineTo(cw * 0.5, H - 20); ctx.stroke(); ctx.setLineDash([]);
  // FISSION (right): one big -> two smaller + energy
  const gx = cw * 0.74;
  ctx.fillStyle = "#e0774f"; ctx.font = `700 12px ${mono}`; ctx.fillText(lang === "ja" ? "分裂" : "FISSION", gx, 26);
  ctx.fillStyle = "#c88a5a"; ctx.beginPath(); ctx.arc(gx - 24, midY, 15, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#fff"; ctx.font = `9px ${mono}`; ctx.fillText("U", gx - 24, midY + 3);
  ctx.strokeStyle = C.muted; ctx.beginPath(); ctx.moveTo(gx - 6, midY); ctx.lineTo(gx + 8, midY); ctx.stroke();
  ctx.fillStyle = "#b0a48c"; ctx.beginPath(); ctx.arc(gx + 24, midY - 10, 9, 0, Math.PI * 2); ctx.arc(gx + 26, midY + 12, 8, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "#ffd86b"; ctx.lineWidth = 2; for (let a = 0; a < Math.PI * 2; a += Math.PI / 5) { ctx.beginPath(); ctx.moveTo(gx + 24 + Math.cos(a) * 18, midY + Math.sin(a) * 18); ctx.lineTo(gx + 24 + Math.cos(a) * 25, midY + Math.sin(a) * 25); ctx.stroke(); }
  ctx.fillStyle = C.muted; ctx.font = `9px ${mono}`; ctx.fillText(lang === "ja" ? "重い核 → 軽い核（原子炉）" : "heavy → lighter (reactors)", gx, midY + 50);
}

export function FusionChain() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("chain");
  const [step, setStep] = useState(0);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (mode === "chain") { drawChain(ctx, cw, H, step, lang); return; }
    if (reduceMotion) { drawFission(ctx, cw, H, 0, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; drawFission(ctx, cw, H, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, mode, step, lang]);

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
          <div style={{ ...styles.fateLabel, color: C.sun }}>{mode === "chain" ? t.chainKey : t.fissionKey}</div>
          <p style={styles.keyTermText}>{mode === "chain" ? t.chainText : t.fissionText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          {[["chain", t.chain], ["fission", t.fission]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        {mode === "chain" && (
          <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
            {[0, 1, 2].map((s) => (
              <button key={s} onClick={() => setStep(s)}
                style={{ ...styles.chip, ...(step === s ? styles.chipOn : {}), fontSize: 12 }}>{t.step} {s + 1}</button>
            ))}
          </div>
        )}

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{mode === "chain" ? t.noteC : t.noteF}</p>
      </div>
    </div>
  );
}

export default FusionChain;
