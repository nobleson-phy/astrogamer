/* ============================================================
   STATION 8 — DETECTING THE INVISIBLE (capstone, 3 tabs)
   Tab A GRAVITATIONAL WAVES: LIGO's 2015 first direct detection (GW150914) of
   merging black holes; two widely separated stations (Louisiana & Washington)
   so a light-speed wave gives simultaneous matching signals while local noise
   differs; the Hulse-Taylor binary pulsar PSR 1913+16 whose orbital decay
   first proved gravitational waves (1993 Nobel); and GW170817, the
   multi-messenger GW + short-GRB + kilonova neutron-star merger.
   Tab B THE SHADOW: the Event Horizon Telescope image where lensing makes the
   dark shadow about 2.5x the event-horizon diameter.
   Tab C Sgr A*: infrared-tracked stellar orbits (S2) by Ghez & Genzel reveal
   about 4.6 million M☉ inside under 17 light-hours. Grounded in Ch.24.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp, lerp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Detecting the invisible",
    kind: "Waves, shadows and orbiting stars",
    lede: "Three ways we have finally caught the uncatchable: ripples in spacetime, a lensed shadow, and stars whipping around something dark and massive.",
    thread: "THE JOURNEY'S END — WE SEE THEM AT LAST",
    threadText: "For decades black holes were only equations. Then, within a few short years, three different techniques caught them directly. This is how.",
    key: "WAVES, SHADOWS & ORBITING STARS REVEAL BLACK HOLES",
    keyText: "Three independent lines of evidence finally revealed black holes directly. GRAVITATIONAL WAVES: in 2015 LIGO made the first direct detection, GW150914, from two merging black holes. LIGO uses two widely separated stations (Louisiana and Washington) so that a real wave — travelling at light speed — produces simultaneous, matching signals at both, while purely local noise (quakes, traffic) does not. The Hulse-Taylor binary pulsar PSR 1913+16 had already proven waves indirectly: its orbit decays exactly as GR predicts for gravitational-wave energy loss (1993 Nobel). In 2017 GW170817 caught gravitational waves AND a short gamma-ray burst AND an optical kilonova from merging neutron stars — multi-messenger astronomy. THE SHADOW: the Event Horizon Telescope imaged the dark 'shadow' of a supermassive hole, enlarged by lensing to about 2.5x the horizon diameter. Sgr A*: infrared orbits of stars like S2 (Ghez & Genzel) reveal about 4.6 million M☉ packed inside under 17 light-hours — a supermassive black hole at our Galaxy's center.",
    tabA: "A · Gravitational waves", tabB: "B · The shadow", tabC: "C · Sgr A*",
    // Tab A
    ligo: "LIGO 2015: GW150914, first direct detection (two merging black holes)",
    twoSites: "Two sites (Louisiana + Washington): a light-speed wave hits both at once; local noise does not",
    hulse: "Hulse-Taylor pulsar PSR 1913+16: orbital decay proved waves (1993 Nobel)",
    gw170817: "GW170817 (2017): GW + short GRB + kilonova from a neutron-star merger",
    inspiral: "inspiral", merger: "merger", ringdown: "ringdown",
    siteL: "Louisiana", siteW: "Washington", match: "matching signal",
    // Tab B
    shadowCap: "Lensing enlarges the dark shadow to about 2.5x the event-horizon diameter",
    ehtLabel: "Event Horizon Telescope image",
    trueHorizon: "true horizon", shadow: "lensed shadow (~2.5x)",
    // Tab C
    sgrCap: "S2's infrared orbit: about 4.6 million M☉ inside under 17 light-hours",
    sgr: "Sgr A*", s2: "star S2", ghez: "Ghez & Genzel: infrared stellar orbits",
    note: "Gravitational waves (LIGO's GW150914, 2015; two stations to reject local noise; Hulse-Taylor's orbital decay; multi-messenger GW170817), the EHT's lensed shadow (~2.5x the horizon), and the infrared orbits around Sgr A* (~4.6 million M☉) all reveal black holes directly.",
  },
  ja: {
    title: "見えないものの検出",
    kind: "波・影・めぐる星々",
    lede: "捕まえられないものをついに捕まえた3つの方法：時空のさざ波、レンズ効果の影、そして暗く重い何かを振り回しながらめぐる星々。",
    thread: "旅の終わり——ついに彼らを見る",
    threadText: "何十年もの間、ブラックホールは方程式でしかありませんでした。それがわずか数年のうちに、3つの異なる手法が直接それらを捕まえました。その方法です。",
    key: "波・影・めぐる星々がブラックホールを明かす",
    keyText: "3つの独立した証拠の筋が、ついにブラックホールを直接明かしました。重力波：2015年にLIGOが、2つの合体するブラックホールからの最初の直接検出GW150914を成しました。LIGOは大きく離れた2つの観測所（ルイジアナとワシントン）を使い、本物の波——光速で進む——が両方で同時に一致する信号を作る一方、純粋に地元のノイズ（地震・交通）はそうならないようにします。ハルス・テイラーの連星パルサーPSR 1913+16は、すでに波を間接的に証明していました：その軌道は、重力波のエネルギー損失について一般相対論が予言する通りに正確に減衰します（1993年ノーベル賞）。2017年、GW170817は中性子星の合体からの重力波と短いガンマ線バースト、そして可視光のキロノヴァを同時に捕まえました——マルチメッセンジャー天文学です。影：イベント・ホライズン・テレスコープは超大質量の穴の暗い「影」を撮像し、レンズ効果で地平面の直径の約2.5倍に拡大されていました。いて座A*：S2のような星の赤外線軌道（ゲッズとゲンツェル）は、約460万 M☉が17光時未満の中に詰まっていることを明かします——私たちの銀河の中心の超大質量ブラックホールです。",
    tabA: "A · 重力波", tabB: "B · 影", tabC: "C · いて座A*",
    ligo: "LIGO 2015：GW150914、最初の直接検出（2つの合体するブラックホール）",
    twoSites: "2つの観測所（ルイジアナ＋ワシントン）：光速の波は両方に同時に届き、地元のノイズは届かない",
    hulse: "ハルス・テイラーのパルサーPSR 1913+16：軌道の減衰が波を証明（1993年ノーベル賞）",
    gw170817: "GW170817（2017）：中性子星の合体からの重力波＋短いGRB＋キロノヴァ",
    inspiral: "インスパイラル", merger: "合体", ringdown: "リングダウン",
    siteL: "ルイジアナ", siteW: "ワシントン", match: "一致する信号",
    shadowCap: "レンズ効果が暗い影を事象の地平面の直径の約2.5倍に拡大する",
    ehtLabel: "イベント・ホライズン・テレスコープの画像",
    trueHorizon: "本当の地平面", shadow: "レンズ効果の影（約2.5倍）",
    sgrCap: "S2の赤外線軌道：17光時未満の中に約460万 M☉",
    sgr: "いて座A*", s2: "星 S2", ghez: "ゲッズとゲンツェル：赤外線の星の軌道",
    note: "重力波（LIGOのGW150914、2015年；地元のノイズを排除する2観測所；ハルス・テイラーの軌道減衰；マルチメッセンジャーのGW170817）、EHTのレンズ効果の影（地平面の約2.5倍）、そしていて座A*をめぐる赤外線の軌道（約460万 M☉）——すべてがブラックホールを直接明かします。",
  },
};

function drawWaves(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const topH = H * 0.5;
  // inspiral/merger/ringdown waveform
  const midY = topH * 0.5;
  ctx.strokeStyle = C.cool; ctx.lineWidth = 2;
  ctx.beginPath();
  const N = Math.floor(cw);
  for (let i = 0; i < N; i++) {
    const f = i / N;                 // 0..1 across
    const phase = f * 40 + tt * 0.12;
    const freq = lerp(0.1, 1.6, f);  // chirp: rising frequency
    const amp = f < 0.8 ? lerp(6, 26, f / 0.8) : lerp(26, 2, (f - 0.8) / 0.2); // grow then ringdown
    const y = midY + Math.sin(phase * freq) * amp;
    if (i === 0) ctx.moveTo(i, y); else ctx.lineTo(i, y);
  }
  ctx.stroke();
  ctx.fillStyle = C.faint; ctx.font = `10.5px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.inspiral, cw * 0.25, topH - 6);
  ctx.fillText(t.merger, cw * 0.80, topH - 6);
  ctx.fillText(t.ringdown, cw * 0.94, topH - 6);

  // two detector sites receiving the same signal
  const y2 = topH + (H - topH) * 0.5;
  const pulse = 0.5 + 0.5 * Math.sin(tt * 0.1);
  [["L", cw * 0.3, t.siteL], ["W", cw * 0.7, t.siteW]].forEach(([_, x, label]) => {
    ctx.strokeStyle = C.violet; ctx.lineWidth = 1.4;
    for (let r = 6; r < 26; r += 8) {
      ctx.globalAlpha = clamp(1 - ((tt * 0.6 + r) % 26) / 26, 0, 1) * 0.7;
      ctx.beginPath(); ctx.arc(x, y2, r + (tt % 26), 0, Math.PI * 2); ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = C.cool; ctx.beginPath(); ctx.arc(x, y2, 5 + pulse * 2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#dbe4ff"; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(label, x, y2 + 30);
  });
  // link line
  ctx.strokeStyle = "rgba(99,211,240,0.4)"; ctx.setLineDash([4, 4]); ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.moveTo(cw * 0.3, y2); ctx.lineTo(cw * 0.7, y2); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = C.good; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.match, cw * 0.5, y2 - 14);
}

function drawShadow(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.5, cy = H * 0.5;
  const rHor = Math.min(cw, H) * 0.12;      // true horizon
  const rShadow = rHor * 2.5;                // lensed shadow

  // glowing asymmetric photon ring (EHT look)
  for (let k = 0; k < 120; k++) {
    const a = (k / 120) * Math.PI * 2;
    const bright = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(a - 1.6 + tt * 0.03)); // brighter on one side
    const rr = rShadow + 6 + 4 * Math.sin(k * 0.5);
    ctx.fillStyle = `rgba(255,${150 + bright * 70},${40 + bright * 40},${0.25 + bright * 0.6})`;
    ctx.beginPath(); ctx.arc(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, 3.4, 0, Math.PI * 2); ctx.fill();
  }
  // dark shadow
  ctx.fillStyle = "#05060d"; ctx.beginPath(); ctx.arc(cx, cy, rShadow, 0, Math.PI * 2); ctx.fill();
  // true horizon (dashed, smaller)
  ctx.strokeStyle = C.cool; ctx.lineWidth = 1.4; ctx.setLineDash([3, 4]);
  ctx.beginPath(); ctx.arc(cx, cy, rHor, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);

  ctx.fillStyle = C.cool; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.trueHorizon, cx, cy + 4);
  ctx.fillStyle = C.sun; ctx.textAlign = "left";
  ctx.fillText(t.shadow, 14, 20);
  ctx.fillStyle = C.faint; ctx.textAlign = "center";
  ctx.fillText(t.ehtLabel, cx, H - 10);
}

function drawSgr(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.5, cy = H * 0.5;

  // a few background stars
  ctx.fillStyle = "rgba(160,190,250,0.5)";
  for (let i = 0; i < 20; i++) ctx.fillRect((i * 97) % cw, (i * 53) % H, 1.4, 1.4);

  // elliptical orbit of S2 around Sgr A* (focus offset)
  const aRx = Math.min(cw * 0.34, 170), aRy = aRx * 0.5;
  const foc = aRx * 0.55;
  ctx.strokeStyle = "rgba(201,139,255,0.5)"; ctx.lineWidth = 1.3; ctx.setLineDash([5, 5]);
  ctx.beginPath(); ctx.ellipse(cx, cy, aRx, aRy, 0, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);

  // Sgr A* at a focus
  const fx = cx + foc;
  ctx.fillStyle = "#05060d"; ctx.beginPath(); ctx.arc(fx, cy, 10, 0, Math.PI * 2); ctx.fill();
  const glow = ctx.createRadialGradient(fx, cy, 2, fx, cy, 18);
  glow.addColorStop(0, "rgba(255,180,80,0.5)"); glow.addColorStop(1, "rgba(255,120,60,0)");
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(fx, cy, 18, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.sun; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.sgr, fx, cy - 22);

  // S2 moving faster near perihelion (Kepler-ish): use angle with varying speed
  const base = tt * 0.02;
  const ang = base + 0.5 * Math.sin(base);
  const sx = cx + Math.cos(ang) * aRx, sy = cy + Math.sin(ang) * aRy;
  const g = ctx.createRadialGradient(sx - 2, sy - 2, 1, sx, sy, 6);
  g.addColorStop(0, "#ffffff"); g.addColorStop(1, "#9fc0ff");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sx, sy, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#cfe0ff"; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.s2, sx, sy - 12);

  ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.sgrCap, cw / 2, H - 10);
}

export function DetectingTheInvisible() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 300;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [tab, setTab] = useState("A");
  const tabRef = useRef("A"); tabRef.current = tab;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    const render = (tt) => {
      const tb = tabRef.current;
      if (tb === "A") drawWaves(ctx, cw, H, tt, lang);
      else if (tb === "B") drawShadow(ctx, cw, H, tt, lang);
      else drawSgr(ctx, cw, H, tt, lang);
    };
    if (reduceMotion) { render(60); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; render(tt); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, tab, lang]);

  const lines = tab === "A"
    ? [t.ligo, t.twoSites, t.hulse, t.gw170817]
    : tab === "B"
      ? [t.shadowCap]
      : [t.sgrCap, t.ghez];

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
          <div style={{ ...styles.fateLabel, color: C.sun }}>{t.key}</div>
          <p style={styles.keyTermText}>{t.keyText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          <button onClick={() => setTab("A")} style={{ ...styles.chip, ...(tab === "A" ? styles.chipOn : {}) }}>{t.tabA}</button>
          <button onClick={() => setTab("B")} style={{ ...styles.chip, ...(tab === "B" ? styles.chipOn : {}) }}>{t.tabB}</button>
          <button onClick={() => setTab("C")} style={{ ...styles.chip, ...(tab === "C" ? styles.chipOn : {}) }}>{t.tabC}</button>
        </div>

        <div style={{ marginTop: 10 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <div style={{ marginTop: 10 }}>
          {lines.map((ln, i) => (
            <div key={i} style={{ fontFamily: mono, fontSize: 11.5, color: i === 0 ? C.sun : C.cool, marginTop: 4 }}>{ln}</div>
          ))}
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default DetectingTheInvisible;
