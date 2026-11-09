/* ============================================================
   STATION 4 — SEEING THROUGH DUST
   Why visible light fails and radio/infrared win. A wavelength toggle
   (visible / near-infrared / 21-cm radio): in visible the galactic center is
   hidden behind dust (dimmed by ~10^12); switch to infrared or the 21-cm
   hydrogen line and the dust becomes transparent, revealing the disk, arms and
   bulge. LONGER WAVELENGTHS SEE THROUGH THE DUST. Grounded in Ch.25.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Seeing through dust",
    kind: "Why radio and infrared beat visible light",
    lede: "Point at the galactic center and change wavelength. In visible light, dust dims the center by a factor of a trillion — we see almost nothing. Switch to near-infrared, then the 21-cm hydrogen line, and the dust turns transparent: the disk, arms and bulge appear.",
    thread: "LIFTING THE VEIL",
    threadText: "The same dust that blinded Herschel still hides the heart of the Galaxy from ordinary telescopes. To map it, astronomers had to step outside visible light entirely.",
    key: "LONGER WAVELENGTHS SEE THROUGH THE DUST (21 cm, INFRARED)",
    keyText: "Interstellar DUST grains are roughly the size of visible-light wavelengths, so they scatter and absorb visible light fiercely — the light from the galactic center is dimmed by a factor of about a TRILLION (10^12) before it reaches us. That is why the center is invisible to the eye. The trick is to use wavelengths LONGER than the dust grains, which slip right past them. NEAR-INFRARED light penetrates the dust and reveals the crowded stars of the bulge. Even better, cool atomic hydrogen emits a RADIO line at 21 CENTIMETERS, produced when the electron's spin flips relative to the proton (the spin-flip transition). This 21-cm line passes through the entire Galaxy, letting radio astronomers map the disk and trace the spiral arms by the motion of the gas. By seeing in radio and infrared, we finally mapped the Milky Way we could never see.",
    visible: "Visible light",
    infrared: "Near-infrared",
    radio: "21-cm radio",
    centerLabel: "galactic center",
    dimmed: "dimmed ~10^12 by dust — hidden",
    irCap: "Infrared pierces the dust — the bulge appears",
    radioCap: "21-cm hydrogen line maps the whole disk & arms",
    spinflip: "spin-flip: electron spin flips relative to proton → 21 cm",
    note: "Dust grains scatter visible light, dimming the center by ~10^12. Near-infrared penetrates the dust to show the bulge; neutral hydrogen's 21-cm spin-flip radio line passes through the whole Galaxy to map the disk and spiral arms.",
  },
  ja: {
    title: "塵を透かし見る",
    kind: "なぜ電波と赤外線が可視光に勝るのか",
    lede: "銀河中心に向けて、波長を変えてみよう。可視光では、塵が中心を1兆分の1に暗くします——ほとんど何も見えません。近赤外線、そして21cm水素線に切り替えると、塵が透明になり、円盤・腕・バルジが現れます。",
    thread: "ベールを持ち上げる",
    threadText: "ハーシェルの目をふさいだのと同じ塵が、今も普通の望遠鏡から銀河の心臓部を隠しています。それを描くために、天文学者は可視光の外へ完全に踏み出さねばなりませんでした。",
    key: "より長い波長は塵を透かし見る（21cm・赤外線）",
    keyText: "星間塵の粒子はおおよそ可視光の波長ほどの大きさなので、可視光を激しく散乱・吸収します——銀河中心からの光は、私たちに届く前に約1兆倍（10^12）も暗くされます。だから中心は肉眼には見えません。コツは、塵の粒子より長い波長を使うことで、それらは粒子をそのまますり抜けます。近赤外線の光は塵を貫き、バルジの密集した星を明かします。さらに良いことに、冷たい原子状水素は21センチメートルの電波線を出します。これは電子のスピンが陽子に対して反転するとき（スピン反転遷移）に生じます。この21cm線は銀河全体を通り抜け、電波天文学者が円盤を描き、ガスの運動から渦巻腕をたどることを可能にします。電波と赤外線で見ることで、私たちはついに、決して見ることのできなかった天の川を描いたのです。",
    visible: "可視光",
    infrared: "近赤外線",
    radio: "21cm電波",
    centerLabel: "銀河中心",
    dimmed: "塵で約10^12暗い——隠れている",
    irCap: "赤外線が塵を貫く——バルジが現れる",
    radioCap: "21cm水素線が円盤と腕の全体を描く",
    spinflip: "スピン反転：電子のスピンが陽子に対して反転 → 21cm",
    note: "塵の粒子が可視光を散乱し、中心を約10^12暗くします。近赤外線は塵を貫いてバルジを見せ、中性水素の21cmスピン反転電波線は銀河全体を通り抜けて円盤と渦巻腕を描きます。",
  },
};

function draw(ctx, cw, H, band, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.5, cy = H * 0.46;
  const R = Math.min(cw * 0.42, H * 0.42);

  // reveal fraction: 0 (visible, hidden) → 1 (radio, fully seen)
  const reveal = band === "visible" ? 0.08 : band === "infrared" ? 0.6 : 1;

  // the galaxy disk / bulge underneath (brightness scaled by reveal)
  // spiral arms
  if (reveal > 0.2) {
    ctx.globalAlpha = (reveal - 0.2) / 0.8;
    for (let s = 0; s < 2; s++) {
      ctx.strokeStyle = band === "radio" ? "rgba(120,220,255,0.7)" : "rgba(170,200,255,0.7)";
      ctx.lineWidth = 7;
      ctx.beginPath();
      let first = true;
      for (let th = 0; th < Math.PI * 2.2; th += 0.05) {
        const r = 14 + (R - 14) * (th / (Math.PI * 2.2));
        const ang = th + s * Math.PI;
        const x = cx + Math.cos(ang) * r, y = cy + Math.sin(ang) * r;
        if (first) { ctx.moveTo(x, y); first = false; } else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }
  // bulge
  const bg = ctx.createRadialGradient(cx, cy, 2, cx, cy, 30);
  const bA = 0.2 + reveal * 0.8;
  bg.addColorStop(0, `rgba(255,243,176,${bA})`); bg.addColorStop(1, "rgba(255,180,80,0)");
  ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(cx, cy, 30, 0, Math.PI * 2); ctx.fill();

  // dust veil over everything (thick in visible, gone in radio) — a STATIC smooth
  // obscuration, not drifting particles: a brown haze plus a few in-plane dust lanes.
  const dustA = (1 - reveal) * 0.82;
  if (dustA > 0.02) {
    const hz = ctx.createRadialGradient(cx, cy, 8, cx, cy, R);
    hz.addColorStop(0, `rgba(92,68,46,${dustA * 0.72})`); hz.addColorStop(0.7, `rgba(78,58,40,${dustA * 0.4})`); hz.addColorStop(1, "rgba(70,52,36,0)");
    ctx.fillStyle = hz; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
    // dark dust lanes lying in the disk plane (where the obscuration is worst)
    ctx.fillStyle = `rgba(55,40,28,${dustA * 0.55})`;
    for (const yo of [-9, 2, 11]) { ctx.beginPath(); ctx.ellipse(cx, cy + yo, R * 0.96, 5, 0, 0, Math.PI * 2); ctx.fill(); }
  }

  // 21-cm spin-flip inset diagram (radio only)
  if (band === "radio") {
    const ix = cw - 70, iy = 44;
    ctx.strokeStyle = "rgba(120,220,255,0.6)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(ix, iy, 16, 0, Math.PI * 2); ctx.stroke();
    // proton
    ctx.fillStyle = "#ff8a6b"; ctx.beginPath(); ctx.arc(ix, iy, 4, 0, Math.PI * 2); ctx.fill();
    // electron with flipping spin arrow
    const ex = ix + Math.cos(tt * 0.05) * 16, ey = iy + Math.sin(tt * 0.05) * 16;
    ctx.fillStyle = "#9fd0ff"; ctx.beginPath(); ctx.arc(ex, ey, 2.6, 0, Math.PI * 2); ctx.fill();
    const flip = Math.sin(tt * 0.12) > 0 ? -1 : 1;
    ctx.strokeStyle = C.sun; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(ex, ey - 6 * flip); ctx.lineTo(ex, ey + 6 * flip); ctx.stroke();
  }

  // caption + center label
  ctx.fillStyle = band === "visible" ? "rgba(220,170,120,0.95)" : band === "radio" ? C.cool : "#ffcf6b";
  ctx.font = `12px ${mono}`; ctx.textAlign = "center";
  const cap = band === "visible" ? t.dimmed : band === "infrared" ? t.irCap : t.radioCap;
  ctx.fillText(cap, cw / 2, H - 12);

  ctx.fillStyle = band === "visible" ? "rgba(255,255,255,0.4)" : "#fff3b0";
  ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.centerLabel, cx, cy - 36 < 14 ? cy + 44 : cy - 36);

  if (band === "radio") {
    ctx.fillStyle = "#bfe4ff"; ctx.font = `10.5px ${mono}`; ctx.textAlign = "left";
    ctx.fillText(t.spinflip, 12, 18);
  }
}

export function SeeingThroughDust() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 300;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [band, setBand] = useState("visible");
  const bandRef = useRef("visible"); bandRef.current = band;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, band, 30, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, bandRef.current, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, band, lang]);

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

        <div style={styles.pickerRow}>
          <button onClick={() => setBand("visible")} style={{ ...styles.chip, ...(band === "visible" ? styles.chipOn : {}) }}>{t.visible}</button>
          <button onClick={() => setBand("infrared")} style={{ ...styles.chip, ...(band === "infrared" ? styles.chipOn : {}) }}>{t.infrared}</button>
          <button onClick={() => setBand("radio")} style={{ ...styles.chip, ...(band === "radio" ? styles.chipOn : {}) }}>{t.radio}</button>
        </div>

        <div style={{ marginTop: 10 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default SeeingThroughDust;
