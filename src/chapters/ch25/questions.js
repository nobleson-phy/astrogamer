const easy = [
  {
    q: {
      en: "What is the approximate overall diameter of the Milky Way's thin stellar disk?",
      ja: '天の川銀河の薄い星の円盤のおおよその全体の直径はいくらですか。',
    },
    options: [
      { en: '10,000 light-years', ja: '1万光年' },
      { en: '26,000 light-years', ja: '2万6千光年' },
      { en: '100,000 light-years', ja: '10万光年' },
      { en: '1,000,000 light-years', ja: '100万光年' },
    ],
    answer: 2,
    explain: {
      en: 'The thin rotating stellar disk is about 100,000 light-years across and roughly 2,000 light-years thick.',
      ja: '薄く回転する星の円盤は差し渡し約10万光年、厚さはおよそ2,000光年です。',
    },
  },
  {
    q: {
      en: 'Why did Herschel (1785) wrongly conclude that the Sun lies near the center of the Galaxy?',
      ja: 'なぜハーシェル（1785年）は、太陽が銀河の中心近くにあると誤って結論したのですか。',
    },
    options: [
      { en: 'He measured the Galaxy with the 21-cm radio line', ja: '21cmの電波で銀河を測ったから' },
      { en: 'Interstellar dust obscured starlight, limiting his view to about 6,000 ly around the Sun in all directions', ja: '星間塵が星の光をさえぎり、太陽のまわり全方向に約6,000光年までしか見えなかったから' },
      { en: 'He counted only globular-cluster stars', ja: '球状星団の星だけを数えたから' },
      { en: 'He assumed the Milky Way was a spherical cluster', ja: '天の川が球状の星団だと仮定したから' },
    ],
    answer: 1,
    explain: {
      en: 'Dust blocked the view beyond about 6,000 light-years in every direction, making the Sun look central.',
      ja: '塵があらゆる方向で約6,000光年より先の視界をさえぎり、太陽が中心にあるように見せました。',
    },
  },
  {
    q: {
      en: 'Who mapped globular clusters with RR Lyrae variables to show that the Sun is far from the center?',
      ja: '球状星団をRRライラ型変光星で地図化し、太陽が中心から遠いことを示したのは誰ですか。',
    },
    options: [
      { en: 'Edwin Hubble', ja: 'エドウィン・ハッブル' },
      { en: 'Harlow Shapley', ja: 'ハーロー・シャプレー' },
      { en: 'Walter Baade', ja: 'ウォルター・バーデ' },
      { en: 'Andrea Ghez', ja: 'アンドレア・ゲズ' },
    ],
    answer: 1,
    explain: {
      en: 'Shapley (1917) used RR Lyrae in globular clusters as standard candles and found their center lies toward Sagittarius, offset from the Sun.',
      ja: 'シャプレー（1917年）は球状星団中のRRライラ型を標準光源として用い、その中心がいて座の方向にあり太陽からずれていることを突き止めました。',
    },
  },
  {
    q: {
      en: 'How far is the Sun from the central supermassive black hole?',
      ja: '太陽は中心の超大質量ブラックホールからどれくらい離れていますか。',
    },
    options: [
      { en: '500 light-years', ja: '500光年' },
      { en: '6,000 light-years', ja: '6,000光年' },
      { en: 'About 26,000 light-years', ja: '約2万6千光年' },
      { en: '100,000 light-years', ja: '10万光年' },
    ],
    answer: 2,
    explain: {
      en: 'The Sun is roughly 26,000 light-years (about 8 kpc) from the Galactic center.',
      ja: '太陽は銀河中心からおよそ2万6千光年（約8キロパーセク）の距離にあります。',
    },
  },
  {
    q: {
      en: 'Which minor arm, or spur, does the Sun lie in?',
      ja: '太陽はどの小さな腕（スパー）の中にありますか。',
    },
    options: [
      { en: 'The Perseus Arm', ja: 'ペルセウス腕' },
      { en: 'The Scutum-Centaurus Arm', ja: 'たて座・ケンタウルス腕' },
      { en: 'The Orion-Cygnus Arm (Orion Spur)', ja: 'オリオン・はくちょう腕（オリオン腕）' },
      { en: 'The Sagittarius Arm', ja: 'いて座腕' },
    ],
    answer: 2,
    explain: {
      en: 'The Sun sits in the Orion Spur, between the Sagittarius and Perseus arms.',
      ja: '太陽は、いて座腕とペルセウス腕の間にあるオリオン腕の中にあります。',
    },
  },
  {
    q: {
      en: 'Which wavelength maps cool atomic hydrogen across the disk right through the dust?',
      ja: '冷たい原子状水素を、塵を貫いて円盤全体にわたって地図化できる波長はどれですか。',
    },
    options: [
      { en: '0.1 nm (X-ray)', ja: '0.1nm（X線）' },
      { en: '21 centimeters', ja: '21センチメートル' },
      { en: '656.3 nm (H-alpha)', ja: '656.3nm（Hアルファ）' },
      { en: '10 meters', ja: '10メートル' },
    ],
    answer: 1,
    explain: {
      en: "Neutral hydrogen's 21-cm radio line passes through dust and traces the disk and spiral arms.",
      ja: '中性水素の21cm電波線は塵を透過し、円盤と渦巻腕をたどります。',
    },
  },
  {
    q: {
      en: 'What is the term for inner material orbiting faster than outer material, obeying Kepler’s third law?',
      ja: '内側の物質が外側より速くめぐり、ケプラーの第三法則に従う現象を何と呼びますか。',
    },
    options: [
      { en: 'Galactic precessional wobble', ja: '銀河の歳差によるふらつき' },
      { en: 'Synchronous rotation', ja: '同期回転' },
      { en: 'Differential galactic rotation', ja: '銀河の差動回転' },
      { en: 'Gravitational lensing', ja: '重力レンズ' },
    ],
    answer: 2,
    explain: {
      en: 'Differential rotation — stars closer in complete their orbits faster.',
      ja: '差動回転——内側の星ほど軌道を速く一周します。',
    },
  },
  {
    q: {
      en: 'About how long does it take the Sun to orbit the Galaxy once (a "galactic year")?',
      ja: '太陽が銀河を一周するのにおよそどれくらいかかりますか（「銀河年」）。',
    },
    options: [
      { en: '365 days', ja: '365日' },
      { en: '10 million years', ja: '1,000万年' },
      { en: '225 million years', ja: '2億2,500万年' },
      { en: '4.6 billion years', ja: '46億年' },
    ],
    answer: 2,
    explain: {
      en: 'At about 200 km/s the Sun takes roughly 225 million years per orbit.',
      ja: '約200km/sで進む太陽は、一周におよそ2億2,500万年かかります。',
    },
  },
  {
    q: {
      en: "Roughly what fraction of the Milky Way's mass is dark matter, mostly in the halo?",
      ja: '天の川銀河の質量のうち、主にハローにあるダークマターはおよそどれくらいの割合ですか。',
    },
    options: [
      { en: '15%', ja: '15%' },
      { en: '50%', ja: '50%' },
      { en: '75%', ja: '75%' },
      { en: '95%', ja: '95%' },
    ],
    answer: 3,
    explain: {
      en: 'Orbital-velocity measurements imply as much as 95% of the mass is invisible dark matter in the halo.',
      ja: '軌道速度の測定は、質量の最大95%がハロー中の見えないダークマターであることを示唆します。',
    },
  },
  {
    q: {
      en: 'What is the name of the bright radio source marking the central supermassive black hole?',
      ja: '中心の超大質量ブラックホールを示す明るい電波源の名前は何ですか。',
    },
    options: [
      { en: 'Cygnus X-1', ja: 'はくちょう座X-1' },
      { en: 'Sagittarius A* (Sgr A*)', ja: 'いて座A*（Sgr A*）' },
      { en: 'Omega Centauri', ja: 'オメガ・ケンタウリ' },
      { en: 'M87*', ja: 'M87*' },
    ],
    answer: 1,
    explain: {
      en: 'The radio source at the nucleus is Sagittarius A*.',
      ja: '核にある電波源はいて座A*です。',
    },
  },
  {
    q: {
      en: "What is the mass of Sgr A* from the star S2's 15.6-year orbit?",
      ja: '星S2の15.6年周期の軌道から求められるいて座A*の質量はいくらですか。',
    },
    options: [
      { en: '1,000 M☉', ja: '1,000 M☉' },
      { en: '100,000 M☉', ja: '10万 M☉' },
      { en: '4.6 million M☉', ja: '460万 M☉' },
      { en: '3.5 billion M☉', ja: '35億 M☉' },
    ],
    answer: 2,
    explain: {
      en: "S2's complete orbit yields about 4.6 million solar masses at the center.",
      ja: 'S2の完全な軌道は、中心に約460万太陽質量があることを示します。',
    },
  },
  {
    q: {
      en: 'Baade divided stars into Populations I and II using the Milky Way and which neighbor?',
      ja: 'バーデは天の川と、どの隣の銀河を使って星を種族Iと種族IIに分けましたか。',
    },
    options: [
      { en: 'The Large Magellanic Cloud', ja: '大マゼラン雲' },
      { en: 'The Andromeda Galaxy (M31)', ja: 'アンドロメダ銀河（M31）' },
      { en: 'Triangulum (M33)', ja: 'さんかく座銀河（M33）' },
      { en: 'The Sagittarius Dwarf', ja: 'いて座矮小銀河' },
    ],
    answer: 1,
    explain: {
      en: 'Wartime blackout skies let Baade resolve individual stars in M31, defining the two populations.',
      ja: '戦時の灯火管制で暗くなった空のおかげで、バーデはM31の個々の星を分解でき、2つの種族を定義しました。',
    },
  },
  {
    q: {
      en: 'Where do young, metal-rich Population I stars mostly live?',
      ja: '若く金属に富む種族Iの星は、主にどこに暮らしていますか。',
    },
    options: [
      { en: 'The spherical halo', ja: '球状のハロー' },
      { en: 'Globular clusters', ja: '球状星団' },
      { en: 'The thin disk and spiral arms', ja: '薄い円盤と渦巻腕' },
      { en: 'The dark-matter halo', ja: 'ダークマターのハロー' },
    ],
    answer: 2,
    explain: {
      en: 'Population I is young, metal-rich, and concentrated in the disk and arms where stars still form.',
      ja: '種族Iは若く金属に富み、今も星が生まれている円盤と腕に集中しています。',
    },
  },
  {
    q: {
      en: 'What is the closest known dwarf galaxy being accreted by the Milky Way?',
      ja: '天の川銀河に取り込まれつつある、最も近い既知の矮小銀河は何ですか。',
    },
    options: [
      { en: 'The Sagittarius Dwarf Galaxy', ja: 'いて座矮小銀河' },
      { en: 'The Canis Major Dwarf', ja: 'おおいぬ座矮小銀河' },
      { en: 'The Small Magellanic Cloud', ja: '小マゼラン雲' },
      { en: 'The Fornax Dwarf', ja: 'ろ座矮小銀河' },
    ],
    answer: 0,
    explain: {
      en: 'The Sagittarius Dwarf, about 50,000 ly from the center, is being torn apart by Galactic tides.',
      ja: '中心から約5万光年のいて座矮小銀河は、銀河の潮汐力で引き裂かれつつあります。',
    },
  },
  {
    q: {
      en: 'In how many billion years does the Milky Way begin merging with Andromeda?',
      ja: '天の川銀河は何十億年後にアンドロメダとの合体を始めますか。',
    },
    options: [
      { en: '100 million years', ja: '1億年' },
      { en: '1 billion years', ja: '10億年' },
      { en: '3 to 4 billion years', ja: '30億〜40億年' },
      { en: '20 billion years', ja: '200億年' },
    ],
    answer: 2,
    explain: {
      en: 'Simulations show the collision begins in 3 to 4 billion years, forming a giant elliptical over about 7 billion years.',
      ja: 'シミュレーションでは、衝突は30億〜40億年後に始まり、約70億年かけて巨大な楕円銀河を作ります。',
    },
  },
];

const medium = [
  {
    q: {
      en: 'Earth is 4.6 billion years old and a galactic year is 225 million years. How many galactic years has Earth completed?',
      ja: '地球は46億歳で、銀河年は2億2,500万年です。地球はいくつの銀河年を完了していますか。',
    },
    options: [
      { en: '2', ja: '2' },
      { en: '20', ja: '20' },
      { en: '200', ja: '200' },
      { en: '2,000', ja: '2,000' },
    ],
    answer: 1,
    explain: {
      en: '4,600 ÷ 225 ≈ 20 galactic years.',
      ja: '4,600 ÷ 225 ≈ 20 銀河年です。',
    },
  },
  {
    q: {
      en: 'Why are halo and globular-cluster stars very metal-poor compared with the Sun?',
      ja: 'なぜハローと球状星団の星は、太陽に比べて非常に金属に乏しいのですか。',
    },
    options: [
      { en: 'Radiation in the halo destroyed their heavy elements', ja: 'ハローの放射が重元素を破壊したから' },
      { en: 'They formed early, before generations of dying massive stars enriched the interstellar medium with heavy elements', ja: '死にゆく大質量星の世代が星間物質を重元素で富ませる前の、早い時期に生まれたから' },
      { en: 'Halo stars are too low-mass for nucleosynthesis', ja: 'ハローの星は低質量すぎて元素合成が起きないから' },
      { en: 'Disk dust absorbed their heavy elements', ja: '円盤の塵が重元素を吸収したから' },
    ],
    answer: 1,
    explain: {
      en: 'Population II formed 11 to 13 billion years ago from near-pristine hydrogen and helium gas, before enrichment.',
      ja: '種族IIは、まだ重元素で富む前の、ほぼ手つかずの水素とヘリウムのガスから110億〜130億年前に生まれました。',
    },
  },
  {
    q: {
      en: 'Why does the nuclear bulge hold old stars (more than 10 billion years) that are nonetheless metal-rich like the Sun?',
      ja: 'なぜ中心のバルジには、100億年以上と古いのに太陽のように金属に富む星があるのですか。',
    },
    options: [
      { en: 'They absorbed heavy elements from comets', ja: '彗星から重元素を吸収したから' },
      { en: 'Star formation in the dense bulge was extremely rapid early on, so early massive stars quickly enriched later generations', ja: '密なバルジでの星形成が初期に極めて速く進み、初期の大質量星が後の世代を素早く富ませたから' },
      { en: 'Bulge stars are white dwarfs making iron in their crusts', ja: 'バルジの星は地殻で鉄を作る白色矮星だから' },
      { en: 'Bulge stars are young Population I migrants from the disk', ja: 'バルジの星は円盤から移ってきた若い種族Iだから' },
    ],
    answer: 1,
    explain: {
      en: 'Rapid early star formation and quick supernova enrichment made even old bulge stars metal-rich.',
      ja: '初期の急速な星形成と素早い超新星による富化が、古いバルジの星さえ金属に富ませました。',
    },
  },
  {
    q: {
      en: "How do we know about 95% of the Milky Way's mass is dark matter beyond the visible disk?",
      ja: 'なぜ天の川銀河の質量の約95%が、見える円盤を超えて広がるダークマターだと分かるのですか。',
    },
    options: [
      { en: 'The Sun dims 95% each galactic year', ja: '太陽が銀河年ごとに95%暗くなるから' },
      { en: 'Rotation curves show orbital velocities of gas clouds and globular clusters stay high at large radii instead of declining as visible light would predict', ja: '回転曲線が、ガス雲や球状星団の軌道速度が、可視光から予想される減少ではなく、大きな半径でも高いままであることを示すから' },
      { en: 'X-ray satellites see millions of black holes locally', ja: 'X線衛星が近傍で何百万個ものブラックホールを見るから' },
      { en: 'The 21-cm line is absorbed in the outer halo', ja: '21cm線が外側のハローで吸収されるから' },
    ],
    answer: 1,
    explain: {
      en: 'A flat or rising rotation curve at large radius reveals a vast dark-matter halo.',
      ja: '大きな半径で平らな、あるいは上がっていく回転曲線が、広大なダークマターハローを明かします。',
    },
  },
  {
    q: {
      en: 'How does near-infrared tracking of stars around Sgr A* rule out a star cluster and prove a black hole?',
      ja: 'いて座A*のまわりの星の近赤外線追跡は、どのようにして星団を否定しブラックホールを証明しますか。',
    },
    options: [
      { en: 'Stars near Sgr A* move in straight lines at constant speed', ja: 'いて座A*の近くの星が一定の速さで直線運動するから' },
      { en: "S2's rapid 15.6-year orbit with Kepler's third law shows 4.6 million M☉ within 17 light-hours — a density so extreme any star cluster would collapse to a black hole within 100,000 years", ja: 'S2の速い15.6年周期の軌道とケプラーの第三法則が、17光時以内に460万M☉があることを示し——どんな星団も10万年以内にブラックホールへ崩壊するほど極端な密度だから' },
      { en: 'Infrared directly images the event horizon', ja: '赤外線が事象の地平面を直接撮像するから' },
      { en: 'The central mass emits zero gravity', ja: '中心の質量が重力をまったく出さないから' },
    ],
    answer: 1,
    explain: {
      en: 'The enclosed mass and tiny radius leave only a supermassive black hole.',
      ja: '囲い込まれた質量とごく小さな半径は、超大質量ブラックホールしか許しません。',
    },
  },
];

const hard = [
  {
    q: {
      en: "How did Shapley's globular-cluster mapping shift our place compared with Herschel's model?",
      ja: 'シャプレーの球状星団の地図化は、ハーシェルのモデルと比べて私たちの位置をどう変えましたか。',
    },
    options: [
      { en: 'It proved the Sun is the exact center of the universe', ja: '太陽が宇宙のちょうど中心だと証明した' },
      { en: 'It showed the Sun is in a nondescript off-center region about 26,000 ly from the Galactic center, overturning Herschel’s dust-biased sun-centered model', ja: '太陽が銀河中心から約2万6千光年離れた、特徴のない中心外の領域にあることを示し、塵に惑わされたハーシェルの太陽中心モデルを覆した' },
      { en: 'It proved the Milky Way is the only galaxy', ja: '天の川が唯一の銀河だと証明した' },
      { en: 'It showed globular clusters orbit the Sun', ja: '球状星団が太陽をめぐると示した' },
    ],
    answer: 1,
    explain: {
      en: 'Dust fooled Herschel into a central Sun; the dust-free halo globulars revealed the true off-center location.',
      ja: '塵がハーシェルを太陽中心だとだましましたが、塵のないハローの球状星団が本当の中心外の位置を明かしました。',
    },
  },
  {
    q: {
      en: 'Why are 21-cm radio and infrared essential while visible light fails for mapping the Galaxy?',
      ja: 'なぜ銀河を地図化するには可視光が役に立たず、21cm電波と赤外線が不可欠なのですか。',
    },
    options: [
      { en: 'Visible light is too slow to cross the Galaxy', ja: '可視光は銀河を横切るには遅すぎるから' },
      { en: 'Dust grains scatter and absorb visible light (dimming central light by about 10^12), while 21-cm and infrared wavelengths are longer than the grains and pass through the interstellar smog', ja: '塵の粒子が可視光を散乱・吸収する（中心の光を約10^12倍も暗くする）一方、21cmと赤外線は波長が粒子より長く、星間のもやを通り抜けるから' },
      { en: 'Radio and infrared are emitted only by dark matter', ja: '電波と赤外線はダークマターからしか出ないから' },
      { en: 'Visible light cannot be detected by ground telescopes', ja: '可視光は地上の望遠鏡では検出できないから' },
    ],
    answer: 1,
    explain: {
      en: 'Longer wavelengths slip past the dust that blocks visible light.',
      ja: 'より長い波長は、可視光をさえぎる塵をすり抜けます。',
    },
  },
  {
    q: {
      en: "How does the hierarchical-accretion model modify monolithic collapse for the Galaxy's origin?",
      ja: '階層的降着モデルは、銀河の起源について単一崩壊（モノリシック崩壊）をどう修正しますか。',
    },
    options: [
      { en: 'It proves the Milky Way never collapsed', ja: '天の川が決して崩壊しなかったと証明する' },
      { en: 'Monolithic collapse explains the initial cloud collapsing into halo and disk, but tidal streams from dwarf galaxies (Sagittarius, Canis Major) show the Galaxy kept growing by cannibalizing smaller satellites over cosmic time', ja: '単一崩壊は最初のガス雲がハローと円盤へ崩壊したことを説明するが、矮小銀河（いて座・おおいぬ座）からの潮汐流は、銀河が宇宙の時間をかけて小さな伴銀河を食べて成長し続けたことを示す' },
      { en: 'It shows disk stars are older than halo stars', ja: '円盤の星がハローの星より古いと示す' },
      { en: 'It shows the Milky Way never interacted with other galaxies', ja: '天の川が他の銀河と決して相互作用しなかったと示す' },
    ],
    answer: 1,
    explain: {
      en: 'The Galaxy formed both by early collapse and by ongoing mergers.',
      ja: '銀河は、初期の崩壊と現在も続く合体の両方で形づくられました。',
    },
  },
  {
    q: {
      en: 'What happens when the Milky Way and Andromeda merge in 3 to 4 billion years?',
      ja: '天の川とアンドロメダが30億〜40億年後に合体すると、何が起こりますか。',
    },
    options: [
      { en: 'They bounce off each other unchanged', ja: '互いに跳ね返り、変わらないままになる' },
      { en: 'Individual stars rarely collide (vast distances), but gas clouds compress into starbursts, tidal forces distort both galaxies, and they settle into a giant rounded elliptical', ja: '個々の星はめったに衝突しない（距離が広大だから）が、ガス雲は圧縮されてスターバーストになり、潮汐力が両方の銀河をゆがめ、巨大で丸い楕円銀河に落ち着く' },
      { en: 'All the stars collide and destroy each other', ja: 'すべての星が衝突して互いに破壊し合う' },
      { en: 'They become one perfectly flat thin-disk spiral with no halo', ja: 'ハローのない完全に平らな薄い円盤の渦巻銀河ひとつになる' },
    ],
    answer: 1,
    explain: {
      en: 'Stars pass through like smoke through a screen, the gas collides and bursts, and the result is an elliptical.',
      ja: '星は網を通る煙のようにすり抜け、ガスは衝突して爆発的に星を作り、結果は楕円銀河になります。',
    },
  },
  {
    q: {
      en: 'Why is the globular cluster M54 significant for galactic cannibalism?',
      ja: 'なぜ球状星団M54は、銀河の共食いにとって重要なのですか。',
    },
    options: [
      { en: 'It is the youngest open cluster in the disk', ja: '円盤の中で最も若い散開星団だから' },
      { en: 'It is the dense central nucleus of the Sagittarius Dwarf Galaxy, now being tidally stripped as its stars merge into the Milky Way’s halo', ja: 'いて座矮小銀河の密な中心核であり、その星が天の川のハローに取り込まれる中で潮汐的にはぎ取られつつあるから' },
      { en: "It is a supermassive black hole at Andromeda's center", ja: 'アンドロメダの中心にある超大質量ブラックホールだから' },
      { en: 'It is made entirely of dark matter', ja: '完全にダークマターでできているから' },
    ],
    answer: 1,
    explain: {
      en: "M54 is the Sagittarius Dwarf's nucleus — a caught-in-the-act example of accretion depositing clusters into the halo.",
      ja: 'M54はいて座矮小銀河の核です——降着が星団をハローへ置いていく、現行犯の実例です。',
    },
  },
];

export default { easy, medium, hard };
