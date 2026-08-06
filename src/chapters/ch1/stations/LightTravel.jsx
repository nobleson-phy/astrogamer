/* ============================================================
   STATION 3 — LIGHT-TRAVEL EXPLORER
   Pick a target; a light pulse crosses the gap; on arrival the
   travel time appears at the target, and the panel explains what
   light-travel time means (grounded in Ch.1 §1.5–1.6).
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono, reduceMotion } from "../../../shared/theme.js";
import { clamp, useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel, Row } from "../../../shared/ui.jsx";

const TARGETS = [
  {
    id: "moon", name: { en: "The Moon", ja: "月" }, color: "#d7dce6",
    dist: { en: "≈ 384,000 km", ja: "約 38万4000 km" },
    time: { en: "≈ 1.3 seconds", ja: "約 1.3秒" },
    ago: { en: "1.3 seconds ago", ja: "1.3秒前" },
    ctx: { en: "Radio takes 1.3 s each way, so Apollo crews and Mission Control lived with a ~3-second round-trip delay in every exchange.", ja: "電波は片道1.3秒。アポロの乗組員と管制官は、やり取りのたびに往復約3秒の遅れとともに会話していました。" },
    anim: 1.4,
  },
  {
    id: "sun", name: { en: "The Sun", ja: "太陽" }, color: "#ffcf6b",
    dist: { en: "≈ 150,000,000 km", ja: "約 1億5000万 km" },
    time: { en: "≈ 8 minutes", ja: "約 8分" },
    ago: { en: "8 minutes ago", ja: "8分前" },
    ctx: { en: "The latest news we ever get from the Sun is always about 8 minutes old.", ja: "太陽から届く「最新の知らせ」は、いつも約8分前のものです。" },
    anim: 2.0,
  },
  {
    id: "proxima", name: { en: "Proxima Centauri", ja: "プロキシマ・ケンタウリ" }, color: "#ff9a6b",
    kind: { en: "the nearest star", ja: "最も近い恒星" },
    dist: { en: "≈ 4.24 light-years", ja: "約 4.24光年" },
    time: { en: "≈ 4.24 years", ja: "約 4.24年" },
    ago: { en: "4.24 years ago", ja: "4.24年前" },
    ctx: { en: "Even our nearest stellar neighbour is 4.24 light-years away — no craft we have built could reach it in a human lifetime.", ja: "最も近い恒星でも4.24光年——人類の作った乗り物では、一生かけても到達できません。" },
    anim: 2.8,
  },
  {
    id: "galaxy", name: { en: "The Andromeda Galaxy", ja: "アンドロメダ銀河" }, color: "#b58cf0",
    kind: { en: "the nearest large galaxy", ja: "最も近い大きな銀河" },
    dist: { en: "≈ 2.5 million light-years", ja: "約 250万光年" },
    time: { en: "≈ 2.5 million years", ja: "約 250万年" },
    ago: { en: "2.5 million years ago", ja: "250万年前" },
    ctx: { en: "This light set out about 2.5 million years ago, before our species existed — we see Andromeda as it was then, not as it is now.", ja: "この光が発ったのは約250万年前、人類が現れる前のこと——私たちが見るのは「今」ではなく「当時」のアンドロメダです。" },
    anim: 4.2,
  },
];

const STR = {
  en: {
    title: "Telescopes are time machines",
    kind: "Light takes time to arrive",
    messenger: "Light is almost our only messenger from the cosmos — so its finite speed limits how current our news of the universe can ever be.",
    pick: "Pick a destination:",
    launch: "▶ Send a light pulse",
    replay: "↺ Send again",
    inflight: "Light in flight…",
    arrived: "Arrived",
    distance: "Distance", travelTime: "Light-travel time",
    define: "A light-year is a distance — how far light travels in one year, about 9.46 trillion km.",
    seeing: (a) => `You see it as it was ${a}.`,
    finite: "Because light's speed is finite, a star 500 light-years away that explodes tonight carries 500-year-old news — we won't see it for another 500 years.",
    deepTime: "DEEP TIME",
    benefit: "That delay is a gift: look billions of light-years out and you are seeing billions of years into the past — which is how astronomers reconstruct the history of the cosmos.",
    historical: "So a bigger telescope, gathering fainter and more distant light, is a deeper look into the past — astronomy is a historical science.",
  },
  ja: {
    title: "望遠鏡はタイムマシン",
    kind: "光が届くには時間がかかる",
    messenger: "光は、宇宙からのほぼ唯一の使者です——だからその有限の速さが、私たちの得る宇宙の知らせの「新しさ」を制限します。",
    pick: "行き先を選ぼう：",
    launch: "▶ 光のパルスを送る",
    replay: "↺ もう一度送る",
    inflight: "光が飛行中…",
    arrived: "到達",
    distance: "距離", travelTime: "光の到達時間",
    define: "光年は距離の単位です——光が1年間に進む距離で、約9兆4600億km。",
    seeing: (a) => `いま見えているのは、${a}の姿です。`,
    finite: "光の速さは有限なので、500光年かなたの星が今夜爆発しても、その光は「500年前の知らせ」を運んでいる最中——見えるのは500年後です。",
    deepTime: "深宇宙は過去",
    benefit: "この遅れは恵みでもあります——数十億光年の彼方を見れば、数十億年の過去が見える。こうして天文学者は宇宙の歴史を組み立てます。",
    historical: "だから、より暗く遠い光を集める大きな望遠鏡ほど、より深い過去をのぞくことになります——天文学は歴史的な科学です。",
  },
};

/* greedy word-wrap into up to a few lines that fit maxW */
function wrapLabel(ctx, text, maxW) {
  const words = text.split(" ");
  if (words.length < 2) return [text];
  const lines = [];
  let cur = words[0];
  for (let i = 1; i < words.length; i++) {
    const test = cur + " " + words[i];
    if (ctx.measureText(test).width > maxW) { lines.push(cur); cur = words[i]; }
    else cur = test;
  }
  lines.push(cur);
  return lines;
}

export function LightTravel() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 300;
  const canvasRef = useRef(null);
  const [sel, setSel] = useState(0);
  const [phase, setPhase] = useState("idle");
  const cw = Math.min(w, 760);
  const target = TARGETS[sel];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, cw, H);
    const y = H / 2;
    const x0 = 46, x1 = cw - 46;

    const drawScene = (pulseX, arrived) => {
      ctx.clearRect(0, 0, cw, H);
      // path line
      ctx.strokeStyle = "rgba(120,150,210,0.25)"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();

      // Earth (source)
      ctx.fillStyle = "#4a8fd4";
      ctx.beginPath(); ctx.arc(x0, y, 14, 0, Math.PI * 2); ctx.fill();
      ctx.font = `13px ${mono}`; ctx.textAlign = "center"; ctx.fillStyle = C.faint;
      const earthLabel = lang === "ja" ? "地球" : "Earth";
      ctx.fillText(earthLabel, clamp(x0, ctx.measureText(earthLabel).width / 2 + 4, cw), y + 34);

      // target
      const gr = ctx.createRadialGradient(x1, y, 2, x1, y, 26);
      gr.addColorStop(0, target.color); gr.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(x1, y, 26, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = target.color; ctx.beginPath(); ctx.arc(x1, y, 12, 0, Math.PI * 2); ctx.fill();

      // target label — wrapped to fit, clamped so it never clips the edge
      ctx.font = `13px ${mono}`; ctx.fillStyle = C.faint;
      const lines = wrapLabel(ctx, tr(target.name, lang), 150);
      const halfMax = Math.max(...lines.map((l) => ctx.measureText(l).width)) / 2;
      const lx = clamp(x1, halfMax + 6, cw - halfMax - 6);
      lines.forEach((ln, li) => ctx.fillText(ln, lx, y + 34 + li * 16));

      // pulse
      if (pulseX !== null) {
        const g = ctx.createRadialGradient(pulseX, y, 0, pulseX, y, 16);
        g.addColorStop(0, "#ffffff"); g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(pulseX, y, 16, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(pulseX, y, 4, 0, Math.PI * 2); ctx.fill();
      }

      // on arrival — flash a ring and show the travel time at the target
      if (arrived) {
        ctx.strokeStyle = target.color; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(x1, y, 22, 0, Math.PI * 2); ctx.stroke();
        ctx.font = `700 16px ${mono}`;
        const tt = tr(target.time, lang);
        const half = ctx.measureText(tt).width / 2;
        const tx = clamp(x1, half + 6, cw - half - 6);
        ctx.fillStyle = target.color;
        ctx.fillText(tt, tx, y - 30);
      }
    };

    if (phase === "playing") {
      if (reduceMotion) { drawScene(x1, true); setPhase("done"); return; }
      let raf, start = performance.now();
      const dur = target.anim * 1000;
      const loop = () => {
        const p = clamp((performance.now() - start) / dur, 0, 1);
        drawScene(x0 + (x1 - x0) * p, false);
        if (p >= 1) { setPhase("done"); return; }
        raf = requestAnimationFrame(loop);
      };
      loop();
      return () => cancelAnimationFrame(raf);
    }
    // idle or done
    drawScene(phase === "done" ? x1 : null, phase === "done");
  }, [cw, sel, phase, lang]);

  const launch = () => setPhase("playing");

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 03</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 10 }}>{t.messenger}</p>
        <dl style={styles.dl}>
          <Row k={t.distance} v={tr(target.dist, lang)} />
          <Row k={t.travelTime} v={<span style={{ color: C.sun }}>{tr(target.time, lang)}</span>} />
        </dl>
        <div style={styles.pathBox}>
          <p style={styles.pathText}>{t.seeing(tr(target.ago, lang))}</p>
        </div>
        {target.ctx && <p style={{ ...styles.note, marginTop: 12 }}>{tr(target.ctx, lang)}</p>}
        <div style={styles.fateBox}>
          <p style={styles.factText}>{t.finite}</p>
        </div>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.deepTime}</div>
          <p style={{ ...styles.factText, margin: "0 0 10px" }}>{t.benefit}</p>
          <p style={{ ...styles.factText, margin: 0 }}>{t.historical}</p>
        </div>
        <p style={{ ...styles.hint, marginTop: 12 }}>{t.define}</p>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <canvas ref={canvasRef} style={{ display: "block", maxWidth: "100%" }} />
        <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginTop: 8 }}>{t.pick}</div>
        <div style={styles.pickerRow}>
          {TARGETS.map((tg, i) => (
            <button
              key={tg.id}
              onClick={() => { setSel(i); setPhase("idle"); }}
              style={{ ...styles.chip, ...(i === sel ? styles.chipOn : {}) }}
            >
              {tr(tg.name, lang)}
            </button>
          ))}
        </div>
        <div style={styles.controlBar}>
          <button style={styles.iconBtn} onClick={launch}>{phase === "done" ? t.replay : t.launch}</button>
          {phase === "playing" && <div style={styles.stagePill}>{t.inflight}</div>}
          {phase === "done" && <div style={{ ...styles.stagePill, color: target.color, borderColor: target.color }}>{t.arrived} · {tr(target.time, lang)}</div>}
        </div>
      </div>
    </div>
  );
}

export default LightTravel;
