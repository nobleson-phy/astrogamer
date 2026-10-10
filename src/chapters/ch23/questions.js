const easy = [
  {
    q: {
      en: 'Which quantum principle forbids two electrons from sharing the same quantum state, giving the electron degeneracy pressure that holds up a white dwarf?',
      ja: '2つの電子が同じ量子状態を共有することを禁じ、白色矮星を支える電子縮退圧を生む量子原理はどれですか。',
    },
    options: [
      { en: 'Heisenberg uncertainty principle', ja: 'ハイゼンベルクの不確定性原理' },
      { en: 'Pauli exclusion principle', ja: 'パウリの排他原理' },
      { en: 'Stefan-Boltzmann law', ja: 'シュテファン・ボルツマンの法則' },
      { en: 'Equivalence principle', ja: '等価原理' },
    ],
    answer: 1,
    explain: {
      en: 'The Pauli exclusion principle forbids two electrons from occupying the same quantum state, creating the electron degeneracy pressure that supports a white dwarf.',
      ja: 'パウリの排他原理は2つの電子が同じ量子状態を占めることを禁じ、白色矮星を支える電子縮退圧を生みます。',
    },
  },
  {
    q: {
      en: 'What is the Chandrasekhar limit — the maximum mass of a stable white dwarf?',
      ja: 'チャンドラセカール限界——安定な白色矮星の最大質量——はいくらですか。',
    },
    options: [
      { en: '0.08 M☉', ja: '0.08 M☉' },
      { en: '1.4 M☉', ja: '1.4 M☉' },
      { en: '3.0 M☉', ja: '3.0 M☉' },
      { en: '8.0 M☉', ja: '8.0 M☉' },
    ],
    answer: 1,
    explain: {
      en: 'The Chandrasekhar limit is 1.4 solar masses, the upper mass a white dwarf supported by electron degeneracy can hold.',
      ja: 'チャンドラセカール限界は1.4太陽質量で、電子縮退で支えられる白色矮星が保てる上限の質量です。',
    },
  },
  {
    q: {
      en: 'As a white dwarf gains mass, what happens to its radius?',
      ja: '白色矮星が質量を得ると、その半径はどうなりますか。',
    },
    options: [
      { en: 'It increases with mass', ja: '質量とともに大きくなる' },
      { en: 'It stays unchanged', ja: '変わらない' },
      { en: 'It shrinks smaller as mass increases', ja: '質量が増えるほど小さく縮む' },
      { en: 'It expands into a planetary nebula', ja: '惑星状星雲へと膨張する' },
    ],
    answer: 2,
    explain: {
      en: 'Degenerate matter packs more tightly as mass grows, so adding mass shrinks the radius.',
      ja: '縮退した物質は質量が増えるほど密に詰まるので、質量を加えると半径は縮みます。',
    },
  },
  {
    q: {
      en: 'What is the ultimate fate of an isolated white dwarf after it radiates away all its thermal energy over billions of years?',
      ja: '孤立した白色矮星が何十億年もかけて熱エネルギーをすべて放射し尽くしたあとの、最終的な姿は何ですか。',
    },
    options: [
      { en: 'Red giant', ja: '赤色巨星' },
      { en: 'Neutron star', ja: '中性子星' },
      { en: 'Black dwarf', ja: '黒色矮星' },
      { en: 'Supernova remnant', ja: '超新星残骸' },
    ],
    answer: 2,
    explain: {
      en: 'A cooled, dark white-dwarf corpse is a black dwarf — none exist yet, because the Universe is not old enough.',
      ja: '冷えて暗くなった白色矮星の亡骸が黒色矮星です——宇宙はまだ十分に古くないので、ひとつも存在しません。',
    },
  },
  {
    q: {
      en: 'In a massive star (>8–10 M☉) just before core collapse, which element accumulates at the center of the onion shells?',
      ja: '大質量星（>8〜10 M☉）が核崩壊を起こす直前、玉ねぎの殻の中心に蓄積する元素はどれですか。',
    },
    options: [
      { en: 'Carbon', ja: '炭素' },
      { en: 'Silicon', ja: 'ケイ素' },
      { en: 'Oxygen', ja: '酸素' },
      { en: 'Iron', ja: '鉄' },
    ],
    answer: 3,
    explain: {
      en: 'Successive fusion shells build an inert iron core at the center.',
      ja: '次々と重なる融合の殻が、中心に不活性な鉄の核を作ります。',
    },
  },
  {
    q: {
      en: 'Why does fusion stop generating energy once the core is iron?',
      ja: '核が鉄になると、なぜ融合はエネルギーを生み出さなくなるのですか。',
    },
    options: [
      { en: 'Iron repels electrons', ja: '鉄が電子を反発するから' },
      { en: 'Iron has the most tightly bound nucleus, so fusing iron absorbs energy rather than releasing it', ja: '鉄は最も強く結合した原子核を持つので、鉄の融合はエネルギーを放出せず吸収するから' },
      { en: 'Iron becomes dark matter', ja: '鉄がダークマターになるから' },
      { en: 'Iron fissions into helium', ja: '鉄がヘリウムに核分裂するから' },
    ],
    answer: 1,
    explain: {
      en: 'Iron fusion is endothermic, depriving the core of pressure support.',
      ja: '鉄の融合は吸熱的で、核から圧力の支えを奪います。',
    },
  },
  {
    q: {
      en: 'In a Type II core-collapse supernova, which particles carry away more than 99% of the released energy?',
      ja: 'II型の核崩壊型超新星では、放出されるエネルギーの99%以上を運び去る粒子はどれですか。',
    },
    options: [
      { en: 'Positrons', ja: '陽電子' },
      { en: 'Neutrinos', ja: 'ニュートリノ' },
      { en: 'Photons', ja: '光子' },
      { en: 'Protons', ja: '陽子' },
    ],
    answer: 1,
    explain: {
      en: 'Electron capture floods the collapse with neutrinos, which carry over 99% of the energy.',
      ja: '電子捕獲が崩壊をニュートリノで満たし、それがエネルギーの99%以上を運びます。',
    },
  },
  {
    q: {
      en: 'What remnant forms when core collapse is halted by degenerate neutrons, packing 1.4–3 M☉ into about 20 km?',
      ja: '核崩壊が縮退した中性子で止められ、1.4〜3 M☉を約20 kmに詰め込んでできる残骸は何ですか。',
    },
    options: [
      { en: 'White dwarf', ja: '白色矮星' },
      { en: 'Brown dwarf', ja: '褐色矮星' },
      { en: 'Neutron star', ja: '中性子星' },
      { en: 'Black dwarf', ja: '黒色矮星' },
    ],
    answer: 2,
    explain: {
      en: 'Neutron degeneracy pressure halts the collapse, forming a neutron star about 20 km across.',
      ja: '中性子の縮退圧が崩壊を止め、直径約20 kmの中性子星を作ります。',
    },
  },
  {
    q: {
      en: 'Which 1987 supernova in the Large Magellanic Cloud gave the first core-collapse neutrino detection?',
      ja: '大マゼラン雲で起き、核崩壊型超新星のニュートリノを初めて検出させた1987年の超新星はどれですか。',
    },
    options: [
      { en: 'SN 1006', ja: 'SN 1006' },
      { en: 'SN 1054', ja: 'SN 1054' },
      { en: "SN 1604 (Kepler's)", ja: 'SN 1604（ケプラーの星）' },
      { en: 'SN 1987A', ja: 'SN 1987A' },
    ],
    answer: 3,
    explain: {
      en: 'SN 1987A yielded the first detected astrophysical neutrinos from a core collapse.',
      ja: 'SN 1987Aは、核崩壊から初めて検出された天体物理学的ニュートリノをもたらしました。',
    },
  },
  {
    q: {
      en: 'The Crab Nebula (M1) is the remnant of a supernova recorded by sky watchers in which year?',
      ja: 'かに星雲（M1）は、空を観る人々が何年に記録した超新星の残骸ですか。',
    },
    options: [
      { en: '1006 AD', ja: '西暦1006年' },
      { en: '1054 AD', ja: '西暦1054年' },
      { en: '1572 AD', ja: '西暦1572年' },
      { en: '1987 AD', ja: '西暦1987年' },
    ],
    answer: 1,
    explain: {
      en: 'Chinese astronomers recorded the 1054 AD "guest star" that made the Crab Nebula and its pulsar.',
      ja: '中国の天文学者が、かに星雲とそのパルサーを作った西暦1054年の「客星」を記録しました。',
    },
  },
  {
    q: {
      en: 'Who discovered the first pulsar in 1967 as a Cambridge graduate student?',
      ja: '1967年にケンブリッジの大学院生として最初のパルサーを発見したのは誰ですか。',
    },
    options: [
      { en: 'Cecilia Payne-Gaposchkin', ja: 'セシリア・ペイン＝ガポーシュキン' },
      { en: 'Jocelyn Bell', ja: 'ジョスリン・ベル' },
      { en: 'Margaret Burbidge', ja: 'マーガレット・バービッジ' },
      { en: 'Henrietta Leavitt', ja: 'ヘンリエッタ・リービット' },
    ],
    answer: 1,
    explain: {
      en: 'Jocelyn Bell found the first pulsar in 1967 while working with Antony Hewish.',
      ja: 'ジョスリン・ベルは、アントニー・ヒューイッシュと研究する中で1967年に最初のパルサーを見つけました。',
    },
  },
  {
    q: {
      en: 'In the lighthouse model, what is a pulsar?',
      ja: '灯台モデルにおいて、パルサーとは何ですか。',
    },
    options: [
      { en: 'A pulsating white dwarf with helium shell flashes', ja: 'ヘリウムの殻フラッシュを起こす脈動する白色矮星' },
      { en: 'A rapidly spinning, highly magnetized neutron star sweeping beams of radiation across space', ja: '放射のビームを宇宙に掃き出す、高速回転し強く磁化した中性子星' },
      { en: 'An accreting black hole pulsing as gas crosses the horizon', ja: 'ガスが地平線を越えるときに脈動する降着ブラックホール' },
      { en: 'A young protostar driving Herbig-Haro outflows', ja: 'ハービッグ・ハローの流出を駆動する若い原始星' },
    ],
    answer: 1,
    explain: {
      en: 'A pulsar is a rotating magnetized neutron star whose beamed radiation sweeps past Earth like a lighthouse.',
      ja: 'パルサーは回転する磁化した中性子星で、そのビーム状の放射が灯台のように地球をかすめて通り過ぎます。',
    },
  },
  {
    q: {
      en: 'What is the mild, recurring explosion when hydrogen from a companion accumulates on a white dwarf and flashes?',
      ja: '伴星からの水素が白色矮星に積もってフラッシュを起こす、穏やかで繰り返す爆発は何ですか。',
    },
    options: [
      { en: 'Type Ia supernova', ja: 'Ia型超新星' },
      { en: 'Type II supernova', ja: 'II型超新星' },
      { en: 'Nova', ja: '新星（ノヴァ）' },
      { en: 'Gamma-ray burst', ja: 'ガンマ線バースト' },
    ],
    answer: 2,
    explain: {
      en: 'Accreted hydrogen igniting on a white dwarf’s surface is a nova.',
      ja: '白色矮星の表面に積もった水素が点火するのが新星です。',
    },
  },
  {
    q: {
      en: 'How do Type Ia supernovae differ spectroscopically from Type II?',
      ja: 'Ia型超新星はII型と、スペクトルの上でどう違いますか。',
    },
    options: [
      { en: 'Ia show strong hydrogen lines, II do not', ja: 'Ia型は強い水素線を示し、II型は示さない' },
      { en: 'Ia lack hydrogen lines and show strong silicon absorption lines', ja: 'Ia型は水素線を欠き、強いケイ素の吸収線を示す' },
      { en: 'Ia emit only infrared', ja: 'Ia型は赤外線しか放射しない' },
      { en: 'Ia occur only in young globular clusters', ja: 'Ia型は若い球状星団でしか起きない' },
    ],
    answer: 1,
    explain: {
      en: 'Type Ia come from carbon-oxygen white dwarfs (no hydrogen) and show silicon from carbon fusion.',
      ja: 'Ia型は炭素・酸素の白色矮星（水素なし）から生じ、炭素の融合によるケイ素を示します。',
    },
  },
  {
    q: {
      en: 'Short-duration gamma-ray bursts (under 2 seconds) are produced mainly by what?',
      ja: '短時間（2秒未満）のガンマ線バーストは、主に何によって生じますか。',
    },
    options: [
      { en: 'Collapse of single massive blue supergiants', ja: '単独の大質量青色超巨星の崩壊' },
      { en: 'The merger of two compact corpses (two neutron stars, or a neutron star and a black hole)', ja: '2つのコンパクトな亡骸（2つの中性子星、または中性子星とブラックホール）の合体' },
      { en: 'The helium flash in low-mass red giants', ja: '低質量の赤色巨星でのヘリウムフラッシュ' },
      { en: 'Solar flares from G-type stars', ja: 'G型星からの太陽フレア' },
    ],
    answer: 1,
    explain: {
      en: 'Short GRBs come from binary compact-object mergers.',
      ja: '短いGRBは、連星をなすコンパクト天体の合体から生じます。',
    },
  },
];

const medium = [
  {
    q: {
      en: 'What happens to a white dwarf that accretes past the 1.4 M☉ Chandrasekhar limit?',
      ja: '1.4 M☉のチャンドラセカール限界を超えて降着した白色矮星はどうなりますか。',
    },
    options: [
      { en: 'It collapses into a stable neutron star, shedding a planetary nebula', ja: '惑星状星雲を脱ぎ捨て、安定な中性子星に崩壊する' },
      { en: 'Carbon fusion ignites explosively throughout (Type Ia), completely destroying the white dwarf with no remnant', ja: '炭素融合が全体で爆発的に点火し（Ia型）、白色矮星を残骸も残さず完全に破壊する' },
      { en: 'It expands into a red supergiant, resuming hydrogen fusion', ja: '赤色超巨星へ膨張し、水素融合を再開する' },
      { en: 'It quietly becomes a cold black dwarf', ja: '静かに冷たい黒色矮星になる' },
    ],
    answer: 1,
    explain: {
      en: 'Crossing 1.4 M☉ triggers runaway carbon fusion that destroys the whole star.',
      ja: '1.4 M☉を超えると暴走する炭素融合が起き、星全体を破壊します。',
    },
  },
  {
    q: {
      en: 'Why does a collapsing core spin up from once a month to hundreds of times per second?',
      ja: '崩壊する核は、なぜ1か月に1回から1秒に数百回へと回転を速めるのですか。',
    },
    options: [
      { en: 'It absorbs rotational energy from escaping neutrinos', ja: '逃げるニュートリノから回転エネルギーを吸収するから' },
      { en: 'Conservation of angular momentum — shrinking the radius about 100,000× forces the spin rate up dramatically', ja: '角運動量の保存——半径を約10万分の1に縮めると、回転速度が劇的に上がるから' },
      { en: 'Magnetic fields push the outer layers backward', ja: '磁場が外層を後ろ向きに押すから' },
      { en: 'Iron fusion releases kinetic energy', ja: '鉄の融合が運動エネルギーを放出するから' },
    ],
    answer: 1,
    explain: {
      en: 'Conserving angular momentum while collapsing from about 7,000 km to about 10 km hugely accelerates the spin.',
      ja: '約7,000 kmから約10 kmへ崩壊する間に角運動量が保存され、回転が大きく加速します。',
    },
  },
  {
    q: {
      en: 'Why do we detect pulsars in only a small fraction of the roughly 100 million neutron stars in the Galaxy?',
      ja: '銀河系にある約1億個の中性子星のうち、なぜごく一部でしかパルサーを検出できないのですか。',
    },
    options: [
      { en: 'Most neutron stars lack gravity and float away', ja: 'ほとんどの中性子星は重力を欠いて漂い去るから' },
      { en: 'A neutron star is seen as a pulsar only if its narrow beam sweeps across Earth’s line of sight, and its spin slows over millions of years until emission ceases', ja: '中性子星は、その細いビームが地球の視線を横切るときだけパルサーとして見え、さらに回転は数百万年かけて遅くなり放射が止まるから' },
      { en: 'Pulsars exist only in binaries with supermassive black holes', ja: 'パルサーは超大質量ブラックホールとの連星にしか存在しないから' },
      { en: 'Neutron stars absorb all radio waves', ja: '中性子星はすべての電波を吸収するから' },
    ],
    answer: 1,
    explain: {
      en: 'Beaming geometry plus magnetic spin-down limit observable pulsars to a small fraction.',
      ja: 'ビームの幾何学と磁気による回転の減速が、観測できるパルサーをごく一部に限ります。',
    },
  },
  {
    q: {
      en: 'Which radioactive decay sequence kept SN 1987A’s debris glowing for months?',
      ja: 'SN 1987Aの破片を何か月も輝かせ続けた放射性崩壊の系列はどれですか。',
    },
    options: [
      { en: 'Uranium-238 → Lead-206', ja: 'ウラン238 → 鉛206' },
      { en: 'Nickel-56 → Cobalt-56 → stable Iron-56', ja: 'ニッケル56 → コバルト56 → 安定な鉄56' },
      { en: 'Carbon-14 → Nitrogen-14', ja: '炭素14 → 窒素14' },
      { en: 'Hydrogen-1 fusing to Helium-4', ja: '水素1がヘリウム4に融合' },
    ],
    answer: 1,
    explain: {
      en: 'Decay of ⁵⁶Ni (6 days) to ⁵⁶Co (77 days) to stable ⁵⁶Fe powers the light curve.',
      ja: '⁵⁶Ni（6日）から⁵⁶Co（77日）、そして安定な⁵⁶Feへの崩壊が光度曲線を支えます。',
    },
  },
  {
    q: {
      en: 'Why are long-duration gamma-ray bursts (over 2 seconds) seen in active star-forming regions?',
      ja: '長時間（2秒以上）のガンマ線バーストは、なぜ活発な星形成領域で見られるのですか。',
    },
    options: [
      { en: 'Long GRBs come from massive stars (collapsars/hypernovae) that die very quickly, near where they were born', ja: '長いGRBは、生まれた場所の近くで非常に速く死ぬ大質量星（コラプサー／ハイパーノヴァ）から生じるから' },
      { en: 'Star-forming regions contain dark matter that converts gamma rays to visible light', ja: '星形成領域には、ガンマ線を可視光に変えるダークマターがあるから' },
      { en: 'White dwarfs collide only in giant molecular clouds', ja: '白色矮星は巨大分子雲の中でしか衝突しないから' },
      { en: 'Old Population II stars absorb gamma rays in elliptical galaxies', ja: '古い種族IIの星が楕円銀河でガンマ線を吸収するから' },
    ],
    answer: 0,
    explain: {
      en: 'Short-lived very massive stars explode as hypernovae near their birth sites in star-forming regions.',
      ja: '寿命の短い非常に重い星が、星形成領域の誕生地の近くでハイパーノヴァとして爆発します。',
    },
  },
];

const hard = [
  {
    q: {
      en: 'How are core-collapse supernovae and neutron-star mergers the universe’s "cosmic alchemy" engines?',
      ja: '核崩壊型超新星と中性子星の合体は、どのように宇宙の「錬金術」の原動力なのですか。',
    },
    options: [
      { en: 'They destroy heavy elements, reverting them to pure H and He', ja: '重元素を破壊し、純粋な水素とヘリウムに戻すから' },
      { en: 'They synthesize elements heavier than iron (gold, silver, uranium) via rapid neutron capture and disperse them into the ISM to enrich future planetary systems', ja: '急速な中性子捕獲によって鉄より重い元素（金・銀・ウラン）を合成し、それを星間物質にまき散らして未来の惑星系を富ませるから' },
      { en: 'They generate oceans that cool the ISM', ja: '星間物質を冷やす海を生み出すから' },
      { en: 'They convert dark matter into main-sequence stars', ja: 'ダークマターを主系列星に変えるから' },
    ],
    answer: 1,
    explain: {
      en: 'These explosions and collisions drive r-process nucleosynthesis, creating and spreading elements heavier than iron.',
      ja: 'これらの爆発と衝突がr過程の元素合成を駆動し、鉄より重い元素を作って広げます。',
    },
  },
  {
    q: {
      en: 'Why does electron degeneracy support white dwarfs to 1.4 M☉ but neutron degeneracy support neutron stars to about 3 M☉?',
      ja: 'なぜ電子縮退は白色矮星を1.4 M☉まで支え、中性子縮退は中性子星を約3 M☉まで支えるのですか。',
    },
    options: [
      { en: 'Electrons are positive, neutrons neutral', ja: '電子は正、中性子は中性だから' },
      { en: 'Neutrons are about 1,800× more massive than electrons, so they can be squeezed into a much smaller volume before degeneracy pressure halts collapse', ja: '中性子は電子より約1,800倍重いので、縮退圧が崩壊を止めるまでにはるかに小さな体積に押し込められるから' },
      { en: 'Electrons fuse, neutrons do not', ja: '電子は融合し、中性子は融合しないから' },
      { en: 'White dwarfs feel no gravity', ja: '白色矮星は重力を感じないから' },
    ],
    answer: 1,
    explain: {
      en: 'The far greater neutron mass gives a smaller quantum wavelength, allowing densities of about 10^14 g/cm³ and a higher mass limit.',
      ja: 'はるかに大きな中性子の質量が小さな量子波長を与え、約10^14 g/cm³の密度とより高い質量限界を許します。',
    },
  },
  {
    q: {
      en: 'How did the 2017 joint detection of gravitational waves and a short GRB (GW170817 / GRB 170817A) from colliding neutron stars confirm our models?',
      ja: '2017年に中性子星の衝突から重力波と短いGRB（GW170817／GRB 170817A）が同時に検出されたことは、どのようにモデルを裏づけましたか。',
    },
    options: [
      { en: 'It proved black holes do not exist', ja: 'ブラックホールが存在しないと証明した' },
      { en: 'It gave definitive multi-messenger proof that short GRBs come from neutron-star mergers and that these collisions synthesize heavy elements like gold and platinum in a kilonova', ja: '短いGRBが中性子星の合体から生じること、そしてその衝突がキロノヴァで金やプラチナのような重元素を合成することを、マルチメッセンジャーで決定的に証明した' },
      { en: 'It proved gamma rays travel faster than light', ja: 'ガンマ線が光より速く進むと証明した' },
      { en: 'It showed neutron stars become red giants when they merge', ja: '中性子星は合体すると赤色巨星になると示した' },
    ],
    answer: 1,
    explain: {
      en: 'Combining gravitational-wave and electromagnetic signals confirmed neutron-star-merger GRBs and kilonova heavy-element synthesis.',
      ja: '重力波と電磁波の信号を合わせることで、中性子星合体によるGRBとキロノヴァでの重元素合成が裏づけられました。',
    },
  },
  {
    q: {
      en: 'Why is a Type Ia a superior "standard candle" compared with a Type II?',
      ja: 'なぜIa型は、II型に比べて優れた「標準光源」なのですか。',
    },
    options: [
      { en: 'Ia always occur at the Milky Way’s center', ja: 'Ia型は常に天の川の中心で起きるから' },
      { en: 'Because a Type Ia occurs when a carbon-oxygen white dwarf reaches the fixed 1.4 M☉ Chandrasekhar limit, its mass and explosion energy are virtually identical every time, giving a consistent peak luminosity', ja: 'Ia型は炭素・酸素の白色矮星が決まった1.4 M☉のチャンドラセカール限界に達したときに起きるので、質量も爆発エネルギーも毎回ほぼ同じになり、一定のピーク光度を与えるから' },
      { en: 'Type II emit no visible light', ja: 'II型は可視光を放射しないから' },
      { en: 'Ia last billions of years without fading', ja: 'Ia型は何十億年も衰えずに続くから' },
    ],
    answer: 1,
    explain: {
      en: 'The standardized detonation mass yields a consistent peak absolute magnitude, ideal for distances.',
      ja: '標準化された爆発質量が一定のピーク絶対等級を与え、距離測定に理想的です。',
    },
  },
  {
    q: {
      en: 'How does a "millisecond pulsar" get its extremely rapid spin even though old pulsars slow down?',
      ja: '古いパルサーは遅くなるのに、「ミリ秒パルサー」はどうやって極めて速い回転を得るのですか。',
    },
    options: [
      { en: 'It absorbs cosmic rays from supermassive black holes', ja: '超大質量ブラックホールからの宇宙線を吸収するから' },
      { en: 'In a close binary, material transferred from an expanding companion falls onto the neutron star, transferring angular momentum and "spinning it back up"', ja: '近接連星で、膨張する伴星から移された物質が中性子星に落ち、角運動量を移して「再び加速する」から' },
      { en: 'It undergoes core contraction every 1,000 years', ja: '1,000年ごとに核が収縮するから' },
      { en: 'High surface temperatures reverse the magnetic field', ja: '高い表面温度が磁場を反転させるから' },
    ],
    answer: 1,
    explain: {
      en: 'Accretion from a companion transfers angular momentum, recycling the pulsar to millisecond periods.',
      ja: '伴星からの降着が角運動量を移し、パルサーをミリ秒周期へと再生します。',
    },
  },
];

export default { easy, medium, hard };
