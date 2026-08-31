const easy = [
  {
    q: {
      en: 'Which spacecraft performed the “Grand Tour” of all four giant planets and remains the only mission to visit Uranus and Neptune?',
      ja: '4つの巨大惑星すべてを巡る「グランドツアー」を行い、天王星と海王星を訪れた唯一の探査機として残っているのはどれですか。',
    },
    options: [
      { en: 'Pioneer 11', ja: 'パイオニア11号' },
      { en: 'Voyager 1', ja: 'ボイジャー1号' },
      { en: 'Voyager 2', ja: 'ボイジャー2号' },
      { en: 'Cassini', ja: 'カッシーニ' },
    ],
    answer: 2,
    explain: {
      en: 'Voyager 2 made the “Grand Tour” of all four giant planets and is still the only spacecraft to have visited Uranus and Neptune.',
      ja: 'ボイジャー2号は4つの巨大惑星すべてを巡る「グランドツアー」を行い、天王星と海王星を訪れた唯一の探査機です。',
    },
  },
  {
    q: {
      en: 'In giant-planet composition terminology, what do astronomers mean by “gases”?',
      ja: '巨大惑星の組成の用語で、天文学者が「ガス」と呼ぶものは何を指しますか。',
    },
    options: [
      { en: 'Volatile organic compounds of silicon and iron', ja: 'ケイ素と鉄の揮発性有機化合物' },
      { en: 'Compounds containing oxygen, carbon, and nitrogen', ja: '酸素・炭素・窒素を含む化合物' },
      { en: 'Primarily hydrogen and helium', ja: '主に水素とヘリウム' },
      { en: 'Water vapor and vaporized rocks', ja: '水蒸気と気化した岩石' },
    ],
    answer: 2,
    explain: {
      en: 'In giant-planet chemistry, “gases” refers primarily to hydrogen and helium.',
      ja: '巨大惑星の化学では、「ガス」は主に水素とヘリウムを指します。',
    },
  },
  {
    q: {
      en: 'In the chemistry of the giant planets, which is categorized as an “ice”?',
      ja: '巨大惑星の化学において、「氷」に分類されるのはどれですか。',
    },
    options: [
      { en: 'Hydrogen', ja: '水素' },
      { en: 'Helium', ja: 'ヘリウム' },
      { en: 'Silicon', ja: 'ケイ素' },
      { en: 'Methane', ja: 'メタン' },
    ],
    answer: 3,
    explain: {
      en: 'In giant-planet terminology, methane (along with water and ammonia) is classified as an “ice.”',
      ja: '巨大惑星の用語では、メタンは（水やアンモニアとともに）「氷」に分類されます。',
    },
  },
  {
    q: {
      en: 'Which spacecraft deployed an entry probe that descended by parachute into Jupiter’s clouds on December 7, 1995?',
      ja: '1995年12月7日に木星の雲へパラシュートで降下する突入プローブを投下した探査機はどれですか。',
    },
    options: [
      { en: 'Voyager 1', ja: 'ボイジャー1号' },
      { en: 'Galileo', ja: 'ガリレオ' },
      { en: 'Cassini', ja: 'カッシーニ' },
      { en: 'Juno', ja: 'ジュノー' },
    ],
    answer: 1,
    explain: {
      en: 'The Galileo spacecraft released an entry probe that parachuted into Jupiter’s clouds on December 7, 1995.',
      ja: 'ガリレオ探査機は、1995年12月7日に木星の雲へパラシュートで降下する突入プローブを放出しました。',
    },
  },
  {
    q: {
      en: 'Which giant planet has a mass exceeding that of all the other planets combined?',
      ja: 'ほかのすべての惑星を合わせたよりも大きな質量を持つ巨大惑星はどれですか。',
    },
    options: [
      { en: 'Saturn', ja: '土星' },
      { en: 'Jupiter', ja: '木星' },
      { en: 'Uranus', ja: '天王星' },
      { en: 'Neptune', ja: '海王星' },
    ],
    answer: 1,
    explain: {
      en: 'Jupiter’s mass exceeds that of all the other planets in the solar system combined.',
      ja: '木星の質量は、太陽系のほかのすべての惑星を合わせたよりも大きいです。',
    },
  },
  {
    q: {
      en: 'The primary visible clouds of Jupiter and Saturn are frozen crystals of which substance?',
      ja: '木星と土星の主要な可視の雲は、どの物質の凍った結晶ですか。',
    },
    options: [
      { en: 'Water', ja: '水' },
      { en: 'Methane', ja: 'メタン' },
      { en: 'Ammonia', ja: 'アンモニア' },
      { en: 'Carbon dioxide', ja: '二酸化炭素' },
    ],
    answer: 2,
    explain: {
      en: 'The main visible clouds of Jupiter and Saturn are made of frozen ammonia crystals.',
      ja: '木星と土星の主要な可視の雲は、凍ったアンモニアの結晶でできています。',
    },
  },
  {
    q: {
      en: 'What planet-wide cloud structure was found around Saturn’s north pole, with six sides each longer than Earth’s diameter?',
      ja: '土星の北極周辺で見つかった、それぞれの辺が地球の直径より長い6つの辺を持つ惑星規模の雲構造は何ですか。',
    },
    options: [
      { en: 'A great dark spot', ja: '大暗斑' },
      { en: 'A double-ringed oval storm', ja: '二重の輪を持つ楕円形の嵐' },
      { en: 'A hexagonal wave pattern', ja: '六角形の波状パターン' },
      { en: 'A giant spiral plume', ja: '巨大な渦巻き状のプルーム' },
    ],
    answer: 2,
    explain: {
      en: 'Saturn’s north pole is encircled by a hexagonal wave pattern, each side longer than Earth’s diameter.',
      ja: '土星の北極は、それぞれの辺が地球の直径より長い六角形の波状パターンに囲まれています。',
    },
  },
  {
    q: {
      en: 'What is the process where solar ultraviolet light drives chemical reactions among atmospheric gases to make the organic compounds that colour Jupiter’s clouds?',
      ja: '太陽の紫外線が大気ガスの化学反応を促し、木星の雲を色づける有機化合物を作り出す過程は何ですか。',
    },
    options: [
      { en: 'Hydrostatic condensation', ja: '静水圧凝縮' },
      { en: 'Synchrotron radiation', ja: 'シンクロトロン放射' },
      { en: 'Photochemistry', ja: '光化学反応' },
      { en: 'Convective differentiation', ja: '対流分化' },
    ],
    answer: 2,
    explain: {
      en: 'Photochemistry—chemical reactions driven by solar ultraviolet light—produces the organic compounds that colour Jupiter’s clouds.',
      ja: '太陽の紫外線が駆動する化学反応である光化学反応が、木星の雲を色づける有機化合物を生み出します。',
    },
  },
  {
    q: {
      en: 'Which giant planet has a spin axis tilted 98° from perpendicular to its orbit, spinning nearly on its side?',
      ja: '自転軸が軌道面に対する垂直から98°傾き、ほぼ横倒しで自転している巨大惑星はどれですか。',
    },
    options: [
      { en: 'Saturn', ja: '土星' },
      { en: 'Jupiter', ja: '木星' },
      { en: 'Uranus', ja: '天王星' },
      { en: 'Neptune', ja: '海王星' },
    ],
    answer: 2,
    explain: {
      en: 'Uranus has a spin axis tilted about 98°, so it rotates nearly on its side.',
      ja: '天王星は自転軸が約98°傾いており、ほぼ横倒しで自転しています。',
    },
  },
  {
    q: {
      en: 'Approximate orbital period of Saturn around the Sun?',
      ja: '太陽を回る土星のおおよその公転周期はどれくらいですか。',
    },
    options: [
      { en: '12 years', ja: '12年' },
      { en: '30 years', ja: '30年' },
      { en: '84 years', ja: '84年' },
      { en: '165 years', ja: '165年' },
    ],
    answer: 1,
    explain: {
      en: 'Saturn takes about 30 years to complete one orbit around the Sun.',
      ja: '土星は太陽を1周するのに約30年かかります。',
    },
  },
  {
    q: {
      en: 'The blue colours of Uranus and Neptune come from sunlight scattering plus absorption by which gas?',
      ja: '天王星と海王星の青い色は、日光の散乱に加え、どのガスによる吸収から生じますか。',
    },
    options: [
      { en: 'Helium', ja: 'ヘリウム' },
      { en: 'Methane', ja: 'メタン' },
      { en: 'Ammonia', ja: 'アンモニア' },
      { en: 'Nitrogen', ja: '窒素' },
    ],
    answer: 1,
    explain: {
      en: 'Methane absorbs red light, so with scattered sunlight it gives Uranus and Neptune their blue colour.',
      ja: 'メタンが赤い光を吸収するため、散乱した日光と相まって天王星と海王星は青く見えます。',
    },
  },
  {
    q: {
      en: 'Maximum wind speeds measured near Saturn’s equator?',
      ja: '土星の赤道付近で測定された最大風速はどれくらいですか。',
    },
    options: [
      { en: '400 km/h', ja: '時速400 km' },
      { en: '1,000 km/h', ja: '時速1,000 km' },
      { en: '1,800 km/h', ja: '時速1,800 km' },
      { en: '2,500 km/h', ja: '時速2,500 km' },
    ],
    answer: 2,
    explain: {
      en: 'Winds near Saturn’s equator reach speeds of about 1,800 km/h.',
      ja: '土星の赤道付近の風は、時速約1,800 kmに達します。',
    },
  },
  {
    q: {
      en: 'Which spacecraft captured the famous image of Earth as a tiny blue dot below Saturn’s rings in July 2013?',
      ja: '2013年7月に、土星の環の下に小さな青い点として地球を写した有名な画像を撮影した探査機はどれですか。',
    },
    options: [
      { en: 'Galileo', ja: 'ガリレオ' },
      { en: 'Voyager 1', ja: 'ボイジャー1号' },
      { en: 'Cassini', ja: 'カッシーニ' },
      { en: 'Juno', ja: 'ジュノー' },
    ],
    answer: 2,
    explain: {
      en: 'In July 2013 the Cassini spacecraft imaged Earth as a tiny blue dot beneath Saturn’s rings.',
      ja: '2013年7月、カッシーニ探査機は土星の環の下に小さな青い点として地球を撮影しました。',
    },
  },
  {
    q: {
      en: 'In a giant planet’s atmosphere, what is the coldest region, directly above the troposphere?',
      ja: '巨大惑星の大気で、対流圏のすぐ上にある最も冷たい領域はどれですか。',
    },
    options: [
      { en: 'Ionosphere', ja: '電離圏' },
      { en: 'Thermosphere', ja: '熱圏' },
      { en: 'Stratosphere', ja: '成層圏' },
      { en: 'Exosphere', ja: '外気圏' },
    ],
    answer: 2,
    explain: {
      en: 'The stratosphere, directly above the troposphere, is the coldest region of a giant planet’s atmosphere.',
      ja: '対流圏のすぐ上にある成層圏は、巨大惑星の大気で最も冷たい領域です。',
    },
  },
  {
    q: {
      en: 'Which physicist pioneered cosmic-radiation research using balloon-launched rockets (“rockoons”) and championed robotic spacecraft for exploration?',
      ja: '気球で打ち上げるロケット（「ロクーン」）を用いて宇宙線の研究を切り開き、探査のための無人探査機を提唱した物理学者は誰ですか。',
    },
    options: [
      { en: 'Raymond Davis', ja: 'レイモンド・デイビス' },
      { en: 'James Van Allen', ja: 'ジェームズ・ヴァン・アレン' },
      { en: 'Edwin Hubble', ja: 'エドウィン・ハッブル' },
      { en: 'James Clerk Maxwell', ja: 'ジェームズ・クラーク・マクスウェル' },
    ],
    answer: 1,
    explain: {
      en: 'James Van Allen pioneered cosmic-radiation research with “rockoons” and championed robotic spacecraft for exploration.',
      ja: 'ジェームズ・ヴァン・アレンは「ロクーン」で宇宙線研究を切り開き、探査のための無人探査機を提唱しました。',
    },
  },
];

const medium = [
  {
    q: {
      en: 'Why can’t astronomers get the true internal rotation periods of giant planets just by watching visible cloud features?',
      ja: '天文学者が、可視の雲の模様を見るだけでは巨大惑星の真の内部自転周期を得られないのはなぜですか。',
    },
    options: [
      { en: 'The clouds are too uniform to find reference points.', ja: '雲が均一すぎて基準点を見つけられないから。' },
      { en: 'The visible clouds are outer layers blown independently by high-speed winds and do not rotate at the same rate as the deep interior.', ja: '可視の雲は高速の風で独立して吹き流される外層であり、深部の内部と同じ速さで回転しないから。' },
      { en: 'The thick magnetospheres block light, making cloud motion an illusion.', ja: '厚い磁気圏が光を遮り、雲の運動を錯覚にしてしまうから。' },
      { en: 'Cloud patterns dissolve in less than an hour.', ja: '雲の模様が1時間もたたずに消えてしまうから。' },
    ],
    answer: 1,
    explain: {
      en: 'The visible clouds are outer layers driven by high-speed winds, so they don’t rotate at the same rate as the deep interior.',
      ja: '可視の雲は高速の風に駆動される外層であり、深部の内部と同じ速さでは回転しません。',
    },
  },
  {
    q: {
      en: 'If sunlight intensity at Earth (1 AU) equals 1, how does it compare at Neptune (30 AU)?',
      ja: '地球（1 AU）での日光の強度を1とすると、海王星（30 AU）ではどうなりますか。',
    },
    options: [
      { en: '30 times fainter', ja: '30分の1の暗さ' },
      { en: '90 times fainter', ja: '90分の1の暗さ' },
      { en: '900 times fainter', ja: '900分の1の暗さ' },
      { en: '27,000 times fainter', ja: '27,000分の1の暗さ' },
    ],
    answer: 2,
    explain: {
      en: 'Sunlight falls off as the inverse square of distance, so at 30 AU it is 30², or about 900, times fainter.',
      ja: '日光は距離の2乗に反比例して弱まるため、30 AUでは30の2乗、つまり約900分の1になります。',
    },
  },
  {
    q: {
      en: 'Why are Uranus and Neptune classed as “ice giants” rather than “gas giants”?',
      ja: '天王星と海王星が「ガス惑星」ではなく「氷惑星」に分類されるのはなぜですか。',
    },
    options: [
      { en: 'They are frozen solid from surface to core.', ja: '表面から核まで完全に凍りついているから。' },
      { en: 'Most of their mass is in heavy rock-and-ice cores, since they could not attract large amounts of hydrogen and helium when forming.', ja: '形成時に大量の水素とヘリウムを引きつけられなかったため、質量の大部分が重い岩石と氷の核にあるから。' },
      { en: 'They are pure water ice.', ja: '純粋な水の氷でできているから。' },
      { en: 'They orbit so far out that their hydrogen froze into a solid crust.', ja: '非常に遠くを回るため、水素が凍って固体の地殻になったから。' },
    ],
    answer: 1,
    explain: {
      en: 'Uranus and Neptune are “ice giants” because most of their mass lies in heavy rock-and-ice cores, having captured little hydrogen and helium.',
      ja: '天王星と海王星は、水素とヘリウムをほとんど捕獲できず、質量の大部分が重い岩石と氷の核にあるため「氷惑星」と呼ばれます。',
    },
  },
  {
    q: {
      en: 'Why does Saturn’s upper atmosphere have a more uniform “butterscotch” hue with far subtler cloud features than Jupiter’s?',
      ja: '土星の上層大気が、木星よりもはるかに淡い雲の模様で、より均一な「バタースコッチ」色をしているのはなぜですか。',
    },
    options: [
      { en: 'Saturn’s atmosphere is completely dry.', ja: '土星の大気が完全に乾いているから。' },
      { en: 'Saturn’s lower gravity lets its atmospheric layers stretch over a longer distance, forming a thick, masking layer of photochemical smog.', ja: '土星の弱い重力によって大気の層がより長い距離に広がり、覆い隠す厚い光化学スモッグの層を作るから。' },
      { en: 'Saturn is much closer to the Sun, vaporizing its clouds.', ja: '土星が太陽にずっと近く、雲を蒸発させているから。' },
      { en: 'Saturn’s magnetic field compresses its bands into one colour.', ja: '土星の磁場が縞を1色に圧縮しているから。' },
    ],
    answer: 1,
    explain: {
      en: 'Saturn’s lower gravity spreads its atmosphere over a greater depth, building a thick photochemical smog that masks the cloud features.',
      ja: '土星の弱い重力は大気をより深い範囲に広げ、雲の模様を覆い隠す厚い光化学スモッグを作ります。',
    },
  },
  {
    q: {
      en: 'Why must infrared detectors on telescopes like JWST be cooled near absolute zero to study the outer planets?',
      ja: 'JWSTのような望遠鏡の赤外線検出器が、外惑星を研究するために絶対零度近くまで冷却されなければならないのはなぜですか。',
    },
    options: [
      { en: 'To keep the mirrors from warping from solar wind.', ja: '鏡が太陽風でゆがむのを防ぐため。' },
      { en: 'To stop the detector from radiating its own infrared heat, which would swamp the faint infrared signals from deep space.', ja: '検出器自身が赤外線の熱を放射して、遠方からの微弱な赤外線信号をかき消すのを防ぐため。' },
      { en: 'To increase magnification and resolution.', ja: '倍率と分解能を上げるため。' },
      { en: 'To let the telescope operate in a vacuum without friction.', ja: '摩擦なしに真空中で望遠鏡を動かせるようにするため。' },
    ],
    answer: 1,
    explain: {
      en: 'A warm detector radiates its own infrared, which would swamp the faint signals from distant objects, so it must be cooled near absolute zero.',
      ja: '温かい検出器は自身の赤外線を放射し、遠方の天体からの微弱な信号をかき消すため、絶対零度近くまで冷やす必要があります。',
    },
  },
];

const hard = [
  {
    q: {
      en: 'How does convection in Neptune’s atmosphere, powered by internal heat, affect its clouds compared with Uranus?',
      ja: '内部の熱に駆動される海王星の大気の対流は、天王星と比べてその雲にどのような影響を与えますか。',
    },
    options: [
      { en: 'It keeps Neptune cloud-free and featureless.', ja: '海王星を雲のない、特徴のない状態に保つ。' },
      { en: 'It carries warm gas upward to form bright, high-altitude methane clouds that cast distinct shadows on the deck below.', ja: '暖かいガスを上昇させ、下の雲層にはっきりした影を落とす明るい高高度のメタンの雲を作る。' },
      { en: 'It freezes the atmosphere into permanent ice sheets.', ja: '大気を凍らせて永久的な氷床にする。' },
      { en: 'It stops all wind, keeping the air still.', ja: 'すべての風を止め、大気を静止させる。' },
    ],
    answer: 1,
    explain: {
      en: 'Neptune’s internal heat drives convection that lifts warm gas to form bright, high methane clouds casting shadows, unlike bland Uranus.',
      ja: '海王星の内部の熱は対流を駆動し、暖かいガスを持ち上げて影を落とす明るい高高度のメタンの雲を作り、単調な天王星とは異なります。',
    },
  },
  {
    q: {
      en: 'What does the scale and 300-year longevity of Jupiter’s Great Red Spot reveal about giant-planet storms versus Earth’s?',
      ja: '木星の大赤斑の規模と300年に及ぶ寿命は、地球の嵐と比べて巨大惑星の嵐について何を明らかにしますか。',
    },
    options: [
      { en: 'They are powered by surface nuclear fusion.', ja: '地表での核融合に駆動されている。' },
      { en: 'With no solid surface to drain their energy through friction, massive storms can persist almost indefinitely.', ja: '摩擦でエネルギーを失わせる固体表面がないため、巨大な嵐はほぼ無限に持続できる。' },
      { en: 'The storm is pinned by Jupiter’s solid mountain ranges.', ja: '嵐は木星の固体の山脈によって固定されている。' },
      { en: 'It is a permanent volcanic plume from the core.', ja: '核から立ち上る永久的な火山のプルームである。' },
    ],
    answer: 1,
    explain: {
      en: 'Without a solid surface to drain energy through friction, giant-planet storms like the Great Red Spot can last for centuries.',
      ja: '摩擦でエネルギーを失わせる固体表面がないため、大赤斑のような巨大惑星の嵐は何世紀も続くことができます。',
    },
  },
  {
    q: {
      en: 'Why did Uranus and Neptune fail to accumulate massive hydrogen–helium envelopes like Jupiter and Saturn?',
      ja: '天王星と海王星が、木星や土星のような巨大な水素・ヘリウムの外層を集められなかったのはなぜですか。',
    },
    options: [
      { en: 'Hydrogen and helium were absent in the outer nebula.', ja: '外側の星雲には水素とヘリウムがなかったから。' },
      { en: 'Their cores grew too slowly in the thinner outer disk, failing to reach the critical mass to capture much gas before the nebula dispersed.', ja: '希薄な外側の円盤で核の成長が遅すぎ、星雲が散逸する前に多くのガスを捕獲する臨界質量に達しなかったから。' },
      { en: 'Their high surface gravity repelled light gases into space.', ja: '強い地表重力が軽いガスを宇宙へはじき返したから。' },
      { en: 'Comets continuously stripped away their envelopes.', ja: '彗星が絶えず外層を剥ぎ取ったから。' },
    ],
    answer: 1,
    explain: {
      en: 'In the thin outer disk their cores grew too slowly to reach the critical mass for capturing much gas before the nebula dispersed.',
      ja: '希薄な外側の円盤では核の成長が遅く、星雲が散逸する前に多くのガスを捕獲する臨界質量に達しませんでした。',
    },
  },
  {
    q: {
      en: 'In Jupiter’s deep interior, hydrogen is under such pressure that it changes state. Describe the state and its main consequence.',
      ja: '木星の深部内部では、水素が非常に高い圧力で状態を変えます。その状態と主な帰結を述べてください。',
    },
    options: [
      { en: 'It freezes into a super-dense solid crystal that stops convection.', ja: '超高密度の固体結晶に凍りつき、対流を止める。' },
      { en: 'It becomes a highly conductive liquid metal (liquid metallic hydrogen) that generates Jupiter’s powerful magnetic field.', ja: '高い導電性を持つ液体金属（液体金属水素）となり、木星の強力な磁場を生み出す。' },
      { en: 'It turns into a plasma undergoing nuclear fusion.', ja: '核融合を起こすプラズマに変わる。' },
      { en: 'It condenses into transparent glass-like ice forming a solid mantle.', ja: '透明なガラス状の氷に凝縮し、固体のマントルを作る。' },
    ],
    answer: 1,
    explain: {
      en: 'Under immense pressure Jupiter’s hydrogen becomes liquid metallic hydrogen, a good conductor that generates its powerful magnetic field.',
      ja: '巨大な圧力の下で木星の水素は液体金属水素となり、その良導体が強力な磁場を生み出します。',
    },
  },
  {
    q: {
      en: 'Although Jupiter and Saturn radiate more energy than they receive from the Sun, why are they planets, not stars?',
      ja: '木星と土星は太陽から受けるより多くのエネルギーを放射しているのに、恒星ではなく惑星であるのはなぜですか。',
    },
    options: [
      { en: 'They orbit the Sun rather than a black hole.', ja: 'ブラックホールではなく太陽を回っているから。' },
      { en: 'Their atmospheres are hydrogen and helium, not heavy metals.', ja: '大気が重金属ではなく水素とヘリウムだから。' },
      { en: 'Their masses are far too low to reach the core temperatures and pressures needed to trigger nuclear fusion.', ja: '核融合を起こすのに必要な中心部の温度と圧力に達するには、質量があまりに小さすぎるから。' },
      { en: 'They are made entirely of solid rock and ice.', ja: 'すべて固体の岩石と氷でできているから。' },
    ],
    answer: 2,
    explain: {
      en: 'Their masses are far too small to reach the core temperatures and pressures needed for nuclear fusion, so they remain planets.',
      ja: 'その質量は核融合に必要な中心部の温度と圧力に達するにはあまりに小さいため、恒星ではなく惑星のままです。',
    },
  },
];

export default { easy, medium, hard };
