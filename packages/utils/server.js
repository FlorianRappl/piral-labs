import { createElement, createContext, useContext } from "react";

const IslandContext = createContext(false);

export function useServer(cb) {
  const isIsland = useContext(IslandContext) || false;
  const result = globalThis.getNextResult(cb, isIsland);

  if (typeof result === "undefined") {
    throw new Error("deferred");
  }

  return [true, result.current];
}

export const Island = ({ component, when = "load", uid = "_" }) => {
  return createElement(
    IslandContext.Provider,
    {
      value: true,
    },
    createElement("island-root", {
      children: createElement(component),
      [`data-on-${when}`]: uid,
    })
  );
};
