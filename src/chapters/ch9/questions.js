const easy = [
  {
    q: {
      en: 'What fraction of Earth’s mass does the Moon possess?',
      ja: '月は地球の質量のどれくらいの割合を持っていますか。',
    },
    options: [
      { en: 'One-fourth', ja: '4分の1' },
      { en: 'One-sixth', ja: '6分の1' },
      { en: 'One-eightieth', ja: '80分の1' },
      { en: 'One-hundredth', ja: '100分の1' },
    ],
    answer: 2,
    explain: {
      en: 'The Moon has only about 1/80 the mass of Earth.',
      ja: '月の質量は地球のわずか約80分の1しかありません。',
    },
  },
  {
    q: {
      en: 'Which NASA spacecraft was deliberately crashed into the Cabeus crater near the Moon’s South Pole in 2009 to detect water vapor?',
      ja: '2009年に水蒸気を検出するため、月の南極付近のカベウスクレーターに意図的に衝突させられたNASAの探査機はどれですか。',
    },
    options: [
      { en: 'GRAIL', ja: 'GRAIL（グレイル）' },
      { en: 'LRO', ja: 'LRO（月周回偵察衛星）' },
      { en: 'LCROSS', ja: 'LCROSS（エルクロス）' },
      { en: 'Surveyor 3', ja: 'サーベイヤー3号' },
    ],
    answer: 2,
    explain: {
      en: 'The LCROSS spacecraft was crashed into the Cabeus crater in 2009, and the debris plume revealed water vapor.',
      ja: 'LCROSS探査機は2009年にカベウスクレーターへ衝突させられ、舞い上がった噴出物から水蒸気が検出されました。',
    },
  },
  {
    q: {
      en: 'What percentage of the Moon’s surface is covered by the dark, flat basaltic lava plains known as the maria?',
      ja: '「海（マリア）」として知られる暗く平らな玄武岩の溶岩平原は、月の表面の何パーセントを覆っていますか。',
    },
    options: [
      { en: '83%', ja: '83%' },
      { en: '50%', ja: '50%' },
      { en: '33%', ja: '33%' },
      { en: '17%', ja: '17%' },
    ],
    answer: 3,
    explain: {
      en: 'The maria cover only about 17% of the lunar surface, mostly on the side facing Earth.',
      ja: '海（マリア）は月面のわずか約17%を覆うにすぎず、その大半は地球に面した側にあります。',
    },
  },
  {
    q: {
      en: 'The old, heavily cratered lunar highlands (which cover 83% of the surface) consist primarily of which low-density silicate rock?',
      ja: '古くクレーターに覆われた月の高地（表面の83%を占める）は、主にどの低密度のケイ酸塩岩からなりますか。',
    },
    options: [
      { en: 'Basalt', ja: '玄武岩' },
      { en: 'Granite', ja: '花崗岩' },
      { en: 'Anorthosite', ja: '斜長岩' },
      { en: 'Iron-nickel', ja: '鉄ニッケル' },
    ],
    answer: 2,
    explain: {
      en: 'The lunar highlands are made largely of anorthosite, a low-density silicate rock.',
      ja: '月の高地は主に、低密度のケイ酸塩岩である斜長岩でできています。',
    },
  },
  {
    q: {
      en: 'What is the name of the youngest of the large lunar impact basins, 1,000 km in diameter, which retains a striking “bull’s-eye” appearance because it has not been completely filled in with lava?',
      ja: '直径1,000 kmの月の大きな衝突盆地のうち最も新しく、溶岩で完全には埋め尽くされていないため、際立った「弓の的（ブルズアイ）」状の姿を保っているものの名前は何ですか。',
    },
    options: [
      { en: 'Tycho', ja: 'ティコ' },
      { en: 'Mare Orientale', ja: '東の海（マレ・オリエンターレ）' },
      { en: 'Copernicus', ja: 'コペルニクス' },
      { en: 'Caloris Basin', ja: 'カロリス盆地' },
    ],
    answer: 1,
    explain: {
      en: 'Mare Orientale is the youngest large impact basin and, being only partly flooded by lava, still shows a distinct bull’s-eye pattern.',
      ja: '東の海（マレ・オリエンターレ）は最も新しい大きな衝突盆地で、溶岩に部分的にしか埋められていないため、はっきりとした弓の的状の模様を今も見せています。',
    },
  },
  {
    q: {
      en: 'Who was one of the first geologists to reason in the 1890s that lunar craters must be the result of impacts rather than volcanic origins?',
      ja: '1890年代に、月のクレーターは火山起源ではなく衝突の結果に違いないと推論した最初の地質学者の一人は誰ですか。',
    },
    options: [
      { en: 'Grove K. Gilbert', ja: 'グローブ・K・ギルバート' },
      { en: 'Alfred Wegener', ja: 'アルフレート・ウェゲナー' },
      { en: 'Jean Foucault', ja: 'ジャン・フーコー' },
      { en: 'Harrison Schmitt', ja: 'ハリソン・シュミット' },
    ],
    answer: 0,
    explain: {
      en: 'Geologist Grove K. Gilbert reasoned in the 1890s that lunar craters were formed by impacts, not volcanism.',
      ja: '地質学者グローブ・K・ギルバートは1890年代に、月のクレーターは火山活動ではなく衝突によって形成されたと推論しました。',
    },
  },
  {
    q: {
      en: 'What is the minimum speed (escape velocity) at which an incoming projectile strikes the surface of the Moon?',
      ja: '飛来する天体が月の表面に衝突する最低速度（脱出速度）はどれくらいですか。',
    },
    options: [
      { en: '11.2 km/s', ja: '11.2 km/s' },
      { en: '4.3 km/s', ja: '4.3 km/s' },
      { en: '2.4 km/s', ja: '2.4 km/s' },
      { en: '1.3 km/s', ja: '1.3 km/s' },
    ],
    answer: 2,
    explain: {
      en: 'A projectile hits the Moon at no less than its escape velocity of 2.4 km/s.',
      ja: '飛来天体は、月の脱出速度である2.4 km/sを下回らない速度で衝突します。',
    },
  },
  {
    q: {
      en: 'In a high-speed impact, the diameter of the final excavated crater is generally how many times the diameter of the striking projectile?',
      ja: '高速の衝突では、最終的に掘り出されるクレーターの直径は、一般に衝突した天体の直径の何倍になりますか。',
    },
    options: [
      { en: '2 to 3 times', ja: '2〜3倍' },
      { en: '5 times', ja: '5倍' },
      { en: '10 to 15 times', ja: '10〜15倍' },
      { en: '50 to 100 times', ja: '50〜100倍' },
    ],
    answer: 2,
    explain: {
      en: 'A high-speed impact typically excavates a crater about 10 to 15 times the diameter of the projectile.',
      ja: '高速の衝突は通常、飛来天体の直径の約10〜15倍のクレーターを掘り出します。',
    },
  },
  {
    q: {
      en: 'What were the three early standard hypotheses for the origin of the Moon before the giant impact hypothesis?',
      ja: 'ジャイアント・インパクト説以前に唱えられていた、月の起源についての初期の標準的な3つの仮説は何でしたか。',
    },
    options: [
      { en: 'The collision theory, the orbital theory, the nebula theory', ja: '衝突説、軌道説、星雲説' },
      { en: 'The fission theory, the sister theory, the capture theory', ja: '分裂説、双子（姉妹）説、捕獲説' },
      { en: 'The accretion theory, the tide theory, the planetary theory', ja: '集積説、潮汐説、惑星説' },
      { en: 'The volcanic theory, the atmospheric theory, the escape theory', ja: '火山説、大気説、脱出説' },
    ],
    answer: 1,
    explain: {
      en: 'The three early ideas were the fission theory, the sister (co-formation) theory, and the capture theory.',
      ja: '初期の3つの考えは、分裂説、双子（同時形成）説、そして捕獲説でした。',
    },
  },
  {
    q: {
      en: 'What is the orbital period of Mercury around the Sun?',
      ja: '水星が太陽を公転する周期はどれくらいですか。',
    },
    options: [
      { en: '59 days', ja: '59日' },
      { en: '88 days', ja: '88日' },
      { en: '27.3 days', ja: '27.3日' },
      { en: '243 days', ja: '243日' },
    ],
    answer: 1,
    explain: {
      en: 'Mercury orbits the Sun once every 88 days.',
      ja: '水星は88日ごとに太陽を1周します。',
    },
  },
  {
    q: {
      en: 'Mercury’s high density tells us it is dominated by a metallic iron-nickel core that accounts for what percentage of its total mass?',
      ja: '水星の高い密度は、金属の鉄ニッケルの核が支配的であることを示しますが、その核は全質量の何パーセントを占めますか。',
    },
    options: [
      { en: '10%', ja: '10%' },
      { en: '33%', ja: '33%' },
      { en: '60%', ja: '60%' },
      { en: '99%', ja: '99%' },
    ],
    answer: 2,
    explain: {
      en: 'Mercury’s metallic iron-nickel core makes up about 60% of its total mass, giving the planet its high density.',
      ja: '水星の金属の鉄ニッケルの核は全質量の約60%を占め、この惑星に高い密度を与えています。',
    },
  },
  {
    q: {
      en: 'What is the largest known structural feature on Mercury, a partially flooded impact basin about 1,300 km in diameter?',
      ja: '水星で知られている最大の構造で、直径約1,300 kmの部分的に溶岩で埋められた衝突盆地は何ですか。',
    },
    options: [
      { en: 'Discovery Scarp', ja: 'ディスカバリー崖（ディスカバリー・スカープ）' },
      { en: 'Caloris Basin', ja: 'カロリス盆地' },
      { en: 'Mare Orientale', ja: '東の海（マレ・オリエンターレ）' },
      { en: 'Tartarus Dorsa', ja: 'タルタルス・ドルサ' },
    ],
    answer: 1,
    explain: {
      en: 'The Caloris Basin, about 1,300 km across, is the largest known structural feature on Mercury.',
      ja: '直径約1,300 kmのカロリス盆地は、水星で知られている最大の構造です。',
    },
  },
  {
    q: {
      en: 'What is the exact rotation period of Mercury on its axis?',
      ja: '水星が自転軸のまわりを自転する正確な周期はどれくらいですか。',
    },
    options: [
      { en: '88 days', ja: '88日' },
      { en: '59 days', ja: '59日' },
      { en: '27.3 days', ja: '27.3日' },
      { en: '24.6 hours', ja: '24.6時間' },
    ],
    answer: 1,
    explain: {
      en: 'Mercury rotates once every 59 days, exactly two-thirds of its 88-day orbital period.',
      ja: '水星は59日ごとに1回自転し、これは88日の公転周期のちょうど3分の2にあたります。',
    },
  },
  {
    q: {
      en: 'What are the prominent, long cliffs on Mercury’s surface (such as Discovery Scarp), nearly 1 km high and extending for hundreds of km?',
      ja: '水星の表面にある、高さ約1 kmで数百kmにわたって延びる、目立つ長い崖（ディスカバリー崖など）を何と呼びますか。',
    },
    options: [
      { en: 'Rifts', ja: 'リフト（地溝）' },
      { en: 'Coronae', ja: 'コロナ（環状構造）' },
      { en: 'Scarps', ja: '崖（スカープ）' },
      { en: 'Rilles', ja: 'リル（溝）' },
    ],
    answer: 2,
    explain: {
      en: 'These long, high cliffs on Mercury are called scarps.',
      ja: '水星のこうした長く高い崖は、スカープ（崖）と呼ばれます。',
    },
  },
  {
    q: {
      en: 'In contrast with the scientists commemorated on the Moon, how are craters on Mercury named?',
      ja: '月で記念される科学者たちとは対照的に、水星のクレーターはどのように名づけられますか。',
    },
    options: [
      { en: 'For famous astronauts and space explorers', ja: '有名な宇宙飛行士や宇宙探検家にちなんで' },
      { en: 'In honor of artists, writers, composers, and other contributors to the humanities', ja: '芸術家、作家、作曲家など人文の分野に貢献した人々をたたえて' },
      { en: 'For ancient mythological gods of fire and thunder', ja: '火と雷の古代神話の神々にちなんで' },
      { en: 'For major political and historic figures', ja: '主要な政治家や歴史上の人物にちなんで' },
    ],
    answer: 1,
    explain: {
      en: 'Craters on Mercury are named in honor of artists, writers, composers, and other contributors to the humanities.',
      ja: '水星のクレーターは、芸術家、作家、作曲家など人文の分野に貢献した人々をたたえて名づけられます。',
    },
  },
];

const medium = [
  {
    q: {
      en: 'A lunar highland region has ten times more craters than an equivalent area of maria, yet dating shows the highlands are only slightly older (4.2 vs 3.8 billion years). What must astronomers conclude?',
      ja: 'ある月の高地は、同じ面積の海（マリア）の10倍のクレーターを持ちますが、年代測定では高地はわずかに古いだけ（42億年対38億年）です。天文学者は何を結論しなければなりませんか。',
    },
    options: [
      { en: 'Highlands erode ten times slower than the maria.', ja: '高地は海の10分の1の速さでしか侵食されない。' },
      { en: 'The rate of impacts was not constant and was much higher in the early solar system.', ja: '衝突の頻度は一定ではなく、初期の太陽系でははるかに高かった。' },
      { en: 'The Moon must have formed 38 billion years ago.', ja: '月は380億年前に形成されたに違いない。' },
      { en: 'Maria basalt repels meteorites due to its higher density.', ja: '海の玄武岩は密度が高いため隕石をはじく。' },
    ],
    answer: 1,
    explain: {
      en: 'A tenfold difference in craters over only 0.4 billion years shows impacts were far more frequent early on, not constant over time.',
      ja: 'わずか4億年の差で10倍ものクレーター数の違いが生じることは、衝突が時間を通じて一定ではなく、初期にはるかに多かったことを示します。',
    },
  },
  {
    q: {
      en: 'Why do scientists reject the capture theory (that the Moon formed elsewhere and was captured by Earth)?',
      ja: '科学者が捕獲説（月は別の場所で形成され地球に捕獲されたとする説）を退けるのはなぜですか。',
    },
    options: [
      { en: 'The Moon is geologically dead and could not survive capture forces.', ja: '月は地質学的に死んでおり、捕獲の力に耐えられないから。' },
      { en: 'A capture event requires an improbable loss of energy, would result in an eccentric orbit, and fails to explain identical oxygen isotope fractions.', ja: '捕獲にはあり得にくいエネルギーの喪失が必要で、離心率の大きな軌道になるはずであり、同一の酸素同位体比を説明できないから。' },
      { en: 'Earth’s gravity is too weak to retain any object larger than an asteroid.', ja: '地球の重力は小惑星より大きな天体をつなぎとめるには弱すぎるから。' },
      { en: 'It does not account for the high concentration of water ice on the Moon’s surface.', ja: '月面の高濃度の水の氷を説明できないから。' },
    ],
    answer: 1,
    explain: {
      en: 'Capture requires an improbable loss of energy and would leave an eccentric orbit, and it cannot explain why the Moon shares Earth’s oxygen isotope ratios.',
      ja: '捕獲にはあり得にくいエネルギーの喪失が必要で離心率の大きな軌道が残るはずであり、月が地球と同じ酸素同位体比を持つ理由も説明できません。',
    },
  },
  {
    q: {
      en: 'How did astronomers in the mid-1960s use radar to prove Mercury does not keep one face permanently toward the Sun?',
      ja: '1960年代半ばの天文学者は、水星が常に同じ面を太陽に向けているわけではないことを、レーダーを使ってどのように証明しましたか。',
    },
    options: [
      { en: 'They photographed volcanic plumes across the dark side.', ja: '夜側を横切る火山の噴煙を撮影した。' },
      { en: 'They measured the Doppler shift and broadening of returned radar waves, indicating one side moving toward Earth while the other moved away.', ja: '反射したレーダー波のドップラーシフトと広がりを測定し、一方の側が地球に近づき他方が遠ざかっていることを示した。' },
      { en: 'They calculated Mercury’s gravitational pull on Venus.', ja: '水星が金星に及ぼす重力を計算した。' },
      { en: 'They observed seasonal ice-cap evaporation through optical telescopes.', ja: '光学望遠鏡で季節的な氷冠の蒸発を観測した。' },
    ],
    answer: 1,
    explain: {
      en: 'Radar echoes were Doppler-broadened because one edge of the rotating planet approached Earth while the other receded, revealing that Mercury spins.',
      ja: '自転する水星の一方の縁が地球に近づき他方が遠ざかるため、レーダーの反射波がドップラー効果で広がり、水星が自転していることが明らかになりました。',
    },
  },
  {
    q: {
      en: 'What explains the long, planet-wide scarps on Mercury that cut across existing impact craters?',
      ja: '既存の衝突クレーターを横切って延びる、水星の長い惑星規模の崖（スカープ）は何で説明されますか。',
    },
    options: [
      { en: 'Active plate tectonics constantly shifting Mercury’s crustal plates.', ja: '水星の地殻プレートを絶えず動かす活発なプレートテクトニクス。' },
      { en: 'Extensive volcanic lava flows that filled old cracks.', ja: '古い割れ目を埋めた大規模な溶岩流。' },
      { en: 'Global compression and shrinking of Mercury’s crust as its large iron core cooled.', ja: '大きな鉄の核が冷えるにつれて生じた、水星の地殻の全体的な圧縮と収縮。' },
      { en: 'Strong gravitational pulls from the Sun stretching the planet’s equator.', ja: '惑星の赤道を引き伸ばす太陽からの強い重力。' },
    ],
    answer: 2,
    explain: {
      en: 'As Mercury’s large iron core cooled and shrank, the whole planet contracted, wrinkling the crust into long scarps.',
      ja: '水星の大きな鉄の核が冷えて縮むと惑星全体が収縮し、地殻がしわ寄せられて長いスカープを作りました。',
    },
  },
  {
    q: {
      en: 'Why are impact craters almost always circular, rather than oval, even when the projectile strikes at an angle?',
      ja: '飛来天体が斜めに衝突しても、衝突クレーターがほとんど常に楕円ではなく円形になるのはなぜですか。',
    },
    options: [
      { en: 'Gravity pulls all incoming objects straight down.', ja: '重力がすべての飛来天体をまっすぐ下へ引き寄せるから。' },
      { en: 'The extreme speed of the impact causes a violent explosion that excavates material symmetrically.', ja: '衝突の極端な速さが激しい爆発を引き起こし、物質を対称的に掘り出すから。' },
      { en: 'Lunar soil flows like liquid to smooth out irregular shapes.', ja: '月の土が液体のように流れて不規則な形をならすから。' },
      { en: 'Solar wind erodes the rims into perfect circles over time.', ja: '太陽風が時間をかけて縁を完全な円に侵食するから。' },
    ],
    answer: 1,
    explain: {
      en: 'The projectile’s enormous energy is released as a symmetric explosion, excavating a circular crater regardless of impact angle.',
      ja: '飛来天体の巨大なエネルギーは対称的な爆発として解放されるため、衝突角度によらず円形のクレーターが掘り出されます。',
    },
  },
];

const hard = [
  {
    q: {
      en: 'Why is the discovery of water ice in permanently shadowed polar craters a major milestone for human space exploration?',
      ja: '永久に日の当たらない極のクレーターで水の氷が発見されたことが、人類の宇宙探査にとって大きな節目となるのはなぜですか。',
    },
    options: [
      { en: 'It proves the Moon once had liquid water oceans identical to Earth’s.', ja: '月にかつて地球と同じ液体の海があったことを証明するから。' },
      { en: 'It will let scientists easily build a global atmosphere on the Moon.', ja: '科学者が月に全球的な大気を容易に作れるようになるから。' },
      { en: 'It provides an accessible source of water and oxygen for human life, and can be broken into hydrogen and oxygen for rocket fuel.', ja: '人間の生活のための水と酸素の利用しやすい供給源となり、また水素と酸素に分解してロケット燃料にできるから。' },
      { en: 'It can cool the boiling lunar soil during the two-week day.', ja: '2週間続く昼の間に沸騰する月の土を冷やせるから。' },
    ],
    answer: 2,
    explain: {
      en: 'Polar ice offers a local source of drinking water and breathable oxygen, and can be split into hydrogen and oxygen for rocket fuel.',
      ja: '極の氷は飲み水と呼吸用の酸素を現地で供給し、さらに水素と酸素に分解してロケット燃料にもできます。',
    },
  },
  {
    q: {
      en: 'How does the Giant Impact Hypothesis explain both the similarities and differences between Earth and the Moon?',
      ja: 'ジャイアント・インパクト説は、地球と月の類似点と相違点の両方をどのように説明しますか。',
    },
    options: [
      { en: 'Earth’s gravity selectively pulled metals out of the Moon after it formed.', ja: '月が形成された後、地球の重力が月から金属を選択的に引き抜いた。' },
      { en: 'The Moon lacks a large metal core (forming from the stony mantles of Earth and the impactor) and lacks volatiles (lost in high heat) while sharing identical oxygen isotopes.', ja: '月は（地球と衝突天体の岩石質のマントルから形成されたため）大きな金属の核を持たず、また（高温で失われたため）揮発性物質を欠く一方、同一の酸素同位体を共有している。' },
      { en: 'The Moon was originally a captured planet that collided with a comet.', ja: '月は元々、彗星と衝突した捕獲された惑星だった。' },
      { en: 'The Moon is made entirely of primitive material that never differentiated.', ja: '月は分化を経なかった始原的な物質だけでできている。' },
    ],
    answer: 1,
    explain: {
      en: 'Forming from the stony mantles of Earth and the impactor leaves the Moon with little metal and few volatiles, yet the same oxygen isotopes as Earth.',
      ja: '地球と衝突天体の岩石質マントルから形成されたため、月は金属や揮発性物質に乏しい一方、地球と同じ酸素同位体を持っています。',
    },
  },
  {
    q: {
      en: 'What does Mercury’s very high density, combined with its small size, reveal about its history?',
      ja: '水星の非常に高い密度は、その小ささと合わせて、その歴史について何を明らかにしますか。',
    },
    options: [
      { en: 'It formed from the outer solar nebula where light ices are compressed.', ja: '軽い氷が圧縮される外側の太陽星雲から形成された。' },
      { en: 'It is dominated by a giant iron core, likely because early giant impacts stripped away a large fraction of its original rocky silicate mantle.', ja: '巨大な鉄の核が支配的であり、これはおそらく初期の巨大衝突が元々の岩石質ケイ酸塩マントルの大部分を剥ぎ取ったためである。' },
      { en: 'It never experienced differentiation, keeping metals and silicates mixed.', ja: '分化を経ておらず、金属とケイ酸塩が混ざったままである。' },
      { en: 'It has a high density because of a thick atmosphere weighing down on the crust.', ja: '厚い大気が地殻を押さえつけているため密度が高い。' },
    ],
    answer: 1,
    explain: {
      en: 'Mercury’s high density points to an oversized iron core, likely because giant early impacts blasted away much of its rocky mantle.',
      ja: '水星の高い密度は過大な鉄の核を示しており、これはおそらく初期の巨大衝突が岩石質マントルの多くを吹き飛ばしたためです。',
    },
  },
  {
    q: {
      en: 'Why do the Moon and Mercury serve as invaluable “windows” into the early solar system compared to Earth?',
      ja: '月と水星が、地球に比べて初期の太陽系をのぞく貴重な「窓」となるのはなぜですか。',
    },
    options: [
      { en: 'They are billions of years older than the Earth.', ja: '地球より何十億年も古いから。' },
      { en: 'Because they are geologically dead and lack atmospheres, their surfaces preserve the ancient impact and cratering history that Earth’s active geology has erased.', ja: '地質学的に死んでおり大気を欠くため、地球の活発な地質活動が消し去った古い衝突とクレーターの歴史を、その表面が保存しているから。' },
      { en: 'They contain a wider range of volatile elements that remain frozen.', ja: '凍ったまま残るより幅広い揮発性元素を含んでいるから。' },
      { en: 'They allow us to observe active plate tectonics and mountain building.', ja: '活発なプレートテクトニクスや造山活動を観察できるから。' },
    ],
    answer: 1,
    explain: {
      en: 'Lacking active geology and atmospheres, the Moon and Mercury preserve an ancient cratering record that erosion and plate tectonics have wiped from Earth.',
      ja: '活発な地質活動も大気も持たない月と水星は、侵食やプレートテクトニクスが地球から消し去った古いクレーターの記録を保存しています。',
    },
  },
  {
    q: {
      en: 'What is the origin and physical nature of the “soil” (regolith) covering the Moon’s surface?',
      ja: '月の表面を覆う「土壌」（レゴリス）の起源と物理的な性質は何ですか。',
    },
    options: [
      { en: 'Volcanic ash deposited during the eruptions that filled the maria.', ja: '海を埋めた噴火の際に堆積した火山灰。' },
      { en: 'Wind-blown sand deposited when the Moon had a thick atmosphere.', ja: '月に厚い大気があったころに風で運ばれて堆積した砂。' },
      { en: 'Cosmic dust grains that fell directly from the solar wind.', ja: '太陽風から直接降り注いだ宇宙塵の粒子。' },
      { en: 'A powdery, porous layer of tiny, shattered rock fragments produced by billions of years of cosmic impacts.', ja: '何十億年もの宇宙からの衝突によって生じた、砕けた微小な岩石片からなる粉状で多孔質の層。' },
    ],
    answer: 3,
    explain: {
      en: 'The lunar regolith is a powdery, porous layer of pulverized rock fragments built up by billions of years of cosmic impacts.',
      ja: '月のレゴリスは、何十億年もの宇宙からの衝突によって砕かれた岩石片が積み重なってできた、粉状で多孔質の層です。',
    },
  },
];

export default { easy, medium, hard };
