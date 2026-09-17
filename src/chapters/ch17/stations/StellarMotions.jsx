/* ============================================================
   STATION 8 — STELLAR MOTIONS
   A Doppler shift in a star's lines gives its RADIAL velocity (toward or
   away): a blueshift means approaching, a redshift means receding. Its
   PROPER MOTION is the angular drift across the sky; the true TRANSVERSE
   velocity equals proper motion × distance (so a farther star with the
   same proper motion moves faster). Combine radial and transverse and you
   get the full 3D SPACE VELOCITY. Grounded in Ch.17 §17.4.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Stellar motions",
    kind: "Reading a star's velocity",
    lede: "Push a star toward or away and watch its lines shift blue or red. Then switch to its drift across the sky — and see how the two combine into a true 3D velocity.",
    thread: "THE STORY ENDS HERE",
    threadText: "A star is never truly fixed. From tiny shifts in its light and its slow crawl against the background, we reconstruct exactly how it moves through space.",
    radialKey: "DOPPLER SHIFT → RADIAL VELOCITY (BLUE = TOWARD)",
    radialText: "The Doppler shift of a star's spectral lines reveals its RADIAL velocity — motion straight toward or away from us. If the lines are shifted toward shorter (bluer) wavelengths, the star is moving TOWARD Earth; a shift toward longer (redder) wavelengths means it is moving AWAY. The size of the shift gives the speed.",
    transKey: "PROPER MOTION × DISTANCE → TRANSVERSE, THEN 3D",
    transText: "A star's PROPER MOTION is its slow angular drift across the sky (in arcseconds per year), transverse to our line of sight. The same proper motion at a greater distance means a greater true TRANSVERSE velocity (velocity = proper motion × distance): a star twice as far with the same proper motion is physically moving twice as fast across the sky. Combine the transverse velocity with the radial velocity as perpendicular components and you get the star's full 3-D SPACE VELOCITY.",
    radial: "Radial (Doppler)", trans: "Transverse & 3D",
    vel: "Radial velocity", toward: "toward (blueshift)", away: "away (redshift)", rest: "at rest",
    near: "near star", far: "far star (2× distance)", same: "same proper motion (0.5\"/yr)",
    tv: "→ 2× transverse velocity", space: "space velocity (3D)", radC: "radial", tranC: "transverse",
    noteR: "A blueshift means the star moves toward us, a redshift away; the shift size gives the radial speed.",
    noteT: "Transverse velocity = proper motion × distance, so a farther star with equal proper motion moves faster. Combined with radial velocity it gives the 3D space velocity.",
  },
  ja: {
    title: "星の運動",
    kind: "星の速度を読む",
    lede: "星を近づけたり遠ざけたりして、線が青か赤にずれるのを見よう。それから空を横切る動きに切り替え——2つがどう本当の3次元速度に合わさるかを見よう。",
    thread: "物語はここで終わる",
    threadText: "星は決して本当に静止していません。光のわずかなずれと、背景に対するゆっくりした這いから、それが宇宙をどう動くかを正確に再構成します。",
    radialKey: "ドップラー偏移 → 視線速度（青＝接近）",
    radialText: "星のスペクトル線のドップラー偏移は、視線速度——私たちへまっすぐ近づくか遠ざかる運動——を明かします。線が短い（青い）波長へずれていれば星は地球へ近づいており、長い（赤い）波長へのずれは遠ざかっていることを意味します。ずれの大きさが速さを与えます。",
    transKey: "固有運動 × 距離 → 横断速度、そして3D",
    transText: "星の固有運動は、視線に対して横向きの、空を横切るゆっくりした角度の漂い（年あたりの秒角）です。同じ固有運動でも距離が大きいほど、真の横断速度は大きくなります（速度＝固有運動×距離）：同じ固有運動で2倍遠い星は、空を実際に2倍速く動いています。横断速度と視線速度を垂直な成分として合成すると、星の完全な3次元空間速度が得られます。",
    radial: "視線（ドップラー）", trans: "横断と3D",
    vel: "視線速度", toward: "接近（青方偏移）", away: "遠ざかる（赤方偏移）", rest: "静止",
    near: "近い星", far: "遠い星（2倍の距離）", same: "同じ固有運動（0.5\"/年）",
    tv: "→ 2倍の横断速度", space: "空間速度（3D）", radC: "視線", tranC: "横断",
    noteR: "青方偏移は星が近づくこと、赤方偏移は遠ざかることを意味し、ずれの大きさが視線速度を与えます。",
    noteT: "横断速度＝固有運動×距離なので、同じ固有運動でも遠い星ほど速く動きます。視線速度と合わせて3次元空間速度になります。",
  },
};

function drawRadial(ctx, cw, H, v, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // Earth (right) and star (left) with a motion arrow
  const sx = cw * 0.24, sy = H * 0.36, ex = cw - 44;
  ctx.fillStyle = "#5b8fd8"; ctx.beginPath(); ctx.arc(ex, sy, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText("Earth", ex, sy + 18);
  const starCol = v < -0.05 ? "#8fb8ff" : v > 0.05 ? "#ff8f8f" : "#ffe08a";
  ctx.fillStyle = starCol; ctx.beginPath(); ctx.arc(sx, sy, 12, 0, Math.PI * 2); ctx.fill();
  // motion arrow
  if (Math.abs(v) > 0.05) {
    const dir = v < 0 ? 1 : -1; // toward Earth (right) if blueshift
    ctx.strokeStyle = starCol; ctx.lineWidth = 2; const ax = sx + dir * 22;
    ctx.beginPath(); ctx.moveTo(sx + dir * 14, sy); ctx.lineTo(ax, sy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ax, sy); ctx.lineTo(ax - dir * 6, sy - 4); ctx.lineTo(ax - dir * 6, sy + 4); ctx.closePath(); ctx.fillStyle = starCol; ctx.fill();
  }
  ctx.fillStyle = C.text; ctx.font = `10px ${mono}`; ctx.fillText(v < -0.05 ? t.toward : v > 0.05 ? t.away : t.rest, sx, sy - 20);
  // spectrum with lines shifted
  const bx = 30, bw = cw - 60, by = H * 0.62, bh = 30;
  const grad = ctx.createLinearGradient(bx, 0, bx + bw, 0); grad.addColorStop(0, "#6a3fff"); grad.addColorStop(0.5, "#8fe08f"); grad.addColorStop(1, "#ff5a5a");
  ctx.fillStyle = grad; ctx.fillRect(bx, by, bw, bh);
  // rest positions vs shifted
  const shift = -v * 0.12; // blueshift (v<0) moves lines left
  ctx.lineWidth = 2;
  [0.3, 0.45, 0.6, 0.72].forEach((f) => {
    // rest (faint)
    ctx.strokeStyle = "rgba(255,255,255,0.25)"; ctx.beginPath(); ctx.moveTo(bx + f * bw, by); ctx.lineTo(bx + f * bw, by + bh); ctx.stroke();
    // shifted (dark)
    ctx.strokeStyle = "rgba(10,10,20,0.85)"; ctx.beginPath(); ctx.moveTo(bx + (f + shift) * bw, by); ctx.lineTo(bx + (f + shift) * bw, by + bh); ctx.stroke();
  });
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "left"; ctx.fillText(lang === "ja" ? "薄線＝静止, 濃線＝観測" : "faint = rest, dark = observed", bx, by - 5);
  ctx.textAlign = "center"; ctx.fillStyle = starCol; ctx.font = `11px ${mono}`; ctx.fillText(`${t.vel}: ${v < -0.05 ? (lang === "ja" ? "青方偏移" : "blueshift") : v > 0.05 ? (lang === "ja" ? "赤方偏移" : "redshift") : "0"}`, cw / 2, H - 8);
}

function drawTrans(ctx, cw, H, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // top: two stars same proper motion, different distance
  const y = H * 0.24;
  [[cw * 0.3, t.near, 1], [cw * 0.7, t.far, 2]].forEach(([x, label, d]) => {
    ctx.fillStyle = "#ffe08a"; ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fill();
    // same angular arrow, but far star's true velocity is longer
    ctx.strokeStyle = "#8fe0a0"; ctx.lineWidth = 2; const alen = 26;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + alen, y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + alen, y); ctx.lineTo(x + alen - 6, y - 4); ctx.lineTo(x + alen - 6, y + 4); ctx.closePath(); ctx.fillStyle = "#8fe0a0"; ctx.fill();
    ctx.fillStyle = C.muted; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(label, x, y - 12);
    if (d === 2) { ctx.fillStyle = C.sun; ctx.fillText(t.tv, x, y + 22); }
  });
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.same, cw / 2, y + 40);
  // bottom: 3D velocity vector triangle
  const ox = cw * 0.3, oy = H * 0.86;
  ctx.strokeStyle = "#8fb8ff"; ctx.lineWidth = 2; // radial (horizontal)
  ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + 120, oy); ctx.stroke();
  ctx.fillStyle = "#8fb8ff"; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.radC, ox + 60, oy + 14);
  ctx.strokeStyle = "#8fe0a0"; ctx.beginPath(); ctx.moveTo(ox + 120, oy); ctx.lineTo(ox + 120, oy - 70); ctx.stroke(); // transverse (vertical)
  ctx.fillStyle = "#8fe0a0"; ctx.save(); ctx.translate(ox + 134, oy - 35); ctx.rotate(-Math.PI / 2); ctx.fillText(t.tranC, 0, 0); ctx.restore();
  ctx.strokeStyle = C.sun; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + 120, oy - 70); ctx.stroke(); // space velocity (hypotenuse)
  ctx.fillStyle = C.sun; ctx.font = `10px ${mono}`; ctx.textAlign = "left"; ctx.fillText(t.space, ox + 20, oy - 44);
}

export function StellarMotions() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("radial");
  const [v, setV] = useState(-0.5);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (mode === "radial") drawRadial(ctx, cw, H, v, lang);
    else drawTrans(ctx, cw, H, lang);
  }, [cw, mode, v, lang]);

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
          <div style={{ ...styles.fateLabel, color: C.sun }}>{mode === "radial" ? t.radialKey : t.transKey}</div>
          <p style={styles.keyTermText}>{mode === "radial" ? t.radialText : t.transText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          {[["radial", t.radial], ["trans", t.trans]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        {mode === "radial" && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "10px 0 4px" }}>
            <span style={{ fontFamily: mono, fontSize: 12, color: "#8fb8ff", whiteSpace: "nowrap" }}>{t.toward}</span>
            <input type="range" min="-1" max="1" step="0.1" value={v}
              onChange={(e) => setV(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
            <span style={{ fontFamily: mono, fontSize: 12, color: "#ff8f8f", whiteSpace: "nowrap" }}>{t.away}</span>
          </div>
        )}

        <div style={{ marginTop: 10 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{mode === "radial" ? t.noteR : t.noteT}</p>
      </div>
    </div>
  );
}

export default StellarMotions;
