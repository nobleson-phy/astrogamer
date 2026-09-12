/* ============================================================
   STATION 6 — THE SOLAR CYCLE
   Heinrich Schwabe discovered that the number of sunspots rises and
   falls in a cycle averaging 11 years. But the magnetic polarity of
   leading spots reverses each cycle, so the full magnetic activity
   cycle is 22 years. The solar dynamo explains it: differential
   rotation winds up the internal field, convection buoys loops through
   the surface, and the global polarity flips every 11 years.
   Grounded in Ch.15 §15.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The solar cycle",
    kind: "11 years, or really 22",
    lede: "Scrub through the years. Sunspots swell and fade on an 11-year beat — but watch the magnetic polarity flip, revealing the true 22-year rhythm.",
    thread: "THE STORY CONTINUES",
    threadText: "Heinrich Schwabe wasn't even looking for it — he was hunting a planet inside Mercury's orbit. Instead he found the Sun's heartbeat: a steady rise and fall of sunspots.",
    cycleKey: "AN 11-YEAR COUNT, A 22-YEAR MAGNETIC CYCLE",
    cycleText: "Heinrich Schwabe discovered that the number of sunspots rises and falls in a cycle averaging about 11 years, from one minimum to the next. But there is more to it: the magnetic polarity of the leading sunspots in each hemisphere reverses from one 11-year cycle to the next. So the complete magnetic activity cycle actually lasts 22 years.",
    dynamoKey: "THE SOLAR DYNAMO WINDS UP THE FIELD",
    dynamoText: "The solar dynamo explains the cycle. Differential rotation stretches and winds the Sun's internal magnetic field lines around the star until they are tightly wound; convection then buoys loops of that field up through the surface, where they emerge as sunspots. The whole process drives a global magnetic polarity flip every 11 years — hence the 22-year magnetic cycle.",
    cycle: "Sunspot cycle", dynamo: "Solar dynamo",
    year: "Year", spots: "Sunspot number", pol: "leading-spot polarity",
    schwabe: "Schwabe discovered the ~11-year cycle",
    noteC: "Schwabe found the ~11-year sunspot cycle; because leading-spot polarity reverses each cycle, the full magnetic cycle is 22 years.",
    noteD: "The dynamo: differential rotation winds the internal field, convection lifts loops to the surface as sunspots, and the polarity flips every 11 years.",
  },
  ja: {
    title: "太陽周期",
    kind: "11年、いや本当は22年",
    lede: "年をスクラブしよう。黒点は11年の拍子で増えては消え——しかし磁極が反転する様子を見れば、本当の22年のリズムが見えます。",
    thread: "物語はつづく",
    threadText: "ハインリヒ・シュワーベはそれを探してさえいませんでした——水星の軌道の内側の惑星を追っていたのです。代わりに彼は太陽の鼓動を見つけました：黒点の着実な増減です。",
    cycleKey: "11年の数、22年の磁気周期",
    cycleText: "ハインリヒ・シュワーベは、黒点の数がある極小から次の極小まで平均約11年の周期で増減することを発見しました。しかし話はそれで終わりません：各半球の先行黒点の磁極が、11年周期ごとに反転します。だから完全な磁気活動周期は実際には22年続きます。",
    dynamoKey: "太陽ダイナモが磁場を巻き上げる",
    dynamoText: "太陽ダイナモが周期を説明します。差動回転が太陽の内部の磁力線を引き伸ばし、星のまわりにきつく巻き付けます。次に対流がその磁場のループを表面へ押し上げ、黒点として現れます。この過程全体が11年ごとに全球的な磁極反転を駆動します——ゆえに22年の磁気周期です。",
    cycle: "黒点周期", dynamo: "太陽ダイナモ",
    year: "年", spots: "黒点数", pol: "先行黒点の磁極",
    schwabe: "シュワーベが約11年周期を発見",
    noteC: "シュワーベが約11年の黒点周期を発見。先行黒点の磁極が周期ごとに反転するため、完全な磁気周期は22年です。",
    noteD: "ダイナモ：差動回転が内部磁場を巻き上げ、対流がループを表面へ黒点として持ち上げ、磁極が11年ごとに反転します。",
  },
};

function drawCycle(ctx, cw, H, year, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const x0 = 40, x1 = cw - 16, y0 = 24, y1 = H - 70;
  ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0, y1); ctx.lineTo(x1, y1); ctx.stroke();
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "left"; ctx.fillText(t.spots, x0 - 34, y0 + 4);
  // sunspot number curve: sin^2 with 11-yr period over 22 years
  const spot = (yr) => Math.pow(Math.sin(Math.PI * yr / 11), 2);
  ctx.strokeStyle = "#ffcf6b"; ctx.lineWidth = 2; ctx.beginPath();
  for (let i = 0; i <= 220; i++) { const yr = i / 10; const X = x0 + (yr / 22) * (x1 - x0); const Y = y1 - spot(yr) * (y1 - y0); if (i === 0) ctx.moveTo(X, Y); else ctx.lineTo(X, Y); }
  ctx.stroke();
  // polarity band: cycle 1 (0-11) one color, cycle 2 (11-22) reversed
  [[0, 11, "#8fbfff"], [11, 22, "#ff8f8f"]].forEach(([a, b, col]) => {
    ctx.fillStyle = col; ctx.globalAlpha = 0.12; ctx.fillRect(x0 + a / 22 * (x1 - x0), y0, (b - a) / 22 * (x1 - x0), y1 - y0); ctx.globalAlpha = 1;
  });
  // year axis ticks
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center";
  for (let yr = 0; yr <= 22; yr += 11) { const X = x0 + yr / 22 * (x1 - x0); ctx.fillText(`${yr}y`, X, y1 + 14); }
  ctx.fillText("11y", x0 + 11 / 22 * (x1 - x0), y1 + 14);
  // marker
  const mx = x0 + year / 22 * (x1 - x0), my = y1 - spot(year) * (y1 - y0);
  ctx.strokeStyle = C.sun; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(mx, y0); ctx.lineTo(mx, y1); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = C.sun; ctx.beginPath(); ctx.arc(mx, my, 4, 0, Math.PI * 2); ctx.fill();
  // polarity sun below
  const cycle1 = year < 11;
  const cxx = cw / 2, cyy = y1 + 44, R = 20;
  const g = ctx.createRadialGradient(cxx - 6, cyy - 6, 2, cxx, cyy, R); g.addColorStop(0, "#ffe08a"); g.addColorStop(1, "#e8952a");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cxx, cyy, R, 0, Math.PI * 2); ctx.fill();
  // leading (left) and following spots colored by polarity
  const lead = cycle1 ? "#3a6fd8" : "#d83a3a", follow = cycle1 ? "#d83a3a" : "#3a6fd8";
  ctx.fillStyle = lead; ctx.beginPath(); ctx.arc(cxx - 8, cyy, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = follow; ctx.beginPath(); ctx.arc(cxx + 8, cyy, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.muted; ctx.font = `9px ${mono}`; ctx.textAlign = "left"; ctx.fillText(t.pol + `: ${cycle1 ? "N/S" : "S/N"}`, cxx + R + 8, cyy + 3);
}

function drawDynamo(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2, R = Math.min(cw * 0.3, H * 0.42);
  const g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.2, cx, cy, R);
  g.addColorStop(0, "#ffe08a"); g.addColorStop(1, "#e8952a");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip();
  // field lines wound by differential rotation (increasing wind over time)
  const wind = 1 + (tt % 300) / 300 * 4;
  ctx.strokeStyle = "rgba(150,200,255,0.7)"; ctx.lineWidth = 1.4;
  for (let k = -3; k <= 3; k++) {
    ctx.beginPath();
    for (let i = 0; i <= 60; i++) {
      const f = i / 60; const lat = (k / 4) * R * 0.8;
      const x = cx - R + f * 2 * R;
      const y = cy + lat + Math.sin(f * Math.PI * wind + k) * 8;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  // a loop breaking through surface near the top when wound enough
  if (wind > 3) {
    ctx.strokeStyle = "rgba(255,220,150,0.9)"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, cy - R * 0.5, 14, Math.PI, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = "#2a1c0e"; ctx.beginPath(); ctx.arc(cx - 14, cy - R * 0.5, 3, 0, Math.PI * 2); ctx.arc(cx + 14, cy - R * 0.5, 3, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
  ctx.fillStyle = C.cool; ctx.font = `9px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(lang === "ja" ? "差動回転が磁場を巻き上げる → ループが黒点として現れる" : "differential rotation winds the field → loops surface as sunspots", cx, H - 10);
}

export function SolarCycle() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 270;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("cycle");
  const [year, setYear] = useState(3);
  const yearRef = useRef(3); yearRef.current = year;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (mode === "cycle") { draw(); return; }
    if (reduceMotion) { drawDynamo(ctx, cw, H, 150, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; drawDynamo(ctx, cw, H, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
    function draw() { drawCycle(ctx, cw, H, yearRef.current, lang); }
  }, [cw, mode, lang]);

  // redraw cycle when year changes
  useEffect(() => {
    if (mode !== "cycle") return;
    const c = canRef.current; if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    drawCycle(ctx, cw, H, year, lang);
  }, [year, mode, cw, lang]);

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
          <div style={{ ...styles.fateLabel, color: C.sun }}>{mode === "cycle" ? t.cycleKey : t.dynamoKey}</div>
          <p style={styles.keyTermText}>{mode === "cycle" ? t.cycleText : t.dynamoText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          {[["cycle", t.cycle], ["dynamo", t.dynamo]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        {mode === "cycle" && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "10px 0 4px" }}>
            <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.year}</span>
            <input type="range" min="0" max="22" step="0.5" value={year}
              onChange={(e) => setYear(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
            <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, width: 40, textAlign: "right" }}>{year}y</span>
          </div>
        )}

        <div style={{ marginTop: 8 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <div style={{ fontFamily: mono, fontSize: 11.5, color: C.faint, marginTop: 8 }}>{t.schwabe}</div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{mode === "cycle" ? t.noteC : t.noteD}</p>
      </div>
    </div>
  );
}

export default SolarCycle;
