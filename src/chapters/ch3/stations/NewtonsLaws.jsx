/* ============================================================
   STATION 5 — NEWTON'S LAWS OF MOTION
   Step through inertia (1st law), momentum = mass × velocity, and the
   difference between mass (constant everywhere) and weight (the force
   of gravity, which changes with location). A live Earth-vs-Moon demo
   shows the same mass weighing far less on the Moon.
   Grounded in Ch.3 §3.2.
   ============================================================ */
import React, { useState } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono, display } from "../../../shared/theme.js";
import { clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STEPS = [
  {
    id: "inertia",
    tag: { en: "1st law", ja: "第一法則" },
    label: { en: "Inertia", ja: "慣性" },
    story: {
      en: "Newton's first law: an object keeps doing exactly what it is doing — sitting still, or gliding in a straight line at a steady speed — unless an outside force acts on it. Rest is no more natural than motion.",
      ja: "ニュートンの第一法則：物体は、外から力が働かないかぎり、今していること——静止したまま、あるいは一定の速さでまっすぐ進み続けること——をそのまま続けます。静止は運動より自然なわけではありません。",
    },
    fact: {
      en: "In deep space, where friction is negligible, a coasting probe drifts on forever with its engines off. On Earth, friction hides this — it is a force too, quietly slowing everything down.",
      ja: "摩擦がほとんどない深宇宙では、エンジンを切った探査機はいつまでも滑り続けます。地球ではこれを摩擦が覆い隠しています——摩擦も力の一つで、あらゆるものを静かに減速させているのです。",
    },
  },
  {
    id: "momentum",
    tag: { en: "Momentum", ja: "運動量" },
    label: { en: "Momentum", ja: "運動量" },
    story: {
      en: "Momentum is the amount of motion a body carries: momentum = mass × velocity. A heavy truck and a fast bullet can both be hard to stop. A force is just whatever changes an object's momentum.",
      ja: "運動量とは、物体が持つ運動の量です：運動量 = 質量 × 速度。重いトラックも速い弾丸も、どちらも止めるのが大変です。力とは、物体の運動量を変えるもののことです。",
    },
    fact: {
      en: "Velocity means speed together with direction, so a force can change momentum by changing either the speed or the direction of motion — or both.",
      ja: "速度とは、速さと向きを合わせたものです。だから力は、運動の速さか向き——あるいは両方——を変えることで、運動量を変えられます。",
    },
  },
  {
    id: "massweight",
    tag: { en: "Mass vs weight", ja: "質量と重さ" },
    label: { en: "Mass vs weight", ja: "質量と重さ" },
    story: {
      en: "Mass is the amount of matter in an object — it is the same everywhere in the universe. Weight is the force of gravity pulling on that mass, so it changes from world to world. Same you; different scales.",
      ja: "質量は物体に含まれる物質の量で、宇宙のどこでも変わりません。重さは、その質量を引く重力の大きさなので、天体ごとに変わります。あなたは同じでも、はかりの目盛りは違うのです。",
    },
    fact: {
      en: "On the Moon, gravity is about one-sixth of Earth's. Your mass would not change one gram — but you would weigh only a sixth as much.",
      ja: "月の重力は地球のおよそ6分の1です。あなたの質量は1グラムも変わりませんが、体重は6分の1しかありません。",
    },
    demo: true,
  },
];

const STR = {
  en: {
    title: "Newton's laws of motion",
    kind: "Inertia, momentum, mass & weight",
    lede: "Three ideas from the Principia underpin every orbit in this chapter. Step through them, then meet the crucial difference between what you are made of and what you weigh.",
    prev: "‹ Prev", next: "Next ›",
    counter: (i, n) => `Step ${i} / ${n}`,
    thread: "THE FOUNDATION",
    key: "THE KEY IDEA",
    demoTitle: "Same mass, different weight",
    earth: "Earth", moon: "Moon",
    mass: "Mass", weight: "Weight", pick: "Pick a mass:",
  },
  ja: {
    title: "ニュートンの運動の法則",
    kind: "慣性・運動量・質量と重さ",
    lede: "『プリンキピア』の三つの考えが、この章のあらゆる軌道を支えています。順にたどり、そして「何でできているか」と「どれだけ重いか」の決定的な違いに出会おう。",
    prev: "‹ 前へ", next: "次へ ›",
    counter: (i, n) => `${n}中 ${i}`,
    thread: "土台",
    key: "要点",
    demoTitle: "同じ質量、違う重さ",
    earth: "地球", moon: "月",
    mass: "質量", weight: "重さ", pick: "質量を選ぼう：",
  },
};

const MASSES = [10, 30, 60];

export function NewtonsLaws() {
  const lang = useLang();
  const t = STR[lang];
  const [i, setI] = useState(0);
  const [kg, setKg] = useState(60);
  const step = STEPS[i];
  const go = (n) => setI((k) => clamp(n, 0, STEPS.length - 1));

  const earthW = kg * 9.8;     // N
  const moonW = kg * 1.62;     // N
  const barMax = 60 * 9.8;

  return (
    <div style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 05</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{tr(step.story, lang)}</p>
        </div>
        <div style={styles.fateBox}>
          <div style={{ ...styles.fateLabel, color: C.sun }}>{t.key}</div>
          <p style={styles.keyTermText}>{tr(step.fact, lang)}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 14 }}>{t.lede}</p>

        {/* step chips */}
        <div style={styles.pickerRow}>
          {STEPS.map((s, k) => (
            <button key={s.id} onClick={() => setI(k)}
              style={{ ...styles.chip, ...(k === i ? styles.chipOn : {}) }}>{tr(s.label, lang)}</button>
          ))}
        </div>

        {/* stage */}
        <div style={{ marginTop: 12, minHeight: 210, borderRadius: 14, border: `1px solid ${C.border}`, background: "rgba(8,12,26,0.6)", padding: 18 }}>
          <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, color: C.cool }}>{tr(step.tag, lang)}</div>
          <div style={{ fontFamily: display, fontSize: 26, margin: "6px 0 10px" }}>{tr(step.label, lang)}</div>

          {!step.demo && (
            <p style={{ ...styles.factText, fontStyle: "italic", margin: 0 }}>{tr(step.story, lang)}</p>
          )}

          {step.demo && (
            <div>
              <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginBottom: 8 }}>{t.demoTitle}</div>
              {[
                { place: t.earth, W: earthW, g: "9.8 m/s²", col: "#4a8fd4" },
                { place: t.moon, W: moonW, g: "1.6 m/s²", col: "#c6cff4" },
              ].map((row) => (
                <div key={row.place} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 13, marginBottom: 4 }}>
                    <span style={{ color: row.col }}>{row.place} · {row.g}</span>
                    <span style={{ color: C.text }}>{t.weight} {Math.round(row.W)} N</span>
                  </div>
                  <div style={{ height: 16, background: "rgba(120,150,210,0.15)", borderRadius: 8, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${(row.W / barMax) * 100}%`, background: row.col, borderRadius: 8, transition: "width 0.3s" }} />
                  </div>
                </div>
              ))}
              <div style={{ fontFamily: mono, fontSize: 14, color: C.sun, marginTop: 8 }}>
                {t.mass}: {kg} kg — {lang === "ja" ? "どこでも同じ" : "the same everywhere"}
              </div>
              <div style={{ fontFamily: mono, fontSize: 13, color: C.faint, marginTop: 12 }}>{t.pick}</div>
              <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                {MASSES.map((m) => (
                  <button key={m} onClick={() => setKg(m)}
                    style={{ ...styles.chip, ...(kg === m ? styles.chipOn : {}) }}>{m} kg</button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* prev / next */}
        <div style={{ ...styles.controlBar, justifyContent: "space-between" }}>
          <button style={{ ...styles.iconBtn, opacity: i === 0 ? 0.4 : 1, cursor: i === 0 ? "default" : "pointer" }}
            onClick={() => go(i - 1)} disabled={i === 0}>{t.prev}</button>
          <span style={{ fontFamily: mono, fontSize: 13, color: C.faint }}>{t.counter(i + 1, STEPS.length)}</span>
          <button style={{ ...styles.iconBtn, opacity: i === STEPS.length - 1 ? 0.4 : 1, cursor: i === STEPS.length - 1 ? "default" : "pointer" }}
            onClick={() => go(i + 1)} disabled={i === STEPS.length - 1}>{t.next}</button>
        </div>
      </div>
    </div>
  );
}

export default NewtonsLaws;
