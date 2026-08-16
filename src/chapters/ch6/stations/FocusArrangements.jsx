/* ============================================================
   STATION 4 — FOCUS ARRANGEMENTS
   A reflecting telescope's concave PRIMARY mirror gathers light and
   sends it back up to a focus. Where the astronomer taps that focused
   beam defines the arrangement. PRIME focus: a detector sits at the
   focus high in the tube. NEWTONIAN focus: a small flat secondary
   mirror near the top diverts the light out the SIDE to an eyepiece.
   CASSEGRAIN focus: a convex secondary mirror reflects the light back
   DOWN through a HOLE in the middle of the primary to an instrument
   at a station below — the most common professional arrangement.
   Grounded in Ch.6 §6.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const LIGHT = "#a8c4ff";

const STR = {
  en: {
    title: "Focus arrangements",
    kind: "Prime · Newtonian · Cassegrain",
    lede: "The big mirror has gathered the light and sent it climbing back up the tube. But where do we stand to catch it? Switch between the three classic places a reflector brings its focus out.",
    thread: "THE STORY CONTINUES",
    threadText: "A curved mirror reflects every colour to a single focus. Now a practical problem appears: that focus forms in mid-air, high inside the tube, right where the incoming light travels. Telescope designers found three clever ways to reach it.",
    key: "CASSEGRAIN — THROUGH A HOLE IN THE PRIMARY",
    keyText: "In the Cassegrain arrangement a convex secondary mirror hangs near the top of the tube. It catches the converging beam and reflects it straight back down, through a hole bored in the centre of the primary mirror, to an instrument at a station below the telescope. It is the most common professional arrangement, because the heavy instruments can sit safely behind the mirror rather than high in the tube.",
    pick: "Choose an arrangement:",
    modes: { prime: "Prime focus", newton: "Newtonian", cass: "Cassegrain" },
    inLight: "parallel starlight in",
    primaryL: "concave primary mirror",
    focusL: "focus",
    detL: "detector",
    eyeL: "eyepiece",
    flatL: "flat secondary (45°)",
    convexL: "convex secondary",
    holeL: "hole in primary",
    instL: "instrument station",
    capL: "Where the focus comes out",
    cap: {
      prime: "Prime focus. The light climbs back up from the primary and the detector sits right at the focus, high inside the tube. Simplest of all — no secondary mirror at all — but the observer or instrument blocks part of the incoming beam.",
      newton: "Newtonian focus. A small flat mirror tilted at 45° near the top of the tube intercepts the converging beam just before it focuses and diverts it out through the side of the tube to an eyepiece. Newton's own design — popular with amateur reflectors.",
      cass: "Cassegrain focus. A convex secondary mirror reflects the beam back down through a hole in the centre of the primary to an instrument at a station below. The most common professional arrangement: heavy instruments sit safely behind the mirror.",
    },
    tagCommon: "most common professional arrangement",
  },
  ja: {
    title: "焦点の配置",
    kind: "主焦点 · ニュートン式 · カセグレン式",
    lede: "大きな鏡が光を集め、筒の中を上へと登らせました。では、それをどこで受け止めるのか。反射望遠鏡が焦点を導き出す三つの古典的な位置を切り替えてみよう。",
    thread: "物語はつづく",
    threadText: "曲面の鏡はすべての色を一つの焦点に反射します。ここで現実的な問題が現れます——その焦点は筒の奥深く、入ってくる光がちょうど通る空中に結ばれるのです。望遠鏡の設計者たちは、そこへ届く三つの巧みな方法を見つけました。",
    key: "カセグレン式——主鏡の穴を通して",
    keyText: "カセグレン式では、凸面の副鏡が筒の上部近くに吊るされます。収束してくる光束を受け止め、まっすぐ下へ反射し、主鏡の中央に開けた穴を通して、望遠鏡の下の観測ステーションにある装置へと導きます。重い装置を筒の高い位置ではなく鏡の背後に安全に置けるため、最も一般的なプロ用の配置です。",
    pick: "配置を選ぶ：",
    modes: { prime: "主焦点", newton: "ニュートン式", cass: "カセグレン式" },
    inLight: "平行な星の光が入る",
    primaryL: "凹面の主鏡",
    focusL: "焦点",
    detL: "検出器",
    eyeL: "接眼レンズ",
    flatL: "平面の副鏡（45°）",
    convexL: "凸面の副鏡",
    holeL: "主鏡の穴",
    instL: "観測ステーション",
    capL: "焦点はどこに出るか",
    cap: {
      prime: "主焦点。光は主鏡から登ってきて、検出器が筒の奥深く、焦点のまさにその位置に置かれます。副鏡がまったくない最も単純な形ですが、観測者や装置が入ってくる光束の一部を遮ります。",
      newton: "ニュートン焦点。筒の上部近くで45°に傾けた小さな平面鏡が、収束する光束を焦点の直前で受け止め、筒の側面から接眼レンズへ導き出します。ニュートン自身の設計で、アマチュアの反射望遠鏡に人気です。",
      cass: "カセグレン焦点。凸面の副鏡が光束を下へ反射し、主鏡中央の穴を通して下の観測ステーションの装置へ導きます。最も一般的なプロ用の配置で、重い装置を鏡の背後に安全に置けます。",
    },
    tagCommon: "最も一般的なプロ用の配置",
  },
};

const OFFS = [-0.82, -0.5, 0.5, 0.82]; // incoming ray positions across the aperture

function drawArrangement(ctx, cw, H, mode, lang) {
  ctx.clearRect(0, 0, cw, H);
  const t = STR[lang];
  const cx = cw / 2;
  const top = 24;
  const bottom = H - 72;                 // primary mirror vertex line
  const halfW = Math.min(cw * 0.26, 118);
  const depth = 22;
  const surfaceY = (frac) => bottom - depth * (frac * frac); // concave, opening up
  const isCass = mode === "cass";
  const holeFrac = 0.16;                  // half-width of central hole (fraction)

  // --- tube walls ---
  ctx.strokeStyle = "rgba(120,150,210,0.28)";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(cx - halfW - 12, top - 4); ctx.lineTo(cx - halfW - 12, bottom + 6);
  ctx.moveTo(cx + halfW + 12, top - 4); ctx.lineTo(cx + halfW + 12, bottom + 6);
  ctx.stroke();

  // --- primary mirror (concave arc), with a central hole for Cassegrain ---
  const drawPrimarySeg = (fa, fb) => {
    ctx.beginPath();
    let started = false;
    for (let f = fa; f <= fb + 1e-6; f += 0.04) {
      const x = cx + f * halfW, y = surfaceY(f);
      if (!started) { ctx.moveTo(x, y); started = true; } else ctx.lineTo(x, y);
    }
    ctx.stroke();
  };
  ctx.strokeStyle = C.cool; ctx.lineWidth = 3.4;
  if (isCass) { drawPrimarySeg(-1, -holeFrac); drawPrimarySeg(holeFrac, 1); }
  else drawPrimarySeg(-1, 1);
  // sheen behind the mirror
  ctx.strokeStyle = "rgba(63,221,255,0.22)"; ctx.lineWidth = 7;
  if (isCass) { drawPrimarySeg(-1, -holeFrac); drawPrimarySeg(holeFrac, 1); }
  else drawPrimarySeg(-1, 1);
  ctx.fillStyle = C.cool; ctx.font = `12px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.primaryL, cx, bottom + 24);

  // meeting point where the reflected cone would converge, per mode
  let meet, finalFocus;
  if (mode === "prime")  { meet = { x: cx, y: top + 70 };  finalFocus = meet; }
  if (mode === "newton") { meet = { x: cx, y: top + 96 };  finalFocus = { x: cx + halfW + 44, y: top + 96 }; }
  if (mode === "cass")   { meet = { x: cx, y: top + 74 };  finalFocus = { x: cx, y: bottom + 50 }; }

  // --- incoming parallel starlight, top -> primary, then reflect to meet ---
  ctx.lineWidth = 1.5;
  OFFS.forEach((f) => {
    const x = cx + f * halfW;
    const hy = surfaceY(f);
    // incoming (down)
    ctx.strokeStyle = LIGHT; ctx.globalAlpha = 0.95;
    ctx.beginPath(); ctx.moveTo(x, top); ctx.lineTo(x, hy); ctx.stroke();
    // little arrowhead pointing down
    ctx.beginPath();
    ctx.moveTo(x, top + 22); ctx.lineTo(x - 3, top + 15); ctx.lineTo(x + 3, top + 15);
    ctx.closePath(); ctx.fillStyle = LIGHT; ctx.fill();
    // reflected (up toward meet)
    ctx.strokeStyle = "rgba(255,210,61,0.85)";
    ctx.beginPath(); ctx.moveTo(x, hy); ctx.lineTo(meet.x, meet.y); ctx.stroke();
    ctx.globalAlpha = 1;
  });
  ctx.fillStyle = LIGHT; ctx.font = `11px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(t.inLight, cx - halfW - 8, top - 8);

  // --- secondary optics + redirected beam + final focus, per mode ---
  const dot = (x, y, col, r) => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); };
  const glow = (x, y, r) => {
    const g = ctx.createRadialGradient(x, y, 1, x, y, r);
    g.addColorStop(0, "#fff"); g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  };

  if (mode === "prime") {
    // detector box sits right at the prime focus
    glow(meet.x, meet.y, 12);
    ctx.fillStyle = "rgba(255,210,61,0.16)"; ctx.strokeStyle = C.sun; ctx.lineWidth = 1.8;
    ctx.beginPath(); ctx.rect(meet.x - 16, meet.y - 12, 32, 24); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.sun; ctx.font = `12px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(t.detL, meet.x, meet.y - 18);
    ctx.fillText(t.focusL, meet.x + 40, meet.y + 4);
  }

  if (mode === "newton") {
    // flat 45deg secondary at meet, diverts beam out to the right
    ctx.strokeStyle = C.violet; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(meet.x - 11, meet.y - 11); ctx.lineTo(meet.x + 11, meet.y + 11); ctx.stroke();
    ctx.fillStyle = C.violet; ctx.font = `11px ${mono}`; ctx.textAlign = "left";
    ctx.fillText(t.flatL, meet.x + 16, meet.y - 12);
    // redirected beam out the side to the eyepiece focus
    ctx.strokeStyle = "rgba(255,210,61,0.85)"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(meet.x, meet.y - 5); ctx.lineTo(finalFocus.x, finalFocus.y - 5);
    ctx.moveTo(meet.x, meet.y + 5); ctx.lineTo(finalFocus.x, finalFocus.y + 5); ctx.stroke();
    // eyepiece
    ctx.fillStyle = "rgba(63,221,255,0.16)"; ctx.strokeStyle = C.cool; ctx.lineWidth = 1.8;
    ctx.beginPath(); ctx.rect(finalFocus.x - 4, finalFocus.y - 14, 22, 28); ctx.fill(); ctx.stroke();
    glow(finalFocus.x + 7, finalFocus.y, 9);
    ctx.fillStyle = C.cool; ctx.font = `12px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(t.eyeL, finalFocus.x + 7, finalFocus.y + 28);
  }

  if (mode === "cass") {
    // convex secondary near the top, reflects beam back DOWN through the hole
    ctx.strokeStyle = C.violet; ctx.lineWidth = 3;
    ctx.beginPath();
    for (let s = -1; s <= 1.0001; s += 0.1) {
      const x = meet.x + s * 15, y = meet.y - 5 * (1 - s * s); // convex bulge upward
      if (s === -1) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.fillStyle = C.violet; ctx.font = `11px ${mono}`; ctx.textAlign = "left";
    ctx.fillText(t.convexL, meet.x + 20, meet.y - 6);
    // beam back down through the hole in the primary
    ctx.strokeStyle = "rgba(255,210,61,0.85)"; ctx.lineWidth = 2;
    ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(meet.x - 4, meet.y); ctx.lineTo(finalFocus.x - 4, finalFocus.y);
    ctx.moveTo(meet.x + 4, meet.y); ctx.lineTo(finalFocus.x + 4, finalFocus.y); ctx.stroke();
    ctx.setLineDash([]);
    // mark the hole in the primary
    ctx.strokeStyle = C.sun; ctx.lineWidth = 1.4;
    const hx = holeFrac * halfW;
    ctx.beginPath();
    ctx.moveTo(cx - hx, surfaceY(-holeFrac)); ctx.lineTo(cx - hx, surfaceY(-holeFrac) + 8);
    ctx.moveTo(cx + hx, surfaceY(holeFrac)); ctx.lineTo(cx + hx, surfaceY(holeFrac) + 8);
    ctx.stroke();
    ctx.fillStyle = C.sun; ctx.font = `11px ${mono}`; ctx.textAlign = "left";
    ctx.fillText(t.holeL, cx + hx + 6, surfaceY(holeFrac) + 6);
    // instrument station below the telescope
    glow(finalFocus.x, finalFocus.y - 4, 11);
    ctx.fillStyle = "rgba(63,221,255,0.16)"; ctx.strokeStyle = C.cool; ctx.lineWidth = 1.8;
    ctx.beginPath(); ctx.rect(finalFocus.x - 22, finalFocus.y, 44, 18); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.cool; ctx.font = `12px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(t.instL, finalFocus.x, finalFocus.y + 32);
  }
}

export function FocusArrangements() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 330;
  const canRef = useRef(null);
  const [mode, setMode] = useState("cass");
  const cw = Math.min(w, 760);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    drawArrangement(ctx, cw, H, mode, lang);
  }, [cw, mode, lang]);

  const modeCols = { prime: C.sun, newton: C.violet, cass: C.cool };

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

        <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginBottom: 4 }}>{t.pick}</div>
        <div style={{ ...styles.pickerRow, justifyContent: "flex-start" }}>
          {["prime", "newton", "cass"].map((id) => {
            const on = id === mode;
            const col = modeCols[id];
            return (
              <button key={id} onClick={() => setMode(id)}
                style={{ ...styles.chip, ...(on ? styles.chipOn : {}), ...(on ? { borderColor: col, background: col + "22", color: "#fff" } : {}) }}>
                {t.modes[id]}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        {/* caption / readout */}
        <div style={{ marginTop: 14, border: `1px solid ${C.border}`, borderRadius: 12, background: "rgba(8,12,26,0.6)", padding: "14px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ width: 14, height: 14, borderRadius: 4, background: modeCols[mode], display: "inline-block" }} />
            <span style={{ fontFamily: display, fontSize: 21, color: "#fff" }}>{t.modes[mode]}</span>
            {mode === "cass" && <span style={{ fontFamily: mono, fontSize: 12, color: C.cool }}>· {t.tagCommon}</span>}
          </div>
          <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1.2, color: C.faint, marginBottom: 6 }}>{t.capL}</div>
          <p style={{ ...styles.stageDesc, marginTop: 4, maxWidth: "none" }}>{t.cap[mode]}</p>
        </div>
      </div>
    </div>
  );
}

export default FocusArrangements;
