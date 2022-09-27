const esbuild = require("esbuild");
const { resolve, dirname } = require("path");

const outdir = resolve(
  dirname(require.resolve("@pilabs/discovery/package.json")),
  "dist"
);

esbuild.build({
  entryPoints: [require.resolve("@pilabs/discovery/src/index.ts")],
  outdir,
  bundle: true,
  platform: "node",
  write: true,
  plugins: [],
});
