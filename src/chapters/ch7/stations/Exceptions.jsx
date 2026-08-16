/* ============================================================
   STATION 8 — EXCEPTIONS & OTHER WORLDS
   The tidy rules have exceptions — Venus's retrograde spin and
   Uranus tipped on its side are blamed on giant early collisions.
   Voyager 2's Grand Tour used a rare 175-year alignment to visit
   all four giants. Jupiter & Saturn hide liquid metallic hydrogen.
   Exoplanet "hot Jupiters" show giant planets can migrate.
   Grounded in Ch.7 §7.1–7.4.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const TOPICS = {
  collisions: {
    en: "Giant collisions", ja: "巨大衝突",
    text: { en: "Most planets spin the same way, upright — but Venus turns backward (retrograde) and Uranus is tipped almost 98° onto its side. The best explanation is enormous, random impacts during the chaotic early solar system, which knocked these worlds off-kilter.", ja: "ほとんどの惑星は同じ向きに、直立して自転します——が、金星は逆向き（逆行）に回り、天王星はほぼ98°横倒しです。最有力の説明は、混沌とした初期太陽系での巨大でランダムな衝突が、これらの世界を傾けたというものです。" },
  },
  grandtour: {
    en: "The Grand Tour", ja: "グランドツアー",
    text: { en: "Voyager 2 exploited a rare planetary alignment that happens only about every 175 years, using each giant's gravity to slingshot on to the next — visiting Jupiter, Saturn, Uranus and Neptune on a single mission.", ja: "ボイジャー2号は約175年に一度しか起きない稀な惑星の整列を利用し、各巨大惑星の重力で次へと弾き飛ばされながら——一度の探査で木星・土星・天王星・海王星を訪れました。" },
  },
  liquidh: {
    en: "Liquid hydrogen", ja: "液体水素",
    text: { en: "Jupiter and Saturn are called 'liquid planets' for good reason: their interior pressure is so crushing that hydrogen is squeezed out of its gas state into a liquid — even a liquid metallic form deep down that generates their magnetic fields.", ja: "木星と土星が「液体の惑星」と呼ばれるのには理由があります：内部の圧力があまりに巨大で、水素が気体から液体へと押し込められ——深部では磁場を生む液体金属の状態にさえなります。" },
  },
  hotjupiter: {
    en: "Hot Jupiters", ja: "ホットジュピター",
    text: { en: "Around other stars we find 'hot Jupiters' — giant planets orbiting scorchingly close to their star, where giants shouldn't be able to form. This suggests giant planets can migrate great distances from their birthplace, forcing us to rewrite the rules of planet formation.", ja: "他の恒星のまわりには「ホットジュピター」——巨大惑星が生まれられないはずの、恒星のすぐそばを灼熱の軌道で回る巨大惑星——が見つかります。これは巨大惑星が誕生の場から遠くへ移動できることを示し、惑星形成の規則を書き換えさせています。" },
  },
};
const ORDER = ["collisions", "grandtour", "liquidh", "hotjupiter"];

const STR = {
  en: {
    title: "Exceptions & other worlds",
    kind: "Where the neat rules break — and what that teaches",
    lede: "Every good rule has rebels. Pick an oddity — a planet on its side, a spacecraft's once-in-a-lifetime route, an ocean of metal hydrogen, a giant hugging its star — and see what it reveals.",
    thread: "THE STORY ENDS — FOR NOW",
    threadText: "We built a clean picture: one disk, sorted by heat, making two families. The exceptions don't break that picture — they add the final ingredient, chance. Random collisions and migrations remind us the solar system's history was violent and is far from unique.",
    key: "CHANCE FINISHES THE STORY",
    keyText: "The regularities of the solar system come from its orderly birth in a single spinning disk; the exceptions come from chance. Giant impacts likely tipped Uranus on its side and reversed Venus's spin. Voyager 2's Grand Tour rode a 175-year alignment past all four giants. Inside Jupiter and Saturn, pressure turns hydrogen liquid. And 'hot Jupiters' around other stars show that giant planets can migrate far from where they form — proof that our tidy system is one outcome among many.",
    note: "These oddities are not failures of the theory — they are the fingerprints of a chaotic, collision-filled youth, and (with the exoplanets) a reminder that other solar systems can look very different from ours.",
  },
  ja: {
    title: "例外と他の世界",
    kind: "きれいな規則が破れる場所——そしてそれが教えること",
    lede: "良い規則には必ず反逆者がいます。奇妙な例を選ぼう——横倒しの惑星、一生に一度の探査機の経路、金属水素の海、恒星に寄り添う巨人——そしてそれが何を明かすか見よう。",
    thread: "物語は（ひとまず）おわる",
    threadText: "私たちはきれいな絵を描きました：一つの円盤が熱で仕分けされ、2つの一族を生む。例外はこの絵を壊しません——最後の材料、偶然を加えるのです。ランダムな衝突や移動は、太陽系の歴史が激しく、決して唯一無二ではないことを思い出させます。",
    key: "偶然が物語を仕上げる",
    keyText: "太陽系の規則性は、一つの回転する円盤での秩序ある誕生から来ます。例外は偶然から来ます。巨大衝突が天王星を横倒しにし、金星の自転を逆転させたと考えられます。ボイジャー2号のグランドツアーは175年周期の整列に乗って4つの巨大惑星を巡りました。木星と土星の内部では圧力が水素を液体に変えます。そして他の恒星の「ホットジュピター」は、巨大惑星が誕生地から遠くへ移動できることを示します——私たちの整った系が、数ある結果の一つにすぎない証拠です。",
    note: "これらの奇妙さは理論の失敗ではありません——衝突に満ちた混沌の若い時代の指紋であり、（系外惑星とともに）他の太陽系が私たちとは大きく異なりうることを思い出させます。",
  },
};

function draw(ctx, cw, H, topic, tt) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2;
  if (topic === "collisions") {
    // Uranus tipped ~98 deg with rotation axis nearly in the orbital plane
    const R = 46;
    const gg = ctx.createRadialGradient(cx - 14, cy - 14, 4, cx, cy, R);
    gg.addColorStop(0, "#bfe9f2"); gg.addColorStop(1, "#5aa6bd");
    ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
    // tilted axis (~98°): nearly horizontal
    const tilt = (98 * Math.PI) / 180;
    const ax = Math.sin(tilt) * (R + 26), ay = -Math.cos(tilt) * (R + 26);
    ctx.strokeStyle = C.sun; ctx.lineWidth = 2; ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(cx - ax, cy - ay); ctx.lineTo(cx + ax, cy + ay); ctx.stroke(); ctx.setLineDash([]);
    // ring nearly vertical (edge-on because tipped)
    ctx.strokeStyle = "rgba(190,220,240,0.7)"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(cx, cy, R + 16, (R + 16) * 0.9, 0.1, 0, Math.PI * 2); ctx.stroke();
    // impactor arrow
    ctx.strokeStyle = C.danger; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(cx - 150, cy - 70); ctx.lineTo(cx - R - 6, cy - 18); ctx.stroke();
    ctx.fillStyle = C.danger; ctx.beginPath(); ctx.moveTo(cx - R - 6, cy - 18); ctx.lineTo(cx - R - 22, cy - 24); ctx.lineTo(cx - R - 20, cy - 8); ctx.closePath(); ctx.fill();
    ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
    ctx.fillText("Uranus · ~98° tilt", cx, H - 14);
  } else if (topic === "grandtour") {
    // Voyager slinging past four giants
    const sunX = 40; ctx.fillStyle = "#ffd23d"; ctx.beginPath(); ctx.arc(sunX, cy, 9, 0, Math.PI * 2); ctx.fill();
    const gxs = [[0.30, "#e0a86a", 12], [0.50, "#e8cf9a", 10], [0.70, "#8fd0e0", 8], [0.88, "#5b7de0", 8]];
    gxs.forEach(([fr, col, r]) => { const x = sunX + fr * (cw - sunX - 20); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, cy, r, 0, Math.PI * 2); ctx.fill(); });
    // wavy trajectory
    ctx.strokeStyle = C.good; ctx.lineWidth = 2; ctx.beginPath();
    for (let i = 0; i <= 100; i++) { const fr = i / 100; const x = sunX + fr * (cw - sunX - 20); const y = cy + Math.sin(fr * 9) * 34 * (0.4 + fr); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
    ctx.stroke();
    const px = sunX + ((tt * 0.06) % 1) * (cw - sunX - 20);
    const py = cy + Math.sin(((tt * 0.06) % 1) * 9) * 34 * (0.4 + ((tt * 0.06) % 1));
    ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(px, py, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
    ctx.fillText("Voyager 2 · one 175-year alignment", cx, H - 12);
  } else if (topic === "liquidh") {
    // pressure vs depth bar; hydrogen: gas -> liquid -> liquid metallic
    const bx = cw * 0.3, bw = cw * 0.4, by = 30, bh = H - 70;
    const segs = [["gas H₂", "#8fb4ff", 0.28], ["liquid H", "#5b7de0", 0.42], ["liquid metallic H", "#c98bff", 0.30]];
    let y = by;
    segs.forEach(([label, col, f]) => {
      const h = bh * f; ctx.fillStyle = col; ctx.globalAlpha = 0.8; ctx.fillRect(bx, y, bw, h); ctx.globalAlpha = 1;
      ctx.fillStyle = "#0a0e1c"; ctx.font = `700 11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(label, bx + bw / 2, y + h / 2 + 4);
      y += h;
    });
    ctx.strokeStyle = "rgba(150,175,230,0.4)"; ctx.strokeRect(bx, by, bw, bh);
    ctx.fillStyle = C.faint; ctx.font = `10px ${mono}`; ctx.textAlign = "left";
    ctx.fillText("↑ low pressure (surface)", bx + bw + 8, by + 8);
    ctx.fillText("↓ crushing pressure (core)", bx + bw + 8, by + bh);
    ctx.textAlign = "center"; ctx.fillText("Jupiter / Saturn interior", cw / 2, H - 10);
  } else {
    // hot Jupiter hugging its star, with an inward migration arrow
    const starX = cw * 0.3;
    const sg = ctx.createRadialGradient(starX, cy, 3, starX, cy, 24);
    sg.addColorStop(0, "#fff6d8"); sg.addColorStop(0.5, "#ffd23d"); sg.addColorStop(1, "rgba(255,158,44,0)");
    ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(starX, cy, 24, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#ffd23d"; ctx.beginPath(); ctx.arc(starX, cy, 12, 0, Math.PI * 2); ctx.fill();
    // close orbit
    ctx.strokeStyle = "rgba(150,175,230,0.35)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.ellipse(starX, cy, 60, 26, 0, 0, Math.PI * 2); ctx.stroke();
    const ang = tt * 0.05;
    const jx = starX + Math.cos(ang) * 60, jy = cy + Math.sin(ang) * 26;
    const jg = ctx.createRadialGradient(jx - 4, jy - 4, 1, jx, jy, 12);
    jg.addColorStop(0, "#f0c07a"); jg.addColorStop(1, "#b07a3a");
    ctx.fillStyle = jg; ctx.beginPath(); ctx.arc(jx, jy, 12, 0, Math.PI * 2); ctx.fill();
    // migration arrow from far out toward the star
    ctx.strokeStyle = C.violet; ctx.lineWidth = 2.5; ctx.setLineDash([6, 5]);
    ctx.beginPath(); ctx.moveTo(cw - 30, cy + 50); ctx.lineTo(starX + 80, cy + 30); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = C.violet; ctx.beginPath(); ctx.moveTo(starX + 80, cy + 30); ctx.lineTo(starX + 96, cy + 24); ctx.lineTo(starX + 94, cy + 40); ctx.closePath(); ctx.fill();
    ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
    ctx.fillText("a giant that migrated inward", cw / 2, H - 12);
  }
}

export function Exceptions() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [topic, setTopic] = useState("collisions");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    const animated = topic === "grandtour" || topic === "hotjupiter";
    if (reduceMotion || !animated) { draw(ctx, cw, H, topic, 0); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, topic, tt); raf = requestAnimationFrame(loop); };
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
          {ORDER.map((id) => (
            <button key={id} onClick={() => setTopic(id)}
              style={{ ...styles.chip, ...(topic === id ? styles.chipOn : {}) }}>
              {lang === "ja" ? TOPICS[id].ja : TOPICS[id].en}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.5, marginTop: 10 }}>{TOPICS[topic].text[lang]}</p>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default Exceptions;
