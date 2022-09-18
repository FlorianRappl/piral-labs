const esbuild = require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");
const { codegenPlugin } = require("esbuild-codegen-plugin");
const { readFileSync, writeFileSync } = require("fs");
const { resolve, dirname } = require("path");

const outdir = resolve(
  dirname(require.resolve("@pilabs/client/package.json")),
  "dist"
);

esbuild
  .build({
    entryPoints: [require.resolve("@pilabs/client/src/index.ts")],
    outdir,
    bundle: true,
    format: "esm",
    platform: "browser",
    loader: {
      ".png": "file",
    },
    plugins: [sassPlugin(), codegenPlugin()],
  })
  .then(() => {
    const source = require.resolve("@pilabs/app/public/index.html");
    const target = resolve(outdir, "index.html");
    const content = readFileSync(source, "utf8");

    writeFileSync(
      target,
      content
        .replace(
          "</body>",
          '<script src="index.js" type="module"></script></body>'
        )
        .replace("</head>", '<link href="index.css" rel="stylesheet"></head>'),
      "utf8"
    );
  });
