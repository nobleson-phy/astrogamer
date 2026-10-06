/* ============================================================
   STATION 3 — JETS & T TAURI STARS
   A young protostar is wrapped in a spinning circumstellar disk and fires
   high-speed JETS from its poles. Where a jet slams into surrounding gas,
   it lights up glowing knots called HERBIG-HARO (HH) OBJECTS. Low-mass
   young stars in this phase — still contracting, with strong winds and
   disks — are T TAURI STARS. The inner dust of their disks is typically
   cleared within 3-10 million years. Grounded in Ch.21 §21.2-21.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Jets & T Tauri stars",
    kind: "Disks, jets, and a countdown",
    lede: "Watch a young star fling twin jets into space and light up Herbig-Haro knots. Then slide time forward and see its planet-forming disk clear away.",
    thread: "THE STORY CONTINUES",
    threadText: "A newborn star is messy and dramatic: ringed by a disk, blasting jets, gusting winds — and racing a clock to build planets before its disk disappears.",
    jetKey: "JETS, HH OBJECTS, AND T TAURI STARS",
    jetText: "A young protostar is encircled by a spinning circumstellar disk and launches fast, narrow JETS from its two poles. Where such a jet plows into the surrounding interstellar gas, it excites bright glowing knots called HERBIG-HARO (HH) OBJECTS. A low-mass young star in this stage — one that has accreted most of its final mass and still shows strong stellar winds and a disk — is called a T TAURI STAR, after the prototype.",
    diskKey: "THE DISK CLEARS IN 3-10 MILLION YEARS",
    diskText: "The circumstellar disk is where planets form, but it does not last. Observations show that the inner dust regions of these protoplanetary disks are typically cleared within about 3 to 10 million years after star formation begins — as the material accretes onto the star, is blown away, or is swept up into growing planetesimals. Planet-building is a race against that clock.",
    jet: "Jets & HH objects", disk: "Disk clearing",
    hh: "Herbig-Haro object", ttauri: "T Tauri star + disk",
    age: "Disk age", cleared: "inner dust cleared", forming: "dusty planet-forming disk",
    noteJ: "A young star's polar jets excite glowing Herbig-Haro objects where they hit gas; such low-mass, wind-blowing, disk-bearing young stars are T Tauri stars.",
    noteD: "The planet-forming inner disk is typically cleared within 3-10 million years — so planets must assemble quickly.",
  },
  ja: {
    title: "ジェットとTタウリ星",
    kind: "円盤・ジェット・そしてカウントダウン",
    lede: "若い星が双子のジェットを宇宙へ放ち、ハービッグ・ハローの塊を光らせる様子を見よう。それから時間を進めて、惑星を作る円盤が消えるのを見よう。",
    thread: "物語はつづく",
    threadText: "生まれたての星は雑然として劇的です：円盤に囲まれ、ジェットを噴き、星風を吹き——円盤が消える前に惑星を作ろうと時計と競います。",
    jetKey: "ジェット、HH天体、そしてTタウリ星",
    jetText: "若い原始星は回転する周星円盤に囲まれ、2つの極から速く細いジェットを放ちます。そのようなジェットが周囲の星間ガスに突っ込むところで、ハービッグ・ハロー（HH）天体と呼ばれる明るく輝く塊を励起します。この段階の低質量の若い星——最終質量の大半を集め、まだ強い星風と円盤を示すもの——は、原型にちなんでTタウリ星と呼ばれます。",
    diskKey: "円盤は300万〜1,000万年で一掃される",
    diskText: "周星円盤は惑星が形成される場所ですが、長くは続きません。観測によれば、これらの原始惑星系円盤の内側の塵の領域は、星形成が始まってからおよそ300万〜1,000万年で一掃されます——物質が星に降着するか、吹き飛ばされるか、成長する微惑星に取り込まれるからです。惑星作りはその時計との競争です。",
    jet: "ジェットとHH天体", disk: "円盤の一掃",
    hh: "ハービッグ・ハロー天体", ttauri: "Tタウリ星＋円盤",
    age: "円盤の年齢", cleared: "内側の塵が一掃された", forming: "塵のある惑星形成円盤",
    noteJ: "若い星の極ジェットは、ガスに当たる所で輝くハービッグ・ハロー天体を励起します。そうした低質量で星風を吹き円盤を持つ若い星がTタウリ星です。",
    noteD: "惑星を作る内側の円盤は通常300万〜1,000万年で一掃されます——だから惑星は素早く組み上がらねばなりません。",
  },
};

function drawJet(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H / 2;
  // disk (edge-on ellipse)
  ctx.fillStyle = "rgba(180,140,90,0.35)"; ctx.beginPath(); ctx.ellipse(cx, cy, 70, 14, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "rgba(220,180,120,0.4)"; ctx.beginPath(); ctx.ellipse(cx, cy, 70, 14, 0, 0, Math.PI * 2); ctx.stroke();
  // star
  const g = ctx.createRadialGradient(cx, cy, 1, cx, cy, 16); g.addColorStop(0, "#fff"); g.addColorStop(1, "rgba(255,210,150,0)");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 16, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffe08a"; ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();
  // bipolar jets up & down with flowing knots
  [-1, 1].forEach((dir) => {
    ctx.strokeStyle = "rgba(150,200,255,0.4)"; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx, cy + dir * 14); ctx.lineTo(cx, cy + dir * (H * 0.42)); ctx.stroke();
    for (let i = 0; i < 4; i++) { const p = ((tt * 2 + i * 30) % 120) / 120; const y = cy + dir * (20 + p * (H * 0.42 - 20)); ctx.fillStyle = "rgba(180,220,255,0.7)"; ctx.beginPath(); ctx.arc(cx, y, 2.5, 0, Math.PI * 2); ctx.fill(); }
    // HH object at the end
    const hy = cy + dir * (H * 0.42);
    const hg = ctx.createRadialGradient(cx, hy, 1, cx, hy, 14); hg.addColorStop(0, "rgba(255,150,180,0.9)"); hg.addColorStop(1, "rgba(255,120,150,0)");
    ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(cx, hy, 14, 0, Math.PI * 2); ctx.fill();
  });
  ctx.fillStyle = "#ff8fb0"; ctx.font = `10px ${mono}`; ctx.textAlign = "left"; ctx.fillText(t.hh, cx + 18, cy - H * 0.38);
  ctx.fillStyle = C.cool; ctx.textAlign = "center"; ctx.fillText(t.ttauri, cx, cy + 32);
}

function drawDisk(ctx, cw, H, age, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw / 2, cy = H * 0.42;
  // star
  const g = ctx.createRadialGradient(cx, cy, 1, cx, cy, 18); g.addColorStop(0, "#fff"); g.addColorStop(1, "rgba(255,210,150,0)");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 18, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffe08a"; ctx.beginPath(); ctx.arc(cx, cy, 7, 0, Math.PI * 2); ctx.fill();
  // disk: inner clears as age passes 3..10 Myr
  const clearFrac = Math.min(Math.max((age - 3) / 7, 0), 1); // 0 at 3Myr, 1 at 10Myr
  const innerR = 24 + clearFrac * 80;
  const outerR = Math.min(cw * 0.42, 150);
  ctx.save(); ctx.beginPath(); ctx.ellipse(cx, cy, outerR, outerR * 0.3, 0, 0, Math.PI * 2); ctx.ellipse(cx, cy, innerR, innerR * 0.3, 0, 0, Math.PI * 2); ctx.clip("evenodd");
  ctx.fillStyle = "rgba(190,150,100,0.45)"; ctx.fillRect(cx - outerR, cy - outerR, 2 * outerR, 2 * outerR);
  for (let i = 0; i < 200; i++) { const a = Math.random() * Math.PI * 2, rr = innerR + Math.random() * (outerR - innerR); ctx.fillStyle = "rgba(220,180,120,0.5)"; ctx.fillRect(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.3, 1.5, 1.5); }
  ctx.restore();
  // cleared inner gap glow
  if (clearFrac > 0.05) { ctx.strokeStyle = "rgba(120,160,255,0.3)"; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.ellipse(cx, cy, innerR, innerR * 0.3, 0, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]); }
  ctx.fillStyle = age >= 10 ? C.good : C.cool; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(clearFrac >= 1 ? t.cleared : t.forming, cx, H - 12);
}

export function JetsTTauri() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("jet");
  const [age, setAge] = useState(1);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (mode === "disk") { drawDisk(ctx, cw, H, age, lang); return; }
    if (reduceMotion) { drawJet(ctx, cw, H, 30, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; drawJet(ctx, cw, H, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, mode, age, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 03</div>
        <h3 style={styles.panelTitle}>{t.title}</h3>
        <div style={styles.panelKind}>{t.kind}</div>
        <div style={styles.pathBox}>
          <div style={styles.fateLabel}>{t.thread}</div>
          <p style={{ ...styles.factText, margin: 0 }}>{t.threadText}</p>
        </div>
        <div style={styles.fateBox}>
          <div style={{ ...styles.fateLabel, color: C.sun }}>{mode === "jet" ? t.jetKey : t.diskKey}</div>
          <p style={styles.keyTermText}>{mode === "jet" ? t.jetText : t.diskText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          {[["jet", t.jet], ["disk", t.disk]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        {mode === "disk" && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "10px 0 4px" }}>
            <span style={{ fontFamily: mono, fontSize: 12, color: C.cool, whiteSpace: "nowrap" }}>{t.age}</span>
            <input type="range" min="0" max="10" step="0.5" value={age}
              onChange={(e) => setAge(parseFloat(e.target.value))} style={{ flex: 1, accentColor: C.sun }} />
            <span style={{ fontFamily: mono, fontSize: 12, color: C.muted, width: 56, textAlign: "right" }}>{age} Myr</span>
          </div>
        )}

        <div style={{ marginTop: 8 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{mode === "jet" ? t.noteJ : t.noteD}</p>
      </div>
    </div>
  );
}

export default JetsTTauri;
