/* ============================================================
   STATION 7 — THE ATOM & SPECTRAL LINES  (hydrogen, exact Bohr lines)
   In the Bohr model an atom is a tiny nucleus of protons (+) and
   neutrons, surrounded by electrons (−) in specific permitted energy
   levels n = 1, 2, 3, … . An electron ABSORBS a photon to jump UP and
   EMITS a photon when it drops DOWN. The photon's wavelength is fixed
   by the energy gap, given exactly by the Rydberg formula
        1/λ = R∞ (1/n_low² − 1/n_high²),   R∞ = 1.097373×10⁷ m⁻¹.
   Drops to n=2 make hydrogen's visible Balmer series (Hα 656 nm red,
   Hβ 486 nm, Hγ 434 nm, Hδ 410 nm violet); drops to n=1 make the
   ultraviolet Lyman series. Each element's set of lines is a unique
   fingerprint. Stripping the electron away ionizes the atom; because
   heat drives ionization, the ions we see also signal temperature.
   Grounded in Ch.5 §5.5–5.6.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp, lerp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

/* ---- exact hydrogen wavelengths (Rydberg formula), vacuum, in nm ---- */
const R_INF = 1.0973731568e7; // m^-1
function bohrLambdaNm(nHi, nLo) {
  const inv = R_INF * (1 / (nLo * nLo) - 1 / (nHi * nHi)); // m^-1
  return 1e9 / inv; // nm
}
/* wavelength (nm) → an approximate visible colour (380–700 nm) */
function wlColour(nm) {
  let r = 0, g = 0, b = 0;
  if (nm < 440) { r = -(nm - 440) / (440 - 380); b = 1; }
  else if (nm < 490) { g = (nm - 440) / (490 - 440); b = 1; }
  else if (nm < 510) { g = 1; b = -(nm - 510) / (510 - 490); }
  else if (nm < 580) { r = (nm - 510) / (580 - 510); g = 1; }
  else if (nm < 645) { r = 1; g = -(nm - 645) / (645 - 580); }
  else { r = 1; }
  return `rgb(${Math.round(clamp(r, 0, 1) * 255)},${Math.round(clamp(g, 0, 1) * 255)},${Math.round(clamp(b, 0, 1) * 255)})`;
}
/* colour for any line: real visible colour, or a marker tint for UV / IR */
function lineColour(nm) {
  if (nm < 380) return "#9d7be0";  // ultraviolet — shown as violet-grey marker
  if (nm > 700) return "#c0554c";  // infrared — shown as deep-red marker
  return wlColour(nm);
}
function seriesKey(nLo) {
  return nLo === 1 ? "lyman" : nLo === 2 ? "balmer" : nLo === 3 ? "paschen" : "other";
}

const N_MAX = 6;                 // levels n = 1 … 6  (index 0 … 5)
const MAXIDX = N_MAX - 1;

const STR = {
  en: {
    title: "The atom & spectral lines",
    kind: "Hydrogen in the Bohr model — each jump makes one exact line",
    lede: "Zoom into a single hydrogen atom. Its electron may sit only on certain rings (n = 1, 2, 3 …). Feed it a photon and it leaps outward; let it fall back toward n = 2 and it emits one exact colour — a line of hydrogen's Balmer series. Excite it hard enough and the electron escapes: the atom is ionized.",
    thread: "THE STORY CONTINUES",
    threadText: "The prism showed us bright and dark lines, but not why they appear. The answer lives inside the atom. Its electrons are allowed only certain energy levels, and every leap between them stamps light with one exact wavelength — a fingerprint we can read across the galaxy.",
    key: "THE ATOM'S FINGERPRINT",
    keyText: "An electron carries negative charge and orbits the nucleus only at permitted energy levels. Absorbing a photon lifts it up; dropping down emits a photon of a single fixed wavelength set by the Rydberg formula. Drops to n=2 give hydrogen's visible Balmer lines (Hα 656, Hβ 486, Hγ 434, Hδ 410 nm); drops to n=1 give the ultraviolet Lyman lines. Because each element's levels are unique, its set of lines is a fingerprint — spectroscopy lets us sample a star's composition from light-years away. Strip the electron off entirely and the atom is ionized; since heat drives ionization, the ions we see also reveal temperature.",
    excite: "Excite ↑", emit: "Emit / de-excite ↓", ionize: "Ionize", reset: "Reset",
    stateGround: "ground state (n=1)", stateLevel: "excited state", stateIon: "IONIZED — electron removed",
    strip: "Emitted lines land at their true wavelength — a growing fingerprint:",
    nucleusL: "nucleus (protons +)", electronL: "electron (−)",
    visLabel: "visible", uvLabel: "UV", irLabel: "IR",
    hintTop: "already at n=6 (top shown)", hintGround: "already in the ground state",
    lastEmit: "emitted", lastAbsorb: "absorbed",
    balmer: "Balmer (visible)", lyman: "Lyman (UV)", paschen: "Paschen (IR)", other: "line",
  },
  ja: {
    title: "原子とスペクトル線",
    kind: "ボーア模型の水素——一つの跳躍が一本の正確な線をつくる",
    lede: "一個の水素原子に迫ろう。その電子は決まった軌道（n = 1, 2, 3 …）にしか座れません。光子を与えると外へ跳び、n = 2 へ落ちると一つの正確な色の光子——水素のバルマー系列の線——を放ちます。十分に励起すると電子は飛び出し、原子は電離します。",
    thread: "物語はつづく",
    threadText: "プリズムは明るい線と暗い線を見せてくれましたが、なぜそれが現れるかは教えてくれませんでした。答えは原子の中にあります。電子は決まったエネルギー準位しか許されず、その間を跳ぶたびに光を一つの正確な波長で刻印します——それは銀河の向こうまで読める指紋です。",
    key: "原子の指紋",
    keyText: "電子は負の電荷をもち、決まったエネルギー準位でのみ核のまわりを回ります。光子を吸収すると持ち上がり、下へ落ちるとリュードベリの式で決まる一つの波長の光子を放ちます。n=2 への遷移は水素の可視バルマー線（Hα 656、Hβ 486、Hγ 434、Hδ 410 nm）を、n=1 への遷移は紫外のライマン線を生みます。各元素の準位は固有なので、その線の並びは指紋になります——分光学によって何光年も離れた星の組成を調べられます。電子を完全に剥ぎ取ると原子は電離します。熱が電離を進めるため、見えるイオンは温度をも明かします。",
    excite: "励起 ↑", emit: "放出／脱励起 ↓", ionize: "電離", reset: "リセット",
    stateGround: "基底状態 (n=1)", stateLevel: "励起状態", stateIon: "電離——電子が外れた",
    strip: "放出された線が本当の波長の位置に並ぶ——育っていく指紋：",
    nucleusL: "原子核（陽子 +）", electronL: "電子 (−)",
    visLabel: "可視", uvLabel: "紫外", irLabel: "赤外",
    hintTop: "すでに n=6（表示上限）", hintGround: "すでに基底状態",
    lastEmit: "放出", lastAbsorb: "吸収",
    balmer: "バルマー（可視）", lyman: "ライマン（紫外）", paschen: "パッシェン（赤外）", other: "線",
  },
};

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
  const maxR = Math.min(cw, H) * 0.42;
  // six schematic rings (spacing compressed for display; not to n² scale)
  const rings = [0.26, 0.40, 0.53, 0.66, 0.81, 1.0].map((f) => maxR * f);
  const { level, ionized, anim, phase } = st;

  // orbit rings n = 1 … 6
  for (let i = 0; i < rings.length; i++) {
    const active = i === level && !ionized;
    ctx.strokeStyle = active ? "rgba(99,211,240,0.85)" : "rgba(150,175,230,0.20)";
    ctx.lineWidth = active ? 1.8 : 1;
    ctx.beginPath(); ctx.arc(cx, cy, rings[i], 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = active ? C.cool : "rgba(150,175,230,0.4)";
    ctx.font = `10px ${mono}`; ctx.textAlign = "center";
    ctx.fillText("n=" + (i + 1), cx, cy - rings[i] - 4);
  }

  // nucleus — a small cluster (single proton for hydrogen, drawn as a warm core)
  const ng = ctx.createRadialGradient(cx, cy, 2, cx, cy, 18);
  ng.addColorStop(0, "rgba(255,120,90,0.5)"); ng.addColorStop(1, "rgba(255,120,90,0)");
  ctx.fillStyle = ng; ctx.beginPath(); ctx.arc(cx, cy, 18, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ff6b6b"; ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#3a0f0f"; ctx.font = `bold 9px ${mono}`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText("+", cx, cy); ctx.textBaseline = "alphabetic";

  // electron radius (interpolated during a transition between any two levels)
  let radius = rings[level];
  if (anim) {
    if (anim.kind === "excite") radius = lerp(rings[anim.fromLvl], rings[anim.toLvl], clamp((anim.p - 0.45) / 0.55, 0, 1));
    else if (anim.kind === "emit") radius = lerp(rings[anim.fromLvl], rings[anim.toLvl], clamp(anim.p / 0.7, 0, 1));
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

  // incoming photon during excitation (flies in and is absorbed at the start ring)
  if (anim && anim.kind === "excite" && anim.p < 0.6) {
    const pp = clamp(anim.p / 0.5, 0, 1);
    const sx = cx - maxR - 46, sy = cy;
    const tx = cx + rings[anim.fromLvl] * Math.cos(ang), ty = cy + rings[anim.fromLvl] * Math.sin(ang);
    drawPhoton(ctx, lerp(sx, tx, pp), lerp(sy, ty, pp), anim.col, 5 * (1 - pp * 0.4));
  }

  // emitted photon flying outward from the start ring
  if (anim && anim.kind === "emit" && anim.p > 0.35) {
    const pp = clamp((anim.p - 0.35) / 0.65, 0, 1);
    const sx = cx + rings[anim.fromLvl] * Math.cos(ang), sy = cy + rings[anim.fromLvl] * Math.sin(ang);
    const tx = cw + 30, ty = sy + (sy - cy) * 0.4;
    drawPhoton(ctx, lerp(sx, tx, pp), lerp(sy, ty, pp), anim.col, 5);
  }

  // state label
  ctx.textAlign = "center"; ctx.font = `12px ${mono}`;
  if (ionized && !anim) { ctx.fillStyle = C.danger; ctx.fillText(t.stateIon, cx, H - 10); }
  else {
    ctx.fillStyle = C.muted;
    ctx.fillText(level === 0 ? t.stateGround : "n=" + (level + 1), cx, H - 10);
  }
}

/* spectrum strip: 380–700 nm visible axis; UV lines sit at the far-left
   edge, IR at the far-right edge, each at their real (clamped) position. */
const STRIP_LO = 380, STRIP_HI = 700;
function drawStrip(ctx, w, h, lines) {
  ctx.clearRect(0, 0, w, h);
  const pad = 2;
  // faint visible rainbow backdrop so line positions read against real colour
  for (let nm = STRIP_LO; nm <= STRIP_HI; nm += 4) {
    const x = pad + ((nm - STRIP_LO) / (STRIP_HI - STRIP_LO)) * (w - 2 * pad);
    ctx.fillStyle = wlColour(nm); ctx.globalAlpha = 0.12;
    ctx.fillRect(x, 0, 4, h);
  }
  ctx.globalAlpha = 1;
  ctx.fillStyle = "rgba(5,7,15,0.55)"; ctx.fillRect(0, 0, w, h);
  lines.forEach((ln) => {
    const clamped = clamp(ln.nm, STRIP_LO, STRIP_HI);
    const x = pad + ((clamped - STRIP_LO) / (STRIP_HI - STRIP_LO)) * (w - 2 * pad);
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
  const [last, setLast] = useState(null); // { kind, nHi, nLo, nm }

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
          levelRef.current = a.toLvl != null ? a.toLvl : levelRef.current;
          if (a.kind === "ionize") { ionizedRef.current = true; setIonized(true); }
          else setLevel(levelRef.current);
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

  // Excite: absorb a photon, climb ONE level (n → n+1).
  const excite = () => {
    if (busy() || ionizedRef.current || levelRef.current >= MAXIDX) return;
    const from = levelRef.current, to = from + 1;
    const nm = bohrLambdaNm(to + 1, from + 1); // absorbed = emitted wavelength for this pair
    const col = lineColour(nm);
    setLast({ kind: "absorb", nHi: to + 1, nLo: from + 1, nm });
    if (reduceMotion) { levelRef.current = to; setLevel(to); return; }
    animRef.current = { kind: "excite", p: 0, fromLvl: from, toLvl: to, col, nm };
  };

  // Emit: fall DIRECTLY toward the ground shell — to n=2 (Balmer, visible) if
  // above it, else n=2 → n=1 (Lyman, UV). Emits the exact line for that jump.
  const emit = () => {
    if (busy() || ionizedRef.current || levelRef.current <= 0) return;
    const from = levelRef.current;              // index (n = from+1)
    const to = from >= 2 ? 1 : 0;               // land on n=2, or n=1 from n=2
    const nHi = from + 1, nLo = to + 1;
    const nm = bohrLambdaNm(nHi, nLo);
    const col = lineColour(nm);
    setLines((prev) => [...prev, { nm, col }].slice(-16));
    setLast({ kind: "emit", nHi, nLo, nm });
    if (reduceMotion) { levelRef.current = to; setLevel(to); return; }
    animRef.current = { kind: "emit", p: 0, fromLvl: from, toLvl: to, col, nm };
  };

  const ionize = () => {
    if (busy() || ionizedRef.current) return;
    setLast({ kind: "ionize" });
    if (reduceMotion) { ionizedRef.current = true; setIonized(true); return; }
    animRef.current = { kind: "ionize", p: 0 };
  };
  const reset = () => {
    animRef.current = null; levelRef.current = 0; ionizedRef.current = false;
    setLevel(0); setIonized(false); setLines([]); setLast(null);
  };

  const stateText = ionized ? t.stateIon
    : level === 0 ? t.stateGround : t.stateLevel + " n=" + (level + 1);

  // last-transition readout, e.g. "emit · n=4→2 · Balmer (visible) · 486 nm"
  let lastText = null;
  if (last && last.kind !== "ionize") {
    const sName = t[seriesKey(last.nLo)];
    const verb = last.kind === "emit" ? t.lastEmit : t.lastAbsorb;
    lastText = `${verb} · n=${last.nHi}→${last.nLo} · ${sName} · ${Math.round(last.nm)} nm`;
  }

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

        {lastText && (
          <div style={{ fontFamily: mono, fontSize: 13, color: last.kind === "emit" ? lineColour(last.nm) : C.muted, marginTop: 10 }}>
            {lastText}
          </div>
        )}

        <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginTop: 16, marginBottom: 6 }}>{t.strip}</div>
        <canvas ref={stripRef} style={{ display: "block", maxWidth: "100%", borderRadius: 8, background: "rgba(3,5,12,0.6)" }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 11, color: C.faint, marginTop: 4 }}>
          <span>380 nm · {t.uvLabel} ◂</span>
          <span>{t.visLabel}</span>
          <span>▸ {t.irLabel} · 700 nm</span>
        </div>

        <div style={{ fontFamily: mono, fontSize: 12.5, marginTop: 12, lineHeight: 1.8, color: C.muted }}>
          <div><span style={{ color: "#ff6b6b" }}>●</span> {t.nucleusL}</div>
          <div><span style={{ color: C.cool }}>●</span> {t.electronL}</div>
        </div>
      </div>
    </div>
  );
}

export default AtomLines;
