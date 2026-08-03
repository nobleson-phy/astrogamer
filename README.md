# Cosmic Explorer 🪐

An interactive, bilingual (English / 日本語) astronomy game for the general public.
Explore the solar system in motion, forge a star and watch it live and die, learn
the constellations, zoom out to the edge of the observable universe — then test
yourself with quizzes and a bonus asteroid-shooter whose difficulty depends on how
well you did.

**Live site:** https://<your-username>.github.io/astrogame/  *(fill in after deploying)*

## Play it

- **Online:** visit the live link above.
- **Offline:** open `index.html` in any web browser (double-click it). No install needed.

## Project layout

```
astrogame/
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

Served as static files by **GitHub Pages** (Settings → Pages → deploy from `main`, root folder).
Nothing runs on a server; the whole game is in `app.js`. The only runtime request is to
Google Fonts, which degrades gracefully to system fonts if unavailable.

## Notes

- Every fact in the game is real; the visuals are scaled for clarity, not to true scale.
- Planet moon counts are current as of early 2026 and labelled "known" — astronomers keep finding more.
- The Japanese translations use standard astronomy terms but would benefit from a native-speaker review before classroom use.

Built with React. React is © Meta, MIT-licensed.
