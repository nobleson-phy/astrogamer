/* ============================================================
   STATION 4 — PLATE TECTONICS
   Alfred Wegener proposed continental drift in 1912 but had no
   mechanism, so he was dismissed. We now know the crust is broken
   into plates: new crust is born at rift zones and old crust is
   destroyed at subduction zones; transform faults (San Andreas)
   grind sideways. Restless crust also erases impact craters.
   Grounded in Ch.8 §8.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const RATE = 5; // cm per year (San Andreas relative motion)

const BOUND = {
  rift: { en: "Rift zone", ja: "海嶺（拡大帯）", en_t: "Plates pull APART; molten rock rises to fill the gap, creating brand-new crust (mostly on the sea floor).", ja_t: "プレートが引き離れ、溶けた岩石が隙間を満たして新しい地殻をつくる（多くは海底で）。" },
  subduction: { en: "Subduction zone", ja: "沈み込み帯", en_t: "One plate dives BENEATH another and is destroyed, recycled back into the mantle — the crust's graveyard.", ja_t: "一方のプレートが他方の下に潜り込んで壊され、マントルへ戻される——地殻の墓場。" },
  transform: { en: "Transform fault", ja: "トランスフォーム断層", en_t: "Plates grind PAST each other sideways. Stress builds until it releases in a sudden lurch — an earthquake. The San Andreas is one.", ja_t: "プレートが横にすれ違う。応力がたまり、突然のずれ——地震——で解放される。サンアンドレアス断層はその一つ。" },
};

const STR = {
  en: {
    title: "Plate tectonics",
    kind: "A cracked, drifting, self-renewing crust",
    lede: "Wegener saw that the continents fit together like puzzle pieces — and was mocked for it. Explore the three plate boundaries, then wind the San Andreas clock to see how strain turns into a quake.",
    thread: "THE STORY CONTINUES",
    threadText: "In 1912 Alfred Wegener argued the continents drift; lacking a mechanism, he was ridiculed for decades. The mechanism turned out to be the mantle's slow churn, breaking the crust into plates that are endlessly born and destroyed.",
    key: "BORN AT RIFTS, DESTROYED AT SUBDUCTION ZONES",
    keyText: "Earth's crust is broken into moving plates. New crust is created at rift zones, where plates pull apart and magma wells up; old crust is destroyed at subduction zones, where one plate dives under another back into the mantle. Transform faults like the San Andreas slide sideways, storing strain that releases as earthquakes. This constant renewal is also why impact craters are rare on Earth — tectonics and weathering erase them, unlike on the dead, unchanging Moon.",
    boundL: "Boundary type",
    sanTitle: "San Andreas strain clock", rateL: "Relative plate motion", yearsL: "Years of built-up strain", slipL: "Sudden slip needed to release it",
    yr: "yr", mPerYr: "cm/yr", m: "m",
    note: "At about 5 cm per year, strain quietly accumulates along the fault. After 140 years that is 5 cm × 140 = 700 cm — so roughly 7 metres of sudden slip are needed to release it in one great earthquake.",
  },
  ja: {
    title: "プレートテクトニクス",
    kind: "割れ、移動し、自ら生まれ変わる地殻",
    lede: "ウェゲナーは大陸がパズルのピースのように合わさることに気づき——そして嘲笑されました。3つのプレート境界を調べ、サンアンドレアスの時計を進めて、応力がどう地震になるかを見よう。",
    thread: "物語はつづく",
    threadText: "1912年、アルフレート・ウェゲナーは大陸が移動すると論じました。しくみを示せなかったため、何十年も嘲られました。そのしくみとは、マントルのゆっくりした対流で、地殻を、絶えず生まれては壊されるプレートに割っていたのです。",
    key: "海嶺で生まれ、沈み込み帯で壊される",
    keyText: "地球の地殻は動くプレートに割れています。新しい地殻は、プレートが離れてマグマが湧き上がる海嶺で生まれ、古い地殻は、一方が他方の下に潜る沈み込み帯でマントルへ戻され壊されます。サンアンドレアスのようなトランスフォーム断層は横にすべり、ためた応力を地震として解放します。この絶え間ない更新は、地球で衝突クレーターが少ない理由でもあります——変化しない死んだ月と違い、テクトニクスと風化が消し去るのです。",
    boundL: "境界の種類",
    sanTitle: "サンアンドレアス応力時計", rateL: "プレートの相対運動", yearsL: "たまった応力の年数", slipL: "解放に必要な突然のずれ",
    yr: "年", mPerYr: "cm/年", m: "m",
    note: "年に約5 cmで、応力は断層に静かにたまります。140年後は 5 cm × 140 = 700 cm——だから一度の大地震で解放するには、約7メートルの突然のずれが必要です。",
  },
};

function drawBoundary(ctx, cw, H, kind, tt) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, midY = H / 2;
  const plateH = 46, off = Math.sin(tt * 0.04) * 8;
  ctx.fillStyle = "#b98a55";
  const drawPlate = (x, y, wdt, arrowDir, label) => {
    ctx.fillRect(x, y, wdt, plateH);
    ctx.strokeStyle = "rgba(0,0,0,0.3)"; ctx.lineWidth = 1; ctx.strokeRect(x, y, wdt, plateH);
    if (arrowDir) {
      ctx.strokeStyle = C.cool; ctx.lineWidth = 2.5;
      const ay = y - 12, ax = x + wdt / 2;
      ctx.beginPath(); ctx.moveTo(ax - arrowDir * 18, ay); ctx.lineTo(ax + arrowDir * 18, ay); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(ax + arrowDir * 18, ay); ctx.lineTo(ax + arrowDir * 10, ay - 5); ctx.lineTo(ax + arrowDir * 10, ay + 5); ctx.closePath(); ctx.fillStyle = C.cool; ctx.fill();
    }
  };
  // mantle background
  ctx.fillStyle = "#7a3f1c"; ctx.fillRect(0, midY + plateH, cw, H - midY - plateH);
  if (kind === "rift") {
    drawPlate(20 - off, midY, cx - 40, -1);
    drawPlate(cx + 20 + off, midY, cx - 40, 1);
    // magma rising in the gap
    const g = ctx.createLinearGradient(cx, H, cx, midY - 10);
    g.addColorStop(0, "#ff6b3a"); g.addColorStop(1, "#ffcf6b");
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(cx - 16 - off, midY + plateH); ctx.lineTo(cx + 16 + off, midY + plateH); ctx.lineTo(cx + 6, midY); ctx.lineTo(cx - 6, midY); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "#ffcf6b"; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText("new crust ↑", cx, midY - 20);
  } else if (kind === "subduction") {
    drawPlate(20, midY, cx - 20, 1);
    // right plate dives under
    ctx.save(); ctx.fillStyle = "#8a6a45";
    ctx.translate(cx, midY); ctx.rotate(0.5);
    ctx.fillRect(0, 0, cx, plateH); ctx.restore();
    ctx.strokeStyle = C.danger; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(cx + 40, midY - 12); ctx.lineTo(cx + 8, midY + 6); ctx.stroke();
    ctx.fillStyle = C.danger; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText("destroyed ↓", cx + 60, midY + 30);
  } else {
    // transform: two plates offset, sliding opposite (into/out of page shown as horizontal shear)
    drawPlate(20, midY - plateH / 2 - 2, cx - 20, 0);
    ctx.save(); ctx.translate(0, off); drawPlate(cx, midY + plateH / 2 + 2, cx - 20, 0); ctx.restore();
    ctx.strokeStyle = C.violet; ctx.lineWidth = 2; ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(cx, midY - plateH); ctx.lineTo(cx, midY + plateH); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = C.violet; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText("← grinding past →", cx, midY - plateH - 6);
  }
}

export function PlateTectonics() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 200;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [kind, setKind] = useState("rift");
  const [years, setYears] = useState(140);

  const slip = (RATE * years) / 100; // metres

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    const animated = kind === "rift" || kind === "transform";
    if (reduceMotion || !animated) { drawBoundary(ctx, cw, H, kind, 0); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; drawBoundary(ctx, cw, H, kind, tt); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, kind, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 04</div>
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

        <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, marginBottom: 4 }}>{t.boundL}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {Object.keys(BOUND).map((id) => (
            <button key={id} onClick={() => setKind(id)}
              style={{ ...styles.chip, ...(kind === id ? styles.chipOn : {}) }}>{lang === "ja" ? BOUND[id].ja : BOUND[id].en}</button>
          ))}
        </div>

        <div style={{ marginTop: 10 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>
        <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.5, marginTop: 6 }}>{lang === "ja" ? BOUND[kind].ja_t : BOUND[kind].en_t}</p>

        {/* San Andreas calculator */}
        <div style={{ marginTop: 12, border: `1px solid ${C.border}`, borderRadius: 12, background: "rgba(8,12,26,0.6)", padding: "12px 16px" }}>
          <div style={{ fontFamily: mono, fontSize: 12.5, letterSpacing: 1, color: C.violet, marginBottom: 8 }}>{t.sanTitle}</div>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap", marginBottom: 8 }}>
            <div><span style={{ fontFamily: mono, fontSize: 11, color: C.faint }}>{t.rateL}</span><div style={{ fontFamily: mono, fontSize: 16, color: C.cool }}>{RATE} {t.mPerYr}</div></div>
            <div><span style={{ fontFamily: mono, fontSize: 11, color: C.faint }}>{t.yearsL}</span><div style={{ fontFamily: mono, fontSize: 16, color: C.text }}>{years} {t.yr}</div></div>
            <div><span style={{ fontFamily: mono, fontSize: 11, color: C.faint }}>{t.slipL}</span><div style={{ fontFamily: mono, fontSize: 22, color: C.sun }}>{slip.toFixed(1)} {t.m}</div></div>
          </div>
          <input type="range" min={0} max={300} step={5} value={years} onChange={(e) => setYears(parseInt(e.target.value))} style={styles.range} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default PlateTectonics;
