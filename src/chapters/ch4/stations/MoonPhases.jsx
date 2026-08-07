/* ============================================================
   STATION 5 — PHASES & MOTIONS OF THE MOON
   The Moon's changing lit appearance is its phases; at new moon it lies
   in the Sun's direction and is invisible. It drifts ~12–13° eastward
   per day against the stars because it revolves around Earth once a
   month. It keeps the same face toward Earth via synchronous rotation
   (it rotates once per orbit) — so "dark side" is wrong; every part
   gets sunlight and "far side" is the better term.
   Grounded in Ch.4 §4.5.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const PHASES = [
  { id: "new", ang: 0, name: { en: "New", ja: "新月" } },
  { id: "fq", ang: Math.PI / 2, name: { en: "First quarter", ja: "上弦" } },
  { id: "full", ang: Math.PI, name: { en: "Full", ja: "満月" } },
  { id: "tq", ang: (3 * Math.PI) / 2, name: { en: "Third quarter", ja: "下弦" } },
];

const STR = {
  en: {
    title: "Phases & motions of the Moon",
    kind: "Why the Moon changes shape — and always shows one face",
    lede: "The Moon is always half-lit by the Sun; what changes is how much of that lit half we can see from Earth. Follow it around its orbit and watch the phase shift new → full → new. The orange marker never turns away — that is synchronous rotation.",
    thread: "THE STORY CONTINUES",
    threadText: "Sunlight and shadow shaped our seasons and our days; now they shape the Moon. As our companion circles Earth each month, the same light paints a different sliver for us to see — and the Moon quietly turns to keep one face forever toward home.",
    key: "NO 'DARK SIDE'",
    keyText: "The Moon rotates exactly once for every orbit — synchronous rotation — so it always shows Earth the same face. But the Sun rises and sets over every part of it as it turns, so calling the far side the 'dark side' is a mistake: it gets just as much sunlight as the side we see.",
    play: "▶ Play", pause: "❚❚ Pause",
    seenTitle: "As seen from Earth",
    marker: "same face marker · synchronous rotation",
    driftTitle: "12–13° eastward each day",
    driftNote: "Because the Moon orbits Earth once a month (360° in ~29.5 days), it slips about 12–13° eastward against the background stars every day — roughly its own width each hour — and rises about 50 minutes later each night.",
    newNote: "At new moon the Moon sits in the Sun's direction; its lit side faces away, so it is invisible.",
    lit: "sunlit half", near: "near side (Earth-facing)",
  },
  ja: {
    title: "月の満ち欠けと運動",
    kind: "月が形を変える理由——そして常に同じ顔を見せる理由",
    lede: "月はいつも太陽に半分照らされています。変わるのは、その明るい半分をどれだけ地球から見られるかです。軌道をたどると、月相が新月→満月→新月と移ります。オレンジの目印は決して背を向けません——これが同期自転です。",
    thread: "物語はつづく",
    threadText: "日光と影が四季と一日を形づくり、今度は月を形づくります。伴侶である月が毎月地球をめぐるにつれ、同じ光が私たちに違う一片を描き出します——そして月は静かに回りながら、いつも同じ顔を故郷へ向け続けるのです。",
    key: "「暗い側」はない",
    keyText: "月は公転1回につきちょうど1回自転します——同期自転——ので、いつも地球に同じ顔を見せます。しかし回転するにつれ、そのすべての部分で太陽が昇り沈むので、裏側を「暗い側」と呼ぶのは誤りです：私たちが見る側と同じだけ日光を受けています。",
    play: "▶ 再生", pause: "❚❚ 一時停止",
    seenTitle: "地球から見た月",
    marker: "同じ顔の目印・同期自転",
    driftTitle: "毎日およそ東へ12〜13°",
    driftNote: "月は約1か月で地球を1周する（約29.5日で360°）ため、毎日背景の星々に対して東へ約12〜13°——1時間あたりおよそ月の視直径ぶん——ずれ、毎晩約50分ずつ遅く昇ります。",
    newNote: "新月のとき、月は太陽の方向にあり、明るい側は向こうを向いているので見えません。",
    lit: "太陽に照らされた側", near: "地球を向いた側",
  },
};

/* Top-down: Sun to the left. Earth centered. Moon orbits. */
function drawSystem(ctx, cw, H, ang) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.55, cy = H / 2;
  const orbitR = Math.min(cw * 0.28, H * 0.36);

  // Sun far left, sunlight arrows to the right
  const sunX = cw * 0.08, sunY = cy;
  const g = ctx.createRadialGradient(sunX, sunY, 3, sunX, sunY, 24);
  g.addColorStop(0, "#fff"); g.addColorStop(0.4, "#ffcf6b"); g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sunX, sunY, 24, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffcf6b"; ctx.beginPath(); ctx.arc(sunX, sunY, 10, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "rgba(255,207,107,0.25)"; ctx.lineWidth = 1;
  for (let k = -2; k <= 2; k++) {
    const y = cy + k * 34;
    ctx.beginPath(); ctx.moveTo(sunX + 26, y); ctx.lineTo(cx + orbitR + 30, y); ctx.stroke();
  }

  // orbit
  ctx.strokeStyle = "rgba(150,175,230,0.25)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(cx, cy, orbitR, 0, Math.PI * 2); ctx.stroke();

  // Earth
  const eg = ctx.createRadialGradient(cx - 5, cy - 5, 3, cx, cy, 16);
  eg.addColorStop(0, "#5a92cf"); eg.addColorStop(1, "#183a63");
  ctx.fillStyle = eg; ctx.beginPath(); ctx.arc(cx, cy, 16, 0, Math.PI * 2); ctx.fill();
  // Earth's lit half (facing sun = left)
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.beginPath(); ctx.arc(cx, cy, 16, Math.PI / 2, (3 * Math.PI) / 2); ctx.fill();

  // Moon position (ang=0 => new, on the sun side i.e. left of Earth)
  const mx = cx - orbitR * Math.cos(ang);
  const my = cy + orbitR * Math.sin(ang);
  const Rm = 11;
  // dark base
  ctx.fillStyle = "#2a2f42"; ctx.beginPath(); ctx.arc(mx, my, Rm, 0, Math.PI * 2); ctx.fill();
  // lit half faces the Sun (left). Sun is to the -x direction from moon roughly.
  const toSun = Math.atan2(sunY - my, sunX - mx);
  ctx.fillStyle = "#e8ecff";
  ctx.beginPath(); ctx.arc(mx, my, Rm, toSun - Math.PI / 2, toSun + Math.PI / 2); ctx.fill();
  ctx.strokeStyle = "rgba(150,175,230,0.4)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(mx, my, Rm, 0, Math.PI * 2); ctx.stroke();

  // synchronous-rotation marker: fixed to the near side (facing Earth)
  const toEarth = Math.atan2(cy - my, cx - mx);
  const markx = mx + Rm * Math.cos(toEarth), marky = my + Rm * Math.sin(toEarth);
  ctx.fillStyle = C.sun; ctx.beginPath(); ctx.arc(markx, marky, 3.2, 0, Math.PI * 2); ctx.fill();

  // phase labels at the 4 cardinal points
  ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillStyle = C.faint;
  PHASES.forEach((p) => {
    const px = cx - orbitR * Math.cos(p.ang);
    const py = cy + orbitR * Math.sin(p.ang);
    ctx.fillText(p.id.toUpperCase(), px, py - 16);
  });

  return { toSun, mx, my };
}

/* Phase disc as seen from Earth. phase 0=new, π=full, 2π=new. */
function drawPhaseDisc(ctx, w, h, phase) {
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.4;
  const p = ((phase % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  const frac = (1 - Math.cos(p)) / 2; // 0 new .. 1 full
  const waxing = p < Math.PI;
  const gibbous = frac > 0.5;

  // dark base disc
  ctx.fillStyle = "#1a1f30";
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();

  // lit region: a bright semicircle plus a terminator half-ellipse
  ctx.fillStyle = "#f0f3ff";
  const a0 = waxing ? -Math.PI / 2 : Math.PI / 2;
  const a1 = waxing ? Math.PI / 2 : (3 * Math.PI) / 2;
  ctx.beginPath();
  ctx.arc(cx, cy, R, a0, a1, false);
  const rx = R * Math.abs(Math.cos(p));
  ctx.ellipse(cx, cy, rx, R, 0, a1, a0, gibbous ? waxing : !waxing);
  ctx.fill();

  ctx.strokeStyle = "rgba(150,175,230,0.4)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
}

export function MoonPhases() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 320;
  const sysRef = useRef(null);
  const discRef = useRef(null);
  const [playing, setPlaying] = useState(!reduceMotion);
  const angRef = useRef(0);
  const [angState, setAngState] = useState(0);
  const cw = Math.min(w, 760);

  useEffect(() => {
    const c = sysRef.current, d = discRef.current;
    if (!c || !d) return;
    const ctx = setupCanvas(c, cw, H);
    const dw = 120, dh = 120;
    const dctx = setupCanvas(d, dw, dh);
    const render = (a) => { drawSystem(ctx, cw, H, a); drawPhaseDisc(dctx, dw, dh, a); setAngState(a); };
    if (reduceMotion) { render(Math.PI); return; }
    let raf;
    const loop = () => {
      if (playing) angRef.current += 0.012;
      render(angRef.current);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, playing]);

  const jump = (a) => { angRef.current = a; setAngState(a); if (!playing) { /* redraw handled by effect deps? no */ } };

  // redraw when jumping while paused
  useEffect(() => {
    if (playing) return;
    const c = sysRef.current, d = discRef.current;
    if (!c || !d) return;
    const ctx = c.getContext("2d");
    const dctx = d.getContext("2d");
    drawSystem(ctx, cw, H, angState);
    drawPhaseDisc(dctx, 120, 120, angState);
  }, [angState, playing, cw]);

  const near = ((angState % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  const isNew = near < 0.35 || near > Math.PI * 2 - 0.35;

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 05</div>
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

        <div style={{ position: "relative" }}>
          <canvas ref={sysRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
          {/* phase disc inset */}
          <div style={{ position: "absolute", top: 10, right: 10, textAlign: "center" }}>
            <div style={{ fontFamily: mono, fontSize: 11, color: C.faint, marginBottom: 4 }}>{t.seenTitle}</div>
            <canvas ref={discRef} style={{ display: "block", borderRadius: "50%", background: "rgba(3,5,12,0.8)", border: `1px solid ${C.border}` }} />
          </div>
        </div>

        <div style={{ fontFamily: mono, fontSize: 12.5, marginTop: 8, display: "flex", gap: 16, flexWrap: "wrap" }}>
          <span style={{ color: C.sun }}>● {t.marker}</span>
        </div>

        {/* phase jump chips */}
        <div style={styles.pickerRow}>
          {PHASES.map((p) => (
            <button key={p.id} onClick={() => jump(p.ang)} style={styles.chip}>{tr(p.name, lang)}</button>
          ))}
        </div>

        {!reduceMotion && (
          <div style={styles.controlBar}>
            <button style={styles.iconBtn} onClick={() => setPlaying((p) => !p)}>{playing ? t.pause : t.play}</button>
          </div>
        )}

        {isNew && (
          <div style={{ marginTop: 12, padding: "10px 12px", borderRadius: 10, background: "rgba(120,150,210,0.08)", border: `1px solid ${C.border}`, fontSize: 14.5, color: C.muted }}>
            {t.newNote}
          </div>
        )}

        <div style={{ ...styles.fateBox, marginTop: 16 }}>
          <div style={styles.fateLabel}>{t.driftTitle}</div>
          <p style={styles.keyTermText}>{t.driftNote}</p>
        </div>
      </div>
    </div>
  );
}

export default MoonPhases;
