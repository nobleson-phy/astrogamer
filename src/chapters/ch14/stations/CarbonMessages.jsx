/* ============================================================
   STATION 6 — MESSAGES IN CARBON
   Carbonaceous meteorites are pristine, carbon-rich samples of the
   early solar system. Murchison (Australia, 1969) contains 16 amino
   acids — and they come in EQUAL numbers of left- and right-handed
   forms. Since all Earth life uses only left-handed amino acids, that
   50/50 mix proves an abiotic, extraterrestrial origin. Allende
   (Mexico, 1969) holds white inclusions that may predate the solar
   nebula. Such meteorites may have reseeded the cooled early Earth with
   life's building blocks. Grounded in Ch.14 §14.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Messages in carbon",
    kind: "Building blocks from space",
    lede: "Carbonaceous meteorites carry chemistry, not just rock. Switch between two famous ones — the amino acids of Murchison and the ancient white inclusions of Allende.",
    thread: "THE STORY CONTINUES",
    threadText: "Some meteorites are chemical time capsules. They preserve organic molecules and mineral grains from before the planets — and they may have delivered the first ingredients for life to a young Earth.",
    murchisonKey: "MURCHISON — AMINO ACIDS, EQUALLY LEFT & RIGHT HANDED",
    murchisonText: "The Murchison meteorite (Australia, 1969) contains 16 amino acids, the molecular building blocks of proteins. Crucially, they occur in EQUAL numbers of left-handed and right-handed forms. All life on Earth uses only LEFT-handed amino acids, so a 50/50 mix cannot be biological contamination — it proves these molecules formed abiotically, in space. Carbonaceous meteorites like this may have reseeded the cooling early Earth with the building blocks of life.",
    allendeKey: "ALLENDE — WHITE INCLUSIONS OLDER THAN THE NEBULA",
    allendeText: "The Allende meteorite (Mexico, 1969) is a dark carbonaceous stone studded with white calcium-aluminium inclusions (CAIs). These refractory grains condensed at extremely high temperatures and may predate the solar nebula itself — among the oldest solid material we can hold, unmodified since before the planets formed.",
    murchison: "Murchison", allende: "Allende",
    left: "left-handed", right: "right-handed", earthLife: "Earth life uses left-handed only → 50/50 = not from Earth",
    cai: "white inclusions (CAIs) — may predate the nebula",
    noteM: "Murchison's 16 amino acids are 50/50 left- and right-handed; Earth life is all left-handed, so the mix must be extraterrestrial — and may have seeded early Earth.",
    noteA: "Allende's white calcium-aluminium inclusions condensed at high temperature and may predate the solar nebula — some of the oldest solids we can study.",
  },
  ja: {
    title: "炭素のメッセージ",
    kind: "宇宙からの構成要素",
    lede: "炭素質隕石は岩だけでなく化学を運びます。有名な2つを切り替えよう——マーチソンのアミノ酸と、アエンデの古い白い包有物。",
    thread: "物語はつづく",
    threadText: "一部の隕石は化学のタイムカプセルです。惑星より前の有機分子と鉱物粒を保存し——若い地球に生命の最初の材料を届けたかもしれません。",
    murchisonKey: "マーチソン——アミノ酸、左手型と右手型が同数",
    murchisonText: "マーチソン隕石（オーストラリア、1969年）は16種のアミノ酸、タンパク質の分子的構成要素を含みます。重要なのは、それらが左手型と右手型を同数含むことです。地球の生命はすべて左手型のアミノ酸のみを使うので、50/50の混合は生物汚染ではありえません——これらの分子が宇宙で非生物的に作られたことを証明します。このような炭素質隕石は、冷えつつある初期地球に生命の構成要素を再供給したかもしれません。",
    allendeKey: "アエンデ——星雲より古い白い包有物",
    allendeText: "アエンデ隕石（メキシコ、1969年）は、白いカルシウム・アルミニウム包有物（CAI）がちりばめられた暗い炭素質の石です。これらの難揮発性の粒は極めて高温で凝縮し、太陽系星雲そのものより古いかもしれません——惑星が形成される前から変わらない、私たちが手にできる最古の固体物質の一つです。",
    murchison: "マーチソン", allende: "アエンデ",
    left: "左手型", right: "右手型", earthLife: "地球の生命は左手型のみ → 50/50 = 地球由来ではない",
    cai: "白い包有物（CAI）——星雲より古いかもしれない",
    noteM: "マーチソンの16種のアミノ酸は左手型と右手型が50/50。地球の生命はすべて左手型なので、この混合は地球外のもの——初期地球に材料を供給したかもしれません。",
    noteA: "アエンデの白いカルシウム・アルミニウム包有物は高温で凝縮し、太陽系星雲より古いかもしれません——研究できる最古の固体の一つです。",
  },
};

function hand(ctx, x, y, s, flip, col) {
  // simple mirror-image "molecule": a central node with 4 differently-tagged arms
  ctx.save(); ctx.translate(x, y); ctx.scale(flip ? -1 : 1, 1);
  ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.fillStyle = col;
  const arms = [[-1, -0.6], [1, -0.6], [1, 0.7], [-1, 0.7]];
  const colors = ["#e0774f", "#8fc0e8", "#b0d890", "#f4d06a"];
  arms.forEach(([ax, ay], i) => {
    ctx.strokeStyle = "rgba(200,200,210,0.5)"; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(ax * s, ay * s); ctx.stroke();
    ctx.fillStyle = colors[i]; ctx.beginPath(); ctx.arc(ax * s, ay * s, 4, 0, Math.PI * 2); ctx.fill();
  });
  ctx.fillStyle = "#dfe6f0"; ctx.beginPath(); ctx.arc(0, 0, 5, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

function draw(ctx, cw, H, mode, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  if (mode === "murchison") {
    // meteorite at left
    const mx = cw * 0.2, my = H * 0.5, R = Math.min(cw * 0.13, H * 0.3);
    const g = ctx.createRadialGradient(mx - R * 0.3, my - R * 0.3, R * 0.2, mx, my, R);
    g.addColorStop(0, "#4a453d"); g.addColorStop(1, "#22201b");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(mx, my, R, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "rgba(15,12,9,0.7)"; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = C.text; ctx.font = `700 12px ${mono}`; ctx.textAlign = "center"; ctx.fillText("Murchison", mx, my + R + 16);
    ctx.fillStyle = C.cool; ctx.font = `9px ${mono}`; ctx.fillText("16 amino acids", mx, my + R + 30);
    // chirality: mirror-image molecules
    const cxL = cw * 0.55, cxR = cw * 0.82, cyM = H * 0.4, s = 16;
    hand(ctx, cxL, cyM, s, false, C.text);
    hand(ctx, cxR, cyM, s, true, C.text);
    // mirror line
    ctx.strokeStyle = "rgba(150,175,230,0.3)"; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo((cxL + cxR) / 2, cyM - 40); ctx.lineTo((cxL + cxR) / 2, cyM + 40); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = C.muted; ctx.font = `10px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(t.left + " 50%", cxL, cyM + 42); ctx.fillText(t.right + " 50%", cxR, cyM + 42);
    // 50/50 bars
    const bx = cw * 0.5, bw = cw * 0.36, by = H * 0.74;
    ctx.fillStyle = "#8fc0e8"; ctx.fillRect(bx, by, bw / 2, 12);
    ctx.fillStyle = "#e0774f"; ctx.fillRect(bx + bw / 2, by, bw / 2, 12);
    ctx.fillStyle = C.sun; ctx.font = `9px ${mono}`; ctx.fillText(t.earthLife, bx + bw / 2, by + 26);
  } else {
    // Allende: dark stone with white inclusions
    const mx = cw * 0.5, my = H * 0.5, R = Math.min(cw * 0.24, H * 0.42);
    const g = ctx.createRadialGradient(mx - R * 0.3, my - R * 0.3, R * 0.2, mx, my, R);
    g.addColorStop(0, "#3e3a33"); g.addColorStop(1, "#1c1a16");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(mx, my, R, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.arc(mx, my, R, 0, Math.PI * 2); ctx.clip();
    // white CAIs
    const cai = [[-.3,-.2,.13],[.25,.1,.16],[-.1,.35,.1],[.4,-.3,.09],[-.45,.15,.08],[.05,-.4,.07],[.3,.4,.06]];
    cai.forEach(([dx, dy, rr]) => {
      ctx.fillStyle = "#e8e4d8"; ctx.beginPath();
      ctx.moveTo(mx + dx * R + rr * R, my + dy * R);
      for (let a = 0; a <= Math.PI * 2 + 0.01; a += Math.PI / 6) { const wob = rr * R * (0.8 + 0.3 * Math.sin(a * 3)); ctx.lineTo(mx + dx * R + Math.cos(a) * wob, my + dy * R + Math.sin(a) * wob); }
      ctx.closePath(); ctx.fill();
    });
    // fine grey chondrules
    for (let i = 0; i < 30; i++) { const a = i * 2.1, rr = ((i * 41) % 100) / 100 * R; ctx.fillStyle = "rgba(120,112,100,0.5)"; ctx.beginPath(); ctx.arc(mx + Math.cos(a) * rr, my + Math.sin(a) * rr, 1.6, 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();
    ctx.strokeStyle = "rgba(15,12,9,0.7)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(mx, my, R, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = C.text; ctx.font = `700 12px ${mono}`; ctx.textAlign = "center"; ctx.fillText("Allende", mx, my - R - 8);
    ctx.fillStyle = "#e8e4d8"; ctx.font = `9px ${mono}`; ctx.fillText(t.cai, mx, my + R + 16);
  }
}

export function CarbonMessages() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("murchison");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, mode, lang);
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
          <div style={{ ...styles.fateLabel, color: C.sun }}>{mode === "murchison" ? t.murchisonKey : t.allendeKey}</div>
          <p style={styles.keyTermText}>{mode === "murchison" ? t.murchisonText : t.allendeText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          {[["murchison", t.murchison], ["allende", t.allende]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{mode === "murchison" ? t.noteM : t.noteA}</p>
      </div>
    </div>
  );
}

export default CarbonMessages;
