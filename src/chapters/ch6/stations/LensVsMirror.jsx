/* ============================================================
   STATION 3 — LENS VS MIRROR
   Two ways to collect light. A REFRACTOR uses a LENS as its
   primary element, but a lens bends different colours by slightly
   different amounts, so red/green/blue focus at slightly different
   points — CHROMATIC ABERRATION. A REFLECTOR uses a curved MIRROR
   (Isaac Newton built the first successful reflecting telescope in
   1668) that reflects all colours to the same focus, so there is
   no chromatic aberration. All modern large professional telescopes
   are reflectors: a large lens sags under its own weight (it can
   only be supported at its edges, and both surfaces must be
   flawless) and suffers chromatic aberration, while a mirror can
   be supported across its whole back.
   Grounded in Ch.6 §6.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const RGB = ["#ff5a5a", "#3fe89b", "#5a8bff"]; // red, green, blue rays

const STR = {
  en: {
    title: "Lens vs mirror",
    kind: "Refractor vs reflector — and chromatic aberration",
    lede: "There are two ways to gather starlight: bend it with a lens, or bounce it off a mirror. Flip between them and watch what happens to the colours as they come to a focus.",
    thread: "THE STORY CONTINUES",
    threadText: "A telescope must bring light to a focus — but how? The very first telescopes used lenses, and they carried a flaw hidden in the glass. The fix, found in 1668, reshaped every great telescope that followed.",
    key: "A MIRROR HAS NO COLOUR ERROR",
    keyText: "A refractor uses a lens as its primary element, but glass bends different colours by different amounts, so red, green and blue focus at slightly different points — chromatic aberration. A reflector uses a curved mirror; Isaac Newton built the first successful one in 1668. A mirror reflects every colour to the same focus, so there is no chromatic aberration. Every large professional telescope is a reflector, because a big lens sags under its own weight and adds colour error, while a mirror can be supported across its whole back.",
    refr: "Refractor (lens)", refl: "Reflector (mirror)",
    focusR: "three focus points", focusM: "one shared focus",
    cap: {
      refractor: "A lens bends short wavelengths (blue) more than long ones (red), so the colours never meet at one point. The smear of separate colour foci is chromatic aberration.",
      reflector: "A curved mirror reflects all wavelengths by the same angle, so red, green and blue arrive together at a single focus — no chromatic aberration. This is why Newton turned to mirrors in 1668.",
    },
    aberL: "Chromatic aberration",
    yes: "Yes — colours split", no: "None — colours meet",
    newton: "Isaac Newton · first reflector · 1668",
    whyL: "Why every big telescope is a reflector",
    whyText: "A large lens can only be held at its edges, so it sags under its own weight, and both faces must be ground flawless — on top of the colour error. A mirror is supported across its whole back and has just one surface to perfect, so all modern giant telescopes use mirrors.",
  },
  ja: {
    title: "レンズと鏡",
    kind: "屈折式と反射式——そして色収差",
    lede: "星の光を集める方法は二つ——レンズで曲げるか、鏡で反射させるか。両者を切り替えて、光が焦点に向かうとき色に何が起きるかを見てみよう。",
    thread: "物語はつづく",
    threadText: "望遠鏡は光を焦点に結ばなければなりません——でも、どうやって？ 最初期の望遠鏡はレンズを使い、ガラスの中に隠れた欠点を抱えていました。1668年に見つかったその解決策が、後のすべての名望遠鏡の姿を変えました。",
    key: "鏡には色の誤差がない",
    keyText: "屈折望遠鏡は主要素子にレンズを使いますが、ガラスは色によって曲げ方が異なるため、赤・緑・青がわずかに違う点に焦点を結びます——これが色収差です。反射望遠鏡は曲面の鏡を使います。アイザック・ニュートンが1668年に最初の実用機を作りました。鏡はすべての色を同じ焦点に反射するので、色収差はありません。大型のプロ用望遠鏡がすべて反射式なのは、大きなレンズが自重でたわみ色の誤差も加わる一方、鏡は背面全体で支えられるからです。",
    refr: "屈折式（レンズ）", refl: "反射式（鏡）",
    focusR: "三つの焦点", focusM: "一つの共通焦点",
    cap: {
      refractor: "レンズは短い波長（青）を長い波長（赤）より強く曲げるため、色は一点で交わりません。分かれた色の焦点のにじみが色収差です。",
      reflector: "曲面の鏡はすべての波長を同じ角度で反射するので、赤・緑・青が一つの焦点にそろって届きます——色収差はありません。だからニュートンは1668年に鏡へと切り替えたのです。",
    },
    aberL: "色収差",
    yes: "あり — 色が分かれる", no: "なし — 色が一致",
    newton: "アイザック・ニュートン · 最初の反射望遠鏡 · 1668年",
    whyL: "大型望遠鏡がすべて反射式である理由",
    whyText: "大きなレンズは縁でしか支えられず自重でたわみ、両面を完璧に磨かねばならず、その上に色の誤差も加わります。鏡は背面全体で支えられ、磨くべき面も一つだけなので、現代の巨大望遠鏡はすべて鏡を用います。",
  },
};

function drawRefractor(ctx, cw, H, lang) {
  ctx.clearRect(0, 0, cw, H);
  const t = STR[lang];
  const midY = H / 2;
  const lensX = cw * 0.4;
  const halfH = Math.min(H * 0.34, 92);

  // incoming parallel white rays (three, stacked)
  const rays = [-halfH * 0.55, 0, halfH * 0.55];
  // lens body (biconvex ellipse)
  ctx.fillStyle = "rgba(201,139,255,0.14)"; ctx.strokeStyle = C.violet; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.ellipse(lensX, midY, 14, halfH, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

  // three colour foci at slightly different x (blue focuses nearest, red farthest)
  const fociX = [cw * 0.78, cw * 0.85, cw * 0.92]; // blue, green, red
  rays.forEach((ry) => {
    RGB.forEach((col, ci) => {
      // blue bends most -> nearest focus. RGB order is [red,green,blue]; map to foci
      const fx = ci === 0 ? fociX[2] : ci === 1 ? fociX[1] : fociX[0];
      ctx.strokeStyle = col; ctx.lineWidth = 1.4; ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.moveTo(0, midY + ry);
      ctx.lineTo(lensX, midY + ry);
      ctx.lineTo(fx, midY);
      ctx.stroke();
    });
  });
  ctx.globalAlpha = 1;

  // mark the three foci
  [["B", fociX[0], RGB[2]], ["G", fociX[1], RGB[1]], ["R", fociX[2], RGB[0]]].forEach(([lab, fx, col]) => {
    ctx.fillStyle = col; ctx.beginPath(); ctx.arc(fx, midY, 3.5, 0, Math.PI * 2); ctx.fill();
  });
  // label the spread
  ctx.strokeStyle = "rgba(255,122,107,0.6)"; ctx.setLineDash([3, 3]); ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(fociX[0], midY - 20); ctx.lineTo(fociX[2], midY - 20); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = C.danger; ctx.font = `12px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.focusR, (fociX[0] + fociX[2]) / 2, midY - 26);

  // labels
  ctx.fillStyle = C.violet; ctx.font = `12px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(lang === "ja" ? "レンズ" : "lens", lensX, midY + halfH + 16);
}

function drawReflector(ctx, cw, H, lang) {
  ctx.clearRect(0, 0, cw, H);
  const t = STR[lang];
  const midY = H / 2;
  const halfH = Math.min(H * 0.34, 92);
  const mirrorX = cw * 0.82;                 // concave mirror on the right
  const focusX = cw * 0.42;                  // shared focus in front of it
  const curve = 60;                          // how far the mirror bulges

  // concave mirror (arc opening left)
  ctx.strokeStyle = C.cool; ctx.lineWidth = 3;
  ctx.beginPath();
  for (let s = -1; s <= 1.0001; s += 0.05) {
    const y = midY + s * halfH;
    const x = mirrorX + curve * (s * s);     // parabola-ish, deeper at edges
    if (s === -1) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  // mirror backing sheen
  ctx.strokeStyle = "rgba(63,221,255,0.25)"; ctx.lineWidth = 6;
  ctx.beginPath();
  for (let s = -1; s <= 1.0001; s += 0.05) {
    const y = midY + s * halfH;
    const x = mirrorX + curve * (s * s) + 4;
    if (s === -1) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // three parallel white rays hit the mirror and reflect to one focus — all colours together
  const rays = [-halfH * 0.55, 0, halfH * 0.55];
  rays.forEach((ry) => {
    const hy = midY + ry;
    const hx = mirrorX + curve * ((ry / halfH) * (ry / halfH));
    // draw the three colours slightly offset so all are visible, but converging to same focus
    RGB.forEach((col, ci) => {
      const off = (ci - 1) * 1.6;
      ctx.strokeStyle = col; ctx.lineWidth = 1.3; ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.moveTo(0, hy + off);
      ctx.lineTo(hx, hy + off);
      ctx.lineTo(focusX, midY);
      ctx.stroke();
    });
  });
  ctx.globalAlpha = 1;

  // single shared focus
  const g = ctx.createRadialGradient(focusX, midY, 1, focusX, midY, 12);
  g.addColorStop(0, "#fff"); g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(focusX, midY, 12, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(focusX, midY, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.good; ctx.font = `12px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.focusM, focusX, midY - 16);

  // labels
  ctx.fillStyle = C.cool;
  ctx.fillText(lang === "ja" ? "鏡" : "mirror", mirrorX + 24, midY + halfH + 16);
}

export function LensVsMirror() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const [mode, setMode] = useState("refractor");   // refractor | reflector
  const cw = Math.min(w, 760);
  const isRefr = mode === "refractor";

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (isRefr) drawRefractor(ctx, cw, H, lang);
    else drawReflector(ctx, cw, H, lang);
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

        <div style={{ ...styles.pickerRow, justifyContent: "flex-start" }}>
          {[["refractor", t.refr, C.violet], ["reflector", t.refl, C.cool]].map(([id, label, col]) => {
            const on = id === mode;
            return (
              <button key={id} onClick={() => setMode(id)}
                style={{ ...styles.chip, ...(on ? styles.chipOn : {}), ...(on ? { borderColor: col, background: col + "22", color: "#fff" } : {}) }}>
                {label}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        {/* aberration readout */}
        <div style={{ marginTop: 14, border: `1px solid ${C.border}`, borderRadius: 12, background: "rgba(8,12,26,0.6)", padding: "14px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ fontFamily: mono, fontSize: 13, color: C.muted }}>{t.aberL}</span>
            <span style={{ fontSize: 15, fontFamily: mono, color: isRefr ? C.danger : C.good }}>
              {isRefr ? t.yes : t.no}
            </span>
          </div>
          <p style={{ ...styles.stageDesc, marginTop: 4, maxWidth: "none" }}>{isRefr ? t.cap.refractor : t.cap.reflector}</p>
          {!isRefr && <div style={{ fontFamily: mono, fontSize: 12.5, color: C.cool, marginTop: 6 }}>{t.newton}</div>}
        </div>

        {/* why reflectors note */}
        <div style={{ marginTop: 14, border: `1px solid ${C.border}`, borderRadius: 12, background: "rgba(8,12,26,0.6)", padding: "14px 16px" }}>
          <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1.2, color: C.faint, marginBottom: 8 }}>{t.whyL}</div>
          <p style={{ ...styles.note, maxWidth: "none", marginTop: 0 }}>{t.whyText}</p>
        </div>
      </div>
    </div>
  );
}

export default LensVsMirror;
