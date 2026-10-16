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
    lede: "Slide the mass up and watch the spacetime grid dip into a well — and the passing ray of starlight bend more and more as it follows that curve.",
    thread: "FROM FORCE TO GEOMETRY",
    threadText: "Once you accept the equivalence principle, gravity stops being a pull between objects. It becomes the shape of space and time themselves.",
    key: "MASS CURVES SPACETIME — LIGHT FOLLOWS THE CURVE",
    keyText: "Newton described gravity as an attractive force acting instantly across empty space. General relativity replaces that picture entirely: MASS and ENERGY curve the four-dimensional fabric of SPACETIME, and everything — planets, moons, even light — simply follows the straightest available path through that curved geometry. Because light itself must follow the curve, a ray grazing the Sun is bent. Arthur EDDINGTON confirmed this in the 1919 solar eclipse, measuring stars near the Sun's edge shifted from their true positions. The same curvature makes the point of MERCURY's closest approach advance an extra 43 arcseconds per century — a leftover Newton could never explain.",
    mass: "Central mass",
    light: "starlight ray", star: "mass",
    noMass: "path without mass", dev: "deflection",
    eddington: "Eddington 1919: starlight bent at the Sun's edge",
    mercury: "Mercury perihelion: +43″ / century beyond Newton",
    note: "Mass curves spacetime; objects and light follow geodesics through it. Light bending near the Sun (Eddington, 1919) and Mercury's extra 43″/century perihelion advance are two classic confirmations — gravity is geometry, not a force.",
  },
  ja: {
    title: "曲がった時空",
    kind: "質量が格子をゆがめ、光は曲率に沿う",
    lede: "質量を上げて、時空の格子が井戸のように沈むのを見よう——そして通り過ぎる星の光が、その曲率に沿ってどんどん曲がっていくのを見よう。",
    thread: "力から幾何学へ",
    threadText: "等価原理をいったん受け入れると、重力は物体どうしの引き合いではなくなります。空間と時間そのものの形になるのです。",
    key: "質量が時空を曲げる——光は曲率に沿う",
    keyText: "ニュートンは重力を、空っぽの空間を越えて瞬時に働く引力として記述しました。一般相対論はその描像をすっかり置き換えます：質量とエネルギーが4次元の時空の生地を曲げ、惑星も衛星も、光さえも、ただその曲がった幾何学の中で最もまっすぐな経路をたどるのです。光自身も曲率に沿わねばならないので、太陽をかすめる光線は曲げられます。アーサー・エディントンは1919年の皆既日食でこれを確かめ、太陽の縁の近くの星が本当の位置からずれているのを測定しました。同じ曲率が、水星の最接近点を1世紀あたり43秒角だけ余分に進ませます——ニュートンには決して説明できなかった残り分です。",
    mass: "中心の質量",
    light: "星の光の光線", star: "質量",
    noMass: "質量がない場合の経路", dev: "偏向",
    eddington: "エディントン1919：太陽の縁で曲がる星の光",
    mercury: "水星の近日点：ニュートンを超えて +43″／世紀",
    note: "質量は時空を曲げ、物体と光はその中の測地線をたどります。太陽の近くで曲がる光（エディントン、1919年）と、水星の余分な43″／世紀の近日点移動は2つの古典的な確認です——重力は力ではなく幾何学です。",
  },
};

function draw(ctx, cw, H, M, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.5, cy = H * 0.5;
  const depth = lerp(10, 120, M);          // well depth grows with mass
  const wellR = lerp(70, 150, M);           // influence radius
  const massR = lerp(7, 20, M);
  // the grid sags downward by `depth*0.55` at the center, so the mass sits at the
  // very bottom of the well — curvature is deepest exactly at the mass.
  const starCy = cy + depth * 0.55;

  // spacetime grid with a dip: displace each grid point toward the center
  const warp = (x, y) => {
    const dx = x - cx, dy = y - cy;
    const r = Math.hypot(dx, dy);
    const pull = depth * Math.exp(-(r * r) / (2 * (wellR * 0.6) * (wellR * 0.6)));
    return [x, y + pull * 0.55 - (r < 1 ? 0 : 0)];
  };

  ctx.strokeStyle = "rgba(120,160,235,0.28)"; ctx.lineWidth = 1;
  const step = Math.max(26, Math.round(cw / 20));
  // horizontal lines
  for (let gy = 24; gy <= H - 8; gy += step) {
    ctx.beginPath();
    for (let gx = 0; gx <= cw; gx += 6) {
      const [px, py] = warp(gx, gy);
      if (gx === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }
  // vertical lines
  for (let gx = 8; gx <= cw - 8; gx += step) {
    ctx.beginPath();
    for (let gy = 24; gy <= H - 8; gy += 6) {
      const [px, py] = warp(gx, gy);
      if (gy === 24) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }

  // light ray entering from the left, grazing above the mass
  const b = 70;                              // impact parameter (px above the mass)
  const rayY0 = starCy - b;                  // the undeflected straight-line height
  // total DOWNWARD deflection toward the mass: exactly 0 with no mass, growing with
  // mass and stronger for a closer graze. It is PERMANENT — the ray exits at a new
  // angle and stays there, so the endpoint is maximally displaced from the straight path.
  const bend = lerp(0, 130, M) * (70 / b);

  // dashed reference: where the ray would go with NO mass (a straight line)
  ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.setLineDash([5, 5]); ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.moveTo(0, rayY0); ctx.lineTo(cw, rayY0); ctx.stroke(); ctx.setLineDash([]);

  // the bent ray: straight in, bends down near the mass, straight out at a new angle
  ctx.strokeStyle = C.sun; ctx.lineWidth = 2.4;
  ctx.beginPath();
  let started = false;
  let endX = 0, endY = 0, prevX = 0, prevY = 0;
  for (let x = 0; x <= cw; x += 4) {
    const s = (x - cx) / (wellR * 0.5);
    const frac = 0.5 * (1 + Math.tanh(s));   // smooth 0→1 step localized at the mass
    const y = rayY0 + bend * frac;
    if (!started) { ctx.moveTo(x, y); started = true; } else ctx.lineTo(x, y);
    prevX = x; prevY = y; endX = x; endY = y;
  }
  ctx.stroke();
  // arrowhead at the end of the ray
  ctx.fillStyle = C.sun;
  const ang = Math.atan2(endY - prevY, endX - prevX) || 0;
  ctx.beginPath();
  ctx.moveTo(endX, endY);
  ctx.lineTo(endX - 9 * Math.cos(ang - 0.4), endY - 9 * Math.sin(ang - 0.4));
  ctx.lineTo(endX - 9 * Math.cos(ang + 0.4), endY - 9 * Math.sin(ang + 0.4));
  ctx.closePath(); ctx.fill();

  // deflection marker at the right edge: the gap between the straight path and the bent exit
  if (bend > 2) {
    ctx.strokeStyle = "rgba(255,223,138,0.7)"; ctx.setLineDash([2, 3]); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(endX - 2, rayY0); ctx.lineTo(endX - 2, endY); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = C.sun; ctx.font = `10px ${mono}`; ctx.textAlign = "right";
    ctx.fillText(t.dev, endX - 8, (rayY0 + endY) / 2 + 3);
  }

  // central mass — drawn at the bottom of the well (starCy)
  const g = ctx.createRadialGradient(cx - massR * 0.3, starCy - massR * 0.3, 1, cx, starCy, massR + 10);
  g.addColorStop(0, "#fff0c0"); g.addColorStop(0.5, C.sun); g.addColorStop(1, "rgba(255,120,60,0)");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, starCy, massR + 10, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffdf8a"; ctx.beginPath(); ctx.arc(cx, starCy, massR, 0, Math.PI * 2); ctx.fill();

  // labels (horizontal)
  ctx.fillStyle = C.sun; ctx.font = `12px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(t.light, 10, rayY0 - 8);
  ctx.fillStyle = "rgba(255,255,255,0.55)"; ctx.textAlign = "right";
  ctx.fillText(t.noMass, cw - 10, rayY0 - 6);
  ctx.fillStyle = "#ffdf8a"; ctx.font = `12px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.star, cx, starCy + massR + 20);
  ctx.fillStyle = C.text; ctx.textAlign = "right";
  ctx.fillText(`${t.mass}: ${(0.1 + M * 9.9).toFixed(1)}×`, cw - 10, 18);
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
