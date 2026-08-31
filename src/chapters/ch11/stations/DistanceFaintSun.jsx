/* ============================================================
   STATION 7 — DISTANCE & FAINT SUN
   The giants orbit far from the Sun — Saturn near 10 AU, taking
   ~30 years for one orbit; Neptune at 30 AU. By the inverse-square
   law, sunlight there is 1/d² as bright: at Neptune's 30 AU it is
   30² = 900 times fainter than at Earth. Grounded in Ch.11 §11.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const PLANETS = [
  { en: "Earth", ja: "地球", au: 1, yr: "1 yr", col: "#5b8dee" },
  { en: "Jupiter", ja: "木星", au: 5.2, yr: "12 yr", col: "#e0a86a" },
  { en: "Saturn", ja: "土星", au: 9.5, yr: "30 yr", col: "#e8cf9a" },
  { en: "Uranus", ja: "天王星", au: 19, yr: "84 yr", col: "#a9dbe6" },
  { en: "Neptune", ja: "海王星", au: 30, yr: "165 yr", col: "#5b7de0" },
];

const STR = {
  en: {
    title: "Distance & faint Sun",
    kind: "How dim the Sun gets out there",
    lede: "The giants live in the deep cold, far from the Sun's warmth. Pick a world and watch the sunlight fade by the inverse-square law — at Neptune, the Sun is 900 times dimmer than we see it.",
    thread: "THE STORY CONTINUES",
    threadText: "Distance is the giants' defining feature. Saturn is ten times farther from the Sun than Earth; Neptune, thirty. Out there, our brilliant Sun is just a very bright star.",
    key: "SUNLIGHT FADES AS 1 / DISTANCE²",
    keyText: "The giant planets orbit far out: Saturn is nearly 10 AU from the Sun and takes about 30 years to circle it once; Neptune lies at 30 AU. By the inverse-square law, brightness falls as one over the square of the distance. So at Saturn's ~10 AU, sunlight is about 10² = 100 times fainter than at Earth, and at Neptune's 30 AU it is 30² = 900 times fainter. That is why the outer solar system is so cold and dim — and why studying it takes patience and sensitive instruments.",
    distL: "Distance", periodL: "Orbit", brightL: "Sunlight vs Earth",
    pick: "Pick a world:", fainter: "× fainter than at Earth",
    note: "Saturn sits ~10 AU out (a ~30-year orbit); Neptune ~30 AU. Because brightness goes as 1/distance², Neptune's noon sunlight is 30² = 900 times weaker than Earth's.",
  },
  ja: {
    title: "距離と弱い日光",
    kind: "そこでは太陽がどれほど暗くなるか",
    lede: "巨人たちは太陽の暖かさから遠く、深い寒さに住みます。世界を選んで、逆二乗の法則で日光が薄れる様子を見よう——海王星では、太陽は私たちが見るより900倍暗いのです。",
    thread: "物語はつづく",
    threadText: "距離こそ巨人を特徴づけるものです。土星は地球の10倍、海王星は30倍、太陽から離れています。そこでは、まぶしい太陽もただの明るい星にすぎません。",
    key: "日光は 1／距離² で薄れる",
    keyText: "巨大惑星は遠くを回ります：土星は太陽から約10 AUで、一周に約30年かかります。海王星は30 AU。逆二乗の法則により、明るさは距離の2乗に反比例して落ちます。だから土星の約10 AUでは日光は地球の約10²＝100倍暗く、海王星の30 AUでは30²＝900倍暗い。だから外側の太陽系はこれほど冷たく暗く——その研究には忍耐と高感度の装置が要るのです。",
    distL: "距離", periodL: "公転", brightL: "地球比の日光",
    pick: "世界を選ぼう：", fainter: "× 地球より暗い",
    note: "土星は約10 AU（公転約30年）、海王星は約30 AU。明るさは1／距離²なので、海王星の正午の日光は30²＝900倍弱いのです。",
  },
};

function draw(ctx, cw, H, sel, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const x0 = 30, x1 = cw - 20, y = H * 0.42;
  const maxAU = 30;
  const X = (au) => x0 + (au / maxAU) * (x1 - x0);
  // Sun
  const sg = ctx.createRadialGradient(x0, y, 2, x0, y, 18); sg.addColorStop(0, "#fff6d8"); sg.addColorStop(0.5, "#ffd23d"); sg.addColorStop(1, "rgba(255,158,44,0)");
  ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(x0, y, 18, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffd23d"; ctx.beginPath(); ctx.arc(x0, y, 8, 0, Math.PI * 2); ctx.fill();
  // distance axis
  ctx.strokeStyle = "rgba(150,175,230,0.25)"; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
  PLANETS.forEach((p) => {
    const px = X(p.au), on = p.en === sel;
    ctx.fillStyle = p.col; ctx.beginPath(); ctx.arc(px, y, on ? 8 : 5, 0, Math.PI * 2); ctx.fill();
    if (on) { ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(px, y, 11, 0, Math.PI * 2); ctx.stroke(); }
    ctx.fillStyle = on ? C.text : C.faint; ctx.font = `${on ? "700 " : ""}9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(lang === "ja" ? p.ja : p.en, px, y - 12);
  });
  // brightness bar for the selected planet
  const P = PLANETS.find((p) => p.en === sel) || PLANETS[0];
  const fainter = P.au * P.au;
  const by = y + 40, bw = cw - 60, bx = 30, bh = 30;
  ctx.fillStyle = "rgba(120,150,210,0.15)"; ctx.fillRect(bx, by, bw, bh);
  // remaining brightness = 1/fainter of the full bar
  ctx.fillStyle = "#ffd23d"; ctx.fillRect(bx, by, Math.max(3, bw / fainter), bh);
  ctx.strokeStyle = "rgba(150,175,230,0.35)"; ctx.strokeRect(bx, by, bw, bh);
  ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.textAlign = "left"; ctx.fillText(t.brightL, bx, by - 6);
  ctx.fillStyle = C.sun; ctx.font = `700 15px ${mono}`; ctx.textAlign = "left";
  ctx.fillText("1/" + Math.round(fainter) + "  ·  " + Math.round(fainter) + "× " + t.fainter, bx + 8, by + bh + 20);
  // distance/period readout
  ctx.fillStyle = C.cool; ctx.font = `12px ${mono}`; ctx.textAlign = "right";
  ctx.fillText(P.au + " AU · " + P.yr, cw - 20, by - 6);
}

export function DistanceFaintSun() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 220;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [sel, setSel] = useState("Saturn");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, sel, lang);
  }, [cw, sel, lang]);

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

        <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, marginBottom: 4 }}>{t.pick}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {PLANETS.map((p) => (
            <button key={p.en} onClick={() => setSel(p.en)}
              style={{ ...styles.chip, ...(sel === p.en ? styles.chipOn : {}), borderColor: sel === p.en ? p.col : undefined }}>{lang === "ja" ? p.ja : p.en}</button>
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

export default DistanceFaintSun;
