/* ============================================================
   STATION 1 — VENUS: THE VEILED TWIN
   Venus is wrapped in cloud, so we know it by phases, spin, and
   probes. Galileo saw Venus run through the FULL set of phases —
   impossible in Ptolemy's geocentric model, proof it orbits the Sun.
   Venus spins backward (retrograde) and very slowly. First landed
   on by the Soviet Venera 7 (1970); mapped by radar by NASA's
   Magellan (1990) at 100-m resolution. Grounded in Ch.10 §10.1–10.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Venus: the veiled twin",
    kind: "Phases that toppled a cosmos",
    lede: "Venus is Earth's size and mass, but hidden under permanent cloud. Switch between the two old world-models and watch its phases — the very observation that broke the Earth-centred universe.",
    thread: "THE STORY BEGINS",
    threadText: "Venus is almost Earth's twin in size — yet a world apart. Before we could land on it, its light alone settled one of history's great arguments about the shape of the cosmos.",
    key: "PHASES PROVE VENUS ORBITS THE SUN",
    keyText: "In Ptolemy's Earth-centred model, Venus could only ever appear as a crescent. But Galileo's telescope showed Venus running through the FULL cycle of phases — new, crescent, half, gibbous, near-full — which is only possible if Venus orbits the Sun. It was a decisive blow to the geocentric universe. Venus also spins backward (retrograde) and extremely slowly, probably from solar tides or a giant early collision. The Soviet Venera 7 first landed and transmitted from the surface in 1970; NASA's Magellan radar-mapped the whole planet at 100-metre resolution in the 1990s.",
    ptolemy: "Ptolemy (Earth-centred)", copernicus: "Sun-centred (real)",
    onlyCrescent: "only ever a crescent ✗", fullRange: "full range of phases ✓",
    missions: "First lander: Venera 7 (1970) · Radar map: Magellan (100 m)",
    note: "In the Earth-centred model Venus stays between us and the Sun, so it could only show crescents. The full range of phases Galileo saw proves Venus circles the Sun — and helped end the geocentric era.",
  },
  ja: {
    title: "金星：ベールの双子",
    kind: "宇宙観を覆した満ち欠け",
    lede: "金星は地球ほどの大きさと質量をもちますが、永遠の雲に隠れています。2つの古い宇宙モデルを切り替え、その満ち欠けを見よう——地球中心の宇宙を打ち砕いた、まさにその観測です。",
    thread: "物語のはじまり",
    threadText: "金星は大きさではほぼ地球の双子——でも別世界です。着陸できるようになる前に、その光だけで、宇宙の形をめぐる歴史的大論争の一つに決着をつけました。",
    key: "満ち欠けが金星の公転を証明する",
    keyText: "プトレマイオスの地球中心モデルでは、金星は三日月形にしか見えません。しかしガリレオの望遠鏡は、金星が満ち欠けの全周期——新月・三日月・半月・凸月・ほぼ満月——を巡る様子を示しました。これは金星が太陽を公転している場合にのみ可能です。地球中心の宇宙観への決定的な一撃でした。金星は逆向き（逆行）に、しかも極めてゆっくり自転します——おそらく太陽の潮汐か初期の巨大衝突が原因です。ソ連のベネラ7号が1970年に初めて着陸して地表から送信し、NASAのマゼランが1990年代に全球を100メートル分解能でレーダー地図化しました。",
    ptolemy: "プトレマイオス（地球中心）", copernicus: "太陽中心（実際）",
    onlyCrescent: "常に三日月だけ ✗", fullRange: "満ち欠けの全周期 ✓",
    missions: "初着陸：ベネラ7号（1970）· レーダー地図：マゼラン（100 m）",
    note: "地球中心モデルでは金星は地球と太陽のあいだにとどまり、三日月しか見せられません。ガリレオが見た満ち欠けの全周期は、金星が太陽を回る証拠——地球中心の時代を終わらせる助けとなりました。",
  },
};

/* standard phase disc: illum 0 = new (dark) … 0.5 = half … 1 = full, lit from the right */
function drawVenusPhase(ctx, x, y, r, illum) {
  illum = Math.max(0, Math.min(1, illum));
  ctx.save();
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.clip();
  ctx.fillStyle = "#3a352c"; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
  ctx.fillStyle = "#e8c98a";
  ctx.beginPath();
  ctx.arc(x, y, r, -Math.PI / 2, Math.PI / 2, false); // lit right semicircle
  if (illum >= 0.5) {
    const ex = r * (2 * illum - 1); // bulge into the left (gibbous → full)
    ctx.ellipse(x, y, ex, r, 0, Math.PI / 2, -Math.PI / 2, false);
  } else {
    const ex = r * (1 - 2 * illum); // terminator cuts into the right (crescent)
    ctx.ellipse(x, y, ex, r, 0, -Math.PI / 2, Math.PI / 2, false);
  }
  ctx.fill();
  ctx.restore();
  ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke();
}

function draw(ctx, cw, H, model, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.5, cy = H * 0.52;
  // Sun / Earth positions differ by model
  if (model === "ptolemy") {
    // Earth at center, Venus on an epicycle between Earth and Sun (always same side)
    const ex = cx, ey = cy;
    ctx.fillStyle = "#5b8dee"; ctx.beginPath(); ctx.arc(ex, ey, 12, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.faint; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText("Earth", ex, ey + 26);
    // deferent direction toward the Sun (kept to the right)
    const sx = cx + cw * 0.34, sy = cy;
    const sg = ctx.createRadialGradient(sx, sy, 2, sx, sy, 20); sg.addColorStop(0, "#fff6d8"); sg.addColorStop(0.5, "#ffd23d"); sg.addColorStop(1, "rgba(255,158,44,0)");
    ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(sx, sy, 20, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#ffd23d"; ctx.beginPath(); ctx.arc(sx, sy, 9, 0, Math.PI * 2); ctx.fill();
    // Venus epicycle between Earth and Sun
    const mid = (ex + sx) / 2;
    const ep = 26; const va = tt * 0.02;
    const vx = mid + Math.cos(va) * ep, vy = cy + Math.sin(va) * ep;
    ctx.strokeStyle = "rgba(150,175,230,0.25)"; ctx.beginPath(); ctx.arc(mid, cy, ep, 0, Math.PI * 2); ctx.stroke();
    // Venus always shows a crescent (lit side faces Sun, we see mostly the dark side)
    drawVenusPhase(ctx, vx, vy, 12, 0.18);
    ctx.fillStyle = C.danger; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.onlyCrescent, cx, H - 14);
  } else {
    // Sun at center, Earth outside, Venus orbits Sun (full phases as it goes around)
    const sx = cx, sy = cy;
    const sg = ctx.createRadialGradient(sx, sy, 2, sx, sy, 22); sg.addColorStop(0, "#fff6d8"); sg.addColorStop(0.5, "#ffd23d"); sg.addColorStop(1, "rgba(255,158,44,0)");
    ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(sx, sy, 22, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#ffd23d"; ctx.beginPath(); ctx.arc(sx, sy, 10, 0, Math.PI * 2); ctx.fill();
    // Earth far below
    const exx = cx, eyy = cy + H * 0.42;
    ctx.fillStyle = "#5b8dee"; ctx.beginPath(); ctx.arc(exx, Math.min(eyy, H - 8), 8, 0, Math.PI * 2); ctx.fill();
    // Venus orbit
    const orb = Math.min(cw * 0.28, H * 0.36);
    ctx.strokeStyle = "rgba(150,175,230,0.25)"; ctx.beginPath(); ctx.arc(sx, sy, orb, 0, Math.PI * 2); ctx.stroke();
    const va = tt * 0.02;
    const vx = sx + Math.cos(va) * orb, vy = sy + Math.sin(va) * orb;
    // phase seen from Earth: illum depends on angle Sun-Venus-Earth; approximate with (1+cos)/2 relative to Earth direction
    const illum = (1 - Math.cos(va)) / 2; // sweeps 0..1 (new → full) around the orbit
    drawVenusPhase(ctx, vx, vy, 11, illum);
    ctx.fillStyle = C.good; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.fullRange, cx, H - 14);
  }
}

export function VenusVeiled() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 280;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [model, setModel] = useState("copernicus");
  const modelRef = useRef(model); modelRef.current = model;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, model, 40, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, modelRef.current, tt, lang); raf = requestAnimationFrame(loop); };
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

        <div style={styles.pickerRow}>
          {[["ptolemy", t.ptolemy], ["copernicus", t.copernicus]].map(([id, label]) => (
            <button key={id} onClick={() => setModel(id)}
              style={{ ...styles.chip, ...(model === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <div style={{ fontFamily: mono, fontSize: 12, color: C.cool, marginTop: 8 }}>{t.missions}</div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default VenusVeiled;
