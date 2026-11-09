/* ============================================================
   STATION 2 — FINDING OUR PLACE
   HERSCHEL (1785): star counts limited by dust to ~6,000 ly, so the Sun looks
   central. SHAPLEY (1917): globular clusters traced by RR Lyrae form a sphere
   centered toward Sagittarius, revealing the Sun is ~26,000 ly off-center.
   DUST FOOLED HERSCHEL; GLOBULARS REVEALED OUR OFF-CENTER HOME. Grounded in Ch.25.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Finding our place",
    kind: "How we learned we are not at the center",
    lede: "Compare two pictures of the Galaxy. Herschel counted stars and, blind beyond the dust, put the Sun at the middle. Shapley mapped globular clusters — which float above the dust — and found their center lies far off toward Sagittarius.",
    thread: "WHERE ARE WE? — DUST VS GLOBULARS",
    threadText: "Knowing the Galaxy's shape is not the same as knowing where we sit inside it. Two astronomers, a century ago, gave opposite answers — and the dust decided who was right.",
    key: "DUST FOOLED HERSCHEL; GLOBULARS REVEALED OUR OFF-CENTER HOME",
    keyText: "In 1785 William HERSCHEL counted stars in every direction and found roughly equal numbers all around, so he placed the Sun near the center of a modest star system. He could not know that interstellar DUST limited his view to only about 6,000 light-years in any direction — he was seeing the inside of a small bubble, not the whole Galaxy. In 1917 Harlow SHAPLEY mapped about 100 GLOBULAR CLUSTERS, gauging their distances with RR LYRAE variable stars as standard candles. Because the clusters sit in the halo, above most of the dust, he could see them across the whole Galaxy. Their center lies far away toward the constellation SAGITTARIUS, about 26,000 light-years off — and that, not the Sun, marks the true center of the Milky Way.",
    herschel: "Herschel 1785 (star counts)",
    shapley: "Shapley 1917 (globular clusters)",
    sunLabel: "Sun",
    dustLimit: "dust limit ~6,000 ly",
    herschelCap: "Dust hides the rest — the Sun looks central",
    centerLabel: "true center (toward Sagittarius)",
    offset: "Sun ~26,000 ly off-center",
    shapleyCap: "Globulars float above the dust — their center is far away",
    note: "Herschel's star counts were blinded by dust at ~6,000 ly, falsely centering the Sun. Shapley's globular clusters, gauged by RR Lyrae and seen above the dust, revealed the true center ~26,000 ly away toward Sagittarius.",
  },
  ja: {
    title: "私たちの位置を見つける",
    kind: "私たちが中心にいないと分かるまで",
    lede: "銀河の2つの描像を比べよう。ハーシェルは星を数え、塵の先が見えないまま太陽を真ん中に置きました。シャプレーは——塵の上に浮かぶ——球状星団を地図化し、その中心がいて座の方向はるか彼方にあることを突き止めました。",
    thread: "私たちはどこに？——塵対球状星団",
    threadText: "銀河の形を知ることは、その中で自分がどこに座っているかを知ることとは別です。1世紀前、2人の天文学者が正反対の答えを出しました——そして、どちらが正しいかを塵が決めたのです。",
    key: "塵がハーシェルをだまし、球状星団が中心外の故郷を明かした",
    keyText: "1785年、ウィリアム・ハーシェルはあらゆる方向の星を数え、どちらを向いてもほぼ同じ数を見つけたため、太陽をささやかな星の系の中心近くに置きました。彼は、星間塵のせいで視界がどの方向にもわずか約6,000光年に限られていることを知りようがありませんでした——彼が見ていたのは小さな泡の内側であって、銀河全体ではなかったのです。1917年、ハーロー・シャプレーは約100個の球状星団を地図化し、RRライラ型変光星を標準光源としてその距離を測りました。星団はハローにあって塵の大部分より上にあるため、彼は銀河全体にわたって星団を見ることができました。その中心は、いて座の方向はるか彼方、約2万6千光年離れたところにあります——そして太陽ではなくそこが、天の川の本当の中心を示しているのです。",
    herschel: "ハーシェル1785（星の計数）",
    shapley: "シャプレー1917（球状星団）",
    sunLabel: "太陽",
    dustLimit: "塵の限界 約6,000光年",
    herschelCap: "塵が残りを隠す——太陽が中心に見える",
    centerLabel: "本当の中心（いて座の方向）",
    offset: "太陽は中心から約2万6千光年外側",
    shapleyCap: "球状星団は塵の上に浮かぶ——その中心ははるか彼方",
    note: "ハーシェルの星の計数は約6,000光年の塵で目をふさがれ、誤って太陽を中心に置きました。RRライラ型で距離を測り塵の上に見える球状星団が、いて座の方向約2万6千光年先の本当の中心を明かしました。",
  },
};

function draw(ctx, cw, H, view, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.5, cy = H * 0.5;

  // faint field of background stars (same in both)
  ctx.fillStyle = "rgba(150,180,240,0.35)";
  for (let i = 0; i < 70; i++) ctx.fillRect((i * 97) % cw, (i * 61) % H, 1.3, 1.3);

  if (view === "herschel") {
    // Sun apparently centered, surrounded by a dust-limited bubble
    const bubbleR = Math.min(cw * 0.30, H * 0.36);
    // dust haze outside the bubble
    const hz = ctx.createRadialGradient(cx, cy, bubbleR, cx, cy, bubbleR * 1.9);
    hz.addColorStop(0, "rgba(120,90,60,0)"); hz.addColorStop(1, "rgba(90,66,44,0.55)");
    ctx.fillStyle = hz; ctx.beginPath(); ctx.arc(cx, cy, bubbleR * 1.9, 0, Math.PI * 2); ctx.fill();
    // visible bubble of stars
    ctx.fillStyle = "rgba(190,210,255,0.8)";
    for (let i = 0; i < 90; i++) {
      const a = i * 2.3994, r = bubbleR * Math.sqrt(((i * 29) % 100) / 100);
      ctx.beginPath(); ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 1.6, 0, Math.PI * 2); ctx.fill();
    }
    // dashed bubble edge
    ctx.strokeStyle = "rgba(200,150,100,0.7)"; ctx.lineWidth = 1.4; ctx.setLineDash([5, 5]);
    ctx.beginPath(); ctx.arc(cx, cy, bubbleR, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
    // the Sun at the apparent center
    const sg = ctx.createRadialGradient(cx, cy, 1, cx, cy, 8);
    sg.addColorStop(0, "#fff3b0"); sg.addColorStop(1, C.sun);
    ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.sun; ctx.font = `11px ${mono}`; ctx.textAlign = "left";
    ctx.fillText(t.sunLabel, cx + 10, cy + 4);
    // labels
    ctx.fillStyle = "rgba(220,170,120,0.95)"; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(t.dustLimit, cx, cy - bubbleR - 8 < 16 ? cy + bubbleR + 16 : cy - bubbleR - 8);
    ctx.fillStyle = C.faint; ctx.fillText(t.herschelCap, cx, H - 12);
  } else {
    // Shapley: globular clusters forming a sphere centered off to one side
    const gcx = cw * 0.34, gcy = cy;      // true center, toward Sagittarius (to the left)
    const sphR = Math.min(cw * 0.26, H * 0.40);
    // sphere outline
    ctx.strokeStyle = "rgba(201,170,255,0.3)"; ctx.lineWidth = 1; ctx.setLineDash([4, 5]);
    ctx.beginPath(); ctx.arc(gcx, gcy, sphR, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
    // globular clusters (pulsing a touch — RR Lyrae standard candles)
    const pulse = 0.5 + 0.5 * Math.sin(tt * 0.06);
    for (let i = 0; i < 44; i++) {
      const a = i * 2.3994, r = sphR * (0.25 + 0.72 * ((i * 41) % 100) / 100);
      const gx = gcx + Math.cos(a) * r, gy = gcy + Math.sin(a) * r;
      ctx.fillStyle = `rgba(201,170,255,${0.45 + 0.3 * pulse})`;
      ctx.beginPath(); ctx.arc(gx, gy, 2.4, 0, Math.PI * 2); ctx.fill();
    }
    // true center marker
    ctx.fillStyle = "#c9aaff"; ctx.beginPath(); ctx.arc(gcx, gcy, 4, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#c9aaff"; ctx.lineWidth = 1; ctx.setLineDash([2, 3]);
    ctx.beginPath(); ctx.arc(gcx, gcy, 9, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
    // the Sun, off to the right
    const sx = cw * 0.76, sy = cy;
    const sg = ctx.createRadialGradient(sx, sy, 1, sx, sy, 8);
    sg.addColorStop(0, "#fff3b0"); sg.addColorStop(1, C.sun);
    ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(sx, sy, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.sun; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(t.sunLabel, sx, sy - 12);
    // offset line between Sun and true center
    ctx.strokeStyle = "rgba(255,210,61,0.7)"; ctx.lineWidth = 1.4; ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(gcx, gcy); ctx.lineTo(sx, sy); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = C.sun; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(t.offset, (gcx + sx) / 2, sy - 12);
    // labels
    ctx.fillStyle = "#c9aaff"; ctx.textAlign = "center";
    ctx.fillText(t.centerLabel, gcx, gcy + sphR + 16 > H - 6 ? gcy - sphR - 10 : gcy + sphR + 16);
    ctx.fillStyle = C.faint; ctx.fillText(t.shapleyCap, cw / 2, H - 12);
  }
}

export function FindingOurPlace() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 300;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [view, setView] = useState("herschel");
  const viewRef = useRef("herschel"); viewRef.current = view;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, view, 30, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, viewRef.current, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, view, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 02</div>
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
          <button onClick={() => setView("herschel")} style={{ ...styles.chip, ...(view === "herschel" ? styles.chipOn : {}) }}>{t.herschel}</button>
          <button onClick={() => setView("shapley")} style={{ ...styles.chip, ...(view === "shapley" ? styles.chipOn : {}) }}>{t.shapley}</button>
        </div>

        <div style={{ marginTop: 10 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default FindingOurPlace;
