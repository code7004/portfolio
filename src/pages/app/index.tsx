import { RouteData } from "@/app/RouteData";
import GNB from "@/shared/layout/GNB";
import { Outlet } from "react-router-dom";

const Contents = () => {
  return (
    <div className="flex flex-col h-screen dark:bg-gray-900 dark:text-gray-100">
      <GNB data={RouteData.Contents.children} />
      <Outlet />
    </div>
  );
};

export default Contents;
