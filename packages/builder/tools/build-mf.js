const esbuild = require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");
const { codegenPlugin } = require("esbuild-codegen-plugin");
const { resolve, dirname } = require("path");

const mf = process.argv.pop();
const packageJson = require.resolve(`@pilabs/${mf}/package.json`);
const baseDir = dirname(packageJson);
const { source } = require(packageJson);

const outdir = resolve(baseDir, "dist");

esbuild.build({
  entryPoints: [resolve(baseDir, source)],
  outdir,
  bundle: true,
  format: "cjs",
  platform: "node",
  publicPath: `/____URI____/${mf}/`,
  loader: {
    ".png": "file",
  },
  plugins: [sassPlugin(), codegenPlugin()],
  external: ["react"],
});
