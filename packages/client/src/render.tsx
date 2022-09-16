import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "@pilabs/app";

export function render() {
  const host = document.querySelector('#app');
  createRoot(host).render(<App />);
}
