/* ============================================================
   STATION 5 — WHERE THE MOON CAME FROM
   Three old ideas — fission, sister (co-formation), capture — each
   failed a key test. The Giant Impact Hypothesis wins: a Mars-sized
   body struck the young Earth; debris from the two stony mantles
   formed the Moon. It explains the Moon's tiny metal core (no iron
   in the debris), its missing volatiles (boiled off), and its
   identical oxygen isotopes to Earth. Grounded in Ch.9 §9.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const THEORIES = {
  fission: { en: "Fission", ja: "分裂説", ok: false,
    en_t: "The idea that a fast-spinning young Earth flung off a blob that became the Moon. Earth cannot have spun nearly fast enough.", ja_t: "高速で自転する若い地球が塊を振り飛ばして月になったという説。地球はそこまで速く回れなかった。" },
  sister: { en: "Sister", ja: "兄弟説", ok: false,
    en_t: "That Earth and Moon formed side by side from the same cloud. But then they should have the same density and iron content — and they don't.", ja_t: "地球と月が同じ雲から並んで生まれたという説。だが同じ密度と鉄の量になるはず——実際は違う。" },
  capture: { en: "Capture", ja: "捕獲説", ok: false,
    en_t: "That the Moon formed elsewhere and Earth's gravity caught it. Capture is dynamically improbable, would give an odd eccentric orbit, and can't explain the identical oxygen isotopes.", ja_t: "月が別の場所で生まれ、地球の重力が捕らえたという説。捕獲は力学的に起こりにくく、いびつな軌道になり、同一の酸素同位体も説明できない。" },
  giant: { en: "Giant Impact", ja: "ジャイアント・インパクト", ok: true,
    en_t: "A Mars-sized body slammed into the young Earth. Debris from the two rocky MANTLES (not their iron cores) went into orbit and built the Moon — explaining its tiny metal core, its lost volatiles (boiled off in the heat), and its oxygen isotopes identical to Earth's.", ja_t: "火星サイズの天体が若い地球に激突。2つの岩石マントル（鉄の核ではなく）の破片が軌道に入り月をつくった——小さな金属の核、失われた揮発性物質（熱で蒸発）、そして地球と同一の酸素同位体を説明する。" },
};
const ORDER = ["fission", "sister", "capture", "giant"];

const STR = {
  en: {
    title: "Where the Moon came from",
    kind: "Three failed ideas and one great collision",
    lede: "For a century, three theories competed and all fell short. Step through them, then watch the giant impact that finally fit the evidence.",
    thread: "THE STORY CONTINUES",
    threadText: "A good origin story must explain everything at once: why the Moon is so like Earth's rocks, yet so unlike it in iron and water. Three old ideas each explained part and failed the rest.",
    key: "A MARS-SIZED BLOW BUILT THE MOON",
    keyText: "Before the answer, three standard hypotheses competed: FISSION (Earth spun off the Moon), SISTER (they formed together), and CAPTURE (Earth grabbed a passing Moon). Each fails a decisive test — capture, for example, is dynamically improbable, predicts an eccentric orbit, and cannot explain why Earth and Moon share identical oxygen isotopes. The GIANT IMPACT HYPOTHESIS explains it all: a Mars-sized body struck the young Earth, and debris from the two bodies' rocky mantles formed the Moon — leaving it with almost no iron core, stripped of volatiles by the heat, yet chemically Earth's twin.",
    verdict: "Verdict", rejected: "rejected", accepted: "accepted — best fit",
    play: "▶ Replay impact",
    note: "The three old theories each broke on a key fact. The Giant Impact makes the Moon from Earth's and the impactor's mantles — accounting for its small core, missing volatiles, and identical oxygen isotopes in one stroke.",
  },
  ja: {
    title: "月の起源",
    kind: "3つの失敗した説と、1つの大衝突",
    lede: "1世紀のあいだ、3つの説が競い、すべて及びませんでした。順に見て、それから証拠にようやく合った巨大衝突を見よう。",
    thread: "物語はつづく",
    threadText: "良い起源の物語は、すべてを一度に説明せねばなりません：なぜ月は地球の岩石にこれほど似て、鉄と水ではこれほど違うのか。3つの古い説は、それぞれ一部を説明し、残りで失敗しました。",
    key: "火星サイズの一撃が月をつくった",
    keyText: "答えの前に、3つの標準的な説が競いました：分裂説（地球が月を振り飛ばした）、兄弟説（一緒に生まれた）、捕獲説（地球が通りすがりの月を捕らえた）。それぞれ決定的な検証に失敗します——たとえば捕獲は力学的に起こりにくく、いびつな軌道を予測し、地球と月がなぜ同一の酸素同位体をもつのか説明できません。ジャイアント・インパクト説はすべてを説明します：火星サイズの天体が若い地球に衝突し、両天体の岩石マントルの破片が月をつくった——ほぼ鉄の核をもたず、熱で揮発性物質を奪われ、それでいて化学的には地球の双子なのです。",
    verdict: "判定", rejected: "却下", accepted: "採用——最もよく合う",
    play: "▶ 衝突をもう一度",
    note: "3つの古い説はそれぞれ重要な事実で破綻します。ジャイアント・インパクトは、地球と衝突体のマントルから月をつくり——小さな核、失われた揮発性物質、同一の酸素同位体を一挙に説明します。",
  },
};

function drawImpact(ctx, cw, H, prog) {
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.42, cy = H / 2;
  // Earth
  const eg = ctx.createRadialGradient(cx - 12, cy - 12, 4, cx, cy, 44);
  eg.addColorStop(0, "#7fb4ea"); eg.addColorStop(1, "#3a5aa8");
  ctx.fillStyle = eg; ctx.beginPath(); ctx.arc(cx, cy, 44, 0, Math.PI * 2); ctx.fill();
  if (prog < 0.45) {
    // impactor approaching
    const f = prog / 0.45;
    const ix = cw * 0.95 - f * (cw * 0.95 - (cx + 44)), iy = cy - 40 + f * 40;
    ctx.fillStyle = "#c96b3a"; ctx.beginPath(); ctx.arc(ix, iy, 16, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "rgba(255,150,90,0.4)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cw * 0.95, cy - 40); ctx.lineTo(ix, iy); ctx.stroke();
  } else {
    // splash of debris into orbit, coalescing into the Moon
    const f = (prog - 0.45) / 0.55;
    if (f < 0.4) {
      const fg = ctx.createRadialGradient(cx + 30, cy - 10, 2, cx + 30, cy - 10, 60);
      fg.addColorStop(0, `rgba(255,220,150,${0.7 * (1 - f / 0.4)})`); fg.addColorStop(1, "rgba(255,120,60,0)");
      ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(cx + 30, cy - 10, 60, 0, Math.PI * 2); ctx.fill();
    }
    // debris ring
    const r = 78;
    for (let i = 0; i < 26; i++) {
      const a = (i / 26) * Math.PI * 2 + prog * 2;
      const spread = clamp(1 - f, 0, 1) * 24;
      const rr = r + Math.sin(i * 3) * spread;
      ctx.fillStyle = "rgba(210,200,180,0.8)";
      ctx.beginPath(); ctx.arc(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.5, 2, 0, Math.PI * 2); ctx.fill();
    }
    // Moon coalescing
    const mAlpha = clamp((f - 0.4) / 0.6, 0, 1);
    if (mAlpha > 0) {
      const ma = prog * 2;
      const mx = cx + Math.cos(ma) * r, my = cy + Math.sin(ma) * r * 0.5;
      ctx.globalAlpha = mAlpha;
      const mg = ctx.createRadialGradient(mx - 4, my - 4, 1, mx, my, 12);
      mg.addColorStop(0, "#e6e2d8"); mg.addColorStop(1, "#9a9488");
      ctx.fillStyle = mg; ctx.beginPath(); ctx.arc(mx, my, 12 * mAlpha, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
    }
  }
}

export function MoonOrigin() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [sel, setSel] = useState("giant");
  const progRef = useRef(1);
  const runRef = useRef(false);
  const th = THEORIES[sel];

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (sel !== "giant") {
      // draw a simple crossed-out sketch for rejected theories
      ctx.clearRect(0, 0, cw, H);
      const cx = cw / 2, cy = H / 2;
      const eg = ctx.createRadialGradient(cx - 40, cy - 12, 4, cx - 40, cy, 40);
      eg.addColorStop(0, "#7fb4ea"); eg.addColorStop(1, "#3a5aa8");
      ctx.fillStyle = eg; ctx.beginPath(); ctx.arc(cx - 40, cy, 40, 0, Math.PI * 2); ctx.fill();
      const mg = ctx.createRadialGradient(cx + 62, cy - 4, 1, cx + 62, cy, 16);
      mg.addColorStop(0, "#e6e2d8"); mg.addColorStop(1, "#9a9488");
      ctx.fillStyle = mg; ctx.beginPath(); ctx.arc(cx + 62, cy, 16, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "rgba(255,107,107,0.8)"; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(cx - 90, cy - 60); ctx.lineTo(cx + 100, cy + 60); ctx.stroke();
      ctx.fillStyle = C.danger; ctx.font = `700 13px ${mono}`; ctx.textAlign = "center"; ctx.fillText("✗ " + t.rejected, cx, cy + 88);
      return;
    }
    if (reduceMotion) { drawImpact(ctx, cw, H, 1); return; }
    let raf;
    const loop = () => {
      if (runRef.current) { progRef.current = clamp(progRef.current + 0.008, 0, 1); if (progRef.current >= 1) runRef.current = false; }
      drawImpact(ctx, cw, H, progRef.current);
      raf = requestAnimationFrame(loop);
    };
    runRef.current = true; progRef.current = 0; loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, sel, lang]);

  const replay = () => { progRef.current = 0; runRef.current = true; };

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

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {ORDER.map((id) => (
            <button key={id} onClick={() => setSel(id)}
              style={{ ...styles.chip, ...(sel === id ? styles.chipOn : {}), borderColor: sel === id ? (THEORIES[id].ok ? C.good : C.danger) : undefined }}>
              {lang === "ja" ? THEORIES[id].ja : THEORIES[id].en}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
          <span style={{ fontFamily: mono, fontSize: 12.5, color: th.ok ? C.good : C.danger }}>
            {t.verdict}: {th.ok ? "✓ " + t.accepted : "✗ " + t.rejected}
          </span>
          {sel === "giant" && <button style={styles.iconBtn} onClick={replay}>{t.play}</button>}
        </div>

        <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.5, marginTop: 8 }}>{lang === "ja" ? th.ja_t : th.en_t}</p>
        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default MoonOrigin;
