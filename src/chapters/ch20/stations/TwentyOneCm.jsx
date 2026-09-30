/* ============================================================
   STATION 3 — THE 21-CM LINE
   Neutral hydrogen has a subtle "spin-flip": when the electron's spin
   flips from parallel to antiparallel with the proton's, the atom emits a
   radio photon 21 cm long. Any one atom does this only about once every
   10 million years — yet interstellar clouds hold so many hydrogen atoms
   that the combined 21-cm signal is strong and easy to map. Ewen and
   Purcell first detected it in 1951. Grounded in Ch.20 §20.2.
   ============================================================ */
import React, { useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "The 21-cm line",
    kind: "A whisper from every atom",
    lede: "One hydrogen atom flips its spin once in ten million years — but there are so many atoms that the radio signal never stops. Watch a whole cloud light up.",
    thread: "THE STORY CONTINUES",
    threadText: "Cold hydrogen is invisible to ordinary telescopes. But it hums quietly at one radio wavelength — and that hum let astronomers map the entire Galaxy's gas.",
    key: "RARE PER ATOM, BUT COUNTLESS ATOMS = STRONG SIGNAL",
    keyText: "A neutral hydrogen atom can undergo a spin-flip: the electron's spin flips relative to the proton's, releasing a low-energy radio photon with a wavelength of 21 centimeters. For any single atom this happens on average only once every ~10 million years. Yet interstellar hydrogen clouds contain such staggering numbers of atoms that, at any instant, millions are emitting 21-cm photons — so the line is one of the strongest, most useful features in radio astronomy. Harold Ewen and Edward Purcell first detected it in 1951, and it has been used ever since to map cold neutral hydrogen throughout the Milky Way.",
    flip: "spin flip → 21-cm photon", cloud: "billions of atoms → steady signal", signal: "combined 21-cm signal: STRONG",
    disc: "first detected: Ewen & Purcell, 1951",
    note: "A hydrogen spin-flip emits a 21-cm radio photon — rare per atom, but so many atoms emit that the signal is strong. Ewen & Purcell detected it in 1951; it maps the Galaxy's cold hydrogen.",
  },
  ja: {
    title: "21 cm線",
    kind: "すべての原子からのささやき",
    lede: "1つの水素原子は1,000万年に一度スピンを反転します——でも原子が非常に多いので、電波信号は途切れません。雲全体が光る様子を見よう。",
    thread: "物語はつづく",
    threadText: "冷たい水素は普通の望遠鏡には見えません。でも一つの電波波長で静かにうなり——そのうなりが、天文学者に銀河全体のガスを地図化させました。",
    key: "1原子あたりはまれ、でも無数の原子＝強い信号",
    keyText: "中性水素の原子はスピン反転を起こせます：電子のスピンが陽子に対して反転し、波長21センチメートルの低エネルギーの電波光子を放ちます。1つの原子ではこれは平均して約1,000万年に一度しか起きません。それでも星間水素の雲には途方もない数の原子があるので、どの瞬間も何百万個もが21 cm光子を放っています——だからこの線は電波天文学で最も強く有用な特徴の一つです。ハロルド・ユーエンとエドワード・パーセルが1951年に初めて検出し、以来、天の川全体の冷たい中性水素を地図化するのに使われています。",
    flip: "スピン反転 → 21 cm光子", cloud: "数十億の原子 → 安定した信号", signal: "合わさった21 cm信号：強い",
    disc: "初検出：ユーエンとパーセル、1951年",
    note: "水素のスピン反転が21 cmの電波光子を放ちます——1原子あたりはまれですが、非常に多くの原子が放つので信号は強い。ユーエンとパーセルが1951年に検出し、銀河の冷たい水素を地図化します。",
  },
};

function draw(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // left: a single atom doing a spin flip
  const ax = cw * 0.2, ay = H * 0.36;
  ctx.fillStyle = "#e0774f"; ctx.beginPath(); ctx.arc(ax, ay, 12, 0, Math.PI * 2); ctx.fill(); // proton
  ctx.fillStyle = "#fff"; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText("p", ax, ay + 3);
  // orbiting electron
  const ea = tt * 0.04; const ex = ax + Math.cos(ea) * 26, ey = ay + Math.sin(ea) * 26;
  ctx.strokeStyle = "rgba(150,175,230,0.2)"; ctx.beginPath(); ctx.arc(ax, ay, 26, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = "#8fc0e8"; ctx.beginPath(); ctx.arc(ex, ey, 5, 0, Math.PI * 2); ctx.fill();
  // spin arrows flip periodically
  const flipped = Math.floor(tt / 90) % 2 === 1;
  ctx.strokeStyle = "#ffd86b"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(ax, ay - 4); ctx.lineTo(ax, ay + 4); ctx.stroke(); // proton spin up
  ctx.beginPath(); ctx.moveTo(ex, ey - (flipped ? -4 : 4)); ctx.lineTo(ex, ey + (flipped ? -4 : 4)); ctx.stroke();
  // emit a 21cm wave right after flip
  const phase = tt % 90;
  if (phase < 40) {
    const rr = 20 + phase * 3;
    ctx.strokeStyle = `rgba(255,120,120,${0.6 - phase / 70})`; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(ax, ay, rr, 0, Math.PI * 2); ctx.stroke();
  }
  ctx.fillStyle = C.cool; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.flip, ax, ay + 48);
  // right: a big cloud where many atoms flash
  const fx0 = cw * 0.44, fx1 = cw - 20, fy0 = 20, fy1 = H - 46;
  ctx.strokeStyle = "rgba(150,175,230,0.2)"; ctx.strokeRect(fx0, fy0, fx1 - fx0, fy1 - fy0);
  for (let i = 0; i < 120; i++) {
    const x = fx0 + ((i * 71) % 100) / 100 * (fx1 - fx0);
    const y = fy0 + ((i * 37) % 100) / 100 * (fy1 - fy0);
    const on = (i + Math.floor(tt / 4)) % 17 === 0;
    ctx.fillStyle = on ? "rgba(255,120,120,0.9)" : "rgba(224,119,79,0.35)";
    ctx.beginPath(); ctx.arc(x, y, on ? 2.4 : 1.2, 0, Math.PI * 2); ctx.fill();
  }
  ctx.fillStyle = C.faint; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.cloud, (fx0 + fx1) / 2, fy0 - 6);
  // signal meter
  ctx.fillStyle = C.good; ctx.font = `10px ${mono}`; ctx.fillText(t.signal, (fx0 + fx1) / 2, fy1 + 16);
  ctx.fillStyle = C.faint; ctx.textAlign = "left"; ctx.font = `9px ${mono}`; ctx.fillText(t.disc, 10, H - 8);
}

export function TwentyOneCm() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, 20, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

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

export default TwentyOneCm;
