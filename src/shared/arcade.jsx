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
/* power-up jewel: kind 1 = twin shot (green), kind 2 = triple spread (violet) */
function drawJewel(ctx, x, y, kind, t) {
  const col = kind === 2 ? "#c98bff" : "#3fe89b";
  const pulse = 1 + Math.sin(t * 6) * 0.12;
  const s = (kind === 2 ? 11 : 9) * pulse;
  const glow = ctx.createRadialGradient(x, y, 1, x, y, s * 2.4);
  glow.addColorStop(0, col); glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(x, y, s * 2.4, 0, Math.PI * 2); ctx.fill();
  ctx.save(); ctx.translate(x, y); ctx.rotate(Math.PI / 4);
  ctx.fillStyle = col; ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 1.5;
  ctx.fillRect(-s * 0.62, -s * 0.62, s * 1.24, s * 1.24); ctx.strokeRect(-s * 0.62, -s * 0.62, s * 1.24, s * 1.24);
  ctx.restore();
  if (kind === 2) { ctx.fillStyle = "#fff"; for (const dx of [-4, 0, 4]) { ctx.beginPath(); ctx.arc(x + dx, y, 1.3, 0, Math.PI * 2); ctx.fill(); } }
}


/* --- Merge Galaxy helpers --- */
const MERGE_TIERS = [
  { r: 13, color: "#8b96b8", name: { en: "Asteroid", ja: "小惑星" } },
  { r: 17, color: "#63d3f0", name: { en: "Comet", ja: "彗星" } },
  { r: 22, color: "#dfe9ff", name: { en: "Moon", ja: "月" } },
  { r: 28, color: "#5b8dee", name: { en: "Planet", ja: "惑星" } },
  { r: 35, color: "#f5a742", name: { en: "Gas Giant", ja: "ガス惑星" } },
  { r: 43, color: "#ffcf6b", name: { en: "Star", ja: "恒星" } },
  { r: 52, color: "#b58cf0", name: { en: "Galaxy", ja: "銀河" } },
];
const MERGE_POINTS = [3, 6, 10, 16, 24, 34, 50];
function drawOrb(ctx, x, y, r, color) {
  const glow = ctx.createRadialGradient(x, y, r * 0.5, x, y, r * 1.6);
  glow.addColorStop(0, color); glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.save(); ctx.globalAlpha = 0.3; ctx.fillStyle = glow;
  ctx.beginPath(); ctx.arc(x, y, r * 1.6, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  const gr = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.15, x, y, r);
  gr.addColorStop(0, "#ffffff"); gr.addColorStop(0.4, color); gr.addColorStop(1, color);
  ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.25)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke();
}

/* ---------- the games ---------- */
export const GAMES_DEF = {
  solar: {
    meta: { title: { en: "Asteroid Defense", ja: "小惑星ディフェンス" }, goal: { en: "Shoot the falling asteroids to score — bigger rocks are worth more. Survive to catch weapon jewels: at 1:00 a twin-shot jewel drops, at 2:00 a triple-spread jewel.", ja: "落ちてくる小惑星を撃って得点——大きい岩ほど高得点。生き延びて武器ジュエルを取ろう：1分でツインショット、2分で三方向ショットのジュエルが落ちてくる。" }, avoid: { en: "A rock that strikes your ship costs a life — dodge it or shoot it down. Rocks that slip past the bottom are harmless.", ja: "自機に岩が当たるとライフを1つ失う——よけるか撃ち落とそう。下まで抜けた岩は無害です。" }, pad: "lrf" },
    init: (g, api) => { g.shipX = api.W / 2; g.bullets = []; g.rocks = []; g.jewels = []; g.cd = 0; g.spawn = 0.5; g.weapon = 0; g.jw1 = false; g.jw2 = false; g.wflash = 0; g.bg = makeStars(api.W, api.H, 60); },
    step: (g, ctx, dt, api, over) => {
      const { W, H, keys, diff } = api, spd = 330;
      if (keys.left) g.shipX -= spd * dt;
      if (keys.right) g.shipX += spd * dt;
      if (g.pdown && g.px != null) g.shipX += clamp(g.px - g.shipX, -spd * dt, spd * dt);
      g.shipX = clamp(g.shipX, 18, W - 18);
      g.cd -= dt; if (g.wflash > 0) g.wflash -= dt;
      // fire — pattern depends on the weapon jewels collected
      if ((keys.fire || g.pdown) && g.cd <= 0) {
        const bx = g.shipX, by = H - 42, V = 540;
        if (g.weapon >= 2) {
          for (const deg of [-15, 0, 15]) { const a = (deg * Math.PI) / 180; g.bullets.push({ x: bx, y: by, vx: Math.sin(a) * V, vy: -Math.cos(a) * V }); }
        } else if (g.weapon === 1) {
          g.bullets.push({ x: bx - 7, y: by, vx: 0, vy: -V }); g.bullets.push({ x: bx + 7, y: by, vx: 0, vy: -V });
        } else {
          g.bullets.push({ x: bx, y: by, vx: 0, vy: -V });
        }
        g.cd = 0.2;
      }
      for (const b of g.bullets) { b.x += b.vx * dt; b.y += b.vy * dt; }
      g.bullets = g.bullets.filter((b) => b.y > -12 && b.x > -14 && b.x < W + 14 && !b.dead);
      g.spawn -= dt; const iv = Math.max(0.32, 0.95 / diff - g.t * 0.008);
      if (g.spawn <= 0) { const s = 13 + Math.random() * 22; g.rocks.push({ x: s + Math.random() * (W - s * 2), y: -s, r: s, vy: (34 + Math.random() * 26) * diff * (1 + g.t * 0.02), vx: (Math.random() - 0.5) * 26, spin: Math.random() * 6, vspin: (Math.random() - 0.5) * 2, verts: makeRockVerts() }); g.spawn = iv; }
      for (const r of g.rocks) { r.y += r.vy * dt; r.x += r.vx * dt; r.spin += r.vspin * dt; if (r.x < r.r || r.x > W - r.r) r.vx *= -1; }
      // weapon jewels: twin-shot at 1:00, triple-spread at 2:00 (each drops once)
      if (!g.jw1 && g.t >= 60) { g.jw1 = true; g.jewels.push({ x: 30 + Math.random() * (W - 60), y: -16, vy: 66, kind: 1 }); }
      if (!g.jw2 && g.t >= 120) { g.jw2 = true; g.jewels.push({ x: 30 + Math.random() * (W - 60), y: -16, vy: 66, kind: 2 }); }
      for (const j of g.jewels) {
        if (j.dead) continue;
        j.y += j.vy * dt;
        if (Math.hypot(j.x - g.shipX, j.y - (H - 30)) < 24) { j.dead = true; g.weapon = Math.max(g.weapon, j.kind); g.wflash = 0.6; g.score += 20; spawnParts(g, j.x, j.y, 16, j.kind === 2 ? "#c98bff" : "#3fe89b"); }
        else if (j.y > H + 20) j.dead = true;
      }
      g.jewels = g.jewels.filter((j) => !j.dead);
      for (const r of g.rocks) { if (r.dead) continue; for (const b of g.bullets) { if (b.dead) continue; if (Math.hypot(b.x - r.x, b.y - r.y) < r.r + 3) { b.dead = true; r.dead = true; g.score += Math.round(r.r); spawnParts(g, r.x, r.y, r.r, "#ffcf6b"); break; } } }
      for (const r of g.rocks) { if (r.dead) continue; if (r.y - r.r > H) { r.dead = true; } else if (Math.hypot(r.x - g.shipX, r.y - (H - 30)) < r.r + 12) { r.dead = true; spawnParts(g, r.x, r.y, r.r, "#ff7a6b"); lose(g, over); } }
      g.rocks = g.rocks.filter((r) => !r.dead); g.bullets = g.bullets.filter((b) => !b.dead);
      drawBg(ctx, g, W, H);
      for (const r of g.rocks) drawRock(ctx, r);
      for (const j of g.jewels) drawJewel(ctx, j.x, j.y, j.kind, g.t);
      ctx.strokeStyle = C.cool; ctx.lineWidth = 2.5;
      for (const b of g.bullets) { const m = Math.hypot(b.vx, b.vy) || 1; ctx.beginPath(); ctx.moveTo(b.x, b.y); ctx.lineTo(b.x - (b.vx / m) * 10, b.y - (b.vy / m) * 10); ctx.stroke(); }
      drawShip(ctx, g.shipX, H - 30);
      if (g.wflash > 0) { ctx.save(); ctx.globalAlpha = Math.max(0, g.wflash / 0.6) * 0.5; ctx.fillStyle = g.weapon === 2 ? "#c98bff" : "#3fe89b"; ctx.beginPath(); ctx.arc(g.shipX, H - 30, 30, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
    },
  },
  star: {
    meta: { title: { en: "Star Catcher", ja: "スターキャッチャー" }, goal: { en: "Catch the glowing hydrogen orbs — each one scores points. Survive to catch power gems: 1:00 widens your basket, 2:00 pulls orbs in.", ja: "光る水素の玉をキャッチ——1個ごとに得点。生き延びてパワージェムを取ろう：1分でバスケットが広がり、2分で玉を引き寄せる。" }, avoid: { en: "Catching a dark rock costs a life, so steer around them.", ja: "暗い岩をキャッチするとライフを失うので、よけて進もう。" }, pad: "lr" },
    init: (g, api) => { g.x = api.W / 2; g.items = []; g.spawn = 0.4; g.power = 0; g.jw1 = false; g.jw2 = false; g.jewels = []; g.wflash = 0; g.bg = makeStars(api.W, api.H, 60); },
    step: (g, ctx, dt, api, over) => {
      const { W, H, keys, diff } = api, spd = 340, cy = H - 26;
      if (keys.left) g.x -= spd * dt;
      if (keys.right) g.x += spd * dt;
      if (g.pdown && g.px != null) g.x += clamp(g.px - g.x, -spd * dt, spd * dt);
      g.x = clamp(g.x, 26, W - 26);
      const catchHalf = g.power >= 1 ? 45 : 30;
      if (g.wflash > 0) g.wflash -= dt;
      // power gems: wider basket at 1:00, magnet at 2:00 (each drops once)
      if (!g.jw1 && g.t >= 60) { g.jw1 = true; g.jewels.push({ x: 30 + Math.random() * (W - 60), y: -14, vy: 96, kind: 1 }); }
      if (!g.jw2 && g.t >= 120) { g.jw2 = true; g.jewels.push({ x: 30 + Math.random() * (W - 60), y: -14, vy: 96, kind: 2 }); }
      for (const j of g.jewels) {
        if (j.dead) continue;
        j.y += j.vy * dt;
        if (j.y > cy - 12 && j.y < cy + 16 && Math.abs(j.x - g.x) < catchHalf) { j.dead = true; g.power = Math.max(g.power, j.kind); g.wflash = 0.6; g.score += 10; spawnParts(g, j.x, j.y, 14, j.kind === 2 ? "#c98bff" : "#3fe89b"); }
        else if (j.y > H + 20) j.dead = true;
      }
      g.jewels = g.jewels.filter((j) => !j.dead);
      g.spawn -= dt; const iv = Math.max(0.28, 0.7 / diff - g.t * 0.006);
      if (g.spawn <= 0) { const bad = Math.random() < 0.32; g.items.push({ x: 22 + Math.random() * (W - 44), y: -14, r: bad ? 12 + Math.random() * 8 : 8, vy: (90 + Math.random() * 60) * diff * (1 + g.t * 0.015), bad, verts: bad ? makeRockVerts() : null }); g.spawn = iv; }
      for (const it of g.items) { it.y += it.vy * dt; if (g.power >= 2 && !it.bad) { const d = g.x - it.x; if (Math.abs(d) < 120) it.x += Math.sign(d) * Math.min(Math.abs(d), 90 * dt); } }
      for (const it of g.items) {
        if (it.hit) continue;
        if (it.y > cy - 12 && it.y < cy + 16 && Math.abs(it.x - g.x) < catchHalf) { it.hit = true; if (it.bad) { spawnParts(g, it.x, it.y, it.r, "#ff7a6b"); lose(g, over); } else { g.score += 5; spawnParts(g, it.x, it.y, it.r, "#ffcf6b"); } }
        else if (it.y > H + 20) it.hit = true;
      }
      g.items = g.items.filter((it) => !it.hit);
      drawBg(ctx, g, W, H);
      for (const it of g.items) {
        if (it.bad) drawRock(ctx, { x: it.x, y: it.y, r: it.r, spin: g.t * 2, verts: it.verts });
        else { const gr = ctx.createRadialGradient(it.x, it.y, 0, it.x, it.y, it.r * 2); gr.addColorStop(0, "#ffe08a"); gr.addColorStop(1, "rgba(255,207,107,0)"); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(it.x, it.y, it.r * 2, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = "#fff4d6"; ctx.beginPath(); ctx.arc(it.x, it.y, it.r, 0, Math.PI * 2); ctx.fill(); }
      }
      for (const j of g.jewels) drawJewel(ctx, j.x, j.y, j.kind, g.t);
      const glow = ctx.createRadialGradient(g.x, cy, 2, g.x, cy, 26); glow.addColorStop(0, "rgba(99,211,240,0.4)"); glow.addColorStop(1, "rgba(99,211,240,0)");
      ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(g.x, cy, 26, 0, Math.PI * 2); ctx.fill();
      const br = g.power >= 1 ? 33 : 22;
      ctx.strokeStyle = C.cool; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(g.x, cy + 4, br, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke();
      if (g.wflash > 0) { ctx.save(); ctx.globalAlpha = Math.max(0, g.wflash / 0.6) * 0.5; ctx.fillStyle = g.power === 2 ? "#c98bff" : "#3fe89b"; ctx.beginPath(); ctx.arc(g.x, cy, 30, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
    },
  },
  scale: {
    meta: { title: { en: "Warp Run", ja: "ワープラン" }, goal: { en: "Fly outward and survive — your score climbs the longer you last. Catch power gems: 1:00 grants a shield, 2:00 auto-recharges it.", ja: "宇宙の彼方へ。長く生き延びるほどスコアが伸びる。パワージェムで生き延びよう：1分でシールド、2分で自動リチャージ。" }, avoid: { en: "Everything is an obstacle. One collision costs a life, and it keeps speeding up.", ja: "すべてが障害物。1回ぶつかるとライフを失い、速度はどんどん上がる。" }, pad: "lr" },
    init: (g, api) => { g.x = api.W / 2; g.obs = []; g.spawn = 0.5; g.shield = 0; g.recharge = false; g.rt = 0; g.jw1 = false; g.jw2 = false; g.jewels = []; g.wflash = 0; g.bg = Array.from({ length: 80 }, () => ({ x: Math.random() * api.W, y: Math.random() * api.H, len: 4 + Math.random() * 10, sp: 200 + Math.random() * 300 })); },
    step: (g, ctx, dt, api, over) => {
      const { W, H, keys, diff } = api, spd = 360, ramp = 1 + g.t * 0.05;
      if (keys.left) g.x -= spd * dt;
      if (keys.right) g.x += spd * dt;
      if (g.pdown && g.px != null) g.x += clamp(g.px - g.x, -spd * dt, spd * dt);
      g.x = clamp(g.x, 18, W - 18);
      if (g.wflash > 0) g.wflash -= dt;
      if (g.recharge && g.shield < 1) { g.rt += dt; if (g.rt >= 12) { g.shield = 1; g.rt = 0; g.wflash = 0.6; } }
      // power gems: shield at 1:00, auto-recharge at 2:00 (each drops once)
      if (!g.jw1 && g.t >= 60) { g.jw1 = true; g.jewels.push({ x: 30 + Math.random() * (W - 60), y: -16, vy: 150, kind: 1 }); }
      if (!g.jw2 && g.t >= 120) { g.jw2 = true; g.jewels.push({ x: 30 + Math.random() * (W - 60), y: -16, vy: 150, kind: 2 }); }
      for (const j of g.jewels) {
        if (j.dead) continue;
        j.y += j.vy * dt;
        if (Math.hypot(j.x - g.x, j.y - (H - 30)) < 11 + 12) { j.dead = true; if (j.kind === 1) g.shield = Math.max(g.shield, 1); else g.recharge = true; g.wflash = 0.6; g.score += 10; spawnParts(g, j.x, j.y, 14, j.kind === 2 ? "#c98bff" : "#3fe89b"); }
        else if (j.y > H + 20) j.dead = true;
      }
      g.jewels = g.jewels.filter((j) => !j.dead);
      g.spawn -= dt; const iv = Math.max(0.26, 0.7 / diff - g.t * 0.01);
      if (g.spawn <= 0) { const s = 12 + Math.random() * 20; g.obs.push({ x: s + Math.random() * (W - 2 * s), y: -s, r: s, vy: (150 + Math.random() * 80) * diff * ramp, spin: Math.random() * 6, vspin: (Math.random() - 0.5) * 3, verts: makeRockVerts() }); g.spawn = iv; }
      for (const o of g.obs) { o.y += o.vy * dt; o.spin += o.vspin * dt; }
      for (const o of g.obs) { if (o.dead) continue; if (Math.hypot(o.x - g.x, o.y - (H - 30)) < o.r + 11) { o.dead = true; if (g.shield > 0) { g.shield--; g.wflash = 0.6; spawnParts(g, o.x, o.y, o.r, "#3fddff"); } else { spawnParts(g, o.x, o.y, o.r, "#ff7a6b"); lose(g, over); } } else if (o.y - o.r > H) o.dead = true; }
      g.obs = g.obs.filter((o) => !o.dead);
      g.score = Math.floor(g.t * 12);
      ctx.fillStyle = "#050810"; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(150,180,235,0.5)"; ctx.lineWidth = 1.5;
      for (const s of g.bg) { s.y += s.sp * ramp * dt; if (s.y > H) { s.y = -s.len; s.x = Math.random() * W; } ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x, s.y + s.len * ramp); ctx.stroke(); }
      for (const o of g.obs) drawRock(ctx, o);
      for (const j of g.jewels) drawJewel(ctx, j.x, j.y, j.kind, g.t);
      drawShip(ctx, g.x, H - 30);
      if (g.shield > 0) { ctx.strokeStyle = "rgba(63,221,255,0.8)"; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(g.x, H - 30, 22, 0, Math.PI * 2); ctx.stroke(); }
      if (g.wflash > 0) { ctx.save(); ctx.globalAlpha = Math.max(0, g.wflash / 0.6) * 0.5; ctx.fillStyle = "#3fddff"; ctx.beginPath(); ctx.arc(g.x, H - 30, 28, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
    },
  },
  merge: {
    meta: {
      title: { en: "Merge Galaxy", ja: "マージ・ギャラクシー" },
      goal: {
        en: "Drop worlds into the well — two of the same merge into the next: asteroid → comet → moon → planet → gas giant → star → galaxy. Bigger merges score more. Survive for boosts: 1:00 raises the danger line, 2:00 extends overflow grace.",
        ja: "天体を井戸に落とそう——同じもの2つが次の天体に合体：小惑星→彗星→月→惑星→ガス惑星→恒星→銀河。大きい合体ほど高得点。生き延びて強化：1分で危険ラインが上がり、2分であふれ猶予が延びる。",
      },
      avoid: {
        en: "Don't let the pile stack up over the top line — each overflow costs a life.",
        ja: "積み上がった天体を上限ラインより高くしないこと——あふれるたびにライフを1つ失う。",
      },
      pad: "lrf",
    },
    init: (g, api) => {
      g.bg = makeStars(api.W, api.H, 60);
      g.wellW = Math.min(api.W - 60, 360);
      g.wellX0 = (api.W - g.wellW) / 2;
      g.wellX1 = g.wellX0 + g.wellW;
      g.floorY = api.H - 12;
      g.dangerY = 70;
      g.hoverY = 44;
      g.bodies = [];
      g.curTier = Math.floor(Math.random() * 3);
      g.nextTier = Math.floor(Math.random() * 3);
      g.curX = api.W / 2;
      g.cd = 0;
      g.overflowT = 0;
      g.overflowLimit = 2;
      g.jw1 = false; g.jw2 = false; g.wflash = 0; g.buffLabel = ""; g.buffT = 0;
    },
    step: (g, ctx, dt, api, over) => {
      const { W, H, keys } = api, spd = 330, T = MERGE_TIERS, P = MERGE_POINTS;
      const curR = T[g.curTier].r;
      if (g.wflash > 0) g.wflash -= dt;
      if (g.buffT > 0) g.buffT -= dt;
      // auto-granted boosts: raise danger line at 1:00, longer overflow grace at 2:00
      if (!g.jw1 && g.t >= 60) { g.jw1 = true; g.dangerY = 52; g.wflash = 0.6; g.buffLabel = "HEADROOM +"; g.buffT = 2.2; }
      if (!g.jw2 && g.t >= 120) { g.jw2 = true; g.overflowLimit = 3.5; g.wflash = 0.6; g.buffLabel = "GRACE +"; g.buffT = 2.2; }
      if (keys.left) g.curX -= spd * dt;
      if (keys.right) g.curX += spd * dt;
      if (g.pdown && g.px != null) g.curX += clamp(g.px - g.curX, -spd * dt, spd * dt);
      g.curX = clamp(g.curX, g.wellX0 + curR, g.wellX1 - curR);
      // drop on FIRE or tap, on cooldown
      g.cd -= dt;
      const wantDrop = keys.fire || g.tapped;
      if (wantDrop && g.cd <= 0 && g.bodies.length < 40) {
        g.bodies.push({ x: g.curX, y: g.hoverY + curR, vx: 0, vy: 0, tier: g.curTier, r: curR });
        g.curTier = g.nextTier;
        g.nextTier = Math.floor(Math.random() * 3);
        g.cd = 0.4;
      }
      g.tapped = null;
      // integrate
      const GRAV = 1700;
      for (const b of g.bodies) {
        b.vy = clamp(b.vy + GRAV * dt, -700, 900);
        b.vx = clamp(b.vx, -500, 500);
        b.x += b.vx * dt; b.y += b.vy * dt; b.vx *= 0.99;
      }
      // relaxation: walls, floor, body-body separation
      for (let iter = 0; iter < 4; iter++) {
        for (const b of g.bodies) {
          if (b.x - b.r < g.wellX0) { b.x = g.wellX0 + b.r; b.vx = Math.abs(b.vx) * 0.3; }
          if (b.x + b.r > g.wellX1) { b.x = g.wellX1 - b.r; b.vx = -Math.abs(b.vx) * 0.3; }
          if (b.y + b.r > g.floorY) { b.y = g.floorY - b.r; if (b.vy > 0) b.vy *= -0.2; }
        }
        for (let i = 0; i < g.bodies.length; i++) {
          for (let j = i + 1; j < g.bodies.length; j++) {
            const a = g.bodies[i], b = g.bodies[j];
            const dx = b.x - a.x, dy = b.y - a.y; let d = Math.hypot(dx, dy);
            const min = a.r + b.r;
            if (d < min) {
              if (d < 0.001) d = 0.001;
              const nx = dx / d, ny = dy / d, push = (min - d) * 0.5;
              a.x -= nx * push; a.y -= ny * push; b.x += nx * push; b.y += ny * push;
              const rel = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
              if (rel < 0) {
                const imp = rel * 0.85 * 0.5;
                a.vx += nx * imp; a.vy += ny * imp; b.vx -= nx * imp; b.vy -= ny * imp;
              }
            }
          }
        }
      }
      // merges (capped per frame to avoid runaway chains)
      let merges = 0;
      for (let i = 0; i < g.bodies.length && merges < 6; i++) {
        const a = g.bodies[i]; if (a.dead) continue;
        for (let j = i + 1; j < g.bodies.length; j++) {
          const b = g.bodies[j]; if (b.dead || a.dead) continue;
          if (a.tier !== b.tier) continue;
          // merge as soon as two same-type bodies touch (small tolerance so a
          // contact after relaxation, where d ≈ a.r+b.r, still counts)
          if (Math.hypot(b.x - a.x, b.y - a.y) < (a.r + b.r) + 1.5) {
            a.dead = true; b.dead = true;
            const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2, tier = a.tier;
            g.score += P[tier];
            spawnParts(g, mx, my, T[tier].r, T[tier].color);
            if (tier < T.length - 1) {
              g.bodies.push({ x: mx, y: my, vx: 0, vy: -140, tier: tier + 1, r: T[tier + 1].r });
            } else { g.score += P[tier] * 3; spawnParts(g, mx, my, T[tier].r, "#ffffff"); }
            merges++; break;
          }
        }
      }
      if (merges) g.bodies = g.bodies.filter((b) => !b.dead);
      // overflow: settled body above danger line for ~2s costs a life
      let topOver = false;
      for (const b of g.bodies) {
        if (Math.abs(b.vy) < 22 && Math.abs(b.vx) < 22 && b.y - b.r < g.dangerY) { topOver = true; break; }
      }
      g.overflowT = topOver ? g.overflowT + dt : 0;
      if (g.overflowT >= g.overflowLimit) {
        lose(g, over);
        g.bodies.sort((a, b) => (a.y - a.r) - (b.y - b.r));
        g.bodies.splice(0, Math.min(3, g.bodies.length));
        g.overflowT = 0;
      }
      // ---- draw ----
      drawBg(ctx, g, W, H);
      ctx.strokeStyle = "rgba(120,150,210,0.28)"; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(g.wellX0, g.dangerY - 30); ctx.lineTo(g.wellX0, g.floorY);
      ctx.lineTo(g.wellX1, g.floorY); ctx.lineTo(g.wellX1, g.dangerY - 30); ctx.stroke();
      ctx.strokeStyle = "rgba(255,122,107,0.35)"; ctx.lineWidth = 1.5; ctx.setLineDash([6, 6]);
      ctx.beginPath(); ctx.moveTo(g.wellX0, g.dangerY); ctx.lineTo(g.wellX1, g.dangerY); ctx.stroke();
      ctx.setLineDash([]);
      for (const b of g.bodies) drawOrb(ctx, b.x, b.y, b.r, T[b.tier].color);
      ctx.strokeStyle = "rgba(255,255,255,0.15)"; ctx.lineWidth = 1; ctx.setLineDash([4, 6]);
      ctx.beginPath(); ctx.moveTo(g.curX, g.hoverY + curR); ctx.lineTo(g.curX, g.floorY); ctx.stroke();
      ctx.setLineDash([]);
      drawOrb(ctx, g.curX, g.hoverY, curR, T[g.curTier].color);
      const px = g.wellX0 + 22, py = 100, pr = Math.min(12, T[g.nextTier].r * 0.5);
      ctx.fillStyle = C.faint; ctx.font = `700 10px ${mono}`; ctx.textAlign = "center";
      ctx.fillText("NEXT", px, py - 18);
      drawOrb(ctx, px, py, pr, T[g.nextTier].color);
      if (g.wflash > 0) { ctx.save(); ctx.globalAlpha = Math.max(0, g.wflash / 0.6) * 0.35; ctx.fillStyle = "#3fe89b"; ctx.fillRect(g.wellX0, 0, g.wellW, H); ctx.restore(); }
      if (g.buffT > 0) { ctx.save(); ctx.globalAlpha = Math.min(1, g.buffT); ctx.fillStyle = "#3fe89b"; ctx.font = `700 16px ${mono}`; ctx.textAlign = "center"; ctx.fillText(g.buffLabel, W / 2, H / 2); ctx.restore(); }
      ctx.textAlign = "left";
    },
  },

  lander: {
    meta: {
      title: { en: "Lunar Lander", ja: "月着陸船" },
      goal: { en: "Ease the lander down onto the flat pad — touch down slow and level to score a bonus. Fly into power gems: 1:00 boosts side thrusters, 2:00 softens gravity.", ja: "着陸船を平らなパッドにそっと降ろそう——ゆっくり水平に着地するとボーナス得点。パワージェムに触れよう：1分で横噴射が強化、2分で重力が弱まる。" },
      avoid: { en: "Coming in too fast or missing the pad crashes the lander and costs a life.", ja: "速すぎたりパッドを外すと墜落してライフを1つ失う。" },
      pad: "lrf",
    },
    init: (g, api) => {
      g.bg = makeStars(api.W, api.H, 60);
      g.groundY = api.H - 42;
      g.padW = 120;
      g.x = api.W / 2; g.y = 66; g.vx = 0; g.vy = 0;
      g.padX = 40 + Math.random() * (api.W - 80 - g.padW);
      g.power = 0; g.jw1 = false; g.jw2 = false; g.jewels = []; g.wflash = 0;
    },
    step: (g, ctx, dt, api, over) => {
      const { W, keys } = api, side = g.power >= 1 ? 104 : 72, GRAV = g.power >= 2 ? 22 : 30, main = 96, maxV = 190, lr = 13;
      const thrust = keys.fire || g.pdown;
      if (keys.left) g.vx -= side * dt;
      if (keys.right) g.vx += side * dt;
      g.vy += GRAV * dt;
      if (thrust) g.vy -= main * dt;
      g.vx = clamp(g.vx, -maxV, maxV); g.vy = clamp(g.vy, -maxV, maxV);
      g.x += g.vx * dt; g.y += g.vy * dt;
      if (g.x < 12) { g.x = 12; g.vx = 0; }
      if (g.x > W - 12) { g.x = W - 12; g.vx = 0; }
      if (g.y < 20) { g.y = 20; if (g.vy < 0) g.vy = 0; }
      if (g.wflash > 0) g.wflash -= dt;
      // power gems float in the sky: catch by flying into them
      if (!g.jw1 && g.t >= 60) { g.jw1 = true; g.jewels.push({ x: 40 + Math.random() * (W - 80), y: 60 + Math.random() * 50, kind: 1 }); }
      if (!g.jw2 && g.t >= 120) { g.jw2 = true; g.jewels.push({ x: 40 + Math.random() * (W - 80), y: 60 + Math.random() * 50, kind: 2 }); }
      for (const j of g.jewels) {
        if (j.dead) continue;
        if (Math.hypot(g.x - j.x, g.y - j.y) < lr + 11) { j.dead = true; g.power = Math.max(g.power, j.kind); g.wflash = 0.6; g.score += 15; spawnParts(g, j.x, j.y, 14, j.kind === 2 ? "#c98bff" : "#3fe89b"); }
      }
      g.jewels = g.jewels.filter((j) => !j.dead);
      if (g.y + lr >= g.groundY) {
        g.y = g.groundY - lr;
        const overPad = g.x > g.padX && g.x < g.padX + g.padW;
        const soft = Math.abs(g.vy) < 46 && Math.abs(g.vx) < 34;
        if (overPad && soft) {
          g.score += 50 + Math.round(Math.max(0, 40 - Math.abs(g.vy)));
          spawnParts(g, g.x, g.groundY, 14, "#3fe89b");
          g.padW = Math.max(64, g.padW - 8);
          g.padX = 40 + Math.random() * (W - 80 - g.padW);
        } else {
          spawnParts(g, g.x, g.groundY, 18, "#ff7a6b");
          lose(g, over);
          g.padW = 120;
          g.padX = 40 + Math.random() * (W - 80 - g.padW);
        }
        g.x = 40 + Math.random() * (W - 80); g.y = 66; g.vx = 0; g.vy = 0;
      }
      // ---- draw ----
      drawBg(ctx, g, W, api.H);
      ctx.strokeStyle = "rgba(120,150,210,0.5)"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, g.groundY); ctx.lineTo(W, g.groundY); ctx.stroke();
      const pg = ctx.createLinearGradient(g.padX, 0, g.padX + g.padW, 0);
      pg.addColorStop(0, "rgba(63,232,155,0)"); pg.addColorStop(0.5, "#3fe89b"); pg.addColorStop(1, "rgba(63,232,155,0)");
      ctx.strokeStyle = pg; ctx.lineWidth = 5;
      ctx.beginPath(); ctx.moveTo(g.padX, g.groundY); ctx.lineTo(g.padX + g.padW, g.groundY); ctx.stroke();
      ctx.fillStyle = "#3fe89b";
      ctx.beginPath(); ctx.arc(g.padX, g.groundY, 3, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(g.padX + g.padW, g.groundY, 3, 0, Math.PI * 2); ctx.fill();
      for (const j of g.jewels) drawJewel(ctx, j.x, j.y, j.kind, g.t);
      if (g.wflash > 0) { ctx.save(); ctx.globalAlpha = Math.max(0, g.wflash / 0.6) * 0.5; ctx.fillStyle = g.power === 2 ? "#c98bff" : "#3fe89b"; ctx.beginPath(); ctx.arc(g.x, g.y, 24, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
      if (thrust) {
        ctx.fillStyle = "#ffcf6b";
        ctx.beginPath(); ctx.moveTo(g.x - 5, g.y + lr - 2); ctx.lineTo(g.x + 5, g.y + lr - 2); ctx.lineTo(g.x, g.y + lr + 12 + Math.random() * 8); ctx.closePath(); ctx.fill();
      }
      const soft = Math.abs(g.vy) < 46 && Math.abs(g.vx) < 34;
      ctx.fillStyle = soft ? "#3fe89b" : "#eaf3ff";
      ctx.beginPath(); ctx.moveTo(g.x, g.y - lr); ctx.lineTo(g.x - lr, g.y + lr); ctx.lineTo(g.x + lr, g.y + lr); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = "#9aa2b4"; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(g.x - lr, g.y + lr); ctx.lineTo(g.x - lr - 4, g.y + lr + 5); ctx.moveTo(g.x + lr, g.y + lr); ctx.lineTo(g.x + lr + 4, g.y + lr + 5); ctx.stroke();
      ctx.fillStyle = soft ? C.good : C.danger; ctx.font = `700 12px ${mono}`; ctx.textAlign = "left";
      ctx.fillText(`vy ${g.vy > 0 ? "↓" : "↑"}${Math.abs(g.vy).toFixed(0)}  vx ${Math.abs(g.vx).toFixed(0)}`, 14, api.H - 14);
    },
  },

  ascent: {
    meta: {
      title: { en: "Rocket Ascent", ja: "ロケット上昇" },
      goal: { en: "Tap to thrust and keep climbing — slip through each asteroid belt's gap to score. Fly through power gems: 1:00 grants a shield, 2:00 auto-recharges it.", ja: "タップで噴射して上昇を続けよう——小惑星帯の隙間を抜けるたび得点。パワージェムを通ろう：1分でシールド、2分で自動リチャージ。" },
      avoid: { en: "Hitting a belt or the top or bottom edge costs a life.", ja: "小惑星帯や画面の上下端に当たるとライフを1つ失う。" },
      pad: "lrf",
    },
    init: (g, api) => {
      g.bg = makeStars(api.W, api.H, 60);
      g.rx = api.W * 0.3; g.y = api.H / 2; g.vy = 0;
      g.belts = []; g.spawn = 0.8; g.wasFire = false;
      g.shield = 0; g.recharge = false; g.rt = 0; g.jw1 = false; g.jw2 = false; g.jewels = []; g.wflash = 0;
    },
    step: (g, ctx, dt, api, over) => {
      const { W, H, keys } = api, r = 14;
      const speed = 130 * (1 + g.t * 0.02);
      const press = keys.fire || g.pdown;
      if ((press && !g.wasFire) || g.tapped) g.vy = -262;
      g.wasFire = press; g.tapped = null;
      g.vy += 780 * dt; g.vy = clamp(g.vy, -420, 540);
      g.y += g.vy * dt;
      g.spawn -= dt;
      if (g.spawn <= 0) {
        const gapH = 138, gapY = 70 + Math.random() * (H - 140 - gapH);
        g.belts.push({ x: W + 24, w: 36, gapY, gapH, passed: false });
        g.spawn = 220 / speed;
      }
      const reset = () => {
        if (g.shield > 0) { g.shield--; g.wflash = 0.6; spawnParts(g, g.rx, g.y, 12, "#3fddff"); g.y = H / 2; g.vy = 0; g.belts = g.belts.filter((b) => b.x > g.rx + 90 || b.x + b.w < g.rx - 90); return; }
        lose(g, over);
        g.y = H / 2; g.vy = 0;
        g.belts = g.belts.filter((b) => b.x > g.rx + 90 || b.x + b.w < g.rx - 90);
      };
      if (g.wflash > 0) g.wflash -= dt;
      if (g.recharge && g.shield < 1) { g.rt += dt; if (g.rt >= 10) { g.shield = 1; g.rt = 0; g.wflash = 0.6; } }
      for (const b of g.belts) b.x -= speed * dt;
      g.belts = g.belts.filter((b) => b.x + b.w > -10);
      // power gems float in and scroll left with the belts
      if (!g.jw1 && g.t >= 60) { g.jw1 = true; g.jewels.push({ x: W + 24, y: 60 + Math.random() * (H - 120), kind: 1 }); }
      if (!g.jw2 && g.t >= 120) { g.jw2 = true; g.jewels.push({ x: W + 24, y: 60 + Math.random() * (H - 120), kind: 2 }); }
      for (const j of g.jewels) {
        if (j.dead) continue;
        j.x -= speed * dt;
        if (Math.hypot(j.x - g.rx, j.y - g.y) < 11 + r) { j.dead = true; if (j.kind === 1) g.shield = Math.max(g.shield, 1); else g.recharge = true; g.wflash = 0.6; g.score += 10; spawnParts(g, j.x, j.y, 14, j.kind === 2 ? "#c98bff" : "#3fe89b"); }
        else if (j.x < -20) j.dead = true;
      }
      g.jewels = g.jewels.filter((j) => !j.dead);
      if (g.y - r < 0 || g.y + r > H) { reset(); }
      else for (const b of g.belts) {
        if (g.rx + r > b.x && g.rx - r < b.x + b.w) {
          if (g.y - r < b.gapY || g.y + r > b.gapY + b.gapH) { reset(); break; }
        }
        if (!b.passed && b.x + b.w < g.rx) { b.passed = true; g.score += 1; spawnParts(g, g.rx, g.y, 8, "#3fddff"); }
      }
      // ---- draw ----
      drawBg(ctx, g, W, H);
      for (const b of g.belts) {
        ctx.fillStyle = "#6b7180"; ctx.strokeStyle = "#9aa2b4"; ctx.lineWidth = 1.5;
        ctx.fillRect(b.x, 0, b.w, b.gapY); ctx.strokeRect(b.x, 0, b.w, b.gapY);
        ctx.fillRect(b.x, b.gapY + b.gapH, b.w, H - b.gapY - b.gapH); ctx.strokeRect(b.x, b.gapY + b.gapH, b.w, H - b.gapY - b.gapH);
        ctx.strokeStyle = "rgba(63,221,255,0.5)"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(b.x + b.w / 2, b.gapY); ctx.lineTo(b.x + b.w / 2, b.gapY + b.gapH); ctx.stroke();
      }
      for (const j of g.jewels) drawJewel(ctx, j.x, j.y, j.kind, g.t);
      const glow = ctx.createRadialGradient(g.rx, g.y, 2, g.rx, g.y, 24);
      glow.addColorStop(0, "rgba(255,207,107,0.5)"); glow.addColorStop(1, "rgba(255,207,107,0)");
      ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(g.rx, g.y, 24, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#eaf3ff"; ctx.beginPath(); ctx.moveTo(g.rx, g.y - r); ctx.lineTo(g.rx - 9, g.y + r); ctx.lineTo(g.rx + 9, g.y + r); ctx.closePath(); ctx.fill();
      if (press) { ctx.fillStyle = "#ffcf6b"; ctx.beginPath(); ctx.moveTo(g.rx - 4, g.y + r); ctx.lineTo(g.rx + 4, g.y + r); ctx.lineTo(g.rx, g.y + r + 12 + Math.random() * 6); ctx.closePath(); ctx.fill(); }
      if (g.shield > 0) { ctx.strokeStyle = "rgba(63,221,255,0.8)"; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(g.rx, g.y, 20, 0, Math.PI * 2); ctx.stroke(); }
      if (g.wflash > 0) { ctx.save(); ctx.globalAlpha = Math.max(0, g.wflash / 0.6) * 0.5; ctx.fillStyle = "#3fddff"; ctx.beginPath(); ctx.arc(g.rx, g.y, 26, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
    },
  },

  shield: {
    meta: {
      title: { en: "Solar Flare Shield", ja: "太陽フレア・シールド" },
      goal: { en: "Rotate your shield arc to intercept incoming solar flares before they reach the planet. Catch green power flares: 1:00 widens your arc, 2:00 adds a second arc opposite.", ja: "シールドの弧を回して、太陽フレアが惑星に届く前に受け止めよう。緑のパワーフレアを受け止めよう：1分で弧が広がり、2分で反対側に弧が追加。" },
      avoid: { en: "Every flare that slips past the shield and strikes the planet costs a life.", ja: "シールドをすり抜けて惑星に当たるフレアごとにライフを1つ失う。" },
      pad: "lr",
    },
    init: (g, api) => {
      g.bg = makeStars(api.W, api.H, 60);
      g.cx = api.W / 2; g.cy = api.H / 2;
      g.ang = -Math.PI / 2; g.arcHalf = 0.58; g.R = 96; g.planetR = 30;
      g.flares = []; g.spawn = 0.9;
      g.power = 0; g.jw1 = false; g.jw2 = false; g.wflash = 0;
    },
    step: (g, ctx, dt, api, over) => {
      const { keys } = api, rot = 3.1;
      if (keys.left) g.ang -= rot * dt;
      if (keys.right) g.ang += rot * dt;
      g.spawn -= dt; const iv = Math.max(0.4, 1.15 - g.t * 0.02);
      if (g.spawn <= 0) { g.flares.push({ a: Math.random() * Math.PI * 2, d: 270, hit: false }); g.spawn = iv; }
      if (g.wflash > 0) g.wflash -= dt;
      // green power flares at 1:00 and 2:00 (intercept to grant)
      if (!g.jw1 && g.t >= 60) { g.jw1 = true; g.flares.push({ a: Math.random() * Math.PI * 2, d: 270, hit: false, power: 1 }); }
      if (!g.jw2 && g.t >= 120) { g.jw2 = true; g.flares.push({ a: Math.random() * Math.PI * 2, d: 270, hit: false, power: 2 }); }
      const sp = 96 + g.t * 1.2;
      for (const f of g.flares) {
        if (f.hit) continue;
        const pd = f.d; f.d -= sp * dt;
        if (pd > g.R && f.d <= g.R) {
          let da = f.a - g.ang; da = Math.atan2(Math.sin(da), Math.cos(da));
          let da2 = f.a - (g.ang + Math.PI); da2 = Math.atan2(Math.sin(da2), Math.cos(da2));
          const blocked = Math.abs(da) < g.arcHalf || (g.power >= 2 && Math.abs(da2) < g.arcHalf);
          if (blocked) {
            f.hit = true; g.score += 1;
            if (f.power) { g.power = Math.max(g.power, f.power); g.arcHalf = g.power >= 1 ? 0.85 : 0.58; g.wflash = 0.6; g.score += 15; }
            spawnParts(g, g.cx + Math.cos(f.a) * g.R, g.cy + Math.sin(f.a) * g.R, 10, f.power ? (f.power === 2 ? "#c98bff" : "#3fe89b") : "#3fddff");
          }
        }
        if (!f.hit && f.d <= g.planetR) { f.hit = true; spawnParts(g, g.cx + Math.cos(f.a) * g.planetR, g.cy + Math.sin(f.a) * g.planetR, 12, "#ff7a6b"); lose(g, over); }
      }
      g.flares = g.flares.filter((f) => !f.hit);
      // ---- draw ----
      drawBg(ctx, g, api.W, api.H);
      const pg = ctx.createRadialGradient(g.cx, g.cy, 4, g.cx, g.cy, g.planetR * 1.8);
      pg.addColorStop(0, "rgba(91,141,238,0.6)"); pg.addColorStop(1, "rgba(91,141,238,0)");
      ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(g.cx, g.cy, g.planetR * 1.8, 0, Math.PI * 2); ctx.fill();
      const gr = ctx.createRadialGradient(g.cx - 8, g.cy - 8, 4, g.cx, g.cy, g.planetR);
      gr.addColorStop(0, "#8fb4ff"); gr.addColorStop(1, "#3a5aa8");
      ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(g.cx, g.cy, g.planetR, 0, Math.PI * 2); ctx.fill();
      for (const f of g.flares) {
        const x = g.cx + Math.cos(f.a) * f.d, y = g.cy + Math.sin(f.a) * f.d;
        const x2 = g.cx + Math.cos(f.a) * (f.d + 18), y2 = g.cy + Math.sin(f.a) * (f.d + 18);
        ctx.strokeStyle = f.power ? (f.power === 2 ? "#c98bff" : "#3fe89b") : "#ffcf6b"; ctx.lineWidth = f.power ? 5 : 3; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x2, y2); ctx.stroke();
      }
      ctx.lineCap = "butt";
      ctx.strokeStyle = C.cool; ctx.lineWidth = 9;
      ctx.beginPath(); ctx.arc(g.cx, g.cy, g.R, g.ang - g.arcHalf, g.ang + g.arcHalf); ctx.stroke();
      if (g.power >= 2) { ctx.beginPath(); ctx.arc(g.cx, g.cy, g.R, g.ang + Math.PI - g.arcHalf, g.ang + Math.PI + g.arcHalf); ctx.stroke(); }
      if (g.wflash > 0) { ctx.save(); ctx.globalAlpha = Math.max(0, g.wflash / 0.6) * 0.6; ctx.strokeStyle = g.power === 2 ? "#c98bff" : "#3fe89b"; ctx.lineWidth = 12; ctx.beginPath(); ctx.arc(g.cx, g.cy, g.R, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); }
    },
  },

  breaker: {
    meta: {
      title: { en: "Meteor Breaker", ja: "メテオ・ブレイカー" },
      goal: { en: "Bounce the comet off your paddle to shatter every asteroid brick above. Catch power capsules: 1:00 widens your paddle, 2:00 splits into multiball.", ja: "パドルで彗星を弾き返し、上の小惑星ブロックをすべて砕こう。パワーカプセルを取ろう：1分でパドルが広がり、2分でマルチボールに分裂。" },
      avoid: { en: "Letting the comet fall past the paddle costs a life.", ja: "彗星をパドルの下に落とすとライフを1つ失う。" },
      pad: "lr",
    },
    init: (g, api) => {
      g.bg = makeStars(api.W, api.H, 60);
      g.paddleW = 96; g.paddleX = api.W / 2; g.paddleY = api.H - 26;
      g.power = 0; g.jw1 = false; g.jw2 = false; g.caps = []; g.wflash = 0;
      g.build = () => {
        const cols = 8, rows = 4, top = 54, bw = (api.W - 40) / cols, bh = 20;
        const cols2 = ["#f5a742", "#ffcf6b", "#63d3f0", "#c98bff"];
        g.bricks = [];
        for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++)
          g.bricks.push({ x: 20 + c * bw, y: top + r * (bh + 6), w: bw - 5, h: bh, pts: (rows - r) * 2, color: cols2[r % cols2.length] });
      };
      g.build();
      g.serve = () => { g.balls = [{ x: g.paddleX, y: g.paddleY - 12, vx: 130 * (Math.random() < 0.5 ? -1 : 1), vy: -240 }]; };
      g.serve();
    },
    step: (g, ctx, dt, api, over) => {
      const { W, H, keys } = api, spd = 360, r = 7;
      if (keys.left) g.paddleX -= spd * dt;
      if (keys.right) g.paddleX += spd * dt;
      if (g.pdown && g.px != null) g.paddleX += clamp(g.px - g.paddleX, -spd * dt, spd * dt);
      g.paddleX = clamp(g.paddleX, g.paddleW / 2, W - g.paddleW / 2);
      if (g.wflash > 0) g.wflash -= dt;
      // power capsules: wider paddle at 1:00, multiball at 2:00 (each once)
      if (!g.jw1 && g.t >= 60) { g.jw1 = true; g.caps.push({ x: 30 + Math.random() * (W - 60), y: 40, vy: 120, kind: 1 }); }
      if (!g.jw2 && g.t >= 120) { g.jw2 = true; g.caps.push({ x: 30 + Math.random() * (W - 60), y: 40, vy: 120, kind: 2 }); }
      for (const c of g.caps) {
        if (c.dead) continue;
        c.y += c.vy * dt;
        if (c.y >= g.paddleY && Math.abs(c.x - g.paddleX) < g.paddleW / 2) {
          c.dead = true; g.wflash = 0.6; g.power = Math.max(g.power, c.kind); g.score += 15;
          spawnParts(g, c.x, c.y, 14, c.kind === 2 ? "#c98bff" : "#3fe89b");
          if (c.kind === 1) { g.paddleW += 40; g.paddleX = clamp(g.paddleX, g.paddleW / 2, W - g.paddleW / 2); }
          else { const src = g.balls[0]; if (src) g.balls.push({ x: src.x, y: src.y, vx: -src.vx, vy: src.vy }); }
        } else if (c.y > H + 20) c.dead = true;
      }
      g.caps = g.caps.filter((c) => !c.dead);
      // move each ball: walls, paddle, bricks
      for (const b of g.balls) {
        b.x += b.vx * dt; b.y += b.vy * dt;
        if (b.x < r) { b.x = r; b.vx = Math.abs(b.vx); }
        if (b.x > W - r) { b.x = W - r; b.vx = -Math.abs(b.vx); }
        if (b.y < 40 + r) { b.y = 40 + r; b.vy = Math.abs(b.vy); }
        if (b.vy > 0 && b.y + r >= g.paddleY && b.y < g.paddleY + 14 && b.x > g.paddleX - g.paddleW / 2 - r && b.x < g.paddleX + g.paddleW / 2 + r) {
          const off = clamp((b.x - g.paddleX) / (g.paddleW / 2), -1, 1);
          const sp = Math.hypot(b.vx, b.vy), ang = -Math.PI / 2 + off * 1.05;
          b.vx = Math.cos(ang) * sp; b.vy = Math.sin(ang) * sp; b.y = g.paddleY - r - 1;
        }
        for (const k of g.bricks) {
          if (k.dead) continue;
          if (b.x + r > k.x && b.x - r < k.x + k.w && b.y + r > k.y && b.y - r < k.y + k.h) {
            k.dead = true; g.score += k.pts; spawnParts(g, b.x, b.y, 10, k.color);
            const cx = k.x + k.w / 2, cy = k.y + k.h / 2;
            if (Math.abs(b.x - cx) / k.w > Math.abs(b.y - cy) / k.h) b.vx *= -1; else b.vy *= -1;
            break;
          }
        }
      }
      g.bricks = g.bricks.filter((k) => !k.dead);
      if (g.bricks.length === 0) { g.score += 20; g.build(); }
      // remove balls off the bottom; lose a life only when the last ball is gone
      g.balls = g.balls.filter((b) => b.y - r <= H);
      if (g.balls.length === 0) { lose(g, over); g.serve(); }
      // ---- draw ----
      drawBg(ctx, g, W, H);
      for (const k of g.bricks) {
        ctx.fillStyle = k.color; ctx.globalAlpha = 0.85; ctx.fillRect(k.x, k.y, k.w, k.h); ctx.globalAlpha = 1;
        ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 1; ctx.strokeRect(k.x, k.y, k.w, k.h);
      }
      for (const c of g.caps) drawJewel(ctx, c.x, c.y, c.kind, g.t);
      for (const b of g.balls) {
        const bg = ctx.createRadialGradient(b.x, b.y, 1, b.x, b.y, 16);
        bg.addColorStop(0, "#eaf3ff"); bg.addColorStop(1, "rgba(99,211,240,0)");
        ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(b.x, b.y, 16, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#eaf3ff"; ctx.beginPath(); ctx.arc(b.x, b.y, r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = C.cool; ctx.fillRect(g.paddleX - g.paddleW / 2, g.paddleY, g.paddleW, 10);
      ctx.fillStyle = "rgba(255,255,255,0.35)"; ctx.fillRect(g.paddleX - g.paddleW / 2, g.paddleY, g.paddleW, 3);
      if (g.wflash > 0) { ctx.save(); ctx.globalAlpha = Math.max(0, g.wflash / 0.6) * 0.5; ctx.fillStyle = g.power === 2 ? "#c98bff" : "#3fe89b"; ctx.fillRect(g.paddleX - g.paddleW / 2 - 6, g.paddleY - 6, g.paddleW + 12, 22); ctx.restore(); }
    },
  },

  docking: {
    meta: {
      title: { en: "Satellite Docking", ja: "衛星ドッキング" },
      goal: { en: "Slide the capsule under the spinning station and fire when the green port swings to the bottom. Fly through power gems: 1:00 widens the docking port, 2:00 slows the station.", ja: "カプセルを回転する宇宙ステーションの下に合わせ、緑のポートが下に来た瞬間に発射しよう。パワージェムを通ろう：1分でポートが広がり、2分でステーションが減速。" },
      avoid: { en: "Slamming into the station's body instead of the port costs a life.", ja: "ポートではなくステーション本体に激突するとライフを1つ失う。" },
      pad: "lrf",
    },
    init: (g, api) => {
      g.bg = makeStars(api.W, api.H, 60);
      g.sx = api.W / 2; g.sy = 118; g.Rst = 54; g.portHalf = 0.55;
      g.stAng = 0; g.stSpeed = 1.25; g.stCap = 3.4;
      g.capX = api.W / 2; g.capY = api.H - 30; g.flying = false; g.wasFire = false; g.trail = [];
      g.power = 0; g.jw1 = false; g.jw2 = false; g.jewels = []; g.wflash = 0;
    },
    step: (g, ctx, dt, api, over) => {
      const { W, H, keys } = api, r = 8, capSpeed = 268;
      g.stAng += g.stSpeed * dt;
      if (g.wflash > 0) g.wflash -= dt;
      // power gems float between the capsule and the station
      if (!g.jw1 && g.t >= 60) { g.jw1 = true; g.jewels.push({ x: 30 + Math.random() * (W - 60), y: (H + g.sy) / 2, kind: 1 }); }
      if (!g.jw2 && g.t >= 120) { g.jw2 = true; g.jewels.push({ x: 30 + Math.random() * (W - 60), y: (H + g.sy) / 2, kind: 2 }); }
      const press = keys.fire || g.pdown;
      const launch = (press && !g.wasFire) || g.tapped;
      g.wasFire = press; g.tapped = null;
      if (!g.flying) {
        if (keys.left) g.capX -= 320 * dt;
        if (keys.right) g.capX += 320 * dt;
        if (g.pdown && g.px != null) g.capX += clamp(g.px - g.capX, -320 * dt, 320 * dt);
        g.capX = clamp(g.capX, 16, W - 16);
        if (launch) { g.flying = true; g.pd0 = Math.hypot(g.capX - g.sx, g.capY - g.sy); }
      } else {
        const pd = Math.hypot(g.capX - g.sx, g.capY - g.sy);
        g.capY -= capSpeed * dt;
        for (const j of g.jewels) {
          if (j.dead) continue;
          if (Math.hypot(g.capX - j.x, g.capY - j.y) < r + 11) {
            j.dead = true; g.wflash = 0.6; g.score += 15;
            if (j.kind === 1) { g.power = Math.max(g.power, 1); g.portHalf = 0.85; }
            else { g.power = Math.max(g.power, 2); g.stSpeed *= 0.7; g.stCap = 2.4; }
            spawnParts(g, j.x, j.y, 14, j.kind === 2 ? "#c98bff" : "#3fe89b");
          }
        }
        g.jewels = g.jewels.filter((j) => !j.dead);
        g.trail.push({ x: g.capX, y: g.capY }); if (g.trail.length > 10) g.trail.shift();
        const nd = Math.hypot(g.capX - g.sx, g.capY - g.sy);
        if (pd > g.Rst && nd <= g.Rst) {
          const ca = Math.atan2(g.capY - g.sy, g.capX - g.sx);
          let da = ca - g.stAng; da = Math.atan2(Math.sin(da), Math.cos(da));
          if (Math.abs(da) < g.portHalf) {
            g.score += 40; spawnParts(g, g.capX, g.capY, 14, "#3fe89b");
            g.stSpeed = Math.min(g.stCap, g.stSpeed + 0.28);
          } else {
            spawnParts(g, g.capX, g.capY, 14, "#ff7a6b"); lose(g, over);
          }
          g.flying = false; g.capX = W / 2; g.capY = H - 30; g.trail = [];
        } else if (g.capY < -20) { g.flying = false; g.capX = W / 2; g.capY = H - 30; g.trail = []; }
      }
      // ---- draw ----
      drawBg(ctx, g, W, H);
      const sg = ctx.createRadialGradient(g.sx, g.sy, 8, g.sx, g.sy, g.Rst * 1.6);
      sg.addColorStop(0, "rgba(201,139,255,0.35)"); sg.addColorStop(1, "rgba(201,139,255,0)");
      ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(g.sx, g.sy, g.Rst * 1.6, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = C.violet; ctx.lineWidth = 10;
      ctx.beginPath(); ctx.arc(g.sx, g.sy, g.Rst, g.stAng + g.portHalf, g.stAng - g.portHalf + Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = C.good; ctx.lineWidth = 10;
      ctx.beginPath(); ctx.arc(g.sx, g.sy, g.Rst, g.stAng - g.portHalf, g.stAng + g.portHalf); ctx.stroke();
      ctx.fillStyle = "rgba(160,120,220,0.35)"; ctx.beginPath(); ctx.arc(g.sx, g.sy, g.Rst - 16, 0, Math.PI * 2); ctx.fill();
      for (let i = 0; i < g.trail.length; i++) { const p = g.trail[i]; ctx.globalAlpha = i / g.trail.length * 0.6; ctx.fillStyle = "#ffcf6b"; ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fill(); }
      ctx.globalAlpha = 1;
      for (const j of g.jewels) drawJewel(ctx, j.x, j.y, j.kind, g.t);
      ctx.fillStyle = "#eaf3ff"; ctx.beginPath(); ctx.moveTo(g.capX, g.capY - r); ctx.lineTo(g.capX - r, g.capY + r); ctx.lineTo(g.capX + r, g.capY + r); ctx.closePath(); ctx.fill();
      if (g.wflash > 0) { ctx.save(); ctx.globalAlpha = Math.max(0, g.wflash / 0.6) * 0.5; ctx.fillStyle = g.power === 2 ? "#c98bff" : "#3fe89b"; ctx.beginPath(); ctx.arc(g.capX, g.capY, 20, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
      if (!g.flying) { ctx.strokeStyle = "rgba(255,255,255,0.18)"; ctx.lineWidth = 1; ctx.setLineDash([4, 8]); ctx.beginPath(); ctx.moveTo(g.capX, g.capY - r); ctx.lineTo(g.capX, g.sy); ctx.stroke(); ctx.setLineDash([]); }
    },
  },

  wormhole: {
    meta: {
      title: { en: "Wormhole Run", ja: "ワームホール・ラン" },
      goal: { en: "Steer the ship through each gate's bright opening — grab stray stars for extra points. Grab green power stars: 1:00 grants a shield, 2:00 auto-recharges it.", ja: "宇宙船をゲートの明るい開口部に通そう——散らばる星を集めると追加得点。緑のパワースターを取ろう：1分でシールド、2分で自動リチャージ。" },
      avoid: { en: "Clipping a gate ring instead of its gap costs a life.", ja: "開口部ではなくゲートのリングに当たるとライフを1つ失う。" },
      pad: "lr",
    },
    init: (g, api) => {
      g.bg = makeStars(api.W, api.H, 60);
      g.shipX = api.W / 2; g.shipY = api.H - 52;
      g.gates = []; g.stars = []; g.spawn = 0.6; g.sspawn = 1.4;
      g.shield = 0; g.recharge = false; g.rt = 0; g.jw1 = false; g.jw2 = false; g.wflash = 0;
    },
    step: (g, ctx, dt, api, over) => {
      const { W, H, keys } = api, spd = 340;
      const scroll = 120 * (1 + g.t * 0.02);
      if (keys.left) g.shipX -= spd * dt;
      if (keys.right) g.shipX += spd * dt;
      if (g.pdown && g.px != null) g.shipX += clamp(g.px - g.shipX, -spd * dt, spd * dt);
      g.shipX = clamp(g.shipX, 16, W - 16);
      if (g.wflash > 0) g.wflash -= dt;
      if (g.recharge && g.shield < 1) { g.rt += dt; if (g.rt >= 10) { g.shield = 1; g.rt = 0; g.wflash = 0.6; } }
      if (!g.jw1 && g.t >= 60) { g.jw1 = true; g.stars.push({ x: 30 + Math.random() * (W - 60), y: -14, power: 1 }); }
      if (!g.jw2 && g.t >= 120) { g.jw2 = true; g.stars.push({ x: 30 + Math.random() * (W - 60), y: -14, power: 2 }); }
      g.spawn -= dt;
      if (g.spawn <= 0) { const gapW = 108, gapX = 30 + gapW / 2 + Math.random() * (W - 60 - gapW); g.gates.push({ y: -20, py: -20, gapX, gapW, scored: false }); g.spawn = 150 / scroll; }
      g.sspawn -= dt;
      if (g.sspawn <= 0) { g.stars.push({ x: 30 + Math.random() * (W - 60), y: -14 }); g.sspawn = 1.2 + Math.random() * 1.4; }
      for (const gt of g.gates) { gt.py = gt.y; gt.y += scroll * dt; }
      for (const gt of g.gates) {
        if (!gt.scored && gt.py < g.shipY && gt.y >= g.shipY) {
          gt.scored = true;
          if (g.shipX > gt.gapX - gt.gapW / 2 && g.shipX < gt.gapX + gt.gapW / 2) { g.score += 1; spawnParts(g, g.shipX, g.shipY, 10, "#c98bff"); }
          else if (g.shield > 0) { g.shield--; g.wflash = 0.6; spawnParts(g, g.shipX, g.shipY, 12, "#3fddff"); }
          else { spawnParts(g, g.shipX, g.shipY, 12, "#ff7a6b"); lose(g, over); }
        }
      }
      g.gates = g.gates.filter((gt) => gt.y < H + 30);
      for (const s of g.stars) {
        s.y += scroll * dt;
        if (!s.hit && Math.abs(s.x - g.shipX) < 16 && Math.abs(s.y - g.shipY) < 16) {
          s.hit = true;
          if (s.power) { if (s.power === 1) g.shield = Math.max(g.shield, 1); else g.recharge = true; g.wflash = 0.6; g.score += 15; spawnParts(g, s.x, s.y, 10, s.power === 2 ? "#c98bff" : "#3fe89b"); }
          else { g.score += 3; spawnParts(g, s.x, s.y, 8, "#ffcf6b"); }
        }
      }
      g.stars = g.stars.filter((s) => !s.hit && s.y < H + 20);
      // ---- draw ----
      drawBg(ctx, g, W, H);
      for (const gt of g.gates) {
        ctx.strokeStyle = "rgba(201,139,255,0.35)"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.ellipse(W / 2, gt.y, W / 2 - 12, 12, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = C.violet; ctx.globalAlpha = 0.9;
        const gl = gt.gapX - gt.gapW / 2, grr = gt.gapX + gt.gapW / 2;
        ctx.fillRect(20, gt.y - 6, gl - 20, 12); ctx.fillRect(grr, gt.y - 6, W - 20 - grr, 12);
        ctx.globalAlpha = 1; ctx.fillStyle = C.cool;
        ctx.beginPath(); ctx.arc(gl, gt.y, 4, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(grr, gt.y, 4, 0, Math.PI * 2); ctx.fill();
      }
      for (const s of g.stars) {
        if (s.power) { drawJewel(ctx, s.x, s.y, s.power, g.t); continue; }
        const sg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 12); sg.addColorStop(0, "#ffe08a"); sg.addColorStop(1, "rgba(255,207,107,0)");
        ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(s.x, s.y, 12, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#fff4d6"; ctx.beginPath(); ctx.arc(s.x, s.y, 4, 0, Math.PI * 2); ctx.fill();
      }
      const glow = ctx.createRadialGradient(g.shipX, g.shipY, 2, g.shipX, g.shipY, 24);
      glow.addColorStop(0, "rgba(99,211,240,0.5)"); glow.addColorStop(1, "rgba(99,211,240,0)");
      ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(g.shipX, g.shipY, 24, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#eaf3ff"; ctx.beginPath(); ctx.moveTo(g.shipX, g.shipY - 14); ctx.lineTo(g.shipX - 11, g.shipY + 11); ctx.lineTo(g.shipX + 11, g.shipY + 11); ctx.closePath(); ctx.fill();
      if (g.shield > 0) { ctx.strokeStyle = "rgba(63,221,255,0.8)"; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(g.shipX, g.shipY, 20, 0, Math.PI * 2); ctx.stroke(); }
      if (g.wflash > 0) { ctx.save(); ctx.globalAlpha = Math.max(0, g.wflash / 0.6) * 0.5; ctx.fillStyle = "#3fddff"; ctx.beginPath(); ctx.arc(g.shipX, g.shipY, 26, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
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
  const id = useMemo(() => ["solar", "star", "scale", "merge", "lander", "ascent", "shield", "breaker", "docking", "wormhole"][Math.floor(Math.random() * 10)], []);
  return <ArcadeShell reward={reward} onExit={onExit} onFinish={onFinish} def={GAMES_DEF[id]} />;
}

export default BonusGame;
