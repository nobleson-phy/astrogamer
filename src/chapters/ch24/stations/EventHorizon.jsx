/* ============================================================
   STATION 4 — THE EVENT HORIZON & SCHWARZSCHILD RADIUS
   Above about 3 M☉, no pressure can stop collapse. The result is a black hole:
   a region bounded by the EVENT HORIZON, where the escape velocity equals the
   speed of light. For a non-rotating hole the horizon radius is the
   SCHWARZSCHILD RADIUS, R_S = 2GM/c², which scales LINEARLY with mass:
   1 M☉ -> about 3 km, 10 M☉ -> about 30 km, 30 M☉ -> about 89 km. Grounded
   in Ch.24.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const RS_PER_MSUN = 2.95; // km per solar mass

const STR = {
  en: {
    title: "The event horizon",
    kind: "Escape velocity = c; the radius scales with mass",
    lede: "Set the black hole's mass from 1 to 30 M☉. The event horizon disc grows in exact proportion to mass — double the mass, double the radius.",
    thread: "THE POINT OF NO RETURN",
    threadText: "Collapse past about 3 solar masses and nothing — not even light — can hold the matter up. A boundary forms from which nothing returns.",
    key: "ESCAPE VELOCITY = c; R_S ∝ MASS (1 M☉ ≈ 3 km)",
    keyText: "When a stellar core above about 3 M☉ collapses, no known pressure can stop it, and a BLACK HOLE forms. Its boundary is the EVENT HORIZON: the surface where the escape velocity equals the SPEED OF LIGHT. Cross it and no signal, no light, nothing can ever climb back out. For a non-rotating black hole the horizon lies at the SCHWARZSCHILD RADIUS, R_S = 2GM/c². This radius grows LINEARLY with mass: about 3 km for 1 M☉, about 30 km for 10 M☉, about 89 km for 30 M☉. A black hole is astonishingly small — a Sun's entire mass crushed inside a 3-km sphere — yet its horizon is a one-way door sealing the universe off from whatever lies within.",
    mass: "Black-hole mass",
    horizon: "event horizon", rs: "Schwarzschild radius",
    escape: "escape velocity = c at the horizon",
    thresh: "forms only above about 3 M☉ core collapse",
    note: "The event horizon is where escape velocity equals c. For a non-rotating hole it sits at the Schwarzschild radius R_S = 2GM/c², which scales linearly with mass — about 3 km per solar mass.",
  },
  ja: {
    title: "事象の地平面",
    kind: "脱出速度 = c；半径は質量に比例する",
    lede: "ブラックホールの質量を1から30 M☉まで設定しよう。事象の地平面の円は質量に正確に比例して大きくなります——質量が2倍なら半径も2倍。",
    thread: "もう戻れない点",
    threadText: "約3太陽質量を超えて崩壊すると、何ものも——光でさえ——物質を支えられません。そこから何も戻らない境界ができます。",
    key: "脱出速度 = c；R_S ∝ 質量（1 M☉ ≈ 3 km）",
    keyText: "約3 M☉を超える星の核が崩壊すると、知られているどんな圧力もそれを止められず、ブラックホールができます。その境界が事象の地平面です：脱出速度が光速に等しくなる面です。それを越えると、どんな信号も、光も、何ものも二度と這い上がれません。回転していないブラックホールでは、地平面はシュヴァルツシルト半径 R_S = 2GM/c² にあります。この半径は質量に比例して大きくなります：1 M☉で約3 km、10 M☉で約30 km、30 M☉で約89 km。ブラックホールは驚くほど小さく——太陽ほどの質量まるごとが3 kmの球の中に押しつぶされます——それでもその地平面は、内側にあるものから宇宙を封じる一方通行の扉です。",
    mass: "ブラックホールの質量",
    horizon: "事象の地平面", rs: "シュヴァルツシルト半径",
    escape: "地平面では脱出速度 = c",
    thresh: "約3 M☉を超える核崩壊でのみ形成される",
    note: "事象の地平面は脱出速度が光速に等しくなる場所です。回転しない穴ではシュヴァルツシルト半径 R_S = 2GM/c² にあり、質量に比例します——1太陽質量あたり約3 km。",
  },
};

function draw(ctx, cw, H, M, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.42, cy = H * 0.5;
  const rKm = M * RS_PER_MSUN;
  // scale: 30 M☉ -> ~89 km maps to max radius
  const maxR = Math.min(cw * 0.26, H * 0.4);
  const r = clamp((M / 30) * maxR + 8, 8, maxR);

  // photon-sphere glow ring
  const glow = ctx.createRadialGradient(cx, cy, r, cx, cy, r + 26);
  glow.addColorStop(0, "rgba(255,180,80,0.5)"); glow.addColorStop(1, "rgba(255,120,60,0)");
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(cx, cy, r + 26, 0, Math.PI * 2); ctx.fill();

  // swirling thin accretion ring just outside horizon
  ctx.save();
  ctx.translate(cx, cy);
  for (let k = 0; k < 40; k++) {
    const a = (k / 40) * Math.PI * 2 + tt * 0.02;
    const rr = r + 10 + 6 * Math.sin(k * 1.7 + tt * 0.05);
    ctx.fillStyle = `rgba(255,${160 + (k % 3) * 20},90,0.5)`;
    ctx.beginPath(); ctx.arc(Math.cos(a) * rr, Math.sin(a) * rr * 0.4, 1.6, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();

  // the black disc (horizon)
  ctx.fillStyle = "#05060d"; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = C.sun; ctx.lineWidth = 1.6; ctx.setLineDash([3, 4]);
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
  ctx.setLineDash([]);

  // radius marker line
  ctx.strokeStyle = C.cool; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + r, cy); ctx.stroke();
  ctx.fillStyle = C.cool; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText("R_S", cx + r * 0.5, cy - 6);

  // labels
  ctx.fillStyle = C.sun; ctx.font = `12px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.horizon, cx, cy + r + 24 > H - 10 ? cy - r - 12 : cy + r + 24);

  // readout panel (right)
  const px = cw - 150;
  ctx.textAlign = "left";
  ctx.fillStyle = C.text; ctx.font = `13px ${mono}`;
  ctx.fillText(`${M.toFixed(0)} M☉`, px, 40);
  ctx.fillStyle = C.cool; ctx.font = `12px ${mono}`;
  ctx.fillText(`${t.rs}:`, px, 66);
  ctx.fillStyle = C.sun; ctx.font = `15px ${mono}`;
  ctx.fillText(`${rKm.toFixed(0)} km`, px, 88);
  ctx.fillStyle = C.faint; ctx.font = `10.5px ${mono}`;
  ctx.fillText("R_S = 2GM/c²", px, 112);
  ctx.fillText("≈ 3 km × (M / M☉)", px, 128);

  ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.escape, cw / 2, H - 10);
}

export function EventHorizon() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 290;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [M, setM] = useState(10);
  const massRef = useRef(10); massRef.current = M;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, massRef.current, 0, lang); return; }
    let raf, tt = 0;
    const loop = () => {
      tt += 1;
      draw(ctx, cw, H, massRef.current, tt, lang);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 04</div>
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

        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "4px 0 8px" }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.mass}</span>
          <input type="range" min="1" max="30" step="1" value={M}
            onChange={(e) => setM(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
          <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, width: 56, textAlign: "right" }}>{M.toFixed(0)} M☉</span>
        </div>

        <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />

        <div style={{ fontFamily: mono, fontSize: 11.5, color: C.sun, marginTop: 8 }}>{t.thresh}</div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default EventHorizon;
