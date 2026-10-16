/* ============================================================
   STATION 1 — THE EQUIVALENCE PRINCIPLE
   Einstein's deepest starting point: inside a sealed cabin you CANNOT tell
   whether you are sitting on Earth's surface or riding a rocket accelerating
   at 1 g in deep space. A dropped ball falls identically; you feel the same
   weight. GRAVITY AND ACCELERATION ARE LOCALLY INDISTINGUISHABLE. Grounded
   in Ch.24.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The equivalence principle",
    kind: "Gravity and acceleration, side by side",
    lede: "Switch between a rocket accelerating at 1 g in deep space and a cabin on Earth's surface. Drop the ball. In both, it falls the very same way — and you cannot tell which is which.",
    thread: "THE JOURNEY BEGINS",
    threadText: "To understand a black hole, start with Einstein's simplest thought experiment — a sealed cabin, a dropped ball, and a question with no answer from the inside.",
    key: "GRAVITY AND ACCELERATION ARE LOCALLY INDISTINGUISHABLE",
    keyText: "Imagine a windowless cabin. In one, the cabin rests on Earth and the ball falls because of GRAVITY. In the other, the cabin is a rocket accelerating at 1 g through deep space, and the ball 'falls' only because the floor rushes up to meet it. From inside, every measurement — the weight you feel, the path the ball takes, the time it takes to land — is identical. There is no experiment you can do locally to tell gravity from acceleration. This is Einstein's EQUIVALENCE PRINCIPLE, and it is the seed of general relativity: if gravity behaves exactly like acceleration, then gravity may not be a force at all, but a feature of spacetime itself.",
    rocket: "Rocket (1 g, deep space)",
    earth: "Cabin on Earth",
    drop: "Drop the ball",
    reset: "Reset",
    rocketCap: "the floor accelerates up to meet the ball",
    earthCap: "gravity pulls the ball down to the floor",
    same: "same fall, same weight — indistinguishable",
    note: "The equivalence principle says a uniform gravitational field is physically equivalent to a uniformly accelerating frame. No local experiment can tell them apart — the starting point of general relativity.",
  },
  ja: {
    title: "等価原理",
    kind: "重力と加速度を並べて",
    lede: "深宇宙で1gで加速するロケットと、地表のキャビンを切り替えよう。ボールを落とそう。どちらでもまったく同じように落ち——どちらがどちらか区別できません。",
    thread: "旅のはじまり",
    threadText: "ブラックホールを理解するには、アインシュタインの最も単純な思考実験から始めよう——密閉されたキャビン、落とすボール、そして内側からは答えの出ない問い。",
    key: "重力と加速度は局所的に区別できない",
    keyText: "窓のないキャビンを想像してください。一方ではキャビンは地球の上に静止し、ボールは重力で落ちます。もう一方ではキャビンは深宇宙を1gで加速するロケットで、ボールは床が駆け上がってくるからこそ「落ち」ます。内側から見ると、あらゆる測定——感じる重さ、ボールのたどる経路、着地までの時間——がまったく同じです。局所的に行える実験では、重力と加速度を見分けることはできません。これがアインシュタインの等価原理で、一般相対性理論の種です：重力が加速度とそっくりに振る舞うなら、重力は力ではなく、時空そのものの性質なのかもしれません。",
    rocket: "ロケット（1g・深宇宙）",
    earth: "地球上のキャビン",
    drop: "ボールを落とす",
    reset: "リセット",
    rocketCap: "床が加速してボールに迫る",
    earthCap: "重力がボールを床へ引く",
    same: "同じ落下、同じ重さ——区別できない",
    note: "等価原理は、一様な重力場は一様に加速する系と物理的に等価だと述べます。局所的な実験ではどちらか見分けられません——一般相対性理論の出発点です。",
  },
};

function draw(ctx, cw, H, mode, ball, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cabinX = cw * 0.5 - 70, cabinW = 140;
  const cabinTop = 34, cabinH = H - 90;
  const floorY = cabinTop + cabinH;

  // star background only for rocket
  if (mode === "rocket") {
    ctx.fillStyle = "rgba(160,190,250,0.55)";
    for (let i = 0; i < 26; i++) {
      const sx = (i * 73) % cw, sy = (i * 131 + ball * 3) % H;
      ctx.fillRect(sx, sy, 1.6, 1.6);
    }
  } else {
    // ground hatching under the cabin
    ctx.fillStyle = "rgba(120,150,210,0.14)";
    ctx.fillRect(0, floorY + 2, cw, H - floorY - 2);
    ctx.strokeStyle = "rgba(150,180,240,0.3)"; ctx.lineWidth = 1;
    for (let gx = 0; gx < cw; gx += 16) {
      ctx.beginPath(); ctx.moveTo(gx, floorY + 2); ctx.lineTo(gx - 10, H); ctx.stroke();
    }
  }

  // cabin walls
  ctx.strokeStyle = C.borderBright; ctx.lineWidth = 2;
  ctx.strokeRect(cabinX, cabinTop, cabinW, cabinH);

  // rocket flame below cabin
  if (mode === "rocket") {
    const fl = 24 + 10 * Math.sin(ball * 0.3);
    const g = ctx.createLinearGradient(0, floorY, 0, floorY + fl);
    g.addColorStop(0, "rgba(255,180,80,0.9)"); g.addColorStop(1, "rgba(255,80,40,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(cabinX + cabinW * 0.3, floorY);
    ctx.lineTo(cabinX + cabinW * 0.7, floorY);
    ctx.lineTo(cabinX + cabinW * 0.5, floorY + fl);
    ctx.closePath(); ctx.fill();
    // upward acceleration arrows on the cabin
    ctx.strokeStyle = C.sun; ctx.lineWidth = 2; ctx.fillStyle = C.sun;
    const ax = cabinX - 22;
    ctx.beginPath(); ctx.moveTo(ax, floorY - 8); ctx.lineTo(ax, cabinTop + 20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ax - 5, cabinTop + 28); ctx.lineTo(ax, cabinTop + 18); ctx.lineTo(ax + 5, cabinTop + 28); ctx.closePath(); ctx.fill();
    ctx.font = `11px ${mono}`; ctx.textAlign = "left"; ctx.fillStyle = C.sun;
    ctx.fillText("1 g", ax - 6, cabinTop + 14);
  } else {
    // gravity arrow pointing down
    ctx.strokeStyle = C.cool; ctx.lineWidth = 2; ctx.fillStyle = C.cool;
    const ax = cabinX - 22;
    ctx.beginPath(); ctx.moveTo(ax, cabinTop + 18); ctx.lineTo(ax, floorY - 14); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ax - 5, floorY - 22); ctx.lineTo(ax, floorY - 12); ctx.lineTo(ax + 5, floorY - 22); ctx.closePath(); ctx.fill();
    ctx.font = `11px ${mono}`; ctx.textAlign = "left"; ctx.fillStyle = C.cool;
    ctx.fillText("g", ax - 4, cabinTop + 14);
  }

  // the astronaut (simple figure standing on floor)
  const figX = cabinX + 42;
  ctx.strokeStyle = "#dbe4ff"; ctx.lineWidth = 2.4;
  ctx.beginPath(); ctx.arc(figX, floorY - 44, 7, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(figX, floorY - 37); ctx.lineTo(figX, floorY - 16); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(figX, floorY - 32); ctx.lineTo(figX - 9, floorY - 24); ctx.moveTo(figX, floorY - 32); ctx.lineTo(figX + 9, floorY - 24); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(figX, floorY - 16); ctx.lineTo(figX - 8, floorY); ctx.moveTo(figX, floorY - 16); ctx.lineTo(figX + 8, floorY); ctx.stroke();

  // the ball: ball = 0..1 fraction of fall from hand to floor
  const startY = cabinTop + 40, endY = floorY - 8;
  const by = startY + (endY - startY) * ball;
  const bx = cabinX + cabinW - 46;
  const g2 = ctx.createRadialGradient(bx - 3, by - 3, 1, bx, by, 9);
  g2.addColorStop(0, "#fff2c0"); g2.addColorStop(1, C.sun);
  ctx.fillStyle = g2; ctx.beginPath(); ctx.arc(bx, by, 9, 0, Math.PI * 2); ctx.fill();
  // motion streak
  ctx.strokeStyle = "rgba(255,210,61,0.4)"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(bx, by - 14 * ball); ctx.lineTo(bx, by - 2); ctx.stroke();

  // caption
  ctx.fillStyle = mode === "rocket" ? C.sun : C.cool; ctx.font = `12px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(mode === "rocket" ? t.rocketCap : t.earthCap, cw / 2, 20);
  ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`;
  ctx.fillText(t.same, cw / 2, H - 10);
}

export function EquivalencePrinciple() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 290;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("rocket");
  const [falling, setFalling] = useState(false);
  const modeRef = useRef("rocket"); modeRef.current = mode;
  const ballRef = useRef(0);
  const fallRef = useRef(false); fallRef.current = falling;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) {
      ballRef.current = falling ? 1 : 0;
      draw(ctx, cw, H, mode, ballRef.current, lang);
      return;
    }
    let raf;
    const loop = () => {
      if (fallRef.current && ballRef.current < 1) {
        // accelerating fall (quadratic feel)
        ballRef.current = clamp(ballRef.current + 0.012 + ballRef.current * 0.05, 0, 1);
      } else if (!fallRef.current) {
        ballRef.current = 0;
      }
      draw(ctx, cw, H, modeRef.current, ballRef.current, lang);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, mode, lang, falling]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 01</div>
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
          <button onClick={() => setMode("rocket")} style={{ ...styles.chip, ...(mode === "rocket" ? styles.chipOn : {}) }}>{t.rocket}</button>
          <button onClick={() => setMode("earth")} style={{ ...styles.chip, ...(mode === "earth" ? styles.chipOn : {}) }}>{t.earth}</button>
        </div>

        <div style={{ ...styles.pickerRow, marginTop: 8 }}>
          <button onClick={() => setFalling(true)} style={{ ...styles.chip, ...(falling ? styles.chipOn : {}) }}>{t.drop}</button>
          <button onClick={() => setFalling(false)} style={styles.chip}>{t.reset}</button>
        </div>

        <div style={{ marginTop: 10 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default EquivalencePrinciple;
