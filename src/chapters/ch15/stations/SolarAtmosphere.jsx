/* ============================================================
   STATION 2 — THE SUN'S ATMOSPHERE
   Above the photosphere the temperature counter-intuitively RISES:
   through the chromosphere (~10,000 K), then across the razor-thin
   transition region where it leaps to over 1,000,000 K, into the
   corona. This "heating paradox" is resolved by magnetic energy
   transport and reconnection. Because the corona is so hot, by Wien's
   law it radiates mostly X-rays and extreme UV — so those wavelengths
   reveal it best. Grounded in Ch.15 §15.2.
   ============================================================ */
import React, { useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The Sun's atmosphere",
    kind: "Hotter as you go out",
    lede: "Follow the temperature upward from the surface. It dips, then climbs, then leaps a hundredfold across a whisker-thin layer — the opposite of what you'd expect.",
    thread: "THE STORY CONTINUES",
    threadText: "Move away from a campfire and it gets cooler. Move outward from the Sun's surface and, astonishingly, it gets hotter — reaching a million degrees in the corona.",
    key: "THE HEATING PARADOX — AND WHY WE USE X-RAYS",
    keyText: "Above the visible photosphere (~5,800 K), temperature falls to a minimum and then, paradoxically, RISES: through the chromosphere (~10,000 K), then across the razor-thin transition region where it leaps to over 1,000,000 K, and out into the corona. This 'solar atmosphere heating paradox' is resolved by the transport of magnetic energy and by magnetic reconnection events. Because the corona is so hot, Wien's law says it radiates mainly at very short wavelengths — so X-ray and extreme-ultraviolet telescopes give the clearest view of it, while visible light shows the cooler photosphere.",
    height: "Height above photosphere →", temp: "Temperature",
    photo: "photosphere ~5,800 K", chromo: "chromosphere ~10,000 K", trans: "transition region", corona: "corona > 1,000,000 K",
    visible: "visible: photosphere", xray: "X-ray / EUV: corona",
    note: "Above the photosphere, temperature rises outward — a leap to over a million K across the thin transition region, heated by magnetic reconnection. By Wien's law the hot corona shows best in X-rays and UV.",
  },
  ja: {
    title: "太陽の大気",
    kind: "外へ行くほど熱い",
    lede: "表面から上へ温度をたどろう。いったん下がり、また上がり、そして紙一重の薄い層で100倍に跳ね上がる——予想の逆です。",
    thread: "物語はつづく",
    threadText: "焚き火から離れれば涼しくなります。太陽の表面から外へ進むと、驚くことに熱くなり——コロナで100万度に達します。",
    key: "加熱の逆説——そしてなぜX線を使うのか",
    keyText: "目に見える光球（約5,800 K）の上では、温度はいったん最小まで下がり、それから逆説的に上昇します：彩層（約10,000 K）を通り、次に紙一重の遷移層で100万K超へ跳ね上がり、コロナへと出ます。この「太陽大気加熱の逆説」は、磁気エネルギーの輸送と磁気再結合によって解決されます。コロナが非常に熱いため、ウィーンの法則により主に非常に短い波長で放射します——だからX線と極端紫外線の望遠鏡が最もよく見せ、可視光はより冷たい光球を映します。",
    height: "光球からの高さ →", temp: "温度",
    photo: "光球 約5,800 K", chromo: "彩層 約10,000 K", trans: "遷移層", corona: "コロナ 100万K超",
    visible: "可視光：光球", xray: "X線／EUV：コロナ",
    note: "光球の上では温度が外向きに上昇——薄い遷移層で100万K超へ跳ね、磁気再結合で加熱されます。ウィーンの法則により、熱いコロナはX線とUVで最もよく見えます。",
  },
};

function draw(ctx, cw, H, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const x0 = 44, x1 = cw - 16, y0 = 24, y1 = H - 46;
  // axes
  ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0, y1); ctx.lineTo(x1, y1); ctx.stroke();
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(t.temp, x0 - 38, y0 + 4); ctx.textAlign = "center"; ctx.fillText(t.height, (x0 + x1) / 2, H - 10);
  // temperature profile (log-ish, schematic): dip then chromosphere rise then transition spike then corona plateau
  // segments across x fraction
  const pts = [
    [0.0, 5800], [0.06, 4400], [0.14, 6000], [0.30, 10000], [0.40, 20000],
    [0.44, 300000], [0.47, 1000000], [0.6, 1300000], [1.0, 1500000],
  ];
  const tmin = 4000, tmax = 1600000;
  const ly = (T) => y1 - (Math.log10(T) - Math.log10(tmin)) / (Math.log10(tmax) - Math.log10(tmin)) * (y1 - y0);
  const lx = (f) => x0 + f * (x1 - x0);
  // zone shading
  const zones = [[0, 0.22, "rgba(255,224,138,0.12)", t.photo], [0.22, 0.42, "rgba(255,150,90,0.12)", t.chromo], [0.42, 0.48, "rgba(120,180,255,0.18)", t.trans], [0.48, 1, "rgba(150,120,220,0.12)", t.corona]];
  zones.forEach(([a, b, col]) => { ctx.fillStyle = col; ctx.fillRect(lx(a), y0, lx(b) - lx(a), y1 - y0); });
  // curve
  ctx.strokeStyle = "#ff8f5a"; ctx.lineWidth = 2.5; ctx.beginPath();
  pts.forEach((p, i) => { const X = lx(p[0]), Y = ly(p[1]); if (i === 0) ctx.moveTo(X, Y); else ctx.lineTo(X, Y); });
  ctx.stroke();
  // transition region marker
  const trX = lx(0.45);
  ctx.strokeStyle = "rgba(120,180,255,0.7)"; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(trX, y0); ctx.lineTo(trX, y1); ctx.stroke(); ctx.setLineDash([]);
  // zone labels
  ctx.font = `9px ${mono}`; ctx.textAlign = "center";
  ctx.fillStyle = "#e0b878"; ctx.fillText(t.photo, lx(0.11), y1 - 6);
  ctx.fillStyle = "#ff9a52"; ctx.fillText(t.chromo, lx(0.32), ly(10000) - 8);
  ctx.fillStyle = "#8fbfff"; ctx.fillText(t.trans, trX, y0 + 30);
  ctx.fillStyle = "#c0a8ee"; ctx.fillText(t.corona, lx(0.75), ly(1300000) - 8);
  // visible vs X-ray sun pair, lower-centre (ample empty space below the curve)
  const pairY = y1 - 34, sr = 13;
  const vX = cw / 2 - 46, xX = cw / 2 + 46;
  ctx.textAlign = "center"; ctx.font = `9px ${mono}`;
  // visible: bright disk
  ctx.fillStyle = "#ffe08a"; ctx.beginPath(); ctx.arc(vX, pairY, sr, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.faint; ctx.fillText(t.visible, vX, pairY + sr + 12);
  // X-ray: dark disk with glowing corona
  const cg = ctx.createRadialGradient(xX, pairY, sr * 0.6, xX, pairY, sr + 6);
  cg.addColorStop(0, "rgba(180,120,255,0)"); cg.addColorStop(0.6, "rgba(180,140,255,0.7)"); cg.addColorStop(1, "rgba(120,180,255,0)");
  ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(xX, pairY, sr + 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#2a2340"; ctx.beginPath(); ctx.arc(xX, pairY, sr, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#c0a8ee"; ctx.fillText(t.xray, xX, pairY + sr + 12);
}

export function SolarAtmosphere() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, lang);
  }, [cw, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 02</div>
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

        <div style={{ marginTop: 4 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default SolarAtmosphere;
