const easy = [
  {
    q: {
      en: 'In the mid-1800s, Lord Kelvin and Hermann von Helmholtz proposed that the Sun produces energy by which mechanism?',
      ja: '1800年代半ば、ケルビン卿とヘルマン・フォン・ヘルムホルツは、太陽がどの仕組みでエネルギーを生むと提案しましたか。',
    },
    options: [
      { en: 'Chemical combustion of carbon and oxygen', ja: '炭素と酸素の化学燃焼' },
      { en: 'Radioactive decay of heavy elements', ja: '重元素の放射性崩壊' },
      { en: 'Converting gravitational energy to heat through slow contraction', ja: 'ゆっくりした収縮で重力エネルギーを熱に変換' },
      { en: 'Continuous bombardment by meteors and comets', ja: '流星と彗星の絶え間ない衝突' },
    ],
    answer: 2,
    explain: {
      en: 'Kelvin and Helmholtz proposed the Sun stays hot by slowly contracting, converting gravitational energy into heat.',
      ja: 'ケルビンとヘルムホルツは、太陽がゆっくり収縮し重力エネルギーを熱に変えて熱を保つと提案しました。',
    },
  },
  {
    q: {
      en: 'In Einstein’s equation E = mc², what does c² represent?',
      ja: 'アインシュタインの式 E = mc² で、c² は何を表しますか。',
    },
    options: [
      { en: 'The Sun’s surface gravity', ja: '太陽の表面重力' },
      { en: 'The square of the speed of light — a mass-to-energy conversion factor', ja: '光速の2乗——質量からエネルギーへの変換係数' },
      { en: 'The temperature needed for nuclear fission', ja: '核分裂に必要な温度' },
      { en: 'The density of the solar interior', ja: '太陽内部の密度' },
    ],
    answer: 1,
    explain: {
      en: 'c is the speed of light (3×10⁸ m/s), so c² is the enormous factor converting mass into energy.',
      ja: 'cは光速（3×10⁸ m/s）で、c²は質量をエネルギーに変える巨大な係数です。',
    },
  },
  {
    q: {
      en: 'When hydrogen fuses into helium in the Sun, what percentage of the hydrogen’s mass becomes energy?',
      ja: '太陽で水素がヘリウムに融合するとき、水素の質量の何パーセントがエネルギーになりますか。',
    },
    options: [
      { en: '0.01%', ja: '0.01%' },
      { en: '0.71%', ja: '0.71%' },
      { en: '5.0%', ja: '5.0%' },
      { en: '12.0%', ja: '12.0%' },
    ],
    answer: 1,
    explain: {
      en: 'Four hydrogen nuclei have 0.71% more mass than one helium-4 nucleus; that difference becomes energy.',
      ja: '4個の水素核は1個のヘリウム4核より0.71%質量が多く、その差がエネルギーになります。',
    },
  },
  {
    q: {
      en: 'About how many tons of hydrogen must fuse into helium each second to sustain the Sun’s output?',
      ja: '太陽の出力を保つには、毎秒およそ何トンの水素がヘリウムに融合しなければなりませんか。',
    },
    options: [
      { en: '4 million tons', ja: '400万トン' },
      { en: '150 million tons', ja: '1億5,000万トン' },
      { en: '600 million tons', ja: '6億トン' },
      { en: '4.5 billion tons', ja: '45億トン' },
    ],
    answer: 2,
    explain: {
      en: 'The Sun fuses about 600 million tons of hydrogen into helium every second.',
      ja: '太陽は毎秒およそ6億トンの水素をヘリウムに融合します。',
    },
  },
  {
    q: {
      en: 'Of that fused hydrogen, how much mass is actually destroyed and turned into pure energy each second?',
      ja: 'その融合した水素のうち、毎秒どれだけの質量が実際に消え、純粋なエネルギーに変わりますか。',
    },
    options: [
      { en: '4 million tons', ja: '400万トン' },
      { en: '600 million tons', ja: '6億トン' },
      { en: '10 billion tons', ja: '100億トン' },
      { en: '1 trillion tons', ja: '1兆トン' },
    ],
    answer: 0,
    explain: {
      en: 'Of the ~600 million tons fused, about 4 million tons of mass is converted directly into energy each second.',
      ja: '融合する約6億トンのうち、毎秒およそ400万トンの質量が直接エネルギーに変わります。',
    },
  },
  {
    q: {
      en: 'What is the main sequence of nuclear reactions by which the Sun turns hydrogen into helium?',
      ja: '太陽が水素をヘリウムに変える主要な核反応の系列は何ですか。',
    },
    options: [
      { en: 'CNO cycle', ja: 'CNOサイクル' },
      { en: 'Triple-alpha process', ja: 'トリプルアルファ過程' },
      { en: 'Carbon-burning chain', ja: '炭素燃焼連鎖' },
      { en: 'Proton-proton chain', ja: '陽子-陽子連鎖' },
    ],
    answer: 3,
    explain: {
      en: 'In the Sun, hydrogen fuses to helium mainly through the proton-proton chain.',
      ja: '太陽では、水素は主に陽子-陽子連鎖によってヘリウムに融合します。',
    },
  },
  {
    q: {
      en: 'Which powerful, short-range force holds protons and neutrons together against electrical repulsion?',
      ja: '電気的な反発に抗して、陽子と中性子をまとめる強力で近距離の力はどれですか。',
    },
    options: [
      { en: 'Gravitational force', ja: '重力' },
      { en: 'Strong nuclear force', ja: '強い核力' },
      { en: 'Electromagnetic force', ja: '電磁気力' },
      { en: 'Weak nuclear force', ja: '弱い核力' },
    ],
    answer: 1,
    explain: {
      en: 'The strong nuclear force binds protons and neutrons in the nucleus, overcoming their electrical repulsion at very short range.',
      ja: '強い核力が、ごく近距離で電気的反発を克服し、核内の陽子と中性子を結びつけます。',
    },
  },
  {
    q: {
      en: 'What is the positively charged antiparticle of the electron called?',
      ja: '電子の正の電荷をもつ反粒子は何と呼ばれますか。',
    },
    options: [
      { en: 'Neutrino', ja: 'ニュートリノ' },
      { en: 'Deuteron', ja: '重陽子' },
      { en: 'Positron', ja: '陽電子' },
      { en: 'Antiproton', ja: '反陽子' },
    ],
    answer: 2,
    explain: {
      en: 'A positron is the antielectron — same mass as an electron but positive charge.',
      ja: '陽電子は反電子で、電子と同じ質量ですが正の電荷を持ちます。',
    },
  },
  {
    q: {
      en: 'Which particle, proposed by Wolfgang Pauli, has no charge, nearly no mass, and passes right through a star?',
      ja: 'ヴォルフガング・パウリが提案した、電荷がなく質量がほぼなく、星を突き抜ける粒子はどれですか。',
    },
    options: [
      { en: 'Positron', ja: '陽電子' },
      { en: 'Neutrino', ja: 'ニュートリノ' },
      { en: 'Neutron', ja: '中性子' },
      { en: 'Quasar', ja: 'クエーサー' },
    ],
    answer: 1,
    explain: {
      en: 'Neutrinos are chargeless, nearly massless particles that interact so weakly they stream straight out of the Sun.',
      ja: 'ニュートリノは電荷がなくほぼ無質量の粒子で、相互作用が非常に弱く、太陽をまっすぐ抜け出します。',
    },
  },
  {
    q: {
      en: 'What is the approximate temperature at the very center of the Sun’s core?',
      ja: '太陽の核の中心の温度はおよそどれくらいですか。',
    },
    options: [
      { en: '5,800 K', ja: '5,800 K' },
      { en: '1 million K', ja: '100万 K' },
      { en: '15 million K', ja: '1,500万 K' },
      { en: '100 million K', ja: '1億 K' },
    ],
    answer: 2,
    explain: {
      en: 'Models put the Sun’s central temperature at about 15 million K.',
      ja: 'モデルは太陽の中心温度を約1,500万Kと計算します。',
    },
  },
  {
    q: {
      en: 'From about 30% to 70% of the way out from the center, energy moves outward mainly by which process?',
      ja: '中心から外へ約30%から70%の領域では、エネルギーは主にどの過程で外向きに移動しますか。',
    },
    options: [
      { en: 'Convection', ja: '対流' },
      { en: 'Radiation', ja: '放射' },
      { en: 'Conduction', ja: '伝導' },
      { en: 'Magnetic reconnection', ja: '磁気再結合' },
    ],
    answer: 1,
    explain: {
      en: 'In the radiative zone, energy travels outward by radiation — photons repeatedly absorbed and re-emitted.',
      ja: '放射層では、エネルギーは放射で外へ進みます——光子が繰り返し吸収・再放出されます。',
    },
  },
  {
    q: {
      en: 'Because photons are absorbed and re-emitted in random directions, how long does energy take to reach the surface from the core?',
      ja: '光子がランダムな方向に吸収・再放出されるため、エネルギーが核から表面に達するのにどれくらいかかりますか。',
    },
    options: [
      { en: '2.3 seconds', ja: '2.3秒' },
      { en: '8.3 minutes', ja: '8.3分' },
      { en: '100 years', ja: '100年' },
      { en: '100,000 to 1,000,000 years', ja: '10万〜100万年' },
    ],
    answer: 3,
    explain: {
      en: 'Photons take a slow "random walk," needing 100,000 to 1,000,000 years to reach the surface.',
      ja: '光子は遅い「ランダムウォーク」をし、表面に達するのに10万〜100万年かかります。',
    },
  },
  {
    q: {
      en: 'What technique analyzes surface pulsations and sound waves to deduce conditions inside the Sun?',
      ja: '表面の脈動と音波を分析して太陽内部の状態を推定する技術は何ですか。',
    },
    options: [
      { en: 'Spectroscopy', ja: '分光法' },
      { en: 'Helioseismology', ja: '日震学' },
      { en: 'Interferometry', ja: '干渉法' },
      { en: 'Polarimetry', ja: '偏光測定' },
    ],
    answer: 1,
    explain: {
      en: 'Helioseismology reads surface pulsations driven by interior sound waves to map conditions inside the Sun.',
      ja: '日震学は、内部の音波が生む表面の脈動を読み取り、太陽内部の状態を地図化します。',
    },
  },
  {
    q: {
      en: 'Where did Raymond Davis, Jr. set up his pioneering solar neutrino detector?',
      ja: 'レイモンド・デイビス・ジュニアは、先駆的な太陽ニュートリノ検出器をどこに設置しましたか。',
    },
    options: [
      { en: 'At the summit of Maunakea, Hawaii', ja: 'ハワイのマウナケア山頂' },
      { en: 'In a gold mine 1.5 km underground in South Dakota', ja: 'サウスダコタの地下1.5 kmの金鉱' },
      { en: 'On board the Hubble Space Telescope', ja: 'ハッブル宇宙望遠鏡の中' },
      { en: 'In an Antarctic ice station', ja: '南極の氷上基地' },
    ],
    answer: 1,
    explain: {
      en: 'Davis built his tank of cleaning fluid in the Homestake gold mine, 1.5 km underground in South Dakota.',
      ja: 'デイビスは洗浄液のタンクを、サウスダコタの地下1.5 kmのホームステーク金鉱に設置しました。',
    },
  },
  {
    q: {
      en: 'What is the balance called where a star’s outward gas pressure exactly offsets the inward pull of gravity?',
      ja: '星の外向きのガス圧が内向きの重力とちょうど釣り合う状態は何と呼ばれますか。',
    },
    options: [
      { en: 'Thermal convection', ja: '熱対流' },
      { en: 'Hydrostatic equilibrium', ja: '静水圧平衡' },
      { en: 'Differential rotation', ja: '差動回転' },
      { en: 'Radiative opacity', ja: '放射不透明度' },
    ],
    answer: 1,
    explain: {
      en: 'Hydrostatic equilibrium is the balance between outward pressure and inward gravity that holds a star steady.',
      ja: '静水圧平衡は、外向きの圧力と内向きの重力の釣り合いで、星を安定に保ちます。',
    },
  },
];

const medium = [
  {
    q: {
      en: 'If the Sun ran on chemical burning (like coal), what contradiction arises with geological evidence?',
      ja: 'もし太陽が（石炭のような）化学燃焼で動いていたら、地質学的証拠とどんな矛盾が生じますか。',
    },
    options: [
      { en: 'It would make too many neutrinos for the atmosphere to survive.', ja: '大気が耐えられないほど多くのニュートリノを作る。' },
      { en: 'Chemical burning could last only a few thousand years, far short of Earth’s 4.5-billion-year age.', ja: '化学燃焼は数千年しか持たず、地球の45億年の年齢にはるかに及ばない。' },
      { en: 'It would expand beyond the orbit of Mars.', ja: '火星の軌道の外まで膨張してしまう。' },
      { en: 'It would emit only ultraviolet light.', ja: '紫外線しか出さなくなる。' },
    ],
    answer: 1,
    explain: {
      en: 'Chemical energy is far too weak — it could power the Sun for only thousands of years, but Earth is 4.5 billion years old.',
      ja: '化学エネルギーは弱すぎて、太陽を数千年しか支えられませんが、地球は45億年前からあります。',
    },
  },
  {
    q: {
      en: 'Why must the core exceed 12–15 million K before hydrogen fusion can happen?',
      ja: '水素融合が起こる前に、核が1,200万〜1,500万Kを超えなければならないのはなぜですか。',
    },
    options: [
      { en: 'High temperatures convert photons into electrons.', ja: '高温が光子を電子に変えるから。' },
      { en: 'Protons repel each other, so extreme thermal speeds are needed to overcome that repulsion and let the strong force bind them.', ja: '陽子は反発し合うので、その反発を克服し強い核力で結びつけるには極端な熱運動速度が必要だから。' },
      { en: 'Heat melts the solid ice crust around the core.', ja: '熱が核を囲む固い氷の殻を溶かすから。' },
      { en: 'Low temperatures make neutrinos absorb all protons.', ja: '低温だとニュートリノがすべての陽子を吸収するから。' },
    ],
    answer: 1,
    explain: {
      en: 'Protons are positively charged and repel; only at 12–15 million K are they fast enough to get close enough for the strong force to fuse them.',
      ja: '陽子は正電荷で反発します。1,200万〜1,500万Kで初めて十分速くなり、強い核力が融合させられる距離まで近づけます。',
    },
  },
  {
    q: {
      en: 'Why was Davis’s neutrino detector placed 1.5 km underground?',
      ja: 'デイビスのニュートリノ検出器が地下1.5 kmに置かれたのはなぜですか。',
    },
    options: [
      { en: 'To keep the fluid frozen at absolute zero.', ja: '液体を絶対零度で凍らせるため。' },
      { en: 'To shield it from cosmic rays that would create false argon signals.', ja: '偽のアルゴン信号を作る宇宙線から遮蔽するため。' },
      { en: 'To place the tank closer to Earth’s core for more gravity.', ja: 'タンクを地球の核に近づけて重力を増すため。' },
      { en: 'Because neutrinos only travel through solid rock.', ja: 'ニュートリノは固い岩の中しか進めないから。' },
    ],
    answer: 1,
    explain: {
      en: 'Kilometers of rock block cosmic rays that would otherwise create false argon atoms; neutrinos pass through easily.',
      ja: '何kmもの岩が、偽のアルゴン原子を作る宇宙線を遮ります。ニュートリノは難なく通り抜けます。',
    },
  },
  {
    q: {
      en: 'Why do neutrinos reach Earth in ~8 minutes while photons from the same reactions take hundreds of thousands of years to leave the Sun?',
      ja: '同じ反応から生じるニュートリノは約8分で地球に届くのに、光子が太陽を出るのに何十万年もかかるのはなぜですか。',
    },
    options: [
      { en: 'Photons travel much slower than light inside a star.', ja: '光子は星の中で光よりずっと遅く進むから。' },
      { en: 'Neutrinos are negative and pulled out by magnetic fields.', ja: 'ニュートリノは負電荷で磁場に引き出されるから。' },
      { en: 'Matter is nearly transparent to neutrinos, so they escape at light speed, while photons do a slow random walk of absorption and re-emission.', ja: '物質はニュートリノにほぼ透明なので光速で脱出するが、光子は吸収と再放出の遅いランダムウォークをするから。' },
      { en: 'Neutrinos are far more massive, so they move faster.', ja: 'ニュートリノははるかに重いので速く動くから。' },
    ],
    answer: 2,
    explain: {
      en: 'Neutrinos barely interact, so they fly straight out at light speed; photons scatter endlessly, taking ages to reach the surface.',
      ja: 'ニュートリノはほとんど相互作用せず光速で直進しますが、光子は延々と散乱し、表面に達するまで長い時間がかかります。',
    },
  },
  {
    q: {
      en: 'What was the "solar neutrino problem," and how was it resolved?',
      ja: '「太陽ニュートリノ問題」とは何で、どう解決されましたか。',
    },
    options: [
      { en: 'Zero neutrinos were detected; resolved by realizing the Sun had turned off.', ja: 'ニュートリノがゼロだった；太陽が止まったと気づいて解決。' },
      { en: 'Only 1/3–1/2 the predicted electron neutrinos were seen; resolved by finding neutrinos "oscillate" into muon and tau types on the way to Earth.', ja: '予測の1/3〜1/2の電子ニュートリノしか見えなかった；地球への途中でニュートリノがミュー型・タウ型に「振動」すると判明して解決。' },
      { en: 'Too many neutrinos were seen; resolved by recalibrating surface temperature.', ja: '多すぎた；表面温度の再校正で解決。' },
      { en: 'Neutrinos were absorbed by cosmic dust; resolved by space detectors.', ja: '宇宙塵に吸収された；宇宙の検出器で解決。' },
    ],
    answer: 1,
    explain: {
      en: 'Detectors saw only a third to a half of the predicted electron neutrinos because neutrinos oscillate into other flavors en route — which also proved they have a tiny mass.',
      ja: '検出器は予測の1/3〜1/2の電子ニュートリノしか見ませんでした。途中で他の型に振動するためで、これはニュートリノにわずかな質量があることも証明しました。',
    },
  },
];

const hard = [
  {
    q: {
      en: 'How does E = mc² explain a star shining for billions of years while losing only a tiny fraction of its mass?',
      ja: 'E = mc² は、星が質量のごくわずかしか失わずに何十億年も輝くことをどう説明しますか。',
    },
    options: [
      { en: 'c² is so vast (9×10¹⁶ m²/s²) that converting a small mass releases immense energy.', ja: 'c²が非常に大きい（9×10¹⁶ m²/s²）ため、わずかな質量の変換で膨大なエネルギーが出るから。' },
      { en: 'It proves mass increases as energy is released.', ja: 'エネルギー放出とともに質量が増えると証明するから。' },
      { en: 'Gravity continuously turns kinetic energy back into mass.', ja: '重力が運動エネルギーを絶えず質量に戻すから。' },
      { en: 'Energy is recycled in the core with no net mass loss.', ja: '核でエネルギーが再利用され、正味の質量損失がないから。' },
    ],
    answer: 0,
    explain: {
      en: 'Because c² is enormous, even converting 0.71% of hydrogen’s mass yields enough energy to power the Sun for over 10 billion years.',
      ja: 'c²が巨大なので、水素の質量の0.71%を変換するだけでも、太陽を100億年以上支えるエネルギーになります。',
    },
  },
  {
    q: {
      en: 'What happens in Step 1 of the proton-proton chain when two protons fuse?',
      ja: '陽子-陽子連鎖のステップ1で、2つの陽子が融合すると何が起きますか。',
    },
    options: [
      { en: 'They form a helium-4 nucleus and emit an electron.', ja: 'ヘリウム4核を作り電子を放出する。' },
      { en: 'They form a deuterium nucleus (a proton + a neutron), releasing a positron and a neutrino.', ja: '重水素核（陽子＋中性子）を作り、陽電子とニュートリノを放出する。' },
      { en: 'They split into three neutrons and release an X-ray.', ja: '3つの中性子に分かれX線を放出する。' },
      { en: 'They combine with carbon to start the CNO cycle.', ja: '炭素と結合してCNOサイクルを始める。' },
    ],
    answer: 1,
    explain: {
      en: 'Two protons fuse into deuterium (one proton turns into a neutron), emitting a positron and a neutrino.',
      ja: '2つの陽子が重水素に融合し（1つの陽子が中性子に変わる）、陽電子とニュートリノを放出します。',
    },
  },
  {
    q: {
      en: 'How does helioseismology let us inspect structures beneath sunspots and even map the Sun’s far side?',
      ja: '日震学は、黒点の下の構造を調べ、太陽の裏側まで地図化することをどう可能にしますか。',
    },
    options: [
      { en: 'Sound waves reflected off sub-surface structures cause surface Doppler shifts that computers reconstruct into 3D interior maps.', ja: '地下構造で反射した音波が表面のドップラー偏移を生み、計算機がそれを内部の3次元地図に再構成する。' },
      { en: 'Sound waves heat sunspots so they glow in radio waves.', ja: '音波が黒点を熱し、電波で光らせる。' },
      { en: 'Far-side photons are bent to the front by acoustic refraction.', ja: '裏側の光子が音響屈折で表側へ曲げられる。' },
      { en: 'Seismometers left on the Sun transmit shock readings.', ja: '太陽に置かれた地震計が衝撃の読みを送信する。' },
    ],
    answer: 0,
    explain: {
      en: 'Interior sound waves alter surface motions; measuring those Doppler shifts lets computers reconstruct 3D maps of the interior and far side.',
      ja: '内部の音波が表面の動きを変え、そのドップラー偏移を測ることで、計算機が内部と裏側の3次元地図を再構成します。',
    },
  },
  {
    q: {
      en: 'How do astronomers build theoretical models of the Sun’s interior, which cannot be seen directly?',
      ja: '直接見ることのできない太陽内部の理論モデルを、天文学者はどう構築しますか。',
    },
    options: [
      { en: 'By guessing the density until the Sun turns red.', ja: '太陽が赤くなるまで密度を推測して。' },
      { en: 'By applying physical laws (hydrostatic equilibrium, energy transport, gas laws, fusion rates) in computer models and matching surface observations, helioseismology, and neutrino counts.', ja: '物理法則（静水圧平衡・エネルギー輸送・気体の法則・核融合率）を計算機モデルに適用し、表面観測・日震学・ニュートリノ数と合わせて。' },
      { en: 'By drilling into meteorites from the solar core.', ja: '太陽の核由来の隕石を掘って。' },
      { en: 'By measuring nearby white dwarfs’ magnetic fields.', ja: '近くの白色矮星の磁場を測って。' },
    ],
    answer: 1,
    explain: {
      en: 'Models combine fundamental physics with observational constraints — surface data, helioseismology, and neutrino counts — refined by computer until they match.',
      ja: 'モデルは基礎物理と観測的制約——表面データ・日震学・ニュートリノ数——を組み合わせ、一致するまで計算機で調整します。',
    },
  },
  {
    q: {
      en: 'What is the key physical difference between nuclear fusion and nuclear fission?',
      ja: '核融合と核分裂の重要な物理的違いは何ですか。',
    },
    options: [
      { en: 'Fusion splits heavy nuclei; fission combines light nuclei.', ja: '融合は重い核を分裂させ、分裂は軽い核を結合する。' },
      { en: 'Fusion combines light nuclei into heavier ones (releasing energy for light elements); fission splits heavy nuclei into lighter ones.', ja: '融合は軽い核を重い核に結合し（軽元素でエネルギー放出）、分裂は重い核を軽い核に分ける。' },
      { en: 'Fusion works only at absolute zero; fission needs millions of K.', ja: '融合は絶対零度でのみ働き、分裂は数百万Kが要る。' },
      { en: 'Fusion releases energy with no mass change; fission makes mass from energy.', ja: '融合は質量変化なしにエネルギーを放出し、分裂はエネルギーから質量を作る。' },
    ],
    answer: 1,
    explain: {
      en: 'Fusion joins light nuclei into heavier ones (the Sun’s power source); fission splits heavy nuclei into lighter ones.',
      ja: '融合は軽い核を重い核に結合し（太陽の動力源）、分裂は重い核を軽い核に分けます。',
    },
  },
];

export default { easy, medium, hard };
