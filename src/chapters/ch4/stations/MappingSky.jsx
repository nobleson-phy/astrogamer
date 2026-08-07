/* ============================================================
   STATION 1 — MAPPING THE SKY
   Longitude measures east–west position in degrees of arc along the
   equator; latitude measures north–south. The sky uses the very same
   idea: declination is the celestial twin of latitude (angle north/
   south of the celestial equator) and right ascension the twin of
   longitude (measured from the vernal equinox). Toggle the sphere
   between Earth coordinates and celestial coordinates. A small Foucault
   pendulum (1851, Jean Foucault) precesses to prove Earth turns.
   Grounded in Ch.4 §4.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Mapping the sky",
    kind: "Latitude & longitude → declination & right ascension",
    lede: "To find a city, mapmakers use latitude and longitude. To find a star, astronomers use the very same idea projected onto the sky. Flip the sphere between Earth and the heavens — the grid is the same, only the names change.",
    thread: "THE STORY SO FAR",
    threadText: "Every journey through the sky begins with an address. Before we can watch the Sun march through the seasons or the Moon change its phase, we need a way to say exactly where things are — on Earth, and on the dome of the sky.",
    key: "PROVING EARTH TURNS",
    keyText: "For centuries no one could prove the ground beneath us moves. In 1851 Jean Foucault hung a huge pendulum in Paris and set it swinging. Its swing plane slowly turned through the day — not because the pendulum shifted, but because Earth rotated beneath it.",
    earth: "Earth", sky: "Sky",
    show: "Showing:",
    eNS: "latitude — north / south of the equator",
    eEW: "longitude — east / west along the equator",
     ePole: "poles", eEq: "equator", ePrime: "prime meridian (Greenwich, 0°)",
    sNS: "declination — north / south of the celestial equator",
    sEW: "right ascension — measured east from the vernal equinox",
    sPole: "celestial poles", sEq: "celestial equator", sPrime: "vernal equinox (0h)",
    twinTitle: "The same grid, two names",
    twins: [
      ["Latitude", "Declination", "緯度", "赤緯"],
      ["Longitude", "Right ascension", "経度", "赤経"],
      ["Equator", "Celestial equator", "赤道", "天の赤道"],
      ["Poles", "Celestial poles", "極", "天の極"],
    ],
    pendulum: "Foucault pendulum · swing plane precesses",
  },
  ja: {
    title: "空をマッピングする",
    kind: "緯度・経度 → 赤緯・赤経",
    lede: "都市を探すとき、地図製作者は緯度と経度を使います。星を探すとき、天文学者はまったく同じ考えを空に投影します。球を地球と天球で切り替えてみよう——格子は同じで、名前だけが変わります。",
    thread: "ここまでの物語",
    threadText: "空をめぐる旅は、どれも「住所」から始まります。太陽が季節をめぐり、月が満ち欠けする様子を見る前に、地球の上でも、天のドームの上でも、ものの位置を正確に言い表す方法が要ります。",
    key: "地球が回っている証拠",
    keyText: "何世紀ものあいだ、足もとの大地が動いていることは誰にも証明できませんでした。1851年、ジャン・フーコーはパリで巨大な振り子を吊るして揺らしました。その振動面は一日をかけてゆっくり回りました——振り子がずれたのではなく、その下で地球が自転していたのです。",
    earth: "地球", sky: "天球",
    show: "表示中：",
    eNS: "緯度 — 赤道から北／南へ",
    eEW: "経度 — 赤道に沿って東／西へ",
    ePole: "極", eEq: "赤道", ePrime: "本初子午線（グリニッジ, 0°）",
    sNS: "赤緯 — 天の赤道から北／南へ",
    sEW: "赤経 — 春分点から東へ測る",
    sPole: "天の極", sEq: "天の赤道", sPrime: "春分点（0時）",
    twinTitle: "同じ格子、二つの名前",
    twins: [
      ["Latitude", "Declination", "緯度", "赤緯"],
      ["Longitude", "Right ascension", "経度", "赤経"],
      ["Equator", "Celestial equator", "赤道", "天の赤道"],
      ["Poles", "Celestial poles", "極", "天の極"],
    ],
    pendulum: "フーコーの振り子・振動面が歳差する",
  },
};

/* --- draw a wireframe sphere with a lat/long-style grid --- */
function drawSphere(ctx, cw, H, celestial, t, lang) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2;
  const R = Math.min(cw * 0.34, H * 0.42);
  const tilt = 0.55; // viewing tilt so parallels look like ellipses

  const bg = celestial ? "rgba(201,139,255,0.05)" : "rgba(99,211,240,0.05)";
  ctx.fillStyle = bg;
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();

  const main = celestial ? C.violet : C.cool;

  // outer limb
  ctx.strokeStyle = celestial ? "rgba(201,139,255,0.5)" : "rgba(99,211,240,0.5)";
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();

  // parallels (lines of constant latitude / declination)
  ctx.strokeStyle = "rgba(150,175,230,0.28)"; ctx.lineWidth = 1;
  for (let lat = -60; lat <= 60; lat += 30) {
    const y = cy - R * Math.sin((lat * Math.PI) / 180);
    const rx = R * Math.cos((lat * Math.PI) / 180);
    const ry = rx * tilt;
    ctx.beginPath(); ctx.ellipse(cx, y, rx, ry, 0, 0, Math.PI * 2); ctx.stroke();
  }
  // equator (bold)
  ctx.strokeStyle = celestial ? "rgba(201,139,255,0.85)" : "rgba(99,211,240,0.85)";
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.ellipse(cx, cy, R, R * tilt, 0, 0, Math.PI * 2); ctx.stroke();

  // meridians (lines of constant longitude / RA)
  ctx.strokeStyle = "rgba(150,175,230,0.28)"; ctx.lineWidth = 1;
  for (let k = 0; k < 6; k++) {
    const a = (k / 6) * Math.PI;
    ctx.beginPath();
    ctx.ellipse(cx, cy, Math.abs(R * Math.cos(a)) || 0.5, R, 0, 0, Math.PI * 2);
    // approximate meridian by rotating a thin ellipse — use simple projected ellipse
    ctx.stroke();
  }
  // prime meridian / vernal equinox marker (bold vertical great circle)
  ctx.strokeStyle = C.sun; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.ellipse(cx, cy, R * 0.02 + 0.5, R, 0, 0, Math.PI * 2); ctx.stroke();

  // poles
  ctx.fillStyle = main;
  ctx.beginPath(); ctx.arc(cx, cy - R, 4, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx, cy + R, 4, 0, Math.PI * 2); ctx.fill();

  // a sample point (a "star" or "city")
  const plat = 38, plon = -40;
  const py = cy - R * Math.sin((plat * Math.PI) / 180);
  const prx = R * Math.cos((plat * Math.PI) / 180);
  const px = cx + prx * Math.sin((plon * Math.PI) / 180);
  ctx.fillStyle = celestial ? "#fff" : C.good;
  ctx.beginPath(); ctx.arc(px, py, celestial ? 4.5 : 5, 0, Math.PI * 2); ctx.fill();
  if (celestial) { // little glow for a star
    ctx.strokeStyle = "rgba(255,255,255,0.5)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(px - 8, py); ctx.lineTo(px + 8, py);
    ctx.moveTo(px, py - 8); ctx.lineTo(px, py + 8); ctx.stroke();
  }

  // labels
  ctx.font = `12px ${mono}`; ctx.textAlign = "center";
  ctx.fillStyle = C.faint;
  ctx.fillText(celestial ? "NCP" : "N", cx, cy - R - 10);
  ctx.fillText(celestial ? "SCP" : "S", cx, cy + R + 18);
  ctx.fillStyle = C.sun;
  ctx.fillText(celestial ? "0h" : "0°", cx, cy - R * tilt - 6);
}

/* --- top-down Foucault pendulum: swing plane precesses over time --- */
function drawPendulum(ctx, w, h, t) {
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2, cy = h / 2;
  const R = Math.min(w, h) * 0.4;

  // ring of target pegs
  const N = 24;
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    const x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
    // knocked over if the precessing plane has passed this peg
    const planeAng = (t * 0.05) % (Math.PI * 2);
    const diff = Math.abs(((a - planeAng + Math.PI) % (Math.PI * 2)) - Math.PI);
    const knocked = diff < 0.28 || Math.abs(diff - Math.PI) < 0.28;
    ctx.fillStyle = knocked ? "rgba(255,110,67,0.85)" : "rgba(150,175,230,0.5)";
    ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
  }

  // precessing swing line
  const planeAng = (t * 0.05) % (Math.PI * 2);
  ctx.strokeStyle = "rgba(99,211,240,0.35)"; ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx - R * Math.cos(planeAng), cy - R * Math.sin(planeAng));
  ctx.lineTo(cx + R * Math.cos(planeAng), cy + R * Math.sin(planeAng));
  ctx.stroke();

  // swinging bob along the line
  const swing = Math.sin(t * 0.12) * R * 0.85;
  const bx = cx + swing * Math.cos(planeAng);
  const by = cy + swing * Math.sin(planeAng);
  ctx.strokeStyle = "rgba(255,207,107,0.5)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(bx, by); ctx.stroke();
  const g = ctx.createRadialGradient(bx, by, 1, bx, by, 8);
  g.addColorStop(0, "#fff"); g.addColorStop(1, C.sun);
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(bx, by, 6, 0, Math.PI * 2); ctx.fill();
}

export function MappingSky() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 320;
  const sphereRef = useRef(null);
  const penRef = useRef(null);
  const [celestial, setCelestial] = useState(false);
  const cw = Math.min(w, 760);

  useEffect(() => {
    const c = sphereRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    drawSphere(ctx, cw, H, celestial, t, lang);
  }, [cw, celestial, lang]);

  useEffect(() => {
    const c = penRef.current;
    if (!c) return;
    const pw = Math.min(cw, 220), ph = 180;
    const ctx = setupCanvas(c, pw, ph);
    if (reduceMotion) { drawPendulum(ctx, pw, ph, 30); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; drawPendulum(ctx, pw, ph, tt); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw]);

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
          {[["earth", t.earth], ["sky", t.sky]].map(([id, label]) => {
            const on = (id === "sky") === celestial;
            return (
              <button key={id} onClick={() => setCelestial(id === "sky")}
                style={{ ...styles.chip, ...(on ? styles.chipOn : {}) }}>{label}</button>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 12, alignItems: "flex-start" }}>
          <canvas ref={sphereRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)", flex: "1 1 320px" }} />
        </div>

        <div style={{ fontFamily: mono, fontSize: 12.5, marginTop: 10, lineHeight: 1.8, color: C.muted }}>
          <div style={{ color: celestial ? C.violet : C.cool }}>■ {celestial ? t.sNS : t.eNS}</div>
          <div style={{ color: celestial ? C.violet : C.cool }}>■ {celestial ? t.sEW : t.eEW}</div>
          <div style={{ color: C.sun }}>■ {celestial ? t.sPrime : t.ePrime}</div>
        </div>

        {/* Foucault pendulum */}
        <div style={{ marginTop: 16, display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
          <canvas ref={penRef} style={{ display: "block", borderRadius: 12, background: "rgba(3,5,12,0.6)", border: `1px solid ${C.border}` }} />
          <div style={{ flex: "1 1 180px", minWidth: 160 }}>
            <div style={{ fontFamily: mono, fontSize: 12.5, color: C.cool }}>{t.pendulum}</div>
          </div>
        </div>

        {/* twin table */}
        <div style={{ marginTop: 16, border: `1px solid ${C.border}`, borderRadius: 12, background: "rgba(8,12,26,0.6)", padding: "12px 16px" }}>
          <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1.5, color: C.faint, marginBottom: 8 }}>{t.twinTitle}</div>
          {t.twins.map((row, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "5px 0", borderBottom: i < t.twins.length - 1 ? "1px solid rgba(120,150,210,0.1)" : "none" }}>
              <span style={{ color: C.cool, fontSize: 14.5 }}>{lang === "ja" ? row[2] : row[0]}</span>
              <span style={{ color: C.faint, fontFamily: mono }}>↔</span>
              <span style={{ color: C.violet, fontSize: 14.5 }}>{lang === "ja" ? row[3] : row[1]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MappingSky;
