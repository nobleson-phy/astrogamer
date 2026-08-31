/* ============================================================
   STATION 4 — CLOUD DECKS & COLOURS
   The visible clouds of Jupiter and Saturn are frozen AMMONIA
   crystals. Their colours come from PHOTOCHEMISTRY — solar UV
   driving reactions among the gases into tinted organic compounds.
   Above the cloud-topped troposphere lies the stratosphere, the
   coldest layer. Saturn looks blander ("butterscotch") because its
   lower gravity stretches the layers into a thick masking smog.
   Grounded in Ch.11 §11.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Cloud decks & colours",
    kind: "Ammonia clouds and painted skies",
    lede: "The bright bands you see are ammonia ice — but their colours are chemistry. Compare Jupiter's vivid belts with Saturn's muted butterscotch, and read the layers from clouds up to the icy stratosphere.",
    thread: "THE STORY CONTINUES",
    threadText: "The giants' famous stripes are weather made visible. What paints them is not the clouds themselves — pure ammonia is white — but a haze of chemistry cooked by sunlight.",
    key: "AMMONIA CLOUDS, COLOURED BY PHOTOCHEMISTRY",
    keyText: "The primary visible clouds on Jupiter and Saturn are frozen ammonia crystals. Pure ammonia is white; the colours come from PHOTOCHEMISTRY — solar ultraviolet light drives chemical reactions among the atmospheric gases, making tinted organic compounds. These clouds mark the top of the troposphere; above it lies the stratosphere, the coldest layer of the atmosphere. Jupiter's belts are bold, but Saturn looks a muted 'butterscotch': its lower gravity stretches the atmosphere over a longer vertical distance, building a thicker photochemical smog that masks the colourful clouds beneath.",
    jupiter: "Jupiter (vivid)", saturn: "Saturn (butterscotch)",
    strato: "stratosphere — coldest", tropo: "troposphere (weather)", clouds: "ammonia clouds", smog: "photochemical smog",
    note: "Ammonia makes the clouds; photochemistry makes the colours. Saturn's weaker gravity thickens its smog layer, so its bands are softer and more uniform than Jupiter's.",
  },
  ja: {
    title: "雲の層と色",
    kind: "アンモニアの雲と、彩られた空",
    lede: "見える明るい帯はアンモニアの氷——でもその色は化学です。木星の鮮やかな帯と土星の落ち着いたバタースコッチを比べ、雲から氷の成層圏まで層を読もう。",
    thread: "物語はつづく",
    threadText: "巨人の有名な縞は、目に見える気象です。それを彩るのは雲そのものではなく——純粋なアンモニアは白——日光が煮込んだ化学のもやです。",
    key: "アンモニアの雲、光化学で彩られる",
    keyText: "木星と土星の主な見える雲は、凍ったアンモニアの結晶です。純粋なアンモニアは白ですが、色は光化学から来ます——太陽の紫外線が大気のガスどうしの化学反応を促し、色のついた有機化合物をつくります。これらの雲は対流圏の上端を示し、その上には大気で最も冷たい層、成層圏があります。木星の帯は鮮やかですが、土星は落ち着いた「バタースコッチ」に見えます：低い重力が大気を縦に長く引き伸ばし、下の色鮮やかな雲を覆う厚い光化学スモッグをつくるからです。",
    jupiter: "木星（鮮やか）", saturn: "土星（バタースコッチ）",
    strato: "成層圏——最も冷たい", tropo: "対流圏（気象）", clouds: "アンモニアの雲", smog: "光化学スモッグ",
    note: "アンモニアが雲を、光化学が色をつくります。土星は重力が弱くスモッグ層が厚いので、帯は木星より柔らかく均一です。",
  },
};

function draw(ctx, cw, H, which, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // vertical atmosphere cross-section on the left, planet swatch on the right
  const colX = 24, colW = cw * 0.4, top = 16, bot = H - 16;
  const yOf = (fr) => bot - fr * (bot - top); // fr 0=bottom .. 1=top
  // stratosphere (top, cold, blue)
  ctx.fillStyle = "rgba(99,150,240,0.28)"; ctx.fillRect(colX, top, colW, yOf(0.72) - top);
  ctx.fillStyle = "#8fb4ff"; ctx.font = `10px ${mono}`; ctx.textAlign = "left"; ctx.fillText(t.strato, colX + 6, top + 14);
  // troposphere with cloud bands
  const smog = which === "saturn";
  const bandCols = smog ? ["#e8cf9a", "#dcc088", "#e8cf9a", "#dcc088"] : ["#e8b06a", "#a86a3a", "#e8cf9a", "#c98a4a"];
  for (let i = 0; i < 4; i++) { const y0 = yOf(0.72 - i * 0.15), y1 = yOf(0.72 - (i + 1) * 0.15); ctx.fillStyle = bandCols[i]; ctx.globalAlpha = smog ? 0.7 : 0.95; ctx.fillRect(colX, y1, colW, y0 - y1); ctx.globalAlpha = 1; }
  // ammonia cloud line
  ctx.strokeStyle = "#fff"; ctx.setLineDash([4, 3]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(colX, yOf(0.72)); ctx.lineTo(colX + colW, yOf(0.72)); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = "#fff"; ctx.fillText(t.clouds, colX + 6, yOf(0.72) - 4);
  // smog haze overlay for Saturn
  if (smog) { ctx.fillStyle = "rgba(220,200,150,0.35)"; ctx.fillRect(colX, yOf(0.72), colW, yOf(0.12) - yOf(0.72)); ctx.fillStyle = "#c9a86a"; ctx.font = `10px ${mono}`; ctx.fillText(t.smog, colX + 6, yOf(0.4)); }
  ctx.strokeStyle = "rgba(150,175,230,0.35)"; ctx.strokeRect(colX, top, colW, bot - top);
  ctx.fillStyle = C.faint; ctx.font = `10px ${mono}`; ctx.fillText(t.tropo, colX + 6, bot - 6);

  // planet swatch on the right
  const px = colX + colW + (cw - (colX + colW) - 20) / 2 + 10, py = H / 2, pr = Math.min((cw - (colX + colW) - 40) * 0.5, H * 0.4);
  ctx.save(); ctx.beginPath(); ctx.arc(px, py, pr, 0, Math.PI * 2); ctx.clip();
  for (let i = 0; i < 12; i++) {
    const yy = py - pr + (i / 12) * 2 * pr;
    const shade = which === "saturn" ? 205 + Math.sin(i) * 15 : 150 + Math.sin(i * 1.4 + tt * 0.01) * 60;
    ctx.fillStyle = which === "saturn" ? `rgb(${230},${205},${150})` : `rgb(${210},${shade * 0.7 | 0},${70})`;
    ctx.globalAlpha = which === "saturn" ? 0.8 : 0.9;
    ctx.fillRect(px - pr, yy, 2 * pr, (2 * pr) / 12 + 1); ctx.globalAlpha = 1;
  }
  if (which !== "saturn") { // Great Red Spot hint
    ctx.fillStyle = "rgba(200,80,50,0.85)"; ctx.beginPath(); ctx.ellipse(px + pr * 0.2, py + pr * 0.2, pr * 0.22, pr * 0.14, 0, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
  ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.beginPath(); ctx.arc(px, py, pr, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = C.muted; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(which === "saturn" ? t.saturn : t.jupiter, px, py + pr + 18);
}

export function CloudDecks() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [which, setWhich] = useState("jupiter");
  const whichRef = useRef(which); whichRef.current = which;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, which, 0, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, whichRef.current, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

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

        <div style={styles.pickerRow}>
          {[["jupiter", t.jupiter], ["saturn", t.saturn]].map(([id, label]) => (
            <button key={id} onClick={() => setWhich(id)}
              style={{ ...styles.chip, ...(which === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default CloudDecks;
