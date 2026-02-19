import { RouteData } from "@/app/RouteData";
import { useCurrentRoute } from "@/core/routeToolkit";
import { PageLayout } from "@/shared/layout/PageLayout";
import { Outlet } from "react-router-dom";

const Settings = () => {
  const route = useCurrentRoute(RouteData);
  return (
    <PageLayout>
      <h1 className="text-2xl font-bold">{`${route.data.icon} ${route.data.name}`}</h1>
      <p className="mt-2 text-gray-600">이 페이지는 🧠 {route.data.name} 페이지 템플릿입니다.</p>
      <Outlet />
    </PageLayout>
  );
};

export default Settings;
