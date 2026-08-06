/* ============================================================
   INTERACTIVE REALM DATA
   PLANETS · SUN · CONSTELLATIONS · SCALE_STEPS
   Translatable text is stored as { en, ja }.
   ============================================================ */

export const KIND = {
  rocky: { en: "Rocky planet", ja: "岩石惑星" },
  gas: { en: "Gas giant", ja: "巨大ガス惑星" },
  ice: { en: "Ice giant", ja: "巨大氷惑星" },
};

export const SUN = {
  name: { en: "The Sun", ja: "太陽" }, kind: { en: "G-type star", ja: "G型星" },
  color: "#ffd36b", diameter: 1392700, au: 0, period: null,
  day: { en: "~25 Earth days (equator)", ja: "約25日（赤道）" },
  moons: { en: "8 planets orbit it", ja: "8つの惑星が周回" },
  fact: { en: "It holds 99.86% of all the mass in the solar system.", ja: "太陽系の全質量の99.86%を占めています。" },
  radius: 22,
};

export const PLANETS = [
  { name: { en: "Mercury", ja: "水星" }, kind: KIND.rocky, color: "#9a9285", diameter: 4879, au: 0.39, period: 88, day: { en: "176 Earth days", ja: "176日" }, moons: { en: "0", ja: "0" }, fact: { en: "A year here is shorter than two of its own days.", ja: "1年が自転2回分より短い惑星です。" }, r: 4 },
  { name: { en: "Venus", ja: "金星" }, kind: KIND.rocky, color: "#e6c17a", diameter: 12104, au: 0.72, period: 224.7, day: { en: "243 Earth days", ja: "243日" }, moons: { en: "0", ja: "0" }, fact: { en: "It spins backwards, and a day lasts longer than its year.", ja: "自転が逆向きで、1日が1年より長い惑星です。" }, r: 6.5 },
  { name: { en: "Earth", ja: "地球" }, kind: KIND.rocky, color: "#4a8fd4", diameter: 12742, au: 1.0, period: 365.25, day: { en: "24 hours", ja: "24時間" }, moons: { en: "1", ja: "1" }, fact: { en: "The only place in the universe life is known to exist.", ja: "宇宙で唯一、生命が確認されている場所です。" }, r: 6.7 },
  { name: { en: "Mars", ja: "火星" }, kind: KIND.rocky, color: "#d1603f", diameter: 6779, au: 1.52, period: 687, day: { en: "24.6 hours", ja: "24.6時間" }, moons: { en: "2", ja: "2" }, fact: { en: "Home to Olympus Mons, a volcano nearly three times Everest's height.", ja: "エベレストの約3倍の高さの火山オリンポス山があります。" }, r: 5 },
  { name: { en: "Jupiter", ja: "木星" }, kind: KIND.gas, color: "#d8a97a", diameter: 139820, au: 5.2, period: 4331, day: { en: "9.9 hours", ja: "9.9時間" }, moons: { en: "95 known", ja: "95個（確認）" }, fact: { en: "Its Great Red Spot is a storm wider than Earth, raging for centuries.", ja: "大赤斑は地球より大きく、何世紀も続く巨大な嵐です。" }, r: 15 },
  { name: { en: "Saturn", ja: "土星" }, kind: KIND.gas, color: "#e6cfa0", diameter: 116460, au: 9.58, period: 10747, day: { en: "10.7 hours", ja: "10.7時間" }, moons: { en: "146 known", ja: "146個（確認）" }, fact: { en: "So light it would float in a bathtub large enough to hold it.", ja: "密度が水より低く、十分大きな水があれば浮きます。" }, r: 13, ring: true },
  { name: { en: "Uranus", ja: "天王星" }, kind: KIND.ice, color: "#a7e3ea", diameter: 50724, au: 19.2, period: 30589, day: { en: "17 hours", ja: "17時間" }, moons: { en: "28 known", ja: "28個（確認）" }, fact: { en: "It orbits tipped on its side, rolling around the Sun like a ball.", ja: "横倒しの姿勢で、ボールのように転がりながら公転します。" }, r: 9 },
  { name: { en: "Neptune", ja: "海王星" }, kind: KIND.ice, color: "#4a6fd4", diameter: 49244, au: 30.1, period: 59800, day: { en: "16 hours", ja: "16時間" }, moons: { en: "16 known", ja: "16個（確認）" }, fact: { en: "Winds here scream at over 2,000 km/h — the fastest in the solar system.", ja: "時速2,000kmを超える暴風が吹く、太陽系で最も速い風です。" }, r: 8.7 },
];

export const CONSTELLATIONS = [
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

export const SCALE_STEPS = [
  { name: { en: "Earth", ja: "地球" }, size: { en: "12,742 km across", ja: "直径 12,742 km" }, blurb: { en: "Home. From out here, everything that has ever happened to our species fits on this single point.", ja: "私たちの故郷。ここから見れば、人類に起きたすべての出来事がこの一点に収まります。" }, tint: "#4a8fd4" },
  { name: { en: "Earth & Moon", ja: "地球と月" }, size: { en: "384,400 km apart", ja: "約 384,400 km 離れている" }, blurb: { en: "The Moon sits about 30 Earth-widths away — far enough that every planet in the solar system could be lined up in the gap.", ja: "月は地球約30個分の彼方。太陽系の全惑星をその隙間に一列に並べられるほどの距離です。" }, tint: "#9fb3d0" },
  { name: { en: "The Solar System", ja: "太陽系" }, size: { en: "~9 billion km wide", ja: "幅 約90億 km" }, blurb: { en: "Out to Neptune. Sunlight (300,000 km/s) still takes over four hours to reach it — and about 8 minutes to reach Earth.", ja: "海王星まで。太陽の光（秒速30万km）でも渡り切るのに4時間以上、地球へは約8分かかります。" }, tint: "#ffcf6b" },
  { name: { en: "To the Nearest Star", ja: "最も近い恒星まで" }, size: { en: "4.24 light-years", ja: "4.24 光年" }, blurb: { en: "Proxima Centauri. Its light left more than four years ago to reach your eye tonight. Nothing we've built could get there in a human lifetime.", ja: "プロキシマ・ケンタウリ。その光は4年以上前に出発して今夜あなたの目に届きます。人類の作った物では一生かかっても到達できません。" }, tint: "#ff9a6b" },
  { name: { en: "The Milky Way", ja: "天の川銀河" }, size: { en: "~100,000 light-years", ja: "約 100,000 光年" }, blurb: { en: "Our galaxy: a spiral of 100–400 billion stars. The Sun is one anonymous speck two-thirds of the way out from the center.", ja: "私たちの銀河。1000〜4000億個の星が渦を巻き、太陽は中心から2/3ほど外側の無名の一点です。" }, tint: "#cbb6ff" },
  { name: { en: "The Local Group", ja: "局部銀河群" }, size: { en: "~10 million light-years", ja: "約 1000万 光年" }, blurb: { en: "The Milky Way, the Andromeda Galaxy, and roughly 80 smaller galaxies, all bound together by gravity.", ja: "天の川銀河、アンドロメダ銀河、そして約80個の小さな銀河が重力で結びついた集団です。" }, tint: "#8ad0ff" },
  { name: { en: "The Cosmic Web", ja: "宇宙の大規模構造" }, size: { en: "hundreds of millions of ly", ja: "数億 光年" }, blurb: { en: "Galaxies aren't scattered at random — they string along vast filaments and sheets, wrapped around emptier voids.", ja: "銀河は無秩序に散らばってはいません。巨大なフィラメント（糸）状に連なり、より空っぽな『ボイド（空洞）』を取り囲みます。" }, tint: "#b58cf0" },
  { name: { en: "The Observable Universe", ja: "観測可能な宇宙" }, size: { en: "~93 billion light-years", ja: "約 930億 光年" }, blurb: { en: "Everything whose light has had time to reach us: around two trillion galaxies. Beyond this edge, there is almost certainly more — we simply cannot see it yet.", ja: "その光が私たちに届くだけの時間があった、すべて——約2兆個の銀河。この果ての向こうにも、まず間違いなくもっと宇宙は広がっています。ただ、私たちにはまだ見えないのです。" }, tint: "#e9edf7" },
];
