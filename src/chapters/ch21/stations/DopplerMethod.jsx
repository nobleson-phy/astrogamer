/* ============================================================
   STATION 4 — THE DOPPLER METHOD
   A planet and its star both orbit their common center of mass, so the star
   makes a small periodic wobble. The DOPPLER (radial velocity) method
   detects that wobble as alternating blue/red shifts in the star's spectral
   lines. Mayor and Queloz used it to find the first exoplanet around a
   sunlike star, 51 Pegasi b, in 1995 (Nobel Prize 2019). It is biased
   toward massive, close-in planets, which cause the biggest, fastest
   wobbles. Grounded in Ch.21 §21.4.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The Doppler method",
    kind: "Reading a star's wobble",
    lede: "A planet tugs its star into a tiny circle. Dial up the planet's mass and pull it closer — and watch the star's wobble (and its Doppler shift) grow.",
    thread: "THE STORY CONTINUES",
    threadText: "You can't see the planet, but you can see what it does to its star. That whisper of back-and-forth motion was how the very first exoplanets were found.",
    key: "WOBBLE SEEN IN DOPPLER SHIFTS — BIASED TO BIG, CLOSE PLANETS",
    keyText: "A star and its planet both orbit their common center of mass, so the star traces a small wobble. The DOPPLER (radial velocity) method detects this as a periodic shift of the star's spectral lines — blueshifted as it moves toward us, redshifted as it moves away. Michel Mayor and Didier Queloz used this to discover the first exoplanet around a sunlike star, 51 Pegasi b, in 1995 (2019 Nobel Prize). The method has a strong selection effect: massive planets in close orbits pull their stars harder and faster, producing the largest wobbles with the shortest, most easily measured periods — so those are the easiest to find.",
    mass: "Planet mass", dist: "Orbit distance",
    wobble: "stellar wobble", rv: "radial-velocity signal",
    easy: "big & close → large, fast wobble (easy)", hard: "small & far → tiny, slow wobble (hard)",
    disc: "first: 51 Pegasi b · Mayor & Queloz, 1995",
    note: "The Doppler method reads a star's wobble as blue/red spectral shifts. Mayor & Queloz found 51 Peg b (1995). It favors massive, close-in planets — the biggest, fastest wobbles.",
  },
  ja: {
    title: "ドップラー法",
    kind: "星の揺れを読む",
    lede: "惑星が星を小さな円へ引き込みます。惑星の質量を上げ、近づけると——星の揺れ（とそのドップラー偏移）が大きくなります。",
    thread: "物語はつづく",
    threadText: "惑星は見えませんが、惑星が星に及ぼすことは見えます。その行き来する運動のささやきが、最初の系外惑星の見つけ方でした。",
    key: "揺れをドップラー偏移で見る——大きく近い惑星に偏る",
    keyText: "星と惑星は共通の重心を回るので、星は小さな揺れを描きます。ドップラー（視線速度）法はこれを、星のスペクトル線の周期的なずれとして検出します——近づくときは青方偏移、遠ざかるときは赤方偏移です。ミシェル・マイヨールとディディエ・ケローはこれを使い、1995年に太陽に似た星をめぐる最初の系外惑星、ペガスス座51番星bを発見しました（2019年ノーベル賞）。この方法には強い選択効果があります：近い軌道の大質量惑星は、星をより強く速く引き、最も大きく、最も短く測りやすい周期の揺れを作ります——だからそれらが最も見つけやすいのです。",
    mass: "惑星の質量", dist: "軌道の距離",
    wobble: "星の揺れ", rv: "視線速度の信号",
    easy: "大きく近い → 大きく速い揺れ（容易）", hard: "小さく遠い → 小さく遅い揺れ（困難）",
    disc: "最初：ペガスス座51番星b · マイヨールとケロー、1995年",
    note: "ドップラー法は星の揺れを青／赤のスペクトル偏移として読みます。マイヨールとケローが51 Peg bを発見（1995年）。大きく近い惑星——最も大きく速い揺れ——に有利です。",
  },
};

function draw(ctx, cw, H, pm, dist, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.26, cy = H * 0.34;
  // wobble amplitude ~ pm / dist; period ~ dist^1.5
  const amp = Math.min(6 + pm * 2 / dist * 5, 22);
  const per = 0.02 / Math.pow(dist, 0.5);
  const a = tt * per;
  const sx = cx + Math.cos(a) * amp, sy = cy + Math.sin(a) * amp * 0.5;
  // planet opposite side, orbit radius scaled by dist
  const pr = 30 + dist * 18;
  const px = cx - Math.cos(a) * pr, py = cy - Math.sin(a) * pr * 0.5;
  // barycenter
  ctx.fillStyle = "rgba(255,207,107,0.5)"; ctx.beginPath(); ctx.arc(cx, cy, 2, 0, Math.PI * 2); ctx.fill();
  // star color shifts smoothly with radial velocity (blue toward, red away)
  const vr = Math.sin(a); // -1 toward us, +1 away
  const lerp = (p, q, f) => [Math.round(p[0] + (q[0] - p[0]) * f), Math.round(p[1] + (q[1] - p[1]) * f), Math.round(p[2] + (q[2] - p[2]) * f)];
  const blue = [143, 184, 255], yel = [255, 224, 138], red = [255, 143, 143];
  const t2 = (vr + 1) / 2;
  const col = t2 < 0.5 ? lerp(blue, yel, t2 / 0.5) : lerp(yel, red, (t2 - 0.5) / 0.5);
  ctx.fillStyle = `rgb(${col[0]},${col[1]},${col[2]})`; ctx.beginPath(); ctx.arc(sx, sy, 12, 0, Math.PI * 2); ctx.fill();
  // planet
  ctx.fillStyle = "#8fc0e8"; ctx.beginPath(); ctx.arc(px, py, 4 + pm, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.wobble, cx, cy + 40);
  // RV curve (right)
  const gx0 = cw * 0.52, gx1 = cw - 16, gy = H * 0.72, gh = 34;
  ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.beginPath(); ctx.moveTo(gx0, gy); ctx.lineTo(gx1, gy); ctx.stroke();
  ctx.strokeStyle = "#ffcf6b"; ctx.lineWidth = 2; ctx.beginPath();
  for (let x = 0; x <= 100; x++) { const ph = a - (100 - x) * per * 4; const y = gy - Math.sin(ph) * (amp / 22) * gh; const px2 = gx0 + x / 100 * (gx1 - gx0); if (x === 0) ctx.moveTo(px2, y); else ctx.lineTo(px2, y); }
  ctx.stroke();
  ctx.fillStyle = C.cool; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.rv, (gx0 + gx1) / 2, gy - gh - 6);
  // difficulty label
  const big = pm >= 3 && dist <= 2;
  ctx.fillStyle = big ? C.good : (pm <= 1 && dist >= 4 ? C.bad : C.muted); ctx.font = `10px ${mono}`;
  ctx.fillText(big ? t.easy : (pm <= 1 && dist >= 4 ? t.hard : ""), cw / 2, H - 22);
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.fillText(t.disc, cw / 2, H - 8);
}

export function DopplerMethod() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [pm, setPm] = useState(4);
  const [dist, setDist] = useState(1.5);
  const pmRef = useRef(4), dRef = useRef(1.5); pmRef.current = pm; dRef.current = dist;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, pmRef.current, dRef.current, 30, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, pmRef.current, dRef.current, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 04</div>
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

        <div style={{ margin: "0 0 4px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, width: 86 }}>{t.mass}</span>
            <input type="range" min="0.5" max="8" step="0.5" value={pm} onChange={(e) => setPm(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, width: 86 }}>{t.dist}</span>
            <input type="range" min="1" max="6" step="0.5" value={dist} onChange={(e) => setDist(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
          </div>
        </div>

        <div style={{ marginTop: 8 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default DopplerMethod;
