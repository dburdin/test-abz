import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/base/reset.scss";
import "./styles/base/general.scss";

import { App } from "./components/App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
