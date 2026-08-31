/* ============================================================
   STATION 8 — INFRARED EYES
   The cold giants glow in infrared, so infrared telescopes reveal
   their heat, weather and internal warmth. But any warm object
   radiates its own infrared — so an IR detector must be cooled to
   near absolute zero, or its own heat-glow would swamp the faint
   cosmic signal. Slide the temperature to see. Grounded in Ch.11 §11.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Infrared eyes",
    kind: "Why the detector must be frozen",
    lede: "So far from the Sun, the giants shine best in infrared — the light of heat. But a warm camera glows in infrared too. Slide the detector's temperature and watch its own glow drown the planet's faint signal.",
    thread: "THE STORY ENDS — FOR NOW",
    threadText: "To read the cold outer worlds we look in the infrared, where their own warmth shines. But that same trick sets a trap: our instruments are warm, and warmth is exactly what we're trying to detect.",
    key: "COOL THE DETECTOR OR IT BLINDS ITSELF",
    keyText: "The giant planets are cold and far, and much of what they emit — internal heat, weather patterns — comes out in the infrared. To catch those faint signals, infrared detectors on telescopes like the James Webb Space Telescope must be cooled to near absolute zero. The reason: every warm object radiates infrared, so a warm detector would flood itself with its OWN heat-glow and swamp the faint cosmic signal. Chilled to a few kelvin, the detector goes 'dark' and can finally see the planet's whisper of heat.",
    tempL: "Detector temperature", slider: "Cool the detector (300 K → 4 K):",
    warm: "room temp (300 K)", cold: "liquid helium (4 K)",
    selfGlow: "detector self-glow", signal: "planet signal",
    swamped: "SWAMPED by self-glow", clean: "CLEAN — signal visible",
    note: "Warm detectors glow in infrared and blind themselves; cooled near absolute zero they fall dark, letting the giants' faint heat come through. It's the same reason JWST runs so cold.",
  },
  ja: {
    title: "赤外線の目",
    kind: "なぜ検出器を凍らせるのか",
    lede: "太陽から遠いため、巨人は赤外線——熱の光——で最もよく輝きます。でも暖かいカメラも赤外線で光ります。検出器の温度を動かし、自らの輝きが惑星の弱い信号を呑み込む様子を見よう。",
    thread: "物語は（ひとまず）おわる",
    threadText: "冷たい外の世界を読むには、その暖かさが輝く赤外線で見ます。でも同じ手が罠になります：装置は暖かく、その暖かさこそ、私たちが検出しようとするものなのです。",
    key: "検出器を冷やせ、さもなくば自らを目くらます",
    keyText: "巨大惑星は冷たく遠く、放つものの多く——内部の熱、気象——は赤外線で出てきます。その弱い信号を捉えるため、ジェームズ・ウェッブ宇宙望遠鏡のような望遠鏡の赤外線検出器は、絶対零度近くまで冷やさねばなりません。理由：暖かい物体はみな赤外線を放つので、暖かい検出器は自らの熱の輝きであふれ、弱い宇宙の信号を呑み込んでしまうのです。数ケルビンまで冷やせば検出器は「暗く」なり、ついに惑星のかすかな熱を見られます。",
    tempL: "検出器の温度", slider: "検出器を冷やそう（300 K → 4 K）：",
    warm: "室温（300 K）", cold: "液体ヘリウム（4 K）",
    selfGlow: "検出器の自己発光", signal: "惑星の信号",
    swamped: "自己発光に呑まれる", clean: "クリーン——信号が見える",
    note: "暖かい検出器は赤外線で光って自らを目くらまし、絶対零度近くに冷やすと暗くなって、巨人のかすかな熱が通ります。JWSTがとても冷たく動く理由と同じです。",
  },
};

function draw(ctx, cw, H, tempK, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // self-glow rises steeply with temperature; signal is fixed & faint
  const glow = clamp((tempK - 30) / 270, 0, 1); // ~0 near 30K, 1 at 300K
  // frame: the "image" the detector produces
  const fx = 24, fy = 20, fw = cw - 48, fh = H - 70;
  // background = detector self-glow (reddish IR haze)
  const bg = ctx.createLinearGradient(0, fy, 0, fy + fh);
  bg.addColorStop(0, `rgba(${120 + glow * 120 | 0},${40 + glow * 40 | 0},20,${0.15 + glow * 0.8})`);
  bg.addColorStop(1, `rgba(${80 + glow * 120 | 0},20,10,${0.15 + glow * 0.8})`);
  ctx.fillStyle = "#05070f"; ctx.fillRect(fx, fy, fw, fh);
  ctx.fillStyle = bg; ctx.fillRect(fx, fy, fw, fh);
  // speckle noise proportional to glow
  for (let i = 0; i < glow * 260; i++) { ctx.fillStyle = `rgba(255,${120 + Math.random() * 80 | 0},60,0.5)`; ctx.fillRect(fx + Math.random() * fw, fy + Math.random() * fh, 2, 2); }
  // the planet signal: a faint warm giant, visible only when glow is low
  const px = fx + fw * 0.5, py = fy + fh * 0.5, pr = Math.min(fw, fh) * 0.18;
  const sigAlpha = clamp(1 - glow * 1.3, 0, 1);
  const pg = ctx.createRadialGradient(px, py, 2, px, py, pr);
  pg.addColorStop(0, `rgba(255,210,150,${0.5 + sigAlpha * 0.5})`); pg.addColorStop(1, "rgba(255,180,90,0)");
  ctx.globalAlpha = 0.4 + sigAlpha * 0.6; ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(px, py, pr, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1;
  ctx.strokeStyle = "rgba(150,175,230,0.35)"; ctx.strokeRect(fx, fy, fw, fh);
  // status label
  ctx.textAlign = "center"; ctx.font = `700 13px ${mono}`;
  ctx.fillStyle = glow > 0.4 ? C.danger : C.good; ctx.fillText(glow > 0.4 ? t.swamped : t.clean, cw / 2, H - 18);
  // temp readout
  ctx.textAlign = "left"; ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.fillText(t.tempL + ": ", fx + 4, fy + 16);
  ctx.fillStyle = tempK > 100 ? C.danger : C.cool; ctx.font = `700 14px ${mono}`; ctx.fillText(Math.round(tempK) + " K", fx + 120, fy + 16);
}

export function InfraredEyes() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [tempK, setTempK] = useState(300);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, tempK, 0, lang);
  }, [cw, tempK, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 08</div>
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

        <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginBottom: 2 }}>{t.slider}</div>
        <input type="range" min={4} max={300} step={2} value={tempK} onChange={(e) => setTempK(parseInt(e.target.value))} style={styles.range} />
        <div style={styles.rangeEnds}><span>{t.cold}</span><span>{t.warm}</span></div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <div style={{ fontFamily: mono, fontSize: 12.5, marginTop: 8, color: C.muted }}>
          <span style={{ color: "#ff8f5a" }}>▨</span> {t.selfGlow} &nbsp; <span style={{ color: "#ffd296" }}>●</span> {t.signal}
        </div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default InfraredEyes;
