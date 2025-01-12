"use client";

import React, { useState, useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import NavigationTabs from "./NavigationTabs";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";

export default function Navbar () {
  const [activeTab, setActiveTab] = useState("popular");
  const { theme } = useContext(ThemeContext);

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <div className="w-64 p-4 flex items-center space-x-4 gap-16">
          <ThemeToggle />
          <Logo />
        </div>

        <div className="flex-1 grid grid-cols-8 gap-4">
          <div className="col-span-6 p-4">
            <div className="flex items-center justify-between">
              <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              <SearchBar />
              <button className="bg-[#FF4500] text-white px-4 py-2 rounded-md
                           hover:bg-[#ff4500]/90 transition-colors duration-200">
                Create Post
              </button>
            </div>
          </div>

          <UserActions />
        </div>
      </div>
    </nav>
  );
};