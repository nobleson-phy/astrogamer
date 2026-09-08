/* ============================================================
   STATION 2 — METEOR STORMS
   The dust along a comet's orbit is not spread evenly — it is clumpy.
   Each year Earth crosses the same stream, but the number of meteors
   depends on whether it hits a sparse gap or a dense knot. When Earth
   plows into a fresh, dense clump, the shower becomes a spectacular
   meteor STORM (as the Leonids sometimes do). All told, about 100 tons
   of meteoric material enters the atmosphere each day. Grounded in
   Ch.14 §14.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

// density of the clumpy stream at each "year" (0..11): occasional dense knots
const STREAM = [0.15, 0.1, 0.2, 0.95, 0.3, 0.12, 0.18, 0.55, 0.14, 0.1, 0.85, 0.2];

const STR = {
  en: {
    title: "Meteor storms",
    kind: "Why some years rain fire",
    lede: "Step through the years. Earth crosses the same comet stream every time — but the dust is clumpy, so most years are quiet and a rare year erupts into a storm.",
    thread: "THE STORY CONTINUES",
    threadText: "A comet leaves dust unevenly along its orbit — thick knots here, thin gaps there. Earth meets this ribbon on the same date each year, but never quite the same part of it.",
    key: "A CLUMPY STREAM MEANS STORMS SOME YEARS",
    keyText: "The meteoric dust along a comet's orbit is not evenly distributed — it is clumpy, with dense knots and sparse gaps. So although Earth crosses the stream on the same date every year, the intensity of the shower varies drastically from year to year: most years are modest, but occasionally Earth plows into a fresh, dense clump and the shower becomes a spectacular meteor STORM, as the Leonids have famously done. Across all sources, about 100 tons of meteoric material enters Earth's atmosphere every day.",
    year: "Year", rate: "This year's meteor rate",
    calm: "quiet year", normal: "good show", storm: "METEOR STORM!",
    influx: "Total influx: ≈ 100 tons of meteoric material per day",
    note: "Comet dust is clumpy, so a shower's strength swings year to year — and a dense knot brings a meteor storm. Overall, ~100 tons of space material hits the atmosphere daily.",
  },
  ja: {
    title: "流星嵐",
    kind: "ある年だけ火が降る理由",
    lede: "年を順に送ろう。地球は毎回同じ彗星の流れを横切りますが、塵は塊状なので、多くの年は静かで、まれな年が嵐に変わります。",
    thread: "物語はつづく",
    threadText: "彗星は軌道に沿って塵を不均一に残します——ここは濃い塊、あそこは薄い隙間。地球は毎年同じ日にこのリボンに出会いますが、まったく同じ部分ではありません。",
    key: "塊状の流れは、ある年に嵐を生む",
    keyText: "彗星の軌道に沿った隕石の塵は均等に分布していません——濃い塊と薄い隙間がある塊状です。だから地球は毎年同じ日に流れを横切っても、流星群の強さは年ごとに大きく変わります：多くの年は控えめですが、時に地球が新しく濃い塊に突入し、流星群は壮観な流星「嵐」になります。しし座流星群が有名にそうしたように。すべての源を合わせると、毎日およそ100トンの隕石物質が地球の大気に入ります。",
    year: "年", rate: "今年の流星の数",
    calm: "静かな年", normal: "よく見える", storm: "流星嵐！",
    influx: "総流入量：1日あたり隕石物質 ≈ 100トン",
    note: "彗星の塵は塊状なので、流星群の強さは年ごとに揺れ動きます——濃い塊は流星嵐をもたらします。全体では、毎日約100トンの宇宙物質が大気に入ります。",
  },
};

function draw(ctx, cw, H, tt, year, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const density = STREAM[year];
  // starry sky
  for (let i = 0; i < 30; i++) { const x = (i * 89) % cw, y = (i * 61) % H; ctx.fillStyle = "rgba(200,210,235,0.25)"; ctx.fillRect(x, y, 1, 1); }
  // ground
  const gy = H * 0.82;
  ctx.fillStyle = "#12161f"; ctx.fillRect(0, gy, cw, H - gy);
  // radiant
  const rx = cw * 0.5, ry = H * 0.18;
  const count = Math.round(4 + density * 46);
  // meteors, number scaled by density
  for (let i = 0; i < count; i++) {
    const seed = i * 999 + year * 31;
    const phase = ((tt * 2 + seed) % 120) / 120;
    const ang = 0.7 + ((seed % 100) / 100) * 1.7;
    const start = 20 + (seed % 40);
    const len = 120 + (seed % 120);
    const x0 = rx + Math.cos(ang) * (start + phase * len);
    const y0 = ry + Math.sin(ang) * (start + phase * len);
    if (y0 > gy) continue;
    const tx = rx + Math.cos(ang) * (start + phase * len - 16), ty = ry + Math.sin(ang) * (start + phase * len - 16);
    const g = ctx.createLinearGradient(tx, ty, x0, y0);
    g.addColorStop(0, "rgba(180,210,255,0)"); g.addColorStop(1, `rgba(225,238,255,${0.85 * (1 - phase)})`);
    ctx.strokeStyle = g; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(x0, y0); ctx.stroke();
  }
  ctx.fillStyle = C.sun; ctx.beginPath(); ctx.arc(rx, ry, 3, 0, Math.PI * 2); ctx.fill();
}

export function MeteorStorms() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [year, setYear] = useState(0);
  const yearRef = useRef(0);
  yearRef.current = year;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, 40, yearRef.current, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, tt, yearRef.current, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

  const density = STREAM[year];
  const label = density > 0.7 ? t.storm : density > 0.35 ? t.normal : t.calm;
  const labelCol = density > 0.7 ? C.bad : density > 0.35 ? C.good : C.muted;

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

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.year}</span>
          <input type="range" min="0" max="11" step="1" value={year}
            onChange={(e) => setYear(parseInt(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
          <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, width: 42, textAlign: "right" }}>+{year} yr</span>
        </div>
        <div style={{ fontFamily: mono, fontSize: 13, fontWeight: 700, color: labelCol, marginBottom: 8 }}>{t.rate}: {label}</div>

        <div style={{ marginTop: 4 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <div style={{ fontFamily: mono, fontSize: 11.5, color: C.cool, marginTop: 8 }}>{t.influx}</div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default MeteorStorms;
