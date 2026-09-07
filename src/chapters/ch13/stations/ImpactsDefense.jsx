/* ============================================================
   STATION 7 — IMPACTS & PLANETARY DEFENSE
   Three views of cosmic collisions. Tunguska (1908): an airburst over
   a Siberian river valley flattened hundreds of km² of forest. The
   Moon vs Earth: the airless Moon preserves its craters while Earth's
   erosion and plate tectonics erase them — so we read the Moon to
   count Earth-approaching asteroids. Shoemaker-Levy 9 (1994): a comet
   torn apart by Jupiter's tides then struck it. The Spaceguard Survey
   maps impactors decades ahead. Grounded in Ch.13 §13.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Impacts & planetary defense",
    kind: "Reading the record, watching the sky",
    lede: "Impacts are rare but real. Step through three lessons: a Siberian airburst, why we count craters on the Moon, and the comet that hit Jupiter while we watched.",
    thread: "THE STORY CONTINUES",
    threadText: "The solar system is still a shooting gallery. Most collisions are ancient history — but not all. To protect ourselves, we first have to know what's out there, and how often it strikes.",
    key: "FIND THEM EARLY — THE SPACEGUARD SURVEY",
    keyText: "In 1908 an asteroid or comet exploded in the air over the Tunguska River valley in Siberia, flattening hundreds of square kilometers of unpopulated forest without leaving a crater. To gauge how often such strikes happen, astronomers count craters on the airless Moon — because Earth's weathering, erosion, and plate tectonics erase craters, while the Moon preserves its full bombardment history. In 1994 we watched Comet Shoemaker-Levy 9 break apart under Jupiter's tidal forces and slam into the planet. The Spaceguard Survey was organized to find 90%+ of near-Earth asteroids larger than 1 km — because mapping impactors decades in advance is what would give humanity time to deflect one.",
    tab1: "Tunguska airburst", tab2: "Why the Moon?", tab3: "Shoemaker-Levy 9",
    tunguska: "1908 airburst — forest flattened, no crater",
    moonL: "Moon: craters preserved", earthL: "Earth: craters erased by erosion",
    sl9: "1994 — fragments strike Jupiter",
    noteT: "The 1908 Tunguska airburst flattened hundreds of km² of forest. We count craters on the airless Moon (Earth erodes its own), and in 1994 SL9 hit Jupiter. Spaceguard hunts impactors early.",
  },
  ja: {
    title: "衝突と惑星防衛",
    kind: "記録を読み、空を見張る",
    lede: "衝突はまれですが本物です。3つの教訓を順に見よう：シベリアの空中爆発、なぜ月のクレーターを数えるのか、そして私たちが見守る中で木星に衝突した彗星。",
    thread: "物語はつづく",
    threadText: "太陽系は今も射的場です。ほとんどの衝突は大昔の話——でもすべてではありません。身を守るには、まず何がそこにあり、どれくらいの頻度で衝突するかを知る必要があります。",
    key: "早く見つける——スペースガード・サーベイ",
    keyText: "1908年、小惑星か彗星がシベリアのツングースカ川の谷の上空で爆発し、クレーターを残さずに無人の森林数百平方キロメートルをなぎ倒しました。こうした衝突の頻度を測るため、天文学者は空気のない月のクレーターを数えます——地球の風化・侵食・プレートテクトニクスがクレーターを消すのに対し、月は衝突の全歴史を保つからです。1994年には、シューメーカー・レビー第9彗星が木星の潮汐力で分裂し、惑星に激突するのを目撃しました。スペースガード・サーベイは、1 kmより大きい地球近傍小惑星の90%以上を発見するために組織されました——衝突天体を数十年前に把握することこそが、軌道を変える時間を人類に与えるからです。",
    tab1: "ツングースカ空中爆発", tab2: "なぜ月？", tab3: "シューメーカー・レビー第9",
    tunguska: "1908年の空中爆発——森林がなぎ倒され、クレーターなし",
    moonL: "月：クレーターが保存される", earthL: "地球：侵食でクレーターが消える",
    sl9: "1994年——破片が木星に衝突",
    noteT: "1908年のツングースカ空中爆発は森林数百km²をなぎ倒しました。空気のない月のクレーターを数え（地球は自分のを侵食する）、1994年にSL9が木星に衝突。スペースガードは衝突天体を早く探します。",
  },
};

function draw(ctx, cw, H, mode, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2;
  if (mode === "tunguska") {
    // ground line
    const gy = H * 0.72;
    ctx.fillStyle = "#1a2418"; ctx.fillRect(0, gy, cw, H - gy);
    // incoming meteor before burst; burst flash; shockwave after
    const cyc = tt % 200;
    const burstX = cx, burstY = H * 0.4;
    if (cyc < 60) {
      // streak in
      const p = cyc / 60;
      const mx = cw * 0.15 + p * (burstX - cw * 0.15), my = H * 0.1 + p * (burstY - H * 0.1);
      ctx.strokeStyle = "rgba(255,200,120,0.8)"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(mx - 20, my - 14); ctx.lineTo(mx, my); ctx.stroke();
      ctx.fillStyle = "#ffd88a"; ctx.beginPath(); ctx.arc(mx, my, 3, 0, Math.PI * 2); ctx.fill();
    } else {
      // airburst flash + expanding shockwave ring above ground
      const p = (cyc - 60) / 140;
      const fg = ctx.createRadialGradient(burstX, burstY, 2, burstX, burstY, 30 + p * 10);
      fg.addColorStop(0, `rgba(255,240,190,${0.9 - p})`); fg.addColorStop(1, "rgba(255,180,80,0)");
      ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(burstX, burstY, 30 + p * 10, 0, Math.PI * 2); ctx.fill();
      // shockwave
      ctx.strokeStyle = `rgba(255,210,150,${0.6 * (1 - p)})`; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(burstX, burstY, p * cw * 0.5, 0, Math.PI * 2); ctx.stroke();
    }
    // flattened trees radiating from below the burst
    for (let i = -8; i <= 8; i++) {
      const bx = cx + i * (cw * 0.5 / 9);
      const lean = Math.sign(i) * Math.min(Math.abs(i) * 0.12 + 0.3, 1.2);
      const fallen = cyc > 80;
      ctx.strokeStyle = "#3a5a30"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(bx, gy);
      if (fallen) ctx.lineTo(bx + Math.sin(lean) * 16, gy - Math.cos(lean) * 8);
      else ctx.lineTo(bx, gy - 16);
      ctx.stroke();
    }
    ctx.fillStyle = C.sun; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.tunguska, cx, H - 8);
  } else if (mode === "moon") {
    // two worlds side by side
    const r = Math.min(cw * 0.18, H * 0.34);
    const mX = cw * 0.28, eX = cw * 0.72;
    // Moon (many craters)
    let g = ctx.createRadialGradient(mX - r * 0.3, cy - r * 0.3, r * 0.2, mX, cy, r);
    g.addColorStop(0, "#b8b4ac"); g.addColorStop(1, "#6e6a62");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(mX, cy, r, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.arc(mX, cy, r, 0, Math.PI * 2); ctx.clip();
    const seed = [[-.4,-.3,.14],[.3,.35,.12],[-.15,.4,.09],[.45,-.2,.1],[-.5,.05,.08],[.1,-.45,.09],[.2,.1,.07],[-.25,-.05,.06],[.4,.3,.06]];
    seed.forEach(([dx,dy,rr])=>{ctx.fillStyle="rgba(60,58,52,0.5)";ctx.beginPath();ctx.arc(mX+dx*r,cy+dy*r,rr*r,0,Math.PI*2);ctx.fill();ctx.strokeStyle="rgba(200,196,188,0.3)";ctx.lineWidth=1;ctx.stroke();});
    ctx.restore();
    ctx.fillStyle = C.text; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.moonL, mX, cy + r + 20);
    // Earth (blue/green, few craters — eroded)
    g = ctx.createRadialGradient(eX - r * 0.3, cy - r * 0.3, r * 0.2, eX, cy, r);
    g.addColorStop(0, "#4a86c0"); g.addColorStop(1, "#1f4a72");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(eX, cy, r, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.arc(eX, cy, r, 0, Math.PI * 2); ctx.clip();
    ctx.fillStyle = "rgba(80,150,90,0.8)";
    [[-.3,-.2,.5],[.35,.3,.45],[.1,-.4,.35]].forEach(([dx,dy,rr])=>{ctx.beginPath();ctx.ellipse(eX+dx*r,cy+dy*r,rr*r,rr*r*0.7,0.3,0,Math.PI*2);ctx.fill();});
    // clouds
    ctx.fillStyle = "rgba(255,255,255,0.4)"; [[-.1,.1,.3],[.2,-.2,.25]].forEach(([dx,dy,rr])=>{ctx.beginPath();ctx.ellipse(eX+dx*r,cy+dy*r,rr*r,rr*r*0.4,0,0,Math.PI*2);ctx.fill();});
    ctx.restore();
    ctx.fillStyle = C.text; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.earthL, eX, cy + r + 20);
  } else {
    // SL9: Jupiter at right, string of fragments approaching and impacting
    const jx = cw * 0.7, jR = H * 0.34;
    ctx.save(); ctx.beginPath(); ctx.arc(jx, cy, jR, 0, Math.PI * 2); ctx.clip();
    for (let i = 0; i < 9; i++) { ctx.fillStyle = i % 2 ? "#c98a4a" : "#e0b878"; ctx.fillRect(jx - jR, cy - jR + (i / 9) * 2 * jR, 2 * jR, 2 * jR / 9 + 1); }
    // impact scars accumulate along lower-left limb
    const scars = Math.min(6, Math.floor((tt % 300) / 40));
    for (let i = 0; i < scars; i++) {
      const a = Math.PI * (0.75 + i * 0.06);
      ctx.fillStyle = "rgba(40,25,15,0.75)"; ctx.beginPath();
      ctx.arc(jx + Math.cos(a) * jR * 0.92, cy + Math.sin(a) * jR * 0.92, 6, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
    ctx.strokeStyle = "rgba(230,200,150,0.3)"; ctx.beginPath(); ctx.arc(jx, cy, jR, 0, Math.PI * 2); ctx.stroke();
    // string-of-pearls fragments incoming from left
    const prog = (tt % 300) / 300;
    for (let i = 0; i < 7; i++) {
      const fx = cw * 0.08 + i * 22 + prog * (jx - jR - cw * 0.08);
      if (fx > jx - jR) continue;
      ctx.fillStyle = "#dfe8ee"; ctx.beginPath(); ctx.arc(fx, cy + jR * 0.4, 3, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "rgba(200,225,255,0.3)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(fx - 8, cy + jR * 0.4); ctx.lineTo(fx, cy + jR * 0.4); ctx.stroke();
    }
    ctx.fillStyle = C.sun; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.sl9, cw * 0.5, H - 8);
  }
}

export function ImpactsDefense() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("tunguska");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, mode === "moon" ? 0 : 120, mode, lang); return; }
    if (mode === "moon") { draw(ctx, cw, H, mode, 0, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, mode, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, mode, lang]);

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
          <div style={{ ...styles.fateLabel, color: C.sun }}>{t.key}</div>
          <p style={styles.keyTermText}>{t.keyText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          {[["tunguska", t.tab1], ["moon", t.tab2], ["sl9", t.tab3]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.noteT}</p>
      </div>
    </div>
  );
}

export default ImpactsDefense;
