/* ============================================================
   STATION 8 — ORBITS, ESCAPE & SPACEFLIGHT
   Newton's cannonball: fire a projectile horizontally and vary the
   launch speed. Below ~8 km/s it falls back to Earth; near 8 km/s it
   falls "around" Earth in a circular orbit; at ~11 km/s it reaches
   escape speed and leaves forever. Reveal cards cover weightlessness
   (free fall), gravity assists, and the prediction of Neptune.
   Grounded in Ch.3 §3.5 & §3.6.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Orbits, escape & spaceflight",
    kind: "Falling around the Earth",
    lede: "Newton imagined a cannon on a mountain firing ever faster. Slide the launch speed: too slow and the shot falls back; near 8 km/s it falls around Earth forever; at 11 km/s it escapes into deep space.",
    thread: "FALLING AROUND, NOT DOWN",
    threadText: "A satellite does not defy gravity — it is falling constantly, but moving sideways so fast that the ground curves away beneath it just as quickly. Fall fast enough sideways and you fall around the world instead of into it.",
    speed: "Launch speed", slide: "Set the launch speed:",
    fallback: "Falls back to Earth", orbit: "Circular orbit", escape: "Escapes Earth",
    orbitAt: "≈ 8 km/s — circular satellite velocity", escapeAt: "≈ 11 km/s — escape speed",
    reveals: "Explore further:",
    cards: [
      {
        id: "weightless", q: { en: "Why do astronauts float?", ja: "宇宙飛行士はなぜ浮くのか？" },
        a: {
          en: "Not because gravity is gone — it is nearly as strong up there as on the ground. The station and everyone in it are in continuous free fall, falling around Earth together, so there is nothing to press against. That is weightlessness.",
          ja: "重力が消えたからではありません——そこでの重力は地上とほぼ同じ強さです。ステーションと乗員はいっしょに絶え間なく自由落下し、地球のまわりを落ち続けています。だから押し合うものがなく、これが無重量です。",
        },
      },
      {
        id: "assist", q: { en: "What is a gravity assist?", ja: "重力アシストとは？" },
        a: {
          en: "A spacecraft flies close to a moving planet and borrows some of the planet's energy, using its gravity to speed up or change direction — reaching distant targets without burning extra fuel. Voyager 2 hopped from Jupiter to Saturn, Uranus and Neptune this way.",
          ja: "宇宙船は動いている惑星のそばを通り、その重力を使って加速したり向きを変えたりして、惑星のエネルギーを少し借ります——余分な燃料を使わずに遠くの目標へ到達できます。ボイジャー2号はこうして木星から土星、天王星、海王星へと渡っていきました。",
        },
      },
      {
        id: "neptune", q: { en: "How was Neptune found on paper?", ja: "海王星はどう「紙の上で」見つかったか？" },
        a: {
          en: "Uranus kept drifting off its predicted path. Adams and Le Verrier assumed an unseen planet was tugging it — a perturbation — and calculated where that planet must be. Neptune was found within a degree of the prediction: a triumph proving Newton's laws are universal.",
          ja: "天王星は予測された道からずれ続けました。アダムズとルヴェリエは、見えない惑星が引っぱっている——摂動——と考え、その惑星があるべき位置を計算しました。海王星は予測から1度以内で見つかり、ニュートンの法則が普遍的であることを証明する勝利となりました。",
        },
      },
    ],
  },
  ja: {
    title: "軌道・脱出・宇宙飛行",
    kind: "地球のまわりを落ち続ける",
    lede: "ニュートンは、山の上の大砲がだんだん速く撃つ様子を思い描きました。打ち出す速さを動かそう：遅すぎれば弾は落ち、毎秒8キロメートル付近では地球のまわりをいつまでも落ち続け、毎秒11キロメートルで深宇宙へ脱出します。",
    thread: "落ちるが、下へではなく周りへ",
    threadText: "衛星は重力に逆らっているのではありません——絶えず落ちていますが、横へとても速く動くので、地面が同じだけ下に湾曲して逃げていきます。横へ十分速く落ちれば、世界の中へではなく、世界のまわりを落ちるのです。",
    speed: "打ち出し速度", slide: "打ち出し速度を設定：",
    fallback: "地球に落ちる", orbit: "円軌道", escape: "地球を脱出",
    orbitAt: "毎秒約8キロメートル——円軌道速度", escapeAt: "毎秒約11キロメートル——脱出速度",
    reveals: "さらに探る：",
    cards: [
      { id: "weightless", q: { en: "宇宙飛行士はなぜ浮くのか？", ja: "宇宙飛行士はなぜ浮くのか？" },
        a: { en: "", ja: "重力が消えたからではありません——そこでの重力は地上とほぼ同じ強さです。ステーションと乗員はいっしょに絶え間なく自由落下し、地球のまわりを落ち続けています。だから押し合うものがなく、これが無重量です。" } },
      { id: "assist", q: { en: "重力アシストとは？", ja: "重力アシストとは？" },
        a: { en: "", ja: "宇宙船は動いている惑星のそばを通り、その重力を使って加速したり向きを変えたりして、惑星のエネルギーを少し借ります——余分な燃料を使わずに遠くの目標へ到達できます。ボイジャー2号はこうして木星から土星、天王星、海王星へと渡っていきました。" } },
      { id: "neptune", q: { en: "海王星はどう「紙の上で」見つかったか？", ja: "海王星はどう「紙の上で」見つかったか？" },
        a: { en: "", ja: "天王星は予測された道からずれ続けました。アダムズとルヴェリエは、見えない惑星が引っぱっている——摂動——と考え、その惑星があるべき位置を計算しました。海王星は予測から1度以内で見つかり、ニュートンの法則が普遍的であることを証明する勝利となりました。" } },
    ],
  },
};

/* Newton's-cannonball integration under inverse-square gravity.
   Returns a path (array of [x,y]) and an outcome flag. */
function computePath(cx, cy, Re, h, vKms) {
  const r0 = Re + h;
  const GM = 64 * r0;             // calibrate so v=8 → circular
  let x = 0, y = -r0;             // launch atop the mountain
  let vx = vKms, vy = 0;          // horizontal launch (km/s ≈ sim units)
  const dt = 0.06;
  const path = [[cx + x, cy + y]];
  let outcome = "orbit";
  for (let i = 0; i < 6000; i++) {
    const r = Math.hypot(x, y);
    if (r <= Re) { outcome = "fallback"; break; }
    if (r > r0 * 6) { outcome = "escape"; break; }
    const g = GM / (r * r);
    vx += -g * (x / r) * dt;
    vy += -g * (y / r) * dt;
    x += vx * dt; y += vy * dt;
    path.push([cx + x, cy + y]);
  }
  return { path, outcome };
}

function draw(ctx, cw, H, geo, path, marker) {
  const { cx, cy, Re, h } = geo;
  ctx.clearRect(0, 0, cw, H);
  // Earth
  const g = ctx.createRadialGradient(cx - Re * 0.3, cy - Re * 0.3, Re * 0.2, cx, cy, Re);
  g.addColorStop(0, "#5a92cf"); g.addColorStop(1, "#183a63");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, Re, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "rgba(99,211,240,0.35)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(cx, cy, Re, 0, Math.PI * 2); ctx.stroke();
  // mountain + cannon at top
  ctx.fillStyle = "#8a6a4a"; ctx.beginPath();
  ctx.moveTo(cx - 8, cy - Re); ctx.lineTo(cx + 8, cy - Re); ctx.lineTo(cx + 2, cy - Re - h); ctx.lineTo(cx - 2, cy - Re - h); ctx.closePath(); ctx.fill();
  // trajectory
  ctx.strokeStyle = C.sun; ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < path.length; i++) {
    const p = path[i];
    i === 0 ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]);
  }
  ctx.stroke();
  // moving projectile
  if (path.length) {
    const p = path[Math.min(marker, path.length - 1)];
    ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(p[0], p[1], 4.5, 0, Math.PI * 2); ctx.fill();
  }
}

export function Spaceflight() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 380;
  const canvasRef = useRef(null);
  const [v, setV] = useState(8);
  const [open, setOpen] = useState(null);
  const markerRef = useRef(0);
  const cw = Math.min(w, 760);

  const outcome = v < 8 ? "fallback" : v < 11 ? "orbit" : "escape";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, cw, H);
    const geo = { cx: cw / 2, cy: H / 2, Re: Math.min(cw, H) * 0.24, h: 16 };
    const { path } = computePath(geo.cx, geo.cy, geo.Re, geo.h, v);
    markerRef.current = 0;
    if (reduceMotion) { draw(ctx, cw, H, geo, path, path.length - 1); return; }
    let raf;
    const loop = () => {
      markerRef.current = (markerRef.current + 6) % Math.max(1, path.length);
      draw(ctx, cw, H, geo, path, markerRef.current);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, v]);

  const label = outcome === "fallback" ? t.fallback : outcome === "orbit" ? t.orbit : t.escape;
  const labelColor = outcome === "fallback" ? C.danger : outcome === "orbit" ? C.good : C.cool;

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 08</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 12 }}>
          <span style={{ fontFamily: mono, fontSize: 31, color: C.sun }}>{v}</span>
          <span style={{ color: C.muted, fontSize: 15 }}>km/s</span>
        </div>
        <div style={{ ...styles.fateBox, borderColor: labelColor, background: "rgba(99,211,240,0.05)" }}>
          <div style={{ ...styles.fateLabel, color: labelColor }}>{label}</div>
          <p style={styles.pathText}>
            {outcome === "orbit" ? t.orbitAt : outcome === "escape" ? t.escapeAt : (v < 8 ? "< 8 km/s" : "")}
          </p>
        </div>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{t.threadText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>
        <canvas ref={canvasRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginTop: 10 }}>{t.slide}</div>
        <input type="range" min={4} max={14} step={1} value={v} onChange={(e) => setV(parseInt(e.target.value, 10))} style={styles.range} />
        <div style={styles.rangeEnds}><span>4 km/s</span><span>8</span><span>11</span><span>14 km/s</span></div>

        {/* reveal cards */}
        <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginTop: 18 }}>{t.reveals}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
          {t.cards.map((c) => {
            const isOpen = open === c.id;
            return (
              <div key={c.id} style={{ border: `1px solid ${isOpen ? C.borderBright : C.border}`, borderRadius: 12, background: "rgba(8,12,26,0.6)", overflow: "hidden" }}>
                <button onClick={() => setOpen(isOpen ? null : c.id)}
                  style={{ width: "100%", textAlign: "left", background: "transparent", border: "none", color: C.text, cursor: "pointer", padding: "12px 14px", fontFamily: display, fontSize: 17, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                  <span>{tr(c.q, lang)}</span>
                  <span style={{ color: C.cool, fontFamily: mono, fontSize: 18 }}>{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <p style={{ ...styles.factText, margin: 0, padding: "0 14px 14px" }}>{tr(c.a, lang)}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Spaceflight;
