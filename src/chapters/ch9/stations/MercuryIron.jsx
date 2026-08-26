/* ============================================================
   STATION 6 — MERCURY: IRON WORLD
   Mercury is small but extremely dense — its metallic iron-nickel
   core holds about 60% of its mass (far more than Earth's). The
   likely reason: one or more giant impacts early on blasted away
   much of its original rocky mantle, leaving a metal-heavy world.
   Grounded in Ch.9 §9.4.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const CORES = [
  { en: "Mercury", ja: "水星", frac: 0.60, col: "#e89a3c" },
  { en: "Earth", ja: "地球", frac: 0.33, col: "#5b8dee" },
  { en: "Moon", ja: "月", frac: 0.04, col: "#c9c1b0" },
];

const STR = {
  en: {
    title: "Mercury: iron world",
    kind: "A giant metal core in a small planet",
    lede: "Mercury is barely bigger than the Moon, yet almost as dense as Earth. Something is hiding inside. Compare the cores, then strip away the mantle to see how Mercury got so metallic.",
    thread: "THE STORY CONTINUES",
    threadText: "We leave the Moon for the Sun's closest planet — another airless, cratered world, but with a secret in its weight. Mercury is far too dense for its size, and the reason is written in its violent birth.",
    key: "60% METAL, LIKELY STRIPPED BARE",
    keyText: "Mercury's high density reveals a metallic iron-nickel core holding about 60% of its mass — proportionally the largest core of any planet (Earth's is about 33%). For such a small world to be so metal-rich, it probably lost much of its original rocky silicate mantle: one or more giant impacts early in its history are thought to have blasted the outer rock away, leaving the dense core dominant.",
    vCore: "Core fractions", vStrip: "How it got so metallic",
    core: "iron-nickel core", mantle: "rocky mantle", massFrac: "core = share of mass",
    strip: "▶ Strip the mantle (giant impact)", orbit: "Orbit: 88 days",
    note1: "Mercury's iron core takes up most of the planet — about 60% of its mass, dwarfing Earth's 33% and the Moon's tiny core.",
    note2: "A giant impact (or several) likely blew off much of Mercury's rocky mantle early on, leaving a world dominated by its metal core — which is why it is so dense.",
  },
  ja: {
    title: "水星：鉄の世界",
    kind: "小さな惑星の中の巨大な金属の核",
    lede: "水星は月よりわずかに大きいだけ、それでいて地球ほど密度が高い。中に何かが隠れています。核を比べ、それからマントルを剥ぎ取って、水星がどうしてこれほど金属的になったかを見よう。",
    thread: "物語はつづく",
    threadText: "月を離れ、太陽に最も近い惑星へ——これもまた空気のないクレーターの世界ですが、その重さに秘密があります。水星は大きさのわりに密度が高すぎ、その理由は激しい誕生に書かれています。",
    key: "60%が金属、おそらく剥ぎ取られた",
    keyText: "水星の高い密度は、質量の約60%を占める金属の鉄ニッケルの核を明かします——惑星の中で比率として最大の核です（地球は約33%）。これほど小さな世界がこれほど金属に富むには、もとの岩石マントルの多くを失ったはずです：歴史の初期の1回以上の巨大衝突が外側の岩石を吹き飛ばし、密度の高い核が支配的になったと考えられます。",
    vCore: "核の割合", vStrip: "どうして金属的になったか",
    core: "鉄ニッケルの核", mantle: "岩石マントル", massFrac: "核＝質量の割合",
    strip: "▶ マントルを剥ぐ（巨大衝突）", orbit: "公転：88日",
    note1: "水星の鉄の核は惑星の大半を占めます——質量の約60%で、地球の33%や月の小さな核をはるかに上回ります。",
    note2: "巨大衝突（あるいは複数）が初期に水星の岩石マントルの多くを吹き飛ばし、金属の核が支配する世界を残したと考えられます——だからこれほど密度が高いのです。",
  },
};

function drawCores(ctx, cw, H, t, lang) {
  ctx.clearRect(0, 0, cw, H);
  const n = CORES.length, gap = 24;
  const bw = (cw - gap * (n + 1)) / n;
  const cy = H * 0.42, R = Math.min(bw * 0.44, 54);
  CORES.forEach((c, i) => {
    const x = gap + i * (bw + gap) + bw / 2;
    // rocky body
    ctx.fillStyle = "#6b6355"; ctx.beginPath(); ctx.arc(x, cy, R, 0, Math.PI * 2); ctx.fill();
    // core (area fraction ~ mass fraction for illustration; radius = sqrt(frac))
    const cr = R * Math.sqrt(c.frac);
    const g = ctx.createRadialGradient(x, cy, 1, x, cy, cr);
    g.addColorStop(0, "#ffd27a"); g.addColorStop(1, c.col);
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, cy, cr, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(x, cy, R, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = C.text; ctx.font = `700 13px ${mono}`; ctx.textAlign = "center"; ctx.fillText(lang === "ja" ? c.ja : c.en, x, cy + R + 22);
    ctx.fillStyle = C.sun; ctx.font = `14px ${mono}`; ctx.fillText(Math.round(c.frac * 100) + "%", x, cy + R + 40);
  });
  ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.massFrac, cw / 2, 20);
}

function drawStrip(ctx, cw, H, prog, t, lang) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.4, cy = H / 2, R = 56;
  const coreR = R * Math.sqrt(0.35); // before stripping, core is a smaller fraction
  const IMPACT = 0.45;                          // impactor reaches the planet here
  const post = Math.max(0, (prog - IMPACT) / (1 - IMPACT)); // 0..1 AFTER impact only
  // impact point on the upper-right of the planet
  const ipx = cx + R * 0.5, ipy = cy - R * 0.55;
  // mantle stays full size until impact, then shrinks as it is stripped away
  const mantleR = R * (1 - post * 0.5);
  ctx.fillStyle = "#6b6355"; ctx.beginPath(); ctx.arc(cx, cy, mantleR, 0, Math.PI * 2); ctx.fill();
  const g = ctx.createRadialGradient(cx, cy, 1, cx, cy, coreR);
  g.addColorStop(0, "#ffd27a"); g.addColorStop(1, "#e89a3c");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, coreR, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(cx, cy, mantleR, 0, Math.PI * 2); ctx.stroke();
  // 1) BEFORE impact: the impactor streaks in toward the planet
  if (prog < IMPACT) {
    const f = prog / IMPACT;
    const ix = cw * 0.92 + (ipx - cw * 0.92) * f, iy = (cy - 48) + (ipy - (cy - 48)) * f;
    ctx.strokeStyle = "rgba(255,150,90,0.4)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cw * 0.92, cy - 48); ctx.lineTo(ix, iy); ctx.stroke();
    ctx.fillStyle = "#c96b3a"; ctx.beginPath(); ctx.arc(ix, iy, 12, 0, Math.PI * 2); ctx.fill();
  } else {
    // 2) impact flash
    if (post < 0.18) {
      const fa = 1 - post / 0.18;
      const fg = ctx.createRadialGradient(ipx, ipy, 2, ipx, ipy, 46);
      fg.addColorStop(0, `rgba(255,240,180,${0.8 * fa})`); fg.addColorStop(1, "rgba(255,120,60,0)");
      ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(ipx, ipy, 46, 0, Math.PI * 2); ctx.fill();
    }
    // 3) AFTER impact: sprayed mantle debris flies off in all directions
    for (let i = 0; i < 22; i++) { const a = (i / 22) * Math.PI * 2; const d = R + post * 95; ctx.fillStyle = `rgba(150,140,120,${0.85 * (1 - post * 0.4)})`; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * d, cy + Math.sin(a) * d, 2, 0, Math.PI * 2); ctx.fill(); }
  }
  // labels
  ctx.fillStyle = "#ffd27a"; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.core, cx, cy + 3);
  ctx.fillStyle = C.faint; ctx.fillText(t.mantle, cx, cy + mantleR + 14);
  // resulting metal fraction rises toward 60% only as the mantle is removed
  const frac = Math.round(35 + post * 25);
  ctx.fillStyle = C.sun; ctx.font = `700 15px ${mono}`; ctx.textAlign = "right"; ctx.fillText("core = " + frac + "% of mass", cw - 16, 26);
}

export function MercuryIron() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 240;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [view, setView] = useState("core");
  const progRef = useRef(1);
  const runRef = useRef(false);
  const viewRef = useRef(view); viewRef.current = view;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (view === "core") { drawCores(ctx, cw, H, t, lang); return; }
    if (reduceMotion) { drawStrip(ctx, cw, H, 1, t, lang); return; }
    let raf;
    const loop = () => {
      if (viewRef.current !== "strip") return;
      if (runRef.current) { progRef.current = clamp(progRef.current + 0.008, 0, 1); if (progRef.current >= 1) runRef.current = false; }
      drawStrip(ctx, cw, H, progRef.current, t, lang);
      raf = requestAnimationFrame(loop);
    };
    runRef.current = true; progRef.current = 0; loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, view, lang]);

  const replay = () => { progRef.current = 0; runRef.current = true; };

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 06</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, marginTop: 10 }}>{t.orbit}</div>
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
          {[["core", t.vCore], ["strip", t.vStrip]].map(([id, label]) => (
            <button key={id} onClick={() => setView(id)}
              style={{ ...styles.chip, ...(view === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        {view === "strip" && <div style={{ marginTop: 8 }}><button style={styles.iconBtn} onClick={replay}>{t.strip}</button></div>}

        <p style={{ ...styles.note, maxWidth: "none" }}>{view === "core" ? t.note1 : t.note2}</p>
      </div>
    </div>
  );
}

export default MercuryIron;
