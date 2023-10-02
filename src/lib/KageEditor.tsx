import React from "react";
import store from "../store";
import { Provider } from "react-redux";
import { NextUIProvider } from "@nextui-org/react";
import App from "../App";
import "../i18n";
import "../index.css";
import { AppProps } from "../types";

function KageEditor(props: AppProps) {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <NextUIProvider>
          <App {...props} />
        </NextUIProvider>
      </Provider>
    </React.StrictMode>
  );
}

export default KageEditor;
