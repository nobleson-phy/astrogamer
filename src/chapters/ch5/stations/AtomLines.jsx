/* ============================================================
   STATION 7 — THE ATOM & SPECTRAL LINES
   In the Bohr model an atom is a tiny nucleus of protons (+) and
   neutrons, surrounded by electrons (−) in specific permitted energy
   levels. An electron ABSORBS a photon to jump UP a level and EMITS a
   photon when it drops DOWN. Because the levels are fixed, each
   transition makes a photon of one exact wavelength — a spectral line.
   Every element has its own unique pattern of lines (a fingerprint),
   letting astronomers read a distant object's composition. Ionization
   is an atom losing (or gaining) an electron; hotter gas ionizes more
   atoms, so the state of ionization also signals temperature.
   Grounded in Ch.5 §5.6.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp, lerp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The atom & spectral lines",
    kind: "The Bohr model — each jump makes one exact line",
    lede: "Zoom into a single atom. Its electron can sit only on certain rings. Feed it a photon and it leaps outward; let it fall back and it spits a photon of one precise colour. Excite it enough and the electron escapes entirely — the atom is ionized.",
    thread: "THE STORY CONTINUES",
    threadText: "The prism showed us bright and dark lines, but not why they appear. The answer lives inside the atom. Its electrons are allowed only certain energy levels, and every leap between them stamps light with one exact wavelength — a fingerprint we can read across the galaxy.",
    key: "THE ATOM'S FINGERPRINT",
    keyText: "An electron carries negative charge and orbits the nucleus only at permitted energy levels. Absorbing a photon lifts it up a level; dropping down emits a photon of a single fixed wavelength. Since each element's levels are unique, its set of lines is a fingerprint — spectroscopy lets us sample a star's composition from light-years away. Strip an electron off entirely and the atom is ionized; because heat drives ionization, the ions we see also reveal temperature.",
    excite: "Excite ↑", emit: "Emit / de-excite ↓", ionize: "Ionize", reset: "Reset",
    stateGround: "ground state", stateLevel: "level", stateIon: "IONIZED — electron removed",
    absorb: "absorbs a photon", emitCap: "emits a photon",
    strip: "Emitted lines collect here — a growing fingerprint:",
    nucleusL: "nucleus (+)", electronL: "electron (−)",
    hintTop: "already at the top level", hintGround: "already at ground level",
  },
  ja: {
    title: "原子とスペクトル線",
    kind: "ボーア模型——一つの跳躍が一本の正確な線をつくる",
    lede: "一個の原子に迫ろう。その電子は決まった軌道にしか座れません。光子を与えると外へ跳び、落ちると一つの正確な色の光子を吐き出します。十分に励起すると電子は完全に飛び出し——原子は電離します。",
    thread: "物語はつづく",
    threadText: "プリズムは明るい線と暗い線を見せてくれましたが、なぜそれが現れるかは教えてくれませんでした。答えは原子の中にあります。電子は決まったエネルギー準位しか許されず、その間を跳ぶたびに光を一つの正確な波長で刻印します——それは銀河の向こうまで読める指紋です。",
    key: "原子の指紋",
    keyText: "電子は負の電荷をもち、決まったエネルギー準位でのみ核のまわりを回ります。光子を吸収すると一つ上の準位へ持ち上がり、下へ落ちると一つの決まった波長の光子を放ちます。各元素の準位は固有なので、その線の並びは指紋になります——分光学によって、何光年も離れた星の組成を調べられるのです。電子を完全に剥ぎ取ると原子は電離します。熱が電離を進めるため、見えるイオンは温度をも明かします。",
    excite: "励起 ↑", emit: "放出／脱励起 ↓", ionize: "電離", reset: "リセット",
    stateGround: "基底状態", stateLevel: "準位", stateIon: "電離——電子が外れた",
    absorb: "光子を吸収", emitCap: "光子を放出",
    strip: "放出された線がここに集まる——育っていく指紋：",
    nucleusL: "原子核 (+)", electronL: "電子 (−)",
    hintTop: "すでに最上位の準位", hintGround: "すでに基底準位",
  },
};

/* one colour per energy gap (bigger gap = shorter wavelength = bluer/violet) */
const GAPS = [
  { nm: 410, col: "#c98bff" }, // 0 <-> 1 (largest gap)
  { nm: 486, col: "#5fe8ff" }, // 1 <-> 2
  { nm: 656, col: "#ff5d5d" }, // 2 <-> 3 (smallest gap)
];
const MAXLVL = 3;

function drawPhoton(ctx, x, y, col, r) {
  ctx.save();
  ctx.shadowColor = col; ctx.shadowBlur = 14;
  ctx.fillStyle = col;
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

function drawAtom(ctx, cw, H, st, t) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2;
  const maxR = Math.min(cw, H) * 0.40;
  const rings = [0.34, 0.56, 0.78, 1.0].map((f) => maxR * f);
  const { level, ionized, anim, phase } = st;

  // orbit rings
  for (let i = 0; i < rings.length; i++) {
    const active = i === level && !ionized;
    ctx.strokeStyle = active ? "rgba(99,211,240,0.8)" : "rgba(150,175,230,0.22)";
    ctx.lineWidth = active ? 1.8 : 1;
    ctx.beginPath(); ctx.arc(cx, cy, rings[i], 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = active ? C.cool : "rgba(150,175,230,0.4)";
    ctx.font = `10px ${mono}`; ctx.textAlign = "center";
    ctx.fillText("n=" + (i + 1), cx, cy - rings[i] - 4);
  }

  // nucleus — a small cluster of protons (+) and neutrons
  const nucleons = [
    [0, 0, "#ff6b6b"], [-5, -3, "#8fa0c8"], [5, -3, "#ff6b6b"],
    [-4, 4, "#ff6b6b"], [5, 4, "#8fa0c8"], [0, 7, "#8fa0c8"],
  ];
  const ng = ctx.createRadialGradient(cx, cy, 2, cx, cy, 20);
  ng.addColorStop(0, "rgba(255,120,90,0.35)"); ng.addColorStop(1, "rgba(255,120,90,0)");
  ctx.fillStyle = ng; ctx.beginPath(); ctx.arc(cx, cy, 20, 0, Math.PI * 2); ctx.fill();
  nucleons.forEach(([dx, dy, col]) => {
    ctx.fillStyle = col; ctx.beginPath(); ctx.arc(cx + dx, cy + dy, 4.2, 0, Math.PI * 2); ctx.fill();
  });

  // electron radius (interpolated during a transition)
  let radius = rings[level];
  if (anim) {
    if (anim.kind === "excite") radius = lerp(rings[anim.gi], rings[anim.gi + 1], clamp((anim.p - 0.45) / 0.55, 0, 1));
    else if (anim.kind === "emit") radius = lerp(rings[anim.gi + 1], rings[anim.gi], clamp(anim.p / 0.55, 0, 1));
    else if (anim.kind === "ionize") radius = lerp(rings[level], maxR * 2.6, anim.p);
  }
  const ang = phase;
  const ex = cx + radius * Math.cos(ang), ey = cy + radius * Math.sin(ang);

  const electronVisible = !(ionized && !anim);
  if (electronVisible) {
    const alpha = anim && anim.kind === "ionize" ? 1 - anim.p * 0.7 : 1;
    ctx.save(); ctx.globalAlpha = alpha;
    const eg = ctx.createRadialGradient(ex, ey, 1, ex, ey, 8);
    eg.addColorStop(0, "#eaf4ff"); eg.addColorStop(1, C.cool);
    ctx.fillStyle = eg; ctx.shadowColor = C.cool; ctx.shadowBlur = 10;
    ctx.beginPath(); ctx.arc(ex, ey, 6, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    ctx.fillStyle = "#062430"; ctx.font = `bold 9px ${mono}`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("−", ex, ey);
    ctx.textBaseline = "alphabetic";
  }

  // incoming photon during excitation (flies in and is absorbed)
  if (anim && anim.kind === "excite" && anim.p < 0.6) {
    const pp = clamp(anim.p / 0.5, 0, 1);
    const col = GAPS[anim.gi].col;
    const sx = cx - maxR - 46, sy = cy;
    const tx = cx + rings[anim.gi] * Math.cos(ang), ty = cy + rings[anim.gi] * Math.sin(ang);
    drawPhoton(ctx, lerp(sx, tx, pp), lerp(sy, ty, pp), col, 5 * (1 - pp * 0.4));
  }

  // emitted photon flying outward
  if (anim && anim.kind === "emit" && anim.p > 0.35) {
    const pp = clamp((anim.p - 0.35) / 0.65, 0, 1);
    const col = GAPS[anim.gi].col;
    const sx = cx + rings[anim.gi + 1] * Math.cos(ang), sy = cy + rings[anim.gi + 1] * Math.sin(ang);
    const tx = cw + 30, ty = sy + (sy - cy) * 0.4;
    drawPhoton(ctx, lerp(sx, tx, pp), lerp(sy, ty, pp), col, 5);
  }

  // state label
  ctx.textAlign = "center"; ctx.font = `12px ${mono}`;
  if (ionized && !anim) { ctx.fillStyle = C.danger; ctx.fillText(t.stateIon, cx, H - 10); }
  else { ctx.fillStyle = C.muted; ctx.fillText(level === 0 ? t.stateGround : t.stateLevel + " n=" + (level + 1), cx, H - 10); }
}

function drawStrip(ctx, w, h, lines) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#05070f"; ctx.fillRect(0, 0, w, h);
  const pad = 2;
  lines.forEach((ln) => {
    const x = pad + ((700 - ln.nm) / (700 - 380)) * (w - 2 * pad);
    ctx.fillStyle = ln.col; ctx.shadowColor = ln.col; ctx.shadowBlur = 10;
    ctx.fillRect(x - 2, 0, 4, h);
  });
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(150,175,230,0.35)"; ctx.lineWidth = 1;
  ctx.strokeRect(0.5, 0.5, w - 1, h - 1);
}

export function AtomLines() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 320;
  const atomRef = useRef(null);
  const stripRef = useRef(null);
  const cw = Math.min(w, 760);

  const levelRef = useRef(0);
  const ionizedRef = useRef(false);
  const animRef = useRef(null);
  const phaseRef = useRef(0);
  const [level, setLevel] = useState(0);
  const [ionized, setIonized] = useState(false);
  const [lines, setLines] = useState([]);

  // persistent draw loop (or single frame when reduced motion)
  useEffect(() => {
    const c = atomRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) {
      drawAtom(ctx, cw, H, { level: levelRef.current, ionized: ionizedRef.current, anim: null, phase: 0.6 }, t);
      return;
    }
    let raf;
    const loop = () => {
      phaseRef.current += 0.018;
      const a = animRef.current;
      if (a) {
        a.p += 0.03;
        if (a.p >= 1) {
          animRef.current = null;
          if (a.kind === "excite") { levelRef.current = Math.min(MAXLVL, levelRef.current + 1); setLevel(levelRef.current); }
          else if (a.kind === "emit") { levelRef.current = Math.max(0, levelRef.current - 1); setLevel(levelRef.current); }
          else if (a.kind === "ionize") { ionizedRef.current = true; setIonized(true); }
        }
      }
      drawAtom(ctx, cw, H, { level: levelRef.current, ionized: ionizedRef.current, anim: animRef.current, phase: phaseRef.current }, t);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

  // redraw a static frame on state change when motion is reduced
  useEffect(() => {
    if (!reduceMotion) return;
    const c = atomRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    drawAtom(ctx, cw, H, { level, ionized, anim: null, phase: 0.6 }, t);
  }, [level, ionized, cw, lang]);

  // spectrum strip
  useEffect(() => {
    const c = stripRef.current;
    if (!c) return;
    const sw = Math.min(cw, 760), sh = 40;
    const ctx = setupCanvas(c, sw, sh);
    drawStrip(ctx, sw, sh, lines);
  }, [cw, lines]);

  const busy = () => animRef.current != null;

  const excite = () => {
    if (busy() || ionizedRef.current || levelRef.current >= MAXLVL) return;
    if (reduceMotion) { levelRef.current += 1; setLevel(levelRef.current); return; }
    animRef.current = { kind: "excite", p: 0, gi: levelRef.current };
  };
  const emit = () => {
    if (busy() || ionizedRef.current || levelRef.current <= 0) return;
    const gi = levelRef.current - 1;
    setLines((prev) => [...prev, GAPS[gi]].slice(-14));
    if (reduceMotion) { levelRef.current -= 1; setLevel(levelRef.current); return; }
    animRef.current = { kind: "emit", p: 0, gi };
  };
  const ionize = () => {
    if (busy() || ionizedRef.current) return;
    if (reduceMotion) { ionizedRef.current = true; setIonized(true); return; }
    animRef.current = { kind: "ionize", p: 0 };
  };
  const reset = () => {
    animRef.current = null; levelRef.current = 0; ionizedRef.current = false;
    setLevel(0); setIonized(false); setLines([]);
  };

  const stateText = ionized ? t.stateIon
    : level === 0 ? t.stateGround : t.stateLevel + " n=" + (level + 1);

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

        <canvas ref={atomRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />

        <div style={styles.controlBar}>
          <button style={styles.iconBtn} onClick={excite}>{t.excite}</button>
          <button style={styles.iconBtn} onClick={emit}>{t.emit}</button>
          <button style={styles.iconBtn} onClick={ionize}>{t.ionize}</button>
          <button style={{ ...styles.iconBtn, opacity: 0.85 }} onClick={reset}>{t.reset}</button>
          <span style={{ fontFamily: mono, fontSize: 13, color: ionized ? C.danger : C.cool }}>{stateText}</span>
        </div>

        <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginTop: 16, marginBottom: 6 }}>{t.strip}</div>
        <canvas ref={stripRef} style={{ display: "block", maxWidth: "100%", borderRadius: 8, background: "rgba(3,5,12,0.6)" }} />

        <div style={{ fontFamily: mono, fontSize: 12.5, marginTop: 12, lineHeight: 1.8, color: C.muted }}>
          <div><span style={{ color: "#ff6b6b" }}>●</span> {t.nucleusL}</div>
          <div><span style={{ color: C.cool }}>●</span> {t.electronL}</div>
        </div>
      </div>
    </div>
  );
}

export default AtomLines;
