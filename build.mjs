import * as esbuild from "esbuild";
import { readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

/* ------------------------------------------------------------
   Entry points:
   - Hub:      src/hub/main.jsx           -> app.js  (repo root)
   - Chapters: src/chapters/<chN>/main.jsx -> chapters/<chN>/app.js
   Chapter dirs are auto-discovered by scanning src/chapters/.
------------------------------------------------------------- */
function discoverEntries() {
  const entries = { "app": "src/hub/main.jsx" };
  const chaptersDir = "src/chapters";
  if (existsSync(chaptersDir)) {
    for (const name of readdirSync(chaptersDir)) {
      const dir = join(chaptersDir, name);
      const entry = join(dir, "main.jsx");
      if (statSync(dir).isDirectory() && existsSync(entry)) {
        // outfile: chapters/<name>/app.js  (key = "chapters/<name>/app")
        entries[`chapters/${name}/app`] = entry;
      }
    }
  }
  return entries;
}

const entries = discoverEntries();

const common = {
  bundle: true,
  format: "iife",
  loader: { ".jsx": "jsx" },
  define: { "process.env.NODE_ENV": '"production"' },
  logLevel: "info",
};

// With a keyed entryPoints map, each key becomes the output path under
// outdir, so "app" -> ./app.js and "chapters/ch1/app" -> ./chapters/ch1/app.js.
const buildOpts = {
  ...common,
  entryPoints: entries,      // { "app": "...", "chapters/ch1/app": "..." }
  outdir: ".",
};

if (process.argv.includes("--watch")) {
  const ctx = await esbuild.context({ ...buildOpts, minify: false });
  await ctx.watch();
  const { host, port } = await ctx.serve({ servedir: "." });
  console.log(`Dev server: http://localhost:${port}  (rebuilds on save)`);
  console.log("Entries:", Object.keys(entries).join(", "));
} else {
  await esbuild.build({ ...buildOpts, minify: true });
  console.log("Built:", Object.keys(entries).map((k) => `${k}.js`).join(", "));
}
