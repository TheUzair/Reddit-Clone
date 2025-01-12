"use client";

import React, { useState, useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import NavigationTabs from "./NavigationTabs";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("popular");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useContext(ThemeContext);

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      {/* Navbar Top Section */}
      <div className="flex items-center flex-wrap px-4 sm:px-6 md:px-8 lg:px-12 py-3">
        {/* Logo & Theme Toggle */}
        <div className="flex items-center space-x-4 gap-6">
          <ThemeToggle />
          <Logo />
        </div>

        {/* Desktop Layout: Navigation Tabs, SearchBar, and Create Post */}
        <div className="hidden lg:flex flex-1 items-center justify-between ml-8 mr-32 pl-8">
          <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex items-center gap-4 flex-1 ml-8">
            <SearchBar className="flex-1" /> 
            <button className="bg-[#FF4500] text-white px-4 py-2 rounded-md hover:bg-[#ff4500]/90 transition-colors duration-200 whitespace-nowrap">
              Create Post
            </button>
          </div>
        </div>

        {/* Desktop User Actions */}
        <div className="ml-auto hidden sm:flex lg:flex">
          <UserActions />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden ml-auto">
          <button
            className="text-gray-500 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:focus:ring-gray-600"
            aria-label="Toggle navigation"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden flex flex-col px-4 sm:px-6 md:px-8 py-3 space-y-4">
          {/* Navigation Tabs */}
          <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Search Bar and Create Post */}
          <div
            className={`flex flex-col md:flex-row md:items-center md:gap-4 ${isMobileMenuOpen ? "gap-4" : ""
              }`}
          >
            <div className="w-full md:w-auto">
              <SearchBar />
            </div>
            <button
              className="bg-[#FF4500] text-white px-4 py-2 rounded-md hover:bg-[#ff4500]/90 transition-colors duration-200 w-full md:w-auto"
            >
              Create Post
            </button>
          </div>

          {/* Mobile User Actions */}
          <div className="flex justify-around">
            <UserActions />
          </div>
        </div>
      )}
    </nav>
  );
}