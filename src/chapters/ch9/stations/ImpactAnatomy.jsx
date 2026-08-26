/* ============================================================
   STATION 2 — ANATOMY OF AN IMPACT
   Grove K. Gilbert reasoned in the 1890s that lunar craters are
   impacts, not volcanoes. A projectile strikes at ≥ escape speed
   (2.4 km/s for the Moon); the energy explodes on contact, blasting
   out a crater 10–15× the projectile's diameter — and always
   circular, whatever the strike angle. Grounded in Ch.9 §9.2.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Anatomy of an impact",
    kind: "How a crater is really made",
    lede: "A crater is not a dent — it is an explosion scar. Set the projectile size and its approach angle, then fire and watch the blast excavate a circle 10–15 times wider than the impactor.",
    thread: "THE STORY CONTINUES",
    threadText: "For a long time people argued the craters were volcanoes. In the 1890s the geologist Grove K. Gilbert reasoned otherwise: their shapes match explosions, not eruptions. Understanding that blast is the key to reading every cratered world.",
    key: "AN EXPLOSION, 10–15× THE PROJECTILE",
    keyText: "Nothing can strike the Moon slower than its escape velocity, 2.4 km/s, and most impacts are far faster. At those speeds the projectile buries itself and its enormous energy detonates like a bomb, blasting out a bowl 10 to 15 times its own diameter. Because the energy explodes outward from a point, the crater is almost always circular — even for a shallow, angled hit. Grove K. Gilbert first reasoned this impact origin in the 1890s.",
    sizeL: "Projectile diameter", angleL: "Strike angle", craterL: "Crater diameter",
    fire: "▶ Fire projectile", steep: "steep", shallow: "shallow", km: "km",
    circleNote: "≈ circular, whatever the angle",
    note: "The crater comes out 10–15× the projectile's size and stays circular even at a shallow angle, because the impact energy explodes outward from the point of contact — exactly Gilbert's insight.",
  },
  ja: {
    title: "衝突の解剖",
    kind: "クレーターの本当のでき方",
    lede: "クレーターはへこみではなく——爆発の傷跡です。発射体の大きさと進入角を設定して発射し、爆発が衝突体の10〜15倍幅の円を掘り出す様子を見よう。",
    thread: "物語はつづく",
    threadText: "長いあいだ、人々はクレーターを火山だと論じました。1890年代、地質学者グローブ・K・ギルバートは違うと考えました：その形は噴火ではなく爆発に合う、と。その爆発を理解することが、あらゆるクレーター世界を読む鍵です。",
    key: "爆発、発射体の10〜15倍",
    keyText: "月に当たるものは、脱出速度の2.4 km/sより遅くは当たれず、多くの衝突ははるかに速いのです。その速さでは発射体は潜り込み、その巨大なエネルギーが爆弾のように爆発して、自分の直径の10〜15倍の椀を掘り出します。エネルギーが一点から外へ爆発するため、浅い斜めの衝突でもクレーターはほぼ必ず円形になります。この衝突起源を最初に論じたのが、1890年代のギルバートです。",
    sizeL: "発射体の直径", angleL: "進入角", craterL: "クレーターの直径",
    fire: "▶ 発射体を撃つ", steep: "急", shallow: "浅い", km: "km",
    circleNote: "≈ 角度によらず円形",
    note: "クレーターは発射体の10〜15倍の大きさになり、浅い角度でも円形を保ちます——衝突エネルギーが接触点から外へ爆発するからです。まさにギルバートの洞察です。",
  },
};

function draw(ctx, cw, H, projKm, angleDeg, prog, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const groundY = H - 46;
  const cx = cw / 2;
  const scale = 3.0; // px per km (projectile)
  const projR = Math.max(3, projKm * scale / 2);
  const craterR = projKm * 12.5 * scale / 2 * 0.5; // 12.5× diameter, halved for radius, damped to fit
  const cW = Math.min(craterR, cw * 0.42);
  // ground
  ctx.fillStyle = "#8a8072"; ctx.fillRect(0, groundY, cw, H - groundY);
  // approach direction
  const a = (angleDeg * Math.PI) / 180; // from horizontal
  const dx = Math.cos(a), dy = Math.sin(a);
  if (prog < 0.5) {
    // projectile incoming toward impact point (cx, groundY)
    const f = prog / 0.5;
    const dist = (1 - f) * (cw * 0.5);
    const px = cx - dx * dist, py = groundY - dy * dist;
    ctx.strokeStyle = "rgba(255,180,120,0.5)"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx - dx * cw * 0.5, groundY - dy * cw * 0.5); ctx.lineTo(px, py); ctx.stroke();
    const g = ctx.createRadialGradient(px, py, 1, px, py, projR + 3);
    g.addColorStop(0, "#fff2c0"); g.addColorStop(1, "#ff6b3a");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, py, projR, 0, Math.PI * 2); ctx.fill();
  } else {
    // explosion + crater excavation
    const f = (prog - 0.5) / 0.5;
    if (f < 0.35) {
      const fa = 1 - f / 0.35;
      const fg = ctx.createRadialGradient(cx, groundY, 2, cx, groundY, cW * 1.6);
      fg.addColorStop(0, `rgba(255,240,180,${0.85 * fa})`); fg.addColorStop(1, "rgba(255,120,60,0)");
      ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(cx, groundY, cW * 1.6, 0, Math.PI * 2); ctx.fill();
    }
    const cr = cW * Math.min(1, f * 1.4);
    // crater bowl (a shallow arc dug into the ground) — CIRCULAR regardless of angle
    ctx.fillStyle = "#3a342c";
    ctx.beginPath(); ctx.ellipse(cx, groundY, cr, cr * 0.34, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#c9c1b0"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.ellipse(cx, groundY, cr, cr * 0.34, 0, Math.PI, 2 * Math.PI); ctx.stroke();
    // raised rim
    ctx.strokeStyle = "rgba(220,214,200,0.7)"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(cx, groundY - 2, cr + 3, (cr + 3) * 0.34, 0, Math.PI, 2 * Math.PI); ctx.stroke();
    // "circular" label
    if (f > 0.6) { ctx.fillStyle = C.good; ctx.font = `11px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.circleNote, cx, groundY - cr * 0.34 - 12); }
  }
}

export function ImpactAnatomy() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 260;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [projKm, setProjKm] = useState(6);
  const [angle, setAngle] = useState(60);
  const progRef = useRef(1);
  const runRef = useRef(false);
  const stateRef = useRef({ projKm, angle });
  stateRef.current = { projKm, angle };

  const craterKm = Math.round(projKm * 12.5);

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { draw(ctx, cw, H, projKm, angle, 1, lang); return; }
    let raf;
    const loop = () => {
      if (runRef.current) { progRef.current = clamp(progRef.current + 0.012, 0, 1); if (progRef.current >= 1) runRef.current = false; }
      draw(ctx, cw, H, stateRef.current.projKm, stateRef.current.angle, progRef.current, lang);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [cw, lang]);

  // redraw immediately when sliders change while idle
  useEffect(() => {
    if (!reduceMotion) return;
    const c = canRef.current; if (!c) return;
    draw(setupCanvas(c, cw, H), cw, H, projKm, angle, 1, lang);
  }, [projKm, angle, cw, lang]);

  const fire = () => { progRef.current = 0; runRef.current = true; if (reduceMotion) { const c = canRef.current; if (c) draw(setupCanvas(c, cw, H), cw, H, projKm, angle, 1, lang); } };

  return (
    <div ref={wrapRef} style={styles.realmGrid}>
      <InfoPanel>
        <div style={styles.stepCounter}>STATION 02</div>
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

        <div style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "flex-end" }}>
          <div style={{ flex: "1 1 180px" }}>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.faint }}>{t.sizeL}: <span style={{ color: C.cool }}>{projKm} {t.km}</span></div>
            <input type="range" min={1} max={12} step={1} value={projKm} onChange={(e) => setProjKm(parseInt(e.target.value))} style={styles.range} />
          </div>
          <div style={{ flex: "1 1 180px" }}>
            <div style={{ fontFamily: mono, fontSize: 12, color: C.faint }}>{t.angleL}: <span style={{ color: C.cool }}>{angle}°</span></div>
            <input type="range" min={15} max={90} step={5} value={angle} onChange={(e) => setAngle(parseInt(e.target.value))} style={styles.range} />
            <div style={styles.rangeEnds}><span>{t.shallow}</span><span>{t.steep}</span></div>
          </div>
        </div>

        <div style={{ ...styles.controlBar, marginTop: 8 }}>
          <button style={styles.iconBtn} onClick={fire}>{t.fire}</button>
          <span style={{ fontFamily: mono, fontSize: 13, color: C.faint }}>{t.craterL}: <span style={{ color: C.sun, fontSize: 16 }}>≈ {craterKm} {t.km}</span> (12.5×)</span>
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{t.note}</p>
      </div>
    </div>
  );
}

export default ImpactAnatomy;
