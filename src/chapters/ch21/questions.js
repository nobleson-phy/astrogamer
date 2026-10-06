const easy = [
  {
    q: {
      en: 'In what cold, high-density interstellar structures do almost all stars form?',
      ja: 'ほとんどすべての星は、どのような冷たく高密度の星間構造で形成されますか。',
    },
    options: [
      { en: 'Hot H II regions', ja: '高温のH II領域' },
      { en: 'Planetary nebulae', ja: '惑星状星雲' },
      { en: 'Giant molecular clouds (GMCs)', ja: '巨大分子雲（GMC）' },
      { en: 'Local hot bubbles', ja: '局所高温泡' },
    ],
    answer: 2,
    explain: {
      en: 'Stars form in cold, dense giant molecular clouds, such as the Orion Molecular Cloud.',
      ja: '星はオリオン分子雲のような、冷たく密な巨大分子雲で形成されます。',
    },
  },
  {
    q: {
      en: 'What defines a protostar before it reaches the main sequence?',
      ja: '主系列に達する前の原始星を定義するものは何ですか。',
    },
    options: [
      { en: 'It gets 100% of its energy from core carbon fusion.', ja: 'エネルギーの100%を核の炭素融合から得る。' },
      { en: 'It draws energy from gravitational contraction, not nuclear fusion.', ja: '核融合ではなく重力収縮からエネルギーを得る。' },
      { en: 'It has already shed its disk completely.', ja: 'すでに円盤を完全に放出している。' },
      { en: 'It rotates retrograde relative to the Galaxy.', ja: '銀河に対して逆行回転する。' },
    ],
    answer: 1,
    explain: {
      en: 'A protostar shines on heat from gravitational contraction, before core hydrogen fusion begins.',
      ja: '原始星は、核の水素融合が始まる前に、重力収縮による熱で輝きます。',
    },
  },
  {
    q: {
      en: 'What are the glowing knots of gas produced when a protostar’s high-speed polar jets slam into nearby gas?',
      ja: '原始星の高速の極ジェットが近くのガスに激突して生じる、輝くガスの塊は何ですか。',
    },
    options: [
      { en: 'T Tauri objects', ja: 'Tタウリ天体' },
      { en: 'Herbig-Haro (HH) objects', ja: 'ハービッグ・ハロー（HH）天体' },
      { en: 'Westerlund clusters', ja: 'ウェスタールンド星団' },
      { en: 'Proplyds', ja: 'プロプリド' },
    ],
    answer: 1,
    explain: {
      en: 'Herbig-Haro objects are glowing knots where supersonic jets from a young protostar hit interstellar gas.',
      ja: 'ハービッグ・ハロー天体は、若い原始星の超音速ジェットが星間ガスに当たって輝く塊です。',
    },
  },
  {
    q: {
      en: 'Low-mass pre-main-sequence stars with strong winds and disks are named after which prototype?',
      ja: '強い星風と円盤を持つ低質量の前主系列星は、どの原型星にちなんで名付けられますか。',
    },
    options: [
      { en: 'T Tauri', ja: 'Tタウリ' },
      { en: 'Algol', ja: 'アルゴル' },
      { en: 'RR Lyrae', ja: 'RRライリ' },
      { en: 'Mira', ja: 'ミラ' },
    ],
    answer: 0,
    explain: {
      en: 'Young low-mass stars still contracting, with strong winds and disks, are called T Tauri stars.',
      ja: 'まだ収縮中で強い星風と円盤を持つ若い低質量星は、Tタウリ型星と呼ばれます。',
    },
  },
  {
    q: {
      en: 'What is the path a contracting protostar traces on an H–R diagram over time called?',
      ja: '収縮する原始星が時間とともにH–R図上に描く経路は何と呼ばれますか。',
    },
    options: [
      { en: 'Spectral trajectory', ja: 'スペクトル軌道' },
      { en: 'Main-sequence turnoff', ja: '主系列の転回点' },
      { en: 'Evolutionary track', ja: '進化の経路' },
      { en: 'Doppler curve', ja: 'ドップラー曲線' },
    ],
    answer: 2,
    explain: {
      en: 'A star’s changing temperature and luminosity over time trace its evolutionary track on the H–R diagram.',
      ja: '星の温度と光度の時間変化は、H–R図上にその進化の経路を描きます。',
    },
  },
  {
    q: {
      en: 'How does the time for a protostar to reach the main sequence depend on its mass?',
      ja: '原始星が主系列に達するまでの時間は、その質量にどう依存しますか。',
    },
    options: [
      { en: 'All take exactly 10 million years regardless of mass.', ja: '質量に関わらずすべてちょうど1,000万年かかる。' },
      { en: 'Low-mass stars reach it much faster than high-mass stars.', ja: '低質量星が高質量星よりずっと速く到達する。' },
      { en: 'Massive stars contract and reach it much faster than low-mass stars.', ja: '大質量星が収縮して低質量星よりずっと速く到達する。' },
      { en: 'Mass has no effect on the timescale.', ja: '質量は時間に影響しない。' },
    ],
    answer: 2,
    explain: {
      en: 'Massive protostars contract and ignite fusion in as little as thousands of years; low-mass stars take tens of millions.',
      ja: '大質量の原始星はわずか数千年で収縮し融合を始めますが、低質量星は数千万年かかります。',
    },
  },
  {
    q: {
      en: 'Within how long after star formation are the inner dust regions of protoplanetary disks typically cleared?',
      ja: '星形成の後、原始惑星系円盤の内側の塵の領域は通常どれくらいで一掃されますか。',
    },
    options: [
      { en: '100–300 thousand years', ja: '10万〜30万年' },
      { en: '3–10 million years', ja: '300万〜1,000万年' },
      { en: '500 million–1 billion years', ja: '5億〜10億年' },
      { en: '4.5 billion years', ja: '45億年' },
    ],
    answer: 1,
    explain: {
      en: 'Inner disk dust is typically gone within 3–10 million years as material accretes or forms planetesimals.',
      ja: '内側の円盤の塵は、物質が降着するか微惑星になるにつれ、通常300万〜1,000万年で消えます。',
    },
  },
  {
    q: {
      en: 'Who discovered the first exoplanet around a sunlike star (51 Pegasi b) in 1995, winning the 2019 Nobel Prize?',
      ja: '1995年に太陽に似た星をめぐる最初の系外惑星（ペガスス座51番星b）を発見し、2019年のノーベル賞を受けたのは誰ですか。',
    },
    options: [
      { en: 'Geoff Marcy and Paul Butler', ja: 'ジェフ・マーシーとポール・バトラー' },
      { en: 'Michel Mayor and Didier Queloz', ja: 'ミシェル・マイヨールとディディエ・ケロー' },
      { en: 'William Borucki and Natalie Batalha', ja: 'ウィリアム・ボルッキとナタリー・バタリア' },
      { en: 'David Charbonneau and Sara Seager', ja: 'デイビッド・シャルボノーとサラ・シーガー' },
    ],
    answer: 1,
    explain: {
      en: 'Michel Mayor and Didier Queloz found 51 Pegasi b in 1995 using the radial-velocity method.',
      ja: 'ミシェル・マイヨールとディディエ・ケローが1995年、視線速度法でペガスス座51番星bを発見しました。',
    },
  },
  {
    q: {
      en: 'The Doppler (radial velocity) method measures which motion of the host star?',
      ja: 'ドップラー（視線速度）法は、主星のどの運動を測りますか。',
    },
    options: [
      { en: 'Its transverse proper motion across the sky', ja: '空を横切る横断的な固有運動' },
      { en: 'Its periodic line-of-sight wobble about the center of mass', ja: '重心をめぐる周期的な視線方向の揺れ' },
      { en: 'Its spin around its own axis', ja: '自分の軸のまわりの自転' },
      { en: 'Its orbit around the Galactic center', ja: '銀河中心のまわりの公転' },
    ],
    answer: 1,
    explain: {
      en: 'The Doppler method detects the star’s periodic to-and-fro wobble along our line of sight as the planet orbits.',
      ja: 'ドップラー法は、惑星が公転するにつれ視線方向に行き来する星の周期的な揺れを検出します。',
    },
  },
  {
    q: {
      en: 'What can be directly found from the transit depth (fraction of light blocked)?',
      ja: 'トランジットの深さ（遮られる光の割合）から直接わかるのは何ですか。',
    },
    options: [
      { en: 'The planet’s radius relative to its star', ja: '星に対する惑星の半径' },
      { en: 'The planet’s exact mass', ja: '惑星の正確な質量' },
      { en: 'The composition of the planet’s core', ja: '惑星の核の組成' },
      { en: 'The planet’s magnetic field strength', ja: '惑星の磁場の強さ' },
    ],
    answer: 0,
    explain: {
      en: 'Transit depth equals (R_planet / R_star)², so it gives the planet’s size relative to the star.',
      ja: 'トランジットの深さは（惑星半径／星半径)²に等しく、星に対する惑星の大きさを与えます。',
    },
  },
  {
    q: {
      en: 'If both the transit and Doppler methods work on the same planet, what key property can be derived?',
      ja: '同じ惑星にトランジット法とドップラー法の両方が使えると、どの重要な性質が導けますか。',
    },
    options: [
      { en: 'The age of its surface rocks', ja: '表面の岩の年齢' },
      { en: 'The planet’s average density (mass ÷ volume)', ja: '惑星の平均密度（質量÷体積）' },
      { en: 'The rotation period of its core', ja: '核の自転周期' },
      { en: 'The thickness of its ozone layer', ja: 'オゾン層の厚さ' },
    ],
    answer: 1,
    explain: {
      en: 'Doppler gives the mass and transit gives the size (volume); together they yield the average density.',
      ja: 'ドップラーが質量を、トランジットが大きさ（体積）を与え、合わせると平均密度が得られます。',
    },
  },
  {
    q: {
      en: 'What are jovian-mass planets orbiting extremely close to their stars (periods of a few days) called?',
      ja: '星のごく近くを回る（周期が数日の）木星質量の惑星は何と呼ばれますか。',
    },
    options: [
      { en: 'Mini-Neptunes', ja: 'ミニ・ネプチューン' },
      { en: 'Hot Jupiters', ja: 'ホットジュピター' },
      { en: 'Super-Earths', ja: 'スーパーアース' },
      { en: 'Brown dwarfs', ja: '褐色矮星' },
    ],
    answer: 1,
    explain: {
      en: 'Giant planets in close-in, few-day orbits are called "hot Jupiters."',
      ja: '数日の近い軌道にある巨大惑星は「ホットジュピター」と呼ばれます。',
    },
  },
  {
    q: {
      en: 'Which NASA mission (launched 2009) monitored over 150,000 stars to find thousands of transiting planets?',
      ja: '15万を超える星を監視して数千のトランジット惑星を見つけたNASAのミッション（2009年打ち上げ）はどれですか。',
    },
    options: [
      { en: 'Hubble Space Telescope', ja: 'ハッブル宇宙望遠鏡' },
      { en: 'Kepler Space Telescope', ja: 'ケプラー宇宙望遠鏡' },
      { en: 'Spitzer Space Telescope', ja: 'スピッツァー宇宙望遠鏡' },
      { en: 'James Webb Space Telescope', ja: 'ジェイムズ・ウェッブ宇宙望遠鏡' },
    ],
    answer: 1,
    explain: {
      en: 'NASA’s Kepler telescope stared at one field, finding thousands of exoplanets by their transits.',
      ja: 'NASAのケプラー望遠鏡は一つの領域を見つめ、トランジットで数千の系外惑星を見つけました。',
    },
  },
  {
    q: {
      en: 'What class of exoplanets, absent from our solar system, has radii 1.4–2.8 times Earth’s?',
      ja: '太陽系にはない、半径が地球の1.4〜2.8倍の系外惑星のクラスは何ですか。',
    },
    options: [
      { en: 'Super-Earths', ja: 'スーパーアース' },
      { en: 'Hot Jupiters', ja: 'ホットジュピター' },
      { en: 'Brown dwarfs', ja: '褐色矮星' },
      { en: 'Sub-Mercuries', ja: 'サブ・マーキュリー' },
    ],
    answer: 0,
    explain: {
      en: 'Super-Earths (radii ~1.4–2.8 R⊕) are common around other stars but absent from our solar system.',
      ja: 'スーパーアース（半径約1.4〜2.8 R⊕）は他の星では一般的ですが、太陽系にはありません。',
    },
  },
  {
    q: {
      en: 'What is the region around a star where temperatures allow liquid water on a planet’s surface?',
      ja: '惑星の表面に液体の水が存在できる温度となる、星のまわりの領域は何ですか。',
    },
    options: [
      { en: 'Corona', ja: 'コロナ' },
      { en: 'Accretion zone', ja: '降着帯' },
      { en: 'Habitable zone', ja: 'ハビタブルゾーン' },
      { en: 'Roche limit', ja: 'ロッシュ限界' },
    ],
    answer: 2,
    explain: {
      en: 'The habitable zone is the range of distances where a planet could have liquid water on its surface.',
      ja: 'ハビタブルゾーンは、惑星が表面に液体の水を持ちうる距離の範囲です。',
    },
  },
];

const medium = [
  {
    q: {
      en: 'A planet transits a sunlike star and blocks 1% (0.01) of its light. What is R_planet / R_star?',
      ja: '惑星が太陽に似た星をトランジットし、その光の1%（0.01）を遮ります。惑星半径／星半径はいくつですか。',
    },
    options: [
      { en: '1/100', ja: '1/100' },
      { en: '1/10', ja: '1/10' },
      { en: '1/2', ja: '1/2' },
      { en: 'Equal in size', ja: '同じ大きさ' },
    ],
    answer: 1,
    explain: {
      en: 'Depth = (Rp/R*)² = 0.01, so Rp/R* = √0.01 = 0.1 = 1/10.',
      ja: '深さ ＝ (Rp/R*)² ＝ 0.01 なので、Rp/R* ＝ √0.01 ＝ 0.1 ＝ 1/10 です。',
    },
  },
  {
    q: {
      en: 'Why is the Doppler method biased toward finding massive planets in close orbits?',
      ja: 'なぜドップラー法は、近い軌道の大質量惑星を見つけやすい偏りを持つのですか。',
    },
    options: [
      { en: 'Close massive planets absorb all the star’s UV light.', ja: '近い大質量惑星が星の紫外線をすべて吸収するから。' },
      { en: 'Massive, close-in planets cause larger stellar wobbles with short, easily observed periods.', ja: '大質量で近い惑星は、短く観測しやすい周期で、より大きな星の揺れを起こすから。' },
      { en: 'Distant planets move too fast to measure their Doppler shifts.', ja: '遠い惑星は速すぎてドップラー偏移を測れないから。' },
      { en: 'Massive planets block 100% of the star’s spectrum.', ja: '大質量惑星が星のスペクトルを100%遮るから。' },
    ],
    answer: 1,
    explain: {
      en: 'A big, close planet tugs its star harder and faster, making a large, short-period wobble that’s easiest to detect.',
      ja: '大きく近い惑星は星をより強く速く引くので、検出しやすい大きく短周期の揺れを作ります。',
    },
  },
  {
    q: {
      en: 'Why were "hot Jupiters" a surprise when first discovered in 1995?',
      ja: '1995年に初めて発見されたとき、「ホットジュピター」が驚きだったのはなぜですか。',
    },
    options: [
      { en: 'They were expected to be solid iron.', ja: '固い鉄でできていると予想されていたから。' },
      { en: 'Models required giant planets to form far out, where water ice can build a massive core.', ja: 'モデルは、巨大惑星が水の氷で大きな核を作れる遠方で形成されると要求していたから。' },
      { en: 'They orbit their stars in retrograde.', ja: '星を逆行して回るから。' },
      { en: 'Gas giants were thought to exist only around red dwarfs.', ja: '巨大ガス惑星は赤色矮星のまわりにしかないと考えられていたから。' },
    ],
    answer: 1,
    explain: {
      en: 'Gas giants need an icy core to grow, which forms far from the star — so a Jupiter right next to its star was unexpected.',
      ja: '巨大ガス惑星は成長に氷の核が要り、それは星から遠くで作られます——だから星のすぐ隣の木星は予想外でした。',
    },
  },
  {
    q: {
      en: 'How did hot Jupiters end up in short-period orbits so close to their stars?',
      ja: 'ホットジュピターは、どうして星のごく近くの短周期軌道に落ち着いたのですか。',
    },
    options: [
      { en: 'They condensed from solar flares near the star’s surface.', ja: '星の表面近くの太陽フレアから凝縮した。' },
      { en: 'They formed beyond the ice line and migrated inward via interactions and disk friction.', ja: 'アイスラインの外で形成され、相互作用と円盤の摩擦で内側へ移動した。' },
      { en: 'They were captured from interstellar space by black holes.', ja: 'ブラックホールに星間空間から捕獲された。' },
      { en: 'Magnetic fields pushed them in from the Kuiper belt.', ja: '磁場がカイパーベルトから押し込んだ。' },
    ],
    answer: 1,
    explain: {
      en: 'They formed far out beyond the ice line, then migrated inward through gravitational and frictional interaction with the disk.',
      ja: 'アイスラインの外で形成され、円盤との重力的・摩擦的な相互作用で内側へ移動しました。',
    },
  },
  {
    q: {
      en: 'Why do young gas-giant exoplanets look brighter in infrared imaging than older ones of the same mass?',
      ja: 'なぜ若い巨大ガス系外惑星は、同じ質量の古いものより赤外線撮像で明るく見えるのですか。',
    },
    options: [
      { en: 'Young giants have higher fusion rates in their atmospheres.', ja: '若い巨星は大気の核融合率が高いから。' },
      { en: 'Young giants still glow with leftover heat from their gravitational formation and contraction.', ja: '若い巨星は重力的な形成と収縮の残り熱でまだ輝いているから。' },
      { en: 'Older giants are covered in dark water oceans.', ja: '古い巨星は暗い水の海に覆われているから。' },
      { en: 'Young giants reflect all visible light as UV.', ja: '若い巨星は可視光をすべて紫外線として反射するから。' },
    ],
    answer: 1,
    explain: {
      en: 'Young giants retain formation heat and glow in the infrared, which makes them easier to image directly.',
      ja: '若い巨星は形成時の熱を保ち赤外線で輝くので、直接撮像しやすいのです。',
    },
  },
];

const hard = [
  {
    q: {
      en: 'How do shock waves from supernovae or H II regions trigger propagating star formation in a molecular cloud?',
      ja: '超新星やH II領域からの衝撃波は、分子雲でどのように次々と星形成を引き起こしますか。',
    },
    options: [
      { en: 'They heat the whole cloud to millions of degrees so atoms expand into stars.', ja: '雲全体を数百万度に熱し、原子が膨張して星になる。' },
      { en: 'They compress dense gas at the cloud’s edge so gravity overcomes gas pressure and collapse begins.', ja: '雲の端の密なガスを圧縮し、重力がガス圧に打ち勝って収縮が始まる。' },
      { en: 'They destroy all heavy elements, leaving pure hydrogen.', ja: '重元素をすべて破壊し、純粋な水素を残す。' },
      { en: 'They stop the cloud’s rotation completely.', ja: '雲の回転を完全に止める。' },
    ],
    answer: 1,
    explain: {
      en: 'The shock squeezes nearby cloud gas until gravity wins over pressure, collapsing it into new stars — which can shock the next region.',
      ja: '衝撃波が近くの雲のガスを、重力が圧力に勝つまで押し縮めて新しい星に崩壊させ——それが次の領域を衝撃します。',
    },
  },
  {
    q: {
      en: 'How do compact multi-planet systems like Kepler-62 and Kepler-444 change our view of planetary architecture?',
      ja: 'ケプラー62やケプラー444のような密集した多重惑星系は、惑星系の構造についての見方をどう変えますか。',
    },
    options: [
      { en: 'They prove all systems have exactly eight planets on circular orbits.', ja: 'すべての系がちょうど8個の惑星を円軌道に持つと証明する。' },
      { en: 'They show systems can be far more tightly packed, with several planets inside Mercury’s orbital radius.', ja: '系がはるかに密集しうること、複数の惑星が水星の軌道半径の内側を回ることを示す。' },
      { en: 'They show terrestrial planets can’t form around stars older than the Sun.', ja: '地球型惑星は太陽より古い星のまわりでは作れないと示す。' },
      { en: 'They show giant planets always orbit at 30 AU.', ja: '巨大惑星は常に30 AUを回ると示す。' },
    ],
    answer: 1,
    explain: {
      en: 'These systems pack several planets well inside Mercury’s orbit — far more compact than our solar system.',
      ja: 'これらの系は水星の軌道のはるか内側に複数の惑星を詰め込みます——太陽系よりはるかに密集しています。',
    },
  },
  {
    q: {
      en: 'What slows a protostar’s rapid free-fall collapse on its way to the main sequence?',
      ja: '原始星の急速な自由落下の収縮を、主系列への途中で何が遅くしますか。',
    },
    options: [
      { en: 'Fusion starts immediately in its outer envelope.', ja: '外層で核融合がすぐに始まる。' },
      { en: 'It becomes dense and opaque enough to trap contraction heat, building internal gas pressure.', ja: '収縮の熱を閉じ込めるほど密で不透明になり、内部のガス圧が高まる。' },
      { en: 'Solar wind from neighboring stars pushes it outward.', ja: '近くの星からの星風が外へ押す。' },
      { en: 'Its magnetic field dissolves the core.', ja: '磁場が核を溶かす。' },
    ],
    answer: 1,
    explain: {
      en: 'Once dense and opaque, the protostar traps the heat of contraction; rising gas pressure resists gravity and slows the collapse.',
      ja: '密で不透明になると収縮の熱を閉じ込め、上がるガス圧が重力に抵抗して収縮を遅くします。',
    },
  },
  {
    q: {
      en: 'What does the 11-billion-year age of the Kepler-444 system tell us about cosmic history?',
      ja: 'ケプラー444系の110億年という年齢は、宇宙の歴史について何を教えますか。',
    },
    options: [
      { en: 'Planets can only form in globular clusters.', ja: '惑星は球状星団でしか形成できない。' },
      { en: 'Planet formation began very early — when the Galaxy was only ~2 billion years old, despite low heavy-element abundances.', ja: '惑星形成は非常に早く——重元素が乏しいのに、銀河がわずか約20億歳のときに——始まった。' },
      { en: 'The Milky Way is older than the universe.', ja: '天の川は宇宙より古い。' },
      { en: 'Rocky planets take 10 billion years to form.', ja: '岩石惑星は形成に100億年かかる。' },
    ],
    answer: 1,
    explain: {
      en: 'Kepler-444 shows planets formed when the Galaxy was young and metal-poor — planet formation turned on very early.',
      ja: 'ケプラー444は、銀河が若く金属に乏しかった頃に惑星ができたことを示します——惑星形成は非常に早く始まったのです。',
    },
  },
  {
    q: {
      en: 'Why is a rocky planet in the habitable zone not guaranteed to have liquid water or be habitable?',
      ja: 'なぜハビタブルゾーンにある岩石惑星が、液体の水を持つとも居住可能とも限らないのですか。',
    },
    options: [
      { en: 'Liquid water cannot exist on rock.', ja: '液体の水は岩の上に存在できない。' },
      { en: 'Actual surface temperature and habitability depend heavily on atmosphere and greenhouse effect (Venus vs. Earth).', ja: '実際の表面温度と居住可能性は、大気と温室効果に大きく依存する（金星対地球）。' },
      { en: 'Planets in the habitable zone feel no gravity.', ja: 'ハビタブルゾーンの惑星は重力を感じない。' },
      { en: 'Stars in habitable zones emit no visible light.', ja: 'ハビタブルゾーンの星は可視光を出さない。' },
    ],
    answer: 1,
    explain: {
      en: 'The habitable zone sets the distance, but atmosphere and greenhouse decide the real temperature — a runaway greenhouse made Venus uninhabitable.',
      ja: 'ハビタブルゾーンは距離を定めますが、大気と温室効果が実際の温度を決めます——暴走温室効果が金星を居住不能にしました。',
    },
  },
];

export default { easy, medium, hard };
