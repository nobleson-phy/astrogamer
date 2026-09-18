const easy = [
  {
    q: {
      en: 'What unit of distance, about 9.5 trillion kilometers, do astronomers use for distances to stars?',
      ja: '恒星までの距離に天文学者が使う、約9.5兆キロメートルの距離の単位は何ですか。',
    },
    options: [
      { en: 'Astronomical Unit (AU)', ja: '天文単位（AU）' },
      { en: 'Light-year', ja: '光年' },
      { en: 'Parsec', ja: 'パーセク' },
      { en: 'Megameter', ja: 'メガメートル' },
    ],
    answer: 1,
    explain: {
      en: 'A light-year is the distance light travels in one year — about 9.5 trillion km.',
      ja: '光年は光が1年で進む距離——約9.5兆kmです。',
    },
  },
  {
    q: {
      en: 'In the local neighborhood (within 21 light-years of the Sun), which stars are by far the most abundant?',
      ja: '太陽の近傍（21光年以内）で、圧倒的に多い星はどれですか。',
    },
    options: [
      { en: 'Hot, luminous O and B main-sequence stars', ja: '高温で明るいO型・B型の主系列星' },
      { en: 'Yellow G-type stars like the Sun', ja: '太陽のような黄色いG型星' },
      { en: 'Cool, low-mass M-type red dwarfs', ja: '低温で低質量のM型赤色矮星' },
      { en: 'Red supergiant stars', ja: '赤色超巨星' },
    ],
    answer: 2,
    explain: {
      en: 'Cool, low-mass M red dwarfs vastly outnumber all other kinds of star in our neighborhood.',
      ja: '低温で低質量のM型赤色矮星が、近傍の他のどの種類の星よりも圧倒的に多いです。',
    },
  },
  {
    q: {
      en: 'Of the 20 brightest-appearing stars in the night sky, how many actually lie within 26 light-years of the Sun?',
      ja: '夜空で最も明るく見える20の星のうち、実際に太陽から26光年以内にあるのは何個ですか。',
    },
    options: [
      { en: 'All 20', ja: '20個すべて' },
      { en: '15', ja: '15個' },
      { en: 'Only 6', ja: 'わずか6個' },
      { en: 'None', ja: '0個' },
    ],
    answer: 2,
    explain: {
      en: 'Only 6 of the 20 brightest-appearing stars are nearby; the rest are distant, very luminous giants and supergiants.',
      ja: '最も明るく見える20の星のうち近いのは6個だけで、残りは遠方の非常に明るい巨星・超巨星です。',
    },
  },
  {
    q: {
      en: 'About what fraction of stars exist in gravitationally bound binary or multiple systems?',
      ja: '重力で結ばれた連星や多重星系にある星は、およそどれくらいの割合ですか。',
    },
    options: [
      { en: 'About 10%', ja: '約10%' },
      { en: 'About 25%', ja: '約25%' },
      { en: 'About 50%', ja: '約50%' },
      { en: 'Nearly 99%', ja: 'ほぼ99%' },
    ],
    answer: 2,
    explain: {
      en: 'About half of all stars are members of binary or multiple star systems.',
      ja: 'すべての星のおよそ半分が、連星や多重星系の一員です。',
    },
  },
  {
    q: {
      en: 'What kind of binary is one whose two stars can be seen and resolved separately in a telescope?',
      ja: '2つの星を望遠鏡で別々に見分けられる連星は何と呼ばれますか。',
    },
    options: [
      { en: 'Spectroscopic binary', ja: '分光連星' },
      { en: 'Visual binary', ja: '実視連星' },
      { en: 'Astrometric binary', ja: '位置天文連星' },
      { en: 'Eclipsing binary', ja: '食連星' },
    ],
    answer: 1,
    explain: {
      en: 'In a visual binary, both stars are separately visible through a telescope.',
      ja: '実視連星では、両方の星が望遠鏡で別々に見えます。',
    },
  },
  {
    q: {
      en: 'How are the two stars of a spectroscopic binary detected when they can’t be seen apart?',
      ja: '別々に見えない分光連星の2つの星は、どうやって検出されますか。',
    },
    options: [
      { en: 'By periodic eclipses in the total light', ja: '全体の光の周期的な食で' },
      { en: 'By alternating Doppler shifts in their spectral lines', ja: 'スペクトル線の交互のドップラー偏移で' },
      { en: 'By X-ray bursts from their surfaces', ja: '表面からのX線バーストで' },
      { en: 'By tracking the system’s position across the sky', ja: '系の空での位置を追跡して' },
    ],
    answer: 1,
    explain: {
      en: 'As the stars orbit, their line-of-sight motion produces alternating blue- and red-shifts in the spectral lines.',
      ja: '星が公転すると、その視線方向の運動がスペクトル線に交互の青方偏移と赤方偏移を生みます。',
    },
  },
  {
    q: {
      en: 'Which modified form of Kepler’s third law gives the sum of two stars’ masses in a binary?',
      ja: '連星の2つの星の質量の和を与える、ケプラーの第三法則の修正形はどれですか。',
    },
    options: [
      { en: 'D³ = (M₁ + M₂) P²', ja: 'D³ = (M₁ + M₂) P²' },
      { en: 'F = G(M₁M₂) / D²', ja: 'F = G(M₁M₂) / D²' },
      { en: 'L = M⁴', ja: 'L = M⁴' },
      { en: 'P² = a³ / (M₁ × M₂)', ja: 'P² = a³ / (M₁ × M₂)' },
    ],
    answer: 0,
    explain: {
      en: 'Newton’s form, D³ = (M₁ + M₂)P², relates separation (AU) and period (yr) to the total mass (in solar masses).',
      ja: 'ニュートンの形 D³ = (M₁ + M₂)P² は、間隔（AU）と周期（年）を総質量（太陽質量）に結びつけます。',
    },
  },
  {
    q: {
      en: 'What is the minimum mass a protostar needs to sustain hydrogen fusion and become a true star?',
      ja: '原始星が水素融合を維持して本物の星になるのに必要な最小質量はどれくらいですか。',
    },
    options: [
      { en: '1/100 of the Sun’s mass', ja: '太陽質量の1/100' },
      { en: '1/12 of the Sun’s mass (~0.075 M☉)', ja: '太陽質量の1/12（約0.075 M☉）' },
      { en: '1/2 of the Sun’s mass', ja: '太陽質量の1/2' },
      { en: '1.4 times the Sun’s mass', ja: '太陽質量の1.4倍' },
    ],
    answer: 1,
    explain: {
      en: 'Below about 1/12 M☉ (~0.075 M☉), the core never gets hot enough to fuse hydrogen.',
      ja: 'およそ1/12 M☉（約0.075 M☉）未満では、核が水素を融合するほど熱くなりません。',
    },
  },
  {
    q: {
      en: 'What are substellar objects of 13–80 Jupiter masses (1/100–1/12 M☉) that can’t sustain proton fusion called?',
      ja: '木星質量の13〜80倍（1/100〜1/12 M☉）で、陽子融合を維持できない亜恒星天体は何と呼ばれますか。',
    },
    options: [
      { en: 'Red dwarfs', ja: '赤色矮星' },
      { en: 'White dwarfs', ja: '白色矮星' },
      { en: 'Brown dwarfs', ja: '褐色矮星' },
      { en: 'Planetesimals', ja: '微惑星' },
    ],
    answer: 2,
    explain: {
      en: 'Brown dwarfs bridge planets and stars — too light for sustained hydrogen fusion.',
      ja: '褐色矮星は惑星と星の橋渡し——持続的な水素融合には軽すぎます。',
    },
  },
  {
    q: {
      en: 'For main-sequence stars, how does luminosity (L) scale with mass (M)?',
      ja: '主系列星では、光度（L）は質量（M）とどう変わりますか。',
    },
    options: [
      { en: 'L ∝ 1/M (inverse)', ja: 'L ∝ 1/M（反比例）' },
      { en: 'L ∝ M (linear)', ja: 'L ∝ M（線形）' },
      { en: 'L ∝ M⁴ (fourth power)', ja: 'L ∝ M⁴（4乗）' },
      { en: 'L ∝ √M (square root)', ja: 'L ∝ √M（平方根）' },
    ],
    answer: 2,
    explain: {
      en: 'The mass-luminosity relation is roughly L ∝ M⁴: double the mass and luminosity rises about 16-fold.',
      ja: '質量光度関係はおよそ L ∝ M⁴：質量が2倍なら光度は約16倍になります。',
    },
  },
  {
    q: {
      en: 'Which technique measures a star’s diameter by timing how long a body takes to block its light?',
      ja: '天体が星の光を遮る時間を計って星の直径を測る技術はどれですか。',
    },
    options: [
      { en: 'Spectroscopic parallax', ja: '分光視差' },
      { en: 'Lunar occultation', ja: '月による掩蔽' },
      { en: 'Trigonometric parallax', ja: '三角視差' },
      { en: 'Doppler broadening', ja: 'ドップラー広がり' },
    ],
    answer: 1,
    explain: {
      en: 'Timing how long the Moon’s edge takes to cover a star (a lunar occultation) gives its angular — and linear — diameter.',
      ja: '月の縁が星を覆う時間を計る（月による掩蔽）ことで、その角直径と実直径がわかります。',
    },
  },
  {
    q: {
      en: 'How are the axes of a standard Hertzsprung–Russell (H–R) diagram oriented?',
      ja: '標準的なヘルツシュプルング・ラッセル（H–R）図の軸はどう向いていますか。',
    },
    options: [
      { en: 'Temperature increases to the left; luminosity increases upward', ja: '温度は左へ増え、光度は上へ増える' },
      { en: 'Temperature increases to the right; luminosity increases upward', ja: '温度は右へ増え、光度は上へ増える' },
      { en: 'Temperature increases upward; luminosity increases to the right', ja: '温度は上へ増え、光度は右へ増える' },
      { en: 'Temperature increases to the left; luminosity increases downward', ja: '温度は左へ増え、光度は下へ増える' },
    ],
    answer: 0,
    explain: {
      en: 'By convention, hotter stars are on the left and more luminous stars are toward the top.',
      ja: '慣例として、高温の星は左、より明るい星は上に置かれます。',
    },
  },
  {
    q: {
      en: 'What percentage of true stars in our region lie along the Main Sequence of the H–R diagram?',
      ja: '私たちの領域の本物の星のうち、H–R図の主系列に沿っているのは何％ですか。',
    },
    options: [
      { en: '10%', ja: '10%' },
      { en: '50%', ja: '50%' },
      { en: '75%', ja: '75%' },
      { en: '90%', ja: '90%' },
    ],
    answer: 3,
    explain: {
      en: 'About 90% of true stars lie on the main sequence.',
      ja: '本物の星のおよそ90%が主系列にあります。',
    },
  },
  {
    q: {
      en: 'What single property mainly sets a main-sequence star’s temperature, radius, luminosity, and H–R position?',
      ja: '主系列星の温度・半径・光度・H–R図での位置を主に決める唯一の性質は何ですか。',
    },
    options: [
      { en: 'Chemical composition', ja: '化学組成' },
      { en: 'Rotation rate', ja: '自転速度' },
      { en: 'Mass', ja: '質量' },
      { en: 'Age', ja: '年齢' },
    ],
    answer: 2,
    explain: {
      en: 'Mass is the master property: it fixes a main-sequence star’s temperature, size, luminosity, and place on the H–R diagram.',
      ja: '質量が支配的な性質です：主系列星の温度・大きさ・光度・H–R図での位置を決めます。',
    },
  },
  {
    q: {
      en: 'How big is a typical white dwarf compared to solar-system bodies?',
      ja: '典型的な白色矮星は、太陽系の天体と比べてどれくらいの大きさですか。',
    },
    options: [
      { en: 'Roughly the diameter of the Sun', ja: 'おおよそ太陽の直径' },
      { en: 'Roughly the size of Mercury’s orbit', ja: 'おおよそ水星の軌道の大きさ' },
      { en: 'Roughly the size of planet Earth', ja: 'おおよそ地球ほどの大きさ' },
      { en: 'Roughly the size of an asteroid', ja: 'おおよそ小惑星ほどの大きさ' },
    ],
    answer: 2,
    explain: {
      en: 'A white dwarf packs about half a solar mass into a volume roughly the size of Earth.',
      ja: '白色矮星は、およそ太陽半分の質量を地球ほどの体積に詰め込んでいます。',
    },
  },
];

const medium = [
  {
    q: {
      en: 'Using L ∝ M⁴, if Star A has 3 times the mass of Star B, how much more luminous is Star A?',
      ja: 'L ∝ M⁴ を使い、A星がB星の3倍の質量なら、A星は何倍明るいですか。',
    },
    options: [
      { en: '3 times', ja: '3倍' },
      { en: '9 times', ja: '9倍' },
      { en: '12 times', ja: '12倍' },
      { en: '81 times', ja: '81倍' },
    ],
    answer: 3,
    explain: {
      en: 'L ∝ M⁴, so 3⁴ = 81 times as luminous.',
      ja: 'L ∝ M⁴ なので、3⁴ = 81倍明るくなります。',
    },
  },
  {
    q: {
      en: 'Why do white dwarfs sit in the lower-left of the H–R diagram (hot but low total luminosity)?',
      ja: '白色矮星がH–R図の左下（高温だが総光度が低い）にあるのはなぜですか。',
    },
    options: [
      { en: 'Thick dust clouds absorb 99% of their light.', ja: '厚い塵の雲が光の99%を吸収するから。' },
      { en: 'They are very hot per square meter, but their Earth-sized radii give them tiny surface areas.', ja: '1平方メートルあたりは非常に高温だが、地球ほどの半径で表面積が極めて小さいから。' },
      { en: 'They make energy by fission, not fusion.', ja: '核融合ではなく核分裂でエネルギーを作るから。' },
      { en: 'They emit almost all their energy as radio waves.', ja: 'エネルギーのほぼすべてを電波で放つから。' },
    ],
    answer: 1,
    explain: {
      en: 'Luminosity = area × σT⁴; a white dwarf’s huge temperature can’t offset its tiny Earth-sized surface, so total output is low.',
      ja: '光度＝面積×σT⁴。白色矮星の高温でも、地球ほどの小さな表面を補えず、総出力は低くなります。',
    },
  },
  {
    q: {
      en: 'In an eclipsing binary, how do astronomers find the actual diameters of the two stars?',
      ja: '食連星で、天文学者は2つの星の実際の直径をどう求めますか。',
    },
    options: [
      { en: 'From the gravitational redshift of their lines.', ja: '線の重力赤方偏移から。' },
      { en: 'By combining orbital velocities (from Doppler shifts) with the eclipse durations on the light curve.', ja: '（ドップラー偏移からの）公転速度と、光度曲線の食の継続時間を組み合わせて。' },
      { en: 'By measuring the system’s angular diameter with magnification.', ja: '拡大して系の角直径を測って。' },
      { en: 'By applying Wien’s law to the pair’s brightness.', ja: '対の明るさにウィーンの法則を当てはめて。' },
    ],
    answer: 1,
    explain: {
      en: 'Diameter = velocity × eclipse time: the Doppler velocity times how long each eclipse lasts gives the stars’ sizes.',
      ja: '直径＝速度×食の時間：ドップラー速度に各食の継続時間を掛けると、星の大きさが得られます。',
    },
  },
  {
    q: {
      en: 'Why do visual binaries usually have long periods (years–centuries) while spectroscopic binaries have short ones (days–weeks)?',
      ja: 'なぜ実視連星は普通長周期（数年〜数世紀）で、分光連星は短周期（数日〜数週間）なのですか。',
    },
    options: [
      { en: 'Visual binaries are white dwarfs; spectroscopic ones are supergiants.', ja: '実視連星は白色矮星、分光連星は超巨星だから。' },
      { en: 'Visual binaries must be widely separated to resolve (large orbits, long periods); spectroscopic ones must be close for high speeds and measurable Doppler shifts.', ja: '実視連星は分解するため大きく離れねばならず（大きな軌道・長周期）、分光連星は高速で測れるドップラー偏移を出すため近くねばならないから。' },
      { en: 'Visual binaries orbit in non-Newtonian gravity.', ja: '実視連星は非ニュートン重力で公転するから。' },
      { en: 'Spectroscopic binaries lose mass and speed up.', ja: '分光連星は質量を失って加速するから。' },
    ],
    answer: 1,
    explain: {
      en: 'Wide separation (to resolve) means large, slow orbits; close separation (to see Doppler shifts) means fast, short orbits.',
      ja: '（分解するため）大きく離れると軌道は大きく遅く、（ドップラー偏移を見るため）近いと軌道は速く短くなります。',
    },
  },
  {
    q: {
      en: 'Why are brown dwarfs hard to find in sky surveys compared with main-sequence stars?',
      ja: '主系列星に比べ、褐色矮星が探査で見つけにくいのはなぜですか。',
    },
    options: [
      { en: 'They move at relativistic speeds.', ja: '相対論的な速さで動くから。' },
      { en: 'With no sustained hydrogen fusion they are very cool and radiate 10,000–1,000,000× less than the Sun, mostly in the infrared.', ja: '持続的な水素融合がなく非常に低温で、太陽の1万〜100万分の1しか放射せず、大半が赤外線だから。' },
      { en: 'They only exist near black holes.', ja: 'ブラックホールの近くにしか存在しないから。' },
      { en: 'Their light is fully polarized by magnetic fields.', ja: '光が磁場で完全に偏光するから。' },
    ],
    answer: 1,
    explain: {
      en: 'Brown dwarfs are faint and cool, emitting mostly infrared — 10⁴–10⁶ times dimmer than the Sun and easy to miss.',
      ja: '褐色矮星は暗く低温で、主に赤外線を放ち——太陽より1万〜100万倍暗く、見逃されやすいです。',
    },
  },
];

const hard = [
  {
    q: {
      en: 'What fact about stellar lifespans explains why ~90% of stars are found on the Main Sequence?',
      ja: '星の寿命についてのどの事実が、約90%の星が主系列にある理由を説明しますか。',
    },
    options: [
      { en: 'Stars are born on the main sequence and die the instant they leave it.', ja: '星は主系列で生まれ、離れた瞬間に死ぬ。' },
      { en: 'Stars spend about 90% of their active lives stably fusing hydrogen into helium in their cores.', ja: '星は活動的な生涯の約90%を、核で安定に水素をヘリウムに融合して過ごす。' },
      { en: 'Main-sequence stars feel no gravity, so they can’t evolve.', ja: '主系列星は重力を感じないので進化できない。' },
      { en: 'Fusion happens only in main-sequence stars.', ja: '核融合は主系列星でしか起きない。' },
    ],
    answer: 1,
    explain: {
      en: 'Core hydrogen fusion is by far the longest phase, so at any moment most stars are caught in it — on the main sequence.',
      ja: '核の水素融合が圧倒的に長い段階なので、どの瞬間もほとんどの星はその最中——主系列にあります。',
    },
  },
  {
    q: {
      en: 'How does comparing the 20 brightest stars with a census within 21 light-years reveal a "selection effect"?',
      ja: '最も明るい20の星と21光年以内の census を比べることは、どのように「選択効果」を明かしますか。',
    },
    options: [
      { en: 'The brightest stars are an unbiased sample of average stars.', ja: '最も明るい星は平均的な星の偏りのない標本である。' },
      { en: 'The 20 brightest are rare, very luminous distant giants/supergiants, while the local census shows typical stars are dim, low-mass red dwarfs.', ja: '最も明るい20は、まれで非常に明るい遠方の巨星・超巨星だが、近傍の census は典型的な星が暗く低質量の赤色矮星だと示す。' },
      { en: 'Local stars are brighter because dust dims distant ones to red dwarfs.', ja: '塵が遠くの星を赤色矮星に暗くするので、近傍の星の方が明るい。' },
      { en: 'Bright stars only exist near the solar system.', ja: '明るい星は太陽系の近くにしか存在しない。' },
    ],
    answer: 1,
    explain: {
      en: 'Picking the brightest-appearing stars over-samples rare luminous giants; the true population is dominated by faint red dwarfs.',
      ja: '最も明るく見える星を選ぶと、まれな明るい巨星を過剰に拾います。真の集団は暗い赤色矮星が支配しています。',
    },
  },
  {
    q: {
      en: 'In an eclipsing binary of a small hot star and a large cool star, why is the deeper (primary) dip when the hot star is hidden?',
      ja: '小さく高温の星と大きく低温の星の食連星で、高温の星が隠れるときの落ち込み（主極小）が深いのはなぜですか。',
    },
    options: [
      { en: 'The small star blocks all the large star’s gravity.', ja: '小さい星が大きい星の重力をすべて遮るから。' },
      { en: 'The hotter star emits far more energy per unit area, so hiding its high-flux surface removes more of the total light.', ja: '高温の星は単位面積あたりはるかに多くのエネルギーを放つので、その高フラックスの表面を隠すと総光量がより多く減るから。' },
      { en: 'The cool star turns the hot star’s photons into radio waves.', ja: '低温の星が高温の星の光子を電波に変えるから。' },
      { en: 'The hot star reflects sunlight away during eclipse.', ja: '高温の星が食の間、日光を反射してそらすから。' },
    ],
    answer: 1,
    explain: {
      en: 'Dip depth tracks the surface brightness (flux) hidden; blocking the hot, high-flux star removes the most light — the primary minimum.',
      ja: '落ち込みの深さは隠れた表面の明るさ（フラックス）に対応します。高温で高フラックスの星を隠すと最も多くの光が減り、主極小になります。',
    },
  },
  {
    q: {
      en: 'How do white dwarfs reach densities over 300,000 g/cm³ (a teaspoon weighs over 1.5 tons)?',
      ja: '白色矮星はどうやって300,000 g/cm³超（小さじ一杯が1.5トン超）の密度に達しますか。',
    },
    options: [
      { en: 'They absorb dark matter from the interstellar medium.', ja: '星間物質から暗黒物質を吸収するから。' },
      { en: 'After fusion stops, gravity collapses about half a solar mass into an Earth-sized volume (halted by electron degeneracy).', ja: '融合が止まった後、重力が約太陽半分の質量を地球ほどの体積に潰す（電子縮退が食い止める）から。' },
      { en: 'They are made of solid lead and gold made in their atmospheres.', ja: '大気で作られた固体の鉛と金でできているから。' },
      { en: 'Strong magnetic fields compress their atoms into liquid water.', ja: '強い磁場が原子を液体の水に圧縮するから。' },
    ],
    answer: 1,
    explain: {
      en: 'With fusion gone, gravity crushes ~½ M☉ into an Earth-sized ball, halted only by electron degeneracy pressure — hence the huge density.',
      ja: '融合がなくなると重力が約½ M☉を地球ほどの球に潰し、電子縮退圧だけがそれを止めます——だから密度が巨大になります。',
    },
  },
  {
    q: {
      en: 'How does L ∝ M⁴ explain why massive stars live much shorter lives than low-mass stars?',
      ja: 'L ∝ M⁴ は、大質量星が低質量星よりずっと短命な理由をどう説明しますか。',
    },
    options: [
      { en: 'Massive stars have less hydrogen fuel than low-mass stars.', ja: '大質量星は低質量星より水素燃料が少ないから。' },
      { en: 'Though a massive star has more fuel, its luminosity scales as M⁴, so it burns fuel far faster (lifetime ∝ 1/M³).', ja: '大質量星は燃料が多いが、光度がM⁴に比例するため、はるかに速く燃料を消費する（寿命 ∝ 1/M³）から。' },
      { en: 'Massive stars shed 99% of their mass in flares within a million years.', ja: '大質量星は100万年以内にフレアで質量の99%を失うから。' },
      { en: 'Low-mass stars fuse helium, which burns slower.', ja: '低質量星はよりゆっくり燃えるヘリウムを融合するから。' },
    ],
    answer: 1,
    explain: {
      en: 'Lifetime ≈ fuel / rate = M / M⁴ = 1/M³: a 10× more massive star shines ~10,000× brighter and lives ~1/1000 as long.',
      ja: '寿命 ≈ 燃料 / 消費率 = M / M⁴ = 1/M³：質量10倍の星は約1万倍明るく、寿命は約1/1000です。',
    },
  },
];

export default { easy, medium, hard };
