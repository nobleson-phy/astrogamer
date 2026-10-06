/* ============================================================
   STATION 6 — THE TURNOFF CLOCK
   Because every star in a cluster is the same age, the H-R diagram becomes a
   clock. The most massive stars die first, so over time the MAIN-SEQUENCE
   TURNOFF — the point where stars peel off toward the red giants — creeps down
   to ever lower mass and luminosity. Read the mass at the turnoff and you read
   the cluster's age. The oldest globular clusters sit at 11–13 billion years,
   a strict lower bound on the age of the Universe. Grounded in Ch.22 §22.4.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The turnoff clock",
    kind: "An H-R diagram that tells time",
    lede: "Slide the cluster's age. The main-sequence turnoff creeps down as the heaviest stars die first — and that turnoff point tells you the age.",
    thread: "THE STORY CONTINUES",
    threadText: "If every star in a cluster was born together, then the diagram of the survivors is a clock. The higher the surviving stars still burning, the younger the cluster.",
    key: "THE MAIN-SEQUENCE TURNOFF = THE CLUSTER'S CLOCK",
    keyText: "Since all cluster stars share one birthday, the H-R diagram is a clock. Massive stars die first, so as the cluster ages the MAIN-SEQUENCE TURNOFF — the point where stars leave the main sequence toward the red giants — moves steadily down to lower mass and luminosity. Read the mass at the turnoff and you read the age. The very oldest globular clusters have turnoffs at ages of 11–13 billion years, which places a strict LOWER BOUND on the age of the Universe: the cosmos must be at least as old as its oldest stars.",
    age: "Cluster age",
    hot: "hot", cool: "cool", lum: "luminosity →",
    turnoff: "turnoff", giants: "red giants",
    young: "young cluster", old: "ancient globular",
    bound: "oldest globulars: 11–13 Gyr → lower bound on the age of the Universe",
    note: "All cluster stars are the same age, so the turnoff is a clock: massive stars die first and the turnoff creeps downward with time. The oldest globulars turn off at 11–13 Gyr, a firm minimum age for the Universe.",
  },
  ja: {
    title: "転回点の時計",
    kind: "時を告げるH–R図",
    lede: "星団の年齢を動かそう。最も重い星が先に死ぬので、主系列転回点は下へ進みます——その転回点が年齢を告げます。",
    thread: "物語はつづく",
    threadText: "星団のどの星も一緒に生まれたなら、生き残った星の図は時計になります。まだ燃えている生き残りの星が高い位置にあるほど、星団は若いのです。",
    key: "主系列転回点 ＝ 星団の時計",
    keyText: "星団のすべての星が同じ誕生日を持つので、H–R図は時計になります。大質量星が先に死ぬので、星団が年を取るにつれ、主系列転回点——星が主系列を離れて赤色巨星へ向かう点——は、より低い質量と光度へと着実に下がります。転回点の質量を読めば、年齢が読めます。最も古い球状星団の転回点は110〜130億年の年齢を示し、これは宇宙の年齢に厳しい下限を置きます：宇宙は、その最も古い星と少なくとも同じだけ古くなければなりません。",
    age: "星団の年齢",
    hot: "高温", cool: "低温", lum: "光度 →",
    turnoff: "転回点", giants: "赤色巨星",
    young: "若い星団", old: "古代の球状星団",
    bound: "最も古い球状星団：110–130億年 → 宇宙の年齢の下限",
    note: "星団の星はすべて同じ年齢なので、転回点は時計です：大質量星が先に死に、転回点は時とともに下へ進みます。最も古い球状星団は110〜130億年で転回し、宇宙の確かな最小年齢を与えます。",
  },
};

// age in Gyr -> turnoff fraction (1 = high-mass top; 0 = low-mass bottom)
function turnoffFrac(ageGyr) {
  // turnoff mass M where lifetime = age: t = 10/M^3 Gyr -> M = (10/age)^(1/3)
  const M = Math.pow(10 / ageGyr, 1 / 3);
  // map mass 0.5..10 to fraction 0..1 (log)
  return clamp((Math.log10(M) - Math.log10(0.6)) / (Math.log10(10) - Math.log10(0.6)), 0, 1);
}

function draw(ctx, cw, H, ageGyr, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const x0 = 52, x1 = cw - 18, y0 = 22, y1 = H - 40;
  ctx.strokeStyle = "rgba(150,175,230,0.35)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0, y1); ctx.lineTo(x1, y1); ctx.stroke();
  ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`;
  ctx.textAlign = "left"; ctx.fillText(t.hot, x0 + 2, y1 + 16);
  ctx.textAlign = "right"; ctx.fillText(t.cool, x1, y1 + 16);
  ctx.save(); ctx.translate(x0 - 38, (y0 + y1) / 2); ctx.rotate(-Math.PI / 2); ctx.textAlign = "center"; ctx.fillText(t.lum, 0, 0); ctx.restore();
  const px = (f) => x1 - f * (x1 - x0);
  const py = (f) => y1 - f * (y1 - y0);
  const fTO = turnoffFrac(ageGyr);
  // lower main sequence still present: from f=0.03 up to fTO
  ctx.lineCap = "round";
  const grad = ctx.createLinearGradient(px(1), py(1), px(0), py(0));
  grad.addColorStop(0, "#9bb4ff"); grad.addColorStop(0.5, "#fff2c8"); grad.addColorStop(1, "#ff8a52");
  ctx.strokeStyle = grad; ctx.lineWidth = 8;
  ctx.beginPath(); ctx.moveTo(px(fTO), py(fTO)); ctx.lineTo(px(0.04), py(0.04)); ctx.stroke();
  // the part above the turnoff is GONE — draw faint dashed ghost
  ctx.strokeStyle = "rgba(150,175,230,0.18)"; ctx.lineWidth = 2; ctx.setLineDash([4, 4]);
  ctx.beginPath(); ctx.moveTo(px(fTO), py(fTO)); ctx.lineTo(px(0.97), py(0.97)); ctx.stroke(); ctx.setLineDash([]);
  ctx.lineCap = "butt";
  // red giant branch curving up-right (cool) from the turnoff
  ctx.strokeStyle = "#ff7a5a"; ctx.lineWidth = 3; ctx.beginPath();
  for (let s = 0; s <= 1; s += 0.05) {
    const f = fTO + (0.35) * s;
    const tfrac = fTO - 0.18 * s; // move cooler (toward right) as it rises
    const x = px(Math.max(tfrac, 0.02)), y = py(Math.min(f + 0.12 * s, 0.99));
    if (s === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.fillStyle = "#ff7a5a"; ctx.font = `10px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(t.giants, px(Math.max(fTO - 0.18, 0.02)) + 6, py(Math.min(fTO + 0.35 + 0.12, 0.99)));
  // turnoff marker
  const tx = px(fTO), ty = py(fTO);
  ctx.fillStyle = C.sun; ctx.beginPath(); ctx.arc(tx, ty, 6, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(tx, ty, 9, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = C.sun; ctx.font = `11px ${mono}`; ctx.textAlign = tx > cw * 0.6 ? "right" : "left";
  ctx.fillText(t.turnoff, tx + (tx > cw * 0.6 ? -14 : 14), ty - 6);
  // age readout
  const young = ageGyr < 2;
  ctx.fillStyle = C.text; ctx.font = `12px ${mono}`; ctx.textAlign = "center";
  const ageStr = lang === "ja" ? `${ageGyr.toFixed(1)}0億年` : `${ageGyr.toFixed(1)} Gyr`;
  ctx.fillText(`${t.age}: ${ageStr}  ·  ${young ? t.young : (ageGyr >= 10 ? t.old : "")}`, cw / 2, H - 6);
}

export function TurnoffClock() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 270;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [age, setAge] = useState(4.6);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, age, lang);
  }, [cw, age, lang]);

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

        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "4px 0 8px" }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.age}</span>
          <input type="range" min="0.1" max="13" step="0.1" value={age}
            onChange={(e) => setAge(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
          <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, width: 74, textAlign: "right" }}>{age.toFixed(1)} {lang === "ja" ? "0億年" : "Gyr"}</span>
        </div>

        <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />

        <div style={{ fontFamily: mono, fontSize: 11.5, color: C.sun, marginTop: 8 }}>{t.bound}</div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default TurnoffClock;
