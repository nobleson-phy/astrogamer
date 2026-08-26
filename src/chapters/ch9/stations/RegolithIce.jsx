/* ============================================================
   STATION 4 — REGOLITH & POLAR ICE
   Billions of years of impacts have ground the Moon's surface into
   a powdery, porous layer of shattered rock — the regolith ("soil").
   In permanently shadowed polar craters, hundreds of billions of
   tons of water ice hide in the cold and dark. In 2009 NASA crashed
   LCROSS into Cabeus crater and confirmed it. That ice means water,
   oxygen, and rocket fuel for explorers. Grounded in Ch.9 §9.1–9.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

function rng(seed) { let s = seed; return () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff; }

const STR = {
  en: {
    title: "Regolith & polar ice",
    kind: "Shattered soil and hidden water",
    lede: "There is no wind or water on the Moon, yet its surface is powder. Slide time forward to watch impacts pulverise the rock — then visit a polar crater where sunlight never reaches, and ice waits.",
    thread: "THE STORY CONTINUES",
    threadText: "The same relentless impacts that scar the Moon also grind it. And in a few frozen corners the Moon has kept a treasure that could one day fuel our journeys deeper into space.",
    key: "SOIL FROM IMPACTS, ICE IN THE DARK",
    keyText: "The lunar 'soil', or REGOLITH, is not weathered rock or wind-blown sand — it is a powdery, porous layer of tiny shattered fragments produced by billions of years of impacts, big and small. Near the poles, some crater floors never see sunlight; in that permanent cold, hundreds of billions of tons of WATER ICE have accumulated. In 2009 NASA deliberately crashed the LCROSS spacecraft into Cabeus crater and detected the water plume. That ice is a milestone for exploration: drinkable water, breathable oxygen, and — split into hydrogen and oxygen — rocket fuel.",
    vReg: "Regolith forms", vIce: "Polar ice",
    timeL: "Time / accumulated impacts:", young: "fresh rock", old: "deep regolith",
    ice: "water ice", shadow: "permanent shadow", lcross: "LCROSS impact, 2009",
    uses: ["Water to drink", "Oxygen to breathe", "H₂ + O₂ rocket fuel"],
    note1: "No wind, no rain — just impacts. Over billions of years they smash the bedrock into a deep, powdery regolith of broken fragments.",
    note2: "In permanently shadowed polar craters, water ice survives the vacuum. LCROSS confirmed it in 2009 — and it could supply water, oxygen and rocket fuel to future missions.",
  },
  ja: {
    title: "レゴリスと極の氷",
    kind: "砕けた土と、隠れた水",
    lede: "月には風も水もない、それなのに表面は粉です。時間を進めて衝突が岩を砕く様子を見て——それから日光の届かない極のクレーターを訪ね、氷を見よう。",
    thread: "物語はつづく",
    threadText: "月を傷つけるのと同じ執拗な衝突が、月をすり潰しもします。そして凍りついた片隅で、月は宝を守ってきました——いつか私たちの宇宙のさらに奥への旅を支えるかもしれない宝を。",
    key: "衝突が生む土、暗闇の氷",
    keyText: "月の「土」＝レゴリスは、風化した岩でも風に運ばれた砂でもありません——大小の衝突が何十億年もかけて生んだ、細かく砕けた粉状で多孔質の層です。極の近くには、決して日光を見ないクレーターの底があり、その永久の寒さの中に、数千億トンもの水の氷がたまっています。2009年、NASAはLCROSS探査機をカベウス・クレーターに意図的に衝突させ、水の噴煙を検出しました。この氷は探査の里程標です：飲み水、呼吸する酸素、そして——水素と酸素に分ければ——ロケット燃料になります。",
    vReg: "レゴリスができる", vIce: "極の氷",
    timeL: "時間／積み重なった衝突：", young: "新鮮な岩", old: "深いレゴリス",
    ice: "水の氷", shadow: "永久の影", lcross: "LCROSS衝突・2009年",
    uses: ["飲み水", "呼吸する酸素", "H₂＋O₂ ロケット燃料"],
    note1: "風も雨もなく——あるのは衝突だけ。何十億年もかけて、それらが岩盤を砕いて深く粉状のレゴリスにします。",
    note2: "永久に影のままの極のクレーターでは、水の氷が真空を生き延びます。LCROSSが2009年に確認——将来のミッションに水・酸素・ロケット燃料を供給できます。",
  },
};

function drawReg(ctx, cw, H, age, t, lang) {
  ctx.clearRect(0, 0, cw, H);
  const surfY = 60;
  // bedrock
  ctx.fillStyle = "#6b6355"; ctx.fillRect(0, surfY, cw, H - surfY);
  // regolith layer depth grows with age
  const depth = 12 + age * (H - surfY - 30);
  ctx.fillStyle = "#8f887a"; ctx.fillRect(0, surfY, cw, depth);
  // powder fragments
  const r = rng(77);
  const n = 60 + Math.floor(age * 240);
  for (let i = 0; i < n; i++) {
    const x = r() * cw, y = surfY + r() * depth, s = 0.8 + r() * 2.4;
    ctx.fillStyle = `rgba(${180 + r() * 40 | 0},${170 + r() * 40 | 0},${150 + r() * 30 | 0},0.9)`;
    ctx.fillRect(x, y, s, s);
  }
  // a few tiny impacts raining down
  for (let i = 0; i < 5; i++) { const x = (i + 1) * cw / 6 + Math.sin(age * 10 + i) * 8; ctx.strokeStyle = "rgba(255,200,140,0.6)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, 6); ctx.lineTo(x - 4, 30); ctx.stroke(); }
  ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, surfY + depth); ctx.lineTo(cw, surfY + depth); ctx.stroke();
  ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.textAlign = "left"; ctx.fillText(t.old, 12, surfY + Math.min(depth - 6, 40));
  ctx.fillStyle = C.muted; ctx.textAlign = "right"; ctx.fillText("bedrock", cw - 12, H - 12);
}

function drawIce(ctx, cw, H, t, lang, tt) {
  ctx.clearRect(0, 0, cw, H);
  const groundY = H - 30;
  ctx.fillStyle = "#6b6355"; ctx.fillRect(0, groundY, cw, 30);
  // sunlight coming from upper right at a low angle (pole)
  ctx.strokeStyle = "rgba(255,210,90,0.5)"; ctx.lineWidth = 2;
  for (let i = 0; i < 5; i++) { const x = cw * 0.5 + i * 40; ctx.beginPath(); ctx.moveTo(x, 10); ctx.lineTo(x - 70, groundY - 40); ctx.stroke(); }
  // crater carved into the ground (bowl) near left-center
  const ccx = cw * 0.34, cr = Math.min(cw * 0.24, 120);
  ctx.fillStyle = "#3a352c";
  ctx.beginPath(); ctx.moveTo(ccx - cr, groundY); ctx.quadraticCurveTo(ccx, groundY + 62, ccx + cr, groundY); ctx.closePath(); ctx.fill();
  // permanent shadow region (the far wall shades the floor)
  ctx.fillStyle = "rgba(10,14,28,0.7)";
  ctx.beginPath(); ctx.moveTo(ccx - cr, groundY); ctx.quadraticCurveTo(ccx - cr * 0.2, groundY + 58, ccx + cr * 0.5, groundY + 30); ctx.lineTo(ccx - cr, groundY + 30); ctx.closePath(); ctx.fill();
  // ice deposit at the shadowed floor
  ctx.fillStyle = "rgba(150,220,255,0.85)";
  ctx.beginPath(); ctx.ellipse(ccx - cr * 0.35, groundY + 40, cr * 0.4, 8, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#bfe9ff"; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.ice, ccx - cr * 0.35, groundY + 40 + 4);
  ctx.fillStyle = C.faint; ctx.font = `10px ${mono}`; ctx.fillText(t.shadow, ccx - cr * 0.35, groundY + 60);
  // LCROSS impact plume on the right, animated
  const plume = (Math.sin(tt * 0.05) * 0.5 + 0.5);
  const ix = cw * 0.78;
  ctx.strokeStyle = "rgba(255,180,120,0.6)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ix + 40, 12); ctx.lineTo(ix, groundY - 4); ctx.stroke();
  ctx.fillStyle = "rgba(190,233,255,0.5)";
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i / 9 - 0.5) * 1.6; const d = 10 + plume * 34; ctx.beginPath(); ctx.arc(ix + Math.cos(a) * d, groundY + Math.sin(a) * d, 2, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = C.cool; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.lcross, ix, groundY + 22);
}

export function RegolithIce() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 240;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [view, setView] = useState("reg");
  const [age, setAge] = useState(0.5);
  const ageRef = useRef(age); ageRef.current = age;
  const viewRef = useRef(view); viewRef.current = view;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (view === "reg") { drawReg(ctx, cw, H, age, t, lang); return; }
    if (reduceMotion) { drawIce(ctx, cw, H, t, lang, 0); return; }
    let raf, tt = 0;
    const loop = () => { if (viewRef.current !== "ice") return; tt += 1; drawIce(ctx, cw, H, t, lang, tt); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, view, age, lang]);

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
          <div style={{ ...styles.fateLabel, color: C.sun }}>{t.key}</div>
          <p style={styles.keyTermText}>{t.keyText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          {[["reg", t.vReg], ["ice", t.vIce]].map(([id, label]) => (
            <button key={id} onClick={() => setView(id)}
              style={{ ...styles.chip, ...(view === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        {view === "reg" && (
          <div style={{ marginTop: 10 }}>
            <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginBottom: 2 }}>{t.timeL}</div>
            <input type="range" min={0} max={1} step={0.01} value={age} onChange={(e) => setAge(parseFloat(e.target.value))} style={styles.range} />
            <div style={styles.rangeEnds}><span>{t.young}</span><span>{t.old}</span></div>
          </div>
        )}

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        {view === "ice" && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
            {t.uses.map((u, i) => (
              <span key={i} style={{ fontFamily: mono, fontSize: 12, color: C.cool, border: `1px solid ${C.border}`, borderRadius: 8, padding: "4px 8px" }}>{u}</span>
            ))}
          </div>
        )}

        <p style={{ ...styles.note, maxWidth: "none" }}>{view === "reg" ? t.note1 : t.note2}</p>
      </div>
    </div>
  );
}

export default RegolithIce;
