const easy = [
  {
    q: {
      en: 'How does Earth’s bulk (average) density compare with that of its surface crustal rocks?',
      ja: '地球全体の（平均）密度は、表面の地殻の岩石の密度と比べてどうですか。',
    },
    options: [
      { en: 'Bulk 3.0 g/cm³, exactly equal to the crust', ja: '全体で3.0 g/cm³、地殻とちょうど同じ' },
      { en: 'Bulk 5.5 g/cm³, significantly higher than the crust (~3 g/cm³)', ja: '全体で5.5 g/cm³、地殻（約3 g/cm³）よりかなり高い' },
      { en: 'Bulk 11.2 g/cm³, about double the crust', ja: '全体で11.2 g/cm³、地殻の約2倍' },
      { en: 'Bulk 1.0 g/cm³, much lower than the crust', ja: '全体で1.0 g/cm³、地殻よりはるかに低い' },
    ],
    answer: 1,
    explain: {
      en: 'Earth’s bulk density is about 5.5 g/cm³, much higher than the ~3 g/cm³ of surface crustal rocks, implying a dense interior.',
      ja: '地球全体の密度は約5.5 g/cm³で、表面の地殻岩石の約3 g/cm³よりずっと高く、内部が高密度であることを示します。',
    },
  },
  {
    q: {
      en: 'Which interior layer is the thinnest, making up only about 0.3% of Earth’s total mass?',
      ja: '地球の全質量のわずか約0.3%を占めるにすぎない、最も薄い内部の層はどれですか。',
    },
    options: [
      { en: 'The outer core', ja: '外核' },
      { en: 'The mantle', ja: 'マントル' },
      { en: 'The inner core', ja: '内核' },
      { en: 'The crust', ja: '地殻' },
    ],
    answer: 3,
    explain: {
      en: 'The crust is Earth’s thinnest layer, accounting for only about 0.3% of the planet’s total mass.',
      ja: '地殻は地球で最も薄い層で、惑星の全質量のわずか約0.3%を占めるにすぎません。',
    },
  },
  {
    q: {
      en: 'Which volcanic class of silicate rock makes up most of Earth’s continental crust?',
      ja: '地球の大陸地殻の大部分を構成しているケイ酸塩岩の火成岩の種類はどれですか。',
    },
    options: [
      { en: 'Basalt', ja: '玄武岩' },
      { en: 'Quartzite', ja: '石英岩' },
      { en: 'Granite', ja: '花崗岩' },
      { en: 'Limestone', ja: '石灰岩' },
    ],
    answer: 2,
    explain: {
      en: 'Earth’s continental crust is made largely of granite, a light-colored volcanic silicate rock.',
      ja: '地球の大陸地殻は、主に明色のケイ酸塩火成岩である花崗岩でできています。',
    },
  },
  {
    q: {
      en: 'In which interior layer is Earth’s magnetic field generated?',
      ja: '地球の磁場はどの内部の層で生成されていますか。',
    },
    options: [
      { en: 'The solid silicate mantle', ja: '固体のケイ酸塩マントル' },
      { en: 'The liquid metallic outer core', ja: '液体金属の外核' },
      { en: 'The solid metallic inner core', ja: '固体金属の内核' },
      { en: 'The rocky continental crust', ja: '岩石質の大陸地殻' },
    ],
    answer: 1,
    explain: {
      en: 'Earth’s magnetic field is produced by dynamo action in the liquid metallic outer core.',
      ja: '地球の磁場は、液体金属の外核でのダイナモ作用によって生み出されます。',
    },
  },
  {
    q: {
      en: 'What is the primary composition and typical thickness of oceanic crust?',
      ja: '海洋地殻の主な組成と一般的な厚さはどれですか。',
    },
    options: [
      { en: 'Granite, 20–70 km', ja: '花崗岩、20〜70 km' },
      { en: 'Basalt, about 6 km', ja: '玄武岩、約6 km' },
      { en: 'Limestone, 100 km', ja: '石灰岩、100 km' },
      { en: 'Sandstone, less than 1 km', ja: '砂岩、1 km未満' },
    ],
    answer: 1,
    explain: {
      en: 'Oceanic crust is composed mainly of basalt and is only about 6 km thick, much thinner than continental crust.',
      ja: '海洋地殻は主に玄武岩からなり、厚さは約6 kmしかなく、大陸地殻よりずっと薄いです。',
    },
  },
  {
    q: {
      en: 'Why are metamorphic rocks produced?',
      ja: '変成岩はなぜ生じるのですか。',
    },
    options: [
      { en: 'They are primitive material that escaped all heating', ja: 'すべての加熱を免れた始原的な物質だから' },
      { en: 'Meteorites deliver them during impacts', ja: '隕石が衝突の際に運んでくるから' },
      { en: 'Geological activity carries surface rocks to depth under high temperature and pressure and then brings them back up', ja: '地質活動が地表の岩石を高温高圧の深部へ運び、再び地表へ戻すから' },
      { en: 'They form from marine shells deposited by wind or water', ja: '風や水によって堆積した海の貝殻から形成されるから' },
    ],
    answer: 2,
    explain: {
      en: 'Metamorphic rocks form when geological activity carries existing rocks to depth, altering them under high temperature and pressure before returning them to the surface.',
      ja: '変成岩は、地質活動が既存の岩石を深部へ運び、高温高圧の下で変化させてから地表へ戻すことで形成されます。',
    },
  },
  {
    q: {
      en: 'Who first proposed the detailed scientific hypothesis of continental drift in 1912?',
      ja: '1912年に大陸移動説の詳細な科学的仮説を初めて提唱したのは誰ですか。',
    },
    options: [
      { en: 'Francis Bacon', ja: 'フランシス・ベーコン' },
      { en: 'Alfred Wegener', ja: 'アルフレート・ウェゲナー' },
      { en: 'Jean Foucault', ja: 'ジャン・フーコー' },
      { en: 'Stephen Jay Gould', ja: 'スティーヴン・ジェイ・グールド' },
    ],
    answer: 1,
    explain: {
      en: 'Alfred Wegener first put forward the detailed scientific hypothesis of continental drift in 1912.',
      ja: 'アルフレート・ウェゲナーは1912年に大陸移動説の詳細な科学的仮説を初めて提唱しました。',
    },
  },
  {
    q: {
      en: 'New crust forms at ____, while old crust is destroyed and recycled at ____.',
      ja: '新しい地殻は____で形成され、古い地殻は____で破壊され再循環されます。',
    },
    options: [
      { en: 'Fault zones; rift zones', ja: '断層帯；リフト帯（拡大帯）' },
      { en: 'Subduction zones; fault zones', ja: '沈み込み帯；断層帯' },
      { en: 'Rift zones; subduction zones', ja: 'リフト帯（拡大帯）；沈み込み帯' },
      { en: 'High-altitude mountains; ocean basins', ja: '高地の山脈；海盆' },
    ],
    answer: 2,
    explain: {
      en: 'New crust is created at rift zones where plates spread apart, and old crust is destroyed at subduction zones where it sinks back into the mantle.',
      ja: '新しい地殻はプレートが広がるリフト帯で作られ、古い地殻はマントルへ沈み込む沈み込み帯で破壊されます。',
    },
  },
  {
    q: {
      en: 'What is the most abundant gas in Earth’s atmosphere today?',
      ja: '今日の地球の大気で最も豊富な気体は何ですか。',
    },
    options: [
      { en: 'Oxygen (O2)', ja: '酸素（O2）' },
      { en: 'Carbon dioxide (CO2)', ja: '二酸化炭素（CO2）' },
      { en: 'Argon (Ar)', ja: 'アルゴン（Ar）' },
      { en: 'Nitrogen (N2)', ja: '窒素（N2）' },
    ],
    answer: 3,
    explain: {
      en: 'Nitrogen (N2) is the most abundant gas in Earth’s atmosphere, making up about 78% of it.',
      ja: '窒素（N2）は地球の大気で最も豊富な気体で、約78%を占めています。',
    },
  },
  {
    q: {
      en: 'In which atmospheric layer does almost all weather and cloud formation occur?',
      ja: 'ほとんどすべての気象と雲の形成が起こる大気の層はどれですか。',
    },
    options: [
      { en: 'Stratosphere', ja: '成層圏' },
      { en: 'Troposphere', ja: '対流圏' },
      { en: 'Ionosphere', ja: '電離層' },
      { en: 'Mesosphere', ja: '中間圏' },
    ],
    answer: 1,
    explain: {
      en: 'Nearly all weather and cloud formation takes place in the troposphere, the lowest layer of the atmosphere.',
      ja: 'ほとんどすべての気象と雲の形成は、大気の最下層である対流圏で起こります。',
    },
  },
  {
    q: {
      en: 'What is the chemical formula for ozone, and in which layer does it concentrate to block ultraviolet light?',
      ja: 'オゾンの化学式は何で、それが紫外線を遮るために集中する層はどれですか。',
    },
    options: [
      { en: 'O2; Troposphere', ja: 'O2；対流圏' },
      { en: 'O3; Stratosphere', ja: 'O3；成層圏' },
      { en: 'CO2; Stratosphere', ja: 'CO2；成層圏' },
      { en: 'H2O; Ionosphere', ja: 'H2O；電離層' },
    ],
    answer: 1,
    explain: {
      en: 'Ozone (O3) concentrates in the stratosphere, where it absorbs harmful ultraviolet radiation from the Sun.',
      ja: 'オゾン（O3）は成層圏に集中し、太陽からの有害な紫外線を吸収します。',
    },
  },
  {
    q: {
      en: 'What are the fossilized biological structures older than 3 billion years, made of colonies of blue-green bacteria, called?',
      ja: '30億年以上前の、藍藻（シアノバクテリア）の群体からなる化石化した生物構造を何と呼びますか。',
    },
    options: [
      { en: 'Pangaea fossils', ja: 'パンゲアの化石' },
      { en: 'Iridium clay layers', ja: 'イリジウムを含む粘土層' },
      { en: 'Stromatolites', ja: 'ストロマトライト' },
      { en: 'Basaltic dikes', ja: '玄武岩の岩脈' },
    ],
    answer: 2,
    explain: {
      en: 'Stromatolites are fossilized structures more than 3 billion years old, built by colonies of blue-green bacteria.',
      ja: 'ストロマトライトは、藍藻の群体によって作られた30億年以上前の化石構造です。',
    },
  },
  {
    q: {
      en: 'Roughly how long ago did free oxygen begin to accumulate in the atmosphere, eventually leading to the ozone layer?',
      ja: '遊離した酸素が大気中に蓄積し始め、やがてオゾン層につながったのは、およそどれくらい前ですか。',
    },
    options: [
      { en: '4.5 billion years ago', ja: '45億年前' },
      { en: '3.9 billion years ago', ja: '39億年前' },
      { en: '2 billion years ago', ja: '20億年前' },
      { en: '65 million years ago', ja: '6500万年前' },
    ],
    answer: 2,
    explain: {
      en: 'Free oxygen began building up in the atmosphere about 2 billion years ago, eventually forming the protective ozone layer.',
      ja: '遊離酸素は約20億年前に大気中に蓄積し始め、やがて保護的なオゾン層を形成しました。',
    },
  },
  {
    q: {
      en: 'The extinction of the dinosaurs 65 million years ago marks the end of which geological period?',
      ja: '6500万年前の恐竜の絶滅は、どの地質時代の終わりを示していますか。',
    },
    options: [
      { en: 'Precambrian', ja: '先カンブリア時代' },
      { en: 'Cretaceous', ja: '白亜紀' },
      { en: 'Silurian', ja: 'シルル紀' },
      { en: 'Quaternary', ja: '第四紀' },
    ],
    answer: 1,
    explain: {
      en: 'The mass extinction that killed the dinosaurs 65 million years ago marks the end of the Cretaceous period.',
      ja: '6500万年前に恐竜を絶滅させた大量絶滅は、白亜紀の終わりを示しています。',
    },
  },
  {
    q: {
      en: 'What rare, asteroid-abundant metal, found in a worldwide 65-million-year-old sediment layer, is evidence of a massive impact?',
      ja: '6500万年前の世界的な堆積層に見られる、小惑星に多く含まれる希少な金属で、巨大衝突の証拠となるものは何ですか。',
    },
    options: [
      { en: 'Silicon', ja: 'ケイ素' },
      { en: 'Aluminum', ja: 'アルミニウム' },
      { en: 'Iridium', ja: 'イリジウム' },
      { en: 'Magnesium', ja: 'マグネシウム' },
    ],
    answer: 2,
    explain: {
      en: 'A worldwide layer of iridium-rich clay, a metal abundant in asteroids, provides evidence of a massive impact 65 million years ago.',
      ja: '小惑星に多く含まれる金属であるイリジウムに富む世界的な粘土層が、6500万年前の巨大衝突の証拠となっています。',
    },
  },
];

const medium = [
  {
    q: {
      en: 'A fault accumulates strain from plate motion of 5 cm/year. How much sudden slippage relieves 140 years of accumulated strain?',
      ja: 'ある断層が5 cm/年のプレート運動によるひずみを蓄積しています。140年分の蓄積されたひずみを解放するには、どれだけの突然のずれが必要ですか。',
    },
    options: [
      { en: '1.4 meters', ja: '1.4メートル' },
      { en: '5 meters', ja: '5メートル' },
      { en: '7 meters', ja: '7メートル' },
      { en: '14 meters', ja: '14メートル' },
    ],
    answer: 2,
    explain: {
      en: 'At 5 cm/year over 140 years, the strain equals 700 cm, or 7 meters of sudden slippage.',
      ja: '5 cm/年で140年間では、ひずみは700 cm、すなわち7メートルの突然のずれに相当します。',
    },
  },
  {
    q: {
      en: 'If Earth’s oceans boiled completely away, what would happen to atmospheric pressure?',
      ja: 'もし地球の海がすべて沸騰して蒸発したら、大気圧はどうなりますか。',
    },
    options: [
      { en: 'Stays 1 bar because water vapor is very light', ja: '水蒸気は非常に軽いので1気圧のまま' },
      { en: 'Rises to roughly 300 bars because water vapor weighs the same as the liquid water', ja: '水蒸気は液体の水と同じ重さなので、約300気圧まで上昇する' },
      { en: 'Drops to zero because a boiled atmosphere escapes instantly', ja: '沸騰した大気は瞬時に逃げるのでゼロまで下がる' },
      { en: 'Doubles to exactly 2 bars', ja: 'ちょうど2気圧まで倍増する' },
    ],
    answer: 1,
    explain: {
      en: 'The vaporized water would still weigh the same as the liquid oceans, raising atmospheric pressure to roughly 300 bars.',
      ja: '蒸発した水は液体の海と同じ重さを持つため、大気圧はおよそ300気圧まで上昇します。',
    },
  },
  {
    q: {
      en: 'Why is “primitive rock” not found on Earth’s surface, even though it is present in meteorites?',
      ja: '「始原的な岩石」が隕石には存在するのに、地球の表面には見られないのはなぜですか。',
    },
    options: [
      { en: 'Primitive rocks were blown away by Earth’s winds', ja: '始原的な岩石は地球の風で吹き飛ばされたから' },
      { en: 'Earth was entirely heated and differentiated early on, chemically altering all of its original material', ja: '地球は初期に全体が加熱・分化し、元々の物質がすべて化学的に変化したから' },
      { en: 'Primitive rocks form only in the outer solar system and cannot survive Earth’s gravity', ja: '始原的な岩石は外側の太陽系でのみ形成され、地球の重力に耐えられないから' },
      { en: 'High atmospheric oxygen broke down all primitive minerals', ja: '大気中の高い酸素濃度がすべての始原的な鉱物を分解したから' },
    ],
    answer: 1,
    explain: {
      en: 'Early Earth was heated and fully differentiated, chemically transforming all of its original primitive material, so none survives at the surface.',
      ja: '初期の地球は加熱されて完全に分化し、元々の始原的物質がすべて化学的に変化したため、地表には残っていません。',
    },
  },
  {
    q: {
      en: 'Why are impact craters extremely rare on Earth compared with the Moon, despite equal bombardment?',
      ja: '衝突の頻度は同じなのに、地球の衝突クレーターが月に比べて極めて少ないのはなぜですか。',
    },
    options: [
      { en: 'Earth’s thick atmosphere shields it from all objects, even kilometer-wide ones', ja: '地球の厚い大気が、数キロメートルの天体さえも含めすべての天体から守っているから' },
      { en: 'Earth’s active geology — plate tectonics and weathering — continuously destroys and erases craters', ja: 'プレートテクトニクスや風化といった地球の活発な地質活動が、クレーターを絶えず破壊し消し去るから' },
      { en: 'The Moon’s gravity is much stronger and attracts almost all projectiles', ja: '月の重力の方がずっと強く、ほとんどすべての飛来天体を引きつけるから' },
      { en: 'Life on Earth breaks down craters with organic reactions', ja: '地球の生命が有機反応でクレーターを分解するから' },
    ],
    answer: 1,
    explain: {
      en: 'Earth’s active geology — plate tectonics, volcanism, and weathering — continually erases impact craters, unlike the geologically dead Moon.',
      ja: '地質学的に死んだ月とは違い、プレートテクトニクスや火山活動、風化といった地球の活発な地質活動が衝突クレーターを絶えず消し去ります。',
    },
  },
  {
    q: {
      en: 'What is the primary cause of Earth’s periodic Ice Ages over the past half-million years?',
      ja: '過去50万年間にわたる地球の周期的な氷河期の主な原因は何ですか。',
    },
    options: [
      { en: 'Periodic massive volcanic eruptions blocking sunlight', ja: '日光を遮る周期的な巨大火山噴火' },
      { en: 'Changes in the tilt of Earth’s rotational axis caused by the gravitational effects of other planets', ja: '他の惑星の重力の影響によって生じる地球の自転軸の傾きの変化' },
      { en: 'Gradual cooling of the Sun’s core by about 10%', ja: '太陽の中心核が約10%徐々に冷えること' },
      { en: 'Giant comet impacts that vaporized the oceans', ja: '海を蒸発させた巨大彗星の衝突' },
    ],
    answer: 1,
    explain: {
      en: 'The Ice Ages are driven mainly by cyclic changes in the tilt of Earth’s axis produced by the gravitational pull of the other planets.',
      ja: '氷河期は主に、他の惑星の重力によって生じる地球の自転軸の傾きの周期的な変化によって引き起こされます。',
    },
  },
];

const hard = [
  {
    q: {
      en: 'How does the greenhouse effect raise Earth’s surface temperature?',
      ja: '温室効果はどのようにして地球の表面温度を上げるのですか。',
    },
    options: [
      { en: 'Greenhouse gases absorb incoming short-wavelength visible sunlight and convert it directly to heat', ja: '温室効果ガスが入ってくる短波長の可視光を吸収し、直接熱に変えるから' },
      { en: 'Greenhouse gases let visible sunlight pass but absorb and trap the outgoing infrared heat reemitted by the ground', ja: '温室効果ガスは可視光は通すが、地面が再放射する出ていく赤外線の熱を吸収して閉じ込めるから' },
      { en: 'They increase the rate of nuclear fusion in the atmosphere', ja: '大気中の核融合の速度を高めるから' },
      { en: 'They block the cold vacuum of space from touching the outer atmosphere', ja: '宇宙の冷たい真空が大気の外層に触れるのを防ぐから' },
    ],
    answer: 1,
    explain: {
      en: 'Greenhouse gases are transparent to incoming visible sunlight but absorb the infrared radiation reemitted by the surface, trapping heat and warming the planet.',
      ja: '温室効果ガスは入射する可視光は透過させますが、地表が再放射する赤外線を吸収して熱を閉じ込め、惑星を暖めます。',
    },
  },
  {
    q: {
      en: 'What role did photosynthesis in early blue-green algae play in making land habitable for complex animals?',
      ja: '初期の藍藻による光合成は、陸地を複雑な動物が住める場所にする上でどのような役割を果たしましたか。',
    },
    options: [
      { en: 'It cooled the globe by 50 degrees, freezing the oceans', ja: '地球を50度冷やし、海を凍らせた' },
      { en: 'It consumed poisonous argon and turned it into nitrogen', ja: '有毒なアルゴンを消費して窒素に変えた' },
      { en: 'It released oxygen as waste, which accumulated to form the protective ozone layer that shields land from lethal solar ultraviolet radiation', ja: '老廃物として酸素を放出し、それが蓄積して保護的なオゾン層を形成し、致死的な太陽紫外線から陸地を守った' },
      { en: 'It melted the iron in Earth’s crust to generate the magnetosphere', ja: '地殻中の鉄を溶かして磁気圏を生み出した' },
    ],
    answer: 2,
    explain: {
      en: 'Photosynthesis released oxygen as a waste product, which built up and formed the ozone layer that shields the land surface from lethal solar ultraviolet radiation.',
      ja: '光合成は老廃物として酸素を放出し、それが蓄積してオゾン層を形成し、致死的な太陽紫外線から陸地の表面を守りました。',
    },
  },
  {
    q: {
      en: 'How do seismic waves let scientists model Earth’s interior layers?',
      ja: '地震波はどのようにして科学者が地球の内部の層を推定することを可能にしていますか。',
    },
    options: [
      { en: 'They physically bring pieces of the core to the surface during quakes', ja: '地震の際に核の破片を物理的に地表へ運んでくる' },
      { en: 'Seismic stations detect how the waves bend (refract) and create shadow zones as they pass through interior materials of different density', ja: '地震観測所が、波が密度の異なる内部の物質を通過する際にどう曲がる（屈折する）か、また影の帯（シャドーゾーン）をどう作るかを検出する' },
      { en: 'They are light waves that photograph the core with gamma rays', ja: 'ガンマ線で核を撮影する光の波である' },
      { en: 'They measure mantle temperature by converting sound to voltage', ja: '音を電圧に変換してマントルの温度を測る' },
    ],
    answer: 1,
    explain: {
      en: 'Seismic waves refract and produce shadow zones as they travel through layers of different density, letting scientists infer Earth’s internal structure.',
      ja: '地震波は密度の異なる層を通過する際に屈折し、影の帯を作るため、科学者はそれをもとに地球の内部構造を推定できます。',
    },
  },
  {
    q: {
      en: 'If humans heated and decomposed all the sedimentary carbonate rocks in Earth’s crust, how would the atmosphere change?',
      ja: 'もし人類が地殻中のすべての堆積性の炭酸塩岩を加熱して分解したら、大気はどう変化しますか。',
    },
    options: [
      { en: 'It would lose all CO2, making the climate extremely cold', ja: 'すべてのCO2を失い、気候が極端に寒くなる' },
      { en: 'It would release about 70 bars of carbon dioxide, creating a massive greenhouse and extremely high surface pressure', ja: '約70気圧の二酸化炭素を放出し、巨大な温室効果と極端に高い表面圧力を生む' },
      { en: 'It would convert the oceans into pure oxygen', ja: '海を純粋な酸素に変えてしまう' },
      { en: 'It would instantly destroy the magnetosphere', ja: '瞬時に磁気圏を破壊する' },
    ],
    answer: 1,
    explain: {
      en: 'Decomposing all the crust’s carbonate rocks would release roughly 70 bars of CO2, producing a runaway greenhouse and enormous surface pressure like that of Venus.',
      ja: '地殻中のすべての炭酸塩岩を分解すると約70気圧のCO2が放出され、金星のような暴走温室効果と巨大な表面圧力を生みます。',
    },
  },
  {
    q: {
      en: 'Why did Wegener’s continental drift hypothesis face hostility in the 1920s?',
      ja: 'ウェゲナーの大陸移動説が1920年代に反発を受けたのはなぜですか。',
    },
    options: [
      { en: 'He could not provide a clear physical mechanism to explain how solid continents could drift', ja: '固い大陸がどのように移動しうるのかを説明する明確な物理的な仕組みを示せなかったから' },
      { en: 'He claimed the Earth was flat and stationary', ja: '地球は平らで動かないと主張したから' },
      { en: 'He lacked any geological or fossil evidence', ja: '地質学的な証拠も化石の証拠も一切なかったから' },
      { en: 'He claimed continents formed by asteroid impacts 65 million years ago', ja: '大陸は6500万年前の小惑星衝突で形成されたと主張したから' },
    ],
    answer: 0,
    explain: {
      en: 'Wegener had strong fossil and geological evidence but no convincing physical mechanism for how solid continents could move, so his hypothesis met resistance until plate tectonics was understood.',
      ja: 'ウェゲナーは化石や地質学的な有力な証拠を持っていましたが、固い大陸がどう動くのかという説得力ある物理的仕組みを示せなかったため、プレートテクトニクスが理解されるまで反発を受けました。',
    },
  },
];

export default { easy, medium, hard };
