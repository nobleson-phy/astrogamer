import * as esbuild from "esbuild";

const opts = {
  entryPoints: ["src/main.jsx"],
  bundle: true,
  format: "iife",
  loader: { ".jsx": "jsx" },
  define: { "process.env.NODE_ENV": '"production"' },
  outfile: "app.js",
  logLevel: "info",
};

if (process.argv.includes("--watch")) {
  const ctx = await esbuild.context({ ...opts, minify: false });
  await ctx.watch();
  const { host, port } = await ctx.serve({ servedir: "." });
  console.log(`Dev server: http://localhost:${port}  (rebuilds on save)`);
} else {
  await esbuild.build({ ...opts, minify: true });
  console.log("Built app.js");
}
