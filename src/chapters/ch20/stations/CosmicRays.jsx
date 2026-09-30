/* ============================================================
   STATION 7 — COSMIC RAYS
   Cosmic rays are high-speed atomic nuclei racing through the Galaxy.
   Victor Hess discovered them in 1911 by flying detectors up in balloons.
   They carry unusually high amounts of lithium, beryllium and boron —
   fragile elements that stars destroy. Their overabundance is direct
   evidence of SPALLATION: fast carbon, nitrogen and oxygen nuclei
   fragment into Li, Be and B when they slam into interstellar protons.
   Grounded in Ch.20 §20.4.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Cosmic rays",
    kind: "Nuclei at nearly light speed",
    lede: "Cosmic rays are atomic nuclei tearing through space. See how Victor Hess caught them with balloons — and how a collision makes the rare light elements.",
    thread: "THE STORY CONTINUES",
    threadText: "Streaming through the Galaxy are particles moving at almost the speed of light. Where they come from, and what they carry, is written in their strange chemistry.",
    hessKey: "HESS DISCOVERED THEM WITH BALLOONS (1911)",
    hessText: "Cosmic rays are extremely fast-moving atomic nuclei that constantly rain through the Galaxy. In 1911 the Austrian physicist Victor Hess carried radiation detectors high into the atmosphere aboard balloons and found that the radiation increased with altitude — proving it came from space, not the ground. This discovery of cosmic rays earned him the Nobel Prize.",
    spallKey: "SPALLATION MAKES LITHIUM, BERYLLIUM & BORON",
    spallText: "Cosmic rays contain far more lithium, beryllium and boron than the Sun or stars do. This is a key clue, because those fragile light elements are actually destroyed inside stars. Their overabundance is direct evidence of SPALLATION: when fast-moving carbon, nitrogen and oxygen nuclei in the cosmic rays collide with interstellar protons, they shatter into the lighter Li, Be and B fragments.",
    hess: "Hess's discovery", spall: "Spallation",
    alt: "radiation rises with altitude → from space", cno: "fast C, N, O nucleus", proton: "interstellar proton", libeb: "→ Li, Be, B",
    noteH: "Victor Hess found cosmic rays in 1911: balloon detectors showed radiation rising with altitude, proving it comes from space.",
    noteS: "Stars destroy Li, Be and B, so their excess in cosmic rays proves spallation — fast C/N/O nuclei fragmenting when they hit interstellar protons.",
  },
  ja: {
    title: "宇宙線",
    kind: "ほぼ光速の原子核",
    lede: "宇宙線は宇宙を切り裂く原子核です。ヴィクトル・ヘスがどう気球で捉えたか——そして衝突がどうまれな軽元素を作るかを見よう。",
    thread: "物語はつづく",
    threadText: "銀河を流れているのは、ほぼ光速で動く粒子です。それがどこから来て何を運ぶかは、その奇妙な化学に書かれています。",
    hessKey: "ヘスが気球で発見（1911年）",
    hessText: "宇宙線は、銀河を絶えず降り注ぐ極めて高速の原子核です。1911年、オーストリアの物理学者ヴィクトル・ヘスは放射線検出器を気球で大気高くへ運び、放射線が高度とともに増えることを発見しました——それが地上ではなく宇宙から来ることを証明したのです。この宇宙線の発見で彼はノーベル賞を受けました。",
    spallKey: "核破砕がリチウム・ベリリウム・ホウ素を作る",
    spallText: "宇宙線には、太陽や恒星よりもはるかに多くのリチウム・ベリリウム・ホウ素が含まれます。これは重要な手がかりです。というのも、これらのもろい軽元素は実は星の内部で壊されるからです。その過剰は核破砕の直接の証拠です：宇宙線中の高速の炭素・窒素・酸素の核が星間陽子と衝突すると、より軽いLi・Be・Bの破片に砕けるのです。",
    hess: "ヘスの発見", spall: "核破砕",
    alt: "放射線が高度とともに増える → 宇宙から", cno: "高速のC・N・O核", proton: "星間陽子", libeb: "→ Li・Be・B",
    noteH: "ヴィクトル・ヘスは1911年に宇宙線を発見：気球の検出器が高度とともに放射線が増えるのを示し、宇宙由来だと証明しました。",
    noteS: "星はLi・Be・Bを壊すので、宇宙線でのその過剰は核破砕を証明します——高速のC/N/O核が星間陽子に当たって砕けるのです。",
  },
};

function drawHess(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // ground at bottom, sky gradient upward
  const gy = H - 30;
  ctx.fillStyle = "#1a2418"; ctx.fillRect(0, gy, cw, H - gy);
  // altitude axis with balloon
  const bx = cw * 0.5, p = (tt * 0.006) % 1;
  const by = gy - p * (gy - 30);
  // cosmic ray streaks from top, denser higher up
  for (let i = 0; i < 16; i++) { const x = (i * 53) % cw; const len = 12; const yTop = ((tt * 3 + i * 40) % (gy)); ctx.strokeStyle = "rgba(255,120,120,0.5)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x, yTop); ctx.lineTo(x - 4, yTop + len); ctx.stroke(); }
  // balloon + detector
  ctx.fillStyle = "#d8c8a8"; ctx.beginPath(); ctx.ellipse(bx, by - 14, 12, 16, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "#8a8070"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(bx - 6, by - 2); ctx.lineTo(bx - 3, by + 6); ctx.moveTo(bx + 6, by - 2); ctx.lineTo(bx + 3, by + 6); ctx.stroke();
  ctx.fillStyle = "#c9c2b4"; ctx.fillRect(bx - 5, by + 6, 10, 8);
  // radiation meter grows with altitude
  const mx = cw - 60, mtop = 30, mbot = gy;
  ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.strokeRect(mx, mtop, 16, mbot - mtop);
  const level = p; ctx.fillStyle = "#ff8f6a"; ctx.fillRect(mx, mbot - level * (mbot - mtop), 16, level * (mbot - mtop));
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(lang === "ja" ? "放射線" : "radiation", mx + 8, mtop - 6);
  ctx.fillStyle = "#ff8f6a"; ctx.font = `10px ${mono}`; ctx.fillText(t.alt, cw / 2, H - 10);
}

function drawSpall(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cy = H * 0.42;
  const cyc = tt % 200, p = cyc / 200;
  // incoming fast C/N/O nucleus from left toward a proton at center
  const px = cw * 0.5, py = cy;
  ctx.fillStyle = "#e0774f"; ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#fff"; ctx.font = `8px ${mono}`; ctx.textAlign = "center"; ctx.fillText("p", px, py + 3);
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.fillText(t.proton, px, py + 20);
  if (p < 0.5) {
    const nx = cw * 0.14 + (p / 0.5) * (px - 20 - cw * 0.14);
    ctx.fillStyle = "#a0c090"; ctx.beginPath(); ctx.arc(nx, py, 11, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#0a0c14"; ctx.font = `8px ${mono}`; ctx.fillText("CNO", nx, py + 3);
    ctx.strokeStyle = "rgba(160,200,150,0.4)"; ctx.beginPath(); ctx.moveTo(nx - 16, py); ctx.lineTo(nx - 6, py); ctx.stroke();
    ctx.fillStyle = "#a0c090"; ctx.font = `9px ${mono}`; ctx.fillText(t.cno, cw * 0.2, py - 20);
  } else {
    // fragments fly out: Li, Be, B
    const fr = (p - 0.5) / 0.5;
    [["Li", -1.2], ["Be", -0.3], ["B", 0.8]].forEach(([el, ang], i) => {
      const x = px + Math.cos(ang) * fr * 90, y = py + Math.sin(ang) * fr * 60;
      ctx.fillStyle = "#8fc0e8"; ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#0a0c14"; ctx.font = `8px ${mono}`; ctx.fillText(el, x, y + 3);
    });
    ctx.fillStyle = "#8fc0e8"; ctx.font = `10px ${mono}`; ctx.fillText(t.libeb, cw * 0.78, py - 20);
  }
  ctx.fillStyle = C.sun; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(lang === "ja" ? "核破砕：CNO ＋ 陽子 → Li・Be・B" : "spallation: CNO + proton → Li, Be, B", cw / 2, H - 10);
}

export function CosmicRays() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("hess");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { (mode === "hess" ? drawHess : drawSpall)(ctx, cw, H, 100, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; (mode === "hess" ? drawHess : drawSpall)(ctx, cw, H, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, mode, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 07</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{t.threadText}</p>
        </div>
        <div style={styles.fateBox}>
          <div style={{ ...styles.fateLabel, color: C.sun }}>{mode === "hess" ? t.hessKey : t.spallKey}</div>
          <p style={styles.keyTermText}>{mode === "hess" ? t.hessText : t.spallText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          {[["hess", t.hess], ["spall", t.spall]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{mode === "hess" ? t.noteH : t.noteS}</p>
      </div>
    </div>
  );
}

export default CosmicRays;
