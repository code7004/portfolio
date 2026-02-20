// src/app/RouteData.tsx
import { RouteTree } from "@/core/route-meta/types";
import React from "react";

import Contents from "@/pages/app";
import Dashboard from "@/pages/app/Dashboard";
import Settings from "@/pages/app/Settings";
import NotFound from "@/pages/public/NotFound";

const Board = React.lazy(() => import("@/pages/app/Board"));
const Child = React.lazy(() => import("@/pages/app/Board/Child"));

export const RouteData = {
  Contents: {
    path: "/",
    element: <Contents />,
    meta: { label: "Contents", icon: "🧮", description: "포트폴리오 요약" },
    children: {
      Dashboard: { path: "", element: <Dashboard />, meta: { icon: "🧮", label: "Dashboard" } },
      Settings: { path: "settings", element: <Settings />, meta: { label: "Settings", icon: "⚙️" } },
      Board: {
        path: "board",
        element: <Board />,
        meta: { label: "Board", icon: "🧾" },
        children: {
          Child: { path: "child", element: <Child />, meta: { label: "BoardChild", icon: "🧾" } }
        }
      }
    }
  },
  NotFound: { path: "*", element: <NotFound />, meta: { hidden: true } }
} satisfies RouteTree;

// RouteTree는 구조 검증을 위해 satisfies로 적용, 동시에 리터럴 타입을 유지해서 키 기반 접근 시 인텔리전스를 살릴수 있음
// satisfies는 타입을 “강제 변환”하지 않고, 구조만 검증하는 연산자. TypeScript 4.9에서 추가된 기능
