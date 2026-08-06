/* ============================================================
   BONUS ARCADE — a different game per section
   Reward-driven: the quiz hands the player a { lives, seconds }
   reward; the round ends when lives hit 0 OR the timer runs out.
   Games share ArcadeShell; each supplies init(g,api) + step(g,ctx,dt,api,over).
   ============================================================ */
import React, { useState, useRef, useEffect, useMemo } from "react";
import { useLang, tr } from "./i18n.jsx";
import { C, ui, mono } from "./theme.js";
import { clamp, setupCanvas } from "./helpers.js";
import { styles } from "./styles.js";
import { CONSTELLATIONS } from "./interactives/data.js";

const STR = {
  en: {
    bonusLede: "You earned a bonus round!",
    arcadeControls: "Move: ◀ ▶ · arrow keys · drag  |  Fire: FIRE · space · hold",
    startGame: "▶ Start", fire: "FIRE", score: "Score", time: "Time",
    gameOver: "Game Over", timeUp: "Time's up",
    playAgain: "↺ Play again", backToResults: "‹ Back",
    controlsShoot: "Move: ◀ ▶ · arrows · drag  |  Fire: FIRE · space",
    controlsMove: "Move: ◀ ▶ · arrow keys · drag",
    controlsTap: "Tap the stars in number order",
    howToPlay: "How to play",
    labelGoal: "Goal", labelControls: "Controls", labelAvoid: "Avoid", labelLives: "Lives",
    livesRule: "Lose all your lives and the round ends.",
    intro: (lives, secs) =>
      `You have ${lives} ${lives === 1 ? "life" : "lives"} and ${fmtClock(secs)} on the clock. Survive as long as you can!`,
  },
  ja: {
    bonusLede: "ボーナスゲーム解放！",
    arcadeControls: "移動：◀ ▶ · 矢印キー · ドラッグ  |  発射：FIRE · スペース · 長押し",
    startGame: "▶ スタート", fire: "発射", score: "得点", time: "残り",
    gameOver: "ゲームオーバー", timeUp: "タイムアップ",
    playAgain: "↺ もう一度", backToResults: "‹ 戻る",
    controlsShoot: "移動：◀ ▶ · 矢印 · ドラッグ  |  発射：FIRE · スペース",
    controlsMove: "移動：◀ ▶ · 矢印キー · ドラッグ",
    controlsTap: "星を番号順にタップ",
    howToPlay: "遊び方",
    labelGoal: "目的", labelControls: "操作", labelAvoid: "注意", labelLives: "ライフ",
    livesRule: "ライフをすべて失うとゲーム終了。",
    intro: (lives, secs) =>
      `ライフ ${lives} と 残り時間 ${fmtClock(secs)} でスタート。できるだけ長く生き延びよう！`,
  },
};

function fmtClock(sec) {
  const s = Math.max(0, Math.ceil(sec));
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
}

/* ---------- shared game drawing helpers ---------- */
function makeRockVerts() {
  const n = 8 + Math.floor(Math.random() * 4);
  return Array.from({ length: n }, () => 0.72 + Math.random() * 0.5);
}
function spawnParts(g, x, y, r, color) {
  const n = 6 + Math.floor(r / 4);
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2, sp = 40 + Math.random() * 120;
    g.parts.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0.4 + Math.random() * 0.4, color });
  }
}
const makeStars = (W, H, n) => Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.2 + 0.2 }));
function lose(g, over) { g.lives -= 1; g.flash = 0.5; if (g.lives <= 0) over("dead"); }
function drawBg(ctx, g, W, H) {
  ctx.fillStyle = "#070a14"; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "rgba(255,255,255,0.35)";
  for (const s of g.bg) { ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill(); }
}
function drawRock(ctx, r) {
  ctx.save(); ctx.translate(r.x, r.y); ctx.rotate(r.spin || 0);
  const verts = r.verts || (r.verts = makeRockVerts());
  ctx.beginPath();
  verts.forEach((vv, i) => { const a = (i / verts.length) * Math.PI * 2; const rr = r.r * vv; const px = Math.cos(a) * rr, py = Math.sin(a) * rr; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); });
  ctx.closePath(); ctx.fillStyle = "#6b7180"; ctx.fill(); ctx.strokeStyle = "#9aa2b4"; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore();
}
function drawShip(ctx, x, y) {
  const glow = ctx.createRadialGradient(x, y, 2, x, y, 26);
  glow.addColorStop(0, "rgba(99,211,240,0.5)"); glow.addColorStop(1, "rgba(99,211,240,0)");
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(x, y, 26, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#eaf3ff"; ctx.beginPath(); ctx.moveTo(x, y - 16); ctx.lineTo(x - 12, y + 12); ctx.lineTo(x + 12, y + 12); ctx.closePath(); ctx.fill();
  ctx.fillStyle = "#ffcf6b"; ctx.beginPath(); ctx.moveTo(x - 4, y + 12); ctx.lineTo(x + 4, y + 12); ctx.lineTo(x, y + 18 + Math.random() * 6); ctx.closePath(); ctx.fill();
}

/* --- Constellation Connect helpers --- */
function slSetup(g, api) {
  const idx = Math.floor(Math.random() * CONSTELLATIONS.length);
  const con = CONSTELLATIONS[idx];
  const padX = 70, padY = 60;
  g.con = con;
  g.pts = con.stars.map(([x, y]) => [padX + x * (api.W - 2 * padX), padY + y * (api.H - 2 * padY)]);
  g.order = 0; g.max = Math.max(3.5, 7 / api.diff); g.time = g.max; g.done = false; g.doneT = 0;
}
function slLinks(ctx, g, complete) {
  ctx.strokeStyle = "rgba(99,211,240,0.7)"; ctx.lineWidth = 2;
  if (complete) {
    for (const [a, b] of g.con.lines) { ctx.beginPath(); ctx.moveTo(g.pts[a][0], g.pts[a][1]); ctx.lineTo(g.pts[b][0], g.pts[b][1]); ctx.stroke(); }
  } else {
    for (let i = 1; i < g.order; i++) { ctx.beginPath(); ctx.moveTo(g.pts[i - 1][0], g.pts[i - 1][1]); ctx.lineTo(g.pts[i][0], g.pts[i][1]); ctx.stroke(); }
  }
}
function slStars(ctx, g, complete) {
  g.pts.forEach((p, i) => {
    const tapped = i < g.order || complete, next = !complete && i === g.order;
    const gr = ctx.createRadialGradient(p[0], p[1], 0, p[0], p[1], 12);
    gr.addColorStop(0, tapped ? "#63d3f0" : "#dfe9ff"); gr.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(p[0], p[1], 12, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = tapped ? "#63d3f0" : "#ffffff"; ctx.beginPath(); ctx.arc(p[0], p[1], 5, 0, Math.PI * 2); ctx.fill();
    if (next) { ctx.strokeStyle = "#ffcf6b"; ctx.lineWidth = 2; const pr = 10 + Math.sin(g.t * 6) * 3; ctx.beginPath(); ctx.arc(p[0], p[1], pr, 0, Math.PI * 2); ctx.stroke(); }
    if (!tapped) { ctx.fillStyle = "#e9edf7"; ctx.font = `700 13px ${mono}`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(String(i + 1), p[0], p[1]); ctx.textBaseline = "alphabetic"; }
  });
}

/* ---------- the four games ---------- */
export const GAMES_DEF = {
  solar: {
    meta: { title: { en: "Asteroid Defense", ja: "小惑星ディフェンス" }, goal: { en: "Shoot the falling asteroids to score — bigger rocks are worth more.", ja: "落ちてくる小惑星を撃って得点——大きい岩ほど高得点。" }, avoid: { en: "Don't let a rock reach the bottom or hit your ship — it costs a life.", ja: "岩を最下部まで落とすか自機に当てるとライフを1つ失う。" }, pad: "lrf" },
    init: (g, api) => { g.shipX = api.W / 2; g.bullets = []; g.rocks = []; g.cd = 0; g.spawn = 0.5; g.bg = makeStars(api.W, api.H, 60); },
    step: (g, ctx, dt, api, over) => {
      const { W, H, keys, diff } = api, spd = 330;
      if (keys.left) g.shipX -= spd * dt;
      if (keys.right) g.shipX += spd * dt;
      if (g.pdown && g.px != null) g.shipX += clamp(g.px - g.shipX, -spd * dt, spd * dt);
      g.shipX = clamp(g.shipX, 18, W - 18);
      g.cd -= dt;
      if ((keys.fire || g.pdown) && g.cd <= 0) { g.bullets.push({ x: g.shipX, y: H - 42 }); g.cd = 0.2; }
      for (const b of g.bullets) b.y -= 540 * dt;
      g.bullets = g.bullets.filter((b) => b.y > -12 && !b.dead);
      g.spawn -= dt; const iv = Math.max(0.32, 0.95 / diff - g.t * 0.008);
      if (g.spawn <= 0) { const s = 13 + Math.random() * 22; g.rocks.push({ x: s + Math.random() * (W - s * 2), y: -s, r: s, vy: (34 + Math.random() * 26) * diff * (1 + g.t * 0.02), vx: (Math.random() - 0.5) * 26, spin: Math.random() * 6, vspin: (Math.random() - 0.5) * 2, verts: makeRockVerts() }); g.spawn = iv; }
      for (const r of g.rocks) { r.y += r.vy * dt; r.x += r.vx * dt; r.spin += r.vspin * dt; if (r.x < r.r || r.x > W - r.r) r.vx *= -1; }
      for (const r of g.rocks) { if (r.dead) continue; for (const b of g.bullets) { if (b.dead) continue; if (Math.hypot(b.x - r.x, b.y - r.y) < r.r + 3) { b.dead = true; r.dead = true; g.score += Math.round(r.r); spawnParts(g, r.x, r.y, r.r, "#ffcf6b"); break; } } }
      for (const r of g.rocks) { if (r.dead) continue; if (r.y - r.r > H) { r.dead = true; lose(g, over); } else if (Math.hypot(r.x - g.shipX, r.y - (H - 30)) < r.r + 12) { r.dead = true; spawnParts(g, r.x, r.y, r.r, "#ff7a6b"); lose(g, over); } }
      g.rocks = g.rocks.filter((r) => !r.dead); g.bullets = g.bullets.filter((b) => !b.dead);
      drawBg(ctx, g, W, H);
      for (const r of g.rocks) drawRock(ctx, r);
      ctx.strokeStyle = C.cool; ctx.lineWidth = 2.5;
      for (const b of g.bullets) { ctx.beginPath(); ctx.moveTo(b.x, b.y); ctx.lineTo(b.x, b.y + 10); ctx.stroke(); }
      drawShip(ctx, g.shipX, H - 30);
    },
  },
  star: {
    meta: { title: { en: "Star Catcher", ja: "スターキャッチャー" }, goal: { en: "Catch the glowing hydrogen orbs — each one scores points.", ja: "光る水素の玉をキャッチ——1個ごとに得点。" }, avoid: { en: "Catching a dark rock costs a life, so steer around them.", ja: "暗い岩をキャッチするとライフを失うので、よけて進もう。" }, pad: "lr" },
    init: (g, api) => { g.x = api.W / 2; g.items = []; g.spawn = 0.4; g.bg = makeStars(api.W, api.H, 60); },
    step: (g, ctx, dt, api, over) => {
      const { W, H, keys, diff } = api, spd = 340, cy = H - 26;
      if (keys.left) g.x -= spd * dt;
      if (keys.right) g.x += spd * dt;
      if (g.pdown && g.px != null) g.x += clamp(g.px - g.x, -spd * dt, spd * dt);
      g.x = clamp(g.x, 26, W - 26);
      g.spawn -= dt; const iv = Math.max(0.28, 0.7 / diff - g.t * 0.006);
      if (g.spawn <= 0) { const bad = Math.random() < 0.32; g.items.push({ x: 22 + Math.random() * (W - 44), y: -14, r: bad ? 12 + Math.random() * 8 : 8, vy: (90 + Math.random() * 60) * diff * (1 + g.t * 0.015), bad, verts: bad ? makeRockVerts() : null }); g.spawn = iv; }
      for (const it of g.items) it.y += it.vy * dt;
      for (const it of g.items) {
        if (it.hit) continue;
        if (it.y > cy - 12 && it.y < cy + 16 && Math.abs(it.x - g.x) < 30) { it.hit = true; if (it.bad) { spawnParts(g, it.x, it.y, it.r, "#ff7a6b"); lose(g, over); } else { g.score += 5; spawnParts(g, it.x, it.y, it.r, "#ffcf6b"); } }
        else if (it.y > H + 20) it.hit = true;
      }
      g.items = g.items.filter((it) => !it.hit);
      drawBg(ctx, g, W, H);
      for (const it of g.items) {
        if (it.bad) drawRock(ctx, { x: it.x, y: it.y, r: it.r, spin: g.t * 2, verts: it.verts });
        else { const gr = ctx.createRadialGradient(it.x, it.y, 0, it.x, it.y, it.r * 2); gr.addColorStop(0, "#ffe08a"); gr.addColorStop(1, "rgba(255,207,107,0)"); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(it.x, it.y, it.r * 2, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = "#fff4d6"; ctx.beginPath(); ctx.arc(it.x, it.y, it.r, 0, Math.PI * 2); ctx.fill(); }
      }
      const glow = ctx.createRadialGradient(g.x, cy, 2, g.x, cy, 26); glow.addColorStop(0, "rgba(99,211,240,0.4)"); glow.addColorStop(1, "rgba(99,211,240,0)");
      ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(g.x, cy, 26, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = C.cool; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(g.x, cy + 4, 22, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke();
    },
  },
  sky: {
    meta: { title: { en: "Constellation Connect", ja: "星座つなぎ" }, goal: { en: "Tap the numbered stars in order (1, 2, 3…) to draw it. Finish faster for more points.", ja: "番号のついた星を順番（1・2・3…）にタップして描こう。早いほど高得点。" }, avoid: { en: "A wrong star, or running out of time, costs a life.", ja: "違う星をタップするか時間切れになるとライフを失う。" }, pad: "none" },
    init: (g, api) => { g.bg = makeStars(api.W, api.H, 90); slSetup(g, api); },
    step: (g, ctx, dt, api, over) => {
      const { W, H, lang } = api;
      drawBg(ctx, g, W, H);
      if (g.done) {
        g.doneT -= dt; slLinks(ctx, g, true); slStars(ctx, g, true);
        ctx.fillStyle = C.cool; ctx.font = `600 19px ${ui}`; ctx.textAlign = "center"; ctx.fillText(tr(g.con.name, lang), W / 2, 34);
        if (g.doneT <= 0) slSetup(g, api);
        return;
      }
      g.time -= dt;
      if (g.time <= 0) { lose(g, over); g.time = g.max; }
      if (g.tapped) {
        const { x, y } = g.tapped; g.tapped = null;
        let hit = -1, bd = 1e9;
        g.pts.forEach((p, i) => { const d = Math.hypot(p[0] - x, p[1] - y); if (d < 24 && d < bd) { bd = d; hit = i; } });
        if (hit === g.order) { g.order++; if (g.order >= g.pts.length) { g.score += Math.round(20 + g.time * 3); g.done = true; g.doneT = 1.2; } }
        else if (hit >= 0) { lose(g, over); spawnParts(g, g.pts[hit][0], g.pts[hit][1], 7, "#ff7a6b"); }
      }
      slLinks(ctx, g, false); slStars(ctx, g, false);
      ctx.fillStyle = "rgba(120,150,210,0.2)"; ctx.fillRect(14, H - 16, W - 28, 5);
      ctx.fillStyle = C.sun; ctx.fillRect(14, H - 16, (W - 28) * clamp(g.time / g.max, 0, 1), 5);
      ctx.fillStyle = C.muted; ctx.font = `500 15px ${ui}`; ctx.textAlign = "center"; ctx.fillText(tr(g.con.name, lang), W / 2, 30);
    },
  },
  scale: {
    meta: { title: { en: "Warp Run", ja: "ワープラン" }, goal: { en: "Fly outward and survive — your score climbs the longer you last.", ja: "宇宙の彼方へ。長く生き延びるほどスコアが伸びる。" }, avoid: { en: "Everything is an obstacle. One collision costs a life, and it keeps speeding up.", ja: "すべてが障害物。1回ぶつかるとライフを失い、速度はどんどん上がる。" }, pad: "lr" },
    init: (g, api) => { g.x = api.W / 2; g.obs = []; g.spawn = 0.5; g.bg = Array.from({ length: 80 }, () => ({ x: Math.random() * api.W, y: Math.random() * api.H, len: 4 + Math.random() * 10, sp: 200 + Math.random() * 300 })); },
    step: (g, ctx, dt, api, over) => {
      const { W, H, keys, diff } = api, spd = 360, ramp = 1 + g.t * 0.05;
      if (keys.left) g.x -= spd * dt;
      if (keys.right) g.x += spd * dt;
      if (g.pdown && g.px != null) g.x += clamp(g.px - g.x, -spd * dt, spd * dt);
      g.x = clamp(g.x, 18, W - 18);
      g.spawn -= dt; const iv = Math.max(0.26, 0.7 / diff - g.t * 0.01);
      if (g.spawn <= 0) { const s = 12 + Math.random() * 20; g.obs.push({ x: s + Math.random() * (W - 2 * s), y: -s, r: s, vy: (150 + Math.random() * 80) * diff * ramp, spin: Math.random() * 6, vspin: (Math.random() - 0.5) * 3, verts: makeRockVerts() }); g.spawn = iv; }
      for (const o of g.obs) { o.y += o.vy * dt; o.spin += o.vspin * dt; }
      for (const o of g.obs) { if (o.dead) continue; if (Math.hypot(o.x - g.x, o.y - (H - 30)) < o.r + 11) { o.dead = true; spawnParts(g, o.x, o.y, o.r, "#ff7a6b"); lose(g, over); } else if (o.y - o.r > H) o.dead = true; }
      g.obs = g.obs.filter((o) => !o.dead);
      g.score = Math.floor(g.t * 12);
      ctx.fillStyle = "#050810"; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(150,180,235,0.5)"; ctx.lineWidth = 1.5;
      for (const s of g.bg) { s.y += s.sp * ramp * dt; if (s.y > H) { s.y = -s.len; s.x = Math.random() * W; } ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x, s.y + s.len * ramp); ctx.stroke(); }
      for (const o of g.obs) drawRock(ctx, o);
      drawShip(ctx, g.x, H - 30);
    },
  },
};

function HowRow({ label, text, color }) {
  return (
    <div style={styles.howRow}>
      <span style={{ ...styles.howLabel, color }}>{label}</span>
      <span style={styles.howText}>{text}</span>
    </div>
  );
}

/* ---------- the arcade shell ----------
   Props: { reward: { lives, seconds }, def, onExit }
   Starting lives come straight from reward.lives; a fixed mild
   difficulty is used since it is no longer tied to quiz performance.
------------------------------------------------------------------ */
export function ArcadeShell({ reward, def, onExit, onFinish }) {
  const lang = useLang();
  const t = STR[lang];
  const startLives = Math.max(1, reward?.lives ?? 1);
  const totalSeconds = Math.max(1, reward?.seconds ?? 60);
  const diff = 1.2;

  const W = 760, H = 460;
  const wrapRef = useRef(null);
  const [wpx, setWpx] = useState(760);
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState("intro");
  const [finalScore, setFinalScore] = useState(0);
  const [overReason, setOverReason] = useState("dead");
  const [clockLeft, setClockLeft] = useState(totalSeconds);
  const [runId, setRunId] = useState(0);
  const gref = useRef(null);
  const keys = useRef({ left: false, right: false, fire: false });
  const playingRef = useRef(false);
  const pad = def.meta.pad;

  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setWpx(Math.max(280, e.contentRect.width));
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);
  const CW = Math.min(wpx, W);

  useEffect(() => { playingRef.current = phase === "play"; }, [phase]);

  useEffect(() => {
    const isL = (k) => k === "ArrowLeft" || k === "a" || k === "A";
    const isR = (k) => k === "ArrowRight" || k === "d" || k === "D";
    const isF = (e) => e.key === " " || e.code === "Space";
    const kd = (e) => { if (!playingRef.current) return; if (isL(e.key)) { keys.current.left = true; e.preventDefault(); } if (isR(e.key)) { keys.current.right = true; e.preventDefault(); } if (isF(e)) { keys.current.fire = true; e.preventDefault(); } };
    const ku = (e) => { if (isL(e.key)) keys.current.left = false; if (isR(e.key)) keys.current.right = false; if (isF(e)) keys.current.fire = false; };
    window.addEventListener("keydown", kd); window.addEventListener("keyup", ku);
    return () => { window.removeEventListener("keydown", kd); window.removeEventListener("keyup", ku); };
  }, []);

  useEffect(() => {
    if (phase !== "play") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = setupCanvas(canvas, CW, H);
    const api = { W: CW, H, startLives, diff, keys: keys.current, lang };
    const g = { score: 0, lives: startLives, flash: 0, over: false, parts: [], t: 0, px: null, py: null, pdown: false, tapped: null, clock: totalSeconds };
    gref.current = g;
    def.init(g, api);
    const over = (reason) => {
      if (g.over) return;
      g.over = true; setFinalScore(g.score); setOverReason(reason || "dead"); setPhase("over");
      onFinish?.(); // reward is one-shot: mark it consumed so it can't be replayed
    };
    let raf, last = performance.now();
    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now; g.t += dt;
      g.clock -= dt;
      if (g.clock <= 0) { g.clock = 0; setClockLeft(0); over("time"); }
      def.step(g, ctx, dt, api, over);
      for (const p of g.parts) { p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt; }
      g.parts = g.parts.filter((p) => p.life > 0);
      for (const p of g.parts) { ctx.globalAlpha = clamp(p.life * 2, 0, 1); ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2); ctx.fill(); }
      ctx.globalAlpha = 1;
      // HUD: score (left), timer (center), lives (right)
      ctx.fillStyle = C.text; ctx.font = `700 16px ${mono}`; ctx.textAlign = "left"; ctx.fillText(`${t.score} ${g.score}`, 14, 24);
      ctx.fillStyle = g.clock <= 10 ? C.danger : C.cool; ctx.font = `700 16px ${mono}`; ctx.textAlign = "center"; ctx.fillText(fmtClock(g.clock), CW / 2, 24);
      ctx.textAlign = "left";
      for (let i = 0; i < g.lives; i++) { const hx = CW - 16 - i * 20, hy = 18; ctx.fillStyle = C.cool; ctx.beginPath(); ctx.moveTo(hx, hy - 7); ctx.lineTo(hx - 6, hy + 6); ctx.lineTo(hx + 6, hy + 6); ctx.closePath(); ctx.fill(); }
      if (g.flash > 0) { g.flash -= dt; ctx.fillStyle = `rgba(255,80,70,${g.flash * 0.5})`; ctx.fillRect(0, 0, CW, H); }
      if (!g.over) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [phase, runId, CW]);

  const startRun = () => { setClockLeft(totalSeconds); setPhase("play"); };
  const pdown = (ev) => { const g = gref.current; if (!g) return; const r = canvasRef.current.getBoundingClientRect(); g.px = ev.clientX - r.left; g.py = ev.clientY - r.top; g.pdown = true; g.tapped = { x: g.px, y: g.py }; canvasRef.current.setPointerCapture?.(ev.pointerId); };
  const pmove = (ev) => { const g = gref.current; if (!g || !g.pdown) return; const r = canvasRef.current.getBoundingClientRect(); g.px = ev.clientX - r.left; g.py = ev.clientY - r.top; };
  const pup = () => { const g = gref.current; if (g) g.pdown = false; };
  const hold = (k, v) => () => { keys.current[k] = v; };
  const controls = pad === "lrf" ? t.controlsShoot : pad === "none" ? t.controlsTap : t.controlsMove;

  return (
    <div ref={wrapRef}>
      {phase === "intro" && (
        <div style={styles.resultWrap}>
          <div style={styles.arcadeBadge}>{tr(def.meta.title, lang)}</div>
          <p style={styles.ratingMsg}>{t.bonusLede}</p>
          <div style={styles.howtoCard}>
            <div style={styles.howtoTitle}>{t.howToPlay}</div>
            <HowRow label={t.labelGoal} text={tr(def.meta.goal, lang)} color={C.cool} />
            <HowRow label={t.labelControls} text={controls} color={C.sun} />
            <HowRow label={t.labelAvoid} text={tr(def.meta.avoid, lang)} color={C.danger} />
            <HowRow label={t.labelLives} text={t.livesRule} color={C.good} />
          </div>
          <div style={styles.penaltyBox}>{t.intro(startLives, totalSeconds)}</div>
          <div style={styles.resultBtns}>
            <button style={styles.nextBtn} onClick={startRun}>{t.startGame}</button>
            <button style={styles.chip} onClick={onExit}>{t.backToResults}</button>
          </div>
        </div>
      )}
      {phase === "play" && (
        <div>
          <canvas ref={canvasRef} onPointerDown={pdown} onPointerMove={pmove} onPointerUp={pup} onPointerLeave={pup}
            style={{ display: "block", margin: "0 auto", borderRadius: 12, touchAction: "none", cursor: pad === "none" ? "pointer" : "crosshair", maxWidth: "100%" }} />
          {pad !== "none" && (
            <div style={styles.padRow}>
              <button style={styles.padBtn} onPointerDown={hold("left", true)} onPointerUp={hold("left", false)} onPointerLeave={hold("left", false)}>◀</button>
              {pad === "lrf" && <button style={styles.padBtn} onPointerDown={hold("fire", true)} onPointerUp={hold("fire", false)} onPointerLeave={hold("fire", false)}>{t.fire}</button>}
              <button style={styles.padBtn} onPointerDown={hold("right", true)} onPointerUp={hold("right", false)} onPointerLeave={hold("right", false)}>▶</button>
            </div>
          )}
          <p style={styles.arcadeControls}>{controls}</p>
        </div>
      )}
      {phase === "over" && (
        <div style={styles.resultWrap}>
          <div style={styles.arcadeBadge}>{overReason === "time" ? t.timeUp : t.gameOver}</div>
          <div style={styles.resultRing}>
            <span style={styles.resultScore}>{finalScore}</span>
            <span style={styles.resultPct}>{t.score}</span>
          </div>
          <div style={styles.resultBtns}>
            <button style={styles.nextBtn} onClick={onExit}>{t.backToResults}</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* Picks a RANDOM game from the four and runs it with the reward. */
export function BonusGame({ reward, onExit, onFinish }) {
  const id = useMemo(() => ["solar", "star", "sky", "scale"][Math.floor(Math.random() * 4)], []);
  return <ArcadeShell reward={reward} onExit={onExit} onFinish={onFinish} def={GAMES_DEF[id]} />;
}

export default BonusGame;
