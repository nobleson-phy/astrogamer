/* ============================================================
   STATION 1 — THE INSTRUMENT SYSTEM
   A modern astronomical instrument is three parts working in
   sequence: (1) the TELESCOPE — a "light bucket" whose most
   important job is to COLLECT faint light and focus it into an
   image (not to magnify); (2) a WAVELENGTH-SORTING instrument
   such as a spectrometer, which separates the light by colour;
   and (3) a DETECTOR — a CCD that records the image permanently.
   The whole system rides on a sturdy, stable MOUNT, because at
   high magnification the tiniest vibration would shake the target
   out of the tiny field of view. Modern astronomers rarely look
   through an eyepiece: digital detectors give a permanent, more
   efficient, more accurate record than the human eye.
   Grounded in Ch.6 §6.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STAGES = [
  { id: "scope",    col: C.cool,   en: "Telescope",   ja: "望遠鏡" },
  { id: "sorter",   col: C.violet, en: "Spectrometer", ja: "分光器" },
  { id: "detector", col: C.sun,    en: "CCD detector", ja: "CCD検出器" },
];

const STR = {
  en: {
    title: "The instrument system",
    kind: "Telescope → wavelength sorter → detector",
    lede: "A research instrument is not one gadget but a chain of three. Follow a beam of starlight left to right: it is gathered, split into colours, and finally recorded. Tap a stage to see what each one does.",
    thread: "THE STORY BEGINS",
    threadText: "We have learned what light is and what it carries. Now we ask the practical question: how do we actually catch it? Every discovery in this chapter starts here — with the machine that turns faint starlight into data we can study.",
    key: "COLLECT, DON'T MAGNIFY",
    keyText: "A telescope's most important job is to collect faint light and focus it into an image — not to magnify. The system has three parts in sequence: the telescope (a light bucket), a wavelength-sorting instrument like a spectrometer, and a detector (a CCD) that records the image. All of it rides on a stable mount, because at high magnification the slightest vibration would jog the target clean out of the tiny field of view.",
    pick: "Highlight a stage:",
    mountL: "Sturdy, stable mount",
    photonNote: "Starlight flows left → right through the chain.",
    eyeL: "Why not just look through it?",
    eyeText: "Modern astronomers rarely look through the eyepiece. A digital detector gives a permanent record, and it is far more efficient and accurate than the human eye.",
    desc: {
      scope: "The telescope is a light bucket. Its wide aperture gathers faint light from a distant source and brings it to a focus, forming an image. Bigger is better — because collecting light, not magnifying it, is the point.",
      sorter: "A wavelength-sorting instrument — a spectrometer or a set of filters — separates the incoming light by colour, spreading it into a spectrum so its composition, motion and temperature can be read.",
      detector: "A detector, almost always a CCD (charge-coupled device), records the sorted light as a permanent digital image — far more efficient and accurate than the human eye.",
    },
    role: {
      scope: "Collects & focuses light",
      sorter: "Sorts light by wavelength",
      detector: "Records the image (CCD)",
    },
  },
  ja: {
    title: "観測装置システム",
    kind: "望遠鏡 → 波長を分ける装置 → 検出器",
    lede: "研究用の装置は一つの機械ではなく、三つの連なりです。星の光の流れを左から右へ追ってみよう——集められ、色に分けられ、最後に記録されます。段階をタップして、それぞれの役割を見てみよう。",
    thread: "物語のはじまり",
    threadText: "光が何であり、何を運ぶのかを学びました。では現実的な問いを立てよう——それをどうやって実際に捕まえるのか。この章のすべての発見はここから始まります。かすかな星の光を、研究できるデータへと変える機械から。",
    key: "拡大ではなく、集光",
    keyText: "望遠鏡の最も重要な役割は、かすかな光を集めて像に結ぶことであり、拡大することではありません。システムは三つの部分が順に並びます——望遠鏡（光のバケツ）、分光器のような波長を分ける装置、そして像を記録する検出器（CCD）。そのすべてが安定した架台に載っています。高倍率ではわずかな振動でも、対象が小さな視野から外れてしまうからです。",
    pick: "段階を選ぶ：",
    mountL: "頑丈で安定した架台",
    photonNote: "星の光は左 → 右へと連なりを流れていきます。",
    eyeL: "なぜ直接のぞかないのか？",
    eyeText: "現代の天文学者が接眼レンズをのぞくことはほとんどありません。デジタル検出器は恒久的な記録を残し、人の目よりはるかに効率がよく正確だからです。",
    desc: {
      scope: "望遠鏡は光のバケツです。広い口径が遠くの天体からのかすかな光を集めて焦点に結び、像をつくります。大きいほど良い——大切なのは拡大ではなく集光だからです。",
      sorter: "波長を分ける装置——分光器やフィルターの組——は、入ってくる光を色に分け、スペクトルへ広げます。こうしてその組成・運動・温度を読み取れるようになります。",
      detector: "検出器、ほぼ必ずCCD（電荷結合素子）が、分けられた光を恒久的なデジタル像として記録します。人の目よりはるかに効率がよく正確です。",
    },
    role: {
      scope: "光を集めて焦点に結ぶ",
      sorter: "光を波長ごとに分ける",
      detector: "像を記録する（CCD）",
    },
  },
};

/* draw the light path flowing left→right through three stages, on a mount */
function drawSystem(ctx, cw, H, sel, lang, phase) {
  ctx.clearRect(0, 0, cw, H);
  const t = STR[lang];
  const pad = 14;
  const boxW = (cw - pad * 2 - 24) / 3;   // three boxes + two gaps
  const boxH = 96;
  const boxY = 40;
  const midY = boxY + boxH / 2;

  // incoming starlight (a little star at far left)
  ctx.fillStyle = "#fff";
  ctx.beginPath(); ctx.arc(pad + 6, 20, 3, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.5)"; ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad + 6, 12); ctx.lineTo(pad + 6, 28);
  ctx.moveTo(pad - 2, 20); ctx.lineTo(pad + 14, 20);
  ctx.stroke();

  // connecting beam baseline
  ctx.strokeStyle = "rgba(150,175,230,0.28)"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(pad, midY); ctx.lineTo(cw - pad, midY); ctx.stroke();

  // three stage boxes
  const centers = [];
  STAGES.forEach((s, i) => {
    const x = pad + i * (boxW + 12);
    const cxi = x + boxW / 2;
    centers.push(cxi);
    const on = s.id === sel;

    ctx.fillStyle = on ? s.col + "26" : "rgba(8,12,26,0.85)";
    ctx.strokeStyle = on ? s.col : C.border;
    ctx.lineWidth = on ? 2.2 : 1.2;
    if (on) { ctx.shadowColor = s.col; ctx.shadowBlur = 16; }
    roundRect(ctx, x, boxY, boxW, boxH, 12);
    ctx.fill(); ctx.stroke();
    ctx.shadowBlur = 0;

    // little glyph per stage
    drawGlyph(ctx, s.id, cxi, midY - 6, on ? s.col : C.faint);

    // stage number badge
    ctx.fillStyle = on ? s.col : C.faint;
    ctx.font = `bold 12px ${mono}`; ctx.textAlign = "left";
    ctx.fillText(String(i + 1), x + 8, boxY + 16);

    // label under the box
    ctx.font = `13px ${mono}`; ctx.textAlign = "center";
    ctx.fillStyle = on ? "#fff" : C.muted;
    ctx.fillText(lang === "ja" ? s.ja : s.en, cxi, boxY + boxH + 18);

    // arrow to the next box
    if (i < STAGES.length - 1) {
      const ax = x + boxW + 2, bx = x + boxW + 10;
      ctx.strokeStyle = "rgba(150,175,230,0.5)"; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(ax, midY); ctx.lineTo(bx, midY); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(bx, midY); ctx.lineTo(bx - 4, midY - 3); ctx.lineTo(bx - 4, midY + 3);
      ctx.closePath(); ctx.fillStyle = "rgba(150,175,230,0.7)"; ctx.fill();
    }
  });

  // flowing photons along the beam (animated)
  const beamL = pad, beamR = cw - pad;
  for (let k = 0; k < 5; k++) {
    const fr = ((phase + k / 5) % 1);
    const px = beamL + fr * (beamR - beamL);
    // colour: white before sorter, rainbow after
    const sorterX = centers[1];
    let col = "#ffffff";
    if (px > sorterX) col = ["#ff6b6b", "#ffd23d", "#3fe89b", "#3fddff", "#c98bff"][k % 5];
    ctx.fillStyle = col;
    ctx.shadowColor = col; ctx.shadowBlur = 8;
    ctx.beginPath(); ctx.arc(px, midY, 3.2, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;
  }

  // the stable mount beneath (a pier / tripod)
  const mountY = boxY + boxH + 34;
  ctx.strokeStyle = "rgba(120,150,210,0.55)"; ctx.lineWidth = 2;
  const mcx = cw / 2;
  // horizontal bar the system sits on
  ctx.beginPath(); ctx.moveTo(pad + 20, mountY); ctx.lineTo(cw - pad - 20, mountY); ctx.stroke();
  // splayed legs
  ctx.beginPath();
  ctx.moveTo(mcx - 60, mountY); ctx.lineTo(mcx - 90, H - 8);
  ctx.moveTo(mcx + 60, mountY); ctx.lineTo(mcx + 90, H - 8);
  ctx.moveTo(mcx, mountY); ctx.lineTo(mcx, H - 8);
  ctx.stroke();
  // ground line
  ctx.strokeStyle = "rgba(120,150,210,0.28)";
  ctx.beginPath(); ctx.moveTo(pad, H - 8); ctx.lineTo(cw - pad, H - 8); ctx.stroke();

  ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.mountL, mcx, H - 12);
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawGlyph(ctx, id, cx, cy, col) {
  ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 1.6;
  if (id === "scope") {
    // a little tube tilted up
    ctx.save();
    ctx.translate(cx, cy); ctx.rotate(-0.5);
    ctx.strokeRect(-16, -7, 32, 14);
    ctx.beginPath(); ctx.arc(-16, 0, 7, Math.PI / 2, -Math.PI / 2); ctx.stroke();
    ctx.restore();
  } else if (id === "sorter") {
    // a prism splitting into rainbow
    ctx.beginPath();
    ctx.moveTo(cx - 6, cy + 9); ctx.lineTo(cx + 6, cy + 9); ctx.lineTo(cx, cy - 9);
    ctx.closePath(); ctx.stroke();
    const cols = ["#ff6b6b", "#ffd23d", "#3fe89b", "#3fddff", "#c98bff"];
    cols.forEach((c, i) => {
      ctx.strokeStyle = c; ctx.beginPath();
      ctx.moveTo(cx + 4, cy + 2); ctx.lineTo(cx + 18, cy - 6 + i * 3.2); ctx.stroke();
    });
  } else {
    // a CCD grid chip
    ctx.strokeStyle = col;
    ctx.strokeRect(cx - 11, cy - 9, 22, 18);
    for (let gx = -11 + 5.5; gx < 11; gx += 5.5) {
      ctx.beginPath(); ctx.moveTo(cx + gx, cy - 9); ctx.lineTo(cx + gx, cy + 9); ctx.stroke();
    }
    for (let gy = -9 + 6; gy < 9; gy += 6) {
      ctx.beginPath(); ctx.moveTo(cx - 11, cy + gy); ctx.lineTo(cx + 11, cy + gy); ctx.stroke();
    }
  }
}

export function TelescopeSystem() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 240;
  const canRef = useRef(null);
  const [sel, setSel] = useState("scope");
  const cw = Math.min(w, 760);
  const stage = STAGES.find((s) => s.id === sel);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { drawSystem(ctx, cw, H, sel, lang, 0.5); return; }
    let raf, tt = 0;
    const loop = () => {
      tt += 0.006;
      drawSystem(ctx, cw, H, sel, lang, tt % 1);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, sel, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 01</div>
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
          {STAGES.map((s) => {
            const on = s.id === sel;
            return (
              <button key={s.id} onClick={() => setSel(s.id)}
                style={{ ...styles.chip, ...(on ? styles.chipOn : {}), ...(on ? { borderColor: s.col, background: s.col + "22", color: "#fff" } : {}) }}>
                {lang === "ja" ? s.ja : s.en}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>
        <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, marginTop: 6, textAlign: "center" }}>{t.photonNote}</div>

        {/* selected stage readout */}
        <div style={{ marginTop: 14, border: `1px solid ${C.border}`, borderRadius: 12, background: "rgba(8,12,26,0.6)", padding: "14px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ width: 14, height: 14, borderRadius: 4, background: stage.col, display: "inline-block" }} />
            <span style={{ fontFamily: display, fontSize: 21, color: "#fff" }}>{lang === "ja" ? stage.ja : stage.en}</span>
            <span style={{ fontFamily: mono, fontSize: 12.5, color: stage.col }}>· {t.role[sel]}</span>
          </div>
          <p style={{ ...styles.stageDesc, marginTop: 4, maxWidth: "none" }}>{t.desc[sel]}</p>
        </div>

        {/* eye vs detector note */}
        <div style={{ marginTop: 14, border: `1px solid ${C.border}`, borderRadius: 12, background: "rgba(8,12,26,0.6)", padding: "14px 16px" }}>
          <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1.2, color: C.faint, marginBottom: 8 }}>{t.eyeL}</div>
          <p style={{ ...styles.note, maxWidth: "none", marginTop: 0 }}>{t.eyeText}</p>
        </div>
      </div>
    </div>
  );
}

export default TelescopeSystem;
