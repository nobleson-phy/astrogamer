/* ============================================================
   STATION 7 — GHOST PARTICLES: NEUTRINOS
   Neutrinos (proposed by Pauli) are chargeless, nearly massless, and
   barely interact — so they escape the Sun's core at light speed,
   reaching Earth in ~8 minutes, while photons take 100,000+ years.
   Raymond Davis built a detector deep in the Homestake gold mine (South
   Dakota) so rock would block false-signal cosmic rays. It found only
   1/3-1/2 the expected neutrinos: the "solar neutrino problem," solved
   by neutrino oscillation between flavors. Grounded in Ch.16 §16.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Ghost particles: neutrinos",
    kind: "They escape in minutes",
    lede: "Neutrinos ignore matter almost completely. Watch one shoot straight out of the core while a photon is still trapped — then see how we caught them a mile underground.",
    thread: "THE STORY CONTINUES",
    threadText: "Fusion makes more than light. It also makes neutrinos — spectral particles that carry direct news from the core, if only we can catch a few of the trillions passing through us.",
    escapeKey: "NEUTRINOS LEAVE AT LIGHT SPEED; PHOTONS CRAWL",
    escapeText: "A neutrino, proposed by Wolfgang Pauli in 1933, has no charge, almost no mass, and interacts so weakly that matter is nearly transparent to it. So neutrinos made in fusion fly straight out of the Sun at essentially light speed, reaching Earth in about 8 minutes. Photons from the same reactions, by contrast, take 100,000+ years to random-walk to the surface. Neutrinos are our only direct, real-time messengers from the Sun's core.",
    detectKey: "DAVIS'S DEEP DETECTOR & THE NEUTRINO PROBLEM",
    detectText: "Raymond Davis, Jr. built a tank of 400,000 liters of cleaning fluid 1.5 km underground in the Homestake gold mine in South Dakota. The kilometers of rock block cosmic rays that would create false argon signals, while neutrinos pass through easily. Davis detected only one-third to one-half of the predicted electron neutrinos — the 'solar neutrino problem.' It was resolved by the discovery that neutrinos oscillate (change flavor) into muon and tau types on the way to Earth — which also proved neutrinos have a tiny mass.",
    escape: "Escape from the Sun", detect: "Davis's detector",
    neutrino: "neutrino → 8 min", photon: "photon → 100,000+ yr", cosmic: "cosmic rays blocked by rock",
    tank: "detector (1.5 km deep)", problem: "detected only 1/3–1/2 → oscillation (νe → νμ, ντ)",
    noteE: "Neutrinos barely interact, so they leave the core at light speed and reach Earth in 8 minutes — while photons take 100,000+ years.",
    noteD: "Davis's Homestake tank sat 1.5 km underground so rock blocked cosmic rays. It saw only 1/3–1/2 the neutrinos — solved by neutrino oscillation between flavors.",
  },
  ja: {
    title: "幽霊粒子：ニュートリノ",
    kind: "数分で逃げ出す",
    lede: "ニュートリノは物質をほぼ完全に無視します。光子がまだ閉じ込められている間に、核からまっすぐ飛び出す様子を見て——それをどう地下1.6 kmで捕まえたかを見よう。",
    thread: "物語はつづく",
    threadText: "核融合は光以上のものを作ります。ニュートリノ——核から直接ニュースを運ぶ幽玄な粒子——も作ります。私たちを通り抜ける何兆個のうち、ほんの数個でも捕まえられれば。",
    escapeKey: "ニュートリノは光速で去り、光子は這う",
    escapeText: "1933年にヴォルフガング・パウリが提案したニュートリノは、電荷がなく質量がほぼなく、相互作用が非常に弱いため物質はほぼ透明です。だから核融合で作られたニュートリノは、事実上の光速で太陽をまっすぐ飛び出し、約8分で地球に届きます。対照的に、同じ反応の光子は表面までランダムウォークするのに10万年以上かかります。ニュートリノは太陽の核からの唯一の直接的でリアルタイムの使者です。",
    detectKey: "デイビスの深い検出器とニュートリノ問題",
    detectText: "レイモンド・デイビス・ジュニアは、サウスダコタのホームステーク金鉱の地下1.5 kmに、40万リットルの洗浄液のタンクを設置しました。何kmもの岩が、偽のアルゴン信号を作る宇宙線を遮る一方、ニュートリノは難なく通り抜けます。デイビスは予測される電子ニュートリノの1/3〜1/2しか検出しませんでした——「太陽ニュートリノ問題」です。これは、ニュートリノが地球への途中でミュー型・タウ型に振動する（型が変わる）という発見で解決され、ニュートリノにわずかな質量があることも証明しました。",
    escape: "太陽からの脱出", detect: "デイビスの検出器",
    neutrino: "ニュートリノ → 8分", photon: "光子 → 10万年以上", cosmic: "宇宙線は岩に遮られる",
    tank: "検出器（地下1.5 km）", problem: "1/3〜1/2しか検出 → 振動（νe → νμ, ντ）",
    noteE: "ニュートリノはほとんど相互作用しないので光速で核を去り、8分で地球へ——光子は10万年以上かかります。",
    noteD: "デイビスのホームステークのタンクは地下1.5 kmにあり、岩が宇宙線を遮りました。ニュートリノは1/3〜1/2しか見えず——型間の振動で解決されました。",
  },
};

function drawEscape(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const sunX = cw * 0.24, sunY = H / 2, R = Math.min(cw * 0.18, H * 0.4);
  const g = ctx.createRadialGradient(sunX, sunY, 4, sunX, sunY, R);
  g.addColorStop(0, "#fff2c0"); g.addColorStop(1, "#e8952a");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sunX, sunY, R, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "rgba(255,242,192,0.6)"; ctx.beginPath(); ctx.arc(sunX, sunY, R * 0.3, 0, Math.PI * 2); ctx.fill();
  // photon random-walk stuck inside
  ctx.strokeStyle = "rgba(255,210,140,0.8)"; ctx.lineWidth = 1;
  ctx.beginPath(); let px = sunX, py = sunY;
  for (let i = 0; i < 30; i++) { const a = Math.sin(i * 2.3 + 1) * 6; px += Math.cos(i + tt * 0.01) * 4; py += Math.sin(i * 1.7) * 4; if (Math.hypot(px - sunX, py - sunY) > R * 0.8) break; ctx.lineTo(px, py); }
  ctx.stroke();
  ctx.fillStyle = "#ffd86b"; ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffd86b"; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.photon, sunX, sunY + R + 16);
  // neutrino streaking straight to Earth (right)
  const earthX = cw - 44;
  ctx.fillStyle = "#7fb0e0"; ctx.beginPath(); ctx.arc(earthX, sunY, 11, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.faint; ctx.fillText("Earth", earthX, sunY + 26);
  const p = (tt * 0.01) % 1;
  const nx = sunX + p * (earthX - sunX);
  ctx.strokeStyle = "rgba(169,208,255,0.5)"; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(sunX, sunY); ctx.lineTo(earthX, sunY); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = "#a9d0ff"; ctx.beginPath(); ctx.arc(nx, sunY, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#a9d0ff"; ctx.font = `10px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.neutrino, (sunX + earthX) / 2, sunY - 12);
}

function drawDetect(ctx, cw, H, tt, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const skyH = H * 0.24;
  ctx.fillStyle = "rgba(30,45,80,0.4)"; ctx.fillRect(0, 0, cw, skyH);
  ctx.fillStyle = "#3a3129"; ctx.fillRect(0, skyH, cw, H - skyH); // rock
  // sun in sky (upper left)
  ctx.fillStyle = "#ffd86b"; ctx.beginPath(); ctx.arc(cw * 0.16, skyH * 0.5, 12, 0, Math.PI * 2); ctx.fill();
  // detector tank deep down
  const tankX = cw * 0.6, tankY = H * 0.78, tw = 90, th = 40;
  ctx.fillStyle = "rgba(120,180,220,0.35)"; ctx.fillRect(tankX - tw / 2, tankY - th / 2, tw, th);
  ctx.strokeStyle = "rgba(150,200,235,0.7)"; ctx.strokeRect(tankX - tw / 2, tankY - th / 2, tw, th);
  ctx.fillStyle = C.cool; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.tank, tankX, tankY + th / 2 + 14);
  // cosmic rays from top, blocked by rock
  ctx.strokeStyle = "rgba(255,120,90,0.8)"; ctx.lineWidth = 1.5;
  for (let i = 0; i < 5; i++) { const x = cw * 0.2 + i * cw * 0.12; const yEnd = skyH + 20 + (i % 3) * 8; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, yEnd); ctx.stroke(); ctx.fillStyle = "rgba(255,120,90,0.8)"; ctx.fillText("✕", x, yEnd + 8); }
  ctx.fillStyle = "#ff8f6a"; ctx.font = `9px ${mono}`; ctx.textAlign = "left"; ctx.fillText(t.cosmic, 8, skyH + 14);
  // neutrinos pass straight through rock into tank
  ctx.strokeStyle = "rgba(169,208,255,0.7)"; ctx.lineWidth = 1;
  for (let i = 0; i < 4; i++) { const off = ((tt * 2 + i * 40) % 200) / 200; const sx = cw * 0.16, sy = skyH * 0.5; const ex = tankX, ey = tankY; const x = sx + off * (ex - sx), y = sy + off * (ey - sy); ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2); ctx.fillStyle = "#a9d0ff"; ctx.fill(); }
  ctx.beginPath(); ctx.moveTo(cw * 0.16, skyH * 0.5); ctx.lineTo(tankX, tankY); ctx.stroke();
  // problem readout
  ctx.fillStyle = C.sun; ctx.font = `9px ${mono}`; ctx.textAlign = "center"; ctx.fillText(t.problem, cw / 2, H - 6);
}

export function Neutrinos() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 250;
  const canRef = useRef(null);
  const cw = Math.min(w, 760);
  const [mode, setMode] = useState("escape");

  useEffect(() => {
    const c = canRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    if (reduceMotion) { (mode === "escape" ? drawEscape : drawDetect)(ctx, cw, H, 40, lang); return; }
    let raf, tt = 0;
    const loop = () => { tt += 1; (mode === "escape" ? drawEscape : drawDetect)(ctx, cw, H, tt, lang); raf = requestAnimationFrame(loop); };
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
          <div style={{ ...styles.fateLabel, color: C.sun }}>{mode === "escape" ? t.escapeKey : t.detectKey}</div>
          <p style={styles.keyTermText}>{mode === "escape" ? t.escapeText : t.detectText}</p>
        </div>
      </InfoPanel>

      <div style={{ flex: "1 1 460px", minWidth: 280 }}>
        <p style={{ ...styles.note, fontStyle: "italic", marginTop: 0, marginBottom: 12 }}>{t.lede}</p>

        <div style={styles.pickerRow}>
          {[["escape", t.escape], ["detect", t.detect]].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)}
              style={{ ...styles.chip, ...(mode === id ? styles.chipOn : {}) }}>{label}</button>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <canvas ref={canRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)" }} />
        </div>

        <p style={{ ...styles.note, maxWidth: "none" }}>{mode === "escape" ? t.noteE : t.noteD}</p>
      </div>
    </div>
  );
}

export default Neutrinos;
