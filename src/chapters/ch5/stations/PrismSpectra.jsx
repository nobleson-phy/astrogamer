/* ============================================================
   STATION 6 — PRISM & SPECTRA
   Refraction is the bending of light as it passes from one transparent
   medium into another. A prism refracts different colours by different
   amounts (dispersion), fanning white light into a spectrum. Kirchhoff's
   three kinds of spectra:
     • continuous  — a hot, dense source (a smooth band of all colours)
     • emission    — a hot, thin gas (bright lines on darkness)
     • absorption  — a continuous source seen through a cooler thin gas
                     (dark lines cut into a continuous band)
   Grounded in Ch.5 §5.5.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The prism & the three spectra",
    kind: "Refraction splits light — continuous, emission, absorption",
    lede: "Send white light through a glass prism and it fans out into a rainbow: each colour bends by a slightly different amount. That fan is a spectrum — and its pattern of bright and dark bands tells us exactly what the source is made of.",
    thread: "THE STORY CONTINUES",
    threadText: "Colour told us a star's temperature. To read the rest of its message we must split that light apart. A prism does it by bending — refracting — each colour through a different angle, spreading a single white beam into the full band of the spectrum.",
    key: "READING A SPECTRUM",
    keyText: "Refraction is the bending of light as it crosses from one medium into another, and a prism bends short blue waves more than long red ones — that is dispersion. The spread-out light shows one of three patterns: a continuous rainbow from a hot dense source, bright emission lines from a hot thin gas, or a continuous band crossed by dark absorption lines when that light passes through cooler gas.",
    disperse: "White light refracts and disperses through the prism",
    pick: "Show spectrum type:",
    types: {
      continuous: { en: "Continuous", ja: "連続" },
      emission: { en: "Emission", ja: "輝線" },
      absorption: { en: "Absorption", ja: "吸収" },
    },
    caps: {
      continuous: "A hot, dense source (a glowing solid, liquid, or dense gas) emits every colour — a smooth, unbroken rainbow.",
      emission: "A hot, thin gas glows only at a few sharp wavelengths — bright coloured lines on a dark background.",
      absorption: "A continuous spectrum seen through a cooler thin gas: the gas removes its own wavelengths, leaving dark lines across the rainbow.",
    },
    white: "white light", gas: "thin gas", source: "hot source",
  },
  ja: {
    title: "プリズムと三種のスペクトル",
    kind: "屈折が光を分ける——連続・輝線・吸収",
    lede: "白色光をガラスのプリズムに通すと、虹のように広がります。色ごとに曲がる量がわずかに違うのです。この広がりがスペクトルであり、その明暗の帯の模様が、光源が何でできているかを正確に教えてくれます。",
    thread: "物語はつづく",
    threadText: "色は星の温度を教えてくれました。残りのメッセージを読むには、その光を分けなければなりません。プリズムはそれを「曲げる」ことで行います——各色を異なる角度に屈折させ、一本の白い光をスペクトルの全帯域へと広げるのです。",
    key: "スペクトルを読む",
    keyText: "屈折とは、光が一つの媒質から別の媒質へ移るときに曲がることです。プリズムは長い赤い波より短い青い波を大きく曲げます——これが分散です。広がった光は三つの模様のいずれかを示します。熱く密な光源からの連続的な虹、熱く希薄なガスからの明るい輝線、あるいはその光が冷たいガスを通るときに虹を横切る暗い吸収線です。",
    disperse: "白色光がプリズムで屈折し分散する",
    pick: "スペクトルの種類を表示：",
    types: {
      continuous: { en: "Continuous", ja: "連続" },
      emission: { en: "Emission", ja: "輝線" },
      absorption: { en: "Absorption", ja: "吸収" },
    },
    caps: {
      continuous: "熱く密な光源（白熱した固体・液体・高密度ガス）はすべての色を放ちます——切れ目のない滑らかな虹です。",
      emission: "熱く希薄なガスは、いくつかの鋭い波長でのみ光ります——暗い背景に明るい色の線が並びます。",
      absorption: "冷たい希薄なガスを通して見た連続スペクトル。ガスが自分の波長を取り除き、虹を横切る暗い線を残します。",
    },
    white: "白色光", gas: "希薄なガス", source: "熱い光源",
  },
};

/* wavelength (nm) → visible colour */
function wlColour(nm, alpha) {
  let r = 0, g = 0, b = 0;
  if (nm < 440) { r = -(nm - 440) / (440 - 380); b = 1; }
  else if (nm < 490) { g = (nm - 440) / (490 - 440); b = 1; }
  else if (nm < 510) { g = 1; b = -(nm - 510) / (510 - 490); }
  else if (nm < 580) { r = (nm - 510) / (580 - 510); g = 1; }
  else if (nm < 645) { r = 1; g = -(nm - 645) / (645 - 580); }
  else { r = 1; }
  return `rgba(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)},${alpha == null ? 1 : alpha})`;
}

/* emission / absorption sample lines (nm) */
const EMISSION_LINES = [410, 434, 486, 502, 589, 656];
const ABSORPTION_LINES = [396, 431, 486, 517, 589, 656];

function drawPrism(ctx, cw, H, t, lang) {
  ctx.clearRect(0, 0, cw, H);
  const midY = H / 2;

  // incoming white beam
  const enterX = cw * 0.30, enterY = midY;
  ctx.strokeStyle = "rgba(255,255,255,0.92)"; ctx.lineWidth = 3;
  ctx.shadowColor = "#fff"; ctx.shadowBlur = 8;
  ctx.beginPath(); ctx.moveTo(cw * 0.02, midY - 16); ctx.lineTo(enterX, enterY); ctx.stroke();
  ctx.shadowBlur = 0;

  // the triangular prism
  const ax = cw * 0.34, apexY = midY - 74, baseY = midY + 60;
  const leftX = ax, rightX = cw * 0.50;
  ctx.beginPath();
  ctx.moveTo((leftX + rightX) / 2, apexY);
  ctx.lineTo(leftX, baseY);
  ctx.lineTo(rightX, baseY);
  ctx.closePath();
  const g = ctx.createLinearGradient(leftX, apexY, rightX, baseY);
  g.addColorStop(0, "rgba(180,205,255,0.18)");
  g.addColorStop(1, "rgba(120,150,220,0.30)");
  ctx.fillStyle = g; ctx.fill();
  ctx.strokeStyle = "rgba(190,215,255,0.6)"; ctx.lineWidth = 1.5; ctx.stroke();

  // dispersed fan — several colours leaving the right face at different angles
  const exitX = (leftX + rightX) / 2 + 6, exitY = midY + 6;
  const fan = [
    [660, -0.02], [610, 0.02], [560, 0.06], [510, 0.10], [470, 0.15], [420, 0.20],
  ];
  fan.forEach(([nm, slope]) => {
    ctx.strokeStyle = wlColour(nm, 0.9); ctx.lineWidth = 2.4;
    ctx.shadowColor = wlColour(nm, 1); ctx.shadowBlur = 6;
    const endX = cw * 0.96;
    ctx.beginPath();
    ctx.moveTo(exitX, exitY);
    ctx.lineTo(endX, exitY + slope * (endX - exitX));
    ctx.stroke();
  });
  ctx.shadowBlur = 0;

  // labels
  ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillStyle = C.faint;
  ctx.fillText(t.white, cw * 0.14, midY - 24);
  ctx.textAlign = "left";
  ctx.fillStyle = C.muted;
  ctx.fillText("R", cw * 0.965, exitY - 0.02 * (cw * 0.96 - exitX) + 4);
  ctx.fillText("V", cw * 0.965, exitY + 0.20 * (cw * 0.96 - exitX) + 4);
}

function drawStrip(ctx, w, h, type) {
  ctx.clearRect(0, 0, w, h);
  const pad = 2;
  if (type === "emission") {
    // dark background with a few bright lines
    ctx.fillStyle = "#05070f"; ctx.fillRect(0, 0, w, h);
    EMISSION_LINES.forEach((nm) => {
      const x = pad + ((700 - nm) / (700 - 380)) * (w - 2 * pad);
      ctx.fillStyle = wlColour(nm, 1);
      ctx.shadowColor = wlColour(nm, 1); ctx.shadowBlur = 10;
      ctx.fillRect(x - 2, 0, 4, h);
    });
    ctx.shadowBlur = 0;
  } else {
    // continuous rainbow band
    for (let x = pad; x < w - pad; x++) {
      const nm = 700 - ((x - pad) / (w - 2 * pad)) * (700 - 380);
      ctx.fillStyle = wlColour(nm, 1);
      ctx.fillRect(x, 0, 1, h);
    }
    if (type === "absorption") {
      // dark absorption lines cut into the band
      ABSORPTION_LINES.forEach((nm) => {
        const x = pad + ((700 - nm) / (700 - 380)) * (w - 2 * pad);
        ctx.fillStyle = "rgba(5,6,13,0.92)";
        ctx.fillRect(x - 1.5, 0, 3, h);
      });
    }
  }
  // frame
  ctx.strokeStyle = "rgba(150,175,230,0.35)"; ctx.lineWidth = 1;
  ctx.strokeRect(0.5, 0.5, w - 1, h - 1);
}

export function PrismSpectra() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 240;
  const prismRef = useRef(null);
  const stripRef = useRef(null);
  const [type, setType] = useState("continuous");
  const cw = Math.min(w, 760);

  useEffect(() => {
    const c = prismRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    drawPrism(ctx, cw, H, t, lang);
  }, [cw, lang]);

  useEffect(() => {
    const c = stripRef.current;
    if (!c) return;
    const sw = Math.min(cw, 760), sh = 56;
    const ctx = setupCanvas(c, sw, sh);
    drawStrip(ctx, sw, sh, type);
  }, [cw, type]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 06</div>
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

        <canvas ref={prismRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, marginTop: 6, textAlign: "center" }}>{t.disperse}</div>

        <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginTop: 16, marginBottom: 2 }}>{t.pick}</div>
        <div style={{ ...styles.pickerRow, justifyContent: "flex-start" }}>
          {["continuous", "emission", "absorption"].map((id) => {
            const on = id === type;
            return (
              <button key={id} onClick={() => setType(id)}
                style={{ ...styles.chip, ...(on ? styles.chipOn : {}) }}>
                {t.types[id][lang]}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={stripRef} style={{ display: "block", maxWidth: "100%", borderRadius: 8, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <div style={{ marginTop: 12, border: `1px solid ${C.border}`, borderRadius: 12, background: "rgba(8,12,26,0.6)", padding: "12px 16px" }}>
          <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1.5, color: C.cool, marginBottom: 6 }}>
            {t.types[type][lang]}
          </div>
          <p style={{ ...styles.keyTermText, fontSize: 14.5 }}>{t.caps[type]}</p>
        </div>
      </div>
    </div>
  );
}

export default PrismSpectra;
