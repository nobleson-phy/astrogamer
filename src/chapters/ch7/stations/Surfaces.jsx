/* ============================================================
   STATION 6 — READING SURFACES
   A surface collects impact craters over time, so more craters =
   older surface. And small worlds lose their internal heat fast and
   go geologically dead, while large planets stay hot and active.
   Grounded in Ch.7 §7.2–7.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Reading surfaces",
    kind: "Crater counts & the heat of small worlds",
    lede: "A planet's face is a logbook. Slide time forward and watch craters pile up on an exposed plain — then compare small and large worlds to see which stays alive.",
    thread: "THE STORY CONTINUES",
    threadText: "With a clock in hand, we can date not just rocks but whole landscapes — by counting their scars. And the same counting reveals a deeper split: which worlds are still alive inside, and which have gone cold.",
    key: "MORE CRATERS = OLDER; SMALL = DEAD SOONER",
    keyText: "Impacts rain down steadily, so an old, undisturbed surface is heavily cratered while a young or recently resurfaced one is nearly smooth — counting craters dates a landscape. Meanwhile, a world's internal heat leaks away through its surface: small bodies like the Moon have little heat and a lot of surface for their volume, so they cooled quickly and became geologically dead, while larger planets like Earth hold their primordial heat far longer and stay volcanically and tectonically active.",
    vCraters: "Crater counting", vHeat: "Heat & size",
    ancient: "Ancient highlands", young: "Young plains", ageSlider: "Time this plain has been exposed:",
    craters: "craters", older: "OLDER", younger: "YOUNGER",
    sizeSlider: "World size:", small: "small (Moon-like)", big: "big (Earth-like)",
    active: "geologically ACTIVE", dead: "geologically DEAD", heatL: "Internal heat",
    note1: "The left surface is ancient and saturated with craters; the right one collects them as you slide time forward. More craters means a longer-exposed, older surface.",
    note2: "A big world keeps its inner heat and stays active (volcanoes, moving crust); a small world radiates its heat away fast and freezes solid — geologically dead.",
  },
  ja: {
    title: "表面を読む",
    kind: "クレーターの数と、小さな世界の熱",
    lede: "惑星の顔は航海日誌です。時間を進めて、むき出しの平原にクレーターが積み重なる様子を見よう——そして小さな世界と大きな世界を比べ、どちらが生き続けるかを確かめよう。",
    thread: "物語はつづく",
    threadText: "時計を手にすれば、岩石だけでなく地形全体の年代も測れます——その傷を数えることで。そして同じ数え方が、より深い区分を明かします：どの世界がまだ内部で生きていて、どれが冷え切ったのかを。",
    key: "クレーターが多い＝古い；小さいほど早く死ぬ",
    keyText: "隕石の衝突は絶え間なく降り注ぐので、古く乱されていない表面はクレーターだらけ、若い（または作り直された）表面はほぼ滑らか——クレーターを数えれば地形の年代がわかります。一方、世界の内部の熱は表面から逃げます。月のような小さな天体は熱が少なく体積のわりに表面が広いため、早く冷えて地質的に「死んで」しまいます。地球のような大きな惑星は誕生時の熱をずっと長く保ち、火山活動やプレート運動を続けます。",
    vCraters: "クレーターで年代測定", vHeat: "熱と大きさ",
    ancient: "古い高地", young: "若い平原", ageSlider: "この平原がむき出しだった時間：",
    craters: "個のクレーター", older: "より古い", younger: "より若い",
    sizeSlider: "世界の大きさ：", small: "小さい（月くらい）", big: "大きい（地球くらい）",
    active: "地質的に活動的", dead: "地質的に死んでいる", heatL: "内部の熱",
    note1: "左の表面は古く、クレーターで飽和しています。右はスライドで時間を進めると集めていきます。クレーターが多いほど、長くさらされた古い表面です。",
    note2: "大きな世界は内部の熱を保って活動を続け（火山や動く地殻）、小さな世界は熱を速く放って固まり——地質的に死にます。",
  },
};

/* deterministic pseudo-random so craters don't reshuffle each frame */
function rng(seed) { let s = seed; return () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff; }

function drawCraters(ctx, cw, H, age, t, lang) {
  ctx.clearRect(0, 0, cw, H);
  const gap = 16, pw = (cw - gap * 3) / 2, ph = H - 54, py = 34;
  const panels = [
    { x: gap, label: t.ancient, n: 46, seed: 7, tag: t.older, tagCol: C.sun },
    { x: gap * 2 + pw, label: t.young, n: Math.round(2 + age * 44), seed: 91, tag: age > 0.5 ? "" : t.younger, tagCol: C.good },
  ];
  panels.forEach((p) => {
    ctx.fillStyle = "rgba(90,80,70,0.5)"; ctx.fillRect(p.x, py, pw, ph);
    ctx.strokeStyle = "rgba(150,175,230,0.35)"; ctx.lineWidth = 1; ctx.strokeRect(p.x, py, pw, ph);
    const r = rng(p.seed);
    for (let i = 0; i < p.n; i++) {
      const cx = p.x + 8 + r() * (pw - 16), cy = py + 8 + r() * (ph - 16), rad = 3 + r() * 8;
      ctx.fillStyle = "rgba(40,34,28,0.6)"; ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "rgba(180,170,155,0.5)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.fillStyle = C.text; ctx.font = `700 12px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(p.label, p.x + pw / 2, 20);
    ctx.fillStyle = C.faint; ctx.font = `10.5px ${mono}`;
    ctx.fillText(`${p.n} ${t.craters}`, p.x + pw / 2, H - 8);
    if (p.tag) { ctx.fillStyle = p.tagCol; ctx.font = `700 11px ${mono}`; ctx.fillText(p.tag, p.x + pw / 2, py + ph / 2); }
  });
}

function drawHeat(ctx, cw, H, size, t, lang) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2 + 6;
  const R = 26 + size * 92;
  const heat = size; // bigger retains more heat
  // body
  ctx.fillStyle = "#4a4038"; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
  // molten core glow scales with heat
  const coreR = R * (0.2 + heat * 0.5);
  const g = ctx.createRadialGradient(cx, cy, 1, cx, cy, coreR);
  g.addColorStop(0, `rgba(255,${Math.round(120 + heat * 100)},60,${0.35 + heat * 0.6})`);
  g.addColorStop(1, "rgba(255,90,40,0)");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, coreR, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
  // status
  const active = size > 0.5;
  ctx.font = `700 15px ${mono}`; ctx.textAlign = "center";
  ctx.fillStyle = active ? C.good : C.danger;
  ctx.fillText(active ? t.active : t.dead, cx, 24);
  // heat meter
  const mw = Math.min(cw - 60, 300), mx = (cw - mw) / 2, my = H - 22;
  ctx.fillStyle = "rgba(120,150,210,0.2)"; ctx.fillRect(mx, my, mw, 8);
  const hg = ctx.createLinearGradient(mx, 0, mx + mw, 0);
  hg.addColorStop(0, "#ff6b6b"); hg.addColorStop(1, "#ffcf6b");
  ctx.fillStyle = hg; ctx.fillRect(mx, my, mw * heat, 8);
  ctx.fillStyle = C.faint; ctx.font = `10px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(t.heatL, mx, my - 5);
}

export function Surfaces() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [view, setView] = useState("craters");
  const [age, setAge] = useState(0.15);
  const [size, setSize] = useState(0.3);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (view === "craters") drawCraters(ctx, cw, H, age, t, lang);
    else drawHeat(ctx, cw, H, size, t, lang);
  }, [cw, view, age, size, lang]);

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

        <div style={styles.pickerRow}>
          {[["craters", t.vCraters], ["heat", t.vHeat]].map(([id, label]) => (
            <button key={id} onClick={() => setView(id)}
              style={{ ...styles.chip, ...(view === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        {view === "craters" ? (
          <div style={{ marginTop: 10 }}>
            <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginBottom: 2 }}>{t.ageSlider}</div>
            <input type="range" min={0} max={1} step={0.01} value={age} onChange={(e) => setAge(parseFloat(e.target.value))} style={styles.range} />
          </div>
        ) : (
          <div style={{ marginTop: 10 }}>
            <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginBottom: 2 }}>{t.sizeSlider}</div>
            <input type="range" min={0} max={1} step={0.01} value={size} onChange={(e) => setSize(parseFloat(e.target.value))} style={styles.range} />
            <div style={styles.rangeEnds}><span>{t.small}</span><span>{t.big}</span></div>
          </div>
        )}

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{view === "craters" ? t.note1 : t.note2}</p>
      </div>
    </div>
  );
}

export default Surfaces;
