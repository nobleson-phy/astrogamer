const easy = [
  {
    q: {
      en: "Which principle of Einstein's general relativity says that a gravitational force and a suitable acceleration are locally indistinguishable?",
      ja: 'アインシュタインの一般相対性理論で、重力と適切な加速度は局所的に区別できないとする原理はどれですか。',
    },
    options: [
      { en: 'Uncertainty principle', ja: '不確定性原理' },
      { en: 'Equivalence principle', ja: '等価原理' },
      { en: 'Exclusion principle', ja: '排他原理' },
      { en: 'Principle of superposition', ja: '重ね合わせの原理' },
    ],
    answer: 1,
    explain: {
      en: 'The equivalence principle says a local gravitational field is physically equivalent to an accelerating reference frame.',
      ja: '等価原理は、局所的な重力場は加速する基準系と物理的に等価であると述べます。',
    },
  },
  {
    q: {
      en: 'According to general relativity, what actually bends light passing a massive object like the Sun?',
      ja: '一般相対性理論によれば、太陽のような大質量天体のそばを通る光を実際に曲げるものは何ですか。',
    },
    options: [
      { en: 'Electrostatic attraction between photons and protons', ja: '光子と陽子の間の静電気的な引力' },
      { en: 'The warping (curvature) of spacetime created by the mass', ja: '質量が作る時空のゆがみ（曲率）' },
      { en: 'Friction with coronal dust', ja: 'コロナの塵との摩擦' },
      { en: 'Magnetic refraction', ja: '磁気による屈折' },
    ],
    answer: 1,
    explain: {
      en: 'Mass warps spacetime, and light follows the shortest paths (geodesics) through that curved spacetime.',
      ja: '質量が時空をゆがめ、光はその曲がった時空の中で最短経路（測地線）をたどります。',
    },
  },
  {
    q: {
      en: "Which 1919 solar-eclipse observation first confirmed Einstein's bending of light?",
      ja: 'アインシュタインによる光の曲がりを初めて裏づけた1919年の皆既日食の観測はどれですか。',
    },
    options: [
      { en: "Arthur Eddington's expedition", ja: 'アーサー・エディントンの遠征' },
      { en: "Karl Schwarzschild's field test", ja: 'カール・シュヴァルツシルトの野外実験' },
      { en: "John Wheeler's balloon experiment", ja: 'ジョン・ホイーラーの気球実験' },
      { en: "Joseph Taylor's observatory measurement", ja: 'ジョセフ・テイラーの天文台での測定' },
    ],
    answer: 0,
    explain: {
      en: "Eddington's 1919 eclipse expedition measured starlight deflected near the Sun's edge.",
      ja: 'エディントンの1919年の日食遠征は、太陽の縁の近くで曲げられた星の光を測定しました。',
    },
  },
  {
    q: {
      en: "By how much per century does Mercury's perihelion advance beyond Newtonian planetary perturbations?",
      ja: '水星の近日点は、ニュートン的な惑星の摂動を超えて1世紀あたりどれだけ進みますか。',
    },
    options: [
      { en: '1.75 arcseconds', ja: '1.75秒角' },
      { en: '43 arcseconds', ja: '43秒角' },
      { en: '15 arcminutes', ja: '15分角' },
      { en: '3.26 degrees', ja: '3.26度' },
    ],
    answer: 1,
    explain: {
      en: 'GR explains the leftover 43 arcsec/century that Newtonian mechanics could not.',
      ja: '一般相対論は、ニュートン力学では説明できなかった残りの43秒角／世紀を説明します。',
    },
  },
  {
    q: {
      en: 'What happens to the rate at which time passes in stronger gravity compared with weaker gravity?',
      ja: '弱い重力に比べて強い重力の中では、時間の進む速さはどうなりますか。',
    },
    options: [
      { en: 'It speeds up', ja: '速くなる' },
      { en: 'It runs more slowly', ja: 'ゆっくり進む' },
      { en: 'It stops completely for all observers', ja: 'すべての観測者にとって完全に止まる' },
      { en: 'It fluctuates randomly', ja: 'ランダムに揺らぐ' },
    ],
    answer: 1,
    explain: {
      en: 'Time runs more slowly deeper in a gravitational field.',
      ja: '重力場の深いところほど、時間はゆっくり進みます。',
    },
  },
  {
    q: {
      en: 'What is the increase in wavelength of light climbing out of a strong gravitational field called?',
      ja: '強い重力場から這い上がる光の波長が伸びる現象を何と呼びますか。',
    },
    options: [
      { en: 'Doppler blueshift', ja: 'ドップラー青方偏移' },
      { en: 'Cosmological inflation', ja: '宇宙のインフレーション' },
      { en: 'Gravitational redshift', ja: '重力赤方偏移' },
      { en: 'Synchrotron degradation', ja: 'シンクロトロンの劣化' },
    ],
    answer: 2,
    explain: {
      en: 'As light escapes strong gravity, time dilation stretches its wavelength — gravitational redshift.',
      ja: '光が強い重力から逃れるとき、時間の遅れがその波長を引き伸ばします——これが重力赤方偏移です。',
    },
  },
  {
    q: {
      en: 'What is the upper mass limit for a collapsing stellar core beyond which nothing can stop collapse into a black hole?',
      ja: '崩壊する星の核が、これを超えると何ものもブラックホールへの崩壊を止められなくなる質量の上限はいくらですか。',
    },
    options: [
      { en: '1.4 M☉', ja: '1.4 M☉' },
      { en: '3.0 M☉', ja: '3.0 M☉' },
      { en: '10 M☉', ja: '10 M☉' },
      { en: '100 M☉', ja: '100 M☉' },
    ],
    answer: 1,
    explain: {
      en: 'Above about 3 M☉ no degeneracy pressure can halt the collapse.',
      ja: '約3 M☉を超えると、どんな縮退圧も崩壊を止められません。',
    },
  },
  {
    q: {
      en: "What is the boundary where the escape velocity equals the speed of light, separating a black hole's interior from the universe?",
      ja: '脱出速度が光速に等しくなり、ブラックホールの内部を宇宙から隔てる境界は何ですか。',
    },
    options: [
      { en: 'Accretion boundary', ja: '降着境界' },
      { en: 'Photosphere', ja: '光球' },
      { en: 'Event horizon', ja: '事象の地平面' },
      { en: 'Ergosphere', ja: 'エルゴ球' },
    ],
    answer: 2,
    explain: {
      en: 'At the event horizon the escape velocity equals c.',
      ja: '事象の地平面では、脱出速度が光速 c に等しくなります。',
    },
  },
  {
    q: {
      en: "What is the name for the radius of a non-rotating black hole's event horizon?",
      ja: '回転していないブラックホールの事象の地平面の半径を何と呼びますか。',
    },
    options: [
      { en: 'Chandrasekhar radius', ja: 'チャンドラセカール半径' },
      { en: 'Schwarzschild radius', ja: 'シュヴァルツシルト半径' },
      { en: 'Hubble radius', ja: 'ハッブル半径' },
      { en: 'Bohr radius', ja: 'ボーア半径' },
    ],
    answer: 1,
    explain: {
      en: 'Schwarzschild computed the horizon radius for a non-rotating black hole.',
      ja: 'シュヴァルツシルトは、回転しないブラックホールの地平面の半径を計算しました。',
    },
  },
  {
    q: {
      en: 'What is the approximate Schwarzschild radius for a 1 M☉ black hole?',
      ja: '1 M☉のブラックホールのシュヴァルツシルト半径はおよそいくらですか。',
    },
    options: [
      { en: '3 kilometers', ja: '3キロメートル' },
      { en: '300 kilometers', ja: '300キロメートル' },
      { en: '6,400 kilometers', ja: '6,400キロメートル' },
      { en: '1 AU', ja: '1天文単位' },
    ],
    answer: 0,
    explain: {
      en: 'R_S = 2GM/c² gives about 3 km for one solar mass.',
      ja: 'R_S = 2GM/c² は、1太陽質量に対して約3 kmを与えます。',
    },
  },
  {
    q: {
      en: "What is the zero-volume, infinite-density state at a black hole's center called?",
      ja: 'ブラックホールの中心にある、体積ゼロで密度が無限の状態を何と呼びますか。',
    },
    options: [
      { en: 'Magnetar', ja: 'マグネター' },
      { en: 'Singularity', ja: '特異点' },
      { en: 'Quasar core', ja: 'クエーサーの核' },
      { en: 'White dwarf', ja: '白色矮星' },
    ],
    answer: 1,
    explain: {
      en: 'GR predicts the mass collapses to a point of infinite density — a singularity.',
      ja: '一般相対論は、質量が無限の密度の一点へ崩壊すると予言します——特異点です。',
    },
  },
  {
    q: {
      en: 'What are the ONLY three properties a black hole reveals (the "no hair" theorem)?',
      ja: 'ブラックホールが明かす（「無毛定理」による）たった3つの性質は何ですか。',
    },
    options: [
      { en: 'Mass, temperature, age', ja: '質量・温度・年齢' },
      { en: 'Mass, spin (angular momentum), electrical charge', ja: '質量・スピン（角運動量）・電荷' },
      { en: 'Density, volume, composition', ja: '密度・体積・組成' },
      { en: 'Radius, magnetic field, color', ja: '半径・磁場・色' },
    ],
    answer: 1,
    explain: {
      en: 'The no-hair theorem: only mass, spin, and charge remain.',
      ja: '無毛定理によれば、残るのは質量・スピン・電荷だけです。',
    },
  },
  {
    q: {
      en: 'Which X-ray binary in Cygnus, with a 21-M☉ invisible companion orbiting an O supergiant, was the first strong evidence of a stellar-mass black hole?',
      ja: 'O型超巨星を回る21 M☉の見えない伴星をもつ、恒星質量ブラックホールの最初の有力な証拠となったはくちょう座のX線連星はどれですか。',
    },
    options: [
      { en: 'LMC X-1', ja: 'LMC X-1' },
      { en: 'Cygnus X-1', ja: 'はくちょう座X-1' },
      { en: 'Sgr A*', ja: 'いて座A*' },
      { en: 'M87*', ja: 'M87*' },
    ],
    answer: 1,
    explain: {
      en: 'Cygnus X-1 was the first strong stellar-mass black-hole candidate.',
      ja: 'はくちょう座X-1は、最初の有力な恒星質量ブラックホールの候補でした。',
    },
  },
  {
    q: {
      en: 'Which facility made the first direct gravitational-wave detection in 2015 from merging black holes?',
      ja: '2015年に、合体するブラックホールからの重力波を初めて直接検出した施設はどれですか。',
    },
    options: [
      { en: 'Event Horizon Telescope', ja: 'イベント・ホライズン・テレスコープ' },
      { en: 'LIGO', ja: 'LIGO' },
      { en: 'JWST', ja: 'JWST' },
      { en: 'H.E.S.S.', ja: 'H.E.S.S.' },
    ],
    answer: 1,
    explain: {
      en: 'LIGO detected GW150914 from a black-hole merger in 2015.',
      ja: 'LIGOは2015年に、ブラックホールの合体によるGW150914を検出しました。',
    },
  },
  {
    q: {
      en: 'What indirect gravitational-wave evidence won Hulse & Taylor the 1993 Nobel Prize?',
      ja: 'ハルスとテイラーに1993年のノーベル賞をもたらした、重力波の間接的な証拠は何ですか。',
    },
    options: [
      { en: 'Optical dimming of a red giant', ja: '赤色巨星の光学的な減光' },
      { en: 'The measured orbital decay (period decrease) of the binary pulsar PSR 1913+16 from gravitational energy loss', ja: '重力エネルギーの損失による連星パルサーPSR 1913+16の軌道の減衰（周期の減少）の測定' },
      { en: 'X-rays from Cygnus X-1', ja: 'はくちょう座X-1からのX線' },
      { en: 'The shadow image of M87*', ja: 'M87*の影の画像' },
    ],
    answer: 1,
    explain: {
      en: "The binary pulsar's orbit shrinks exactly as GR predicts for gravitational-wave emission.",
      ja: '連星パルサーの軌道は、重力波の放出について一般相対論が予言する通りに正確に縮みます。',
    },
  },
];

const medium = [
  {
    q: {
      en: "Tripling a black hole's mass from 10 to 30 M☉ changes its Schwarzschild radius how?",
      ja: 'ブラックホールの質量を10 M☉から30 M☉へ3倍にすると、シュヴァルツシルト半径はどう変わりますか。',
    },
    options: [
      { en: 'Shrinks to one-third', ja: '3分の1に縮む' },
      { en: 'Unchanged', ja: '変わらない' },
      { en: 'Triples (×3)', ja: '3倍（×3）になる' },
      { en: '×9', ja: '9倍になる' },
    ],
    answer: 2,
    explain: {
      en: 'R_S = 2GM/c² is linear in mass, so ×3 mass gives ×3 radius.',
      ja: 'R_S = 2GM/c² は質量に比例するので、質量が3倍なら半径も3倍になります。',
    },
  },
  {
    q: {
      en: "If the Sun were replaced by a 1 M☉ black hole, what would happen to Earth's orbit?",
      ja: 'もし太陽が1 M☉のブラックホールに置き換わったら、地球の軌道はどうなりますか。',
    },
    options: [
      { en: 'It would be sucked in within minutes', ja: '数分で吸い込まれる' },
      { en: 'It would remain completely unchanged, still a 1-year period', ja: 'まったく変わらず、周期は1年のまま' },
      { en: 'It would be flung into interstellar space', ja: '星間空間へ放り出される' },
      { en: 'Its period would double', ja: '周期が2倍になる' },
    ],
    answer: 1,
    explain: {
      en: "The mass is unchanged, so far-away gravity follows Newton's law exactly as before.",
      ja: '質量は変わらないので、遠くの重力は以前とまったく同じにニュートンの法則に従います。',
    },
  },
  {
    q: {
      en: 'Why do X-ray telescopes see intense flickering X-rays near a stellar-mass black hole in a binary, even though the hole itself emits no light?',
      ja: 'ブラックホール自体は光を出さないのに、なぜX線望遠鏡は連星中の恒星質量ブラックホールの近くで激しくちらつくX線を見るのですか。',
    },
    options: [
      { en: 'Gas from the companion forms an accretion disk whose friction heats infalling matter to millions of K before it crosses the horizon', ja: '伴星からのガスが降着円盤を作り、その摩擦が落ち込む物質を地平面を越える前に数百万Kまで加熱するから' },
      { en: 'The singularity emits X-rays by quantum tunneling', ja: '特異点が量子トンネル効果でX線を放つから' },
      { en: "Fusion on the event horizon's surface", ja: '事象の地平面の表面での核融合' },
      { en: 'Dark matter hitting the horizon becomes X-rays', ja: '地平面に当たるダークマターがX線になるから' },
    ],
    answer: 0,
    explain: {
      en: 'Friction in the accretion disk heats gas to millions of K, radiating flickering X-rays.',
      ja: '降着円盤の摩擦がガスを数百万Kに加熱し、ちらつくX線を放射します。',
    },
  },
  {
    q: {
      en: "Why is an astronaut spaghettified before the horizon of a 10-M☉ hole but can cross a 4-million-M☉ hole's horizon without severe tidal force?",
      ja: 'なぜ宇宙飛行士は10 M☉の穴では地平面の手前でスパゲッティ化するのに、400万 M☉の穴の地平面はひどい潮汐力なしに越えられるのですか。',
    },
    options: [
      { en: 'Supermassive holes have no gravity at the horizon', ja: '超大質量の穴は地平面で重力をもたないから' },
      { en: 'Tidal force depends on the gravity difference over distance; a larger Schwarzschild radius means a much gentler gradient at the horizon', ja: '潮汐力は距離にわたる重力の差で決まり、シュヴァルツシルト半径が大きいほど地平面での勾配はずっと緩やかになるから' },
      { en: 'Supermassive holes freeze astronauts in time', ja: '超大質量の穴は宇宙飛行士を時間の中で凍らせるから' },
      { en: 'Stellar-mass holes contain dark energy', ja: '恒星質量の穴はダークエネルギーを含むから' },
    ],
    answer: 1,
    explain: {
      en: 'The tidal gradient at the horizon is far gentler for a larger (supermassive) black hole.',
      ja: '地平面での潮汐の勾配は、より大きな（超大質量の）ブラックホールほどはるかに緩やかです。',
    },
  },
  {
    q: {
      en: 'Why does LIGO use two widely separated stations (Louisiana and Washington)?',
      ja: 'なぜLIGOは大きく離れた2つの観測所（ルイジアナとワシントン）を使うのですか。',
    },
    options: [
      { en: 'One measures light, the other sound', ja: '一方は光を、もう一方は音を測るから' },
      { en: 'Local vibrations (quakes, traffic, waves) differ at each site, so a real gravitational wave at light speed makes simultaneous matching signals at both', ja: '地元の振動（地震・交通・波）は場所ごとに異なるので、光速で来る本物の重力波だけが両方で同時に一致する信号を作るから' },
      { en: 'One watches the northern sky, the other the southern', ja: '一方は北の空を、もう一方は南の空を見るから' },
      { en: 'Two are needed to power the laser', ja: 'レーザーを動かすのに2つ必要だから' },
    ],
    answer: 1,
    explain: {
      en: 'Correlated signals at both distant sites distinguish a cosmic wave from local noise.',
      ja: '離れた両方の観測所で相関した信号が、宇宙からの波を地元のノイズと区別します。',
    },
  },
];

const hard = [
  {
    q: {
      en: 'How does general relativity reframe gravity compared with Newton?',
      ja: '一般相対性理論は、ニュートンと比べて重力をどのように捉え直しますか。',
    },
    options: [
      { en: 'Newton saw gravity as an attractive force across space, while GR shows gravity is the curvature of 4D spacetime shaped by mass and energy', ja: 'ニュートンは重力を空間を越えて働く引力と見たが、一般相対論は重力を、質量とエネルギーが形づくる4次元時空の曲率だと示す' },
      { en: "Newton proved gravity is infinite-speed; GR proves gravity doesn't exist", ja: 'ニュートンは重力が無限の速さだと証明し、一般相対論は重力が存在しないと証明した' },
      { en: 'GR says only electric charges exert gravity', ja: '一般相対論は、電荷だけが重力を及ぼすと述べる' },
      { en: "Newton's laws work only inside black holes", ja: 'ニュートンの法則はブラックホールの内部でしか成り立たない' },
    ],
    answer: 0,
    explain: {
      en: 'GR replaces force-at-a-distance with curved spacetime geometry.',
      ja: '一般相対論は、遠隔作用の力を曲がった時空の幾何学に置き換えます。',
    },
  },
  {
    q: {
      en: 'What was the multi-messenger significance of GW170817 (August 2017)?',
      ja: 'GW170817（2017年8月）のマルチメッセンジャーとしての意義は何でしたか。',
    },
    options: [
      { en: 'It proved black holes evaporate by Hawking radiation', ja: 'ブラックホールがホーキング放射で蒸発すると証明した' },
      { en: 'Simultaneous gravitational waves plus a short gamma-ray burst (plus an optical kilonova) confirmed neutron-star mergers make short GRBs and forge heavy elements like gold and platinum', ja: '重力波と短いガンマ線バースト（さらに可視光のキロノヴァ）が同時に観測され、中性子星の合体が短いGRBを作り、金やプラチナのような重元素を鍛えることを裏づけた' },
      { en: 'It showed gravitational waves travel 10× the speed of light', ja: '重力波が光速の10倍で進むと示した' },
      { en: 'It proved the Universe is contracting', ja: '宇宙が収縮していると証明した' },
    ],
    answer: 1,
    explain: {
      en: 'The joint detection tied neutron-star mergers to short GRBs and kilonova heavy-element synthesis.',
      ja: '同時検出は、中性子星の合体を短いGRBとキロノヴァでの重元素合成に結びつけました。',
    },
  },
  {
    q: {
      en: 'How does infrared tracking of stars orbiting Sgr A* (Ghez & Genzel) prove a supermassive black hole?',
      ja: 'いて座A*を回る星の赤外線追跡（ゲッズとゲンツェル）は、どのように超大質量ブラックホールを証明しますか。',
    },
    options: [
      { en: 'Their light is fully absorbed by hydrogen', ja: '星の光が水素に完全に吸収されるから' },
      { en: 'Keplerian orbits of stars like S2 show about 4.6 million M☉ packed inside under 17 light-hours, where no stable star cluster could exist', ja: 'S2のような星のケプラー軌道が、約460万 M☉が17光時未満の中に詰まっていることを示し、そこには安定な星団は存在しえないから' },
      { en: 'The stars move in straight lines at constant speed', ja: '星が一定の速さで直線運動するから' },
      { en: 'Infrared reveals a solid iron surface', ja: '赤外線が固い鉄の表面を明かすから' },
    ],
    answer: 1,
    explain: {
      en: 'The stellar orbits require millions of solar masses in a tiny volume — only a supermassive black hole fits.',
      ja: '星の軌道は、ごく小さな体積に数百万太陽質量を要求します——超大質量ブラックホールしかあてはまりません。',
    },
  },
  {
    q: {
      en: 'Why do GPS satellite clocks run faster than ground clocks, and how is it handled?',
      ja: 'なぜGPS衛星の時計は地上の時計より速く進み、それはどう対処されていますか。',
    },
    options: [
      { en: 'Higher atmospheric pressure in orbit', ja: '軌道上の方が気圧が高いから' },
      { en: 'GR says time passes faster in weaker gravity at altitude (about 45 microseconds/day gain), so clocks are pre-adjusted to keep navigation accurate', ja: '一般相対論によれば、上空の弱い重力では時間が速く進む（1日あたり約45マイクロ秒の進み）ので、時計をあらかじめ調整して測位を正確に保つ' },
      { en: 'Solar heating speeds up mechanical gears', ja: '太陽の熱が機械的な歯車を速めるから' },
      { en: 'Satellites travel backward in time', ja: '衛星が時間を逆行するから' },
    ],
    answer: 1,
    explain: {
      en: 'Weaker gravity in orbit makes clocks tick faster; GPS corrects for it (net about +38 μs/day with special relativity; the GR part is about +45 μs/day).',
      ja: '軌道上の弱い重力は時計を速く刻ませます。GPSはこれを補正します（特殊相対論を合わせた正味は約+38 μs／日、一般相対論の分は約+45 μs／日）。',
    },
  },
  {
    q: {
      en: 'Why does the EHT "shadow" of a supermassive black hole look larger than its actual event horizon?',
      ja: 'なぜEHTが撮る超大質量ブラックホールの「影」は、実際の事象の地平面より大きく見えるのですか。',
    },
    options: [
      { en: 'It expands when photographed by radio', ja: '電波で撮影すると膨張するから' },
      { en: 'Extreme spacetime curvature bends and lenses the surrounding light, making the shadow about 2.5× the event-horizon diameter', ja: '極端な時空の曲率が周囲の光を曲げてレンズ効果を起こし、影を事象の地平面の直径の約2.5倍にするから' },
      { en: 'Foreground dust magnifies it', ja: '手前の塵がそれを拡大するから' },
      { en: 'The accretion disk absorbs all light inside 100 Schwarzschild radii', ja: '降着円盤がシュヴァルツシルト半径100個分の内側の光をすべて吸収するから' },
    ],
    answer: 1,
    explain: {
      en: 'Strong gravitational lensing enlarges the dark region to about 2.5× the horizon.',
      ja: '強い重力レンズ効果が、暗い領域を地平面の約2.5倍に拡大します。',
    },
  },
];

export default { easy, medium, hard };
