const easy = [
  {
    q: {
      en: "Who provided the extensive and precise observations of planetary positions that Johannes Kepler used to derive his laws?",
      ja: "ヨハネス・ケプラーが法則を導き出すために用いた、惑星の位置に関する広範かつ精密な観測を提供したのは誰ですか。",
    },
    options: [
      { en: "Isaac Newton", ja: "アイザック・ニュートン" },
      { en: "Tycho Brahe", ja: "ティコ・ブラーエ" },
      { en: "Galileo Galilei", ja: "ガリレオ・ガリレイ" },
      { en: "Nicolaus Copernicus", ja: "ニコラウス・コペルニクス" },
    ],
    answer: 1,
    explain: {
      en: "Kepler analyzed Tycho Brahe's remarkably accurate naked-eye observations to formulate his laws of planetary motion.",
      ja: "ケプラーは、ティコ・ブラーエによる極めて正確な肉眼観測を分析して、惑星運動の法則を定式化しました。",
    },
  },
  {
    q: {
      en: "According to Kepler's first law, what is the specific shape of a planet's orbit?",
      ja: "ケプラーの第一法則によると、惑星の軌道はどのような形をしていますか。",
    },
    options: [
      { en: "A perfect circle", ja: "完全な円" },
      { en: "A parabola", ja: "放物線" },
      { en: "An ellipse", ja: "楕円" },
      { en: "A hyperbola", ja: "双曲線" },
    ],
    answer: 2,
    explain: {
      en: "Kepler's first law states that each planet moves in an ellipse with the Sun at one focus.",
      ja: "ケプラーの第一法則は、各惑星が太陽を一つの焦点とする楕円軌道を描くことを示しています。",
    },
  },
  {
    q: {
      en: "In an elliptical orbit, what is the term for half the distance of the maximum diameter?",
      ja: "楕円軌道において、最大直径の半分の長さを表す用語はどれですか。",
    },
    options: [
      { en: "Major axis", ja: "長軸" },
      { en: "Eccentricity", ja: "離心率" },
      { en: "Focus", ja: "焦点" },
      { en: "Semimajor axis", ja: "半長軸" },
    ],
    answer: 3,
    explain: {
      en: "The semimajor axis is half of the ellipse's longest diameter and defines the average size of the orbit.",
      ja: "半長軸は楕円の最も長い直径の半分であり、軌道の平均的な大きさを定めます。",
    },
  },
  {
    q: {
      en: "Which law states that the square of a planet's orbital period is directly proportional to the cube of its semimajor axis?",
      ja: "惑星の公転周期の2乗が半長軸の3乗に正比例することを述べている法則はどれですか。",
    },
    options: [
      { en: "Kepler's third law", ja: "ケプラーの第三法則" },
      { en: "Newton's first law", ja: "ニュートンの第一法則" },
      { en: "Kepler's second law", ja: "ケプラーの第二法則" },
      { en: "Newton's universal law of gravitation", ja: "ニュートンの万有引力の法則" },
    ],
    answer: 0,
    explain: {
      en: "Kepler's third law relates orbital period and orbital size through the equation P squared equals a cubed.",
      ja: "ケプラーの第三法則は、公転周期の2乗が半長軸の3乗に等しいという式で軌道周期と軌道の大きさを結びつけます。",
    },
  },
  {
    q: {
      en: "What is defined as the measure of the amount of matter within an object?",
      ja: "物体に含まれる物質の量を表す尺度として定義されるものはどれですか。",
    },
    options: [
      { en: "Weight", ja: "重さ" },
      { en: "Volume", ja: "体積" },
      { en: "Mass", ja: "質量" },
      { en: "Density", ja: "密度" },
    ],
    answer: 2,
    explain: {
      en: "Mass measures how much matter an object contains and does not change with location.",
      ja: "質量は物体に含まれる物質の量を表し、場所によって変化しません。",
    },
  },
  {
    q: {
      en: "Newton's first law of motion, which states that objects at rest stay at rest unless acted upon by an outside force, is also known as the law of:",
      ja: "静止している物体は外部からの力が働かない限り静止し続けると述べるニュートンの運動の第一法則は、別名として何の法則と呼ばれますか。",
    },
    options: [
      { en: "Acceleration", ja: "加速度" },
      { en: "Momentum", ja: "運動量" },
      { en: "Gravity", ja: "重力" },
      { en: "Inertia", ja: "慣性" },
    ],
    answer: 3,
    explain: {
      en: "Newton's first law is called the law of inertia because objects resist changes to their state of motion.",
      ja: "ニュートンの第一法則は、物体が運動状態の変化に抵抗するため、慣性の法則と呼ばれます。",
    },
  },
  {
    q: {
      en: "The measure of a body's motion, defined as its mass times its velocity, is called:",
      ja: "物体の質量と速度の積として定義される、物体の運動の尺度を何と呼びますか。",
    },
    options: [
      { en: "Angular momentum", ja: "角運動量" },
      { en: "Momentum", ja: "運動量" },
      { en: "Force", ja: "力" },
      { en: "Weight", ja: "重さ" },
    ],
    answer: 1,
    explain: {
      en: "Momentum is the product of an object's mass and its velocity.",
      ja: "運動量は、物体の質量と速度の積です。",
    },
  },
  {
    q: {
      en: "In Newton's Universal Law of Gravitation, the force of gravity between two objects is proportional to the product of their masses and inversely proportional to:",
      ja: "ニュートンの万有引力の法則において、二つの物体間の重力は質量の積に比例し、何に反比例しますか。",
    },
    options: [
      { en: "Their distance", ja: "それらの距離" },
      { en: "The square root of their distance", ja: "それらの距離の平方根" },
      { en: "The square of their distance", ja: "それらの距離の2乗" },
      { en: "The cube of their distance", ja: "それらの距離の3乗" },
    ],
    answer: 2,
    explain: {
      en: "Gravitational force weakens with the square of the distance between the two objects.",
      ja: "重力は、二つの物体間の距離の2乗に反比例して弱くなります。",
    },
  },
  {
    q: {
      en: "What is the term for the point in its orbit where a planet is closest to the Sun?",
      ja: "惑星が軌道上で太陽に最も近づく点を表す用語はどれですか。",
    },
    options: [
      { en: "Aphelion", ja: "遠日点" },
      { en: "Perigee", ja: "近地点" },
      { en: "Perihelion", ja: "近日点" },
      { en: "Apogee", ja: "遠地点" },
    ],
    answer: 2,
    explain: {
      en: "Perihelion is the orbital point nearest the Sun, where a planet moves fastest.",
      ja: "近日点は軌道上で太陽に最も近い点であり、惑星が最も速く動く場所です。",
    },
  },
  {
    q: {
      en: "What is the approximate circular satellite velocity required to maintain an orbit just above Earth's atmosphere?",
      ja: "地球の大気のすぐ上で軌道を維持するために必要な、おおよその円軌道速度はどれですか。",
    },
    options: [
      { en: "2.4 km/s", ja: "毎秒2.4キロメートル" },
      { en: "8 km/s", ja: "毎秒8キロメートル" },
      { en: "11 km/s", ja: "毎秒11キロメートル" },
      { en: "48 km/s", ja: "毎秒48キロメートル" },
    ],
    answer: 1,
    explain: {
      en: "A satellite needs about 8 km/s to stay in a low circular orbit just above the atmosphere.",
      ja: "衛星が大気のすぐ上の低い円軌道に留まるには、毎秒約8キロメートルの速度が必要です。",
    },
  },
  {
    q: {
      en: "What is the \"escape speed\" required for a spacecraft to move away from Earth forever?",
      ja: "宇宙船が地球から永遠に離れていくために必要な「脱出速度」はどれですか。",
    },
    options: [
      { en: "8 km/s", ja: "毎秒8キロメートル" },
      { en: "11 km/s", ja: "毎秒11キロメートル" },
      { en: "25 km/s", ja: "毎秒25キロメートル" },
      { en: "48 km/s", ja: "毎秒48キロメートル" },
    ],
    answer: 1,
    explain: {
      en: "The escape speed from Earth's surface is about 11 km/s.",
      ja: "地球表面からの脱出速度は、およそ毎秒11キロメートルです。",
    },
  },
  {
    q: {
      en: "Which planet was mathematically predicted based on perturbations in Uranus's orbit before it was actually seen?",
      ja: "実際に観測される前に、天王星の軌道の摂動に基づいて数学的に予測された惑星はどれですか。",
    },
    options: [
      { en: "Pluto", ja: "冥王星" },
      { en: "Saturn", ja: "土星" },
      { en: "Neptune", ja: "海王星" },
      { en: "Mars", ja: "火星" },
    ],
    answer: 2,
    explain: {
      en: "Neptune's existence and position were predicted from irregularities in Uranus's orbit before its discovery.",
      ja: "海王星の存在と位置は、天王星の軌道の乱れから発見前に予測されました。",
    },
  },
  {
    q: {
      en: "Which physical property remains constant for an object regardless of what planet it is on?",
      ja: "物体がどの惑星上にあっても一定に保たれる物理的性質はどれですか。",
    },
    options: [
      { en: "Weight", ja: "重さ" },
      { en: "Mass", ja: "質量" },
      { en: "Surface gravity", ja: "表面重力" },
      { en: "Density", ja: "密度" },
    ],
    answer: 1,
    explain: {
      en: "Mass is intrinsic to an object and stays the same everywhere, while weight depends on local gravity.",
      ja: "質量は物体に固有のものでどこでも変わりませんが、重さはその場所の重力によって変化します。",
    },
  },
  {
    q: {
      en: "What measure of rotation is defined as the product of an object's mass, velocity, and distance from its spin center?",
      ja: "物体の質量、速度、および回転中心からの距離の積として定義される、回転の尺度はどれですか。",
    },
    options: [
      { en: "Linear momentum", ja: "線運動量" },
      { en: "Inertia", ja: "慣性" },
      { en: "Angular momentum", ja: "角運動量" },
      { en: "Centripetal force", ja: "向心力" },
    ],
    answer: 2,
    explain: {
      en: "Angular momentum is the product of mass, velocity, and distance from the axis of rotation.",
      ja: "角運動量は、質量、速度、および回転軸からの距離の積です。",
    },
  },
  {
    q: {
      en: "What term refers to a small disturbing effect on the orbit of a body produced by the gravitational pull of a third body?",
      ja: "第三の天体の重力によって生じる、ある天体の軌道への小さな乱れの効果を表す用語はどれですか。",
    },
    options: [
      { en: "Resonance", ja: "共鳴" },
      { en: "Eccentricity", ja: "離心率" },
      { en: "Precession", ja: "歳差" },
      { en: "Perturbation", ja: "摂動" },
    ],
    answer: 3,
    explain: {
      en: "A perturbation is a small gravitational disturbance of an orbit caused by an additional body.",
      ja: "摂動とは、別の天体によって引き起こされる軌道への小さな重力的な乱れのことです。",
    },
  },
];

const medium = [
  {
    q: {
      en: "If an asteroid is discovered with a semimajor axis of 4 AU, what is its orbital period in Earth years?",
      ja: "半長軸が4天文単位の小惑星が発見された場合、その公転周期は地球の年で何年になりますか。",
    },
    options: [
      { en: "4 years", ja: "4年" },
      { en: "8 years", ja: "8年" },
      { en: "16 years", ja: "16年" },
      { en: "64 years", ja: "64年" },
    ],
    answer: 1,
    explain: {
      en: "By Kepler's third law, P equals the square root of a cubed, so P equals the square root of 64, which is 8 years.",
      ja: "ケプラーの第三法則により、周期は半長軸の3乗の平方根に等しく、64の平方根、すなわち8年になります。",
    },
  },
  {
    q: {
      en: "If you were to triple the distance between two stars, how would the gravitational force between them change?",
      ja: "二つの恒星の間の距離を3倍にすると、それらの間の重力はどのように変化しますか。",
    },
    options: [
      { en: "It would be 3 times weaker", ja: "3分の1に弱くなる" },
      { en: "It would be 6 times weaker", ja: "6分の1に弱くなる" },
      { en: "It would be 9 times weaker", ja: "9分の1に弱くなる" },
      { en: "It would be 27 times weaker", ja: "27分の1に弱くなる" },
    ],
    answer: 2,
    explain: {
      en: "Because gravity follows an inverse-square law, tripling the distance divides the force by 3 squared, which is 9.",
      ja: "重力は逆2乗の法則に従うため、距離を3倍にすると力は3の2乗、すなわち9分の1になります。",
    },
  },
  {
    q: {
      en: "Why does a figure skater spin faster when they pull their arms in toward their body?",
      ja: "フィギュアスケーターが腕を体に引き寄せると回転が速くなるのはなぜですか。",
    },
    options: [
      { en: "To increase their mass", ja: "質量を増やすため" },
      { en: "To conserve angular momentum", ja: "角運動量を保存するため" },
      { en: "To increase the force of gravity", ja: "重力を増やすため" },
      { en: "To reduce friction with the ice", ja: "氷との摩擦を減らすため" },
    ],
    answer: 1,
    explain: {
      en: "Pulling the arms in reduces the distance from the axis, so the spin rate increases to conserve angular momentum.",
      ja: "腕を引き寄せると回転軸からの距離が縮まるため、角運動量を保存するために回転速度が増します。",
    },
  },
  {
    q: {
      en: "If Earth had its same mass but was compressed to have only half its current radius, how would your weight change?",
      ja: "地球の質量はそのままで、半径だけが現在の半分に圧縮された場合、あなたの体重はどのように変化しますか。",
    },
    options: [
      { en: "You would weigh the same", ja: "体重は変わらない" },
      { en: "You would weigh twice as much", ja: "体重は2倍になる" },
      { en: "You would weigh four times as much", ja: "体重は4倍になる" },
      { en: "You would weigh half as much", ja: "体重は半分になる" },
    ],
    answer: 2,
    explain: {
      en: "Halving the radius while keeping the mass increases surface gravity by a factor of 2 squared, or four times.",
      ja: "質量を保ったまま半径を半分にすると、表面重力は2の2乗、すなわち4倍になります。",
    },
  },
  {
    q: {
      en: "Why are comets observed to \"whip\" through the inner solar system much faster than they move when they are far from the Sun?",
      ja: "彗星が太陽から遠いときよりも、内部太陽系を「一気に駆け抜ける」ように速く動くのが観測されるのはなぜですか。",
    },
    options: [
      { en: "Their orbits are perfect circles", ja: "その軌道が完全な円だから" },
      { en: "They are pushed by solar wind", ja: "太陽風に押されるから" },
      { en: "Kepler's second law requires them to sweep out equal areas in equal time", ja: "ケプラーの第二法則により、等しい時間に等しい面積を掃くから" },
      { en: "They lose mass as they get hotter", ja: "熱くなると質量を失うから" },
    ],
    answer: 2,
    explain: {
      en: "Kepler's second law means a comet sweeps equal areas in equal times, so it must move fastest near the Sun.",
      ja: "ケプラーの第二法則により彗星は等しい時間に等しい面積を掃くため、太陽の近くで最も速く動く必要があります。",
    },
  },
];

const hard = [
  {
    q: {
      en: "How did Newton's Universal Law of Gravitation change our understanding of Kepler's third law?",
      ja: "ニュートンの万有引力の法則は、ケプラーの第三法則に対する私たちの理解をどのように変えましたか。",
    },
    options: [
      { en: "It proved Kepler's laws only work for circles", ja: "ケプラーの法則が円軌道でしか成り立たないことを証明した" },
      { en: "It showed that the masses of both orbiting objects are significant factors", ja: "軌道を回る両方の天体の質量が重要な要因であることを示した" },
      { en: "It proved that distance is the only factor in orbital periods", ja: "公転周期を決めるのは距離だけであることを証明した" },
      { en: "It showed that Kepler's law only applies to the Earth", ja: "ケプラーの法則が地球にのみ適用されることを示した" },
    ],
    answer: 1,
    explain: {
      en: "Newton showed that the total mass of both bodies enters Kepler's third law, generalizing it beyond the Sun-planet case.",
      ja: "ニュートンは、両方の天体の総質量がケプラーの第三法則に含まれることを示し、太陽と惑星の場合を超えて一般化しました。",
    },
  },
  {
    q: {
      en: "Why do astronauts inside the International Space Station feel weightless?",
      ja: "国際宇宙ステーションの中にいる宇宙飛行士が無重量を感じるのはなぜですか。",
    },
    options: [
      { en: "There is no gravity in space", ja: "宇宙には重力が存在しないから" },
      { en: "They are far enough from Earth that gravity becomes zero", ja: "地球から十分に離れていて重力がゼロになるから" },
      { en: "They are in a state of free fall, falling around the Earth rather than to it", ja: "自由落下の状態にあり、地球に向かってではなく地球の周りを落ち続けているから" },
      { en: "The space station is equipped with anti-gravity technology", ja: "宇宙ステーションに反重力技術が搭載されているから" },
    ],
    answer: 2,
    explain: {
      en: "The station and its crew are in continuous free fall, orbiting Earth, which produces the sensation of weightlessness.",
      ja: "ステーションと乗員は地球を周回しながら絶えず自由落下しており、それが無重量の感覚を生み出します。",
    },
  },
  {
    q: {
      en: "Kepler's transition from circular to elliptical orbits was a decisive moment in human thought because it suggested:",
      ja: "ケプラーが円軌道から楕円軌道へ移行したことが人類の思想において決定的な瞬間であったのは、それが何を示唆したからですか。",
    },
    options: [
      { en: "The universe is much simpler than ancient Greeks believed", ja: "宇宙は古代ギリシャ人が信じていたよりもはるかに単純である" },
      { en: "The universe could be complex and not conform to \"perfect\" philosophical shapes", ja: "宇宙は複雑であり、「完全な」哲学的な形に従わない場合がある" },
      { en: "All planets move at a perfectly constant speed", ja: "すべての惑星は完全に一定の速度で動く" },
      { en: "Math cannot be used to describe the heavens", ja: "数学では天体を記述できない" },
    ],
    answer: 1,
    explain: {
      en: "Accepting ellipses meant abandoning the ideal of perfect circles, showing nature need not match philosophical ideals.",
      ja: "楕円を受け入れることは完全な円という理想を捨てることを意味し、自然が哲学的な理想に一致する必要はないことを示しました。",
    },
  },
  {
    q: {
      en: "How do modern spacecraft use \"gravity assists\" or flybys to reach distant planets?",
      ja: "現代の宇宙船は、遠く離れた惑星に到達するために「重力アシスト」やフライバイをどのように利用しますか。",
    },
    options: [
      { en: "They use a planet's gravity to increase or redirect their energy", ja: "惑星の重力を利用してエネルギーを増加させたり方向を変えたりする" },
      { en: "They land on the planet to refuel", ja: "惑星に着陸して燃料を補給する" },
      { en: "They use the planet's atmosphere to bounce into space", ja: "惑星の大気を利用して宇宙へ跳ね返る" },
      { en: "They turn off their engines and let the Sun pull them in", ja: "エンジンを停止して太陽に引き寄せてもらう" },
    ],
    answer: 0,
    explain: {
      en: "A gravity assist uses a planet's motion and gravity to change a spacecraft's speed or direction without using fuel.",
      ja: "重力アシストは、燃料を使わずに惑星の運動と重力を利用して宇宙船の速度や方向を変えます。",
    },
  },
  {
    q: {
      en: "The successful mathematical prediction of Neptune's location before its discovery was a major triumph because it:",
      ja: "海王星の位置が発見前に数学的に予測され成功したことが大きな勝利であったのは、それが何をしたからですか。",
    },
    options: [
      { en: "Proved that telescopes were unnecessary", ja: "望遠鏡が不要であることを証明した" },
      { en: "Confirmed that Newton's laws were universal and applicable to the whole solar system", ja: "ニュートンの法則が普遍的で太陽系全体に適用できることを確認した" },
      { en: "Showed that Uranus had a \"disobedient\" personality", ja: "天王星が「反抗的な」性格を持つことを示した" },
      { en: "Proved that Pluto was not a planet", ja: "冥王星が惑星ではないことを証明した" },
    ],
    answer: 1,
    explain: {
      en: "Finding Neptune where theory predicted confirmed that Newton's laws govern the entire solar system.",
      ja: "理論が予測した場所で海王星が見つかったことは、ニュートンの法則が太陽系全体を支配していることを確認しました。",
    },
  },
];

export default { easy, medium, hard };
