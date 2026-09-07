/* ============================================================
   STATION 7 — TRITON
   Neptune's big moon Triton orbits BACKWARD (retrograde) — opposite to
   Neptune's spin — which means it did not form with Neptune but was
   captured from the Kuiper Belt. That backward orbit makes tidal drag
   steal its energy, so Triton is slowly spiraling inward and will one
   day be torn apart. Voyager 2 (1989) found it geologically active:
   nitrogen geysers on a frozen surface. Grounded in Ch.12 §12.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Triton",
    kind: "The moon that goes backward",
    lede: "Every large moon in the solar system orbits the way its planet spins — except one. Watch Triton circle Neptune the wrong way, and see why that seals its fate.",
    thread: "THE STORY CONTINUES",
    threadText: "Neptune's largest moon breaks the rules. It moves backward around its planet — a clue that it was not born there at all, but captured from the icy belt beyond. And that backward path is slowly killing it.",
    key: "A CAPTURED, RETROGRADE MOON SPIRALING IN",
    keyText: "Triton orbits Neptune RETROGRADE — backward, opposite to Neptune's rotation. Large moons that form alongside their planet always orbit the same way the planet spins, so Triton's backward motion tells us it did not form with Neptune: it was CAPTURED, almost certainly a Kuiper Belt object seized by Neptune's gravity. That retrograde orbit has a fatal consequence: tidal drag steadily removes orbital energy, so Triton is slowly spiraling inward and will eventually be torn apart into a ring. Yet Voyager 2 (1989) found Triton is geologically ACTIVE, with nitrogen geysers erupting across its frozen surface.",
    normal: "prograde (normal)", retro: "retrograde (backward)",
    spin: "Neptune's spin →", capture: "captured from Kuiper Belt", geyser: "nitrogen geysers (Voyager 2, 1989)",
    note: "Triton orbits backward, so it must have been captured — a Kuiper Belt refugee. Tidal drag is dragging it inward toward destruction, yet Voyager 2 found it alive with nitrogen geysers.",
  },
  ja: {
    title: "トリトン",
    kind: "逆向きに回る衛星",
    lede: "太陽系のすべての大きな衛星は、惑星の自転と同じ向きに回ります——一つを除いて。トリトンが海王星を逆向きに回る様子を見て、それがなぜ運命を決めるのかを知ろう。",
    thread: "物語はつづく",
    threadText: "海王星最大の衛星は規則を破ります。惑星のまわりを逆向きに動く——それはそこで生まれたのではなく、外の氷の帯から捕まえられた手がかりです。そしてその逆行の軌道が、ゆっくりとそれを殺しつつあります。",
    key: "捕獲された逆行の衛星、内へ落ちていく",
    keyText: "トリトンは海王星を逆行——海王星の自転と反対向きに——公転します。惑星とともに生まれた大きな衛星はつねに惑星の自転と同じ向きに回るので、トリトンの逆向きの運動は、海王星とともに生まれなかったことを告げます：それは捕獲された、ほぼ確実に海王星の重力に捕まったカイパーベルト天体です。その逆行軌道には致命的な結果があります：潮汐抵抗が軌道エネルギーを着実に奪い、トリトンはゆっくり内へ落ち、やがて引き裂かれて環になります。それでもボイジャー2号（1989年）は、凍った地表に窒素の間欠泉が噴くトリトンが地質的に活動的であることを発見しました。",
    normal: "順行（正常）", retro: "逆行（後ろ向き）",
    spin: "海王星の自転 →", capture: "カイパーベルトから捕獲", geyser: "窒素の間欠泉（ボイジャー2号, 1989）",
    note: "トリトンは逆向きに回るので、捕獲されたに違いない——カイパーベルトからの難民です。潮汐抵抗が内へ引き込み破壊へ向かわせますが、ボイジャー2号は窒素の間欠泉で生きていることを発見しました。",
  },
};

function draw(ctx, cw, H, mode, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2, nR = H * 0.2;
  // Neptune with a spin arrow (counter-clockwise reference)
  const g = ctx.createRadialGradient(cx - nR * 0.3, cy - nR * 0.3, nR * 0.2, cx, cy, nR);
  g.addColorStop(0, "#5b8fd8"); g.addColorStop(1, "#274a86");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, nR, 0, Math.PI * 2); ctx.fill();
  // spin indicator arrow (Neptune spins CCW here = prograde direction)
  ctx.strokeStyle = "rgba(255,255,255,0.5)"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(cx, cy, nR * 0.55, -0.6, 1.2); ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,0.6)"; ctx.font = `9px ${mono}`; ctx.textAlign = "center";
  // moon orbit
  const orbR = nR * 2.2;
  ctx.strokeStyle = "rgba(150,175,230,0.25)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(cx, cy, orbR, 0, Math.PI * 2); ctx.stroke();
  // direction: prograde = CCW (matches spin), retrograde = CW
  const dir = mode === "retro" ? 1 : -1; // canvas y down: CCW visually is negative angle increment
  // shrink orbit slightly over time in retrograde to show inspiral
  const shrink = mode === "retro" ? Math.max(0.72, 1 - (tt % 600) / 600 * 0.28) : 1;
  const a = dir * tt * 0.02;
  const mr = orbR * shrink;
  const mx = cx + Math.cos(a) * mr, my = cy + Math.sin(a) * mr;
  // motion trail
  for (let k = 1; k <= 8; k++) {
    const aa = dir * (tt - k * 4) * 0.02;
    ctx.fillStyle = `rgba(200,225,255,${0.25 - k * 0.03})`;
    ctx.beginPath(); ctx.arc(cx + Math.cos(aa) * mr, cy + Math.sin(aa) * mr, 3, 0, Math.PI * 2); ctx.fill();
  }
  // Triton
  ctx.fillStyle = "#dfe8ee"; ctx.beginPath(); ctx.arc(mx, my, 7, 0, Math.PI * 2); ctx.fill();
  // nitrogen geyser streak
  ctx.strokeStyle = "rgba(200,220,255,0.7)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(mx, my - 7); ctx.lineTo(mx + 4, my - 18); ctx.stroke();
  // arrows for direction label
  ctx.fillStyle = mode === "retro" ? C.bad : C.good; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(mode === "retro" ? t.retro : t.normal, cx, cy + orbR + 26);
  ctx.fillStyle = "rgba(255,255,255,0.55)"; ctx.font = `9px ${mono}`;
  ctx.fillText(t.spin, cx, cy - nR - 8);
  if (mode === "retro") {
    ctx.fillStyle = C.sun; ctx.font = `10px ${mono}`;
    ctx.fillText(t.capture, cx, cy - orbR - 6);
  }
  ctx.fillStyle = C.cool; ctx.font = `9px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(t.geyser, 10, H - 10);
}

export function Triton() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("retro");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, mode, 20, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, mode, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, mode, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 07</div>
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
          {[["retro", t.retro], ["normal", t.normal]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default Triton;
