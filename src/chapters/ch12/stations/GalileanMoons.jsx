/* ============================================================
   STATION 1 — THE GALILEAN MOONS
   Jupiter's four large moons, all rich in water ice (they formed in
   the cold outer solar system). Io is volcanic; Europa hides an
   ocean; Ganymede is the largest moon in the solar system (bigger
   than Mercury); Callisto is the outermost, most cratered, and
   geologically dead and undifferentiated. Galileo (the spacecraft)
   mapped them all. Grounded in Ch.12 §12.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const MOONS = [
  { id: "io", en: "Io", ja: "イオ", km: 3643, col: "#e8d26a",
    en_t: "The innermost Galilean moon — the most volcanically active world in the solar system, endlessly flexed and heated by Jupiter's tides.", ja_t: "最も内側のガリレオ衛星——太陽系で最も火山活動が活発な世界で、木星の潮汐で絶えず変形し加熱される。" },
  { id: "europa", en: "Europa", ja: "エウロパ", km: 3122, col: "#d8cbb0",
    en_t: "A smooth, cracked ice shell that hides a global liquid-water ocean beneath — one of the best places to search for life.", ja_t: "滑らかでひび割れた氷の殻の下に、全球的な液体の水の海を隠す——生命を探す最有力の場所の一つ。" },
  { id: "ganymede", en: "Ganymede", ja: "ガニメデ", km: 5262, col: "#b0a48c",
    en_t: "The largest moon in the entire solar system — bigger even than the planet Mercury — with its own magnetic field.", ja_t: "太陽系全体で最大の衛星——惑星の水星よりも大きく——独自の磁場をもつ。" },
  { id: "callisto", en: "Callisto", ja: "カリスト", km: 4821, col: "#8a7f6f",
    en_t: "The outermost Galilean moon: the most heavily cratered, geologically dead, and never fully differentiated — a frozen relic.", ja_t: "最も外側のガリレオ衛星：最もクレーターが多く、地質的に死んでいて、完全には分化しなかった——凍った遺物。" },
];
const MERCURY_KM = 4879;

const STR = {
  en: {
    title: "The Galilean moons",
    kind: "Four icy worlds around Jupiter",
    lede: "Galileo's four moons are a solar system in miniature — icy worlds that range from molten to frozen solid. Tap each to compare, and note how one outgrows a planet.",
    thread: "THE STORY BEGINS",
    threadText: "Beyond the giant planets themselves lies a menagerie of moons and rings, built not of rock but of ice — because out here, in the cold, water ice was the abundant raw material. Jupiter's four largest are the place to start.",
    key: "ICE WORLDS, ONE BIGGER THAN A PLANET",
    keyText: "Jupiter's four Galilean moons — Io, Europa, Ganymede, Callisto — all formed rich in water ice, the abundant building material of the cold outer solar system. They are astonishingly varied: Ganymede is the largest moon in the whole solar system, bigger even than the planet Mercury, while Callisto is the outermost, most heavily cratered, geologically dead and undifferentiated. The Galileo spacecraft orbited Jupiter and made repeated close flybys to map them all.",
    sizeL: "Diameter", vsMercury: "Mercury (4,879 km)",
    note: "All four are ice-rich worlds, yet wildly different — from volcanic Io to dead Callisto. Ganymede alone is larger than Mercury; the Galileo spacecraft mapped every one.",
  },
  ja: {
    title: "ガリレオ衛星",
    kind: "木星をめぐる4つの氷の世界",
    lede: "ガリレオの4つの衛星は、ミニチュアの太陽系です——溶けたものから凍りついたものまで幅広い氷の世界。それぞれをタップして比べ、一つが惑星をしのぐ様子に注目しよう。",
    thread: "物語のはじまり",
    threadText: "巨大惑星そのものの先には、岩石ではなく氷でできた衛星と環の一群があります——ここ、寒さの中では、水の氷が豊富な原材料だったからです。木星の4大衛星が出発点です。",
    key: "氷の世界、一つは惑星より大きい",
    keyText: "木星の4つのガリレオ衛星——イオ・エウロパ・ガニメデ・カリスト——はみな、冷たい外側の太陽系の豊富な建材である水の氷に富んで生まれました。その姿は驚くほど多様です：ガニメデは太陽系全体で最大の衛星で、惑星の水星より大きく、カリストは最も外側で最もクレーターが多く、地質的に死んで分化していません。ガリレオ探査機は木星を周回し、接近通過を繰り返してすべてを地図化しました。",
    sizeL: "直径", vsMercury: "水星（4,879 km）",
    note: "4つとも氷に富む世界ですが、火山のイオから死んだカリストまで大きく異なります。ガニメデだけで水星より大きく、ガリレオ探査機がすべてを地図化しました。",
  },
};

function draw(ctx, cw, H, sel, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // Jupiter at left edge
  const jx = 6, jy = H / 2, jR = H * 0.5;
  ctx.save(); ctx.beginPath(); ctx.arc(jx, jy, jR, 0, Math.PI * 2); ctx.clip();
  for (let i = 0; i < 10; i++) { ctx.fillStyle = i % 2 ? "#c98a4a" : "#e0b878"; ctx.fillRect(jx - jR, jy - jR + (i / 10) * 2 * jR, 2 * jR, 2 * jR / 10 + 1); }
  ctx.restore();
  // moons in a row, sized to scale (diameter)
  const maxKm = MERCURY_KM;
  const baseX = jR + 40, gap = (cw - baseX - 20) / MOONS.length;
  MOONS.forEach((m, i) => {
    const mx = baseX + i * gap + gap / 2, my = H * 0.44;
    const r = (m.km / maxKm) * (H * 0.3);
    const on = m.id === sel;
    const g = ctx.createRadialGradient(mx - r * 0.3, my - r * 0.3, 1, mx, my, r);
    g.addColorStop(0, m.col); g.addColorStop(1, "rgba(0,0,0,0.35)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(mx, my, r, 0, Math.PI * 2); ctx.fill();
    if (on) { ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(mx, my, r + 3, 0, Math.PI * 2); ctx.stroke(); }
    ctx.fillStyle = on ? C.text : C.muted; ctx.font = `${on ? "700 " : ""}11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(lang === "ja" ? m.ja : m.en, mx, H - 22);
    ctx.fillStyle = C.faint; ctx.font = `10px ${mono}`; ctx.fillText(m.km.toLocaleString() + " km", mx, H - 8);
  });
  // Mercury reference line (dashed) at the largest size
  const mr = (MERCURY_KM / maxKm) * (H * 0.3);
  ctx.strokeStyle = "rgba(255,207,107,0.5)"; ctx.setLineDash([4, 3]); ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(cw - 40, H * 0.44, mr, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = C.sun; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.vsMercury, cw - 40, H * 0.44 - mr - 4);
}

export function GalileanMoons() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [sel, setSel] = useState("ganymede");
  const m = MOONS.find((x) => x.id === sel);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, sel, 0, lang);
  }, [cw, sel, lang]);

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
          {MOONS.map((x) => (
            <button key={x.id} onClick={() => setSel(x.id)}
              style={{ ...styles.chip, ...(sel === x.id ? styles.chipOn : {}), borderColor: sel === x.id ? x.col : undefined }}>{lang === "ja" ? x.ja : x.en}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.5, marginTop: 8 }}>
          <b style={{ color: C.text }}>{lang === "ja" ? m.ja : m.en}</b> · {m.km.toLocaleString()} km — {lang === "ja" ? m.ja_t : m.en_t}
        </p>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default GalileanMoons;
