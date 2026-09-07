/* ============================================================
   STATION 8 — CENTAURS & TROJANS
   Two special small-body populations. CENTAURS (like Chiron and Pholus)
   orbit among the giant planets and show both comet-like and asteroid-
   like properties; Pholus has the reddest surface of any body in the
   solar system. TROJANS are trapped at Jupiter's L4 and L5 Lagrange
   points, 60° ahead of and behind the planet, and may be a separately
   formed, more primitive population. Grounded in Ch.13 §13.1–13.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Centaurs & Trojans",
    kind: "Wanderers and captives",
    lede: "Two odd populations live out among the giants. Switch views: the red, comet-like centaurs crossing the giant planets, and the Trojans locked 60° ahead of and behind Jupiter.",
    thread: "THE STORY ENDS HERE",
    threadText: "Between the tidy asteroid belt and the far comet clouds live the in-betweeners: icy-rocky wanderers on unstable paths, and two great swarms marching in permanent lockstep with Jupiter.",
    centaursKey: "CENTAURS — HALF COMET, HALF ASTEROID (AND VERY RED)",
    centaursText: "Centaurs, such as Chiron and Pholus, orbit among the giant planets and display properties of both comets and asteroids — part icy, part rocky, on unstable orbits. Pholus is famous for having the reddest surface of any body in the solar system, a sign of an unusual, processed surface chemistry.",
    trojansKey: "TROJANS — TRAPPED AT JUPITER'S LAGRANGE POINTS",
    trojansText: "The Trojan asteroids are trapped at Jupiter's L4 and L5 Lagrange points — gravitationally stable spots 60° ahead of and 60° behind the planet along its orbit. Because they are held apart from the main belt and may have formed separately, they are considered a distinct and potentially more primitive population.",
    centaurs: "Centaurs", trojans: "Trojans",
    chiron: "Chiron", pholus: "Pholus (reddest in the solar system)",
    jup: "Jupiter", nep: "Neptune", zone: "centaur zone — between the giant planets",
    l4: "L4 · 60° ahead", l5: "L5 · 60° behind", belt: "main belt",
    noteC: "Centaurs like Chiron and Pholus orbit among the giant planets, part comet and part asteroid; Pholus is the reddest body known in the solar system.",
    noteT: "Trojans sit at Jupiter's L4 and L5 points, 60° ahead of and behind it — a separately trapped, possibly more primitive population than the main belt.",
  },
  ja: {
    title: "ケンタウルス族とトロヤ群",
    kind: "さすらい人と囚われ人",
    lede: "巨大惑星の間に、2つの奇妙な集団が暮らしています。切り替えよう：巨大惑星を横切る赤く彗星的なケンタウルス族と、木星の60°前後に固定されたトロヤ群。",
    thread: "物語はここで終わる",
    threadText: "整った小惑星帯と遠い彗星の雲の間に、中間者たちが暮らしています：不安定な軌道の氷と岩のさすらい人と、木星と永久に歩調を合わせて行進する2つの大群です。",
    centaursKey: "ケンタウルス族——半分彗星、半分小惑星（そして真っ赤）",
    centaursText: "キロンやフォルスのようなケンタウルス族は、巨大惑星の間を公転し、彗星と小惑星の両方の性質を示します——一部は氷、一部は岩で、不安定な軌道にあります。フォルスは太陽系のどの天体よりも赤い表面を持つことで有名で、異常で加工された表面化学の兆候です。",
    trojansKey: "トロヤ群——木星のラグランジュ点に捕らわれる",
    trojansText: "トロヤ群小惑星は、木星のL4とL5のラグランジュ点——軌道に沿って惑星の60°前と60°後ろにある、重力的に安定した場所——に捕らわれています。メインベルトから離れて保たれ、別に形成された可能性があるため、独特で、より始原的かもしれない集団と考えられています。",
    centaurs: "ケンタウルス族", trojans: "トロヤ群",
    chiron: "キロン", pholus: "フォルス（太陽系で最も赤い）",
    jup: "木星", nep: "海王星", zone: "ケンタウルスの領域——巨大惑星の間",
    l4: "L4 · 60°前", l5: "L5 · 60°後", belt: "メインベルト",
    noteC: "キロンやフォルスなどのケンタウルス族は巨大惑星の間を公転し、半分彗星・半分小惑星です。フォルスは太陽系で知られる最も赤い天体です。",
    noteT: "トロヤ群は木星のL4とL5点、その60°前後にあります——メインベルトとは別に捕らわれた、より始原的かもしれない集団です。",
  },
};

function draw(ctx, cw, H, mode, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2;
  // Sun
  ctx.fillStyle = "#ffd86b"; ctx.beginPath(); ctx.arc(cx, cy, 7, 0, Math.PI * 2); ctx.fill();
  const yS = 0.5;
  if (mode === "centaurs") {
    // Clean view: Jupiter & Neptune orbits, a shaded "centaur zone" between them,
    // and just two labelled centaurs (grey Chiron, red Pholus) on clear orbits.
    const jR = Math.min(cw * 0.17, H * 0.3), nR = Math.min(cw * 0.44, H * 0.46);
    // shaded zone between the two giant-planet orbits
    ctx.beginPath();
    ctx.ellipse(cx, cy, nR, nR * yS, 0, 0, Math.PI * 2);
    ctx.ellipse(cx, cy, jR, jR * yS, 0, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(150,120,120,0.10)"; ctx.fill("evenodd");
    // planet orbits + planets
    ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.ellipse(cx, cy, jR, jR * yS, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx, cy, nR, nR * yS, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = "#e0b878"; ctx.beginPath(); ctx.arc(cx + jR, cy, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#5b8fd8"; ctx.beginPath(); ctx.arc(cx - nR, cy, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(t.jup, cx + jR, cy - jR * yS - 6);
    ctx.fillText(t.nep, cx - nR, cy - nR * yS - 6);
    // two centaur orbits inside the zone
    const rC = jR + 0.4 * (nR - jR), rP = jR + 0.72 * (nR - jR);
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = "rgba(185,180,172,0.3)"; ctx.beginPath(); ctx.ellipse(cx, cy, rC, rC * yS, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = "rgba(200,90,60,0.35)"; ctx.beginPath(); ctx.ellipse(cx, cy, rP, rP * yS, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.setLineDash([]);
    const chA = tt * 0.01, phA = tt * 0.008 + 2.2;
    const chx = cx + Math.cos(chA) * rC, chy = cy + Math.sin(chA) * rC * yS;
    const phx = cx + Math.cos(phA) * rP, phy = cy + Math.sin(phA) * rP * yS;
    ctx.fillStyle = "#9a9188"; ctx.beginPath(); ctx.arc(chx, chy, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#c0311c"; ctx.beginPath(); ctx.arc(phx, phy, 5, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "rgba(220,90,60,0.5)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(phx, phy, 8, 0, Math.PI * 2); ctx.stroke();
    // fixed legend so labels don't chase the moving dots
    const lx = 10, ly = 15; ctx.textAlign = "left";
    ctx.fillStyle = "#9a9188"; ctx.beginPath(); ctx.arc(lx + 4, ly - 3, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.text; ctx.font = `10px ${mono}`; ctx.fillText(t.chiron, lx + 14, ly);
    ctx.fillStyle = "#c0311c"; ctx.beginPath(); ctx.arc(lx + 4, ly + 13, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#e0774f"; ctx.fillText(t.pholus, lx + 14, ly + 16);
    // zone label along the bottom
    ctx.fillStyle = "rgba(205,175,165,0.75)"; ctx.font = `9px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(t.zone, cx, H - 6);
  } else {
    // Trojans at Jupiter's L4/L5
    const jR = Math.min(cw * 0.34, H * 0.42);
    // main belt (inner, for contrast)
    for (let i = 0; i < 120; i++) { const a = Math.random() * Math.PI * 2, rr = jR * (0.3 + Math.random() * 0.08); ctx.fillStyle = "rgba(160,150,130,0.4)"; const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr * yS; ctx.fillRect(x, y, 1.2, 1.2); }
    ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.belt, cx, cy - jR * 0.32 * yS - 6);
    // Jupiter's orbit
    ctx.strokeStyle = "rgba(150,175,230,0.25)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(cx, cy, jR, jR * yS, 0, 0, Math.PI * 2); ctx.stroke();
    const jA = tt * 0.006;
    const jx = cx + Math.cos(jA) * jR, jy = cy + Math.sin(jA) * jR * yS;
    ctx.fillStyle = "#e0b878"; ctx.beginPath(); ctx.arc(jx, jy, 7, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.text; ctx.font = `10px ${mono}`; ctx.fillText(t.jup, jx, jy - 12);
    // L4 (60° ahead) and L5 (60° behind) swarms
    [[+Math.PI / 3, t.l4, "#8fd0a0"], [-Math.PI / 3, t.l5, "#8fb8d0"]].forEach(([off, label, col]) => {
      const la = jA + off;
      const lx = cx + Math.cos(la) * jR, ly = cy + Math.sin(la) * jR * yS;
      for (let i = 0; i < 40; i++) {
        const s = (Math.random() - 0.5) * 0.5, rr = jR * (1 + (Math.random() - 0.5) * 0.12);
        const x = cx + Math.cos(la + s) * rr, y = cy + Math.sin(la + s) * rr * yS;
        ctx.fillStyle = col; ctx.globalAlpha = 0.7; ctx.fillRect(x, y, 1.6, 1.6);
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = col; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(label, lx, ly - 12);
    });
  }
}

export function CentaursTrojans() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("centaurs");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, mode, 40, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, mode, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, mode, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 08</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{t.threadText}</p>
        </div>
        <div style={styles.fateBox}>
          <div style={{ ...styles.fateLabel, color: C.sun }}>{mode === "centaurs" ? t.centaursKey : t.trojansKey}</div>
          <p style={styles.keyTermText}>{mode === "centaurs" ? t.centaursText : t.trojansText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          {[["centaurs", t.centaurs], ["trojans", t.trojans]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{mode === "centaurs" ? t.noteC : t.noteT}</p>
      </div>
    </div>
  );
}

export default CentaursTrojans;
