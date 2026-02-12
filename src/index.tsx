import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "@/styles/index.scss";

const root = createRoot(document.getElementById("root")!);
root.render(
  // StricMode 개발 초기에 구성 요소의 일반적인 버그를 찾을 수 있습니다.
  <StrictMode>
    <App />
  </StrictMode>
);
