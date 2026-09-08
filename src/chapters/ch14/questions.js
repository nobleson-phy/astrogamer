const easy = [
  {
    q: {
      en: 'What is the estimated total mass of cosmic dust and meteoric material that enters Earth’s atmosphere every single day?',
      ja: '毎日、地球の大気に入ってくる宇宙塵と隕石物質の総質量はどれくらいと推定されていますか。',
    },
    options: [
      { en: '1 ton', ja: '1トン' },
      { en: '10 tons', ja: '10トン' },
      { en: '100 tons', ja: '100トン' },
      { en: '1,000 tons', ja: '1,000トン' },
    ],
    answer: 2,
    explain: {
      en: 'About 100 tons of meteoric material enters Earth’s atmosphere every day, mostly as tiny dust.',
      ja: '毎日およそ100トンの隕石物質が地球の大気に入り、その大半は微細な塵です。',
    },
  },
  {
    q: {
      en: 'Which annual meteor shower is associated with an active asteroid rather than a parent comet?',
      ja: '母天体が彗星ではなく活動的な小惑星に結びついている、毎年の流星群はどれですか。',
    },
    options: [
      { en: 'Perseids', ja: 'ペルセウス座流星群' },
      { en: 'Leonids', ja: 'しし座流星群' },
      { en: 'Lyrids', ja: 'こと座流星群' },
      { en: 'Geminids (asteroid Phaethon)', ja: 'ふたご座流星群（小惑星ファエトン）' },
    ],
    answer: 3,
    explain: {
      en: 'The Geminids come from the asteroid Phaethon, not a comet — unusual among meteor showers.',
      ja: 'ふたご座流星群は彗星ではなく小惑星ファエトンに由来します——流星群の中では異例です。',
    },
  },
  {
    q: {
      en: 'What is the most dependable annual meteor display, appearing each year for about three nights near August 11?',
      ja: '毎年8月11日ごろに約3晩現れる、最も安定した毎年の流星群はどれですか。',
    },
    options: [
      { en: 'Leonid shower', ja: 'しし座流星群' },
      { en: 'Perseid shower', ja: 'ペルセウス座流星群' },
      { en: 'Quadrantid shower', ja: 'しぶんぎ座流星群' },
      { en: 'Lyrid shower', ja: 'こと座流星群' },
    ],
    answer: 1,
    explain: {
      en: 'The Perseids, near August 11 each year, are the most dependable annual meteor shower.',
      ja: '毎年8月11日ごろのペルセウス座流星群は、最も安定した毎年の流星群です。',
    },
  },
  {
    q: {
      en: 'What is any fragment of interplanetary debris that survives its plunge through the atmosphere and reaches the ground called?',
      ja: '大気を突き抜ける落下を生き延びて地面に達する惑星間物質の破片は、何と呼ばれますか。',
    },
    options: [
      { en: 'Meteor', ja: '流星（メテオ）' },
      { en: 'Fireball', ja: '火球' },
      { en: 'Meteorite', ja: '隕石（メテオライト）' },
      { en: 'Meteorwrong', ja: 'メテオロング（偽隕石）' },
    ],
    answer: 2,
    explain: {
      en: 'A meteorite is debris that survives the fiery fall and reaches the ground; the streak of light is the meteor.',
      ja: '隕石は、燃える落下を生き延びて地面に達する破片です。光の筋は流星です。',
    },
  },
  {
    q: {
      en: 'Outside the concentrated searches in Antarctica, genuine meteorites turn up at an average rate of about:',
      ja: '南極での集中的な探索を除くと、本物の隕石が見つかる平均的な割合はおよそどれくらいですか。',
    },
    options: [
      { en: '5 per year', ja: '年に5個' },
      { en: '25 per year', ja: '年に25個' },
      { en: '150 per year', ja: '年に150個' },
      { en: '500 per year', ja: '年に500個' },
    ],
    answer: 1,
    explain: {
      en: 'Outside Antarctica, about 25 genuine meteorites are recovered per year.',
      ja: '南極以外では、年に約25個の本物の隕石が回収されます。',
    },
  },
  {
    q: {
      en: 'Where is the most productive source for recovering meteorites on Earth today?',
      ja: '現在、地球上で隕石を回収するのに最も生産的な場所はどこですか。',
    },
    options: [
      { en: 'Willamette Valley, Oregon', ja: 'オレゴン州ウィラメット渓谷' },
      { en: 'The Antarctic ice cap', ja: '南極の氷床' },
      { en: 'Arizona’s Meteor Crater', ja: 'アリゾナのメテオ・クレーター' },
      { en: 'The Australian Outback', ja: 'オーストラリアの奥地' },
    ],
    answer: 1,
    explain: {
      en: 'The Antarctic ice cap is the most productive source: the ice gathers and concentrates meteorites over time.',
      ja: '南極の氷床が最も生産的です：氷が時間をかけて隕石を集め、濃縮します。',
    },
  },
  {
    q: {
      en: 'In September 1938, a famous meteorite crashed through a garage roof and embedded itself in the seat of which vehicle?',
      ja: '1938年9月、有名な隕石がガレージの屋根を突き破り、どの車の座席に埋まりましたか。',
    },
    options: [
      { en: 'Pontiac Coupe', ja: 'ポンティアック・クーペ' },
      { en: 'Ford Model T', ja: 'フォード・モデルT' },
      { en: 'Chevrolet Deluxe', ja: 'シボレー・デラックス' },
      { en: 'Dodge Challenger', ja: 'ダッジ・チャレンジャー' },
    ],
    answer: 0,
    explain: {
      en: 'The 1938 meteorite crashed through the garage roof and lodged in the seat of a Pontiac Coupe.',
      ja: '1938年の隕石はガレージの屋根を突き破り、ポンティアック・クーペの座席に埋まりました。',
    },
  },
  {
    q: {
      en: 'Which broad class of meteorites is composed of nearly pure metallic nickel-iron?',
      ja: 'ほぼ純粋な金属のニッケル鉄でできている隕石の大分類はどれですか。',
    },
    options: [
      { en: 'Stones', ja: '石質' },
      { en: 'Stony-irons', ja: '石鉄' },
      { en: 'Irons', ja: '鉄質' },
      { en: 'Carbonaceous', ja: '炭素質' },
    ],
    answer: 2,
    explain: {
      en: 'Iron meteorites are made of nearly pure metallic nickel-iron — the cores of shattered differentiated bodies.',
      ja: '鉄隕石はほぼ純粋な金属のニッケル鉄でできています——砕けた分化天体の核です。',
    },
  },
  {
    q: {
      en: 'Among witnessed meteorite "falls," which class is by far the most common, at about 88% of occurrences?',
      ja: '目撃された隕石の「落下」のうち、約88%を占めて圧倒的に多い分類はどれですか。',
    },
    options: [
      { en: 'Primitive stones', ja: '始原的な石質' },
      { en: 'Differentiated stones', ja: '分化した石質' },
      { en: 'Irons', ja: '鉄質' },
      { en: 'Stony-irons', ja: '石鉄' },
    ],
    answer: 0,
    explain: {
      en: 'Primitive stony meteorites make up about 88% of witnessed falls — by far the most common kind.',
      ja: '始原的な石質隕石が目撃された落下の約88%を占め、圧倒的に多いです。',
    },
  },
  {
    q: {
      en: 'The Murchison carbonaceous meteorite (fell in Australia, 1969) is famous for containing:',
      ja: 'マーチソン炭素質隕石（1969年オーストラリアに落下）は、何を含むことで有名ですか。',
    },
    options: [
      { en: '16 amino acids (the building blocks of proteins)', ja: '16種のアミノ酸（タンパク質の構成要素）' },
      { en: 'Liquid water oceans in its interior', ja: '内部の液体の水の海' },
      { en: 'Pure metallic gold and platinum crystals', ja: '純金と白金の結晶' },
      { en: 'Living alien bacterial colonies', ja: '生きた地球外細菌のコロニー' },
    ],
    answer: 0,
    explain: {
      en: 'Murchison contains 16 amino acids — the molecular building blocks of proteins.',
      ja: 'マーチソンは16種のアミノ酸——タンパク質の分子的構成要素——を含みます。',
    },
  },
  {
    q: {
      en: 'Beyond Saturn’s orbit, in the cooler solar nebula, carbon and nitrogen combined with hydrogen to condense as which ices?',
      ja: '土星の軌道の外、より冷たい太陽系星雲では、炭素と窒素が水素と結びついてどの氷として凝縮しましたか。',
    },
    options: [
      { en: 'Water and silicates', ja: '水とケイ酸塩' },
      { en: 'Methane and ammonia', ja: 'メタンとアンモニア' },
      { en: 'Carbon dioxide and argon', ja: '二酸化炭素とアルゴン' },
      { en: 'Iron oxides and water', ja: '酸化鉄と水' },
    ],
    answer: 1,
    explain: {
      en: 'In the cold outer nebula, carbon and nitrogen combined with hydrogen to freeze as methane and ammonia ices.',
      ja: '冷たい外側の星雲では、炭素と窒素が水素と結びつき、メタンとアンモニアの氷として凍りました。',
    },
  },
  {
    q: {
      en: 'In what year was the first planet circling a distant, solar-type star announced?',
      ja: '遠方の太陽型の恒星をめぐる最初の惑星が発表されたのは何年ですか。',
    },
    options: [
      { en: '1969', ja: '1969年' },
      { en: '1988', ja: '1988年' },
      { en: '1995', ja: '1995年' },
      { en: '2013', ja: '2013年' },
    ],
    answer: 2,
    explain: {
      en: 'The first planet around a Sun-like star was announced in 1995.',
      ja: '太陽に似た恒星をめぐる最初の惑星は1995年に発表されました。',
    },
  },
  {
    q: {
      en: 'What is the term for massive exoplanets orbiting extremely close to their stars, found in a few percent of systems?',
      ja: '数パーセントの系で見つかる、恒星のごく近くを回る巨大な系外惑星を何と呼びますか。',
    },
    options: [
      { en: 'Super-Earths', ja: 'スーパーアース' },
      { en: 'Hot Jupiters', ja: 'ホットジュピター' },
      { en: 'Failed stars', ja: '失敗した恒星' },
      { en: 'Brown dwarfs', ja: '褐色矮星' },
    ],
    answer: 1,
    explain: {
      en: '"Hot Jupiters" are giant planets orbiting very close to their stars, found in a few percent of systems.',
      ja: '「ホットジュピター」は恒星のごく近くを回る巨大惑星で、数パーセントの系で見つかります。',
    },
  },
  {
    q: {
      en: 'Which carbonaceous meteorite fell in Mexico in 1969 and contains white inclusions that may predate the solar nebula?',
      ja: '1969年にメキシコに落下し、太陽系星雲より古いかもしれない白い包有物を含む炭素質隕石はどれですか。',
    },
    options: [
      { en: 'Murchison', ja: 'マーチソン' },
      { en: 'Tagish Lake', ja: 'タギシュ・レイク' },
      { en: 'Willamette', ja: 'ウィラメット' },
      { en: 'Allende', ja: 'アエンデ' },
    ],
    answer: 3,
    explain: {
      en: 'The Allende meteorite fell in Mexico in 1969; its white inclusions may predate the solar nebula itself.',
      ja: 'アエンデ隕石は1969年にメキシコに落下しました。その白い包有物は太陽系星雲そのものより古いかもしれません。',
    },
  },
  {
    q: {
      en: 'Flight-path analysis shows most shower meteors are very light or porous, with densities typically:',
      ja: '飛跡の分析によれば、ほとんどの流星群の流星は非常に軽く多孔質で、密度は典型的にどれくらいですか。',
    },
    options: [
      { en: 'Less than 1.0 g/cm³', ja: '1.0 g/cm³未満' },
      { en: 'Around 3.0 g/cm³', ja: '約3.0 g/cm³' },
      { en: 'Exactly 5.5 g/cm³', ja: 'ちょうど5.5 g/cm³' },
      { en: 'Over 11.2 g/cm³', ja: '11.2 g/cm³超' },
    ],
    answer: 0,
    explain: {
      en: 'Most shower meteors are fluffy cometary dust with densities under 1.0 g/cm³ — lighter than water.',
      ja: 'ほとんどの流星群の流星はふわふわした彗星の塵で、密度は1.0 g/cm³未満——水より軽いです。',
    },
  },
];

const medium = [
  {
    q: {
      en: 'If the dust along a comet’s orbit is clumpy and uneven, what will observers on Earth experience when Earth crosses the stream?',
      ja: '彗星の軌道に沿った塵が塊状で不均一なら、地球がその流れを横切るとき、地上の観測者は何を経験しますか。',
    },
    options: [
      { en: 'The shower will happen at a completely different time of year.', ja: '流星群がまったく違う時期に起こる。' },
      { en: 'The shower’s intensity will vary drastically year to year, sometimes producing spectacular "storms."', ja: '流星群の強さが年ごとに大きく変わり、時に壮観な「嵐」を生む。' },
      { en: 'The meteors will diverge from many different radiant points.', ja: '流星が多くの異なる放射点から広がって見える。' },
      { en: 'The meteors will survive to the ground as meteorites.', ja: '流星が地面まで生き延びて隕石になる。' },
    ],
    answer: 1,
    explain: {
      en: 'A clumpy stream means some years Earth hits a dense knot — producing meteor "storms" like the Leonids.',
      ja: '塊状の流れでは、ある年に地球が濃い塊に突入し、しし座流星群のような流星「嵐」を生みます。',
    },
  },
  {
    q: {
      en: 'Murchison’s amino acids come in equal numbers of right- and left-handed forms. Why does that prove they are extraterrestrial, not Earth contamination?',
      ja: 'マーチソンのアミノ酸は右手型と左手型が同数あります。なぜそれが、地球の汚染ではなく地球外起源だと証明するのですか。',
    },
    options: [
      { en: 'All Earth life uses right-handed amino acids, so the sample must be non-biological.', ja: '地球の生命はすべて右手型を使うので、試料は非生物的に違いない。' },
      { en: 'All Earth life uses only left-handed amino acids, so an equal (50/50) mix shows a non-terrestrial, abiotic origin.', ja: '地球の生命は左手型のみを使うので、同数（50/50）の混合は非地球的で非生物的な起源を示す。' },
      { en: 'Left-handed symmetry is destroyed by Earth’s gravity.', ja: '左手型の対称性は地球の重力で壊される。' },
      { en: 'Right-handed molecules only form near liquid metallic hydrogen.', ja: '右手型分子は液体金属水素の近くでしか作られない。' },
    ],
    answer: 1,
    explain: {
      en: 'Life on Earth uses only left-handed amino acids; a 50/50 mix must be abiotic and extraterrestrial.',
      ja: '地球の生命は左手型のみを使うため、50/50の混合は非生物的で地球外のものに違いありません。',
    },
  },
  {
    q: {
      en: 'Why did rocky and metallic minerals condense close to the Sun while water, methane and ammonia condensed far out?',
      ja: 'なぜ岩石質と金属の鉱物は太陽の近くで、水・メタン・アンモニアは遠くで凝縮したのですか。',
    },
    options: [
      { en: 'The Sun’s gravity was too weak to hold light gases close in.', ja: '太陽の重力が弱すぎて、軽いガスを近くに留められなかったから。' },
      { en: 'High temperatures near the young Sun let only high-melting-point solids condense, while cooler regions farther out let volatiles freeze.', ja: '若い太陽の近くの高温では融点の高い固体だけが凝縮でき、遠くの低温では揮発物が凍れたから。' },
      { en: 'The solar wind blew all the rock and metal into the inner disk.', ja: '太陽風が岩石と金属をすべて内側の円盤へ吹き寄せたから。' },
      { en: 'Giant impacts vaporized all the inner-system ice.', ja: '巨大衝突が内側の系の氷をすべて蒸発させたから。' },
    ],
    answer: 1,
    explain: {
      en: 'The nebula’s temperature gradient set the sequence: refractory rock/metal near the hot Sun, volatile ices in the cold outer disk.',
      ja: '星雲の温度勾配が順序を決めました：熱い太陽の近くは難揮発性の岩石・金属、冷たい外側の円盤は揮発性の氷です。',
    },
  },
  {
    q: {
      en: 'Gaps in the disks around young stars are not empty. What does the missing material in these gaps most likely indicate?',
      ja: '若い恒星のまわりの円盤の隙間は空ではありません。これらの隙間で物質が失われていることは、最も可能性が高くは何を示しますか。',
    },
    options: [
      { en: 'The star’s magnetic field is destroying the gas.', ja: '恒星の磁場がガスを破壊している。' },
      { en: 'Newly formed, unseen protoplanets have gravitationally swept the gas and dust from their orbits.', ja: '新しくできた見えない原始惑星が、その軌道からガスと塵を重力で一掃した。' },
      { en: 'The whole disk is evaporating in interstellar winds.', ja: '円盤全体が星間風で蒸発している。' },
      { en: 'A foreground dark nebula is blocking the region.', ja: '手前の暗黒星雲が領域を遮っている。' },
    ],
    answer: 1,
    explain: {
      en: 'Gaps mark where forming protoplanets have gravitationally cleared the gas and dust along their orbits.',
      ja: '隙間は、できつつある原始惑星が軌道に沿ってガスと塵を重力で一掃した場所を示します。',
    },
  },
  {
    q: {
      en: 'Hot Jupiters orbit very close to their stars, yet gas giants must form in cold outer regions. How is this reconciled?',
      ja: 'ホットジュピターは恒星のごく近くを回りますが、巨大ガス惑星は冷たい外側で形成されるはずです。どう折り合いをつけますか。',
    },
    options: [
      { en: 'Gas giants can actually form in extremely hot environments near a star.', ja: '巨大ガス惑星は恒星近くの極めて高温の環境でも実際に形成できる。' },
      { en: 'These "Jupiters" are really made of solid rock, not gas.', ja: 'これらの「ジュピター」は実はガスではなく固い岩でできている。' },
      { en: 'Giant planets can migrate inward after forming in the colder outer disk.', ja: '巨大惑星は冷たい外側の円盤で形成された後、内側へ移動できる。' },
      { en: 'Hot Jupiters have no cores.', ja: 'ホットジュピターには核がない。' },
    ],
    answer: 2,
    explain: {
      en: 'Hot Jupiters formed far out where it was cold, then migrated inward to their present close orbits.',
      ja: 'ホットジュピターは冷たい遠方で形成され、その後、現在の近い軌道へ内側に移動しました。',
    },
  },
];

const hard = [
  {
    q: {
      en: 'Why do the meteors in a shower appear to diverge from a single point (the radiant) in the sky?',
      ja: '流星群の流星が、空の一点（放射点）から広がって見えるのはなぜですか。',
    },
    options: [
      { en: 'The dust particles all revolve around a nearby star.', ja: '塵の粒子がすべて近くの恒星のまわりを回っているから。' },
      { en: 'The particles move on parallel paths, and perspective makes their tracks seem to diverge from a distant point, like railroad tracks.', ja: '粒子は平行な経路を進み、遠近法により、線路のように遠くの一点から広がって見えるから。' },
      { en: 'Earth’s gravity bends the meteors toward one focus.', ja: '地球の重力が流星を一つの焦点へ曲げるから。' },
      { en: 'The meteors are ejected from a single volcano on the parent comet.', ja: '流星が母彗星の単一の火山から噴き出すから。' },
    ],
    answer: 1,
    explain: {
      en: 'The particles travel on parallel paths; perspective makes them appear to fan out from one distant radiant, like parallel rails.',
      ja: '粒子は平行な経路を進み、遠近法によって、平行な線路のように遠くの一つの放射点から広がって見えます。',
    },
  },
  {
    q: {
      en: 'What is the geological explanation for the vast concentration of well-preserved meteorites in Antarctica?',
      ja: '南極に、よく保存された隕石が大量に集中している地質学的な説明は何ですか。',
    },
    options: [
      { en: 'Projectiles from space are attracted to Earth’s magnetic poles.', ja: '宇宙からの飛来物は地球の磁極に引き寄せられる。' },
      { en: 'The ice protects meteorites from oxygen so they don’t vaporize.', ja: '氷が隕石を酸素から守り、蒸発を防ぐ。' },
      { en: 'Meteorites are buried in accumulating ice, carried by its slow flow, and concentrated at the surface where wind wears the ice away.', ja: '隕石は積もる氷に埋もれ、そのゆっくりした流れで運ばれ、風が氷を削る場所で地表に濃縮される。' },
      { en: 'Projectiles fall only in polar regions because of Earth’s tilt.', ja: '地球の傾きのため、飛来物は極地方にしか落ちない。' },
    ],
    answer: 2,
    explain: {
      en: 'Fallen meteorites are buried, ferried by flowing ice, then exposed and concentrated where dry winds erode the ice away.',
      ja: '落ちた隕石は埋もれ、流れる氷に運ばれ、乾いた風が氷を削る場所で露出して濃縮されます。',
    },
  },
  {
    q: {
      en: 'What is the profound significance of primitive carbonaceous meteorites (Allende, Murchison) for the early Earth?',
      ja: '始原的な炭素質隕石（アエンデ、マーチソン）が初期地球にとって持つ深い意義は何ですか。',
    },
    options: [
      { en: 'They prove Earth’s crust was originally pure nickel-iron.', ja: '地球の地殻がもとは純粋なニッケル鉄だったと証明する。' },
      { en: 'They are unmodified nebular material and carry organic molecules that may have restocked Earth’s building blocks for life after its surface cooled.', ja: '手つかずの星雲物質であり、地表が冷えた後の地球に生命の構成要素を補充したかもしれない有機分子を運ぶ。' },
      { en: 'They let us calculate the orbit of Comet Swift-Tuttle.', ja: 'スイフト・タットル彗星の軌道を計算させてくれる。' },
      { en: 'They show Earth is the only place amino acids can exist.', ja: 'アミノ酸が存在できるのは地球だけだと示す。' },
    ],
    answer: 1,
    explain: {
      en: 'These pristine meteorites preserve original nebular material and organics that may have seeded the cooled early Earth with life’s building blocks.',
      ja: 'これらの手つかずの隕石は元の星雲物質と有機物を保存し、冷えた初期地球に生命の構成要素をもたらしたかもしれません。',
    },
  },
  {
    q: {
      en: 'How did the thousands of exoplanets found since 1995 reshape the "selection effect" in our theories of planet formation?',
      ja: '1995年以降に見つかった数千の系外惑星は、惑星形成の理論における「選択効果」をどのように塗り替えましたか。',
    },
    options: [
      { en: 'They confirmed our solar system is perfectly typical and all systems look like ours.', ja: '私たちの太陽系が完全に典型的で、すべての系が私たちのようだと確認した。' },
      { en: 'They showed our system is an exception because we have only terrestrial planets.', ja: '地球型惑星しかないため、私たちの系が例外だと示した。' },
      { en: 'They revealed configurations utterly unlike ours, exposing that earlier models were biased by having only one example — our own system.', ja: '私たちとまったく異なる配置を明らかにし、以前のモデルが唯一の例——私たち自身の系——に偏っていたことを露呈した。' },
      { en: 'They proved planets form only around very old stars.', ja: '惑星は非常に古い恒星のまわりでしか形成されないと証明した。' },
    ],
    answer: 2,
    explain: {
      en: 'Finding hot Jupiters and eccentric orbits showed our one-example models were biased — planetary systems are far more varied than assumed.',
      ja: 'ホットジュピターや扁平な軌道の発見は、唯一の例に基づくモデルが偏っていたことを示しました——惑星系は想定よりはるかに多様です。',
    },
  },
  {
    q: {
      en: 'Why are primitive meteorites far more valuable than Earth or Moon rocks for pinning down the age of the solar system?',
      ja: '太陽系の年齢を確定するのに、始原的な隕石が地球や月の岩よりはるかに貴重なのはなぜですか。',
    },
    options: [
      { en: 'They are much larger and easier to date.', ja: 'はるかに大きく、年代測定が簡単だから。' },
      { en: 'They never underwent geological activity, heating, or differentiation, so their radioactive dates mark when solids first condensed from the solar nebula.', ja: '地質活動・加熱・分化を一切受けていないので、その放射年代は固体が太陽系星雲から初めて凝縮した時を刻むから。' },
      { en: 'They contain only helium, which has a very short half-life.', ja: '半減期の非常に短いヘリウムだけを含むから。' },
      { en: 'They formed outside the solar system, giving an interstellar baseline age.', ja: '太陽系の外で形成され、星間の基準年齢を与えるから。' },
    ],
    answer: 1,
    explain: {
      en: 'Unmelted, undifferentiated meteorites are pristine "fossils"; their radioactive clocks date the very condensation of the solar system ~4.5 billion years ago.',
      ja: '溶けず分化していない隕石は手つかずの「化石」で、その放射時計は約45億年前の太陽系の凝縮そのものを年代づけます。',
    },
  },
];

export default { easy, medium, hard };
