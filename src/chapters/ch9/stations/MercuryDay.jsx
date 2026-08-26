/* ============================================================
   STATION 7 — MERCURY'S STRANGE DAY
   Mercury orbits the Sun in 88 days and rotates in exactly 59 days —
   a 3:2 spin–orbit resonance (three turns for every two orbits). It
   does NOT keep one face to the Sun. Radar in the mid-1960s proved
   it: echoes off the approaching limb were blueshifted and the
   receding limb redshifted, broadening the returned signal.
   Grounded in Ch.9 §9.4.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Mercury's strange day",
    kind: "Three spins for every two years",
    lede: "Astronomers long assumed Mercury kept one face to the Sun, like the Moon to Earth. It doesn't. Watch it turn as it orbits — and see how radar caught it in the act.",
    thread: "THE STORY CONTINUES",
    threadText: "Close to the Sun and hard to see, Mercury kept its rotation secret until radar could bounce off it. The answer was stranger than a locked face: a precise 3-for-2 rhythm of spin and orbit.",
    key: "A 3:2 SPIN–ORBIT RESONANCE",
    keyText: "Mercury takes 88 days to orbit the Sun and exactly 59 days to rotate once — a ratio of 3 rotations for every 2 orbits (a 3:2 resonance). So it does NOT keep one face permanently sunward. In the mid-1960s, radar proved this: pulses bounced off the planet came back with the approaching edge blueshifted and the receding edge redshifted, broadening the echo — a spread only a rotating world can produce.",
    vSpin: "Spin & orbit", vRadar: "Radar proof",
    orbits: "orbits", rotations: "rotations", sun: "Sun", marker: "same spot",
    blue: "approaching limb → blueshift", red: "receding limb → redshift", echo: "broadened radar echo",
    note1: "Follow the coloured spot: as Mercury makes 2 trips around the Sun it turns 3 times, so a given point faces the Sun at different times — no permanently dark side.",
    note2: "Radar echoes off a rotating Mercury return spread in frequency — one limb approaching (blue), the other receding (red). A Sun-locked planet could not do this.",
  },
  ja: {
    title: "水星の奇妙な一日",
    kind: "2年ごとに3回転",
    lede: "天文学者は長らく、水星が月のように太陽に一面を向け続けると考えていました。違います。公転しながら回る様子を見て——レーダーがどうそれを捉えたかを見よう。",
    thread: "物語はつづく",
    threadText: "太陽に近く見えにくい水星は、レーダーで跳ね返せるようになるまで自転を秘密にしていました。答えは面が固定されるよりも奇妙でした：自転と公転の正確な3対2のリズムです。",
    key: "3:2の自転公転共鳴",
    keyText: "水星は88日で太陽を公転し、ちょうど59日で1回自転します——公転2回につき自転3回の比（3:2共鳴）。だから一面を永久に太陽へ向けているのでは「ありません」。1960年代半ば、レーダーがこれを証明しました：惑星で跳ね返ったパルスは、近づく縁が青方偏移、遠ざかる縁が赤方偏移して戻り、エコーが広がりました——自転する天体だけが生む広がりです。",
    vSpin: "自転と公転", vRadar: "レーダーの証拠",
    orbits: "公転", rotations: "自転", sun: "太陽", marker: "同じ点",
    blue: "近づく縁 → 青方偏移", red: "遠ざかる縁 → 赤方偏移", echo: "広がったレーダーエコー",
    note1: "色のついた点を追おう：水星が太陽を2周するあいだに3回転するので、ある点は違う時刻に太陽を向く——永久に暗い側はありません。",
    note2: "自転する水星で跳ね返るレーダーエコーは周波数が広がって戻ります——一方の縁は近づき（青）、もう一方は遠ざかる（赤）。太陽に固定された惑星ではこうはなりません。",
  },
};

function drawSpin(ctx, cw, H, tt, t, lang) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2, orbitR = Math.min(cw * 0.32, H * 0.4);
  // Sun
  const sg = ctx.createRadialGradient(cx, cy, 2, cx, cy, 22);
  sg.addColorStop(0, "#fff6d8"); sg.addColorStop(0.5, "#ffd23d"); sg.addColorStop(1, "rgba(255,158,44,0)");
  ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(cx, cy, 22, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffd23d"; ctx.beginPath(); ctx.arc(cx, cy, 10, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.sun; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.sun, cx, cy + 34);
  // orbit
  ctx.strokeStyle = "rgba(150,175,230,0.25)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, orbitR, 0, Math.PI * 2); ctx.stroke();
  // Mercury: orbit angle and spin angle (spin = 1.5 × orbit, sidereal)
  const oAng = tt * 0.012;
  const sAng = oAng * 1.5;
  const mx = cx + Math.cos(oAng) * orbitR, my = cy + Math.sin(oAng) * orbitR;
  const mr = 16;
  ctx.fillStyle = "#9a9488"; ctx.beginPath(); ctx.arc(mx, my, mr, 0, Math.PI * 2); ctx.fill();
  // marker spot fixed to the planet's body (rotates with spin)
  ctx.fillStyle = C.cool; ctx.beginPath(); ctx.arc(mx + Math.cos(sAng) * (mr - 4), my + Math.sin(sAng) * (mr - 4), 4, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "rgba(150,175,230,0.4)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(mx, my, mr, 0, Math.PI * 2); ctx.stroke();
  // counters
  const orbits = oAng / (Math.PI * 2), rots = sAng / (Math.PI * 2);
  ctx.fillStyle = C.faint; ctx.font = `12px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(`${t.orbits}: ${orbits.toFixed(2)}`, 14, 22);
  ctx.fillText(`${t.rotations}: ${rots.toFixed(2)}`, 14, 40);
  ctx.fillStyle = C.cool; ctx.fillText(`3 : 2`, 14, 60);
  ctx.textAlign = "right"; ctx.fillStyle = C.cool; ctx.fillText("● " + t.marker, cw - 14, 22);
}

function drawRadar(ctx, cw, H, tt, t, lang) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.5, cy = H / 2, R = Math.min(cw * 0.16, 60);
  // Earth at far left, Mercury disc at center
  ctx.fillStyle = "#5b8dee"; ctx.beginPath(); ctx.arc(28, cy, 12, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.faint; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText("Earth", 28, cy + 26);
  // radar pulse traveling
  const px = 40 + ((tt * 3) % (cx - 40 - R));
  ctx.strokeStyle = "rgba(63,221,255,0.6)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(px, cy, 6, -0.6, 0.6); ctx.stroke();
  // Mercury disc, rotating (arrow)
  const g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, 2, cx, cy, R);
  g.addColorStop(0, "#c9c1b0"); g.addColorStop(1, "#8a8072");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
  // rotation arrow (spin)
  ctx.strokeStyle = "rgba(255,255,255,0.5)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, R * 0.55, -1.6, 1.4); ctx.stroke();
  // approaching limb (top, toward Earth path) blueshift; receding (bottom) redshift
  ctx.fillStyle = "rgba(90,150,255,0.4)"; ctx.beginPath(); ctx.arc(cx, cy, R, Math.PI, Math.PI * 1.5); ctx.lineTo(cx, cy); ctx.closePath(); ctx.fill();
  ctx.fillStyle = "rgba(255,100,90,0.4)"; ctx.beginPath(); ctx.arc(cx, cy, R, Math.PI * 0.5, Math.PI); ctx.lineTo(cx, cy); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = "rgba(150,175,230,0.4)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = "#8fb4ff"; ctx.font = `10px ${mono}`; ctx.textAlign = "left"; ctx.fillText(t.blue, cx + R + 10, cy - 8);
  ctx.fillStyle = "#ff8f8f"; ctx.fillText(t.red, cx + R + 10, cy + 12);
  // broadened echo spectrum at bottom
  const ex = cx - 70, ey = H - 26, ew = 140;
  ctx.strokeStyle = "rgba(150,175,230,0.4)"; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex + ew, ey); ctx.stroke();
  const eg = ctx.createLinearGradient(ex, 0, ex + ew, 0);
  eg.addColorStop(0, "#5b8dff"); eg.addColorStop(0.5, "#eaeaea"); eg.addColorStop(1, "#ff6b6b");
  ctx.strokeStyle = eg; ctx.lineWidth = 2; ctx.beginPath();
  for (let i = 0; i <= 40; i++) { const x = ex + (i / 40) * ew; const u = (i / 40 - 0.5) * 4; const y = ey - 22 * Math.exp(-u * u); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
  ctx.stroke();
  ctx.fillStyle = C.faint; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.echo, cx, H - 6);
}

export function MercuryDay() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [view, setView] = useState("spin");
  const viewRef = useRef(view); viewRef.current = view;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { view === "spin" ? drawSpin(ctx, cw, H, 40, t, lang) : drawRadar(ctx, cw, H, 0, t, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; viewRef.current === "spin" ? drawSpin(ctx, cw, H, tt, t, lang) : drawRadar(ctx, cw, H, tt, t, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, view, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 07</div>
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
          {[["spin", t.vSpin], ["radar", t.vRadar]].map(([id, label]) => (
            <button key={id} onClick={() => setView(id)}
              style={{ ...styles.chip, ...(view === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{view === "spin" ? t.note1 : t.note2}</p>
      </div>
    </div>
  );
}

export default MercuryDay;
