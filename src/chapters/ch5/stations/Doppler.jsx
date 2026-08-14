/* ============================================================
   STATION 8 — THE DOPPLER EFFECT
   Only motion along the line of sight — radial velocity — shifts a
   star's light. A source moving TOWARD the observer has its waves
   crowded to shorter wavelengths (blueshift); moving AWAY, its waves
   are stretched to longer wavelengths (redshift). Astronomers measure
   radial velocity by comparing the wavelength of a star's absorption
   lines with the same lines from a stationary laboratory source.
   Grounded in Ch.5 §5.7.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The Doppler effect",
    kind: "Motion writes a shift into the starlight",
    lede: "Slide the star toward you or away and watch its ripples crowd or stretch. Down below, its dark absorption line slips off the lab reference — bluer as it approaches, redder as it recedes. That slip is how we clock a star's speed along our line of sight.",
    thread: "THE STORY CONCLUDES",
    threadText: "The atom gave us fixed lines we can trust. Now motion bends them. As a star races toward or away from us, every one of its lines slides in step — and by measuring that slide we learn not just what a star is, but how fast it is coming or going.",
    key: "MEASURING RADIAL VELOCITY",
    keyText: "Only motion along the line of sight — radial velocity — produces a Doppler shift. Approaching light is crowded to shorter wavelengths (blueshift); receding light is stretched to longer ones (redshift). Astronomers read the speed by comparing a star's absorption lines to the identical lines from a laboratory source at rest: the size of the wavelength shift gives the radial velocity, and its direction tells us toward or away.",
    velSet: "Radial velocity — drag toward ↔ away:",
    toward: "toward", away: "away", atRest: "at rest",
    lab: "Lab reference (at rest)", observed: "Observed (moving star)",
    blue: "BLUESHIFT", red: "REDSHIFT", none: "NO SHIFT",
    movingToward: "moving toward us", movingAway: "moving away from us", still: "at rest",
    speedL: "Radial speed", observer: "observer",
    blueEnd: "blue (shorter λ)", redEnd: "red (longer λ)",
  },
  ja: {
    title: "ドップラー効果",
    kind: "運動が星の光にずれを書き込む",
    lede: "星をあなたの方へ、あるいは遠くへ動かして、さざ波が詰まったり伸びたりする様子を見よう。下では、暗い吸収線が実験室の基準からずれます——近づけば青く、遠ざかれば赤く。このずれこそ、視線方向の星の速さを測る手がかりです。",
    thread: "物語の結び",
    threadText: "原子は、信頼できる固定した線を与えてくれました。今度は運動がそれを曲げます。星が私たちへ、あるいは遠くへ疾走するにつれ、その線はすべて足並みをそろえてずれます——そのずれを測ることで、星が何であるかだけでなく、どれほどの速さで近づき、遠ざかっているかがわかるのです。",
    key: "視線速度を測る",
    keyText: "視線方向の運動——視線速度——だけがドップラーシフトを生みます。近づく光は短い波長へ詰められ（青方偏移）、遠ざかる光は長い波長へ伸ばされます（赤方偏移）。天文学者は、静止した実験室光源の同じ線と星の吸収線を比べて速さを読み取ります。波長のずれの大きさが視線速度を、その向きが近づくか遠ざかるかを教えてくれます。",
    velSet: "視線速度——近づく ↔ 遠ざかる：",
    toward: "近づく", away: "遠ざかる", atRest: "静止",
    lab: "実験室基準（静止）", observed: "観測（動く星）",
    blue: "青方偏移", red: "赤方偏移", none: "ずれなし",
    movingToward: "こちらへ近づいている", movingAway: "遠ざかっている", still: "静止",
    speedL: "視線速度", observer: "観測者",
    blueEnd: "青（短い λ）", redEnd: "赤（長い λ）",
  },
};

/* spectrum colour with BLUE on the left (short λ) → RED on the right */
function bandColour(f) { // f: 0 (blue) .. 1 (red)
  const nm = 400 + f * 300; // 400..700
  let r = 0, g = 0, b = 0;
  if (nm < 440) { r = -(nm - 440) / (440 - 380); b = 1; }
  else if (nm < 490) { g = (nm - 440) / (490 - 440); b = 1; }
  else if (nm < 510) { g = 1; b = -(nm - 510) / (510 - 490); }
  else if (nm < 580) { r = (nm - 510) / (580 - 510); g = 1; }
  else if (nm < 645) { r = 1; g = -(nm - 645) / (645 - 580); }
  else { r = 1; }
  return `rgb(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)})`;
}

const WAVE_SPEED = 2.1;

function drawWaves(ctx, cw, H, rv, fronts, starX) {
  ctx.clearRect(0, 0, cw, H);
  const cy = H / 2;

  // observer eye at right
  const obsX = cw - 26;
  ctx.strokeStyle = "rgba(150,175,230,0.6)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.ellipse(obsX, cy, 12, 8, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = C.cool; ctx.beginPath(); ctx.arc(obsX, cy, 4, 0, Math.PI * 2); ctx.fill();

  // wavefronts
  fronts.forEach((f) => {
    const a = clamp(1 - f.r / (cw * 0.9), 0, 1);
    ctx.strokeStyle = `rgba(120,180,255,${0.12 + a * 0.5})`;
    ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.arc(f.cx, cy, f.r, 0, Math.PI * 2); ctx.stroke();
  });

  // star (tinted toward blue if approaching, red if receding)
  const tint = rv < -3 ? "#9fc0ff" : rv > 3 ? "#ff9a7a" : "#ffe6a8";
  const g = ctx.createRadialGradient(starX, cy, 1, starX, cy, 14);
  g.addColorStop(0, "#fff"); g.addColorStop(0.4, tint); g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(starX, cy, 14, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = tint; ctx.beginPath(); ctx.arc(starX, cy, 6, 0, Math.PI * 2); ctx.fill();

  // motion arrow
  if (Math.abs(rv) > 3) {
    const dir = rv < 0 ? 1 : -1; // toward observer (right) when rv<0
    ctx.strokeStyle = "rgba(230,238,255,0.7)"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(starX, cy - 24); ctx.lineTo(starX + dir * 26, cy - 24); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(starX + dir * 26, cy - 24);
    ctx.lineTo(starX + dir * 18, cy - 28);
    ctx.moveTo(starX + dir * 26, cy - 24);
    ctx.lineTo(starX + dir * 18, cy - 20);
    ctx.stroke();
  }
}

function drawSpectra(ctx, w, h, rv, t, lang) {
  ctx.clearRect(0, 0, w, h);
  const pad = 2;
  const stripH = 34, gap = 26;
  const labY = 4, obsY = labY + stripH + gap;
  const labX = w * 0.5;
  const shift = rv * (w * 0.0032); // blueshift(left) when rv<0
  const obsX = clamp(labX + shift, pad + 8, w - pad - 8);

  const drawBand = (y, lineX, lineLabel, labelColour) => {
    for (let x = pad; x < w - pad; x++) {
      ctx.fillStyle = bandColour((x - pad) / (w - 2 * pad));
      ctx.fillRect(x, y, 1, stripH);
    }
    ctx.fillStyle = "rgba(6,7,14,0.94)"; ctx.fillRect(lineX - 2, y, 4, stripH);
    ctx.strokeStyle = "rgba(150,175,230,0.35)"; ctx.lineWidth = 1;
    ctx.strokeRect(pad + 0.5, y + 0.5, w - 2 * pad - 1, stripH - 1);
    ctx.fillStyle = labelColour; ctx.font = `11px ${mono}`; ctx.textAlign = "left";
    ctx.fillText(lineLabel, pad + 2, y - 4);
  };

  drawBand(labY, labX, t.lab, C.muted);
  drawBand(obsY, obsX, t.observed, rv < -3 ? C.cool : rv > 3 ? C.danger : C.muted);

  // reference alignment line + shift arrow between the two lines
  ctx.strokeStyle = "rgba(230,238,255,0.35)"; ctx.setLineDash([4, 4]); ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(labX, labY); ctx.lineTo(labX, obsY + stripH); ctx.stroke();
  ctx.setLineDash([]);
  if (Math.abs(obsX - labX) > 2) {
    const ay = obsY - gap / 2;
    ctx.strokeStyle = rv < 0 ? C.cool : C.danger; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(labX, ay); ctx.lineTo(obsX, ay); ctx.stroke();
    const dir = obsX > labX ? -1 : 1;
    ctx.beginPath();
    ctx.moveTo(obsX, ay); ctx.lineTo(obsX + dir * 7, ay - 4);
    ctx.moveTo(obsX, ay); ctx.lineTo(obsX + dir * 7, ay + 4);
    ctx.stroke();
  }

  // end labels
  ctx.font = `10px ${mono}`; ctx.fillStyle = C.faint;
  ctx.textAlign = "left"; ctx.fillText(t.blueEnd, pad + 2, obsY + stripH + 14);
  ctx.textAlign = "right"; ctx.fillText(t.redEnd, w - pad - 2, obsY + stripH + 14);
}

export function Doppler() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 220;
  const waveRef = useRef(null);
  const specRef = useRef(null);
  const [rv, setRv] = useState(0);
  const rvRef = useRef(0);
  const cw = Math.min(w, 760);

  useEffect(() => { rvRef.current = rv; }, [rv]);

  // animated wavefronts
  useEffect(() => {
    const c = waveRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    const state = { fronts: [], starX: cw * 0.45, frame: 0 };
    const xMin = cw * 0.16, xMax = cw * 0.82;

    if (reduceMotion) {
      // a static schematic: a few fronts crowded toward the observer if moving
      const sx = cw * 0.45;
      const fr = [];
      for (let i = 1; i <= 5; i++) {
        const bunch = rvRef.current < 0 ? 1 : rvRef.current > 0 ? -1 : 0;
        fr.push({ cx: sx - bunch * i * 6, r: i * (cw * 0.09) });
      }
      drawWaves(ctx, cw, H, rvRef.current, fr, sx);
      return;
    }

    let raf;
    const loop = () => {
      state.frame++;
      const rvNow = rvRef.current;
      const vpix = -rvNow * 0.02; // rv<0 (toward) => star moves right toward observer
      state.starX += vpix;
      // emit a new front periodically
      if (state.frame % 26 === 0) state.fronts.push({ cx: state.starX, r: 0 });
      state.fronts.forEach((f) => { f.r += WAVE_SPEED; });
      state.fronts = state.fronts.filter((f) => f.r < cw * 0.95);
      // recycle when the star drifts off the working area
      if (state.starX > xMax || state.starX < xMin) {
        state.starX = cw * 0.45; state.fronts = [];
      }
      drawWaves(ctx, cw, H, rvNow, state.fronts, state.starX);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw]);

  // spectra redraw on velocity / lang change
  useEffect(() => {
    const c = specRef.current;
    if (!c) return;
    const sw = Math.min(cw, 760), sh = 132;
    const ctx = setupCanvas(c, sw, sh);
    drawSpectra(ctx, sw, sh, rv, t, lang);
  }, [cw, rv, lang]);

  const shiftLabel = rv < -3 ? t.blue : rv > 3 ? t.red : t.none;
  const shiftColour = rv < -3 ? C.cool : rv > 3 ? C.danger : C.muted;
  const motionLabel = rv < -3 ? t.movingToward : rv > 3 ? t.movingAway : t.still;
  const speed = Math.abs(Math.round(rv * 3)); // illustrative km/s

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 08</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 12 }}>
          <span style={{ fontFamily: mono, fontSize: 26, color: shiftColour }}>{shiftLabel}</span>
        </div>
        <div style={{ fontFamily: mono, fontSize: 14, color: C.muted, marginTop: 2 }}>{motionLabel}</div>
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

        <canvas ref={waveRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, marginTop: 4, textAlign: "right" }}>← {t.observer}</div>

        <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginTop: 12, marginBottom: 2 }}>{t.velSet}</div>
        <input type="range" min={-100} max={100} step={1} value={rv}
          onChange={(e) => setRv(parseInt(e.target.value))} style={styles.range} />
        <div style={styles.rangeEnds}><span>← {t.toward}</span><span>{t.atRest}</span><span>{t.away} →</span></div>

        <div style={{ marginTop: 14 }}>
          <canvas ref={specRef} style={{ display: "block", maxWidth: "100%", borderRadius: 8, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <div style={{ display: "flex", gap: 22, flexWrap: "wrap", marginTop: 14, alignItems: "baseline" }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, letterSpacing: 1 }}>{t.speedL}</div>
            <div style={{ fontFamily: mono, fontSize: 22, color: shiftColour }}>{speed}<span style={{ fontSize: 13, color: C.muted }}> km/s</span></div>
          </div>
          <div>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, letterSpacing: 1 }}>{t.observed}</div>
            <div style={{ fontFamily: mono, fontSize: 16, color: shiftColour }}>{shiftLabel} · {motionLabel}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Doppler;
