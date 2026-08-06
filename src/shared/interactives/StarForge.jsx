/* ============================================================
   REALM 2 — STAR FORGE  (standalone interactive)
   ============================================================ */
import React, { useState, useRef, useEffect, useMemo } from "react";
import { useLang, tr } from "../i18n.jsx";
import { C, mono, reduceMotion } from "../theme.js";
import { clamp, lerp, lerpColor, useMeasure, setupCanvas } from "../helpers.js";
import { styles } from "../styles.js";
import { InfoPanel, Row } from "../ui.jsx";

const STR = {
  en: {
    birthMass: "Birth mass", timesSun: "× the Sun", runLife: "▶ Run its life", resetLife: "↺ Reset",
    stage: "Stage",
    setMassNote: "Drag the dial to set the star's birth mass, then run its life. Mass is destiny — it decides everything from here.",
    spectralClass: "Spectral class", surfaceTemp: "Surface temperature", msLife: "Main-sequence life",
    hotterBlue: "Hotter = blue", coolerRed: "Cooler = red",
    lifeStartFinish: "ITS LIFE, START TO FINISH", finalFate: "FINAL FATE",
  },
  ja: {
    birthMass: "誕生時の質量", timesSun: "× 太陽質量", runLife: "▶ 一生を再生", resetLife: "↺ リセット",
    stage: "段階",
    setMassNote: "ダイヤルで星の誕生時の質量を決め、一生を再生してみよう。質量こそが運命——ここから先のすべてを決めます。",
    spectralClass: "スペクトル型", surfaceTemp: "表面温度", msLife: "主系列での寿命",
    hotterBlue: "高温 = 青", coolerRed: "低温 = 赤",
    lifeStartFinish: "誕生から最期まで", finalFate: "最期の姿",
  },
};

export function deriveStar(mass) {
  let cls, color;
  if (mass < 0.08) { cls = { en: "Brown dwarf (not a true star)", ja: "褐色矮星（恒星になれなかった星）" }; color = "#8a4b3a"; }
  else if (mass < 0.45) { cls = { en: "M · Red dwarf", ja: "M型・赤色矮星" }; color = "#ff6f43"; }
  else if (mass < 0.8) { cls = { en: "K · Orange dwarf", ja: "K型・橙色矮星" }; color = "#ffab5e"; }
  else if (mass < 1.05) { cls = { en: "G · Yellow dwarf (Sun-like)", ja: "G型・黄色矮星（太陽型）" }; color = "#ffe08a"; }
  else if (mass < 1.4) { cls = { en: "F · Yellow-white", ja: "F型・黄白色" }; color = "#fff4d6"; }
  else if (mass < 2.1) { cls = { en: "A · White", ja: "A型・白色" }; color = "#eaf0ff"; }
  else if (mass < 16) { cls = { en: "B · Blue-white", ja: "B型・青白色" }; color = "#c2d4ff"; }
  else { cls = { en: "O · Blue", ja: "O型・青色" }; color = "#a8c4ff"; }

  const lifeGyr = 10 * Math.pow(mass, -2.5);
  let fate;
  if (mass < 0.08) fate = { en: "A failed star that slowly cools in the dark for eternity.", ja: "核融合を起こせなかった星。暗闇の中で永遠に冷え続けます。" };
  else if (mass < 0.45) fate = { en: "Burns its fuel so slowly it will outlast the present age of the universe, then fade to a white dwarf.", ja: "燃料をゆっくり使うため現在の宇宙年齢より長く輝き、やがて白色矮星になります。" };
  else if (mass < 8) fate = { en: "Swells into a red giant, puffs off a glowing planetary nebula, and leaves a white dwarf ember.", ja: "赤色巨星に膨らみ、輝く惑星状星雲を放って、白色矮星の燃えかすを残します。" };
  else if (mass < 20) fate = { en: "Ends in a supernova — a single star briefly outshining a galaxy — leaving a neutron star.", ja: "超新星爆発を起こし——一瞬、銀河をしのぐ明るさで輝き——中性子星を残します。" };
  else fate = { en: "Detonates as a supernova, its core collapsing into a black hole.", ja: "超新星として爆発し、中心核がつぶれてブラックホールになります。" };

  const vr = clamp(Math.pow(mass, 0.42) * 22, 12, 60);
  const tempK = mass < 0.08 ? 1200 : Math.round((5772 * Math.pow(mass, 0.5)) / 100) * 100;
  return { cls, color, fate, vr, mass, tempK, lifeGyr };
}

export function fmtLife(gyr, mass, lang) {
  if (mass < 0.08) return lang === "ja" ? "点火しない" : "Never ignites";
  const yr = gyr * 1e9;
  if (lang === "ja") {
    if (yr >= 1e12) return `約${(yr / 1e12).toFixed(0)}兆年`;
    if (yr >= 1e8) return `約${(yr / 1e8).toFixed(0)}億年`;
    return `約${(yr / 1e4).toFixed(0)}万年`;
  }
  if (yr >= 1e12) return `${(yr / 1e12).toFixed(0)} trillion yr`;
  if (yr >= 1e9) return `${(yr / 1e9).toFixed(1)} billion yr`;
  return `${Math.round(yr / 1e6)} million yr`;
}

export function buildStages(mass) {
  const base = deriveStar(mass);
  const s = [];
  s.push({ name: { en: "Protostar", ja: "原始星" }, desc: { en: "A collapsing cloud of gas and dust heats as it falls inward.", ja: "ガスと塵の雲が収縮しながら熱を帯びていきます。" }, r: base.vr * 1.7, color: "#c9756b", dur: 2.2, kind: "normal" });
  s.push({ name: { en: "Main sequence", ja: "主系列星" }, desc: { en: "Hydrogen fuses to helium in a steady, long-lasting balance.", ja: "水素がヘリウムに変わりながら、長く安定して輝き続けます。" }, r: base.vr, color: base.color, dur: 3.2, kind: "normal" });
  if (mass < 0.45) {
    s.push({ name: { en: "Red dwarf, still shining", ja: "赤色矮星（まだ輝いている）" }, desc: { en: "So frugal it burns for trillions of years — none have yet died.", ja: "燃費が良すぎて数兆年輝き続け、まだ寿命を終えた例はありません。" }, r: base.vr, color: "#ff6f43", dur: 3, kind: "normal", final: true });
  } else if (mass < 8) {
    s.push({ name: { en: "Red giant", ja: "赤色巨星" }, desc: { en: "Core hydrogen spent, the star balloons and reddens.", ja: "中心の水素を使い果たし、星は大きく膨らんで赤くなります。" }, r: base.vr * 3.4, color: "#ff8a4a", dur: 2.6, kind: "normal" });
    s.push({ name: { en: "Planetary nebula", ja: "惑星状星雲" }, desc: { en: "Outer layers drift away as a delicate glowing shell.", ja: "外層がやわらかな光の殻となって広がっていきます。" }, r: base.vr * 0.6, color: "#8ad0ff", dur: 2.4, kind: "nebula" });
    s.push({ name: { en: "White dwarf", ja: "白色矮星" }, desc: { en: "A hot, Earth-sized cinder that will cool for billions of years.", ja: "地球ほどの大きさの熱い燃えかす。何十億年もかけて冷えていきます。" }, r: base.vr * 0.32, color: "#dfe9ff", dur: 3, kind: "normal", final: true });
  } else if (mass < 20) {
    s.push({ name: { en: "Red supergiant", ja: "赤色超巨星" }, desc: { en: "A monster hundreds of times the Sun's width, fusing heavier elements.", ja: "太陽の数百倍にもなる巨大な星が、重い元素を燃やします。" }, r: base.vr * 4.6, color: "#ff6a4a", dur: 2.6, kind: "normal" });
    s.push({ name: { en: "Supernova", ja: "超新星" }, desc: { en: "The core implodes and rebounds — the star tears itself apart.", ja: "中心核が一気につぶれ、星は自らを吹き飛ばします。" }, r: base.vr * 5, color: "#ffffff", dur: 1.8, kind: "supernova" });
    s.push({ name: { en: "Neutron star", ja: "中性子星" }, desc: { en: "A city-sized core so dense a sugar-cube of it weighs a billion tons.", ja: "都市ほどの大きさに凝縮した核。角砂糖一個分で10億トンにもなります。" }, r: base.vr * 0.22, color: "#cfe0ff", dur: 3, kind: "normal", final: true });
  } else {
    s.push({ name: { en: "Red supergiant", ja: "赤色超巨星" }, desc: { en: "One of the largest stars there is, burning through its fuel fast.", ja: "最大級の星が、猛烈な勢いで燃料を使い果たしていきます。" }, r: base.vr * 5, color: "#ff5a3a", dur: 2.6, kind: "normal" });
    s.push({ name: { en: "Supernova", ja: "超新星" }, desc: { en: "Gravity overwhelms everything in a final catastrophic collapse.", ja: "重力がすべてを圧倒し、破滅的な最期を迎えます。" }, r: base.vr * 5.5, color: "#ffffff", dur: 1.8, kind: "supernova" });
    s.push({ name: { en: "Black hole", ja: "ブラックホール" }, desc: { en: "Gravity wins completely. Not even light can escape.", ja: "重力が完全に勝利します。光さえも脱出できません。" }, r: base.vr * 0.5, color: "#05060d", dur: 3, kind: "blackhole", final: true });
  }
  return s;
}

export function StarForge() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 430;
  const canvasRef = useRef(null);
  const [mass, setMass] = useState(1);
  const [phase, setPhase] = useState("idle");
  const [stageInfo, setStageInfo] = useState(null);
  const cw = Math.min(w, 760);
  const star = useMemo(() => deriveStar(mass), [mass]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, cw, H);
    const cx = cw / 2, cy = H / 2;

    const drawStar = (r, color, kind, localT) => {
      ctx.clearRect(0, 0, cw, H);
      if (kind !== "blackhole") {
        const g = ctx.createRadialGradient(cx, cy, 2, cx, cy, r * 2.6);
        g.addColorStop(0, color); g.addColorStop(0.35, color); g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.globalAlpha = 0.45; ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(cx, cy, r * 2.6, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1;
      }
      if (kind === "nebula") {
        ctx.strokeStyle = "rgba(138,208,255,0.5)"; ctx.lineWidth = 2;
        const shell = r * (2 + (localT || 0) * 3);
        ctx.globalAlpha = 1 - (localT || 0) * 0.7;
        ctx.beginPath(); ctx.arc(cx, cy, shell, 0, Math.PI * 2); ctx.stroke();
        ctx.globalAlpha = 1;
      }
      if (kind === "supernova") {
        const tt = localT || 0;
        const ring = r * (1 + tt * 4);
        ctx.strokeStyle = `rgba(255,255,255,${1 - tt})`; ctx.lineWidth = 6 * (1 - tt) + 1;
        ctx.beginPath(); ctx.arc(cx, cy, ring, 0, Math.PI * 2); ctx.stroke();
        const flash = ctx.createRadialGradient(cx, cy, 2, cx, cy, ring);
        flash.addColorStop(0, `rgba(255,255,255,${0.8 * (1 - tt)})`); flash.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = flash;
        ctx.beginPath(); ctx.arc(cx, cy, ring, 0, Math.PI * 2); ctx.fill();
      }
      if (kind === "blackhole") {
        const g = ctx.createRadialGradient(cx, cy, r, cx, cy, r * 2.2);
        g.addColorStop(0, "rgba(255,150,60,0.0)"); g.addColorStop(0.55, "rgba(255,150,60,0.55)");
        g.addColorStop(0.75, "rgba(120,160,255,0.4)"); g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(cx, cy, r * 2.2, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#05060d";
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
        return;
      }
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
    };

    if (phase !== "playing") {
      drawStar(star.vr, star.color, "normal", 0);
      if (mass < 0.08) {
        ctx.clearRect(0, 0, cw, H);
        ctx.fillStyle = star.color;
        ctx.beginPath(); ctx.arc(cx, cy, star.vr, 0, Math.PI * 2); ctx.fill();
      }
      return;
    }

    const stages = buildStages(mass);
    const total = stages.reduce((a, s) => a + s.dur, 0);
    let raf, start = performance.now(), lastStage = -1;
    const loop = () => {
      const tt = reduceMotion ? total : (performance.now() - start) / 1000;
      let acc = 0, k = 0, localT = 0;
      for (let i = 0; i < stages.length; i++) {
        if (tt < acc + stages[i].dur || i === stages.length - 1) { k = i; localT = clamp((tt - acc) / stages[i].dur, 0, 1); break; }
        acc += stages[i].dur;
      }
      const cur = stages[k], nxt = stages[Math.min(k + 1, stages.length - 1)];
      const r = lerp(cur.r, nxt.r, cur.kind === "normal" ? localT : 0);
      const color = cur.kind === "normal" ? lerpColor(cur.color, nxt.color, localT) : cur.color;
      drawStar(r, color, cur.kind, localT);
      if (k !== lastStage) { lastStage = k; setStageInfo({ name: cur.name, desc: cur.desc, i: k, n: stages.length }); }
      if (tt >= total) { setPhase("done"); return; }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, mass, phase, star]);

  const play = () => { setStageInfo(null); setPhase("playing"); };
  const reset = () => { setPhase("idle"); setStageInfo(null); };

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <canvas ref={canvasRef} style={{ display: "block", maxWidth: "100%" }} />
        <div style={styles.controlBar}>
          <button style={styles.iconBtn} onClick={phase === "idle" ? play : reset}>
            {phase === "idle" ? t.runLife : t.resetLife}
          </button>
          {stageInfo && (
            <div style={styles.stagePill}>{t.stage} {stageInfo.i + 1}/{stageInfo.n} · {tr(stageInfo.name, lang)}</div>
          )}
        </div>
        {stageInfo && <p style={styles.stageDesc}>{tr(stageInfo.desc, lang)}</p>}
        {phase === "idle" && <p style={styles.note}>{t.setMassNote}</p>}
      </div>

      <InfoPanel>
        <h3 style={styles.panelTitle}>{t.birthMass}</h3>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontFamily: mono, fontSize: 31, color: C.sun }}>{mass.toFixed(mass < 1 ? 2 : 1)}</span>
          <span style={{ color: C.muted, fontSize: 15 }}>{t.timesSun}</span>
        </div>
        <input type="range" min={0.05} max={50} step={0.05} value={mass}
          onChange={(e) => { setMass(parseFloat(e.target.value)); reset(); }} style={styles.range} />
        <div style={styles.rangeEnds}><span>0.05</span><span>50</span></div>
        <dl style={styles.dl}>
          <Row k={t.spectralClass} v={tr(star.cls, lang)} />
          <Row k={t.surfaceTemp} v={`~${star.tempK.toLocaleString()} K`} />
          <Row k={t.msLife} v={fmtLife(star.lifeGyr, mass, lang)} />
        </dl>
        <div style={styles.legendWrap}>
          <div style={styles.legendBar} />
          <div style={styles.legendEnds}><span>{t.hotterBlue}</span><span>{t.coolerRed}</span></div>
        </div>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.lifeStartFinish}</div>
          <p style={styles.pathText}>{buildStages(mass).map((s) => tr(s.name, lang)).join("  →  ")}</p>
        </div>
        <div style={styles.fateBox}>
          <div style={styles.fateLabel}>{t.finalFate}</div>
          <p style={styles.factText}>{tr(star.fate, lang)}</p>
        </div>
      </InfoPanel>
    </div>
  );
}

export default StarForge;
