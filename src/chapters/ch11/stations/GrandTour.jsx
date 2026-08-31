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
    en_t: "The one 'Grand Tour': flew past Jupiter (1979), Saturn (1981), Uranus (1986) and Neptune (1989). It remains the only spacecraft ever to visit the ice giants.", ja_t: "唯一の「グランドツアー」：木星（1979）・土星（1981）・天王星（1986）・海王星（1989）を通過。氷の巨人を訪れた唯一の探査機であり続ける。" },
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
    lede: "The giant planets are so far that a single, perfectly-timed trajectory let one craft visit them all. Trace Voyager 2's path, then meet the probes and the physicist who argued we should send robots first.",
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
    lede: "巨大惑星はあまりに遠く、完璧にタイミングを合わせた一つの軌道で、一機がすべてを訪れられました。ボイジャー2号の経路をたどり、探査機と、まずロボットを送るべきだと論じた物理学者に出会おう。",
    thread: "物語のはじまり",
    threadText: "火星の先には、これまで出会ったどれとも違う4つの世界——ガスと氷の巨大な球——があります。それらについて知ることのすべては、太陽系に放たれた一握りのロボット使節から学びました。",
    key: "一機が4つの巨人すべてを訪れた",
    keyText: "稀な惑星の整列により、ボイジャー2号は「グランドツアー」を成し遂げ、各巨人の重力で次へと弾き飛ばされました：木星（1979）・土星（1981）・天王星（1986）・海王星（1989）。天王星と海王星を訪れた唯一の探査機であり続けています。他の画期的なミッションが詳細を埋めました：ガリレオ・プローブは1995年12月7日に木星大気へパラシュート降下し、カッシーニは2013年7月に、土星の環の下の青い点として地球を撮影しました。物理学者ジェームズ・ヴァン・アレンは「ロクーン」で宇宙線を研究し、ロボット探査を支持しました。",
    play: "▶ グランドツアーを飛ぶ",
    note: "ボイジャー2号の重力アシストによるグランドツアーは、天王星と海王星への唯一の訪問です。ガリレオ・プローブとカッシーニが接近観測を加えました——すべてロボット探査の成果です。",
  },
};

const PLANETS = [
  { fr: 0.20, r: 18, col: "#e0a86a", en: "Jupiter", ja: "木星", yr: "1979" },
  { fr: 0.42, r: 15, col: "#e8cf9a", en: "Saturn", ja: "土星", yr: "1981" },
  { fr: 0.66, r: 11, col: "#a9dbe6", en: "Uranus", ja: "天王星", yr: "1986" },
  { fr: 0.88, r: 11, col: "#5b7de0", en: "Neptune", ja: "Neptune", yr: "1989" },
];

function draw(ctx, cw, H, prog, lang) {
  ctx.clearRect(0, 0, cw, H);
  const x0 = 34, x1 = cw - 20, y = H * 0.5;
  const X = (fr) => x0 + fr * (x1 - x0);
  // Sun
  const sg = ctx.createRadialGradient(x0, y, 2, x0, y, 16); sg.addColorStop(0, "#fff6d8"); sg.addColorStop(0.5, "#ffd23d"); sg.addColorStop(1, "rgba(255,158,44,0)");
  ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(x0, y, 16, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffd23d"; ctx.beginPath(); ctx.arc(x0, y, 7, 0, Math.PI * 2); ctx.fill();
  // planets
  PLANETS.forEach((p) => {
    const px = X(p.fr);
    const g = ctx.createRadialGradient(px - p.r * 0.3, y - p.r * 0.3, 1, px, y, p.r);
    g.addColorStop(0, p.col); g.addColorStop(1, "rgba(0,0,0,0.3)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, y, p.r, 0, Math.PI * 2); ctx.fill();
    if (p.en === "Saturn") { ctx.strokeStyle = "rgba(230,207,154,0.8)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(px, y, p.r + 8, (p.r + 8) * 0.34, -0.3, 0, Math.PI * 2); ctx.stroke(); }
    ctx.fillStyle = C.faint; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText((lang === "ja" ? p.ja : p.en) + " · " + p.yr, px, y + p.r + 16);
  });
  // Voyager path — a wavy line sweeping past each planet
  ctx.strokeStyle = C.good; ctx.lineWidth = 2; ctx.beginPath();
  for (let i = 0; i <= 120; i++) { const fr = i / 120; const xx = X(fr); const yy = y - 44 + Math.sin(fr * 11) * 30; i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }
  ctx.stroke();
  // spacecraft position
  const fr = prog; const cxs = X(fr), cys = y - 44 + Math.sin(fr * 11) * 30;
  ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(cxs, cys, 3.5, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "rgba(63,232,155,0.6)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cxs, cys, 7, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = C.good; ctx.font = `10px ${mono}`; ctx.textAlign = "left"; ctx.fillText("Voyager 2", 30, 18);
}

export function GrandTour() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 240;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [sel, setSel] = useState("voyager");
  const progRef = useRef(1);
  const runRef = useRef(false);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, 1, lang); return; }
    let raf;
    const loop = () => {
      if (runRef.current) { progRef.current = Math.min(1, progRef.current + 0.004); if (progRef.current >= 1) runRef.current = false; }
      draw(ctx, cw, H, progRef.current, lang);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

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

        <div style={{ marginTop: 4 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>
        <div style={{ marginTop: 8 }}><button style={styles.iconBtn} onClick={play}>{t.play}</button></div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
          {ORDER.map((id) => (
            <button key={id} onClick={() => setSel(id)}
              style={{ ...styles.chip, ...(sel === id ? styles.chipOn : {}) }}>{lang === "ja" ? MISSIONS[id].ja : MISSIONS[id].en}</button>
          ))}
        </div>

        <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.5, marginTop: 8 }}>{lang === "ja" ? m.ja_t : m.en_t}</p>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default GrandTour;
