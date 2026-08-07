# Cosmic Explorer 🪐

An interactive, bilingual (English / 日本語) astronomy game for the general public.
Explore the solar system in motion, forge a star and watch it live and die, learn the
constellations, and zoom out to the edge of the observable universe — then test what you
learned with quizzes, and unwind with a different arcade game after each one.

**Live site:** https://nobleson-phy.github.io/astrogamer/

## What's inside

### Four explorable realms
- **Solar System** — a live orrery with the planets orbiting at their true relative
  periods. Play/pause, speed up time, zoom and pan, pick any world for real data, and
  toggle between compressed and true-to-scale distances.
- **Star Forge** — set a star's birth mass and watch its whole life play out: protostar →
  main sequence → its fate as a white dwarf, neutron star, or black hole. Shows spectral
  class, temperature, and lifespan.
- **Night Sky** — 10 constellations and asterisms (Orion, Ursa Major, Cassiopeia, Cygnus,
  Scorpius, Leo, Taurus, Lyra, the Summer Triangle, and the Southern Cross). Reveal or hide
  the connecting lines and tap any one for its story.
- **Cosmic Scale** — zoom outward step by step from Earth to the observable universe, each
  level shrinking the last to a dot.

### Knowledge Check (quizzes)
- A quiz per topic plus a mixed **Grand Tour**, with 9–11 questions each (a shuffled subset
  per run).
- Instant feedback: the correct answer lights up and a one-line explanation says *why*.
- Running score, a streak counter, and an end rating from "Ground Control" to
  "Astronomer Royal".
- **Learn-then-test:** every quiz answer can be found by exploring its realm first.

### A bonus game after each quiz
Each section rewards you with its own mini-game (Grand Tour picks one at random):
- **Solar System → Asteroid Defense** (shoot the falling rocks)
- **Star Forge → Star Catcher** (catch hydrogen, dodge rocks)
- **Night Sky → Constellation Connect** (tap the stars in order, against the clock)
- **Cosmic Scale → Warp Run** (fly outward and survive)

Every game opens with a **How to play** card (goal, controls, what to avoid, shields), and
your quiz performance sets the stakes: **each wrong answer removes a starting shield and
nudges the difficulty up.** A perfect quiz means full shields and a calmer round.

### Bilingual
A one-tap **EN / 日本語** switch in the header re-renders everything — facts, quizzes,
game instructions, and UI — in either language.

## Play it

- **Online:** visit the live link above.
- **Offline:** open `index.html` in any web browser (double-click it). No install needed.

**Controls (games):** move with the on-screen **◀ ▶** buttons, the arrow keys, or by
dragging; fire with the **FIRE** button or space where relevant; Constellation Connect is
tap-only. Everything works with mouse, keyboard, or touch.

## Project layout

```
astrogamer/
├── index.html   ← the page GitHub Pages serves (loads app.js)
├── app.js       ← the compiled game (React bundled in) — this is the deployed build
├── src/
│   ├── CosmicExplorer.jsx  ← the full game source (edit this)
│   └── main.jsx            ← entry point that mounts the app
├── build.mjs    ← build script (esbuild)
├── package.json
└── README.md
```

## Editing & rebuilding

You only need this if you want to change the game. It requires [Node.js](https://nodejs.org) (the free LTS version).

```bash
npm install          # once, to get React + esbuild
npm run build        # rebuild app.js after editing src/CosmicExplorer.jsx
npm run dev          # optional: live-reload dev server at http://localhost:8000
```

After `npm run build`, commit the updated `app.js` and push — GitHub Pages redeploys automatically.

## How it's hosted

Served as static files by **GitHub Pages** (Settings → Pages → deploy from `main`, root
folder). Nothing runs on a server; the whole game is bundled into `app.js`. The only
runtime request is to Google Fonts, which degrades gracefully to system fonts if unavailable.

## Notes

- Every fact in the game is real; the visuals are scaled for clarity, not to true scale.
- Constellation star positions are simplified so each shape is easy to learn.
- Planet moon counts are current as of early 2026 and labelled "known" — astronomers keep finding more.
- The Japanese translations use standard astronomy terms but would benefit from a native-speaker review before classroom use.

Built with React (© Meta, MIT-licensed).
