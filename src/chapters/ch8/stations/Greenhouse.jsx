/* ============================================================
   STATION 6 — THE GREENHOUSE EFFECT
   Greenhouse gases (CO2, methane, water vapour) are transparent to
   incoming visible sunlight but absorb the infrared heat the warmed
   ground reradiates. That trapped heat raises the surface
   temperature — a blanket, not a converter. Grounded in Ch.8 §8.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The greenhouse effect",
    kind: "A one-way blanket of infrared",
    lede: "Sunlight arrives as visible light and warms the ground; the ground glows back in invisible infrared. Toggle the greenhouse gases and watch that outgoing heat get trapped — and the temperature climb.",
    thread: "THE STORY CONTINUES",
    threadText: "The same air that carries our weather also sets our thermostat. A few trace gases decide whether Earth is a comfortable 15°C or a frozen ball — by controlling not the sunlight coming in, but the heat trying to leave.",
    key: "LETS LIGHT IN, KEEPS HEAT FROM LEAVING",
    keyText: "Greenhouse gases — carbon dioxide, methane and water vapour — are nearly transparent to incoming short-wavelength visible sunlight, so it passes through and warms the ground. But the warmed ground reradiates that energy as long-wavelength infrared, which those same gases absorb and reradiate, much of it back down. The gases act like a blanket that lets sunlight in but traps outgoing infrared heat, raising the surface temperature. They don't create heat — they slow its escape.",
    on: "Greenhouse gases: ON", off: "Greenhouse gases: OFF", toggle: "Toggle greenhouse gases",
    sunlight: "visible sunlight in", infrared: "infrared heat out", trapped: "infrared trapped ↓",
    tempL: "Surface temperature",
    note: "Yellow arrows are incoming visible sunlight — the gases let it through. Red arrows are outgoing infrared from the warm ground. With greenhouse gases present, much of that infrared is absorbed and sent back down, so the surface runs far warmer.",
  },
  ja: {
    title: "温室効果",
    kind: "赤外線の一方通行の毛布",
    lede: "日光は可視光として届き地面を暖め、地面は見えない赤外線で光り返します。温室効果ガスを切り替えて、出ていく熱が閉じ込められ——温度が上がる様子を見よう。",
    thread: "物語はつづく",
    threadText: "天気を運ぶのと同じ空気が、私たちのサーモスタットも決めています。わずかな微量ガスが、地球が快適な15℃になるか凍った球になるかを——入ってくる日光ではなく、出ていこうとする熱を制御することで——決めるのです。",
    key: "光は入れ、熱は逃がさない",
    keyText: "温室効果ガス——二酸化炭素・メタン・水蒸気——は、入ってくる短波長の可視光にはほぼ透明なので、光は通り抜けて地面を暖めます。しかし暖まった地面はそのエネルギーを長波長の赤外線として再放射し、同じガスがそれを吸収して再放射し、その多くを下向きに戻します。ガスは、日光は入れるが出ていく赤外線を閉じ込める毛布のように働き、地表温度を上げます。熱を生むのではなく、その逃げを遅らせるのです。",
    on: "温室効果ガス：オン", off: "温室効果ガス：オフ", toggle: "温室効果ガスを切り替え",
    sunlight: "可視光が入る", infrared: "赤外線が出る", trapped: "赤外線を閉じ込める ↓",
    tempL: "地表温度",
    note: "黄色い矢印は入ってくる可視光——ガスはこれを通します。赤い矢印は暖かい地面から出る赤外線。温室効果ガスがあると、その赤外線の多くが吸収されて下へ戻され、地表はずっと暖かくなります。",
  },
};

function draw(ctx, cw, H, on, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const groundY = H - 34;
  // sky
  const sky = ctx.createLinearGradient(0, 0, 0, groundY);
  sky.addColorStop(0, on ? "rgba(60,40,30,0.5)" : "rgba(20,30,60,0.5)"); sky.addColorStop(1, "rgba(10,14,28,0.2)");
  ctx.fillStyle = sky; ctx.fillRect(0, 0, cw, groundY);
  // greenhouse gas band
  const bandY = groundY - 70;
  if (on) {
    ctx.fillStyle = "rgba(201,139,255,0.14)"; ctx.fillRect(0, bandY, cw, 46);
    for (let i = 0; i < 14; i++) { const x = 20 + i * (cw - 40) / 13; ctx.fillStyle = "rgba(201,139,255,0.6)"; ctx.beginPath(); ctx.arc(x, bandY + 23 + Math.sin(tt * 0.03 + i) * 4, 3, 0, Math.PI * 2); ctx.fill(); }
    ctx.fillStyle = C.violet; ctx.font = `10px ${mono}`; ctx.textAlign = "left"; ctx.fillText("CO₂ · CH₄ · H₂O", 20, bandY - 6);
  }
  // incoming sunlight (yellow) — passes through
  const sp = (tt * 2) % 60;
  for (let i = 0; i < 4; i++) {
    const x = 60 + i * (cw - 120) / 3;
    ctx.strokeStyle = "#ffd23d"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x - 30, 0 + sp); ctx.lineTo(x, 30 + sp); ctx.stroke();
    ctx.fillStyle = "#ffd23d"; ctx.beginPath(); ctx.moveTo(x, 30 + sp); ctx.lineTo(x - 6, 24 + sp); ctx.lineTo(x - 12, 32 + sp); ctx.closePath(); ctx.fill();
  }
  // ground
  ctx.fillStyle = on ? "#c96b3a" : "#6b5a45"; ctx.fillRect(0, groundY, cw, 34);
  // outgoing infrared (red) — trapped by band if on
  for (let i = 0; i < 5; i++) {
    const x = 45 + i * (cw - 90) / 4;
    const rise = (tt * 1.6 + i * 12) % 90;
    const topY = groundY - rise;
    const blocked = on && topY < bandY + 46;
    ctx.strokeStyle = "#ff6b6b"; ctx.globalAlpha = blocked ? 0.5 : 1; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x, groundY); ctx.lineTo(x + 6, clamp(topY, blocked ? bandY + 46 : -20, groundY)); ctx.stroke();
    ctx.globalAlpha = 1;
  }
  if (on) { ctx.fillStyle = C.danger; ctx.font = `10px ${mono}`; ctx.textAlign = "right"; ctx.fillText(t.trapped, cw - 16, bandY + 60); }
}

export function Greenhouse() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [on, setOn] = useState(true);
  const onRef = useRef(on); onRef.current = on;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, onRef.current, 0, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, onRef.current, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

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

        <div style={styles.controlBar}>
          <button style={{ ...styles.iconBtn, ...(on ? styles.chipOn : {}) }} onClick={() => setOn((v) => !v)}>{t.toggle}</button>
          <span style={{ fontFamily: mono, fontSize: 13, color: on ? C.danger : C.cool }}>{on ? t.on : t.off}</span>
          <span style={{ fontFamily: mono, fontSize: 13, color: C.faint }}>{t.tempL}: <span style={{ color: on ? C.danger : C.cool, fontSize: 16 }}>{on ? "+15°C" : "−18°C"}</span></span>
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <div style={{ fontFamily: mono, fontSize: 12.5, marginTop: 8, lineHeight: 1.8, color: C.muted }}>
          <div><span style={{ color: "#ffd23d" }}>↘</span> {t.sunlight} &nbsp;&nbsp; <span style={{ color: "#ff6b6b" }}>↑</span> {t.infrared}</div>
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default Greenhouse;
