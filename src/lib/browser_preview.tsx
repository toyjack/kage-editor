import React from "react";
import ReactDOM from "react-dom/client";

import { KageEditor } from "./index";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const handleSubmit = (data: string) => {
  console.log(data);
};
root.render(
  <div className="flex">
    <div></div>
    <KageEditor
      name="u4e00"
      data="1:0:0:14:101:186:101"
      lang="zh-Hans"
      host="https://asia-northeast1-ku6goma.cloudfunctions.net/gwproxy"
      onSubmit={handleSubmit}
    />
  </div>
);
