import * as React from "react";
import { renderToString } from "react-dom/server";
import App from "@pilabs/app";
import html from "@pilabs/app/public/index.html";

async function makeContent(queue: Array<Promise<any> | any>) {
  let index = 0;

  globalThis.getNextResult = (cb, isIsland) => {
    if (queue.length > index) {
      return queue[index++];
    }

    const p = cb();

    if (p instanceof Promise) {
      queue[index] = p.then((r) => (queue[index] = { current: r, isIsland }));
      return undefined;
    }

    return (queue[index] = { current: p, isIsland });
  };

  try {
    return renderToString(<App />);
  } catch (err) {
    if (err instanceof Error && err.message === "deferred") {
      await Promise.all(queue);
      return await makeContent(queue);
    } else {
      console.log("Could not render", err);
      return "";
    }
  }
}

export async function render() {
  const queue = [];
  const content = await makeContent(queue);
  const data = queue.filter((q) => q.isIsland).map((q) => q.current);
  const dataScript =
    data.length > 0
      ? `
    <script>
      let i = 0;
      const data = ${JSON.stringify(data)};
      window.$serverResult = () => data[i++];
    </script>
  `
      : "";
  const appScript = `<script src="app.js" type="module" async></script>`;

  return html
    .replace(
      '<div id="app"></div>',
      `<div id="app">${content}</div>${dataScript}${appScript}`
    )
    .replace("</head>", '<link href="app.css" rel="stylesheet"></head>');
}
