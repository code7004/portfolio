import { BrowserRouter as Router } from "react-router-dom";

import { RouteData } from "@/config/RouteData";
import { Suspense } from "react";
import RouteToolkit from "../@core/routeToolkit";
import PageLoader from "../components/PageLoader";

function App() {
  return (
    <Router>
      {/* lazy로 불러오는 페이지에 대한 fallback 로딩 UI */}
      <Suspense fallback={<PageLoader className={"h-screen"} />}>
        {/* 라우트 렌더링 */}
        <RouteToolkit data={RouteData} />
      </Suspense>
    </Router>
  );
}

export default App;
