/* ============================================================
   STATION 8 — OTHER WORLDS
   The first planet around a Sun-like star was announced in 1995. Since
   then thousands of exoplanets have been found, many in configurations
   unlike our own — including "hot Jupiters," giant planets orbiting
   extremely close to their stars. Since gas giants must form far out in
   the cold, hot Jupiters must have MIGRATED inward after forming. In
   protoplanetary disks, dark GAPS mark where newly formed protoplanets
   have swept their orbits clear. These discoveries exposed the
   selection-effect bias in old, one-example theories. Grounded in
   Ch.14 §14.4.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Other worlds",
    kind: "Disks, hot Jupiters, and bias",
    lede: "Switch between a planet being born and a finished system. Watch a protoplanet carve a gap in its disk — then meet a giant that ended up roasting beside its star.",
    thread: "THE STORY ENDS HERE",
    threadText: "For a long time we had exactly one planetary system to study — our own. Since 1995, thousands more have overturned what we thought was normal, and taught us how planets really form and move.",
    diskKey: "GAPS IN DISKS — PLANETS BEING BORN",
    diskText: "Young stars are wrapped in protoplanetary disks of gas and dust. The dark GAPS we see in these disks are not empty voids — they mark where newly formed, still-invisible protoplanets have gravitationally swept up the gas and dust along their orbits. We are watching planet formation in progress.",
    hjKey: "HOT JUPITERS — GIANTS THAT MIGRATED IN",
    hjText: "The first planet around a Sun-like star was announced in 1995. A few percent of systems host 'hot Jupiters' — giant planets orbiting extremely close to their stars. But gas giants can only form far out where it is cold enough for ices, so a hot Jupiter must have MIGRATED inward after forming. Finding such systems showed that our old theories were biased by having only one example (our solar system); real planetary systems are far more varied.",
    disk: "Protoplanetary disk", system: "Hot Jupiter system",
    gap: "gap = a forming protoplanet clearing its orbit",
    formed: "forms far out (cold, icy)", migrate: "migrates inward", hot: "hot Jupiter (close, roasting)", star1995: "first exoplanet around a Sun-like star: 1995",
    noteD: "Dark gaps in a young star's disk mark forming protoplanets sweeping their orbits clear — planet formation caught in the act.",
    noteH: "Hot Jupiters orbit right beside their stars, so they must have formed far out and migrated in. Since 1995, thousands of exoplanets have shown our one-example models were biased.",
  },
  ja: {
    title: "ほかの世界",
    kind: "円盤・ホットジュピター・偏り",
    lede: "生まれつつある惑星と、完成した系を切り替えよう。原始惑星が円盤に隙間を刻む様子を見て——恒星のそばで焼かれる巨大惑星に出会おう。",
    thread: "物語はここで終わる",
    threadText: "長い間、私たちが研究できる惑星系はちょうど一つ——私たち自身——でした。1995年以降、数千もの系が「普通」だと思っていたものを覆し、惑星が実際にどう形成され動くかを教えてくれました。",
    diskKey: "円盤の隙間——生まれつつある惑星",
    diskText: "若い恒星は、ガスと塵の原始惑星系円盤に包まれています。これらの円盤に見える暗い隙間は空の空洞ではありません——新しくできた、まだ見えない原始惑星が、その軌道に沿ってガスと塵を重力で一掃した場所を示します。私たちは惑星形成が進む様子を見ているのです。",
    hjKey: "ホットジュピター——移動してきた巨人",
    hjText: "太陽に似た恒星をめぐる最初の惑星は1995年に発表されました。数パーセントの系は「ホットジュピター」——恒星のごく近くを回る巨大惑星——を持ちます。しかし巨大ガス惑星は、氷ができるほど冷たい遠方でしか形成できないので、ホットジュピターは形成後に内側へ移動したに違いありません。そうした系の発見は、私たちの古い理論が唯一の例（太陽系）に偏っていたことを示しました。実際の惑星系ははるかに多様です。",
    disk: "原始惑星系円盤", system: "ホットジュピターの系",
    gap: "隙間＝軌道を掃除する原始惑星",
    formed: "遠方で形成（冷たく氷）", migrate: "内側へ移動", hot: "ホットジュピター（近く・灼熱）", star1995: "太陽型星をめぐる最初の系外惑星：1995年",
    noteD: "若い恒星の円盤の暗い隙間は、軌道を掃除する原始惑星を示します——惑星形成の現行犯です。",
    noteH: "ホットジュピターは恒星のすぐそばを回るので、遠方で形成され内側へ移動したはずです。1995年以降、数千の系外惑星が、唯一の例に基づくモデルの偏りを示しました。",
  },
};

function draw(ctx, cw, H, mode, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2;
  if (mode === "disk") {
    const yS = 0.42;
    // glowing disk rings
    for (let r = 30; r < Math.min(cw * 0.46, H * 1.05); r += 6) {
      const gap1 = Math.abs(r - Math.min(cw * 0.46, H * 1.05) * 0.5) < 10;
      const gap2 = Math.abs(r - Math.min(cw * 0.46, H * 1.05) * 0.78) < 8;
      ctx.strokeStyle = (gap1 || gap2) ? "rgba(10,12,20,0.9)" : `rgba(220,180,120,${0.06 + 0.05 * Math.sin(r)})`;
      ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(cx, cy, r, r * yS, 0, 0, Math.PI * 2); ctx.stroke();
    }
    // star
    const sg = ctx.createRadialGradient(cx, cy, 2, cx, cy, 22); sg.addColorStop(0, "#fff4d0"); sg.addColorStop(1, "rgba(255,200,90,0)");
    ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(cx, cy, 22, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#ffe6a0"; ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2); ctx.fill();
    // protoplanets sitting in the gaps
    const maxR = Math.min(cw * 0.46, H * 1.05);
    [[maxR * 0.5, tt * 0.01], [maxR * 0.78, -tt * 0.007 + 1]].forEach(([r, a]) => {
      const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r * yS;
      ctx.fillStyle = "#c9b89a"; ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "rgba(255,207,107,0.4)"; ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2); ctx.stroke();
    });
    ctx.fillStyle = C.sun; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.gap, cx, H - 8);
  } else {
    // hot Jupiter system: star with a giant very close, plus migration arrow from outer cold zone
    const sg = ctx.createRadialGradient(cx, cy, 2, cx, cy, 30); sg.addColorStop(0, "#fff4d0"); sg.addColorStop(1, "rgba(255,200,90,0)");
    ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(cx, cy, 30, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#ffe0a0"; ctx.beginPath(); ctx.arc(cx, cy, 13, 0, Math.PI * 2); ctx.fill();
    // tight hot-Jupiter orbit
    const hjR = 42;
    ctx.strokeStyle = "rgba(255,150,90,0.5)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, hjR, 0, Math.PI * 2); ctx.stroke();
    const a = tt * 0.03; const hx = cx + Math.cos(a) * hjR, hy = cy + Math.sin(a) * hjR;
    const jg = ctx.createRadialGradient(hx - 3, hy - 3, 1, hx, hy, 10); jg.addColorStop(0, "#f0c98a"); jg.addColorStop(1, "#b06a2a");
    ctx.fillStyle = jg; ctx.beginPath(); ctx.arc(hx, hy, 9, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#e0774f"; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.hot, cx, cy + hjR + 22);
    // cold formation zone far right + migration arrow inward
    const coldX = cw - 60;
    const cg = ctx.createRadialGradient(coldX - 3, cy - 3, 1, coldX, cy, 12); cg.addColorStop(0, "#bcd6ea"); cg.addColorStop(1, "#5a7fa0");
    ctx.fillStyle = cg; ctx.globalAlpha = 0.5; ctx.beginPath(); ctx.arc(coldX, cy, 10, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1;
    ctx.fillStyle = C.cool; ctx.font = `9px ${mono}`; ctx.fillText(t.formed, coldX, cy - 18);
    // migration arrow
    ctx.strokeStyle = "rgba(255,207,107,0.7)"; ctx.lineWidth = 2; ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(coldX - 14, cy); ctx.lineTo(cx + hjR + 20, cy); ctx.stroke(); ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(cx + hjR + 20, cy); ctx.lineTo(cx + hjR + 28, cy - 4); ctx.lineTo(cx + hjR + 28, cy + 4); ctx.closePath(); ctx.fillStyle = "rgba(255,207,107,0.9)"; ctx.fill();
    ctx.fillStyle = C.sun; ctx.fillText(t.migrate, (coldX + cx + hjR) / 2, cy - 8);
    ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.star1995, cx, H - 8);
  }
}

export function Exoplanets() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("disk");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, mode, 40, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, mode, tt, lang); raf = requestAnimationFrame(loop); };
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
          <div style={{ ...styles.fateLabel, color: C.sun }}>{mode === "disk" ? t.diskKey : t.hjKey}</div>
          <p style={styles.keyTermText}>{mode === "disk" ? t.diskText : t.hjText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          {[["disk", t.disk], ["system", t.system]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{mode === "disk" ? t.noteD : t.noteH}</p>
      </div>
    </div>
  );
}

export default Exoplanets;
