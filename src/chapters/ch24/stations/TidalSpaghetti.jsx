/* ============================================================
   STATION 7 — TIDAL FORCES & SPAGHETTIFICATION
   A tidal force is the DIFFERENCE in gravity between your feet and your head.
   Near a small (stellar-mass) black hole the gravity gradient is savage: you
   are stretched into spaghetti well OUTSIDE the horizon. Near a supermassive
   hole the horizon is so vast that the gradient across your body is gentle —
   you could cross the horizon intact. Tides depend on the gradient, not the
   total gravity. Grounded in Ch.24.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp, lerp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Tides & spaghettification",
    kind: "The gradient, not the gravity, is what stretches you",
    lede: "Fall toward a 10 M☉ stellar-mass hole, then a 4-million-M☉ giant. The small hole's steep gradient stretches the astronaut into spaghetti outside the horizon; the giant lets you cross intact.",
    thread: "FALLING IN",
    threadText: "So what would it feel like to approach one? The answer is startling — and it depends entirely on how big the black hole is.",
    key: "TIDES DEPEND ON THE GRADIENT — SMALL HOLES STRETCH YOU, GIANTS DON'T",
    keyText: "A TIDAL FORCE is not the total pull of gravity — it is the DIFFERENCE in pull between two parts of your body, your feet (closer) and your head (farther). Near a small, STELLAR-MASS black hole, the horizon is only kilometers across, so gravity changes enormously over the length of your body: your feet are yanked far harder than your head, and you are stretched into a thin stream — SPAGHETTIFICATION — well before you reach the horizon. Near a SUPERMASSIVE black hole of millions of solar masses, the horizon is millions of kilometers across; gravity barely changes across your height, so the tidal gradient at the horizon is gentle enough to cross alive. Counter-intuitively, the bigger and 'stronger' the hole, the safer the horizon crossing.",
    stellar: "10 M☉ stellar-mass hole", superm: "4,000,000 M☉ supermassive hole",
    steep: "STEEP gradient → spaghettified outside the horizon",
    gentle: "GENTLE gradient → cross the horizon intact",
    feet: "feet", head: "head", horizonL: "horizon",
    note: "Tidal force is the difference in gravity across your body, set by the gradient — not the total gravity. A small black hole's steep gradient spaghettifies you outside the horizon; a supermassive hole's gentle gradient lets you cross intact.",
  },
  ja: {
    title: "潮汐とスパゲッティ化",
    kind: "あなたを引き伸ばすのは重力でなく勾配",
    lede: "10 M☉の恒星質量の穴へ、次に400万 M☉の巨大な穴へ落ちよう。小さな穴の急な勾配は宇宙飛行士を地平面の外でスパゲッティに引き伸ばし、巨大な穴は無傷で越えさせます。",
    thread: "落ちていく",
    threadText: "では、ブラックホールに近づくとどんな感じがするのでしょう。答えは驚きです——そしてそれはブラックホールの大きさだけで決まります。",
    key: "潮汐は勾配で決まる——小さな穴は引き伸ばし、巨大な穴は伸ばさない",
    keyText: "潮汐力は重力の総量ではありません——それは体の2つの部分、足（近い方）と頭（遠い方）の引きの差です。小さな恒星質量ブラックホールの近くでは地平面はわずか数キロメートルなので、重力は体の長さにわたって大きく変わります：足は頭よりはるかに強く引かれ、あなたは細い流れへ引き伸ばされます——スパゲッティ化——しかも地平面に着くずっと前に。数百万太陽質量の超大質量ブラックホールの近くでは地平面は数百万キロメートルもあり、重力は身長にわたってほとんど変わらないので、地平面での潮汐の勾配は生きて越えられるほど緩やかです。直感に反して、穴が大きく「強い」ほど、地平面の通過は安全なのです。",
    stellar: "10 M☉の恒星質量の穴", superm: "400万 M☉の超大質量の穴",
    steep: "急な勾配 → 地平面の外でスパゲッティ化",
    gentle: "緩やかな勾配 → 無傷で地平面を越える",
    feet: "足", head: "頭", horizonL: "地平面",
    note: "潮汐力は体にわたる重力の差で、勾配で決まります——総量ではありません。小さなブラックホールの急な勾配は地平面の外であなたをスパゲッティ化し、超大質量の穴の緩やかな勾配は無傷で越えさせます。",
  },
};

function draw(ctx, cw, H, big, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = big ? cw * 0.26 : cw * 0.30, cy = H * 0.5;
  // horizon radius: small hole = small; giant = huge (fills left)
  const r = big ? Math.min(cw * 0.34, 180) : 30;

  // horizon disc
  const glow = ctx.createRadialGradient(cx, cy, r, cx, cy, r + 22);
  glow.addColorStop(0, "rgba(255,170,80,0.4)"); glow.addColorStop(1, "rgba(255,120,60,0)");
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(cx, cy, r + 22, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#05060d"; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = C.sun; ctx.lineWidth = 1.5; ctx.setLineDash([3, 4]);
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = C.sun; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.horizonL, cx, cy + r + 16 > H - 8 ? cy - r - 10 : cy + r + 16);

  // astronaut falling in FEET-FIRST toward the hole (the hole is to the LEFT, so the
  // feet — closest to the hole — point left, and the stretch is along the fall axis).
  const figX = big ? cw * 0.74 : cw * 0.72;
  const figCy = cy;
  // stretch factor: small hole = extreme stretch; giant = normal
  const stretch = big ? 1.0 : lerp(1.0, 3.6, clamp((tt % 240) / 240, 0, 1));
  const headLen = 20 * stretch, legLen = 20 * stretch;   // extents along the horizontal fall axis
  const col = big ? "#dbe4ff" : (stretch > 2 ? C.danger : "#dbe4ff");
  const xFeet = figX - legLen;   // toward the hole (left)
  const xHead = figX + headLen;  // away from the hole (right)

  ctx.strokeStyle = col; ctx.lineWidth = 2.4; ctx.lineCap = "round";
  // head (far side, away from the hole)
  ctx.beginPath(); ctx.arc(xHead + 6, figCy, 6, 0, Math.PI * 2); ctx.stroke();
  // body (stretched along the fall axis)
  ctx.beginPath(); ctx.moveTo(xHead, figCy); ctx.lineTo(xFeet, figCy); ctx.stroke();
  // arms (perpendicular, up near the shoulders/head end)
  const xSh = xHead - headLen * 0.3;
  ctx.beginPath(); ctx.moveTo(xSh, figCy); ctx.lineTo(xSh, figCy - 10); ctx.moveTo(xSh, figCy); ctx.lineTo(xSh, figCy + 10); ctx.stroke();
  // legs split, pointing toward the hole (left)
  ctx.beginPath(); ctx.moveTo(xFeet, figCy); ctx.lineTo(xFeet - 8, figCy - 6); ctx.moveTo(xFeet, figCy); ctx.lineTo(xFeet - 8, figCy + 6); ctx.stroke();

  // head/feet labels
  ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillStyle = C.faint;
  ctx.fillText(t.head, xHead + 6, figCy - 16);
  ctx.fillText(t.feet, xFeet - 4, figCy - 16);
  // gradient force arrows pointing toward the hole (left); feet pulled much harder on a small hole
  const fHead = big ? 10 : 8;
  const fFeet = big ? 12 : 30;
  const arrowL = (x, y, len, color) => {
    ctx.strokeStyle = color; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - len, y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x - len, y); ctx.lineTo(x - len + 5, y - 3); ctx.moveTo(x - len, y); ctx.lineTo(x - len + 5, y + 3); ctx.stroke();
  };
  arrowL(xHead, figCy + 24, fHead, C.cool);
  arrowL(xFeet, figCy + 24, fFeet, big ? C.cool : C.danger);

  // verdict caption
  ctx.fillStyle = big ? C.good : C.danger; ctx.font = `12px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(big ? t.gentle : t.steep, cw / 2, H - 10);
}

export function TidalSpaghetti() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 290;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [big, setBig] = useState(false);
  const bigRef = useRef(false); bigRef.current = big;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, bigRef.current, big ? 0 : 239, lang); return; }
    let raf, tt = 0;
    const loop = () => {
      tt += 1;
      draw(ctx, cw, H, bigRef.current, tt, lang);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang, big]);

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
          <button onClick={() => setBig(false)} style={{ ...styles.chip, ...(!big ? styles.chipOn : {}) }}>{t.stellar}</button>
          <button onClick={() => setBig(true)} style={{ ...styles.chip, ...(big ? styles.chipOn : {}) }}>{t.superm}</button>
        </div>

        <div style={{ marginTop: 10 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default TidalSpaghetti;
