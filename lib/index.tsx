import React from "react";
import { Provider } from "react-redux";
import store from "../src/store";
import App from "../src/App";
import "../src/i18n";

import "../src/index.css";

export function KageEditor() {
  return (
      <Provider store={store}>
        <App />
      </Provider>
  );
}
