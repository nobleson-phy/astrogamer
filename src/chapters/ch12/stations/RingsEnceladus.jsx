/* ============================================================
   STATION 6 — WHERE RINGS COME FROM
   Not all rings are alike. Saturn's tiny moon Enceladus jets water-ice
   from south-polar geysers, and that spray feeds Saturn's broad, faint
   E ring — a ring being actively resupplied by a moon. Uranus and
   Neptune, by contrast, have narrow, dark rings of carbon-rich (not
   icy) particles, kept sharp by small shepherd moons. Grounded in
   Ch.12 §12.3–12.4.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Where rings come from",
    kind: "Geysers, and dark narrow rings",
    lede: "Saturn's bright ice rings are not the only kind. Watch tiny Enceladus spray ice that becomes a whole ring — then compare the thin, sooty rings of the ice giants.",
    thread: "THE STORY CONTINUES",
    threadText: "Rings are not permanent monuments; they are made, fed, and shaped. One faint ring of Saturn is being sprayed into existence right now by a moon — while the outer giants wear rings of a completely different colour.",
    key: "ENCELADUS FEEDS THE E RING; URANUS & NEPTUNE ARE DARK",
    keyText: "Saturn's small moon ENCELADUS erupts fountains of water ice from geysers at its south pole. That icy spray escapes into orbit and forms Saturn's broad, faint E RING — a ring actively resupplied by its moon. The rings of Uranus and Neptune are utterly different: narrow, and very DARK, made of carbon-rich (not bright icy) particles. These thin rings are kept from spreading out by small 'shepherd' moons whose gravity confines the ring particles to a tight band.",
    tab1: "Enceladus → E ring", tab2: "Uranus / Neptune rings",
    geyser: "geysers of water ice", ering: "faint, broad E ring",
    narrow: "narrow, dark carbon rings", shep: "shepherd moon", shep2: "shepherd moon",
    noteEnc: "Enceladus's south-polar geysers spray water ice into orbit, and that spray continuously resupplies Saturn's broad, faint E ring — a ring being built by its own moon right now.",
    noteGiant: "Uranus and Neptune have narrow, very dark rings of carbon-rich (not icy) particles. Small 'shepherd' moons on either side confine each ring with their gravity, keeping it from spreading out.",
  },
  ja: {
    title: "環はどこから来るのか",
    kind: "間欠泉と、暗く細い環",
    lede: "土星の明るい氷の環だけが環ではありません。小さなエンケラドスが氷を噴き、それが丸ごと環になる様子を見て——氷惑星の細くすすけた環と比べよう。",
    thread: "物語はつづく",
    threadText: "環は永遠の記念碑ではなく、作られ、養われ、形づくられます。土星のかすかな環の一つは、今まさに衛星によって噴き上げられて作られています——一方、外側の巨人はまったく違う色の環をまとっています。",
    key: "エンケラドスがE環を養う。天王星・海王星は暗い",
    keyText: "土星の小さな衛星エンケラドスは、南極の間欠泉から水の氷の噴水を吹き上げます。その氷の飛沫が軌道に逃れて、土星の広くかすかなE環——衛星に絶えず補給される環——を作ります。天王星と海王星の環はまったく異なります：細く、とても暗く、炭素に富む（明るい氷ではない）粒子でできています。これらの細い環は、小さな「羊飼い衛星」の重力が粒子を狭い帯に閉じ込めることで、広がらずに保たれています。",
    tab1: "エンケラドス → E環", tab2: "天王星・海王星の環",
    geyser: "水の氷の間欠泉", ering: "かすかで広いE環",
    narrow: "細く暗い炭素の環", shep: "羊飼い衛星", shep2: "羊飼い衛星",
    noteEnc: "エンケラドスの南極の間欠泉が水の氷を軌道へ噴き上げ、その飛沫が土星の広くかすかなE環を絶えず補給します——衛星自身が今まさに作りつづけている環です。",
    noteGiant: "天王星と海王星は、炭素に富む（氷ではない）粒子でできた、細くとても暗い環をもちます。両側の小さな「羊飼い衛星」が重力で各環を囲い込み、広がらないように保っています。",
  },
};

function draw(ctx, cw, H, mode, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2;
  if (mode === "enceladus") {
    // Saturn small at left, broad faint E ring, Enceladus embedded spraying ice
    const sx = cw * 0.24, sy = cy, sR = H * 0.16, yS = 0.34;
    // broad faint E ring
    for (let k = 0; k < 260; k++) {
      const rr = sR * (2.2 + (k % 40) / 40 * 1.4);
      const a = (k * 0.7 + tt * 0.004) % (Math.PI * 2);
      const x = sx + Math.cos(a) * rr, y = sy + Math.sin(a) * rr * yS;
      ctx.fillStyle = "rgba(160,210,255,0.14)"; ctx.fillRect(x, y, 1.6, 1.6);
    }
    // Saturn
    const g = ctx.createRadialGradient(sx - sR * 0.3, sy - sR * 0.3, sR * 0.2, sx, sy, sR);
    g.addColorStop(0, "#e8d5a8"); g.addColorStop(1, "#b89a5e");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sx, sy, sR, 0, Math.PI * 2); ctx.fill();
    // Enceladus on its orbit in the ring, with geysers
    const eR = sR * 2.9, ea = tt * 0.01;
    const ex = sx + Math.cos(ea) * eR, ey = sy + Math.sin(ea) * eR * yS;
    ctx.fillStyle = "#eef4fb"; ctx.beginPath(); ctx.arc(ex, ey, 6, 0, Math.PI * 2); ctx.fill();
    for (let j = 0; j < 14; j++) {
      const sp = (tt * 0.9 + j * 7) % 40;
      ctx.fillStyle = `rgba(180,220,255,${0.6 - sp / 60})`;
      ctx.beginPath(); ctx.arc(ex + (Math.random() - 0.5) * sp * 0.5, ey + 6 + sp, 1.4, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = C.cool; ctx.font = `10px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(t.geyser, ex, ey + 46);
    ctx.fillStyle = "rgba(160,210,255,0.9)"; ctx.fillText(t.ering, sx + sR * 3.2, sy - sR * 3 * yS - 6);
  } else {
    // ice giant with a narrow dark ring flanked by two shepherd moons
    const pR = H * 0.2;
    const pg = ctx.createRadialGradient(cx - pR * 0.3, cy - pR * 0.3, pR * 0.2, cx, cy, pR);
    pg.addColorStop(0, "#7fc7d8"); pg.addColorStop(1, "#3a7f96");
    ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(cx, cy, pR, 0, Math.PI * 2); ctx.fill();
    const yS = 0.3, rr = pR * 1.9;
    // narrow dark ring
    ctx.strokeStyle = "rgba(40,38,44,0.95)"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.ellipse(cx, cy, rr, rr * yS, 0, 0, Math.PI * 2); ctx.stroke();
    // dark particles
    for (let k = 0; k < 120; k++) {
      const a = (k * 0.52 + tt * 0.006) % (Math.PI * 2);
      const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr * yS;
      ctx.fillStyle = "rgba(70,66,74,0.9)"; ctx.fillRect(x, y, 1.6, 1.6);
    }
    // two shepherd moons just inside and outside
    [[rr * 0.9, tt * 0.012], [rr * 1.12, tt * 0.009 + 1]].forEach(([sr, sa]) => {
      const x = cx + Math.cos(sa) * sr, y = cy + Math.sin(sa) * sr * yS;
      ctx.fillStyle = "#c9c2b4"; ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "rgba(255,207,107,0.6)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.stroke();
    });
    ctx.fillStyle = C.text; ctx.font = `10px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(t.narrow, cx, cy + rr * yS + 24);
    ctx.fillStyle = C.sun; ctx.fillText(t.shep, cx - rr, cy - 10);
  }
}

export function RingsEnceladus() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("enceladus");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, mode, 40, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, mode, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, mode, lang]);

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

        <div style={styles.pickerRow}>
          {[["enceladus", t.tab1], ["giants", t.tab2]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{mode === "enceladus" ? t.noteEnc : t.noteGiant}</p>
      </div>
    </div>
  );
}

export default RingsEnceladus;
