import React from "react";

import Contents from "@/pages/app";
import NotFound from "@/pages/public/NotFound";

// Contetns
import Dashboard from "@/pages/app/Dashboard";
import Settings from "@/pages/app/Settings";

// 동적 import를 통한 코드 스플리팅 (React.lazy + Suspense 필요)
const Board = React.lazy(() => import("@/pages/app/Board"));
// Logs 하위 메뉴

/**
 * 실제 라우트 데이터 정의
 * - 라우터 구성 및 메뉴, 권한 처리 등 다목적으로 활용 가능
 */
export const RouteData = {
  Contents: {
    name: "Contents",
    icon: "🧮",
    disable: false,
    path: "/",
    element: <Contents />,
    description: "포트폴리오 요약",
    children: {
      Dashboard: { name: "DASHBOARD", icon: "🧮", index: true, disable: false, path: "/", element: <Dashboard />, description: "포트폴리오 요약" },
      Settings: { name: "SETTINGS", icon: "⚙️", disable: false, path: "/settings", element: <Settings />, description: "세팅페이지" },
      Board: {
        name: "BOARD",
        icon: "🧾",
        disable: false,
        path: "/board",
        element: <Board />,
        children: {
          Dashboard: { name: "Board", icon: "🧾", disable: false, path: "/board", element: <Dashboard />, description: "게시판" }
        }
      }
    }
  },
  NotFound: { name: "NotFound", icon: "", disable: true, path: "*", element: <NotFound /> }
};
