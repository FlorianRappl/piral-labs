import { createElement } from "react";

export function useServer() {
  return [true, window.$serverResult()];
}

export const Island = ({ component }) => {
  return createElement(component);
};
