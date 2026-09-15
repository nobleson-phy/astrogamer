/* ============================================================
   STATION 3 — THE SUN'S FUEL BUDGET
   To sustain its luminosity the Sun fuses about 600 million tons of
   hydrogen into helium every second. Of that, about 596 million tons
   becomes helium and about 4 million tons of mass is converted directly
   into energy each second. The Sun is so massive it can keep this up for
   billions of years. Grounded in Ch.16 §16.1.
   ============================================================ */
import React, { useRef, useEffect, useState } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The Sun's fuel budget",
    kind: "Six hundred million tons a second",
    lede: "Watch the Sun's per-second ledger tick over. Almost all the fused hydrogen becomes helium — but a few million tons simply vanishes into energy.",
    thread: "THE STORY CONTINUES",
    threadText: "The numbers are almost absurd. Every second the Sun processes more matter than a mountain — and it has done so, second after second, for billions of years.",
    key: "600 MILLION TONS FUSED, 4 MILLION TONS DESTROYED — EACH SECOND",
    keyText: "To maintain its enormous energy output, the Sun fuses about 600 million tons of hydrogen into helium every single second. The helium that results weighs about 596 million tons — because roughly 4 million tons of mass is not converted to helium at all, but destroyed and turned directly into energy each second (via E = mc²). That sounds ruinous, yet the Sun is so massive that it can sustain this rate for more than ten billion years.",
    inLabel: "hydrogen fused", heLabel: "helium made", eLabel: "mass → energy",
    perSec: "per second", elapsed: "While you've watched",
    note: "Every second the Sun fuses ~600 million tons of hydrogen into ~596 million tons of helium, converting ~4 million tons of mass directly into energy. It's massive enough to do this for billions of years.",
  },
  ja: {
    title: "太陽の燃料収支",
    kind: "毎秒6億トン",
    lede: "太陽の毎秒の帳簿が刻まれる様子を見よう。融合した水素のほとんどはヘリウムになりますが——数百万トンはただエネルギーへ消えます。",
    thread: "物語はつづく",
    threadText: "その数字はほとんど不条理です。毎秒、太陽は山より多くの物質を処理し——そしてそれを、何十億年もの間、1秒また1秒と続けてきました。",
    key: "毎秒、6億トンを融合し、400万トンを消す",
    keyText: "その膨大なエネルギー出力を保つため、太陽は毎秒およそ6億トンの水素をヘリウムに融合します。生じるヘリウムはおよそ5億9,600万トンです——というのも、毎秒およそ400万トンの質量はヘリウムにならず、（E = mc² によって）消えて直接エネルギーに変わるからです。破滅的に聞こえますが、太陽は非常に大きいので、この割合を100億年以上保てます。",
    inLabel: "融合した水素", heLabel: "できたヘリウム", eLabel: "質量→エネルギー",
    perSec: "毎秒", elapsed: "見ている間に",
    note: "毎秒、太陽は約6億トンの水素を約5億9,600万トンのヘリウムに融合し、約400万トンの質量を直接エネルギーに変えます。これを数十億年続けられるほど大きいのです。",
  },
};

function draw(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const midY = H * 0.42;
  // hydrogen source (left)
  const hx = cw * 0.16;
  ctx.fillStyle = "rgba(224,119,79,0.9)"; ctx.beginPath(); ctx.arc(hx, midY, 30, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#fff"; ctx.font = `700 12px ${mono}`; ctx.textAlign = "center"; ctx.fillText("H", hx, midY + 4);
  ctx.fillStyle = C.text; ctx.font = `10px ${mono}`; ctx.fillText("600 Mt", hx, midY - 40);
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.fillText(t.inLabel, hx, midY + 48);
  // flowing particles toward the core
  const coreX = cw * 0.5;
  ctx.fillStyle = "rgba(255,200,140,0.8)";
  for (let i = 0; i < 8; i++) { const p = ((tt * 0.02 + i / 8) % 1); const x = hx + 30 + p * (coreX - 42 - hx); ctx.beginPath(); ctx.arc(x, midY + Math.sin(i) * 6, 2, 0, Math.PI * 2); ctx.fill(); }
  // fusion core (center)
  const cg = ctx.createRadialGradient(coreX, midY, 4, coreX, midY, 26);
  cg.addColorStop(0, "#fff2c0"); cg.addColorStop(1, "rgba(255,180,60,0.2)");
  ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(coreX, midY, 26, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.sun; ctx.font = `9px ${mono}`; ctx.fillText(lang === "ja" ? "核融合" : "fusion", coreX, midY + 42);
  // helium out (upper right)
  const heX = cw * 0.82, heY = midY - 24;
  ctx.fillStyle = "rgba(143,192,232,0.9)"; ctx.beginPath(); ctx.arc(heX, heY, 24, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#fff"; ctx.font = `700 11px ${mono}`; ctx.fillText("He", heX, heY + 3);
  ctx.fillStyle = "#8fc0e8"; ctx.font = `9px ${mono}`; ctx.fillText("596 Mt", heX, heY - 30);
  ctx.strokeStyle = "rgba(143,192,232,0.5)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(coreX + 24, midY - 6); ctx.lineTo(heX - 22, heY + 10); ctx.stroke();
  // energy out (lower right)
  const enX = cw * 0.82, enY = midY + 30;
  ctx.strokeStyle = "#ffd86b"; ctx.lineWidth = 2;
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) { ctx.beginPath(); ctx.moveTo(enX + Math.cos(a) * 8, enY + Math.sin(a) * 8); ctx.lineTo(enX + Math.cos(a) * 16, enY + Math.sin(a) * 16); ctx.stroke(); }
  ctx.fillStyle = C.sun; ctx.font = `9px ${mono}`; ctx.fillText("4 Mt → E", enX, enY + 32);
  ctx.strokeStyle = "rgba(255,207,107,0.5)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(coreX + 20, midY + 12); ctx.lineTo(enX - 16, enY - 8); ctx.stroke();
}

export function FuelBudget() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 230;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [secs, setSecs] = useState(0);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    const start = Date.now();
    if (reduceMotion) { draw(ctx, cw, H, 30, lang); return; }
    let raf;
    const loop = () => { const tt = (Date.now() - start) / 16; setSecs((Date.now() - start) / 1000); draw(ctx, cw, H, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

  const totH = (secs * 600).toFixed(0);
  const totE = (secs * 4).toFixed(0);

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

        <div style={{ fontFamily: mono, fontSize: 12, color: C.cool, marginTop: 8 }}>
          {t.elapsed} ({secs.toFixed(0)} s): <span style={{ color: "#e0774f" }}>{totH} Mt</span> {t.inLabel} · <span style={{ color: C.sun }}>{totE} Mt</span> {t.eLabel}
        </div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default FuelBudget;
