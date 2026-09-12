const easy = [
  {
    q: {
      en: 'Which two elements together make up about 98% of the total mass of the Sun?',
      ja: '合わせて太陽の総質量の約98%を占める2つの元素はどれですか。',
    },
    options: [
      { en: 'Carbon and Oxygen', ja: '炭素と酸素' },
      { en: 'Nitrogen and Silicon', ja: '窒素とケイ素' },
      { en: 'Hydrogen and Helium', ja: '水素とヘリウム' },
      { en: 'Iron and Nickel', ja: '鉄とニッケル' },
    ],
    answer: 2,
    explain: {
      en: 'Hydrogen and helium together account for about 98% of the Sun’s mass.',
      ja: '水素とヘリウムを合わせると、太陽の質量の約98%になります。',
    },
  },
  {
    q: {
      en: 'Whose 1925 doctoral thesis first showed that hydrogen and helium are by far the most abundant elements in the Sun and stars?',
      ja: '1925年の博士論文で、水素とヘリウムが太陽や恒星で圧倒的に豊富な元素であることを初めて示したのは誰ですか。',
    },
    options: [
      { en: 'Annie Jump Cannon', ja: 'アニー・ジャンプ・キャノン' },
      { en: 'Cecilia Payne-Gaposchkin', ja: 'セシリア・ペイン＝ガポーシュキン' },
      { en: 'James Clerk Maxwell', ja: 'ジェームズ・クラーク・マクスウェル' },
      { en: 'Heinrich Schwabe', ja: 'ハインリヒ・シュワーベ' },
    ],
    answer: 1,
    explain: {
      en: 'Cecilia Payne-Gaposchkin’s 1925 thesis established that hydrogen and helium dominate the composition of stars.',
      ja: 'セシリア・ペイン＝ガポーシュキンの1925年の論文が、水素とヘリウムが恒星の組成を支配することを確立しました。',
    },
  },
  {
    q: {
      en: 'What is the approximate surface temperature of the solar photosphere?',
      ja: '太陽の光球の表面温度はおよそどれくらいですか。',
    },
    options: [
      { en: '3,800 K', ja: '3,800 K' },
      { en: '5,800 K', ja: '5,800 K' },
      { en: '10,000 K', ja: '10,000 K' },
      { en: '1,500,000 K', ja: '1,500,000 K' },
    ],
    answer: 1,
    explain: {
      en: 'The visible photosphere has an average temperature of about 5,800 K.',
      ja: '目に見える光球の平均温度は約5,800 Kです。',
    },
  },
  {
    q: {
      en: 'In which thin layer does the temperature leap from ~10,000 K to over 1,000,000 K across just a few kilometers?',
      ja: 'わずか数キロメートルの間に、温度が約10,000 Kから100万K超へ跳ね上がる薄い層はどれですか。',
    },
    options: [
      { en: 'Photosphere', ja: '光球' },
      { en: 'Radiative zone', ja: '放射層' },
      { en: 'Transition region', ja: '遷移層' },
      { en: 'Convective zone', ja: '対流層' },
    ],
    answer: 2,
    explain: {
      en: 'The transition region is the thin layer where temperature leaps from ~10,000 K to over a million K.',
      ja: '遷移層は、温度が約10,000 Kから100万K超へ跳ね上がる薄い層です。',
    },
  },
  {
    q: {
      en: 'What produces the mottled, "bubbling" look of the photosphere from upwelling columns of hot gas?',
      ja: '湧き上がる熱いガスの柱による、光球の斑点状で「泡立つ」外観を生むものは何ですか。',
    },
    options: [
      { en: 'Granulation', ja: '粒状斑（グラニュレーション）' },
      { en: 'Plages', ja: '白斑（プラージュ）' },
      { en: 'Spicules', ja: 'スピキュール' },
      { en: 'Prominences', ja: 'プロミネンス' },
    ],
    answer: 0,
    explain: {
      en: 'Granulation is the mottled convection pattern of rising hot gas columns on the photosphere.',
      ja: '粒状斑は、光球で熱いガスの柱が上昇する対流の斑点模様です。',
    },
  },
  {
    q: {
      en: 'Who discovered the regular sunspot cycle while searching for a planet inside Mercury’s orbit?',
      ja: '水星の軌道の内側にある惑星を探している最中に、規則的な黒点周期を発見したのは誰ですか。',
    },
    options: [
      { en: 'E. W. Maunder', ja: 'E・W・マウンダー' },
      { en: 'Gustav Spörer', ja: 'グスタフ・シュペーラー' },
      { en: 'Heinrich Schwabe', ja: 'ハインリヒ・シュワーベ' },
      { en: 'Bill Murtagh', ja: 'ビル・マータフ' },
    ],
    answer: 2,
    explain: {
      en: 'Heinrich Schwabe, an amateur astronomer, discovered the sunspot cycle while hunting for an intra-Mercurial planet.',
      ja: 'アマチュア天文家のハインリヒ・シュワーベが、水星内惑星を探す最中に黒点周期を発見しました。',
    },
  },
  {
    q: {
      en: 'What is the average length of the sunspot cycle from one minimum to the next?',
      ja: 'ある極小から次の極小までの黒点周期の平均の長さはどれくらいですか。',
    },
    options: [
      { en: '3.5 years', ja: '3.5年' },
      { en: '11 years', ja: '11年' },
      { en: '22 years', ja: '22年' },
      { en: '7 years', ja: '7年' },
    ],
    answer: 1,
    explain: {
      en: 'The number of sunspots varies in a cycle that averages about 11 years.',
      ja: '黒点の数は、平均して約11年の周期で変化します。',
    },
  },
  {
    q: {
      en: 'Because the magnetic polarity of leading sunspots reverses each cycle, the full solar magnetic activity cycle lasts:',
      ja: '各周期で先行黒点の磁極が反転するため、完全な太陽磁気活動周期の長さは：',
    },
    options: [
      { en: '11 years', ja: '11年' },
      { en: '22 years', ja: '22年' },
      { en: '33 years', ja: '33年' },
      { en: '50 years', ja: '50年' },
    ],
    answer: 1,
    explain: {
      en: 'The magnetic polarity flips each 11-year cycle, so the full magnetic cycle is about 22 years.',
      ja: '磁極は11年周期ごとに反転するので、完全な磁気周期は約22年です。',
    },
  },
  {
    q: {
      en: 'The splitting of spectral lines used to measure the strength and direction of magnetic fields in sunspots is called the:',
      ja: '黒点の磁場の強さと向きを測るのに使われる、スペクトル線の分裂は何と呼ばれますか。',
    },
    options: [
      { en: 'Doppler effect', ja: 'ドップラー効果' },
      { en: 'Inverse square law', ja: '逆二乗の法則' },
      { en: 'Zeeman effect', ja: 'ゼーマン効果' },
      { en: 'Stefan-Boltzmann law', ja: 'シュテファン・ボルツマンの法則' },
    ],
    answer: 2,
    explain: {
      en: 'The Zeeman effect — the splitting of spectral lines by a magnetic field — reveals sunspot magnetism.',
      ja: 'ゼーマン効果——磁場によるスペクトル線の分裂——が黒点の磁気を明らかにします。',
    },
  },
  {
    q: {
      en: 'What is the term for the Sun rotating faster at its equator (~25 days) than near its poles (~36 days)?',
      ja: '太陽が極付近（約36日）より赤道（約25日）で速く自転することを何と呼びますか。',
    },
    options: [
      { en: 'Synchronous rotation', ja: '同期回転' },
      { en: 'Differential rotation', ja: '差動回転' },
      { en: 'Precession', ja: '歳差' },
      { en: 'Hydrostatic equilibrium', ja: '静水圧平衡' },
    ],
    answer: 1,
    explain: {
      en: 'Differential rotation: the Sun’s equator turns faster (~25 days) than its poles (~36 days).',
      ja: '差動回転：太陽の赤道は極（約36日）より速く（約25日）回ります。',
    },
  },
  {
    q: {
      en: 'Bright, hot cloud-like regions in the chromosphere directly surrounding sunspots are called:',
      ja: '黒点を直接取り囲む、彩層の明るく熱い雲状の領域は何と呼ばれますか。',
    },
    options: [
      { en: 'Coronal holes', ja: 'コロナホール' },
      { en: 'Plages', ja: '白斑（プラージュ）' },
      { en: 'Auroras', ja: 'オーロラ' },
      { en: 'Filaments', ja: 'フィラメント' },
    ],
    answer: 1,
    explain: {
      en: 'Plages are bright, hot chromospheric regions around sunspots.',
      ja: '白斑（プラージュ）は、黒点のまわりの明るく熱い彩層の領域です。',
    },
  },
  {
    q: {
      en: 'Huge graceful loops or plumes of glowing gas extending from active regions into the corona are known as:',
      ja: '活動領域からコロナへ伸びる、輝くガスの巨大で優美なループやプルームは何と呼ばれますか。',
    },
    options: [
      { en: 'Solar flares', ja: '太陽フレア' },
      { en: 'Prominences', ja: 'プロミネンス' },
      { en: 'Granules', ja: '粒状斑' },
      { en: 'Solar wind', ja: '太陽風' },
    ],
    answer: 1,
    explain: {
      en: 'Prominences are enormous loops of glowing gas reaching from active regions into the corona.',
      ja: 'プロミネンスは、活動領域からコロナへ届く輝くガスの巨大なループです。',
    },
  },
  {
    q: {
      en: 'High-speed solar-wind streams escape most easily into space from which regions of the solar atmosphere?',
      ja: '高速の太陽風の流れは、太陽大気のどの領域から最も容易に宇宙へ逃げ出しますか。',
    },
    options: [
      { en: 'Sunspot umbras', ja: '黒点の暗部' },
      { en: 'Active plages', ja: '活動的な白斑' },
      { en: 'Coronal holes', ja: 'コロナホール' },
      { en: 'Transition-zone filaments', ja: '遷移層のフィラメント' },
    ],
    answer: 2,
    explain: {
      en: 'Coronal holes are open-field regions from which the high-speed solar wind streams out most easily.',
      ja: 'コロナホールは磁場が開いた領域で、高速の太陽風が最も容易に流れ出します。',
    },
  },
  {
    q: {
      en: 'What violent eruption throws a massive bubble of magnetized gas off the Sun at hundreds of km/s?',
      ja: '磁化したガスの巨大な泡を毎秒数百kmで太陽から放り出す激しい爆発は何ですか。',
    },
    options: [
      { en: 'Prominence loop', ja: 'プロミネンスのループ' },
      { en: 'Coronal Mass Ejection (CME)', ja: 'コロナ質量放出（CME）' },
      { en: 'Granulation plume', ja: '粒状斑のプルーム' },
      { en: 'Spicule jet', ja: 'スピキュールのジェット' },
    ],
    answer: 1,
    explain: {
      en: 'A Coronal Mass Ejection (CME) hurls a huge bubble of magnetized plasma into space at hundreds of km/s.',
      ja: 'コロナ質量放出（CME）は、磁化したプラズマの巨大な泡を毎秒数百kmで宇宙へ放ちます。',
    },
  },
  {
    q: {
      en: 'The 1645–1715 period of remarkably few sunspots and low solar activity is called the:',
      ja: '1645年から1715年の、黒点が著しく少なく太陽活動が低かった期間は何と呼ばれますか。',
    },
    options: [
      { en: 'Schwabe Cycle', ja: 'シュワーベ周期' },
      { en: 'Little Ice Age', ja: '小氷期' },
      { en: 'Maunder Minimum', ja: 'マウンダー極小期' },
      { en: 'Spörer Maximum', ja: 'シュペーラー極大期' },
    ],
    answer: 2,
    explain: {
      en: 'The Maunder Minimum (1645–1715) was a prolonged period of very few sunspots.',
      ja: 'マウンダー極小期（1645〜1715年）は、黒点が非常に少なかった長期間です。',
    },
  },
];

const medium = [
  {
    q: {
      en: 'Why do sunspots look dark against the surrounding photosphere?',
      ja: '黒点が周囲の光球に対して暗く見えるのはなぜですか。',
    },
    options: [
      { en: 'They are solid metallic landmasses floating on the surface.', ja: '表面に浮かぶ固い金属の陸塊だから。' },
      { en: 'Intense magnetic fields suppress convection, letting these regions cool to ~3,800 K versus the ~5,800 K photosphere.', ja: '強い磁場が対流を抑え、これらの領域が約5,800 Kの光球に対し約3,800 Kまで冷えるから。' },
      { en: 'Dense carbon monoxide clouds block all the light.', ja: '濃い一酸化炭素の雲がすべての光を遮るから。' },
      { en: 'Nuclear reactions stop directly beneath sunspots.', ja: '黒点の真下で核反応が止まるから。' },
    ],
    answer: 1,
    explain: {
      en: 'Strong magnetic fields choke off convection, so sunspots cool to ~3,800 K and look dark beside the hotter 5,800 K photosphere.',
      ja: '強い磁場が対流を止めるため黒点は約3,800 Kまで冷え、より熱い5,800 Kの光球の横で暗く見えます。',
    },
  },
  {
    q: {
      en: 'A sunspot group stretches from 10° to 35° latitude. How does differential rotation change its look over weeks?',
      ja: '黒点群が緯度10°から35°に広がっています。差動回転により、数週間でその見え方はどう変わりますか。',
    },
    options: [
      { en: 'It stays perfectly straight while crossing the disk.', ja: '円盤を横切る間、完全にまっすぐなまま。' },
      { en: 'The 10° part moves ahead faster than the 35° part, tilting and stretching the line.', ja: '10°の部分が35°の部分より速く先へ進み、線が傾いて伸びる。' },
      { en: 'The higher-latitude section rotates faster and pulls ahead.', ja: '高緯度の部分が速く回って先へ出る。' },
      { en: 'The group spins in a circle like a hurricane.', ja: 'ハリケーンのように群れが円を描いて回転する。' },
    ],
    answer: 1,
    explain: {
      en: 'The equator rotates faster, so the low-latitude end pulls ahead, shearing and tilting the group along the longitude line.',
      ja: '赤道が速く回るので低緯度側が先へ進み、経度線に沿って群れがずれて傾きます。',
    },
  },
  {
    q: {
      en: 'A CME leaves the Sun at ~500 km/s. About how long to reach Earth at 1 AU (150 million km)?',
      ja: 'CMEが約500 km/sで太陽を離れます。1 AU（1億5,000万km）の地球に届くまで、およそどれくらいかかりますか。',
    },
    options: [
      { en: '8 minutes', ja: '8分' },
      { en: '1 hour', ja: '1時間' },
      { en: '3 to 4 days', ja: '3〜4日' },
      { en: '30 days', ja: '30日' },
    ],
    answer: 2,
    explain: {
      en: '150,000,000 km ÷ 500 km/s ≈ 300,000 s ≈ 3.5 days.',
      ja: '1億5,000万km ÷ 500 km/s ≈ 30万秒 ≈ 3.5日です。',
    },
  },
  {
    q: {
      en: 'Why do solar-storm-induced currents threaten North American power grids more than equatorial ones?',
      ja: 'なぜ太陽嵐による誘導電流は、赤道の送電網より北米の送電網をより脅かすのですか。',
    },
    options: [
      { en: 'North America relies on solar panels that absorb flares directly.', ja: '北米はフレアを直接吸収する太陽電池に依存しているから。' },
      { en: 'Magnetic field lines funnel charged particles toward the poles, so high-latitude regions face stronger induced surges.', ja: '磁力線が荷電粒子を極へ導くため、高緯度地域はより強い誘導サージにさらされるから。' },
      { en: 'Equatorial regions have thicker ozone that reflects CMEs.', ja: '赤道域はCMEを反射する厚いオゾンを持つから。' },
      { en: 'The solar wind only strikes the Northern Hemisphere.', ja: '太陽風は北半球にしか当たらないから。' },
    ],
    answer: 1,
    explain: {
      en: 'Earth’s field channels charged particles toward the magnetic poles, so high-latitude grids suffer the strongest geomagnetically induced currents.',
      ja: '地球の磁場が荷電粒子を磁極へ導くため、高緯度の送電網が最も強い地磁気誘導電流を受けます。',
    },
  },
  {
    q: {
      en: 'By Wien’s law, why do X-ray and extreme-UV give a better view of the corona than visible light?',
      ja: 'ウィーンの法則によると、なぜX線と極端紫外線は可視光よりコロナをよく見せるのですか。',
    },
    options: [
      { en: 'Visible light cannot travel through the vacuum of space.', ja: '可視光は宇宙の真空を進めないから。' },
      { en: 'At millions of kelvin, a blackbody’s peak emission shifts to very short wavelengths like X-rays and UV.', ja: '数百万Kでは、黒体の放射のピークがX線やUVのような非常に短い波長へ移るから。' },
      { en: 'X-rays reflect off cool sunspots, making them easy to count.', ja: 'X線は冷たい黒点で反射し、数えやすくなるから。' },
      { en: 'The photosphere absorbs all X-rays before they reach the corona.', ja: '光球がコロナに届く前にすべてのX線を吸収するから。' },
    ],
    answer: 1,
    explain: {
      en: 'By Wien’s law, the million-degree corona radiates mostly at very short wavelengths — X-rays and extreme UV.',
      ja: 'ウィーンの法則により、100万度のコロナは主にX線や極端紫外線という非常に短い波長で放射します。',
    },
  },
];

const hard = [
  {
    q: {
      en: 'How did Cecilia Payne-Gaposchkin’s discovery change our understanding of cosmic chemistry?',
      ja: 'セシリア・ペイン＝ガポーシュキンの発見は、宇宙の化学についての理解をどう変えましたか。',
    },
    options: [
      { en: 'It proved Earth’s core matches the Sun in composition.', ja: '地球の核が太陽と同じ組成だと証明した。' },
      { en: 'It overturned the belief that stars share Earth’s composition, showing hydrogen and helium overwhelmingly dominate the cosmos.', ja: '恒星が地球と同じ組成だという通念を覆し、水素とヘリウムが宇宙を圧倒的に支配することを示した。' },
      { en: 'It showed sunspots are pure iron and calcium.', ja: '黒点が純粋な鉄とカルシウムだと示した。' },
      { en: 'It proved fusion occurs in the chromosphere.', ja: '核融合が彩層で起こると証明した。' },
    ],
    answer: 1,
    explain: {
      en: 'She overturned the assumption that stars are made of Earth-like material, revealing that hydrogen and helium dominate the universe.',
      ja: '彼女は恒星が地球のような物質でできているという想定を覆し、水素とヘリウムが宇宙を支配することを明らかにしました。',
    },
  },
  {
    q: {
      en: 'In solar dynamo theory, how do differential rotation and convection generate the 22-year magnetic cycle?',
      ja: '太陽ダイナモ理論では、差動回転と対流はどのように22年の磁気周期を生みますか。',
    },
    options: [
      { en: 'The solid core reverses spin every 11 years, flipping the poles.', ja: '固い核が11年ごとに逆回転して極を反転させる。' },
      { en: 'Differential rotation winds the internal field lines around the Sun until convection lifts loops through the surface, driving a global polarity flip every 11 years.', ja: '差動回転が内部の磁力線を太陽のまわりに巻き付け、対流がループを表面に押し上げ、11年ごとに全球的な極性反転を起こす。' },
      { en: 'Jupiter’s gravity stretches the Sun’s equator every 22 years.', ja: '木星の重力が22年ごとに太陽の赤道を引き伸ばす。' },
      { en: 'Core nuclear reactions pulse every 22 years.', ja: '核の核反応が22年ごとに脈動する。' },
    ],
    answer: 1,
    explain: {
      en: 'Differential rotation winds up the field; convection buoys loops to the surface; the polarity flips each 11 years, for a 22-year magnetic cycle.',
      ja: '差動回転が磁場を巻き上げ、対流がループを表面へ持ち上げ、極性が11年ごとに反転して22年の磁気周期になります。',
    },
  },
  {
    q: {
      en: 'What is the "solar atmosphere heating paradox," and what resolves it?',
      ja: '「太陽大気加熱の逆説」とは何で、何がそれを解決しますか。',
    },
    options: [
      { en: 'The core is colder than the surface; energy comes from meteor impacts.', ja: '核が表面より冷たく、エネルギーは隕石衝突から来る。' },
      { en: 'Temperature rises outward from the photosphere (~5,800 K) to the corona (~1,000,000 K), driven by magnetic energy transport and reconnection.', ja: '温度が光球（約5,800 K）からコロナ（約100万K）へ外向きに上がり、磁気エネルギーの輸送と磁気再結合が駆動する。' },
      { en: 'The photosphere is hotter than the core due to greenhouse gases.', ja: '温室効果ガスにより光球が核より熱い。' },
      { en: 'Photons gain energy leaving the Sun via gravitational redshift.', ja: '光子が重力赤方偏移で太陽を離れる際にエネルギーを得る。' },
    ],
    answer: 1,
    explain: {
      en: 'Counterintuitively the atmosphere gets hotter outward — corona over a million K — heated by magnetic energy transport and reconnection.',
      ja: '直感に反して大気は外向きに熱くなり——コロナは100万K超——磁気エネルギー輸送と再結合で加熱されます。',
    },
  },
  {
    q: {
      en: 'Why is forecasting "space weather" increasingly vital for modern civilization?',
      ja: 'なぜ「宇宙天気」の予報は現代文明にとってますます重要なのですか。',
    },
    options: [
      { en: 'Solar flares change Earth’s orbital distance and calendar length.', ja: '太陽フレアが地球の軌道距離と暦の長さを変えるから。' },
      { en: 'Geomagnetic storms and CMEs can disrupt satellites, distort GPS, endanger astronauts, and cause power-grid blackouts.', ja: '地磁気嵐とCMEは衛星を乱し、GPSを狂わせ、宇宙飛行士を危険にさらし、送電網の停電を起こしうるから。' },
      { en: 'CMEs permanently destroy Earth’s magnetosphere every 11 years.', ja: 'CMEが11年ごとに地球の磁気圏を永久に破壊するから。' },
      { en: 'Solar wind changes the chemistry of ocean water.', ja: '太陽風が海水の化学組成を変えるから。' },
    ],
    answer: 1,
    explain: {
      en: 'Space weather threatens satellites, GPS, astronauts, aviation, and power grids — so forecasting it protects vital infrastructure.',
      ja: '宇宙天気は衛星・GPS・宇宙飛行士・航空・送電網を脅かすため、その予報が重要インフラを守ります。',
    },
  },
  {
    q: {
      en: 'Why do astronomers call the Sun a "garden-variety star," and how does studying it help stellar astronomy?',
      ja: 'なぜ天文学者は太陽を「ありふれた星」と呼び、それを研究することが恒星天文学にどう役立ちますか。',
    },
    options: [
      { en: 'It is the only star in the galaxy that gives off light.', ja: '銀河で光を出す唯一の星だから。' },
      { en: 'It is an ordinary star of typical mass, size and temperature, serving as an up-close laboratory for interpreting distant, unresolved stars.', ja: '典型的な質量・大きさ・温度の普通の星で、遠く分解できない星の光を読み解くための間近な実験室になるから。' },
      { en: 'It is made entirely of solid rock and liquid oceans.', ja: '固い岩と液体の海だけでできているから。' },
      { en: 'It is the oldest star, formed during the Big Bang.', ja: 'ビッグバンで生まれた最古の星だから。' },
    ],
    answer: 1,
    explain: {
      en: 'The Sun is an ordinary star we can study in detail, giving us a nearby model for understanding all the distant stars we can’t resolve.',
      ja: '太陽は詳しく研究できる普通の星で、分解できない遠くのすべての星を理解するための身近なモデルになります。',
    },
  },
];

export default { easy, medium, hard };
