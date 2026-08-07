/* ============================================================
   GENERALIZED QUIZ ENGINE
   Props: { bank, onExit }
     bank = { easy: [...], medium: [...], hard: [...] }
     question = { q:{en,ja}, options:[{en,ja}...], answer:<idx>, explain:{en,ja} }

   Flow: difficulty picker → 6-question run → results + reward tier
         → optional bonus arcade round.

   Points per correct: easy 5, medium 7, hard 10 (wrong = 0).
   Reward tier from total points:
     points > 25  → { lives: 5, seconds: 300 }
     points >= 15 → { lives: 3, seconds: 180 }
     else         → { lives: 1, seconds: 60 }
   ============================================================ */
import React, { useState } from "react";
import { useLang, tr } from "./i18n.jsx";
import { C } from "./theme.js";
import { shuffle } from "./helpers.js";
import { styles } from "./styles.js";
import { BonusGame } from "./arcade.jsx";

const POINTS = { easy: 5, medium: 7, hard: 10 };

const DIFFICULTIES = [
  {
    id: "beginner",
    label: { en: "Beginner", ja: "初級" },
    blurb: { en: "Six warm-up questions to get you started.", ja: "肩慣らしの6問。まずはここから。" },
    plan: [["easy", 6]],
  },
  {
    id: "intermediate",
    label: { en: "Intermediate", ja: "中級" },
    blurb: { en: "A balanced mix of easy and tougher questions.", ja: "やさしい問題と手ごわい問題をバランスよく。" },
    plan: [["easy", 3], ["medium", 3]],
  },
  {
    id: "advanced",
    label: { en: "Advanced", ja: "上級" },
    blurb: { en: "The full spread — including the hardest questions.", ja: "最難問まで含む総合問題。" },
    plan: [["easy", 2], ["medium", 2], ["hard", 2]],
  },
];

const STR = {
  en: {
    title: "Prove what you learned",
    lede: "Pick a difficulty. Each correct answer earns points; the harder the question, the more it's worth. Rack up enough and you'll unlock a bigger bonus round.",
    pointsWorth: (n) => `${n} pts`,
    start: "Start →",
    question: "Question", score: "Points",
    correct: "Correct", notQuite: "Not quite",
    nextQ: "Next question →", seeResults: "See results →",
    pointsEarned: "points earned", correctCount: (c, n) => `${c} / ${n} correct`,
    rewardLine: (lives, mins) =>
      `You earned ${lives} ${lives === 1 ? "life" : "lives"} and ${mins} ${mins === 1 ? "minute" : "minutes"}.`,
    bonusRound: "▶ Bonus round", tryAgain: "↺ Try again", exit: "Exit",
    bonusUsed: "✓ Bonus round played", bonusUsedHint: "Re-take the quiz to earn another round.",
  },
  ja: {
    title: "学んだことを試そう",
    lede: "難易度を選ぼう。正解ごとにポイント獲得——難しい問題ほど高得点。ポイントを稼げば、より大きなボーナスゲームが解放されます。",
    pointsWorth: (n) => `${n} pt`,
    start: "開始 →",
    question: "問題", score: "ポイント",
    correct: "正解", notQuite: "おしい",
    nextQ: "次の問題 →", seeResults: "結果を見る →",
    pointsEarned: "獲得ポイント", correctCount: (c, n) => `${n}問中 ${c}問 正解`,
    rewardLine: (lives, mins) => `ライフ ${lives} と ${mins} 分を獲得しました。`,
    bonusRound: "▶ ボーナスゲーム", tryAgain: "↺ もう一度", exit: "終了",
    bonusUsed: "✓ ボーナスゲーム終了", bonusUsedHint: "もう一度クイズに挑戦すると、再びプレイできます。",
  },
};

/* Sample each pool (shuffle then slice), shuffle the combined run, and
   shuffle each question's options while tracking the new correct index.
   Every run-question is tagged with its source difficulty for scoring. */
export function buildRun(bank, difficulty) {
  const plan = (DIFFICULTIES.find((d) => d.id === difficulty) || DIFFICULTIES[0]).plan;
  let picked = [];
  for (const [pool, n] of plan) {
    const src = bank[pool] || [];
    picked = picked.concat(shuffle(src).slice(0, n).map((q) => ({ ...q, difficulty: pool })));
  }
  picked = shuffle(picked);
  return picked.map((q) => {
    const correct = q.options[q.answer];
    const opts = shuffle(q.options);
    return { q: q.q, opts, correct: opts.indexOf(correct), explain: q.explain, difficulty: q.difficulty };
  });
}

export function rewardTier(points) {
  if (points > 25) return { lives: 5, seconds: 300 };
  if (points >= 15) return { lives: 3, seconds: 180 };
  return { lives: 1, seconds: 60 };
}

function quizRating(pct) {
  if (pct === 1) return { t: { en: "Astronomer Royal", ja: "王室天文官" }, m: { en: "A perfect run. The cosmos has no secrets left from you.", ja: "全問正解。宇宙に、あなたへの秘密はもう残っていません。" } };
  if (pct >= 0.8) return { t: { en: "Seasoned Navigator", ja: "熟練の航海士" }, m: { en: "You know your way around the sky.", ja: "空の歩き方をよく心得ています。" } };
  if (pct >= 0.6) return { t: { en: "Rising Stargazer", ja: "成長中の星の観測者" }, m: { en: "Solid footing — a little more exploring and you'll master it.", ja: "確かな手応え——もう少し探検すれば完璧です。" } };
  if (pct >= 0.4) return { t: { en: "Apprentice Observer", ja: "見習い観測者" }, m: { en: "A good start. Revisit the stations and come back stronger.", ja: "良い出だし。各ステーションを見直して、もう一度挑もう。" } };
  return { t: { en: "Ground Control", ja: "地上管制" }, m: { en: "Head back out and explore — then return to prove it.", ja: "もう一度探検に出て——それから証明しに戻ろう。" } };
}

export function Quiz({ bank, onExit }) {
  const lang = useLang();
  const t = STR[lang];
  const [difficulty, setDifficulty] = useState(null);
  const [run, setRun] = useState(null);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [points, setPoints] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);
  const [arcade, setArcade] = useState(false);
  const [bonusUsed, setBonusUsed] = useState(false);

  const begin = (diffId) => {
    setDifficulty(diffId); setRun(buildRun(bank, diffId));
    setIdx(0); setPicked(null); setPoints(0); setCorrectCount(0); setDone(false); setArcade(false); setBonusUsed(false);
  };
  const restart = () => {
    setDifficulty(null); setRun(null); setIdx(0); setPicked(null);
    setPoints(0); setCorrectCount(0); setDone(false); setArcade(false); setBonusUsed(false);
  };

  /* ---- difficulty picker ---- */
  if (!difficulty) {
    return (
      <div>
        <div style={styles.quizIntro}>
          <h2 style={styles.quizH2}>{t.title}</h2>
          <p style={styles.quizLede}>{t.lede}</p>
        </div>
        <div style={styles.topicGrid}>
          {DIFFICULTIES.map((d) => (
            <button key={d.id} style={styles.topicCard} onClick={() => begin(d.id)}>
              <span style={styles.topicLabel}>{tr(d.label, lang)}</span>
              <span style={styles.topicBlurb}>{tr(d.blurb, lang)}</span>
              <span style={styles.topicGo}>{t.start}</span>
            </button>
          ))}
        </div>
        {onExit && (
          <div style={{ textAlign: "center", marginTop: 18 }}>
            <button style={styles.chip} onClick={onExit}>{t.exit}</button>
          </div>
        )}
      </div>
    );
  }

  /* ---- results ---- */
  if (done) {
    const total = run.length;
    const pct = correctCount / total;
    const r = quizRating(pct);
    const tier = rewardTier(points);
    if (arcade) return <BonusGame reward={tier} onExit={() => setArcade(false)} onFinish={() => setBonusUsed(true)} />;
    return (
      <div style={styles.resultWrap}>
        <div style={styles.resultRing}>
          <span style={styles.resultScore}>{points}</span>
          <span style={styles.resultPct}>{t.pointsEarned}</span>
        </div>
        <div style={styles.ratingTitle}>{tr(r.t, lang)}</div>
        <p style={styles.ratingMsg}>{tr(r.m, lang)}</p>
        <div style={styles.bestStreak}>{t.correctCount(correctCount, total)}</div>
        <div style={styles.penaltyBox}>{t.rewardLine(tier.lives, Math.round(tier.seconds / 60))}</div>
        {bonusUsed ? (
          <div style={{ textAlign: "center" }}>
            <button style={{ ...styles.bonusBtn, opacity: 0.45, cursor: "default" }} disabled>{t.bonusUsed}</button>
            <p style={{ ...styles.hint, marginTop: 8 }}>{t.bonusUsedHint}</p>
          </div>
        ) : (
          <button style={styles.bonusBtn} onClick={() => setArcade(true)}>{t.bonusRound}</button>
        )}
        <div style={styles.resultBtns}>
          <button style={styles.iconBtn} onClick={restart}>{t.tryAgain}</button>
          {onExit && <button style={styles.chip} onClick={onExit}>{t.exit}</button>}
        </div>
      </div>
    );
  }

  if (!run) return null;
  const q = run[idx];
  const answered = picked !== null;

  const choose = (i) => {
    if (answered) return;
    setPicked(i);
    if (i === q.correct) {
      setPoints((p) => p + (POINTS[q.difficulty] ?? POINTS.easy));
      setCorrectCount((c) => c + 1);
    }
  };
  const next = () => {
    if (idx + 1 < run.length) { setIdx(idx + 1); setPicked(null); } else setDone(true);
  };

  return (
    <div>
      <div style={styles.quizTop}>
        <span style={styles.quizCount}>{t.question} {idx + 1} / {run.length}</span>
        <span style={styles.quizScore}>{t.score} {points}</span>
      </div>
      <div style={styles.progressTrack}>
        <div style={{ ...styles.progressFill, width: `${((idx + (answered ? 1 : 0)) / run.length) * 100}%` }} />
      </div>
      <h3 style={styles.qText}>{tr(q.q, lang)}</h3>
      <div style={styles.optCol}>
        {q.opts.map((opt, i) => {
          let st = { ...styles.opt };
          if (answered) {
            if (i === q.correct) st = { ...st, ...styles.optCorrect };
            else if (i === picked) st = { ...st, ...styles.optWrong };
            else st = { ...st, ...styles.optDim };
          }
          const mark = answered && i === q.correct ? "✓" : answered && i === picked ? "✕" : String.fromCharCode(65 + i);
          return (
            <button key={i} style={st} onClick={() => choose(i)} disabled={answered}>
              <span style={styles.optMark}>{mark}</span>
              {tr(opt, lang)}
            </button>
          );
        })}
      </div>
      {answered && (
        <div style={styles.explainBox}>
          <div style={{ ...styles.explainTag, color: picked === q.correct ? C.good : C.danger }}>
            {picked === q.correct ? t.correct : t.notQuite}
          </div>
          <p style={styles.explainText}>{tr(q.explain, lang)}</p>
          <button style={styles.nextBtn} onClick={next}>{idx + 1 < run.length ? t.nextQ : t.seeResults}</button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
