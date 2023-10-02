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
      lang="en"
      host="123213http://localhost:3000/api"
      onSubmit={handleSubmit}
    />
  </div>
);
