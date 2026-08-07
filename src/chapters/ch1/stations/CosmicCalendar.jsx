/* ============================================================
   STATION 4 — COSMIC CALENDAR
   13.8 billion years compressed into one year. Step through the
   milestones with Prev / Next. Humans arrive Dec 31 evening.
   ============================================================ */
import React, { useState } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono, display } from "../../../shared/theme.js";
import { clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

/* day = day-of-year (1..366). Events placed on the standard Cosmic Calendar. */
const EVENTS = [
  { id: "bigbang", day: 1, date: { en: "January 1", ja: "1月1日" }, label: { en: "The Big Bang", ja: "ビッグバン" }, story: { en: "It all begins in the first instant of January 1 — the Big Bang lights up an empty calendar.", ja: "すべては1月1日の最初の一瞬から始まります——ビッグバンが、空白のカレンダーに火を灯します。" }, desc: { en: "Time, space, matter and energy all begin. The universe is 13.8 billion years old.", ja: "時間・空間・物質・エネルギーがすべて始まる。宇宙の年齢は138億年。" }, color: "#ffffff" },
  { id: "milkyway", day: 90, date: { en: "Late March", ja: "3月下旬" }, label: { en: "The Milky Way forms", ja: "天の川銀河が形づくられる" }, story: { en: "Winter and early spring slip by before gravity gathers the first stars into our galaxy.", ja: "冬から早春が過ぎるころ、重力が最初の星々を集め、私たちの銀河が姿を現します。" }, desc: { en: "Our galaxy takes shape from the first generations of stars.", ja: "初期世代の星々から、私たちの銀河が姿を現す。" }, color: "#cbb6ff" },
  { id: "sunearth", day: 246, date: { en: "Early September", ja: "9月上旬" }, label: { en: "The Sun & Earth form", ja: "太陽と地球が誕生" }, story: { en: "Not until September — two-thirds of the way through the year — do the Sun and Earth finally take shape.", ja: "9月——1年の3分の2を過ぎて——ようやく太陽と地球が形づくられます。" }, desc: { en: "A cloud of gas and dust collapses into the Sun, its planets, and Earth.", ja: "ガスと塵の雲が収縮し、太陽と惑星、そして地球が生まれる。" }, color: "#ffcf6b" },
  { id: "life", day: 270, date: { en: "Late September", ja: "9月下旬" }, label: { en: "First life on Earth", ja: "地球最初の生命" }, story: { en: "Almost at once, life stirs in Earth's young oceans — yet it stays microscopic for months of cosmic time.", ja: "ほどなくして、若い地球の海に生命が芽生えます——けれど、宇宙の暦では何か月も微生物のまま。" }, desc: { en: "The earliest single-celled life appears in Earth's oceans.", ja: "最初期の単細胞生物が地球の海に現れる。" }, color: "#5fd39a" },
  { id: "dinos", day: 358, date: { en: "December 24", ja: "12月24日" }, label: { en: "The dinosaurs", ja: "恐竜の時代" }, story: { en: "Complex creatures wait until the year's final week: the dinosaurs arrive around December 24 and are gone by the 30th.", ja: "複雑な生き物が現れるのは、1年の最後の週。恐竜は12月24日ごろに登場し、30日には姿を消します。" }, desc: { en: "Dinosaurs roam — and are gone again by December 30.", ja: "恐竜が闊歩する——そして12月30日には姿を消す。" }, color: "#ff9a6b" },
  { id: "humans", day: 365.9, date: { en: "December 31, evening", ja: "12月31日の夜" }, label: { en: "Human beings", ja: "人類の登場" }, story: { en: "Only on the evening of December 31 does anything we would call human step onto the stage.", ja: "「人類」と呼べる存在が舞台に立つのは、ようやく12月31日の夜です。" }, desc: { en: "Humans appear only now, in the final hours of the very last day of the cosmic year.", ja: "人類が現れるのはようやく今——宇宙の1年の、最後の日の残りわずかな時間。" }, color: "#63d3f0", human: true },
  { id: "history", day: 365.9997, date: { en: "December 31, 23:59:59", ja: "12月31日 23:59:59" }, label: { en: "All recorded history", ja: "有史以来のすべて" }, story: { en: "Every word ever written — every empire, book, and telescope — is squeezed into the last few seconds before midnight.", ja: "書き記されたすべて——あらゆる帝国、書物、望遠鏡——は、真夜中前の最後の数秒に詰め込まれています。" }, desc: { en: "Every pyramid, empire, book and rocket fits into the last few seconds before midnight.", ja: "あらゆるピラミッド、帝国、書物、ロケットが、真夜中前の最後の数秒に収まる。" }, color: "#ffe08a", coda: true },
];

/* ---------- illustrative icons (inline SVG) ---------- */
function Icon({ id, color, size = 104 }) {
  const common = { width: size, height: size, viewBox: "0 0 100 100" };
  switch (id) {
    case "bigbang": {
      const rays = Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const r1 = 20, r2 = i % 2 ? 46 : 38;
        return (
          <line key={i}
            x1={50 + Math.cos(a) * r1} y1={50 + Math.sin(a) * r1}
            x2={50 + Math.cos(a) * r2} y2={50 + Math.sin(a) * r2}
            stroke={color} strokeWidth={i % 2 ? 2 : 3} strokeLinecap="round" opacity="0.85" />
        );
      });
      return (
        <svg {...common}>
          <defs>
            <radialGradient id="bbg">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="55%" stopColor={color} />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          </defs>
          {rays}
          <circle cx="50" cy="50" r="22" fill="url(#bbg)" />
          <circle cx="50" cy="50" r="9" fill="#ffffff" />
        </svg>
      );
    }
    case "milkyway":
      return (
        <svg {...common}>
          <g transform="rotate(-22 50 50)">
            <ellipse cx="50" cy="50" rx="42" ry="15" fill={color} opacity="0.12" />
            <path d="M50 50 C 66 44, 80 50, 88 62" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" opacity="0.8" />
            <path d="M50 50 C 34 56, 20 50, 12 38" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" opacity="0.8" />
            <circle cx="72" cy="50" r="1.6" fill="#fff" /><circle cx="82" cy="57" r="1.3" fill="#fff" />
            <circle cx="28" cy="50" r="1.6" fill="#fff" /><circle cx="18" cy="43" r="1.3" fill="#fff" />
            <circle cx="50" cy="50" r="8" fill={color} />
            <circle cx="50" cy="50" r="3.4" fill="#fff" />
          </g>
        </svg>
      );
    case "sunearth":
      return (
        <svg {...common}>
          <ellipse cx="50" cy="50" rx="40" ry="26" fill="none" stroke={color} strokeWidth="1.4" strokeDasharray="3 4" opacity="0.5" />
          <defs>
            <radialGradient id="sung">
              <stop offset="0%" stopColor="#fff6d8" />
              <stop offset="55%" stopColor={color} />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="26" fill="url(#sung)" />
          <circle cx="50" cy="50" r="15" fill={color} />
          <circle cx="88" cy="46" r="5.5" fill="#4a8fd4" />
          <path d="M88 40.5 a5.5 5.5 0 0 1 0 11" fill="#3a72ad" />
        </svg>
      );
    case "life":
      return (
        <svg {...common}>
          <circle cx="50" cy="50" r="30" fill={color} opacity="0.14" />
          <circle cx="50" cy="50" r="30" fill="none" stroke={color} strokeWidth="2.4" />
          <circle cx="45" cy="47" r="9" fill={color} opacity="0.55" />
          <circle cx="45" cy="47" r="3.5" fill="#fff" />
          <circle cx="63" cy="58" r="3" fill={color} />
          <circle cx="58" cy="38" r="2.2" fill={color} />
          <circle cx="38" cy="62" r="2.2" fill={color} />
        </svg>
      );
    case "dinos":
      return (
        <svg {...common}>
          {/* sauropod silhouette */}
          <path d="M14 74 C 20 74, 24 66, 30 60 C 40 50, 42 30, 52 30 C 60 30, 58 46, 66 52 C 74 58, 84 58, 86 74 L 78 74 L 74 62 L 64 62 L 60 74 L 52 74 L 50 60 C 44 66, 36 70, 28 72 L 24 74 Z"
            fill={color} opacity="0.9" />
          <circle cx="52" cy="30" r="1.6" fill="#0a0e1c" />
        </svg>
      );
    case "humans":
      return (
        <svg {...common}>
          <circle cx="50" cy="30" r="11" fill={color} />
          <path d="M31 74 C 31 55, 40 47, 50 47 C 60 47, 69 55, 69 74 Z" fill={color} />
        </svg>
      );
    case "history":
      return (
        <svg {...common}>
          {/* clock at 23:59 — the final seconds */}
          <circle cx="50" cy="52" r="30" fill="none" stroke={color} strokeWidth="3" />
          <circle cx="50" cy="52" r="30" fill={color} opacity="0.1" />
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return <line key={i} x1={50 + Math.cos(a) * 26} y1={52 + Math.sin(a) * 26} x2={50 + Math.cos(a) * 29} y2={52 + Math.sin(a) * 29} stroke={color} strokeWidth="1.6" opacity="0.7" />;
          })}
          <line x1="50" y1="52" x2="50" y2="34" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          <line x1="50" y1="52" x2="57" y2="50" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="50" cy="52" r="2.6" fill="#fff" />
        </svg>
      );
    default:
      return null;
  }
}

const STR = {
  en: {
    title: "The Cosmic Calendar",
    kind: "13.8 billion years in one year",
    step: "Step through the milestones:",
    prev: "‹ Prev", next: "Next ›",
    counter: (i, n) => `Milestone ${i} / ${n}`,
    lede: "Carl Sagan's idea: squeeze all 13.8 billion years into one year. The Big Bang is the first instant of January 1, and this moment — you, reading — is the last second of December 31. Watch where everything falls.",
    thread: "THE COSMIC YEAR",
    now: "On this date",
    humanCallout: "Human beings appear only on the evening of December 31 — the whole of human existence is the final flicker of the cosmic year.",
    coda: "Against the whole cosmic year, all of recorded history is the final flicker — yet in that flicker we have pieced together this much of the story.",
  },
  ja: {
    title: "宇宙カレンダー",
    kind: "138億年を1年に凝縮",
    step: "節目を順にたどろう：",
    prev: "‹ 前へ", next: "次へ ›",
    counter: (i, n) => `節目 ${i} / ${n}`,
    lede: "カール・セーガンの発想——138億年すべてを1年に凝縮する。ビッグバンは1月1日の最初の一瞬、そしてこの瞬間——読んでいるあなた——は12月31日の最後の1秒。すべてがどこに位置するか、見てみよう。",
    thread: "宇宙の1年",
    now: "この日付",
    humanCallout: "人類が登場するのは12月31日の夜だけ——人類の全歴史は、宇宙の1年の最後のわずかなきらめきにすぎません。",
    coda: "宇宙の1年に照らせば、有史以来のすべては最後のひらめきにすぎません——それでも私たちは、そのひとときで、これだけの物語を組み立ててきました。",
  },
};

export function CosmicCalendar() {
  const lang = useLang();
  const t = STR[lang];
  const [idx, setIdx] = useState(0);
  const ev = EVENTS[idx];
  const isHuman = ev.human;
  const go = (n) => setIdx((i) => clamp(n, 0, EVENTS.length - 1));

  return (
    <div style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 04</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <p style={{ ...styles.hint, marginTop: 12 }}>{t.step}</p>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{tr(ev.story, lang)}</p>
        </div>
        <div style={{ ...styles.pathBox, marginTop: 14 }}>
          <div style={styles.fateLabel}>{t.now}</div>
          <p style={styles.pathText}>{tr(ev.date, lang)} — {tr(ev.label, lang)}</p>
        </div>
        <p style={{ ...styles.factText, marginTop: 14 }}>{tr(ev.desc, lang)}</p>
        {isHuman && (
          <div style={{ ...styles.fateBox, background: "rgba(99,211,240,0.06)", borderColor: C.borderBright }}>
            <div style={{ ...styles.fateLabel, color: C.cool }}>DEC 31</div>
            <p style={styles.factText}>{t.humanCallout}</p>
          </div>
        )}
        {ev.coda && (
          <div style={{ ...styles.fateBox, background: "rgba(255,224,138,0.06)", borderColor: "rgba(255,224,138,0.3)" }}>
            <div style={{ ...styles.fateLabel, color: C.sun }}>{lang === "ja" ? "そして今" : "AND NOW"}</div>
            <p style={styles.factText}>{t.coda}</p>
          </div>
        )}
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 14 }}>{t.lede}</p>
        <div
          style={{
            height: 260, borderRadius: 14, position: "relative",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6,
            background: `radial-gradient(circle at 50% 38%, ${ev.color}22, rgba(8,12,26,0.6))`,
            border: `1px solid ${isHuman ? C.borderBright : C.border}`, transition: "all 0.3s",
          }}
        >
          <Icon id={ev.id} color={ev.color} />
          <div style={{ fontFamily: mono, fontSize: 15, letterSpacing: 2, color: ev.color, marginTop: 4 }}>
            {tr(ev.date, lang)}
          </div>
          <div style={{ fontFamily: display, fontSize: 28, textAlign: "center", padding: "0 12px" }}>
            {tr(ev.label, lang)}
          </div>
        </div>

        {/* prev / next */}
        <div style={{ ...styles.controlBar, justifyContent: "space-between" }}>
          <button style={{ ...styles.iconBtn, opacity: idx === 0 ? 0.4 : 1, cursor: idx === 0 ? "default" : "pointer" }}
            onClick={() => go(idx - 1)} disabled={idx === 0}>{t.prev}</button>
          <span style={{ fontFamily: mono, fontSize: 13, color: C.faint }}>{t.counter(idx + 1, EVENTS.length)}</span>
          <button style={{ ...styles.iconBtn, opacity: idx === EVENTS.length - 1 ? 0.4 : 1, cursor: idx === EVENTS.length - 1 ? "default" : "pointer" }}
            onClick={() => go(idx + 1)} disabled={idx === EVENTS.length - 1}>{t.next}</button>
        </div>

        {/* year track with clickable markers */}
        <div style={{ position: "relative", height: 22, marginTop: 18 }}>
          <div style={{ position: "absolute", top: 10, left: 0, right: 0, height: 2, background: "rgba(120,150,210,0.25)", borderRadius: 2 }} />
          {EVENTS.map((m, i) => {
            const on = i === idx;
            return (
              <button
                key={m.id}
                title={tr(m.label, lang)}
                onClick={() => setIdx(i)}
                style={{
                  position: "absolute", top: 0, left: `${(Math.min(m.day, 366) / 366) * 100}%`,
                  transform: "translateX(-50%)", background: "transparent", border: "none", cursor: "pointer", padding: 4,
                }}
              >
                <span style={{
                  display: "block", width: on ? 14 : 9, height: on ? 14 : 9, borderRadius: "50%",
                  background: m.color, boxShadow: `0 0 ${on ? 10 : 5}px ${m.color}`,
                  border: on ? "2px solid #fff" : "none", transition: "all 0.2s",
                }} />
              </button>
            );
          })}
        </div>
        <div style={styles.rangeEnds}>
          <span>{lang === "ja" ? "1月1日" : "Jan 1"}</span>
          <span>{lang === "ja" ? "12月31日" : "Dec 31"}</span>
        </div>
      </div>
    </div>
  );
}

export default CosmicCalendar;
