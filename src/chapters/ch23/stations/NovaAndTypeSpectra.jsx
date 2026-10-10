/* ============================================================
   STATION 3 — NOVA & THE Ia/II SPECTRAL FINGERPRINT
   Two contrasts. (a) A NOVA: hydrogen stolen from a companion piles on a white
   dwarf's surface until it flashes in a mild thermonuclear burst — the star
   SURVIVES, and can erupt again and again (RECURRING). (b) A spectral
   fingerprint: Type Ia come from carbon-oxygen white dwarfs, so they show NO
   hydrogen lines but strong SILICON absorption; Type II come from massive
   stars that still have their hydrogen envelope, so they DO show hydrogen
   lines. Grounded in Ch.23.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Nova & the spectral fingerprint",
    kind: "Surface flashes and the lines that name a supernova",
    lede: "First watch a nova: hydrogen piling on a white dwarf's surface, flashing, and the star surviving to do it again. Then read the spectra that tell a Type Ia from a Type II.",
    thread: "THE STORY CONTINUES",
    threadText: "Not every white-dwarf fire is fatal. Sometimes only the surface burns — a flash, then calm, then another flash. And when a star does die, its light carries a fingerprint that names how.",
    key: "NOVA (RECURRING SURFACE FLASH) & THE Ia/II SPECTRAL FINGERPRINT",
    keyText: "A NOVA is gentler than a supernova. Hydrogen pulled from a companion accumulates on a white dwarf's surface until it ignites in a brief thermonuclear flash — but only the surface layer burns, so the white dwarf SURVIVES and can erupt again and again. Supernovae are named by their spectra: a TYPE Ia comes from a carbon-oxygen white dwarf with no hydrogen, so its spectrum shows NO hydrogen lines but strong SILICON absorption; a TYPE II comes from a massive star that still has its hydrogen envelope, so it DOES show hydrogen lines.",
    modeNova: "Nova", modeIa: "Type Ia spectrum", modeII: "Type II spectrum",
    wd: "white dwarf", hShell: "H layer",
    building: "hydrogen building up…", flash: "NOVA FLASH — star survives",
    recur: "surface burns, dwarf survives → recurs",
    wavelength: "wavelength →", intensity: "intensity",
    siLine: "Si (silicon)", hLine: "H (hydrogen)",
    iaNote: "Type Ia: NO hydrogen, strong silicon absorption", iiNote: "Type II: hydrogen lines present",
    note: "A nova is a recurring surface flash of accreted hydrogen that leaves the white dwarf intact. Supernova spectra are fingerprints: Type Ia (C/O white dwarf) show silicon but no hydrogen; Type II (massive star) show hydrogen lines.",
  },
  ja: {
    title: "新星とスペクトルの指紋",
    kind: "表面のフラッシュと、超新星を名づける線",
    lede: "まず新星を見よう：白色矮星の表面に積もる水素、フラッシュ、そして星が生き延びてまた繰り返す様子。次に、Ia型とII型を見分けるスペクトルを読もう。",
    thread: "物語はつづく",
    threadText: "白色矮星の火がすべて致命的なわけではありません。ときには表面だけが燃える——フラッシュ、そして静けさ、そしてまたフラッシュ。そして星が本当に死ぬとき、その光はどう死んだかを名づける指紋を帯びます。",
    key: "新星（繰り返す表面フラッシュ）とIa／IIのスペクトルの指紋",
    keyText: "新星は超新星より穏やかです。伴星から引き寄せた水素が白色矮星の表面に積もり、やがて短い熱核フラッシュで点火します——でも燃えるのは表面の層だけなので、白色矮星は生き延び、何度も繰り返し噴出できます。超新星はそのスペクトルで名づけられます：Ia型は水素のない炭素・酸素の白色矮星から生じるので、スペクトルに水素線はなく強いケイ素の吸収を示します；II型は水素の外層をまだ持つ大質量星から生じるので、水素線を示します。",
    modeNova: "新星", modeIa: "Ia型スペクトル", modeII: "II型スペクトル",
    wd: "白色矮星", hShell: "水素の層",
    building: "水素が積もっていく…", flash: "新星フラッシュ——星は生き延びる",
    recur: "表面が燃え、矮星は生き延びる → 繰り返す",
    wavelength: "波長 →", intensity: "強度",
    siLine: "Si（ケイ素）", hLine: "H（水素）",
    iaNote: "Ia型：水素なし、強いケイ素の吸収", iiNote: "II型：水素線あり",
    note: "新星は、積もった水素が繰り返す表面のフラッシュで、白色矮星はそのまま残ります。超新星のスペクトルは指紋です：Ia型（C/O白色矮星）はケイ素を示すが水素はなし、II型（大質量星）は水素線を示します。",
  },
};

function drawNova(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.5, cy = H * 0.46;
  // cycle: build then flash (period ~200 frames)
  const phase = (tt % 220) / 220;
  const flashing = phase > 0.82;
  const build = clamp(phase / 0.82, 0, 1);

  if (flashing) {
    const f = (phase - 0.82) / 0.18;
    const R = 24 + f * 70;
    const g = ctx.createRadialGradient(cx, cy, 2, cx, cy, R);
    g.addColorStop(0, `rgba(255,255,255,${1 - f})`);
    g.addColorStop(0.5, `rgba(255,220,120,${0.7 * (1 - f)})`);
    g.addColorStop(1, "rgba(255,160,80,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
  }
  // hydrogen layer building up (orange ring thickening)
  const wdR = 16;
  const shellT = 2 + build * 10;
  ctx.fillStyle = flashing ? "rgba(255,200,120,0.4)" : "rgba(255,170,90,0.55)";
  ctx.beginPath(); ctx.arc(cx, cy, wdR + shellT, 0, Math.PI * 2); ctx.fill();
  // white dwarf
  const g2 = ctx.createRadialGradient(cx - 4, cy - 4, 2, cx, cy, wdR);
  g2.addColorStop(0, "#f2f8ff"); g2.addColorStop(0.7, "#cfe2ff"); g2.addColorStop(1, "#8fb6ea");
  ctx.fillStyle = g2; ctx.beginPath(); ctx.arc(cx, cy, wdR, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = "#cfe3ff"; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.wd, cx, cy + wdR + shellT + 20);
  ctx.fillStyle = flashing ? C.sun : "#ffb46e"; ctx.font = `12px ${mono}`;
  ctx.fillText(flashing ? t.flash : t.building, cx, 26);
  ctx.fillStyle = C.good; ctx.font = `11px ${mono}`;
  ctx.fillText(t.recur, cx, H - 10);
}

function drawSpectrum(ctx, cw, H, type, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const x0 = 20, x1 = cw - 20, y0 = 36, y1 = H - 52;
  // continuum rainbow band
  const bandH = 40;
  const grad = ctx.createLinearGradient(x0, 0, x1, 0);
  grad.addColorStop(0, "#5a6cff"); grad.addColorStop(0.3, "#58c6ff");
  grad.addColorStop(0.55, "#8dffba"); grad.addColorStop(0.75, "#ffe58a"); grad.addColorStop(1, "#ff7a5a");
  ctx.fillStyle = grad; ctx.fillRect(x0, y0, x1 - x0, bandH);
  // absorption lines (dark vertical bars) per type
  // positions as fractions across the band
  const lines = type === "Ia"
    ? [{ f: 0.34, lab: t.siLine, c: "#ffffff" }, { f: 0.5, lab: t.siLine, c: "#ffffff" }]
    : [{ f: 0.22, lab: t.hLine, c: "#ffffff" }, { f: 0.46, lab: t.hLine, c: "#ffffff" }, { f: 0.68, lab: t.hLine, c: "#ffffff" }];
  lines.forEach((ln) => {
    const lx = x0 + ln.f * (x1 - x0);
    ctx.fillStyle = "rgba(6,10,22,0.92)"; ctx.fillRect(lx - 3, y0, 6, bandH);
    ctx.strokeStyle = type === "Ia" ? C.cool : C.sun; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(lx, y0 + bandH); ctx.lineTo(lx, y1); ctx.stroke();
    ctx.fillStyle = type === "Ia" ? C.cool : C.sun; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(ln.lab, lx, y1 + 16);
  });
  // axes labels
  ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(t.wavelength, x0, y0 - 10);
  // type note
  ctx.fillStyle = type === "Ia" ? C.cool : C.sun; ctx.font = `12px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(type === "Ia" ? t.iaNote : t.iiNote, cw / 2, H - 14);
}

export function NovaAndTypeSpectra() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("nova");
  const modeRef = useRef("nova"); modeRef.current = mode;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (mode === "nova") {
      if (reduceMotion) { drawNova(ctx, cw, H, 120, lang); return; }
      let raf, tt = 0;
      const loop = () => { tt += 1; if (modeRef.current === "nova") drawNova(ctx, cw, H, tt, lang); raf = requestAnimationFrame(loop); };
      loop();
      return () => cancelAnimationFrame(raf);
    } else {
      drawSpectrum(ctx, cw, H, mode === "ia" ? "Ia" : "II", lang);
    }
  }, [cw, mode, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 03</div>
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
          <button onClick={() => setMode("nova")} style={{ ...styles.chip, ...(mode === "nova" ? styles.chipOn : {}) }}>{t.modeNova}</button>
          <button onClick={() => setMode("ia")} style={{ ...styles.chip, ...(mode === "ia" ? styles.chipOn : {}) }}>{t.modeIa}</button>
          <button onClick={() => setMode("ii")} style={{ ...styles.chip, ...(mode === "ii" ? styles.chipOn : {}) }}>{t.modeII}</button>
        </div>

        <div style={{ marginTop: 10 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default NovaAndTypeSpectra;
