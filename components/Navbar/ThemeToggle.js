import { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { ThemeContext } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {theme === "dark" ? (
        <FaSun className="w-6 h-6 text-yellow-500" />
      ) : (
        <FaMoon className="w-6 h-6 text-gray-700" />
      )}
    </button>
  );
}