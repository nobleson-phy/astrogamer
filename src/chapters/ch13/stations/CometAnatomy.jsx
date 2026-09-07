/* ============================================================
   STATION 4 — ANATOMY OF A COMET
   A comet's solid NUCLEUS is only a few kilometers across. Near the
   Sun its ices vaporize into a huge glowing COMA and two tails that
   ALWAYS point away from the Sun: a bluish ION TAIL, straight, blown
   back by the solar wind, and a yellowish DUST TAIL, curved, pushed by
   the radiation pressure of sunlight. Grounded in Ch.13 §13.2.
   ============================================================ */
import React, { useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Anatomy of a comet",
    kind: "One small nucleus, two long tails",
    lede: "Watch a comet round the Sun. Notice both tails always sweep away from the Sun — even as the comet heads back out — because they are blown, not trailed.",
    thread: "THE STORY CONTINUES",
    threadText: "A comet is a 'dirty snowball' only a few kilometers wide. Yet near the Sun it grows a glowing head and tails millions of kilometers long, one of the grandest sights in the sky.",
    key: "TWO TAILS, ALWAYS POINTING AWAY FROM THE SUN",
    keyText: "The solid nucleus of a typical comet is just a few kilometers across. As it nears the Sun, its frozen ices vaporize into a vast glowing coma and TWO tails — and both point away from the Sun rather than trailing behind the motion. The bluish ION TAIL is ionized gas blown straight back by the SOLAR WIND. The yellowish-white DUST TAIL is dust pushed by the radiation pressure of sunlight, and it curves gently along the comet's orbit. On the outbound leg the tails actually lead the way, streaming ahead of the nucleus.",
    ion: "ion tail — solar wind (straight, blue)",
    dust: "dust tail — radiation pressure (curved)",
    nucleus: "nucleus: only a few km across",
    coma: "coma", sun: "Sun",
    note: "A few-km icy nucleus grows a coma and two tails near the Sun. The straight blue ion tail is blown by the solar wind; the curved dust tail by sunlight's radiation pressure — both point anti-sunward.",
  },
  ja: {
    title: "彗星の構造",
    kind: "小さな核と2本の長い尾",
    lede: "太陽をまわる彗星を見よう。彗星が外へ戻るときでさえ、両方の尾がいつも太陽と反対へなびくことに注目——尾は引きずられるのではなく、吹き飛ばされるからです。",
    thread: "物語はつづく",
    threadText: "彗星はわずか数キロメートルの「汚れた雪玉」です。それでも太陽の近くでは、輝く頭と数百万キロメートルの尾を伸ばし、空で最も壮大な光景の一つになります。",
    key: "2本の尾は、いつも太陽と反対を向く",
    keyText: "典型的な彗星の固体の核は、わずか数キロメートルです。太陽に近づくと、凍った氷が蒸発して巨大な輝くコマと2本の尾になります——そしてどちらも、運動の後ろに引きずられるのではなく、太陽と反対を向きます。青みがかったイオンの尾は、太陽風によって真後ろへ吹き飛ばされる電離ガスです。黄白色の塵の尾は、太陽光の放射圧に押される塵で、彗星の軌道に沿って緩やかに湾曲します。外へ向かう区間では、尾は実際に核の前方へなびいて先導します。",
    ion: "イオンの尾——太陽風（直線・青）",
    dust: "塵の尾——放射圧（湾曲）",
    nucleus: "核：わずか数km",
    coma: "コマ", sun: "太陽",
    note: "数kmの氷の核が、太陽の近くでコマと2本の尾を伸ばします。まっすぐな青いイオンの尾は太陽風に、湾曲した塵の尾は太陽光の放射圧に吹かれ——どちらも反太陽方向を向きます。",
  },
};

function draw(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const sunX = cw / 2, sunY = H / 2;
  // Sun
  const sg = ctx.createRadialGradient(sunX, sunY, 2, sunX, sunY, 34);
  sg.addColorStop(0, "#fff2c0"); sg.addColorStop(1, "rgba(255,180,60,0)");
  ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(sunX, sunY, 34, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffd86b"; ctx.beginPath(); ctx.arc(sunX, sunY, 12, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.sun; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.sun, sunX, sunY + 30);
  // comet on an elliptical orbit around the Sun (Sun at focus)
  const a = Math.min(cw * 0.34, cw / 2 - 40), b = H * 0.34, cfoc = a * 0.55;
  const ecx = sunX + cfoc; // ellipse centre offset so Sun is at focus
  const ph = tt * 0.012;
  const px = ecx + Math.cos(ph) * a, py = sunY + Math.sin(ph) * b;
  // orbit path
  ctx.strokeStyle = "rgba(150,175,230,0.15)"; ctx.beginPath(); ctx.ellipse(ecx, sunY, a, b, 0, 0, Math.PI * 2); ctx.stroke();
  // anti-sun direction (unit vector from Sun to comet)
  const dx = px - sunX, dy = py - sunY, d = Math.hypot(dx, dy);
  const ux = dx / d, uy = dy / d;
  // tail length grows as comet nears the Sun
  const near = 1 - Math.min(d / (a + cfoc), 1); // ~1 at perihelion
  const tailLen = 40 + near * 150;
  // ION TAIL: straight, anti-sunward, blue
  const ig = ctx.createLinearGradient(px, py, px + ux * tailLen, py + uy * tailLen);
  ig.addColorStop(0, "rgba(140,200,255,0.7)"); ig.addColorStop(1, "rgba(140,200,255,0)");
  ctx.strokeStyle = ig; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + ux * tailLen, py + uy * tailLen); ctx.stroke();
  // DUST TAIL: curved, anti-sunward but bent opposite the motion, yellowish
  // motion direction (tangent)
  const mvx = -Math.sin(ph), mvy = Math.cos(ph);
  const dg = ctx.createLinearGradient(px, py, px + ux * tailLen * 0.85, py + uy * tailLen * 0.85);
  dg.addColorStop(0, "rgba(245,225,170,0.6)"); dg.addColorStop(1, "rgba(245,225,170,0)");
  ctx.strokeStyle = dg; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(px, py);
  const midx = px + ux * tailLen * 0.5 - mvx * tailLen * 0.28;
  const midy = py + uy * tailLen * 0.5 - mvy * tailLen * 0.28;
  const endx = px + ux * tailLen * 0.85 - mvx * tailLen * 0.5;
  const endy = py + uy * tailLen * 0.85 - mvy * tailLen * 0.5;
  ctx.quadraticCurveTo(midx, midy, endx, endy); ctx.stroke();
  // coma + nucleus
  const cg = ctx.createRadialGradient(px, py, 1, px, py, 12);
  cg.addColorStop(0, "rgba(220,240,255,0.95)"); cg.addColorStop(1, "rgba(180,220,255,0)");
  ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(px, py, 12, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#e8eef6"; ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fill();
  // labels near comet
  ctx.font = `9px ${mono}`; ctx.textAlign = "left";
  ctx.fillStyle = "rgba(140,200,255,0.95)"; ctx.fillText(t.ion, 8, 16);
  ctx.fillStyle = "rgba(245,225,170,0.95)"; ctx.fillText(t.dust, 8, 30);
  ctx.fillStyle = C.faint; ctx.fillText(t.nucleus, 8, H - 10);
}

export function CometAnatomy() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, 60, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; draw(ctx, cw, H, tt, lang); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

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

        <div style={{ marginTop: 4 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default CometAnatomy;
