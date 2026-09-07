/* ============================================================
   STATION 4 — TITAN
   Saturn's moon Titan has a thick atmosphere — mostly NITROGEN, with
   methane — and 1.6 bar of surface pressure. It holds that air
   because it is so cold: gas molecules move slowly and cannot escape
   its gravity (unlike similar-sized Ganymede). Its orange haze hides
   the surface from visible light, so we use radar and infrared; the
   Huygens probe (carried by Cassini) landed in 2005.
   Grounded in Ch.12 §12.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Titan",
    kind: "A hazy moon with real weather",
    lede: "Titan is wrapped in a thick orange smog thicker than Earth's own air. Switch from visible light — which sees only haze — to radar, and the hidden surface of lakes appears.",
    thread: "THE STORY CONTINUES",
    threadText: "Most moons are airless. Titan is the great exception: a world with a dense nitrogen atmosphere, clouds, rain and lakes — but of methane, not water. To see it at all, we had to change how we look.",
    key: "A THICK NITROGEN ATMOSPHERE, KEPT BY THE COLD",
    keyText: "Titan's atmosphere is mostly nitrogen (like Earth's) with methane, and presses down at 1.6 bar — denser than Earth's. Why does Titan keep a thick atmosphere when the similar-sized moon Ganymede has almost none? Because Titan is far colder: its gas molecules move too slowly to reach escape velocity, so its gravity holds them. A thick orange photochemical haze hides the surface from visible light, so we study it with radar and infrared, whose longer wavelengths pass through the haze. The Huygens probe, carried by Cassini, parachuted to Titan's surface in January 2005.",
    visible: "Visible light", radar: "Radar / infrared",
    haze: "orange haze — surface hidden", lakes: "methane lakes revealed",
    huygens: "Huygens probe landed · Jan 2005",
    note: "Titan keeps a 1.6-bar nitrogen atmosphere because the cold slows its gas molecules below escape speed. Radar and infrared see through the haze to methane lakes — where Huygens landed in 2005.",
  },
  ja: {
    title: "タイタン",
    kind: "本物の気象をもつもやの衛星",
    lede: "タイタンは地球の大気より厚いオレンジ色のスモッグに包まれています。もやしか見えない可視光から、レーダーに切り替えると、湖のある隠れた地表が現れます。",
    thread: "物語はつづく",
    threadText: "ほとんどの衛星に大気はありません。タイタンは大きな例外です：濃い窒素の大気、雲、雨、湖をもつ世界——ただし水ではなくメタンの。それを見るために、私たちは見方を変えねばなりませんでした。",
    key: "冷たさが保つ、濃い窒素の大気",
    keyText: "タイタンの大気は（地球のように）大半が窒素で、メタンを含み、1.6気圧——地球より濃い——で押します。似た大きさのガニメデにほとんど大気がないのに、なぜタイタンは濃い大気を保つのか？はるかに冷たいからです：ガス分子が遅すぎて脱出速度に達せず、重力が引き留めます。厚いオレンジ色の光化学もやが地表を可視光から隠すので、もやを通り抜ける長波長のレーダーと赤外線で調べます。カッシーニが運んだホイヘンス・プローブが、2005年1月にタイタンの地表へパラシュート降下しました。",
    visible: "可視光", radar: "レーダー／赤外線",
    haze: "オレンジのもや——地表は隠れる", lakes: "メタンの湖が現れる",
    huygens: "ホイヘンス着陸 · 2005年1月",
    note: "タイタンは、冷たさがガス分子を脱出速度以下に遅くするため、1.6気圧の窒素大気を保ちます。レーダーと赤外線はもやを貫き、メタンの湖——2005年にホイヘンスが着陸した場所——を見せます。",
  },
};

function draw(ctx, cw, H, mode, tt) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2, R = Math.min(cw * 0.3, H * 0.44);
  if (mode === "visible") {
    // hazy orange ball, featureless
    const g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.2, cx, cy, R);
    g.addColorStop(0, "#e8b46a"); g.addColorStop(1, "#c07a2a");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
    // haze halo
    ctx.strokeStyle = "rgba(240,180,110,0.4)"; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(cx, cy, R + 6, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = C.sun; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(STR.en.haze, cx, cy + R + 24);
  } else {
    // radar view: dark surface with bright-edged methane lakes
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip();
    ctx.fillStyle = "#3a3a44"; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
    // lakes near the (top) pole
    const lakes = [[-0.2, -0.5, 0.28], [0.25, -0.4, 0.2], [0.0, -0.25, 0.14], [-0.35, -0.2, 0.12]];
    lakes.forEach(([dx, dy, rr]) => { ctx.fillStyle = "#12121a"; ctx.beginPath(); ctx.ellipse(cx + dx * R, cy + dy * R, rr * R, rr * R * 0.7, 0.3, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = "rgba(120,200,255,0.6)"; ctx.lineWidth = 1.5; ctx.stroke(); });
    // rough terrain speckle
    for (let i = 0; i < 120; i++) { ctx.fillStyle = `rgba(200,200,210,${Math.random() * 0.15})`; ctx.fillRect(cx - R + Math.random() * 2 * R, cy - R + Math.random() * 2 * R, 2, 2); }
    ctx.restore();
    ctx.strokeStyle = "rgba(150,175,230,0.35)"; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = C.cool; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(STR.en.lakes, cx, cy + R + 24);
    // Huygens landing marker
    ctx.fillStyle = C.good; ctx.beginPath(); ctx.arc(cx + R * 0.1, cy + R * 0.4, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = C.good; ctx.font = `9px ${mono}`; ctx.fillText("Huygens 2005", cx + R * 0.1, cy + R * 0.4 - 8);
  }
}

export function Titan() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("visible");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, mode, 0);
  }, [cw, mode, lang]);

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
          {[["visible", t.visible], ["radar", t.radar]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <div style={{ fontFamily: mono, fontSize: 12, color: C.cool, marginTop: 8 }}>{t.huygens}</div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default Titan;
