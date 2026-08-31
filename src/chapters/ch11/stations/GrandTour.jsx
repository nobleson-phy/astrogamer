/* ============================================================
   STATION 1 — GRAND TOUR & EXPLORERS
   Voyager 2 made the "Grand Tour" of all four giant planets
   (Jupiter 1979, Saturn 1981, Uranus 1986, Neptune 1989) and is
   still the only mission to reach Uranus and Neptune. The Galileo
   probe parachuted into Jupiter on Dec 7 1995; Cassini took the
   "pale blue dot" of Earth below Saturn's rings in July 2013.
   Physicist James Van Allen championed robotic exploration.
   Grounded in Ch.11 §11.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const MISSIONS = {
  voyager: { en: "Voyager 2", ja: "ボイジャー2号",
    en_t: "The one 'Grand Tour': flew past Jupiter (1979), Saturn (1981), Uranus (1986) and Neptune (1989), using each planet's gravity to slingshot to the next. It remains the only spacecraft ever to visit the ice giants.", ja_t: "唯一の「グランドツアー」：木星（1979）・土星（1981）・天王星（1986）・海王星（1989）を通過し、各惑星の重力で次へと弾き飛ばされた。氷の巨人を訪れた唯一の探査機であり続ける。" },
  galileo: { en: "Galileo probe", ja: "ガリレオ・プローブ",
    en_t: "On 7 December 1995 the Galileo mission dropped an entry probe by parachute into Jupiter's clouds, sampling the atmosphere directly for the first time.", ja_t: "1995年12月7日、ガリレオ探査機は突入プローブをパラシュートで木星の雲に投下し、初めて大気を直接測定した。" },
  cassini: { en: "Cassini", ja: "カッシーニ",
    en_t: "Studied Saturn for years and, in July 2013, photographed Earth as a tiny blue dot far below Saturn's rings.", ja_t: "何年も土星を調べ、2013年7月には、土星の環のはるか下に地球を小さな青い点として撮影した。" },
  vanallen: { en: "James Van Allen", ja: "ジェームズ・ヴァン・アレン",
    en_t: "The physicist who launched balloon-borne 'rockoons' to study cosmic radiation and was an eloquent champion of robotic spacecraft as the way to explore space.", ja_t: "気球で打ち上げる「ロクーン」で宇宙放射線を研究し、ロボット探査機による宇宙探査を雄弁に支持した物理学者。" },
};
const ORDER = ["voyager", "galileo", "cassini", "vanallen"];

const STR = {
  en: {
    title: "Grand Tour & explorers",
    kind: "How we reached the outer worlds",
    lede: "The giant planets are so far that a single, perfectly-timed trajectory let one craft visit them all. Fly Voyager 2's slingshot path, then switch spacecraft to see the probes and the physicist who argued we should send robots first.",
    thread: "THE STORY BEGINS",
    threadText: "Beyond Mars lie four worlds unlike any we've met — vast balls of gas and ice. Everything we know of them we learned from a handful of robotic emissaries flung across the solar system.",
    key: "ONE CRAFT VISITED ALL FOUR GIANTS",
    keyText: "A rare planetary alignment let Voyager 2 make the 'Grand Tour', using each giant's gravity to slingshot to the next: Jupiter (1979), Saturn (1981), Uranus (1986), Neptune (1989). It is still the only spacecraft ever to visit Uranus and Neptune. Other landmark missions filled in the detail: the Galileo probe parachuted into Jupiter's atmosphere on 7 December 1995, and Cassini took the famous July 2013 image of Earth as a pale blue dot beneath Saturn's rings. The physicist James Van Allen pioneered 'rockoon' cosmic-ray studies and championed robotic exploration.",
    play: "▶ Fly the Grand Tour",
    note: "Voyager 2's gravity-assisted Grand Tour is the only visit ever paid to Uranus and Neptune; the Galileo probe and Cassini added close-up detail, all fruits of robotic exploration.",
  },
  ja: {
    title: "グランドツアーと探査機",
    kind: "外の世界へどう到達したか",
    lede: "巨大惑星はあまりに遠く、完璧にタイミングを合わせた一つの軌道で、一機がすべてを訪れられました。ボイジャー2号のスイングバイ経路を飛ばし、探査機を切り替えて、プローブと、まずロボットを送るべきだと論じた物理学者を見よう。",
    thread: "物語のはじまり",
    threadText: "火星の先には、これまで出会ったどれとも違う4つの世界——ガスと氷の巨大な球——があります。それらについて知ることのすべては、太陽系に放たれた一握りのロボット使節から学びました。",
    key: "一機が4つの巨人すべてを訪れた",
    keyText: "稀な惑星の整列により、ボイジャー2号は「グランドツアー」を成し遂げ、各巨人の重力で次へと弾き飛ばされました：木星（1979）・土星（1981）・天王星（1986）・海王星（1989）。天王星と海王星を訪れた唯一の探査機であり続けています。他の画期的なミッションが詳細を埋めました：ガリレオ・プローブは1995年12月7日に木星大気へパラシュート降下し、カッシーニは2013年7月に、土星の環の下の青い点として地球を撮影しました。物理学者ジェームズ・ヴァン・アレンは「ロクーン」で宇宙線を研究し、ロボット探査を支持しました。",
    play: "▶ グランドツアーを飛ぶ",
    note: "ボイジャー2号の重力アシストによるグランドツアーは、天王星と海王星への唯一の訪問です。ガリレオ・プローブとカッシーニが接近観測を加えました——すべてロボット探査の成果です。",
  },
};

/* Voyager 2's route is a smooth ARC: the Sun sits at one end (u=0) and each planet
   lies farther along the same curve, so the craft sweeps outward past them all. */
const PLANETS = [
  { u: 0.27, r: 16, col: "#e0a86a", en: "Jupiter", ja: "木星", yr: "1979" },
  { u: 0.50, r: 13, col: "#e8cf9a", en: "Saturn", ja: "土星", yr: "1981", ring: true },
  { u: 0.73, r: 10, col: "#a9dbe6", en: "Uranus", ja: "天王星", yr: "1986" },
  { u: 0.96, r: 10, col: "#5b7de0", en: "Neptune", ja: "海王星", yr: "1989" },
];
const ARC = { cx: 1.05, cy: 1.12, R: 1.02, a0: (196 * Math.PI) / 180, a1: (262 * Math.PI) / 180 };
function arcPt(u, cw, H) {
  const a = ARC.a0 + (ARC.a1 - ARC.a0) * u;
  return [(ARC.cx + ARC.R * Math.cos(a)) * cw, (ARC.cy + ARC.R * Math.sin(a)) * H];
}
function ptOnPath(prog, cw, H) { return arcPt(Math.min(0.96, Math.max(0, prog) * 0.96), cw, H); }

function drawSun(ctx, x, y, r) {
  const sg = ctx.createRadialGradient(x, y, 2, x, y, r); sg.addColorStop(0, "#fff6d8"); sg.addColorStop(0.5, "#ffd23d"); sg.addColorStop(1, "rgba(255,158,44,0)");
  ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffd23d"; ctx.beginPath(); ctx.arc(x, y, r * 0.45, 0, Math.PI * 2); ctx.fill();
}
function drawBandedGlobe(ctx, x, y, r, cols, ring) {
  ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.clip();
  for (let i = 0; i < cols.length; i++) { ctx.fillStyle = cols[i]; const yy = y - r + (i / cols.length) * 2 * r; ctx.fillRect(x - r, yy, 2 * r, 2 * r / cols.length + 1); }
  ctx.restore();
  if (ring) { ctx.strokeStyle = "rgba(230,207,154,0.85)"; ctx.lineWidth = Math.max(1.5, r * 0.12); ctx.beginPath(); ctx.ellipse(x, y, r + r * 0.7, (r + r * 0.7) * 0.32, -0.3, 0, Math.PI * 2); ctx.stroke(); }
  ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke();
}

function drawVoyager(ctx, cw, H, prog, lang) {
  ctx.clearRect(0, 0, cw, H);
  const [sx, sy] = arcPt(0, cw, H);
  drawSun(ctx, sx, sy, 16);
  // trajectory: the arc itself
  ctx.strokeStyle = "rgba(63,232,155,0.55)"; ctx.lineWidth = 2; ctx.setLineDash([]);
  ctx.beginPath();
  for (let i = 0; i <= 100; i++) { const [x, y] = arcPt(i / 100, cw, H); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
  ctx.stroke();
  // planets sitting on the arc
  PLANETS.forEach((p) => {
    const [px, py] = arcPt(p.u, cw, H);
    const g = ctx.createRadialGradient(px - p.r * 0.3, py - p.r * 0.3, 1, px, py, p.r);
    g.addColorStop(0, p.col); g.addColorStop(1, "rgba(0,0,0,0.3)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, py, p.r, 0, Math.PI * 2); ctx.fill();
    if (p.ring) { ctx.strokeStyle = "rgba(230,207,154,0.8)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(px, py, p.r + 7, (p.r + 7) * 0.34, -0.3, 0, Math.PI * 2); ctx.stroke(); }
    ctx.fillStyle = C.faint; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText((lang === "ja" ? p.ja : p.en) + " · " + p.yr, px, py - p.r - 6);
  });
  // spacecraft riding the arc
  const [cx, cy] = ptOnPath(prog, cw, H);
  ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(cx, cy, 3.5, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "rgba(63,232,155,0.7)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, 7, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = C.good; ctx.font = `10px ${mono}`; ctx.textAlign = "left"; ctx.fillText("Voyager 2 · Grand Tour", 14, H - 12);
}

function drawGalileo(ctx, cw, H, tt) {
  ctx.clearRect(0, 0, cw, H);
  // Jupiter fills the frame as a banded backdrop
  for (let i = 0; i < 16; i++) { ctx.fillStyle = i % 2 ? "#c98a4a" : "#e8cf9a"; ctx.globalAlpha = 0.9; ctx.fillRect(0, (i / 16) * H, cw, H / 16 + 1); ctx.globalAlpha = 1; }
  ctx.fillStyle = "rgba(200,80,50,0.7)"; ctx.beginPath(); ctx.ellipse(cw * 0.7, H * 0.6, 40, 24, 0, 0, Math.PI * 2); ctx.fill();
  // probe descending on a parachute
  const py = 30 + ((tt * 0.6) % (H * 0.55));
  const px = cw * 0.4 + Math.sin(tt * 0.03) * 10;
  ctx.strokeStyle = "#eaf3ff"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(px - 16, py - 8); ctx.quadraticCurveTo(px, py - 30, px + 16, py - 8); ctx.stroke(); // canopy
  ctx.fillStyle = "rgba(234,243,255,0.5)"; ctx.beginPath(); ctx.moveTo(px - 16, py - 8); ctx.quadraticCurveTo(px, py - 30, px + 16, py - 8); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(px - 12, py - 8); ctx.lineTo(px, py + 2); ctx.moveTo(px + 12, py - 8); ctx.lineTo(px, py + 2); ctx.stroke(); // shrouds
  ctx.fillStyle = "#c9c1b0"; ctx.fillRect(px - 4, py + 2, 8, 8); // probe body
  ctx.fillStyle = C.text; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText("Galileo probe · 7 Dec 1995", cw / 2, H - 12);
}

function drawCassini(ctx, cw, H, tt) {
  ctx.clearRect(0, 0, cw, H);
  // Saturn with prominent rings, upper area
  const sx = cw * 0.5, sy = H * 0.4, R = Math.min(cw * 0.2, H * 0.34);
  ctx.strokeStyle = "rgba(230,207,154,0.85)"; ctx.lineWidth = 8;
  ctx.beginPath(); ctx.ellipse(sx, sy, R + 34, (R + 34) * 0.3, -0.28, 0, Math.PI * 2); ctx.stroke();
  drawBandedGlobe(ctx, sx, sy, R, ["#e8cf9a", "#dcc088", "#e8cf9a", "#d8b878", "#e8cf9a"], false);
  // ring front half over the globe
  ctx.strokeStyle = "rgba(230,207,154,0.85)"; ctx.lineWidth = 8;
  ctx.beginPath(); ctx.ellipse(sx, sy, R + 34, (R + 34) * 0.3, -0.28, Math.PI * 0.15, Math.PI * 0.85); ctx.stroke();
  // pale blue dot (Earth) far below the rings, twinkling
  const ey = H * 0.82, ex = cw * 0.62;
  const tw = 0.6 + 0.4 * Math.sin(tt * 0.1);
  ctx.fillStyle = `rgba(120,180,255,${tw})`; ctx.beginPath(); ctx.arc(ex, ey, 3, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = `rgba(120,180,255,${tw * 0.5})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(ex, ey, 7, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = "#8fb4ff"; ctx.font = `10px ${mono}`; ctx.textAlign = "left"; ctx.fillText("Earth (July 2013)", ex + 12, ey + 3);
  ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText("Cassini · the pale blue dot below Saturn's rings", cw / 2, 18);
}

function drawVanAllen(ctx, cw, H, tt) {
  ctx.clearRect(0, 0, cw, H);
  // Earth's limb at the bottom
  const ecx = cw * 0.5, ecy = H + H * 0.9, eR = H * 1.1;
  const g = ctx.createRadialGradient(ecx, ecy, eR * 0.6, ecx, ecy, eR);
  g.addColorStop(0, "#3a5aa8"); g.addColorStop(1, "#1a2a55");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(ecx, ecy, eR, 0, Math.PI * 2); ctx.fill();
  // radiation belts (Van Allen belts) as arcs around Earth
  ctx.strokeStyle = "rgba(99,211,240,0.4)"; ctx.lineWidth = 2;
  for (const k of [0.55, 0.72]) { ctx.beginPath(); ctx.ellipse(ecx, ecy, eR * 1.3, eR * k, 0, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke(); }
  ctx.fillStyle = "rgba(99,211,240,0.6)"; ctx.font = `10px ${mono}`; ctx.textAlign = "right"; ctx.fillText("radiation belts", cw - 12, 40);
  // rockoon: balloon lifting a rocket, then the rocket fires upward
  const phase = (tt * 0.006) % 1;
  const bx = cw * 0.42;
  const by = H - 30 - phase * (H * 0.55);
  // balloon
  ctx.fillStyle = "rgba(234,243,255,0.85)"; ctx.beginPath(); ctx.ellipse(bx, by - 16, 14, 18, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "rgba(234,243,255,0.6)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(bx - 6, by); ctx.lineTo(bx, by + 8); ctx.moveTo(bx + 6, by); ctx.lineTo(bx, by + 8); ctx.stroke();
  // rocket
  ctx.fillStyle = "#c9c1b0"; ctx.beginPath(); ctx.moveTo(bx, by + 6); ctx.lineTo(bx - 4, by + 20); ctx.lineTo(bx + 4, by + 20); ctx.closePath(); ctx.fill();
  if (phase > 0.55) { ctx.fillStyle = "#ffcf6b"; ctx.beginPath(); ctx.moveTo(bx - 3, by + 20); ctx.lineTo(bx + 3, by + 20); ctx.lineTo(bx, by + 30 + Math.random() * 6); ctx.closePath(); ctx.fill(); }
  ctx.fillStyle = C.text; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText("James Van Allen · a 'rockoon' rising", cw / 2, H - 12);
}

export function GrandTour() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [sel, setSel] = useState("voyager");
  const selRef = useRef(sel); selRef.current = sel;
  const progRef = useRef(1);
  const runRef = useRef(false);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    const render = (tt) => {
      const s = selRef.current;
      if (s === "voyager") drawVoyager(ctx, cw, H, progRef.current, lang);
      else if (s === "galileo") drawGalileo(ctx, cw, H, tt);
      else if (s === "cassini") drawCassini(ctx, cw, H, tt);
      else drawVanAllen(ctx, cw, H, tt);
    };
    if (reduceMotion) { render(0); return; }
    let raf, tt = 0;
    const loop = () => {
      tt += 1;
      if (runRef.current) { progRef.current = Math.min(1, progRef.current + 0.004); if (progRef.current >= 1) runRef.current = false; }
      render(tt);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

  const selectMission = (id) => {
    setSel(id);
    if (id === "voyager") { progRef.current = 0; runRef.current = true; }
  };
  const play = () => { progRef.current = 0; runRef.current = true; };
  const m = MISSIONS[sel];

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
          {ORDER.map((id) => (
            <button key={id} onClick={() => selectMission(id)}
              style={{ ...styles.chip, ...(sel === id ? styles.chipOn : {}) }}>{lang === "ja" ? MISSIONS[id].ja : MISSIONS[id].en}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>
        {sel === "voyager" && <div style={{ marginTop: 8 }}><button style={styles.iconBtn} onClick={play}>{t.play}</button></div>}

        <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.5, marginTop: 8 }}>{lang === "ja" ? m.ja_t : m.en_t}</p>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default GrandTour;
