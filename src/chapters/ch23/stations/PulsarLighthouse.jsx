/* ============================================================
   STATION 6 — THE PULSAR LIGHTHOUSE
   A pulsar is a rapidly spinning, highly magnetized neutron star. Radiation
   streams from its magnetic poles in narrow beams; as the star rotates, the
   beams sweep around like a LIGHTHOUSE, and each time one points at Earth we
   see a pulse. The spin is extreme because of ANGULAR-MOMENTUM conservation:
   collapsing the radius ~100,000× speeds rotation from once a month to
   hundreds of times a second. Jocelyn Bell found the first pulsar in 1967; the
   Crab pulsar is the heart of SN 1054. Only neutron stars whose beams cross
   Earth are seen, and MILLISECOND PULSARS are old ones spun back up by
   accretion. Grounded in Ch.23.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The pulsar lighthouse",
    kind: "A spinning magnetic beacon",
    lede: "Slow or speed the spin. Beams sweep from the magnetic poles; each time one points at Earth, a pulse is recorded. Shrink a star and angular momentum makes it whirl.",
    thread: "THE STORY CONTINUES",
    threadText: "The crushed core keeps every scrap of its spin. Shrunk a hundred thousand times, it whirls hundreds of times a second — a magnetic beacon raking the galaxy with beams of light.",
    key: "A SPINNING MAGNETIC LIGHTHOUSE — SPUN UP, THEN RECYCLED",
    keyText: "A PULSAR is a fast-spinning, strongly magnetized neutron star. Radiation pours out of its magnetic poles in two narrow beams; as the star rotates, the beams sweep around like a LIGHTHOUSE, and we record a PULSE each time one crosses Earth. The spin is so fast because of ANGULAR-MOMENTUM conservation: shrinking the radius about 100,000× (from thousands of km to ~10 km) accelerates rotation from roughly once a month to hundreds of times a second. Jocelyn Bell discovered the first pulsar in 1967; the Crab pulsar lies at the heart of SN 1054. We see only the small fraction of the Galaxy's ~100 million neutron stars whose beams happen to sweep across Earth — and MILLISECOND PULSARS are old, slowed pulsars that have been 'recycled,' spun back up by accretion from a companion.",
    spin: "Spin rate",
    slow: "slow", fast: "fast (ms pulsar)",
    beamLbl: "radiation beam", earthLbl: "Earth", pulses: "pulses recorded",
    bell: "Jocelyn Bell (1967) · Crab pulsar = SN 1054",
    recycled: "old pulsars slow down; accretion can 'recycle' them to ms spin",
    note: "A pulsar is a spinning magnetized neutron star beaming radiation from its poles; each sweep across Earth is a pulse. Angular momentum makes the shrunken core spin hundreds of times a second. Only beamed ones are seen, and accretion can recycle an old pulsar to millisecond spin.",
  },
  ja: {
    title: "パルサーの灯台",
    kind: "回転する磁気の灯台",
    lede: "回転を遅く、または速くしよう。磁極からビームが掃き出され、地球を指すたびにパルスが記録されます。星を縮めると角運動量が渦を巻かせます。",
    thread: "物語はつづく",
    threadText: "押しつぶされた核は、その回転のかけらすべてを保ちます。10万分の1に縮んだそれは、1秒に数百回も渦を巻く——銀河を光のビームで掃く磁気の灯台です。",
    key: "回転する磁気の灯台——加速され、そして再生される",
    keyText: "パルサーは、高速回転し強く磁化した中性子星です。磁極から2本の細いビームとなって放射が流れ出し、星の回転につれてビームは灯台のように掃き出され、地球を横切るたびにパルスが記録されます。回転がこれほど速いのは角運動量の保存のためです：半径を約10万分の1に縮める（数千kmから約10 kmへ）と、回転はおよそ1か月に1回から1秒に数百回へと加速します。ジョスリン・ベルは1967年に最初のパルサーを発見しました；かにパルサーはSN 1054の中心にあります。銀河系の約1億個の中性子星のうち、ビームがたまたま地球を横切るごく一部しか見えません——そしてミリ秒パルサーは、伴星からの降着で「再生」され、再び加速された古く遅いパルサーです。",
    spin: "回転速度",
    slow: "遅い", fast: "速い（msパルサー）",
    beamLbl: "放射のビーム", earthLbl: "地球", pulses: "記録されたパルス",
    bell: "ジョスリン・ベル（1967）・かにパルサー＝SN 1054",
    recycled: "古いパルサーは遅くなる；降着で「再生」されミリ秒回転に戻る",
    note: "パルサーは回転する磁化した中性子星で、極から放射をビームとして放ち、地球を掃くたびにパルスになります。角運動量が縮んだ核を1秒に数百回回転させます。ビームが当たるものしか見えず、降着は古いパルサーをミリ秒回転に再生できます。",
  },
};

function draw(ctx, cw, H, ang, spin, pulseTrain, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.32, cy = H * 0.40, nsR = 20;

  // magnetic axis offset from spin axis; beams along +/- magnetic axis
  const tilt = 0.5; // radians offset
  const beamAng = ang; // rotating
  // draw two beams (cones)
  for (let s = -1; s <= 1; s += 2) {
    const a = beamAng + (s < 0 ? Math.PI : 0);
    const len = Math.min(cw, H) * 0.5;
    const spread = 0.16;
    const gx = cx + Math.cos(a) * len, gy = cy + Math.sin(a) * len;
    const grad = ctx.createLinearGradient(cx, cy, gx, gy);
    grad.addColorStop(0, "rgba(99,211,240,0.55)"); grad.addColorStop(1, "rgba(99,211,240,0)");
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a - spread) * len, cy + Math.sin(a - spread) * len);
    ctx.lineTo(cx + Math.cos(a + spread) * len, cy + Math.sin(a + spread) * len);
    ctx.closePath(); ctx.fill();
  }
  // neutron star
  const g = ctx.createRadialGradient(cx - 6, cy - 6, 2, cx, cy, nsR);
  g.addColorStop(0, "#ffffff"); g.addColorStop(0.6, "#cfe0ff"); g.addColorStop(1, "#6f8fd8");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, nsR, 0, Math.PI * 2); ctx.fill();
  // magnetic field hint (dashed ellipse)
  ctx.strokeStyle = "rgba(201,139,255,0.5)"; ctx.lineWidth = 1; ctx.setLineDash([3, 4]);
  ctx.beginPath(); ctx.ellipse(cx, cy, nsR + 14, nsR + 8, beamAng, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = C.cool; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.beamLbl, cx, cy + nsR + 26);

  // Earth at right; detect when beam points toward it (angle near 0)
  const ex = cw - 48, ey = cy;
  // pointing: compute whether either beam direction aligns with +x
  const toE = Math.atan2(ey - cy, ex - cx);
  const d1 = Math.abs(((beamAng - toE + Math.PI) % (Math.PI * 2)) - Math.PI);
  const d2 = Math.abs(((beamAng + Math.PI - toE + Math.PI) % (Math.PI * 2)) - Math.PI);
  const hit = Math.min(d1, d2) < 0.18;
  ctx.fillStyle = hit ? "#9fe4ff" : "#3b7fd0";
  ctx.beginPath(); ctx.arc(ex, ey, 10, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#9bd0ff"; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.earthLbl, ex, ey + 24);

  // pulse train at the bottom
  const x0 = 20, x1 = cw - 20, by = H - 20, bh = 34;
  ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(x0, by); ctx.lineTo(x1, by); ctx.stroke();
  ctx.strokeStyle = C.sun; ctx.lineWidth = 1.5; ctx.beginPath();
  for (let i = 0; i < pulseTrain.length; i++) {
    const x = x1 - (pulseTrain.length - 1 - i) * ((x1 - x0) / pulseTrain.length);
    const y = by - pulseTrain[i] * bh;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.fillStyle = C.sun; ctx.font = `10px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(t.pulses, x0, by - bh - 4);
}

export function PulsarLighthouse() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 290;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [spin, setSpin] = useState(0.06);
  const spinRef = useRef(0.06); spinRef.current = spin;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    const train = new Array(90).fill(0);
    let ang = 0;
    if (reduceMotion) { draw(ctx, cw, H, 0.3, spinRef.current, train, lang); return; }
    let raf;
    const loop = () => {
      ang += spinRef.current;
      // compute pulse value based on alignment toward +x (Earth)
      const cx = cw * 0.32, cy = H * 0.40;
      const toE = Math.atan2(0, 1);
      const d1 = Math.abs(((ang - toE + Math.PI) % (Math.PI * 2)) - Math.PI);
      const d2 = Math.abs(((ang + Math.PI - toE + Math.PI) % (Math.PI * 2)) - Math.PI);
      const hit = Math.min(d1, d2);
      const v = clamp(1 - hit / 0.3, 0, 1);
      train.push(v); train.shift();
      draw(ctx, cw, H, ang, spinRef.current, train, lang);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 06</div>
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

        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "4px 0 10px" }}>
          <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.slow}</span>
          <input type="range" min="0.02" max="0.3" step="0.005" value={spin}
            onChange={(e) => setSpin(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
          <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, whiteSpace: "nowrap" }}>{t.fast}</span>
        </div>

        <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />

        <div style={{ fontFamily: mono, fontSize: 11.5, color: C.cool, marginTop: 8 }}>{t.bell}</div>
        <div style={{ fontFamily: mono, fontSize: 11.5, color: C.sun, marginTop: 4 }}>{t.recycled}</div>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default PulsarLighthouse;
