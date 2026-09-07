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
4. **Earth, Moon, and Sky** — mapping the sky, the seasons, keeping time, calendars, the phases of the Moon, tides, and eclipses.
5. **Radiation and Spectra** — light as waves and photons, the electromagnetic spectrum, the inverse-square law, blackbody colours, the prism, the atom's spectral fingerprints, and the Doppler shift.
6. **Astronomical Instruments** — the telescope as a light bucket, lenses versus mirrors, focus arrangements, seeing and adaptive optics, CCD detectors and cooling, interferometry, and the great observatories from Hubble to JWST to Rubin.
7. **An Introduction to the Solar System** — the Sun's 99.8% of the mass, terrestrial versus giant planets, asteroids and comets as chemical fossils, differentiation, radioactive dating, reading surfaces, the solar nebula, and the exceptions that break the rules.
8. **Earth as a Planet** — the layered interior and its magnetic core, seismic sounding, the crust and rock cycle, plate tectonics, the atmosphere and its layers, the greenhouse effect, where our carbon and water hide, and four billion years of life, oxygen, ice ages and impacts.
9. **Cratered Worlds** — the Moon and Mercury: the lunar highlands and maria, the physics of impact cratering, dating by craters, regolith and polar ice, the Giant Impact, and Mercury's giant iron core, 3:2 spin–orbit day, and shrinking crust.
10. **Earthlike Planets: Venus and Mars** — Venus's phases, crushing CO₂ air, runaway greenhouse and naked resurfaced crust; Mars's rust, giant volcanoes and canyons, water past and present; and the divergent fates of three sister worlds.
11. **The Giant Planets** — the Grand Tour and its probes, the gas/ice/rock vocabulary, Jupiter's metallic-hydrogen interior, ammonia clouds and photochemistry, centuries-long storms and 1800 km/h winds, the tilted blue ice giants, faint distant sunlight, and why infrared detectors run cold.
12. **Rings, Moons, and Pluto** — the Galilean moons, tidal-heated volcanic Io and Europa's hidden ocean, hazy nitrogen-clad Titan and the Huygens landing, Saturn's ice rings and the Cassini Division, Enceladus's geysers and the dark narrow rings of the ice giants, backward-orbiting captured Triton, and dwarf planet Pluto with its young, convecting Sputnik Planitia and tidally locked Charon.

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

The round ends when your lives *or* the timer run out, whichever comes first. Ten games are in
the pool: **Asteroid Defense**, **Star Catcher**, **Warp Run**, **Merge Galaxy** (an original
drop-and-merge: combine worlds up to a galaxy), **Lunar Lander**, **Rocket Ascent**, **Solar
Flare Shield**, **Meteor Breaker**, **Satellite Docking**, and **Wormhole Run**.

### Bilingual
A one-tap **EN / 日本語** switch re-renders everything — station text, quizzes, game
instructions, and UI — in either language.

## Play it

- **Online:** visit the live link above, pick a chapter, and start exploring.
- **Offline:** open a chapter's `index.html` in any browser. No install needed.

**Controls (games):** move with the on-screen **◀ ▶** buttons, arrow keys, or by dragging;
**FIRE**/space to shoot, drop, or thrust (depending on the game). Works with mouse, keyboard, or touch.

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
