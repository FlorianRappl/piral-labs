import * as React from "react";
import { renderToString } from "react-dom/server";
import App from "@pilabs/app";
import html from "@pilabs/app/public/index.html";

async function makeContent(queue: Array<Promise<any> | any>) {
  let index = 0;

  globalThis.getNextResult = (cb) => {
    if (queue.length > index) {
      return queue[index++];
    }

    const p = cb();

    if (p instanceof Promise) {
      queue[index] = p;
      return undefined;
    }

    return (queue[index] = { current: p });
  };

  try {
    return renderToString(<App />);
  } catch (err) {
    if (err instanceof Error && err.message === "deferred") {
      await Promise.all(
        queue.map((p, i) =>
          p instanceof Promise ? p.then((r) => (queue[i] = { current: r })) : p
        )
      );
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
  const data = queue.map((q) => q.current);

  return html
    .replace(
      '<div id="app"></div>',
      `<div id="app">${content}</div>
       <script>
         let i = 0;
         const data = ${JSON.stringify(data)};
         window.$serverResult = () => data[i++];
       </script>
       <script src="app.js" type="module"></script>`
    )
    .replace("</head>", '<link href="app.css" rel="stylesheet"></head>');
}
