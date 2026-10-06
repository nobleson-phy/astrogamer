/* ============================================================
   STATION 8 — THE HABITABLE ZONE
   The HABITABLE ZONE is the band of distances from a star where surface
   temperatures could allow liquid water. But being in the zone is not
   enough: a planet's actual surface temperature depends heavily on its
   atmosphere and greenhouse effect. Venus sits near the inner edge of the
   Sun's habitable zone, yet a runaway greenhouse made it a 460 °C inferno —
   so a rocky planet in the habitable zone is not guaranteed to be habitable.
   Grounded in Ch.21 §21.5.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The habitable zone",
    kind: "Room for water — if the air cooperates",
    lede: "Slide a planet in and out of the green zone where water could be liquid. Then switch its atmosphere — and watch a 'habitable' world turn into an inferno.",
    thread: "THE STORY ENDS HERE",
    threadText: "We search for worlds at the right distance for liquid water. But distance is only half the story — the air a planet wears decides whether it's an ocean world or a furnace.",
    key: "THE RIGHT DISTANCE ISN'T ENOUGH — ATMOSPHERE DECIDES",
    keyText: "The HABITABLE ZONE is the range of distances from a star where a planet's surface temperature could permit liquid water. But sitting in the zone does not guarantee habitability. A planet's actual surface temperature depends strongly on its atmosphere and the strength of its greenhouse effect. Venus orbits near the inner edge of the Sun's habitable zone, yet its thick carbon-dioxide atmosphere drove a runaway greenhouse that heats its surface to about 460 °C. So finding a rocky planet in the habitable zone is only a first step; its air can still make it uninhabitable.",
    dist: "Planet distance", atm: "Atmosphere",
    hz: "habitable zone (liquid water possible)", hot: "too hot", cold: "too cold", ok: "in the zone",
    thin: "thin (Earth-like)", thick: "thick CO₂ (runaway greenhouse)",
    temperate: "temperate — water can be liquid", inferno: "runaway greenhouse → inferno (like Venus)",
    note: "The habitable zone is the distance band where liquid water is possible — but a planet's atmosphere and greenhouse decide its real temperature. Venus, in the zone, is an inferno.",
  },
  ja: {
    title: "ハビタブルゾーン",
    kind: "水の余地——空気が協力すれば",
    lede: "水が液体でいられる緑の帯の内外に惑星をスライドさせよう。それから大気を切り替え——「居住可能な」世界が灼熱地獄に変わる様子を見よう。",
    thread: "物語はここで終わる",
    threadText: "私たちは液体の水にちょうど良い距離の世界を探します。でも距離は話の半分にすぎません——惑星がまとう空気が、海の世界か炉かを決めます。",
    key: "適切な距離では足りない——大気が決める",
    keyText: "ハビタブルゾーンは、惑星の表面温度が液体の水を許しうる、星からの距離の範囲です。しかしゾーンにいても居住可能性は保証されません。惑星の実際の表面温度は、その大気と温室効果の強さに大きく依存します。金星は太陽のハビタブルゾーンの内縁近くを回りますが、その厚い二酸化炭素の大気が暴走温室効果を起こし、表面を約460℃に熱します。だからハビタブルゾーンに岩石惑星を見つけるのは最初の一歩にすぎません。その空気が、なお居住不能にしうるのです。",
    dist: "惑星の距離", atm: "大気",
    hz: "ハビタブルゾーン（液体の水が可能）", hot: "熱すぎる", cold: "冷たすぎる", ok: "ゾーン内",
    thin: "薄い（地球型）", thick: "厚いCO₂（暴走温室効果）",
    temperate: "温暖——水が液体でいられる", inferno: "暴走温室効果 → 灼熱（金星のよう）",
    note: "ハビタブルゾーンは液体の水が可能な距離の帯——でも惑星の大気と温室効果が実際の温度を決めます。ゾーン内の金星は灼熱です。",
  },
};

function draw(ctx, cw, H, d, thick, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const sx = 40, sy = H * 0.44;
  // star
  const g = ctx.createRadialGradient(sx, sy, 2, sx, sy, 26); g.addColorStop(0, "#fff2c0"); g.addColorStop(1, "rgba(255,180,60,0)");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sx, sy, 26, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffd86b"; ctx.beginPath(); ctx.arc(sx, sy, 10, 0, Math.PI * 2); ctx.fill();
  // distance axis, HZ band 0.9..1.5 (of a 0.3..3 range)
  const x0 = 70, x1 = cw - 20;
  const dx = (dd) => x0 + (dd - 0.3) / (3 - 0.3) * (x1 - x0);
  // too-hot (red) / HZ (green) / too-cold (blue) bands
  ctx.fillStyle = "rgba(255,90,70,0.12)"; ctx.fillRect(x0, sy - 30, dx(0.9) - x0, 60);
  ctx.fillStyle = "rgba(100,220,140,0.16)"; ctx.fillRect(dx(0.9), sy - 30, dx(1.5) - dx(0.9), 60);
  ctx.fillStyle = "rgba(100,150,255,0.12)"; ctx.fillRect(dx(1.5), sy - 30, x1 - dx(1.5), 60);
  ctx.fillStyle = "#8fe0a0"; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.hz, (dx(0.9) + dx(1.5)) / 2, sy - 36);
  // planet
  const px = dx(d);
  const inHZ = d >= 0.9 && d <= 1.5;
  const pc = (inHZ && !thick) ? "#5b8fd8" : (inHZ && thick) ? "#e0b06a" : d < 0.9 ? "#e0774f" : "#8fb8e8";
  ctx.fillStyle = pc; ctx.beginPath(); ctx.arc(px, sy, 9, 0, Math.PI * 2); ctx.fill();
  if (thick) { ctx.strokeStyle = "rgba(255,180,100,0.7)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(px, sy, 13, 0, Math.PI * 2); ctx.stroke(); }
  // status
  let status, col;
  if (!inHZ) { status = d < 0.9 ? t.hot : t.cold; col = C.bad; }
  else if (thick) { status = t.inferno; col = C.bad; }
  else { status = t.temperate; col = C.good; }
  ctx.fillStyle = col; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(status, cw / 2, H - 12);
}

export function HabitableZone() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 230;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [d, setD] = useState(1.1);
  const [thick, setThick] = useState(false);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, d, thick, lang);
  }, [cw, d, thick, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 08</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{t.threadText}</p>
        </div>
        <div style={styles.fateBox}>
          <div style={{ ...styles.fateLabel, color: C.sun }}>{t.key}</div>
          <p style={styles.keyTermText}>{t.keyText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.dist}</span>
          <input type="range" min="0.3" max="3" step="0.05" value={d}
            onChange={(e) => setD(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
          <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, width: 48, textAlign: "right" }}>{d.toFixed(2)}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: C.cool }}>{t.atm}:</span>
          {[[false, t.thin], [true, t.thick]].map(([v, label]) => (
            <button key={String(v)} onClick={() => setThick(v)}
              style={{ ...styles.chip, ...(thick === v ? styles.chipOn : {}), fontSize: 11 }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 4 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default HabitableZone;
