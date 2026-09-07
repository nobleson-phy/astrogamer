/* ============================================================
   STATION 2 — IO: VOLCANIC MOON
   Io is squeezed and stretched by Jupiter's gravity: on its slightly
   eccentric orbit (kept eccentric by a resonance with Europa and
   Ganymede) the tidal pull varies, flexing Io's interior and heating
   it by friction. This TIDAL HEATING powers the most intense
   volcanism in the solar system. Grounded in Ch.12 §12.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Io: volcanic moon",
    kind: "Heated by being squeezed",
    lede: "Io has no radioactive core to speak of and sits in the freezing outer system — yet it erupts constantly. Watch Jupiter's tides flex it as it orbits, and see the heat build.",
    thread: "THE STORY CONTINUES",
    threadText: "The Galilean moons are icy — except one. Io is a world of sulfur and lava, the most volcanically active body known. Its heat comes not from within its birth, but from a relentless gravitational massage.",
    key: "TIDAL HEATING DRIVES THE VOLCANOES",
    keyText: "Io orbits close to Jupiter on a slightly eccentric path (kept eccentric by an orbital resonance with Europa and Ganymede). Because the distance to Jupiter changes, the giant's tidal pull stretches and relaxes Io twice each orbit, flexing its whole body. That constant flexing generates enormous frictional heat inside — TIDAL HEATING — which melts the interior and powers continuous, violent volcanic eruptions, the most intense in the solar system.",
    flex: "tidal flexing", heat: "interior heat",
    note: "As Io's distance to Jupiter varies, the tidal bulge grows and shrinks, kneading the moon. The friction heats its interior and erupts as volcanoes — no sunlight or radioactivity required.",
  },
  ja: {
    title: "イオ：火山の衛星",
    kind: "絞られて熱くなる",
    lede: "イオにはめぼしい放射性の核はなく、凍える外側の系にあります——それでも絶えず噴火します。公転するイオを木星の潮汐が変形させ、熱がたまる様子を見よう。",
    thread: "物語はつづく",
    threadText: "ガリレオ衛星は氷でできています——一つを除いて。イオは硫黄と溶岩の世界で、知られる中で最も火山活動が活発な天体です。その熱は誕生の内部からではなく、絶え間ない重力のマッサージから来ます。",
    key: "潮汐加熱が火山を動かす",
    keyText: "イオは木星の近くを、わずかに離心した軌道で回ります（エウロパやガニメデとの軌道共鳴で離心が保たれる）。木星までの距離が変わるため、巨人の潮汐力が公転ごとに2回イオを伸ばしては緩め、全身を変形させます。この絶え間ない変形が内部に膨大な摩擦熱——潮汐加熱——を生み、内部を溶かして、太陽系で最も激しい連続的な火山噴火を起こします。",
    flex: "潮汐変形", heat: "内部の熱",
    note: "イオと木星の距離が変わると潮汐の膨らみが伸び縮みし、衛星をこねます。その摩擦が内部を熱し、火山として噴き出します——日光も放射能も要りません。",
  },
};

function draw(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // Jupiter on the left
  const jx = 4, jy = H / 2, jR = H * 0.42;
  ctx.save(); ctx.beginPath(); ctx.arc(jx, jy, jR, 0, Math.PI * 2); ctx.clip();
  for (let i = 0; i < 8; i++) { ctx.fillStyle = i % 2 ? "#c98a4a" : "#e0b878"; ctx.fillRect(jx - jR, jy - jR + (i / 8) * 2 * jR, 2 * jR, 2 * jR / 8 + 1); }
  ctx.restore();
  // Io on an eccentric orbit: distance varies with the phase
  const ph = tt * 0.02;
  const orbCx = cw * 0.58, orbRx = cw * 0.3, orbRy = H * 0.32;
  const ix = orbCx + Math.cos(ph) * orbRx, iy = jy + Math.sin(ph) * orbRy;
  // orbit path
  ctx.strokeStyle = "rgba(150,175,230,0.2)"; ctx.beginPath(); ctx.ellipse(orbCx, jy, orbRx, orbRy, 0, 0, Math.PI * 2); ctx.stroke();
  // distance to Jupiter -> tidal stretch amount and heat
  const dist = Math.hypot(ix - jx, iy - jy);
  const near = clamp(1 - (dist - (orbCx - orbRx - jx)) / (2 * orbRx), 0, 1); // 1 when closest
  const stretch = 1 + near * 0.28; // tidal elongation toward Jupiter
  const heat = 0.3 + near * 0.7;
  // Io body, elongated toward Jupiter
  const ang = Math.atan2(jy - iy, jx - ix);
  ctx.save(); ctx.translate(ix, iy); ctx.rotate(ang);
  // heat glow
  ctx.fillStyle = `rgba(255,${120 - near * 60 | 0},40,${0.15 + heat * 0.25})`; ctx.beginPath(); ctx.ellipse(0, 0, 30 * stretch, 26, 0, 0, Math.PI * 2); ctx.fill();
  const g = ctx.createRadialGradient(-6, -6, 2, 0, 0, 24);
  g.addColorStop(0, "#f4e08a"); g.addColorStop(0.6, `rgb(230,${190 - near * 70 | 0},80)`); g.addColorStop(1, `rgb(${180 + near * 60 | 0},90,40)`);
  ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(0, 0, 22 * stretch, 20, 0, 0, Math.PI * 2); ctx.fill();
  // volcanic plumes when hot (near Jupiter)
  if (near > 0.5) { for (const s of [-1, 1]) { ctx.fillStyle = "rgba(255,220,180,0.5)"; ctx.beginPath(); ctx.moveTo(s * 8, -18); ctx.lineTo(s * 4, -34 - near * 14); ctx.lineTo(s * 14, -30 - near * 10); ctx.closePath(); ctx.fill(); } }
  ctx.restore();
  ctx.fillStyle = C.faint; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText("Io", ix, iy + 34);
  // heat meter
  const mw = Math.min(cw - 60, 300), mx = (cw - mw) / 2, my = H - 18;
  ctx.fillStyle = "rgba(120,150,210,0.2)"; ctx.fillRect(mx, my, mw, 8);
  const hg = ctx.createLinearGradient(mx, 0, mx + mw, 0); hg.addColorStop(0, "#ffcf6b"); hg.addColorStop(1, "#ff5a2a");
  ctx.fillStyle = hg; ctx.fillRect(mx, my, mw * heat, 8);
  ctx.fillStyle = C.faint; ctx.font = `10px ${mono}`; ctx.textAlign = "left"; ctx.fillText(t.heat, mx, my - 5);
}

export function IoVolcanic() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, 20, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, tt, lang); raf = requestAnimationFrame(loop); };
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

        <div style={{ marginTop: 4 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <div style={{ fontFamily: mono, fontSize: 12.5, marginTop: 8, color: C.muted }}>
          <span style={{ color: "#ff8f5a" }}>●</span> {t.flex} → {t.heat}
        </div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default IoVolcanic;
