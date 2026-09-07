const easy = [
  {
    q: {
      en: 'What are the three main compositional classes of asteroids found in our solar system?',
      ja: '太陽系で見つかる小惑星の主要な3つの組成クラスは何ですか。',
    },
    options: [
      { en: 'Silicate, Carbonaceous, and Metallic (S-type, C-type, M-type)', ja: 'ケイ酸塩・炭素質・金属（S型・C型・M型）' },
      { en: 'Ice, Rock, and Gas', ja: '氷・岩石・ガス' },
      { en: 'Basaltic, Granitic, and Carbonate', ja: '玄武岩質・花崗岩質・炭酸塩' },
      { en: 'Primitive, Differentiated, and Jovian', ja: '始原的・分化・木星型' },
    ],
    answer: 0,
    explain: {
      en: 'Asteroids fall mainly into silicate (S-type), carbonaceous (C-type), and metallic (M-type) compositional classes.',
      ja: '小惑星は主に、ケイ酸塩（S型）・炭素質（C型）・金属（M型）の組成クラスに分かれます。',
    },
  },
  {
    q: {
      en: 'Which asteroid is the largest in the solar system, features the 92-km Occator crater with bright salt deposits, and hosts the 4-km ice-volcanic intrusion Ahuna Mons?',
      ja: '太陽系最大の小惑星で、明るい塩の堆積を持つ幅92 kmのオッカトルクレーターがあり、高さ4 kmの氷火山の貫入アフナ山を持つのはどれですか。',
    },
    options: [
      { en: 'Vesta', ja: 'ベスタ' },
      { en: 'Ceres', ja: 'ケレス' },
      { en: 'Ida', ja: 'イダ' },
      { en: 'Eros', ja: 'エロス' },
    ],
    answer: 1,
    explain: {
      en: 'Ceres is the largest asteroid, with the salt-bright Occator crater and the ice-volcanic dome Ahuna Mons.',
      ja: 'ケレスは最大の小惑星で、塩で明るいオッカトルクレーターと氷火山のドーム、アフナ山を持ちます。',
    },
  },
  {
    q: {
      en: 'What were the first three asteroids successfully photographed during spacecraft flybys?',
      ja: '探査機の接近通過で初めて撮影に成功した3つの小惑星はどれですか。',
    },
    options: [
      { en: 'Ceres, Vesta, and Eros', ja: 'ケレス・ベスタ・エロス' },
      { en: 'Toutatis, Chiron, and Pholus', ja: 'トータティス・キロン・フォルス' },
      { en: 'Gaspra, Ida, and Mathilde', ja: 'ガスプラ・イダ・マチルド' },
      { en: 'Halley, Tempel, and Borrelly', ja: 'ハレー・テンペル・ボレリー' },
    ],
    answer: 2,
    explain: {
      en: 'Gaspra, Ida, and Mathilde were the first asteroids imaged up close by passing spacecraft.',
      ja: 'ガスプラ・イダ・マチルドが、通過する探査機によって初めて間近で撮影された小惑星です。',
    },
  },
  {
    q: {
      en: 'In 1908, a massive atmospheric explosion flattened hundreds of square kilometers of forest over which unpopulated Siberian river valley?',
      ja: '1908年、大規模な大気中の爆発が、無人のシベリアのどの川の谷の上で数百平方キロメートルの森林をなぎ倒しましたか。',
    },
    options: [
      { en: 'Yenisei River', ja: 'エニセイ川' },
      { en: 'Chelyabinsk River', ja: 'チェリャビンスク川' },
      { en: 'Tunguska River', ja: 'ツングースカ川' },
      { en: 'Ob River', ja: 'オビ川' },
    ],
    answer: 2,
    explain: {
      en: 'The 1908 Tunguska event flattened hundreds of square kilometers of Siberian forest with an airburst explosion.',
      ja: '1908年のツングースカ事件は、空中爆発によってシベリアの森林数百平方キロメートルをなぎ倒しました。',
    },
  },
  {
    q: {
      en: 'Which NASA survey was organized to discover and catalog 90% or more of Near-Earth Asteroids (NEAs) larger than 1 km?',
      ja: '直径1 kmより大きい地球近傍小惑星（NEA）の90%以上を発見・目録化するために組織されたNASAの探索計画はどれですか。',
    },
    options: [
      { en: 'Spaceguard Survey', ja: 'スペースガード・サーベイ' },
      { en: 'Sentinel Project', ja: 'センチネル計画' },
      { en: 'Voyager Search', ja: 'ボイジャー探索' },
      { en: 'Near-Earth Tracking (NET)', ja: '地球近傍追跡（NET）' },
    ],
    answer: 0,
    explain: {
      en: 'The Spaceguard Survey was organized to find and catalog 90%+ of near-Earth asteroids larger than 1 km.',
      ja: 'スペースガード・サーベイは、1 kmより大きい地球近傍小惑星の90%以上を発見・目録化するために組織されました。',
    },
  },
  {
    q: {
      en: "The bluish ion tail of a comet is composed of gas that is ionized and pushed straight back from the Sun by what force?",
      ja: '彗星の青みがかったイオンの尾は、電離したガスが何によって太陽から真後ろへ押されてできますか。',
    },
    options: [
      { en: 'Gravity of the outer planets', ja: '外惑星の重力' },
      { en: 'Solar wind', ja: '太陽風' },
      { en: 'Radiation pressure of sunlight', ja: '太陽光の放射圧' },
      { en: 'Thermal expansion', ja: '熱膨張' },
    ],
    answer: 1,
    explain: {
      en: 'The ion tail is ionized gas pushed straight back by the solar wind; the dust tail instead curves under radiation pressure.',
      ja: 'イオンの尾は太陽風によって真後ろへ押される電離ガスで、塵の尾は放射圧で湾曲します。',
    },
  },
  {
    q: {
      en: 'Who used historical records to calculate cometary orbits and successfully predicted the return of the comet that now bears his name?',
      ja: '歴史的な記録を用いて彗星の軌道を計算し、今その名を冠する彗星の回帰を予言したのは誰ですか。',
    },
    options: [
      { en: 'Isaac Newton', ja: 'アイザック・ニュートン' },
      { en: 'Edmund Halley', ja: 'エドモンド・ハレー' },
      { en: 'Maarten Schmidt', ja: 'マールテン・シュミット' },
      { en: 'David Levy', ja: 'デイビッド・レビー' },
    ],
    answer: 1,
    explain: {
      en: 'Edmund Halley calculated cometary orbits from historical records and predicted the return of Halley’s Comet.',
      ja: 'エドモンド・ハレーは歴史的記録から彗星の軌道を計算し、ハレー彗星の回帰を予言しました。',
    },
  },
  {
    q: {
      en: 'Which ESA mission orbited a comet and deployed the Philae lander onto Comet 67P/Churyumov-Gerasimenko?',
      ja: '彗星を周回し、着陸機フィラエを彗星67P／チュリュモフ・ゲラシメンコに投下したESAのミッションはどれですか。',
    },
    options: [
      { en: 'Galileo', ja: 'ガリレオ' },
      { en: 'Voyager', ja: 'ボイジャー' },
      { en: 'NEAR-Shoemaker', ja: 'ニア・シューメーカー' },
      { en: 'Rosetta', ja: 'ロゼッタ' },
    ],
    answer: 3,
    explain: {
      en: 'ESA’s Rosetta orbited Comet 67P and deployed the Philae lander onto its surface.',
      ja: 'ESAのロゼッタは彗星67Pを周回し、着陸機フィラエをその表面に投下しました。',
    },
  },
  {
    q: {
      en: 'What name is given to objects orbiting among the giant planets (such as Chiron and Pholus) that show properties of both comets and asteroids?',
      ja: '巨大惑星の間を公転し（キロンやフォルスなど）、彗星と小惑星の両方の性質を示す天体は何と呼ばれますか。',
    },
    options: [
      { en: 'Trojans', ja: 'トロヤ群' },
      { en: 'Centaurs', ja: 'ケンタウルス族' },
      { en: 'Near-Earth Objects', ja: '地球近傍天体' },
      { en: 'Trans-Neptunian Objects', ja: '海王星以遠天体' },
    ],
    answer: 1,
    explain: {
      en: 'Centaurs orbit among the giant planets and show a mix of comet-like and asteroid-like properties.',
      ja: 'ケンタウルス族は巨大惑星の間を公転し、彗星的・小惑星的な性質を併せ持ちます。',
    },
  },
  {
    q: {
      en: 'Which object has the reddest surface of any body in the solar system, hinting at a strange, unique surface composition?',
      ja: '太陽系のどの天体よりも赤い表面を持ち、奇妙で独特な表面組成をうかがわせる天体はどれですか。',
    },
    options: [
      { en: 'Mars', ja: '火星' },
      { en: 'Pholus', ja: 'フォルス' },
      { en: 'Pluto', ja: '冥王星' },
      { en: 'Vesta', ja: 'ベスタ' },
    ],
    answer: 1,
    explain: {
      en: 'The centaur Pholus has the reddest known surface in the solar system, reflecting an unusual composition.',
      ja: 'ケンタウルス族のフォルスは太陽系で最も赤い表面を持ち、異常な組成を反映しています。',
    },
  },
  {
    q: {
      en: 'Where is the Kuiper belt located, and what is its general shape?',
      ja: 'カイパーベルトはどこにあり、その全体の形はどのようなものですか。',
    },
    options: [
      { en: 'A spherical shell of comets extending up to 50,000 AU from the Sun', ja: '太陽から5万AUまで広がる、彗星の球殻' },
      { en: 'A disk-shaped region of ice-and-rock planetesimals beyond the orbit of Neptune', ja: '海王星の軌道の外にある、氷と岩の微惑星の円盤状の領域' },
      { en: 'A narrow ring of rocky debris between the orbits of Mars and Jupiter', ja: '火星と木星の軌道の間にある、岩石片の狭い環' },
      { en: "A cloud of metallic asteroids leading and following Jupiter's orbit", ja: '木星の軌道を先導・追随する金属小惑星の雲' },
    ],
    answer: 1,
    explain: {
      en: 'The Kuiper belt is a disk-shaped region of icy-rocky planetesimals lying beyond Neptune’s orbit.',
      ja: 'カイパーベルトは、海王星の軌道の外にある、氷と岩の微惑星の円盤状の領域です。',
    },
  },
  {
    q: {
      en: 'The spherical reservoir of billions of cometary bodies extending tens of thousands of AU into space is known as:',
      ja: '数十億の彗星状天体が数万AUまで広がる球状の貯蔵庫は何と呼ばれますか。',
    },
    options: [
      { en: 'The asteroid belt', ja: '小惑星帯' },
      { en: 'The Kuiper belt', ja: 'カイパーベルト' },
      { en: 'The Oort cloud', ja: 'オールトの雲' },
      { en: 'The Trojan clouds', ja: 'トロヤ雲' },
    ],
    answer: 2,
    explain: {
      en: 'The Oort cloud is the spherical shell of billions of comets extending tens of thousands of AU from the Sun.',
      ja: 'オールトの雲は、太陽から数万AUまで広がる数十億の彗星の球状の殻です。',
    },
  },
  {
    q: {
      en: 'Which rare, basaltic-rich asteroid carries volcanic minerals on its surface, showing it was geologically differentiated early on?',
      ja: '表面に火山性の鉱物を持ち、初期に地質的に分化したことを示す、まれな玄武岩質に富む小惑星はどれですか。',
    },
    options: [
      { en: 'Mathilde', ja: 'マチルド' },
      { en: 'Gaspra', ja: 'ガスプラ' },
      { en: 'Ida', ja: 'イダ' },
      { en: 'Vesta', ja: 'ベスタ' },
    ],
    answer: 3,
    explain: {
      en: 'Vesta’s basaltic, volcanic surface minerals show it differentiated (melted and layered) early in its history.',
      ja: 'ベスタの玄武岩質で火山性の表面鉱物は、その初期に分化（融解して層状化）したことを示します。',
    },
  },
  {
    q: {
      en: 'What is the typical diameter of the solid nucleus of a standard comet?',
      ja: '標準的な彗星の固体の核の典型的な直径はどれくらいですか。',
    },
    options: [
      { en: 'A few meters across', ja: '数メートル' },
      { en: 'A few kilometers across', ja: '数キロメートル' },
      { en: 'Hundreds of kilometers across', ja: '数百キロメートル' },
      { en: 'Larger than the planet Mercury', ja: '惑星の水星より大きい' },
    ],
    answer: 1,
    explain: {
      en: 'A typical comet nucleus is only a few kilometers across — the coma and tails it produces are far larger.',
      ja: '典型的な彗星の核はわずか数キロメートルで、生じるコマや尾ははるかに大きくなります。',
    },
  },
  {
    q: {
      en: 'Which 5-km-long Near-Earth Asteroid had its irregular, lumpy, contact-binary shape mapped by radar during its 1992 close approach?',
      ja: '1992年の接近時にレーダーで、不規則でごつごつした接触連星の形が地図化された、長さ5 kmの地球近傍小惑星はどれですか。',
    },
    options: [
      { en: 'Toutatis', ja: 'トータティス' },
      { en: 'Eros', ja: 'エロス' },
      { en: 'Gaspra', ja: 'ガスプラ' },
      { en: 'Ceres', ja: 'ケレス' },
    ],
    answer: 0,
    explain: {
      en: 'Radar mapped Toutatis during its 1992 close approach, revealing its lumpy, contact-binary shape.',
      ja: '1992年の接近時にレーダーがトータティスを地図化し、ごつごつした接触連星の形を明らかにしました。',
    },
  },
];

const medium = [
  {
    q: {
      en: 'Why do astronomers use the cratering record of the airless Moon to estimate the population of Earth-approaching asteroids, rather than counting craters on Earth?',
      ja: '天文学者が地球接近小惑星の数を見積もるのに、地球のクレーターを数えるのではなく、空気のない月のクレーター記録を使うのはなぜですか。',
    },
    options: [
      { en: 'The Moon experiences ten times more meteor strikes than Earth.', ja: '月は地球の10倍の隕石衝突を受けるから。' },
      { en: "Earth's weathering, erosion, and plate tectonics rapidly erase craters, while the Moon preserves its bombardment history.", ja: '地球の風化・侵食・プレートテクトニクスがクレーターを急速に消すのに対し、月は衝突の歴史を保つから。' },
      { en: 'The Moon’s gravity selectively attracts larger, more dangerous asteroids.', ja: '月の重力が、より大きく危険な小惑星を選択的に引き寄せるから。' },
      { en: 'Earth’s atmosphere blocks and vaporizes all incoming asteroids.', ja: '地球の大気が飛来する小惑星をすべて遮り蒸発させるから。' },
    ],
    answer: 1,
    explain: {
      en: 'Earth’s geology erases craters quickly; the airless Moon preserves the full bombardment record instead.',
      ja: '地球の地質はクレーターを素早く消しますが、空気のない月は衝突記録を完全に保存します。',
    },
  },
  {
    q: {
      en: 'If a typical Oort-cloud comet has a mass of ~10^15 kg and the cloud holds ~10^12 comets, what is the estimated total mass?',
      ja: '典型的なオールト雲の彗星の質量が約10^15 kgで、雲に約10^12個の彗星があるとすると、推定総質量はどれくらいですか。',
    },
    options: [
      { en: 'About 100 times the mass of the Sun', ja: '太陽の約100倍の質量' },
      { en: 'Roughly half the mass of Jupiter (around 10^27 kg)', ja: '木星の約半分の質量（およそ10^27 kg）' },
      { en: 'Exactly equal to the mass of Earth', ja: 'ちょうど地球の質量に等しい' },
      { en: 'Roughly 10,000 times the mass of the asteroid belt', ja: '小惑星帯の約1万倍の質量' },
    ],
    answer: 1,
    explain: {
      en: '10^15 kg × 10^12 comets ≈ 10^27 kg, roughly half of Jupiter’s mass (~1.9×10^27 kg).',
      ja: '10^15 kg × 10^12個 ≈ 10^27 kgで、木星の質量（約1.9×10^27 kg）のおよそ半分です。',
    },
  },
  {
    q: {
      en: 'Why does a comet brighten dramatically and develop a visible coma only when it enters the inner solar system?',
      ja: '彗星が内太陽系に入って初めて劇的に明るくなり、見えるコマを発達させるのはなぜですか。',
    },
    options: [
      { en: 'The Sun’s gravity compresses gases inside the nucleus until they erupt.', ja: '太陽の重力が核内のガスを圧縮し、噴出させるから。' },
      { en: 'Solar heat vaporizes the frozen volatile ices of the nucleus, releasing trapped dust and gas.', ja: '太陽の熱が核の凍った揮発性の氷を蒸発させ、閉じ込められた塵とガスを放出するから。' },
      { en: 'It collides with dust in the asteroid belt, igniting the surface.', ja: '小惑星帯の塵と衝突して表面が発火するから。' },
      { en: 'Its speed increases, creating frictional heat against the vacuum of space.', ja: '速度が上がり、宇宙の真空との摩擦熱が生じるから。' },
    ],
    answer: 1,
    explain: {
      en: 'Near the Sun, heat sublimates the nucleus’s volatile ices, releasing gas and dust that form the coma and tails.',
      ja: '太陽に近づくと熱が核の揮発性の氷を昇華させ、コマや尾を作るガスと塵を放出します。',
    },
  },
  {
    q: {
      en: 'If S-type and C-type main-belt asteroids sit at different distances from the Sun, what does tracing their compositions help reconstruct?',
      ja: 'S型とC型のメインベルト小惑星が太陽から異なる距離にあるとき、その組成をたどることは何を復元するのに役立ちますか。',
    },
    options: [
      { en: 'The exact age of the universe', ja: '宇宙の正確な年齢' },
      { en: 'The original temperature and chemical gradient of the solar nebula during planet formation', ja: '惑星形成期の太陽系星雲の元々の温度と化学組成の勾配' },
      { en: 'The path of the Voyager spacecraft', ja: 'ボイジャー探査機の経路' },
      { en: 'The rate of volcanic activity on Mars', ja: '火星の火山活動の速さ' },
    ],
    answer: 1,
    explain: {
      en: 'The ordering of asteroid types by distance maps the temperature and chemical gradient of the early solar nebula.',
      ja: '距離による小惑星タイプの並びは、初期の太陽系星雲の温度と化学組成の勾配を描き出します。',
    },
  },
  {
    q: {
      en: 'Why are the Trojan asteroids considered separate from, and potentially more primitive than, typical main-belt asteroids?',
      ja: 'トロヤ群小惑星が、典型的なメインベルト小惑星とは別で、より始原的かもしれないと考えられるのはなぜですか。',
    },
    options: [
      { en: 'They orbit inside Mercury’s orbit, shielded from solar radiation.', ja: '水星の軌道の内側を回り、太陽放射から守られているから。' },
      { en: 'They are trapped at Jupiter’s Lagrange points, leading and following the planet, suggesting they may have formed separately.', ja: '木星のラグランジュ点に捕らわれ、惑星を先導・追随しており、別に形成された可能性を示すから。' },
      { en: 'They contain no carbon compounds whatsoever.', ja: '炭素化合物をまったく含まないから。' },
      { en: 'They are composed entirely of liquid metallic hydrogen.', ja: '液体金属水素だけでできているから。' },
    ],
    answer: 1,
    explain: {
      en: 'Trojans are locked at Jupiter’s L4/L5 Lagrange points, leading and trailing it, and may be a separately formed, primitive population.',
      ja: 'トロヤ群は木星のL4／L5ラグランジュ点に固定されて先導・追随しており、別に形成された始原的な集団かもしれません。',
    },
  },
];

const hard = [
  {
    q: {
      en: 'How do astronomers justify the claim that comets are the most primitive chemical samples of the early solar system?',
      ja: '天文学者は、彗星が初期太陽系の最も始原的な化学的サンプルであるという主張をどのように正当化しますか。',
    },
    options: [
      { en: 'They are made of heavy volcanic metals like gold and iron that form only in planet cores.', ja: '惑星の核でのみ形成される金や鉄のような重い火山性金属でできているから。' },
      { en: 'They have spent almost their entire existence frozen near absolute zero in the outer solar system, preserving their original composition unchanged.', ja: '存在のほぼ全期間を外太陽系で絶対零度近くに凍って過ごし、元の組成を変えずに保ってきたから。' },
      { en: 'They undergo radioactive heating that continuously refines their minerals.', ja: '放射性加熱を受けて鉱物を絶えず精製するから。' },
      { en: 'They contain amino acids that are entirely right-handed, proving an origin outside the Milky Way.', ja: '完全に右手型のアミノ酸を含み、天の川銀河の外の起源を証明するから。' },
    ],
    answer: 1,
    explain: {
      en: 'Comets spent nearly all their lives deep-frozen in the outer solar system, preserving pristine original material.',
      ja: '彗星はほぼ全生涯を外太陽系で凍りついて過ごし、手つかずの原初物質を保存しています。',
    },
  },
  {
    q: {
      en: 'What was the critical significance of observing Comet Shoemaker-Levy 9 in 1994?',
      ja: '1994年にシューメーカー・レビー第9彗星を観測したことの決定的な意義は何でしたか。',
    },
    options: [
      { en: 'It proved comets have solid, indestructible steel cores.', ja: '彗星が固く破壊不能な鋼鉄の核を持つことを証明した。' },
      { en: 'It let astronomers watch cometary fragmentation under a planet’s tidal forces and the dramatic results of a high-energy planetary impact.', ja: '惑星の潮汐力による彗星の分裂と、高エネルギーの惑星衝突の劇的な結果を観測できた。' },
      { en: 'It created a second moon orbiting Jupiter.', ja: '木星を回る第2の衛星を作った。' },
      { en: 'It showed comets can easily be deflected with nuclear weapons.', ja: '彗星が核兵器で簡単に軌道を変えられることを示した。' },
    ],
    answer: 1,
    explain: {
      en: 'SL9 broke apart under Jupiter’s tides and then struck it, letting us witness fragmentation and a real planetary impact.',
      ja: 'SL9は木星の潮汐で分裂し、その後衝突したため、分裂と実際の惑星衝突を目撃できました。',
    },
  },
  {
    q: {
      en: 'What is the ultimate fate of comets that repeatedly enter the inner solar system?',
      ja: '内太陽系に繰り返し入る彗星の最終的な運命は何ですか。',
    },
    options: [
      { en: 'They grow larger over time by attracting asteroid debris.', ja: '小惑星の破片を引き寄せて時とともに大きくなる。' },
      { en: 'They lose all their volatile ices to solar heating, disintegrating into dust or becoming inactive, dark “dead” objects.', ja: '太陽加熱で揮発性の氷をすべて失い、塵に崩壊するか、不活発で暗い「死んだ」天体になる。' },
      { en: 'They settle into stable circular orbits between Earth and Venus.', ja: '地球と金星の間の安定した円軌道に落ち着く。' },
      { en: 'They are transformed into active stars by gravitational compression.', ja: '重力的な圧縮によって活動的な恒星に変わる。' },
    ],
    answer: 1,
    explain: {
      en: 'Repeated passes boil away a comet’s volatiles until it crumbles to dust or becomes a dark, inert “dead” comet.',
      ja: '繰り返しの接近で揮発物が蒸発し尽くし、彗星は塵に崩れるか、暗く不活発な「死んだ」彗星になります。',
    },
  },
  {
    q: {
      en: 'In planetary defense, why is continuing astronomical surveys (like Spaceguard) considered our most critical current task?',
      ja: '惑星防衛において、（スペースガードのような）天文サーベイの継続が現在最も重要な課題とされるのはなぜですか。',
    },
    options: [
      { en: 'To find mineral-rich asteroids that can be mined for profit.', ja: '採掘して利益を得られる鉱物に富む小惑星を見つけるため。' },
      { en: 'To map potential impactors decades in advance, giving humanity time to deploy deflection technologies.', ja: '衝突しうる天体を数十年前に把握し、軌道変更技術を展開する時間を人類に与えるため。' },
      { en: 'To prevent the Sun from pulling asteroids into the outer solar system.', ja: '太陽が小惑星を外太陽系へ引き込むのを防ぐため。' },
      { en: 'To study how comets form magnetic fields.', ja: '彗星がどのように磁場を作るかを研究するため。' },
    ],
    answer: 1,
    explain: {
      en: 'Early detection is everything: mapping impactors decades ahead is what makes any deflection response possible.',
      ja: '早期発見がすべてです。数十年前に衝突天体を把握することで、初めて軌道変更の対応が可能になります。',
    },
  },
  {
    q: {
      en: 'How did the discovery of the Kuiper belt reshape our understanding of the solar system’s layout and history?',
      ja: 'カイパーベルトの発見は、太陽系の配置と歴史についての理解をどのように塗り替えましたか。',
    },
    options: [
      { en: 'It proved Neptune is the largest planet in the solar system.', ja: '海王星が太陽系最大の惑星であることを証明した。' },
      { en: 'It revealed a vast reservoir of icy planetesimals left from formation, showing planetesimal orbits were shaped by the giant planets’ migrations.', ja: '形成時に残された氷の微惑星の広大な貯蔵庫を明らかにし、微惑星の軌道が巨大惑星の移動によって形作られたことを示した。' },
      { en: 'It showed Pluto is a unique, isolated object with no icy relatives.', ja: '冥王星が氷の仲間を持たない独特で孤立した天体であることを示した。' },
      { en: 'It demonstrated asteroids and comets are chemically identical.', ja: '小惑星と彗星が化学的に同一であることを示した。' },
    ],
    answer: 1,
    explain: {
      en: 'The Kuiper belt revealed leftover icy planetesimals and evidence that giant-planet migration sculpted the outer solar system.',
      ja: 'カイパーベルトは、残された氷の微惑星と、巨大惑星の移動が外太陽系を形作った証拠を明らかにしました。',
    },
  },
];

export default { easy, medium, hard };
