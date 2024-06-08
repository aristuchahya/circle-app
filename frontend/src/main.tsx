import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";

import App from "./app.tsx";

import { Provider } from "./provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
