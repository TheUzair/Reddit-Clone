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
    <div className="flex items-center space-x-4">
      {tabs.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700
          ${activeTab === id ? "text-[#FF4500]" : "dark:text-white"}`}
          onClick={() => setActiveTab(id)}
        >
          <Icon />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}