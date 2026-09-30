/* ============================================================
   STATION 1 — THE INTERSTELLAR MEDIUM
   The space between the stars is not empty: it holds the interstellar
   medium (ISM), about 99% gas (atoms and molecules) and 1% solid dust by
   mass. But it is an extraordinary vacuum — averaged over the Galaxy,
   only about 1 atom per cubic centimeter, far thinner than any vacuum we
   can make on Earth. Grounded in Ch.20 §20.1.
   ============================================================ */
import React, { useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The interstellar medium",
    kind: "Almost — but not quite — empty",
    lede: "Between the stars lies a thin haze of gas and dust. See how the two split, and just how empty 'empty space' really is.",
    thread: "THE STORY BEGINS",
    threadText: "The dark gaps between stars are not truly nothing. They hold a tenuous medium of gas and dust — the raw material of future stars, and the ashes of old ones.",
    key: "99% GAS, 1% DUST — AND ABOUT 1 ATOM PER CM³",
    keyText: "The interstellar medium (ISM) fills the space between the stars. By mass it is about 99% gas — mostly hydrogen and helium atoms and molecules — and only about 1% tiny solid dust grains. Yet it is astonishingly sparse: if all the interstellar gas in the Galaxy were spread out evenly, its average density would be only about 1 atom per cubic centimeter. That is a far better vacuum than any laboratory on Earth can produce, and yet, spread over vast distances, it adds up to enormous amounts of matter.",
    gas: "gas 99%", dust: "dust 1%", density: "average density ≈ 1 atom / cm³",
    note: "The interstellar medium is ~99% gas and ~1% dust by mass, at an average of only about 1 atom per cubic centimeter — thinner than any earthly vacuum.",
  },
  ja: {
    title: "星間物質",
    kind: "ほぼ——でも完全にではなく——空",
    lede: "星と星の間には、ガスと塵の薄いもやがあります。この2つがどう分かれるか、そして「空っぽの空間」が本当はどれほど空かを見よう。",
    thread: "物語のはじまり",
    threadText: "星の間の暗い隙間は、本当に何もないわけではありません。希薄なガスと塵の物質——未来の星の原料であり、古い星の灰——を抱えています。",
    key: "99%がガス、1%が塵——そして約1原子/cm³",
    keyText: "星間物質（ISM）は星と星の間の空間を満たします。質量ではおよそ99%がガス——大半は水素とヘリウムの原子と分子——で、微小な固体の塵はわずか約1%です。しかもそれは驚くほど希薄です：銀河の星間ガスをすべて均等にならすと、平均密度はわずか約1原子/cm³になります。これは地球上のどんな実験室が作れるよりもはるかに優れた真空ですが、広大な距離にわたって足し合わせると膨大な量の物質になります。",
    gas: "ガス 99%", dust: "塵 1%", density: "平均密度 ≈ 1原子/cm³",
    note: "星間物質は質量で約99%がガス、約1%が塵で、平均でわずか約1原子/cm³——地上のどんな真空より希薄です。",
  },
};

function draw(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // gas/dust pie (left)
  const cx = cw * 0.24, cy = H * 0.42, R = 46;
  ctx.fillStyle = "#5aa0d8"; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, 0, Math.PI * 2 * 0.99); ctx.closePath(); ctx.fill();
  ctx.fillStyle = "#e0774f"; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, -Math.PI * 2 * 0.01, 0); ctx.closePath(); ctx.fill();
  ctx.fillStyle = "#8fc0e8"; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.gas, cx, cy + R + 16);
  ctx.fillStyle = "#e0774f"; ctx.fillText(t.dust, cx, cy - R - 8);
  // sparse-atom field (right) to show emptiness
  const fx0 = cw * 0.45, fx1 = cw - 20, fy0 = 24, fy1 = H - 40;
  ctx.strokeStyle = "rgba(150,175,230,0.2)"; ctx.strokeRect(fx0, fy0, fx1 - fx0, fy1 - fy0);
  for (let i = 0; i < 10; i++) {
    const x = fx0 + ((i * 71) % 100) / 100 * (fx1 - fx0);
    const y = fy0 + ((i * 47) % 100) / 100 * (fy1 - fy0) + Math.sin(tt * 0.02 + i) * 2;
    ctx.fillStyle = i % 6 === 0 ? "#e0774f" : "#8fc0e8"; ctx.beginPath(); ctx.arc(x, y, 1.6, 0, Math.PI * 2); ctx.fill();
  }
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(lang === "ja" ? "ほぼ空（1原子/cm³）" : "nearly empty (1 atom/cm³)", (fx0 + fx1) / 2, fy0 - 6);
  ctx.fillStyle = C.cool; ctx.font = `11px ${mono}`; ctx.fillText(t.density, cw / 2, H - 12);
}

export function InterstellarMedium() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 230;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, 30, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 01</div>
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

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default InterstellarMedium;
