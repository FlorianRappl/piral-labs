const esbuild = require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");
const { writeFileSync, mkdirSync } = require("fs");
const { resolve, dirname } = require("path");

const outdir = resolve(
  dirname(require.resolve("@pilabs/server/package.json")),
  "dist"
);

esbuild
  .build({
    entryPoints: [require.resolve("@pilabs/server/src/index.ts")],
    outdir,
    bundle: true,
    platform: "node",
    write: false,
    loader: {
      ".html": "text",
      ".png": "file",
    },
  })
  .then((res) => {
    const file = res.outputFiles.find((m) => m.path.endsWith("/index.js"));

    mkdirSync(outdir, { recursive: true });

    writeFileSync(file.path, file.contents);

    return esbuild.build({
      entryPoints: [require.resolve("@pilabs/server/src/app.tsx")],
      outdir: resolve(
        dirname(require.resolve("@pilabs/server/package.json")),
        "dist",
        "public"
      ),
      format: "esm",
      minify: true,
      bundle: true,
      platform: "browser",
      loader: {
        ".png": "file",
      },
      plugins: [sassPlugin()],
    });
  });
