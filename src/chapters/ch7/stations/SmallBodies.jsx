/* ============================================================
   STATION 3 — ASTEROIDS & COMETS
   Most asteroids orbit between Mars and Jupiter. Comets are frozen
   gases (water, CO2, CO) plus dust, with tails pointing away from the
   Sun. Pluto was the first trans-Neptunian object found. Both are
   "chemical fossils" that preserve the solar system's first recipe.
   Grounded in Ch.7 §7.1–7.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const BODIES = {
  asteroid: {
    en: "Asteroid", ja: "小惑星", col: "#9aa2b4",
    comp: { en: "Rock and metal — leftover building blocks that never became a planet.", ja: "岩石と金属——惑星になりそこねた組み立て部品の残り。" },
    where: { en: "The asteroid belt, between Mars and Jupiter.", ja: "小惑星帯——火星と木星のあいだ。" },
  },
  comet: {
    en: "Comet", ja: "彗星", col: "#8ad0ff",
    comp: { en: "A 'dirty snowball' of frozen water, carbon dioxide and carbon monoxide, plus dust.", ja: "凍った水・二酸化炭素・一酸化炭素に塵が混じった「汚れた雪玉」。" },
    where: { en: "Falls in from the cold outer system; grows a tail pointing away from the Sun.", ja: "冷たい外側からやって来て、太陽と反対向きの尾を伸ばす。" },
  },
  tno: {
    en: "Pluto (TNO)", ja: "冥王星（TNO）", col: "#d9c6a5",
    comp: { en: "Rock and ices. Pluto (1930) was the first trans-Neptunian object discovered.", ja: "岩石と氷。冥王星（1930年）は最初に発見された太陽系外縁天体。" },
    where: { en: "The Kuiper Belt, beyond Neptune's orbit.", ja: "カイパーベルト——海王星の軌道の外側。" },
  },
};

const STR = {
  en: {
    title: "Asteroids & comets",
    kind: "The solar system's chemical fossils",
    lede: "Between and beyond the planets drift the small bodies. Pick one to see what it's made of and where it lives — and why a lump of ancient ice tells us more about our origins than any planet.",
    thread: "THE STORY CONTINUES",
    threadText: "Planets melted, churned and resurfaced themselves, erasing their birth chemistry. The small bodies mostly didn't. That makes these leftovers the most honest witnesses to how everything began.",
    key: "FROZEN LEFTOVERS, UNCHANGED",
    keyText: "Most asteroids orbit in the belt between Mars and Jupiter; comets are dirty snowballs of frozen water, CO2 and CO that grow a Sun-facing-away tail. Beyond Neptune lies the Kuiper Belt, where Pluto was the first object found. Because these bodies stayed small and cold, they were never remelted — they are 'chemical fossils' that keep the solar system's original composition, so they teach us more about its birth than the heavily processed planets.",
    compL: "Made of", whereL: "Where",
    belt: "asteroid belt", kuiper: "Kuiper Belt", mars: "Mars", jup: "Jupiter", nep: "Neptune", sun: "Sun",
    note: "A top-down map: the asteroid belt sits between Mars and Jupiter, the Kuiper Belt beyond Neptune. Note the comet's tail — it always points away from the Sun, pushed by sunlight and the solar wind.",
  },
  ja: {
    title: "小惑星と彗星",
    kind: "太陽系の化学的化石",
    lede: "惑星のあいだ、そして外側には小天体が漂います。一つ選んで、何でできていて、どこに住んでいるかを見よう——そして、古い氷の塊が、どの惑星よりも私たちの起源を語る理由を。",
    thread: "物語はつづく",
    threadText: "惑星は溶け、かき混ざり、表面を作り直して、誕生時の化学組成を消してしまいました。小天体の多くはそうしませんでした。だからこの残り物こそ、すべての始まりを最も正直に伝える証人なのです。",
    key: "凍った残り物、そのまま",
    keyText: "小惑星の多くは火星と木星のあいだの帯を回り、彗星は凍った水・CO2・COの汚れた雪玉で、太陽と反対向きの尾を伸ばします。海王星の外側にはカイパーベルトがあり、冥王星はそこで最初に見つかった天体です。これらは小さく冷たいまま溶け直されなかったため、「化学的化石」として太陽系のもとの組成を保ち、作り変えられた惑星よりも誕生の様子をよく教えてくれます。",
    compL: "組成", whereL: "居場所",
    belt: "小惑星帯", kuiper: "カイパーベルト", mars: "火星", jup: "木星", nep: "海王星", sun: "太陽",
    note: "上から見た地図：小惑星帯は火星と木星のあいだ、カイパーベルトは海王星の外側にあります。彗星の尾に注目——日光と太陽風に押されて、いつも太陽と反対を向きます。",
  },
};

function drawMap(ctx, cw, H, sel, t, tt) {
  ctx.clearRect(0, 0, cw, H);
  const cx = 46, cy = H / 2; // Sun near left
  // Sun
  const sg = ctx.createRadialGradient(cx, cy, 2, cx, cy, 26);
  sg.addColorStop(0, "#fff6d8"); sg.addColorStop(0.5, "#ffd23d"); sg.addColorStop(1, "rgba(255,158,44,0)");
  ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(cx, cy, 26, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffd23d"; ctx.beginPath(); ctx.arc(cx, cy, 11, 0, Math.PI * 2); ctx.fill();
  const maxX = cw - 24;
  const R = (fr) => cx + fr * (maxX - cx);
  // orbit arcs (as vertical distance markers) for Mars, Jupiter, Neptune
  const marks = [[0.20, t.mars, "#d06b4a"], [0.34, t.jup, "#e0a86a"], [0.86, t.nep, "#5b7de0"]];
  ctx.font = `10px ${mono}`; ctx.textAlign = "center";
  marks.forEach(([fr, label, col]) => {
    const x = R(fr);
    ctx.strokeStyle = "rgba(120,150,210,0.22)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x, 24); ctx.lineTo(x, H - 24); ctx.stroke();
    ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, cy, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.faint; ctx.fillText(label, x, H - 10);
  });
  // asteroid belt between Mars(0.20) and Jupiter(0.34)
  const beltOn = sel === "asteroid";
  for (let i = 0; i < 90; i++) {
    const fr = 0.22 + Math.random() * 0.10;
    const x = R(fr), y = 30 + Math.random() * (H - 60);
    ctx.fillStyle = beltOn ? "rgba(200,205,220,0.9)" : "rgba(150,160,180,0.4)";
    ctx.beginPath(); ctx.arc(x, y, beltOn ? 1.6 : 1.1, 0, Math.PI * 2); ctx.fill();
  }
  if (beltOn) { ctx.fillStyle = C.text; ctx.font = `700 11px ${mono}`; ctx.fillText(t.belt, R(0.27), 20); }
  // Kuiper belt beyond Neptune (0.88..1.0)
  const kOn = sel === "tno";
  for (let i = 0; i < 70; i++) {
    const fr = 0.90 + Math.random() * 0.09;
    const x = R(fr), y = 30 + Math.random() * (H - 60);
    ctx.fillStyle = kOn ? "rgba(217,198,165,0.95)" : "rgba(180,165,140,0.4)";
    ctx.beginPath(); ctx.arc(x, y, kOn ? 1.7 : 1.1, 0, Math.PI * 2); ctx.fill();
  }
  if (kOn) { ctx.fillStyle = C.text; ctx.font = `700 11px ${mono}`; ctx.fillText(t.kuiper, R(0.94), 20); }
  // comet: falling in with a tail pointing away from the Sun (to the right)
  if (sel === "comet") {
    const x = R(0.52), y = cy - 30;
    // tail away from Sun => away from cx (to the right / down-right)
    const dx = x - cx, dy = y - cy, m = Math.hypot(dx, dy);
    const ux = dx / m, uy = dy / m;
    const tg = ctx.createLinearGradient(x, y, x + ux * 90, y + uy * 90);
    tg.addColorStop(0, "rgba(138,208,255,0.8)"); tg.addColorStop(1, "rgba(138,208,255,0)");
    ctx.strokeStyle = tg; ctx.lineWidth = 10; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + ux * 90, y + uy * 90); ctx.stroke(); ctx.lineCap = "butt";
    const hg = ctx.createRadialGradient(x, y, 1, x, y, 9);
    hg.addColorStop(0, "#eaf7ff"); hg.addColorStop(1, "rgba(138,208,255,0)");
    ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(x, y, 9, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#eaf7ff"; ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
  }
  ctx.fillStyle = C.sun; ctx.font = `10px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.sun, cx, cy + 30);
}

export function SmallBodies() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 280;
  const canRef = useRef(null);
  const [sel, setSel] = useState("asteroid");
  const cw = Math.min(w, 760);
  const b = BODIES[sel];

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    drawMap(ctx, cw, H, sel, t, 0);
  }, [cw, sel, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 03</div>
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
          {Object.keys(BODIES).map((id) => (
            <button key={id} onClick={() => setSel(id)}
              style={{ ...styles.chip, ...(sel === id ? styles.chipOn : {}), borderColor: sel === id ? BODIES[id].col : undefined }}>
              {lang === "ja" ? BODIES[id].ja : BODIES[id].en}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <div style={{ marginTop: 10, fontFamily: mono, fontSize: 13, lineHeight: 1.7, color: C.muted }}>
          <div><span style={{ color: C.faint }}>{t.compL}:</span> {b.comp[lang]}</div>
          <div><span style={{ color: C.faint }}>{t.whereL}:</span> {b.where[lang]}</div>
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default SmallBodies;
