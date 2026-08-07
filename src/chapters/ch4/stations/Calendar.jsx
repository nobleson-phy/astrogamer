/* ============================================================
   STATION 4 — THE CALENDAR
   The Julian calendar (Julius Caesar) approximated the year as 365.25
   days with a leap year every 4 years — slightly too long, so it
   drifted. The Gregorian calendar refined the leap rule: century years
   are leap years ONLY if divisible by 400 (so 1900 is not a leap year,
   2000 is). A live checker applies ÷4 / ÷100 / ÷400 and shows the drift.
   Grounded in Ch.4 §4.4.
   ============================================================ */
import React, { useState } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono, display } from "../../../shared/theme.js";
import { clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The calendar",
    kind: "Julian vs Gregorian · the leap-year rule",
    lede: "Type a year and watch two calendars judge it. The Julian rule is simple — every fourth year is a leap year. The Gregorian rule adds a twist for century years, and it is that twist that keeps our calendar in step with the sky.",
    thread: "THE STORY CONTINUES",
    threadText: "The Moon gives us the month, the Sun the year — but a year is 365.2422 days, not a tidy whole number. Every calendar is a clever bargain with that awkward fraction, and getting the bargain slightly wrong makes the seasons slowly slide off the dates.",
    key: "THE 400-YEAR FIX",
    keyText: "Julius Caesar's calendar used 365.25 days — a leap year every 4 years — but that is about 11 minutes too long each year, and by 1582 spring had drifted 10 days early. Pope Gregory's fix: a century year is a leap year only if it is divisible by 400. So 1700, 1800 and 1900 are ordinary years, while 1600 and 2000 are leap years.",
    yearLabel: "Test a year",
    julian: "Julian", gregorian: "Gregorian",
    leap: "Leap year (366 days)", common: "Common year (365 days)",
    rulesTitle: "How the Gregorian rule decides",
    rule4: "Divisible by 4?", rule100: "Divisible by 100?", rule400: "Divisible by 400?",
    yes: "yes", no: "no",
    verdictSame: "Both calendars agree.",
    verdictDiff: "The calendars disagree — this is a century year the Gregorian reform corrected.",
    driftTitle: "Why the Julian year drifts",
    driftNote: "The Julian year is ~11 minutes too long. Over centuries those minutes pile up into whole days, dragging the date of spring earlier and earlier — the very drift the Gregorian reform stopped.",
    tryTitle: "Try these:",
  },
  ja: {
    title: "暦（こよみ）",
    kind: "ユリウス暦 対 グレゴリオ暦・閏年の規則",
    lede: "年を入力すると、二つの暦がそれを判定します。ユリウス暦の規則は単純——4年ごとに閏年です。グレゴリオ暦は世紀年にひとひねり加え、そのひねりこそが暦を空と歩調を合わせ続けているのです。",
    thread: "物語はつづく",
    threadText: "月は「1か月」を、太陽は「1年」を与えます——ところが1年は365.2422日で、きりのよい整数ではありません。どの暦も、この厄介な端数との巧妙な取り引きであり、その取り引きを少し間違えると、季節が日付から徐々にずれていきます。",
    key: "400年の修正",
    keyText: "ユリウス・カエサルの暦は1年を365.25日——4年ごとに閏年——としましたが、これは毎年約11分長すぎ、1582年までに春が10日も早くずれていました。グレゴリウス教皇の修正：世紀年は400で割り切れる場合にのみ閏年とする。だから1700・1800・1900年は平年で、1600・2000年は閏年です。",
    yearLabel: "年を試す",
    julian: "ユリウス暦", gregorian: "グレゴリオ暦",
    leap: "閏年（366日）", common: "平年（365日）",
    rulesTitle: "グレゴリオ暦の判定のしくみ",
    rule4: "4で割り切れる？", rule100: "100で割り切れる？", rule400: "400で割り切れる？",
    yes: "はい", no: "いいえ",
    verdictSame: "両方の暦の判定が一致します。",
    verdictDiff: "二つの暦の判定が食い違います——これはグレゴリオ改暦が修正した世紀年です。",
    driftTitle: "なぜユリウス暦はずれるのか",
    driftNote: "ユリウス暦の1年は約11分長すぎます。何世紀もかけてその分がまるごと日数に積み上がり、春の日付をどんどん早めていきます——グレゴリオ改暦が止めたのは、まさにこのずれです。",
    tryTitle: "試してみよう：",
  },
};

function isJulianLeap(y) { return y % 4 === 0; }
function isGregorianLeap(y) { return y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0); }

const SAMPLES = [1900, 2000, 2024, 2100, 1600];

export function Calendar() {
  const lang = useLang();
  const t = STR[lang];
  const [year, setYear] = useState(1900);

  const jl = isJulianLeap(year), gl = isGregorianLeap(year);
  const div4 = year % 4 === 0, div100 = year % 100 === 0, div400 = year % 400 === 0;
  const disagree = jl !== gl;

  const setSafe = (v) => setYear(clamp(Math.round(v) || 0, 1, 4000));

  const verdict = (isLeap) => (
    <div style={{
      marginTop: 6, padding: "10px 12px", borderRadius: 10,
      border: `1px solid ${isLeap ? C.good : C.border}`,
      background: isLeap ? "rgba(95,211,154,0.12)" : "rgba(120,150,210,0.08)",
      fontFamily: mono, fontSize: 14.5, color: isLeap ? C.good : C.muted,
    }}>
      {isLeap ? "✓ " : "· "}{isLeap ? t.leap : t.common}
    </div>
  );

  const RuleRow = ({ label, val }) => (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid rgba(120,150,210,0.1)" }}>
      <span style={{ color: C.muted, fontSize: 14.5 }}>{label}</span>
      <span style={{ fontFamily: mono, fontSize: 14.5, color: val ? C.good : C.faint }}>{val ? t.yes : t.no}</span>
    </div>
  );

  return (
    <div style={styles.realmGrid}>
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
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 14 }}>{t.lede}</p>

        {/* year stepper */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontFamily: mono, fontSize: 13, color: C.faint }}>{t.yearLabel}</span>
          <button style={styles.iconBtn} onClick={() => setSafe(year - 1)}>−</button>
          <input
            type="number" value={year}
            onChange={(e) => setSafe(parseInt(e.target.value, 10))}
            style={{ width: 100, background: "rgba(8,12,26,0.8)", border: `1px solid ${C.borderBright}`, color: C.text, borderRadius: 9, padding: "8px 12px", fontFamily: mono, fontSize: 20, textAlign: "center" }}
          />
          <button style={styles.iconBtn} onClick={() => setSafe(year + 1)}>+</button>
        </div>

        {/* two verdicts */}
        <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 180px", border: `1px solid ${C.border}`, borderRadius: 12, background: "rgba(8,12,26,0.6)", padding: 14 }}>
            <div style={{ fontFamily: display, fontSize: 19, color: C.cool }}>{t.julian}</div>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, marginTop: 2 }}>÷4</div>
            {verdict(jl)}
          </div>
          <div style={{ flex: "1 1 180px", border: `1px solid ${disagree ? C.borderBright : C.border}`, borderRadius: 12, background: "rgba(8,12,26,0.6)", padding: 14 }}>
            <div style={{ fontFamily: display, fontSize: 19, color: C.violet }}>{t.gregorian}</div>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, marginTop: 2 }}>÷4 · ÷100 · ÷400</div>
            {verdict(gl)}
          </div>
        </div>

        <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 10, background: disagree ? "rgba(201,139,255,0.1)" : "rgba(99,211,240,0.06)", border: `1px solid ${disagree ? C.violet : C.border}`, fontSize: 14.5, color: C.text }}>
          {disagree ? t.verdictDiff : t.verdictSame}
        </div>

        {/* rule breakdown */}
        <div style={{ marginTop: 16, border: `1px solid ${C.border}`, borderRadius: 12, background: "rgba(8,12,26,0.6)", padding: "12px 16px" }}>
          <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1.5, color: C.faint, marginBottom: 6 }}>{t.rulesTitle}</div>
          <RuleRow label={t.rule4} val={div4} />
          <RuleRow label={t.rule100} val={div100} />
          <RuleRow label={t.rule400} val={div400} />
        </div>

        {/* samples */}
        <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginTop: 16 }}>{t.tryTitle}</div>
        <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
          {SAMPLES.map((y) => (
            <button key={y} onClick={() => setYear(y)}
              style={{ ...styles.chip, ...(year === y ? styles.chipOn : {}) }}>{y}</button>
          ))}
        </div>

        {/* drift note */}
        <div style={{ ...styles.fateBox, marginTop: 16 }}>
          <div style={styles.fateLabel}>{t.driftTitle}</div>
          <p style={styles.keyTermText}>{t.driftNote}</p>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
