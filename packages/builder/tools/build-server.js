const esbuild = require("esbuild");
const alias = require("esbuild-plugin-alias");
const { codegenPlugin } = require("esbuild-codegen-plugin");
const { sassPlugin } = require("esbuild-sass-plugin");
const { writeFileSync, mkdirSync } = require("fs");
const { resolve, dirname } = require("path");
const { withIslands } = require("./islands");

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
    plugins: [
      codegenPlugin(),
      alias({
        "@pilabs/utils": require.resolve("@pilabs/utils/server"),
      }),
    ],
  })
  .then((res) => {
    const file = res.outputFiles.find((m) => m.path.endsWith("/index.js"));
    const newContent = withIslands(file.text);

    mkdirSync(outdir, { recursive: true });

    writeFileSync(file.path, newContent, "utf8");

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
      splitting: true,
      platform: "browser",
      loader: {
        ".png": "file",
      },
      plugins: [
        sassPlugin(),
        codegenPlugin(),
        alias({
          "@pilabs/utils": require.resolve("@pilabs/utils/client"),
          "react": require.resolve("preact/compat"),
          "react-dom": require.resolve("preact/compat"),
          "react-dom/client": require.resolve("preact/compat/client"),
        }),
      ],
    });
  });
