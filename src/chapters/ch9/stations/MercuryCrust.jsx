/* ============================================================
   STATION 8 — MERCURY'S SCARRED CRUST
   The Caloris Basin (1300 km, partly lava-filled) is Mercury's
   largest feature. Long cliffs — scarps like Discovery Scarp,
   ~1 km high and hundreds of km long — cut across older craters:
   the crust wrinkled as the big iron core cooled and SHRANK.
   Mercury's craters honour artists and writers; and, being dead
   and airless, it (like the Moon) preserves the early solar
   system's record. Grounded in Ch.9 §9.4.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const TOPICS = {
  caloris: { en: "Caloris Basin", ja: "カロリス盆地",
    en_t: "Mercury's largest feature: a partially lava-flooded impact basin about 1,300 km across — a scar from a colossal early collision.", ja_t: "水星最大の地形：一部が溶岩で満たされた直径約1,300 kmの衝突盆地——初期の巨大衝突の傷跡。" },
  scarps: { en: "Scarps (shrinking crust)", ja: "崖（縮む地殻）",
    en_t: "Long cliffs like Discovery Scarp — nearly 1 km high and hundreds of km long — cut across craters. They formed as Mercury's huge iron core cooled and shrank, wrinkling the whole crust in global compression.", ja_t: "ディスカバリー崖のような長い崖——高さ約1 km、長さ数百 km——がクレーターを横切る。水星の巨大な鉄の核が冷えて縮み、地殻全体がしわ寄って（全球圧縮）できた。" },
  windows: { en: "Names & windows", ja: "名前と「窓」",
    en_t: "Mercury's craters are named for artists, writers and composers (the Moon's honour scientists). And because both worlds are dead and airless, their battered faces preserve the early solar system's history that Earth's active geology erased.", ja_t: "水星のクレーターは芸術家・作家・作曲家にちなむ（月は科学者）。そして両世界とも死んで空気がないため、その傷ついた顔は、地球の活発な地質が消した初期太陽系の歴史を保つ。" },
};
const ORDER = ["caloris", "scarps", "windows"];

const STR = {
  en: {
    title: "Mercury's scarred crust",
    kind: "A giant basin and a shrinking world",
    lede: "Mercury's face records two kinds of violence: one titanic impact, and the slow squeeze of a cooling planet. Pick a feature to explore — and see why airless worlds are time machines.",
    thread: "THE STORY ENDS — FOR NOW",
    threadText: "Mercury wears its history openly. A vast basin from a single blow, cliffs from a planet-wide shrinkage, and craters everywhere — a face that, like the Moon's, is a preserved page from the solar system's youth.",
    key: "THE CLIFFS OF A COOLING PLANET",
    keyText: "Mercury's biggest feature is the Caloris Basin, a partly lava-filled impact basin ~1,300 km across. Crisscrossing the surface are long scarps (cliffs) such as Discovery Scarp — nearly 1 km high and hundreds of km long — that cut across existing craters. They record global compression: as Mercury's large iron core cooled and shrank, the whole crust wrinkled. Fittingly, Mercury's craters are named for artists and writers, not scientists — and because Mercury and the Moon are geologically dead and airless, they preserve the ancient cratering record that Earth long ago erased.",
    play: "▶ Cool & shrink",
    note: "Whether the vast Caloris Basin or the planet-wide scarps, Mercury's scars are frozen in place — an airless, dead world keeps its history where Earth's living geology destroys it.",
  },
  ja: {
    title: "水星の傷ついた地殻",
    kind: "巨大な盆地と、縮む世界",
    lede: "水星の顔は2種類の暴力を記録します：ひとつの巨大衝突と、冷える惑星のゆっくりした締めつけ。地形を選んで調べ——空気のない世界がなぜタイムマシンなのかを見よう。",
    thread: "物語は（ひとまず）おわる",
    threadText: "水星は歴史を包み隠さず身にまといます。一撃による広大な盆地、全球的な収縮による崖、そして至る所のクレーター——月と同じく、太陽系の若い時代の保存されたページのような顔です。",
    key: "冷える惑星の崖",
    keyText: "水星最大の地形はカロリス盆地、一部が溶岩で満たされた直径約1,300 kmの衝突盆地です。表面を縦横に走るのが、ディスカバリー崖のような長い崖——高さ約1 km、長さ数百 km——で、既存のクレーターを横切ります。これらは全球圧縮を記録します：水星の大きな鉄の核が冷えて縮むと、地殻全体がしわ寄ったのです。ふさわしく、水星のクレーターは科学者ではなく芸術家や作家にちなみます——そして水星と月は地質的に死んで空気がないため、地球がとうに消した古いクレーターの記録を保っています。",
    play: "▶ 冷えて縮む",
    note: "広大なカロリス盆地でも全球の崖でも、水星の傷はその場に凍りついています——空気のない死んだ世界は、地球の生きた地質が壊す歴史を、そのまま保つのです。",
  },
};

function rng(seed) { let s = seed; return () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff; }

function drawCaloris(ctx, cw, H) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2;
  // Mercury surface
  ctx.fillStyle = "#8a8072"; ctx.fillRect(0, 0, cw, H);
  const r = rng(11);
  for (let i = 0; i < 70; i++) { const x = r() * cw, y = r() * H, rad = 2 + r() * 6; ctx.fillStyle = "rgba(60,56,50,0.4)"; ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = "rgba(230,226,218,0.4)"; ctx.lineWidth = 0.7; ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2); ctx.stroke(); }
  // Caloris basin — big, lava-filled with concentric rings
  const R = Math.min(cw * 0.24, H * 0.4);
  ctx.fillStyle = "#6b6152"; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
  for (let k = 4; k >= 1; k--) { ctx.strokeStyle = `rgba(210,180,120,${0.25 + k * 0.1})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, R * k / 4, 0, Math.PI * 2); ctx.stroke(); }
  ctx.fillStyle = C.sun; ctx.font = `700 12px ${mono}`; ctx.textAlign = "center"; ctx.fillText("Caloris Basin · ~1,300 km", cx, cy + R + 20);
}

function drawScarps(ctx, cw, H, prog) {
  ctx.clearRect(0, 0, cw, H);
  ctx.fillStyle = "#8a8072"; ctx.fillRect(0, 0, cw, H);
  const r = rng(23);
  // some craters
  const craters = [];
  for (let i = 0; i < 26; i++) { const x = r() * cw, y = r() * H, rad = 6 + r() * 16; craters.push([x, y, rad]); ctx.fillStyle = "rgba(60,56,50,0.4)"; ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = "rgba(230,226,218,0.4)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2); ctx.stroke(); }
  // scarps grow as the planet shrinks (prog)
  const scarps = [[0.1, 0.25, 0.9, 0.55], [0.2, 0.8, 0.75, 0.35], [0.55, 0.15, 0.95, 0.85]];
  scarps.forEach(([x0, y0, x1, y1], i) => {
    const fx0 = x0 * cw, fy0 = y0 * H, fx1 = clamp(x0 + (x1 - x0) * prog, 0, 1) * cw, fy1 = clamp(y0 + (y1 - y0) * prog, 0, 1) * H;
    ctx.strokeStyle = "rgba(40,34,28,0.85)"; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(fx0, fy0); ctx.lineTo(fx1, fy1); ctx.stroke();
    // sunlit edge (cliff face)
    ctx.strokeStyle = "rgba(240,236,228,0.6)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(fx0, fy0 - 2); ctx.lineTo(fx1, fy1 - 2); ctx.stroke();
  });
  ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.textAlign = "left"; ctx.fillText("scarps cut across craters →", 12, H - 12);
  // shrink indicator
  ctx.fillStyle = C.sun; ctx.font = `12px ${mono}`; ctx.textAlign = "right"; ctx.fillText("core cooled · crust shrank " + Math.round(prog * 100) + "%", cw - 12, 20);
}

function drawWindows(ctx, cw, H) {
  ctx.clearRect(0, 0, cw, H);
  // two dead worlds preserving craters, vs Earth erasing
  const drawWorld = (x, label, col, cratered) => {
    ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, H / 2, 44, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.arc(x, H / 2, 44, 0, Math.PI * 2); ctx.clip();
    const r = rng(x | 0);
    const n = cratered ? 40 : 4;
    for (let i = 0; i < n; i++) { const cx2 = x - 44 + r() * 88, cy2 = H / 2 - 44 + r() * 88, rad = 2 + r() * 5; ctx.fillStyle = "rgba(40,36,30,0.5)"; ctx.beginPath(); ctx.arc(cx2, cy2, rad, 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();
    ctx.fillStyle = C.muted; ctx.font = `12px ${mono}`; ctx.textAlign = "center"; ctx.fillText(label, x, H / 2 + 60);
  };
  drawWorld(cw * 0.22, "Moon", "#c9c1b0", true);
  drawWorld(cw * 0.5, "Mercury", "#a89a86", true);
  drawWorld(cw * 0.78, "Earth", "#5b8dee", false);
  ctx.fillStyle = C.faint; ctx.font = `10.5px ${mono}`; ctx.textAlign = "center";
  ctx.fillText("preserved record", cw * 0.36, 20); ctx.fillText("erased by geology", cw * 0.78, 20);
}

export function MercuryCrust() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [topic, setTopic] = useState("caloris");
  const progRef = useRef(1);
  const runRef = useRef(false);
  const topicRef = useRef(topic); topicRef.current = topic;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (topic === "caloris") { drawCaloris(ctx, cw, H); return; }
    if (topic === "windows") { drawWindows(ctx, cw, H); return; }
    // scarps: animate the shrink
    if (reduceMotion) { drawScarps(ctx, cw, H, 1); return; }
    let raf;
    const loop = () => {
      if (topicRef.current !== "scarps") return;
      if (runRef.current) { progRef.current = clamp(progRef.current + 0.01, 0, 1); if (progRef.current >= 1) runRef.current = false; }
      drawScarps(ctx, cw, H, progRef.current);
      raf = requestAnimationFrame(loop);
    };
    runRef.current = true; progRef.current = 0; loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, topic, lang]);

  const replay = () => { progRef.current = 0; runRef.current = true; };

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
              style={{ ...styles.chip, ...(topic === id ? styles.chipOn : {}) }}>{lang === "ja" ? TOPICS[id].ja : TOPICS[id].en}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        {topic === "scarps" && <div style={{ marginTop: 8 }}><button style={styles.iconBtn} onClick={replay}>{t.play}</button></div>}

        <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.5, marginTop: 8 }}>{lang === "ja" ? TOPICS[topic].ja_t : TOPICS[topic].en_t}</p>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default MercuryCrust;
