/* ============================================================
   STATION 2 — THE ELECTROMAGNETIC SPECTRUM
   The same wave comes in every size. From radio (longest λ) through
   microwave, infrared, visible, ultraviolet and X-rays to gamma rays
   (shortest λ, ≤0.01 nm), it is one continuous spectrum. Shorter λ
   means higher frequency and higher energy. Visible light is a thin
   slice, split into ROY G BIV — Red (longest) to Violet (shortest).
   Earth's atmosphere is choosy: radio and visible pass through
   "windows," the ozone layer soaks up most ultraviolet, and X-rays
   and gamma rays are absorbed high up — so that astronomy must be
   done from space.
   Grounded in Ch.5 §5.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const BANDS = [
  { id: "radio",   col: "#6b7cff", en: "Radio",       ja: "電波",       range: { en: "λ > 1 m", ja: "λ > 1 m" },              energy: 1, ground: "yes" },
  { id: "micro",   col: "#4bd6d0", en: "Microwave",   ja: "マイクロ波", range: { en: "1 m – 1 mm", ja: "1 m – 1 mm" },        energy: 2, ground: "mostly" },
  { id: "ir",      col: "#ff9e2c", en: "Infrared",    ja: "赤外線",     range: { en: "1 mm – 700 nm", ja: "1 mm – 700 nm" }, energy: 3, ground: "partial" },
  { id: "visible", col: "#8fe36b", en: "Visible",     ja: "可視光",     range: { en: "700 – 400 nm", ja: "700 – 400 nm" },    energy: 4, ground: "yes" },
  { id: "uv",      col: "#c98bff", en: "Ultraviolet", ja: "紫外線",     range: { en: "400 – 10 nm", ja: "400 – 10 nm" },      energy: 5, ground: "ozone" },
  { id: "xray",    col: "#ff6bd6", en: "X-ray",       ja: "X線",        range: { en: "10 – 0.01 nm", ja: "10 – 0.01 nm" },    energy: 6, ground: "no" },
  { id: "gamma",   col: "#ff6b6b", en: "Gamma ray",   ja: "ガンマ線",   range: { en: "λ ≤ 0.01 nm", ja: "λ ≤ 0.01 nm" },      energy: 7, ground: "no" },
];

const ROYGBIV = [
  { c: "#ff4d4d", en: "Red",    ja: "赤" },
  { c: "#ff9e2c", en: "Orange", ja: "橙" },
  { c: "#ffe14d", en: "Yellow", ja: "黄" },
  { c: "#5fe89b", en: "Green",  ja: "緑" },
  { c: "#4ba8ff", en: "Blue",   ja: "青" },
  { c: "#6b7cff", en: "Indigo", ja: "藍" },
  { c: "#c98bff", en: "Violet", ja: "紫" },
];

const STR = {
  en: {
    title: "The electromagnetic spectrum",
    kind: "Radio (longest λ) → gamma rays (shortest λ)",
    lede: "One family of waves, stretched across an enormous range of sizes. Pick a band to see its wavelengths, its energy, and whether it can reach a telescope on the ground — or only one in space.",
    thread: "THE STORY CONTINUES",
    threadText: "Light is a wave — but that wave comes in every length imaginable. Stretch it out and it is a radio wave; squeeze it down and it becomes a gamma ray. Visible light, the sliver our eyes catch, is just one thin band in a vast spectrum.",
    key: "WHY WE LAUNCH TELESCOPES",
    keyText: "Our atmosphere is not equally clear to every wavelength. Radio and visible light pass through open 'windows,' but the ozone layer absorbs most ultraviolet, and X-rays and gamma rays are soaked up high in the air. To see the sky in those bands at all, we must observe from space.",
    pick: "Select a band:",
    rangeL: "Wavelength", energyL: "Relative energy", groundL: "Reaches the ground?",
    longer: "longer λ · lower energy", shorter: "shorter λ · higher energy",
    visTitle: "Visible light · ROY G BIV (longest → shortest)",
    visNote: "Red has the longest wavelength of visible light; violet the shortest. That order — Red, Orange, Yellow, Green, Blue, Indigo, Violet — is the whole rainbow.",
    g: {
      yes: "Yes — an open atmospheric window",
      mostly: "Mostly — passes through fairly well",
      partial: "Partial — water vapour blocks much of it",
      ozone: "Mostly blocked — the ozone layer absorbs most UV",
      no: "No — absorbed high up; observe from space",
    },
  },
  ja: {
    title: "電磁スペクトル",
    kind: "電波（最長 λ）→ ガンマ線（最短 λ）",
    lede: "一つの波の家族が、途方もない大きさの幅に広がっています。帯を選んで、その波長・エネルギー、そして地上の望遠鏡に届くのか——それとも宇宙でしか捉えられないのかを見てみよう。",
    thread: "物語はつづく",
    threadText: "光は波です——けれどその波は、想像しうるあらゆる長さで現れます。引き伸ばせば電波、縮めればガンマ線。私たちの目が捉える可視光は、広大なスペクトルの中のほんの一筋の帯にすぎません。",
    key: "望遠鏡を打ち上げる理由",
    keyText: "大気はすべての波長に等しく澄んでいるわけではありません。電波と可視光は開いた「窓」を通り抜けますが、オゾン層は紫外線の大半を吸収し、X線とガンマ線は上空で吸収されてしまいます。それらの帯で空を見るには、宇宙から観測しなければなりません。",
    pick: "帯を選ぶ：",
    rangeL: "波長", energyL: "相対エネルギー", groundL: "地上に届く？",
    longer: "長い λ・低エネルギー", shorter: "短い λ・高エネルギー",
    visTitle: "可視光・ROY G BIV（長い → 短い）",
    visNote: "赤は可視光で最も波長が長く、紫は最も短い。赤・橙・黄・緑・青・藍・紫——この順序が虹のすべてです。",
    g: {
      yes: "はい — 開いた大気の窓",
      mostly: "おおむね届く — かなりよく通り抜ける",
      partial: "一部 — 水蒸気が多くを遮る",
      ozone: "ほぼ遮られる — オゾン層が紫外線の大半を吸収",
      no: "いいえ — 上空で吸収。宇宙から観測する",
    },
  },
};

function drawSpectrum(ctx, cw, H, selId, lang) {
  ctx.clearRect(0, 0, cw, H);
  const pad = 8;
  const barY = 44, barH = H - 96;
  const segW = (cw - pad * 2) / BANDS.length;

  BANDS.forEach((b, i) => {
    const x = pad + i * segW;
    const on = b.id === selId;
    // segment fill
    ctx.fillStyle = on ? b.col : b.col + "66";
    ctx.fillRect(x + 1, barY, segW - 2, barH);
    if (on) {
      ctx.strokeStyle = "#fff"; ctx.lineWidth = 2;
      ctx.strokeRect(x + 1, barY, segW - 2, barH);
      ctx.shadowColor = b.col; ctx.shadowBlur = 16;
      ctx.strokeRect(x + 1, barY, segW - 2, barH);
      ctx.shadowBlur = 0;
    }
    // label
    ctx.save();
    ctx.translate(x + segW / 2, barY + barH + 14);
    ctx.font = `11px ${mono}`; ctx.textAlign = "center";
    ctx.fillStyle = on ? "#fff" : C.faint;
    ctx.fillText(lang === "ja" ? b.ja : b.en, 0, 0);
    ctx.restore();
  });

  // wavelength direction arrows
  ctx.font = `11px ${mono}`; ctx.fillStyle = C.faint;
  ctx.textAlign = "left"; ctx.fillText("← " + (lang === "ja" ? "長い λ" : "longer λ"), pad, 24);
  ctx.textAlign = "right"; ctx.fillText((lang === "ja" ? "短い λ" : "shorter λ") + " →", cw - pad, 24);
}

export function EMSpectrum() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 200;
  const canRef = useRef(null);
  const [sel, setSel] = useState("visible");
  const cw = Math.min(w, 760);
  const band = BANDS.find((b) => b.id === sel);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    drawSpectrum(ctx, cw, H, sel, lang);
  }, [cw, sel, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 02</div>
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

        <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginBottom: 4 }}>{t.pick}</div>
        <div style={{ ...styles.pickerRow, justifyContent: "flex-start" }}>
          {BANDS.map((b) => {
            const on = b.id === sel;
            return (
              <button key={b.id} onClick={() => setSel(b.id)}
                style={{ ...styles.chip, ...(on ? styles.chipOn : {}), ...(on ? { borderColor: b.col, background: b.col + "22" } : {}) }}>
                {lang === "ja" ? b.ja : b.en}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        {/* selected band readout */}
        <div style={{ marginTop: 14, border: `1px solid ${C.border}`, borderRadius: 12, background: "rgba(8,12,26,0.6)", padding: "14px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span style={{ width: 14, height: 14, borderRadius: 4, background: band.col, display: "inline-block" }} />
            <span style={{ fontFamily: display, fontSize: 21, color: "#fff" }}>{lang === "ja" ? band.ja : band.en}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid rgba(120,150,210,0.1)" }}>
            <span style={{ color: C.muted }}>{t.rangeL}</span>
            <span style={{ fontFamily: mono, color: C.text }}>{lang === "ja" ? band.range.ja : band.range.en}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid rgba(120,150,210,0.1)" }}>
            <span style={{ color: C.muted, minWidth: 110 }}>{t.energyL}</span>
            <div style={{ flex: 1, display: "flex", gap: 3 }}>
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <span key={n} style={{ flex: 1, height: 12, borderRadius: 2, background: n <= band.energy ? band.col : "rgba(120,150,210,0.15)" }} />
              ))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "8px 0 2px" }}>
            <span style={{ color: C.muted, whiteSpace: "nowrap" }}>{t.groundL}</span>
            <span style={{ fontSize: 14.5, textAlign: "right", color: (band.ground === "no" || band.ground === "ozone") ? C.danger : (band.ground === "yes" ? C.good : C.sun) }}>
              {t.g[band.ground]}
            </span>
          </div>
        </div>

        {/* ROYGBIV sub-band, only when visible is selected */}
        {sel === "visible" && (
          <div style={{ marginTop: 14, border: `1px solid ${C.border}`, borderRadius: 12, background: "rgba(8,12,26,0.6)", padding: "14px 16px" }}>
            <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1.2, color: C.faint, marginBottom: 10 }}>{t.visTitle}</div>
            <div style={{ display: "flex", height: 26, borderRadius: 6, overflow: "hidden" }}>
              {ROYGBIV.map((r, i) => (<span key={i} style={{ flex: 1, background: r.c }} />))}
            </div>
            <div style={{ display: "flex", marginTop: 6 }}>
              {ROYGBIV.map((r, i) => (
                <span key={i} style={{ flex: 1, textAlign: "center", fontFamily: mono, fontSize: 11.5, color: C.muted }}>
                  {lang === "ja" ? r.ja : r.en[0]}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 11.5, color: C.faint, marginTop: 4 }}>
              <span>{lang === "ja" ? "赤 · 長い λ" : "Red · long λ"}</span>
              <span>{lang === "ja" ? "紫 · 短い λ" : "Violet · short λ"}</span>
            </div>
            <p style={{ ...styles.note, maxWidth: "none", marginTop: 10 }}>{t.visNote}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EMSpectrum;
