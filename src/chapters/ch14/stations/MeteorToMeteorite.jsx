/* ============================================================
   STATION 3 — METEOR TO METEORITE
   Three words for one falling rock. In space it is a METEOROID. As it
   burns through the atmosphere it makes a glowing streak, the METEOR
   (a very bright one is a FIREBALL). If a piece survives to reach the
   ground, that piece is a METEORITE. Famously, in September 1938 a
   meteorite crashed through a garage roof and lodged in the seat of a
   Pontiac Coupe. Grounded in Ch.14 §14.1.
   ============================================================ */
import React, { useRef, useEffect, useState } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Meteor to meteorite",
    kind: "Three names for one rock",
    lede: "Watch a single rock fall. It changes its name three times on the way down — and only the survivor gets to be a meteorite.",
    thread: "THE STORY CONTINUES",
    threadText: "Most debris never reaches us: it flares and vanishes high above. But now and then a fragment makes it all the way to the ground — sometimes with a very rude arrival.",
    key: "METEOROID → METEOR → METEORITE",
    keyText: "The same object has three names depending on where it is. In space it is a METEOROID. When it plunges into the atmosphere and heats to incandescence, the glowing streak we see is a METEOR (an especially brilliant one is called a FIREBALL). If any solid piece survives the fiery plunge and reaches the ground, that recovered piece is a METEORITE. In September 1938 one dramatically crashed through the roof of a garage and embedded itself in the seat of a Pontiac Coupe.",
    space: "in space: METEOROID", air: "in the air: METEOR", fireball: "very bright: FIREBALL", ground: "on the ground: METEORITE",
    car: "1938: through a garage roof, into a Pontiac Coupe's seat",
    note: "In space it's a meteoroid; the glowing streak is a meteor (a brilliant one, a fireball); the piece that reaches the ground is a meteorite — like the 1938 rock that hit a Pontiac Coupe.",
  },
  ja: {
    title: "流星から隕石へ",
    kind: "一つの岩に3つの名前",
    lede: "一つの岩が落ちる様子を見よう。落下の途中で3回名前が変わり——生き延びたものだけが隕石になれます。",
    thread: "物語はつづく",
    threadText: "ほとんどの破片は私たちに届きません：はるか上空で光って消えます。しかし時々、破片が地面まで到達します——時にとても無礼な到着とともに。",
    key: "メテオロイド → メテオ → メテオライト",
    keyText: "同じ天体が、どこにあるかで3つの名前を持ちます。宇宙空間ではメテオロイド（流星物質）。大気に突入して白熱するまで熱せられると、見える光の筋がメテオ（流星）です（特に明るいものは火球と呼ばれます）。もし固体の破片が燃える落下を生き延びて地面に達すれば、回収されたその破片がメテオライト（隕石）です。1938年9月、ある隕石が劇的にガレージの屋根を突き破り、ポンティアック・クーペの座席に埋まりました。",
    space: "宇宙で：メテオロイド", air: "大気中で：メテオ（流星）", fireball: "特に明るい：火球", ground: "地面で：メテオライト（隕石）",
    car: "1938年：ガレージの屋根を貫き、ポンティアック・クーペの座席へ",
    note: "宇宙では流星物質、光の筋は流星（明るければ火球）、地面に達した破片が隕石です——1938年にポンティアック・クーペを直撃した岩のように。",
  },
};

function draw(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const airTop = H * 0.42, gy = H * 0.82;
  // space (top)
  for (let i = 0; i < 30; i++) { const x = (i * 89) % cw, y = (i * 47) % (airTop | 0); ctx.fillStyle = "rgba(200,210,235,0.3)"; ctx.fillRect(x, y, 1, 1); }
  // atmosphere band
  const ag = ctx.createLinearGradient(0, airTop, 0, gy);
  ag.addColorStop(0, "rgba(40,60,110,0.15)"); ag.addColorStop(1, "rgba(80,120,180,0.28)");
  ctx.fillStyle = ag; ctx.fillRect(0, airTop, cw, gy - airTop);
  // ground
  ctx.fillStyle = "#1a2416"; ctx.fillRect(0, gy, cw, H - gy);
  // trajectory
  const cyc = tt % 260, p = cyc / 260;
  const x0 = cw * 0.2, x1 = cw * 0.6;
  const y = -20 + p * (gy + 20);
  const x = x0 + p * (x1 - x0);
  const inAir = y > airTop && y < gy;
  const landed = y >= gy;
  // garage/car near landing point
  const carX = x1, carY = gy;
  ctx.fillStyle = "#3a4658"; ctx.fillRect(carX - 26, carY - 14, 52, 12); // body
  ctx.fillStyle = "#2a3444"; ctx.fillRect(carX - 16, carY - 22, 30, 10); // cabin
  ctx.fillStyle = "#11151c"; ctx.beginPath(); ctx.arc(carX - 16, carY, 5, 0, Math.PI * 2); ctx.arc(carX + 16, carY, 5, 0, Math.PI * 2); ctx.fill();
  if (!landed) {
    // falling rock; glowing streak while in air
    if (inAir) {
      const g = ctx.createLinearGradient(x - 10, y - 26, x, y);
      g.addColorStop(0, "rgba(255,180,80,0)"); g.addColorStop(1, "rgba(255,220,150,0.9)");
      ctx.strokeStyle = g; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - 10, y - 26); ctx.lineTo(x, y); ctx.stroke();
      const gl = ctx.createRadialGradient(x, y, 1, x, y, 8);
      gl.addColorStop(0, "rgba(255,240,200,0.95)"); gl.addColorStop(1, "rgba(255,150,60,0)");
      ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = inAir ? "#ffcf8a" : "#8a7f6f"; ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
  } else {
    // embedded in the car seat
    ctx.fillStyle = "#8a7f6f"; ctx.beginPath(); ctx.arc(carX, carY - 16, 4, 0, Math.PI * 2); ctx.fill();
  }
  // stage label
  ctx.font = `11px ${mono}`; ctx.textAlign = "left";
  let label = t.space, col = C.cool;
  if (landed) { label = t.ground; col = C.good; }
  else if (inAir) { label = t.air; col = "#ffcf8a"; }
  ctx.fillStyle = col; ctx.fillText(label, 10, 18);
  if (landed) { ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.fillText(t.car, 10, H - 8); }
}

export function MeteorToMeteorite() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, 255, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 03</div>
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

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default MeteorToMeteorite;
