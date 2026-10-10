/* ============================================================
   STATION 1 — ELECTRON DEGENERACY & THE WHITE DWARF
   A low-mass star ends as a white dwarf: a carbon-oxygen core the size of
   Earth, no longer fusing, held up against gravity by ELECTRON DEGENERACY
   PRESSURE. That pressure comes from the PAULI EXCLUSION PRINCIPLE — no two
   electrons may share the same quantum state. Degenerate matter is strange:
   adding mass packs the electrons tighter, so a MORE massive white dwarf is
   SMALLER. Grounded in Ch.23.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp, lerp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Electron degeneracy",
    kind: "The white dwarf that cannot be crushed",
    lede: "Slide the mass of a white dwarf from 0.2 to 1.4 M☉. Watch the strange rule of degenerate matter: more mass makes it smaller, not bigger.",
    thread: "THE STORY BEGINS",
    threadText: "A Sun-like star ends quietly, leaving behind a glowing cinder no bigger than Earth. What holds that cinder up, when its fire has gone out forever?",
    key: "PAULI EXCLUSION → ELECTRON DEGENERACY; MORE MASS, SMALLER RADIUS",
    keyText: "A white dwarf is the exposed core of a dead low-mass star — about the mass of the Sun packed into a ball the size of EARTH. No fusion remains; it is held against gravity by ELECTRON DEGENERACY PRESSURE. This pressure arises from the PAULI EXCLUSION PRINCIPLE: no two electrons can occupy the same quantum state, so they resist being squeezed together. Degenerate matter is counter-intuitive — adding mass forces the electrons into a smaller volume, so a MORE massive white dwarf has a SMALLER radius. Pile on too much, and even this pressure fails.",
    mass: "White-dwarf mass",
    earth: "Earth", wd: "white dwarf", radius: "radius",
    denser: "more mass → smaller, denser",
    note: "A white dwarf is a Sun's worth of mass in an Earth-sized ball, supported by electron degeneracy pressure (Pauli exclusion). Uniquely, adding mass shrinks it: the heavier the white dwarf, the smaller its radius.",
  },
  ja: {
    title: "電子縮退",
    kind: "押しつぶせない白色矮星",
    lede: "白色矮星の質量を0.2から1.4 M☉まで動かそう。縮退した物質の奇妙な規則を見よう：質量が増えると、大きくなるのではなく小さくなります。",
    thread: "物語のはじまり",
    threadText: "太陽のような星は静かに終わり、地球ほどの大きさしかない輝く燃えがらを残します。火が永遠に消えたあと、その燃えがらは何に支えられているのでしょう。",
    key: "パウリの排他原理 → 電子縮退；質量が増えるほど半径は小さい",
    keyText: "白色矮星は、死んだ低質量星のむき出しの核です——太陽ほどの質量が地球ほどの球に詰め込まれています。融合はもう残っておらず、電子縮退圧によって重力に抗して支えられています。この圧力はパウリの排他原理から生じます：2つの電子は同じ量子状態を占められないので、押し込められることに抵抗します。縮退した物質は直感に反します——質量を加えると電子はより小さな体積に押し込まれ、質量が大きい白色矮星ほど半径は小さくなります。詰め込みすぎると、この圧力さえ破れます。",
    mass: "白色矮星の質量",
    earth: "地球", wd: "白色矮星", radius: "半径",
    denser: "質量が増える → 小さく、密に",
    note: "白色矮星は太陽ほどの質量が地球サイズの球に詰まったもので、電子縮退圧（パウリの排他原理）で支えられています。独特なことに、質量を加えると縮みます：重い白色矮星ほど半径は小さいのです。",
  },
};

// mass (M☉) -> radius in Earth radii (rough inverse relation for a C/O WD)
function wdRadius(M) {
  // ~1 Earth radius near 0.6 M☉; shrinks strongly toward 1.4
  return clamp(1.1 * Math.pow((1 - Math.pow(M / 1.44, 4 / 3)), 0.5) / Math.pow(M, 1 / 3) + 0.15, 0.25, 2.4);
}

function draw(ctx, cw, H, M, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // Earth reference (fixed) on the right; white dwarf on the left, scaled to Earth radii
  const rEarthPx = 34; // pixels per Earth radius
  const earthR = rEarthPx; // Earth = 1 Earth radius
  const rEarthRadii = wdRadius(M);
  const wdR = clamp(rEarthRadii * rEarthPx, 9, H * 0.42);

  const cxWD = cw * 0.32, cy = H * 0.46;
  const cxE = cw * 0.72;

  // white dwarf glow
  const glow = ctx.createRadialGradient(cxWD, cy, 1, cxWD, cy, wdR + 14);
  glow.addColorStop(0, "rgba(200,225,255,0.55)"); glow.addColorStop(1, "rgba(200,225,255,0)");
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(cxWD, cy, wdR + 14, 0, Math.PI * 2); ctx.fill();
  // white dwarf body
  const g = ctx.createRadialGradient(cxWD - wdR * 0.3, cy - wdR * 0.3, wdR * 0.1, cxWD, cy, wdR);
  g.addColorStop(0, "#f2f8ff"); g.addColorStop(0.7, "#cfe2ff"); g.addColorStop(1, "#8fb6ea");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cxWD, cy, wdR, 0, Math.PI * 2); ctx.fill();

  // Earth reference
  const ge = ctx.createRadialGradient(cxE - earthR * 0.3, cy - earthR * 0.3, earthR * 0.1, cxE, cy, earthR);
  ge.addColorStop(0, "#8fd0ff"); ge.addColorStop(0.6, "#3b7fd0"); ge.addColorStop(1, "#1e4e86");
  ctx.fillStyle = ge; ctx.beginPath(); ctx.arc(cxE, cy, earthR, 0, Math.PI * 2); ctx.fill();

  // labels
  ctx.fillStyle = "#cfe3ff"; ctx.font = `12px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.wd, cxWD, cy + Math.max(wdR, 14) + 22);
  ctx.fillStyle = "#9bd0ff"; ctx.fillText(t.earth, cxE, cy + earthR + 22);

  // readouts
  ctx.fillStyle = C.text; ctx.font = `12px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(`${M.toFixed(2)} M☉`, 16, 24);
  ctx.fillStyle = C.cool;
  ctx.fillText(`${t.radius} ≈ ${rEarthRadii.toFixed(2)} R⊕`, 16, 44);
  ctx.fillStyle = C.sun; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.denser, cw / 2, H - 10);
}

export function ElectronDegeneracy() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 280;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [M, setM] = useState(0.6);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, M, lang);
  }, [cw, M, lang]);

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

        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "4px 0 8px" }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.mass}</span>
          <input type="range" min="0.2" max="1.4" step="0.01" value={M}
            onChange={(e) => setM(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
          <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, width: 64, textAlign: "right" }}>{M.toFixed(2)} M☉</span>
        </div>

        <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default ElectronDegeneracy;
