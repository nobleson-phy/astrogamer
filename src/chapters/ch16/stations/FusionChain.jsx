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
  ctx.beginPath(); ctx.arc(x, y, 15, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.35)"; ctx.beginPath(); ctx.arc(x - 4, y - 4, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#fff"; ctx.font = `700 13px ${mono}`; ctx.textAlign = "center"; ctx.fillText(kind === "n" ? "n" : "p", x, y + 5);
}
function arrow(ctx, x0, x1, y) {
  ctx.strokeStyle = C.muted; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
  ctx.fillStyle = C.muted; ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x1 - 7, y - 5); ctx.lineTo(x1 - 7, y + 5); ctx.closePath(); ctx.fill();
}

function drawChain(ctx, cw, H, step, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const y = H * 0.4, dy = 17;
  ctx.font = `12px ${mono}`; ctx.textAlign = "center";
  if (step === 0) {
    // two protons -> deuterium + positron + neutrino
    P(ctx, cw * 0.15, y - dy, "p"); P(ctx, cw * 0.15, y + dy, "p");
    arrow(ctx, cw * 0.24, cw * 0.42, y);
    // deuterium (bound p + n)
    P(ctx, cw * 0.52, y - dy, "p"); P(ctx, cw * 0.52, y + dy, "n");
    ctx.fillStyle = "#8fc0e8"; ctx.font = `12px ${mono}`; ctx.fillText(lang === "ja" ? "重水素" : "deuterium", cw * 0.52, y + dy + 34);
    // positron + neutrino
    ctx.fillStyle = "#ffd86b"; ctx.beginPath(); ctx.arc(cw * 0.74, y - 24, 9, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#0a0c14"; ctx.font = `700 11px ${mono}`; ctx.fillText("e⁺", cw * 0.74, y - 20);
    ctx.fillStyle = "#a9d0ff"; ctx.beginPath(); ctx.arc(cw * 0.86, y + 24, 8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#0a0c14"; ctx.fillText("ν", cw * 0.86, y + 28);
    ctx.fillStyle = C.text; ctx.font = `11px ${mono}`; ctx.fillText(lang === "ja" ? "陽子＋陽子 → 重水素 ＋ 陽電子(e⁺) ＋ ニュートリノ(ν)" : "p + p → deuterium + positron (e⁺) + neutrino (ν)", cw / 2, H - 14);
  } else if (step === 1) {
    // deuterium + proton -> He-3 + gamma
    P(ctx, cw * 0.14, y - dy, "p"); P(ctx, cw * 0.14, y + dy, "n");
    P(ctx, cw * 0.28, y, "p");
    arrow(ctx, cw * 0.37, cw * 0.53, y);
    // He-3 (2p + 1n) as a small cluster
    P(ctx, cw * 0.62, y - dy, "p"); P(ctx, cw * 0.62, y + dy, "p"); P(ctx, cw * 0.70, y, "n");
    ctx.fillStyle = "#8fc0e8"; ctx.font = `12px ${mono}`; ctx.fillText("He-3", cw * 0.66, y + dy + 34);
    ctx.strokeStyle = "#ffd86b"; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(cw * 0.82, y - 24); ctx.lineTo(cw * 0.92, y - 4); ctx.stroke();
    ctx.fillStyle = "#ffd86b"; ctx.font = `700 13px ${mono}`; ctx.fillText("γ", cw * 0.9, y - 28);
    ctx.fillStyle = C.text; ctx.font = `11px ${mono}`; ctx.fillText(lang === "ja" ? "重水素 ＋ 陽子 → ヘリウム3 ＋ ガンマ線(γ)" : "deuterium + proton → helium-3 + gamma ray (γ)", cw / 2, H - 14);
  } else {
    // two He-3 -> He-4 + 2 protons
    [cw * 0.13, cw * 0.30].forEach((cxg) => { P(ctx, cxg, y - dy, "p"); P(ctx, cxg, y + dy, "p"); P(ctx, cxg + 9, y, "n"); });
    arrow(ctx, cw * 0.44, cw * 0.58, y);
    // He-4 (2p + 2n)
    P(ctx, cw * 0.66, y - dy, "p"); P(ctx, cw * 0.66, y + dy, "p"); P(ctx, cw * 0.75, y - dy, "n"); P(ctx, cw * 0.75, y + dy, "n");
    ctx.fillStyle = "#8fc0e8"; ctx.font = `12px ${mono}`; ctx.fillText("He-4", cw * 0.705, y + dy + 34);
    P(ctx, cw * 0.90, y - dy, "p"); P(ctx, cw * 0.90, y + dy, "p");
    ctx.fillStyle = C.text; ctx.font = `11px ${mono}`; ctx.fillText(lang === "ja" ? "ヘリウム3 ×2 → ヘリウム4 ＋ 陽子 ×2" : "helium-3 + helium-3 → helium-4 + 2 protons", cw / 2, H - 14);
  }
}

function drawFission(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const midY = H * 0.46;
  // FUSION (left): two small -> one bigger + energy
  const fx = cw * 0.26;
  ctx.fillStyle = C.good; ctx.font = `700 13px ${mono}`; ctx.textAlign = "center"; ctx.fillText(lang === "ja" ? "融合" : "FUSION", fx, 28);
  P(ctx, fx - 30, midY, "p"); P(ctx, fx - 2, midY, "p");
  arrow(ctx, fx + 14, fx + 34, midY);
  ctx.fillStyle = "#8fc0e8"; ctx.beginPath(); ctx.arc(fx + 58, midY, 18, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#fff"; ctx.font = `700 11px ${mono}`; ctx.fillText("He", fx + 58, midY + 4);
  ctx.strokeStyle = "#ffd86b"; ctx.lineWidth = 2; for (let a = 0; a < Math.PI * 2; a += Math.PI / 5) { ctx.beginPath(); ctx.moveTo(fx + 58 + Math.cos(a) * 21, midY + Math.sin(a) * 21); ctx.lineTo(fx + 58 + Math.cos(a) * 29, midY + Math.sin(a) * 29); ctx.stroke(); }
  ctx.fillStyle = C.muted; ctx.font = `10px ${mono}`; ctx.fillText(lang === "ja" ? "軽い核 → 重い核（太陽）" : "light → heavier (the Sun)", fx, midY + 58);
  // divider
  ctx.strokeStyle = "rgba(150,175,230,0.25)"; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(cw * 0.5, 20); ctx.lineTo(cw * 0.5, H - 20); ctx.stroke(); ctx.setLineDash([]);
  // FISSION (right): one big -> two smaller + energy
  const gx = cw * 0.74;
  ctx.fillStyle = "#e0774f"; ctx.font = `700 13px ${mono}`; ctx.fillText(lang === "ja" ? "分裂" : "FISSION", gx, 28);
  ctx.fillStyle = "#c88a5a"; ctx.beginPath(); ctx.arc(gx - 32, midY, 20, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#fff"; ctx.font = `700 11px ${mono}`; ctx.fillText("U", gx - 32, midY + 4);
  arrow(ctx, gx - 8, gx + 10, midY);
  ctx.fillStyle = "#b0a48c"; ctx.beginPath(); ctx.arc(gx + 30, midY - 13, 12, 0, Math.PI * 2); ctx.arc(gx + 34, midY + 15, 11, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "#ffd86b"; ctx.lineWidth = 2; for (let a = 0; a < Math.PI * 2; a += Math.PI / 5) { ctx.beginPath(); ctx.moveTo(gx + 30 + Math.cos(a) * 24, midY + Math.sin(a) * 24); ctx.lineTo(gx + 30 + Math.cos(a) * 32, midY + Math.sin(a) * 32); ctx.stroke(); }
  ctx.fillStyle = C.muted; ctx.font = `10px ${mono}`; ctx.fillText(lang === "ja" ? "重い核 → 軽い核（原子炉）" : "heavy → lighter (reactors)", gx, midY + 58);
}

export function FusionChain() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 280;
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
