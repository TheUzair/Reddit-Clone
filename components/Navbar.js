"use client";

import React, { useState, useContext } from "react";
import {
  FaMoon,
  FaSun,
  FaReddit,
  FaHome,
  FaSearch,
  FaBell,
  FaEnvelope,
  FaChevronDown,
} from "react-icons/fa";
import { TbChartArrowsVertical } from "react-icons/tb";
import { CgMoveUp } from "react-icons/cg";
import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("popular");
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        {/* Left Section - Fixed width */}
        <div className="w-64 p-4 flex items-center space-x-4 gap-16">
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

          <div className="flex items-center">
            <FaReddit className="w-8 h-8 text-[#FF4500]" />
            <span className="ml-1 font-bold dark:text-white">reddit</span>
          </div>
        </div>

        {/* Main Grid Container */}
        <div className="flex-1 grid grid-cols-8 gap-4">
          {/* Center Section - 6 columns */}
          <div className="col-span-6 p-4">
            <div className="flex items-center justify-between">
              {/* Navigation Tabs */}
              <div className="flex items-center space-x-4">
                <button
                  className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700
                  ${activeTab === "home" ? "text-[#FF4500]" : "dark:text-white"}`}
                  onClick={() => setActiveTab("home")}
                >
                  <FaHome />
                  <span>Home</span>
                </button>
                <button
                  className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700
                  ${activeTab === "popular" ? "text-[#FF4500]" : "dark:text-white"}`}
                  onClick={() => setActiveTab("popular")}
                >
                  <TbChartArrowsVertical />
                  <span>Popular</span>
                </button>
                <button
                  className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700
                  ${activeTab === "all" ? "text-[#FF4500]" : "dark:text-white"}`}
                  onClick={() => setActiveTab("all")}
                >
                  <CgMoveUp />
                  <span>All</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative flex-1 mx-4">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Find community or post"
                  className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-50 border border-gray-300 
                       dark:bg-gray-700 dark:border-gray-600 dark:text-white
                       dark:placeholder-gray-400 focus:outline-none focus:ring-2
                       focus:ring-[#FF4500] focus:border-transparent"
                />
              </div>

              {/* Create Post Button */}
              <button className="bg-[#FF4500] text-white px-4 py-2 rounded-md
                           hover:bg-[#ff4500]/90 transition-colors duration-200">
                Create Post
              </button>
            </div>
          </div>

          {/* Right Section - 2 columns */}
          <div className="col-span-2 p-4 flex items-center justify-end space-x-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <FaBell className="w-6 h-6 text-gray-700 dark:text-white" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FF4500] rounded-full"></span>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <FaEnvelope className="w-6 h-6 text-gray-700 dark:text-white" />
            </button>
            <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <div className="relative w-8 h-8">
                <Image
                  src="/default-avatar.jpg"
                  alt="User avatar"
                  fill
                  className="rounded-full object-cover"
                  sizes="32px"
                  priority
                />
              </div>
              <FaChevronDown className="w-4 h-4 text-gray-700 dark:text-white" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;