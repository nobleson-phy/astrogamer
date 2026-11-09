/* ============================================================
   STATION 6 — THE GALACTIC CENTER
   The heart of the Galaxy: SAGITTARIUS A*. Animate the star S2 on its
   elliptical 15.6-year orbit whipping around an invisible point; the fit gives
   4.6 MILLION solar masses packed within 17 light-hours — only a supermassive
   black hole. S2's ORBIT WEIGHS A 4.6-MILLION-M☉ BLACK HOLE. Grounded in Ch.25.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The galactic center",
    kind: "Sagittarius A* — weighed by a whipping star",
    lede: "At the dark heart of the Galaxy, the star S2 races around an invisible point on a 15.6-year elliptical orbit, whipping fastest at closest approach. Its orbit weighs the central object: 4.6 million solar masses inside a region smaller than 17 light-hours — a supermassive black hole.",
    thread: "THE HEART OF THE GALAXY",
    threadText: "Follow the dark matter inward and you reach something darker still at the very center: a point of staggering mass that emits almost no light, yet flings nearby stars around like pebbles on strings.",
    key: "S2'S ORBIT WEIGHS A 4.6-MILLION-M☉ BLACK HOLE",
    keyText: "At the exact center of the Milky Way sits a compact radio source called SAGITTARIUS A* (Sgr A*). For decades astronomers tracked individual stars near it in the infrared (piercing the dust). One star, S2, follows a tight elliptical orbit with a period of just 15.6 YEARS, whipping around Sgr A* and speeding up dramatically at closest approach — a textbook Kepler ellipse. Applying Kepler's third law to that orbit reveals the central mass: about 4.6 MILLION solar masses, packed inside a region smaller than 17 light-hours across (roughly the size of our planetary system). No star cluster could be that dense without collapsing. Only one thing fits — a SUPERMASSIVE BLACK HOLE. Its discovery earned the 2020 Nobel Prize in Physics.",
    showOrbit: "S2 orbit",
    reveal: "Reveal the mass",
    sgr: "Sgr A* (invisible point)",
    s2: "star S2 · 15.6-yr orbit",
    peri: "fastest at closest approach",
    massLabel: "4.6 million M☉ inside < 17 light-hours",
    onlyBH: "too dense for a star cluster → supermassive black hole",
    note: "Infrared tracking of star S2's 15.6-year elliptical orbit around Sagittarius A* yields 4.6 million solar masses within under 17 light-hours — a density only a supermassive black hole can reach (2020 Nobel Prize).",
  },
  ja: {
    title: "銀河中心",
    kind: "いて座A*——振り回される星が量る",
    lede: "銀河の暗い心臓部で、星S2が15.6年周期の楕円軌道で見えない点のまわりを駆け、最接近で最も速く振り回されます。その軌道が中心天体を量ります：17光時より小さな領域の中に460万太陽質量——超大質量ブラックホールです。",
    thread: "銀河の心臓部",
    threadText: "ダークマターをたどって内へ進むと、まさに中心に、さらに暗い何かに行き着きます：ほとんど光を出さないのに、近くの星をひもにつないだ小石のように振り回す、途方もない質量の一点です。",
    key: "S2の軌道が460万M☉のブラックホールを量る",
    keyText: "天の川のまさに中心に、いて座A*（Sgr A*）と呼ばれるコンパクトな電波源があります。何十年もの間、天文学者はその近くの個々の星を赤外線で（塵を貫いて）追跡してきました。ひとつの星、S2は、わずか15.6年の周期で狭い楕円軌道を描き、いて座A*のまわりを駆けめぐり、最接近で劇的に加速します——お手本どおりのケプラー楕円です。その軌道にケプラーの第三法則を当てはめると、中心の質量が明らかになります：約460万太陽質量が、差し渡し17光時より小さな領域（私たちの惑星系ほどの大きさ）に詰まっています。これほど密な星団は、崩壊せずにはいられません。当てはまるものはただひとつ——超大質量ブラックホールです。その発見は2020年のノーベル物理学賞をもたらしました。",
    showOrbit: "S2の軌道",
    reveal: "質量を明かす",
    sgr: "いて座A*（見えない点）",
    s2: "星S2・15.6年軌道",
    peri: "最接近で最速",
    massLabel: "17光時未満の中に460万M☉",
    onlyBH: "星団には密すぎる → 超大質量ブラックホール",
    note: "いて座A*をめぐる星S2の15.6年周期の楕円軌道を赤外線で追跡すると、17光時未満の中に460万太陽質量が得られます——超大質量ブラックホールしか到達できない密度です（2020年ノーベル賞）。",
  },
};

function draw(ctx, cw, H, revealed, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.5, cy = H * 0.5;

  // background stars
  ctx.fillStyle = "rgba(160,190,250,0.45)";
  for (let i = 0; i < 24; i++) ctx.fillRect((i * 101) % cw, (i * 57) % H, 1.4, 1.4);

  // S2 elliptical orbit; Sgr A* at a focus
  const aRx = Math.min(cw * 0.32, 160), aRy = aRx * 0.52;
  const foc = Math.sqrt(aRx * aRx - aRy * aRy);
  const fx = cx + foc;          // focus where Sgr A* sits
  ctx.strokeStyle = "rgba(201,139,255,0.5)"; ctx.lineWidth = 1.3; ctx.setLineDash([5, 5]);
  ctx.beginPath(); ctx.ellipse(cx, cy, aRx, aRy, 0, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);

  // Sgr A* at the focus
  if (revealed) {
    // reveal the mass as a dark disk with a halo
    const glow = ctx.createRadialGradient(fx, cy, 2, fx, cy, 26);
    glow.addColorStop(0, "rgba(255,160,70,0.6)"); glow.addColorStop(1, "rgba(255,120,60,0)");
    ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(fx, cy, 26, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#05060d"; ctx.beginPath(); ctx.arc(fx, cy, 12, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "rgba(255,180,80,0.6)"; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.arc(fx, cy, 14, 0, Math.PI * 2); ctx.stroke();
  } else {
    // just a faint cross marking the invisible focus
    ctx.strokeStyle = "rgba(255,255,255,0.4)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(fx - 6, cy); ctx.lineTo(fx + 6, cy); ctx.moveTo(fx, cy - 6); ctx.lineTo(fx, cy + 6); ctx.stroke();
  }
  ctx.fillStyle = revealed ? C.sun : "rgba(255,255,255,0.75)"; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.sgr, clamp(fx, 70, cw - 70), cy - 24);

  // S2 position — speed varies with distance to the focus (Kepler: faster near perihelion)
  const base = tt * 0.018;
  const ang = base + 0.6 * Math.sin(base);    // non-uniform angular speed
  const px = cx + Math.cos(ang) * aRx, py = cy + Math.sin(ang) * aRy;
  // short motion trail
  ctx.strokeStyle = "rgba(180,210,255,0.5)"; ctx.lineWidth = 2;
  ctx.beginPath();
  for (let k = 0; k < 10; k++) {
    const b2 = base - k * 0.04;
    const a2 = b2 + 0.6 * Math.sin(b2);
    const tx = cx + Math.cos(a2) * aRx, ty = cy + Math.sin(a2) * aRy;
    if (k === 0) ctx.moveTo(tx, ty); else ctx.lineTo(tx, ty);
  }
  ctx.stroke();
  const g = ctx.createRadialGradient(px - 2, py - 2, 1, px, py, 6);
  g.addColorStop(0, "#ffffff"); g.addColorStop(1, "#9fc0ff");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#cfe0ff"; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.s2, clamp(px, 70, cw - 70), py - 12 < 14 ? py + 20 : py - 12);

  // caption
  ctx.fillStyle = revealed ? C.sun : C.cool; ctx.font = `12px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(revealed ? t.massLabel : t.peri, cw / 2, H - 28);
  if (revealed) {
    ctx.fillStyle = C.good; ctx.font = `11px ${mono}`;
    ctx.fillText(t.onlyBH, cw / 2, H - 12);
  }
}

export function GalacticCenter() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 300;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [revealed, setRevealed] = useState(false);
  const revRef = useRef(false); revRef.current = revealed;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, revealed, 40, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, revRef.current, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, revealed, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 06</div>
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
          <button onClick={() => setRevealed(false)} style={{ ...styles.chip, ...(!revealed ? styles.chipOn : {}) }}>{t.showOrbit}</button>
          <button onClick={() => setRevealed(true)} style={{ ...styles.chip, ...(revealed ? styles.chipOn : {}) }}>{t.reveal}</button>
        </div>

        <div style={{ marginTop: 10 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default GalacticCenter;
