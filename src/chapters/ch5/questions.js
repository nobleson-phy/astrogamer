const easy = [
  {
    q: {
      en: 'Which scientist unified the rules governing electricity and magnetism into a single coherent theory?',
      ja: '電気と磁気を支配する法則を、単一の首尾一貫した理論にまとめ上げた科学者は誰ですか。',
    },
    options: [
      { en: 'Isaac Newton', ja: 'アイザック・ニュートン' },
      { en: 'Johannes Kepler', ja: 'ヨハネス・ケプラー' },
      { en: 'James Clerk Maxwell', ja: 'ジェームズ・クラーク・マクスウェル' },
      { en: 'Tycho Brahe', ja: 'ティコ・ブラーエ' },
    ],
    answer: 2,
    explain: {
      en: 'James Clerk Maxwell combined the laws of electricity and magnetism into one unified theory of electromagnetism.',
      ja: 'ジェームズ・クラーク・マクスウェルは、電気と磁気の法則を統一した電磁気学の理論にまとめ上げました。',
    },
  },
  {
    q: {
      en: 'The horizontal length covered by one full cycle of a wave is known as the:',
      ja: '波の1周期分がカバーする水平方向の長さを何と呼びますか。',
    },
    options: [
      { en: 'Frequency', ja: '振動数' },
      { en: 'Wavelength', ja: '波長' },
      { en: 'Amplitude', ja: '振幅' },
      { en: 'Energy flux', ja: 'エネルギー流束' },
    ],
    answer: 1,
    explain: {
      en: 'The wavelength is the distance covered by one complete cycle of a wave.',
      ja: '波長とは、波の1周期分がカバーする距離のことです。',
    },
  },
  {
    q: {
      en: 'The mnemonic used to remember the main colors of visible light from longest to shortest wavelength is:',
      ja: '可視光の主な色を、波長の長いものから短いものへと覚えるための語呂合わせはどれですか。',
    },
    options: [
      { en: 'BIV G YOR', ja: 'BIV G YOR' },
      { en: 'ROY G BIV', ja: 'ROY G BIV' },
      { en: 'VIB G YOR', ja: 'VIB G YOR' },
      { en: 'GOR B YIV', ja: 'GOR B YIV' },
    ],
    answer: 1,
    explain: {
      en: 'ROY G BIV lists the visible colors from longest (red) to shortest (violet) wavelength.',
      ja: 'ROY G BIV は、可視光の色を波長の長い赤から短い紫まで順に並べたものです。',
    },
  },
  {
    q: {
      en: 'What is the term for a discrete unit or "packet" of electromagnetic energy?',
      ja: '電磁エネルギーの離散的な単位、すなわち「かたまり」を表す用語はどれですか。',
    },
    options: [
      { en: 'Electron', ja: '電子' },
      { en: 'Proton', ja: '陽子' },
      { en: 'Photon', ja: '光子' },
      { en: 'Neutron', ja: '中性子' },
    ],
    answer: 2,
    explain: {
      en: 'A photon is a discrete packet of electromagnetic energy.',
      ja: '光子は、電磁エネルギーの離散的なかたまり（粒子）です。',
    },
  },
  {
    q: {
      en: 'According to the inverse square law, if you stand twice as far from a light source, the light will appear:',
      ja: '逆二乗の法則によれば、光源から2倍離れて立つと、光はどのように見えますか。',
    },
    options: [
      { en: 'Two times fainter', ja: '2倍暗く' },
      { en: 'Four times fainter', ja: '4倍暗く' },
      { en: 'Ten times fainter', ja: '10倍暗く' },
      { en: 'The same brightness', ja: '同じ明るさのまま' },
    ],
    answer: 1,
    explain: {
      en: 'By the inverse square law, doubling the distance makes the light appear four times (2²) fainter.',
      ja: '逆二乗の法則により、距離が2倍になると光は4倍（2の2乗）暗く見えます。',
    },
  },
  {
    q: {
      en: 'Which category of electromagnetic radiation has the shortest wavelengths (no longer than 0.01 nanometer)?',
      ja: '電磁放射のうち、最も波長が短い（0.01ナノメートル以下の）区分はどれですか。',
    },
    options: [
      { en: 'X-rays', ja: 'X線' },
      { en: 'Ultraviolet', ja: '紫外線' },
      { en: 'Gamma rays', ja: 'ガンマ線' },
      { en: 'Radio waves', ja: '電波' },
    ],
    answer: 2,
    explain: {
      en: 'Gamma rays have the shortest wavelengths of all electromagnetic radiation, no longer than about 0.01 nanometer.',
      ja: 'ガンマ線はすべての電磁放射の中で最も波長が短く、約0.01ナノメートル以下です。',
    },
  },
  {
    q: {
      en: 'Most ultraviolet radiation from space is blocked by which component of Earth’s atmosphere?',
      ja: '宇宙からの紫外線の大部分は、地球大気のどの成分によってさえぎられますか。',
    },
    options: [
      { en: 'Nitrogen', ja: '窒素' },
      { en: 'Ozone layer', ja: 'オゾン層' },
      { en: 'Carbon dioxide', ja: '二酸化炭素' },
      { en: 'Water vapor', ja: '水蒸気' },
    ],
    answer: 1,
    explain: {
      en: 'The ozone layer absorbs most of the ultraviolet radiation arriving from space.',
      ja: 'オゾン層は、宇宙から届く紫外線の大部分を吸収します。',
    },
  },
  {
    q: {
      en: 'An idealized object that absorbs all electromagnetic energy that falls onto it is called a:',
      ja: '当たったすべての電磁エネルギーを吸収する理想化された物体を何と呼びますか。',
    },
    options: [
      { en: 'White dwarf', ja: '白色矮星' },
      { en: 'Blackbody', ja: '黒体' },
      { en: 'Quasar', ja: 'クエーサー' },
      { en: 'Pulsar', ja: 'パルサー' },
    ],
    answer: 1,
    explain: {
      en: 'A blackbody is an idealized object that absorbs all the electromagnetic energy falling on it.',
      ja: '黒体とは、当たったすべての電磁エネルギーを吸収する理想化された物体です。',
    },
  },
  {
    q: {
      en: 'Wien’s law states that the higher the temperature of a blackbody:',
      ja: 'ウィーンの法則によれば、黒体の温度が高いほど、どうなりますか。',
    },
    options: [
      { en: 'The longer the peak wavelength', ja: 'ピーク波長が長くなる' },
      { en: 'The shorter the peak wavelength', ja: 'ピーク波長が短くなる' },
      { en: 'The lower the total energy emitted', ja: '放出される総エネルギーが小さくなる' },
      { en: 'The lower the frequency of radiation', ja: '放射の振動数が低くなる' },
    ],
    answer: 1,
    explain: {
      en: 'By Wien’s law, a hotter blackbody radiates most strongly at a shorter peak wavelength.',
      ja: 'ウィーンの法則により、温度の高い黒体ほどピーク波長が短いところで最も強く放射します。',
    },
  },
  {
    q: {
      en: 'The Stefan-Boltzmann law states that the energy flux from a blackbody is proportional to what power of its absolute temperature?',
      ja: 'シュテファン・ボルツマンの法則によれば、黒体からのエネルギー流束は絶対温度の何乗に比例しますか。',
    },
    options: [
      { en: 'Second power', ja: '2乗' },
      { en: 'Third power', ja: '3乗' },
      { en: 'Fourth power', ja: '4乗' },
      { en: 'Tenth power', ja: '10乗' },
    ],
    answer: 2,
    explain: {
      en: 'The Stefan-Boltzmann law states that a blackbody’s energy flux is proportional to the fourth power of its absolute temperature.',
      ja: 'シュテファン・ボルツマンの法則では、黒体のエネルギー流束は絶対温度の4乗に比例します。',
    },
  },
  {
    q: {
      en: 'The bending of a light beam when it passes from one transparent material into another is called:',
      ja: '光線がある透明な物質から別の物質へ進むときに曲がる現象を何と呼びますか。',
    },
    options: [
      { en: 'Reflection', ja: '反射' },
      { en: 'Refraction', ja: '屈折' },
      { en: 'Dispersion', ja: '分散' },
      { en: 'Ionization', ja: '電離' },
    ],
    answer: 1,
    explain: {
      en: 'Refraction is the bending of light as it passes from one transparent medium into another.',
      ja: '屈折とは、光がある透明な媒質から別の媒質へ進むときに曲がる現象です。',
    },
  },
  {
    q: {
      en: 'A spectrum consisting of a pattern of dark lines superimposed upon a continuous spectrum is a(n):',
      ja: '連続スペクトルに暗線の模様が重なって現れるスペクトルを何と呼びますか。',
    },
    options: [
      { en: 'Emission spectrum', ja: '輝線スペクトル' },
      { en: 'Absorption spectrum', ja: '吸収スペクトル' },
      { en: 'Continuous spectrum', ja: '連続スペクトル' },
      { en: 'Discrete spectrum', ja: '離散スペクトル' },
    ],
    answer: 1,
    explain: {
      en: 'An absorption spectrum shows dark lines superimposed on an otherwise continuous spectrum.',
      ja: '吸収スペクトルは、連続スペクトルの上に暗線が重なって現れるものです。',
    },
  },
  {
    q: {
      en: 'Which subatomic particle is found outside the nucleus and carries a negative charge?',
      ja: '原子核の外側に存在し、負の電荷をもつ素粒子はどれですか。',
    },
    options: [
      { en: 'Proton', ja: '陽子' },
      { en: 'Neutron', ja: '中性子' },
      { en: 'Electron', ja: '電子' },
      { en: 'Positron', ja: '陽電子' },
    ],
    answer: 2,
    explain: {
      en: 'The electron lies outside the nucleus and carries a negative electric charge.',
      ja: '電子は原子核の外側にあり、負の電荷をもっています。',
    },
  },
  {
    q: {
      en: 'The process by which an atom gains or loses electrons is called:',
      ja: '原子が電子を得たり失ったりする過程を何と呼びますか。',
    },
    options: [
      { en: 'Excitation', ja: '励起' },
      { en: 'Dispersion', ja: '分散' },
      { en: 'Ionization', ja: '電離' },
      { en: 'Refraction', ja: '屈折' },
    ],
    answer: 2,
    explain: {
      en: 'Ionization is the process in which an atom gains or loses electrons and becomes charged.',
      ja: '電離とは、原子が電子を得たり失ったりして電荷をもつようになる過程です。',
    },
  },
  {
    q: {
      en: 'Motion toward or away from an observer along the line of sight is called:',
      ja: '観測者に対して視線方向に近づいたり遠ざかったりする運動を何と呼びますか。',
    },
    options: [
      { en: 'Proper motion', ja: '固有運動' },
      { en: 'Radial velocity', ja: '視線速度' },
      { en: 'Transverse velocity', ja: '接線速度' },
      { en: 'Space velocity', ja: '空間速度' },
    ],
    answer: 1,
    explain: {
      en: 'Radial velocity is the component of motion directly toward or away from the observer along the line of sight.',
      ja: '視線速度とは、観測者に対して視線方向に近づく、または遠ざかる運動の成分です。',
    },
  },
];

const medium = [
  {
    q: {
      en: 'If a star is moved to 10 times its present distance from Earth, how much fainter will it appear?',
      ja: 'ある星が地球からの現在の距離の10倍の位置に移されたら、どれくらい暗く見えますか。',
    },
    options: [
      { en: '10 times fainter', ja: '10倍暗く' },
      { en: '20 times fainter', ja: '20倍暗く' },
      { en: '100 times fainter', ja: '100倍暗く' },
      { en: '1,000 times fainter', ja: '1,000倍暗く' },
    ],
    answer: 2,
    explain: {
      en: 'By the inverse square law, increasing the distance tenfold makes the star appear 10² = 100 times fainter.',
      ja: '逆二乗の法則により、距離が10倍になると星は10の2乗、すなわち100倍暗く見えます。',
    },
  },
  {
    q: {
      en: 'Why is a blue star considered hotter than a red star?',
      ja: '青い星が赤い星よりも高温だとされるのはなぜですか。',
    },
    options: [
      { en: 'Blue light has a longer wavelength and less energy.', ja: '青い光は波長が長くエネルギーが小さいから。' },
      { en: 'Blue light has a shorter wavelength and higher energy.', ja: '青い光は波長が短くエネルギーが高いから。' },
      { en: 'Red light is only emitted by stars with very high pressures.', ja: '赤い光は非常に高い圧力の星からしか放出されないから。' },
      { en: 'Blue stars are moving away from us more quickly.', ja: '青い星は私たちからより速く遠ざかっているから。' },
    ],
    answer: 1,
    explain: {
      en: 'A blue star peaks at shorter, higher-energy wavelengths, which by Wien’s law indicates a higher temperature.',
      ja: '青い星は波長が短くエネルギーの高いところにピークをもち、ウィーンの法則によりこれは高温であることを示します。',
    },
  },
  {
    q: {
      en: 'If an astronomer observes a star’s spectral lines shifted toward the red end of the spectrum, what can they conclude?',
      ja: '天文学者がある星のスペクトル線がスペクトルの赤い側へずれているのを観測した場合、何が結論できますか。',
    },
    options: [
      { en: 'The star is moving toward Earth.', ja: 'その星は地球に近づいている。' },
      { en: 'The star is moving away from Earth.', ja: 'その星は地球から遠ざかっている。' },
      { en: 'The star is getting hotter.', ja: 'その星は高温になりつつある。' },
      { en: 'The star is composed entirely of hydrogen.', ja: 'その星は完全に水素でできている。' },
    ],
    answer: 1,
    explain: {
      en: 'A redshift of the spectral lines (Doppler effect) indicates the star is moving away from Earth.',
      ja: 'スペクトル線の赤方偏移（ドップラー効果）は、その星が地球から遠ざかっていることを示します。',
    },
  },
  {
    q: {
      en: 'Which of the following photons carries the most energy?',
      ja: '次の光子のうち、最も大きなエネルギーをもつのはどれですか。',
    },
    options: [
      { en: 'A low-frequency radio wave photon', ja: '低振動数の電波の光子' },
      { en: 'A visible red-light photon', ja: '可視光の赤い光子' },
      { en: 'A visible violet-light photon', ja: '可視光の紫の光子' },
      { en: 'A high-frequency X-ray photon', ja: '高振動数のX線の光子' },
    ],
    answer: 3,
    explain: {
      en: 'Photon energy increases with frequency, so the high-frequency X-ray photon carries the most energy.',
      ja: '光子のエネルギーは振動数とともに大きくなるため、高振動数のX線の光子が最も大きなエネルギーをもちます。',
    },
  },
  {
    q: {
      en: 'How can astronomers identify elements in a distant star using only its light?',
      ja: '天文学者は、遠くの星の光だけを使ってどのようにその星に含まれる元素を特定できますか。',
    },
    options: [
      { en: 'By measuring the star’s total luminosity', ja: '星の総光度を測ることによって' },
      { en: 'By matching the star’s unique pattern of spectral lines to known laboratory samples.', ja: '星に固有のスペクトル線の模様を、既知の実験室の試料と照合することによって' },
      { en: 'By observing the star’s proper motion across the sky.', ja: '星の天球上の固有運動を観測することによって' },
      { en: 'By measuring the star’s distance using parallax.', ja: '視差を用いて星の距離を測ることによって' },
    ],
    answer: 1,
    explain: {
      en: 'Each element produces a unique pattern of spectral lines, so matching those lines to laboratory samples identifies the element.',
      ja: '各元素は固有のスペクトル線の模様をつくるため、その線を実験室の試料と照合することで元素を特定できます。',
    },
  },
];

const hard = [
  {
    q: {
      en: 'Why is spectroscopy considered the "key" to modern astronomy?',
      ja: '分光学が現代天文学の「鍵」とされるのはなぜですか。',
    },
    options: [
      { en: 'It allows us to calculate the exact distance to any galaxy.', ja: 'どんな銀河までの正確な距離も計算できるから。' },
      { en: 'It allows us to "sample" stars and determine their chemical composition without visiting them.', ja: '星を訪れることなく「分析（サンプリング）」し、その化学組成を決定できるから。' },
      { en: 'It provides a way to make stars look closer than they actually are.', ja: '星を実際より近くに見せる方法を与えるから。' },
      { en: 'It is the only way to detect visible light from the Sun.', ja: '太陽からの可視光を検出する唯一の方法だから。' },
    ],
    answer: 1,
    explain: {
      en: 'Spectroscopy lets us "sample" distant stars from their light, revealing their chemical composition without ever visiting them.',
      ja: '分光学は星の光からその星を「分析」でき、訪れることなく化学組成を明らかにできます。',
    },
  },
  {
    q: {
      en: 'According to the Bohr model, how do atoms produce specific spectral lines?',
      ja: 'ボーアのモデルによれば、原子はどのようにして特定のスペクトル線をつくり出しますか。',
    },
    options: [
      { en: 'By protons colliding within the nucleus.', ja: '原子核内で陽子どうしが衝突することによって' },
      { en: 'By electrons jumping between specific permitted energy levels (orbits).', ja: '電子が特定の許されたエネルギー準位（軌道）の間を飛び移ることによって' },
      { en: 'By the atom vibrating at a constant speed in a vacuum.', ja: '原子が真空中で一定の速さで振動することによって' },
      { en: 'By the star’s magnetic field splitting the light into colors.', ja: '星の磁場が光を色に分けることによって' },
    ],
    answer: 1,
    explain: {
      en: 'In the Bohr model, electrons jumping between fixed permitted energy levels emit or absorb photons of specific wavelengths, creating spectral lines.',
      ja: 'ボーアのモデルでは、電子が決まった許されたエネルギー準位の間を飛び移る際に特定の波長の光子を放出・吸収し、スペクトル線を生じます。',
    },
  },
  {
    q: {
      en: 'Why must X-ray and gamma-ray astronomy be conducted using instruments in space?',
      ja: 'X線やガンマ線の天文学が、宇宙空間の観測装置を用いて行われなければならないのはなぜですか。',
    },
    options: [
      { en: 'These waves travel too slowly to reach Earth’s surface.', ja: 'これらの波は遅すぎて地表に届かないから。' },
      { en: 'Earth’s atmosphere absorbs these high-energy waves before they reach the ground.', ja: '地球の大気が、これらの高エネルギーの波が地表に届く前に吸収してしまうから。' },
      { en: 'These waves are only produced in a vacuum.', ja: 'これらの波は真空中でしか生じないから。' },
      { en: 'Ground-based telescopes are too small to detect them.', ja: '地上の望遠鏡は小さすぎて検出できないから。' },
    ],
    answer: 1,
    explain: {
      en: 'Earth’s atmosphere absorbs high-energy X-rays and gamma rays, so these must be observed with instruments above the atmosphere in space.',
      ja: '地球の大気は高エネルギーのX線やガンマ線を吸収するため、これらは大気の上、すなわち宇宙空間の装置で観測する必要があります。',
    },
  },
  {
    q: {
      en: 'How does the Doppler effect assist in measuring the radial velocity of stars?',
      ja: 'ドップラー効果は、星の視線速度を測るのにどのように役立ちますか。',
    },
    options: [
      { en: 'It measures the change in a star’s brightness over time.', ja: '星の明るさの時間変化を測る。' },
      { en: 'It detects the star’s rotation by the broadening of its spectral lines.', ja: 'スペクトル線の広がりから星の自転を検出する。' },
      { en: 'It measures the shift in wavelength of absorption lines compared to a stationary laboratory source.', ja: '静止した実験室の光源と比べた吸収線の波長のずれを測る。' },
      { en: 'It calculates the distance of the star based on its apparent color index.', ja: '見かけの色指数に基づいて星の距離を計算する。' },
    ],
    answer: 2,
    explain: {
      en: 'The Doppler effect shifts absorption lines from their laboratory wavelengths, and measuring that shift gives the star’s radial velocity.',
      ja: 'ドップラー効果は吸収線を実験室の波長からずらすため、そのずれを測ることで星の視線速度が求められます。',
    },
  },
  {
    q: {
      en: 'What is the evolutionary significance of identifying "ionized" elements in a stellar spectrum?',
      ja: '恒星スペクトル中に「電離した」元素を見つけることの、進化上の意義は何ですか。',
    },
    options: [
      { en: 'It proves the star is made of solid material.', ja: 'その星が固体物質でできていることを証明する。' },
      { en: 'It indicates the star is about to explode as a supernova.', ja: 'その星がまもなく超新星として爆発することを示す。' },
      { en: 'It serves as an indicator of the star’s temperature, as hotter stars ionize more atoms.', ja: '高温の星ほど多くの原子を電離させるため、星の温度の指標となる。' },
      { en: 'It shows the star has a high density of water vapor.', ja: 'その星に水蒸気が高密度で存在することを示す。' },
    ],
    answer: 2,
    explain: {
      en: 'Because hotter stars ionize more of their atoms, the presence of ionized elements serves as an indicator of a star’s temperature.',
      ja: '高温の星ほど多くの原子を電離させるため、電離した元素の存在は星の温度の指標となります。',
    },
  },
];

export default { easy, medium, hard };
