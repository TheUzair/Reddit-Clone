"use client";

import React, { useState, useContext, useEffect, useRef } from "react";
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
import Image from "next/image";;

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const searchRef = useRef(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const searchReddit = async () => {
      if (searchQuery.length >= 2) {
        setIsSearching(true);
        try {
          const authResponse = await fetch('/api/reddit-auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          });

          if (!authResponse.ok) {
            throw new Error('Failed to get access token');
          }

          const { access_token } = await authResponse.json();

          const response = await fetch(
            `/api/reddit-search?q=${encodeURIComponent(searchQuery)}`,
            {
              headers: {
                'Authorization': `Bearer ${access_token}`
              }
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log('Raw Reddit search response:', data);

          if (!data || !Array.isArray(data)) {
            console.error('Unexpected data structure:', data);
            setSuggestions([]);
            setShowSuggestions(false);
            return;
          }

          const transformedResults = data
            .filter(listing => listing.kind === 'Listing' && listing.data?.children)
            .flatMap(listing => listing.data.children)
            .filter(item => item.data)
            .map(item => {
              const isSubreddit = item.kind === 't5';
              return {
                type: isSubreddit ? 'community' : 'post',
                name: isSubreddit ? item.data.display_name_prefixed : item.data.subreddit_name_prefixed,
                members: isSubreddit && item.data.subscribers
                  ? `${(item.data.subscribers).toLocaleString()} members`
                  : '',
                title: !isSubreddit ? item.data.title : '',
                subreddit: !isSubreddit ? item.data.subreddit_name_prefixed : '',
                score: item.data.score,
                id: item.data.id
              };
            })
            .sort((a, b) => {
              if (a.type === 'community' && b.type !== 'community') return -1;
              if (b.type === 'community' && a.type !== 'community') return 1;
              return 0;
            })
            .slice(0, 5);

          setSuggestions(transformedResults);
          setShowSuggestions(transformedResults.length > 0);
        } catch (error) {
          console.error('Error searching Reddit:', error);
          setSuggestions([]);
          setShowSuggestions(false);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounceTimeout = setTimeout(searchReddit, 500);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.type === 'community' ? suggestion.name : suggestion.title);
    setShowSuggestions(false);

  };

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
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

        <div className="flex-1 grid grid-cols-8 gap-4">
          <div className="col-span-6 p-4">
            <div className="flex items-center justify-between">
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

              <div className="relative flex-1 mx-4" ref={searchRef}>
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Find community or post"
                  className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-50 border border-gray-300 
                  dark:bg-gray-700 dark:border-gray-600 dark:text-white
                  dark:placeholder-gray-400 focus:outline-none focus:ring-2
                  focus:ring-[#FF4500] focus:border-transparent"
                />
                {showSuggestions && (
                  <div className="absolute w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 
                    dark:border-gray-700 rounded-md shadow-lg z-50">
                    {isSearching ? (
                      <div className="p-3 text-center text-gray-500 dark:text-gray-400">
                        Searching...
                      </div>
                    ) : suggestions.length > 0 ? (
                      suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        >
                          {suggestion.type === 'community' ? (
                            <div className="flex items-center">
                              <FaReddit className="w-5 h-5 text-[#FF4500] mr-2" />
                              <div>
                                <div className="font-medium dark:text-white">{suggestion.name}</div>
                                <div className="text-sm text-gray-500">{suggestion.members} members</div>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="font-medium dark:text-white">{suggestion.title}</div>
                              <div className="text-sm text-gray-500">{suggestion.subreddit}</div>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-center text-gray-500 dark:text-gray-400">
                        No results found
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button className="bg-[#FF4500] text-white px-4 py-2 rounded-md
                           hover:bg-[#ff4500]/90 transition-colors duration-200">
                Create Post
              </button>
            </div>
          </div>

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