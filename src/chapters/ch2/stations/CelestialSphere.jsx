/* ============================================================
   STATION 1 — THE CELESTIAL SPHERE
   Step through the reference points of the sky: zenith → nadir →
   horizon → meridian → celestial poles → celestial equator.
   A labelled sky-dome diagram (canvas) highlights each in turn.
   Grounded in Ch.2 §2.1 (The Sky Above).
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { clamp, useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const FEATURES = [
  {
    id: "zenith", tint: "#63d3f0",
    name: { en: "The Zenith", ja: "天頂" },
    story: { en: "Start straight up. The point on the celestial sphere directly over your head is the zenith.", ja: "まっすぐ真上から始めよう。天球上で頭の真上にある点が天頂です。" },
    def: { en: "The zenith is the point on the celestial sphere directly above the observer.", ja: "天頂は、観測者の真上にある天球上の点です。" },
  },
  {
    id: "nadir", tint: "#b58cf0",
    name: { en: "The Nadir", ja: "天底" },
    story: { en: "Now look straight down, through the Earth. The point directly below you is the nadir.", ja: "今度は真下——地球を貫いた先を見よう。真下にある点が天底です。" },
    def: { en: "The nadir is the point on the celestial sphere directly below the observer, opposite the zenith.", ja: "天底は、観測者の真下にある天球上の点で、天頂の反対側にあります。" },
  },
  {
    id: "horizon", tint: "#5fd39a",
    name: { en: "The Horizon", ja: "地平線" },
    story: { en: "Between up and down lies the great circle where the sky seems to meet the ground.", ja: "上と下のあいだに、空が地面と接して見える大円があります。" },
    def: { en: "The horizon is the circle where the dome of the sky appears to meet the ground around you.", ja: "地平線は、空のドームが周囲の地面と接して見える円です。" },
  },
  {
    id: "meridian", tint: "#ffcf6b",
    name: { en: "The Meridian", ja: "子午線" },
    story: { en: "Draw a line from due north, up over the zenith, to due south. That is your meridian.", ja: "真北から天頂を越えて真南へと結ぶ線——それがあなたの子午線です。" },
    def: { en: "The meridian is the north–south line on the sky that passes through the zenith.", ja: "子午線は、天頂を通って天球を南北に結ぶ線です。" },
  },
  {
    id: "poles", tint: "#ff9a6b",
    name: { en: "The Celestial Poles", ja: "天の極" },
    story: { en: "Extend Earth's spin axis out to the sphere. Those two fixed points are the celestial poles — the sky wheels around them.", ja: "地球の自転軸をそのまま天球まで延ばそう。その2つの動かない点が天の極——空はこの点を軸に回ります。" },
    def: { en: "The north and south celestial poles are where Earth's rotation axis, extended, meets the sphere. They do not move as the sky appears to turn.", ja: "天の北極と南極は、地球の自転軸を延ばしたときに天球と交わる点です。空が回って見えても、この点は動きません。" },
  },
  {
    id: "equator", tint: "#8ad0ff",
    name: { en: "The Celestial Equator", ja: "天の赤道" },
    story: { en: "Halfway between the poles runs a great circle in the same plane as Earth's own equator.", ja: "両極のちょうど中間を、地球の赤道と同じ平面上に大円が走ります。" },
    def: { en: "The celestial equator is a great circle lying in the same plane as Earth's equator, midway between the poles.", ja: "天の赤道は、地球の赤道と同じ平面上にある大円で、両極の中間に位置します。" },
  },
];

const STR = {
  en: {
    title: "The celestial sphere",
    kind: "A map painted on the inside of the sky",
    lede: "For thousands of years people pictured the sky as a giant dome — the celestial sphere — turning overhead. Step through its landmarks.",
    thread: "THE SKY MAP",
    prev: "‹ Prev", next: "Next ›",
    counter: (i, n) => `Feature ${i} / ${n}`,
    define: "Definition",
    convenient: "Stars are really at wildly different distances — the sphere is an illusion. But it stays a convenient way to describe and track the positions of objects in the sky.",
    convenientLabel: "WHY IT STILL WORKS",
  },
  ja: {
    title: "天球",
    kind: "空の内側に描かれた地図",
    lede: "何千年ものあいだ、人々は空を頭上で回る巨大なドーム——天球——として思い描いてきました。その目印を順にたどろう。",
    thread: "空の地図",
    prev: "‹ 前へ", next: "次へ ›",
    counter: (i, n) => `${n}中 ${i} 番目`,
    define: "定義",
    convenient: "実際には星は驚くほどまちまちの距離にあり、天球は錯覚です。それでも、空にある天体の位置を記述し追跡するには、今なお便利な方法です。",
    convenientLabel: "今も役立つ理由",
  },
};

function draw(ctx, cw, H, activeId, phase) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2 + 6;
  const R = Math.min(cw, H) * 0.40;
  const phi = 40 * Math.PI / 180; // illustrative latitude
  const dim = "rgba(140,170,220,0.30)";

  const isOn = (id) => activeId === id;
  const tintOf = (id) => FEATURES.find((f) => f.id === id).tint;

  // faint stars drifting across the dome (sky turns)
  for (let i = 0; i < 60; i++) {
    const a = (i * 137.5) * Math.PI / 180 + phase * 0.15;
    const rr = R * (0.2 + ((i * 53) % 100) / 130);
    const x = cx + Math.cos(a) * rr;
    const y = cy - Math.abs(Math.sin(a)) * rr * 0.9;
    if (y < cy) { ctx.fillStyle = "rgba(233,237,247,0.5)"; ctx.beginPath(); ctx.arc(x, y, 0.9, 0, 7); ctx.fill(); }
  }

  // ground shading below horizon
  ctx.fillStyle = "rgba(30,40,70,0.35)";
  ctx.beginPath(); ctx.ellipse(cx, cy, R, R * 0.16, 0, 0, Math.PI * 2); ctx.fill();

  // MERIDIAN — main circle outline
  {
    const on = isOn("meridian"); const col = on ? tintOf("meridian") : dim;
    ctx.strokeStyle = col; ctx.lineWidth = on ? 3 : 1.4;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
  }

  // CELESTIAL EQUATOR — tilted ring perpendicular to the polar axis
  {
    const on = isOn("equator"); const col = on ? tintOf("equator") : dim;
    const rot = Math.atan2(-Math.cos(phi), Math.sin(phi));
    ctx.strokeStyle = col; ctx.lineWidth = on ? 3 : 1.4; ctx.setLineDash(on ? [] : [4, 6]);
    ctx.beginPath(); ctx.ellipse(cx, cy, R, R * 0.30, rot, 0, Math.PI * 2); ctx.stroke();
    ctx.setLineDash([]);
  }

  // HORIZON — flat ellipse
  {
    const on = isOn("horizon"); const col = on ? tintOf("horizon") : dim;
    ctx.strokeStyle = col; ctx.lineWidth = on ? 3 : 1.6;
    ctx.beginPath(); ctx.ellipse(cx, cy, R, R * 0.16, 0, 0, Math.PI * 2); ctx.stroke();
  }

  // POLAR AXIS + poles
  {
    const on = isOn("poles"); const col = on ? tintOf("poles") : dim;
    const nx = cx - R * Math.cos(phi), ny = cy - R * Math.sin(phi);
    const sx = cx + R * Math.cos(phi), sy = cy + R * Math.sin(phi);
    ctx.strokeStyle = col; ctx.lineWidth = on ? 2.4 : 1.2; ctx.setLineDash([3, 5]);
    ctx.beginPath(); ctx.moveTo(nx, ny); ctx.lineTo(sx, sy); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = on ? col : dim;
    for (const [px, py, lbl] of [[nx, ny, "NCP"], [sx, sy, "SCP"]]) {
      ctx.beginPath(); ctx.arc(px, py, on ? 5 : 3.2, 0, 7); ctx.fill();
      if (on) { ctx.font = `12px ${mono}`; ctx.fillStyle = col; ctx.fillText(lbl, px + 8, py + 4); }
    }
  }

  // observer
  ctx.fillStyle = "#e9edf7"; ctx.beginPath(); ctx.arc(cx, cy, 3, 0, 7); ctx.fill();

  // ZENITH
  {
    const on = isOn("zenith"); const col = on ? tintOf("zenith") : dim;
    ctx.strokeStyle = col; ctx.setLineDash([2, 5]); ctx.lineWidth = on ? 2 : 1;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy - R); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = col; ctx.beginPath(); ctx.arc(cx, cy - R, on ? 6 : 3.4, 0, 7); ctx.fill();
  }
  // NADIR
  {
    const on = isOn("nadir"); const col = on ? tintOf("nadir") : dim;
    ctx.strokeStyle = col; ctx.setLineDash([2, 5]); ctx.lineWidth = on ? 2 : 1;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy + R); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = col; ctx.beginPath(); ctx.arc(cx, cy + R, on ? 6 : 3.4, 0, 7); ctx.fill();
  }

  // cardinal labels N / S on the horizon
  ctx.font = `12px ${mono}`; ctx.fillStyle = "rgba(174,183,210,0.8)";
  ctx.fillText("N", cx - R - 14, cy + 4);
  ctx.fillText("S", cx + R + 6, cy + 4);
}

export function CelestialSphere() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 340;
  const canvasRef = useRef(null);
  const [sel, setSel] = useState(0);
  const cw = Math.min(w, 760);
  const feat = FEATURES[sel];
  const go = (n) => setSel(clamp(n, 0, FEATURES.length - 1));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, feat.id, 0); return; }
    let raf, ph = 0;
    const loop = () => { ph += 0.03; draw(ctx, cw, H, feat.id, ph); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, sel]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 01</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{tr(feat.story, lang)}</p>
        </div>
        <div style={styles.fateBox}>
          <div style={{ ...styles.fateLabel, color: feat.tint }}>{t.define}</div>
          <p style={styles.factText}>{tr(feat.def, lang)}</p>
        </div>
        <div style={{ ...styles.pathBox, marginTop: 14 }}>
          <div style={{ ...styles.fateLabel, color: C.cool }}>{t.convenientLabel}</div>
          <p style={{ ...styles.keyTermText, margin: 0 }}>{t.convenient}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>
        <canvas ref={canvasRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />

        <div style={{ ...styles.controlBar, justifyContent: "space-between" }}>
          <button style={{ ...styles.iconBtn, opacity: sel === 0 ? 0.4 : 1, cursor: sel === 0 ? "default" : "pointer" }}
            onClick={() => go(sel - 1)} disabled={sel === 0}>{t.prev}</button>
          <span style={{ fontFamily: mono, fontSize: 13, color: C.faint }}>{t.counter(sel + 1, FEATURES.length)}</span>
          <button style={{ ...styles.iconBtn, opacity: sel === FEATURES.length - 1 ? 0.4 : 1, cursor: sel === FEATURES.length - 1 ? "default" : "pointer" }}
            onClick={() => go(sel + 1)} disabled={sel === FEATURES.length - 1}>{t.next}</button>
        </div>

        <div style={styles.pickerRow}>
          {FEATURES.map((f, i) => (
            <button key={f.id} onClick={() => setSel(i)}
              style={{ ...styles.chip, ...(i === sel ? styles.chipOn : {}), ...(i === sel ? { borderColor: f.tint, color: C.text } : {}) }}>
              {tr(f.name, lang)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CelestialSphere;
