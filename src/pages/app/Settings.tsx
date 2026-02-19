import { RouteData } from "@/app/RouteData";
import { useCurrentRoute } from "@/core/routeToolkit/utils";
import { PageLayout } from "@/shared/layout/PageLayout";
import { Outlet } from "react-router-dom";

const Settings = () => {
  const route = useCurrentRoute(RouteData);
  return (
    <PageLayout>
      <h1 className="text-2xl font-bold">{`${route.meta.icon} ${route.meta.label}`}</h1>
      <p className="mt-2 text-gray-600">이 페이지는 🧠 {route.meta.label} 페이지 템플릿입니다.</p>
      <Outlet />
    </PageLayout>
  );
};

export default Settings;
