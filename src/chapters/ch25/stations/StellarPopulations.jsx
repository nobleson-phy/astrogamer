/* ============================================================
   STATION 7 — STELLAR POPULATIONS
   Baade's POPULATION I vs POPULATION II. Toggle: Pop I (young, metal-rich,
   blue, in the thin disk and spiral arms) vs Pop II (old, metal-poor, in the
   halo and globular clusters) — show where each lives on an edge-on galaxy and
   their relative heavy-element abundance. The unusual nuclear BULGE: old stars
   that are nonetheless metal-rich (rapid early enrichment). TWO POPULATIONS.
   Grounded in Ch.25.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Stellar populations",
    kind: "Baade's two families of stars",
    lede: "Walter Baade split the Galaxy's stars into two families. Toggle between them on an edge-on view: young metal-rich Population I lights up the thin disk and arms; old metal-poor Population II fills the halo and globular clusters. The bulge is the odd one out.",
    thread: "TWO FAMILIES, TWO HISTORIES",
    threadText: "The stars around us are not all alike. Some are freshly minted and chemically rich; others are ancient and nearly pristine. Where a star lives tells you when it was born.",
    key: "TWO POPULATIONS — YOUNG METAL-RICH DISK vs OLD METAL-POOR HALO",
    keyText: "During World War II blackouts, Walter BAADE resolved individual stars in Andromeda and recognized two distinct families. POPULATION I stars are YOUNG and METAL-RICH (enriched in elements heavier than helium), bluish, and concentrated in the THIN DISK and SPIRAL ARMS, where gas is still forming new stars. POPULATION II stars are OLD and METAL-POOR, formed 11-13 billion years ago from nearly pristine hydrogen and helium before dying stars had enriched the gas; they populate the HALO and the GLOBULAR CLUSTERS. The puzzle is the central nuclear BULGE: its stars are very OLD (over 10 billion years) yet, like the Sun, METAL-RICH. The resolution is that star formation in the dense bulge was so rapid early on that the first massive stars quickly seeded later generations with heavy elements. So chemistry plus location reads out the Galaxy's history.",
    popI: "Population I (disk)",
    popII: "Population II (halo)",
    diskLabel: "thin disk + arms: young, metal-rich, blue",
    haloLabel: "halo + globulars: old, metal-poor",
    bulgeLabel: "bulge: old BUT metal-rich",
    metalLabel: "heavy-element abundance",
    rich: "metal-rich",
    poor: "metal-poor",
    note: "Population I: young, metal-rich, blue stars in the thin disk and spiral arms. Population II: old, metal-poor stars in the halo and globular clusters. The bulge is the exception — old stars that are metal-rich from very rapid early enrichment.",
  },
  ja: {
    title: "星の種族",
    kind: "バーデの2つの星の家族",
    lede: "ウォルター・バーデは銀河の星を2つの家族に分けました。横から見た図で切り替えてみよう：若く金属に富む種族Iが薄い円盤と腕を灯し、古く金属に乏しい種族IIがハローと球状星団を満たします。バルジだけが例外です。",
    thread: "2つの家族、2つの歴史",
    threadText: "私たちのまわりの星はすべて同じではありません。できたてで化学的に豊かなものもあれば、古代のほぼ手つかずのものもあります。星がどこに暮らすかが、いつ生まれたかを教えてくれます。",
    key: "2つの種族——若く金属に富む円盤 対 古く金属に乏しいハロー",
    keyText: "第二次世界大戦の灯火管制の間、ウォルター・バーデはアンドロメダの個々の星を分解し、2つのはっきり異なる家族を見分けました。種族Iの星は若く金属に富み（ヘリウムより重い元素に富む）、青みがかっていて、ガスが今も新しい星を作っている薄い円盤と渦巻腕に集中しています。種族IIの星は古く金属に乏しく、死にゆく星がガスを富ませる前の、ほぼ手つかずの水素とヘリウムから110億〜130億年前に生まれました。これらはハローと球状星団に暮らしています。謎なのが中心のバルジです：その星は非常に古い（100億年以上）のに、太陽のように金属に富んでいます。その答えは、密なバルジでの星形成が初期に非常に速く進んだため、最初の大質量星が後の世代に素早く重元素をまいたからです。つまり化学組成と位置が、銀河の歴史を読み出すのです。",
    popI: "種族I（円盤）",
    popII: "種族II（ハロー）",
    diskLabel: "薄い円盤＋腕：若い・金属に富む・青い",
    haloLabel: "ハロー＋球状星団：古い・金属に乏しい",
    bulgeLabel: "バルジ：古いが金属に富む",
    metalLabel: "重元素の存在量",
    rich: "金属に富む",
    poor: "金属に乏しい",
    note: "種族I：薄い円盤と渦巻腕にある、若く金属に富む青い星。種族II：ハローと球状星団にある、古く金属に乏しい星。バルジは例外で、非常に速い初期の富化により金属に富む古い星です。",
  },
};

function draw(ctx, cw, H, pop, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.5, cy = H * 0.46;
  const haloR = Math.min(cw * 0.40, H * 0.40);
  const diskW = Math.min(cw * 0.40, haloR * 0.98);

  const isI = pop === "I";

  // HALO (Pop II) — dim unless Pop II selected
  ctx.globalAlpha = isI ? 0.22 : 1;
  ctx.strokeStyle = "rgba(201,170,255,0.3)"; ctx.lineWidth = 1; ctx.setLineDash([4, 5]);
  ctx.beginPath(); ctx.arc(cx, cy, haloR, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
  for (let i = 0; i < 40; i++) {
    const a = i * 2.3994, r = haloR * (0.35 + 0.6 * ((i * 53) % 100) / 100);
    const gx = cx + Math.cos(a) * r, gy = cy + Math.sin(a) * r;
    // reddish/old stars
    ctx.fillStyle = "rgba(255,180,140,0.75)";
    ctx.beginPath(); ctx.arc(gx, gy, 2.0, 0, Math.PI * 2); ctx.fill();
    // a couple of globular clusters as denser clumps
    if (i % 9 === 0) {
      ctx.fillStyle = "rgba(201,170,255,0.6)";
      ctx.beginPath(); ctx.arc(gx, gy, 5, 0, Math.PI * 2); ctx.fill();
    }
  }
  ctx.globalAlpha = 1;

  // DISK (Pop I) — dim unless Pop I selected
  ctx.globalAlpha = isI ? 1 : 0.25;
  const dg = ctx.createLinearGradient(cx - diskW, cy, cx + diskW, cy);
  dg.addColorStop(0, "rgba(120,160,255,0)"); dg.addColorStop(0.5, "rgba(150,190,255,0.9)"); dg.addColorStop(1, "rgba(120,160,255,0)");
  ctx.fillStyle = dg; ctx.beginPath(); ctx.ellipse(cx, cy, diskW, 10, 0, 0, Math.PI * 2); ctx.fill();
  // young blue stars sprinkled along the disk
  for (let i = 0; i < 30; i++) {
    const fx = cx + (((i * 37) % 100) / 100 - 0.5) * 2 * diskW;
    const fy = cy + (((i * 53) % 100) / 100 - 0.5) * 16;
    const tw = 0.6 + 0.4 * Math.sin(tt * 0.1 + i);
    ctx.fillStyle = `rgba(150,200,255,${0.6 * tw + 0.3})`;
    ctx.beginPath(); ctx.arc(fx, fy, 1.8, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;

  // BULGE — always shown, the odd one out (old but metal-rich → yellow)
  const bg = ctx.createRadialGradient(cx, cy, 2, cx, cy, 28);
  bg.addColorStop(0, "#fff2c0"); bg.addColorStop(0.5, "rgba(255,200,100,0.8)"); bg.addColorStop(1, "rgba(255,180,80,0)");
  ctx.fillStyle = bg; ctx.beginPath(); ctx.ellipse(cx, cy, 30, 20, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffe08a"; ctx.font = `10.5px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.bulgeLabel, cx, cy + 36 > H - 60 ? cy - 30 : cy + 36);

  // active-population label
  ctx.fillStyle = isI ? "#9fc0ff" : "rgba(255,180,140,0.95)"; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(isI ? t.diskLabel : t.haloLabel, cw / 2, 18);

  // metallicity bar (bottom) — abundance of heavy elements for the active population
  const bx = 24, bw = cw - 48, by = H - 22;
  ctx.fillStyle = "rgba(150,175,230,0.18)"; ctx.fillRect(bx, by, bw, 8);
  const frac = isI ? 0.9 : 0.12;
  const grd = ctx.createLinearGradient(bx, 0, bx + bw * frac, 0);
  grd.addColorStop(0, "#6f9fe0"); grd.addColorStop(1, isI ? "#ffd23f" : "#9fb6e8");
  ctx.fillStyle = grd; ctx.fillRect(bx, by, bw * frac, 8);
  ctx.fillStyle = C.muted; ctx.font = `10.5px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(t.metalLabel, bx, by - 6);
  ctx.fillStyle = isI ? C.sun : C.faint; ctx.textAlign = "right";
  ctx.fillText(isI ? t.rich : t.poor, bx + bw, by - 6);
}

export function StellarPopulations() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 300;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [pop, setPop] = useState("I");
  const popRef = useRef("I"); popRef.current = pop;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, pop, 30, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, popRef.current, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, pop, lang]);

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
          <div style={{ ...styles.fateLabel, color: C.sun }}>{t.key}</div>
          <p style={styles.keyTermText}>{t.keyText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          <button onClick={() => setPop("I")} style={{ ...styles.chip, ...(pop === "I" ? styles.chipOn : {}) }}>{t.popI}</button>
          <button onClick={() => setPop("II")} style={{ ...styles.chip, ...(pop === "II" ? styles.chipOn : {}) }}>{t.popII}</button>
        </div>

        <div style={{ marginTop: 10 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default StellarPopulations;
