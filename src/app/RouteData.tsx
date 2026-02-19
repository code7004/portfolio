// RouteData.tsx
import { RouteDataMap } from "@/core/routeToolkit/types";
import React from "react";

import Contents from "@/pages/app";
import Dashboard from "@/pages/app/Dashboard";
import Settings from "@/pages/app/Settings";
import NotFound from "@/pages/public/NotFound";

const Board = React.lazy(() => import("@/pages/app/Board"));

export const RouteData: RouteDataMap = {
  Contents: {
    path: "/",
    element: <Contents />,
    meta: { label: "Contents", icon: "🧮", layout: "app", description: "포트폴리오 요약", order: 1 },
    children: {
      Dashboard: { index: true, element: <Dashboard />, meta: { icon: "🧮", label: "Dashboard", breadcrumb: true } },
      Settings: { path: "settings", element: <Settings />, meta: { label: "Settings", icon: "⚙️" } },
      Board: { path: "board", element: <Board />, meta: { label: "Board", icon: "🧾" } }
    }
  },
  NotFound: { path: "*", element: <NotFound />, meta: { hidden: true, layout: "public" } }
};
