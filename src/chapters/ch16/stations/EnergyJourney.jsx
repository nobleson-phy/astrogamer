/* ============================================================
   STATION 6 — ENERGY'S LONG JOURNEY OUT
   Energy made in the core crosses the radiative zone by RADIATION:
   photons are absorbed and re-emitted in random directions by the dense
   gas, taking a slow "random walk" that lasts 100,000 to 1,000,000 years
   to reach the surface. Meanwhile the whole star sits in HYDROSTATIC
   EQUILIBRIUM: outward gas pressure exactly balances inward gravity.
   Grounded in Ch.16 §16.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Energy's long journey out",
    kind: "A random walk, and a balance",
    lede: "Follow one packet of energy from the core. It doesn't fly straight out — it staggers, absorbed and re-emitted, for ages. Then see the balance that holds the whole star steady.",
    thread: "THE STORY CONTINUES",
    threadText: "The sunlight warming you today was made in the core long before humans existed. Its escape is a maddeningly slow zigzag through a wall of dense gas.",
    walkKey: "RADIATION: A 100,000-YEAR RANDOM WALK",
    walkText: "In the radiative zone (roughly 30% to 70% of the way out), energy moves by RADIATION: a photon is absorbed by the dense gas and re-emitted in a random new direction, over and over. This 'random walk' means energy generated in the core takes somewhere between 100,000 and 1,000,000 years to work its way to the surface — even though light would cross that distance in seconds if the path were clear.",
    balanceKey: "HYDROSTATIC EQUILIBRIUM HOLDS IT STEADY",
    balanceText: "Throughout all this, the Sun is in HYDROSTATIC EQUILIBRIUM: at every depth, the outward pressure of the hot gas exactly balances the inward pull of gravity. If pressure rose, the star would expand and cool; if gravity won, it would contract and heat. This steady balance is why the Sun neither collapses nor explodes, holding a constant size for billions of years.",
    walk: "Photon random walk", balance: "Hydrostatic equilibrium",
    time: "time so far", gravity: "gravity (in)", pressure: "pressure (out)",
    noteW: "In the radiative zone, photons random-walk — absorbed and re-emitted endlessly — so core energy takes 100,000–1,000,000 years to reach the surface.",
    noteB: "Hydrostatic equilibrium: outward gas pressure exactly balances inward gravity at every depth, keeping the Sun a steady size for billions of years.",
  },
  ja: {
    title: "エネルギーの長い旅",
    kind: "ランダムウォークと、釣り合い",
    lede: "核から出る一つのエネルギーの塊を追おう。まっすぐ飛び出さず——吸収と再放出でよろめき、途方もない時間をかけます。そして星全体を安定に保つ釣り合いを見よう。",
    thread: "物語はつづく",
    threadText: "今日あなたを温める太陽光は、人類が現れるずっと前に核で作られました。その脱出は、濃いガスの壁を抜けるいらだたしいほど遅いジグザグです。",
    walkKey: "放射：10万年のランダムウォーク",
    walkText: "放射層（外へ約30%〜70%）では、エネルギーは放射で移動します：光子が濃いガスに吸収され、ランダムな新しい方向に再放出される、その繰り返しです。この「ランダムウォーク」のため、核で生じたエネルギーが表面に達するのに10万年から100万年かかります——経路がまっすぐなら光は数秒で横切る距離なのに。",
    balanceKey: "静水圧平衡が安定を保つ",
    balanceText: "この間ずっと、太陽は静水圧平衡にあります：どの深さでも、熱いガスの外向きの圧力が内向きの重力とちょうど釣り合っています。圧力が上がれば星は膨張して冷え、重力が勝てば収縮して熱くなります。この安定した釣り合いのおかげで、太陽は潰れも爆発もせず、数十億年一定の大きさを保ちます。",
    walk: "光子のランダムウォーク", balance: "静水圧平衡",
    time: "経過時間", gravity: "重力（内）", pressure: "圧力（外）",
    noteW: "放射層では光子がランダムウォーク——延々と吸収・再放出——するため、核のエネルギーが表面に達するのに10万〜100万年かかります。",
    noteB: "静水圧平衡：外向きのガス圧がどの深さでも内向きの重力とちょうど釣り合い、太陽を数十億年一定の大きさに保ちます。",
  },
};

let walk = null;
function drawWalk(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  const cx = cw / 2, cy = H / 2, R = Math.min(cw * 0.34, H * 0.46);
  ctx.clearRect(0, 0, cw, H);
  // sun body with core + radiative zone
  ctx.fillStyle = "rgba(255,180,80,0.10)"; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "rgba(255,200,120,0.3)"; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = "rgba(255,242,192,0.5)"; ctx.beginPath(); ctx.arc(cx, cy, R * 0.28, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(lang === "ja" ? "核" : "core", cx, cy + 3);
  // random walk path built up over time, drifting slowly outward
  if (!walk || walk.pts.length === 0 || tt < 2) { walk = { pts: [{ x: cx, y: cy }], r: 0 }; }
  if (walk.pts.length < 400 && tt % 2 === 0) {
    const last = walk.pts[walk.pts.length - 1];
    const ang = Math.random() * Math.PI * 2;
    const targetOut = Math.atan2(last.y - cy, last.x - cx);
    // bias slightly outward
    const bias = 0.35;
    const a = ang * (1 - bias) + targetOut * bias;
    const step = 6;
    let nx = last.x + Math.cos(a) * step, ny = last.y + Math.sin(a) * step;
    if (Math.hypot(nx - cx, ny - cy) > R * 0.95) { walk.pts = [{ x: cx, y: cy }]; nx = cx; ny = cy; }
    walk.pts.push({ x: nx, y: ny });
  }
  ctx.strokeStyle = "rgba(255,210,140,0.7)"; ctx.lineWidth = 1;
  ctx.beginPath(); walk.pts.forEach((p, i) => { if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); }); ctx.stroke();
  const head = walk.pts[walk.pts.length - 1];
  ctx.fillStyle = "#fff2c0"; ctx.beginPath(); ctx.arc(head.x, head.y, 3, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "rgba(255,200,120,0.8)"; ctx.font = `9px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(lang === "ja" ? "放射層（吸収・再放出）" : "radiative zone (absorb / re-emit)", 8, 16);
}

function drawBalance(ctx, cw, H, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2, R = Math.min(cw * 0.3, H * 0.42);
  const g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.2, cx, cy, R);
  g.addColorStop(0, "#ffe08a"); g.addColorStop(1, "#e8952a");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
  // inward gravity arrows (from outside toward center) and outward pressure arrows (from inside out)
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
    const ox = cx + Math.cos(a) * (R + 26), oy = cy + Math.sin(a) * (R + 26);
    const ix = cx + Math.cos(a) * (R + 6), iy = cy + Math.sin(a) * (R + 6);
    // gravity inward (blue)
    ctx.strokeStyle = "rgba(120,170,255,0.8)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ix, iy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ix, iy); ctx.lineTo(ix + Math.cos(a + 2.4) * 5, iy + Math.sin(a + 2.4) * 5); ctx.lineTo(ix + Math.cos(a - 2.4) * 5, iy + Math.sin(a - 2.4) * 5); ctx.closePath(); ctx.fillStyle = "rgba(120,170,255,0.8)"; ctx.fill();
    // pressure outward (orange) from mid radius
    const mx = cx + Math.cos(a) * (R * 0.5), my = cy + Math.sin(a) * (R * 0.5);
    const px = cx + Math.cos(a) * (R * 0.9), py = cy + Math.sin(a) * (R * 0.9);
    ctx.strokeStyle = "rgba(255,200,120,0.9)"; ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(px, py); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + Math.cos(a + Math.PI + 2.4) * 5, py + Math.sin(a + Math.PI + 2.4) * 5); ctx.lineTo(px + Math.cos(a + Math.PI - 2.4) * 5, py + Math.sin(a + Math.PI - 2.4) * 5); ctx.closePath(); ctx.fillStyle = "rgba(255,200,120,0.9)"; ctx.fill();
  }
  ctx.fillStyle = "#8fb0ff"; ctx.font = `10px ${mono}`; ctx.textAlign = "left"; ctx.fillText(t.gravity, 8, 16);
  ctx.fillStyle = "#ffc078"; ctx.textAlign = "right"; ctx.fillText(t.pressure, cw - 8, 16);
  ctx.fillStyle = C.sun; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText("=", cx, cy + 4);
}

export function EnergyJourney() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("walk");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    walk = null;
    if (mode === "balance") { drawBalance(ctx, cw, H, lang); return; }
    if (reduceMotion) { drawWalk(ctx, cw, H, 2, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; drawWalk(ctx, cw, H, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, mode, lang]);

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
          <div style={{ ...styles.fateLabel, color: C.sun }}>{mode === "walk" ? t.walkKey : t.balanceKey}</div>
          <p style={styles.keyTermText}>{mode === "walk" ? t.walkText : t.balanceText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          {[["walk", t.walk], ["balance", t.balance]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        {mode === "walk" && <div style={{ fontFamily: mono, fontSize: 11.5, color: C.cool, marginTop: 8 }}>{lang === "ja" ? "核から表面まで：10万〜100万年" : "core to surface: 100,000–1,000,000 years"}</div>}
        <p style={{ ...styles.note, maxWidth: "none" }}>{mode === "walk" ? t.noteW : t.noteB}</p>
      </div>
    </div>
  );
}

export default EnergyJourney;
