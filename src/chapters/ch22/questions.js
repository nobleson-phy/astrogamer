const easy = [
  {
    q: {
      en: 'What does the zero-age main sequence (ZAMS) represent?',
      ja: '零年主系列（ZAMS）は何を表しますか。',
    },
    options: [
      { en: 'A protostar’s contraction path through dust', ja: '塵の中を収縮する原始星の経路' },
      { en: 'The line where stars of different masses begin stable core hydrogen fusion', ja: '異なる質量の星が安定した核の水素融合を始める線' },
      { en: 'The region where stars exhaust hydrogen and begin helium ignition', ja: '星が水素を使い果たしヘリウムに点火する領域' },
      { en: 'The white-dwarf cooling track', ja: '白色矮星の冷却経路' },
    ],
    answer: 1,
    explain: {
      en: 'ZAMS is the baseline on the H–R diagram where contracting protostars initiate stable core hydrogen fusion.',
      ja: 'ZAMSは、収縮する原始星が安定した核の水素融合を始める、H–R図上の基準線です。',
    },
  },
  {
    q: {
      en: 'The proton-proton chain fusion rate scales as which power of the core temperature?',
      ja: '陽子-陽子連鎖の融合率は、核の温度の何乗に比例しますか。',
    },
    options: [
      { en: 'T¹', ja: 'T¹' },
      { en: 'T²', ja: 'T²' },
      { en: 'T⁴', ja: 'T⁴' },
      { en: 'T¹⁰', ja: 'T¹⁰' },
    ],
    answer: 2,
    explain: {
      en: 'In the p-p chain, energy generation scales roughly as T⁴.',
      ja: '陽子-陽子連鎖では、エネルギー生成はおよそT⁴に比例します。',
    },
  },
  {
    q: {
      en: 'What is the immediate response of a star when its core hydrogen is exhausted?',
      ja: '核の水素を使い果たしたとき、星がまず示す反応は何ですか。',
    },
    options: [
      { en: 'It explodes instantly as a type II supernova', ja: 'たちまちII型超新星として爆発する' },
      { en: 'The core contracts under gravity and heats up because no energy source balances gravity', ja: '重力を支えるエネルギー源がなくなり、核は重力で収縮して熱くなる' },
      { en: 'It fuses carbon to oxygen immediately without any change in size', ja: '大きさを変えずにただちに炭素を酸素に融合する' },
      { en: 'It expands and cools to absolute zero', ja: '膨張して絶対零度まで冷える' },
    ],
    answer: 1,
    explain: {
      en: 'With no fusion pressure, gravity contracts the helium core, converting gravitational potential energy into heat.',
      ja: '融合による圧力がなくなると、重力がヘリウムの核を収縮させ、重力の位置エネルギーを熱に変えます。',
    },
  },
  {
    q: {
      en: 'What structural change takes a star toward the red giant branch?',
      ja: '星を赤色巨星分枝へと向かわせる構造の変化はどれですか。',
    },
    options: [
      { en: 'The entire star contracts uniformly to one-tenth its size', ja: '星全体が一様に1/10の大きさに収縮する' },
      { en: 'The helium core contracts while hydrogen fuses in a shell outside it, and the outer layers expand and cool', ja: 'ヘリウムの核が収縮し、その外側の殻で水素が融合し、外層が膨張して冷える' },
      { en: 'Core helium fusion collapses the outer layers into a degenerate white dwarf', ja: '核のヘリウム融合が外層を縮退した白色矮星に崩壊させる' },
      { en: 'Carbon fusion in the outer crust sheds all mass instantly', ja: '外殻の炭素融合がすべての質量をたちまち放出する' },
    ],
    answer: 1,
    explain: {
      en: 'Shell fusion plus core contraction heat the envelope, driving it to expand and cool.',
      ja: '殻での融合と核の収縮が外層を熱し、膨張と冷却を引き起こします。',
    },
  },
  {
    q: {
      en: 'Betelgeuse is only about 10 million years old while the Sun is 4.5 billion years old. What does this show?',
      ja: 'ベテルギウスはわずか約1,000万歳で、太陽は45億歳です。これは何を示しますか。',
    },
    options: [
      { en: 'Low-mass stars die faster', ja: '低質量星のほうが速く死ぬ' },
      { en: 'Massive stars consume their fuel far faster and evolve much more rapidly', ja: '大質量星は燃料をはるかに速く消費し、ずっと急速に進化する' },
      { en: 'Betelgeuse is a first-generation star from the Big Bang', ja: 'ベテルギウスはビッグバンの第一世代の星である' },
      { en: 'Binary stars live ten times longer', ja: '連星は10倍長く生きる' },
    ],
    answer: 1,
    explain: {
      en: 'Massive stars have far higher luminosity (L ∝ M⁴), burning their core fuel in millions, not billions, of years.',
      ja: '大質量星ははるかに高い光度（L ∝ M⁴）を持ち、核の燃料を数十億年ではなく数百万年で燃やします。',
    },
  },
  {
    q: {
      en: 'What is a cluster of tens of thousands to millions of ancient Population II stars in a spherical halo called?',
      ja: '球状のハローの中にある、数万〜数百万の古い種族IIの星からなる星団は何と呼ばれますか。',
    },
    options: [
      { en: 'Open cluster', ja: '散開星団' },
      { en: 'Stellar association', ja: '星団アソシエーション' },
      { en: 'Globular cluster', ja: '球状星団' },
      { en: 'Galactic OB cluster', ja: '銀河OB星団' },
    ],
    answer: 2,
    explain: {
      en: 'Globular clusters are dense spherical systems of 10⁴–10⁶ old Population II stars in the halo.',
      ja: '球状星団は、ハローにある10⁴〜10⁶個の古い種族IIの星からなる、密な球状の系です。',
    },
  },
  {
    q: {
      en: 'Where are open clusters primarily located?',
      ja: '散開星団は主にどこにありますか。',
    },
    options: [
      { en: 'In the distant spherical halo', ja: '遠い球状のハロー' },
      { en: 'In the Galactic disk and spiral arms', ja: '銀河円盤と渦状腕' },
      { en: 'Inside the supermassive black hole’s accretion disk', ja: '超大質量ブラックホールの降着円盤の中' },
      { en: 'In intergalactic space', ja: '銀河間空間' },
    ],
    answer: 1,
    explain: {
      en: 'Open clusters hold younger stars in the gas-rich plane and spiral arms of the disk.',
      ja: '散開星団は、ガスに富む円盤の面と渦状腕にある、より若い星を含みます。',
    },
  },
  {
    q: {
      en: 'What is the position where cluster stars begin leaving the main sequence to become red giants called?',
      ja: '星団の星が主系列を離れて赤色巨星になり始める位置は何と呼ばれますか。',
    },
    options: [
      { en: 'Zero-age baseline', ja: '零年基準線' },
      { en: 'Evolutionary gap', ja: '進化の隙間' },
      { en: 'Main-sequence turnoff', ja: '主系列の転回点' },
      { en: 'Triple-alpha junction', ja: 'トリプルアルファ接合点' },
    ],
    answer: 2,
    explain: {
      en: 'The top of the remaining main sequence, where stars peel off, is the turnoff.',
      ja: '残った主系列の上端で星が離れていく点が、転回点です。',
    },
  },
  {
    q: {
      en: 'What is the minimum core temperature for the triple-alpha process that fuses helium into carbon?',
      ja: 'ヘリウムを炭素に融合するトリプルアルファ反応に必要な最低の核温度はいくらですか。',
    },
    options: [
      { en: '12 million K', ja: '1,200万K' },
      { en: '25 million K', ja: '2,500万K' },
      { en: '100 million K', ja: '1億K' },
      { en: '1 billion K', ja: '10億K' },
    ],
    answer: 2,
    explain: {
      en: 'The triple-alpha process needs about 10⁸ K to overcome the repulsion between helium nuclei.',
      ja: 'トリプルアルファ反応は、ヘリウム原子核どうしの反発に打ち勝つため約10⁸ Kを必要とします。',
    },
  },
  {
    q: {
      en: 'What is the explosive ignition of helium fusion in the electron-degenerate core of a 0.8–2.0 M☉ star called?',
      ja: '0.8〜2.0 M☉の星の電子縮退した核で起こる、ヘリウム融合の爆発的な点火は何と呼ばれますか。',
    },
    options: [
      { en: 'Helium flash', ja: 'ヘリウムフラッシュ' },
      { en: 'Carbon detonation', ja: '炭素爆轟' },
      { en: 'Thermal runaway nova', ja: '熱暴走新星' },
      { en: 'Planetary nebula shock', ja: '惑星状星雲の衝撃波' },
    ],
    answer: 0,
    explain: {
      en: 'Degeneracy in the core causes a near-explosive runaway ignition of helium — the helium flash.',
      ja: '核の縮退が、ほぼ爆発的なヘリウムの暴走点火——ヘリウムフラッシュ——を引き起こします。',
    },
  },
  {
    q: {
      en: 'What does a helium nucleus produce when it joins a newly formed carbon nucleus?',
      ja: 'ヘリウム原子核が、できたばかりの炭素原子核と結合すると何ができますか。',
    },
    options: [
      { en: 'Nitrogen', ja: '窒素' },
      { en: 'Oxygen', ja: '酸素' },
      { en: 'Neon', ja: 'ネオン' },
      { en: 'Silicon', ja: 'ケイ素' },
    ],
    answer: 1,
    explain: {
      en: 'Carbon plus an alpha particle (⁴He) produces oxygen (¹⁶O).',
      ja: '炭素にアルファ粒子（⁴He）が加わると酸素（¹⁶O）ができます。',
    },
  },
  {
    q: {
      en: 'What is the glowing shell of ionized gas ejected by an aging low-mass red giant and lit by UV from its hot core?',
      ja: '年老いた低質量の赤色巨星が放出し、その高温の核からの紫外線で輝く、電離したガスの殻は何ですか。',
    },
    options: [
      { en: 'Herbig-Haro object', ja: 'ハービッグ・ハロー天体' },
      { en: 'H II emission region', ja: 'H II輝線領域' },
      { en: 'Planetary nebula', ja: '惑星状星雲' },
      { en: 'Supernova remnant', ja: '超新星残骸' },
    ],
    answer: 2,
    explain: {
      en: 'Aging low-mass red giants shed their outer layers, forming a planetary nebula ionized by the exposed hot core.',
      ja: '年老いた低質量の赤色巨星は外層を脱ぎ捨て、むき出しの高温の核に電離された惑星状星雲を作ります。',
    },
  },
  {
    q: {
      en: 'In stars above 8 M☉, fusion builds elements up to which one, beyond which fusion absorbs energy?',
      ja: '8 M☉を超える星では、融合はどの元素まで作り、それより先では融合がエネルギーを吸収しますか。',
    },
    options: [
      { en: 'Carbon', ja: '炭素' },
      { en: 'Silicon', ja: 'ケイ素' },
      { en: 'Iron', ja: '鉄' },
      { en: 'Uranium', ja: 'ウラン' },
    ],
    answer: 2,
    explain: {
      en: 'Nucleosynthesis stops at iron (⁵⁶Fe) because fusing iron is endothermic.',
      ja: '鉄（⁵⁶Fe）の融合は吸熱的なので、元素合成は鉄で止まります。',
    },
  },
  {
    q: {
      en: 'What is the term for building heavier elements from lighter ones by fusion in stars?',
      ja: '星の中で軽い元素から重い元素を融合で作ることを何と呼びますか。',
    },
    options: [
      { en: 'Differentiation', ja: '分化' },
      { en: 'Spallation', ja: '核破砕' },
      { en: 'Nucleosynthesis', ja: '元素合成' },
      { en: 'Photodisintegration', ja: '光分解' },
    ],
    answer: 2,
    explain: {
      en: 'Nucleosynthesis is the building of heavier nuclei from lighter ones.',
      ja: '元素合成とは、軽い原子核からより重い原子核を作ることです。',
    },
  },
  {
    q: {
      en: 'Why are ancient globular-cluster stars metal-poor compared to young open clusters?',
      ja: 'なぜ古い球状星団の星は、若い散開星団に比べて金属に乏しいのですか。',
    },
    options: [
      { en: 'Globulars destroy heavy elements with magnetic fields', ja: '球状星団は磁場で重元素を破壊するから' },
      { en: 'Globulars formed early, before multiple generations of dying stars enriched the gas with heavy elements', ja: '球状星団は、死にゆく星の何世代もがガスを重元素で富ませる前の、早い時期に形成されたから' },
      { en: 'Open clusters form from pure intergalactic hydrogen', ja: '散開星団は純粋な銀河間の水素から作られるから' },
      { en: 'Open-cluster surface heat synthesizes metals on their crusts', ja: '散開星団の表面の熱が殻で金属を合成するから' },
    ],
    answer: 1,
    explain: {
      en: 'Globulars formed from primitive gas, before supernova recycling enriched the interstellar medium.',
      ja: '球状星団は、超新星による再循環が星間物質を富ませる前の、原始的なガスから形成されました。',
    },
  },
];

const medium = [
  {
    q: {
      en: 'If the core temperature doubles, by how much does the fusion rate increase (scaling as T⁴)?',
      ja: '核の温度が2倍になると、融合率は（T⁴に比例して）どれだけ増えますか。',
    },
    options: [
      { en: '2×', ja: '2倍' },
      { en: '4×', ja: '4倍' },
      { en: '8×', ja: '8倍' },
      { en: '16×', ja: '16倍' },
    ],
    answer: 3,
    explain: {
      en: '2⁴ = 16.',
      ja: '2⁴ ＝ 16 です。',
    },
  },
  {
    q: {
      en: 'Why does an expanding red giant cool at its surface yet grow far more luminous?',
      ja: 'なぜ膨張する赤色巨星は表面が冷えるのに、はるかに明るくなるのですか。',
    },
    options: [
      { en: 'Core reactions shut off and the light redshifts into heat', ja: '核反応が止まり、光が赤方偏移して熱になるから' },
      { en: 'Shell-fusion output exceeds main-sequence output, but the vast surface expansion (L = 4πR²σT⁴) spreads heat over a huge area, lowering surface temperature', ja: '殻での融合の出力は主系列時を超えるが、巨大な表面膨張（L = 4πR²σT⁴）が熱を広大な面積に広げ、表面温度を下げるから' },
      { en: 'It absorbs dark matter', ja: 'ダークマターを吸収するから' },
      { en: 'Magnetic fields convert visible light to radio', ja: '磁場が可視光を電波に変えるから' },
    ],
    answer: 1,
    explain: {
      en: 'Higher total output raises the luminosity, while the extreme radial expansion cools the surface.',
      ja: 'より高い総出力が光度を上げ、一方で極端な半径方向の膨張が表面を冷やします。',
    },
  },
  {
    q: {
      en: 'Why can a cluster’s age be read from its H–R main-sequence turnoff?',
      ja: 'なぜ星団の年齢は、そのH–R図の主系列転回点から読み取れるのですか。',
    },
    options: [
      { en: 'All cluster stars share an identical luminosity', ja: '星団のすべての星が同じ光度を持つから' },
      { en: 'All formed at the same time, so the mass now turning off has a known hydrogen-burning lifespan equal to the cluster’s age', ja: 'すべてが同時に形成されたので、いま転回している質量の既知の水素燃焼寿命が星団の年齢に等しいから' },
      { en: 'The turnoff predicts a galaxy collision', ja: '転回点が銀河衝突を予言するから' },
      { en: 'Stars below the turnoff fission at a constant rate', ja: '転回点より下の星が一定の割合で核分裂するから' },
    ],
    answer: 1,
    explain: {
      en: 'Lifespan depends predictably on mass (t ∝ M/L ∝ 1/M³), so the turnoff mass yields the age.',
      ja: '寿命は質量に予測可能に依存する（t ∝ M/L ∝ 1/M³）ので、転回点の質量が年齢を与えます。',
    },
  },
  {
    q: {
      en: 'Why does the triple-alpha process need 100 million K when hydrogen fuses at about 12 million K?',
      ja: '水素が約1,200万Kで融合するのに、なぜトリプルアルファ反応は1億Kを必要とするのですか。',
    },
    options: [
      { en: 'Helium nuclei are neutral and need gravity to compress them', ja: 'ヘリウム原子核は中性で、圧縮に重力が要るから' },
      { en: 'Helium nuclei (alphas) carry a +2 charge, a 4× stronger electrostatic repulsion that needs higher thermal velocities', ja: 'ヘリウム原子核（アルファ粒子）は+2の電荷を持ち、4倍強い静電反発のためより高い熱速度が要るから' },
      { en: 'Hydrogen’s strong force breaks down at low temperature', ja: '水素の強い力は低温で壊れるから' },
      { en: 'Carbon absorbs all the energy at low temperature', ja: '炭素が低温ですべてのエネルギーを吸収するから' },
    ],
    answer: 1,
    explain: {
      en: 'The +2 charge raises the Coulomb barrier about 4×, requiring much higher kinetic energy.',
      ja: '+2の電荷がクーロン障壁を約4倍に高め、はるかに高い運動エネルギーを必要とします。',
    },
  },
  {
    q: {
      en: 'Why does the accumulation of iron trigger catastrophic collapse rather than continued support?',
      ja: 'なぜ鉄の蓄積は、支え続けるのではなく破滅的な崩壊を引き起こすのですか。',
    },
    options: [
      { en: 'Iron is liquid and leaks out', ja: '鉄は液体で漏れ出すから' },
      { en: 'Iron fusion is endothermic — it drains heat and thermal pressure instead of generating outward energy to support the star’s weight', ja: '鉄の融合は吸熱的で、星の重みを支える外向きのエネルギーを生むのではなく、熱と熱的圧力を奪うから' },
      { en: 'Iron repels electrons, destroying degeneracy pressure', ja: '鉄が電子を反発し、縮退圧を壊すから' },
      { en: 'Iron decays into hydrogen', ja: '鉄が水素に崩壊するから' },
    ],
    answer: 1,
    explain: {
      en: 'Fusing iron removes energy, so the core loses pressure support and collapses.',
      ja: '鉄の融合はエネルギーを奪うので、核は圧力の支えを失い崩壊します。',
    },
  },
];

const hard = [
  {
    q: {
      en: 'Why are clusters ideal laboratories for studying stellar evolution?',
      ja: 'なぜ星団は、恒星進化を研究する理想的な実験室なのですか。',
    },
    options: [
      { en: 'Their stars have wildly different ages and origins, giving a random sample', ja: 'その星は年齢も起源もまちまちで、無作為な標本を与えるから' },
      { en: 'All cluster stars formed at nearly the same time from the same cloud with the same composition, so their differences depend almost entirely on mass', ja: '星団の星はすべて、同じ組成の同じ雲からほぼ同時に形成されたので、その違いはほぼ完全に質量で決まるから' },
      { en: 'Clusters are the only places where fusion occurs', ja: '星団は融合が起こる唯一の場所だから' },
      { en: 'Gravity makes the stars evolve backward', ja: '重力が星を逆行して進化させるから' },
    ],
    answer: 1,
    explain: {
      en: 'Their coeval, same-composition origin isolates mass as the single variable.',
      ja: '同時代・同組成という起源が、質量を唯一の変数として切り出します。',
    },
  },
  {
    q: {
      en: 'What does the "onion skin" model describe just before a supergiant’s death?',
      ja: '「玉ねぎの皮」モデルは、超巨星の死の直前の何を表しますか。',
    },
    options: [
      { en: 'Dust shells blocking the starlight', ja: '星の光を遮る塵の殻' },
      { en: 'Concentric interior shells fusing progressively heavier elements (Si, O, Ne, C, He, H) at higher temperatures closer to the central iron core', ja: '中心の鉄の核に近いほど高温で、順に重い元素（Si, O, Ne, C, He, H）を融合する同心の内部の殻' },
      { en: 'Outer crusts from planetary collisions', ja: '惑星衝突による外殻' },
      { en: 'Alternating metallic-hydrogen and water-ice layers', ja: '金属水素と水の氷の交互の層' },
    ],
    answer: 1,
    explain: {
      en: 'Late massive-star evolution builds an onion-like shell structure around an inert iron core.',
      ja: '大質量星の末期の進化は、不活性な鉄の核の周りに玉ねぎ状の殻構造を作ります。',
    },
  },
  {
    q: {
      en: 'Why are "planetary nebulae" misnamed, and what are they really?',
      ja: 'なぜ「惑星状星雲」という名は誤りで、実際には何なのですか。',
    },
    options: [
      { en: 'They are protoplanetary disks forming gas giants', ja: '巨大ガス惑星を作る原始惑星系円盤である' },
      { en: 'Early observers thought their round greenish shapes resembled gas-giant planets, but they are expanding shells of ejected red-giant atmosphere lit by a hot central core', ja: '初期の観測者はその丸く緑がかった形が巨大ガス惑星に似ていると考えたが、実際は高温の中心核に照らされた、放出された赤色巨星の大気の膨張する殻である' },
      { en: 'They are dense asteroid clouds near the Galactic center', ja: '銀河中心近くの密な小惑星の雲である' },
      { en: 'They are ring systems from planets pulled into red giants', ja: '赤色巨星に引き込まれた惑星による環系である' },
    ],
    answer: 1,
    explain: {
      en: 'The name is a historical visual artifact; physically they are photoionized ejected stellar envelopes.',
      ja: 'その名は歴史的な見た目の産物であり、物理的には光電離された、放出された星の外層です。',
    },
  },
  {
    q: {
      en: 'How do the oldest globular-cluster turnoffs set a cosmological limit?',
      ja: '最も古い球状星団の転回点は、どのように宇宙論的な限界を定めますか。',
    },
    options: [
      { en: 'They prove the Milky Way is the oldest galaxy', ja: '天の川が最も古い銀河だと証明する' },
      { en: 'Globular turnoffs indicate ages of 11–13 billion years, setting a strict lower bound on the age of the Universe', ja: '球状星団の転回点は110〜130億年の年齢を示し、宇宙の年齢の厳しい下限を定める' },
      { en: 'They prove star formation stopped 10 billion years ago', ja: '星形成が100億年前に止まったと証明する' },
      { en: 'They show dark matter decays into red giants after 5 billion years', ja: 'ダークマターが50億年後に赤色巨星へ崩壊すると示す' },
    ],
    answer: 1,
    explain: {
      en: 'The oldest globulars give a firm minimum age for the cosmos.',
      ja: '最も古い球状星団は、宇宙の確かな最小年齢を与えます。',
    },
  },
  {
    q: {
      en: 'What is the cosmic origin of the carbon in life and the iron in our blood?',
      ja: '生命の炭素と私たちの血の鉄の、宇宙における起源は何ですか。',
    },
    options: [
      { en: 'Created in the Big Bang along with hydrogen and helium', ja: '水素やヘリウムとともにビッグバンで作られた' },
      { en: 'Carbon was forged by triple-alpha in red giants and iron fused in massive-star cores, then ejected when those stars died, recycling the elements into new star systems', ja: '炭素は赤色巨星でトリプルアルファにより作られ、鉄は大質量星の核で融合され、星が死ぬときに放出され、元素を新しい星系へ再循環させた' },
      { en: 'Condensed from cosmic rays in Earth’s atmosphere', ja: '地球の大気中の宇宙線から凝縮した' },
      { en: 'Made by solar flares 4.5 billion years ago', ja: '45億年前の太陽フレアで作られた' },
    ],
    answer: 1,
    explain: {
      en: 'Stellar nucleosynthesis plus mass loss enriches the interstellar medium, supplying the material for planets and life.',
      ja: '恒星の元素合成と質量放出が星間物質を富ませ、惑星と生命の材料を供給します。',
    },
  },
];

export default { easy, medium, hard };
