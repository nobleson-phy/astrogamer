const easy = [
  {
    q: {
      en: 'What is the approximate atmospheric surface pressure on Venus compared with Earth?',
      ja: '金星の地表の大気圧は、地球と比べておよそどれくらいですか。',
    },
    options: [
      { en: '0.007 bar (less than 1% of Earth’s)', ja: '0.007気圧（地球の1%未満）' },
      { en: '1.0 bar (identical to Earth’s)', ja: '1.0気圧（地球と同じ）' },
      { en: '90 bars (about 90× Earth’s)', ja: '90気圧（地球の約90倍）' },
      { en: '400 bars (about 400× Earth’s)', ja: '400気圧（地球の約400倍）' },
    ],
    answer: 2,
    explain: {
      en: 'Venus’s surface pressure is about 90 bars, roughly 90 times that of Earth.',
      ja: '金星の地表気圧は約90気圧で、地球のおよそ90倍です。',
    },
  },
  {
    q: {
      en: 'Mars appears red primarily because of what material in its soil?',
      ja: '火星が赤く見えるのは、主に土壌中のどの物質のためですか。',
    },
    options: [
      { en: 'Sulfuric acid droplets', ja: '硫酸の液滴' },
      { en: 'Iron oxides', ja: '酸化鉄' },
      { en: 'Liquid methane', ja: '液体メタン' },
      { en: 'Hydrated salts', ja: '含水塩' },
    ],
    answer: 1,
    explain: {
      en: 'Mars is red because its soil contains iron oxides (rust).',
      ja: '火星が赤いのは、土壌に酸化鉄（さび）が含まれているためです。',
    },
  },
  {
    q: {
      en: 'Which Soviet spacecraft was the first probe to land and broadcast data from the surface of Venus, in 1970?',
      ja: '1970年に金星の表面に着陸し、初めてそこからデータを送信したソ連の探査機はどれですか。',
    },
    options: [
      { en: 'Mariner 2', ja: 'マリナー2号' },
      { en: 'Venera 7', ja: 'ベネラ7号' },
      { en: 'Magellan', ja: 'マゼラン' },
      { en: 'Pioneer Venus', ja: 'パイオニア・ビーナス' },
    ],
    answer: 1,
    explain: {
      en: 'Venera 7 was the first probe to land and transmit data from the surface of Venus, in 1970.',
      ja: 'ベネラ7号は、1970年に金星表面に着陸してデータを送信した最初の探査機でした。',
    },
  },
  {
    q: {
      en: 'Which radar-mapping spacecraft, launched by NASA in 1989, mapped Venus’s surface at 100-metre resolution?',
      ja: '1989年にNASAが打ち上げ、金星の表面を100メートルの分解能で地図化したレーダー探査機はどれですか。',
    },
    options: [
      { en: 'Pioneer Venus', ja: 'パイオニア・ビーナス' },
      { en: 'Venera 15', ja: 'ベネラ15号' },
      { en: 'Magellan', ja: 'マゼラン' },
      { en: 'Cassini', ja: 'カッシーニ' },
    ],
    answer: 2,
    explain: {
      en: 'The Magellan spacecraft mapped Venus’s surface by radar at about 100-metre resolution.',
      ja: 'マゼラン探査機は、金星の表面をレーダーで約100メートルの分解能で地図化しました。',
    },
  },
  {
    q: {
      en: 'What is the highest mountain region on Venus, rising 11 km above the lowlands?',
      ja: '低地から11 kmそびえる、金星で最も高い山岳地域は何ですか。',
    },
    options: [
      { en: 'Sif Mons', ja: 'シフ山（シフ・モンス）' },
      { en: 'Maxwell Mountains', ja: 'マクスウェル山脈（マクスウェル・モンテス）' },
      { en: 'Olympus Mons', ja: 'オリンポス山（オリンポス・モンス）' },
      { en: 'Aphrodite Terra', ja: 'アフロディーテ大陸（アフロディーテ・テラ）' },
    ],
    answer: 1,
    explain: {
      en: 'The Maxwell Mountains are the highest region on Venus, rising about 11 km above the lowlands.',
      ja: 'マクスウェル山脈は金星で最も高い地域で、低地から約11 kmそびえています。',
    },
  },
  {
    q: {
      en: 'Why are there no impact craters smaller than 10 km on Venus?',
      ja: '金星に10 kmより小さい衝突クレーターが存在しないのはなぜですか。',
    },
    options: [
      { en: 'Venus’s active plate tectonics erase all small craters.', ja: '金星の活発なプレートテクトニクスが小さなクレーターをすべて消してしまうから。' },
      { en: 'Projectiles smaller than about 1 km are stopped and burned up by the thick atmosphere.', ja: '約1 kmより小さな飛来天体は、厚い大気に止められて燃え尽きるから。' },
      { en: 'Wind erosion rapidly fills in smaller craters.', ja: '風による侵食が小さなクレーターを急速に埋めてしまうから。' },
      { en: 'Subsurface volcanism continuously paves over smaller depressions.', ja: '地下の火山活動が小さなくぼみを絶えず覆い隠すから。' },
    ],
    answer: 1,
    explain: {
      en: 'Venus’s dense atmosphere stops and burns up projectiles smaller than about 1 km, so no small craters form.',
      ja: '金星の濃い大気は約1 kmより小さな飛来天体を止めて燃やし尽くすため、小さなクレーターができません。',
    },
  },
  {
    q: {
      en: 'What is the approximate chemical composition of Venus’s atmosphere?',
      ja: '金星の大気のおおよその化学組成はどれですか。',
    },
    options: [
      { en: '78% Nitrogen, 21% Oxygen', ja: '窒素78%、酸素21%' },
      { en: '96% Carbon Dioxide, 3.5% Nitrogen', ja: '二酸化炭素96%、窒素3.5%' },
      { en: '95% Carbon Dioxide, 3% Nitrogen, 2% Argon', ja: '二酸化炭素95%、窒素3%、アルゴン2%' },
      { en: '75% Hydrogen, 25% Helium', ja: '水素75%、ヘリウム25%' },
    ],
    answer: 1,
    explain: {
      en: 'Venus’s atmosphere is about 96% carbon dioxide and 3.5% nitrogen.',
      ja: '金星の大気は約96%が二酸化炭素、3.5%が窒素です。',
    },
  },
  {
    q: {
      en: 'Venus’s thick reflective clouds (30–60 km altitude) are composed primarily of droplets of what?',
      ja: '金星の厚く反射性の高い雲（高度30〜60 km）は、主に何の液滴でできていますか。',
    },
    options: [
      { en: 'Liquid water', ja: '液体の水' },
      { en: 'Sulfuric acid', ja: '硫酸' },
      { en: 'Liquid methane and ethane', ja: '液体メタンとエタン' },
      { en: 'Carbon dioxide ice (dry ice)', ja: '二酸化炭素の氷（ドライアイス）' },
    ],
    answer: 1,
    explain: {
      en: 'Venus’s reflective clouds are made mostly of droplets of sulfuric acid.',
      ja: '金星の反射性の雲は、主に硫酸の液滴でできています。',
    },
  },
  {
    q: {
      en: 'In 1976, which twin NASA landers touched down on Mars to photograph the surface and search for life?',
      ja: '1976年に火星に着陸し、地表を撮影して生命を探した2機一組のNASA着陸機はどれですか。',
    },
    options: [
      { en: 'Spirit and Opportunity', ja: 'スピリットとオポチュニティ' },
      { en: 'Viking 1 and Viking 2', ja: 'バイキング1号とバイキング2号' },
      { en: 'Pathfinder and Sojourner', ja: 'パスファインダーとソジャーナー' },
      { en: 'Curiosity and Perseverance', ja: 'キュリオシティとパーサヴィアランス' },
    ],
    answer: 1,
    explain: {
      en: 'The twin Viking 1 and Viking 2 landers reached Mars in 1976 to photograph the surface and search for life.',
      ja: '2機一組のバイキング1号と2号は1976年に火星へ到達し、地表を撮影して生命を探しました。',
    },
  },
  {
    q: {
      en: 'Mars has a 31-km elevation range between its highest mountain and lowest basin. What are these two features?',
      ja: '火星は最も高い山と最も低い盆地との間に31 kmの高低差があります。この二つの地形は何ですか。',
    },
    options: [
      { en: 'Sif Mons and Aphrodite', ja: 'シフ山とアフロディーテ' },
      { en: 'Olympus Mons and Hellas', ja: 'オリンポス山とヘラス盆地' },
      { en: 'Maxwell Mountains and Ishtar', ja: 'マクスウェル山脈とイシュタル' },
      { en: 'Gusev Crater and Victoria Crater', ja: 'グーセフ・クレーターとビクトリア・クレーター' },
    ],
    answer: 1,
    explain: {
      en: 'Mars’s highest point is the volcano Olympus Mons and its lowest is the Hellas basin, spanning 31 km.',
      ja: '火星の最高地点は火山オリンポス山、最低地点はヘラス盆地で、その差は31 kmに及びます。',
    },
  },
  {
    q: {
      en: 'How long is the sidereal rotation period of Mars?',
      ja: '火星の恒星時における自転周期はどれくらいですか。',
    },
    options: [
      { en: '243 Earth days', ja: '地球時間で243日' },
      { en: '24 hours 37 minutes 23 seconds', ja: '24時間37分23秒' },
      { en: '117 Earth days', ja: '地球時間で117日' },
      { en: '9 hours 56 minutes', ja: '9時間56分' },
    ],
    answer: 1,
    explain: {
      en: 'Mars rotates once every 24 hours 37 minutes 23 seconds, only slightly longer than an Earth day.',
      ja: '火星は24時間37分23秒ごとに1回自転し、地球の1日よりわずかに長いだけです。',
    },
  },
  {
    q: {
      en: 'Which gigantic Mars volcano is the largest in the solar system, with a summit over 20 km high?',
      ja: '山頂が20 kmを超え、太陽系で最大の巨大な火星の火山はどれですか。',
    },
    options: [
      { en: 'Sif Mons', ja: 'シフ山（シフ・モンス）' },
      { en: 'Mauna Loa', ja: 'マウナ・ロア' },
      { en: 'Olympus Mons', ja: 'オリンポス山（オリンポス・モンス）' },
      { en: 'Tartarus Dorsa', ja: 'タルタルス・ドルサ' },
    ],
    answer: 2,
    explain: {
      en: 'Olympus Mons, with a summit more than 20 km high, is the largest volcano in the solar system.',
      ja: '山頂が20 kmを超えるオリンポス山は、太陽系で最大の火山です。',
    },
  },
  {
    q: {
      en: 'What is the primary composition of the permanent (residual) polar cap at Mars’s NORTH pole?',
      ja: '火星の北極にある永久（残留）極冠の主な組成は何ですか。',
    },
    options: [
      { en: 'Frozen carbon dioxide (dry ice)', ja: '凍った二酸化炭素（ドライアイス）' },
      { en: 'Water ice', ja: '水の氷' },
      { en: 'Sulfuric acid ice', ja: '硫酸の氷' },
      { en: 'Frozen methane', ja: '凍ったメタン' },
    ],
    answer: 1,
    explain: {
      en: 'The residual north polar cap of Mars is made mostly of water ice.',
      ja: '火星の北極の残留極冠は、主に水の氷でできています。',
    },
  },
  {
    q: {
      en: 'In the search for past water, what did the Opportunity rover find in sedimentary rocks, nicknamed “blueberries”?',
      ja: 'かつての水を探すなかで、オポチュニティ探査車が堆積岩の中に見つけた「ブルーベリー」と呼ばれるものは何でしたか。',
    },
    options: [
      { en: 'Mudstones rich in carbon', ja: '炭素に富む泥岩' },
      { en: 'Small spheres rich in the mineral hematite', ja: '鉱物ヘマタイト（赤鉄鉱）に富む小さな球' },
      { en: 'Bubbles of trapped methane gas', ja: '閉じ込められたメタンガスの泡' },
      { en: 'Crystals of pure water ice', ja: '純粋な水の氷の結晶' },
    ],
    answer: 1,
    explain: {
      en: 'Opportunity found small hematite-rich spheres, the “blueberries,” which form in the presence of water.',
      ja: 'オポチュニティは、水があると形成されるヘマタイトに富む小さな球「ブルーベリー」を発見しました。',
    },
  },
  {
    q: {
      en: 'What is the average surface temperature of Venus, maintained by its massive greenhouse effect?',
      ja: '巨大な温室効果によって保たれている、金星の平均地表温度はどれくらいですか。',
    },
    options: [
      { en: '173 K', ja: '173 K' },
      { en: '240 K', ja: '240 K' },
      { en: '373 K', ja: '373 K' },
      { en: '730 K (over 850 °F)', ja: '730 K（850°F超）' },
    ],
    answer: 3,
    explain: {
      en: 'Venus’s runaway greenhouse effect keeps its surface at about 730 K, hot enough to melt lead.',
      ja: '金星の暴走温室効果は地表を約730 Kに保っており、これは鉛を溶かすほどの高温です。',
    },
  },
];

const medium = [
  {
    q: {
      en: 'Why does Venus rotate in a retrograde (backward) direction, unlike most planets?',
      ja: '金星が、ほとんどの惑星と違って逆行（逆向き）に自転しているのはなぜですか。',
    },
    options: [
      { en: 'Its thick atmosphere rotates so fast it drags the solid planet backward.', ja: '厚い大気が非常に速く回転し、固体の惑星を逆向きに引きずるから。' },
      { en: 'Tidal friction from the Sun’s gravity, or powerful early collisions during formation, slowed and reversed its spin.', ja: '太陽の重力による潮汐摩擦、あるいは形成期の強力な衝突が、その自転を遅らせ逆転させたから。' },
      { en: 'Mercury’s magnetic field flipped its rotational axis.', ja: '水星の磁場がその自転軸を反転させたから。' },
      { en: 'High-speed volcanic eruptions pushed the crust the opposite way.', ja: '高速の火山噴火が地殻を逆向きに押したから。' },
    ],
    answer: 1,
    explain: {
      en: 'Venus’s backward spin likely resulted from solar tidal friction and/or powerful collisions during its early formation.',
      ja: '金星の逆向きの自転は、太陽による潮汐摩擦や、初期の形成期の強力な衝突によって生じたと考えられます。',
    },
  },
  {
    q: {
      en: 'Why is Venus’s surface considered “naked” and highly preserved compared to Earth and Mars?',
      ja: '金星の表面が、地球や火星と比べて「むき出し」でよく保存されていると考えられているのはなぜですか。',
    },
    options: [
      { en: 'Venus’s rock is ten times harder than terrestrial basalt.', ja: '金星の岩石は地球の玄武岩の10倍硬いから。' },
      { en: 'Venus has no liquid water or ice and low surface wind speeds, resulting in extremely low rates of erosion and weathering.', ja: '金星には液体の水も氷もなく地表の風速も低いため、侵食や風化の速度が極めて小さいから。' },
      { en: 'Volcanic eruptions cover the planet every few thousand years, preventing weathering.', ja: '数千年ごとに火山噴火が惑星を覆い、風化を防いでいるから。' },
      { en: 'The thick atmosphere blocks all external forces, including solar wind and cosmic rays.', ja: '厚い大気が太陽風や宇宙線を含むすべての外的な力を遮っているから。' },
    ],
    answer: 1,
    explain: {
      en: 'With no liquid water or ice and only gentle surface winds, Venus experiences almost no erosion, so its surface stays “naked.”',
      ja: '液体の水も氷もなく地表の風も穏やかなため、金星ではほとんど侵食が起こらず、表面は「むき出し」のまま保たれます。',
    },
  },
  {
    q: {
      en: 'If liquid water is not stable on today’s Mars surface, how can seasonal dark streaks (recurring slope lineae) flow downhill?',
      ja: '今日の火星の地表で液体の水が安定でないなら、季節的な暗い筋（反復性斜面線状構造）が斜面を流れ下れるのはなぜですか。',
    },
    options: [
      { en: 'They are liquid carbon dioxide that melts in summer.', ja: 'それは夏に融ける液体の二酸化炭素だから。' },
      { en: 'The water is highly salty, which lowers its freezing point and lets it stay liquid long enough to flow.', ja: 'その水は塩分が非常に高く、凝固点が下がるため、流れられるだけの間は液体を保てるから。' },
      { en: 'They are dry landslides of volcanic ash mimicking liquid flow.', ja: '液体の流れをまねた、火山灰の乾いた地すべりだから。' },
      { en: 'Underground geysers of boiling water erupt and freeze instantly.', ja: '地下の沸騰した水の間欠泉が噴出して即座に凍るから。' },
    ],
    answer: 1,
    explain: {
      en: 'Very salty (briny) water has a lowered freezing point, letting it stay liquid long enough to trickle down the slopes.',
      ja: '塩分の非常に高い（かん水の）水は凝固点が下がるため、斜面を流れ下れるだけの間は液体を保てます。',
    },
  },
  {
    q: {
      en: 'Why was the canyon system Valles Marineris NOT cut by running water, despite resembling river valleys?',
      ja: 'マリネリス峡谷は川の谷に似ているにもかかわらず、流れる水によって刻まれたのではないとされるのはなぜですか。',
    },
    options: [
      { en: 'It was formed by windstorms eroding the equator over billions of years.', ja: '何十億年にもわたる砂嵐が赤道を侵食して形成されたから。' },
      { en: 'It has no outlets and was created by tectonic cracks from crustal tensions during the Tharsis uplift.', ja: '流出口がなく、タルシス隆起の際の地殻の張力による構造的な割れ目で作られたから。' },
      { en: 'It is an artificial network of canals built by an ancient civilization.', ja: '古代文明が築いた人工的な運河網だから。' },
      { en: 'It was excavated by a series of giant aligned meteor impacts.', ja: '一列に並んだ巨大隕石衝突の連続によって掘られたから。' },
    ],
    answer: 1,
    explain: {
      en: 'Valles Marineris has no outlets and formed from tectonic cracks caused by crustal stresses during the Tharsis uplift, not by flowing water.',
      ja: 'マリネリス峡谷は流出口がなく、流れる水ではなくタルシス隆起の際の地殻応力による構造的な割れ目から形成されました。',
    },
  },
  {
    q: {
      en: 'Why can Mars’s volcanoes (like Olympus Mons) grow more than twice as tall as Earth’s or Venus’s highest mountains?',
      ja: '火星の火山（オリンポス山など）が、地球や金星の最も高い山の2倍以上に成長できるのはなぜですか。',
    },
    options: [
      { en: 'Mars formed from lighter rocky materials that stack higher without slumping.', ja: '火星は崩れずに高く積み上がる、より軽い岩石物質から形成されたから。' },
      { en: 'Mars has less surface gravity to pull down the mountain’s weight, and it lacks moving crustal plates, so lava accumulates in one stationary spot for hundreds of millions of years.', ja: '火星は山の重さを引き下げる地表重力が小さく、また動く地殻プレートを欠くため、溶岩が一つの動かない場所に何億年も積み重なるから。' },
      { en: 'The thin atmosphere doesn’t press down on mountain tops, letting them expand upward.', ja: '薄い大気が山頂を押し下げないため、上方へ膨張できるから。' },
      { en: 'Mars’s internal heat is twice as hot as Earth’s, fueling larger eruptions.', ja: '火星の内部の熱は地球の2倍高く、より大きな噴火を起こすから。' },
    ],
    answer: 1,
    explain: {
      en: 'Lower gravity and the absence of plate motion let lava pile up at one fixed hot spot for hundreds of millions of years, building enormous volcanoes.',
      ja: '低い重力とプレート運動の欠如により、溶岩が一つの固定したホットスポットに何億年も積み重なり、巨大な火山ができます。',
    },
  },
];

const hard = [
  {
    q: {
      en: 'How did Galileo’s observation of the full range of phases of Venus disprove Ptolemy’s geocentric model?',
      ja: 'ガリレオが金星のすべての満ち欠けを観測したことは、どのようにしてプトレマイオスの天動説を否定しましたか。',
    },
    options: [
      { en: 'It proved Venus is a star, not a planet.', ja: '金星が惑星ではなく恒星であることを証明したから。' },
      { en: 'In the geocentric model Venus would only ever show crescent phases, whereas Galileo saw a full range of phases, proving Venus must orbit the Sun.', ja: '天動説では金星は三日月状の満ち欠けしか示さないはずだが、ガリレオはすべての満ち欠けを見たため、金星は太陽を回っているに違いないと証明されたから。' },
      { en: 'It showed Venus rotates faster than Earth.', ja: '金星が地球より速く自転していることを示したから。' },
      { en: 'It proved Venus is larger than Earth and has a thick atmosphere.', ja: '金星が地球より大きく厚い大気を持つことを証明したから。' },
    ],
    answer: 1,
    explain: {
      en: 'Ptolemy’s model allows Venus only crescent phases, so Galileo’s observation of a full set of phases showed Venus must circle the Sun.',
      ja: 'プトレマイオスのモデルでは金星は三日月状の相しか取れないため、ガリレオがすべての相を観測したことは金星が太陽を回っていることを示しました。',
    },
  },
  {
    q: {
      en: 'Which statement best explains the “Runaway Greenhouse Effect” that transformed Venus?',
      ja: '金星を変えた「暴走温室効果」を最もよく説明しているのはどれですか。',
    },
    options: [
      { en: 'Volcanic eruptions filled the air with sulfur, blocking sunlight and freezing the surface.', ja: '火山噴火が大気を硫黄で満たして日光を遮り、地表を凍結させた。' },
      { en: 'Increased heating evaporated Venus’s oceans, removing the safety valve that dissolved carbon dioxide, and adding water vapor that further trapped heat in an irreversible loop.', ja: '加熱の増大が金星の海を蒸発させ、二酸化炭素を溶かす安全弁を失わせるとともに、水蒸気を加えてさらに熱を閉じ込め、後戻りできない循環を生んだ。' },
      { en: 'Venus’s proximity to the Sun ignited its carbon crust, releasing CO₂.', ja: '金星が太陽に近いために炭素の地殻が発火し、CO₂を放出した。' },
      { en: 'Its magnetic field collapsed, letting solar wind heat the atmosphere to the melting point of rocks.', ja: '磁場が崩壊し、太陽風が大気を岩石の融点まで加熱した。' },
    ],
    answer: 1,
    explain: {
      en: 'Rising heat boiled away Venus’s oceans, so CO₂ was no longer dissolved, and the added water vapor trapped still more heat in an unstoppable loop.',
      ja: '上昇する熱が金星の海を蒸発させて二酸化炭素が溶けなくなり、加わった水蒸気がさらに熱を閉じ込めて、止められない循環を生みました。',
    },
  },
  {
    q: {
      en: 'What is the significance of rare meteorites on Earth identified as coming from Mars?',
      ja: '火星由来と特定された地球上のまれな隕石には、どのような意義がありますか。',
    },
    options: [
      { en: 'They are the only known source of organic carbon in the solar system.', ja: '太陽系で唯一知られた有機炭素の供給源であること。' },
      { en: 'They provide direct samples of Mars’s crust and trapped atmospheric gas bubbles, confirming Mars once had water and potentially habitable conditions.', ja: '火星の地殻と閉じ込められた大気ガスの泡の直接の試料を提供し、火星にかつて水と、生命が存在しうる環境があったことを裏づけること。' },
      { en: 'They prove Mars currently has plate tectonics.', ja: '火星に現在プレートテクトニクスがあることを証明すること。' },
      { en: 'They are primitive, undifferentiated material unchanged since the solar nebula.', ja: '太陽星雲以来変わらない始原的で未分化の物質であること。' },
    ],
    answer: 1,
    explain: {
      en: 'Martian meteorites are direct samples of Mars’s crust and trapped gases, confirming past water and potentially habitable conditions.',
      ja: '火星隕石は火星の地殻と閉じ込められたガスの直接の試料であり、かつての水と生命が存在しうる環境を裏づけます。',
    },
  },
  {
    q: {
      en: 'How does the age of Venus’s plains (300–600 million years) indicate an evolution radically different from Earth’s?',
      ja: '金星の平原の年代（3〜6億年）は、地球とは根本的に異なる進化をどのように示していますか。',
    },
    options: [
      { en: 'It shows Venus is entirely geologically dead and never had volcanism.', ja: '金星が完全に地質学的に死んでおり、火山活動が一度もなかったことを示す。' },
      { en: 'It suggests Venus underwent a planet-wide volcanic convulsion that resurfaced the whole world at once, rather than gradual continuous plate tectonics.', ja: '緩やかで連続的なプレートテクトニクスではなく、惑星全体を一度に作り変える全球規模の火山的激変を金星が経たことを示唆する。' },
      { en: 'It proves Venus’s surface is constantly renewed by ocean tides.', ja: '金星の表面が海の潮汐によって絶えず更新されていることを証明する。' },
      { en: 'It shows Venus’s crust is entirely primitive meteoritic debris.', ja: '金星の地殻がすべて始原的な隕石の破片であることを示す。' },
    ],
    answer: 1,
    explain: {
      en: 'The uniformly young plains suggest Venus was resurfaced all at once in a global volcanic event, unlike Earth’s gradual plate tectonics.',
      ja: '一様に若い平原は、地球の緩やかなプレートテクトニクスと異なり、金星が全球規模の火山活動で一度に作り変えられたことを示唆します。',
    },
  },
  {
    q: {
      en: 'How did Mars experience a “Runaway Refrigerator Effect,” and how does its size explain this?',
      ja: '火星はどのように「暴走冷蔵庫効果」を経験し、その大きさはこれをどう説明しますか。',
    },
    options: [
      { en: 'Being closer to the asteroid belt shielded Mars from solar radiation, freezing its water.', ja: '小惑星帯に近いことが火星を太陽放射から遮蔽し、水を凍らせた。' },
      { en: 'Mars is a smaller planet with lower gravity; as its atmospheric gases escaped into space, the greenhouse effect weakened, temperatures fell, and water froze out, further reducing its heat-retaining capacity.', ja: '火星はより小さく重力の弱い惑星であり、大気ガスが宇宙へ逃げるにつれて温室効果が弱まり、気温が下がって水が凍りつき、熱を保つ能力がさらに低下した。' },
      { en: 'A giant impact stripped Mars of its iron core, stopping internal heat and freezing the surface.', ja: '巨大衝突が火星から鉄の核を剥ぎ取り、内部の熱を止めて地表を凍らせた。' },
      { en: 'Mars’s thick CO₂ atmosphere reflected 70% of sunlight, cooling the surface to 150 K.', ja: '火星の厚いCO₂大気が日光の70%を反射し、地表を150 Kまで冷やした。' },
    ],
    answer: 1,
    explain: {
      en: 'Mars’s low gravity let its atmosphere escape, weakening the greenhouse effect so temperatures dropped and water froze out, cooling it further still.',
      ja: '火星の弱い重力は大気を逃がし、温室効果を弱めて気温を下げ、水を凍りつかせて、さらに冷却を進めました。',
    },
  },
];

export default { easy, medium, hard };
