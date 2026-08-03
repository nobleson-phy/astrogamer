import React, { useState, useRef, useEffect, useMemo, useContext } from "react";

/* ============================================================
   COSMIC EXPLORER
   A bilingual (EN / 日本語) exploration game to teach astronomy.
   Realms: Solar System · Star Forge · Night Sky · Cosmic Scale + Quiz
   Translatable text is stored as { en, ja } and resolved with tr().
   Extend by adding to the data arrays / BANKS / CONSTELLATIONS.
   ============================================================ */

const C = {
  void: "#05060d", deep: "#0a0e1c", panel: "rgba(15,21,40,0.72)",
  border: "rgba(120,150,210,0.16)", borderBright: "rgba(140,175,235,0.35)",
  text: "#e9edf7", muted: "#8b96b0", faint: "#5a6480",
  sun: "#ffcf6b", sunDeep: "#f5a742", cool: "#63d3f0", violet: "#b58cf0",
  danger: "#ff7a6b", good: "#5fd39a",
};

const FONT_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,300;0,400;0,600;1,300&family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&family=Noto+Sans+JP:wght@400;500;600&display=swap');";

const display = "'Spectral', 'Noto Sans JP', Georgia, serif";
const ui = "'Inter', 'Noto Sans JP', system-ui, sans-serif";
const mono = "'Space Mono', 'Noto Sans JP', ui-monospace, monospace";

const reduceMotion =
  typeof window !== "undefined" && window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- i18n ---------- */
const LangCtx = React.createContext("en");
const useLang = () => useContext(LangCtx);
const tr = (v, lang) =>
  v && typeof v === "object" && v.en !== undefined ? (v[lang] ?? v.en) : v;

const UI = {
  en: {
    eyebrow: "AN INTERACTIVE JOURNEY THROUGH ASTRONOMY",
    tagline: "Set worlds in motion, forge a star and watch it die, trace the constellations, then fall outward to the edge of everything we can see.",
    footer: "A prototype teaching tool · every fact is real, the visuals are scaled for clarity, not accuracy.",
    play: "▶ Play", pause: "❚❚ Pause", zoom: "Zoom", reset: "Reset", time: "Time",
    trueDist: "True distances", compressed: "Compressed", days: "days", yr: "yr",
    solarHint: "Scroll or pinch to zoom · drag to pan · tap a world or use the buttons above.",
    realScaleNote: "True-to-scale distances squeeze the inner planets almost onto the Sun — a real lesson in how empty the solar system is. Zoom in to find them.",
    planetPanelHint: "Read each world's fact — the quiz asks about them.",
    distanceFromSun: "Distance from Sun", diameter: "Diameter", orbitalPeriod: "Orbital period",
    dayLength: "Day length", moons: "Moons", days_u: "days", years_u: "years",
    birthMass: "Birth mass", timesSun: "× the Sun", runLife: "▶ Run its life", resetLife: "↺ Reset",
    stage: "Stage",
    setMassNote: "Drag the dial to set the star's birth mass, then run its life. Mass is destiny — it decides everything from here.",
    spectralClass: "Spectral class", surfaceTemp: "Surface temperature", msLife: "Main-sequence life",
    hotterBlue: "Hotter = blue", coolerRed: "Cooler = red",
    lifeStartFinish: "ITS LIFE, START TO FINISH", finalFate: "FINAL FATE",
    revealShapes: "Reveal the shapes", hideLines: "Hide the lines",
    skyHint: "Tap a constellation on the sky to read its story.",
    skyNote: "Star positions here are simplified to make each shape easy to learn — a real star chart is the natural next step.",
    zoomIn: "‹ Zoom in", zoomOut: "Zoom out ›",
    prevDotA: "The dot at the center is ", prevDotB: " — the entire previous view, now a speck.",
    keyTerm: "KEY TERM", lyA: "A ", lyWord: "light-year",
    lyB: " is a distance, not a time — how far light travels in one year, about 9.5 trillion km.",
    quizTitle: "Prove what you learned",
    quizLede: "Every answer here can be found by exploring its realm first — so wander through, read the panels, then come back and test yourself. Pick a subject, or take the Grand Tour for a mix of everything.",
    start: "Start →", question: "Question", score: "Score", streak: "streak",
    correct: "Correct", notQuite: "Not quite", nextQ: "Next question →", seeResults: "See results →",
    tryAgain: "↺ Try again", anotherSubject: "Choose another subject",
    bestStreak: (n) => `Best streak: ${n} correct in a row`,
    verify: (label) => `Explored ${label}? See if it stuck.`,
    takeQuiz: (label) => `Take the ${label} quiz →`,
    arcadeTitle: "Asteroid Defense",
    bonusLede: "You earned a bonus round!",
    penaltyNote: (n) => `${n} wrong answer${n === 1 ? "" : "s"} → you start with only ${clamp(3 - n, 1, 3)} shield${clamp(3 - n, 1, 3) === 1 ? "" : "s"}.`,
    penaltyNone: "Perfect quiz — full shields and calmer skies. Enjoy!",
    arcadeControls: "Move: ◀ ▶ · arrow keys · drag  |  Fire: FIRE · space · hold",
    startGame: "▶ Start", fire: "FIRE", gameOver: "Game Over",
    playAgain: "↺ Play again", backToResults: "‹ Back to results",
    bonusRound: "▶ Bonus round",
    controlsShoot: "Move: ◀ ▶ · arrows · drag  |  Fire: FIRE · space",
    controlsMove: "Move: ◀ ▶ · arrow keys · drag",
    controlsTap: "Tap the stars in number order",
    howToPlay: "How to play",
    labelGoal: "Goal", labelControls: "Controls", labelAvoid: "Avoid", labelShields: "Shields",
    shieldsRule: "Lose all your shields and the game ends.",
  },
  ja: {
    eyebrow: "天文学をめぐるインタラクティブな旅",
    tagline: "惑星をめぐらせ、星を生み出してその死を見届け、星座をたどり、そして観測できる宇宙の果てまで一気にズームアウト。",
    footer: "学習用のプロトタイプです · 事実はすべて本物ですが、見た目は正確さより分かりやすさを優先しています。",
    play: "▶ 再生", pause: "❚❚ 停止", zoom: "ズーム", reset: "リセット", time: "時間",
    trueDist: "実際の距離", compressed: "圧縮表示", days: "日", yr: "年",
    solarHint: "スクロールやピンチでズーム · ドラッグで移動 · 惑星をタップするか上のボタンで選択。",
    realScaleNote: "実際の縮尺では、内側の惑星は太陽にほぼ重なってしまいます——太陽系がいかにスカスカかがよく分かります。ズームインして探してみてください。",
    planetPanelHint: "各惑星の豆知識を読んでおこう——クイズで問われます。",
    distanceFromSun: "太陽からの距離", diameter: "直径", orbitalPeriod: "公転周期",
    dayLength: "1日の長さ", moons: "衛星", days_u: "日", years_u: "年",
    birthMass: "誕生時の質量", timesSun: "× 太陽質量", runLife: "▶ 一生を再生", resetLife: "↺ リセット",
    stage: "段階",
    setMassNote: "ダイヤルで星の誕生時の質量を決め、一生を再生してみよう。質量こそが運命——ここから先のすべてを決めます。",
    spectralClass: "スペクトル型", surfaceTemp: "表面温度", msLife: "主系列での寿命",
    hotterBlue: "高温 = 青", coolerRed: "低温 = 赤",
    lifeStartFinish: "誕生から最期まで", finalFate: "最期の姿",
    revealShapes: "形を表示", hideLines: "線を隠す",
    skyHint: "空の星座をタップすると、その物語が読めます。",
    skyNote: "形を覚えやすいよう星の位置は簡略化しています——本物の星図が次のステップです。",
    zoomIn: "‹ ズームイン", zoomOut: "ズームアウト ›",
    prevDotA: "中心の点は", prevDotB: "——ひとつ前の視野全体が、今や小さな点です。",
    keyTerm: "重要語", lyA: "", lyWord: "光年",
    lyB: "は時間ではなく距離の単位です——光が1年間に進む距離で、約9兆5000億kmです。",
    quizTitle: "学んだことを試そう",
    quizLede: "ここでの答えはすべて、まず各エリアを探検すれば見つかります。じっくり見て回り、パネルを読んでから戻って挑戦しましょう。分野を選ぶか、全分野ミックスのグランドツアーへ。",
    start: "開始 →", question: "問題", score: "得点", streak: "連続正解",
    correct: "正解", notQuite: "おしい", nextQ: "次の問題 →", seeResults: "結果を見る →",
    tryAgain: "↺ もう一度", anotherSubject: "別の分野を選ぶ",
    bestStreak: (n) => `最高連続正解：${n}問`,
    verify: (label) => `${label}を探検した？ 身についたか試そう。`,
    takeQuiz: (label) => `${label}のクイズに挑戦 →`,
    arcadeTitle: "小惑星ディフェンス",
    bonusLede: "ボーナスゲーム解放！",
    penaltyNote: (n) => `不正解 ${n} 問 → シールド ${clamp(3 - n, 1, 3)} で開始。`,
    penaltyNone: "全問正解——シールド満タン、静かな空。楽しんで！",
    arcadeControls: "移動：◀ ▶ · 矢印キー · ドラッグ  |  発射：FIRE · スペース · 長押し",
    startGame: "▶ スタート", fire: "発射", gameOver: "ゲームオーバー",
    playAgain: "↺ もう一度", backToResults: "‹ 結果に戻る",
    bonusRound: "▶ ボーナスゲーム",
    controlsShoot: "移動：◀ ▶ · 矢印 · ドラッグ  |  発射：FIRE · スペース",
    controlsMove: "移動：◀ ▶ · 矢印キー · ドラッグ",
    controlsTap: "星を番号順にタップ",
    howToPlay: "遊び方",
    labelGoal: "目的", labelControls: "操作", labelAvoid: "注意", labelShields: "シールド",
    shieldsRule: "シールドをすべて失うとゲーム終了。",
  },
};

/* ---------- helpers ---------- */
function hexToRgb(h) {
  const s = h.replace("#", "");
  return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)];
}
function lerp(a, b, t) { return a + (b - a) * t; }
function lerpColor(c1, c2, t) {
  const a = hexToRgb(c1), b = hexToRgb(c2);
  return `rgb(${Math.round(lerp(a[0], b[0], t))},${Math.round(lerp(a[1], b[1], t))},${Math.round(lerp(a[2], b[2], t))})`;
}
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

function useMeasure() {
  const ref = useRef(null);
  const [w, setW] = useState(760);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setW(Math.max(280, e.contentRect.width));
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, w];
}

function setupCanvas(canvas, w, h) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return ctx;
}

/* ============================================================
   DATA
   ============================================================ */
const KIND = {
  rocky: { en: "Rocky planet", ja: "岩石惑星" },
  gas: { en: "Gas giant", ja: "巨大ガス惑星" },
  ice: { en: "Ice giant", ja: "巨大氷惑星" },
};

const SUN = {
  name: { en: "The Sun", ja: "太陽" }, kind: { en: "G-type star", ja: "G型星" },
  color: "#ffd36b", diameter: 1392700, au: 0, period: null,
  day: { en: "~25 Earth days (equator)", ja: "約25日（赤道）" },
  moons: { en: "8 planets orbit it", ja: "8つの惑星が周回" },
  fact: { en: "It holds 99.86% of all the mass in the solar system.", ja: "太陽系の全質量の99.86%を占めています。" },
  radius: 22,
};

const PLANETS = [
  { name: { en: "Mercury", ja: "水星" }, kind: KIND.rocky, color: "#9a9285", diameter: 4879, au: 0.39, period: 88, day: { en: "176 Earth days", ja: "176日" }, moons: { en: "0", ja: "0" }, fact: { en: "A year here is shorter than two of its own days.", ja: "1年が自転2回分より短い惑星です。" }, r: 4 },
  { name: { en: "Venus", ja: "金星" }, kind: KIND.rocky, color: "#e6c17a", diameter: 12104, au: 0.72, period: 224.7, day: { en: "243 Earth days", ja: "243日" }, moons: { en: "0", ja: "0" }, fact: { en: "It spins backwards, and a day lasts longer than its year.", ja: "自転が逆向きで、1日が1年より長い惑星です。" }, r: 6.5 },
  { name: { en: "Earth", ja: "地球" }, kind: KIND.rocky, color: "#4a8fd4", diameter: 12742, au: 1.0, period: 365.25, day: { en: "24 hours", ja: "24時間" }, moons: { en: "1", ja: "1" }, fact: { en: "The only place in the universe life is known to exist.", ja: "宇宙で唯一、生命が確認されている場所です。" }, r: 6.7 },
  { name: { en: "Mars", ja: "火星" }, kind: KIND.rocky, color: "#d1603f", diameter: 6779, au: 1.52, period: 687, day: { en: "24.6 hours", ja: "24.6時間" }, moons: { en: "2", ja: "2" }, fact: { en: "Home to Olympus Mons, a volcano nearly three times Everest's height.", ja: "エベレストの約3倍の高さの火山オリンポス山があります。" }, r: 5 },
  { name: { en: "Jupiter", ja: "木星" }, kind: KIND.gas, color: "#d8a97a", diameter: 139820, au: 5.2, period: 4331, day: { en: "9.9 hours", ja: "9.9時間" }, moons: { en: "95 known", ja: "95個（確認）" }, fact: { en: "Its Great Red Spot is a storm wider than Earth, raging for centuries.", ja: "大赤斑は地球より大きく、何世紀も続く巨大な嵐です。" }, r: 15 },
  { name: { en: "Saturn", ja: "土星" }, kind: KIND.gas, color: "#e6cfa0", diameter: 116460, au: 9.58, period: 10747, day: { en: "10.7 hours", ja: "10.7時間" }, moons: { en: "146 known", ja: "146個（確認）" }, fact: { en: "So light it would float in a bathtub large enough to hold it.", ja: "密度が水より低く、十分大きな水があれば浮きます。" }, r: 13, ring: true },
  { name: { en: "Uranus", ja: "天王星" }, kind: KIND.ice, color: "#a7e3ea", diameter: 50724, au: 19.2, period: 30589, day: { en: "17 hours", ja: "17時間" }, moons: { en: "28 known", ja: "28個（確認）" }, fact: { en: "It orbits tipped on its side, rolling around the Sun like a ball.", ja: "横倒しの姿勢で、ボールのように転がりながら公転します。" }, r: 9 },
  { name: { en: "Neptune", ja: "海王星" }, kind: KIND.ice, color: "#4a6fd4", diameter: 49244, au: 30.1, period: 59800, day: { en: "16 hours", ja: "16時間" }, moons: { en: "16 known", ja: "16個（確認）" }, fact: { en: "Winds here scream at over 2,000 km/h — the fastest in the solar system.", ja: "時速2,000kmを超える暴風が吹く、太陽系で最も速い風です。" }, r: 8.7 },
];

const CONSTELLATIONS = [
  {
    name: { en: "Orion", ja: "オリオン座" }, anchor: [0.15, 0.28], scale: 0.22,
    stars: [[0.2, 0.15], [0.62, 0.12], [0.36, 0.5], [0.46, 0.53], [0.56, 0.56], [0.28, 0.9], [0.74, 0.9]],
    lines: [[0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6]],
    notable: { en: "Betelgeuse · Rigel", ja: "ベテルギウス・リゲル" },
    info: { en: "The Hunter. Its three-star belt points down to Sirius, the brightest star in the night sky. Betelgeuse is a dying red supergiant; Rigel a brilliant blue one.", ja: "狩人オリオン。三つ星のベルトをたどるとシリウス（全天で最も明るい星）へ。ベテルギウスは死にゆく赤色超巨星、リゲルは青く輝く星です。" },
  },
  {
    name: { en: "Taurus", ja: "おうし座" }, anchor: [0.38, 0.22], scale: 0.22,
    stars: [[0.1, 0.2], [0.3, 0.45], [0.45, 0.6], [0.6, 0.42], [0.82, 0.25]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]],
    notable: { en: "Aldebaran", ja: "アルデバラン" },
    info: { en: "The Bull. Its face is a V of stars called the Hyades, anchored by the orange giant Aldebaran, glaring like a red eye.", ja: "牡牛座。V字に並ぶ星々（ヒヤデス星団）が顔をつくり、オレンジ色の巨星アルデバランが赤い目のように光ります。" },
  },
  {
    name: { en: "Ursa Major", ja: "おおぐま座" }, anchor: [0.64, 0.2], scale: 0.28,
    stars: [[0.05, 0.55], [0.28, 0.62], [0.5, 0.55], [0.42, 0.35], [0.62, 0.3], [0.8, 0.2], [0.97, 0.28]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [4, 5], [5, 6]],
    notable: { en: "The Big Dipper", ja: "北斗七星" },
    info: { en: "The Great Bear. Its Big Dipper asterism is a signpost of the northern sky — the two stars at the end of the bowl point straight to Polaris, the North Star.", ja: "大熊座。その一部である北斗七星は北の空の道しるべ。ひしゃくの先端の二つの星をつなぐと、北極星（ポラリス）を指します。" },
  },
  {
    name: { en: "Cassiopeia", ja: "カシオペヤ座" }, anchor: [0.88, 0.26], scale: 0.18,
    stars: [[0.05, 0.7], [0.3, 0.25], [0.5, 0.7], [0.72, 0.28], [0.95, 0.68]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]],
    notable: { en: "The 'W'", ja: "Ｗの形" },
    info: { en: "The Queen. An unmistakable 'W' (or 'M') that wheels around Polaris opposite the Big Dipper, so one of them is always up.", ja: "王妃カシオペヤ。北極星をはさんで北斗七星の反対側を回る、まぎれもない『Ｗ』字。どちらか一方は常に空に出ています。" },
  },
  {
    name: { en: "Leo", ja: "しし座" }, anchor: [0.15, 0.56], scale: 0.24,
    stars: [[0.25, 0.7], [0.25, 0.5], [0.3, 0.32], [0.44, 0.25], [0.52, 0.4], [0.72, 0.55], [0.88, 0.7]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [4, 5]],
    notable: { en: "Regulus", ja: "レグルス" },
    info: { en: "The Lion. A backwards question mark — the 'Sickle' — outlines its mane, ending at the bright star Regulus.", ja: "獅子座。逆さの『？』の形をした『ししの大鎌』がたてがみを描き、その先で明るい星レグルスが輝きます。" },
  },
  {
    name: { en: "Lyra", ja: "こと座" }, anchor: [0.37, 0.52], scale: 0.13,
    stars: [[0.5, 0.15], [0.35, 0.45], [0.62, 0.4], [0.4, 0.78], [0.67, 0.72]],
    lines: [[0, 1], [0, 2], [1, 2], [1, 3], [2, 4], [3, 4]],
    notable: { en: "Vega", ja: "ベガ" },
    info: { en: "The Harp. Small but easy to find thanks to Vega, one of the brightest stars in the sky and a corner of the Summer Triangle.", ja: "琴座。小さな星座ですが、全天でも指折りに明るいベガのおかげで見つけやすく、夏の大三角の一角でもあります。" },
  },
  {
    name: { en: "Cygnus", ja: "はくちょう座" }, anchor: [0.56, 0.53], scale: 0.2,
    stars: [[0.5, 0.05], [0.5, 0.45], [0.5, 0.92], [0.16, 0.4], [0.84, 0.42]],
    lines: [[0, 1], [1, 2], [3, 1], [1, 4]],
    notable: { en: "Deneb", ja: "デネブ" },
    info: { en: "The Swan, gliding down the Milky Way. Its bright tail-star Deneb marks one corner of the Summer Triangle.", ja: "天の川を舞い下りる白鳥。尾に輝くデネブは、夏の大三角の一角を担います。" },
  },
  {
    name: { en: "Summer Triangle", ja: "夏の大三角" }, anchor: [0.84, 0.56], scale: 0.22,
    stars: [[0.3, 0.2], [0.72, 0.15], [0.5, 0.85]],
    lines: [[0, 1], [1, 2], [2, 0]],
    notable: { en: "Asterism · Vega · Deneb · Altair", ja: "アステリズム・ベガ・デネブ・アルタイル" },
    info: { en: "Not a constellation but an asterism — a giant triangle linking Vega, Deneb, and Altair across three constellations. It rides high on summer nights.", ja: "星座ではなく『アステリズム（星の並び）』。ベガ・デネブ・アルタイルの三つの一等星を結ぶ大きな三角形で、夏の夜空高くにかかります。" },
  },
  {
    name: { en: "Scorpius", ja: "さそり座" }, anchor: [0.2, 0.83], scale: 0.22,
    stars: [[0.15, 0.1], [0.3, 0.28], [0.4, 0.46], [0.55, 0.62], [0.7, 0.78], [0.82, 0.92], [0.66, 0.98]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]],
    notable: { en: "Antares", ja: "アンタレス" },
    info: { en: "The Scorpion. Its red heart, Antares, glows so much like Mars that its name means 'rival of Ares' — the war planet.", ja: "さそり座。その心臓で赤く輝くアンタレスは火星とよく似た色で、名前は『火星（アレス）の敵（アンチ）』を意味します。" },
  },
  {
    name: { en: "Crux (Southern Cross)", ja: "みなみじゅうじ座（南十字星）" }, anchor: [0.52, 0.84], scale: 0.12,
    stars: [[0.5, 0.1], [0.5, 0.9], [0.2, 0.45], [0.8, 0.5]],
    lines: [[0, 1], [2, 3]],
    notable: { en: "Acrux · points south", ja: "アクルックス・南を指す" },
    info: { en: "The smallest constellation, but famous: the long arm of its cross points toward the south celestial pole, guiding travellers below the equator.", ja: "全天で最も小さい星座ですが有名です。十字の長い軸をのばすと天の南極を指し示し、南半球の旅人の道しるべとなります。" },
  },
];

const SCALE_STEPS = [
  { name: { en: "Earth", ja: "地球" }, size: { en: "12,742 km across", ja: "直径 12,742 km" }, blurb: { en: "Home. From out here, everything that has ever happened to our species fits on this single point.", ja: "私たちの故郷。ここから見れば、人類に起きたすべての出来事がこの一点に収まります。" }, tint: "#4a8fd4" },
  { name: { en: "Earth & Moon", ja: "地球と月" }, size: { en: "384,400 km apart", ja: "約 384,400 km 離れている" }, blurb: { en: "The Moon sits about 30 Earth-widths away — far enough that every planet in the solar system could be lined up in the gap.", ja: "月は地球約30個分の彼方。太陽系の全惑星をその隙間に一列に並べられるほどの距離です。" }, tint: "#9fb3d0" },
  { name: { en: "The Solar System", ja: "太陽系" }, size: { en: "~9 billion km wide", ja: "幅 約90億 km" }, blurb: { en: "Out to Neptune. Sunlight (300,000 km/s) still takes over four hours to reach it — and about 8 minutes to reach Earth.", ja: "海王星まで。太陽の光（秒速30万km）でも渡り切るのに4時間以上、地球へは約8分かかります。" }, tint: "#ffcf6b" },
  { name: { en: "To the Nearest Star", ja: "最も近い恒星まで" }, size: { en: "4.24 light-years", ja: "4.24 光年" }, blurb: { en: "Proxima Centauri. Its light left more than four years ago to reach your eye tonight. Nothing we've built could get there in a human lifetime.", ja: "プロキシマ・ケンタウリ。その光は4年以上前に出発して今夜あなたの目に届きます。人類の作った物では一生かかっても到達できません。" }, tint: "#ff9a6b" },
  { name: { en: "The Milky Way", ja: "天の川銀河" }, size: { en: "~100,000 light-years", ja: "約 100,000 光年" }, blurb: { en: "Our galaxy: a spiral of 100–400 billion stars. The Sun is one anonymous speck two-thirds of the way out from the center.", ja: "私たちの銀河。1000〜4000億個の星が渦を巻き、太陽は中心から2/3ほど外側の無名の一点です。" }, tint: "#cbb6ff" },
  { name: { en: "The Local Group", ja: "局部銀河群" }, size: { en: "~10 million light-years", ja: "約 1000万 光年" }, blurb: { en: "The Milky Way, the Andromeda Galaxy, and roughly 80 smaller galaxies, all bound together by gravity.", ja: "天の川銀河、アンドロメダ銀河、そして約80個の小さな銀河が重力で結びついた集団です。" }, tint: "#8ad0ff" },
  { name: { en: "The Cosmic Web", ja: "宇宙の大規模構造" }, size: { en: "hundreds of millions of ly", ja: "数億 光年" }, blurb: { en: "Galaxies aren't scattered at random — they string along vast filaments and sheets, wrapped around emptier voids.", ja: "銀河は無秩序に散らばってはいません。巨大なフィラメント（糸）状に連なり、より空っぽな『ボイド（空洞）』を取り囲みます。" }, tint: "#b58cf0" },
  { name: { en: "The Observable Universe", ja: "観測可能な宇宙" }, size: { en: "~93 billion light-years", ja: "約 930億 光年" }, blurb: { en: "Everything whose light has had time to reach us: around two trillion galaxies. Beyond this edge, there is almost certainly more — we simply cannot see it yet.", ja: "その光が私たちに届くだけの時間があった、すべて——約2兆個の銀河。この果ての向こうにも、まず間違いなくもっと宇宙は広がっています。ただ、私たちにはまだ見えないのです。" }, tint: "#e9edf7" },
];

/* ---------- quiz content (drawn from what each realm teaches) ---------- */
const QUIZ_TOPICS = [
  { id: "solar", label: { en: "Solar System", ja: "太陽系" }, blurb: { en: "The Sun and its eight worlds.", ja: "太陽と8つの世界。" } },
  { id: "star", label: { en: "Stellar Lives", ja: "恒星の一生" }, blurb: { en: "How stars are born, live, and die.", ja: "星が生まれ、生き、死ぬまで。" } },
  { id: "sky", label: { en: "The Night Sky", ja: "夜空" }, blurb: { en: "Constellations and their brightest stars.", ja: "星座と、その中で最も明るい星たち。" } },
  { id: "scale", label: { en: "Cosmic Scale", ja: "宇宙のスケール" }, blurb: { en: "Distances from here to the edge of sight.", ja: "ここから見える宇宙の果てまでの距離。" } },
  { id: "grand", label: { en: "Grand Tour", ja: "グランドツアー" }, blurb: { en: "A mix from every realm — the final exam.", ja: "全分野からの総合問題——最終試験。" } },
];

const O = (en, ja) => ({ en, ja });
const BANKS = {
  solar: [
    { q: O("Which planet rotates so slowly that a single day there lasts longer than its whole year?", "自転がとても遅く、1日が1年より長い惑星はどれ？"), options: [O("Venus", "金星"), O("Mercury", "水星"), O("Mars", "火星"), O("Neptune", "海王星")], answer: 0, explain: O("Venus takes 243 Earth days to spin once, but only 225 to orbit the Sun — and it spins backwards too.", "金星は自転に243日かかりますが、公転はわずか225日——しかも逆回転です。") },
    { q: O("Olympus Mons, the tallest volcano in the solar system, stands on which planet?", "太陽系一高い火山オリンポス山があるのはどの惑星？"), options: [O("Mars", "火星"), O("Earth", "地球"), O("Jupiter", "木星"), O("Mercury", "水星")], answer: 0, explain: O("Mars' Olympus Mons rises nearly three times the height of Mount Everest.", "火星のオリンポス山はエベレストの約3倍の高さです。") },
    { q: O("Which planet is so low in density it would float in a large enough ocean of water?", "密度が低く、十分大きな水があれば浮いてしまう惑星は？"), options: [O("Saturn", "土星"), O("Jupiter", "木星"), O("Uranus", "天王星"), O("Neptune", "海王星")], answer: 0, explain: O("Saturn's average density is less than that of water.", "土星の平均密度は水よりも低いのです。") },
    { q: O("The Great Red Spot — a storm wider than Earth — rages on which planet?", "地球より大きい嵐『大赤斑』があるのはどの惑星？"), options: [O("Jupiter", "木星"), O("Mars", "火星"), O("Saturn", "土星"), O("Venus", "金星")], answer: 0, explain: O("Jupiter's storm has been churning for centuries.", "木星のこの嵐は何世紀も渦を巻き続けています。") },
    { q: O("Which planet orbits the Sun tipped almost completely on its side?", "ほぼ横倒しの姿勢で公転している惑星は？"), options: [O("Uranus", "天王星"), O("Neptune", "海王星"), O("Saturn", "土星"), O("Mercury", "水星")], answer: 0, explain: O("Uranus is tilted about 98°, so it rolls around its orbit.", "天王星は約98°傾いていて、転がるように公転します。") },
    { q: O("Where do the fastest winds in the solar system blow?", "太陽系で最も速い風が吹くのはどこ？"), options: [O("Neptune", "海王星"), O("Jupiter", "木星"), O("Earth", "地球"), O("Mars", "火星")], answer: 0, explain: O("Neptune's winds scream past 2,000 km/h.", "海王星の風は時速2,000kmを超えます。") },
    { q: O("About how much of the solar system's total mass is held in the Sun?", "太陽系の全質量のうち、太陽が占める割合はおよそ？"), options: [O("About 99.9%", "約99.9%"), O("About 75%", "約75%"), O("About 50%", "約50%"), O("About 90%", "約90%")], answer: 0, explain: O("The Sun holds 99.86% of all the mass in the solar system.", "太陽は太陽系の全質量の99.86%を占めています。") },
    { q: O("Which is the smallest of the eight planets?", "8つの惑星の中で最も小さいのは？"), options: [O("Mercury", "水星"), O("Mars", "火星"), O("Earth", "地球"), O("Venus", "金星")], answer: 0, explain: O("Mercury has the smallest diameter of the eight planets.", "水星は8惑星の中で最も直径が小さい惑星です。") },
    { q: O("Which planet takes the longest to orbit the Sun?", "太陽を1周するのに最も長くかかる惑星は？"), options: [O("Neptune", "海王星"), O("Jupiter", "木星"), O("Earth", "地球"), O("Mars", "火星")], answer: 0, explain: O("Neptune's year lasts about 165 Earth years — it is the farthest planet.", "海王星の1年は約165年——最も外側の惑星です。") },
    { q: O("Which planet is famous for the brightest, widest rings?", "最も明るく幅広いリング（環）で有名な惑星は？"), options: [O("Saturn", "土星"), O("Jupiter", "木星"), O("Uranus", "天王星"), O("Neptune", "海王星")], answer: 0, explain: O("All four giants have rings, but Saturn's are by far the most spectacular.", "4つの巨大惑星すべてに環がありますが、土星の環が群を抜いて見事です。") },
  ],
  star: [
    { q: O("What single property at birth decides almost a star's entire future?", "星の未来をほぼ決定づける、誕生時の唯一の性質は？"), options: [O("Its mass", "質量"), O("Its color", "色"), O("Its distance", "距離"), O("Its brightness", "明るさ")], answer: 0, explain: O("Mass sets a star's temperature, lifespan, and exactly how it will die.", "質量が温度・寿命・最期の姿までを決めます。") },
    { q: O("What does a Sun-like star leave behind when it dies?", "太陽のような星が死ぬと、何を残す？"), options: [O("A white dwarf", "白色矮星"), O("A black hole", "ブラックホール"), O("A neutron star", "中性子星"), O("Nothing at all", "何も残さない")], answer: 0, explain: O("After its red-giant phase it sheds a nebula and leaves an Earth-sized white dwarf.", "赤色巨星の後に星雲を放出し、地球ほどの白色矮星を残します。") },
    { q: O("A star roughly 25 times the Sun's mass most likely ends as…", "太陽の約25倍の質量の星は、最期におそらく何になる？"), options: [O("A black hole", "ブラックホール"), O("A white dwarf", "白色矮星"), O("A red dwarf", "赤色矮星"), O("A planet", "惑星")], answer: 0, explain: O("The most massive stars collapse into black holes after going supernova.", "最も重い星は超新星のあと、つぶれてブラックホールになります。") },
    { q: O("Which of these shines for the longest time?", "最も長く輝き続けるのはどれ？"), options: [O("A low-mass red dwarf", "軽い赤色矮星"), O("A Sun-like star", "太陽型の星"), O("A blue supergiant", "青色超巨星"), O("A red giant", "赤色巨星")], answer: 0, explain: O("Red dwarfs burn so frugally they can last trillions of years — none have died yet.", "赤色矮星は燃費が良く数兆年輝きます——まだ寿命を終えた例はありません。") },
    { q: O("A Sun-like star runs out of core hydrogen. What happens next?", "太陽型の星が中心の水素を使い果たすと、次に何が起きる？"), options: [O("It swells into a red giant", "赤色巨星に膨らむ"), O("It explodes at once", "すぐ爆発する"), O("It turns bright blue", "青く輝きだす"), O("It goes instantly dark", "一瞬で暗くなる")], answer: 0, explain: O("Fusion moves to a shell and the star balloons enormously.", "核融合が外層に移り、星は大きく膨れ上がります。") },
    { q: O("By color, which stars are the hottest?", "色でいうと、最も高温の星は？"), options: [O("Blue", "青"), O("Red", "赤"), O("Yellow", "黄"), O("Orange", "橙")], answer: 0, explain: O("Hotter stars glow blue-white; cooler ones glow red.", "高温の星は青白く、低温の星は赤く輝きます。") },
    { q: O("A 'planetary nebula' is really…", "『惑星状星雲』の正体は？"), options: [O("Gas shed by a dying star", "死にゆく星が放ったガス"), O("A planet being born", "生まれつつある惑星"), O("A kind of galaxy", "銀河の一種"), O("A young black hole", "若いブラックホール")], answer: 0, explain: O("The name is a historical mistake — it has nothing to do with planets.", "名前は歴史的な誤りで、惑星とは無関係です。") },
    { q: O("What is our Sun's spectral class?", "私たちの太陽のスペクトル型は？"), options: [O("G", "G"), O("O", "O"), O("M", "M"), O("B", "B")], answer: 0, explain: O("The Sun is a G-type yellow dwarf, about 5,800 K.", "太陽は約5,800KのG型・黄色矮星です。") },
    { q: O("A star about 12 times the Sun's mass ends its life as a…", "太陽の約12倍の質量の星は、最期に何になる？"), options: [O("Neutron star", "中性子星"), O("White dwarf", "白色矮星"), O("Red dwarf", "赤色矮星"), O("Planet", "惑星")], answer: 0, explain: O("Stars of about 8–20 solar masses explode and leave a neutron star.", "太陽の約8〜20倍の星は爆発し、中性子星を残します。") },
    { q: O("What is a protostar?", "原始星とは？"), options: [O("A collapsing cloud heating up before fusion", "核融合前に収縮し加熱する雲"), O("A dead star", "死んだ星"), O("An exploded star", "爆発した星"), O("A kind of planet", "惑星の一種")], answer: 0, explain: O("A protostar is a contracting cloud of gas and dust, heating up before fusion begins.", "原始星は、核融合が始まる前に収縮しながら加熱するガスと塵の雲です。") },
  ],
  sky: [
    { q: O("The Big Dipper is the best-known part of which constellation?", "北斗七星は、どの星座の最も有名な部分？"), options: [O("Ursa Major", "おおぐま座"), O("Orion", "オリオン座"), O("Cygnus", "はくちょう座"), O("Scorpius", "さそり座")], answer: 0, explain: O("The Big Dipper is an asterism inside Ursa Major, the Great Bear.", "北斗七星は、おおぐま座の中のアステリズムです。") },
    { q: O("The two end stars of the Big Dipper's bowl point straight to…", "北斗七星のひしゃくの先端の二つの星が指すのは？"), options: [O("Polaris", "北極星"), O("Sirius", "シリウス"), O("Antares", "アンタレス"), O("Deneb", "デネブ")], answer: 0, explain: O("They point to Polaris, the North Star.", "その先には北極星（ポラリス）があります。") },
    { q: O("Which constellation forms an unmistakable 'W' in the sky?", "空にまぎれもない『Ｗ』の形をつくる星座は？"), options: [O("Cassiopeia", "カシオペヤ座"), O("Orion", "オリオン座"), O("Cygnus", "はくちょう座"), O("Ursa Major", "おおぐま座")], answer: 0, explain: O("Cassiopeia wheels around Polaris opposite the Big Dipper.", "カシオペヤ座は北極星をはさんで北斗七星の反対側を回ります。") },
    { q: O("Orion's three-star belt points down toward which brilliant star?", "オリオンの三つ星のベルトが指し示す明るい星は？"), options: [O("Sirius", "シリウス"), O("Polaris", "北極星"), O("Antares", "アンタレス"), O("Vega", "ベガ")], answer: 0, explain: O("Sirius is the brightest star in the entire night sky.", "シリウスは全天で最も明るい星です。") },
    { q: O("Which red star's name means 'rival of Mars' because of its color?", "その色から『火星の敵』を意味する名を持つ赤い星は？"), options: [O("Antares", "アンタレス"), O("Rigel", "リゲル"), O("Deneb", "デネブ"), O("Betelgeuse", "ベテルギウス")], answer: 0, explain: O("Antares, the heart of Scorpius, glows a Mars-like red.", "さそり座の心臓アンタレスは、火星のような赤で輝きます。") },
    { q: O("Cygnus, marked by the bright star Deneb, represents which creature?", "明るい星デネブを持つはくちょう座が表す生き物は？"), options: [O("A swan", "白鳥"), O("A scorpion", "さそり"), O("A bear", "熊"), O("A hunter", "狩人")], answer: 0, explain: O("Cygnus, the Swan, glides along the Milky Way.", "はくちょう座は天の川に沿って舞う白鳥です。") },
    { q: O("Which bright star marks the constellation Leo?", "しし座の目印となる明るい星は？"), options: [O("Regulus", "レグルス"), O("Vega", "ベガ"), O("Antares", "アンタレス"), O("Sirius", "シリウス")], answer: 0, explain: O("Regulus sits at the base of Leo's 'Sickle'.", "レグルスは『ししの大鎌』の根元にあります。") },
    { q: O("The V-shaped face of Taurus is anchored by which orange star?", "おうし座のV字の顔の中心にある橙色の星は？"), options: [O("Aldebaran", "アルデバラン"), O("Rigel", "リゲル"), O("Deneb", "デネブ"), O("Polaris", "北極星")], answer: 0, explain: O("Aldebaran glares like the Bull's red eye.", "アルデバランは牡牛の赤い目のように光ります。") },
    { q: O("The Summer Triangle links Vega, Deneb, and which third star?", "夏の大三角はベガ・デネブと、あと一つのどの星を結ぶ？"), options: [O("Altair", "アルタイル"), O("Antares", "アンタレス"), O("Regulus", "レグルス"), O("Sirius", "シリウス")], answer: 0, explain: O("Vega, Deneb, and Altair form the Summer Triangle.", "ベガ・デネブ・アルタイルが夏の大三角をつくります。") },
    { q: O("The long arm of the Southern Cross points toward…", "南十字星の長い軸が指し示すのは？"), options: [O("The south celestial pole", "天の南極"), O("Polaris", "北極星"), O("The Sun", "太陽"), O("The Moon", "月")], answer: 0, explain: O("Crux guides travellers to the south celestial pole.", "みなみじゅうじ座は天の南極への道しるべです。") },
    { q: O("Vega, one of the sky's brightest stars, belongs to which constellation?", "全天でも明るいベガはどの星座の星？"), options: [O("Lyra", "こと座"), O("Cygnus", "はくちょう座"), O("Orion", "オリオン座"), O("Leo", "しし座")], answer: 0, explain: O("Vega marks the small harp-shaped constellation Lyra.", "ベガは小さな竪琴の形のこと座の星です。") },
  ],
  scale: [
    { q: O("What does a light-year measure?", "光年は何を表す単位？"), options: [O("Distance", "距離"), O("Time", "時間"), O("Brightness", "明るさ"), O("Mass", "質量")], answer: 0, explain: O("It's how far light travels in one year — about 9.5 trillion km.", "光が1年で進む距離——約9兆5000億kmです。") },
    { q: O("How far away is Proxima Centauri, the nearest star beyond the Sun?", "太陽以外で最も近い恒星プロキシマ・ケンタウリまでの距離は？"), options: [O("About 4 light-years", "約4光年"), O("About 4 light-hours", "約4光時"), O("About 400 light-years", "約400光年"), O("About 4 million light-years", "約400万光年")], answer: 0, explain: O("At 4.24 light-years, its light takes over four years to reach us.", "4.24光年——その光は4年以上かけて届きます。") },
    { q: O("Roughly how wide is the Milky Way galaxy?", "天の川銀河のおよその大きさは？"), options: [O("~100,000 light-years", "約10万光年"), O("~100 light-years", "約100光年"), O("~1 million light-years", "約100万光年"), O("~1 billion light-years", "約10億光年")], answer: 0, explain: O("It spans about 100,000 light-years and holds hundreds of billions of stars.", "直径約10万光年で、数千億個の星を含みます。") },
    { q: O("About how long does sunlight take to reach Earth?", "太陽の光が地球に届くまで、およそどれくらい？"), options: [O("About 8 minutes", "約8分"), O("About 8 seconds", "約8秒"), O("About 8 hours", "約8時間"), O("About 8 days", "約8日")], answer: 0, explain: O("Light crosses the ~150 million km to Earth in about 8 minutes.", "約1億5000万kmを、光は約8分で渡ります。") },
    { q: O("Roughly how large across is the observable universe?", "観測可能な宇宙のおよその大きさは？"), options: [O("~93 billion light-years", "約930億光年"), O("~93 million light-years", "約9300万光年"), O("~93,000 light-years", "約9万3000光年"), O("~93 light-years", "約93光年")], answer: 0, explain: O("It holds an estimated two trillion galaxies.", "推定で約2兆個の銀河を含みます。") },
    { q: O("The Milky Way, Andromeda, and ~80 smaller galaxies together form the…", "天の川銀河・アンドロメダ銀河と約80個の小銀河がつくる集団は？"), options: [O("Local Group", "局部銀河群"), O("Solar System", "太陽系"), O("Cosmic Web", "宇宙の大規模構造"), O("Oort Cloud", "オールトの雲")], answer: 0, explain: O("The Local Group spans about 10 million light-years.", "局部銀河群は約1000万光年の広がりを持ちます。") },
    { q: O("Which is the nearest large galaxy to our own?", "私たちの銀河に最も近い大きな銀河は？"), options: [O("Andromeda", "アンドロメダ銀河"), O("The Milky Way", "天の川銀河"), O("Proxima Centauri", "プロキシマ・ケンタウリ"), O("The Sombrero", "ソンブレロ銀河")], answer: 0, explain: O("The Andromeda Galaxy, ~2.5 million light-years away, is the nearest large spiral.", "アンドロメダ銀河は約250万光年先にある最も近い大型の渦巻銀河です。") },
    { q: O("What are the vast empty regions between galaxy filaments called?", "銀河のフィラメントの間に広がる巨大な空っぽの領域を何という？"), options: [O("Voids", "ボイド（空洞）"), O("Nebulae", "星雲"), O("Craters", "クレーター"), O("Oceans", "海")], answer: 0, explain: O("Galaxies string along filaments wrapped around emptier voids.", "銀河はフィラメント状に連なり、より空っぽな『ボイド』を取り囲みます。") },
  ],
};

const shuffle = (a) => {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
};

function buildRun(topicId) {
  let picked = [];
  if (topicId === "grand") {
    ["solar", "star", "sky", "scale"].forEach((t) => {
      picked = picked.concat(shuffle(BANKS[t]).slice(0, 2));
    });
    picked = shuffle(picked);
  } else {
    picked = shuffle(BANKS[topicId]).slice(0, 6);
  }
  return picked.map((q) => {
    const correct = q.options[q.answer];
    const opts = shuffle(q.options);
    return { q: q.q, opts, correct: opts.indexOf(correct), explain: q.explain };
  });
}

function quizRating(pct) {
  if (pct === 1) return { t: { en: "Astronomer Royal", ja: "王室天文官" }, m: { en: "A perfect run. The cosmos has no secrets left from you.", ja: "全問正解。宇宙に、あなたへの秘密はもう残っていません。" } };
  if (pct >= 0.8) return { t: { en: "Seasoned Navigator", ja: "熟練の航海士" }, m: { en: "You know your way around the sky.", ja: "空の歩き方をよく心得ています。" } };
  if (pct >= 0.6) return { t: { en: "Rising Stargazer", ja: "成長中の星の観測者" }, m: { en: "Solid footing — a little more exploring and you'll master it.", ja: "確かな手応え——もう少し探検すれば完璧です。" } };
  if (pct >= 0.4) return { t: { en: "Apprentice Observer", ja: "見習い観測者" }, m: { en: "A good start. Revisit the realms and come back stronger.", ja: "良い出だし。各エリアを見直して、もう一度挑もう。" } };
  return { t: { en: "Ground Control", ja: "地上管制" }, m: { en: "Head back out and explore — then return to prove it.", ja: "もう一度探検に出て——それから証明しに戻ろう。" } };
}

/* ============================================================
   AMBIENT STARFIELD
   ============================================================ */
function Starfield() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    let w = window.innerWidth, h = window.innerHeight;
    let ctx = setupCanvas(canvas, w, h);
    let stars = [];
    const make = () => {
      const count = Math.min(240, Math.floor((w * h) / 6000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.3 + 0.2,
        p: Math.random() * Math.PI * 2, s: Math.random() * 0.9 + 0.2,
        c: Math.random() < 0.15 ? C.cool : Math.random() < 0.2 ? C.sun : "#ffffff",
      }));
    };
    make();
    let raf, t = 0;
    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      for (const st of stars) {
        const tw = reduceMotion ? 0.7 : 0.55 + 0.45 * Math.sin(t * st.s + st.p);
        ctx.globalAlpha = tw;
        ctx.fillStyle = st.c;
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => {
      w = window.innerWidth; h = window.innerHeight;
      ctx = setupCanvas(canvas, w, h); make();
      if (reduceMotion) draw();
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

/* ============================================================
   REALM 1 — SOLAR SYSTEM
   ============================================================ */
function SolarSystem() {
  const lang = useLang();
  const t = UI[lang];
  const [wrapRef, w] = useMeasure();
  const H = 470;
  const canvasRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(30);
  const [realScale, setRealScale] = useState(false);
  const [selected, setSelected] = useState(2);
  const [days, setDays] = useState(0);
  const [zoom, setZoom] = useState(1);
  const elapsed = useRef(0);
  const positions = useRef([]);
  const zoomRef = useRef(1);
  const panRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef(null);
  const cw = Math.min(w, 760);

  useEffect(() => { zoomRef.current = zoom; }, [zoom]);
  useEffect(() => {
    const id = setInterval(() => setDays(elapsed.current), 220);
    return () => clearInterval(id);
  }, []);

  const zoomAround = (nz, sx, sy) => {
    const cx = cw / 2, cy = H / 2;
    const z = zoomRef.current, pan = panRef.current;
    const wx = (sx - cx - pan.x) / z, wy = (sy - cy - pan.y) / z;
    const clamped = clamp(nz, 0.6, 9);
    panRef.current = { x: sx - cx - wx * clamped, y: sy - cy - wy * clamped };
    zoomRef.current = clamped; setZoom(clamped);
  };
  const resetView = () => { panRef.current = { x: 0, y: 0 }; zoomRef.current = 1; setZoom(1); };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onWheel = (ev) => {
      ev.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const factor = ev.deltaY < 0 ? 1.15 : 1 / 1.15;
      zoomAround(zoomRef.current * factor, ev.clientX - rect.left, ev.clientY - rect.top);
    };
    canvas.addEventListener("wheel", onWheel, { passive: false });
    return () => canvas.removeEventListener("wheel", onWheel);
  }, [cw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, cw, H);
    const cx = cw / 2, cy = H / 2;
    const maxR = Math.min(cw, H) / 2 - 26;
    const orbitR = (au) => realScale ? maxR * (au / 30.1) : maxR * Math.pow(au / 30.1, 0.45);

    let raf, last = performance.now();
    const draw = () => {
      const now = performance.now();
      const dt = (now - last) / 1000; last = now;
      if (playing && !reduceMotion) elapsed.current += dt * speed;
      const e = elapsed.current;
      const z = zoomRef.current, pan = panRef.current;
      const ox = cx + pan.x, oy = cy + pan.y;
      ctx.clearRect(0, 0, cw, H);

      ctx.lineWidth = 1;
      for (const p of PLANETS) {
        ctx.strokeStyle = selected === PLANETS.indexOf(p) ? "rgba(99,211,240,0.35)" : "rgba(120,150,210,0.14)";
        ctx.beginPath();
        ctx.arc(ox, oy, orbitR(p.au) * z, 0, Math.PI * 2);
        ctx.stroke();
      }

      const sunGlow = ctx.createRadialGradient(ox, oy, 2, ox, oy, SUN.radius * 2.4);
      sunGlow.addColorStop(0, "rgba(255,207,107,0.9)");
      sunGlow.addColorStop(0.4, "rgba(245,167,66,0.35)");
      sunGlow.addColorStop(1, "rgba(245,167,66,0)");
      ctx.fillStyle = sunGlow;
      ctx.beginPath(); ctx.arc(ox, oy, SUN.radius * 2.4, 0, Math.PI * 2); ctx.fill();
      if (selected === -1) {
        ctx.strokeStyle = C.cool; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(ox, oy, SUN.radius + 7, 0, Math.PI * 2); ctx.stroke();
      }
      ctx.fillStyle = SUN.color;
      ctx.beginPath(); ctx.arc(ox, oy, SUN.radius, 0, Math.PI * 2); ctx.fill();

      const pos = [{ x: ox, y: oy, r: SUN.radius, i: -1 }];
      PLANETS.forEach((p, i) => {
        const ang = i * 0.7 + (e / p.period) * Math.PI * 2;
        const R = orbitR(p.au) * z;
        const x = ox + Math.cos(ang) * R, y = oy + Math.sin(ang) * R;
        pos.push({ x, y, r: p.r, i });
        const sel = selected === i;
        if (sel) {
          ctx.strokeStyle = C.cool; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(x, y, p.r + 7, 0, Math.PI * 2); ctx.stroke();
        }
        if (p.ring) {
          ctx.save(); ctx.translate(x, y); ctx.rotate(-0.5);
          ctx.strokeStyle = "rgba(230,207,160,0.6)"; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.ellipse(0, 0, p.r + 6, (p.r + 6) * 0.34, 0, 0, Math.PI * 2); ctx.stroke();
          ctx.restore();
        }
        ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(x, y, p.r, 0, Math.PI * 2); ctx.fill();
        if (sel) {
          ctx.fillStyle = C.text; ctx.font = `500 12px ${ui}`; ctx.textAlign = "center";
          ctx.fillText(tr(p.name, lang), x, y - p.r - 12);
        }
      });
      positions.current = pos;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [cw, playing, speed, realScale, selected, lang]);

  const onPointerDown = (ev) => {
    dragRef.current = { px: ev.clientX, py: ev.clientY, moved: 0 };
    canvasRef.current.setPointerCapture?.(ev.pointerId);
  };
  const onPointerMove = (ev) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = ev.clientX - d.px, dy = ev.clientY - d.py;
    d.px = ev.clientX; d.py = ev.clientY; d.moved += Math.abs(dx) + Math.abs(dy);
    panRef.current = { x: panRef.current.x + dx, y: panRef.current.y + dy };
  };
  const onPointerUp = (ev) => {
    const d = dragRef.current; dragRef.current = null;
    if (!d || d.moved > 6) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = ev.clientX - rect.left, my = ev.clientY - rect.top;
    let best = null, bd = 1e9;
    positions.current.forEach((p) => {
      const hit = Math.max(p.r + 14, 18);
      const dist = Math.hypot(mx - p.x, my - p.y);
      if (dist < hit && dist < bd) { bd = dist; best = p.i; }
    });
    if (best !== null) setSelected(best);
  };

  const body = selected === -1 ? SUN : PLANETS[selected];
  const years = days / 365.25;
  const picker = [{ name: SUN.name, i: -1 }, ...PLANETS.map((p, i) => ({ name: p.name, i }))];

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <canvas ref={canvasRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}
          style={{ display: "block", cursor: "grab", touchAction: "none", maxWidth: "100%" }} />
        <div style={styles.pickerRow}>
          {picker.map((b) => (
            <button key={b.i} onClick={() => setSelected(b.i)}
              style={{ ...styles.chip, ...(selected === b.i ? styles.chipOn : {}) }}>
              {tr(b.name, lang)}
            </button>
          ))}
        </div>
        <div style={styles.controlBar}>
          <button style={styles.iconBtn} onClick={() => setPlaying((p) => !p)}>
            {playing ? t.pause : t.play}
          </button>
          <div style={styles.speedRow}>
            <span style={styles.tinyLabel}>{t.zoom}</span>
            <button style={styles.chip} onClick={() => zoomAround(zoomRef.current / 1.3, cw / 2, H / 2)}>－</button>
            <span style={{ ...styles.tinyLabel, minWidth: 30, textAlign: "center" }}>{zoom.toFixed(1)}×</span>
            <button style={styles.chip} onClick={() => zoomAround(zoomRef.current * 1.3, cw / 2, H / 2)}>＋</button>
            <button style={styles.chip} onClick={resetView}>{t.reset}</button>
          </div>
          <button style={{ ...styles.chip, ...(realScale ? styles.chipOn : {}) }} onClick={() => setRealScale((r) => !r)}>
            {realScale ? t.trueDist : t.compressed}
          </button>
        </div>
        <div style={styles.controlBar}>
          <div style={styles.speedRow}>
            <span style={styles.tinyLabel}>{t.time}</span>
            {[10, 30, 120, 600].map((s) => (
              <button key={s} onClick={() => setSpeed(s)} style={{ ...styles.chip, ...(speed === s ? styles.chipOn : {}) }}>
                {s < 60 ? `${s}d/s` : `${Math.round(s / 30)}mo/s`}
              </button>
            ))}
          </div>
          <div style={styles.readout}>
            <span>{Math.floor(days).toLocaleString()} {t.days}</span>
            <span style={{ color: C.faint }}>·</span>
            <span>{years.toFixed(2)} {t.yr}</span>
          </div>
        </div>
        <p style={styles.hint}>{t.solarHint}</p>
        {realScale && <p style={styles.note}>{t.realScaleNote}</p>}
      </div>

      <InfoPanel>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ ...styles.swatch, background: body.color }} />
          <div>
            <h3 style={styles.panelTitle}>{tr(body.name, lang)}</h3>
            <div style={styles.panelKind}>{tr(body.kind, lang)}</div>
          </div>
        </div>
        <dl style={styles.dl}>
          {selected !== -1 && <Row k={t.distanceFromSun} v={`${body.au} AU`} />}
          <Row k={t.diameter} v={`${body.diameter.toLocaleString()} km`} />
          {body.period && (
            <Row k={t.orbitalPeriod} v={body.period < 400 ? `${body.period} ${t.days_u}` : `${(body.period / 365.25).toFixed(1)} ${t.years_u}`} />
          )}
          <Row k={t.dayLength} v={tr(body.day, lang)} />
          <Row k={t.moons} v={tr(body.moons, lang)} />
        </dl>
        <p style={styles.factText}>{tr(body.fact, lang)}</p>
        <p style={styles.hint}>{t.planetPanelHint}</p>
      </InfoPanel>
    </div>
  );
}

/* ============================================================
   REALM 2 — STAR FORGE
   ============================================================ */
function deriveStar(mass) {
  let cls, color;
  if (mass < 0.08) { cls = { en: "Brown dwarf (not a true star)", ja: "褐色矮星（恒星になれなかった星）" }; color = "#8a4b3a"; }
  else if (mass < 0.45) { cls = { en: "M · Red dwarf", ja: "M型・赤色矮星" }; color = "#ff6f43"; }
  else if (mass < 0.8) { cls = { en: "K · Orange dwarf", ja: "K型・橙色矮星" }; color = "#ffab5e"; }
  else if (mass < 1.05) { cls = { en: "G · Yellow dwarf (Sun-like)", ja: "G型・黄色矮星（太陽型）" }; color = "#ffe08a"; }
  else if (mass < 1.4) { cls = { en: "F · Yellow-white", ja: "F型・黄白色" }; color = "#fff4d6"; }
  else if (mass < 2.1) { cls = { en: "A · White", ja: "A型・白色" }; color = "#eaf0ff"; }
  else if (mass < 16) { cls = { en: "B · Blue-white", ja: "B型・青白色" }; color = "#c2d4ff"; }
  else { cls = { en: "O · Blue", ja: "O型・青色" }; color = "#a8c4ff"; }

  const lifeGyr = 10 * Math.pow(mass, -2.5);
  let fate;
  if (mass < 0.08) fate = { en: "A failed star that slowly cools in the dark for eternity.", ja: "核融合を起こせなかった星。暗闇の中で永遠に冷え続けます。" };
  else if (mass < 0.45) fate = { en: "Burns its fuel so slowly it will outlast the present age of the universe, then fade to a white dwarf.", ja: "燃料をゆっくり使うため現在の宇宙年齢より長く輝き、やがて白色矮星になります。" };
  else if (mass < 8) fate = { en: "Swells into a red giant, puffs off a glowing planetary nebula, and leaves a white dwarf ember.", ja: "赤色巨星に膨らみ、輝く惑星状星雲を放って、白色矮星の燃えかすを残します。" };
  else if (mass < 20) fate = { en: "Ends in a supernova — a single star briefly outshining a galaxy — leaving a neutron star.", ja: "超新星爆発を起こし——一瞬、銀河をしのぐ明るさで輝き——中性子星を残します。" };
  else fate = { en: "Detonates as a supernova, its core collapsing into a black hole.", ja: "超新星として爆発し、中心核がつぶれてブラックホールになります。" };

  const vr = clamp(Math.pow(mass, 0.42) * 22, 12, 60);
  const tempK = mass < 0.08 ? 1200 : Math.round((5772 * Math.pow(mass, 0.5)) / 100) * 100;
  return { cls, color, fate, vr, mass, tempK, lifeGyr };
}

function fmtLife(gyr, mass, lang) {
  if (mass < 0.08) return lang === "ja" ? "点火しない" : "Never ignites";
  const yr = gyr * 1e9;
  if (lang === "ja") {
    if (yr >= 1e12) return `約${(yr / 1e12).toFixed(0)}兆年`;
    if (yr >= 1e8) return `約${(yr / 1e8).toFixed(0)}億年`;
    return `約${(yr / 1e4).toFixed(0)}万年`;
  }
  if (yr >= 1e12) return `${(yr / 1e12).toFixed(0)} trillion yr`;
  if (yr >= 1e9) return `${(yr / 1e9).toFixed(1)} billion yr`;
  return `${Math.round(yr / 1e6)} million yr`;
}

function buildStages(mass) {
  const base = deriveStar(mass);
  const s = [];
  s.push({ name: { en: "Protostar", ja: "原始星" }, desc: { en: "A collapsing cloud of gas and dust heats as it falls inward.", ja: "ガスと塵の雲が収縮しながら熱を帯びていきます。" }, r: base.vr * 1.7, color: "#c9756b", dur: 2.2, kind: "normal" });
  s.push({ name: { en: "Main sequence", ja: "主系列星" }, desc: { en: "Hydrogen fuses to helium in a steady, long-lasting balance.", ja: "水素がヘリウムに変わりながら、長く安定して輝き続けます。" }, r: base.vr, color: base.color, dur: 3.2, kind: "normal" });
  if (mass < 0.45) {
    s.push({ name: { en: "Red dwarf, still shining", ja: "赤色矮星（まだ輝いている）" }, desc: { en: "So frugal it burns for trillions of years — none have yet died.", ja: "燃費が良すぎて数兆年輝き続け、まだ寿命を終えた例はありません。" }, r: base.vr, color: "#ff6f43", dur: 3, kind: "normal", final: true });
  } else if (mass < 8) {
    s.push({ name: { en: "Red giant", ja: "赤色巨星" }, desc: { en: "Core hydrogen spent, the star balloons and reddens.", ja: "中心の水素を使い果たし、星は大きく膨らんで赤くなります。" }, r: base.vr * 3.4, color: "#ff8a4a", dur: 2.6, kind: "normal" });
    s.push({ name: { en: "Planetary nebula", ja: "惑星状星雲" }, desc: { en: "Outer layers drift away as a delicate glowing shell.", ja: "外層がやわらかな光の殻となって広がっていきます。" }, r: base.vr * 0.6, color: "#8ad0ff", dur: 2.4, kind: "nebula" });
    s.push({ name: { en: "White dwarf", ja: "白色矮星" }, desc: { en: "A hot, Earth-sized cinder that will cool for billions of years.", ja: "地球ほどの大きさの熱い燃えかす。何十億年もかけて冷えていきます。" }, r: base.vr * 0.32, color: "#dfe9ff", dur: 3, kind: "normal", final: true });
  } else if (mass < 20) {
    s.push({ name: { en: "Red supergiant", ja: "赤色超巨星" }, desc: { en: "A monster hundreds of times the Sun's width, fusing heavier elements.", ja: "太陽の数百倍にもなる巨大な星が、重い元素を燃やします。" }, r: base.vr * 4.6, color: "#ff6a4a", dur: 2.6, kind: "normal" });
    s.push({ name: { en: "Supernova", ja: "超新星" }, desc: { en: "The core implodes and rebounds — the star tears itself apart.", ja: "中心核が一気につぶれ、星は自らを吹き飛ばします。" }, r: base.vr * 5, color: "#ffffff", dur: 1.8, kind: "supernova" });
    s.push({ name: { en: "Neutron star", ja: "中性子星" }, desc: { en: "A city-sized core so dense a sugar-cube of it weighs a billion tons.", ja: "都市ほどの大きさに凝縮した核。角砂糖一個分で10億トンにもなります。" }, r: base.vr * 0.22, color: "#cfe0ff", dur: 3, kind: "normal", final: true });
  } else {
    s.push({ name: { en: "Red supergiant", ja: "赤色超巨星" }, desc: { en: "One of the largest stars there is, burning through its fuel fast.", ja: "最大級の星が、猛烈な勢いで燃料を使い果たしていきます。" }, r: base.vr * 5, color: "#ff5a3a", dur: 2.6, kind: "normal" });
    s.push({ name: { en: "Supernova", ja: "超新星" }, desc: { en: "Gravity overwhelms everything in a final catastrophic collapse.", ja: "重力がすべてを圧倒し、破滅的な最期を迎えます。" }, r: base.vr * 5.5, color: "#ffffff", dur: 1.8, kind: "supernova" });
    s.push({ name: { en: "Black hole", ja: "ブラックホール" }, desc: { en: "Gravity wins completely. Not even light can escape.", ja: "重力が完全に勝利します。光さえも脱出できません。" }, r: base.vr * 0.5, color: "#05060d", dur: 3, kind: "blackhole", final: true });
  }
  return s;
}

function StarForge() {
  const lang = useLang();
  const t = UI[lang];
  const [wrapRef, w] = useMeasure();
  const H = 430;
  const canvasRef = useRef(null);
  const [mass, setMass] = useState(1);
  const [phase, setPhase] = useState("idle");
  const [stageInfo, setStageInfo] = useState(null);
  const cw = Math.min(w, 760);
  const star = useMemo(() => deriveStar(mass), [mass]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, cw, H);
    const cx = cw / 2, cy = H / 2;

    const drawStar = (r, color, kind, localT) => {
      ctx.clearRect(0, 0, cw, H);
      if (kind !== "blackhole") {
        const g = ctx.createRadialGradient(cx, cy, 2, cx, cy, r * 2.6);
        g.addColorStop(0, color); g.addColorStop(0.35, color); g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.globalAlpha = 0.45; ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(cx, cy, r * 2.6, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1;
      }
      if (kind === "nebula") {
        ctx.strokeStyle = "rgba(138,208,255,0.5)"; ctx.lineWidth = 2;
        const shell = r * (2 + (localT || 0) * 3);
        ctx.globalAlpha = 1 - (localT || 0) * 0.7;
        ctx.beginPath(); ctx.arc(cx, cy, shell, 0, Math.PI * 2); ctx.stroke();
        ctx.globalAlpha = 1;
      }
      if (kind === "supernova") {
        const tt = localT || 0;
        const ring = r * (1 + tt * 4);
        ctx.strokeStyle = `rgba(255,255,255,${1 - tt})`; ctx.lineWidth = 6 * (1 - tt) + 1;
        ctx.beginPath(); ctx.arc(cx, cy, ring, 0, Math.PI * 2); ctx.stroke();
        const flash = ctx.createRadialGradient(cx, cy, 2, cx, cy, ring);
        flash.addColorStop(0, `rgba(255,255,255,${0.8 * (1 - tt)})`); flash.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = flash;
        ctx.beginPath(); ctx.arc(cx, cy, ring, 0, Math.PI * 2); ctx.fill();
      }
      if (kind === "blackhole") {
        const g = ctx.createRadialGradient(cx, cy, r, cx, cy, r * 2.2);
        g.addColorStop(0, "rgba(255,150,60,0.0)"); g.addColorStop(0.55, "rgba(255,150,60,0.55)");
        g.addColorStop(0.75, "rgba(120,160,255,0.4)"); g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(cx, cy, r * 2.2, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#05060d";
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
        return;
      }
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
    };

    if (phase !== "playing") {
      drawStar(star.vr, star.color, "normal", 0);
      if (mass < 0.08) {
        ctx.clearRect(0, 0, cw, H);
        ctx.fillStyle = star.color;
        ctx.beginPath(); ctx.arc(cx, cy, star.vr, 0, Math.PI * 2); ctx.fill();
      }
      return;
    }

    const stages = buildStages(mass);
    const total = stages.reduce((a, s) => a + s.dur, 0);
    let raf, start = performance.now(), lastStage = -1;
    const loop = () => {
      const tt = reduceMotion ? total : (performance.now() - start) / 1000;
      let acc = 0, k = 0, localT = 0;
      for (let i = 0; i < stages.length; i++) {
        if (tt < acc + stages[i].dur || i === stages.length - 1) { k = i; localT = clamp((tt - acc) / stages[i].dur, 0, 1); break; }
        acc += stages[i].dur;
      }
      const cur = stages[k], nxt = stages[Math.min(k + 1, stages.length - 1)];
      const r = lerp(cur.r, nxt.r, cur.kind === "normal" ? localT : 0);
      const color = cur.kind === "normal" ? lerpColor(cur.color, nxt.color, localT) : cur.color;
      drawStar(r, color, cur.kind, localT);
      if (k !== lastStage) { lastStage = k; setStageInfo({ name: cur.name, desc: cur.desc, i: k, n: stages.length }); }
      if (tt >= total) { setPhase("done"); return; }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, mass, phase, star]);

  const play = () => { setStageInfo(null); setPhase("playing"); };
  const reset = () => { setPhase("idle"); setStageInfo(null); };

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <canvas ref={canvasRef} style={{ display: "block", maxWidth: "100%" }} />
        <div style={styles.controlBar}>
          <button style={styles.iconBtn} onClick={phase === "idle" ? play : reset}>
            {phase === "idle" ? t.runLife : t.resetLife}
          </button>
          {stageInfo && (
            <div style={styles.stagePill}>{t.stage} {stageInfo.i + 1}/{stageInfo.n} · {tr(stageInfo.name, lang)}</div>
          )}
        </div>
        {stageInfo && <p style={styles.stageDesc}>{tr(stageInfo.desc, lang)}</p>}
        {phase === "idle" && <p style={styles.note}>{t.setMassNote}</p>}
      </div>

      <InfoPanel>
        <h3 style={styles.panelTitle}>{t.birthMass}</h3>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontFamily: mono, fontSize: 30, color: C.sun }}>{mass.toFixed(mass < 1 ? 2 : 1)}</span>
          <span style={{ color: C.muted, fontSize: 13 }}>{t.timesSun}</span>
        </div>
        <input type="range" min={0.05} max={50} step={0.05} value={mass}
          onChange={(e) => { setMass(parseFloat(e.target.value)); reset(); }} style={styles.range} />
        <div style={styles.rangeEnds}><span>0.05</span><span>50</span></div>
        <dl style={styles.dl}>
          <Row k={t.spectralClass} v={tr(star.cls, lang)} />
          <Row k={t.surfaceTemp} v={`~${star.tempK.toLocaleString()} K`} />
          <Row k={t.msLife} v={fmtLife(star.lifeGyr, mass, lang)} />
        </dl>
        <div style={styles.legendWrap}>
          <div style={styles.legendBar} />
          <div style={styles.legendEnds}><span>{t.hotterBlue}</span><span>{t.coolerRed}</span></div>
        </div>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.lifeStartFinish}</div>
          <p style={styles.pathText}>{buildStages(mass).map((s) => tr(s.name, lang)).join("  →  ")}</p>
        </div>
        <div style={styles.fateBox}>
          <div style={styles.fateLabel}>{t.finalFate}</div>
          <p style={styles.factText}>{tr(star.fate, lang)}</p>
        </div>
      </InfoPanel>
    </div>
  );
}

/* ============================================================
   REALM 3 — NIGHT SKY
   ============================================================ */
function NightSky() {
  const lang = useLang();
  const t = UI[lang];
  const [wrapRef, w] = useMeasure();
  const H = 470;
  const canvasRef = useRef(null);
  const [showLines, setShowLines] = useState(true);
  const [selected, setSelected] = useState(0);
  const bgStars = useRef([]);
  const hit = useRef([]);
  const cw = Math.min(w, 760);

  useEffect(() => {
    if (bgStars.current.length) return;
    bgStars.current = Array.from({ length: 320 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.1 + 0.2 }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, cw, H);
    ctx.clearRect(0, 0, cw, H);
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "rgba(20,26,52,0.5)"); bg.addColorStop(1, "rgba(8,10,22,0.5)");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, cw, H);
    for (const s of bgStars.current) {
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.beginPath(); ctx.arc(s.x * cw, s.y * H, s.r, 0, Math.PI * 2); ctx.fill();
    }
    const hits = [];
    CONSTELLATIONS.forEach((con, ci) => {
      const [ax, ay] = con.anchor;
      const pts = con.stars.map(([x, y]) => [(ax + (x - 0.5) * con.scale) * cw, (ay + (y - 0.5) * con.scale) * H]);
      const sel = selected === ci;
      if (showLines) {
        ctx.strokeStyle = sel ? "rgba(99,211,240,0.9)" : "rgba(120,150,210,0.35)";
        ctx.lineWidth = sel ? 1.6 : 1;
        con.lines.forEach(([a, b]) => { ctx.beginPath(); ctx.moveTo(pts[a][0], pts[a][1]); ctx.lineTo(pts[b][0], pts[b][1]); ctx.stroke(); });
      }
      pts.forEach(([x, y]) => {
        const rr = sel ? 3.4 : 2.6;
        const g = ctx.createRadialGradient(x, y, 0, x, y, rr * 3);
        g.addColorStop(0, sel ? "#ffffff" : "#dfe9ff"); g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, rr * 3, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#ffffff"; ctx.beginPath(); ctx.arc(x, y, rr, 0, Math.PI * 2); ctx.fill();
      });
      const cxL = pts.reduce((a, p) => a + p[0], 0) / pts.length;
      const cyL = pts.reduce((a, p) => a + p[1], 0) / pts.length;
      if (showLines || sel) {
        ctx.fillStyle = sel ? C.cool : "rgba(200,210,235,0.55)";
        ctx.font = `${sel ? 600 : 400} 13px ${ui}`; ctx.textAlign = "center";
        ctx.fillText(tr(con.name, lang), cxL, cyL + con.scale * H * 0.62);
      }
      hits.push({ ci, x: cxL, y: cyL, r: con.scale * Math.max(cw, H) * 0.5 });
    });
    hit.current = hits;
  }, [cw, showLines, selected, lang]);

  const onClick = (ev) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = ev.clientX - rect.left, my = ev.clientY - rect.top;
    let best = null, bd = 1e9;
    for (const h of hit.current) {
      const d = Math.hypot(mx - h.x, my - h.y);
      if (d < h.r && d < bd) { bd = d; best = h.ci; }
    }
    if (best !== null) setSelected(best);
  };

  const con = CONSTELLATIONS[selected];
  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <canvas ref={canvasRef} onClick={onClick} style={{ display: "block", cursor: "pointer", maxWidth: "100%", borderRadius: 10 }} />
        <div style={styles.controlBar}>
          <button style={{ ...styles.chip, ...(showLines ? styles.chipOn : {}) }} onClick={() => setShowLines((s) => !s)}>
            {showLines ? t.hideLines : t.revealShapes}
          </button>
          <div style={styles.speedRow}>
            {CONSTELLATIONS.map((c, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{ ...styles.chip, ...(selected === i ? styles.chipOn : {}) }}>
                {tr(c.name, lang)}
              </button>
            ))}
          </div>
        </div>
        <p style={styles.hint}>{t.skyHint}</p>
      </div>

      <InfoPanel>
        <h3 style={styles.panelTitle}>{tr(con.name, lang)}</h3>
        <div style={styles.panelKind}>{tr(con.notable, lang)}</div>
        <p style={{ ...styles.factText, marginTop: 14 }}>{tr(con.info, lang)}</p>
        <p style={styles.note}>{t.skyNote}</p>
      </InfoPanel>
    </div>
  );
}

/* ============================================================
   REALM 4 — COSMIC SCALE
   ============================================================ */
function CosmicScale() {
  const lang = useLang();
  const t = UI[lang];
  const [wrapRef, w] = useMeasure();
  const H = 440;
  const canvasRef = useRef(null);
  const [idx, setIdx] = useState(0);
  const anim = useRef({ from: 0, t: 1 });
  const cw = Math.min(w, 760);

  const go = (n) => {
    const clamped = clamp(n, 0, SCALE_STEPS.length - 1);
    if (clamped === idx) return;
    anim.current = { from: idx, t: reduceMotion ? 1 : 0, dir: clamped > idx ? 1 : -1 };
    setIdx(clamped);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, cw, H);
    const cx = cw / 2, cy = H / 2;
    let raf;
    const step = SCALE_STEPS[idx];
    const draw = () => {
      const a = anim.current;
      if (a.t < 1) a.t = Math.min(1, a.t + 0.04);
      ctx.clearRect(0, 0, cw, H);
      const maxR = Math.min(cw, H) * 0.34;
      const grow = a.dir === -1 ? 1 : a.t;
      const R = maxR * (0.25 + 0.75 * grow);
      const g = ctx.createRadialGradient(cx, cy, 2, cx, cy, R);
      g.addColorStop(0, step.tint); g.addColorStop(0.7, step.tint); g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalAlpha = 0.35; ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1; ctx.strokeStyle = step.tint; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
      if (idx >= 4) {
        for (let i = 0; i < 220; i++) {
          const ang = Math.random() * Math.PI * 2;
          const rad = Math.pow(Math.random(), 0.6) * R;
          ctx.globalAlpha = 0.5 * grow;
          ctx.fillStyle = i % 5 === 0 ? C.cool : "#ffffff";
          ctx.beginPath(); ctx.arc(cx + Math.cos(ang) * rad, cy + Math.sin(ang) * rad, Math.random() * 1.2 + 0.2, 0, Math.PI * 2); ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      if (idx > 0) {
        ctx.fillStyle = SCALE_STEPS[idx - 1].tint;
        ctx.beginPath(); ctx.arc(cx, cy, 2.4, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.25)";
        ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2); ctx.stroke();
      }
      if (a.t < 1) raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [cw, idx]);

  const step = SCALE_STEPS[idx];
  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <canvas ref={canvasRef} style={{ display: "block", maxWidth: "100%" }} />
        <div style={styles.controlBar}>
          <button style={styles.iconBtn} onClick={() => go(idx - 1)} disabled={idx === 0}>{t.zoomIn}</button>
          <div style={styles.ladder}>
            {SCALE_STEPS.map((s, i) => (
              <span key={i} onClick={() => go(i)} title={tr(s.name, lang)}
                style={{ ...styles.rung, background: i === idx ? s.tint : "rgba(120,150,210,0.25)", height: i === idx ? 22 : 12 }} />
            ))}
          </div>
          <button style={styles.iconBtn} onClick={() => go(idx + 1)} disabled={idx === SCALE_STEPS.length - 1}>{t.zoomOut}</button>
        </div>
        {idx > 0 && (
          <p style={styles.hint}>{t.prevDotA}<strong style={{ color: C.text }}>{tr(SCALE_STEPS[idx - 1].name, lang)}</strong>{t.prevDotB}</p>
        )}
      </div>

      <InfoPanel>
        <div style={styles.stepCounter}>{String(idx + 1).padStart(2, "0")} / {String(SCALE_STEPS.length).padStart(2, "0")}</div>
        <h3 style={styles.panelTitle}>{tr(step.name, lang)}</h3>
        <div style={{ ...styles.panelKind, fontFamily: mono, color: step.tint }}>{tr(step.size, lang)}</div>
        <p style={{ ...styles.factText, marginTop: 14 }}>{tr(step.blurb, lang)}</p>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.keyTerm}</div>
          <p style={styles.keyTermText}>{t.lyA}<strong style={{ color: C.text }}>{t.lyWord}</strong>{t.lyB}</p>
        </div>
      </InfoPanel>
    </div>
  );
}

/* ============================================================
   SHARED UI
   ============================================================ */
function InfoPanel({ children }) { return <aside style={styles.panel}>{children}</aside>; }
function Row({ k, v }) {
  return (
    <div style={styles.row}>
      <dt style={styles.dt}>{k}</dt>
      <dd style={styles.dd}>{v}</dd>
    </div>
  );
}

/* ============================================================
   BONUS ARCADE — a different game per section
   Wrong quiz answers reduce starting shields and raise difficulty.
   Games share ArcadeShell; each supplies init(g,api) + step(g,ctx,dt,api,over).
   ============================================================ */
function makeRockVerts() {
  const n = 8 + Math.floor(Math.random() * 4);
  return Array.from({ length: n }, () => 0.72 + Math.random() * 0.5);
}
function spawnParts(g, x, y, r, color) {
  const n = 6 + Math.floor(r / 4);
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2, sp = 40 + Math.random() * 120;
    g.parts.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0.4 + Math.random() * 0.4, color });
  }
}
const makeStars = (W, H, n) => Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.2 + 0.2 }));
function lose(g, over) { g.lives -= 1; g.flash = 0.5; if (g.lives <= 0) over(); }
function drawBg(ctx, g, W, H) {
  ctx.fillStyle = "#070a14"; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "rgba(255,255,255,0.35)";
  for (const s of g.bg) { ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill(); }
}
function drawRock(ctx, r) {
  ctx.save(); ctx.translate(r.x, r.y); ctx.rotate(r.spin || 0);
  const verts = r.verts || (r.verts = makeRockVerts());
  ctx.beginPath();
  verts.forEach((vv, i) => { const a = (i / verts.length) * Math.PI * 2; const rr = r.r * vv; const px = Math.cos(a) * rr, py = Math.sin(a) * rr; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); });
  ctx.closePath(); ctx.fillStyle = "#6b7180"; ctx.fill(); ctx.strokeStyle = "#9aa2b4"; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore();
}
function drawShip(ctx, x, y) {
  const glow = ctx.createRadialGradient(x, y, 2, x, y, 26);
  glow.addColorStop(0, "rgba(99,211,240,0.5)"); glow.addColorStop(1, "rgba(99,211,240,0)");
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(x, y, 26, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#eaf3ff"; ctx.beginPath(); ctx.moveTo(x, y - 16); ctx.lineTo(x - 12, y + 12); ctx.lineTo(x + 12, y + 12); ctx.closePath(); ctx.fill();
  ctx.fillStyle = "#ffcf6b"; ctx.beginPath(); ctx.moveTo(x - 4, y + 12); ctx.lineTo(x + 4, y + 12); ctx.lineTo(x, y + 18 + Math.random() * 6); ctx.closePath(); ctx.fill();
}

/* --- Constellation Connect helpers --- */
function slSetup(g, api) {
  const idx = Math.floor(Math.random() * CONSTELLATIONS.length);
  const con = CONSTELLATIONS[idx];
  const padX = 70, padY = 60;
  g.con = con;
  g.pts = con.stars.map(([x, y]) => [padX + x * (api.W - 2 * padX), padY + y * (api.H - 2 * padY)]);
  g.order = 0; g.max = Math.max(3.5, 7 / api.diff); g.time = g.max; g.done = false; g.doneT = 0;
}
function slLinks(ctx, g, complete) {
  ctx.strokeStyle = "rgba(99,211,240,0.7)"; ctx.lineWidth = 2;
  if (complete) {
    for (const [a, b] of g.con.lines) { ctx.beginPath(); ctx.moveTo(g.pts[a][0], g.pts[a][1]); ctx.lineTo(g.pts[b][0], g.pts[b][1]); ctx.stroke(); }
  } else {
    for (let i = 1; i < g.order; i++) { ctx.beginPath(); ctx.moveTo(g.pts[i - 1][0], g.pts[i - 1][1]); ctx.lineTo(g.pts[i][0], g.pts[i][1]); ctx.stroke(); }
  }
}
function slStars(ctx, g, complete) {
  g.pts.forEach((p, i) => {
    const tapped = i < g.order || complete, next = !complete && i === g.order;
    const gr = ctx.createRadialGradient(p[0], p[1], 0, p[0], p[1], 12);
    gr.addColorStop(0, tapped ? "#63d3f0" : "#dfe9ff"); gr.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(p[0], p[1], 12, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = tapped ? "#63d3f0" : "#ffffff"; ctx.beginPath(); ctx.arc(p[0], p[1], 5, 0, Math.PI * 2); ctx.fill();
    if (next) { ctx.strokeStyle = "#ffcf6b"; ctx.lineWidth = 2; const pr = 10 + Math.sin(g.t * 6) * 3; ctx.beginPath(); ctx.arc(p[0], p[1], pr, 0, Math.PI * 2); ctx.stroke(); }
    if (!tapped) { ctx.fillStyle = "#e9edf7"; ctx.font = `700 11px ${mono}`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(String(i + 1), p[0], p[1]); ctx.textBaseline = "alphabetic"; }
  });
}

const GAMES_DEF = {
  solar: {
    meta: { title: { en: "Asteroid Defense", ja: "小惑星ディフェンス" }, goal: { en: "Shoot the falling asteroids to score — bigger rocks are worth more.", ja: "落ちてくる小惑星を撃って得点——大きい岩ほど高得点。" }, avoid: { en: "Don't let a rock reach the bottom or hit your ship — it costs a shield.", ja: "岩を最下部まで落とすか自機に当てるとシールドを1つ失う。" }, pad: "lrf" },
    init: (g, api) => { g.shipX = api.W / 2; g.bullets = []; g.rocks = []; g.cd = 0; g.spawn = 0.5; g.bg = makeStars(api.W, api.H, 60); },
    step: (g, ctx, dt, api, over) => {
      const { W, H, keys, diff } = api, spd = 330;
      if (keys.left) g.shipX -= spd * dt;
      if (keys.right) g.shipX += spd * dt;
      if (g.pdown && g.px != null) g.shipX += clamp(g.px - g.shipX, -spd * dt, spd * dt);
      g.shipX = clamp(g.shipX, 18, W - 18);
      g.cd -= dt;
      if ((keys.fire || g.pdown) && g.cd <= 0) { g.bullets.push({ x: g.shipX, y: H - 42 }); g.cd = 0.2; }
      for (const b of g.bullets) b.y -= 540 * dt;
      g.bullets = g.bullets.filter((b) => b.y > -12 && !b.dead);
      g.spawn -= dt; const iv = Math.max(0.32, 0.95 / diff - g.t * 0.008);
      if (g.spawn <= 0) { const s = 13 + Math.random() * 22; g.rocks.push({ x: s + Math.random() * (W - s * 2), y: -s, r: s, vy: (34 + Math.random() * 26) * diff * (1 + g.t * 0.02), vx: (Math.random() - 0.5) * 26, spin: Math.random() * 6, vspin: (Math.random() - 0.5) * 2, verts: makeRockVerts() }); g.spawn = iv; }
      for (const r of g.rocks) { r.y += r.vy * dt; r.x += r.vx * dt; r.spin += r.vspin * dt; if (r.x < r.r || r.x > W - r.r) r.vx *= -1; }
      for (const r of g.rocks) { if (r.dead) continue; for (const b of g.bullets) { if (b.dead) continue; if (Math.hypot(b.x - r.x, b.y - r.y) < r.r + 3) { b.dead = true; r.dead = true; g.score += Math.round(r.r); spawnParts(g, r.x, r.y, r.r, "#ffcf6b"); break; } } }
      for (const r of g.rocks) { if (r.dead) continue; if (r.y - r.r > H) { r.dead = true; lose(g, over); } else if (Math.hypot(r.x - g.shipX, r.y - (H - 30)) < r.r + 12) { r.dead = true; spawnParts(g, r.x, r.y, r.r, "#ff7a6b"); lose(g, over); } }
      g.rocks = g.rocks.filter((r) => !r.dead); g.bullets = g.bullets.filter((b) => !b.dead);
      drawBg(ctx, g, W, H);
      for (const r of g.rocks) drawRock(ctx, r);
      ctx.strokeStyle = C.cool; ctx.lineWidth = 2.5;
      for (const b of g.bullets) { ctx.beginPath(); ctx.moveTo(b.x, b.y); ctx.lineTo(b.x, b.y + 10); ctx.stroke(); }
      drawShip(ctx, g.shipX, H - 30);
    },
  },
  star: {
    meta: { title: { en: "Star Catcher", ja: "スターキャッチャー" }, goal: { en: "Catch the glowing hydrogen orbs — each one scores points.", ja: "光る水素の玉をキャッチ——1個ごとに得点。" }, avoid: { en: "Catching a dark rock costs a shield, so steer around them.", ja: "暗い岩をキャッチするとシールドを失うので、よけて進もう。" }, pad: "lr" },
    init: (g, api) => { g.x = api.W / 2; g.items = []; g.spawn = 0.4; g.bg = makeStars(api.W, api.H, 60); },
    step: (g, ctx, dt, api, over) => {
      const { W, H, keys, diff } = api, spd = 340, cy = H - 26;
      if (keys.left) g.x -= spd * dt;
      if (keys.right) g.x += spd * dt;
      if (g.pdown && g.px != null) g.x += clamp(g.px - g.x, -spd * dt, spd * dt);
      g.x = clamp(g.x, 26, W - 26);
      g.spawn -= dt; const iv = Math.max(0.28, 0.7 / diff - g.t * 0.006);
      if (g.spawn <= 0) { const bad = Math.random() < 0.32; g.items.push({ x: 22 + Math.random() * (W - 44), y: -14, r: bad ? 12 + Math.random() * 8 : 8, vy: (90 + Math.random() * 60) * diff * (1 + g.t * 0.015), bad, verts: bad ? makeRockVerts() : null }); g.spawn = iv; }
      for (const it of g.items) it.y += it.vy * dt;
      for (const it of g.items) {
        if (it.hit) continue;
        if (it.y > cy - 12 && it.y < cy + 16 && Math.abs(it.x - g.x) < 30) { it.hit = true; if (it.bad) { spawnParts(g, it.x, it.y, it.r, "#ff7a6b"); lose(g, over); } else { g.score += 5; spawnParts(g, it.x, it.y, it.r, "#ffcf6b"); } }
        else if (it.y > H + 20) it.hit = true;
      }
      g.items = g.items.filter((it) => !it.hit);
      drawBg(ctx, g, W, H);
      for (const it of g.items) {
        if (it.bad) drawRock(ctx, { x: it.x, y: it.y, r: it.r, spin: g.t * 2, verts: it.verts });
        else { const gr = ctx.createRadialGradient(it.x, it.y, 0, it.x, it.y, it.r * 2); gr.addColorStop(0, "#ffe08a"); gr.addColorStop(1, "rgba(255,207,107,0)"); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(it.x, it.y, it.r * 2, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = "#fff4d6"; ctx.beginPath(); ctx.arc(it.x, it.y, it.r, 0, Math.PI * 2); ctx.fill(); }
      }
      const glow = ctx.createRadialGradient(g.x, cy, 2, g.x, cy, 26); glow.addColorStop(0, "rgba(99,211,240,0.4)"); glow.addColorStop(1, "rgba(99,211,240,0)");
      ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(g.x, cy, 26, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = C.cool; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(g.x, cy + 4, 22, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke();
    },
  },
  sky: {
    meta: { title: { en: "Constellation Connect", ja: "星座つなぎ" }, goal: { en: "Tap the numbered stars in order (1, 2, 3…) to draw it. Finish faster for more points.", ja: "番号のついた星を順番（1・2・3…）にタップして描こう。早いほど高得点。" }, avoid: { en: "A wrong star, or running out of time, costs a shield.", ja: "違う星をタップするか時間切れになるとシールドを失う。" }, pad: "none" },
    init: (g, api) => { g.bg = makeStars(api.W, api.H, 90); slSetup(g, api); },
    step: (g, ctx, dt, api, over) => {
      const { W, H, lang } = api;
      drawBg(ctx, g, W, H);
      if (g.done) {
        g.doneT -= dt; slLinks(ctx, g, true); slStars(ctx, g, true);
        ctx.fillStyle = C.cool; ctx.font = `600 18px ${ui}`; ctx.textAlign = "center"; ctx.fillText(tr(g.con.name, lang), W / 2, 34);
        if (g.doneT <= 0) slSetup(g, api);
        return;
      }
      g.time -= dt;
      if (g.time <= 0) { lose(g, over); g.time = g.max; }
      if (g.tapped) {
        const { x, y } = g.tapped; g.tapped = null;
        let hit = -1, bd = 1e9;
        g.pts.forEach((p, i) => { const d = Math.hypot(p[0] - x, p[1] - y); if (d < 24 && d < bd) { bd = d; hit = i; } });
        if (hit === g.order) { g.order++; if (g.order >= g.pts.length) { g.score += Math.round(20 + g.time * 3); g.done = true; g.doneT = 1.2; } }
        else if (hit >= 0) { lose(g, over); spawnParts(g, g.pts[hit][0], g.pts[hit][1], 7, "#ff7a6b"); }
      }
      slLinks(ctx, g, false); slStars(ctx, g, false);
      ctx.fillStyle = "rgba(120,150,210,0.2)"; ctx.fillRect(14, H - 16, W - 28, 5);
      ctx.fillStyle = C.sun; ctx.fillRect(14, H - 16, (W - 28) * clamp(g.time / g.max, 0, 1), 5);
      ctx.fillStyle = C.muted; ctx.font = `500 13px ${ui}`; ctx.textAlign = "center"; ctx.fillText(tr(g.con.name, lang), W / 2, 30);
    },
  },
  scale: {
    meta: { title: { en: "Warp Run", ja: "ワープラン" }, goal: { en: "Fly outward and survive — your score climbs the longer you last.", ja: "宇宙の彼方へ。長く生き延びるほどスコアが伸びる。" }, avoid: { en: "Everything is an obstacle. One collision costs a shield, and it keeps speeding up.", ja: "すべてが障害物。1回ぶつかるとシールドを失い、速度はどんどん上がる。" }, pad: "lr" },
    init: (g, api) => { g.x = api.W / 2; g.obs = []; g.spawn = 0.5; g.bg = Array.from({ length: 80 }, () => ({ x: Math.random() * api.W, y: Math.random() * api.H, len: 4 + Math.random() * 10, sp: 200 + Math.random() * 300 })); },
    step: (g, ctx, dt, api, over) => {
      const { W, H, keys, diff } = api, spd = 360, ramp = 1 + g.t * 0.05;
      if (keys.left) g.x -= spd * dt;
      if (keys.right) g.x += spd * dt;
      if (g.pdown && g.px != null) g.x += clamp(g.px - g.x, -spd * dt, spd * dt);
      g.x = clamp(g.x, 18, W - 18);
      g.spawn -= dt; const iv = Math.max(0.26, 0.7 / diff - g.t * 0.01);
      if (g.spawn <= 0) { const s = 12 + Math.random() * 20; g.obs.push({ x: s + Math.random() * (W - 2 * s), y: -s, r: s, vy: (150 + Math.random() * 80) * diff * ramp, spin: Math.random() * 6, vspin: (Math.random() - 0.5) * 3, verts: makeRockVerts() }); g.spawn = iv; }
      for (const o of g.obs) { o.y += o.vy * dt; o.spin += o.vspin * dt; }
      for (const o of g.obs) { if (o.dead) continue; if (Math.hypot(o.x - g.x, o.y - (H - 30)) < o.r + 11) { o.dead = true; spawnParts(g, o.x, o.y, o.r, "#ff7a6b"); lose(g, over); } else if (o.y - o.r > H) o.dead = true; }
      g.obs = g.obs.filter((o) => !o.dead);
      g.score = Math.floor(g.t * 12);
      ctx.fillStyle = "#050810"; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(150,180,235,0.5)"; ctx.lineWidth = 1.5;
      for (const s of g.bg) { s.y += s.sp * ramp * dt; if (s.y > H) { s.y = -s.len; s.x = Math.random() * W; } ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x, s.y + s.len * ramp); ctx.stroke(); }
      for (const o of g.obs) drawRock(ctx, o);
      drawShip(ctx, g.x, H - 30);
    },
  },
};

function HowRow({ label, text, color }) {
  return (
    <div style={styles.howRow}>
      <span style={{ ...styles.howLabel, color }}>{label}</span>
      <span style={styles.howText}>{text}</span>
    </div>
  );
}

function ArcadeShell({ wrong, onExit, def }) {
  const lang = useLang();
  const t = UI[lang];
  const [wrapRef, w] = useMeasure();
  const W = Math.min(w, 760), H = 460;
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState("intro");
  const [finalScore, setFinalScore] = useState(0);
  const [runId, setRunId] = useState(0);
  const gref = useRef(null);
  const keys = useRef({ left: false, right: false, fire: false });
  const playingRef = useRef(false);
  const startLives = clamp(3 - wrong, 1, 3);
  const diff = 1 + wrong * 0.18;
  const pad = def.meta.pad;

  useEffect(() => { playingRef.current = phase === "play"; }, [phase]);

  useEffect(() => {
    const isL = (k) => k === "ArrowLeft" || k === "a" || k === "A";
    const isR = (k) => k === "ArrowRight" || k === "d" || k === "D";
    const isF = (e) => e.key === " " || e.code === "Space";
    const kd = (e) => { if (!playingRef.current) return; if (isL(e.key)) { keys.current.left = true; e.preventDefault(); } if (isR(e.key)) { keys.current.right = true; e.preventDefault(); } if (isF(e)) { keys.current.fire = true; e.preventDefault(); } };
    const ku = (e) => { if (isL(e.key)) keys.current.left = false; if (isR(e.key)) keys.current.right = false; if (isF(e)) keys.current.fire = false; };
    window.addEventListener("keydown", kd); window.addEventListener("keyup", ku);
    return () => { window.removeEventListener("keydown", kd); window.removeEventListener("keyup", ku); };
  }, []);

  useEffect(() => {
    if (phase !== "play") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, W, H);
    const api = { W, H, startLives, diff, keys: keys.current, lang };
    const g = { score: 0, lives: startLives, flash: 0, over: false, parts: [], t: 0, px: null, py: null, pdown: false, tapped: null };
    gref.current = g;
    def.init(g, api);
    const over = () => { g.over = true; setFinalScore(g.score); setPhase("over"); };
    let raf, last = performance.now();
    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now; g.t += dt;
      def.step(g, ctx, dt, api, over);
      for (const p of g.parts) { p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt; }
      g.parts = g.parts.filter((p) => p.life > 0);
      for (const p of g.parts) { ctx.globalAlpha = clamp(p.life * 2, 0, 1); ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2); ctx.fill(); }
      ctx.globalAlpha = 1;
      ctx.fillStyle = C.text; ctx.font = `700 15px ${mono}`; ctx.textAlign = "left"; ctx.fillText(`${t.score} ${g.score}`, 14, 24);
      for (let i = 0; i < g.lives; i++) { const hx = W - 16 - i * 20, hy = 18; ctx.fillStyle = C.cool; ctx.beginPath(); ctx.moveTo(hx, hy - 7); ctx.lineTo(hx - 6, hy + 6); ctx.lineTo(hx + 6, hy + 6); ctx.closePath(); ctx.fill(); }
      if (g.flash > 0) { g.flash -= dt; ctx.fillStyle = `rgba(255,80,70,${g.flash * 0.5})`; ctx.fillRect(0, 0, W, H); }
      if (!g.over) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [phase, runId, W]);

  const pdown = (ev) => { const g = gref.current; if (!g) return; const r = canvasRef.current.getBoundingClientRect(); g.px = ev.clientX - r.left; g.py = ev.clientY - r.top; g.pdown = true; g.tapped = { x: g.px, y: g.py }; canvasRef.current.setPointerCapture?.(ev.pointerId); };
  const pmove = (ev) => { const g = gref.current; if (!g || !g.pdown) return; const r = canvasRef.current.getBoundingClientRect(); g.px = ev.clientX - r.left; g.py = ev.clientY - r.top; };
  const pup = () => { const g = gref.current; if (g) g.pdown = false; };
  const hold = (k, v) => () => { keys.current[k] = v; };
  const controls = pad === "lrf" ? t.controlsShoot : pad === "none" ? t.controlsTap : t.controlsMove;

  return (
    <div ref={wrapRef}>
      {phase === "intro" && (
        <div style={styles.resultWrap}>
          <div style={styles.arcadeBadge}>{tr(def.meta.title, lang)}</div>
          <p style={styles.ratingMsg}>{t.bonusLede}</p>
          <div style={styles.howtoCard}>
            <div style={styles.howtoTitle}>{t.howToPlay}</div>
            <HowRow label={t.labelGoal} text={tr(def.meta.goal, lang)} color={C.cool} />
            <HowRow label={t.labelControls} text={controls} color={C.sun} />
            <HowRow label={t.labelAvoid} text={tr(def.meta.avoid, lang)} color={C.danger} />
            <HowRow label={t.labelShields} text={t.shieldsRule} color={C.good} />
          </div>
          <div style={styles.penaltyBox}>{wrong > 0 ? t.penaltyNote(wrong) : t.penaltyNone}</div>
          <div style={styles.resultBtns}>
            <button style={styles.nextBtn} onClick={() => setPhase("play")}>{t.startGame}</button>
            <button style={styles.chip} onClick={onExit}>{t.backToResults}</button>
          </div>
        </div>
      )}
      {phase === "play" && (
        <div>
          <canvas ref={canvasRef} onPointerDown={pdown} onPointerMove={pmove} onPointerUp={pup} onPointerLeave={pup}
            style={{ display: "block", margin: "0 auto", borderRadius: 12, touchAction: "none", cursor: pad === "none" ? "pointer" : "crosshair", maxWidth: "100%" }} />
          {pad !== "none" && (
            <div style={styles.padRow}>
              <button style={styles.padBtn} onPointerDown={hold("left", true)} onPointerUp={hold("left", false)} onPointerLeave={hold("left", false)}>◀</button>
              {pad === "lrf" && <button style={styles.padBtn} onPointerDown={hold("fire", true)} onPointerUp={hold("fire", false)} onPointerLeave={hold("fire", false)}>{t.fire}</button>}
              <button style={styles.padBtn} onPointerDown={hold("right", true)} onPointerUp={hold("right", false)} onPointerLeave={hold("right", false)}>▶</button>
            </div>
          )}
          <p style={styles.arcadeControls}>{controls}</p>
        </div>
      )}
      {phase === "over" && (
        <div style={styles.resultWrap}>
          <div style={styles.arcadeBadge}>{t.gameOver}</div>
          <div style={styles.resultRing}>
            <span style={styles.resultScore}>{finalScore}</span>
            <span style={styles.resultPct}>{t.score}</span>
          </div>
          <div style={styles.resultBtns}>
            <button style={styles.iconBtn} onClick={() => { setRunId((k) => k + 1); setPhase("play"); }}>{t.playAgain}</button>
            <button style={styles.chip} onClick={onExit}>{t.backToResults}</button>
          </div>
        </div>
      )}
    </div>
  );
}

function BonusGame({ topic, wrong, onExit }) {
  const id = useMemo(() => (topic === "grand" ? ["solar", "star", "sky", "scale"][Math.floor(Math.random() * 4)] : topic), [topic]);
  return <ArcadeShell wrong={wrong} onExit={onExit} def={GAMES_DEF[id]} />;
}


/* ============================================================
   KNOWLEDGE CHECK — quizzes
   ============================================================ */
function Quiz({ initialTopic }) {
  const lang = useLang();
  const t = UI[lang];
  const [topic, setTopic] = useState(null);
  const [run, setRun] = useState(null);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [done, setDone] = useState(false);
  const [arcade, setArcade] = useState(false);

  const begin = (tp) => {
    setTopic(tp); setRun(buildRun(tp));
    setIdx(0); setPicked(null); setScore(0); setStreak(0); setBest(0); setDone(false); setArcade(false);
  };
  useEffect(() => { if (initialTopic) begin(initialTopic); }, []); // eslint-disable-line

  if (!topic) {
    return (
      <div>
        <div style={styles.quizIntro}>
          <h2 style={styles.quizH2}>{t.quizTitle}</h2>
          <p style={styles.quizLede}>{t.quizLede}</p>
        </div>
        <div style={styles.topicGrid}>
          {QUIZ_TOPICS.map((tp) => (
            <button key={tp.id} style={styles.topicCard} onClick={() => begin(tp.id)}>
              <span style={styles.topicLabel}>{tr(tp.label, lang)}</span>
              <span style={styles.topicBlurb}>{tr(tp.blurb, lang)}</span>
              <span style={styles.topicGo}>{t.start}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (done) {
    const total = run.length;
    const pct = score / total;
    const r = quizRating(pct);
    if (arcade) return <BonusGame topic={topic} wrong={total - score} onExit={() => setArcade(false)} />;
    return (
      <div style={styles.resultWrap}>
        <div style={styles.resultRing}>
          <span style={styles.resultScore}>{score}<span style={styles.resultOf}>/{total}</span></span>
          <span style={styles.resultPct}>{Math.round(pct * 100)}%</span>
        </div>
        <div style={styles.ratingTitle}>{tr(r.t, lang)}</div>
        <p style={styles.ratingMsg}>{tr(r.m, lang)}</p>
        {best > 1 && <div style={styles.bestStreak}>{t.bestStreak(best)}</div>}
        <button style={styles.bonusBtn} onClick={() => setArcade(true)}>{t.bonusRound}</button>
        <div style={styles.resultBtns}>
          <button style={styles.iconBtn} onClick={() => begin(topic)}>{t.tryAgain}</button>
          <button style={styles.chip} onClick={() => { setTopic(null); setRun(null); setDone(false); }}>{t.anotherSubject}</button>
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
      setScore((s) => s + 1);
      const ns = streak + 1; setStreak(ns); setBest((b) => Math.max(b, ns));
    } else setStreak(0);
  };
  const next = () => {
    if (idx + 1 < run.length) { setIdx(idx + 1); setPicked(null); } else setDone(true);
  };

  return (
    <div>
      <div style={styles.quizTop}>
        <span style={styles.quizCount}>{t.question} {idx + 1} / {run.length}</span>
        <span style={styles.quizScore}>{t.score} {score}{streak > 1 && <em style={styles.streak}>  ·  {t.streak} {streak}</em>}</span>
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

const EXPLORE = [
  { id: "solar", label: { en: "Solar System", ja: "太陽系" }, sub: { en: "worlds in motion", ja: "めぐる惑星たち" }, Comp: SolarSystem },
  { id: "star", label: { en: "Star Forge", ja: "星の工房" }, sub: { en: "a star's whole life", ja: "星の一生" }, Comp: StarForge },
  { id: "sky", label: { en: "Night Sky", ja: "夜空" }, sub: { en: "learn the constellations", ja: "星座を覚える" }, Comp: NightSky },
  { id: "scale", label: { en: "Cosmic Scale", ja: "宇宙のスケール" }, sub: { en: "zoom to the edge", ja: "果てまでズーム" }, Comp: CosmicScale },
];
const NAV = [...EXPLORE, { id: "quiz", label: { en: "Knowledge Check", ja: "腕試しクイズ" }, sub: { en: "prove what you learned", ja: "学びを試す" } }];

export default function App() {
  const [lang, setLang] = useState("en");
  const [active, setActive] = useState("solar");
  const [quizTopic, setQuizTopic] = useState(null);
  const [quizKey, setQuizKey] = useState(0);
  const t = UI[lang];

  const openTab = (id) => {
    setActive(id);
    if (id === "quiz") { setQuizTopic(null); setQuizKey((k) => k + 1); }
  };
  const goToQuiz = (tp) => { setQuizTopic(tp); setQuizKey((k) => k + 1); setActive("quiz"); };
  const realm = EXPLORE.find((r) => r.id === active);

  return (
    <LangCtx.Provider value={lang}>
      <div style={styles.root}>
        <style>{`
          ${FONT_IMPORT}
          * { box-sizing: border-box; }
          button { font-family: ${ui}; }
          button:focus-visible, [tabindex]:focus-visible { outline: 2px solid ${C.cool}; outline-offset: 2px; }
          input[type=range] { -webkit-appearance: none; appearance: none; background: transparent; }
          input[type=range]::-webkit-slider-runnable-track { height: 4px; background: rgba(120,150,210,0.3); border-radius: 4px; }
          input[type=range]::-moz-range-track { height: 4px; background: rgba(120,150,210,0.3); border-radius: 4px; }
          input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 18px; height: 18px; border-radius: 50%; background: ${C.sun}; margin-top: -7px; cursor: pointer; box-shadow: 0 0 12px rgba(255,207,107,0.6); }
          input[type=range]::-moz-range-thumb { width: 18px; height: 18px; border: none; border-radius: 50%; background: ${C.sun}; cursor: pointer; }
        `}</style>
        <Starfield />

        <div style={styles.content}>
          <div style={styles.langBar}>
            {[["en", "EN"], ["ja", "日本語"]].map(([code, label]) => (
              <button key={code} onClick={() => setLang(code)}
                style={{ ...styles.chip, ...(lang === code ? styles.chipOn : {}) }}>{label}</button>
            ))}
          </div>

          <header style={styles.header}>
            <div style={styles.eyebrow}>{t.eyebrow}</div>
            <h1 style={styles.title}>Cosmic Explorer</h1>
            <p style={styles.tagline}>{t.tagline}</p>
          </header>

          <nav style={styles.nav}>
            {NAV.map((r) => {
              const on = active === r.id;
              return (
                <button key={r.id} onClick={() => openTab(r.id)} style={{ ...styles.tab, ...(on ? styles.tabOn : {}) }}>
                  <span style={styles.tabLabel}>{tr(r.label, lang)}</span>
                  <span style={styles.tabSub}>{tr(r.sub, lang)}</span>
                </button>
              );
            })}
          </nav>

          <main style={styles.stage}>
            {active === "quiz" ? <Quiz key={quizKey} initialTopic={quizTopic} /> : <realm.Comp />}
          </main>

          {active !== "quiz" && realm && (
            <div style={styles.verifyCta}>
              <span style={styles.verifyText}>{t.verify(tr(realm.label, lang))}</span>
              <button style={styles.verifyBtn} onClick={() => goToQuiz(active)}>{t.takeQuiz(tr(realm.label, lang))}</button>
            </div>
          )}

          <footer style={styles.footer}>{t.footer}</footer>
        </div>
      </div>
    </LangCtx.Provider>
  );
}

/* ============================================================
   STYLES
   ============================================================ */
const styles = {
  root: { position: "relative", minHeight: "100vh", background: `radial-gradient(1200px 700px at 50% -10%, #10162e 0%, ${C.void} 60%)`, color: C.text, fontFamily: ui, overflowX: "hidden" },
  content: { position: "relative", zIndex: 1, maxWidth: 1080, margin: "0 auto", padding: "24px 22px 60px" },
  langBar: { display: "flex", justifyContent: "flex-end", gap: 6, marginBottom: 14 },
  header: { textAlign: "center", marginBottom: 30 },
  eyebrow: { fontFamily: mono, fontSize: 11, letterSpacing: 3, color: C.cool, marginBottom: 14 },
  title: { fontFamily: display, fontWeight: 300, fontSize: "clamp(38px, 7vw, 64px)", margin: 0, letterSpacing: -0.5, lineHeight: 1 },
  tagline: { color: C.muted, maxWidth: 560, margin: "16px auto 0", fontSize: 15, lineHeight: 1.6 },
  nav: { display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 26 },
  tab: { display: "flex", flexDirection: "column", alignItems: "flex-start", background: C.panel, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 18px", cursor: "pointer", color: C.text, backdropFilter: "blur(6px)", transition: "all 0.15s", textAlign: "left" },
  tabOn: { borderColor: C.borderBright, background: "rgba(30,40,70,0.85)", boxShadow: `0 0 24px rgba(99,211,240,0.12)` },
  tabLabel: { fontFamily: display, fontSize: 17 },
  tabSub: { fontFamily: mono, fontSize: 10.5, color: C.faint, letterSpacing: 0.5, marginTop: 2 },
  stage: { background: C.panel, border: `1px solid ${C.border}`, borderRadius: 18, padding: 22, backdropFilter: "blur(10px)", minHeight: 480 },
  realmGrid: { display: "flex", flexWrap: "wrap", gap: 22, alignItems: "flex-start" },
  panel: { flex: "1 1 250px", minWidth: 240, background: "rgba(8,12,26,0.6)", border: `1px solid ${C.border}`, borderRadius: 14, padding: 20, alignSelf: "stretch" },
  panelTitle: { fontFamily: display, fontWeight: 400, fontSize: 24, margin: "2px 0 0" },
  panelKind: { fontSize: 13, color: C.muted, marginTop: 2 },
  swatch: { width: 30, height: 30, borderRadius: "50%", flexShrink: 0, boxShadow: "inset -4px -4px 8px rgba(0,0,0,0.4)" },
  dl: { margin: "18px 0 0", padding: 0 },
  row: { display: "flex", justifyContent: "space-between", gap: 12, padding: "9px 0", borderBottom: `1px solid rgba(120,150,210,0.1)` },
  dt: { color: C.muted, fontSize: 13, margin: 0 },
  dd: { margin: 0, fontFamily: mono, fontSize: 13, textAlign: "right", color: C.text },
  factText: { fontSize: 14.5, lineHeight: 1.6, color: "#c8d0e4", fontFamily: display, fontStyle: "italic" },
  hint: { fontSize: 12.5, color: C.faint, marginTop: 14 },
  note: { fontSize: 12.5, color: C.muted, marginTop: 12, lineHeight: 1.5, maxWidth: 460 },
  controlBar: { display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginTop: 16 },
  iconBtn: { background: "rgba(30,40,70,0.9)", border: `1px solid ${C.borderBright}`, color: C.text, borderRadius: 9, padding: "8px 14px", cursor: "pointer", fontSize: 13, fontWeight: 500 },
  speedRow: { display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" },
  pickerRow: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14, justifyContent: "center" },
  tinyLabel: { fontSize: 11, color: C.faint, fontFamily: mono, marginRight: 2 },
  chip: { background: "transparent", border: `1px solid ${C.border}`, color: C.muted, borderRadius: 20, padding: "5px 11px", cursor: "pointer", fontSize: 12 },
  chipOn: { background: "rgba(99,211,240,0.14)", borderColor: C.cool, color: C.text },
  readout: { display: "flex", gap: 10, marginTop: 12, fontFamily: mono, fontSize: 12.5, color: C.cool },
  range: { width: "100%", marginTop: 18 },
  rangeEnds: { display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 11, color: C.faint, marginTop: 4 },
  fateBox: { marginTop: 18, padding: 14, background: "rgba(255,122,107,0.06)", border: "1px solid rgba(255,122,107,0.22)", borderRadius: 10 },
  fateLabel: { fontFamily: mono, fontSize: 10, letterSpacing: 2, color: C.danger, marginBottom: 8 },
  legendWrap: { marginTop: 18 },
  legendBar: { height: 10, borderRadius: 6, background: "linear-gradient(90deg, #a8c4ff, #eaf0ff, #ffe08a, #ffab5e, #ff6f43)" },
  legendEnds: { display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 10.5, color: C.muted, marginTop: 5 },
  pathBox: { marginTop: 18, padding: 14, background: "rgba(99,211,240,0.06)", border: `1px solid ${C.border}`, borderRadius: 10 },
  pathText: { fontFamily: mono, fontSize: 12.5, lineHeight: 1.7, color: C.text, margin: 0 },
  keyTermText: { fontSize: 13.5, lineHeight: 1.6, color: "#c8d0e4", margin: 0 },
  stagePill: { fontFamily: mono, fontSize: 12, color: C.cool, border: `1px solid ${C.border}`, borderRadius: 20, padding: "5px 12px" },
  stageDesc: { fontSize: 14.5, lineHeight: 1.6, color: "#c8d0e4", marginTop: 12, fontFamily: display, fontStyle: "italic", maxWidth: 460 },
  stepCounter: { fontFamily: mono, fontSize: 12, color: C.faint, letterSpacing: 1, marginBottom: 6 },
  ladder: { display: "flex", alignItems: "center", gap: 5, flex: 1, justifyContent: "center", minWidth: 120 },
  rung: { width: 8, borderRadius: 4, cursor: "pointer", transition: "all 0.2s" },
  footer: { textAlign: "center", marginTop: 26, fontSize: 11.5, color: C.faint, fontFamily: mono },
  verifyCta: { display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "center", marginTop: 18, padding: "14px 18px", background: "rgba(99,211,240,0.06)", border: `1px solid ${C.border}`, borderRadius: 12 },
  verifyText: { color: C.muted, fontSize: 13.5 },
  verifyBtn: { background: "rgba(30,40,70,0.9)", border: `1px solid ${C.borderBright}`, color: C.text, borderRadius: 9, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 500 },
  quizIntro: { textAlign: "center", marginBottom: 22 },
  quizH2: { fontFamily: display, fontWeight: 300, fontSize: 30, margin: 0 },
  quizLede: { color: C.muted, maxWidth: 480, margin: "10px auto 0", fontSize: 14, lineHeight: 1.6 },
  topicGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 },
  topicCard: { display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6, textAlign: "left", background: "rgba(8,12,26,0.6)", border: `1px solid ${C.border}`, borderRadius: 14, padding: 18, cursor: "pointer", color: C.text, transition: "all 0.15s", minHeight: 128 },
  topicLabel: { fontFamily: display, fontSize: 19 },
  topicBlurb: { color: C.muted, fontSize: 13, lineHeight: 1.5, flex: 1 },
  topicGo: { fontFamily: mono, fontSize: 12, color: C.cool, marginTop: 6 },
  quizTop: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10, gap: 12 },
  quizCount: { fontFamily: mono, fontSize: 12.5, color: C.faint, letterSpacing: 1 },
  quizScore: { fontFamily: mono, fontSize: 13, color: C.text },
  streak: { color: C.sun, fontStyle: "normal" },
  progressTrack: { height: 4, background: "rgba(120,150,210,0.2)", borderRadius: 4, overflow: "hidden", marginBottom: 22 },
  progressFill: { height: "100%", background: `linear-gradient(90deg, ${C.cool}, ${C.sun})`, borderRadius: 4, transition: "width 0.3s ease" },
  qText: { fontFamily: display, fontWeight: 400, fontSize: 22, lineHeight: 1.35, margin: "0 0 20px", maxWidth: 620 },
  optCol: { display: "flex", flexDirection: "column", gap: 10, maxWidth: 620 },
  opt: { display: "flex", alignItems: "center", gap: 12, textAlign: "left", background: "rgba(15,21,40,0.7)", border: `1px solid ${C.border}`, color: C.text, borderRadius: 11, padding: "13px 15px", cursor: "pointer", fontSize: 14.5, transition: "all 0.12s", width: "100%" },
  optMark: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, borderRadius: "50%", border: `1px solid ${C.border}`, fontFamily: mono, fontSize: 12.5, flexShrink: 0 },
  optCorrect: { borderColor: C.good, background: "rgba(95,211,154,0.14)" },
  optWrong: { borderColor: C.danger, background: "rgba(255,122,107,0.12)" },
  optDim: { opacity: 0.5 },
  explainBox: { marginTop: 18, padding: 16, background: "rgba(8,12,26,0.6)", border: `1px solid ${C.border}`, borderRadius: 12, maxWidth: 620 },
  explainTag: { fontFamily: mono, fontSize: 11, letterSpacing: 2, marginBottom: 8, textTransform: "uppercase" },
  explainText: { fontSize: 14.5, lineHeight: 1.6, color: "#c8d0e4", margin: "0 0 14px", fontFamily: display, fontStyle: "italic" },
  nextBtn: { background: C.cool, border: "none", color: "#062430", borderRadius: 9, padding: "10px 18px", cursor: "pointer", fontSize: 14, fontWeight: 600 },
  resultWrap: { textAlign: "center", padding: "20px 0 10px", display: "flex", flexDirection: "column", alignItems: "center" },
  resultRing: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 150, height: 150, borderRadius: "50%", border: `2px solid ${C.borderBright}`, marginBottom: 18, background: "radial-gradient(circle, rgba(99,211,240,0.1), transparent)" },
  resultScore: { fontFamily: display, fontSize: 44, lineHeight: 1, color: C.text },
  resultOf: { fontSize: 22, color: C.faint },
  resultPct: { fontFamily: mono, fontSize: 13, color: C.cool, marginTop: 6 },
  ratingTitle: { fontFamily: display, fontSize: 26, fontWeight: 400, color: C.sun },
  ratingMsg: { color: C.muted, maxWidth: 420, margin: "8px auto 0", fontSize: 14, lineHeight: 1.6 },
  bestStreak: { fontFamily: mono, fontSize: 12, color: C.faint, marginTop: 12 },
  resultBtns: { display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap", justifyContent: "center" },
  arcadeBadge: { fontFamily: display, fontSize: 26, fontWeight: 400, color: C.sun, marginBottom: 6 },
  penaltyBox: { fontFamily: mono, fontSize: 13, color: C.text, background: "rgba(255,122,107,0.08)", border: "1px solid rgba(255,122,107,0.25)", borderRadius: 10, padding: "10px 14px", margin: "8px 0 4px", maxWidth: 420 },
  arcadeControls: { fontFamily: mono, fontSize: 11.5, color: C.faint, marginTop: 10, textAlign: "center" },
  howtoCard: { textAlign: "left", background: "rgba(8,12,26,0.6)", border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 16px", margin: "6px 0 10px", maxWidth: 470, width: "100%" },
  howtoTitle: { fontFamily: mono, fontSize: 11, letterSpacing: 2, color: C.muted, textTransform: "uppercase", marginBottom: 10 },
  howRow: { display: "flex", gap: 12, padding: "5px 0", alignItems: "baseline" },
  howLabel: { fontFamily: mono, fontSize: 11, letterSpacing: 1, minWidth: 64, flexShrink: 0, textTransform: "uppercase" },
  howText: { fontSize: 13.5, color: "#c8d0e4", lineHeight: 1.5 },
  padRow: { display: "flex", gap: 10, justifyContent: "center", marginTop: 12 },
  padBtn: { minWidth: 76, background: "rgba(30,40,70,0.9)", border: `1px solid ${C.borderBright}`, color: C.text, borderRadius: 12, padding: "14px 20px", fontSize: 18, cursor: "pointer", userSelect: "none", touchAction: "none" },
  bonusBtn: { background: `linear-gradient(90deg, ${C.sunDeep}, ${C.sun})`, border: "none", color: "#2a1800", borderRadius: 10, padding: "12px 22px", cursor: "pointer", fontSize: 15, fontWeight: 700, marginTop: 20 },
};
