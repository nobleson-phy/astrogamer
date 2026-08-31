/* ============================================================
   STATION 6 — THE ICE GIANTS (URANUS & NEPTUNE)
   Uranus and Neptune are blue because methane absorbs red light.
   Uranus is tipped 98° — it spins on its side. Neptune has an
   internal heat source driving convection that lifts bright, high
   methane clouds (which cast shadows); Uranus, lacking it, looks
   bland. Both are "ice giants": most of their mass is a rock/ice
   core, because their cores formed too slowly in the thin outer
   nebula to grab much hydrogen and helium. Grounded in Ch.11 §11.2–11.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const TOPICS = {
  blue: { en: "Why blue?", ja: "なぜ青い？",
    en_t: "Both worlds are blue because methane gas in their atmospheres absorbs red sunlight and scatters back the blue. Colder, methane-rich air makes them the blue planets.", ja_t: "どちらも青いのは、大気中のメタンガスが赤い日光を吸収し、青を散乱して返すから。冷たくメタンに富む大気が、それらを青い惑星にする。" },
  tilt: { en: "Uranus on its side", ja: "横倒しの天王星",
    en_t: "Uranus's spin axis is tilted 98° from the perpendicular to its orbit — it essentially rolls around the Sun on its side, probably knocked over by a giant early collision.", ja_t: "天王星の自転軸は軌道への垂線から98°傾く——ほぼ横倒しで太陽のまわりを転がる。おそらく初期の巨大衝突で倒された。" },
  convection: { en: "Neptune's inner heat", ja: "海王星の内部の熱",
    en_t: "Neptune has an internal heat source; the resulting convection carries warm gas upward into bright high-altitude methane clouds that cast visible shadows. Uranus lacks this heat, so it looks far blander.", ja_t: "海王星には内部熱源があり、その対流が暖かいガスを上へ運んで、影を落とす明るい高層メタン雲をつくる。天王星はこの熱がなく、はるかにのっぺりして見える。" },
  cores: { en: "Why 'ice giants'?", ja: "なぜ「氷の巨人」？",
    en_t: "Unlike Jupiter and Saturn (mostly gas), most of Uranus's and Neptune's mass is a heavy rock-and-ice core. Their cores grew too slowly in the thin outer disk to capture much hydrogen and helium before the nebula dispersed.", ja_t: "ガスが大半の木星・土星と違い、天王星と海王星の質量の大半は重い岩石と氷の核。薄い外側の円盤で核の成長が遅く、星雲が散る前に水素とヘリウムを多く捕らえられなかった。" },
};
const ORDER = ["blue", "tilt", "convection", "cores"];

const STR = {
  en: {
    title: "The ice giants",
    kind: "Two tilted, blue, distant worlds",
    lede: "Uranus and Neptune look like twins — cold and blue — but one lies on its side and only one has weather. Explore why they are blue, why Uranus rolls, and why they are 'ice', not 'gas'.",
    thread: "THE STORY CONTINUES",
    threadText: "Voyager 2's only visits revealed two worlds stranger than expected: near-twins in size and colour, yet different in tilt, weather, and even the balance of ice and gas within.",
    key: "MOSTLY ICE, PAINTED BLUE BY METHANE",
    keyText: "Uranus and Neptune are blue because methane in their air absorbs red light. Uranus is extraordinary: its spin axis is tipped 98°, so it lies almost on its side. Neptune has an internal heat source that drives convection, lifting bright high methane clouds that cast shadows — while Uranus, without that heat, looks bland. Crucially, both are ICE GIANTS: unlike Jupiter and Saturn (mostly gas), most of their mass is a rock-and-ice core, because their cores grew too slowly in the thin outer nebula to attract much hydrogen and helium.",
    note: "Methane makes them blue; Uranus is tipped 98° onto its side; Neptune's inner heat drives bright clouds Uranus lacks; and both are mostly rock-and-ice core — the 'ice giants'.",
  },
  ja: {
    title: "氷の巨人",
    kind: "傾いた、青い、遠い2つの世界",
    lede: "天王星と海王星は双子のよう——冷たく青い——でも一方は横倒しで、気象があるのは一方だけ。なぜ青いのか、なぜ天王星は転がるのか、そしてなぜ「ガス」でなく「氷」なのかを探ろう。",
    thread: "物語はつづく",
    threadText: "ボイジャー2号だけの訪問が、予想より奇妙な2つの世界を明かしました：大きさと色はほぼ双子、それでいて傾き・気象・内部の氷とガスの割合まで異なるのです。",
    key: "大半は氷、メタンが青く塗る",
    keyText: "天王星と海王星が青いのは、大気のメタンが赤い光を吸収するから。天王星は並外れていて、自転軸が98°傾き、ほぼ横倒しです。海王星には内部熱源があり、対流を駆動して、影を落とす明るい高層メタン雲を持ち上げます——一方、その熱のない天王星はのっぺりして見えます。決定的に、両方とも氷の巨人です：ガスが大半の木星・土星と違い、質量の大半は岩石と氷の核。薄い外側の星雲で核の成長が遅く、水素とヘリウムをあまり引き寄せられなかったからです。",
    note: "メタンが青くし、天王星は98°横倒し、海王星の内部熱が天王星にはない明るい雲を駆動し、どちらも大半が岩石と氷の核——「氷の巨人」です。",
  },
};

function drawPlanet(ctx, cx, cy, R, blue, tiltDeg, clouds, tt) {
  const g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.2, cx, cy, R);
  if (blue === "uranus") { g.addColorStop(0, "#bfeaf0"); g.addColorStop(1, "#7fbfcf"); }
  else { g.addColorStop(0, "#5b8de8"); g.addColorStop(1, "#2f4fb0"); }
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip();
  ctx.fillStyle = g; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
  if (clouds) { // bright high clouds with shadows (Neptune)
    for (let i = 0; i < 4; i++) { const yy = cy - R * 0.4 + i * R * 0.28 + Math.sin(tt * 0.02 + i) * 4; ctx.fillStyle = "rgba(255,255,255,0.8)"; ctx.beginPath(); ctx.ellipse(cx + Math.sin(i * 2) * R * 0.4, yy, R * 0.24, R * 0.06, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = "rgba(20,30,80,0.4)"; ctx.beginPath(); ctx.ellipse(cx + Math.sin(i * 2) * R * 0.4, yy + R * 0.09, R * 0.22, R * 0.04, 0, 0, Math.PI * 2); ctx.fill(); }
    // Great Dark Spot
    ctx.fillStyle = "rgba(20,30,90,0.7)"; ctx.beginPath(); ctx.ellipse(cx - R * 0.2, cy + R * 0.2, R * 0.2, R * 0.13, 0, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
  ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
  // tilt axis
  if (tiltDeg != null) {
    const a = (tiltDeg - 90) * Math.PI / 180; // 98° tilt shown near-horizontal
    const ax = Math.cos(a) * (R + 22), ay = Math.sin(a) * (R + 22);
    ctx.strokeStyle = C.sun; ctx.setLineDash([5, 4]); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx - ax, cy - ay); ctx.lineTo(cx + ax, cy + ay); ctx.stroke(); ctx.setLineDash([]);
    // ring (Uranus) drawn edge-on/vertical due to tilt
    ctx.strokeStyle = "rgba(190,220,240,0.6)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(cx, cy, (R + 12) * 0.9, R + 12, a, 0, Math.PI * 2); ctx.stroke();
  }
}

function draw(ctx, cw, H, topic, tt, lang) {
  ctx.clearRect(0, 0, cw, H);
  const cy = H / 2;
  if (topic === "convection") {
    // Uranus (bland) vs Neptune (bright clouds) side by side
    const R = Math.min(cw * 0.16, H * 0.4);
    drawPlanet(ctx, cw * 0.28, cy, R, "uranus", null, false, tt);
    drawPlanet(ctx, cw * 0.72, cy, R, "neptune", null, true, tt);
    ctx.fillStyle = C.muted; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
    ctx.fillText("Uranus · bland", cw * 0.28, cy + R + 20); ctx.fillText("Neptune · bright clouds", cw * 0.72, cy + R + 20);
  } else if (topic === "tilt") {
    drawPlanet(ctx, cw * 0.42, cy, Math.min(cw * 0.24, H * 0.4), "uranus", 98, false, tt);
    ctx.fillStyle = C.sun; ctx.font = `12px ${mono}`; ctx.textAlign = "center"; ctx.fillText("axis tilted 98° — spins on its side", cw / 2, H - 12);
  } else if (topic === "cores") {
    // core vs envelope comparison: gas giant (small core) vs ice giant (big core)
    const drawWorld = (cx, coreFrac, label, col) => {
      const R = Math.min(cw * 0.16, H * 0.38);
      ctx.fillStyle = col; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
      const cr = R * Math.sqrt(coreFrac);
      const g = ctx.createRadialGradient(cx, cy, 1, cx, cy, cr); g.addColorStop(0, "#e8b06a"); g.addColorStop(1, "#a05a2a");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, cr, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = C.muted; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(label, cx, cy + R + 18);
      ctx.fillStyle = C.sun; ctx.font = `10px ${mono}`; ctx.fillText("core ≈ " + Math.round(coreFrac * 100) + "% mass", cx, cy + R + 34);
    };
    drawWorld(cw * 0.28, 0.05, "Gas giant (Jupiter)", "#e0cfa0");
    drawWorld(cw * 0.72, 0.7, "Ice giant (Neptune)", "#5b8de8");
  } else {
    // blue: sunlight in, methane absorbs red, blue scatters out
    const cx = cw * 0.5;
    drawPlanet(ctx, cx, cy, Math.min(cw * 0.2, H * 0.4), "neptune", null, false, tt);
    ctx.strokeStyle = "#ffd23d"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(20, 30); ctx.lineTo(cx - 40, cy - 30); ctx.stroke();
    ctx.fillStyle = "#ff6b6b"; ctx.font = `10px ${mono}`; ctx.textAlign = "left"; ctx.fillText("methane absorbs red →", cx - 150, cy + 46);
    ctx.strokeStyle = "#5b8de8"; ctx.beginPath(); ctx.moveTo(cx + 40, cy + 20); ctx.lineTo(cw - 20, H - 20); ctx.stroke();
    ctx.fillStyle = "#8fb4ff"; ctx.textAlign = "right"; ctx.fillText("← blue scatters back", cw - 20, cy - 30);
  }
}

export function IceGiants() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [topic, setTopic] = useState("blue");
  const topicRef = useRef(topic); topicRef.current = topic;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, topic, 0, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, topicRef.current, tt, lang); raf = requestAnimationFrame(loop); };
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

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {ORDER.map((id) => (
            <button key={id} onClick={() => setTopic(id)}
              style={{ ...styles.chip, ...(topic === id ? styles.chipOn : {}) }}>{lang === "ja" ? TOPICS[id].ja : TOPICS[id].en}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.5, marginTop: 8 }}>{lang === "ja" ? TOPICS[topic].ja_t : TOPICS[topic].en_t}</p>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default IceGiants;
