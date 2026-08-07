/* ============================================================
   STATION 8 — ASTRONOMY vs ASTROLOGY
   Astrology is a pseudoscience: no verifiable evidence or theory
   supports planetary influence on human destiny — unlike astronomy,
   a science. Plus Hipparchus's legacy: the first great star catalog
   and the magnitude system (1 = brightest … 6 = faintest).
   Grounded in Ch.2 §2.3 & §2.2.
   ============================================================ */
import React, { useState } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono, display } from "../../../shared/theme.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const COMPARE = [
  {
    field: { en: "Basis", ja: "よりどころ" },
    astro: { en: "Observation, measurement and testable theory.", ja: "観測・測定と、検証できる理論。" },
    stro: { en: "Tradition and belief that planets shape human affairs.", ja: "惑星が人間の営みを左右するという伝統と信念。" },
  },
  {
    field: { en: "Evidence", ja: "証拠" },
    astro: { en: "Predictions are checked against nature and revised.", ja: "予測を自然と照合し、修正していく。" },
    stro: { en: "No verifiable evidence supports its claims.", ja: "その主張を裏づける検証可能な証拠はない。" },
  },
  {
    field: { en: "Status", ja: "位置づけ" },
    astro: { en: "A science.", ja: "科学。" },
    stro: { en: "A pseudoscience.", ja: "疑似科学。" },
  },
];

/* Hipparchus's six magnitude classes. Lower number = brighter. */
const MAGS = [
  { m: 1, label: { en: "Brightest stars", ja: "最も明るい星" } },
  { m: 2, label: { en: "Very bright", ja: "とても明るい" } },
  { m: 3, label: { en: "Bright", ja: "明るい" } },
  { m: 4, label: { en: "Moderate", ja: "中くらい" } },
  { m: 5, label: { en: "Faint", ja: "暗い" } },
  { m: 6, label: { en: "Faintest visible", ja: "肉眼で見える限界" } },
];

const STR = {
  en: {
    title: "Astronomy vs astrology",
    kind: "A science and a pseudoscience",
    lede: "They share ancient roots and the same night sky — but only one is a science. Compare them, then meet the astronomer who first catalogued the stars.",
    thread: "SCIENCE OR NOT?",
    threadText: "Astrology claims the planets steer human destiny. There is no verifiable evidence or theory to support that — which is exactly why it is a pseudoscience, not a science like astronomy.",
    astronomy: "Astronomy", astrology: "Astrology",
    pseudo: "THE KEY DIFFERENCE",
    pseudoText: "Astrology is a pseudoscience: there is no verifiable evidence or theory supporting planetary influence on human destiny — in contrast to astronomy, which is a science.",
    hippTitle: "HIPPARCHUS",
    hippText: "Hipparchus compiled a comprehensive star catalog and defined the magnitude system for stellar brightness — still used today.",
    scaleTitle: "The magnitude scale",
    scaleLede: "Click a class. In Hipparchus's system the brightest stars are magnitude 1 and the faintest the eye can see are magnitude 6 — so a smaller number means a brighter star.",
    magLabel: "Magnitude",
    brightest: "1 = brightest", faintest: "6 = faintest",
  },
  ja: {
    title: "天文学と占星術",
    kind: "科学と疑似科学",
    lede: "古い起源と同じ夜空を分かち合いながら——科学なのは一方だけです。両者を比べ、そして最初に星を体系的に記録した天文学者に出会おう。",
    thread: "科学か、そうでないか",
    threadText: "占星術は、惑星が人間の運命を左右すると主張します。それを裏づける検証可能な証拠も理論もありません——だからこそ、天文学のような科学ではなく、疑似科学なのです。",
    astronomy: "天文学", astrology: "占星術",
    pseudo: "決定的な違い",
    pseudoText: "占星術は疑似科学です——惑星が人間の運命に影響するという主張を裏づける、検証可能な証拠も理論も存在しません。科学である天文学とは対照的です。",
    hippTitle: "ヒッパルコス",
    hippText: "ヒッパルコスは包括的な星表を作成し、恒星の明るさを表す等級の体系を定めました——今日でも使われています。",
    scaleTitle: "等級のものさし",
    scaleLede: "階級をクリックしよう。ヒッパルコスの体系では、最も明るい星が1等、肉眼で見える最も暗い星が6等です——数が小さいほど明るい星です。",
    magLabel: "等級",
    brightest: "1 = 最も明るい", faintest: "6 = 最も暗い",
  },
};

function starRadius(m) { return 26 - (m - 1) * 3.4; }
function starAlpha(m) { return 1 - (m - 1) * 0.15; }

export function AstronomyAstrology() {
  const lang = useLang();
  const t = STR[lang];
  const [mag, setMag] = useState(1);
  const sel = MAGS[mag - 1];

  return (
    <div style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 08</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{t.threadText}</p>
        </div>
        <div style={styles.fateBox}>
          <div style={{ ...styles.fateLabel, color: C.danger }}>{t.pseudo}</div>
          <p style={styles.factText}>{t.pseudoText}</p>
        </div>
        <div style={{ ...styles.pathBox, marginTop: 14 }}>
          <div style={{ ...styles.fateLabel, color: C.sun }}>{t.hippTitle}</div>
          <p style={{ ...styles.keyTermText, margin: 0 }}>{t.hippText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        {/* compare panel */}
        <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "0.7fr 1fr 1fr" }}>
            <div style={{ padding: "10px 12px", background: "rgba(8,12,26,0.6)" }} />
            <div style={{ padding: "10px 12px", background: "rgba(95,211,154,0.12)", fontFamily: display, fontSize: 18, color: C.good }}>{t.astronomy}</div>
            <div style={{ padding: "10px 12px", background: "rgba(255,122,107,0.1)", fontFamily: display, fontSize: 18, color: C.danger }}>{t.astrology}</div>
            {COMPARE.map((row, i) => (
              <React.Fragment key={i}>
                <div style={{ padding: "10px 12px", fontFamily: mono, fontSize: 13, color: C.faint, borderTop: `1px solid ${C.border}` }}>{tr(row.field, lang)}</div>
                <div style={{ padding: "10px 12px", fontSize: 14.5, color: "#dbe4ff", borderTop: `1px solid ${C.border}` }}>{tr(row.astro, lang)}</div>
                <div style={{ padding: "10px 12px", fontSize: 14.5, color: "#dbe4ff", borderTop: `1px solid ${C.border}` }}>{tr(row.stro, lang)}</div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Hipparchus magnitude scale */}
        <div style={{ ...styles.pathBox, marginTop: 20 }}>
          <div style={styles.fateLabel}>{t.scaleTitle}</div>
          <p style={{ ...styles.keyTermText, margin: "0 0 8px" }}>{t.scaleLede}</p>
        </div>

        <div style={{
          height: 130, borderRadius: 12, marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center",
          background: "radial-gradient(circle at 50% 50%, rgba(255,207,107,0.08), rgba(3,5,12,0.7))", border: `1px solid ${C.border}`,
        }}>
          <svg width="60" height="60" viewBox="0 0 60 60">
            <defs>
              <radialGradient id="magstar"><stop offset="0%" stopColor="#fff" /><stop offset="45%" stopColor="#ffe08a" /><stop offset="100%" stopColor="rgba(0,0,0,0)" /></radialGradient>
            </defs>
            <circle cx="30" cy="30" r={starRadius(mag)} fill="url(#magstar)" opacity={starAlpha(mag)} />
            <circle cx="30" cy="30" r={Math.max(3, starRadius(mag) * 0.32)} fill="#fff" opacity={starAlpha(mag)} />
          </svg>
        </div>
        <div style={{ textAlign: "center", fontFamily: mono, fontSize: 14, color: C.sun, marginTop: 8 }}>
          {t.magLabel} {sel.m} — {tr(sel.label, lang)}
        </div>

        <div style={{ display: "flex", gap: 6, marginTop: 12, alignItems: "flex-end", justifyContent: "center" }}>
          {MAGS.map((mm) => {
            const on = mm.m === mag;
            return (
              <button key={mm.m} onClick={() => setMag(mm.m)} title={tr(mm.label, lang)}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                  background: "transparent", border: "none", cursor: "pointer", padding: "4px 6px",
                }}>
                <span style={{
                  width: 30 - (mm.m - 1) * 3, height: 30 - (mm.m - 1) * 3, borderRadius: "50%",
                  background: "#ffe08a", opacity: 1 - (mm.m - 1) * 0.13,
                  boxShadow: on ? "0 0 12px #ffe08a" : "none", border: on ? "2px solid #fff" : "none",
                }} />
                <span style={{ fontFamily: mono, fontSize: 12.5, color: on ? C.text : C.faint }}>{mm.m}</span>
              </button>
            );
          })}
        </div>
        <div style={{ ...styles.rangeEnds, marginTop: 6 }}>
          <span>{t.brightest}</span>
          <span>{t.faintest}</span>
        </div>
      </div>
    </div>
  );
}

export default AstronomyAstrology;
