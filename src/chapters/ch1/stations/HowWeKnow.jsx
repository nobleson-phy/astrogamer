/* ============================================================
   STATION 1 — HOW WE KNOW
   One connected storyline (grounded in Ch.1 §1.1–1.3):
   astronomy is a science → science tests ideas against nature →
   the sheep test shows why one counterexample beats endless
   confirmations → so science self-corrects → and it works because
   the laws of nature are the same everywhere.
   The falsification demo IS "Step 3 · the test" of that thread.
   ============================================================ */
import React, { useState } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono, display } from "../../../shared/theme.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    lede: "Astronomy is a science — so how does anyone come to know what's true about a universe we can't touch? Follow the thread.",
    kicker: "STEP 3 · PUT IT TO THE TEST",
    hyp: 'Hypothesis: "All sheep are black."',
    holding: "HOLDING… every observation so far agrees.",
    disproven: "DISPROVEN — one counterexample is enough.",
    addBtn: "+ Add another observation",
    resetBtn: "↺ Reset the flock",
    seen: "Sheep observed",
    ctxTitle: "Why a single sheep settles it",
    ctx1: "A scientist born on an island of only black sheep might reasonably conclude that all sheep are black. Every new black sheep adds confidence — yet no number of them can ever prove the claim. One white sheep on the mainland disproves it outright.",
    ctx2: "That asymmetry is why scientists don't just collect confirmations — they hunt for the weak spot. It's the same skill a detective uses on a case that unfolded before they arrived: sift the evidence, and stay ready to rewrite the story when new evidence demands it.",
    panelTitle: "How we come to know",
    panelKind: "The scientific method, step by step",
    hereHint: "the test, on the right ▶",
    steps: [
      {
        t: "Astronomy is a science",
        b: "Astronomy is the study of the objects beyond Earth and how they interact — reading the universe's messages to piece together its history, from the Big Bang to now. It is a science, not astrology, which claims to foretell human destiny from the stars.",
      },
      {
        t: "Science is a method, not just facts",
        b: "The method begins with many observations, from which scientists build a model — a proposed explanation, or hypothesis. Crucially, the ultimate judge is always nature itself: observation and experiment, never authority, reputation, or how elegant the mathematics looks.",
      },
      {
        t: "Test it — and try to break it",
        b: "A hypothesis is only scientific if it can be tested. Agreeing results build confidence but never prove it; a single contradicting result can sink it. See it for yourself in the test on the right.",
        accent: true,
      },
      {
        t: "So science self-corrects",
        b: "Because every idea stays open to challenge — through peer review and repeated testing — scientists are rewarded for finding a weakness and fixing it. Ideas that fail are revised or discarded. That relentless self-correction is the engine of scientific progress.",
      },
      {
        t: "And it works everywhere",
        b: "One last discovery makes all of this possible: the laws of nature are the same everywhere. The rules that arc a batted baseball also steer stars too distant to see — the Cosmological Principle. Without universal laws astronomy would be hopeless; with them, what we learn here applies to the whole cosmos.",
      },
    ],
  },
  ja: {
    lede: "天文学は科学です——では、手を触れることもできない宇宙について、どうすれば「本当のこと」が分かるのでしょう。その筋道をたどってみよう。",
    kicker: "ステップ3 · 検証にかける",
    hyp: "仮説：「すべての羊は黒い。」",
    holding: "検証中… これまでの観察はすべて一致している。",
    disproven: "反証された——反例が1つあれば十分。",
    addBtn: "＋ もう1つ観察を加える",
    resetBtn: "↺ 群れをリセット",
    seen: "観察した羊",
    ctxTitle: "なぜ1頭で決着するのか",
    ctx1: "黒い羊しかいない島で生まれた科学者は、「すべての羊は黒い」と考えるかもしれません。黒い羊を新たに見るたび確信は増します——けれど、どれだけ数を重ねても、その主張を「証明」することはできません。本土で白い羊を1頭見つければ、それだけで反証されます。",
    ctx2: "この非対称性ゆえに、科学者は確認例を集めるだけでなく、弱点を探しにいきます。それは、自分が着く前に起きた事件を追う探偵と同じ姿勢です——証拠をふるいにかけ、新たな証拠が求めれば、いつでも筋書きを書き改める。",
    panelTitle: "どうして分かるのか",
    panelKind: "科学的手法を、順を追って",
    hereHint: "右の検証 ▶",
    steps: [
      {
        t: "天文学は科学である",
        b: "天文学は、地球の外にある天体と、それらが相互に作用する過程を研究する学問です——宇宙が送る信号を読み解き、ビッグバンから現在までの歴史を組み立てます。星から人間の運命を占う占星術とは異なる、れっきとした科学です。",
      },
      {
        t: "科学は知識ではなく「方法」",
        b: "その方法は多くの観察から始まり、そこから科学者はモデル——説明の候補、すなわち仮説——を組み立てます。そして肝心なのは、最終的な判定者がつねに自然そのもの、つまり観測と実験だということ。権威や名声、数式の美しさではありません。",
      },
      {
        t: "検証し、そして壊しにかかる",
        b: "仮説は、検証できてこそ科学です。一致する結果は確信を高めますが「証明」にはならず、矛盾する結果が1つあれば覆りえます。右の検証で、自分の目で確かめてみよう。",
        accent: true,
      },
      {
        t: "だから科学は自己修正する",
        b: "あらゆる考えが——査読や繰り返しの検証を通じて——つねに挑戦にさらされるため、科学者は弱点を見つけて正すことで評価されます。耐えられない考えは改められ、あるいは捨てられます。この絶え間ない自己修正こそが、科学の進歩の原動力です。",
      },
      {
        t: "しかも宇宙のどこでも通用する",
        b: "最後の発見が、これらすべてを可能にします——自然の法則は宇宙のどこでも同じ、ということ。打たれた野球のボールを描く法則は、目に見えないほど遠い星をも導きます——「宇宙原理」です。もし場所ごとに法則が違えば天文学は成り立ちません。同じだからこそ、ここで学んだことを宇宙全体に当てはめられるのです。",
      },
    ],
  },
};

const WHITE_CHANCE = 0.14;

function Sheep({ white }) {
  const wool = white ? "#eef2fb" : "#2a3150";
  const face = white ? "#8b93ab" : "#0c101c";
  return (
    <svg
      width="38" height="30" viewBox="0 0 44 34" role="img"
      aria-label={white ? "white sheep" : "black sheep"}
      style={{ filter: white ? `drop-shadow(0 0 5px ${C.sun})` : "none", transition: "all 0.2s", flexShrink: 0 }}
    >
      {/* legs */}
      <rect x="15" y="23" width="3" height="9" rx="1.4" fill={face} />
      <rect x="24" y="23" width="3" height="9" rx="1.4" fill={face} />
      {/* fluffy wool body */}
      <g fill={wool}>
        <circle cx="11" cy="15" r="6.5" />
        <circle cx="18" cy="17" r="10" />
        <circle cx="27" cy="15" r="7.5" />
        <circle cx="13" cy="22" r="6.5" />
        <circle cx="24" cy="22" r="7" />
      </g>
      {/* head + ear */}
      <ellipse cx="33" cy="14" rx="5.2" ry="6" fill={face} />
      <ellipse cx="30.4" cy="9.6" rx="2" ry="3.4" fill={face} transform="rotate(-28 30.4 9.6)" />
      {/* eye */}
      <circle cx="34.2" cy="12.8" r="1" fill={white ? "#1a2036" : "#e9edf7"} opacity="0.9" />
    </svg>
  );
}

export function HowWeKnow() {
  const lang = useLang();
  const t = STR[lang];
  const [flock, setFlock] = useState([false, false, false, false, false]);

  const disproven = flock.some((s) => s);
  const addOne = () => {
    if (disproven) return;
    const white = Math.random() < WHITE_CHANCE || flock.length >= 15; // guaranteed by the 16th
    setFlock((f) => [...f, white]);
  };
  const reset = () => setFlock([false, false, false, false, false]);

  return (
    <div style={styles.realmGrid}>
      {/* LEFT — the storyline leads */}
      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <div style={styles.stepCounter}>STATION 01</div>
        <h3 style={styles.panelTitle}>{t.panelTitle}</h3>
        <div style={styles.panelKind}>{t.panelKind}</div>
        <p style={{ ...styles.note, fontStyle: "italic", margin: "12px 0 18px" }}>{t.lede}</p>

        <div>
          {t.steps.map((s, i) => {
            const last = i === t.steps.length - 1;
            const c = s.accent ? C.sun : C.cool;
            return (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "stretch" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{
                    flexShrink: 0, width: 28, height: 28, borderRadius: "50%",
                    border: `1.5px solid ${c}`, color: c, background: s.accent ? "rgba(255,207,107,0.12)" : "rgba(99,211,240,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: mono, fontSize: 14, fontWeight: 700,
                  }}>{i + 1}</div>
                  {!last && <div style={{ flex: 1, width: 2, background: "rgba(120,150,210,0.25)", marginTop: 4 }} />}
                </div>
                <div style={{ paddingBottom: last ? 0 : 18 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: display, fontSize: 18, color: C.text }}>{tr(s.t, lang)}</span>
                    {s.accent && <span style={{ fontFamily: mono, fontSize: 11.5, color: C.sun }}>{t.hereHint}</span>}
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: "#dbe4ff", margin: "6px 0 0" }}>{tr(s.b, lang)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT — the hypothesis test (Step 3, interactive) */}
      <InfoPanel>
        <div style={{ fontFamily: mono, fontSize: 13, letterSpacing: 2, color: C.sun, marginBottom: 10 }}>
          {t.kicker}
        </div>
        <div
          style={{
            padding: 16, borderRadius: 12,
            background: disproven ? "rgba(255,122,107,0.08)" : "rgba(99,211,240,0.06)",
            border: `1px solid ${disproven ? "rgba(255,122,107,0.35)" : C.border}`,
            transition: "all 0.25s",
          }}
        >
          <div style={{ fontFamily: display, fontSize: 20, marginBottom: 6 }}>{t.hyp}</div>
          <div style={{ fontFamily: mono, fontSize: 14.5, color: disproven ? C.danger : C.good }}>
            {disproven ? t.disproven : t.holding}
          </div>
        </div>

        <div
          style={{
            display: "flex", flexWrap: "wrap", gap: 9, marginTop: 16,
            minHeight: 64, padding: 12, borderRadius: 10,
            background: "rgba(8,12,26,0.5)", border: `1px solid ${C.border}`,
          }}
        >
          {flock.map((w, i) => <Sheep key={i} white={w} />)}
        </div>

        <div style={styles.controlBar}>
          <button style={styles.iconBtn} onClick={addOne} disabled={disproven}>{t.addBtn}</button>
          <button style={styles.chip} onClick={reset}>{t.resetBtn}</button>
          <div style={styles.stagePill}>{t.seen}: {flock.length}</div>
        </div>

        {/* context filling the space under the test — grounds the demo in the method */}
        <div style={{ ...styles.pathBox, marginTop: 18 }}>
          <div style={styles.fateLabel}>{t.ctxTitle}</div>
          <p style={{ ...styles.factText, margin: "0 0 12px" }}>{t.ctx1}</p>
          <p style={{ ...styles.factText, margin: 0 }}>{t.ctx2}</p>
        </div>
      </InfoPanel>
    </div>
  );
}

export default HowWeKnow;
