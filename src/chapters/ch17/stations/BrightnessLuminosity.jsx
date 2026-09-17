/* ============================================================
   STATION 1 — BRIGHTNESS VS LUMINOSITY
   Luminosity is a star's true, intrinsic power — the total energy it
   emits per second. Apparent brightness is how bright it looks from
   Earth, which drops with the INVERSE SQUARE of distance because the
   light spreads over an ever-bigger sphere. So a star's apparent
   brightness alone can't give its luminosity — you also need its
   distance. Grounded in Ch.17 §17.1.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Brightness vs luminosity",
    kind: "Same star, different distance",
    lede: "Slide the star nearer and farther. Its true power never changes — but how bright it looks plummets, following the inverse-square law.",
    thread: "THE STORY BEGINS",
    threadText: "A candle nearby can outshine a searchlight far away. To rank stars by their real power, we must first undo the trick that distance plays on our eyes.",
    key: "APPARENT BRIGHTNESS FALLS AS 1 / DISTANCE²",
    keyText: "Luminosity is a star's intrinsic power — the total energy it emits every second, no matter where you stand. Apparent brightness is how bright it looks from Earth. As light travels outward it spreads over a sphere whose area grows as the square of the distance, so apparent brightness drops with the INVERSE SQUARE of distance: double the distance and it looks four times fainter. This is why apparent brightness alone can't tell you a star's luminosity — you must also know its distance.",
    distance: "Distance", lumL: "Luminosity (true power)", brightL: "Apparent brightness",
    constant: "unchanged", note: "Luminosity is a star's true power output; apparent brightness is how bright it looks and falls as 1/distance². To get luminosity from brightness, you must know the distance.",
  },
  ja: {
    title: "明るさと光度",
    kind: "同じ星、違う距離",
    lede: "星を近づけたり遠ざけたりしよう。真の出力は変わりません——でも見かけの明るさは、逆二乗の法則に従って急落します。",
    thread: "物語のはじまり",
    threadText: "近くのろうそくは、遠くのサーチライトより明るく見えることがあります。星を本当の出力で順位づけるには、まず距離が目に仕掛けるトリックを解かねばなりません。",
    key: "見かけの明るさは 1 / 距離² で減る",
    keyText: "光度は星の固有の出力——どこに立っていても、毎秒放出するエネルギーの総量です。見かけの明るさは、地球からどれだけ明るく見えるかです。光は外へ進むにつれ、距離の2乗で面積が増える球に広がるので、見かけの明るさは距離の逆二乗で減ります：距離が2倍なら4倍暗く見えます。だから見かけの明るさだけでは光度は分かりません——距離も知る必要があるのです。",
    distance: "距離", lumL: "光度（真の出力）", brightL: "見かけの明るさ",
    constant: "不変", note: "光度は星の真の出力、見かけの明るさは見え方で1/距離²で減ります。明るさから光度を得るには距離を知る必要があります。",
  },
};

function draw(ctx, cw, H, dist, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // star at left, observer (Earth) at right
  const sx = 40, sy = H * 0.42;
  // brightness ~ 1/dist^2 (dist in 1..5)
  const bright = 1 / (dist * dist);
  // star glow, size fixed (luminosity constant) but we show expanding shells
  const glow = ctx.createRadialGradient(sx, sy, 2, sx, sy, 22);
  glow.addColorStop(0, "#fff2c0"); glow.addColorStop(1, "rgba(255,180,60,0)");
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(sx, sy, 22, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffd86b"; ctx.beginPath(); ctx.arc(sx, sy, 10, 0, Math.PI * 2); ctx.fill();
  // concentric shells showing light spreading
  ctx.strokeStyle = "rgba(255,207,107,0.2)"; ctx.lineWidth = 1;
  for (let r = 40; r < cw; r += 50) { ctx.beginPath(); ctx.arc(sx, sy, r, -0.6, 0.6); ctx.stroke(); }
  // observer position along the beam depends on distance
  const obsX = 40 + (dist / 5) * (cw - 90);
  // apparent brightness as a disk whose brightness/size ~ bright
  const appR = 6 + bright * 26;
  const ag = ctx.createRadialGradient(obsX, sy, 1, obsX, sy, appR);
  ag.addColorStop(0, `rgba(255,240,190,${Math.min(1, 0.3 + bright)})`); ag.addColorStop(1, "rgba(255,200,120,0)");
  ctx.fillStyle = ag; ctx.beginPath(); ctx.arc(obsX, sy, appR, 0, Math.PI * 2); ctx.fill();
  // Earth marker
  ctx.fillStyle = "#5b8fd8"; ctx.beginPath(); ctx.arc(obsX, sy, 5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText("Earth", obsX, sy + 20);
  // labels
  ctx.fillStyle = C.sun; ctx.font = `10px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(`${t.lumL}: ${t.constant}`, 10, H - 40);
  // brightness bar
  const bx = 10, bw = cw - 20, by = H - 26;
  ctx.fillStyle = "rgba(120,150,210,0.2)"; ctx.fillRect(bx, by, bw, 12);
  const bg = ctx.createLinearGradient(bx, 0, bx + bw, 0); bg.addColorStop(0, "#ffcf6b"); bg.addColorStop(1, "#ff8f5a");
  ctx.fillStyle = bg; ctx.fillRect(bx, by, bw * bright, 12);
  ctx.fillStyle = C.text; ctx.font = `10px ${mono}`; ctx.fillText(`${t.brightL}: ${(bright * 100).toFixed(0)}%  (×${dist} distance → ÷${(dist * dist)} brightness)`, bx, by - 4);
}

export function BrightnessLuminosity() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 240;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [dist, setDist] = useState(1);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, dist, lang);
  }, [cw, dist, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 01</div>
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
          <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.distance}</span>
          <input type="range" min="1" max="5" step="1" value={dist}
            onChange={(e) => setDist(parseInt(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
          <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, width: 34, textAlign: "right" }}>×{dist}</span>
        </div>

        <div style={{ marginTop: 4 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default BrightnessLuminosity;
