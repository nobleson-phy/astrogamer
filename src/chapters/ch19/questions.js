const easy = [
  {
    q: {
      en: 'Which technique measures distances inside the solar system by timing how long a light-speed signal takes to reach a target and return?',
      ja: '光速の信号が目標に届いて戻る時間を計って、太陽系内の距離を測る技術はどれですか。',
    },
    options: [
      { en: 'Spectroscopic parallax', ja: '分光視差' },
      { en: 'Triangulation', ja: '三角測量' },
      { en: 'Radar ranging (radar timing)', ja: 'レーダー測距（レーダー計時）' },
      { en: 'Doppler shifting', ja: 'ドップラー偏移' },
    ],
    answer: 2,
    explain: {
      en: 'Radar ranging times how long a radar pulse takes to travel to a body and echo back at the speed of light.',
      ja: 'レーダー測距は、レーダーパルスが天体まで往復するのにかかる時間を光速で計ります。',
    },
  },
  {
    q: {
      en: 'What is the unit of distance equal to the average Earth–Sun distance (~150 million km)?',
      ja: '地球と太陽の平均距離（約1億5,000万km）に等しい距離の単位は何ですか。',
    },
    options: [
      { en: 'Light-year', ja: '光年' },
      { en: 'Astronomical Unit (AU)', ja: '天文単位（AU）' },
      { en: 'Parsec', ja: 'パーセク' },
      { en: 'Arcsecond', ja: '秒角' },
    ],
    answer: 1,
    explain: {
      en: 'One astronomical unit (AU) is the average Earth–Sun distance, about 150 million km.',
      ja: '1天文単位（AU）は地球と太陽の平均距離で、約1億5,000万kmです。',
    },
  },
  {
    q: {
      en: 'What is defined as half the total apparent angular shift of a nearby star against distant stars as Earth orbits the Sun?',
      ja: '地球が太陽を公転するときの、遠い星に対する近い星の見かけの角度の全変化の半分は、何と定義されますか。',
    },
    options: [
      { en: 'Proper motion', ja: '固有運動' },
      { en: 'Precession', ja: '歳差' },
      { en: 'Parallax', ja: '視差' },
      { en: 'Aberration', ja: '光行差' },
    ],
    answer: 2,
    explain: {
      en: 'Parallax is half the angle a nearby star appears to shift as seen from opposite sides of Earth’s orbit.',
      ja: '視差は、地球の軌道の反対側から見たときに近い星が動いて見える角度の半分です。',
    },
  },
  {
    q: {
      en: 'One parsec is defined as the distance to a star with a parallax of exactly:',
      ja: '1パーセクは、視差がちょうどいくつの星までの距離と定義されますか。',
    },
    options: [
      { en: '1 degree', ja: '1度' },
      { en: '1 arcminute', ja: '1分角' },
      { en: '1 arcsecond', ja: '1秒角' },
      { en: '1 Astronomical Unit', ja: '1天文単位' },
    ],
    answer: 2,
    explain: {
      en: 'A parsec is the distance at which a star shows a parallax of one arcsecond.',
      ja: 'パーセクは、星が1秒角の視差を示す距離です。',
    },
  },
  {
    q: {
      en: 'How many light-years are in one parsec?',
      ja: '1パーセクは何光年ですか。',
    },
    options: [
      { en: '1.00 light-year', ja: '1.00光年' },
      { en: '2.54 light-years', ja: '2.54光年' },
      { en: '3.26 light-years', ja: '3.26光年' },
      { en: '9.46 light-years', ja: '9.46光年' },
    ],
    answer: 2,
    explain: {
      en: 'One parsec equals about 3.26 light-years (206,265 AU).',
      ja: '1パーセクは約3.26光年（206,265 AU）です。',
    },
  },
  {
    q: {
      en: 'What is the nearest star system to the Sun, about 4.2–4.4 light-years away?',
      ja: '太陽に最も近い、約4.2〜4.4光年の恒星系は何ですか。',
    },
    options: [
      { en: 'Sirius', ja: 'シリウス' },
      { en: 'Alpha Centauri', ja: 'ケンタウルス座アルファ星' },
      { en: 'Vega', ja: 'ベガ' },
      { en: "Barnard's Star", ja: 'バーナード星' },
    ],
    answer: 1,
    explain: {
      en: 'Alpha Centauri is the nearest star system, about 4.2–4.4 light-years away.',
      ja: 'ケンタウルス座アルファ星は最も近い恒星系で、約4.2〜4.4光年の距離です。',
    },
  },
  {
    q: {
      en: 'Which faint red dwarf in the Alpha Centauri system is currently the single closest known star to Earth (4.25 ly)?',
      ja: 'ケンタウルス座アルファ星系で、現在地球に最も近い1つの星（4.25光年）である暗い赤色矮星はどれですか。',
    },
    options: [
      { en: 'Proxima Centauri', ja: 'プロキシマ・ケンタウリ' },
      { en: 'Alpha Centauri A', ja: 'ケンタウルス座アルファ星A' },
      { en: 'Luhman 16', ja: 'ルーマン16' },
      { en: "Barnard's Star", ja: 'バーナード星' },
    ],
    answer: 0,
    explain: {
      en: 'Proxima Centauri, a faint red dwarf, is the closest star to Earth at 4.25 light-years.',
      ja: 'プロキシマ・ケンタウリは暗い赤色矮星で、4.25光年で地球に最も近い星です。',
    },
  },
  {
    q: {
      en: 'Which ESA mission (launched 2013) succeeded Hipparcos and measured parallaxes for over a billion stars?',
      ja: 'ヒッパルコスを継ぎ、10億を超える星の視差を測ったESAのミッション（2013年打ち上げ）はどれですか。',
    },
    options: [
      { en: 'Kepler', ja: 'ケプラー' },
      { en: 'Gaia', ja: 'ガイア' },
      { en: 'Hubble', ja: 'ハッブル' },
      { en: 'Spitzer', ja: 'スピッツァー' },
    ],
    answer: 1,
    explain: {
      en: 'ESA’s Gaia mission measured high-precision parallaxes for more than a billion stars.',
      ja: 'ESAのガイア・ミッションは、10億を超える星の高精度な視差を測りました。',
    },
  },
  {
    q: {
      en: 'Who discovered the period-luminosity relation for Cepheid variable stars (1908–1912)?',
      ja: 'ケフェイド変光星の周期光度関係を発見した（1908〜1912年）のは誰ですか。',
    },
    options: [
      { en: 'Annie Jump Cannon', ja: 'アニー・ジャンプ・キャノン' },
      { en: 'Henrietta Swan Leavitt', ja: 'ヘンリエッタ・スワン・リービット' },
      { en: 'Cecilia Payne-Gaposchkin', ja: 'セシリア・ペイン＝ガポーシュキン' },
      { en: 'Williamina Fleming', ja: 'ウィリアミナ・フレミング' },
    ],
    answer: 1,
    explain: {
      en: 'Henrietta Swan Leavitt found that a Cepheid’s pulsation period tracks its intrinsic luminosity.',
      ja: 'ヘンリエッタ・スワン・リービットは、ケフェイドの脈動周期がその固有光度と対応することを発見しました。',
    },
  },
  {
    q: {
      en: 'RR Lyrae variables pulsate in under a day and all share roughly the same luminosity, about:',
      ja: 'RRライリ型変光星は1日未満で脈動し、みなほぼ同じ光度——およそいくつを持ちますか。',
    },
    options: [
      { en: '1 L☉', ja: '1 L☉' },
      { en: '50 L☉', ja: '50 L☉' },
      { en: '1,000 L☉', ja: '1,000 L☉' },
      { en: '10,000 L☉', ja: '10,000 L☉' },
    ],
    answer: 1,
    explain: {
      en: 'RR Lyrae stars all have about 50 times the Sun’s luminosity, making them useful standard candles.',
      ja: 'RRライリ型星はみな太陽の約50倍の光度を持ち、有用な標準光源になります。',
    },
  },
  {
    q: {
      en: 'Cepheids have longer periods (1–100 days) and are much brighter than RR Lyrae, reaching up to:',
      ja: 'ケフェイドはより長い周期（1〜100日）を持ちRRライリより明るく、最大でどれくらいに達しますか。',
    },
    options: [
      { en: '10 L☉', ja: '10 L☉' },
      { en: '100 L☉', ja: '100 L☉' },
      { en: '10,000 L☉', ja: '10,000 L☉' },
      { en: '1,000,000 L☉', ja: '1,000,000 L☉' },
    ],
    answer: 2,
    explain: {
      en: 'Cepheids are luminous pulsating giants, reaching up to about 10,000 times the Sun’s luminosity.',
      ja: 'ケフェイドは明るい脈動する巨星で、太陽の約1万倍の光度まで達します。',
    },
  },
  {
    q: {
      en: 'What are objects of well-known intrinsic luminosity, used to find distances by comparing that to apparent brightness, called?',
      ja: '固有光度がよく分かっており、それを見かけの明るさと比べて距離を求めるのに使う天体は何と呼ばれますか。',
    },
    options: [
      { en: 'Standard candles', ja: '標準光源（標準ろうそく）' },
      { en: 'Dark markers', ja: 'ダークマーカー' },
      { en: 'Spectroscopic proxies', ja: '分光代理指標' },
      { en: 'Triangulation anchors', ja: '三角測量の錨' },
    ],
    answer: 0,
    explain: {
      en: 'Standard candles have known luminosity, so comparing it to apparent brightness gives distance.',
      ja: '標準光源は光度が既知なので、見かけの明るさと比べると距離がわかります。',
    },
  },
  {
    q: {
      en: 'Placing a star on the H–R diagram from its spectral type and luminosity class to estimate its distance is called:',
      ja: '分光型と光度階級から星をH–R図に置いて距離を推定する手法は何と呼ばれますか。',
    },
    options: [
      { en: 'Trigonometric parallax', ja: '三角視差' },
      { en: 'Spectroscopic parallax', ja: '分光視差' },
      { en: 'Radar ranging', ja: 'レーダー測距' },
      { en: 'Stellar occultation', ja: '恒星の掩蔽' },
    ],
    answer: 1,
    explain: {
      en: 'Spectroscopic parallax reads a star’s spectrum to place it on the H–R diagram and infer luminosity and distance.',
      ja: '分光視差は星のスペクトルを読んでH–R図に置き、光度と距離を推定します。',
    },
  },
  {
    q: {
      en: 'Leavitt found the period-luminosity relation by studying Cepheids in which galaxy?',
      ja: 'リービットは、どの銀河のケフェイドを研究して周期光度関係を発見しましたか。',
    },
    options: [
      { en: 'The Andromeda Galaxy (M31)', ja: 'アンドロメダ銀河（M31）' },
      { en: 'The Small Magellanic Cloud (SMC)', ja: '小マゼラン雲（SMC）' },
      { en: 'The Milky Way bulge', ja: '天の川のバルジ' },
      { en: 'The Triangulum Galaxy (M33)', ja: '三角座銀河（M33）' },
    ],
    answer: 1,
    explain: {
      en: 'Leavitt studied Cepheids in the Small Magellanic Cloud, where all the stars are at nearly the same distance.',
      ja: 'リービットは小マゼラン雲のケフェイドを研究しました。そこの星はみなほぼ同じ距離にあります。',
    },
  },
  {
    q: {
      en: 'Who used Cepheids in "spiral nebulae" in the 1920s to prove they are separate galaxies far beyond the Milky Way?',
      ja: '1920年代に「渦巻星雲」のケフェイドを用いて、それらが天の川のはるか外の別の銀河だと証明したのは誰ですか。',
    },
    options: [
      { en: 'Harlow Shapley', ja: 'ハーロー・シャプレー' },
      { en: 'Ejnar Hertzsprung', ja: 'アイナー・ヘルツシュプルング' },
      { en: 'Edwin Hubble', ja: 'エドウィン・ハッブル' },
      { en: 'Jan Oort', ja: 'ヤン・オールト' },
    ],
    answer: 2,
    explain: {
      en: 'Edwin Hubble found Cepheids in spiral nebulae and showed they are distant, independent galaxies.',
      ja: 'エドウィン・ハッブルは渦巻星雲にケフェイドを見つけ、それらが遠方の独立した銀河であることを示しました。',
    },
  },
];

const medium = [
  {
    q: {
      en: 'A star has a trigonometric parallax of 0.1 arcseconds. What is its distance in parsecs?',
      ja: 'ある星の三角視差は0.1秒角です。パーセクでの距離はいくつですか。',
    },
    options: [
      { en: '0.1 pc', ja: '0.1 pc' },
      { en: '1 pc', ja: '1 pc' },
      { en: '10 pc', ja: '10 pc' },
      { en: '100 pc', ja: '100 pc' },
    ],
    answer: 2,
    explain: {
      en: 'Distance (pc) = 1 / parallax (″) = 1 / 0.1 = 10 parsecs.',
      ja: '距離（pc）= 1 / 視差（″）= 1 / 0.1 = 10パーセクです。',
    },
  },
  {
    q: {
      en: 'Why can’t radar signals be bounced off the Sun to measure the distance to the solar system’s center?',
      ja: 'なぜレーダー信号を太陽で反射させて、太陽系の中心までの距離を測れないのですか。',
    },
    options: [
      { en: 'The Sun is too far for radio waves to reach it.', ja: '太陽は電波が届かないほど遠いから。' },
      { en: 'The Sun’s hot, ionized gas absorbs and scatters radar without giving a clear echo.', ja: '太陽の高温で電離したガスがレーダーを吸収・散乱し、明瞭な反射を返さないから。' },
      { en: 'Solar gravity bends radar into orbit around the Sun.', ja: '太陽の重力がレーダーを太陽の周回軌道へ曲げるから。' },
      { en: 'Radar travels slower in space than in air.', ja: 'レーダーは空気中より宇宙で遅く進むから。' },
    ],
    answer: 1,
    explain: {
      en: 'The Sun has no solid surface; its ionized gas absorbs and scatters radar, so there is no clean echo to time.',
      ja: '太陽に固体表面はなく、電離ガスがレーダーを吸収・散乱するので、計測できる明瞭な反射がありません。',
    },
  },
  {
    q: {
      en: 'A distant Cepheid pulsates every 30 days; a nearby one every 3 days. What does the period-luminosity relation say?',
      ja: '遠方のケフェイドは30日ごと、近くのは3日ごとに脈動します。周期光度関係は何を告げますか。',
    },
    options: [
      { en: 'The 3-day Cepheid is 10× more luminous.', ja: '3日のケフェイドが10倍明るい。' },
      { en: 'The 30-day Cepheid has much higher intrinsic luminosity.', ja: '30日のケフェイドの方が固有光度がはるかに高い。' },
      { en: 'Both must have identical intrinsic luminosities.', ja: '両者の固有光度は同じはず。' },
      { en: 'The 30-day Cepheid must be a white dwarf.', ja: '30日のケフェイドは白色矮星のはず。' },
    ],
    answer: 1,
    explain: {
      en: 'Longer period means higher luminosity, so the 30-day Cepheid is intrinsically far brighter.',
      ja: '周期が長いほど光度が高いので、30日のケフェイドは本質的にはるかに明るいです。',
    },
  },
  {
    q: {
      en: 'Why do space observatories like Hipparcos and Gaia measure parallaxes far more precisely than ground telescopes?',
      ja: 'なぜヒッパルコスやガイアのような宇宙観測所は、地上望遠鏡よりはるかに精密に視差を測れるのですか。',
    },
    options: [
      { en: 'They are much closer to the stars.', ja: '星にずっと近いから。' },
      { en: 'Zero gravity keeps their mirrors from warping.', ja: '無重力が鏡の歪みを防ぐから。' },
      { en: 'They orbit above the atmosphere, eliminating the image-blurring of atmospheric turbulence.', ja: '大気の上を周回し、大気の乱れによる像のぼやけを取り除くから。' },
      { en: 'They use radio waves instead of visible light to measure angles.', ja: '角度の測定に可視光でなく電波を使うから。' },
    ],
    answer: 2,
    explain: {
      en: 'Above the atmosphere there is no "seeing" (turbulence blur), so angles can be measured to milli- and micro-arcseconds.',
      ja: '大気の上では「シーイング」（乱れによるぼやけ）がなく、角度をミリ秒角・マイクロ秒角まで測れます。',
    },
  },
  {
    q: {
      en: 'A main-sequence G2 star and a G2 supergiant have the same temperature and same apparent brightness. How do we know the supergiant is far more distant?',
      ja: '主系列のG2星とG2超巨星は、同じ温度で同じ見かけの明るさです。超巨星の方がはるかに遠いとどう分かりますか。',
    },
    options: [
      { en: 'The supergiant has wide, pressure-broadened lines.', ja: '超巨星は圧力で広がった太い線を持つ。' },
      { en: 'Its narrow lines reveal a low-density, high-luminosity supergiant (L ∝ R²T⁴), so it must be farther to look equally dim.', ja: 'その狭い線が低密度で高光度の超巨星（L ∝ R²T⁴）を明かすので、同じくらい暗く見えるにはより遠いはず。' },
      { en: 'It shows fast eclipses every few hours.', ja: '数時間ごとに速い食を示す。' },
      { en: 'The main-sequence star emits pure ultraviolet.', ja: '主系列星は純粋な紫外線を放つ。' },
    ],
    answer: 1,
    explain: {
      en: 'Narrow lines mark a supergiant of huge luminosity; to appear as faint as the dwarf, it must lie much farther away.',
      ja: '狭い線は巨大な光度の超巨星を示します。矮星と同じくらい暗く見えるには、はるかに遠くにあるはずです。',
    },
  },
];

const hard = [
  {
    q: {
      en: 'Why is the "cosmic distance ladder" fundamental to astronomy?',
      ja: 'なぜ「宇宙の距離はしご」は天文学の基礎なのですか。',
    },
    options: [
      { en: 'One technique works at all scales without any calibration.', ja: '1つの技術が校正なしにあらゆるスケールで通用するから。' },
      { en: 'Parallax reaches only nearby stars, so each further step (variable stars, spectroscopic parallax) must be calibrated by the closer method before it.', ja: '視差は近い星にしか届かないので、より遠い各段階（変光星・分光視差）は、その前の近い方法で校正されねばならないから。' },
      { en: 'Cosmic expansion creates physical rungs light must climb.', ja: '宇宙膨張が光の登る物理的な段を作るから。' },
      { en: 'Distances are measured with ropes between spacecraft.', ja: '距離は宇宙船の間のロープで測られるから。' },
    ],
    answer: 1,
    explain: {
      en: 'Each rung reaches farther but must be calibrated on the rung below it, starting from direct parallax.',
      ja: '各段はより遠くに届きますが、直接の視差から始めて、下の段で校正されねばなりません。',
    },
  },
  {
    q: {
      en: 'Why was studying Cepheids in the Small Magellanic Cloud crucial for finding the period-luminosity relation?',
      ja: 'なぜ小マゼラン雲のケフェイドを研究することが、周期光度関係の発見に決定的だったのですか。',
    },
    options: [
      { en: 'SMC stars feel no gravity, so their periods are constant.', ja: 'SMCの星は重力を感じず、周期が一定だから。' },
      { en: 'All SMC stars are at nearly the same distance, so differences in apparent brightness reflect differences in true luminosity.', ja: 'SMCの星はみなほぼ同じ距離にあるので、見かけの明るさの違いが真の光度の違いを反映するから。' },
      { en: 'The SMC has no dust, removing all reddening.', ja: 'SMCには塵がなく、赤化がすべて消えるから。' },
      { en: 'Milky Way Cepheids don’t pulsate regularly.', ja: '天の川のケフェイドは規則的に脈動しないから。' },
    ],
    answer: 1,
    explain: {
      en: 'Because the SMC is far and compact, its stars share a distance, so apparent-brightness differences are luminosity differences.',
      ja: 'SMCは遠くてコンパクトなので星は距離を共有し、見かけの明るさの違いがそのまま光度の違いになります。',
    },
  },
  {
    q: {
      en: 'How did Harlow Shapley use RR Lyrae stars in globular clusters to size the Milky Way and locate the Sun off-center?',
      ja: 'ハーロー・シャプレーは、球状星団のRRライリ型星をどう使って天の川の大きさを測り、太陽が中心から外れていることを突き止めましたか。',
    },
    options: [
      { en: 'By measuring each cluster’s parallax from the ground.', ja: '各星団の視差を地上から測って。' },
      { en: 'By treating RR Lyrae as standard candles, finding cluster distances, and mapping their 3D distribution around the Galactic center.', ja: 'RRライリを標準光源として扱い、星団の距離を求め、銀河中心のまわりの3次元分布を地図化して。' },
      { en: 'By timing radar echoes off globular clusters.', ja: '球状星団からのレーダー反射を計って。' },
      { en: 'By measuring the Doppler shift of central dark nebulae.', ja: '中心の暗黒星雲のドップラー偏移を測って。' },
    ],
    answer: 1,
    explain: {
      en: 'RR Lyrae standard candles gave cluster distances; their lopsided 3D distribution showed the Galactic center lies far off in Sagittarius.',
      ja: 'RRライリの標準光源が星団の距離を与え、その偏った3次元分布が、銀河中心がいて座の方向のはるか彼方にあることを示しました。',
    },
  },
  {
    q: {
      en: 'What is the key advantage of trigonometric parallax over indirect methods like spectroscopic parallax or variable stars?',
      ja: '三角視差の、分光視差や変光星のような間接的方法に対する重要な利点は何ですか。',
    },
    options: [
      { en: 'It depends on assumptions about stellar atmospheres.', ja: '恒星大気についての仮定に依存する。' },
      { en: 'It is a direct geometric measurement depending only on Earth’s orbital baseline and geometry — no assumptions about a star’s structure or luminosity.', ja: '地球の軌道の基線と幾何学だけに依る直接の幾何学的測定で——星の構造や光度についての仮定が要らない。' },
      { en: 'It works for galaxies billions of light-years away.', ja: '数十億光年先の銀河にも通用する。' },
      { en: 'It can be measured in a single night.', ja: '一晩で測定できる。' },
    ],
    answer: 1,
    explain: {
      en: 'Parallax uses pure geometry (d = 1/P) and Earth’s orbit, so it needs no model of the star — the ladder’s trustworthy first rung.',
      ja: '視差は純粋な幾何学（d = 1/P）と地球の軌道を使うので、星のモデルが要りません——はしごの信頼できる最初の段です。',
    },
  },
  {
    q: {
      en: 'Why did Hubble’s 1923 discovery of a Cepheid in the Andromeda "Nebula" settle the Great Debate?',
      ja: 'なぜハッブルの1923年のアンドロメダ「星雲」でのケフェイド発見が「大論争」に決着をつけたのですか。',
    },
    options: [
      { en: 'It proved Andromeda is a small gas cloud inside our solar neighborhood.', ja: 'アンドロメダが太陽の近所にある小さなガス雲だと証明した。' },
      { en: 'Using the period-luminosity relation, he found M31 lies nearly a million light-years away — far beyond the Milky Way — proving it is a separate galaxy.', ja: '周期光度関係を使い、M31が約100万光年——天の川のはるか外——にあると求め、別の銀河であることを証明した。' },
      { en: 'It showed Andromeda moving toward Earth at relativistic speed.', ja: 'アンドロメダが相対論的速度で地球へ近づいていると示した。' },
      { en: 'It proved Andromeda is made of brown dwarfs and dark matter.', ja: 'アンドロメダが褐色矮星と暗黒物質でできていると証明した。' },
    ],
    answer: 1,
    explain: {
      en: 'The Cepheid gave M31 a distance of ~1 million light-years, far outside the Milky Way — it is an "island universe," a galaxy of its own.',
      ja: 'そのケフェイドがM31に約100万光年の距離を与え、天の川のはるか外——それ自体が「島宇宙」、独立した銀河だと示しました。',
    },
  },
];

export default { easy, medium, hard };
