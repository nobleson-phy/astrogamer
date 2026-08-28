/* ============================================================
   STATION 6 — MARS: VOLCANOES & CANYONS
   Mars has the tallest volcano in the solar system, Olympus Mons
   (>20 km high) — because low gravity and a STATIONARY crust let
   lava pile up in one spot for hundreds of millions of years.
   From Olympus down to the Hellas basin, the elevation range is
   31 km. Valles Marineris looks like a river canyon but is a
   tectonic crack from the Tharsis uplift. Grounded in Ch.10 §10.4.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const TOPICS = {
  olympus: { en: "Olympus Mons", ja: "オリンポス山",
    en_t: "The largest volcano in the solar system — over 20 km high, its base wider than the state of Missouri. Low Martian gravity and a crust that does not move let one volcano grow for hundreds of millions of years.", ja_t: "太陽系最大の火山——高さ20 km超、底面は米ミズーリ州より広い。火星の低重力と動かない地殻が、一つの火山を数億年かけて成長させた。" },
  earth: { en: "Why so tall?", ja: "なぜこれほど高い？",
    en_t: "On Earth, moving plates drag the crust over a hotspot, spreading eruptions into a CHAIN of smaller volcanoes (like Hawaii). Mars's crust is fixed, so all the lava stacks in one place — and weak gravity lets it rise more than twice as high.", ja_t: "地球では動くプレートが地殻をホットスポット上で引きずり、噴火を小さな火山の連なり（ハワイなど）に広げる。火星の地殻は固定なので、溶岩がすべて一か所に積み上がり——弱い重力が2倍以上の高さを許す。" },
  hellas: { en: "Hellas basin", ja: "ヘラス盆地",
    en_t: "The lowest point on Mars — a giant impact basin. From the summit of Olympus Mons down to the floor of Hellas, the total elevation range is 31 km.", ja_t: "火星の最低地点——巨大な衝突盆地。オリンポス山の頂からヘラスの底まで、標高差は合計31 km。" },
  valles: { en: "Valles Marineris", ja: "マリネリス峡谷",
    en_t: "A canyon system that dwarfs the Grand Canyon — but it was NOT cut by a river. It has no outlets: it is a tectonic crack, opened by crustal tension during the nearby Tharsis uplift and widened by landslides.", ja_t: "グランドキャニオンをはるかにしのぐ峡谷系——だが川が刻んだのではない。出口がなく、近くのタルシス隆起による地殻の張力で開いた地溝で、地滑りで広がった。" },
};
const ORDER = ["olympus", "earth", "hellas", "valles"];

const STR = {
  en: {
    title: "Mars: volcanoes & canyons",
    kind: "The biggest landforms in the solar system",
    lede: "A small planet built the largest volcano and one of the deepest canyons anywhere. Explore why — the answers are low gravity, a crust that never moves, and a crack that only looks like a river.",
    thread: "THE STORY CONTINUES",
    threadText: "Mars is barely half Earth's size, yet its scenery is outsized. The reason is a crust that sits still: without drifting plates, everything Mars builds it builds in one place, and builds enormous.",
    key: "ONE STATIONARY CRUST, GIANT RESULTS",
    keyText: "Olympus Mons is the tallest volcano in the solar system, over 20 km high. It grew so big because Mars has low surface gravity (less weight to slump the mountain) and a stationary crust: with no plate motion to carry the ground off a hotspot, lava piles up in one fixed place for hundreds of millions of years — unlike Earth, where drifting plates spread eruptions into a chain. From Olympus down to the Hellas impact basin, Mars spans 31 km in elevation. And the great canyon Valles Marineris, though it resembles a river valley, is really a tectonic crack from the Tharsis uplift, with no outlets.",
    note: "Low gravity plus a crust that never moves let Mars stack a single volcano over 20 km high; its biggest 'river canyon' is actually a tectonic rift, not water-cut.",
  },
  ja: {
    title: "火星：火山と峡谷",
    kind: "太陽系で最大の地形",
    lede: "小さな惑星が、どこよりも大きな火山と最も深い峡谷の一つをつくりました。理由を探ろう——低重力、決して動かない地殻、そして川のように見えるだけの地溝です。",
    thread: "物語はつづく",
    threadText: "火星は地球の半分ほどの大きさ、それでも景観は桁外れです。理由は静止した地殻：漂うプレートがないため、火星がつくるものはすべて一か所に、そして巨大につくられます。",
    key: "一つの静止した地殻、巨大な結果",
    keyText: "オリンポス山は太陽系最大の火山で、高さ20 km超。これほど大きくなったのは、火星の低い表面重力（山を崩す重さが小さい）と静止した地殻のためです：ホットスポットから地面を運び去るプレート運動がないので、溶岩が一か所に数億年積み上がります——噴火を連なりに広げる地球とは違います。オリンポスからヘラス衝突盆地まで、火星の標高差は31 km。そして大峡谷マリネリスは、川の谷に似ていても、実はタルシス隆起による地溝で、出口がありません。",
    note: "低重力と決して動かない地殻が、高さ20 km超の一つの火山を積み上げました。最大の「川の峡谷」は、実は水が刻んだのではない地溝です。",
  },
};

function draw(ctx, cw, H, topic) {
  ctx.clearRect(0, 0, cw, H);
  ctx.fillStyle = "#c86a3a"; ctx.fillRect(0, 0, cw, H);
  const groundY = H - 26;
  if (topic === "olympus" || topic === "earth") {
    ctx.fillStyle = "#7a3a1c"; ctx.fillRect(0, groundY, cw, 26);
    if (topic === "olympus") {
      // one giant shield volcano
      ctx.fillStyle = "#8a4424"; ctx.beginPath(); ctx.moveTo(cw * 0.2, groundY); ctx.quadraticCurveTo(cw * 0.5, 24, cw * 0.8, groundY); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = "rgba(30,16,8,0.6)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(cw * 0.5, 30, 22, 6, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = C.sun; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(cw * 0.85, groundY); ctx.lineTo(cw * 0.85, 30); ctx.stroke();
      ctx.fillStyle = C.sun; ctx.font = `12px ${mono}`; ctx.textAlign = "left"; ctx.fillText(">20 km", cw * 0.85 + 6, H / 2);
      ctx.textAlign = "center"; ctx.fillText("Olympus Mons", cw * 0.5, groundY + 18);
    } else {
      // Earth: chain of small volcanoes from a moving plate over a hotspot
      for (let i = 0; i < 5; i++) { const x = cw * (0.18 + i * 0.16), h = 28 + (2 - Math.abs(i - 2)) * 14; ctx.fillStyle = "#8a4424"; ctx.beginPath(); ctx.moveTo(x - 26, groundY); ctx.lineTo(x, groundY - h); ctx.lineTo(x + 26, groundY); ctx.closePath(); ctx.fill(); }
      ctx.fillStyle = "#ff6b3a"; ctx.beginPath(); ctx.arc(cw * 0.5, groundY + 14, 5, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = C.cool; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cw * 0.14, groundY + 12); ctx.lineTo(cw * 0.86, groundY + 12); ctx.stroke();
      ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText("Earth: moving plate → chain of small volcanoes", cw / 2, 24);
      ctx.fillStyle = "#ff6b3a"; ctx.fillText("hotspot", cw * 0.5, groundY + 26);
    }
  } else if (topic === "hellas") {
    // elevation profile from Olympus summit down to Hellas floor
    ctx.strokeStyle = "rgba(150,175,230,0.35)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(20, 30); ctx.lineTo(20, H - 20); ctx.stroke();
    ctx.fillStyle = "#8a4424"; ctx.beginPath(); ctx.moveTo(30, H - 40); ctx.lineTo(cw * 0.32, 40); ctx.lineTo(cw * 0.5, H - 40); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(cw * 0.55, H - 40); ctx.quadraticCurveTo(cw * 0.72, H - 6, cw * 0.9, H - 40); ctx.lineTo(cw * 0.9, H - 10); ctx.lineTo(cw * 0.55, H - 10); ctx.closePath(); ctx.fill();
    ctx.fillStyle = C.sun; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText("Olympus (+21 km)", cw * 0.32, 32);
    ctx.fillStyle = C.cool; ctx.fillText("Hellas (−10 km)", cw * 0.72, H - 44);
    ctx.fillStyle = C.text; ctx.font = `700 13px ${mono}`; ctx.fillText("total range 31 km", cw * 0.5, 20);
  } else {
    // Valles Marineris: a long tectonic gash
    ctx.fillStyle = "#8a4424"; ctx.fillRect(0, 0, cw, H);
    ctx.fillStyle = "#3a1c0e";
    ctx.beginPath(); ctx.moveTo(20, H * 0.42); ctx.lineTo(cw - 20, H * 0.5); ctx.lineTo(cw - 20, H * 0.66); ctx.lineTo(20, H * 0.6); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = "rgba(255,220,180,0.4)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(20, H * 0.42); ctx.lineTo(cw - 20, H * 0.5); ctx.stroke();
    // pull-apart arrows (tension)
    ctx.strokeStyle = C.cool; ctx.lineWidth = 2; ctx.fillStyle = C.cool;
    ctx.beginPath(); ctx.moveTo(cw * 0.5, H * 0.2); ctx.lineTo(cw * 0.3, H * 0.2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cw * 0.5, H * 0.82); ctx.lineTo(cw * 0.7, H * 0.82); ctx.stroke();
    ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText("tectonic crack (Tharsis uplift) — no river", cw / 2, H - 12);
  }
}

export function MarsVolcanoes() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [topic, setTopic] = useState("olympus");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, topic);
  }, [cw, topic, lang]);

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

export default MarsVolcanoes;
