/* ============================================================
   STATION 3 — KEEPING TIME
   A solar day is about 4 minutes LONGER than a sidereal day: as Earth
   rotates it also moves ~1° along its orbit, so it must turn a little
   more than 360° to face the Sun again. The world uses 24 standard
   time zones (adopted by ~1900), and the International Date Line
   (~180° meridian, in the Pacific) is where the calendar date changes.
   Grounded in Ch.4 §4.3.
   ============================================================ */
import React, { useState, useRef, useEffect } from "react";
import { useLang, tr } from "../../../shared/i18n.jsx";
import { C, mono, display, reduceMotion } from "../../../shared/theme.js";
import { useMeasure, setupCanvas, clamp } from "../../../shared/helpers.js";
import { styles } from "../../../shared/styles.js";
import { InfoPanel } from "../../../shared/ui.jsx";

const STR = {
  en: {
    title: "Keeping time",
    kind: "The sidereal day, the solar day, and time zones",
    lede: "Start with a spot on Earth pointing at both the Sun and a distant star. Step the rotation forward: after one full turn the spot faces the star again — but the Sun has drifted. Earth must turn a little more to catch up.",
    thread: "THE STORY CONTINUES",
    threadText: "Earth's spin gives us the day, and its tilt gave us the seasons — but which spin? Because Earth also sweeps along its orbit each day, the star-clock and the Sun-clock disagree by about four minutes. Sorting that out is how we keep time.",
    key: "WHY FOUR MINUTES",
    keyText: "In one day Earth travels about 1° around its orbit. After turning a full 360° it faces the same star again — a sidereal day — but must turn that extra ~1° (about 4 minutes' worth) to point back at the Sun. So the solar day we live by is about 4 minutes longer than the sidereal day.",
    steps: [
      { tag: { en: "Start", ja: "スタート" }, label: { en: "Aligned", ja: "整列" },
        text: { en: "Our spot on Earth points straight at both the Sun and a far-off star at the same moment.", ja: "地球上の地点が、同じ瞬間に太陽と遠くの星の両方を真っすぐ指しています。" } },
      { tag: { en: "Sidereal day", ja: "恒星日" }, label: { en: "360° turn", ja: "360°回転" },
        text: { en: "After exactly one full turn (360°), the spot points at the distant star again. That is one sidereal day — 23h 56m.", ja: "ちょうど1回転（360°）すると、地点は再び遠くの星を指します。これが1恒星日——23時間56分です。" } },
      { tag: { en: "Solar day", ja: "太陽日" }, label: { en: "+1° extra", ja: "＋1°余分" },
        text: { en: "But the Sun has drifted, because Earth moved ~1° along its orbit. Earth turns that extra ~1° — about 4 more minutes — to face the Sun again. That is one solar day: 24h.", ja: "しかし地球が軌道を約1°進んだため、太陽はずれています。地球はその余分な約1°——約4分——を回って、再び太陽を向きます。これが1太陽日：24時間です。" } },
    ],
    prev: "‹ Prev", next: "Next ›", counter: (i, n) => `Step ${i} / ${n}`,
    star: "distant star", sun: "Sun", spot: "our spot",
    zonesTitle: "24 standard time zones", zonesNote: "By about 1900 most of the world had divided the globe into 24 zones — one for each hour of the day — so travelers reset their watches only by whole hours.",
    dateTitle: "International Date Line", dateNote: "Running roughly along the 180° meridian in the mid-Pacific, this is where the calendar date changes: cross it and you step a full day forward or back.",
  },
  ja: {
    title: "時を計る",
    kind: "恒星日・太陽日・時間帯",
    lede: "地球上の地点が太陽と遠くの星の両方を指している状態から始めよう。回転を進めると、1回転で地点は再び星を向きます——でも太陽はずれています。地球は少し余分に回って追いつく必要があります。",
    thread: "物語はつづく",
    threadText: "地球の自転が「1日」を、傾きが「四季」を与えてくれました——でも、どの自転でしょう。地球は毎日、公転軌道も進むため、星時計と太陽時計は約4分ずれます。それを整えることが、時を計るということなのです。",
    key: "なぜ4分か",
    keyText: "地球は1日で軌道を約1°進みます。ちょうど360°回転すると再び同じ星を向きます——これが恒星日——が、再び太陽を向くにはその余分な約1°（約4分ぶん）を回らねばなりません。だから私たちが暮らす太陽日は、恒星日より約4分長いのです。",
    steps: [
      { tag: { en: "Start", ja: "スタート" }, label: { en: "Aligned", ja: "整列" },
        text: { en: "", ja: "地球上の地点が、同じ瞬間に太陽と遠くの星の両方を真っすぐ指しています。" } },
      { tag: { en: "Sidereal day", ja: "恒星日" }, label: { en: "360° turn", ja: "360°回転" },
        text: { en: "", ja: "ちょうど1回転（360°）すると、地点は再び遠くの星を指します。これが1恒星日——23時間56分です。" } },
      { tag: { en: "Solar day", ja: "太陽日" }, label: { en: "+1° extra", ja: "＋1°余分" },
        text: { en: "", ja: "しかし地球が軌道を約1°進んだため、太陽はずれています。地球はその余分な約1°——約4分——を回って、再び太陽を向きます。これが1太陽日：24時間です。" } },
    ],
    prev: "‹ 前へ", next: "次へ ›", counter: (i, n) => `${n}中 ${i}`,
    star: "遠くの星", sun: "太陽", spot: "地点",
    zonesTitle: "24の標準時間帯", zonesNote: "1900年ごろまでに世界の大部分は、地球を24の帯——1日の各1時間ごとに1つ——に分けました。だから旅行者は時計を1時間単位でだけ合わせ直せばよくなりました。",
    dateTitle: "日付変更線", dateNote: "太平洋の真ん中、およそ180°の子午線に沿って走り、ここで暦の日付が変わります。越えると、まる1日進むか戻るかします。",
  },
};

/* Top-down view. spotAng is the rotation angle of Earth's reference spot. */
function draw(ctx, cw, H, step, lang) {
  const t = STR[lang];
  ctx.clearRect(0, 0, cw, H);
  const cx = cw * 0.62, cy = H / 2;
  const Re = Math.min(cw * 0.13, 54);

  // Sun far to the left
  const sunX = cw * 0.1, sunY = cy;
  const g = ctx.createRadialGradient(sunX, sunY, 3, sunX, sunY, 26);
  g.addColorStop(0, "#fff"); g.addColorStop(0.4, "#ffcf6b"); g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sunX, sunY, 26, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#ffcf6b"; ctx.beginPath(); ctx.arc(sunX, sunY, 11, 0, Math.PI * 2); ctx.fill();
  ctx.font = `12px ${mono}`; ctx.textAlign = "center"; ctx.fillStyle = C.sun;
  ctx.fillText(t.sun, sunX, sunY + 40);

  // distant-star direction: up (arrow off the top). Same direction as Sun at start (both leftish) — simplify: star straight up
  ctx.strokeStyle = "rgba(255,255,255,0.5)"; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, 14); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(cx, 12, 3, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = C.faint; ctx.fillText("★ " + t.star, cx + 46, 16);

  // Earth position: at start both Sun and star align with spot. We fix the geometry so
  // the "spot" points UP (toward star) at start, and the Sun is also nearly up-left.
  // For clarity we keep Earth fixed and rotate the spot marker.
  // spot angle measured from +y (up). step0: point up (at star & ~sun). step1: +360 => up again.
  // step2: +1° extra so it points slightly off from star but re-aligned to Sun direction.
  let spotAng = 0; // radians from up, clockwise
  let sunOffset = Math.atan2(sunY - cy, sunX - cx); // direction to sun from earth
  // We'll show the spot arrow toward star (up) for steps 0,1; toward sun for step2.
  let arrowAng;
  if (step === 0) arrowAng = -Math.PI / 2;          // pointing up = star (and ~sun)
  else if (step === 1) arrowAng = -Math.PI / 2;     // full turn: back to star
  else arrowAng = sunOffset;                         // extra turn to face sun

  // Earth
  const eg = ctx.createRadialGradient(cx - Re * 0.3, cy - Re * 0.3, Re * 0.2, cx, cy, Re);
  eg.addColorStop(0, "#5a92cf"); eg.addColorStop(1, "#183a63");
  ctx.fillStyle = eg; ctx.beginPath(); ctx.arc(cx, cy, Re, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "rgba(99,211,240,0.4)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(cx, cy, Re, 0, Math.PI * 2); ctx.stroke();

  // rotation arrow (curved) indicating spin
  ctx.strokeStyle = "rgba(99,211,240,0.6)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(cx, cy, Re + 10, -0.6, 0.9); ctx.stroke();

  // the spot + its pointing line
  const sx = cx + Re * Math.cos(arrowAng), sy = cy + Re * Math.sin(arrowAng);
  ctx.fillStyle = step === 2 ? C.sun : "#fff";
  ctx.beginPath(); ctx.arc(sx, sy, 5, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = step === 2 ? "rgba(255,207,107,0.8)" : "rgba(255,255,255,0.7)";
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(cx, cy);
  const far = step === 2 ? [sunX, sunY] : [cx, 14];
  ctx.lineTo(far[0], far[1]); ctx.stroke();
  ctx.fillStyle = C.text; ctx.textAlign = "center";
  ctx.fillText(t.spot, sx + 30, sy - 6);
}

export function KeepingTime() {
  const lang = useLang();
  const t = STR[lang];
  const [wrapRef, w] = useMeasure();
  const H = 300;
  const canvasRef = useRef(null);
  const [i, setI] = useState(0);
  const cw = Math.min(w, 760);
  const go = (n) => setI((k) => clamp(n, 0, t.steps.length - 1));

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = setupCanvas(c, cw, H);
    draw(ctx, cw, H, i, lang);
  }, [cw, i, lang]);

  const step = t.steps[i];

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

        {/* step chips */}
        <div style={styles.pickerRow}>
          {t.steps.map((s, k) => (
            <button key={k} onClick={() => setI(k)}
              style={{ ...styles.chip, ...(k === i ? styles.chipOn : {}) }}>{tr(s.label, lang)}</button>
          ))}
        </div>

        <canvas ref={canvasRef} style={{ display: "block", maxWidth: "100%", borderRadius: 12, background: "rgba(3,5,12,0.6)", marginTop: 12 }} />

        <div style={{ marginTop: 12, minHeight: 78, borderRadius: 12, border: `1px solid ${C.border}`, background: "rgba(8,12,26,0.6)", padding: 16 }}>
          <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 2, color: C.cool }}>{tr(step.tag, lang)}</div>
          <p style={{ ...styles.factText, fontStyle: "italic", margin: "6px 0 0" }}>{tr(step.text, lang)}</p>
        </div>

        <div style={{ ...styles.controlBar, justifyContent: "space-between" }}>
          <button style={{ ...styles.iconBtn, opacity: i === 0 ? 0.4 : 1, cursor: i === 0 ? "default" : "pointer" }}
            onClick={() => go(i - 1)} disabled={i === 0}>{t.prev}</button>
          <span style={{ fontFamily: mono, fontSize: 13, color: C.faint }}>{t.counter(i + 1, t.steps.length)}</span>
          <button style={{ ...styles.iconBtn, opacity: i === t.steps.length - 1 ? 0.4 : 1, cursor: i === t.steps.length - 1 ? "default" : "pointer" }}
            onClick={() => go(i + 1)} disabled={i === t.steps.length - 1}>{t.next}</button>
        </div>

        {/* 24 time zones strip */}
        <div style={{ marginTop: 18, border: `1px solid ${C.border}`, borderRadius: 12, background: "rgba(8,12,26,0.6)", padding: "12px 16px" }}>
          <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1.5, color: C.faint, marginBottom: 8 }}>{t.zonesTitle}</div>
          <div style={{ display: "flex", gap: 2, height: 26 }}>
            {Array.from({ length: 24 }).map((_, k) => (
              <div key={k} style={{ flex: 1, borderRadius: 2, background: `hsl(${210 + k * 3}, ${40}%, ${18 + (k % 2) * 10}%)`, borderRight: k === 11 ? `2px solid ${C.sun}` : "none", position: "relative" }}
                title={`UTC${k - 12 >= 0 ? "+" : ""}${k - 12}`} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 11.5, color: C.faint, marginTop: 4 }}>
            <span>UTC−12</span><span style={{ color: C.sun }}>0°</span><span>UTC+12</span>
          </div>
          <p style={{ ...styles.note, marginTop: 8, maxWidth: "none" }}>{t.zonesNote}</p>
        </div>

        {/* Date line */}
        <div style={{ marginTop: 14, border: `1px solid ${C.border}`, borderRadius: 12, background: "rgba(8,12,26,0.6)", padding: "12px 16px" }}>
          <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: 1.5, color: C.violet, marginBottom: 6 }}>↕ {t.dateTitle} · 180°</div>
          <p style={{ ...styles.note, margin: 0, maxWidth: "none" }}>{t.dateNote}</p>
        </div>
      </div>
    </div>
  );
}

export default KeepingTime;
