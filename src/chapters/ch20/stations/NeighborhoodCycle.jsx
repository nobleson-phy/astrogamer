/* ============================================================
   STATION 8 — OUR NEIGHBORHOOD & THE BARYON CYCLE
   The Sun sits inside the LOCAL BUBBLE — a low-density (~0.01 atoms/cm³)
   cavity of million-degree, X-ray gas blown by past supernovae. Its
   temperature is huge but its density is so tiny that it poses no threat:
   total heat transfer is negligible. About 10,000 years ago the solar
   system entered the warm (~7,000 K) LOCAL FLUFF within it. All this feeds
   the BARYON CYCLE: gas → stars → supernovae → enriched gas → new stars.
   Grounded in Ch.20 §20.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Our neighborhood & the baryon cycle",
    kind: "Where we live, and how gas recycles",
    lede: "The Sun floats in a million-degree bubble — yet feels nothing. See our local gas, then the grand cycle that turns gas into stars and back again.",
    thread: "THE STORY ENDS HERE",
    threadText: "Our own corner of the Galaxy tells the whole story in miniature: hot bubbles from old supernovae, a wisp of warmer cloud, and matter endlessly recycled into new stars.",
    localKey: "THE LOCAL BUBBLE — HOT, BUT HARMLESS",
    localText: "The Sun currently sits inside the LOCAL BUBBLE, a low-density cavity — only about 0.01 atoms per cm³ — filled with million-degree, X-ray-emitting gas blown out by ancient supernovae. Such a temperature sounds alarming, but temperature measures energy per particle; with so few particles, the total heat that could reach Earth is completely negligible. About 10,000 years ago the solar system drifted into the LOCAL INTERSTELLAR CLOUD (the 'Local Fluff'), a slightly denser, warm (~7,000 K) cloud within the bubble.",
    cycleKey: "THE BARYON CYCLE — GAS RECYCLED INTO STARS",
    cycleText: "All of this is part of the galactic BARYON CYCLE. Gas accreted from intergalactic space collects into molecular clouds that form stars; those stars live, die, and — through stellar winds and supernovae — return enriched gas laced with newly forged heavy elements to the interstellar medium. That enriched gas forms the next generation of stars, so each cycle raises the Galaxy's heavy-element content, driving its chemical evolution.",
    local: "Local Bubble", cycle: "Baryon cycle",
    bubble: "Local Bubble: ~0.01 atoms/cm³, 10⁶ K", fluff: "Local Fluff: ~0.3 atoms/cm³, ~7,000 K", harmless: "hot but near-empty → harmless",
    noteL: "The Sun sits in the Local Bubble — million-degree but near-empty (~0.01 atoms/cm³), so harmless — and recently entered the warm Local Fluff within it.",
    noteC: "The baryon cycle: gas forms stars in molecular clouds; dying stars and supernovae return enriched gas, seeding new stars and enriching the Galaxy over time.",
  },
  ja: {
    title: "私たちの近所とバリオンサイクル",
    kind: "住まいと、ガスの循環",
    lede: "太陽は100万度の泡に浮かんでいます——なのに何も感じません。私たちの近くのガスを見て、それからガスを星にして戻す壮大な循環を見よう。",
    thread: "物語はここで終わる",
    threadText: "私たちの銀河の片隅が、全体の物語をミニチュアで語ります：古い超新星の熱い泡、より暖かい雲のひとひら、そして絶えず新しい星へ再生される物質。",
    localKey: "ローカルバブル——熱いが無害",
    localText: "太陽は現在ローカルバブルの中にあります。低密度の空洞——わずか約0.01原子/cm³——で、古い超新星が吹き出した100万度でX線を放つガスに満ちています。そんな温度は不安に聞こえますが、温度は粒子あたりのエネルギーを測るもの。粒子が非常に少ないので、地球に届きうる総熱量は完全に無視できます。約1万年前、太陽系は泡の中の、わずかに密で暖かい（約7,000 K）局所恒星間雲（「ローカル・フラフ」）に漂い込みました。",
    cycleKey: "バリオンサイクル——ガスが星に再生",
    cycleText: "これらはすべて銀河のバリオンサイクルの一部です。銀河間空間から降着したガスが分子雲に集まり星を作ります。その星は生き、死に——恒星風と超新星を通じて——新たに鍛えられた重元素を含む富化したガスを星間物質に返します。その富化したガスが次世代の星を作るので、各サイクルが銀河の重元素含有量を高め、その化学進化を駆動します。",
    local: "ローカルバブル", cycle: "バリオンサイクル",
    bubble: "ローカルバブル：約0.01原子/cm³、10⁶ K", fluff: "ローカル・フラフ：約0.3原子/cm³、約7,000 K", harmless: "熱いがほぼ空 → 無害",
    noteL: "太陽はローカルバブルの中にあります——100万度でもほぼ空（約0.01原子/cm³）なので無害——そして最近、中の暖かいローカル・フラフに入りました。",
    noteC: "バリオンサイクル：ガスが分子雲で星を作り、死にゆく星と超新星が富化したガスを返し、新しい星の種となって、時とともに銀河を富ませます。",
  },
};

function drawLocal(ctx, cw, H, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H * 0.42, R = Math.min(cw * 0.34, H * 0.44);
  // Local Bubble (hot, sparse)
  const bg = ctx.createRadialGradient(cx, cy, R * 0.3, cx, cy, R); bg.addColorStop(0, "rgba(180,120,255,0.12)"); bg.addColorStop(1, "rgba(120,160,255,0.05)");
  ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "rgba(180,140,255,0.3)"; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
  // very sparse atoms
  for (let i = 0; i < 10; i++) { ctx.fillStyle = "rgba(200,180,255,0.5)"; ctx.beginPath(); ctx.arc(cx + (Math.random() - 0.5) * 2 * R * 0.9, cy + (Math.random() - 0.5) * 2 * R * 0.9, 1.3, 0, Math.PI * 2); ctx.fill(); }
  // Local Fluff (denser wisp) near the Sun
  ctx.fillStyle = "rgba(255,200,140,0.14)"; ctx.beginPath(); ctx.ellipse(cx + R * 0.2, cy, R * 0.4, R * 0.3, 0.3, 0, Math.PI * 2); ctx.fill();
  for (let i = 0; i < 20; i++) { ctx.fillStyle = "rgba(255,200,140,0.5)"; ctx.beginPath(); ctx.arc(cx + R * 0.2 + (Math.random() - 0.5) * R * 0.7, cy + (Math.random() - 0.5) * R * 0.5, 1.3, 0, Math.PI * 2); ctx.fill(); }
  // Sun
  ctx.fillStyle = "#ffd86b"; ctx.beginPath(); ctx.arc(cx + R * 0.2, cy, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText("Sun", cx + R * 0.2, cy + 18);
  // labels
  ctx.fillStyle = "#c0a8ee"; ctx.font = `10px ${mono}`; ctx.fillText(t.bubble, cx, cy - R + 14 < 14 ? 14 : cy - R + 14);
  ctx.fillStyle = "#ffc078"; ctx.fillText(t.fluff, cx, H - 26);
  ctx.fillStyle = C.good; ctx.fillText(t.harmless, cx, H - 10);
}

function drawCycle(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H * 0.46, R = Math.min(cw * 0.3, H * 0.36);
  const nodes = [
    { en: "gas accretes", ja: "ガス降着", col: "#8fc0e8" },
    { en: "molecular clouds", ja: "分子雲", col: "#a99ae0" },
    { en: "stars form", ja: "星が形成", col: "#ffd86b" },
    { en: "supernovae", ja: "超新星", col: "#ff8f5a" },
    { en: "enriched ISM", ja: "富化した星間物質", col: "#8fe0a0" },
  ];
  // ring arrows
  ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
  // flowing dot
  const fp = (tt * 0.01) % (Math.PI * 2);
  ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(cx + Math.cos(fp) * R, cy + Math.sin(fp) * R, 3, 0, Math.PI * 2); ctx.fill();
  nodes.forEach((n, i) => {
    const a = -Math.PI / 2 + i * (Math.PI * 2 / nodes.length);
    const x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R;
    ctx.fillStyle = n.col; ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.text; ctx.font = `10px ${mono}`;
    ctx.textAlign = x < cx - 10 ? "right" : x > cx + 10 ? "left" : "center";
    const lx = x + (x < cx - 10 ? -10 : x > cx + 10 ? 10 : 0), ly = y + (Math.abs(x - cx) < 10 ? (y < cy ? -12 : 16) : 3);
    ctx.fillText(lang === "ja" ? n.ja : n.en, lx, ly);
  });
  ctx.fillStyle = C.sun; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(lang === "ja" ? "各周期で重元素が増える" : "each loop enriches the Galaxy", cx, cy + 4);
}

export function NeighborhoodCycle() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("local");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (mode === "local") { drawLocal(ctx, cw, H, lang); return; }
    if (reduceMotion) { drawCycle(ctx, cw, H, 40, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; drawCycle(ctx, cw, H, tt, lang); raf = requestAnimationFrame(loop); };
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
          <div style={{ ...styles.fateLabel, color: C.sun }}>{mode === "local" ? t.localKey : t.cycleKey}</div>
          <p style={styles.keyTermText}>{mode === "local" ? t.localText : t.cycleText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          {[["local", t.local], ["cycle", t.cycle]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{mode === "local" ? t.noteL : t.noteC}</p>
      </div>
    </div>
  );
}

export default NeighborhoodCycle;
