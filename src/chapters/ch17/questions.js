const easy = [
  {
    q: {
      en: 'What is defined as the total amount of energy at all wavelengths that a star emits per second?',
      ja: '星が毎秒、すべての波長で放出するエネルギーの総量は何と定義されますか。',
    },
    options: [
      { en: 'Apparent brightness', ja: '見かけの明るさ' },
      { en: 'Luminosity', ja: '光度' },
      { en: 'Radiant flux', ja: '放射フラックス' },
      { en: 'Magnitude', ja: '等級' },
    ],
    answer: 1,
    explain: {
      en: 'Luminosity is the total energy, at all wavelengths, a star emits each second — its intrinsic power output.',
      ja: '光度は、星が毎秒すべての波長で放出するエネルギーの総量——その固有の出力です。',
    },
  },
  {
    q: {
      en: 'On the astronomical magnitude scale for apparent brightness:',
      ja: '見かけの明るさを測る天文の等級スケールでは：',
    },
    options: [
      { en: 'Larger positive numbers mean brighter stars.', ja: '大きい正の数ほど明るい星。' },
      { en: 'Smaller or negative numbers mean brighter stars.', ja: '小さい、または負の数ほど明るい星。' },
      { en: 'All stars have magnitudes between 1 and 10.', ja: 'すべての星の等級は1〜10の間。' },
      { en: 'Magnitude is proportional to distance in light-years.', ja: '等級は光年での距離に比例する。' },
    ],
    answer: 1,
    explain: {
      en: 'The scale is inverted: brighter objects have smaller or negative magnitudes (Sirius is −1.5).',
      ja: 'スケールは逆向きです：明るい天体ほど小さい、または負の等級です（シリウスは−1.5）。',
    },
  },
  {
    q: {
      en: 'By Wien’s law, which visible color corresponds to the hottest stellar surface?',
      ja: 'ウィーンの法則によると、最も高温の星の表面に対応する可視色はどれですか。',
    },
    options: [
      { en: 'Red', ja: '赤' },
      { en: 'Yellow', ja: '黄' },
      { en: 'Blue', ja: '青' },
      { en: 'Orange', ja: 'オレンジ' },
    ],
    answer: 2,
    explain: {
      en: 'Hotter objects peak at shorter wavelengths, so the hottest stars look blue.',
      ja: 'より高温の天体は短い波長でピークを迎えるので、最も熱い星は青く見えます。',
    },
  },
  {
    q: {
      en: 'What is the main reason the absorption spectra of different stars look distinct?',
      ja: '異なる星の吸収スペクトルが違って見える主な理由は何ですか。',
    },
    options: [
      { en: 'Stars are made of completely different elements.', ja: '星はまったく異なる元素でできている。' },
      { en: 'The stars have different surface temperatures.', ja: '星の表面温度が異なる。' },
      { en: 'Interstellar dust alters the lines.', ja: '星間塵が線を変える。' },
      { en: 'Stars rotate at drastically different speeds.', ja: '星が大きく異なる速さで自転している。' },
    ],
    answer: 1,
    explain: {
      en: 'Most stars have nearly the same composition; their spectra differ mainly because of surface temperature.',
      ja: 'ほとんどの星の組成はほぼ同じで、スペクトルの違いは主に表面温度によります。',
    },
  },
  {
    q: {
      en: 'What is the order of the main spectral classes from hottest to coolest?',
      ja: '主要な分光型を、高温から低温の順に並べるとどれですか。',
    },
    options: [
      { en: 'O, B, A, F, G, K, M', ja: 'O, B, A, F, G, K, M' },
      { en: 'M, K, G, F, A, B, O', ja: 'M, K, G, F, A, B, O' },
      { en: 'A, B, C, D, E, F, G', ja: 'A, B, C, D, E, F, G' },
      { en: 'O, A, B, G, F, M, K', ja: 'O, A, B, G, F, M, K' },
    ],
    answer: 0,
    explain: {
      en: 'The sequence runs O, B, A, F, G, K, M — from the hottest (O) to the coolest (M).',
      ja: '順序は O, B, A, F, G, K, M——最も高温（O）から最も低温（M）まで。',
    },
  },
  {
    q: {
      en: 'In which spectral class are the hydrogen Balmer absorption lines strongest?',
      ja: '水素のバルマー吸収線が最も強く現れる分光型はどれですか。',
    },
    options: [
      { en: 'O stars', ja: 'O型星' },
      { en: 'A stars', ja: 'A型星' },
      { en: 'G stars', ja: 'G型星' },
      { en: 'M stars', ja: 'M型星' },
    ],
    answer: 1,
    explain: {
      en: 'Balmer lines peak in A stars (~10,000 K), where many hydrogen atoms are in the right energy level.',
      ja: 'バルマー線はA型星（約10,000 K）で最強になります。多くの水素原子が適切なエネルギー準位にあるためです。',
    },
  },
  {
    q: {
      en: 'What is the spectral classification of our Sun?',
      ja: '私たちの太陽の分光分類は何ですか。',
    },
    options: [
      { en: 'A0', ja: 'A0' },
      { en: 'F5', ja: 'F5' },
      { en: 'G2', ja: 'G2' },
      { en: 'M1', ja: 'M1' },
    ],
    answer: 2,
    explain: {
      en: 'The Sun is a G2 star, with a surface temperature of about 5,800 K.',
      ja: '太陽はG2型星で、表面温度は約5,800 Kです。',
    },
  },
  {
    q: {
      en: 'Which features dominate the spectra of the coolest M stars (below 3,500 K)?',
      ja: '最も低温のM型星（3,500 K未満）のスペクトルを支配する特徴はどれですか。',
    },
    options: [
      { en: 'Ionized helium lines', ja: '電離ヘリウムの線' },
      { en: 'Molecular bands of titanium oxide (TiO)', ja: '酸化チタン（TiO）の分子帯' },
      { en: 'Neutral hydrogen lines', ja: '中性水素の線' },
      { en: 'Highly ionized iron lines', ja: '高度に電離した鉄の線' },
    ],
    answer: 1,
    explain: {
      en: 'Cool M stars are cold enough for molecules to form; titanium oxide (TiO) bands dominate their spectra.',
      ja: '低温のM型星は分子ができるほど冷たく、酸化チタン（TiO）の帯がスペクトルを支配します。',
    },
  },
  {
    q: {
      en: 'The spectral classes L, T, and Y were created to classify which objects?',
      ja: '分光型 L・T・Y は、どの天体を分類するために作られましたか。',
    },
    options: [
      { en: 'Supergiant stars', ja: '超巨星' },
      { en: 'White dwarfs', ja: '白色矮星' },
      { en: 'Brown dwarfs', ja: '褐色矮星' },
      { en: 'Neutron stars', ja: '中性子星' },
    ],
    answer: 2,
    explain: {
      en: 'L, T, and Y classify cool, star-like objects and brown dwarfs cooler than spectral type M.',
      ja: 'L・T・Y は、M型より冷たい星のような天体や褐色矮星を分類します。',
    },
  },
  {
    q: {
      en: 'Which astronomer classified hundreds of thousands of stellar spectra at Harvard, developing the OBAFGKM sequence?',
      ja: 'ハーバードで数十万の恒星スペクトルを分類し、OBAFGKMの系列を作った天文学者は誰ですか。',
    },
    options: [
      { en: 'Cecilia Payne-Gaposchkin', ja: 'セシリア・ペイン＝ガポーシュキン' },
      { en: 'Annie Jump Cannon', ja: 'アニー・ジャンプ・キャノン' },
      { en: 'Margaret Huggins', ja: 'マーガレット・ハギンズ' },
      { en: 'Henrietta Swan Leavitt', ja: 'ヘンリエッタ・スワン・リービット' },
    ],
    answer: 1,
    explain: {
      en: 'Annie Jump Cannon classified vast numbers of spectra at Harvard and shaped the OBAFGKM sequence.',
      ja: 'アニー・ジャンプ・キャノンはハーバードで膨大なスペクトルを分類し、OBAFGKMの系列を形作りました。',
    },
  },
  {
    q: {
      en: 'How can astronomers tell a giant star from a main-sequence star of the same temperature by its spectrum?',
      ja: '同じ温度の巨星と主系列星を、スペクトルからどう見分けられますか。',
    },
    options: [
      { en: 'Giants have lower photospheric pressure, producing narrower spectral lines.', ja: '巨星は光球の圧力が低く、より狭いスペクトル線を作る。' },
      { en: 'Giants have higher photospheric pressure, producing broader lines.', ja: '巨星は光球の圧力が高く、より広い線を作る。' },
      { en: 'Giants show no hydrogen lines.', ja: '巨星は水素線を示さない。' },
      { en: 'Giants emit only in infrared.', ja: '巨星は赤外線でしか放射しない。' },
    ],
    answer: 0,
    explain: {
      en: 'A giant’s extended, low-density atmosphere has low pressure and fewer collisions, so its lines are narrow.',
      ja: '巨星の広がった低密度の大気は圧力が低く衝突も少ないため、線は狭くなります。',
    },
  },
  {
    q: {
      en: 'The Doppler shift in a star’s spectral lines directly reveals its:',
      ja: '星のスペクトル線のドップラー偏移が直接明らかにするのは：',
    },
    options: [
      { en: 'Transverse velocity across the sky', ja: '空を横切る横断速度' },
      { en: 'Radial velocity toward or away from us', ja: '私たちへ近づく／遠ざかる視線速度' },
      { en: 'Stellar diameter', ja: '星の直径' },
      { en: 'Total mass', ja: '総質量' },
    ],
    answer: 1,
    explain: {
      en: 'The Doppler shift measures line-of-sight (radial) velocity — motion toward or away from us.',
      ja: 'ドップラー偏移は視線方向（動径）の速度——私たちへの接近や遠ざかりを測ります。',
    },
  },
  {
    q: {
      en: 'What is a star’s slow angular motion across our line of sight, measured in arcseconds per year, called?',
      ja: '視線を横切る星のゆっくりした角運動（年あたりの秒角で測る）は何と呼ばれますか。',
    },
    options: [
      { en: 'Radial velocity', ja: '視線速度' },
      { en: 'Proper motion', ja: '固有運動' },
      { en: 'Parallax shift', ja: '視差のずれ' },
      { en: 'Space velocity', ja: '空間速度' },
    ],
    answer: 1,
    explain: {
      en: 'Proper motion is the angular change in a star’s position on the sky, transverse to our line of sight.',
      ja: '固有運動は、視線に対して横向きの、天球上での星の位置の角度変化です。',
    },
  },
  {
    q: {
      en: 'What does rapid stellar rotation do to a star’s absorption lines?',
      ja: '速い自転は星の吸収線に何をしますか。',
    },
    options: [
      { en: 'Shifts all lines toward the infrared.', ja: 'すべての線を赤外へずらす。' },
      { en: 'Broadens the lines, from blueshifts and redshifts on opposite limbs.', ja: '反対の縁からの青方偏移と赤方偏移で線を広げる。' },
      { en: 'Erases all metal lines.', ja: 'すべての金属線を消す。' },
      { en: 'Splits each line into exactly three.', ja: '各線をちょうど3本に分ける。' },
    ],
    answer: 1,
    explain: {
      en: 'One limb approaches (blueshift) and the other recedes (redshift), smearing each line wider.',
      ja: '一方の縁が近づき（青方偏移）他方が遠ざかる（赤方偏移）ため、各線が広がります。',
    },
  },
  {
    q: {
      en: 'In astronomical jargon, what do "metals" mean?',
      ja: '天文の用語で「金属」とは何を意味しますか。',
    },
    options: [
      { en: 'Only magnetic elements like iron, nickel, cobalt', ja: '鉄・ニッケル・コバルトのような磁性元素だけ' },
      { en: 'Elements that are solid conductors at room temperature', ja: '室温で固体の導体である元素' },
      { en: 'All elements heavier than helium', ja: 'ヘリウムより重いすべての元素' },
      { en: 'Elements heavier than lead', ja: '鉛より重い元素' },
    ],
    answer: 2,
    explain: {
      en: 'To astronomers, "metals" means every element heavier than hydrogen and helium.',
      ja: '天文学者にとって「金属」は、水素とヘリウムより重いすべての元素を意味します。',
    },
  },
];

const medium = [
  {
    q: {
      en: 'Star A has apparent magnitude 1.0 and Star B has 6.0. How do their apparent brightnesses compare?',
      ja: 'A星の見かけの等級は1.0、B星は6.0です。見かけの明るさはどう比べられますか。',
    },
    options: [
      { en: 'A is 5 times brighter than B.', ja: 'AはBの5倍明るい。' },
      { en: 'A is 6 times brighter than B.', ja: 'AはBの6倍明るい。' },
      { en: 'A is 100 times brighter than B.', ja: 'AはBの100倍明るい。' },
      { en: 'A is 1,000 times brighter than B.', ja: 'AはBの1,000倍明るい。' },
    ],
    answer: 2,
    explain: {
      en: 'A 5-magnitude difference is exactly a factor of 100 in brightness.',
      ja: '等級差5は、明るさでちょうど100倍にあたります。',
    },
  },
  {
    q: {
      en: 'Why are hydrogen lines weak or absent in the hottest O stars (>28,000 K), even though hydrogen is most abundant?',
      ja: '水素が最も豊富なのに、最も高温のO型星（>28,000 K）で水素線が弱いか消えているのはなぜですか。',
    },
    options: [
      { en: 'O stars have fused all their hydrogen into helium.', ja: 'O型星は水素をすべてヘリウムに融合してしまった。' },
      { en: 'Extreme heat fully ionizes hydrogen, leaving no bound electrons to make absorption lines.', ja: '極端な熱が水素を完全に電離させ、吸収線を作る束縛電子が残らない。' },
      { en: 'Hydrogen sinks to the core, away from the photosphere.', ja: '水素が核へ沈み、光球から離れる。' },
      { en: 'Magnetic fields block hydrogen light.', ja: '磁場が水素の光を遮る。' },
    ],
    answer: 1,
    explain: {
      en: 'At O-star temperatures hydrogen is almost fully ionized; with no bound electrons, it makes no absorption lines.',
      ja: 'O型星の温度では水素はほぼ完全に電離し、束縛電子がないため吸収線を作りません。',
    },
  },
  {
    q: {
      en: 'If all of a star’s absorption lines are shifted toward shorter (bluer) wavelengths, what does that mean?',
      ja: '星のすべての吸収線が短い（青い）波長へずれていたら、それは何を意味しますか。',
    },
    options: [
      { en: 'The star is moving away from Earth.', ja: '星は地球から遠ざかっている。' },
      { en: 'The star is moving toward Earth.', ja: '星は地球へ近づいている。' },
      { en: 'The star is expanding in diameter.', ja: '星の直径が膨張している。' },
      { en: 'The star is cooling rapidly.', ja: '星が急速に冷えている。' },
    ],
    answer: 1,
    explain: {
      en: 'A blueshift of all lines means the star is moving toward us along the line of sight.',
      ja: 'すべての線の青方偏移は、星が視線に沿って私たちへ近づいていることを意味します。',
    },
  },
  {
    q: {
      en: 'Stars 1 and 2 show the same proper motion (0.5″/yr), but Star 1 is twice as far away. What about their transverse velocities?',
      ja: '1番星と2番星は同じ固有運動（0.5″/年）ですが、1番星は2倍遠いです。横断速度はどうですか。',
    },
    options: [
      { en: 'Star 1 has twice the transverse velocity of Star 2.', ja: '1番星は2番星の2倍の横断速度。' },
      { en: 'Star 2 has twice the transverse velocity of Star 1.', ja: '2番星は1番星の2倍の横断速度。' },
      { en: 'They have identical transverse velocities.', ja: '横断速度は同じ。' },
      { en: 'Star 1 has four times the transverse velocity of Star 2.', ja: '1番星は2番星の4倍の横断速度。' },
    ],
    answer: 0,
    explain: {
      en: 'Same angular rate but twice the distance means Star 1 physically crosses twice the space each year.',
      ja: '同じ角速度でも距離が2倍なら、1番星は毎年2倍の距離を実際に横切ります。',
    },
  },
  {
    q: {
      en: 'Altair spins once every 8 hours and is flattened by it. How is this rapid spin confirmed spectroscopically?',
      ja: 'アルタイルは8時間ごとに1回自転し、それで扁平になっています。この速い自転は分光的にどう確認されますか。',
    },
    options: [
      { en: 'A periodic change in total magnitude every 8 hours.', ja: '8時間ごとの総等級の周期変化。' },
      { en: 'Severe Doppler broadening of its lines, as approaching and receding edges blend.', ja: '近づく縁と遠ざかる縁が混ざり、線が激しくドップラー広がりする。' },
      { en: 'Strong radio emission from its magnetic poles.', ja: '磁極からの強い電波放射。' },
      { en: 'A large proper-motion shift across the sky.', ja: '空を横切る大きな固有運動のずれ。' },
    ],
    answer: 1,
    explain: {
      en: 'Fast rotation blueshifts one limb and redshifts the other, blending into strongly broadened lines.',
      ja: '速い自転が一方の縁を青方偏移、他方を赤方偏移させ、混ざって強く広がった線になります。',
    },
  },
];

const hard = [
  {
    q: {
      en: 'Why must you know a star’s distance to turn its apparent brightness into its true luminosity?',
      ja: '見かけの明るさを真の光度に変えるのに、なぜ星の距離を知る必要があるのですか。',
    },
    options: [
      { en: 'Light spreads out in all directions, so apparent brightness falls with the inverse square of distance.', ja: '光は全方向に広がるので、見かけの明るさは距離の逆二乗で減る。' },
      { en: 'Distance changes the star’s surface temperature and color.', ja: '距離が星の表面温度と色を変える。' },
      { en: 'A star’s energy output drops as it moves from the Galaxy’s center.', ja: '星の出力は銀河中心から離れるほど下がる。' },
      { en: 'Photons lose energy traveling through the vacuum.', ja: '光子は真空を進む間にエネルギーを失う。' },
    ],
    answer: 0,
    explain: {
      en: 'Brightness dims as 1/distance²; knowing the distance lets you back out the true luminosity.',
      ja: '明るさは距離の2乗に反比例して暗くなります。距離が分かれば真の光度を逆算できます。',
    },
  },
  {
    q: {
      en: 'What was the significance of the Huggins’ 1860s spectroscopic observations of stars?',
      ja: '1860年代のハギンズ夫妻による星の分光観測の意義は何でしたか。',
    },
    options: [
      { en: 'They proved stars are powered by nuclear fusion.', ja: '星が核融合で動くと証明した。' },
      { en: 'They matched lines in stellar spectra to known Earth elements, showing stars are made of the same matter as Earth and the Sun.', ja: '恒星スペクトルの線を既知の地球の元素に対応させ、星が地球や太陽と同じ物質でできていることを示した。' },
      { en: 'They found the first brown dwarf.', ja: '最初の褐色矮星を発見した。' },
      { en: 'They mapped the Milky Way with 21-cm radiation.', ja: '21 cm放射で天の川を地図化した。' },
    ],
    answer: 1,
    explain: {
      en: 'The Huggins showed stellar spectral lines match Earthly elements — stars are made of the same stuff as Earth and Sun.',
      ja: 'ハギンズ夫妻は恒星の線が地球の元素と一致することを示しました——星は地球や太陽と同じ物質でできています。',
    },
  },
  {
    q: {
      en: 'How does high photospheric pressure in a main-sequence star broaden its spectral lines versus a giant’s narrow lines?',
      ja: '主系列星の高い光球圧は、巨星の狭い線に対してどのようにスペクトル線を広げますか。',
    },
    options: [
      { en: 'High pressure raises the temperature, shifting light higher in frequency.', ja: '高圧が温度を上げ、光をより高周波へずらす。' },
      { en: 'High density and pressure cause more particle collisions, disturbing energy levels and broadening the absorbed wavelengths.', ja: '高密度・高圧が粒子衝突を増やし、エネルギー準位を乱して吸収波長を広げる。' },
      { en: 'High pressure makes the star spin faster, causing broadening.', ja: '高圧が星を速く自転させ、広がりを生む。' },
      { en: 'High density absorbs light completely, leaving gaps.', ja: '高密度が光を完全に吸収し、隙間を残す。' },
    ],
    answer: 1,
    explain: {
      en: 'In a dense, high-pressure photosphere, frequent collisions blur atomic energy levels, widening the lines (pressure broadening).',
      ja: '密で高圧の光球では、頻繁な衝突が原子のエネルギー準位をぼかし、線を広げます（圧力広がり）。',
    },
  },
  {
    q: {
      en: 'Why do methane (CH₄) and ammonia (NH₃) lines appear in T and Y brown dwarfs but never in O or B stars?',
      ja: 'メタン（CH₄）やアンモニア（NH₃）の線が、T型・Y型褐色矮星に現れてO型・B型星には現れないのはなぜですか。',
    },
    options: [
      { en: 'Main-sequence stars contain no carbon or nitrogen.', ja: '主系列星に炭素や窒素がない。' },
      { en: 'Brown dwarfs are cool enough (<1,300 K) for molecular bonds to survive without being broken by thermal collisions.', ja: '褐色矮星は十分冷たく（<1,300 K）、熱衝突で壊されずに分子結合が保たれる。' },
      { en: 'Fusion on brown dwarf surfaces makes methane and ammonia.', ja: '褐色矮星の表面の核融合がメタンとアンモニアを作る。' },
      { en: 'Magnetic fields on O and B stars destroy compounds.', ja: 'O型・B型星の磁場が化合物を破壊する。' },
    ],
    answer: 1,
    explain: {
      en: 'Only cool objects (<1,300 K) let fragile molecules like methane and ammonia survive; hot stars dissociate them.',
      ja: '冷たい天体（<1,300 K）だけが、メタンやアンモニアのようなもろい分子を保てます。熱い星はそれらを解離させます。',
    },
  },
  {
    q: {
      en: 'How do astronomers build a star’s full 3D space velocity relative to the Sun?',
      ja: '天文学者は、太陽に対する星の完全な3次元空間速度をどう組み立てますか。',
    },
    options: [
      { en: 'By combining radial velocity (from Doppler shifts) with transverse velocity (from proper motion and distance).', ja: '（ドップラー偏移からの）視線速度と、（固有運動と距離からの）横断速度を組み合わせて。' },
      { en: 'By multiplying apparent magnitude by distance in parsecs.', ja: '見かけの等級にパーセクの距離を掛けて。' },
      { en: 'By measuring its orbital period around the Galactic center.', ja: '銀河中心のまわりの公転周期を測って。' },
      { en: 'By comparing its spectral class to white dwarf cooling tracks.', ja: 'その分光型を白色矮星の冷却経路と比べて。' },
    ],
    answer: 0,
    explain: {
      en: 'The 3D space velocity combines radial velocity (Doppler) and transverse velocity (proper motion × distance) as perpendicular components.',
      ja: '3次元空間速度は、視線速度（ドップラー）と横断速度（固有運動×距離）を垂直な成分として合成します。',
    },
  },
];

export default { easy, medium, hard };
