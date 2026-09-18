/* ============================================================
   STATION 8 — MASS RULES THEIR LIVES
   About 90% of stars lie on the main sequence — because stars spend
   ~90% of their active lives there, stably fusing hydrogen into helium.
   How long that lasts depends steeply on mass: luminosity scales as M⁴,
   so fuel burns as roughly M⁴ while fuel supply scales as M — giving a
   lifetime ∝ 1/M³. Massive stars are dazzling but die fast; low-mass red
   dwarfs sip their fuel for trillions of years. Grounded in Ch.18 §18.4.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Mass rules their lives",
    kind: "Bright and brief, or dim and eternal",
    lede: "Set a star's mass and read its fate. More mass means far more light — but a life burned through astonishingly faster.",
    thread: "THE STORY ENDS HERE",
    threadText: "A star's mass at birth writes its whole biography: how bright it shines, how it looks, and — most dramatically — how long it gets to live.",
    key: "90% ON THE MAIN SEQUENCE; LIFETIME ∝ 1/M³",
    keyText: "About 90% of all true stars lie on the main sequence, because a star spends roughly 90% of its active life there, steadily fusing hydrogen into helium in its core. How long that phase lasts depends sharply on mass. A star's fuel supply grows only in proportion to its mass (M), but its luminosity — the rate it burns that fuel — scales as M⁴. So lifetime ≈ fuel ÷ rate = M / M⁴ = 1/M³. A star ten times the Sun's mass shines about 10,000 times brighter and lives only about 1/1000 as long, while tiny red dwarfs last for trillions of years.",
    mass: "Star mass", lumL: "Luminosity", lifeL: "Main-sequence lifetime",
    ninety: "Main sequence = ~90% of a star's life → ~90% of stars are seen on it",
    note: "~90% of stars sit on the main sequence because that hydrogen-fusing phase is ~90% of a star's life. Luminosity ∝ M⁴ but fuel ∝ M, so lifetime ∝ 1/M³ — massive stars die fast.",
  },
  ja: {
    title: "質量が一生を支配",
    kind: "明るく短命か、暗く永遠か",
    lede: "星の質量を設定して運命を読もう。質量が大きいほど光ははるかに強く——でも一生は驚くほど速く燃え尽きます。",
    thread: "物語はここで終わる",
    threadText: "誕生時の星の質量が、その伝記のすべてを書きます：どれほど明るく輝くか、どう見えるか、そして——最も劇的に——どれだけ生きられるか。",
    key: "90%が主系列に；寿命 ∝ 1/M³",
    keyText: "すべての本物の星のおよそ90%が主系列にあります。星が活動的な生涯のおよそ90%をそこで、核で水素をヘリウムに安定に融合して過ごすからです。その段階がどれだけ続くかは質量に急激に依存します。星の燃料供給は質量（M）に比例して増えるだけですが、光度——燃料を燃やす速さ——はM⁴に比例します。だから寿命 ≈ 燃料 ÷ 速さ = M / M⁴ = 1/M³。太陽の10倍の質量の星は約1万倍明るく、寿命は約1/1000。一方、小さな赤色矮星は数兆年もちます。",
    mass: "星の質量", lumL: "光度", lifeL: "主系列の寿命",
    ninety: "主系列 = 星の一生の約90% → 星の約90%がそこで見える",
    note: "星の約90%が主系列にあるのは、水素を融合するその段階が一生の約90%だから。光度 ∝ M⁴ だが燃料 ∝ M なので寿命 ∝ 1/M³——大質量星は速く死にます。",
  },
};

function draw(ctx, cw, H, M, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const L = Math.pow(M, 4);          // solar luminosities
  const life = 10 / Math.pow(M, 3);  // Gyr (Sun ~10 Gyr)
  // star sized/colored by mass
  const cx = cw * 0.2, cy = H * 0.34, R = 10 + Math.min(M, 20) * 2.2;
  const col = M > 3 ? "#9bb4ff" : M > 1.2 ? "#fff4e8" : "#ff9a52";
  const glow = ctx.createRadialGradient(cx, cy, R * 0.4, cx, cy, R * 1.8); glow.addColorStop(0, col); glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(cx, cy, R * 1.8, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = col; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.faint; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(`${M} M☉`, cx, cy + R * 1.8 + 12);
  // luminosity bar (log)
  const bx = cw * 0.44, bw = cw * 0.48;
  const lumY = H * 0.3;
  ctx.fillStyle = C.text; ctx.font = `11px ${mono}`; ctx.textAlign = "left"; ctx.fillText(t.lumL, bx, lumY - 8);
  ctx.fillStyle = "rgba(120,150,210,0.2)"; ctx.fillRect(bx, lumY, bw, 12);
  const lumFrac = Math.min(Math.log10(L + 1) / Math.log10(160001), 1);
  const lg = ctx.createLinearGradient(bx, 0, bx + bw, 0); lg.addColorStop(0, "#ffcf6b"); lg.addColorStop(1, "#ff8f5a");
  ctx.fillStyle = lg; ctx.fillRect(bx, lumY, Math.max(bw * lumFrac, 3), 12);
  ctx.fillStyle = C.sun; ctx.font = `700 12px ${mono}`; ctx.fillText(`${L >= 1000 ? L.toExponential(1) : L.toFixed(1)} L☉`, bx, lumY + 26);
  // lifetime bar (log, inverse)
  const lifeY = H * 0.62;
  ctx.fillStyle = C.text; ctx.font = `11px ${mono}`; ctx.fillText(t.lifeL, bx, lifeY - 8);
  ctx.fillStyle = "rgba(120,150,210,0.2)"; ctx.fillRect(bx, lifeY, bw, 12);
  const lifeFrac = Math.min(Math.log10(life + 1) / Math.log10(1300), 1);
  ctx.fillStyle = "#8fe0a0"; ctx.fillRect(bx, lifeY, Math.max(bw * lifeFrac, 3), 12);
  ctx.fillStyle = "#8fe0a0"; ctx.font = `700 12px ${mono}`;
  const lifeStr = life >= 1000 ? `${(life / 1000).toFixed(0)} Tyr` : life >= 1 ? `${life.toFixed(1)} Gyr` : `${(life * 1000).toFixed(0)} Myr`;
  ctx.fillText(lifeStr, bx, lifeY + 26);
  // 90% note
  ctx.fillStyle = C.cool; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.ninety, cw / 2, H - 10);
}

export function MainSequenceLives() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [M, setM] = useState(1);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, M, lang);
  }, [cw, M, lang]);

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

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.mass}</span>
          <input type="range" min="0.2" max="20" step="0.2" value={M}
            onChange={(e) => setM(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
          <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, width: 54, textAlign: "right" }}>{M} M☉</span>
        </div>

        <div style={{ marginTop: 4 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default MainSequenceLives;
