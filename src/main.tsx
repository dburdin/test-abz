import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/reset.scss";
import "./styles/base.scss";
import "./styles/index.scss";

import { App } from "./components/App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
