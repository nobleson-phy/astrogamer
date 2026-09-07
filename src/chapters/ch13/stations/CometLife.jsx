/* ============================================================
   STATION 6 — A COMET'S LIFE & FATE
   Comets are the most primitive samples of the early solar system —
   frozen near absolute zero for billions of years. Each pass near the
   Sun vaporizes some of their volatile ices (which is why they brighten
   and grow a coma), and after many passes they lose all their ices,
   crumbling to dust or becoming dark, inactive "dead" comets. Halley
   predicted a comet's return; ESA's Rosetta orbited 67P and landed
   Philae on it. Grounded in Ch.13 §13.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "A comet's life & fate",
    kind: "Brilliant, primitive, and doomed",
    lede: "Drag the number of trips around the Sun. Each pass boils away more ice — watch the comet blaze, then fade, until nothing volatile is left and only a dead husk remains.",
    thread: "THE STORY CONTINUES",
    threadText: "A comet's glory is also its undoing. The same sunlight that lights its tail is slowly destroying it — every spectacular return costs it some of the ancient ice it has carried since the solar system was born.",
    key: "PRIMITIVE SAMPLES THAT SLOWLY DIE",
    keyText: "Because comets have spent almost their entire existence frozen near absolute zero in the deep outer solar system, they preserve their original composition unchanged — they are the most primitive chemical samples of the early solar system. But every time a comet enters the inner solar system, solar heat vaporizes some of its volatile ices, releasing the gas and dust that make it brighten and grow a coma. Repeat this enough and the comet loses all its ices, disintegrating into dust or becoming an inactive, dark 'dead' object. Edmond Halley first predicted a comet's return; ESA's Rosetta orbited Comet 67P and landed the Philae probe on it.",
    passes: "Perihelion passes",
    volatiles: "Volatiles remaining",
    alive: "active comet", dead: "dead comet — ices gone",
    halley: "Halley — predicted a comet's return",
    rosetta: "Rosetta + Philae — orbited & landed on 67P",
    note: "Frozen for billions of years, comets are pristine samples. Solar heat vaporizes their ices (brightening them), and after many passes they die — as dust or a dark, inactive husk.",
  },
  ja: {
    title: "彗星の生と死",
    kind: "輝かしく、始原的で、そして滅びゆく",
    lede: "太陽をまわる回数をドラッグしよう。通過ごとに氷が蒸発していく——彗星が燃え、やがて色あせ、揮発物が尽きて死んだ殻だけが残るまでを見よう。",
    thread: "物語はつづく",
    threadText: "彗星の栄光は、その破滅でもあります。尾を照らすのと同じ太陽光が、ゆっくりとそれを壊しています——華々しい回帰のたびに、太陽系の誕生以来運んできた古代の氷を少しずつ失うのです。",
    key: "始原的なサンプル、そして緩やかな死",
    keyText: "彗星は存在のほぼ全期間を、外太陽系の奥深くで絶対零度近くに凍って過ごしてきたため、元の組成を変えずに保っています——初期太陽系の最も始原的な化学的サンプルです。しかし彗星が内太陽系に入るたび、太陽の熱がその揮発性の氷を蒸発させ、明るくなってコマを作るガスと塵を放出します。これを十分に繰り返すと、彗星は氷をすべて失い、塵に崩壊するか、不活発で暗い「死んだ」天体になります。エドモンド・ハレーは初めて彗星の回帰を予言し、ESAのロゼッタは彗星67Pを周回してフィラエ・プローブを着陸させました。",
    passes: "近日点通過の回数",
    volatiles: "残る揮発物",
    alive: "活動的な彗星", dead: "死んだ彗星——氷は尽きた",
    halley: "ハレー——彗星の回帰を予言",
    rosetta: "ロゼッタ＋フィラエ——67Pを周回・着陸",
    note: "何十億年も凍っていた彗星は手つかずのサンプルです。太陽の熱が氷を蒸発させ（明るくなり）、多くの通過の後に死にます——塵として、あるいは暗く不活発な殻として。",
  },
};

function draw(ctx, cw, H, tt, passes, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const sunX = cw * 0.32, sunY = H / 2;
  const vol = clamp(1 - passes / 30, 0, 1); // volatiles remaining
  const dead = vol <= 0.02;
  // Sun
  const sg = ctx.createRadialGradient(sunX, sunY, 2, sunX, sunY, 30);
  sg.addColorStop(0, "#fff2c0"); sg.addColorStop(1, "rgba(255,180,60,0)");
  ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(sunX, sunY, 30, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffd86b"; ctx.beginPath(); ctx.arc(sunX, sunY, 11, 0, Math.PI * 2); ctx.fill();
  // elliptical orbit, Sun at focus
  const a = Math.min(cw * 0.3, cw / 2 - 30), b = H * 0.34, cfoc = a * 0.6;
  const ecx = sunX + cfoc;
  ctx.strokeStyle = "rgba(150,175,230,0.15)"; ctx.beginPath(); ctx.ellipse(ecx, sunY, a, b, 0, 0, Math.PI * 2); ctx.stroke();
  const ph = tt * 0.012;
  const px = ecx + Math.cos(ph) * a, py = sunY + Math.sin(ph) * b;
  const dx = px - sunX, dy = py - sunY, d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d;
  const near = 1 - Math.min(d / (a + cfoc), 1);
  // tail only when alive and near the Sun
  if (!dead) {
    const tailLen = (30 + near * 130) * vol;
    const ig = ctx.createLinearGradient(px, py, px + ux * tailLen, py + uy * tailLen);
    ig.addColorStop(0, `rgba(140,200,255,${0.7 * vol})`); ig.addColorStop(1, "rgba(140,200,255,0)");
    ctx.strokeStyle = ig; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + ux * tailLen, py + uy * tailLen); ctx.stroke();
    // dust tail curved
    const mvx = -Math.sin(ph), mvy = Math.cos(ph);
    const dg = ctx.createLinearGradient(px, py, px + ux * tailLen, py + uy * tailLen);
    dg.addColorStop(0, `rgba(245,225,170,${0.5 * vol})`); dg.addColorStop(1, "rgba(245,225,170,0)");
    ctx.strokeStyle = dg; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(px, py);
    ctx.quadraticCurveTo(px + ux * tailLen * 0.5 - mvx * tailLen * 0.3, py + uy * tailLen * 0.5 - mvy * tailLen * 0.3, px + ux * tailLen * 0.8 - mvx * tailLen * 0.5, py + uy * tailLen * 0.8 - mvy * tailLen * 0.5); ctx.stroke();
    // coma
    const cg = ctx.createRadialGradient(px, py, 1, px, py, 6 + near * 8 * vol);
    cg.addColorStop(0, "rgba(220,240,255,0.9)"); cg.addColorStop(1, "rgba(180,220,255,0)");
    ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(px, py, 6 + near * 8 * vol, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#e8eef6";
  } else {
    ctx.fillStyle = "#4a453d"; // dark dead nucleus
  }
  ctx.beginPath(); ctx.arc(px, py, 3.5, 0, Math.PI * 2); ctx.fill();
  // status label
  ctx.font = `10px ${mono}`; ctx.textAlign = "left";
  ctx.fillStyle = dead ? C.bad : C.good;
  ctx.fillText(dead ? t.dead : t.alive, 8, H - 10);
}

export function CometLife() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [passes, setPasses] = useState(0);
  const passesRef = useRef(0);
  passesRef.current = passes;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, 60, passesRef.current, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, tt, passesRef.current, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

  const vol = Math.max(0, Math.round((1 - passes / 30) * 100));

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

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.passes}</span>
          <input type="range" min="0" max="30" step="1" value={passes}
            onChange={(e) => setPasses(parseInt(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
          <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, width: 26, textAlign: "right" }}>{passes}</span>
        </div>
        <div style={{ fontFamily: mono, fontSize: 12, color: vol > 20 ? C.good : C.bad, marginBottom: 8 }}>
          {t.volatiles}: {vol}%
        </div>

        <div style={{ marginTop: 4 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
          <span style={{ fontFamily: mono, fontSize: 11.5, color: C.cool, border: `1px solid ${C.border}`, borderRadius: 8, padding: "4px 10px" }}>☄ {t.halley}</span>
          <span style={{ fontFamily: mono, fontSize: 11.5, color: C.cool, border: `1px solid ${C.border}`, borderRadius: 8, padding: "4px 10px" }}>🛰 {t.rosetta}</span>
        </div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default CometLife;
