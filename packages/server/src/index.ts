import express from "express";
import { resolve } from "path";
import { render } from "./render";

const app = express();
const port = 3000;

app.use(express.static(resolve(__dirname, "public")));

let cachedResponse: string = undefined;

app.get("/", async (_, res) => {
  // logic could be more complicated, e.g.,
  // vary on request headers and invalidate after time
  if (!cachedResponse) {
    cachedResponse = await render();
  }

  res.send(cachedResponse);
});

app.listen(port, () => {
  console.log(`👽 Running on http://localhost:${port}`);
});
