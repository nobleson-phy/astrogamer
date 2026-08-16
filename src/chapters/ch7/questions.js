const easy = [
  {
    q: {
      en: 'What percentage of the total mass of the solar system is contained within the Sun?',
      ja: '太陽系の全質量のうち、太陽が占める割合はどれくらいですか。',
    },
    options: [
      { en: '50%', ja: '50%' },
      { en: '75%', ja: '75%' },
      { en: '90%', ja: '90%' },
      { en: '99.80%', ja: '99.80%' },
    ],
    answer: 3,
    explain: {
      en: 'The Sun contains about 99.8% of the total mass of the solar system.',
      ja: '太陽は太陽系の全質量の約99.8%を占めています。',
    },
  },
  {
    q: {
      en: 'Which four planets are the inner (terrestrial) planets?',
      ja: '内側の（地球型）惑星である4つの惑星はどれですか。',
    },
    options: [
      { en: 'Jupiter, Saturn, Uranus, Neptune', ja: '木星、土星、天王星、海王星' },
      { en: 'Mercury, Venus, Earth, Mars', ja: '水星、金星、地球、火星' },
      { en: 'Earth, Moon, Mars, Ceres', ja: '地球、月、火星、ケレス' },
      { en: 'Mercury, Venus, Jupiter, Saturn', ja: '水星、金星、木星、土星' },
    ],
    answer: 1,
    explain: {
      en: 'The inner terrestrial planets are Mercury, Venus, Earth, and Mars.',
      ja: '内側の地球型惑星は、水星、金星、地球、火星です。',
    },
  },
  {
    q: {
      en: 'The giant planets (Jupiter through Neptune) are composed primarily of:',
      ja: '巨大惑星（木星から海王星まで）は主に何で構成されていますか。',
    },
    options: [
      { en: 'Rock and metal', ja: '岩石と金属' },
      { en: 'Solid iron and nickel', ja: '固体の鉄とニッケル' },
      { en: 'Lighter ices, liquids, and gases', ja: 'より軽い氷、液体、気体' },
      { en: 'Carbon-rich organic compounds', ja: '炭素に富む有機化合物' },
    ],
    answer: 2,
    explain: {
      en: 'The giant planets are made mostly of lighter ices, liquids, and gases rather than rock and metal.',
      ja: '巨大惑星は岩石や金属ではなく、主により軽い氷、液体、気体でできています。',
    },
  },
  {
    q: {
      en: 'Which planet rotates in a "retrograde" or backward direction?',
      ja: '「逆行」つまり逆向きに自転している惑星はどれですか。',
    },
    options: [
      { en: 'Earth', ja: '地球' },
      { en: 'Mars', ja: '火星' },
      { en: 'Venus', ja: '金星' },
      { en: 'Jupiter', ja: '木星' },
    ],
    answer: 2,
    explain: {
      en: 'Venus rotates in a retrograde (backward) direction, opposite to most other planets.',
      ja: '金星は他の多くの惑星とは反対の、逆行（逆向き）の自転をしています。',
    },
  },
  {
    q: {
      en: 'Where are the majority of asteroids located?',
      ja: '小惑星の大部分はどこに位置していますか。',
    },
    options: [
      { en: 'In the Kuiper Belt beyond Neptune', ja: '海王星の外側のカイパーベルトの中' },
      { en: 'Orbiting the Earth as second moons', ja: '第二の月として地球を周回している' },
      { en: 'In the space between Mars and Jupiter', ja: '火星と木星の間の空間' },
      { en: 'Clustered near the Sun inside Mercury’s orbit', ja: '水星軌道の内側で太陽の近くに集まっている' },
    ],
    answer: 2,
    explain: {
      en: 'Most asteroids orbit in the asteroid belt located between Mars and Jupiter.',
      ja: 'ほとんどの小惑星は、火星と木星の間にある小惑星帯を公転しています。',
    },
  },
  {
    q: {
      en: 'What are comets primarily composed of?',
      ja: '彗星は主に何で構成されていますか。',
    },
    options: [
      { en: 'Pure iron and nickel', ja: '純粋な鉄とニッケル' },
      { en: 'Frozen gases such as water, carbon dioxide, and carbon monoxide', ja: '水、二酸化炭素、一酸化炭素などの凍った気体' },
      { en: 'Molten silicate lava', ja: '溶融したケイ酸塩の溶岩' },
      { en: 'Compressed liquid hydrogen', ja: '圧縮された液体水素' },
    ],
    answer: 1,
    explain: {
      en: 'Comets are made largely of frozen gases such as water, carbon dioxide, and carbon monoxide mixed with dust.',
      ja: '彗星は主に水、二酸化炭素、一酸化炭素などの凍った気体と塵からできています。',
    },
  },
  {
    q: {
      en: 'The process where gravity separates a planet’s interior into layers of different densities is called:',
      ja: '重力によって惑星の内部が密度の異なる層に分かれる過程を何と呼びますか。',
    },
    options: [
      { en: 'Accretion', ja: '降着（集積）' },
      { en: 'Tectonics', ja: 'テクトニクス' },
      { en: 'Differentiation', ja: '分化' },
      { en: 'Volcanism', ja: '火山活動' },
    ],
    answer: 2,
    explain: {
      en: 'Differentiation is the process in which gravity separates a planet’s interior into layers of different density.',
      ja: '分化とは、重力が惑星の内部を密度の異なる層に分ける過程のことです。',
    },
  },
  {
    q: {
      en: 'Based on primitive meteorites, what is the estimated age of the solar system?',
      ja: '始原的な隕石に基づくと、太陽系の推定年齢はどれくらいですか。',
    },
    options: [
      { en: '1 million years', ja: '100万年' },
      { en: '450 million years', ja: '4億5千万年' },
      { en: '4.5 billion years', ja: '45億年' },
      { en: '13.8 billion years', ja: '138億年' },
    ],
    answer: 2,
    explain: {
      en: 'Radioactive dating of primitive meteorites gives the solar system an age of about 4.5 billion years.',
      ja: '始原的な隕石の放射年代測定から、太陽系の年齢は約45億年とされています。',
    },
  },
  {
    q: {
      en: 'In radioactive dating, the time in which there is a fifty-fifty chance a nucleus will decay is its:',
      ja: '放射年代測定において、原子核が崩壊する確率が五分五分となる時間を何と呼びますか。',
    },
    options: [
      { en: 'Epoch', ja: 'エポック（元期）' },
      { en: 'Generation', ja: '世代' },
      { en: 'Half-life', ja: '半減期' },
      { en: 'Decay rate', ja: '崩壊率' },
    ],
    answer: 2,
    explain: {
      en: 'The half-life is the time over which there is a fifty-fifty chance that a given nucleus will decay.',
      ja: '半減期とは、ある原子核が崩壊する確率が五分五分となる時間のことです。',
    },
  },
  {
    q: {
      en: 'The spinning cloud of gas and dust from which the Sun and planets formed is the:',
      ja: '太陽と惑星がそこから形成された、回転するガスと塵の雲を何と呼びますか。',
    },
    options: [
      { en: 'Oort Cloud', ja: 'オールトの雲' },
      { en: 'Solar nebula', ja: '原始太陽系星雲' },
      { en: 'Circumstellar disk', ja: '星周円盤' },
      { en: 'Galactic bulge', ja: '銀河バルジ' },
    ],
    answer: 1,
    explain: {
      en: 'The Sun and planets formed from a spinning cloud of gas and dust called the solar nebula.',
      ja: '太陽と惑星は、原始太陽系星雲と呼ばれる回転するガスと塵の雲から形成されました。',
    },
  },
  {
    q: {
      en: 'What was the first trans-Neptunian object (TNO) discovered?',
      ja: '最初に発見された太陽系外縁天体（TNO）は何ですか。',
    },
    options: [
      { en: 'Eris', ja: 'エリス' },
      { en: 'Makemake', ja: 'マケマケ' },
      { en: 'Pluto', ja: '冥王星' },
      { en: 'Arrokoth', ja: 'アロコス' },
    ],
    answer: 2,
    explain: {
      en: 'Pluto, discovered in 1930, was the first trans-Neptunian object found.',
      ja: '1930年に発見された冥王星は、最初に見つかった太陽系外縁天体です。',
    },
  },
  {
    q: {
      en: 'What is the densest planet in our solar system?',
      ja: '太陽系で最も密度が高い惑星はどれですか。',
    },
    options: [
      { en: 'Mercury', ja: '水星' },
      { en: 'Venus', ja: '金星' },
      { en: 'Earth', ja: '地球' },
      { en: 'Jupiter', ja: '木星' },
    ],
    answer: 2,
    explain: {
      en: 'Earth is the densest planet in the solar system, with an average density of about 5.5 g/cm³.',
      ja: '地球は平均密度が約5.5 g/cm³で、太陽系で最も密度が高い惑星です。',
    },
  },
  {
    q: {
      en: 'Which planet has an average density so low (0.7 g/cm³) that it would float in water?',
      ja: '平均密度が非常に低く（0.7 g/cm³）、水に浮くほどの惑星はどれですか。',
    },
    options: [
      { en: 'Uranus', ja: '天王星' },
      { en: 'Neptune', ja: '海王星' },
      { en: 'Jupiter', ja: '木星' },
      { en: 'Saturn', ja: '土星' },
    ],
    answer: 3,
    explain: {
      en: 'Saturn’s average density is only about 0.7 g/cm³, less than water, so it would float.',
      ja: '土星の平均密度はわずか約0.7 g/cm³で水より小さいため、水に浮くことになります。',
    },
  },
  {
    q: {
      en: 'The most abundant rocks on the surfaces of terrestrial planets are:',
      ja: '地球型惑星の表面で最も豊富な岩石は何ですか。',
    },
    options: [
      { en: 'Granites', ja: '花崗岩' },
      { en: 'Basalts', ja: '玄武岩' },
      { en: 'Silicates', ja: 'ケイ酸塩' },
      { en: 'Carbonates', ja: '炭酸塩' },
    ],
    answer: 1,
    explain: {
      en: 'Basalts, formed from cooled lava, are the most abundant rocks on the surfaces of terrestrial planets.',
      ja: '冷えた溶岩からできた玄武岩は、地球型惑星の表面で最も豊富な岩石です。',
    },
  },
  {
    q: {
      en: 'The central cores of the terrestrial planets are primarily made of:',
      ja: '地球型惑星の中心核は主に何でできていますか。',
    },
    options: [
      { en: 'Iron and nickel', ja: '鉄とニッケル' },
      { en: 'Hydrogen and helium', ja: '水素とヘリウム' },
      { en: 'Liquid water and methane ice', ja: '液体の水とメタンの氷' },
      { en: 'Silicon and oxygen', ja: 'ケイ素と酸素' },
    ],
    answer: 0,
    explain: {
      en: 'The cores of the terrestrial planets are composed primarily of iron and nickel.',
      ja: '地球型惑星の中心核は、主に鉄とニッケルで構成されています。',
    },
  },
];

const medium = [
  {
    q: {
      en: 'Region A has ten times more impact craters than Region B. What can we say about their ages?',
      ja: 'A地域はB地域より10倍多くの衝突クレーターを持っています。両者の年齢について何が言えますか。',
    },
    options: [
      { en: 'Region B is older because it was "swept clean" more recently.', ja: 'B地域はより最近「掃き清められた」ので古い。' },
      { en: 'Region A is geologically older because it has been exposed to impacts longer', ja: 'A地域はより長く衝突にさらされてきたため、地質学的に古い' },
      { en: 'Region B must be harder material that resists cratering.', ja: 'B地域はクレーターができにくい硬い物質に違いない。' },
      { en: 'Region A must be closer to the asteroid belt.', ja: 'A地域は小惑星帯に近いに違いない。' },
    ],
    answer: 1,
    explain: {
      en: 'A more heavily cratered surface is older because it has been exposed to impacts over a longer time.',
      ja: 'クレーターが多い表面ほど、より長い時間衝突にさらされてきたため古いといえます。',
    },
  },
  {
    q: {
      en: 'Why did smaller objects (the Moon) become "geologically dead" while larger planets (Earth) stay active?',
      ja: 'なぜ小さな天体（月）は「地質学的に死んだ」状態になり、大きな惑星（地球）は活動を続けているのですか。',
    },
    options: [
      { en: 'Smaller objects were never hit by asteroids.', ja: '小さな天体は一度も小惑星に衝突されなかったから。' },
      { en: 'Larger planets have more gravity to attract heat from the Sun.', ja: '大きな惑星は太陽の熱を引きつける重力が大きいから。' },
      { en: 'Larger objects retain their internal primordial heat much longer than smaller ones', ja: '大きな天体は小さな天体よりも内部の原始的な熱をはるかに長く保つから' },
      { en: 'Smaller objects are made of materials that cannot melt.', ja: '小さな天体は溶けない物質でできているから。' },
    ],
    answer: 2,
    explain: {
      en: 'Larger bodies retain their internal heat far longer than small ones, so they remain geologically active.',
      ja: '大きな天体は内部の熱を小さな天体よりはるかに長く保つため、地質学的に活動を続けます。',
    },
  },
  {
    q: {
      en: 'A rock has exactly 25% (one-fourth) of its original radioactive parent remaining. How many half-lives have passed?',
      ja: 'ある岩石には元の放射性親核種のちょうど25%（4分の1）が残っています。何回の半減期が経過しましたか。',
    },
    options: [
      { en: 'One', ja: '1回' },
      { en: 'Two', ja: '2回' },
      { en: 'Three', ja: '3回' },
      { en: 'Four', ja: '4回' },
    ],
    answer: 1,
    explain: {
      en: 'After one half-life 50% remains and after two half-lives 25% remains, so two half-lives have passed.',
      ja: '1回の半減期で50%、2回で25%が残るため、2回の半減期が経過しています。',
    },
  },
  {
    q: {
      en: 'Pluto’s average surface temperature is roughly 10× colder than Mercury’s. What is the primary mathematical reason?',
      ja: '冥王星の平均表面温度は水星よりおよそ10倍冷たいです。その主な数学的理由は何ですか。',
    },
    options: [
      { en: 'Pluto has a thick atmosphere that reflects heat.', ja: '冥王星は熱を反射する厚い大気を持っている。' },
      { en: 'Mercury produces internal heat via nuclear fusion.', ja: '水星は核融合によって内部で熱を生み出している。' },
      { en: 'Temperatures decrease roughly in proportion to the square root of the distance from the Sun', ja: '温度は太陽からの距離の平方根にほぼ反比例して下がる' },
      { en: 'Pluto is made of ice, which is naturally colder than rock.', ja: '冥王星は岩石より本質的に冷たい氷でできている。' },
    ],
    answer: 2,
    explain: {
      en: 'A body’s temperature falls roughly with the square root of its distance from the Sun, so Pluto’s far greater distance makes it much colder.',
      ja: '天体の温度は太陽からの距離の平方根にほぼ反比例して下がるため、はるかに遠い冥王星はずっと冷たくなります。',
    },
  },
  {
    q: {
      en: 'Why are Jupiter and Saturn called "liquid planets" rather than just "gas giants"?',
      ja: '木星と土星が単なる「ガス惑星」ではなく「液体惑星」と呼ばれるのはなぜですか。',
    },
    options: [
      { en: 'They are entirely liquid water oceans.', ja: 'それらは全体が液体の水の海である。' },
      { en: 'Their internal pressures are so high that hydrogen is compressed into a liquid state', ja: '内部の圧力が非常に高いため、水素が圧縮されて液体状態になっている' },
      { en: 'They are melting because too close to the Sun.', ja: '太陽に近すぎて溶けているから。' },
      { en: 'They are mostly liquid iron and nickel.', ja: 'それらは主に液体の鉄とニッケルである。' },
    ],
    answer: 1,
    explain: {
      en: 'Deep inside Jupiter and Saturn the pressure is so high that hydrogen is compressed into a liquid, giving them large liquid interiors.',
      ja: '木星と土星の深部では圧力が非常に高く、水素が圧縮されて液体になっているため、大きな液体の内部を持ちます。',
    },
  },
];

const hard = [
  {
    q: {
      en: 'Why are asteroids and comets "chemical fossils" more useful than planets for studying the early solar system?',
      ja: '初期の太陽系を研究する上で、小惑星や彗星が惑星よりも有用な「化学的な化石」であるのはなぜですか。',
    },
    options: [
      { en: 'They are larger and easier to see than most planets.', ja: 'ほとんどの惑星より大きく、見つけやすいから。' },
      { en: 'They have remained relatively unmodified and retain their original composition from the time of formation', ja: '比較的変化を受けておらず、形成時の元々の組成を保っているから' },
      { en: 'They are the only objects that contain iron.', ja: '鉄を含む唯一の天体だから。' },
      { en: 'They formed billions of years before the Sun was born.', ja: '太陽が生まれる何十億年も前に形成されたから。' },
    ],
    answer: 1,
    explain: {
      en: 'Small bodies like asteroids and comets have changed little since formation, so they preserve the original chemistry of the early solar system.',
      ja: '小惑星や彗星のような小天体は形成以来ほとんど変化しておらず、初期太陽系の元々の化学組成を保っています。',
    },
  },
  {
    q: {
      en: 'What is the significance of the Voyager 2 "Grand Tour" trajectory?',
      ja: 'ボイジャー2号の「グランドツアー」軌道の意義は何ですか。',
    },
    options: [
      { en: 'It let the craft land on all eight planets.', ja: '探査機が8つすべての惑星に着陸できるようにした。' },
      { en: 'It proved the Sun’s gravity does not affect spacecraft.', ja: '太陽の重力が探査機に影響しないことを証明した。' },
      { en: 'It took advantage of a rare alignment occurring every 175 years to visit all four giant planets', ja: '175年ごとに起こる稀な整列を利用して、4つすべての巨大惑星を訪れた' },
      { en: 'It was the first mission to travel outside the Milky Way.', ja: '天の川銀河の外へ旅した最初のミッションだった。' },
    ],
    answer: 2,
    explain: {
      en: 'Voyager 2 used a rare planetary alignment that occurs about every 175 years to fly by all four giant planets in a single mission.',
      ja: 'ボイジャー2号は約175年ごとに起こる稀な惑星整列を利用し、一度のミッションで4つすべての巨大惑星に接近しました。',
    },
  },
  {
    q: {
      en: 'In planetary chemistry, what does it mean that the outer solar system is "reduced"?',
      ja: '惑星化学において、外側の太陽系が「還元的」であるとはどういう意味ですか。',
    },
    options: [
      { en: 'The planets there are smaller in size than Earth.', ja: 'そこの惑星は地球より小さい。' },
      { en: 'Abundant hydrogen combines with other elements, such as oxygen forming water rather than carbon dioxide', ja: '豊富な水素が他の元素と結びつき、たとえば酸素が二酸化炭素ではなく水を形成する' },
      { en: 'There is reduced gravity in that region.', ja: 'その領域では重力が小さい。' },
      { en: 'The number of moons is very low.', ja: '衛星の数が非常に少ない。' },
    ],
    answer: 1,
    explain: {
      en: 'In a reduced environment abundant hydrogen combines with other elements, so oxygen forms water rather than carbon dioxide.',
      ja: '還元的な環境では豊富な水素が他の元素と結びつくため、酸素は二酸化炭素ではなく水を形成します。',
    },
  },
  {
    q: {
      en: 'How does modern astronomy explain exceptions like Uranus spinning on its side or Venus’s retrograde rotation?',
      ja: '天王星が横倒しで自転することや金星の逆行自転のような例外を、現代の天文学はどのように説明していますか。',
    },
    options: [
      { en: 'They formed from a different nebula.', ja: 'それらは別の星雲から形成された。' },
      { en: 'The Sun’s magnetic field flipped them.', ja: '太陽の磁場が惑星をひっくり返した。' },
      { en: 'They are likely the result of enormous, random collisions during the chaotic early solar system', ja: '混沌とした初期の太陽系で起きた巨大でランダムな衝突の結果だと考えられている' },
      { en: 'Aliens moved these planets.', ja: '宇宙人がこれらの惑星を動かした。' },
    ],
    answer: 2,
    explain: {
      en: 'Such odd rotations are thought to result from giant, random collisions during the chaotic early history of the solar system.',
      ja: 'こうした異常な自転は、混沌とした太陽系初期に起きた巨大でランダムな衝突の結果だと考えられています。',
    },
  },
  {
    q: {
      en: 'How have exoplanet discoveries revised planetary formation theory?',
      ja: '系外惑星の発見は、惑星形成の理論をどのように修正しましたか。',
    },
    options: [
      { en: 'They proved our solar system is the only one with giant planets.', ja: '私たちの太陽系だけが巨大惑星を持つことを証明した。' },
      { en: 'They showed all planets must be exactly Earth-sized.', ja: 'すべての惑星がちょうど地球サイズでなければならないことを示した。' },
      { en: 'Observations of "hot Jupiters" suggest giant planets can migrate significantly from where they originally formed.', ja: '「ホットジュピター」の観測は、巨大惑星が元々形成された場所から大きく移動しうることを示唆している。' },
      { en: 'They confirmed planets only form around very old stars.', ja: '惑星は非常に古い恒星の周りでのみ形成されることを確認した。' },
    ],
    answer: 2,
    explain: {
      en: 'The discovery of "hot Jupiters" close to their stars shows that giant planets can migrate far from where they first formed.',
      ja: '恒星のすぐ近くにある「ホットジュピター」の発見は、巨大惑星が最初に形成された場所から大きく移動しうることを示しています。',
    },
  },
];

export default { easy, medium, hard };
