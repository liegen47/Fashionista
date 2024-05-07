import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "virtual:windi.css";
import { Provider } from "react-redux";
import store from "./store"; // Import your Redux store
import App from "./App";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
