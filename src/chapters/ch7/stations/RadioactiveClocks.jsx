/* ============================================================
   STATION 5 — RADIOACTIVE CLOCKS
   Radioactive parent atoms decay to daughter atoms. The half-life
   is the time in which a nucleus has a fifty-fifty chance of
   decaying (half the parents decay). Counting the parent/daughter
   ratio dates a rock; primitive meteorites date the solar system
   at 4.5 billion years. Grounded in Ch.7 §7.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const TOTAL = 128; // 2^7 atoms, so halving stays clean
const COLS = 16, ROWS = 8;

const STR = {
  en: {
    title: "Radioactive clocks",
    kind: "Half-life & the age of everything",
    lede: "Each atom here is a radioactive 'parent'. Advance one half-life and half of the remaining parents decay to gold 'daughters'. Count what's left, and you've counted time.",
    thread: "THE STORY CONTINUES",
    threadText: "The fossils have a date stamp. Locked inside meteorites are radioactive atoms ticking down at a fixed rate — a clock that has been running since the moment the rock first solidified.",
    key: "HALF-LIFE: A FIFTY-FIFTY CLOCK",
    keyText: "A half-life is the time over which any given radioactive nucleus has a fifty-fifty chance of decaying — so half the parent atoms turn into daughter atoms. After one half-life, 50% of the parents remain; after two, 25%; after three, 12.5%. Measure the parent-to-daughter ratio in a rock and you read off how many half-lives — how much time — has passed. Primitive meteorites, dated this way, put the solar system's age at about 4.5 billion years.",
    step: "▶ Advance one half-life", reset: "↺ Reset",
    hl: "Half-lives elapsed", remain: "Parent remaining", parent: "parent", daughter: "daughter",
    hint25: "At 25% remaining, exactly two half-lives have passed.",
    note: "Blue = radioactive parent atoms, gold = daughter atoms they decayed into. Each step halves the parents (100% → 50% → 25% → 12.5% …). The fraction left tells you the age.",
  },
  ja: {
    title: "放射性時計",
    kind: "半減期と、あらゆるものの年齢",
    lede: "ここの各原子は放射性の「親」です。半減期を1つ進めると、残った親の半分が金色の「娘」に崩壊します。残りを数えれば、時間を数えたことになります。",
    thread: "物語はつづく",
    threadText: "化石には日付の刻印があります。隕石の中に閉じ込められた放射性原子が、一定の速さで時を刻んでいます——岩石が最初に固まった瞬間から動き続ける時計です。",
    key: "半減期：五分五分の時計",
    keyText: "半減期とは、ある放射性の原子核が崩壊する確率がちょうど五分五分になる時間です——つまり親原子の半分が娘原子に変わります。1半減期後は親が50%、2回で25%、3回で12.5%残ります。岩石中の親と娘の比を測れば、何回の半減期——どれだけの時間——が過ぎたかが読めます。この方法で年代測定した原始的な隕石から、太陽系の年齢は約45億年とされています。",
    step: "▶ 半減期を1つ進める", reset: "↺ リセット",
    hl: "経過した半減期", remain: "残っている親", parent: "親", daughter: "娘",
    hint25: "残り25%なら、ちょうど2半減期が過ぎています。",
    note: "青＝放射性の親原子、金＝崩壊してできた娘原子。1ステップごとに親が半分に（100%→50%→25%→12.5%…）。残りの割合が年齢を教えてくれます。",
  },
};

function makeAtoms() { return Array.from({ length: TOTAL }, () => ({ parent: true })); }

function draw(ctx, cw, H, atoms, lang) {
  ctx.clearRect(0, 0, cw, H);
  const padX = 24, padY = 20;
  const gw = cw - padX * 2, gh = H - padY * 2;
  const dx = gw / COLS, dy = gh / ROWS, r = Math.min(dx, dy) * 0.32;
  for (let i = 0; i < TOTAL; i++) {
    const col = i % COLS, row = Math.floor(i / COLS);
    const x = padX + col * dx + dx / 2, y = padY + row * dy + dy / 2;
    const a = atoms[i];
    if (a.parent) {
      const g = ctx.createRadialGradient(x, y, 1, x, y, r * 1.6);
      g.addColorStop(0, "#8fd0ff"); g.addColorStop(1, "rgba(63,221,255,0.15)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 1.6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#3fddff"; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    } else {
      ctx.fillStyle = "rgba(255,207,107,0.85)"; ctx.beginPath(); ctx.arc(x, y, r * 0.85, 0, Math.PI * 2); ctx.fill();
    }
  }
}

export function RadioactiveClocks() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 220;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [atoms, setAtoms] = useState(makeAtoms);
  const [hl, setHl] = useState(0);

  const parents = atoms.filter((a) => a.parent).length;
  const pct = (parents / TOTAL) * 100;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, atoms, lang);
  }, [cw, atoms, lang]);

  const step = () => {
    setAtoms((prev) => {
      const next = prev.map((a) => ({ ...a }));
      const idx = next.map((a, i) => (a.parent ? i : -1)).filter((i) => i >= 0);
      // decay exactly half of the remaining parents (random selection)
      const toDecay = Math.floor(idx.length / 2);
      for (let k = idx.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [idx[k], idx[j]] = [idx[j], idx[k]]; }
      for (let k = 0; k < toDecay; k++) next[idx[k]].parent = false;
      return next;
    });
    setHl((h) => h + 1);
  };
  const reset = () => { setAtoms(makeAtoms()); setHl(0); };

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 05</div>
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

        <div style={styles.controlBar}>
          <button style={styles.iconBtn} onClick={step}>{t.step}</button>
          <button style={{ ...styles.iconBtn, opacity: 0.85 }} onClick={reset}>{t.reset}</button>
        </div>

        <div style={{ display: "flex", gap: 24, marginTop: 12, marginBottom: 8, alignItems: "baseline" }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, letterSpacing: 1 }}>{t.hl}</div>
            <div style={{ fontFamily: mono, fontSize: 26, color: C.sun }}>{hl}</div>
          </div>
          <div>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.faint, letterSpacing: 1 }}>{t.remain}</div>
            <div style={{ fontFamily: mono, fontSize: 26, color: C.cool }}>{pct.toFixed(pct < 10 && pct > 0 ? 1 : 0)}%</div>
          </div>
        </div>

        <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />

        <div style={{ fontFamily: mono, fontSize: 12.5, marginTop: 8, color: C.muted }}>
          <span style={{ color: "#3fddff" }}>●</span> {t.parent} &nbsp; <span style={{ color: "#ffcf6b" }}>●</span> {t.daughter}
          {Math.abs(pct - 25) < 0.6 && <span style={{ color: C.good, marginLeft: 10 }}>✓ {t.hint25}</span>}
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default RadioactiveClocks;
