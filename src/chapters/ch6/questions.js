const easy = [
  {
    q: {
      en: 'What are the three basic components of a modern system for measuring radiation from astronomical sources?',
      ja: '天体からの放射を測定する現代的なシステムの3つの基本要素は何ですか。',
    },
    options: [
      { en: 'A telescope, a clock, and a magnifying lens', ja: '望遠鏡、時計、そして拡大レンズ' },
      { en: 'A telescope, a wavelength-sorting instrument, and a detector', ja: '望遠鏡、波長を分ける装置、そして検出器' },
      { en: 'A mirror, a prism, and a notebook', ja: '鏡、プリズム、そしてノート' },
      { en: 'A lens, a digital camera, and a stable mount', ja: 'レンズ、デジタルカメラ、そして安定した架台' },
    ],
    answer: 1,
    explain: {
      en: 'A modern measuring system consists of a telescope, a wavelength-sorting instrument, and a detector.',
      ja: '現代的な測定システムは、望遠鏡、波長を分ける装置、そして検出器から構成されます。',
    },
  },
  {
    q: {
      en: 'What is the most important function of a telescope?',
      ja: '望遠鏡の最も重要な機能は何ですか。',
    },
    options: [
      { en: 'To magnify images as much as possible', ja: 'できるだけ像を拡大すること' },
      { en: 'To provide a view for the human eye', ja: '人の目に見える映像を提供すること' },
      { en: 'To collect faint light and focus it into an image', ja: 'かすかな光を集めて像に結ぶこと' },
      { en: 'To predict the weather on distant planets', ja: '遠くの惑星の天気を予測すること' },
    ],
    answer: 2,
    explain: {
      en: 'A telescope’s most important job is to collect faint light and bring it to a focus to form an image.',
      ja: '望遠鏡の最も重要な役割は、かすかな光を集めて焦点に結び、像をつくることです。',
    },
  },
  {
    q: {
      en: 'What is the point where parallel rays of light are bent by a lens and brought together?',
      ja: '平行な光線がレンズによって曲げられ、一点に集められる点を何と呼びますか。',
    },
    options: [
      { en: 'Zenith', ja: '天頂' },
      { en: 'Aperture', ja: '口径（開口）' },
      { en: 'Focus', ja: '焦点' },
      { en: 'Focal length', ja: '焦点距離' },
    ],
    answer: 2,
    explain: {
      en: 'The focus is the point where a lens brings parallel rays of light together.',
      ja: '焦点とは、レンズが平行な光線を一点に集める点のことです。',
    },
  },
  {
    q: {
      en: 'A telescope that uses a lens as its primary optical element to form an image is a:',
      ja: '像を結ぶための主要な光学素子としてレンズを用いる望遠鏡を何と呼びますか。',
    },
    options: [
      { en: 'Reflector', ja: '反射望遠鏡' },
      { en: 'Refractor', ja: '屈折望遠鏡' },
      { en: 'Spectrometer', ja: '分光器' },
      { en: 'Interferometer', ja: '干渉計' },
    ],
    answer: 1,
    explain: {
      en: 'A refractor uses a lens as its main optical element to form an image.',
      ja: '屈折望遠鏡は、像を結ぶ主要な光学素子としてレンズを用います。',
    },
  },
  {
    q: {
      en: 'Who built the first successful reflecting telescope in 1668?',
      ja: '1668年に最初の実用的な反射望遠鏡を製作したのは誰ですか。',
    },
    options: [
      { en: 'Galileo Galilei', ja: 'ガリレオ・ガリレイ' },
      { en: 'Johannes Kepler', ja: 'ヨハネス・ケプラー' },
      { en: 'Isaac Newton', ja: 'アイザック・ニュートン' },
      { en: 'Hans Lippershey', ja: 'ハンス・リッペルスハイ' },
    ],
    answer: 2,
    explain: {
      en: 'Isaac Newton built the first successful reflecting telescope in 1668.',
      ja: 'アイザック・ニュートンは1668年に最初の実用的な反射望遠鏡を製作しました。',
    },
  },
  {
    q: {
      en: 'What is the primary cause of "chromatic aberration" in refracting telescopes?',
      ja: '屈折望遠鏡で生じる「色収差」の主な原因は何ですか。',
    },
    options: [
      { en: 'The mirror being too thin and sagging', ja: '鏡が薄すぎてたわむこと' },
      { en: 'Different wavelengths of light focusing at slightly different spots', ja: '波長の異なる光がわずかに異なる点に焦点を結ぶこと' },
      { en: 'Light pollution from nearby cities', ja: '近くの都市からの光害' },
      { en: 'Dust particles on the surface of the glass', ja: 'ガラス表面のほこりの粒子' },
    ],
    answer: 1,
    explain: {
      en: 'Chromatic aberration occurs because a lens focuses different wavelengths of light at slightly different points.',
      ja: '色収差は、レンズが波長の異なる光をわずかに異なる点に集めることで生じます。',
    },
  },
  {
    q: {
      en: 'In which focus arrangement is light reflected by a secondary mirror down through a hole in the primary mirror to an observing station below?',
      ja: '副鏡で反射した光が主鏡の穴を通って下方の観測位置へ導かれる焦点配置はどれですか。',
    },
    options: [
      { en: 'Prime focus', ja: '主焦点' },
      { en: 'Newtonian focus', ja: 'ニュートン焦点' },
      { en: 'Cassegrain focus', ja: 'カセグレン焦点' },
      { en: 'Nasmyth focus', ja: 'ナスミス焦点' },
    ],
    answer: 2,
    explain: {
      en: 'In the Cassegrain focus, a secondary mirror sends light down through a hole in the primary to an observing station behind it.',
      ja: 'カセグレン焦点では、副鏡が光を主鏡の穴を通して背後の観測位置へ導きます。',
    },
  },
  {
    q: {
      en: 'Astronomers use the term "bad seeing" to describe:',
      ja: '天文学者が「シーイングが悪い」という言葉で表すのは何ですか。',
    },
    options: [
      { en: 'Light pollution that hides faint stars', ja: 'かすかな星を隠す光害' },
      { en: 'Cloudy or rainy weather at an observatory site', ja: '観測所の曇りや雨の天気' },
      { en: 'Blurred images caused by turbulent air in the atmosphere', ja: '大気の乱れた空気によってぼやけた像' },
      { en: 'Dirt or scratches on the primary mirror', ja: '主鏡の汚れや傷' },
    ],
    answer: 2,
    explain: {
      en: '"Bad seeing" refers to blurring of images caused by turbulence in Earth’s atmosphere.',
      ja: '「シーイングが悪い」とは、地球大気の乱れによって像がぼやけることを指します。',
    },
  },
  {
    q: {
      en: 'What technology compensates for atmospheric blurring by changing the shape of a flexible mirror?',
      ja: '柔軟な鏡の形を変えることで大気によるぼやけを補正する技術は何ですか。',
    },
    options: [
      { en: 'Active control', ja: 'アクティブ制御' },
      { en: 'Adaptive optics', ja: '補償光学' },
      { en: 'Interferometry', ja: '干渉法' },
      { en: 'Spectroscopy', ja: '分光法' },
    ],
    answer: 1,
    explain: {
      en: 'Adaptive optics rapidly changes the shape of a flexible mirror to cancel out atmospheric blurring.',
      ja: '補償光学は、柔軟な鏡の形を高速で変化させて大気によるぼやけを打ち消します。',
    },
  },
  {
    q: {
      en: 'The highly efficient electronic detectors that have largely replaced photography are called:',
      ja: '写真に大きく取って代わった高効率の電子検出器を何と呼びますか。',
    },
    options: [
      { en: 'CCDs (Charge-coupled devices)', ja: 'CCD（電荷結合素子）' },
      { en: 'V2 Rockets', ja: 'V2ロケット' },
      { en: 'Spectrometers', ja: '分光器' },
      { en: 'Fiber optics', ja: '光ファイバー' },
    ],
    answer: 0,
    explain: {
      en: 'CCDs (charge-coupled devices) are the efficient electronic detectors that have largely replaced photographic film.',
      ja: 'CCD（電荷結合素子）は、写真フィルムに大きく取って代わった高効率の電子検出器です。',
    },
  },
  {
    q: {
      en: 'Why must infrared detectors be cooled near absolute zero with liquid helium?',
      ja: '赤外線検出器を液体ヘリウムで絶対零度近くまで冷やさなければならないのはなぜですか。',
    },
    options: [
      { en: 'To prevent the detector from melting under the telescope’s weight', ja: '望遠鏡の重みで検出器が溶けるのを防ぐため' },
      { en: 'To stop the detector from radiating its own infrared energy and swamping cosmic signals', ja: '検出器自身が赤外線を放射して宇宙からの信号を覆い隠すのを防ぐため' },
      { en: 'To increase the magnification of the telescope', ja: '望遠鏡の倍率を上げるため' },
      { en: 'To allow the detector to operate in the vacuum of space', ja: '検出器が宇宙の真空中で動作できるようにするため' },
    ],
    answer: 1,
    explain: {
      en: 'A warm detector radiates its own infrared energy, so it must be cooled near absolute zero to keep from swamping faint cosmic signals.',
      ja: '温かい検出器は自身の赤外線を放射するため、かすかな宇宙からの信号を覆い隠さないよう絶対零度近くまで冷やす必要があります。',
    },
  },
  {
    q: {
      en: 'Which instrument spreads light into its full rainbow of colors for detailed analysis?',
      ja: '光を虹のように全色に広げて詳しく分析する装置はどれですか。',
    },
    options: [
      { en: 'Eyepiece', ja: '接眼レンズ' },
      { en: 'Photometer', ja: '測光器' },
      { en: 'Spectrometer', ja: '分光器' },
      { en: 'Collimating lens', ja: 'コリメートレンズ' },
    ],
    answer: 2,
    explain: {
      en: 'A spectrometer spreads light into its full spectrum of colors so it can be analyzed in detail.',
      ja: '分光器は光をすべての色のスペクトルに広げ、詳しく分析できるようにします。',
    },
  },
  {
    q: {
      en: 'Linking two or more telescopes electronically to obtain much greater resolution is called:',
      ja: '2台以上の望遠鏡を電子的に結び、はるかに高い分解能を得ることを何と呼びますか。',
    },
    options: [
      { en: 'Active control', ja: 'アクティブ制御' },
      { en: 'Interferometry', ja: '干渉法' },
      { en: 'Radar astronomy', ja: 'レーダー天文学' },
      { en: 'High-energy observation', ja: '高エネルギー観測' },
    ],
    answer: 1,
    explain: {
      en: 'Interferometry links two or more telescopes electronically to achieve much higher resolution.',
      ja: '干渉法は、2台以上の望遠鏡を電子的に結んで、はるかに高い分解能を得る方法です。',
    },
  },
  {
    q: {
      en: 'Which space observatory, launched in 1990, had to be repaired by astronauts due to a manufacturing error in its mirror?',
      ja: '1990年に打ち上げられ、鏡の製造上の誤りのために宇宙飛行士による修理が必要となった宇宙望遠鏡はどれですか。',
    },
    options: [
      { en: 'James Webb Space Telescope', ja: 'ジェイムズ・ウェッブ宇宙望遠鏡' },
      { en: 'Hubble Space Telescope', ja: 'ハッブル宇宙望遠鏡' },
      { en: 'Spitzer Space Telescope', ja: 'スピッツァー宇宙望遠鏡' },
      { en: 'Chandra X-ray Observatory', ja: 'チャンドラX線観測衛星' },
    ],
    answer: 1,
    explain: {
      en: 'The Hubble Space Telescope, launched in 1990, had a flawed mirror that astronauts later corrected on a servicing mission.',
      ja: '1990年に打ち上げられたハッブル宇宙望遠鏡は鏡に欠陥があり、後に宇宙飛行士が修理ミッションで補正しました。',
    },
  },
  {
    q: {
      en: 'The James Webb Space Telescope (JWST) primarily observes in which part of the spectrum?',
      ja: 'ジェイムズ・ウェッブ宇宙望遠鏡（JWST）は主にスペクトルのどの領域を観測しますか。',
    },
    options: [
      { en: 'Ultraviolet', ja: '紫外線' },
      { en: 'X-ray', ja: 'X線' },
      { en: 'Visible light', ja: '可視光' },
      { en: 'Infrared', ja: '赤外線' },
    ],
    answer: 3,
    explain: {
      en: 'JWST is optimized to observe primarily in the infrared part of the spectrum.',
      ja: 'JWSTは主にスペクトルの赤外線領域を観測するように最適化されています。',
    },
  },
];

const medium = [
  {
    q: {
      en: 'If a telescope’s aperture diameter increases from 1 m to 4 m, how much more light can it collect?',
      ja: '望遠鏡の口径が1mから4mに大きくなると、集められる光の量はどれくらい増えますか。',
    },
    options: [
      { en: '2 times', ja: '2倍' },
      { en: '4 times', ja: '4倍' },
      { en: '8 times', ja: '8倍' },
      { en: '16 times', ja: '16倍' },
    ],
    answer: 3,
    explain: {
      en: 'Light-gathering power scales with the area (diameter squared), so a 4× larger diameter collects 4² = 16 times more light.',
      ja: '集光力は面積（直径の2乗）に比例するため、直径が4倍になると4の2乗、すなわち16倍の光を集められます。',
    },
  },
  {
    q: {
      en: 'Why do astronomers place infrared telescopes on isolated volcanic peaks or in space?',
      ja: '天文学者が赤外線望遠鏡を孤立した火山の頂上や宇宙に置くのはなぜですか。',
    },
    options: [
      { en: 'To be closer to the heat of the Sun', ja: '太陽の熱に近づくため' },
      { en: 'To get above most of the atmospheric water vapor that absorbs infrared waves', ja: '赤外線を吸収する大気中の水蒸気の大部分より上に出るため' },
      { en: 'Because telescopes are too heavy to be supported by continental landmasses', ja: '望遠鏡が重すぎて大陸の陸地では支えられないから' },
      { en: 'To avoid the gravitational pull of Earth’s crust', ja: '地殻の重力を避けるため' },
    ],
    answer: 1,
    explain: {
      en: 'Atmospheric water vapor absorbs infrared radiation, so infrared telescopes are placed high on dry peaks or in space to get above most of it.',
      ja: '大気中の水蒸気は赤外線を吸収するため、赤外線望遠鏡はその大部分より上に出られる乾燥した高い山頂や宇宙に置かれます。',
    },
  },
  {
    q: {
      en: 'A star twinkles from the ground but is steady from Earth orbit. What does this suggest about twinkling?',
      ja: '星は地上からは瞬いて見えますが、地球周回軌道からは安定して見えます。このことは瞬きについて何を示唆しますか。',
    },
    options: [
      { en: 'Stars physically pulse in brightness at a high rate', ja: '星が実際に高速で明るさを脈動させている' },
      { en: 'The vacuum of space magnifies starlight', ja: '宇宙の真空が星の光を拡大する' },
      { en: 'Earth’s atmosphere bends and twists light rays as they pass through turbulent air', ja: '地球の大気が、乱れた空気を通る光線を曲げたりねじったりしている' },
      { en: 'Telescopes in space are larger than those on the ground', ja: '宇宙の望遠鏡は地上のものより大きい' },
    ],
    answer: 2,
    explain: {
      en: 'Twinkling is caused by Earth’s turbulent atmosphere bending starlight; above the atmosphere the star appears steady.',
      ja: '瞬きは地球の乱れた大気が星の光を曲げることで生じ、大気の上では星は安定して見えます。',
    },
  },
  {
    q: {
      en: 'Why is a sturdy, stable mount one of the most critical elements of a telescope system?',
      ja: '頑丈で安定した架台が望遠鏡システムの最も重要な要素の一つであるのはなぜですか。',
    },
    options: [
      { en: 'It keeps the telescope from getting dirty', ja: '望遠鏡が汚れるのを防ぐため' },
      { en: 'It prevents small vibrations from moving the magnified object out of the tiny field of view', ja: 'わずかな振動で拡大された対象が小さな視野から外れるのを防ぐため' },
      { en: 'It allows the telescope to be moved by hand without motors', ja: 'モーターなしで手で望遠鏡を動かせるようにするため' },
      { en: 'It protects the primary lens from sagging due to gravity', ja: '主レンズが重力でたわむのを防ぐため' },
    ],
    answer: 1,
    explain: {
      en: 'Because the image is highly magnified, even tiny vibrations can shift the object out of the small field of view, so a stable mount is essential.',
      ja: '像は大きく拡大されるため、わずかな振動でも対象が小さな視野から外れてしまうので、安定した架台が不可欠です。',
    },
  },
  {
    q: {
      en: 'Professional astronomers rarely look through their research telescopes. Why?',
      ja: 'プロの天文学者が研究用望遠鏡をのぞくことがほとんどないのはなぜですか。',
    },
    options: [
      { en: 'Looking through a telescope is dangerous for human eyesight', ja: '望遠鏡をのぞくのは人の視力に危険だから' },
      { en: 'Digital detectors provide a permanent, more efficient, and more accurate record than the human eye', ja: 'デジタル検出器は人の目より恒久的で効率がよく、正確な記録を与えるから' },
      { en: 'Large telescopes do not have enough light to be seen by the eye', ja: '大型望遠鏡は目で見るには光が足りないから' },
      { en: 'Observations can only be made during the day', ja: '観測は昼間しかできないから' },
    ],
    answer: 1,
    explain: {
      en: 'Digital detectors record light permanently and far more efficiently and accurately than the human eye, so astronomers rely on them instead.',
      ja: 'デジタル検出器は光を恒久的に、そして人の目よりはるかに効率よく正確に記録するため、天文学者はそれを頼りにします。',
    },
  },
];

const hard = [
  {
    q: {
      en: 'What is the primary reason all modern large professional telescopes are reflectors, not refractors?',
      ja: '現代の大型のプロ用望遠鏡がすべて屈折式ではなく反射式である主な理由は何ですか。',
    },
    options: [
      { en: 'Lenses are easier to clean than mirrors', ja: 'レンズは鏡より掃除がしやすいから' },
      { en: 'Large lenses sag under their own weight and suffer from chromatic aberration', ja: '大きなレンズは自重でたわみ、色収差にも悩まされるから' },
      { en: 'Mirrors are better at magnifying distant objects', ja: '鏡のほうが遠くの対象をよく拡大できるから' },
      { en: 'Refracting telescopes cannot be used in space', ja: '屈折望遠鏡は宇宙では使えないから' },
    ],
    answer: 1,
    explain: {
      en: 'Large lenses sag under their own weight and produce chromatic aberration, so big professional telescopes use mirrors instead.',
      ja: '大きなレンズは自重でたわみ色収差も生じるため、大型のプロ用望遠鏡は代わりに鏡を用います。',
    },
  },
  {
    q: {
      en: 'What is the significance of the "baseline" in an interferometer array?',
      ja: '干渉計アレイにおける「基線」の意義は何ですか。',
    },
    options: [
      { en: 'It is the height of the telescope above sea level', ja: '海抜からの望遠鏡の高さのこと' },
      { en: 'It is the amount of electricity required to power the dishes', ja: 'アンテナに電力を供給するのに必要な電力量のこと' },
      { en: 'The separation distance between telescopes determines the resolution, mimicking a single giant dish', ja: '望遠鏡間の距離が分解能を決め、1台の巨大なアンテナのようにふるまわせること' },
      { en: 'It represents the smallest wavelength the telescope can detect', ja: '望遠鏡が検出できる最短波長を表すこと' },
    ],
    answer: 2,
    explain: {
      en: 'The baseline is the separation between telescopes, and it sets the resolution as if the array were one dish that large.',
      ja: '基線とは望遠鏡間の距離であり、アレイがその大きさの1台のアンテナであるかのような分解能を決めます。',
    },
  },
  {
    q: {
      en: 'The Hubble Ultra-Deep Field image is significant because it:',
      ja: 'ハッブル・ウルトラ・ディープ・フィールドの画像が重要なのはなぜですか。',
    },
    options: [
      { en: 'Proved there are no galaxies beyond the Milky Way', ja: '天の川銀河の外に銀河がないことを証明した' },
      { en: 'Captured views of approximately 10,000 galaxies from when the universe was very young', ja: '宇宙がごく若かった頃の約1万個の銀河の姿をとらえた' },
      { en: 'Was the first photograph ever taken of a black hole', ja: 'ブラックホールを撮影した史上初の写真だった' },
      { en: 'Showed the surfaces of planets orbiting Alpha Centauri', ja: 'アルファ・ケンタウリを周回する惑星の表面を示した' },
    ],
    answer: 1,
    explain: {
      en: 'The Hubble Ultra-Deep Field revealed about 10,000 galaxies as they were when the universe was very young.',
      ja: 'ハッブル・ウルトラ・ディープ・フィールドは、宇宙がごく若かった頃の約1万個の銀河の姿を明らかにしました。',
    },
  },
  {
    q: {
      en: 'How does JWST’s location (1.5 million km from Earth) support its mission better than low Earth orbit?',
      ja: 'JWSTの位置（地球から150万km）は、低地球軌道よりもどのように任務を支えていますか。',
    },
    options: [
      { en: 'It is close enough to be repaired by the ISS', ja: '国際宇宙ステーションで修理できるほど近いから' },
      { en: 'It provides a cold and stable environment necessary for its sensitive infrared instruments', ja: '高感度の赤外線装置に必要な、冷たく安定した環境を提供するから' },
      { en: 'It allows the telescope to land on the Moon to refuel', ja: '望遠鏡が月に着陸して燃料を補給できるから' },
      { en: 'It is far enough away to avoid the Sun’s gravity', ja: '太陽の重力を避けられるほど遠いから' },
    ],
    answer: 1,
    explain: {
      en: 'Being far from Earth keeps JWST cold and thermally stable, which is essential for its sensitive infrared instruments.',
      ja: '地球から遠いことでJWSTは冷たく熱的に安定に保たれ、これは高感度の赤外線装置に不可欠です。',
    },
  },
  {
    q: {
      en: 'The Vera Rubin Observatory is unique because it will:',
      ja: 'ベラ・ルービン天文台が独特なのはなぜですか。',
    },
    options: [
      { en: 'Use a single lens 30 meters in diameter', ja: '直径30メートルの単一のレンズを使う' },
      { en: 'Photograph the entire southern sky every few nights to make a "movie" of the universe', ja: '数晩ごとに南天全体を撮影し、宇宙の「動画」をつくる' },
      { en: 'Be the first telescope to use adaptive optics in space', ja: '宇宙で補償光学を使う最初の望遠鏡になる' },
      { en: 'Be built entirely out of dark matter', ja: '完全に暗黒物質でできている' },
    ],
    answer: 1,
    explain: {
      en: 'The Vera Rubin Observatory will repeatedly image the entire southern sky every few nights, effectively making a time-lapse "movie" of the universe.',
      ja: 'ベラ・ルービン天文台は数晩ごとに南天全体を繰り返し撮影し、事実上、宇宙のタイムラプス「動画」をつくります。',
    },
  },
];

export default { easy, medium, hard };
