import '@pilabs/app/src/style.scss';
import * as React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "@pilabs/app";

hydrateRoot(document.querySelector("#app"), <App />);
