// src/index.tsx
import "@/styles/tailwind.css"; // 먼저

import "@/styles/index.scss";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { setupAxiosLogger } from "../core/network/axiosLogger";
import App from "./App";

const root = createRoot(document.getElementById("root")!);

(async () => {
  console.log("Version:", __APP_VERSION__);

  if (__BUILD_MODE__ == "production") {
    console.log = () => {};
    setupAxiosLogger(false);
  } else {
    setupAxiosLogger(true);
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
