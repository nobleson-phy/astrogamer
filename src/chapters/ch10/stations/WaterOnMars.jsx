/* ============================================================
   STATION 7 — WATER ON MARS
   Mars has polar caps: the north residual cap is WATER ice, the
   south is frozen CO2. Rovers found watery-past clues: Opportunity's
   hematite "blueberries" (spheres that form in water), and dark
   seasonal streaks (recurring slope lineae) that flow because the
   water is very salty. Martian meteorites on Earth carry crust and
   trapped gas that confirm past water. Grounded in Ch.10 §10.4–10.5.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const TOPICS = {
  caps: { en: "Polar caps", ja: "極冠",
    en_t: "Mars has bright polar caps. The permanent (residual) cap at the NORTH pole is water ice; the southern permanent cap is frozen carbon dioxide (dry ice). A thin seasonal CO₂ frost comes and goes each year.", ja_t: "火星には明るい極冠がある。北極の永久（残留）冠は水の氷、南極の永久冠は二酸化炭素の氷（ドライアイス）。薄い季節的CO₂霜が毎年現れては消える。" },
  blueberries: { en: "Blueberries", ja: "ブルーベリー",
    en_t: "The Opportunity rover found tiny spheres rich in the mineral hematite, nicknamed 'blueberries'. Hematite spheres like these form in water — direct evidence that liquid water once soaked these rocks.", ja_t: "オポチュニティ探査車が、鉱物ヘマタイト（赤鉄鉱）に富む小さな球を見つけ「ブルーベリー」と呼ばれた。こうしたヘマタイト球は水中で形成される——かつて液体の水がこの岩を浸した直接の証拠。" },
  streaks: { en: "Slope streaks", ja: "斜面の筋",
    en_t: "Dark streaks (recurring slope lineae) appear on warm slopes and flow downhill in summer. Today's Mars is too cold and thin-aired for pure water — but very SALTY water has a lower freezing point and can stay liquid long enough to trickle down.", ja_t: "暖かい斜面に暗い筋（季節性斜面線条）が現れ、夏に下る。今日の火星は純水には冷たすぎ大気も薄い——だが非常に塩辛い水は凝固点が低く、流れ落ちる間だけ液体を保てる。" },
  meteorites: { en: "Mars meteorites", ja: "火星隕石",
    en_t: "A rare class of meteorites found on Earth came from Mars — blasted off by impacts. They carry samples of Martian crust and bubbles of trapped Martian air, confirming Mars once had water and possibly habitable conditions.", ja_t: "地球で見つかる希少な隕石の一群は火星由来——衝突で吹き飛ばされたもの。火星地殻の試料と閉じ込められた火星大気の泡を含み、火星がかつて水と、おそらく居住可能な条件をもったことを裏づける。" },
};
const ORDER = ["caps", "blueberries", "streaks", "meteorites"];

const STR = {
  en: {
    title: "Water on Mars",
    kind: "A dry world that was once wet",
    lede: "Mars is a frozen desert today, but its rocks and ice remember water. Follow the evidence — polar caps, tiny mineral spheres, salty summer streaks, and meteorites that flew here from Mars.",
    thread: "THE STORY CONTINUES",
    threadText: "The great question of Mars is water — and with it, the possibility of life. The planet is too cold and its air too thin for lakes today, yet clue after clue says water once flowed here.",
    key: "ICE AT THE POLES, WATER IN THE PAST",
    keyText: "Mars keeps water ice in its northern residual polar cap (the south's permanent cap is frozen CO₂). Its rocks record a wetter past: the Opportunity rover's hematite 'blueberries' are spheres that form in water. Even now, dark seasonal streaks (recurring slope lineae) creep downhill in summer — possible only because the water is extremely salty, which lowers its freezing point enough to flow briefly. And rare Martian meteorites on Earth, carrying crust and trapped atmosphere, confirm Mars once had water and potentially habitable conditions.",
    note: "Water ice caps the north pole, hematite 'blueberries' and salty slope streaks record water past and present, and Mars meteorites deliver the samples that confirm it.",
  },
  ja: {
    title: "火星の水",
    kind: "かつて湿っていた乾いた世界",
    lede: "今日の火星は凍った砂漠ですが、その岩と氷は水を覚えています。証拠をたどろう——極冠、小さな鉱物の球、夏の塩辛い筋、そして火星から飛んできた隕石。",
    thread: "物語はつづく",
    threadText: "火星の大きな問いは水——そしてそれとともに、生命の可能性です。今の火星は湖には冷たすぎ大気も薄い、それでも手がかりが次々と、かつてここに水が流れたと語ります。",
    key: "極の氷、過去の水",
    keyText: "火星は北極の残留極冠に水の氷を保ちます（南の永久冠は凍ったCO₂）。岩石はより湿った過去を記録します：オポチュニティのヘマタイト「ブルーベリー」は水中で形成される球です。今なお、暗い季節の筋（季節性斜面線条）が夏に斜面を下ります——水が極めて塩辛く、凝固点が下がって短時間流れられるからこそ可能です。そして地殻と閉じ込めた大気を運ぶ希少な火星隕石が、火星がかつて水と、おそらく居住可能な条件をもったことを裏づけます。",
    note: "水の氷が北極を覆い、ヘマタイトの「ブルーベリー」と塩辛い斜面の筋が過去と現在の水を記録し、火星隕石がそれを裏づける試料を届けます。",
  },
};

function rng(seed) { let s = seed; return () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff; }

function draw(ctx, cw, H, topic, tt) {
  ctx.clearRect(0, 0, cw, H);
  if (topic === "caps") {
    // Mars globe with polar caps
    const cx = cw / 2, cy = H / 2, R = Math.min(cw * 0.28, H * 0.42);
    const g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.2, cx, cy, R);
    g.addColorStop(0, "#e8895a"); g.addColorStop(1, "#a34424");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip();
    ctx.fillStyle = "rgba(240,248,255,0.9)"; ctx.beginPath(); ctx.ellipse(cx, cy - R * 0.86, R * 0.55, R * 0.2, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "rgba(210,225,245,0.85)"; ctx.beginPath(); ctx.ellipse(cx, cy + R * 0.9, R * 0.42, R * 0.14, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = "#bfe9ff"; ctx.font = `11px ${mono}`; ctx.textAlign = "left"; ctx.fillText("N: water ice", cx + R + 12, cy - R * 0.6);
    ctx.fillStyle = "#c9c1b0"; ctx.fillText("S: CO₂ ice", cx + R + 12, cy + R * 0.7);
  } else if (topic === "blueberries") {
    ctx.fillStyle = "#b06a3a"; ctx.fillRect(0, 0, cw, H);
    ctx.fillStyle = "#8a5030"; for (let y = 30; y < H; y += 26) ctx.fillRect(0, y, cw, 2); // sedimentary layers
    const r = rng(3);
    for (let i = 0; i < 60; i++) { const x = r() * cw, y = 20 + r() * (H - 40), rad = 3 + r() * 3; const g = ctx.createRadialGradient(x - 1, y - 1, 0.5, x, y, rad); g.addColorStop(0, "#8fb0d8"); g.addColorStop(1, "#3a5a8a"); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2); ctx.fill(); }
    ctx.fillStyle = C.text; ctx.font = `12px ${mono}`; ctx.textAlign = "center"; ctx.fillText("hematite spheres ('blueberries') — form in water", cw / 2, H - 10);
  } else if (topic === "streaks") {
    ctx.fillStyle = "#c86a3a"; ctx.fillRect(0, 0, cw, H);
    // crater slope with dark streaks flowing down; length grows with tt (summer)
    ctx.fillStyle = "#8a4424"; ctx.beginPath(); ctx.arc(cw / 2, -40, H + 40, 0, Math.PI * 2); ctx.fill();
    const grow = (Math.sin(tt * 0.02) * 0.5 + 0.5);
    ctx.strokeStyle = "rgba(40,22,12,0.8)"; ctx.lineWidth = 4;
    for (let i = 0; i < 6; i++) { const x = cw * (0.2 + i * 0.12); const len = 40 + grow * 80 + (i % 3) * 10; ctx.beginPath(); ctx.moveTo(x, 60); ctx.lineTo(x + 4, 60 + len); ctx.stroke(); }
    ctx.fillStyle = C.cool; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText("recurring slope lineae — salty water flows in summer", cw / 2, H - 10);
  } else {
    // a rock (Mars meteorite) with a gas bubble
    ctx.fillStyle = "#2a2a30"; ctx.fillRect(0, 0, cw, H);
    const cx = cw / 2, cy = H / 2;
    const g = ctx.createRadialGradient(cx - 20, cy - 20, 4, cx, cy, 70);
    g.addColorStop(0, "#5a4a3a"); g.addColorStop(1, "#2a221a");
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(cx - 70, cy); ctx.lineTo(cx - 30, cy - 44); ctx.lineTo(cx + 46, cy - 36); ctx.lineTo(cx + 66, cy + 20); ctx.lineTo(cx + 10, cy + 46); ctx.lineTo(cx - 54, cy + 34); ctx.closePath(); ctx.fill();
    // fusion crust edge
    ctx.strokeStyle = "#12100c"; ctx.lineWidth = 4; ctx.stroke();
    // trapped gas bubbles
    for (const [dx, dy, rr] of [[-10, -6, 6], [18, 8, 4], [-22, 14, 3]]) { ctx.fillStyle = "rgba(63,221,255,0.4)"; ctx.beginPath(); ctx.arc(cx + dx, cy + dy, rr, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = "rgba(63,221,255,0.8)"; ctx.lineWidth = 1; ctx.stroke(); }
    ctx.fillStyle = C.cool; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText("Martian meteorite — crust + trapped Mars air", cw / 2, H - 10);
  }
}

export function WaterOnMars() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [topic, setTopic] = useState("caps");
  const topicRef = useRef(topic); topicRef.current = topic;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (topic !== "streaks" || reduceMotion) { draw(ctx, cw, H, topic, 0); return; }
    let raf, tt = 0;
    const loop = () => { if (topicRef.current !== "streaks") return; tt += 1; draw(ctx, cw, H, "streaks", tt); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, topic, lang]);

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

export default WaterOnMars;
