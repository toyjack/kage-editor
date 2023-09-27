import React, { useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import store from "../src/store";
import App from "../src/App";
import "../src/i18n";
import {  useAtom, useSetAtom } from "jotai";

import "../src/index.css";
import { hostAtom } from "./args";

type Props = {
  host?: string;
};

export function KageEditor({ host }: Props) {
  const setHost = useSetAtom(hostAtom);
  useEffect(() => {
    if (host) {
      setHost(host);
    }
  }, []);
  return (
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  );
}
