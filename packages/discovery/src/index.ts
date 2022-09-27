import express from "express";
import { readFileSync } from "fs";
import { resolve, basename, dirname } from "path";

const app = express();
const port = 3003;

interface MicroFrontend {
  baseDir: string;
  meta: {
    version: string;
    entry: string;
  };
}

function getMicroFrontend(path: string): MicroFrontend {
  const packageJson = resolve(path, "package.json");
  const content = readFileSync(packageJson, 'utf8');
  const data = JSON.parse(content);

  return {
    baseDir: resolve(path, dirname(data.main)),
    meta: {
      version: data.version,
      entry: basename(data.main),
    },
  };
}

const microfrontends: Record<string, MicroFrontend> = {
  mf1: getMicroFrontend(resolve(__dirname, "../../mf1")),
  mf2: getMicroFrontend(resolve(__dirname, "../../mf2")),
};

app.get("/api/pilet", (_, res) => {
  res.setHeader("content-type", "application/json").send(
    JSON.stringify({
      items: Object.keys(microfrontends).map((id) => ({
        id,
        ...microfrontends[id].meta,
      })),
    })
  );
});

app.get("/assets/:id/:path*", (req, res) => {
  const { id, path } = req.params as Record<string, string>;
  const mf = microfrontends[id];

  if (!mf) {
    return res.sendStatus(404);
  }

  res.sendFile(resolve(mf.baseDir, path));
});

app.listen(port, () => {
  console.log(`👽 [discovery] Running on http://localhost:${port}`);
});
