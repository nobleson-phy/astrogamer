/* ============================================================
   REALM 1 — SOLAR SYSTEM  (standalone interactive)
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang, tr } from "../i18n.jsx";
import { C, ui, reduceMotion } from "../theme.js";
import { clamp, useMeasure, setupCanvas } from "../helpers.js";
import { styles } from "../styles.js";
import { InfoPanel, Row } from "../ui.jsx";
import { PLANETS, SUN } from "./data.js";

const STR = {
  en: {
    play: "▶ Play", pause: "❚❚ Pause", zoom: "Zoom", reset: "Reset", time: "Time",
    trueDist: "True distances", compressed: "Compressed", days: "days", yr: "yr",
    solarHint: "Scroll or pinch to zoom · drag to pan · tap a world or use the buttons above.",
    realScaleNote: "True-to-scale distances squeeze the inner planets almost onto the Sun — a real lesson in how empty the solar system is. Zoom in to find them.",
    planetPanelHint: "Read each world's fact — the quiz asks about them.",
    distanceFromSun: "Distance from Sun", diameter: "Diameter", orbitalPeriod: "Orbital period",
    dayLength: "Day length", moons: "Moons", days_u: "days", years_u: "years",
  },
  ja: {
    play: "▶ 再生", pause: "❚❚ 停止", zoom: "ズーム", reset: "リセット", time: "時間",
    trueDist: "実際の距離", compressed: "圧縮表示", days: "日", yr: "年",
    solarHint: "スクロールやピンチでズーム · ドラッグで移動 · 惑星をタップするか上のボタンで選択。",
    realScaleNote: "実際の縮尺では、内側の惑星は太陽にほぼ重なってしまいます——太陽系がいかにスカスカかがよく分かります。ズームインして探してみてください。",
    planetPanelHint: "各惑星の豆知識を読んでおこう——クイズで問われます。",
    distanceFromSun: "太陽からの距離", diameter: "直径", orbitalPeriod: "公転周期",
    dayLength: "1日の長さ", moons: "衛星", days_u: "日", years_u: "年",
  },
};

export function SolarSystem() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 470;
  const canvasRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(30);
  const [realScale, setRealScale] = useState(false);
  const [selected, setSelected] = useState(2);
  const [days, setDays] = useState(0);
  const [zoom, setZoom] = useState(1);
  const elapsed = useRef(0);
  const positions = useRef([]);
  const zoomRef = useRef(1);
  const panRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef(null);
  const cw = Math.min(w, 760);

  useEffect(() => { zoomRef.current = zoom; }, [zoom]);
  useEffect(() => {
    const id = setInterval(() => setDays(elapsed.current), 220);
    return () => clearInterval(id);
  }, []);

  const zoomAround = (nz, sx, sy) => {
    const cx = cw / 2, cy = H / 2;
    const z = zoomRef.current, pan = panRef.current;
    const wx = (sx - cx - pan.x) / z, wy = (sy - cy - pan.y) / z;
    const clamped = clamp(nz, 0.6, 9);
    panRef.current = { x: sx - cx - wx * clamped, y: sy - cy - wy * clamped };
    zoomRef.current = clamped; setZoom(clamped);
  };
  const resetView = () => { panRef.current = { x: 0, y: 0 }; zoomRef.current = 1; setZoom(1); };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onWheel = (ev) => {
      ev.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const factor = ev.deltaY < 0 ? 1.15 : 1 / 1.15;
      zoomAround(zoomRef.current * factor, ev.clientX - rect.left, ev.clientY - rect.top);
    };
    canvas.addEventListener("wheel", onWheel, { passive: false });
    return () => canvas.removeEventListener("wheel", onWheel);
  }, [cw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, cw, H);
    const cx = cw / 2, cy = H / 2;
    const maxR = Math.min(cw, H) / 2 - 26;
    const orbitR = (au) => realScale ? maxR * (au / 30.1) : maxR * Math.pow(au / 30.1, 0.45);

    let raf, last = performance.now();
    const draw = () => {
      const now = performance.now();
      const dt = (now - last) / 1000; last = now;
      if (playing && !reduceMotion) elapsed.current += dt * speed;
      const e = elapsed.current;
      const z = zoomRef.current, pan = panRef.current;
      const ox = cx + pan.x, oy = cy + pan.y;
      ctx.clearRect(0, 0, cw, H);

      ctx.lineWidth = 1;
      for (const p of PLANETS) {
        ctx.strokeStyle = selected === PLANETS.indexOf(p) ? "rgba(99,211,240,0.35)" : "rgba(120,150,210,0.14)";
        ctx.beginPath();
        ctx.arc(ox, oy, orbitR(p.au) * z, 0, Math.PI * 2);
        ctx.stroke();
      }

      const sunGlow = ctx.createRadialGradient(ox, oy, 2, ox, oy, SUN.radius * 2.4);
      sunGlow.addColorStop(0, "rgba(255,207,107,0.9)");
      sunGlow.addColorStop(0.4, "rgba(245,167,66,0.35)");
      sunGlow.addColorStop(1, "rgba(245,167,66,0)");
      ctx.fillStyle = sunGlow;
      ctx.beginPath(); ctx.arc(ox, oy, SUN.radius * 2.4, 0, Math.PI * 2); ctx.fill();
      if (selected === -1) {
        ctx.strokeStyle = C.cool; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(ox, oy, SUN.radius + 7, 0, Math.PI * 2); ctx.stroke();
      }
      ctx.fillStyle = SUN.color;
      ctx.beginPath(); ctx.arc(ox, oy, SUN.radius, 0, Math.PI * 2); ctx.fill();

      const pos = [{ x: ox, y: oy, r: SUN.radius, i: -1 }];
      PLANETS.forEach((p, i) => {
        const ang = i * 0.7 + (e / p.period) * Math.PI * 2;
        const R = orbitR(p.au) * z;
        const x = ox + Math.cos(ang) * R, y = oy + Math.sin(ang) * R;
        pos.push({ x, y, r: p.r, i });
        const sel = selected === i;
        if (sel) {
          ctx.strokeStyle = C.cool; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(x, y, p.r + 7, 0, Math.PI * 2); ctx.stroke();
        }
        if (p.ring) {
          ctx.save(); ctx.translate(x, y); ctx.rotate(-0.5);
          ctx.strokeStyle = "rgba(230,207,160,0.6)"; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.ellipse(0, 0, p.r + 6, (p.r + 6) * 0.34, 0, 0, Math.PI * 2); ctx.stroke();
          ctx.restore();
        }
        ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(x, y, p.r, 0, Math.PI * 2); ctx.fill();
        if (sel) {
          ctx.fillStyle = C.text; ctx.font = `500 14px ${ui}`; ctx.textAlign = "center";
          ctx.fillText(tr(p.name, lang), x, y - p.r - 12);
        }
      });
      positions.current = pos;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [cw, playing, speed, realScale, selected, lang]);

  const onPointerDown = (ev) => {
    dragRef.current = { px: ev.clientX, py: ev.clientY, moved: 0 };
    canvasRef.current.setPointerCapture?.(ev.pointerId);
  };
  const onPointerMove = (ev) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = ev.clientX - d.px, dy = ev.clientY - d.py;
    d.px = ev.clientX; d.py = ev.clientY; d.moved += Math.abs(dx) + Math.abs(dy);
    panRef.current = { x: panRef.current.x + dx, y: panRef.current.y + dy };
  };
  const onPointerUp = (ev) => {
    const d = dragRef.current; dragRef.current = null;
    if (!d || d.moved > 6) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = ev.clientX - rect.left, my = ev.clientY - rect.top;
    let best = null, bd = 1e9;
    positions.current.forEach((p) => {
      const hit = Math.max(p.r + 14, 18);
      const dist = Math.hypot(mx - p.x, my - p.y);
      if (dist < hit && dist < bd) { bd = dist; best = p.i; }
    });
    if (best !== null) setSelected(best);
  };

  const body = selected === -1 ? SUN : PLANETS[selected];
  const years = days / 365.25;
  const picker = [{ name: SUN.name, i: -1 }, ...PLANETS.map((p, i) => ({ name: p.name, i }))];

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <canvas ref={canvasRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}
          style={{ display: "block", cursor: "grab", touchAction: "none", maxWidth: "100%" }} />
        <div style={styles.pickerRow}>
          {picker.map((b) => (
            <button key={b.i} onClick={() => setSelected(b.i)}
              style={{ ...styles.chip, ...(selected === b.i ? styles.chipOn : {}) }}>
              {tr(b.name, lang)}
            </button>
          ))}
        </div>
        <div style={styles.controlBar}>
          <button style={styles.iconBtn} onClick={() => setPlaying((p) => !p)}>
            {playing ? t.pause : t.play}
          </button>
          <div style={styles.speedRow}>
            <span style={styles.tinyLabel}>{t.zoom}</span>
            <button style={styles.chip} onClick={() => zoomAround(zoomRef.current / 1.3, cw / 2, H / 2)}>－</button>
            <span style={{ ...styles.tinyLabel, minWidth: 30, textAlign: "center" }}>{zoom.toFixed(1)}×</span>
            <button style={styles.chip} onClick={() => zoomAround(zoomRef.current * 1.3, cw / 2, H / 2)}>＋</button>
            <button style={styles.chip} onClick={resetView}>{t.reset}</button>
          </div>
          <button style={{ ...styles.chip, ...(realScale ? styles.chipOn : {}) }} onClick={() => setRealScale((r) => !r)}>
            {realScale ? t.trueDist : t.compressed}
          </button>
        </div>
        <div style={styles.controlBar}>
          <div style={styles.speedRow}>
            <span style={styles.tinyLabel}>{t.time}</span>
            {[10, 30, 120, 600].map((s) => (
              <button key={s} onClick={() => setSpeed(s)} style={{ ...styles.chip, ...(speed === s ? styles.chipOn : {}) }}>
                {s < 60 ? `${s}d/s` : `${Math.round(s / 30)}mo/s`}
              </button>
            ))}
          </div>
          <div style={styles.readout}>
            <span>{Math.floor(days).toLocaleString()} {t.days}</span>
            <span style={{ color: C.faint }}>·</span>
            <span>{years.toFixed(2)} {t.yr}</span>
          </div>
        </div>
        <p style={styles.hint}>{t.solarHint}</p>
        {realScale && <p style={styles.note}>{t.realScaleNote}</p>}
      </div>

      <InfoPanel>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ ...styles.swatch, background: body.color }} />
          <div>
            <h3 style={styles.panelTitle}>{tr(body.name, lang)}</h3>
            <div style={styles.panelKind}>{tr(body.kind, lang)}</div>
          </div>
        </div>
        <dl style={styles.dl}>
          {selected !== -1 && <Row k={t.distanceFromSun} v={`${body.au} AU`} />}
          <Row k={t.diameter} v={`${body.diameter.toLocaleString()} km`} />
          {body.period && (
            <Row k={t.orbitalPeriod} v={body.period < 400 ? `${body.period} ${t.days_u}` : `${(body.period / 365.25).toFixed(1)} ${t.years_u}`} />
          )}
          <Row k={t.dayLength} v={tr(body.day, lang)} />
          <Row k={t.moons} v={tr(body.moons, lang)} />
        </dl>
        <p style={styles.factText}>{tr(body.fact, lang)}</p>
        <p style={styles.hint}>{t.planetPanelHint}</p>
      </InfoPanel>
    </div>
  );
}

export default SolarSystem;
