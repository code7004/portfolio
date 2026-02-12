import { useCurrentRoute } from "@/@core/routeToolkit";
import { PageLayout } from "@/components/PageLayout";
import { RouteData } from "@/config/RouteData";

const Dashboard = () => {
  const route = useCurrentRoute(RouteData);

  return (
    <PageLayout className="flex flex-col p-4">
      <h1 className="font-bold">{`${route.data.icon} ${route.data.name}`}</h1>
      <p className="text-gray-600">이 페이지는 📊 대시보드용 템플릿입니다.</p>
      <ul>
        <li>현재 가동 중 설비스</li>
        <li>이상 감지 설비</li>
        <li>실시간 생산량 그래프</li>
        <li>상태 필터(정상/경고/중지)</li>
      </ul>
    </PageLayout>
  );
};

export default Dashboard;
