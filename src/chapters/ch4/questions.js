const easy = [
  {
    q: {
      en: 'Which coordinate system uses degrees of arc along the equator to measure the east-west location of a place on Earth?',
      ja: '地球上の場所の東西方向の位置を、赤道に沿った角度（度）で測る座標系はどれですか。',
    },
    options: [
      { en: 'Latitude', ja: '緯度' },
      { en: 'Declination', ja: '赤緯' },
      { en: 'Longitude', ja: '経度' },
      { en: 'Right Ascension', ja: '赤経' },
    ],
    answer: 2,
    explain: {
      en: 'Longitude measures the east-west position of a place in degrees of arc along the equator.',
      ja: '経度は、赤道に沿った角度で場所の東西方向の位置を測るものです。',
    },
  },
  {
    q: {
      en: 'What celestial coordinate is analogous to latitude and measures the angular distance north or south of the celestial equator?',
      ja: '緯度に相当し、天の赤道からの南北方向の角距離を測る天球座標はどれですか。',
    },
    options: [
      { en: 'Right Ascension', ja: '赤経' },
      { en: 'Declination', ja: '赤緯' },
      { en: 'Longitude', ja: '経度' },
      { en: 'Zenith', ja: '天頂' },
    ],
    answer: 1,
    explain: {
      en: 'Declination is like latitude on the sky, measuring angular distance north or south of the celestial equator.',
      ja: '赤緯は天球上の緯度にあたり、天の赤道からの南北方向の角距離を測ります。',
    },
  },
  {
    q: {
      en: 'In 1851, which physicist provided an unambiguous demonstration that Earth rotates on its axis using a large swinging weight?',
      ja: '1851年に、大きく振れるおもりを使って地球が自転していることを明確に示した物理学者は誰ですか。',
    },
    options: [
      { en: 'Galileo Galilei', ja: 'ガリレオ・ガリレイ' },
      { en: 'Jean Foucault', ja: 'ジャン・フーコー' },
      { en: 'Isaac Newton', ja: 'アイザック・ニュートン' },
      { en: 'Johannes Kepler', ja: 'ヨハネス・ケプラー' },
    ],
    answer: 1,
    explain: {
      en: 'Jean Foucault used a large swinging pendulum in 1851 to demonstrate Earth’s rotation.',
      ja: 'ジャン・フーコーは1851年に大きな振り子を用いて地球の自転を実証しました。',
    },
  },
  {
    q: {
      en: 'The seasons on Earth are primarily caused by what astronomical factor?',
      ja: '地球の四季は、主にどの天文学的な要因によって生じますか。',
    },
    options: [
      { en: 'The distance between Earth and the Sun', ja: '地球と太陽の間の距離' },
      { en: 'The rotation speed of Earth', ja: '地球の自転速度' },
      { en: 'The 23.5° tilt of Earth’s axis', ja: '地球の地軸の23.5度の傾き' },
      { en: 'The eccentricity of Earth’s orbit', ja: '地球の公転軌道の離心率' },
    ],
    answer: 2,
    explain: {
      en: 'Seasons arise mainly because Earth’s axis is tilted about 23.5° relative to its orbit.',
      ja: '四季は主に、地球の地軸が公転面に対して約23.5度傾いていることによって生じます。',
    },
  },
  {
    q: {
      en: 'On which approximate date is the Sun directly overhead at noon for observers on the Tropic of Cancer in the Northern Hemisphere?',
      ja: '北半球の北回帰線上の観測者にとって、正午に太陽が真上に来るのはおよそ何月何日ですか。',
    },
    options: [
      { en: 'March 21', ja: '3月21日' },
      { en: 'June 21', ja: '6月21日' },
      { en: 'September 21', ja: '9月21日' },
      { en: 'December 21', ja: '12月21日' },
    ],
    answer: 1,
    explain: {
      en: 'At the June solstice, around June 21, the Sun is directly overhead at noon on the Tropic of Cancer.',
      ja: '6月の夏至（およそ6月21日）に、太陽は正午に北回帰線の真上に来ます。',
    },
  },
  {
    q: {
      en: 'How much longer is a mean solar day compared to a sidereal day?',
      ja: '平均太陽日は恒星日よりもどれくらい長いですか。',
    },
    options: [
      { en: '4 seconds', ja: '4秒' },
      { en: '4 minutes', ja: '4分' },
      { en: '1 hour', ja: '1時間' },
      { en: '12 hours', ja: '12時間' },
    ],
    answer: 1,
    explain: {
      en: 'A mean solar day is about 4 minutes longer than a sidereal day.',
      ja: '平均太陽日は恒星日よりも約4分長くなります。',
    },
  },
  {
    q: {
      en: 'How many standardized global time zones were adopted by most of the world by the year 1900?',
      ja: '1900年までに世界の大部分で採用された標準化された時間帯（タイムゾーン）はいくつですか。',
    },
    options: [
      { en: '12', ja: '12' },
      { en: '24', ja: '24' },
      { en: '60', ja: '60' },
      { en: '360', ja: '360' },
    ],
    answer: 1,
    explain: {
      en: 'By 1900, most of the world had adopted 24 standard time zones, one for each hour.',
      ja: '1900年までに、世界の大部分が1時間ごとに1つ、計24の標準時間帯を採用しました。',
    },
  },
  {
    q: {
      en: 'Which arbitrary line in the Pacific Ocean serves as the point where the calendar date is changed by one day?',
      ja: '太平洋上にあり、暦の日付を1日変更する境界となる、人為的に定められた線はどれですか。',
    },
    options: [
      { en: 'Prime Meridian', ja: '本初子午線' },
      { en: 'Equator', ja: '赤道' },
      { en: 'International Date Line', ja: '日付変更線' },
      { en: 'Tropic of Capricorn', ja: '南回帰線' },
    ],
    answer: 2,
    explain: {
      en: 'The International Date Line in the Pacific is where the calendar date changes by one day.',
      ja: '太平洋上の日付変更線は、暦の日付が1日変わる境界です。',
    },
  },
  {
    q: {
      en: 'Which calendar, introduced by Julius Caesar, approximated the year at 365.25 days and used a leap year every four years?',
      ja: 'ユリウス・カエサルによって導入され、1年を365.25日と近似し、4年ごとに閏年を設けた暦はどれですか。',
    },
    options: [
      { en: 'Gregorian calendar', ja: 'グレゴリオ暦' },
      { en: 'Julian calendar', ja: 'ユリウス暦' },
      { en: 'Mayan calendar', ja: 'マヤ暦' },
      { en: 'Islamic calendar', ja: 'イスラム暦' },
    ],
    answer: 1,
    explain: {
      en: 'The Julian calendar, introduced by Julius Caesar, set the year at 365.25 days with a leap year every four years.',
      ja: 'ユリウス・カエサルが導入したユリウス暦は、1年を365.25日とし、4年ごとに閏年を置きました。',
    },
  },
  {
    q: {
      en: 'In the Gregorian calendar, which century years are considered leap years?',
      ja: 'グレゴリオ暦では、どの世紀年（下2桁が00の年）が閏年とされますか。',
    },
    options: [
      { en: 'All century years', ja: 'すべての世紀年' },
      { en: 'Only century years divisible by 400', ja: '400で割り切れる世紀年のみ' },
      { en: 'No century years', ja: 'いずれの世紀年も閏年でない' },
      { en: 'Only century years divisible by 100', ja: '100で割り切れる世紀年のみ' },
    ],
    answer: 1,
    explain: {
      en: 'In the Gregorian calendar, a century year is a leap year only if it is divisible by 400.',
      ja: 'グレゴリオ暦では、世紀年は400で割り切れる場合にのみ閏年となります。',
    },
  },
  {
    q: {
      en: 'The changing appearances of the Moon as it is illuminated differently by the Sun are called:',
      ja: '太陽による照らされ方が変わることで生じる、月の見かけの変化を何と呼びますか。',
    },
    options: [
      { en: 'Eclipses', ja: '食' },
      { en: 'Phases', ja: '満ち欠け（位相）' },
      { en: 'Tides', ja: '潮汐' },
      { en: 'Precessions', ja: '歳差' },
    ],
    answer: 1,
    explain: {
      en: 'The Moon’s changing illuminated appearance as seen from Earth is called its phases.',
      ja: '地球から見た月の照らされ方の変化を、月の満ち欠け（位相）と呼びます。',
    },
  },
  {
    q: {
      en: 'During which lunar phase is the Moon located in the same general direction as the Sun and invisible from Earth?',
      ja: '月が太陽とほぼ同じ方向にあり、地球から見えないのはどの月相のときですか。',
    },
    options: [
      { en: 'New moon', ja: '新月' },
      { en: 'Full moon', ja: '満月' },
      { en: 'First quarter', ja: '上弦の月' },
      { en: 'Third quarter', ja: '下弦の月' },
    ],
    answer: 0,
    explain: {
      en: 'At new moon the Moon lies in nearly the same direction as the Sun and cannot be seen.',
      ja: '新月のとき、月は太陽とほぼ同じ方向にあり、見ることができません。',
    },
  },
  {
    q: {
      en: 'What term describes the fact that the Moon rotates on its axis in the same time it takes to revolve around Earth?',
      ja: '月が地球を公転するのと同じ時間で自転している事実を表す用語はどれですか。',
    },
    options: [
      { en: 'Retrograde rotation', ja: '逆行自転' },
      { en: 'Synchronous rotation', ja: '同期自転' },
      { en: 'Differential rotation', ja: '差動回転' },
      { en: 'Precessional rotation', ja: '歳差回転' },
    ],
    answer: 1,
    explain: {
      en: 'Synchronous rotation means the Moon’s spin period equals its orbital period, so it keeps the same face toward Earth.',
      ja: '同期自転とは、月の自転周期と公転周期が等しいことで、常に同じ面を地球に向けています。',
    },
  },
  {
    q: {
      en: 'What are the tides called that occur at new or full moon when the Sun and Moon’s pulls reinforce each other?',
      ja: '新月や満月のときに、太陽と月の引力が互いに強め合って生じる潮汐を何と呼びますか。',
    },
    options: [
      { en: 'Neap tides', ja: '小潮' },
      { en: 'Spring tides', ja: '大潮' },
      { en: 'Ebb tides', ja: '引き潮' },
      { en: 'Flood tides', ja: '上げ潮' },
    ],
    answer: 1,
    explain: {
      en: 'Spring tides occur at new and full moon, when the Sun and Moon pull in line and reinforce each other.',
      ja: '大潮は新月と満月のときに起こり、太陽と月の引力が一直線に並んで強め合います。',
    },
  },
  {
    q: {
      en: 'The darkest part of a shadow cast by an astronomical body, within which a total eclipse can be seen, is the:',
      ja: '天体が作る影のうち最も暗い部分で、その中では皆既食が見られる領域を何と呼びますか。',
    },
    options: [
      { en: 'Penumbra', ja: '半影' },
      { en: 'Umbra', ja: '本影' },
      { en: 'Ecliptic', ja: '黄道' },
      { en: 'Corona', ja: 'コロナ' },
    ],
    answer: 1,
    explain: {
      en: 'The umbra is the darkest part of the shadow, and only within it can a total eclipse be seen.',
      ja: '本影は影の最も暗い部分で、その中でのみ皆既食を見ることができます。',
    },
  },
];

const medium = [
  {
    q: {
      en: 'Why is the Northern Hemisphere warmer in June despite Earth being at a greater distance from the Sun than in January?',
      ja: '1月よりも地球が太陽から遠い位置にあるにもかかわらず、6月に北半球が暖かくなるのはなぜですか。',
    },
    options: [
      { en: 'The Sun produces more energy in the summer months.', ja: '夏の間、太陽がより多くのエネルギーを放出するから。' },
      { en: 'The Sun’s rays hit more directly and for a longer period of time due to the axial tilt.', ja: '地軸の傾きにより、太陽光がより直接的に、かつ長い時間当たるから。' },
      { en: 'Earth rotates more slowly in the summer, allowing for more heating.', ja: '夏は地球の自転が遅くなり、より多く熱せられるから。' },
      { en: 'The Moon reflects more heat toward Earth during the summer.', ja: '夏には月がより多くの熱を地球へ反射するから。' },
    ],
    answer: 1,
    explain: {
      en: 'The axial tilt makes sunlight strike the summer hemisphere more directly and for longer days, causing warmth.',
      ja: '地軸の傾きにより、夏の半球では太陽光がより直接的に、かつ長い昼間にわたって当たるため暖かくなります。',
    },
  },
  {
    q: {
      en: 'If Earth’s axial tilt were reduced from 23.5° to only 5°, what logical outcome would occur for the seasons?',
      ja: 'もし地球の地軸の傾きが23.5度からわずか5度に減少したら、四季にはどのような結果が論理的に起こりますか。',
    },
    options: [
      { en: 'Summer would be much hotter and winter much colder.', ja: '夏はずっと暑く、冬はずっと寒くなる。' },
      { en: 'The seasonal changes would be far less extreme.', ja: '季節の変化がはるかに小さくなる。' },
      { en: 'The seasons would happen twice as fast.', ja: '季節が2倍の速さで移り変わる。' },
      { en: 'There would be no sunlight at the equator.', ja: '赤道には日光が当たらなくなる。' },
    ],
    answer: 1,
    explain: {
      en: 'A smaller tilt means less variation in the directness of sunlight, so seasonal changes would be much milder.',
      ja: '傾きが小さいほど太陽光の当たり方の差が小さくなるため、季節の変化ははるかに穏やかになります。',
    },
  },
  {
    q: {
      en: 'What reason explains why a solar day is slightly longer than a sidereal day?',
      ja: '太陽日が恒星日よりわずかに長いのは、どのような理由によりますか。',
    },
    options: [
      { en: 'Earth’s rotation speed is gradually slowing down.', ja: '地球の自転速度が次第に遅くなっているから。' },
      { en: 'The Moon’s gravity drags Earth backward every day.', ja: '月の重力が毎日地球を後ろへ引き戻すから。' },
      { en: 'Earth moves along its orbit while rotating, requiring a bit more than one full turn to face the Sun again.', ja: '地球は自転しながら公転もしているため、再び太陽を向くには1回転よりわずかに多く回る必要があるから。' },
      { en: 'Sidereal time is based on the Moon, which orbits faster than Earth.', ja: '恒星時は地球より速く公転する月を基準にしているから。' },
    ],
    answer: 2,
    explain: {
      en: 'Because Earth advances along its orbit each day, it must rotate a little more than 360° to point at the Sun again.',
      ja: '地球は毎日公転軌道上を進むため、再び太陽を向くには360度よりわずかに多く自転する必要があります。',
    },
  },
  {
    q: {
      en: 'Why does the Moon appear to move about 12° (roughly its own width every hour) eastward against the stars each day?',
      ja: '月が毎日、星々に対して東へ約12度（1時間あたりおよそ月の視直径分）動いて見えるのはなぜですか。',
    },
    options: [
      { en: 'Earth is spinning eastward very rapidly.', ja: '地球が東向きに非常に速く自転しているから。' },
      { en: 'The Moon is physically revolving around the Earth once a month.', ja: '月が実際に約1か月で地球の周りを1周公転しているから。' },
      { en: 'The background stars are moving westward.', ja: '背景の星々が西へ動いているから。' },
      { en: 'The Sun is pushing the Moon along the ecliptic.', ja: '太陽が月を黄道に沿って押し進めているから。' },
    ],
    answer: 1,
    explain: {
      en: 'The Moon’s eastward drift against the stars reflects its real orbital motion around Earth, completed in about a month.',
      ja: '月が星々に対して東へ移動して見えるのは、約1か月で地球を1周する実際の公転運動を反映しています。',
    },
  },
  {
    q: {
      en: 'Why are total solar eclipses seen for only a few minutes from any specific point on Earth’s surface?',
      ja: '地表の特定の地点で皆既日食が見られるのが、わずか数分だけなのはなぜですか。',
    },
    options: [
      { en: 'The Moon is moving too slowly in its orbit.', ja: '月の公転運動が遅すぎるから。' },
      { en: 'The Sun is moving away from the Moon.', ja: '太陽が月から遠ざかっているから。' },
      { en: 'The Moon’s small shadow tip sweeps rapidly across the surface at 1500 kilometers per hour.', ja: '月の小さな影の先端が、時速1500キロメートルで地表を高速に移動するから。' },
      { en: 'Earth’s atmosphere usually blocks the view after a few minutes.', ja: '地球の大気が数分後にたいてい視界をさえぎるから。' },
    ],
    answer: 2,
    explain: {
      en: 'The tip of the Moon’s umbra races across Earth at about 1500 km/h, so totality lasts only minutes at any spot.',
      ja: '月の本影の先端は時速約1500キロメートルで地表を駆け抜けるため、どの地点でも皆既は数分しか続きません。',
    },
  },
];

const hard = [
  {
    q: {
      en: 'Explain why the popular term "dark side of the Moon" is a conceptual misunderstanding.',
      ja: '「月の暗い側（dark side of the Moon）」という一般的な表現が、概念的な誤解である理由を説明してください。',
    },
    options: [
      { en: 'The back side of the Moon has no gravity.', ja: '月の裏側には重力がないから。' },
      { en: 'Every part of the Moon receives sunlight as it rotates; "back side" is a better term.', ja: '月は自転するためすべての部分に日光が当たり、「裏側」と呼ぶ方が適切だから。' },
      { en: 'The Moon does not rotate, so one side is always dark.', ja: '月は自転しないので、片側は常に暗いから。' },
      { en: 'The Sun only shines on the side of the Moon facing Earth.', ja: '太陽は地球に面した側の月しか照らさないから。' },
    ],
    answer: 1,
    explain: {
      en: 'Every part of the Moon is sunlit at some point during its rotation, so the far side is not permanently dark.',
      ja: '月は自転するためすべての部分がいずれ日光を受けるので、裏側が常に暗いわけではありません。',
    },
  },
  {
    q: {
      en: 'How does the "differential force" of the Moon’s gravity result in two tidal bulges on Earth?',
      ja: '月の重力の「差動力（潮汐力）」は、どのようにして地球に2つの潮の膨らみを生じさせますか。',
    },
    options: [
      { en: 'It pulls the water toward the Moon on both sides simultaneously.', ja: '両側の水を同時に月へ向かって引っ張るから。' },
      { en: 'The Sun pulls on one side while the Moon pulls on the other.', ja: '太陽が一方の側を、月がもう一方の側を引くから。' },
      { en: 'Gravity is stronger on the near side and weaker on the far side than at the center, stretching the Earth.', ja: '重力が近い側では中心より強く、遠い側では弱いため、地球が引き伸ばされるから。' },
      { en: 'Centrifugal force from Earth’s orbit pushes the water outward.', ja: '地球の公転による遠心力が水を外向きに押し出すから。' },
    ],
    answer: 2,
    explain: {
      en: 'The Moon pulls the near side more strongly and the far side more weakly than Earth’s center, stretching Earth into two bulges.',
      ja: '月は地球の中心に比べ近い側を強く、遠い側を弱く引くため、地球が引き伸ばされて2つの膨らみができます。',
    },
  },
  {
    q: {
      en: 'Why are total lunar eclipses seen far more frequently from a given location than total solar eclipses?',
      ja: 'ある地点から皆既月食が皆既日食よりもはるかに頻繁に見られるのはなぜですか。',
    },
    options: [
      { en: 'Lunar eclipses happen every month, but solar eclipses only once a year.', ja: '月食は毎月起こるが、日食は年に1回しか起こらないから。' },
      { en: 'The Sun is much larger and harder for the Moon to cover.', ja: '太陽ははるかに大きく、月が覆い隠すのが難しいから。' },
      { en: 'A lunar eclipse is visible from Earth’s entire night hemisphere, while solar eclipses are only seen in a tiny path.', ja: '月食は地球の夜側の半球全体から見えるが、日食はごく狭い帯状の範囲でしか見られないから。' },
      { en: 'Solar eclipses only happen at the North and South Poles.', ja: '日食は北極と南極でしか起こらないから。' },
    ],
    answer: 2,
    explain: {
      en: 'A lunar eclipse is visible to everyone on Earth’s night side, whereas a total solar eclipse is confined to a narrow path.',
      ja: '月食は地球の夜側にいる誰もが見られますが、皆既日食はごく狭い帯状の地域に限られます。',
    },
  },
  {
    q: {
      en: 'In what way does Earth’s atmosphere affect our perception of the Sun’s position near the horizon?',
      ja: '地球の大気は、地平線近くの太陽の位置の見え方にどのような影響を与えますか。',
    },
    options: [
      { en: 'It makes the Sun look smaller and further away.', ja: '太陽をより小さく、より遠くに見せる。' },
      { en: 'Refraction bends sunlight, making the Sun appear to rise earlier and set later than it actually does.', ja: '屈折が太陽光を曲げるため、太陽が実際より早く昇り、遅く沈むように見える。' },
      { en: 'It changes the Sun’s color to blue during the middle of the day.', ja: '日中に太陽の色を青く変える。' },
      { en: 'It prevents the Sun from being seen at the equinoxes.', ja: '分点のときに太陽が見えなくなるようにする。' },
    ],
    answer: 1,
    explain: {
      en: 'Atmospheric refraction bends sunlight near the horizon, so the Sun appears to rise a bit earlier and set a bit later.',
      ja: '地平線近くでは大気の屈折が太陽光を曲げるため、太陽は実際より少し早く昇り、少し遅く沈むように見えます。',
    },
  },
  {
    q: {
      en: 'What is the long-term evolutionary significance of tidal friction in the Earth-Moon system?',
      ja: '地球と月の系における潮汐摩擦の、長期的な進化上の意義は何ですか。',
    },
    options: [
      { en: 'It will eventually pull the Moon into Earth’s atmosphere.', ja: 'やがて月を地球の大気圏へ引き込む。' },
      { en: 'It is gradually slowing Earth’s rotation and causing the Moon to spiral away from Earth.', ja: '地球の自転を次第に遅くし、月を地球から徐々に遠ざけている。' },
      { en: 'It will make the seasons disappear by straightening Earth’s tilt.', ja: '地軸の傾きをまっすぐにして四季を消滅させる。' },
      { en: 'It is increasing Earth’s mass by collecting space dust.', ja: '宇宙塵を集めて地球の質量を増やしている。' },
    ],
    answer: 1,
    explain: {
      en: 'Tidal friction slowly lengthens Earth’s day while transferring angular momentum that makes the Moon recede.',
      ja: '潮汐摩擦は地球の1日を少しずつ長くし、角運動量を移すことで月を徐々に遠ざけています。',
    },
  },
];

export default { easy, medium, hard };
