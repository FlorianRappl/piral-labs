import { createElement } from "react";

export function useServer(cb) {
  const result = globalThis.getNextResult(cb);

  if (typeof result === "undefined") {
    throw new Error("deferred");
  }

  return [true, result.current];
}

export const Island = ({ component, when = "load", uid = "_" }) => {
  return createElement("island-root", {
    children: createElement(component),
    [`data-on-${when}`]: uid,
  });
};
