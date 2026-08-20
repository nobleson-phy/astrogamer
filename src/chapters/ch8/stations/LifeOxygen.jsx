/* ============================================================
   STATION 8 — LIFE, OXYGEN & CATASTROPHES
   Blue-green bacteria (stromatolites, >3 Gyr) photosynthesised,
   releasing oxygen that accumulated ~2 Gyr ago and built the ozone
   layer, making land habitable. Ice ages come from cyclic tilt
   changes; the dinosaurs died 65 Myr ago at the end of the
   Cretaceous, marked by a global iridium layer from an impact.
   Grounded in Ch.8 §8.4–8.5.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const TOPICS = {
  oxygen: { en: "Oxygen & ozone", ja: "酸素とオゾン",
    en_t: "Blue-green bacteria — preserved as fossil stromatolites over 3 billion years old — photosynthesised, releasing oxygen as waste. Free oxygen began building up about 2 billion years ago and formed the stratospheric ozone layer, whose UV shield finally let life leave the sea and colonise the land.", ja_t: "青緑色細菌——30億年以上前の化石ストロマトライトとして残る——が光合成し、酸素を老廃物として放出しました。遊離酸素は約20億年前に蓄積し始め、成層圏のオゾン層をつくりました。その紫外線の盾がついに生命を海から陸へ進出させました。" },
  ice: { en: "Ice ages", ja: "氷河期",
    en_t: "Over the last half-million years Earth has swung through repeated ice ages. The pacemaker is not the Sun but slow, cyclic changes in the tilt of Earth's rotation axis, nudged by the gravity of the other planets.", ja_t: "過去50万年で地球は氷河期を繰り返してきました。そのペースを決めるのは太陽ではなく、他の惑星の重力に押された、地球の自転軸の傾きのゆっくりした周期的変化です。" },
  kt: { en: "The K–T impact", ja: "K–T衝突",
    en_t: "65 million years ago the dinosaurs — and the Cretaceous period — ended abruptly. The smoking gun is a worldwide sediment layer rich in iridium, a metal rare in Earth's crust but abundant in asteroids: the signature of a massive impact.", ja_t: "6500万年前、恐竜——そして白亜紀——は突然終わりました。決定的証拠は、イリジウムに富む世界規模の堆積層です。イリジウムは地殻に乏しく小惑星に豊富な金属——巨大衝突の痕跡です。" },
};

const STR = {
  en: {
    title: "Life, oxygen & catastrophes",
    kind: "Four billion years, told in three chapters",
    lede: "Earth's biography has quiet revolutions and violent full stops. Pick a chapter — the slow gift of oxygen, the metronome of the ice ages, or the day the dinosaurs' luck ran out.",
    thread: "THE STORY ENDS — FOR NOW",
    threadText: "A planet is not just rock and air but a stage for deep time. Life reshaped the very atmosphere that shelters it, while cosmic and orbital forces punctuated the story with ice and fire.",
    key: "LIFE MADE THE AIR; CHANCE PUNCTUATES IT",
    keyText: "Photosynthesising blue-green bacteria (fossil stromatolites date back over 3 billion years) slowly filled the air with oxygen from about 2 billion years ago, building the ozone layer that let life colonise the land. Since then, cyclic tilt changes driven by the other planets' gravity have paced the ice ages, and rare catastrophes have reset the story — most famously the impact 65 million years ago whose global iridium layer marks the end of the Cretaceous and the death of the dinosaurs.",
    note: "Life and chance both write Earth's history: photosynthesis gave us the oxygen and ozone that make land habitable, orbital tilt cycles drive the ice ages, and a single impact 65 million years ago closed the age of dinosaurs.",
    life: "life", o2: "O₂ rises", ozoneE: "ozone", land: "land life", impact: "impact 65 Mya", form: "Earth forms",
  },
  ja: {
    title: "生命・酸素・大変動",
    kind: "40億年を、3つの章で語る",
    lede: "地球の伝記には、静かな革命と激しい終止符があります。章を選ぼう——酸素というゆっくりした贈り物、氷河期のメトロノーム、あるいは恐竜の運が尽きた日を。",
    thread: "物語は（ひとまず）おわる",
    threadText: "惑星は岩と空気だけでなく、深い時間の舞台です。生命は自らを守る大気そのものを作り変え、宇宙と軌道の力が、氷と火で物語に句読点を打ちました。",
    key: "生命が空気をつくり、偶然が句読点を打つ",
    keyText: "光合成する青緑色細菌（化石ストロマトライトは30億年以上前にさかのぼる）が、約20億年前から空気を酸素で満たし、生命を陸へ進出させたオゾン層をつくりました。以来、他の惑星の重力による周期的な傾きの変化が氷河期のペースを決め、まれな大変動が物語をリセットしてきました——最も有名なのは6500万年前の衝突で、世界規模のイリジウム層が白亜紀の終わりと恐竜の死を刻んでいます。",
    note: "生命と偶然の両方が地球の歴史を書きます：光合成が陸を住める場所にする酸素とオゾンを与え、軌道の傾きの周期が氷河期を駆動し、6500万年前の一度の衝突が恐竜の時代を閉じました。",
    life: "生命", o2: "酸素上昇", ozoneE: "オゾン", land: "陸の生命", impact: "衝突 6500万年前", form: "地球形成",
  },
};

function drawTimeline(ctx, cw, H, t) {
  ctx.clearRect(0, 0, cw, H);
  const y = H / 2, x0 = 30, x1 = cw - 30;
  // axis from 4.5 Gyr ago (left) to now (right)
  ctx.strokeStyle = "rgba(150,175,230,0.4)"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
  const at = (gyr) => x0 + (1 - gyr / 4.5) * (x1 - x0); // gyr ago -> x
  const evts = [
    [4.5, t.form, "#ffcf6b"], [3.5, t.life, "#3fe89b"], [2.0, t.o2, "#3fddff"],
    [1.5, t.ozoneE, "#8fd0ff"], [0.5, t.land, "#c98bff"], [0.065, t.impact, "#ff6b6b"],
  ];
  evts.forEach(([g, label, col], i) => {
    const x = at(g); const up = i % 2 === 0;
    ctx.strokeStyle = col; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + (up ? -1 : 1) * 26); ctx.stroke();
    ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.muted; ctx.font = `10px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(label, x, y + (up ? -32 : 40));
  });
  ctx.fillStyle = C.faint; ctx.font = `10px ${mono}`; ctx.textAlign = "left"; ctx.fillText("4.5 Gyr ago", x0 - 6, y + 60);
  ctx.textAlign = "right"; ctx.fillText("now", x1 + 4, y + 60);
}

function drawIce(ctx, cw, H, tt) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2;
  const wob = Math.sin(tt * 0.03) * 0.32;
  const tilt = 0.41 + wob; // ~23.5° wobbling
  // Earth
  const g = ctx.createRadialGradient(cx - 14, cy - 14, 4, cx, cy, 46);
  g.addColorStop(0, "#7fb4ea"); g.addColorStop(1, "#3a5aa8");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 46, 0, Math.PI * 2); ctx.fill();
  // ice caps
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.beginPath(); ctx.ellipse(cx + Math.sin(tilt) * 40, cy - Math.cos(tilt) * 40, 16, 8, tilt, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx - Math.sin(tilt) * 40, cy + Math.cos(tilt) * 40, 16, 8, tilt, 0, Math.PI * 2); ctx.fill();
  // axis
  const ax = Math.sin(tilt) * 70, ay = Math.cos(tilt) * 70;
  ctx.strokeStyle = C.sun; ctx.setLineDash([5, 4]); ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(cx - ax, cy + ay); ctx.lineTo(cx + ax, cy - ay); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText("axis tilt slowly wobbles → ice ages", cx, H - 14);
}

function drawKT(ctx, cw, H, tt) {
  ctx.clearRect(0, 0, cw, H);
  const groundY = H - 40;
  // ground with iridium layer
  ctx.fillStyle = "#6b5a45"; ctx.fillRect(0, groundY, cw, 40);
  ctx.fillStyle = "rgba(120,120,140,0.9)"; ctx.fillRect(0, groundY, cw, 5);
  ctx.fillStyle = C.faint; ctx.font = `10px ${mono}`; ctx.textAlign = "left"; ctx.fillText("global iridium layer", 12, groundY + 20);
  // incoming asteroid
  const p = (tt * 0.01) % 1;
  const ax = 40 + p * (cw * 0.5), ay = 20 + p * (groundY - 30);
  ctx.strokeStyle = "rgba(255,180,120,0.6)"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(40, 20); ctx.lineTo(ax, ay); ctx.stroke();
  const rg = ctx.createRadialGradient(ax, ay, 1, ax, ay, 10);
  rg.addColorStop(0, "#fff2c0"); rg.addColorStop(1, "#ff6b3a");
  ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(ax, ay, 8, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.danger; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText("65 Mya · end of the Cretaceous", cw / 2, 20);
}

export function LifeOxygen() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 220;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [topic, setTopic] = useState("oxygen");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    const animated = topic === "ice" || topic === "kt";
    if (reduceMotion || !animated) {
      if (topic === "oxygen") drawTimeline(ctx, cw, H, t);
      else if (topic === "ice") drawIce(ctx, cw, H, 0);
      else drawKT(ctx, cw, H, 0);
      return;
    }
    let raf, tt = 0;
    const loop = () => { tt += 1; topic === "ice" ? drawIce(ctx, cw, H, tt) : drawKT(ctx, cw, H, tt); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, topic, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 08</div>
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
          {Object.keys(TOPICS).map((id) => (
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

export default LifeOxygen;
