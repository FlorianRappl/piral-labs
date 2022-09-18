import express from "express";
import { resolve } from "path";
import { render } from "./render";

const app = express();
const port = 3000;

app.use(express.static(resolve(__dirname, "public")));

app.get("/", async (_, res) => {
  res.send(await render());
});

app.listen(port, () => {
  console.log(`👽 Running on http://localhost:${port}`);
});
