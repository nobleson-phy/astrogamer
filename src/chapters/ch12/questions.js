const easy = [
  {
    q: {
      en: 'Why are the rings and moons of the outer planets made of radically different materials than the rocky inner solar system?',
      ja: '外惑星の環や衛星が、岩石質の内太陽系とは根本的に異なる物質でできているのはなぜですか。',
    },
    options: [
      { en: 'They were captured from interstellar space after the solar system formed.', ja: '太陽系の形成後に星間空間から捕獲されたから。' },
      { en: 'They formed in colder outer regions where large quantities of water ice were available as building materials.', ja: '大量の水の氷が材料として利用できる、より冷たい外側の領域で形成されたから。' },
      { en: 'Solar wind blew all the water ice out of the inner solar system.', ja: '太陽風が水の氷をすべて内太陽系から吹き飛ばしたから。' },
      { en: 'They are composed entirely of pure carbon-rich metals.', ja: '純粋な炭素に富む金属だけでできているから。' },
    ],
    answer: 1,
    explain: {
      en: 'They formed in the colder outer solar system, where abundant water ice was available as a building material.',
      ja: 'それらは、豊富な水の氷が材料として利用できた、より冷たい外太陽系で形成されました。',
    },
  },
  {
    q: {
      en: 'Which Galilean moon is the largest moon in the solar system, exceeding even Mercury in size?',
      ja: '太陽系最大の衛星で、水星さえ上回る大きさを持つガリレオ衛星はどれですか。',
    },
    options: [
      { en: 'Io', ja: 'イオ' },
      { en: 'Europa', ja: 'エウロパ' },
      { en: 'Ganymede', ja: 'ガニメデ' },
      { en: 'Callisto', ja: 'カリスト' },
    ],
    answer: 2,
    explain: {
      en: 'Ganymede is the largest moon in the solar system and is even bigger than the planet Mercury.',
      ja: 'ガニメデは太陽系最大の衛星で、惑星の水星よりも大きいです。',
    },
  },
  {
    q: {
      en: 'What is the primary energy source powering the continuous volcanic eruptions on Io?',
      ja: 'イオで続く火山噴火を支える主要なエネルギー源は何ですか。',
    },
    options: [
      { en: 'Radioactive decay of heavy elements in its core', ja: '核内の重元素の放射性崩壊' },
      { en: 'Tidal heating caused by Jupiter’s varying gravitational pull', ja: '木星の変化する重力による潮汐加熱' },
      { en: 'Solar radiation heating its dark surface', ja: '暗い表面を温める太陽放射' },
      { en: 'Magnetic interactions with the solar wind', ja: '太陽風との磁気的な相互作用' },
    ],
    answer: 1,
    explain: {
      en: 'Io’s volcanism is powered by tidal heating from Jupiter’s changing gravitational pull as Io orbits.',
      ja: 'イオの火山活動は、公転に伴う木星の変化する重力による潮汐加熱に支えられています。',
    },
  },
  {
    q: {
      en: 'Which Galilean moon is strongly believed to harbor a global subsurface liquid water ocean beneath its cracked, icy crust?',
      ja: 'ひび割れた氷の地殻の下に、全球的な地下の液体の水の海を持つと強く考えられているガリレオ衛星はどれですか。',
    },
    options: [
      { en: 'Io', ja: 'イオ' },
      { en: 'Europa', ja: 'エウロパ' },
      { en: 'Ganymede', ja: 'ガニメデ' },
      { en: 'Callisto', ja: 'カリスト' },
    ],
    answer: 1,
    explain: {
      en: 'Europa is thought to hide a global liquid water ocean beneath its cracked, icy crust.',
      ja: 'エウロパは、ひび割れた氷の地殻の下に全球的な液体の水の海を隠していると考えられています。',
    },
  },
  {
    q: {
      en: 'Which spacecraft made repeated close flybys of Jupiter’s Galilean moons to map their surfaces and geology?',
      ja: '木星のガリレオ衛星に繰り返し接近通過し、その表面と地質を地図化した探査機はどれですか。',
    },
    options: [
      { en: 'Voyager 1', ja: 'ボイジャー1号' },
      { en: 'Galileo', ja: 'ガリレオ' },
      { en: 'Cassini', ja: 'カッシーニ' },
      { en: 'New Horizons', ja: 'ニューホライズンズ' },
    ],
    answer: 1,
    explain: {
      en: 'The Galileo spacecraft made repeated close flybys of the Galilean moons to map their surfaces and geology.',
      ja: 'ガリレオ探査機はガリレオ衛星に繰り返し接近通過し、その表面と地質を地図化しました。',
    },
  },
  {
    q: {
      en: 'What is the dominant chemical component of the thick, dense atmosphere of Saturn’s moon Titan?',
      ja: '土星の衛星タイタンの厚く濃い大気の主要な化学成分は何ですか。',
    },
    options: [
      { en: 'Methane', ja: 'メタン' },
      { en: 'Carbon dioxide', ja: '二酸化炭素' },
      { en: 'Oxygen', ja: '酸素' },
      { en: 'Nitrogen', ja: '窒素' },
    ],
    answer: 3,
    explain: {
      en: 'Titan’s thick atmosphere is composed mainly of nitrogen, with methane as a minor component.',
      ja: 'タイタンの厚い大気は主に窒素で構成され、メタンは少量の成分です。',
    },
  },
  {
    q: {
      en: 'Which spacecraft deployed the Huygens probe, which landed on Titan in January 2005?',
      ja: '2005年1月にタイタンへ着陸したホイヘンス・プローブを投下した探査機はどれですか。',
    },
    options: [
      { en: 'Galileo', ja: 'ガリレオ' },
      { en: 'Voyager 2', ja: 'ボイジャー2号' },
      { en: 'Cassini', ja: 'カッシーニ' },
      { en: 'New Horizons', ja: 'ニューホライズンズ' },
    ],
    answer: 2,
    explain: {
      en: 'The Cassini spacecraft carried and deployed the Huygens probe, which landed on Titan in January 2005.',
      ja: 'カッシーニ探査機はホイヘンス・プローブを搭載して投下し、2005年1月にタイタンへ着陸させました。',
    },
  },
  {
    q: {
      en: 'Neptune’s large moon Triton is unique among the massive moons because of which orbital characteristic?',
      ja: '海王星の大きな衛星トリトンが、巨大衛星の中で独特なのはどの軌道の特徴によるものですか。',
    },
    options: [
      { en: 'It has a perfectly circular orbit.', ja: '完全な円軌道を持つ。' },
      { en: 'It orbits directly over Neptune’s equator.', ja: '海王星の赤道の真上を回る。' },
      { en: 'It orbits in a retrograde (backward) direction.', ja: '逆行（後ろ向き）の方向に公転する。' },
      { en: 'It takes exactly 88 days to complete one orbit.', ja: '1周するのにちょうど88日かかる。' },
    ],
    answer: 2,
    explain: {
      en: 'Triton is unique among the large moons because it orbits Neptune in a retrograde (backward) direction.',
      ja: 'トリトンは、海王星を逆行（後ろ向き）の方向に公転する点で大きな衛星の中で独特です。',
    },
  },
  {
    q: {
      en: 'Who discovered Pluto in 1930 at the Lowell Observatory using a systematic photographic search?',
      ja: '1930年にローウェル天文台で系統的な写真探索により冥王星を発見したのは誰ですか。',
    },
    options: [
      { en: 'Percival Lowell', ja: 'パーシヴァル・ローウェル' },
      { en: 'Clyde Tombaugh', ja: 'クライド・トンボー' },
      { en: 'Andrew Fraknoi', ja: 'アンドリュー・フラクノイ' },
      { en: 'David Morrison', ja: 'デイビッド・モリソン' },
    ],
    answer: 1,
    explain: {
      en: 'Clyde Tombaugh discovered Pluto in 1930 at the Lowell Observatory through a systematic photographic search.',
      ja: 'クライド・トンボーは1930年にローウェル天文台で系統的な写真探索により冥王星を発見しました。',
    },
  },
  {
    q: {
      en: 'What is the vast, smooth sea of frozen nitrogen on Pluto divided into convective polygonal cells?',
      ja: '冥王星にある、対流による多角形のセルに分かれた、広大で滑らかな凍った窒素の海は何ですか。',
    },
    options: [
      { en: 'Caloris Basin', ja: 'カロリス盆地' },
      { en: 'Mare Orientale', ja: '東の海（マーレ・オリエンターレ）' },
      { en: 'Sputnik Plains', ja: 'スプートニク平原' },
      { en: 'Discovery Scarp', ja: 'ディスカバリー断崖' },
    ],
    answer: 2,
    explain: {
      en: 'The Sputnik Plains is Pluto’s vast, smooth sea of frozen nitrogen divided into convective polygonal cells.',
      ja: 'スプートニク平原は、対流による多角形のセルに分かれた、冥王星の広大で滑らかな凍った窒素の海です。',
    },
  },
  {
    q: {
      en: 'Saturn’s ring system is composed primarily of billions of small particles made of:',
      ja: '土星の環の系は、主に何でできた数十億の小さな粒子で構成されていますか。',
    },
    options: [
      { en: 'Dark carbonaceous dust', ja: '暗い炭素質の塵' },
      { en: 'Water ice', ja: '水の氷' },
      { en: 'Liquid metallic hydrogen', ja: '液体金属水素' },
      { en: 'Silicate rock and iron', ja: 'ケイ酸塩の岩石と鉄' },
    ],
    answer: 1,
    explain: {
      en: 'Saturn’s rings are made primarily of billions of small particles of water ice.',
      ja: '土星の環は、主に数十億の小さな水の氷の粒子でできています。',
    },
  },
  {
    q: {
      en: 'What is the primary cause of the “Cassini Division,” the wide gap between Saturn’s A and B rings?',
      ja: '土星のA環とB環の間の広い隙間である「カッシーニの間隙」の主な原因は何ですか。',
    },
    options: [
      { en: 'The gravitational sweeping of a large shepherd moon orbiting inside the gap', ja: '隙間の中を回る大きな羊飼い衛星による重力的な掃き出し' },
      { en: 'Gravitational resonance with the moon Mimas, which continuously perturbs particles out of the gap', ja: '衛星ミマスとの重力共鳴が、粒子を絶えず隙間から追い出すこと' },
      { en: 'Powerful jets of gas erupting from Saturn’s equator', ja: '土星の赤道から噴き出す強力なガスのジェット' },
      { en: 'Ring particles in that region colliding and destroying each other', ja: 'その領域の環の粒子が衝突して互いに破壊し合うこと' },
    ],
    answer: 1,
    explain: {
      en: 'The Cassini Division is maintained by a gravitational resonance with Mimas that perturbs particles out of the gap.',
      ja: 'カッシーニの間隙は、粒子を隙間から追い出すミマスとの重力共鳴によって維持されています。',
    },
  },
  {
    q: {
      en: 'Which of Saturn’s moons replenishes the broad, tenuous E ring with fresh icy particles from geysers at its south pole?',
      ja: '南極の間欠泉から新鮮な氷の粒子を供給し、幅広く希薄なE環を補充している土星の衛星はどれですか。',
    },
    options: [
      { en: 'Titan', ja: 'タイタン' },
      { en: 'Mimas', ja: 'ミマス' },
      { en: 'Enceladus', ja: 'エンケラドゥス' },
      { en: 'Iapetus', ja: 'イアペトゥス' },
    ],
    answer: 2,
    explain: {
      en: 'Enceladus feeds the E ring with fresh icy particles from geysers erupting at its south pole.',
      ja: 'エンケラドゥスは、南極で噴き出す間欠泉からの新鮮な氷の粒子でE環を養っています。',
    },
  },
  {
    q: {
      en: 'How do the rings of Uranus and Neptune differ from Saturn’s?',
      ja: '天王星と海王星の環は、土星のものとどのように異なりますか。',
    },
    options: [
      { en: 'They are narrow, widely spaced, and composed of dark, radiation-darkened materials.', ja: '狭く、大きく離れて並び、放射で黒ずんだ暗い物質でできている。' },
      { en: 'They are much wider and brighter than Saturn’s rings.', ja: '土星の環よりもはるかに広く明るい。' },
      { en: 'They are composed of pure liquid water droplets.', ja: '純粋な液体の水滴でできている。' },
      { en: 'They are made of bright metallic iron-nickel fragments.', ja: '明るい金属の鉄・ニッケルの破片でできている。' },
    ],
    answer: 0,
    explain: {
      en: 'Unlike Saturn’s, the rings of Uranus and Neptune are narrow, widely spaced, and made of dark, radiation-darkened material.',
      ja: '土星とは異なり、天王星と海王星の環は狭く、大きく離れて並び、放射で黒ずんだ暗い物質でできています。',
    },
  },
  {
    q: {
      en: 'Which Galilean moon is the most distant from Jupiter, the most heavily cratered, and an ancient, geologically inactive, undifferentiated world?',
      ja: '木星から最も遠く、最もクレーターが多く、古く地質的に不活発で分化していない世界であるガリレオ衛星はどれですか。',
    },
    options: [
      { en: 'Io', ja: 'イオ' },
      { en: 'Europa', ja: 'エウロパ' },
      { en: 'Ganymede', ja: 'ガニメデ' },
      { en: 'Callisto', ja: 'カリスト' },
    ],
    answer: 3,
    explain: {
      en: 'Callisto is the outermost Galilean moon: heavily cratered, ancient, geologically inactive, and undifferentiated.',
      ja: 'カリストは最も外側のガリレオ衛星で、クレーターが多く、古く、地質的に不活発で、分化していません。',
    },
  },
];

const medium = [
  {
    q: {
      en: 'Per Kepler’s laws, how do orbital speeds of particles at the inner and outer edges of Saturn’s rings compare?',
      ja: 'ケプラーの法則によれば、土星の環の内縁と外縁にある粒子の公転速度はどのように比較されますか。',
    },
    options: [
      { en: 'All ring particles orbit at the exact same velocity to keep the rings stable.', ja: '環を安定させるため、すべての環の粒子はまったく同じ速度で公転する。' },
      { en: 'Particles at the inner edge orbit much faster than particles at the outer edge.', ja: '内縁の粒子は外縁の粒子よりもはるかに速く公転する。' },
      { en: 'Particles at the outer edge orbit faster because they have a larger circumference to cover.', ja: '外縁の粒子は回る円周が大きいため、より速く公転する。' },
      { en: 'The speeds fluctuate randomly depending on the gravity of the Sun.', ja: '速度は太陽の重力に応じてランダムに変動する。' },
    ],
    answer: 1,
    explain: {
      en: 'By Kepler’s laws, inner ring particles orbit faster than outer ones, since closer orbits have higher speeds.',
      ja: 'ケプラーの法則により、内側の軌道ほど速度が高いため、内縁の環の粒子は外縁のものより速く公転します。',
    },
  },
  {
    q: {
      en: 'Why does Titan have a thick atmosphere, whereas Ganymede—nearly identical in size and mass—has almost none?',
      ja: 'タイタンは厚い大気を持つのに、大きさと質量がほぼ同じガニメデにはほとんど大気がないのはなぜですか。',
    },
    options: [
      { en: 'Ganymede’s strong magnetic field swept its atmosphere into space.', ja: 'ガニメデの強い磁場が大気を宇宙へ掃き出したから。' },
      { en: 'Titan is much closer to Saturn, which gravitationally protects its atmosphere.', ja: 'タイタンが土星にずっと近く、重力的に大気を守っているから。' },
      { en: 'Titan is much colder, so gas molecules move more slowly and are more easily retained by its gravity.', ja: 'タイタンははるかに冷たく、ガス分子がゆっくり動くため、その重力で保持されやすいから。' },
      { en: 'Titan experiences continuous volcanic eruptions that release heavy iron gas.', ja: 'タイタンでは絶えず火山が噴火し、重い鉄のガスを放出しているから。' },
    ],
    answer: 2,
    explain: {
      en: 'Titan is far colder, so its gas molecules move slowly enough for its gravity to retain a thick atmosphere.',
      ja: 'タイタンははるかに冷たいため、ガス分子の動きが遅く、その重力で厚い大気を保持できます。',
    },
  },
  {
    q: {
      en: 'Triton is slowly spiralling inward toward Neptune and will eventually be torn apart. What explains this?',
      ja: 'トリトンはゆっくりと海王星へ向かって内側に螺旋を描き、やがて引き裂かれます。これを説明するのは何ですか。',
    },
    options: [
      { en: 'Neptune’s magnetic field is gradually dragging Triton’s metal core inward.', ja: '海王星の磁場がトリトンの金属核を徐々に内側へ引き込んでいる。' },
      { en: 'Triton’s highly eccentric orbit brings it closer to Neptune’s atmosphere during every pass.', ja: 'トリトンの非常に扁平な軌道が、通過のたびに海王星の大気に近づける。' },
      { en: 'Its retrograde orbit creates a tidal bulge on Neptune that acts as a gravitational drag, draining Triton’s orbital energy.', ja: 'その逆行軌道が海王星に潮汐の膨らみを作り、それが重力的な抵抗として働いてトリトンの軌道エネルギーを奪う。' },
      { en: 'Continuous impacts from Kuiper Belt objects are pushing Triton inward.', ja: 'カイパーベルト天体の絶え間ない衝突がトリトンを内側へ押している。' },
    ],
    answer: 2,
    explain: {
      en: 'Triton’s retrograde orbit raises a tidal bulge on Neptune that drags on it, draining its orbital energy over time.',
      ja: 'トリトンの逆行軌道は海王星に潮汐の膨らみを生じさせ、それが抵抗となって時間とともに軌道エネルギーを奪います。',
    },
  },
  {
    q: {
      en: 'Why must astronomers use infrared or radio telescopes, rather than visible-light, to study Titan’s surface and brown dwarfs in the Orion Nebula?',
      ja: 'タイタンの表面やオリオン星雲の褐色矮星を研究するのに、可視光ではなく赤外線や電波の望遠鏡を使わなければならないのはなぜですか。',
    },
    options: [
      { en: 'Visible light travels too slowly to make it out of the outer solar system.', ja: '可視光は遅すぎて外太陽系から出られないから。' },
      { en: 'These objects do not reflect or emit any electromagnetic radiation.', ja: 'これらの天体は電磁放射をまったく反射も放出もしないから。' },
      { en: 'Infrared and radio waves have longer wavelengths that can penetrate obscuring atmospheric haze and cosmic dust.', ja: '赤外線や電波は波長が長く、視界を遮る大気のもやや宇宙の塵を透過できるから。' },
      { en: 'Ground-based visible telescopes are blocked by Earth’s ionosphere.', ja: '地上の可視光望遠鏡は地球の電離圏に遮られるから。' },
    ],
    answer: 2,
    explain: {
      en: 'Longer-wavelength infrared and radio waves penetrate the haze and dust that block visible light from these objects.',
      ja: '波長の長い赤外線や電波は、これらの天体からの可視光を遮るもやや塵を透過します。',
    },
  },
  {
    q: {
      en: 'Standing on Pluto and watching its moon Charon over several weeks, what would you see?',
      ja: '冥王星に立って、その衛星カロンを数週間にわたり眺めていると、何が見えますか。',
    },
    options: [
      { en: 'Charon would rise in the east and set in the west every 24 hours.', ja: 'カロンは24時間ごとに東から昇り西へ沈む。' },
      { en: 'Charon would remain entirely stationary in the sky, never rising or setting.', ja: 'カロンは空に完全に静止したままで、昇ることも沈むこともない。' },
      { en: 'Charon would grow rapidly larger and smaller as its orbit is highly eccentric.', ja: 'カロンは軌道が非常に扁平なため、急速に大きくなったり小さくなったりする。' },
      { en: 'Charon would show a full cycle of phases every hour due to Pluto’s fast rotation.', ja: '冥王星の速い自転により、カロンは1時間ごとに満ち欠けの全周期を見せる。' },
    ],
    answer: 1,
    explain: {
      en: 'Pluto and Charon are mutually tidally locked, so Charon hangs motionless over one spot on Pluto, never rising or setting.',
      ja: '冥王星とカロンは互いに潮汐固定されているため、カロンは冥王星の一点の上に静止し、昇りも沈みもしません。',
    },
  },
];

const hard = [
  {
    q: {
      en: 'Why was Pluto reclassified from “major planet” to “dwarf planet,” despite New Horizons showing it to be a complex, active world?',
      ja: 'ニューホライズンズが冥王星を複雑で活動的な世界と示したにもかかわらず、冥王星が「主要惑星」から「準惑星」に再分類されたのはなぜですか。',
    },
    options: [
      { en: 'It was discovered to be made entirely of water ice rather than rock.', ja: '岩石ではなく水の氷だけでできていると判明したから。' },
      { en: 'It does not orbit the Sun directly and is instead considered a moon of Neptune.', ja: '太陽を直接回っておらず、海王星の衛星と見なされるから。' },
      { en: 'Its orbit is highly eccentric and it has not gravitationally “cleared its neighborhood” of other Kuiper Belt objects.', ja: '軌道が非常に扁平で、ほかのカイパーベルト天体を重力的に「軌道近傍から一掃」していないから。' },
      { en: 'It has a moon (Charon) that is nearly the same size as itself.', ja: '自身とほぼ同じ大きさの衛星（カロン）を持つから。' },
    ],
    answer: 2,
    explain: {
      en: 'Pluto is a dwarf planet because it has not gravitationally cleared its orbital neighborhood of other Kuiper Belt objects.',
      ja: '冥王星は、ほかのカイパーベルト天体を軌道近傍から重力的に一掃していないため準惑星とされます。',
    },
  },
  {
    q: {
      en: 'What is the astrobiological significance of subsurface oceans on Europa and hydrothermal geysers on Enceladus?',
      ja: 'エウロパの地下の海やエンケラドゥスの熱水の間欠泉が持つ、宇宙生物学的な意義は何ですか。',
    },
    options: [
      { en: 'It proves humans could colonize these moons without spacesuits.', ja: '人間が宇宙服なしにこれらの衛星に入植できることを証明する。' },
      { en: 'It demonstrates that water is the most common liquid in the universe.', ja: '水が宇宙で最も一般的な液体であることを示す。' },
      { en: 'It shows the essential ingredients for life—liquid water, biogenic elements, and an energy source—can exist far outside a star’s traditional habitable zone.', ja: '液体の水、生命に必要な元素、エネルギー源という生命に不可欠な要素が、恒星の従来のハビタブルゾーンのはるか外側にも存在しうることを示す。' },
      { en: 'It proves these moons were once part of Earth’s crust before a giant impact.', ja: 'これらの衛星が巨大衝突の前は地球の地殻の一部だったことを証明する。' },
    ],
    answer: 2,
    explain: {
      en: 'They show life’s key ingredients—liquid water, biogenic elements, and energy—can exist far outside a star’s habitable zone.',
      ja: 'それらは、液体の水・生命に必要な元素・エネルギーという生命の鍵となる要素が、恒星のハビタブルゾーンのはるか外側にも存在しうることを示します。',
    },
  },
  {
    q: {
      en: 'How do the “shepherd moons” Prometheus and Pandora maintain the narrow, sharp Saturn F ring, preventing particles from spreading into space?',
      ja: '「羊飼い衛星」プロメテウスとパンドラは、土星のF環を狭く鋭く保ち、粒子が宇宙へ広がるのをどのように防いでいますか。',
    },
    options: [
      { en: 'They physically sweep up any particles that drift out of the ring plane.', ja: '環の面から漂い出た粒子を物理的に掃き集める。' },
      { en: 'Their gravitational forces keep the ring particles confined to a narrow path.', ja: 'それらの重力が環の粒子を狭い経路に閉じ込めておく。' },
      { en: 'They continuously spray fresh ice onto the rings to glue the particles together.', ja: '新鮮な氷を環に絶えず吹きつけて粒子を接着する。' },
      { en: 'They emit powerful electrostatic charges that repel the ring particles.', ja: '強力な静電荷を放って環の粒子を反発させる。' },
    ],
    answer: 1,
    explain: {
      en: 'Prometheus and Pandora gravitationally shepherd the F ring, confining its particles to a narrow, sharp band.',
      ja: 'プロメテウスとパンドラは重力でF環を羊飼いのように制御し、粒子を狭く鋭い帯に閉じ込めています。',
    },
  },
  {
    q: {
      en: 'How did the Voyager 2 flyby of Triton and the Cassini mission to Enceladus revolutionize our understanding of “cold” outer worlds?',
      ja: 'ボイジャー2号のトリトン通過とカッシーニのエンケラドゥス探査は、「冷たい」外側の世界についての理解をどのように一変させましたか。',
    },
    options: [
      { en: 'They showed these worlds are actually as hot as Venus.', ja: 'これらの世界が実は金星と同じくらい熱いことを示した。' },
      { en: 'They proved that small, icy moons can maintain active geological activity and volcanism powered by tidal and chemical energy.', ja: '小さな氷の衛星が、潮汐や化学的なエネルギーに支えられて活発な地質活動や火山活動を維持できることを証明した。' },
      { en: 'They demonstrated that none of the outer moons have solid surfaces.', ja: '外側の衛星のどれもが固体表面を持たないことを示した。' },
      { en: 'They proved the outer solar system is entirely devoid of organic molecules.', ja: '外太陽系には有機分子がまったく存在しないことを証明した。' },
    ],
    answer: 1,
    explain: {
      en: 'They revealed that small, icy moons can stay geologically active, with volcanism driven by tidal and chemical energy.',
      ja: 'それらは、小さな氷の衛星が潮汐や化学的なエネルギーによる火山活動を伴って地質的に活動的でありうることを明らかにしました。',
    },
  },
  {
    q: {
      en: 'Why are the Sputnik Plains on Pluto considered geologically “young” (<100 million years), while surrounding regions are ancient?',
      ja: '冥王星のスプートニク平原が地質的に「若い」（1億年未満）とされる一方で、周囲の領域が古いのはなぜですか。',
    },
    options: [
      { en: 'High surface winds constantly sweep the plains clean of craters.', ja: '強い地表の風が平原のクレーターを絶えず掃き清めているから。' },
      { en: 'Convective rising of warm nitrogen ice continuously resurfaces the plains, erasing impact craters.', ja: '暖かい窒素の氷の対流的な上昇が平原を絶えず塗り替え、衝突クレーターを消し去るから。' },
      { en: 'Pluto’s gravity is too weak to attract meteors to its equatorial region.', ja: '冥王星の重力が弱すぎて赤道域に隕石を引き寄せられないから。' },
      { en: 'The plains are liquid water that has not yet had time to freeze.', ja: '平原はまだ凍る時間がなかった液体の水だから。' },
    ],
    answer: 1,
    explain: {
      en: 'Convection in the warm nitrogen ice continually resurfaces the Sputnik Plains, erasing craters and keeping it young.',
      ja: '暖かい窒素の氷の対流がスプートニク平原を絶えず塗り替え、クレーターを消して若く保っています。',
    },
  },
];

export default { easy, medium, hard };
