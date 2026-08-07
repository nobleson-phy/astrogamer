/* ============================================================
   STATION 2 — THE SEASONS
   Seasons come from Earth's 23.5° axial tilt, NOT its distance from
   the Sun (Earth is actually closest to the Sun in January). Around
   June 21 the Sun is overhead at noon on the Tropic of Cancer: the
   tilt makes the northern rays strike more directly and the day
   longer, so it is warmer. A tilt slider (5°–23.5°) shows how the
   strength of the seasons depends on the tilt.
   Grounded in Ch.4 §4.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The seasons",
    kind: "Why summer is warm — it is the tilt, not the distance",
    lede: "Watch Earth circle the Sun with its axis fixed in space. In June the northern half leans into the Sun; six months later it leans away. Distance barely changes — the seasons are all about the tilt.",
    thread: "THE STORY CONTINUES",
    threadText: "Now that we can address any point on the tilted Earth, watch what that tilt does over a year. As our planet orbits, first one hemisphere and then the other leans toward the Sun — and that lean, not our distance, is what brings summer and winter.",
    key: "THE COMMON MISTAKE",
    keyText: "It is tempting to think summer comes when Earth is nearer the Sun. But Earth is actually closest to the Sun in January, in the depth of northern winter, and its distance changes by only about 3%. The seasons come from the 23.5° tilt of Earth's axis.",
    tiltLabel: "Axial tilt", tiltSet: "Drag the tilt (5° → 23.5°):",
    seasonStrength: "Season strength",
    mild: "mild", strong: "strong",
    june: "June — N leans in", dec: "December — N leans away",
    directTitle: "Directness of the rays",
    directNote: "Summer light strikes more head-on, concentrating heat on a small patch. Winter light hits at a slant, spreading the same energy over a wider area — and warming less.",
    summer: "Summer (direct)", winter: "Winter (slanted)",
    factTitle: "June 21 · summer solstice",
    factText: "On this day the noon Sun stands directly overhead on the Tropic of Cancer (23.5° N). Northern days are longest and the rays most direct, so it is warmest — even though Earth is slightly farther from the Sun than in January.",
    play: "▶ Play", pause: "❚❚ Pause",
    dist: "Distance change over a year: only ~3%",
  },
  ja: {
    title: "四季",
    kind: "夏が暖かい理由——距離ではなく傾き",
    lede: "地軸を空間に固定したまま、地球が太陽をめぐる様子を見よう。6月には北半球が太陽の方へ傾き、半年後には逆に傾きます。距離はほとんど変わりません——四季はすべて「傾き」によるのです。",
    thread: "物語はつづく",
    threadText: "傾いた地球上のどの点にも「住所」を付けられるようになった今、その傾きが一年でどんな働きをするか見てみよう。地球が公転するにつれ、まず一方の半球が、次にもう一方の半球が太陽の方へ傾きます——夏と冬をもたらすのは距離ではなく、この傾きなのです。",
    key: "よくある誤解",
    keyText: "夏は地球が太陽に近づくから来る、と考えたくなります。しかし地球が太陽に最も近づくのは実は1月、北半球が真冬のときであり、その距離の変化はわずか約3%にすぎません。四季は地軸の23.5度の傾きから生まれます。",
    tiltLabel: "地軸の傾き", tiltSet: "傾きを動かそう（5° → 23.5°）：",
    seasonStrength: "季節の強さ",
    mild: "穏やか", strong: "強い",
    june: "6月 — 北が傾き込む", dec: "12月 — 北が傾き離れる",
    directTitle: "光の当たり方（直接度）",
    directNote: "夏の光はより正面から当たり、狭い範囲に熱が集まります。冬の光は斜めに当たり、同じエネルギーが広い範囲に広がって——暖まりにくくなります。",
    summer: "夏（直接）", winter: "冬（斜め）",
    factTitle: "6月21日・夏至",
    factText: "この日、正午の太陽は北回帰線（北緯23.5度）の真上に来ます。北半球の昼が最も長く、光が最も直接的に当たるため、最も暖かくなります——地球が1月より太陽から少し遠いにもかかわらず。",
    play: "▶ 再生", pause: "❚❚ 一時停止",
    dist: "一年での距離変化：わずか約3%",
  },
};

function draw(ctx, cw, H, ang, tiltDeg) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2;
  const a = Math.min(cw * 0.36, 220), b = Math.min(H * 0.32, 120);

  // orbit ellipse (nearly circular)
  ctx.strokeStyle = "rgba(150,175,230,0.25)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.ellipse(cx, cy, a, b, 0, 0, Math.PI * 2); ctx.stroke();

  // Sun
  const g = ctx.createRadialGradient(cx, cy, 3, cx, cy, 30);
  g.addColorStop(0, "#fff"); g.addColorStop(0.4, "#ffcf6b"); g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 30, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffcf6b"; ctx.beginPath(); ctx.arc(cx, cy, 12, 0, Math.PI * 2); ctx.fill();

  // four season markers
  ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillStyle = C.faint;
  const labels = [["Jun", -1, 0], ["Sep", 0, 1], ["Dec", 1, 0], ["Mar", 0, -1]];
  labels.forEach(([lab, sx, sy]) => {
    const lx = cx + a * (sx === -1 ? -1 : sx === 1 ? 1 : 0) * 0.0;
  });

  const tilt = (tiltDeg * Math.PI) / 180;

  // draw Earth at 4 positions faintly, and the active one bright
  const positions = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
  const posLabels = ["Jun", "Sep", "Dec", "Mar"];
  positions.forEach((p, i) => {
    const ex = cx + a * Math.cos(p), ey = cy + b * Math.sin(p);
    ctx.fillStyle = "rgba(120,150,210,0.18)";
    ctx.beginPath(); ctx.arc(ex, ey, 9, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.faint;
    ctx.fillText(posLabels[i], ex, ey - 14);
  });

  // active Earth
  const ex = cx + a * Math.cos(ang), ey = cy + b * Math.sin(ang);
  const Re = 20;
  // day/night: lit side faces Sun
  const toSun = Math.atan2(cy - ey, cx - ex);
  ctx.save();
  ctx.translate(ex, ey);
  // night hemisphere
  ctx.fillStyle = "#12203a";
  ctx.beginPath(); ctx.arc(0, 0, Re, 0, Math.PI * 2); ctx.fill();
  // lit hemisphere (half circle facing sun)
  ctx.fillStyle = "#4a8fd4";
  ctx.beginPath(); ctx.arc(0, 0, Re, toSun - Math.PI / 2, toSun + Math.PI / 2); ctx.fill();
  // axis (tilted, fixed direction in space — tilt toward +x screen up)
  ctx.strokeStyle = C.sun; ctx.lineWidth = 2.5;
  const axDx = Math.sin(tilt) * (Re + 12), axDy = -Math.cos(tilt) * (Re + 12);
  ctx.beginPath(); ctx.moveTo(-axDx, -axDy); ctx.lineTo(axDx, axDy); ctx.stroke();
  // north pole cap
  ctx.fillStyle = "#fff";
  ctx.beginPath(); ctx.arc(axDx, axDy, 3, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  ctx.strokeStyle = C.borderBright; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(ex, ey, Re, 0, Math.PI * 2); ctx.stroke();
}

export function Seasons() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 320;
  const orbitRef = useRef(null);
  const rayRef = useRef(null);
  const [playing, setPlaying] = useState(!reduceMotion);
  const [tilt, setTilt] = useState(23.5);
  const angRef = useRef(0);
  const cw = Math.min(w, 760);

  // season strength ∝ tilt
  const strength = Math.round((tilt / 23.5) * 100);

  useEffect(() => {
    const c = orbitRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, 0, tilt); return; }
    let raf;
    const loop = () => {
      if (playing) angRef.current += 0.006;
      draw(ctx, cw, H, angRef.current, tilt);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, playing, tilt]);

  // ray-directness diagram reacts to tilt
  useEffect(() => {
    const c = rayRef.current;
    if (!c) return;
    const rw = Math.min(cw, 460), rh = 150;
    const ctx = setupCanvas(c, rw, rh);
    ctx.clearRect(0, 0, rw, rh);
    // ground
    ctx.strokeStyle = "rgba(150,175,230,0.4)"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, rh - 24); ctx.lineTo(rw, rh - 24); ctx.stroke();

    const drawBeam = (x0, angDeg, col, label) => {
      const rad = (angDeg * Math.PI) / 180;
      const width = 30;
      ctx.strokeStyle = col; ctx.lineWidth = 2;
      for (let k = -1; k <= 1; k++) {
        const off = k * width / 2;
        ctx.beginPath();
        ctx.moveTo(x0 + off, 8);
        // beam travels down at angle, hits ground
        const gx = x0 + off + Math.tan(rad) * (rh - 32);
        ctx.lineTo(gx, rh - 24);
        ctx.stroke();
      }
      // footprint on ground
      const spread = width + Math.tan(rad) * (rh - 32) * 0; // approx
      const foot = width / Math.cos(rad);
      const centreX = x0 + Math.tan(rad) * (rh - 32) * 0.5;
      ctx.fillStyle = col.replace("1)", "0.25)");
      ctx.fillRect(centreX - foot / 2, rh - 24, foot, 6);
      ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillStyle = col;
      ctx.fillText(label, x0, rh - 4);
    };
    // summer beam angle small (direct) scaled by tilt; winter large (slanted)
    const summerAng = clamp(23.5 - tilt + 5, 2, 30);   // more direct as tilt grows... keep simple
    const winterAng = clamp(20 + tilt, 20, 55);
    drawBeam(rw * 0.28, summerAng, "rgba(255,207,107,1)", STR[lang].summer);
    drawBeam(rw * 0.72, winterAng, "rgba(99,211,240,1)", STR[lang].winter);
  }, [cw, tilt, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 02</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 12 }}>
          <span style={{ fontFamily: mono, fontSize: 31, color: C.sun }}>{tilt.toFixed(1)}°</span>
          <span style={{ color: C.muted, fontSize: 15 }}>{t.tiltLabel}</span>
        </div>
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
        <canvas ref={orbitRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        <div style={{ fontFamily: mono, fontSize: 12.5, color: C.faint, marginTop: 8 }}>{t.dist}</div>

        {!reduceMotion && (
          <div style={styles.controlBar}>
            <button style={styles.iconBtn} onClick={() => setPlaying((p) => !p)}>{playing ? t.pause : t.play}</button>
          </div>
        )}

        <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginTop: 16 }}>{t.tiltSet}</div>
        <input type="range" min={5} max={23.5} step={0.5} value={tilt} onChange={(e) => setTilt(parseFloat(e.target.value))} style={styles.range} />
        <div style={styles.rangeEnds}><span>5°</span><span>23.5°</span></div>

        {/* season strength meter */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
          <span style={{ fontFamily: mono, fontSize: 13, color: C.muted, minWidth: 110 }}>{t.seasonStrength}</span>
          <div style={{ flex: 1, height: 14, background: "rgba(120,150,210,0.15)", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${strength}%`, background: `linear-gradient(90deg, ${C.cool}, ${C.sun})`, transition: "width 0.2s" }} />
          </div>
          <span style={{ fontFamily: mono, fontSize: 13, color: C.sun, minWidth: 40, textAlign: "right" }}>{strength}%</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 12, color: C.faint, marginTop: 4 }}>
          <span>{t.mild}</span><span>{t.strong}</span>
        </div>

        {/* ray-directness diagram */}
        <div style={{ marginTop: 18, border: `1px solid ${C.border}`, borderRadius: 12, background: "rgba(8,12,26,0.6)", padding: "12px 16px" }}>
          <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1.5, color: C.faint, marginBottom: 8 }}>{t.directTitle}</div>
          <canvas ref={rayRef} style={{ display: "block", maxWidth: "100%" }} />
          <p style={{ ...styles.note, marginTop: 8, maxWidth: "none" }}>{t.directNote}</p>
        </div>

        <div style={{ ...styles.fateBox, marginTop: 16, background: "rgba(255,207,107,0.06)", borderColor: "rgba(255,207,107,0.28)" }}>
          <div style={{ ...styles.fateLabel, color: C.sun }}>{t.factTitle}</div>
          <p style={styles.keyTermText}>{t.factText}</p>
        </div>
      </div>
    </div>
  );
}

export default Seasons;
