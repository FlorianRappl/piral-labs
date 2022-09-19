import * as React from "react";
import { hydrateRoot } from "react-dom/client";
import { load } from "./islands.codegen";

function hydrate(fileName: string | null, element: Element) {
  if (fileName) {
    load(fileName).then(
      (Component) => {
        hydrateRoot(element, <Component />);
      },
      (err) => {
        console.log("Could not load", err);
      }
    );
  }
}

document.querySelectorAll("island-root[data-on-load]").forEach((element) => {
  const fileName = element.getAttribute("data-on-visible");
  hydrate(fileName, element);
});

document.querySelectorAll("island-root[data-on-visible]").forEach((element) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fileName = element.getAttribute("data-on-visible");
        hydrate(fileName, element);
        observer.disconnect();
      }
    });
  });

  for (let i = 0; i < element.children.length; i++) {
    const child = element.children[i];
    observer.observe(child);
  }
});

document.querySelectorAll("island-root[data-on-event]").forEach((element) => {
  const eventName = element.getAttribute("data-on-event-name");

  if (eventName) {
    const handler = () => {
      const fileName = element.getAttribute("data-on-event");
      hydrate(fileName, element);
      window.removeEventListener(eventName, handler);
    };
    window.addEventListener(eventName, handler);
  }
});

document.querySelectorAll("island-root[data-on-idle]").forEach((element) => {
  requestIdleCallback(() => {
    const fileName = element.getAttribute("data-on-idle");
    hydrate(fileName, element);
  });
});
