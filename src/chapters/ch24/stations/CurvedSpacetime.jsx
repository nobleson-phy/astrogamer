/* ============================================================
   STATION 2 — CURVED SPACETIME
   Newton called gravity a force reaching across empty space. Einstein saw
   deeper: MASS WARPS SPACETIME, and objects — including light — simply follow
   the straightest possible paths (geodesics) through that curved geometry. A
   ray of starlight grazing the Sun is deflected; Eddington measured exactly
   this during the 1919 eclipse. The same curvature makes Mercury's perihelion
   creep an extra 43″ per century. Grounded in Ch.24.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp, lerp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Curved spacetime",
    kind: "Mass warps the grid; light follows the curve",
    lede: "Slide the mass up and watch the spacetime sheet dip into a funnel — and the starlight curve around the Sun, so the star's apparent direction shifts away from where it truly sits.",
    thread: "FROM FORCE TO GEOMETRY",
    threadText: "Once you accept the equivalence principle, gravity stops being a pull between objects. It becomes the shape of space and time themselves.",
    key: "MASS CURVES SPACETIME — LIGHT FOLLOWS THE CURVE",
    keyText: "Newton described gravity as an attractive force acting instantly across empty space. General relativity replaces that picture entirely: MASS and ENERGY curve the four-dimensional fabric of SPACETIME, and everything — planets, moons, even light — simply follows the straightest available path through that curved geometry. Because light itself must follow the curve, a ray grazing the Sun is bent. Arthur EDDINGTON confirmed this in the 1919 solar eclipse, measuring stars near the Sun's edge shifted from their true positions. The same curvature makes the point of MERCURY's closest approach advance an extra 43 arcseconds per century — a leftover Newton could never explain.",
    mass: "Central mass",
    light: "starlight ray", star: "mass",
    noMass: "path without mass", dev: "deflection",
    actualDir: "actual direction to star", apparentDir: "apparent direction to star",
    observer: "to observer", sunLabel: "Sun — curves spacetime",
    eddington: "Eddington 1919: starlight bent at the Sun's edge",
    mercury: "Mercury perihelion: +43″ / century beyond Newton",
    note: "Mass curves spacetime; objects and light follow geodesics through it. Light bending near the Sun (Eddington, 1919) and Mercury's extra 43″/century perihelion advance are two classic confirmations — gravity is geometry, not a force.",
  },
  ja: {
    title: "曲がった時空",
    kind: "質量が格子をゆがめ、光は曲率に沿う",
    lede: "質量を上げて、時空のシートが漏斗のように沈むのを見よう——そして星の光が太陽のまわりで曲がり、星の見かけの方向が本当の位置からずれるのを見よう。",
    thread: "力から幾何学へ",
    threadText: "等価原理をいったん受け入れると、重力は物体どうしの引き合いではなくなります。空間と時間そのものの形になるのです。",
    key: "質量が時空を曲げる——光は曲率に沿う",
    keyText: "ニュートンは重力を、空っぽの空間を越えて瞬時に働く引力として記述しました。一般相対論はその描像をすっかり置き換えます：質量とエネルギーが4次元の時空の生地を曲げ、惑星も衛星も、光さえも、ただその曲がった幾何学の中で最もまっすぐな経路をたどるのです。光自身も曲率に沿わねばならないので、太陽をかすめる光線は曲げられます。アーサー・エディントンは1919年の皆既日食でこれを確かめ、太陽の縁の近くの星が本当の位置からずれているのを測定しました。同じ曲率が、水星の最接近点を1世紀あたり43秒角だけ余分に進ませます——ニュートンには決して説明できなかった残り分です。",
    mass: "中心の質量",
    light: "星の光の光線", star: "質量",
    noMass: "質量がない場合の経路", dev: "偏向",
    actualDir: "星の実際の方向", apparentDir: "星の見かけの方向",
    observer: "観測者へ", sunLabel: "太陽——時空を曲げる",
    eddington: "エディントン1919：太陽の縁で曲がる星の光",
    mercury: "水星の近日点：ニュートンを超えて +43″／世紀",
    note: "質量は時空を曲げ、物体と光はその中の測地線をたどります。太陽の近くで曲がる光（エディントン、1919年）と、水星の余分な43″／世紀の近日点移動は2つの古典的な確認です——重力は力ではなく幾何学です。",
  },
};

function draw(ctx, cw, H, M, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.5;
  const halfW = cw * 0.44;
  const frontY = H * 0.9, backY = H * 0.22;
  const depthPx = lerp(18, 135, M);          // funnel depth grows with mass
  const rc = 0.52;
  const persp = (v) => lerp(1.0, 0.46, v);   // horizontal compression with depth
  const dipAt = (u, v) => {
    const r = Math.hypot(u, (v - 0.5) * 1.4);
    return depthPx / (1 + Math.pow(r / rc, 1.6));
  };
  // project a plane point (u in [-1,1], v in [0 front .. 1 back]) into the 3D-looking sheet
  const project = (u, v) => {
    const pr = persp(v);
    const dip = dipAt(u, v);
    let sx = cx + u * halfW * pr;
    const sy = lerp(frontY, backY, v) + dip * pr;     // dip pushes the sheet downward
    const pull = clamp(dip / (depthPx + 1), 0, 1) * 0.33;  // funnel neck draws lines inward
    sx = sx - (sx - cx) * pull;
    return [sx, sy];
  };

  // the spacetime sheet: a perspective grid with a central funnel
  ctx.strokeStyle = "rgba(120,160,235,0.30)"; ctx.lineWidth = 1;
  const NU = 14, NV = 12;
  for (let iv = 0; iv <= NV; iv++) {
    const v = iv / NV; ctx.beginPath(); let first = true;
    for (let u = -1; u <= 1.0001; u += 0.04) {
      const [sx, sy] = project(u, v);
      if (first) { ctx.moveTo(sx, sy); first = false; } else ctx.lineTo(sx, sy);
    }
    ctx.stroke();
  }
  for (let iu = 0; iu <= NU; iu++) {
    const u = -1 + 2 * iu / NU; ctx.beginPath(); let first = true;
    for (let v = 0; v <= 1.0001; v += 0.03) {
      const [sx, sy] = project(u, v);
      if (first) { ctx.moveTo(sx, sy); first = false; } else ctx.lineTo(sx, sy);
    }
    ctx.stroke();
  }

  // the Sun, sitting at the bottom of the funnel
  const [sxS, syS] = project(0, 0.5);
  const sunR = lerp(15, 30, M);
  const sg = ctx.createRadialGradient(sxS - sunR * 0.3, syS - sunR * 0.3, 2, sxS, syS, sunR + 10);
  sg.addColorStop(0, "#fff3b0"); sg.addColorStop(0.55, "#ffd23f"); sg.addColorStop(1, "rgba(255,150,40,0)");
  ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(sxS, syS, sunR + 10, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffd23f"; ctx.beginPath(); ctx.arc(sxS, syS, sunR, 0, Math.PI * 2); ctx.fill();

  // geometry of the light paths
  const topY = H * 0.1;
  const A = [cx - 66, topY];                 // the star's TRUE position (upper-left)
  const O = [cx - 6, H * 0.95];              // the observer, at the front
  const lrp = (p, q, f) => [p[0] + (q[0] - p[0]) * f, p[1] + (q[1] - p[1]) * f];
  const c1b = lrp(A, O, 0.4), c2b = lrp(A, O, 0.72);
  const off = lerp(0, 95, M);                // 0 at no mass → perfectly straight ray
  const c1 = [c1b[0] + off, c1b[1]];
  const c2 = [c2b[0] + off * 0.75, c2b[1]];
  // apparent star = straight extension of the light's arrival direction at the observer
  const k = (topY - O[1]) / (c2[1] - O[1]);
  const apparent = [O[0] + (c2[0] - O[0]) * k, topY];
  const showApparent = M > 0.04;

  const drawStar = (x, y, col) => {
    ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = col; ctx.lineWidth = 1.4;
    for (let a = 0; a < 4; a++) { const ang = a * Math.PI / 2 + Math.PI / 4; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(ang) * 8, y + Math.sin(ang) * 8); ctx.stroke(); }
  };

  // dashed straight sightlines from the observer
  ctx.setLineDash([5, 5]); ctx.lineWidth = 1.3;
  ctx.strokeStyle = "rgba(255,255,255,0.45)";
  ctx.beginPath(); ctx.moveTo(O[0], O[1]); ctx.lineTo(A[0], A[1]); ctx.stroke();            // actual
  if (showApparent) {
    ctx.strokeStyle = "rgba(255,223,138,0.65)";
    ctx.beginPath(); ctx.moveTo(O[0], O[1]); ctx.lineTo(apparent[0], apparent[1]); ctx.stroke();  // apparent
  }
  ctx.setLineDash([]);

  // the real, curved light ray — follows the contour of spacetime
  ctx.strokeStyle = C.sun; ctx.lineWidth = 2.6;
  ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.bezierCurveTo(c1[0], c1[1], c2[0], c2[1], O[0], O[1]); ctx.stroke();

  // star markers
  drawStar(A[0], A[1], "#fff0b0");
  if (showApparent) drawStar(apparent[0], apparent[1], "rgba(255,223,138,0.85)");
  // observer marker
  ctx.fillStyle = "#dbe4ff"; ctx.beginPath(); ctx.arc(O[0], O[1], 4, 0, Math.PI * 2); ctx.fill();

  // labels (horizontal)
  ctx.font = `10px ${mono}`; ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255,255,255,0.78)";
  ctx.fillText(t.actualDir, clamp(A[0], 72, cw - 72), A[1] + 16);
  if (showApparent) {
    ctx.fillStyle = "rgba(255,223,138,0.9)";
    ctx.fillText(t.apparentDir, clamp(apparent[0], 72, cw - 72), apparent[1] + 16);
  }
  ctx.fillStyle = "#ffd23f";
  ctx.fillText(t.sunLabel, clamp(sxS, 80, cw - 80), syS + sunR + 18 > H - 6 ? syS - sunR - 10 : syS + sunR + 18);
  ctx.fillStyle = "#dbe4ff"; ctx.textAlign = "left"; ctx.fillText(t.observer, O[0] + 8, O[1] - 2);
  ctx.fillStyle = C.text; ctx.textAlign = "right"; ctx.font = `12px ${mono}`;
  ctx.fillText(`${t.mass}: ${(0.1 + M * 9.9).toFixed(1)}×`, cw - 10, 16);
}

export function CurvedSpacetime() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 300;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [M, setM] = useState(0.45);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, M, lang);
  }, [cw, M, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 02</div>
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
          <input type="range" min="0" max="1" step="0.01" value={M}
            onChange={(e) => setM(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
          <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, width: 52, textAlign: "right" }}>{(0.1 + M * 9.9).toFixed(1)}×</span>
        </div>

        <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />

        <div style={{ fontFamily: mono, fontSize: 11.5, color: C.cool, marginTop: 8 }}>{t.eddington}</div>
        <div style={{ fontFamily: mono, fontSize: 11.5, color: C.sun, marginTop: 4 }}>{t.mercury}</div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default CurvedSpacetime;
