import GNB from "@/components/GNB";
import { RouteData } from "@/config/RouteData";
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
