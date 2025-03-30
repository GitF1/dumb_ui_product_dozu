import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

// Import i18n (must be before rendering the app)
import "./i18n";

import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

// Use empty string as basename if BASE_URL is '/' to avoid double slashes
const basename =
  import.meta.env.BASE_URL && import.meta.env.BASE_URL !== "/"
    ? import.meta.env.BASE_URL
    : "";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
