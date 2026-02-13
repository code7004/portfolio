import "@/styles/tailwind.css"; // 먼저

import "@/styles/index.scss";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initAxios } from "./@core/network/axios.config";
import App from "./App";

const root = createRoot(document.getElementById("root")!);

(async () => {
  console.log("Version:", __APP_VERSION__);

  if (__BUILD_MODE__ == "production") {
    console.log = () => {};
    initAxios("https://dummyapi.io/data/v1", true);
    // console.log = console.warn = console.error = () => {};
  } else {
    initAxios("https://dummyapi.io/data/v1", true);
  }

  console.log("Mode:", __BUILD_MODE__);
  console.log("NoStrict Mode:", __NO_STRICT_MODE__);

  if (__NO_STRICT_MODE__) {
    root.render(<App />);
  } else {
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
})();
