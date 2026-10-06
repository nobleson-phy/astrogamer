/* ============================================================
   STATION 1 — STELLAR NURSERIES
   Almost all stars are born in cold, dense GIANT MOLECULAR CLOUDS. A cloud
   can sit quietly until a trigger — often a shock wave from a nearby
   supernova or an expanding H II region — COMPRESSES its dense gas. The
   compression lets gravity overcome the gas pressure, starting a collapse.
   New stars then shock the next region, so star formation propagates across
   the cloud. Grounded in Ch.21 §21.1.
   ============================================================ */
import React, { useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Stellar nurseries",
    kind: "Where a shock lights the fuse",
    lede: "Watch a shock wave sweep across a molecular cloud. Where it compresses the gas, gravity takes over and new stars switch on — one triggering the next.",
    thread: "THE STORY BEGINS",
    threadText: "Stars are not born alone or at random. They form in great cold clouds, in bursts, often set off by the violent death of a star that came before.",
    key: "GIANT MOLECULAR CLOUDS, TRIGGERED TO COLLAPSE",
    keyText: "Almost all stars form inside cold, dense GIANT MOLECULAR CLOUDS. Such a cloud can hang in balance until something triggers collapse. A shock wave — from a nearby supernova, or from the expanding bubble of a hot H II region — sweeps through and COMPRESSES the dense gas at the cloud's edge. That compression tips the balance: gravity overcomes the internal gas pressure and the gas collapses to form new stars. Those new stars drive their own shocks into the next part of the cloud, so star formation can propagate across a whole molecular cloud in a chain.",
    shock: "shock wave compresses gas", collapse: "gravity > pressure → stars form",
    note: "Stars form in cold giant molecular clouds. A shock wave (from a supernova or H II region) compresses the gas so gravity beats pressure — and new stars shock the next region, propagating star formation.",
  },
  ja: {
    title: "星のゆりかご",
    kind: "衝撃波が導火線に火をつける",
    lede: "衝撃波が分子雲を掃いていく様子を見よう。ガスを圧縮したところで重力が主導権を握り、新しい星が点灯します——一つが次を引き起こして。",
    thread: "物語のはじまり",
    threadText: "星は単独でも無作為にも生まれません。大きな冷たい雲の中で一斉に形成され、しばしば先に生まれた星の激しい死によって引き起こされます。",
    key: "巨大分子雲、収縮を引き起こされる",
    keyText: "ほとんどすべての星は、冷たく密な巨大分子雲の中で形成されます。そのような雲は、何かが収縮を引き起こすまで釣り合いを保っています。衝撃波——近くの超新星や、高温のH II領域の膨張する泡から——が通り抜け、雲の端の密なガスを圧縮します。その圧縮が均衡を崩します：重力が内部のガス圧に打ち勝ち、ガスが収縮して新しい星を作ります。その新しい星が雲の次の部分に自らの衝撃波を送るので、星形成は分子雲全体に連鎖的に伝播しうるのです。",
    shock: "衝撃波がガスを圧縮", collapse: "重力 > 圧力 → 星が形成",
    note: "星は冷たい巨大分子雲で形成されます。（超新星やH II領域からの）衝撃波がガスを圧縮して重力が圧力に勝ち——新しい星が次の領域を衝撃し、星形成が伝播します。",
  },
};

function draw(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // molecular cloud band
  const cy = H * 0.44;
  ctx.fillStyle = "rgba(70,55,80,0.4)"; ctx.fillRect(0, cy - 55, cw, 110);
  for (let i = 0; i < 70; i++) { ctx.fillStyle = "rgba(50,40,60,0.5)"; ctx.beginPath(); ctx.arc((i * 83) % cw, cy - 50 + ((i * 47) % 100), 3, 0, Math.PI * 2); ctx.fill(); }
  // shock front sweeping left to right
  const cyc = tt % 320, p = cyc / 320;
  const sx = p * cw;
  const sg = ctx.createLinearGradient(sx - 40, 0, sx, 0); sg.addColorStop(0, "rgba(255,150,90,0)"); sg.addColorStop(1, "rgba(255,180,120,0.5)");
  ctx.fillStyle = sg; ctx.fillRect(sx - 40, cy - 55, 40, 110);
  ctx.strokeStyle = "rgba(255,200,140,0.8)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(sx, cy - 55); ctx.lineTo(sx, cy + 55); ctx.stroke();
  // compressed denser gas just ahead of the shock
  ctx.fillStyle = "rgba(120,95,130,0.6)"; ctx.fillRect(sx, cy - 20, 16, 40);
  // new stars light up behind the shock
  const nStars = Math.floor(p * 6);
  for (let i = 0; i < nStars; i++) { const x = (i + 0.5) / 6 * cw; const g = ctx.createRadialGradient(x, cy, 1, x, cy, 10); g.addColorStop(0, "#fff"); g.addColorStop(1, "rgba(255,220,150,0)"); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, cy, 10, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = "#ffe08a"; ctx.beginPath(); ctx.arc(x, cy, 3.5, 0, Math.PI * 2); ctx.fill(); }
  ctx.fillStyle = "rgba(255,200,140,0.95)"; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.shock, Math.min(sx, cw - 60), cy - 64 < 10 ? 10 : cy - 64);
  ctx.fillStyle = C.good; ctx.fillText(t.collapse, cw / 2, H - 12);
}

export function StellarNurseries() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 240;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, 180, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

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

        <div style={{ marginTop: 4 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default StellarNurseries;
