/* ============================================================
   STATION 1 — TYCHO & KEPLER
   Tycho Brahe's ~20 years of precise naked-eye observations gave
   Kepler the data to discover that orbits are ellipses, not the
   "perfect" circles the ancient Greeks demanded. Toggle a perfect
   circle against Kepler's ellipse, framed by the Brahe → Kepler story.
   Grounded in Ch.3 §3.1.
   ============================================================ */
import React, { useState } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono, display } from "../../../shared/theme.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const MODES = [
  { id: "circle", label: { en: "The Greek ideal: a perfect circle", ja: "ギリシャの理想：完全な円" } },
  { id: "ellipse", label: { en: "Kepler's reality: an ellipse", ja: "ケプラーの現実：楕円" } },
];

const STR = {
  en: {
    title: "Tycho & Kepler",
    kind: "From perfect circles to ellipses",
    lede: "For two thousand years, everyone knew the heavens ran on perfect circles. Toggle between that ancient ideal and the orbit Kepler actually found in the data — and watch a cornerstone of Greek philosophy quietly give way.",
    thread: "THE PUZZLE",
    threadCircle: "Tycho Brahe spent almost 20 years recording the planets' positions by naked eye, more precisely than anyone before him. But the old rule said their paths must be perfect circles — the shape the ancient Greeks held to be the only one worthy of the heavens.",
    threadEllipse: "When Kepler inherited Tycho's data and tried to fit Mars to a circle, it stubbornly refused. Only an ellipse — a slightly flattened circle with the Sun at one focus — matched the observations. The 'perfect' circle had to go.",
    first: "KEPLER'S FIRST LAW",
    firstText: "Each planet moves around the Sun in an ellipse, with the Sun at one focus of that ellipse — not at the centre, and not on a circle.",
    turning: "A TURNING POINT",
    turningText: "Accepting ellipses meant the cosmos need not obey 'perfect' philosophical shapes. Here was a decisive moment in human thought: the universe could be more complex than the Greeks had wanted it to be.",
    brahe: "Tycho Brahe (1546–1601)", braheRole: "The observer",
    braheText: "~20 years of the most precise naked-eye planetary positions ever recorded — the raw data.",
    kepler: "Johannes Kepler (1571–1630)", keplerRole: "The mathematician",
    keplerText: "Analysed Tycho's data for over 20 years and drew from it the three laws of planetary motion.",
    sun: "Sun", focusEmpty: "empty focus", center: "centre",
  },
  ja: {
    title: "ティコとケプラー",
    kind: "完全な円から楕円へ",
    lede: "二千年ものあいだ、天は完全な円で動くと誰もが信じていました。その古代の理想と、ケプラーがデータの中に実際に見出した軌道を切り替えて、ギリシャ哲学の礎が静かに崩れる様子を見てみよう。",
    thread: "なぞ",
    threadCircle: "ティコ・ブラーエは、それまでの誰よりも精密に、惑星の位置を肉眼でおよそ20年間記録し続けました。しかし古い規則は、その軌道は完全な円でなければならないと言う——完全な円こそ、天にふさわしい唯一の形だと古代ギリシャ人は信じていたのです。",
    threadEllipse: "ティコのデータを受け継いだケプラーが火星を円に当てはめようとしても、頑として合いませんでした。楕円——太陽を一つの焦点とする、わずかにつぶれた円——だけが観測に一致したのです。「完全な」円は退場するほかありませんでした。",
    first: "ケプラーの第一法則",
    firstText: "各惑星は太陽のまわりを楕円軌道で回り、太陽はその楕円の一つの焦点に位置します——中心ではなく、円上でもありません。",
    turning: "転回点",
    turningText: "楕円を受け入れることは、宇宙が「完全な」哲学的な形に従う必要はないことを意味しました。これは人類の思想における決定的な瞬間でした——宇宙は、ギリシャ人が望んだよりも複雑でありうるのです。",
    brahe: "ティコ・ブラーエ（1546–1601）", braheRole: "観測者",
    braheText: "肉眼による、史上最も精密な惑星位置の記録を約20年間——その生のデータ。",
    kepler: "ヨハネス・ケプラー（1571–1630）", keplerRole: "数学者",
    keplerText: "ティコのデータを20年以上分析し、そこから惑星運動の三法則を導き出しました。",
    sun: "太陽", focusEmpty: "空の焦点", center: "中心",
  },
};

/* Small SVG comparison of a circle (Sun centred) vs an ellipse (Sun at focus). */
function OrbitFigure({ mode, t, lang }) {
  const W = 460, H = 300, cx = W / 2, cy = H / 2;
  if (mode === "circle") {
    const r = 118;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: 460, display: "block" }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.cool} strokeWidth="2" />
        {/* centre marker */}
        <line x1={cx - 6} y1={cy} x2={cx + 6} y2={cy} stroke={C.faint} strokeWidth="1.4" />
        <line x1={cx} y1={cy - 6} x2={cx} y2={cy + 6} stroke={C.faint} strokeWidth="1.4" />
        <text x={cx + 10} y={cy - 10} fill={C.faint} fontFamily={mono} fontSize="12">{t.center}</text>
        {/* Sun at centre */}
        <circle cx={cx} cy={cy} r="11" fill="#ffcf6b" />
        <circle cx={cx} cy={cy} r="20" fill="#ffcf6b" opacity="0.2" />
        <text x={cx} y={cy + 40} fill="#ffcf6b" fontFamily={mono} fontSize="13" textAnchor="middle">{t.sun}</text>
        {/* planet */}
        <circle cx={cx + r} cy={cy} r="7" fill="#4a8fd4" />
      </svg>
    );
  }
  const a = 150, b = 108;
  const cE = Math.sqrt(a * a - b * b); // focus offset
  const fx = cx + cE; // Sun focus (right)
  const gx = cx - cE; // empty focus (left)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: 460, display: "block" }}>
      <ellipse cx={cx} cy={cy} rx={a} ry={b} fill="none" stroke={C.sun} strokeWidth="2" />
      {/* semimajor axis line */}
      <line x1={cx - a} y1={cy} x2={cx + a} y2={cy} stroke="rgba(140,170,220,0.35)" strokeWidth="1" strokeDasharray="4 4" />
      {/* empty focus */}
      <circle cx={gx} cy={cy} r="4" fill="none" stroke={C.faint} strokeWidth="1.5" />
      <text x={gx} y={cy - 12} fill={C.faint} fontFamily={mono} fontSize="12" textAnchor="middle">{t.focusEmpty}</text>
      {/* Sun at focus */}
      <circle cx={fx} cy={cy} r="11" fill="#ffcf6b" />
      <circle cx={fx} cy={cy} r="20" fill="#ffcf6b" opacity="0.2" />
      <text x={fx} y={cy + 40} fill="#ffcf6b" fontFamily={mono} fontSize="13" textAnchor="middle">{t.sun}</text>
      {/* planet at perihelion */}
      <circle cx={cx + a} cy={cy} r="7" fill="#4a8fd4" />
    </svg>
  );
}

function PersonCard({ name, role, text, color }) {
  return (
    <div style={{ flex: "1 1 180px", minWidth: 160, background: "rgba(8,12,26,0.6)", border: `1px solid ${C.border}`, borderRadius: 12, padding: 14 }}>
      <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1.5, color, marginBottom: 6 }}>{role}</div>
      <div style={{ fontFamily: display, fontSize: 18, marginBottom: 6 }}>{name}</div>
      <p style={{ ...styles.note, marginTop: 0, fontSize: 14 }}>{text}</p>
    </div>
  );
}

export function TychoKepler() {
  const lang = useLang();
  const t = STR[lang];
  const [mode, setMode] = useState("circle");

  return (
    <div style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 01</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{mode === "circle" ? t.threadCircle : t.threadEllipse}</p>
        </div>
        <div style={styles.fateBox}>
          <div style={{ ...styles.fateLabel, color: C.danger }}>{t.first}</div>
          <p style={styles.factText}>{t.firstText}</p>
        </div>
        <div style={{ ...styles.pathBox, marginTop: 14 }}>
          <div style={{ ...styles.fateLabel, color: C.sun }}>{t.turning}</div>
          <p style={{ ...styles.keyTermText, margin: 0 }}>{t.turningText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>
        <div style={styles.pickerRow}>
          {MODES.map((m) => (
            <button key={m.id} onClick={() => setMode(m.id)}
              style={{ ...styles.chip, ...(mode === m.id ? styles.chipOn : {}) }}>{tr(m.label, lang)}</button>
          ))}
        </div>
        <div style={{ marginTop: 12, borderRadius: 12, background: "rgba(3,5,12,0.6)", border: `1px solid ${C.border}`, padding: "10px 6px", display: "flex", justifyContent: "center" }}>
          <OrbitFigure mode={mode} t={t} lang={lang} />
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 14, flexWrap: "wrap" }}>
          <PersonCard name={t.brahe} role={t.braheRole} text={t.braheText} color={C.cool} />
          <PersonCard name={t.kepler} role={t.keplerRole} text={t.keplerText} color={C.sun} />
        </div>
      </div>
    </div>
  );
}

export default TychoKepler;
