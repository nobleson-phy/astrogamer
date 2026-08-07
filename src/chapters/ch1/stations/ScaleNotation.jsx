/* ============================================================
   STATION 2 — SCALE & SCIENTIFIC NOTATION
   Powers-of-ten stepper (icons + plain & scientific notation),
   cycled with Prev/Next, then a story bridge into the shared
   CosmicScale realm (Earth → the observable universe).
   Grounded in Ch.1 §1.4 (Numbers) and §1.6 (A Tour of the Universe).
   ============================================================ */
import React, { useState } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono, display } from "../../../shared/theme.js";
import { clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel, Row } from "../../../shared/ui.jsx";
import { CosmicScale } from "../../../shared/interactives/index.js";

/* Representative objects, keyed by the power of ten of their size in km.
   Earth (1.3×10^4 km) and one light-year (9.46×10^12 km) are labeled stops. */
const STOPS = [
  { icon: "ruler", exp: 0, name: { en: "A one-metre ruler", ja: "1メートルの物差し" }, plain: { en: "0.001 km (1 m)", ja: "0.001 km（1 m）" }, sci: "1×10⁰ m", tint: "#63d3f0" },
  { icon: "whale", exp: 1, name: { en: "A blue whale", ja: "シロナガスクジラ" }, plain: { en: "≈ 0.03 km (30 m)", ja: "約 0.03 km（30 m）" }, sci: "3×10¹ m", tint: "#63d3f0" },
  { icon: "mountain", exp: 3, name: { en: "Mount Everest", ja: "エベレスト" }, plain: { en: "≈ 9 km tall", ja: "高さ 約 9 km" }, sci: "9×10³ m", tint: "#8ad0ff" },
  { icon: "earth", exp: 4, name: { en: "Earth", ja: "地球" }, plain: { en: "≈ 13,000 km across", ja: "直径 約 13,000 km" }, sci: "1.3×10⁴ km", tint: "#4a8fd4", key: true },
  { icon: "sun", exp: 6, name: { en: "The Sun", ja: "太陽" }, plain: { en: "≈ 1,400,000 km across", ja: "直径 約 140万 km" }, sci: "1.4×10⁶ km", tint: "#ffcf6b" },
  { icon: "au", exp: 8, name: { en: "Earth–Sun distance", ja: "地球と太陽の距離" }, plain: { en: "≈ 150,000,000 km", ja: "約 1億5000万 km" }, sci: "1.5×10⁸ km", tint: "#ffab5e" },
  { icon: "lightyear", exp: 12, name: { en: "One light-year", ja: "1光年" }, plain: { en: "≈ 9,460,000,000,000 km", ja: "約 9兆4600億 km" }, sci: "9.46×10¹² km", tint: "#b58cf0", key: true },
];

/* ---------- icons ---------- */
function StopIcon({ id, tint, size = 108 }) {
  const p = { width: size, height: size, viewBox: "0 0 100 100" };
  switch (id) {
    case "ruler":
      return (
        <svg {...p}>
          <rect x="14" y="42" width="72" height="16" rx="2" fill={tint} opacity="0.22" stroke={tint} strokeWidth="1.5" />
          {Array.from({ length: 8 }, (_, k) => (
            <line key={k} x1={22 + k * 8} y1="42" x2={22 + k * 8} y2={k % 2 ? "50" : "54"} stroke={tint} strokeWidth="1.5" />
          ))}
        </svg>
      );
    case "whale":
      return (
        <svg {...p}>
          <path d="M14 56 C 20 40, 46 34, 64 42 C 74 46, 84 46, 90 40 C 86 52, 78 56, 68 56 C 60 64, 34 66, 20 60 Z" fill={tint} opacity="0.9" />
          <path d="M64 42 C 70 36, 74 34, 80 34 C 78 40, 74 43, 68 44 Z" fill={tint} />
          <circle cx="26" cy="52" r="1.8" fill="#0a0e1c" />
          <path d="M40 40 q 3 -8 7 -9" fill="none" stroke={tint} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        </svg>
      );
    case "mountain":
      return (
        <svg {...p}>
          <path d="M12 76 L 42 30 L 58 54 L 70 40 L 90 76 Z" fill={tint} opacity="0.85" />
          <path d="M42 30 L 34 42 L 42 46 L 48 40 L 42 30 Z" fill="#ffffff" opacity="0.9" />
          <path d="M70 40 L 64 48 L 70 51 L 76 46 Z" fill="#ffffff" opacity="0.85" />
        </svg>
      );
    case "earth":
      return (
        <svg {...p}>
          <defs><radialGradient id="ea" cx="38%" cy="35%"><stop offset="0%" stopColor="#7fb4ea" /><stop offset="100%" stopColor={tint} /></radialGradient></defs>
          <circle cx="50" cy="50" r="30" fill="url(#ea)" />
          <path d="M34 40 q 8 -6 16 -2 q 6 4 2 10 q -8 2 -12 -2 q -6 -2 -6 -6 Z" fill="#5fd39a" opacity="0.85" />
          <path d="M56 58 q 8 -2 12 4 q -2 8 -10 8 q -6 -6 -2 -12 Z" fill="#5fd39a" opacity="0.8" />
        </svg>
      );
    case "sun":
      return (
        <svg {...p}>
          <defs><radialGradient id="su"><stop offset="0%" stopColor="#fff6d8" /><stop offset="55%" stopColor={tint} /><stop offset="100%" stopColor="rgba(0,0,0,0)" /></radialGradient></defs>
          {Array.from({ length: 12 }, (_, k) => { const a = (k / 12) * Math.PI * 2; return (
            <line key={k} x1={50 + Math.cos(a) * 30} y1={50 + Math.sin(a) * 30} x2={50 + Math.cos(a) * 40} y2={50 + Math.sin(a) * 40} stroke={tint} strokeWidth="2.4" strokeLinecap="round" opacity="0.8" />
          ); })}
          <circle cx="50" cy="50" r="30" fill="url(#su)" />
          <circle cx="50" cy="50" r="20" fill={tint} />
        </svg>
      );
    case "au":
      return (
        <svg {...p}>
          <circle cx="22" cy="50" r="14" fill="#ffcf6b" />
          <line x1="38" y1="50" x2="78" y2="50" stroke={tint} strokeWidth="1.6" strokeDasharray="4 4" />
          <path d="M74 46 L 82 50 L 74 54 Z" fill={tint} />
          <path d="M42 46 L 34 50 L 42 54 Z" fill={tint} />
          <circle cx="82" cy="50" r="5" fill="#4a8fd4" />
        </svg>
      );
    case "lightyear":
      return (
        <svg {...p}>
          <defs><linearGradient id="ly" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={tint} stopOpacity="0.9" /><stop offset="100%" stopColor={tint} stopOpacity="0" /></linearGradient></defs>
          <path d="M26 50 L 84 40 L 84 60 Z" fill="url(#ly)" />
          {Array.from({ length: 7 }, (_, k) => { const a = (k / 7) * Math.PI * 2; return (
            <line key={k} x1={26 + Math.cos(a) * 7} y1={50 + Math.sin(a) * 7} x2={26 + Math.cos(a) * 14} y2={50 + Math.sin(a) * 14} stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          ); })}
          <circle cx="26" cy="50" r="6" fill="#fff" />
          <circle cx="60" cy="34" r="1.6" fill="#fff" /><circle cx="72" cy="66" r="1.4" fill="#fff" />
        </svg>
      );
    default:
      return null;
  }
}

const STR = {
  en: {
    title: "Powers of ten",
    kind: "Writing the universe's numbers",
    define: "Scientific notation writes very large or very small numbers using powers of ten — so 13,000 becomes 1.3×10⁴, and 9,460,000,000,000 becomes 9.46×10¹². The exponent just counts the zeros.",
    plainLabel: "Plain",
    sciLabel: "Scientific notation",
    keyStop: "KEY STOP",
    step: "Cycle through the powers of ten. Two stops are marked: Earth's diameter and one light-year.",
    prev: "‹ Prev", next: "Next ›",
    counter: (i, n) => `Step ${i} / ${n}`,
    bridgeTitle: "FROM NUMBERS TO THE COSMOS",
    bridge: "Astronomy deals with distances larger than any you have met — that is exactly why we tame the zeros with powers of ten. Each stop above is one rung on that ladder. Now climb it outward from Earth: at every step the entire previous view shrinks to a single dot, until the whole observable universe fits on the screen.",
  },
  ja: {
    title: "10のべき乗",
    kind: "宇宙の数を書き表す",
    define: "科学的記数法は、非常に大きな数や小さな数を10のべき乗で表します——13,000 は 1.3×10⁴ に、9,460,000,000,000 は 9.46×10¹² に。指数は「ゼロの数」を数えているだけです。",
    plainLabel: "通常の表記",
    sciLabel: "科学的記数法",
    keyStop: "重要な区切り",
    step: "10のべき乗を順に切り替えよう。2つの区切りが目印です：地球の直径と、1光年。",
    prev: "‹ 前へ", next: "次へ ›",
    counter: (i, n) => `${n}中 ${i}`,
    bridgeTitle: "数から宇宙へ",
    bridge: "天文学が扱うのは、これまで出会ったどれよりも大きな距離です——だからこそ10のべき乗で「ゼロの山」を飼いならします。上の各区切りは、そのはしごの一段一段。今度はそれを地球から外へと登ってみよう——一段ごとに、ひとつ前の視野全体が点に縮み、やがて観測可能な宇宙のすべてが画面に収まります。",
  },
};

export function ScaleNotation() {
  const lang = useLang();
  const t = STR[lang];
  const [i, setI] = useState(3); // Earth by default
  const stop = STOPS[i];
  const go = (n) => setI(clamp(n, 0, STOPS.length - 1));

  return (
    <div>
      <div style={styles.realmGrid}>
        <InfoPanel>
          <div style={styles.stepCounter}>STATION 02</div>
          <h3 style={styles.panelTitle}>{t.title}</h3>
          <div style={styles.panelKind}>{t.kind}</div>
          <dl style={styles.dl}>
            <Row k={t.plainLabel} v={tr(stop.plain, lang)} />
            <Row k={t.sciLabel} v={<span style={{ color: C.sun }}>{stop.sci}</span>} />
          </dl>
          {stop.key && (
            <div style={styles.pathBox}>
              <div style={styles.fateLabel}>{t.keyStop}</div>
              <p style={styles.keyTermText}>
                {tr(stop.name, lang)} — <strong style={{ color: C.text }}>{stop.sci}</strong>
              </p>
            </div>
          )}
          <div style={styles.fateBox}>
            <p style={styles.factText}>{t.define}</p>
          </div>
        </InfoPanel>

        <div style={{ flex: "1 1 460px", minWidth: 280 }}>
          <div
            style={{
              height: 230, borderRadius: 14, display: "flex",
              flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10,
              background: `radial-gradient(circle at 50% 42%, ${stop.tint}22, rgba(8,12,26,0.6))`,
              border: `1px solid ${C.border}`, transition: "all 0.3s",
            }}
          >
            <StopIcon id={stop.icon} tint={stop.tint} />
            <div style={{ fontFamily: display, fontSize: 22 }}>{tr(stop.name, lang)}</div>
          </div>

          {/* prev / next */}
          <div style={{ ...styles.controlBar, justifyContent: "space-between" }}>
            <button style={{ ...styles.iconBtn, opacity: i === 0 ? 0.4 : 1, cursor: i === 0 ? "default" : "pointer" }}
              onClick={() => go(i - 1)} disabled={i === 0}>{t.prev}</button>
            <span style={{ fontFamily: mono, fontSize: 13, color: C.faint }}>{t.counter(i + 1, STOPS.length)}</span>
            <button style={{ ...styles.iconBtn, opacity: i === STOPS.length - 1 ? 0.4 : 1, cursor: i === STOPS.length - 1 ? "default" : "pointer" }}
              onClick={() => go(i + 1)} disabled={i === STOPS.length - 1}>{t.next}</button>
          </div>

          {/* clickable exponent ticks */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, gap: 4 }}>
            {STOPS.map((s, k) => {
              const on = k === i;
              return (
                <button key={k} onClick={() => setI(k)} title={`10${s.exp === 0 ? "⁰" : ""}`}
                  style={{
                    flex: 1, background: "transparent", border: "none", cursor: "pointer", padding: "4px 0",
                    fontFamily: mono, fontSize: 11.5, color: on ? C.text : C.faint,
                    borderTop: `2px solid ${on ? s.tint : "rgba(120,150,210,0.25)"}`, transition: "all 0.2s",
                  }}>
                  10<sup>{s.exp}</sup>
                </button>
              );
            })}
          </div>
          <p style={styles.note}>{t.step}</p>
        </div>
      </div>

      {/* story bridge into the observable-universe zoom */}
      <div style={{ ...styles.pathBox, maxWidth: 720, margin: "26px auto 16px" }}>
        <div style={styles.fateLabel}>{t.bridgeTitle}</div>
        <p style={{ ...styles.factText, margin: 0 }}>{t.bridge}</p>
      </div>
      <CosmicScale />
    </div>
  );
}

export default ScaleNotation;
