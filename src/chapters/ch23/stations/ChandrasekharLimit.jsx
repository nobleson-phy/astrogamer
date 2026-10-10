/* ============================================================
   STATION 2 — THE CHANDRASEKHAR LIMIT
   Electron degeneracy can only hold up so much. A white dwarf in a binary can
   steal gas from its companion and grow. When it reaches the CHANDRASEKHAR
   LIMIT of 1.4 M☉, degeneracy pressure can no longer resist gravity: carbon
   fusion ignites explosively throughout the whole star at once — a TYPE Ia
   SUPERNOVA — which utterly disrupts the white dwarf, leaving NO remnant.
   Because the trigger mass is always 1.4 M☉, every Ia reaches nearly the same
   peak brightness, making it a cosmic "standard candle." Grounded in Ch.23.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const LIMIT = 1.4;

const STR = {
  en: {
    title: "The Chandrasekhar limit",
    kind: "Accrete past 1.4 M☉ and the star detonates",
    lede: "Feed gas from a companion onto the white dwarf. Push its mass toward 1.4 M☉ — the Chandrasekhar limit — and watch it detonate as a Type Ia.",
    thread: "THE STORY CONTINUES",
    threadText: "Alone, a white dwarf cools forever. But with a greedy companion to feed on, it can grow — toward a line it must never cross.",
    key: "1.4 M☉ — ACCRETE PAST IT → TYPE Ia, NO REMNANT",
    keyText: "Electron degeneracy pressure has a breaking point: the CHANDRASEKHAR LIMIT of 1.4 M☉. A white dwarf in a binary can pull gas off its companion and slowly gain mass. The instant it reaches 1.4 M☉, degeneracy can no longer hold back gravity — carbon fusion ignites explosively throughout the entire star at once. This is a TYPE Ia SUPERNOVA, and it completely disrupts the white dwarf, leaving NO remnant behind. Because every Ia detonates at the same fixed 1.4 M☉, they all reach nearly the same peak luminosity — which makes a Type Ia a reliable 'standard candle' for measuring cosmic distances.",
    accrete: "Mass accreted →",
    companion: "companion", wd: "white dwarf", stream: "gas stream",
    stable: "STABLE — degeneracy holds",
    detonate: "TYPE Ia DETONATION — no remnant",
    standard: "fixed 1.4 M☉ → consistent brightness → standard candle",
    note: "A white dwarf accreting past 1.4 M☉ (the Chandrasekhar limit) ignites runaway carbon fusion and is destroyed entirely as a Type Ia supernova — no remnant. The fixed trigger mass makes every Ia a consistent standard candle.",
  },
  ja: {
    title: "チャンドラセカール限界",
    kind: "1.4 M☉を超えて降着すると星は爆発する",
    lede: "伴星からのガスを白色矮星に供給しよう。質量を1.4 M☉——チャンドラセカール限界——へ押し上げると、Ia型として爆発します。",
    thread: "物語はつづく",
    threadText: "ひとりなら白色矮星は永遠に冷えていきます。しかし貪る伴星を食い物にできれば、成長できます——決して越えてはならない一線へと。",
    key: "1.4 M☉——超えて降着 → Ia型、残骸なし",
    keyText: "電子縮退圧には限界点があります：1.4 M☉のチャンドラセカール限界です。連星にある白色矮星は伴星からガスを引き剥がし、ゆっくり質量を得られます。1.4 M☉に達した瞬間、縮退はもはや重力を押し止められず——炭素融合が星全体で一度に爆発的に点火します。これがIa型超新星で、白色矮星を完全に破壊し、あとに残骸を残しません。どのIa型も同じ決まった1.4 M☉で爆発するので、すべてほぼ同じピーク光度に達します——これがIa型を、宇宙の距離を測る信頼できる「標準光源」にするのです。",
    accrete: "降着した質量 →",
    companion: "伴星", wd: "白色矮星", stream: "ガスの流れ",
    stable: "安定——縮退が支える",
    detonate: "Ia型の爆発——残骸なし",
    standard: "決まった1.4 M☉ → 一定の明るさ → 標準光源",
    note: "白色矮星が1.4 M☉（チャンドラセカール限界）を超えて降着すると、暴走する炭素融合が点火し、Ia型超新星として星全体が破壊されます——残骸はありません。決まった起爆質量が、どのIa型も一定の標準光源にします。",
  },
};

function draw(ctx, cw, H, M, boom, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cy = H * 0.42;
  const cxWD = cw * 0.40, cxC = cw * 0.78;
  const detonated = M >= LIMIT;

  if (detonated && boom > 0) {
    // explosion
    const R = 30 + boom * 2.4;
    const g = ctx.createRadialGradient(cxWD, cy, 2, cxWD, cy, R);
    g.addColorStop(0, `rgba(255,255,255,${clamp(1 - boom / 120, 0, 1)})`);
    g.addColorStop(0.4, `rgba(255,210,61,${clamp(0.8 - boom / 150, 0, 1)})`);
    g.addColorStop(1, "rgba(255,110,67,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cxWD, cy, R, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.danger; ctx.font = `13px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(t.detonate, cw / 2, H - 28);
  } else {
    // companion star (red-ish)
    const compR = 26;
    const gc = ctx.createRadialGradient(cxC, cy, 3, cxC, cy, compR);
    gc.addColorStop(0, "#ffd9a0"); gc.addColorStop(1, "#d86a3a");
    ctx.fillStyle = gc; ctx.beginPath(); ctx.arc(cxC, cy, compR, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#ffc98a"; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(t.companion, cxC, cy + compR + 18);

    // accretion stream
    ctx.strokeStyle = "rgba(255,200,120,0.6)"; ctx.lineWidth = 2; ctx.setLineDash([4, 5]);
    ctx.beginPath(); ctx.moveTo(cxC - compR, cy); ctx.quadraticCurveTo((cxWD + cxC) / 2, cy - 26, cxWD + 16, cy); ctx.stroke();
    ctx.setLineDash([]);

    // white dwarf, grows faintly with mass
    const wdR = 13 + (M - 0.6) * 10;
    const g = ctx.createRadialGradient(cxWD - 4, cy - 4, 2, cxWD, cy, wdR);
    g.addColorStop(0, "#f2f8ff"); g.addColorStop(0.7, "#cfe2ff"); g.addColorStop(1, "#8fb6ea");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cxWD, cy, wdR, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#cfe3ff"; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(t.wd, cxWD, cy + wdR + 18);
    ctx.fillStyle = C.good; ctx.font = `12px ${mono}`;
    ctx.fillText(t.stable, cw / 2, H - 28);
  }

  // mass bar at bottom
  const bx = 24, by = H - 16, bw = cw - 48;
  ctx.fillStyle = "rgba(150,175,230,0.25)"; ctx.fillRect(bx, by, bw, 6);
  const frac = clamp((M - 0.4) / (LIMIT - 0.4), 0, 1);
  ctx.fillStyle = detonated ? C.danger : C.cool;
  ctx.fillRect(bx, by, bw * frac, 6);
  // limit tick
  ctx.strokeStyle = C.sun; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(bx + bw, by - 4); ctx.lineTo(bx + bw, by + 10); ctx.stroke();
  ctx.fillStyle = C.sun; ctx.font = `10px ${mono}`; ctx.textAlign = "right";
  ctx.fillText("1.4 M☉", bx + bw, by - 8);
  ctx.fillStyle = C.text; ctx.font = `12px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(`${M.toFixed(2)} M☉`, bx, 22);
}

export function ChandrasekharLimit() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 270;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [M, setM] = useState(1.0);
  const boomRef = useRef(0);
  const massRef = useRef(1.0); massRef.current = M;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) {
      boomRef.current = massRef.current >= LIMIT ? 40 : 0;
      draw(ctx, cw, H, massRef.current, boomRef.current, lang);
      return;
    }
    let raf;
    const loop = () => {
      if (massRef.current >= LIMIT) { if (boomRef.current < 200) boomRef.current += 2; }
      else boomRef.current = 0;
      draw(ctx, cw, H, massRef.current, boomRef.current, lang);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

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

        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "4px 0 8px" }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.accrete}</span>
          <input type="range" min="0.6" max="1.45" step="0.01" value={M}
            onChange={(e) => setM(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
          <span style={{ fontFamily: mono, fontSize: 12, color: M >= LIMIT ? C.danger : C.muted, width: 64, textAlign: "right" }}>{M.toFixed(2)} M☉</span>
        </div>

        <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />

        <div style={{ fontFamily: mono, fontSize: 11.5, color: C.sun, marginTop: 8 }}>{t.standard}</div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default ChandrasekharLimit;
