/* ============================================================
   STATION 1 — METEOR SHOWERS
   A meteor shower happens when Earth plows through the dusty trail of a
   comet (or, for the Geminids, the asteroid Phaethon). The particles
   travel on parallel paths; perspective makes their streaks appear to
   diverge from a single point, the RADIANT — like parallel rails
   meeting in the distance. Most shower meteors are fluffy, low-density
   (<1 g/cm³) cometary dust. The Perseids (~Aug 11) are the most
   dependable. Grounded in Ch.14 §14.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const SHOWERS = [
  { id: "perseid", en: "Perseids", ja: "ペルセウス座流星群", date: "~Aug 11", dateJa: "8月11日ごろ",
    parent: "Comet Swift-Tuttle", parentJa: "スイフト・タットル彗星", kind: "comet",
    en_d: "The most dependable annual shower, peaking for about three nights near August 11.", ja_d: "最も安定した毎年の流星群で、8月11日ごろに約3晩ピークを迎える。" },
  { id: "geminid", en: "Geminids", ja: "ふたご座流星群", date: "~Dec 14", dateJa: "12月14日ごろ",
    parent: "Asteroid Phaethon", parentJa: "小惑星ファエトン", kind: "asteroid",
    en_d: "Unusual: its parent is the ACTIVE ASTEROID Phaethon, not a comet.", ja_d: "異例：母天体は彗星ではなく活動的な小惑星ファエトン。" },
  { id: "leonid", en: "Leonids", ja: "しし座流星群", date: "~Nov 17", dateJa: "11月17日ごろ",
    parent: "Comet Tempel-Tuttle", parentJa: "テンペル・タットル彗星", kind: "comet",
    en_d: "Usually modest, but its clumpy stream occasionally produces spectacular meteor STORMS.", ja_d: "普段は控えめだが、塊状の流れが時に壮観な流星「嵐」を生む。" },
  { id: "lyrid", en: "Lyrids", ja: "こと座流星群", date: "~Apr 22", dateJa: "4月22日ごろ",
    parent: "Comet Thatcher", parentJa: "サッチャー彗星", kind: "comet",
    en_d: "An older, more modest shower from Comet Thatcher, seen for over 2,000 years.", ja_d: "サッチャー彗星による古く控えめな流星群で、2,000年以上見られてきた。" },
];

const STR = {
  en: {
    title: "Meteor showers",
    kind: "Parallel dust, a single radiant",
    lede: "Pick a shower and watch the meteors. They all seem to shoot from one point — the radiant — but that's an illusion of perspective, like railroad tracks meeting on the horizon.",
    thread: "THE STORY BEGINS",
    threadText: "Every year Earth sweeps through trails of debris left by comets and one odd asteroid. The dust burns up as meteors — and their pattern in the sky tells us how they really move.",
    key: "THE RADIANT IS AN ILLUSION OF PERSPECTIVE",
    keyText: "A meteor shower occurs when Earth passes through the dusty trail of a comet — or, for the Geminids, the active asteroid Phaethon. The particles all move through space on PARALLEL paths, but perspective makes their streaks appear to diverge from a single point in the sky, the RADIANT, just as parallel railroad tracks seem to meet in the distance. Most shower meteors are very light, porous cometary dust with densities under 1.0 g/cm³. The Perseids, near August 11, are the most dependable annual display.",
    parentL: "Parent body", peakL: "Peak",
    radiant: "radiant (perspective point)", density: "shower-meteor density: < 1.0 g/cm³ (porous dust)",
    note: "Shower particles travel on parallel paths; perspective makes them fan out from the radiant. The Perseids (Aug 11) are the most dependable; the Geminids come from asteroid Phaethon.",
  },
  ja: {
    title: "流星群",
    kind: "平行な塵、一つの放射点",
    lede: "流星群を選んで流星を見よう。すべてが一点——放射点——から飛び出すように見えますが、それは遠近法の錯覚です。地平線で交わる線路のように。",
    thread: "物語のはじまり",
    threadText: "毎年、地球は彗星と一つの変わった小惑星が残した破片の帯を通り抜けます。塵は流星として燃え尽き——空でのその模様が、実際の動きを教えてくれます。",
    key: "放射点は遠近法の錯覚",
    keyText: "流星群は、地球が彗星——ふたご座流星群では活動的な小惑星ファエトン——の塵の帯を通るときに起こります。粒子はすべて宇宙空間を平行な経路で進みますが、遠近法によって、その筋は空の一点、放射点から広がって見えます。ちょうど平行な線路が遠くで交わって見えるように。ほとんどの流星群の流星は非常に軽く多孔質の彗星の塵で、密度は1.0 g/cm³未満です。8月11日ごろのペルセウス座流星群が最も安定した毎年の流星群です。",
    parentL: "母天体", peakL: "ピーク",
    radiant: "放射点（遠近法の点）", density: "流星群の流星の密度：< 1.0 g/cm³（多孔質の塵）",
    note: "流星群の粒子は平行な経路を進み、遠近法で放射点から広がって見えます。ペルセウス座（8月11日）が最も安定、ふたご座は小惑星ファエトン由来です。",
  },
};

function draw(ctx, cw, H, tt, meteors, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // starfield
  for (let i = 0; i < 40; i++) { const x = (i * 97) % cw, y = (i * 53) % H; ctx.fillStyle = "rgba(200,210,235,0.3)"; ctx.fillRect(x, y, 1, 1); }
  // radiant point upper-left-ish
  const rx = cw * 0.3, ry = H * 0.3;
  // meteors stream outward from radiant on parallel-looking diverging tracks
  meteors.forEach((m) => {
    const life = (tt - m.t0) / m.life;
    if (life < 0 || life > 1) return;
    const dist = life * m.len;
    const x0 = rx + Math.cos(m.ang) * (m.start + dist);
    const y0 = ry + Math.sin(m.ang) * (m.start + dist);
    const tailX = rx + Math.cos(m.ang) * (m.start + dist - 18);
    const tailY = ry + Math.sin(m.ang) * (m.start + dist - 18);
    const g = ctx.createLinearGradient(tailX, tailY, x0, y0);
    g.addColorStop(0, "rgba(180,210,255,0)"); g.addColorStop(1, `rgba(220,235,255,${0.9 * (1 - life)})`);
    ctx.strokeStyle = g; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(tailX, tailY); ctx.lineTo(x0, y0); ctx.stroke();
    ctx.fillStyle = `rgba(255,255,255,${0.9 * (1 - life)})`; ctx.beginPath(); ctx.arc(x0, y0, 1.6, 0, Math.PI * 2); ctx.fill();
  });
  // radiant marker + dashed guide lines showing divergence
  ctx.strokeStyle = "rgba(255,207,107,0.25)"; ctx.setLineDash([4, 4]); ctx.lineWidth = 1;
  for (let a = 0.15; a < 1.4; a += 0.28) { ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(rx + Math.cos(a) * cw, ry + Math.sin(a) * cw); ctx.stroke(); }
  ctx.setLineDash([]);
  ctx.fillStyle = C.sun; ctx.beginPath(); ctx.arc(rx, ry, 4, 0, Math.PI * 2); ctx.fill();
  ctx.font = `10px ${mono}`; ctx.textAlign = "left"; ctx.fillText(t.radiant, rx + 8, ry - 6);
}

export function MeteorShowers() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [sel, setSel] = useState("perseid");
  const sh = SHOWERS.find((x) => x.id === sel);
  const meteorsRef = useRef([]);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    const spawn = (tt) => ({ t0: tt + Math.random() * 40, life: 40 + Math.random() * 40, ang: 0.2 + Math.random() * 1.15, start: 20 + Math.random() * 40, len: 120 + Math.random() * 160 });
    meteorsRef.current = Array.from({ length: 18 }, () => spawn(0));
    if (reduceMotion) { draw(ctx, cw, H, 30, meteorsRef.current, lang); return; }
    let raf, tt = 0;
    const loop = () => {
      tt += 1;
      meteorsRef.current = meteorsRef.current.map((m) => ((tt - m.t0) / m.life > 1 ? spawn(tt) : m));
      draw(ctx, cw, H, tt, meteorsRef.current, lang);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

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

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {SHOWERS.map((x) => (
            <button key={x.id} onClick={() => setSel(x.id)}
              style={{ ...styles.chip, ...(sel === x.id ? styles.chipOn : {}) }}>{lang === "ja" ? x.ja : x.en}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.5, marginTop: 8 }}>
          {lang === "ja" ? sh.ja_d : sh.en_d}
        </p>
        <div style={{ fontFamily: mono, fontSize: 12, color: C.cool, marginTop: 4 }}>
          {t.peakL}: {lang === "ja" ? sh.dateJa : sh.date} · {t.parentL}: <span style={{ color: sh.kind === "asteroid" ? "#e0b878" : "#8fc0e8" }}>{lang === "ja" ? sh.parentJa : sh.parent}</span>
        </div>
        <div style={{ fontFamily: mono, fontSize: 11.5, color: C.faint, marginTop: 4 }}>{t.density}</div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default MeteorShowers;
