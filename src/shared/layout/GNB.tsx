import { RouteNode, getNavigableRoutes, RouteTree } from "@/core/route-meta";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function GNB({ data }: { data: RouteTree }) {
  const [menus, _menus] = useState<RouteNode[]>([]);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    _menus(getNavigableRoutes(data));
  }, [data]);

  const toggleDark = () => {
    const newVal = !isDark;
    document.documentElement.classList.toggle("dark", newVal);
    localStorage.setItem("theme", newVal ? "dark" : "light");
    setIsDark(newVal);
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  return (
    <header className="relative z-50 flex items-center justify-between h-16 px-8 text-gray-900 bg-white border-b border-gray-200 shadow dark:bg-gray-900 dark:border-gray-700 dark:text-white">
      <nav className="flex items-center space-x-6 min-w-[1080px] whitespace-nowrap">
        <span className="text-lg font-bold tracking-tight">🎯 Portfolio</span>
        {menus.map((item, idx) => (
          <NavLink key={idx} to={item.path} className={({ isActive }) => `px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive ? "font-semibold" : ""}`}>
            {item.meta.icon + " " + item.meta.label}
          </NavLink>
        ))}
      </nav>
      <div className="flex items-center space-x-4 text-sm">
        <button onClick={toggleDark} className="px-3 py-1 text-black bg-gray-200 rounded dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-white">
          {isDark ? "🌙 다크" : "☀️ 라이트"}
        </button>
      </div>
    </header>
  );
}
