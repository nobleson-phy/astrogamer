/* ============================================================
   STATION 5 — SEEING & ADAPTIVE OPTICS
   Earth's turbulent atmosphere bends and twists starlight as it
   passes, blurring images and making stars TWINKLE. Astronomers
   call the steadiness of the air "seeing" — bad seeing means a
   blurred, jittering image. A star viewed from space, above the
   air, is rock-steady and sharp. ADAPTIVE OPTICS fights the blur
   from the ground: a flexible (deformable) mirror changes its shape
   hundreds of times a second to cancel the distortion in real time,
   snapping the image back to sharp.
   Grounded in Ch.6 §6.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Seeing & adaptive optics",
    kind: "Why stars twinkle — and how we sharpen them",
    lede: "Look up on a clear night and the stars seem to shiver. That shimmer is not the star — it is our own restless air. Toggle the atmosphere on and off, then switch on adaptive optics and watch the star snap back into focus.",
    thread: "THE STORY CONTINUES",
    threadText: "We have built a telescope, chosen a mirror, and picked where the focus comes out. But between the star and the mirror lies kilometres of churning atmosphere. Before the light ever reaches us, the air has already smeared it — and beating that blur is the next great problem.",
    key: "SEEING — THE STEADINESS OF THE AIR",
    keyText: "Turbulent air bends starlight this way and that as it passes, so the image blurs and jitters and the star appears to twinkle — astronomers call this \"seeing\", and bad seeing means a fuzzy, restless image. From space, above the atmosphere, a star is perfectly steady. Adaptive optics fights the blur from the ground: a flexible, deformable mirror re-shapes itself hundreds of times a second to cancel the distortion in real time and restore a sharp image.",
    atmo: "Atmosphere",
    ao: "Adaptive optics",
    spaceNote: "From space (above the atmosphere): always steady.",
    stateSpace: "IN SPACE — steady & sharp",
    stateBlur: "GROUND · air turbulence — twinkling & blurred",
    stateAO: "GROUND · adaptive optics ON — corrected & sharp",
    seeingL: "Seeing quality",
    seeingGood: "Steady — sharp point",
    seeingBad: "Poor — blurred & jittering",
    mirrorL: "Deformable mirror",
    mirrorIdle: "flat — not correcting",
    mirrorActive: "flexing hundreds of times a second",
    cap: {
      space: "Above the atmosphere there is no air to distort the light, so the star stays a steady, sharp point. This is why telescopes are sent into space — and why stars do not twinkle when seen from orbit.",
      blur: "The turbulent atmosphere bends the incoming light differently from moment to moment, so the image jumps about and smears out. The star twinkles. This unsteadiness is what astronomers mean by poor \"seeing\".",
      ao: "Adaptive optics measures the distortion and warps a flexible mirror hundreds of times a second to cancel it. The blur is undone in real time and the star snaps back to a sharp point — from the ground.",
    },
  },
  ja: {
    title: "シーイングと補償光学",
    kind: "星がまたたく理由——そして像を鋭くする方法",
    lede: "晴れた夜に見上げると、星は震えて見えます。そのゆらぎは星ではなく、私たち自身の落ち着かない大気です。大気を切り替え、補償光学を入れて、星がピントに戻る様子を見てみよう。",
    thread: "物語はつづく",
    threadText: "望遠鏡を組み、鏡を選び、焦点の出る位置も決めました。しかし星と鏡のあいだには、かき乱れる大気が何キロも横たわっています。光が私たちに届く前に、大気はすでにそれをにじませている——このぼやけに打ち勝つことが、次の大きな課題です。",
    key: "シーイング——大気の安定度",
    keyText: "乱れた大気は通過する星の光をあちこちに曲げるため、像はぼやけて揺れ、星はまたたいて見えます——天文学者はこれを「シーイング」と呼び、シーイングが悪いとは像がぼやけて落ち着かないことを意味します。大気の上、宇宙からなら星は完全に安定します。補償光学は地上でこのぼやけと戦います。柔らかく変形する鏡が毎秒数百回も形を変え、歪みをリアルタイムで打ち消して鋭い像を取り戻します。",
    atmo: "大気",
    ao: "補償光学",
    spaceNote: "宇宙から（大気の上）：つねに安定。",
    stateSpace: "宇宙 — 安定して鋭い",
    stateBlur: "地上 · 大気の乱れ — またたきとぼやけ",
    stateAO: "地上 · 補償光学オン — 補正されて鋭い",
    seeingL: "シーイングの質",
    seeingGood: "安定 — 鋭い点像",
    seeingBad: "不良 — ぼやけて揺れる",
    mirrorL: "変形鏡",
    mirrorIdle: "平ら — 補正なし",
    mirrorActive: "毎秒数百回たわむ",
    cap: {
      space: "大気の上には光を歪ませる空気がないので、星は安定した鋭い点のままです。だから望遠鏡は宇宙へ送られ、軌道上から見た星はまたたきません。",
      blur: "乱れた大気は入ってくる光を刻一刻と違うように曲げるため、像は跳ね回りにじみます。星はまたたきます。この不安定さこそ、天文学者の言う悪い「シーイング」です。",
      ao: "補償光学は歪みを測り、柔らかい鏡を毎秒数百回ゆがめて打ち消します。ぼやけはリアルタイムで取り除かれ、星は地上からでも鋭い点像に戻ります。",
    },
  },
};

/* deterministic wobble from a few incommensurate sines */
function wob(p, a, b, c) {
  return (Math.sin(p * a) + Math.sin(p * b + 1.7) + Math.sin(p * c + 3.1)) / 3;
}

function drawStar(ctx, w, h, atmo, ao, p, lang) {
  ctx.clearRect(0, 0, w, h);
  const t = STR[lang];
  const cx = w / 2, cy = h / 2;
  const corrected = !atmo || ao;

  // faint background field
  ctx.fillStyle = "rgba(160,190,255,0.5)";
  const bg = [[0.18, 0.24], [0.82, 0.2], [0.28, 0.78], [0.72, 0.7], [0.5, 0.16], [0.15, 0.6], [0.88, 0.52]];
  bg.forEach((s) => { ctx.beginPath(); ctx.arc(s[0] * w, s[1] * h, 1, 0, Math.PI * 2); ctx.fill(); });

  if (corrected) {
    // sharp, steady point with diffraction spikes
    const r = 10;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0, "#ffffff"); g.addColorStop(0.4, "rgba(255,255,255,0.8)"); g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.55)"; ctx.lineWidth = 1;
    const sp = 22;
    ctx.beginPath();
    ctx.moveTo(cx - sp, cy); ctx.lineTo(cx + sp, cy);
    ctx.moveTo(cx, cy - sp); ctx.lineTo(cx, cy + sp);
    ctx.stroke();
  } else {
    // blurred, jittering speckle blob (bad seeing)
    const jx = wob(p, 7.1, 3.3, 5.2) * 9;
    const jy = wob(p + 2, 6.3, 4.7, 2.9) * 9;
    const bright = 0.55 + 0.45 * Math.abs(Math.sin(p * 9.0));
    const sx = cx + jx, sy = cy + jy;
    // soft halo
    const hr = 30;
    const g = ctx.createRadialGradient(sx, sy, 2, sx, sy, hr);
    g.addColorStop(0, `rgba(255,255,255,${0.5 * bright})`); g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sx, sy, hr, 0, Math.PI * 2); ctx.fill();
    // scattered speckles
    for (let k = 0; k < 6; k++) {
      const a = p * (1.3 + k * 0.4) + k;
      const rr = 6 + 8 * Math.abs(Math.sin(p * 2 + k));
      const px = sx + rr * Math.cos(a), py = sy + rr * Math.sin(a * 1.1);
      ctx.fillStyle = `rgba(255,255,255,${0.25 + 0.3 * Math.abs(Math.sin(p * 5 + k))})`;
      ctx.beginPath(); ctx.arc(px, py, 2.4, 0, Math.PI * 2); ctx.fill();
    }
  }

  // state label
  const label = !atmo ? t.stateSpace : ao ? t.stateAO : t.stateBlur;
  const col = !atmo ? C.good : ao ? C.cool : C.danger;
  ctx.fillStyle = col; ctx.font = `12px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(label, 12, h - 12);
}

/* deformable mirror strip: flat when idle, flexing when active */
function drawMirror(ctx, w, h, active, p) {
  ctx.clearRect(0, 0, w, h);
  const midY = h * 0.42;
  const n = 9;
  const amp = active ? 5 : 0;
  const pts = [];
  for (let i = 0; i < n; i++) {
    const x = 10 + (i / (n - 1)) * (w - 20);
    const y = midY + amp * Math.sin(p * 6 + i * 1.3) * Math.cos(p * 3 + i);
    pts.push([x, y]);
  }
  // reflective surface
  ctx.strokeStyle = active ? C.cool : "rgba(150,175,230,0.55)";
  ctx.lineWidth = 2.6;
  ctx.beginPath();
  pts.forEach((pt, i) => { i === 0 ? ctx.moveTo(pt[0], pt[1]) : ctx.lineTo(pt[0], pt[1]); });
  ctx.stroke();
  // actuator pistons below each node
  ctx.strokeStyle = "rgba(150,175,230,0.4)"; ctx.lineWidth = 1.4;
  ctx.fillStyle = active ? C.cool : C.faint;
  pts.forEach((pt) => {
    ctx.beginPath(); ctx.moveTo(pt[0], pt[1] + 3); ctx.lineTo(pt[0], h - 8); ctx.stroke();
    ctx.beginPath(); ctx.arc(pt[0], h - 6, 2.2, 0, Math.PI * 2); ctx.fill();
  });
}

export function SeeingOptics() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const starRef = useRef(null);
  const mirRef = useRef(null);
  const [atmo, setAtmo] = useState(true);
  const [ao, setAo] = useState(false);
  const cw = Math.min(w, 760);
  const capKey = !atmo ? "space" : ao ? "ao" : "blur";

  useEffect(() => {
    const c = starRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { drawStar(ctx, cw, H, atmo, ao, 0.5, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 0.03; drawStar(ctx, cw, H, atmo, ao, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, atmo, ao, lang]);

  const mirActive = atmo && ao;
  useEffect(() => {
    const c = mirRef.current;
    if (!c) return;
    const mw = Math.min(cw, 220), mh = 90;
    const ctx = setupCanvas(c, mw, mh);
    if (reduceMotion) { drawMirror(ctx, mw, mh, mirActive, 0.5); return; }
    let raf, tt = 0;
    const loop = () => { tt += 0.03; drawMirror(ctx, mw, mh, mirActive, tt); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, mirActive]);

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

        <div style={{ ...styles.pickerRow, justifyContent: "flex-start" }}>
          <button onClick={() => setAtmo((v) => !v)}
            style={{ ...styles.chip, ...(atmo ? { ...styles.chipOn, borderColor: C.danger, background: "rgba(255,107,107,0.16)", color: "#fff" } : {}) }}>
            {t.atmo}{atmo ? " ●" : " ○"}
          </button>
          <button onClick={() => atmo && setAo((v) => !v)} disabled={!atmo}
            style={{ ...styles.chip, ...(ao && atmo ? { ...styles.chipOn, borderColor: C.cool, background: "rgba(63,221,255,0.16)", color: "#fff" } : {}), ...(!atmo ? { opacity: 0.4, cursor: "not-allowed" } : {}) }}>
            {t.ao}{ao && atmo ? " ●" : " ○"}
          </button>
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={starRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>
        <div style={{ fontFamily: mono, fontSize: 12, color: C.good, marginTop: 6, textAlign: "center" }}>{t.spaceNote}</div>

        {/* deformable mirror + seeing readout */}
        <div style={{ marginTop: 14, display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1.2, color: C.faint, marginBottom: 4 }}>{t.mirrorL}</div>
            <canvas ref={mirRef} style={{ display: "block", borderRadius: 12, background: "rgba(3,5,12,0.6)", border: `1px solid ${C.border}` }} />
            <div style={{ fontFamily: mono, fontSize: 11.5, color: mirActive ? C.cool : C.faint, marginTop: 4 }}>
              {mirActive ? t.mirrorActive : t.mirrorIdle}
            </div>
          </div>
          <div style={{ flex: "1 1 200px", minWidth: 180 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ fontFamily: mono, fontSize: 13, color: C.muted }}>{t.seeingL}</span>
              <span style={{ fontFamily: mono, fontSize: 14, color: capKey === "blur" ? C.danger : C.good }}>
                {capKey === "blur" ? t.seeingBad : t.seeingGood}
              </span>
            </div>
            <p style={{ ...styles.stageDesc, marginTop: 4, maxWidth: "none", fontSize: 15.5 }}>{t.cap[capKey]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeeingOptics;
