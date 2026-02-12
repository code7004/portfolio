import { RouteDataAtts } from "@/@core/routeToolkit";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function GNB({ data }: { data: RouteDataAtts }) {
  const [menus, _menus] = useState([]);

  useEffect(() => {
    _menus(Object.values(data));
  }, [data]);

  return (
    <header className="relative z-50 flex items-center justify-between h-16 px-8 text-gray-900 bg-white border-b border-gray-200 shadow dark:bg-gray-900 dark:border-gray-700 dark:text-white">
      <nav className="flex items-center space-x-6 min-w-[1080px] whitespace-nowrap">
        <span className="text-lg font-bold tracking-tight">🎯 Portfolio</span>
        {menus.map((item, idx) => (
          <NavLink key={idx} to={item.path} className={({ isActive }) => `px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive ? "font-semibold" : ""}`}>
            {item.icon + " " + item.name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
