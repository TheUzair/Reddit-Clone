import { FaHome } from "react-icons/fa";
import { TbChartArrowsVertical } from "react-icons/tb";
import { CgMoveUp } from "react-icons/cg";

export default function NavigationTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "home", icon: FaHome, label: "Home" },
    { id: "popular", icon: TbChartArrowsVertical, label: "Popular" },
    { id: "all", icon: CgMoveUp, label: "All" },
  ];

  return (
    <div className="flex flex-wrap items-center space-x-4 sm:space-x-2">
      {tabs.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          className={`flex items-center space-x-2 px-2 py-1 text-sm sm:text-base rounded-md
            hover:bg-gray-100 dark:hover:bg-gray-700 transition-all
            ${activeTab === id ? "text-[#FF4500]" : "text-gray-700 dark:text-white"}`}
          onClick={() => setActiveTab(id)}
        >
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}
