/* ============================================================
   STATION 8 — GALACTIC CANNIBALISM & COLLISION (capstone, 2 tabs)
   Tab A CANNIBALISM: the SAGITTARIUS DWARF GALAXY torn into tidal streams and
   accreted; M54 is its surviving nucleus; hierarchical accretion built up the
   halo from many devoured dwarfs.
   Tab B COLLISION: the Milky Way-ANDROMEDA merger in 3-4 billion years — stars
   rarely collide (pass like smoke through a screen), gas compresses into
   starbursts, tidal tails form, and the pair settles into a giant ELLIPTICAL.
   A GALAXY BUILT BY MERGERS — AND HEADED FOR ONE. Grounded in Ch.25.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Cannibalism & collision",
    kind: "A galaxy built by mergers — and headed for one",
    lede: "Our Galaxy grew by eating its neighbors, and it is not finished. Tab A: the Sagittarius Dwarf being torn into tidal streams, its nucleus surviving as the cluster M54. Tab B: in 3-4 billion years, the Milky Way and Andromeda merge into a giant elliptical.",
    thread: "THE JOURNEY'S END — A GALAXY'S PAST AND FUTURE",
    threadText: "We have mapped the Galaxy's shape, our place in it, its dark mass and its black heart. The last chapter is its biography: built by cannibalism, and destined to be swallowed into something new.",
    key: "A GALAXY BUILT BY MERGERS — AND HEADED FOR ONE",
    keyText: "The Milky Way did not form all at once. In the HIERARCHICAL model, an early collapse made the halo and disk, but the Galaxy kept growing by CANNIBALIZING smaller satellite galaxies over cosmic time. The clearest example caught in the act is the SAGITTARIUS DWARF GALAXY, about 50,000 ly from the center, being stretched by Galactic tides into long TIDAL STREAMS of stars that wrap through the halo; its dense surviving core is the globular cluster M54. Many such devoured dwarfs built up today's halo. The Galaxy's future is a merger of its own: in 3 to 4 BILLION years it will collide with the ANDROMEDA galaxy (M31). Because stars are so far apart, almost none will physically collide — they pass like smoke through a screen — but gas clouds slam together into bursts of new stars (STARBURSTS), tidal forces draw out long tails, and over about 7 billion years the two spirals settle into a single giant ELLIPTICAL galaxy, sometimes nicknamed 'Milkomeda'.",
    tabA: "A · Cannibalism", tabB: "B · Collision",
    // Tab A
    mw: "Milky Way halo", sgrDwarf: "Sagittarius Dwarf", stream: "tidal stream of stars",
    m54: "M54 — surviving nucleus", accCap: "Tides tear the dwarf into streams; M54 is its core",
    // Tab B
    mwG: "Milky Way", andG: "Andromeda (M31)", tail: "tidal tail",
    starburst: "gas → starburst", collCap: "In 3-4 Gyr: stars pass through, gas bursts → giant elliptical",
    elliptical: "giant elliptical ('Milkomeda')",
    note: "Hierarchical accretion built the Milky Way by cannibalizing dwarfs — the Sagittarius Dwarf is being shredded into tidal streams now, its core the cluster M54. In 3-4 billion years the Milky Way and Andromeda merge: stars rarely collide, gas bursts into new stars, and the pair becomes a giant elliptical.",
  },
  ja: {
    title: "共食いと衝突",
    kind: "合体で築かれ——合体へ向かう銀河",
    lede: "私たちの銀河は隣人を食べて成長し、それはまだ終わっていません。タブA：潮汐流に引き裂かれるいて座矮小銀河と、星団M54として生き残るその核。タブB：30億〜40億年後、天の川とアンドロメダが合体して巨大な楕円銀河になります。",
    thread: "旅の終わり——銀河の過去と未来",
    threadText: "私たちは銀河の形、その中の私たちの位置、その暗い質量と黒い心臓部を描いてきました。最後の章はその伝記です：共食いで築かれ、何か新しいものへ飲み込まれる運命にあります。",
    key: "合体で築かれ——そして合体へ向かう銀河",
    keyText: "天の川は一度にできたのではありません。階層的モデルでは、初期の崩壊がハローと円盤を作りましたが、銀河は宇宙の時間をかけて、より小さな伴銀河を食べて成長し続けました。現行犯で捕らえられた最も明快な例が、中心から約5万光年のいて座矮小銀河で、銀河の潮汐力に引き伸ばされ、ハローを巻くように広がる長い星の潮汐流になりつつあります。生き残った密な核が球状星団M54です。そのように食べられた多くの矮小銀河が、今日のハローを築きました。銀河の未来もまた、自らの合体です：30億〜40億年後、天の川はアンドロメダ銀河（M31）と衝突します。星どうしは非常に離れているので、物理的に衝突するものはほとんどありません——網を通る煙のようにすり抜けます——が、ガス雲は激しくぶつかって新しい星の爆発的形成（スターバースト）となり、潮汐力が長い尾を引き出し、約70億年かけて2つの渦巻銀河は、ときに「ミルコメダ」とあだ名される、ひとつの巨大な楕円銀河に落ち着きます。",
    tabA: "A · 共食い", tabB: "B · 衝突",
    mw: "天の川のハロー", sgrDwarf: "いて座矮小銀河", stream: "星の潮汐流",
    m54: "M54——生き残った核", accCap: "潮汐力が矮小銀河を流れに引き裂く。M54はその核",
    mwG: "天の川", andG: "アンドロメダ（M31）", tail: "潮汐の尾",
    starburst: "ガス → スターバースト", collCap: "30〜40億年後：星はすり抜け、ガスが爆発 → 巨大楕円銀河",
    elliptical: "巨大楕円銀河（「ミルコメダ」）",
    note: "階層的降着が矮小銀河を食べて天の川を築きました——いて座矮小銀河は今まさに潮汐流に引き裂かれ、その核が星団M54です。30億〜40億年後、天の川とアンドロメダが合体します：星はめったに衝突せず、ガスが新しい星を爆発的に作り、2つは巨大な楕円銀河になります。",
  },
};

function drawCannibal(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.5, cy = H * 0.5;
  const haloR = Math.min(cw * 0.40, H * 0.42);

  // Milky Way halo outline + disk
  ctx.strokeStyle = "rgba(150,180,240,0.25)"; ctx.lineWidth = 1; ctx.setLineDash([4, 5]);
  ctx.beginPath(); ctx.arc(cx, cy, haloR, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
  const dg = ctx.createLinearGradient(cx - haloR, cy, cx + haloR, cy);
  dg.addColorStop(0, "rgba(120,160,255,0)"); dg.addColorStop(0.5, "rgba(170,200,255,0.8)"); dg.addColorStop(1, "rgba(120,160,255,0)");
  ctx.fillStyle = dg; ctx.beginPath(); ctx.ellipse(cx, cy, haloR * 0.9, 9, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffd23f"; ctx.beginPath(); ctx.arc(cx, cy, 7, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#aecdff"; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.mw, cx, 16);

  // the Sagittarius Dwarf being torn into a tidal stream wrapping the halo
  ctx.strokeStyle = "rgba(201,139,255,0.7)"; ctx.lineWidth = 3;
  ctx.beginPath();
  for (let s = 0; s <= 1.0001; s += 0.01) {
    const ang = s * Math.PI * 2.4 + 0.6;
    const r = haloR * (0.55 + 0.4 * s);
    const x = cx + Math.cos(ang) * r, y = cy + Math.sin(ang) * r * 0.78;
    if (s === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();
  // stars flowing along the stream
  for (let i = 0; i < 26; i++) {
    const s = ((i / 26) + (tt * 0.003)) % 1;
    const ang = s * Math.PI * 2.4 + 0.6;
    const r = haloR * (0.55 + 0.4 * s);
    const x = cx + Math.cos(ang) * r, y = cy + Math.sin(ang) * r * 0.78;
    ctx.fillStyle = "rgba(220,190,255,0.9)";
    ctx.beginPath(); ctx.arc(x, y, 1.8, 0, Math.PI * 2); ctx.fill();
  }

  // the dwarf's surviving dense core (M54) at the stream's start
  const ca = 0.6, cr = haloR * 0.55;
  const mx = cx + Math.cos(ca) * cr, my = cy + Math.sin(ca) * cr * 0.78;
  const glow = ctx.createRadialGradient(mx, my, 1, mx, my, 12);
  glow.addColorStop(0, "#f0e0ff"); glow.addColorStop(1, "rgba(201,139,255,0)");
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(mx, my, 12, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#e8d6ff"; ctx.beginPath(); ctx.arc(mx, my, 5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#d9b8ff"; ctx.font = `11px ${mono}`; ctx.textAlign = "left";
  ctx.fillText(t.m54, clamp(mx + 10, 10, cw - 150), my + 4);
  ctx.fillStyle = "rgba(201,139,255,0.9)"; ctx.textAlign = "center";
  ctx.fillText(t.sgrDwarf, clamp(mx, 70, cw - 70), my - 16 < 28 ? my + 20 : my - 16);

  ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.accCap, cw / 2, H - 10);
}

function drawCollision(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  // phase cycles 0..1..0 so the two galaxies approach, merge, and relax
  const phase = 0.5 - 0.5 * Math.cos((tt * 0.006) % (Math.PI * 2));
  const cy = H * 0.46;
  const sep = (1 - phase) * cw * 0.28;
  const g1x = cw * 0.5 - sep, g2x = cw * 0.5 + sep;
  const merged = phase > 0.82;

  // disruption grows once the galaxies get close — their spiral shapes stretch, unwind and fade
  const distort = clamp((phase - 0.4) / 0.42, 0, 1);
  const drawSpiral = (gx, col, rot, toward) => {
    const R = Math.min(cw * 0.2, 80) * (1 - phase * 0.2);
    for (let s = 0; s < 2; s++) {
      ctx.strokeStyle = col; ctx.globalAlpha = 1 - distort * 0.5; ctx.lineWidth = 4;
      ctx.beginPath(); let first = true;
      for (let th = 0; th < Math.PI * 2; th += 0.06) {
        const frac = th / (Math.PI * 2);
        const r = 6 + (R - 6) * frac;
        const ang = th + s * Math.PI + rot * (1 - distort * 0.5);   // unwinds as it disrupts
        // outer stars are drawn out toward the companion (tidal stretch) and warped
        const stretch = distort * frac * 52 * toward;
        const x = gx + Math.cos(ang) * r + stretch;
        const y = cy + Math.sin(ang) * r * 0.7 + distort * frac * 16 * Math.sin(th * 1.5);
        if (first) { ctx.moveTo(x, y); first = false; } else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#ffd23f"; ctx.beginPath(); ctx.arc(gx + distort * 10 * toward, cy, 5, 0, Math.PI * 2); ctx.fill();
  };

  if (!merged) {
    drawSpiral(g1x, "rgba(120,170,255,0.8)", tt * 0.01, 1);
    drawSpiral(g2x, "rgba(255,180,140,0.8)", -tt * 0.012, -1);
    // tidal tails as the galaxies get close
    if (phase > 0.4) {
      ctx.strokeStyle = "rgba(200,180,255,0.5)"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(g1x - 40, cy); ctx.quadraticCurveTo(cw * 0.2, cy - 50 * phase, cw * 0.1, cy - 20); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(g2x + 40, cy); ctx.quadraticCurveTo(cw * 0.8, cy + 50 * phase, cw * 0.9, cy + 20); ctx.stroke();
      ctx.fillStyle = "rgba(200,180,255,0.9)"; ctx.font = `10.5px ${mono}`; ctx.textAlign = "center";
      ctx.fillText(t.tail, cw * 0.12, cy - 26);
    }
    // gas starburst flashes in the overlap region when close
    if (phase > 0.55) {
      const flash = 0.5 + 0.5 * Math.sin(tt * 0.3);
      ctx.fillStyle = `rgba(255,240,180,${0.3 + flash * 0.4})`;
      for (let k = 0; k < 10; k++) {
        const a = k * 0.9 + tt * 0.05;
        ctx.beginPath(); ctx.arc(cw * 0.5 + Math.cos(a) * 18, cy + Math.sin(a) * 12, 2.2, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = "#ffe8a0"; ctx.font = `10.5px ${mono}`; ctx.textAlign = "center";
      ctx.fillText(t.starburst, cw * 0.5, cy - 44 < 16 ? cy + 46 : cy - 44);
    }
    ctx.fillStyle = "#aecdff"; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(t.mwG, clamp(g1x, 50, cw - 50), cy + 64);
    ctx.fillStyle = "rgba(255,180,140,0.95)";
    ctx.fillText(t.andG, clamp(g2x, 50, cw - 50), cy + 64);
  } else {
    // the merged giant elliptical: a smooth ellipsoidal swarm of old stars
    const R = Math.min(cw * 0.26, 110);
    const eg = ctx.createRadialGradient(cw * 0.5, cy, 4, cw * 0.5, cy, R);
    eg.addColorStop(0, "rgba(255,230,180,0.9)"); eg.addColorStop(0.6, "rgba(255,200,150,0.5)"); eg.addColorStop(1, "rgba(255,180,120,0)");
    ctx.fillStyle = eg; ctx.beginPath(); ctx.ellipse(cw * 0.5, cy, R, R * 0.7, 0, 0, Math.PI * 2); ctx.fill();
    for (let i = 0; i < 90; i++) {
      const a = i * 2.3994, r = R * Math.sqrt(((i * 29) % 100) / 100);
      ctx.fillStyle = "rgba(255,220,170,0.7)";
      ctx.beginPath(); ctx.arc(cw * 0.5 + Math.cos(a) * r, cy + Math.sin(a) * r * 0.7, 1.5, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = "#ffe0a0"; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
    ctx.fillText(t.elliptical, cw * 0.5, cy + R * 0.7 + 18 > H - 24 ? cy - R * 0.7 - 10 : cy + R * 0.7 + 18);
  }

  ctx.fillStyle = C.faint; ctx.font = `11px ${mono}`; ctx.textAlign = "center";
  ctx.fillText(t.collCap, cw / 2, H - 10);
}

export function GalacticCannibalism() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 310;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [tab, setTab] = useState("A");
  const tabRef = useRef("A"); tabRef.current = tab;

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    const render = (tt) => {
      if (tabRef.current === "A") drawCannibal(ctx, cw, H, tt, lang);
      else drawCollision(ctx, cw, H, tt, lang);
    };
    if (reduceMotion) { render(100); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; render(tt); raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, tab, lang]);

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 08</div>
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
          <button onClick={() => setTab("A")} style={{ ...styles.chip, ...(tab === "A" ? styles.chipOn : {}) }}>{t.tabA}</button>
          <button onClick={() => setTab("B")} style={{ ...styles.chip, ...(tab === "B" ? styles.chipOn : {}) }}>{t.tabB}</button>
        </div>

        <div style={{ marginTop: 10 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default GalacticCannibalism;
