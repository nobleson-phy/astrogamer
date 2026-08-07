# Cosmic Explorer 🪐

An interactive, bilingual (English / 日本語) astronomy **course** for the general public —
a chapter-by-chapter journey where you *explore* each topic through hands-on visualizations,
then *prove it* with a quiz and unwind with a bonus arcade game.

Each chapter is built from a real astronomy textbook (OpenStax *Astronomy 2e*): every quiz
answer can be discovered by exploring that chapter's interactive stations first.

**Live site:** https://nobleson-phy.github.io/astrogamer/

## What's inside

### A hub of chapters
The landing page lists the course chapters. Available now:

1. **Science and the Universe** — the scale of the cosmos, how science works, light-travel time, the very small, and stardust.
2. **Observing the Sky** — the celestial sphere, constellations & the zodiac, precession, retrograde motion, and the geocentric → heliocentric story to Galileo.
3. **Orbits and Gravity** — Kepler's laws, Newton's laws of motion, universal gravitation, angular momentum, orbits, escape speed and gravity assists.

### Eight interactive "stations" per chapter
Each chapter is a set of bespoke, animated canvas/SVG stations (an orrery, a light-pulse
explorer, a cosmic calendar, an eccentricity slider, a top-down angular-momentum skater, and
so on). Stations use a consistent layout — a story panel on the left, the interactive on the
right — and are woven together with a connecting narrative so the chapter reads as one thread.

### Knowledge Check (quizzes)
- A 25-question bank per chapter (15 knowledge, 5 reasoning, 5 understanding).
- Pick a difficulty, which draws a 6-question run:
  - **Beginner** — 6 easy (max 30 pts)
  - **Intermediate** — 3 easy + 3 medium (max 36 pts)
  - **Advanced** — 2 easy + 2 medium + 2 hard (max 44 pts)
- Points per correct answer: easy **5**, medium **7**, hard **10**. Instant feedback with a one-line explanation.

### A bonus game after each quiz
Your score sets the stakes for a randomly chosen mini-game — **more points → more lives and a longer round**:
- **> 25 pts →** 5 lives, 5 minutes
- **15–25 pts →** 3 lives, 3 minutes
- **< 15 pts →** 1 life, 1 minute

The round ends when your lives *or* the timer run out, whichever comes first. Five games are in
the pool: **Asteroid Defense**, **Star Catcher**, **Constellation Connect**, **Warp Run**, and
**Merge Galaxy** (an original drop-and-merge: combine worlds up to a galaxy).

### Bilingual
A one-tap **EN / 日本語** switch re-renders everything — station text, quizzes, game
instructions, and UI — in either language.

## Play it

- **Online:** visit the live link above, pick a chapter, and start exploring.
- **Offline:** open a chapter's `index.html` in any browser. No install needed.

**Controls (games):** move with the on-screen **◀ ▶** buttons, arrow keys, or by dragging;
**FIRE**/space to shoot or drop; Constellation Connect is tap-only. Works with mouse, keyboard, or touch.

## Project layout

```
astrogamer/
├── index.html              ← the hub (landing page); GitHub Pages serves this
├── app.js                  ← compiled hub bundle
├── chapters/
│   ├── ch1/ (index.html + app.js)
│   ├── ch2/ (index.html + app.js)
│   └── ch3/ (index.html + app.js)   ← each chapter is its own page + bundle
├── src/
│   ├── hub/                ← the landing page
│   ├── shared/             ← the reusable engine: theme, i18n, styles, Quiz, arcade (games),
│   │                          and the interactive components library
│   └── chapters/
│       ├── ch1/ (Chapter1.jsx, questions.js, stations/…)
│       ├── ch2/ …
│       └── ch3/ …
├── build.mjs               ← multi-entry esbuild (auto-discovers src/chapters/*)
├── package.json
├── test/                   ← the original single-page pilot, preserved (served at /test/)
└── README.md
```

## Editing & rebuilding

Requires [Node.js](https://nodejs.org) (the free LTS version).

```bash
npm install          # once, to get React + esbuild
npm run build        # rebuild the hub + every chapter bundle
npm run dev          # optional: live-reload dev server
```

**Adding a chapter:** create `src/chapters/chN/` (a `Chapter N.jsx`, a `questions.js`, and a
`stations/` folder), add a `chapters/chN/index.html`, and append one entry to the `CHAPTERS`
array in `src/hub/Hub.jsx`. The build discovers the new chapter automatically.

After `npm run build`, commit the updated bundles and push — GitHub Pages redeploys automatically.

## How it's hosted

Served as static files by **GitHub Pages** (deploy from `main`, root folder). Nothing runs on
a server; each page is a self-contained bundle. The only runtime request is to Google Fonts,
which degrades gracefully to system fonts if unavailable. The original pilot game remains
available at **`/test/`**.

## Notes

- Every fact in the course is real; visuals are scaled for clarity, not to true scale.
- Question banks and source chapters live under `Chapters/` (outside the built site).
- The Japanese translations use standard astronomy terms but would benefit from a native-speaker review before classroom use.

Built with React (© Meta, MIT-licensed). Course content adapted from OpenStax *Astronomy 2e* (CC BY 4.0).
