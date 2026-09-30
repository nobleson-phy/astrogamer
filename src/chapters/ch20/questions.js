const easy = [
  {
    q: {
      en: 'What are the relative proportions of gas and solid dust by mass in the interstellar medium?',
      ja: '星間物質における、質量でのガスと固体の塵のおおよその割合はどれですか。',
    },
    options: [
      { en: '50% gas and 50% dust', ja: 'ガス50%、塵50%' },
      { en: '75% gas and 25% dust', ja: 'ガス75%、塵25%' },
      { en: '99% gas and 1% dust', ja: 'ガス99%、塵1%' },
      { en: '99.9% dust and 0.1% gas', ja: '塵99.9%、ガス0.1%' },
    ],
    answer: 2,
    explain: {
      en: 'The interstellar medium is about 99% gas (atoms and molecules) and only about 1% solid dust by mass.',
      ja: '星間物質は質量でおよそ99%がガス（原子と分子）で、固体の塵は約1%だけです。',
    },
  },
  {
    q: {
      en: 'If all the interstellar gas were spread out smoothly, what would its average density be?',
      ja: '星間ガスをすべて均等にならすと、その平均密度はどれくらいになりますか。',
    },
    options: [
      { en: 'About 100 atoms per cm³', ja: '約100原子/cm³' },
      { en: 'About 1 atom per cm³', ja: '約1原子/cm³' },
      { en: 'About 10¹⁹ atoms per cm³', ja: '約10¹⁹原子/cm³' },
      { en: 'Less than 1 atom per cubic light-year', ja: '1立方光年あたり1原子未満' },
    ],
    answer: 1,
    explain: {
      en: 'Averaged across the Galaxy, interstellar gas is only about 1 atom per cubic centimeter — an excellent vacuum.',
      ja: '銀河全体で平均すると、星間ガスはわずか約1原子/cm³——優れた真空です。',
    },
  },
  {
    q: {
      en: 'What produces the red glow of H II regions around hot young stars?',
      ja: '高温の若い星の周りのH II領域の赤い輝きを生むものは何ですか。',
    },
    options: [
      { en: 'Infrared heat from cold graphite dust', ja: '冷たい黒鉛の塵からの赤外線の熱' },
      { en: 'The hydrogen H-alpha (Balmer) line emitted as electrons recombine', ja: '電子が再結合するときに放たれる水素のHα（バルマー）線' },
      { en: 'X-rays from supernova shock waves', ja: '超新星の衝撃波からのX線' },
      { en: 'The spin-flip transition of neutral hydrogen', ja: '中性水素のスピン反転遷移' },
    ],
    answer: 1,
    explain: {
      en: 'Hot stars ionize the hydrogen; as electrons recombine and cascade down, they emit the red H-alpha line at 656 nm.',
      ja: '高温の星が水素を電離し、電子が再結合して落ちるときに656 nmの赤いHα線を放ちます。',
    },
  },
  {
    q: {
      en: 'How do radio astronomers map cold, neutral hydrogen across the Milky Way?',
      ja: '電波天文学者は、天の川の冷たい中性水素をどう地図化しますか。',
    },
    options: [
      { en: 'By detecting visible Balmer absorption lines', ja: '可視のバルマー吸収線を検出して' },
      { en: 'By observing the 21-cm emission line from the hydrogen spin flip', ja: '水素のスピン反転による21 cm放射線を観測して' },
      { en: 'By tracking gamma-ray bursts from giant stars', ja: '巨星からのガンマ線バーストを追って' },
      { en: 'By measuring UV absorption from ionized carbon', ja: '電離炭素からの紫外吸収を測って' },
    ],
    answer: 1,
    explain: {
      en: 'Neutral hydrogen emits a 21-cm radio photon when its electron flips spin; this line maps cold H throughout the disk.',
      ja: '中性水素は電子のスピンが反転するとき21 cmの電波光子を放ちます。この線が円盤全体の冷たい水素を地図化します。',
    },
  },
  {
    q: {
      en: 'Which two physicists made the first radio detection of the 21-cm line in 1951?',
      ja: '1951年に21 cm線の最初の電波検出を行った2人の物理学者は誰ですか。',
    },
    options: [
      { en: 'William Herschel and E. E. Barnard', ja: 'ウィリアム・ハーシェルとE・E・バーナード' },
      { en: 'Harold Ewen and Edward Purcell', ja: 'ハロルド・ユーエンとエドワード・パーセル' },
      { en: 'Victor Hess and Hendrik van de Hulst', ja: 'ヴィクトル・ヘスとヘンドリック・ファン・デ・フルスト' },
      { en: 'Cecilia Payne-Gaposchkin and Annie Jump Cannon', ja: 'セシリア・ペイン＝ガポーシュキンとアニー・ジャンプ・キャノン' },
    ],
    answer: 1,
    explain: {
      en: 'Harold Ewen and Edward Purcell first detected the 21-cm line of neutral hydrogen at Harvard in 1951.',
      ja: 'ハロルド・ユーエンとエドワード・パーセルが1951年にハーバードで中性水素の21 cm線を初めて検出しました。',
    },
  },
  {
    q: {
      en: 'What heats ultra-hot interstellar gas to a million kelvin or more?',
      ja: '超高温の星間ガスを100万K以上に熱するのは何ですか。',
    },
    options: [
      { en: 'Nuclear fusion in giant molecular clouds', ja: '巨大分子雲での核融合' },
      { en: 'Shock waves from supernova explosions of massive stars', ja: '大質量星の超新星爆発による衝撃波' },
      { en: 'Friction from galactic rotation', ja: '銀河回転による摩擦' },
      { en: 'Ultraviolet light from white dwarfs', ja: '白色矮星からの紫外線' },
    ],
    answer: 1,
    explain: {
      en: 'Supernovae launch gas at thousands of km/s; the resulting shock waves heat interstellar gas to over a million kelvin.',
      ja: '超新星は毎秒数千kmでガスを放ち、生じる衝撃波が星間ガスを100万K超に熱します。',
    },
  },
  {
    q: {
      en: 'Since cold H₂ emits almost nothing, which molecule is used as a tracer of giant molecular clouds?',
      ja: '冷たいH₂はほとんど放射しないので、巨大分子雲の指標に使われる分子はどれですか。',
    },
    options: [
      { en: 'Ammonia (NH₃)', ja: 'アンモニア（NH₃）' },
      { en: 'Water vapor (H₂O)', ja: '水蒸気（H₂O）' },
      { en: 'Carbon monoxide (CO)', ja: '一酸化炭素（CO）' },
      { en: 'Methane (CH₄)', ja: 'メタン（CH₄）' },
    ],
    answer: 2,
    explain: {
      en: 'Cold H₂ barely radiates, so astronomers trace molecular clouds using the readily emitted carbon monoxide (CO).',
      ja: '冷たいH₂はほとんど放射しないので、天文学者はよく放射する一酸化炭素（CO）で分子雲を追います。',
    },
  },
  {
    q: {
      en: 'Which astronomer showed with photographic catalogs that dark patches (like Barnard 68) are dust clouds, not "holes in heaven"?',
      ja: '写真目録により、暗い斑点（バーナード68など）が「天の穴」ではなく塵の雲であることを示した天文学者は誰ですか。',
    },
    options: [
      { en: 'William Herschel', ja: 'ウィリアム・ハーシェル' },
      { en: 'E. E. Barnard', ja: 'E・E・バーナード' },
      { en: 'Edwin Hubble', ja: 'エドウィン・ハッブル' },
      { en: 'Harlow Shapley', ja: 'ハーロー・シャプレー' },
    ],
    answer: 1,
    explain: {
      en: 'E. E. Barnard cataloged dark nebulae photographically, proving they are obscuring dust clouds, not empty holes.',
      ja: 'E・E・バーナードは暗黒星雲を写真で目録化し、それらが視界を遮る塵の雲で、空の穴ではないと証明しました。',
    },
  },
  {
    q: {
      en: 'Why do reflection nebulae (like around the Pleiades) usually look blue?',
      ja: '反射星雲（プレアデスの周りなど）が通常青く見えるのはなぜですか。',
    },
    options: [
      { en: 'The stars emit only blue radio waves.', ja: '星が青い電波だけを放つから。' },
      { en: 'The dust is made of cobalt and copper ice.', ja: '塵がコバルトと銅の氷でできているから。' },
      { en: 'Tiny dust grains scatter blue light far more efficiently than red.', ja: '微小な塵の粒が赤より青の光をはるかに効率よく散乱するから。' },
      { en: 'Hydrogen gas undergoes high-energy ionization.', ja: '水素ガスが高エネルギーの電離を起こすから。' },
    ],
    answer: 2,
    explain: {
      en: 'Interstellar dust scatters short (blue) wavelengths much more than long (red) ones, so reflection nebulae look blue.',
      ja: '星間塵は短い（青い）波長を長い（赤い）波長よりずっと多く散乱するので、反射星雲は青く見えます。',
    },
  },
  {
    q: {
      en: 'What is the total dimming of starlight by dust absorption and scattering called?',
      ja: '塵の吸収と散乱による星の光の全体的な減光は何と呼ばれますか。',
    },
    options: [
      { en: 'Interstellar extinction', ja: '星間減光' },
      { en: 'Synchrotron radiation', ja: 'シンクロトロン放射' },
      { en: 'Gravitational lensing', ja: '重力レンズ' },
      { en: 'Dispersion', ja: '分散' },
    ],
    answer: 0,
    explain: {
      en: 'Interstellar extinction is the combined dimming of starlight from absorption and scattering by dust.',
      ja: '星間減光は、塵による吸収と散乱による星の光の合わさった減光です。',
    },
  },
  {
    q: {
      en: 'What is the accepted structural model of an interstellar dust grain?',
      ja: '星間塵の粒子について受け入れられている構造モデルはどれですか。',
    },
    options: [
      { en: 'An iron-nickel sphere coated with liquid mercury', ja: '液体水銀で覆われた鉄ニッケルの球' },
      { en: 'A diamond crystal around a helium cavity', ja: 'ヘリウムの空洞を囲むダイヤモンド結晶' },
      { en: 'A silicate or graphite core surrounded by an icy mantle', ja: 'ケイ酸塩または黒鉛の核を氷のマントルが囲む' },
      { en: 'A hollow shell of pure water ice', ja: '純粋な水の氷の中空の殻' },
    ],
    answer: 2,
    explain: {
      en: 'Dust grains are thought to have a rocky silicate or sooty graphite core wrapped in an icy mantle.',
      ja: '塵の粒子は、岩石質のケイ酸塩やすすのような黒鉛の核を氷のマントルが包むと考えられています。',
    },
  },
  {
    q: {
      en: 'Which physicist discovered cosmic rays in 1911 using balloon flights high into the atmosphere?',
      ja: '1911年に大気高くへの気球飛行で宇宙線を発見した物理学者は誰ですか。',
    },
    options: [
      { en: 'Victor Hess', ja: 'ヴィクトル・ヘス' },
      { en: 'Harold Ewen', ja: 'ハロルド・ユーエン' },
      { en: 'Karl Jansky', ja: 'カール・ジャンスキー' },
      { en: 'Max Planck', ja: 'マックス・プランク' },
    ],
    answer: 0,
    explain: {
      en: 'Victor Hess discovered cosmic rays in 1911 by flying radiation detectors up in balloons.',
      ja: 'ヴィクトル・ヘスは1911年、気球で放射線検出器を上空へ飛ばして宇宙線を発見しました。',
    },
  },
  {
    q: {
      en: 'Which light elements are far more abundant in cosmic rays than in stars, made when nuclei collide with protons?',
      ja: '核が陽子と衝突して作られ、恒星よりも宇宙線ではるかに豊富な軽元素はどれですか。',
    },
    options: [
      { en: 'Carbon, nitrogen, and oxygen', ja: '炭素・窒素・酸素' },
      { en: 'Lithium, beryllium, and boron', ja: 'リチウム・ベリリウム・ホウ素' },
      { en: 'Uranium, radium, and plutonium', ja: 'ウラン・ラジウム・プルトニウム' },
      { en: 'Iron, nickel, and cobalt', ja: '鉄・ニッケル・コバルト' },
    ],
    answer: 1,
    explain: {
      en: 'Lithium, beryllium, and boron are overabundant in cosmic rays, made by spallation when fast nuclei hit protons.',
      ja: 'リチウム・ベリリウム・ホウ素は宇宙線に過剰にあり、速い核が陽子に当たる核破砕で作られます。',
    },
  },
  {
    q: {
      en: 'What is the low-density region of million-degree, X-ray-emitting gas that the Sun sits inside?',
      ja: '太陽がその内側にある、100万度でX線を放つ低密度の領域は何ですか。',
    },
    options: [
      { en: 'The Orion Spur', ja: 'オリオン腕' },
      { en: 'The Local Bubble (Local Hot Bubble)', ja: 'ローカルバブル（局所高温泡）' },
      { en: 'The Carina Cavity', ja: 'カリーナ空洞' },
      { en: 'The Sagittarius Stream', ja: 'いて座ストリーム' },
    ],
    answer: 1,
    explain: {
      en: 'The Sun lies within the Local Bubble, a low-density cavity of million-degree, X-ray-emitting gas.',
      ja: '太陽は、100万度でX線を放つ低密度の空洞であるローカルバブルの中にあります。',
    },
  },
  {
    q: {
      en: 'What is the warmer (~7,000 K), slightly denser cloud inside the Local Bubble the solar system entered ~10,000 years ago?',
      ja: '太陽系が約1万年前に入った、ローカルバブル内のより暖かく（約7,000 K）わずかに密な雲は何ですか。',
    },
    options: [
      { en: 'The Pleiades Cloud', ja: 'プレアデス雲' },
      { en: 'The Local Interstellar Cloud ("Local Fluff")', ja: '局所恒星間雲（「ローカル・フラフ」）' },
      { en: 'The Horsehead Filament', ja: '馬頭フィラメント' },
      { en: 'The Vela Remnant', ja: 'ほ座残骸' },
    ],
    answer: 1,
    explain: {
      en: 'The solar system is currently passing through the Local Interstellar Cloud, or "Local Fluff" (~7,000 K).',
      ja: '太陽系は現在、局所恒星間雲、すなわち「ローカル・フラフ」（約7,000 K）を通過中です。',
    },
  },
];

const medium = [
  {
    q: {
      en: 'A single hydrogen atom emits a 21-cm photon only once every ~10 million years. Why is the 21-cm line still one of the strongest radio features?',
      ja: '1つの水素原子は約1,000万年に一度しか21 cm光子を出しません。それでも21 cm線が最も強い電波の特徴の一つなのはなぜですか。',
    },
    options: [
      { en: 'Radio telescopes amplify 21-cm signals 10 billion times.', ja: '電波望遠鏡が21 cm信号を100億倍に増幅するから。' },
      { en: 'Space holds so many neutral hydrogen atoms that millions emit 21-cm photons every second.', ja: '宇宙には非常に多くの中性水素原子があり、毎秒何百万個も21 cm光子を放つから。' },
      { en: 'Cosmic rays constantly excite hydrogen electrons.', ja: '宇宙線が絶えず水素の電子を励起するから。' },
      { en: 'Dust grains reflect 21-cm light toward Earth.', ja: '塵の粒が21 cm光を地球へ反射するから。' },
    ],
    answer: 1,
    explain: {
      en: 'The transition is rare per atom, but interstellar clouds contain so many atoms that the combined signal is strong and steady.',
      ja: '1原子あたりはまれですが、星間雲には非常に多くの原子があるので、合わさった信号は強く安定します。',
    },
  },
  {
    q: {
      en: 'A star’s spectrum shows it is a hot 30,000 K blue O-type, yet it looks reddish. Why?',
      ja: 'ある星のスペクトルは3万Kの高温の青いO型を示すのに、赤みがかって見えます。なぜですか。',
    },
    options: [
      { en: 'It is collapsing into a red giant.', ja: '赤色巨星へ崩壊しているから。' },
      { en: 'Interstellar dust scatters away the shorter blue wavelengths, letting redder light reach us.', ja: '星間塵が短い青の波長を散乱で除き、より赤い光が届くから。' },
      { en: 'A strong magnetic field redshifts its light.', ja: '強い磁場が光を赤方偏移させるから。' },
      { en: 'It moves toward Earth at 90% the speed of light.', ja: '光速の90%で地球へ近づいているから。' },
    ],
    answer: 1,
    explain: {
      en: 'Dust preferentially scatters blue light, so a hot star seen through dust looks redder — interstellar reddening.',
      ja: '塵は青い光を優先的に散乱するので、塵越しに見る高温の星は赤く見えます——星間赤化です。',
    },
  },
  {
    q: {
      en: 'Why do giant molecular clouds stay extremely cold (~10 K)?',
      ja: '巨大分子雲が極めて冷たいまま（約10 K）なのはなぜですか。',
    },
    options: [
      { en: 'Fusion inside them absorbs all heat.', ja: '内部の核融合がすべての熱を吸収するから。' },
      { en: 'Their dense gas and dust block ambient UV starlight, shielding the interior from heat.', ja: '密なガスと塵が周囲の紫外の星の光を遮り、内部を熱から守るから。' },
      { en: 'They are made of liquid-helium oceans.', ja: '液体ヘリウムの海でできているから。' },
      { en: 'Cosmic rays cool the gas by stripping electrons.', ja: '宇宙線が電子を剥ぎ取ってガスを冷やすから。' },
    ],
    answer: 1,
    explain: {
      en: 'Dense outer layers absorb starlight, so the shielded interior never gets heated and cools to about 10 K.',
      ja: '密な外層が星の光を吸収するので、守られた内部は熱せられず約10 Kまで冷えます。',
    },
  },
  {
    q: {
      en: 'Why do astronomers use infrared and radio, not visible light, to find protostars deep in dusty nurseries?',
      ja: '塵の多い星のゆりかごの奥にある原始星を探すのに、天文学者が可視光でなく赤外線と電波を使うのはなぜですか。',
    },
    options: [
      { en: 'Visible light travels too slowly out of dense clouds.', ja: '可視光は密な雲から出るのが遅すぎるから。' },
      { en: 'Infrared and radio waves are longer than typical dust grains, so they pass through the dust that absorbs visible light.', ja: '赤外線と電波は典型的な塵の粒より波長が長いので、可視光を吸収する塵を通り抜けるから。' },
      { en: 'Protostars emit only radio waves.', ja: '原始星は電波しか放たないから。' },
      { en: 'Earth’s atmosphere blocks all visible light from these regions.', ja: '地球の大気がこれらの領域からの可視光をすべて遮るから。' },
    ],
    answer: 1,
    explain: {
      en: 'Dust scatters light with wavelengths near its grain size; longer infrared and radio waves slip through the dust unhindered.',
      ja: '塵は粒のサイズに近い波長の光を散乱します。より長い赤外線と電波は塵を難なく通り抜けます。',
    },
  },
  {
    q: {
      en: 'Why do stars cooler than 25,000 K make blue reflection nebulae, while hotter stars make red emission nebulae?',
      ja: 'なぜ25,000 Kより低温の星は青い反射星雲を、より高温の星は赤い輝線星雲を作るのですか。',
    },
    options: [
      { en: 'Cooler stars emit red light that hydrogen converts to blue.', ja: '低温の星が出す赤い光を水素が青に変えるから。' },
      { en: 'Cooler stars lack the UV (< 91.2 nm) needed to ionize hydrogen, so dust-scattered starlight dominates.', ja: '低温の星は水素を電離するのに必要な紫外線（<91.2 nm）に乏しく、塵で散乱した星の光が優勢になるから。' },
      { en: 'Hotter stars destroy all dust within 1,000 ly.', ja: '高温の星は1,000光年以内の塵をすべて破壊するから。' },
      { en: 'Reflection nebulae are made only of carbon monoxide.', ja: '反射星雲は一酸化炭素だけでできているから。' },
    ],
    answer: 1,
    explain: {
      en: 'Ionizing hydrogen needs UV below 91.2 nm; cooler stars lack it, so scattered blue starlight (reflection) wins over gas emission.',
      ja: '水素の電離には91.2 nm未満の紫外線が要ります。低温の星はそれに乏しいので、散乱した青い星の光（反射）がガスの発光に勝ります。',
    },
  },
];

const hard = [
  {
    q: {
      en: 'How does the "baryon cycle" describe matter in the Galaxy, and what role do supernovae play?',
      ja: '「バリオンサイクル」は銀河の物質をどう説明し、超新星はどんな役割を果たしますか。',
    },
    options: [
      { en: 'Matter is permanently locked in white dwarfs and never returns to the ISM.', ja: '物質は白色矮星に永久に閉じ込められ、星間物質に戻らない。' },
      { en: 'Accreted gas forms stars in molecular clouds; dying stars and supernovae return enriched gas and heavy elements to the ISM, driving chemical evolution.', ja: '降着したガスが分子雲で星を作り、死にゆく星と超新星が富化したガスと重元素を星間物質に返し、化学進化を駆動する。' },
      { en: 'Supernovae turn interstellar hydrogen into dark matter.', ja: '超新星が星間水素を暗黒物質に変える。' },
      { en: 'The cycle makes the Galaxy lose half its mass every million years.', ja: 'サイクルにより銀河は100万年ごとに質量の半分を失う。' },
    ],
    answer: 1,
    explain: {
      en: 'The baryon cycle: gas accretes, forms stars, and dying stars and supernovae return enriched material — steadily raising heavy-element abundances.',
      ja: 'バリオンサイクル：ガスが降着し星を作り、死にゆく星と超新星が富化した物質を返す——重元素の存在度を着実に高めます。',
    },
  },
  {
    q: {
      en: 'How do interstellar dust grains act as "catalysts" for astrochemistry in molecular clouds?',
      ja: '星間塵の粒子は、分子雲の宇宙化学でどのように「触媒」として働きますか。',
    },
    options: [
      { en: 'They heat the gas to millions of degrees, fusing atoms.', ja: 'ガスを数百万度に熱して原子を融合させる。' },
      { en: 'Their solid surfaces let cold atoms cling, meet, and bond into complex molecules while shielding them from UV.', ja: 'その固体表面で冷たい原子が付着・出会い・結合して複雑な分子になり、紫外線から守られる。' },
      { en: 'They emit magnetic fields that line up electrons into chains.', ja: '電子を鎖状に並べる磁場を放つ。' },
      { en: 'They strip electrons from hydrogen to make plasma.', ja: '水素から電子を剥いでプラズマにする。' },
    ],
    answer: 1,
    explain: {
      en: 'Grain surfaces gather cold atoms so they can react into complex molecules, and shield those molecules from destructive UV light.',
      ja: '粒の表面が冷たい原子を集めて複雑な分子へ反応させ、その分子を破壊的な紫外線から守ります。',
    },
  },
  {
    q: {
      en: 'Why does the overabundance of lithium, beryllium, and boron in cosmic rays prove cosmic-ray spallation?',
      ja: 'なぜ宇宙線中のリチウム・ベリリウム・ホウ素の過剰は、宇宙線の核破砕を証明するのですか。',
    },
    options: [
      { en: 'These elements form abundantly in main-sequence core fusion.', ja: 'これらは主系列の核融合で豊富に作られるから。' },
      { en: 'These fragile elements are destroyed inside stars, so their cosmic-ray abundance shows fast C, N, O nuclei fragment on hitting protons.', ja: 'これらのもろい元素は星の内部で壊されるので、宇宙線での存在度は、速いC・N・O核が陽子に当たって砕けることを示す。' },
      { en: 'Li and B are delivered from intergalactic space by black-hole jets.', ja: 'リチウムとホウ素はブラックホールのジェットで銀河間空間から運ばれるから。' },
      { en: 'They only condense on cold comet surfaces.', ja: '冷たい彗星の表面でしか凝縮しないから。' },
    ],
    answer: 1,
    explain: {
      en: 'Stars destroy Li, Be, B, so their surplus in cosmic rays must come from fast C/N/O nuclei shattering on interstellar protons — spallation.',
      ja: '星はLi・Be・Bを壊すので、宇宙線でのその余剰は、速いC/N/O核が星間陽子で砕ける核破砕から来るはずです。',
    },
  },
  {
    q: {
      en: 'How are supernova explosions both destructive and creative for the interstellar medium?',
      ja: '超新星爆発は、星間物質にとってどのように破壊的でも創造的でもあるのですか。',
    },
    options: [
      { en: 'They destroy dark matter while making fresh hydrogen.', ja: '暗黒物質を破壊しつつ新しい水素を作る。' },
      { en: 'Their shocks carve hot low-density bubbles and disrupt gas, but also compress nearby clouds to trigger star formation and spread heavy elements.', ja: 'その衝撃波は熱く低密度の泡を刻みガスを乱すが、近くの雲を圧縮して星形成を引き起こし、重元素を広める。' },
      { en: 'They cool the ISM to absolute zero while vaporizing dust.', ja: '塵を蒸発させつつ星間物質を絶対零度まで冷やす。' },
      { en: 'They stop stars from forming outside the Galactic core.', ja: '銀河核の外での星形成を止める。' },
    ],
    answer: 1,
    explain: {
      en: 'Supernova shocks blow hot cavities and scatter gas, yet also compress dense clouds into new stars and seed the ISM with heavy elements.',
      ja: '超新星の衝撃波は熱い空洞を作りガスを散らす一方、密な雲を圧縮して新しい星にし、星間物質に重元素をまきます。',
    },
  },
  {
    q: {
      en: 'The Local Bubble around us holds million-kelvin gas — why is that no danger to Earth?',
      ja: '私たちを囲むローカルバブルには100万Kのガスがある——なぜ地球に危険がないのですか。',
    },
    options: [
      { en: 'Earth’s ozone reflects thermal gas conduction.', ja: '地球のオゾンが熱伝導を反射するから。' },
      { en: 'The gas density is extraordinarily low (~0.01 atoms/cm³), so the total heat transferred is negligible.', ja: 'ガス密度が極端に低く（約0.01原子/cm³）、伝わる熱の総量が無視できるから。' },
      { en: 'The Sun’s magnetic field converts the heat into visible light.', ja: '太陽の磁場が熱を可視光に変えるから。' },
      { en: 'The gas is entirely non-interacting dark matter.', ja: 'ガスは相互作用しない暗黒物質だけだから。' },
    ],
    answer: 1,
    explain: {
      en: 'Temperature is energy per particle, but with so few particles the total heat is tiny — the near-vacuum can’t warm Earth.',
      ja: '温度は粒子あたりのエネルギーですが、粒子が非常に少ないので総熱量はごくわずか——ほぼ真空は地球を温められません。',
    },
  },
];

export default { easy, medium, hard };
