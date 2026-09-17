/* ============================================================
   STATION 7 — WHAT LINE SHAPES REVEAL
   The WIDTH of spectral lines carries information. PRESSURE broadening:
   a dense, high-pressure main-sequence photosphere has frequent particle
   collisions that disturb energy levels, so its lines are BROAD; a giant's
   thin, low-pressure atmosphere gives NARROW lines. ROTATION broadening:
   a fast-spinning star has one limb approaching (blueshift) and the other
   receding (redshift), smearing each line wider. Grounded in Ch.17 §17.3-17.4.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "What line shapes reveal",
    kind: "Width tells a story",
    lede: "A spectral line's width is data. Compare a dense dwarf's broad lines with a giant's narrow ones — then spin a star up and watch its lines smear.",
    thread: "THE STORY CONTINUES",
    threadText: "Two stars can share a temperature and still differ. The exact shape of each dark line encodes how crowded — and how fast-spinning — a star's surface is.",
    pressKey: "PRESSURE BROADENING — DENSE ATMOSPHERES BLUR LINES",
    pressText: "In a main-sequence star, the photosphere is dense and at high pressure, so atoms collide frequently. Each collision briefly disturbs the atoms' energy levels, so they absorb a slightly wider range of wavelengths — the spectral lines come out BROAD. A giant star of the same temperature has a huge, low-density, low-pressure atmosphere with far fewer collisions, so its lines are NARROW. Line width thus reveals whether a star is a compact dwarf or a bloated giant.",
    rotKey: "ROTATION BROADENING — SPIN SMEARS EACH LINE",
    rotText: "If a star spins rapidly, one edge (limb) rotates toward us and the other away. Light from the approaching limb is blueshifted and light from the receding limb is redshifted; combined, they smear each absorption line into a broad, shallow trough. The faster the spin, the broader the line — which is how astronomers measure the rotation of stars like fast-spinning Altair, even though the disk itself is unresolved.",
    pressure: "Pressure (giant vs dwarf)", rotation: "Rotation",
    giant: "giant: low pressure → narrow", dwarf: "main-sequence: high pressure → broad",
    spin: "Rotation speed", slow: "slow spin → narrow", fast: "fast spin → broad",
    noteP: "Dense, high-pressure main-sequence atmospheres collide often and give broad lines; a giant's thin atmosphere gives narrow lines — so width reveals a star's size.",
    noteR: "A spinning star blueshifts one limb and redshifts the other, broadening each line; the faster the spin, the broader the line.",
  },
  ja: {
    title: "線の形が明かすもの",
    kind: "幅が物語る",
    lede: "スペクトル線の幅はデータです。密な矮星の広い線と巨星の狭い線を比べ——それから星を回転させて線がにじむのを見よう。",
    thread: "物語はつづく",
    threadText: "2つの星は温度が同じでも異なりえます。各暗線の正確な形が、星の表面がどれだけ混み合い、どれだけ速く回転しているかを符号化しています。",
    pressKey: "圧力広がり——密な大気は線をぼかす",
    pressText: "主系列星では光球が密で高圧なので、原子が頻繁に衝突します。各衝突が原子のエネルギー準位を一瞬乱すため、少し広い範囲の波長を吸収し——スペクトル線は広く出ます。同じ温度の巨星は、巨大で低密度・低圧の大気をもち衝突がはるかに少ないため、線は狭くなります。だから線の幅は、星がコンパクトな矮星か膨れた巨星かを明かします。",
    rotKey: "自転広がり——回転が各線をにじませる",
    rotText: "星が速く自転すると、一方の縁が私たちへ回り込み、他方が遠ざかります。近づく縁の光は青方偏移、遠ざかる縁の光は赤方偏移し、合わさって各吸収線を広く浅い谷ににじませます。速く回るほど線は広くなります——これが、円盤そのものは分解できなくても、速く自転するアルタイルのような星の回転を測る方法です。",
    pressure: "圧力（巨星対矮星）", rotation: "自転",
    giant: "巨星：低圧 → 狭い", dwarf: "主系列星：高圧 → 広い",
    spin: "自転速度", slow: "遅い自転 → 狭い", fast: "速い自転 → 広い",
    noteP: "密で高圧の主系列大気は衝突が多く広い線を、巨星の薄い大気は狭い線を与えます——幅が星の大きさを明かします。",
    noteR: "自転する星は一方の縁を青方偏移、他方を赤方偏移させて各線を広げます。速く回るほど線は広くなります。",
  },
};

function lineProfile(ctx, cx, y0, y1, width, depth, col) {
  // draw an absorption trough of given width (fraction) centered at cx
  ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath();
  const halfW = width;
  for (let x = -1; x <= 1; x += 0.02) {
    const d = Math.exp(-(x * x) / (2 * halfW * halfW)) * depth;
    const px = cx + x * 150;
    const py = y0 + d * (y1 - y0);
    if (x === -1) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  ctx.stroke();
}

function drawPressure(ctx, cw, H, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const midX = cw / 2;
  // giant (top): narrow line
  const gy0 = 30, gy1 = H * 0.4;
  ctx.strokeStyle = "rgba(150,175,230,0.25)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(30, gy0); ctx.lineTo(cw - 30, gy0); ctx.stroke();
  lineProfile(ctx, midX, gy0, gy1, 0.1, 0.9, "#8fe0a0");
  ctx.fillStyle = "#8fe0a0"; ctx.font = `10px ${mono}`; ctx.textAlign = "left"; ctx.fillText(t.giant, 30, gy0 - 6);
  // dwarf (bottom): broad line
  const dy0 = H * 0.56, dy1 = H * 0.9;
  ctx.strokeStyle = "rgba(150,175,230,0.25)"; ctx.beginPath(); ctx.moveTo(30, dy0); ctx.lineTo(cw - 30, dy0); ctx.stroke();
  lineProfile(ctx, midX, dy0, dy1, 0.42, 0.9, "#ffcf6b");
  ctx.fillStyle = "#ffcf6b"; ctx.fillText(t.dwarf, 30, dy0 - 6);
}

function drawRotation(ctx, cw, H, spin, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // star with colored limbs (left)
  const sx = cw * 0.22, sy = H * 0.42, R = 42;
  ctx.save(); ctx.beginPath(); ctx.arc(sx, sy, R, 0, Math.PI * 2); ctx.clip();
  const g = ctx.createLinearGradient(sx - R, sy, sx + R, sy);
  g.addColorStop(0, spin > 0.1 ? "#6fa8ff" : "#ffe08a"); g.addColorStop(0.5, "#ffe08a"); g.addColorStop(1, spin > 0.1 ? "#ff6f6f" : "#ffe08a");
  ctx.fillStyle = g; ctx.fillRect(sx - R, sy - R, 2 * R, 2 * R);
  ctx.restore();
  if (spin > 0.1) { ctx.fillStyle = "#6fa8ff"; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText("blue", sx - R + 8, sy); ctx.fillStyle = "#ff6f6f"; ctx.fillText("red", sx + R - 8, sy); }
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(lang === "ja" ? "自転する星" : "spinning star", sx, sy + R + 16);
  // line profile (right): width grows with spin
  const bx = cw * 0.5, y0 = 40, y1 = H * 0.78, cx = (bx + cw - 20) / 2 - 40;
  ctx.strokeStyle = "rgba(150,175,230,0.25)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(bx, y0); ctx.lineTo(cw - 20, y0); ctx.stroke();
  lineProfile(ctx, cx, y0, y1, 0.08 + spin * 0.4, 0.9 - spin * 0.35, "#ffcf6b");
  ctx.fillStyle = spin > 0.5 ? C.bad : C.good; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(spin > 0.5 ? t.fast : t.slow, (bx + cw - 20) / 2, H - 10);
}

export function LineShapes() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("pressure");
  const [spin, setSpin] = useState(0.2);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (mode === "pressure") drawPressure(ctx, cw, H, lang);
    else drawRotation(ctx, cw, H, spin, lang);
  }, [cw, mode, spin, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 07</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{t.threadText}</p>
        </div>
        <div style={styles.fateBox}>
          <div style={{ ...styles.fateLabel, color: C.sun }}>{mode === "pressure" ? t.pressKey : t.rotKey}</div>
          <p style={styles.keyTermText}>{mode === "pressure" ? t.pressText : t.rotText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          {[["pressure", t.pressure], ["rotation", t.rotation]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        {mode === "rotation" && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "10px 0 4px" }}>
            <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.spin}</span>
            <input type="range" min="0" max="1" step="0.05" value={spin}
              onChange={(e) => setSpin(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
          </div>
        )}

        <div style={{ marginTop: 10 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{mode === "pressure" ? t.noteP : t.noteR}</p>
      </div>
    </div>
  );
}

export default LineShapes;
