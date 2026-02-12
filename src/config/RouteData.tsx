import React from "react";

import Contents from "@/pages/Contents";
import NotFound from "@/pages/NotFound";

// Contetns
import Dashboard from "@/pages/Contents/Dashboard";
import Settings from "@/pages/Contents/Settings";

// 동적 import를 통한 코드 스플리팅 (React.lazy + Suspense 필요)
const Logs = React.lazy(() => import("@/pages/Contents/Logs"));
// Logs 하위 메뉴

/**
 * 실제 라우트 데이터 정의
 * - 라우터 구성 및 메뉴, 권한 처리 등 다목적으로 활용 가능
 */
export const RouteData = {
  Contents: {
    name: "Contents",
    icon: "🧮",
    index: true,
    disable: false,
    path: "/",
    element: <Contents />,
    description: "포트폴리오 요약",
    children: {
      Dashboard: { name: "DASHBOARD", icon: "🧮", index: true, disable: false, path: "/", element: <Dashboard />, description: "포트폴리오 요약" },
      Settings: { name: "SETTINGS", icon: "⚙️", index: true, disable: false, path: "/settings", element: <Settings />, description: "세팅페이지" },
      Logs: {
        name: "LOGS",
        icon: "🧾",
        disable: true,
        path: "/logs",
        element: <Logs />,
        children: {
          Dashboard: { name: "Dashboard", icon: "🧾", disable: false, path: "/logs", element: <Dashboard />, description: "솔루셔 요악 및 바로가기" }
        }
      }
    }
  },
  NotFound: { name: "NotFound", icon: "", disable: true, path: "*", element: <NotFound /> }
};
