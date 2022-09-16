import * as React from "react";
import { renderToString } from "react-dom/server";
import App from "@pilabs/app";
import html from "@pilabs/app/public/index.html";

export function render() {
  const content = renderToString(<App />);
  return html
    .replace(
      '<div id="app"></div>',
      `<div id="app">${content}</div><script src="app.js" type="module"></script>`
    )
    .replace("</head>", '<link href="app.css" rel="stylesheet"></head>');
}
